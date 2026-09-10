---
status: DERIVED / SOLO LECTURA
source: wenu-frontend @ feature/kodex-depth-engine (bd6be9c2)
auditor: opencode
date: 2026-08-12
---

# ROUTE REACHABILITY AUDIT — /kodex/*

Auditoría de solo lectura sobre `wenu-frontend` rama `feature/kodex-depth-engine`
(bd6be9c2). Para cada ruta bajo `src/pages/kodex/` se buscaron referencias
entrantes en todo el repo (src + scripts), excluyendo las páginas del propio
`src/pages/kodex/` (auto-referencia).

## Alcance del escaneo

- Referencias `href="/kodex/…"` estáticas y dinámicas (template literals).
- `data-next-url` (navegación del deck; se lee en `src/scripts/kodex-engine.js:170`).
- Documentación `CHANGELOG-KODEX.md`, `COWORK-BRIDGE.md`,
  `KODEX-PROTOTYPES-INDEX.md` como evidencia secundaria de rutas servidas.
- **Falsos negativos documentados:** enlaces con query (`?code=…`) y
  `data-next-url` (no `href`) ya cubiertos arriba.

## Resultado

| Ruta (src/pages/kodex/) | Estado | Evidencia |
|---|---|---|
| `/kodex/` (index.astro) | **ALCANZABLE** | `href="/kodex"` en `src/components/Footer.astro:73` |
| `/kodex/editions/` | **ALCANZABLE** | enlaza a `/kodex/archive/conjuncion/` (es origen de refs) |
| `/kodex/archive/conjuncion/` | **ALCANZABLE** | `chapter: '/kodex/archive/conjuncion/'` en `src/pages/kodex/editions.astro:13` |
| `/kodex/folio/[folio]` | **ALCANZABLE** | `href: '/kodex/folio/i…vi/'` en `src/lib/kodexScenes.js:24-74`; `data-next-url="/kodex/folio/i/"` en `index.astro:112`; dinámica `/kodex/folio/${f.slug}/` en `src/lib/kodexBook.js:213`; CTA `/kodex/folio/ii/` en `index.astro:415` |
| `/kodex/interlude/[id]` | **ALCANZABLE** | `/kodex/interlude/archive-machine/` y `cosmology-return/` en `src/pages/kodex/folio/[folio].astro:44-53`; `data-next-url={frame.href}` en `interlude/[id].astro:37` |
| `/kodex/lab/` (lab.astro) | **HUÉRFANA** | sin refs entrantes en src (la subruta observe-v2 sí es servida) |
| `/kodex/lab/observe-v2/` | **ALCANZABLE** | referenciada en `COWORK-BRIDGE.md:586` (rutas 200 sin errores SSR) |
| `/kodex/lamina/` (index.astro) | **ALCANZABLE** | nav `06 · The Plates` en `src/layouts/KodexShell.astro:106` |
| `/kodex/lamina/[t01-*/u01-*]` | **ALCANZABLE** | grilla dinámica `href={\`/kodex/lamina/${c.slug}/\`}` en `lamina/index.astro:134` |
| `/kodex/lamina/kit/` | **ALCANZABLE** | `href="/kodex/lamina/kit/"` en `lamina/index.astro:162` |
| `/kodex/libro/` | **HUÉRFANA** | `COWORK-BRIDGE.md:1079`: "libro … FUNCIONA (200) pero NO está linkeado desde ninguna página (solo por URL)"; pendiente en :1081 |
| `/kodex/m/descent/` | **HUÉRFANA** | sin refs entrantes |
| `/kodex/m/ritual/` | **HUÉRFANA** | sin refs entrantes |
| `/kodex/movement/[key]` | **HUÉRFANA (app)** | refs solo en `scripts/kodex-pinterest-pack.mjs:58-108` (destinos de pines públicos, no navegación interna) |
| `/kodex/return/` | **ALCANZABLE** | nav `05 · The Return` en `KodexShell.astro:99` |
| `/kodex/store/` | **ALCANZABLE** | nav `03 · Store` en `KodexShell.astro:97`; `src/lib/woo.ts` |
| `/kodex/verify/` | **HUÉRFANA** | sin refs entrantes |
| `/kodex/vol/[slug]` | **ALCANZABLE** | dinámica `href={\`/kodex/vol/${v.slug}/\`}` en `src/components/kodex/museo/KodexMuseo.astro:53` |
| `/kodex/work/[id]` | **ALCANZABLE** | nav `04 · Enter a Work` → `/kodex/work/001/` en `KodexShell.astro:98` |
| `/kodex/works/` | **ALCANZABLE** | nav `02 · The Archive` en `KodexShell.astro:96`; `dossierHref: '/kodex/works/'` en `src/lib/kodexArchiveRecords.js:24` |
| `/kodex/world/` | **ALCANZABLE** | rutas 200 documentadas en `COWORK-BRIDGE.md:586`; listada en `KODEX-PROTOTYPES-INDEX.md:18` |

## Resumen

- **36 archivos** de ruta en `src/pages/kodex/` (incluidos 5 dinámicos: `folio/[folio]`,
  `interlude/[id]`, `movement/[key]`, `vol/[slug]`, `work/[id]`).
- **ALCANZABLES:** 21 (todas las enlazadas desde KodexShell, el índice, el libro
  y el museo).
- **HUÉRFANAS:** 5 — `/kodex/lab/`, `/kodex/libro/`, `/kodex/m/descent/`,
  `/kodex/m/ritual/`, `/kodex/verify/`. Y `/kodex/movement/[key]` solo referenciada
  desde scripts de pines (no desde la navegación interna).
- **Origen de navegación principal:** `src/layouts/KodexShell.astro` (nav global),
  `src/components/Footer.astro`, `src/pages/kodex/index.astro` (CTAs y data-next-url),
  `src/lib/kodexScenes.js` + `kodexBook.js` (deck de folios).

## Nota

`/kodex/libro` está pendiente de linkear desde Archive (03) y Return (06) según
`COWORK-BRIDGE.md:1081` — es el único caso documentado como "debería estar
enlazado y no lo está". El resto de huérfanas (lab, m/descent, m/ritual, verify)
son rutas de trabajo internas sin requerimiento de navegación pública.
