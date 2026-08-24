import { EXPLICACOES_DERMAPTERA as E } from "./explicacoes.js";

export const dermapteraNodes = {

  d1: {
    title: "1",
    prompt: "O segundo tarsômero avança sobre o terceiro?",

    a: {
      text: "Segundo tarsômero ultrapassa a base do terceiro",
      next: "d2",
      explanation: E.TARSOMERO_PROLONGADO
    },

    b: {
      text: "Segundo tarsômero termina antes de ultrapassar a base do terceiro",
      next: "d3",
      explanation: E.TARSOMERO_NAO_PROLONGADO
    },
  },

  d2: {
    title: "2(1)",
    prompt: "Qual é a largura do segundo tarsômero?",

    a: {
      text: "Segundo tarsômero alargado na extremidade, mais largo que o terceiro",
      result: "FORFICULIDAE",
      explanation: E.TARSOMERO_DILATADO
    },

    b: {
      text: "Segundo tarsômero sem alargamento, com largura semelhante à do terceiro",
      result: "CHELISOCHIDAE",
      explanation: E.TARSOMERO_NAO_DILATADO
    },
  },

  d3: {
    title: "3(1')",
    prompt: "As asas anteriores curtas ou élitros estão ausentes?",

    a: {
      text: "Asas anteriores muito reduzidas ou ausentes; corpo geralmente escuro e sem tegmina visíveis",
      result: "ANISOLABIDIDAE",
      explanation: E.ASAS_REDUZIDAS_ANISOLABIDIDAE
    },

    b: {
      text: "Asas anteriores curtas presentes ou tegmina visíveis; corpo com asas anteriores reconhecíveis",
      next: "d4",
      explanation: E.TEGMINA_PRESENTES_DERMAPTERA
    },
  },

  d4: {
    title: "4(3')",
    prompt: "Quantos artículos antenais há e qual é o tamanho do corpo?",

    a: {
      text: "Antenas com menos de 20 artículos e corpo menor que 20 mm",
      result: "SPONGIPHORIDAE",
      explanation: E.ANTENAS_MENOS_20_ARTICULOS
    },

    b: {
      text: "Antenas com mais de 20 artículos e corpo entre 20 e 30 mm",
      result: "LABIDURIDAE",
      explanation: E.ANTENAS_MAIS_20_ARTICULOS
    },
  },

};
