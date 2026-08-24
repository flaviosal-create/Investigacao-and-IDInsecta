export const representativeCases = [
  {
    expected: "monocotiledoneas",
    observations: [
      ["cotiledones", "um"],
      ["nervacao_foliar", "paralela"],
      ["pecas_florais", "trimeras"],
      [
        "feixes_vasculares_no_caule",
        "dispersos",
      ],
    ],
  },
  {
    expected: "eudicotiledoneas",
    observations: [
      ["cotiledones", "dois"],
      ["nervacao_foliar", "reticulada"],
      [
        "pecas_florais",
        "tetrameras_ou_pentameras",
      ],
      ["grao_de_polen", "tricolpado"],
    ],
  },
  {
    expected: "magnoliideas",
    observations: [
      ["cotiledones", "dois"],
      [
        "nervacao_foliar",
        "arqueada_ou_peninervia",
      ],
      [
        "pecas_florais",
        "numerosas_espiraladas",
      ],
      ["grao_de_polen", "monosulcado"],
    ],
  },
];

export const ambiguousCases = [
  {
    id: "trimera_com_polen_monosulcado",
    observations: [
      ["grao_de_polen", "monosulcado"],
      ["pecas_florais", "trimeras"],
    ],
    expectedLeader: "monocotiledoneas",
    expectedRunnerUp: "magnoliideas",
    expectedSuggestion:
      "nervacao_foliar",
    expectedConclusion:
      "em_disputa",
    expectedDecision:
      "continuar",
  },
  {
    id: "trimera_com_feixes_em_anel",
    observations: [
      ["pecas_florais", "trimeras"],
      [
        "feixes_vasculares_no_caule",
        "em_anel",
      ],
    ],
    expectedLeader: "magnoliideas",
    expectedRunnerUp: "eudicotiledoneas",
    expectedSuggestion:
      "grao_de_polen",
    expectedConclusion:
      "em_disputa",
    expectedDecision:
      "continuar",
  },
];

export const mixedCases = [
  {
    id: "monocotiledonea_incompleta",
    observations: [
      ["nervacao_foliar", "paralela"],
    ],
    expectedLeader: "monocotiledoneas",
    expectedConfidence:
      "promissora",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "cotiledones",
  },
  {
    id: "eudicotiledonea_incompleta",
    observations: [
      ["grao_de_polen", "tricolpado"],
    ],
    expectedLeader: "eudicotiledoneas",
    expectedConfidence:
      "promissora",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "cotiledones",
  },
  {
    id: "magnoliidea_incompleta",
    observations: [
      [
        "pecas_florais",
        "numerosas_espiraladas",
      ],
    ],
    expectedLeader: "magnoliideas",
    expectedConfidence:
      "promissora",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "grao_de_polen",
  },
];
