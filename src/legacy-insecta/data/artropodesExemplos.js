const base = "/figuras/artropodes-exemplos";

export const artropodesExemplos = [
  {
    id: "insecta",
    imageId: "artropodes_exemplo_insecta",
    resultado: "INSECTA",
    taxon: "Insecta",
    titulo: "Exemplos de insetos",
    legenda: "Besouro, gafanhoto e mosca como exemplos de insetos.",
    src: `${base}/insecta-exemplos.png`,
  },
  {
    id: "crustacea",
    imageId: "artropodes_exemplo_crustacea",
    resultado: "CRUSTACEA",
    taxon: "Crustacea",
    titulo: "Exemplos de crustáceos",
    legenda: "Camarão, caranguejo e isópode como exemplos de crustáceos.",
    src: `${base}/crustacea-exemplos.png`,
  },
  {
    id: "diplopoda",
    imageId: "artropodes_exemplo_diplopoda",
    resultado: "DIPLOPODA",
    taxon: "Diplopoda",
    titulo: "Exemplo de diplópode",
    legenda: "Diplópode com corpo alongado e muitos segmentos.",
    src: `${base}/diplopoda-exemplo.png`,
  },
  {
    id: "chilopoda",
    imageId: "artropodes_exemplo_chilopoda",
    resultado: "CHILOPODA",
    taxon: "Chilopoda",
    titulo: "Exemplo de quilópode",
    legenda: "Quilópode com corpo segmentado e um par de pernas por segmento.",
    src: `${base}/chilopoda-exemplo.png`,
  },
  {
    id: "arachnida",
    imageId: "artropodes_exemplo_arachnida",
    resultado: "ARACHNIDA",
    taxon: "Arachnida",
    titulo: "Exemplo de aracnídeo",
    legenda: "Aranha como exemplo de aracnídeo.",
    src: `${base}/arachnida-exemplo.png`,
  },
];

const exemplosPorResultado = new Map(
  artropodesExemplos.map((exemplo) => [exemplo.resultado, exemplo])
);

function normalizarResultado(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();
}

export function obterExemploArtropodePorResultado(resultado) {
  const chave = normalizarResultado(resultado);

  if (exemplosPorResultado.has(chave)) {
    return exemplosPorResultado.get(chave);
  }

  return null;
}
