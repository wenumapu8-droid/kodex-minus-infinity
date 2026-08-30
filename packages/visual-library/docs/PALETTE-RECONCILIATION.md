# Palette reconciliation — three systems, no shared source of truth

Status: **OPEN CONFLICT / PROPOSAL ONLY.**
This document does not choose a palette. Which palette is canonical is a canon
decision and belongs to the creator. What follows is the evidence laid side by
side, the exact deltas, and a *proposed* mapping.

## Why this exists

A conflict was already open between the canonical organism color roles
(`design-system/KODEX_VISUAL_LANGUAGE.md` §5) and the design tokens
(`design-system/tokens/kodex.tokens.css`, `--kdx-*`). This package opened a
third front: `packages/visual-library/src/tokens.css` declares its own `--kx-*`
palette that matches neither, and the measured plate kit in the site repo
(`kodex-work/src/styles/kodex-lamina.css`, `--lam-*`) is a fourth set of values
— the only one that was measured against real artwork.

Four vocabularies, zero shared source of truth. Any page that mounts a
visual-library primitive next to a design-system component today shows two
different violets, two different reds and two different whites.

## The systems

### 1. Canonical roles — `design-system/KODEX_VISUAL_LANGUAGE.md` §5

Roles, deliberately without hex. This is the authority on *meaning*.

| role | meaning |
|---|---|
| `obsidian` | unresolved field / entry |
| `bone_white` | readable structure on dark field |
| `open_white` | Return and integration |
| `living_red` | threshold, heart, active orientation (explicitly **not** evil/failure/low worth) |
| `violet` | observation, memory, ambiguity |
| `acid_green` | preserved organism, growth or activation |
| `cyan` | signal, relation or live technical state **when grounded** |
| `orange` | machine, transformation or controlled rupture |
| `magenta` | cosmology, expanded relation or speculative field |

Binding rules from the same section: essential meaning never depends on color
alone; no more than two simultaneous signal colors without a legend and a reason.

### 2. Design tokens — `design-system/tokens/kodex.tokens.css` (`--kdx-*`)

The only place where the canonical roles are given hex values.

| token | value | maps to role |
|---|---|---|
| `--kdx-field-obsidian` | `#050608` | obsidian |
| `--kdx-field-black` | `#000000` | — |
| `--kdx-field-bone` | `#f0ece3` | bone_white |
| `--kdx-field-open-white` | `#fafaf7` | open_white |
| `--kdx-signal-red` | `#ff3833` | living_red |
| `--kdx-signal-violet` | `#7855d5` | violet |
| `--kdx-signal-acid` | `#b9ff3b` | acid_green |
| `--kdx-signal-cyan` | `#00e8f0` | cyan |
| `--kdx-signal-orange` | `#ff7a00` | orange |
| `--kdx-signal-magenta` | `#ff1eaa` | magenta |
| `--kdx-text-on-dark` | `#f0ece3` | — |
| `--kdx-text-muted-on-dark` | `#9a9992` | — |
| `--kdx-text-on-light` | `#101113` | — |
| `--kdx-text-muted-on-light` | `#5d5e61` | — |

The file ends with a standing constraint: *"Font families are deliberately
excluded until licensing is approved."*

### 3. Atlas tokens — `packages/visual-library/src/tokens.css` (`--kx-*`)

| token | value | nearest `--kdx-*` | delta |
|---|---|---|---|
| `--kx-void` | `#050407` | `--kdx-field-obsidian` `#050608` | near-black, but violet-tinted vs blue-tinted |
| `--kx-surface` | `#0d0a12` | *(none)* | design tokens have no elevated-surface value |
| `--kx-ink` | `#eeeaf2` | `--kdx-field-bone` `#f0ece3` | **cool violet-white vs warm bone** — different family |
| `--kx-muted` | `#8f8797` | `--kdx-text-muted-on-dark` `#9a9992` | violet gray vs neutral gray, and darker |
| `--kx-signal` (default) | `#a95cff` | `--kdx-signal-violet` `#7855d5` | **different hue and much lighter** |
| `--kx-signal-hot` | `#e6bdff` | *(none)* | no tint scale exists in the design tokens |
| `--kx-warning` | `#d9b82f` | *(none)* | no warning/amber token in canon; nearest is orange `#ff7a00` |
| `--kx-glyph` | `#787a77` | *(none)* | the measured plate glyph gray; no `--kdx-*` counterpart |
| `--kx-line` | `color-mix(--kx-ink 24%)` | *(none)* | `--kdx-line-*` are widths, not colors |
| `--kx-grid` | `24px` | `--kdx-space-6` `1.5rem` | equal only if root font-size is 16px |
| `--kx-radius` | `2px` | `--kdx-radius-micro` `2px` | **identical** |
| `--kx-mono` | `"IBM Plex Mono", …` | *(none, by policy)* | contradicts the licensing hold on font families |
| `--kx-serif` | `"Cormorant Garamond", …` | *(none, by policy)* | same |
| `--kx-duration-fast` | `180ms` | between `--kdx-duration-micro` `120ms` and `--kdx-duration-short` `240ms` | no match |
| `--kx-duration-slow` | `1200ms` | between `--kdx-duration-medium` `600ms` and `--kdx-duration-long` `1600ms` | no match |

