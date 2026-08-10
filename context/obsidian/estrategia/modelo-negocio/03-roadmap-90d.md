---
doc: wenu-modelo-negocio
seccion: roadmap
version: 0.1
estado: cualitativo-completo
fecha_actualizacion: 2026-05-03
ventana: 2026-05-03 → 2026-08-01
owners_subagentes: [wenu-orchestrator, wenu-producto, wenu-brand, wenuos-ops, wenu-curador]
inputs_pendientes:
  - baselines-mes-1-todas-las-metricas
  - revenue-objetivo-mes-3
  - presupuesto-ads
  - decision-fuente-canonica-catalogo
tags: [wenu, modelo-negocio, roadmap, 90d]
---

# 03 — Roadmap 90 días (mayo → agosto 2026)

> Plan operativo de 3 meses. Estructura definida; **KPIs numéricos pendientes** hasta tener baselines del Mes 1. Cualquier iniciativa adicional que entre debe pasar los 5 filtros de [[04-vision-12m#Decisiones que deben alinearse contra esta visión]].

## Mes 1 — Limpieza y captura (mayo 2026)

**Tema**: desbloquear el catálogo, capturar email, hacer convertir lo que ya existe.

### Milestones

1. **Aprobar 45 productos duplicados** (decisión humana, ~30 min). Bloqueador de [[05-operacion#Bloqueadores operativos identificados]] #1.
2. **Decidir fuente canónica de catálogo** (WC vs `products.json` vs `master-db.json`). Bloqueador #2.
3. **Publicar 10-30 productos canónicos** con fichas completas (foto hero + detalle + en-cuerpo, descripción narrativa "About this piece", gauge size chart visible).
4. **Setup email**: elegir ESP (Klaviyo o MailerLite), pop-up captura en sitio con incentivo (10% off first order), bienvenida 3 emails.
5. **Página `/about`** publicada con foto founder, story Truckee + raíz mapuche, video 2-3 min (puede ser MVP corto).
6. **Schema Product + Organization** en sitio para snippets ricos en Google.
7. **Baselines de métricas** medidas (input requerido para Mes 2 y Mes 3).

### KPIs Mes 1 (medir baselines, no metas)

| KPI | Acción |
|---|---|
| Reach IG mensual | Medir |
| Visitas únicas /mes | Medir |
| Tiempo en sitio | Medir |
| Add to cart rate | Medir |
| Conversion rate | Medir |
| Email subs nuevos | Medir |
| Revenue mes | Medir |
| AOV | Medir |

### Bloqueadores que mover

- #1, #2, #3 de [[05-operacion]] (dedup, fuente canónica, captura email).

## Mes 2 — Tracción digital (junio 2026)

**Tema**: activar canales nuevos, ritmo de contenido, primer ciclo B2B.

### Milestones

1. **Pinterest activo** con 3 boards mínimo y 50 pins iniciales (visual search + Lía pasa tiempo ahí).
2. **TikTok activo** con 4 videos del taller / proceso / tagged con keywords nicho.
3. **Cadencia IG definida**: 3 posts/semana + 1 reel/semana + 5 stories/semana.
4. **Primer email blast** a la lista capturada (drop, behind-the-scenes o storytelling).
5. **Cart abandonment automation** (3 emails: hr 1, día 1, día 3).
6. **Primer partner B2B vitrina-en-estudios firmado**: contrato simple PDF + onboarding cápsula 8-15 piezas.
7. **Reviews automatizados**: instalar Judge.me free, primeros 5 reviews on-site.
8. **Apple Pay + PayPal Express** habilitados en checkout.
9. **Refresh editorial**: photoshoot 1 sesión con modelo wearing piezas.

### KPIs Mes 2 (metas vs baseline Mes 1)

| KPI | Meta vs Mes 1 |
|---|---|
| Reach IG mensual | +30% |
| Visitas únicas /mes | +50% |
| Email subs total | ≥ 200 |
| Reviews on-site | ≥ 5 |
| Conversion rate | medir tendencia |
| Partners B2B activos | 1 |

### Bloqueadores que mover

- #4 (Pinterest/TikTok), #5 (contrato vitrina), #7 (reviews + UGC re-share).

## Mes 3 — Sistema escalable (julio-agosto 2026)

**Tema**: operación autónoma día a día, segundo punto B2B, decisión sobre ads.

### Milestones

1. **Pipeline foto→producto en producción diaria** sostenida: founder fotografía, subagentes clasifican y publican; revisión humana <5 min/día. Reducir 2,338 fotos en error.
2. **Segundo partner B2B firmado** en zona distinta (Reno o Tahoe City si el primero estaba en Truckee).
3. **Klarna o Afterpay habilitado** para tickets premium ($85+).
4. **Discord Inner Circle abierto** para top fans (acceso por invitación inicial).
5. **Drop Ritual Limitado piloto** (5 piezas, teaser 7 días antes, pre-acceso a customers anteriores).
6. **Dashboard de métricas activo**: revenue mensual, conversion rate, repurchase rate, mix de canal en una vista.
7. **Decisión sobre ads pagados**: con datos de Mes 1-2, decidir si invertir presupuesto (input pendiente — `presupuesto-ads`) y en qué canal (Pinterest ads, IG ads, ambos, o ninguno aún).
8. **Wholesale catálogo PDF** (descargable con precios mayoristas) — opcional, depende de demanda B2B emergente.

### KPIs Mes 3 (metas)

| KPI | Meta |
|---|---|
| Reach IG mensual | +50% vs Mes 1 |
| Visitas únicas /mes | 3,500 |
| Tiempo en sitio | > 2 min |
| Add to cart rate | 5% |
| Conversion rate | 2% |
| Email open rate | 40% |
| Email subs total | ≥ 500 |
| Reviews on-site | ≥ 15 |
| Partners B2B activos | 2 |
| Repurchase rate 90d | medir (primeros datos disponibles) |
| Revenue mensual | input requerido (`revenue-objetivo-mes-3`) |

### Bloqueadores que mover

- #6 (fotos en error), #4 (cadencia social madura), #5 (segundo partner B2B).

## Vista de tabla por subagente owner

| Iniciativa | Mes | Owner principal | Apoyo |
|---|---|---|---|
| Aprobar duplicados | 1 | founder | wenu-producto |
| Decidir fuente canónica | 1 | founder | wenu-producto |
| Publicar 10-30 productos | 1 | wenu-producto | wenu-curador, wenu-brand |
| Setup ESP + captura email | 1 | wenuos-ops | wenu-brand |
| Página `/about` | 1 | wenu-brand | wenuos-ops |
| Schema Product/Org | 1 | wenuos-ops | — |
| Pinterest activo | 2 | wenu-brand | — |
| TikTok activo | 2 | wenu-brand | — |
| Email blast + abandonment | 2 | wenu-brand | wenuos-ops |
| Primer partner B2B | 2 | founder | wenu-orchestrator |
| Reviews automatizados | 2 | wenuos-ops | — |
| Apple Pay / PayPal Express | 2 | wenuos-ops | — |
| Pipeline foto producción diaria | 3 | wenu-curador | wenu-producto |
| Segundo partner B2B | 3 | founder | wenu-orchestrator |
| Klarna/Afterpay | 3 | wenuos-ops | — |
| Discord Inner Circle | 3 | wenu-brand | — |
| Drop Ritual piloto | 3 | wenu-brand | wenu-producto |
| Dashboard métricas | 3 | wenuos-ops | wenu-orchestrator |
| Decisión ads | 3 | founder | wenu-brand |

## Reglas de operación del roadmap

1. **Una iniciativa nueva entra solo si saca otra** (founder es el cuello de botella).
2. **Toda automatización debe explícitamente indicar qué tiempo del founder libera.**
3. **Un milestone se da por completo solo cuando se mide**, no cuando se "implementa".
4. **Cada Mes cierra con un check formal** de KPIs y bloqueadores; si los KPIs no se acercan a la meta, ajustar antes que continuar.

## Hooks subagentes

- **wenu-orchestrator**: este roadmap es la lista de prioridades vigente. Si el usuario pide trabajo nuevo, validar que cabe en el Mes correspondiente o saca algo.
- **wenu-producto**: ejecutar publicación de productos del Mes 1 contra fuente canónica una vez decidida.
- **wenu-brand**: ejecutar Pinterest, TikTok, email, Discord, drop según calendario.
- **wenuos-ops**: ejecutar captura email, schema, Apple Pay/PayPal, Klarna, dashboard.
- **wenu-curador**: pipeline foto→producto en producción diaria es su milestone principal del Mes 3.

<!-- wenu-backlinks -->
## Contexto

[[Home]] · [[00-INDEX]] · [[01-bmc]] · [[02-financiero]] · [[04-vision-12m]] · [[05-operacion]] · [[30-Auditorias/2026-05-02-customer-journey]] · [[00-Index/Plan-Maestro-2026-05-01]]
