import test from "node:test";
import assert from "node:assert/strict";

import { ordensAngiospermasBrasilV1 } from "../src/protocols/botanica/ordensAngiospermasBrasilV1.js";
import {
  representativeCases,
  ambiguousCases,
  mixedCases,
} from "./fixtures/angiospermOrderCases.js";
import { runProtocolCase } from "./helpers/runProtocolCase.js";

test(
  "protocolo de ordens de angiospermas classifica casos representativos",
  () => {
    representativeCases.forEach(
      ({
        expected,
        observations,
      }) => {
        const investigation =
          runProtocolCase(
            ordensAngiospermasBrasilV1,
            observations
          );

        assert.equal(
          investigation.hypotheses[0].id,
          expected
        );
        assert.equal(
          investigation.conclusion?.status,
          "concluida"
        );
      }
    );
  }
);

test(
  "protocolo de ordens de angiospermas mantem casos ambiguos em aberto",
  () => {
    ambiguousCases.forEach(
      ({
        id,
        observations,
        expectedLeader,
        expectedRunnerUp,
        expectedSuggestion,
        expectedConclusion,
        expectedDecision,
      }) => {
        const investigation =
          runProtocolCase(
            ordensAngiospermasBrasilV1,
            observations
          );

        assert.equal(
          investigation.hypotheses[0].id,
          expectedLeader,
          `Lider inesperada em ${id}`
        );
        assert.equal(
          investigation.hypotheses[1].id,
          expectedRunnerUp,
          `Vice-lider inesperada em ${id}`
        );
        assert.equal(
          investigation.suggestion?.structure,
          expectedSuggestion,
          `Sugestao inesperada em ${id}`
        );
        assert.equal(
          investigation.conclusion?.status,
          expectedConclusion,
          `Conclusao inesperada em ${id}`
        );
        assert.equal(
          investigation.decision?.status,
          expectedDecision,
          `Decisao inesperada em ${id}`
        );
      }
    );
  }
);

test(
  "protocolo de ordens de angiospermas trata casos mistos com prudencia",
  () => {
    mixedCases.forEach(
      ({
        id,
        observations,
        expectedLeader,
        expectedConfidence,
        expectedDecision,
        expectedSuggestion,
      }) => {
        const investigation =
          runProtocolCase(
            ordensAngiospermasBrasilV1,
            observations
          );

        assert.equal(
          investigation.hypotheses[0].id,
          expectedLeader,
          `Lider inesperada em ${id}`
        );
        assert.equal(
          investigation.hypotheses[0].confidence.level,
          expectedConfidence,
          `Confianca inesperada em ${id}`
        );
        assert.equal(
          investigation.decision?.status,
          expectedDecision,
          `Decisao inesperada em ${id}`
        );
        assert.equal(
          investigation.suggestion?.structure,
          expectedSuggestion,
          `Sugestao inesperada em ${id}`
        );
        assert.notEqual(
          investigation.conclusion?.status,
          "concluida",
          `Caso misto concluiu cedo demais em ${id}`
        );
      }
    );
  }
);