Theme overrides in the same file:

| `data-kx-palette` | `--kx-signal` | `--kx-signal-hot` | nearest `--kdx-*` | delta |
|---|---|---|---|---|
| `violet` (default) | `#a95cff` | `#e6bdff` | `--kdx-signal-violet` `#7855d5` | different hue/lightness |
| `gaia` | `#73d69b` | `#e0ffd8` | `--kdx-signal-acid` `#b9ff3b` | mint vs acid — different color |
| `solar` | `#d9b82f` | `#fff0a6` | `--kdx-signal-orange` `#ff7a00` | amber vs orange — different color |
| `blood` | `#d82238` | `#ff8b8b` | `--kdx-signal-red` `#ff3833` | darker, desaturated |

`--kdx-signal-cyan` and `--kdx-signal-magenta` have no Atlas equivalent at all,
so the Atlas covers four of the six canonical signal colors and matches none.

### 4. Measured plate accents — `kodex-work/src/styles/kodex-lamina.css` (`--lam-*`)

Not a competing proposal — this is what the real reference plates measure at.
It is listed because any reconciliation that the plates cannot hit is a
reconciliation the plate work will silently ignore.

| token | value | note |
|---|---|---|
| `--lam-bg` | `#000000` | matches `--kdx-field-black`, not `--kdx-field-obsidian` |
| `--lam-ink` | `#d8d4cc` | dimmer than `--kdx-field-bone` `#f0ece3` |
| `--lam-dim` | `#6f6a63` | no token equivalent |
| `--lam-faint` | `#2a2724` | no token equivalent |
| `--lam-accent` | `#ff5a1f` | a **fourth** orange, distinct from `--kdx-signal-orange` `#ff7a00` |
| glyph ink | `#787a77` highs / `#565755` mids | **neutral gray, never the accent** — measured, and no token anywhere carries it |

## Proposed mapping — `--kx-*` → `--kdx-*`

Confidence column: **lossless** = identical value, safe to alias now;
**proposed** = a defensible mapping that *changes pixels* and therefore needs the
creator's decision; **gap** = the design tokens have nothing to map to, so the
decision is whether to add a `--kdx-*` token or drop the `--kx-*` one.

