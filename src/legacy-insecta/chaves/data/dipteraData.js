import { EXPLICACOES_DIPTERA as E } from "./explicacoes.js";

export const dipteraNodes = {
  d1: {
    title: "1",
    prompt: "Como são as antenas?",
    a: {
      text: "Antenas curtas, normalmente com poucos artículos visíveis",
      next: "d2",
      explanation: E.ANTENAS_CURTAS_BRACHYCERA,
    },
    b: {
      text: "Antenas alongadas, filiformes ou plumosas, com muitos artículos",
      next: "d16",
      explanation: E.ANTENAS_LONGAS_NEMATOCERA,
    },
  },

  d2: {
    title: "2(1)",
    prompt: "Existe sulco ptilinal na cabeça?",
    a: {
      text: "Sulco ptilinal não visível na região frontal da cabeça",
      next: "d3",
      explanation: E.SULCO_PTILINAL_AUSENTE,
    },
    b: {
      text: "Sulco ptilinal bem marcado na região frontal",
      next: "d7",
      explanation: E.SULCO_PTILINAL_PRESENTE,
    },
  },

  d3: {
    title: "3(2)",
    prompt: "Qual é o aspecto do pós-tarso?",
    a: {
      text: "Empódio desenvolvido como lobo membranoso, formando três lobos no pós-tarso",
      next: "d4",
      explanation: E.EMPODIOS_PULVILIFORMES,
    },
    b: {
      text: "Empódio ausente ou em forma de espinho, restando dois lobos membranosos evidentes",
      next: "d5",
      explanation: E.EMPODIOS_AUSENTES_OU_ESPINIFORMES,
    },
  },

  d4: {
    title: "4(3)",
    prompt: "Como as nervuras R4 e R5 alcançam a margem da asa?",
    a: {
      text: "R4 e R5 se afastam e envolvem a região apical da asa",
      result: "TABANIDAE",
      explanation: E.R4_R5_DIVERGENTES,
    },
    b: {
      text: "R4 e R5 não delimitam o ápice, e a célula discal tem contorno arredondado",
      result: "STRATIOMYIDAE",
      explanation: E.R4_R5_NAO_ABRANGEM_APICE,
    },
  },

  d5: {
    title: "5(3')",
    prompt: "Onde está a nervura r-m?",
    a: {
      text: "Nervura r-m muito próxima da base da asa, ou ausente; corpo frequentemente metálico",
      result: "DOLICHOPODIDAE",
      explanation: E.RM_BASAL_METALICO,
    },
    b: {
      text: "Nervura r-m posicionada mais distante da base da asa",
      next: "d6",
      explanation: E.RM_NAO_BASAL,
    },
  },

  d6: {
    title: "6(5')",
    prompt: "Antena, cabeça e nervuras indicam qual família?",
    a: {
      text: "Antena com arista dorsal, R4+5 simples, célula R5 fechada e nervura espúria geralmente visível",
      result: "SYRPHIDAE",
      explanation: E.ANTENA_COM_ARISTA,
    },
    b: {
      text: "Antena com estilo, vértice aprofundado, olhos salientes e R4+5 ramificada",
      result: "ASILIDAE",
      explanation: E.ANTENA_ESTILIFORME,
    },
  },

  d7: {
    title: "7(2')",
    prompt: "O sulco transversal do mesonoto é completo?",
    a: {
      text: "Sulco transversal atravessando completamente o mesonoto",
      next: "d8",
      explanation: E.MESONOTO_SULCO_COMPLETO,
    },
    b: {
      text: "Sulco transversal interrompido ou incompleto no mesonoto",
      next: "d11",
      explanation: E.MESONOTO_SULCO_INCOMPLETO,
    },
  },

  d8: {
    title: "8(7)",
    prompt: "Há cerdas no meron ou no anepímero?",
    a: {
      text: "Meron e anepímero sem cerdas evidentes",
      result: "MUSCIDAE",
      explanation: E.MERON_SEM_CERDAS,
    },
    b: {
      text: "Meron ou anepímero com cerdas visíveis",
      next: "d9",
      explanation: E.MERON_COM_CERDAS,
    },
  },

  d9: {
    title: "9(8')",
    prompt: "O subescutelo é desenvolvido?",
    a: {
      text: "Subescutelo saliente; abdome geralmente com cerdas longas, sobretudo na ponta",
      result: "TACHINIDAE",
      explanation: E.SUBESCUTELO_DESENVOLVIDO,
    },
    b: {
      text: "Subescutelo discreto, sem expansão marcante",
      next: "d10",
      explanation: E.SUBESCUTELO_NORMAL,
    },
  },

  d10: {
    title: "10(9')",
    prompt: "A coloração e as cerdas notopleurais combinam com qual opção?",
    a: {
      text: "Corpo geralmente metálico e duas cerdas notopleurais",
      result: "CALLIPHORIDAE",
      explanation: E.COLORACAO_METALICA,
    },
    b: {
      text: "Corpo sem brilho metálico e quatro cerdas notopleurais",
      result: "SARCOPHAGIDAE",
      explanation: E.COLORACAO_NAO_METALICA,
    },
  },

  d11: {
    title: "11(7')",
    prompt: "As asas têm desenho em faixas?",
    a: {
      text: "Asas com bandas ou manchas em faixa",
      next: "d12",
      explanation: E.ASAS_COM_FAIXAS,
    },
    b: {
      text: "Asas transparentes ou sem faixas evidentes",
      next: "d13",
      explanation: E.ASAS_SEM_FAIXAS,
    },
  },

  d12: {
    title: "12(11)",
    prompt: "Como termina a nervura Sc?",
    a: {
      text: "Sc faz uma dobra abrupta, quase em ângulo reto, perto do ápice",
      result: "TEPHRITIDAE",
      explanation: E.SC_ANGULO_RETO,
    },
    b: {
      text: "Sc segue sem dobra apical abrupta",
      result: "OTITIDAE",
      explanation: E.SC_SEM_DOBRA,
    },
  },

  d13: {
    title: "13(11')",
    prompt: "Para onde apontam as cerdas pós-verticais?",
    a: {
      text: "Cerdas pós-verticais afastando-se entre si ou quase paralelas",
      next: "d14",
      explanation: E.CERDAS_DIVERGENTES,
    },
    b: {
      text: "Cerdas pós-verticais convergindo uma para a outra, ou ausentes",
      next: "d15",
      explanation: E.CERDAS_CONVERGENTES,
    },
  },

  d14: {
    title: "14(13)",
    prompt: "A coloração e a cabeça ajudam a separar estas famílias?",
    a: {
      text: "Corpo escuro e brilhante, terceiro antenômero alongado e R1 sem cerdas dorsais",
      result: "LONCHAEIDAE",
      explanation: E.COLORACAO_METALICA,
    },
    b: {
      text: "Corpo escuro com manchas amarelas e fronte com várias cerdas semelhantes às orbitais superiores",
      result: "AGROMYZIDAE",
      explanation: E.COLORACAO_NAO_METALICA,
    },
  },

  d15: {
    title: "15(13')",
    prompt: "A célula anal está presente?",
    a: {
      text: "Célula anal visível e costa com duas interrupções ou fraturas",
      result: "DROSOPHILIDAE",
      explanation: E.CELULA_ANAL_PRESENTE,
    },
    b: {
      text: "Célula anal ausente e costa com uma única fratura",
      next: "d15b",
      explanation: E.CELULA_ANAL_AUSENTE,
    },
  },

  d15b: {
    title: "15A(15')",
    prompt: "O corpo é arqueado e a venação da asa é muito reduzida?",
    a: {
      text: "Corpo pequeno, com tórax arqueado, aspecto corcunda e poucas nervuras fortes na asa",
      result: "PHORIDAE",
      explanation: E.DIPTERA_PHORIDAE_CORCUNDA,
    },
    b: {
      text: "Corpo sem perfil corcunda evidente, geralmente pequeno e claro, com venação menos reduzida",
      result: "CHLOROPIDAE",
      explanation: E.DIPTERA_CHLOROPIDAE_SEM_CORCUNDA,
    },
  },

  d16: {
    title: "16(1')",
    prompt: "O mesonoto tem sulco em V?",
    a: {
      text: "Mesonoto marcado por sulco em V e pernas muito alongadas",
      result: "TIPULIDAE",
      explanation: E.MESONOTO_SULCO_V,
    },
    b: {
      text: "Mesonoto sem sulco em V evidente",
      next: "d17",
      explanation: E.MESONOTO_SEM_SULCO_V,
    },
  },

  d17: {
    title: "17(16')",
    prompt: "Há ocelos?",
    a: {
      text: "Ocelos não observáveis",
      next: "d18",
      explanation: E.OCELOS_AUSENTES,
    },
    b: {
      text: "Ocelos presentes na cabeça",
      next: "d21",
      explanation: E.OCELOS_PRESENTES,
    },
  },

  d18: {
    title: "18(17)",
    prompt: "Qual é o formato da asa e o aspecto do corpo?",
    a: {
      text: "Asas terminando em ponta e corpo muito piloso, lembrando pequena mariposa",
      result: "PSYCHODIDAE",
      explanation: E.ASAS_COM_FAIXAS,
    },
    b: {
      text: "Asas com extremidade arredondada",
      next: "d18b",
      explanation: E.ASAS_SEM_FAIXAS,
    },
  },

  d18b: {
    title: "19(18')",
    prompt: "A asa tem venação muito reduzida?",
    a: {
      text: "Asas delicadas, com poucas nervuras longitudinais, e antenas longas com muitos artículos pequenos",
      result: "CECIDOMYIIDAE",
      explanation: E.DIPTERA_CECIDOMYIIDAE_VENACAO_REDUZIDA,
    },
    b: {
      text: "Asas com venação mais desenvolvida, seguindo para comparação de escamas e lobo anal",
      next: "d19",
      explanation: E.DIPTERA_VENACAO_NEMATOCERA_MAIS_COMPLETA,
    },
  },

  d19: {
    title: "20(19')",
    prompt: "As nervuras das asas têm escamas?",
    a: {
      text: "Nervuras alares recobertas por escamas",
      result: "CULICIDAE",
      explanation: E.NERVURAS_COM_ESCAMAS,
    },
    b: {
      text: "Nervuras alares sem escamas aparentes",
      next: "d20",
      explanation: E.NERVURAS_SEM_ESCAMAS,
    },
  },

  d20: {
    title: "21(20')",
    prompt: "Como são a largura da asa e o lobo anal?",
    a: {
      text: "Asas estreitas, lobo anal reduzido e nervura M sem ramificação",
      result: "CHIRONOMIDAE",
      explanation: E.LOBO_ANAL_PEQUENO,
    },
    b: {
      text: "Asas mais largas, com lobo anal bem desenvolvido",
      result: "SIMULIIDAE",
      explanation: E.LOBO_ANAL_DESENVOLVIDO,
    },
  },

  d21: {
    title: "21(17')",
    prompt: "Empódios e pulvilos têm tamanhos semelhantes?",
    a: {
      text: "Empódios e pulvilos igualmente evidentes no pós-tarso",
      result: "BIBIONIDAE",
      explanation: E.EMPODIOS_PULVILIFORMES,
    },
    b: {
      text: "Pulvilos reduzidos ou pouco destacados",
      next: "d22",
      explanation: E.EMPODIOS_AUSENTES_OU_ESPINIFORMES,
    },
  },

  d22: {
    title: "22(21')",
    prompt: "Os olhos se encontram acima das antenas?",
    a: {
      text: "Olhos em contato acima das antenas e tíbias sem esporões",
      result: "SCIARIDAE",
      explanation: E.OLHOS_TOCANDO,
    },
    b: {
      text: "Olhos separados acima das antenas e tíbias com esporões",
      result: "MYCETOPHILIDAE",
      explanation: E.OLHOS_NAO_TOCANDO,
    },
  },
};
