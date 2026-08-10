# Estado del Sistema

- Generado: 2026-08-09T15:02:24.199Z
- Estado: needs_human_decisions

## Lectura canonica
- [[00-Mapa-Maestro]]
- [[Estado-Sistema]]
- [[product-master]]
- [[product-master-quality-report]]
- [[catalog-approval-queue]]
- [[product-publishing-queue]]
- [[catalogo-vivo-supervisor]]
- [[weekly-scorecard]]
- [[WENU-SISTEMA-DOCUMENTACION]]

## Sistema vivo
- Product Master: active | 207 productos | 9 duplicados bloqueados | 6 canonicos pendientes
- Quality Gate: needs_review | 9 bloqueados | 169 en revision | 6 sin foto
- Catalog Approval Queue: active | 6 clusters | 0 pendientes | 6 aprobados
- Publishing Queue: blocked | 207 productos | 0 para revision | 9 bloqueados
- Commercial Drafts: active | 0 elegibles
- Commercial Approval Queue: active | 0 pendientes | 0 aprobados
- Commercial Woo Plan: active | 0 planificados | 0 bloqueados
- Image Lab: queue_only | 5 candidatos | queue_only | gemini-2.5-flash-image
- Training Registry: active | 26 ejemplos | 3 familias | 6 politicas
- Training Eval: needs_review | 26 ejemplos | 1 findings | 1 warnings
- Supervisor: active | ok
- Woo Audit: active | 207 productos | 13 posibles duplicados | 6 sin imagen
- Security: needs_review | needs_review | 1 warnings
- Integrations: active | ok | 2 warnings
- Weekly Scorecard: active | active
- Approval Cockpit: ok | 0 pendientes | 0 catalogo | 0 commercial

## Bloqueos actuales
- Security requires review (needs_review).
- 9 products are blocked before publishing.
- Image Lab is queue-only until Gemini credentials and paid mode are approved.
- 16 backlog items remain open in nocturno.

## Backlog operativo
- Elementos abiertos: 16
- [ ] Revisar catalog-approval-queue y decidir canonical/duplicados antes de SEO
- [ ] Revisar catalog-merge-plan solo cuando existan decisiones aprobadas
- [ ] Revisar product-publishing-queue y avanzar solo items no bloqueados
- [ ] Revisar product-commercial-drafts antes de copiar contenido a Woo
- [ ] Aprobar commercial-approval-queue antes de generar plan Woo aplicable
- [ ] Ejecutar solo commercial:woo-apply:dry hasta tener aprobacion final
- [ ] Revisar system-state-registry y cerrar huecos entre activo, historico y backlog
- [ ] Revisar catalogo-vivo-supervisor y dashboard local

## Historico y referencia
- [[docs/wenu-consolidation-audit|Consolidation Audit]] - Arquitectura y migracion; referencia, no estado vivo.
- [[docs/wenu-migration-plan|Migration Plan]] - Plan de consolidacion; backlog historico y fases.
- [[docs/wenu-system-map|System Map]] - Mapa de capas y responsabilidades; comparar contra estado vivo.
- [[docs/data-flow|Data Flow]] - Flujo objetivo/legacy; algunas cifras pueden estar desfasadas.
- [[daily/2026-05-01|Daily notes before 2026-05-01]] - Snapshots historicos; usar solo como referencia y contrastar con latest.json.

## Regla de uso
- Activo: salidas generadas hoy, colas vigentes y reportes con latest.json.
- Historico: notas de arquitectura, migracion y capturas de estado anteriores.
- Pendiente: cualquier decision que siga en cola o requiera aprobacion humana.

## Como leer el vault
- Si un archivo tiene cifras o estados viejos, es historial hasta que exista una salida latest.json o un reporte generado hoy.
- Si una tarea sigue en backlog o approval queue, no se considera completada aunque exista una nota explicativa.
- Todo producto o flujo operativo debe colgar de este indice antes de tocarse en serio.
