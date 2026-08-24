import { useMemo } from "react";
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
  const cases = getCalibrationCasesForProtocol(
    selectedProtocol
  );
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
        <div className="calibration-case-list">
          {reviewedCases.map((scenario) => {
            const leader = scenario.result.hypotheses?.[0];
            const actualStatus =
              scenario.result.conclusion?.status;
            const matchesExpectation =
              actualStatus === scenario.expectedConclusion &&
              (!scenario.expectedLeader ||
                leader?.id === scenario.expectedLeader);

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
