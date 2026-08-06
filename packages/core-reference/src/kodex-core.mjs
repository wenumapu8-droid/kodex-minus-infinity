const CLAIM_CLASSES = new Set([
  'OBSERVED',
  'DERIVED',
  'ESTIMATED',
  'PROXY',
  'INTERPRETATION',
  'TESTIMONY',
  'SPECULATION',
  'MYTHOPOETIC',
  'SYNTHETIC',
  'UNKNOWN'
]);

const RELATION_CERTAINTIES = new Set([
  'CONFIRMED',
  'INFERRED',
  'SUGGESTED',
  'UNRESOLVED'
]);

const INTERACTION_ROLES = new Set([
  'REVEAL',
  'COMPARE',
  'FILTER',
  'TRACE',
  'NAVIGATE',
  'SIMULATE',
  'ANNOTATE',
  'CONTRIBUTE',
  'ORIENT',
  'NONE'
]);

const PASSPORT_STATUSES = new Set(['ADMITTED', 'ATMOSPHERE', 'BLOCKED']);

export const KODEX_PATHS = Object.freeze({
  OBSERVE: Object.freeze({
    priorities: Object.freeze([
      'current_evidence',
      'comparison',
      'source_inspection',
      'current_relations',
      'uncertainty'
    ]),
    artifactGrammar: 'relation_constellation'
  }),
  REMEMBER: Object.freeze({
    priorities: Object.freeze([
      'sequence',
      'versions',
      'testimony',
      'temporal_trace',
      'carried_memory'
    ]),
    artifactGrammar: 'memory_topography'
  }),
  CONNECT: Object.freeze({
    priorities: Object.freeze([
      'network',
      'dependency',
      'territory',
      'shared_attributes'
    ]),
    artifactGrammar: 'relation_field'
  }),
  TRANSFORM: Object.freeze({
    priorities: Object.freeze([
      'simulation',
      'parameter_change',
      'before_after',
      'declared_scenario'
    ]),
    artifactGrammar: 'transformation_instrument'
  }),
  CONTRIBUTE: Object.freeze({
    priorities: Object.freeze([
      'annotation',
      'correction',
      'source_suggestion',
      'code_or_translation'
    ]),
    artifactGrammar: 'contribution_trace'
  })
});

export class KodexValidationError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'KodexValidationError';
    this.details = details;
  }
}

function requireString(value, field) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new KodexValidationError(`${field} must be a non-empty string`, {
      field,
      value
    });
  }
  return value.trim();
}

function uniqueStrings(values = []) {
  if (!Array.isArray(values)) {
    throw new KodexValidationError('Expected an array of strings', { values });
  }

  const normalized = values.map((value) => requireString(value, 'array item'));
  return [...new Set(normalized)];
}

function hasQuantitativeValue(claim) {
  if (claim.quantitative === true) return true;
  if (typeof claim.value === 'number' && Number.isFinite(claim.value)) return true;
  if (Array.isArray(claim.values) && claim.values.some(Number.isFinite)) return true;
  return false;
}

export function validateSource(source) {
  const normalized = {
    ...source,
    id: requireString(source?.id, 'source.id'),
    title: requireString(source?.title, 'source.title'),
    sourceClass: requireString(source?.sourceClass, 'source.sourceClass'),
    location: requireString(source?.location, 'source.location'),
    rightsStatus: requireString(source?.rightsStatus, 'source.rightsStatus'),
    privacyStatus: requireString(source?.privacyStatus, 'source.privacyStatus'),
    culturalStatus: requireString(source?.culturalStatus, 'source.culturalStatus'),
    limitations: uniqueStrings(source?.limitations ?? []),
    notes: uniqueStrings(source?.notes ?? [])
  };

  if (normalized.privacyStatus !== 'PUBLIC') {
    normalized.publicationStatus = 'BLOCKED';
    normalized.blockReason = 'NON_PUBLIC_SOURCE';
  }

  if (normalized.rightsStatus === 'BLOCKED' || normalized.rightsStatus === 'UNKNOWN') {
    normalized.publicationStatus = 'BLOCKED';
    normalized.blockReason = 'RIGHTS_NOT_CLEARED';
  }

  if (normalized.culturalStatus === 'AUTHORIZATION_REQUIRED') {
    normalized.publicationStatus = 'BLOCKED';
    normalized.blockReason = 'CULTURAL_AUTHORIZATION_REQUIRED';
  }

  return normalized;
}

