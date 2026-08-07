# KODEX Factory Packet Registry

This directory stores public-safe, bounded production packets that external workers can consume directly from GitHub without reconstructing project context from chat history.

## Worker startup

1. Fetch the latest `main` of `wenumapu8-droid/kodex-minus-infinity`.
2. Read `START_HERE.md`, `AGENTS.md`, and `ops/factory/README.md`.
3. Read only the assigned packet in this directory plus its declared `read_only_context`.
4. Inspect the target repository/branch before editing.
5. Do not broaden scope, redefine canon, or touch undeclared files.
6. Return the required handoff with commit/test evidence.

## Status authority

Packet files describe the production contract. Live execution status and blockers are tracked in Linear/GitHub evidence. A stale packet file never overrides newer canonical decisions or explicit supervisor review.

## Deployment

No packet in this directory authorizes production deployment. Exact authorization remains `APROBAR DEPLOY`.
