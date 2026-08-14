---
source_id: KDX-HANDOFF-CLAUDE-2026-08-14
title: KODEX−∞ Claude Code Operational Handoff
domain: agent-onboarding
status: CURRENT
epistemic_status: VERIFIED
priority: P0
version: 1.0
updated: 2026-08-14
owner: Nicolás Ortega / Ocín
purpose: token-efficient operational onboarding for Claude Code
---

# KODEX−∞ — CLAUDE CODE OPERATIONAL HANDOFF
## Snapshot 2026-08-14

> Este archivo es un snapshot operativo, no una nueva capa de canon. Su función es evitar que Claude Code reconstruya el proyecto desde conversaciones, Drive completo o todos los PRs. Si contradice código actual o una decisión canónica posterior, gana la fuente de mayor prioridad.

## 1. TL;DR

KODEX−∞ es un archivo vivo, sistema visual, laboratorio computacional, arquitectura narrativa y experiencia interactiva creada y dirigida por Nicolás Ortega / Ocín.

La prioridad actual es **integrar, validar y converger**, no producir más documentación fundacional.

### Canon / governance
Repo: `wenumapu8-droid/kodex-minus-infinity`  
https://github.com/wenumapu8-droid/kodex-minus-infinity

### Runtime / frontend
Repo: `wenumapu8-droid/wenu-frontend`  
https://github.com/wenumapu8-droid/wenu-frontend

### Objetivo operativo
Converger hacia **una sola experiencia pública KODEX coherente**, no un conjunto de páginas aisladas.

### Bloqueador de publicación principal
**Linear KOD-19 — M0 Corpus + provenance + publication gate**.

El corpus y registries han avanzado, pero no deben tratarse como production-complete hasta cerrar dedupe, procedencia/licencia, hero selection y gate final.

### Integración runtime más importante
**wenu-frontend PR #62 — Deep Route Engine + Assembly OS**  
https://github.com/wenumapu8-droid/wenu-frontend/pull/62

Estado observado: OPEN / DRAFT, rama `codex/integration`, implementación avanzada, no merged ni deployed. El head inspeccionado incluye Deep Route, Assembly/Plate Spec renderer, Golden Plate tooling, QA scripts, audio y deep-navigation lab. El workflow del head inspeccionado no estaba green; no afirmar lo contrario sin nueva evidencia.

---

## 2. Política de verdad

Usar siempre:

- **VERIFIED** — código ejecutable, build/captura reproducible, fuente primaria, medición o decisión vigente.
- **CANONICAL** — verdad interna creativa vigente.
- **INFERRED** — deducción con base explícita.
- **SPECULATIVE** — hipótesis, dirección futura o metáfora.
- **NEEDS_CONFIRMATION** — falta evidencia o existe contradicción.
- **DEPRECATED** — versión reemplazada.

Separar:
`concept / visual reference / generated image / prototype / implemented feature / tested feature / deployed feature / commercial result`.

Un PR abierto no es `main`. Un lab no es público. Un build no sustituye browser QA. Una referencia visual no es un asset original. Una intención no es un resultado.

---

## 3. Orden de lectura para ahorrar tokens

Siempre:
1. `START_HERE.md`
2. `CLAUDE.md`
3. este handoff
4. `product/CURRENT_STATE.md`

Luego solo por tarea:
- issue/PR actual;
- spec Drive directamente vinculada;
- archivos cambiados;
- tests correspondientes.

Evitar:
- leer todo Drive;
- abrir todos los PRs;
- reconstruir decisiones desde chats históricos;
- crear resúmenes redundantes de documentos que ya tienen rol canónico.

---

## 4. Jerarquía cuando dos fuentes discrepan

1. Truth Ledger.
2. Canon consolidado.
3. Decision Log más reciente.
4. Código real de la rama/commit evaluado para afirmar implementación.
5. Current State.
6. Scene Bible.
7. Visual/technical system.
8. Research.
9. External references.
10. Prompts antiguos y conversación histórica.

No resolver conflictos silenciosamente.

---

## 5. Estado del repo canónico

