import { EXPLICACOES_BLATTODEA as E } from "./explicacoes.js";

export const blattodeaNodes = {

  b1: {
    title: "1",
    prompt:
      "Indivíduos eusociais formando castas permanentes; operários ápteros; cercos reduzidos; antenas moniliformes; tarsos geralmente tetrâmeros.",

    a: {
      text:
        "Indivíduos eusociais formando castas permanentes; operários ápteros; cercos reduzidos; antenas moniliformes; tarsos geralmente tetrâmeros",
      result: "TERMITOIDAE",
      explanation: E.EUSOCIAIS_TERMITAS
    },

    b: {
      text:
        "Indivíduos não formando castas permanentes; corpo típico de barata",
      next: "b2",
      explanation: E.NAO_EUSOCIAIS_BARATAS
    },
  },

  b2: {
    title: "2(1')",
    prompt:
      "Pronoto amplo cobrindo parcialmente a cabeça em vista dorsal; aparelho bucal mastigador; pernas cursorias com espinhos evidentes.",

    a: {
      text:
        "Pronoto amplo cobrindo parcialmente a cabeça em vista dorsal; aparelho bucal mastigador; pernas cursorias com espinhos evidentes",
      next: "b3",
      explanation: E.PRONOTO_COBRINDO_CABECA
    },

    b: {
      text:
        "Pronoto não cobrindo parcialmente a cabeça em vista dorsal; pernas sem espinhos cursorios evidentes",
      next: "b3",
      explanation: E.PRONOTO_NAO_COBRINDO
    },
  },

  b3: {
    title: "3(2)",
    prompt:
      "Profêmur apresentando série ântero-ventral do tipo A de Roth (espinhos proximais robustos seguidos distalmente por espinhos menores).",

    a: {
      text:
        "Profêmur apresentando série ântero-ventral do tipo A de Roth",
      next: "b4",
      explanation: E.PROFEMUR_TIPO_A
    },

    b: {
      text:
        "Profêmur sem série ântero-ventral do tipo A de Roth",
      next: "b7",
      explanation: E.PROFEMUR_SEM_TIPO_A
    },
  },

  b4: {
    title: "4(3)",
    prompt:
      "Corpo fortemente esclerosado; coloração geralmente castanho-escura a negra; pronoto sem margens translúcidas evidentes; subgenital masculino frequentemente simétrico.",

    a: {
      text:
        "Corpo fortemente esclerosado; coloração geralmente castanho-escura a negra; pronoto sem margens translúcidas evidentes; subgenital masculino frequentemente simétrico",
      result: "BLATTIDAE",
      explanation: E.CORPO_ESCLEROSADO
    },

    b: {
      text:
        "Corpo menos esclerosado; pronoto frequentemente com áreas translúcidas",
      next: "b5",
      explanation: E.CORPO_MENOS_ESCLEROSADO
    },
  },

  b5: {
    title: "5(4')",
    prompt:
      "Fêmeas frequentemente ovovivíparas; presença comum de especializações tergais glandulares em machos; corpo geralmente ovalado e deprimido.",

    a: {
      text:
        "Fêmeas frequentemente ovovivíparas; presença comum de especializações tergais glandulares em machos; corpo geralmente ovalado e deprimido",
      result: "BLABERIDAE",
      explanation: E.OVOVIVIPAROS
    },

    b: {
      text:
        "Fêmeas não ovovivíparas; especializações tergais ausentes",
      next: "b6",
      explanation: E.NAO_OVOVIVIPAROS
    },
  },

  b6: {
    title: "6(5')",
    prompt:
      "Insetos pequenos; pronoto frequentemente translúcido; tegminas delicadas; pulvilos geralmente presentes em todos os tarsômeros.",

    a: {
      text:
        "Insetos pequenos; pronoto frequentemente translúcido; tegminas delicadas; pulvilos geralmente presentes em todos os tarsômeros",
      result: "ECTOBIIDAE",
      explanation: E.INSETOS_PEQUENOS_DELICADOS
    },

    b: {
      text:
        "Pronoto não translúcido; tegumento mais robusto",
      result: "BLATTIDAE",
      explanation: E.TEGUMENTO_ROBUSTO
    },
  },

  b7: {
    title: "7(3')",
    prompt:
      "Tegumento frequentemente granuloso ou pulverulento; asas anteriores coriáceas; espécies frequentemente associadas a ambientes xéricos.",

    a: {
      text:
        "Tegumento frequentemente granuloso ou pulverulento; asas anteriores coriáceas; espécies frequentemente associadas a ambientes xéricos",
      result: "CORYDIIDAE",
      explanation: E.TEGUMENTO_GRANULOSO
    },

    b: {
      text:
        "Tegumento sem aspecto granuloso ou pulverulento",
      next: "b8",
      explanation: E.TEGUMENTO_LISO
    },
  },

  b8: {
    title: "8(7')",
    prompt:
      "Espécies xilófagas vivendo em madeira em decomposição; trato digestivo com protozoários simbiontes; comportamento subsocial evidente.",

    a: {
      text:
        "Espécies xilófagas vivendo em madeira em decomposição; trato digestivo com protozoários simbiontes; comportamento subsocial evidente",
      result: "CRYPTOCERCIDAE",
      explanation: E.XILOFAGOS_SUBSOCIAIS
    },

    b: {
      text:
        "Espécies não xilófagas; comportamento não subsocial",
      next: "b9",
      explanation: E.NAO_XILOFAGOS
    },
  },

  b9: {
    title: "9(8')",
    prompt:
      "Insetos pequenos e delicados; arólio reduzido ou ausente; tarsos delgados; venação alar relativamente simples.",

    a: {
      text:
        "Insetos pequenos e delicados; arólio reduzido ou ausente; tarsos delgados; venação alar relativamente simples",
      result: "ANAPLECTIDAE",
      explanation: E.INSETOS_DELgados_AROLIO_REDUZIDO
    },

    b: {
      text:
        "Arólio presente; corpo mais robusto; venação alar mais complexa",
      result: "BLABERIDAE",
      explanation: E.AROLIO_PRESENTE_ROBUSTO
    },
  },
};
