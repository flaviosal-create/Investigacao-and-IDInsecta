import { useEffect, useState } from "react";
import {
  loadMethodEvaluation,
  methodEvaluationQuestions,
  saveMethodEvaluation,
} from "../utils/methodEvaluation.js";
import { loadStudyPlan, markStudyMethodCompleted } from "../utils/methodStudyPlan.js";
import { normalizeInvestigationEvents, summarizeStudyEvents } from "../utils/studyInstrumentation.js";

const ratingLabels = ["1", "2", "3", "4", "5"];

export function MethodEvaluationCard({
  investigation,
  selectedProtocol,
  evaluationId,
  protocolId,
  method = "investigacao",
  methodLabel = "Modo Investigativo",
  methodStage = "",
  stageComplete = true,
  eventLog = null,
  specimenCode = "",
}) {
  const currentEvaluationId = evaluationId ?? investigation?.id;
  const [answers, setAnswers] = useState({});
  const [comment, setComment] = useState("");
  const [participantCode, setParticipantCode] = useState("");
  const [specimenCount, setSpecimenCount] = useState("5");
  const [groups, setGroups] = useState("");
  const [difficulty, setDifficulty] = useState("variada");
  const [methodOrder, setMethodOrder] = useState("nao-aplicavel");
  const [specimenEvaluations, setSpecimenEvaluations] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const evaluation = loadMethodEvaluation(currentEvaluationId);
    setAnswers(evaluation?.answers ?? {});
    setComment(evaluation?.comment ?? "");
    setParticipantCode(evaluation?.participantCode ?? "");
    setSpecimenCount(String(evaluation?.specimenCount ?? loadStudyPlan()?.targetSpecimens ?? 1));
    setGroups(evaluation?.groups ?? "");
    setDifficulty(evaluation?.difficulty ?? "variada");
    setMethodOrder(evaluation?.methodOrder ?? "nao-aplicavel");
    setSpecimenEvaluations(evaluation?.specimenEvaluations ?? {});
    setSaved(Boolean(evaluation));
  }, [currentEvaluationId]);

  const studyPlan = loadStudyPlan();
  const partialAt = studyPlan?.partialAt ?? 1;
  const finalEvaluationReady = Boolean(
    studyPlan?.methodsCompleted?.investigacao &&
    studyPlan?.methodsCompleted?.["chave-dicotomica"],
  );
  if (!currentEvaluationId || !stageComplete || (!evaluationId && (investigation?.observations?.length ?? 0) < partialAt)) return null;

  function setAnswer(questionId, value) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
    setSaved(false);
  }

  function save() {
    const evaluation = {
      version: 1,
      investigationId: currentEvaluationId,
      protocolId: protocolId ?? selectedProtocol?.id ?? null,
      method,
      methodLabel,
      specimenCode: specimenCode || investigation?.specimenCode || "",
      participantCode: participantCode.trim() || "anonimo",
      specimenCount: Math.min(100, Math.max(1, Number(specimenCount) || 1)),
      groups: groups.trim(),
      difficulty,
      methodOrder,
      specimenEvaluations,
      observationCount: investigation?.observations?.length ?? "",
      conclusionStatus: investigation?.conclusion?.status ?? "",
      leadingHypothesis: investigation?.hypotheses?.[0]?.id ?? "",
      answers,
      comment: comment.trim(),
      eventLog: eventLog ?? normalizeInvestigationEvents(investigation),
      savedAt: new Date().toISOString(),
    };
    Object.assign(evaluation, summarizeStudyEvents(evaluation.eventLog));
    setSaved(saveMethodEvaluation(currentEvaluationId, evaluation));
    if (evaluation.method) markStudyMethodCompleted(evaluation.method);
  }

  function download() {
    const evaluation = loadMethodEvaluation(currentEvaluationId);
    if (!evaluation || typeof document === "undefined") return;
    const file = new Blob([JSON.stringify(evaluation, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `avaliacao-metodo-${currentEvaluationId}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="method-evaluation-card" aria-labelledby="method-evaluation-title">
      <span className="report-label">Avaliação da experiência · {methodLabel}</span>
      <h3 id="method-evaluation-title">Reflexão sobre o método · {finalEvaluationReady ? "Avaliação final" : "Avaliação parcial"}</h3>
      <p>
        Esta reflexão ajuda a estudar como diferentes métodos apoiam a aprendizagem. Não é uma nota e não busca declarar um método melhor que outro.
      </p>
      {specimenCode ? <p className="study-instrumentation-summary"><strong>Exemplar pareado:</strong> {specimenCode} · eventos registrados: {eventLog?.length ?? 0}</p> : null}

      <div className="method-study-planning">
        <span className="report-label">Planejamento da atividade</span>
        <div className="method-study-grid">
          <label>
            <span>Código anônimo</span>
            <input value={participantCode} onChange={(event) => { setParticipantCode(event.target.value); setSaved(false); }} placeholder="Ex.: TURMA-A-03" />
          </label>
          <label>
            <span>Exemplares planejados</span>
            <input type="number" min="1" max="100" value={specimenCount} onChange={(event) => { setSpecimenCount(event.target.value); setSaved(false); }} />
          </label>
          <label>
            <span>Grupos ou táxons</span>
            <input value={groups} onChange={(event) => { setGroups(event.target.value); setSaved(false); }} placeholder="Ex.: Coleoptera e Arthropoda" />
          </label>
          <label>
            <span>Dificuldade</span>
            <select value={difficulty} onChange={(event) => { setDifficulty(event.target.value); setSaved(false); }}>
              <option value="facil">Fácil</option>
              <option value="intermediaria">Intermediária</option>
              <option value="dificil">Difícil</option>
              <option value="variada">Variada</option>
            </select>
          </label>
        </div>
        <fieldset>
          <legend>Ordem dos métodos</legend>
          <label><input type="radio" name={`${currentEvaluationId}-method-order`} value="nao-aplicavel" checked={methodOrder === "nao-aplicavel"} onChange={(event) => setMethodOrder(event.target.value)} /> Não se aplica</label>
          <label><input type="radio" name={`${currentEvaluationId}-method-order`} value="investigacao-primeiro" checked={methodOrder === "investigacao-primeiro"} onChange={(event) => setMethodOrder(event.target.value)} /> Investigação primeiro</label>
          <label><input type="radio" name={`${currentEvaluationId}-method-order`} value="chave-primeiro" checked={methodOrder === "chave-primeiro"} onChange={(event) => setMethodOrder(event.target.value)} /> Chave primeiro</label>
        </fieldset>
        <div className="method-specimen-log">
          <span className="report-label">Registro por exemplar</span>
          {Array.from({ length: Math.min(100, Math.max(1, Number(specimenCount) || 1)) }, (_, index) => {
            const specimenId = String(index + 1);
            const specimen = specimenEvaluations[specimenId] ?? {};
            return (
              <div className="method-specimen-row" key={specimenId}>
                <strong>Exemplar {specimenId}</strong>
                <select
                  value={specimen.status ?? "nao-registrado"}
                  onChange={(event) => {
                    setSpecimenEvaluations((current) => ({ ...current, [specimenId]: { ...current[specimenId], status: event.target.value } }));
                    setSaved(false);
                  }}
                >
                  <option value="nao-registrado">Não registrado</option>
                  <option value="concluido">Concluído</option>
                  <option value="aberto">Permaneceu aberto</option>
                </select>
                <select
                  value={specimen.difficulty ?? difficulty}
                  onChange={(event) => {
                    setSpecimenEvaluations((current) => ({ ...current, [specimenId]: { ...current[specimenId], difficulty: event.target.value } }));
                    setSaved(false);
                  }}
                >
                  <option value="facil">Fácil</option>
                  <option value="intermediaria">Intermediária</option>
                  <option value="dificil">Difícil</option>
                </select>
              </div>
            );
          })}
        </div>
      </div>

      <div className="method-evaluation-questions">
        {methodEvaluationQuestions.map((question) => (
          <fieldset key={question.id}>
            <legend>{question.label}</legend>
            <div className="method-rating" role="radiogroup" aria-label={question.label}>
              {ratingLabels.map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name={`${currentEvaluationId}-${question.id}`}
                    value={value}
                    checked={answers[question.id] === value}
                    onChange={() => setAnswer(question.id, value)}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <label className="method-evaluation-comment">
        <span>O que ajudou ou dificultou? (opcional)</span>
        <textarea
          rows="3"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
            setSaved(false);
          }}
          placeholder="Escreva uma observação sobre sua experiência."
        />
      </label>

      <div className="method-evaluation-footer">
        <button className="primary-action-button" type="button" onClick={save}>
          Salvar reflexão
        </button>
        {saved ? (
          <button className="secondary-button" type="button" onClick={download}>
            Exportar avaliação (.json)
          </button>
        ) : null}
        {saved ? <span role="status">Reflexão salva neste dispositivo.</span> : null}
      </div>
    </section>
  );
}
