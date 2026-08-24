export const histologyRepresentativeCases =
  [
    {
      expected: "epitelio",
      observations: [
        [
          "organizacao_celular",
          "celulas_justapostas",
        ],
        [
          "matriz_extracelular",
          "escassa",
        ],
        [
          "lamina_basal",
          "presente",
        ],
        [
          "arranjo_tecidual",
          "revestimento_continuo",
        ],
      ],
    },
    {
      expected: "epitelio",
      observations: [
        [
          "organizacao_celular",
          "celulas_justapostas",
        ],
        [
          "nucleos",
          "achatados",
        ],
        [
          "estriacoes",
          "ausentes",
        ],
      ],
    },
    {
      expected: "epitelio",
      observations: [
        [
          "organizacao_celular",
          "celulas_justapostas",
        ],
        [
          "lamina_basal",
          "presente",
        ],
        [
          "matriz_extracelular",
          "escassa",
        ],
        [
          "estriacoes",
          "ausentes",
        ],
      ],
    },
    {
      expected: "tecido_conjuntivo",
      observations: [
        [
          "organizacao_celular",
          "celulas_dispersas",
        ],
        [
          "matriz_extracelular",
          "abundante",
        ],
        [
          "lamina_basal",
          "ausente",
        ],
        [
          "arranjo_tecidual",
          "suporte_matricial",
        ],
      ],
    },
    {
      expected: "tecido_conjuntivo",
      observations: [
        [
          "organizacao_celular",
          "celulas_dispersas",
        ],
        [
          "matriz_extracelular",
          "moderada",
        ],
        [
          "lamina_basal",
          "ausente",
        ],
      ],
    },
    {
      expected: "tecido_conjuntivo",
      observations: [
        [
          "organizacao_celular",
          "celulas_dispersas",
        ],
        [
          "matriz_extracelular",
          "abundante",
        ],
        [
          "nucleos",
          "centrais",
        ],
        [
          "estriacoes",
          "ausentes",
        ],
      ],
    },
    {
      expected: "tecido_conjuntivo",
      observations: [
        [
          "organizacao_celular",
          "celulas_dispersas",
        ],
        [
          "nucleos",
          "centrais",
        ],
        [
          "fibras_extracelulares",
          "evidentes",
        ],
      ],
    },
    {
      expected: "tecido_muscular",
      observations: [
        [
          "organizacao_celular",
          "celulas_fusas",
        ],
        [
          "nucleos",
          "perifericos",
        ],
        [
          "estriacoes",
          "presentes",
        ],
        [
          "arranjo_tecidual",
          "feixes_contrateis",
        ],
      ],
    },
    {
      expected: "tecido_muscular",
      observations: [
        [
          "organizacao_celular",
          "celulas_fusas",
        ],
        [
          "nucleos",
          "centrais",
        ],
        [
          "matriz_extracelular",
          "escassa",
        ],
      ],
    },
    {
      expected: "tecido_muscular",
      observations: [
        [
          "organizacao_celular",
          "celulas_fusas",
        ],
        [
          "nucleos",
          "perifericos",
        ],
        [
          "estriacoes",
          "presentes",
        ],
        [
          "matriz_extracelular",
          "moderada",
        ],
      ],
    },
    {
      expected: "tecido_nervoso",
      observations: [
        [
          "prolongamentos_celulares",
          "evidentes",
        ],
        [
          "nucleos",
          "centrais",
        ],
        [
          "matriz_extracelular",
          "escassa",
        ],
        [
          "arranjo_tecidual",
          "rede_com_prolongamentos",
        ],
      ],
    },
    {
      expected: "tecido_nervoso",
      observations: [
        [
          "organizacao_celular",
          "celulas_dispersas",
        ],
        [
          "prolongamentos_celulares",
          "evidentes",
        ],
        [
          "nucleos",
          "centrais",
        ],
        [
          "lamina_basal",
          "ausente",
        ],
      ],
    },
    {
      expected: "tecido_nervoso",
      observations: [
        [
          "organizacao_celular",
          "celulas_dispersas",
        ],
        [
          "nucleos",
          "centrais",
        ],
        [
          "fibras_extracelulares",
          "ausentes",
        ],
      ],
    },
    {
      expected:
        "tecido_cartilaginoso",
      observations: [
        [
          "organizacao_celular",
          "celulas_em_lacunas",
        ],
        [
          "matriz_extracelular",
          "abundante",
        ],
        [
          "tipo_celular_predominante",
          "condrocitos",
        ],
        [
          "especializacao_conjuntiva",
          "cartilagem_hialina",
        ],
      ],
    },
    {
      expected: "tecido_osseo",
      observations: [
        [
          "organizacao_celular",
          "celulas_em_lacunas",
        ],
        [
          "matriz_extracelular",
          "mineralizada",
        ],
        [
          "tipo_celular_predominante",
          "osteocitos_ou_osteoblastos",
        ],
        [
          "especializacao_conjuntiva",
          "tecido_osseo_compacto",
        ],
      ],
    },
    {
      expected: "tecido_adiposo",
      observations: [
        [
          "organizacao_celular",
          "adipocitos",
        ],
        [
          "matriz_extracelular",
          "escassa",
        ],
        [
          "tipo_celular_predominante",
          "adipocitos",
        ],
        [
          "especializacao_conjuntiva",
          "tecido_adiposo",
        ],
      ],
    },
    {
      expected: "sangue",
      observations: [
        [
          "organizacao_celular",
          "elementos_sanguineos",
        ],
        [
          "matriz_extracelular",
          "liquida",
        ],
        [
          "arranjo_tecidual",
          "elementos_em_suspensao",
        ],
        [
          "tipo_celular_predominante",
          "hemacias_ou_leucocitos",
        ],
      ],
    },
  ];