export function validateClaim(claim, sourceIndex = new Map()) {
  const claimClass = requireString(claim?.class, 'claim.class');
  if (!CLAIM_CLASSES.has(claimClass)) {
    throw new KodexValidationError(`Unsupported claim class: ${claimClass}`, {
      supported: [...CLAIM_CLASSES]
    });
  }

  const normalized = {
    ...claim,
    id: requireString(claim?.id, 'claim.id'),
    class: claimClass,
    statement: requireString(claim?.statement, 'claim.statement'),
    sourceIds: uniqueStrings(claim?.sourceIds ?? []),
    variables: uniqueStrings(claim?.variables ?? []),
    contradictions: uniqueStrings(claim?.contradictions ?? []),
    limitations: uniqueStrings(claim?.limitations ?? []),
    publicationStatus: claim?.publicationStatus ?? 'REVIEW'
  };

  const sourceRequired = !['SYNTHETIC', 'UNKNOWN'].includes(claimClass);
  if (sourceRequired && normalized.sourceIds.length === 0) {
    throw new KodexValidationError(
      `${claimClass} claims require at least one source`,
      { claimId: normalized.id }
    );
  }

  const missingSourceIds = normalized.sourceIds.filter(
    (sourceId) => sourceIndex.size > 0 && !sourceIndex.has(sourceId)
  );
  if (missingSourceIds.length > 0) {
    normalized.publicationStatus = 'BLOCKED';
    normalized.blockReason = 'MISSING_SOURCE_RECORD';
    normalized.missingSourceIds = missingSourceIds;
  }

  if (hasQuantitativeValue(normalized)) {
    requireString(normalized.definition, 'claim.definition');
    requireString(normalized.timeScope, 'claim.timeScope');

    if (normalized.percentage === true && !normalized.denominator) {
      throw new KodexValidationError('Percentage claims require a denominator', {
        claimId: normalized.id
      });
    }

    if (normalized.class === 'DERIVED' && !normalized.formula) {
      throw new KodexValidationError('Derived quantitative claims require a formula', {
        claimId: normalized.id
      });
    }

    if (normalized.class === 'ESTIMATED' && !normalized.method) {
      throw new KodexValidationError('Estimated claims require a method', {
        claimId: normalized.id
      });
    }
  }

  if (normalized.class === 'PROXY' && normalized.limitations.length === 0) {
    throw new KodexValidationError('Proxy claims require explicit limitations', {
      claimId: normalized.id
    });
  }

  const blockedSources = normalized.sourceIds
    .map((sourceId) => sourceIndex.get(sourceId))
    .filter(Boolean)
    .filter((source) => source.publicationStatus === 'BLOCKED');

  if (blockedSources.length > 0) {
    normalized.publicationStatus = 'BLOCKED';
    normalized.blockReason = 'SOURCE_PUBLICATION_BLOCKED';
    normalized.blockedSourceIds = blockedSources.map((source) => source.id);
  }

  if (normalized.contradictions.length > 0 && normalized.publicationStatus === 'ADMITTED') {
    normalized.publicationStatus = 'REVIEW';
  }

  return normalized;
}

export function validateRelation(relation, entityIds = new Set(), claimIds = new Set()) {
  const certainty = requireString(relation?.certainty, 'relation.certainty');
  if (!RELATION_CERTAINTIES.has(certainty)) {
    throw new KodexValidationError(`Unsupported relation certainty: ${certainty}`);
  }

  const normalized = {
    ...relation,
    id: requireString(relation?.id, 'relation.id'),
    from: requireString(relation?.from, 'relation.from'),
    to: requireString(relation?.to, 'relation.to'),
    type: requireString(relation?.type, 'relation.type'),
    certainty,
    claimIds: uniqueStrings(relation?.claimIds ?? [])
  };

  if (entityIds.size > 0) {
    if (!entityIds.has(normalized.from) || !entityIds.has(normalized.to)) {
      throw new KodexValidationError('Relation references an unknown entity', {
        relationId: normalized.id,
        from: normalized.from,
        to: normalized.to
      });
    }
  }

  if (claimIds.size > 0) {
    const unknownClaims = normalized.claimIds.filter((id) => !claimIds.has(id));
    if (unknownClaims.length > 0) {
      throw new KodexValidationError('Relation references unknown claims', {
        relationId: normalized.id,
        unknownClaims
      });
    }
  }

  if (relation.weight !== undefined && !relation.weightBasis) {
    throw new KodexValidationError('Weighted relations require weightBasis', {
      relationId: normalized.id
    });
  }

  return normalized;
}

