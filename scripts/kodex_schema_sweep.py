#!/usr/bin/env python3
"""KODEX schema sweep — valida todo archivo JSON del repo contra los schemas.

Extiende los quality gates de Bridge 1 (data/atlas) a todo el repo:
  - schemas/ -> deben ser JSON Schema válidos (Draft 2020-12)
  - JSON de datos -> deben validar contra su schema (colecciones: elemento por elemento)
  - registries -> índices estructurales sin schema propio, marcados GAP de cobertura
  - JSON de packages que declaran $schema
  - integridad: todo .json del repo debe parsear

Uso:
    python3 scripts/kodex_schema_sweep.py
"""
import json
import pathlib
import sys

from jsonschema import Draft202012Validator

ROOT = pathlib.Path(__file__).resolve().parent.parent
PASS = 0
FAIL = 0


def check(desc, ok, detail=""):
    global PASS, FAIL
    if ok:
        PASS += 1
        print(f"[PASS] {desc}")
    else:
        FAIL += 1
        print(f"[FAIL] {desc}" + (f" — {detail}" if detail else ""))


# schema -> archivos de datos; "array": validar cada elemento, no el contenedor.
SCHEMAS = {
    "claim.schema.json": {
        "files": [
            "data/corpora/kodex-genesis-v0/claims.json",
            "data/bridges/bridge-1-v0/claims.json",
        ],
        "array": True,
    },
    # module.schema.json e interaction-passport.schema.json validan un ítem
    # spec-completo, NO el registry: se validan como schemas (files vacíos) y
    # los registries se clasifican por separado en REGISTRY_INDEXES.
    "module.schema.json": {"files": [], "array": False},
    "interaction-passport.schema.json": {"files": [], "array": False},
    "source.schema.json": {
        "files": ["data/corpora/kodex-genesis-v0/sources.json"],
        "array": True,
    },
    "semantic-passport.schema.json": {"files": [], "array": False},
    "session-memory.schema.json": {"files": [], "array": False},
    "public-wall-entry.schema.json": {"files": [], "array": False},
    "visual-passport.schema.json": {"files": [], "array": False},
}

# Registries: índices estructurales SIN schema propio (véase REPORTE 2026-08-12).
# No son datos rotos — son colecciones livianas que no tienen schema declarado.
# Decisión abierta (Ocín): (A) crear schema de registry, o (B) declararlos no-validables.
REGISTRY_INDEXES = [
    "data/module-registry.json",
    "data/interaction-registry.json",
]

PACKAGE_PAIRS = [
    (
        "packages/visual-library/assets/registry.json",
        "packages/visual-library/schemas/asset-registry.schema.json",
    ),
    (
        "packages/visual-library/recipes/journey-field.json",
        "packages/visual-library/schemas/recipe.schema.json",
    ),
]

SKIP_DIRS = {"node_modules", ".git", "dist", ".astro", "web", "standalone", "preview"}


def main():
    print("KODEX SCHEMA SWEEP\n")

    # 1. Los schemas en schemas/ son JSON Schema válidos
    for sp in sorted(SCHEMAS):
        p = ROOT / "schemas" / sp
        if not p.exists():
            check(f"schema {sp}", False, "no existe")
            continue
        try:
            s = json.loads(p.read_text(encoding="utf-8"))
            Draft202012Validator.check_schema(s)
            check(f"schema {sp}", True)
        except Exception as e:
            check(f"schema {sp}", False, str(e)[:100])

    # 2. Datos contra sus schemas
    for sp, cfg in SCHEMAS.items():
        spath = ROOT / "schemas" / sp
        s = json.loads(spath.read_text(encoding="utf-8"))
        v = Draft202012Validator(s)
        for t in cfg["files"]:
            tp = ROOT / t
            if not tp.exists():
                check(f"{t} -> {sp}", False, "no existe")
                continue
            try:
                data = json.loads(tp.read_text(encoding="utf-8"))
                items = data if cfg["array"] else [data]
                errs = []
                for i, it in enumerate(items):
                    for e in sorted(v.iter_errors(it), key=lambda e: list(e.path)):
                        errs.append(f"[{i}]{'/'.join(map(str, e.path))}: {e.message}")
                if errs:
                    check(f"{t} -> {sp} ({len(items)} items)", False,
                          f"{len(errs)} errores; primero: {errs[0][:140]}")
                else:
                    check(f"{t} -> {sp} ({len(items)} items)", True)
            except Exception as e:
                check(f"{t} -> {sp}", False, str(e)[:120])

    # 3. Registries (índices sin schema) — coherencia estructural, marcados GAP
    REGISTRY_KEY_MAP = {
        "data/module-registry.json": ("modules", "id"),
        "data/interaction-registry.json": ("primitives", "id"),
    }
    for rel, (coll_key, id_key) in REGISTRY_KEY_MAP.items():
        tp = ROOT / rel
        if not tp.exists():
            check(f"registry {rel}", False, "no existe")
            continue
        try:
            data = json.loads(tp.read_text(encoding="utf-8"))
            coll = data.get(coll_key, [])
            ids = [item.get(id_key) for item in coll if isinstance(item, dict)]
            dupes = len(ids) != len(set(ids))
            check(f"registry {rel} ({len(coll)} items)", not dupes,
                  "ids duplicados" if dupes else "")
            check(f"registry {rel} sin schema propio — GAP de cobertura (decisión A/B)",
                  False, "lista en REGISTRY_INDEXES; no se le aplica esquema inexistente")
        except Exception as e:
            check(f"registry {rel}", False, str(e)[:120])

    # 4. JSON de packages con $schema declarado
    for data_f, schema_f in PACKAGE_PAIRS:
        dp = ROOT / data_f
        sp = ROOT / schema_f
        if not dp.exists() or not sp.exists():
            check(f"{data_f} -> {schema_f}", False, "faltan archivos")
            continue
        try:
            d = json.loads(dp.read_text(encoding="utf-8"))
            s = json.loads(sp.read_text(encoding="utf-8"))
            v = Draft202012Validator(s)
            errs = sorted(v.iter_errors(d), key=lambda e: list(e.path))
            check(f"{data_f} -> {schema_f}", not errs,
                  f"{len(errs)} errores: {errs[0].message[:120]}" if errs else "")
        except Exception as e:
            check(f"{data_f} -> {schema_f}", False, str(e)[:120])

    # 5. Integridad: todo .json del repo parsea
    bad, total = [], 0
    for p in ROOT.rglob("*.json"):
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        total += 1
        try:
            json.loads(p.read_text(encoding="utf-8"))
        except Exception as e:
            bad.append((str(p.relative_to(ROOT)), str(e)[:80]))
    check(f"integridad JSON: {total} archivos parsean", not bad,
          f"{len(bad)} con error; primero: {bad[0]}" if bad else "")

    print(f"\nPASS: {PASS} · FAIL: {FAIL} · TOTAL: {PASS + FAIL}")
    return 1 if FAIL else 0


if __name__ == "__main__":
    sys.exit(main())
