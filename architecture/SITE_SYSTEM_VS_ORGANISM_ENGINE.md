# KODEX−∞ — Site System Architecture vs Organism Engine

Status: `CANONICAL CLARIFICATION / PROPOSED WITH ADR-0011`

## Purpose

This document prevents a category error: the **architecture of the complete KODEX experience** and the **visual organism rendered inside each node/page** are related but are not the same system.

Neither replaces the other.

---

## Layer 1 — KODEX Site / Experience Architecture

This is the architecture of the whole product.

It governs:

- the A–Y relation field;
- common origin at `A`;
- optional and distributed Heart at `M`;
- route-derived convergence at `Y`;
- graph relations between nodes;
- state-dependent exits;
- loops and mutated revisits;
- session memory;
- delayed consequences;
- bounded serendipity;
- navigation and browser history;
- source and provenance access;
- accessibility preferences;
- audio permission;
- Return composition;
- path-dependent artifacts;
- shell, menus, overlays and persistent interface;
- deployment and privacy boundaries.

Primary responsibility:

```text
WHERE THE VISITOR CAN GO
WHAT EACH ACTION CHANGES
WHAT THE SYSTEM REMEMBERS
WHAT BECOMES POSSIBLE LATER
HOW THE JOURNEY CONVERGES AT Y
```

This layer is represented by:

- alphabet topology;
- experience graph;
- node registry;
- session orchestrator;
- interaction passports;
- memory model;
- Return resolver;
- persistent shell.

The Site Architecture does not prescribe that every page use WebGL, particles, 3D or any single visual treatment.

---

## Layer 2 — Node / Page Architecture

Each A–Y coordinate or supporting scene is a semantic node hosted by the Site Architecture.

A node defines:

- its concept and question;
- its sources and truth status;
- its relation to other nodes;
- its available actions;
- memory writes;
- entry conditions;
- exit conditions;
- mutated revisit behavior;
- editorial composition;
- organism recipe;
- fallback and reduced-motion equivalent.

Primary responsibility:

```text
WHAT THIS NODE MEANS
WHAT THE VISITOR CAN DO HERE
WHAT CONSEQUENCE IT WRITES
HOW IT REAPPEARS AFTER MEMORY
```

A node is more than its central animation. Text, controls, diagrams, sources and consequences remain DOM/SVG responsibilities.

---

## Layer 3 — Universal Organism Engine

The Organism Engine is a rendering and behavior subsystem used by nodes when a living visual form is appropriate.

It governs:

- FIELD / image-field organisms;
- VORTEX / convergent fields;
- ORBITAL / relational systems;
- GROWTH / staged biological structures;
- SPECIMEN / observed objects;
- TERRAIN / layered constructs;
- renderer adapters;
- shader, SVG, Canvas, GLB and layered-plane strategies;
- normalized visual controls;
- quality levels;
- motion modes;
- resource disposal;
- transitions between compatible organisms;
- static fallbacks.

Primary responsibility:

```text
HOW THE NODE'S CENTRAL FORM APPEARS
HOW IT MOVES
HOW IT RESPONDS TO STATE AND INPUT
HOW IT DEGRADES SAFELY
```

The Organism Engine does **not** decide the route, the graph, the meaning of a node, whether Heart is available or how Return is generated.

---

## Layer 4 — Organism Adapter

Each organism family uses a specialized adapter.

Examples:

```text
Portal Ring       → FIELD adapter
Signal Vortex     → VORTEX adapter
Cosmology Core    → ORBITAL adapter
Archive Tree      → GROWTH adapter
Specimen Skull    → SPECIMEN adapter
Floating World    → TERRAIN adapter
```

Adapters implement the same lifecycle and input contract, but they may use different renderers.

---

## Complete relation

```text
KODEX SITE / EXPERIENCE ARCHITECTURE
│
├── A–Y RELATION FIELD
├── EXPERIENCE GRAPH
├── SESSION MEMORY
├── CONSEQUENCE + RETURN
├── PERSISTENT SHELL
│
└── NODE / PAGE
    │
    ├── SEMANTIC CONTENT
    ├── EDITORIAL DOM / SVG
    ├── ACTIONS + MEMORY WRITES
    ├── SOURCES + PROVENANCE
    │
    └── ORGANISM RECIPE
        │
        └── UNIVERSAL ORGANISM ENGINE
            └── FIELD / VORTEX / ORBITAL / GROWTH / SPECIMEN / TERRAIN ADAPTER
```

---

## Non-replacement rule

The Universal Organism Engine is additive.

It must never:

- replace the A–Y topology;
- reduce the project to a gallery of animated pages;
- bypass session memory;
- decide navigation independently;
- turn Heart into a mandatory visual checkpoint;
- replace node semantics with visual spectacle;
- treat animation as proof that the archive is alive.

The Site Architecture remains the governing system. The Organism Engine is one of its rendering subsystems.

---

## Runtime ownership

| Concern | Owner |
|---|---|
| A–Y topology | Site Architecture |
| Node relations and exits | Experience Graph |
| Session history and mutations | Session Memory |
| Heart availability | Graph + Memory Resolver |
| Return at Y | Return Resolver |
| Page composition | Node / Editorial Layer |
| Central animated form | Organism Engine |
| Shader/GLB/SVG implementation | Adapter |
| Reduced motion and static equivalence | Node + Adapter |
| Source truth and provenance | Evidence Layer |

---

## Implementation boundary

The current Organism Engine work is isolated in draft branches and internal labs.

It does not replace public KODEX routes and does not alter the canonical A–Y product architecture without a separately reviewed integration decision.

```text
SITE ARCHITECTURE: PRESERVED
A–Y TOPOLOGY: PRESERVED
ORGANISM ENGINE: ADDITIVE SUBSYSTEM
PUBLIC ROUTES REPLACED: NO
DEPLOYMENT: BLOCKED
```
