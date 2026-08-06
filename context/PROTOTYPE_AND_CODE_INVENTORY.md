# KODEX−∞ PROTOTYPE AND CODE INVENTORY

Status: `RECOVERED CONTEXT / MIGRATION PENDING`  
Snapshot: `2026-08-05`

This inventory records code and packages created or discussed across KODEX conversations. It prevents models from rebuilding known systems from memory or falsely assuming that every prototype is already integrated into production.

## Status vocabulary

- `REPOSITORY_VERIFIED` — inspected in a connected GitHub repository.
- `CONVERSATION_FILE_VERIFIED` — file content exists in conversation/library storage.
- `PACKAGE_REPORTED` — package was generated and described, but full bytes are not yet migrated here.
- `INTEGRATION_UNKNOWN` — implementation exists but production integration has not been verified.
- `MIGRATION_PENDING` — should be imported only after provenance and rights review.
- `SUPERSEDED_CANDIDATE` — likely replaced by a newer system; preserve until reviewed.

## A. Existing Astro implementation

### Repository

```yaml
repository: wenumapu8-droid/wenu-frontend
verified_branch: feature/kodex-depth-engine
role: current_implementation_source
migration_policy: additive_non_destructive
```

### Verified route

```yaml
artifact:
  id: CODE-WENU-001
  path: src/pages/kodex/index.astro
  status: REPOSITORY_VERIFIED
  role: KODEX fullscreen/deck entry and Threshold implementation
  verified_ref: feature/kodex-depth-engine
  imports:
    - src/components/KodexChrome.astro
    - src/components/KodexOverlays.astro
    - src/styles/kodex.css
    - src/styles/kodex-motion.css
    - src/components/kodex/motion/HiddenMessageBand.astro
    - src/components/kodex/motion/ParticleField.astro
    - src/components/kodex/motion/SignalWaveform.astro
    - src/components/kodex/motion/SpriteSignal.astro
    - src/components/kodex/portal/KodexPortal.astro
    - src/components/kodex/density/KodexOriginVector.astro
    - src/components/kodex/density/KodexSystemLog.astro
    - src/components/kodex/density/KodexSystemFooter.astro
    - src/components/kodex/density/KodexRegistration.astro
    - src/components/kodex/transition/KodexTransition.astro
    - src/components/kodex/debug/KodexDebug.astro
    - src/components/kodex/eje/KodexEje.astro
    - src/components/kodex/museo/KodexTira.astro
    - src/components/kodex/interludes/KodexQuietFrame.astro
  notes:
    - contains substantial production-shaped code
    - includes atmospheric archive metadata that now requires semantic classification
    - must be inventoried before migration
```

### Verified universe registry

```yaml
artifact:
  id: CODE-WENU-002
  path: src/lib/kodexUniverse.js
  status: REPOSITORY_VERIFIED
  verified_ref: feature/kodex-depth-engine
  contains:
    - ENTITY_REGISTRY
    - CLEARANCE_LEVELS
    - STATUS_REGISTRY
    - THREAT_REGISTRY
    - OPERATOR_REGISTRY
    - SCENE_UNIVERSE
    - semanticAccent
  semantic_warning:
    - frequency, threat, clearance, timestamps and checksums may be atmosphere rather than evidence
    - each field must be admitted, relabeled or removed under the epistemic standard
```

### Verified visual grammar

```yaml
artifact:
  id: CODE-WENU-003
  path: src/lib/kodex/grammar.ts
  status: REPOSITORY_VERIFIED
  verified_ref: feature/kodex-depth-engine
  thesis: REFERENCE → FORMAL DNA → GRID → RECIPE → ORIGINAL KODEX ART
  imports:
    - src/lib/kodex/grammar/kdx_scene_recipes.json
    - src/lib/kodex/grammar/kdx_motion_presets.json
    - src/lib/kodex/grammar/kdx_grid_system.json
  functions:
    - recipeFor
    - gridFor
    - motionsFor
    - motionVars
    - highPriorityCount
    - fieldParams
  scene_mapping:
    threshold: KDX_RECIPE_06
    prologue_i: KDX_RECIPE_09
    descent_ii: KDX_RECIPE_03
    archive_iii: KDX_RECIPE_02
    machine_iv: KDX_RECIPE_10
    cosmology_v: KDX_RECIPE_04
    return_vi: KDX_RECIPE_08
  valuable_rules:
    - color remains KODEX-original rather than copied from references
    - higher density slows movement
    - maximum two high-priority motions simultaneously
    - field speed, feedback and detail derive from recipe data
```

