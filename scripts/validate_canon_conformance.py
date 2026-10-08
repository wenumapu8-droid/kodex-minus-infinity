#!/usr/bin/env python3
"""KODEX-infinity canon conformance validator.

`validate_context.py` proves that the canonical files exist and agree with each
other. It cannot prove that an executable experience exists. This validator
closes that gap by separating two different kinds of truth:

1. STRUCTURAL CONFORMANCE
   Contradictions between canon, registries and QA material. These are always
   failures and exit non-zero.

2. SLICE CAPABILITY READINESS
   The ten `firstExecutableSlice.requiredCapabilities` declared in
   PROJECT_MANIFEST.json, probed against actual registry and fixture evidence.
   While the manifest declares `TARGET_NOT_COMPLETE`, unmet capabilities are
   reported rather than failed: an honest ledger, not a red build.

The drift guard is the point of the script. The moment any file claims the
slice is complete, every capability must be backed by evidence or the run
fails. This mechanizes the canonical invariant:

    "Documentation does not count as implemented runtime."

Usage:
    python scripts/validate_canon_conformance.py
    python scripts/validate_canon_conformance.py --strict   # unmet => exit 1
"""

from __future__ import annotations

import argparse
import json
import string
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

try:
    import yaml
except ModuleNotFoundError:  # pragma: no cover - dependency is declared in CI
    print(
        "canon conformance requires PyYAML (pip install pyyaml)",
        file=sys.stderr,
    )
    raise SystemExit(2)

ROOT = Path(__file__).resolve().parents[1]

EXPECTED_LETTERS = list(string.ascii_uppercase[:25])
ENTRY = "A"
HEART = "M"
TERMINAL = "Y"
INTERMEDIATE_LETTERS = [
    letter for letter in EXPECTED_LETTERS if letter not in {ENTRY, HEART, TERMINAL}
]

MANIFEST_PATH = "PROJECT_MANIFEST.json"
TOPOLOGY_PATH = "data/alphabet-topology.json"
GRAPH_PATH = "data/experience-graph.json"
SPEC_PATH = "experiences/vertical-slice-v0/spec.yaml"
FIXTURE_PATH = "experiences/vertical-slice-v0/qa/trajectory-fixture.v0.json"

INCOMPLETE_STATUS = "TARGET_NOT_COMPLETE"

EPISTEMIC_STATUSES = {
    "VERIFIED",
    "CANONICAL",
    "INFERRED",
    "SPECULATIVE",
    "NEEDS_CONFIRMATION",
    "DEPRECATED",
}

FIXTURE_REQUIRED_AUTHORITY = "NON_CANONICAL_QA_FIXTURE"
FIXTURE_REQUIRED_CONCEPT_AUTHORITY = "UNASSIGNED_PENDING_CREATOR_APPROVAL"

# Vocabulary that canon forbids from any runtime or QA surface. Pseudo-metrics
# and visitor ranking are rejected directions, not implementation details.
FORBIDDEN_SUBSTRINGS = (
    "score",
    "ranking",
    "readiness",
    "coherence",
    "autonavigate",
    "autonavigation",
    "dwellweight",
)

ENGINE_PATH = "packages/core-reference/src/kodex-alphabet.mjs"
ENGINE_REQUIRED_EXPORTS = (
    "createAlphabetJourney",
    "availableEdges",
    "commitTransition",
    "heartPortalState",
    "enterHeart",
    "exitHeart",
    "canConvergeToY",
    "deriveReturn",
    "trajectorySignature",
)

MET = "MET"
UNMET = "UNMET"


@dataclass(frozen=True)
class Capability:
    id: str
    status: str
    reason: str


def load_json(relative_path: str) -> Any:
    return json.loads((ROOT / relative_path).read_text(encoding="utf-8"))


def load_yaml(relative_path: str) -> Any:
    return yaml.safe_load((ROOT / relative_path).read_text(encoding="utf-8"))


def read_text(relative_path: str) -> str | None:
    path = ROOT / relative_path
    if not path.is_file():
        return None
    return path.read_text(encoding="utf-8")


