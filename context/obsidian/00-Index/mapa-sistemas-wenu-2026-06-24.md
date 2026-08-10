---
tipo: mapa-sistemas
fecha: 2026-06-24
generado: 2026-06-25 (inventario read-only, cero cambios)
tags: [infraestructura, inventario, canonico, anti-rehacer]
relacionado: [[00-Index/PUERTOS]] · [[00-Index/WenuPlatform-MOC]] · [[WENU_MAPU_CONTEXT]]
---

# 🗺️ Mapa de Sistemas Wenu Mapu — qué YA existe (no rehacer)

> **Propósito:** dejar de reconstruir lo que ya está hecho. Este documento inventaria TODO lo que existe en la Mac, su estado (vivo / dormido / stale), qué se **reusa/conecta** y qué **falta de verdad**.
> **Read-only:** no se cambió nada. **Sin secretos:** solo se anota qué integraciones existen, nunca sus valores.

---

## ⭐ TL;DR — las 8 cosas que YA EXISTEN y NO hay que rehacer

1. **El backend de pagos ya está construido y completo** (`~/wenu-platform/src/api.mjs`). Tiene MercadoPago (links de abono 30%) + NOWPayments (cripto, con verificación de firma IPN). **No hay que programar pagos de cero — hay que ENCENDER el proceso y CONECTAR el frontend.**
2. **PostgreSQL 16 está vivo** (puerto 5432, uptime desde el 15-jun) con 22 tablas Prisma y ~51 productos. La base de datos del negocio existe y corre.
3. **El sitio nuevo Astro está hecho y deployado** (`~/wenu-frontend`, ~55-88 páginas, en Cloudflare Pages `wenu-frontend.pages.dev`). Catálogo, PDP, custom-orders, materiales, journal — todo construido.
4. **Las llaves de pago YA están configuradas** en `~/wenu-platform/.env`: `NOWPAYMENTS_*`, `MERCADOPAGO_*`, `SMTP_*`. No falta darse de alta en nada nuevo.
5. **Auditoría diaria de WooCommerce** ya programada y read-only (`~/wenumapu_audit`, Python + Telegram + export a Obsidian).
6. **Hermes corre 24/7** (asistente Telegram con cron, watchdog cada 15 min, kanban, memorias). Automatización viva, no hay que rearmar el bot.
7. **Túnel Cloudflare activo** `wenuos.wenumapuonline.com` → :3333 (53+ días uptime). El acceso remoto seguro ya existe.
8. **Toda la doctrina/estrategia está escrita** en `~/Obsidian/WenuAgent` (briefs, MOCs, PUERTOS canónico, SOUL.md de Hermes). El "cerebro" del proyecto ya está documentado.

---

## 🔌 El punto crítico: backend de pagos ↔ frontend

**Qué existe (probado en código, hoy 2026-06-25):**

- `POST /custom-orders/:id/deposit-link` → genera link de pago MercadoPago por el **30% de abono** sobre `quoteClp`. Devuelve `init_point` (URL de checkout), `preferenceId`, `depositClp`.
- `POST /perforate/bookings/:id/deposit-link` → mismo flujo para **turnos de piercing**.
- `POST /nowpayments/ipn` → webhook cripto con `verifyNowPaymentsSignature` (valida `x-nowpayments-sig`); al `finished` marca el encargo como `accepted` y notifica al dueño por Telegram.
- Webhook MercadoPago (`/mp/webhook`) → consulta el pago real en `api.mercadopago.com`, si `approved` marca `depositPaidAt` + `deposit_paid` y avisa por Telegram.
- `GET /integrations/status` → reporta qué integraciones están `configured` vs `missing` (SMTP, Telegram, MercadoPago, NOWPayments, WooCommerce).

**Por qué NO está conectado todavía (los 2 gaps reales):**

1. **El proceso de la API está apagado.** Puerto **3335 no escucha** (solo está vivo Postgres y el server de `wenumapu-system` en :3333). El código está; el proceso `com.wenu.api` / pm2 `wenu-api` **no está corriendo**. → Arrancar con `pm2 start ecosystem.config.cjs` o `node src/api.mjs` (PORT 3335).
2. **El frontend Astro es 100% estático (`output: 'static'`)** y hoy no llama a la API. Sus rutas `/api/subscribe` (deprecada → Klaviyo) y `/api/custom-order` (inactiva) están **desactivadas a propósito** porque en SSG no corren. → Para checkout/abonos hay que: (a) que el form de custom-order haga `fetch` al backend `https://api.wenumapu.com` (o el túnel), **o** (b) pasar Astro a `hybrid/SSR` con adaptador. La lógica de pago NO se reescribe — solo se cablea el botón al endpoint que ya existe.

