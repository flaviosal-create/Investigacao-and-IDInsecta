export function formatInvestigationReport(
  report,
  protocol
) {
  if (!report || !protocol) {
    return null;
  }

  const hasObservations = report.observations.length > 0;

  const observations =
    report.observations.length > 0
      ? report.observations.map(
          (observation) =>
            `- ${observation.structure}: ${observation.value}`
        )
      : ["- Nenhuma observação registrada."];
  const history =
    report.history?.length > 0
      ? report.history.map(
          (entry) => `- ${describeHistoryEntry(entry)}`
        )
      : ["- Nenhuma etapa registrada."];
  const hypotheses =
    report.observations.length > 0 && report.hypotheses?.length > 0
      ? report.hypotheses.flatMap((hypothesis) => [
          `- #${hypothesis.rank ?? "-"} ${hypothesis.name}: score ${hypothesis.score ?? 0}; confiança ${hypothesis.confidence?.label ?? "-"}.`,
          ...(hypothesis.evidences?.length
            ? [
                `  Evidências favoráveis: ${hypothesis.evidences
                  .map((evidence) => `${evidence.structure} = ${evidence.value}`)
                  .join(", ")}.`,
              ]
            : []),
        ])
      : ["- Nenhuma hipótese calculada."];

  return [
    "LABSED Investigação",
    `Protocolo: ${protocol.name}`,
    `Gerado em: ${formatDate(report.generatedAt)}`,
    "",
    "Observações",
    ...observations,
    "",
    "Síntese",
    `Hipótese líder: ${hasObservations ? report.leadingHypothesis ?? "-" : "-"}`,
    `Hipótese concorrente: ${hasObservations ? report.competingHypothesis ?? "-" : "-"}`,
    `Confiança: ${hasObservations ? report.confidence ?? "-" : "-"}`,
    `Estado: ${hasObservations ? report.conclusion?.reason ?? "Em andamento." : "Nenhuma observação foi registrada ainda."}`,
    `Decisão: ${hasObservations ? report.decision?.reason ?? "Sem decisão registrada." : "Registre ao menos uma observação antes de interpretar as hipóteses."}`,
    "",
    "Hipóteses geradas",
    ...hypotheses,
    "",
    "Percurso investigativo",
    ...history,
    "",
    "Narrativa",
    hasObservations
      ? report.narrative
      : "A investigação foi iniciada, mas ainda não possui observações registradas.",
    "",
    "Este relatório descreve a investigação dentro do universo de hipóteses do protocolo selecionado.",
  ].join("\n");
}

function describeHistoryEntry(entry) {
  if (entry.type === "observation") {
    return `Observação: ${entry.structure} = ${entry.value}.`;
  }

  if (entry.type === "observation-update") {
    return `Observação revisada: ${entry.structure} = ${entry.value}.`;
  }

  if (entry.type === "observation-remove") {
    return `Observação removida: ${entry.structure} = ${entry.value}.`;
  }

  if (entry.type === "hypothesis-update") {
    return entry.leader
      ? `Hipóteses atualizadas: ${entry.leader} lidera com ${entry.score} ponto(s).`
      : "Hipóteses atualizadas.";
  }

  return "Etapa da investigação registrada.";
}

export function downloadInvestigationReport(
  report,
  protocol
) {
  const content = formatInvestigationReport(
    report,
    protocol
  );

  if (!content || typeof document === "undefined") {
    return false;
  }

  const file = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `relatorio-${protocol.id}.txt`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);

  return true;
}

function formatDate(date) {
  if (!date) {
    return "-";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(parsedDate);
}
