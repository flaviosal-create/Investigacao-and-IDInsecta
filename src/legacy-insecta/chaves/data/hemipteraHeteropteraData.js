import { EXPLICACOES_HEMIPTERA_HETEROPTERA as E } from "./explicacoes.js";

export const hemipteraHeteropteraNodes = {
  h1: {
    title: "1",
    prompt: "As antenas aparecem na vista dorsal?",
    a: {
      text: "Antenas aparentes quando o inseto é observado por cima",
      next: "h2",
      explanation: E.ANTENAS_VISIVEIS_DORSAL
    },
    b: {
      text: "Antenas ocultas ou difíceis de ver na vista dorsal",
      next: "h15",
      explanation: E.ANTENAS_NAO_VISIVEIS_DORSAL
    },
  },

  h2: {
    title: "2(1)",
    prompt: "Onde as garras se prendem ao tarso?",
    a: {
      text: "Garras posicionadas na extremidade do tarso",
      next: "h3",
      explanation: E.GARRAS_APICE_TARSO
    },
    b: {
      text: "Garras inseridas antes da ponta do tarso, ao menos nas pernas anteriores",
      next: "h14",
      explanation: E.GARRAS_ANTES_APICE
    },
  },

  h3: {
    title: "3(2)",
    prompt: "O escutelo cobre os hemiélitros?",
    a: {
      text: "Hemiélitros permanecem expostos, sem cobertura ampla do escutelo",
      next: "h4",
      explanation: E.HEMIELITROS_NAO_COBERTOS_ESCUTELO
    },
    b: {
      text: "Escutelo amplo cobrindo os hemiélitros e dando aparência de besouro",
      result: "SCUTELLERIDAE",
      explanation: E.HEMIELITROS_COBERTOS_ESCUTELO
    },
  },

  h4: {
    title: "4(3')",
    prompt: "Os hemiélitros têm aspecto reticulado?",
    a: {
      text: "Hemiélitros com padrão em rede ou rendilhado",
      result: "TINGIDAE",
      explanation: E.HEMIELITROS_RETICULADOS
    },
    b: {
      text: "Hemiélitros sem padrão reticulado evidente",
      next: "h5",
      explanation: E.HEMIELITROS_NAO_RETICULADOS
    },
  },

  h5: {
    title: "5(4')",
    prompt: "Até onde o escutelo se estende?",
    a: {
      text: "Escutelo longo, alcançando pelo menos a metade do abdome",
      next: "h6",
      explanation: E.ESCUTELO_LONGO
    },
    b: {
      text: "Escutelo curto, sem atingir a metade do abdome",
      next: "h7",
      explanation: E.ESCUTELO_CURTO
    },
  },

  h6: {
    title: "6(5)",
    prompt: "Como são as pernas anteriores?",
    a: {
      text: "Pernas anteriores para caminhar, com espinhos tibiais pequenos",
      result: "PENTATOMIDAE",
      explanation: E.PERNAS_ANTERIORES_AMBULATORIAS
    },
    b: {
      text: "Pernas anteriores escavadoras, com espinhos tibiais grandes",
      result: "CYDNIDAE",
      explanation: E.PERNAS_ANTERIORES_FOSSORIAIS
    },
  },

  h7: {
    title: "7(5')",
    prompt: "Quantos segmentos tem o rostro?",
    a: {
      text: "Rostro com três segmentos, chegando ao primeiro par de pernas, e proesterno sulcado",
      result: "REDUVIIDAE",
      explanation: E.ROSTRO_3_SEGMENTOS
    },
    b: {
      text: "Rostro com quatro segmentos, geralmente passando do primeiro par de pernas",
      next: "h8",
      explanation: E.ROSTRO_4_SEGMENTOS
    },
  },

  h8: {
    title: "8(7')",
    prompt: "Há ocelos?",
    a: {
      text: "Ocelos não visíveis",
      next: "h9",
      explanation: E.HEMIPTERA_OCELOS_AUSENTES
    },
    b: {
      text: "Ocelos presentes na cabeça",
      next: "h8b",
      explanation: E.HEMIPTERA_OCELOS_PRESENTES
    },
  },

  h8b: {
    title: "9(8')",
    prompt: "O corpo é alongado e as pernas anteriores ajudam a segurar presas?",
    a: {
      text: "Corpo alongado e relativamente macio; pernas anteriores preensoras ou usadas para capturar pequenas presas",
      result: "NABIDAE",
      explanation: E.CORPO_ALONGADO_PERNAS_PREENSORAS
    },
    b: {
      text: "Corpo sem esse conjunto predador alongado; pernas anteriores não são claramente preensoras",
      next: "h11",
      explanation: E.SEM_CONJUNTO_NABIDAE
    },
  },

  h9: {
    title: "9(8)",
    prompt: "Como é a membrana do hemiélitro?",
    a: {
      text: "Membrana com várias nervuras e sem cúneo diferenciado",
      next: "h10",
      explanation: E.MEMBRANA_VARIAS_NERVURAS
    },
    b: {
      text: "Membrana com uma nervura principal e cúneo presente",
      result: "MIRIDAE",
      explanation: E.MEMBRANA_UMA_NERVURA_CUNEO
    },
  },

  h10: {
    title: "10(9)",
    prompt: "Como ficam as margens laterais do pronoto?",
    a: {
      text: "Margens laterais do pronoto elevadas ou viradas para cima",
      result: "PYRRHOCORIDAE",
      explanation: E.PRONOTO_MARGENS_PARA_CIMA
    },
    b: {
      text: "Margens laterais do pronoto planas ou não elevadas",
      result: "LARGIDAE",
      explanation: E.PRONOTO_MARGENS_NORMAIS
    },
  },

  h11: {
    title: "11(8')",
    prompt: "Quantas nervuras aparecem na base da membrana?",
    a: {
      text: "Base da membrana com menos de sete nervuras visíveis",
      result: "LYGAEIDAE",
      explanation: E.MENOS_DE_7_NERVURAS
    },
    b: {
      text: "Base da membrana com mais de sete nervuras visíveis",
      next: "h12",
      explanation: E.MAIS_DE_7_NERVURAS
    },
  },

  h12: {
    title: "12(11')",
    prompt: "Existe glândula odorífera visível?",
    a: {
      text: "Abertura odorífera presente entre o segundo e o terceiro par de pernas",
      next: "h13",
      explanation: E.GLANDULA_ODORIFERA_PRESENTE
    },
    b: {
      text: "Abertura odorífera ausente ou não perceptível",
      result: "RHOPALIDAE",
      explanation: E.GLANDULA_ODORIFERA_AUSENTE
    },
  },

  h13: {
    title: "13(12)",
    prompt: "Compare a largura da cabeça com o pronoto",
    a: {
      text: "Cabeça nitidamente mais estreita que o pronoto",
      result: "COREIDAE",
      explanation: E.CABECA_MAIS_ESTREITA
    },
    b: {
      text: "Cabeça com largura semelhante à do pronoto",
      result: "ALYDIDAE",
      explanation: E.CABECA_TAO_LARGA
    },
  },

  h14: {
    title: "14(2')",
    prompt: "Até onde chegam os fêmures posteriores?",
    a: {
      text: "Fêmures posteriores passam claramente além da ponta do abdome",
      result: "GERRIDAE",
      explanation: E.FEMURES_ULTRAPASSAM_MUITO
    },
    b: {
      text: "Fêmures posteriores alcançam pouco além da ponta do abdome ou não a ultrapassam",
      result: "VELIIDAE",
      explanation: E.FEMURES_ULTRAPASSAM_POUCO
    },
  },

  h15: {
    title: "15(1')",
    prompt: "Nos heterópteros aquáticos, há ocelos?",
    a: {
      text: "Ocelos presentes",
      result: "NEPIDAE",
      explanation: E.OCELOS_PRESENTES_AQUATICOS
    },
    b: {
      text: "Ocelos ausentes",
      next: "h16",
      explanation: E.OCELOS_AUSENTES_AQUATICOS
    },
  },

  h16: {
    title: "16(15')",
    prompt: "O abdome possui prolongamento respiratório?",
    a: {
      text: "Abdome com prolongamento respiratório longo na extremidade",
      result: "GELASTOCORIDAE",
      explanation: E.APENDICE_RESPIRATORIO_LONGO
    },
    b: {
      text: "Abdome sem prolongamento longo, ou com estrutura respiratória tubular curta",
      next: "h17",
      explanation: E.SEM_APENDICE_LONGO
    },
  },

  h17: {
    title: "17(16')",
    prompt: "Os tarsos posteriores têm garras apicais distintas?",
    a: {
      text: "Tarsos posteriores terminando em um par de garras evidentes",
      next: "h18",
      explanation: E.TARSOS_COM_GARRAS
    },
    b: {
      text: "Tarsos posteriores sem par apical de garras claramente diferenciado",
      result: "NOTONECTIDAE",
      explanation: E.TARSOS_SEM_GARRAS_DISTINTAS
    },
  },

  h18: {
    title: "18(17)",
    prompt: "A membrana do hemiélitro tem nervuras?",
    a: {
      text: "Membrana do hemiélitro com nervuras visíveis",
      result: "BELOSTOMATIDAE",
      explanation: E.MEMBRANA_COM_NERVURAS
    },
    b: {
      text: "Membrana do hemiélitro sem nervuras aparentes",
      result: "NAUCORIDAE",
      explanation: E.MEMBRANA_SEM_NERVURAS
    },
  },
};
