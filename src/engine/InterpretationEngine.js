export function generateInterpretation(
  investigation
) {
  const leader =
    investigation.hypotheses?.[0];

  const runnerUp =
    investigation.hypotheses?.[1];

  if (!leader) {
    return {
      state: "sem_dados",

      title:
        "Investigação não iniciada",

      summary:
        "Ainda não existem observações suficientes.",

      competition: null,
    };
  }

  const tied = investigation.hypotheses.filter((item) => item.score === leader.score);
  if (tied.length > 1) {
    return {
      state: leader.score > 0 ? "em_disputa" : "em_andamento",
      title: "Sem hipótese líder",
      summary: `${tied.length} hipóteses têm a mesma sustentação nas observações registradas. Ainda não há evidência para preferir uma delas.`,
      competition: null,
    };
  }

  const competition =
    runnerUp
      ? {
          leader:
            leader.name,

          challenger:
            runnerUp.name,

          margin:
            leader.margin,
        }
      : null;

  if (
    leader.confidence.level ===
    "disputada"
  ) {
    return {
      state:
        "em_disputa",

      title:
        "Investigação em disputa",

      summary:
        `${leader.name} lidera, mas ${runnerUp.name} permanece uma explicação concorrente relevante.`,

      competition,
    };
  }

  if (
    leader.confidence.level ===
    "bem_sustentada"
  ) {
    return {
      state:
        "bem_sustentada",

      title:
        "Hipótese bem sustentada",

      summary:
        `${leader.name} apresenta vantagens claras sobre as demais hipóteses.`,

      competition,
    };
  }

  if (
    leader.confidence.level ===
    "contraditoria"
  ) {
    return {
      state:
        "em_revisao",

      title:
        "Investigação em revisão",

      summary:
        "Existem conflitos importantes que exigem novas observações.",

      competition,
    };
  }

  return {
    state:
      "em_andamento",

    title:
      "Investigação em andamento",

    summary:
      "Existem evidências promissoras, mas ainda insuficientes para uma conclusão robusta.",

    competition,
  };
}