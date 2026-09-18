import { useMemo, useState } from "react";
import { methodEvaluationQuestions } from "../utils/methodEvaluation.js";
import { createEvaluationRows, evaluationRowsToCsv } from "../utils/methodEvaluation.js";

export function MethodEvaluationDashboard() {
  const [evaluations, setEvaluations] = useState([]);
  const [error, setError] = useState("");

  async function importEvaluations(event) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;

    const imported = [];
    for (const file of files) {
      try {
        const value = JSON.parse(await file.text());
        if (value?.version !== 1 || !value?.method || !value?.answers) {
          throw new Error("formato inválido");
        }
        imported.push(value);
      } catch {
        setError(`Não foi possível importar ${file.name}.`);
      }
    }
    setEvaluations((current) => mergeEvaluations(current, imported));
  }

  const summary = useMemo(() => summarizeEvaluations(evaluations), [evaluations]);

  function exportSummary() {
    const file = new Blob([JSON.stringify(summary, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "resumo-avaliacao-metodos.json";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function exportCsv() {
    const file = new Blob([evaluationRowsToCsv(createEvaluationRows(evaluations))], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "avaliacao-metodos-dados-brutos.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="method-dashboard" aria-labelledby="method-dashboard-title">
      <div className="method-dashboard-header">
        <div>
          <span className="report-label">Pesquisa didática</span>
          <h2 id="method-dashboard-title">Comparação de experiências</h2>
          <p>Importe as avaliações individuais para observar padrões de uso, aprendizagem e contexto. As médias são descritivas e não definem um método vencedor.</p>
        </div>
        <label className="secondary-button method-dashboard-import">
          Importar avaliações (.json)
          <input type="file" accept="application/json,.json" multiple onChange={importEvaluations} />
        </label>
      </div>

      {error ? <p className="report-download-status is-error" role="alert">{error}</p> : null}

      {!evaluations.length ? (
        <p className="method-dashboard-empty">Nenhuma avaliação importada ainda.</p>
      ) : (
        <>
          <div className="method-dashboard-actions">
            <span>{evaluations.length} avaliação(ões) importada(s)</span>
            <button className="secondary-button" type="button" onClick={exportSummary}>Exportar resumo agregado (.json)</button>
            <button className="secondary-button" type="button" onClick={exportCsv}>Exportar dados tabulares (.csv)</button>
          </div>
          <div className="method-dashboard-table-wrap">
            <table className="method-dashboard-table">
              <caption>Resumo por método</caption>
              <thead><tr><th>Método</th><th>Respostas</th><th>Exemplares</th>{methodEvaluationQuestions.map((question) => <th key={question.id}>{question.id}</th>)}</tr></thead>
              <tbody>{summary.methods.map((method) => <tr key={method.method}><th scope="row">{method.label}</th><td>{method.responses}</td><td>{method.specimens}</td>{methodEvaluationQuestions.map((question) => <td key={question.id}>{method.averages[question.id] ?? "—"}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <div className="method-dashboard-context">
            <span><strong>Dificuldade:</strong> {summary.context.difficulty.join(", ") || "não informada"}</span>
            <span><strong>Ordem registrada:</strong> {summary.context.methodOrder.join(", ") || "não informada"}</span>
          </div>
          <div className="method-dashboard-comments">
            <span className="report-label">Comentários</span>
            {summary.comments.length ? summary.comments.map((comment, index) => <blockquote key={`${comment}-${index}`}>{comment}</blockquote>) : <p>Nenhum comentário importado.</p>}
          </div>
        </>
      )}
    </section>
  );
}

function mergeEvaluations(current, imported) {
  const byId = new Map(current.map((item) => [item.investigationId, item]));
  imported.forEach((item) => byId.set(item.investigationId ?? `${item.method}-${byId.size}`, item));
  return Array.from(byId.values());
}

function summarizeEvaluations(evaluations) {
  const methods = new Map();
  const context = { difficulty: new Set(), methodOrder: new Set() };
  const comments = [];
  evaluations.forEach((evaluation) => {
    const key = evaluation.method;
    const current = methods.get(key) ?? { method: key, label: evaluation.methodLabel ?? key, responses: 0, specimens: 0, totals: {}, counts: {}, squares: {} };
    current.responses += 1;
    current.specimens += Number(evaluation.specimenCount) || 0;
    Object.entries(evaluation.answers ?? {}).forEach(([question, value]) => {
      const numericValue = Number(value);
      if (!Number.isFinite(numericValue)) return;
      current.totals[question] = (current.totals[question] ?? 0) + numericValue;
      current.counts[question] = (current.counts[question] ?? 0) + 1;
      current.squares[question] = (current.squares[question] ?? 0) + numericValue ** 2;
    });
    if (evaluation.difficulty) context.difficulty.add(evaluation.difficulty);
    if (evaluation.methodOrder) context.methodOrder.add(evaluation.methodOrder);
    if (evaluation.comment) comments.push(evaluation.comment);
    methods.set(key, current);
  });
  return {
    generatedAt: new Date().toISOString(),
    totalEvaluations: evaluations.length,
    methods: Array.from(methods.values()).map(({ totals, counts, squares, ...method }) => ({
      ...method,
      averages: Object.fromEntries(Object.entries(totals).map(([key, total]) => [key, (total / counts[key]).toFixed(2)])),
      standardDeviations: Object.fromEntries(Object.entries(totals).map(([key, total]) => {
        const count = counts[key];
        const variance = count > 1 ? (squares[key] - (total ** 2 / count)) / (count - 1) : 0;
        return [key, Math.sqrt(Math.max(0, variance)).toFixed(2)];
      })),
      validN: counts,
    })),
    context: { difficulty: Array.from(context.difficulty), methodOrder: Array.from(context.methodOrder) },
    comments,
  };
}
