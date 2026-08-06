import assert from 'node:assert/strict';
import test from 'node:test';

import {
  KodexValidationError,
  buildKnowledgeGraph,
  canConverge,
  composeScene,
  createArtifactSeed,
  createReturnOutput,
  createSemanticPassport,
  createSessionMemory,
  generatePathArtifactManifest,
  heartMode,
  startPath,
  validateClaim,
  writeSessionMemory
} from '../src/kodex-core.mjs';

const sources = [
  {
    id: 'SRC-GIT-001',
    title: 'KODEX canonical repository',
    creator: 'Nicolás Ortega / Ocín',
    sourceClass: 'REPOSITORY_RECORD',
    location: 'wenumapu8-droid/kodex-minus-infinity',
    rightsStatus: 'CLEAR',
    privacyStatus: 'PUBLIC',
    culturalStatus: 'STANDARD'
  }
];

const claims = [
  {
    id: 'CLM-001',
    class: 'OBSERVED',
    statement: 'The repository contains a canonical experience graph.',
    sourceIds: ['SRC-GIT-001'],
    publicationStatus: 'ADMITTED'
  }
];

const entities = [
  {
    id: 'ENT-KODEX',
    type: 'SYSTEM',
    names: ['KODEX−∞'],
    sourceIds: ['SRC-GIT-001']
  },
  {
    id: 'ENT-GRAPH',
    type: 'RECORD',
    names: ['Experience graph'],
    sourceIds: ['SRC-GIT-001']
  },
  {
    id: 'ENT-HEART',
    type: 'SYSTEM',
    names: ['Heart Engine'],
    sourceIds: ['SRC-GIT-001']
  }
];

const relations = [
  {
    id: 'REL-001',
    from: 'ENT-KODEX',
    to: 'ENT-GRAPH',
    type: 'CONTAINS',
    certainty: 'CONFIRMED',
    claimIds: ['CLM-001']
  },
  {
    id: 'REL-002',
    from: 'ENT-GRAPH',
    to: 'ENT-HEART',
    type: 'CONTAINS',
    certainty: 'CONFIRMED',
    claimIds: ['CLM-001']
  }
];

function graphFixture() {
  return buildKnowledgeGraph({ sources, claims, entities, relations });
}

test('validates a sourced observed claim', () => {
  const sourceIndex = new Map(sources.map((source) => [source.id, source]));
  const result = validateClaim(claims[0], sourceIndex);
  assert.equal(result.publicationStatus, 'ADMITTED');
});

test('blocks unsupported percentages without a denominator', () => {
  assert.throws(
    () =>
      validateClaim({
        id: 'CLM-BAD',
        class: 'DERIVED',
        statement: 'A percentage exists.',
        sourceIds: ['SRC-GIT-001'],
        quantitative: true,
        percentage: true,
        value: 42,
        definition: 'Test percentage',
        timeScope: '2026',
        formula: 'a / b * 100',
        publicationStatus: 'REVIEW'
      }),
    KodexValidationError
  );
});

test('requires proxy limitations', () => {
  assert.throws(
    () =>
      validateClaim({
        id: 'CLM-PROXY',
        class: 'PROXY',
        statement: 'Visibility is approximated by catalogue count.',
        sourceIds: ['SRC-GIT-001'],
        publicationStatus: 'REVIEW'
      }),
    /limitations/
  );
});

test('builds a typed graph and adjacency index', () => {
  const graph = graphFixture();
  assert.equal(graph.sources.size, 1);
  assert.equal(graph.claims.size, 1);
  assert.equal(graph.entities.size, 3);
  assert.equal(graph.relations.size, 2);
  assert.deepEqual([...graph.adjacency.get('ENT-GRAPH')], ['REL-001', 'REL-002']);
});

test('creates distinct OBSERVE and REMEMBER path grammars', () => {
  assert.equal(startPath('OBSERVE').artifactGrammar, 'relation_constellation');
  assert.equal(startPath('remember').artifactGrammar, 'memory_topography');
});

test('blocks an admitted visual element without grounding', () => {
  assert.throws(
    () =>
      createSemanticPassport({
        elementId: 'VIS-EMPTY',
        sceneId: 'ARCHIVE',
        questionSupported: 'What exists?',
        meaning: 'Decorative unexplained glow',
        channel: 'color',
        uncertaintyBehavior: 'none',
        missingValueBehavior: 'none',
        interactionRole: 'NONE',
        status: 'ADMITTED'
      }),
    /grounding/
  );
});

test('admits a source-grounded visual element', () => {
  const passport = createSemanticPassport({
    elementId: 'VIS-REL-001',
    sceneId: 'ARCHIVE',
    questionSupported: 'How are things connected?',
    sourceFields: ['relation.type'],
    claimIds: ['CLM-001'],
    meaning: 'A confirmed relation',
    channel: 'connection',
    scale: 'topological',
    uncertaintyBehavior: 'certainty changes line pattern',
    missingValueBehavior: 'unresolved edge remains open',
    interactionRole: 'TRACE',
    status: 'ADMITTED',
    priority: 'PRIMARY'
  });

  assert.equal(passport.status, 'ADMITTED');
});

