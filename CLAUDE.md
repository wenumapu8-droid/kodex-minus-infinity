# KODEX−∞ — CLAUDE CODE BOOTSTRAP

**Snapshot operativo:** 2026-08-14  
**Owner:** Nicolás Ortega / Ocín

## 0. Regla de contexto

No intentes aprender todo KODEX antes de trabajar. KODEX ya tiene canon, documentación, activos y múltiples líneas de implementación. Carga solo el contexto necesario para la tarea.

Lee en este orden:

1. `START_HERE.md`
2. `CLAUDE.md` (este archivo)
3. `context/KODEX_CLAUDE_CODE_HANDOFF_2026-08-14.md`
4. `product/CURRENT_STATE.md` como baseline canónico/producto; su snapshot de `main` todavía puede ir detrás del runtime
5. Solo después: PR/issue/spec/archivos directamente relacionados con la tarea.

**No escanees Drive completo, no recorras todos los PRs y no generes otra capa de documentación fundacional.**

Usa además `ops/MODEL_STARTUP_PROMPTS.md` cuando corresponda y devuelve el preflight schema antes de editar.

---

## 1. Qué es cada repositorio

### Canon / governance
`wenumapu8-droid/kodex-minus-infinity`  
https://github.com/wenumapu8-droid/kodex-minus-infinity

Canon, ontología, scene architecture, políticas, research, decisiones, schemas, gates, operación y handoffs.

### Runtime / frontend
`wenumapu8-droid/wenu-frontend`  
https://github.com/wenumapu8-droid/wenu-frontend

Astro/JS/CSS/Canvas/WebGL, rutas KODEX, labs, engines, componentes y QA.

**No confundas documentación canónica con estado de runtime.**

---

## 2. Prioridad de fuentes cuando existe conflicto

1. Truth Ledger.
2. Canon consolidado.
3. Decision Log vigente.
4. Código real de la rama/commit evaluado, para afirmar implementación.
5. Current State vigente.
6. Scene Bible.
7. Sistema visual/técnico.
8. Research.
9. Referencias externas.
10. Prompts antiguos y conversación histórica.

No resuelvas contradicciones en silencio. Repórtalas.

---

## 3. Estados obligatorios

- **VERIFIED** — código, build, captura reproducible, fuente primaria o decisión vigente.
- **CANONICAL** — verdad interna creativa declarada.
- **INFERRED** — deducción con base explícita.
- **SPECULATIVE** — hipótesis, dirección futura o metáfora.
- **NEEDS_CONFIRMATION** — dato incompleto/contradictorio.
- **DEPRECATED** — versión reemplazada.

Separa siempre:
`concept → reference → generated asset → prototype → implemented → tested → deployed`.

Un PR abierto o un lab no equivalen a feature pública.

---

## 4. Estado operativo verificado al 2026-08-14

### Objetivo inmediato
Converger en **una experiencia pública KODEX coherente**, no seguir agregando fundación documental.

### Gate de corpus
**Linear KOD-19 — In Progress / Urgent / due 2026-08-17.**

Estado verificado en Linear:
- KODEX assets: `15 / 15` seleccionados;
- Ocín works: `10 / 10` candidate slots; creator visual/authorship/rights review pending;
- BOOK items: `0 / 6` admitted; source isolation blocked;
- Genesis Altar candidate packet definido; final source approval pending.

Mientras KOD-19 no cierre, no confundir selección con publicación/aprobación.

### Runtime principal en integración
**wenu-frontend PR #62 — Deep Route Engine + Assembly OS**  
https://github.com/wenumapu8-droid/wenu-frontend/pull/62

Estado verificado:
- **OPEN / DRAFT / MERGEABLE / NOT MERGED / NOT DEPLOYED**;
- head branch: `feat/kodex-observer-scale-route-v1`;
- current observed head: `1bfc5e4bd0b2fca1d7529dbfffee7b44b6334f20`;
- KODEX Core Runtime run `164`: **SUCCESS**;
- Deep Navigation + rendered Golden Plate browser evidence: green on that head.

Siguiente gap real:
- human curator acceptance/readability review de las 12 Golden Plates;
- protected-art visual/no-crop evidence sigue bloqueada hasta autorización explícita de source bytes.

### HoloCore
**wenu-frontend PR #63** está OPEN / DRAFT / MERGEABLE. Runtime/build/browser/mobile/reduced-motion están verificados en feature branch; final creator visual acceptance sigue pendiente. No public/deploy.

Los PRs #65 y #66 fueron PRs temporales de CI y están cerrados; no tratarlos como líneas activas de producto.

---

## 5. No rehacer

- No crear otra arquitectura base, canon paralelo, scene bible paralela o master doc redundante.
- No volver a investigar referencias ya catalogadas sin razón concreta.
- No presentar motion research como runtime.
- No promover un lab a ruta pública sin aprobación/gates.
- No inventar procedencia, licencias, significados culturales ni evidencia científica.
- No modificar arte original de Ocín para hacerlo encajar; usar composición y tratamiento no destructivo según contrato.
- No asumir que un PR abierto ya forma parte de `main`.
- No asumir que una rama histórica sigue siendo la base correcta: verificar antes de merge/deploy.
- No desplegar sin autorización explícita `APROBAR DEPLOY`.

---

## 6. Cómo cargar contexto según tarea

### Deep navigation / routes / Assembly
Lee:
- este bootstrap;
- handoff 2026-08-14;
- runtime PR #62;
- Drive `27_KODEX_DEEP_NAV_ENGINE_v0.1`;
- Drive `28_KODEX_ASSEMBLY_OS_v0.2`;
- solo changed files relevantes.

### Arte Ocín / collage / surfaces
Lee:
- handoff;
- runtime PR #61;
- `OCÍN_MASTER_ART_REGISTRY` vigente;
- Production Asset Manifest;
- Master Asset Registry.

### Holografía / HoloCore
Lee:
- handoff;
- runtime PR #63;
- `/kodex/lab/holocore/`;
- evidencia/browser scripts asociados.

### Provenance / corpus
Lee:
- Linear KOD-19;
- registries/manifests;
- políticas de procedencia.

### Motion
Lee canon PR #55 + stacked validation PR #57 como **research mechanically validated / NOT_IMPLEMENTED**, y luego verifica cualquier runtime por separado.

### Visual Assembly governance
Lee canon PR #56 como **proposal / architecture only**, y runtime PR #64 como **contracts/docs/data/CI only**, no como public implementation.

---

## 7. Definition of Done mínima

Según la superficie modificada:

- build limpio;
- tests específicos relevantes;
- browser QA;
- desktop + mobile;
- `prefers-reduced-motion`;
- teclado/touch cuando aplique;
- deep-link/back-forward cuando aplique;
- provenance/license gate cuando haya assets;
- evidencia reproducible;
- `CURRENT_STATE` actualizado cuando el cambio altera estado operativo;
- decisión relevante registrada.

Si falta evidencia, marca `NEEDS_CONFIRMATION`; no rellenes el hueco con una inferencia.

---

## 8. Documento de contexto operativo

Usar como mapa de situación:

`context/KODEX_CLAUDE_CODE_HANDOFF_2026-08-14.md`

Contiene Drive index, PR index, surfaces reutilizables, bloqueos, conflictos documentales, prioridades y recetas de lectura.

**Meta:** arrancar una tarea leyendo cientos o pocos miles de tokens, no reconstruyendo meses de conversación.

Antes de editar: inspecciona archivos y branch state reales, preserva trabajo existente/no trackeado, mapea implementación actual, ejecuta los tests disponibles y reporta exactamente qué evidencia obtuviste.