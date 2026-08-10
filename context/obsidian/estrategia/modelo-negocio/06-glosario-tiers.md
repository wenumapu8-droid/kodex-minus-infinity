---
doc: wenu-modelo-negocio
seccion: glosario
version: 0.1
estado: cualitativo-completo
fecha_actualizacion: 2026-05-03
owners_subagentes: [wenu-producto, wenu-brand, wenu-orchestrator]
inputs_pendientes: []
tags: [wenu, modelo-negocio, glosario, tiers]
---

# 06 — Glosario y Definiciones Canónicas

> Vocabulario operativo de Wenu Mapu. Toda nota, ficha de producto, copy o comunicación interna debe usar estos términos exactos. Si un término aparece en una conversación y no está aquí, agregarlo antes de usarlo.

## Tiers de precio (USD, pre-validación con costos reales)

| Tier | Rango | Llamado interno | Ejemplos | Uso comercial |
|---|---|---|---|---|
| **Acceso** | $25 – $45 | "fragmento entrada" | piezas pequeñas, accesorios complementarios | gateway product, regalos, primera compra |
| **Core** | $45 – $85 | "fragmento core" | piezas principales del catálogo, hangers, plugs medianos | volumen, conversión principal |
| **Premium** | $85 – $150 | "fragmento premium" | piezas con materiales nobles o trabajo elaborado | upsell, ticket alto |
| **Ritual** | $150 + | "pieza ritual" | piezas únicas, custom commissions, ediciones limitadas | reputación, comunidad, márgenes |

**Mix obligatorio en vitrina-en-estudios** (consignación):
60% Core · 30% Premium · 10% Acceso. Definido en [[30-Auditorias/2026-04-27-copy-pivote-y-oferta-vitrina]].

**Engine de pricing pendiente de validar** con costos reales: multiplicador x3.0–x5.0 sobre BASE_VALUES, ver [[20-Operaciones/product-pricing-drafts]].

## Códigos de producto (SKU)

Formato: `WM-<CATEGORIA>-<NUMERO>[_variante]`

| Prefijo | Categoría |
|---|---|
| `WM-HAN-` | Hangers |
| `WM-PLG-` | Plugs |
| `WM-EAR-` | Ear weights |
| `WM-NCK-` | Necklaces / collares |
| `WM-RNG-` | Rings / anillos |
| `WM-SET-` | Sets / colecciones |

Suffix `_front`, `_side`, etc. indica variante de foto, no SKU diferente.

## Segmentos de cliente

- **Lía** (persona target principal): 25-35 años, cuerpo modificado por convicción (stretched ears 8-12mm, septum, varios piercings), identidad espiritual no-tradicional, ingresos $40-70K, dispuesta a pagar premium por piezas con story. Plataforma primaria Instagram, Pinterest para inspiración. Triggers: aniversarios personales, rituales de transición, regalo significativo. Detalle completo en [[30-Auditorias/2026-05-02-customer-journey]].
- **Partner B2B vitrina-en-estudios**: estudios de tatuaje/piercing o retail curado en Tahoe / Truckee / Reno / corredor I-80, exclusividad por radio de 8 millas, espacio con vitrina cerrada y luz controlada. Detalle en [[30-Auditorias/2026-04-27-copy-pivote-y-oferta-vitrina]].
- **Pickup local**: clientela presente en Truckee, North Lake Tahoe o Reno que quiere ver pieza en mano antes de comprar. Cita privada en showroom del taller, gratis.
- **Comprador online USA**: clientela nacional vía portal `wenumapuonline.com`, envío USPS Priority 2-3 días.

## Canales

- **Instagram** (`@wenu__mapu`): canal primario de awareness y comunidad.
- **Pinterest**: a activar (ausencia identificada como friction en customer journey).
- **TikTok**: a activar (ausencia identificada como friction en customer journey).
- **Email** (`contact@wenumapuonline.com`): captura aún no implementada en sitio.
- **WhatsApp**: coordinación de pickup local.
- **Telegram bot**: operativo para gestión interna y comandos.
- **Sitio**: `wenumapuonline.com` (también `wenumapu.com`), frontend Astro + WooCommerce REST API.
- **Vitrina-en-estudios** (B2B consignación): partners físicos en radio Tahoe/Truckee/Reno.

## Tagline canónico

**"Joyería Corporal Artesanal"** — definido en [[estrategia/brand-kit]].

Tagline largo de marca usado en el pivote digital: *"Joyería corporal artesanal de autor. Forjada en Truckee, sin vitrinas intermediarias."*

## Posicionamiento canónico

> "La única casa de joyería corporal con raíz mapuche real, hecha a mano por una sola persona, para cuerpos que entienden el cuerpo como umbral."

Definido en [[30-Auditorias/2026-05-02-competitive-analysis]].

## Términos vitrina-en-estudios (resumen)

- **Comisión partner**: 25% del precio de venta final (Wenu cobra 75%).
- **Mínimo 8 piezas / máximo 15 piezas** por punto.
- **Valor inventario en consignación**: $600 – $1,500 USD a precio de venta.
- **Refresh / rotación**: cada 60 días.
- **Duración mínima**: 90 días, renovable cada 60.
- **Exclusividad geográfica**: 8 millas radio.
- **Pago**: mensual día 5, vía Zelle/Venmo/cheque.

Términos completos en [[30-Auditorias/2026-04-27-copy-pivote-y-oferta-vitrina]].

## KPIs (definiciones, baselines pendientes)

| KPI | Etapa journey | Definición |
|---|---|---|
| Reach IG mensual | Awareness | Cuentas únicas alcanzadas por contenido orgánico |
| Visitas únicas /mes | Interest | Sesiones únicas en `wenumapuonline.com` |
| Tiempo en sitio | Consideration | Avg session duration |
| Add to cart rate | Intent | % de visitas únicas que añaden ≥1 producto al carrito |
| Conversion rate | Purchase | % de visitas únicas que finalizan compra |
| Email open rate | Post-purchase | % de aperturas sobre emails enviados |
| Review rate | Review | % de compradores que dejan reseña |
| Repurchase rate 90d | Repurchase | % de compradores que vuelven a comprar en 90 días |
| AOV | Purchase | Average Order Value (revenue / órdenes) |
| LTV | Lifetime | Lifetime Value promedio por cliente |
| CAC | Lifetime | Customer Acquisition Cost |

Baselines mes 1 y metas mes 3 pendientes de medición — ver [[03-roadmap-90d]].

## Hooks subagentes

- **wenu-producto**: usar prefijos SKU `WM-<CAT>-<NUM>` y rangos de tier al crear/editar productos.
- **wenu-brand**: usar tagline, posicionamiento y persona "Lía" exactos al generar copy IG/web/email.
- **wenu-orchestrator**: cuando aparezca un término ambiguo en una conversación, anclarlo aquí antes de continuar.
- **segundo-cerebro**: si encuentra notas con definiciones contradictorias, alertar y proponer consolidar contra esta nota.

<!-- wenu-backlinks -->
## Contexto

[[Home]] · [[00-INDEX]] · [[01-bmc]] · [[estrategia/brand-kit]] · [[30-Auditorias/2026-04-27-copy-pivote-y-oferta-vitrina]] · [[30-Auditorias/2026-05-02-customer-journey]]
