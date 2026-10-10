/**
 * Wenu Mapu WhatsApp triage gateway — Cloudflare Worker entry point.
 *
 * GET  /webhook  Meta's subscription handshake.
 * POST /webhook  Inbound messages, signature-verified.
 * GET  /health   Liveness, no secrets echoed.
 *
 * Phase 0 scope: classify, reply from a fixed copy table, capture an email
 * with explicit consent, flag a human. It does not quote prices, give
 * aftercare advice, or confirm appointments — see policy.mjs.
 */

import { classifyWithModel } from './classify-llm.mjs';
import { resolveConfig } from './config.mjs';
import { decide } from './conversation.mjs';
import { classifyDeterministic } from './lexicon.mjs';
import { logEvent } from './redact.mjs';
import { verifySignature } from './signature.mjs';
import {
  claimMessage,
  getConversation,
  purgeOldBodies,
  recordIntent,
  recordOutbound,
  saveConversation,
  saveLead,
} from './store.mjs';
import { extractMessages } from './webhook.mjs';
import { sendText, markRead } from './wa-client.mjs';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/health') {
      return json({ ok: true });
    }

    if (url.pathname !== '/webhook') return new Response('not found', { status: 404 });

    if (request.method === 'GET') return handleVerification(url, env);
    if (request.method === 'POST') return handleWebhook(request, env, ctx);

    return new Response('method not allowed', { status: 405 });
  },

  /** Retention sweep (see `[triggers]` in wrangler.toml). */
  async scheduled(event, env) {
    const config = resolveConfig(env);
    const cutoff = Math.floor(Date.now() / 1000) - config.messageRetentionDays * 86400;
    const cleared = await purgeOldBodies(env.DB, { olderThan: cutoff });
    logEvent('retention.purge', { cleared, cutoff });
  },
};

/** Meta's one-time handshake: echo hub.challenge when the token matches. */
function handleVerification(url, env) {
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && env.META_VERIFY_TOKEN && token === env.META_VERIFY_TOKEN) {
    return new Response(challenge ?? '', {
      status: 200,
      headers: { 'content-type': 'text/plain' },
    });
  }
  logEvent('webhook.verify_rejected', { mode });
  return new Response('forbidden', { status: 403 });
}

async function handleWebhook(request, env, ctx) {
  // The signature covers these exact bytes, so the body is read once as text
  // and parsed from that same string.
  const rawBody = await request.text();

  const valid = await verifySignature({
    rawBody,
    header: request.headers.get('x-hub-signature-256'),
    appSecret: env.META_APP_SECRET,
  });
  if (!valid) {
    logEvent('webhook.bad_signature', {});
    return new Response('forbidden', { status: 403 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    logEvent('webhook.bad_json', {});
    // 200: a malformed body will not parse on redelivery either.
    return json({ ok: true });
  }

  const messages = extractMessages(payload);
  if (messages.length === 0) return json({ ok: true });

  const config = resolveConfig(env);
  for (const message of messages) {
    try {
      await handleMessage({ message, env, config });
    } catch (error) {
      // We already claimed the message id, so Meta's retry would be deduped.
      // Rather than risk a silent drop, flag the thread for a human and
      // acknowledge, so a crash loop cannot turn into a reply storm.
      logEvent('message.failed', {
        waId: message.from,
        error: String(error?.message ?? error),
      });
      await flagForHuman(env.DB, message.from).catch(() => {});
    }
  }

  return json({ ok: true });
}

async function handleMessage({ message, env, config }) {
  const now = Math.floor(Date.now() / 1000);

  const fresh = await claimMessage(env.DB, {
    messageId: message.messageId,
    waId: message.from,
    type: message.type,
    body: message.text,
    receivedAt: message.timestamp || now,
  });
  if (!fresh) {
    logEvent('message.duplicate', { waId: message.from });
    return;
  }

  const conversation = await getConversation(env.DB, message.from);

  const outcome = await decide({
    message,
    conversation,
    classify: (text) => classify({ text, env, config }),
    config,
    now,
  });

  await saveConversation(env.DB, message.from, outcome.updates, now);
  if (outcome.intent) await recordIntent(env.DB, message.messageId, outcome.intent);
  if (outcome.lead) {
    await saveLead(env.DB, message.from, outcome.lead);
    logEvent('lead.captured', { waId: message.from, intent: outcome.lead.sourceIntent });
  }

  if (outcome.replies.length === 0) {
    logEvent('message.silent', { waId: message.from, reason: 'opted_out' });
    return;
  }

  await markRead({
    token: env.WHATSAPP_TOKEN,
    phoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID,
    messageId: message.messageId,
  });

  for (const body of outcome.replies) {
    const outboundId = await sendText({
      token: env.WHATSAPP_TOKEN,
      phoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID,
      to: message.from,
      body,
    });
    if (outboundId) {
      await recordOutbound(env.DB, {
        messageId: outboundId,
        waId: message.from,
        body,
        sentAt: Math.floor(Date.now() / 1000),
      });
    }
  }

  logEvent('message.handled', {
    waId: message.from,
    intent: outcome.intent,
    replies: outcome.replies.length,
    handoff: outcome.handoff,
  });
}

/**
 * Deterministic first; the model only sees messages the keyword pass could not
 * place. That keeps spend proportional to ambiguity and keeps the gateway
 * working when the API is off or unreachable.
 */
async function classify({ text, env, config }) {
  const local = classifyDeterministic(text);
  if (local.confident) return local.intent;
  if (!config.classifierLlmEnabled) return local.intent;

  const fromModel = await classifyWithModel({
    apiKey: env.ANTHROPIC_API_KEY,
    model: config.classifierModel,
    text,
  });
  return fromModel ?? local.intent;
}

async function flagForHuman(db, waId) {
  const now = Math.floor(Date.now() / 1000);
  await saveConversation(db, waId, { handoff_pending: 1, last_inbound_at: now }, now);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
