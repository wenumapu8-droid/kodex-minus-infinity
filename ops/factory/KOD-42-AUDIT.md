# KOD-42 — Integration Readiness Audit

Date: 2026-08-07
Mode: READ-ONLY audit of `wenumapu8-droid/wenu-frontend`
Packet: `ops/factory/packets/KOD-42.yaml`
Auditor: Orchestrator / ChatGPT

## Verdict

**NOT READY FOR A–M–Y INTEGRATION YET.**

The underlying interaction runtime and organism engine contain reusable contracts, but the current integration line has two blocking coordination defects that should be resolved before combining them:

1. **PR #3 current head has a failing CI build**, caused by the workflow not setting `ALLOW_EMPTY_PRODUCTS=true` for the intentional empty WooCommerce build path.
2. **Two independent JourneyState implementations now coexist on the PR #3 line**, with materially different schemas and semantics. KOD-41's PASS review covers `src/state/JourneyState.ts`; it does not establish that the newer `src/lib/kodex/runtime/journey-state.ts` is the canonical implementation or that both can safely coexist.

PR #4 is additionally based on an older `feature/kodex-vertical-slice-v0` commit and is now four commits behind the current PR #3 head.

No merge, rebase, code rewrite, or deployment was performed by this audit.

---

## Refs inspected

### PR #3 — KODEX interaction runtime v0 laboratory

- PR: `wenumapu8-droid/wenu-frontend#3`
- base: `feature/kodex-depth-engine`
- head: `feature/kodex-vertical-slice-v0`
- current head SHA inspected: `efbdd1a7ec0446d634a5880ef7f286b9075b7c58`
- state: open / draft
- current mergeability reported by GitHub: mergeable
- changed files inspected include interaction events, normalized input, JourneyState variants, edge resolver, canonical graph projection, tests, lab and CI workflow.

### PR #4 — Universal Organism Engine + Signal Vortex

- PR: `wenumapu8-droid/wenu-frontend#4`
- base: `feature/kodex-vertical-slice-v0`
- base SHA recorded by PR: `07027a0c47cd28abcc2ac059cdd00056c8f2c986`
- head: `feature/kodex-organism-engine-foundation`
- head SHA inspected: `b5b2e3d182aaae3085b8a7819e635fb171e7e14d`
- state: open / draft
- current mergeability reported by GitHub: **false**

The current PR #3 head is **4 commits ahead** of the PR #4 base SHA. Those four commits add the newer A–M–Y runtime work: edge resolver, canonical graph projection, `src/lib/kodex/runtime/journey-state.ts`, and the separate `src/state/JourneyState.ts` implementation plus tests.

---

## PR #3 findings — Interaction runtime / Journey runtime

### Reusable contracts

**Semantic interaction event contract is reusable.**

`src/lib/kodex/runtime/interaction-events.ts` defines a narrow semantic event payload:

- interaction/node identity;
- semantic role;
- state before/after;
- explicit `writesToMemory` flag;
- source/claim provenance arrays;
- meaningful-interaction filter.

This is preferable to persisting raw input telemetry and should remain the public semantic interaction boundary.

**Normalized input controller is reusable.**

`src/lib/kodex/runtime/normalized-input.ts`:

- normalizes pointer/touch/pen to -1..1 coordinates;
- separates continuous frame input from committed input;
- supports keyboard focus;
- respects reduced/off motion;
- provides explicit `destroy()` cleanup for its listeners and RAF.

### Blocking duplication — JourneyState

Two different JourneyState kernels exist on the same current PR #3 line:

1. `src/lib/kodex/runtime/journey-state.ts`
2. `src/state/JourneyState.ts`

They are not aliases and do not expose the same model.

The runtime version models:

- canonical letters A..Y;
- explicit event kinds (`arrive`, `commit`, `trace`, `ignore`, `heart`, `anchor`, `spectral`);
- structured `ReturnAnchor`;
- structured traced relations;
- `HeartPortalState` (`LATENT`, `RESONANT`, `AVAILABLE`);
- serialization filtering pointer-like telemetry;
- deterministic serendipity seed.

The `src/state` version models:

- generic string event types and `payload:any`;
- generic string coordinates;
- boolean Heart state (`active`, `portalOpen`);
- string return anchor;
- string relation arrays.

These are materially different contracts. Keeping both as active sources of truth would create replay, migration, serialization, and integration ambiguity.

### KOD-41 interpretation

The KOD-41 review branch currently records PASS against the 8 acceptance points for `src/state/JourneyState.ts` and its test file.

That PASS is valid for the reviewed implementation surface, but **must not be interpreted as approval of the whole current PR #3 JourneyState layer**, because the newer `src/lib/kodex/runtime/journey-state.ts` now coexists on the same branch and has not been reconciled against the KOD-41 review artifact.

### Current CI evidence

Current PR #3 head SHA `efbdd1a7...` has:

- workflow: `KODEX Vertical Slice`
- run: `31230742409`
- result: **FAILURE**
- failed step: `npm run build`

The build reaches Astro static generation and then stops because WooCommerce credentials are intentionally absent and the workflow does not set `ALLOW_EMPTY_PRODUCTS=true`.

This is a CI configuration failure, not evidence that the KODEX runtime code itself fails to compile. It still blocks a green integration gate.

The workflow also reports dependency audit output: 9 vulnerabilities (1 low, 8 high). This audit does not classify their exploitability; they should not be silently treated as resolved.

---

