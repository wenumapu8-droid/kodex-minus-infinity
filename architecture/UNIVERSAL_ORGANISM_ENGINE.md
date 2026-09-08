# KODEX−∞ Universal Organism Engine

Status: `PROPOSED TECHNICAL SPECIFICATION / V0.1`

Epistemic status: `CANONICAL DIRECTION + PARTIALLY VERIFIED IMPLEMENTATION LINEAGE`

## 1. Purpose

The Universal Organism Engine translates a KODEX concept into a renderable, interactive and stateful visual organism without forcing every concept into the same effect.

It does not attempt to infer meaning automatically from an image. Meaning is authored through a node specification and a reviewed preset.

```text
CONCEPT
→ ONTOLOGY
→ PRIMARY VERB
→ SPATIAL LOGIC
→ ADAPTER
→ BEHAVIORS
→ INTERACTION
→ MEMORY
→ TRANSITION
→ FALLBACK
```

## 2. System boundary

The engine owns the organism layer only.

```text
DOM   → meaning, copy, controls, accessibility and provenance
SVG   → diagrams, glyphs, annotations, growth paths and artifacts
Canvas→ lightweight particles, drawing and low-cost procedural fallback
WebGL → depth, image fields, feedback, impossible space and GPU organisms
```

Editorial composition remains outside the WebGL runtime.

## 3. Organism families

### FIELD

Use for portals, sigils, recursive surfaces, image-driven holographic fields and radial interfaces.

Primary verbs:

- pulse;
- open;
- refract;
- recurse;
- align;
- reveal.

Preferred render modes:

- `IMAGE_FIELD`;
- `SHADER`;
- `DEPTH_STACK`.

### VORTEX

Use for signal collapse, black-hole analogues, spiral flow and descent.

Primary verbs:

- rotate;
- converge;
- absorb;
- emit;
- distort.

Preferred render modes:

- `SHADER`;
- `PARTICLES`;
- `IMAGE_FIELD`.

### ORBITAL

Use for cosmological maps, nested systems, attractors and relational hierarchies.

Primary verbs:

- orbit;
- synchronize;
- precess;
- align;
- resonate.

Preferred render modes:

- `LAYERED_PLANES`;
- `GLB`;
- `SVG`;
- `PARTICLES`.

### GROWTH

Use for seeds, roots, trees, branching memory and accretion.

Primary verbs:

- germinate;
- root;
- branch;
- accrete;
- radiate;
- regenerate.

Preferred render modes:

- `SVG`;
- `CANVAS`;
- `PARTICLES`;
- `LAYERED_PLANES`.

### SPECIMEN

Use for skulls, artifacts, relics and diagnostic observation.

Primary verbs:

- rotate;
- scan;
- isolate;
- classify;
- reveal layers.

Preferred render modes:

- `GLB`;
- `DEPTH_STACK`;
- `LAYERED_PLANES`;
- multi-view sprite sequences.

### TERRAIN

Use for floating worlds, topographic constructs, sectional systems and simulated environments.

Primary verbs:

- unfold;
- section;
- survey;
- stress;
- populate;
- reconstruct.

Preferred render modes:

- `GLB`;
- `LAYERED_PLANES`;
- `SHADER`;
- `CANVAS`.

## 4. Runtime contract

```ts
export type OrganismFamily =
  | 'FIELD'
  | 'VORTEX'
  | 'ORBITAL'
  | 'GROWTH'
  | 'SPECIMEN'
  | 'TERRAIN';

export type RenderMode =
  | 'SHADER'
  | 'IMAGE_FIELD'
  | 'DEPTH_STACK'
  | 'PARTICLES'
  | 'SVG'
  | 'GLB'
  | 'LAYERED_PLANES';

export type OrganismLifecycle =
  | 'DORMANT'
  | 'AWARE'
  | 'ENGAGED'
  | 'OPEN'
  | 'INTEGRATING'
  | 'RETURNING'
  | 'COMPLETE';

export interface OrganismRuntime {
  load(): Promise<void>;
  mount(): void;
  enter(): Promise<void> | void;
  update(frame: OrganismFrame): void;
  handle(action: OrganismAction): OrganismEffect[];
  setLifecycle(state: OrganismLifecycle): void;
  setQuality(level: QualityLevel): void;
  setMotion(mode: MotionMode): void;
  getMetrics(): OrganismMetrics;
  exit(): Promise<void> | void;
  destroy(): Promise<void> | void;
}
```

## 5. Universal node specification

Every organism preset must declare:

```yaml
id: portal-ring
family: FIELD
renderMode: IMAGE_FIELD
status: EXPERIMENTAL
concept:
  entity: PORTAL
  primaryVerb: OPEN
  spatialLogic: RADIAL_RECURSIVE
assets:
  source: /img/kodex/portal-ring.webp
  fallback: /img/kodex/portal-ring-static.avif
behaviors:
  - BREATHE
  - ROTATE
  - FEEDBACK
  - RADIAL_REVEAL
interaction:
  pointer: PARALLAX
  primaryAction: ALIGN
memory:
  writes:
    - PORTAL_ALIGNED
transition:
  enter: CONVERGE
  exit: FEEDBACK_RECURSION
accessibility:
  reducedMotion: STATIC_PULSE
  noWebGL: STATIC_IMAGE
performance:
  mobileTier: MEDIUM
  desktopTier: HIGH
```