> **Nota de dominios:** el código de pagos referencia `https://api.wenumapu.com/mp/webhook` y `https://wenumapu.com/...`, mientras el sitio vive en `wenumapuonline.com`. Verificar a qué dominio/túnel apunta realmente antes de conectar (posible desalineación de hostnames).

---

## 📊 Tabla maestra por sistema

| Sistema | Qué es | Qué tiene hecho | Estado | Qué se REUSA / CONECTA | Qué falta DE VERDAD |
|---|---|---|---|---|---|
| **wenu-platform** `~/wenu-platform` | Backend unificado: Postgres 16 + Prisma (22 tablas) + API Fastify | API completa: catálogo, inventario, finanzas, clientes, custom-orders, **pagos MercadoPago + NOWPayments**, clasificador de fotos, intake. `.env` con todas las llaves. API_DOCS.md documentado. | 🟡 **DB viva (:5432), API apagada (:3335 no escucha)** | Encender API y apuntar el frontend a sus endpoints de pago. Postgres ya tiene los datos. | (1) Arrancar el proceso de la API; (2) Directus admin nunca se instaló (build nativo `isolated-vm` falla) — usar Prisma Studio :5555 o AdminJS. |
| **wenu-frontend** `~/wenu-frontend` | Sitio nuevo Astro (SSG), marca premium ritual | ~55-88 páginas (home, shop, PDP `/p/[slug]`, colecciones, materiales, custom-orders, journal, care-guide, FAQ...). ~40 componentes. Lee WooCommerce en build. Deployado en Cloudflare Pages. Centro de mando + autopilot scripts. | 🟢 **Vivo / deployado** (`wenu-frontend.pages.dev`, último commit 11-jun) | Es el sitio público objetivo. Conectar sus forms al backend de pagos. Mantener marca (Obsidian palette, DM Serif). | (1) Cablear checkout/abono a wenu-platform; (2) fijar Production branch en Cloudflare; (3) pase de diseño pro pendiente (skill `ui-ux-pro-max`). |
| **WordPress / WooCommerce** `wenumapuonline.com` (www) | Tienda legacy LIVE (Bridge + Elementor + Slider Revolution) | Checkout WooCommerce funcional, productos reales, copy de marca correcto, API REST que el Astro consume en build. | 🟡 **Vivo pero con higiene rota** | Es la fuente de catálogo del build Astro (`WC_URL` /wp-json/wc/v3). Sigue siendo el checkout que hoy funciona. | Footer roto (dirección Petrolia legacy), UI bilingüe, productos "prueba" públicos, SEO ~0, apex devuelve 502. Migrar a Astro + backend nuevo. |
| **Hermes** `~/.hermes` | Asistente personal por Telegram 24/7 (provider openai-codex + fallback Gemini) | SOUL.md con toda la doctrina de negocio; cron (watchdog claude cada 15m, 1649 corridas ok); kanban.db; memorias; plans (briefs de estrategia jun-2026); gateway vivo. | 🟢 **Vivo** (gateway con PID, cron activo hoy) | Reusar como capa de orquestación/notificación. Ya recibe los avisos "💰 ABONO PAGADO". | Nada crítico; mantener. Config tiene `auxiliary` providers vacíos (cosmético). |
| **chat-export (rescate)** `~/Obsidian/.../hermes-rescue` | Historial de sesiones pasadas | `chat-export.json` (27 MB, 100k líneas) + `.md` (2.5 MB, 58k líneas) + `photo-index.json`. Memoria de todo lo construido/configurado. | 🟢 **Archivo intacto** (18-jun) | Fuente para recuperar decisiones pasadas sin rehacer. Buscable. | Indexar/resumir si se quiere consulta rápida (opcional). |
| **wenumapu-system** `~/wenumapu-system` | Server Express dashboard + API análisis de fotos | `server/index.js` corriendo en **:3333**, expuesto por túnel `wenuos.wenumapuonline.com`. organize-agent.js, test-notion. | 🟢 **Vivo (:3333)** | Es el servicio detrás del túnel público activo. Dashboard + organizer de fotos. | Aclarar solapamiento con wenu-platform (clasificador de fotos existe en ambos). |
| **wenumapu_audit** `~/wenumapu_audit` | Auditoría diaria WooCommerce (Python) | Chequea productos sin imagen/desc/categoría/SKU/precio, drafts, duplicados (difflib >0.85). Notifica Telegram + export Obsidian. **Solo lectura.** | 🟢 **Operativo** (cron) | Ya alimenta `wooAudit` que lee `/integrations/status`. Reusar tal cual. | Nada — funciona. |
| **wenuos-system** `~/wenuos-system` | Capa "servidor personal": n8n + wp-agent + cron + facturas | n8n workflows (:5678), nocturno, orfebrería, facturas-procesadas.json, certs Cloudflare. LaunchAgents de arranque. | 🟡 **Parcial** (n8n configurado; verificar si :5678 corre) | Reusar n8n para automatizaciones. Cron de facturas. | Confirmar qué workflows n8n están activos; falta Access policy en `n8n.wenumapuonline.com`. |
| **WenuOS** `~/WenuOS` | Estructura de carpetas para operar catálogo/media/SEO | Carpetas 00-Inbox→07-Archive (runbooks, media por estado, exportables Woo/social/mail). | 🟢 **Estructura viva** (organizativa, no software) | Sistema de archivos operativo. Reusar como pipeline de media/publishing. | Es convención de carpetas; depende de disciplina de uso. |
| **wenu-agent-hub** `~/wenu-agent-hub` | Asistente local modular (Telegram, llama.cpp/Ollama/OpenAI/Anthropic) + email agent + photo pipeline | Bot Telegram long-polling, memoria en vault, comando `/claw` (OpenClaw), pm2 ecosystem. TS estricto. | 🟠 **Stale** (último commit 24-abr) | Posible base del email agent + photo pipeline. Hay solapamiento con Hermes. | Decidir: ¿se consolida con Hermes o se archiva? Riesgo de duplicación de bots. |
| **pixel-agents** `~/pixel-agents` | Extensión VSCode de terceros (Pablo de Lucca) — "AI agents build real things" | Repo open-source clonado, v1.3.0 .vsix. | ⚪ **Externo / no-Wenu** | Herramienta de dev, no infra de negocio. | N/A — no es sistema Wenu. |
| **Obsidian** `~/Obsidian/WenuAgent` | Vault = single source of truth | MOCs (Agentes, Email, Proyectos, Skills, WenuPlatform), PUERTOS canónico, briefs de estrategia, SOUL, runbooks de email, plan maestro, contexto de marca. | 🟢 **Vivo / canónico** | El "cerebro". Consultar ANTES de construir cualquier cosa. Este mapa vive acá. | Algunas notas huérfanas (vault-orphan-report). Mantener índice. |
| **Backups** `~/WenuBackups`, `~/wenu-secrets-backup`, `~/wenu-frontend-backup` | Respaldos manuales | noco.db (89 piezas + fotos, 16-may), secrets, frontend dup-docs. | 🟢 **Presentes** | Recuperación de inventario NocoDB si hace falta. | Verificar antigüedad; no son backup automatizado. |

