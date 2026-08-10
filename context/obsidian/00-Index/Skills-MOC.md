---
tipo: moc
fecha: 2026-05-01
tags: [skills, agentes, claude, herramientas]
relacionado: [[00-Index/Plan-Maestro-2026-05-01]] · [[00-Index/Agentes-MOC]]
---

# Skills y Subagentes Claude — MOC

## Vault

- [[Vault-MOC|Vault MOC]]

> Catálogo de subagentes disponibles en Claude Code para el ecosistema Wenu Mapu.
> Cómo usarlos: en Claude Code, escribir el prompt como mensaje directo o usar el skill.

---

## Subagentes especializados Wenu Mapu

| Agente | Cuándo usarlo | Comando |
|--------|--------------|---------|
| **wenu-orchestrator** | Punto de entrada para tareas multi-dominio. Decide qué subagente delegar. | Cualquier tarea compleja que no encaje en uno solo |
| **wenu-producto** | Catálogo WM-*, inventario, fichas, precios, WooCommerce, dedup | Crear/editar productos, dedup, sincronizar tienda |
| **wenu-brand** | Identidad visual, copy, Instagram, Canva, tono, guías gráficas | Copy IG, fichas visuales, decisiones estéticas |
| **wenuos-ops** | Cloudflare Tunnel, SSL, dominio, systemd/launchd, bots, APIs, logs | Problemas de infra, conectividad, procesos |
| **segundo-cerebro** | Vault Obsidian: buscar, consolidar, MOCs, huérfanas, enlaces | Organizar notas, crear índices, limpiar vault |
| **daily-synth** | Genera daily del día, resumes de semana, patterns en daily/ | Al empezar/cerrar el día o pedir resumen temporal |
| **chatgpt-importer** | Importar exports oficiales ChatGPT al vault Obsidian | Cuando tienes el ZIP de Settings → Export de ChatGPT |

---

## Skills adicionales activos

> Referencia rápida de cuándo invocar cada una: [[Skills-Cuando-Invocar]]

| Skill | Descripción |
|-------|-------------|
| `anthropic-skills:pdf` | Leer/editar/combinar PDFs |
| `anthropic-skills:xlsx` | Spreadsheets .xlsx — leer, editar, crear |
| `anthropic-skills:docx` | Documentos Word .docx |
| `anthropic-skills:pptx` | Presentaciones PowerPoint |
| `anthropic-skills:canvas-design` | Arte visual en .png/.pdf con filosofía de diseño |
| `anthropic-skills:skill-creator` | Crear skills propias (etsy-sync, notebooklm-bridge) |
| `anthropic-skills:consolidate-memory` | Podar MEMORY.md 1x/mes |
| `claude-api` | Apps con Anthropic SDK / Claude API con prompt caching |
| `agent-sdk-dev:new-sdk-app` | Crear nueva app con Claude Agent SDK |
| `wordpress.com:preview-designs` | Iterar diseño aftercare.wenumapuonline.com |
| `adspirer:keyword-research` | Validar tags Etsy con CPC real |
| `adspirer:campaign-performance` | Análisis Meta/Google Ads cuando arranquen |

### Skills mattpocock (instaladas 2026-05-12, en `~/.claude/skills/`)

| Skill | Descripción |
|-------|-------------|
| `grill-me` | Interroga el plan antes de ejecutar. Cierra gaps de alineación. |
| `caveman` | Modo ultracomprimido (~75% menos tokens). Para daily/triage. |
| `diagnose` | Loop disciplinado bugs duros: reproducir → minimizar → hipótesis → fix → regression. |

---

## Plugins Obsidian — estado de instalación

> Para activar: abrir Obsidian → Settings → Community plugins → Instalar cada uno.
> Los IDs están en `.obsidian/community-plugins.json` (se agregan como pendientes de install).

| Plugin | ID | Estado | Para qué |
|--------|----|--------|----------|
| **Templater** | `templater-obsidian` | ⚠️ Pendiente instalar | Plantillas automáticas (daily, producto, agente) |
| **Dataview** | `dataview` | ⚠️ Pendiente instalar | Queries SQL sobre el vault → dashboard en Home |
| **QuickAdd** | `quickadd` | ⚠️ Pendiente instalar | Capturas rápidas con macros |
| **Periodic Notes** | `periodic-notes` | ⚠️ Pendiente instalar | Daily/weekly/monthly automáticos |
| **Tasks** | `obsidian-tasks-plugin` | ⚠️ Pendiente instalar | Gestión de tareas dentro del vault |
| **Excalidraw** | `excalidraw` | ⚠️ Pendiente instalar | Diagramas de arquitectura y flujos |
| **Advanced URI** | `obsidian-advanced-uri` | ⚠️ Pendiente instalar | Disparar Obsidian desde n8n/scripts |
| **Linter** | `obsidian-linter` | ⚠️ Pendiente instalar | Formato consistente (frontmatter, headers) |
| **Git** | `obsidian-git` | ⚠️ Pendiente instalar | Backup automático del vault en git |

### Para instalar todos desde Obsidian:
Settings → Community plugins → Browse → buscar cada nombre → Install → Enable

---

## Cómo crear un nuevo skill

Si necesitas un comportamiento automatizado recurrente que no existe:
1. Usar skill `anthropic-skills:skill-creator` en Claude Code
2. Describir qué querés que haga, cuándo se dispara, y qué herramientas necesita
3. El skill se guarda en `~/.claude/plugins/`
