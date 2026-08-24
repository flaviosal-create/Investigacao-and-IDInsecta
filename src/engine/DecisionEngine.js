/**
 * DecisionEngine
 *
 * Decide se a investigação deve
 * continuar ou pode ser encerrada.
 */

export function makeDecision(
  hypotheses,
  conclusion = null
) {
  const leader = hypotheses[0];
  const runnerUp = hypotheses[1];

  if (!leader) {
    return {
      status: "sem_dados",

      reason:
        "Não existem hipóteses suficientes para tomar uma decisão.",
    };
  }

  const margin =
    leader.margin ?? 0;

  if (
    conclusion?.status !== "concluida" &&
    leader.confidence.level === "bem_sustentada"
  ) {
    return {
      status: "continuar",

      reason:
        conclusion.reason,
    };
  }

  if (
    leader.confidence.level ===
      "bem_sustentada" &&
    margin >= 3
  ) {
    return {
      status: "concluir",

      reason:
        "Existe uma hipótese claramente superior às demais.",
    };
  }

  if (
    leader.confidence.level ===
    "disputada"
  ) {
    return {
      status: "continuar",

      reason:
        "A investigação permanece em disputa entre hipóteses concorrentes.",
    };
  }

  if (
    leader.confidence.level ===
    "contraditoria"
  ) {
    return {
      status: "continuar",

      reason:
        "Existem conflitos importantes que exigem novas observações.",
    };
  }

  return {
    status: "continuar",

    reason:
      "Novas evidências são recomendadas antes de encerrar a investigação.",
  };
}
