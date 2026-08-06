# ADR-0009 — MULTIVERSE TOPOLOGY, EMERGENT PATHS AND OPTIONAL HEART

Status: `ACCEPTED BY CREATOR / IMPLEMENTATION PENDING`  
Date: 2026-08-06

## Context

KODEX−∞ must not be interpreted as a linear sequence, a small set of authored routes or a website with two alternative corridors.

The visitor shares one origin with every other visitor, but the journey is progressively composed through interaction. Clicks, pauses, selections, discoveries, ignored signals, revisits and traced relations alter what becomes available later.

A path is therefore not chosen once from a menu. It **emerges continuously** from the participant's actions inside a field of possible relations.

The creator's founding topology is:

```text
COMMON ORIGIN / −∞
→ THRESHOLD
→ EXPANDING INTERACTION FIELD
→ MANY POSSIBLE TRAJECTORIES
→ OPTIONAL DEPTH PORTALS / HEART / 0
→ ROUTE-SPECIFIC CONVERGENCE
→ RETURN / +∞
```

`HEART / 0` exists beneath the full field but is not a mandatory checkpoint.

## Decision

KODEX adopts a **directed, memory-preserving multiverse graph with emergent trajectories**.

## 1. Common origin

Every journey begins at `−∞` and crosses one shared `THRESHOLD` with explicit accessibility, motion, sound and consent controls.

The shared entrance does not prescribe the route. It establishes the initial conditions from which interaction begins.

## 2. Interaction field rather than fixed routes

After Threshold, the visitor enters a graph of nodes, relations, signals and portals.

The system must not present only:

```text
PATH A
or
PATH B
```

Instead, it provides multiple meaningful possibilities at successive moments. Each committed interaction may alter:

- visible and latent nodes;
- relation strength;
- world affinity;
- spectral state;
- available exits;
- memory echoes;
- Heart resonance;
- Return composition.

The path is the ordered trace produced by these interactions.

```text
PATH = ACTIONS + ENCOUNTERS + RELATIONS + CONSEQUENCES + CHANCE WITHIN RULES
```

KODEX uses **bounded serendipity**. Unexpected encounters may appear, but they must be selected from real semantic relations and must never be arbitrary engagement bait.

## 3. Parallel semantic worlds

The initial world grammar includes:

- `MEMORY WORLD`: Prologue, Descent, Archive, versions and traces;
- `MACHINE WORLD`: generative rules, transformations, code and simulations;
- `COSMOLOGY WORLD`: relations across time, territory, ecology, culture, technology and possible futures;
- `ARTIFACT WORLD`: works, books, visual lineages and Artifact Altars.

Worlds are semantic regions, not rigid folders or exclusive routes. A node may belong to several worlds. A visitor may move repeatedly between worlds, remain within one for a long period or reach Return after a shorter trajectory.

Cross-world movement requires a declared relation, not a generic navigation link.

## 4. Consequence law

Every important interaction must answer:

```text
WHAT DID THE USER COMMIT?
WHAT STATE CHANGED NOW?
WHAT POSSIBILITY CHANGED LATER?
WHAT MEMORY WAS WRITTEN?
HOW CAN THIS AFFECT RETURN?
```

Passive cursor movement may produce atmospheric response, but it must not silently define identity or write consequential personal memory.

Consequential state is written only after an explicit, accessible interaction.

## 5. Heart as an orthogonal depth layer

`HEART / 0` is an optional sanctuary and orientation layer reachable from multiple trajectories.

It is not:

- a mandatory scene;
- a score or spiritual rank;
- a reward for passive time-on-page;
- a biometric detector;
- an accidental trap;
- the midpoint of every route.

A Heart portal may become available through explicit and inspectable route conditions such as:

- committing meaningful decisions across semantic families;
- tracing a relation between worlds;
- discovering and activating a repeated pulse glyph;
- completing a declared contemplative interaction;
- returning to a previously encountered node with new context.

Portal visibility has three states:

```text
LATENT → RESONANT → AVAILABLE
```

Entering Heart is always voluntary. Exiting Heart restores the exact previous world, node, focus and local route anchor.

## 6. Chromatic and frequency grammar

The journey begins in `OBSIDIAN`, travels through functional spectral bands and may integrate into `OPEN WHITE` at Return.

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

This is not a mandatory ladder. Different interactions activate different bands, combinations and transitions. A visitor may revisit a color, skip a band or encounter several simultaneously.

The session spectrum is synthesized from the actual trajectory.

