# KODEX−∞ INTERACTIVE REFERENCE EXTRACTION PROTOCOL

Status: `CANONICAL RESEARCH METHOD / V0.1`

## Purpose

Extract useful interaction logic from references such as Photism and `(W)HOLE` without copying their visual identity, proprietary assets, text or undocumented technology.

## Evidence classes

```text
DIRECT_CAPTURE
PUBLIC_DOCUMENTATION
TECHNICAL_INSPECTION
CREATOR_DESCRIPTION
USER_RECOLLECTION
UNVERIFIED_IMPRESSION
```

Only the first three may support a technical implementation claim.

## Capture packet

For each reference collect:

```text
URL and access date
60–120 second desktop recording
60–120 second mobile recording
entry/loading sequence
navigation model
all visible controls
pointer/touch/keyboard behavior
state transitions
sound and voice behavior
performance/failure behavior
reduced-motion and accessibility observations
publicly visible technology evidence when permitted
```

## Decomposition matrix

```yaml
reference:
  id: ""
  title: ""
  evidence_status: ""
  experience_promise: ""
  entry_time_seconds: null
  navigation:
    linear_path: false
    branching_path: false
    map: false
    back_forward: false
  interaction_primitives: []
  motion:
    continuous: []
    triggered: []
    transitions: []
  sensory:
    audio: []
    voice: []
    haptics: []
  information_design:
    hierarchy: []
    labels: []
    uncertainty: []
  mobile:
    observations: []
  accessibility:
    observations: []
  borrowed_logic: []
  rejected_patterns: []
  copyright_boundary: NO_ASSET_COPY
```

## Admission questions

Before borrowing a pattern, answer:

1. What user problem does it solve?
2. Can the visitor understand it without explanation?
3. Does it preserve orientation?
4. Does it have touch, keyboard and reduced-motion behavior?
5. Does it create a later consequence?
6. Can KODEX implement it with its existing stack?
7. Is it recognizably generic interaction logic rather than proprietary visual identity?
8. What is the lighter fallback?

## KODEX adaptation rule

```text
REFERENCE BEHAVIOR
→ ABSTRACT USER/STATE LOGIC
→ MAP TO KODEX QUESTION
→ ASSIGN SEMANTIC PASSPORT
→ IMPLEMENT WITH KODEX TOKENS AND ASSETS
→ TEST IN CONTEXT
```

Never:

```text
REFERENCE SCREEN
→ visual imitation
```

## Output

Every audited reference produces:

- one reference record;
- one borrowed-logic list;
- one rejected-pattern list;
- zero or more interaction-passport proposals;
- one implementation decision or explicit `NO ACTION` result.
