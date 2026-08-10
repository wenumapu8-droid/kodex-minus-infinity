# 🔷 Memoria Claude Code — MOC

La carpeta `50-Claude-Memory/` es un **symlink** a:
`~/.claude/projects/-Users-user1/memory/`

Todo lo que Claude Code guarda como memoria persistente aparece aquí automáticamente, y se puede enlazar desde cualquier nota con `[[50-Claude-Memory/nombre]]`.

## Notas actuales

- [[50-Claude-Memory/MEMORY|Índice maestro]]
- [[50-Claude-Memory/project_wenuos|Proyecto Wenuos]]

## Tipos de memoria (Claude)

- **user** — perfil del usuario
- **feedback** — reglas de colaboración
- **project** — estado de proyectos
- **reference** — punteros a sistemas externos

## Flujo

```
Claude Code ──escribe──▶ ~/.claude/.../memory/*.md
                                │
                                ▼
                   50-Claude-Memory/ (symlink)
                                │
                                ▼
                   Obsidian indexa y enlaza
```

#claude #memoria
