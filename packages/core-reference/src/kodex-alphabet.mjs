/**
 * KODEX-infinity alphabet coordinate engine.
 *
 * `kodex-core.mjs` implements the pre-ADR-0010 path model
 * (OBSERVE / REMEMBER / CONNECT / TRANSFORM / CONTRIBUTE) together with the
 * knowledge-graph, passport and session-memory primitives. It has no notion of
 * the A-Y coordinate system, so ADR-0010 had no executable reference at all.
 *
 * This module is additive: it does not modify, wrap or replace `kodex-core`.
 * It implements only the structural half of ADR-0010 that canon already fixes:
 *
 *   - A is the single common origin and performs the first memory write;
 *   - B..X form an interwoven field resolved by state, not by alphabet order;
 *   - M is an optional distributed Heart entered voluntarily, whose exit
 *     restores the exact prior route anchor;
 *   - Y is derived from the complete event trace;
 *   - revisits may mutate; loops are legal; every decision has a consequence.
 *
 * It deliberately implements NO concept assignment for B..X. That assignment
 * requires CREATOR_APPROVAL (`data/alphabet-topology.json`
 * conceptAssignmentRequirements) and is supplied as graph data, never by this
 * engine. Routes used in tests are QA fixtures, not architecture.
 *
 * Forbidden by canon and therefore absent by construction: visitor scoring,
 * ranking, readiness or coherence metrics, passive semantic inference,
 * auto-navigation and non-deterministic randomness.
 */

export const ENTRY_COORDINATE = 'A';
export const HEART_COORDINATE = 'M';
export const TERMINAL_COORDINATE = 'Y';

export const COORDINATES = Object.freeze(
  Array.from({ length: 25 }, (_, index) => String.fromCharCode(65 + index))
);

export const INTERMEDIATE_COORDINATES = Object.freeze(
  COORDINATES.filter(
    (letter) =>
      letter !== ENTRY_COORDINATE &&
      letter !== HEART_COORDINATE &&
      letter !== TERMINAL_COORDINATE
  )
);

export const HEART_PORTAL_STATES = Object.freeze(['LATENT', 'RESONANT', 'AVAILABLE']);

export const MOTION_MODES = Object.freeze(['FULL', 'REDUCED', 'OFF']);

const EPISTEMIC_STATUSES = new Set([
  'VERIFIED',
  'CANONICAL',
  'INFERRED',
  'SPECULATIVE',
  'NEEDS_CONFIRMATION',
  'DEPRECATED'
]);

/**
 * Vocabulary canon rejects. Guarded rather than merely documented so a later
 * contributor cannot quietly reintroduce visitor ranking through options.
 */
const FORBIDDEN_FIELD_TOKENS = [
  'score',
  'ranking',
  'rank',
  'readiness',
  'coherence',
  'autonavigate'
];

export class KodexAlphabetError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'KodexAlphabetError';
    this.details = details;
  }
}

function fail(message, details) {
  throw new KodexAlphabetError(message, details);
}

/** Deterministic 32-bit hash. The engine never uses Math.random. */
function fnv1a(text) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

function hex(value) {
  return value.toString(16).padStart(8, '0');
}

export function assertNoRanking(payload, context = 'payload') {
  const walk = (node, path) => {
    if (Array.isArray(node)) {
      node.forEach((item, index) => walk(item, `${path}[${index}]`));
      return;
    }
    if (node && typeof node === 'object') {
      for (const [key, value] of Object.entries(node)) {
        const lowered = key.toLowerCase();
        const hit = FORBIDDEN_FIELD_TOKENS.find((token) => lowered.includes(token));
        if (hit) {
          fail(
            `${context} field ${path}.${key} uses forbidden ranking vocabulary "${hit}"`,
            { path: `${path}.${key}`, token: hit }
          );
        }
        walk(value, `${path}.${key}`);
      }
    }
  };
  walk(payload, context);
  return payload;
}

// ---------------------------------------------------------------------------
// Coordinate graph
// ---------------------------------------------------------------------------

/**
 * Validate and freeze a coordinate graph. Concept assignment is rejected here:
 * only the creator may assign concepts to B..X, so a graph that carries
 * conceptIds is refused rather than silently accepted as canon.
 */
