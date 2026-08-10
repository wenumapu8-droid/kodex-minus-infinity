---
tipo: arquitectura-integracion
fecha: 2026-07-04
tags: [wenuos, integracion, arquitectura, fuente-de-verdad, sync]
relacionado: [[00-Index/WenuOS-Estado-Vivo]] · [[00-Index/mapa-sistemas-wenu-2026-06-24]] · [[data-flow]] · [[00-Index/PUERTOS]]
---

# 🗺️ Mapa de Integración WenuOS — un solo organismo

> **Objetivo de Ocin:** que Obsidian + los procesos/proyectos + el sitio + la base de datos dejen de ser silos y se vean como **un solo ecosistema enlazado**.
> Este documento define **quién es la fuente de verdad de cada dato**, **cómo fluye** entre sistemas, qué **ya está conectado**, qué **sigue silado**, y el **plan por fases**. Construye sobre el [[data-flow|flujo de datos AS-IS/TO-BE de abril]] — no lo reemplaza.

---

## 1. El ecosistema real (qué existe y qué toca qué)

Ocho piezas, tres estados de conexión: 🟢 conectado · 🟡 parcial · 🔴 silo.

| Pieza | Rol | Hoy conecta con | Estado |
|---|---|---|---|
| **Obsidian** `~/Obsidian/WenuAgent` | Cerebro: contenido, estrategia, proyectos, SOPs, memoria | Hermes (lee/escribe notas). **No** referenciaba data viva del sitio/DB. | 🔴→🟡 (ver §4) |
| **LaCie** `/Volumes/LaCie/Wenu mapu/WenuMapu` | Fuente de assets originales (fotos, video, PDFs, brand, reportes, base_datos) | wenumapu-system (organiza fotos), `_WOOCOMMERCE_READY` alimenta Woo | 🟡 |
| **NocoDB** (:8080, Docker) | Inventario de trabajo (piezas + fotos) | Manual → WooCommerce (publicación) | 🟡 |
| **WooCommerce** `wenumapuonline.com` | Tienda pública LIVE + checkout actual | wenu-frontend lo lee en build; wenumapu_audit lo audita | 🟢 |
| **wenu-frontend** (Astro, Cloudflare Pages) | Sitio nuevo | Lee Woo en build-time (`WC_URL`) | 🟢 (con Woo) / 🔴 (con pagos) |
| **wenu-platform** (:3335 + Postgres :5432) | Backend unificado + pagos | Postgres vivo; audita Woo; **hoy ARRIBA** | 🟡 |
| **Hermes** (:gateway Telegram) | Orquestación + notificaciones | Lee Obsidian, corre cron, avisa a Ocin | 🟢 |
| **wenu-agent-hub** | Bots (telegram/discord), email, photo pipeline | Obsidian memory, Woo sync (stale abr-2026) | 🟡 (solapa con Hermes) |

**Lo que YA está conectado (no rehacer):**
- Producto: **NocoDB → WooCommerce → sitio Astro** (build-time). El pipeline de catálogo existe.
- Auditoría: **WooCommerce → wenumapu_audit → Telegram + Obsidian** (diaria, read-only).
- Notificaciones: **Obsidian (reportes) → Hermes → Telegram** (recién implementado, ver [[integrations/hermes-notificaciones-reportes]]).
- Assets: **LaCie → wenumapu-system (organizar) → `_WOOCOMMERCE_READY` → Woo**.

**El silo principal:** Obsidian vivía **desacoplado de la data**. Los proyectos y notas no "sabían" qué está live, cuántos productos hay, si los pagos corren, qué encargos están pendientes. Ese es el hueco que ataca este trabajo (§4).

**Silo secundario:** hay **data de producto en 3 lugares** (NocoDB, Postgres/wenu-platform, WooCommerce). Sin una fuente de verdad declarada, se pisan. Requiere decisión de Ocin (§3, §5).

---

