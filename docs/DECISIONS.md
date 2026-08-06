# KODEX−∞ Decision Register

Canonical decisions must be explicit, dated and reviewable. Agents may propose decisions but must not silently convert proposals into canon.

## Template

```yaml
decision:
  id: ADR-0000
  date: YYYY-MM-DD
  status: PROPOSED | APPROVED | SUPERSEDED | REJECTED
  problem: ""
  alternatives: []
  chosen_direction: ""
  rationale: ""
  affected_files: []
  consequences: []
  reversibility: ""
  evidence: []
  approver: ""
```

## ADR-0001 — Dedicated canonical repository

```yaml
id: ADR-0001
date: 2026-08-05
status: APPROVED
problem: KODEX material was distributed across chats, ZIP packages, local paths and the Wenu frontend repository, causing agent drift and disconnected production.
alternatives:
  - keep all KODEX canon inside wenu-frontend
  - use a documentation service as the sole source of truth
  - establish a dedicated GitHub repository
chosen_direction: Establish wenumapu8-droid/kodex-minus-infinity as the canonical repository while preserving wenu-frontend as the current implementation source until migration is audited.
rationale: A dedicated repository gives every human and AI agent one versioned, inspectable and reviewable source of truth without destructively moving existing implementation work.
affected_files:
  - README.md
  - SKILL.md
  - AGENTS.md
  - product/CURRENT_STATE.md
consequences:
  - canonical documentation moves here
  - existing implementation must be inventoried before migration
  - public/private and rights boundaries must be enforced
reversibility: Repository roles can be revised through a later ADR without deleting original history.
approver: wenumapu8-droid
```

## ADR-0002 — Semantic convergence

```yaml
id: ADR-0002
date: 2026-08-05
status: APPROVED
problem: Multiple KODEX scenes and routes lacked one coherent product consequence.
chosen_direction: Every canonical path must converge through MEMORY → PROVENANCE → RELATION → REFLECTION → CONTRIBUTION → RE-ENTRY at RETURN / +∞.
rationale: Convergence gives distinct routes one shared meaning while preserving the consequences of user decisions.
affected_files:
  - canon/KODEX_CANON.md
  - product/EXPERIENCE_ARCHITECTURE.md
  - data/experience-graph.json
reversibility: The functions can be refined, but mechanical redirection cannot replace semantic convergence.
approver: wenumapu8-droid
```

## ADR-0003 — Evidence and myth remain distinct

```yaml
id: ADR-0003
date: 2026-08-05
status: APPROVED
problem: Numeric, spiritual, symbolic and scientific-looking material could be confused or visually collapsed.
chosen_direction: Classify claims as OBSERVED, DERIVED, ESTIMATED, PROXY, INTERPRETATION, TESTIMONY, SPECULATION, MYTHOPOETIC, SYNTHETIC or UNKNOWN.
rationale: KODEX can hold different knowledge systems without manufacturing certainty or dismissing symbolic discourse.
affected_files:
  - canon/KODEX_EPISTEMIC_STANDARD.md
  - SKILL.md
reversibility: New claim classes require an ADR and migration plan.
approver: wenumapu8-droid
```

## ADR-0004 — Deployment lock

```yaml
id: ADR-0004
date: 2026-08-05
status: APPROVED
problem: Autonomous agents could otherwise publish incomplete or unsafe work.
chosen_direction: No deployment occurs without the exact phrase APROBAR DEPLOY.
rationale: Separates code preparation and review from release authority.
affected_files:
  - README.md
  - AGENTS.md
  - product/QUALITY_GATES.md
  - SECURITY.md
reversibility: Only the repository owner may replace this rule through an approved ADR.
approver: wenumapu8-droid
```
