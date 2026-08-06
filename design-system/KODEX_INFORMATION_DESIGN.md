# KODEX−∞ INFORMATION DESIGN STANDARD

Status: `CANONICAL DESIGN STANDARD / V0.1`

## 1. Purpose

KODEX visualizes information to reveal relations, uncertainty, memory and possibility. Beauty must increase understanding or support a declared atmosphere; it cannot conceal weak reasoning.

## 2. Start from a question

No chart, organism or shader is selected before the question is explicit.

Question families:

- inventory — what exists?
- comparison — how do cases differ?
- relation — how are entities connected?
- time — what changed or persisted?
- geography — where does something occur?
- hierarchy — what contains or depends on what?
- distribution — how is a quantity spread?
- uncertainty — what is unknown or contested?
- narrative — how did this path form?
- scenario — what changes when a declared parameter changes?
- symbolic — what does an attributed system propose?

## 3. Semantic passport

Every essential element requires:

```yaml
element_id: VIS-0001
scene_id: ARCHIVE
question_supported: ""
source_fields: []
transformation_ids: []
meaning: ""
channel: position | length | size | color | opacity | texture | line | motion | sound
scale: nominal | ordinal | interval | ratio | topological | none
legend_label: ""
uncertainty_behavior: ""
missing_value_behavior: ""
interaction_role: reveal | compare | filter | trace | navigate | simulate | annotate | contribute | orient | none
status: ADMITTED | ATMOSPHERE | BLOCKED
```

## 4. Channel hierarchy

For precise quantitative comparison prefer:

1. common-position alignment;
2. position on unaligned scales;
3. length;
4. angle or direction;
5. area;
6. density or texture;
7. color intensity;
8. opacity;
9. motion;
10. sound.

Connection and topology are preferred for relation questions even when not quantitative.

## 5. Data type mapping

```yaml
nominal_category:
  preferred: [shape, label, separated position]
  avoid: [ordered gradient implying rank]

ordinal_category:
  preferred: [ordered position, length, lightness]

ratio_quantity:
  preferred: [position, length]
  require: [unit, baseline, denominator when applicable]

network_relation:
  preferred: [connection, adjacency, containment]
  require: [relation type, certainty]

time_sequence:
  preferred: [ordered position]
  note: duration requires real intervals

geographic_location:
  preferred: [actual coordinate or clearly declared schematic map]

uncertainty:
  preferred: [range, dispersion, incomplete boundary, explicit label]

missing_value:
  preferred: [empty state, break, unresolved region]
```

## 6. Pattern gate

A cluster, anomaly, cycle or trend is a claim.

Before rendering one, record:

- algorithm or human coding method;
- parameters;
- minimum evidence;
- sensitivity to parameter changes;
- descriptive versus causal status;
- alternative explanations;
- validation or review status.

Generative geometry may be atmosphere but must not visually imply an empirical discovery.

## 7. Time gate

Time controls layout or motion only when the corpus contains valid:

- dates or intervals;
- comparable definitions;
- granularity;
- missing-time policy.

Rules:

- order is not duration;
- sparse events do not prove periodic rhythm;
- animation speed must state its conversion;
- contested dates receive an uncertain-time region;
- incomparable observations do not form one trend line.

## 8. Scale and baseline

- show zero when omission materially changes interpretation;
- explain truncated ranges;
- area encoding must use area, not radius, for quantity;
- 3D perspective must not distort comparison;
- logarithmic scales require clear labels;
- normalized values must state the normalization method;
- percentages require a denominator.

## 9. Relation certainty

```text
CONFIRMED  → solid relation
INFERRED   → interrupted or softened relation
SUGGESTED  → exploratory relation with explicit label
UNRESOLVED → open edge or contradiction marker
```

Do not map certainty only through color.

## 10. Claim classes in the interface

Suggested visual distinctions:

```yaml
OBSERVED:
  treatment: stable, source-linked

DERIVED:
  treatment: stable with formula access

ESTIMATED:
  treatment: range or uncertainty field

PROXY:
  treatment: proxy badge and limitation

INTERPRETATION:
  treatment: attributed editorial layer

TESTIMONY:
  treatment: speaker/context-preserving layer

SPECULATION:
  treatment: scenario boundary

MYTHOPOETIC:
  treatment: symbolic layer with attribution

SYNTHETIC:
  treatment: generated/simulation label

UNKNOWN:
  treatment: explicit unresolved absence
```

## 11. Information organisms

KODEX may transform data into organic forms when mapping remains inspectable.

Examples:

### Evidence flower

- petals = categories;
- petal length = documented quantity;
- petal edge dispersion = uncertainty;
- internal rings = time intervals;
- source nodes = annotations around perimeter.

### Memory tree

- trunk = shared sequence;
- branches = divergence;
- branch thickness = documented count or explicitly defined weight;
- missing branch = absent record;
- leaf/glyph = evidence item.

### Relation constellation

- node = entity;
- connection = relation;
- distance = only meaningful when algorithm is stated;
- orbit = only for documented recurrence or declared atmosphere.

### Temporal organism

- longitudinal axis = time;
- repeated ribs = comparable intervals;
- deformation = documented change;
- sediment = persistence or accumulation.

## 12. Anti-noise budget

Default scene budget:

```yaml
primary_variables_max: 3
secondary_variables_max: 5
simultaneous_signal_colors_max: 2
high_priority_motion_max: 2
unexplained_visual_channels_max: 0
unexplained_motion_behaviors_max: 0
```

Exceeding the budget requires a written reason and comprehension test.

## 13. Progressive disclosure

Information appears in layers:

```text
ORIENTATION
→ PRIMARY RELATION
→ DETAIL
→ SOURCE
→ METHOD
→ UNCERTAINTY
→ ALTERNATIVE VIEW
```

Do not expose all controls, legends, records and metadata at once.

## 14. Interaction roles

- reveal — inspect hidden detail;
- compare — align cases or versions;
- filter — remove irrelevant data;
- trace — follow provenance or relation;
- navigate — change node/path;
- simulate — change declared parameters;
- annotate — add private or reviewable note;
- contribute — submit correction/source/code;
- orient — pause, breathe naturally, return.

## 15. Data transformation ledger

Every derived visual should point to transformations:

```yaml
transformation:
  id: TR-0001
  inputs: [field_a, field_b]
  operation: ""
  parameters: {}
  output: field_c
  rationale: ""
  reversible: true
  code_reference: ""
  validation: ""
```

## 16. Generated atmosphere

Atmosphere is permitted when:

- marked `ATMOSPHERE` in the semantic passport;
- it does not imply hidden measurement;
- it does not compete with essential information;
- it stops or simplifies under reduced motion;
- its role can be explained without claiming factual meaning.

## 17. Comprehension testing

Minimum tests:

1. What question is this scene answering?
2. What does the dominant form represent?
3. Which parts are factual, interpretive or atmospheric?
4. Can the user find the source?
5. Can the user identify uncertainty?
6. Does the interaction change understanding?
7. Does the scene remain understandable without motion or sound?

## 18. Definition of done

A visualization is canonical when:

- the question is explicit;
- data and claims are admitted;
- semantic passports exist;
- transformations are recorded;
- uncertainty and missing values are honest;
- legends/annotations are sufficient;
- interaction is purposeful;
- accessibility alternatives exist;
- provenance is inspectable;
- the form is recognizably original KODEX.
