import { useEffect, useState } from "react";
import { loadStudyPlan } from "../utils/methodStudyPlan.js";

export function SpecimenEvaluationCard({
  investigation,
  selectedProtocol,
  completedInvestigations = 0,
}) {
  const storageKey = `labsed-specimen-evaluation:${investigation?.id}`;
  const [evaluation, setEvaluation] = useState({ difficulty: "intermediaria", confidence: "3", outcome: "aberto", neededHelp: "nao", comment: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setEvaluation(JSON.parse(stored));
    } catch {}
  }, [storageKey]);

  const targetSpecimens = loadStudyPlan()?.finalAt ?? 1;
  const evaluationReady =
    investigation?.finalizedAt && completedInvestigations >= targetSpecimens;

  if (!evaluationReady) return null;

  function update(field, value) {
    setEvaluation((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function save() {
    const payload = { ...evaluation, version: 1, evaluationId: investigation.id, protocolId: selectedProtocol.id, method: "investigacao", methodLabel: "Modo Investigativo", answers: {}, specimenEvaluations: { [investigation.id]: { status: evaluation.outcome, difficulty: evaluation.difficulty } }, specimenId: investigation.id, observationCount: investigation.observations.length, conclusionStatus: investigation.conclusion?.status ?? "", leadingHypothesis: investigation.hypotheses?.[0]?.id ?? "", savedAt: new Date().toISOString() };
    try { window.localStorage.setItem(storageKey, JSON.stringify(payload)); setSaved(true); } catch { setSaved(false); }
  }

  return (
    <section className="specimen-evaluation-card" aria-labelledby="specimen-evaluation-title">
      <span className="report-label">Avaliação da investigação</span>
      <h3 id="specimen-evaluation-title">Como foi a atividade completa?</h3>
      <p>Registre esta avaliação depois de concluir o número planejado de exemplares.</p>
      <div className="specimen-evaluation-grid">
        <label><span>Dificuldade</span><select value={evaluation.difficulty} onChange={(event) => update("difficulty", event.target.value)}><option value="facil">Fácil</option><option value="intermediaria">Intermediária</option><option value="dificil">Difícil</option></select></label>
        <label><span>Confiança na leitura</span><select value={evaluation.confidence} onChange={(event) => update("confidence", event.target.value)}>{[1, 2, 3, 4, 5].map((value) => <option key={value} value={String(value)}>{value}</option>)}</select></label>
        <label><span>Resultado do exemplar</span><select value={evaluation.outcome} onChange={(event) => update("outcome", event.target.value)}><option value="concluido">Concluído</option><option value="aberto">Permaneceu aberto</option></select></label>
        <label><span>Precisou de ajuda?</span><select value={evaluation.neededHelp} onChange={(event) => update("neededHelp", event.target.value)}><option value="nao">Não</option><option value="sim">Sim</option></select></label>
      </div>
      <label className="specimen-evaluation-comment"><span>Comentário (opcional)</span><textarea rows="2" value={evaluation.comment} onChange={(event) => update("comment", event.target.value)} placeholder="O que ajudou ou dificultou?" /></label>
      <div className="specimen-evaluation-footer"><button className="secondary-button" type="button" onClick={save}>Salvar avaliação do exemplar</button>{saved ? <span role="status">Avaliação salva.</span> : null}</div>
    </section>
  );
}
