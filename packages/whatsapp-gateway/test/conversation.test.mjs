import assert from 'node:assert/strict';
import { test } from 'node:test';

import { resolveConfig } from '../src/config.mjs';
import { decide } from '../src/conversation.mjs';
import { CONSENT_TEXT_VERSION } from '../src/copy.mjs';
import { INTENTS } from '../src/lexicon.mjs';
import { POLICY_INVARIANTS } from '../src/policy.mjs';

const CONFIG = resolveConfig({
  BUSINESS_NAME: 'Wenu Mapu',
  HUMAN_NAME: 'Marimari',
  CONTACT_EMAIL: 'marimari@wenumapuonline.com',
  SITE_URL: 'https://wenumapuonline.com',
  AFTERCARE_URL: 'https://wenumapuonline.com/aftercare/',
  BOOKING_URL: 'https://calendly.com/example/piercing',
  DEFAULT_LANG: 'en',
});

const NOW = 1_770_000_000;
const stub = (intent) => async () => intent;

/** A stored row as getConversation returns it. */
const row = (over = {}) => ({
  wa_id: '15550001111',
  state: 'open',
  lang: 'en',
  profile_name: 'Ada',
  last_intent: null,
  email_asked: 0,
  opted_out: 0,
  handoff_pending: 0,
  last_inbound_at: NOW - 100,
  has_lead: 0,
  ...over,
});

const inbound = (text, over = {}) => ({
  text,
  type: 'text',
  profileName: 'Ada',
  ...over,
});

const run = (args) => decide({ config: CONFIG, now: NOW, ...args });

test('first contact discloses that this is an automated assistant', async () => {
  const out = await run({
    message: inbound('hi, can I get a piercing on Saturday?'),
    conversation: null,
    classify: stub(INTENTS.BOOK_PIERCING),
  });

  assert.match(out.replies[0], /automated assistant/i);
  assert.match(out.replies[1], /calendly\.com\/example\/piercing/);
  assert.equal(out.handoff, true);
  assert.equal(out.intent, INTENTS.BOOK_PIERCING);
});

test('a returning conversation does not repeat the disclosure', async () => {
  const out = await run({
    message: inbound('are the silver hoops in stock?'),
    conversation: row({ last_intent: INTENTS.BOOK_PIERCING, email_asked: 1 }),
    classify: stub(INTENTS.JEWELRY),
  });

  assert.equal(out.replies.length, 1);
  assert.doesNotMatch(out.replies[0], /automated assistant/i);
});

