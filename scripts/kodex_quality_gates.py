#!/usr/bin/env python3
"""
KODEX-∞ · PUERTAS DE CALIDAD

Convierte las reglas del canon en un chequeo que corre solo en cada pull request.
Hasta ahora esas reglas vivían en prosa: alguien tenía que acordarse de ellas. Acá
fallan el build.

Reglas verificadas
------------------
G1  claimClass pertenece a las diez clases del canon.
G2  Ninguna coordenada fuera de A / M / Y (B–L y N–X los deriva Bridge 2).
G3  Nada con culturalStatus AUTHORIZATION_REQUIRED marcado como publicable.
G4  Todo registro publicable declara procedencia.
G5  Sin IDs duplicados.
G6  Sin aristas colgantes.
G7  Los artefactos derivados se declaran regenerables y no editables a mano.
G8  Sin pseudo-métricas prohibidas por el estándar epistémico.

Solo biblioteca estándar: el CI no debe depender de instalar nada.

Uso:
    python3 scripts/kodex_quality_gates.py [--data-dir data/atlas]
"""

import argparse
import json
import pathlib
import re
import sys

# canon/KODEX_EPISTEMIC_STANDARD.md — cerradas, son diez.
CLAIM_CLASSES = {
    "OBSERVED", "DERIVED", "ESTIMATED", "PROXY", "INTERPRETATION",
    "TESTIMONY", "SPECULATION", "MYTHOPOETIC", "SYNTHETIC", "UNKNOWN",
}

# data/experience-graph.json — únicas coordenadas asignadas hoy.
CANONICAL_COORDINATES = {"A", "M", "Y"}

CULTURAL_STATUS = {"STANDARD", "REVIEW_REQUIRED", "AUTHORIZATION_REQUIRED"}

# Valores que el estándar epistémico prohíbe mostrar sin insumos declarados.
PSEUDO_METRIC = re.compile(
    r"\b(CONSCIOUSNESS\s+\d+|COSMIC\s+COHERENCE\s+\d+|ARCHIVE\s+ENERGY\s+[\d.]+"
    r"|RETURN\s+SIGNAL\s+[\d.]+\s*Hz|EMOTIONAL\s+FREQUENCY\s+\d+)\b",
    re.IGNORECASE,
)


class Gate:
    def __init__(self):
        self.failures = []
        self.checked = []

    def check(self, gate_id, description, ok, detail=""):
        self.checked.append(gate_id)
        if ok:
            print(f"  PASS  {gate_id}  {description}")
        else:
            print(f"  FAIL  {gate_id}  {description}")
            if detail:
                for line in str(detail).splitlines()[:15]:
                    print(f"          {line}")
            self.failures.append(gate_id)


def load(path):
    if not path.exists():
        return None
    with path.open(encoding="utf-8") as fh:
        return json.load(fh)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data-dir", default="data/atlas")
    args = ap.parse_args()

    base = pathlib.Path(args.data_dir)
    gate = Gate()

    nodes_doc = load(base / "nodes.json")
    edges_doc = load(base / "edges.json")
    sources_doc = load(base / "sources.json")
    claims_doc = load(base / "claims.json")

    if nodes_doc is None:
        print(f"No hay artefactos en {base}/ — nada que verificar.")
        return 0

    nodes = nodes_doc.get("nodes", [])
    edges = edges_doc.get("edges", []) if edges_doc else []
    sources = sources_doc.get("sources", []) if sources_doc else []
    claims = claims_doc.get("claims", []) if claims_doc else []

    print(f"KODEX QUALITY GATES — {base}")
    print(f"  {len(nodes)} nodos · {len(edges)} aristas · "
          f"{len(sources)} fuentes · {len(claims)} claims\n")

    # G1 — clases de claim dentro del canon
    bad_class = sorted({
        c.get("claimClass") for c in claims
        if c.get("claimClass") not in CLAIM_CLASSES
    } | {
        n.get("claimClass") for n in nodes
        if n.get("claimClass") is not None and n.get("claimClass") not in CLAIM_CLASSES
    })
    gate.check("G1", "claimClass dentro de las diez clases canónicas",
               not bad_class, f"fuera del canon: {bad_class}")

    # G2 — ninguna coordenada inventada
    invented = sorted({
        n["coordinate"] for n in nodes
        if n.get("coordinate") and n["coordinate"] not in CANONICAL_COORDINATES
    })
    gate.check("G2", "coordenadas restringidas a A / M / Y",
               not invented,
               f"inventadas: {invented} — B–L y N–X los deriva Bridge 2")

    # G3 — el material que exige autorización no se publica
    bad_status = [s["id"] for s in sources
                  if s.get("culturalStatus") not in CULTURAL_STATUS]
    gate.check("G3a", "culturalStatus dentro del vocabulario",
               not bad_status, f"inválido en: {bad_status[:10]}")

    auth_ids = {s["id"] for s in sources
                if s.get("culturalStatus") == "AUTHORIZATION_REQUIRED"}
    leaked = [n["id"] for n in nodes
              if n.get("publishable") and n.get("sourceId") in auth_ids]
    gate.check("G3b", "nada con AUTHORIZATION_REQUIRED marcado publicable",
               not leaked, f"filtrado: {leaked[:10]}")

    # G4 — procedencia obligatoria para publicar
    sourced = {e["from"] for e in edges if e.get("relation") == "SOURCED_FROM"}
    unsourced = [n["id"] for n in nodes
                 if n.get("publishable") and n["id"] not in sourced]
    gate.check("G4", "todo publicable declara procedencia",
               not unsourced, f"sin fuente: {unsourced[:10]}")

    # G5 — sin IDs duplicados
    seen, dupes = set(), []
    for item in [*nodes, *sources, *claims]:
        if item["id"] in seen:
            dupes.append(item["id"])
        seen.add(item["id"])
    gate.check("G5", "sin IDs duplicados", not dupes, f"duplicados: {dupes[:10]}")

    # G6 — sin aristas colgantes
    dangling = [f"{e['from']} -{e['relation']}-> {e['to']}"
                for e in edges
                if e["from"] not in seen or e["to"] not in seen]
    gate.check("G6", "sin aristas colgantes", not dangling, "\n".join(dangling[:10]))

    # G7 — los derivados se declaran como tales
    undeclared = [
        name for name in ("nodes.json", "edges.json", "sources.json", "claims.json")
        if (doc := load(base / name)) is not None
        and not (doc.get("regenerable") and doc.get("doNotEditByHand"))
    ]
    gate.check("G7", "artefactos derivados declarados regenerables",
               not undeclared, f"sin declarar: {undeclared}")

    # G8 — pseudo-métricas prohibidas
    blob = json.dumps([nodes, claims], ensure_ascii=False)
    hits = sorted(set(PSEUDO_METRIC.findall(blob)))
    gate.check("G8", "sin pseudo-métricas prohibidas", not hits, f"halladas: {hits}")

    print()
    if gate.failures:
        print(f"FALLARON {len(gate.failures)} de {len(gate.checked)} puertas: "
              f"{', '.join(gate.failures)}")
        return 1
    print(f"Las {len(gate.checked)} puertas pasan.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
