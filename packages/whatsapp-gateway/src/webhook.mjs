/**
 * Normalisation of the Meta WhatsApp Cloud API webhook envelope.
 *
 * The payload is deeply nested and every level is optional in practice, so
 * everything is read defensively. Status callbacks (`delivered`, `read`) carry
 * no `messages` array and are ignored.
 */

/**
 * @returns {Array<{messageId: string, from: string, timestamp: number,
 *   type: string, text: string|null, profileName: string|null}>}
 */
export function extractMessages(payload) {
  if (!payload || payload.object !== 'whatsapp_business_account') return [];
  const out = [];

  for (const entry of asArray(payload.entry)) {
    for (const change of asArray(entry.changes)) {
      const value = change?.value;
      if (!value) continue;

      const names = new Map();
      for (const contact of asArray(value.contacts)) {
        if (contact?.wa_id) names.set(contact.wa_id, contact?.profile?.name ?? null);
      }

      for (const message of asArray(value.messages)) {
        if (!message?.id || !message?.from) continue;
        out.push({
          messageId: message.id,
          from: message.from,
          timestamp: Number.parseInt(message.timestamp, 10) || 0,
          type: message.type ?? 'unknown',
          text: readText(message),
          profileName: names.get(message.from) ?? null,
        });
      }
    }
  }

  return out;
}

function readText(message) {
  if (message.type === 'text') return message.text?.body ?? null;
  // Interactive replies arrive as button/list selections rather than free text.
  if (message.type === 'interactive') {
    const i = message.interactive;
    return i?.button_reply?.title ?? i?.list_reply?.title ?? null;
  }
  if (message.type === 'button') return message.button?.text ?? null;
  return null;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}
