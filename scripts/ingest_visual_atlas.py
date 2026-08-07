#!/usr/bin/env python3
"""
KODEX-∞ · Bridge 1 — Visual Atlas + Research Corpus → grafo canónico.

Cierra KOD-19.

Entrada : export markdown del Google Sheet
          "07A_KODEX_VISUAL_ATLAS_MASTER — Inventario, Nodos y Conexiones"
          (Drive id 1RLhA2xmApx1YDfHIeWjIqlYz17OHkuxFbfUXejzcS_4)
Salida  : nodes.json · edges.json · sources.json · claims.json
          anomalies.json · ingestion-report.md

INVARIANTES
-----------
1. La hoja original es INMUTABLE. Este script nunca la escribe.
2. Los artefactos son DERIVADOS y REGENERABLES; no se editan a mano.
3. NO se inventan coordenadas A–Y. Solo A/M/Y están asignadas en el canon.
4. NO se infiere `claimClass`. Sin evidencia explícita queda `UNKNOWN`,
   conforme a canon/KODEX_EPISTEMIC_STANDARD.md ("failure behavior").
5. Las anomalías de la fuente se REGISTRAN, no se corrigen.
6. La salida es DETERMINISTA: mismo input ⇒ mismo hash.

Uso:
    python3 ingest_visual_atlas.py <atlas.txt|atlas.md> -o <outdir>
"""

import argparse
import hashlib
import json
import pathlib
import re
import sys
from collections import Counter, defaultdict

# ---------------------------------------------------------------------------
# CANON
# ---------------------------------------------------------------------------

# canon/KODEX_EPISTEMIC_STANDARD.md — clases de claim (cerradas, 10).
CLAIM_CLASSES = {
    "OBSERVED", "DERIVED", "ESTIMATED", "PROXY", "INTERPRETATION",
    "TESTIMONY", "SPECULATION", "MYTHOPOETIC", "SYNTHETIC", "UNKNOWN",
}

# data/experience-graph.json — únicas coordenadas asignadas por el canon.
# LETRA = COORDENADA ESTABLE. LETRA ≠ ESCENA ≠ TEMA ≠ IMAGEN.
# El resto de B–L y N–X se deriva en Bridge 2 (KODEX_ALPHABET_MATRIX), no aquí.
CANONICAL_COORDINATES = {
    "THRESHOLD": "A",
    "ORIGIN": "A",
    "HEART": "M",
    "RETURN": "Y",
}

# Clasificación funcional de escenas (instrucción de Ocin, 2026-08-07).
SCENE_FUNCTION = {
    "GLOBAL DESIGN SYSTEM": "TRANSVERSAL_LAYER",
    "GLOBAL VISUAL SYSTEM": "TRANSVERSAL_LAYER",
    "GLOBAL NAVIGATION": "TRANSVERSAL_LAYER",
    "NAVIGATION": "TRANSVERSAL_LAYER",
    "EDITORIAL SYSTEM": "TRANSVERSAL_LAYER",
    "COMMONS": "SYSTEM_MODULE",
    "ALPHABET": "SYSTEM_MODULE",
    "SYMBOL ENGINE": "SYSTEM_MODULE",
    "SIGNAL VORTEX": "SYSTEM_MODULE",
    "BODY": "CONTENT_FAMILY",
    "SIGNAL": "CONTENT_FAMILY",
    "SOURCE": "CONTENT_FAMILY",
    "GENESIS": "CONTENT_FAMILY",
    "LIVING SYSTEMS": "CONTENT_FAMILY",
    "LIVING ELEMENTS": "CONTENT_FAMILY",
    "LIVING": "CONTENT_FAMILY",
    "NETWORK": "CONTENT_FAMILY",
    "MUSEUM": "CONTENT_FAMILY",
}
# Escenas con coordenada canónica → NODE_CANDIDATE por definición.
# Todo lo demás sin clasificar → NEEDS_CONFIRMATION.

# Reubicación de valores que estaban en EPISTEMIC_LAYER pero no son epistemología.
# No se promueven a ninguna clase de claim: cambian de campo, no de estatus.
FIELD_REASSIGNMENT = {
    "MOD": ("domain", "MODEL_CANDIDATE"),          # probable MODEL — sin confirmar
    "ARCHIVE": ("contentFamily", "ARCHIVE"),
    "DESIGN_SYSTEM": ("systemLayer", "DESIGN_SYSTEM"),
    "BIOGRAPHY": ("sourceType", "BIOGRAPHY"),
    "SOCIAL": ("sourceType", "SOCIAL"),
    "EPISTEMIC": ("systemLayer", "EPISTEMIC"),
    "REFERENCE": ("sourceType", "REFERENCE"),
    "ORIGIN": ("contentFamily", "ORIGIN"),
    "ANC-REVIEW": ("domain", "ANC"),               # + marca de revisión, abajo
}

