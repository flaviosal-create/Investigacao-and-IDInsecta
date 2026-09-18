const EVALUATION_PREFIX = "labsed-method-evaluation:";

export const methodEvaluationQuestions = [
  { id: "clareza", label: "As instruções do método foram claras?" },
  { id: "facilidade", label: "Foi fácil realizar as etapas?" },
  { id: "confianca", label: "Você se sentiu confiante durante a atividade?" },
  { id: "observacao", label: "O método ajudou a observar características com atenção?" },
  { id: "evidencias", label: "O método ajudou a relacionar evidências e conclusões?" },
  { id: "autonomia", label: "O método favoreceu sua autonomia para decidir?" },
];

export function loadMethodEvaluation(investigationId) {
  if (typeof window === "undefined" || !investigationId) return null;
  try {
    const stored = window.localStorage.getItem(`${EVALUATION_PREFIX}${investigationId}`);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveMethodEvaluation(investigationId, evaluation) {
  if (typeof window === "undefined" || !investigationId) return false;
  try {
    window.localStorage.setItem(
      `${EVALUATION_PREFIX}${investigationId}`,
      JSON.stringify(evaluation),
    );
    return true;
  } catch {
    return false;
  }
}

export function createEvaluationRows(evaluations) {
  return evaluations.flatMap((evaluation) => {
    const base = {
      evaluationId: evaluation.investigationId ?? "",
      participantCode: evaluation.participantCode ?? "anonimo",
      method: evaluation.method ?? "",
      methodLabel: evaluation.methodLabel ?? "",
      protocolId: evaluation.protocolId ?? "",
      specimenCode: evaluation.specimenCode ?? "",
      eventCount: evaluation.eventCount ?? 0,
      errorCount: evaluation.errorCount ?? 0,
      recoveryCount: evaluation.recoveryCount ?? 0,
      specimenCount: evaluation.specimenCount ?? "",
      groups: evaluation.groups ?? "",
      difficulty: evaluation.difficulty ?? "",
      methodOrder: evaluation.methodOrder ?? "",
      observationCount: evaluation.observationCount ?? "",
      conclusionStatus: evaluation.conclusionStatus ?? "",
      leadingHypothesis: evaluation.leadingHypothesis ?? "",
      comment: evaluation.comment ?? "",
      savedAt: evaluation.savedAt ?? "",
    };
    const questionRows = methodEvaluationQuestions.map((question) => ({
      ...base,
      recordType: "question",
      questionId: question.id,
      response: evaluation.answers?.[question.id] ?? "",
      specimenId: "",
      specimenStatus: "",
      specimenDifficulty: "",
      eventLog: JSON.stringify(evaluation.eventLog ?? []),
    }));
    const specimenRows = Object.entries(evaluation.specimenEvaluations ?? {}).map(([specimenId, specimen]) => ({
      ...base,
      recordType: "specimen",
      questionId: "",
      response: "",
      specimenId,
      specimenStatus: specimen.status ?? "",
      specimenDifficulty: specimen.difficulty ?? "",
      eventLog: "",
    }));
    return [...questionRows, ...specimenRows];
  });
}

export function evaluationRowsToCsv(rows) {
  const fields = [
    "evaluationId", "participantCode", "method", "methodLabel", "protocolId",
    "specimenCount", "specimenCode", "eventCount", "errorCount", "recoveryCount", "groups", "difficulty", "methodOrder", "observationCount",
    "conclusionStatus", "leadingHypothesis", "recordType", "questionId", "response",
    "specimenId", "specimenStatus", "specimenDifficulty", "eventLog", "comment", "savedAt",
  ];
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [fields.join(","), ...rows.map((row) => fields.map((field) => escape(row[field])).join(","))].join("\n");
}
