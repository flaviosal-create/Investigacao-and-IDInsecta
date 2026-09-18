import { useEffect, useMemo, useState } from "react";
import {
  getCalibrationCasesForProtocol,
} from "../protocols/zoologia/calibrationCasesV1.js";
import {
  addSessionObservation,
  runSession,
  startSession,
} from "../engine/sessionEngine.js";
import {
  formatStatus,
  formatStructure,
  formatValue,
} from "../utils/presentation.js";
import { EmptyState } from "./ui/EmptyState.jsx";
import { Panel } from "./ui/Panel.jsx";
import { PanelHeader } from "./ui/PanelHeader.jsx";

function runCalibrationCase(protocol, observations) {
  const session = observations.reduce(
    (nextSession, [structure, value]) =>
      addSessionObservation(nextSession, {
        structure,
        value,
      }),
    startSession(protocol)
  );

  return runSession(session).investigation;
}

export function CalibrationReviewPanel({
  selectedProtocol,
  onLoadCase,
}) {
  const [reviewStates, setReviewStates] = useState({});
  const cases = getCalibrationCasesForProtocol(
    selectedProtocol
  );
  const storageKey = `labsed-calibration-review:${selectedProtocol.id}`;

  useEffect(() => {
    setReviewStates(readReviewStates(storageKey));
  }, [storageKey]);
  const reviewedCases = useMemo(
    () =>
      cases.map((scenario) => ({
        ...scenario,
        result: runCalibrationCase(
          selectedProtocol,
          scenario.observations
        ),
      })),
    [cases, selectedProtocol]
  );
  const matchingCases = reviewedCases.filter(
    (scenario) => {
      const leader = scenario.result.hypotheses?.[0];
      return (
        scenario.result.conclusion?.status ===
          scenario.expectedConclusion &&
        (!scenario.expectedLeader ||
          leader?.id === scenario.expectedLeader)
      );
    }
  ).length;
  const casesNeedingReview =
    reviewedCases.length - matchingCases;
  const approvedCases = reviewedCases.filter(
    (scenario) => reviewStates[scenario.id]?.status === "approved"
  ).length;
  const flaggedCases = reviewedCases.filter(
    (scenario) => reviewStates[scenario.id]?.status === "review"
  ).length;
  const pendingCases = reviewedCases.length - approvedCases - flaggedCases;
  const calibrationApproved = reviewedCases.length > 0 && approvedCases === reviewedCases.length;

  function updateReviewState(caseId, status) {
    setReviewStates((current) => {
      const next = {
        ...current,
        [caseId]: {
          ...(current[caseId] ?? {}),
          status,
        },
      };
      writeReviewStates(storageKey, next);
      return next;
    });
  }

  function updateReviewNote(caseId, note) {
    setReviewStates((current) => {
      const next = {
        ...current,
        [caseId]: {
          ...(current[caseId] ?? {}),
          note,
        },
      };
      writeReviewStates(storageKey, next);
      return next;
    });
  }

  return (
    <Panel className="calibration-review-panel">
      <PanelHeader
        title="Revisão docente e calibração"
        description="Casos de referência executados pelo motor do protocolo. Eles servem para revisar o desenho investigativo; não identificam automaticamente uma amostra."
      />

      {reviewedCases.length ? (
        <dl
          className="calibration-overview"
          aria-label="Resumo da calibração"
        >
          <div>
            <dt>Casos avaliados</dt>
            <dd>{reviewedCases.length}</dd>
          </div>
          <div className="is-positive">
            <dt>Coerentes</dt>
            <dd>{matchingCases}</dd>
          </div>
          <div className="is-warning">
            <dt>Para revisar</dt>
            <dd>{casesNeedingReview}</dd>
          </div>
        </dl>
      ) : null}

      {reviewedCases.length ? (
        <div className={`calibration-approval-status ${calibrationApproved ? "is-approved" : "is-pending"}`}>
          <strong>
            {calibrationApproved ? "Calibração aprovada" : "Aprovação docente pendente"}
          </strong>
          <span>
            {approvedCases} aprovados · {flaggedCases} em revisão · {pendingCases} pendentes
          </span>
        </div>
      ) : null}

      {reviewedCases.length ? (
        <div className="calibration-case-list">
          {reviewedCases.map((scenario) => {
            const leader = scenario.result.hypotheses?.[0];
            const actualStatus =
              scenario.result.conclusion?.status;
            const matchesExpectation =
              actualStatus === scenario.expectedConclusion &&
              (!scenario.expectedLeader ||
                leader?.id === scenario.expectedLeader);
            const reviewState = reviewStates[scenario.id] ?? {};

            return (
              <article
                className="calibration-case"
                key={scenario.id}
              >
                <div className="calibration-case-heading">
                  <div>
                    <h3>{scenario.label}</h3>
                    <p>{scenario.purpose}</p>
                    {scenario.source === "generated-baseline" ? (
                      <span className="calibration-source-note">
                        Baseline automático — revisão docente pendente
                      </span>
                    ) : null}
                  </div>
                  <span
                    className={`calibration-result ${
                      matchesExpectation
                        ? "is-match"
                        : "is-mismatch"
                    }`}
                  >
                    {matchesExpectation
                      ? "Resultado coerente"
                      : "Revisar resultado"}
                  </span>
                </div>

                <dl className="calibration-summary">
                  <div>
                    <dt>Hipótese líder</dt>
                    <dd>{leader?.name ?? "Sem liderança"}</dd>
                  </div>
                  <div>
                    <dt>Estado obtido</dt>
                    <dd>{formatStatus(actualStatus)}</dd>
                  </div>
                  <div>
                    <dt>Estado esperado</dt>
                    <dd>{formatStatus(scenario.expectedConclusion)}</dd>
                  </div>
                </dl>

                <ul className="calibration-observation-list">
                  {scenario.observations.map(([structure, value]) => (
                    <li key={structure}>
                      <span>{formatStructure(structure)}</span>
                      <strong>{formatValue(value)}</strong>
                    </li>
                  ))}
                </ul>

                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => onLoadCase(scenario)}
                >
                  Abrir este caso na investigação
                </button>

                <div className="calibration-approval-controls">
                  <div className="calibration-approval-actions" role="group" aria-label={`Decisão docente para ${scenario.label}`}>
                    <button
                      className={`secondary-button ${reviewState.status === "approved" ? "is-selected" : ""}`}
                      type="button"
                      aria-pressed={reviewState.status === "approved"}
                      onClick={() => updateReviewState(scenario.id, "approved")}
                    >
                      Aprovar caso
                    </button>
                    <button
                      className={`secondary-button ${reviewState.status === "review" ? "is-selected is-warning" : ""}`}
                      type="button"
                      aria-pressed={reviewState.status === "review"}
                      onClick={() => updateReviewState(scenario.id, "review")}
                    >
                      Marcar para revisão
                    </button>
                  </div>
                  <label className="calibration-note-field">
                    <span>Observação docente (opcional)</span>
                    <textarea
                      value={reviewState.note ?? ""}
                      onChange={(event) => updateReviewNote(scenario.id, event.target.value)}
                      placeholder="Registre um ajuste ou comentário sobre este caso."
                      rows="2"
                    />
                  </label>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState>
          Ainda não há casos de calibração versionados para este protocolo.
        </EmptyState>
      )}
    </Panel>
  );
}

function readReviewStates(storageKey) {
  try {
    const stored = window.localStorage.getItem(storageKey);
    const parsed = stored ? JSON.parse(stored) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeReviewStates(storageKey, states) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(states));
  } catch {
    // A revisão continua disponível durante a sessão mesmo sem armazenamento.
  }
}
