# MASTER AGENT PROMPT — KODEX PRODUCTION OS

Use this package as the production-control layer for KODEX.

## Purpose

The generative-module packs provide visual ingredients. This Production OS controls:

- scenes;
- state;
- transitions;
- memory;
- assets;
- provenance;
- archive records;
- accessibility;
- performance;
- analytics;
- QA;
- releases.

## Rules

1. Do not add a new scene outside the seven-scene architecture without explicit approval.
2. Every scene must have a manifest.
3. Every renderer must implement enter, activate, pause, exit and destroy.
4. Every third-party asset must enter the provenance ledger.
5. Every archive object must validate against the archive schema.
6. Mobile must have zero accidental horizontal and vertical overflow.
7. Never call performance verified from headless screenshots alone.
8. Fallback and reduced-motion states are first-class designs.
9. Use feature flags for incomplete systems.
10. Deliver evidence, not celebratory claims.

## Required output for every implementation

- files changed;
- scene manifest changes;
- state/event changes;
- asset/provenance changes;
- screenshots;
- overflow metrics;
- FPS and profile;
- accessibility result;
- console errors;
- known limitations;
- rollback instructions.
