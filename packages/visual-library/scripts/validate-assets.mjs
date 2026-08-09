import { readFile } from "node:fs/promises";

const registry = JSON.parse(await readFile(new URL("../assets/registry.json", import.meta.url), "utf8"));
const required = ["id", "title", "kind", "sourceUrl", "author", "license", "licenseUrl", "attribution", "modifications", "status"];
const allowed = new Set(["MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "CC0-1.0", "CC-BY-4.0", "Public-Domain"]);
const ids = new Set();
const errors = [];

for (const [index, asset] of registry.assets.entries()) {
  for (const key of required) if (!asset[key]) errors.push(`assets[${index}] missing ${key}`);
  if (ids.has(asset.id)) errors.push(`duplicate id: ${asset.id}`);
  ids.add(asset.id);
  if (!allowed.has(asset.license)) errors.push(`${asset.id}: license ${asset.license} is not approved`);
  if (asset.status === "approved" && /^(unknown|candidate)$/i.test(asset.license)) errors.push(`${asset.id}: approved without verified license`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Asset registry valid: ${registry.assets.length} asset(s).`);
