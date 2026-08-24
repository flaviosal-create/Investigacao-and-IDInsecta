import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { ordensInsectaV1 } from "../src/protocols/zoologia/ordensInsectaV1.js";

const projectRoot = resolve(
  fileURLToPath(new URL("..", import.meta.url))
);

function publicAssetPath(assetPath) {
  return resolve(projectRoot, `public${assetPath}`);
}

test("assets declarados pelo protocolo de Insecta existem", () => {
  const assets = ordensInsectaV1.observations
    .flatMap((observation) => Object.values(observation.visualExamples ?? {}))
    .map((example) => example.src)
    .filter(Boolean);

  assert.ok(assets.length > 0);

  for (const asset of assets) {
    assert.match(asset, /^\/assets\//);
    assert.equal(existsSync(publicAssetPath(asset)), true, asset);
  }
});

test("imagens das ordens de Insecta usam a versão otimizada", () => {
  for (const hypothesis of ordensInsectaV1.hypotheses) {
    const asset = `/assets/zoologia/ordens/${hypothesis.id}.jpg`;

    assert.equal(existsSync(publicAssetPath(asset)), true, asset);
    assert.equal(
      existsSync(publicAssetPath(asset.replace(/\.jpg$/, ".png"))),
      false,
      `PNG legado ainda presente: ${asset}`
    );
  }
});
