# KDX DESIGN INTELLIGENCE · Integration contract v0.1

Status: PROPOSED / DOCUMENTED ONLY · 2026-11-01
Owner: Ocín · Implementation target: wenumapu8-droid/wenu-frontend
Scope: isolated development and visual QA. No deployment, canon change, production mutation or tool installation is implied by this document.

## Objective

Add an inspectable agent-assisted design loop: **canon → composition → isolated prototype → browser capture → critique → human review → archival record**. AI assists with execution and review; creator approval remains authoritative.

## Authority and preflight

1. Read START_HERE.md, PROJECT_MANIFEST.json, canon/KODEX_CANON.md, relevant accepted ADRs, context/ERRATA.md, product/CURRENT_STATE.md and current implementation exact HEAD.
2. Verify active branch, upstream, dirty files, CI, dependencies and available access **before** editing. Existing CURRENT_STATE is dated 2026-08-25 and is not proof of present runtime state.
3. Respect A–Y: A origin; M optional; Y derived from trace. Seven-scenes historic design materials are references, not a replacement for ADR-0010.
4. Do not move or change protected Ocín art/source assets, graph, JourneyState, RETURN semantics, production routes, WooCommerce or credentials as part of this pilot.
5. Every proposed new creative rule is SPECULATIVE until accepted; reference and generated output are not CANONICAL.
6. No merge, publication or deployment without the exact creator approval **APROBAR DEPLOY**.

## Candidate tools (integration not yet validated)

| Tool | Proposed role | Gate |
|---|---|---|
| Figma MCP | Inspect editable frames/components/variables; optionally round-trip art-directed layouts | Confirm workspace access, license/permissions, editable output and tokens |
| Leonxlnx/taste-skill | Controlled composition critique and generation instructions | Review code, pinned revision, license, prompt injection boundary, no overriding canon |
| pbakaus/impeccable | Design-system audit and iterative UI critique | Review code, pinned revision, license, non-destructive invocation |
| Playwright | Chromium screenshots, keyboard/touch/responsive assertions and visual regression | Confirm present installation, pinned browser, CI/runtime; do not claim PASS without artifacts |
| animations.dev / Emil Kowalski | Motion study, timing and easing reference | No copied visual signatures, source attribution |

These are **candidates**; no claim that they are installed or enabled in wenu-frontend.

## Proposed pilot: KDX-DI-001 · SIGNAL_THRESHOLD

Sandbox-only route proposal: /kodex/lab/design-intelligence/signal-threshold/ (noindex). Reuse existing Astro/DOM/SVG/Canvas/Three/GSAP where actually present and verified; never import everything indiscriminately.

Timeline states: VOID → SIGNAL → FOCUS → LOCK → OPEN/CROSSING.
Each state requires explicit entry/exit criteria, deterministic duration or event triggers, a visible state/debug readout, and pause/restart/playhead controls for QA. Use fallback DOM/SVG; motion is opt-in where appropriate. Never auto-trigger sound.

Required evidence:
- desktop 1440×900, mobile 390×844 and 412×915 captures (or documented viewport substitutions);
- reduced-motion behavior and non-WebGL fallback;
- keyboard focus visible, touch controls and back/forward where relevant;
- overflow tests, screenshot diff (baseline + candidate), runtime console errors, media load errors;
- performance measurements with method and device recorded, not invented FPS;
- provenance card: source assets, author, status, model/tool, prompt version, branch, commit SHA, captured timestamp, licensing uncertainty;
- explicit human acceptance field: NOT_RUN / REFINE / ACCEPT / REJECT.

## Suggested work layout (not yet created)

```text
wenu-frontend/
  src/pages/kodex/lab/design-intelligence/signal-threshold.astro
  src/lib/kodex/design-intelligence/recipe.ts
  src/lib/kodex/design-intelligence/timeline.ts
  tests/kodex/design-intelligence.spec.ts
  docs/kodex/design-intelligence/evidence/
```

Do not assume these paths already exist. Adapt to actual repository structure after exact-HEAD inspection.

## Agent operating rule

A design critique must return:
- issue ID; screenshot/frame coordinate; affected state; observed defect;
- objective evidence, severity, reproducible steps;
- proposed minimal change plus risk and art-direction intent;
- before/after screenshot evidence and retest result;
- epistemic status VERIFIED / INFERRED / SPECULATIVE / NEEDS_CONFIRMATION.

Reject generic cyberpunk skin, arbitrary tribal motifs, invented cultural meanings, decorative glitch without state meaning, gratuitous animation and mandatory M passage.

## Acceptance gates

G0 INVENTORY: exact repo/branch SHA, current dependencies and dirty state recorded.
G1 DESIGN: canon-bound visual specification and reviewable frame.
G2 CODE: isolated route, deterministic states, no production path changes.
G3 QA: actual Playwright pass + artifact links; reduced-motion, responsive, keyboard, fallback, provenance.
G4 CURATION: human aesthetic review (not replaced by AI score).
G5 RELEASE: separate creator decision and explicit APROBAR DEPLOY.

## Next execution packet

1. Inspect exact HEAD of wenu-frontend and its active prototype branch; check packages and scripts.
2. Decide whether to vendor vetted skill text or pin external dependencies; avoid arbitrary remote install scripts.
3. Implement a minimal isolated SIGNAL_THRESHOLD route and one browser-test file.
4. Produce capture/provenance artifacts and a draft PR; **do not merge or deploy**.
5. Update CURRENT_STATE and decision log only with verified evidence.

## External references (for review, not canonical sources)

- https://developers.figma.com/docs/figma-mcp-server/
- https://github.com/Leonxlnx/taste-skill
- https://github.com/pbakaus/impeccable
- https://playwright.dev/
- https://animations.dev/
