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

Those implementation fields must be marked `PROPOSED` until supported by stronger evidence such as direct capture, public documentation or technical inspection.

## Blueprint responsibilities

Each blueprint separates four things:

1. **Observed evidence** — what can actually be seen or documented.
2. **Abstracted logic** — reusable behavior that does not copy the visual identity.
3. **Proposed KODEX implementation** — technical method chosen for KODEX.
4. **Forbidden-copy boundary** — source-specific elements that must not be recreated.

## Files

- `REFERENCE_MOTION_BLUEPRINT.schema.json` — validation schema.
- `KDX-MOTION-REF-001.yaml` — demoscene / low-resolution spatial reference.
- `KDX-MOTION-REF-002.yaml` — CRT grid / early-computer editorial reference.

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
ReducedMotionController
```

The purpose of the vocabulary is to prevent every agent from inventing a one-off effect.

## Fidelity QA

A future prototype should be evaluated on:

- composition hierarchy;
- raster character;
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
