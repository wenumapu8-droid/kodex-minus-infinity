# KODEX EVIDENCE ENGINE

Status: `CANONICAL SPECIFICATION / V0.1`

## Purpose

Acquire, classify, validate and expose the evidence behind every factual or quantitative KODEX element.

## Inputs

- source records;
- atomic claims;
- entities and relations;
- transformation records;
- contradiction and limitation notes;
- rights, privacy and cultural status.

## Outputs

- admitted claim ledger;
- source cards;
- method and transformation view;
- uncertainty and missing-data behavior;
- blocked-publication reasons;
- evidence events for the session-memory system.

## Claim admission

```pseudo
admit(claim) when:
  class is declared
  source exists or class permits synthetic/unknown status
  quantitative definitions are complete
  rights and privacy allow intended use
  cultural review is complete when required
  contradictions and limitations are preserved
```

## Required interactions

- `OPEN SOURCE`
- `VIEW METHOD`
- `TRACE TRANSFORMATION`
- `SHOW UNCERTAINTY`
- `COMPARE CLAIMS`
- `REPORT CORRECTION`

## Semantic behavior

- `OBSERVED`: stable source-linked representation;
- `DERIVED`: formula and inputs inspectable;
- `ESTIMATED`: interval, method and uncertainty;
- `PROXY`: proxy label and explicit limitation;
- `INTERPRETATION`: attributed editorial layer;
- `TESTIMONY`: speaker, date and context;
- `SPECULATION`: scenario boundary;
- `MYTHOPOETIC`: symbolic layer with attribution;
- `SYNTHETIC`: generated/simulation label;
- `UNKNOWN`: visible unresolved state.

## Events

```text
kodex:evidence:source-opened
kodex:evidence:method-opened
kodex:evidence:claim-compared
kodex:evidence:contradiction-revealed
kodex:evidence:correction-started
```

These events write actual source/claim IDs to session memory.

## Prohibited behavior

- inventing a value to complete a visual composition;
- hiding contradictions;
- averaging incompatible claims;
- displaying a proxy as the underlying concept;
- using a technical identifier as meaningful evidence;
- publishing rights-unclear or restricted material.

## Return contribution

The Evidence Engine supplies:

- sources encountered;
- transformations used;
- limitations and unresolved questions;
- source manifest attached to the path artifact.

## Fallback

Evidence must remain available as structured text and links even when every visual renderer fails.
