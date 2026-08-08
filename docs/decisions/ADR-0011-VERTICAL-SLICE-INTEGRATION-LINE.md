# ADR-0011 — Vertical Slice v0 is the integration line for merged runtime work

Status: `ACCEPTED`

Date: `2026-08-08`

## Decision

`feature/kodex-vertical-slice-v0` in `wenu-frontend` is the integration line on which reviewed runtime and product-assembly work is merged before any deploy. KOD-47 (Visible Assembly 01) is merged onto it as the first end-to-end product assembly.

```text
feature/kodex-vertical-slice-v0 (integration line)
├── KOD-28 kernel rework (PR #28) — payload allowlist + Heart semantics
├── KOD-29 CI base (PR #29)
├── KOD-30 runtime graph/exits safety (PR #30)
├── KOD-31 semantic → memory bridge (PR #31)
└── KOD-47 Visible Assembly 01 (PR #32) — noindex journey, Playwright QA green
```

## Reason

The factory produces packets from multiple stations; converging them on a single verified branch avoids parallel-canon drift. KOD-47 proved the corrected kernel end to end (threshold → observe/remember → archive → optional heart → return → re-entry) with a browser QA gate, so it is the assembly milestone the line should build on.

## Consequence

- Merged packets stay on `vertical-slice-v0`; nothing deploys from it.
- `main` of `wenu-frontend` is not touched.
- Draft PRs that target other bases (M1, organism-engine) remain independent labs; M1 conflict resolved by rebase (PR #14) but stays DRAFT pending creator decision.
- Deployment remains `BLOCKED` until the creator phrase `APROBAR DEPLOY` is given.

## Visual passport note

KOD-39 (DNA PASSAGE) passport is `REVIEW` (`ops/factory/passports/DNA_PASSAGE.v1.yaml`, supervisor-reviewed). The renderer PR `wenu-frontend#33` is CI green but stays DRAFT until the passport reaches `APPROVED`, preserving "no visual complexity without semantic purpose".
