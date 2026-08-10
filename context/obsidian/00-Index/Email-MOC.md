---
title: Email — MOC
date: 2026-05-11
purpose: Mapa unificado de las tres capas del sistema de email Wenu Mapu
---

# Email — MOC

Sistema de email Wenu Mapu en tres capas. Cada capa tiene un propósito diferente y todas convergen en `marimari@wenumapuonline.com` como inbox real.

## Estado al 2026-05-11

- **Infra DNS** ✅ MX Titan + SPF + DKIM + DMARC `p=none` activos (verificado por dig en 4 resolvers)
- **7 alias** ✅ orders/support/custom/aftercare/journal/wholesale/press → marimari@
- **Layer 1 transactional** ✅ código completo, dry-run OK, ❌ no probado en vivo
- **Layer 2 WP Mail SMTP** ⏳ plan escrito, pendiente owner
- **Layer 3 MailerLite** ⏳ frontend Path B activo, Path A pendiente owner
- **Frontend Astro** ✅ Footer + Contact page con departamentales (commit `ec30061` + `379f8de`, sin push)

## Las tres capas

### Layer 1 — Transactional (Titan SMTP + Node) + Agent Router + always-on Server

**Service runbook**: [[20-Operaciones/email-agent-service]] · `com.wenu.email-agent` en launchd · `127.0.0.1:3360`

**Rate limiting Titan SMTP**: 150/día, 30/hora, 6/min · reserva 20 últimas/día solo HOT · Telegram alerts a 50/75/90% · counter persistente `email/data/sent-counter.json`

**Queue persistente**: COLD rebotados auto-encolados · worker cada 60s · backoff exponencial · dead-letter después 5 attempts · ver [[20-Operaciones/email-agent-service]]

**Aftercare subscribers**: opt-in via form en `/care-guide` → DB local → drip auto day-0/3/14/90 · ver [[20-Operaciones/aftercare-subscriber-system]]



Branded emails V2 (esencia inyectada 2026-05-11) enviados desde código por eventos, con clasificación automática y notificación al dueño.

- **Ubicación**: `~/wenu-agent-hub/email/`
- **CLI manual**: `node email/scripts/send.mjs <template> --to <addr>`
- **Preview**: `node email/scripts/preview.mjs` → abre HTML index
- **Envío batch V2 (one-shot)**: `node email/scripts/send-all-v2-batch.mjs`
- **Agent router**: `email/agents/router.mjs` — `handleEvent({ type, customer, payload, summary, body, meta })`
- **Notificador interno (email)**: `email/lib/notify.mjs` → `wenu.mapu8@gmail.com` con reply-to al cliente (solo HOT)
- **Notificador Telegram**: `email/lib/telegram.mjs` → chat `5773729925` (TODOS los eventos, HOT con 🔔 prefix)
- **11 templates V2** (todos con: Land of the Sky, sacred territory, bilingüismo donde aplica, frases canónicas de materiales):
  - welcome-circle · commission-ack · order-confirmation · shipping-notice
  - curation-reply · appointment-confirm
  - aftercare-day-0 (NEW) · aftercare-day-3 · aftercare-day-14 · aftercare-day-90
  - generic-ack (NEW, fallback router catch-all)
- **Reply-To routing**: marimari@ general · orders@ pedidos · custom@ commissions · aftercare@ aftercare
- **Hot types**: commission, curation, appointment, generic → auto-reply + email interno + Telegram 🔔
- **Cold types**: order, shipping, aftercare-day-*, newsletter → auto-reply + Telegram (silencioso, sin 🔔)
- **Auditoría 2026-05-11**: [[20-Operaciones/auditoria-email-2026-05-11]]
- **Propuesta V2**: [[20-Operaciones/propuesta-email-v2-esencia-y-agentes-2026-05-11]]

### Layer 2 — WordPress transactional (WP Mail SMTP → Titan)

Sustituye el `mail()` PHP nativo de WP por SMTP de Titan, para que las notificaciones del contact form + WooCommerce no caigan en spam.