### Verified Threshold Portal scaffold

```yaml
artifact:
  id: CODE-WENU-004
  path: src/kodex/threshold-portal/README.md
  status: REPOSITORY_VERIFIED
  verified_ref: feature/kodex-depth-engine
  pipeline:
    - original KODEX artwork
    - GLSL source pass
    - feedback pass
    - composite pass
    - WebGL runtime
    - Astro scene
    - still/video fallback
  source_artwork: public/img/kodex/works/bw-06-alpha.png
  states:
    - DORMANT
    - AWARE
    - OPEN
  required_uniforms:
    - seed
    - elapsedTime
    - motionMode
    - qualityLevel
    - bass
    - pointer
    - state
  documented_state: scaffold created; integration statement may now be stale and must be reverified
```

## B. OBSERVE systems

### OBSERVE Shader Prototype

```yaml
artifact:
  id: PROTO-OBSERVE-001
  title: 04 SURVEILLANCE SIGNAL / OBSERVE
  status: CONVERSATION_FILE_VERIFIED
  components:
    - fullscreen fragment shader
    - stable HTML interface
    - CSS poster grammar
    - pointer/touch interaction
    - optional audio bands
    - reduced-motion and mobile rules
  real_time_layers:
    - orbital architecture
    - procedural eye and pupil
    - observation response
    - scanner sweep
    - signal nodes
    - CRT scanlines
    - procedural grain
  states:
    - DORMANT
    - AWARE
    - OPEN
  known_files:
    - astro/KodexObserveScene.astro
    - astro/kodex-observe-client.ts
    - astro/kodex-observe.css
    - shaders/fullscreen.vert.glsl
    - shaders/observe.frag.glsl
    - kodelife/KDX_OBSERVE_001.frag
  event: kodex:observe
  migration: MIGRATION_PENDING
```

### OBSERVE V2

```yaml
artifact:
  id: PROTO-OBSERVE-002
  title: OBSERVE V2
  status: PACKAGE_REPORTED
  known_implementation_names:
    - KodexObserveV2Scene.astro
    - KodexObserveV2Scene CSS
    - KodexObserveV2Scene TypeScript runtime
    - multipass shaders
    - kodex-micrographics.svg
    - KodexGlyph.astro
  scene_states:
    - idle
    - aware
    - locked
    - observing
  runtime_variables:
    - signalStrength
    - focus
    - anomaly
    - nodeCount
    - latency
    - checksum
    - pointer
  telemetry:
    - FPS
    - frameTime
    - droppedFrames
    - refreshEstimate
    - webglActive
    - fallbackActive
    - passCount
  debug_query: ?debug=1
  known_mobile_qa:
    - 390x844
    - 412x915
  semantic_warning:
    - generated signal, anomaly, latency and checksum values require classification
    - telemetry may remain when it reports actual runtime measurements
```

## C. Spatial Engine family

### Spatial Engine V1

```yaml
artifact:
  id: PROTO-SPATIAL-001
  title: KODEX Spatial Engine v1
  status: CONVERSATION_FILE_VERIFIED
  technology: WebGL2 fullscreen scene
  modes:
    - DUAL VANISH
    - RIPPLE FLOOR
    - SPLIT CORRIDOR
    - WRINKLED REALITY
  inputs:
    - pointer
    - touch
    - optional microphone
    - procedural audio fallback
  known_files:
    - shaders/spatial.frag.glsl
    - src/components/kodex/KodexSpatialScene.astro
    - src/components/kodex/kodex-spatial-client.ts
  event: kodex:spatial-activate
  performance_rules:
    - cap DPR
    - one active heavy WebGL canvas
    - pause hidden render loops
    - PNG/WebM fallback
    - mobile profile before feedback expansion
```

### Spatial Engine V2 — Multipass Memory Lab

