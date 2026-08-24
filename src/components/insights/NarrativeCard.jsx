export function NarrativeCard({
  report,
}) {
  const narrative =
    report.narrative
      .split(". ")
      .filter(Boolean)
      .map((line) =>
        line.endsWith(".")
          ? line
          : `${line}.`
      );

  const interpretation =
    report.interpretation;

  return (
    <>
      <span className="report-label">
        Síntese
      </span>

      <p className="report-note">
        Esta síntese descreve a
        investigação atual dentro do
        universo selecionado, sem
        pressupor uma sequência
        obrigatória de protocolos.
      </p>

      {interpretation ? (
        <>
          <p>
            <strong>
              {interpretation.title}
            </strong>
          </p>

          <p>
            {interpretation.summary}
          </p>
        </>
      ) : null}

      <p>
        Hipótese líder:{" "}
        <strong>
          {report.leadingHypothesis ??
            "-"}
        </strong>
      </p>

      <p>
        Hipótese concorrente:{" "}
        <strong>
          {report.competingHypothesis ??
            "-"}
        </strong>
      </p>

      <ul>
        {narrative.map((line) => (
          <li key={line}>
            {line}
          </li>
        ))}
      </ul>
    </>
  );
}