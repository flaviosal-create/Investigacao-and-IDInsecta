import {
  getConclusionStatusMeta,
  getDecisionStatusMeta,
} from "../../utils/presentation.js";

export function ConclusionCard({
  report,
}) {
  const statusMeta =
    getConclusionStatusMeta(
      report.conclusion.status
    );
  const decisionMeta =
    getDecisionStatusMeta(
      report.decision?.status
    );

  return (
    <>
      <span className="report-label">
        Leitura atual
      </span>
      <span
        className={`insight-badge ${statusMeta.className}`}
      >
        {statusMeta.label}
      </span>
      <strong>{statusMeta.title}</strong>
      <p className="suggestion-focus">
        {statusMeta.summary}
      </p>
      <p>{report.conclusion.reason}</p>
      <span className="report-label">
        Decisão atual
      </span>
      <span
        className={`insight-badge ${decisionMeta.className}`}
      >
        {decisionMeta.label}
      </span>
      <strong>{decisionMeta.title}</strong>
      <p>{report.decision?.reason ?? ""}</p>
    </>
  );
}
