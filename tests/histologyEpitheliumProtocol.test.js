import test from "node:test";
import assert from "node:assert/strict";

import { epiteliosRevestimentoV1 } from "../src/protocols/histologia/epiteliosRevestimentoV1.js";
import {
  epitheliumRepresentativeCases,
  epitheliumAmbiguousCases,
  epitheliumMixedCases,
} from "./fixtures/epitheliumCases.js";
import { runProtocolCase } from "./helpers/runProtocolCase.js";

test(
  "protocolo de epitelios classifica casos representativos",
  () => {
    epitheliumRepresentativeCases.forEach(
      ({
        expected,
        observations,
      }) => {
        const investigation =
          runProtocolCase(
            epiteliosRevestimentoV1,
            observations
          );

        assert.equal(
          investigation.hypotheses[0].id,
          expected
        );
        assert.equal(
          investigation.conclusion
            ?.status,
          "concluida"
        );
        assert.equal(
          investigation.hypotheses[0]
            .confidence.level,
          "bem_sustentada"
        );
      }
    );
  }
);

test(
  "protocolo de epitelios mantem caso ambiguo em aberto",
  () => {
    epitheliumAmbiguousCases.forEach(
      ({
        observations,
        expectedLeader,
        expectedRunnerUp,
        expectedDecision,
      }) => {
        const investigation =
          runProtocolCase(
            epiteliosRevestimentoV1,
            observations
          );

        assert.equal(
          investigation.hypotheses[0].id,
          expectedLeader
        );
        assert.equal(
          investigation.hypotheses[1].id,
          expectedRunnerUp
        );
        assert.equal(
          investigation.decision
            ?.status,
          expectedDecision
        );
        assert.notEqual(
          investigation.conclusion
            ?.status,
          "concluida"
        );
        assert.ok(
          investigation.suggestion
            ?.structure,
          "Caso ambiguo sem sugestao util"
        );
      }
    );
  }
);

test(
  "protocolo de epitelios trata casos mistos com prudencia",
  () => {
    epitheliumMixedCases.forEach(
      ({
        observations,
        expectedLeader,
        expectedConfidence,
        expectedDecision,
      }) => {
        const investigation =
          runProtocolCase(
            epiteliosRevestimentoV1,
            observations
          );

        assert.equal(
          investigation.hypotheses[0].id,
          expectedLeader
        );
        assert.equal(
          investigation.hypotheses[0]
            .confidence.level,
          expectedConfidence
        );
        assert.equal(
          investigation.decision
            ?.status,
          expectedDecision
        );
        assert.notEqual(
          investigation.conclusion
            ?.status,
          "concluida"
        );
        assert.ok(
          investigation.suggestion
            ?.structure,
          "Caso misto sem sugestao util"
        );
      }
    );
  }
);