Archivos de entrada relevantes:
- `START_HERE.md`
- `CLAUDE.md`
- `PROJECT_MANIFEST.md`
- `product/CURRENT_STATE.md`
- `ops/CURRENT_CRITICAL_PATH.md`
- `ops/INTEGRATION_MATRIX.md`
- `ops/DO_NOT_ADD_MORE_FOUNDATION_FILES.md`
- `ops/IMPLEMENTATION_ONLY_NEXT.md`

Existe un foundation freeze: el trabajo nuevo debe priorizar integración, implementación, QA y actualización de documentos existentes. No crear otra scene bible, otro canon o un master document paralelo salvo dominio realmente nuevo, tooling ejecutable, product spec ausente o schema nuevo.

---

## 6. Runtime — líneas principales

### A. Deep Route + Assembly OS
PR #62  
https://github.com/wenumapu8-droid/wenu-frontend/pull/62

Estado: OPEN / DRAFT — active integration.

Funciones observadas/reportadas:
- Deep Route Engine;
- NSN boundary tags;
- masks;
- temporal/motion grammar;
- breadcrumbs;
- back-to-family;
- Return-to-Threshold hint;
- generative tiles;
- clipping/error behavior;
- entry-point integration;
- `AudioSignal`;
- route transitions;
- Plate Spec renderer en el head actual;
- Golden Plate generator/audits/tests;
- deep-navigation lab.

Archivos/rutas relevantes del head:
- `src/components/kodex/KodexPlateSpecRenderer.astro`
- `src/components/kodex/KodexAssemblyPreview.astro`
- `src/pages/kodex/lab/deep-navigation.astro`
- `src/pages/kodex/lab/plate-spec-golden-plate.astro`

No declarar CI green hasta clasificar/fijar el workflow actual.

### B. Collage con arte original de Ocín
PR #61  
https://github.com/wenumapu8-droid/wenu-frontend/pull/61

Estado: OPEN / DRAFT; lab implementado y QA local reportado.

Labs:
- `/kodex/lab/ocin-collage/`
- `/kodex/lab/ocin-collage/archive/`
- `/kodex/lab/ocin-collage/museum/`

QA reportado:
- Astro build;
- desktop `1440×1000`;
- mobile `390×844`;
- reduced-motion static.

Pendiente:
- aceptación visual de Ocín;
- promotion/deprecation decision;
- integración con portfolio completo;
- publicación pública.

Uso recomendado: reutilizar el lenguaje compositivo probado, no reconstruirlo desde cero.

### C. HoloCore
PR #63  
https://github.com/wenumapu8-droid/wenu-frontend/pull/63

Ruta:
- `/kodex/lab/holocore/`

Características:
- Canvas;
- ASCII hologram deterministic runtime;
- zero external textures/assets;
- ASCII ramp;
- pointer/touch;
- reduced-motion fallback.

PR #65 — validation harness  
https://github.com/wenumapu8-droid/wenu-frontend/pull/65

Agrega flujo `npm run validate:holography` y evidencia reproducible. Browser evidence todavía debe cerrarse si el entorno no dispone de Playwright/browser package.

### D. 7-scene executable registry
Runtime PR #60  
https://github.com/wenumapu8-droid/wenu-frontend/pull/60

Entrega registry ejecutable de las siete escenas y verificación estructural. No equivale a implementación visual completa de las siete escenas.

Canon counterpart:  
https://github.com/wenumapu8-droid/kodex-minus-infinity/pull/60

### E. Manuscript Heart
PR #54  
https://github.com/wenumapu8-droid/wenu-frontend/pull/54

Lab `/kodex/lab/manuscript-heart.astro`. Implementación de laboratorio / plate-to-live; build reportado; no asumir promoción pública ni browser acceptance total.

### F. Threshold visual lab
PR #53  
https://github.com/wenumapu8-droid/wenu-frontend/pull/53

Closure candidate con exploración de phrase/frame/metadata/diagonal tension/ASCII organism. Antes de rediseñar Threshold desde cero, revisar esta rama.

### G. Observe V2
PRs de referencia #36, #37, #38 en `wenu-frontend` aportan trabajo previo de overflow, zoom/tracking, browser behavior y reduced motion. Verificar ancestry/merge status antes de reutilizar.