## 2. Diagrama de interconexión (TO-BE)

```
        FUENTES DE VERDAD                     PUBLICACIÓN / CONSUMO
 ┌──────────────────────────┐
 │ LaCie  (assets crudos)   │──derivados──►  _WOOCOMMERCE_READY ──►┐
 └──────────────────────────┘                                      │
 ┌──────────────────────────┐                                      ▼
 │ NocoDB (inventario vivo) │──publica(aprob.)──────────────►  WooCommerce ──build──►  wenu-frontend (Astro)
 └──────────────────────────┘                                      │                         (sitio público)
             │ sync lectura                                        │ audita
             ▼                                                     ▼
 ┌──────────────────────────┐   pagos/pedidos/clientes    ┌──────────────────┐
 │ wenu-platform (Postgres) │◄───────────────────────────►│ wenumapu_audit   │
 │  = verdad TRANSACCIONAL  │                              └──────────────────┘
 └──────────────────────────┘
             │ estados reales (read-only)
             ▼
 ┌──────────────────────────┐   genera    ┌───────────────────────────┐   avisa
 │ wenuos-live-dashboard.py │────────────►│ Obsidian (vault = cerebro)│──────────► Hermes ──► Telegram (Ocin)
 └──────────────────────────┘             │  proyectos + estrategia   │
                                          └───────────────────────────┘
```

---

## 3. Fuente de verdad por tipo de dato (la regla)

Para que nada se pise, **un tipo de dato = un dueño**. Todo lo demás lo **lee**, no lo re-inventa.

| Tipo de dato | Fuente de verdad | Quién lee / deriva | Dirección |
|---|---|---|---|
| **Productos, stock, precios** | **NocoDB** (inventario de trabajo) | Woo (publica) → sitio (build) | NocoDB → Woo → sitio (una vía) |
| **Assets originales** (foto/video/PDF/brand) | **LaCie** | derivados `_WOOCOMMERCE_READY` → Woo/sitio | LaCie → derivados (una vía) |
| **Tienda pública + checkout (hoy)** | **WooCommerce** | wenu-frontend lo consume | Woo → sitio |
| **Pedidos, pagos, clientes, encargos** | **wenu-platform (Postgres)** | dashboard, Hermes | transaccional, dueño único |
| **Contenido, estrategia, proyectos, SOPs, memoria** | **Obsidian** | Hermes, humanos | Obsidian es el cerebro |
| **Notificaciones / orquestación** | **Hermes** (Telegram) | recibe de todos | punto de salida único |

> **Decisión pendiente de Ocin (§5):** confirmar que **NocoDB es el master de producto** y que Postgres/wenu-platform **sincroniza desde Woo** (no es un 3er master). Sin esta regla, los 3 catálogos divergen.

---

## 4. Qué conecté AHORA (implementado, funcionando)

**a) Dashboard vivo — Obsidian ↔ data real.** Nuevo enlace que faltaba: una nota de Obsidian que se **regenera leyendo el estado real** de servicios, Postgres, git y Hermes.

- Nota: **[[00-Index/WenuOS-Estado-Vivo]]** (se sobrescribe, no editar a mano).
- Generador: `~/.hermes/scripts/wenuos-live-dashboard.py` (read-only; psql + chequeo de puertos + git + `hermes cron list`).
- Muestra en vivo: servicios arriba/caídos, nº de productos/pedidos/clientes/encargos pendientes, productos por status, último commit del sitio, LaCie montado, cron de Hermes.
- **Automatizado** vía cron de Hermes `wenuos-live-dashboard` (id `e20d09c84611`, `0 8,14,20 * * *`, `--deliver local` = refresca la nota sin spamear Telegram).
- **Lectura verificada 2026-07-04 12:14:** Postgres 🟢, wenumapu-system 🟢, **wenu-platform pagos 🟢 (arriba)**, NocoDB 🟢, n8n 🔴; 51 productos (todos ACTIVE), 8 clientes, 7 pedidos, 2 encargos pendientes; sitio commit 03-jul; 12 cron activos.

