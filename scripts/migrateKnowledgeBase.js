import fs from "fs";

import {
  CARACTERES,
  knowledgeBase,
} from "../data/knowledgeBase.js";

// =====================================
// DIAGNÓSTICO
// =====================================

console.log("=== DIAGNÓSTICO ===");

console.log(
  "CARACTERES:",
  Array.isArray(CARACTERES)
    ? CARACTERES.length
    : "não encontrado"
);

console.log(
  "KNOWLEDGEBASE:",
  Array.isArray(knowledgeBase)
    ? knowledgeBase.length
    : "não encontrado"
);

if (
  !Array.isArray(CARACTERES) ||
  !Array.isArray(knowledgeBase)
) {
  throw new Error(
    "CARACTERES ou knowledgeBase não foram importados corretamente."
  );
}

// =====================================
// OBSERVATIONS
// =====================================

function migrateObservations() {
  return CARACTERES.map((grupo) => ({
    structure: grupo.estrutura,

    label: grupo.rotulo,

    values: grupo.opcoes.map(
      (opcao) => opcao.valor
    ),
  }));
}

// =====================================
// HYPOTHESES
// =====================================

function migrateHypotheses() {
  return knowledgeBase.map(
    (taxon) => ({
      id: taxon.id,

      name: taxon.nome,

      level: taxon.nivel,

      clue: taxon.pista || "",
    })
  );
}

// =====================================
// REGRAS POSITIVAS
// =====================================

function migratePositiveRules() {
  const rules = [];

  knowledgeBase.forEach((taxon) => {

    Object.entries(
      taxon.caracteres || {}
    ).forEach(
      ([estrutura, valores]) => {

        const peso =
          taxon.pesos?.[estrutura] || 1;

        valores.forEach((valor) => {

          rules.push({
            hypothesis:
              taxon.id,

            structure:
              estrutura,

            value:
              valor,

            effect:
              "positive",

            weight:
              peso,
          });

        });
      }
    );

  });

  return rules;
}

// =====================================
// REGRAS NEGATIVAS AUTOMÁTICAS
// =====================================

function migrateNegativeRules() {
  const rules = [];

  knowledgeBase.forEach((taxon) => {

    Object.entries(
      taxon.caracteres || {}
    ).forEach(
      ([estrutura, valores]) => {

        const peso =
          taxon.pesos?.[estrutura] || 1;

        valores.forEach((valor) => {

          knowledgeBase.forEach(
            (otherTaxon) => {

              if (
                otherTaxon.id === taxon.id
              ) {
                return;
              }

              const otherValues =
                otherTaxon.caracteres?.[
                  estrutura
                ] || [];

              if (
                !otherValues.includes(
                  valor
                )
              ) {

                rules.push({
                  hypothesis:
                    otherTaxon.id,

                  structure:
                    estrutura,

                  value:
                    valor,

                  effect:
                    "negative",

                  // conflito mais fraco
                  weight: Math.max(
                    1,
                    Math.floor(
                      peso / 2
                    )
                  ),
                });

              }
            }
          );

        });

      }
    );

  });

  return rules;
}

// =====================================
// BUILD
// =====================================

function buildProtocol() {

  const positiveRules =
    migratePositiveRules();

  const negativeRules =
    migrateNegativeRules();

  return {

    id: "ordens-insecta-v1",

    name:
      "Ordens de Insecta",

    domain:
      "zoologia",

    description:
      "Protocolo migrado automaticamente da knowledgeBase original.",

    observations:
      migrateObservations(),

    hypotheses:
      migrateHypotheses(),

    rules: [
      ...positiveRules,
      ...negativeRules,
    ],
  };
}

// =====================================
// EXECUÇÃO
// =====================================

const protocol =
  buildProtocol();

const positiveCount =
  protocol.rules.filter(
    (rule) =>
      rule.effect === "positive"
  ).length;

const negativeCount =
  protocol.rules.filter(
    (rule) =>
      rule.effect === "negative"
  ).length;

console.log("\n=== RESULTADO ===");

console.log(
  "Observations:",
  protocol.observations.length
);

console.log(
  "Hypotheses:",
  protocol.hypotheses.length
);

console.log(
  "Positive Rules:",
  positiveCount
);

console.log(
  "Negative Rules:",
  negativeCount
);

console.log(
  "Total Rules:",
  protocol.rules.length
);

// =====================================
// GERAR ARQUIVO
// =====================================

const outputDirectory =
  "./src/protocols/zoologia";

const outputFile =
  `${outputDirectory}/ordensInsectaV1.js`;

if (
  !fs.existsSync(
    outputDirectory
  )
) {
  fs.mkdirSync(
    outputDirectory,
    {
      recursive: true,
    }
  );
}

const fileContent =
`export const ordensInsectaV1 = ${JSON.stringify(
  protocol,
  null,
  2
)};
`;

fs.writeFileSync(
  outputFile,
  fileContent,
  "utf8"
);

console.log(
  "\n✅ Protocolo gerado com sucesso."
);

console.log(
  `📄 ${outputFile}`
);