---
status: DERIVED / SOLO LECTURA
source: kodex-minus-infinity (main + todas las ramas) y grafo derivado de Bridge 1
auditor: opencode
date: 2026-08-12
---

# DANGLING EDGES REPORT — 4 nodos referenciados sin declaración

Cuatro aristas del Visual Atlas apuntan a nodos que el Atlas **nunca declaró**
como especificación de nodo (no existe fila `KDX-NODE-*` con `SOURCE_URL` =
tipo para ellos).

## Las 4 aristas

| Origen (declarado) | Relación | Destino (sin declaración) |
|---|---|---|
| `KDX-NODE-CRANIAL-AXIS` | `REFRAMES` | `KDX-NODE-OBSERVER` |
| `KDX-NODE-CREATION-WEAVE` | `RESONATES_WITH` | `KDX-NODE-STAR-LATTICE` |
| `KDX-NODE-ELEM-MICELIARES` | `EXPANDS` | `KDX-NODE-MYCELIAL-ORACLE` |
| `KDX-NODE-ELEM-NOMADAS-VERDES` | `SUPPORTS` | `KDX-NODE-GAIA-SENTINEL` |

## Estado real en el grafo derivado

- Los **4 orígenes** están declarados en el Atlas (tienen fila de declaración y
  `declaredType`).
- Los **4 destinos** NO tienen fila de declaración. Aparecen en `nodes.json`
  solo porque el ingestor corregido (PR #45) los **asegura como referencia**
  (`ensure_node`) para que las aristas no queden colgantes:
  - `type: NODE`, `declaredType: None`, `label = su propio id`.
  - Son **placeholders**, no nodos con contenido autoral.
- Validez de las aristas (del Atlas): `CANONICAL` (2: OBSERVER, MYCELIAL-ORACLE),
  `VALID` (2: STAR-LATTICE, GAIA-SENTINEL).

## Búsqueda en el repo

Se buscó en **todo `kodex-minus-infinity`** (canon, docs, context, research,
data, schemas, packages, todas las ramas vía `git grep`):

| Nodo | Encontrado como declaración de nodo KDX | Evidencia encontrada |
|---|---|---|
| `KDX-NODE-OBSERVER` | **NO** | `OBSERVER` como concepto en `canon/KODEX_CANON.md` (segundo orden, von Foerster) y en `capability-router.json` (`cranial-axis` como *family/recipe* de capabilities). Vocabulario técnico, no declaración de nodo del Atlas. |
| `KDX-NODE-STAR-LATTICE` | **NO** | ninguna mención. |
| `KDX-NODE-MYCELIAL-ORACLE` | **NO** | ninguna mención (tampoco variantes `mycelial`/`miceliar`). |
| `KDX-NODE-GAIA-SENTINEL` | **NO** | `gaia` no aparece en canon/schemas/data. |

## Conclusión (sin resolver)

Los 4 nodos **no están definidos en ningún lugar** del repo que el grafo no
haya visto. Son asignaciones de nodo pendientes: la decisión de declararlos,
fusionarlos o eliminarlos es **autoral** (Ocín) — este reporte no los declara.
Los orígenes quedan con la arista registrada; los destinos quedan como
referencias sin contenido hasta la decisión.

Candidatos de definición en futuras fuentes (fuera del alcance de este repo):
revisar el Drive y las notas del autor para `OBSERVER`, `STAR-LATTICE`,
`MYCELIAL-ORACLE` y `GAIA-SENTINEL`.
