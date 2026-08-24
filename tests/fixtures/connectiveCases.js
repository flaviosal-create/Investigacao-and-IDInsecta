export const connectiveRepresentativeCases =
  [
    {
      expected: "conjuntivo_frouxo",
      observations: [
        [
          "organizacao_matriz",
          "frouxa",
        ],
        [
          "substancia_fundamental",
          "abundante",
        ],
        [
          "tipo_celular_predominante",
          "fibroblastos",
        ],
      ],
    },
    {
      expected: "conjuntivo_denso",
      observations: [
        [
          "fibras_extracelulares",
          "colagenas_abundantes",
        ],
        [
          "organizacao_matriz",
          "feixes_espessos",
        ],
        [
          "substancia_fundamental",
          "escassa",
        ],
      ],
    },
    {
      expected: "cartilagem_hialina",
      observations: [
        [
          "organizacao_matriz",
          "homogenea",
        ],
        [
          "tipo_celular_predominante",
          "condrocitos",
        ],
        [
          "cavidades_matriz",
          "lacunas_condrocitarias",
        ],
        [
          "vascularizacao",
          "ausente",
        ],
      ],
    },
    {
      expected: "cartilagem_elastica",
      observations: [
        [
          "fibras_extracelulares",
          "elasticas_abundantes",
        ],
        [
          "tipo_celular_predominante",
          "condrocitos",
        ],
        [
          "cavidades_matriz",
          "lacunas_condrocitarias",
        ],
        [
          "pericondrio",
          "presente",
        ],
      ],
    },
    {
      expected: "tecido_osseo_compacto",
      observations: [
        [
          "organizacao_matriz",
          "lamelas_concentricas",
        ],
        [
          "substancia_fundamental",
          "mineralizada",
        ],
        [
          "tipo_celular_predominante",
          "osteocitos",
        ],
        [
          "cavidades_matriz",
          "osteoplastos",
        ],
      ],
    },
    {
      expected: "tecido_hematopoietico",
      observations: [
        [
          "organizacao_matriz",
          "cordoes_celulares",
        ],
        [
          "celularidade",
          "alta",
        ],
        [
          "vascularizacao",
          "evidente",
        ],
        [
          "tipo_celular_predominante",
          "celulas_hematopoieticas",
        ],
      ],
    },
    {
      expected: "fibrocartilagem",
      observations: [
        [
          "fibras_extracelulares",
          "colagenas_abundantes",
        ],
        [
          "tipo_celular_predominante",
          "condrocitos",
        ],
        [
          "cavidades_matriz",
          "lacunas_condrocitarias",
        ],
        [
          "pericondrio",
          "ausente",
        ],
      ],
    },
    {
      expected: "tecido_osseo_esponjoso",
      observations: [
        [
          "organizacao_matriz",
          "trabeculas",
        ],
        [
          "substancia_fundamental",
          "mineralizada",
        ],
        [
          "tipo_celular_predominante",
          "osteocitos",
        ],
        [
          "cavidades_matriz",
          "osteoplastos",
        ],
      ],
    },
    {
      expected: "tecido_adiposo",
      observations: [
        [
          "organizacao_matriz",
          "lobular",
        ],
        [
          "substancia_fundamental",
          "lipidica",
        ],
        [
          "tipo_celular_predominante",
          "adipocitos",
        ],
        [
          "vascularizacao",
          "evidente",
        ],
      ],
    },
  ];

export const connectiveAmbiguousCases =
  [
    {
      observations: [
        [
          "tipo_celular_predominante",
          "condrocitos",
        ],
        [
          "cavidades_matriz",
          "lacunas_condrocitarias",
        ],
      ],
      expectedLeader: "cartilagem_hialina",
      expectedRunnerUp: "cartilagem_elastica",
      expectedDecision: "continuar",
    },
    {
      observations: [
        [
          "tipo_celular_predominante",
          "fibroblastos",
        ],
        [
          "cavidades_matriz",
          "ausentes",
        ],
      ],
      expectedLeader: "conjuntivo_frouxo",
      expectedRunnerUp: "conjuntivo_denso",
      expectedDecision: "continuar",
    },
  ];

export const connectiveMixedCases =
  [
    {
      observations: [
        [
          "organizacao_matriz",
          "frouxa",
        ],
      ],
      expectedLeader: "conjuntivo_frouxo",
      expectedConfidence: "promissora",
      expectedDecision: "continuar",
    },
    {
      observations: [
        [
          "organizacao_matriz",
          "lamelas_concentricas",
        ],
      ],
      expectedLeader: "tecido_osseo_compacto",
      expectedConfidence: "promissora",
      expectedDecision: "continuar",
    },
    {
      observations: [
        [
          "organizacao_matriz",
          "cordoes_celulares",
        ],
      ],
      expectedLeader: "tecido_hematopoietico",
      expectedConfidence: "promissora",
      expectedDecision: "continuar",
    },
    {
      observations: [
        [
          "organizacao_matriz",
          "lobular",
        ],
      ],
      expectedLeader: "tecido_adiposo",
      expectedConfidence: "promissora",
      expectedDecision: "continuar",
    },
  ];
