import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const hook = await readFile(
  new URL("../src/hooks/useInvestigationSession.js", import.meta.url),
  "utf8"
);
const workspace = await readFile(
  new URL("../src/components/InvestigationWorkspace.jsx", import.meta.url),
  "utf8"
);

test("sessão comunica criação, recuperação e incompatibilidade", () => {
  assert.match(hook, /Nova investigação iniciada/);
  assert.match(hook, /Investigação recuperada automaticamente/);
  assert.match(hook, /não era compatível/);
  assert.match(workspace, /session-notice/);
});
