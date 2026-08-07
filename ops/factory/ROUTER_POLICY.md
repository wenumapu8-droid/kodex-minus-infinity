# KODEX Factory Router Policy v1

## Goal

Route each task to the cheapest competent production path that preserves quality, evidence and reviewability.

The router optimizes for:

1. dependency readiness;
2. file-ownership safety;
3. information sufficiency;
4. producer suitability;
5. reviewer capacity;
6. expected rework;
7. reuse potential;
8. cost/latency only after quality constraints are met.

## Step 1 — Decompose before routing

Do not route ambiguous goals directly.

Bad:

```text
Build the A–M–Y runtime.
```

Good:

```text
A–M–Y runtime
├── graph projection contract
├── JourneyState + EventTrace
├── EdgeResolver
├── Heart portal state machine
├── history/idempotency adapter
├── Return composer
└── integration lab
```

A packet should have one primary responsibility and an interface that a downstream packet can consume.

## Step 2 — Determine complexity

- C0: inspection only.
- C1: atomic change.
- C2: bounded module.
- C3: subsystem integration.
- C4: experience assembly.
- C5: release candidate.

If a packet requires simultaneous architecture invention, visual interpretation, code, content and QA, it is under-decomposed.

## Step 3 — Determine task modality

Classify one primary modality:

- DATA_INGESTION
- RESEARCH_EVIDENCE
- CANON_REVIEW
- PURE_RUNTIME_LOGIC
- UI_INTEGRATION
- VISUAL_SPEC
- VISUAL_ENGINE
- ACCESSIBILITY
- PERFORMANCE
- VISUAL_QA
- SUBSYSTEM_INTEGRATION
- RELEASE_AUDIT
- PROCESS_ANALYTICS
- NOTIFICATION

Secondary modalities may be declared but should not multiply edit scope.

## Step 4 — Select producer/reviewer pair

### DATA_INGESTION
Producer: high-volume worker or bounded coding agent.
Reviewer: research/evidence or long-context reviewer.

### RESEARCH_EVIDENCE
Producer: research/evidence agent.
Reviewer: orchestrator or domain/cultural reviewer.

### PURE_RUNTIME_LOGIC
Producer: bounded coding agent.
Reviewer: long-context architect.

### VISUAL_SPEC
Producer: multimodal visual-spec agent.
Reviewer: orchestrator against canon/design system.

### VISUAL_ENGINE
Spec: approved visual passport.
Producer: bounded/creative coding agent.
Reviewer: multimodal visual reviewer + performance gate.

### SUBSYSTEM_INTEGRATION
Producer: long-context architect.
Reviewer: independent coding agent + orchestrator.

### RELEASE_AUDIT
Producer: release auditor.
Final authority: creator/director + explicit deployment boundary.

## Step 5 — Concurrency gate

A packet may enter RUNNING only when:

- all hard dependencies are DONE or explicitly frozen;
- owned files do not overlap with another RUNNING packet;
- required source/canon snapshot is identified;
- downstream review capacity is available;
- stop conditions are explicit.

## Step 6 — Context minimization

Provide the minimum sufficient context.

A worker should receive:

- task objective;
- exact relevant canon constraints;
- exact files/interfaces to inspect;
- previous verified handoff;
- acceptance tests;
- stop conditions.

Do not force every specialist to reread the entire project corpus unless the packet requires architectural arbitration.

## Step 7 — Evidence return

Every coding packet returns at least:

```yaml
packet_id:
status:
commit_sha:
pull_request:
files_changed: []
tests_run: []
assumptions: []
unresolved: []
next_owner:
deployment_status: NOT_REQUESTED
```

No SHA/evidence means the implementation is not considered completed.

## Step 8 — Rework routing

Rework goes to the earliest station that introduced the defect.

Examples:

- parser misunderstood source columns → Source/Knowledge Graph cell;
- edge condition wrong → Runtime Kernel;
- concept art cannot be translated into motion contract → Visual Specification;
- shader leaks resources → Visual Engine;
- scene breaks mobile layout → Scene Assembly/Visual QA depending root cause;
- cultural claim unsupported → Canon/Epistemic cell.

Do not use integration as a universal repair station.

## Step 9 — Recipe learning

For repeated packet archetypes, record:

- best producer/reviewer profile;
- median cycle time;
- first-pass yield;
- common defect classes;
- minimum context set;
- effective tests;
- reusable templates/fixtures;
- recommended complexity ceiling.

Use this record to create the next recipe version.

## Anti-patterns

- multiple agents editing the same file concurrently;
- giant prompts with no file ownership;
- using expensive long-context models for mechanical C0/C1 work;
- using low-cost workers for unsupervised canon decisions;
- declaring visual success without target capture/evidence;
- starting downstream implementation before source/canon contracts are frozen;
- treating more parallel agents as automatically more throughput.
