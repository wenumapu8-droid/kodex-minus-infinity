---
tipo: dashboard-vivo
actualizado: 2026-08-09 14:00
generado_por: ~/.hermes/scripts/wenuos-live-dashboard.py
tags: [wenuos, dashboard, estado-vivo, integracion]
---

# 🌐 WenuOS — Estado Vivo

> Regenerado automáticamente el **2026-08-09 14:00**. No editar a mano — se sobrescribe.
> Fuente: lectura directa de servicios, Postgres, git y Hermes.

## Servicios

| Servicio | Estado |
|---|---|
| PostgreSQL (:5432) | 🟢 arriba |
| wenumapu-system + túnel (:3333) | 🟢 arriba |
| wenu-platform API pagos (:3335) | 🟢 arriba |
| NocoDB inventario (:8080) | 🔴 caído |
| n8n workflows (:5678) | 🔴 caído |

## Data viva (Postgres · wenu-platform)

| Métrica | Valor |
|---|---|
| Productos | 51 |
| Fotos de producto | 46 |
| Clientes | 11 |
| Pedidos | 7 |
| Encargos custom pendientes | 6 |
| Productos por status | ACTIVE: 51 |

## Assets y sitio

- **LaCie (assets originales):** 🟢 montado
- **wenu-frontend (último commit):** 2026-08-08 feat(kodex): recreate lost shared contracts (nodes, signals, memory, scene-states, node route)
- **Hermes cron:** 23 activos, 0 pausados

## Enlaces

- [[00-Index/WenuOS-Mapa-Integracion|🗺️ Mapa de integración WenuOS]]
- [[00-Index/mapa-sistemas-wenu-2026-06-24|Mapa de sistemas]]
- [[integrations/hermes-notificaciones-reportes|Notificaciones Hermes]]
- [[data-flow|Flujo de datos (AS-IS / TO-BE)]] · [[00-Index/PUERTOS|Puertos]]
