# KODEX−∞ CORE ALGORITHM

Status: `CANONICAL ALGORITHM SPECIFICATION / V0.1`

## 1. Purpose

The KODEX algorithm converts heterogeneous knowledge and user decisions into a coherent, evidence-aware, path-dependent visual experience.

It must answer five questions:

1. What is known, interpreted, imagined or unresolved?
2. What relation is most meaningful to reveal now?
3. Which visual and interactive form communicates that relation honestly?
4. How does the user's decision change what happens later?
5. How does every route converge without becoming identical?

## 2. System equation

```text
KODEX_SESSION =
  CANON
+ SOURCE_GRAPH
+ CLAIM_LEDGER
+ USER_CONTEXT
+ USER_DECISIONS
+ SESSION_MEMORY
+ EXPERIENCE_GRAPH
+ MODULE_REGISTRY
+ ACCESSIBILITY_PROFILE
+ RIGHTS_AND_CULTURAL_RULES
```

Output:

```text
PATH
+ SCENE_STATE
+ VISUAL_ENCODING
+ INTERACTION_OPTIONS
+ PROVENANCE_VIEW
+ PATH_ARTIFACT
+ RETURN_STATE
+ RE_ENTRY_OPTIONS
```

## 3. Core data objects

### Source

```yaml
source:
  id: SRC-0001
  title: ""
  creator: ""
  source_class: PRIMARY_DATASET | DOCUMENT | TESTIMONY | CULTURAL_WORK | CODE | IMAGE | OTHER
  location: ""
  published_at: ""
  accessed_at: ""
  rights_status: CLEAR | REFERENCE_ONLY | UNKNOWN | BLOCKED
  privacy_status: PUBLIC | PRIVATE | RESTRICTED
  cultural_status: STANDARD | REVIEW_REQUIRED | AUTHORIZATION_REQUIRED
```

### Claim

```yaml
claim:
  id: CLM-0001
  source_ids: []
  class: OBSERVED | DERIVED | ESTIMATED | PROXY | INTERPRETATION | TESTIMONY | SPECULATION | MYTHOPOETIC | SYNTHETIC | UNKNOWN
  statement: ""
  variables: []
  unit: ""
  denominator: ""
  time_scope: ""
  geography_scope: ""
  method: ""
  uncertainty: ""
  contradictions: []
  limitations: []
  publication_status: ADMITTED | REVIEW | BLOCKED
```

### Entity

```yaml
entity:
  id: ENT-0001
  type: PERSON | PLACE | EVENT | CONCEPT | OBJECT | SPECIES | RECORD | SYSTEM | SYMBOL
  names: []
  source_ids: []
  attributes: {}
  rights_status: ""
```

### Relation

```yaml
relation:
  id: REL-0001
  from: ENT-0001
  to: ENT-0002
  type: CREATED_BY | OCCURRED_AT | INFLUENCED | DERIVED_FROM | CONTRADICTS | PRECEDES | CONTAINS | CONNECTED_TO | USER_DEFINED
  certainty: CONFIRMED | INFERRED | SUGGESTED | UNRESOLVED
  claim_ids: []
  temporal_scope: ""
  weight_basis: ""
```

A relation cannot receive a numerical weight unless `weight_basis` defines a real quantity or declared model.

### Experience node

```yaml
node:
  id: archive
  function: ""
  entry_conditions: []
  required_memory: []
  admitted_claim_classes: []
  module_candidates: []
  decisions: []
  writes_to_memory: []
  exits: []
  convergence_contribution: ""
```

### Module

```yaml
module:
  id: archive-graph
  inputs: []
  outputs: []
  supported_data_types: []
  semantic_channels: []
  interaction_roles: []
  accessibility_modes: []
  performance_cost: LOW | MEDIUM | HIGH
  rights_requirements: []
```

### Session memory

```yaml
session_memory:
  session_id: ""
  path: []
  decisions: []
  claims_seen: []
  sources_opened: []
  entities_traced: []
  relations_traced: []
  contradictions_seen: []
  annotations: []
  selected_state: ""
  accessibility: {}
  contemplative: {}
  artifact_seed: ""
  unresolved: []
```

## 4. Main execution pipeline

