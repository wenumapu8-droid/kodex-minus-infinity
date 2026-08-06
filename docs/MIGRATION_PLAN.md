# KODEX−∞ Controlled Migration Plan

Status: `APPROVED / NOT YET EXECUTED`

## Source and destination

- Canonical destination: `wenumapu8-droid/kodex-minus-infinity`
- Existing implementation source: `wenumapu8-droid/wenu-frontend`
- Local research/context source: `/Users/user1/memory/kodex`
- Prototype material under `/Users/user1/memory/kodex/prototype/` is research, not the verified production frontend.

## Preservation rule

Migration is additive and non-destructive. Preserve original files, branches, paths and repository history. Do not delete, reset, clean, overwrite or simplify existing work to make migration easier.

## Required inventory fields

```yaml
artifact:
  id: "ART-"
  original_repository: ""
  original_path: ""
  original_ref: ""
  checksum: ""
  file_type: ""
  size: 0
  created_at: ""
  modified_at: ""
  canonical_status: REFERENCE
  rights_status: UNKNOWN
  privacy_status: PUBLIC
  cultural_status: STANDARD
  relationships: []
  proposed_destination: ""
  migration_decision: PENDING
```

Relationships must use one of:

- `CONFIRMED`
- `INFERRED`
- `SUGGESTED`
- `UNRESOLVED`

File relationships may include:

- `DUPLICATE_OF`
- `DERIVED_FROM`
- `VARIANT_OF`
- `SUPERSEDES`
- `CONFLICTS_WITH`
- `IMPLEMENTS`
- `DOCUMENTS`

## Migration sequence

### 1. Repository inventory

Inventory without changing source files:

- KODEX routes;
- Astro components;
- CSS and design tokens;
- JavaScript and TypeScript engines;
- shaders;
- SVG and raster assets;
- generated animations and ZIP packages;
- documentation and prompts;
- tests and telemetry;
- references and third-party material.

### 2. Provenance and rights review

Determine:

- origin and author;
- source branch or conversation;
- whether the file is original, generated or third-party;
- redistribution permission;
- cultural or privacy sensitivity;
- whether the file belongs in public or private storage.

### 3. Classification

Assign one canonical status:

- `CANONICAL`
- `APPROVED`
- `EXPERIMENTAL`
- `REFERENCE`
- `SUPERSEDED`
- `DEPRECATED`
- `PRIVATE`
- `RIGHTS_UNCLEAR`

### 4. Architecture mapping

Map each approved artifact to:

- experience node;
- engine or module;
- information class;
- runtime package;
- source registry;
- final repository role.

### 5. Copy with provenance

Copy only approved material to a migration branch. Preserve original filenames where meaningful and record source path, source commit and checksum.

### 6. Validate

- compare checksums;
- build and test applicable code;
- verify links and assets;
- review mobile, accessibility and reduced-motion behavior;
- verify no secret, private or restricted material entered the public repository.

### 7. Human review

Open a pull request with:

- inventory summary;
- files copied;
- files intentionally excluded;
- conflicts and unresolved items;
- rights and cultural review;
- validation results;
- rollback path.

## Repository-role decision

Until a later ADR changes it:

- this repository holds canon, public methods, reusable engines and future KODEX application architecture;
- `wenu-frontend` remains the current implementation source;
- no source implementation is deleted after copying;
- no deployment occurs during migration.

## Completion criteria

Migration is complete only when every copied artifact has verifiable origin, status, rights, destination and relation to the experience graph.
