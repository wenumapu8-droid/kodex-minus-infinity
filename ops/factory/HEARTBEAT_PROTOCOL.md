# KODEX Factory Heartbeat Protocol v1

Purpose: make external worker execution observable without collecting private reasoning, raw prompts, credentials or visitor data.

## Required heartbeat states

Workers emit a public-safe heartbeat when they start a packet, at meaningful progress milestones, immediately when blocked, when review evidence is ready, and when stopping idle without completion.

Allowed status values:

- `STARTED`
- `RUNNING`
- `BLOCKED`
- `REVIEW`
- `IDLE`

## Heartbeat envelope

```yaml
station_id: ""
packet_id: ""
status: "STARTED|RUNNING|BLOCKED|REVIEW|IDLE"
current_step: ""
percent_estimate: null
branch: ""
latest_commit_sha: ""
last_test: ""
blocker_class: ""
needs_human_action: false
next_expected_evidence: ""
timestamp: ""
deployment_status: "NOT_REQUESTED"
```

`percent_estimate` is optional and may only be supplied by the worker itself. Supervisors must not infer completion percentages from token usage, elapsed time, branch existence or chat activity.

## Evidence semantics

- Linear `In Progress` means administratively assigned/started, not verified execution.
- Branch existence alone is not execution evidence.
- Fresh heartbeat, commit, test result or PR is execution evidence.
- No fresh evidence beyond the stale threshold becomes `UNKNOWN_STALE`, not `FAILED`.
- `BLOCKED` should include a concrete blocker class where possible.
- `REVIEW` requires evidence sufficient for the next quality gate.

## Stale thresholds

Default factory interpretation:

- less than 60 minutes since latest heartbeat/evidence: `VERIFIED_ACTIVE`
- 60–180 minutes: `STALE_WARNING`
- more than 180 minutes: `UNKNOWN_STALE`

These thresholds are operational defaults, not proof a worker process has stopped.

## Transport

V1 transport may be a Linear issue comment, GitHub PR/commit evidence, or another shared evidence surface already available to the worker.

V2 maps state changes to the Hermes Andon bus. Telegram should receive meaningful changes only, not every progress heartbeat.

Suggested mapping:

- `STARTED` / `RUNNING` → no Telegram by default unless a shift summary is requested
- `BLOCKED` → Andon `BLOCKED`
- `REVIEW` → Andon `REVIEW`
- `IDLE` with unresolved work → supervisor state change only
- stale transition → Andon only when human intervention is useful

## Privacy and safety

Heartbeats must never contain:

- chain-of-thought or hidden reasoning
- raw prompts/conversations
- credentials, tokens or `.env` content
- absolute private filesystem paths unless explicitly approved for a private transport
- visitor analytics or personal behavioral telemetry
- rights-restricted assets

Heartbeat presence never authorizes merge or deployment. Deployment remains separately locked by the canonical release policy.
