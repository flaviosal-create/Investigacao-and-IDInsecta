import { ObservationFormPanel } from "./ObservationFormPanel.jsx";
import { ObservationListPanel } from "./ObservationListPanel.jsx";
import { HypothesesPanel } from "./HypothesesPanel.jsx";
import { HypothesisThermometerStrip } from "./HypothesisThermometerStrip.jsx";
import { SuggestionCard } from "./insights/SuggestionCard.jsx";
import { ConclusionCard } from "./insights/ConclusionCard.jsx";
import { InvestigationReportDocument } from "./InvestigationReportDocument.jsx";
import { TeacherGuideCard } from "./insights/TeacherGuideCard.jsx";
import { InsightCard } from "./ui/InsightCard.jsx";
import { useRef, useState } from "react";
import { NextProtocolCard }
from "./insights/NextProtocolCard.jsx";
import { CalibrationReviewPanel }
from "./CalibrationReviewPanel.jsx";
import { MethodEvaluationCard } from "./MethodEvaluationCard.jsx";
import { MethodEvaluationDashboard } from "./MethodEvaluationDashboard.jsx";
import { SpecimenEvaluationCard } from "./SpecimenEvaluationCard.jsx";
import { loadStudyPlan } from "../utils/methodStudyPlan.js";
import { normalizeInvestigationEvents } from "../utils/studyInstrumentation.js";
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
  {
    id: "avaliacao",
    label: "Avaliação didática",
  },
];

export function InvestigationWorkspace({
  selectedProtocol,
  investigation,
  report,
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
  onFinalizeInvestigation,
  onReopenInvestigation,
  onStartNewInvestigation,
  archivedInvestigations,
  completedInvestigations = 0,
  onRestoreArchivedInvestigation,
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
            investigation={investigation}
            selectedProtocol={selectedProtocol}
            completedInvestigations={completedInvestigations}
            onLoadObservations={onLoadObservations}
            onFinalizeInvestigation={onFinalizeInvestigation}
            onReopenInvestigation={onReopenInvestigation}
            onStartNewInvestigation={onStartNewInvestigation}
            archivedInvestigations={archivedInvestigations}
            onRestoreArchivedInvestigation={onRestoreArchivedInvestigation}
            onStartSuggestedProtocol={onStartSuggestedProtocol}
          />
        );
      case "calibracao":
        return (
          <CalibrationReviewPanel
            selectedProtocol={selectedProtocol}
            onLoadCase={onLoadCalibrationCase}
          />
        );
      case "avaliacao":
        return <MethodEvaluationDashboard />;
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
            isFinalized={report?.isFinalized}
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

      <HypothesisThermometerStrip
        selectedProtocol={selectedProtocol}
        investigation={investigation}
      />

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

function ReportFinalizationActions({ report, onFinalize, onReopen, onStartNew }) {
  return (
    <div className="report-finalization-actions">
      {report.isFinalized ? (
        <>
          <p className="investigation-finalized-notice" role="status">
            Relatório finalizado pelo aluno em {formatFinalizedDate(report.finalizedAt)}.
          </p>
          <button className="secondary-button" type="button" onClick={onReopen}>Editar investigação encerrada</button>
          <button className="secondary-button" type="button" onClick={onStartNew}>Iniciar nova investigação</button>
        </>
      ) : (
        <>
          <button className="primary-action-button" type="button" onClick={() => {
            if (window.confirm("Encerrar esta investigação com as hipóteses e observações atuais?")) onFinalize();
          }}>
            Encerrar investigação
          </button>
        </>
      )}
    </div>
  );
}

function ArchivedInvestigations({ investigations, onRestore }) {
  if (!investigations.length) return null;
  return (
    <section className="archived-investigations" aria-label="Investigações arquivadas">
      <span className="report-label">Investigações arquivadas</span>
      {investigations.map((archived, index) => (
        <div className="archived-investigation-item" key={`${archived.id ?? "investigacao"}-${index}`}>
          <span>
            {archived.observations?.length ?? 0} observação(ões)
            {archived.finalizedAt ? " · encerrada" : " · em andamento"}
          </span>
          <button className="secondary-button" type="button" onClick={() => onRestore(index)}>Editar anterior</button>
        </div>
      ))}
    </section>
  );
}

function SnapshotControls({ report, selectedProtocol, onLoadObservations }) {
  const [status, setStatus] = useState("");
  const [hasError, setHasError] = useState(false);

  function exportSnapshot() {
    const downloaded = downloadInvestigationSnapshot(report, selectedProtocol);
    setHasError(!downloaded);
    setStatus(downloaded ? "Snapshot da investigação preparado para download." : "Não foi possível preparar o snapshot.");
  }

  function importSnapshot(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const observations = parseInvestigationSnapshot(String(reader.result), selectedProtocol);
        onLoadObservations(observations);
        setHasError(false);
        setStatus("Snapshot importado e investigação recalculada.");
      } catch (error) {
        setHasError(true);
        setStatus(
          error instanceof Error && error.message
            ? error.message
            : "Não foi possível importar o snapshot selecionado."
        );
      }
    };
    reader.onerror = () => {
      setHasError(true);
      setStatus("Não foi possível ler o arquivo selecionado.");
    };
    reader.readAsText(file);
  }

  return (
    <>
      <div className="snapshot-actions">
        <button className="secondary-button" type="button" onClick={exportSnapshot}>Exportar investigação (.json)</button>
        <label className="secondary-button snapshot-import-label">
          Importar investigação (.json)
          <input type="file" accept="application/json,.json" onChange={importSnapshot} />
        </label>
      </div>
      {status ? <p className={`report-download-status ${hasError ? "is-error" : ""}`} role={hasError ? "alert" : "status"}>{status}</p> : null}
    </>
  );
}

