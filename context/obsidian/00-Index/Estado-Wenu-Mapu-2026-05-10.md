---
tipo: project-memory
fecha: 2026-05-10
fuente: sesión nocturna 2026-05-09→10 Claude Code
status: canonical para próxima sesión
prioridad: alta
tags: [wenu-mapu, estado-actual, agent-control, plan]
---

# Estado Wenu Mapu — 10 de mayo 2026

> Snapshot de proyecto al cierre de la sesión nocturna 2026-05-09→10. Toda IA que abra una nueva sesión Wenu Mapu debe leer esta nota antes de actuar. Reemplaza cualquier estado anterior conflictivo.

## 1. Modelo de negocio (canónico — sobreescribe BRAND-DNA §7 si conflicto)

- **Sin studio físico actual.** No mencionar Truth Tattoo, Troll Studio, Lucky7, Thrue Tattoo. Sin "showroom at home", sin "vitrine", sin "walk-ins".
- **Operación: citas privadas + delivery local gratuito** en Truckee / North Lake Tahoe area (Truckee, Kings Beach, Tahoe Vista y nearby Truckee airport).
- **Inventario privado, gestionado en Noco.** Piezas seleccionadas se ven con cita.
- **Contacto público canónico:**
  - Email: marimari@wenumapuonline.com
  - Teléfono: +1 (408) 500-6211
  - Instagram: @wenu__mapu
- **Wording público obligatorio:**
  - "Private appointments available in the Truckee / North Lake Tahoe area."
  - "Free local delivery available in Truckee, Kings Beach, Tahoe Vista and nearby areas."
  - "Selected pieces may be viewed by appointment."

## 2. Estado del sitio público vs Astro redesign

| Item | wenumapuonline.com (legacy WP) | wenu-frontend (Astro redesign-v2) |
|---|---|---|
| Estado | Live, www. funciona, apex 502 | 88 páginas, build verde, no deploy |
| Stack | WP 6.9.4 + Woo 10.7.0 + Elementor + Bridge + Slider Revolution | Astro 6.2.1, Node 24.14.1, CSS puro |
| Footer | Petrolia + +145 fono + Rizoma Digital ❌ | Recientemente actualizado (Phase 2) — pero todavía con email contact@ ❌ → Codex Task 1 lo corrige |
| Idioma UI | Mixto ES/EN ❌ | EN-only ✅ |
| Test products | "producto prueba", "Pronto" visibles ❌ | n/a (Astro lee WC, no inventa) |
| SEO | Sin titles únicos, sin meta, sin JSON-LD ❌ | Title + meta + Org/Website + Product JSON-LD donde aplica ✅ |
| Páginas misión-críticas | 13 routes 404 (custom-orders, materials, artistry, etc.) | Todas existen ✅ |

**Conclusión estratégica:** legacy WP necesita limpieza P0 (footer + test products + idioma) por owner. Todo el desarrollo nuevo va al Astro redesign. Cutover apex → Cloudflare Pages preview es decisión separada (P8 en TASK_QUEUE).

## 3. Trabajo nocturno completado (2026-05-09→10)

Reportes y planes creados/actualizados en `~/wenu-frontend/`:

- ✅ `market-reference-study-wenu-mapu.md` — actualizado con business facts canónicos
- ✅ `live-site-audit-wenumapuonline.md` — actualizado con canonical contact
- ✅ `full-site-completion-plan.md` — NUEVO — sitemap target + spec por página
- ✅ `wenu-contact-and-operations-plan.md` — NUEVO — footer copy + email aliases
- ✅ `wenu-subscription-and-journal-system.md` — NUEVO — Wenu Mapu List + plataforma (MailerLite recomendado)
- ✅ `wenu-visual-agent-plan.md` — NUEVO — pipeline multi-modelo (modes A/B/C/D, gates G1-G5)
- ✅ `docs/handoffs/2026-05-09-asset-07-08/spec.md` — NUEVO — skeleton de handoff Asset 07/08
- ✅ `codex-next-tasks.md` — NUEVO — 7 tasks listas para Codex/Claude Code
- ✅ Esta nota Obsidian

**No se editó código ningún archivo en `src/`.** No deploy. No push. No DNS. No Cloudflare. No WC writes.

## 4. Decisiones de marca / arquitectura tomadas

- **Modelo categorial:** hybrid 3-axis (Placement / Material / Collection) + Story como brand depth. Confirmado por research de 16 brands.
- **Material como anchor premium**: Sterling Silver 950, 14k Gold, Implant-grade Titanium, Vacamuerta Meteorite, Walnut & Tropical Wood, Brass & Bronze. 6 landings nuevos.
- **Plataforma de email**: **MailerLite** recomendada para arrancar (free tier 1k/12k cubre 6-12 meses). Switch a Klaviyo cuando lista pase 5k.
- **Email aliases mínimos primer round**: `marimari@`, `orders@`, `custom@` (todos forward a marimari@ inicialmente).
- **Aftercare: OFF-LIMITS** — separate deploy track per `aftercare-readiness-report.md`.
- **Visual assets: Mode A default** (prompt-only, no credits sin aprobación explícita).