```yaml
artifact:
  id: PROTO-SPATIAL-002
  title: KODEX Spatial Engine v2
  status: CONVERSATION_FILE_VERIFIED
  pipeline:
    - SOURCE PASS
    - MEMORY PASS
    - TREATMENT PASS
  modes:
    - DUAL VANISH
    - RIPPLE FLOOR
    - SPLIT CORRIDOR
    - WRINKLED REALITY
  treatments:
    - SIGNAL CLEAN
    - CRT SCAN
    - DITHER MATRIX
    - BITMAP THRESHOLD
    - THERMAL MAP
    - CHROMATIC SPLIT
    - GLITCH FRACTURE
    - PIXEL DATA STREAK
  known_files:
    - public/assets/kodex/shaders/spatial-source.frag.glsl
    - public/assets/kodex/shaders/feedback.frag.glsl
    - public/assets/kodex/shaders/post.frag.glsl
    - src/components/kodex/KodexSpatialSceneV2.astro
    - src/components/kodex/kodex-spatial-v2-client.ts
  event: kodex:spatial-activate
  performance:
    mobile_dpr_cap: 1.20
    desktop_dpr_cap: 1.65
    pause_outside_viewport: true
    one_heavy_scene: true
```

### Split Corridor standalone concept

```yaml
artifact:
  id: PROTO-SPATIAL-003
  title: KDX_SPLIT_CORRIDOR Concept 05/08
  status: CONVERSATION_FILE_VERIFIED
  technology: WebGL2 raymarching
  states:
    DORMANT: one corridor; branches superimposed
    AWARE: gradual bifurcation controlled by pointer bias
    OPEN: two incompatible routes active simultaneously
  interactions:
    - pointer route bias
    - tap/click branch pulse
    - CTA opens both paths
    - optional microphone
  known_files:
    - public/assets/kodex/shaders/fullscreen.vert.glsl
    - public/assets/kodex/shaders/split-corridor.frag.glsl
    - src/components/kodex/KodexSplitCorridor.astro
    - src/components/kodex/kodex-split-client.ts
    - src/components/kodex/kodex-split.css
    - KDX_SPLIT_CORRIDOR_001.frag
  uniforms:
    - u_branchBias
    - u_branchPulseAge
    - u_pointerVelocity
  event: kodex:split-open
```

### Additional spatial concepts

```yaml
reported_packages:
  - id: KDX_IMPOSSIBLE_STRUCTURE
    technology: WebGL2 raymarching
    states: [DORMANT, AWARE, OPEN]
    known_event: kodex:impossible-open
    known_deliverables: [shader, standalone, Astro component, KodeLife preset, README]
  - id: KDX_MIRROR_IDENTITY
    concept: dual identity / reflective organism
    known_deliverables: [WebGL2 shader, standalone, Astro, TypeScript runtime, KodeLife]
  - id: KDX_RIPPLE_FLOOR
    concept: perspective membrane and touch waves
    known_event: kodex:ripple-open
  - id: KDX_DUAL_VANISH
    concept: incompatible simultaneous vanishing systems
  - id: KDX_WRINKLED_REALITY
    concept: procedural deformation of the complete projection
status: PACKAGE_REPORTED
migration: MIGRATION_PENDING
```

## D. Impossible Forms Vol. 1

```yaml
artifact:
  id: PACK-IMPOSSIBLE-001
  title: KODEX Impossible Forms Vol. 1
  status: CONVERSATION_FILE_VERIFIED
  product_shape: sellable procedural asset pack
  count: 12
  known_outputs:
    - live web index
    - GIF previews
    - MP4 previews
    - posters
    - source/reference renderer
    - documentation
    - ZIP package
  known_archive_name: KODEX_Impossible_Forms_Vol1_SELLABLE.zip
  known_source_correction:
    actual_python_file: source/python/reference_renderer.py
    prohibited_false_path: source/python/kodex_forms.py
  forms:
    - transmutation-cube
    - mobius-weave
    - torus-knot-reactor
    - hypercube-threads
    - chrysalis-spiral
    - serpent-lattice
    - orbital-cocoon
    - fracture-crown
    - resonance-spine
    - impossible-flower
    - archive-vortex
    - mirror-organism
  migration: MIGRATION_PENDING
```

