# KODEX−∞ RUNTIME ARCHITECTURE

Status: `PROPOSED CANONICAL TECHNICAL ARCHITECTURE / V0.1`

## 1. Objective

Create one runtime capable of hosting KODEX's evidence, visual grammar, interaction, WebGL organisms, session memory and Return convergence without rebuilding the shell for every scene.

## 2. Repository model

Near-term:

```text
kodex-minus-infinity
  canon, schemas, registries, algorithms, reusable packages and migration targets

wenu-frontend
  current Astro implementation and deployment environment
```

Long-term target after inventory:

```text
kodex-minus-infinity/
├── apps/
│   ├── web/
│   ├── lab/
│   └── docs/
├── packages/
│   ├── core/
│   ├── experience-graph/
│   ├── evidence/
│   ├── session-memory/
│   ├── design-system/
│   ├── visualization/
│   ├── shader-runtime/
│   ├── accessibility/
│   └── export/
├── modules/
├── data/
└── research/
```

This is a target architecture, not authorization to move files destructively.

## 3. Application layers

```text
CONTENT AND EVIDENCE
        ↓
KNOWLEDGE GRAPH
        ↓
EXPERIENCE GRAPH
        ↓
SESSION ORCHESTRATOR
        ↓
SEMANTIC VISUAL PLAN
        ↓
DOM / SVG / CANVAS / WEBGL RENDERERS
        ↓
INTERACTION + MEMORY
        ↓
RETURN + EXPORT
```

## 4. Persistent shell

The shell owns:

- route and history state;
- scene mounting/unmounting;
- language;
- accessibility preferences;
- audio permission and mute state;
- session memory;
- global progress and safe exit;
- overlays;
- error and fallback behavior;
- Return convergence.

The shell must not own scene-specific visual details.

```ts
interface KodexShellState {
  route: string;
  nodeId: string;
  lifecycle: 'DORMANT' | 'AWARE' | 'ENGAGED' | 'OPEN' | 'INTEGRATING' | 'RETURNING' | 'COMPLETE';
  pathChoice?: 'OBSERVE' | 'REMEMBER' | 'CONNECT' | 'TRANSFORM' | 'CONTRIBUTE';
  motion: 'FULL' | 'REDUCED' | 'OFF';
  sound: 'ON' | 'OFF';
  quality: 'AUTO' | 'HIGH' | 'MEDIUM' | 'LOW' | 'FALLBACK';
  overlay?: 'INDEX' | 'SOURCE' | 'METHOD' | 'ACCESSIBILITY' | 'CONTRIBUTE';
}
```

## 5. Scene contract

```ts
interface KodexSceneModule {
  id: string;
  nodeId: string;
  load(ctx: SceneContext): Promise<void> | void;
  enter(ctx: SceneContext): Promise<void> | void;
  update?(frame: FrameContext): void;
  handle(action: KodexAction): SceneEffect[];
  getSemanticPassports(): SemanticPassport[];
  getMemoryWrite(): Partial<SessionMemory>;
  canExit(): boolean;
  exit(ctx: SceneContext): Promise<void> | void;
  destroy(): Promise<void> | void;
}
```

Every scene must release WebGL, audio, event listeners, observers and animation frames in `destroy()`.

## 6. Renderer responsibilities

### DOM renderer

Use for:

- text;
- controls;
- source metadata;
- legends;
- keyboard focus;
- accessible names;
- overlays;
- forms and contributions.

### SVG renderer

Use for:

- diagrams;
- glyphs;
- relation maps;
- annotations;
- path artifacts;
- vector exports;
- static/reduced-motion equivalents.

### Canvas renderer

Use for:

- lightweight particles and fields;
- transparent procedural assets;
- image exports;
- line organisms;
- fallback animation where WebGL is unnecessary.

### WebGL renderer

Use for:

- shader-native organisms;
- impossible spaces;
- multipass memory;
- depth and field deformation;
- GPU treatments;
- audio-reactive continuous transformation.

WebGL must not be used merely because it looks advanced.

## 7. Shader runtime

Canonical multipass model:

```text
SOURCE PASS
→ optional MEMORY / FEEDBACK PASS
→ TREATMENT / COMPOSITE PASS
→ SCREEN OR EXPORT
```

Common uniforms:

```glsl
uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_pointer;
uniform float u_state;
uniform float u_motionMode;
uniform float u_quality;
uniform float u_audioLow;
uniform float u_audioMid;
uniform float u_audioHigh;
uniform float u_seed;
```

Uniforms named as measurements must be derived from real values or renamed as synthetic controls.

## 8. Resource manager

```ts
interface ResourceBudget {
  maxActiveWebGLScenes: 1;
  mobileDprCap: number;
  desktopDprCap: number;
  feedbackPasses: number;
  particleBudget: number;
  frameTarget: number;
}
```

Behavior:

- pause on hidden tab;
- pause scenes outside the active route;
- use `ResizeObserver` or equivalent;
- dispose textures, framebuffers, buffers and programs;
- adapt after sustained slow frames;
- preserve semantic content during quality reduction.

## 9. Experience routing

Routes should be stable and history-aware.

Possible structure:

```text
/kodex/
/kodex/threshold/
/kodex/archive/
/kodex/heart/
/kodex/return/
/kodex/lab/<module>/
```

Hash state may remain for substate, selected record or overlay:

```text
/kodex/archive/#record=AR-012&view=relations
```

The final implementation decision must inspect existing Astro routing and deployment constraints first.

## 10. Data loading

Separate immutable project data from session state.

```text
/static canonical data
  claim ledger
  source registry
  module registry
  scene recipes
  design tokens

/runtime data
  selected corpus slice
  device capability
  user decisions
  interaction history
  optional self-report
```

Public runtime must not silently fetch private conversation exports.

## 11. Event model

Canonical event shape:

```ts
interface KodexEvent<T = unknown> {
  id: string;
  type: string;
  nodeId: string;
  role: 'REVEAL' | 'COMPARE' | 'FILTER' | 'TRACE' | 'NAVIGATE' | 'SIMULATE' | 'ANNOTATE' | 'CONTRIBUTE' | 'ORIENT';
  timestamp: number;
  payload: T;
  claimIds?: string[];
  sourceIds?: string[];
  writesToMemory: boolean;
}
```

Existing events such as `kodex:observe`, `kodex:spatial-activate`, `kodex:split-open` and `kodex:impossible-open` should be mapped into this common event model rather than discarded.

## 12. State store

Initial implementation can use a dependency-light typed store.

```ts
interface KodexStore {
  shell: KodexShellState;
  memory: SessionMemory;
  graph: ExperienceGraph;
  evidence: EvidenceIndex;
  capabilities: DeviceCapabilities;
  dispatch(event: KodexEvent): void;
  subscribe(listener: () => void): () => void;
}
```

Do not add a large state-management dependency until the current Astro architecture proves it necessary.

## 13. Persistence and privacy

Default:

- session memory lives in memory and optional `sessionStorage`;
- accessibility preferences may use `localStorage`;
- personal reflection is not persisted unless the user explicitly chooses to save it;
- contribution requires separate consent;
- no biometric information is stored by default;
- no private session data becomes analytics payload.

## 14. Fallback ladder

```text
FULL WEBGL
→ REDUCED WEBGL
→ CANVAS / SVG ANIMATION
→ STATIC SVG / IMAGE
→ TEXTUAL EXPLANATION
```

Every level preserves:

- question;
- key relation;
- source access;
- controls;
- path consequence;
- Return behavior.

## 15. Audio architecture

Audio is opt-in.

Sources:

- rights-cleared authored sound;
- microphone input with explicit permission;
- synthetic procedural signal clearly labeled;
- silence.

Audio analysis provides normalized bands, not invented semantic meaning.

```ts
interface AudioBands {
  low: number;
  mid: number;
  high: number;
  source: 'MIC' | 'AUTHORED' | 'SYNTHETIC' | 'NONE';
  active: boolean;
}
```

## 16. Export architecture

Supported future exports:

- SVG path artifact;
- transparent PNG;
- PNG sequence;
- APNG;
- WebM alpha;
- MP4 preview without alpha;
- JSON session manifest;
- source/provenance manifest.

Export must include:

```yaml
artifact:
  generated_at: ""
  software_version: ""
  path: []
  source_ids: []
  claim_ids: []
  visual_grammar: ""
  seed: ""
  rights: ""
  limitations: []
```

## 17. Testing architecture

```text
UNIT
  graph transitions
  semantic gates
  source and claim validation
  memory writes

INTEGRATION
  scene lifecycle
  event mapping
  Return convergence
  export manifests

ACCESSIBILITY
  keyboard
  focus
  reduced motion
  text alternatives

VISUAL
  mobile and desktop snapshots
  fallback snapshots
  color and overflow

PERFORMANCE
  frame-time budget
  memory disposal
  hidden-tab pause
  low-power behavior
```

## 18. Migration rule

Before moving implementation code from `wenu-frontend`:

1. record repository, branch, path and blob SHA;
2. classify status and rights;
3. map to package/module/node;
4. copy on a migration branch;
5. verify behavior;
6. retain the original until human approval.

## 19. First runtime milestone

The first runtime milestone is complete when:

- shell navigation works without page scroll;
- OBSERVE and REMEMBER produce different memory writes;
- Archive displays one real corpus with provenance;
- Heart runs natural/guided modes safely;
- Return creates a path-dependent SVG or Canvas artifact;
- fallback and reduced-motion paths are complete;
- mobile and desktop QA passes;
- no deployment occurs without approval.
