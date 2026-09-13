# START HERE — KODEX−∞

This is the mandatory entry point for every human contributor and every AI agent.

## 1. What KODEX is

KODEX−∞ is a living visual language, generative archive, interactive information system and creative operating system created by Nicolás Ortega / Ocín.

It connects authored visual codes, works, symbols, computation, memory, research and user decisions through state, relation and consequence.

KODEX is not a generic cyberpunk website, mystical dashboard, random generative-art gallery, personality test or collection of unrelated loops.

## 2. Current V1 release architecture

The current implementation authority is the finite seven-scene corridor defined by `ADR-0011-SEVEN-SCENE-CORRIDOR-V1.md`:

```text
00 THRESHOLD
→ 01 PROLOGUE
→ 02 DESCENT
→ 03 ARCHIVE
→ 04 MACHINE
→ 05 COSMOLOGY
→ 06 RETURN
```

Mirror topology:

```text
THRESHOLD ↔ RETURN
PROLOGUE  ↔ COSMOLOGY
DESCENT   ↔ MACHINE
ARCHIVE   = inversion axis
```

RETURN carries accumulated memory and produces transformed continuity (`THRESHOLD′`), not a blind reset.

### Historical A–Y architecture

The August 2026 A–Y / A–M–Y topology remains in the repository for provenance and research, including `ADR-0010` and `data/alphabet-topology.json`.

Its current status for V1 implementation is:

```text
DEPRECATED / HISTORICAL ARCHITECTURE
```

Do not use it to assign current scenes, reopen the release topology or create a parallel runtime unless a later explicit Ocín decision promotes it again.

## 3. Repository roles

```text
wenumapu8-droid/kodex-minus-infinity
  Canon, context, decisions, epistemic policy, research,
  current-state snapshots and agent operating rules.

wenumapu8-droid/wenu-frontend
  Astro implementation, KODEX routes, components,
  shaders, assets and interactive laboratories.
```

Documentation does not count as implemented runtime. Preserve original repository, branch, path and checksum during recovery or migration.

## 4. Authority order

When sources conflict, use this order:

```text
EXPLICIT CURRENT OCÍN DECISION
→ CURRENT TRUTH LEDGER / DRIVE SOURCE AUTHORITY
→ ADR-0011 SEVEN-SCENE V1
→ CURRENT HIFI / SCENE BIBLE / DESIGN CONTRACT
→ VERIFIED REPOSITORY FILE AT A KNOWN REF
→ CURRENT_STATE_V1_CLOSURE.md
→ HISTORICAL ARCHITECTURE / PROTOTYPES / RECOVERED SUMMARIES
```

Do not silently reconcile contradictions. Preserve the losing source as historical or deprecated and record why it no longer governs implementation.

## 5. Required reading order

1. `START_HERE.md`
2. `PROJECT_MANIFEST.json`
3. `canon/KODEX_CANON.md`
4. `canon/KODEX_EPISTEMIC_STANDARD.md`
5. `docs/decisions/ADR-0011-SEVEN-SCENE-CORRIDOR-V1.md`
6. `product/CURRENT_STATE_V1_CLOSURE.md`
7. current Drive Scene Bible / Hi-Fi targets / Source Authority
8. affected implementation files in `wenu-frontend` at the exact branch/ref
9. historical documents only when needed for recovery or provenance

Read `context/ERRATA.md` before repeating corrected package paths, checksums or historical claims.

## 6. Current release invariants

```text
Every V1 journey begins at THRESHOLD through voluntary entry.
The current release contains seven principal scenes, 00–06.
Meaningful decisions create later consequences.
Memory persists across the journey with privacy-minimized state.
ARCHIVE makes trace/provenance inspectable.
MACHINE uses real causal parameters, not decorative pseudo-metrics.
RETURN is route-dependent and carries memory.
Re-entry does not silently erase the previous transformation.
Every factual claim has provenance and epistemic status.
Every essential interaction has touch/keyboard/reduced-motion/fallback behavior.
Scientific, cultural, speculative and mythopoetic layers remain distinguishable.
Documentation does not count as implemented runtime.
No deployment occurs without APROBAR DEPLOY.
```

## 7. Epistemic statuses

All material must be classified as:

```text
VERIFIED
CANONICAL
INFERRED
SPECULATIVE
NEEDS_CONFIRMATION
DEPRECATED
```

Never convert symbolic language into scientific fact. Never universalize cultural symbols. Never fill missing data for aesthetic symmetry.

Production status is separate from epistemic status:

```text
CONCEPT
REFERENCE
GENERATED ASSET
PROTOTYPE
IMPLEMENTED
TESTED
CREATOR-APPROVED
DEPLOYED
COMMERCIAL RESULT
```

Do not collapse these states.

## 8. Visual and technical lineage

Verified or source-linked KODEX work includes:

- Astro fullscreen/no-scroll compositions;
- DOM / SVG / Canvas / WebGL responsibility split;
- responsive poster-like mobile layouts;
- pointer, touch, keyboard and optional audio input;
- shader and multipass feedback prototypes;
- OBSERVE / Observation Eye lineages;
- depth/tunnel and impossible-space systems;
- archive/memory relation fields;
- procedural MACHINE systems;
- orbital/cosmology systems;
- journey memory / RETURN experiments;
- original Ocín visual grammar and authored assets;
- reduced-motion and fallback behavior;
- visual QA/debug tooling.

These are recovery sources and candidate engines. A historical implementation is not automatically the current visual authority.

## 9. Current product objective

Close one coherent seven-scene V1 instead of expanding foundational architecture.

V1 must demonstrate:

- voluntary THRESHOLD entry;
- PROLOGUE observation state;
- causal DESCENT interaction;
- inspectable ARCHIVE memory/provenance;
- causal MACHINE transformation;
- authored COSMOLOGY scale/relation;
- RETURN derived from the accumulated trace;
- path-dependent visible consequences;
- keyboard, touch, reduced-motion and non-WebGL equivalence where required;
- evidence-backed QA at the current viewport matrix.

Current closure work is tracked in Drive `KODEX−∞ SYNC BOARD — LAB → LIVE — v1`, tab `V1 Closure`.

## 10. Required agent preflight

Before changing files, return:

```yaml
preflight:
  objective: ""
  repository: ""
  branch: ""
  active_milestone: ""
  files_actually_read: []
  existing_code_inspected: []
  canonical_constraints: []
  affected_scenes: []
  evidence_or_sources_required: []
  proposed_changes: []
  tests_planned: []
  unresolved: []
  deployment_requested: false
```

Do not claim to have inspected, implemented or validated something without evidence.

## 11. Public-repository boundary

Do not commit:

- raw private conversations;
- personal identifiers or reflections;
- secrets or credentials;
- rights-unclear assets;
- restricted cultural knowledge;
- commercial binaries before licensing and delivery review.

Reviewed summaries, checksums, source manifests, canonical decisions and public-safe code may be committed when their status is explicit.

## 12. Release boundary

Commits, pull requests, previews and prototypes do not authorize production deployment.

```text
DEPLOYMENT STATUS: BLOCKED
REQUIRED AUTHORIZATION: APROBAR DEPLOY
```
