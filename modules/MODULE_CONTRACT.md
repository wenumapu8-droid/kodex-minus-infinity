# KODEX−∞ MODULE CONTRACT

Status: `CANONICAL MODULE STANDARD / V0.1`

A module is a reusable information, interaction or rendering capability. A scene may coordinate several modules; a module must not silently redefine the product journey.

## Required module structure

```text
modules/<module-id>/
├── README.md
├── spec.yaml
├── schema.json              # when structured data is accepted
├── presets/                 # optional
├── examples/                # required before canonical release
├── runtime/                 # implementation or integration adapter
├── fallbacks/               # static/SVG/Canvas alternative
└── tests/                   # module-level validation
```

During early specification, `README.md` may precede implementation, but status must remain `SPECIFICATION`.

## Module manifest

```yaml
module:
  id: ""
  version: "0.0.0"
  status: SPECIFICATION | EXPERIMENTAL | APPROVED | CANONICAL | DEPRECATED
  purpose: ""
  question_types: []
  supported_claim_classes: []
  input_schema: ""
  output_schema: ""
  semantic_channels: []
  interaction_roles: []
  writes_to_memory: []
  emits_events: []
  accepts_events: []
  accessibility_modes: []
  renderers: [DOM, SVG, CANVAS, WEBGL]
  performance_cost: LOW | MEDIUM | HIGH
  fallback: ""
  rights_requirements: []
  cultural_review: false
  contemplative_review: false
  tests: []
```

## Required documentation

Each module explains:

1. the question it helps answer;
2. accepted inputs and truth classes;
3. transformations;
4. visual mapping;
5. interaction roles;
6. memory writes and later consequences;
7. accessibility and fallback;
8. performance and cleanup;
9. provenance access;
10. rights and cultural boundaries;
11. how it contributes to Return;
12. what it explicitly does not do.

## Semantic constraints

- no unexplained visual variables;
- no arbitrary numeric output;
- synthetic values are labeled;
- uncertainty and missing data have defined behavior;
- atmosphere is separable from information;
- module output is inspectable through source/method views.

## Runtime constraints

- no global event listeners without cleanup;
- no permanent animation loop when inactive;
- no hidden audio activation;
- no sensor mode without consent and signal state;
- no heavy dependency without documented need;
- no WebGL-only essential meaning;
- no output that breaks reduced motion.

## Versioning

- patch: implementation correction without changing module contract;
- minor: backward-compatible new capability;
- major: input/output or semantic-contract change.

A canonical major version requires a decision record and migration plan.

## Definition of ready

A module is `APPROVED` when:

- specification is complete;
- one real example exists;
- semantic passports exist;
- fallback and reduced motion exist;
- relevant tests pass;
- rights and provenance are resolved;
- integration into one experience node is demonstrated.

A module becomes `CANONICAL` only through human-reviewed pull request or explicit decision.