## PR #4 findings — Organism Engine

### Reusable contracts

`src/kodex/organism-engine/types.ts` provides a useful typed boundary for:

- organism family;
- render mode;
- lifecycle;
- quality/motion;
- semantic controls;
- assets/provenance status;
- interaction semantics;
- memory reads/writes;
- accessibility fallbacks;
- performance budgets;
- adapter/runtime lifecycle.

`BaseOrganismRuntime.ts` provides:

- one RAF loop per active runtime;
- target-FPS throttling;
- reduced-motion throttling;
- quality/motion stop gates;
- basic frame/drop metrics;
- explicit `destroyResources()` hook.

`kodex-organism-client.ts` provides a global single-active-controller mechanism. When a visible organism activates, it deactivates the prior active controller. IntersectionObserver and document visibility are used to stop offscreen/background rendering.

### Interaction contract overlap

PR #4 emits a separate `kodex:organism-action` event with a different payload shape from PR #3's canonical-looking `kodex:interaction` contract.

This should be bridged rather than allowed to become a second independent semantic event system. Organism-specific runtime input can remain internal, but committed actions should translate into the shared KODEX interaction event schema before JourneyState persistence.

### Cleanup / disposal

The OrganismController destroys runtime instances and disconnects its IntersectionObserver on Astro page swaps.

However, the recovered Threshold Portal runtime's `dispose()` currently only:

- stops its RAF;
- removes resize listener;
- removes pointermove listener.

It does **not** delete the WebGL buffer, programs/shaders, artwork texture, framebuffer textures, or framebuffer objects created by the runtime. This confirms the technical debt already described in PR #4.

Before broad integration, resource disposal should be hardened and verified by repeated mount/unmount/context-loss tests.

### Fallback behavior

PR #4 explicitly handles:

- WebGL2 unavailable → static fallback state;
- `webglcontextlost` → deactivate + fallback;
- `webglcontextrestored` → destroy and remount;
- reduced motion;
- motion off;
- background-tab suspension;
- offscreen suspension.

The conceptual fallback architecture is suitable for the integration line.

### Current CI evidence

PR #4 head SHA `b5b2e3d...` has three successful workflow runs:

- `KODEX Organism Engine CI` — run `31228048459` — SUCCESS
- `KODEX Vertical Slice` — run `31228048417` — SUCCESS
- `KODEX Effect Foundry CI` — run `31228048486` — SUCCESS

This is valid build-level evidence for that historical head. It does **not** prove that PR #4 remains green after rebasing onto the now-advanced PR #3 head.

---

## Branch / dependency map

```text
feature/kodex-depth-engine
    |
    v
PR #3: feature/kodex-vertical-slice-v0
    |  old integration point: 07027a0c...
    |  +4 commits since PR #4 base
    |  current head: efbdd1a7...
    |
    +---- PR #4: feature/kodex-organism-engine-foundation
           head: b5b2e3d...
           current GitHub mergeable: false
```

Do not integrate PR #4 into the A–M–Y line until PR #3 has one JourneyState source of truth and a green CI head.

---

## Missing validation

Still required after remediation:

- combined PR #3 + PR #4 build on the same ancestry;
- combined interaction-event → JourneyState commit path;
- browser back/forward replay against the chosen JourneyState kernel;
- one-heavy-renderer assertion with the A–M–Y runtime present;
- repeated mount/unmount resource-leak check;
- WebGL context loss/restore on the rebased integration branch;
- 390×844 and 412×915 combined-scene QA;
- reduced-motion combined-scene QA;
- representative hardware frame-cost check.

---

## Bounded follow-up micro-packets

### KOD-47 — JourneyState source-of-truth reconciliation

Read both JourneyState implementations, map acceptance criteria, select one canonical runtime contract, migrate tests/callers, and remove or explicitly deprecate the duplicate. No UI work.

### KOD-48 — Vertical Slice CI empty-product gate

Add the existing intentional `ALLOW_EMPTY_PRODUCTS=true` CI environment gate to the PR #3 workflow, rerun build, and record the new head/run evidence. No commerce behavior change.

### KOD-49 — Rebase Organism Engine onto current Vertical Slice

After KOD-47/KOD-48, update PR #4 ancestry onto the accepted current PR #3 head, resolve only integration conflicts, then rerun Organism Engine + Vertical Slice + Foundry workflows.

### KOD-50 — Semantic event bridge

Translate committed `kodex:organism-action` events into the shared `kodex:interaction` semantic contract. Do not persist continuous pointer/audio telemetry.

### KOD-51 — Threshold Portal GPU disposal hardening

Delete all created GL buffers/programs/shaders/textures/framebuffers on dispose; verify repeated mount/unmount and context-loss recovery without orphan resources.

### KOD-52 — Combined runtime integration QA

On the rebased integration branch, verify one-heavy-renderer behavior, visibility suspension, reduced motion, mobile viewports, replay/back-forward idempotency, and browser console cleanliness.

---

## Final KOD-42 status

- PR #3 refs/files inspected: VERIFIED
- PR #4 refs/files inspected: VERIFIED
- branch relationship inspected: VERIFIED
- reusable contracts identified: VERIFIED
- missing validation identified: VERIFIED
- future work decomposed: VERIFIED
- code modified in `wenu-frontend`: NO
- merge/rebase performed: NO
- deployment: BLOCKED

**KOD-42 AUDIT: COMPLETE / INTEGRATION GATE: HOLD**
