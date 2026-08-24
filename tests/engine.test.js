import test from "node:test";
import assert from "node:assert/strict";

import {
  startInvestigation,
  addObservation,
  removeObservation,
  runInvestigation,
} from "../src/engine/investigationEngine.js";
import {
  startSession,
  addSessionObservation,
  removeSessionObservation,
  runSession,
  generateSessionReport,
} from "../src/engine/sessionEngine.js";
import { calculateHypotheses } from "../src/engine/HypothesisEngine.js";
import { generateReport } from "../src/engine/reportEngine.js";

function createProtocol({
  id = "teste-protocolo",
  observations = [],
  hypotheses = [],
  rules = [],
}) {
  return {
    id,
    name: "Protocolo de teste",
    domain: "teste",
    description: "Protocolo usado para testes automatizados.",
    observations,
    hypotheses,
    rules,
  };
}

function createInvestigationWithObservations(
  protocol,
  observations
) {
  let investigation =
    startInvestigation(protocol.id);

  observations.forEach((observation) => {
    investigation =
      addObservation(
        investigation,
        observation,
        protocol
      );
  });

  return runInvestigation(
    investigation,
    protocol
  );
}

test(
  "camada de sessao encapsula protocolo e executa o fluxo completo",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "asas",
          label: "Asas",
          values: ["elitros"],
        },
      ],
      hypotheses: [
        { id: "coleoptera", name: "Coleoptera" },
      ],
      rules: [
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "elitros",
          effect: "positive",
          weight: 5,
        },
      ],
    });

    let session =
      startSession(protocol);

    session =
      addSessionObservation(
        session,
        {
          structure: "asas",
          value: "elitros",
        }
      );

    session =
      runSession(session);

    const report =
      generateSessionReport(
        session
      );

    assert.equal(
      session.investigation.protocolId,
      protocol.id
    );
    assert.equal(
      session.investigation.hypotheses[0].name,
      "Coleoptera"
    );
    assert.equal(
      report.leadingHypothesis,
      "Coleoptera"
    );
  }
);

test(
  "marca a lider como disputada e sugere observacao discriminativa",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "asas",
          label: "Asas",
          values: ["elitros"],
        },
        {
          structure: "corpo",
          label: "Corpo",
          values: ["cintura_estreita"],
        },
        {
          structure: "antena",
          label: "Antena",
          values: ["clavada", "geniculada"],
        },
      ],
      hypotheses: [
        { id: "coleoptera", name: "Coleoptera" },
        { id: "hymenoptera", name: "Hymenoptera" },
        { id: "dermaptera", name: "Dermaptera" },
      ],
      rules: [
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "elitros",
          effect: "positive",
          weight: 5,
        },
        {
          hypothesis: "coleoptera",
          structure: "corpo",
          value: "cintura_estreita",
          effect: "negative",
          weight: 2,
        },
        {
          hypothesis: "coleoptera",
          structure: "antena",
          value: "clavada",
          effect: "positive",
          weight: 3,
        },
        {
          hypothesis: "hymenoptera",
          structure: "corpo",
          value: "cintura_estreita",
          effect: "positive",
          weight: 4,
        },
        {
          hypothesis: "hymenoptera",
          structure: "asas",
          value: "elitros",
          effect: "negative",
          weight: 2,
        },
        {
          hypothesis: "hymenoptera",
          structure: "antena",
          value: "geniculada",
          effect: "positive",
          weight: 3,
        },
        {
          hypothesis: "dermaptera",
          structure: "asas",
          value: "elitros",
          effect: "positive",
          weight: 1,
        },
        {
          hypothesis: "dermaptera",
          structure: "corpo",
          value: "cintura_estreita",
          effect: "negative",
          weight: 2,
        },
      ],
    });

    const investigation =
      createInvestigationWithObservations(
        protocol,
        [
          {
            structure: "asas",
            value: "elitros",
          },
          {
            structure: "corpo",
            value: "cintura_estreita",
          },
        ]
      );

    assert.equal(
      investigation.hypotheses[0].name,
      "Coleoptera"
    );
    assert.equal(
      investigation.hypotheses[0].rank,
      1
    );
    assert.equal(
      investigation.hypotheses[0].margin,
      1
    );
    assert.equal(
      investigation.hypotheses[0].confidence.level,
      "disputada"
    );
    assert.equal(
      investigation.hypotheses[1].confidence.level,
      "inicial"
    );
    assert.deepEqual(
      investigation.suggestion,
      {
        structure: "antena",
        reason:
          "Pode diferenciar Coleoptera de Hymenoptera.",
      }
    );
    assert.deepEqual(
      investigation.conclusion,
      {
        status: "em_disputa",
        reason:
          "Existem hipóteses concorrentes relevantes.",
      }
    );
    assert.deepEqual(
      investigation.decision,
      {
        status: "continuar",
        reason:
          "A investigação permanece em disputa entre hipóteses concorrentes.",
      }
    );
  }
);

