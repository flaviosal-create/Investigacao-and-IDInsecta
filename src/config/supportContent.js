const bibliographyByDomain = {
  zoologia: [
    "Rafael et al. - Insetos do Brasil: Diversidade e Taxonomia.",
    "Gullan & Cranston - The Insects: An Outline of Entomology.",
    "Triplehorn & Johnson - Estudo dos Insetos.",
  ],
  botanica: [
    "Souza & Lorenzi - Botânica Sistemática.",
    "Judd et al. - Plant Systematics: A Phylogenetic Approach.",
    "APG IV - Classificação filogenética das angiospermas.",
  ],
  histologia: [
    "Junqueira & Carneiro - Histologia Básica.",
    "Ross & Pawlina - Histologia: Texto e Atlas.",
    "Gartner & Hiatt - Tratado de Histologia.",
  ],
};

const supportNotesByDomain = {
  zoologia:
    "Use as imagens e caracteres como apoio à observação, mantendo cada ordem como hipótese dentro do mesmo universo.",
  botanica:
    "Observe combinações de caracteres vegetativos e reprodutivos sem transformar o protocolo em chave dicotômica.",
  histologia:
    "Leia tecidos, células e arranjos como evidências que sustentam hipóteses, não como etapas obrigatórias.",
};

export function buildSupportContent(
  protocol
) {
  if (!protocol) {
    return {
      concepts: [],
      bibliography: [],
      note:
        "Escolha um protocolo para carregar o apoio contextual.",
    };
  }

  return {
    concepts: protocol.observations.map(
      (observation) => ({
        label: observation.label,
        totalValues:
          observation.values.length,
      })
    ),
    bibliography:
      protocol.references?.length
        ? protocol.references
        : bibliographyByDomain[
            protocol.domain
          ] ?? [],
    note:
      protocol.pedagogicalNote ??
      supportNotesByDomain[
        protocol.domain
      ] ??
      "Apoio geral para leitura investigativa do protocolo.",
  };
}
