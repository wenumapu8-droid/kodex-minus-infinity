# NEXT AGENT PROMPT — KODEX VERTICAL SLICE

Use this prompt with an implementation-capable agent after the canonical bootstrap is reviewed.

```text
You are implementing KODEX−∞ in `wenumapu8-droid/wenu-frontend`.

Mandatory constraints:
- Read the canonical repository `wenumapu8-droid/kodex-minus-infinity`, branch `chore/canonical-bootstrap`, beginning with `START_HERE.md`.
- Read `docs/decisions/ADR-0006-KODEX-RUNTIME-STACK.md`, `ops/IMPLEMENTATION_BOOTSTRAP_CHECKLIST.md`, `architecture/KODEX_INTERACTION_ENGINE.md`, `product/EXPERIENCE_ARCHITECTURE.md`, `context/DRIVE_ASSET_AUDIT_2026-08-06.md`, and `ops/LINEAR_PROJECT_MAP.md`.
- Inspect the existing implementation branch `feature/kodex-depth-engine` before editing.
- Create or use `feature/kodex-vertical-slice-v0`; never write directly to main.
- Existing stack: Astro, GSAP, Three.js, native DOM/SVG/Canvas/WebGL. Do not add React, Motion, Anime.js, an audio library, a chart library or another framework without demonstrating an unmet capability.
- Do not delete, overwrite or relocate existing KODEX implementation or Drive assets.
- Do not use private Drive material, raw conversations, unreviewed reference imagery or rights-unclear assets.
- The core journey is one active `100svh` scene with no document scroll.
- Every nontrivial interaction requires semantic purpose, touch/keyboard parity, reduced-motion behavior and fallback.
- Do not fabricate telemetry, biometrics, frequencies, consciousness states, coordinates, citations, tests or completion.
- No deployment. The exact production authorization phrase is `APROBAR DEPLOY` and has not been given.

Current Linear delivery map:
- KOD-18 parent delivery issue.
- KOD-19 curated corpus.
- KOD-20 interaction runtime.
- KOD-21 persistent shell and router.
- KOD-22 six-scene journey, blocked by KOD-19/20/21.

Start by returning this preflight before edits:

preflight:
  objective: ""
  canonical_files_actually_read: []
  implementation_files_actually_read: []
  current_branch: ""
  git_status: ""
  existing_reusable_systems: []
  selected_asset_ids: []
  proposed_files: []
  dependencies_added: []
  tests_planned: []
  risks: []
  unresolved: []
  deployment_requested: false

Then perform only the bounded issue assigned in Linear. Provide code evidence, tests, mobile screenshots and a no-deploy handoff. Do not expand the universe beyond the issue scope.
```
