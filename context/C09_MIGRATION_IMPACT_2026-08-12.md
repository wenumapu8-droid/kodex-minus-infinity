---
status: DERIVED / SOLO LECTURA / NO RESUELVE
source: kodex-minus-infinity (main) + rama feature/kodex-node-graph-v1 (wenu-frontend, lectura)
auditor: opencode
date: 2026-08-12
---

# C-09 MIGRATION IMPACT — vocabulario de clases de claim vs estatus de registro

La contradicción `C-09` (documentada en `packages/visual-library/docs/DRIVE-ATLAS-CROSSWALK-2026-08-09.md:46`):
el canon define **diez clases de claim** (epistémicas), pero en una revisión se propuso
un conjunto distinto que parece describir **estatus de registro**, no clase
epistemológica. **Este reporte no decide cuál vocabulario vale** (es decisión de
Ocín); inventaría dónde vive cada uno y qué habría que migrar bajo cada decisión.

---

## 1. Vocabularios reales en el repo

### A · 10 clases epistémicas (canon actual)

```
OBSERVED DERIVED ESTIMATED PROXY INTERPRETATION TESTIMONY
SPECULATION MYTHOPOETIC SYNTHETIC UNKNOWN
```

Definido en `canon/KODEX_EPISTEMIC_STANDARD.md` (tabla líneas 11–22, `claim_class`
en el evidence object). Semántica: **qué tipo de verdad epistemológica es la
afirmación**.

**Usos (lo que habría que migrar si se cambia):**

| Lugar | Rol | Archivo |
|---|---|---|
| Schema de claim | `class` enum (10) + `allOf` que exige `sourceIds` salvo SYNTHETIC/UNKNOWN | `schemas/claim.schema.json:10-49` |
| Algoritmo canónico | `claim.class` enum (10), `claim.source_ids unless class in [SYNTHETIC, UNKNOWN]` | `architecture/KODEX_ALGORITHM.md:70,211` |
| Schema de módulo | lista de 10 clases | `schemas/module.schema.json:29` |
| Design system | sección 10, tratamiento visual por clase | `design-system/KODEX_INFORMATION_DESIGN.md:150-184` |
| Runtime de referencia | `CLAIM_CLASSES` + validación + `sourceRequired` | `packages/core-reference/src/kodex-core.mjs:9,153-175` |
| Script de Bridge 1 | `CLAIM_CLASS_ENUM` + chequeo de anomalies | `scripts/bridge_atlas_corpus_v1.py:69,311` |
| Datos (corpus) | `class` en claims | `data/corpora/kodex-genesis-v0/claims.json`, `data/bridges/bridge-1-v0/claims.json` |
| Nodos (wenu-frontend, lectura) | `epistemic.claimClass` (46/46 = `UNKNOWN`) | `wenu-frontend@feature/kodex-node-graph-v1:src/data/kodex/nodes-atlas/*` |

### B · Estatus de registro (ya existe, separado del canon)

```
publicationStatus: ADMITTED | REVIEW | BLOCKED
```

Semántica: **en qué fase del registro/recorrido está el claim**. Ya está separado
de la clase epistémica en la mayoría del repo.

| Lugar | Valores | Archivo |
|---|---|---|
| Schema de claim | `ADMITTED \| REVIEW \| BLOCKED` | `schemas/claim.schema.json:37` |
| Algoritmo | `publication_status: ADMITTED \| REVIEW \| BLOCKED` | `architecture/KODEX_ALGORITHM.md:81` |
| Datos (corpus) | `ADMITTED` 6, `REVIEW` 1 | `data/corpora/kodex-genesis-v0/claims.json` |
| Datos (bridge) | `REVIEW` 82 | `data/bridges/bridge-1-v0/claims.json` |
| Runtime | `publicationStatus ?? 'REVIEW'`, reglas BLOCK/REVIEW | `kodex-core.mjs:169,184,221-230` |

**⚠ Inconsistencias dentro de B:** `KODEX_INFORMATION_DESIGN.md:44` y
`schemas/semantic-passport.schema.json:52` usan **`ADMITTED | ATMOSPHERE | BLOCKED`**
(ATMOSPHERE reemplaza a REVIEW, y con semántica distinta). Dos enums para el
mismo campo conceptual.

### C · Vocabulario de estatus en nodos (wenu-frontend, lectura)

Los 54 nodos usan **otro** vocabulario de estatus, no el de las 10 clases:

```
status:       dormant | active | unstable | sealed          (4)
atlasStatus:  CANON_CANDIDATE | NEEDS_PROVENANCE |
              NEEDS_PROVENANCE_REVIEW | INCOMPLETE_PAGE_26 |
              NEEDS_RESEARCH                                (5)
culturalStatus: STANDARD | REVIEW_REQUIRED                  (2)
```

`epistemic.claimClass` está en 46/46 = `UNKNOWN` (ningún nodo declara clase
epistémica real). Fuente: `src/data/kodex/kodex-node.schema.json:33-37` +
scan de los 54 nodos en `feature/kodex-node-graph-v1`.

### D · Vocabulario de aristas (design system)

