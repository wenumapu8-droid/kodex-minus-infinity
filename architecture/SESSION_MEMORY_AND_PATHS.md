# KODEX−∞ SESSION MEMORY AND PATHS

Status: `CANONICAL PRODUCT SPECIFICATION / V0.1`

## Purpose

KODEX must remember the user's route without covertly profiling them. Memory creates narrative consequence, not psychological classification.

## Principles

- collect only what the current experience needs;
- keep private reflection local by default;
- make saved or contributed information explicit;
- allow reset, reverse and exit;
- distinguish system events from user statements;
- never infer diagnosis, spiritual level or identity from interaction patterns;
- use memory to construct Return and re-entry.

## Memory layers

### Ephemeral scene state

Destroyed when leaving the node unless promoted intentionally.

```yaml
scene_state:
  lifecycle: DORMANT
  selected_record: null
  open_overlay: null
  pointer: [0, 0]
  local_parameters: {}
```

### Session memory

Lives for the current journey.

```yaml
session_memory:
  version: 1
  session_id: ""
  started_at: ""
  path: []
  decisions: []
  sources_opened: []
  claims_seen: []
  entities_traced: []
  relations_traced: []
  contradictions_seen: []
  user_annotations: []
  system_observations: []
  selected_functional_state: null
  contemplative_preferences: {}
  accessibility: {}
  artifact_seed: ""
  generated_artifacts: []
  unresolved: []
  consent: {}
```

### Persistent preference memory

May survive sessions with clear purpose.

```yaml
preferences:
  language: es
  motion: REDUCED
  sound: OFF
  contrast: DEFAULT
  text_scale: DEFAULT
```

### Contribution record

Created only after explicit action and consent.

```yaml
contribution:
  id: ""
  type: SOURCE_SUGGESTION | CORRECTION | TRANSLATION | CODE | VISUAL_INTERPRETATION | ANNOTATION
  content: ""
  attribution: ""
  public_permission: false
  rights_confirmation: false
  moderation_status: PENDING
```

## Decision record

```yaml
decision:
  id: DEC-SESSION-001
  node_id: threshold
  choice: OBSERVE
  created_at: ""
  consequence_ids:
    - archive.current_relations_first
    - artifact.relation_constellation
  reversible: true
```

A decision is invalid when all available options create the same later experience.

## OBSERVE path memory

Priority writes:

```text
sources opened
claims compared
uncertainty inspected
current relations traced
contradictions revealed
```

Return artifact candidates:

- relation constellation;
- evidence map;
- comparison dossier;
- observed field portrait.

## REMEMBER path memory

Priority writes:

```text
versions traversed
testimony encountered
sequence reconstructed
records restored
traces carried forward
```

Return artifact candidates:

- memory topography;
- temporal organism;
- sedimented archive print;
- path palimpsest.

## Memory write policy

```pseudo
function shouldWrite(event):
    if event is pointer movement or passive animation:
        return false

    if event changes path, evidence exposure, interpretation or artifact:
        return true

    if event contains personal reflection:
        return only with local/private classification

    return false
```

## Memory consequence policy

Every important memory entry should affect at least one later function:

- available route;
- visual emphasis;
- source summary;
- artifact geometry;
- Return narrative;
- re-entry suggestion.

## Artifact seed

The seed makes the path reproducible without pretending to be metaphysical identity.

```text
seed = stableHash(
  software_version
  + session_id
  + ordered_decision_ids
  + ordered_relation_ids
  + ordered_source_ids
  + artifact_grammar
)
```

Display label when exposed:

```text
GENERATIVE SEED / TECHNICAL REPRODUCTION VALUE
```

Never call it a soul code, consciousness signature or cosmic frequency unless used in clearly mythopoetic fiction.

## Return memory summary

Return should present a concise, inspectable record:

```yaml
return_summary:
  route: [THRESHOLD, ARCHIVE, HEART, RETURN]
  choices: [OBSERVE]
  sources_opened: 4
  relations_traced: 6
  contradictions_seen: 1
  unresolved_questions: 2
  artifact: ART-SESSION-001
```

Counts derive from actual session events. They are not scores.

## Re-entry selection

Re-entry candidates are connected but unseen relations.

```pseudo
candidates = neighbors(relations_traced)
candidates -= relations_traced
candidates = rightsAndEvidenceFilter(candidates)
candidates = excludeImmediateRepetition(candidates)
```

The selected route should explain why it is connected:

```text
ENTER THROUGH THE SOURCE YOU DID NOT OPEN
TRACE THE CONTRADICTION LEFT UNRESOLVED
FOLLOW THE ENTITY CONNECTED TO THREE OF YOUR RECORDS
```

## Privacy actions

The interface must support:

- clear current path memory;
- restart session;
- download artifact without contribution;
- export source manifest;
- delete local reflection;
- choose whether a contribution is attributed or anonymous when supported;
- view what will be submitted before submission.

## Analytics boundary

Permitted product analytics should be minimal and aggregated, for example:

- scene load success/failure;
- fallback activation;
- performance tier;
- route completion;
- accessibility mode usage.

Do not send:

- private reflection text;
- detailed source reading history tied to identity;
- inferred emotional state;
- microphone audio;
- sensor data;
- generated artifact content without explicit consent.

## Failure and recovery

```pseudo
if storage unavailable:
    keep memory in runtime only

if session schema changes:
    migrate safely or start a fresh session with notice

if corruption detected:
    preserve source access and reset artifact state

if user clears memory:
    remove local session state immediately

if route cannot converge:
    offer direct Return with known limitations
```
