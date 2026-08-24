export const ordensInsecta = {
  id: "ordens-insecta",

  name: "Ordens de Insecta",

  domain: "zoologia",

  description:
    "Investigação de ordens de insetos baseada em evidências morfológicas.",

  observations: [
    {
      structure: "asas",
      label: "Asas",

      values: [
        "elitros",
        "1_par_funcional",
        "2_pares_membranosos",
      ],
    },

    {
      structure: "antena",
      label: "Antena",

      values: [
        "aristada",
        "filiforme",
        "geniculada",
        "clavada",
      ],
    },

    {
      structure: "aparelho_bucal",
      label: "Aparelho Bucal",

      values: [
        "mastigador",
        "sugador",
        "picador_sugador",
      ],
    },
  ],

  hypotheses: [
    {
      id: "coleoptera",
      name: "Coleoptera",
    },

    {
      id: "diptera",
      name: "Diptera",
    },

    {
      id: "hymenoptera",
      name: "Hymenoptera",
    },
  ],

  rules: [
    // ==========================
    // COLEOPTERA
    // ==========================

    {
      hypothesis: "coleoptera",
      structure: "asas",
      value: "elitros",
      effect: "positive",
      weight: 5,
    },

    {
      hypothesis: "coleoptera",
      structure: "antena",
      value: "clavada",
      effect: "positive",
      weight: 3,
    },

    {
      hypothesis: "coleoptera",
      structure: "aparelho_bucal",
      value: "mastigador",
      effect: "positive",
      weight: 2,
    },

    {
      hypothesis: "coleoptera",
      structure: "asas",
      value: "1_par_funcional",
      effect: "negative",
      weight: 5,
    },

    // ==========================
    // DIPTERA
    // ==========================

    {
      hypothesis: "diptera",
      structure: "asas",
      value: "1_par_funcional",
      effect: "positive",
      weight: 5,
    },

    {
      hypothesis: "diptera",
      structure: "antena",
      value: "aristada",
      effect: "positive",
      weight: 3,
    },

    {
      hypothesis: "diptera",
      structure: "aparelho_bucal",
      value: "sugador",
      effect: "positive",
      weight: 2,
    },

    {
      hypothesis: "diptera",
      structure: "asas",
      value: "elitros",
      effect: "negative",
      weight: 5,
    },

    // ==========================
    // HYMENOPTERA
    // ==========================

    {
      hypothesis: "hymenoptera",
      structure: "asas",
      value: "2_pares_membranosos",
      effect: "positive",
      weight: 4,
    },

    {
      hypothesis: "hymenoptera",
      structure: "antena",
      value: "geniculada",
      effect: "positive",
      weight: 3,
    },

    {
      hypothesis: "hymenoptera",
      structure: "aparelho_bucal",
      value: "mastigador",
      effect: "positive",
      weight: 2,
    },

    {
      hypothesis: "hymenoptera",
      structure: "asas",
      value: "elitros",
      effect: "negative",
      weight: 4,
    },
  ],
};