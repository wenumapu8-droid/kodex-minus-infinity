# KODEX Visual Passport Line v1

## Purpose

Convert an approved visual concept/reference set into an implementation-ready specification before a coding agent touches renderer or scene code.

The Visual Passport is a production interface, not a moodboard and not a new canon authority.

## Production flow

```text
APPROVED CONCEPT / REFERENCE SET
→ MULTIMODAL ANALYSIS
→ VISUAL PASSPORT
→ SUPERVISOR REVIEW
→ BOUNDED CODING PACKET
→ IMPLEMENTATION
→ MULTIMODAL VISUAL REVIEW
→ ACCESSIBILITY / PERFORMANCE / QA
```

## Producer role

The multimodal visual-spec station should inspect the actual concept/reference images and current KODEX design system, then describe the smallest visual grammar a programmer can reproduce without inventing core behavior.

It must distinguish:

- semantic function from decoration;
- reusable engine behavior from scene-specific expression;
- abstractable reference structure from distinctive expression that must not be copied;
- atmosphere from data-bearing visual channels;
- real scientific information from symbolic/metaphoric treatment.

## Coordinate rule

A Visual Passport does not assign an A–Y coordinate unless that assignment is already approved by canonical evidence.

`coordinateAssignment: null` is valid and preferred when unresolved.

Do not infer B–L or N–X meanings from concept names or initials.

## Required output

Produce an object conforming to `schemas/visual-passport.schema.json`.

Use `VISUAL_PASSPORT_TEMPLATE.yaml` as the drafting interface.

The passport must define:

1. semantic purpose and node question;
2. provenance/copying boundaries;
3. information hierarchy;
4. geometry/topology/spatial layers;
5. composition and mobile behavior;
6. palette and typography roles;
7. motion timescales and state transitions;
8. interaction inputs → semantic actions → state changes;
9. memory write, if any;
10. implementation medium and reusable engine boundary;
11. no-WebGL/no-audio/static fallbacks;
12. accessibility equivalents;
13. visual review checks and target captures;
14. epistemic constraints.

## No pseudo-telemetry

Generated concept images often contain invented labels, percentages, frequencies, lineage numbers or technical readouts. These are visual texture unless separately sourced and admitted.

Do not turn generated text into:

- scientific measurements;
- biometric readings;
- consciousness scores;
- spiritual rankings;
- historical facts;
- visitor profiling.

The implementation must not display invented numeric telemetry as factual system state.

## Cultural provenance

When a concept touches Indigenous, religious, ceremonial or culturally specific imagery:

- identify the source/provenance question;
- state what must not be copied;
- avoid generic "ancestral", "tribal" or "sacred geometry" substitution;
- route uncertain material to cultural/rights review before implementation.

## Interaction equivalence

Pointer discovery is never the only way to access a semantic action.

Every consequential visual interaction must define equivalent keyboard/touch semantics and a reduced-motion/non-WebGL path where applicable.

## Performance / assembly rule

Prefer reusable organisms/adapters over scene-specific renderer reinvention.

A passport should answer:

```text
What is the reusable engine?
What is only data/configuration?
What is unique scene expression?
What is the fallback?
What is the disposal/lifecycle requirement?
```

## Review gate

A passport is `APPROVED` only when a coding agent should be able to implement it without deciding:

- what the concept means;
- which interaction is consequential;
- how mobile behaves;
- how reduced motion behaves;
- what happens without WebGL/audio;
- which parts may be copied from references;
- whether symbolic telemetry is factual.

If any of these remain open, status stays `DRAFT`, `REVIEW` or `BLOCKED`.
