/**
 * ConclusionEngine
 * Responsável por determinar o estado
 * da investigação.
 */

export function calculateConclusion(
  hypotheses,
  { observations = [], policy = {} } = {}
) {
  const leader = hypotheses[0];

  if (!leader) {
    return null;
  }

  if (
    leader.confidence.level ===
    "disputada"
  ) {
    return {
      status: "em_disputa",
      reason:
        "Existem hipóteses concorrentes relevantes.",
    };
  }

  if (
    leader.confidence.level ===
    "bem_sustentada"
  ) {
    if (
      policy.requireNoLeaderConflictsForConclusion &&
      leader.conflicts.length > 0
    ) {
      return {
        status: "em_revisao",
        reason:
          "A hipótese líder possui evidências conflitantes que precisam ser discutidas antes de encerrar a investigação.",
      };
    }

    const observedStructures = new Set(
      observations.map((observation) => observation.structure)
    ).size;

    const supportingStructures = new Set(
      leader.evidences
        .filter((evidence) => evidence.effect === "positive")
        .map((evidence) => evidence.structure)
    ).size;

    const minimumObserved =
      policy.minimumObservedStructuresForConclusion ?? 0;
    const minimumSupporting =
      policy.minimumSupportingStructuresForConclusion ?? 0;

    if (
      observedStructures < minimumObserved ||
      supportingStructures < minimumSupporting
    ) {
      return {
        status: "em_andamento",
        reason:
          "A hipótese líder está promissora, mas ainda precisa ser confrontada por evidências de estruturas adicionais.",
      };
    }

    return {
      status: "concluida",
      reason:
        "A hipótese líder apresenta sustentação robusta.",
    };
  }

  if (
    leader.confidence.level ===
    "contraditoria"
  ) {
    return {
      status: "em_revisao",
      reason:
        "Existem conflitos importantes que exigem revisão.",
    };
  }

  return {
    status: "em_andamento",
    reason:
      "A investigação ainda necessita de mais evidências.",
  };
}
