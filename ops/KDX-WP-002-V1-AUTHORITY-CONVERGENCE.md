# KDX-WP-002 — V1 authority convergence and Creative Universe execution

Status: IMPLEMENTED IN ISOLATED BRANCH / TEST EXECUTION NOT VERIFIED / NO MERGE / NO DEPLOY
Date: 2026-10-16
Owner for creator approval: Ocín

## Source precedence
1. Native Truth Ledger
2. 08J seven-scene canon and September 23 interpretation guard
3. Latest Decision Log
4. Current Product Authority (00E)
5. Exact-SHA code and test evidence

## Why this change
The PR #96 candidate declared SEVEN_SCENE_CORRIDOR in PROJECT_MANIFEST while its machine-readable A–Y graph still claimed canonical current authority. The context validator checked alphabetic invariants but did not reject that contradiction. The October 8/9 00E checkpoint identified this gap.

## Bounded patch in this branch
- PROJECT_MANIFEST: unknown releaseBranch is null and explicitly NEEDS_CONFIRMATION.
- data/experience-graph.json: preserved historical body, reclassified HISTORICAL_RESEARCH_ONLY and implementationAuthority=false.
- data/alphabet-topology.json: preserved historical body, reclassified HISTORICAL_RESEARCH_ONLY and implementationAuthority=false.
- scripts/validate_context.py: retain historic A–Y structural checks; separately verify current seven-scene V1 and reject active historical authority.
- tests/test_v1_authority.py: positive and negative fixture-level tests.

No frontend code, scene design, assets, protected originals, permissions, deployments or production routes modified. No PR opened.

## How to test (not executed by this work session)
Run from a clean local checkout of this branch, using only the checked-out repository:
```sh
python3 -m unittest discover -s tests -p 'test_v1_authority.py' -v
python3 scripts/validate_context.py
```
Then run existing CI context integrity and inspect exact checkout SHA. Do not interpret a green CI status as creator visual approval or deployment.

## Acceptance
- Exactly 7 macro-scenes: THRESHOLD, PROLOGUE, DESCENT, ARCHIVE, MACHINE, COSMOLOGY, RETURN.
- Offering not a macro-scene; HEART resides within ARCHIVE.
- A–Y preserved as historical research without V1 implementation authority.
- A hypothetical active A–Y graph fails validation.
- Reintroduced unverified release branch fails validation.
- Deployment remains BLOCKED; explicit APROBAR DEPLOY required.
- Old data readers audited before integration; this patch does not establish external runtime compatibility.

## Open blockers
1. Read-only exact current PR head and CI provenance for #96 and #165.
2. Physical Mac Mini worktrees, unpushed files and public deploy artifact provenance.
3. Dependency audit for data/experience-graph.json and releaseBranch before promotion.
4. THRESHOLD sustained-hold parity; Sentinel symlink/realpath protections.
5. Source rights KDX-CORPUS-014 and restricted editing permissions.
6. Creator visual acceptance and seven-scene device QA.

## NEXT — KDX-WP-003 / VISUAL MASTER
A separate, reference-led visual and UX system for the public entry, seven scenes, Cosmos, and external apps / games / motion laboratories. Protect scene authority. Art first, information second, contextual controls third. Compare governed references + wireframes, classify KEEP / REFINE / MISSING, validate desktop/mobile/reduced motion. Do not redesign or deploy without creator signoff.

## Production rule
IMPLEMENTED != TESTED != CREATOR_APPROVED != MERGED != DEPLOYED.
