export const equipamentosMicroscopia = {
  optico: {
    titulo: "Microscópio óptico",
    subtitulo: "Lâminas delgadas e material translúcido",
    partes: [
      {
        id: "ocular",
        nome: "Ocular",
        funcao: "Lente pela qual a imagem ampliada é observada.",
        x: 46,
        y: 16,
      },
      {
        id: "revolver",
        nome: "Revólver",
        funcao: "Sustenta as objetivas e permite alternar o aumento.",
        x: 44,
        y: 33,
      },
      {
        id: "objetivas",
        nome: "Objetivas",
        funcao: "Lentes que produzem a ampliação principal da preparação.",
        x: 40,
        y: 44,
      },
      {
        id: "platina",
        nome: "Platina",
        funcao: "Base onde a lâmina é apoiada e movimentada.",
        x: 37,
        y: 55,
      },
      {
        id: "diafragma",
        nome: "Condensador e diafragma",
        funcao: "Concentram e regulam a luz que atravessa a lâmina.",
        x: 43,
        y: 66,
      },
      {
        id: "foco",
        nome: "Macrométrico e micrométrico",
        funcao: "Ajustam a nitidez; um aproxima rapidamente e o outro refina o foco.",
        x: 63,
        y: 50,
      },
      {
        id: "luz",
        nome: "Fonte de luz",
        funcao: "Ilumina a preparação por baixo da platina.",
        x: 49,
        y: 66,
      },
      {
        id: "base",
        nome: "Base",
        funcao: "Dá estabilidade ao microscópio durante a observação.",
        x: 48,
        y: 74,
      },
    ],
  },
  estereoscopico: {
    titulo: "Microscópio estereoscópico",
    subtitulo: "Objetos inteiros, superfícies e material tridimensional",
    partes: [
      {
        id: "oculares",
        nome: "Oculares",
        funcao: "Permitem observação binocular e sensação de profundidade.",
        x: 45,
        y: 16,
      },
      {
        id: "cabecote",
        nome: "Cabeçote binocular",
        funcao: "Sustenta as oculares e direciona a imagem para os dois olhos.",
        x: 45,
        y: 32,
      },
      {
        id: "zoom",
        nome: "Zoom ou objetiva",
        funcao: "Controla o aumento usado para observar o exemplar.",
        x: 41,
        y: 48,
      },
      {
        id: "foco",
        nome: "Botão de foco",
        funcao: "Move o conjunto óptico para deixar o material nítido.",
        x: 72,
        y: 42,
      },
      {
        id: "platina",
        nome: "Platina ou base de observação",
        funcao: "Local onde o exemplar, placa ou bandeja é colocado.",
        x: 40,
        y: 63,
      },
      {
        id: "iluminacao-superior",
        nome: "Iluminação incidente",
        funcao: "Luz usada para observar relevo e superfície do material, posicionada entre a base e a objetiva no equipamento do laboratório.",
        x: 54,
        y: 52,
      },
      {
        id: "braco",
        nome: "Braço",
        funcao: "Sustenta o cabeçote e mantém a distância de trabalho.",
        x: 64,
        y: 63,
      },
      {
        id: "base",
        nome: "Base",
        funcao: "Estabiliza o equipamento e pode conter iluminação inferior.",
        x: 49,
        y: 84,
      },
    ],
  },
};

export const coresReferenciaMicroscopia = [
  { id: "numero-1", nome: "Número 1", valor: "#c65a2e" },
  { id: "numero-2", nome: "Número 2", valor: "#1f5d78" },
  { id: "numero-3", nome: "Número 3", valor: "#2563eb" },
  { id: "numero-4", nome: "Número 4", valor: "#0f766e" },
  { id: "numero-5", nome: "Número 5", valor: "#7c3aed" },
  { id: "numero-6", nome: "Número 6", valor: "#be123c" },
  { id: "numero-7", nome: "Número 7", valor: "#15803d" },
  { id: "numero-8", nome: "Número 8", valor: "#a16207" },
];

export function corReferenciaMicroscopia(index) {
  return coresReferenciaMicroscopia[index % coresReferenciaMicroscopia.length];
}