test(
  "conclui quando a lider esta bem sustentada e isolada",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "asas",
          label: "Asas",
          values: ["elitros"],
        },
        {
          structure: "antena",
          label: "Antena",
          values: ["clavada"],
        },
        {
          structure: "aparelho_bucal",
          label: "Aparelho bucal",
          values: ["mastigador"],
        },
      ],
      hypotheses: [
        { id: "coleoptera", name: "Coleoptera" },
        { id: "diptera", name: "Diptera" },
      ],
      rules: [
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "elitros",
          effect: "positive",
          weight: 5,
        },
        {
          hypothesis: "coleoptera",
          structure: "antena",
          value: "clavada",
          effect: "positive",
          weight: 3,
        },
        {
          hypothesis: "coleoptera",
          structure: "aparelho_bucal",
          value: "mastigador",
          effect: "positive",
          weight: 2,
        },
        {
          hypothesis: "diptera",
          structure: "asas",
          value: "elitros",
          effect: "negative",
          weight: 3,
        },
      ],
    });

    const investigation =
      createInvestigationWithObservations(
        protocol,
        [
          {
            structure: "asas",
            value: "elitros",
          },
          {
            structure: "antena",
            value: "clavada",
          },
          {
            structure: "aparelho_bucal",
            value: "mastigador",
          },
        ]
      );

    assert.equal(
      investigation.hypotheses[0].confidence.level,
      "bem_sustentada"
    );
    assert.deepEqual(
      investigation.conclusion,
      {
        status: "concluida",
        reason:
          "A hipótese líder apresenta sustentação robusta.",
      }
    );
    assert.deepEqual(
      investigation.decision,
      {
        status: "concluir",
        reason:
          "Existe uma hipótese claramente superior às demais.",
      }
    );
  }
);

test(
  "deduplica conflitos repetidos antes de calcular o score",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "asas",
          label: "Asas",
          values: ["elitros"],
        },
      ],
      hypotheses: [
        { id: "coleoptera", name: "Coleoptera" },
      ],
      rules: [
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "elitros",
          effect: "positive",
          weight: 5,
        },
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "elitros",
          effect: "negative",
          weight: 2,
        },
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "elitros",
          effect: "negative",
          weight: 2,
        },
      ],
    });

    const hypotheses =
      calculateHypotheses(
        [
          {
            structure: "asas",
            value: "elitros",
          },
        ],
        protocol
      );

    assert.equal(
      hypotheses[0].conflicts.length,
      1
    );
    assert.equal(
      hypotheses[0].score,
      3
    );
  }
);

test(
  "gera relatorio com disputa, decisao e hipotese concorrente",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "asas",
          label: "Asas",
          values: ["elitros"],
        },
        {
          structure: "corpo",
          label: "Corpo",
          values: ["cintura_estreita"],
        },
        {
          structure: "aparelho_bucal",
          label: "Aparelho bucal",
          values: ["mastigador"],
        },
      ],
      hypotheses: [
        { id: "coleoptera", name: "Coleoptera" },
        { id: "hymenoptera", name: "Hymenoptera" },
      ],
      rules: [
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "elitros",
          effect: "positive",
          weight: 5,
        },
        {
          hypothesis: "coleoptera",
          structure: "corpo",
          value: "cintura_estreita",
          effect: "negative",
          weight: 2,
        },
        {
          hypothesis: "coleoptera",
          structure: "aparelho_bucal",
          value: "mastigador",
          effect: "positive",
          weight: 2,
        },
        {
          hypothesis: "hymenoptera",
          structure: "corpo",
          value: "cintura_estreita",
          effect: "positive",
          weight: 4,
        },
        {
          hypothesis: "hymenoptera",
          structure: "asas",
          value: "elitros",
          effect: "negative",
          weight: 2,
        },
      ],
    });

    const investigation =
      createInvestigationWithObservations(
        protocol,
        [
          {
            structure: "asas",
            value: "elitros",
          },
          {
            structure: "corpo",
            value: "cintura_estreita",
          },
        ]
      );

    const report =
      generateReport(
        investigation
      );

    assert.equal(
      report.competingHypothesis,
      "Hymenoptera"
    );
    assert.equal(
      report.leadingMargin,
      1
    );
    assert.equal(
      report.history.length,
      investigation.history.length
    );
    assert.equal(
      report.conclusion.status,
      "em_disputa"
    );
    assert.equal(
      report.decision.status,
      "continuar"
    );
    assert.match(
      report.narrative,
      /disputa com Hymenoptera/
    );
  }
);

