# KOD-41: RUNTIME REVIEW — KOD-28 JourneyState/EventTrace

Date: 2026-08-07
Reviewer: ORCHESTRATOR
Verdict: **PASS**
Deployment: **BLOCKED**

## Scope correction

The first KOD-41 draft reviewed `src/state/JourneyState.ts`, an accidental parallel implementation that was not the canonical KOD-28 runtime kernel. That surface has since been removed.

This review supersedes that draft and evaluates the canonical implementation now integrated into `feature/kodex-vertical-slice-v0`:

- `src/lib/kodex/runtime/journey-state.ts`
- `src/lib/kodex/runtime/journey-state.test.ts`

The corrected KOD-28 producer PR (#27) changed exactly those two files. Its implementation was subsequently reconciled into the current Vertical Slice line through PR #28. Integration-only CI/duplicate-cleanup changes in PR #28 are orchestration work and are not attributed to the bounded KOD-28 producer.

## Evidence reviewed

- `ops/factory/packets/KOD-28.yaml`
- `ops/factory/packets/KOD-41.yaml`
- corrected KOD-28 PR #27 changed-file surface: exactly `journey-state.ts` + colocated test
- current canonical kernel on `feature/kodex-vertical-slice-v0`
- KOD-29 graph projection and KOD-30 EdgeResolver consuming the current JourneyState contract
- reconciled KOD-28/29/30 integration PR #28
- fresh merge-candidate CI after the corrected Vertical Slice base:
  - KODEX Vertical Slice run `31231420856`: SUCCESS
  - KODEX Organism Engine CI run `31231420855`: SUCCESS
  - KODEX Effect Foundry CI run `31231420853`: SUCCESS
- Vertical Slice CI executes the JourneyState + canonical graph + EdgeResolver TypeScript unit suite before the Astro build.

## Acceptance review

1. **same event sequence deterministically reproduces state — PASS**

   `journeyReducer` is pure with respect to external effects and `replayJourney` applies the caller-provided ordered sequence by reduction. The serendipity seed is derived deterministically from trace length + event id; no random source is used.

2. **event identity prevents duplicate Browser Back/Forward memory writes — PASS**

   Before any write, the reducer checks whether `state.trace` already contains the incoming `event.id`. Replaying the same identity returns the prior state and cannot double-write memory.

3. **revisits preserve prior trace — PASS**

   `arrive` appends the coordinate to `letterTrace`, increments `visitCounts[letter]`, and preserves the prior ordered event trace.

4. **M remains optional in data model — PASS**

   Heart availability and Heart visitation are separate dimensions. `heart.portalState` may become `LATENT`, `RESONANT` or `AVAILABLE` without counting a visit. `heart.visitCount` increments only on an explicit `arrive` event whose letter is `M`. Nothing in the initial state or replay forces M.

5. **exact return anchor is restorable without UI coupling — PASS**

   `ReturnAnchor` is pure serializable data: letter, world, focus, localState and traceLength. It has no DOM/router/framework reference. `serializeJourney` and `restoreJourney` preserve the anchor structurally.

6. **persistent state excludes raw pointer/touch telemetry — PASS**

   The kernel applies `PAYLOAD_ALLOWLIST` per event kind at reducer ingress, serialization and restoration. Only semantic keys (`to`, `portalState`, `focus`, `localState`) are allowed to persist; arbitrary telemetry fields are discarded.

7. **producer stayed inside file ownership — PASS**

   Corrected KOD-28 PR #27 changed exactly the implementation file and its colocated test, matching the packet's allowed surface. No route, scene, shader, renderer, canon or deployment workflow was changed by that producer packet.

8. **interfaces are narrow enough for KOD-29/KOD-30 — PASS**

   KOD-29 canonical graph projection and KOD-30 EdgeResolver are implemented against the same JourneyState surface. The combined runtime test gate passes before the Astro build on the current integration candidate.

## Contract / canon / privacy findings

- A remains the deterministic common origin.
- M/Heart remains optional and is not a score.
- Y composition remains outside KOD-28 and is handled by the resolver layer.
- B–L and N–X receive no invented canonical meaning in JourneyState.
- No spiritual, biometric or psychological inference is encoded by the kernel.
- Persistent payloads are semantic allowlisted rather than blacklist-filtered.

## Verdict

`PASS`

KOD-28 is sufficiently deterministic, idempotent, privacy-minimized and narrow to feed graph projection and edge resolution. The earlier report based on the duplicate `src/state` implementation is **SUPERSEDED** and must not be cited as evidence.

This PASS authorizes continued **feature-branch integration only**. It does not authorize public deployment.

`DEPLOYMENT STATUS: BLOCKED`