export function buildKnowledgeGraph({ sources = [], claims = [], entities = [], relations = [] }) {
  const sourceIndex = new Map();
  for (const source of sources) {
    const validSource = validateSource(source);
    if (sourceIndex.has(validSource.id)) {
      throw new KodexValidationError(`Duplicate source ID: ${validSource.id}`);
    }
    sourceIndex.set(validSource.id, validSource);
  }

  const claimIndex = new Map();
  for (const claim of claims) {
    const validClaim = validateClaim(claim, sourceIndex);
    if (claimIndex.has(validClaim.id)) {
      throw new KodexValidationError(`Duplicate claim ID: ${validClaim.id}`);
    }
    claimIndex.set(validClaim.id, validClaim);
  }

  const entityIndex = new Map();
  for (const entity of entities) {
    const validEntity = {
      ...entity,
      id: requireString(entity?.id, 'entity.id'),
      type: requireString(entity?.type, 'entity.type'),
      names: uniqueStrings(entity?.names ?? []),
      sourceIds: uniqueStrings(entity?.sourceIds ?? [])
    };

    if (entityIndex.has(validEntity.id)) {
      throw new KodexValidationError(`Duplicate entity ID: ${validEntity.id}`);
    }
    entityIndex.set(validEntity.id, validEntity);
  }

  const relationIndex = new Map();
  const entityIds = new Set(entityIndex.keys());
  const claimIds = new Set(claimIndex.keys());
  for (const relation of relations) {
    const validRelation = validateRelation(relation, entityIds, claimIds);
    if (relationIndex.has(validRelation.id)) {
      throw new KodexValidationError(`Duplicate relation ID: ${validRelation.id}`);
    }
    relationIndex.set(validRelation.id, validRelation);
  }

  const adjacency = new Map([...entityIds].map((id) => [id, new Set()]));
  for (const relation of relationIndex.values()) {
    adjacency.get(relation.from)?.add(relation.id);
    adjacency.get(relation.to)?.add(relation.id);
  }

  return Object.freeze({
    sources: sourceIndex,
    claims: claimIndex,
    entities: entityIndex,
    relations: relationIndex,
    adjacency
  });
}

export function deriveQuestions(graph, { selectedEntityIds = [], memory = createSessionMemory() } = {}) {
  const questions = [];

  for (const claim of graph.claims.values()) {
    if (claim.contradictions?.length > 0) {
      questions.push({
        id: `question:contradiction:${claim.id}`,
        type: 'WHERE_DO_SOURCES_DISAGREE',
        claimIds: [claim.id],
        relevanceReason: 'unresolved_contradiction'
      });
    }

    if (claim.class === 'UNKNOWN') {
      questions.push({
        id: `question:missing:${claim.id}`,
        type: 'WHAT_IS_MISSING',
        claimIds: [claim.id],
        relevanceReason: 'explicit_unknown'
      });
    }
  }

  for (const entityId of selectedEntityIds) {
    if (!graph.entities.has(entityId)) continue;
    questions.push({
      id: `question:relation:${entityId}`,
      type: 'HOW_ARE_THINGS_CONNECTED',
      entityIds: [entityId],
      relevanceReason: 'user_selected_entity'
    });
  }

  const unseenRelations = [...graph.relations.values()].filter(
    (relation) => !memory.relationsTraced.includes(relation.id)
  );
  if (unseenRelations.length > 0) {
    questions.push({
      id: 'question:unseen-relations',
      type: 'HOW_ARE_THINGS_CONNECTED',
      relationIds: unseenRelations.map((relation) => relation.id),
      relevanceReason: 'high_evidence_unseen_relation'
    });
  }

  return questions;
}

export function startPath(choice) {
  const normalized = requireString(choice, 'choice').toUpperCase();
  const path = KODEX_PATHS[normalized];
  if (!path) {
    throw new KodexValidationError(`Unsupported KODEX path: ${choice}`, {
      supported: Object.keys(KODEX_PATHS)
    });
  }

  return {
    choice: normalized,
    priorities: [...path.priorities],
    artifactGrammar: path.artifactGrammar
  };
}