### H. Visual Assembly
Canon PR #56  
https://github.com/wenumapu8-droid/kodex-minus-infinity/pull/56

Define asset families, recipes, reserved IDs y promotion gates.

Canon PR #58  
https://github.com/wenumapu8-droid/kodex-minus-infinity/pull/58

Build-preparation/evidence pack.

Runtime PR #64  
https://github.com/wenumapu8-droid/wenu-frontend/pull/64

Docs/contracts/implementation plan; no tratarlo por sí solo como runtime visual completo.

### I. Motion
Canon PRs #59 y #55:
- https://github.com/wenumapu8-droid/kodex-minus-infinity/pull/59
- https://github.com/wenumapu8-droid/kodex-minus-infinity/pull/55

Estado: research/design/reference-motion blueprints. Usar como blueprint, no como prueba de feature pública.

---

## 7. Drive — entry points mínimos

### Agent Bridge persistente
Folder: `KODEX — CLAUDE CODE AGENT BRIDGE`  
https://drive.google.com/drive/folders/150aRMa2UzSDnaF8qNygGyiWoMINSvvXM

Bootstrap Google Doc:  
https://docs.google.com/document/d/1LDMrFg7js_KmYfVoBaXLjOliCxmwbRwMbWFsDDLLho0/edit?usp=drivesdk

Operational Handoff Google Doc:  
https://docs.google.com/document/d/1VjFoNhrROUX4QNnImBF11y5IDltqC4usHfxN5rJCEb8/edit?usp=drivesdk

README Google Doc:  
https://docs.google.com/document/d/1A-ZjWUg2MV6jFUHuTTW8OxGUCls5icNgzVz8aCisP08/edit?usp=drivesdk

### Orientación / agentes
`00_START_HERE_KODEX v1.0`  
https://docs.google.com/document/d/1JGHTWWcbcViyngJjC5nSXvt_KJrG4hE0tzMj7w0QTpk/edit?usp=drivesdk

`05_AGENT_MANUAL_KODEX v1.0`  
https://docs.google.com/document/d/19wTJ9rvFvUaTZ39dFVKexjefY1MSXLwLCjoWHKJ5XiE/edit?usp=drivesdk

`19_AGENT_PROMPT_PACK v1.0`  
https://docs.google.com/document/d/1Fhm9xI7r9WS19SIDPoilNWKuWrOuorqcuLoK7wg4RW4/edit?usp=drivesdk

### Navigation / Assembly / Motion
`27_KODEX_DEEP_NAV_ENGINE_v0.1`  
https://docs.google.com/document/d/107WXyK7jhTNWsv8-djmhRcc6RJFz1u1GuTW0SItCAGY/edit?usp=drivesdk

`28_KODEX_ASSEMBLY_OS_v0.2`  
https://docs.google.com/document/d/1L9uZtrF5ptANGZgC2sUCW9Bm5X30EWYqjVuOluqDsH4/edit?usp=drivesdk

`28_KODEX_REFERENCE_MOTION_ENGINE_v0.1`  
https://docs.google.com/document/d/1V3KI1Yv4_PfW7GzUJzayTmjQEFvJ5f_rjIMc4benYF8/edit?usp=drivesdk

### Sistema visual / elementos
`07A_VISUAL_ATLAS_MASTER v1.0`  
https://docs.google.com/spreadsheets/d/1pWXp1DruT9nL-qHBEsWO0t7SgaXio3CIrujuGjIqCls/edit

`18_KODEX_ELEMENT_UNIVERSE v1.0`  
https://docs.google.com/document/d/1aCnHuN4QtNgHbLcZvdeVR-Xwa-IWt7ZIcwZHpw_Ap3E/edit?usp=drivesdk

`KODEX_VISUAL_MASTER_MATRIX v0.2` tiene dos sheets detectadas con el mismo título/version y debe tratarse como **NEEDS_CONFIRMATION** hasta decidir cuál es master:
- https://docs.google.com/spreadsheets/d/1RLzNoJO9XUXaDns0X9YQ8NtlbqQUxgJaYJxYFpQfoGY/edit?usp=drivesdk
- https://docs.google.com/spreadsheets/d/1MvVJhMwBgipP8CUK61SsTcxzywoApJCJxr0ycU8JBIM/edit?usp=drivesdk

