import { normalizeProtocol } from "../normalizeProtocol.js";

const rawTecidosBasicosV1 = {
  id: "tecidos-basicos-v1",
  name: "Tipos de Tecido",
  domain: "histologia",
  description:
    "Investigação de tipos de tecido com base em características morfológicas, celulares e estruturais observáveis.",
  observations: [
    {
      structure: "organizacao_celular",
      label: "Organização celular",
      negativeWeightFactor: 0.8,
      values: [
        "celulas_justapostas",
        "celulas_fusas",
        "celulas_dispersas",
        "celulas_em_lacunas",
        "adipocitos",
        "elementos_sanguineos",
      ],
    },
    {
      structure: "matriz_extracelular",
      label: "Matriz extracelular",
      negativeWeightFactor: 0.75,
      values: [
        "escassa",
        "abundante",
        "moderada",
        "mineralizada",
        "liquida",
      ],
    },
    {
      structure: "lamina_basal",
      label: "Lâmina basal",
      negativeWeightFactor: 0.85,
      values: [
        "presente",
        "ausente",
      ],
    },
    {
      structure: "nucleos",
      label: "Núcleos",
      negativeWeightFactor: 0.8,
      values: [
        "centrais",
        "perifericos",
        "achatados",
      ],
    },
    {
      structure: "estriacoes",
      label: "Estriações",
      negativeWeightFactor: 0.85,
      values: [
        "presentes",
        "ausentes",
      ],
    },
    {
      structure:
        "prolongamentos_celulares",
      label:
        "Prolongamentos celulares",
      negativeWeightFactor: 0.85,
      values: [
        "evidentes",
        "ausentes",
      ],
    },
    {
      structure:
        "fibras_extracelulares",
      label:
        "Fibras extracelulares",
      negativeWeightFactor: 0.8,
      values: [
        "evidentes",
        "discretas",
        "ausentes",
      ],
    },
    {
      structure: "arranjo_tecidual",
      label: "Arranjo tecidual",
      negativeWeightFactor: 0.8,
      values: [
        "revestimento_continuo",
        "suporte_matricial",
        "feixes_contrateis",
        "rede_com_prolongamentos",
        "elementos_em_suspensao",
      ],
    },
    {
      structure:
        "tipo_celular_predominante",
      label:
        "Tipo celular predominante",
      negativeWeightFactor: 0.8,
      values: [
        "celulas_epiteliais",
        "fibroblastos_ou_correlatas",
        "miocitos",
        "neuronios_ou_glia",
        "condrocitos",
        "osteocitos_ou_osteoblastos",
        "adipocitos",
        "hemacias_ou_leucocitos",
      ],
    },
    {
      structure:
        "especializacao_conjuntiva",
      label:
        "Especialização conjuntiva",
      negativeWeightFactor: 0.8,
      values: [
        "cartilagem_hialina",
        "tecido_osseo_compacto",
        "tecido_adiposo",
        "sangue",
      ],
    },
  ],
  hypotheses: [
    {
      id: "epitelio",
      name: "Epitélio",
      level: "tecido",
      clue:
        "Procure células justapostas, pouca matriz extracelular e presença de lâmina basal.",
    },
    {
      id: "tecido_conjuntivo",
      name: "Tecido conjuntivo",
      level: "tecido",
      clue:
        "A pista mais forte é a matriz extracelular abundante com células mais dispersas.",
    },
    {
      id: "tecido_muscular",
      name: "Tecido muscular",
      level: "tecido",
      clue:
        "Células fusas ou fibras alongadas, núcleos característicos e possível presença de estriações fortalecem essa hipótese.",
    },
    {
      id: "tecido_nervoso",
      name: "Tecido nervoso",
      level: "tecido",
      clue:
        "Prolongamentos celulares evidentes e núcleos centrais ajudam a diferenciar este tecido dos demais.",
    },
    {
      id: "tecido_cartilaginoso",
      name: "Tecido cartilaginoso",
      level: "tecido",
      clue:
        "Condrócitos em lacunas, matriz firme e aspecto de suporte favorecem tecido cartilaginoso.",
    },
    {
      id: "tecido_osseo",
      name: "Tecido ósseo",
      level: "tecido",
      clue:
        "Matriz mineralizada, células em lacunas e organização de suporte fortalecem tecido ósseo.",
    },
    {
      id: "tecido_adiposo",
      name: "Tecido adiposo",
      level: "tecido",
      clue:
        "Predomínio de adipócitos, pouca matriz intercelular e organização conjuntiva sustentam tecido adiposo.",
    },
    {
      id: "sangue",
      name: "Sangue",
      level: "tecido",
      clue:
        "Elementos celulares suspensos em matriz líquida favorecem sangue como tecido conjuntivo especializado.",
    },
  ],
  rules: [
    {
      hypothesis: "epitelio",
      structure: "organizacao_celular",
      value: "celulas_justapostas",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "epitelio",
      structure: "matriz_extracelular",
      value: "escassa",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "epitelio",
      structure: "lamina_basal",
      value: "presente",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "epitelio",
      structure: "nucleos",
      value: "achatados",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "epitelio",
      structure: "estriacoes",
      value: "ausentes",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis: "epitelio",
      structure:
        "prolongamentos_celulares",
      value: "ausentes",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis: "epitelio",
      structure:
        "fibras_extracelulares",
      value: "ausentes",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis: "epitelio",
      structure: "arranjo_tecidual",
      value: "revestimento_continuo",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "epitelio",
      structure:
        "tipo_celular_predominante",
      value: "celulas_epiteliais",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "organizacao_celular",
      value: "celulas_dispersas",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "matriz_extracelular",
      value: "abundante",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "matriz_extracelular",
      value: "moderada",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "lamina_basal",
      value: "ausente",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "nucleos",
      value: "centrais",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "estriacoes",
      value: "ausentes",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure:
        "prolongamentos_celulares",
      value: "ausentes",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure:
        "fibras_extracelulares",
      value: "evidentes",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure:
        "fibras_extracelulares",
      value: "discretas",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "arranjo_tecidual",
      value: "suporte_matricial",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure:
        "tipo_celular_predominante",
      value:
        "fibroblastos_ou_correlatas",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "organizacao_celular",
      value: "celulas_fusas",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "matriz_extracelular",
      value: "escassa",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "matriz_extracelular",
      value: "moderada",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "nucleos",
      value: "perifericos",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "nucleos",
      value: "centrais",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "estriacoes",
      value: "presentes",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "tecido_muscular",
      structure:
        "prolongamentos_celulares",
      value: "ausentes",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis: "tecido_muscular",
      structure:
        "fibras_extracelulares",
      value: "ausentes",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "arranjo_tecidual",
      value: "feixes_contrateis",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "tecido_muscular",
      structure:
        "tipo_celular_predominante",
      value: "miocitos",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "organizacao_celular",
      value: "celulas_dispersas",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "matriz_extracelular",
      value: "escassa",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "lamina_basal",
      value: "ausente",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "nucleos",
      value: "centrais",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "estriacoes",
      value: "ausentes",
      effect: "positive",
      weight: 1,
    },
    {
      hypothesis: "tecido_nervoso",
      structure:
        "prolongamentos_celulares",
      value: "evidentes",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "tecido_nervoso",
      structure:
        "fibras_extracelulares",
      value: "ausentes",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "arranjo_tecidual",
      value: "rede_com_prolongamentos",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "tecido_nervoso",
      structure:
        "tipo_celular_predominante",
      value: "neuronios_ou_glia",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "tecido_cartilaginoso",
      structure: "organizacao_celular",
      value: "celulas_em_lacunas",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "tecido_cartilaginoso",
      structure: "matriz_extracelular",
      value: "abundante",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "tecido_cartilaginoso",
      structure:
        "fibras_extracelulares",
      value: "discretas",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "tecido_cartilaginoso",
      structure: "arranjo_tecidual",
      value: "suporte_matricial",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "tecido_cartilaginoso",
      structure:
        "tipo_celular_predominante",
      value: "condrocitos",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "tecido_cartilaginoso",
      structure:
        "especializacao_conjuntiva",
      value: "cartilagem_hialina",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "tecido_osseo",
      structure: "organizacao_celular",
      value: "celulas_em_lacunas",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "tecido_osseo",
      structure: "matriz_extracelular",
      value: "mineralizada",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "tecido_osseo",
      structure:
        "fibras_extracelulares",
      value: "evidentes",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "tecido_osseo",
      structure: "arranjo_tecidual",
      value: "suporte_matricial",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "tecido_osseo",
      structure:
        "tipo_celular_predominante",
      value:
        "osteocitos_ou_osteoblastos",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "tecido_osseo",
      structure:
        "especializacao_conjuntiva",
      value: "tecido_osseo_compacto",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "tecido_adiposo",
      structure: "organizacao_celular",
      value: "adipocitos",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "tecido_adiposo",
      structure: "matriz_extracelular",
      value: "escassa",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "tecido_adiposo",
      structure: "lamina_basal",
      value: "ausente",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "tecido_adiposo",
      structure:
        "fibras_extracelulares",
      value: "discretas",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "tecido_adiposo",
      structure: "arranjo_tecidual",
      value: "suporte_matricial",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "tecido_adiposo",
      structure:
        "tipo_celular_predominante",
      value: "adipocitos",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "tecido_adiposo",
      structure:
        "especializacao_conjuntiva",
      value: "tecido_adiposo",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "sangue",
      structure: "organizacao_celular",
      value: "elementos_sanguineos",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "sangue",
      structure: "matriz_extracelular",
      value: "liquida",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "sangue",
      structure: "lamina_basal",
      value: "ausente",
      effect: "positive",
      weight: 2,
    },
    {
      hypothesis: "sangue",
      structure:
        "fibras_extracelulares",
      value: "ausentes",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "sangue",
      structure: "arranjo_tecidual",
      value: "elementos_em_suspensao",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "sangue",
      structure:
        "tipo_celular_predominante",
      value: "hemacias_ou_leucocitos",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "sangue",
      structure:
        "especializacao_conjuntiva",
      value: "sangue",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "epitelio",
      structure: "organizacao_celular",
      value: "celulas_fusas",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "epitelio",
      structure: "organizacao_celular",
      value: "celulas_dispersas",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "epitelio",
      structure: "matriz_extracelular",
      value: "abundante",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "epitelio",
      structure: "lamina_basal",
      value: "ausente",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "epitelio",
      structure: "estriacoes",
      value: "presentes",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "epitelio",
      structure:
        "prolongamentos_celulares",
      value: "evidentes",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "epitelio",
      structure:
        "fibras_extracelulares",
      value: "evidentes",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "epitelio",
      structure: "arranjo_tecidual",
      value: "suporte_matricial",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "epitelio",
      structure: "arranjo_tecidual",
      value: "feixes_contrateis",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "epitelio",
      structure: "arranjo_tecidual",
      value: "rede_com_prolongamentos",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "organizacao_celular",
      value: "celulas_justapostas",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "lamina_basal",
      value: "presente",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "matriz_extracelular",
      value: "escassa",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "estriacoes",
      value: "presentes",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure:
        "prolongamentos_celulares",
      value: "evidentes",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure:
        "fibras_extracelulares",
      value: "ausentes",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "arranjo_tecidual",
      value: "revestimento_continuo",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "arranjo_tecidual",
      value: "feixes_contrateis",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_conjuntivo",
      structure: "arranjo_tecidual",
      value: "rede_com_prolongamentos",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "organizacao_celular",
      value: "celulas_justapostas",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "organizacao_celular",
      value: "celulas_dispersas",
      effect: "negative",
      weight: 1,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "matriz_extracelular",
      value: "abundante",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "lamina_basal",
      value: "ausente",
      effect: "negative",
      weight: 1,
    },
    {
      hypothesis: "tecido_muscular",
      structure:
        "prolongamentos_celulares",
      value: "evidentes",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_muscular",
      structure:
        "fibras_extracelulares",
      value: "evidentes",
      effect: "negative",
      weight: 1,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "arranjo_tecidual",
      value: "revestimento_continuo",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "arranjo_tecidual",
      value: "suporte_matricial",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "tecido_muscular",
      structure: "arranjo_tecidual",
      value: "rede_com_prolongamentos",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "organizacao_celular",
      value: "celulas_justapostas",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "organizacao_celular",
      value: "celulas_fusas",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "matriz_extracelular",
      value: "abundante",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "lamina_basal",
      value: "presente",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "nucleos",
      value: "perifericos",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "estriacoes",
      value: "presentes",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "arranjo_tecidual",
      value: "revestimento_continuo",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "arranjo_tecidual",
      value: "suporte_matricial",
      effect: "negative",
      weight: 2,
    },
    {
      hypothesis: "tecido_nervoso",
      structure: "arranjo_tecidual",
      value: "feixes_contrateis",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "tecido_nervoso",
      structure:
        "prolongamentos_celulares",
      value: "ausentes",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "tecido_nervoso",
      structure:
        "fibras_extracelulares",
      value: "evidentes",
      effect: "negative",
      weight: 3,
    },
  ],
};

export const tecidosBasicosV1 =
  normalizeProtocol(
    rawTecidosBasicosV1
  );