export function loadCoordinateGraph(document) {
  if (!document || typeof document !== 'object') {
    fail('coordinate graph must be an object');
  }

  const nodes = Array.isArray(document.nodes) ? document.nodes : null;
  const edges = Array.isArray(document.edges) ? document.edges : null;
  if (!nodes || nodes.length === 0) fail('coordinate graph requires nodes');
  if (!edges || edges.length === 0) fail('coordinate graph requires edges');

  const nodesByCoordinate = new Map();
  for (const node of nodes) {
    const coordinate = node?.coordinate;
    if (!COORDINATES.includes(coordinate)) {
      fail(`node coordinate "${coordinate}" is outside A..Y`, { coordinate });
    }
    if (nodesByCoordinate.has(coordinate)) {
      fail(`duplicate node for coordinate ${coordinate}`, { coordinate });
    }
    if (Array.isArray(node.conceptIds) && node.conceptIds.length > 0) {
      fail(
        `node ${coordinate} assigns conceptIds; B..X concept assignment requires CREATOR_APPROVAL`,
        { coordinate }
      );
    }
    if (!EPISTEMIC_STATUSES.has(node.epistemicStatus)) {
      fail(`node ${coordinate} has an invalid epistemicStatus`, {
        coordinate,
        epistemicStatus: node.epistemicStatus
      });
    }
    nodesByCoordinate.set(coordinate, Object.freeze({
      coordinate,
      region: node.region ?? null,
      spectral: node.spectral ?? null,
      offersActions: Object.freeze(
        (node.offersActions ?? []).map((offered) => {
          const action = typeof offered === 'string' ? { id: offered } : offered ?? {};
          if (typeof action.id !== 'string' || action.id === '') {
            fail(`node ${coordinate} declares an action without an id`, { coordinate });
          }
          return Object.freeze({
            id: action.id,
            unlocksEdges: Object.freeze([...(action.unlocksEdges ?? [])]),
            relationId: action.relationId ?? null,
            sourceIds: Object.freeze([...(action.sourceIds ?? [])])
          });
        })
      ),
      mutatesOnRevisit: node.mutatesOnRevisit === true,
      epistemicStatus: node.epistemicStatus,
      sourceIds: Object.freeze([...(node.sourceIds ?? [])]),
      rightsStatus: node.rightsStatus ?? 'NEEDS_CONFIRMATION',
      culturalStatus: node.culturalStatus ?? 'NEEDS_CONFIRMATION',
      unresolvedQuestions: Object.freeze([...(node.unresolvedQuestions ?? [])])
    }));
  }

  if (!nodesByCoordinate.has(ENTRY_COORDINATE)) {
    fail(`coordinate graph must contain the common origin ${ENTRY_COORDINATE}`);
  }
  if (!nodesByCoordinate.has(TERMINAL_COORDINATE)) {
    fail(`coordinate graph must contain the terminal ${TERMINAL_COORDINATE}`);
  }

  const edgesById = new Map();
  for (const edge of edges) {
    const id = edge?.id;
    if (typeof id !== 'string' || id === '') fail('every edge requires a string id');
    if (edgesById.has(id)) fail(`duplicate edge id ${id}`, { id });
    for (const endpoint of ['from', 'to']) {
      if (!nodesByCoordinate.has(edge[endpoint])) {
        fail(`edge ${id} ${endpoint} "${edge[endpoint]}" has no node`, { id });
      }
    }
    const accessibility = edge.accessibility ?? {};
    if (!accessibility.keyboard || !accessibility.reducedMotion) {
      fail(
        `edge ${id} must declare keyboard and reducedMotion equivalents; every nontrivial interaction needs a non-pointer equivalent`,
        { id }
      );
    }
    assertNoRanking(edge, `edge ${id}`);
    edgesById.set(id, Object.freeze({
      id,
      from: edge.from,
      to: edge.to,
      label: edge.label ?? null,
      conditions: Object.freeze({
        requiresVisited: Object.freeze([...(edge.conditions?.requiresVisited ?? [])]),
        forbidsVisited: Object.freeze([...(edge.conditions?.forbidsVisited ?? [])]),
        requiresActions: Object.freeze([...(edge.conditions?.requiresActions ?? [])]),
        minVisitCount: Object.freeze({ ...(edge.conditions?.minVisitCount ?? {}) }),
        requiresMotionMode: edge.conditions?.requiresMotionMode ?? null,
        serendipityGate: edge.conditions?.serendipityGate
          ? Object.freeze({ ...edge.conditions.serendipityGate })
          : null
      }),
      accessibility: Object.freeze({ ...accessibility })
    }));
  }

  return Object.freeze({
    id: document.id ?? 'UNNAMED_COORDINATE_GRAPH',
    authority: document.authority ?? 'UNDECLARED',
    nodes: nodesByCoordinate,
    edges: edgesById,
    edgesByOrigin: Object.freeze(
      [...nodesByCoordinate.keys()].reduce((accumulator, coordinate) => {
        accumulator[coordinate] = Object.freeze(
          [...edgesById.values()].filter((edge) => edge.from === coordinate)
        );
        return accumulator;
      }, {})
    )
  });
}

