import { EXPLICACOES_COLEOPTERA as E } from "./explicacoes.js";

export const coleopteraNodes = {
  c1: {
    title: "1",
    prompt:
      "Observe a face ventral: as coxas posteriores interrompem o primeiro esternito abdominal?",
    a: {
      text:
        "Coxas posteriores sem cortar a continuidade do urosternito basal",
      next: "c2",
      explanation: E.COXAS_NAO_DIVIDEM_UROSTERNITO,
    },
    b: {
      text:
        "Coxas posteriores avançando sobre o urosternito basal e separando essa região",
      next: "c24",
      explanation: E.COXAS_DIVIDEM_UROSTERNITO,
    },
  },

  /* ===========================
     POLYPHAGA
  =========================== */

  c2: {
    title: "2(1)",
    prompt: "A cabeça forma um rostro evidente?",
    a: {
      text: "Cabeça alongada para a frente, formando rostro",
      next: "c3",
      explanation: E.CABECA_COM_ROSTRO,
    },
    b: {
      text: "Cabeça sem prolongamento em rostro",
      next: "c4",
      explanation: E.CABECA_SEM_ROSTRO,
    },
  },

  c3: {
    title: "3(2)",
    prompt: "Como são as antenas do besouro com rostro?",
    a: {
      text: "Antenas geniculadas, com clava bem marcada",
      result: "CURCULIONIDAE",
      explanation: E.ANTENAS_COMPOSTAS,
    },
    b: {
      text: "Antenas retas ou pouco dobradas, sem clava terminal evidente",
      result: "BRENTIDAE",
      explanation: E.ANTENAS_NAO_GENICULADAS_SEM_CLAVA,
    },
  },

  c4: {
    title: "4(2')",
    prompt: "As antenas têm lamelas na extremidade?",
    a: {
      text: "Extremidade da antena aberta em lâminas ou placas móveis",
      next: "c5",
      explanation: E.ANTENAS_LAMELADAS,
    },
    b: {
      text: "Antenas sem lamelas terminais",
      next: "c6",
      explanation: E.ANTENAS_OUTRO_TIPO,
    },
  },

  c5: {
    title: "5(4)",
    prompt:
      "O corpo achatado e o pronoto ajudam a separar estes besouros lamelicórneos?",
    a: {
      text:
        "Corpo achatado de cima para baixo, cintura marcada após o protórax e sulco longitudinal no pronoto",
      result: "PASSALIDAE",
      explanation: E.CORPO_ACHATADO_CONSTRICAO_PRONOTO,
    },
    b: {
      text:
        "Corpo sem esse achatamento forte, sem constrição nítida e pronoto sem sulco central",
      result: "SCARABAEIDAE",
      explanation: E.CORPO_SEM_CONSTRICAO,
    },
  },

  c6: {
    title: "6(4')",
    prompt:
      "Até onde os élitros cobrem o abdome?",
    a: {
      text:
        "Élitros curtos, deixando vários segmentos abdominais expostos",
      result: "STAPHYLINIDAE",
      explanation: E.ELITROS_NAO_COBREM_ABDOME,
    },
    b: {
      text: "Élitros cobrindo todo o abdome, ou deixando pouca área exposta",
      next: "c7",
      explanation: E.ELITROS_COBREM_ABDOME,
    },
  },

  c7: {
    title: "7(6')",
    prompt: "Qual é o padrão aparente dos tarsos?",
    a: {
      text: "Tarsos parecendo ter fórmula 4-4-4, embora sejam criptopentâmeros",
      next: "c7b",
      explanation: E.TARSOS_CRIPTOPENTAMEROS,
    },
    b: {
      text: "Tarsos com outra contagem aparente de segmentos",
      next: "c11",
      explanation: E.TARSOS_OUTRO_TIPO,
    },
  },

  c7b: {
    title: "8(7)",
    prompt: "Há cerdas eretas e a cabeça é mais estreita que o pronoto?",
    a: {
      text: "Cerdas eretas presentes no corpo e cabeça mais estreita que o pronoto",
      result: "DASYTIDAE",
      explanation: E.CERDAS_ERETAS_CABECA_ESTREITA,
    },
    b: {
      text: "Cerdas eretas ausentes ou cabeça não claramente mais estreita que o pronoto",
      next: "c8",
      explanation: E.SEM_CERDAS_ERETAS_OU_CABECA_NAO_ESTREITA,
    },
  },

  c8: {
    title: "9(8')",
    prompt:
      "O pigídio fica exposto além dos élitros?",
    a: {
      text:
        "Parte final do abdome visível atrás dos élitros, com pigídio exposto",
      result: "BRUCHIDAE",
      explanation: E.PIGIDIO_EXPOSTO,
    },
    b: {
      text: "Extremidade abdominal coberta pelos élitros",
      next: "c9",
      explanation: E.PIGIDIO_COBERTO,
    },
  },

  c9: {
    title: "10(9')",
    prompt:
      "A clava antenal tem três segmentos?",
    a: {
      text: "Clava terminal formada por três artículos bem definidos",
      result: "EROTYLIDAE",
      explanation: E.CLAVA_APICAL_TRES_SEGMENTOS,
    },
    b: {
      text: "Clava ausente ou formada por mais de três artículos",
      next: "c10",
      explanation: E.CLAVA_MAIS_DE_TRES_OU_AUSENTE,
    },
  },

  c10: {
    title: "11(10')",
    prompt: "Onde as antenas se inserem na cabeça?",
    a: {
      text:
        "Antenas geralmente longas, saindo de uma elevação na região frontal",
      result: "CERAMBYCIDAE",
      explanation: E.ANTENAS_LONGAS_ELEVACAO_FRONTAL,
    },
    b: {
      text:
        "Antenas menores que o corpo e sem inserção elevada na fronte",
      result: "CHRYSOMELIDAE",
      explanation: E.ANTENAS_CURTAS_SEM_ELEVACAO,
    },
  },

  c11: {
    title: "11(7')",
    prompt: "Compare os palpos maxilares com as antenas",
    a: {
      text:
        "Palpos maxilares alcançando ou ultrapassando o comprimento das antenas",
      result: "HYDROPHILIDAE",
      explanation: E.PALPOS_MAXILARES_LONGOS,
    },
    b: {
      text: "Palpos maxilares visivelmente menores que as antenas",
      next: "c12",
      explanation: E.PALPOS_MAXILARES_CURTOS,
    },
  },

  c12: {
    title: "12(11')",
    prompt: "A fórmula tarsal parece reduzida para 3-3-3?",
    a: {
      text: "Tarsos aparentando fórmula 3-3-3, característica criptotetrâmera",
      result: "COCCINELLIDAE",
      explanation: E.TARSOS_CRIPTOTETRAMEROS,
    },
    b: {
      text: "Tarsos com outro padrão aparente",
      next: "c13",
      explanation: E.TARSOS_DIFERENTES_CRIPTOTETRAMEROS,
    },
  },

  c13: {
    title: "13(12')",
    prompt: "Quantos esternitos abdominais ficam visíveis?",
    a: {
      text: "Cinco ou seis esternitos abdominais visíveis",
      next: "c14",
      explanation: E.ABDOME_5_OU_6_ESTERNITOS,
    },
    b: {
      text: "Sete ou oito esternitos abdominais visíveis",
      next: "c22",
      explanation: E.ABDOME_7_OU_8_ESTERNITOS,
    },
  },

  c14: {
    title: "14(13)",
    prompt: "Qual fórmula tarsal aparece?",
    a: {
      text: "Tarsos com fórmula 5-5-4",
      next: "c15",
      explanation: E.FORMULA_TARSAL_554,
    },
    b: {
      text: "Fórmula tarsal diferente de 5-5-4",
      next: "c18",
      explanation: E.FORMULA_TARSAL_DIFERENTE,
    },
  },

  c15: {
    title: "15(14)",
    prompt: "As cavidades das coxas anteriores são abertas?",
    a: {
      text: "Cavidades das coxas anteriores abertas posteriormente",
      result: "MELOIDAE",
      explanation: E.CAVIDADES_COXAIS_ABERTAS,
    },
    b: {
      text: "Cavidades das coxas anteriores fechadas posteriormente",
      next: "c16",
      explanation: E.CAVIDADES_COXAIS_FECHADAS,
    },
  },

  c16: {
    title: "16(15')",
    prompt: "Como são as garras dos tarsos?",
    a: {
      text: "Garras com dentes, serrilha ou aspecto de pente",
      result: "ALLECULIDAE",
      explanation: E.GARRAS_SERREADAS_PECTINADAS,
    },
    b: {
      text: "Garras simples, sem dentes evidentes",
      next: "c17",
      explanation: E.GARRAS_NORMAIS,
    },
  },

  c17: {
    title: "17(16')",
    prompt: "O penúltimo artículo tarsal é alargado?",
    a: {
      text:
        "Penúltimo artículo dos tarsos expandido ou dilatado",
      result: "LAGRIIDAE",
      explanation: E.PENULTIMO_ARTICULO_DILATADO,
    },
    b: {
      text:
        "Penúltimo artículo dos tarsos sem dilatação evidente",
      result: "TENEBRIONIDAE",
      explanation: E.PENULTIMO_ARTICULO_NORMAL,
    },
  },

  c18: {
    title: "18(14')",
    prompt: "As coxas posteriores têm encaixe para o fêmur?",
    a: {
      text:
        "Coxas posteriores com reentrância onde o fêmur pode se acomodar",
      next: "c19",
      explanation: E.COXAS_COM_CAVIDADE_FEMUR,
    },
    b: {
      text: "Coxas posteriores sem essa cavidade de encaixe",
      next: "c21",
      explanation: E.COXAS_SEM_CAVIDADE_FEMUR,
    },
  },

  c19: {
    title: "19(18)",
    prompt: "Qual é a textura do pronoto?",
    a: {
      text: "Pronoto com superfície rugosa ou áspera",
      result: "BOSTRYCHIDAE",
      explanation: E.PRONOTO_RUGOSO,
    },
    b: {
      text: "Pronoto liso ou sem rugosidade marcante",
      next: "c20",
      explanation: E.PRONOTO_LISO,
    },
  },

  c20: {
    title: "20(19')",
    prompt: "Como é a apófise do proesterno?",
    a: {
      text:
        "Apófise prosternal livre, projetada e terminando em ponta",
      result: "ELATERIDAE",
      explanation: E.APOFISE_PROESTERNAL_LIVRE,
    },
    b: {
      text: "Apófise prosternal fixa, sem projeção livre pontiaguda",
      result: "BUPRESTIDAE",
      explanation: E.APOFISE_PROESTERNAL_FIXA,
    },
  },

  c21: {
    title: "21(18')",
    prompt: "Qual detalhe aparece nos élitros?",
    a: {
      text: "Élitros com cristas ou carenas no sentido do comprimento",
      result: "SILPHIDAE",
      explanation: E.ELITROS_COM_CARENAS,
    },
    b: {
      text: "Élitros com cerdas levantadas e bem perceptíveis",
      result: "MELYRIDAE",
      explanation: E.ELITROS_COM_CERDAS_ERETAS,
    },
  },

  c22: {
    title: "22(13')",
    prompt: "O pronoto cobre a cabeça?",
    a: {
      text: "Cabeça visível, não ocultada pelo pronoto",
      result: "CANTHARIDAE",
      explanation: E.CABECA_NAO_ENCOBERTA,
    },
    b: {
      text: "Cabeça parcialmente ou totalmente escondida sob o pronoto",
      next: "c23",
      explanation: E.CABECA_ENCOBERTA,
    },
  },

  c23: {
    title: "23(22')",
    prompt: "Há estrutura luminosa no abdome?",
    a: {
      text: "Últimos esternitos abdominais com órgão produtor de luz",
      result: "LAMPYRIDAE",
      explanation: E.ORGAO_LUMINESCENTE,
    },
    b: {
      text: "Abdome sem órgão luminoso aparente",
      result: "LYCIDAE",
      explanation: E.SEM_ORGAO_LUMINESCENTE,
    },
  },

  /* ===========================
     ADEPHAGA
  =========================== */

  c24: {
    title: "24(1')",
    prompt: "As mandíbulas têm dentes longos?",
    a: {
      text: "Mandíbulas sem dente alongado evidente",
      result: "CARABIDAE",
      explanation: E.MANDIBULAS_SEM_DENTE,
    },
    b: {
      text: "Mandíbulas com dentes longos e bem projetados",
      result: "CICINDELIDAE",
      explanation: E.MANDIBULAS_COM_DENTES,
    },
  },
};
