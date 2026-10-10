/** D1 persistence. All statements are parameterised. */

/**
 * Inserts the inbound message, returning false when the id was already stored.
 * Meta re-delivers a webhook on any non-200, so this is what stops a customer
 * receiving the same reply twice.
 */
export async function claimMessage(db, { messageId, waId, type, body, receivedAt }) {
  const res = await db
    .prepare(
      `INSERT INTO messages (message_id, wa_id, direction, msg_type, body, received_at)
       VALUES (?, ?, 'in', ?, ?, ?)
       ON CONFLICT(message_id) DO NOTHING`,
    )
    .bind(messageId, waId, type ?? null, body ?? null, receivedAt)
    .run();
  // D1 reports 0 changes when the conflict clause swallowed the insert.
  return (res?.meta?.changes ?? 0) > 0;
}

export async function recordIntent(db, messageId, intent) {
  if (!intent) return;
  await db
    .prepare('UPDATE messages SET intent = ? WHERE message_id = ?')
    .bind(intent, messageId)
    .run();
}

export async function getConversation(db, waId) {
  const row = await db
    .prepare(
      `SELECT c.*, EXISTS(SELECT 1 FROM leads l WHERE l.wa_id = c.wa_id) AS has_lead
       FROM conversations c WHERE c.wa_id = ?`,
    )
    .bind(waId)
    .first();
  return row ?? null;
}

const UPDATABLE = [
  'state', 'lang', 'profile_name', 'last_intent',
  'email_asked', 'opted_out', 'handoff_pending', 'last_inbound_at',
];

export async function saveConversation(db, waId, updates, now) {
  const columns = UPDATABLE.filter((c) => updates[c] !== undefined);
  if (columns.length === 0) {
    await db
      .prepare(
        `INSERT INTO conversations (wa_id, created_at, updated_at) VALUES (?, ?, ?)
         ON CONFLICT(wa_id) DO UPDATE SET updated_at = ?`,
      )
      .bind(waId, now, now, now)
      .run();
    return;
  }
  const setClause = columns.map((c) => `${c} = ?`).join(', ');
  const values = columns.map((c) => updates[c]);

  // INSERT … ON CONFLICT keeps first-contact and follow-up on one round trip.
  await db
    .prepare(
      `INSERT INTO conversations (wa_id, ${columns.join(', ')}, created_at, updated_at)
       VALUES (?, ${columns.map(() => '?').join(', ')}, ?, ?)
       ON CONFLICT(wa_id) DO UPDATE SET ${setClause}, updated_at = ?`,
    )
    .bind(waId, ...values, now, now, ...values, now)
    .run();
}

export async function saveLead(db, waId, lead) {
  await db
    .prepare(
      `INSERT INTO leads (wa_id, email, source_intent, consent_text_version, consent_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(wa_id) DO UPDATE SET
         email = excluded.email,
         source_intent = excluded.source_intent,
         consent_text_version = excluded.consent_text_version,
         consent_at = excluded.consent_at`,
    )
    .bind(waId, lead.email, lead.sourceIntent ?? null, lead.consentTextVersion, lead.consentAt)
    .run();
}

export async function recordOutbound(db, { messageId, waId, body, sentAt }) {
  await db
    .prepare(
      `INSERT INTO messages (message_id, wa_id, direction, msg_type, body, received_at)
       VALUES (?, ?, 'out', 'text', ?, ?)
       ON CONFLICT(message_id) DO NOTHING`,
    )
    .bind(messageId, waId, body, sentAt)
    .run();
}

/**
 * Drops message bodies past the retention window, keeping the row (and its
 * intent) so dedupe and reporting still work.
 */
export async function purgeOldBodies(db, { olderThan }) {
  const res = await db
    .prepare('UPDATE messages SET body = NULL WHERE body IS NOT NULL AND received_at < ?')
    .bind(olderThan)
    .run();
  return res?.meta?.changes ?? 0;
}
