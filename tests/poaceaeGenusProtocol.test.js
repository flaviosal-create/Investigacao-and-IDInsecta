import test from "node:test";
import assert from "node:assert/strict";

import { generosPoaceaeBrasilV1 } from "../src/protocols/botanica/generosPoaceaeBrasilV1.js";
import {
  representativeCases,
  ambiguousCases,
  mixedCases,
} from "./fixtures/poaceaeGenusCases.js";
import { runProtocolCase } from "./helpers/runProtocolCase.js";

test(
  "protocolo de generos de poaceae classifica casos representativos",
  () => {
    representativeCases.forEach(
      ({
        expected,
        observations,
      }) => {
        const investigation =
          runProtocolCase(
            generosPoaceaeBrasilV1,
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
  "protocolo de generos de poaceae mantem casos ambiguos em aberto",
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
            generosPoaceaeBrasilV1,
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
  "protocolo de generos de poaceae trata casos mistos com prudencia",
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
            generosPoaceaeBrasilV1,
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
