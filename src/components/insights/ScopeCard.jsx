import { buildScopeMessage } from "../../config/protocolCatalog.js";

export function ScopeCard({
  selectedProtocol,
  investigation,
}) {
  if (!selectedProtocol) {
    return (
      <>
        <strong>Sem investigação ativa.</strong>
        <p>
          Selecione um protocolo para
          abrir um universo de
          hipóteses investigáveis.
        </p>
      </>
    );
  }

  return (
    <>
      <span className="report-label">
        {investigation?.conclusion
          ?.status === "concluida"
          ? "Escopo atual"
          : "Universo atual"}
      </span>
      <strong>{selectedProtocol.name}</strong>
      <p>
        {buildScopeMessage(
          selectedProtocol,
          investigation
        )}
      </p>
    </>
  );
}
