import {
  startInvestigation,
  addObservation,
  runInvestigation,
} from "./engine/investigationEngine.js";
import {
  ordensInsectaV1,
} from "./protocols/zoologia/ordensInsectaV1.js";

console.log(
  "REGRAS NEGATIVAS:",
  ordensInsectaV1.rules.filter(
    r => r.effect === "negative"
  ).length
);

let investigation =
  startInvestigation(
    "ordens-insecta-v1"
  );

investigation =
  addObservation(
    investigation,
    {
      structure: "asas",
      value: "elitros",
    },
    ordensInsectaV1
  );

investigation =
  addObservation(
    investigation,
    {
      structure: "corpo",
      value: "cintura_estreita",
    },
    ordensInsectaV1
  );

investigation =
  runInvestigation(
    investigation,
    ordensInsectaV1
  );

console.log(
  JSON.stringify(
    investigation.hypotheses.slice(0, 10),
    null,
    2
  )
);