## E. Transparent Helix

```yaml
artifact:
  id: PROTO-CANVAS-001
  title: KODEX Helix Transparent
  status: PACKAGE_REPORTED
  known_archive: KODEX_Helix_Transparent.zip
  known_files:
    - index.html
    - helix.js
    - README.md
  technology: native Canvas 2D
  external_dependencies: none
  transparency:
    alpha_context: true
    frame_clear: ctx.clearRect
    body_background: transparent
    canvas_background: transparent
  configuration:
    totalFrames: 240
    turns: 3.0
    meridians: 34
    parallels: 32
    verticalSteps: 180
    baseRadius: 0.245
    heightRatio: 0.84
    perspective: 3.8
  controls:
    - pause
    - black or white lines
    - save PNG
  export_guidance:
    static: PNG
    animated_alpha_preferred: [APNG, WebM_VP9_alpha, PNG_sequence, ProRes_4444]
    avoid_for_alpha: MP4_H264
  migration: MIGRATION_PENDING
```

## F. SVG Pack V1

```yaml
artifact:
  id: PACK-SVG-001
  title: KODEX SVG Pack v1
  status: CONVERSATION_FILE_VERIFIED
  transparent_background: true
  editable: true
  original_geometric_redraws: true
  files:
    - 01-kodex-logo-kit.svg
    - 02-kodex-symbol-language.svg
    - 03-kodex-ui-buttons.svg
    - 04-kodex-navigation-progress.svg
    - 05-kodex-frames-panels.svg
    - 06-kodex-status-alerts.svg
    - 07-kodex-data-barcodes.svg
    - 08-kodex-signal-graphics.svg
    - 09-kodex-hero-motifs.svg
    - 10-kodex-textures-patterns.svg
    - kodex-sprite.svg
    - kodex-tokens.css
  symbols:
    - archive
    - eye
    - scan
    - growth
    - protection
    - serpent
    - solar-disk
    - portal
  production_note:
    - wordmark remains a functional geometric v1
    - optical refinement required before trademark or large-format manufacture
  migration: MIGRATION_PENDING
```

## G. Design System Pack V1

```yaml
artifact:
  id: PACK-DESIGN-001
  title: KODEX Design System Pack V1
  status: CONVERSATION_FILE_VERIFIED
  token_files:
    - tokens/kdx.tokens.json
    - tokens/kdx.tokens.css
    - tokens/kdx.tokens.ts
    - tokens/kdx.themes.json
    - tokens/kdx.typography.css
    - tokens/kdx.motion.css
  blueprint_files:
    - blueprints/kdx.scene-blueprints.json
    - blueprints/specs/
    - blueprints/astro/KdxSceneShell.astro
    - blueprints/astro/kdx-scene-shell.css
    - blueprints/runtime/kdx-blueprint-runtime.ts
  blueprints:
    - 00 Threshold Portal
    - 01 Observation Eye
    - 02 Descent Tunnel
    - 03 Archive Dossier
    - 04 Ritual Machine
    - 05 Cosmology Core
    - 06 Ghost Hardware
    - 07 Return Signal
  rule_split:
    DOM: meaning and accessibility
    SVG: graphic system and annotation
    WEBGL: organism, depth and feedback
  historical_color_coverage:
    dark_background: 70–85%
    neutral_structure: 10–20%
    primary_color: 5–12%
    secondary_accent: 0–4%
  historical_motion_mix:
    slow: 70%
    medium: 20%
    fast: 10%
  migration: MIGRATION_PENDING
```

## H. Visual Grammar System

```yaml
artifact:
  id: PACK-GRAMMAR-001
  title: KODEX Visual Grammar System
  status: PACKAGE_REPORTED
  contents:
    - normalized visual blocks
    - quadrant density
    - color coverage
    - typography behavior
    - geometry and texture rules
    - layered motion
    - transfer rules
    - forbidden elements
    - ten grid systems
    - twelve motion presets
  historical_similarity_limit: 0.35
  interpretation:
    - a transformation should be structurally influenced but recognizably original
    - the numeric limit was a design heuristic, not a validated perceptual metric
  migration: MIGRATION_PENDING
```