test(
  "atualiza observacao da mesma estrutura em vez de duplicar",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "asas",
          label: "Asas",
          values: [
            "elitros",
            "1_par_funcional",
          ],
        },
      ],
      hypotheses: [
        { id: "coleoptera", name: "Coleoptera" },
        { id: "diptera", name: "Diptera" },
      ],
      rules: [
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "elitros",
          effect: "positive",
          weight: 5,
        },
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "1_par_funcional",
          effect: "negative",
          weight: 5,
        },
        {
          hypothesis: "diptera",
          structure: "asas",
          value: "1_par_funcional",
          effect: "positive",
          weight: 5,
        },
        {
          hypothesis: "diptera",
          structure: "asas",
          value: "elitros",
          effect: "negative",
          weight: 5,
        },
      ],
    });

    let investigation =
      startInvestigation(protocol.id);

    investigation =
      addObservation(
        investigation,
        {
          structure: "asas",
          value: "elitros",
        },
        protocol
      );

    investigation =
      addObservation(
        investigation,
        {
          structure: "asas",
          value: "1_par_funcional",
        },
        protocol
      );

    investigation =
      runInvestigation(
        investigation,
        protocol
      );

    assert.equal(
      investigation.observations.length,
      1
    );
    assert.deepEqual(
      investigation.observations[0],
      {
        structure: "asas",
        value: "1_par_funcional",
      }
    );
    assert.equal(
      investigation.history[1].type,
      "observation-update"
    );
    assert.equal(
      investigation.hypotheses[0].name,
      "Diptera"
    );
  }
);

test(
  "mantem disputa em caso de empate exato entre as duas primeiras hipoteses",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "asas",
          label: "Asas",
          values: ["elitros"],
        },
        {
          structure: "antena",
          label: "Antena",
          values: ["clavada", "geniculada"],
        },
      ],
      hypotheses: [
        { id: "coleoptera", name: "Coleoptera" },
        { id: "hymenoptera", name: "Hymenoptera" },
      ],
      rules: [
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "elitros",
          effect: "positive",
          weight: 3,
        },
        {
          hypothesis: "hymenoptera",
          structure: "asas",
          value: "elitros",
          effect: "positive",
          weight: 3,
        },
        {
          hypothesis: "coleoptera",
          structure: "antena",
          value: "clavada",
          effect: "positive",
          weight: 2,
        },
        {
          hypothesis: "hymenoptera",
          structure: "antena",
          value: "geniculada",
          effect: "positive",
          weight: 2,
        },
      ],
    });

    const investigation =
      createInvestigationWithObservations(
        protocol,
        [
          {
            structure: "asas",
            value: "elitros",
          },
        ]
      );

    assert.equal(
      investigation.hypotheses[0].margin,
      0
    );
    assert.equal(
      investigation.hypotheses[0].confidence.level,
      "disputada"
    );
    assert.equal(
      investigation.conclusion.status,
      "em_disputa"
    );
    assert.deepEqual(
      investigation.suggestion,
      {
        structure: "antena",
        reason:
          "Pode diferenciar Coleoptera de Hymenoptera.",
      }
    );
  }
);

test(
  "funciona sem regras negativas e nao inventa sugestao sem suporte nas regras",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "asas",
          label: "Asas",
          values: ["elitros"],
        },
        {
          structure: "antena",
          label: "Antena",
          values: ["clavada"],
        },
      ],
      hypotheses: [
        { id: "coleoptera", name: "Coleoptera" },
      ],
      rules: [
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "elitros",
          effect: "positive",
          weight: 5,
        },
      ],
    });

    const investigation =
      createInvestigationWithObservations(
        protocol,
        [
          {
            structure: "asas",
            value: "elitros",
          },
        ]
      );

    assert.equal(
      investigation.hypotheses[0].confidence.level,
      "inicial"
    );
    assert.equal(
      investigation.conclusion.status,
      "em_andamento"
    );
    assert.equal(
      investigation.decision.status,
      "continuar"
    );
    assert.equal(
      investigation.suggestion,
      null
    );
  }
);

