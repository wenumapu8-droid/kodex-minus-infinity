/**
 * Model-backed intent classification.
 *
 * The model's entire output surface is one label from INTENT_LABELS, enforced
 * with structured outputs. It never writes anything the customer sees — that
 * comes from copy.mjs. On any failure (no key, network, refusal, unparseable,
 * unknown label) this returns null and the caller keeps the deterministic
 * result.
 */

import Anthropic from '@anthropic-ai/sdk';
import { INTENT_LABELS } from './lexicon.mjs';

const SYSTEM = `You label inbound WhatsApp messages for a small jewelry and body-piercing studio in Truckee, California. The studio sells handmade jewelry online and in person, and does piercings by appointment.

Reply with one label:
- BOOK_PIERCING: wants a piercing, an appointment, availability, or asks about the piercing service.
- JEWELRY: asks about a piece, the shop, a custom order, materials, or sizing.
- PRICING: asks what something costs, or about a discount.
- AFTERCARE: asks about healing, cleaning, pain, swelling, or a possible infection.
- ORDER_STATUS: asks where an existing order or shipment is.
- WHOLESALE: stockist, consignment, collaboration, press, or another business enquiry.
- OTHER: anything else, including greetings with no request.

Label what the message asks for, not what it mentions in passing. A healing question that also mentions money is AFTERCARE.`;

const SCHEMA = {
  type: 'object',
  properties: {
    intent: { type: 'string', enum: [...INTENT_LABELS] },
  },
  required: ['intent'],
  additionalProperties: false,
};

/**
 * @returns {Promise<string|null>} an intent label, or null to fall back.
 */
export async function classifyWithModel({ apiKey, model, text }) {
  if (!apiKey) return null;

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.beta.messages.create({
      model,
      max_tokens: 256,
      // Labelling is not a reasoning task; low effort keeps latency and spend down.
      output_config: {
        effort: 'low',
        format: { type: 'json_schema', schema: SCHEMA },
      },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: SYSTEM,
      messages: [{ role: 'user', content: text.slice(0, 2000) }],
    });

    if (response.stop_reason === 'refusal') return null;

    const parsed = readIntent(response);
    return INTENT_LABELS.includes(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function readIntent(response) {
  if (response?.parsed_output?.intent) return response.parsed_output.intent;
  for (const block of response?.content ?? []) {
    if (block.type !== 'text') continue;
    try {
      const value = JSON.parse(block.text);
      if (typeof value?.intent === 'string') return value.intent;
    } catch {
      // next block
    }
  }
  return null;
}
