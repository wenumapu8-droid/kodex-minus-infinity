# ADR-0009 — MULTIVERSE TOPOLOGY AND OPTIONAL HEART

Status: `ACCEPTED BY CREATOR / IMPLEMENTATION PENDING`  
Date: 2026-08-06

## Context

The previous diagrams and vertical-slice shorthand could be read as a single sequential journey in which `HEART` sits between exploration and `RETURN / +∞`. That interpretation contradicts the intended free-will structure.

KODEX−∞ begins from one common origin, then branches according to meaningful user decisions. The different routes are not merely pages in one corridor: they are parallel experiential worlds that share a common grammar, memory system and final convergence.

The creator's founding sketch defines:

```text
COMMON ORIGIN / −∞
→ THRESHOLD
→ EXPANDING PARALLEL PATHS
→ OPTIONAL DEPTH PORTAL / HEART / 0
→ SPECTRAL INTEGRATION
→ RETURN / +∞
```

`HEART / 0` is present beneath the entire field but is not a mandatory checkpoint.

## Decision

KODEX adopts a **multiverse topology** implemented as a directed, memory-preserving state graph.

### 1. Common origin

Every journey begins at `−∞` and crosses `THRESHOLD` with explicit accessibility, motion, sound and consent controls.

### 2. Parallel worlds

After Threshold, committed decisions may open different worlds, including but not limited to:

- `MEMORY WORLD`: Prologue, Descent, Archive, versions and traces;
- `MACHINE WORLD`: generative rules, transformations, code and simulations;
- `COSMOLOGY WORLD`: relations across time, territory, ecology, culture, technology and possible futures;
- `ARTIFACT WORLD`: works, books, visual lineages and Artifact Altars.

Worlds are semantic regions, not rigid folders. Nodes may belong to more than one world and portals may connect worlds when a meaningful relation exists.

### 3. Heart as an orthogonal depth layer

`HEART / 0` is an optional sanctuary and orientation layer reachable from multiple worlds.

It is not:

- a mandatory scene;
- a score or spiritual rank;
- a reward for passive time-on-page;
- a biometric detector;
- an accidental trap.

A Heart portal becomes available through explicit, inspectable route conditions such as:

- committing meaningful decisions in at least two semantic families;
- tracing a relation across two worlds;
- discovering and activating a repeated pulse glyph;
- completing a declared contemplative interaction.

The exact unlock rule may vary by corpus, but must be accessible, explainable and never infer psychology, diagnosis or spiritual level.

Portal visibility has three states:

```text
LATENT → RESONANT → AVAILABLE
```

- `LATENT`: a subtle visual motif exists without demanding attention;
- `RESONANT`: consistent pulse, color or sound cues reveal a relationship;
- `AVAILABLE`: an explicit keyboard-, touch- and screen-reader-accessible action appears.

Entering Heart is always voluntary. Exiting Heart restores the exact previous world, node, focus and local route anchor.

### 4. Chromatic and frequency grammar

The journey begins in `OBSIDIAN`, travels through functional spectral bands and may integrate into `OPEN WHITE` at Return.

The spectrum is a design and narrative grammar, not a scientific scale of human worth or emotion.

```text
OBSIDIAN
→ RED
→ ORANGE
→ YELLOW
→ GREEN
→ CYAN / BLUE
→ INDIGO
→ VIOLET
→ OPEN WHITE
```

A route does not need to visit every band in strict order. Each world may activate a different subset. The complete session spectrum is synthesized from committed decisions and relations at Return.

The word `frequency` may describe only:

- actual audio frequency;
- animation or pulse tempo;
- event density;
- recurrence rate;
- clearly labeled mythopoetic language.

KODEX must not present numerical emotion frequencies, consciousness scores or fabricated scientific telemetry as fact.

### 5. Common convergence

A completed journey converges semantically at `RETURN / +∞` whether or not Heart was visited.

Return must reveal:

- the route taken;
- worlds and spectral bands encountered;
- sources and unresolved relations;
- whether Heart was entered, without ranking the user;
- a path-dependent artifact;
- connected possibilities for re-entry.

Immediate exit remains available from every node and is not treated as failure.

## Topological model

```text
                             ┌── MEMORY WORLD ───────────┐
                             │                           │
−∞ → THRESHOLD ──────────────┼── MACHINE WORLD ──────────┼── RETURN / +∞
                             │                           │
                             ├── COSMOLOGY WORLD ────────┤
                             │                           │
                             └── ARTIFACT WORLD ─────────┘
                                  ╲    │    ╱
                                   ╲   │   ╱ optional portals
                                    HEART / 0
                                       │
                               return to prior anchor
```

This is not a conventional sitemap. It is the governing experience topology from which routes, scenes, URLs and state transitions are derived.

## Runtime consequences

The scene router must support:

- a graph rather than a fixed scene array;
- path-dependent exits;
- world membership and cross-world portals;
- an orthogonal Heart overlay or depth route;
- exact return anchors;
- URL and browser-history integrity;
- local, privacy-minimized session memory;
- full, reduced and motion-off representations;
- deterministic Return synthesis.

Minimum new state:

```ts
interface KodexJourneyState {
  currentNodeId: string;
  currentWorldId: string | null;
  returnAnchor: RouteAnchor | null;
  visitedNodeIds: string[];
  visitedWorldIds: string[];
  committedDecisionIds: string[];
  tracedRelationIds: string[];
  spectralBands: string[];
  heartPortalState: 'LATENT' | 'RESONANT' | 'AVAILABLE';
  heartVisited: boolean;
}
```

## Content consequences

Each node must declare:

- semantic world membership;
- spectral band and its declared meaning;
- portal conditions;
- cross-world relations;
- memory writes;
- Return contribution;
- accessibility equivalent.

## Rejected alternatives

### Mandatory Heart in the central sequence

Rejected because it removes free will and turns the sanctuary into a checkpoint.

### Completely random navigation

Rejected because it produces novelty without consequence, memory or coherent convergence.

### Fixed rainbow ladder

Rejected because it makes every route cosmetically identical and risks presenting symbolic color as a universal scientific hierarchy.

### Invisible accidental-only Heart

Rejected because a core experience must remain discoverable and accessible without requiring fine pointer control or chance.

## Implementation order

1. Update the machine-readable experience graph.
2. Update the vertical-slice route so Heart is optional.
3. Extend session memory with world, spectrum and return-anchor state.
4. Implement graph routing and exact return from Heart.
5. Prototype one path in two worlds plus one optional Heart portal.
6. Validate keyboard, touch, screen reader, reduced motion and browser history.
7. Generate Return from the actual route.

## Deployment

This decision authorizes design and implementation work only. It does not authorize production deployment. `APROBAR DEPLOY` remains required.