export function createSemanticPassport(input) {
  const status = requireString(input?.status, 'passport.status');
  if (!PASSPORT_STATUSES.has(status)) {
    throw new KodexValidationError(`Unsupported passport status: ${status}`);
  }

  const interactionRole = requireString(
    input?.interactionRole ?? 'NONE',
    'passport.interactionRole'
  );
  if (!INTERACTION_ROLES.has(interactionRole)) {
    throw new KodexValidationError(`Unsupported interaction role: ${interactionRole}`);
  }

  const passport = {
    ...input,
    elementId: requireString(input?.elementId, 'passport.elementId'),
    sceneId: requireString(input?.sceneId, 'passport.sceneId'),
    questionSupported: requireString(
      input?.questionSupported,
      'passport.questionSupported'
    ),
    meaning: requireString(input?.meaning, 'passport.meaning'),
    channel: requireString(input?.channel, 'passport.channel'),
    uncertaintyBehavior: requireString(
      input?.uncertaintyBehavior,
      'passport.uncertaintyBehavior'
    ),
    missingValueBehavior: requireString(
      input?.missingValueBehavior,
      'passport.missingValueBehavior'
    ),
    interactionRole,
    status,
    sourceFields: uniqueStrings(input?.sourceFields ?? []),
    claimIds: uniqueStrings(input?.claimIds ?? []),
    transformationIds: uniqueStrings(input?.transformationIds ?? []),
    notes: uniqueStrings(input?.notes ?? [])
  };

  if (status === 'ADMITTED') {
    const hasGrounding =
      passport.sourceFields.length > 0 ||
      passport.claimIds.length > 0 ||
      passport.transformationIds.length > 0 ||
      input.stateDerived === true;

    if (!hasGrounding) {
      throw new KodexValidationError(
        'Admitted visual elements require source, claim, transformation or state grounding',
        { elementId: passport.elementId }
      );
    }
  }

  if (status === 'ATMOSPHERE' && input.impliesMeasurement === true) {
    throw new KodexValidationError(
      'Atmospheric elements cannot imply an unmeasured signal',
      { elementId: passport.elementId }
    );
  }

  return passport;
}

export function composeScene({ question, moduleId, passports = [], motion = [] }) {
  requireString(question?.id, 'question.id');
  requireString(moduleId, 'moduleId');

  const validatedPassports = passports.map(createSemanticPassport);
  const admitted = validatedPassports.filter((p) => p.status === 'ADMITTED');
  const atmosphere = validatedPassports.filter((p) => p.status === 'ATMOSPHERE');
  const blocked = validatedPassports.filter((p) => p.status === 'BLOCKED');

  const primary = admitted.filter((p) => p.priority === 'PRIMARY');
  const secondary = admitted.filter((p) => p.priority === 'SECONDARY');
  const highPriorityMotion = motion.filter((item) => item.priority === 'HIGH');

  if (primary.length > 3) {
    throw new KodexValidationError('A scene may not exceed three primary variables', {
      count: primary.length
    });
  }

  if (secondary.length > 5) {
    throw new KodexValidationError('A scene may not exceed five secondary variables', {
      count: secondary.length
    });
  }

  if (highPriorityMotion.length > 2) {
    throw new KodexValidationError('A scene may not exceed two high-priority motions', {
      count: highPriorityMotion.length
    });
  }

  return {
    questionId: question.id,
    moduleId,
    admitted,
    atmosphere,
    blocked,
    renderable: [...admitted, ...atmosphere],
    motion
  };
}