# Free-text documentation. Prose is allowed to name a forbidden practice in
# order to prohibit it; identifiers are not.
PROSE_KEYS = frozenset(
    {"purpose", "boundaries", "note", "notes", "label", "description", "rationale"}
)


def collect_identifiers(node: Any) -> list[str]:
    """Flatten keys and identifier-bearing string values, skipping prose.

    The forbidden-vocabulary scan is about what a fixture *declares*, not about
    what its documentation *forbids*: `"nothing here ranks or scores a visitor"`
    is a guardrail, while a field named `coherenceScore` is a violation.
    """
    found: list[str] = []
    if isinstance(node, dict):
        for key, value in node.items():
            found.append(str(key))
            if str(key) in PROSE_KEYS:
                continue
            found.extend(collect_identifiers(value))
    elif isinstance(node, list):
        for item in node:
            found.extend(collect_identifiers(item))
    elif isinstance(node, str):
        found.append(node)
    return found


# ---------------------------------------------------------------------------
# Structural conformance (always fatal)
# ---------------------------------------------------------------------------


def check_canon_structure(errors: list[str]) -> dict[str, Any]:
    """Verify canon/registry agreement and return the loaded documents."""
    documents: dict[str, Any] = {}

    for label, path, loader in (
        ("manifest", MANIFEST_PATH, load_json),
        ("topology", TOPOLOGY_PATH, load_json),
        ("graph", GRAPH_PATH, load_json),
        ("spec", SPEC_PATH, load_yaml),
    ):
        try:
            documents[label] = loader(path)
        except (OSError, json.JSONDecodeError, yaml.YAMLError) as exc:
            errors.append(f"{path} is unreadable: {exc}")
            documents[label] = None

    manifest = documents.get("manifest")
    topology = documents.get("topology")
    spec = documents.get("spec")

    if isinstance(topology, dict):
        node_ids = [
            node.get("id")
            for node in topology.get("nodes", [])
            if isinstance(node, dict)
        ]
        if node_ids != EXPECTED_LETTERS:
            errors.append(
                f"{TOPOLOGY_PATH} nodes must be A through Y in canonical order"
            )

    if isinstance(manifest, dict):
        slice_block = manifest.get("firstExecutableSlice")
        if not isinstance(slice_block, dict):
            errors.append(f"{MANIFEST_PATH} firstExecutableSlice must be an object")
        else:
            capabilities = slice_block.get("requiredCapabilities")
            if not isinstance(capabilities, list) or not capabilities:
                errors.append(
                    f"{MANIFEST_PATH} firstExecutableSlice.requiredCapabilities "
                    "must be a non-empty list"
                )

    if isinstance(spec, dict):
        topology_block = spec.get("topology")
        if isinstance(topology_block, dict):
            if topology_block.get("entry") != ENTRY:
                errors.append(f"{SPEC_PATH} topology.entry must be {ENTRY}")
            if topology_block.get("completed_journey_terminal") != TERMINAL:
                errors.append(
                    f"{SPEC_PATH} topology.completed_journey_terminal must be {TERMINAL}"
                )
            if topology_block.get("heart_mandatory") is not False:
                errors.append(f"{SPEC_PATH} topology.heart_mandatory must be false")

    return documents


