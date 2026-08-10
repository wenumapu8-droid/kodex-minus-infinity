---
tipo: blueprint-automatizacion
fecha: 2026-07-04
tags: [wenuos, automatizacion, blueprint, fuente-de-verdad, hermes]
relacionado: [[00-Index/WenuOS-Mapa-Integracion]] · [[00-Index/WenuOS-Estado-Vivo]] · [[00-Index/WenuOS-Fase3-Cableado-Pagos]]
---

# ⚙️ WenuOS — Blueprint de Automatización

> Objetivo de Ocin: cablear todo para que corra **en automático, siempre**. Este blueprint define, por dominio, la **fuente de verdad**, el **evento que dispara qué automatización**, y el **estado real** (✅ ya conectado · 🔶 wireable ahora sin credenciales · 🔑 necesita cuenta/credencial de Ocin · 🏗️ build futuro).
> Regla de oro (de [[00-Index/WenuOS-Mapa-Integracion]]): **un dato = un dueño**. Nada se automatiza sobre data que se pisa.

---

## Resumen por dominio

| Dominio | Fuente de verdad | Evento → automatización | Estado |
|---|---|---|---|
| **Notificaciones** | Hermes (Telegram) | reporte nuevo / pedido / abono / infra caída → aviso a Ocin | ✅ conectado |
| **Pedidos y clientes** | wenu-platform (Postgres :3335) | pedido o encargo nuevo, abono pagado → alerta Telegram + índice | ✅ conectado (alerta) / 🏗️ (checkout live) |
| **Catálogo** | NocoDB (a confirmar) | cambio de stock/precio → publicar a Woo → rebuild sitio | 🔶 índice ✅ / 🔑 sync escritura |
| **Contenido / journal** | Sitio (`src/content/journal`) → espejo en Obsidian | entrada publicada → índice en Obsidian; idea de estrategia → borrador | ✅ índice / 🏗️ ida-vuelta |
| **Email marketing** | Klaviyo (key presente) + Formspree (captura) | signup → lista; carrito/pedido → flujo email | 🔑 build con Klaviyo |
| **Instagram** | @wenu__mapu (Meta) | post nuevo → registrar; producto listo → publicar | 🔑 Graph API (muy gateada) |

---

## 1. Notificaciones — ✅ CONECTADO

- **Fuente de verdad:** Hermes, canal Telegram DM de Ocin (`chat_id 5773729925`).
- **Automatizaciones vivas (Hermes cron):**
  - `wenu-report-notifier` (10m) — reporte nuevo en `20-Operaciones/30-Auditorias/estrategia` → aviso. Ver [[integrations/hermes-notificaciones-reportes]].
  - `wenuos-order-alert` (15m) — pedido/encargo nuevo o abono pagado → aviso (ver dominio 2).
  - `wenuos-live-dashboard` (8/14/20h) — refresca [[00-Index/WenuOS-Estado-Vivo]].
  - `wenuos-data-index` (7:30/13:30/19:30) — refresca índices de catálogo/clientes/pedidos/journal.
  - Ya existían: `stuck-task-sweeper`, `claude-watchdog`, ciclos de inventario, etc.
- **Evento → acción:** archivo/registro nuevo detectado → stdout → Hermes entrega a Telegram. Patrón `[SILENT]`: sólo habla cuando hay algo.

## 2. Pedidos y clientes — ✅ ALERTA CONECTADA / 🏗️ CHECKOUT

- **Fuente de verdad:** Postgres de wenu-platform (tablas `Order`, `CustomOrder`, `Customer`). API viva en :3335.
- **Automatización viva:** `wenuos-order-alert.py` lee Postgres cada 15 min; avisa por Telegram: 🛒 pedido nuevo, ✍️ encargo custom nuevo, 💰 abono pagado. Baseline silencioso hecho (no re-avisa los históricos).
- **Índice vivo:** [[00-Index/WenuOS-Pedidos.md]] y [[00-Index/WenuOS-Clientes.md]] (regenerados por cron).
- **Evento → acción:** hoy los pedidos entran por caminos legacy; cuando el checkout del sitio quede cableado (Fase 3), los pedidos reales caen en Postgres y disparan la alerta automáticamente. La cañería de notificación **ya está lista**.
- **🔑 / 🏗️:** el checkout público real depende de Fase 3 (ver [[00-Index/WenuOS-Fase3-Cableado-Pagos]]).

## 3. Catálogo — 🔶 ÍNDICE ✅ / 🔑 SYNC ESCRITURA

