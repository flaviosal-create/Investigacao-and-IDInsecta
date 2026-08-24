import { normalizeProtocol } from "../normalizeProtocol.js";

const rawGenerosAngiospermasBrasilV1 = {
  id: "generos-angiospermas-brasil-v1",
  name: "Gêneros Selecionados de Angiospermas",
  domain: "botanica",
  description:
    "Investigação ampla em nível de gênero com angiospermas selecionadas do Brasil, baseada em combinações diagnósticas de hábito, folhas, organização reprodutiva, pista marcante e fruto ou diásporo.",
  observations: [
    {
      structure: "habito",
      label: "Hábito",
      negativeWeightFactor: 0.75,
      values: [
        "arbusto_ou_arvoreta",
        "arvore",
        "erva_ereta",
        "rosetada",
        "planta_robusta_cultivada",
        "colmo_gigante_lenhoso",
      ],
    },
    {
      structure: "folhas",
      label: "Folhas",
      negativeWeightFactor: 0.8,
      values: [
        "compostas_bipinadas",
        "compostas_pinadas_raque_alada",
        "opostas_triangulares",
        "roseta_basal",
        "lamina_larga_cereal",
        "lanceoladas_grandes",
      ],
    },
    {
      structure: "organizacao_reprodutiva",
      label: "Organização reprodutiva",
      negativeWeightFactor: 0.85,
      values: [
        "glomerulos_florais",
        "espigas_estaminosas",
        "capitulo_radiado",
        "capitulo_ligulado",
        "espiga_masculina_e_espadice_feminino",
        "fasciculos_em_ramos_lenhosos",
      ],
    },
    {
      structure: "pista_marcante",
      label: "Pista marcante",
      negativeWeightFactor: 0.85,
      values: [
        "sensitiva_ou_aculeos",
        "estames_numerosos",
        "cipsela_aristada_aderente",
        "flores_todas_liguladas",
        "sexos_separados_na_planta",
        "colmo_oco_lenhoso",
      ],
    },
    {
      structure: "fruto_ou_diasporo",
      label: "Fruto ou diásporo",
      negativeWeightFactor: 0.8,
      values: [
        "legume",
        "cipsela",
        "grao_cereal",
        "espigueta_grande",
      ],
    },
  ],
  hypotheses: [
    {
      id: "mimosa",
      name: "Mimosa",
      level: "genero",
      clue:
        "Folhas bipinadas, glomérulos florais, sensibilidade foliar ou acúleos e legume favorecem Mimosa.",
    },
    {
      id: "inga",
      name: "Inga",
      level: "genero",
      clue:
        "Árvores com folhas pinadas de ráquis alada, flores em espigas com muitos estames e fruto do tipo legume favorecem Inga.",
    },
    {
      id: "bidens",
      name: "Bidens",
      level: "genero",
      clue:
        "Folhas opostas, capítulo radiado e cipsela aristada aderente favorecem Bidens.",
    },
    {
      id: "lactuca",
      name: "Lactuca",
      level: "genero",
      clue:
        "Roseta basal, capítulo ligulado, flores todas liguladas e cipsela favorecem Lactuca.",
    },
    {
      id: "zea",
      name: "Zea",
      level: "genero",
      clue:
        "Planta robusta cultivada, lâminas largas, sexos separados na planta e grão cereal em grande espiga sustentam Zea.",
    },
    {
      id: "bambusa",
      name: "Bambusa",
      level: "genero",
      clue:
        "Colmos gigantes lenhosos, folhas grandes, fascículos em ramos lenhosos e espiguetas grandes favorecem Bambusa.",
    },
  ],
  rules: [
    {
      hypothesis: "mimosa",
      structure: "habito",
      value: "arbusto_ou_arvoreta",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "mimosa",
      structure: "folhas",
      value: "compostas_bipinadas",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "mimosa",
      structure: "organizacao_reprodutiva",
      value: "glomerulos_florais",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "mimosa",
      structure: "pista_marcante",
      value: "sensitiva_ou_aculeos",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "mimosa",
      structure: "fruto_ou_diasporo",
      value: "legume",
      effect: "positive",
      weight: 5,
    },

    {
      hypothesis: "inga",
      structure: "habito",
      value: "arvore",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "inga",
      structure: "folhas",
      value: "compostas_pinadas_raque_alada",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "inga",
      structure: "organizacao_reprodutiva",
      value: "espigas_estaminosas",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "inga",
      structure: "pista_marcante",
      value: "estames_numerosos",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "inga",
      structure: "fruto_ou_diasporo",
      value: "legume",
      effect: "positive",
      weight: 5,
    },

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
      structure: "organizacao_reprodutiva",
      value: "capitulo_radiado",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "bidens",
      structure: "pista_marcante",
      value: "cipsela_aristada_aderente",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "bidens",
      structure: "fruto_ou_diasporo",
      value: "cipsela",
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
      value: "roseta_basal",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "lactuca",
      structure: "organizacao_reprodutiva",
      value: "capitulo_ligulado",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "lactuca",
      structure: "pista_marcante",
      value: "flores_todas_liguladas",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "lactuca",
      structure: "fruto_ou_diasporo",
      value: "cipsela",
      effect: "positive",
      weight: 5,
    },

    {
      hypothesis: "zea",
      structure: "habito",
      value: "planta_robusta_cultivada",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "zea",
      structure: "folhas",
      value: "lamina_larga_cereal",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "zea",
      structure: "organizacao_reprodutiva",
      value: "espiga_masculina_e_espadice_feminino",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "zea",
      structure: "pista_marcante",
      value: "sexos_separados_na_planta",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "zea",
      structure: "fruto_ou_diasporo",
      value: "grao_cereal",
      effect: "positive",
      weight: 6,
    },

    {
      hypothesis: "bambusa",
      structure: "habito",
      value: "colmo_gigante_lenhoso",
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
      structure: "organizacao_reprodutiva",
      value: "fasciculos_em_ramos_lenhosos",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "bambusa",
      structure: "pista_marcante",
      value: "colmo_oco_lenhoso",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "bambusa",
      structure: "fruto_ou_diasporo",
      value: "espigueta_grande",
      effect: "positive",
      weight: 6,
    },

    {
      hypothesis: "mimosa",
      structure: "pista_marcante",
      value: "estames_numerosos",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "mimosa",
      structure: "fruto_ou_diasporo",
      value: "cipsela",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "mimosa",
      structure: "pista_marcante",
      value: "sexos_separados_na_planta",
      effect: "negative",
      weight: 5,
    },

    {
      hypothesis: "inga",
      structure: "folhas",
      value: "compostas_bipinadas",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "inga",
      structure: "fruto_ou_diasporo",
      value: "cipsela",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "inga",
      structure: "pista_marcante",
      value: "colmo_oco_lenhoso",
      effect: "negative",
      weight: 5,
    },

    {
      hypothesis: "bidens",
      structure: "fruto_ou_diasporo",
      value: "legume",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "bidens",
      structure: "pista_marcante",
      value: "flores_todas_liguladas",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "bidens",
      structure: "pista_marcante",
      value: "colmo_oco_lenhoso",
      effect: "negative",
      weight: 5,
    },

    {
      hypothesis: "lactuca",
      structure: "pista_marcante",
      value: "cipsela_aristada_aderente",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "lactuca",
      structure: "fruto_ou_diasporo",
      value: "legume",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "lactuca",
      structure: "pista_marcante",
      value: "colmo_oco_lenhoso",
      effect: "negative",
      weight: 5,
    },

    {
      hypothesis: "zea",
      structure: "fruto_ou_diasporo",
      value: "legume",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "zea",
      structure: "fruto_ou_diasporo",
      value: "cipsela",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "zea",
      structure: "pista_marcante",
      value: "colmo_oco_lenhoso",
      effect: "negative",
      weight: 4,
    },

    {
      hypothesis: "bambusa",
      structure: "fruto_ou_diasporo",
      value: "legume",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "bambusa",
      structure: "fruto_ou_diasporo",
      value: "cipsela",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "bambusa",
      structure: "pista_marcante",
      value: "sexos_separados_na_planta",
      effect: "negative",
      weight: 4,
    },
  ],
};

export const generosAngiospermasBrasilV1 =
  normalizeProtocol(
    rawGenerosAngiospermasBrasilV1
  );
