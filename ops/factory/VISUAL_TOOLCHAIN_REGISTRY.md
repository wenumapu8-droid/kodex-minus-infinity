# KODEX−∞ Visual Engineering Toolchain Registry

Status: `PROPOSED / FACTORY-READY`
Deployment: `BLOCKED`
Owner: `ORCHESTRATOR`

## Purpose

This registry turns external visual-engineering resources into explicit KODEX factory capabilities. A discovered tool is **not** considered installed, trusted, or production-approved merely because it appears here.

KODEX production rule:

`CANON + GOLDEN REFERENCE → SPECIALIST TOOL/SKILL → BROWSER EVIDENCE → VISUAL GATE → CREATOR GATE`

No external skill may override KODEX canon, epistemic policy, provenance rules, privacy constraints, or the exact production gate `APROBAR DEPLOY`.

## Adoption classes

- `ADOPT_NOW`: strong fit; pilot in isolated branch/worktree.
- `PILOT_BOUNDED`: useful but must prove value on one scene before broad adoption.
- `REFERENCE_METHOD`: learn the workflow; do not make KODEX dependent on the vendor/service.
- `OPTIONAL`: useful for specialized cases only.

## Registry

### DESIGN.md / portable design intent

Class: `ADOPT_NOW`
Role: machine-readable visual contract for coding agents.
KODEX use: root `DESIGN.md` in `wenu-frontend`, backed by the Visual Atlas and canon. Agents must read it before visible scene work.

Rules:
- DESIGN.md carries design intent, not canon replacement.
- Golden references remain the visual source of truth for plate-led scenes.
- Do not invent missing tokens or semantic meanings.

Reference ecosystem:
- Google Stitch DESIGN.md concept/specification.
- Awesome DESIGN.md may be used only as comparative examples, not copied as KODEX identity.

### Impeccable

Source: https://github.com/pbakaus/impeccable
License: Apache-2.0
Class: `ADOPT_NOW`
Role: frontend design vocabulary, deterministic anti-pattern checks, critique/polish/audit pass.

KODEX routing:
- Primary visual-quality skill for frontend review.
- Use `critique` / `audit` before large redesigns.
- Use `polish` only after structure and golden target are locked.
- It is an auditor/steering layer, not KODEX art direction authority.

Do not:
- allow generic anti-pattern rules to erase deliberate KODEX density, asymmetry, ritual instrumentation, or plate composition;
- accept a design rewrite without golden-reference comparison.

### Taste Skill

Source: https://github.com/Leonxlnx/taste-skill
License: MIT
Class: `PILOT_BOUNDED`
Role: independent anti-slop/design review; image-to-code and redesign skills are especially relevant.

Notes:
- current default `design-taste-frontend` v2 is experimental;
- `gpt-taste` is specifically stricter for GPT/Codex workflows;
- use as a **second opinion**, not concurrently as a competing primary art director with Impeccable.

KODEX pilot:
- run after the primary build on one scene;
- record disagreements with DESIGN.md / golden target;
- retain only rules that improve fidelity without flattening KODEX identity.

### img2threejs

Source: https://github.com/img2threejs/img2threejs
License: Apache-2.0
Class: `ADOPT_NOW / PILOT FIRST`
Role: reference image → quality-gated procedural `THREE.Group` in TypeScript.

KODEX use cases:
- artifacts, machines, crystals, reliquaries, portals, organisms, symbolic objects, hard-surface structures;
- HEART only as a **parallel reconstruction experiment** while the authored plate remains the golden source.

Required workflow:
1. reference image;
2. assessment/spec/detail inventory;
3. procedural reconstruction;
4. side-by-side render comparison;
5. browser QA;
6. replace bitmap content only when the coded model reaches equal-or-better creator-approved fidelity.

Honesty constraint:
- single-image hidden geometry is inferred, never treated as verified truth.

### Playwright CLI

Source: https://playwright.dev/docs/getting-started-cli
Class: `ADOPT_NOW / REQUIRED FOR VISIBLE WORK`
Role: token-efficient browser automation for coding agents.

Factory rule:
Every agent that changes a visible page must produce browser evidence before handoff.

Minimum scene evidence:
- desktop;
- 390×844;
- 412×915;
- keyboard/touch where applicable;
- reduced motion;
- console/runtime errors;
- screenshot(s) suitable for visual comparison.

Playwright CLI complements existing Playwright CI; it does not replace deterministic repository tests.

### screenshot-to-code

Source: https://github.com/abi/screenshot-to-code
License: MIT
Class: `PILOT_BOUNDED`
Role: screenshot/mockup/Figma → initial HTML/CSS/React/Vue structure.

