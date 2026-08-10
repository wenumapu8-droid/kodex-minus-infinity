---
tipo: plan-maestro
fecha: 2026-05-01
estado: en-ejecucion
version: 1.0
tags: [plan, maestro, infraestructura, web, obsidian, wenuos]
relacionado: [[00-Index/Prompts-Ejecucion-MOC]] · [[00-Index/PUERTOS]] · [[00-Index/Skills-MOC]] · [[Home]]
---

# Plan Maestro Wenu Mapu — 2026-05-01

> Diagnóstico completo + propuesta de mejoras por fases generado por Claude.
> Ejecución: paralela (frontend Astro + subagentes).
> Actualizar estado de cada bloque al completar.

---

## Estado del sistema al 2026-05-01

### ✅ Operativo
- Cloudflare Tunnel (53+ días uptime) → wenuos.wenumapuonline.com
- PostgreSQL 16 + wenu-platform Fastify :3335 (Fase 1 OK)
- n8n 1.97.1 en :5678 (5 workflows activos)
- Telegram bot (PID 23612)
- 9 LaunchAgents registrados
- Vault WenuAgent (205 notas, MOCs, Home funcional)
- Sistema nocturno autorizado (cron :13 cada hora)

### ⚠️ En proceso / desbloqueando
- organize-agent.js crash → **fix en ejecución** (subagente wenuos-ops)
- wenumapu_audit .env sin WC keys → pendiente llenar manualmente
- n8n credenciales hardcoded → pendiente migrar al credentials store
- Cloudflare Access sin policy real → pendiente configurar

### 🔨 En construcción ahora
- **wenu-frontend/** — Astro + WooCommerce headless (build en curso)
  - Páginas: /, /catalogo, /p/[slug], /pickup, /contacto
  - Stack: Astro SSG → build estático → Cloudflare Tunnel

---

## Fases del plan

### Fase 0 — Estabilización (días 1-3) [EN CURSO]
- [ ] Fix organize-agent.js ReferenceError
- [ ] Llenar .env wenumapu_audit (manual: WC_CONSUMER_KEY, WC_CONSUMER_SECRET, TELEGRAM_BOT_TOKEN)
- [ ] Crear health gateway :3399

### Fase 1 — Segundo cerebro (días 3-7) [EN CURSO]
- [ ] Instalar plugins Obsidian (Templater, Dataview, QuickAdd, Tasks, Git...)
- [ ] Consolidar operaciones/ y progreso/ → 20-Operaciones/
- [ ] Consolidar prompts en Prompts-Ejecucion-MOC.md
- [ ] Resolver notas huérfanas (plan huerfanas-2026-04-24.md)
- [ ] Dataview dashboard en Home.md

### Fase 2 — Web pública operativa (días 5-12) [EN CURSO]
- [ ] Build Astro wenu-frontend → dist/
- [ ] Conectar Cloudflare Tunnel a wenumapuonline.com raíz
- [ ] Cloudflare Access en /admin, /n8n, /prisma-studio
- [ ] Migrar credenciales n8n al credentials store

### Fase 3 — Datos y catálogo limpio (días 7-14)
- [ ] Resolver 45 duplicados (propuesta lista, pendiente aprobación)
- [ ] Vincular fotos Lucky7 a productos (flag published_lucky7=false)
- [ ] Archivar carpeta Lucky7 con guards en vitrina-vision.mjs

### Fase 4 — Agentes y automatización (días 10-21)
- [ ] Cloud memory ON (Notion DB + URL en .env)
- [ ] Bot Telegram: /estado, /producto, /audit, /nocturno, /aprobar
- [ ] Ampliar backlog nocturno con tareas auto-generadas

### Fase 5 — Escala y observabilidad (días 21-30)
- [ ] Dashboard KPIs :3399/dashboard
- [ ] Backups pg_dump diarios a WenuBackups/
- [ ] Rotación de logs

---

## Decisiones tomadas
- **Stack web:** Astro + WooCommerce headless (Woo = source of truth en HostGator)
- **Ejecución:** Paralela (Claude → frontend; subagentes → fix/vault/dedup)
- **API WooCommerce:** REST v3 confirmada operativa (6 productos publicados)
- **Credenciales Woo:** en wenu-agent-hub/.env (KEY + SECRET ya accesibles)

---

## Prompts de ejecución → [[00-Index/Prompts-Ejecucion-MOC]]
## Mapa de puertos → [[00-Index/PUERTOS]]
## Skills disponibles → [[00-Index/Skills-MOC]]
