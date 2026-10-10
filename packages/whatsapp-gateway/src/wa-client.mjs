/** Minimal WhatsApp Cloud API client (Graph API v23.0). */

const GRAPH_VERSION = 'v23.0';

export class WhatsAppError extends Error {
  constructor(status, body) {
    super(`WhatsApp API ${status}`);
    this.name = 'WhatsAppError';
    this.status = status;
    this.body = body;
  }
}

/**
 * Sends a text message.
 * @returns {Promise<string|null>} the wamid Meta assigned, for the outbound log.
 */
export async function sendText({ token, phoneNumberId, to, body }) {
  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        // Link previews are off: the reply should read as a short note, not a card.
        text: { preview_url: false, body },
      }),
    },
  );

  const payload = await res.json().catch(() => null);
  if (!res.ok) throw new WhatsAppError(res.status, payload);
  return payload?.messages?.[0]?.id ?? null;
}

/** Best-effort read receipt. A failure here must never fail the turn. */
export async function markRead({ token, phoneNumberId, messageId }) {
  try {
    await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId,
      }),
    });
  } catch {
    // ignored on purpose
  }
}
