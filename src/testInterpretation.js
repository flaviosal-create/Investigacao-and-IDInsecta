import {
  generateInterpretation,
} from "./engine/InterpretationEngine.js";

const scenarios = [
  {
    name: "DISPUTA",
    hypotheses: [
      {
        name: "Coleoptera",
        score: 3,
        margin: 1,
        confidence: {
          level: "disputada",
        },
      },
      {
        name: "Hymenoptera",
        score: 2,
      },
    ],
  },

  {
    name: "BEM SUSTENTADA",
    hypotheses: [
      {
        name: "Coleoptera",
        score: 10,
        margin: 8,
        confidence: {
          level: "bem_sustentada",
        },
      },
      {
        name: "Hymenoptera",
        score: 2,
      },
    ],
  },

  {
    name: "EM REVISÃO",
    hypotheses: [
      {
        name: "Coleoptera",
        score: -1,
        margin: 0,
        confidence: {
          level: "contraditoria",
        },
      },
    ],
  },
];

scenarios.forEach((scenario) => {
  console.log("\n=================");
  console.log(scenario.name);
  console.log("=================");

  console.log(
    generateInterpretation({
      hypotheses:
        scenario.hypotheses,
    })
  );
});