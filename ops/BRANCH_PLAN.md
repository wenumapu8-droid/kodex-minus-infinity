# KODEX−∞ BRANCH PLAN

## Canonical repository

```text
main
└── chore/canonical-bootstrap   # draft PR #2
```

No implementation code should be added to canonical `main` before review.

## Implementation repository

Verified advanced base:

```text
feature/kodex-depth-engine
```

Vertical-slice branch:

```text
feature/kodex-depth-engine
└── feature/kodex-vertical-slice-v0
```

Recommended issue branches beneath or after the vertical-slice foundation:

```text
feature/kodex-interaction-runtime      # KOD-20
feature/kodex-shell-router             # KOD-21
feature/kodex-curated-corpus           # KOD-19 metadata/integration
feature/kodex-six-scene-journey        # KOD-22
feature/kodex-voice-audio-artifact
feature/kodex-commons-v0
```

Avoid long-lived parallel branches modifying the same shell or scene registry. Merge the foundation branches into the vertical-slice integration branch through reviewed PRs.

## Merge order

```text
interaction runtime
→ shell/router
→ curated corpus adapters
→ six-scene journey
→ voice/audio/artifact
→ Commons
→ QA/release candidate
```

## Deployment

Branch creation and preview builds do not authorize deployment.
