---
doc: wenu-modelo-negocio
seccion: bmc
version: 0.1
estado: cualitativo-completo
fecha_actualizacion: 2026-05-03
owners_subagentes: [wenu-orchestrator, wenu-brand, wenu-producto]
inputs_pendientes:
  - costo-materiales-por-pieza-tier
  - horas-trabajo-por-pieza
  - tarifa-horaria-fundador
  - costo-herramientas-mensual
  - costo-packaging-envio
  - renta-utilities-truckee
  - costo-software-mensual
  - ventas-historicas-3-6-meses
  - mix-canales-real
  - presupuesto-ads
tags: [wenu, modelo-negocio, bmc]
---

# 01 — Business Model Canvas

> 9 bloques canónicos. Bloques 1, 2, 3, 4, 6, 7, 8 cualitativamente completos. Bloques 5 (revenue streams) y 9 (cost structure) requieren los inputs financieros del usuario; aquí solo van las estructuras y los placeholders.

## Bloque 1 · Propuesta de Valor

**Titular canónico**:
> Joyería corporal artesanal de autor con raíz mapuche real, hecha a mano por una sola persona en Truckee, para cuerpos que entienden el cuerpo como umbral.

**Promesa explícita** (de [[brand/copy-frontend-2026-05-01]]):
- Cada fragmento sale del taller en Truckee directo al cuerpo del portador: sin vitrinas prestadas, sin intermediarios.
- Identidad cultural específica (mapuche), no "tribal genérico".
- Founder único en cadena: todas las piezas pasan por las mismas manos.
- Catálogo curado, no infinito.
- Pickup local con cita en showroom (Truckee / North Tahoe / Reno) o envío USPS Priority a USA.

**Diferenciadores defendibles** (de [[30-Auditorias/2026-05-02-competitive-analysis]]):
- vs **BodyArtForms** (mainstream): no competimos en precio ni catálogo; nos posicionamos arriba con story.
- vs **Tawapa** (premium tribal): identidad cultural mapuche real, no apropiación tribal genérica.
- vs **Diablo Organics** (gothic-tribal, competidor más cercano en estética): mejor experiencia digital + raíz cultural específica.
- vs **Maya Jewelry** (high-end implant grade): no peleamos en certificación implant grade; sí en autenticidad ritual.
- vs **Etsy artisans** (long tail): nuestro cliente target ya está ahí, pero buscando lo curado y con marca real.

## Bloque 2 · Segmentos de Cliente