def check_fixture_structure(fixture: Any, errors: list[str]) -> None:
    """A QA fixture must never be able to pose as canon."""
    if fixture is None:
        return

    if not isinstance(fixture, dict):
        errors.append(f"{FIXTURE_PATH} must be a JSON object")
        return

    if fixture.get("authority") != FIXTURE_REQUIRED_AUTHORITY:
        errors.append(
            f"{FIXTURE_PATH} must declare authority {FIXTURE_REQUIRED_AUTHORITY!r}; "
            "a QA fixture may not claim canonical or coordinate authority"
        )

    if fixture.get("conceptAssignmentAuthority") != FIXTURE_REQUIRED_CONCEPT_AUTHORITY:
        errors.append(
            f"{FIXTURE_PATH} must declare conceptAssignmentAuthority "
            f"{FIXTURE_REQUIRED_CONCEPT_AUTHORITY!r}"
        )

    if fixture.get("coordinateRegistry") != TOPOLOGY_PATH:
        errors.append(
            f"{FIXTURE_PATH} coordinateRegistry must reference {TOPOLOGY_PATH}"
        )

    nodes = fixture.get("nodes")
    if not isinstance(nodes, list) or not nodes:
        errors.append(f"{FIXTURE_PATH} nodes must be a non-empty list")
        nodes = []

    seen: set[str] = set()
    for node in nodes:
        if not isinstance(node, dict):
            errors.append(f"{FIXTURE_PATH} every node must be an object")
            continue
        coordinate = node.get("coordinate")
        if coordinate not in EXPECTED_LETTERS:
            errors.append(
                f"{FIXTURE_PATH} node coordinate {coordinate!r} is outside A through Y"
            )
            continue
        if coordinate in seen:
            errors.append(f"{FIXTURE_PATH} duplicate node for coordinate {coordinate}")
        seen.add(coordinate)

        if node.get("conceptIds"):
            errors.append(
                f"{FIXTURE_PATH} node {coordinate} assigns conceptIds; "
                "B through X concept assignment requires CREATOR_APPROVAL"
            )
        if node.get("epistemicStatus") not in EPISTEMIC_STATUSES:
            errors.append(
                f"{FIXTURE_PATH} node {coordinate} has an invalid epistemicStatus"
            )

    edges = fixture.get("edges")
    if not isinstance(edges, list) or not edges:
        errors.append(f"{FIXTURE_PATH} edges must be a non-empty list")
        edges = []

    for edge in edges:
        if not isinstance(edge, dict):
            errors.append(f"{FIXTURE_PATH} every edge must be an object")
            continue
        edge_id = edge.get("id", "<unnamed>")
        for endpoint in ("from", "to"):
            if edge.get(endpoint) not in seen:
                errors.append(
                    f"{FIXTURE_PATH} edge {edge_id} {endpoint} "
                    f"{edge.get(endpoint)!r} has no declared node"
                )

    lowered = {value.lower() for value in collect_identifiers(fixture)}
    for token in FORBIDDEN_SUBSTRINGS:
        hits = sorted(value for value in lowered if token in value)
        if hits:
            errors.append(
                f"{FIXTURE_PATH} contains forbidden ranking/pseudo-metric "
                f"vocabulary {token!r} in {hits[:3]}"
            )


# ---------------------------------------------------------------------------
# Capability probes
# ---------------------------------------------------------------------------


def reachable_from(entry: str, edges: list[dict[str, Any]]) -> set[str]:
    adjacency: dict[str, set[str]] = {}
    for edge in edges:
        source = edge.get("from")
        target = edge.get("to")
        if isinstance(source, str) and isinstance(target, str):
            adjacency.setdefault(source, set()).add(target)

    seen = {entry}
    stack = [entry]
    while stack:
        current = stack.pop()
        for neighbour in adjacency.get(current, set()):
            if neighbour not in seen:
                seen.add(neighbour)
                stack.append(neighbour)
    return seen


def is_strictly_ascending(letters: list[str]) -> bool:
    return all(earlier < later for earlier, later in zip(letters, letters[1:]))


def probe_engine(spec: Any) -> Capability:
    """The coordinate engine is evidence in its own right, fixture or not."""
    engine_source = read_text(ENGINE_PATH)
    if engine_source is None:
        return Capability(
            id="Y_DERIVED_FROM_COMPLETE_EVENT_TRACE",
            status=UNMET,
            reason=f"no coordinate engine at {ENGINE_PATH}",
        )

    required_outputs: list[str] = []
    if isinstance(spec, dict):
        coordinate_contracts = spec.get("coordinate_contracts")
        if isinstance(coordinate_contracts, dict):
            terminal_contract = coordinate_contracts.get(TERMINAL)
            if isinstance(terminal_contract, dict):
                required_outputs = [
                    item
                    for item in terminal_contract.get("required_outputs", [])
                    if isinstance(item, str)
                ]

    missing_exports = [
        name
        for name in ENGINE_REQUIRED_EXPORTS
        if f"export function {name}" not in engine_source
    ]
    missing_outputs = [name for name in required_outputs if name not in engine_source]

    return Capability(
        id="Y_DERIVED_FROM_COMPLETE_EVENT_TRACE",
        status=MET if not missing_exports and not missing_outputs else UNMET,
        reason=(
            f"engine present; missing exports {missing_exports or 'none'}; "
            f"missing {TERMINAL} outputs {missing_outputs or 'none'}"
        ),
    )


