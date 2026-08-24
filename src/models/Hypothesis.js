/**
 * Hypothesis
 *
 * Representa uma explicação possível
 * para o conjunto atual de observações.
 */
export function createHypothesis({
  id,
  name,
  score = 0,
}) {
  return {
    id,
    name,
    score,

    evidences: [],

    conflicts: [],

    confidence: "insuficiente",
  };
}