## I. Contemplative Engine material

```yaml
artifacts:
  - id: SPEC-CONTEMPLATIVE-001
    title: THE INNER THRESHOLD
    status: CONVERSATION_FILE_VERIFIED
    duration_minutes: 7
    purpose: scattered attention to contemplative observation
    sequence: [THRESHOLD, PROLOGUE, DESCENT, MACHINE, COSMOLOGY, RETURN]
    default: natural breath
    physiological_measurements: none
  - id: SPEC-CONTEMPLATIVE-002
    title: Contemplative State Design Engine
    status: CONVERSATION_FILE_VERIFIED
    tiers: [A_grounding, B_immersive_with_safeguards, C_facilitated_only]
    state_model: [BASELINE, ORIENTATION, ATTUNEMENT, ABSORPTION, OPEN, RETURN, INTEGRATION]
    prohibited_claims:
      - fake EEG
      - fake HRV
      - fake oxygen saturation
      - consciousness percentages
      - unsupported vibrational frequencies
      - biometric feedback without a sensor
      - competitive transcendence scores
```

## J. Scientific / computational thesis material

```yaml
artifact:
  id: RESEARCH-KODEX-001
  title: KODEX Tesis Holografia Cuerdas Computacion v1
  status: CONVERSATION_FILE_VERIFIED
  formats: [PDF, DOCX]
  thesis: translate AdS geometry, holography, quantum information and string-related models into computable and epistemically labeled visual instruments
  boundaries:
    - does not claim to prove the universe is a simulation
    - does not claim to solve string theory
    - separates exact result, controlled regime, numerical approximation, pedagogical model and philosophical speculation
  proposed_stack:
    - Python
    - NumPy
    - SciPy
    - Matplotlib or Plotly
    - Qiskit or QuTiP
    - tensor-network tools
    - TypeScript
    - Canvas or WebGL
    - GLSL
    - JSON and binary arrays
  architecture_rule:
    - heavy solvers produce buffers or time series
    - browser interpolates, deforms and renders
  status_note: research branch, not first product vertical slice
```

## K. Open resource matrix

```yaml
artifact:
  id: DOC-RESOURCE-001
  title: KODEX Free/Open Resource Matrix
  status: CONVERSATION_FILE_VERIFIED
  core_warning: public GitHub does not equal reusable license
  resources_considered:
    - KodeLife
    - The Book of Shaders
    - glslCanvas
    - Hydra
    - textmode.js
    - Three.js AsciiEffect
    - Moebius
    - FIGlet
    - Keijiro ShaderSketches
    - WebGL Fluid Simulation
    - TWGL.js
    - regl
    - p5.js
    - Tone.js
  rule: verify current license before copying or distributing code/assets
```

## L. Migration priorities

### Priority 0 — preserve context

- [x] record known systems and package names;
- [x] record verified repository paths;
- [ ] record source commits for every implementation file;
- [ ] recover package bytes from conversation/library storage;
- [ ] calculate hashes;
- [ ] classify rights and privacy.

### Priority 1 — canonical implementation candidates

1. visual grammar JSON/TypeScript;
2. SVG sprite and tokens;
3. Threshold Portal multipass pipeline;
4. Observe runtime and semantic rewrite;
5. Spatial Engine v2;
6. transparent procedural export system;
7. Heart Engine implementation.

### Priority 2 — commercial packs

1. Impossible Forms Vol. 1;
2. transparent helix and line-organism series;
3. visual grammar/design system pack;
4. selected shaders and scene shells;
5. documentation and license templates.

## M. Critical cautions for every model

- Do not claim all listed packages are already in GitHub.
- Do not claim a package is production-tested without actual browser/device validation.
- Do not recreate a package under a new name before checking this inventory.
- Do not overwrite `wenu-frontend` implementation while migrating.
- Do not perpetuate the false path `source/python/kodex_forms.py`; the known file is `source/python/reference_renderer.py`.
- Do not present generated archive metadata as observed facts.
- Do not copy reference aesthetics literally.
- When the user says `Siguiente`, produce a distinct new concept.
