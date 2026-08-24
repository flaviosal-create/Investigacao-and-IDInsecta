import test from "node:test";
import assert from "node:assert/strict";

import {
  formatInvestigationReport,
} from "../src/utils/reportExport.js";

const protocol = {
  id: "ordens-insecta-v1",
  name: "Ordens de Insecta",
};

const report = {
  generatedAt: "2026-07-22T15:30:00.000Z",
  observations: [
    {
      structure: "asas",
      value: "elitros",
    },
  ],
  leadingHypothesis: "Coleoptera",
  competingHypothesis: "Dermaptera",
  confidence: "Bem sustentada",
  conclusion: {
    reason: "A hipótese líder apresenta sustentação robusta.",
  },
  decision: {
    reason: "A investigação pode ser concluída.",
  },
  history: [
    {
      type: "observation",
      structure: "asas",
      value: "elitros",
    },
  ],
  narrative: "As evidências sustentam Coleoptera.",
};

test(
  "formata um relatório investigativo exportável",
  () => {
    const content = formatInvestigationReport(
      report,
      protocol
    );

    assert.match(content, /Protocolo: Ordens de Insecta/);
    assert.match(content, /- asas: elitros/);
    assert.match(content, /Hipótese líder: Coleoptera/);
    assert.match(content, /Percurso investigativo/);
    assert.match(content, /Observação: asas = elitros/);
    assert.match(content, /Narrativa/);
  }
);

test(
  "nao formata relatório sem protocolo ou dados",
  () => {
    assert.equal(
      formatInvestigationReport(null, protocol),
      null
    );
    assert.equal(
      formatInvestigationReport(report, null),
      null
    );
  }
);
