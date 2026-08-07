# KODEX Factory Recipe Learning v1

## Objective

Improve the production system empirically across batches.

The factory does not assume that adding more agents or prompts increases throughput. It measures where value actually flows and where defects/rework accumulate.

## Unit of measurement

The primary measurement unit is the **verified work packet**.

Track, when evidence exists:

- packet ID;
- lane/cell;
- complexity C0–C5;
- producer profile;
- reviewer profile;
- dependencies;
- READY timestamp;
- RUNNING timestamp;
- BLOCKED intervals;
- REVIEW timestamp;
- QA timestamp;
- DONE timestamp;
- cycle time;
- blocked time;
- first-pass result;
- rework cause;
- files touched;
- declared vs actual ownership;
- tests run;
- integration result;
- reusable artifact produced;
- handoff completeness.

## Core metrics

### Verified throughput
Number of packets reaching DONE with required evidence per measurement window.

### Median cycle time
Median RUNNING → DONE elapsed time for comparable packet classes.

### Lead time
READY → DONE elapsed time.

### Blocked-time share
Blocked duration / lead time.

### First-pass yield
Packets accepted by next gate without producer rework / packets submitted.

### Rework rate
Packets requiring producer-level changes after review / packets reviewed.

### Integration failure rate
Integration attempts failing because of upstream contract/implementation defects / integration attempts.

### Reuse ratio
Packets consuming existing validated modules/templates/fixtures relative to comparable packets requiring new infrastructure.

### Handoff completeness
Percentage of required handoff fields supplied with evidence.

## Bottleneck rule

Do not optimize upstream generation speed when downstream review/integration is saturated.

If WIP grows in front of one station, treat that station as a probable constraint and investigate:

- packet size;
- context quality;
- test coverage;
- review capacity;
- interface instability;
- ownership collisions;
- missing tooling.

## Recipe memory

Repeated packet archetypes should accumulate a versioned production recipe.

Example:

```yaml
recipe:
  archetype: shader_module
  version: 7
  preferred_complexity: C2
  required_inputs:
    - visual_passport
    - organism_interface
  preferred_producer_profile: BOUNDED_CODING_AGENT
  preferred_reviewer_profile: MULTIMODAL_VISUAL_SPEC
  common_defects:
    - incomplete_dispose
    - weak_reduced_motion_fallback
    - unnecessary_GPU_state
  required_tests:
    - build
    - lifecycle_cleanup
    - fallback
  reusable_tools:
    - shader_harness
    - lifecycle_fixture
  notes:
    - keep renderer state outside scene copy
```

## Improvement experiment protocol

When feasible, change one important process variable per batch so the effect can be attributed.

Examples:

- reduce C2 packet maximum from five files to three;
- require fixture before implementation;
- switch producer/reviewer pairing;
- provide summarized context rather than full corpus;
- add deterministic schema validation before human review;
- introduce visual-passport gate before creative coding.

For every recipe change record:

```yaml
experiment:
  hypothesis: ""
  change: ""
  packet_class: ""
  baseline_metric: ""
  target_metric: ""
  observed_result: ""
  keep_or_revert: ""
  evidence: []
```

## Evolution principle

```text
PRODUCTION
→ MEMORY OF PRODUCTION
→ BETTER RECIPE
→ MORE REUSE
→ LOWER REWORK
→ HIGHER VERIFIED THROUGHPUT
→ NEXT PRODUCTION CYCLE
```

The process may evolve indefinitely, but every recipe version and batch remains finite, inspectable and reversible.
