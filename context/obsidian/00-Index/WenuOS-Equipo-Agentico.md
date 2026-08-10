---
tipo: blueprint-equipo
fecha: 2026-07-04
tags: [wenuos, equipo-agentico, agentes, cron, cerebro, como-funcionamos]
relacionado: [[00-Index/WenuOS-Modelo-Canonico]] · [[00-Index/WenuOS-SafetyNet-Completitud]] · [[00-Index/WenuOS-Estado-Verificado-2026-07-04]] · [[CLAUDE]]
---

# 🧠 WENU AGENTIC OPS — el equipo

> Modelo inspirado en la agencia "todo corre en Claude Code" (equipos por departamento + CLAUDE.md cerebro + cron), **pero 100% Wenu**: pocas piezas afiladas para las necesidades reales del negocio, no 220 skills genéricas. Objetivo: que el trabajo agéntico corra **pro, eficiente y confiable — como reloj**.
> **Principio rector:** producción = infra determinista (corre sola, sin IA). La IA **construye y mejora**; nunca es parte del runtime.

---

## 0. Cómo leer esto

Ya teníamos **~60% armado**: 8 subagentes en `~/.claude/agents/`, el cerebro `CLAUDE.md` del vault, y 17 cron de Hermes. Esto lo **organiza como equipo**, tapa huecos y deja el "cómo funcionamos" explícito.

---

## 1. EL CEREBRO — el CLAUDE.md que manda a todos

**Existe:** `~/Obsidian/WenuAgent/CLAUDE.md` (identidad, estructura del vault, flujo obligatorio, tabla de subagentes) + `~/wenu-frontend/CLAUDE.md` (reglas de build/deploy). Son los dos "cerebros" que se cargan solos cuando un agente entra a esas carpetas.

**Reglas duras — canónicas para TODO agente** (consolidadas acá; deben vivir en el CLAUDE.md raíz):

1. **Fuente de verdad única** (ver [[00-Index/WenuOS-Modelo-Canonico]]): catálogo = **NocoDB**; transaccional = **Postgres/:3335**; assets = **LaCie**; cerebro = **Obsidian**; notificaciones = **Hermes**; email = **Titan SMTP**.
2. **Nunca borrar** — a `90-Archivo/` o `~/WenuBackups/archived/`, jamás `rm`.
3. **No secretos** en chat/frontend/git. Sólo nombres de variables. Claves viven en `.env`.
4. **No-IA-en-runtime** — producción es determinista. Los agentes construyen/mejoran, no corren la tienda.
5. **NocoDB es el master de catálogo** — Postgres `Product` NO (está contaminada por-foto). Ningún agente escribe catálogo salteando NocoDB.
6. **Ética Hidden Sky** — no mezclar cosmovisión mapuche documentada con ficción OVNI/New Age; esto último sólo estética, sin claims de salud.
7. **Deploy serializado** — UN build por vez, matar astro colgados antes, `git push` NO despliega (Direct Upload vía `deploy-now.sh`). Verificar en vivo en `wenumapuonline.com`.
8. **Verificar en vivo, no en git** — el working tree engaña; la verdad está en el HTML servido (por eso existe el completion-guard).

---

## 2. DEPARTAMENTOS / ROLES (adaptados a Wenu) → quién lo cubre hoy

| Departamento | Rol | Qué hace | Agente/skill hoy | Estado |
|---|---|---|---|---|
| **CATÁLOGO** | Product Manager de catálogo | Integridad WM-*, dedup, precios, variantes, sync NocoDB→Woo | `wenu-producto` + `wenuos-catalog-integrity` (cron) + `nocodb-woo-sync.py` | 🟢 agentes / 🟡 sync bloqueado (WC write) |
| **CATÁLOGO · Foto** | Director de fotografía | Curar set de fotos por pieza, formatos web/lámina/redes, escribir en NocoDB | `wenu-curador-fotos` | 🟢 existe |
| **CONTENIDO / DESCUBRIMIENTO** | Brand & Content Lead | IG, journal, calendario cósmico, copy, SEO/leads (**la palanca real**) | `wenu-brand` + `wenu-editorial-calendar-monthly` (cron) | 🟢 agente / 🟡 IG bloqueado (Graph API) |
| **DISEÑO / UX** | Director de UX ritual | Estudio Wültufe, efectos livianos, identidad, temas | `wenu-brand` (estética) + cola de prompts UX | 🟡 sin agente propio de front |
| **INGENIERÍA / DEPLOY** | Release Engineer | Builds serializados, anti-colisión, performance, deploy | `wenu-frontend-eng` ⭐ + `wenuos-ops` + `stuck-task-sweeper` + `completion-guard` | 🟢 |
| **NEGOCIO** | Revenue Ops | Pagos, pedidos, cotizaciones, propuestas, abonos | wenu-platform API :3335 + `wenuos-order-alert` (cron) | 🟢 alerta / 🏗️ checkout (Fase 3) |
| **OPERACIONES** | Chief of Staff (Hermes) | Notificaciones, ledger, dashboards, completion-guard, cron | Hermes + `wenuos-*` crons | 🟢 |
| **CONOCIMIENTO** | Bibliotecario PKM | Buscar, linkear, deduplicar el vault, MOCs | `segundo-cerebro` + `daily-synth` + `chatgpt-importer` | 🟢 |
| **ORQUESTACIÓN** | Staff Engineer | Entrada para tareas multi-dominio; delega y coordina | `wenu-orchestrator` | 🟢 |

