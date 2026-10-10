/**
 * Every outbound string the gateway can send.
 *
 * Phase 0 sends only these strings. The model is used to pick a label, never
 * to write to the customer — free-text generation on a business number is
 * exactly where a price commitment or a healing instruction leaks in.
 *
 * Rules encoded here:
 *   - no price, discount or availability is ever stated;
 *   - no aftercare or healing instruction is ever given, only the canonical
 *     link plus a human handoff;
 *   - the first message in a conversation discloses that this is an automated
 *     assistant, and every reply says a human will follow up.
 */

/** Bump when the consent wording changes; stored on each lead row. */
export const CONSENT_TEXT_VERSION = 'v1-2026-10';

const COPY = {
  en: {
    disclosure: ({ businessName, humanName }) =>
      `Hi! This is the ${businessName} automated assistant. I can point you in the right direction and ${humanName} replies in person — usually within a day.`,
    book_piercing: ({ bookingUrl, humanName }) =>
      bookingUrl && !bookingUrl.startsWith('REPLACE')
        ? `For piercings, you can see open times and book here: ${bookingUrl}\n\n${humanName} confirms every appointment personally.`
        : `Got it — piercing. ${humanName} handles scheduling personally and will come back to you with the next open times.`,
    jewelry: ({ siteUrl, humanName }) =>
      `You can browse the current pieces here: ${siteUrl}\n\n${humanName} will reply about this piece in person.`,
    pricing: ({ humanName }) =>
      `I can't quote prices — ${humanName} does that personally so you get the right answer for what you're asking about. I've passed your message along.`,
    aftercare: ({ aftercareUrl, humanName }) =>
      `For healing questions the aftercare guide is here: ${aftercareUrl}\n\n${humanName} will follow up personally. If something looks infected or is getting worse, please see a doctor or a professional piercer in person — I can't assess that over a message.`,
    order_status: ({ humanName }) =>
      `${humanName} will check on your order and get back to you in person.`,
    wholesale: ({ contactEmail, humanName }) =>
      `Thanks for reaching out. For stockist, consignment and press enquiries, ${humanName} replies personally — you can also write to ${contactEmail}.`,
    other: ({ humanName }) =>
      `Thanks for your message — ${humanName} will read it and reply in person.`,
    ask_email: () =>
      `While you're here: would you like the aftercare guide and occasional notes on new pieces by email? Reply with your email address, or "no" — either is fine, and you can stop any time by replying STOP.`,
    email_saved: () =>
      `Saved, thank you. You can stop any time by replying STOP.`,
    email_declined: () =>
      `No problem at all.`,
    opt_out_confirmed: ({ businessName }) =>
      `You're unsubscribed — I won't message you again from ${businessName}. Reply START if you change your mind.`,
    opt_in_confirmed: () =>
      `You're back on. How can I help?`,
    unsupported_media: ({ humanName }) =>
      `Thanks — I can't read attachments, but ${humanName} will see it and reply in person.`,
  },
  es: {
    disclosure: ({ businessName, humanName }) =>
      `¡Hola! Soy el asistente automático de ${businessName}. Te puedo orientar y ${humanName} te responde en persona, normalmente dentro de un día.`,
    book_piercing: ({ bookingUrl, humanName }) =>
      bookingUrl && !bookingUrl.startsWith('REPLACE')
        ? `Para perforaciones puedes ver horarios y agendar aquí: ${bookingUrl}\n\n${humanName} confirma cada cita personalmente.`
        : `Entendido, perforación. ${humanName} coordina las citas personalmente y te confirmará los próximos horarios.`,
    jewelry: ({ siteUrl, humanName }) =>
      `Puedes ver las piezas disponibles aquí: ${siteUrl}\n\n${humanName} te responde por esta pieza en persona.`,
    pricing: ({ humanName }) =>
      `No puedo darte precios — eso lo responde ${humanName} en persona para que la respuesta sea la correcta. Ya le pasé tu mensaje.`,
    aftercare: ({ aftercareUrl, humanName }) =>
      `Para dudas de cicatrización, la guía de cuidados está aquí: ${aftercareUrl}\n\n${humanName} te escribe en persona. Si algo parece infectado o va empeorando, por favor consulta a un médico o a un perforador profesional en persona — eso no lo puedo evaluar por mensaje.`,
    order_status: ({ humanName }) =>
      `${humanName} revisa tu pedido y te responde en persona.`,
    wholesale: ({ contactEmail, humanName }) =>
      `Gracias por escribir. Para mayoristas, consignación y prensa responde ${humanName} en persona — también puedes escribir a ${contactEmail}.`,
    other: ({ humanName }) =>
      `Gracias por tu mensaje — ${humanName} lo lee y te responde en persona.`,
    ask_email: () =>
      `Ya que estás: ¿quieres la guía de cuidados y avisos ocasionales de piezas nuevas por email? Responde con tu correo, o "no" — cualquiera está bien, y puedes salir cuando quieras respondiendo BAJA.`,
    email_saved: () =>
      `Guardado, gracias. Puedes salir cuando quieras respondiendo BAJA.`,
    email_declined: () =>
      `Sin problema.`,
    opt_out_confirmed: ({ businessName }) =>
      `Te dimos de baja — no te volveré a escribir de ${businessName}. Responde ALTA si cambias de opinión.`,
    opt_in_confirmed: () =>
      `Listo, estás de vuelta. ¿En qué te ayudo?`,
    unsupported_media: ({ humanName }) =>
      `Gracias — no puedo leer archivos adjuntos, pero ${humanName} lo verá y te responde en persona.`,
  },
};

/**
 * @param {string} key one of the keys above
 * @param {string} lang 'en' | 'es'
 * @param {object} config resolved config (see config.mjs)
 */
export function copy(key, lang, config) {
  const table = COPY[lang] ?? COPY.en;
  const fn = table[key] ?? COPY.en[key];
  if (!fn) throw new Error(`unknown copy key: ${key}`);
  return fn(config);
}

export const COPY_KEYS = Object.freeze(Object.keys(COPY.en));
