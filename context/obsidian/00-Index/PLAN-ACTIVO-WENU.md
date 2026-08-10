---
tipo: plan-canonico
fecha: 2026-07-18
estado: activo
tags: [plan, prioridades, norte, autocycle]
---

# PLAN ACTIVO WENU — fuente única

> **Este es el ÚNICO punto de entrada de "qué hay que hacer".** Todo agente (empezando por el autocycle diario) lee ESTE archivo primero, y de acá salta a lo táctico. Si una prioridad cambia, se edita ACÁ, no en diez lugares. Reemplaza al viejo `[[PLAN-OPERATIVO]]` (superado, 2026-04).

## Norte (por qué existe todo esto)

Etapa real: **pre-lanzamiento, sin base de clientes** — la vitrina está en casa de Ocin, compran solo conocidos. El cuello de botella real **no es el catálogo ni el pago: es el descubrimiento** (Instagram / contenido). Cada acción debe acercar a: gente nueva encuentra Wenu → confía → compra.

Mandato de diseño (2026-06-23): **terminar el sitio**, minimal-pero-rico (superficie simple, profundidad rica), dark ritual único, nunca "al lote". Ver [[project_terminar_sitio_norte_diseno]] · [[00-Index/PROMPT-MAESTRO-WENU-100-OPERATIVO]].

## Prioridad TÁCTICA del día (auto-generada)

El detalle diario (qué está bloqueado, qué aprobar, qué publicar) vive en:
**`~/Obsidian/WenuAgent/20-Operaciones/night-priority-plan.md`** — se regenera solo cada día.
El autocycle debe elegir **UNA sola acción** de ahí, la más prioritaria y accionable, respetando las reglas duras.

## Reglas duras (no negociables — resumen)

1. **NocoDB = source of truth** del inventario. Para saber qué está LIVE, consultar WooCommerce directo (no el campo URL de NocoDB).
2. **Nunca borrar.** Mover a `90-Archivo/`. 
3. **No secretos** en chat/git/frontend.
4. **No-IA-en-runtime.** Producción corre determinista; la IA construye/mejora, no improvisa en vivo.
5. **Deploy serializado**, verificar en vivo (no en git). `git push` NO despliega.
6. **imported-curated NUNCA "handmade".** El catálogo es todo **para perforaciones sanadas** (las iniciales estériles van en su página aparte).
7. **Provenance honesto:** no decir "hecho" sin verificar en vivo.

Fuente extendida: [[00-Index/WenuOS-Modelo-Canonico]] · [[00-Index/WenuOS-Equipo-Agentico]].

<!-- wenu-backlinks -->
Ver también: [[Home]] · [[20-Operaciones/night-priority-plan]] · [[20-Operaciones/estado-email-y-orquestacion-2026-07-18]]
