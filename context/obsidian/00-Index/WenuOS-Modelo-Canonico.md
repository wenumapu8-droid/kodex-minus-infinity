---
tipo: modelo-canonico
fecha: 2026-07-04
status: CANÓNICO — fuente de verdad de la arquitectura
tags: [wenuos, canonico, fuente-de-verdad, determinista, runtime]
relacionado: [[00-Index/WenuOS-Mapa-Integracion]] · [[00-Index/WenuOS-Blueprint-Automatizacion]] · [[00-Index/WenuOS-Fase3-Cableado-Pagos]]
---

# 🧭 WenuOS — Modelo Canónico (una fuente por dato)

> **Principio rector (2026-07-04):** los sistemas de **producción NO dependen de IA** para funcionar. Son código/infra determinista que corre solo. La IA **construye y mejora**, nunca es parte del runtime.
> Regla: **un dato = un dueño único**. Todo lo demás lo **lee**, no lo re-inventa.

---

## 1. Tabla canónica: dato → master → a dónde fluye → mecanismo (determinista)

| Dato | **Master único** | Fluye hacia | Mecanismo | Runtime |
|---|---|---|---|---|
| **Productos / catálogo / stock / precio** | **NocoDB** (`piezas`, 209 registros — la clasificación de Ocin) | → WooCommerce → sitio Astro (build) | `nocodb-woo-sync.py` (unidireccional, idempotente por SKU, con logs) | determinista, sin IA |
| **Transaccional: pedidos, clientes, pagos, encargos** | **Postgres** (wenu-platform, API :3335) | → Hermes (avisos), índices Obsidian | API Fastify + `wenuos-order-alert.py` | determinista, sin IA |
| **Assets originales** (foto/video/PDF/brand) | **LaCie** `/Volumes/LaCie/Wenu mapu/WenuMapu` | → `_WOOCOMMERCE_READY` → Woo/sitio | organización de archivos | determinista |
| **Contenido / journal** | **Sitio** `wenu-frontend/src/content/journal` | → espejo en Obsidian | `wenuos-data-index.py` | determinista, sin IA |
| **Cerebro: estrategia, proyectos, SOPs, memoria** | **Obsidian** `~/Obsidian/WenuAgent` | → Hermes lee/escribe | Markdown + git | humano + IA (build) |
| **Tienda pública + checkout** | **WooCommerce** (hoy) → migrar a wenu-platform pagos | ← sitio lo lee | WC REST (build) + Fase 3 | determinista |
| **Notificaciones / orquestación** | **Hermes** (Telegram) | ← recibe de todos | cron `--no-agent` + `hermes send` | determinista (sin LLM para entregar) |
| **Email transaccional** (aftercare, órdenes) | **Titan SMTP** (nodemailer) | ← wenu-platform / email-sender | SMTP + plantillas | determinista, sin IA |

**Consecuencia clave — catálogo:** la tabla `Product` de Postgres **NO es master de catálogo**. Está contaminada con registros por-foto (`WM-PLG-001_front`, stock 0). Postgres es master **sólo de lo transaccional**. El catálogo vive en **NocoDB** y de ahí baja a Woo. Esto elimina el problema de "data en 3 lados que se pisa".

---

## 2. Sync determinista NocoDB → WooCommerce (implementado)

- Script: `~/wenu-platform/scripts/nocodb-woo-sync.py`. **Sin IA. Idempotente** (match por SKU: existe→update sólo si cambió; no existe→create). Logs en `~/wenu-platform/logs/nocodb-woo-sync-YYYYMMDD.log`. **Dry-run por defecto**; `--apply` para escribir.
- **Probado 2026-07-04 (dry-run):** leyó **209 piezas** de NocoDB, filtró **119 READY con SKU**, computó el plan. ✅ El lado NocoDB funciona perfecto sin credenciales nuevas (token ya en `.env`).
- **🔑 Bloqueo real:** WooCommerce devolvió **HTTP 403** en todas las lecturas → la WC key actual (en `wenu-frontend/.env`, creada para build) **no tiene acceso REST funcional**. Para que el sync escriba, Ocin debe:
  1. Crear en WooCommerce una **API key con permiso Read/Write** (WooCommerce → Ajustes → Avanzado → REST API).
  2. Asegurar que `wp-json/wc/v3` **no esté bloqueado** por un plugin de seguridad (el 403 puede venir de ahí).
  3. Guardarla como `WC_WRITE_KEY` / `WC_WRITE_SECRET` en `~/wenu-platform/.env` (nunca en chat ni frontend).
- Cuando la key esté: `python3 nocodb-woo-sync.py --apply` y luego registrarlo como cron **determinista** de Hermes (`--no-agent`), ej. cada 30 min. Comando listo:
  `hermes cron create "every 30m" --script nocodb-woo-sync.py --no-agent --deliver telegram:5773729925 --name nocodb-woo-sync` *(mover el script a `~/.hermes/scripts/` o usar `--workdir`)*.

---

## 3. Runtime de producción SIN IA — auditoría

**✅ Corre solo, sin ningún agente de IA vivo (determinista):**

