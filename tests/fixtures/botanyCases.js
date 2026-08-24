export const representativeCases = [
  {
    expected: "briofitas",
    observations: [
      ["conducao_vascular", "ausente"],
      ["dependencia_de_agua", "dependente"],
      ["geracao_dominante", "gametofito"],
      [
        "organizacao_do_corpo",
        "sem_orgaos_verdadeiros",
      ],
    ],
  },
  {
    expected: "pteridofitas",
    observations: [
      ["conducao_vascular", "presente"],
      ["estrutura_reprodutiva", "esporos"],
      ["dependencia_de_agua", "dependente"],
      [
        "organizacao_do_corpo",
        "raiz_caule_folha",
      ],
    ],
  },
  {
    expected: "gimnospermas",
    observations: [
      ["conducao_vascular", "presente"],
      [
        "estrutura_reprodutiva",
        "sementes_nuas",
      ],
      ["dependencia_de_agua", "independente"],
      [
        "organizacao_do_corpo",
        "lenhoso_com_cones",
      ],
    ],
  },
  {
    expected: "angiospermas",
    observations: [
      ["conducao_vascular", "presente"],
      ["estrutura_reprodutiva", "flores"],
      ["dependencia_de_agua", "independente"],
      [
        "organizacao_do_corpo",
        "flor_e_fruto",
      ],
    ],
  },
];

export const ambiguousCases = [
  {
    id: "vasculares_com_esporos",
    observations: [
      ["estrutura_reprodutiva", "esporos"],
      ["dependencia_de_agua", "dependente"],
    ],
    expectedLeader: "pteridofitas",
    expectedRunnerUp: "briofitas",
    expectedSuggestion: "conducao_vascular",
    expectedConclusion: "em_andamento",
    expectedDecision: "continuar",
  },
  {
    id: "espermatofitas_incompletas",
    observations: [
      ["conducao_vascular", "presente"],
      ["dependencia_de_agua", "independente"],
      ["geracao_dominante", "esporofito"],
    ],
    expectedLeader: "gimnospermas",
    expectedRunnerUp: "angiospermas",
    expectedSuggestion: "estrutura_reprodutiva",
    expectedConclusion: "em_disputa",
    expectedDecision: "continuar",
  },
];

export const mixedCases = [
  {
    id: "pteridofitas_com_conflito_hidrico",
    observations: [
      ["estrutura_reprodutiva", "esporos"],
      ["dependencia_de_agua", "independente"],
    ],
    expectedLeader: "pteridofitas",
    expectedConfidence: "inicial",
    expectedDecision: "continuar",
    expectedSuggestion: "conducao_vascular",
  },
  {
    id: "gimnospermas_incompletas",
    observations: [
      [
        "estrutura_reprodutiva",
        "sementes_nuas",
      ],
    ],
    expectedLeader: "gimnospermas",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion:
      "organizacao_do_corpo",
  },
  {
    id: "angiospermas_incompletas",
    observations: [
      ["estrutura_reprodutiva", "flores"],
    ],
    expectedLeader: "angiospermas",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion:
      "organizacao_do_corpo",
  },
];