export function createSessionMemory(overrides = {}) {
  return {
    version: 1,
    sessionId: overrides.sessionId ?? 'session:unassigned',
    startedAt: overrides.startedAt ?? null,
    path: [...(overrides.path ?? [])],
    decisions: [...(overrides.decisions ?? [])],
    sourcesOpened: uniqueStrings(overrides.sourcesOpened ?? []),
    claimsSeen: uniqueStrings(overrides.claimsSeen ?? []),
    entitiesTraced: uniqueStrings(overrides.entitiesTraced ?? []),
    relationsTraced: uniqueStrings(overrides.relationsTraced ?? []),
    contradictionsSeen: uniqueStrings(overrides.contradictionsSeen ?? []),
    userAnnotations: [...(overrides.userAnnotations ?? [])],
    systemObservations: [...(overrides.systemObservations ?? [])],
    selectedFunctionalState: overrides.selectedFunctionalState ?? null,
    contemplativePreferences: { ...(overrides.contemplativePreferences ?? {}) },
    accessibility: {
      motion: overrides.accessibility?.motion ?? 'FULL',
      sound: overrides.accessibility?.sound ?? 'OFF',
      ...(overrides.accessibility ?? {})
    },
    artifactSeed: overrides.artifactSeed ?? null,
    generatedArtifacts: uniqueStrings(overrides.generatedArtifacts ?? []),
    unresolved: uniqueStrings(overrides.unresolved ?? []),
    consent: { ...(overrides.consent ?? {}) }
  };
}

function appendUnique(target, values = []) {
  for (const value of values) {
    const normalized = requireString(value, 'memory value');
    if (!target.includes(normalized)) target.push(normalized);
  }
}

export function shouldWriteEvent(event) {
  if (!event || typeof event !== 'object') return false;
  if (event.writesToMemory === false) return false;
  if (['POINTER_MOVE', 'ANIMATION_FRAME', 'PASSIVE_HOVER'].includes(event.type)) {
    return false;
  }

  return Boolean(
    event.decision ||
      event.nodeId ||
      event.sourceIds?.length ||
      event.claimIds?.length ||
      event.entityIds?.length ||
      event.relationIds?.length ||
      event.contradictionIds?.length ||
      event.unresolvedIds?.length ||
      event.artifactId
  );
}

export function writeSessionMemory(memory, event) {
  const next = createSessionMemory(memory);
  if (!shouldWriteEvent(event)) return next;

  if (event.nodeId && next.path.at(-1) !== event.nodeId) {
    next.path.push(requireString(event.nodeId, 'event.nodeId'));
  }

  if (event.decision) {
    const decision = requireString(event.decision, 'event.decision');
    if (!next.decisions.includes(decision)) next.decisions.push(decision);
  }

  appendUnique(next.sourcesOpened, event.sourceIds ?? []);
  appendUnique(next.claimsSeen, event.claimIds ?? []);
  appendUnique(next.entitiesTraced, event.entityIds ?? []);
  appendUnique(next.relationsTraced, event.relationIds ?? []);
  appendUnique(next.contradictionsSeen, event.contradictionIds ?? []);
  appendUnique(next.unresolved, event.unresolvedIds ?? []);

  if (event.artifactId) appendUnique(next.generatedArtifacts, [event.artifactId]);
  if (event.functionalState) next.selectedFunctionalState = event.functionalState;
  if (event.heartMode) next.contemplativePreferences.heartMode = event.heartMode;

  return next;
}

function fnv1a(text) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function createArtifactSeed(memory, softwareVersion = '0.1.0') {
  const stableInput = JSON.stringify({
    softwareVersion,
    sessionId: memory.sessionId,
    decisions: memory.decisions,
    relations: memory.relationsTraced,
    sources: memory.sourcesOpened,
    artifacts: memory.generatedArtifacts
  });

  return `kdx-${fnv1a(stableInput)}`;
}

export function generatePathArtifactManifest(memory, { softwareVersion = '0.1.0' } = {}) {
  const pathChoice = memory.decisions.find((decision) => KODEX_PATHS[decision]);
  const grammar = pathChoice
    ? KODEX_PATHS[pathChoice].artifactGrammar
    : 'path_manifest';
  const seed = createArtifactSeed(memory, softwareVersion);

  return {
    id: `artifact:${seed}`,
    generatedAt: new Date().toISOString(),
    softwareVersion,
    grammar,
    seed,
    seedLabel: 'GENERATIVE SEED / TECHNICAL REPRODUCTION VALUE',
    path: [...memory.path],
    decisions: [...memory.decisions],
    sourceIds: [...memory.sourcesOpened],
    claimIds: [...memory.claimsSeen],
    relationIds: [...memory.relationsTraced],
    unresolvedIds: [...memory.unresolved],
    limitations: [
      'The artifact represents this software session and is not a biometric, diagnostic or spiritual measurement.'
    ]
  };
}

