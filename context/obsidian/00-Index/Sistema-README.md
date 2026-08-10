# 🧠 Sistema "Segundo Cerebro" — README

## Vault

- [[Vault-MOC|Vault MOC]]

> Arquitectura completa: Obsidian + Claude Code + subagentes + memoria persistente.

## Cómo funciona

```
┌──────────────────────────────────────────────────────────────┐
│                      USUARIO (tú)                             │
└───────────────┬──────────────────────────┬───────────────────┘
                │                          │
       escribe en vault            habla con Claude Code
                │                          │
                ▼                          ▼
     ┌────────────────────┐     ┌──────────────────────┐
     │ Obsidian WenuAgent │◄────┤ wenu-orchestrator    │
     │ (segundo cerebro)  │     │ (punto de entrada)   │
     └─────────┬──────────┘     └──────────┬───────────┘
               │                            │ delega
               │                            ▼
               │              ┌─────────────────────────┐
               │              │  subagentes especialistas│
               │              ├─────────────────────────┤
               │              │ wenuos-ops              │
               │              │ wenu-brand              │
               │              │ wenu-producto           │
               │              │ segundo-cerebro         │
               │              │ chatgpt-importer        │
               │              │ daily-synth             │
               │              └─────────┬───────────────┘
               │                        │
               │                        ▼
               │         ┌─────────────────────────────┐
               └────────►│ ~/.claude/.../memory/       │
                         │ (estado persistente)        │
                         └─────────────────────────────┘
                                       ▲
                                       │ symlink
                         50-Claude-Memory/
```

## Componentes

### 1. Vault Obsidian — `~/Obsidian/WenuAgent/`
- Conocimiento estructurado, interconectado via `[[wikilinks]]`
- MOCs en `00-Index/` como mapas temáticos
- `Home.md` = entrada

### 2. Memoria Claude — `~/.claude/projects/-Users-user1/memory/`
- Persistente entre sesiones
- Visible en Obsidian vía symlink `50-Claude-Memory/`
- Índice maestro: `MEMORY.md`

### 3. Subagentes — `~/.claude/agents/`
- Cada uno es un archivo `.md` con frontmatter + system prompt
- Claude Code los carga automáticamente
- Se invocan con `Agent(subagent_type: "nombre")`

### 4. Orquestador: `wenu-orchestrator`
- Punto de entrada para peticiones ambiguas o multi-dominio
- Lee estado, planifica, delega en paralelo, sintetiza

### 5. CLAUDE.md (raíz del vault)
- Se carga automático cuando Claude Code opera dentro del vault
- Define convenciones, flujo obligatorio y tabla de delegación

## Cómo usarlo

### Uso diario
1. Abrir Obsidian → `Home.md`
2. Capturar ideas en `60-Inbox/` o directo en `daily/YYYY-MM-DD.md`
3. Para tareas complejas → abrir Claude Code en `~/Obsidian/WenuAgent/` y decir qué quieres

### Ejemplos de prompts

- _"Resume la semana"_ → `daily-synth`
- _"Arregla el túnel de Cloudflare"_ → `wenuos-ops`
- _"Crea ficha para nuevo plug WM-PLG-042"_ → `wenu-producto`
- _"Busca notas sobre tipografía"_ → `segundo-cerebro`
- _"Ya descargué el ZIP de ChatGPT"_ → `chatgpt-importer`
- _"Escribe 3 posts IG sobre la línea orgánica"_ → `wenu-brand`
- _"No sé por dónde empezar hoy"_ → `wenu-orchestrator`

### Mantenimiento

- **Semanal:** `segundo-cerebro` revisa huérfanos y deduplica
- **Diario:** `daily-synth` genera/cierra daily
- **Ad-hoc:** `wenuos-ops` cuando algo se rompe

## Reglas globales

1. No borrar — archivar en `90-Archivo/`
2. Enlaces mínimos: 2 por nota nueva
3. Fechas absolutas
4. Español
5. Todo lo importante → memoria o nota (no solo en chat)

## Roadmap

- [x] Fase 1: estructura de vault + MOCs
- [x] Fase 2: subagentes + orquestador + CLAUDE.md
- [ ] Fase 3: importar export ChatGPT (pendiente descarga ZIP)
- [ ] Fase 4: hooks automáticos (ej: auto-commit diario del vault a git)
- [ ] Fase 5: integración Telegram → Inbox automática

#sistema #meta
