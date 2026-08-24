import {
  formatNumber,
  formatStructure,
  formatValue,
} from "../utils/presentation.js";
import { EmptyState } from "./ui/EmptyState.jsx";
import { Panel } from "./ui/Panel.jsx";
import { PanelHeader } from "./ui/PanelHeader.jsx";

export function HypothesesPanel({
  investigation,
}) {
  const hypotheses =
    investigation?.hypotheses ?? [];
  const featuredHypotheses =
    hypotheses.slice(0, 4);
  const remainingHypotheses =
    hypotheses.slice(4);
  const leader = hypotheses[0] ?? null;
  const runnerUp = hypotheses[1] ?? null;
  const observationCount =
    investigation?.observations?.length ?? 0;

  return (
    <Panel className="ranking-panel">
      <PanelHeader
        title="Hipóteses"
        description={
          hypotheses.length
            ? `${hypotheses.length} hipóteses neste universo, atualizadas a cada observação.`
            : "Ranking atualizado a cada nova observação."
        }
      />

      {hypotheses.length ? (
        <>
          <section
            className="hypothesis-overview"
            aria-label="Leitura resumida das hipóteses"
          >
            <div className="hypothesis-overview-main">
              <span className="meta-label">Leitura atual</span>
              <strong>{leader.confidence.label}</strong>
              <p>{leader.confidence.description}</p>
            </div>
            <dl className="hypothesis-overview-stats">
              <div>
                <dt>Hipótese líder</dt>
                <dd>{leader.name}</dd>
              </div>
              <div>
                <dt>Margem</dt>
                <dd>{formatNumber(leader.margin)}</dd>
              </div>
              <div>
                <dt>Observações</dt>
                <dd>{observationCount}</dd>
              </div>
            </dl>
            <p className="hypothesis-overview-next">
              {runnerUp
                ? `Concorrente mais próxima: ${runnerUp.name}.`
                : "Registre outra observação para comparar hipóteses."}
            </p>
          </section>

          <div className="hypothesis-list">
          {featuredHypotheses.map(
            (hypothesis, index) => (
              <article
                key={hypothesis.id}
                className={`hypothesis-card ${
                  index === 0
                    ? "is-leading"
                    : ""
                }`}
              >
                <div className="hypothesis-header">
                  <div>
                    <h3>{hypothesis.name}</h3>
                    <p className="hint">
                      {hypothesis.clue ?? ""}
                    </p>
                  </div>
                  <span className="rank-badge">
                    #{hypothesis.rank}
                  </span>
                </div>

                <div className="hypothesis-meta">
                  <div className="meta-group">
                    <span className="meta-label">
                      Score
                    </span>
                    <strong>
                      {formatNumber(
                        hypothesis.score
                      )}
                    </strong>
                    <small>
                      força acumulada das
                      evidências
                    </small>
                  </div>
                  <div className="meta-group">
                    <span className="meta-label">
                      Margem
                    </span>
                    <strong>
                      {formatNumber(
                        hypothesis.margin
                      )}
                    </strong>
                    <small>
                      distância para a
                      concorrente
                    </small>
                  </div>
                  <div className="confidence-group">
                    <span
                      className={`status-badge ${hypothesis.confidence.level}`}
                    >
                      {
                        hypothesis.confidence
                          .label
                      }
                    </span>
                    <small>
                      leitura atual da
                      sustentação
                    </small>
                  </div>
                </div>

                <p className="confidence-note">
                  {
                    hypothesis.confidence
                      .description
                  }
                </p>

                <div className="evidence-block">
                  <p className="card-explainer">
                    A evidência favorável aumenta a
                    sustentação; o conflito indica
                    um ponto que merece revisão.
                  </p>
                  <div className="evidence-groups">
                    <div className="evidence-group">
                      <span className="evidence-group-label is-positive">
                        Favorecem
                      </span>
                      <div
                        className="evidence-list"
                        aria-label={`Evidências que favorecem ${hypothesis.name}`}
                      >
                        {hypothesis.evidences.length ? (
                          hypothesis.evidences.map(
                            (evidence) => (
                              <span
                                key={`positive-${hypothesis.id}-${evidence.structure}-${evidence.value}`}
                                className="evidence-chip positive"
                              >
                                {formatStructure(
                                  evidence.structure
                                )}
                                :{" "}
                                {formatValue(
                                  evidence.value
                                )}
                              </span>
                            )
                          )
                        ) : (
                          <span className="evidence-empty">
                            Nenhuma evidência favorável registrada.
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="evidence-group">
                      <span className="evidence-group-label is-negative">
                        Em conflito
                      </span>
                      <div
                        className="evidence-list"
                        aria-label={`Evidências em conflito com ${hypothesis.name}`}
                      >
                        {hypothesis.conflicts.length ? (
                          hypothesis.conflicts.map(
                            (conflict) => (
                              <span
                                key={`negative-${hypothesis.id}-${conflict.structure}-${conflict.value}`}
                                className="evidence-chip negative"
                              >
                                {formatStructure(
                                  conflict.structure
                                )}
                                :{" "}
                                {formatValue(
                                  conflict.value
                                )}
                              </span>
                            )
                          )
                        ) : (
                          <span className="evidence-empty">
                            Nenhum conflito registrado.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          )}

          {remainingHypotheses.length ? (
            <section className="hypothesis-compact-section">
              <div className="compact-section-header">
                <strong>
                  Outras hipóteses ainda
                  no universo
                </strong>
                <span>
                  {remainingHypotheses.length}
                </span>
              </div>
              <div className="hypothesis-compact-list">
                {remainingHypotheses.map(
                  (hypothesis) => (
                    <article
                      key={hypothesis.id}
                      className="hypothesis-compact-row"
                    >
                      <div>
                        <strong>
                          {hypothesis.name}
                        </strong>
                        <span>
                          {
                            hypothesis.confidence
                              .label
                          }
                        </span>
                      </div>
                      <div className="compact-score">
                        <span>
                          Score{" "}
                          {formatNumber(
                            hypothesis.score
                          )}
                        </span>
                        <span>
                          Margem{" "}
                          {formatNumber(
                            hypothesis.margin
                          )}
                        </span>
                      </div>
                    </article>
                  )
                )}
              </div>
            </section>
          ) : null}
          </div>
        </>
      ) : (
        <EmptyState>
          Registre observações para
          calcular hipóteses.
        </EmptyState>
      )}
    </Panel>
  );
}
