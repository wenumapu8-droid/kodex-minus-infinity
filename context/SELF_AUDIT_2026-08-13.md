# SELF AUDIT — OpenCode, antes de la revisión de Ocín (2026-08-13)

Estado **reverificado ahora mismo** de las 10 Draft PRs abiertas anoche entre
los dos repos. Todos los gates re-corridos sobre cada rama el 13-08; nada se
asumió desde el reporte original.

---

## 1. Las 10 PRs — estado real reverificado

| PR | Rama | Gates re-corridos | Estado |
|----|------|-------------------|--------|
| kodex #45 `feat/kod-19-bridge-1-atlas-ingestion` | ingestor Bridge 1 | 9/9 PASS sobre la rama + **regeneración del atlas determinista** (0 diff, 90/90 fuentes) | ✅ LISTA |
| kodex #46 `feat/opencode-route-reachability` | rutas /kodex/* | solo docs; suite base 47/47 OK | ✅ LISTA |
| kodex #47 `feat/opencode-dangling-edges` | grafo | solo docs; suite base OK | ⚠️ depende de #45 y #46 (ver §2) |
| kodex #48 `feat/opencode-pr-triage` | triaje backlog | solo docs; suite base OK | ✅ LISTA |
| kodex #49 `feat/opencode-c09-migration` | C-09 | solo docs; suite base OK | ⚠️ blocker: localizar fuente Drive |
| kodex #50 `feat/opencode-schema-sweep` | schema sweep | **16/18 PASS** (registries clasificados GAP) | 🔒 espera decisión (§3) |
| kodex #51 `feat/opencode-test-coverage` | tests | **56/56 OK** (47 base + 9 nuevos) | ✅ LISTA |
| kodex #52 `feature/visual-passports-merged-v1` | passports | **contrato 6/6 OK** sobre la rama; diff vs main = **3 archivos exactos** | 🔒 espera decisión (§3) |
| kodex #53 `feat/opencode-pr41-residual` | residuo #41 | solo 2 archivos estado (yaml+md), sin gates de código | 🔒 espera decisión (§3) |
| frontend #57 `feat/opencode-security-settings` | settings fuera de git | 4 archivos, no toca build de Astro; base `feature/kodex-depth-engine` | ✅ LISTA |

Detalle de reverificación clave: para #52, el diff de **puntas** (main↔rama)
muestra 777 archivos por merge-base viejo (`3e37e32`), pero el diff de
**merge-base** que usa GitHub es exactamente los 3 passports (+1312 −0 = 3
files). No hay fuga de contexto en el PR.

## 2. Dependencias entre las PRs — orden seguro de merge

- **#47 depende de #45 y #46.** La rama de #47 contiene el commit de #46
  (`983c0f8`, ROUTE_REACHABILITY_AUDIT) en su ancestro, y su análisis del
  grafo asume los placeholders `ensure_node` corregidos por #45. Si #47 se
  mergeara antes de #45/#46, metería el reporte de rutas sin su PR madre.
  **Orden seguro: #45 → #46 → #47.**
- Las demás (48, 49, 50, 51, 52, 53) son independientes entre sí y contra
  `main` no hay conflicto (main sin commits nuevos desde 08-09).
- **#57 (frontend)** va sobre `feature/kodex-depth-engine`, no sobre `main`:
  es independiente de las 9 de kodex.

## 3. Las 3 frenadas por decisión — en una línea cada una

1. **#50 (schema sweep):** ¿creamos el schema de registry para los 2
   registries que hoy dan GAP, o los declaramos oficialmente "no
   validables" y cerramos el sweep en 16/18?
2. **#52 (passports):** ¿activamos la consolidación (3 passports full
   +1312 líneas, reemplazando a #23/#26/#27 cortos) y cerramos esos 3 PRs
   viejos?
3. **#53 (residuo #41):** el `execution_status: HANDOFF_FOR_FRONTIER_REAUDIT`
   era del 08-08 — ¿sigue siendo el estado real del station hoy, y
   bumpeamos CURRENT_STATE a 08-12?

## 4. Algo que se me había pasado — contradicción entre tareas

Cruzando las 10, hay **una contradicción real** que no vi al momento de
abrir las PRs:

- **#49 (C-09) reporta "46/46 nodos con `claimClass: UNKNOWN`" y marca la
  clasificación como pendiente de la fuente Drive.** Pero **#52 (passports)
  ya asume/necesita esa clasificación**: los tres passports usan el nodo
  canónico (`KDX-NODE-DNA-ASCENT`, `KDX-NODE-SOURCE-CHAMBER`, etc.) y su
  "SCIENTIFIC CLAIM POLICY" define capas *verified vs symbolic* que el C-09
  aún no puede fundamentar. Es decir: #52 presupone el resultado de un
  trabajo que #49 declara bloqueado.

  Los passports la **flaguean** ("claimClass UNKNOWN, flagged not filled in
  by this passport") en vez de inventarla — eso es correcto y mitiga el
  riesgo — pero la dependencia lógica **#49 → #52** no estaba documentada
  en ninguna de las dos PRs. Ocín debería decidir si mergea #52 igualmente
  (con el flag) o espera a #49.

  No contradice a #47: los 4 nodos sin declaración (OBSERVER,
  STAR-LATTICE, MYCELIAL-ORACLE, GAIA-SENTINEL) **no** aparecen en ningún
  passport.

---

*Documento de estado, sin cambios de código. Creado por OpenCode en
`chore/opencode-self-audit` (2026-08-13).*
