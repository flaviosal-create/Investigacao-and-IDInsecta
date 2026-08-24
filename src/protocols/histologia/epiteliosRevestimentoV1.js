import { normalizeProtocol } from "../normalizeProtocol.js";

const rawEpiteliosRevestimentoV1 = {
  id: "epitelios-revestimento-v1",
  name: "Aprofundamento em Epitélio",
  domain: "histologia",
  description:
    "Investigação introdutória para diferenciar epitélio simples e estratificado a partir de características morfológicas.",
  observations: [
    {
      structure: "numero_camadas",
      label: "Número de camadas",
      negativeWeightFactor: 0.9,
      values: [
        "unica",
        "multiplas",
      ],
    },
    {
      structure: "contato_lamina_basal",
      label: "Contato com a lâmina basal",
      negativeWeightFactor: 0.9,
      values: [
        "todas_as_celulas",
        "apenas_camada_basal",
      ],
    },
    {
      structure:
        "disposicao_nuclear",
      label:
        "Disposição nuclear",
      negativeWeightFactor: 0.8,
      values: [
        "alinhados",
        "em_niveis_diferentes",
      ],
    },
    {
      structure:
        "celulas_superficiais",
      label:
        "Células superficiais",
      negativeWeightFactor: 0.75,
      values: [
        "pavimentosas",
        "cubicas",
        "cilindricas",
      ],
    },
    {
      structure:
        "superficie_apical",
      label:
        "Superfície apical",
      negativeWeightFactor: 0.85,
      values: [
        "ciliada",
        "queratinizada",
        "sem_especializacao",
      ],
    },
  ],
  hypotheses: [
    {
      id: "epitelio_simples",
      name: "Epitélio simples",
      level: "subtipo",
      clue:
        "Uma única camada celular e contato generalizado com a lâmina basal são as pistas mais fortes.",
    },
    {
      id: "epitelio_estratificado",
      name: "Epitélio estratificado",
      level: "subtipo",
      clue:
        "Múltiplas camadas e contato basal restrito à camada profunda favorecem a hipótese de estratificação.",
    },
  ],
  rules: [
    {
      hypothesis: "epitelio_simples",
      structure: "numero_camadas",
      value: "unica",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "epitelio_simples",
      structure:
        "contato_lamina_basal",
      value: "todas_as_celulas",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "epitelio_simples",
      structure:
        "disposicao_nuclear",
      value: "alinhados",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "epitelio_simples",
      structure:
        "celulas_superficiais",
      value: "cubicas",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "epitelio_simples",
      structure:
        "celulas_superficiais",
      value: "cilindricas",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "epitelio_simples",
      structure:
        "celulas_superficiais",
      value: "pavimentosas",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis: "epitelio_simples",
      structure:
        "superficie_apical",
      value: "ciliada",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "epitelio_simples",
      structure:
        "superficie_apical",
      value: "sem_especializacao",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis:
        "epitelio_estratificado",
      structure: "numero_camadas",
      value: "multiplas",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis:
        "epitelio_estratificado",
      structure:
        "contato_lamina_basal",
      value:
        "apenas_camada_basal",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis:
        "epitelio_estratificado",
      structure:
        "disposicao_nuclear",
      value:
        "em_niveis_diferentes",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis:
        "epitelio_estratificado",
      structure:
        "celulas_superficiais",
      value: "pavimentosas",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis:
        "epitelio_estratificado",
      structure:
        "celulas_superficiais",
      value: "cubicas",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis:
        "epitelio_estratificado",
      structure:
        "celulas_superficiais",
      value: "cilindricas",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis:
        "epitelio_estratificado",
      structure:
        "superficie_apical",
      value: "queratinizada",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis:
        "epitelio_estratificado",
      structure:
        "superficie_apical",
      value: "sem_especializacao",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis: "epitelio_simples",
      structure: "numero_camadas",
      value: "multiplas",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "epitelio_simples",
      structure:
        "contato_lamina_basal",
      value:
        "apenas_camada_basal",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "epitelio_simples",
      structure:
        "disposicao_nuclear",
      value:
        "em_niveis_diferentes",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "epitelio_simples",
      structure:
        "superficie_apical",
      value: "queratinizada",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis:
        "epitelio_estratificado",
      structure: "numero_camadas",
      value: "unica",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis:
        "epitelio_estratificado",
      structure:
        "contato_lamina_basal",
      value: "todas_as_celulas",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis:
        "epitelio_estratificado",
      structure:
        "disposicao_nuclear",
      value: "alinhados",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis:
        "epitelio_estratificado",
      structure:
        "superficie_apical",
      value: "ciliada",
      effect: "negative",
      weight: 2,
    },
  ],
};

export const epiteliosRevestimentoV1 =
  normalizeProtocol(
    rawEpiteliosRevestimentoV1
  );