---

## 🧱 Stack vivo ahora mismo (verificado por puerto, 2026-06-25)

| Puerto | Servicio | Estado real | Esperado (PUERTOS.md) |
|---|---|---|---|
| :3333 | wenumapu-system Express + túnel público | 🟢 **escuchando** | ✅ |
| :5432 | PostgreSQL 16 | 🟢 **escuchando** (uptime 15-jun) | ✅ |
| :8080 | Docker (NocoDB) | 🟢 **escuchando** (docker) | inventario |
| **:3335** | **wenu-platform Fastify API** | 🔴 **NO escucha** | debería estar activo |
| :5555 | Prisma Studio | ⚪ manual (apagado) | on-demand |
| :5678 | n8n | ❓ sin confirmar | activo |
| :4321 | Astro dev/serve | ⚪ no necesario (sitio en Cloudflare Pages) | — |

> **Acción #1 más alta de palanca:** levantar la API de wenu-platform (:3335). Es lo único que separa "tenemos pagos programados" de "tenemos pagos funcionando".

---

## ✅ Próximos pasos sugeridos (sin rehacer nada)

1. **Encender** `wenu-platform` API → `cd ~/wenu-platform && pm2 start ecosystem.config.cjs` (o `node src/api.mjs`). Confirmar `curl localhost:3335/integrations/status`.
2. **Verificar dominios** de webhook (`api.wenumapu.com` vs `wenumapuonline.com`) y alinear con el túnel Cloudflare real.
3. **Cablear el form de custom-order** del frontend Astro a `POST /custom-orders` + `/deposit-link` (fetch al backend), en vez de la ruta `/api/custom-order` desactivada.
4. **Consolidar bots:** decidir Hermes vs wenu-agent-hub para no mantener dos asistentes Telegram.
5. **Cerrar la migración WP→Astro:** fijar Production branch en Cloudflare y resolver el 502 del apex.

---

*Inventario read-only. No se modificó ningún sistema. No se expuso ningún secreto (solo nombres de variables de entorno).*
