import test from "node:test";
import assert from "node:assert/strict";

import { ordensInsectaV1 } from "../src/protocols/zoologia/ordensInsectaV1.js";
import {
  representativeCases,
  stronglyDistinctiveCaseIds,
  ambiguousCases,
  mixedCases,
} from "./fixtures/protocolCases.js";
import { runProtocolCase } from "./helpers/runProtocolCase.js";

test(
  "protocolo real classifica casos sinteticos representativos",
  () => {
    representativeCases.forEach(
      ({
        expected,
        observations,
      }) => {
        const investigation =
          runProtocolCase(
            ordensInsectaV1,
            observations
          );

        assert.equal(
          investigation.hypotheses[0].id,
          expected,
          `Lider inesperada para ${expected}`
        );

        assert.ok(
          investigation.hypotheses[0]
            .score >
            investigation.hypotheses[1]
              .score,
          `Caso ${expected} terminou sem vantagem real`
        );
      }
    );
  }
);

test(
  "casos fortemente distintivos chegam a conclusao concluida",
  () => {
    stronglyDistinctiveCaseIds.forEach(
      (expected) => {
        const testCase =
          representativeCases.find(
            (item) =>
              item.expected ===
              expected
          );

        const investigation =
          runProtocolCase(
            ordensInsectaV1,
            testCase.observations
          );

        assert.equal(
          investigation.hypotheses[0]
            .confidence.level,
          "bem_sustentada"
        );
        assert.equal(
          investigation.conclusion
            .status,
          "concluida"
        );
      }
    );
  }
);

test(
  "casos ambiguos mantem a investigacao aberta com sugestoes uteis",
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
            ordensInsectaV1,
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
          investigation.suggestion
            ?.structure,
          expectedSuggestion,
          `Sugestao inesperada em ${id}`
        );
        assert.equal(
          investigation.conclusion
            ?.status,
          expectedConclusion,
          `Conclusao inesperada em ${id}`
        );
        assert.equal(
          investigation.decision
            ?.status,
          expectedDecision,
          `Decisao inesperada em ${id}`
        );
      }
    );
  }
);

test(
  "casos mistos de zoologia mantem lider util sem concluir cedo demais",
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
            ordensInsectaV1,
            observations
          );

        assert.equal(
          investigation.hypotheses[0].id,
          expectedLeader,
          `Lider inesperada em ${id}`
        );
        assert.equal(
          investigation.hypotheses[0]
            .confidence.level,
          expectedConfidence,
          `Confianca inesperada em ${id}`
        );
        assert.equal(
          investigation.decision
            ?.status,
          expectedDecision,
          `Decisao inesperada em ${id}`
        );
        assert.notEqual(
          investigation.conclusion
            ?.status,
          "concluida",
          `Caso misto concluiu cedo demais em ${id}`
        );
        assert.equal(
          investigation.suggestion
            ?.structure,
          expectedSuggestion,
          `Sugestao inesperada em ${id}`
        );
      }
    );
  }
);
