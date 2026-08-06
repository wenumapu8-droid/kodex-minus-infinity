#!/usr/bin/env python3
"""Validate KODEX M1 node recipes without third-party dependencies.

This validator checks project invariants that JSON Schema alone cannot express.
It does not canonize proposed coordinate assignments.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

LETTERS = tuple(chr(code) for code in range(ord("A"), ord("Y") + 1))
LETTER_SET = set(LETTERS)
CANONICAL_COORDINATES = {"A", "M", "Y"}
PROPOSED_ASSIGNMENT_COORDINATES = {"B", "C", "H", "K"}


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def validate_registry(repo_root: Path) -> list[str]:
    errors: list[str] = []

    topology_path = repo_root / "data" / "alphabet-topology.json"
    registry_path = repo_root / "data" / "m1-vertical-slice-node-recipes.json"
    schema_path = repo_root / "schemas" / "node-recipe.schema.json"

    for path in (topology_path, registry_path, schema_path):
        if not path.exists():
            errors.append(f"missing required file: {path.relative_to(repo_root)}")

    if errors:
        return errors

    topology = load_json(topology_path)
    registry = load_json(registry_path)
    schema = load_json(schema_path)

    if tuple(topology.get("letters", [])) != LETTERS:
        errors.append("alphabet-topology.json must define the complete A–Y coordinate set")

    if registry.get("coordinateAuthority") != "data/alphabet-topology.json":
        errors.append("node recipe registry must reference data/alphabet-topology.json")

    if registry.get("creatorApprovalRequiredForAssignments") is not True:
        errors.append("creator approval must remain required for coordinate assignments")

    if schema.get("title") != "KODEX−∞ Node Recipe Registry":
        errors.append("node recipe schema title is missing or unexpected")

    recipes = registry.get("recipes", [])
    if not isinstance(recipes, list) or not recipes:
        errors.append("registry must contain at least one recipe")
        return errors

    coordinates = [recipe.get("coordinate") for recipe in recipes]
    duplicates = sorted({coordinate for coordinate in coordinates if coordinates.count(coordinate) > 1})
    if duplicates:
        errors.append(f"duplicate coordinate recipes: {', '.join(duplicates)}")

    invalid_coordinates = sorted({coordinate for coordinate in coordinates if coordinate not in LETTER_SET})
    if invalid_coordinates:
        errors.append(f"invalid coordinates: {', '.join(invalid_coordinates)}")

    recipe_by_coordinate = {recipe.get("coordinate"): recipe for recipe in recipes}

    for coordinate in CANONICAL_COORDINATES:
        recipe = recipe_by_coordinate.get(coordinate)
        if not recipe:
            errors.append(f"missing canonical coordinate recipe: {coordinate}")
            continue
        if recipe.get("assignmentStatus") != "CANONICAL":
            errors.append(f"{coordinate} must remain CANONICAL")

    for coordinate in PROPOSED_ASSIGNMENT_COORDINATES:
        recipe = recipe_by_coordinate.get(coordinate)
        if not recipe:
            errors.append(f"missing proposed vertical-slice coordinate: {coordinate}")
            continue
        if recipe.get("assignmentStatus") not in {
            "NEEDS_CREATOR_APPROVAL",
            "PROPOSED_FOR_VERTICAL_SLICE",
        }:
            errors.append(f"{coordinate} may not be presented as canonical before creator approval")

    m_recipe = recipe_by_coordinate.get("M", {})
    if m_recipe.get("structuralRole") != "OPTIONAL_DISTRIBUTED_HEART_INVARIANT":
        errors.append("M must remain the optional distributed Heart invariant")
    if m_recipe.get("graph", {}).get("portalToM", {}).get("state") != "NOT_APPLICABLE":
        errors.append("M may not contain another portal to M")

    y_recipe = recipe_by_coordinate.get("Y", {})
    if y_recipe.get("presentationMode") != "TRACE_COMPOSITE":
        errors.append("Y must remain a trace-derived composite rather than a forced organism family")
    if y_recipe.get("organism") is not None:
        errors.append("Y organism must remain null until a trace compositor is explicitly implemented")

    world_ids: set[str] = set()
    m_edges = 0
    for recipe in recipes:
        coordinate = recipe.get("coordinate", "?")
        world_ids.update(recipe.get("worldIds", []))

        actions = recipe.get("interaction", {}).get("meaningfulActions", [])
        for action in actions:
            if not action.get("memoryWrites"):
                errors.append(f"{coordinate} action {action.get('id', '?')} lacks memory writes")

        for edge in recipe.get("graph", {}).get("exits", []):
            target = edge.get("target")
            if target not in LETTER_SET:
                errors.append(f"{coordinate} edge targets invalid coordinate {target!r}")
            if target == "M":
                m_edges += 1

        organism = recipe.get("organism")
        if organism and organism.get("implementationStatus") == "TESTED":
            errors.append(f"{coordinate} may not claim TESTED without recorded QA evidence")

        accessibility = recipe.get("accessibility", {})
        for required_flag in (
            "keyboard",
            "touch",
            "reducedMotion",
            "motionOff",
            "nonVisualAlternative",
            "immediateExit",
        ):
            if accessibility.get(required_flag) is not True:
                errors.append(f"{coordinate} accessibility.{required_flag} must be true")

    if len(world_ids.intersection({"memory-world", "machine-world", "cosmology-world", "artifact-world"})) < 2:
        errors.append("M1 must connect at least two semantic worlds")

    if m_edges < 2:
        errors.append("M1 must make M approachable from more than one region")

    signatures = registry.get("trajectorySignatures", [])
    if len(signatures) < 8:
        errors.append("M1 requires at least eight reproducible trajectory signatures")

    has_m_route = False
    has_no_m_route = False
    has_mutated_revisit = False
    has_post_y_reentry = False

    for signature in signatures:
        signature_id = signature.get("id", "?")
        route = signature.get("route", [])
        if not route or route[0] != "A":
            errors.append(f"trajectory {signature_id} must begin at A")
        if "Y" not in route:
            errors.append(f"trajectory {signature_id} must include Y")
        if signature.get("mVisited") != ("M" in route):
            errors.append(f"trajectory {signature_id} mVisited does not match route")

        has_m_route = has_m_route or "M" in route
        has_no_m_route = has_no_m_route or "M" not in route
        has_mutated_revisit = has_mutated_revisit or any(str(item).endswith("′") for item in route)
        if "Y" in route and route.index("Y") < len(route) - 1:
            has_post_y_reentry = True

    if not has_m_route:
        errors.append("M1 requires at least one route through M")
    if not has_no_m_route:
        errors.append("M1 requires at least one complete route without M")
    if not has_mutated_revisit:
        errors.append("M1 requires at least one mutated revisit")
    if not has_post_y_reentry:
        errors.append("M1 requires at least one explicit post-Y re-entry signature")

    return errors


def main() -> int:
    repo_root = Path(__file__).resolve().parents[1]
    errors = validate_registry(repo_root)

    if errors:
        print("KODEX node recipe validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("KODEX node recipe validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
