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

test("revisão docente resume casos coerentes e casos para revisar", () => {
  assert.match(calibrationPanel, /Casos avaliados/);
  assert.match(calibrationPanel, /Resultado coerente/);
  assert.match(calibrationPanel, /Revisar resultado/);
});

test("leitura docente diferencia investigação concluída e em análise", () => {
  assert.match(teacherGuide, /A leitura alcançou um estado de conclusão/);
  assert.match(teacherGuide, /evite encerrar a leitura/);
  assert.match(styles, /\.teacher-guide-status\s*\{/);
});
