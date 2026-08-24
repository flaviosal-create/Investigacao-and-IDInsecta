export const representativeCases = [
  {
    expected: "poaceae",
    observations: [
      ["folhas", "bainha_aberta_paralela"],
      [
        "flor",
        "reduzida_ou_inconspicua",
      ],
      [
        "destaque_reprodutivo",
        "espiguetas",
      ],
      ["fruto", "cariopse"],
    ],
  },
  {
    expected: "cyperaceae",
    observations: [
      [
        "folhas",
        "tristicas_bainha_fechada",
      ],
      [
        "flor",
        "reduzida_ou_inconspicua",
      ],
      [
        "destaque_reprodutivo",
        "espiguetas",
      ],
      ["fruto", "aquenio"],
    ],
  },
  {
    expected: "fabaceae",
    observations: [
      [
        "folhas",
        "compostas_com_pulvino",
      ],
      ["flor", "papilionacea"],
      ["fruto", "legume"],
      ["ovario", "supero"],
    ],
  },
  {
    expected: "myrtaceae",
    observations: [
      ["porte", "lenhoso"],
      [
        "folhas",
        "opostas_com_glandulas",
      ],
      [
        "destaque_reprodutivo",
        "muitos_estames",
      ],
      ["ovario", "infero"],
    ],
  },
  {
    expected: "melastomataceae",
    observations: [
      [
        "folhas",
        "opostas_acrodromas",
      ],
      [
        "destaque_reprodutivo",
        "anteras_por_poros",
      ],
      [
        "fruto",
        "capsula_ou_baga_com_calice_persistente",
      ],
      ["ovario", "infero"],
    ],
  },
  {
    expected: "lamiaceae",
    observations: [
      ["porte", "aromatico"],
      [
        "folhas",
        "opostas_decussadas",
      ],
      ["flor", "bilabiada"],
      [
        "fruto",
        "esquizocarpico_4_nuculas",
      ],
    ],
  },
  {
    expected: "solanaceae",
    observations: [
      [
        "folhas",
        "alternas_ou_pares_desiguais",
      ],
      [
        "flor",
        "pentamera_gamopetala",
      ],
      [
        "destaque_reprodutivo",
        "estames_epipetalos",
      ],
      [
        "fruto",
        "capsula_ou_baga_com_calice_persistente",
      ],
    ],
  },
  {
    expected: "asteraceae",
    observations: [
      ["flor", "em_capitulo"],
      [
        "destaque_reprodutivo",
        "anteras_concrescidas",
      ],
      ["ovario", "infero"],
      ["fruto", "cipsela_com_papo"],
    ],
  },
];

export const ambiguousCases = [
  {
    id: "graminoide_com_espiguetas",
    observations: [
      ["porte", "graminoide"],
      [
        "destaque_reprodutivo",
        "espiguetas",
      ],
    ],
    expectedLeader: "poaceae",
    expectedRunnerUp: "cyperaceae",
    expectedSuggestion: "fruto",
    expectedConclusion: "em_disputa",
    expectedDecision: "continuar",
  },
  {
    id: "hipanto_com_ovario_infero",
    observations: [
      [
        "flor",
        "actinomorfa_com_hipanto",
      ],
      ["ovario", "infero"],
    ],
    expectedLeader: "myrtaceae",
    expectedRunnerUp:
      "melastomataceae",
    expectedSuggestion:
      "destaque_reprodutivo",
    expectedConclusion:
      "em_disputa",
    expectedDecision:
      "continuar",
  },
];

export const mixedCases = [
  {
    id: "fabaceae_incompleta",
    observations: [
      ["flor", "papilionacea"],
    ],
    expectedLeader: "fabaceae",
    expectedConfidence:
      "promissora",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "fruto",
  },
  {
    id: "lamiaceae_incompleta",
    observations: [
      ["porte", "aromatico"],
      ["flor", "bilabiada"],
    ],
    expectedLeader: "lamiaceae",
    expectedConfidence:
      "promissora",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "fruto",
  },
  {
    id: "asteraceae_incompleta",
    observations: [
      [
        "destaque_reprodutivo",
        "anteras_concrescidas",
      ],
    ],
    expectedLeader: "asteraceae",
    expectedConfidence:
      "promissora",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "flor",
  },
];
