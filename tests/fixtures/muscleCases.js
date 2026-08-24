export const muscleRepresentativeCases =
  [
    {
      expected: "musculo_liso",
      observations: [
        [
          "estriacoes",
          "ausentes",
        ],
        [
          "forma_celular",
          "fusiforme",
        ],
        [
          "posicao_nuclear",
          "central",
        ],
      ],
    },
    {
      expected: "musculo_liso",
      observations: [
        [
          "forma_celular",
          "fusiforme",
        ],
        [
          "numero_nucleos",
          "unico",
        ],
        [
          "estriacoes",
          "ausentes",
        ],
      ],
    },
    {
      expected:
        "musculo_estriado",
      observations: [
        [
          "estriacoes",
          "presentes",
        ],
        [
          "forma_celular",
          "cilindrica",
        ],
        [
          "posicao_nuclear",
          "periferica",
        ],
      ],
    },
    {
      expected:
        "musculo_estriado",
      observations: [
        [
          "estriacoes",
          "presentes",
        ],
        [
          "numero_nucleos",
          "multiplos",
        ],
        [
          "forma_celular",
          "cilindrica",
        ],
      ],
    },
  ];

export const muscleAmbiguousCases =
  [
    {
      id: "organizacao_regular",
      observations: [
        [
          "organizacao_fibras",
          "feixes_regulares",
        ],
      ],
      expectedLeader:
        "musculo_estriado",
      expectedRunnerUp:
        "musculo_liso",
      expectedDecision:
        "continuar",
    },
    {
      id: "nucleo_unico",
      observations: [
        [
          "numero_nucleos",
          "unico",
        ],
      ],
      expectedLeader:
        "musculo_liso",
      expectedRunnerUp:
        "musculo_estriado",
      expectedDecision:
        "continuar",
    },
  ];

export const muscleMixedCases =
  [
    {
      id: "liso_incompleto",
      observations: [
        [
          "estriacoes",
          "ausentes",
        ],
      ],
      expectedLeader:
        "musculo_liso",
      expectedConfidence:
        "promissora",
      expectedDecision:
        "continuar",
    },
    {
      id: "estriado_incompleto",
      observations: [
        [
          "estriacoes",
          "presentes",
        ],
      ],
      expectedLeader:
        "musculo_estriado",
      expectedConfidence:
        "promissora",
      expectedDecision:
        "continuar",
    },
    {
      id: "liso_forma",
      observations: [
        [
          "forma_celular",
          "fusiforme",
        ],
      ],
      expectedLeader:
        "musculo_liso",
      expectedConfidence:
        "inicial",
      expectedDecision:
        "continuar",
    },
    {
      id: "estriado_forma",
      observations: [
        [
          "forma_celular",
          "cilindrica",
        ],
      ],
      expectedLeader:
        "musculo_estriado",
      expectedConfidence:
        "inicial",
      expectedDecision:
        "continuar",
    },
  ];
