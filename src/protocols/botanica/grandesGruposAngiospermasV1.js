import { normalizeProtocol } from "../normalizeProtocol.js";

const rawGrandesGruposAngiospermasV1 = {
  id: "grandes-grupos-angiospermas-v1",
  name: "Grandes Grupos de Angiospermas",
  domain: "botanica",
  description:
    "Investigação de grandes grupos de angiospermas com base em cotilédones, nervação foliar, organização floral e caracteres anatômicos gerais.",
  observations: [
    {
      structure: "cotiledones",
      label: "Cotilédones",
      negativeWeightFactor: 0.85,
      values: [
        "um",
        "dois",
        "indistinto",
      ],
    },
    {
      structure: "nervacao_foliar",
      label: "Nervação foliar",
      negativeWeightFactor: 0.8,
      values: [
        "paralela",
        "reticulada",
        "arqueada_ou_peninervia",
      ],
    },
    {
      structure: "pecas_florais",
      label: "Peças florais",
      negativeWeightFactor: 0.8,
      values: [
        "trimeras",
        "tetrameras_ou_pentameras",
        "numerosas_espiraladas",
      ],
    },
    {
      structure: "sistema_radicular",
      label: "Sistema radicular",
      negativeWeightFactor: 0.75,
      values: [
        "fasciculado",
        "pivotante",
        "pouco_diagnostico",
      ],
    },
    {
      structure: "feixes_vasculares_no_caule",
      label: "Feixes vasculares no caule",
      negativeWeightFactor: 0.85,
      values: [
        "dispersos",
        "em_anel",
      ],
    },
    {
      structure: "grao_de_polen",
      label: "Grão de pólen",
      negativeWeightFactor: 0.85,
      values: [
        "monosulcado",
        "tricolpado",
        "nao_observado",
      ],
    },
  ],
  hypotheses: [
    {
      id: "monocotiledoneas",
      name: "Monocotiledôneas",
      level: "grupo",
      clue:
        "Um cotilédone, nervação paralela, peças florais trímeras e feixes vasculares dispersos favorecem monocotiledôneas.",
    },
    {
      id: "eudicotiledoneas",
      name: "Eudicotiledôneas",
      level: "grupo",
      clue:
        "Dois cotilédones, nervação reticulada, flores tetrâmeras ou pentâmeras e pólen tricolpado sustentam eudicotiledôneas.",
    },
    {
      id: "magnoliideas",
      name: "Magnoliídeas",
      level: "grupo",
      clue:
        "Pólen monosulcado associado a flores com peças numerosas e espiraladas ou folhas de nervação arqueada favorece magnoliídeas.",
    },
  ],
  rules: [
    {
      hypothesis: "monocotiledoneas",
      structure: "cotiledones",
      value: "um",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "monocotiledoneas",
      structure: "nervacao_foliar",
      value: "paralela",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "monocotiledoneas",
      structure: "pecas_florais",
      value: "trimeras",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "monocotiledoneas",
      structure: "sistema_radicular",
      value: "fasciculado",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "monocotiledoneas",
      structure: "feixes_vasculares_no_caule",
      value: "dispersos",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "monocotiledoneas",
      structure: "grao_de_polen",
      value: "monosulcado",
      effect: "positive",
      weight: 2,
    },

    {
      hypothesis: "eudicotiledoneas",
      structure: "cotiledones",
      value: "dois",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "eudicotiledoneas",
      structure: "nervacao_foliar",
      value: "reticulada",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "eudicotiledoneas",
      structure: "pecas_florais",
      value: "tetrameras_ou_pentameras",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "eudicotiledoneas",
      structure: "sistema_radicular",
      value: "pivotante",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "eudicotiledoneas",
      structure: "feixes_vasculares_no_caule",
      value: "em_anel",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "eudicotiledoneas",
      structure: "grao_de_polen",
      value: "tricolpado",
      effect: "positive",
      weight: 7,
    },

    {
      hypothesis: "magnoliideas",
      structure: "cotiledones",
      value: "dois",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "magnoliideas",
      structure: "nervacao_foliar",
      value: "arqueada_ou_peninervia",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "magnoliideas",
      structure: "pecas_florais",
      value: "numerosas_espiraladas",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "magnoliideas",
      structure: "sistema_radicular",
      value: "pouco_diagnostico",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis: "magnoliideas",
      structure: "feixes_vasculares_no_caule",
      value: "em_anel",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "magnoliideas",
      structure: "grao_de_polen",
      value: "monosulcado",
      effect: "positive",
      weight: 7,
    },

    {
      hypothesis: "monocotiledoneas",
      structure: "cotiledones",
      value: "dois",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "monocotiledoneas",
      structure: "nervacao_foliar",
      value: "reticulada",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "monocotiledoneas",
      structure: "pecas_florais",
      value: "tetrameras_ou_pentameras",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "monocotiledoneas",
      structure: "feixes_vasculares_no_caule",
      value: "em_anel",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "monocotiledoneas",
      structure: "grao_de_polen",
      value: "tricolpado",
      effect: "negative",
      weight: 4,
    },

    {
      hypothesis: "eudicotiledoneas",
      structure: "cotiledones",
      value: "um",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "eudicotiledoneas",
      structure: "nervacao_foliar",
      value: "paralela",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "eudicotiledoneas",
      structure: "pecas_florais",
      value: "trimeras",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "eudicotiledoneas",
      structure: "grao_de_polen",
      value: "monosulcado",
      effect: "negative",
      weight: 4,
    },

    {
      hypothesis: "magnoliideas",
      structure: "cotiledones",
      value: "um",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "magnoliideas",
      structure: "nervacao_foliar",
      value: "paralela",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "magnoliideas",
      structure: "pecas_florais",
      value: "tetrameras_ou_pentameras",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "magnoliideas",
      structure: "grao_de_polen",
      value: "tricolpado",
      effect: "negative",
      weight: 5,
    },
  ],
};

export const grandesGruposAngiospermasV1 =
  normalizeProtocol(
    rawGrandesGruposAngiospermasV1
  );
