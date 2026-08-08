# KODEX−∞ Visual Scaffold Protocol

Status: ACTIVE METHOD / NON-PRODUCTION
Authority: KOD-49 + KOD-53 frontier visual gate

## Purpose

Visual Scaffold is a temporary convergence method for scenes whose functional runtime is ahead of their final art-direction quality.

It exists to let the creator and frontier reviewers see the intended composition early, compare it against approved references, and progressively replace image-dependent treatments with native code without losing visual strength.

A Visual Scaffold is **not** permission to ship static image pages and is never evidence that a renderer is complete.

## Three-layer model

### 1. FUNCTIONAL BASE
Must remain real and canonical:
- navigation / route state;
- JourneyState / MemoryEvent semantics;
- explicit user actions;
- pointer, touch and keyboard parity;
- accessibility;
- responsive behavior;
- reduced-motion and fallback behavior.

### 2. VISUAL SCAFFOLD
Temporary visual target layer, derived from creator-approved references or KODEX-owned concept material.

May provide:
- composition;
- dominant-object scale;
- atmosphere;
- local light/color structure;
- image-backed organism detail;
- depth cues that native rendering has not yet matched.

Must not:
- replace semantic controls with image hotspots;
- fabricate telemetry;
- imply that a static plate is a native organism;
- copy protected/cultural reference material literally without rights/provenance approval.

### 3. LIVE NATIVE LAYERS
Real runtime layers above/through the scaffold:
- typography and copy;
- HUD / provenance UI;
- SVG / Canvas / WebGL / CSS effects;
- particles, light and masks;
- parallax and input response;
- transitions;
- semantic controls and state feedback.

Native layers progressively replace scaffold-dependent information.

## Scene maturity states

`SCAFFOLD` → `HYBRID` → `NATIVE_CANDIDATE` → `NATIVE_ACCEPTED`

- SCAFFOLD: visual target largely depends on temporary imagery.
- HYBRID: native layout/effects carry substantial composition but scaffold still contributes decisive visual information.
- NATIVE_CANDIDATE: scaffold can be removed without collapsing art direction; awaiting frontier + creator review.
- NATIVE_ACCEPTED: native implementation preserves target quality and creator has accepted it.

## Two independent progress metrics

Every scaffolded scene reports both:

### VISUAL_IMPACT
How close the scene currently feels to the approved reference-level target, independent of implementation technique.

### NATIVE_IMPLEMENTATION
How much of the visual result is produced by reusable/runtime-native code rather than the temporary scaffold.

A high VISUAL_IMPACT score with low NATIVE_IMPLEMENTATION is useful evidence but not completion.

## Review evidence

Each iteration should provide:
- openable preview URL;
- desktop capture;
- 390×844 capture;
- 412×915 capture;
- current scaffold maturity state;
- VISUAL_IMPACT estimate;
- NATIVE_IMPLEMENTATION estimate;
- frontier PASS/REWORK verdict;
- measurable delta packet.

## Delta language

Prefer measurable changes.

Good:
- increase focal organism occupation from ~35% to ~58% viewport;
- reduce peripheral HUD density by ~30%;
- move main copy 6vw left to preserve aperture dominance;
- introduce distinct foreground/midground/background depth planes;
- reduce global violet haze and concentrate bloom near the active membrane.

Bad:
- make it cooler;
- make it more cinematic;
- add more magic;
- make it look like the reference.

## Routing

Frontier models decide ambiguous visual/art-direction deltas.
Codex handles difficult renderer/integration work when code depth is the bottleneck.
OpenCode/OpenClaude handles deterministic implementation deltas and repetitive QA work.
ChatGPT Orchestrator maintains canon, routing and acceptance evidence.

## Promotion gate

`BUILD_PASS != FUNCTIONAL_PASS != FRONTIER_VISUAL_PASS != CREATOR_VISUAL_PASS`

A scaffolded scene cannot be treated as production-ready solely because it looks strong.

Public `/kodex/` replacement remains blocked until the normal release gate and exact creator phrase `APROBAR DEPLOY`.