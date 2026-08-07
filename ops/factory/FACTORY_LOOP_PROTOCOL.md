# KODEX Factory Loop Protocol v1

Related: Linear `KOD-45`.

## Purpose

Operate the current finite KODEX−∞ Vertical Slice release as a continuous, repo-native multi-agent production loop without requiring Ocín to relay prompts between connected stations.

The loop is bounded by `KOD-18 / Vertical Slice v0`. KODEX as a universe can remain open-ended; the active production release must remain finite and testable.

## Canonical loop

```text
SUPERVISOR INSPECTS EVIDENCE
          ↓
QUALITY / DEPENDENCY GATE
          ↓
DONE ──→ ROUTE NEXT READY PACKET
 │
 ├── REWORK ──→ SAME STATION / SAME OWNERSHIP
 │
 └── BLOCKED ──→ PAUSE DEPENDENT LANE ONLY
          ↓
STATION READS DISPATCH_QUEUE.yaml
          ↓
STATION READS REFERENCED PACKET
          ↓
STARTED / RUNNING HEARTBEAT
          ↓
BOUNDED EXECUTION
          ↓
COMMIT / TEST / PR / HANDOFF
          ↓
SUPERVISOR INSPECTS EVIDENCE
          ↺
```

## Normal transport

Normal task transport is repository-native:

1. sync `wenumapu8-droid/kodex-minus-infinity@main`;
2. read `START_HERE.md` and `AGENTS.md`;
3. read `ops/factory/DISPATCH_QUEUE.yaml`;
4. find exact `station_id`;
5. read only the referenced `packet_path` plus packet-required context;
6. execute only `current_packet`;
7. emit evidence;
8. stop and re-read the queue before accepting another packet.

Chat messages are bootstrap/fallback only. A worker must not require repeated copied prompts to operate normally.

## Evidence semantics

`CONNECTED` is a transport/capability state, not execution evidence.

Execution is verified only by one or more of:

- public-safe STARTED/RUNNING heartbeat;
- fresh commit on the assigned branch;
- test/CI result tied to that commit;
- PR/update tied to the current packet;
- packet-specific handoff/evidence.

No evidence means `ASSIGNED_UNKNOWN` or `UNKNOWN_STALE`, never silently `RUNNING` or `FAILED`.

## Work-in-process rule

Default WIP is one active packet per station.

A new packet may be assigned only when the prior packet is one of:

- accepted by its required quality gate;
- explicitly BLOCKED with independent downstream-safe work available;
- superseded by a supervisor decision recorded in GitHub/Linear.

Write packets must not overlap file ownership unless an explicit integration packet owns the overlap.

## Rework rule

When a gate finds defects:

- keep the same packet, branch and owner where practical;
- record concrete acceptance failures;
- do not create a parallel implementation merely to avoid repair;
- preserve already-verified work;
- require new evidence after repair.

## Dependency routing

The supervisor routes only dependency-ready work.

Current examples:

```text
KOD-26 → KOD-29 ─┐
                  ├→ KOD-30
KOD-28 → KOD-41 ─┘

KOD-38 → review → KOD-39 → review → KOD-40

KOD-36 → verified Andon transport → later live event-feed packet

KOD-42 → integration readiness evidence → integration sequencing packets
```

A blocked lane must not stop independent lanes.

## Human-authority gates

Stop and escalate rather than infer when any of these are required:

- new or changed KODEX canon;
- creator approval of unresolved coordinate assignments;
- cultural authority, permission or restricted knowledge;
- rights/licensing decision;
- materially ambiguous provenance;
- release/deployment authorization.

## Capacity blockers

Worker quota, machine availability and provider limits are `WORKER_CAPACITY` states, not code defects.

When a station is capacity-blocked:

- preserve its packet and local work ownership;
- do not duplicate/overwrite its work by default;
- continue independent lanes;
- resume from existing state when capacity returns;
- revalidate source/branch state before continuing.

## Loop completion

This loop reaches production completion for the active release only when `KOD-18` satisfies the accepted gates for:

- canonical/runtime invariants;
- source/provenance/epistemic integrity;
- visual integration;
- accessibility;
- keyboard/touch/pointer semantic equivalence;
- reduced-motion/static/no-WebGL fallbacks;
- mobile 390×844 and 412×915;
- performance/resource lifecycle;
- reproducible QA trajectories;
- Return artifact behavior;
- release audit.

Completion of those gates may move the release to `RELEASE_GATE`. It does not authorize public deployment.

```text
DEPLOYMENT STATUS: BLOCKED
REQUIRED CREATOR AUTHORIZATION: APROBAR DEPLOY
```

## Supervisor cadence

On every supervisor cycle:

1. inspect fresh GitHub commits/PR/CI and Linear heartbeats/handoffs;
2. update each station state from evidence only;
3. review anything in REVIEW/REWORK;
4. create bounded rework only when necessary;
5. close/advance packets that pass gates;
6. activate the next dependency-ready packet;
7. update the dispatch queue through a feature branch/PR, never direct main;
8. record meaningful process defects in Factory Metrics/recipe memory;
9. escalate only genuine human-authority decisions.

The goal is not maximum concurrent activity. The goal is maximum verified throughput with minimum rework and canon drift.
