import test from "node:test";
import assert from "node:assert/strict";
import { ordensInsectaV1 } from "../src/protocols/zoologia/ordensInsectaV1.js";
import {
  addSessionObservation,
  runSession,
  startSession,
} from "../src/engine/sessionEngine.js";

function investigate(observations) {
  return observations.reduce(
    (session, [structure, value]) => runSession(
      addSessionObservation(session, { structure, value })
    ),
    startSession(ordensInsectaV1)
  ).investigation;
}

test("revisão do protocolo só conserva conflitos para evidências diagnósticas", () => {
  const allowed = new Set([
    "asas:1_par_funcional",
    "asas:elitros",
    "asas:franjadas",
    "asas:escamas",
    "asas:pilosas_telhado",
    "corpo:graveto_folha",
    "corpo:cercos_pinca",
  ]);

  for (const rule of ordensInsectaV1.rules) {
    if (rule.effect !== "negative") continue;
    assert.ok(
      allowed.has(`${rule.structure}:${rule.value}`),
      `contraevidência ampla removida: ${rule.hypothesis} / ${rule.structure}:${rule.value}`
    );
  }
});

test("pernas ambulatórias são neutras para Hymenoptera e demais ordens", () => {
  const investigation = investigate([["pernas", "ambulatorias"]]);
  const hymenoptera = investigation.hypotheses.find(
    (hypothesis) => hypothesis.id === "hymenoptera"
  );

  assert.equal(hymenoptera.conflicts.length, 0);
  assert.equal(hymenoptera.score, 0);
  assert.equal(hymenoptera.assessment.level, "insuficiente");
  assert.equal(
    ordensInsectaV1.rules.filter(
      (rule) => rule.structure === "pernas" && rule.effect === "negative"
    ).length,
    0
  );
});

test("características gerais não produzem conflitos automáticos", () => {
  for (const [structure, value] of [
    ["pernas", "saltatorias"],
    ["pernas", "raptatorias"],
    ["antena", "filiforme"],
    ["asas", "ausentes"],
    ["corpo", "corpo_mole"],
    ["aparelho_bucal", "mastigador"],
  ]) {
    const investigation = investigate([[structure, value]]);
    assert.equal(
      investigation.hypotheses.some(
        (hypothesis) => hypothesis.conflicts.some(
          (conflict) =>
            conflict.structure === structure && conflict.value === value
        )
      ),
      false,
      `${structure}:${value} exige comparação, não exclusão automática`
    );
  }
});

test("estruturas diagnósticas mantêm conflitos explícitos", () => {
  const investigation = investigate([["asas", "elitros"]]);
  const orthoptera = investigation.hypotheses.find(
    (hypothesis) => hypothesis.id === "orthoptera"
  );
  const coleoptera = investigation.hypotheses.find(
    (hypothesis) => hypothesis.id === "coleoptera"
  );

  assert.equal(orthoptera.conflicts[0]?.value, "elitros");
  assert.equal(coleoptera.conflicts.length, 0);
});
