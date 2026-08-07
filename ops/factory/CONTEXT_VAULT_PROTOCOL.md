# KODEX Context Vault Bridge v1

## Purpose

Remove the legacy KODEX workstation as a single point of knowledge failure without copying its entire filesystem into public repositories.

The bridge converts local-only implementation/history into metadata, review decisions and reproducible handoffs.

## Safety law

```text
LOCAL WORKSPACE
→ METADATA SNAPSHOT
→ HUMAN/AGENT REVIEW
→ PUBLIC-SAFE HANDOFF
→ SHARED GITHUB / LINEAR
→ REPRODUCIBLE NEXT PACKET
```

Never reverse this order.

## Step 1 — Snapshot, do not migrate

From each relevant local git workspace on the legacy machine, fetch the latest canonical scripts without resetting or deleting local work, then run:

```bash
python scripts/context_vault_snapshot.py /path/to/repo \
  --output /tmp/kodex-context-vault-snapshot.json
```

The snapshot is metadata-only. Keep it outside the repository and do not commit it automatically.

## Step 2 — Review local deltas

The reviewing agent must inspect:

- current branch and HEAD;
- local branches;
- tracked modifications;
- staged files;
- untracked files;
- candidate implementation files;
- candidate canon/context files;
- media/binary items requiring provenance/rights review;
- paths flagged PRIVATE.

Do not run `git reset --hard`, `git clean`, destructive checkout, mass deletion or bulk migration.

## Step 3 — Classify every promoted candidate

Use only:

- `CANON_CANDIDATE`
- `IMPLEMENTATION_EVIDENCE`
- `HISTORICAL`
- `PRIVATE`
- `RIGHTS_REVIEW`
- `DEPRECATED`
- `DUPLICATE`

The snapshot's classification is only a hint. The reviewer owns the final classification.

## Step 4 — Promotion policy

### PRIVATE

Never promote content. Record only a safe statement that private material exists if operationally relevant.

### RIGHTS_REVIEW

Do not copy the asset until creator/rights/provenance review is complete. Preserve filename, source ref and checksum when safe.

### IMPLEMENTATION_EVIDENCE

Prefer a dedicated branch/commit/PR in the appropriate shared repository. Do not paste code into Linear as the canonical copy.

### CANON_CANDIDATE

Create a proposal/diff for creator review. Local age or repeated use does not make a concept canonical.

### HISTORICAL / DEPRECATED / DUPLICATE

Record lineage and disposition. Do not resurrect automatically.

## Step 5 — Handoff

Return a record matching `CONTEXT_VAULT_HANDOFF_SCHEMA.yaml`.

A successful handoff allows another machine/model to reproduce the next task using GitHub + Linear without access to hidden local conversational context.

## Required Claude Context-Vault behavior

The legacy-workspace agent acts as an archaeologist, not an integrator.

It must:

1. preserve local state;
2. identify evidence;
3. distinguish verified file/git facts from interpretation;
4. surface duplicates and abandoned branches;
5. isolate private/rights-sensitive material;
6. propose the smallest safe promotion packet;
7. stop before canon changes, destructive actions, merge or deployment.

## Definition of done

The legacy machine is progressively de-risked when every item needed for current production has one of:

- shared commit/PR evidence;
- canonical/Linear record;
- explicit migration plan;
- explicit private/rights-review exclusion;
- explicit deprecated/duplicate disposition.

Copying the whole machine is not the objective. Shared reproducibility is.
