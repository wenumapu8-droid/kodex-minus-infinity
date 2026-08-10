---
tipo: integracion
fecha: 2026-07-04
tags: [wenuos, safety-net, hermes, determinista, completitud]
relacionado: [[00-Index/WenuOS-Estado-Verificado-2026-07-04]] · [[integrations/hermes-notificaciones-reportes]]
---

# 🛟 WenuOS — Safety-Net de Completitud

> Problema real: con colisiones de build/infra, tareas quedaron "hechas en código" pero **nunca salieron a vivo**, y no había forma sistemática de detectarlo. Este mecanismo lo detecta y lo **reporta a Ocin por Telegram para que se haga sí o sí**.
> **Determinista, corre solo, NO depende de IA** (extiende el patrón `stuck-task-sweeper.py`).

## Piezas

**1. Ledger** — `~/.hermes/state/wenuos-task-ledger.json`
Cada tarea tiene estado: `requested → coded → deployed → verified_live`, con `requested_at`, `verified_at`, `evidence`. Sembrado con el audit del 2026-07-04.

**2. Verificación LIVE determinista** — para tareas con `check: {url, contains}`, el guard hace un **GET real** a la URL en vivo y, si encuentra el marcador en el HTML, marca `verified_live` con evidencia y timestamp. Si el marcador desaparece de una tarea antes live → la baja a `deployed` (detecta **regresiones**). No usa git (engaña: `deploy-now.sh` buildea del working tree).

**3. Reporter (cron Hermes)** — `wenuos-completion-guard` (`every 30m`, `--no-agent`, deliver Telegram). Avisa:
- Tareas que **no llegaron a `verified_live`** tras `WENU_GUARD_STALE_HOURS` (default 24 h).
- **Build/deploy colgado**: procesos `astro build` / `deploy-now.sh` / `wrangler pages` / `npm run build` corriendo > `WENU_BUILD_HANG_MIN` (default 20 min) = probablemente muerto (fue la causa de los bloqueos).
Deduplica (re-alerta cada 12 h la misma tarea; cada 1 h el mismo build colgado). `[SILENT]` si no hay nada.

**4. Script** — `~/.hermes/scripts/wenuos-completion-guard.py`. Sin dependencias externas (urllib puro).

## Cómo se probó (2026-07-04)

- Corrida real: sembró el ledger y verificó en vivo → marcó 5 tareas `verified_live` (estudio, export PNG, ear-stretching, sección OVNI home, etc.) y dejó el resto pendiente con evidencia `NO-LIVE`.
- Prueba del reporter con umbral 0 h → generó el digest y se **envió a Telegram** (`hermes send` → rc=0, "sent"). Ocin recibió la lista de lo que no está live.
- El verificador **corrigió una lectura humana**: la sección OVNI de la home parecía ausente en el render, pero el marcador está en el HTML servido → la verificación automática es más confiable que el ojo.

## Cómo agregar una tarea al ledger (para futuras)

Editar `~/.hermes/state/wenuos-task-ledger.json`, agregar al array `tasks`:
```json
{ "id": "mi-feature", "title": "Descripción corta", "area": "sitio",
  "state": "coded", "requested_at": "2026-07-05T00:00:00+00:00",
  "check": { "url": "https://wenumapuonline.com/mi-pagina", "contains": "texto-marcador-único" } }
```
Con `check`, el guard la verifica y cierra sola cuando el marcador aparezca en vivo. Sin `check`, queda como nag manual hasta marcarla `verified_live`.

## Parámetros (env)
- `WENU_GUARD_STALE_HOURS` (default 24) — cuánto espera antes de nag.
- `WENU_BUILD_HANG_MIN` (default 20) — minutos para considerar un build colgado.

## Nota de principio
Todo esto es infra determinista: GET HTTP + comparación de strings + `ps`. No hay inferencia de IA en el runtime. Si se cae el modelo, el guard sigue avisando igual.

*Read-only. Sin secretos.*
