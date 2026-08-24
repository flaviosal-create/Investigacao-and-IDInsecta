import test from "node:test";
import assert from "node:assert/strict";

import { tecidosBasicosV1 } from "../src/protocols/histologia/tecidosBasicosV1.js";
import {
  histologyRepresentativeCases,
  histologyAmbiguousCases,
  histologyMixedCases,
} from "./fixtures/histologyCases.js";
import { runProtocolCase } from "./helpers/runProtocolCase.js";

test(
  "protocolo de histologia classifica casos representativos",
  () => {
    histologyRepresentativeCases.forEach(
      ({
        expected,
        observations,
      }) => {
        const investigation =
          runProtocolCase(
            tecidosBasicosV1,
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
  "protocolo de histologia mantem caso ambiguo em aberto",
  () => {
    histologyAmbiguousCases.forEach(
      ({
        observations,
        expectedLeader,
        expectedRunnerUp,
        expectedDecision,
      }) => {
        const investigation =
          runProtocolCase(
            tecidosBasicosV1,
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
  "protocolo de histologia trata casos mistos com prudencia",
  () => {
    histologyMixedCases.forEach(
      ({
        observations,
        expectedLeader,
        expectedConfidence,
        expectedDecision,
      }) => {
        const investigation =
          runProtocolCase(
            tecidosBasicosV1,
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
