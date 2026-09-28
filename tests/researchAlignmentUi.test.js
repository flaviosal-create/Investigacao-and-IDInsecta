import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("entrada comum existente oferece chave e investigacao", async () => {
  const app = await readFile("src/App.jsx", "utf8");
  const config = await readFile(
    "src/legacy-insecta/chaves/ConfigurarSessao.jsx",
    "utf8"
  );

  assert.match(app, /useState\("insecta-key"\)/);
  assert.doesNotMatch(app, /function StartHome/);
  assert.match(app, /"classes-arthropoda-v1"/);
  assert.match(app, /"ordens-insecta-v1"/);
  assert.match(app, /visibleProtocolIds\.includes\(protocol\.id\)/);
  assert.match(config, /Modo Chave Dicotômica/);
  assert.match(config, /Modo Investigativo/);
  assert.match(config, /onStartPesquisador/);
  assert.match(config, /Orientações/);
  assert.match(config, /Avaliação/);
  assert.match(config, /InvestigationGuidancePanel/);
  assert.match(config, /EvaluationChecklistPanel/);
  assert.doesNotMatch(config, /Acesso às chaves de família/);
});

test("investigacao mantem avaliacao e orientacoes fora das abas internas", async () => {
  const workspace = await readFile(
    "src/components/InvestigationWorkspace.jsx",
    "utf8"
  );

  assert.doesNotMatch(workspace, /id: "orientacoes"/);
  assert.doesNotMatch(workspace, /id: "avaliacao"/);
  assert.doesNotMatch(workspace, /InvestigationGuidancePanel/);
  assert.doesNotMatch(workspace, /EvaluationChecklistPanel/);
});

test("paineis de conferencia contem perguntas para estudante e professor", async () => {
  const guidance = await readFile(
    "src/components/InvestigationGuidancePanel.jsx",
    "utf8"
  );
  const evaluation = await readFile(
    "src/components/EvaluationChecklistPanel.jsx",
    "utf8"
  );

  assert.match(guidance, /Guia do estudante/);
  assert.match(guidance, /Guia do professor/);
  assert.match(guidance, /Diferença entre os modos/);
  assert.match(evaluation, /Perguntas ao estudante/);
  assert.match(evaluation, /Perguntas ao professor/);
  assert.match(evaluation, /Rubrica do relatório/);
});