- **Setup checklist**: `~/wenu-frontend/wp-mail-smtp-setup.md` (owner-driven)
- **Plugin**: WP Mail SMTP by WPForms
- **Trigger**: eventos WP/WC (orden, password reset, contact form)

### Layer 3 — Marketing / lifecycle (MailerLite)

Newsletter + secuencias de welcome para "The Wenu Mapu List".

- **Setup checklist**: `~/wenu-frontend/mailerlite-setup-owner-checklist.md` (owner-driven)
- **Frontend scaffolding**: `~/wenu-frontend/src/lib/subscribe.ts`, `components/forms/`
- **Path A vs Path B**: B = mailto fallback (activo). A = MailerLite real (post-signup).
- **Sender**: `journal@wenumapuonline.com` (alias hoy, futuro: verified sender en MailerLite con DKIM CNAME)

## Documentación de operación

### Plan + estado
- [[wenu-corporate-email-system-plan]] — plan canonical de migración (status: ejecutado)
- [[20-Operaciones/auditoria-email-2026-05-11]] — auditoría completa 3 capas + vault
- **[[20-Operaciones/propuesta-email-v2-esencia-y-agentes-2026-05-11]]** — V2 editorial + arquitectura de agentes (pendiente aprobación owner)

### Operación día a día
- [[email-runbook]] — agregar/eliminar alias, monitoreo DMARC, troubleshooting, health checks mensuales
- [[inbox-rules-labels]] — filtros y etiquetas en Titan webmail
- [[email-signature]] — firma corporativa (plain-text + HTML)

### Contenido
- [[email-templates]] — 7 canned-response templates para webmail (general/orders/custom/aftercare/local/wholesale/press)
- [[website-contact-copy]] — copy aplicado en Footer + Contact page

## Direcciones publicadas

| Dirección | Dónde aparece | Tipo |
|---|---|---|
| `marimari@wenumapuonline.com` | Footer global + Contact page (General) | Inbox real |
| `orders@wenumapuonline.com` | Contact page (Orders card) | Alias |
| `custom@wenumapuonline.com` | Contact page (Custom Orders card) | Alias |
| `support@wenumapuonline.com` | Contact page (Support card) | Alias |
| `aftercare@wenumapuonline.com` | Contact page (Aftercare card) | Alias |
| `journal@wenumapuonline.com` | NO publicado (futuro newsletter sender) | Alias |
| `wholesale@wenumapuonline.com` | NO publicado (compartir manual) | Alias |
| `press@wenumapuonline.com` | NO publicado (compartir manual) | Alias |

## DNS canónico (verificar con dig)

```bash
dig +short MX wenumapuonline.com       # mx1/mx2.titan.email
dig +short TXT wenumapuonline.com      # v=spf1 include:spf.titan.email ~all
dig +short TXT titan1._domainkey.wenumapuonline.com   # DKIM Titan
dig +short TXT default._domainkey.wenumapuonline.com  # DKIM HostGator (legacy)
dig +short TXT _dmarc.wenumapuonline.com              # p=none, rua a CF dashboard
```

## Decisiones pendientes (auditoría 2026-05-11)

1. **Commission timeline**: 3–6 weeks vs 6 months ([[email-templates]] #3 vs `commission-ack.mjs`).
2. **Tagline**: "Ritual Body Jewelry" ([[email-signature]]) vs "Adornment for the sacred body" (templates Layer 1).
3. **SES enviar.subdomain**: [[email-runbook]] lo menciona pero no existe en DNS — borrar o levantar.

## Tareas owner-driven pendientes

1. Test forwarding: Gmail → orders@ → verificar llega a marimari@
2. Test SMTP en vivo: `node email/scripts/send.mjs welcome-circle --to wenu.mapu8@gmail.com --vars '{"firstName":"Maite"}'`
3. 2FA en HostGator y Cloudflare
4. Push `redesign-v2` a origin
5. MailerLite signup (Layer 3 Path A)
6. WP Mail SMTP plugin (Layer 2)
7. Review DMARC reports al 2026-05-18 (T+1 semana)

<!-- wenu-backlinks -->
---
[[Home]] · [[Operaciones-MOC]] · [[50-Claude-Memory/MEMORY]]
