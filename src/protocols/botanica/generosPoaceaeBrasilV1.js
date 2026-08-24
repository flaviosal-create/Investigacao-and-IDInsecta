import { normalizeProtocol } from "../normalizeProtocol.js";

const rawGenerosPoaceaeBrasilV1 = {
  id: "generos-poaceae-brasil-v1",
  name: "Gêneros Selecionados de Poaceae",
  domain: "botanica",
  description:
    "Recorte em nível de gênero dentro de Poaceae, com gêneros relevantes no Brasil sustentados por combinações de porte, colmo, lâmina foliar, inflorescência e espigueta.",
  observations: [
    {
      structure: "porte",
      label: "Porte",
      negativeWeightFactor: 0.75,
      values: [
        "herbacea_baixa",
        "touceira_alta",
        "colmo_gigante_lenhoso",
        "planta_robusta_cultivada",
      ],
    },
    {
      structure: "colmo",
      label: "Colmo",
      negativeWeightFactor: 0.8,
      values: [
        "delgado_rasteiro",
        "ereto_com_nos_evidentes",
        "lenhoso_oco",
        "robusto_com_medula",
      ],
    },
    {
      structure: "folhas",
      label: "Folhas",
      negativeWeightFactor: 0.8,
      values: [
        "lineares_curtas",
        "lineares_largas_asperezas",
        "lanceoladas_grandes",
        "lamina_larga_com_nervura_central_marcada",
      ],
    },
    {
      structure: "inflorescencia",
      label: "Inflorescência",
      negativeWeightFactor: 0.85,
      values: [
        "racemos_digitados",
        "panicula_aberta",
        "panicula_contraida_plumosa",
        "espiguetas_em_espadice_ou_espiga_grande",
        "fasciculos_em_ramos_lenhosos",
      ],
    },
    {
      structure: "espigueta",
      label: "Espigueta",
      negativeWeightFactor: 0.85,
      values: [
        "pequena_plano_convexa",
        "multiflora_sem_arista_longa",
        "com_aristas_e_pelos",
        "feminina_e_masculina_separadas",
        "grande_em_ramos_secundarios",
      ],
    },
  ],
  hypotheses: [
    {
      id: "paspalum",
      name: "Paspalum",
      level: "genero",
      clue:
        "Ervas baixas com racemos digitados e espiguetas plano-convexas favorecem Paspalum.",
    },
    {
      id: "panicum",
      name: "Panicum",
      level: "genero",
      clue:
        "Gramíneas de panícula aberta com espiguetas pequenas e sem aristas longas sustentam Panicum.",
    },
    {
      id: "andropogon",
      name: "Andropogon",
      level: "genero",
      clue:
        "Touceiras altas com panículas plumosas e espiguetas aristadas ou pilosas favorecem Andropogon.",
    },
    {
      id: "zea",
      name: "Zea",
      level: "genero",
      clue:
        "Plantas robustas cultivadas com inflorescências masculinas e femininas separadas sustentam Zea.",
    },
    {
      id: "bambusa",
      name: "Bambusa",
      level: "genero",
      clue:
        "Colmos lenhosos gigantes, folhas grandes e ramos com fascículos favorecem Bambusa.",
    },
  ],
  rules: [
    {
      hypothesis: "paspalum",
      structure: "porte",
      value: "herbacea_baixa",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "paspalum",
      structure: "colmo",
      value: "delgado_rasteiro",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "paspalum",
      structure: "folhas",
      value: "lineares_curtas",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "paspalum",
      structure: "inflorescencia",
      value: "racemos_digitados",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "paspalum",
      structure: "espigueta",
      value: "pequena_plano_convexa",
      effect: "positive",
      weight: 7,
    },

    {
      hypothesis: "panicum",
      structure: "porte",
      value: "touceira_alta",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "panicum",
      structure: "colmo",
      value: "ereto_com_nos_evidentes",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "panicum",
      structure: "folhas",
      value: "lineares_largas_asperezas",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "panicum",
      structure: "inflorescencia",
      value: "panicula_aberta",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "panicum",
      structure: "espigueta",
      value: "multiflora_sem_arista_longa",
      effect: "positive",
      weight: 6,
    },

    {
      hypothesis: "andropogon",
      structure: "porte",
      value: "touceira_alta",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "andropogon",
      structure: "colmo",
      value: "ereto_com_nos_evidentes",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "andropogon",
      structure: "folhas",
      value: "lineares_largas_asperezas",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "andropogon",
      structure: "inflorescencia",
      value: "panicula_contraida_plumosa",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "andropogon",
      structure: "espigueta",
      value: "com_aristas_e_pelos",
      effect: "positive",
      weight: 7,
    },

    {
      hypothesis: "zea",
      structure: "porte",
      value: "planta_robusta_cultivada",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "zea",
      structure: "colmo",
      value: "robusto_com_medula",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "zea",
      structure: "folhas",
      value:
        "lamina_larga_com_nervura_central_marcada",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "zea",
      structure: "inflorescencia",
      value:
        "espiguetas_em_espadice_ou_espiga_grande",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "zea",
      structure: "espigueta",
      value: "feminina_e_masculina_separadas",
      effect: "positive",
      weight: 7,
    },

    {
      hypothesis: "bambusa",
      structure: "porte",
      value: "colmo_gigante_lenhoso",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "bambusa",
      structure: "colmo",
      value: "lenhoso_oco",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "bambusa",
      structure: "folhas",
      value: "lanceoladas_grandes",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "bambusa",
      structure: "inflorescencia",
      value: "fasciculos_em_ramos_lenhosos",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "bambusa",
      structure: "espigueta",
      value: "grande_em_ramos_secundarios",
      effect: "positive",
      weight: 6,
    },

    {
      hypothesis: "paspalum",
      structure: "colmo",
      value: "lenhoso_oco",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "paspalum",
      structure: "espigueta",
      value: "feminina_e_masculina_separadas",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "paspalum",
      structure: "inflorescencia",
      value: "panicula_contraida_plumosa",
      effect: "negative",
      weight: 4,
    },

    {
      hypothesis: "panicum",
      structure: "inflorescencia",
      value: "racemos_digitados",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "panicum",
      structure: "espigueta",
      value: "com_aristas_e_pelos",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "panicum",
      structure: "colmo",
      value: "lenhoso_oco",
      effect: "negative",
      weight: 5,
    },

    {
      hypothesis: "andropogon",
      structure: "inflorescencia",
      value: "racemos_digitados",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "andropogon",
      structure: "espigueta",
      value: "pequena_plano_convexa",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "andropogon",
      structure: "colmo",
      value: "lenhoso_oco",
      effect: "negative",
      weight: 5,
    },

    {
      hypothesis: "zea",
      structure: "colmo",
      value: "lenhoso_oco",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "zea",
      structure: "inflorescencia",
      value: "racemos_digitados",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "zea",
      structure: "espigueta",
      value: "com_aristas_e_pelos",
      effect: "negative",
      weight: 4,
    },

    {
      hypothesis: "bambusa",
      structure: "inflorescencia",
      value: "racemos_digitados",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "bambusa",
      structure: "espigueta",
      value: "feminina_e_masculina_separadas",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "bambusa",
      structure: "porte",
      value: "herbacea_baixa",
      effect: "negative",
      weight: 5,
    },
  ],
};

export const generosPoaceaeBrasilV1 =
  normalizeProtocol(
    rawGenerosPoaceaeBrasilV1
  );
