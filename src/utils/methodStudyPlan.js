const STUDY_PLAN_KEY = "labsed-method-study-plan:v1";

export const DEFAULT_STUDY_SPECIMENS = 1;

export function normalizeStudySpecimens(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 1
    ? Math.min(100, Math.floor(number))
    : DEFAULT_STUDY_SPECIMENS;
}

export function createStudyPlan(specimenCount = DEFAULT_STUDY_SPECIMENS) {
  const targetSpecimens = normalizeStudySpecimens(specimenCount);
  return {
    version: 1,
    targetSpecimens,
    partialAt: Math.max(1, Math.ceil(targetSpecimens / 2)),
    finalAt: targetSpecimens,
    methodsCompleted: { investigacao: false, "chave-dicotomica": false },
    createdAt: new Date().toISOString(),
  };
}

export function loadStudyPlan() {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STUDY_PLAN_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveStudyPlan(plan) {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(STUDY_PLAN_KEY, JSON.stringify(plan));
    return true;
  } catch {
    return false;
  }
}

export function markStudyMethodCompleted(method) {
  const current = loadStudyPlan();
  if (!current?.methodsCompleted || !(method in current.methodsCompleted)) return current;
  const updated = {
    ...current,
    methodsCompleted: { ...current.methodsCompleted, [method]: true },
    updatedAt: new Date().toISOString(),
  };
  saveStudyPlan(updated);
  return updated;
}

export function getStudyPlanStatus(plan, observationCount = 0) {
  const current = plan ?? createStudyPlan();
  const count = Number(observationCount) || 0;
  const methodsCompleted = current.methodsCompleted ?? {};
  return {
    targetSpecimens: current.finalAt ?? DEFAULT_STUDY_SPECIMENS,
    partialReady: count >= (current.partialAt ?? 1),
    finalReady: count >= (current.finalAt ?? 1),
    bothMethodsCompleted: Boolean(methodsCompleted.investigacao && methodsCompleted["chave-dicotomica"]),
    methodsCompleted,
  };
}
