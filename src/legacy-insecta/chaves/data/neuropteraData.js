import { EXPLICACOES_NEUROPTERA as E } from "./explicacoes.js";

export const neuropteraNodes = {

  n1: {
    title: "1",
    prompt: "Qual é o formato geral das antenas?",

    a: {
      text: "Antenas terminando em clava evidente",
      next: "n2",
      explanation: E.NEUROPTERA_ANTENAS_CLAVADAS
    },

    b: {
      text: "Antenas sem clava evidente, muitas vezes filiformes",
      next: "n3",
      explanation: E.NEUROPTERA_ANTENAS_SEM_CLAVA
    },
  },

  n2: {
    title: "2(1)",
    prompt: "Compare o comprimento das antenas com a asa anterior",

    a: {
      text: "Antenas ultrapassam metade do comprimento da asa anterior",
      result: "ASCALAPHIDAE",
      explanation: E.NEUROPTERA_ANTENA_LONGA
    },

    b: {
      text: "Antenas não chegam à metade do comprimento da asa anterior",
      result: "MYRMELEONTIDAE",
      explanation: E.NEUROPTERA_ANTENA_CURTA
    },
  },

  n3: {
    title: "3(1')",
    prompt: "Como são as pernas anteriores e o pronoto?",

    a: {
      text: "Pernas anteriores adaptadas para captura e pronoto alongado",
      result: "MANTISPIDAE",
      explanation: E.NEUROPTERA_PERNAS_RAPTORIAIS
    },

    b: {
      text: "Pernas anteriores de locomoção comum e pronoto sem alongamento marcante",
      next: "n4",
      explanation: E.NEUROPTERA_PERNAS_AMBULATORIAS
    },
  },

  n4: {
    title: "4(3’)",
    prompt: "O inseto é muito pequeno e parece coberto por pó branco ou cera?",

    a: {
      text: "Inseto minúsculo, com asas esbranquiçadas ou pulverulentas e nervação alar reduzida",
      result: "CONIOPTERYGIDAE",
      explanation: E.NEUROPTERA_ASAS_PULVERULENTAS
    },

    b: {
      text: "Inseto maior, sem aspecto pulverulento branco; asas com nervação mais evidente",
      next: "n5",
      explanation: E.NEUROPTERA_SEM_ASAS_PULVERULENTAS
    },
  },

  n5: {
    title: "5(4')",
    prompt: "Observe nervuras costais e coloração do inseto",

    a: {
      text: "Asa anterior com nervuras costais transversais simples; corpo geralmente esverdeado",
      result: "CHRYSOPIDAE",
      explanation: E.NEUROPTERA_NERVURAS_SIMPLES_VERDE
    },

    b: {
      text: "Asa anterior com nervuras costais transversais bifurcadas; corpo geralmente pardacento",
      result: "HEMEROBIIDAE",
      explanation: E.NEUROPTERA_NERVURAS_BIFURCADAS_PARDO
    },
  },

};
