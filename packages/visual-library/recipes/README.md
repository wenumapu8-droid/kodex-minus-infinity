# Recipes

One worked example per primitive, validated against `schemas/recipe.schema.json`
by `tests/recipes.test.mjs` (dependency-free — the schema is flat enough that a
JSON Schema library would be a dependency bought for nothing).

`content` is copy, `data` is the primitive's knobs, `assetId` points at the asset
registry or is null. Nothing in a recipe is a system reading.

## Symbolic telemetry

Recipes that drive a figure — `bar-meter`, `ring-gauge`, `step-graph`,
`signal-gauge` — must set `data.simbolico: true`. The numbers on the reference
plates are poster fiction and `ops/factory/VISUAL_PASSPORT_PROTOCOL.md` ("No
pseudo-telemetry") forbids presenting them as system state. The test enforces it.
Only a value that really comes from an engine measurement may set it to `false`.

## Palette names — pending

`palette` is currently constrained by the schema to
`violet | gaia | solar | blood`, which is the enum the Atlas shipped with. Those
names match neither the canonical tokens nor the accents measured off the plates,
and the palette pass owns the rename. These recipes use the current enum so they
validate today; when the enum moves, `tests/recipes.test.mjs` fails and the sweep
happens in that same commit. Do not rename the tokens here.
