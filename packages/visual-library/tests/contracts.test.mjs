import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { catalog, coverage, engines, families, resolveVisualRecipe } from "../src/index.js";

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

test("catalog has broad family coverage without orphan primitives", () => {
  assert.ok(families.length >= 11);
  assert.ok(catalog.length >= 14);
  for (const family of families) {
    assert.ok(family.capabilities.length >= 3, `${family.id} needs searchable capabilities`);
    assert.ok(family.primitives.length >= 3, `${family.id} needs composable variants`);
  }
  assert.ok(coverage.every((item) => item.coverage >= 90));
});

test("Kokonut patterns are adapted without making its React stack mandatory", async () => {
  const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(pkg.dependencies.animejs.startsWith("^4."), true);
  assert.equal(pkg.dependencies.react, undefined);
  assert.equal(engines.kokonut.role, "pattern-source-only");
  assert.equal(engines.anime.role, "primary-dom-svg-motion");
  assert.ok(catalog.some((item) => item.id === "activity-rings"));
  assert.ok(catalog.some((item) => item.id === "flow-field"));
});

test("resolver maps a reference intent to reusable families", () => {
  const resolved = resolveVisualRecipe({ intent: "scientific anatomical infographic with energy field and metrics" });
  assert.ok(resolved.families.some((item) => item.id === "object"));
  assert.ok(resolved.families.some((item) => item.id === "telemetry"));
  assert.ok(resolved.assetSlots.includes("hero-object"));
  assert.equal(resolved.policy.provenanceRequired, true);
});

test("journey recipe keeps copy, data, and asset decoupled", async () => {
  const recipe = JSON.parse(await readFile(new URL("../recipes/journey-field.json", import.meta.url), "utf8"));
  assert.equal(recipe.primitive, "journey-field");
  assert.equal(typeof recipe.content.title, "string");
  assert.equal(typeof recipe.data.routes, "number");
  assert.equal(typeof recipe.assetId, "string");
});

test("3D stack separates browser runtime from offline processing", () => {
  assert.equal(engines.three.role, "primary-web-runtime");
  assert.equal(engines.open3d.role, "offline-asset-pipeline");
  assert.ok(engines.cesium.use.includes("geospatial"));
});

test("asset sources distinguish CC0 catalogs from per-item marketplaces", async () => {
  const data = JSON.parse(await readFile(new URL("../assets/source-registry.json", import.meta.url), "utf8"));
  const byId = Object.fromEntries(data.sources.map((source) => [source.id, source]));
  assert.equal(byId["poly-haven"].licensePolicy, "CC0-1.0");
  assert.equal(byId.ambientcg.trust, "preferred");
  assert.equal(byId.sketchfab.licensePolicy, "per-asset");
  assert.match(byId.sketchfab.ingestion, /quarantine/);
  assert.equal(byId.cgtrader.trust, "conditional");
  assert.match(byId.turbosquid.ingestion, /discovery-only/);
});

test("agent resource catalog is broad, searchable, and license-aware", async () => {
  const data = JSON.parse(await readFile(new URL("../assets/resource-catalog.json", import.meta.url), "utf8"));
  assert.ok(data.resources.length >= 45);
  assert.ok(new Set(data.resources.map((item) => item.category)).size >= 15);
  assert.ok(data.resources.every((item) => item.id && item.url && item.license && item.trust && item.use.length));
  assert.equal(data.resources.find((item) => item.id === "polyhaven").license, "CC0-1.0");
  assert.equal(data.resources.find((item) => item.id === "sketchfab").trust, "quarantine");
  assert.ok(data.resources.length >= 92);
  assert.ok(new Set(data.resources.map((item) => item.id)).size === data.resources.length);
  assert.ok(data.resources.some((item) => item.id === "gltf-transform"));
  assert.ok(data.resources.some((item) => item.id === "rawgraphs"));
  assert.ok(data.resources.some((item) => item.id === "shader-park-core"));
  assert.equal(data.resources.find((item) => item.id === "z-anatomy").trust, "conditional");
  assert.equal(data.resources.find((item) => item.id === "phylopic").trust, "conditional");
  assert.equal(data.resources.find((item) => item.id === "cel-lab").trust, "radar-only");
});

test("all supplied references map to reusable families and rights state", async () => {
  const data = JSON.parse(await readFile(new URL("../assets/reference-map.json", import.meta.url), "utf8"));
  assert.equal(data.references.length, 16);
  assert.ok(data.references.every((item) => item.id && item.file && item.title && item.summary && item.families.length && item.components.length && item.bestFor.length && item.avoid.length && item.rights && item.transform));
  assert.ok(data.references.every((item) => item.file.startsWith("KDX-")));
  assert.equal(new Set(data.references.map((item) => item.id)).size, data.references.length);
  assert.ok(data.references.some((item) => item.rights === "creator-owned"));
  assert.ok(data.references.some((item) => item.rights === "reference-only"));
});

test("portfolio ingestion contract keeps private sources separate from production derivatives", async () => {
  const data = JSON.parse(await readFile(new URL("../assets/portfolio-ingestion-contract.json", import.meta.url), "utf8"));
  assert.ok(data.requiredFields.includes("visibility"));
  assert.ok(data.visibility.includes("private-source"));
  assert.ok(data.visibility.includes("public-asset"));
  assert.ok(data.transformModes.includes("derive-pattern"));
  assert.ok(data.gates["cultural-material"].includes("no-generic-tribal-tag"));
  assert.equal(data.entryTemplate.visibility, "private-source");
});

test("collage source index connects all systems and portfolio families", async () => {
  const data = JSON.parse(await readFile(new URL("../assets/collage-source-index.json", import.meta.url), "utf8"));
  assert.equal(data.portfolioFamilies.length, 11);
  assert.ok(["github", "google-drive", "linear", "legacy-imac"].every((system) => data.sources.some((source) => source.system === system)));
  assert.ok(data.sources.every((source) => source.status && source.agentUse));
  assert.ok(data.portfolioFamilies.every((family) => family.id && family.driveFolderId && family.status && family.receivers.length));
  assert.ok(data.linearCrosswalk.some((item) => item.issue === "KOD-37" && item.blocking));
});

test("capability router returns small stacks with explicit fallbacks", async () => {
  const data = JSON.parse(await readFile(new URL("../assets/capability-router.json", import.meta.url), "utf8"));
  const resourceData = JSON.parse(await readFile(new URL("../assets/resource-catalog.json", import.meta.url), "utf8"));
  const ids = new Set(resourceData.resources.map((resource) => resource.id));
  assert.ok(data.routes.length >= 18);
  assert.ok(data.routes.every((route) => route.intent.length && route.primary.length && route.fallback));
  assert.ok(data.routes.every((route) => route.primary.length <= 2));
  for (const route of data.routes) {
    for (const id of [...route.primary, ...(route.optional || [])].filter((id) => id !== "css")) {
      assert.ok(ids.has(id), `router references missing resource ${id}`);
    }
  }
  assert.ok(data.routes.some((route) => route.intent.includes("public-wall") && route.primary.includes("fabricjs")));
});
