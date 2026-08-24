import test from "node:test";
import assert from "node:assert/strict";
import {
  createInvestigationSnapshot,
  parseInvestigationSnapshot,
  serializeInvestigationSnapshot,
} from "../src/utils/investigationExport.js";

const protocol = {
  id: "ordens-insecta-v1",
  name: "Ordens de Insecta",
};

const report = {
  observations: [
    { structure: "aparelho_bucal", value: "mastigador" },
    { structure: "asas", value: "franjadas" },
  ],
};

test("snapshot preserva protocolo e observações da investigação", () => {
  const snapshot = createInvestigationSnapshot(report, protocol);

  assert.equal(snapshot.format, "labsed-investigacao-session");
  assert.equal(snapshot.protocolId, protocol.id);
  assert.deepEqual(snapshot.observations, [
    ["aparelho_bucal", "mastigador"],
    ["asas", "franjadas"],
  ]);
  assert.deepEqual(
    JSON.parse(serializeInvestigationSnapshot(report, protocol)).observations,
    snapshot.observations
  );
});

test("snapshot só é importado no protocolo de origem", () => {
  const serialized = serializeInvestigationSnapshot(report, protocol);

  assert.deepEqual(
    parseInvestigationSnapshot(serialized, protocol),
    [
      ["aparelho_bucal", "mastigador"],
      ["asas", "franjadas"],
    ]
  );
  assert.throws(
    () => parseInvestigationSnapshot(serialized, { id: "outro" }),
    /outro protocolo/
  );
});
