import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { families } from "../src/catalog.js";
import { catalog as primitiveCatalog } from "../src/index.js";

/**
 * Dependency-free check of every recipe against schemas/recipe.schema.json.
 * The schema is a flat object schema (required + type + enum), so the whole of
 * it is covered without pulling a JSON Schema validator into the tree.
 *
 * If the palette work renames the tokens, the enum moves and this test is what
 * says so — the recipes must be swept in the same pass, not left behind.
 */
const schema = JSON.parse(await readFile(new URL("../schemas/recipe.schema.json", import.meta.url), "utf8"));
const dir = new URL("../recipes/", import.meta.url);
const files = (await readdir(dir)).filter((name) => name.endsWith(".json"));

function typeOf(value) {
  if (value === null) return "null";
  return Array.isArray(value) ? "array" : typeof value;
}

function violations(recipe) {
  const errors = [];
  for (const key of schema.required) {
    if (recipe[key] === undefined) errors.push(`missing required "${key}"`);
  }
  for (const [key, rule] of Object.entries(schema.properties)) {
    if (recipe[key] === undefined) continue;
    if (rule.enum && !rule.enum.includes(recipe[key])) {
      errors.push(`"${key}" = ${JSON.stringify(recipe[key])} is not one of ${rule.enum.join(", ")}`);
    }
    if (rule.type) {
      const allowed = Array.isArray(rule.type) ? rule.type : [rule.type];
      if (!allowed.includes(typeOf(recipe[key]))) errors.push(`"${key}" should be ${allowed.join("|")}, got ${typeOf(recipe[key])}`);
    }
  }
  return errors;
}

test("every recipe validates against recipe.schema.json", async () => {
  assert.ok(files.length >= 7, "expected the journey recipe plus one per calibrated primitive");
  for (const file of files) {
    const recipe = JSON.parse(await readFile(new URL(file, dir), "utf8"));
    assert.deepEqual(violations(recipe), [], `${file}: ${violations(recipe).join("; ")}`);
  }
});

test("every recipe names a primitive the catalog actually ships", async () => {
  const ids = new Set(primitiveCatalog.map((item) => item.id));
  for (const file of files) {
    const recipe = JSON.parse(await readFile(new URL(file, dir), "utf8"));
    assert.ok(ids.has(recipe.primitive), `${file} points at unknown primitive "${recipe.primitive}"`);
  }
});

test("the calibrated kit primitives each have a worked example", async () => {
  const covered = new Set();
  for (const file of files) {
    const recipe = JSON.parse(await readFile(new URL(file, dir), "utf8"));
    covered.add(recipe.primitive);
  }
  for (const id of ["waveform", "radial-scanner", "bar-meter", "ring-gauge", "step-graph", "micrografia"]) {
    assert.ok(covered.has(id), `no recipe demonstrates ${id}`);
  }
});

test("value-bearing recipes declare their telemetry symbolic", async () => {
  // Canon: the figures on the reference plates are poster fiction and must not
  // be presented as real system state. A recipe may only opt out deliberately.
  for (const file of files) {
    const recipe = JSON.parse(await readFile(new URL(file, dir), "utf8"));
    if (!["bar-meter", "ring-gauge", "step-graph", "signal-gauge"].includes(recipe.primitive)) continue;
    assert.equal(recipe.data.simbolico, true, `${file} shows a figure without declaring it symbolic`);
  }
});

test("catalog families only reference primitives that exist", () => {
  const ids = new Set(primitiveCatalog.map((item) => item.id));
  const shipped = ["ring-gauge", "bar-meter", "step-graph", "micrografia"];
  for (const id of shipped) assert.ok(ids.has(id), `${id} is missing from the primitive catalog`);
  const telemetry = families.find((family) => family.id === "telemetry");
  for (const id of ["ring-gauge", "bar-meter", "step-graph"]) {
    assert.ok(telemetry.primitives.includes(id), `telemetry family should list ${id}`);
  }
});
