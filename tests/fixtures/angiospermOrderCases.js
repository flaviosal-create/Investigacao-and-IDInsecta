export const representativeCases = [
  {
    expected: "poales",
    observations: [
      ["estrutura_marcante", "espiguetas"],
      [
        "simetria_floral",
        "reduzida_ou_inconspicua",
      ],
      ["tipo_de_fruto", "cariopse"],
      [
        "fusao_da_corola",
        "ausente_ou_reduzida",
      ],
    ],
  },
  {
    expected: "fabales",
    observations: [
      [
        "estrutura_marcante",
        "flor_papilionacea",
      ],
      ["simetria_floral", "zigomorfa"],
      ["tipo_de_fruto", "legume"],
      ["ovario", "supero"],
    ],
  },
  {
    expected: "myrtales",
    observations: [
      ["estrutura_marcante", "muitos_estames"],
      ["arranjo_foliar", "opostas"],
      ["ovario", "infero"],
      [
        "tipo_de_fruto",
        "capsula_lenhosa_ou_baga_inferior",
      ],
    ],
  },
  {
    expected: "lamiales",
    observations: [
      ["estrutura_marcante", "flor_bilabiada"],
      ["arranjo_foliar", "opostas"],
      ["fusao_da_corola", "gamopetala"],
      ["simetria_floral", "zigomorfa"],
    ],
  },
  {
    expected: "solanales",
    observations: [
      [
        "estrutura_marcante",
        "flor_5_mera_sem_marca_forte",
      ],
      ["fusao_da_corola", "gamopetala"],
      ["simetria_floral", "actinomorfa"],
      ["tipo_de_fruto", "capsula_ou_baga"],
    ],
  },
  {
    expected: "asterales",
    observations: [
      [
        "estrutura_marcante",
        "anteras_concrescidas",
      ],
      ["ovario", "infero"],
      ["tipo_de_fruto", "aquenio_com_papo"],
      ["fusao_da_corola", "gamopetala"],
    ],
  },
];

export const ambiguousCases = [
  {
    id: "corola_gamopetala_com_folhas_opostas",
    observations: [
      ["fusao_da_corola", "gamopetala"],
      ["arranjo_foliar", "opostas"],
    ],
    expectedLeader: "lamiales",
    expectedRunnerUp: "solanales",
    expectedSuggestion:
      "estrutura_marcante",
    expectedConclusion:
      "em_andamento",
    expectedDecision:
      "continuar",
  },
  {
    id: "flor_actinomorfa_com_capsula",
    observations: [
      ["simetria_floral", "actinomorfa"],
      ["tipo_de_fruto", "capsula_ou_baga"],
    ],
    expectedLeader: "solanales",
    expectedRunnerUp: "myrtales",
    expectedSuggestion:
      "estrutura_marcante",
    expectedConclusion:
      "em_andamento",
    expectedDecision:
      "continuar",
  },
];

export const mixedCases = [
  {
    id: "poales_incompleta",
    observations: [
      ["estrutura_marcante", "espiguetas"],
    ],
    expectedLeader: "poales",
    expectedConfidence:
      "promissora",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "tipo_de_fruto",
  },
  {
    id: "fabales_com_conflito",
    observations: [
      [
        "estrutura_marcante",
        "flor_papilionacea",
      ],
      ["ovario", "infero"],
    ],
    expectedLeader: "fabales",
    expectedConfidence:
      "inicial",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "tipo_de_fruto",
  },
  {
    id: "asterales_incompleta",
    observations: [
      [
        "estrutura_marcante",
        "anteras_concrescidas",
      ],
    ],
    expectedLeader: "asterales",
    expectedConfidence:
      "promissora",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "tipo_de_fruto",
  },
];
