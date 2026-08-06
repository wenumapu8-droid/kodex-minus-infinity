# KODEX−∞ INTEGRATION MATRIX

Status: `CANONICAL OPERATING MODEL / V0.1`

Date: `2026-08-06`

## System of record by domain

| Domain | System of record | Allowed writes | Prohibited use |
|---|---|---|---|
| Canon, schemas, architecture | `kodex-minus-infinity` | reviewed branch + PR | parallel private canon presented as current |
| Runtime and scenes | `wenu-frontend` | feature branches + PR | direct production edits |
| Asset originals | Google Drive | control folders, reviewed metadata | destructive cleanup without checksum and approval |
| Private context and curation | Obsidian vault | reviewed local notes | automatic public sync |
| Production plan | Linear project | milestones, issues, dependencies, status | using issue state as proof that code works |
| Public community traces | future Commons database | moderated API | Git commits as message storage |
| AI/oracle provider | provider adapter | bounded requests | hard dependency for base experience |
| Voice | prerecorded + adapter fallback | approved scripts/audio | cloned recognizable character voice |

## Current connected resources

### GitHub

```text
Canonical: wenumapu8-droid/kodex-minus-infinity
Canonical branch: chore/canonical-bootstrap
Canonical draft PR: #2
Implementation: wenumapu8-droid/wenu-frontend
Verified implementation base: feature/kodex-depth-engine
```

### Google Drive

```text
Kodex warehouse: 1zsE-nWBw6-JNZRepXeSm-Dr81n4ibw-D
Mixed book root: 1rjXSHRBwJhwiRVxKrEsvatugA7CU1fbT
0cin portfolio source: 1v2ujUFmOjhVrGkC7ylsj-SDEAsz2fS1x
Specialized portfolio: 1_lTMZhA9kvX-pT_1CNgnS3Psw6aqe9lu
Image bank: 1DjJjqbKRFCPCHQC41hTDY0_yrwo-4b9I
Control folder: 1JIDOlPf5WGr3-NMp3lmiMib7IMWRbylY
```

Control subfolders:

```text
01_REGISTRY
02_REVIEW_QUEUE
03_APPROVED_EXPORTS
04_DUPLICATE_REVIEW
05_RIGHTS_CULTURAL_REVIEW
```

### Linear

```text
Team: Kodex
Project: KODEX−∞ — Vertical Slice v0
Project ID: 926479e0-b700-4b9f-8ca2-2fbf288e153f
Parent delivery issue: KOD-18
```

Milestones:

```text
M0 — Canon + Inventory
M1 — Interaction Runtime
M2 — Vertical Journey
M3 — Voice, Audio + Artifact
M4 — THE COMMONS
M5 — QA + Release Gate
```

## Integration flows

### Asset promotion

```text
Drive original
→ metadata inventory
→ duplicate / rights / cultural review
→ stable KDX-ASSET ID
→ approved export or runtime reference
→ GitHub registry update
→ Linear implementation issue
→ scene integration PR
```

### Canon change

```text
new idea or reference
→ private note / discussion
→ evidence and conflict check
→ ADR or canon diff
→ canonical PR review
→ work packet
→ Linear task
→ implementation PR
```

### Runtime change

```text
Linear issue
→ implementation branch
→ code + tests + screenshots
→ PR
→ canonical registry/state update when needed
→ QA gate
```

### Public contribution

```text
private composer
→ exact preview
→ explicit consent
→ validation + rate limit
→ moderation queue
→ approved public API
→ wall display
→ report or withdrawal
```

## Automation allowed now

- read-only Drive inventory;
- checksums after approved file materialization;
- GitHub branch/PR documentation;
- Linear milestone and issue synchronization;
- CI validation of schemas and reference algorithms;
- preparation of draft work packets;
- local/non-production prototypes.

## Automation blocked now

- Drive deletion or duplicate consolidation;
- public upload of mixed Book/0cin material;
- automatic rights clearance;
- automatic moderation approval;
- merges to canonical `main` without review;
- production deployment;
- storing provider secrets in repositories;
- publishing raw Obsidian or conversation material.

## Secrets architecture

Provider credentials belong in deployment-managed environment variables, never Drive notes, public GitHub files or client bundles.

Required future variable families may include:

```text
ORACLE_PROVIDER
ORACLE_API_KEY
TTS_PROVIDER
TTS_API_KEY
COMMONS_DATABASE_URL
COMMONS_SERVICE_KEY
MODERATION_PROVIDER
MODERATION_API_KEY
```

Names are placeholders until providers are selected. No secret currently exists in this matrix.

## Release gate

A production release requires all of:

- canonical PR reviewed and merged;
- curated corpus approved;
- vertical slice build passing;
- mobile and accessibility evidence;
- provenance and rights review;
- voice/audio fallback;
- Commons moderation and privacy review if included;
- rollback plan;
- exact authorization phrase `APROBAR DEPLOY`.
