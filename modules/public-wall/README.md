# KODEX COMMONS WALL

Status: `CANONICAL SPECIFICATION / V0.1`

## Purpose

Create an optional public surface near the end of the journey where visitors can leave a short written message or a drawing, then observe the accumulated traces left by others.

Canonical name:

```text
THE COMMONS
subtitle: PUBLIC TRACE WALL
```

The Commons is not the final meaning of KODEX and not a social feed. It is a shared postscript after `RETURN / +∞`.

## Narrative position

```text
HEART
→ RETURN / +∞
→ PATH ARTIFACT + SOURCES
→ optional THE COMMONS
→ RE-ENTRY OR EXIT
```

Return still completes the personal journey. The Commons is an optional release into shared memory.

## Visual concept

A predominantly black field acts as a common substrate. Messages and drawings appear as spatial traces in carefully constrained KODEX colors.

This black field is not a regression to `−∞`. It represents the shared unknown after personal clarity: an open surface where many paths can coexist.

Initial state:

- mostly empty black field;
- one quiet instruction;
- visible `WRITE`, `DRAW` and `OBSERVE` modes;
- no forced sign-in;
- no automatic publication.

Canonical voice line:

> What you release here becomes part of the common field.

Primary actions:

```text
WRITE A TRACE
DRAW A TRACE
OBSERVE THE WALL
RETURN TO YOUR PATH
```

## Scroll exception

The Commons is the only planned canonical experience node allowed to use document-level vertical scrolling.

Reason:

- the wall grows over time;
- contributions must remain discoverable;
- chronological and relational browsing require space;
- visitors may choose to continue downward through the public archive.

The creation canvas remains viewport-sized. The public archive below it may scroll.

## Contribution modes

### Text

Proposed V0 limits:

- 1–280 Unicode characters;
- plain text only;
- line breaks allowed within a small limit;
- optional display name;
- anonymous publication supported;
- language detected only for display/filtering, not identity profiling.

### Drawing

Drawings are stored as normalized vector strokes rather than screenshots.

Proposed V0 limits:

- maximum 24 strokes;
- maximum 2,000 normalized points total;
- pressure optional and discarded when unsupported;
- line width from a constrained set;
- palette selected from approved KODEX tokens;
- undo, clear and preview required;
- no image upload in V0.

Vector storage supports responsive rendering, moderation previews and lightweight delivery.

## Entry record

```yaml
wall_entry:
  id: ""
  type: TEXT | DRAWING
  text: null
  strokes: []
  palette_token: ""
  display_name: null
  attribution: ANONYMOUS | NAMED
  created_at: ""
  language: null
  moderation_status: PENDING
  publication_status: PRIVATE_PREVIEW
  consent:
    public_display: false
    rights_confirmation: false
    policy_version: ""
  context:
    origin_node: return-plus-infinity
    path_artifact_id: null
  reports_count: 0
  removed_at: null
```

No complete private session path is attached to the public entry. A visitor may explicitly attach a public artifact ID later, but this is not the default.

## Submission sequence

```text
CREATE
→ PREVIEW
→ REVIEW WHAT WILL BE PUBLIC
→ CHOOSE ANONYMOUS OR NAMED
→ CONFIRM RIGHTS AND PUBLIC DISPLAY
→ SUBMIT TO MODERATION
→ PENDING STATE
→ APPROVED OR REJECTED
→ PUBLISHED
```

The interface must not imply that submission guarantees publication.

## Moderation

Moderation is mandatory because the surface is public and accepts free-form user-generated content.

States:

```text
DRAFT
PRIVATE_PREVIEW
PENDING
APPROVED
REJECTED
PUBLISHED
HIDDEN_BY_REPORTS
REMOVED
WITHDRAWN
```

Minimum safeguards:

- rate limiting;
- automated spam and obvious abuse screening;
- human review path;
- report action on every published trace;
- blocklist for secrets and personal contact information;
- content-size enforcement;
- duplicate/flood detection;
- deletion and withdrawal process;
- moderation audit metadata kept private;
- no public ranking, likes or follower system.

