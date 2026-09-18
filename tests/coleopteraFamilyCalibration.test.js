import test from "node:test";
import assert from "node:assert/strict";

import { familiasColeopteraV1 } from "../src/protocols/zoologia/familiasColeopteraV1.js";
import {
  calibrationCasesColeopteraV1,
  getCalibrationCasesForProtocol,
} from "../src/protocols/zoologia/calibrationCasesV1.js";
import { runProtocolCase } from "./helpers/runProtocolCase.js";

test("famílias de Coleoptera possuem calibração docente oficial", () => {
  assert.equal(
    getCalibrationCasesForProtocol(familiasColeopteraV1),
    calibrationCasesColeopteraV1,
  );
  assert.equal(calibrationCasesColeopteraV1.length, 6);
  assert.ok(
    calibrationCasesColeopteraV1.every(
      (scenario) => scenario.source !== "generated-baseline",
    ),
  );
});

test("casos de calibração de Coleoptera preservam conclusão e caso aberto", () => {
  calibrationCasesColeopteraV1.forEach((scenario) => {
    const investigation = runProtocolCase(
      familiasColeopteraV1,
      scenario.observations,
    );

    assert.equal(investigation.hypotheses[0].id, scenario.expectedLeader);
    assert.equal(investigation.conclusion?.status, scenario.expectedConclusion);
  });
});
