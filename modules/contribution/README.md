# KODEX CONTRIBUTION ENGINE

Status: `CANONICAL SPECIFICATION / V0.2`

## Purpose

Convert passive consumption into accountable contribution without exposing private reflection, bypassing moderation or turning KODEX into an engagement feed.

## Contribution families

```text
KNOWLEDGE
  SOURCE SUGGESTION
  CORRECTION
  ANNOTATION
  TRANSLATION
  CULTURAL REVIEW
  ACCESSIBILITY REPORT

CREATIVE
  CODE
  VISUAL INTERPRETATION
  PUBLIC TEXT TRACE
  PUBLIC VECTOR DRAWING
```

Public traces are implemented through `modules/public-wall/README.md`. They are optional after Return and do not replace evidence-bearing contributions.

## Required fields

```yaml
contribution:
  id: ""
  type: ""
  content: ""
  source_links: []
  attribution_preference: NAMED | ANONYMOUS | PRIVATE
  rights_confirmation: false
  public_permission: false
  cultural_context: ""
  moderation_status: PENDING
  origin_node: ""
  public_artifact_id: null
```

## Consent

Before submission, display exactly:

- the complete content that will be sent;
- whether attribution is included;
- whether publication permission is granted;
- applicable rights confirmation;
- whether session or artifact context is attached;
- how the contribution may be reviewed, rejected, hidden or removed;
- how withdrawal works when supported.

Private reflection is never transformed into a contribution automatically.

## Moderation states

```text
DRAFT
PRIVATE_PREVIEW
PENDING
NEEDS_CONTEXT
APPROVED
REJECTED
WITHDRAWN
PUBLISHED
HIDDEN_BY_REPORTS
REMOVED
```

## Public-wall contribution boundary

Text and drawings submitted to THE COMMONS:

- require exact private preview;
- require explicit public-display and rights confirmation;
- enter a moderation queue;
- may be anonymous or named;
- do not carry private session history by default;
- expose report and withdrawal paths;
- are not stored as Git commits;
- are never ranked by popularity.

## Repository integration

Code and documentation contributions may open a GitHub issue or pull-request path. Cultural corrections must support private review when public discussion could expose restricted material.

Public wall entries use a separate moderated database/API layer. Only schemas, public policies and implementation code belong in GitHub.

## Memory writes

Only the action, contribution ID and known status enter session memory by default—not full private content.

```text
contribution_started
contribution_submitted
contribution_id
moderation_status_known
```

## Return contribution

Return may offer a contribution relevant to the actual path:

- correct the source just viewed;
- suggest evidence for an unresolved gap;
- translate the record encountered;
- inspect or improve the code that generated the artifact;
- enter THE COMMONS to write, draw or observe.

THE COMMONS appears only after the personal Return is complete, so public contribution never becomes a condition for finishing the journey.

## Public-content safety

Public free-form content requires:

- rate limiting;
- spam and obvious-abuse screening;
- human moderation path;
- report action;
- flood and duplicate detection;
- personal-information warning;
- removal and withdrawal states;
- accessible public display;
- outage behavior that preserves private local export.

## Prohibited behavior

- dark patterns encouraging submission;
- automatic public posting;
- training-data claims not stated in policy;
- publishing rights-unclear material;
- exposing rejected or private content;
- attaching a private path without separate consent;
- gamifying quantity of contributions as social worth;
- likes, follower counts, streaks or popularity rankings;
- treating community correction as free extraction without credit;
- AI rewriting a visitor's public message without an explicit separate action.
