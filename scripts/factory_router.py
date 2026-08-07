#!/usr/bin/env python3
"""Deterministic KODEX Factory work-packet router.

V1 intentionally uses explicit rules instead of learned routing. It accepts a
JSON work packet plus optional JSON factory state and returns a JSON routing
decision. The public YAML worker registry is used as an allow-list for worker
profile names without requiring an external YAML dependency.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
WORKER_REGISTRY = ROOT / "ops/factory/WORKER_REGISTRY.yaml"

COMPLEXITIES = {"C0", "C1", "C2", "C3", "C4", "C5"}
MODALITIES = {
    "DATA_INGESTION",
    "RESEARCH_EVIDENCE",
    "CANON_REVIEW",
    "PURE_RUNTIME_LOGIC",
    "UI_INTEGRATION",
    "VISUAL_SPEC",
    "VISUAL_ENGINE",
    "ACCESSIBILITY",
    "PERFORMANCE",
    "VISUAL_QA",
    "SUBSYSTEM_INTEGRATION",
    "RELEASE_AUDIT",
    "PROCESS_ANALYTICS",
    "NOTIFICATION",
}

BASE_ROUTES: dict[str, tuple[str, str, list[str]]] = {
    "DATA_INGESTION": (
        "HIGH_VOLUME_LOW_COST_WORKER",
        "RESEARCH_EVIDENCE_AGENT",
        ["SOURCE_ADMISSION", "SCHEMA_VALIDATION", "DETERMINISTIC_REGENERATION"],
    ),
    "RESEARCH_EVIDENCE": (
        "RESEARCH_EVIDENCE_AGENT",
        "ORCHESTRATOR",
        ["SOURCE_PROVENANCE", "CLAIM_EVIDENCE", "EPISTEMIC_BOUNDARY"],
    ),
    "CANON_REVIEW": (
        "RESEARCH_EVIDENCE_AGENT",
        "ORCHESTRATOR",
        ["CANON_DIFF_REVIEW", "EPISTEMIC_BOUNDARY", "CULTURAL_RIGHTS_REVIEW"],
    ),
    "PURE_RUNTIME_LOGIC": (
        "BOUNDED_CODING_AGENT",
        "LONG_CONTEXT_ARCHITECT",
        ["UNIT_TESTS", "DETERMINISM", "CANON_INVARIANTS"],
    ),
    "UI_INTEGRATION": (
        "BOUNDED_CODING_AGENT",
        "LONG_CONTEXT_ARCHITECT",
        ["BUILD", "ACCESSIBILITY", "MOBILE", "REGRESSION"],
    ),
    "VISUAL_SPEC": (
        "MULTIMODAL_VISUAL_SPEC",
        "ORCHESTRATOR",
        ["VISUAL_PASSPORT", "PROVENANCE_BOUNDARY", "FALLBACK_DEFINED"],
    ),
    "VISUAL_ENGINE": (
        "BOUNDED_CODING_AGENT",
        "MULTIMODAL_VISUAL_SPEC",
        ["VISUAL_PASSPORT_MATCH", "RESOURCE_CLEANUP", "PERFORMANCE", "FALLBACK"],
    ),
    "ACCESSIBILITY": (
        "BOUNDED_CODING_AGENT",
        "ORCHESTRATOR",
        ["KEYBOARD", "TOUCH", "REDUCED_MOTION", "NON_COLOR_MEANING"],
    ),
    "PERFORMANCE": (
        "BOUNDED_CODING_AGENT",
        "LONG_CONTEXT_ARCHITECT",
        ["BUILD", "RESOURCE_CLEANUP", "PERFORMANCE_EVIDENCE"],
    ),
    "VISUAL_QA": (
        "MULTIMODAL_VISUAL_SPEC",
        "ORCHESTRATOR",
        ["TARGET_CAPTURES", "MOBILE", "VISUAL_REGRESSION"],
    ),
    "SUBSYSTEM_INTEGRATION": (
        "LONG_CONTEXT_ARCHITECT",
        "BOUNDED_CODING_AGENT",
        ["BUILD", "INTEGRATION_TESTS", "DEPENDENCY_RECONCILIATION", "REGRESSION"],
    ),
    "RELEASE_AUDIT": (
        "ORCHESTRATOR",
        "LONG_CONTEXT_ARCHITECT",
        ["ACCESSIBILITY", "PERFORMANCE", "PROVENANCE", "RIGHTS", "ROLLBACK", "HUMAN_RELEASE_GATE"],
    ),
    "PROCESS_ANALYTICS": (
        "ORCHESTRATOR",
        "LONG_CONTEXT_ARCHITECT",
        ["EVIDENCE_TRACEABILITY", "METRIC_REPRODUCIBILITY"],
    ),
    "NOTIFICATION": (
        "OPERATIONS_NOTIFICATION_AGENT",
        "ORCHESTRATOR",
        ["EVENT_SCHEMA", "NO_SECRET_PAYLOAD", "NO_AUTHORIZATION_INFERENCE"],
    ),
}


def load_profile_names(path: Path = WORKER_REGISTRY) -> set[str]:
    """Extract top-level profile keys from the simple public YAML registry.

    This is deliberately not a general YAML parser. It only recognizes keys
    indented two spaces beneath the literal `profiles:` section.
    """

    names: set[str] = set()
    in_profiles = False
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        if raw_line.strip() == "profiles:":
            in_profiles = True
            continue
        if not in_profiles:
            continue
        if raw_line and not raw_line.startswith(" "):
            break
        if raw_line.startswith("  ") and not raw_line.startswith("    "):
            stripped = raw_line.strip()
            if stripped.endswith(":"):
                names.add(stripped[:-1])
    return names


def _string_list(value: Any) -> list[str]:
    if value is None:
        return []
    if not isinstance(value, list) or not all(isinstance(item, str) for item in value):
        raise ValueError("expected a list of strings")
    return value


def _running_packets(state: dict[str, Any]) -> list[dict[str, Any]]:
    running = state.get("running_packets", [])
    if not isinstance(running, list):
        raise ValueError("factory_state.running_packets must be a list")
    return [item for item in running if isinstance(item, dict)]


def _select_route(modality: str, complexity: str) -> tuple[str, str, list[str], list[str]]:
    producer, reviewer, gates = BASE_ROUTES[modality]
    reasons = [f"base route for {modality}"]

    if modality == "DATA_INGESTION" and complexity == "C2":
        producer = "BOUNDED_CODING_AGENT"
        reviewer = "RESEARCH_EVIDENCE_AGENT"
        reasons.append("C2 ingestion uses bounded coding producer")

    if complexity in {"C3", "C4"} and modality in {
        "PURE_RUNTIME_LOGIC",
        "UI_INTEGRATION",
        "VISUAL_ENGINE",
        "ACCESSIBILITY",
        "PERFORMANCE",
        "SUBSYSTEM_INTEGRATION",
    }:
        producer = "LONG_CONTEXT_ARCHITECT"
        reviewer = "BOUNDED_CODING_AGENT"
        reasons.append("C3/C4 implementation reserved for long-context integration")

    if complexity == "C5":
        producer = "ORCHESTRATOR"
        reviewer = "LONG_CONTEXT_ARCHITECT"
        if "HUMAN_RELEASE_GATE" not in gates:
            gates = [*gates, "HUMAN_RELEASE_GATE"]
        reasons.append("C5 requires release supervision and human gate")

    if complexity in {"C0", "C1"} and modality == "DATA_INGESTION":
        reasons.append("safe C0/C1 ingestion routed to high-volume profile")

    if modality in {"VISUAL_SPEC", "VISUAL_ENGINE", "VISUAL_QA"}:
        reasons.append("visual-heavy packet includes multimodal specification/review path")

    if complexity in {"C2", "C3", "C4", "C5"} and producer == reviewer:
        reviewer = "ORCHESTRATOR" if producer != "ORCHESTRATOR" else "LONG_CONTEXT_ARCHITECT"
        reasons.append("C2+ producer/reviewer separation enforced")

    return producer, reviewer, gates, reasons


def route_packet(packet: dict[str, Any], factory_state: dict[str, Any] | None = None) -> dict[str, Any]:
    """Return a deterministic routing decision for one bounded work packet."""

    state = factory_state or {}
    packet_id = packet.get("id") or packet.get("packet_id")
    modality = packet.get("modality")
    complexity = packet.get("complexity")

    if not isinstance(packet_id, str) or not packet_id.strip():
        raise ValueError("packet id is required")
    if modality not in MODALITIES:
        raise ValueError(f"unknown modality: {modality!r}")
    if complexity not in COMPLEXITIES:
        raise ValueError(f"unknown complexity: {complexity!r}")

    dependencies = _string_list(packet.get("dependencies", []))
    may_edit = _string_list(packet.get("may_edit", []))
    read_only_context = _string_list(packet.get("read_only_context", []))
    source_inputs = _string_list(packet.get("source_inputs", []))

    completed = set(_string_list(state.get("completed_packets", [])))
    frozen = set(_string_list(state.get("frozen_dependencies", [])))
    satisfied = completed | frozen
    missing_dependencies = sorted(dep for dep in dependencies if dep not in satisfied)

    running_conflicts: list[dict[str, Any]] = []
    owned = set(may_edit)
    for running in _running_packets(state):
        running_id = running.get("packet_id") or running.get("id")
        if running_id == packet_id:
            continue
        running_files = set(_string_list(running.get("owned_files", [])))
        overlap = sorted(owned & running_files)
        if overlap:
            running_conflicts.append({"packet_id": running_id, "files": overlap})

    producer, reviewer, gates, reasons = _select_route(modality, complexity)
    profiles = load_profile_names()
    missing_profiles = sorted(profile for profile in {producer, reviewer} if profile not in profiles)
    if missing_profiles:
        raise ValueError(f"router selected profiles absent from registry: {missing_profiles}")

    reviewer_capacity = state.get("reviewer_capacity", {})
    if reviewer_capacity is None:
        reviewer_capacity = {}
    if not isinstance(reviewer_capacity, dict):
        raise ValueError("factory_state.reviewer_capacity must be an object")
    reviewer_available = reviewer_capacity.get(reviewer, 1)
    if not isinstance(reviewer_available, int):
        raise ValueError("reviewer capacity must be an integer")

    blockers: list[str] = []
    if missing_dependencies:
        blockers.append("hard_dependencies_not_ready")
    if running_conflicts:
        blockers.append("file_ownership_conflict")
    if reviewer_available <= 0:
        blockers.append("reviewer_capacity_unavailable")

    required_context = list(dict.fromkeys([*read_only_context, *source_inputs]))
    decision = "BLOCKED" if blockers else "READY"

    if missing_dependencies:
        reasons.append(f"missing dependencies: {', '.join(missing_dependencies)}")
    if running_conflicts:
        reasons.append("owned files overlap with a RUNNING packet")
    if reviewer_available <= 0:
        reasons.append(f"reviewer {reviewer} has no declared capacity")
    if not blockers:
        reasons.append("dependency, ownership and reviewer-capacity gates passed")

    severity = "BLOCKED" if decision == "BLOCKED" else "INFO"
    event_status = "BLOCKED" if decision == "BLOCKED" else "READY"

    return {
        "packet_id": packet_id,
        "decision": decision,
        "producer_profile": producer,
        "reviewer_profile": reviewer,
        "required_context": required_context,
        "quality_gates": gates,
        "blockers": blockers,
        "missing_dependencies": missing_dependencies,
        "file_conflicts": running_conflicts,
        "reasons": reasons,
        "next_owner": producer if decision == "READY" else "ORCHESTRATOR",
        "factory_event": {
            "event_id": f"route:{packet_id}:{event_status}",
            "packet_id": packet_id,
            "lane": packet.get("lane", ""),
            "severity": severity,
            "source": "WORKER",
            "status": event_status,
            "summary": (
                f"{packet_id} ready for {producer}"
                if decision == "READY"
                else f"{packet_id} blocked: {', '.join(blockers)}"
            ),
            "evidence_urls": [],
            "commit_sha": "",
            "pull_request": "",
            "human_action_required": decision == "BLOCKED",
            "requested_action": "resolve routing blockers" if decision == "BLOCKED" else "",
            "blocker_class": blockers[0] if blockers else "",
            "next_owner": producer if decision == "READY" else "ORCHESTRATOR",
            "created_at": "",
            "deployment_authorized": False,
        },
    }


def _load_json(path: str) -> dict[str, Any]:
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError(f"{path} must contain a JSON object")
    return data


def main(argv: list[str] | None = None) -> int:
    args = list(sys.argv[1:] if argv is None else argv)
    if not (1 <= len(args) <= 2):
        print("usage: factory_router.py PACKET.json [FACTORY_STATE.json]", file=sys.stderr)
        return 2

    try:
        packet = _load_json(args[0])
        state = _load_json(args[1]) if len(args) == 2 else {}
        result = route_packet(packet, state)
    except (OSError, json.JSONDecodeError, ValueError) as exc:
        print(f"factory router error: {exc}", file=sys.stderr)
        return 1

    print(json.dumps(result, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