| `--kx-*` | proposed target | confidence | consequence if adopted |
|---|---|---|---|
| `--kx-radius` | `--kdx-radius-micro` | **lossless** | none (2px → 2px) |
| `--kx-void` | `--kdx-field-obsidian` | proposed | background loses its violet tint |
| `--kx-ink` | `--kdx-field-bone` (or `--kdx-text-on-dark`) | proposed | text turns from cool white to warm bone across the gallery |
| `--kx-muted` | `--kdx-text-muted-on-dark` | proposed | secondary text lightens and neutralizes |
| `--kx-signal` (violet) | `--kdx-signal-violet` | proposed | accent darkens and shifts hue; every glow/drop-shadow in `gallery/styles.css` changes |
| `--kx-signal` (gaia) | `--kdx-signal-acid` | proposed | mint becomes acid green |
| `--kx-signal` (solar) | `--kdx-signal-orange` | proposed | amber becomes orange |
| `--kx-signal` (blood) | `--kdx-signal-red` | proposed | red brightens toward `living_red` |
| `--kx-grid` | `--kdx-space-6` | proposed | identical **only** at a 16px root; breaks if the root scales |
| `--kx-duration-fast` | `--kdx-duration-short` | proposed | 180ms → 240ms; also inherits the design-system reduced-motion policy (80–160ms) instead of the Atlas policy (0ms) |
| `--kx-duration-slow` | `--kdx-duration-long` | proposed | 1200ms → 1600ms |
| `--kx-signal-hot` | *(new `--kdx-signal-*-tint`?)* | gap | needs a canon decision: add a tint scale, or derive with `color-mix` from the signal token |
| `--kx-surface` | *(new `--kdx-field-surface`?)* | gap | needs an elevated-surface value in the design tokens |
| `--kx-line` | *(new `--kdx-line-color`?)* | gap | currently derived from `--kx-ink`; could stay derived from `--kdx-field-bone` |
| `--kx-warning` | *(none)* | gap | canon has no warning role. `orange` means "machine, transformation, controlled rupture", not warning — reusing it would overload a canonical meaning |
| `--kx-mono`, `--kx-serif` | *(none — blocked)* | **conflict** | the design tokens exclude font families pending licensing; the Atlas ships two named families anyway. Resolve as a licensing question, not a token question |
| *(none)* | `--kdx-signal-cyan`, `--kdx-signal-magenta` | gap | two canonical signal colors the Atlas cannot express |
| `--kx-glyph` | *(new `--kdx-ink-glyph`?)* | gap | measured on the plates (`#787a77` highs, `#565755` mids) and now held as `--kx-glyph` so the calibrated primitives stop reaching for the accent; the design tokens still have nothing for it |

### What was actually implemented

Only the **lossless** row. `src/tokens.css` now aliases `--kx-radius` to
`--kdx-radius-micro` with the literal `2px` as fallback, so the Atlas keeps
working standalone (the gallery does not load `kodex.tokens.css`). Every
**proposed** row is written into that file as a commented-out alias line, ready
for the creator to enable one at a time.

The one addition is `--kx-glyph: #787a77`, which records the measured plate
glyph gray so the calibrated primitives can stop defaulting to the accent color.
It is a measurement, not a palette choice, and it is still listed as a gap
because no `--kdx-*` token carries it.

No existing color, duration or spacing value changed.

## The palette names are an invented taxonomy

`schemas/recipe.schema.json` constrains `palette` to
`["violet", "gaia", "solar", "blood"]`. Three of those four names do not exist
anywhere in the canon, and the fourth means something else there:

- **`gaia`** — not a canonical term. It imports an earth-goddess framing onto
  what the canon calls `acid_green` ("preserved organism, growth or
  activation"). It is also the kind of substituted spiritual naming the
  cultural-provenance rule in `ops/factory/VISUAL_PASSPORT_PROTOCOL.md` asks to
  avoid.
- **`solar`** — not a canonical term. The canon's nearest role is `orange`
  ("machine, transformation or controlled rupture"), which is close to the
  opposite connotation.
- **`blood`** — not a canonical term, and it directly contradicts the canonical
  note on `living_red`: "no assumption of evil, failure or low worth."
  `living_red` is threshold, heart and orientation. `blood` reads as injury.
- **`violet`** — the only overlap, but in the canon `violet` is a *role*
  (observation, memory, ambiguity), not a theme name. Using it as a theme id
  makes a role look like a skin.

Two structural problems beyond the names:

1. The enum hard-codes a four-theme taxonomy while the canon defines six signal
   colors. `cyan` and `magenta` are unreachable through the schema.
2. Treating a signal color as a whole-page theme sits badly with the canonical
   rule "avoid using more than two simultaneous signal colors without a legend
   and reason" — a theme switch makes one signal color ambient, which is what
   the rule exists to prevent.

**Proposal (not a decision):** replace the enum with the canonical role names —
`["violet", "living-red", "acid-green", "cyan", "orange", "magenta"]` — or drop
the enum and let a recipe name the `--kdx-signal-*` token directly. Either way
the choice is the creator's.

## Open questions for the creator

1. Is `--kdx-*` the single source of truth for hex, with `--kx-*` reduced to
   aliases? Or does the Atlas keep an independent palette on purpose?
2. Do the measured plate values (`--lam-*`) constrain the design tokens, or are
   the plates a separate reproduction target allowed to diverge?
3. Does canon want a warning role, a surface value, a tint scale and a glyph
   gray? Those are four real gaps, not Atlas mistakes.
4. Are the plate typefaces admitted, given the standing licensing hold on font
   families?
