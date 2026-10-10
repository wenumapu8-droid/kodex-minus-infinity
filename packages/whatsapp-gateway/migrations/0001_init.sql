-- Conversation state, message dedupe, and consented leads.
-- Privacy-minimised: we store the wa_id (needed to reply), the intent, and the
-- message body only until MESSAGE_RETENTION_DAYS has passed. Email is stored
-- only with recorded explicit consent.

CREATE TABLE IF NOT EXISTS conversations (
  wa_id TEXT PRIMARY KEY,
  state TEXT NOT NULL DEFAULT 'new',
  lang TEXT NOT NULL DEFAULT 'en',
  profile_name TEXT,
  last_intent TEXT,
  email_asked INTEGER NOT NULL DEFAULT 0,
  opted_out INTEGER NOT NULL DEFAULT 0,
  handoff_pending INTEGER NOT NULL DEFAULT 0,
  last_inbound_at INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- message_id is Meta's wamid. The PRIMARY KEY is what makes webhook retries
-- idempotent: Meta re-delivers on any non-200, and a double reply is visible
-- to the customer.
CREATE TABLE IF NOT EXISTS messages (
  message_id TEXT PRIMARY KEY,
  wa_id TEXT NOT NULL,
  direction TEXT NOT NULL,
  msg_type TEXT,
  body TEXT,
  intent TEXT,
  received_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_messages_wa_id ON messages (wa_id, received_at);
CREATE INDEX IF NOT EXISTS idx_messages_received_at ON messages (received_at);

CREATE TABLE IF NOT EXISTS leads (
  wa_id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  source_intent TEXT,
  consent_text_version TEXT NOT NULL,
  consent_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_consent_at ON leads (consent_at);
