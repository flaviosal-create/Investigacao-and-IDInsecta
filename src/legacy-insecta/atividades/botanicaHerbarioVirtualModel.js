const habitoEuphorbiaceaeUrl = new URL(
  "../assets/botanica/exsicata-euphorbiaceae/habito-ambiente.jpg",
  import.meta.url,
).href;
const ramoEuphorbiaceaeUrl = new URL(
  "../assets/botanica/exsicata-euphorbiaceae/ramo-representativo.jpg",
  import.meta.url,
).href;
const folhaSuperiorEuphorbiaceaeUrl = new URL(
  "../assets/botanica/exsicata-euphorbiaceae/folha-face-superior.jpg",
  import.meta.url,
).href;
const folhaInferiorEuphorbiaceaeUrl = new URL(
  "../assets/botanica/exsicata-euphorbiaceae/folha-face-inferior.jpg",
  import.meta.url,
).href;
const florEuphorbiaceaeUrl = new URL(
  "../assets/botanica/exsicata-euphorbiaceae/flor-inflorescencia.jpg",
  import.meta.url,
).href;
const frutoEuphorbiaceaeUrl = new URL(
  "../assets/botanica/exsicata-euphorbiaceae/fruto-semente.jpg",
  import.meta.url,
).href;

export const roteiroHerbarioVirtual = {
  id: "botanica-herbario-virtual",
  titulo: "Roteiro: Exsicata virtual didática",
  atividade: "Exsicata virtual didática",
  disciplina: "Botânica II",
  duracao: "ao longo do módulo",
  publico: "Estudantes de Botânica II",
  resumo:
    "Roteiro para produzir exsicatas virtuais didáticas com múltiplas fotos, etiqueta técnica e observações morfológicas.",
  secoes: [
    {
      titulo: "Objetivos",
      itens: [
        "Registrar fotograficamente estruturas vegetais úteis para identificação.",
        "Organizar uma exsicata virtual com etiqueta padronizada.",
        "Relacionar folha, ramo, flor, fruto e ambiente em um mesmo registro.",
        "Construir uma coleção interna do app com valor didático para Botânica II.",
      ],
    },
    {
      titulo: "Procedimento",
      itens: [
        "Fotografe a planta no ambiente e depois registre estruturas diagnósticas em maior detalhe.",
        "Escolha as fotos mais nítidas e distribua-as na prancha da exsicata virtual.",
        "Preencha etiqueta, local, data, coletor e observações morfológicas.",
        "Indique quais estruturas são mais úteis para a leitura botânica do material.",
      ],
    },
    {
      titulo: "Cuidados e contexto",
      itens: [
        "Nesta atividade, o registro fotográfico é o padrão; coleta física real depende de orientação institucional e legal.",
        "Sempre que possível, registre estruturas reprodutivas, porque elas fortalecem a identificação.",
        "Use fundo neutro nas fotos de detalhe e mantenha boa referência de escala.",
      ],
    },
  ],
};

export const herbarioVirtualEtapas = [
  {
    id: "orientacao",
    rotulo: "Orientação",
    descricao: "Entender o que a exsicata virtual precisa mostrar e como a prancha será montada.",
  },
  {
    id: "caderneta",
    rotulo: "Caderneta",
    descricao:
      "Anotar rapidamente local, ambiente e caracteres observados em campo para completar a exsicata depois.",
  },
  {
    id: "fotos",
    rotulo: "Fotos",
    descricao: "Registrar diferentes imagens para a mesma exsicata, cobrindo hábito, folha, ramo e estruturas diagnósticas.",
  },
  {
    id: "etiqueta",
    rotulo: "Etiqueta",
    descricao: "Preencher o conjunto mínimo de dados técnicos que acompanha o espécime virtual.",
  },
  {
    id: "preview",
    rotulo: "Preview",
    descricao: "Conferir a exsicata virtual já organizada como prancha didática.",
  },
];

export const herbarioVirtualPhotoSlots = [
  {
    id: "habito",
    titulo: "Hábito / ambiente",
    obrigatoria: true,
    dica: "Mostre o porte da planta e o contexto ecológico imediato.",
  },
  {
    id: "ramo",
    titulo: "Ramo principal",
    obrigatoria: true,
    dica: "Registre nós, inserção foliar e organização geral do ramo.",
  },
  {
    id: "folha_superior",
    titulo: "Folha - face superior",
    obrigatoria: true,
    dica: "Priorize nervação, margem e forma geral da lâmina.",
  },
  {
    id: "folha_inferior",
    titulo: "Folha - face inferior",
    obrigatoria: true,
    dica: "Importante para tricomas, coloração e nervação secundária.",
  },
  {
    id: "flor",
    titulo: "Flor / inflorescência",
    obrigatoria: false,
    dica: "Use quando houver estrutura reprodutiva disponível.",
  },
  {
    id: "fruto",
    titulo: "Fruto / semente",
    obrigatoria: false,
    dica: "Muito útil para comparação entre registros da coleção.",
  },
];

