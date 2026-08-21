---
status: DERIVED / PENDING HUMAN REVIEW
bridge: KOD-19 — Bridge 1
source_of_truth: Google Sheet 07A_KODEX_VISUAL_ATLAS_MASTER (immutable)
---

# ATLAS INGESTION REPORT — 2026-08-07

Los artefactos en `data/atlas/` son **derivados y regenerables**. No se editan a mano.
La hoja origen es **inmutable**: este proceso nunca la escribe.

## Regeneración

1. Exportar el Sheet `07A_KODEX_VISUAL_ATLAS_MASTER`
   (`1RLhA2xmApx1YDfHIeWjIqlYz17OHkuxFbfUXejzcS_4`) como markdown.
2. `python3 scripts/ingest_visual_atlas.py <export> -o data/atlas`
3. Comparar `outputSha256` en `data/atlas/checks.json`.

El snapshot de entrada **no se versiona aquí**: contiene enlaces privados de Drive.
Debe conservarse fuera del repo público.

## Tres familias de registro en una sola hoja

| Familia | Reconocida por | Filas | Trato |
|---|---|---|---|
| Espécimen visual | `KDX-IMG-*`, `KDX-SCREEN-*`, … | 74 | nodo `VISUAL_SPECIMEN` |
| Especificación de nodo | `KDX-NODE-*`, `KDX-MAP-*` en `IMAGE_ID` | 128 | nodo `NODE_SPEC` + arista `SPECIFIES` |
| Investigación | `R-###`, 12 columnas posicionales | 24 | `claims.json` + `sources.json` |

La familia `NODE_SPEC` repite el mismo identificador en varias filas (hasta 11 veces para
`KDX-NODE-ELEMENTAL-ARCHIVE`). No son duplicados: son especificaciones múltiples del mismo
nodo. Colapsarlas por ID habría descartado 72 filas.

## Mapeo de columnas

**Visual (26):** `IMAGE_ID · TITLE · SOURCE_URL · PRIMARY_CONCEPT · SECONDARY_CONCEPTS ·
MAP_ZONE · SCENE · NODE_IDS · SYMBOLS · GEOMETRY · PALETTE · COMPOSITION · MOTION ·
INTERACTION · SOUND · COPY · EPISTEMIC_LAYER · PROVENANCE · STATUS · NEXT_ACTION ·
DUPLICATE_GROUP · SVG_ASSETS · PNG_ASSETS · CODE_MODULE · NOTES`

**Investigación (12, posicionales):** `REF_ID · TOPIC · CLAIM · EPISTEMIC_LAYER ·
SOURCE_TITLE · SOURCE_URL · SOURCE_TYPE · KODEX_TRANSLATION · RELATED_NODES ·
LIMITATIONS · SENSITIVITY · STATUS`

## Políticas aplicadas

**Coordenadas.** Solo `A` (ORIGIN/THRESHOLD), `M` (HEART/0) y `Y` (RETURN/+∞) se asignan.
`B–L` y `N–X` se derivan en Bridge 2 (`KODEX_ALPHABET_MATRIX`) a partir de relaciones reales.
El ingestor nunca infiere una letra desde una inicial. Verificado:
`nodes_with_invented_coordinate: 0`.

**Clases de claim.** `claimClass` **nunca se infiere**. Los 24 claims quedan en `UNKNOWN` con
`claimClassNextAction: human_review_assign_canonical_claim_class`, conforme al
"failure behavior" de `canon/KODEX_EPISTEMIC_STANDARD.md`. `STATUS: VERIFIED_SOURCE` de la hoja
se preserva aparte como `sourceDeclaredStatus`: describe la fuente, no la clase del claim.

**Sensibilidad → revisión cultural.** `CRITICAL` ⇒ `AUTHORIZATION_REQUIRED` (13);
`HIGH` ⇒ `REVIEW_REQUIRED` (11). Las `LIMITATIONS` declaradas por el autor viajan dentro del
registro de la fuente.

**Anomalías.** Se registran en `data/atlas/anomalies.json`, nunca se corrigen en la hoja.

## Contradicción abierta — no resuelta

`canon/KODEX_EPISTEMIC_STANDARD.md` define **diez** clases de claim:
`OBSERVED · DERIVED · ESTIMATED · PROXY · INTERPRETATION · TESTIMONY · SPECULATION ·
MYTHOPOETIC · SYNTHETIC · UNKNOWN`.

En la revisión del 2026-08-07 se instruyó normalizar contra un conjunto cerrado distinto:
`VERIFIED · CANONICAL · INFERRED · SPECULATIVE · NEEDS_CONFIRMATION · DEPRECATED`.

Los dos conjuntos solo comparten `SPECULATIVE`/`SPECULATION`. El segundo parece describir
**estatus de registro**, no clase epistemológica. Esta ingesta programa contra el archivo
canónico. La discrepancia queda registrada sin resolver, conforme al protocolo de
contradicciones. Requiere decisión antes de que otro sistema dependa de cualquiera de los dos.

---

# INGESTION REPORT — Bridge 1 (KOD-19)

`output_sha256: 1eb7e3722ff9e6fb74acd994fc647353c69427f3133d514413a0b484e5818f45`

## Entrada
- Filas visuales (`KDX-*`): **202** · columnas **26**
- Filas de investigación (`R-*`): **24** · columnas **12**
- Pobladas **197** · stubs **5**

## Nodos: 600
- `NODE`: 260
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

## Aristas: 894
- `SOURCED_FROM`: 194
- `IN_ZONE`: 184
- `DEPICTS`: 183
- `SPECIFIES`: 128
- `APPEARS_IN`: 95
- `SUPPORTS`: 64
- `EVIDENCED_BY`: 24
- `IMPLEMENTED_BY`: 22

## Claims: 24
- sensibilidad `CRITICAL`: 13
- sensibilidad `HIGH`: 11
- `claimClass: UNKNOWN` (pendiente de clasificación humana): **24**

## Fuentes: 218
- `STANDARD`: 188
- `REVIEW_REQUIRED`: 17
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
- Reconciliación de fuentes: 218/218 → **OK**
