import {
  formatStructure,
  formatValue,
} from "../utils/presentation.js";
import { EmptyState } from "./ui/EmptyState.jsx";
import { Panel } from "./ui/Panel.jsx";
import { PanelHeader } from "./ui/PanelHeader.jsx";

export function ObservationListPanel({
  investigation,
  onHighlightStructure,
}) {
  return (
    <Panel className="observations-panel">
      <PanelHeader
        title="Observações atuais"
        description="Uma observação por estrutura. Repetir a estrutura substitui o valor anterior."
      />

      {investigation?.observations?.length ? (
        <ul className="observation-list">
          {investigation.observations.map(
            (observation) => (
              <li
                key={observation.structure}
                className="observation-item"
              >
                <div>
                  <span>
                    {formatStructure(
                      observation.structure
                    )}
                  </span>
                  <strong>
                    {formatValue(
                      observation.value
                    )}
                  </strong>
                </div>
                <button
                  type="button"
                  className="chip-button"
                  aria-label={`Substituir observação de ${formatStructure(
                    observation.structure
                  )}`}
                  onClick={() =>
                    onHighlightStructure(
                      observation.structure
                    )
                  }
                >
                  Substituir
                </button>
              </li>
            )
          )}
        </ul>
      ) : (
        <EmptyState>
          Nenhuma observação registrada.
        </EmptyState>
      )}
    </Panel>
  );
}