### Assets / provenance
`17_PRODUCTION_ASSET_MANIFEST v1.1`  
https://docs.google.com/spreadsheets/d/1udUR819_xZI25lRcAfWnwCU451pQTaaBSDTpFCFcVRE/edit

`KODEX_MASTER_ASSET_REGISTRY v0.1`  
https://docs.google.com/spreadsheets/d/1u6FPHBONLXDkfO-j2M-WmemTJBi_I069mgRwUM9OQbE/edit

`OCÍN_MASTER_ART_REGISTRY_v0.8`  
https://docs.google.com/spreadsheets/d/1ASeMps43dBPqZx6wV4QroNw9947W6OoO0XGEuH6z4Nw/edit

`06 — PRODUCTION ASSETS & PROTOTYPES`  
https://drive.google.com/drive/folders/1pXpH0pEmE5RJ9Q1cc2h3Bhq_PPcJZDgV

### Research
`KODEX_RESEARCH_DOSSIER_MASTER_v1.0`  
https://docs.google.com/document/d/1uN1mxUjNaCJANNG0fcNjbiXpGbVEFwvcV2k_aAl6pBM/edit?usp=drivesdk

`KODEX_RESEARCH_SOURCE_REGISTER_v1.0`  
https://docs.google.com/spreadsheets/d/1ZL_mGH6Q11GCkzx7xdbvENDhcnNUcfsHDjGZAu1J48M/edit

No cargar research general para una tarea frontend ordinaria salvo que el copy/concepto lo requiera.

---

## 8. Corpus de Ocín — interpretación correcta

El material disponible demuestra avance sustancial de catalogación, pero no autoriza a concluir que todo el corpus está deduplicado, hard-provenanced o production-approved.

No modificar arte original para hacerlo encajar. Preferir composición, recorte, máscaras, framing, tratamiento no destructivo y reutilización del lenguaje de collage ya probado.

Gate pendiente: cerrar registry production-ready, hard provenance/source/license, dedupe triage, hero selection y gates de publicación aplicables.

---

## 9. Surfaces reutilizables

| Surface | Estado correcto | Siguiente paso |
|---|---|---|
| `/kodex/lab/ocin-collage/` | TESTED LAB / PR OPEN | visual acceptance + promotion decision |
| `/kodex/lab/ocin-collage/archive/` | TESTED LAB / PR OPEN | promotion/integration |
| `/kodex/lab/ocin-collage/museum/` | TESTED LAB / PR OPEN | promotion/integration |
| `/kodex/lab/holocore/` | IMPLEMENTED LAB / PR OPEN | close browser evidence |
| `/kodex/lab/deep-navigation.astro` | ACTIVE IMPLEMENTATION / PARTIAL EVIDENCE | classify/fix CI |
| `/kodex/lab/plate-spec-golden-plate.astro` | ACTIVE IMPLEMENTATION | validate rendered output + CI |
| `/kodex/lab/manuscript-heart.astro` | IMPLEMENTED LAB | browser acceptance/promotion |
| Threshold visual lab | CLOSURE CANDIDATE | QA + decision |
| Observe V2 surfaces | PRIOR IMPLEMENTATION EVIDENCE | verify ancestry before reuse |

“Resuelta” aquí significa que existe una base reutilizable comprobable, no necesariamente deployed.

---

## 10. Conflictos / deuda documental

### `product/CURRENT_STATE.md`
La versión de `main` inspeccionada sigue fechada `2026-08-06` y conserva referencias a ramas/PRs anteriores. Debe refrescarse con evidencia, no duplicarse como `CURRENT_STATE_V2.md`.

### Assembly OS Drive vs runtime
El spec Drive puede ir detrás del head de runtime. Para afirmar implementación, gana el código real; después sincronizar documentación.

### Visual Master Matrix duplicada
Dos sheets con mismo título/version. No elegir/eliminar automáticamente.

### Branch lineage
Documentación histórica puede señalar ramas antiguas mientras la integración activa vive en otra rama. Verificar target/base antes de merge/deploy.

