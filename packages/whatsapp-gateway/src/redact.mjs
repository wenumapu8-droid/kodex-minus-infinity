/**
 * Log helpers. Message bodies and full phone numbers never reach the log —
 * Workers logs are not the right place for customer content.
 */

export function maskWaId(waId) {
  if (typeof waId !== 'string' || waId.length < 4) return '***';
  return `***${waId.slice(-4)}`;
}

export function logEvent(event, fields = {}) {
  const safe = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null) continue;
    safe[key] = typeof value === 'string' && key === 'waId' ? maskWaId(value) : value;
  }
  console.log(JSON.stringify({ event, ...safe }));
}
