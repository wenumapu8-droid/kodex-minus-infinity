# KODEX−∞ Reference Motion Blueprints

Status: `EXPERIMENTAL / RESEARCH OUTPUT / M0-SAFE`

This folder extends the canonical `research/REFERENCE_EXTRACTION_PROTOCOL.md` for one narrow problem: references whose useful information is not only visual composition but **how the composition should behave in time**.

It does **not** create a new canonical engine or visual family. Runtime implementation remains gated by the active milestone and normal review.

## Canonical constraints

This work follows:

- `AGENTS.md`;
- `SKILL.md`;
- `canon/KODEX_CANON.md`;
- `canon/KODEX_EPISTEMIC_STANDARD.md`;
- `product/CURRENT_STATE.md`;
- `product/EXPERIENCE_ARCHITECTURE.md`;
- `research/REFERENCE_EXTRACTION_PROTOCOL.md`.

The current repository state explicitly warns against using animation as proof of life without memory or causal response. Therefore these blueprints are research/implementation specifications only. They may propose animation techniques, but a canonical interaction must still connect motion to state, attention, relation, memory, accessibility or declared atmosphere.

## Principle

```text
REFERENCE
→ OBSERVED VISUAL / TEMPORAL TRAITS
→ ABSTRACTED BEHAVIOR
→ KODEX SEMANTIC ROLE
→ MOTION BLUEPRINT
→ PROTOTYPE
→ VISUAL / ACCESSIBILITY QA
→ OPTIONAL ADMISSION
```

Never:

```text
REFERENCE SCREEN
→ PIXEL-FOR-PIXEL VISUAL IMITATION
```

A source reference may teach KODEX about cadence, raster character, layer independence, palette behavior, depth cues or interaction timing without contributing copied assets, marks, wording or proprietary identity.

## Evidence discipline

A screenshot supports visible observations only.

For example, a screenshot may support:

- low-resolution raster character;
- visible grid or framing;
- central-object hierarchy;
- starfield-like background;
- large display typography;
- apparent CRT / early-computer surface cues.

It does **not** prove:

- the original renderer;
- original frame rate;
- shader implementation;
- palette-cycling code;
- exact source resolution;
- original interaction behavior.

Those implementation fields must be marked `PROPOSED`, `SYNTHETIC` or `INTERPRETATION` until supported by stronger evidence such as direct capture, public documentation or technical inspection.

## Blueprint responsibilities

Each blueprint separates four things:

1. **Observed evidence** — what can actually be seen or documented.
2. **Abstracted logic** — reusable behavior that does not copy the visual identity.
3. **Proposed KODEX implementation** — technical method chosen for KODEX.
4. **Forbidden-copy boundary** — source-specific elements that must not be recreated.

## Current blueprint set

- `REFERENCE_MOTION_BLUEPRINT.schema.json` — validation schema.
- `KDX-MOTION-REF-001.yaml` — demoscene / low-resolution spatial reference.
- `KDX-MOTION-REF-002.yaml` — CRT grid / early-computer editorial reference.
- `KDX-MOTION-REF-003.yaml` — interference / optical portal reference study.
- `KDX-MOTION-REF-004.yaml` — iridescent axolotl-like bioform reference.
- `KDX-MOTION-REF-005.yaml` — human figure / toroidal field diagram reference, with explicit epistemic guardrails.
- `KDX-MOTION-REF-006.yaml` — radial taxonomy / dense relation-graph reference.
- `KDX-MOTION-REF-007.yaml` — stratigraphic layered-flow / temporal sedimentation reference.
- `KDX-MOTION-REF-008.yaml` — sonic editorial / media-layer interface reference.

## Drive classification used by this research lane

Within `03_REF — VISUAL REFERENCES`, the motion-oriented research corpus is being separated into:

```text
00_INBOX — MOTION REFERENCES
01_CLASSIFIED — MOTION FAMILIES
  01_DEMOSCENE_CRT
  02_BIOFORM_LIVING
  03_FIELD_DIAGRAMS
  04_INFORMATION_DIAGRAMS
  05_EDITORIAL_SONIC
  06_OPTICAL_INTERFERENCE
02_BLUEPRINTS — MOTION
```

This organization is provenance/production support only. Folder placement does not upgrade an asset from `REFERENCE_ONLY` to KODEX-authored material.

## Initial runtime module vocabulary

These names are proposals, not evidence about the source references:

```text
LowResBuffer
VisualFrameLimiter
PaletteCycle
PixelQuantize
CRTSurface
StarField
WaveDistortion
FeedbackBuffer
SignalPulse
PointerParallax
MotionStateController
ReducedMotionController
OrbitField
```

A blueprint may describe an additional candidate implementation primitive, but new runtime modules must still pass milestone and architecture review before entering production. The purpose of this vocabulary is to prevent every agent from inventing a one-off effect.

## Epistemic safeguards introduced by the expanded set

- A visualized human torus is treated as a symbolic/topological reference unless independent evidence supports a narrower physical claim.
- A waveform, playback progress or audio-reactive visual may represent a real audio signal only when a real playback/input source exists.
- Radial nodes, colors and densities cannot imply KODEX quantities unless mapped to admitted data.
- Stratigraphic color bands require a declared layer/state variable before they can encode information.
- Bioform animation cannot be used to imply sentience, sensing or biological measurement.

## Fidelity QA

A future prototype should be evaluated on:

- composition hierarchy;
- raster/material character;
- temporal rhythm;
- layer independence;
- color behavior;
- surface behavior;
- semantic motion role;
- mobile survival;
- reduced-motion survival;
- performance;
- copyright / identity distance;
- coherence with KODEX.

Any numerical fidelity score is a production heuristic only, not an objective aesthetic measurement.

## Admission gate

A blueprint may move from `RESEARCH` to `PROTOTYPE` only when:

- provenance is recorded;
- observed versus proposed fields are separated;
- the KODEX semantic role is explicit;
- touch/keyboard/reduced-motion behavior is defined;
- the technique does not require copying protected source identity;
- the active milestone permits implementation.

It may move to `IMPLEMENTED` or `TESTED` only with repository evidence.

## Current next action

Continue visual inspection of Drive reference families until the first `20` motion candidates have one of three outcomes:

```text
BLUEPRINT
STATIC_REFERENCE_ONLY
NO_ACTION
```

Then cluster the admitted blueprint set by reusable implementation primitives before proposing runtime code. Runtime implementation remains outside this research PR unless the M0 gate or orchestrator explicitly changes scope.
