# KODEX Factory Quality Gates v1

## Purpose

Prevent defects, ambiguity and unsupported claims from propagating downstream.

A gate is passed by evidence, not by confidence or model self-report.

## Gate S — Source admission

Required:
- stable source identity;
- source path/URL/reference;
- provenance status;
- privacy/public boundary check;
- rights/cultural sensitivity flag when relevant;
- anomaly record for malformed source data.

Failure returns to Source Intake.

## Gate G — Graph/data integrity

Required where applicable:
- schema validation;
- duplicate-ID check;
- dangling-edge check;
- unknown-enum check;
- source/claim reconciliation;
- deterministic regeneration/hash comparison.

Failure returns to Knowledge Graph/Data pipeline.

## Gate E — Epistemic/cultural integrity

Required:
- epistemic status explicit;
- evidence linked for factual claims;
- speculation/metaphor visibly separated;
- cultural attribution and authority preserved;
- authorization-required content blocked from publication;
- no silent canon expansion.

Failure returns to Canon + Epistemic Review.

## Gate R — Runtime module

Required:
- explicit input/output contract;
- deterministic behavior where specified;
- focused automated tests;
- no unexpected file changes;
- serialization/idempotency checks when stateful;
- no hidden dependency on UI/rendering for pure logic modules.

Failure returns to owning Runtime packet.

## Gate V — Visual engine

Required:
- approved visual passport;
- lifecycle/cleanup contract;
- reduced-motion/fallback behavior;
- performance assumptions explicit;
- no fictional telemetry presented as factual data;
- visual output remains attributable to KODEX rather than copying distinctive reference expression.

Failure returns to Visual Specification or Visual Engine based on root cause.

## Gate A — Accessibility

Required where relevant:
- keyboard access;
- touch parity;
- meaningful focus behavior;
- reduced-motion path;
- non-color-only semantics;
- text/nonvisual alternative for essential meaning;
- immediate exit from contemplative/immersive modes.

Failure returns to Scene Assembly or owning interaction module.

## Gate P — Performance

Required:
- build success;
- resource cleanup evidence;
- one-active-heavy-renderer rule where applicable;
- mobile constraints evaluated;
- fallback for WebGL/audio limitations;
- no performance result claimed without actual measurement.

## Gate Q — Visual/device QA

Required:
- target viewport captures or equivalent evidence;
- desktop/mobile layout review;
- known device limitations recorded;
- visual regression defects classified by owner/root cause.

## Gate I — Integration

Required:
- dependencies resolved;
- integration branch builds/tests;
- no duplicate runtime/system implementations introduced;
- upstream contracts preserved or explicit change request created;
- regression suite passes to declared scope.

## Gate L — Release audit

Required:
- current-state/changelog updated when applicable;
- build/type/lint/tests reported;
- accessibility and fallback status;
- provenance/rights/cultural review status;
- screenshots/recordings when visual;
- rollback path;
- deployment authorization status explicit.

Passing Gate L means only `RELEASE_CANDIDATE_READY`.

It never implies deployment authorization.

```text
DEPLOYMENT STATUS: BLOCKED
REQUIRED AUTHORIZATION: APROBAR DEPLOY
```