test('enforces high-priority motion budget', () => {
  const passport = {
    elementId: 'VIS-REL-001',
    sceneId: 'ARCHIVE',
    questionSupported: 'How are things connected?',
    sourceFields: ['relation.type'],
    meaning: 'A confirmed relation',
    channel: 'connection',
    uncertaintyBehavior: 'line style changes',
    missingValueBehavior: 'open edge',
    interactionRole: 'TRACE',
    status: 'ADMITTED',
    priority: 'PRIMARY'
  };

  assert.throws(
    () =>
      composeScene({
        question: { id: 'Q-001' },
        moduleId: 'archive',
        passports: [passport],
        motion: [
          { id: 'M-1', priority: 'HIGH' },
          { id: 'M-2', priority: 'HIGH' },
          { id: 'M-3', priority: 'HIGH' }
        ]
      }),
    /high-priority/
  );
});

test('writes only meaningful events to session memory', () => {
  const initial = createSessionMemory({ sessionId: 'session:test' });
  const ignored = writeSessionMemory(initial, {
    type: 'POINTER_MOVE',
    nodeId: 'archive',
    writesToMemory: true
  });
  assert.equal(ignored.path.length, 0);

  const threshold = writeSessionMemory(initial, {
    type: 'PATH_DECISION',
    nodeId: 'threshold',
    decision: 'OBSERVE',
    writesToMemory: true
  });
  assert.deepEqual(threshold.path, ['threshold']);
  assert.deepEqual(threshold.decisions, ['OBSERVE']);

  const archive = writeSessionMemory(threshold, {
    type: 'RELATION_TRACED',
    nodeId: 'archive',
    sourceIds: ['SRC-GIT-001'],
    claimIds: ['CLM-001'],
    entityIds: ['ENT-KODEX', 'ENT-GRAPH'],
    relationIds: ['REL-001'],
    writesToMemory: true
  });

  assert.deepEqual(archive.path, ['threshold', 'archive']);
  assert.deepEqual(archive.relationsTraced, ['REL-001']);
});

test('creates stable technical artifact seeds', () => {
  const memory = createSessionMemory({
    sessionId: 'session:test',
    decisions: ['OBSERVE'],
    relationsTraced: ['REL-001'],
    sourcesOpened: ['SRC-GIT-001']
  });

  assert.equal(createArtifactSeed(memory), createArtifactSeed(memory));
  assert.match(createArtifactSeed(memory), /^kdx-[a-f0-9]{8}$/);
});

test('generates distinct artifact grammar from the path', () => {
  const observe = createSessionMemory({
    sessionId: 'session:observe',
    decisions: ['OBSERVE']
  });
  const remember = createSessionMemory({
    sessionId: 'session:remember',
    decisions: ['REMEMBER']
  });

  assert.equal(generatePathArtifactManifest(observe).grammar, 'relation_constellation');
  assert.equal(generatePathArtifactManifest(remember).grammar, 'memory_topography');
});

test('requires a path, decision, provenance and controls before convergence', () => {
  const memory = createSessionMemory({
    sessionId: 'session:test',
    path: ['threshold', 'archive'],
    decisions: ['OBSERVE']
  });

  assert.equal(canConverge(memory), false);
  assert.equal(
    canConverge(memory, { provenanceAvailable: true, controlsAvailable: true }),
    true
  );
});

test('creates Return output and connected unseen re-entry', () => {
  const graph = graphFixture();
  let memory = createSessionMemory({ sessionId: 'session:return' });
  memory = writeSessionMemory(memory, {
    type: 'PATH_DECISION',
    nodeId: 'threshold',
    decision: 'OBSERVE',
    writesToMemory: true
  });
  memory = writeSessionMemory(memory, {
    type: 'TRACE',
    nodeId: 'archive',
    sourceIds: ['SRC-GIT-001'],
    claimIds: ['CLM-001'],
    entityIds: ['ENT-KODEX', 'ENT-GRAPH'],
    relationIds: ['REL-001'],
    writesToMemory: true
  });
  memory = writeSessionMemory(memory, {
    type: 'ORIENT',
    nodeId: 'heart',
    heartMode: 'NATURAL_BREATH',
    writesToMemory: true
  });

  const output = createReturnOutput(memory, graph, {
    provenanceAvailable: true,
    controlsAvailable: true
  });

  assert.equal(output.pathSummary.sourcesOpened, 1);
  assert.equal(output.artifact.grammar, 'relation_constellation');
  assert.equal(output.reEntryOptions[0].relationId, 'REL-002');
});

test('Heart modes preserve non-medical labeling', () => {
  assert.equal(heartMode('NATURAL_BREATH').measured, false);
  assert.equal(heartMode('GUIDED_PULSE').label, 'GUIDED / NOT MEASURED');
  assert.equal(heartMode('TAP_PULSE').label, 'USER INPUT / NOT MEDICAL');
  assert.throws(() => heartMode('SENSOR_PULSE'), /unavailable/);
});
