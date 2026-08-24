import { normalizeProtocol } from "../normalizeProtocol.js";

const rawGenerosFabaceaeBrasilV1 = {
  id: "generos-fabaceae-brasil-v1",
  name: "Gêneros Selecionados de Fabaceae",
  domain: "botanica",
  description:
    "Primeiro recorte em nível de gênero dentro de Fabaceae, com gêneros relevantes no Brasil e sustentados por combinações de hábito, folhas, flores, estruturas reprodutivas e fruto.",
  observations: [
    {
      structure: "habito",
      label: "Hábito",
      negativeWeightFactor: 0.75,
      values: [
        "arvore",
        "arbusto_ou_arvoreta",
        "herbacea_trepadora",
        "herbacea_prostrada",
      ],
    },
    {
      structure: "folhas",
      label: "Folhas",
      negativeWeightFactor: 0.8,
      values: [
        "bipinadas",
        "paripinadas_com_nectario",
        "pinadas_com_raque_alada",
        "trifolioladas",
        "tetrafolioladas",
      ],
    },
    {
      structure: "flor",
      label: "Flor",
      negativeWeightFactor: 0.8,
      values: [
        "actinomorfa_em_glomerulo",
        "zigomorfa_amarela",
        "actinomorfa_esbranquiçada_em_espiga",
        "papilionacea_tipica",
        "papilionacea_amarela",
      ],
    },
    {
      structure: "destaque_reprodutivo",
      label: "Destaque reprodutivo",
      negativeWeightFactor: 0.85,
      values: [
        "sensitiva_ou_aculeos",
        "heteranteria",
        "estames_numerosos",
        "voluvel",
        "geocarpia",
      ],
    },
    {
      structure: "fruto",
      label: "Fruto",
      negativeWeightFactor: 0.8,
      values: [
        "craspedio_ou_segmentado",
        "legume_alongado",
        "legume_polposo_indehiscente",
        "legume_comum",
        "legume_subterraneo",
      ],
    },
  ],
  hypotheses: [
    {
      id: "mimosa",
      name: "Mimosa",
      level: "genero",
      clue:
        "Folhas bipinadas, flores em glomérulos e presença de sensibilidade foliar ou acúleos favorecem Mimosa.",
    },
    {
      id: "senna",
      name: "Senna",
      level: "genero",
      clue:
        "Folhas paripinadas com nectários, flores amarelas e heteranteria sustentam Senna.",
    },
    {
      id: "inga",
      name: "Inga",
      level: "genero",
      clue:
        "Árvores com folhas pinadas de ráquis alada, flores esbranquiçadas com muitos estames e fruto polposo favorecem Inga.",
    },
    {
      id: "phaseolus",
      name: "Phaseolus",
      level: "genero",
      clue:
        "Hábito volúvel, folhas trifolioladas e flor papilionácea típica favorecem Phaseolus.",
    },
    {
      id: "arachis",
      name: "Arachis",
      level: "genero",
      clue:
        "Hábito prostrado, folhas tetrafolioladas, flor papilionácea amarela e geocarpia sustentam Arachis.",
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
      value: "bipinadas",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "mimosa",
      structure: "flor",
      value: "actinomorfa_em_glomerulo",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "mimosa",
      structure: "destaque_reprodutivo",
      value: "sensitiva_ou_aculeos",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "mimosa",
      structure: "fruto",
      value: "craspedio_ou_segmentado",
      effect: "positive",
      weight: 6,
    },

    {
      hypothesis: "senna",
      structure: "habito",
      value: "arbusto_ou_arvoreta",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "senna",
      structure: "folhas",
      value: "paripinadas_com_nectario",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "senna",
      structure: "flor",
      value: "zigomorfa_amarela",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "senna",
      structure: "destaque_reprodutivo",
      value: "heteranteria",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "senna",
      structure: "fruto",
      value: "legume_alongado",
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
      value: "pinadas_com_raque_alada",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "inga",
      structure: "flor",
      value: "actinomorfa_esbranquiçada_em_espiga",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "inga",
      structure: "destaque_reprodutivo",
      value: "estames_numerosos",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "inga",
      structure: "fruto",
      value: "legume_polposo_indehiscente",
      effect: "positive",
      weight: 7,
    },

    {
      hypothesis: "phaseolus",
      structure: "habito",
      value: "herbacea_trepadora",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "phaseolus",
      structure: "folhas",
      value: "trifolioladas",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "phaseolus",
      structure: "flor",
      value: "papilionacea_tipica",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "phaseolus",
      structure: "destaque_reprodutivo",
      value: "voluvel",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "phaseolus",
      structure: "fruto",
      value: "legume_comum",
      effect: "positive",
      weight: 5,
    },

    {
      hypothesis: "arachis",
      structure: "habito",
      value: "herbacea_prostrada",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "arachis",
      structure: "folhas",
      value: "tetrafolioladas",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "arachis",
      structure: "flor",
      value: "papilionacea_amarela",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "arachis",
      structure: "destaque_reprodutivo",
      value: "geocarpia",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "arachis",
      structure: "fruto",
      value: "legume_subterraneo",
      effect: "positive",
      weight: 7,
    },

    {
      hypothesis: "mimosa",
      structure: "folhas",
      value: "trifolioladas",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "mimosa",
      structure: "destaque_reprodutivo",
      value: "geocarpia",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "mimosa",
      structure: "fruto",
      value: "legume_polposo_indehiscente",
      effect: "negative",
      weight: 5,
    },

    {
      hypothesis: "senna",
      structure: "folhas",
      value: "bipinadas",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "senna",
      structure: "destaque_reprodutivo",
      value: "voluvel",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "senna",
      structure: "destaque_reprodutivo",
      value: "geocarpia",
      effect: "negative",
      weight: 5,
    },

    {
      hypothesis: "inga",
      structure: "folhas",
      value: "trifolioladas",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "inga",
      structure: "destaque_reprodutivo",
      value: "heteranteria",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "inga",
      structure: "destaque_reprodutivo",
      value: "geocarpia",
      effect: "negative",
      weight: 5,
    },

    {
      hypothesis: "phaseolus",
      structure: "folhas",
      value: "bipinadas",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "phaseolus",
      structure: "destaque_reprodutivo",
      value: "heteranteria",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "phaseolus",
      structure: "destaque_reprodutivo",
      value: "geocarpia",
      effect: "negative",
      weight: 5,
    },

    {
      hypothesis: "arachis",
      structure: "folhas",
      value: "trifolioladas",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "arachis",
      structure: "destaque_reprodutivo",
      value: "voluvel",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "arachis",
      structure: "flor",
      value: "actinomorfa_em_glomerulo",
      effect: "negative",
      weight: 4,
    },
  ],
};

export const generosFabaceaeBrasilV1 =
  normalizeProtocol(
    rawGenerosFabaceaeBrasilV1
  );
