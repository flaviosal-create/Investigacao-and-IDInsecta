import { buildSupportContent } from "../config/supportContent.js";
import { SidebarSummaryPanel } from "./sidebar/SidebarSummaryPanel.jsx";
import { Panel } from "./ui/Panel.jsx";
import { PanelHeader } from "./ui/PanelHeader.jsx";
import { BrandLogo } from "./ui/BrandLogo.jsx";

export function InvestigationMenuSidebar({
  id,
  selectedProtocol,
  report,
  leader,
}) {
  const support = buildSupportContent(
    selectedProtocol
  );

  return (
    <aside
      id={id}
      className="sidebar investigation-menu-sidebar"
    >
      <div className="brand-block">
        <BrandLogo />
        <p>
          Plataforma educacional baseada
          em observação, evidência e
          sustentação de hipóteses.
        </p>
      </div>

      <SidebarSummaryPanel
        report={report}
        leader={leader}
      />

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