| Componente | Qué es | Depende de IA? |
|---|---|---|
| Sitio `wenumapuonline` (Astro estático, Cloudflare Pages) | HTML/CSS/JS pre-buildeado | ❌ No |
| PostgreSQL :5432 | Base transaccional | ❌ No |
| wenu-platform API :3335 (Fastify) | Pedidos, pagos MercadoPago/NOWPayments | ❌ No |
| WooCommerce | Tienda/checkout | ❌ No |
| Webhook receiver :3334 (`wenu-agent-hub`) | Recibe webhooks Woo (HMAC) | ❌ No (Express + crypto) |
| Email sender :3360 (Titan SMTP) | Aftercare + transaccionales | ❌ No (nodemailer + plantillas) |
| Cron de sync/notif (`wenuos-*`, `wenu-report-notifier`) | Todos `--no-agent`, Python puro | ❌ No |
| Entrega Hermes (`hermes send` Telegram) | Bot token, sin LLM | ❌ No |

> **Matiz:** el **scheduler de Hermes** (proceso gateway) debe estar vivo para disparar los cron — pero eso es **infra determinista**, no inferencia de IA. Los scripts que corre son deterministas. Si se quisiera cero-dependencia de Hermes, esos cron pueden migrarse a `launchd` (plists nativos) — está el camino, no es urgente.

**🤖 Depende de IA — sólo BUILD/MEJORA, NO producción (revisar/acotar):**

- Cron IA-agente de Hermes (`no_agent:false`): `wenu-daily-autocycle`, `wenu-claude-daily-inventory-lane`, `wenu-overnight-inventory-loop`, `wenu-daily-pareto-goals`, `wenu-quarterly-strategy`, `daily-growth-engine`, `nocturno`, `morning-brief`, `hourly-classifier`. Son loops de análisis/contenido: **si se caen, la tienda sigue vendiendo**. Correcto que sean IA, pero **no deben estar en el camino crítico de ventas** (hoy no lo están).
- El clasificador de fotos (que contaminó `Product`) es IA de build: útil para preparar, pero su salida **no debe escribir directo al master de catálogo** sin pasar por NocoDB + revisión.

**Veredicto:** ✅ **Producción (vender, cobrar, notificar, emailear) NO depende de IA.** La IA está aislada en tareas de build/mejora.

---

## 4. Consolidación de asistentes — plan seguro (NO ejecutado aún)

**Decisión de Ocin:** un solo asistente = **Hermes**; archivar `wenu-agent-hub`.

**⚠️ Por qué no lo archivé con un `mv` (honestidad):** `wenu-agent-hub` **NO es peso muerto** — hoy corre **3 procesos vivos**, dos de ellos **producción determinista**:
- `webhook-server` :3334 → **recibe webhooks de WooCommerce** (order.created/updated/completed, customer.created) con firma HMAC. Mover la carpeta = **cortar la entrada de pedidos de Woo**.
- `email/server` :3360 → **enviador Titan SMTP** (aftercare + transaccionales). Mover = **cortar emails**.
- `health-monitor` :3390 → monitoreo interno.

Además hay ~9 LaunchAgents que apuntan a esa carpeta.

**Lo que SÍ está duplicado con Hermes** (y se puede retirar): los bots de **Telegram/Discord** y `ai-terminal`/`claude-local` (asistente conversacional) — eso es lo que Hermes ya cubre.

**Plan de archivado seguro (por fases, reversible):**
1. **Migrar** las 2 piezas deterministas a su hogar correcto: `webhook-server` y `email-sender` → dentro de **wenu-platform** (que ya es el backend transaccional y tiene SMTP). Reapuntar los LaunchAgents.
2. **Desactivar** sólo los LaunchAgents del asistente IA duplicado (`launchctl unload …`), confirmando uno por uno con Ocin.
3. **Verificar** 48–72 h que nada dependía de ellos (webhooks de Woo siguen llegando, emails salen).
4. **Recién ahí** mover `~/wenu-agent-hub` → `~/WenuBackups/archived/wenu-agent-hub-2026-07-04/` (archivo, no borrado).

> Archivarlo hoy con un `mv` rompería producción. El plan preserva webhooks + email y consolida sólo el asistente. **Necesita OK de Ocin para ejecutar la migración** (toca LaunchAgents y servicios vivos).

---

## 5. Qué falta de la mano de Ocin

- **🔑 WooCommerce:** API key **Read/Write** + confirmar que `wp-json` no está bloqueado (hoy 403). Sin esto el sync NocoDB→Woo no escribe.
- **Decisión:** OK para ejecutar el plan de consolidación (migrar webhook+email a wenu-platform, luego archivar agent-hub).
- **Decisión:** confirmar moneda del catálogo (NocoDB tiene precios en **USD**; verificar que Woo/el sitio usen USD para el mapeo de `regular_price`).
- **Opcional:** migrar los cron `--no-agent` de Hermes a `launchd` si se quiere cero dependencia del gateway (no urgente).

*Read-only sobre datos. Cero secretos en chat/frontend: sólo nombres de variables, puertos y conteos.*