```text
INGEST
→ NORMALIZE
→ CLASSIFY
→ VALIDATE
→ BUILD KNOWLEDGE GRAPH
→ IDENTIFY QUESTIONS
→ SELECT PATH OPPORTUNITY
→ SELECT MODULE
→ BUILD SEMANTIC PASSPORTS
→ COMPOSE SCENE
→ EXECUTE INTERACTION
→ WRITE MEMORY
→ EVALUATE CONVERGENCE
→ RETURN / +∞
→ GENERATE ARTIFACT
→ OFFER CONTRIBUTION AND RE-ENTRY
```

## 5. Ingestion algorithm

```pseudo
function ingest(input):
    source = registerSource(input)

    if source.privacy_status != PUBLIC:
        routeToPrivateStaging(source)

    extracted = extractEntitiesClaimsRelations(input)
    deduplicated = compareChecksumsAndSemanticSimilarity(extracted)

    for item in deduplicated:
        attachProvenance(item, source.id)
        assignRightsAndCulturalStatus(item)

    return reviewQueue(deduplicated)
```

No material becomes canonical solely because a model extracted it.

## 6. Claim validation algorithm

```pseudo
function validateClaim(claim):
    require claim.class
    require claim.source_ids unless claim.class in [SYNTHETIC, UNKNOWN]

    if claim contains quantitative value:
        require definition
        require unit when applicable
        require denominator when applicable
        require time_scope
        require method or direct source field

    if rights or cultural status is blocked:
        claim.publication_status = BLOCKED

    if source contradiction is unresolved:
        preserve all claims
        do not average incompatible values
        claim.publication_status = REVIEW

    return claim
```

## 7. Knowledge graph construction

The graph is heterogeneous and layered.

```text
ENTITY LAYER
RELATION LAYER
CLAIM LAYER
SOURCE LAYER
TEMPORAL LAYER
GEOGRAPHIC LAYER
USER MEMORY LAYER
MYTHOPOETIC LAYER
```

Layers may be visually combined only when their status remains inspectable.

```pseudo
function buildGraph(entities, relations, claims, sources):
    graph = new MultiLayerGraph()

    addNodes(graph, entities)
    addSourceNodes(graph, sources)
    addClaimNodes(graph, claims)

    for relation in relations:
        graph.addEdge(
            relation.from,
            relation.to,
            type=relation.type,
            certainty=relation.certainty,
            evidence=relation.claim_ids
        )

    connectClaimsToSources(graph)
    connectClaimsToEntities(graph)
    preserveContradictionEdges(graph)

    return graph
```

## 8. Question engine

A scene begins from a question, not from a preferred visual effect.

Question types:

```text
WHAT EXISTS?
HOW ARE THINGS CONNECTED?
WHAT CHANGED?
WHAT IS MISSING?
WHERE DO SOURCES DISAGREE?
HOW DID THIS PATH FORM?
WHAT COULD HAPPEN UNDER A DECLARED SCENARIO?
WHAT DOES THIS SYMBOLIC SYSTEM PROPOSE?
```

```pseudo
function deriveQuestions(graph, userIntent, sessionMemory):
    candidates = []

    candidates += unresolvedContradictions(graph)
    candidates += highEvidenceRelationsNotSeen(sessionMemory)
    candidates += missingOrSparseRegions(graph)
    candidates += userSelectedEntities(userIntent)
    candidates += pathConsequences(sessionMemory.decisions)

    return rankByRelevanceNotImportance(candidates)
```

`rankByRelevanceNotImportance` uses declared user intent, path continuity, evidence availability and novelty within the session. It must not claim universal cultural importance.

## 9. Path selection algorithm

The initial path choice is explicit, not inferred psychologically.

```pseudo
function startPath(choice):
    if choice == OBSERVE:
        prioritize [comparison, sourceInspection, currentRelations, uncertainty]

    if choice == REMEMBER:
        prioritize [sequence, versions, testimony, temporalTrace, carriedMemory]

    if choice == CONNECT:
        prioritize [network, dependency, territory, sharedAttributes]

    if choice == TRANSFORM:
        prioritize [simulation, parameterChange, beforeAfter, declaredScenario]

    if choice == CONTRIBUTE:
        prioritize [annotation, correction, sourceSuggestion, codeOrTranslation]
```

The current vertical slice implements only `OBSERVE` and `REMEMBER`. Other paths remain graph-compatible future expansions.

## 10. Module-selection algorithm

Module selection is constrained by semantic fit, accessibility, performance and rights.