export const histologyAmbiguousCases =
  [
    {
      id: "epitelio_vs_muscular",
      observations: [
        [
          "matriz_extracelular",
          "escassa",
        ],
      ],
      expectedLeader: "epitelio",
      expectedRunnerUp:
        "tecido_muscular",
      expectedDecision:
        "continuar",
    },
    {
      id: "conjuntivo_vs_muscular",
      observations: [
        [
          "matriz_extracelular",
          "moderada",
        ],
        [
          "nucleos",
          "centrais",
        ],
      ],
      expectedLeader:
        "tecido_conjuntivo",
      expectedRunnerUp:
        "tecido_muscular",
      expectedDecision:
        "continuar",
    },
    {
      id: "epitelio_vs_conjuntivo",
      observations: [
        [
          "estriacoes",
          "ausentes",
        ],
      ],
      expectedLeader: "epitelio",
      expectedRunnerUp:
        "tecido_conjuntivo",
      expectedDecision:
        "continuar",
    },
    {
      id: "nervoso_vs_conjuntivo",
      observations: [
        [
          "organizacao_celular",
          "celulas_dispersas",
        ],
        [
          "nucleos",
          "centrais",
        ],
      ],
      expectedLeader:
        "tecido_conjuntivo",
      expectedRunnerUp:
        "tecido_nervoso",
      expectedDecision:
        "continuar",
    },
  ];

export const histologyMixedCases =
  [
    {
      id: "muscular_com_conflito_fraco",
      observations: [
        [
          "organizacao_celular",
          "celulas_fusas",
        ],
        [
          "nucleos",
          "centrais",
        ],
        [
          "matriz_extracelular",
          "escassa",
        ],
        [
          "lamina_basal",
          "ausente",
        ],
      ],
      expectedLeader:
        "tecido_muscular",
      expectedConfidence:
        "inicial",
      expectedDecision:
        "continuar",
    },
    {
      id: "epitelio_incompleto",
      observations: [
        [
          "organizacao_celular",
          "celulas_justapostas",
        ],
        [
          "estriacoes",
          "ausentes",
        ],
      ],
      expectedLeader: "epitelio",
      expectedConfidence:
        "promissora",
      expectedDecision:
        "continuar",
    },
    {
      id: "conjuntivo_incompleto",
      observations: [
        [
          "lamina_basal",
          "ausente",
        ],
        [
          "nucleos",
          "centrais",
        ],
      ],
      expectedLeader:
        "tecido_nervoso",
      expectedConfidence:
        "disputada",
      expectedDecision:
        "continuar",
    },
    {
      id: "nervoso_incompleto",
      observations: [
        [
          "prolongamentos_celulares",
          "evidentes",
        ],
        [
          "estriacoes",
          "ausentes",
        ],
      ],
      expectedLeader:
        "tecido_nervoso",
      expectedConfidence:
        "promissora",
      expectedDecision:
        "continuar",
    },
  ];
