export const representativeCases = [
  {
    expected: "paspalum",
    observations: [
      ["porte", "herbacea_baixa"],
      ["inflorescencia", "racemos_digitados"],
      ["espigueta", "pequena_plano_convexa"],
      ["colmo", "delgado_rasteiro"],
    ],
  },
  {
    expected: "panicum",
    observations: [
      ["porte", "touceira_alta"],
      ["inflorescencia", "panicula_aberta"],
      ["espigueta", "multiflora_sem_arista_longa"],
      ["folhas", "lineares_largas_asperezas"],
    ],
  },
  {
    expected: "andropogon",
    observations: [
      ["porte", "touceira_alta"],
      ["inflorescencia", "panicula_contraida_plumosa"],
      ["espigueta", "com_aristas_e_pelos"],
      ["colmo", "ereto_com_nos_evidentes"],
    ],
  },
  {
    expected: "zea",
    observations: [
      ["porte", "planta_robusta_cultivada"],
      ["colmo", "robusto_com_medula"],
      [
        "inflorescencia",
        "espiguetas_em_espadice_ou_espiga_grande",
      ],
      [
        "espigueta",
        "feminina_e_masculina_separadas",
      ],
    ],
  },
  {
    expected: "bambusa",
    observations: [
      ["porte", "colmo_gigante_lenhoso"],
      ["colmo", "lenhoso_oco"],
      [
        "inflorescencia",
        "fasciculos_em_ramos_lenhosos",
      ],
      [
        "espigueta",
        "grande_em_ramos_secundarios",
      ],
    ],
  },
];

export const ambiguousCases = [
  {
    id: "touceira_sem_inflorescencia",
    observations: [
      ["porte", "touceira_alta"],
      ["colmo", "ereto_com_nos_evidentes"],
    ],
    expectedLeader: "andropogon",
    expectedRunnerUp: "panicum",
    expectedSuggestion: "espigueta",
    expectedConclusion: "em_disputa",
    expectedDecision: "continuar",
  },
  {
    id: "colmo_ereto_sem_inflorescencia",
    observations: [
      ["colmo", "ereto_com_nos_evidentes"],
    ],
    expectedLeader: "panicum",
    expectedRunnerUp: "andropogon",
    expectedSuggestion: "espigueta",
    expectedConclusion: "em_disputa",
    expectedDecision: "continuar",
  },
];

export const mixedCases = [
  {
    id: "paspalum_incompleta",
    observations: [
      ["inflorescencia", "racemos_digitados"],
    ],
    expectedLeader: "paspalum",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion: "espigueta",
  },
  {
    id: "zea_incompleta",
    observations: [
      ["colmo", "robusto_com_medula"],
    ],
    expectedLeader: "zea",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion: "inflorescencia",
  },
  {
    id: "bambusa_incompleta",
    observations: [
      ["colmo", "lenhoso_oco"],
    ],
    expectedLeader: "bambusa",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion: "porte",
  },
];
