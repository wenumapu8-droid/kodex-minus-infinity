# ADR-0010 — ALPHABETIC MULTIVERSE TOPOLOGY A–M–Y

Status: `ACCEPTED BY CREATOR / IMPLEMENTATION PENDING`  
Date: `2026-08-06`  
Extends: `ADR-0009 — Multiverse Topology and Optional Heart`

## Creator correction

KODEX−∞ is not organized as two paths, a short list of routes or a sequence of seven compulsory pages.

Its complete experiential coordinate system is an **operational alphabet from A through Y**:

```text
A B C D E F G H I J K L M N O P Q R S T U V W X Y
```

- `A` is the only canonical beginning.
- `M` is `HEART / 0`: always potentially discoverable, never compulsory.
- `Y` is the only canonical completion of a finished journey.
- Every letter between A and Y is a concept-node capable of holding multiple related concepts, artifacts, states and portals.
- The letters are coordinates and stable IDs, not necessarily initials or visible menu labels.

This is a KODEX alphabet, not a claim about the conventional Spanish or English alphabet.

## Governing proposition

> KODEX does not offer a fixed path. It offers an interwoven alphabet of concepts through which each visitor writes a personal trajectory.

The full system exists as a graph, while each session experiences only a situated walk through that graph.

## Formal model

Let:

```text
V = {A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y}
```

KODEX is a directed, weighted, stateful and memory-preserving graph:

```text
G = (V, E, A, M, Y)
```

where:

- `A` is the source invariant;
- `M` is an optional omnireachable attractor;
- `Y` is the canonical terminal for completed journeys;
- `E` is recomputed from semantic relations, user actions and accumulated memory rather than exposed as one fixed sitemap.

A completed journey has the form:

```text
π = A → v1 → v2 → ... → vn → Y
```

with:

```text
vi ∈ V \ {A, Y}
M may appear zero, one or multiple times
letters may be skipped
letters may be revisited
order is not alphabetical
```

A safe exit may occur at any moment, but an early exit is not treated as canonical completion at Y.

## A — Common origin

`A` is the shared entry from `−∞`.

It contains:

- orientation;
- consent;
- accessibility controls;
- the first meaningful interaction;
- the initial obsidian state;
- the first event written into session memory.

Every completed journey begins at A. No deep link may fabricate a prior journey; a deep link may open a node in inspection mode or begin a new trace with explicit context.

## B–X — Interwoven concept field

Every intermediate letter is a stable macro-node. A macro-node may contain:

- one or more concepts;
- visual activators;
- works and sources;
- scene states;
- internal subnodes;
- semantic exits;
- cross-world portals;
- unresolved questions;
- memory writes;
- spectral behavior;
- a contribution to Y.

The letters do not form compulsory stages. A visitor may move, for example:

```text
A → C → H → F → Q → Y
A → B → K → M → K′ → R → X → Y
A → J → D → J′ → P → N → Y
```

`K′` and `J′` represent revisited nodes altered by the accumulated trace.

## M — HEART / 0 as distributed invariant

M is a real canonical node and simultaneously a distributed possibility beneath the complete graph.

The visitor must be able to find a possible relation to M from any nonterminal concept region, but the portal may remain:

```text
LATENT → RESONANT → AVAILABLE
```

Therefore:

- M is always potentially reachable;
- M is not always immediately visible;
- M is never required to reach Y;
- M may manifest differently according to the node and route from which it is approached;
- every manifestation resolves to the same canonical Heart identity;
- leaving M restores the exact prior node, focus, state and route anchor;
- revisiting M may reveal the accumulated path without ranking the visitor.

The implementation may represent contextual manifestations as:

```text
M@ARCHIVE
M@MACHINE
M@COSMOLOGY
M@ARTIFACT
```

These are portals or views of M, not separate hearts.

## Y — Required convergence for completed journeys

Y is `RETURN / +∞`.

A visitor is not required to visit every letter before Y. Y means that the journey has achieved sufficient local coherence to synthesize the route actually taken.

Y must derive from the complete event trace and reveal:

