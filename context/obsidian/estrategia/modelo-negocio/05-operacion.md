---
doc: wenu-modelo-negocio
seccion: operacion
version: 0.1
estado: cualitativo-completo
fecha_actualizacion: 2026-05-03
owners_subagentes: [wenuos-ops, wenu-curador, wenu-producto, wenu-brand]
inputs_pendientes:
  - distribucion-horas-fundador
  - costo-software-mensual
  - inventario-fisico-conteo
  - valor-materia-prima
tags: [wenu, modelo-negocio, operacion, infra]
---

# 05 — Operación: Actividades, Recursos y Stack

> Mapa operativo del negocio. Qué se hace, con qué se hace, quién es responsable. Toda decisión de infraestructura o flujo operativo debe consultar y actualizar esta nota.

## Cadena de actividades core

```
[Materia prima]
    ↓
[Producción taller Truckee]  (founder único)
    ↓
[Fotografía pieza]  (founder; ver pipeline)
    ↓
[Pipeline foto→producto]  (Groq + Gemini, lib/photo-pipeline.mjs)
    ↓
[Curaduría / dedup / pricing]  (wenu-producto + revisión humana)
    ↓
[Publicación WooCommerce]  (REST API; sitio Astro consume)
    ↓
[Distribución contenido]  (IG, Pinterest futuro, TikTok futuro, email)
    ↓
[Conversión]  (sitio + pickup local + vitrina B2B)
    ↓
[Fulfilment]  (USPS Priority outbound o pickup con cita)
    ↓
[Post-venta]  (secuencia email + UGC + review + repurchase)
```

## Recursos físicos

- **Taller / showroom Truckee, CA**. Single location post-pivote 2026-04-27. Función dual: producción + showroom para pickup con cita.
- **Vitrina física Wenu** (la retornada de Lucky 7): inventory móvil disponible para asignar a primer partner B2B vitrina-en-estudios.
- **Inventario terminado** (conteo pendiente — input requerido).
- **Inventario materia prima** (valor pendiente — input requerido).
- **Herramientas / equipo de taller** (amortización pendiente — input requerido).

## Recursos humanos

- **Founder único (Nico)**. Cuello de botella estructural. Distribución horaria entre producción / admin / marketing / fotografía pendiente de medir (input requerido). Toda iniciativa que añada carga horaria al founder debe **explícitamente** indicar qué descarga.
- **Subagentes Wenu** como capa de descarga operativa:
  - `wenu-orchestrator` — entrada multi-dominio.
  - `wenu-producto` — catálogo, fichas, precios, sincronización WC.
  - `wenu-brand` — identidad visual, copy IG, tono.
  - `wenuos-ops` — infra, dominios, bots, systemd, Cloudflare.
  - `wenu-curador` — pipeline foto→producto, IA Groq/Gemini.
  - `segundo-cerebro` — vault Obsidian, búsqueda, dedup, MOCs.
  - `daily-synth` — dailies, informes, patrones temporales.

## Stack técnico

### Dominios y red

- `wenumapu.com` y `wenumapuonline.com`.
- Cloudflare Tunnel — operativo (>53 días uptime continuo).
- SSL — operativo (pendiente revisión periódica).

### Infraestructura

- **Cloudflare** — DNS, edge, tunnel.
- **Servicios systemd / launchd** — auto-inicio de procesos locales (Wenu Platform, bots, pipeline).
- **Telegram bot** — operativo, gestión interna.

### E-commerce y contenido

- **WooCommerce** + REST API. Catálogo: 51 productos (6 publish + 45 draft, 477 duplicados detectados — bloqueador no técnico de aprobación).
- **Frontend Astro** — scaffoldeado con páginas `/`, `/catalogo`, `/p/[slug]`, `/pickup`, `/contacto`.
- **Sitio multilenguaje** ES/EN (copy bilingüe en proceso).

### Datos

- **Wenu Platform** — Postgres + Prisma, 22 tablas, admin vía Prisma Studio en `:5555`. Detalle en [[Wenu Platform - Postgres + Prisma BD]].
- **`products.json`** y **`master-db.json`** — fuentes paralelas a consolidar (decisión pendiente: cuál es la fuente canónica única).

### IA / agentes

- **Groq** — clasificación visual (modelo `llama-4-scout`, **no hardcodear, leer de env var**).
- **Gemini** — generación auxiliar.
- **Anthropic Claude** — agentes vía Claude Agent SDK / Claude Code.
- **Pipeline foto→producto** — `lib/photo-pipeline.mjs` con scripts dry-run + backup + log reversible (memoria operativa).

### Vault de conocimiento

- **Obsidian** — `~/Obsidian/WenuAgent/` (297 notas), MOCs estructurados, integración Antigravity MCP, comandos MCP Telegram.

## Asociaciones operativas

- **USPS** — fulfilment outbound (Priority 2-3 días USA).
- **Procesadores de pago** — Stripe, PayPal Express, Apple Pay; Klarna o Afterpay a habilitar para tickets premium ($85+).
- **Email Service Provider** — Klaviyo o MailerLite (decisión Mes 1).
- **Plugins WooCommerce a evaluar** — Judge.me (reviews, tier free), YITH Wishlist (tier free).
- **Plataformas sociales** — Meta (IG), Pinterest (a activar), TikTok (a activar).
- **Partners B2B vitrina-en-estudios** — radio I-80 Tahoe/Truckee/Reno, exclusividad 8 millas. Sin partner activo aún.

