import { EXPLICACOES_HYMENOPTERA as E } from "./explicacoes.js";

export const hymenopteraNodes = {

  h1: {
    title: "1",
    prompt: "Como o abdome se liga ao tórax?",

    a: {
      text: "Abdome estreitado em pecíolo ou articulado de forma livre, padrão de Apocrita",
      next: "h2",
      explanation: E.HYMENOPTERA_ABDOME_APOCRITA
    },

    b: {
      text: "Abdome preso amplamente ao tórax, sem cintura evidente, padrão de Symphyta",
      next: "h19",
      explanation: E.HYMENOPTERA_ABDOME_SYMPHYTA
    },
  },

  h2: {
    title: "2(1)",
    prompt: "O exemplar possui asas?",

    a: {
      text: "Exemplar áptero, sem asas funcionais",
      next: "h3",
      explanation: E.HYMENOPTERA_APTEROS
    },

    b: {
      text: "Exemplar alado, com asas presentes",
      next: "h4",
      explanation: E.HYMENOPTERA_ALADOS
    },
  },

  h3: {
    title: "3(2)",
    prompt: "O pecíolo tem nódulos?",

    a: {
      text: "Pecíolo abdominal com um ou dois nódulos evidentes",
      result: "FORMICIDAE",
      explanation: E.HYMENOPTERA_PECIOLO_COM_NODULOS
    },

    b: {
      text: "Pecíolo sem nódulo aparente na fêmea",
      result: "MUTILLIDAE",
      explanation: E.HYMENOPTERA_PECIOLO_SEM_NODULOS
    },
  },

  h4: {
    title: "4(2')",
    prompt: "Em indivíduos alados, o pecíolo tem nódulos?",

    a: {
      text: "Pecíolo com nódulo abdominal distinto",
      result: "FORMICIDAE",
      explanation: E.HYMENOPTERA_PECIOLO_COM_NODULOS
    },

    b: {
      text: "Pecíolo sem nódulos evidentes",
      next: "h5",
      explanation: E.HYMENOPTERA_PECIOLO_SEM_NODULOS
    },
  },

  h5: {
    title: "5(4')",
    prompt: "Quantos segmentos há nos trocanteres posteriores?",

    a: {
      text: "Trocanteres posteriores simples, com um segmento visível",
      next: "h6",
      explanation: E.HYMENOPTERA_TROCANTER_1
    },

    b: {
      text: "Trocanteres posteriores divididos em dois segmentos",
      next: "h16",
      explanation: E.HYMENOPTERA_TROCANTER_2
    },
  },

  h6: {
    title: "6(5)",
    prompt: "Há células fechadas no ápice da asa anterior?",

    a: {
      text: "Terço apical da asa anterior sem células fechadas",
      result: "SCOLIIDAE",
      explanation: E.HYMENOPTERA_SEM_CELULAS_APICAIS
    },

    b: {
      text: "Terço apical da asa anterior com células fechadas",
      next: "h7",
      explanation: E.HYMENOPTERA_COM_CELULAS_APICAIS
    },
  },

  h7: {
    title: "7(6')",
    prompt: "As pernas posteriores têm estrutura para transportar pólen?",

    a: {
      text: "Pernas posteriores com corbícula ou escopa",
      next: "h8",
      explanation: E.HYMENOPTERA_CORBICULA_ESCOPA
    },

    b: {
      text: "Pernas posteriores sem corbícula e sem escopa",
      next: "h9",
      explanation: E.HYMENOPTERA_SEM_CORBICULA
    },
  },

  h8: {
    title: "8(7)",
    prompt: "Qual estrutura de coleta de pólen está presente?",

    a: {
      text: "Corbícula presente, formando cesta de pólen",
      result: "APIDAE",
      explanation: E.HYMENOPTERA_CORBICULA
    },

    b: {
      text: "Escopa presente, formada por cerdas coletoras",
      result: "APIDAE",
      explanation: E.HYMENOPTERA_ESCOPA
    },
  },

  h9: {
    title: "9(7')",
    prompt: "O pronoto alcança a tégula?",

    a: {
      text: "Pronoto prolongado até a tégula",
      next: "h10",
      explanation: E.HYMENOPTERA_PRONOTO_LONGO
    },

    b: {
      text: "Pronoto terminando antes da tégula",
      next: "h11",
      explanation: E.HYMENOPTERA_PRONOTO_CURTO
    },
  },

  h10: {
    title: "10(9)",
    prompt: "Olhos e mesopleura apontam para qual opção?",

    a: {
      text: "Olhos com ou sem reentrância, mas sulco mesopleural presente",
      result: "POMPILIDAE",
      explanation: E.HYMENOPTERA_SULCO_MESOPLEURAL_PRESENTE
    },

    b: {
      text: "Olhos reentrantes e sulco mesopleural ausente",
      result: "VESPIDAE",
      explanation: E.HYMENOPTERA_SULCO_MESOPLEURAL_AUSENTE
    },
  },

  h11: {
    title: "11(9')",
    prompt: "Como são os pelos do corpo?",

    a: {
      text: "Pelos simples, sem ramificações",
      next: "h21",
      explanation: E.HYMENOPTERA_PELOS_SIMPLES
    },

    b: {
      text: "Cerdas corporais divididas em ramos",
      next: "h12",
      explanation: E.HYMENOPTERA_PELOS_RAMIFICADOS
    },
  },

  h12: {
    title: "12",
    prompt: "Compare o lobo jugal com o lobo anal",

    a: {
      text: "Lobo jugal menor que o lobo anal",
      result: "MEGACHILIDAE",
      explanation: E.HYMENOPTERA_LOBO_JUGAL_MENOR
    },

    b: {
      text: "Lobo jugal maior que o lobo anal",
      next: "h13",
      explanation: E.HYMENOPTERA_LOBO_JUGAL_MAIOR
    },
  },

  h13: {
    title: "13",
    prompt: "Qual é a forma da nervura basal?",

    a: {
      text: "Nervura basal curvada",
      result: "HALICTIDAE",
      explanation: E.HYMENOPTERA_NERVURA_ENCURVADA
    },

    b: {
      text: "Nervura basal oblíqua ou apenas levemente curvada",
      next: "h14",
      explanation: E.HYMENOPTERA_NERVURA_OBLIQUA
    },
  },

  h14: {
    title: "14",
    prompt: "Como termina a glossa?",

    a: {
      text: "Glossa com extremidade truncada",
      result: "COLLETIDAE",
      explanation: E.HYMENOPTERA_GLOSSA_TRUNCADA
    },

    b: {
      text: "Glossa com extremidade pontiaguda",
      next: "h15",
      explanation: E.HYMENOPTERA_GLOSSA_PONTIAGUDA
    },
  },

  h15: {
    title: "15",
    prompt: "Qual é o comprimento do flagelo?",

    a: {
      text: "Flagelo curto",
      result: "ANDRENIDAE",
      explanation: E.HYMENOPTERA_FLAGELO_CURTO
    },

    b: {
      text: "Flagelo longo",
      result: "OXAEIDAE",
      explanation: E.HYMENOPTERA_FLAGELO_LONGO
    },
  },

  h16: {
    title: "16",
    prompt: "Onde o gáster se insere?",

    a: {
      text: "Gáster inserido superiormente",
      result: "EVANIIDAE",
      explanation: E.HYMENOPTERA_GASTER_SUPERIOR
    },

    b: {
      text: "Gáster inserido na região posterior",
      next: "h17",
      explanation: E.HYMENOPTERA_GASTER_POSTERIOR
    },
  },

  h17: {
    title: "17",
    prompt: "Como são os fêmures?",

    a: {
      text: "Fêmures aumentados ou muito desenvolvidos",
      result: "CHALCIDIDAE",
      explanation: E.HYMENOPTERA_FEMUR_DESENVOLVIDO
    },

    b: {
      text: "Fêmures sem aumento marcante",
      next: "h22",
      explanation: E.HYMENOPTERA_FEMUR_NORMAL
    },
  },

  h18: {
    title: "18",
    prompt: "Quantas nervuras recorrentes aparecem?",

    a: {
      text: "Uma nervura recorrente",
      result: "BRACONIDAE",
      explanation: E.HYMENOPTERA_1_RECORRENTE
    },

    b: {
      text: "Duas nervuras recorrentes",
      result: "ICHNEUMONIDAE",
      explanation: E.HYMENOPTERA_2_RECORRENTES
    },
  },

  h19: {
    title: "19",
    prompt: "Há esporão visível?",

    a: {
      text: "Esporão presente",
      result: "SIRICIDAE",
      explanation: E.HYMENOPTERA_ESPORAO_PRESENTE
    },

    b: {
      text: "Esporão ausente",
      next: "h20",
      explanation: E.HYMENOPTERA_ESPORAO_AUSENTE
    },
  },

  h20: {
    title: "20",
    prompt: "Quantos artículos há nas antenas?",

    a: {
      text: "Antenas com seis artículos",
      result: "PERGIDAE",
      explanation: E.HYMENOPTERA_ANTENA_6
    },

    b: {
      text: "Antenas com mais de seis artículos",
      result: "TENTHREDINIDAE",
      explanation: E.HYMENOPTERA_ANTENA_MAIS
    },
  },

  h21: {
    title: "21(11)",
    prompt: "Formato do corpo nas vespas esfeciformes",

    a: {
      text: "Abdome muito pedunculado, dando aspecto de vespa com cintura longa",
      result: "SPHECIDAE",
      explanation: E.HYMENOPTERA_SPHECIDAE_PEDUNCULADO
    },

    b: {
      text: "Corpo mais compacto, sem pedúnculo abdominal muito alongado",
      result: "CRABRONIDAE",
      explanation: E.HYMENOPTERA_CRABRONIDAE_COMPACTO
    },
  },

  h22: {
    title: "22(17')",
    prompt: "Tamanho e venação das asas",

    a: {
      text: "Inseto pequeno, frequentemente metálico, com venação das asas muito reduzida",
      result: "EULOPHIDAE",
      explanation: E.HYMENOPTERA_EULOPHIDAE_VENACAO_REDUZIDA
    },

    b: {
      text: "Inseto maior ou com venação alar mais desenvolvida",
      next: "h18",
      explanation: E.HYMENOPTERA_VENACAO_MAIS_DESENVOLVIDA
    },
  },
};
