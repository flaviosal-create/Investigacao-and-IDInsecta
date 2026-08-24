import {
  formatStructure,
  formatValue,
} from "../../utils/presentation.js";

export function TeacherGuideCard({
  investigation,
}) {
  const leader =
    investigation?.hypotheses?.[0] ?? null;

  const runnerUp =
    investigation?.hypotheses?.[1] ?? null;

  const interpretation =
    investigation?.interpretation ?? null;

  if (!leader) {
    return (
      <>
        <span className="report-label">
          Leitura docente
        </span>

        <strong>
          A investigação ainda não começou.
        </strong>

        <p>
          Registre as primeiras observações
          para formar uma hipótese líder e
          uma concorrente.
        </p>
      </>
    );
  }

  const mainEvidences =
    leader.evidences.slice(0, 3);

  const mainConflicts =
    leader.conflicts.slice(0, 2);
  const hasConclusion =
    investigation?.conclusion?.status ===
    "concluida";

  return (
    <>
      <span className="report-label">
        Leitura docente
      </span>

      <strong>
        {buildLeaderReading({
          leader,
          runnerUp,
        })}
      </strong>

    <p>
      {interpretation?.summary}
    </p>

    <p className="teacher-guide-status">
      {hasConclusion
        ? "A leitura alcançou um estado de conclusão; use os sinais abaixo para discutir como ela foi sustentada."
        : "A investigação ainda está sendo analisada; evite encerrar a leitura antes de observar os sinais discriminativos."}
    </p>

      <div className="teacher-guide-block">
        <span className="meta-label">
          Sinais que mais ajudam
        </span>

        {mainEvidences.length ? (
          <ul className="teacher-guide-list">
            {mainEvidences.map(
              (evidence) => (
                <li
                  key={`${evidence.structure}-${evidence.value}`}
                >
                  {formatStructure(
                    evidence.structure
                  )}
                  :
                  {" "}
                  {formatValue(
                    evidence.value
                  )}
                </li>
              )
            )}
          </ul>
        ) : (
          <p>
            Ainda não há evidências
            positivas diretas para a
            hipótese líder.
          </p>
        )}
      </div>

      <div className="teacher-guide-block">
        <span className="meta-label">
          Pontos de cuidado
        </span>

        {mainConflicts.length ? (
          <ul className="teacher-guide-list">
            {mainConflicts.map(
              (conflict) => (
                <li
                  key={`${conflict.structure}-${conflict.value}`}
                >
                  {formatStructure(
                    conflict.structure
                  )}
                  :
                  {" "}
                  {formatValue(
                    conflict.value
                  )}
                </li>
              )
            )}
          </ul>
        ) : (
          <p>
            Nenhum conflito direto aparece
            para a hipótese líder neste
            momento.
          </p>
        )}
      </div>

      <p className="suggestion-context">
        {buildNextMoveReading(
          investigation
        )}
      </p>
    </>
  );
}

function buildLeaderReading({
  leader,
  runnerUp,
}) {
  if (!runnerUp) {
    return `${leader.name} é a hipótese em leitura.`;
  }

  return `${leader.name} lidera a leitura, com ${runnerUp.name} como principal alternativa.`;
}

function buildNextMoveReading(
  investigation
) {
  const suggestion =
    investigation.suggestion;

  if (!suggestion) {
    return "Não há próxima observação sugerida; a turma pode revisar as evidências já registradas.";
  }

  return `Próximo movimento didático: observar ${formatStructure(
    suggestion.structure
  )}, porque isso pode mudar a sustentação relativa das hipóteses.`;
}
