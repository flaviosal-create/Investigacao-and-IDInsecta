export const representativeCases = [
  {
    expected: "diptera",
    observations: [
      ["asas", "1_par_funcional"],
      ["antena", "aristada"],
      ["aparelho_bucal", "lambedor"],
    ],
  },
  {
    expected: "thysanoptera",
    observations: [
      ["asas", "franjadas"],
      ["aparelho_bucal", "picador_sugador"],
      ["corpo", "corpo_mole"],
    ],
  },
  {
    expected: "hemiptera",
    observations: [
      ["aparelho_bucal", "picador_sugador"],
      ["asas", "2_pares_membranosos"],
      ["antena", "filiforme"],
    ],
  },
  {
    expected: "orthoptera",
    observations: [
      ["pernas", "saltatorias"],
      ["aparelho_bucal", "mastigador"],
      ["asas", "tegminas"],
    ],
  },
  {
    expected: "phasmatodea",
    observations: [
      ["corpo", "graveto_folha"],
      ["pernas", "ambulatorias"],
      ["aparelho_bucal", "mastigador"],
    ],
  },
  {
    expected: "blattodea",
    observations: [
      ["asas", "tegminas"],
      ["pernas", "ambulatorias"],
      ["antena", "filiforme"],
    ],
  },
  {
    expected: "mantodea",
    observations: [
      ["pernas", "raptatorias"],
      ["aparelho_bucal", "mastigador"],
      ["asas", "tegminas"],
    ],
  },
  {
    expected: "dermaptera",
    observations: [
      ["corpo", "cercos_pinca"],
      ["aparelho_bucal", "mastigador"],
      ["asas", "elitros"],
    ],
  },
  {
    expected: "coleoptera",
    observations: [
      ["asas", "elitros"],
      ["corpo", "corpo_duro"],
      ["aparelho_bucal", "mastigador"],
    ],
  },
  {
    expected: "lepidoptera",
    observations: [
      ["asas", "escamas"],
      ["aparelho_bucal", "sugador"],
      ["antena", "clavada"],
    ],
  },
  {
    expected: "trichoptera",
    observations: [
      ["asas", "pilosas_telhado"],
      ["aparelho_bucal", "mastigador"],
      ["antena", "filiforme"],
    ],
  },
  {
    expected: "isoptera",
    observations: [
      ["antena", "moniliforme"],
      ["corpo", "corpo_mole"],
      ["asas", "2_pares_membranosos"],
    ],
  },
  {
    expected: "odonata",
    observations: [
      ["antena", "curta"],
      ["asas", "2_pares_membranosos"],
      ["corpo", "abdome_alongado"],
    ],
  },
  {
    expected: "plecoptera",
    observations: [
      ["corpo", "cercos_longos"],
      ["asas", "2_pares_membranosos"],
      ["antena", "filiforme"],
    ],
  },
  {
    expected: "neuroptera",
    observations: [
      ["asas", "reticuladas"],
      ["aparelho_bucal", "mastigador"],
      ["antena", "filiforme"],
    ],
  },
  {
    expected: "hymenoptera",
    observations: [
      ["corpo", "cintura_estreita"],
      ["antena", "geniculada"],
      ["asas", "2_pares_membranosos"],
    ],
  },
];

export const stronglyDistinctiveCaseIds =
  [
    "diptera",
    "thysanoptera",
    "coleoptera",
    "hymenoptera",
  ];

export const ambiguousCases = [
  {
    id: "coleoptera_vs_hymenoptera",
    observations: [
      ["asas", "elitros"],
      ["corpo", "cintura_estreita"],
    ],
    expectedLeader: "coleoptera",
    expectedRunnerUp:
      "hymenoptera",
    expectedSuggestion:
      "antena",
    expectedConclusion:
      "em_disputa",
    expectedDecision:
      "continuar",
  },
  {
    id: "hemiptera_vs_thysanoptera",
    observations: [
      [
        "aparelho_bucal",
        "picador_sugador",
      ],
      ["corpo", "corpo_mole"],
    ],
    expectedLeader: "hemiptera",
    expectedRunnerUp:
      "thysanoptera",
    expectedSuggestion:
      "asas",
    expectedConclusion:
      "em_andamento",
    expectedDecision:
      "continuar",
  },
];

export const mixedCases = [
  {
    id: "blattodea_incompleto",
    observations: [
      ["asas", "tegminas"],
      ["pernas", "ambulatorias"],
    ],
    expectedLeader: "blattodea",
    expectedConfidence:
      "promissora",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "antena",
  },
  {
    id: "hemiptera_incompleto",
    observations: [
      [
        "aparelho_bucal",
        "picador_sugador",
      ],
      ["asas", "2_pares_membranosos"],
    ],
    expectedLeader: "hemiptera",
    expectedConfidence:
      "promissora",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "corpo",
  },
  {
    id: "hymenoptera_incompleto",
    observations: [
      ["corpo", "cintura_estreita"],
      ["asas", "2_pares_membranosos"],
    ],
    expectedLeader: "hymenoptera",
    expectedConfidence:
      "inicial",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "antena",
  },
  {
    id: "isoptera_incompleto",
    observations: [
      ["antena", "moniliforme"],
      ["corpo", "corpo_mole"],
    ],
    expectedLeader: "isoptera",
    expectedConfidence:
      "promissora",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "aparelho_bucal",
  },
  {
    id: "mantodea_incompleto",
    observations: [
      ["pernas", "raptatorias"],
      ["asas", "tegminas"],
    ],
    expectedLeader: "mantodea",
    expectedConfidence:
      "promissora",
    expectedDecision:
      "continuar",
    expectedSuggestion:
      "aparelho_bucal",
  },
];
