# KODEX−∞ OBSIDIAN VAULT BRIDGE

Status: `CANONICAL OPERATIONS SPECIFICATION / V0.1`

## Purpose

Keep the private Obsidian vault as the working warehouse and the GitHub repository as the reviewed public source of truth.

The vault may contain unfinished ideas, private reflections, source notes, visual references, package inventories and material that must never be published automatically. GitHub contains only reviewed canon, public-safe metadata, approved code and implementation contracts.

## Authority model

```text
PRIVATE OBSIDIAN VAULT
  discovery, notes, references, private context, unfinished thinking
        ↓ explicit review
CANONICAL GITHUB REPOSITORY
  approved canon, schemas, registries, code, public documentation
        ↓ implementation work packet
IMPLEMENTATION REPOSITORY
  Astro runtime, scenes, integrations and deployment candidate
```

No automated sync may bypass the review step.

## Proposed vault structure

```text
KODEX-VAULT/
├── 00_INBOX/
├── 01_CANON/
├── 02_NODES/
├── 03_WORKS/
│   ├── OCIN/
│   ├── BOOK/
│   └── KODEX/
├── 04_REFERENCES/
│   ├── VISUAL/
│   ├── AUDIO/
│   ├── INTERACTION/
│   └── INFORMATION_DESIGN/
├── 05_SOURCES/
├── 06_CLAIMS/
├── 07_RELATIONS/
├── 08_PROTOTYPES/
├── 09_PACKAGES/
├── 10_WORK_PACKETS/
├── 11_DECISIONS/
├── 12_PRIVATE_REFLECTIONS/
├── 13_CULTURAL_REVIEW/
├── 14_RIGHTS_AND_LICENSES/
├── 15_EXPORT_QUEUE/
└── 99_ARCHIVE/
```

## Required frontmatter

```yaml
---
id: KDX-NOTE-0000
title: ""
type: CANON | NODE | WORK | REFERENCE | SOURCE | CLAIM | PROTOTYPE | PACKAGE | DECISION | PRIVATE
status: INBOX | RESEARCH | REVIEW | APPROVED | REJECTED | ARCHIVED
visibility: PRIVATE | REVIEW_ONLY | PUBLIC_CANDIDATE | PUBLIC
owner: ""
created: ""
updated: ""
source_ids: []
claim_ids: []
related_nodes: []
related_works: []
repository_paths: []
rights_status: UNKNOWN | CLEAR | RESTRICTED | DO_NOT_PUBLISH
cultural_status: STANDARD | REVIEW_REQUIRED | RESTRICTED
personal_data: false
export_target: null
---
```

## Promotion workflow

```text
CAPTURE IN 00_INBOX
→ CLASSIFY
→ ADD SOURCE / RIGHTS / PRIVACY METADATA
→ LINK TO NODES, WORKS AND CLAIMS
→ HUMAN REVIEW
→ MARK PUBLIC_CANDIDATE
→ CREATE WORK PACKET OR REPOSITORY CHANGE
→ VERIFY GITHUB RESULT
→ RECORD COMMIT / PR IN VAULT NOTE
```

## What may be promoted to GitHub

- approved canonical decisions;
- public-safe summaries of conversations;
- rights-cleared original assets;
- code and technical documentation;
- package manifests and checksums;
- source and claim records suitable for publication;
- work metadata and public portfolio descriptions;
- implementation work packets.

## What must remain private by default

- raw conversation exports;
- private reflections;
- personal data;
- passwords, API keys and tokens;
- unreleased commercial binaries;
- unlicensed reference images;
- private Google Drive paths or access tokens;
- restricted cultural knowledge;
- moderation records;
- rejected public-wall content.

## Drive and asset ingestion

Google Drive folders such as `KODEX`, `Book` and `Ocin` should first be inventoried into the vault, not copied blindly into GitHub.

Each asset record should include:

```yaml
asset:
  id: ""
  drive_location: ""
  local_or_materialized_path: ""
  checksum: ""
  media_type: ""
  dimensions_or_duration: ""
  creator: ""
  creation_date: null
  rights_status: ""
  public_status: ""
  related_nodes: []
  intended_roles: []
  notes: []
```

The GitHub repository should receive metadata first. Binary migration occurs only after rights, size, format and product-delivery review.

## Repository backlink

Every promoted vault note records:

```yaml
promotion:
  repository: wenumapu8-droid/kodex-minus-infinity
  branch: ""
  path: ""
  pull_request: null
  commit_sha: ""
  promoted_at: ""
```

Every canonical GitHub document should contain stable IDs that can be linked from Obsidian.

## Model handoff rule

A model working from the vault must produce a structured work packet before changing implementation.

A model working from GitHub must not assume it can read the private vault. Missing context is declared rather than invented.

## Export queue

`15_EXPORT_QUEUE` contains only reviewed notes ready for repository action.

Suggested states:

```text
READY_FOR_CANON
READY_FOR_REGISTRY
READY_FOR_CODE
READY_FOR_ASSET_MIGRATION
BLOCKED_RIGHTS
BLOCKED_PRIVACY
BLOCKED_CULTURAL_REVIEW
EXPORTED
```

## Conflict resolution

Authority order:

```text
DIRECT FILE / BYTE INSPECTION
→ REPOSITORY FILE AT KNOWN REF
→ APPROVED VAULT NOTE WITH SOURCE
→ APPROVED CANONICAL DECISION
→ UNREVIEWED VAULT NOTE
→ RECOVERED MEMORY OR SUMMARY
```

When vault and GitHub disagree, create an erratum or decision record. Do not silently overwrite either source.

## Automation boundary

Safe future automation may:

- validate frontmatter;
- detect missing links;
- calculate checksums;
- create inventory reports;
- prepare diffs;
- open draft work packets.

Automation must not:

- publish private notes;
- approve rights or cultural status;
- upload every binary;
- merge canon changes;
- deploy;
- expose Drive or Obsidian credentials.

## Immediate setup checklist

- create the vault folders;
- add the frontmatter template;
- inventory `KODEX`, `Book` and `Ocin` without moving originals;
- assign stable asset IDs;
- classify privacy and rights;
- link high-value works to experience nodes;
- create the first reviewed export queue;
- keep deployment blocked until the exact phrase `APROBAR DEPLOY`.
