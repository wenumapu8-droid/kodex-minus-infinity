# KODEX−∞ Visual Assembly Protocol — Proposal v0.2

Status: **PROPOSAL / NOT CANONICAL**  
Epistemic status: **INFERRED + CANON-CONSTRAINED**

## Purpose

Define a governed visual-composition layer so agents assemble KODEX screens from authorized sources, recipes and reusable components rather than independently reinventing the visual language.

## Canonical compatibility

This proposal does not change the A–Y journey topology, scene contracts, event-trace routing, session memory rules, epistemic standard, cultural provenance policy or deployment gate.

The proposed visual layer is subordinate to canonical coordinates and states:

```text
CANONICAL COORDINATE / SCENE CONTRACT
        ↓
VISUAL MODE + RECIPE REQUEST
        ↓
AUTHORIZED SOURCE RESOLUTION
        ↓
GOVERNED ASSEMBLY
        ↓
RUNTIME / QA / VISUAL GATES
```

## Namespaces

- `OCN-*` — authored Ocín source/work identifiers.
- `RCP-*` — composition grammar/recipe identifiers.
- `KDX-VIS-*` — reusable editorial/vector/interface visual primitives.
- `KDX-FX-*` — live material/procedural effect systems.

These namespaces remain distinct. A visual component is not an artwork; an effect is not a source; a recipe is not a scene; a visual mode is not a canonical coordinate.

## Assembly contract

```text
OCN-* source
+ one primary RCP-* recipe
+ bounded KDX-VIS-* components
+ optional approved KDX-FX-* live layer
= Assembly Candidate
```

An Assembly Candidate is data first. It must declare source IDs, recipe, governed component IDs, normalized layout coordinates, viewport, color mode, reduced-motion behavior, provenance state and epistemic notes.

## Source integrity

An agent cannot override source rights or transformations. Ocín master pixels remain immutable by default. Public/export rights and derivative permissions are resolved from the authoritative source registry before promotion.

External references are reference evidence only. Their composition/material/system properties may be abstracted; they are not copied as production assets unless rights and intended use explicitly allow it.

## Color grammar

High-level proposed rule consistent with current creator direction:

`MONOCHROME BASE + COLOR AS SIGNAL / EVENT`

Color is used for state, anomaly, transition, memory trace or deliberate scene-level rupture rather than continuous decorative RGB styling. Quantitative ratios remain art-direction heuristics, not canonical quotas.

## Hard-gate order

Before visual scoring:

1. canonical compatibility;
2. provenance and rights;
3. cultural policy;
4. scientific/epistemic boundary;
5. semantic/accessibility contract;
6. responsive composition;
7. reduced-motion equivalence;
8. performance/fallback;
9. visual-convergence review;
10. creator acceptance.

`CONTRACT_PASS != BUILD_PASS != DEVICE_QA_PASS != FRONTIER_VISUAL_PASS != CREATOR_VISUAL_PASS`

## Kit integration

The implementation repo already uses a Kit Protocol: module + contract + example + fallback/acceptance. Visual Assembly should extend that single registry instead of creating a parallel hidden registry.

Proposed kit types:
- visual component kit (`KDX-VIS-*`);
- recipe kit (`RCP-*`);
- existing effect kit (`KDX-FX-*`).

## Initial recipe set — proposal

- `RCP-MONOLITH`
- `RCP-ORBITAL-CLOCK`
- `RCP-TYPE-ARCH`
- `RCP-ARCHIVE-COLLAGE`
- `RCP-SIGNAL-BOARD`
- `RCP-QUIET-FIELD`
- `RCP-COLOR-EVENT`

## Visual-mode taxonomy — proposal

The labels THRESHOLD / PROLOGUE / DESCENT / ARCHIVE / MACHINE / COSMOLOGY / RETURN may be used as visual/editorial modes for composition and art direction. They are explicitly **not topology authority** and cannot replace A–Y coordinates.

A coordinate can request a visual mode, e.g.:

```json
{
  "coordinate": "A",
  "canonical_scene": "THRESHOLD",
  "visual_mode": "00_THRESHOLD",
  "recipe": "RCP-MONOLITH"
}
```

## Current ID reservation

`KDX-VIS-0001` through `KDX-VIS-0077` exist as a proposed generated component library. They remain `RESERVED_PENDING_CANONICAL_MERGE` until an authoritative registry decision explicitly accepts the namespace allocation.

No cultural/traditional authorship claim is attached to these generated primitives. They may not be used as scientific evidence.

## Runtime proof sequence

Do not implement all recipes at once. After the current active visual-fidelity lane clears:

1. choose one noindex lab route;
2. resolve one approved Ocín source;
3. use one recipe;
4. use 3–4 governed visual primitives maximum;
5. keep semantic copy in DOM;
6. expose assembly JSON in debug;
7. demonstrate deterministic reconstruction;
8. capture desktop/mobile/reduced-motion evidence;
9. run Frontier Visual Gate;
10. request creator acceptance.

Only after the pattern passes should remaining recipes/components be integrated.

## Promotion requirements

This proposal becomes canonical only through an explicit architecture/registry decision. Documentation or a green build alone does not make it canonical or implemented.

Deployment remains governed by the existing exact creator authorization gate.