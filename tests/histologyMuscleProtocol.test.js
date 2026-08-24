import test from "node:test";
import assert from "node:assert/strict";

import { musculoLisoEstriadoV1 } from "../src/protocols/histologia/musculoLisoEstriadoV1.js";
import {
  muscleRepresentativeCases,
  muscleAmbiguousCases,
  muscleMixedCases,
} from "./fixtures/muscleCases.js";
import { runProtocolCase } from "./helpers/runProtocolCase.js";

test(
  "protocolo de musculo classifica casos representativos",
  () => {
    muscleRepresentativeCases.forEach(
      ({
        expected,
        observations,
      }) => {
        const investigation =
          runProtocolCase(
            musculoLisoEstriadoV1,
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
  "protocolo de musculo mantem caso ambiguo em aberto",
  () => {
    muscleAmbiguousCases.forEach(
      ({
        observations,
        expectedLeader,
        expectedRunnerUp,
        expectedDecision,
      }) => {
        const investigation =
          runProtocolCase(
            musculoLisoEstriadoV1,
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
  "protocolo de musculo trata casos mistos com prudencia",
  () => {
    muscleMixedCases.forEach(
      ({
        observations,
        expectedLeader,
        expectedConfidence,
        expectedDecision,
      }) => {
        const investigation =
          runProtocolCase(
            musculoLisoEstriadoV1,
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