def probe_capabilities(
    fixture: Any,
    spec: Any,
    minimum_signatures: int,
) -> dict[str, Capability]:
    """Probe each declared capability against real evidence."""
    results: dict[str, Capability] = {}

    engine_capability = probe_engine(spec)
    results[engine_capability.id] = engine_capability

    def record(capability_id: str, met: bool, reason: str) -> None:
        results[capability_id] = Capability(
            id=capability_id,
            status=MET if met else UNMET,
            reason=reason,
        )

    if not isinstance(fixture, dict):
        absent = f"no QA trajectory fixture at {FIXTURE_PATH}"
        for capability_id in (
            "COMMON_ENTRY_AT_A",
            "CONNECTED_INTERMEDIATE_SUBSET",
            "MULTIPLE_NONALPHABETICAL_TRAJECTORIES",
            "AT_LEAST_THREE_MULTI_EXIT_DECISION_MOMENTS",
            "LOOPS_AND_MUTATED_REVISITS",
            "M_REACHABLE_FROM_MORE_THAN_ONE_REGION",
            "PATH_DEPENDENT_ARTIFACT",
            "PROVENANCE_AND_UNCERTAINTY_ACCESS",
            "KEYBOARD_TOUCH_REDUCED_MOTION_AND_NON_WEBGL_EQUIVALENCE",
        ):
            record(capability_id, False, absent)
        return results

    nodes = [node for node in fixture.get("nodes", []) if isinstance(node, dict)]
    edges = [edge for edge in fixture.get("edges", []) if isinstance(edge, dict)]
    trajectories = [
        item for item in fixture.get("trajectories", []) if isinstance(item, dict)
    ]
    node_by_coordinate = {
        node.get("coordinate"): node
        for node in nodes
        if isinstance(node.get("coordinate"), str)
    }

    minimum_scope = {}
    if isinstance(spec, dict) and isinstance(spec.get("minimum_scope"), dict):
        minimum_scope = spec["minimum_scope"]
    required_intermediates = int(minimum_scope.get("consequential_coordinates", 6))

    # 1 - every declared journey begins at A.
    bad_entries = [
        item.get("id")
        for item in trajectories
        if (item.get("letters") or [None])[0] != ENTRY
    ]
    record(
        "COMMON_ENTRY_AT_A",
        bool(trajectories) and not bad_entries,
        f"{len(trajectories)} trajectories declared, "
        f"{len(bad_entries)} not starting at {ENTRY}",
    )

    # 2 - enough intermediate coordinates are actually reachable from A.
    reachable = reachable_from(ENTRY, edges)
    reachable_intermediates = sorted(reachable & set(INTERMEDIATE_LETTERS))
    record(
        "CONNECTED_INTERMEDIATE_SUBSET",
        len(reachable_intermediates) >= required_intermediates,
        f"{len(reachable_intermediates)}/{required_intermediates} required "
        f"intermediate coordinates reachable from {ENTRY}: "
        f"{''.join(reachable_intermediates) or 'none'}",
    )

    # 3 - more than one route that is not alphabetical order.
    nonalphabetical = [
        item.get("id")
        for item in trajectories
        if not is_strictly_ascending(
            [letter for letter in item.get("letters", []) if isinstance(letter, str)]
        )
    ]
    record(
        "MULTIPLE_NONALPHABETICAL_TRAJECTORIES",
        len(nonalphabetical) >= 2,
        f"{len(nonalphabetical)} non-alphabetical trajectories "
        f"(2 required): {nonalphabetical[:4]}",
    )

    # 4 - at least three reachable coordinates offer more than one exit.
    exits: dict[str, int] = {}
    for edge in edges:
        source = edge.get("from")
        if isinstance(source, str):
            exits[source] = exits.get(source, 0) + 1
    multi_exit = sorted(
        letter
        for letter, count in exits.items()
        if count >= 2 and letter in reachable and letter != TERMINAL
    )
    record(
        "AT_LEAST_THREE_MULTI_EXIT_DECISION_MOMENTS",
        len(multi_exit) >= 3,
        f"{len(multi_exit)}/3 reachable multi-exit coordinates: "
        f"{''.join(multi_exit) or 'none'}",
    )

    # 5 - a loop exists and a revisit mutates state.
    looping = [
        item.get("id")
        for item in trajectories
        if len(item.get("letters", [])) != len(set(item.get("letters", [])))
    ]
    mutating = sorted(
        coordinate
        for coordinate, node in node_by_coordinate.items()
        if node.get("mutatesOnRevisit") is True
    )
    record(
        "LOOPS_AND_MUTATED_REVISITS",
        bool(looping) and bool(mutating),
        f"{len(looping)} looping trajectories, "
        f"{len(mutating)} coordinates declaring mutated revisits",
    )

    # 6 - the Heart is approachable from more than one region.
    heart_regions = sorted(
        {
            node_by_coordinate.get(edge.get("from"), {}).get("region")
            for edge in edges
            if edge.get("to") == HEART
        }
        - {None}
    )
    record(
        "M_REACHABLE_FROM_MORE_THAN_ONE_REGION",
        len(heart_regions) >= 2,
        f"{len(heart_regions)}/2 distinct regions reach {HEART}: "
        f"{heart_regions or 'none'}",
    )

    # 8 - distinct routes produce distinct artifacts.
    signatures = [
        item.get("signature")
        for item in trajectories
        if isinstance(item.get("signature"), str) and item.get("signature")
    ]
    unique_signatures = set(signatures)
    record(
        "PATH_DEPENDENT_ARTIFACT",
        len(unique_signatures) >= minimum_signatures
        and len(unique_signatures) == len(signatures),
        f"{len(unique_signatures)} unique of {len(signatures)} declared "
        f"signatures, {minimum_signatures} required",
    )

    # 9 - provenance and uncertainty are reachable at every coordinate.
    without_provenance = sorted(
        coordinate
        for coordinate, node in node_by_coordinate.items()
        if "sourceIds" not in node
        or node.get("epistemicStatus") not in EPISTEMIC_STATUSES
        or node.get("rightsStatus") is None
    )
    record(
        "PROVENANCE_AND_UNCERTAINTY_ACCESS",
        not without_provenance,
        "every coordinate exposes sourceIds, epistemicStatus and rightsStatus"
        if not without_provenance
        else f"coordinates missing provenance fields: {without_provenance}",
    )

    # 10 - non-pointer equivalence for every transition.
    accessibility = fixture.get("accessibility")
    accessibility = accessibility if isinstance(accessibility, dict) else {}
    missing_equivalents = [
        edge.get("id")
        for edge in edges
        if not isinstance(edge.get("accessibility"), dict)
        or not edge["accessibility"].get("keyboard")
        or not edge["accessibility"].get("reducedMotion")
    ]
    fixture_flags = [
        flag
        for flag in ("keyboard", "touch", "reducedMotion", "nonWebglEquivalent")
        if accessibility.get(flag) is not True
    ]
    record(
        "KEYBOARD_TOUCH_REDUCED_MOTION_AND_NON_WEBGL_EQUIVALENCE",
        not missing_equivalents and not fixture_flags,
        f"{len(missing_equivalents)} edges without keyboard/reduced-motion "
        f"equivalence; fixture flags missing {fixture_flags or 'none'}",
    )

    return results


