# KODEX Factory Operating System v1

## Purpose

KODEX Factory is the production system that converts ambiguous creative direction into finite, testable, provenance-aware software and media outputs.

It applies industrial-design principles to multi-model production:

- decomposition;
- modularity;
- design for assembly;
- standardized interfaces;
- work-in-progress limits;
- producer/reviewer separation;
- error containment;
- traceability;
- bottleneck management;
- continuous process improvement.

The factory must increase **capacity to produce**, not merely produce more artifacts.

## Production object

The basic unit is a **verified work packet**.

A packet is complete only when:

1. its scope is bounded;
2. owned files/data are explicit;
3. required evidence exists;
4. declared tests ran;
5. unexpected changes are absent or explained;
6. the handoff is complete;
7. downstream dependencies can consume the output without reconstructing hidden context.

## Complexity scale

```text
C0 — INSPECTION
Read, inventory, compare, audit, classify.
No implementation required.

C1 — ATOMIC CHANGE
One responsibility, usually 1–2 directly related files.
Examples: one parser fix, one validator, one focused test fixture.

C2 — BOUNDED MODULE
One explicit interface, usually 2–5 directly related files plus tests.
Examples: JourneyState, EdgeResolver, one visual-engine adapter.

C3 — SUBSYSTEM INTEGRATION
Combine previously validated modules and reconcile contracts.
Examples: navigation + memory, runtime + organism host.

C4 — EXPERIENCE ASSEMBLY
Runtime + visual engine + content + interaction + accessibility + fallback.

C5 — RELEASE CANDIDATE
Full QA, provenance, rights, accessibility, performance, rollback and release gate.
```

C3+ work should generally consume already-reviewed C0–C2 outputs instead of recreating them.

## Production cells

### 01 — Source Intake

Input:
- Drive originals;
- Sheets;
- documents;
- approved asset batches.

Output:
- source IDs;
- immutable snapshot/reference;
- checksum when available;
- provenance/rights flags;
- anomaly list.

Gate:
- no secrets/private material admitted to public outputs;
- source identity preserved.

### 02 — Knowledge Graph

Input:
- normalized source records.

Output:
- nodes;
- edges;
- claims;
- source registry;
- anomaly report;
- deterministic regeneration evidence.

Gate:
- duplicate IDs, dangling edges and invalid enums handled visibly.

### 03 — Canon + Epistemic Review

Input:
- candidate claims, concepts and graph records.

Output:
- explicit epistemic status;
- cultural/rights status;
- canonical diff proposal when required;
- NEEDS_CONFIRMATION queue.

Allowed epistemic statuses:
- VERIFIED;
- CANONICAL;
- INFERRED;
- SPECULATIVE;
- NEEDS_CONFIRMATION;
- DEPRECATED.

Gate:
- no symbolic/spiritual claim silently promoted to scientific fact;
- no cultural authority inferred from visual similarity;
- no new canon without creator authority.

### 04 — Runtime Kernel

Input:
- frozen runtime graph contract;
- accepted canonical invariants.

Output:
- JourneyState;
- EventTrace;
- graph projection;
- deterministic state transitions;
- consequence/persistence primitives.

Gate:
- pure logic tests pass before UI integration.

### 05 — Navigation + Memory

Input:
- runtime kernel.

Output:
- edge resolution;
- Heart portal state;
- return anchor;
- browser-history adapter;
- route signature;
- Return composer contract.

Gate:
- A/M/Y invariants preserved;
- M optional;
- Back/Forward idempotent;
- Y derived from real trace.

### 06 — Visual Specification

Input:
- approved concept plate/reference;
- semantic node question;
- current design system.

Output: visual passport containing
- semantic purpose;
- geometry;
- composition;
- palette role;
- motion semantics;
- interaction semantics;
- mobile behavior;
- reduced-motion behavior;
- fallback;
- implementation recommendation;
- provenance/copying boundaries.

Gate:
- visual complexity must have semantic purpose;
- reference structure separated from distinctive expression.

### 07 — Visual Engine

Input:
- approved visual passport.

Output:
- reusable SVG/Canvas/WebGL/shader/DOM organism or adapter;
- lifecycle contract;
- cleanup;
- fallback;
- tests/harness where appropriate.

Gate:
- one active heavy renderer constraint respected;
- no pseudo-telemetry presented as fact.

### 08 — Scene Assembly

Input:
- runtime module;
- visual engine;
- content package;
- interaction contract.

Output:
- one assembled node/scene on integration branch.

Gate:
- no scene-level reinvention of runtime or canon.

### 09 — Accessibility

Input:
- assembled scene.

Output:
- keyboard/touch equivalents;
- screen-reader semantics where applicable;
- reduced-motion behavior;
- non-color meaning;
- defects/patch packet.

### 10 — Performance

Input:
- assembled scene.

Output:
- build evidence;
- runtime/resource evidence;
- cleanup findings;
- optimization packet.

### 11 — Visual QA

Input:
- build candidate.

Output:
- desktop/mobile captures;
- layout defects;
- visual regression evidence;
- target-device limitations.

### 12 — Integration

Input:
- passed micro-PRs.

Output:
- milestone integration branch;
- reconciled dependencies;
- regression results;
- integration handoff.

Gate:
- specialist agents must not silently override upstream contracts.

### 13 — Release Audit

Input:
- integrated candidate.

Output:
- release evidence packet;
- accessibility/performance/provenance/rights gate statuses;
- rollback notes;
- deployment authorization state.

No deployment is implied by a passed release audit.

### 14 — Factory Learning

Input:
- packet timestamps;
- failures;
- blocked time;
- rework;
- model/station routing;
- reuse data;
- integration outcome.

Output:
- bottleneck report;
- recipe change proposal;
- versioned process update.

## Industrial constraints

### WIP limit

Do not maximize the number of simultaneous agents. Maximize useful parallelism.

Parallel work is allowed only when:
- dependencies are satisfied;
- file ownership does not overlap;
- downstream review capacity exists.

### Error containment

A defect returns to the station that created it.

Examples:
- incomplete visual passport → Visual Specification;
- invalid runtime contract → Runtime Kernel;
- rights uncertainty → Canon/Epistemic Review;
- resource leak → Visual Engine/Performance;
- integration regression → Integration only after producer-level defects are excluded.

### Design for assembly

Future KODEX experiences should increasingly be assembled from stable interfaces:

```text
NODE CONTRACT
+ JOURNEY RUNTIME
+ VISUAL PASSPORT
+ REUSABLE ORGANISM
+ INTERACTION ADAPTER
+ CONTENT PACKAGE
+ STANDARD QA
= UNIQUE KODEX NODE
```

The target is high creative diversity with low infrastructure reinvention.

## Continuous-improvement law

```text
OBSERVE
→ MEASURE
→ IDENTIFY CONSTRAINT
→ CHANGE ONE IMPORTANT PROCESS VARIABLE
→ RUN NEXT BATCH
→ COMPARE
→ KEEP OR REVERT
→ VERSION RECIPE
→ REPEAT
```

An infinite project horizon must never justify infinite active WIP.
