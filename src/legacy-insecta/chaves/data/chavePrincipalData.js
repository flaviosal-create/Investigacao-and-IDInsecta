import { EXPLICACOES_PRINCIPAL as E } from "./explicacoes.js";

export const chavePrincipalNodes = {
  visao_geral: {
    title: "Etapa 1 · visão geral",
    prompt:
      "As asas anteriores apresentam alguma modificação evidente de textura ou revestimento?",
    a: {
      text:
        "Sim. São rígidas, coriáceas, parcialmente endurecidas ou recobertas por escamas, pelos ou franjas",
      next: "revestimento_asa",
      figs: ["insecta_painel_asas"],
      explanation: E.ASAS_ANTERIORES_MODIFICADAS,
    },
    b: {
      text:
        "Não. São principalmente membranosas, estão ausentes ou não podem ser avaliadas com segurança",
      next: "balancins",
      figs: [],
      explanation: E.ASAS_MEMBRANOSAS_NAO_AVALIAVEIS,
    },
  },

  revestimento_asa: {
    title: "Etapa 2 · revestimento",
    prompt: "A superfície das asas possui escamas facilmente reconhecíveis?",
    a: {
      text:
        "Asas recobertas por pequenas escamas, frequentemente com aparência colorida ou pulverulenta",
      result: "LEPIDOPTERA",
      goto: "LEPIDOPTERA",
      figs: ["insecta_escamas_lepidoptera"],
      explanation: E.ESCAMAS_ASAS,
    },
    b: {
      text: "Asas sem revestimento predominante de escamas",
      next: "franjas",
      figs: ["insecta_superficie_asa_comparacao"],
      explanation: E.SEM_ESCAMAS,
    },
  },

  franjas: {
    title: "Etapa 3 · margens das asas",
    prompt: "As asas são muito estreitas e apresentam franjas longas nas margens?",
    a: {
      text:
        "Asas estreitas, quase lineares, margeadas por fileiras evidentes de cerdas",
      result: "THYSANOPTERA",
      goto: "THYSANOPTERA",
      figs: [],
      explanation: E.ASAS_FRANJADAS,
    },
    b: {
      text: "Asas sem a combinação de formato estreito e franjas marginais",
      next: "pelos",
      figs: [],
      explanation: E.SEM_FRANJAS,
    },
  },

  pelos: {
    title: "Etapa 4 · superfície e repouso",
    prompt:
      "As asas são pilosas e costumam permanecer inclinadas como um telhado sobre o corpo?",
    a: {
      text:
        "Asas membranosas cobertas principalmente por pelos e mantidas em telhado durante o repouso",
      result: "TRICHOPTERA",
      figs: [],
      explanation: E.ASAS_PILOSAS_TELHADO,
    },
    b: {
      text: "Asas sem esse conjunto de pilosidade e postura em telhado",
      next: "elitros",
      figs: [],
      explanation: E.SEM_ASAS_PILOSAS_TELHADO,
    },
  },

  elitros: {
    title: "Etapa 5 · rigidez",
    prompt:
      "As asas anteriores formam uma cobertura rígida ou muito curta sobre o abdome?",
    a: {
      text:
        "Asas anteriores rígidas, funcionando como cobertura; podem recobrir todo o abdome ou ser muito curtas",
      next: "cercos_pinca",
      figs: ["insecta_elitros_coleoptera"],
      explanation: E.ELITROS,
    },
    b: {
      text:
        "Asas anteriores flexíveis ou apenas parcialmente endurecidas, sem formar uma cobertura rígida",
      next: "hemielitros",
      figs: [],
      explanation: E.SEM_ELITROS,
    },
  },

  cercos_pinca: {
    title: "Etapa 6 · extremidade abdominal",
    prompt: "A extremidade do abdome possui cercos aparentes em forma de pinça?",
    a: {
      text:
        "Cercos bem visíveis, formando uma pinça terminal; asas anteriores geralmente curtas",
      result: "DERMAPTERA",
      goto: "DERMAPTERA",
      figs: ["insecta_cercos_dermaptera"],
      explanation: E.CERCOS_PRESENTES,
    },
    b: {
      text:
        "Sem pinça terminal; asas anteriores geralmente se encontram sobre o dorso como élitros",
      result: "COLEOPTERA",
      goto: "COLEOPTERA",
      figs: [],
      explanation: E.CERCOS_AUSENTES,
    },
  },

  hemielitros: {
    title: "Etapa 6 · asa e aparelho bucal",
    prompt:
      "Há rostro sugador e asas anteriores parcialmente endurecidas ou com padrão típico de hemíptero?",
    a: {
      text:
        "Aparelho bucal em rostro; asas podem formar hemiélitros, ser membranosas ou estar reduzidas",
      result: "HEMIPTERA",
      goto: "HEMIPTERA",
      figs: ["insecta_rostro_hemiptera", "insecta_hemielitro_hemiptera"],
      explanation: E.TIPOS_HEMIPTERA,
    },
    b: {
      text:
        "Sem a combinação de rostro sugador e padrão alar de hemíptero",
      next: "tegminas",
      figs: [],
      explanation: E.SEM_PADRAO_HEMIPTERA,
    },
  },

  tegminas: {
    title: "Etapa 7 · flexibilidade",
    prompt:
      "As asas anteriores são coriáceas ou pergaminosas, formando tégminas?",
    a: {
      text:
        "Asas anteriores mais firmes que as posteriores, mas ainda flexíveis",
      next: "pernas_salto_tegmina",
      figs: [],
      explanation: E.TEGMINA,
    },
    b: {
      text:
        "Asas anteriores não formam tégminas reconhecíveis",
      next: "balancins",
      figs: [],
      explanation: E.OUTROS_TIPOS_ASA,
    },
  },

  pernas_salto_tegmina: {
    title: "Etapa 8 · locomoção",
    prompt: "As pernas posteriores são ampliadas e especializadas para salto?",
    a: {
      text:
        "Fêmures posteriores desenvolvidos, formando pernas saltatórias evidentes",
      result: "ORTHOPTERA",
      goto: "ORTHOPTERA",
      figs: ["insecta_perna_saltatoria_orthoptera"],
      explanation: E.PERNAS_SALTATORIAS,
    },
    b: {
      text:
        "Pernas posteriores sem aumento característico para salto",
      next: "pernas_captura_tegmina",
      figs: ["insecta_pernas_comparacao"],
      explanation: E.PERNAS_NAO_SALTATORIAS,
    },
  },

  pernas_captura_tegmina: {
    title: "Etapa 9 · pernas anteriores",
    prompt: "As pernas anteriores são modificadas para capturar presas?",
    a: {
      text:
        "Pernas anteriores raptatórias, dobráveis e armadas com espinhos para apreensão",
      result: "MANTODEA",
      goto: "MANTODEA",
      figs: [],
      explanation: E.PERNAS_RAPTATORIAS,
    },
    b: {
      text:
        "Pernas anteriores principalmente ambulatórias; corpo frequentemente achatado",
      result: "BLATTODEA",
      goto: "BLATTODEA",
      figs: [],
      explanation: E.PERNAS_AMBULATORIAS,
    },
  },

  balancins: {
    title: "Etapa 2 · asas posteriores",
    prompt:
      "O segundo par de asas está reduzido a pequenos balancins atrás das asas anteriores?",
    a: {
      text:
        "Há um par de pequenas estruturas em forma de bastão usado no equilíbrio durante o voo",
      result: "DIPTERA",
      goto: "DIPTERA",
      figs: ["insecta_halteres_diptera"],
      explanation: E.BALANCINS,
    },
    b: {
      text:
        "Não há balancins; existem asas posteriores comuns, ausência de asas ou outra condição",
      next: "mimetismo_vegetal",
      figs: [],
      explanation: E.ASAS_OUTRO_TIPO,
    },
  },

  mimetismo_vegetal: {
    title: "Etapa 3 · forma corporal",
    prompt:
      "O corpo e as pernas produzem uma semelhança evidente com graveto ou folha?",
    a: {
      text:
        "Corpo muito alongado ou foliáceo, com contorno e pernas associados à camuflagem vegetal",
      result: "PHASMATODEA",
      goto: "PHASMATODEA",
      figs: [],
      explanation: E.CORPO_GRAVETO_FOLHA_PHASMATODEA,
    },
    b: {
      text: "Corpo sem mimetismo evidente de graveto ou folha",
      next: "pernas_salto_sem_tegmina",
      figs: [],
      explanation: E.SEM_CORPO_GRAVETO_FOLHA,
    },
  },

  pernas_salto_sem_tegmina: {
    title: "Etapa 4 · rota complementar",
    prompt:
      "Mesmo sem tégminas visíveis, as pernas posteriores são claramente saltatórias?",
    a: {
      text:
        "Pernas posteriores muito desenvolvidas, com fêmures robustos adaptados ao salto",
      result: "ORTHOPTERA",
      goto: "ORTHOPTERA",
      figs: ["insecta_perna_saltatoria_orthoptera"],
      explanation: E.PERNAS_SALTATORIAS,
    },
    b: {
      text: "Pernas posteriores sem especialização evidente para salto",
      next: "pernas_captura_sem_tegmina",
      figs: [],
      explanation: E.PERNAS_NAO_SALTATORIAS,
    },
  },

  pernas_captura_sem_tegmina: {
    title: "Etapa 5 · rota complementar",
    prompt:
      "As pernas anteriores são raptatórias, com espinhos e movimento de apreensão?",
    a: {
      text:
        "Pernas anteriores especializadas para segurar presas, mesmo que as asas não estejam visíveis",
      result: "MANTODEA",
      goto: "MANTODEA",
      figs: ["insecta_perna_raptorial_limpa"],
      explanation: E.PERNAS_RAPTATORIAS,
    },
    b: {
      text: "Pernas anteriores sem adaptação raptatória",
      next: "corpo_cursorial",
      figs: [],
      explanation: E.PERNAS_AMBULATORIAS,
    },
  },

  corpo_cursorial: {
    title: "Etapa 6 · rota complementar",
    prompt:
      "O corpo é achatado, com pronoto amplo e pernas adaptadas à corrida?",
    a: {
      text:
        "Corpo geralmente achatado dorsoventralmente, cabeça parcialmente coberta pelo pronoto e pernas cursoras",
      result: "BLATTODEA",
      goto: "BLATTODEA",
      figs: ["insecta_corpo_blattodea"],
      explanation: E.CORPO_CURSORIAL_BLATTODEA,
    },
    b: {
      text:
        "Corpo sem o conjunto de achatamento, pronoto amplo e pernas cursoras",
      next: "antenas_contas",
      figs: ["insecta_forma_corpo_comparacao"],
      explanation: E.SEM_CORPO_CURSORIAL_BLATTODEA,
    },
  },

  antenas_contas: {
    title: "Etapa 7 · antenas e asas",
    prompt:
      "As antenas lembram um colar de contas e, quando presentes, os dois pares de asas são semelhantes?",
    a: {
      text:
        "Antenas moniliformes; indivíduos alados com quatro asas membranosas de tamanho semelhante",
      result: "ISOPTERA",
      goto: "ISOPTERA",
      figs: ["insecta_asas_semelhantes_cupins", "insecta_asas_pares_comparacao"],
      explanation: E.ANTENA_MONILIFORME,
    },
    b: {
      text:
        "Antenas com outro formato ou pares de asas claramente diferentes",
      next: "antenas_reduzidas",
      figs: [],
      explanation: E.ANTENA_OUTRO_TIPO,
    },
  },

  antenas_reduzidas: {
    title: "Etapa 8 · cabeça",
    prompt:
      "As antenas são muito curtas e os olhos compostos ocupam grande parte da cabeça?",
    a: {
      text:
        "Antenas pouco evidentes, associadas a olhos muito desenvolvidos e corpo alongado",
      result: "ODONATA",
      goto: "ODONATA",
      figs: [],
      explanation: E.ANTENAS_CURTAS,
    },
    b: {
      text:
        "Antenas longas ou bem visíveis, sem a combinação típica com olhos muito desenvolvidos",
      next: "cercos_filiformes",
      figs: [],
      explanation: E.ANTENAS_LONGAS,
    },
  },

  cercos_filiformes: {
    title: "Etapa 9 · extremidade abdominal",
    prompt:
      "Há dois cercos longos e filiformes no final do abdome, com asas repousando mais planas sobre o corpo?",
    a: {
      text:
        "Dois filamentos terminais longos; asas membranosas geralmente dobradas de modo plano",
      result: "PLECOPTERA",
      figs: [],
      explanation: E.CERCOS_LONGOS_PLECOPTERA,
    },
    b: {
      text: "Sem dois cercos longos associados a esse padrão de repouso das asas",
      next: "venacao",
      figs: [],
      explanation: E.SEM_CERCOS_LONGOS_PLECOPTERA,
    },
  },

  venacao: {
    title: "Etapa 10 · confirmação pela asa",
    prompt:
      "As asas apresentam uma rede densa de nervuras longitudinais e transversais?",
    a: {
      text:
        "Muitas nervuras cruzadas formam uma malha reticulada evidente",
      result: "NEUROPTERA",
      goto: "NEUROPTERA",
      figs: [],
      explanation: E.ASAS_RETICULADAS,
    },
    b: {
      text:
        "Venação menos reticulada; frequentemente há cintura entre tórax e abdome ou aparelho ovipositor",
      result: "HYMENOPTERA",
      goto: "HYMENOPTERA",
      figs: ["insecta_cintura_apocrita"],
      explanation: E.ASAS_POUCAS_NERVURAS,
    },
  },
};