# ---------------------------------------------------------------------------
# Drift guard, report and entry point
# ---------------------------------------------------------------------------


def check_claim_drift(
    manifest: Any,
    capabilities: dict[str, Capability],
    errors: list[str],
    notices: list[str],
) -> None:
    """Refuse any claim of completion that evidence does not support."""
    if not isinstance(manifest, dict):
        return

    slice_block = manifest.get("firstExecutableSlice")
    if not isinstance(slice_block, dict):
        return

    declared_status = slice_block.get("status")
    unmet = sorted(
        capability.id
        for capability in capabilities.values()
        if capability.status == UNMET
    )

    if declared_status != INCOMPLETE_STATUS and unmet:
        errors.append(
            f"{MANIFEST_PATH} firstExecutableSlice.status is {declared_status!r} "
            f"while {len(unmet)} capabilities have no evidence: {unmet}. "
            "Documentation does not count as implemented runtime."
        )

    if declared_status == INCOMPLETE_STATUS and not unmet:
        notices.append(
            f"every declared capability now has evidence while {MANIFEST_PATH} "
            f"still says {INCOMPLETE_STATUS}. Promotion is a creator decision, "
            "not a validator decision."
        )

    declared_capabilities = {
        item
        for item in slice_block.get("requiredCapabilities", [])
        if isinstance(item, str)
    }
    unprobed = sorted(declared_capabilities - set(capabilities))
    if unprobed:
        errors.append(
            f"{MANIFEST_PATH} declares capabilities with no probe in this "
            f"validator: {unprobed}. Add a probe or remove the claim."
        )

    orphan_probes = sorted(set(capabilities) - declared_capabilities)
    if orphan_probes:
        errors.append(
            f"this validator probes capabilities absent from {MANIFEST_PATH}: "
            f"{orphan_probes}"
        )


