#!/usr/bin/env python3
"""Validate the canonical KODEX context package without external dependencies."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = [
    "START_HERE.md",
    "SKILL.md",
    "AGENTS.md",
    "PROJECT_MANIFEST.json",
    "context/MASTER_CONTEXT.md",
    "context/PROTOTYPE_AND_CODE_INVENTORY.md",
    "context/CONVERSATION_DECISIONS.md",
    "context/REJECTED_DIRECTIONS.md",
    "canon/KODEX_CANON.md",
    "canon/KODEX_EPISTEMIC_STANDARD.md",
    "architecture/KODEX_ALGORITHM.md",
    "architecture/RUNTIME_ARCHITECTURE.md",
    "architecture/SESSION_MEMORY_AND_PATHS.md",
    "product/CURRENT_STATE.md",
    "product/EXPERIENCE_ARCHITECTURE.md",
    "experiences/vertical-slice-v0/README.md",
    "experiences/vertical-slice-v0/spec.yaml",
    "modules/MODULE_CONTRACT.md",
    "data/experience-graph.json",
    "data/alphabet-topology.json",
    "data/state-registry.json",
    "data/module-registry.json",
    "design-system/tokens/kodex.tokens.json",
    "schemas/source.schema.json",
    "schemas/claim.schema.json",
    "schemas/semantic-passport.schema.json",
    "schemas/visual-passport.schema.json",
    "schemas/session-memory.schema.json",
    "schemas/module.schema.json",
]

JSON_FILES = [
    "PROJECT_MANIFEST.json",
    "data/experience-graph.json",
    "data/alphabet-topology.json",
    "data/state-registry.json",
    "data/module-registry.json",
    "design-system/tokens/kodex.tokens.json",
    "schemas/source.schema.json",
    "schemas/claim.schema.json",
    "schemas/semantic-passport.schema.json",
    "schemas/visual-passport.schema.json",
    "schemas/session-memory.schema.json",
    "schemas/module.schema.json",
]

FORBIDDEN_PUBLIC_PATHS = [
    ".env",
    "private",
    "conversation-exports",
    "raw-conversations",
    "biometric-data",
    "restricted-cultural-material",
]

APPROVAL_PHRASE = "APROBAR DEPLOY"
EXPECTED_LETTERS = [chr(code) for code in range(ord("A"), ord("Y") + 1)]


def load_json(relative_path: str) -> Any:
    path = ROOT / relative_path
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def validate_required_files(errors: list[str]) -> None:
    for relative_path in REQUIRED_FILES:
        if not (ROOT / relative_path).is_file():
            errors.append(f"Missing required file: {relative_path}")


def validate_json(errors: list[str]) -> None:
    for relative_path in JSON_FILES:
        try:
            load_json(relative_path)
        except (OSError, json.JSONDecodeError) as exc:
            errors.append(f"Invalid JSON {relative_path}: {exc}")


def validate_manifest(errors: list[str]) -> None:
    try:
        manifest = load_json("PROJECT_MANIFEST.json")
    except (OSError, json.JSONDecodeError):
        return

    reading = manifest.get("requiredReading", [])
    for relative_path in reading:
        if not isinstance(relative_path, str) or not (ROOT / relative_path).is_file():
            errors.append(f"Manifest requiredReading target missing: {relative_path!r}")

    deployment = manifest.get("deployment", {})
    if deployment.get("status") != "BLOCKED":
        errors.append("PROJECT_MANIFEST deployment.status must remain BLOCKED during bootstrap")
    if deployment.get("approvalPhrase") != APPROVAL_PHRASE:
        errors.append("PROJECT_MANIFEST deployment approval phrase is incorrect")

    invariants = manifest.get("invariants", [])
    if not any(APPROVAL_PHRASE in item for item in invariants if isinstance(item, str)):
        errors.append("Project invariants must preserve the deployment lock")


def validate_experience_graph(errors: list[str]) -> None:
    try:
        graph = load_json("data/experience-graph.json")
        alphabet = load_json("data/alphabet-topology.json")
    except (OSError, json.JSONDecodeError):
        return

    topology = graph.get("topology")
    if not isinstance(topology, dict):
        errors.append("Experience graph topology must be an object")
        return

    registry_path = graph.get("authoritativeCoordinateRegistry")
    if registry_path != "data/alphabet-topology.json":
        errors.append(
            "Experience graph authoritativeCoordinateRegistry must reference data/alphabet-topology.json"
        )

    letters = alphabet.get("letters", [])
    alphabet_nodes = alphabet.get("nodes", [])
    node_ids = [
        node.get("id")
        for node in alphabet_nodes
        if isinstance(node, dict) and isinstance(node.get("id"), str)
    ]

    if letters != EXPECTED_LETTERS:
        errors.append("Alphabet topology must declare every coordinate from A through Y exactly once")
    if node_ids != EXPECTED_LETTERS:
        errors.append("Alphabet topology nodes must contain A through Y in canonical order")
    if len(node_ids) != len(set(node_ids)):
        errors.append("Alphabet topology contains duplicate node IDs")

    entry = topology.get("entry")
    heart = topology.get("optionalDistributedHeart")
    terminal = topology.get("completedJourneyTerminal")

    if entry not in node_ids:
        errors.append(f"Experience graph entry coordinate missing: {entry!r}")
    if heart not in node_ids:
        errors.append(f"Experience graph optional Heart coordinate missing: {heart!r}")
    if terminal not in node_ids:
        errors.append(f"Experience graph terminal coordinate missing: {terminal!r}")

    invariants = alphabet.get("invariants", {})
    if entry != invariants.get("entry"):
        errors.append("Experience graph entry does not match alphabet topology")
    if heart != invariants.get("optionalHeart"):
        errors.append("Experience graph Heart does not match alphabet topology")
    if terminal != invariants.get("completedJourneyTerminal"):
        errors.append("Experience graph terminal does not match alphabet topology")

    if topology.get("alphabeticalTraversalRequired") is not False:
        errors.append("Alphabetical traversal must remain optional")
    if topology.get("allCoordinatesRequiredPerJourney") is not False:
        errors.append("A completed journey must not require all coordinates")
    if topology.get("heartMandatory") is not False:
        errors.append("M / Heart must remain optional")
    if topology.get("loopsAllowed") is not True:
        errors.append("The canonical graph must allow loops")
    if topology.get("mutatedRevisitsAllowed") is not True:
        errors.append("The canonical graph must allow mutated revisits")


def validate_state_registry(errors: list[str]) -> None:
    try:
        registry = load_json("data/state-registry.json")
    except (OSError, json.JSONDecodeError):
        return

    states = registry.get("states", [])
    ids = [state.get("id") for state in states if isinstance(state, dict)]
    if len(ids) != len(set(ids)):
        errors.append("State registry contains duplicate IDs")
    if len(ids) != 14:
        errors.append(f"Expected 14 functional states, found {len(ids)}")


def validate_module_registry(errors: list[str]) -> None:
    try:
        registry = load_json("data/module-registry.json")
    except (OSError, json.JSONDecodeError):
        return

    modules = registry.get("modules", [])
    ids: list[str] = []
    for module in modules:
        if not isinstance(module, dict):
            errors.append("Module registry contains a non-object module")
            continue
        module_id = module.get("id")
        module_path = module.get("path")
        if isinstance(module_id, str):
            ids.append(module_id)
        if not isinstance(module_path, str) or not (ROOT / module_path).is_file():
            errors.append(f"Module registry target missing: {module_path!r}")

    if len(ids) != len(set(ids)):
        errors.append("Module registry contains duplicate IDs")


def validate_public_boundary(errors: list[str]) -> None:
    for relative_path in FORBIDDEN_PUBLIC_PATHS:
        path = ROOT / relative_path
        if path.exists():
            errors.append(f"Forbidden public path exists: {relative_path}")

    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts:
            continue
        if path.name.startswith(".env") and path.name != ".env.example":
            errors.append(f"Potential environment secret committed: {path.relative_to(ROOT)}")


def main() -> int:
    errors: list[str] = []

    validate_required_files(errors)
    validate_json(errors)
    validate_manifest(errors)
    validate_experience_graph(errors)
    validate_state_registry(errors)
    validate_module_registry(errors)
    validate_public_boundary(errors)

    if errors:
        print("KODEX context validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("KODEX context validation passed.")
    print(f"Validated {len(REQUIRED_FILES)} required files and {len(JSON_FILES)} JSON files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
