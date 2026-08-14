# KODEX−∞ — CLAUDE CODE BOOTSTRAP

**Snapshot operativo:** 2026-08-14  
**Owner:** Nicolás Ortega / Ocín

## 0. Regla de contexto

No intentes aprender todo KODEX antes de trabajar. KODEX ya tiene canon, documentación, activos y múltiples líneas de implementación. Carga solo el contexto necesario para la tarea.

Lee en este orden:

1. `START_HERE.md`
2. `CLAUDE.md` (este archivo)
3. `product/CURRENT_STATE.md`
4. `context/KODEX_CLAUDE_CODE_HANDOFF_2026-08-14.md`
5. Solo después: PR/issue/spec/archivos directamente relacionados con la tarea.

**No escanees Drive completo, no recorras todos los PRs y no generes otra capa de documentación fundacional.**

Usa además el prompt detallado de `ops/MODEL_STARTUP_PROMPTS.md` cuando corresponda y devuelve el preflight schema antes de editar.

---

## 1. Qué es cada repositorio

### Canon / governance
`wenumapu8-droid/kodex-minus-infinity`  
https://github.com/wenumapu8-droid/kodex-minus-infinity

Contiene canon, ontología, scene bible, políticas, research, decisiones, schemas, gates, operación y handoffs.

### Runtime / frontend
`wenumapu8-droid/wenu-frontend`  
https://github.com/wenumapu8-droid/wenu-frontend

Contiene la implementación Astro/JS/CSS/Canvas/WebGL, rutas KODEX, labs, engines, componentes y QA.

**No confundas documentación canónica con estado de runtime.**

---

## 2. Prioridad de fuentes cuando existe conflicto

1. Truth Ledger.
2. Canon consolidado.
3. Decision Log vigente.
4. Código real de la rama/commit que se está evaluando, para afirmar qué está implementado.
5. `product/CURRENT_STATE.md`.
6. Scene Bible.
7. Sistema visual/técnico.
8. Research.
9. Referencias externas.
10. Prompts antiguos y conversación histórica.

No resuelvas contradicciones en silencio. Repórtalas.

---

## 3. Estados obligatorios

Usa estas etiquetas:

- **VERIFIED** — comprobado por código, build, captura, fuente primaria o decisión vigente.
- **CANONICAL** — verdad interna creativa declarada.
- **INFERRED** — deducción razonable; debe mostrar base.
- **SPECULATIVE** — hipótesis, dirección futura o traducción metafórica.
- **NEEDS_CONFIRMATION** — dato incompleto/contradictorio.
- **DEPRECATED** — versión reemplazada.

Separa siempre:
`concept → reference → generated asset → prototype → implemented → tested → deployed`.

Un PR abierto o un lab no equivalen a feature pública.

---

## 4. Estado de ejecución al 2026-08-14

### Objetivo inmediato
Converger en **una experiencia pública KODEX coherente**, no seguir agregando fundación documental.

### Bloqueador principal
**Linear KOD-19 — M0 Corpus + provenance + publication gate**

Mientras no cierre:
- no asumir que el corpus visual está completamente autorizado para producción;
- no canonizar activos por intuición;
- no mover/renombrar/borrar/recolorear originales;
- la investigación de KOD-19 es read-only respecto de `src/**` y Drive.

### Runtime principal en integración
**wenu-frontend PR #62 — Deep Route Engine + Assembly OS**  
https://github.com/wenumapu8-droid/wenu-frontend/pull/62

Estado: **OPEN / DRAFT**, no merged, no deployed.  
La rama activa del PR es `codex/integration`.  
El commit inspeccionado más reciente contiene Deep Route, Assembly/Plate Spec renderer, Golden Plate, QA scripts, audio y deep-navigation lab.  
El workflow del head inspeccionado está fallando; **no declarar el PR green hasta resolver o clasificar ese CI**.

---

## 5. No rehacer

- No crear otra arquitectura base, canon paralelo, scene bible paralela o master doc redundante.
- No volver a investigar referencias ya catalogadas sin una razón concreta.
- No presentar motion research como runtime.
- No promover un lab a ruta pública sin aprobación/gates.
- No inventar procedencia, licencias, significados culturales ni evidencia científica.
- No modificar arte original de Ocín para hacerlo encajar; usar composición, recorte, máscaras y tratamiento no destructivo cuando corresponda.
- No asumir que un PR abierto ya forma parte de `main`.
- No asumir que la rama histórica `layout-a-overhaul` sigue siendo la base correcta de integración: verificar antes de merge/deploy.
- No desplegar sin la autorización explícita requerida por el proyecto: `APROBAR DEPLOY`.

---

## 6. Cómo cargar contexto según tarea

### Deep navigation / routes / Assembly
Lee:
- este bootstrap;
- handoff 2026-08-14;
- PR #62;
- Drive `27_KODEX_DEEP_NAV_ENGINE_v0.1`;
- Drive `28_KODEX_ASSEMBLY_OS_v0.2`;
- solo los archivos modificados relevantes.

### Arte Ocín / collage / surfaces
Lee:
- handoff;
- PR #61;
- `OCÍN_MASTER_ART_REGISTRY_v0.8`;
- Production Asset Manifest;
- Master Asset Registry.

### Holografía / emulador visual / HoloCore
Lee:
- handoff;
- PR #63;
- PR #65;
- ruta `/kodex/lab/holocore/`.

### Provenance / corpus
Lee:
- KOD-19;
- registries/manifests;
- políticas de procedencia.
No tocar runtime salvo instrucción explícita.

### Motion
Lee el Motion Engine/blueprints como **research/design**, luego verifica si existe implementación independiente antes de afirmar runtime.

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
- `CURRENT_STATE` actualizado;
- decisión relevante registrada.

Si falta evidencia, marca `NEEDS_CONFIRMATION`; no rellenes el hueco con una inferencia.

---

## 8. Documento de contexto operativo

Usar como mapa de situación:

`context/KODEX_CLAUDE_CODE_HANDOFF_2026-08-14.md`

Ese documento contiene:
- Drive index;
- PR index;
- páginas/labs ya resueltos o parcialmente validados;
- bloqueos;
- conflictos de documentación;
- prioridades;
- recetas de lectura por tarea.

**Meta:** arrancar una tarea en KODEX leyendo cientos o pocos miles de tokens, no reconstruyendo meses de conversación.

Antes de editar: inspecciona archivos y branch state reales, preserva trabajo existente/no trackeado, mapea la implementación actual, ejecuta los tests disponibles y reporta exactamente qué evidencia obtuviste.