```pseudo
function selectModule(question, graphSlice, device, accessibility):
    candidates = modulesSupporting(question.type, graphSlice.dataTypes)

    candidates = filter(candidates, module =>
        module.rights_requirements are satisfied
        and module supports accessibility.mode
        and module.performance_cost <= deviceBudget(device)
    )

    for module in candidates:
        module.fit =
            semanticCoverage(module, graphSlice)
          + interactionUsefulness(module, question)
          + pathContinuity(module, sessionMemory)
          - unexplainedChannelPenalty(module)
          - motionOverloadPenalty(module)

    return highestFit(candidates)
```

`fit` is an internal selection heuristic. It must not be displayed as a factual score unless its formula and purpose are exposed.

## 11. Semantic passport generation

Before rendering:

```pseudo
function createSemanticPassport(element, sourceData, scene):
    passport = {
        question_supported,
        source_fields,
        transformation_ids,
        meaning,
        channel,
        scale,
        legend_label,
        uncertainty_behavior,
        missing_value_behavior,
        interaction_role,
        status
    }

    if element has no source/state/atmosphere justification:
        passport.status = BLOCKED

    if removing element does not reduce comprehension or necessary atmosphere:
        passport.status = BLOCKED

    return passport
```

No blocked element renders in canonical mode.

## 12. Visual-channel mapping

Preferred order for precise comparison:

```text
POSITION
LENGTH
ANGLE / DIRECTION
AREA
CONNECTION
TEXTURE / DENSITY
COLOR
OPACITY
MOTION
SOUND
```

Mapping examples:

```yaml
confirmed_relation:
  channel: solid_connection

inferred_relation:
  channel: interrupted_or_soft_connection

uncertainty:
  channel: dispersion_or_incomplete_edge

missing_value:
  channel: explicit_empty_state

sequence_without_duration:
  channel: ordered_position

measured_duration:
  channel: length_or_timeline_position

contradiction:
  channel: preserved_parallel_claims_or_rupture

session_memory:
  channel: sedimentation_or_trace
```

## 13. Scene-composition algorithm

```pseudo
function composeScene(question, module, passports, sceneRecipe):
    admitted = passports where status == ADMITTED
    atmosphere = passports where status == ATMOSPHERE

    enforce primaryVariables <= 3
    enforce secondaryVariables <= 5
    enforce unexplainedVisualChannels == 0
    enforce unexplainedMotionBehaviors == 0
    enforce highPriorityMotion <= 2

    layout = sceneRecipe.grid(admitted, atmosphere)
    hierarchy = prioritize(question, sources, userAction)

    return renderPlan(layout, hierarchy, module)
```

The historical KODEX grammar may influence grid, density and motion, but evidence and accessibility gates take precedence.

## 14. Interaction algorithm

Every interaction must have one role:

```text
REVEAL
COMPARE
FILTER
TRACE
NAVIGATE
SIMULATE
ANNOTATE
CONTRIBUTE
ORIENT
```

```pseudo
function handleInteraction(action):
    require action.role
    updateSceneState(action)
    writeSessionMemory(action)
    exposeConsequence(action)
    keepUndoOrBackAvailable()
```

Decorative interactions that create no comprehension, state or path consequence remain experimental.

## 15. State machine

Core scene lifecycle:

```text
DORMANT
→ AWARE
→ ENGAGED
→ OPEN
→ INTEGRATING
→ RETURNING
→ COMPLETE
```

Compatibility with existing prototypes:

- existing `DORMANT → AWARE → OPEN` remains valid;
- `ENGAGED`, `INTEGRATING` and `RETURNING` add the missing information and convergence functions;
- no state implies spiritual rank.

```pseudo
transition(DORMANT, userPresence) -> AWARE
transition(AWARE, meaningfulAction) -> ENGAGED
transition(ENGAGED, nodeObjectiveMet) -> OPEN
transition(OPEN, pathMemoryReady) -> INTEGRATING
transition(INTEGRATING, returnRequestedOrRequired) -> RETURNING
transition(RETURNING, orientationComplete) -> COMPLETE
```

## 16. Session-memory algorithm

```pseudo
function writeSessionMemory(event):
    memory.path.append(event.node)
    memory.decisions.append(event.decision if present)
    memory.claims_seen += event.claims
    memory.sources_opened += event.openedSources
    memory.relations_traced += event.relations
    memory.unresolved += event.unresolved

    memory.artifact_seed = stableHash(
        session_id,
        ordered decisions,
        relations traced,
        sources opened,
        selected visual state
    )
```

The hash is a technical seed and must not be shown as meaningful archive truth unless labeled accordingly.

