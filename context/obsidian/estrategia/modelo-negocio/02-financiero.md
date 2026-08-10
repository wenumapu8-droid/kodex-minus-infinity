---
doc: wenu-modelo-negocio
seccion: financiero
version: 0.1
estado: esperando-datos
fecha_actualizacion: 2026-05-03
owners_subagentes: [wenu-producto, wenu-orchestrator]
inputs_pendientes:
  - costo-materiales-por-pieza-tier
  - horas-trabajo-por-pieza
  - tarifa-horaria-fundador
  - costo-herramientas-mensual
  - costo-packaging-envio
  - renta-utilities-truckee
  - costo-software-mensual
  - distribucion-horas-fundador
  - ventas-historicas-3-6-meses
  - ticket-promedio
  - mix-canales-real
  - tasa-retorno-cliente
  - inventario-fisico-conteo
  - valor-materia-prima
  - presupuesto-ads
  - revenue-objetivo-mes-3
  - revenue-objetivo-mes-12
  - break-even-deseado
tags: [wenu, modelo-negocio, financiero]
---

# 02 — Modelo Financiero

> **Esta sección está bloqueada hasta recibir los inputs financieros del usuario.**
> Estructura del documento ya definida; cuando lleguen los datos, se llenan las secciones marcadas con `[INPUT]` y este `estado` cambia a `cualitativo-completo` y luego a `aprobado`.

## Inputs requeridos del usuario (checklist)

> Esta es la lista exacta a recolectar. Cada item bloquea una sección de este archivo.

### Costos producción (por tier $25-45 / $45-85 / $85-150 / $150+)

- [ ] Costo materiales por pieza promedio (por tier).
- [ ] Horas trabajo por pieza (por tier).
- [ ] Tarifa horaria autoasignada del fundador.
- [ ] Costo herramientas amortizable mensual.
- [ ] Costo packaging por envío.

### Operación

- [ ] Renta / utilities estudio Truckee (mensual USD).
- [ ] Costo software mensual: hosting WC, Cloudflare, dominios, Groq API, Gemini API, ESP, Telegram infra.
- [ ] Distribución horas semanales founder: producción / admin / marketing / fotografía.

### Histórico ventas (últimos 3-6 meses)

- [ ] Unidades vendidas por mes y revenue por mes.
- [ ] Ticket promedio (AOV).
- [ ] Mix de canales (% IG, pickup, email, WhatsApp, vitrina).
- [ ] Tasa de retorno cliente (repurchase).

### Inventario

- [ ] Conteo físico piezas terminadas (por tier).
- [ ] Valor materia prima en stock.

### Marketing

- [ ] Followers IG actuales + crecimiento mensual últimos 3 meses.
- [ ] Engagement rate IG.
- [ ] Presupuesto disponible para ads.

### Metas

- [ ] Revenue objetivo Mes 3.
- [ ] Revenue objetivo Mes 12.
- [ ] Punto break-even deseado (revenue mensual mínimo para cubrir todos los costos).

## Estructura del documento (a llenar cuando lleguen inputs)

### A · Costo unitario por tier

| Tier | Materiales | Horas × tarifa | Packaging | Comisiones pago | Costo total | Precio target | Margen bruto $ | Margen bruto % |
|---|---|---|---|---|---|---|---|---|
| Acceso ($25-45) | [INPUT] | [INPUT] | [INPUT] | ~3% | [CALC] | $35 | [CALC] | [CALC] |
| Core ($45-85) | [INPUT] | [INPUT] | [INPUT] | ~3% | [CALC] | $65 | [CALC] | [CALC] |
| Premium ($85-150) | [INPUT] | [INPUT] | [INPUT] | ~3% | [CALC] | $115 | [CALC] | [CALC] |
| Ritual ($150+) | [INPUT] | [INPUT] | [INPUT] | ~3% | [CALC] | $200 | [CALC] | [CALC] |

