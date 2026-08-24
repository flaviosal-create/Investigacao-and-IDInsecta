import {
  describeConfidenceTone,
  formatNumber,
} from "../../utils/presentation.js";
import { Panel } from "../ui/Panel.jsx";
import { PanelHeader } from "../ui/PanelHeader.jsx";

export function SidebarSummaryPanel({
  report,
  leader,
}) {
  return (
    <Panel>
      <PanelHeader title="Leitura rápida" />

      <dl className="summary-grid">
        <div>
          <dt>Observações</dt>
          <dd>{report?.totalObservations ?? 0}</dd>
        </div>
        <div>
          <dt>Hipótese líder</dt>
          <dd>
            {report?.leadingHypothesis ?? "-"}
          </dd>
        </div>
        <div>
          <dt>Confiança</dt>
          <dd>{report?.confidence ?? "-"}</dd>
          <p className="summary-hint">
            {leader
              ? describeConfidenceTone(
                  leader.confidence.level
                )
              : "Registre observações para iniciar a leitura de confiança."}
          </p>
        </div>
        <div>
          <dt>Margem</dt>
          <dd>
            {report?.leadingMargin != null
              ? formatNumber(
                  report.leadingMargin
                )
              : "-"}
          </dd>
        </div>
      </dl>
    </Panel>
  );
}
