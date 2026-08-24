import {
  formatNumber,
  formatStructure,
  formatValue,
  getConclusionStatusMeta,
  getDecisionStatusMeta,
} from "../utils/presentation.js";
import { InvestigationHistoryCard } from "./insights/InvestigationHistoryCard.jsx";

export function InvestigationReportDocument({
  report,
  selectedProtocol,
}) {
  const observations = report.observations ?? [];
  const hypotheses = report.hypotheses ?? [];
  const statusMeta = getConclusionStatusMeta(report.conclusion?.status);
  const decisionMeta = getDecisionStatusMeta(report.decision?.status);

  return (
    <article className="investigation-report-document">
      <header className="investigation-report-header">
        <div>
          <span className="report-label">LABSED Investigação</span>
          <h3>Relatório da investigação</h3>
          <p>
            Síntese das escolhas, evidências e interpretações produzidas no
            universo atual.
          </p>
        </div>
        <time dateTime={report.generatedAt}>
          Gerado em {formatReportDate(report.generatedAt)}
        </time>
      </header>

      <section className="investigation-report-section report-context">
        <span className="report-label">Contexto selecionado</span>
        <strong>{selectedProtocol?.name ?? "Protocolo não informado"}</strong>
        <p>{selectedProtocol?.description ?? "Universo investigativo atual."}</p>
      </section>

      <section className="investigation-report-summary" aria-label="Resumo da investigação">
        <div>
          <span>Observações atuais</span>
          <strong>{observations.length}</strong>
        </div>
        <div>
          <span>Hipótese líder</span>
          <strong>{report.leadingHypothesis ?? "Ainda não definida"}</strong>
        </div>
        <div>
          <span>Confiança</span>
          <strong>{report.confidence ?? "Sem dados"}</strong>
        </div>
        <div>
          <span>Estado</span>
          <strong>{statusMeta.label}</strong>
        </div>
      </section>

      <section className="investigation-report-section">
        <div className="investigation-report-section-heading">
          <span className="report-label">Estado atual</span>
          <span className={`insight-badge ${statusMeta.className}`}>
            {statusMeta.label}
          </span>
        </div>
        <h4>{statusMeta.title}</h4>
        <p>{report.conclusion?.reason ?? statusMeta.summary}</p>
        <div className="report-decision">
          <span className="report-label">Próxima decisão</span>
          <strong>{decisionMeta.title}</strong>
          <p>{report.decision?.reason ?? "Ainda não há decisão registrada."}</p>
        </div>
      </section>

      <section className="investigation-report-section">
        <span className="report-label">Observações atuais</span>
        {observations.length ? (
          <ul className="investigation-report-observations">
            {observations.map((observation) => (
              <li key={observation.structure}>
                <span>{formatStructure(observation.structure)}</span>
                <strong>{formatValue(observation.value)}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p className="report-note">Nenhuma observação foi registrada ainda.</p>
        )}
      </section>

      <section className="investigation-report-section">
        <span className="report-label">Hipóteses geradas</span>
        {hypotheses.length ? (
          <div className="investigation-report-hypotheses">
            {hypotheses.map((hypothesis) => (
              <article
                key={hypothesis.id}
                className={`investigation-report-hypothesis ${hypothesis.rank === 1 ? "is-leading" : ""}`}
              >
                <div className="investigation-report-hypothesis-heading">
                  <div>
                    <span className="report-rank">#{hypothesis.rank}</span>
                    <strong>{hypothesis.name}</strong>
                  </div>
                  <span className={`status-badge ${hypothesis.confidence.level}`}>
                    {hypothesis.confidence.label}
                  </span>
                </div>
                <div className="investigation-report-hypothesis-meta">
                  <span>Score <strong>{formatNumber(hypothesis.score)}</strong></span>
                  <span>Margem <strong>{formatNumber(hypothesis.margin)}</strong></span>
                </div>
                {hypothesis.evidences?.length ? (
                  <p>
                    Evidências favoráveis: {hypothesis.evidences
                      .map((evidence) => `${formatStructure(evidence.structure)} (${formatValue(evidence.value)})`)
                      .join(", ")}.
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <p className="report-note">As hipóteses aparecerão após o registro de observações.</p>
        )}
      </section>

      <section className="investigation-report-section">
        <span className="report-label">Relatório narrativo</span>
        {report.interpretation ? (
          <>
            <h4>{report.interpretation.title}</h4>
            <p>{report.interpretation.summary}</p>
          </>
        ) : null}
        <p className="investigation-report-narrative">{report.narrative}</p>
      </section>

      <section className="investigation-report-section">
        <span className="report-label">Percurso investigativo</span>
        <InvestigationHistoryCard history={report.history} />
      </section>
    </article>
  );
}

function formatReportDate(date) {
  if (!date) return "-";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "-";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(parsed);
}
