---
tipo: scorecard
proyecto: wenu-mapu
version: v1
fecha: 2026-07-02
puntaje_global: 64
---

# 📊 Scorecard Wenu Mapu — termómetro del sistema

> Medición en % del estado del negocio/sitio/operación, por área, para un **loop de mejora continua**.
> Cada puntaje sale de **evidencia real** (audits, código, tienda live, NocoDB), no de opinión.
> Bandas: **≥75 Bien** · **60–74 Mejorable** · **45–59 Serio** · **<45 Crítico**.

## Puntaje global v1: **64 / 100** — "buen esqueleto, listo para lanzar"
El puntaje lo frenan **pagos** y **SEO técnico**, NO el diseño.

## Áreas (v1 · 2026-07-02)

| # | Área | % | Estado | Evidencia / qué frena |
|---|---|---|---|---|
| 1 | Pagos / checkout | 42 | 🔴 Crítico | Punto único de falla (`api.wenumapuonline.com` sin fallback), sin tarjeta USD (MP en CLP), funnels por `mailto` |
| 2 | SEO técnico (live) | 48 | 🟠 Serio | Home/shop sin meta description, sin JSON-LD visible, contact canonical a `/contact-2/` |
| 3 | Infra / deploy / monitoreo | 50 | 🟠 Serio | Preview OK pero sin cutover a dominio; sin monitoreo del backend de pagos; antivirus mata procesos locales |
| 4 | Procesos / operaciones | 60 | 🟡 Mejorable | Pipeline de fotos manual; drift NocoDB↔WC (audit sobre-marca por leer NocoDB) |
| 5 | Contenido / copy | 65 | 🟡 Mejorable | Journal + descripciones OK; algo de thin content |
| 6 | Automatizaciones / servicios | 68 | 🟡 Mejorable | Hermes, email V2, aftercare drip, watchdog; frágil (antivirus, Formspree free tier) |
| 7 | Catálogo (datos + fotos) | 70 | 🟡 Mejorable | 166 publicados; +11 fotos reales hoy; quedan low-res + SKU duplicado OTH-003 + RNG-009/010 sin macro |
| 8 | UX / UI | 78 | 🟢 Bien | Diseño on-brand, PDPs completas, herramienta de oreja; algún funnel frágil |
| 9 | Sitio / frontend (código) | 80 | 🟢 Bien | Build verde, 53/53 páginas 200, carrito real |
| 10 | Marca / identidad | 82 | 🟢 Bien | Consistente; bug nombre legal ("Rodrigo") corregido en schema (falta en Zelle handle) |

## 🎯 Próximos 3 targets (dónde sube más el puntaje)
1. **Pagos (42→70):** verificar que los pedidos lleguen a un humano + resolver tarjeta USD (Stripe o aceptar MP CLP) + fallback.
2. **SEO (48→75):** meta descriptions home/shop, JSON-LD, arreglar `/contact-2/` — casi todo ya resuelto en el frontend nuevo → **el cutover lo destraba**.
3. **Infra (50→75):** cutover al dominio + monitoreo del backend de pagos.

## Cómo re-medir (fuentes de verdad por área)
- **Sitio/SEO:** `npm run build` + audit de páginas/meta + Hermes SEO audit.
- **Catálogo:** `scripts/audit-nocodb.mjs` + WC API (`/products`) + `photo_audit.py`.
- **Pagos:** probar `POST api.wenumapuonline.com/shop/order` end-to-end + confirmar notificación a humano.
- **Automatizaciones:** `launchctl list | grep wenu`, estado de crons/watchdog, cola de email.
- **Marca/Contenido/UX:** revisión de copy + schema + consistencia identidad.

## Loop de mejora continua (propuesto)
Rutina recurrente (semanal) que: (1) re-corre los audits, (2) investiga best-practices desde la web para el área más floja, (3) regenera este scorecard y un reporte de deltas (qué subió/bajó desde la semana pasada), (4) propone las 3 acciones de mayor palanca. **Correr en la nube** (no local) para esquivar el antivirus.

<!-- wenu-backlinks -->
Relacionado: [[project_launch_readiness_2026_07_02]] · [[Marimari-Norte]]

<!-- AUTO-WEEKLY-START -->
## 🔄 Última medición automática (2026-07-03)
GLOBAL **65%** (▲+4)

- **Catálogo** 99% = — 164/166 publicados con foto real
- **SEO** 0% = — home meta ✗ · JSON-LD ✗ · shop meta ✗ · canonical ✗
- **Pagos** 50% = — backend HTTP 404 (sin fallback / sin tarjeta USD)
- **Automatiz.** 90% ▲+40 — 2/2 servicios clave vivos
<!-- AUTO-WEEKLY-END -->