function ReportDownloadControl({ report, selectedProtocol }) {
  const [status, setStatus] = useState("");
  return (
    <>
      <button className="secondary-button" type="button" onClick={() => {
        const downloaded = downloadInvestigationReport(report, selectedProtocol);
        setStatus(downloaded ? "Relatório preparado para download." : "Não foi possível preparar o relatório.");
      }}>
        Baixar relatório (.txt)
      </button>
      {status ? <p className="report-download-status" aria-live="polite">{status}</p> : null}
    </>
  );
}

function WorkspaceReportPanel({
  report,
  investigation,
  selectedProtocol,
  onLoadObservations,
  onFinalizeInvestigation,
  onReopenInvestigation,
  onStartNewInvestigation,
  archivedInvestigations = [],
  onRestoreArchivedInvestigation,
  onStartSuggestedProtocol,
  completedInvestigations = 0,
}) {
  if (!report) {
    return null;
  }

  return (
    <InsightCard title="Relatório narrativo" bodyClassName="report-card">
      <InvestigationReportDocument
        report={report}
        selectedProtocol={selectedProtocol}
      />

      <ReportFinalizationActions
        report={report}
        onFinalize={onFinalizeInvestigation}
        onReopen={onReopenInvestigation}
        onStartNew={onStartNewInvestigation}
      />

      <ArchivedInvestigations
        investigations={archivedInvestigations}
        onRestore={onRestoreArchivedInvestigation}
      />

      <MethodEvaluationCard
        investigation={investigation}
        selectedProtocol={selectedProtocol}
        completedSpecimens={completedInvestigations}
        methodStage="investigacao"
        stageComplete={completedInvestigations >= (loadStudyPlan()?.targetSpecimens ?? 1)}
        specimenCode={investigation?.specimenCode}
        eventLog={normalizeInvestigationEvents(investigation)}
      />

      {report.nextProtocol ? (
        <section className="report-next-investigation">
          <span className="report-label">Próximo aprofundamento</span>
          <strong>{report.nextProtocol.name}</strong>
          <p>{report.nextProtocol.reason}</p>
          <button
            className="primary-action-button"
            type="button"
            onClick={() => onStartSuggestedProtocol(report.nextProtocol.nextProtocol)}
          >
            Investigar famílias de Coleoptera
          </button>
        </section>
      ) : null}

      <ReportDownloadControl report={report} selectedProtocol={selectedProtocol} />
      <SnapshotControls
        report={report}
        selectedProtocol={selectedProtocol}
        onLoadObservations={onLoadObservations}
      />
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
  isFinalized,
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
        isFinalized={isFinalized}
      />

      <SpecimenEvaluationCard
        investigation={investigation}
        selectedProtocol={selectedProtocol}
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
          <TeacherGuideCard
            investigation={investigation}
            selectedProtocol={selectedProtocol}
          />
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

function formatFinalizedDate(date) {
  if (!date) return "-";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "-";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(parsed);
}
