# ADR-0011 — Universal Organism Engine

Status: `PROPOSED`

Date: `2026-08-06`

Owner: `Nicolás Ortega / Ocín`

## Context

KODEX−∞ contains visual entities with fundamentally different ontologies and motion requirements: portals, vortices, orbital systems, growing organisms, observable specimens and layered terrains. A single particle simulator cannot represent all of them without flattening their meaning, while isolated one-off animations would create an unmaintainable codebase.

The existing implementation already contains a verified three-pass Threshold Portal runtime using artwork as a shader texture, multipass feedback, state coupling, performance profiles, reduced motion and a non-WebGL fallback. This establishes a usable technical lineage but does not yet provide a shared contract for other organism classes.

## Decision

Adopt a **KODEX Universal Organism Engine** based on one common runtime contract and multiple specialized renderer adapters.

The universal layer is responsible for:

- lifecycle;
- state and semantic inputs;
- resource budgets;
- quality adaptation;
- interaction normalization;
- transition composition;
- fallback selection;
- telemetry;
- provenance and preset validation.

Renderer adapters are responsible for the specific visual ontology:

1. `FIELD` — image fields, sigils, portals, recursive surfaces;
2. `VORTEX` — radial collapse, spiral flow and feedback;
3. `ORBITAL` — nested orbital systems and central attractors;
4. `GROWTH` — roots, branches, reveal propagation and accretion;
5. `SPECIMEN` — axial observation, turntables, scans and layered diagnostics;
6. `TERRAIN` — topographic systems, sectional layers and world constructs.

Supported render modes:

- `SHADER`;
- `IMAGE_FIELD`;
- `DEPTH_STACK`;
- `PARTICLES`;
- `SVG`;
- `GLB`;
- `LAYERED_PLANES`.

No renderer is considered universally superior. The node specification selects the least expensive mode that preserves the concept.

## Canonical law

> A KODEX entity is not animated for decoration. It is activated according to the nature of the concept it embodies.

Each organism must declare:

```text
ENTITY
→ PRIMARY VERB
→ SPATIAL LOGIC
→ RENDER MODE
→ INTERACTION
→ MEMORY WRITE
→ TRANSITION
→ FALLBACK
```

## Consequences

### Positive

- new nodes can be assembled from validated presets instead of custom page logic;
- existing Threshold Portal code can become the first adapter rather than being discarded;
- motion semantics remain tied to concept, interaction and memory;
- performance, reduced motion and fallback behavior become enforceable contracts;
- visual diversity does not require architectural fragmentation.

### Costs

- adapters require separate QA and performance budgets;
- some concepts need authored depth maps, multi-view sprites or GLB assets;
- universal presets cannot replace creative direction;
- transition compatibility must be documented between organism classes.

## Non-goals

This decision does not authorize:

- automatic semantic interpretation of arbitrary images;
- physically accurate simulation;
- neural 3D reconstruction in the public runtime;
- using WebGL for all visual content;
- replacing original Ocín assets with generated approximations;
- production deployment.

## Implementation sequence

1. formalize types, preset schema and family registry;
2. wrap the existing Threshold Portal as the first `FIELD` adapter;
3. implement an image-field adapter supporting feedback and polar deformation;
4. implement a procedural `VORTEX` adapter;
5. implement `ORBITAL`, `GROWTH`, `SPECIMEN` and `TERRAIN` adapters in that order after asset review;
6. add transition composition, performance telemetry and adapter conformance tests;
7. integrate only through a reviewable vertical-slice node.

## Acceptance criteria

The ADR may become `ACCEPTED` when:

- the canonical preset schema validates representative presets;
- at least two adapters run through the same lifecycle contract;
- one adapter uses source artwork and one is procedural;
- keyboard, touch, reduced-motion and static fallbacks preserve semantic equivalence;
- no more than one active WebGL organism runs at once;
- resource disposal and hidden-tab pause are verified;
- the creator approves the taxonomy and first five prototype behaviors.

## Related records

- `architecture/RUNTIME_ARCHITECTURE.md`
- `architecture/UNIVERSAL_ORGANISM_ENGINE.md`
- `design-system/KINETIC_GRAMMAR.md`
- `schemas/organism-preset.schema.json`
- `data/organism-family-registry.json`
- `product/CURRENT_STATE.md`

## Deployment boundary

```text
DEPLOYMENT STATUS: BLOCKED
REQUIRED AUTHORIZATION: APROBAR DEPLOY
```