**Huecos de rol:**
- ✅ **Hueco cerrado (2026-07-04):** creado `wenu-frontend-eng` — único dueño del frontend/deploy, SERIALIZADO (pre-flight que mata astro/wrangler colgados, un build por vez, verifica en vivo en `wenumapuonline.com`). Fin de las colisiones ad-hoc. Archivo: `~/.claude/agents/wenu-frontend-eng.md`.
- **DESCUBRIMIENTO/SEO** vive dentro de `wenu-brand`; si crece, separar un rol `wenu-growth` (leads, SEO, IG orgánico). *(fase 2)*

---

## 3. EL CRON / SCHEDULE — qué corre cuándo

**🟢 Deterministas (sin IA en runtime) — el "reloj" de producción:**

| Cuándo | Job | Qué hace |
|---|---|---|
| cada 10 min | `wenu-report-notifier` | reporte nuevo en Obsidian → Telegram |
| cada 15 min | `wenuos-order-alert` | pedido/encargo/abono nuevo → Telegram |
| cada 15 min | `stuck-task-sweeper` | tareas/infra atascadas |
| cada 15 min | `claude-watchdog` | sesiones Claude idle |
| cada 30 min | `wenuos-completion-guard` | **detecta coded-pero-no-live + build colgado** → Telegram |
| 7:30/13:30/19:30 | `wenuos-data-index` | índices vivos (catálogo/clientes/pedidos/journal) |
| 8/14/20 h | `wenuos-live-dashboard` | dashboard de estado vivo |
| **9:00 diario** | `wenuos-catalog-integrity` ⭐nuevo | **dedup + integridad de catálogo** → Telegram si hay problemas |
| cada 3 h | `wenu-ready-no-ig-loop` | piezas listas sin publicar en IG |

**🤖 IA-agente (build/mejora — NO producción; si se caen, la tienda sigue):**

| Cuándo | Job |
|---|---|
| 9:15 diario | `wenu-daily-autocycle-readonly` |
| 10:05 diario | `wenu-daily-pareto-goals` |
| 23–6 h | `wenu-overnight-inventory-loop` |
| Dom 20:30 | `wenu-weekly-inventory-summary` |
| día 1 mensual | `wenu-editorial-calendar-monthly` |
| trimestral | `wenu-quarterly-strategy-summary` |

**Wireado esta sesión:** `wenuos-catalog-integrity` (diario 9:00) — ya probado, encontró 3 SKUs duplicados en NocoDB + confirmó 50/51 filas contaminadas en Product.

**Falta wirear (necesita build o decisión):**
- **Recordatorios de healing** (aftercare por cliente): necesita fechas de piercing por cliente en Postgres + el email-agent. El motor de email existe (Titan SMTP, plantillas day-14); falta el disparador por fecha. *(build)*
- **`nocodb-woo-sync` como cron**: listo pero **bloqueado** hasta que Ocin dé una WC key Read/Write (hoy 403).

---

## 4. Qué YA existe · qué falta · qué necesita a Ocin

**🟢 Ya existe (reusar):** 8 subagentes, los dos CLAUDE.md, 10 crons deterministas + 6 IA, ledger + completion-guard + dashboards, sync NocoDB→Woo (motor), integridad de catálogo (nuevo).

**🏗️ Falta construir (fases):**
- Fase 1: consolidar las 8 reglas duras (§1) dentro del `CLAUDE.md` raíz del vault (hoy están dispersas). *(edición segura de doc)*
- ✅ ~~Fase 2: rol `wenu-frontend-eng`~~ — **HECHO 2026-07-04** (deploy serializado + anti-colisión).
- Fase 2: separar `wenu-growth` (SEO/leads/IG) de `wenu-brand` cuando el volumen lo pida.
- Fase 3: disparador de healing reminders (fechas + email-agent).

**🔑 Necesita a Ocin:**
- WC API key **Read/Write** (para activar `nocodb-woo-sync` como cron).
- Limpiar los 3 SKUs duplicados en NocoDB (WM-OTH-003, WM-PLG-038, WM-RNG-011) y decidir el saneamiento de la tabla `Product`.
- Instagram Graph API (onboarding Meta) para automatizar publicación.
- ~~OK para crear el rol `wenu-frontend-eng` y consolidar el CLAUDE.md raíz~~ → **HECHO**: rol creado + 8 reglas duras consolidadas en `CLAUDE.md` (backup `.bak-20260705`).

---

## 5. Cómo funcionamos (resumen de una línea)

**El cerebro** (`CLAUDE.md`) da contexto y reglas → **el orquestador** (`wenu-orchestrator`) reparte a los **roles** (catálogo, contenido, diseño, ingeniería, negocio, ops, conocimiento) → **Hermes** corre el **reloj de cron** determinista y **avisa a Ocin** lo que pasa y lo que falta. La IA arma y mejora; **producción corre sola**.

*Read-only sobre datos. Sin secretos.*
