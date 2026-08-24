import { EXPLICACOES_LEPIDOPTERA as E } from "./explicacoes.js";

export const lepidopteraNodes = {

  l1: {
    title: "1",
    prompt: "Qual é o formato das antenas?",

    a: {
      text: "Antenas espessadas no meio e afiladas nas extremidades, em forma de fuso",
      figs: ["insecta_antena_fusiforme_lepidoptera"],
      result: "HESPERIIDAE",
      explanation: E.LEPIDOPTERA_ANTENAS_FUSIFORMES
    },

    b: {
      text: "Antenas com outro formato",
      figs: ["insecta_painel_antenas"],
      next: "l2",
      explanation: E.LEPIDOPTERA_ANTENAS_OUTRO_TIPO
    },
  },

  l2: {
    title: "2(1')",
    prompt: "As antenas terminam em clava?",

    a: {
      text: "Antenas com extremidade em clava, padrão comum em borboletas",
      next: "l3",
      explanation: E.LEPIDOPTERA_ANTENAS_CLAVADAS
    },

    b: {
      text: "Antenas sem clava terminal típica, padrão comum em mariposas",
      next: "l10",
      explanation: E.LEPIDOPTERA_ANTENAS_MARIPOSAS
    },
  },

  l3: {
    title: "3(2)",
    prompt: "Quantas nervuras anais há na asa posterior?",

    a: {
      text: "Asa posterior apresentando uma única nervura anal",
      result: "PAPILIONIDAE",
      explanation: E.LEPIDOPTERA_UMA_NERVURA_ANAL
    },

    b: {
      text: "Asa posterior apresentando duas nervuras anais",
      next: "l4",
      explanation: E.LEPIDOPTERA_DUAS_NERVURAS_ANAIS
    },
  },

  l4: {
    title: "4(3')",
    prompt: "Compare as pernas anteriores com as demais",

    a: {
      text: "Pernas anteriores de tamanho semelhante ao das pernas medianas e posteriores",
      result: "PIERIDAE",
      explanation: E.LEPIDOPTERA_PERNAS_NORMAIS
    },

    b: {
      text: "Pernas anteriores reduzidas, visivelmente menores que as demais",
      next: "l5",
      explanation: E.LEPIDOPTERA_PERNAS_ATROFIADAS
    },
  },

  l5: {
    title: "5(4')",
    prompt: "Há reentrância nos olhos compostos?",

    a: {
      text: "Olhos com recorte na região de origem das antenas",
      result: "LYCAENIDAE",
      explanation: E.LEPIDOPTERA_OLHOS_REENTRANCIA
    },

    b: {
      text: "Olhos sem recorte; antenas inseridas afastadas dos olhos",
      next: "l6",
      explanation: E.LEPIDOPTERA_OLHOS_SEM_REENTRANCIA
    },
  },

  l6: {
    title: "6(5')",
    prompt: "A base da antena fica bem afastada dos olhos e a asa posterior tem veia humeral curta?",

    a: {
      text: "Antenas inseridas mais afastadas dos olhos; asa posterior com costa espessada e veia humeral curta",
      result: "RIODINIDAE",
      explanation: E.LEPIDOPTERA_RIODINIDAE_HUMERAL
    },

    b: {
      text: "Antenas sem esse afastamento marcado; pernas anteriores reduzidas e padrão típico de Nymphalidae",
      result: "NYMPHALIDAE",
      goto: "LEPIDOPTERA SUB",
      explanation: E.LEPIDOPTERA_NYMPHALIDAE_PERNAS_REDUZIDAS
    },
  },

  // ======================
  // MARIPOSAS
  // ======================

  l10: {
    title: "6(2')",
    prompt: "Como Sc+R1 se relaciona com Rs na asa?",

    a: {
      text: "Sc+R1 chega muito perto de Rs ou se une a ela depois da célula discal",
      result: "PYRALIDAE",
      explanation: E.LEPIDOPTERA_SC_R1_FUNDIDA
    },

    b: {
      text: "Sc+R1 mantém outra disposição em relação a Rs",
      next: "l11",
      explanation: E.LEPIDOPTERA_SC_R1_SEPARADA
    },
  },

  l11: {
    title: "7(6')",
    prompt: "As antenas são estiliformes?",

    a: {
      text: "Antenas estreitas e alongadas, do tipo estiliforme",
      result: "SPHINGIDAE",
      explanation: E.LEPIDOPTERA_ANTENA_ESTILIFORME
    },

    b: {
      text: "Antenas com formato diferente",
      next: "l12",
      explanation: E.LEPIDOPTERA_ANTENA_VARIADA
    },
  },

  l12: {
    title: "8(7')",
    prompt: "Como está o frênulo?",

    a: {
      text: "Frênulo muito reduzido ou não visível",
      result: "SATURNIIDAE",
      explanation: E.LEPIDOPTERA_FRENULO_AUSENTE
    },

    b: {
      text: "Frênulo bem desenvolvido",
      next: "l13",
      explanation: E.LEPIDOPTERA_FRENULO_PRESENTE
    },
  },

  l13: {
    title: "9(8')",
    prompt: "A nervura Sc da asa posterior forma ângulo na base?",

    a: {
      text: "Sc com angulação evidente próxima à base",
      result: "GEOMETRIDAE",
      explanation: E.LEPIDOPTERA_SC_ANGULO_BASAL
    },

    b: {
      text: "Sc seguindo sem angulação basal evidente",
      result: "NOCTUIDAE",
      explanation: E.LEPIDOPTERA_SC_SEM_ANGULO
    },
  },

};
