export const representativeCases = [
  {
    expected: "mimosa",
    observations: [
      ["folhas", "compostas_bipinadas"],
      [
        "organizacao_reprodutiva",
        "glomerulos_florais",
      ],
      [
        "pista_marcante",
        "sensitiva_ou_aculeos",
      ],
      ["fruto_ou_diasporo", "legume"],
    ],
  },
  {
    expected: "inga",
    observations: [
      ["habito", "arvore"],
      [
        "folhas",
        "compostas_pinadas_raque_alada",
      ],
      [
        "pista_marcante",
        "estames_numerosos",
      ],
      ["fruto_ou_diasporo", "legume"],
    ],
  },
  {
    expected: "bidens",
    observations: [
      ["folhas", "opostas_triangulares"],
      [
        "organizacao_reprodutiva",
        "capitulo_radiado",
      ],
      [
        "pista_marcante",
        "cipsela_aristada_aderente",
      ],
      ["fruto_ou_diasporo", "cipsela"],
    ],
  },
  {
    expected: "lactuca",
    observations: [
      ["habito", "rosetada"],
      ["folhas", "roseta_basal"],
      [
        "organizacao_reprodutiva",
        "capitulo_ligulado",
      ],
      [
        "pista_marcante",
        "flores_todas_liguladas",
      ],
    ],
  },
  {
    expected: "zea",
    observations: [
      [
        "habito",
        "planta_robusta_cultivada",
      ],
      ["folhas", "lamina_larga_cereal"],
      [
        "organizacao_reprodutiva",
        "espiga_masculina_e_espadice_feminino",
      ],
      [
        "pista_marcante",
        "sexos_separados_na_planta",
      ],
    ],
  },
  {
    expected: "bambusa",
    observations: [
      ["habito", "colmo_gigante_lenhoso"],
      [
        "organizacao_reprodutiva",
        "fasciculos_em_ramos_lenhosos",
      ],
      [
        "pista_marcante",
        "colmo_oco_lenhoso",
      ],
      [
        "fruto_ou_diasporo",
        "espigueta_grande",
      ],
    ],
  },
];

export const ambiguousCases = [
  {
    id: "legume_sem_estrutura_fina",
    observations: [
      ["fruto_ou_diasporo", "legume"],
    ],
    expectedLeader: "mimosa",
    expectedRunnerUp: "inga",
    expectedSuggestion: "pista_marcante",
    expectedConclusion: "em_disputa",
    expectedDecision: "continuar",
  },
  {
    id: "cipsela_sem_capitulo",
    observations: [
      ["fruto_ou_diasporo", "cipsela"],
    ],
    expectedLeader: "bidens",
    expectedRunnerUp: "lactuca",
    expectedSuggestion:
      "pista_marcante",
    expectedConclusion: "em_disputa",
    expectedDecision: "continuar",
  },
];

export const mixedCases = [
  {
    id: "mimosa_incompleta",
    observations: [
      ["folhas", "compostas_bipinadas"],
    ],
    expectedLeader: "mimosa",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion: "pista_marcante",
  },
  {
    id: "zea_incompleta",
    observations: [
      [
        "habito",
        "planta_robusta_cultivada",
      ],
    ],
    expectedLeader: "zea",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion:
      "organizacao_reprodutiva",
  },
  {
    id: "lactuca_incompleta",
    observations: [
      [
        "pista_marcante",
        "flores_todas_liguladas",
      ],
    ],
    expectedLeader: "lactuca",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion: "folhas",
  },
];
