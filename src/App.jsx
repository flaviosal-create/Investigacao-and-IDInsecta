import {
  useRef,
  useState,
} from "react";
import { InvestigationMenuSidebar } from "./components/InvestigationMenuSidebar.jsx";
import { InvestigationWorkspace } from "./components/InvestigationWorkspace.jsx";
import { SidebarContextPanel } from "./components/sidebar/SidebarContextPanel.jsx";
import { useInvestigationSession } from "./hooks/useInvestigationSession.js";
import { useProtocolSelection } from "./hooks/useProtocolSelection.js";
import { getProtocolById } from "./config/protocolCatalog.js";
import { ProtocolEditor } from "./components/ProtocolEditor.jsx";
import { BrandLogo } from "./components/ui/BrandLogo.jsx";
import LegacyInsectaKey from "./legacy-insecta/LegacyInsectaKey.jsx";
import "./legacy-insecta/legacyStyles.css";

export default function App() {
  const observationRefs = useRef(new Map());
  const [
    activePage,
    setActivePage,
  ] = useState("insecta-key");
  const [
    activeInvestigationPanel,
    setActiveInvestigationPanel,
  ] = useState("investigar");
  const [
    isMenuOpen,
    setIsMenuOpen,
  ] = useState(false);
  const {
    domains,
    selectedDomainId,
    setSelectedDomainId,
    selectedProtocolId,
    setSelectedProtocolId,
    selectedProtocol,
    domainProtocols,
    groupedProtocols,
    getProtocolMetadata,
    addLocalProtocol,
  } = useProtocolSelection();
  const protocoloInsectaId = "ordens-insecta-v1";
  const dominiosDisponiveis = domains.filter(
    (domain) => domain.id === "zoologia",
  );
  const protocolosInsecta = domainProtocols.filter(
    (protocol) => protocol.id === protocoloInsectaId,
  );
  const gruposInsecta = groupedProtocols
    .map(([label, items]) => [
      label,
      items.filter((protocol) => protocol.id === protocoloInsectaId),
    ])
    .filter(([, items]) => items.length > 0);
  const {
    investigation,
    report,
    sessionNotice,
    activeObservationMap,
    registerObservation,
    unregisterObservation,
    resetSession,
    loadObservations,
  } = useInvestigationSession(
    selectedProtocol
  );
  const leader =
    investigation?.hypotheses?.[0] ?? null;

  function highlightStructure(
    structure
  ) {
    const element =
      observationRefs.current.get(
        structure
      );

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function startSuggestedProtocol(protocolId) {
    const protocol = getProtocolById(protocolId);

    if (!protocol) {
      return;
    }

    setSelectedDomainId(protocol.domain);
    setSelectedProtocolId(protocol.id);
    setActiveInvestigationPanel("investigar");
  }

  return (
    <div
      className={`app-shell app-shell-${activePage} ${
        isMenuOpen ? "is-sidebar-open" : ""
      }`}
    >
      {activePage === "insecta-key" ? (
        <LegacyInsectaKey
          onBack={() => setActivePage("universo")}
          onStartInvestigative={() => {
            setActivePage("universo");
          }}
        />
      ) : activePage === "editor" ? (
        <ProtocolEditor
          onBack={() => setActivePage("universo")}
          onAddToLocalCatalog={(protocol) => {
            const result = addLocalProtocol(protocol);
            if (result.ok) {
              setSelectedDomainId(protocol.domain);
              setSelectedProtocolId(protocol.id);
              setActivePage("universo");
            }
            return result;
          }}
        />
      ) : activePage === "universo" ? (
        <main className="start-page">
          <section className="start-shell">
            <div className="brand-block start-brand">
              <BrandLogo />
              <p>
                Plataforma educacional
                baseada em observação,
                evidência e sustentação de
                hipóteses.
              </p>
            </div>

            <SidebarContextPanel
              domains={dominiosDisponiveis}
              selectedDomainId={
                selectedDomainId
              }
              onDomainChange={
                setSelectedDomainId
              }
              groupedProtocols={gruposInsecta}
              selectedProtocolId={
                selectedProtocolId
              }
              onProtocolChange={
                setSelectedProtocolId
              }
              selectedProtocol={
                selectedProtocol
              }
              domainProtocols={protocolosInsecta}
              getProtocolMetadata={getProtocolMetadata}
              actions={
                <div className="start-actions">
                  <button
                    className="primary-action-button"
                    type="button"
                    onClick={() => {
                      setActivePage("investigar");
                      setActiveInvestigationPanel(
                        "investigar"
                      );
                    }}
                  >
                    Investigar
                  </button>
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => setActivePage("editor")}
                  >
                    Criar protocolo
                  </button>
                </div>
              }
            />
          </section>
        </main>
      ) : (
        <>
          <a
            className="skip-link"
            href="#main-content"
          >
            Ir para o conteúdo principal
          </a>

          <button
            className="sidebar-toggle-button"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="investigation-menu-sidebar"
            aria-label={
              isMenuOpen
                ? "Fechar painel de leitura"
                : "Abrir painel de leitura"
            }
            onClick={() =>
              setIsMenuOpen(
                (current) => !current
              )
            }
          >
            {isMenuOpen ? "Fechar" : "Leitura"}
          </button>

          <button
            className="mobile-sidebar-backdrop"
            type="button"
            aria-label="Fechar menu lateral"
            onClick={() =>
              setIsMenuOpen(false)
            }
          />

          <InvestigationMenuSidebar
            id="investigation-menu-sidebar"
            selectedProtocol={
              selectedProtocol
            }
            report={report}
            leader={leader}
          />

          <InvestigationWorkspace
            selectedProtocol={
              selectedProtocol
            }
            investigation={investigation}
            report={report}
            sessionNotice={sessionNotice}
            leader={leader}
            activePanel={
              activeInvestigationPanel
            }
            onPanelChange={
              setActiveInvestigationPanel
            }
            activeObservationMap={
              activeObservationMap
            }
            observationRefs={
              observationRefs
            }
            onReset={resetSession}
            onRegisterObservation={
              registerObservation
            }
            onUnregisterObservation={
              unregisterObservation
            }
            onLoadCalibrationCase={(scenario) => {
              loadObservations(scenario.observations);
              setActiveInvestigationPanel("investigar");
            }}
            onLoadObservations={(observations) => {
              loadObservations(observations);
              setActiveInvestigationPanel("investigar");
            }}
            onHighlightStructure={
              highlightStructure
            }
            onBackToUniverse={() =>
              setActivePage("universo")
            }
            onStartSuggestedProtocol={
              startSuggestedProtocol
            }
          />
        </>
      )}
    </div>
  );
}
