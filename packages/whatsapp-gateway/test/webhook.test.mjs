import assert from 'node:assert/strict';
import { test } from 'node:test';

import { extractMessages } from '../src/webhook.mjs';

const envelope = (value) => ({
  object: 'whatsapp_business_account',
  entry: [{ id: '123', changes: [{ field: 'messages', value }] }],
});

test('extracts a text message with the contact profile name', () => {
  const messages = extractMessages(envelope({
    messaging_product: 'whatsapp',
    contacts: [{ wa_id: '15550001111', profile: { name: 'Ada' } }],
    messages: [{
      id: 'wamid.AAA',
      from: '15550001111',
      timestamp: '1760000000',
      type: 'text',
      text: { body: 'do you have hoops in stock?' },
    }],
  }));

  assert.equal(messages.length, 1);
  assert.deepEqual(messages[0], {
    messageId: 'wamid.AAA',
    from: '15550001111',
    timestamp: 1760000000,
    type: 'text',
    text: 'do you have hoops in stock?',
    profileName: 'Ada',
  });
});

test('ignores status callbacks, which carry no messages array', () => {
  const messages = extractMessages(envelope({
    statuses: [{ id: 'wamid.AAA', status: 'delivered' }],
  }));
  assert.deepEqual(messages, []);
});

test('reads interactive and button replies as text', () => {
  const interactive = extractMessages(envelope({
    messages: [{
      id: 'wamid.BBB',
      from: '1555',
      timestamp: '1',
      type: 'interactive',
      interactive: { type: 'button_reply', button_reply: { id: 'b1', title: 'Book a piercing' } },
    }],
  }));
  assert.equal(interactive[0].text, 'Book a piercing');

  const button = extractMessages(envelope({
    messages: [{
      id: 'wamid.CCC',
      from: '1555',
      timestamp: '1',
      type: 'button',
      button: { text: 'Stop promotions' },
    }],
  }));
  assert.equal(button[0].text, 'Stop promotions');
});

test('keeps media messages but leaves text null', () => {
  const messages = extractMessages(envelope({
    messages: [{
      id: 'wamid.DDD',
      from: '1555',
      timestamp: '1',
      type: 'image',
      image: { id: 'media-1', mime_type: 'image/jpeg' },
    }],
  }));
  assert.equal(messages[0].type, 'image');
  assert.equal(messages[0].text, null);
});

test('survives absent, partial and foreign payloads', () => {
  assert.deepEqual(extractMessages(null), []);
  assert.deepEqual(extractMessages({}), []);
  assert.deepEqual(extractMessages({ object: 'page', entry: [] }), []);
  assert.deepEqual(extractMessages(envelope({})), []);
  assert.deepEqual(extractMessages({ object: 'whatsapp_business_account', entry: null }), []);
  // A message without an id or sender cannot be deduped or answered.
  assert.deepEqual(extractMessages(envelope({ messages: [{ type: 'text' }] })), []);
});

test('flattens several entries and changes in one delivery', () => {
  const messages = extractMessages({
    object: 'whatsapp_business_account',
    entry: [
      { changes: [{ value: { messages: [{ id: 'a', from: '1', timestamp: '1', type: 'text', text: { body: 'one' } }] } }] },
      { changes: [{ value: { messages: [{ id: 'b', from: '2', timestamp: '2', type: 'text', text: { body: 'two' } }] } }] },
    ],
  });
  assert.deepEqual(messages.map((m) => m.messageId), ['a', 'b']);
});
