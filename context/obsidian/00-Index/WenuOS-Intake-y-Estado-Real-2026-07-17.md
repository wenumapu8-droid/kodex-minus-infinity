---
tipo: blueprint-intake
fecha: 2026-07-17
tags: [wenuos, equipo-agentico, intake, buzon, estado-real, como-funcionamos]
relacionado: [[00-Index/WenuOS-Equipo-Agentico]] · [[00-Index/WenuOS-Modelo-Canonico]] · [[CLAUDE]]
---

# 🧠 WENU AGENTIC OPS — Intake + Estado Real

> Ocin (2026-07-17) quiere que la operación funcione **como una compañía**: que lo que él manda **no se pierda**, que cada agente sepa qué hacer, con prompts específicos, y una **cadena de trabajo** que funcione. La compañía ya existe (~70%, ver [[00-Index/WenuOS-Equipo-Agentico]]). Lo que falta es el **INTAKE** (la puerta de entrada) + confiabilidad. Este doc diseña eso.

---

## 1. ESTADO REAL (verificado 2026-07-17) — qué está vivo, roto, o depende de Ocin

**🟢 Vivo y confiable:**
- 9 subagentes en `~/.claude/agents/` (orchestrator, producto, curador-fotos, brand, frontend-eng, wenuos-ops, segundo-cerebro, daily-synth, chatgpt-importer).
- Deploy serializado a producción (verificado hoy: publiqué 8 productos, fixes legales/SEO, todo live en `wenumapuonline.com`).
- Hermes: notificaciones Telegram, ledger, completion-guard, dashboards, crons deterministas.
- **WC API Read/Write FUNCIONA** (verificado hoy — usada todo el día para publicar/editar/categorizar en WooCommerce). ⬅️ esto **destraba** cosas que estaban frenadas en julio.

**🟡 Degradado / con grietas (verificado hoy vía health-check):**
- **Hermes audita sobre foto vieja y NO verifica en vivo** → repite como pendiente lo ya arreglado (pasó hoy con el checklist web). Regla a imponer: todo agente verifica en vivo antes de reportar.
- **Pipeline de fotos (Curador): 850 en ERROR** — hay que triagearlo.
- **Modelo Groq caído (404)** `meta-llama/llama-4-scout-17b` — cambiar a un modelo vivo (Gemini responde OK, 50 modelos).
- **1 cron pausado** (`bb4b5caf64f3`) + **2 tasks P1 bloqueadas** en el kanban.

**🔑 Depende de Ocin (bloqueos externos):**
- **Instagram Graph API** (onboarding Meta) → sin esto, el rol de descubrimiento/contenido (la palanca real) sigue a mano.
- **Docker/NocoDB encendido** → NocoDB es el master de catálogo; con Docker apagado, el trabajo de catálogo/sync no corre.
- Decidir el **canal del intake** (ver §2): ¿Telegram como buzón único?

**🆕 Recién destrabable (por la WC R/W):**
- `nocodb-woo-sync` (frenado desde jul por WC 403) → ahora la key escribe. Falta: NocoDB encendido + una corrida de prueba supervisada.

---

## 2. EL INTAKE — la puerta que falta (que nada se pierda)

**Problema:** hoy hay orquestador (`wenu-orchestrator`) pero no hay un **buzón único** donde caiga lo que Ocin manda. Por eso las cosas "se pierden en el camino".

**Diseño — 5 pasos, montado sobre Hermes:**

1. **CAPTURAR** — un solo buzón. Todo lo que Ocin manda (Telegram a Hermes, o una carpeta `60-Inbox/`) se registra como un **item de intake** con ID. Nada entra sin quedar registrado.
2. **CLASIFICAR** — cada item se etiqueta:
   - `dominio`: catálogo · contenido · frontend/UX · negocio/cotización · fotografía · ops · conocimiento
   - `tipo`: tarea · decisión · asset (foto/archivo) · idea/backlog · pregunta
   - `urgencia`: ya · esta semana · backlog
3. **RUTEAR** — según dominio, va al rol dueño (los subagentes que ya existen) **con su prompt específico** (los prompts ya viven en `~/.claude/agents/*.md`). El orquestador reparte.
4. **TRACKEAR** — cada item lleva estado: `recibido → ruteado → en-progreso → hecho → verificado-live`. Vive en un ledger (extender el de Hermes / `wenuos-completion-guard`, que ya trackea "coded-no-live"). **Un item no se cierra sin verificar en vivo.**
5. **DEVOLVER** — Ocin recibe (a) confirmación al entrar ("recibido → ruteado a Catálogo"), y (b) aviso al cerrar ("hecho + verificado"). Si algo se traba > X, salta en el sweeper.

**La cadena completa:**
`Ocin manda → INTAKE captura+etiqueta → Orquestador rutea al rol → el rol actúa con su prompt → verify-live → reporta a Ocin + ledger`

Esto NO agrega 10 agentes nuevos: **reusa los 9 que ya existen** y les pone una puerta de entrada ordenada + tracking. Escala a tu visión de compañía cuando el negocio lo pida (ej. separar `wenu-growth` para SEO/IG, un rol de cotización cuando haya volumen).

---

## 3. Roles → dueño (ya existen) + gatillo del intake

| Manda algo de… | Rol dueño (subagente) | Prompt |
|---|---|---|
| producto, SKU, precio, stock, dedup | `wenu-producto` | `~/.claude/agents/wenu-producto.md` |
| foto de pieza | `wenu-curador-fotos` | idem |
| IG, copy, journal, SEO, descubrimiento | `wenu-brand` (→ `wenu-growth` fase 2) | idem |
| sitio, build, deploy, UX | `wenu-frontend-eng` | idem |
| pedido, cotización, abono, propuesta | wenu-platform API + `wenuos-order-alert` | — |
| notas, buscar, linkear vault | `segundo-cerebro` | idem |
| multi-dominio / ambiguo | `wenu-orchestrator` (entrada por defecto) | idem |

Los roles de "contabilidad / logística / secretaría / ventas" que Ocin nombró **ya están cubiertos** por Negocio (Revenue Ops), Ops (Chief of Staff/Hermes) y Conocimiento (PKM) — no hacen falta agentes separados en pre-lanzamiento sin clientes. Se separan cuando el volumen real lo justifique.

---

## 4. Plan de cableado (fases, de mayor palanca a menor)

1. **Intake capture + tracking** — definir el canal (Telegram/`60-Inbox`) y el formato del item + estado en el ledger. *(build chico)*
2. **Reglas de ruteo** — tabla dominio→rol (arriba) como config que el orquestador lee.
3. **Destrabar `nocodb-woo-sync`** — ahora que la WC R/W funciona; requiere NocoDB (Docker) encendido + corrida de prueba supervisada. *(desbloqueo)*
4. **Salud Hermes** — triage de las 850 fotos ERROR, cambiar el modelo Groq muerto por Gemini, reactivar el cron pausado, imponer "verify-live antes de reportar". *(mantenimiento)*
5. **IG/Graph API** — cuando Ocin haga el onboarding Meta → automatiza el rol de descubrimiento. *(bloqueo de Ocin)*

## 5. Necesita a Ocin (decisiones)
- **Canal del intake**: ¿Telegram como buzón único (ya tenés Hermes en Telegram), o preferís otra cosa?
- **Docker/NocoDB encendido** cuando ataquemos catálogo/sync.
- **Meta/IG onboarding** para automatizar contenido.