# Dominios de conocimiento (NO son clases de claim).
KNOWN_DOMAINS = {
    "BIO", "PHY", "PHYS", "MATH", "PSY", "PHI", "ANC", "REL", "SYM",
    "ART", "COMP", "SPEC", "ECO", "ETHNO", "ART_HISTORY",
    "CONTEMPORARY_TRIBAL_SOURCE", "KODEX",
}

MULTI_SEP = re.compile(r"[;/]")
RESEARCH_ID = re.compile(r"^R-\d+$")
RESEARCH_COLUMNS = [
    "REF_ID", "TOPIC", "CLAIM", "EPISTEMIC_LAYER", "SOURCE_TITLE",
    "SOURCE_URL", "SOURCE_TYPE", "KODEX_TRANSLATION", "RELATED_NODES",
    "LIMITATIONS", "SENSITIVITY", "STATUS",
]
# Encabezados que nunca deben aparecer como dato: delatan celdas desalineadas.
HEADER_TOKENS = {
    "SOURCE_TYPE", "IMAGE_ID", "EPISTEMIC_LAYER", "MAP_ZONE",
    "NODE_IDS", "DUPLICATE_GROUP", "CODE_MODULE",
}


def unescape(cell: str) -> str:
    """El export markdown escapa `_` y otros caracteres."""
    return re.sub(r"\\(.)", r"\1", cell).strip()


def split_multi(value: str):
    if not value:
        return []
    return [p.strip() for p in MULTI_SEP.split(value) if p.strip()]


def slug(text: str) -> str:
    s = re.sub(r"[^A-Za-z0-9]+", "-", text).strip("-").upper()
    return s[:60] or "UNKNOWN"


def parse_markdown_table(text: str):
    """
    La hoja contiene DOS familias de registros con layouts distintos:
      KDX-*  → especímenes visuales, 26 columnas (cabecera IMAGE_ID)
      R-###  → referencias de investigación, 12 columnas posicionales sin cabecera
    """
    headers, visual, research = None, [], []

    for line in text.split("\n"):
        if not line.lstrip().startswith("|"):
            continue
        cells = [unescape(c) for c in line.strip().strip("|").split("|")]
        if all(set(c) <= set(":- ") for c in cells):   # separador markdown
            continue
        nonempty = [c for c in cells if c]

        if nonempty and RESEARCH_ID.match(nonempty[0]):
            research.append(dict(zip(RESEARCH_COLUMNS, nonempty)))
            continue

        if headers is None:
            if any(c.upper().replace(" ", "_") == "IMAGE_ID" for c in cells):
                headers = [c.upper().replace(" ", "_") for c in cells]
            continue
        if not any(cells):
            continue
        row = dict(zip(headers, cells))
        if row.get("IMAGE_ID"):
            visual.append(row)

    if headers is None:
        sys.exit("ERROR: no se encontró la fila de cabecera con IMAGE_ID.")
    return headers, visual, research


def classify_epistemic(raw_codes, anomalies, record_id):
    """
    Separa el contenido de EPISTEMIC_LAYER en campos distintos.
    NUNCA devuelve una clase de claim inferida.
    """
    domains, extra, review = [], defaultdict(list), False

    for code in raw_codes:
        c = code.strip().upper().replace(" ", "_")
        if not c:
            continue
        if c in CLAIM_CLASSES:
            extra["declaredClaimClass"].append(c)
        elif c in KNOWN_DOMAINS:
            domains.append(c)
        elif c in FIELD_REASSIGNMENT:
            field, value = FIELD_REASSIGNMENT[c]
            extra[field].append(value)
            if c == "ANC-REVIEW":
                review = True
            anomalies.append({
                "type": "FIELD_MISPLACEMENT",
                "record": record_id,
                "field": "EPISTEMIC_LAYER",
                "value": c,
                "reassignedTo": field,
                "normalizedAs": value,
                "status": "NEEDS_SOURCE_FIX",
                "note": "Valor no epistemológico hallado en EPISTEMIC_LAYER; "
                        "reasignado en el derivado. La hoja no fue modificada.",
            })
        else:
            extra["unclassified"].append(c)
            anomalies.append({
                "type": "UNKNOWN_ENUM",
                "record": record_id,
                "field": "EPISTEMIC_LAYER",
                "value": c,
                "status": "NEEDS_CONFIRMATION",
            })
    return domains, dict(extra), review


