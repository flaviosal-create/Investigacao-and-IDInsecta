function describeEntry(entry) {
  if (entry.type === "observation") {
    return `Observação registrada: ${entry.structure} = ${entry.value}.`;
  }

  if (entry.type === "observation-update") {
    return `Observação revisada: ${entry.structure} = ${entry.value}.`;
  }

  if (entry.type === "observation-remove") {
    return `Observação removida: ${entry.structure} = ${entry.value}.`;
  }

  if (entry.type === "hypothesis-update") {
    return entry.leader
      ? `Hipóteses atualizadas: ${entry.leader} assume a liderança (${entry.score} ponto(s)).`
      : "Hipóteses atualizadas.";
  }

  if (entry.type === "investigation-finalized") {
    return "Investigação encerrada pelo aluno.";
  }

  return "Etapa da investigação registrada.";
}

function formatTimestamp(timestamp) {
  if (!timestamp) {
    return "Horário não disponível";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

export function InvestigationHistoryCard({
  history = [],
}) {
  if (history.length === 0) {
    return (
      <p className="report-note">
        O percurso aparecerá aqui quando as primeiras observações forem registradas.
      </p>
    );
  }

  return (
    <ol className="investigation-history">
      {history.map((entry, index) => (
        <li
          key={`${entry.timestamp ?? "sem-data"}-${index}`}
        >
          <strong>{describeEntry(entry)}</strong>
          <span>{formatTimestamp(entry.timestamp)}</span>
        </li>
      ))}
    </ol>
  );
}
