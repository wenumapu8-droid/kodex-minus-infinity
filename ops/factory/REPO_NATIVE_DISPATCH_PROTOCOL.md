# KODEX Factory — Repo-Native Dispatch Protocol v1

## Purpose

Remove manual chat prompting from normal KODEX Factory production. Connected stations pull their assignment from the canonical repository, execute the referenced packet, and return public-safe evidence through shared control surfaces.

## Authority chain

`Drive/source evidence → normalized ingestion → canonical GitHub → Linear work packet → implementation/review evidence`

`ops/factory/DISPATCH_QUEUE.yaml` does not replace packet manifests, canon, quality gates or the Factory Router. It only tells each station which packet is current.

## Station startup

At the start of a worker session:

1. Fetch the latest `wenumapu8-droid/kodex-minus-infinity@main` without destructive reset/clean commands.
2. Read `START_HERE.md` and `AGENTS.md`.
3. Read `ops/factory/DISPATCH_QUEUE.yaml`.
4. Select the entry matching the station's configured `station_id`.
5. If `execution_status` is `PAUSED_CAPACITY`, `BLOCKED` or `IDLE`, do not start a new packet.
6. Read only the referenced `packet_path` plus the packet's declared read-only context.
7. Verify repository, branch and file ownership before writing.
8. Emit STARTED/RUNNING evidence using `ops/factory/HEARTBEAT_PROTOCOL.md`.
9. Execute the packet without broadening scope.
10. Return packet-specific handoff + commit/test/PR evidence, then re-read the queue before taking another packet.

## Polling semantics

Normal production does not require Ocín to paste prompts.

A connected station should re-read the queue:

- on session start;
- after finishing or blocking its current packet;
- after a supervisor/reviewer changes its Linear packet state;
- whenever its local runtime is configured to poll shared state.

Repository connectivity alone does not guarantee autonomous background polling. A local runtime with no watcher/poller consumes the queue when that runtime is active. The supervisor must never report it as RUNNING without fresh evidence.

## Execution evidence

Accepted:

- canonical heartbeat;
- fresh commit on the assigned branch;
- test/CI evidence tied to the packet;
- Draft PR or review handoff;
- packet-specific external evidence such as a bounded Telegram fixture result.

Not accepted as execution evidence:

- branch existence alone;
- Linear `In Progress` alone;
- creator reporting that a station is connected;
- a model claiming completion without SHA/test/handoff where required.

## Status vocabulary

- `ASSIGNED_UNKNOWN` — packet assigned, no fresh execution evidence.
- `RUNNING` — fresh evidence exists within heartbeat freshness policy.
- `REVIEW` — packet output is ready for its reviewer gate.
- `BLOCKED` — concrete blocker reported.
- `PAUSED_CAPACITY` — worker quota/capacity prevents execution; preserve work and resume in place.
- `IDLE` — no active packet.

## WIP and ownership

Default station WIP is one packet. Do not start another packet while the current packet is RUNNING, REVIEW or BLOCKED unless the ORCHESTRATOR changes the queue.

Two stations must not write the same files concurrently. Read-only reviewers may inspect active branches but must not silently modify them.

## Cross-model dialogue

Before acting, each station must distinguish prior `VERIFIED` evidence from `INFERRED`, `PROPOSED` and unresolved material. Accept verified upstream results rather than restarting the problem. Preserve disagreements and unresolved dependencies in the handoff.

## Supervisor loop

The ORCHESTRATOR:

1. inspects GitHub/Linear evidence;
2. updates the queue and work packet states;
3. routes only bounded work with non-conflicting ownership;
4. reviews output against acceptance/tests;
5. creates rework packets when needed;
6. advances the next dependency only after its upstream gate passes;
7. records process defects in Factory Metrics/recipe memory.

## Safety

Never put credentials, `.env` values, private machine paths, raw conversations, chain-of-thought or rights-unclear private assets into dispatch, heartbeat or handoff artifacts.

No queue state authorizes deployment. The only valid deployment authorization remains the creator's exact phrase `APROBAR DEPLOY`.

## Bootstrap rule

Chat messages may be used once to connect/configure a station. Once a station can read the canonical repo, task instructions move to GitHub/Linear and the agent should pull work from the queue instead of requiring repeated manual prompts.