## 6. Behavior composition

Behaviors are parameterized functions, not page-specific timelines.

Canonical behavior identifiers:

```text
BREATHE
ROTATE
PULSE
ORBIT
PRECESS
GROW
ROOT
BRANCH
REVEAL
SCAN
SHIMMER
GLITCH
PARALLAX
COLLAPSE
RADIATE
FEEDBACK
DISPLACE
DISSOLVE
REASSEMBLE
```

The adapter decides how a behavior is implemented. `ROTATE` may rotate UV coordinates in a shader, a scene group in Three.js or an SVG group.

## 7. Semantic controls

Presets expose conceptual controls instead of implementation-specific knobs when possible.

```ts
interface SemanticControls {
  signal: number;
  memory: number;
  entropy: number;
  cohesion: number;
  depth: number;
  growth: number;
  convergence: number;
  observability: number;
  transition: number;
}
```

These are synthetic artistic parameters unless bound to a measured source. They must not be presented as scientific measurements.

## 8. Interaction bus

All pointer, touch, keyboard and optional audio inputs are normalized before reaching an adapter.

```ts
interface OrganismInput {
  pointer: { x: number; y: number; active: boolean };
  primaryAction: number;
  secondaryAction: number;
  navigationAxis: { x: number; y: number };
  audio: { low: number; mid: number; high: number; active: boolean };
}
```

Passive pointer motion may affect atmosphere but must not silently commit path decisions.

## 9. Transition model

Cross-adapter transitions use render targets or semantic handoff states.

Canonical transition identifiers:

- `CONVERGE`;
- `DISSOLVE`;
- `ORBITAL_HANDOFF`;
- `GROWTH_TRANSFER`;
- `SCAN_REWRITE`;
- `FEEDBACK_RECURSION`;
- `SECTION_COLLAPSE`;
- `REASSEMBLE`.

A transition must declare whether it is:

- same-adapter;
- cross-adapter;
- DOM/SVG-mediated;
- static-fallback compatible.

## 10. Asset strategies

### Minimum image-field packet

```text
source.webp
fallback.avif
```

### Enhanced 2.5D packet

```text
source.webp
alpha.webp
height.webp
emission.webp
fallback.avif
```

### Specimen packet

One of:

```text
model.glb + poster.avif
```

or:

```text
views/000.webp ... views/015.webp + poster.avif
```

or:

```text
source.webp + depth.webp + normal.webp + poster.avif
```

### Growth packet

```text
trunk.svg
roots.svg
branches.svg
emission.webp
fallback.svg
```

## 11. Quality governor

Initial targets are hypotheses until measured.

```text
HIGH
  full DPR cap, feedback, particles, post treatment

MEDIUM
  reduced DPR, fewer passes, limited particles

LOW
  single-pass shader or lightweight Canvas/SVG

FALLBACK
  static SVG/image plus semantic controls and path consequence
```

Hard rules:

- one active WebGL organism maximum;
- pause on hidden tab;
- suspend outside active route;
- cap DPR;
- dispose textures, buffers, materials, programs and listeners;
- preserve meaning during degradation.

## 12. Adapter conformance

Every adapter must provide:

- lifecycle compliance;
- deterministic seed support where applicable;
- normalized input support;
- quality modes;
- reduced-motion behavior;
- non-WebGL fallback;
- `destroy()` disposal;
- metrics;
- source and preset identifiers.

## 13. Initial prototypes

| Prototype | Family | Mode | Status |
|---|---|---|---|
| Threshold Portal | FIELD | IMAGE_FIELD / SHADER | existing lineage, adapter extraction required |
| Signal Vortex | VORTEX | SHADER | planned |
| Cosmology Core | ORBITAL | LAYERED_PLANES | planned |
| Archive Tree | GROWTH | SVG / CANVAS | planned |
| Specimen Skull | SPECIMEN | GLB or depth sprite | asset decision required |
| Floating World | TERRAIN | GLB / LAYERED_PLANES | planned |

## 14. Definition of done for one organism

An organism is not complete until:

- the concept and primary verb are approved;
- the source asset and rights are recorded;
- the preset validates;
- the adapter mounts and destroys cleanly;
- full, reduced and fallback modes work;
- keyboard/touch equivalents exist;
- resource and frame metrics are recorded;
- the motion communicates state;
- the node writes a declared memory consequence;
- creator review is recorded.

## 15. Deployment boundary

This specification authorizes branch-level prototypes only.

```text
DEPLOYMENT STATUS: BLOCKED
REQUIRED AUTHORIZATION: APROBAR DEPLOY
```
