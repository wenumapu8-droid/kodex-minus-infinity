---
tipo: moc
fecha: 2026-05-02
sesion: nocturna autónoma
status: en curso (al 2026-05-02 22:00 PT)
---

# MOC · Sesión Nocturna 2026-05-02

> Mapa central del trabajo realizado mientras Nico dormía.
> Todo está conectado desde acá.

## Para empezar mañana

1. **[[2026-05-02-audit-360-business|Audit 360° del negocio]]** — leer primero
2. **[[Roadmap-90-dias-2026-05-02|Roadmap 90 días]]** — el plan ejecutable
3. **[[20-Operaciones/approvals/dedup-dry-run-2026-05-03|Decisiones dedup pendientes]]** — 30-60 min de revisión visual
4. **night-report-2026-05-03.md** — se genera automáticamente cuando termine el batch grande (~75 min después de las 21:51)

## Documentos creados esta noche

### Estrategia y diagnóstico

- [[2026-05-02-audit-360-business]] — auditoría completa del negocio
- [[Roadmap-90-dias-2026-05-02]] — plan a 90 días con KPIs
- [[2026-05-02-competitive-analysis]] — 5 competidores benchmarkeados
- [[2026-05-02-customer-journey]] — recorrido cliente con quick wins por etapa

### Operación / scripts

Nuevos en `~/wenu-agent-hub/`:

| Archivo | Función |
|---|---|
| `lib/photo-pipeline.mjs` | Pipeline RAW/JPG→IA→match. Retry on 429, prompt curador rico |
| `lib/telegram-notify.mjs` | Helper `tgSend()` reutilizable |
| `scripts/photo-classify-batch.mjs` | CLI batch con `--exclude-from`, paralelismo, manifests |
| `scripts/apply-classification.mjs` | Mueve fotos según verdict, dry-run default, log reversible |
| `scripts/revert-classification.mjs` | Deshace una corrida de apply-classification |
| `scripts/apply-dedup.mjs` | Aplica decisiones de dedup en products.json, backup automático |
| `scripts/dedup/dry-run-report.mjs` | Genera reporte md de los 3 clusters detectados |
| `scripts/dedupe-detector.mjs` | Agrupa create_new_product del manifest, propone SKUs nuevos |
| `scripts/sync-to-wc.mjs` | Sincroniza products.json → WC, lock file, dry-run+confirm |
| `scripts/enrich-descriptions.mjs` | SEO bilingüe ES/EN con voz de marca, Groq llama-3.3 |
| `scripts/pricing-engine.mjs` | Sugiere precios USD por tier+material+tamaño (revela $2K+ subprecificación) |
| `scripts/inventory-tracker.mjs` | CRUD de stock físico por SKU (init/set/report) |
| `scripts/curator-health-check.mjs` | Health del pipeline (Groq/Gemini/LaCie/PM2/.env), TG si falla |
| `scripts/wenu-status.mjs` | Dashboard CLI completo del negocio en 1 comando |
| `scripts/generate-night-report.mjs` | Reporte nocturno + Telegram |
| `scripts/night-orchestrator.sh` | Orchestrator que encadena batch100→grande→reporte→TG |

### Configuración persistida

- `~/wenu-agent-hub/.env` — agregado `GEMINI_API_KEY`, `GEMINI_MODEL`, `GEMINI_IMAGE_MODEL`. Permisos 600.
- `~/wenumapu-system/organize-agent.js` línea 91: modelo Groq parametrizado con env (`GROQ_MODEL`).
- `~/wenumapu-system/organize-agent.js` línea 263: ignored regex incluye `_BASURERO`, `_ARCHIVED_`, `Lucky7`.
- LaCie: nueva carpeta `_BASURERO/` creada.

### Memoria Claude

- [[../50-Claude-Memory/project_wenu_curador|Wenu Curador project memory]]
- [[../50-Claude-Memory/feedback_groq_model_param|Feedback Groq parametrizado]]
- [[../50-Claude-Memory/feedback_apply_scripts_dry_run|Feedback dry-run scripts]]

## Trabajos en background al cerrar sesión

| Proceso | PID | Estado | ETA |
|---|---|---|---|
| `wenu-organizer` PM2 | 16721 | corriendo con modelo nuevo | continuo |
| `night-orchestrator.sh` | 99846 | esperando batch grande | dependiente |
| `photo-classify-batch.mjs` (resto) | 3808 | procesando ~2,016 fotos | ~75 min desde 21:51 |
| `wakeup` Claude | — | programado 22:13 PT | check status del handoff |

## Comandos clave para mañana

```bash
# Estado general del negocio
cd ~/wenu-agent-hub && node scripts/wenu-status.mjs

# Salud del pipeline
node scripts/curator-health-check.mjs

# Ver reporte nocturno (cuando termine)
open ~/Obsidian/WenuAgent/20-Operaciones/approvals/night-report-2026-05-03.md

# Aplicar dedup tras decidir clusters (con backup automático)
node scripts/apply-dedup.mjs --decisions <decisions.json> --apply

# Aplicar clasificación de fotos
node scripts/apply-classification.mjs --manifest <manifest.json> --apply

# Generar SEO bilingüe para canónicos
node scripts/enrich-descriptions.mjs --apply

# Pricing sugerido
node scripts/pricing-engine.mjs --apply

# Iniciar inventory tracking
node scripts/inventory-tracker.mjs --init
node scripts/inventory-tracker.mjs --set WM-PLG-004 --stock 3
node scripts/inventory-tracker.mjs --report

# Sync final a WooCommerce (sólo cuando todo lo anterior esté listo)
node scripts/sync-to-wc.mjs --apply --confirm
```

## Problemas conocidos / limitaciones

1. **5,113 RAWs (NEF/CR2/DNG)** quedan sin procesar. No entran al pipeline esta noche porque tomarían 4+ horas y saturarían el rate limit Groq mientras corre el batch JPG. Plan: procesarlas en otra sesión, eventualmente decodificadas con sips a 2,400px y enviadas a Gemini Vision (que tiene mejor tier free para imágenes).
2. **Catálogo dual**: `products.json` (51) vs `master-db.json` (223) sin sincronización. Decisión necesaria mañana.
3. **WooCommerce**: 6 publish + 45 draft. El sync a WC requiere dedup aplicado primero (status `ready_to_publish`).
4. **0 captura de email** en sitio público. Quick win prioritario semana 1 del roadmap.
5. **Sin medición** (GA4/Hotjar). Decisiones a ciegas hasta que se instale.

## El TL;DR para Nico al despertar

> Anoche dejé el sistema funcionando, las herramientas armadas y el plan a 90 días escrito. **Lo que falta es tu decisión humana sobre los 3 clusters de duplicados** (30-60 min). Eso destraba todo lo demás. El reporte nocturno automático te va a dar otra capa de decisiones (productos nuevos detectados por IA). Todo es reversible. Nada se publicó en producción.

---

<!-- wenu-backlinks -->
[[Home]] · [[00-Index/Plan-Maestro-2026-05-01]] · [[WENU_MAPU_CONTEXT]]
