---
tipo: moc
fecha: 2026-05-01
tags: [prompts, ejecucion, agentes, moc]
relacionado: [[00-Index/Plan-Maestro-2026-05-01]] · [[00-Index/Skills-MOC]]
---

# Prompts de Ejecución — MOC

## Vault

- [[Vault-MOC|Vault MOC]]

> Prompts listos para copiar y enviar a los subagentes Claude.
> Actualizados: 2026-05-01

---

## P1 — Fix organize-agent (→ `wenuos-ops`)

Lee `~/wenuos-system/agents/organize-agent.js`. Hay un `ReferenceError: processing is not defined` que llena el log con 36k+ líneas. Identifica el scope donde `processing` debería estar declarado (probable: flag de lock para watcher). Parcha, agrega test mínimo, valida con `node --check` y reinicia `wenu-organizer` en PM2. Reporta diff.

---

## P2 — Consolidar carpetas operaciones (→ `segundo-cerebro`)

En vault `~/Obsidian/WenuAgent`, mueve todas las notas de `operaciones/` y `progreso/` a `20-Operaciones/`. Para cada nota movida: deja una stub en la ubicación vieja con un `[[redirect]]` al nuevo path. Actualiza backlinks. Lista al final cuántas notas movidas y cuántos backlinks reescritos.

---

## P3 — Dedup productos (→ `wenu-producto`)

Lee `~/Obsidian/WenuAgent/20-Operaciones/product-master-quality-report.md`. Para cada cluster (dup-1: 27, dup-2: 12, dup-3: 6), genera una propuesta de merge: cuál es el SKU canónico, qué fotos consolidar, qué descripción ganar. NO ejecutes merges; entrega tabla markdown para aprobación.

---

## P4 — Frontend catálogo Astro (→ `wenu-orchestrator`)

El frontend Astro ya existe en `~/wenu-frontend/`. Páginas: `/` (hero), `/catalogo`, `/p/[slug]`, `/pickup`, `/contacto`. API WooCommerce configurada. Build con `npx astro build`. Para conectar al dominio, exponer `~/wenu-frontend/dist/` vía servidor estático (ej. `npx serve dist -p 4321`) y apuntar Cloudflare Tunnel a :4321.

---

## P5 — Pivote digital ejecución (→ `wenu-orchestrator`)

Lee `~/Obsidian/WenuAgent/20-Operaciones/2026-04-27-checklist-wpadmin-pivote.md` (o en el vault según ruta actual). Lista qué pasos están hechos y cuáles no. Para los pendientes que requieren acción humana, genera un mensaje Telegram con la lista priorizada. No ejecutes nada en wp-admin.

---

## P6 — Vault hygiene / huérfanas (→ `segundo-cerebro`)

Aplica plan `00-Index/huerfanas-2026-04-24.md`. Reconecta cada huérfana al MOC correcto. Lista las que no encajan en ningún MOC y propone nuevos MOCs si es necesario.

---

## P7 — Cloud memory bootstrap (→ `wenuos-ops`)

Crea una página Notion "Wenu Cloud Memory" (usar `notion-create-pages`). Llena URL en `~/wenumapu_audit/.env` como `CLOUD_MEMORY_URL`. Corre `python ~/wenumapu_audit/memory.py --init` para validar.

---

## P8 — Bot Telegram comandos nuevos (→ `wenuos-ops`)

En `~/wenu-agent-hub/apps/telegram-bot/src/index.ts`, añade comandos `/estado`, `/producto`, `/audit`, `/nocturno`, `/aprobar`. Cada uno consume el endpoint correspondiente. Reinicia bot, valida con `/estado` real.

---

## P9 — n8n credenciales seguras (→ `wenuos-ops`)

En n8n UI (`http://localhost:5678`), crea credentials para WooCommerce y Telegram. Reescribe los 5 workflows para usar `$credentials` en lugar de strings hardcoded. Exporta a `~/wenuos-system/n8n/workflows/`. Verifica con trigger manual.

---

## P10 — Dataview dashboard en Home.md (→ `daily-synth`)

En `~/Obsidian/WenuAgent/Home.md`, añade bloque Dataview que liste: últimas 7 dailies, tareas abiertas con tag `#wenu`, productos sin foto, último informe nocturno. Requiere plugin Dataview activo.

---

## P11 — Conectar Cloudflare Tunnel al frontend (→ `wenuos-ops`)

1. Levanta servidor estático en `~/wenu-frontend/dist/` en puerto :4321: `npx serve ~/wenu-frontend/dist -l 4321`
2. Crea LaunchAgent `com.wenu.frontend.plist` para auto-inicio
3. En Cloudflare Tunnel dashboard (Zero Trust → Tunnels → wenuos), agrega public hostname: `wenumapuonline.com` → `localhost:4321`
4. Verifica que `https://wenumapuonline.com` sirve el HTML de Astro

---

## P12 — Llenar .env wenumapu_audit (manual)

> **Acción humana requerida.** Abrir `~/wenumapu_audit/.env` y completar:
> ```
> WC_CONSUMER_KEY=[redacted]
> WC_CONSUMER_SECRET=[redacted]
> TELEGRAM_BOT_TOKEN=[buscar en ~/wenu-agent-hub/.env como TELEGRAM_BOT_TOKEN]
> ```
> Luego correr: `cd ~/wenumapu_audit && python bot.py --test`
