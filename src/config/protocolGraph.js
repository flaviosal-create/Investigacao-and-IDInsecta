export const protocolGraph = {
  "grupos-invertebrados-v1": {
    porifera: "classes-porifera-v1",
    cnidaria: "classes-cnidaria-v1",
    annelida: "classes-annelida-v1",
    mollusca: "classes-mollusca-v1",
    arthropoda: "classes-arthropoda-v1",
    echinodermata: "classes-echinodermata-v1",
  },

  "classes-arthropoda-v1": {
    insecta: "ordens-insecta-v1",
  },

  "ordens-insecta-v1": {
    coleoptera: "familias-coleoptera-v1",
  },

  "grandes-grupos-vegetais-v1": {
    angiospermas:
      "grandes-grupos-angiospermas-v1",
  },

  "grandes-grupos-angiospermas-v1": {
    monocotiledoneas:
      "ordens-angiospermas-brasil-v1",

    eudicotiledoneas:
      "ordens-angiospermas-brasil-v1",

    magnoliideas:
      "ordens-angiospermas-brasil-v1",
  },

  "ordens-angiospermas-brasil-v1": {
    poales:
      "familias-angiospermas-brasil-v1",

    fabales:
      "familias-angiospermas-brasil-v1",

    myrtales:
      "familias-angiospermas-brasil-v1",

    lamiales:
      "familias-angiospermas-brasil-v1",

    solanales:
      "familias-angiospermas-brasil-v1",

    asterales:
      "familias-angiospermas-brasil-v1",
  },

  "familias-angiospermas-brasil-v1": {
    fabaceae:
      "generos-fabaceae-brasil-v1",

    asteraceae:
      "generos-asteraceae-brasil-v1",

    poaceae:
      "generos-poaceae-brasil-v1",
  },

  "tecidos-basicos-v1": {
    epitelio:
      "epitelios-revestimento-v1",

    tecido_muscular:
      "musculo-liso-estriado-v1",

    tecido_conjuntivo:
      "conjuntivo-frouxo-denso-v1",
  },
};