## Flujos operativos críticos

### F1 · Foto → producto publicado

1. Founder fotografía pieza terminada.
2. `wenu-curador` ejecuta pipeline `lib/photo-pipeline.mjs`: clasificación Groq + match catálogo + enriquecimiento Gemini.
3. Scripts `apply-*` corren en **dry-run por defecto** + backup + log reversible.
4. Revisión humana (cuello: 30 min para 45 duplicados pendientes).
5. `wenu-producto` publica en WooCommerce vía REST API.
6. Sitio Astro consume el catálogo actualizado.

**Bloqueador actual**: 45 productos duplicados pendientes de aprobación humana — atascados desde 2026-04-27.

### F2 · Pickup local con cita

1. Cliente escribe por DM IG / WhatsApp / email (`contact@wenumapuonline.com`).
2. Founder coordina cita en showroom Truckee.
3. Cliente ve pieza, decide, paga (online o presencial).
4. Pieza se entrega.

### F3 · Venta online con envío USPS

1. Cliente compra en `wenumapuonline.com`.
2. Pago procesado (Stripe / PayPal / Apple Pay; Klarna para tickets premium una vez habilitado).
3. Founder prepara y envía vía USPS Priority (2-3 días).
4. Secuencia email post-compra: confirm → preparing your ritual → shipped → arriving today.
5. 24h post-arrival: email pidiendo foto IG con `#wenu____` (UGC).
6. 7-14 días post-arrival: solicitud review (incentivo: 10% off próxima compra).

### F4 · Vitrina-en-estudios B2B (consignación)

1. Partner aplica vía `contact@wenumapuonline.com` con foto del espacio.
2. Wenu evalúa zona (radio 8 millas, sin overlap), espacio, alineación de clientela.
3. Firma contrato simple PDF (a redactar antes del primer partner).
4. Wenu monta cápsula 8-15 piezas (mix 60% Core / 30% Premium / 10% Acceso).
5. Partner notifica venta dentro de 48h por email/IG DM.
6. Wenu repone en máximo 14 días.
7. Refresh / rotación cada 60 días: visita, retiro de no vendidas, nueva curaduría.
8. Pago al partner mensual día 5 (Zelle/Venmo/cheque), reporte adjunto.
9. Promoción cruzada: 1 post IG/mes taggeando partner; partner sube 1 story/mes.

Términos completos en [[30-Auditorias/2026-04-27-copy-pivote-y-oferta-vitrina]].

## Bloqueadores operativos identificados

| # | Bloqueador | Tipo | Impacto | Owner |
|---|---|---|---|---|
| 1 | 45 productos duplicados pendientes aprobación humana | Decisión | Bloquea publicación de catálogo curado | Founder + wenu-producto |
| 2 | Sin fuente canónica única (WC vs products.json vs master-db) | Decisión | Riesgo de datos divergentes | Founder + wenu-producto |
| 3 | 0 captura email en sitio | Implementación | Pierde lead nurturing | wenu-brand + wenuos-ops |
| 4 | Pinterest y TikTok ausentes | Estrategia | Pierde awareness Gen Z/Y + visual search | wenu-brand |
| 5 | Sin contrato legal vitrina-en-estudios | Documentación | Bloquea onboarding primer partner B2B | Founder |
| 6 | 2,338 fotos en error en pipeline (de 9,412 totales) | Técnico | Reduce inventario disponible para publicar | wenu-curador |
| 7 | Sin reviews automatizados ni UGC re-share flow | Implementación | Señal de confianza débil | wenuos-ops + wenu-brand |

## Hooks subagentes

- **wenuos-ops**: validar mensualmente (a) uptime Cloudflare Tunnel, (b) SSL vigente, (c) servicios auto-arranque, (d) bot Telegram operativo. Reportar en daily si algo falla.
- **wenu-curador**: respetar dry-run + backup + log reversible en todo apply script. No hardcodear modelo Groq.
- **wenu-producto**: cuando exista contradicción entre WC, `products.json` y `master-db.json`, alertar al founder y proponer cuál tomar como canónica antes de modificar.
- **wenu-brand**: cualquier copy nuevo debe usar tagline + paleta + tipografías de [[estrategia/brand-kit]]; cualquier persona-target ajustada debe sincronizar con [[06-glosario-tiers#Segmentos de cliente]].
- **segundo-cerebro**: si encuentra una nota operativa nueva relevante a un flujo F1-F4, agregar wikilink desde aquí.
- **wenu-orchestrator**: cuando el usuario reporte un problema operativo, consultar primero la tabla de Bloqueadores antes de proponer trabajo nuevo.

<!-- wenu-backlinks -->
## Contexto

[[Home]] · [[00-INDEX]] · [[01-bmc]] · [[03-roadmap-90d]] · [[wenuos-sistema-maestro]] · [[Wenu Platform - Postgres + Prisma BD]] · [[20-Operaciones/WENU-CATALOGO-VIVO-ASISTENTE-PRODUCTOS]]
