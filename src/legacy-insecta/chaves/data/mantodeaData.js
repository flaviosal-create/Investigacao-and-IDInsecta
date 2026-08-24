import { EXPLICACOES_MANTODEA as E } from "./explicacoes.js";

export const mantodeaNodes = {

  m1: {
    title: "1",
    prompt: "Comprimento do protórax e desenvolvimento das pernas anteriores",

    a: {
      text: "Protórax muito alongado; pernas raptoriais bem desenvolvidas",
      next: "m2",
      explanation: E.MANTODEA_RAPTORIAL_COMPLETO
    },

    b: {
      text: "Protórax menos alongado; pernas raptoriais menos robustas",
      next: "m2",
      explanation: E.MANTODEA_SEM_RAPTORIAL
    },
  },

  m2: {
    title: "2(1')",
    prompt: "Porte geral do inseto",

    a: {
      text: "Insetos de grande porte e robustos",
      next: "m3",
      explanation: E.MANTODEA_GRANDE_ROBUSTO
    },

    b: {
      text: "Insetos pequenos ou médios",
      next: "m5",
      explanation: E.MANTODEA_PEQUENO_DELGADO
    },
  },

  m3: {
    title: "3(2)",
    prompt: "Forma do pronoto",

    a: {
      text: "Pronoto curto e largo",
      result: "MANTIDAE",
      explanation: E.MANTODEA_PRONOTO_LARGO
    },

    b: {
      text: "Pronoto estreito",
      next: "m4",
      explanation: E.MANTODEA_PRONOTO_ESTREITO
    },
  },

  m4: {
    title: "4(3')",
    prompt: "Forma geral do corpo",

    a: {
      text: "Corpo achatado e associado a troncos",
      result: "LITURGUSIDAE",
      explanation: E.MANTODEA_CORPO_DEPRIMIDO_ARBORIZADO
    },

    b: {
      text: "Corpo não fortemente achatado",
      result: "TARACHODIDAE",
      explanation: E.MANTODEA_CORPO_NORMAL
    },
  },

  m5: {
    title: "5(2')",
    prompt: "Presença de expansões foliáceas",

    a: {
      text: "Com projeções foliáceas",
      next: "m6",
      explanation: E.MANTODEA_FOLIACEO
    },

    b: {
      text: "Sem projeções foliáceas",
      next: "m7",
      explanation: E.MANTODEA_SEM_FOLIACEO
    },
  },

  m6: {
    title: "6(5)",
    prompt: "Tipo de mimetismo e projeções",

    a: {
      text: "Aspecto de folha seca ou líquen, com projeções irregulares no corpo ou nas pernas",
      result: "ACANTHOPIDAE",
      explanation: E.MANTODEA_FOLHA_SECA_ACANTHOPIDAE
    },

    b: {
      text: "Aspecto floral ou corpo muito delgado, com projeções mais regulares",
      next: "m11",
      explanation: E.MANTODEA_FLORAL_OU_DELGADO
    },
  },

  m7: {
    title: "7(5')",
    prompt: "Robustez do corpo e tegminas",

    a: {
      text: "Corpo delgado; tegminas mais leves",
      next: "m8",
      explanation: E.MANTODEA_DELGADO_TRANSPARENTE
    },

    b: {
      text: "Corpo mais robusto; tegminas coriáceas",
      next: "m9",
      explanation: E.MANTODEA_ROBUSTO_CORIACEO
    },
  },

  m8: {
    title: "8(7)",
    prompt: "Formato da cabeça e olhos",

    a: {
      text: "Cabeça larga; olhos grandes",
      result: "THESPIDAE",
      explanation: E.MANTODEA_CABECA_LARGA_OLHOS_GRANDES
    },

    b: {
      text: "Cabeça mais estreita",
      result: "MANTOIDIDAE",
      explanation: E.MANTODEA_CABECA_ESTREITA
    },
  },

  m9: {
    title: "9(7')",
    prompt: "Forma geral do corpo",

    a: {
      text: "Corpo fortemente achatado",
      result: "LITURGUSIDAE",
      explanation: E.MANTODEA_ACHATADO_TRONCO
    },

    b: {
      text: "Corpo não achatado",
      next: "m10",
      explanation: E.MANTODEA_NAO_ACHATADO
    },
  },

  m10: {
    title: "10(9')",
    prompt: "Coloração e tipo de mimetismo",

    a: {
      text: "Coloração floral ou conspícua",
      result: "HYMENOPODIDAE",
      explanation: E.MANTODEA_MIMETISMO_FLORAL
    },

    b: {
      text: "Coloração discreta",
      next: "m12",
      explanation: E.MANTODEA_COLORACAO_DISCRETA
    },
  },

  m11: {
    title: "11(6')",
    prompt: "Mimetismo conspícuo ou corpo delgado",

    a: {
      text: "Coloração floral ou desenho conspícuo, lembrando flores ou pétalas",
      result: "HYMENOPODIDAE",
      explanation: E.MANTODEA_FLORAL
    },

    b: {
      text: "Corpo muito delgado, com projeções foliares discretas no vértice, pronoto ou pernas",
      result: "EMPUSIDAE",
      explanation: E.MANTODEA_EMPUSIDAE_DELGADO
    },
  },

  m12: {
    title: "12(10')",
    prompt: "Robustez do corpo e proporção do pronoto",

    a: {
      text: "Corpo de porte médio, mais esguio, com pronoto alongado e margens laterais pouco expandidas",
      result: "PHOTINAIDAE",
      explanation: E.MANTODEA_PHOTINAIDAE_ESGUIO
    },

    b: {
      text: "Corpo mais robusto, com pronoto relativamente curto ou largo",
      result: "MANTIDAE",
      explanation: E.MANTODEA_MANTIDAE_ROBUSTO
    },
  },

};
