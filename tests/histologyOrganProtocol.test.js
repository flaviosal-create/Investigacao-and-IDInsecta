import test from "node:test";
import assert from "node:assert/strict";

import { orgaosHistologicosV1 } from "../src/protocols/histologia/orgaosHistologicosV1.js";
import {
  organRepresentativeCases,
  organAmbiguousCases,
  organMixedCases,
  organStressCases,
  organResolutionCases,
} from "./fixtures/organCases.js";
import { runProtocolCase } from "./helpers/runProtocolCase.js";

test(
  "protocolo de orgaos classifica casos representativos",
  () => {
    organRepresentativeCases.forEach(
      ({
        expected,
        observations,
      }) => {
        const investigation =
          runProtocolCase(
            orgaosHistologicosV1,
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
  "protocolo de orgaos mantem caso ambiguo em aberto",
  () => {
    organAmbiguousCases.forEach(
      ({
        observations,
        expectedLeader,
        expectedRunnerUp,
        expectedDecision,
      }) => {
        const investigation =
          runProtocolCase(
            orgaosHistologicosV1,
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
  "protocolo de orgaos trata casos mistos com prudencia",
  () => {
    organMixedCases.forEach(
      ({
        observations,
        expectedLeader,
        expectedConfidence,
        expectedDecision,
      }) => {
        const investigation =
          runProtocolCase(
            orgaosHistologicosV1,
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

test(
  "protocolo de orgaos resiste a casos genericos e contraditorios",
  () => {
    organStressCases.forEach(
      ({
        observations,
        expectedLeader,
        expectedRunnerUp,
        expectedConfidence,
        expectedDecision,
        expectedConclusion,
      }) => {
        const investigation =
          runProtocolCase(
            orgaosHistologicosV1,
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
          investigation.hypotheses[0]
            .confidence.level,
          expectedConfidence
        );
        assert.equal(
          investigation.decision
            ?.status,
          expectedDecision
        );
        assert.equal(
          investigation.conclusion
            ?.status,
          expectedConclusion
        );
        assert.notEqual(
          investigation.conclusion
            ?.status,
          "concluida"
        );
        assert.ok(
          investigation.suggestion
            ?.structure,
          "Caso de estresse sem sugestao util"
        );
      }
    );
  }
);

test(
  "protocolo de orgaos resolve disputas quando surge evidencia discriminativa",
  () => {
    organResolutionCases.forEach(
      ({
        observations,
        expected,
      }) => {
        const investigation =
          runProtocolCase(
            orgaosHistologicosV1,
            observations
          );

        assert.equal(
          investigation.hypotheses[0].id,
          expected
        );
        assert.equal(
          investigation.decision
            ?.status,
          "concluir"
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
