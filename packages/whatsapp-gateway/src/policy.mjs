/**
 * The guardrail layer: which copy key an intent maps to, whether a human must
 * be flagged, and whether the email ask is allowed in this turn.
 *
 * Kept separate from the conversation state machine so the rules can be read
 * and tested on their own.
 */

import { INTENTS } from './lexicon.mjs';

const RULES = {
  [INTENTS.BOOK_PIERCING]: { copyKey: 'book_piercing', handoff: true, mayAskEmail: true },
  [INTENTS.JEWELRY]: { copyKey: 'jewelry', handoff: true, mayAskEmail: true },
  // Never quote. Always a human.
  [INTENTS.PRICING]: { copyKey: 'pricing', handoff: true, mayAskEmail: false },
  // Never advise. Always a human, and never a marketing ask in the same turn:
  // someone worried about an infection is not a lead-capture opportunity.
  [INTENTS.AFTERCARE]: { copyKey: 'aftercare', handoff: true, mayAskEmail: false },
  [INTENTS.ORDER_STATUS]: { copyKey: 'order_status', handoff: true, mayAskEmail: false },
  [INTENTS.WHOLESALE]: { copyKey: 'wholesale', handoff: true, mayAskEmail: false },
  [INTENTS.OTHER]: { copyKey: 'other', handoff: true, mayAskEmail: true },
};

/** Falls back to OTHER for any label not in the table. */
export function ruleFor(intent) {
  return RULES[intent] ?? RULES[INTENTS.OTHER];
}

export const POLICY_INVARIANTS = Object.freeze([
  'never state a price, discount or availability',
  'never give aftercare, healing or medical guidance beyond the canonical link',
  'never confirm an appointment',
  'always disclose that this is an automated assistant on first contact',
  'always route to a human',
  'never ask for an email in an aftercare or pricing turn',
  'honour opt-out immediately and silently thereafter',
]);
