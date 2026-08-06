# KODEX−∞ IMPLEMENTATION BOOTSTRAP CHECKLIST

Status: `READY FOR AGENT EXECUTION / NO DEPLOY`

## Start condition

An implementation agent may begin only after reading:

```text
START_HERE.md
PROJECT_MANIFEST.json
docs/decisions/ADR-0006-KODEX-RUNTIME-STACK.md
ops/INTEGRATION_MATRIX.md
context/DRIVE_ASSET_AUDIT_2026-08-06.md
architecture/KODEX_INTERACTION_ENGINE.md
product/EXPERIENCE_ARCHITECTURE.md
experiences/vertical-slice-v0/
```

## Repository and branch

```text
Repository: wenumapu8-droid/wenu-frontend
Base ref: feature/kodex-depth-engine
Working branch: feature/kodex-vertical-slice-v0
```

Do not start the vertical slice from an older default branch.

## Preflight

```yaml
preflight:
  objective: Build the first complete KODEX vertical slice without deployment.
  canonical_pr: kodex-minus-infinity#2
  linear_parent: KOD-18
  implementation_repository: wenumapu8-droid/wenu-frontend
  base_ref: feature/kodex-depth-engine
  working_branch: feature/kodex-vertical-slice-v0
  exact_files_read: []
  existing_components_inspected: []
  selected_asset_ids: []
  migrations_proposed: []
  tests_planned: []
  deployment_requested: false
```

## Phase 1 — inspect before edits

- verify Git status and branch;
- inspect current KODEX route tree;
- inspect current shell, overlays and scene engine;
- inspect shader and Canvas lifecycle;
- inspect current navigation and Browser History behavior;
- inspect mobile overflow at 390×844 and 412×915;
- inspect existing GSAP, Three.js and Lenis usage;
- identify reusable code before creating replacements.

## Phase 2 — foundation

- typed scene registry;
- normalized input service;
- semantic interaction event model;
- versioned session store;
- persistent shell;
- route/history adapter;
- reduced-motion and motion-off service;
- renderer lifecycle manager;
- source/method/uncertainty overlay.

## Phase 3 — primitives

Implement and test:

```text
ProximityField
SemanticHotspot
ColorStateTransition
```

Each primitive must provide:

- pointer behavior;
- touch behavior;
- keyboard behavior;
- reduced-motion behavior;
- motion-off behavior;
- cleanup;
- semantic passport;
- fallback.

## Phase 4 — curated content

Do not use arbitrary placeholders when approved assets exist.

Required input:

```text
KOD-19 curated corpus
15 KODEX assets
10 0cin works
6 Book fragments/images
```

Until KOD-19 is complete, use only clearly labeled development fixtures and do not present them as final content.

## Phase 5 — scenes

Implement in order:

1. `−∞`;
2. `THRESHOLD`;
3. `OBSERVE / REMEMBER` divergence;
4. `ARCHIVE`;
5. `HEART`;
6. `RETURN / +∞`.

Each scene needs:

- primary question;
- one visual protagonist;
- voice/transmission entry;
- 1–3 semantic hotspots;
- linear Next;
- source access;
- state write;
- mobile composition;
- fallback composition.

## Phase 6 — audio and voice

Order of reliability:

```text
captions and text
→ prerecorded canonical audio
→ browser/system TTS fallback
→ remote TTS adapter
→ optional Oracle adapter
```

Remote provider failure must not block the route.

## Phase 7 — Return artifact

- deterministic technical seed;
- SVG or Canvas output;
- path and decision manifest;
- source list;
- limitations;
- download/export;
- re-entry options based on unseen connected relations.

Do not label the artifact as biometric, spiritual measurement or diagnosis.

## Phase 8 — THE COMMONS

Start only after personal Return works.

Local prototype first:

- mocked approved entries;
- text and vector drawing composers;
- exact preview;
- consent;
- moderation state machine;
- accessible list;
- report/withdrawal/outage behavior.

Provider selection and production data remain deferred.

## Required tests

```text
unit
schema
scene lifecycle
renderer cleanup
session serialization
Browser Back/Forward
keyboard
screen reader
reduced motion
motion off
mobile 390×844
mobile 412×915
desktop
WebGL failure
audio provider failure
source/provenance access
```

## Evidence required in PR

- implementation summary;
- files changed;
- routes exercised;
- screenshots for target viewports;
- reduced-motion evidence;
- test output;
- performance observations;
- known limitations;
- no-deploy statement.

## Stop conditions

Stop and report instead of guessing when:

- selected asset rights are unclear;
- a referenced file cannot be found;
- canon conflicts with implementation evidence;
- a dependency addition duplicates existing capability;
- fallback cannot preserve meaning;
- a remote provider becomes mandatory;
- production deployment is requested without exact authorization.
