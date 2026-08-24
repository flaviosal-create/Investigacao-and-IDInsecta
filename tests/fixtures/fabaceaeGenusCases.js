export const representativeCases = [
  {
    expected: "mimosa",
    observations: [
      ["folhas", "bipinadas"],
      [
        "flor",
        "actinomorfa_em_glomerulo",
      ],
      [
        "destaque_reprodutivo",
        "sensitiva_ou_aculeos",
      ],
      ["fruto", "craspedio_ou_segmentado"],
    ],
  },
  {
    expected: "senna",
    observations: [
      [
        "folhas",
        "paripinadas_com_nectario",
      ],
      ["flor", "zigomorfa_amarela"],
      [
        "destaque_reprodutivo",
        "heteranteria",
      ],
      ["fruto", "legume_alongado"],
    ],
  },
  {
    expected: "inga",
    observations: [
      ["habito", "arvore"],
      [
        "folhas",
        "pinadas_com_raque_alada",
      ],
      [
        "destaque_reprodutivo",
        "estames_numerosos",
      ],
      [
        "fruto",
        "legume_polposo_indehiscente",
      ],
    ],
  },
  {
    expected: "phaseolus",
    observations: [
      ["habito", "herbacea_trepadora"],
      ["folhas", "trifolioladas"],
      ["flor", "papilionacea_tipica"],
      [
        "destaque_reprodutivo",
        "voluvel",
      ],
    ],
  },
  {
    expected: "arachis",
    observations: [
      ["habito", "herbacea_prostrada"],
      ["folhas", "tetrafolioladas"],
      ["flor", "papilionacea_amarela"],
      [
        "destaque_reprodutivo",
        "geocarpia",
      ],
    ],
  },
];

export const ambiguousCases = [
  {
    id: "habito_arbustivo_compartilhado",
    observations: [
      ["habito", "arbusto_ou_arvoreta"],
    ],
    expectedLeader: "mimosa",
    expectedRunnerUp: "senna",
    expectedSuggestion: "folhas",
    expectedConclusion: "em_disputa",
    expectedDecision: "continuar",
  },
  {
    id: "arvore_com_flor_glomerulada",
    observations: [
      ["habito", "arvore"],
      ["flor", "actinomorfa_em_glomerulo"],
    ],
    expectedLeader: "mimosa",
    expectedRunnerUp: "inga",
    expectedSuggestion: "fruto",
    expectedConclusion: "em_disputa",
    expectedDecision: "continuar",
  },
];

export const mixedCases = [
  {
    id: "mimosa_incompleta",
    observations: [
      ["folhas", "bipinadas"],
    ],
    expectedLeader: "mimosa",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion:
      "destaque_reprodutivo",
  },
  {
    id: "senna_incompleta",
    observations: [
      [
        "destaque_reprodutivo",
        "heteranteria",
      ],
    ],
    expectedLeader: "senna",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion: "folhas",
  },
  {
    id: "arachis_incompleta",
    observations: [
      [
        "destaque_reprodutivo",
        "geocarpia",
      ],
    ],
    expectedLeader: "arachis",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion: "folhas",
  },
];
