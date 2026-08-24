export function formatInvestigationReport(
  report,
  protocol
) {
  if (!report || !protocol) {
    return null;
  }

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

  return [
    "LABSED Investigação",
    `Protocolo: ${protocol.name}`,
    `Gerado em: ${formatDate(report.generatedAt)}`,
    "",
    "Observações",
    ...observations,
    "",
    "Síntese",
    `Hipótese líder: ${report.leadingHypothesis ?? "-"}`,
    `Hipótese concorrente: ${report.competingHypothesis ?? "-"}`,
    `Confiança: ${report.confidence ?? "-"}`,
    `Estado: ${report.conclusion?.reason ?? "Em andamento."}`,
    `Decisão: ${report.decision?.reason ?? "Sem decisão registrada."}`,
    "",
    "Percurso investigativo",
    ...history,
    "",
    "Narrativa",
    report.narrative,
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