test('never quotes a price, and never asks for an email in a price turn', async () => {
  const out = await run({
    message: inbound('how much for a nose piercing?'),
    conversation: row(),
    classify: stub(INTENTS.PRICING),
  });

  const all = out.replies.join('\n');
  assert.match(all, /can't quote prices/i);
  assert.doesNotMatch(all, /\$|\d+\.\d{2}/);
  assert.doesNotMatch(all, /email address/i);
  assert.equal(out.updates.state, 'open');
  assert.equal(out.updates.email_asked, 0);
  assert.equal(out.handoff, true);
});

test('aftercare gives the canonical link, no advice, and no marketing ask', async () => {
  const out = await run({
    message: inbound('my lobe is swollen and crusty, what should I put on it?'),
    conversation: row(),
    classify: stub(INTENTS.AFTERCARE),
  });

  const all = out.replies.join('\n');
  assert.match(all, /aftercare\//);
  assert.match(all, /see a doctor or a professional piercer/i);
  assert.doesNotMatch(all, /email address/i);
  // No instruction of our own: no dosages, products or routines.
  assert.doesNotMatch(all, /twice a day|apply|soak|rotate the/i);
  assert.equal(out.handoff, true);
});

test('captures an email only after an explicit ask, and records consent', async () => {
  const asked = await run({
    message: inbound('do you have any hoops left?'),
    conversation: row(),
    classify: stub(INTENTS.JEWELRY),
  });
  assert.equal(asked.updates.state, 'awaiting_email');
  assert.equal(asked.updates.email_asked, 1);
  assert.match(asked.replies.at(-1), /reply with your email address/i);
  assert.equal(asked.lead, null);

  const given = await run({
    message: inbound('sure — ada@example.com'),
    conversation: row({ state: 'awaiting_email', email_asked: 1, last_intent: INTENTS.JEWELRY }),
    classify: stub(INTENTS.JEWELRY),
  });
  assert.deepEqual(given.lead, {
    email: 'ada@example.com',
    sourceIntent: INTENTS.JEWELRY,
    consentTextVersion: CONSENT_TEXT_VERSION,
    consentAt: NOW,
  });
  assert.equal(given.updates.state, 'open');
  assert.match(given.replies[0], /saved/i);
});

test('declining the email ask is accepted once and never repeated', async () => {
  const declined = await run({
    message: inbound('no thanks'),
    conversation: row({ state: 'awaiting_email', email_asked: 1 }),
    classify: stub(INTENTS.OTHER),
  });
  assert.equal(declined.lead, null);
  assert.equal(declined.updates.state, 'open');
  assert.match(declined.replies[0], /no problem/i);

  const later = await run({
    message: inbound('actually, do you ship to Reno?'),
    conversation: row({ email_asked: 1 }),
    classify: stub(INTENTS.OTHER),
  });
  assert.doesNotMatch(later.replies.join('\n'), /email address/i);
});

test('a bare yes to the email ask re-asks instead of storing nothing', async () => {
  const out = await run({
    message: inbound('yes'),
    conversation: row({ state: 'awaiting_email', email_asked: 1 }),
    classify: stub(INTENTS.OTHER),
  });
  assert.equal(out.lead, null);
  assert.equal(out.updates.state, 'awaiting_email');
  assert.match(out.replies[0], /reply with your email address/i);
});

test('a new question during capture is answered, not trapped in the ask', async () => {
  const out = await run({
    message: inbound('wait, where is my order from last week?'),
    conversation: row({ state: 'awaiting_email', email_asked: 1 }),
    classify: stub(INTENTS.ORDER_STATUS),
  });
  assert.equal(out.updates.state, 'open');
  assert.equal(out.intent, INTENTS.ORDER_STATUS);
  assert.doesNotMatch(out.replies.join('\n'), /email address/i);
});

test('someone who already gave an email is never asked again', async () => {
  const out = await run({
    message: inbound('any new earrings?'),
    conversation: row({ has_lead: 1, email_asked: 0 }),
    classify: stub(INTENTS.JEWELRY),
  });
  assert.doesNotMatch(out.replies.join('\n'), /email address/i);
  assert.equal(out.updates.state, 'open');
});

test('opt-out is confirmed, then every later message is met with silence', async () => {
  const out = await run({
    message: inbound('STOP'),
    conversation: row(),
    classify: stub(INTENTS.OTHER),
  });
  assert.equal(out.updates.opted_out, 1);
  assert.equal(out.updates.state, 'closed_optout');
  assert.equal(out.updates.handoff_pending, 0);
  assert.match(out.replies[0], /unsubscribed/i);

  const after = await run({
    message: inbound('hi, do you have hoops?'),
    conversation: row({ opted_out: 1, state: 'closed_optout' }),
    classify: stub(INTENTS.JEWELRY),
  });
  assert.deepEqual(after.replies, []);
  assert.equal(after.lead, null);
  assert.equal(after.handoff, false);
});

test('an explicit START brings an opted-out contact back', async () => {
  const out = await run({
    message: inbound('START'),
    conversation: row({ opted_out: 1, state: 'closed_optout' }),
    classify: stub(INTENTS.OTHER),
  });
  assert.equal(out.updates.opted_out, 0);
  assert.equal(out.updates.state, 'open');
  assert.match(out.replies[0], /back on/i);
});

test('opt-out wins even when the message also asks something', async () => {
  const out = await run({
    message: inbound('please remove me from your list'),
    conversation: row(),
    classify: stub(INTENTS.OTHER),
  });
  assert.equal(out.updates.opted_out, 1);
});

test('replies in Spanish when the first message is Spanish, and stays there', async () => {
  const first = await run({
    message: inbound('Hola, ¿tienes aros de plata?'),
    conversation: null,
    classify: stub(INTENTS.JEWELRY),
  });
  assert.equal(first.updates.lang, 'es');
  assert.match(first.replies[0], /asistente automático/i);

  // Language is sticky: a later one-word English reply must not flip it.
  const second = await run({
    message: inbound('ok'),
    conversation: row({ lang: 'es', email_asked: 1 }),
    classify: stub(INTENTS.OTHER),
  });
  assert.equal(second.updates.lang, 'es');
  assert.match(second.replies[0], /Gracias por tu mensaje/i);
});

test('an attachment is acknowledged and handed off, never guessed at', async () => {
  const out = await run({
    message: inbound(null, { type: 'image' }),
    conversation: row(),
    classify: async () => {
      throw new Error('classifier must not run on an empty body');
    },
  });
  assert.match(out.replies[0], /can't read attachments/i);
  assert.equal(out.handoff, true);
  assert.equal(out.updates.handoff_pending, 1);
  assert.equal(out.intent, null);
});

test('every intent hands off to a human and states no price', async () => {
  for (const intent of Object.values(INTENTS)) {
    const out = await run({
      message: inbound('a message'),
      conversation: row({ email_asked: 1 }),
      classify: stub(intent),
    });
    const all = out.replies.join('\n');
    assert.equal(out.handoff, true, `${intent} must hand off`);
    assert.equal(out.updates.handoff_pending, 1, `${intent} must flag a human`);
    assert.doesNotMatch(all, /\$\d/, `${intent} must not state a price`);
    assert.match(all, /Marimari/, `${intent} must name the human`);
  }
});

test('an unknown label from the classifier degrades to the generic reply', async () => {
  const out = await run({
    message: inbound('something odd'),
    conversation: row({ email_asked: 1 }),
    classify: stub('NOT_A_REAL_INTENT'),
  });
  assert.match(out.replies[0], /will read it and reply in person/i);
  assert.equal(out.handoff, true);
});

test('the policy invariants are stated, not implied', () => {
  assert.ok(POLICY_INVARIANTS.length >= 5);
  assert.ok(POLICY_INVARIANTS.some((rule) => /never state a price/.test(rule)));
  assert.ok(POLICY_INVARIANTS.some((rule) => /aftercare/.test(rule)));
});
