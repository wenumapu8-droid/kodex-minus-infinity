import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("every approved asset carries auditable provenance", async () => {
  const data = JSON.parse(await readFile(new URL("../assets/registry.json", import.meta.url), "utf8"));
  for (const asset of data.assets.filter((item) => item.status === "approved")) {
    assert.ok(asset.sourceUrl);
    assert.ok(asset.author);
    assert.ok(asset.license);
    assert.ok(asset.licenseUrl);
    assert.ok(asset.attribution);
  }
});

test("journey recipe keeps copy, data, and asset decoupled", async () => {
  const recipe = JSON.parse(await readFile(new URL("../recipes/journey-field.json", import.meta.url), "utf8"));
  assert.equal(recipe.primitive, "journey-field");
  assert.equal(typeof recipe.content.title, "string");
  assert.equal(typeof recipe.data.routes, "number");
  assert.equal(typeof recipe.assetId, "string");
});