The system should warn visitors not to publish personal, confidential or dangerous information.

## Public display modes

### Living field

Recent approved traces appear in a navigable spatial field. Pointer/touch proximity may:

- bring a trace into focus;
- reveal its date and attribution choice;
- softly change neighboring colors;
- expose a relation to other traces sharing declared tags or language.

No interaction may alter the original contribution content.

### Growing archive

A scrollable chronological or curated stream displays approved traces. It supports:

- text/drawing filter;
- language filter;
- date range;
- random trace;
- accessible list view;
- report action.

### Constellation view

A future mode may group traces by explicit public tags or content-safe embeddings. It must label grouping as algorithmic and must not infer emotional, spiritual or demographic identity.

## Interaction behavior

Writing:

- text appears as live typographic matter;
- composition may react to character count, line structure and selected color;
- the system must not claim to interpret the writer's consciousness.

Drawing:

- strokes follow pointer, pen or touch;
- optional mirror, radial or trail modes are declared transformations;
- visitors can preview the exact public result;
- reduced-motion mode renders direct strokes without animated echoes.

Observing:

- cursor/touch focus may alter depth and color emphasis;
- keyboard navigation moves trace by trace;
- screen-reader view exposes an ordered list with text alternatives for drawings when provided.

## Drawing accessibility

A drawing submission may include an optional short description. Public drawings without descriptions receive a neutral generated label such as `Untitled drawing trace`; the system must not invent a semantic interpretation.

## Backend boundary

Do not store each public message as a Git commit.

Recommended provider-agnostic architecture:

```text
WEB CLIENT
→ CONTRIBUTION API
→ VALIDATION + RATE LIMIT
→ MODERATION QUEUE
→ POSTGRES-COMPATIBLE DATABASE
→ APPROVED PUBLIC API
→ OPTIONAL REAL-TIME INVALIDATION
```

Suggested endpoints:

```text
POST   /api/commons/entries
GET    /api/commons/entries?cursor=&type=&language=
GET    /api/commons/entries/:id
POST   /api/commons/entries/:id/report
POST   /api/commons/entries/:id/withdraw
GET    /api/commons/stream
```

Implementation may use REST plus server-sent events. WebSocket infrastructure is unnecessary until real-time collaboration is explicitly required.

## Data and privacy

Public:

- approved content;
- chosen attribution;
- publication date;
- selected color;
- optional public description.

Private operational metadata:

- moderation status and reason;
- abuse-prevention tokens;
- report history;
- withdrawal credential or account reference when applicable.

Do not publicly expose:

- IP address;
- precise location;
- private session path;
- email;
- device fingerprint;
- rejected content;
- moderator identity.

## Memory behavior

Session memory may store only:

```text
commons_opened
commons_mode_used
wall_entry_id_submitted
wall_entry_status_known
```

The complete message or drawing is not duplicated into session memory by default.

## Failure behavior

If the public service is unavailable:

- the visitor can still create and export a private trace locally;
- publication controls clearly show unavailable state;
- the rest of Return remains complete;
- no content is silently discarded after submission.

## Prohibited behavior

- instant unmoderated publication;
- infinite-scroll engagement optimization;
- likes, popularity rankings or streaks;
- public profiles in V0;
- attaching private journey history without separate consent;
- AI rewriting a visitor's message before publication;
- claiming drawings reveal personality or consciousness;
- using published wall content for model training without a separate explicit policy;
- allowing the Commons to replace the curated KODEX experience.

## V0 acceptance criteria

- text and vector drawing creation work with pointer, touch and keyboard-supported controls;
- preview and consent are explicit;
- moderation states are visible and truthful;
- approved traces render in spatial and accessible list views;
- archive scrolling is stable on mobile;
- rate limits, reporting and withdrawal exist;
- reduced-motion and motion-off modes are complete;
- outage fallback allows local export;
- no deployment without `APROBAR DEPLOY`.
