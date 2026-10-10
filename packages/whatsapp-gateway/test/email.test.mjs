import assert from 'node:assert/strict';
import { test } from 'node:test';

import { extractEmail } from '../src/email.mjs';

test('extracts and lowercases a plain address', () => {
  assert.equal(extractEmail('Ada.Lovelace@Example.COM'), 'ada.lovelace@example.com');
});

test('extracts from a sentence and strips surrounding punctuation', () => {
  assert.equal(extractEmail('sure, it is ada@example.com, thanks!'), 'ada@example.com');
  assert.equal(extractEmail('<ada@example.com>'), 'ada@example.com');
  assert.equal(extractEmail('mailto:ada@example.com'), 'ada@example.com');
  assert.equal(extractEmail('(ada@example.co.uk)'), 'ada@example.co.uk');
});

test('extracts an address at the end of a sentence', () => {
  assert.equal(extractEmail('you can write to ada@example.com.'), 'ada@example.com');
  assert.equal(extractEmail('mine is ada@example.co.uk. thanks'), 'ada@example.co.uk');
});

test('does not start matching in the middle of a mistyped local part', () => {
  // Regression: a \b anchor used to let this yield "lovelace@example.com".
  assert.equal(extractEmail('ada..lovelace@example.com'), null);
});

test('handles plus addressing and hyphenated domains', () => {
  assert.equal(extractEmail('ada+piercing@my-domain.io'), 'ada+piercing@my-domain.io');
});

test('returns null for things that are not addresses', () => {
  const cases = [
    null,
    undefined,
    '',
    'yes',
    'yes please send it',
    'ada@',
    '@example.com',
    'ada@example',
    'ada@@example.com',
    'ada..lovelace@example.com',
    'ada@example..com',
    'call me at 555-0100',
  ];
  for (const value of cases) {
    assert.equal(extractEmail(value), null, `expected null for ${String(value)}`);
  }
});

test('rejects an over-long address', () => {
  const long = `${'a'.repeat(250)}@example.com`;
  assert.equal(extractEmail(long), null);
});
