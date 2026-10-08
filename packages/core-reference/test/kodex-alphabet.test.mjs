import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

import {
  ENTRY_COORDINATE,
  HEART_COORDINATE,
  TERMINAL_COORDINATE,
  KodexAlphabetError,
  availableEdges,
  canConvergeToY,
  commitAction,
  commitTransition,
  createAlphabetJourney,
  deriveReturn,
  edgeResolverInputs,
  enterHeart,
  exitHeart,
  explainEdge,
  heartPortalState,
  loadCoordinateGraph,
  replayTrajectory,
  trajectorySignature
} from '../src/kodex-alphabet.mjs';

const FIXTURE_URL = new URL(
  '../../../experiences/vertical-slice-v0/qa/trajectory-fixture.v0.json',
  import.meta.url
);

const fixture = JSON.parse(readFileSync(fileURLToPath(FIXTURE_URL), 'utf8'));
const graph = loadCoordinateGraph(fixture);
const replayOptions = { serendipitySeed: fixture.serendipitySeed };

function replay(trajectoryId) {
  const trajectory = fixture.trajectories.find((item) => item.id === trajectoryId);
  assert.ok(trajectory, `fixture declares ${trajectoryId}`);
  return { trajectory, journey: replayTrajectory(graph, trajectory.steps, replayOptions) };
}

test('the QA fixture never poses as canon', () => {
  assert.equal(fixture.authority, 'NON_CANONICAL_QA_FIXTURE');
  assert.equal(fixture.conceptAssignmentAuthority, 'UNASSIGNED_PENDING_CREATOR_APPROVAL');
  for (const node of fixture.nodes) {
    assert.deepEqual(node.conceptIds, [], `${node.coordinate} assigns no concept`);
  }
});

test('a graph that assigns concepts to coordinates is refused', () => {
  assert.throws(
    () =>
      loadCoordinateGraph({
        nodes: [
          {
            coordinate: 'A',
            epistemicStatus: 'CANONICAL',
            conceptIds: ['CONCEPT-INVENTED']
          },
          { coordinate: 'Y', epistemicStatus: 'CANONICAL' }
        ],
        edges: [
          {
            id: 'E',
            from: 'A',
            to: 'Y',
            accessibility: { keyboard: 'Enter', reducedMotion: 'cut' }
          }
        ]
      }),
    /CREATOR_APPROVAL/
  );
});

test('an edge without a non-pointer equivalent is refused', () => {
  assert.throws(
    () =>
      loadCoordinateGraph({
        nodes: [
          { coordinate: 'A', epistemicStatus: 'CANONICAL' },
          { coordinate: 'Y', epistemicStatus: 'CANONICAL' }
        ],
        edges: [{ id: 'E', from: 'A', to: 'Y', accessibility: { keyboard: 'Enter' } }]
      }),
    /reducedMotion/
  );
});

test('every journey begins at A and writes memory there', () => {
  const journey = createAlphabetJourney({ graph, ...replayOptions });
  assert.equal(journey.currentCoordinate, ENTRY_COORDINATE);
  assert.deepEqual([...journey.letterTrace], [ENTRY_COORDINATE]);
  assert.equal(journey.events[0].type, 'INITIAL_MEMORY_WRITE');
});

test('ranking vocabulary is rejected rather than documented away', () => {
  assert.throws(
    () => createAlphabetJourney({ graph, consent: { coherenceScore: 0.9 } }),
    KodexAlphabetError
  );
});

test('all eight declared trajectories replay to their exact letters', () => {
  assert.ok(
    fixture.trajectories.length >= 8,
    'the slice requires at least eight validation trajectories'
  );
  for (const trajectory of fixture.trajectories) {
    const journey = replayTrajectory(graph, trajectory.steps, replayOptions);
    assert.deepEqual(
      [...journey.letterTrace],
      trajectory.letters,
      `${trajectory.id} letter trace`
    );
    assert.equal(journey.currentCoordinate, TERMINAL_COORDINATE, `${trajectory.id} ends at Y`);
    assert.equal(journey.converged, true, `${trajectory.id} converged`);
  }
});

test('signatures are deterministic, path-dependent and unique', () => {
  const signatures = new Set();
  for (const trajectory of fixture.trajectories) {
    const first = trajectorySignature(
      replayTrajectory(graph, trajectory.steps, replayOptions)
    );
    const second = trajectorySignature(
      replayTrajectory(graph, trajectory.steps, replayOptions)
    );
    assert.equal(first, second, `${trajectory.id} is deterministic`);
    assert.equal(first, trajectory.signature, `${trajectory.id} matches its golden signature`);
    signatures.add(first);
  }
  assert.equal(signatures.size, fixture.trajectories.length, 'no two routes share an artifact');
});