- letters visited;
- revisits and mutations;
- decisions and ignored signals that created later consequences;
- worlds and spectral bands encountered;
- whether M was visited, without judgment;
- sources and unresolved questions;
- a route-specific visual artifact;
- re-entry possibilities.

Y is shared but never identical. It is one terminal function with many possible manifestations.

## Edge-resolution law

At time `t`, available exits are resolved from:

```text
availableEdges(t) = F(
  currentLetter,
  committedActions,
  visitedLetters,
  revisits,
  tracedRelations,
  ignoredSignals,
  spectralState,
  boundedSerendipitySeed,
  accessibilityMode
)
```

The system may surprise the visitor but must not produce arbitrary navigation. Every surfaced edge requires at least one declared semantic, narrative, visual or causal relation.

Passive pointer movement alone cannot make identity claims or write consequential personal memory.

## Concept assignment law

The meanings of B–L and N–X are not invented merely to complete a list.

Each letter receives its canonical concept set only when the assignment has:

- creator approval;
- a defined relation to the KODEX thesis;
- source or authored material;
- one or more interaction consequences;
- memory writes;
- a contribution to Y;
- epistemic, rights and cultural status.

Until then, its status is `NEEDS_CONFIRMATION` or `UNASSIGNED`, not fabricated canon.

## Full universe versus finite release

All 25 letter coordinates exist canonically from the beginning. The first release does not need 25 fully produced scenes.

V0 must:

- preserve A, M and Y invariants;
- instantiate a meaningful connected subset of intermediate letters;
- demonstrate multiple nonalphabetical trajectories;
- support loops and mutated revisits;
- prove that M can be approached from more than one region;
- generate Y from the actual trace;
- keep unimplemented letters as explicit latent registry records rather than pretending they are complete.

This preserves the total universe while keeping production finite.

## Runtime consequences

Minimum route state:

```ts
interface KodexAlphabetJourneyState {
  currentLetter: KodexLetter;
  previousLetter: KodexLetter | null;
  visitedLetters: KodexLetter[];
  visitCounts: Partial<Record<KodexLetter, number>>;
  committedActionIds: string[];
  ignoredSignalIds: string[];
  tracedRelationIds: string[];
  openEdgeIds: string[];
  routeSignature: string;
  spectralState: string[];
  mPortalStateByLetter: Partial<Record<KodexLetter, 'LATENT' | 'RESONANT' | 'AVAILABLE'>>;
  mVisitCount: number;
  returnAnchor: RouteAnchor | null;
  completionEligible: boolean;
}
```

Required types:

```ts
type KodexLetter =
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J'
  | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T'
  | 'U' | 'V' | 'W' | 'X' | 'Y';
```

The router must support state-dependent edges, loops, revisit variants, exact M return anchors, deterministic route signatures, Browser History and accessible alternatives.

## Content consequences

Every letter record must declare:

```yaml
letter_id:
status: CANONICAL | ASSIGNED | LATENT | NEEDS_CONFIRMATION
concept_ids: []
world_ids: []
source_ids: []
activator_ids: []
semantic_edges: []
portal_rules: []
memory_writes: []
spectral_behavior: []
y_contribution: []
accessibility_equivalent:
rights_status:
cultural_status:
```

## Rejected interpretations

### A linear A→B→C sequence

Rejected. The alphabet defines the available conceptual universe, not a mandatory order.

### Two principal routes

Rejected as architecture. Representative paths may be used only for QA.

### M as the midpoint checkpoint

Rejected. M is an optional distributed depth invariant.

### Visiting all letters before Y

Rejected. Completeness is local coherence and trace synthesis, not checklist completion.

### Random recommendation engine

Rejected. KODEX resolves bounded possibilities from meaningful relations rather than engagement prediction.

## Canonical summary

```text
ONE A
MANY INTERWOVEN LETTER-CONCEPTS
ONE M THAT CAN ALWAYS BE FOUND
ONE Y THAT COMPLETES EVERY FINISHED JOURNEY
INNUMERABLE PERSONAL TRAJECTORIES
```

## Deployment

This decision authorizes architecture, registry and implementation work only. It does not authorize production deployment. `APROBAR DEPLOY` remains required.