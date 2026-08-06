import {
  buildKnowledgeGraph,
  createReturnOutput,
  createSessionMemory,
  heartMode,
  startPath,
  writeSessionMemory
} from '../src/kodex-core.mjs';

const graph = buildKnowledgeGraph({
  sources: [
    {
      id: 'SRC-GIT-001',
      title: 'KODEX canonical repository',
      creator: 'Nicolás Ortega / Ocín',
      sourceClass: 'REPOSITORY_RECORD',
      location: 'wenumapu8-droid/kodex-minus-infinity',
      rightsStatus: 'CLEAR',
      privacyStatus: 'PUBLIC',
      culturalStatus: 'STANDARD'
    },
    {
      id: 'SRC-GIT-002',
      title: 'KODEX implementation repository',
      creator: 'Nicolás Ortega / Ocín',
      sourceClass: 'REPOSITORY_RECORD',
      location: 'wenumapu8-droid/wenu-frontend@feature/kodex-depth-engine',
      rightsStatus: 'CLEAR',
      privacyStatus: 'PUBLIC',
      culturalStatus: 'STANDARD'
    }
  ],
  claims: [
    {
      id: 'CLM-001',
      class: 'OBSERVED',
      statement: 'The canonical repository defines a memory-preserving experience graph.',
      sourceIds: ['SRC-GIT-001'],
      publicationStatus: 'ADMITTED'
    },
    {
      id: 'CLM-002',
      class: 'OBSERVED',
      statement: 'The implementation repository contains an Astro KODEX entry and data-driven visual grammar.',
      sourceIds: ['SRC-GIT-002'],
      publicationStatus: 'ADMITTED'
    }
  ],
  entities: [
    {
      id: 'ENT-KODEX',
      type: 'SYSTEM',
      names: ['KODEX−∞'],
      sourceIds: ['SRC-GIT-001', 'SRC-GIT-002']
    },
    {
      id: 'ENT-CANON',
      type: 'RECORD',
      names: ['Canonical operating system'],
      sourceIds: ['SRC-GIT-001']
    },
    {
      id: 'ENT-ASTRO',
      type: 'SYSTEM',
      names: ['Astro implementation'],
      sourceIds: ['SRC-GIT-002']
    },
    {
      id: 'ENT-HEART',
      type: 'SYSTEM',
      names: ['Heart Engine'],
      sourceIds: ['SRC-GIT-001']
    }
  ],
  relations: [
    {
      id: 'REL-001',
      from: 'ENT-KODEX',
      to: 'ENT-CANON',
      type: 'DOCUMENTED_BY',
      certainty: 'CONFIRMED',
      claimIds: ['CLM-001']
    },
    {
      id: 'REL-002',
      from: 'ENT-KODEX',
      to: 'ENT-ASTRO',
      type: 'IMPLEMENTED_BY',
      certainty: 'CONFIRMED',
      claimIds: ['CLM-002']
    },
    {
      id: 'REL-003',
      from: 'ENT-CANON',
      to: 'ENT-HEART',
      type: 'CONTAINS',
      certainty: 'CONFIRMED',
      claimIds: ['CLM-001']
    }
  ]
});

const path = startPath('OBSERVE');
console.log('PATH', path);

let memory = createSessionMemory({
  sessionId: 'session:genesis-example',
  startedAt: new Date().toISOString(),
  accessibility: { motion: 'REDUCED', sound: 'OFF' }
});

memory = writeSessionMemory(memory, {
  type: 'PATH_DECISION',
  nodeId: 'threshold',
  decision: path.choice,
  writesToMemory: true
});

memory = writeSessionMemory(memory, {
  type: 'RELATION_TRACED',
  nodeId: 'archive',
  sourceIds: ['SRC-GIT-001'],
  claimIds: ['CLM-001'],
  entityIds: ['ENT-KODEX', 'ENT-CANON'],
  relationIds: ['REL-001'],
  writesToMemory: true
});

const heart = heartMode('NATURAL_BREATH');
memory = writeSessionMemory(memory, {
  type: 'HEART_MODE_SELECTED',
  nodeId: 'heart',
  heartMode: heart.mode,
  writesToMemory: true
});

const output = createReturnOutput(memory, graph, {
  provenanceAvailable: true,
  controlsAvailable: true,
  softwareVersion: '0.1.0'
});

console.log(JSON.stringify(output, null, 2));
