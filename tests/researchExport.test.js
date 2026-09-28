import test from "node:test";
import assert from "node:assert/strict";

import {
  createResearchSessionExport,
  serializeResearchSessionExport,
} from "../src/utils/researchExport.js";

const protocol = {
  id: "ordens-insecta-v1",
  name: "Ordens de Insecta",
  domain: "zoologia",
};

const report = {
  observations: [
    {
      structure: "asa_anterior",
      value: "elitros",
    },
  ],
  hypotheses: [
    {
      id: "coleoptera",
      name: "Coleoptera",
      rank: 1,
      score: 4,
      isLeader: true,
      margin: 4,
      assessment: {
        label: "Sustentação parcial",
      },
      comparison: {
        label: "Liderança provisória",
      },
      evidences: [
        {
          structure: "asa_anterior",
          value: "elitros",
        },
      ],
      conflicts: [],
    },
  ],
  decision: {
    status: "continuar",
    reason: "Ainda faltam evidências independentes.",
  },
  conclusion: {
    status: "em_andamento",
    reason: "Investigação aberta.",
  },
  leadingHypothesis: "Coleoptera",
  competingHypothesis: null,
  tiedHypotheses: [],
  history: [
    {
      type: "observation",
      structure: "asa_anterior",
      value: "elitros",
    },
  ],
};

test("exportacao de pesquisa preserva dados investigativos sem identificacao nominal", () => {
  const data = createResearchSessionExport(report, protocol);

  assert.equal(data.format, "labsed-research-session");
  assert.equal(data.privacy.containsPersonalData, false);
  assert.deepEqual(data.protocol, protocol);
  assert.deepEqual(data.observations[0], {
    index: 1,
    structure: "asa_anterior",
    value: "elitros",
  });
  assert.equal(data.hypotheses[0].name, "Coleoptera");
  assert.equal(data.hypotheses[0].evidenceCount, 1);
  assert.equal(data.hypotheses[0].conflictCount, 0);
  assert.equal(data.decision.status, "continuar");
});

test("exportacao de pesquisa e serializada como json legivel", () => {
  const serialized = serializeResearchSessionExport(report, protocol);
  const parsed = JSON.parse(serialized);

  assert.equal(parsed.protocolId, undefined);
  assert.equal(parsed.protocol.id, protocol.id);
  assert.match(serialized, /\n  "privacy": \{/);
});
