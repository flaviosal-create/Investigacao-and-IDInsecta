import { buildSupportContent } from "../config/supportContent.js";
import { Panel } from "./ui/Panel.jsx";
import { PanelHeader } from "./ui/PanelHeader.jsx";

export function SupportSidebar({
  selectedProtocol,
}) {
  const support = buildSupportContent(
    selectedProtocol
  );

  return (
    <aside className="support-sidebar">
      <Panel>
        <PanelHeader
          title="Apoio"
          description={
            selectedProtocol?.name ??
            "Protocolo"
          }
        />

        <div className="support-stack">
          <section className="support-section">
            <h3>Conceitos</h3>
            {support.concepts.length > 0 ? (
              <ul className="support-list">
                {support.concepts.map(
                  (concept) => (
                    <li key={concept.label}>
                      <span>
                        {concept.label}
                      </span>
                      <strong>
                        {concept.totalValues}
                      </strong>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p>{support.note}</p>
            )}
          </section>

          <section className="support-section">
            <h3>Bibliografia</h3>
            <ul className="reference-list">
              {support.bibliography.map(
                (reference) => (
                  <li key={reference}>
                    {reference}
                  </li>
                )
              )}
            </ul>
          </section>

          <section className="support-section">
            <h3>Nota didática</h3>
            <p>{support.note}</p>
          </section>
        </div>
      </Panel>
    </aside>
  );
}