### Open PR backlog
Antes de implementar algo “nuevo”, comprobar si ya existe un PR/lab que resuelve la mayor parte del problema; luego verificar ancestry para no traer trabajo obsoleto.

---

## 11. Qué NO volver a investigar salvo necesidad concreta

- definición general de KODEX;
- razón de las siete escenas;
- necesidad de reduced motion;
- existencia de Deep Route;
- necesidad de provenance;
- existencia del collage de Ocín;
- concepto de HoloCore/emulador visual;
- separación ciencia / metáfora / cultura;
- arquitectura general de fuentes;
- catálogo general de research;
- reglas de no generar tribal genérico ni alterar autoría original;
- si conviene crear otro master document permanente: no.

Gastar tokens en diff, implementation, testing, integration, evidence y decisions.

---

## 12. Recetas de contexto

### Integrar navegación profunda
Bootstrap → este handoff → PR #62 → Deep Nav Drive spec → Assembly OS Drive spec → changed files.

### Construir una surface con arte de Ocín
Handoff → PR #61 → Production Asset Manifest → Ocín registry → solo assets aprobados elegidos.

### Forma central / holograma vivo
Handoff → PR #63 → PR #65 → HoloCore route/component → scene-specific requirements.

### Corpus / provenance
KOD-19 → registries/manifests → provenance policies. No tocar `src/**` ni mover Drive salvo instrucción expresa.

### Motion
Scene spec → motion blueprints → runtime component → reduced-motion requirements. No confundir blueprint con implementación.

---

## 13. Próximas acciones recomendadas

### P0
1. Refresh de `product/CURRENT_STATE.md` usando evidencia vigente.
2. Clasificar/corregir CI de PR #62.
3. Cerrar KOD-19 / production provenance gate.
4. Verificar branch/base correcta de convergencia.

### P1
5. Resolver aceptación/promoción del collage de Ocín (#61).
6. Cerrar browser evidence de HoloCore (#63/#65).
7. Validar Golden Plate/Plate Spec renderer del head de #62.
8. Sincronizar Assembly OS Drive con lo implementado.
9. Resolver cuál Visual Master Matrix es master.
10. Mapear ancestry/dependencias y cerrar/deprecar ramas solapadas.

### P2
11. Promover módulos aceptados al golden path público.
12. QA transversal desktop/mobile/reduced-motion/touch/keyboard.
13. Actualizar Current State + Decision Log después de cada promoción.
14. Medir performance real.
15. Expandir escenas desde módulos verificados.

---

## 14. Definition of Done para integración KODEX

Según aplique:

- [ ] build limpio;
- [ ] tests unit/integration específicos;
- [ ] browser evidence reproducible;
- [ ] desktop;
- [ ] mobile;
- [ ] reduced motion;
- [ ] touch/pointer;
- [ ] keyboard/focus;
- [ ] deep links/history/back-forward;
- [ ] performance razonable;
- [ ] asset provenance;
- [ ] no arte original alterado destructivamente;
- [ ] status correctamente clasificado;
- [ ] Current State actualizado;
- [ ] Decision Log actualizado si hubo una decisión de alto impacto;
- [ ] no documentación canónica contradictoria;
- [ ] no deployment sin `APROBAR DEPLOY`.

---

## 15. Context budget recomendado

Objetivo al inicio: **menos de ~3k tokens de orientación** antes de leer código.

1. Bootstrap.
2. Buscar solo la sección necesaria de este handoff.
3. PR/issue actual.
4. 1–2 specs.
5. changed files.

Durante implementación priorizar `git diff`, changed-files, tests, local code references y exact component contracts. Evitar Drive search amplio, recaps generales, PR bodies irrelevantes y chats históricos.

---

## 16. Regla final

Antes de crear una solución nueva, responder internamente:

1. ¿Ya existe una pieza equivalente en un PR/lab?
2. ¿Cuál es la fuente de verdad de esta decisión?
3. ¿Estoy cambiando canon, runtime, research o asset provenance?
4. ¿Qué evidencia convierte mi cambio de implementado a tested?

Si no puede responderlas, detener la expansión y cargar solo el contexto mínimo necesario.

**KODEX necesita convergencia, no acumulación.**
