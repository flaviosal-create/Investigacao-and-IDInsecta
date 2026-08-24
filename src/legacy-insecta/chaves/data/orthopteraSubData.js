import { EXPLICACOES_ORTHOPTERA_SUB as E } from "./explicacoes.js";

export const orthopteraSubNodes = {

  os1: {
    title: "a",
    prompt: "Como são os espinhos das tíbias anteriores?",

    a: {
      text: "Tíbias anteriores armadas com espinhos alongados",
      result: "LISTROSCELINAE",
      explanation: E.ORTHOPTERA_SUB_TIBIA_ESPINHOS_LONGOS
    },

    b: {
      text: "Tíbias anteriores com espinhos curtos e discretos",
      next: "os2",
      explanation: E.ORTHOPTERA_SUB_TIBIA_ESPINHOS_CURTOS
    },
  },

  os2: {
    title: "b",
    prompt: "Há espinhos no prosterno?",

    a: {
      text: "Prosterno com espinhos visíveis",
      next: "os3",
      explanation: E.ORTHOPTERA_SUB_PROESTERNAIS_PRESENTES
    },

    b: {
      text: "Prosterno sem espinhos evidentes",
      result: "PHANEROPTERINAE",
      explanation: E.ORTHOPTERA_SUB_PROESTERNAIS_AUSENTES
    },
  },

  os3: {
    title: "c",
    prompt: "Quantas suturas transversais aparecem no pronoto?",

    a: {
      text: "Pronoto atravessado por duas suturas transversais",
      next: "os3b",
      explanation: E.ORTHOPTERA_SUB_DUAS_SUTURAS
    },

    b: {
      text: "Pronoto com apenas uma sutura transversal, ou sem sutura desse tipo",
      next: "os4",
      explanation: E.ORTHOPTERA_SUB_UMA_OU_NENHUMA_SUTURA
    },
  },

  os3b: {
    title: "d",
    prompt: "Como é o aspecto geral das tégminas?",

    a: {
      text: "Tégminas muito largas, foliáceas, com contorno lembrando folha seca ou recortada",
      result: "PTEROCHROZINAE",
      explanation: E.ORTHOPTERA_SUB_TEGMINAS_FOLIACEAS_PTEROCHROZINAE
    },

    b: {
      text: "Tégminas sem esse conjunto fortemente foliáceo e recortado",
      result: "PSEUDOPHYLLINAE",
      explanation: E.ORTHOPTERA_SUB_TEGMINAS_NAO_FOLIACEAS_PSEUDOPHYLLINAE
    },
  },

  os4: {
    title: "e",
    prompt: "Até onde o fastígio avança em relação ao escapo?",

    a: {
      text: "Fastígio projetado claramente para além do escapo",
      result: "COPIPHORINAE",
      explanation: E.ORTHOPTERA_SUB_FASTIGIO_LONGO
    },

    b: {
      text: "Fastígio curto, sem ultrapassar o escapo",
      result: "CONOCEPHALINAE",
      explanation: E.ORTHOPTERA_SUB_FASTIGIO_CURTO
    },
  },

};
