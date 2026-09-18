export function getSpecimenCode(index = 1) {
  const value = Math.max(1, Number(index) || 1);
  return `EX-${String(value).padStart(3, "0")}`;
}

export function normalizeInvestigationEvents(investigation) {
  return (investigation?.history ?? []).map((event, index) => ({
    eventIndex: index + 1,
    eventType: event.type === "observation-update" ? "observation-correction" : event.type,
    structure: event.structure ?? "",
    value: event.value ?? "",
    timestamp: event.timestamp ?? "",
  }));
}

export function normalizeKeyEvents(registro = [], result = "") {
  const events = registro.map((step, index) => ({
    eventIndex: index + 1,
    eventType: "key-decision",
    structure: step.passo ?? "",
    value: step.escolha ?? step.alternativa ?? "",
    timestamp: step.timestamp ?? "",
  }));
  if (result) events.push({ eventIndex: events.length + 1, eventType: "terminal-result", structure: "", value: result, timestamp: new Date().toISOString() });
  return events;
}

export function summarizeStudyEvents(events = []) {
  return {
    eventCount: events.length,
    errorCount: events.filter((event) => event.eventType === "observation-correction").length,
    recoveryCount: events.filter((event) => event.eventType === "observation-correction").length,
  };
}
