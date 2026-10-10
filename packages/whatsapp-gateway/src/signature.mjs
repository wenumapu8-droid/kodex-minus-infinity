/**
 * Verification of Meta's `X-Hub-Signature-256` header.
 *
 * Meta signs the exact raw request body with the app secret. The body must be
 * read once as text and passed here unmodified — re-serialising parsed JSON
 * changes bytes and the signature will not match.
 */

const encoder = new TextEncoder();

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

/** Length-independent, value-constant-time comparison of two hex digests. */
export function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function hmacSha256Hex(secret, body) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(body)));
}

/**
 * @returns {Promise<boolean>} true only when the header is present, well
 * formed, and matches the body under `appSecret`.
 */
export async function verifySignature({ rawBody, header, appSecret }) {
  if (!appSecret || typeof header !== 'string') return false;
  if (!header.startsWith('sha256=')) return false;
  const provided = header.slice('sha256='.length).toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(provided)) return false;
  const expected = await hmacSha256Hex(appSecret, rawBody);
  return constantTimeEqual(provided, expected);
}