def classify_scene(label, anomalies):
    """Devuelve (functionCategory, coordinate|None)."""
    up = label.strip().upper()
    if up in HEADER_TOKENS:
        anomalies.append({
            "type": "SOURCE_DATA_ANOMALY",
            "record": f"SCENE::{label}",
            "field": "SCENE",
            "value": label,
            "status": "NEEDS_SOURCE_FIX",
            "note": "Nombre de columna presente como dato: celda desalineada "
                    "en la hoja origen. Tolerado de forma determinista; "
                    "requiere corrección manual en el Sheet.",
        })
        return "SOURCE_DATA_ANOMALY", None
    coord = CANONICAL_COORDINATES.get(up)
    if coord:
        return "NODE_CANDIDATE", coord
    return SCENE_FUNCTION.get(up, "NEEDS_CONFIRMATION"), None


def build(rows, research_rows):
    nodes, edges, sources, anomalies = {}, [], {}, []
    seen_edges = set()
    stats = Counter()
    dup_groups = defaultdict(list)

    def add_edge(src, rel, dst, **extra):
        key = (src, rel, dst)
        if key in seen_edges:
            return
        seen_edges.add(key)
        edges.append({"from": src, "relation": rel, "to": dst, **extra})

    def ensure_node(nid, ntype, label, **extra):
        if nid not in nodes:
            nodes[nid] = {"id": nid, "type": ntype, "label": label, **extra}
        return nodes[nid]

    # ------------------------------------------------------------------
    # Familia visual KDX-*
    # ------------------------------------------------------------------
    # La columna IMAGE_ID aloja DOS clases de identificador:
    #   KDX-IMG-* / KDX-SCREEN-* ... → un espécimen visual por fila
    #   KDX-NODE-* / KDX-MAP-*      → especificación de nodo; varias filas por nodo
    # Colapsarlas por ID perdería filas, así que cada fila recibe un ID de registro
    # propio y se enlaza al nodo que especifica.
    occurrence = Counter()

    for row in rows:
        raw_id = row["IMAGE_ID"]
        is_node_spec = raw_id.upper().startswith(("KDX-NODE-", "KDX-MAP-"))
        occurrence[raw_id] += 1

        if is_node_spec:
            img_id = f"SPEC-{raw_id}-{occurrence[raw_id]:02d}"
            record_type = "NODE_SPEC"
            ensure_node(raw_id, "ROUTE" if "-MAP-" in raw_id.upper() else "NODE", raw_id)
            stats["node_spec_rows"] += 1
        else:
            # Un mismo ID de imagen repetido sí es una anomalía de la fuente.
            if occurrence[raw_id] > 1:
                img_id = f"{raw_id}#{occurrence[raw_id]:02d}"
                anomalies.append({
                    "type": "DUPLICATE_IMAGE_ID", "record": raw_id,
                    "field": "IMAGE_ID", "value": raw_id,
                    "status": "NEEDS_SOURCE_FIX",
                    "note": f"IMAGE_ID repetido; fila conservada como {img_id}.",
                })
            else:
                img_id = raw_id
            record_type = "VISUAL_SPECIMEN"

        title = row.get("TITLE", "")
        populated = bool(row.get("PRIMARY_CONCEPT") or row.get("NODE_IDS"))
        stats["POPULATED" if populated else "STUB"] += 1

        domains, extra, _ = classify_epistemic(
            split_multi(row.get("EPISTEMIC_LAYER", "")), anomalies, img_id)

        ensure_node(
            img_id, record_type, title,
            specifies=raw_id if is_node_spec else None,
            primaryConcept=row.get("PRIMARY_CONCEPT") or None,
            secondaryConcepts=split_multi(row.get("SECONDARY_CONCEPTS", "")),
            mapZones=split_multi(row.get("MAP_ZONE", "")),
            symbols=split_multi(row.get("SYMBOLS", "")),
            geometry=split_multi(row.get("GEOMETRY", "")),
            domains=domains,
            claimClass="UNKNOWN",          # nunca inferido
            provenance=row.get("PROVENANCE") or None,
            atlasStatus=row.get("STATUS") or None,
            nextAction=row.get("NEXT_ACTION") or None,
            ingestStatus="POPULATED" if populated else "STUB",
            **extra,
        )
        if is_node_spec:
            add_edge(img_id, "SPECIFIES", raw_id)

        for scene in split_multi(row.get("SCENE", "")):
            if not scene.strip():
                continue
            fn, coord = classify_scene(scene, anomalies)
            sid = f"KDX-SCENE-{slug(scene)}"
            ensure_node(sid, "SCENE", scene.strip().upper(),
                        functionCategory=fn, coordinate=coord)
            add_edge(img_id, "APPEARS_IN", sid)
            stats[f"scene_fn_{fn}"] += 1

        for zone in split_multi(row.get("MAP_ZONE", "")):
            zid = f"KDX-ZONE-{slug(zone)}"
            ensure_node(zid, "MAP_ZONE", zone)
            add_edge(img_id, "IN_ZONE", zid)

        for nid in split_multi(row.get("NODE_IDS", "")):
            if not nid.upper().startswith("KDX-"):
                continue
            ensure_node(nid, "ROUTE" if "-MAP-" in nid.upper() else "NODE", nid)
            add_edge(img_id, "DEPICTS", nid)

        url = row.get("SOURCE_URL", "")
        if url:
            sid = f"SRC-{slug(img_id)}"
            if url.startswith("conversation://"):
                cls, privacy, rights = "CONVERSATION_EXPORT", "PRIVATE", "UNKNOWN"
            elif "drive.google.com" in url:
                cls, privacy, rights = "IMAGE", "PRIVATE", "CLEAR"
            elif url.startswith("http"):
                cls, privacy, rights = "IMAGE", "PUBLIC", "REFERENCE_ONLY"
            else:
                cls, privacy, rights = "OTHER", "RESTRICTED", "UNKNOWN"
            cultural = "REVIEW_REQUIRED" if any(
                k in (row.get("PROVENANCE", "") + title).lower()
                for k in ("mapuche", "wenu mapu", "we tripantu", "ancestral")
            ) else "STANDARD"
            sources[sid] = {
                "id": sid, "title": title or img_id, "sourceClass": cls,
                "location": url, "rightsStatus": rights,
                "privacyStatus": privacy, "culturalStatus": cultural,
                "notes": [f"Derivado del Visual Atlas Master, fila {img_id}."],
            }
            add_edge(img_id, "SOURCED_FROM", sid)
            stats[f"cultural_{cultural}"] += 1
        else:
            stats["missing_source_url"] += 1
            anomalies.append({
                "type": "MISSING_PROVENANCE", "record": img_id,
                "field": "SOURCE_URL", "value": "", "status": "NEEDS_SOURCE_FIX",
                "note": "Sin procedencia no puede publicarse.",
            })

        if row.get("DUPLICATE_GROUP"):
            dup_groups[row["DUPLICATE_GROUP"]].append(img_id)

        if row.get("CODE_MODULE"):
            mid = f"KDX-MODULE-{slug(row['CODE_MODULE'])}"
            ensure_node(mid, "CODE_MODULE", row["CODE_MODULE"])
            add_edge(img_id, "IMPLEMENTED_BY", mid)

    for grp, members in dup_groups.items():
        for i, a in enumerate(members):
            for b in members[i + 1:]:
                add_edge(a, "DUPLICATE_OF", b, group=grp)

    # ------------------------------------------------------------------
    # Familia de investigación R-*
    # ------------------------------------------------------------------
    claims = []
    for row in research_rows:
        rid = row["REF_ID"]
        cid, sid = f"CLM-{rid}", f"SRC-{rid}"
        domains, extra, anc_review = classify_epistemic(
            split_multi(row.get("EPISTEMIC_LAYER", "")), anomalies, rid)
        sensitivity = (row.get("SENSITIVITY") or "").upper()
        stats[f"sensitivity_{sensitivity or 'UNSET'}"] += 1

        claims.append({
            "id": cid,
            "topic": row.get("TOPIC", ""),
            "statement": row.get("CLAIM", ""),
            # El canon exige evidencia para clasificar. La hoja declara
            # STATUS/SOURCE_TYPE, no una clase de claim ⇒ queda sin resolver.
            "claimClass": "UNKNOWN",
            "claimClassNextAction": "human_review_assign_canonical_claim_class",
            "domains": domains,
            "sourceDeclaredStatus": row.get("STATUS") or None,
            "sourceType": row.get("SOURCE_TYPE") or None,
            "kodexTranslation": row.get("KODEX_TRANSLATION") or None,
            "limitations": [row["LIMITATIONS"]] if row.get("LIMITATIONS") else [],
            "sensitivity": sensitivity or None,
            "culturalReviewFlag": anc_review,
            "supportedBy": sid if row.get("SOURCE_URL") else None,
            "relatedNodes": split_multi(row.get("RELATED_NODES", "")),
            **extra,
        })
        stats["claim_class_unknown"] += 1

        url = row.get("SOURCE_URL", "")
        if url:
            cultural = ("AUTHORIZATION_REQUIRED" if sensitivity == "CRITICAL"
                        else "REVIEW_REQUIRED" if sensitivity == "HIGH"
                        else "STANDARD")
            sources[sid] = {
                "id": sid,
                "title": row.get("SOURCE_TITLE") or row.get("TOPIC") or rid,
                "sourceClass": "DOCUMENT", "location": url,
                "rightsStatus": "REFERENCE_ONLY", "privacyStatus": "PUBLIC",
                "culturalStatus": cultural,
                "limitations": [row["LIMITATIONS"]] if row.get("LIMITATIONS") else [],
                "notes": [
                    f"Tipo de fuente declarado: {row.get('SOURCE_TYPE', 'n/d')}.",
                    "Derivado del Visual Atlas Master, familia R-*.",
                ],
            }
            add_edge(cid, "EVIDENCED_BY", sid)
            stats[f"cultural_{cultural}"] += 1
        else:
            stats["research_missing_url"] += 1

        for nid in split_multi(row.get("RELATED_NODES", "")):
            if nid.upper().startswith("KDX-"):
                ensure_node(nid, "NODE", nid)
                add_edge(cid, "SUPPORTS", nid)

    return nodes, edges, sources, claims, anomalies, stats, dup_groups


