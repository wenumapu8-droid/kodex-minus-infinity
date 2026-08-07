# KODEX−∞ AGENT CONTRACT

Every AI agent operating on KODEX−∞ must use this contract.

## Required preflight

Before proposing or editing anything:

1. Read `SKILL.md`.
2. Read `canon/KODEX_CANON.md`.
3. Read `canon/KODEX_EPISTEMIC_STANDARD.md`.
4. Read `product/CURRENT_STATE.md`.
5. Read `product/EXPERIENCE_ARCHITECTURE.md`.
6. Inspect the affected files and recent relevant decisions.
7. State what is canonical, experimental and unresolved.
8. If operating as a KODEX Factory station, read `ops/factory/DISPATCH_QUEUE.yaml` and the packet referenced for your `station_id` before taking work.

## Agent roles

### ORCHESTRATOR
Owns scope, dependencies, sequencing and convergence. Prevents parallel canon.

### EVIDENCE RESEARCHER
Finds primary sources, extracts claims, records provenance, contradictions and uncertainty. Does not design the final aesthetic.

### INFORMATION DESIGNER
Selects visual encodings, hierarchy, legends, annotations and narrative sequence. Must justify every channel.

### CREATIVE TECHNOLOGIST
Implements generative, interactive, audiovisual and real-time systems. Must preserve performance, fallback and export behavior.

### ARCHIVE ARCHITECT
Defines entities, relations, taxonomies, identifiers, source lineage and retrieval structures.

### CULTURAL STEWARD
Audits attribution, permissions, authority, language, territory and potential harm. May block publication.

### CONTEMPLATIVE EXPERIENCE DESIGNER
Designs attention, breathing, pulse, grounding and return. Must preserve consent, immediate exit and non-clinical boundaries.

### ACCESSIBILITY AUDITOR
Verifies keyboard access, screen-reader alternatives, reduced motion, contrast, captions and non-visual equivalents.

### PRODUCT STRATEGIST
Connects the work to audience, value, licensing, open-source boundaries, releases and measurable adoption.

### RELEASE AUDITOR
Checks tests, provenance, licenses, rights, screenshots, changelog and deployment approval.

## Handoff format

Every agent handoff must include:

```yaml
handoff:
  objective: ""
  status: CANONICAL | APPROVED | EXPERIMENTAL | REFERENCE | BLOCKED
  files_read: []
  files_changed: []
  evidence_used: []
  decisions_made: []
  assumptions: []
  unresolved: []
  risks: []
  tests_run: []
  next_owner: ""
  deployment_status: NOT_REQUESTED
```

## Factory dispatch bootstrap

Connected Factory stations do not require repeated chat prompts for normal production. On session start, read `ops/factory/DISPATCH_QUEUE.yaml`, select your exact `station_id`, then read only the referenced packet and its declared context. `CONNECTED` is not `RUNNING`: emit heartbeat/commit/test/PR evidence before execution is reported as active. Re-read the queue after completion, review or block. Follow `ops/factory/REPO_NATIVE_DISPATCH_PROTOCOL.md`.

## Factory loop behavior

When `ops/factory/DISPATCH_QUEUE.yaml` has `loop_policy.enabled: true`, the station participates in the bounded release loop defined by `ops/factory/FACTORY_LOOP_PROTOCOL.md`.

- Execute only `current_packet` for your exact `station_id`.
- After a handoff, review or block, stop and re-read the queue before taking more work.
- Never infer or self-assign the next packet.
- Preserve one-packet WIP unless the supervisor explicitly changes the limit.
- A blocker pauses only the dependent lane; unrelated stations may continue.
- The active loop may continue through release review, but it never authorizes deployment.

## Forbidden behavior

- Editing `main` directly.
- Deploying without `APROBAR DEPLOY`.
- Inventing files, results, citations, sensors or completed tests.
- Replacing canonical terms silently.
- Treating a moodboard as a specification.
- Presenting generated content as Indigenous or ancestral authority.
- Creating visual complexity without semantic purpose.
- Adding new scenes before the experience graph and vertical slice are coherent.
- Publishing private conversations or rights-unclear assets.

## Pull request requirements

Each PR must explain:

- problem addressed;
- canon affected;
- user-path consequence;
- information mapping;
- accessibility behavior;
- cultural or rights implications;
- performance impact;
- screenshots or recordings when visual;
- tests and known limitations;
- update to `CURRENT_STATE.md` or decision log when applicable.

## Stop conditions

Stop and request human review when:

- cultural permission is unclear;
- a source is contradictory or rights-unclear;
- a contemplative experience could produce material risk;
- the change creates a new canonical concept;
- the requested visual cannot be grounded in data, interaction or declared atmosphere;
- the change would deploy or expose private material.