**b) Notificación de reportes — Obsidian → Hermes → Telegram** (entregado en la tarea previa; ver [[integrations/hermes-notificaciones-reportes]]). Cualquier reporte nuevo en `20-Operaciones/30-Auditorias/estrategia/` avisa a Ocin.

**c) Referencias cruzadas.** El dashboard enlaza al mapa de sistemas, al flujo de datos, a puertos y a las notificaciones — el vault deja de tener notas huérfanas sobre infra.

---

## 5. Plan por fases (lo que falta)

**Fase 1 — Enlace de lectura (HECHO / casi).** ✅ Dashboard vivo + notificaciones de reportes. 
- Pendiente menor: instalar el plugin **Dataview** en Obsidian para que las notas de proyecto consulten frontmatter (ej. `status`, `sku`) y armen tableros dinámicos sin scripts. *(Requiere Ocin: instalar plugin desde Obsidian.)*

**Fase 2 — Fuente de verdad de producto (decisión + sync).** 
- Ocin decide: NocoDB = master de producto.
- Script de sync **Woo → Postgres** (read) para que el dashboard y los pagos usen catálogo real. La base ya existe (wenu-platform ya audita Woo). Falta el job de reconciliación NocoDB↔Woo↔Postgres.
- Índice en Obsidian por SKU que referencie estado live (una nota por línea de producto que lea del dashboard/DB).

**Fase 3 — Conectar pagos al sitio (el gran build).** 
- La API de pagos ya corre (:3335) y tiene MercadoPago + NOWPayments. Falta **cablear el form de custom-order del Astro** al endpoint (`fetch` a `/custom-orders` + `/deposit-link`) o pasar Astro a SSR. Ver [[00-Index/mapa-sistemas-wenu-2026-06-24]].
- Alinear dominios de webhook (`api.wenumapu.com` vs `wenumapuonline.com`).

**Fase 4 — Tracker de proyectos ligado a estados reales.** 
- Que cada proyecto en Obsidian tenga frontmatter con `sistema`, `estado`, `depende_de`, y que un script marque "live/stale" cruzando con el dashboard (ej. "proyecto pagos → API 🟢 pero sitio no cableado").
- Consolidar bots: decidir Hermes vs wenu-agent-hub (hoy solapan) para no mantener dos.

**Fase 5 — n8n + backups automáticos.** Levantar n8n (:5678 caído), automatizar backup LaCie, y cerrar la migración WP→Astro.

---

## 6. Qué necesita a Ocin (decisiones / cuentas / credenciales)

- **Decisión:** confirmar **NocoDB como master de producto** (regla §3). Sin esto, Fase 2 no arranca.
- **Decisión:** ¿consolidamos en **Hermes** y archivamos wenu-agent-hub, o al revés? Hoy hay dos asistentes Telegram.
- **Acción liviana:** instalar el plugin **Dataview** en Obsidian (Fase 1).
- **Credenciales (NUNCA en chat/frontend):** si se quiere que el sync toque Woo por API de escritura, hace falta `WC_CONSUMER_KEY/SECRET` con permiso write en el `.env` de wenu-platform (hoy hay read para build). Ocin las agrega en `~/wenu-platform/.env`.
- **Confirmar dominios** de webhook de pagos antes de Fase 3.

---

*Read-only sobre los datos de Ocin. Cero secretos expuestos: sólo nombres de variables, puertos y conteos (que no son secretos).*


---

> 🧭 **MODELO CANONICO (2026-07-04):** la definicion autoritativa de una-fuente-por-dato, el sync NocoDB->Woo, la auditoria runtime-sin-IA y el plan de consolidacion de asistentes viven en [[00-Index/WenuOS-Modelo-Canonico]]. Leer ese primero.