The word `frequency` may describe only:

- actual audio frequency;
- animation or pulse tempo;
- event density;
- recurrence rate;
- clearly labeled mythopoetic language.

KODEX must not present numerical emotion frequencies, consciousness scores or fabricated scientific telemetry as fact.

## 7. Common convergence without identical journeys

A completed trajectory may converge semantically at `RETURN / +∞` whether or not Heart was visited.

Return must reveal:

- the trace actually produced;
- worlds and spectral bands encountered;
- actions whose consequences became visible;
- sources and unresolved relations;
- Heart visit status without ranking;
- a trajectory-dependent artifact;
- connected possibilities for re-entry.

Return is common in function, not identical in content.

Immediate exit remains available from every node and is not treated as failure.

## Topological model

```text
                                ┌──────── MEMORY ────────┐
                         ╭──────┤   ╲   │   ╱            ├──────╮
                         │      └────╲──┼──╱──────────────┘      │
                         │            ╲ │ ╱                      │
−∞ → THRESHOLD → INTERACTION FIELD ─── NODES ────→ RETURN / +∞
                         │            ╱ │ ╲                      │
                         │      ┌────╱──┼──╲──────────────┐      │
                         ╰──────┤ MACHINE / COSMOLOGY /   ├──────╯
                                │ ARTIFACT RELATIONS      │
                                └─────────┬───────────────┘
                                          ╲
                                           ╲ optional depth portals
                                            HEART / 0
                                                │
                                    restore exact prior anchor
```

This is not a conventional sitemap. It is the governing possibility space from which URLs, scenes, states and individual trajectories are derived.

## Runtime consequences

The runtime must support:

- graph navigation rather than a fixed scene array;
- multiple valid exits at successive nodes;
- state-dependent node and portal availability;
- world membership and cross-world relations;
- bounded-serendipity candidate selection;
- path-dependent consequences;
- an orthogonal Heart depth route;
- exact return anchors;
- URL and browser-history integrity;
- local, privacy-minimized session memory;
- full, reduced and motion-off representations;
- deterministic Return synthesis from the event trace.

Minimum state:

```ts
interface KodexJourneyState {
  currentNodeId: string;
  currentWorldIds: string[];
  availableNodeIds: string[];
  latentNodeIds: string[];
  returnAnchor: RouteAnchor | null;
  visitedNodeIds: string[];
  committedDecisionIds: string[];
  interactionEvents: SemanticInteractionEvent[];
  tracedRelationIds: string[];
  spectralBands: string[];
  memoryEchoIds: string[];
  heartPortalState: 'LATENT' | 'RESONANT' | 'AVAILABLE';
  heartVisited: boolean;
  trajectorySignature: string;
}
```

## V0 proof boundary

The first release remains finite, but it must prove a **multi-path system**, not two hard-coded stories.

V0 must contain at minimum:

- one common origin;
- at least six consequential nodes;
- at least three moments with multiple meaningful exits;
- at least two semantic worlds connected by real relations;
- at least eight reproducible trajectory signatures through recombination;
- one optional Heart portal accessible through more than one trajectory;
- Return variants generated from the event trace.

The number eight is a verification floor, not a public promise or a limit on the architecture.

## Rejected alternatives

### Two fixed paths

Rejected as the final architecture because it reduces free interaction to a binary branch. Two representative test journeys may be used in QA, but the runtime must generate a larger trajectory space.

### Mandatory Heart

Rejected because it removes free will and turns the sanctuary into a checkpoint.

### Completely random navigation

Rejected because it produces novelty without consequence, memory or coherent convergence.

### Fixed rainbow ladder

Rejected because it makes every route cosmetically identical and presents symbolic color as a universal hierarchy.

### Invisible accidental-only Heart

Rejected because a core experience must remain discoverable and accessible without requiring fine pointer control or chance.

## Implementation order

1. Encode nodes, exits, conditions and relations in the machine-readable graph.
2. Extend session memory with semantic interaction events and trajectory signature.
3. Implement state-dependent route resolution rather than a fixed branch switch.
4. Implement bounded-serendipity selection from declared relations.
5. Build at least six nodes and three consequential branching moments.
6. Implement optional Heart access from multiple trajectories and exact restoration.
7. Generate Return from the complete event trace.
8. Validate at least eight reproducible trajectories across keyboard, touch, reduced motion and browser history.

## Deployment

This decision authorizes design and implementation work only. It does not authorize production deployment. `APROBAR DEPLOY` remains required.