# VERTICAL SLICE V0 — QA TRAJECTORY FIXTURE

Status: `NON_CANONICAL QA FIXTURE / STRUCTURAL ONLY`

## What this is

`trajectory-fixture.v0.json` is a coordinate graph that exercises the structural
half of `ADR-0010` which canon already fixes: one origin at `A`, a state-resolved
intermediate field, an optional Heart at `M`, and convergence at `Y` derived from
the event trace.

It exists so the ten `firstExecutableSlice.requiredCapabilities` in
`PROJECT_MANIFEST.json` can be **probed by machine** instead of asserted in prose.

## What this is not

- It is **not** canon, and `scripts/validate_canon_conformance.py` rejects it if
  it ever declares canonical or coordinate authority.
- It assigns **no** concept, world, work or source to `B` through `X`. That
  assignment requires `CREATOR_APPROVAL`
  (`data/alphabet-topology.json` → `conceptAssignmentRequirements`) and the
  validator fails if any fixture node carries `conceptIds`.
- Its eight trajectories are QA coverage, not routes offered to a visitor, and
  not the architecture of the experience.
- Regions reuse the `semanticWorlds` ids already declared in
  `data/experience-graph.json` purely to prove that `M` is approachable from more
  than one region. A region is not a concept assignment.
- Signatures are generated golden values from
  `packages/core-reference/src/kodex-alphabet.mjs`. They are reproducibility
  anchors, not canonical artifacts.

## Structure proved by the eight trajectories

```text
T1  A C H F Q Y    machine route; the C relation is left untraced
T2  A B K M K R K X Y    Heart, exact anchor restore, loop, mutated revisit
T3  A C F Y        a traced relation opens an earlier return later
T4  A H Q M Q Y    Heart approached from a second region
T5  A B K R X Y    completed route that never approaches the Heart
T6  A H F Q Y      same coordinates as T1 in a different order
T7  A C H Q Y      shortest crossing between two regions
T8  A B K R K X Y  loop and mutated revisit without the Heart
```

## Running it

```bash
# structural conformance + capability readiness ledger
python scripts/validate_canon_conformance.py

# replay every trajectory against the engine
cd packages/core-reference && npm test
```

## Replacing it

When the creator assigns concepts to `B` through `X`, the assignment becomes a
registry-backed graph and this fixture is superseded, not extended. The engine
does not change: it reads whatever graph it is given and refuses one that
assigns concepts without approval.
