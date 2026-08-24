import test from "node:test";
import assert from "node:assert/strict";

import { conjuntivoFrouxoDensoV1 } from "../src/protocols/histologia/conjuntivoFrouxoDensoV1.js";
import {
  connectiveRepresentativeCases,
  connectiveAmbiguousCases,
  connectiveMixedCases,
} from "./fixtures/connectiveCases.js";
import { runProtocolCase } from "./helpers/runProtocolCase.js";

test(
  "protocolo de conjuntivo classifica casos representativos",
  () => {
    connectiveRepresentativeCases.forEach(
      ({
        expected,
        observations,
      }) => {
        const investigation =
          runProtocolCase(
            conjuntivoFrouxoDensoV1,
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
  "protocolo de conjuntivo mantem caso ambiguo em aberto",
  () => {
    connectiveAmbiguousCases.forEach(
      ({
        observations,
        expectedLeader,
        expectedRunnerUp,
        expectedDecision,
      }) => {
        const investigation =
          runProtocolCase(
            conjuntivoFrouxoDensoV1,
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
  "protocolo de conjuntivo trata casos mistos com prudencia",
  () => {
    connectiveMixedCases.forEach(
      ({
        observations,
        expectedLeader,
        expectedConfidence,
        expectedDecision,
      }) => {
        const investigation =
          runProtocolCase(
            conjuntivoFrouxoDensoV1,
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
