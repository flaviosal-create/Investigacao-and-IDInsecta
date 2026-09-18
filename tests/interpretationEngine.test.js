import test from "node:test";
import assert from "node:assert/strict";

import { generateInterpretation } from "../src/engine/InterpretationEngine.js";

test("generateInterpretation returns sem_dados when hypotheses is empty or missing", () => {
  assert.deepEqual(generateInterpretation({}), {
    state: "sem_dados",
    title: "Investigação não iniciada",
    summary: "Ainda não existem observações suficientes.",
    competition: null,
  });

  assert.deepEqual(generateInterpretation({ hypotheses: [] }), {
    state: "sem_dados",
    title: "Investigação não iniciada",
    summary: "Ainda não existem observações suficientes.",
    competition: null,
  });
});

test("generateInterpretation handles disputada confidence level", () => {
  const result = generateInterpretation({
    hypotheses: [
      {
        name: "Hypothesis A",
        margin: 1,
        confidence: { level: "disputada" },
      },
      {
        name: "Hypothesis B",
        margin: 0,
        confidence: { level: "em_andamento" },
      },
    ],
  });

  assert.deepEqual(result, {
    state: "em_disputa",
    title: "Investigação em disputa",
    summary: "Hypothesis A lidera, mas Hypothesis B permanece uma explicação concorrente relevante.",
    competition: {
      leader: "Hypothesis A",
      challenger: "Hypothesis B",
      margin: 1,
    },
  });
});

test("generateInterpretation handles bem_sustentada confidence level", () => {
  const result = generateInterpretation({
    hypotheses: [
      {
        name: "Hypothesis A",
        margin: 5,
        confidence: { level: "bem_sustentada" },
      },
      {
        name: "Hypothesis B",
        margin: 0,
        confidence: { level: "em_andamento" },
      },
    ],
  });

  assert.deepEqual(result, {
    state: "bem_sustentada",
    title: "Hipótese bem sustentada",
    summary: "Hypothesis A apresenta vantagens claras sobre as demais hipóteses.",
    competition: {
      leader: "Hypothesis A",
      challenger: "Hypothesis B",
      margin: 5,
    },
  });
});

test("generateInterpretation handles contraditoria confidence level", () => {
  const result = generateInterpretation({
    hypotheses: [
      {
        name: "Hypothesis A",
        margin: 2,
        confidence: { level: "contraditoria" },
      },
      {
        name: "Hypothesis B",
        margin: 0,
        confidence: { level: "em_andamento" },
      },
    ],
  });

  assert.deepEqual(result, {
    state: "em_revisao",
    title: "Investigação em revisão",
    summary: "Existem conflitos importantes que exigem novas observações.",
    competition: {
      leader: "Hypothesis A",
      challenger: "Hypothesis B",
      margin: 2,
    },
  });
});

test("generateInterpretation defaults to em_andamento for other confidence levels or single hypothesis", () => {
  const resultSingle = generateInterpretation({
    hypotheses: [
      {
        name: "Hypothesis Solo",
        margin: 0,
        confidence: { level: "em_andamento" },
      },
    ],
  });

  assert.deepEqual(resultSingle, {
    state: "em_andamento",
    title: "Investigação em andamento",
    summary: "Existem evidências promissoras, mas ainda insuficientes para uma conclusão robusta.",
    competition: null,
  });
});
