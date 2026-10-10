/**
 * The Phase 0 state machine, as a pure function.
 *
 * `decide` performs no IO: it takes the inbound message plus the stored
 * conversation row and returns what to send and what to persist. The classifier
 * is injected so tests can run without an API key, and so the worker can swap
 * in the deterministic-only path.
 *
 * States: new → open ⇄ awaiting_email, plus a terminal-until-opt-in opted_out.
 */

import { CONSENT_TEXT_VERSION, copy } from './copy.mjs';
import { extractEmail } from './email.mjs';
import {
  detectLang,
  isAffirmative,
  isNegative,
  isOptIn,
  isOptOut,
} from './lexicon.mjs';
import { ruleFor } from './policy.mjs';

/**
 * @param {object} args
 * @param {{text: string|null, type: string, profileName: string|null}} args.message
 * @param {object|null} args.conversation stored row, or null for a first contact
 * @param {(text: string) => Promise<string>} args.classify resolves to an intent label
 * @param {object} args.config resolved config
 * @param {number} args.now epoch seconds
 * @returns {Promise<{replies: string[], updates: object, lead: object|null,
 *   handoff: boolean, intent: string|null}>}
 */
export async function decide({ message, conversation, classify, config, now }) {
  const prior = conversation ?? null;
  const text = typeof message.text === 'string' ? message.text : '';
  const lang = prior?.lang ?? detectLang(text, config.defaultLang);
  const say = (key) => copy(key, lang, config);

  const base = {
    lang,
    last_inbound_at: now,
    profile_name: message.profileName ?? prior?.profile_name ?? null,
  };
  const result = (over) => ({
    replies: [],
    lead: null,
    handoff: false,
    intent: null,
    ...over,
    updates: { ...base, ...(over.updates ?? {}) },
  });

  // 1. Opt-out is absolute. Once out, we stay silent until an explicit opt-in —
  //    including for messages that look like new enquiries.
  if (prior?.opted_out) {
    if (isOptIn(text)) {
      return result({
        replies: [say('opt_in_confirmed')],
        updates: { opted_out: 0, state: 'open' },
      });
    }
    return result({ updates: {} });
  }

  if (isOptOut(text)) {
    return result({
      replies: [say('opt_out_confirmed')],
      updates: { opted_out: 1, state: 'closed_optout', handoff_pending: 0 },
    });
  }

  const isFirstContact = !prior;
  const preamble = isFirstContact ? [say('disclosure')] : [];

  // 2. Mid-capture: we asked for an email last turn.
  if (prior?.state === 'awaiting_email') {
    const email = extractEmail(text);
    if (email) {
      return result({
        replies: [say('email_saved')],
        lead: {
          email,
          sourceIntent: prior.last_intent ?? null,
          consentTextVersion: CONSENT_TEXT_VERSION,
          consentAt: now,
        },
        updates: { state: 'open' },
      });
    }
    if (isNegative(text)) {
      return result({
        replies: [say('email_declined')],
        updates: { state: 'open' },
      });
    }
    // A bare "yes" to "what's your email?" is not an email. Ask once more
    // without re-triaging, then fall through on anything else so the customer
    // is never trapped in the capture step.
    if (isAffirmative(text)) {
      return result({ replies: [say('ask_email')], updates: { state: 'awaiting_email' } });
    }
  }

  // 3. Attachments: we acknowledge and hand off rather than guess.
  if (!text.trim()) {
    return result({
      replies: [...preamble, say('unsupported_media')],
      handoff: true,
      updates: { state: 'open', handoff_pending: 1 },
    });
  }

  // 4. Triage.
  const intent = await classify(text);
  const rule = ruleFor(intent);
  const replies = [...preamble, say(rule.copyKey)];

  const askEmail = rule.mayAskEmail && !prior?.email_asked && !hasLead(prior);
  if (askEmail) replies.push(say('ask_email'));

  return result({
    replies,
    handoff: rule.handoff,
    intent,
    updates: {
      state: askEmail ? 'awaiting_email' : 'open',
      last_intent: intent,
      email_asked: askEmail ? 1 : (prior?.email_asked ?? 0),
      handoff_pending: rule.handoff ? 1 : (prior?.handoff_pending ?? 0),
    },
  });
}

function hasLead(prior) {
  return Boolean(prior?.has_lead);
}
