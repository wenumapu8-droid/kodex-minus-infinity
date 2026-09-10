---
status: DERIVED / SOLO LECTURA
source: kodex-minus-infinity (main) + ramas de los PRs analizados
auditor: opencode
date: 2026-08-12
---

# PR BACKLOG TRIAGE — 7 PRs abiertos

Triaje de `#41 #27 #26 #23 #13 #10 #8` contra `main` actual. **No se cerró ni
mergeó ninguno.** Cada uno con su recomendación:
`VIGENTE / SUPERSEDED / CONFLICTO / NECESITA REVISIÓN DE OCÍN`.

## Resumen

| PR | Tema | Estado vs main | Recomendación |
|---|---|---|---|
| #41 | KOD-44 sync dispatch queue | grueso ya absorbido en main | SUPERSEDED |
| #27 | KOD-40 SOURCE SPHERE passport | versión corta; consolidado en `feature/visual-passports-merged-v1` | SUPERSEDED |
| #26 | KOD-39 DNA PASSAGE passport | versión corta; consolidado en `feature/visual-passports-merged-v1` | SUPERSEDED |
| #23 | FIELD OF EYES passport | versión corta; consolidado en `feature/visual-passports-merged-v1` | SUPERSEDED |
| #13 | KODEX TEMPLE SYSTEM spec | base `feature/m1-node-recipes` (no main); sin ADR en main | VIGENTE (revisión) |
| #10 | M1 node recipes | base `feature/organism-engine-spec` (no main); cadena stacked | VIGENTE (revisión) |
| #8 | UNIV. ORGANISM ENGINE (ADR-0011) | spec viva; ADR-0011 no está en main | VIGENTE (revisión) |

Todos: `MERGEABLE` (sin conflictos de contenido reportados por GitHub).
Ninguno toca `src/` ni `data/atlas/`.

---

## PR #41 · `feature/dispatch-queue-sync-v1` → main

**Tema:** KOD-44 — sincronizar `DISPATCH_QUEUE.yaml` con el estado real de
integración (KOD-49 y la línea de vertical slice).

**Hallazgo clave:** el **grueso ya está en main**. En `main`:
- `ops/factory/packets/KOD-49.yaml` **existe** (el PR lo agregaba).
- `DISPATCH_QUEUE.yaml` ya referencia KOD-49, KOD-50 (blocked by KOD-49) y el
  station OPENCLAUDE_DEEPSEEK.

**Diferencias restantes vs main (2):**
1. `DISPATCH_QUEUE.yaml`: `execution_status` del station
   `READY_FOR_BOUNDED_KOD49_DELTAS` → `HANDOFF_FOR_FRONTIER_REAUDIT` + evidencia
   del PR #45 (243040b6) y la directiva de no aceptar paquetes nuevos.
2. `product/CURRENT_STATE.md`: timestamp `2026-08-06` → `2026-08-08` + bloque
   "Integration line" (PRs wenu-frontend #22/#28/#29/#30/#31).

**Recomendación: SUPERSEDED.** El contenido ya está en main; quedan 2 ediciones
de estado que se pueden aplicar como commit directo sobre main (no necesitan
PR), siempre que Ocín confirme que el `execution_status` refleja la realidad
actual de la frontera.

---

## PR #27 · `feature/visual-passport-source-sphere-v1` → main

**Tema:** KOD-40 — SOURCE SPHERE Visual Passport (`ops/factory/passports/`).

**Hallazgo clave:** la rama `feature/visual-passports-merged-v1` (en origin,
**sin PR abierto**) ya consolida los 3 passports en versión mucho más completa:
- `SOURCE_SPHERE.v1.yaml`: PR #27 tiene **128 líneas**; la rama consolidada
  **489**.
- `DNA_PASSAGE.v1.yaml`: PR #26 **149**; consolidada **460**.
- `FIELD_OF_EYES.v1.yaml`: PR #23 **140**; consolidada **363**.

**Recomendación: SUPERSEDED.** Los 3 PRs individuales son versiones tempranas
cortas del mismo trabajo. La fuente de verdad es la rama consolidada, que **no
tiene PR propio** — el gap real es abrir PR desde `feature/visual-passports-merged-v1`
(a revisar con Ocín), no mergear las versiones cortas.

---

## PR #26 · `feature/visual-passport-dna-passage-v1` → main

**Tema:** KOD-39 — DNA PASSAGE Visual Passport. Igual al #27, versión corta
(149 líneas) de un passport que en `feature/visual-passports-merged-v1` tiene
460.

**Recomendación: SUPERSEDED** (ver #27).

---

## PR #23 · `feature/visual-passport-field-of-eyes-v1` → main

**Tema:** FIELD OF EYES Visual Passport. Versión corta (140 líneas); la
consolidada tiene 363.

**Recomendación: SUPERSEDED** (ver #27).

---

## PR #8 · `feature/organism-engine-spec` → main

**Tema:** spec de arquitectura — ADR-0011 UNIVERSAL ORGANISM ENGINE +
`schemas/organism-preset.schema.json` + docs. 6 archivos, +1293.

**Estado vs main:** **ADR-0011 NO está en main** (main llega hasta ADR-0010).
`schemas/organism-preset.schema.json` tampoco. El contenido sigue siendo la
única fuente de la spec de organismo.

**Recomendación: VIGENTE (revisión).** Es la base de la cadena #8→#10→#13.
No tiene conflicto de contenido con el grafo ni los passports. Necesita
decisión de Ocín: aceptar la spec del organismo universal como ADR-0011, o
reemplazarla por algo más nuevo.

---

## PR #10 · `feature/m1-node-recipes` → `feature/organism-engine-spec`

**Tema:** M1 node recipes (`scripts/validate_node_recipes.py` +
`tests/test_node_recipes.py`, +1643).

**Nota:** la base es `feature/organism-engine-spec` (PR #8), **no `main`** —
es un PR stacked. Sobre main, `validate_node_recipes.py` no existe.

**Recomendación: VIGENTE (revisión).** No es mergeable directo a main tal como
está (base no-main). Depende de la decisión del #8. Revisión de Ocín.

---

## PR #13 · `feature/temple-system-spec-v0` → `feature/m1-node-recipes`

**Tema:** KODEX TEMPLE SYSTEM (`architecture/KODEX_TEMPLE_SYSTEM.md`, +281).

**Nota:** base `feature/m1-node-recipes` (PR #10) — cadena stacked más arriba.

**Recomendación: VIGENTE (revisión).** Depende de #10/#8. Revisión de Ocín.

---

## Nota de alcance

- **PR #44** (`agent/portfolio-to-kodex-contract`, 2026-08-10, MERGEABLE, no
  draft) está abierto pero **no está en la lista de los 7** del triaje. No se
  evaluó a fondo; queda mencionado como pendiente aparte.
- Los PRs propios de esta noche (#45 Bridge 1, #46 rutas, #47 dangling edges)
  y el #57 (wenu-frontend, seguridad) son del flujo actual, no del backlog.

## Nada que resolver acá

- No se mergea ni cierra nada (regla del loop).
- Las 2 ediciones residuales del #41 y el destino de la rama consolidada de
  passports (`visual-passports-merged-v1`) requieren decisión de Ocín.
- La cadena #8/#10/#13 es decisión de arquitectura de Ocín.
