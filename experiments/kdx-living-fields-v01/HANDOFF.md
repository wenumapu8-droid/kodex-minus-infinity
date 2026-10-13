# KDX-EXP-LIVING-FIELDS-001 / Agent handoff

> EXPERIMENTAL — source archived, **not approved for merge or deployment**.

## What exists
- `index.html`: standalone, self-contained HTML/CSS/JavaScript demo.
- `embed.html`: embeddable prototype fragment.
- `shaders/KDX_Living_Fields.frag` and `.vert`: original GLSL ES 1.00 shader source.
- `README.md`: usage, provenance, interactions, and partial QA record.

## Source of truth
- ZIP backup, HTML copy, README and five test/reference images in KODEX Drive:
  https://drive.google.com/drive/folders/11qpWQ4mf2jZ4G_U3eXisT9fB-HDIYprR
- Inspiration only: https://github.com/mikepenz/HypnoticCanvas
- No third-party shaders copied into this prototype.

## Integration constraints
- Reference to THRESHOLD / ARCHIVE / COSMOLOGY, **not** new canonical route nodes.
- The existing A–M–Y topology, decisions, component registry, product code and deployment gates remain unchanged.
- No production deployment. No automatic merge. Do not replace the existing KODEX runtime.
- Do not infer user cognition, emotional state, consciousness or biology from animation parameters.
- Device testing of WebGL mobile and keyboard-equivalent interaction for the canvas are outstanding.

## Agent contract
```yaml
handoff:
  objective: "Archive Living Fields v0.1 and prepare isolated technical review"
  status: EXPERIMENTAL
  files_read:
    - AGENTS.md
    - SKILL.md
    - canon/KODEX_CANON.md
    - canon/KODEX_EPISTEMIC_STANDARD.md
    - product/CURRENT_STATE.md
    - product/EXPERIENCE_ARCHITECTURE.md
  files_changed:
    - experiments/kdx-living-fields-v01/index.html
    - experiments/kdx-living-fields-v01/embed.html
    - experiments/kdx-living-fields-v01/README.md
    - experiments/kdx-living-fields-v01/shaders/KDX_Living_Fields.frag
    - experiments/kdx-living-fields-v01/shaders/KDX_Living_Fields.vert
    - experiments/kdx-living-fields-v01/HANDOFF.md
  evidence_used:
    - "KODEX Living Fields v0.1 local source bundle and visual reference screenshots"
  decisions_made:
    - "Archive on isolated experiment branch only"
    - "No changes to canonical route graph or application runtime"
  assumptions:
    - "Ocín will choose whether to promote after creator and QA review"
  unresolved:
    - "GPU/WebGL device and mobile FPS"
    - "Keyboard-equivalent canvas actions"
    - "Visual acceptance / licensing of final public release"
  risks:
    - "Experimental source is visible in public GitHub repository"
    - "Shader performance may vary on mobile devices"
  tests_run:
    - "Original source documentation reports Chromium Canvas2D DOM tests and Mesa GLSL render checks"
    - "Live production and target-device QA not performed in this handoff"
  next_owner: "KODEX curator / frontend integrator"
  deployment_status: NOT_REQUESTED
```

## Acceptance
Creator review → visual comparison → accessibility + mobile GPU QA → source/license check → deliberate integration PR against the implementation repository → explicit deployment approval.

This package is **not** the app integration, not a new canonical scene, and not a final product release.
