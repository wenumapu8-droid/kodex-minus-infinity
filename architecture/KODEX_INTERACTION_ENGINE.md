# KODEX−∞ INTERACTION ENGINE

Status: `CANONICAL INTERACTION SPECIFICATION / V0.1`

## Purpose

Define how KODEX scenes move, react and reveal meaning without becoming a collection of decorative effects.

The main experience remains one active `100svh` scene at a time. The public Commons Wall is the only planned canonical exception that may use vertical scrolling.

## Core law

> Every interaction must reveal, transform, compare, trace, navigate, contribute or orient.

Cursor response, touch response, motion and color change are admitted only when they produce a visible and later-consistent consequence.

## Canonical interaction roles

```text
REVEAL       expose hidden context, source, layer or artifact
TRANSFORM    alter a declared generative rule or representation
TRACE        follow a relation, provenance path or prior memory
COMPARE      place two versions, claims or states into relation
NAVIGATE     enter another node or return to a known node
ORIENT       show position, path, controls or safe exit
ANNOTATE     create a private or reviewable note
CONTRIBUTE   release an approved message, drawing, source or correction
CONTEMPLATE  optional stillness, pulse or listening mode
```

Atmospheric response is allowed only when labeled `ATMOSPHERE` and kept subordinate to the semantic protagonist.

## Scene interaction stack

Each scene may use:

```text
1 PRIMARY INTERACTION
1–3 SECONDARY HOTSPOTS
0–2 ATMOSPHERIC RESPONSES
1 LINEAR NEXT ACTION
1 IMMEDIATE EXIT / RETURN ACTION
```

More active targets require explicit UX justification.

## Pointer and touch behaviors

### Proximity field

The central artifact senses pointer or touch proximity and changes one declared property:

- orientation;
- local deformation;
- field density;
- focus;
- reveal radius;
- semantic highlight;
- color stage.

It must not jitter directly with raw pointer input. Use normalized coordinates, damping and bounded amplitude.

### Parallax

Allowed for spatial depth and layer distinction. Large camera displacement is prohibited in reduced-motion mode.

### Attraction and repulsion

Allowed when it represents relation, boundary, avoidance, uncertainty or portal behavior. Decorative magnetic particles must remain atmospheric and limited.

### Drag deformation

Allowed for generative organisms, diagrams and code systems. Releasing the pointer must either preserve the chosen state, return intentionally or create a path consequence.

### Click / tap transformation

A click may:

- open a relation;
- recompose a form;
- change a declared palette state;
- reveal process or code;
- commit a meaningful decision;
- enter another node.

It must not trigger random spectacle without explanation.

### Cursor trail

Allowed as a temporary trace of inspection or memory. Trails must decay, support motion-off mode and never obscure controls or text.

### Color mutation

Color may change in response to:

- selected route;
- evidence class;
- node lifecycle;
- relation category;
- visitor-authored wall color;
- progression toward Return.

Color must not claim to diagnose mood, consciousness, energy or health.

## Interaction passport

Every nontrivial interaction declares:

```yaml
interaction:
  id: ""
  node_id: ""
  role: REVEAL | TRANSFORM | TRACE | COMPARE | NAVIGATE | ORIENT | ANNOTATE | CONTRIBUTE | CONTEMPLATE
  target: ""
  trigger:
    pointer: true
    touch: true
    keyboard: true
  input_fields: []
  visual_channels: []
  state_change: ""
  writes_to_memory: []
  later_consequences: []
  reduced_motion_behavior: ""
  motion_off_behavior: ""
  non_pointer_alternative: ""
  fallback: ""
  cleanup: ""
```

## Scene lifecycle

```text
DORMANT → AWARE → ENGAGED → OPEN → INTEGRATING → RETURNING → COMPLETE
```

- `DORMANT`: low-cost latent state.
- `AWARE`: acknowledges presence without committing an action.
- `ENGAGED`: direct manipulation or focused inspection.
- `OPEN`: the requested relation, source or path becomes available.
- `INTEGRATING`: writes meaningful memory and prepares the next node.
- `RETURNING`: stabilizes motion and restores orientation.
- `COMPLETE`: static or low-motion state with accessible continuation.

## Technical input normalization

```ts
interface NormalizedInput {
  pointer: { x: number; y: number; active: boolean };
  velocity: { x: number; y: number; magnitude: number };
  touch: boolean;
  keyboardFocusId?: string;
  reducedMotion: boolean;
  motionOff: boolean;
  quality: 'HIGH' | 'MEDIUM' | 'LOW' | 'FALLBACK';
}
```

Pointer coordinates are normalized to `[-1, 1]`. Scene modules consume normalized input and must not each implement incompatible pointer systems.

## Event contract

```ts
interface InteractionEvent {
  id: string;
  interactionId: string;
  nodeId: string;
  role: string;
  createdAt: number;
  semanticTarget: string;
  stateBefore: string;
  stateAfter: string;
  writesToMemory: boolean;
  sourceIds?: string[];
  claimIds?: string[];
}
```

Passive pointer movement is not stored in session memory. Only a committed reveal, transformation, route, annotation or contribution may be written.

## No-scroll scenes

The primary KODEX journey uses:

```css
height: 100svh;
overflow: hidden;
```

Long-form content opens through an accessible reader overlay or a secondary documentary route. The overlay may scroll internally and returns the visitor to the exact prior scene state.

## Menus

The shell preserves stable controls while scenes transform.

Right rail:

```text
INDEX / MAP / CURRENT PATH / VISITED / UNSEEN / NEXT / RETURN
```

Left rail:

```text
WORKS / BOOK / DOWNLOADS / COMMISSIONS / PRODUCTS / REPOSITORIES / ABOUT / ACCESSIBILITY
```

Menu activation may visually affect the scene, but the controls remain legible, predictable and keyboard accessible.

## Accessibility

Every pointer interaction requires at least one of:

- visible keyboard focus;
- tap target;
- named control;
- textual equivalent;
- static state selector.

Reduced motion:

- removes large parallax and absorption;
- freezes continuous distortion;
- preserves reveal and navigation through short fades, state changes or direct cuts.

Motion off:

- removes nonessential ambient loops;
- preserves all information and decisions.

## Performance

- only one WebGL scene remains active;
- hidden scenes stop rendering;
- pointer response should begin perceptibly within approximately 100 ms when feasible;
- mobile DPR and particle budgets are capped;
- sustained frame degradation lowers quality before removing semantic content;
- every scene releases listeners, animation frames, audio nodes, buffers and textures.

## Prohibited patterns

- cursor effects covering text or controls;
- hover-only essential actions;
- random color changes without state meaning;
- endless motion that resembles loading;
- fake scanners, biometric displays or frequencies;
- interactions that create no later consequence;
- surprise audio;
- motion used to trap attention;
- scroll-jacking in the core journey.

## First implementation target

Build three reusable interaction primitives:

1. `ProximityField` — damped pointer/touch field with SVG/Canvas fallback.
2. `SemanticHotspot` — accessible visual target that reveals or navigates.
3. `ColorStateTransition` — token-driven palette mutation tied to node state.

Integrate them into one real Threshold scene, one Archive scene and one portfolio Artifact Altar before expanding the library.