// ---------------------------------------------------------------------------
// Journey state
// ---------------------------------------------------------------------------

function cloneJourney(journey, overrides) {
  return Object.freeze({
    ...journey,
    ...overrides
  });
}

function nodeAt(journey, coordinate) {
  const node = journey.graph.nodes.get(coordinate);
  if (!node) fail(`no node for coordinate ${coordinate}`, { coordinate });
  return node;
}

function mutationFor(journey, coordinate, visit) {
  const basis = [
    journey.serendipitySeed,
    coordinate,
    String(visit),
    journey.letterTrace.join('')
  ].join('|');
  return Object.freeze({
    coordinate,
    visit,
    mutationId: `MUT-${coordinate}-${visit}-${hex(fnv1a(basis))}`,
    derivedFrom: 'SESSION_MEMORY'
  });
}

function enterCoordinate(journey, coordinate, eventType) {
  const node = nodeAt(journey, coordinate);
  const visit = (journey.visitCounts[coordinate] ?? 0) + 1;
  const mutations =
    visit > 1 && node.mutatesOnRevisit
      ? [...journey.mutations, mutationFor(journey, coordinate, visit)]
      : journey.mutations;

  const events = [
    ...journey.events,
    Object.freeze({
      index: journey.events.length,
      type: eventType,
      coordinate,
      visit,
      mutated: visit > 1 && node.mutatesOnRevisit
    })
  ];

  return cloneJourney(journey, {
    currentCoordinate: coordinate,
    letterTrace: Object.freeze([...journey.letterTrace, coordinate]),
    visitCounts: Object.freeze({ ...journey.visitCounts, [coordinate]: visit }),
    spectralTrace: node.spectral
      ? Object.freeze([...journey.spectralTrace, node.spectral])
      : journey.spectralTrace,
    sourceIdsOpened: Object.freeze([
      ...new Set([...journey.sourceIdsOpened, ...node.sourceIds])
    ]),
    mutations: Object.freeze(mutations),
    events: Object.freeze(events)
  });
}

/**
 * Begin a journey. Every canonical journey begins at A, and A performs the
 * initial memory write.
 */
export function createAlphabetJourney({
  graph,
  sessionId = 'KDX-SESSION',
  serendipitySeed = 'KDX-SEED',
  accessibility = { motion: 'FULL', sound: 'OFF' },
  consent = { explicit: false }
} = {}) {
  if (!graph || typeof graph !== 'object' || !(graph.nodes instanceof Map)) {
    fail('createAlphabetJourney requires a graph from loadCoordinateGraph');
  }
  if (!MOTION_MODES.includes(accessibility.motion)) {
    fail(`accessibility.motion must be one of ${MOTION_MODES.join(', ')}`, {
      motion: accessibility.motion
    });
  }
  assertNoRanking({ accessibility, consent }, 'journey options');

  const base = Object.freeze({
    version: 1,
    sessionId,
    graph,
    serendipitySeed,
    accessibility: Object.freeze({ ...accessibility }),
    consent: Object.freeze({ ...consent }),
    currentCoordinate: null,
    letterTrace: Object.freeze([]),
    visitCounts: Object.freeze({}),
    spectralTrace: Object.freeze([]),
    committedActions: Object.freeze([]),
    ignoredSignals: Object.freeze([]),
    relationsTraced: Object.freeze([]),
    sourceIdsOpened: Object.freeze([]),
    mutations: Object.freeze([]),
    delayedConsequences: Object.freeze([]),
    heart: Object.freeze({ inside: false, anchor: null, visits: Object.freeze([]) }),
    events: Object.freeze([]),
    converged: false
  });

  return enterCoordinate(base, ENTRY_COORDINATE, 'INITIAL_MEMORY_WRITE');
}

