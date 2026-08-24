import { EXPLICACOES_ARTROPODES as E } from "./explicacoes.js";

export const artropodesNodes = {
  a1: {
    title: "Número de patas locomotoras",
    prompt: "O organismo apresenta 3 pares (6 patas) ou 4 pares (8 patas)?",

    a: {
      text: "3 pares (6 patas)",
      result: "INSECTA",
      explanation: E.PATAS_6_VS_8,
    },

    b: {
      text: "4 pares (8 patas)",
      next: "chelicerata1",
      explanation: E.PATAS_6_VS_8,
    },
  },

  chelicerata1: {
    title: "Quelicerados",
    prompt: "Há antenas visíveis?",
    a: {
      text: "Não há antenas",
      result: "ARACHNIDA",
      explanation: E.SEM_ANTENAS,
      model3d: "/models/aranha.glb",
      has3d: true,
    },
    b: {
      text: "Há antenas",
      next: "outros1",
      explanation: E.COM_ANTENAS,
    },
  },

  outros1: {
    title: "Outros artrópodes",
    prompt: "O organismo é aquático e possui dois pares de antenas?",
    a: {
      text: "Sim",
      result: "CRUSTACEA",
      explanation: E.AQUATICO_ANTENAS,
      model3d: "/models/caranguejo.glb",
      has3d: false,
    },
    b: {
      text: "Não",
      next: "myriapoda1",
      explanation: E.NAO_AQUATICO_ANTENAS,
    },
  },

  myriapoda1: {
    title: "Miriápodes",
    prompt: "Há um par de pernas por segmento ou dois pares por segmento?",

    a: {
      text: "Um par de pernas por segmento",
      result: "CHILOPODA",
      explanation: E.UM_PAR_POR_SEGMENTO,
      model3d: "/models/chilopoda.glb",
      has3d: false,
    },

    b: {
      text: "Dois pares de pernas por segmento",
      result: "DIPLOPODA",
      explanation: E.DOIS_PARES_POR_SEGMENTO,
      model3d: "/models/diplopoda.glb",
      has3d: false,
    },
  },
};