**Segmento primario — "Lía"** (B2C):
- 25-35 años, cuerpo modificado por convicción, identidad espiritual no-tradicional, ingresos $40-70K, plataforma primaria Instagram. Detalle persona en [[30-Auditorias/2026-05-02-customer-journey]] · resumen en [[06-glosario-tiers#Segmentos de cliente]].

**Segmento secundario — Pickup local**:
- Clientela física en Truckee / North Lake Tahoe / Reno que prefiere ver pieza en mano antes de comprar.

**Segmento B2B — Partners vitrina-en-estudios**:
- Estudios de tatuaje/piercing o retail curado en radio I-80 (Tahoe / Truckee / Reno), con vitrina cerrada y luz controlada, clientela alineada (body-mod, ritual jewelry, dark/tribal/oriental).

**Segmento futuro (12m+) — Custom commission**:
- Clientes recurrentes (LTV >$200) que encargan piezas únicas. A estructurar tras Mes 3.

## Bloque 3 · Canales

| Canal | Función | Estado |
|---|---|---|
| Instagram `@wenu__mapu` | Awareness primario, comunidad | Activo |
| Pinterest | Awareness inspiracional | A activar (Mes 2) |
| TikTok | Awareness Gen Z/Y | A activar (Mes 2-3) |
| Sitio `wenumapuonline.com` | Conversión, catálogo, About | Frontend Astro scaffoldeado, WC API operativa |
| Email | Nurture, repurchase, drops | 0 captura — a setear (Mes 1) |
| WhatsApp | Coordinación pickup local | Activo |
| Telegram bot | Gestión interna | Operativo |
| Vitrina-en-estudios B2B | Punto físico consignación | Borrador términos, sin partner aún |
| Showroom taller (Truckee) | Pickup con cita privada | Activo |

Detalle de canales y términos en [[06-glosario-tiers#Canales]] y [[30-Auditorias/2026-04-27-copy-pivote-y-oferta-vitrina]].

## Bloque 4 · Relación con el Cliente

- **Awareness → Consideration**: orgánico vía contenido editorial IG + Pinterest. Sin ads pagados (decisión a revisar Mes 3).
- **Consideration → Intent**: ficha de producto narrativa ("About this piece"), guía de tallaje (gauge size chart), reviews. Detalle en [[30-Auditorias/2026-05-02-customer-journey]].
- **Intent → Purchase**: email capture pop-up con incentivo, abandonment recovery, opciones de pago (Apple Pay, PayPal Express, Klarna/Afterpay para tickets premium).
- **Post-purchase**: secuencia de 4 emails (confirm → preparing your ritual → shipped → arriving today) + tarjeta handwritten en top 10% pedidos + insert con QR a video "how to wear / rituals".
- **Lifetime / Repurchase**: email "your piece + 1 más para completar el ritual" 30-60 días post-compra; drops con pre-acceso para customers anteriores; comunidad cerrada (Discord Inner Circle) para top 10%.

## Bloque 5 · Fuentes de Ingreso (Revenue Streams)

> ESPERANDO DATOS — la estructura está, los números esperan inputs del usuario.

**Streams identificados**:

1. **Venta directa B2C online** (vía `wenumapuonline.com`).
   - Sub-stream Acceso ($25-45) · Core ($45-85) · Premium ($85-150) · Ritual ($150+). Definición de tiers en [[06-glosario-tiers#Tiers de precio]].
2. **Pickup local con cita** (Truckee / North Tahoe / Reno).
3. **Vitrina-en-estudios B2B (consignación 75/25)**: por cada partner, valor de inventario $600-$1,500 USD, comisión partner 25%, refresh 60 días.
4. **Custom commission** (futuro Mes 6+): piezas únicas a pedido, ticket esperado >$200.
5. **Drops Ritual Limitado** (futuro Mes 3+): cápsulas temáticas con pre-acceso a customers anteriores y miembros Discord.

**Inputs pendientes para llenar este bloque cuantitativamente**:
- AOV histórico
- Mix histórico de tier (% Acceso / Core / Premium / Ritual)
- Mix de canal (% B2C online / pickup / B2B vitrina)
- Tasa de retorno cliente (repurchase 90d)

## Bloque 6 · Recursos Clave

**Humano**:
- Founder único (Nico) — produce, fotografía, atiende, opera. **Cuello de botella estructural** que el modelo debe respetar y descargar progresivamente. Distribución horaria pendiente (input requerido).

**Físico**:
- Taller / showroom Truckee (single location post-pivote).
- Inventario materia prima (valor pendiente — input requerido).
- Inventario terminado (conteo físico pendiente — input requerido).
- Vitrina física Wenu (la que retornó de Lucky 7) — disponible para asignar a partner B2B.

**Marca / intelectual**:
- Identidad mapuche auténtica (no replicable por competencia).
- Brand kit consolidado: paleta (Oro Wenu `#C9A962`, Negro Cósmico `#0A0A0F`), tipografías Cinzel + Cormorant Garamond, tagline. Ver [[estrategia/brand-kit]].
- Persona target documentada ("Lía") en [[30-Auditorias/2026-05-02-customer-journey]].

**Digital / técnico** (detalle completo en [[05-operacion]]):
- Dominios `wenumapu.com` y `wenumapuonline.com`.
- Cloudflare Tunnel + SSL operativos.
- WooCommerce + REST API.
- Frontend Astro scaffoldeado.
- Pipeline foto→producto (`lib/photo-pipeline.mjs` con Groq + Gemini).
- Wenu Platform (Postgres + Prisma, 22 tablas).
- Telegram bot.
- Subagentes Wenu (`wenu-orchestrator`, `wenu-producto`, `wenu-brand`, `wenuos-ops`, `wenu-curador`, `segundo-cerebro`).

## Bloque 7 · Actividades Clave

1. **Producción artesanal** de piezas (taller Truckee).
2. **Curaduría de catálogo** (resolver dedup pendiente, mantener 25-50 SKUs canónicos vivos).
3. **Producción de contenido** (foto editorial, video taller, IG, Pinterest, TikTok, email).
4. **Operación digital** (sitio, fichas, pricing, fulfilment, atención DM/email/WA).
5. **Pipeline foto→producto** (clasificación con IA + match catálogo + publicación).
6. **Gestión de partners B2B** (onboarding, refresh 60 días, reposición ≤14 días post-venta, pago mensual).
7. **Mantenimiento de infraestructura** (Cloudflare, dominios, SSL, bots, Postgres) — ver [[05-operacion]].

## Bloque 8 · Asociaciones Clave

- **Partners vitrina-en-estudios** (B2B, consignación 25/75): 1 por zona Tahoe/Truckee/Reno, máx 8 millas exclusividad. Términos en [[30-Auditorias/2026-04-27-copy-pivote-y-oferta-vitrina]].
- **USPS** — fulfilment outbound USA (Priority 2-3 días).
- **Cloudflare** — edge, DNS, tunnel.
- **WooCommerce + plugins** (theme, payments, reviews futuro Judge.me, wishlist futuro YITH).
- **Stack de IA** (Groq, Gemini, Anthropic) — clasificación de fotos, generación de copy, agentes.
- **Plataformas sociales** (Meta IG, Pinterest, TikTok) — distribución.
- **Email Service Provider** (Klaviyo o MailerLite — a elegir Mes 1).
- **Procesadores de pago** (Stripe, PayPal, Apple Pay, Klarna/Afterpay para tickets premium).

## Bloque 9 · Estructura de Costos

> ESPERANDO DATOS — estructura definida, números esperan inputs del usuario.

**Costos variables (por pieza)**:
- Materiales (input pendiente, por tier).
- Horas trabajo × tarifa horaria (inputs pendientes).
- Packaging y envío (input pendiente).
- Comisiones de pago (~3% Stripe / PayPal).
- Comisión partner B2B (25% sobre PVP en piezas vendidas vía vitrina).

**Costos fijos mensuales**:
- Renta / utilities estudio Truckee (input pendiente).
- Software (hosting WC, Cloudflare, dominios, Groq/Gemini API, ESP, Telegram infra) (input pendiente).
- Herramientas amortizables (input pendiente).
- Tiempo founder no facturable (admin, marketing, foto) (input pendiente).

**Costos discrecionales**:
- Presupuesto ads (input pendiente — decisión Mes 3).
- Photoshoot editorial cada 60 días (a presupuestar).
- Contenido video / colaboraciones (a presupuestar).

## Hooks subagentes

- **wenu-orchestrator**: este BMC es la fuente única para responder preguntas estratégicas. Si el usuario pregunta "cuál es la propuesta de valor" o "quién es el cliente", citar este archivo.
- **wenu-brand**: usar el titular del Bloque 1 y persona "Lía" del Bloque 2 al generar cualquier copy.
- **wenu-producto**: usar tiers del Bloque 5 (linkado a [[06-glosario-tiers]]) al crear/editar productos. Respetar los segmentos del Bloque 2 al definir descripciones.
- **wenuos-ops**: el Bloque 6 (Recursos Clave digital) y el Bloque 8 (Asociaciones técnicas) son su área. Mantenerlos coherentes con [[05-operacion]].
- **wenu-curador**: el pipeline foto→producto es Actividad Clave #5; tratar como dependencia crítica del Bloque 7.

<!-- wenu-backlinks -->
## Contexto

[[Home]] · [[00-INDEX]] · [[06-glosario-tiers]] · [[02-financiero]] · [[03-roadmap-90d]] · [[05-operacion]] · [[estrategia/brand-kit]] · [[30-Auditorias/2026-05-02-customer-journey]] · [[30-Auditorias/2026-05-02-competitive-analysis]] · [[30-Auditorias/2026-04-27-copy-pivote-y-oferta-vitrina]]
