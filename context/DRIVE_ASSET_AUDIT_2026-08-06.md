# KODEX−∞ GOOGLE DRIVE ASSET AUDIT

Status: `VERIFIED METADATA PASS / PARTIAL`

Date: `2026-08-06`

Mode: `READ ONLY`

## Purpose

Convert the connected Google Drive material into a controlled source inventory before design or implementation expands further.

This audit follows the project rule:

> Inventory first. Do not redesign until assets are verified, curated and connected to the real frontend.

## Verified roots

### `Kodex`

Drive ID: `1zsE-nWBw6-JNZRepXeSm-Dr81n4ibw-D`

Role: primary warehouse for KODEX packages, prototypes, generated visuals, animated previews, emblems, dossiers and system documents.

The folder visibly contains multiple generations of:

- spatial and impossible-space engines;
- visual grammar and design-system packs;
- typography and sigil systems;
- micrographics and ASCII/PETSCII kits;
- seven-scene emblems;
- commercial Impossible Forms material;
- transparent helix code;
- visual dossiers;
- production-system packages;
- hundreds of generated PNG references;
- several repeated uploads.

### `book`

Drive ID: `1rjXSHRBwJhwiRVxKrEsvatugA7CU1fbT`

This is not a clean Book-only corpus. It currently behaves as a mixed creative root containing `Kodex`, `0cin`, other project folders, landscape/photo material and private session folders.

Do not bulk-ingest this root into the public KODEX corpus.

Correct approach:

```text
MIXED ROOT
→ inspect one child folder at a time
→ classify privacy and rights
→ identify actual Book fragments and images
→ admit only reviewed records
```

### `0cin`

Drive ID: `1v2ujUFmOjhVrGkC7ylsj-SDEAsz2fS1x`

Role: strongest currently verified source for Ocín's earlier digital visual language.

Observed structure includes:

```text
Elementos gráficos
Banner
Circular
Cuadrado
Fractal
Mandala
Molecular
Patron
Psycho
Toroide
Triangular
```

This material is potentially valuable for:

- Artifact Altars;
- creative-lineage scenes;
- geometry and glyph fields;
- texture systems;
- process comparisons;
- portfolio case studies.

Some imagery may originate from references or carry cultural/religious meaning. Public reuse requires rights and cultural review rather than aesthetic extraction.

### `portafolio`

Drive ID: `1_lTMZhA9kvX-pT_1CNgnS3Psw6aqe9lu`

Observed direct children:

- `Piercing proyect`;
- `Mapping ear`.

This folder is useful for specialized piercing/ear-design work but is not presently the main digital-art portfolio source for the KODEX vertical slice.

## High-value package clusters

### Canon and production

```text
KODEX_PRODUCTION_OS_MASTER_v1.zip
KODEX_Tesis_Package_v1.zip
KODEX_QUIET_FRAMES_CONTEXT_v1.zip
```

### Visual system

```text
kodex-visual-grammar-system-v1.zip
kodex-design-system-pack-v1.zip
kodex-typography-system-v2.zip
KODEX_MODULAR_SIGIL_TYPE_SYSTEM_v1.zip
kodex_micrographics_kit.zip
```

### Interactive and generative engines

```text
KODEX_GENERATIVE_MODULES_MASTER_v1.zip
kodex-spatial-engine-v1.zip
kodex-spatial-engine-v2.zip
kodex-ripple-floor-v1.zip
kodex-split-corridor-v1.zip
kodex-wrinkled-reality-v1.zip
kodex-perspective-flip-v1.zip
kodex-impossible-structure-v1.zip
KODEX_Helix_Transparent.zip
```

### Product and presentation

```text
KODEX_Impossible_Forms_Vol1_SELLABLE.zip
KODEX_visual_dossiers_01_10.zip
KODEX_Master_Seal_PNG_SVG.zip
kodex-7-emblemas-separados.zip
KODEX_CRT_MASTER_KIT_v1.zip
```

## Duplicate risk

The metadata pass found repeated title-and-size groups. These are not yet deleted or merged.

Verified examples include:

- `KODEX_Impossible_Forms_Vol1_SELLABLE.zip`;
- `KODEX_Tesis_Package_v1.zip`;
- `kodex-living-elements-live-gallery.zip`;
- `kodex_kodelife_detail_v2.gif`;
- `kodex-ripple-floor-v1.zip`;
- `kodex-split-corridor-v1.zip`;
- `kodex-wrinkled-reality-v1.zip`;
- `kodex_ascii_petscii_kit_v1.zip`;
- `kodex-perspective-flip-v1.zip`.

The exact Drive IDs and observed sizes are recorded in:

```text
data/registries/drive-asset-inventory-v0.yaml
```

Same title and size strongly suggest duplication, but byte checksums must confirm identity before any consolidation decision.

## Asset admission model

Every candidate asset needs:

```yaml
asset:
  id: KDX-ASSET-0000
  drive_id: ""
  title: ""
  media_type: ""
  size_bytes: 0
  checksum: null
  creator: ""
  creation_date: null
  source_folder: ""
  public_status: PRIVATE | REVIEW | PUBLIC_CANDIDATE | PUBLIC
  rights_status: UNKNOWN | CLEAR | RESTRICTED | DO_NOT_PUBLISH
  cultural_status: STANDARD | REVIEW_REQUIRED | RESTRICTED
  canonical_role: ""
  related_nodes: []
  interaction_roles: []
  notes: []
```

## Selection target for the vertical slice

Do not import everything.

Curate a first verified corpus:

```text
15 KODEX visual/code assets
10 0cin works
 6 Book fragments or images
 3 interaction primitives
 1 complete Artifact Altar
```

Each selected asset must have a real purpose inside:

```text
THRESHOLD
ARCHIVE
HEART
RETURN
ARTIFACT ALTAR
```

## Immediate production consequence

The Drive inventory confirms that KODEX does not lack visual material. The constraint is now curation and semantic integration.

The next production question is not:

> What else can be generated?

It is:

> Which existing verified assets produce the strongest complete first journey?

## Integrity boundary

No file was moved, renamed, deleted, published or deployed during this audit.