# ---------------------------------------------------------------------------
# VALIDACIONES
# ---------------------------------------------------------------------------

def run_checks(nodes, edges, sources, claims, visual_rows, research_rows):
    """Chequeos 3–6 exigidos antes de abrir PR."""
    results = {}

    ids = [n["id"] for n in nodes.values()]
    results["duplicate_node_ids"] = [i for i, c in Counter(ids).items() if c > 1]

    claim_ids = [c["id"] for c in claims]
    results["duplicate_claim_ids"] = [i for i, c in Counter(claim_ids).items() if c > 1]

    known = set(ids) | set(sources) | set(claim_ids)
    results["dangling_edges"] = [
        e for e in edges if e["from"] not in known or e["to"] not in known
    ]

    results["unknown_claim_class"] = sorted(
        {c["claimClass"] for c in claims} - CLAIM_CLASSES
    )
    results["nodes_with_invented_coordinate"] = [
        n["id"] for n in nodes.values()
        if n.get("coordinate") and n["coordinate"] not in {"A", "M", "Y"}
    ]

    # Reconciliación de conteo de fuentes
    expected = sum(1 for r in visual_rows if r.get("SOURCE_URL")) + \
        sum(1 for r in research_rows if r.get("SOURCE_URL"))
    results["source_count_expected"] = expected
    results["source_count_actual"] = len(sources)
    results["source_count_reconciled"] = expected == len(sources)

    return results


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("atlas")
    ap.add_argument("-o", "--outdir", default="build")
    args = ap.parse_args()

    raw = pathlib.Path(args.atlas).read_text(encoding="utf-8")
    try:
        raw = json.loads(raw)["fileContent"]
    except (json.JSONDecodeError, KeyError, TypeError):
        pass

    headers, rows, research_rows = parse_markdown_table(raw)
    nodes, edges, sources, claims, anomalies, stats, dups = build(rows, research_rows)
    checks = run_checks(nodes, edges, sources, claims, rows, research_rows)

    out = pathlib.Path(args.outdir)
    out.mkdir(parents=True, exist_ok=True)

    meta = {
        "system": "KODEX−∞",
        "artifact": "derived-from-visual-atlas-master",
        "bridge": "KOD-19 / Bridge 1",
        "sourceOfTruth": (
            "https://docs.google.com/spreadsheets/d/"
            "1RLhA2xmApx1YDfHIeWjIqlYz17OHkuxFbfUXejzcS_4"
        ),
        "regenerable": True,
        "doNotEditByHand": True,
        "coordinateAssignmentPolicy": (
            "Only A/M/Y are canonical. B–L and N–X are derived in Bridge 2 "
            "(KODEX_ALPHABET_MATRIX), never inferred from initials."
        ),
        "claimClassPolicy": (
            "claimClass is never inferred. Unresolved records stay UNKNOWN "
            "per canon/KODEX_EPISTEMIC_STANDARD.md."
        ),
    }

    def dump(name, payload):
        path = out / name
        path.write_text(
            json.dumps({**meta, **payload}, ensure_ascii=False,
                       indent=2, sort_keys=False) + "\n",
            encoding="utf-8")
        return path

    dump("nodes.json", {"count": len(nodes),
                        "nodes": sorted(nodes.values(), key=lambda n: n["id"])})
    dump("edges.json", {"count": len(edges),
                        "edges": sorted(edges, key=lambda e: (e["from"], e["relation"], e["to"]))})
    dump("sources.json", {"count": len(sources),
                          "sources": sorted(sources.values(), key=lambda s: s["id"])})
    dump("claims.json", {"count": len(claims), "claims": claims})
    dump("anomalies.json", {"count": len(anomalies),
                            "anomalies": sorted(anomalies, key=lambda a: (a["type"], a["record"]))})

    digest = hashlib.sha256()
    for name in sorted(["nodes.json", "edges.json", "sources.json",
                        "claims.json", "anomalies.json"]):
        digest.update((out / name).read_bytes())
    output_hash = digest.hexdigest()

    by_type = Counter(n["type"] for n in nodes.values())
    by_rel = Counter(e["relation"] for e in edges)
    by_fn = Counter(n.get("functionCategory") for n in nodes.values()
                    if n["type"] == "SCENE")
    by_anom = Counter(a["type"] for a in anomalies)
    sens = Counter(c["sensitivity"] for c in claims)

    lines = [
        "# INGESTION REPORT — Bridge 1 (KOD-19)",
        "",
        f"`output_sha256: {output_hash}`",
        "",
        "## Entrada",
        f"- Filas visuales (`KDX-*`): **{len(rows)}** · columnas **{len(headers)}**",
        f"- Filas de investigación (`R-*`): **{len(research_rows)}** · columnas **12**",
        f"- Pobladas **{stats['POPULATED']}** · stubs **{stats['STUB']}**",
        "",
        f"## Nodos: {len(nodes)}",
        *[f"- `{t}`: {c}" for t, c in by_type.most_common()],
        "",
        "### Escenas por categoría funcional",
        *[f"- `{k}`: {v}" for k, v in by_fn.most_common()],
        "",
        f"## Aristas: {len(edges)}",
        *[f"- `{r}`: {c}" for r, c in by_rel.most_common()],
        "",
        f"## Claims: {len(claims)}",
        *[f"- sensibilidad `{k}`: {v}" for k, v in sens.most_common()],
        f"- `claimClass: UNKNOWN` (pendiente de clasificación humana): "
        f"**{stats['claim_class_unknown']}**",
        "",
        f"## Fuentes: {len(sources)}",
        *[f"- `{k}`: {v}" for k, v in
          Counter(s["culturalStatus"] for s in sources.values()).most_common()],
        "",
        f"## Anomalías registradas: {len(anomalies)}",
        *[f"- `{t}`: {c}" for t, c in by_anom.most_common()],
        "",
        "## Chequeos previos al PR",
        f"- IDs de nodo duplicados: **{len(checks['duplicate_node_ids'])}**",
        f"- IDs de claim duplicados: **{len(checks['duplicate_claim_ids'])}**",
        f"- Aristas colgantes: **{len(checks['dangling_edges'])}**",
        f"- `claimClass` fuera del enum canónico: **{len(checks['unknown_claim_class'])}**",
        f"- Coordenadas inventadas fuera de A/M/Y: "
        f"**{len(checks['nodes_with_invented_coordinate'])}**",
        f"- Reconciliación de fuentes: "
        f"{checks['source_count_actual']}/{checks['source_count_expected']} → "
        f"**{'OK' if checks['source_count_reconciled'] else 'DESCUADRE'}**",
    ]
    (out / "ingestion-report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    (out / "checks.json").write_text(
        json.dumps({"outputSha256": output_hash, **checks},
                   ensure_ascii=False, indent=2, default=str) + "\n",
        encoding="utf-8")

    print("\n".join(lines))


if __name__ == "__main__":
    main()