// ---------------------------------------------------------------------------
// State-dependent edge resolution
// ---------------------------------------------------------------------------

/**
 * The nine edge resolver inputs declared in `data/alphabet-topology.json`.
 * Exposed so a caller can inspect exactly what decided a route, which is the
 * difference between a traceable system and a hidden one.
 */
export function edgeResolverInputs(journey) {
  return Object.freeze({
    current_letter: journey.currentCoordinate,
    committed_actions: journey.committedActions.map((entry) => entry.actionId),
    visited_letters: [...new Set(journey.letterTrace)],
    visit_counts: { ...journey.visitCounts },
    traced_relations: [...journey.relationsTraced],
    ignored_signals: journey.ignoredSignals.map((entry) => entry.actionId),
    spectral_state: journey.spectralTrace[journey.spectralTrace.length - 1] ?? null,
    bounded_serendipity_seed: journey.serendipitySeed,
    accessibility_mode: journey.accessibility.motion
  });
}

function serendipityPasses(journey, edge) {
  const gate = edge.conditions.serendipityGate;
  if (!gate) return true;
  const modulo = Number(gate.modulo);
  if (!Number.isInteger(modulo) || modulo <= 0) {
    fail(`edge ${edge.id} has an invalid serendipityGate.modulo`, { id: edge.id });
  }
  const basis = [
    journey.serendipitySeed,
    edge.id,
    journey.currentCoordinate,
    String(journey.events.length)
  ].join('|');
  return fnv1a(basis) % modulo === Number(gate.remainder ?? 0);
}

function edgeUnsatisfiedReasons(journey, edge) {
  const visited = new Set(journey.letterTrace);
  const actions = new Set(journey.committedActions.map((entry) => entry.actionId));
  const reasons = [];

  for (const letter of edge.conditions.requiresVisited) {
    if (!visited.has(letter)) reasons.push(`requires visit to ${letter}`);
  }
  for (const letter of edge.conditions.forbidsVisited) {
    if (visited.has(letter)) reasons.push(`forbidden after visiting ${letter}`);
  }
  for (const actionId of edge.conditions.requiresActions) {
    if (!actions.has(actionId)) reasons.push(`requires committed action ${actionId}`);
  }
  for (const [letter, minimum] of Object.entries(edge.conditions.minVisitCount)) {
    if ((journey.visitCounts[letter] ?? 0) < Number(minimum)) {
      reasons.push(`requires ${letter} visited at least ${minimum} times`);
    }
  }
  if (
    edge.conditions.requiresMotionMode &&
    edge.conditions.requiresMotionMode !== journey.accessibility.motion
  ) {
    reasons.push(`requires motion mode ${edge.conditions.requiresMotionMode}`);
  }
  if (!serendipityPasses(journey, edge)) {
    reasons.push('bounded serendipity gate closed for this state');
  }

  return reasons;
}

/**
 * Edges currently traversable. Inside the Heart the route is suspended: the
 * only legal move is exitHeart, which restores the exact prior anchor.
 */
export function availableEdges(journey) {
  if (journey.heart.inside) return Object.freeze([]);
  const candidates = journey.graph.edgesByOrigin[journey.currentCoordinate] ?? [];
  return Object.freeze(
    candidates.filter((edge) => edgeUnsatisfiedReasons(journey, edge).length === 0)
  );
}

/** Why a given edge is unavailable. Nothing about routing is hidden. */
export function explainEdge(journey, edgeId) {
  const edge = journey.graph.edges.get(edgeId);
  if (!edge) fail(`unknown edge ${edgeId}`, { edgeId });
  const reasons = edgeUnsatisfiedReasons(journey, edge);
  return Object.freeze({
    edgeId,
    from: edge.from,
    to: edge.to,
    available: edge.from === journey.currentCoordinate && reasons.length === 0,
    atCurrentCoordinate: edge.from === journey.currentCoordinate,
    reasons: Object.freeze(reasons)
  });
}

// ---------------------------------------------------------------------------
// Actions, consequences and transitions
// ---------------------------------------------------------------------------

/**
 * Commit a meaningful action offered by the current coordinate. Only an
 * explicit commit may write consequence; dwell and proximity may not.
 */
