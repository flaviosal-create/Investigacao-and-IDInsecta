export function NextProtocolCard({
  investigation,
  onStart,
}) {
  const next =
    investigation?.nextProtocol;

  if (!next) {
    return null;
  }

  return (
    <>
      <span className="report-label">
        Próxima investigação
      </span>

      <strong>
        {next.name}
      </strong>

      <p>
        {next.reason}
      </p>

      <p className="suggestion-context">
        {next.description}
      </p>

      <button
        className="secondary-button next-step-button"
        type="button"
        onClick={() =>
          onStart(next.nextProtocol)
        }
      >
        Iniciar nova investigação
      </button>
    </>
  );
}
