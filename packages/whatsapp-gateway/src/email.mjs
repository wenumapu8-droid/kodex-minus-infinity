/**
 * Email extraction for the consent-gated capture step.
 *
 * Deliberately conservative: a false positive here means writing a stranger's
 * typo into the lead list, which is worse than asking again.
 */

// No TLD shorter than 2, no consecutive dots, no leading/trailing dot in the
// local part. Not RFC 5322 — RFC 5322 accepts addresses no provider issues.
const EMAIL = /(?<![a-z0-9!#$%&'*+/=?^_`{|}~.-])([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*)@((?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,24})(?![a-z0-9-])/i;

/** @returns {string|null} the first plausible address, lowercased. */
export function extractEmail(text) {
  if (typeof text !== 'string') return null;
  // WhatsApp linkifies addresses; people also paste "mailto:" and trailing
  // punctuation.
  const cleaned = text.replace(/mailto:/gi, ' ').replace(/[<>(),;]/g, ' ');
  const match = EMAIL.exec(cleaned);
  if (!match) return null;
  const email = `${match[1]}@${match[2]}`.toLowerCase();
  if (email.length > 254) return null;
  if (email.includes('..')) return null;
  return email;
}
