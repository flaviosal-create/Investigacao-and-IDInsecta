export const epitheliumRepresentativeCases =
  [
    {
      expected: "epitelio_simples",
      observations: [
        [
          "numero_camadas",
          "unica",
        ],
        [
          "contato_lamina_basal",
          "todas_as_celulas",
        ],
        [
          "disposicao_nuclear",
          "alinhados",
        ],
      ],
    },
    {
      expected: "epitelio_simples",
      observations: [
        [
          "numero_camadas",
          "unica",
        ],
        [
          "celulas_superficiais",
          "cilindricas",
        ],
        [
          "superficie_apical",
          "ciliada",
        ],
      ],
    },
    {
      expected:
        "epitelio_estratificado",
      observations: [
        [
          "numero_camadas",
          "multiplas",
        ],
        [
          "contato_lamina_basal",
          "apenas_camada_basal",
        ],
        [
          "disposicao_nuclear",
          "em_niveis_diferentes",
        ],
      ],
    },
    {
      expected:
        "epitelio_estratificado",
      observations: [
        [
          "numero_camadas",
          "multiplas",
        ],
        [
          "celulas_superficiais",
          "pavimentosas",
        ],
        [
          "superficie_apical",
          "queratinizada",
        ],
      ],
    },
  ];

export const epitheliumAmbiguousCases =
  [
    {
      id: "superficie_sem_especializacao",
      observations: [
        [
          "superficie_apical",
          "sem_especializacao",
        ],
      ],
      expectedLeader:
        "epitelio_simples",
      expectedRunnerUp:
        "epitelio_estratificado",
      expectedDecision:
        "continuar",
    },
    {
      id: "superficie_pavimentosa",
      observations: [
        [
          "celulas_superficiais",
          "pavimentosas",
        ],
      ],
      expectedLeader:
        "epitelio_estratificado",
      expectedRunnerUp:
        "epitelio_simples",
      expectedDecision:
        "continuar",
    },
  ];

export const epitheliumMixedCases =
  [
    {
      id: "simples_incompleto",
      observations: [
        [
          "numero_camadas",
          "unica",
        ],
      ],
      expectedLeader:
        "epitelio_simples",
      expectedConfidence:
        "promissora",
      expectedDecision:
        "continuar",
    },
    {
      id: "estratificado_incompleto",
      observations: [
        [
          "numero_camadas",
          "multiplas",
        ],
      ],
      expectedLeader:
        "epitelio_estratificado",
      expectedConfidence:
        "promissora",
      expectedDecision:
        "continuar",
    },
    {
      id: "simples_superficie",
      observations: [
        [
          "superficie_apical",
          "ciliada",
        ],
      ],
      expectedLeader:
        "epitelio_simples",
      expectedConfidence:
        "inicial",
      expectedDecision:
        "continuar",
    },
    {
      id: "estratificado_superficie",
      observations: [
        [
          "superficie_apical",
          "queratinizada",
        ],
      ],
      expectedLeader:
        "epitelio_estratificado",
      expectedConfidence:
        "inicial",
      expectedDecision:
        "continuar",
    },
  ];