export const herbarioVirtualExemploFotos = [
  {
    id: "habito",
    titulo: "Hábito / ambiente",
    foto: habitoEuphorbiaceaeUrl,
    alt: "Planta hipotética de Euphorbiaceae fotografada inteira em seu ambiente",
    legenda: "Porte arbustivo, ramificação e contexto ecológico imediato.",
  },
  {
    id: "ramo",
    titulo: "Ramo representativo",
    foto: ramoEuphorbiaceaeUrl,
    alt: "Ramo da planta hipotética com folhas alternas e látex branco",
    legenda: "Nós, inserção alterna das folhas, estípulas e látex branco.",
  },
  {
    id: "folha_superior",
    titulo: "Folha — face superior",
    foto: folhaSuperiorEuphorbiaceaeUrl,
    alt: "Face superior da folha da planta hipotética de Euphorbiaceae",
    legenda: "Forma da lâmina, margem serrilhada e nervação vistas pela face superior.",
  },
  {
    id: "folha_inferior",
    titulo: "Folha — face inferior",
    foto: folhaInferiorEuphorbiaceaeUrl,
    alt: "Face inferior da folha da planta hipotética de Euphorbiaceae",
    legenda: "Face mais clara, nervuras salientes e detalhes de superfície.",
  },
  {
    id: "flor",
    titulo: "Flor / inflorescência",
    foto: florEuphorbiaceaeUrl,
    alt: "Inflorescência da planta hipotética de Euphorbiaceae",
    legenda: "Estruturas reprodutivas reduzidas reunidas em inflorescência.",
  },
  {
    id: "fruto",
    titulo: "Fruto / semente",
    foto: frutoEuphorbiaceaeUrl,
    alt: "Cápsulas trilobadas e sementes da planta hipotética de Euphorbiaceae",
    legenda: "Cápsulas trilobadas em diferentes estágios e sementes mosqueadas.",
  },
];

export const herbarioVirtualExemploCompleto = {
  id: "exsicata-exemplo-euphorbiaceae",
  titulo: "Exemplo didático — Euphorbiaceae",
  status: "exemplo",
  layout: "principal-com-detalhes",
  fotos: herbarioVirtualExemploFotos.map((foto) => ({
    ...foto,
    obrigatoria: herbarioVirtualPhotoSlots.find((slot) => slot.id === foto.id)
      ?.obrigatoria,
    dica:
      herbarioVirtualPhotoSlots.find((slot) => slot.id === foto.id)?.dica || "",
  })),
  etiqueta: {
    numeroRegistro: "LABSED-EXEMPLO-001",
    nomeCientifico: "Euphorbia sp. fict.",
    familia: "Euphorbiaceae",
    nomePopular: "Eufórbia-didática",
    coletor: "Equipe didática LABSED",
    dataColeta: "Sem coleta real",
    local: "Borda de vegetação tropical aberta — ambiente simulado",
    municipioUf: "Localidade hipotética",
    observacoes:
      "Espécime inteiramente hipotético, criado para demonstrar a montagem da exsicata virtual. Arbusto com látex branco, folhas simples alternas, estruturas reprodutivas reduzidas e cápsulas trilobadas.",
  },
  leituraMorfologica: {
    filotaxia: "Alterna",
    tipoFolha: "Simples, elíptica, com pequenas estípulas",
    nervacao: "Peninérvea, com nervuras basais laterais evidentes",
    margem: "Finamente serrilhada",
    consistencia: "Subcoriácea",
    estruturaReprodutiva:
      "Inflorescências com flores reduzidas; cápsula seca trilobada e sementes mosqueadas",
  },
};

export const herbarioVirtualCamposEtiqueta = [
  "numeroRegistro",
  "nomeCientifico",
  "familia",
  "nomePopular",
  "coletor",
  "dataColeta",
  "local",
  "municipioUf",
  "observacoes",
];

export function criarExsicataVirtualRascunho() {
  return {
    id: `exsicata-${Date.now()}`,
    titulo: "Nova exsicata virtual",
    layout: "principal-com-detalhes",
    fotos: herbarioVirtualPhotoSlots.map((slot) => ({
      id: slot.id,
      titulo: slot.titulo,
      obrigatoria: slot.obrigatoria,
      dica: slot.dica,
      foto: "",
      legenda: "",
    })),
    etiqueta: {
      numeroRegistro: "",
      nomeCientifico: "",
      familia: "",
      nomePopular: "",
      coletor: "",
      dataColeta: "",
      local: "",
      municipioUf: "",
      observacoes: "",
    },
    leituraMorfologica: {
      filotaxia: "",
      tipoFolha: "",
      nervacao: "",
      margem: "",
      consistencia: "",
      estruturaReprodutiva: "",
    },
    cadernetaCampo: {
      data: "",
      horario: "",
      local: "",
      municipioUf: "",
      coordenadas: "",
      ambiente: "",
      habitoPorte: "",
      cauleLatex: "",
      filotaxia: "",
      tipoFolha: "",
      nervacao: "",
      margem: "",
      consistencia: "",
      flores: "",
      frutosSementes: "",
      observacoes: "",
      fotoGeral: "",
    },
  };
}
