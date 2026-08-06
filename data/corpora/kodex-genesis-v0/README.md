# KODEX Genesis Archive — Seed Corpus

Status: `PROPOSED SEED / NOT YET APPROVED AS THE PUBLIC V0 CORPUS`

## Central question

> How did KODEX change from a visual language into a living information system?

This seed contains only directly verified public repository records, directly inspected package checksums and conservative claims derived from those records.

## Files

```text
sources.json
claims.json
entities.json
relations.json
```

## Admission boundary

Included:

- public GitHub repository records at explicit refs and blob SHAs;
- canonical repository documents;
- directly inspected package checksums;
- recovered source code already committed to the public repository;
- narrow factual claims supported by those sources.

Excluded:

- raw private conversations;
- personal information;
- copyrighted reference images;
- restricted cultural materials;
- reported packages without inspected bytes;
- spiritual/scientific claims without evidence;
- interpretations presented as observations.

## Current limitations

- this is not the complete KODEX history;
- commit chronology and package creation dates still require fuller ingestion;
- many generated packages are archive-verified but not runtime-validated;
- no cultural corpus has been admitted;
- no public-user contribution data exists;
- the corpus has not yet received ADR-0005 approval.

## Intended use

- exercise the core-reference algorithm;
- prototype OBSERVE and REMEMBER paths;
- build the first Archive interface;
- test source, claim and relation inspection;
- generate a path artifact without placeholder telemetry.

## Truth boundary

Every claim in `claims.json` declares a KODEX claim class. Generated visualization geometry is `SYNTHETIC`; repository and checksum facts are `OBSERVED`; editorial conclusions must be `INTERPRETATION`.
