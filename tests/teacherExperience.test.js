import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const calibrationPanel = await readFile(
  new URL("../src/components/CalibrationReviewPanel.jsx", import.meta.url),
  "utf8"
);
const teacherGuide = await readFile(
  new URL("../src/components/insights/TeacherGuideCard.jsx", import.meta.url),
  "utf8"
);
const styles = await readFile(
  new URL("../ui/styles.css", import.meta.url),
  "utf8"
);
const methodEvaluation = await readFile(
  new URL("../src/components/MethodEvaluationCard.jsx", import.meta.url),
  "utf8"
);
const methodDashboard = await readFile(
  new URL("../src/components/MethodEvaluationDashboard.jsx", import.meta.url),
  "utf8"
);

test("revisão docente resume casos coerentes e casos para revisar", () => {
  assert.match(calibrationPanel, /Casos avaliados/);
  assert.match(calibrationPanel, /Resultado coerente/);
  assert.match(calibrationPanel, /Revisar resultado/);
  assert.match(calibrationPanel, /Aprovar caso/);
  assert.match(calibrationPanel, /Marcar para revisão/);
  assert.match(calibrationPanel, /Observação docente/);
  assert.match(calibrationPanel, /Calibração aprovada/);
});

test("leitura docente diferencia investigação concluída e em análise", () => {
  assert.match(teacherGuide, /A leitura alcançou um estado de conclusão/);
  assert.match(teacherGuide, /evite encerrar a leitura/);
  assert.match(styles, /\.teacher-guide-status\s*\{/);
});

test("avaliação do método oferece escala, comentário e exportação", () => {
  assert.match(methodEvaluation, /Reflexão sobre o método/);
  assert.match(methodEvaluation, /Salvar reflexão/);
  assert.match(methodEvaluation, /Exportar avaliação/);
  assert.match(methodEvaluation, /methodEvaluationQuestions/);
});

test("painel docente agrega avaliações importadas sem ranking", () => {
  assert.match(methodDashboard, /Importar avaliações/);
  assert.match(methodDashboard, /Resumo por método/);
  assert.match(methodDashboard, /Exportar resumo agregado/);
  assert.match(methodDashboard, /Exportar dados tabulares/);
  assert.match(methodDashboard, /médias são descritivas/);
});