export function canConverge(memory, { provenanceAvailable = false, controlsAvailable = false } = {}) {
  return Boolean(
    memory.path.length > 0 &&
      memory.decisions.length > 0 &&
      provenanceAvailable &&
      controlsAvailable
  );
}

export function createReturnOutput(memory, graph, options = {}) {
  if (!canConverge(memory, options)) {
    throw new KodexValidationError('Session cannot complete semantic convergence', {
      pathLength: memory.path.length,
      decisionCount: memory.decisions.length,
      provenanceAvailable: options.provenanceAvailable,
      controlsAvailable: options.controlsAvailable
    });
  }

  const sourceManifest = memory.sourcesOpened
    .map((sourceId) => graph.sources.get(sourceId))
    .filter(Boolean)
    .map((source) => ({
      id: source.id,
      title: source.title,
      creator: source.creator ?? null,
      location: source.location,
      rightsStatus: source.rightsStatus
    }));

  return {
    pathSummary: {
      route: [...memory.path],
      choices: [...memory.decisions],
      sourcesOpened: memory.sourcesOpened.length,
      relationsTraced: memory.relationsTraced.length,
      contradictionsSeen: memory.contradictionsSeen.length,
      unresolvedQuestions: memory.unresolved.length
    },
    sourceManifest,
    artifact: generatePathArtifactManifest(memory, options),
    unresolved: [...memory.unresolved],
    contributionOptions: ['SOURCE_SUGGESTION', 'CORRECTION', 'CODE'],
    repositoryOptions: ['VIEW_METHOD', 'VIEW_MODULE', 'OPEN_ISSUE'],
    reEntryOptions: selectReEntry(memory, graph)
  };
}

export function selectReEntry(memory, graph, limit = 3) {
  const seenRelationIds = new Set(memory.relationsTraced);
  const seenEntityIds = new Set(memory.entitiesTraced);
  const candidates = [];

  for (const entityId of seenEntityIds) {
    const adjacentRelationIds = graph.adjacency.get(entityId) ?? new Set();
    for (const relationId of adjacentRelationIds) {
      if (seenRelationIds.has(relationId)) continue;
      const relation = graph.relations.get(relationId);
      if (!relation) continue;

      const connectedEntityId = relation.from === entityId ? relation.to : relation.from;
      candidates.push({
        relationId,
        connectedEntityId,
        certainty: relation.certainty,
        reason: `Connected to ${entityId} through ${relation.type}`
      });
    }
  }

  const certaintyOrder = {
    CONFIRMED: 0,
    INFERRED: 1,
    SUGGESTED: 2,
    UNRESOLVED: 3
  };

  return candidates
    .sort((a, b) => certaintyOrder[a.certainty] - certaintyOrder[b.certainty])
    .filter(
      (candidate, index, all) =>
        all.findIndex((other) => other.relationId === candidate.relationId) === index
    )
    .slice(0, limit);
}

export function heartMode(choice, { sensorAvailable = false } = {}) {
  const mode = requireString(choice, 'heart mode').toUpperCase();

  if (mode === 'NATURAL_BREATH') {
    return {
      mode,
      source: 'USER_CHOICE',
      label: 'NATURAL BREATH',
      measured: false
    };
  }

  if (mode === 'GUIDED_PULSE') {
    return {
      mode,
      source: 'SYNTHETIC',
      label: 'GUIDED / NOT MEASURED',
      measured: false
    };
  }

  if (mode === 'TAP_PULSE') {
    return {
      mode,
      source: 'USER_INPUT_DERIVED',
      label: 'USER INPUT / NOT MEDICAL',
      measured: false
    };
  }

  if (mode === 'SENSOR_PULSE') {
    if (!sensorAvailable) {
      throw new KodexValidationError('Sensor pulse is unavailable without a verified sensor');
    }
    return {
      mode,
      source: 'VERIFIED_SENSOR',
      label: 'SENSOR INPUT / NOT MEDICAL',
      measured: true
    };
  }

  throw new KodexValidationError(`Unsupported Heart mode: ${choice}`);
}

export const constants = Object.freeze({
  claimClasses: Object.freeze([...CLAIM_CLASSES]),
  relationCertainties: Object.freeze([...RELATION_CERTAINTIES]),
  interactionRoles: Object.freeze([...INTERACTION_ROLES]),
  passportStatuses: Object.freeze([...PASSPORT_STATUSES])
});
