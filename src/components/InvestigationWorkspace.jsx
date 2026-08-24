import { ObservationFormPanel } from "./ObservationFormPanel.jsx";
import { ObservationListPanel } from "./ObservationListPanel.jsx";
import { HypothesesPanel } from "./HypothesesPanel.jsx";
import { HypothesisThermometerStrip } from "./HypothesisThermometerStrip.jsx";
import { SuggestionCard } from "./insights/SuggestionCard.jsx";
import { ConclusionCard } from "./insights/ConclusionCard.jsx";
import { NarrativeCard } from "./insights/NarrativeCard.jsx";
import { TeacherGuideCard } from "./insights/TeacherGuideCard.jsx";
import { InsightCard } from "./ui/InsightCard.jsx";
import { useRef, useState } from "react";
import { NextProtocolCard }
from "./insights/NextProtocolCard.jsx";
import { InvestigationHistoryCard }
from "./insights/InvestigationHistoryCard.jsx";
import { CalibrationReviewPanel }
from "./CalibrationReviewPanel.jsx";
import { downloadInvestigationReport }
from "../utils/reportExport.js";
import {
  downloadInvestigationSnapshot,
  parseInvestigationSnapshot,
} from "../utils/investigationExport.js";

const workspaceTabs = [
  {
    id: "investigar",
    label: "Investigar",
  },
  {
    id: "observacoes",
    label: "Observações atuais",
  },
  {
    id: "hipoteses",
    label: "Hipóteses",
  },
  {
    id: "estado",
    label: "Estado",
  },
  {
    id: "relatorio",
    label: "Relatório narrativo",
  },
  {
    id: "calibracao",
    label: "Revisão docente",
  },
];

export function InvestigationWorkspace({
  selectedProtocol,
  investigation,
  report,
  sessionNotice,
  leader,
  activePanel,
  onPanelChange,
  activeObservationMap,
  observationRefs,
  onReset,
  onRegisterObservation,
  onUnregisterObservation,
  onLoadCalibrationCase,
  onLoadObservations,
  onHighlightStructure,
  onBackToUniverse,
  onStartSuggestedProtocol,
}) {
  const tabListRef = useRef(null);
  const hasThermometerSpace =
    investigation?.hypotheses?.some(
      (hypothesis) =>
        hypothesis.score > 0
    );

  function renderActivePanel() {
    switch (activePanel) {
      case "observacoes":
        return (
          <ObservationListPanel
            investigation={investigation}
            onHighlightStructure={onHighlightStructure}
          />
        );
      case "hipoteses":
        return (
          <HypothesesPanel
            investigation={investigation}
          />
        );
      case "estado":
        return (
          <WorkspaceStatusPanel
            report={report}
          />
        );
      case "relatorio":
        return (
          <WorkspaceReportPanel
            report={report}
            selectedProtocol={selectedProtocol}
            onLoadObservations={onLoadObservations}
          />
        );
      case "calibracao":
        return (
          <CalibrationReviewPanel
            selectedProtocol={selectedProtocol}
            onLoadCase={onLoadCalibrationCase}
          />
        );
      default:
        return (
          <WorkspaceFocusPanel
            selectedProtocol={selectedProtocol}
            investigation={investigation}
            report={report}
            activeObservationMap={activeObservationMap}
            observationRefs={observationRefs}
            onReset={onReset}
            onRegisterObservation={onRegisterObservation}
            onUnregisterObservation={onUnregisterObservation}
            onHighlightStructure={onHighlightStructure}
            onStartSuggestedProtocol={onStartSuggestedProtocol}
          />
        );
    }
  }

  function handleTabKeyDown(event) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const currentIndex = workspaceTabs.findIndex(
      (tab) => tab.id === activePanel
    );
    let nextIndex = currentIndex;

    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = workspaceTabs.length - 1;
    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % workspaceTabs.length;
    }
    if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + workspaceTabs.length) % workspaceTabs.length;
    }

    const nextTab = workspaceTabs[nextIndex];
    onPanelChange(nextTab.id);
    tabListRef.current
      ?.querySelector(`[data-tab-id="${nextTab.id}"]`)
      ?.focus();
  }

  return (
    <main
      id="main-content"
      className={`workspace ${
        hasThermometerSpace
          ? "is-thermometer-visible"
          : ""
      }`}
    >
      <section className="workspace-page-header">
        <div className="workspace-heading">
          <span className="brand-symbol" aria-hidden="true" />
          <div>
            <span className="page-kicker">Universo / Investigar</span>
            <h2>Investigar</h2>
            <p>
              {selectedProtocol?.name}
            </p>
          </div>
        </div>

        <button
          className="secondary-button"
          type="button"
          onClick={onBackToUniverse}
        >
          Universo
        </button>
      </section>

      {sessionNotice ? (
        <p className="session-notice" role="status">
          {sessionNotice}
        </p>
      ) : null}

      <p
        className="screen-reader-only"
        aria-live="polite"
      >
        {investigation?.observations?.length
          ? `${investigation.observations.length} observação(ões) registrada(s). ${leader ? `Hipótese líder atual: ${leader.name}.` : ""}`
          : "Nenhuma observação registrada."}
      </p>

      <div
        ref={tabListRef}
        className="workspace-tabbar"
        role="tablist"
        aria-label="Seções da investigação"
        onKeyDown={handleTabKeyDown}
      >
        {workspaceTabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${
              activePanel === tab.id
                ? "is-active"
                : ""
            }`}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            data-tab-id={tab.id}
            aria-selected={activePanel === tab.id}
            aria-controls="investigation-panel"
            tabIndex={activePanel === tab.id ? 0 : -1}
            onClick={() =>
              onPanelChange(tab.id)
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        id="investigation-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activePanel}`}
        aria-live="polite"
        tabIndex={0}
      >
        {renderActivePanel()}
      </div>

      <HypothesisThermometerStrip
        selectedProtocol={selectedProtocol}
        investigation={investigation}
      />
    </main>
  );
}

