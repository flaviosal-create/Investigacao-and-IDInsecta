export function generateReport(
  investigation
) {
  const hasObservations = investigation.observations.length > 0;
  const hypotheses = hasObservations
    ? investigation.hypotheses ?? []
    : [];
  const leader = hypotheses[0];

  const runnerUp = hypotheses[1];

  return {
    protocolId:
      investigation.protocolId,

    isFinalized:
      Boolean(investigation.finalizedAt),

    finalizedAt:
      investigation.finalizedAt ?? null,

    observations:
      investigation.observations,

    hypotheses:
      hypotheses,

    history:
      investigation.history ?? [],

    totalObservations:
      investigation.observations.length,

    leadingHypothesis:
      leader?.name ?? null,

    confidence:
      leader?.confidence?.label ??
      null,

    conclusion:
      hasObservations
        ? investigation.conclusion ?? null
        : {
            status: "em_andamento",
            reason: "Nenhuma observação foi registrada ainda.",
          },

    decision:
      hasObservations
        ? investigation.decision ?? null
        : {
            status: "sem_dados",
            reason: "Registre ao menos uma observação antes de interpretar as hipóteses.",
          },

    interpretation:
      hasObservations
        ? investigation.interpretation ?? null
        : null,

    leadingMargin:
      leader?.margin ?? null,

    competingHypothesis:
      runnerUp?.name ?? null,

    suggestion:
      hasObservations
        ? investigation.suggestion ?? null
        : null,

    nextProtocol:
      investigation.nextProtocol ?? null,

    generatedAt:
      new Date().toISOString(),

    narrative:
      buildNarrative(
        investigation,
        hasObservations,
        leader,
        runnerUp
      ),
  };
}

function buildNarrative(
  investigation,
  hasObservations,
  leader,
  runnerUp
) {
  const lines = [];

  if (!hasObservations) {
    return "A investigação foi iniciada dentro de um universo específico de hipóteses, mas ainda não possui observações registradas. Registre uma característica observável para gerar a primeira leitura.";
  }

  lines.push(
    "Investigação iniciada dentro de um universo específico de hipóteses."
  );

  investigation.observations.forEach(
    (obs) => {
      lines.push(
        `Observação registrada: ${obs.structure} = ${obs.value}.`
      );
    }
  );

  const interpretation =
    investigation.interpretation;

  if (interpretation) {
    lines.push(
      interpretation.title
    );

    lines.push(
      interpretation.summary
    );
  }

  if (leader) {
    lines.push(
      `Hipótese líder: ${leader.name}.`
    );

    lines.push(
      `Nível de confiança: ${leader.confidence.label}.`
    );

    if (
      leader.margin !== undefined &&
      leader.margin !== null
    ) {
      lines.push(
        `Margem atual: ${leader.margin} ponto(s).`
      );
    }

    if (
      leader.confidence.level ===
        "disputada" &&
      runnerUp
    ) {
      lines.push(
        `A investigação está em disputa com ${runnerUp.name}.`
      );
    }
  }

  if (
    investigation.conclusion
  ) {
    lines.push(
      `Estado da investigação: ${investigation.conclusion.reason}`
    );
  }

  if (
    investigation.decision
  ) {
    lines.push(
      `Decisão atual: ${investigation.decision.reason}`
    );
  }

  if (
    investigation.suggestion
  ) {
    lines.push(
      `Próxima observação sugerida: ${investigation.suggestion.structure}.`
    );
  }

  lines.push(
    "Esta síntese descreve apenas a investigação atual. Outros protocolos podem dialogar com ela depois, sem formar uma chave automática."
  );

  return lines.join(" ");
}
