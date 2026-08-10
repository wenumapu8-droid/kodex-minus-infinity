# Agentes y Sub-agentes — MOC

> Actualizado: 2026-05-01 — Carpeta agentes consolidada en [[20-Operaciones/agentes-roles/]]

## Vault

- [[Vault-MOC|Vault MOC]]

## Agentes definidos en el vault (nueva ubicación)

- [[20-Operaciones/agentes-roles/INDICE]] — Índice maestro de roles
- [[20-Operaciones/agentes-roles/architect]] — Arquitecto del sistema
- [[20-Operaciones/agentes-roles/brand-marketing-agent]] — Marketing y marca
- [[20-Operaciones/agentes-roles/telegram-command-agent]] — Control remoto Telegram
- [[20-Operaciones/agentes-roles/seo-agent]] — SEO de productos
- [[20-Operaciones/agentes-roles/woo-agent]] — WooCommerce operations
- [[20-Operaciones/agentes-roles/obsidian-memory-agent]] — Memoria Obsidian
- [[20-Operaciones/agentes-roles/coordinator]] — Coordinador multi-agente

## Prompts maestros

- [[prompts-ingeniero]]
- [[prompts-arquitecto]]
- [[00-Index/Prompts-Ejecucion-MOC]] — Prompts listos para ejecutar (2026-05-01)

## Sub-agentes Claude Code — ACTIVOS en ~/.claude/agents/

| Nombre | Rol | Estado |
|--------|-----|--------|
| `wenu-orchestrator` | Orquestación multi-dominio | ✅ Activo |
| `wenuos-ops` | Infra: Cloudflare, SSL, launchd, bots | ✅ Activo |
| `wenu-brand` | Marca, IG, contenido, Canva | ✅ Activo |
| `wenu-producto` | Catálogo WM-*, fichas, inventario | ✅ Activo |
| `segundo-cerebro` | Búsqueda + linkeo + deduplicación vault | ✅ Activo |
| `chatgpt-importer` | Importar exports de ChatGPT | ✅ Activo |
| `daily-synth` | Dailies, informes, patrones temporales | ✅ Activo |

Ver detalle de uso → [[00-Index/Skills-MOC]]

## Arquitectura de agentes propuesta (Master Spec 2026-07-24)

- [[10-Proyectos/Wenu-Mapu-Context-Engineering-Master-v1-2026-07-24#9. Arquitectura de agentes|§9 Arquitectura de agentes]] — Orchestrator + 10 subagentes por función de negocio (Commerce Truth, Web Reliability, Inventory/Margin, Lead/CRM, Content/Journal, Cultural Integrity, Signal Research, Creative Production, Analytics/Experiment, QA/Release)
- [[10-Proyectos/Wenu-Mapu-Context-Engineering-Master-v1-2026-07-24#10. Herramientas, MCP e integraciones|§10 Permisos R0-R4]] — niveles de escritura formal, hoy no aplicados a los subagentes activos
- Nota: es un mapeo propuesto, no 1:1 con los subagentes activos de abajo — ver comparación en [[10-Proyectos/Context-Engineering-Integracion-2026-07-24]]

## Notas de operaciones históricas

- [[20-Operaciones/reportes-historicos/2026-04-23-antigravity-mcp]] — Integración MCP
- [[20-Operaciones/reportes-historicos/2026-04-23-estado-sistema]] — Estado sistema abr-23

#agente #moc
