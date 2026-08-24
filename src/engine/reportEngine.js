export function generateReport(
  investigation
) {
  const leader =
    investigation.hypotheses?.[0];

  const runnerUp =
    investigation.hypotheses?.[1];

  return {
    protocolId:
      investigation.protocolId,

    observations:
      investigation.observations,

    hypotheses:
      investigation.hypotheses ?? [],

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
      investigation.conclusion ??
      null,

    decision:
      investigation.decision ??
      null,

    interpretation:
      investigation.interpretation ??
      null,

    leadingMargin:
      leader?.margin ?? null,

    competingHypothesis:
      runnerUp?.name ?? null,

    suggestion:
      investigation.suggestion ??
      null,

    generatedAt:
      new Date().toISOString(),

    narrative:
      buildNarrative(
        investigation,
        leader,
        runnerUp
      ),
  };
}

function buildNarrative(
  investigation,
  leader,
  runnerUp
) {
  const lines = [];

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
