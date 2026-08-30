# KOD-73 — Apple SHARP research benchmark

Status: `EXPERIMENTAL / RESEARCH ONLY / COMMERCIAL USE BLOCKED`

## Objective

Determine whether Apple SHARP can produce useful nearby-view 3D Gaussian Splatting representations from selected KODEX / Ocín 2D material without turning a reference, prototype, or model output into a production claim.

This experiment is subordinate to KODEX canon, provenance rules, creator review, accessibility, and the finite-release law.

## Canonical / experimental boundary

- KODEX canon is unchanged.
- SHARP is an external research tool, not a KODEX engine.
- SHARP output is `SYNTHETIC / EXPERIMENTAL` until reviewed.
- A successful `.ply` is evidence that the conversion pipeline runs; it is not evidence of creator acceptance or production fitness.
- No KODEX deployment is authorized by this experiment.

## License gate

Apple's released SHARP model checkpoint is licensed exclusively for Research Purposes. The model license excludes commercial exploitation, product development, and use in a commercial product or service.

Therefore:

```text
RESEARCH PROOF       GO
INTERNAL BENCHMARK   GO
PRODUCTION ADOPTION  HOLD
COMMERCIAL USE       BLOCKED
```

Pinned upstream commit for this experiment:

```text
apple/ml-sharp@1eaa046834b81852261262b41b0919f5c1efdd2e
```

Checkpoint identity:

```text
sharp_2572gikvuh.pt
```

## Provenance correction discovered during preflight

The previously selected Drive asset `KODEX∞ — Production Poster — Portal Organism.png` visibly contains `MODULE EXCHANGE`, `TRAINER: OLEKSANDR SIROUS`, and `moduleexchange.com` attribution. It must therefore be treated as a visual reference / rights-unclear source, not assumed to be an authored Ocín artwork.

It is removed from the first authored-art benchmark until provenance and transformation rights are explicitly resolved.

This correction is intentional evidence discipline, not a failure of the experiment.

## Phase 0 — environment smoke proof

Before exposing rights-unclear KODEX material to any external runner, prove the mechanical pipeline on a self-generated synthetic input.

The smoke proof must:

1. clone the pinned Apple SHARP commit;
2. install the upstream environment without modifying KODEX runtime dependencies;
3. generate a synthetic probe image locally on the runner;
4. run `sharp predict`;
5. produce at least one valid `.ply`;
6. record machine, Python, SHARP commit, checkpoint identity, input SHA-256, input dimensions, elapsed time, output filename, output bytes, and output SHA-256;
7. upload only the synthetic probe evidence as a temporary CI artifact;
8. never commit model weights or generated `.ply` outputs to the repository.

## Phase 1 — actual KODEX / Ocín benchmark

Run only after each source asset has an explicit provenance status.

Required first corpus shape:

1. one organic / volumetric work;
2. one geometric / structured work;
3. one collage / editorial or otherwise difficult out-of-distribution work.

For every candidate:

```yaml
asset:
  source_id: ""
  title: ""
  creator: ""
  original_path: ""
  sha256: ""
  dimensions_px: ""
  provenance_status: VERIFIED | NEEDS_CONFIRMATION
  rights_status: VERIFIED | NEEDS_CONFIRMATION
  cultural_status: ""
  allowed_transformations: []
```

Do not move or overwrite originals. Work from copies only.

## Evidence record

For every executed prediction:

```yaml
sharp_run:
  status: PASS | HOLD | FAIL
  source_id: ""
  input_sha256: ""
  input_dimensions_px: ""
  upstream_repo: apple/ml-sharp
  upstream_commit: 1eaa046834b81852261262b41b0919f5c1efdd2e
  checkpoint: sharp_2572gikvuh.pt
  checkpoint_license: RESEARCH_ONLY
  host_os: ""
  architecture: ""
  python: ""
  torch: ""
  device: ""
  inference_elapsed_seconds: null
  output_ply: ""
  output_bytes: null
  output_sha256: ""
  raw_visual_review: PENDING
  creator_review: PENDING
  production_status: BLOCKED
```

## Raw visual gate

A `.ply` can advance only when the raw volume is inspected before KODEX shaders, bloom, glitch, grain, CRT, or other surface treatment.

For nearby views, record:

- center;
- small left/right translation;
- small up/down translation;
- silhouette stability;
- focal hierarchy preservation;
- tearing / floaters / holes;
- text-plane collapse when typography is present;
- useful camera envelope before artifacts dominate.

Do not hide reconstruction defects with post-processing.

## Browser proof gate

Only after raw SHARP output is useful:

- test a bounded 3DGS viewer;
- desktop evidence;
- 390×844 evidence;
- 412×915 evidence;
- reduced-motion / static fallback;
- load time and FPS;
- no parallel navigation or state engine;
- no model weights in the browser bundle.

A future wrapper may be named `KodexSplatViewport`, but the name is not canonical until implemented and reviewed.

## Acceptance

KOD-73 can be considered experimentally useful when:

1. the synthetic smoke proof produces a valid `.ply` or a documented technical blocker;
2. three rights-cleared KODEX / Ocín inputs are later processed or explicitly blocked by provenance;
3. at least two of the three real benchmark inputs preserve authored focal hierarchy and silhouette across a small nearby-view envelope;
4. evidence is stored separately from interpretation;
5. creator review is recorded;
6. commercial deployment remains blocked unless the model/license situation changes.

## Handoff

```yaml
handoff:
  objective: "Prove SHARP mechanically, then benchmark rights-cleared KODEX / Ocín assets."
  status: EXPERIMENTAL
  files_read:
    - AGENTS.md
    - SKILL.md
    - canon/KODEX_CANON.md
    - canon/KODEX_EPISTEMIC_STANDARD.md
    - product/CURRENT_STATE.md
    - product/EXPERIENCE_ARCHITECTURE.md
  files_changed:
    - research/KOD-73_SHARP_BENCHMARK.md
    - scripts/research/kod73_generate_probe.py
    - .github/workflows/kod-73-sharp-smoke.yml
  evidence_used:
    - "Apple ml-sharp README"
    - "Apple LICENSE_MODEL"
    - "Drive visual inspection of Portal Organism"
  decisions_made:
    - "Portal Organism removed from authored benchmark pending provenance"
    - "Synthetic CI smoke proof precedes rights-cleared art benchmark"
  assumptions: []
  unresolved:
    - "Which three creator-authored assets are cleared for transformation"
    - "Whether GitHub-hosted runner has enough memory/time for CPU/MPS inference"
  risks:
    - "Research-only model license"
    - "Out-of-distribution failure on graphic/editorial artwork"
    - "Large model memory footprint"
  tests_run:
    - "Local source asset dimensions + SHA-256 only; no SHARP inference in local sandbox because external dependencies/network are unavailable"
  next_owner: "KOD-73 research runner"
  deployment_status: NOT_REQUESTED
```