export function commitAction(journey, actionId, metadata = {}) {
  assertNoRanking(metadata, `action ${actionId}`);
  const node = nodeAt(journey, journey.currentCoordinate);
  const offered = node.offersActions.find((action) => action.id === actionId);
  if (!offered) {
    fail(`coordinate ${journey.currentCoordinate} does not offer action ${actionId}`, {
      coordinate: journey.currentCoordinate,
      actionId
    });
  }

  const entry = Object.freeze({
    actionId,
    coordinate: journey.currentCoordinate,
    visit: journey.visitCounts[journey.currentCoordinate],
    eventIndex: journey.events.length
  });

  const delayed = offered.unlocksEdges.map((edgeId) =>
    Object.freeze({
      cause: actionId,
      causeCoordinate: journey.currentCoordinate,
      causeEventIndex: journey.events.length,
      unlocksEdge: edgeId,
      realizedAtEventIndex: null
    })
  );

  return cloneJourney(journey, {
    committedActions: Object.freeze([...journey.committedActions, entry]),
    relationsTraced: offered.relationId
      ? Object.freeze([...new Set([...journey.relationsTraced, offered.relationId])])
      : journey.relationsTraced,
    sourceIdsOpened: Object.freeze([
      ...new Set([...journey.sourceIdsOpened, ...offered.sourceIds])
    ]),
    delayedConsequences: Object.freeze([...journey.delayedConsequences, ...delayed]),
    events: Object.freeze([
      ...journey.events,
      Object.freeze({
        index: journey.events.length,
        type: 'COMMIT_ACTION',
        coordinate: journey.currentCoordinate,
        actionId
      })
    ])
  });
}

/**
 * Leave the current coordinate along an edge.
 *
 * Offered actions left uncommitted during this visit become ignored signals.
 * They are recorded, never scored, and may later explain a route that stayed
 * closed.
 */
export function commitTransition(journey, edgeId) {
  if (journey.converged) fail('journey already converged at Y', { edgeId });
  if (journey.heart.inside) {
    fail('inside the Heart the only legal move is exitHeart', { edgeId });
  }

  const edge = journey.graph.edges.get(edgeId);
  if (!edge) fail(`unknown edge ${edgeId}`, { edgeId });
  if (edge.from !== journey.currentCoordinate) {
    fail(`edge ${edgeId} does not start at ${journey.currentCoordinate}`, { edgeId });
  }
  if (edge.to === HEART_COORDINATE) {
    fail(
      `edge ${edgeId} approaches the Heart; entry to M must be voluntary through enterHeart`,
      { edgeId }
    );
  }
  const reasons = edgeUnsatisfiedReasons(journey, edge);
  if (reasons.length > 0) {
    fail(`edge ${edgeId} is not available: ${reasons.join('; ')}`, { edgeId, reasons });
  }

  const node = nodeAt(journey, journey.currentCoordinate);
  const visit = journey.visitCounts[journey.currentCoordinate];
  const committedHere = new Set(
    journey.committedActions
      .filter(
        (entry) => entry.coordinate === journey.currentCoordinate && entry.visit === visit
      )
      .map((entry) => entry.actionId)
  );
  const ignored = node.offersActions
    .filter((action) => !committedHere.has(action.id))
    .map((action) =>
      Object.freeze({
        actionId: action.id,
        coordinate: journey.currentCoordinate,
        visit,
        eventIndex: journey.events.length,
        wouldHaveUnlocked: Object.freeze([...action.unlocksEdges])
      })
    );

  const departed = cloneJourney(journey, {
    ignoredSignals: Object.freeze([...journey.ignoredSignals, ...ignored]),
    delayedConsequences: Object.freeze(
      journey.delayedConsequences.map((consequence) =>
        consequence.unlocksEdge === edgeId && consequence.realizedAtEventIndex === null
          ? Object.freeze({ ...consequence, realizedAtEventIndex: journey.events.length })
          : consequence
      )
    ),
    events: Object.freeze([
      ...journey.events,
      Object.freeze({
        index: journey.events.length,
        type: 'TRANSITION',
        edgeId,
        from: edge.from,
        to: edge.to,
        ignoredSignals: Object.freeze(ignored.map((entry) => entry.actionId))
      })
    ])
  });

  const arrived = enterCoordinate(departed, edge.to, 'ENTER');
  if (edge.to !== TERMINAL_COORDINATE) return arrived;
  return cloneJourney(arrived, { converged: true });
}

