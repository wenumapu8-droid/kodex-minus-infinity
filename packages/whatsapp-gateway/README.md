# @kodex/whatsapp-gateway

WhatsApp Business Cloud API triage gateway for Wenu Mapu.

Status: `IMPLEMENTATION / V0.1 — NOT DEPLOYED`
Epistemic status of this file: `VERIFIED` for what the code does, `NEEDS_CONFIRMATION` for every Meta platform figure (see [Costs](#costs)).

## What this is, and what it deliberately is not

A Cloudflare Worker that receives inbound WhatsApp messages, decides what they
are about, replies with a fixed string, captures an email with explicit
consent, and flags the thread for a human.

It is **not** an AI that talks to customers. The model's entire output surface
is one label out of seven (`src/classify-llm.mjs`). Every word a customer
receives comes from `src/copy.mjs`. That split is the point: free-text
generation on a business number is where a price commitment or a healing
instruction leaks in, and both are liabilities for a studio that does
piercings.

Encoded in `src/policy.mjs` and asserted in `test/conversation.test.mjs`:

- never states a price, discount or availability;
- never gives aftercare, healing or medical guidance beyond the canonical link,
  and points at a doctor or an in-person piercer when something sounds wrong;
- never confirms an appointment;
- discloses that it is an automated assistant on first contact;
- always routes to a human;
- never asks for an email in an aftercare or pricing turn;
- honours opt-out immediately, and stays silent afterwards until an explicit
  `START`.

## Why not MCP

MCP connects a model to a tool *while someone is in a conversation with the
model*. A customer service has to answer at 23:40 on a Tuesday. That needs an
always-on webhook receiver, which is what this is. An MCP server would be the
right shape for a different job — letting an operator ask an assistant to send
a message — not for answering customers.

## Architecture

```text
WhatsApp  →  Meta Cloud API  →  POST /webhook (this Worker)
                                   ↓
                   verify X-Hub-Signature-256   signature.mjs
                                   ↓
                   normalise the envelope        webhook.mjs
                                   ↓
                   claim the message id (D1)     store.mjs      ← idempotency
                                   ↓
                   keyword classify              lexicon.mjs    ← free, offline
                     ↓ unplaced only
                   model classify → one label    classify-llm.mjs
                                   ↓
                   state machine                 conversation.mjs
                                   ↓
                   fixed copy + guardrails       policy.mjs / copy.mjs
                                   ↓
                   send + persist                wa-client.mjs / store.mjs
```

The deterministic classifier runs first and the model only sees messages the
keywords could not place. Set `CLASSIFIER_LLM_ENABLED=0` and the gateway keeps
working with no API spend at all — slightly blunter triage, same guardrails.

### Idempotency, and the one tradeoff

Meta redelivers a webhook on any non-200 response. The inbound message id is
inserted into `messages` before anything else happens, and the `PRIMARY KEY`
conflict is what stops a customer receiving the same reply twice.

The tradeoff: if processing fails *after* the claim, the redelivery is deduped
and would be silently dropped. So `worker.mjs` catches that case, sets
`handoff_pending = 1` on the conversation, and still answers 200 — a thread a
human must look at, rather than a retry storm or a double reply. Watch
`message.failed` in the logs.

## Setup

### 1. A second phone number — do not migrate the existing one

A number cannot be on the WhatsApp Business **app** and the **Cloud API** at
the same time. Registering the number that is active today would take the app
off the phone and move the inbox to Meta Business Suite or a third-party tool.
Use a separate number for the bot.

### 2. Meta side

1. Create a Meta app (type: Business) and add the WhatsApp product.
2. Register the new number and note its **phone number ID**.
3. Generate a **permanent** system-user token with `whatsapp_business_messaging`
   — the 24-hour test token in the dashboard will expire mid-conversation.
4. Copy the **app secret** (App settings → Basic).
5. Invent a verify token — any long random string.

### 3. Cloudflare side

```sh
cd packages/whatsapp-gateway
npm install

wrangler d1 create wenu-whatsapp          # put the id into wrangler.toml
npm run migrate:remote

wrangler secret put META_APP_SECRET
wrangler secret put META_VERIFY_TOKEN
wrangler secret put WHATSAPP_TOKEN
wrangler secret put WHATSAPP_PHONE_NUMBER_ID
wrangler secret put ANTHROPIC_API_KEY
```

Then fill the `[vars]` in `wrangler.toml` — in particular `BOOKING_URL`, which
ships as `REPLACE_WITH_CALENDLY_URL`. Until it is set, the booking reply says a
human will send times rather than printing a placeholder link.

Secrets are never written to `wrangler.toml`; CI fails the build if one is.

### 4. Point Meta at the Worker

Callback URL `https://<worker-host>/webhook`, verify token as above, then
subscribe to the `messages` field. Meta calls `GET /webhook` once to check the
token and expects `hub.challenge` echoed back.

### 5. Local development

```sh
cp .dev.vars.example .dev.vars    # fill it in; it is gitignored
npm run migrate:local
npm run dev
```

## Tests

```sh
npm test     # 55 tests, no install and no network needed
```

The unit tests import only the pure modules, so they run without
`node_modules`. They cover signature verification (including a one-byte body
change and a wrong secret), webhook parsing, bilingual classification and its
precedence rules, email extraction, the full state machine, and SQL
placeholder/binding parity.

Not covered, and not claimed: no end-to-end run against Meta, no live model
call, no deployed Worker. Nothing here has been exercised against a real
WhatsApp number.

## Costs

Three meters run at once:

| Meter | What drives it |
|---|---|
| Meta | per conversation or per message, by category |
| Claude API | only messages the keyword pass could not place |
| Cloudflare | Workers requests and D1 rows |

Meta's messaging prices and the service-window rules changed during 2025 and
are regional. **Verify them in the WhatsApp Manager before budgeting** — any
figure quoted from memory would be wrong.

On the model: `CLASSIFIER_MODEL` defaults to `claude-opus-5-5`. For a
seven-label classifier that is more model than the job needs; `claude-haiku-5-5`
is a fraction of the price per token. That is a cost decision, so it is a var,
not a default chosen here. Change it in `wrangler.toml` and re-run the suite.

Refusal fallbacks (`fallbacks: "default"`) are enabled on the classifier call.
If the chain still refuses, the call returns `null` and the deterministic label
is used — the customer is answered either way.

## Privacy and retention

- Email is stored only after an explicit ask and an explicit answer, with the
  consent wording version and timestamp on the row (`CONSENT_TEXT_VERSION`).
- Message bodies are nulled after `MESSAGE_RETENTION_DAYS` (default 30) by the
  nightly cron, keeping the row so dedupe and intent reporting still work.
- Logs carry a masked `wa_id` (last four digits) and never a message body.
- `STOP` / `BAJA` sets `opted_out` and the gateway goes silent, including for
  messages that look like fresh enquiries.

## The 24-hour window

Outside 24 hours from the customer's last message, Meta only allows
pre-approved template messages. This gateway replies inside that window only.
Day-7 and day-14 follow-ups therefore cannot be improvised here: they need
templates registered and approved in advance, and that is Phase 1.

## Deployment

Not deployed. `START_HERE.md` §6: no deployment occurs without `APROBAR DEPLOY`.