## 5. Próximas acciones owner-only (no Claude/Codex)

1. **Verificar marimari@wenumapuonline.com** existe y es monitoreada.
2. **Confirmar +1 (408) 500-6211** es la línea canónica (no personal).
3. **Crear email aliases** orders@ + custom@ vía registrador / mail provider (Cloudflare Email Routing recomendado, free).
4. **Sign up en MailerLite** bajo marimari@ + verificar sender domain (DNS DKIM + SPF — solo owner).
5. **Editar legacy WP footer + Contact-page-2** con copy canónico (Petrolia → Truckee appointment-only; +145 → +1 (408); remove Rizoma).
6. **Unpublish "producto prueba" + "Pronto"** en WC (status → Draft, no delete).
7. **Decidir apex 502** routing (301 → www OR cutover a Pages preview).
8. **Privacy policy real** con review de abogado (CCPA + GDPR + CAN-SPAM).
9. **Brand session de fotografía**: 6 macros de materiales + Truckee workshop interior + founder portrait + 4-5 process shots.
10. **Cultural review founder** sobre `/collection/chaway` antes de publicar cualquier página Mapuche-inspired.

## 6. Próximas acciones Codex / Claude Code (con per-commit approval)

Orden recomendado (ver `codex-next-tasks.md` para prompts exactos):

1. **Task 1** — Contact + Footer cleanup en Astro (small, low risk, immediate value)
2. **Task 2** — 6 material landing pages + hub (mayor SEO uplift)
3. **Task 3** — Subscription + custom-order + appointment forms (gated en MailerLite signup)
4. **Task 7** — Journal template + 6 founding entries (después de Task 2 para cross-links)
5. **Task 4** — Visual handoff Asset 07 + 08 (cuando llegue source SVG)
6. **Task 5** — Internal link audit (low priority)

## 7. Reglas que NO cambian

Per `~/wenu-frontend/agent-control/DO_NOT_TOUCH.md`:

- No DNS / Cloudflare Tunnel / Cloudflare Access changes
- No WC product writes
- No `.env*` edits o reads-into-output
- No deploy / push / remote-add sin aprobación explícita
- No edits a `public/aftercare/*` o `public/downloads/*`
- No homepage `src/pages/index.astro` structural changes sin per-edit approval
- No nuevo `index.html` en raíz, no segundo `/styles` folder, no segundo design system
- No commits sin per-commit approval

## 8. Hot-links

### Wenu-frontend (planes y reportes)

- [Plan-completo](file:///Users/user1/wenu-frontend/full-site-completion-plan.md)
- [Contact-y-ops](file:///Users/user1/wenu-frontend/wenu-contact-and-operations-plan.md)
- [Subscription](file:///Users/user1/wenu-frontend/wenu-subscription-and-journal-system.md)
- [Visual-agent](file:///Users/user1/wenu-frontend/wenu-visual-agent-plan.md)
- [Codex-tasks](file:///Users/user1/wenu-frontend/codex-next-tasks.md)
- [Live-site-audit](file:///Users/user1/wenu-frontend/live-site-audit-wenumapuonline.md)
- [Market-study](file:///Users/user1/wenu-frontend/market-reference-study-wenu-mapu.md)
- [Agent-Control-Center](file:///Users/user1/wenu-frontend/agent-control/AGENT_CONTROL_CENTER.md)
- [DO-NOT-TOUCH](file:///Users/user1/wenu-frontend/agent-control/DO_NOT_TOUCH.md)
- [TASK-QUEUE](file:///Users/user1/wenu-frontend/agent-control/TASK_QUEUE.md)

### Vault (canon)

- [[brand/BRAND-DNA-2026-05-03]]
- [[brand/voz-de-marca-real-2026-05-03]]
- [[brand/copy-frontend-2026-05-01]]

### Memory

- `~/.claude/projects/-Users-user1/memory/MEMORY.md`

## 9. Para la próxima sesión

Ejecuta lo siguiente al abrir una nueva conversación de Wenu Mapu:

1. Lee esta nota (`Estado-Wenu-Mapu-2026-05-10.md`).
2. Lee `~/wenu-frontend/agent-control/AGENT_CONTROL_CENTER.md` + `DO_NOT_TOUCH.md`.
3. Lee `codex-next-tasks.md` y elige una task según el orden recomendado §6.
4. Confirma per-commit approval antes de tocar código.
5. NO duplicar trabajo: los 8 reportes ya están escritos. No re-auditar marcas competidoras, no re-auditar live site (datos del 2026-05-09 son recientes; trust 7 días per AGENT_HANDOFF_PROTOCOL.md).

---

<!-- wenu-backlinks -->
[[Home]] · [[Proyectos-MOC]] · [[brand/BRAND-DNA-2026-05-03]] · [[brand/voz-de-marca-real-2026-05-03]] · [[Estado-Sistema]] · [[Plan-Maestro-2026-05-01]]