// ---------------------------------------------------------------------------
// The optional distributed Heart
// ---------------------------------------------------------------------------

/**
 * Portal state at the current coordinate.
 *
 *   LATENT    - no Heart approach exists here;
 *   RESONANT  - an approach exists but its conditions are unmet;
 *   AVAILABLE - the Heart may be entered voluntarily.
 *
 * The Heart is never mandatory and entering it is never ranked.
 */
export function heartPortalState(journey) {
  if (journey.heart.inside) return 'AVAILABLE';
  const approaches = (journey.graph.edgesByOrigin[journey.currentCoordinate] ?? []).filter(
    (edge) => edge.to === HEART_COORDINATE
  );
  if (approaches.length === 0) return 'LATENT';
  const open = approaches.some(
    (edge) => edgeUnsatisfiedReasons(journey, edge).length === 0
  );
  return open ? 'AVAILABLE' : 'RESONANT';
}

/** Voluntary entry into M. Never triggered by navigation, dwell or proximity. */
export function enterHeart(journey) {
  if (journey.heart.inside) fail('already inside the Heart');
  if (heartPortalState(journey) !== 'AVAILABLE') {
    fail(`the Heart is not available at ${journey.currentCoordinate}`, {
      coordinate: journey.currentCoordinate,
      portalState: heartPortalState(journey)
    });
  }

  const anchor = journey.currentCoordinate;
  const entered = enterCoordinate(journey, HEART_COORDINATE, 'HEART_ENTER');
  return cloneJourney(entered, {
    heart: Object.freeze({
      inside: true,
      anchor,
      visits: Object.freeze([
        ...journey.heart.visits,
        Object.freeze({ anchor, eventIndex: journey.events.length })
      ])
    })
  });
}

/**
 * Exit restores the exact prior route anchor.
 *
 * "Exact" is enforced literally: the anchor is re-entered as a route position
 * and appended to the trace, but its visit count is not incremented and no
 * revisit mutation fires. Returning from depth must not silently rewrite the
 * coordinate the visitor left.
 */
export function exitHeart(journey) {
  if (!journey.heart.inside) fail('not inside the Heart');
  const anchor = journey.heart.anchor;

  return cloneJourney(journey, {
    currentCoordinate: anchor,
    letterTrace: Object.freeze([...journey.letterTrace, anchor]),
    heart: Object.freeze({ ...journey.heart, inside: false }),
    events: Object.freeze([
      ...journey.events,
      Object.freeze({
        index: journey.events.length,
        type: 'HEART_EXIT',
        coordinate: anchor,
        reanchored: true,
        mutated: false
      })
    ])
  });
}

// ---------------------------------------------------------------------------
// Convergence at Y
// ---------------------------------------------------------------------------

export function canConvergeToY(journey) {
  const reasons = [];
  if (journey.heart.inside) reasons.push('inside the Heart; exit restores the route first');
  if (journey.converged) reasons.push('journey already converged');

  const terminalEdges = availableEdges(journey).filter(
    (edge) => edge.to === TERMINAL_COORDINATE
  );
  if (!journey.converged && terminalEdges.length === 0) {
    reasons.push(`no available edge from ${journey.currentCoordinate} to ${TERMINAL_COORDINATE}`);
  }

  const provenanceAvailable = [...new Set(journey.letterTrace)].every((coordinate) =>
    EPISTEMIC_STATUSES.has(nodeAt(journey, coordinate).epistemicStatus)
  );
  if (!provenanceAvailable) {
    reasons.push('a visited coordinate exposes no epistemic status');
  }

  return Object.freeze({
    ok: reasons.length === 0,
    edges: Object.freeze(terminalEdges.map((edge) => edge.id)),
    reasons: Object.freeze(reasons)
  });
}

/** Deterministic, path-dependent signature of the complete event trace. */
export function trajectorySignature(journey) {
  const canonical = journey.events
    .map((event) =>
      [
        event.index,
        event.type,
        event.coordinate ?? '',
        event.edgeId ?? '',
        event.actionId ?? '',
        event.mutated ? 'MUT' : '',
        event.reanchored ? 'ANCHOR' : ''
      ].join(':')
    )
    .join('|');
  const basis = [journey.serendipitySeed, journey.accessibility.motion, canonical].join('#');
  return `KDX-Y-${hex(fnv1a(basis))}${hex(fnv1a(`${canonical}#${basis.length}`))}`;
}

