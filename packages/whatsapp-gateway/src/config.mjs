/** Resolves the Worker `env` into the plain config object copy/policy expect. */

export function resolveConfig(env = {}) {
  return {
    businessName: env.BUSINESS_NAME ?? 'Wenu Mapu',
    humanName: env.HUMAN_NAME ?? 'Marimari',
    contactEmail: env.CONTACT_EMAIL ?? 'contact@wenumapuonline.com',
    siteUrl: env.SITE_URL ?? 'https://wenumapuonline.com',
    aftercareUrl: env.AFTERCARE_URL ?? 'https://wenumapuonline.com/aftercare/',
    bookingUrl: env.BOOKING_URL ?? '',
    defaultLang: env.DEFAULT_LANG === 'es' ? 'es' : 'en',
    classifierModel: env.CLASSIFIER_MODEL ?? 'claude-opus-5-5',
    classifierLlmEnabled: env.CLASSIFIER_LLM_ENABLED !== '0',
    messageRetentionDays: clampInt(env.MESSAGE_RETENTION_DAYS, 30, 1, 3650),
  };
}

function clampInt(value, fallback, min, max) {
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}
