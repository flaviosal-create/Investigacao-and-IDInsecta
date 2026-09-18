import test from "node:test";
import assert from "node:assert/strict";
import {
  getSpecimenCode,
  normalizeInvestigationEvents,
  normalizeKeyEvents,
  summarizeStudyEvents,
} from "../src/utils/studyInstrumentation.js";

test("gera código pareado estável para cada exemplar", () => {
  assert.equal(getSpecimenCode(1), "EX-001");
  assert.equal(getSpecimenCode(12), "EX-012");
});

test("identifica correções de observação no histórico investigativo", () => {
  const events = normalizeInvestigationEvents({ history: [
    { type: "observation", structure: "asas", value: "presentes" },
    { type: "observation-update", structure: "asas", value: "ausentes" },
  ] });
  assert.equal(events[1].eventType, "observation-correction");
  assert.deepEqual(summarizeStudyEvents(events), { eventCount: 2, errorCount: 1, recoveryCount: 1 });
});

test("preserva decisões e resultado final da chave", () => {
  const events = normalizeKeyEvents([{ passo: "Asas", alternativa: "A", escolha: "Elitros" }], "Coleoptera");
  assert.equal(events[0].eventType, "key-decision");
  assert.equal(events[1].eventType, "terminal-result");
  assert.equal(events[1].value, "Coleoptera");
});
