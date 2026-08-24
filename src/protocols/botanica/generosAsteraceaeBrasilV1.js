import { normalizeProtocol } from "../normalizeProtocol.js";

const rawGenerosAsteraceaeBrasilV1 = {
  id: "generos-asteraceae-brasil-v1",
  name: "Gêneros Selecionados de Asteraceae",
  domain: "botanica",
  description:
    "Recorte em nível de gênero dentro de Asteraceae, com gêneros relevantes no Brasil sustentados por combinações de hábito, folhas, capítulo, flores e fruto.",
  observations: [
    {
      structure: "habito",
      label: "Hábito",
      negativeWeightFactor: 0.75,
      values: [
        "erva_ereta",
        "subarbusto_arbusto",
        "trepadora",
        "rosetada",
      ],
    },
    {
      structure: "folhas",
      label: "Folhas",
      negativeWeightFactor: 0.8,
      values: [
        "opostas_triangulares",
        "alternas_recortadas",
        "lobadas_espinescentes",
        "lineares_estreitas",
        "roseta_proxima_ao_solo",
      ],
    },
    {
      structure: "capitulo",
      label: "Capítulo",
      negativeWeightFactor: 0.8,
      values: [
        "pequeno_cilindrico",
        "grande_radiado",
        "globoso_espinhoso",
        "tipo_dente_de_leao",
        "corimboso_com_muitos_capitulos",
      ],
    },
    {
      structure: "flores",
      label: "Flores do capítulo",
      negativeWeightFactor: 0.85,
      values: [
        "todas_tubulosas",
        "liguladas_e_tubulosas",
        "todas_liguladas",
        "marginais_inconspicuas",
      ],
    },
    {
      structure: "fruto",
      label: "Fruto e pápus",
      negativeWeightFactor: 0.8,
      values: [
        "cipsela_com_papo_abundante",
        "cipsela_sem_papo_evidente",
        "cipsela_com_aristas_ou_ganchos",
        "cipsela_com_papo_plumoso",
      ],
    },
  ],
  hypotheses: [
    {
      id: "bidens",
      name: "Bidens",
      level: "genero",
      clue:
        "Folhas opostas, capítulos radiados e cipselas com aristas aderentes favorecem Bidens.",
    },
    {
      id: "vernonia",
      name: "Vernonia",
      level: "genero",
      clue:
        "Subarbustos com muitos capítulos tubulosos e pápus abundante favorecem Vernonia.",
    },
    {
      id: "emilia",
      name: "Emilia",
      level: "genero",
      clue:
        "Ervas com capítulos pequenos cilíndricos, flores tubulosas e pápus abundante favorecem Emilia.",
    },
    {
      id: "lactuca",
      name: "Lactuca",
      level: "genero",
      clue:
        "Roseta basal, capítulos do tipo dente-de-leão e flores todas liguladas favorecem Lactuca.",
    },
    {
      id: "echinops",
      name: "Echinops",
      level: "genero",
      clue:
        "Capítulos globosos espinhosos com folhas recortadas e espinescentes sustentam Echinops.",
    },
  ],
  rules: [
    {
      hypothesis: "bidens",
      structure: "habito",
      value: "erva_ereta",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "bidens",
      structure: "folhas",
      value: "opostas_triangulares",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "bidens",
      structure: "capitulo",
      value: "grande_radiado",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "bidens",
      structure: "flores",
      value: "liguladas_e_tubulosas",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "bidens",
      structure: "fruto",
      value: "cipsela_com_aristas_ou_ganchos",
      effect: "positive",
      weight: 7,
    },

    {
      hypothesis: "vernonia",
      structure: "habito",
      value: "subarbusto_arbusto",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "vernonia",
      structure: "folhas",
      value: "alternas_recortadas",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "vernonia",
      structure: "capitulo",
      value: "corimboso_com_muitos_capitulos",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "vernonia",
      structure: "flores",
      value: "todas_tubulosas",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "vernonia",
      structure: "fruto",
      value: "cipsela_com_papo_abundante",
      effect: "positive",
      weight: 6,
    },

    {
      hypothesis: "emilia",
      structure: "habito",
      value: "erva_ereta",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "emilia",
      structure: "folhas",
      value: "lineares_estreitas",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "emilia",
      structure: "capitulo",
      value: "pequeno_cilindrico",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "emilia",
      structure: "flores",
      value: "todas_tubulosas",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "emilia",
      structure: "fruto",
      value: "cipsela_com_papo_abundante",
      effect: "positive",
      weight: 5,
    },

    {
      hypothesis: "lactuca",
      structure: "habito",
      value: "rosetada",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "lactuca",
      structure: "folhas",
      value: "roseta_proxima_ao_solo",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "lactuca",
      structure: "capitulo",
      value: "tipo_dente_de_leao",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "lactuca",
      structure: "flores",
      value: "todas_liguladas",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "lactuca",
      structure: "fruto",
      value: "cipsela_com_papo_plumoso",
      effect: "positive",
      weight: 6,
    },

    {
      hypothesis: "echinops",
      structure: "habito",
      value: "subarbusto_arbusto",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "echinops",
      structure: "folhas",
      value: "lobadas_espinescentes",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "echinops",
      structure: "capitulo",
      value: "globoso_espinhoso",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "echinops",
      structure: "flores",
      value: "todas_tubulosas",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "echinops",
      structure: "fruto",
      value: "cipsela_sem_papo_evidente",
      effect: "positive",
      weight: 5,
    },

    {
      hypothesis: "bidens",
      structure: "flores",
      value: "todas_liguladas",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "bidens",
      structure: "capitulo",
      value: "globoso_espinhoso",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "bidens",
      structure: "fruto",
      value: "cipsela_sem_papo_evidente",
      effect: "negative",
      weight: 4,
    },

    {
      hypothesis: "vernonia",
      structure: "flores",
      value: "todas_liguladas",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "vernonia",
      structure: "folhas",
      value: "opostas_triangulares",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "vernonia",
      structure: "capitulo",
      value: "tipo_dente_de_leao",
      effect: "negative",
      weight: 5,
    },

    {
      hypothesis: "emilia",
      structure: "capitulo",
      value: "globoso_espinhoso",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "emilia",
      structure: "flores",
      value: "todas_liguladas",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "emilia",
      structure: "fruto",
      value: "cipsela_com_aristas_ou_ganchos",
      effect: "negative",
      weight: 4,
    },

    {
      hypothesis: "lactuca",
      structure: "flores",
      value: "todas_tubulosas",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "lactuca",
      structure: "capitulo",
      value: "pequeno_cilindrico",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "lactuca",
      structure: "fruto",
      value: "cipsela_sem_papo_evidente",
      effect: "negative",
      weight: 5,
    },

    {
      hypothesis: "echinops",
      structure: "flores",
      value: "liguladas_e_tubulosas",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "echinops",
      structure: "capitulo",
      value: "tipo_dente_de_leao",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "echinops",
      structure: "fruto",
      value: "cipsela_com_papo_plumoso",
      effect: "negative",
      weight: 4,
    },
  ],
};

export const generosAsteraceaeBrasilV1 =
  normalizeProtocol(
    rawGenerosAsteraceaeBrasilV1
  );