```
CONFIRMED → solid relation
INFERRED  → interrupted or softened relation
SUGGESTED → exploratory relation with explicit label
UNRESOLVED → open edge or contradiction marker
```
`KODEX_INFORMATION_DESIGN.md:142-145`. Es de relaciones, no de claims, pero
convive con el punto 10 del mismo archivo.

---

## 2. El conjunto de 6 propuesto

**No se encontró versionado en el repo.** Se buscó en `kodex-minus-infinity`
(todas las ramas) y en `wenu-frontend` (todas las ramas, incluida
`feature/visual-passport-triage-v1`): no existe ningún archivo, schema, rama ni
PR que contenga explícitamente la lista de seis clases propuesta en la revisión
que originó `C-09`.

Posibles fuentes fuera del repo (a verificar con el autor): el Drive
(`10_HANDOFF_CLAUDE→CHATGPT — Grafo recuperado...`), las notas del creador o un
mensaje de revisión que no llegó a versionarse. El crosswalk de Drive menciona
`C-09` como "unresolved distinction between epistemic class and record status"
sin dar la lista.

> Implicación: el primer paso de la resolución es **localizar la fuente de los 6**
> (probablemente en el Drive o notas del autor) antes de poder decidir. No se
> puede evaluar migración contra una lista que no está en el repo.

---

## 3. Mapa de migración bajo cada decisión posible

### Escenario 1 · Se mantienen las 10 clases epistémicas + estatus de registro separado (estado actual, coherente)

- **Nada que migrar estructuralmente.**
- Quedan por alinear las **inconsistencias menores dentro de B**:
  `ADMITTED | ATMOSPHERE | BLOCKED` → `ADMITTED | REVIEW | BLOCKED` en
  `KODEX_INFORMATION_DESIGN.md:44` y `schemas/semantic-passport.schema.json:52`
  (si Ocín confirma que ATMOSPHERE fue un desliz y no un concepto aparte).
- Queda **pendiente autoral**: `claimClass: UNKNOWN` en 46/46 nodos — el canon
  nunca clasificó los nodos. No es migración, es asignación de clase (no se
  inventa).

### Escenario 2 · Se adoptan los 6 (como estatus de registro, reemplazando a publicationStatus)

- **Schema:** reemplazar `enum` de `publicationStatus` en `claim.schema.json:37`
  (3 → 6) y `semantic-passport.schema.json:52`.
- **Algoritmo:** `architecture/KODEX_ALGORITHM.md:81` + reglas de
  validateClaim (208-227) que hojean `BLOCKED`/`REVIEW`.
- **Runtime:** `kodex-core.mjs` — `publicationStatus ?? 'REVIEW'` (169), reglas
  135-145/184/221-230 que setean `BLOCKED`.
- **Datos:** re-mapear `ADMITTED` (6) y `REVIEW` (1+82) en los 2 `claims.json`.
- **Tests:** `packages/core-reference/test/kodex-core.test.mjs` (assert de
  `ADMITTED`/`REVIEW`).
- **Script bridge:** `PUBLICATION_ENUM` en `bridge_atlas_corpus_v1.py:313`.
- **Design system:** sección de estatus, no la 10 (las clases se mantienen).

### Escenario 3 · Se adoptan los 6 (reemplazando a las 10 clases)

- Todo lo de la tabla A (10 filas) + los datos `class` de los 2 claims.json
  (`OBSERVED` 88 total + `INTERPRETATION` 1).
- **Alto riesgo de colapso semántico:** mezclaría "qué verdad es" con "en qué
  fase está el registro" — exactamente lo que `C-09` advierte. Requeriría
  re-diseñar el design system 10 (tratamiento por clase) y el `allOf` de
  `sourceIds` en `claim.schema.json`.
- `MYTHOPOETIC`, `SYNTHETIC`, `UNKNOWN` no tienen equivalente obvio en un
  estatus de registro → se perdería información.

### Escenario 4 · Se añaden los 6 como capa nueva (6 estatus + 10 clases)

- Sin pérdida de información; el precio es un campo más por claim.
- Requiere decidir el mapeo de los enums actuales de B (3 valores) al nuevo de 6
  (bajo riesgo, son fases del mismo recorrido).

---

## 4. Inconsistencias detectadas (independientes de la decisión)

1. `ADMITTED | ATMOSPHERE | BLOCKED` vs `ADMITTED | REVIEW | BLOCKED` (B).
2. `claimClass: UNKNOWN` en 46/46 nodos — vocabulario presente pero sin valores
   reales (asignación autoral pendiente).
3. Tres vocabularios de estatus conviviendo (B en claims, C en nodos, D en
   aristas) sin un mapeo explícito entre ellos.
4. `CONTESTED` existe como concepto en `KODEX_EPISTEMIC_STANDARD.md:127` pero no
   es valor de ningún enum (ni de las 10 clases ni de publicationStatus).

## 5. Recomendación de proceso (sin decidir)

1. Localizar la fuente de los 6 (Drive / notas del autor) — primer blocker.
2. Confirmar con Ocín: los 6 son ¿reemplazo de publicación, reemplazo de clase,
   o capa nueva?
3. Recién entonces correr el mapa de migración del escenario elegido.
