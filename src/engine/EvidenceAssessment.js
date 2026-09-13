// Evidence strength is independent of rank. Competition and the decision to
// conclude remain separate: several hypotheses can be well supported and tied.
export function assessEvidence({ score = 0, evidences = [], conflicts = [] }, policy = {}) {
  if (conflicts.length > 0) {
    return {
      level: "com_conflitos",
      label: "Com conflitos",
      description: "Há observações que enfraquecem esta hipótese. Compare os conflitos com as evidências favoráveis antes de revisar suas escolhas.",
    };
  }
  if (evidences.length === 0 || score <= 0) {
    return {
      level: "insuficiente",
      label: "Sustentação insuficiente",
      description: "Ainda não há evidências favoráveis suficientes para sustentar esta hipótese. Ausência de apoio não significa incompatibilidade.",
    };
  }
  const supportingStructures = new Set(evidences.map((evidence) => evidence.structure)).size;
  const minimumStructures = Math.max(3, policy.minimumSupportingStructuresForConclusion ?? 3);
  if (score >= 8 && supportingStructures >= minimumStructures) {
    return {
      level: "bem_sustentada",
      label: "Bem sustentada",
      description: "Esta hipótese reúne evidências favoráveis de várias estruturas, sem conflitos registrados. Isso não garante liderança nem encerra a investigação.",
    };
  }
  return {
    level: "parcial",
    label: "Sustentação parcial",
    description: "Existem evidências favoráveis, mas ainda falta sustentação em estruturas adicionais. A posição na comparação é avaliada separadamente.",
  };
}

export function assessComparison(hypothesis, { topScore, tiedCount }) {
  if (topScore <= 0) {
    return {
      level: "sem_lideranca",
      label: "Ainda sem grupo líder",
      detail: "Nenhuma hipótese tem saldo positivo.",
      scoreGap: 0,
    };
  }
  if (hypothesis.score === topScore) {
    return tiedCount > 1
      ? {
          level: "empatada",
          label: "No grupo líder",
          detail: `Empata com ${tiedCount - 1} ${tiedCount === 2 ? "hipótese" : "hipóteses"} na maior pontuação.`,
          scoreGap: 0,
        }
      : {
          level: "lider",
          label: "À frente no momento",
          detail: "Tem a maior pontuação entre as hipóteses.",
          scoreGap: 0,
        };
  }
  const scoreGap = topScore - hypothesis.score;
  return {
    level: "menor_sustentacao",
    label: tiedCount > 1 ? "Grupo empatado" : "Abaixo da líder",
    detail: `${scoreGap} ${scoreGap === 1 ? "ponto" : "pontos"} abaixo da líder${
      tiedCount > 1
        ? `; empata com ${tiedCount - 1} ${tiedCount === 2 ? "hipótese" : "hipóteses"}.`
        : "."
    }`,
    scoreGap,
  };
}