test('routes are resolved by state, not by alphabet order', () => {
  const nonAlphabetical = fixture.trajectories.filter((trajectory) =>
    trajectory.letters.some(
      (letter, index) => index > 0 && letter <= trajectory.letters[index - 1]
    )
  );
  assert.ok(nonAlphabetical.length >= 2, 'at least two non-alphabetical routes exist');
});

test('A offers more than one exit and three coordinates are decision moments', () => {
  const journey = createAlphabetJourney({ graph, ...replayOptions });
  assert.ok(availableEdges(journey).length >= 2, 'A has multiple state-dependent exits');

  const exits = new Map();
  for (const edge of graph.edges.values()) {
    exits.set(edge.from, (exits.get(edge.from) ?? 0) + 1);
  }
  const multiExit = [...exits.entries()].filter(([, count]) => count >= 2);
  assert.ok(multiExit.length >= 3, 'at least three multi-exit decision moments');
});

test('a loop produces a mutated revisit derived from memory', () => {
  const { journey } = replay('T8');
  assert.equal(journey.visitCounts.K, 2, 'K was visited twice');
  assert.equal(journey.mutations.length, 1, 'the revisit mutated');
  const [mutation] = journey.mutations;
  assert.equal(mutation.coordinate, 'K');
  assert.equal(mutation.visit, 2);
  assert.equal(mutation.derivedFrom, 'SESSION_MEMORY');

  const other = replay('T2').journey;
  assert.notEqual(
    other.mutations[0].mutationId,
    mutation.mutationId,
    'the same coordinate mutates differently along a different route'
  );
});

test('an uncommitted offered action becomes an ignored signal with a later effect', () => {
  const { journey } = replay('T1');
  const ignored = journey.ignoredSignals.find(
    (entry) => entry.actionId === 'TRACE_CODE_RELATION'
  );
  assert.ok(ignored, 'leaving C without tracing is recorded');
  assert.deepEqual([...ignored.wouldHaveUnlocked], ['E-F-Y']);

  const atF = replayTrajectory(
    graph,
    [
      { type: 'TRANSITION', edgeId: 'E-A-C' },
      { type: 'TRANSITION', edgeId: 'E-C-F' }
    ],
    replayOptions
  );
  assert.equal(explainEdge(atF, 'E-F-Y').available, false, 'the early return stayed closed');

  const output = deriveReturn(journey);
  const effects = output.ignored_signals_with_later_effect;
  assert.equal(effects.length, 1);
  assert.equal(effects[0].ranked, false, 'an ignored signal is recorded, never scored');
});

test('a committed action produces a delayed consequence that is realized later', () => {
  const { journey } = replay('T3');
  assert.equal(journey.delayedConsequences.length, 1);
  const [consequence] = journey.delayedConsequences;
  assert.equal(consequence.cause, 'TRACE_CODE_RELATION');
  assert.equal(consequence.causeCoordinate, 'C');
  assert.equal(consequence.unlocksEdge, 'E-F-Y');
  assert.ok(
    consequence.realizedAtEventIndex > consequence.causeEventIndex,
    'the consequence arrived after its cause'
  );
});

test('an unavailable edge explains itself instead of failing silently', () => {
  const journey = replayTrajectory(
    graph,
    [
      { type: 'TRANSITION', edgeId: 'E-A-B' },
      { type: 'TRANSITION', edgeId: 'E-B-K' }
    ],
    replayOptions
  );
  const explanation = explainEdge(journey, 'E-K-X');
  assert.equal(explanation.available, false);
  assert.deepEqual([...explanation.reasons], ['requires K visited at least 2 times']);
  assert.throws(() => commitTransition(journey, 'E-K-X'), /not available/);
});

test('the nine declared resolver inputs are inspectable', () => {
  const { journey } = replay('T8');
  const inputs = edgeResolverInputs(journey);
  assert.deepEqual(Object.keys(inputs).sort(), [
    'accessibility_mode',
    'bounded_serendipity_seed',
    'committed_actions',
    'current_letter',
    'ignored_signals',
    'spectral_state',
    'traced_relations',
    'visit_counts',
    'visited_letters'
  ]);
});