def render_report(
    capabilities: dict[str, Capability],
    errors: list[str],
    notices: list[str],
    declared_status: Any,
) -> str:
    lines = ["KODEX canon conformance", ""]
    lines.append(f"firstExecutableSlice.status = {declared_status}")
    lines.append("")
    lines.append("capability readiness:")
    for capability_id in sorted(capabilities):
        capability = capabilities[capability_id]
        lines.append(f"  [{capability.status:<5}] {capability.id}")
        lines.append(f"            {capability.reason}")

    met = sum(1 for item in capabilities.values() if item.status == MET)
    lines.append("")
    lines.append(f"readiness: {met}/{len(capabilities)} capabilities with evidence")

    if notices:
        lines.append("")
        lines.append("notices:")
        lines.extend(f"  - {notice}" for notice in notices)

    if errors:
        lines.append("")
        lines.append("structural conformance errors:")
        lines.extend(f"  - {error}" for error in errors)
    else:
        lines.append("")
        lines.append("structural conformance: passed")

    return "\n".join(lines)


def run(strict: bool = False, as_json: bool = False) -> int:
    errors: list[str] = []
    notices: list[str] = []

    documents = check_canon_structure(errors)
    manifest = documents.get("manifest")
    spec = documents.get("spec")

    fixture: Any = None
    if (ROOT / FIXTURE_PATH).is_file():
        try:
            fixture = load_json(FIXTURE_PATH)
        except (OSError, json.JSONDecodeError) as exc:
            errors.append(f"{FIXTURE_PATH} is unreadable: {exc}")

    check_fixture_structure(fixture, errors)

    minimum_signatures = 8
    declared_status: Any = None
    if isinstance(manifest, dict) and isinstance(
        manifest.get("firstExecutableSlice"), dict
    ):
        slice_block = manifest["firstExecutableSlice"]
        declared_status = slice_block.get("status")
        minimum_signatures = int(
            slice_block.get("minimumValidationTrajectorySignatures", 8)
        )

    capabilities = probe_capabilities(fixture, spec, minimum_signatures)
    check_claim_drift(manifest, capabilities, errors, notices)

    unmet = [item for item in capabilities.values() if item.status == UNMET]

    if as_json:
        payload = {
            "declaredStatus": declared_status,
            "capabilities": [
                {
                    "id": capabilities[key].id,
                    "status": capabilities[key].status,
                    "reason": capabilities[key].reason,
                }
                for key in sorted(capabilities)
            ],
            "notices": notices,
            "errors": errors,
        }
        print(json.dumps(payload, indent=2, sort_keys=True))
    else:
        print(render_report(capabilities, errors, notices, declared_status))

    if errors:
        return 1
    if strict and unmet:
        return 1
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--strict",
        action="store_true",
        help="exit non-zero when any capability lacks evidence",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        dest="as_json",
        help="emit a machine-readable report",
    )
    args = parser.parse_args(argv)
    return run(strict=args.strict, as_json=args.as_json)


if __name__ == "__main__":
    raise SystemExit(main())
