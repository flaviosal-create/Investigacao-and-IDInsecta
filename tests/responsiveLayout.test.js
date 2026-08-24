import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const styles = await readFile(
  new URL("../ui/styles.css", import.meta.url),
  "utf8"
);

function extractMediaBlock(source, query) {
  const start = source.indexOf(query);
  assert.notEqual(start, -1, `breakpoint ausente: ${query}`);

  const openingBrace = source.indexOf("{", start);
  let depth = 0;

  for (let index = openingBrace; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;

    if (depth === 0) {
      return source.slice(start, index + 1);
    }
  }

  throw new Error(`bloco CSS não fechado: ${query}`);
}

test(
  "layout mobile mantém proteções contra overflow e sobreposição",
  () => {
    const mobile = extractMediaBlock(
      styles,
      "@media (max-width: 720px)"
    );

    assert.match(mobile, /\.workspace\s*\{[\s\S]*overflow-x:\s*hidden/);
    assert.match(
      mobile,
      /\.workspace\.is-thermometer-visible\s+\.workspace-page-header\s*\{[\s\S]*padding-right:\s*0/
    );
    assert.match(
      mobile,
      /\.workspace-page-header\s*>\s*\.secondary-button\s*\{[\s\S]*z-index:\s*55/
    );
  }
);

test(
  "layout mobile mantém o acordeão de características",
  () => {
    const mobile = extractMediaBlock(
      styles,
      "@media (max-width: 720px)"
    );

    assert.match(
      mobile,
      /\.observation-card:not\(\.is-open\)\s+\.observation-card-content\s*\{[\s\S]*display:\s*none/
    );
    assert.match(
      mobile,
      /\.observation-card-content\s*\{[\s\S]*display:\s*grid/
    );
    assert.match(
      mobile,
      /\.observation-card-content\s+\.clear-observation-button/
    );
  }
);

test(
  "regras críticas do mobile não aparecem como regra global",
  () => {
    const globalStyles = styles.split(
      "@media (max-width: 720px)"
    )[0];

    assert.doesNotMatch(
      globalStyles,
      /\.observation-card:not\(\.is-open\)\s+\.observation-card-content/
    );
    assert.doesNotMatch(
      globalStyles,
      /\.workspace-page-header\s*>\s*\.secondary-button\s*\{[\s\S]*right:\s*80px/
    );
  }
);

test(
  "interface de observação preserva foco e leitura acessível",
  () => {
    assert.match(styles, /button:focus-visible/);
    assert.match(styles, /prefers-reduced-motion/);
    assert.match(styles, /\.observation-card-title\s*\{/);
    assert.match(styles, /\.observation-card-heading\s*\{/);
  }
);
