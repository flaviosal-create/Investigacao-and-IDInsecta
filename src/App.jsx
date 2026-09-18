import {
  useRef,
  useState,
} from "react";
import { InvestigationMenuSidebar } from "./components/InvestigationMenuSidebar.jsx";
import { InvestigationWorkspace } from "./components/InvestigationWorkspace.jsx";
import { SidebarContextPanel } from "./components/sidebar/SidebarContextPanel.jsx";
import { useInvestigationSession } from "./hooks/useInvestigationSession.js";
import { useProtocolSelection } from "./hooks/useProtocolSelection.js";
import { getProtocolById, filterZoologyProtocols } from "./config/protocolCatalog.js";
import { BrandLogo } from "./components/ui/BrandLogo.jsx";
import LegacyInsectaKey from "./legacy-insecta/LegacyInsectaKey.jsx";
import "./legacy-insecta/legacyStyles.css";

function UniversePage({
  domains,
  selectedDomainId,
  onDomainChange,
  groupedProtocols,
  selectedProtocolId,
  onProtocolChange,
  selectedProtocol,
  domainProtocols,
  getProtocolMetadata,
  onInvestigate,
  onBack,
}) {
  return (
    <main className="start-page">
      <section className="start-shell">
        <div className="brand-block start-brand">
          <BrandLogo />
          <p>
            Plataforma educacional baseada em observação, evidência e
            sustentação de hipóteses.
          </p>
        </div>
        <SidebarContextPanel
          domains={domains}
          selectedDomainId={selectedDomainId}
          onDomainChange={onDomainChange}
          groupedProtocols={groupedProtocols}
          selectedProtocolId={selectedProtocolId}
          onProtocolChange={onProtocolChange}
          selectedProtocol={selectedProtocol}
          domainProtocols={domainProtocols}
          getProtocolMetadata={getProtocolMetadata}
          actions={
            <div className="start-actions">
              <button className="primary-action-button" type="button" onClick={onInvestigate}>
                Investigar
              </button>
              <button className="secondary-button" type="button" onClick={onBack}>
                Voltar
              </button>
            </div>
          }
        />
      </section>
    </main>
  );
}


function InvestigationPage({
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  sidebar,
  workspace,
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Ir para o conteúdo principal
      </a>
      <button
        className="sidebar-toggle-button"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="investigation-menu-sidebar"
        aria-label={isMenuOpen ? "Fechar painel de leitura" : "Abrir painel de leitura"}
        onClick={onToggleMenu}
      >
        {isMenuOpen ? "Fechar" : "Leitura"}
      </button>
      <button
        className="mobile-sidebar-backdrop"
        type="button"
        aria-label="Fechar menu lateral"
        onClick={onCloseMenu}
      />
      {sidebar}
      {workspace}
    </>
  );
}

function InvestigativeExperience({ activePage, setActivePage }) {
  const observationRefs = useRef(new Map());
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
  } = useProtocolSelection();
  const {
    domains: dominiosDisponiveis,
    protocols: protocolosZoologia,
    groups: gruposZoologia,
  } = filterZoologyProtocols(domains, domainProtocols, groupedProtocols);
  const {
    investigation,
    report,
    activeObservationMap,
    registerObservation,
    unregisterObservation,
    resetSession,
    loadObservations,
    finalizeInvestigation,
    reopenInvestigation,
    startNewInvestigation,
    restoreArchivedInvestigation,
    archivedInvestigations,
    completedInvestigations,
  } = useInvestigationSession(
    selectedProtocol
  );
  const leader =
    investigation?.hypotheses?.find((hypothesis) => hypothesis.isLeader) ?? null;

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

  function handleLoadObservations(observations) {
    loadObservations(observations);
    setActiveInvestigationPanel("investigar");
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
      {activePage === "universo" ? (
        <UniversePage
          domains={dominiosDisponiveis}
          selectedDomainId={selectedDomainId}
          onDomainChange={setSelectedDomainId}
          groupedProtocols={gruposZoologia}
          selectedProtocolId={selectedProtocolId}
          onProtocolChange={setSelectedProtocolId}
          selectedProtocol={selectedProtocol}
          domainProtocols={protocolosZoologia}
          getProtocolMetadata={getProtocolMetadata}
          onInvestigate={() => {
            setActivePage("investigar");
            setActiveInvestigationPanel("investigar");
          }}
          onBack={() => setActivePage("insecta-key")}
        />
      ) : (
        <InvestigationPage
          isMenuOpen={isMenuOpen}
          onToggleMenu={() =>
            setIsMenuOpen((current) => !current)
          }
          onCloseMenu={() => setIsMenuOpen(false)}
          sidebar={
            <InvestigationMenuSidebar
            id="investigation-menu-sidebar"
            selectedProtocol={
              selectedProtocol
            }
            report={report}
            leader={leader}
          />
          }
          workspace={
            <InvestigationWorkspace
            selectedProtocol={
              selectedProtocol
            }
            investigation={investigation}
            report={report}
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
            onLoadCalibrationCase={(scenario) =>
              handleLoadObservations(scenario.observations)
            }
            onLoadObservations={handleLoadObservations}
            onFinalizeInvestigation={finalizeInvestigation}
            onReopenInvestigation={reopenInvestigation}
            onStartNewInvestigation={() => {
              startNewInvestigation();
              setActiveInvestigationPanel("investigar");
            }}
            archivedInvestigations={archivedInvestigations}
            completedInvestigations={completedInvestigations}
            onRestoreArchivedInvestigation={restoreArchivedInvestigation}
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
          }
        />
      )}
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("insecta-key");
  const [studyPlanActive, setStudyPlanActive] = useState(false);

  if (activePage === "insecta-key") {
    return (
      <div className="app-shell app-shell-insecta-key">
        <LegacyInsectaKey
          onBack={() => setActivePage("universo")}
          onStartInvestigative={() => setActivePage("universo")}
          studyPlanActive={studyPlanActive}
          onStudyPlanStarted={() => setStudyPlanActive(true)}
        />
      </div>
    );
  }

  return (
    <InvestigativeExperience
      activePage={activePage}
      setActivePage={setActivePage}
    />
  );
}
