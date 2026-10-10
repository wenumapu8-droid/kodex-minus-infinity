import assert from 'node:assert/strict';
import { test } from 'node:test';

import { constantTimeEqual, hmacSha256Hex, verifySignature } from '../src/signature.mjs';

const SECRET = 'app-secret-under-test';
const BODY = '{"object":"whatsapp_business_account","entry":[]}';

test('accepts a signature computed over the exact raw body', async () => {
  const digest = await hmacSha256Hex(SECRET, BODY);
  const ok = await verifySignature({
    rawBody: BODY,
    header: `sha256=${digest}`,
    appSecret: SECRET,
  });
  assert.equal(ok, true);
});

test('rejects a body that differs by one byte', async () => {
  const digest = await hmacSha256Hex(SECRET, BODY);
  const ok = await verifySignature({
    rawBody: `${BODY} `,
    header: `sha256=${digest}`,
    appSecret: SECRET,
  });
  assert.equal(ok, false);
});

test('rejects a digest made with the wrong secret', async () => {
  const digest = await hmacSha256Hex('other-secret', BODY);
  const ok = await verifySignature({
    rawBody: BODY,
    header: `sha256=${digest}`,
    appSecret: SECRET,
  });
  assert.equal(ok, false);
});

test('rejects malformed, missing and non-hex headers', async () => {
  const digest = await hmacSha256Hex(SECRET, BODY);
  const cases = [
    null,
    undefined,
    '',
    digest,
    `sha1=${digest}`,
    'sha256=',
    'sha256=nothexnothexnothexnothexnothexnothexnothexnothexnothexnothexnothex',
    `sha256=${digest.slice(0, 63)}`,
  ];
  for (const header of cases) {
    const ok = await verifySignature({ rawBody: BODY, header, appSecret: SECRET });
    assert.equal(ok, false, `expected rejection for header: ${String(header)}`);
  }
});

test('rejects everything when no app secret is configured', async () => {
  const digest = await hmacSha256Hex(SECRET, BODY);
  const ok = await verifySignature({
    rawBody: BODY,
    header: `sha256=${digest}`,
    appSecret: undefined,
  });
  assert.equal(ok, false);
});

test('is case insensitive about the hex digest', async () => {
  const digest = await hmacSha256Hex(SECRET, BODY);
  const ok = await verifySignature({
    rawBody: BODY,
    header: `sha256=${digest.toUpperCase()}`,
    appSecret: SECRET,
  });
  assert.equal(ok, true);
});

test('constantTimeEqual compares values, not references', () => {
  assert.equal(constantTimeEqual('abc', 'abc'), true);
  assert.equal(constantTimeEqual('abc', 'abd'), false);
  assert.equal(constantTimeEqual('abc', 'ab'), false);
  assert.equal(constantTimeEqual('abc', null), false);
});
