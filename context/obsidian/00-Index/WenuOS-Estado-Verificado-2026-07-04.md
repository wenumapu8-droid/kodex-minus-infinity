---
tipo: audit-verificado
fecha: 2026-07-04
metodo: verificación LIVE por HTTP (marcador en HTML real), no por git
tags: [wenuos, audit, live, verificado, safety-net]
relacionado: [[00-Index/WenuOS-Modelo-Canonico]] · [[20-Operaciones/desarrollo-paralelo-wenu-2026-07-02]] · [[20-Operaciones/cola-ejecucion-prompts-pendientes-2026-07-04]]
---

# ✅ WenuOS — Estado Verificado (qué está LIVE vs qué falta)

> **Método honesto:** cada ítem se verificó **en vivo** con un GET real a `wenumapuonline.com` buscando un marcador en el HTML servido. **No se confía en git** — porque `deploy-now.sh` buildea del *working tree* (no requiere commit), git no dice qué está en vivo. La verdad está en el HTML público.
> Verificado 2026-07-04. Se mantiene automático por el guard (ver §3).

## Por qué esto importa

El working tree del frontend tiene **decenas de archivos modificados sin commitear**, y hubo **colisiones de build entre agentes** + ECONNRESET (documentado en la cola de ejecución). Resultado: cosas "hechas en código" que **nunca salieron a vivo**, sin forma de detectarlo. Esta tabla + el guard cierran ese hueco.

## Tabla: feature → estado → evidencia

| Feature pedido | Estado | Evidencia (verificación live) |
|---|---|---|
| **Wültufe Ear Studio** `/constelaciones` | 🟢 **LIVE** | HTML contiene "Build your ear constellation" · 35 joyas reales · fases 1-3 · submit |
| **Estudio: export PNG con marca** ("Download image") | 🟢 **LIVE** | Botón "Download image" presente en `/constelaciones` |
| **`/ear-stretching`** (fix del 404) | 🟢 **LIVE** | Página 200, contenido "Stretch slow…" completo |
| **Home: mini-sección OVNI "WE ALL COME FROM THE STARS"** | 🟢 **LIVE** | Marcador presente en el HTML de la home (verificado por el guard; a simple vista en el render no se ve, pero está servido) |
| **Home / journal / colecciones / portal** | 🟢 **LIVE** | Home sirve hero, colecciones, portal, journal (We Tripantu, Reading the body, Aftercare) |
| **Journal del Día del OVNI** (2 jul) | 🔴 **CODED / NO-LIVE** | Marcador "ovni" **ausente** en `/journal`. No publicado. |
| **Estudio: layout "app de diseño" + fix chip de estado** (cola #1) | 🔴 **CODED / FALLÓ INFRA** | Marcado "FALLÓ por infra" en la cola; sin evidencia live del rediseño |
| **Tema Solar: arreglos de contraste/blobs** (cola #2) | 🟡 **SPEC / NO-LIVE** | Quedó como spec en `30-Auditorias/audit-tema-solar`; no aplicado |
| **`/piercing` teaser "DESIGN YOUR EAR" con mapa de Ocin** (cola #3) | 🔴 **CODED / NO-LIVE** | Pendiente reemplazar silueta negra; sin evidencia live |
| **Portal: estados de materia cósmica + glitch** (cola #5) | 🔴 **CODED / FALLÓ INFRA** | "FALLÓ por infra" en la cola |
| **Sello/emblema Wenu refinado + brújula viva** (cola #6) | 🔴 **CODED / NO-LIVE** | SVG en LaCie `Wenu-Sigil-2026`; no colocado |
| **Endpoint `POST /constellation/submit`** (email-agent) | 🟡 **DEPLOYED / SIN VERIFICAR** | Código presente; reachability del endpoint no verificable por HTML |
| **PayPal en checkout** | 🟡 **DEPLOYED / SIN VERIFICAR** | El carrito va a `www` (WooCommerce); no verificado en vivo en este pase |

### Conteo honesto
- 🟢 **LIVE verificado:** 5 frentes (estudio, export PNG, ear-stretching, sección OVNI home, home/journal/portal).
- 🔴 **Coded pero NO en vivo:** 5 (journal OVNI + 4 de la cola que fallaron por infra/colisión).
- 🟡 **Ambiguo / verificar:** 3 (tema Solar spec, submit endpoint, PayPal).

**Respuesta a "¿cuántos procesos nunca se hicieron?":** al menos **5 features quedaron en código y nunca salieron a vivo**, más 3 que necesitan verificación puntual. La cola de ejecución (`cola-ejecucion-prompts-pendientes-2026-07-04`) los tiene como prompts listos para re-ejecutar cuando la infra esté estable.

## §3 — Cómo se mantiene esto solo (safety-net)

Ver [[00-Index/WenuOS-SafetyNet-Completitud]]. En resumen: un **ledger** + un **cron determinista** (`wenuos-completion-guard`, cada 30 min, sin IA) que re-verifica en vivo y **avisa a Ocin por Telegram** lo que no llegó a *verified-live* tras 24 h, más cualquier **build colgado**. Ya envió su primer reporte de prueba a Telegram (2026-07-04).

*Read-only sobre datos. Sin secretos.*
