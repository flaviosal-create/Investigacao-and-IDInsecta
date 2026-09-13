import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("html exposes installability metadata", async () => {
  const html = await readFile("index.html", "utf8");

  assert.match(html, /rel="manifest"/);
  assert.match(html, /href="\/manifest\.webmanifest"/);
  assert.match(html, /name="theme-color"/);
});

test("web manifest describes a standalone LABSED app", async () => {
  const manifest = JSON.parse(
    await readFile("public/manifest.webmanifest", "utf8")
  );

  assert.equal(manifest.name, "LABSED Investigação");
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.lang, "pt-BR");
  assert.ok(
    manifest.icons.some((icon) =>
      icon.src === "/assets/labsed-icon.svg" &&
      icon.purpose.includes("maskable")
    )
  );
});

test("production bootstrap registers the service worker", async () => {
  const main = await readFile("src/main.jsx", "utf8");
  const registration = await readFile(
    "src/registerServiceWorker.js",
    "utf8"
  );

  assert.match(main, /registerServiceWorker\(\)/);
  assert.match(registration, /navigator\.serviceWorker\.register\("\/service-worker\.js"\)/);
  assert.match(registration, /import\.meta\.env\.PROD/);
});
