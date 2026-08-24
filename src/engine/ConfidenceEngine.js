/**
 * ConfidenceEngine V2
 *
 * Avalia a força de uma hipótese considerando:
 * - score
 * - conflitos
 * - margem para concorrentes
 */

export function calculateConfidence({
  score = 0,
  conflicts = [],
  margin = 0,
  isLeader = false,
  hasCompetition = true,
}) {
  if (
    conflicts.length > 0 &&
    score <= 0
  ) {
    return {
      level: "contraditoria",

      label: "Hipótese contraditória",

      description:
        "Existem evidências que entram em conflito com esta hipótese.",
    };
  }

  if (score <= 0) {
    return {
      level: "insuficiente",

      label: "Evidência insuficiente",

      description:
        "Ainda não existem evidências suficientes para avaliar esta hipótese.",
    };
  }

  if (isLeader && margin <= 1) {
    return {
      level: "disputada",

      label: "Hipótese disputada",

      description:
        "Existem hipóteses concorrentes muito próximas desta hipótese.",
    };
  }

  if (
    score >= 8 &&
    margin >= 3 &&
    conflicts.length === 0
  ) {
    return {
      level: "bem_sustentada",

      label: "Hipótese bem sustentada",

      description:
        "As evidências favorecem claramente esta hipótese.",
    };
  }

  if (
    score >= 6 &&
    margin >= 4 &&
    hasCompetition
  ) {
    return {
      level: "promissora",

      label: "Hipótese promissora",

      description:
        "A hipótese já aponta uma direção consistente, mas ainda precisa de novas observações.",
    };
  }

  return {
    level: "inicial",

    label: "Hipótese inicial",

    description:
      "Existem evidências favoráveis, mas novas observações ainda são necessárias.",
  };
}
