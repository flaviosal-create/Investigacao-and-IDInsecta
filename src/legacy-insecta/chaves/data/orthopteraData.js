import { EXPLICACOES_ORTHOPTERA as E } from "./explicacoes.js";

export const orthopteraNodes = {

  o1: {
    title: "1",
    prompt: "As antenas e as pernas anteriores indicam qual grupo?",

    a: {
      text: "Antenas curtas em forma de cerda, menores que o corpo",
      next: "o2",
      explanation: E.ORTHOPTERA_CAELIFERA
    },

    b: {
      text: "Antenas longas e filiformes, ou pernas anteriores adaptadas para escavar",
      next: "o6",
      explanation: E.ORTHOPTERA_ENSIFERA
    },
  },

  // ======================
  // CAELIFERA
  // ======================

  o2: {
    title: "2(1)",
    prompt: "O pronoto se prolonga sobre o abdome?",

    a: {
      text: "Pronoto curto, sem cobrir a região abdominal",
      next: "o3",
      explanation: E.ORTHOPTERA_PRONOTO_NORMAL
    },

    b: {
      text: "Pronoto alongado para trás, cobrindo parte do abdome",
      result: "TETRIGIDAE",
      explanation: E.ORTHOPTERA_PRONOTO_LONGO
    },
  },

  o3: {
    title: "3(2)",
    prompt: "Compare as antenas com os fêmures anteriores",

    a: {
      text: "Antenas menores que os fêmures anteriores",
      result: "PROSCOPIIDAE",
      explanation: E.ORTHOPTERA_ANTENA_CURTA_FEMUR
    },

    b: {
      text: "Antenas ultrapassando o comprimento dos fêmures anteriores",
      next: "o4",
      explanation: E.ORTHOPTERA_ANTENA_LONGA_FEMUR
    },
  },

  o4: {
    title: "4(3')",
    prompt: "A superfície corporal tem tubérculos?",

    a: {
      text: "Corpo com saliências ou tubérculos distribuídos pela superfície",
      result: "OMMEXECHIDAE",
      explanation: E.ORTHOPTERA_CORPO_TUBERCULOS
    },

    b: {
      text: "Corpo sem tubérculos evidentes",
      next: "o5",
      explanation: E.ORTHOPTERA_CORPO_LISO
    },
  },

  o5: {
    title: "5(4')",
    prompt: "Formato da cabeça e aspecto geral do corpo",

    a: {
      text: "Cabeça cônica ou muito projetada para frente, com corpo frequentemente estreito",
      result: "PYRGOMORPHIDAE",
      explanation: E.ORTHOPTERA_CABECA_CONICA_PYRGOMORPHIDAE
    },

    b: {
      text: "Cabeça não cônica; corpo com aspecto típico de gafanhoto",
      next: "o9",
      explanation: E.ORTHOPTERA_CABECA_NAO_CONICA
    },
  },

  o9: {
    title: "9(5')",
    prompt: "Onde fica o último espinho externo da tíbia posterior?",

    a: {
      text: "Último espinho externo separado da ponta da tíbia posterior",
      result: "ACRIDIDAE",
      explanation: E.ORTHOPTERA_ESPINHO_AFASTADO
    },

    b: {
      text: "Último espinho externo situado na própria ponta da tíbia posterior",
      result: "ROMALEIDAE",
      explanation: E.ORTHOPTERA_ESPINHO_NO_APICE
    },
  },

  // ======================
  // ENSIFERA
  // ======================

  o6: {
    title: "6(1')",
    prompt: "As pernas anteriores são escavadoras?",

    a: {
      text: "Pernas anteriores robustas e adaptadas para cavar",
      result: "GRYLLOTALPIDAE",
      explanation: E.ORTHOPTERA_PERNAS_FOSSORIAIS
    },

    b: {
      text: "Pernas anteriores sem modificação fossorial, usadas para caminhar",
      next: "o7",
      explanation: E.ORTHOPTERA_PERNAS_AMBULATORIAS
    },
  },

  o7: {
    title: "7(6')",
    prompt: "Quantos segmentos há nos tarsos?",

    a: {
      text: "Tarsos divididos em três segmentos",
      result: "GRYLLIDAE",
      explanation: E.ORTHOPTERA_TARSOS_3
    },

    b: {
      text: "Tarsos divididos em quatro segmentos",
      next: "o8",
      explanation: E.ORTHOPTERA_TARSOS_4
    },
  },

  o8: {
    title: "8(7')",
    prompt: "As asas estão presentes?",

    a: {
      text: "Inseto sem asas aparentes",
      next: "o10",
      explanation: E.ORTHOPTERA_SEM_ASAS
    },

    b: {
      text: "Asas presentes e observáveis",
      result: "TETTIGONIIDAE",
      goto: "ORTHOPTERA SUB",
      explanation: E.ORTHOPTERA_COM_ASAS
    },
  },

  o10: {
    title: "10(8)",
    prompt: "Porte e robustez do corpo",

    a: {
      text: "Inseto robusto, geralmente grande, com cabeça e mandíbulas fortes",
      result: "ANOSTOSTOMATIDAE",
      explanation: E.ORTHOPTERA_ANOSTOSTOMATIDAE_ROBUSTO
    },

    b: {
      text: "Inseto menor ou menos robusto, sem cabeça muito modificada",
      result: "STENOPELMATIDAE",
      explanation: E.ORTHOPTERA_STENOPELMATIDAE_MENOR
    },
  },

};
