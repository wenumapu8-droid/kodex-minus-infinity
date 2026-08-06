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
