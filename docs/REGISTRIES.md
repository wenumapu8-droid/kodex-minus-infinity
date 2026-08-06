# KODEX−∞ Registries

The repository will maintain machine-readable registries rather than relying on filenames or conversation memory.

## Artifact registry

Tracks every file, code unit, image, animation, document and package.

Required fields:

```yaml
id: ART-0000
title: ""
type: ""
status: REFERENCE
original_location: ""
current_location: ""
checksum: ""
creator: ""
created_at: ""
rights_status: UNKNOWN
privacy_status: PUBLIC
cultural_status: STANDARD
experience_nodes: []
modules: []
relationships: []
notes: []
```

## Source registry

Tracks datasets, books, papers, websites, testimony, cultural works and documentation.

```yaml
id: SRC-0000
title: ""
creator: ""
source_class: ""
location: ""
published_at: ""
accessed_at: ""
claim_classes: []
rights_status: UNKNOWN
cultural_status: STANDARD
reliability_notes: []
contradictions: []
```

## Influence registry

Tracks artistic and conceptual references without converting them into templates for copying.

```yaml
id: INF-0000
creator: ""
work: ""
location: ""
shared_territory: []
distinctive_expression: []
structural_lessons: []
prohibited_copying: []
rights_status: REFERENCE_ONLY
kodex_transformation: ""
```

## Decision registry

The readable register lives in `docs/DECISIONS.md`. A future structured mirror should use:

```yaml
id: ADR-0000
status: PROPOSED
date: ""
problem: ""
alternatives: []
chosen_direction: ""
rationale: ""
consequences: []
approver: ""
```

## Experience-node registry

```yaml
id: ""
function: ""
status: EXPERIMENTAL
entry_conditions: []
required_memory: []
sources: []
decisions: []
visual_variables: []
writes_to_memory: []
exits: []
convergence_contribution: ""
accessibility: {}
```

## Relationship certainty

Every inferred relationship must state certainty:

- `CONFIRMED`
- `INFERRED`
- `SUGGESTED`
- `UNRESOLVED`

The system must not visually present inferred or suggested links as confirmed facts.

## Initial registry files

The next inventory phase will create:

```text
data/registries/artifacts.yaml
data/registries/sources.yaml
data/registries/influences.yaml
data/registries/nodes.yaml
data/registries/rights.yaml
```

Empty registries should not be populated with invented examples merely to make a visualization look complete.
