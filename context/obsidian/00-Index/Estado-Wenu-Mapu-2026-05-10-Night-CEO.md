---
tipo: project-memory
fecha: 2026-05-10
fuente: sesión nocturna CEO mode 2026-05-10 Claude Code
status: canonical para próxima sesión (sobreescribe Estado-Wenu-Mapu-2026-05-10.md anterior)
prioridad: alta
tags: [wenu-mapu, estado-actual, ceo-night, plan, revenue]
---

# Estado Wenu Mapu — Night CEO 10 de mayo 2026

> Snapshot al cierre de la sesión nocturna CEO 2026-05-10. Sobreescribe el snapshot anterior (`Estado-Wenu-Mapu-2026-05-10.md`). Toda IA que abra una nueva sesión Wenu Mapu lee esta nota primero.

## 1. Modelo de negocio (canónico — overrides BRAND-DNA §7 y cualquier doc previo)

- **Sin studio físico.** No mencionar Truth Tattoo, Troll Studio, Lucky7, Thrue Tattoo. No usar "showroom at home", "vitrine", "walk-ins".
- **Operación:** citas privadas + free local delivery en Truckee / North Lake Tahoe area (Truckee, Kings Beach, Tahoe Vista, nearby Truckee airport).
- **Inventario privado en Noco.** Piezas seleccionadas se ven con cita.
- **Contacto público canónico:**
  - Email: marimari@wenumapuonline.com
  - Phone: +1 (408) 500-6211
  - Instagram: @wenu__mapu
- **Wording público obligatorio:**
  - "Private appointments available in the Truckee / North Lake Tahoe area."
  - "Free local delivery available in Truckee, Kings Beach, Tahoe Vista and nearby areas."
  - "Selected pieces may be viewed by appointment."

## 2. Estado del sitio público vs Astro redesign (post CEO-night)

| Item | wenumapuonline.com (legacy WP) | wenu-frontend (Astro redesign-v2) |
|---|---|---|
| Estado | Live, www. funciona, apex 502 | 88 páginas, build verde, no deploy |
| Footer | Petrolia + Rizoma + +145 ❌ (owner pendiente WP cleanup) | ✅ Updated: marimari@, +1 (408), Truckee appointment line, NO Northbound credit |
| Contact page | "Showroom at home" ❌ | ⚠️ Pendiente: Codex Task 1.5 reemplaza últimos contact@ residuales en 6 páginas |
| Test products | "producto prueba", "Pronto" ❌ | n/a |
| SEO | sin titles, sin meta, sin JSON-LD ❌ | ✅ Title + meta + Org/Website JSON-LD; Product JSON-LD pendiente para Codex |
| Pages misión-críticas | 13 routes 404 | ✅ Todas existen |
| Forms | sin form provider | ⏳ Pendiente: Codex Task 3 + 4b + 4c (gated en MailerLite signup) |
| Custom orders funnel | mailto only | ⏳ Pendiente: Codex Task 4b (form + qualification + auto-reply) |
| Appointments funnel | weak | ⏳ Pendiente: Codex Task 4c (rewrite /stockists + form + LocalBusiness JSON-LD) |
| Materials axis | none | ⏳ Pendiente: Codex Task 2 (6 landings + hub) |
| Journal | empty | ⏳ Pendiente: Codex Task 7 (template + 6 entries) |

## 3. Trabajo CEO-night completado (2026-05-10)

11 documentos creados/actualizados en `~/wenu-frontend/`:

- ✅ **revenue-funnel-map-wenu-mapu.md** — NUEVO — funnel end-to-end + friction inventory + AOV levers + 30-day plan
- ✅ **million-dollar-positioning-wenu-mapu.md** — NUEVO — positioning, brand promise, archetypes, product hierarchy, drop strategy, $1M math
- ✅ **wenu-english-copy-pack-v1.md** — NUEVO — copy listo-para-copiar para 20+ surfaces
- ✅ **custom-orders-system-wenu-mapu.md** — NUEVO — form fields, auto-reply, founder templates, Notion/Noco tracking
- ✅ **local-appointments-delivery-system.md** — NUEVO — model, page structure, form, calendar options, founder ops checklist, LocalBusiness JSON-LD
- ✅ **subscription-implementation-brief.md** — NUEVO — owner setup MailerLite step-by-step, tags, automations, subscribe.ts sketch
- ✅ **wenu-visual-prompts-v1.md** — NUEVO — 10+ ready prompts (hero, categories, materials, OG, 404) + negative prompt + edit prompts + manifest template
- ✅ **wordpress-live-cleanup-checklist.md** — NUEVO — owner checklist 90-min para WP admin (footer, products, lang, SEO, slugs, apex 301)
- ✅ **codex-next-tasks.md** — UPDATE — añadidos Tasks 1.5 (residual contact@), 4b (CustomOrderForm), 4c (AppointmentRequestForm + /stockists), 8 (/jewelry-styling)
- ✅ **docs/snippets/forms/** — NUEVO — 6 archivos stub (subscribe.ts, api.subscribe.ts, JoinTheCircleForm.astro, CustomOrderForm.astro, AppointmentRequestForm.astro, README.md). Fuera de `src/`, no compilados, listos para Codex.
- ✅ Esta nota Obsidian

## 4. Cambios en código (durante CEO-night, no por esta IA)

Detectados al inicio: el usuario o Codex ejecutó parcialmente Task 1:
- ✅ `src/components/Footer.astro` — actualizado con `mailto:marimari@`, address line appointment-only, removed Northbound credit
- ✅ `src/i18n/en.json` — actualizado (incluye nuevos contact.* / appointments_line keys según vi)

Build verificado verde post-cambios:
```
nvm use → Node 24.14.1
npm run build → 88 pages, postbuild OK ([verify-build] OK: 64 product pages built.)
```

Verificación grep:
- ✅ Petrolia, Rizoma, Northbound, +145, "Showroom at home" → 0 occurrences
- ⚠️ contact@wenu → 1 residual en humans.txt + 6 source files (accessibility, custom-orders, index, privacy, stockists, terms) → Codex Task 1.5 lo cierra

## 5. Decisiones de marca / arquitectura (CEO-night additions)

- **Cadencia de drops mapeada al calendario Mapuche**: Wiñoy Xipantu (24 jun), Pewu (sept eq.), Walüng (21 dic), Rimu (21 mar), + 1-2 entre. Primer drop sugerido: Wiñoy Xipantu 2026.
- **Naming "VAULT"** para cualquier clearance futuro, NO "Sale".
- **3 tiers de producto**: Foundation ($25-80) / Author ($100-400) / Commission ($400-2,500+). Misma página los muestra todos.
- **3 service surfaces** en nav reach: /custom-orders + /jewelry-styling (NEW) + /stockists (rename surface a "Visit / Appointments").
- **Loyalty futuro**: tiers Pewen / Lafken / Wenu / Pillan (Mapuche-cosmology) — needs founder cultural review. Diferido.
- **No discount-bait** en email capture — convergent pattern across Aesop / Maria Tash / BVLA / Buddha / Kin.
- **MailerLite** confirmada como plataforma para arrancar (free tier 1k/12k cubre 6-12 meses).
- **3 worked-example commissions** anonimizadas en /custom-orders (Owner pending).

## 6. Owner-only acciones pendientes (sequence by priority)

### P0 - esta semana

1. **Verificar marimari@wenumapuonline.com** existe + monitoreado.
2. **WP admin cleanup** per `wordpress-live-cleanup-checklist.md` (~90 min total): footer, test products, idioma, SEO plugin, apex 301.
3. **Aprobar Codex Task 1.5** (cierra residual contact@ en 6 páginas + humans.txt).
4. **Aprobar Codex Task 2** (6 material landings + hub).

### P1 - próxima semana

5. **Sign up MailerLite** bajo marimari@ + verify sender domain (DNS DKIM/SPF — owner-only DNS change).
6. **Crear email aliases** orders@ + custom@ vía Cloudflare Email Routing (free).
7. **Aprobar Codex Tasks 3 + 4b + 4c** (forms — gated en MailerLite key en .env).
8. **Rentar PO Box en Truckee** para CAN-SPAM physical address (~$80/año).
9. **Privacy policy real** con review de abogado (CCPA + GDPR + CAN-SPAM).

### P2 - próximas 2-4 semanas

10. **Brand session de fotografía**: 6 macros materiales + Truckee workshop interior + founder portrait + 4-5 process shots.
11. **Aprobar Codex Tasks 7 + 8** (Journal + /jewelry-styling).
12. **Cultural review founder** sobre /collection/chaway antes de publicar.
13. **Decidir Cloudflare Pages preview cutover** o continuar con apex 502 fix temporal.

## 7. Próximas acciones Codex / Claude Code (con per-commit approval)

Orden refrescado en `codex-next-tasks.md`:

1. **Task 1.5** — finish canonical email replacement (very low risk, small)
2. **Task 2** — 6 material landings + hub (mayor SEO uplift)
3. **Task 4b** — CustomOrderForm + qualification logic
4. **Task 4c** — AppointmentRequestForm + /stockists rewrite + LocalBusiness JSON-LD
5. **Task 8** — /jewelry-styling page
6. **Task 7** — Journal template + 6 founding entries
7. **Task 3** — JoinTheCircleForm wiring (después que MailerLite key esté en .env)
8. **Task 4a** — Visual handoff Asset 07 + 08 (cuando llegue source SVG)
9. **Task 5** — Internal link audit

## 8. Reglas que NO cambian (per `~/wenu-frontend/agent-control/DO_NOT_TOUCH.md`)

- No DNS / Cloudflare Tunnel / Cloudflare Access changes
- No WC product writes
- No `.env*` edits o reads-into-output
- No deploy / push / remote-add sin aprobación explícita
- No edits a `public/aftercare/*` o `public/downloads/*`
- No homepage `src/pages/index.astro` structural changes sin per-edit approval
- No nuevo `index.html` en raíz, no segundo `/styles` folder, no segundo design system
- No commits sin per-commit approval
- No image generation sin approval explícito + cap

## 9. Hot-links — wenu-frontend (planes y reportes)

### Estrategia + planes (CEO-night)

- [revenue-funnel-map](file:///Users/user1/wenu-frontend/revenue-funnel-map-wenu-mapu.md)
- [million-dollar-positioning](file:///Users/user1/wenu-frontend/million-dollar-positioning-wenu-mapu.md)
- [english-copy-pack-v1](file:///Users/user1/wenu-frontend/wenu-english-copy-pack-v1.md)
- [custom-orders-system](file:///Users/user1/wenu-frontend/custom-orders-system-wenu-mapu.md)
- [local-appointments-delivery-system](file:///Users/user1/wenu-frontend/local-appointments-delivery-system.md)
- [subscription-implementation-brief](file:///Users/user1/wenu-frontend/subscription-implementation-brief.md)
- [visual-prompts-v1](file:///Users/user1/wenu-frontend/wenu-visual-prompts-v1.md)
- [wordpress-live-cleanup-checklist](file:///Users/user1/wenu-frontend/wordpress-live-cleanup-checklist.md)
- [codex-next-tasks](file:///Users/user1/wenu-frontend/codex-next-tasks.md)

### Estrategia previa

- [full-site-completion-plan](file:///Users/user1/wenu-frontend/full-site-completion-plan.md)
- [wenu-contact-and-operations-plan](file:///Users/user1/wenu-frontend/wenu-contact-and-operations-plan.md)
- [wenu-subscription-and-journal-system](file:///Users/user1/wenu-frontend/wenu-subscription-and-journal-system.md)
- [wenu-visual-agent-plan](file:///Users/user1/wenu-frontend/wenu-visual-agent-plan.md) (refined to script-based pipeline)
- [market-reference-study](file:///Users/user1/wenu-frontend/market-reference-study-wenu-mapu.md)
- [live-site-audit-wenumapuonline](file:///Users/user1/wenu-frontend/live-site-audit-wenumapuonline.md)

### Snippets + handoffs

- [docs/snippets/forms/](file:///Users/user1/wenu-frontend/docs/snippets/forms/)
- [docs/handoffs/](file:///Users/user1/wenu-frontend/docs/handoffs/)

### Agent control

- [Agent-Control-Center](file:///Users/user1/wenu-frontend/agent-control/AGENT_CONTROL_CENTER.md)
- [DO-NOT-TOUCH](file:///Users/user1/wenu-frontend/agent-control/DO_NOT_TOUCH.md)
- [TASK-QUEUE](file:///Users/user1/wenu-frontend/agent-control/TASK_QUEUE.md)
- [AGENT-HANDOFF-PROTOCOL](file:///Users/user1/wenu-frontend/agent-control/AGENT_HANDOFF_PROTOCOL.md)

### Vault canon

- [[brand/BRAND-DNA-2026-05-03]]
- [[brand/voz-de-marca-real-2026-05-03]]
- [[brand/copy-frontend-2026-05-01]]
- [[Estado-Wenu-Mapu-2026-05-10]] (snapshot anterior — sobreescrito por esta nota)

## 10. Para la próxima sesión

Al abrir nueva conversación de Wenu Mapu:

1. Lee esta nota primero.
2. Lee `~/wenu-frontend/agent-control/AGENT_CONTROL_CENTER.md` + `DO_NOT_TOUCH.md`.
3. Lee `codex-next-tasks.md` + `revenue-funnel-map-wenu-mapu.md` §9 (30-day plan).
4. Para copy: `wenu-english-copy-pack-v1.md`.
5. Para custom orders: `custom-orders-system-wenu-mapu.md`.
6. Para appointments: `local-appointments-delivery-system.md`.
7. Para forms: `subscription-implementation-brief.md` + `docs/snippets/forms/`.
8. Confirma per-commit approval antes de tocar código.
9. NO duplicar trabajo: 11 reportes ya escritos esta noche + 8 de la sesión anterior. Build green verificado.

---

<!-- wenu-backlinks -->
[[Home]] · [[Proyectos-MOC]] · [[brand/BRAND-DNA-2026-05-03]] · [[brand/voz-de-marca-real-2026-05-03]] · [[Estado-Sistema]] · [[Plan-Maestro-2026-05-01]] · [[Estado-Wenu-Mapu-2026-05-10]]
