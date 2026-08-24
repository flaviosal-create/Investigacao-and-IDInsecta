import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const editor = await readFile(
  new URL("../src/components/ProtocolEditor.jsx", import.meta.url),
  "utf8"
);
const guidance = await readFile(
  new URL("../src/components/ProtocolReviewGuidance.jsx", import.meta.url),
  "utf8"
);
const styles = await readFile(
  new URL("../ui/styles.css", import.meta.url),
  "utf8"
);

test("editor informa origem, validação e última ação do rascunho", () => {
  assert.match(editor, /Origem/);
  assert.match(editor, /Pronta para revisão docente/);
  assert.match(editor, /Impedimentos encontrados/);
  assert.match(editor, /JSON importado e pronto para validação/);
});

test("revisão de protocolo usa linguagem coerente para os casos", () => {
  assert.match(guidance, /Coerente/);
  assert.match(styles, /\.editor-status-bar\s*\{/);
  assert.match(styles, /\.validation-count\s*\{/);
});
