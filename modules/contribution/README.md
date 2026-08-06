# KODEX CONTRIBUTION ENGINE

Status: `CANONICAL SPECIFICATION / V0.1`

## Purpose

Convert passive consumption into accountable contribution without exposing private reflection or bypassing moderation.

## Contribution types

```text
SOURCE SUGGESTION
CORRECTION
ANNOTATION
TRANSLATION
CODE
VISUAL INTERPRETATION
CULTURAL REVIEW
ACCESSIBILITY REPORT
```

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
```

## Consent

Before submission, display exactly:

- what content will be sent;
- whether attribution is included;
- whether publication permission is granted;
- applicable rights confirmation;
- how the contribution may be reviewed or rejected.

Private reflection is never transformed into a contribution automatically.

## Moderation states

```text
DRAFT
PENDING
NEEDS_CONTEXT
APPROVED
REJECTED
WITHDRAWN
PUBLISHED
```

## Repository integration

Code and documentation contributions may open a GitHub issue or pull-request path. Cultural corrections must support private review when public discussion could expose restricted material.

## Memory writes

Only the action and contribution ID enter session memory by default—not full private content.

## Return contribution

Return may offer a contribution relevant to the actual path:

- correct the source just viewed;
- suggest evidence for an unresolved gap;
- translate the record encountered;
- inspect or improve the code that generated the artifact.

## Prohibited behavior

- dark patterns encouraging submission;
- automatic public posting;
- training-data claims not stated in policy;
- publishing rights-unclear material;
- gamifying quantity of contributions as social worth;
- treating community correction as free extraction without credit.