KODEX rule:
Use only for **first-pass structural extraction**. Generated output is never visually accepted without reference comparison and KODEX refactor.

Preferred pattern:
`SCREENSHOT → STRUCTURAL DRAFT → KODEX COMPONENTS → GOLDEN DIFF`

### GetLayers methodology

Reference: https://www.getlayers.ai/docs
Class: `REFERENCE_METHOD`
Role: learn the standalone-layer workflow for cinematic web work.

KODEX adaptation:
`GOLDEN TARGET → SELF-CONTAINED LIVE LAYER → REVIEW → PORT TO ASTRO → JOURNEYSTATE → QA`

Do not:
- depend on proprietary Layers assets/prompts for KODEX core;
- copy licensed visual work;
- port a visually weak layer into the app simply because it builds.

### PixiJS

Source: https://github.com/pixijs/pixijs
Class: `OPTIONAL / STRONG FIT`
Role: high-performance WebGL/WebGPU 2D renderer for console UI, filters, ASCII/pixel modes, sprites, masks and post effects.

KODEX target:
- KODEX OS / console shell;
- `ASCII FIELD`;
- `PIXEL RELIC`;
- CRT/noise/displacement layers;
- dense 2D scene instrumentation.

Adopt only when DOM/Canvas2D becomes a real constraint; avoid adding renderer complexity without measurable benefit.

### gltfjsx

Source: https://github.com/pmndrs/gltfjsx
Class: `OPTIONAL / ADOPT WHEN GLTF ENTERS PIPELINE`
Role: GLTF → reusable react-three-fiber JSX graph; pruning/compression workflow.

Use after a real GLTF/GLB asset exists. It is not a reason to create 3D for a scene that does not benefit from it.

### Hunyuan3D

Source: https://github.com/Tencent-Hunyuan/Hunyuan3D-2
Class: `OPTIONAL / RESEARCH-PILOT`
Role: image/text-assisted 3D generation where procedural reconstruction is not appropriate.

Requirements:
- license and model-version review before commercial use;
- provenance record for generated assets;
- mesh/material optimization before web integration;
- glTF/GLB web pipeline and device QA.

### LaplASCIIan / ASCII-SVG method

Source: https://github.com/zalo/LaplASCIIan
Class: `REFERENCE_METHOD / OPTIONAL`
Role: demonstrates lossless animated ASCII as SVG.

KODEX use:
- inform `ASCII FIELD` renderer;
- prefer a KODEX-native luminance/edge mapping implementation rather than depending on a remote service.

## Factory routing

### Claude Max / frontier station
- DESIGN.md interpretation;
- Impeccable visual critique;
- img2threejs difficult reconstruction review;
- creator-level reference comparison.

### Claude Pro / scarce secondary frontier
- architecture ambiguity;
- second-pass visual critique;
- disagreement resolution between golden reference and automated design rules.

### Codex
- implementation;
- img2threejs procedural passes;
- Playwright CLI evidence;
- bounded visual fixes.

### OpenCode / volume lane
- deterministic responsive fixes;
- test/QA deltas;
- screenshot capture and evidence packaging.

### ChatGPT Orchestrator
- source verification;
- canon/tool compatibility;
- routing;
- acceptance evidence;
- no production deployment without exact gate.

## External-tool security and reproducibility

Before an external skill enters routine factory use:

1. verify source repository and license;
2. inspect installation scripts / requested permissions;
3. pin a release, tag, or commit for reproducible use;
4. install in a bounded agent/worktree environment first;
5. never copy API keys or secrets into tool repos, prompts, screenshots, artifacts, or commits;
6. record which version produced important artifacts;
7. keep generated output reviewable and diffable;
8. external tooling never bypasses CI, frontier visual review, or creator approval.

## Immediate adoption sequence

1. Add `DESIGN.md` to `wenu-frontend`.
2. Make Playwright CLI evidence mandatory for visible page handoffs.
3. Pilot Impeccable against HEART CHAMBER without allowing it to redraw the plate.
4. Pilot img2threejs on one bounded HEART/artifact reconstruction lane.
5. Evaluate Taste Skill as independent audit after the primary visual pass.
6. Keep screenshot-to-code, PixiJS, gltfjsx, Hunyuan3D and ASCII tooling available by scene need rather than installing everything into the runtime.

## Success condition

Tool adoption succeeds only when it reduces time from:

`REFERENCE → CREATOR-APPROVED LIVE SCENE`

without reducing fidelity, performance, epistemic integrity, provenance, or maintainability.
