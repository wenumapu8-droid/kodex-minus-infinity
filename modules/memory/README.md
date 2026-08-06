# KODEX MEMORY ENGINE

Status: `CANONICAL SPECIFICATION / V0.1`

## Purpose

Preserve meaningful user decisions, evidence encounters and path consequences while minimizing personal data collection.

## Inputs

- canonical KODEX events;
- node transitions;
- decisions;
- source/claim/relation IDs;
- accessibility and contemplative preferences;
- user-authored notes with explicit privacy status.

## Outputs

- session path;
- Return summary;
- reproducible technical artifact seed;
- path-dependent visual emphasis;
- connected re-entry candidates;
- optional user-controlled export.

## Write rule

```pseudo
write when event changes:
  path
  evidence exposure
  relation tracing
  interpretation
  artifact
  contribution

ignore:
  passive pointer movement
  decorative animation frames
  raw microphone audio
  inferred emotional or spiritual state
```

## Data minimization

- default to runtime memory;
- `sessionStorage` is optional;
- preferences may use `localStorage`;
- personal reflection stays private/local unless explicitly submitted;
- no biometric persistence by default;
- reset and deletion remain visible.

## Events accepted

```text
kodex:path:decision
kodex:evidence:source-opened
kodex:evidence:claim-compared
kodex:archive:relation-traced
kodex:archive:version-compared
kodex:heart:mode-selected
kodex:contribution:prepared
kodex:artifact:generated
```

## Technical seed

The artifact seed is a reproducibility value derived from software version and ordered session events. When exposed, label it as technical. It is not a soul code, consciousness signature or cultural identifier.

## Path consequences

Memory affects:

- which records appear first;
- which relations receive emphasis;
- which Return artifact grammar is selected;
- which sources appear in the summary;
- which unresolved question opens re-entry.

## Failure behavior

When persistence fails, continue in runtime memory and notify only when the user attempts to save/export. Essential navigation must not depend on storage availability.

## Return contribution

The engine produces the exact path manifest consumed by Return and artifact generation.
