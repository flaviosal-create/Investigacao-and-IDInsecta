import { EXPLICACOES_ISOPTERA as E } from "./explicacoes.js";

export const isopteraNodes = {

  i1: {
    title: "1",
    prompt: "A cabeça apresenta fontanela?",

    a: {
      text: "Cabeça sem fontanela visível",
      result: "KALOTERMITIDAE",
      explanation: E.ISOPTERA_FONTANELA_AUSENTE
    },

    b: {
      text: "Cabeça com fontanela visível",
      next: "i2",
      explanation: E.ISOPTERA_FONTANELA_PRESENTE
    },
  },

  i2: {
    title: "2(1')",
    prompt: "As mandíbulas do soldado são muito serrilhadas ou a asa do alado tem nervação muito reduzida?",

    a: {
      text: "Soldado com mandíbulas fortemente denteadas na margem interna, ou alado com poucas nervuras longitudinais evidentes",
      result: "SERRITERMITIDAE",
      explanation: E.ISOPTERA_MANDIBULAS_SERRILHADAS
    },

    b: {
      text: "Mandíbulas sem esse serrilhado marcado, ou alado com nervação não tão reduzida",
      next: "i3",
      explanation: E.ISOPTERA_SEM_MANDIBULAS_SERRILHADAS
    },
  },

  i3: {
    title: "3(2')",
    prompt: "No adulto alado ou no soldado, qual característica aparece?",

    a: {
      text: "Adulto alado com escama anterior curta ou soldado com pronoto projetado para frente",
      result: "TERMITIDAE",
      explanation: E.ISOPTERA_ESCAMA_CURTA_PRONOTO_PROJETADO
    },

    b: {
      text: "Adulto alado com escama anterior longa ou soldado com pronoto sem projeção para frente",
      result: "RHINOTERMITIDAE",
      explanation: E.ISOPTERA_ESCAMA_LONGA_PRONOTO_NORMAL
    },
  },

};
