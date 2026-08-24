import { EXPLICACOES_ODONATA as E } from "./explicacoes.js";

export const odonataNodes = {

  o1: {
    title: "1",
    prompt: "Compare os dois pares de asas",

    a: {
      text: "Asas anteriores e posteriores diferem no formato e na nervação; a base da asa posterior é mais larga (Subordem Anisoptera)",
      next: "o2",
      explanation: E.ODONATA_ANISOPTERA
    },

    b: {
      text: "Asas anteriores e posteriores parecidas entre si, inclusive na nervação e na largura da base (Subordem Zygoptera)",
      next: "o3",
      explanation: E.ODONATA_ZYGOPTERA
    },
  },

  o2: {
    title: "2(1)",
    prompt: "Como são os triângulos alares e a alça anal?",

    a: {
      text: "Triângulos alares diferentes entre os pares de asas; alça anal lembrando um pé",
      result: "LIBELLULIDAE",
      explanation: E.ODONATA_TRIANGULOS_DIFERENTES
    },

    b: {
      text: "Triângulos alares semelhantes nos dois pares de asas; alça anal pequena e separada",
      next: "o2b",
      explanation: E.ODONATA_TRIANGULOS_IGUAIS
    },
  },

  o2b: {
    title: "3(2')",
    prompt: "Os olhos compostos se tocam no topo da cabeça?",

    a: {
      text: "Olhos compostos bem separados entre si no topo da cabeça",
      result: "GOMPHIDAE",
      explanation: E.ODONATA_OLHOS_SEPARADOS_GOMPHIDAE
    },

    b: {
      text: "Olhos compostos grandes, aproximados ou se tocando no topo da cabeça",
      result: "AESHNIDAE",
      explanation: E.ODONATA_OLHOS_CONTIGUOS_AESHNIDAE
    },
  },

  o3: {
    title: "4(1')",
    prompt: "Quantas nervuras antenodais podem ser contadas?",

    a: {
      text: "Apenas duas nervuras antenodais",
      result: "COENAGRIONIDAE",
      explanation: E.ODONATA_DUAS_ANTENODAIS
    },

    b: {
      text: "Diversas nervuras antenodais",
      result: "CALOPTERYGIDAE",
      explanation: E.ODONATA_VARIAS_ANTENODAIS
    },
  },

};
