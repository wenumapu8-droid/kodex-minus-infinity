# INGESTION REPORT — Bridge 1 (KOD-19)

`output_sha256: 8e0eeff73ddcc791b523babb10b04c1ba167746c7ca9616964e7f8fa546f7aaf`

## Entrada
- Filas visuales (`KDX-*`): **202** · columnas **26**
- Filas de investigación (`R-*`): **24** · columnas **12**
- Pobladas **197** · stubs **5**

## Nodos: 603
- `NODE`: 263
- `NODE_SPEC`: 128
- `MAP_ZONE`: 84
- `VISUAL_SPECIMEN`: 74
- `SCENE`: 30
- `CODE_MODULE`: 22
- `ROUTE`: 2

### Escenas por categoría funcional
- `NEEDS_CONFIRMATION`: 8
- `CONTENT_FAMILY`: 8
- `TRANSVERSAL_LAYER`: 5
- `NODE_CANDIDATE`: 4
- `SYSTEM_MODULE`: 4
- `SOURCE_DATA_ANOMALY`: 1

## Aristas: 840
- `IN_ZONE`: 184
- `DEPICTS`: 183
- `SPECIFIES`: 128
- `APPEARS_IN`: 95
- `SOURCED_FROM`: 66
- `SUPPORTS`: 65
- `EVIDENCED_BY`: 24
- `IMPLEMENTED_BY`: 22
- `CONTAINS`: 21
- `LEADS_TO`: 7
- `EXPANDS`: 5
- `RESONATES_WITH`: 4
- `RETURNS_THROUGH`: 3
- `CONVERGES_AT`: 2
- `ACTIVATES`: 2
- `WRITES_TO`: 2
- `MUTATES`: 2
- `REFLECTS_THROUGH`: 2
- `REVEALS`: 2
- `GUIDES_TO`: 1
- `STABILIZES`: 1
- `REFRAMES`: 1
- `GROWS_FROM`: 1
- `RETURNS_STATE_TO`: 1
- `OPENS_ROUTE`: 1
- `FLOWS_INTO`: 1
- `ROOTS_IN`: 1
- `DISTRIBUTES_TO`: 1
- `GROWS_INTO`: 1
- `REMEMBERS_THROUGH`: 1
- `BRANCHES_TO`: 1
- `CONTRIBUTES_TO`: 1
- `FEDERATES_AS`: 1
- `EVOLVES_FROM`: 1
- `EXTENDS`: 1
- `GUARDS`: 1
- `BRANCHES_THROUGH`: 1
- `MIRRORS`: 1
- `CONFRONTS`: 1
- `DISSOLVES_INTO`: 1
- aristas del autor recuperadas: **74**
- declaraciones de nodo (KDX-NODE-*/KDX-MAP-*): **54**

## Claims: 24
- sensibilidad `CRITICAL`: 13
- sensibilidad `HIGH`: 11
- `claimClass: UNKNOWN` (pendiente de clasificación humana): **24**

## Fuentes: 90
- `STANDARD`: 63
- `REVIEW_REQUIRED`: 14
- `AUTHORIZATION_REQUIRED`: 13

## Anomalías registradas: 45
- `FIELD_MISPLACEMENT`: 22
- `UNKNOWN_ENUM`: 14
- `MISSING_PROVENANCE`: 8
- `SOURCE_DATA_ANOMALY`: 1

## Chequeos previos al PR
- IDs de nodo duplicados: **0**
- IDs de claim duplicados: **0**
- Aristas colgantes: **0**
- `claimClass` fuera del enum canónico: **0**
- Coordenadas inventadas fuera de A/M/Y: **0**
- Reconciliación de fuentes: 90/90 → **OK**
