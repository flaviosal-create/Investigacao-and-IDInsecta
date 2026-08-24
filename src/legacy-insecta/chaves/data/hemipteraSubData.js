import { EXPLICACOES_HEMIPTERA_SUB as E } from "./explicacoes.js";

export const hemipteraSubNodes = {

  h0: {
    title: "1",
    prompt: "Como são as antenas e de onde parte o rostro?",

    a: {
      text: "Antenas curtas com filamento na ponta; rostro partindo da região posterior da cabeça",
      next: "h1",
      explanation: E.AUCHENORRHYNCHA
    },

    b: {
      text: "Antenas sem filamento apical; rostro iniciando entre as coxas anteriores",
      next: "h10",
      explanation: E.STERNORRHYNCHA
    },
  },

  h1: {
    title: "2(1)",
    prompt: "Onde as antenas se inserem?",

    a: {
      text: "Antenas saindo da região frontal ou entre os olhos, com pedicelo sem dilatação",
      next: "h2",
      explanation: E.ANTENA_FRONTAL
    },

    b: {
      text: "Antenas laterais, abaixo dos olhos compostos, com pedicelo alargado",
      next: "h7",
      explanation: E.ANTENA_LATERAL
    },
  },

  h2: {
    title: "3(2)",
    prompt: "Quantos ocelos há e como são os fêmures anteriores?",

    a: {
      text: "Três ocelos e fêmures anteriores visivelmente alargados",
      result: "CICADIDAE",
      explanation: E.TRES_OCELOS_FEMUR_DILATADO
    },

    b: {
      text: "Dois ocelos ou nenhum, com fêmures anteriores sem dilatação marcante",
      next: "h3",
      explanation: E.DOIS_OU_NENHUM_OCELO
    },
  },

  h3: {
    title: "4(3')",
    prompt: "O pronoto avança sobre o abdome?",

    a: {
      text: "Pronoto expandido para trás, cobrindo parte do abdome",
      result: "MEMBRACIDAE",
      explanation: E.PRONOTO_EXPANDIDO
    },

    b: {
      text: "Pronoto curto ou sem expansão posterior evidente",
      next: "h4",
      explanation: E.PRONOTO_NORMAL
    },
  },

  h4: {
    title: "5(4')",
    prompt: "Como são as tíbias posteriores?",

    a: {
      text: "Tíbias posteriores pilosas, sem espinhos evidentes",
      result: "AETHALIONIDAE",
      explanation: E.TIBIA_PELUDA
    },

    b: {
      text: "Tíbias posteriores armadas com espinhos",
      next: "h5",
      explanation: E.TIBIA_COM_ESPINHOS
    },
  },

  h5: {
    title: "6(5')",
    prompt: "Como os espinhos das tíbias posteriores estão organizados?",

    a: {
      text: "Espinhos dispostos em uma ou duas fileiras ao longo da tíbia",
      result: "CICADELLIDAE",
      explanation: E.FILEIRAS_ESPINHOS
    },

    b: {
      text: "Apenas um ou dois espinhos principais na tíbia",
      result: "CERCOPIDAE",
      explanation: E.POUCOS_ESPINHOS
    },
  },

  h7: {
    title: "7(2')",
    prompt: "Há esporão na ponta das tíbias posteriores?",

    a: {
      text: "Tíbias posteriores terminando em um esporão apical",
      result: "DELPHACIDAE",
      explanation: E.ESPORAO_APICAL
    },

    b: {
      text: "Tíbias posteriores sem esporão na extremidade",
      next: "h8",
      explanation: E.SEM_ESPORAO
    },
  },

  h8: {
    title: "8(7')",
    prompt: "Quantos espinhos há no segundo artículo dos tarsos posteriores?",

    a: {
      text: "Segundo artículo com dois espinhos apicais",
      result: "FLATIDAE",
      explanation: E.DOIS_ESPINHOS_TARSO
    },

    b: {
      text: "Segundo artículo com vários espinhos apicais",
      next: "h9",
      explanation: E.VARIOS_ESPINHOS_TARSO
    },
  },

  h9: {
    title: "9(8')",
    prompt: "A área anal das asas posteriores é reticulada?",

    a: {
      text: "Área anal com padrão reticulado nas asas posteriores",
      result: "FULGORIDAE",
      explanation: E.AREA_ANAL_RETICULADA
    },

    b: {
      text: "Área anal sem retículo, com duas ou três carenas na fronte",
      result: "DICTYOPHARIDAE",
      explanation: E.AREA_ANAL_NAO_RETICULADA
    },
  },

  h10: {
    title: "10(1')",
    prompt: "Quantos artículos aparecem nas antenas?",

    a: {
      text: "Antenas normalmente formadas por dez artículos",
      result: "PSYLLIDAE",
      explanation: E.DEZ_ARTICULOS
    },

    b: {
      text: "Antenas com menos de dez artículos",
      next: "h11",
      explanation: E.MENOS_DEZ_ARTICULOS
    },
  },

  h11: {
    title: "11(10')",
    prompt: "O corpo tem revestimento branco pulverulento?",

    a: {
      text: "Corpo e asas cobertos por secreção branca de aspecto pulverulento",
      result: "ALEYRODIDAE",
      explanation: E.REVESTIMENTO_BRANCO
    },

    b: {
      text: "Corpo sem esse revestimento branco; pode ter sifúnculos ou aspecto de cochonilha",
      next: "h12",
      explanation: E.SEM_REVESTIMENTO_BRANCO
    },
  },

  h12: {
    title: "12(11')",
    prompt: "Há sifúnculos visíveis no abdome?",

    a: {
      text: "Sifúnculos presentes, como dois pequenos tubos no abdome",
      result: "APHIDIDAE",
      explanation: E.SIFUNCULOS_PRESENTES
    },

    b: {
      text: "Sifúnculos ausentes; corpo oval, fixo ou com aspecto ceroso de cochonilha",
      result: "COCCIDAE",
      explanation: E.COCCIDAE_CORPO_CEROSO
    },
  },

};
