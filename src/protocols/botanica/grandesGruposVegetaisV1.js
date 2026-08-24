import { normalizeProtocol } from "../normalizeProtocol.js";

const rawGrandesGruposVegetaisV1 = {
  id: "grandes-grupos-vegetais-v1",
  name: "Grandes Grupos Vegetais",
  domain: "botanica",
  description:
    "Investigação de grandes grupos vegetais com base em estruturas reprodutivas, organização do corpo e dependência hídrica do ciclo.",
  observations: [
    {
      structure: "conducao_vascular",
      label: "Condução vascular",
      negativeWeightFactor: 0.8,
      values: [
        "ausente",
        "presente",
      ],
    },
    {
      structure: "estrutura_reprodutiva",
      label: "Estrutura reprodutiva",
      negativeWeightFactor: 0.85,
      values: [
        "esporos",
        "sementes_nuas",
        "flores",
        "frutos",
      ],
    },
    {
      structure: "dependencia_de_agua",
      label: "Dependência de água para fecundação",
      negativeWeightFactor: 0.75,
      values: [
        "dependente",
        "independente",
      ],
    },
    {
      structure: "geracao_dominante",
      label: "Geração dominante",
      negativeWeightFactor: 0.75,
      values: [
        "gametofito",
        "esporofito",
      ],
    },
    {
      structure: "organizacao_do_corpo",
      label: "Organização do corpo",
      negativeWeightFactor: 0.8,
      values: [
        "sem_orgaos_verdadeiros",
        "raiz_caule_folha",
        "lenhoso_com_cones",
        "flor_e_fruto",
      ],
    },
  ],
  hypotheses: [
    {
      id: "briofitas",
      name: "Briófitas",
      level: "grupo",
      clue:
        "Ausência de vasos condutores, dominância do gametófito e dependência de água favorecem briófitas.",
    },
    {
      id: "pteridofitas",
      name: "Pteridófitas",
      level: "grupo",
      clue:
        "Vasos condutores com reprodução por esporos e dependência de água favorecem pteridófitas.",
    },
    {
      id: "gimnospermas",
      name: "Gimnospermas",
      level: "grupo",
      clue:
        "Sementes nuas, independência de água e organização lenhosa com cones sustentam gimnospermas.",
    },
    {
      id: "angiospermas",
      name: "Angiospermas",
      level: "grupo",
      clue:
        "Flores e frutos são as evidências mais fortes para angiospermas.",
    },
  ],
  rules: [
    {
      hypothesis: "briofitas",
      structure: "conducao_vascular",
      value: "ausente",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "briofitas",
      structure: "estrutura_reprodutiva",
      value: "esporos",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "briofitas",
      structure: "dependencia_de_agua",
      value: "dependente",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "briofitas",
      structure: "geracao_dominante",
      value: "gametofito",
      effect: "positive",
      weight: 6,
    },
    {
      hypothesis: "briofitas",
      structure: "organizacao_do_corpo",
      value: "sem_orgaos_verdadeiros",
      effect: "positive",
      weight: 5,
    },

    {
      hypothesis: "pteridofitas",
      structure: "conducao_vascular",
      value: "presente",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "pteridofitas",
      structure: "estrutura_reprodutiva",
      value: "esporos",
      effect: "positive",
      weight: 5,
    },
    {
      hypothesis: "pteridofitas",
      structure: "dependencia_de_agua",
      value: "dependente",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "pteridofitas",
      structure: "geracao_dominante",
      value: "esporofito",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "pteridofitas",
      structure: "organizacao_do_corpo",
      value: "raiz_caule_folha",
      effect: "positive",
      weight: 4,
    },

    {
      hypothesis: "gimnospermas",
      structure: "conducao_vascular",
      value: "presente",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "gimnospermas",
      structure: "estrutura_reprodutiva",
      value: "sementes_nuas",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "gimnospermas",
      structure: "dependencia_de_agua",
      value: "independente",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "gimnospermas",
      structure: "geracao_dominante",
      value: "esporofito",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "gimnospermas",
      structure: "organizacao_do_corpo",
      value: "lenhoso_com_cones",
      effect: "positive",
      weight: 6,
    },

    {
      hypothesis: "angiospermas",
      structure: "conducao_vascular",
      value: "presente",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "angiospermas",
      structure: "estrutura_reprodutiva",
      value: "flores",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "angiospermas",
      structure: "estrutura_reprodutiva",
      value: "frutos",
      effect: "positive",
      weight: 7,
    },
    {
      hypothesis: "angiospermas",
      structure: "dependencia_de_agua",
      value: "independente",
      effect: "positive",
      weight: 4,
    },
    {
      hypothesis: "angiospermas",
      structure: "geracao_dominante",
      value: "esporofito",
      effect: "positive",
      weight: 3,
    },
    {
      hypothesis: "angiospermas",
      structure: "organizacao_do_corpo",
      value: "flor_e_fruto",
      effect: "positive",
      weight: 6,
    },

    {
      hypothesis: "briofitas",
      structure: "conducao_vascular",
      value: "presente",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "briofitas",
      structure: "estrutura_reprodutiva",
      value: "sementes_nuas",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "briofitas",
      structure: "estrutura_reprodutiva",
      value: "flores",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "briofitas",
      structure: "estrutura_reprodutiva",
      value: "frutos",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "briofitas",
      structure: "dependencia_de_agua",
      value: "independente",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "briofitas",
      structure: "geracao_dominante",
      value: "esporofito",
      effect: "negative",
      weight: 3,
    },

    {
      hypothesis: "pteridofitas",
      structure: "conducao_vascular",
      value: "ausente",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "pteridofitas",
      structure: "estrutura_reprodutiva",
      value: "sementes_nuas",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "pteridofitas",
      structure: "estrutura_reprodutiva",
      value: "flores",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "pteridofitas",
      structure: "estrutura_reprodutiva",
      value: "frutos",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "pteridofitas",
      structure: "dependencia_de_agua",
      value: "independente",
      effect: "negative",
      weight: 3,
    },

    {
      hypothesis: "gimnospermas",
      structure: "conducao_vascular",
      value: "ausente",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "gimnospermas",
      structure: "estrutura_reprodutiva",
      value: "esporos",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "gimnospermas",
      structure: "estrutura_reprodutiva",
      value: "flores",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "gimnospermas",
      structure: "estrutura_reprodutiva",
      value: "frutos",
      effect: "negative",
      weight: 5,
    },
    {
      hypothesis: "gimnospermas",
      structure: "dependencia_de_agua",
      value: "dependente",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "gimnospermas",
      structure: "organizacao_do_corpo",
      value: "flor_e_fruto",
      effect: "negative",
      weight: 5,
    },

    {
      hypothesis: "angiospermas",
      structure: "conducao_vascular",
      value: "ausente",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "angiospermas",
      structure: "estrutura_reprodutiva",
      value: "esporos",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "angiospermas",
      structure: "estrutura_reprodutiva",
      value: "sementes_nuas",
      effect: "negative",
      weight: 4,
    },
    {
      hypothesis: "angiospermas",
      structure: "dependencia_de_agua",
      value: "dependente",
      effect: "negative",
      weight: 3,
    },
    {
      hypothesis: "angiospermas",
      structure: "organizacao_do_corpo",
      value: "lenhoso_com_cones",
      effect: "negative",
      weight: 4,
    },
  ],
};

export const grandesGruposVegetaisV1 =
  normalizeProtocol(
    rawGrandesGruposVegetaisV1
  );
