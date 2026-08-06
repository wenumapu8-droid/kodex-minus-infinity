import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { buildKnowledgeGraph } from '../src/kodex-core.mjs';

const corpusRoot = new URL('../../../data/corpora/kodex-genesis-v0/', import.meta.url);

async function loadJson(name) {
  const content = await readFile(new URL(name, corpusRoot), 'utf8');
  return JSON.parse(content);
}

test('loads the verified KODEX Genesis seed corpus', async () => {
  const [sources, claims, entities, relations] = await Promise.all([
    loadJson('sources.json'),
    loadJson('claims.json'),
    loadJson('entities.json'),
    loadJson('relations.json')
  ]);

  const graph = buildKnowledgeGraph({ sources, claims, entities, relations });

  assert.equal(graph.sources.size, 7);
  assert.equal(graph.claims.size, 7);
  assert.equal(graph.entities.size, 9);
  assert.equal(graph.relations.size, 10);

  const impossibleFormsSource = graph.sources.get('SRC-KDX-IMPOSSIBLE-FORMS-ARCHIVE');
  assert.equal(impossibleFormsSource.publicationStatus, 'BLOCKED');
  assert.equal(impossibleFormsSource.blockReason, 'NON_PUBLIC_SOURCE');

  const impossibleFormsClaim = graph.claims.get('CLM-KDX-006');
  assert.equal(impossibleFormsClaim.publicationStatus, 'BLOCKED');
  assert.equal(impossibleFormsClaim.blockReason, 'SOURCE_PUBLICATION_BLOCKED');

  const interpretation = graph.claims.get('CLM-KDX-007');
  assert.equal(interpretation.class, 'INTERPRETATION');
});
