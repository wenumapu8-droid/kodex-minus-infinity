import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  INTENTS,
  classifyDeterministic,
  detectLang,
  isAffirmative,
  isNegative,
  isOptIn,
  isOptOut,
  normalise,
} from '../src/lexicon.mjs';

test('normalise strips accents, case and extra whitespace', () => {
  assert.equal(normalise('  ¿CUÁNTO   cuesta?  '), '¿cuanto cuesta?');
  assert.equal(normalise(null), '');
});

test('classifies the common English enquiries', () => {
  const cases = [
    ['Hi! Do you have any openings for a piercing Saturday?', INTENTS.BOOK_PIERCING],
    ['how much for a nose piercing', INTENTS.PRICING],
    ['Are these earrings still available?', INTENTS.JEWELRY],
    ['my lobe is swollen and crusty, is that normal', INTENTS.AFTERCARE],
    ['hey, where is my order? no tracking yet', INTENTS.ORDER_STATUS],
    ['I run a studio in Reno and would love to carry your pieces', INTENTS.WHOLESALE],
  ];
  for (const [text, expected] of cases) {
    const got = classifyDeterministic(text);
    assert.equal(got.intent, expected, `"${text}" -> ${got.intent}`);
    assert.equal(got.confident, true);
  }
});

test('classifies the common Spanish enquiries', () => {
  const cases = [
    ['Hola, quiero agendar una perforación', INTENTS.BOOK_PIERCING],
    ['¿cuánto cuesta?', INTENTS.PRICING],
    ['me encantan esos aros, los tienes en plata?', INTENTS.JEWELRY],
    ['tengo la oreja hinchada y me duele', INTENTS.AFTERCARE],
    ['dónde está mi pedido, no tengo rastreo', INTENTS.ORDER_STATUS],
    ['soy mayorista, me interesa consignación', INTENTS.WHOLESALE],
  ];
  for (const [text, expected] of cases) {
    const got = classifyDeterministic(text);
    assert.equal(got.intent, expected, `"${text}" -> ${got.intent}`);
  }
});

test('a healing question that mentions money is still aftercare', () => {
  // Precedence matters: this must not be read as a price enquiry.
  const got = classifyDeterministic('how much longer until it heals? worth the price honestly');
  assert.equal(got.intent, INTENTS.AFTERCARE);
});

test('an order question that mentions a price is still order status', () => {
  const got = classifyDeterministic('where is my order, I paid the price two weeks ago');
  assert.equal(got.intent, INTENTS.ORDER_STATUS);
});

test('a price question wins over the thing being priced', () => {
  // Regression: these used to land on BOOK_PIERCING / JEWELRY, which skips the
  // no-quote reply and wrongly allows the email ask.
  assert.equal(classifyDeterministic('how much for a nose piercing').intent, INTENTS.PRICING);
  assert.equal(classifyDeterministic('what do the silver hoops cost?').intent, INTENTS.PRICING);
  assert.equal(
    classifyDeterministic('I want to book a piercing, how much is it?').intent,
    INTENTS.PRICING,
  );
});

test('a bare greeting is unplaced and escalates to the model', () => {
  for (const text of ['hola', 'hi', 'good morning', '👋']) {
    const got = classifyDeterministic(text);
    assert.equal(got.intent, INTENTS.OTHER);
    assert.equal(got.confident, false, `"${text}" should not be confident`);
  }
});

test('opt-out matches the standard keywords without swallowing sentences', () => {
  for (const text of ['STOP', 'stop', 'unsubscribe', 'BAJA', 'please remove me', 'no me escribas']) {
    assert.equal(isOptOut(text), true, `"${text}" should opt out`);
  }
  for (const text of ['stop by on Saturday?', 'can you stop holding it for me', 'no thanks']) {
    assert.equal(isOptOut(text), false, `"${text}" should not opt out`);
  }
});

test('opt-in is an exact keyword only', () => {
  assert.equal(isOptIn('START'), true);
  assert.equal(isOptIn('alta'), true);
  assert.equal(isOptIn('when do you start on Saturday'), false);
});

test('affirmative and negative are short confirmations, not long sentences', () => {
  for (const text of ['yes', 'Sí', 'ok', 'sure', 'yes please', 'dale']) {
    assert.equal(isAffirmative(text), true, `"${text}"`);
  }
  for (const text of ['no', 'no thanks', 'nope', 'mejor no', 'not now']) {
    assert.equal(isNegative(text), true, `"${text}"`);
  }
  // A sentence that merely contains "sure" is not consent.
  assert.equal(isAffirmative('I am not sure I want to share my email with you'), false);
  assert.equal(isNegative('I have no idea what size I need, can you help'), false);
});

test('detects Spanish from markers and punctuation, defaults otherwise', () => {
  assert.equal(detectLang('¿tienes aros de plata?'), 'es');
  assert.equal(detectLang('Hola, quiero una cita'), 'es');
  assert.equal(detectLang('do you have silver hoops'), 'en');
  assert.equal(detectLang('', 'es'), 'es');
});
