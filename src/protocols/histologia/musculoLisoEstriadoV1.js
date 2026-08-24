import { normalizeProtocol } from "../normalizeProtocol.js";

const rawMusculoLisoEstriadoV1 = {
  id: "musculo-liso-estriado-v1",
  name: "Aprofundamento em Músculo",
  domain: "histologia",
  description:
    "Investigação introdutória para diferenciar músculo liso e músculo estriado com base em fibras, núcleos e estriações.",
  observations: [
    {
      structure: "estriacoes",
      label: "Estriações",
      negativeWeightFactor: 0.9,
      values: [
        "presentes",
        "ausentes",
      ],
    },
    {
      structure: "forma_celular",
      label: "Forma celular",
      negativeWeightFactor: 0.8,
      values: [
        "fusiforme",
        "cilindrica",
      ],
    },
    {
      structure:
        "posicao_nuclear",
      label:
        "Posição nuclear",
      negativeWeightFactor: 0.85,
      values: [
        "central",
        "periferica",
      ],
    },
    {
      structure:
        "numero_nucleos",
      label:
        "Número de núcleos",
      negativeWeightFactor: 0.8,
      values: [
        "unico",
        "multiplos",
      ],
    },
    {
      structure:
        "organizacao_fibras",
      label:
        "Organização das fibras",
      negativeWeightFactor: 0.75,
      values: [
        "feixes_regulares",
        "camadas_irregulares",
      ],
    },
  ],
  hypotheses: [
    {
      id: "musculo_liso",
      name: "Músculo liso",
      level: "subtipo",
      clue:
        "Ausência de estriações, célula fusiforme e núcleo central único favorecem músculo liso.",
    },
    {
      id: "musculo_estriado",
      name: "Músculo estriado",
      level: "subtipo",
      clue:
        "Estriações visíveis, fibras cilíndricas e múltiplos núcleos periféricos fortalecem músculo estriado.",
    },
  ],
  rules: [
    {
      hypothesis: "musculo_liso",
      structure: "estriacoes",
      value: "ausentes",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "musculo_liso",
      structure: "forma_celular",
      value: "fusiforme",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "musculo_liso",
      structure:
        "posicao_nuclear",
      value: "central",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "musculo_liso",
      structure:
        "numero_nucleos",
      value: "unico",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "musculo_liso",
      structure:
        "organizacao_fibras",
      value:
        "camadas_irregulares",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis:
        "musculo_estriado",
      structure: "estriacoes",
      value: "presentes",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis:
        "musculo_estriado",
      structure: "forma_celular",
      value: "cilindrica",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis:
        "musculo_estriado",
      structure:
        "posicao_nuclear",
      value: "periferica",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis:
        "musculo_estriado",
      structure:
        "numero_nucleos",
      value: "multiplos",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis:
        "musculo_estriado",
      structure:
        "organizacao_fibras",
      value: "feixes_regulares",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "musculo_liso",
      structure: "estriacoes",
      value: "presentes",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "musculo_liso",
      structure: "forma_celular",
      value: "cilindrica",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "musculo_liso",
      structure:
        "posicao_nuclear",
      value: "periferica",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "musculo_liso",
      structure:
        "numero_nucleos",
      value: "multiplos",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis:
        "musculo_estriado",
      structure: "estriacoes",
      value: "ausentes",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis:
        "musculo_estriado",
      structure: "forma_celular",
      value: "fusiforme",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis:
        "musculo_estriado",
      structure:
        "posicao_nuclear",
      value: "central",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis:
        "musculo_estriado",
      structure:
        "numero_nucleos",
      value: "unico",
      effect: "negative",
      weight: 2,
    },
  ],
};

export const musculoLisoEstriadoV1 =
  normalizeProtocol(
    rawMusculoLisoEstriadoV1
  );
