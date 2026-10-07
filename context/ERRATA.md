# KODEX−∞ CONTEXT ERRATA

Status: `CANONICAL CORRECTIONS`  
Last updated: `2026-08-05`

This file overrides conflicting earlier summaries and reported package descriptions.

## ERR-001 — Impossible Forms Python source path

Earlier recovered context stated that the actual Python source was:

```text
source/python/reference_renderer.py
```

A direct inspection of the mounted sellable archive now available in the working environment shows:

```text
Archive: KODEX_Impossible_Forms_Vol1_SELLABLE.zip
File count: 77
ZIP size: 4,396,112 bytes
Uncompressed size: 4,484,737 bytes
ZIP SHA-256: 8deb2268bc1f6e49a98a4ca79f17b4c0499831f59bbfdbbbb72b7b27cdebfeb2
Actual contained Python file: source/python/kodex_forms.py
Python file SHA-256: acf5cecf39502e0d268e9e074b14fcf98e236406bdecd76d8bb668e685c285de
```

Therefore, for the currently recovered sellable archive, the authoritative path is:

```text
source/python/kodex_forms.py
```

The earlier `reference_renderer.py` statement is treated as a superseded report unless a different historical package containing that path is later recovered and separately identified.

## Correction rule

When this file conflicts with:

- conversation summaries;
- `context/PROTOTYPE_AND_CODE_INVENTORY.md`;
- `data/registries/prototypes.yaml`;
- issue descriptions;
- old package notes;

this errata file and direct file inspection take precedence.

## General provenance rule

For package claims, authority order is:

```text
DIRECT BYTE INSPECTION + CHECKSUM
→ REPOSITORY FILE AT KNOWN REF
→ CONVERSATION FILE CONTENT
→ PACKAGE DESCRIPTION
→ MEMORY OR SUMMARY
```

A description must never override inspected bytes.

## ERR-002 — Seven-scene V1 versus alphabet-registry authority (2026-10-07)

Status: `VERIFIED CURRENT DIVERGENCE / DOCUMENTATION GUARD ONLY / NO PRODUCT PROMOTION`.

This erratum applies to the unmerged draft review candidate [kodex-minus-infinity #96](https://github.com/wenumapu8-droid/kodex-minus-infinity/pull/96), **not** to an inferred production build. Resolve its exact branch/head again before acting; the evidence below is a dated snapshot.

**Governing V1 topology:** Native `00_START_HERE` → native `03_KODEX_TRUTH_LEDGER` → Ocín-decided `08J` consolidated Canon → latest Decision Log governs **THRESHOLD → PROLOGUE → DESCENT → ARCHIVE → MACHINE → COSMOLOGY → RETURN**. A–Y / A–M–Y is preserved as historical architecture and research, not as an active parallel V1 route. Offering is post-RETURN and is not an eighth threshold.

**Verified drift in #96 at review head `13e5ad00757f403e82b63025d375585ae4b1766c`:**

- `PROJECT_MANIFEST.json` defines `currentReleaseArchitecture.type=SEVEN_SCENE_CORRIDOR` and `historicalTopology.implementationAuthority=false`, yet `repositories.implementation.releaseBranch=redesign-v2` still implies an unverified release lineage. It is **not proof of what the public host serves**.
- `data/experience-graph.json` still declares `status=CANONICAL_TOPOLOGY_PARTIAL_IMPLEMENTATION`, `topology.coordinates=A_THROUGH_Y`, and the alphabet registry as its authoritative coordinate source.
- `data/alphabet-topology.json` still declares `status=CANONICAL_STRUCTURE_PARTIAL_CONCEPT_ASSIGNMENT`; retain its records and provenance, but this label cannot be read as current V1 authority.
- `scripts/validate_context.py` still validates the alphabet-centric graph/registry. The observed **KODEX Context Integrity: success** on this candidate proves the existing checks passed, **not** that the active machine-readable topology matches the seven-scene canon.

**Correction rule:** Until the registry and validator are reconciled and both positive seven-scene and negative active-A–Y tests pass, label #96's machine-readable convergence `NOT VERIFIED`. Do not infer `TESTED`, creator acceptance, `KEEP`, merged release, or public deployment from a green context check. Do not delete A–Y history to satisfy the new rule.

**Next safe technical frontier (not executed by this documentation edit):** Preserve A–Y as versioned history, make the V1 graph/validator reject active A–Y authority, neutralize the unverified release-branch assumption without inventing a replacement, rerun context validation, then trace public host → artifact → repository/ref/build and conduct same-source seven-scene QA.

No original Ocín artwork, cultural-rights record, credentials, permissions, production code, PR integration, merge or deployment is modified by this erratum.