> Validar contra el engine de pricing actual (multiplicador x3-x5 sobre BASE_VALUES) en [[20-Operaciones/product-pricing-drafts]] — confirmar si los números reales lo justifican o requieren ajuste.

### B · P&L mensual base

| Concepto | $/mes |
|---|---|
| **Ingresos** | |
| Venta directa B2C online | [INPUT] |
| Pickup local | [INPUT] |
| Vitrina B2B (75% de venta partner) | [INPUT] |
| **Total ingresos** | [CALC] |
| **Costos variables** | |
| Materiales | [CALC desde unidades × costo/pieza] |
| Packaging y envío | [CALC] |
| Comisiones pago (~3%) | [CALC] |
| Comisión partner B2B (25% sobre ventas vitrina) | [CALC] |
| **Total variables** | [CALC] |
| **Margen de contribución** | [CALC] |
| **Costos fijos** | |
| Renta + utilities Truckee | [INPUT] |
| Software (hosting, Cloudflare, APIs IA, ESP, Telegram) | [INPUT] |
| Herramientas amortizables | [INPUT] |
| Tiempo founder no facturable (admin/marketing/foto × tarifa) | [CALC] |
| **Total fijos** | [CALC] |
| **Resultado mensual** | [CALC] |

### C · Break-even

- Revenue mínimo mensual para cubrir costos fijos: [CALC].
- Unidades mínimas/mes según mix (60/30/10) y AOV: [CALC].
- Comparar contra ventas históricas (input pendiente) — gap actual: [CALC].

### D · CAC y LTV

| Métrica | Cálculo | Valor |
|---|---|---|
| CAC | (Gasto ads + costo contenido pagado) / clientes nuevos del periodo | [INPUT/CALC] |
| AOV | Revenue / órdenes | [INPUT] |
| Frecuencia de compra anual | Repurchase rate × tiempo | [CALC] |
| LTV (12m) | AOV × frecuencia × margen bruto % | [CALC] |
| Ratio LTV/CAC | [CALC] | objetivo > 3 |

### E · Proyección 12 meses (3 escenarios)

Una vez tengamos baselines del Mes 1 y costos reales, proyectar:

- **Conservador**: crecimiento 5% mes a mes, sin ads, solo orgánico.
- **Base**: crecimiento 10-15% mes a mes, captura email + Pinterest/TikTok activos, primer partner B2B Mes 2.
- **Optimista**: ads pagados desde Mes 3, 3 partners B2B en Mes 12, drop Ritual con tracción.

Cada escenario con: revenue mensual / margen bruto / costos fijos / resultado / runway de caja.

### F · Sensibilidades

- ¿Qué pasa con el margen si la tarifa horaria del founder sube 20%?
- ¿Cuántos clientes nuevos/mes se necesitan para que el ratio LTV/CAC sea > 3 a distintos AOV?
- ¿Cuánto cambia el resultado si el mix se desvía a 80% Acceso (peor) vs 30% Premium (mejor)?

## Reglas para cuando se ejecute Fase B

1. **No publicar precios actualizados sin costo real validado** (regla operativa, ver [[20-Operaciones/product-pricing-drafts]]).
2. **Marcar cada celda calculada con su fórmula** (no "$X" sin trazabilidad).
3. **Versionar cuando cambian inputs** (`version: 0.2`, `0.3`...).
4. **Cualquier proyección debe poder defenderse** contra al menos 3 meses de datos reales.

## Hooks subagentes

- **wenu-producto**: cuando se complete la sección A (costo unitario), usar esos números como guardrail mínimo al editar precios en WooCommerce. Nunca publicar un producto con margen bruto < umbral acordado (a definir en Fase B).
- **wenu-orchestrator**: cuando el usuario provea los inputs, ejecutar primero la sección A (cálculo unitario), luego B (P&L), luego C (break-even). El resto en orden.

<!-- wenu-backlinks -->
## Contexto

[[Home]] · [[00-INDEX]] · [[01-bmc]] · [[03-roadmap-90d]] · [[06-glosario-tiers]] · [[20-Operaciones/product-pricing-drafts]]
