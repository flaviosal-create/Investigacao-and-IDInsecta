import { EXPLICACOES_LEPIDOPTERA_SUB as E } from "./explicacoes.js";

export const lepidopteraSubNodes = {

  ls1: {
    title: "a",
    prompt: "Asas anteriores com Sc ou Cu dilatadas",

    a: {
      text: "Nervuras dilatadas na base",
      result: "SATYRINAE",
      explanation: E.SC_CU_DILATADAS
    },

    b: {
      text: "Nervuras normais",
      next: "ls1b",
      explanation: E.SC_CU_NORMAIS
    },
  },

  ls1b: {
    title: "b",
    prompt: "A asa posterior tem margem recortada ou angulosa, com aspecto de folha quando fechada?",

    a: {
      text: "Asas posteriores com margem irregular, angulosa ou com pequenas caudas; corpo robusto e aspecto de folha seca quando em repouso",
      result: "CHARAXINAE",
      explanation: E.ASA_POSTERIOR_RECORTADA_CHARAXINAE
    },

    b: {
      text: "Asas posteriores sem esse conjunto de margem recortada e aspecto foliar marcado",
      next: "ls2",
      explanation: E.ASA_POSTERIOR_SEM_RECORTE_CHARAXINAE
    },
  },

  ls2: {
    title: "c",
    prompt: "Presença da nervura 3A",

    a: {
      text: "3A curta",
      result: "DANAINAE",
      explanation: E.NERVURA_3A_CURTA
    },

    b: {
      text: "Sem 3A",
      next: "ls3",
      explanation: E.SEM_NERVURA_3A
    },
  },

  ls3: {
    title: "d",
    prompt: "Célula discal (asa anterior)",

    a: {
      text: "Célula aberta",
      result: "NYMPHALINAE",
      explanation: E.CELULA_DISCAL_ABERTA
    },

    b: {
      text: "Célula fechada ou imperfeita",
      next: "ls4",
      explanation: E.CELULA_DISCAL_FECHADA
    },
  },

  ls4: {
    title: "e",
    prompt: "Proporção da asa",

    a: {
      text: "Menos de 2x mais longa que larga",
      next: "ls5",
      explanation: E.ASA_CURTA_LARGA
    },

    b: {
      text: "Mais de 2x mais longa que larga",
      next: "ls7",
      explanation: E.ASA_LONGA_ESTREITA
    },
  },

  ls5: {
    title: "f",
    prompt: "Célula discal (anterior)",

    a: {
      text: "Imperfeitamente fechada",
      result: "NYMPHALINAE",
      explanation: E.CELULA_IMPERFEITA
    },

    b: {
      text: "Fechada",
      next: "ls6",
      explanation: E.CELULA_FECHADA
    },
  },

  ls6: {
    title: "g",
    prompt: "Célula discal (posterior)",

    a: {
      text: "Fechada",
      result: "BRASSOLINAE",
      explanation: E.CELULA_POSTERIOR_FECHADA
    },

    b: {
      text: "Aberta",
      result: "MORPHINAE",
      explanation: E.CELULA_POSTERIOR_ABERTA
    },
  },

  ls7: {
    title: "h",
    prompt: "Nervura h",

    a: {
      text: "Voltada para a base",
      result: "HELICONIINAE",
      explanation: E.NERVURA_H_BASE
    },

    b: {
      text: "Voltada para o ápice",
      result: "ACRAEINAE",
      explanation: E.NERVURA_H_APICE
    },
  },
};
