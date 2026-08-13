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
`jsonschema`). Resultado: **14/16 PASS · 2 FAIL**.

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

### Datos contra sus schemas (3/5 PASS)

| Archivo | Schema | Resultado |
|---|---|---|
| `data/corpora/kodex-genesis-v0/claims.json` (7) | `claim.schema.json` | **PASS** — cada claim valida |
| `data/bridges/bridge-1-v0/claims.json` (82) | `claim.schema.json` | **PASS** — cada claim valida |
| `data/corpora/kodex-genesis-v0/sources.json` (7) | `source.schema.json` | **PASS** — cada source valida |
| `data/module-registry.json` | `module.schema.json` | **FAIL** (ver abajo) |
| `data/interaction-registry.json` | `interaction-passport.schema.json` | **FAIL** (ver abajo) |

### JSON de packages con `$schema` (2/2 PASS)

| Archivo | Schema | Resultado |
|---|---|---|
| `packages/visual-library/assets/registry.json` | `asset-registry.schema.json` | **PASS** |
| `packages/visual-library/recipes/journey-field.json` | `recipe.schema.json` | **PASS** |

### Integridad JSON (PASS)

- **73/73** archivos `.json` del repo parsean (excluidos node_modules/.git/dist
  y artefactos de terceros en `context/obsidian/**/web|preview|standalone`).

---

## Los 2 FAIL: huecos de cobertura, no datos rotos

`data/module-registry.json` y `data/interaction-registry.json` **no validan**
contra `module.schema.json` / `interaction-passport.schema.json`. El motivo es
un **desajuste de granularidad**, no un error en los datos:

- `module.schema.json` describe un **módulo completo** (requiere
  `questionTypes`, `supportedClaimClasses`, `semanticChannels`,
  `interactionRoles`, `accessibilityModes`, `version`…). Cada entrada de
  `module-registry.json` es un **inventario liviano** (`id, status, path,
  purpose, renderers, performanceCost, firstVerticalSlice`).
- `interaction-passport.schema.json` describe un **passport de interacción**
  completo (`nodeId, target, triggers, stateChange, writesToMemory,
  laterConsequences, accessibility, fallback`…). Cada `primitives[]` del
  registry es una **primitiva** (`id, status, role, purpose, renderers,
  visualChannels, fallback`).

Es decir: los schemas existentes cubren el ítem *spec completo*; los registries
son *índices* de esos ítems y **no tienen schema propio**. El barrido los marca
FAIL porque se les aplicó el schema equivocado (el único disponible).

### Qué resolver (decisión de Ocín, no inventado acá)

1. **Opción A:** crear `module-registry.schema.json` y
   `interaction-registry.schema.json` que validen el wrapper + la forma del ítem
   liviano (cobertura real del registry).
2. **Opción B:** declarar que los registries son índices no-validables y excluir
   ambos del barrido (mantener el sweep limpio).
3. Los datos en sí no tienen anomalías detectables: los ítems son estructuralmente
   consistentes entre sí.

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
