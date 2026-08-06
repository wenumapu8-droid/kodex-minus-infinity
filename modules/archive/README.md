# KODEX ARCHIVE ENGINE

Status: `CANONICAL SPECIFICATION / V0.1`

## Principle

> THE ARCHIVE DOES NOT STORE. IT REMEMBERS.

The Archive Engine makes records, versions, relations, gaps and provenance explorable. “Remembers” means the system preserves lineage and session consequence—not that it possesses consciousness.

## Questions

- What records exist?
- How are they connected?
- What changed between versions?
- What is missing?
- Which sources disagree?
- What did this user trace during the current path?

## Inputs

- knowledge graph slice;
- source and claim ledgers;
- entity and relation registry;
- version history;
- session memory;
- rights and cultural visibility rules.

## Views

### Records

Structured list/dossier with source, class, status and rights.

### Relations

Graph, matrix or flow showing typed and certainty-aware connections.

### Versions

Timeline or layered comparison preserving changed, added, removed and unresolved material.

### Absence

Explicit missing records, unknown dates, inaccessible sources and authorization boundaries.

### Session trace

Relations and sources opened during the current journey.

## Interactions

- open record;
- trace relation;
- compare versions;
- filter by claim class;
- reveal contradiction;
- inspect source;
- preserve a record in session memory;
- suggest a source or correction.

## Visual grammar

The Archive may use:

- dossier layout;
- evidence flower;
- relation constellation;
- memory topography;
- temporal organism;
- woven flow;
- explicit empty region.

Selection comes from the question and corpus, not visual preference.

## Memory writes

```yaml
archive_memory:
  records_opened: []
  relations_traced: []
  versions_compared: []
  contradictions_seen: []
  sources_opened: []
  records_preserved: []
```

## Rights behavior

A restricted record may appear as:

- existence known, content hidden;
- authorization required;
- community-controlled access;
- completely omitted when even existence is sensitive.

The system must not create a seductive “locked secret” treatment that encourages extraction of protected knowledge.

## Existing implementation migration

Relevant current implementation candidates include:

- archive records and dossier components in `wenu-frontend`;
- `KodexSystemLog`, `KodexSystemFooter` and metadata rails;
- the existing `kodexUniverse.js` entity/status registry;
- the Archive scene recipe in `src/lib/kodex/grammar.ts`.

Migration requires semantic review because existing generated metadata may be atmospheric rather than evidentiary.

## Return contribution

The Archive provides:

- path trace;
- sources and records encountered;
- relations carried into the artifact;
- contradictions and gaps;
- a connected unseen record for re-entry.