function WorkspaceStatusPanel({ report }) {
  return (
    <InsightCard title="Estado da investigação">
      {report?.conclusion ? (
        <ConclusionCard report={report} />
      ) : (
        <>
          <strong>Sem leitura de estado ainda.</strong>
          <p>
            Registre observações para que o protocolo avalie a investigação e
            indique o próximo movimento.
          </p>
        </>
      )}
    </InsightCard>
  );
}

function WorkspaceReportPanel({
  report,
  selectedProtocol,
  onLoadObservations,
}) {
  const [downloadStatus, setDownloadStatus] = useState("");
  const [snapshotStatus, setSnapshotStatus] = useState("");
  const [snapshotError, setSnapshotError] = useState(false);

  if (!report) {
    return null;
  }

  function exportSnapshot() {
    const downloaded = downloadInvestigationSnapshot(
      report,
      selectedProtocol
    );
    setSnapshotError(!downloaded);
    setSnapshotStatus(
      downloaded
        ? "Snapshot da investigação preparado para download."
        : "Não foi possível preparar o snapshot."
    );
  }

  function importSnapshot(event) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const observations = parseInvestigationSnapshot(
          String(reader.result),
          selectedProtocol
        );
        onLoadObservations(observations);
        setSnapshotError(false);
        setSnapshotStatus(
          "Snapshot importado e investigação recalculada."
        );
      } catch (error) {
        setSnapshotError(true);
        setSnapshotStatus(error.message);
      }
    };
    reader.onerror = () => {
      setSnapshotError(true);
      setSnapshotStatus("Não foi possível ler o arquivo selecionado.");
    };
    reader.readAsText(file);
  }

  return (
    <InsightCard title="Relatório narrativo" bodyClassName="report-card">
      <NarrativeCard report={report} />

      <span className="report-label">Percurso investigativo</span>
      <InvestigationHistoryCard history={report.history} />

      <button
        className="secondary-button"
        type="button"
        onClick={() => {
          const downloaded = downloadInvestigationReport(
            report,
            selectedProtocol
          );

          setDownloadStatus(
            downloaded
              ? "Relatório preparado para download."
              : "Não foi possível preparar o relatório."
          );
        }}
      >
        Baixar relatório (.txt)
      </button>
      <div className="snapshot-actions">
        <button
          className="secondary-button"
          type="button"
          onClick={exportSnapshot}
        >
          Exportar investigação (.json)
        </button>
        <label className="secondary-button snapshot-import-label">
          Importar investigação (.json)
          <input
            type="file"
            accept="application/json,.json"
            onChange={importSnapshot}
          />
        </label>
      </div>
      {downloadStatus ? (
        <p className="report-download-status" aria-live="polite">
          {downloadStatus}
        </p>
      ) : null}
      {snapshotStatus ? (
        <p
          className={`report-download-status ${snapshotError ? "is-error" : ""}`}
          role={snapshotError ? "alert" : "status"}
        >
          {snapshotStatus}
        </p>
      ) : null}
    </InsightCard>
  );
}

function WorkspaceFocusPanel({
  selectedProtocol,
  investigation,
  report,
  activeObservationMap,
  observationRefs,
  onReset,
  onRegisterObservation,
  onUnregisterObservation,
  onHighlightStructure,
  onStartSuggestedProtocol,
}) {
  return (
    <section className="workspace-focus-grid">
      <ObservationFormPanel
        selectedProtocol={selectedProtocol}
        activeObservationMap={activeObservationMap}
        observationRefs={observationRefs}
        onReset={onReset}
        onRegisterObservation={onRegisterObservation}
        onUnregisterObservation={onUnregisterObservation}
      />

      <section className="insights-column">
        <InsightCard title="Próxima observação">
          {investigation?.suggestion && report ? (
            <SuggestionCard
              investigation={investigation}
              report={report}
              onJump={onHighlightStructure}
            />
          ) : (
            <>
              {investigation?.observations?.length ? (
                <>
                  <strong>Observações suficientes por enquanto.</strong>
                  <p>
                    Consulte as hipóteses e o estado da investigação para
                    interpretar as evidências registradas.
                  </p>
                </>
              ) : (
                <>
                  <strong>Comece pela amostra.</strong>
                  <p>
                    Registre primeiro uma característica que você consegue
                    observar com clareza. A próxima sugestão aparecerá aqui.
                  </p>
                </>
              )}
            </>
          )}
        </InsightCard>

        <InsightCard title="Leitura do professor">
          <TeacherGuideCard investigation={investigation} />
        </InsightCard>
        {investigation?.nextProtocol ? (
          <InsightCard title="Próxima investigação">
            <NextProtocolCard
              investigation={investigation}
              onStart={onStartSuggestedProtocol}
            />
          </InsightCard>
        ) : null}
      </section>
    </section>
  );
}
