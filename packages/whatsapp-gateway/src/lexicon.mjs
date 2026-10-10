/**
 * Bilingual keyword sets (English first — the customer base is Truckee/Tahoe —
 * with Spanish alongside).
 *
 * These drive the deterministic classifier. It runs before the model so the
 * gateway still works, cheaply and predictably, when the API is unreachable or
 * switched off.
 */

export const INTENTS = Object.freeze({
  BOOK_PIERCING: 'BOOK_PIERCING',
  JEWELRY: 'JEWELRY',
  PRICING: 'PRICING',
  AFTERCARE: 'AFTERCARE',
  ORDER_STATUS: 'ORDER_STATUS',
  WHOLESALE: 'WHOLESALE',
  OTHER: 'OTHER',
});

/** Every label the LLM classifier is allowed to return. */
export const INTENT_LABELS = Object.freeze(Object.values(INTENTS));

// Ordered by precedence: the first group with a hit wins.
//
// AFTERCARE and ORDER_STATUS sit above PRICING because "how much longer until
// it heals" is a healing question, not a price question. PRICING then sits
// above BOOK_PIERCING and JEWELRY because "how much for a nose piercing" must
// get the no-quote reply and must NOT get the email ask — a price enquiry is
// not a lead-capture turn. A message that both asks a price and asks to book
// resolves to PRICING; the human supplies the booking link with the price.
const PATTERNS = [
  [INTENTS.AFTERCARE, [
    'aftercare', 'after care', 'healing', 'heal', 'infected', 'infection',
    'swollen', 'swelling', 'crust', 'bleeding', 'pus', 'sore', 'irritated',
    'saline', 'clean it', 'hurts', 'pain',
    'cuidado', 'cicatriz', 'sanando', 'sanar', 'infectado', 'infeccion',
    'infección', 'hinchado', 'hinchazon', 'sangra', 'duele', 'dolor', 'pus',
  ]],
  [INTENTS.ORDER_STATUS, [
    'my order', 'order status', 'tracking', 'tracking number', 'shipped',
    'has it shipped', 'where is my', 'usps', 'delivery',
    'mi pedido', 'mi orden', 'rastreo', 'seguimiento', 'envio', 'envío',
    'ya salio', 'ya salió', 'donde esta mi', 'dónde está mi',
  ]],
  [INTENTS.WHOLESALE, [
    'wholesale', 'stockist', 'stock your', 'consignment', 'consign',
    'carry your', 'my studio', 'my shop', 'my store', 'bulk order',
    'collaboration', 'collab', 'partnership', 'press', 'media inquiry',
    'mayorista', 'mayoreo', 'consignacion', 'consignación', 'mi tienda',
    'mi estudio', 'colaboracion', 'colaboración', 'prensa',
  ]],
  [INTENTS.PRICING, [
    'how much', 'price', 'pricing', 'cost', 'costs', 'quote', 'rate',
    'do you have a discount', 'discount', 'cheaper',
    'cuanto', 'cuánto', 'precio', 'precios', 'costo', 'cuesta', 'tarifa',
    'descuento', 'presupuesto',
  ]],
  [INTENTS.BOOK_PIERCING, [
    'piercing', 'pierced', 'piercings', 'appointment', 'book', 'booking',
    'schedule', 'availability', 'available saturday', 'walk in', 'walk-in',
    'perforacion', 'perforación', 'perforar', 'cita', 'agendar', 'reservar',
    'disponibilidad', 'turno',
  ]],
  [INTENTS.JEWELRY, [
    'earring', 'earrings', 'ring', 'necklace', 'pendant', 'bracelet',
    'jewelry', 'jewellery', 'piece', 'silver', 'gold', 'custom order',
    'in stock', 'available', 'etsy', 'buy',
    'aro', 'aros', 'pendiente', 'pendientes', 'anillo', 'collar', 'dije',
    'pulsera', 'joya', 'joyas', 'plata', 'oro', 'pieza', 'comprar',
  ]],
];

const OPT_OUT = [
  'stop', 'unsubscribe', 'opt out', 'remove me', 'leave me alone',
  'baja', 'cancelar suscripcion', 'cancelar suscripción', 'no me escribas',
  'dar de baja', 'eliminar mis datos',
];

const OPT_IN = ['start', 'unstop', 'resume', 'alta', 'suscribirme'];

const AFFIRMATIVE = [
  'yes', 'yeah', 'yep', 'yup', 'sure', 'ok', 'okay', 'please', 'sounds good',
  'si', 'sí', 'claro', 'dale', 'bueno', 'por favor', 'obvio', 'va',
];

const NEGATIVE = [
  'no', 'nope', 'nah', 'no thanks', 'no thank you', 'not now', 'later',
  'rather not', 'skip',
  'no gracias', 'mejor no', 'ahora no', 'despues', 'después', 'paso',
];

const SPANISH_MARKERS = [
  'hola', 'buenas', 'gracias', 'quiero', 'quisiera', 'tengo', 'puedo',
  'cuanto', 'cuánto', 'precio', 'cita', 'joya', 'aros', 'perforacion',
  'perforación', 'por favor', 'disponible', 'donde', 'dónde', 'como', 'cómo',
];

/** Lowercases, strips accents and collapses whitespace for matching. */
export function normalise(text) {
  if (typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasAny(haystack, needles) {
  return needles.some((needle) => haystack.includes(normalise(needle)));
}

/** Matches a whole short message, so "no" opts out but "no thanks" does not. */
function isExactly(haystack, needles) {
  return needles.some((needle) => haystack === normalise(needle));
}

export function isOptOut(text) {
  const t = normalise(text);
  if (!t) return false;
  return isExactly(t, OPT_OUT) || hasAny(t, ['unsubscribe', 'opt out', 'remove me', 'dar de baja', 'no me escribas', 'eliminar mis datos']);
}

export function isOptIn(text) {
  return isExactly(normalise(text), OPT_IN);
}

export function isAffirmative(text) {
  const t = normalise(text);
  if (!t) return false;
  if (isExactly(t, AFFIRMATIVE)) return true;
  // "yes please", "ok sure" — short confirmations only, to avoid swallowing a
  // sentence that merely happens to start with "sure".
  return t.split(' ').length <= 3 && hasAny(t, AFFIRMATIVE) && !hasAny(t, NEGATIVE);
}

export function isNegative(text) {
  const t = normalise(text);
  if (!t) return false;
  if (isExactly(t, NEGATIVE)) return true;
  return t.split(' ').length <= 4 && hasAny(t, NEGATIVE);
}

export function detectLang(text, fallback = 'en') {
  const t = normalise(text);
  if (!t) return fallback;
  if (/[ñ¿¡]/.test(String(text))) return 'es';
  return hasAny(t, SPANISH_MARKERS) ? 'es' : fallback;
}

/**
 * Deterministic intent match.
 * @returns {{intent: string, confident: boolean}} `confident: false` means the
 * caller should escalate to the model classifier.
 */
export function classifyDeterministic(text) {
  const t = normalise(text);
  if (!t) return { intent: INTENTS.OTHER, confident: false };
  for (const [intent, needles] of PATTERNS) {
    if (hasAny(t, needles)) return { intent, confident: true };
  }
  return { intent: INTENTS.OTHER, confident: false };
}