/**
 * Derive RETURN / +infinity from the complete event trace.
 *
 * Every output name is the one declared in
 * `experiences/vertical-slice-v0/spec.yaml` coordinate_contracts.Y.
 */
export function deriveReturn(journey) {
  const gate = canConvergeToY(journey);
  if (!journey.converged && !gate.ok) {
    fail(`cannot derive RETURN: ${gate.reasons.join('; ')}`, { reasons: gate.reasons });
  }

  const visited = [...new Set(journey.letterTrace)];
  const ignoredWithEffect = journey.ignoredSignals
    .filter((entry) => entry.wouldHaveUnlocked.length > 0)
    .map((entry) =>
      Object.freeze({
        actionId: entry.actionId,
        coordinate: entry.coordinate,
        routesLeftClosed: entry.wouldHaveUnlocked,
        effect: 'ROUTE_REMAINED_CLOSED',
        ranked: false
      })
    );

  return Object.freeze({
    visited_letters: Object.freeze(visited),
    visit_counts: Object.freeze({ ...journey.visitCounts }),
    revisit_mutations: Object.freeze([...journey.mutations]),
    committed_actions: Object.freeze([...journey.committedActions]),
    delayed_consequences: Object.freeze([...journey.delayedConsequences]),
    ignored_signals_with_later_effect: Object.freeze(ignoredWithEffect),
    traced_relations: Object.freeze([...journey.relationsTraced]),
    spectral_trace: Object.freeze([...journey.spectralTrace]),
    m_visit_status_without_ranking: Object.freeze({
      visited: journey.heart.visits.length > 0,
      visits: journey.heart.visits.length,
      anchors: Object.freeze(journey.heart.visits.map((visit) => visit.anchor)),
      ranked: false,
      note: 'M is optional; visiting or skipping it carries no standing'
    }),
    source_access: Object.freeze([...journey.sourceIdsOpened]),
    epistemic_status_and_uncertainty: Object.freeze(
      visited.map((coordinate) => {
        const node = nodeAt(journey, coordinate);
        return Object.freeze({
          coordinate,
          epistemicStatus: node.epistemicStatus,
          rightsStatus: node.rightsStatus,
          culturalStatus: node.culturalStatus
        });
      })
    ),
    unresolved_questions: Object.freeze([
      ...new Set(
        visited.flatMap((coordinate) => [...nodeAt(journey, coordinate).unresolvedQuestions])
      )
    ]),
    route_specific_artifact: Object.freeze({
      signature: trajectorySignature(journey),
      seed: journey.serendipitySeed,
      letterTrace: Object.freeze([...journey.letterTrace]),
      eventCount: journey.events.length
    }),
    reentry_possibilities: Object.freeze(
      [...journey.graph.nodes.keys()]
        .filter(
          (coordinate) =>
            !visited.includes(coordinate) && coordinate !== TERMINAL_COORDINATE
        )
        .map((coordinate) => Object.freeze({ coordinate, seenThisJourney: false }))
    )
  });
}

// ---------------------------------------------------------------------------
// Replay
// ---------------------------------------------------------------------------

/**
 * Replay a declared step list. QA trajectories are fixtures, not architecture:
 * replay exists so a route can be reproduced exactly, not so routes can be
 * generated for the visitor.
 */
export function replayTrajectory(graph, steps = [], options = {}) {
  let journey = createAlphabetJourney({ graph, ...options });
  for (const [index, step] of steps.entries()) {
    switch (step?.type) {
      case 'ACTION':
        journey = commitAction(journey, step.actionId);
        break;
      case 'TRANSITION':
        journey = commitTransition(journey, step.edgeId);
        break;
      case 'HEART_ENTER':
        journey = enterHeart(journey);
        break;
      case 'HEART_EXIT':
        journey = exitHeart(journey);
        break;
      default:
        fail(`step ${index} has an unknown type "${step?.type}"`, { index });
    }
  }
  return journey;
}

export const alphabetConstants = Object.freeze({
  ENTRY_COORDINATE,
  HEART_COORDINATE,
  TERMINAL_COORDINATE,
  HEART_PORTAL_STATES,
  MOTION_MODES,
  FORBIDDEN_FIELD_TOKENS: Object.freeze([...FORBIDDEN_FIELD_TOKENS])
});
