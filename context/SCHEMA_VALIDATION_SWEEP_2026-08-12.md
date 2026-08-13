---
status: DERIVED / SOLO LECTURA
source: kodex-minus-infinity (main) — barrido de validación de schema
auditor: opencode
date: 2026-08-12
---

# SCHEMA VALIDATION SWEEP — todo el repo

Extensión de los quality gates de Bridge 1 (`scripts/kodex_quality_gates.py`
sobre `data/atlas/`, 9/9 PASS, rama del PR #45) a **todo** archivo JSON del repo
que declare `$schema` o que corresponda a algún schema de `schemas/`.

Script reproducible: **`scripts/kodex_schema_sweep.py`** (Draft 2020-12 via
`jsonschema`). Resultado: **16/18 PASS · 2 FAIL** (los 2 FAIL son el GAP de
cobertura de los registries, ver sección propia abajo; se cuentan como estado
abierto, no como dato roto).

## Resultados

### Schemas (8/8 PASS — todos son JSON Schema válidos)

| Schema | Estado |
|---|---|
| `claim.schema.json` | PASS |
| `interaction-passport.schema.json` | PASS |
| `module.schema.json` | PASS |
| `public-wall-entry.schema.json` | PASS |
| `semantic-passport.schema.json` | PASS |
| `session-memory.schema.json` | PASS |
| `source.schema.json` | PASS |
| `visual-passport.schema.json` | PASS |

### Datos contra sus schemas (3/3 PASS)

| Archivo | Schema | Resultado |
|---|---|---|
| `data/corpora/kodex-genesis-v0/claims.json` (7) | `claim.schema.json` | **PASS** — cada claim valida |
| `data/bridges/bridge-1-v0/claims.json` (82) | `claim.schema.json` | **PASS** — cada claim valida |
| `data/corpora/kodex-genesis-v0/sources.json` (7) | `source.schema.json` | **PASS** — cada source valida |

### Registries — GAP de cobertura (2 FAIL explícitos)

`data/module-registry.json` (9 ítems) e `data/interaction-registry.json`
(6 ítems) son **índices estructurales sin schema propio**. El script los
clasifica con su propio chequeo (estructura interna coherente, sin ids
duplicados: ambos **PASS**) y los marca **GAP** porque no existe schema de
registry que los ubique. `module.schema.json` e
`interaction-passport.schema.json` se validan como schemas (PASS), pero **no** se
le aplican a los registries: describen el ítem *spec completo*, no el índice.

Decisión abierta (Ocín): **(A)** crear `module-registry.schema.json` y
`interaction-registry.schema.json`, o **(B)** declarar los registries como
índices no-validables y excluirlos. El script ya está preparado para cualquiera
de las dos (lista `REGISTRY_INDEXES`).

### JSON de packages con `$schema` (2/2 PASS)

| Archivo | Schema | Resultado |
|---|---|---|
| `packages/visual-library/assets/registry.json` | `asset-registry.schema.json` | **PASS** |
| `packages/visual-library/recipes/journey-field.json` | `recipe.schema.json` | **PASS** |

### Integridad JSON (PASS)

- **73/73** archivos `.json` del repo parsean (excluidos node_modules/.git/dist
  y artefactos de terceros en `context/obsidian/**/web|preview|standalone`).

---

## Resumen de los 2 FAIL

Ambos son los **registries** (sección de arriba): índices estructurales sin
schema propio. El desajuste es de granularidad: `module.schema.json` describe
un módulo completo (`questionTypes`, `semanticChannels`, `accessibilityModes`…)
mientras cada entrada de `module-registry.json` es un inventario liviano
(`id, status, path, purpose, renderers, performanceCost, firstVerticalSlice`);
`interaction-passport.schema.json` describe un passport completo
(`nodeId, target, triggers, stateChange, writesToMemory, laterConsequences…`)
mientras `interaction-registry.json` guarda primitivas
(`id, status, role, purpose, renderers, visualChannels, fallback`).

No son datos rotos: los ítems son internamente consistentes (sin ids
duplicados, estructura uniforme). El gap es que **no existe schema que ubique
el índice**. Decisión de Ocín en la sección de registries (A o B).

---

## Alcance

- `data/atlas/` (Bridge 1) **no está en main** — vive en la rama del PR #45;
  sus gates (9/9) ya quedaron documentados ahí.
- Los 4 schemas en `context/obsidian/estrategia/**/…/*.schema.json` y en
  `packages/visual-library/schemas/` describen contextos embebidos de Drive
  (asset-registry, recipe, type-lockup, quiet-frame, archive-record) y no son
  parte del canon de `schemas/`; se validaron los 2 con datos de muestra en el
  repo (ambos PASS).
- `data/registries/*.yaml` son YAML (no JSON), sin `$schema` declarado: fuera
  del alcance de este barrido.
- El `kodex_quality_gates.py` (Bridge 1) no se toca; el nuevo script es
  **aditivo**.
