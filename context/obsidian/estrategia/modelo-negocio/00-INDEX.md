---
doc: wenu-modelo-negocio
seccion: index
version: 0.1
estado: cualitativo-completo
fecha_actualizacion: 2026-05-03
owners_subagentes: [wenu-orchestrator, wenu-producto, wenu-brand, wenuos-ops, wenu-curador, segundo-cerebro]
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
  - followers-ig-actuales
  - engagement-rate-ig
  - presupuesto-ads
  - revenue-objetivo-mes-3
  - revenue-objetivo-mes-12
  - break-even-deseado
tags: [wenu, modelo-negocio, estrategia, brief-subagentes]
---

# 00 — Índice del Modelo de Negocio Wenu Mapu

> Documento canónico unificado del modelo de negocio. Lo leen los subagentes Wenu como brief operativo. Las decisiones estratégicas y operativas deben referirse aquí; cuando exista contradicción con notas anteriores, esta versión prevalece.

## Cómo leerlo

- Cada sub-nota tiene frontmatter con `doc: wenu-modelo-negocio` y `seccion: <nombre>`.
- Los subagentes pueden filtrar con `grep -r "doc: wenu-modelo-negocio" estrategia/modelo-negocio/`.
- Los headers `## ` son estables en cada sección y sirven como puntos de anclaje para parsing.
- Las fuentes externas se referencian con wikilinks; **no se duplica contenido**.

## Estructura

| # | Sección | Estado | Subagente owner principal |
|---|---|---|---|
| [[01-bmc]] | Business Model Canvas (9 bloques) | cualitativo (7/9) | wenu-orchestrator |
| [[02-financiero]] | P&L, costos, márgenes, break-even | esperando-datos | wenu-producto |
| [[03-roadmap-90d]] | Roadmap operativo mes 1-2-3 | esqueleto | wenu-orchestrator |
| [[04-vision-12m]] | Visión 12 meses + horizonte 5 años | cualitativo | wenu-orchestrator |
| [[05-operacion]] | Actividades, recursos, partners, stack | cualitativo | wenuos-ops |
| [[06-glosario-tiers]] | Definiciones canónicas | cualitativo | wenu-producto |

## Estado global

- **Fase A (cualitativa)**: completa al 2026-05-03.
- **Fase B (cuantitativa)**: bloqueada hasta recibir los 19 inputs listados en frontmatter `inputs_pendientes`.

## Fuentes externas referenciadas (no duplicar)

- [[Wenu Mapu — Contexto del Proyecto]]
- [[brand/copy-frontend-2026-05-01]]
- [[estrategia/brand-kit]]
- [[30-Auditorias/2026-04-27-copy-pivote-y-oferta-vitrina]]
- [[30-Auditorias/2026-05-02-customer-journey]]
- [[30-Auditorias/2026-05-02-competitive-analysis]]
- [[20-Operaciones/product-pricing-drafts]]
- [[20-Operaciones/WENU-CATALOGO-VIVO-ASISTENTE-PRODUCTOS]]
- [[00-Index/Plan-Maestro-2026-05-01]]
- [[wenuos-sistema-maestro]]

## Verificación

1. `grep -r "doc: wenu-modelo-negocio" estrategia/modelo-negocio/` → debe devolver 7 archivos.
2. Preguntar a `wenu-orchestrator` la propuesta de valor, a `wenu-brand` el tagline, a `wenu-producto` los tiers de precio. Las respuestas deben citar la sub-nota fuente.
3. Cuando `inputs_pendientes` quede vacío en este frontmatter, marcar `estado: aprobado`.

## Hooks subagentes

- **wenu-orchestrator**: usar este índice como punto de entrada cuando el usuario haga preguntas estratégicas multi-dominio.
- **segundo-cerebro**: mantener este nodo como hub; agregar backlinks recíprocos cuando se cree una sub-nota nueva.
- **wenu-producto / wenu-brand / wenuos-ops / wenu-curador**: leer la sub-nota correspondiente a su dominio antes de tomar decisiones operativas.

<!-- wenu-backlinks -->
## Contexto

[[Home]] · [[00-Index/Proyectos-MOC]] · [[Wenu Mapu — Contexto del Proyecto]] · [[estrategia/brand-kit]]