test('M is optional, voluntary, and reachable from more than one region', () => {
  const withoutHeart = replay('T5').journey;
  assert.equal(withoutHeart.converged, true, 'a journey completes without the Heart');
  assert.equal(withoutHeart.heart.visits.length, 0);

  const approachRegions = new Set(
    [...graph.edges.values()]
      .filter((edge) => edge.to === HEART_COORDINATE)
      .map((edge) => graph.nodes.get(edge.from).region)
  );
  assert.ok(approachRegions.size >= 2, 'the Heart is approachable from several regions');

  const atK = replayTrajectory(
    graph,
    [
      { type: 'TRANSITION', edgeId: 'E-A-B' },
      { type: 'TRANSITION', edgeId: 'E-B-K' }
    ],
    replayOptions
  );
  assert.equal(heartPortalState(atK), 'AVAILABLE');
  assert.equal(heartPortalState(createAlphabetJourney({ graph, ...replayOptions })), 'LATENT');
  assert.throws(() => commitTransition(atK, 'E-K-M'), /voluntary/);
});

test('leaving the Heart restores the exact prior anchor', () => {
  const atK = replayTrajectory(
    graph,
    [
      { type: 'TRANSITION', edgeId: 'E-A-B' },
      { type: 'TRANSITION', edgeId: 'E-B-K' }
    ],
    replayOptions
  );
  const inside = enterHeart(atK);
  assert.equal(inside.currentCoordinate, HEART_COORDINATE);
  assert.equal(inside.heart.anchor, 'K');
  assert.deepEqual(availableEdges(inside), [], 'the route is suspended inside the Heart');
  assert.throws(() => commitTransition(inside, 'E-K-R'), /exitHeart/);

  const restored = exitHeart(inside);
  assert.equal(restored.currentCoordinate, 'K');
  assert.equal(
    restored.visitCounts.K,
    atK.visitCounts.K,
    'returning from depth does not count as a new visit'
  );
  assert.equal(restored.mutations.length, atK.mutations.length, 'the anchor was not rewritten');
});

test('reduced motion changes the route and never blocks convergence', () => {
  const reduced = replayTrajectory(graph, replay('T5').trajectory.steps, {
    ...replayOptions,
    accessibility: { motion: 'REDUCED', sound: 'OFF' }
  });
  assert.equal(reduced.converged, true);
  assert.notEqual(
    trajectorySignature(reduced),
    replay('T5').trajectory.signature,
    'accessibility mode is part of the resolver state'
  );
});

test('convergence is gated and explains itself', () => {
  const atC = replayTrajectory(graph, [{ type: 'TRANSITION', edgeId: 'E-A-C' }], replayOptions);
  const gate = canConvergeToY(atC);
  assert.equal(gate.ok, false);
  assert.ok(gate.reasons.some((reason) => reason.includes('no available edge')));
  assert.throws(() => deriveReturn(atC), /cannot derive RETURN/);
});

test('RETURN is derived from the complete event trace', () => {
  const { journey } = replay('T2');
  const output = deriveReturn(journey);

  assert.deepEqual(Object.keys(output).sort(), [
    'committed_actions',
    'delayed_consequences',
    'epistemic_status_and_uncertainty',
    'ignored_signals_with_later_effect',
    'm_visit_status_without_ranking',
    'reentry_possibilities',
    'revisit_mutations',
    'route_specific_artifact',
    'source_access',
    'spectral_trace',
    'traced_relations',
    'unresolved_questions',
    'visit_counts',
    'visited_letters'
  ]);

  assert.deepEqual([...output.visited_letters].sort(), ['A', 'B', 'K', 'M', 'R', 'X', 'Y']);
  assert.equal(output.m_visit_status_without_ranking.visited, true);
  assert.equal(output.m_visit_status_without_ranking.ranked, false);
  assert.deepEqual([...output.m_visit_status_without_ranking.anchors], ['K']);
  assert.equal(output.route_specific_artifact.signature, trajectorySignature(journey));
  assert.ok(output.unresolved_questions.length > 0, 'open questions travel to RETURN');
  assert.ok(
    output.epistemic_status_and_uncertainty.every((entry) => entry.epistemicStatus),
    'every visited coordinate carries its epistemic status'
  );

  const reentry = output.reentry_possibilities.map((entry) => entry.coordinate);
  assert.ok(reentry.includes('C'), 'unseen coordinates remain open for re-entry');
  assert.ok(!reentry.includes('Y'), 'the terminal is not a re-entry target');
});

test('a route with the Heart and a route without it differ at RETURN', () => {
  const withHeart = deriveReturn(replay('T2').journey);
  const withoutHeart = deriveReturn(replay('T8').journey);
  assert.notEqual(
    withHeart.route_specific_artifact.signature,
    withoutHeart.route_specific_artifact.signature
  );
  assert.equal(withoutHeart.m_visit_status_without_ranking.visited, false);
});

test('an action the coordinate does not offer is refused', () => {
  const journey = createAlphabetJourney({ graph, ...replayOptions });
  assert.throws(() => commitAction(journey, 'TRACE_CODE_RELATION'), /does not offer/);
});