## 17. Artifact-generation algorithm

The final artifact is not a random souvenir. It visualizes the path.

```pseudo
function generatePathArtifact(memory, graph):
    includedRelations = memory.relations_traced
    includedSources = memory.sources_opened
    unresolved = memory.unresolved
    decisionSequence = memory.decisions

    artifact = chooseArtifactGrammar(decisionSequence)
    artifact.encode(includedRelations)
    artifact.annotate(includedSources)
    artifact.preserve(unresolved)
    artifact.seed(memory.artifact_seed)

    return artifact with provenanceManifest
```

Possible artifact types:

- memory topography;
- relation constellation;
- branching route print;
- spectral path glyph;
- temporal organism;
- evidence flower;
- archive dossier;
- downloadable SVG/PNG/WebM when format permits.

## 18. Convergence algorithm

A route may enter Return only when it can answer:

```text
What did the user encounter?
What did the user choose?
Which sources were used?
Which relations became visible?
What remains uncertain?
How did the system change?
What can the user do next?
```

```pseudo
function canConverge(memory):
    return
        memory.path is not empty
        and at least one meaningful decision exists
        and provenance is available
        and ordinary exit controls are available
```

```pseudo
function returnSequence(memory):
    reduce unresolved high-priority motion
    stop or release audio
    restore ordinary time and navigation
    widen visual field from obsidian toward white
    reveal pure spectral relations based on actual path
    show path summary
    show provenance and limitations
    generate artifact
    offer contribution
    offer repository/code access
    open re-entry based on unseen relation
```

## 19. Re-entry algorithm

```pseudo
function selectReEntry(memory, graph):
    candidates = adjacentRelations(memory.relations_traced)
    candidates -= memory.relations_traced
    candidates = filterByRightsAndEvidence(candidates)

    return candidate that:
        is meaningfully connected
        introduces a new question
        does not repeat the same module by default
```

Re-entry is not infinite random content. It is controlled expansion from the path already built.

## 20. Heart Engine integration

```pseudo
function heartMode(userChoice, sensorAvailable):
    if userChoice == NATURAL_BREATH:
        no imposed cycle

    if userChoice == GUIDED_PULSE:
        use declared synthetic tempo
        label NOT MEASURED

    if userChoice == TAP_PULSE:
        derive approximate tempo from taps
        label USER INPUT / NOT MEDICAL

    if userChoice == SENSOR_PULSE and sensorAvailable is false:
        block and explain unavailable mode
```

Heart output may modulate:

- transition timing;
- light amplitude;
- relation activation;
- optional sound envelope;
- Return opening.

It may not alter claim truth or rank the user.

## 21. Device and accessibility adaptation

```pseudo
function deviceBudget(device, preference):
    if preference.motion == OFF:
        return STATIC

    if preference.motion == REDUCED:
        return LOW

    if device.webgl2 == false:
        return FALLBACK

    if device.mobile or device.lowPower:
        capDPR
        reducePasses
        reduceParticles
        preserveSemanticInteractions
        return MEDIUM

    return HIGH
```

Adaptation may reduce visual cost but must not remove essential information or controls.

## 22. Failure behavior

```pseudo
if sourceMissing:
    render UNKNOWN, not invented balance

if rightsUnclear:
    block public output

if culturalAuthorizationRequired:
    route to human review

if WebGLFails:
    load semantic still/SVG/Canvas fallback

if audioPermissionDenied:
    use silent mode or declared procedural input

if sensorDisconnects:
    stop sensor claim and fall back visibly

if distressReported:
    stop contemplative sequence and return to ordinary orientation

if modelContextIncomplete:
    read START_HERE and CURRENT_STATE before acting
```

## 23. Quality invariant

A canonical KODEX output must satisfy:

```text
COMPREHENSION
+ ASTONISHMENT
+ CONTINUATION
```

Where:

- comprehension comes from truthful mapping and hierarchy;
- astonishment comes from an original living form;
- continuation comes from provenance, contribution and meaningful re-entry.

## 24. First implementation target

```text
INPUT:
one real, rights-cleared corpus

PATH:
−∞ → THRESHOLD → OBSERVE or REMEMBER → ARCHIVE → HEART → RETURN / +∞

OUTPUT:
path-dependent SVG or Canvas artifact
+ source manifest
+ unresolved questions
+ contribution route
+ next connected path
```

No new major portal should precede this end-to-end proof unless it directly enables it.