test(
  "retorna sugestao nula quando nao ha mais estrutura relevante a observar",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "asas",
          label: "Asas",
          values: ["elitros"],
        },
      ],
      hypotheses: [
        { id: "coleoptera", name: "Coleoptera" },
      ],
      rules: [
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "elitros",
          effect: "positive",
          weight: 5,
        },
      ],
    });

    const investigation =
      createInvestigationWithObservations(
        protocol,
        [
          {
            structure: "asas",
            value: "elitros",
          },
        ]
      );

    assert.equal(
      investigation.suggestion,
      null
    );
  }
);

test(
  "rejeita observacao com estrutura fora do protocolo",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "asas",
          label: "Asas",
          values: ["elitros"],
        },
      ],
      hypotheses: [],
      rules: [],
    });

    const investigation =
      startInvestigation(protocol.id);

    assert.throws(
      () =>
        addObservation(
          investigation,
          {
            structure: "antena",
            value: "clavada",
          },
          protocol
        ),
      /Estrutura de observacao invalida: antena\./
    );
  }
);

test(
  "rejeita observacao com valor fora das opcoes da estrutura",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "asas",
          label: "Asas",
          values: ["elitros"],
        },
      ],
      hypotheses: [],
      rules: [],
    });

    const investigation =
      startInvestigation(protocol.id);

    assert.throws(
      () =>
        addObservation(
          investigation,
          {
            structure: "asas",
            value: "reticuladas",
          },
          protocol
        ),
      /Valor de observacao invalido para asas: reticuladas\./
    );
  }
);

test(
  "aplica fator de penalidade negativa por estrutura no score",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "corpo",
          label: "Corpo",
          values: [
            "corpo_duro",
            "corpo_mole",
          ],
          negativeWeightFactor:
            0.5,
        },
      ],
      hypotheses: [
        { id: "alpha", name: "Alpha" },
        { id: "beta", name: "Beta" },
      ],
      rules: [
        {
          hypothesis: "alpha",
          structure: "corpo",
          value: "corpo_duro",
          effect: "positive",
          weight: 3,
        },
        {
          hypothesis: "beta",
          structure: "corpo",
          value: "corpo_duro",
          effect: "negative",
          weight: 2,
        },
      ],
    });

    const investigation =
      createInvestigationWithObservations(
        protocol,
        [
          {
            structure: "corpo",
            value: "corpo_duro",
          },
        ]
      );

    assert.equal(
      investigation.hypotheses[0].id,
      "alpha"
    );
    assert.equal(
      investigation.hypotheses[0].score,
      3
    );
    assert.equal(
      investigation.hypotheses[1].score,
      -1
    );
  }
);

test(
  "remove observacao registrada e recalcula a investigacao",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "asas",
          label: "Asas",
          values: ["elitros"],
        },
      ],
      hypotheses: [
        { id: "coleoptera", name: "Coleoptera" },
      ],
      rules: [
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "elitros",
          effect: "positive",
          weight: 5,
        },
      ],
    });

    const investigation =
      createInvestigationWithObservations(
        protocol,
        [
          {
            structure: "asas",
            value: "elitros",
          },
        ]
      );

    const updatedInvestigation =
      runInvestigation(
        removeObservation(
          investigation,
          "asas"
        ),
        protocol
      );

    assert.deepEqual(
      updatedInvestigation.observations,
      []
    );
    assert.equal(
      updatedInvestigation.hypotheses[0].score,
      0
    );
    assert.equal(
      updatedInvestigation.history.at(-2).type,
      "observation-remove"
    );
  }
);

test(
  "camada de sessao remove observacao para permitir nenhuma opcao ativa",
  () => {
    const protocol = createProtocol({
      observations: [
        {
          structure: "asas",
          label: "Asas",
          values: ["elitros"],
        },
      ],
      hypotheses: [
        { id: "coleoptera", name: "Coleoptera" },
      ],
      rules: [
        {
          hypothesis: "coleoptera",
          structure: "asas",
          value: "elitros",
          effect: "positive",
          weight: 5,
        },
      ],
    });

    let session =
      startSession(protocol);

    session =
      runSession(
        addSessionObservation(
          session,
          {
            structure: "asas",
            value: "elitros",
          }
        )
      );

    session =
      runSession(
        removeSessionObservation(
          session,
          "asas"
        )
      );

    assert.deepEqual(
      session.investigation.observations,
      []
    );
    assert.equal(
      session.investigation.hypotheses[0].score,
      0
    );
  }
);
