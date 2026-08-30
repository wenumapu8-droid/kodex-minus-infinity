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
GOVERNED ASSEMBLY CANDIDATE
        ↓
VISUAL SPECIMEN VIEWPORT / PRESENTATION CONTRACT
        ↓
RUNTIME / QA / VISUAL GATES
```

## Namespaces

- `OCN-*` — authored Ocín source/work identifiers.
- `RCP-*` — composition grammar/recipe identifiers.
- `KDX-VIS-*` — reusable editorial/vector/interface visual primitives.
- `KDX-FX-*` — live material/procedural effect systems.

These namespaces remain distinct. A visual component is not an artwork; an effect is not a source; a recipe is not a scene; a visual mode is not a canonical coordinate.

No canonical `VSP-*` namespace is proposed for acceptance yet. The current implementation draft uses **Visual Specimen Viewport** as a contract concept only until architecture review decides whether a stable identifier family is necessary.

## Assembly contract

```text
OCN-* source
+ one primary RCP-* recipe
+ bounded KDX-VIS-* components
+ optional approved KDX-FX-* live layer
= Assembly Candidate
```

An Assembly Candidate is data first. It must declare source IDs, recipe, governed component IDs, normalized layout coordinates, viewport, color mode, reduced-motion behavior, provenance state and epistemic notes.

## Visual Specimen Viewport — proposed presentation boundary

KODEX repeatedly needs a central surface that can make a concept, artwork, diagram or live field appear to be **running** inside an instrument-like display without collapsing source identity, effects and interface into one raster.

The proposed Visual Specimen Viewport is that presentation boundary:

```text
AUTHORIZED SOURCE
      ↓
VISUAL SPECIMEN VIEWPORT
      ├─ SOURCE MASTER
      ├─ optional SOURCE DERIVATIVE, only if explicitly allowed
      ├─ optional KDX-FX live material
      ├─ field / diagram layer
      ├─ mask / aperture
      ├─ KDX-VIS frame / markers
      ├─ semantic metadata
      └─ interaction state
      ↓
FULL / REDUCED / OFF / FALLBACK
```

The viewport changes how a source is presented and activated; it does not silently change what the source is.

Proposed renderer modes may include:

- `STATIC_MASTER`;
- `SVG_SYSTEM`;
- `CANVAS_2D`;
- `WEBGL_SHADER`;
- `VIDEO_LOOP`;
- `PARTICLE_FIELD`;
- `MODEL_3D`.

The renderer technology is subordinate to the same source-resolution, semantic and fallback rules.

### Viewport hard rules

- Source permissions are resolved before the viewport is configured.
- `SOURCE_MASTER` remains independently addressable and recoverable.
- A viewport cannot grant transformations or public-export rights.
- Critical copy stays semantic/live whenever technically possible.
- Motion cannot be the only carrier of meaning.
- Every FULL presentation needs REDUCED, OFF and fallback behavior before promotion.
- One heavy live renderer per scene remains the default until measured budgets justify more.
- Canvas/WebGL may be `aria-hidden` when equivalent semantic content/actions remain outside the renderer.
- Decorative scientific-looking fields remain interpretive unless connected to an eligible verified source.
- Culture-specific symbols require provenance/permission before render.

### Loop contract

A KODEX loop is proposed as a bounded temporal state cycle rather than an arbitrary GIF reset. For the same source + profile + seed + state, behavior should be reconstructible within a defined parameter envelope. Interaction may perturb the phase but should converge back to a valid loop state.

This supports the intended “visual emulator / holographic specimen” behavior while keeping the scene shell, authored source and presentation engine swappable.

## Source integrity

An agent cannot override source rights or transformations. Ocín master pixels remain immutable by default. Public/export rights and derivative permissions are resolved from the authoritative source registry before promotion.

External references are reference evidence only. Their composition/material/system properties may be abstracted; they are not copied as production assets unless rights and intended use explicitly allow it.

A source may be provenance-resolved while still being blocked for public export. Resolution and permission are independent facts.

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

The Visual Specimen Viewport should be implemented as a presentation contract/renderer boundary over those kit types, not as a second hidden asset registry.

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
2. resolve one explicitly eligible source for the requested scope;
3. use one recipe;
4. use one Visual Specimen Viewport instance;
5. use 3–4 governed visual primitives maximum;
6. keep semantic copy in DOM;
7. expose assembly + viewport state in debug;
8. demonstrate deterministic structural reconstruction;
9. demonstrate FULL / REDUCED / OFF / fallback;
10. capture desktop/mobile evidence;
11. run Frontier Visual Gate;
12. request creator acceptance.

Only after the pattern passes should remaining recipes/components be integrated.

## Promotion requirements

This proposal becomes canonical only through an explicit architecture/registry decision. Documentation, a contract test or a green build alone does not make it canonical or implemented.

The implementation draft may continue to test schemas/examples in an isolated proposal branch, but runtime work remains gated by the current active factory lane.

Deployment remains governed by the existing exact creator authorization gate.
