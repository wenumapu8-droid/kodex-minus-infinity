import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  claimMessage,
  purgeOldBodies,
  saveConversation,
  saveLead,
} from '../src/store.mjs';

/**
 * A fake D1 that records statements and asserts the one thing a unit test can
 * usefully check about hand-built SQL: that the number of `?` placeholders
 * matches the number of bound values. A mismatch is a runtime error in
 * production and silent nonsense in review.
 */
function fakeDb({ changes = 1 } = {}) {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      const statement = { sql, bindings: [] };
      calls.push(statement);
      return {
        bind(...args) {
          statement.bindings = args;
          const placeholders = (sql.match(/\?/g) ?? []).length;
          assert.equal(
            args.length,
            placeholders,
            `bound ${args.length} values for ${placeholders} placeholders in:\n${sql}`,
          );
          return this;
        },
        async run() {
          return { meta: { changes } };
        },
        async first() {
          return null;
        },
      };
    },
  };
}

test('claimMessage reports a first delivery and a redelivery differently', async () => {
  const message = {
    messageId: 'wamid.AAA',
    waId: '15550001111',
    type: 'text',
    body: 'hello',
    receivedAt: 1,
  };

  assert.equal(await claimMessage(fakeDb({ changes: 1 }), message), true);
  // D1 reports zero changes when ON CONFLICT DO NOTHING swallowed the insert.
  assert.equal(await claimMessage(fakeDb({ changes: 0 }), message), false);
});

test('saveConversation binds insert and update values in the right order', async () => {
  const db = fakeDb();
  await saveConversation(
    db,
    '15550001111',
    { state: 'awaiting_email', lang: 'es', email_asked: 1, last_inbound_at: 1700 },
    1800,
  );

  const { sql, bindings } = db.calls[0];
  assert.match(sql, /ON CONFLICT\(wa_id\) DO UPDATE SET/);
  // wa_id, the four values, created_at, updated_at, the four values again, updated_at.
  assert.deepEqual(bindings, [
    '15550001111',
    'awaiting_email', 'es', 1, 1700,
    1800, 1800,
    'awaiting_email', 'es', 1, 1700,
    1800,
  ]);
});

test('saveConversation ignores unknown columns instead of building broken SQL', async () => {
  const db = fakeDb();
  await saveConversation(db, '1555', { state: 'open', has_lead: 1, nonsense: true }, 10);
  const { sql, bindings } = db.calls[0];
  assert.doesNotMatch(sql, /has_lead|nonsense/);
  assert.deepEqual(bindings, ['1555', 'open', 10, 10, 'open', 10]);
});

test('saveConversation with nothing updatable still touches the row', async () => {
  const db = fakeDb();
  await saveConversation(db, '1555', {}, 42);
  const { sql, bindings } = db.calls[0];
  assert.match(sql, /INSERT INTO conversations \(wa_id, created_at, updated_at\)/);
  // wa_id, created_at, updated_at, then updated_at again for the conflict branch.
  assert.deepEqual(bindings, ['1555', 42, 42, 42]);
});

test('a null update value is still written, a missing one is not', async () => {
  const db = fakeDb();
  await saveConversation(db, '1555', { profile_name: null, state: undefined }, 7);
  const { sql, bindings } = db.calls[0];
  assert.match(sql, /profile_name/);
  assert.doesNotMatch(sql, /state/);
  assert.deepEqual(bindings, ['1555', null, 7, 7, null, 7]);
});

test('saveLead stores the consent version and upserts on repeat', async () => {
  const db = fakeDb();
  await saveLead(db, '1555', {
    email: 'ada@example.com',
    sourceIntent: 'JEWELRY',
    consentTextVersion: 'v1-2026-10',
    consentAt: 99,
  });
  const { sql, bindings } = db.calls[0];
  assert.match(sql, /ON CONFLICT\(wa_id\) DO UPDATE SET/);
  assert.deepEqual(bindings, ['1555', 'ada@example.com', 'JEWELRY', 'v1-2026-10', 99]);
});

test('purgeOldBodies clears bodies but keeps the rows for dedupe', async () => {
  const db = fakeDb({ changes: 12 });
  const cleared = await purgeOldBodies(db, { olderThan: 500 });
  assert.equal(cleared, 12);
  const { sql, bindings } = db.calls[0];
  assert.match(sql, /UPDATE messages SET body = NULL/);
  assert.doesNotMatch(sql, /DELETE/);
  assert.deepEqual(bindings, [500]);
});