- **Fuente de verdad propuesta:** **NocoDB** (inventario de trabajo, 89 piezas) → publica a WooCommerce → sitio lo lee en build.
- **Automatización viva:** [[00-Index/WenuOS-Catalogo.md]] (índice regenerado desde Postgres, marca stock bajo).
- **⚠️ Hallazgo real (bloqueante para automatizar catálogo):** la tabla `Product` de Postgres está **contaminada con registros por-foto** (ej. `WM-PLG-001_front`, `WM-LAB-002_macro`), 49 de 51 con stock 0. No es un catálogo limpio: son fotos que el clasificador registró como productos. **Antes de automatizar precio/stock hay que limpiar y definir el master** (NocoDB) y reconciliar. Decisión de Ocin.
- **🔑 wireable con credencial existente:** `NOCODB_URL/TOKEN/TABLE_PIEZAS` ya están en el `.env` de wenu-platform → un sync **lectura** NocoDB→Postgres es posible sin credenciales nuevas. El sync **escritura** a Woo necesita `WC_CONSUMER_KEY/SECRET` con permiso write (hoy sólo read para build).

## 4. Contenido / journal — ✅ ÍNDICE / 🏗️ IDA-VUELTA

- **Fuente de verdad:** el sitio, en `wenu-frontend/src/content/journal/*.md` (colección Astro con frontmatter `title/date/series`). Formspree captura emails del journal.
- **Automatización viva:** [[00-Index/WenuOS-Journal.md]] — espejo en Obsidian de las entradas publicadas (título, fecha, URL). Conecta contenido del sitio ↔ estrategia en el vault.
- **Evento → acción (hoy):** entrada nueva en el sitio → aparece en el índice al próximo refresh.
- **🏗️ build futuro:** ida-vuelta real (escribir un borrador en Obsidian → generar el `.md` de la colección del sitio). Es seguro pero es un build (mapear frontmatter, imágenes, commit+deploy).

## 5. Email marketing — 🔑 BUILD CON KLAVIYO

- **Fuente de verdad:** **Klaviyo** (`KLAVIYO_PRIVATE_API_KEY` **presente** en `wenu-frontend/.env`) + Formspree (captura inmediata en home/journal/footer). **No hay MailerLite** (fue reemplazado por Klaviyo/Formspree).
- **Evento → automatización (objetivo):** signup → lista Klaviyo → flujo de bienvenida; pedido/abono → email transaccional (SMTP ya configurado en wenu-platform vía nodemailer/resend); carrito → recupero.
- **🔑 Qué falta de Ocin:** confirmar que Klaviyo es el canal y que la API key tiene permisos de escritura de perfiles/eventos. Con eso, se puede automatizar "nuevo cliente en Postgres → upsert perfil en Klaviyo" (sin credenciales nuevas si la key ya está). Campañas/flows se diseñan en Klaviyo (cuenta de Ocin).
- **Nota:** no se toca ninguna key; vive sólo en el `.env`.

## 6. Instagram — 🔑 MUY GATEADA

- **Fuente de verdad:** cuenta `@wenu__mapu` (Meta).
- **Evento → automatización (objetivo):** producto listo (foto en `_WOOCOMMERCE_READY`) → publicar en IG; post nuevo → registrar métricas en Obsidian.
- **🔑 Qué falta de Ocin (realista, sin promesas):** la **Instagram Graph API** exige cuenta **Business**, vinculada a una **Página de Facebook**, una **app de Meta** revisada, y tokens de larga duración. Es un proceso de aprobación de Meta, no algo que se cablee en una sesión. **Publicación automática = build futuro dependiente de cuenta/onboarding de Meta.** Alternativa intermedia: preparar el borrador (caption + imagen) en Obsidian y que Ocin publique con un toque.

---

## Lo que quedó AUTOMATIZADO ahora (esta sesión)

1. `wenuos-order-alert` — alerta de ventas por Telegram (Postgres → Hermes), 15 min. Baseline silencioso.
2. `wenuos-data-index` — índices vivos en Obsidian de catálogo, clientes, pedidos y journal (DB/sitio → Obsidian), 3×/día.
3. (previas) `wenu-report-notifier` y `wenuos-live-dashboard`.
4. Notas nuevas enlazadas: [[00-Index/WenuOS-Catalogo]], [[00-Index/WenuOS-Clientes]], [[00-Index/WenuOS-Pedidos]], [[00-Index/WenuOS-Journal]].

Todo read-only sobre la data, sin credenciales nuevas, sin secretos en ningún lado.

## Decisiones / credenciales que faltan de Ocin

- **Decisión — catálogo:** confirmar NocoDB como master y **limpiar la tabla Product** (registros por-foto). Sin esto no se automatiza precio/stock con seguridad.
- **Decisión — bots:** consolidar en Hermes o en wenu-agent-hub (hoy solapan).
- **🔑 Woo escritura:** `WC_CONSUMER_KEY/SECRET` con permiso write (sync catálogo → tienda).
- **🔑 Klaviyo:** confirmar canal + permisos de la API key (email marketing automatizado).
- **🔑 Instagram:** onboarding de Meta Graph API (Business + Página + app revisada). Build mayor.
- **Fase 3 (checkout):** ver spec dedicada → [[00-Index/WenuOS-Fase3-Cableado-Pagos]].

*Nada de "todo automático ya": lo que depende de cuentas externas (Klaviyo, Meta, Woo write) está marcado 🔑 y no se promete como hecho.*
