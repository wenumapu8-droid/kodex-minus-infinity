# KODEX Observatory Bridge v0 — arranque

Primer archivo real de la infraestructura de observabilidad continua
especificada el 2026-08-16: hacer que el trabajo local (Mac Mini, Obsidian,
agentes sueltos) deje huella donde cualquier sesion sin acceso al disco
pueda leerla.

## GRAPH_SNAPSHOT.json

Grafo real de graphify sobre 184 notas de KODEX del vault de Obsidian
(filtradas del vault completo — nunca se sincroniza el vault privado
entero, solo el subset ya aprobado). 56 nodos, 94 aristas. Generado
2026-08-15 con backend ollama/qwen3:8b local, gratis. Ejemplo de consulta
real que respondio: que sistemas ya existen para heroes procedurales
-> encontro KODEX Production OS Master v1, KODEX Generative Modules,
KODEX Impossible Forms, con referencias reales entre si.

## Falta para que el bridge este completo

CURRENT_STATE.json, CHANGELOG.ndjson, AGENT_ACTIVITY.md, DAILY_STATE.md,
BLOCKERS.json, DECISIONS.json, SOURCE_MANIFEST.json, snapshots/ -- ver
memoria de sesion project-kodex-observatory-bridge-spec-2026-08-16 para
el schema completo de evento y el criterio de exito.
