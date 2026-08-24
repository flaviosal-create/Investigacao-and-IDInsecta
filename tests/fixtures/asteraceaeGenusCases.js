export const representativeCases = [
  {
    expected: "bidens",
    observations: [
      ["folhas", "opostas_triangulares"],
      ["capitulo", "grande_radiado"],
      ["flores", "liguladas_e_tubulosas"],
      ["fruto", "cipsela_com_aristas_ou_ganchos"],
    ],
  },
  {
    expected: "vernonia",
    observations: [
      ["habito", "subarbusto_arbusto"],
      [
        "capitulo",
        "corimboso_com_muitos_capitulos",
      ],
      ["flores", "todas_tubulosas"],
      ["fruto", "cipsela_com_papo_abundante"],
    ],
  },
  {
    expected: "emilia",
    observations: [
      ["habito", "erva_ereta"],
      ["capitulo", "pequeno_cilindrico"],
      ["flores", "todas_tubulosas"],
      ["fruto", "cipsela_com_papo_abundante"],
    ],
  },
  {
    expected: "lactuca",
    observations: [
      ["habito", "rosetada"],
      ["folhas", "roseta_proxima_ao_solo"],
      ["capitulo", "tipo_dente_de_leao"],
      ["flores", "todas_liguladas"],
    ],
  },
  {
    expected: "echinops",
    observations: [
      ["folhas", "lobadas_espinescentes"],
      ["capitulo", "globoso_espinhoso"],
      ["flores", "todas_tubulosas"],
      ["fruto", "cipsela_sem_papo_evidente"],
    ],
  },
];

export const ambiguousCases = [
  {
    id: "flores_tubulosas_com_papo",
    observations: [
      ["flores", "todas_tubulosas"],
      ["fruto", "cipsela_com_papo_abundante"],
    ],
    expectedLeader: "vernonia",
    expectedRunnerUp: "emilia",
    expectedSuggestion: "capitulo",
    expectedConclusion: "em_disputa",
    expectedDecision: "continuar",
  },
  {
    id: "subarbusto_sem_capitulo",
    observations: [
      ["habito", "subarbusto_arbusto"],
    ],
    expectedLeader: "vernonia",
    expectedRunnerUp: "echinops",
    expectedSuggestion: "capitulo",
    expectedConclusion: "em_andamento",
    expectedDecision: "continuar",
  },
];

export const mixedCases = [
  {
    id: "bidens_incompleta",
    observations: [
      ["fruto", "cipsela_com_aristas_ou_ganchos"],
    ],
    expectedLeader: "bidens",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion: "folhas",
  },
  {
    id: "lactuca_incompleta",
    observations: [
      ["flores", "todas_liguladas"],
    ],
    expectedLeader: "lactuca",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion: "folhas",
  },
  {
    id: "vernonia_incompleta",
    observations: [
      [
        "capitulo",
        "corimboso_com_muitos_capitulos",
      ],
    ],
    expectedLeader: "vernonia",
    expectedConfidence: "promissora",
    expectedDecision: "continuar",
    expectedSuggestion: "flores",
  },
];
