export const atlasHistologiaScreenTemplates = [
  {
    id: "hub",
    titulo: "Entrada do atlas",
    objetivo:
      "Reunir os módulos do atlas, atalhos de consulta e uma visão rápida do que já está disponível para estudo.",
    componentes: [
      "cabecalho-disciplina",
      "busca-global",
      "grid-modulos",
      "atalhos-recentes",
      "resumo-cobertura",
    ],
  },
  {
    id: "modulo",
    titulo: "Visão de módulo",
    objetivo:
      "Organizar o conteúdo por eixo principal, como tecidos, órgãos, técnicas ou comparações orientadas.",
    componentes: [
      "hero-modulo",
      "filtros-laterais",
      "lista-categorias",
      "faixa-laminas-destaque",
      "painel-objetivos",
    ],
  },
  {
    id: "galeria",
    titulo: "Galeria de lâminas",
    objetivo:
      "Permitir navegação rápida entre lâminas, com miniaturas, tags e reconhecimento imediato do material.",
    componentes: [
      "grade-miniaturas",
      "chips-tags",
      "filtro-coloracao",
      "filtro-aumento",
      "resumo-diagnostico",
    ],
  },
  {
    id: "lamina",
    titulo: "Tela de lâmina",
    objetivo:
      "Exibir a imagem principal anotada com legenda, estruturas e textos que apoiam a leitura da lâmina.",
    componentes: [
      "imagem-anotada-principal",
      "legenda-estruturas",
      "descricao-curta",
      "descricao-ampliada",
      "metadados-tecnicos",
      "navegacao-anterior-proxima",
    ],
  },
  {
    id: "comparacao",
    titulo: "Comparação de lâminas",
    objetivo:
      "Colocar duas ou mais lâminas lado a lado para contrastar tecidos, órgãos ou técnicas de preparo.",
    componentes: [
      "comparador-imagens",
      "resumo-semelhancas",
      "resumo-diferencas",
      "estruturas-compartilhadas",
      "criterios-diagnosticos",
    ],
  },
  {
    id: "autoria",
    titulo: "Edição da lâmina",
    objetivo:
      "Usar o editor anotado para produzir a imagem oficial do atlas e completar os dados da leitura.",
    componentes: [
      "editor-imagem-anotada",
      "formulario-metadata",
      "preview-da-prancha",
      "relacoes-com-modulo",
      "status-publicacao",
    ],
  },
];

export const atlasHistologiaNavigationModel = {
  raiz: "hub",
  niveis: [
    {
      id: "hub",
      rotulo: "Atlas",
      descricao: "Entrada principal para consulta e construção do atlas da disciplina.",
    },
    {
      id: "modulo",
      rotulo: "Módulo",
      descricao: "Grande eixo temático, como tecidos, órgãos ou técnicas.",
    },
    {
      id: "categoria",
      rotulo: "Categoria",
      descricao: "Recorte do módulo, como epitélio, cartilagem, rim ou outro grupo de estudo.",
    },
    {
      id: "lamina",
      rotulo: "Lâmina",
      descricao: "Unidade principal de estudo com imagem, dados e leitura orientada.",
    },
    {
      id: "estrutura",
      rotulo: "Estrutura",
      descricao: "Elemento histológico destacado para apoiar a interpretação da lâmina.",
    },
  ],
  trilhas: [
    "atlas > modulo > categoria > lamina",
    "atlas > modulo > categoria > lamina > estrutura",
    "atlas > modulo > comparacao",
    "atlas > edicao-da-lamina",
  ],
};

export const atlasHistologiaModules = [
  {
    id: "tecidos-basicos",
    titulo: "Tecidos básicos",
    descricao:
      "Eixo central para epitelial, conjuntivo, muscular e nervoso, com comparação de organização e função.",
    categorias: [
      "epitelial",
      "conjuntivo",
      "muscular",
      "nervoso",
    ],
    guiaRapido: [
      {
        titulo: "Epitélios",
        resumo: "Classifique pelo número de camadas e pelo formato celular.",
        itens: [
          "Pavimentoso: células achatadas e núcleo alongado.",
          "Cúbico: altura e largura semelhantes, núcleo mais central.",
          "Prismático: células altas, às vezes com borda especial ou cílios.",
        ],
      },
      {
        titulo: "Conjuntivos",
        resumo: "Observe primeiro a matriz e só depois o tipo celular predominante.",
        itens: [
          "Frouxo: mais substância fundamental e fibras delicadas.",
          "Denso: feixes colágenos mais compactos e organizados.",
          "Cartilagem: condrócitos em lacunas e matriz homogênea.",
        ],
      },
      {
        titulo: "Muscular e nervoso",
        resumo: "Diferencie por organização das fibras, posição do núcleo e presença de prolongamentos.",
        itens: [
          "Músculo estriado: fibras longas com estriações evidentes.",
          "Músculo liso: células fusiformes sem estriação visível.",
          "Tecido nervoso: neurônios maiores, glia menor e neuropilo ao redor.",
        ],
      },
    ],
  },
  {
    id: "orgaos-sistemas",
    titulo: "Órgãos e sistemas",
    descricao:
      "Pranchas diagnósticas para reconhecimento de órgãos com ênfase em padrões teciduais e estruturas-chave.",
    categorias: [
      "digestorio",
      "respiratorio",
      "urinario",
      "tegumentar",
      "glandular",
    ],
    guiaRapido: [
      {
        titulo: "Tubo digestório",
        resumo: "Reconheça primeiro mucosa, depois o relevo e o tipo glandular.",
        itens: [
          "Estômago: fossetas e glândulas na mucosa.",
          "Intestino delgado: vilosidades e criptas.",
          "Compare sempre a altura do epitélio e o formato da superfície.",
        ],
      },
      {
        titulo: "Respiratório e urinário",
        resumo: "Busque estruturas diagnósticas mais chamativas antes dos detalhes finos.",
        itens: [
          "Traqueia: epitélio respiratório, cartilagem e glândulas.",
          "Rim: glomérulos, túbulos e diferença entre córtex e medula.",
          "A organização do conjunto ajuda mais que uma célula isolada.",
        ],
      },
      {
        titulo: "Tegumentar e glandular",
        resumo: "A relação entre epitélio, conjuntivo e anexos costuma fechar o diagnóstico.",
        itens: [
          "Pele: epiderme, derme e anexos cutâneos.",
          "Glândulas: ácinos, ductos e padrão de secreção.",
          "Veja se o campo favorece leitura panorâmica ou detalhe funcional.",
        ],
      },
    ],
  },
  {
    id: "tecnicas-e-coloracoes",
    titulo: "Técnicas e colorações",
    descricao:
      "Espaço para registrar tipo de preparação, coloração e impacto interpretativo sobre a observação.",
    categorias: [
      "hematoxilina-eosina",
      "tricromicos",
      "coloracoes-especiais",
      "artefatos",
    ],
    guiaRapido: [
      {
        titulo: "Hematoxilina-eosina",
        resumo: "É a base do atlas e ajuda a separar núcleos, citoplasma e matriz.",
        itens: [
          "Núcleos tendem ao azul/roxo.",
          "Citoplasma e colágeno variam em rosa.",
          "Boa para visão geral do arranjo tecidual.",
        ],
      },
      {
        titulo: "Tricrômicos e especiais",
        resumo: "Use para realçar componentes que ficam discretos no HE.",
        itens: [
          "Tricrômicos valorizam colágeno e contraste conjuntivo-muscular.",
          "PAS pode destacar membranas basais e glicoconjugados.",
          "A coloração altera o que salta aos olhos no campo.",
        ],
      },
      {
        titulo: "Artefatos",
        resumo: "Nem todo espaço ou ruptura representa estrutura biológica real.",
        itens: [
          "Retração, dobras e cortes ruins podem induzir erro.",
          "Compare bordas artificiais com padrões repetidos do tecido.",
          "O contexto do preparo é parte da leitura histológica.",
        ],
      },
    ],
  },
  {
    id: "comparacoes-orientadas",
    titulo: "Comparações orientadas",
    descricao:
      "Rotas visuais para confrontar tecidos ou órgãos e consolidar critérios de distinção.",
    categorias: [
      "epitelios",
      "conjuntivos",
      "musculos",
      "orgaos-homologos",
    ],
    guiaRapido: [
      {
        titulo: "Como comparar",
        resumo: "Escolha poucos critérios por vez para não misturar leitura panorâmica com detalhe celular.",
        itens: [
          "Formato celular.",
          "Organização das camadas ou feixes.",
          "Tipo de matriz, luz ou anexos associados.",
        ],
      },
      {
        titulo: "Epitélios e conjuntivos",
        resumo: "Nesses grupos, a melhor comparação costuma nascer do contraste entre superfície e suporte.",
        itens: [
          "Epitélios: espessura, camadas e especializações.",
          "Conjuntivos: matriz, fibras e densidade celular.",
          "Evite concluir só pela coloração.",
        ],
      },
      {
        titulo: "Músculos e órgãos",
        resumo: "Nos órgãos, a arquitetura geral costuma valer mais que uma estrutura isolada.",
        itens: [
          "Músculos: estriação, núcleos e ramificação.",
          "Órgãos homólogos: compare função com padrão histológico.",
          "Use imagens em aumentos diferentes quando possível.",
        ],
      },
    ],
  },
];

export const atlasHistologiaDataShape = {
  modulo: {
    id: "string",
    titulo: "string",
    descricao: "string",
    categorias: ["string"],
  },
  lamina: {
    id: "string",
    grupoId: "string",
    sequenciaOrdem: "number",
    sequenciaTipo: "visao-geral | detalhe",
    moduloId: "string",
    categoriaId: "string",
    titulo: "string",
    subtitulo: "string",
    imagemBase: "url-ou-data-url",
    imagemAnotada: "url-ou-data-url",
    setas: "array-de-setas-do-editor",
    estruturas: [
      {
        id: "string",
        nome: "string",
        descricaoCurta: "string",
        descricaoAmpliada: "string",
      },
    ],
    metadados: {
      aumento: "string",
      coloracao: "string",
      origem: "string",
      observacoesTecnicas: "string",
    },
    relacoes: {
      compararCom: ["laminaId"],
      revisarAntesDepois: ["laminaId"],
    },
    apoioEdicao: [
      {
        titulo: "string",
        resumo: "string",
        itens: ["string"],
      },
    ],
    status: "rascunho | revisao | publicado",
  },
};

function criarModeloSugerido({
  id,
  grupoId,
  sequenciaOrdem = 1,
  sequenciaTipo = "visao-geral",
  moduloId,
  categoriaId,
  titulo,
  subtitulo,
  aumento,
  coloracao = "Hematoxilina-eosina",
  origem = "Modelo sugerido do atlas",
  observacoesTecnicas = "",
  apoioEdicao = [],
  compararCom = [],
  revisarAntesDepois = [],
}) {
  return {
    id,
    grupoId,
    sequenciaOrdem,
    sequenciaTipo,
    moduloId,
    categoriaId,
    titulo,
    subtitulo,
    imagemBase: "",
    imagemAnotada: "",
    setas: [],
    estruturas: [],
    metadados: {
      aumento,
      coloracao,
      origem,
      observacoesTecnicas,
    },
    relacoes: {
      compararCom,
      revisarAntesDepois,
    },
    apoioEdicao,
    status: "rascunho",
  };
}

export const atlasHistologiaSampleSlides = [
  {
    id: "epitelio-simples-pavimentoso-40x",
    grupoId: "epitelio-simples-pavimentoso",
    sequenciaOrdem: 1,
    sequenciaTipo: "visao-geral",
    moduloId: "tecidos-basicos",
    categoriaId: "epitelial",
    titulo: "Epitélio simples pavimentoso",
    subtitulo: "Primeira leitura para localizar o tecido e situar o campo observado",
    imagemBase: "",
    imagemAnotada: "",
    setas: [
      {
        id: "atlas-seta-1",
        corId: "vermelho",
        corNome: "Vermelho",
        cor: "#dc2626",
        x: 34,
        y: 32,
        rotacao: 14,
        tamanho: 66,
        fonteTamanho: 12,
        textoOffsetX: 8,
        textoOffsetY: -60,
        legenda: "Região do revestimento",
        concluida: true,
      },
      {
        id: "atlas-seta-2",
        corId: "azul",
        corNome: "Azul",
        cor: "#2563eb",
        x: 63,
        y: 56,
        rotacao: -18,
        tamanho: 58,
        fonteTamanho: 12,
        textoOffsetX: 10,
        textoOffsetY: -54,
        legenda: "Superfície epitelial",
        concluida: true,
      },
    ],
    estruturas: [
      {
        id: "regiao-revestimento",
        nome: "Região do revestimento",
        descricaoCurta: "Faixa do preparo em que o revestimento pode ser reconhecido.",
        descricaoAmpliada:
          "Esta primeira leitura em menor aumento ajuda a situar o epitélio simples pavimentoso dentro do conjunto do preparo antes de avançar para os detalhes celulares.",
      },
      {
        id: "superficie-epitelial",
        nome: "Superfície epitelial",
        descricaoCurta: "Limite do revestimento observado na visão mais ampla.",
        descricaoAmpliada:
          "A marcação da superfície ajuda a delimitar o tecido e prepara a comparação com a lâmina seguinte, em que aparecem detalhes em maior aumento.",
      },
    ],
    metadados: {
      aumento: "40x",
      coloracao: "Hematoxilina-eosina",
      origem: "Lâmina didática inicial",
      observacoesTecnicas:
        "Primeiro campo da sequência didática, voltado para localização do tecido antes da observação de detalhes celulares.",
    },
    relacoes: {
      compararCom: ["epitelio-simples-cubico-40x"],
      revisarAntesDepois: ["epitelio-simples-pavimentoso-400x"],
    },
    apoioEdicao: [
      {
        titulo: "Tipo de epitélio",
        resumo: "Use esta lâmina para localizar um revestimento extremamente delgado.",
        itens: [
          "Epitélio simples: uma única camada celular.",
          "Pavimentoso: células achatadas e pouco altas.",
          "A visão geral serve mais para situar o tecido do que para ver detalhes nucleares.",
        ],
      },
      {
        titulo: "O que procurar",
        resumo: "No primeiro aumento, priorize a faixa do revestimento e seus limites.",
        itens: [
          "Superfície contínua do epitélio.",
          "Região de contato com o tecido subjacente.",
          "Áreas em que o campo prepara a passagem para maior aumento.",
        ],
      },
    ],
    status: "rascunho",
  },
  {
    id: "epitelio-simples-pavimentoso-400x",
    grupoId: "epitelio-simples-pavimentoso",
    sequenciaOrdem: 2,
    sequenciaTipo: "detalhe",
    moduloId: "tecidos-basicos",
    categoriaId: "epitelial",
    titulo: "Epitélio simples pavimentoso",
    subtitulo: "Segunda leitura para destacar núcleo achatado e citoplasma delgado",
    imagemBase: "",
    imagemAnotada: "",
    setas: [
      {
        id: "atlas-seta-1b",
        corId: "vermelho",
        corNome: "Vermelho",
        cor: "#dc2626",
        x: 36,
        y: 34,
        rotacao: 18,
        tamanho: 60,
        fonteTamanho: 12,
        textoOffsetX: 8,
        textoOffsetY: -56,
        legenda: "Núcleo achatado",
        concluida: true,
      },
      {
        id: "atlas-seta-2b",
        corId: "azul",
        corNome: "Azul",
        cor: "#2563eb",
        x: 62,
        y: 58,
        rotacao: -20,
        tamanho: 54,
        fonteTamanho: 12,
        textoOffsetX: 10,
        textoOffsetY: -54,
        legenda: "Citoplasma delgado",
        concluida: true,
      },
    ],
    estruturas: [
      {
        id: "nucleo-achatado",
        nome: "Núcleo achatado",
        descricaoCurta: "Indica o aspecto achatado típico da célula pavimentosa.",
        descricaoAmpliada:
          "A forma alongada e pouco volumosa do núcleo ajuda a reconhecer o caráter pavimentoso do epitélio e sua adaptação a um revestimento fino.",
      },
      {
        id: "citoplasma-delgado",
        nome: "Citoplasma delgado",
        descricaoCurta: "Faixa citoplasmática estreita ao redor da região nuclear.",
        descricaoAmpliada:
          "O citoplasma pouco espesso forma uma lâmina delicada, importante para trocas rápidas e com baixa resistência à difusão.",
      },
    ],
    metadados: {
      aumento: "400x",
      coloracao: "Hematoxilina-eosina",
      origem: "Lâmina didática inicial",
      observacoesTecnicas:
        "Segundo campo da sequência didática, dedicado aos detalhes celulares mais finos do epitélio simples pavimentoso.",
    },
    relacoes: {
      compararCom: ["epitelio-simples-cubico-400x"],
      revisarAntesDepois: ["endotelio-capilar"],
    },
    apoioEdicao: [
      {
        titulo: "Características celulares",
        resumo: "Aqui a leitura já pode destacar a morfologia típica da célula pavimentosa.",
        itens: [
          "Núcleo alongado e achatado.",
          "Citoplasma muito delgado ao redor da região nuclear.",
          "Conjunto compatível com revestimento fino e trocas rápidas.",
        ],
      },
      {
        titulo: "Estruturas observáveis",
        resumo: "As marcações sugeridas devem ajudar a diferenciar detalhe celular de leitura panorâmica.",
        itens: [
          "Região nuclear mais evidente.",
          "Faixa citoplasmática estreita.",
          "Limite celular discreto em comparação com outros epitélios.",
        ],
      },
    ],
    status: "rascunho",
  },
  {
    id: "cartilagem-hialina",
    grupoId: "cartilagem-hialina",
    sequenciaOrdem: 1,
    sequenciaTipo: "visao-geral",
    moduloId: "tecidos-basicos",
    categoriaId: "conjuntivo",
    titulo: "Cartilagem hialina",
    subtitulo: "Leitura inicial de matriz homogênea com condrócitos em lacunas",
    imagemBase: "",
    imagemAnotada: "",
    setas: [
      {
        id: "atlas-seta-3",
        corId: "verde",
        corNome: "Verde",
        cor: "#16a34a",
        x: 42,
        y: 46,
        rotacao: 8,
        tamanho: 52,
        fonteTamanho: 12,
        textoOffsetX: 8,
        textoOffsetY: -52,
        legenda: "Condrócito",
        concluida: true,
      },
      {
        id: "atlas-seta-4",
        corId: "roxo",
        corNome: "Roxo",
        cor: "#7c3aed",
        x: 66,
        y: 38,
        rotacao: -12,
        tamanho: 60,
        fonteTamanho: 12,
        textoOffsetX: 8,
        textoOffsetY: -56,
        legenda: "Matriz territorial",
        concluida: true,
      },
    ],
    estruturas: [
      {
        id: "condrocito",
        nome: "Condrócito",
        descricaoCurta: "Célula observada no interior da lacuna cartilaginosa.",
        descricaoAmpliada:
          "O condrócito costuma aparecer isolado ou em pequenos grupos isógenos, envolto por uma matriz cartilaginosa de aspecto homogêneo.",
      },
      {
        id: "matriz-territorial",
        nome: "Matriz territorial",
        descricaoCurta: "Faixa mais basófila ao redor da lacuna.",
        descricaoAmpliada:
          "A matriz territorial ajuda a localizar as lacunas e a distinguir áreas com maior concentração de componentes próximos das células.",
      },
    ],
    metadados: {
      aumento: "200x",
      coloracao: "Hematoxilina-eosina",
      origem: "Lâmina didática de tecido conjuntivo especializado",
      observacoesTecnicas:
        "Boa lâmina de referência para comparação posterior com cartilagem elástica e fibrocartilagem.",
    },
    relacoes: {
      compararCom: ["cartilagem-elastica"],
      revisarAntesDepois: ["osso-esponjoso"],
    },
    apoioEdicao: [
      {
        titulo: "Tipo de tecido",
        resumo: "Cartilagem hialina é um conjuntivo especializado com matriz abundante.",
        itens: [
          "Condrócitos em lacunas.",
          "Matriz homogênea e relativamente vítrea.",
          "Pouca vascularização visível no campo histológico.",
        ],
      },
      {
        titulo: "O que diferencia",
        resumo: "A leitura costuma depender mais da relação célula-matriz do que do número de células.",
        itens: [
          "Lacunas arredondadas ou ovais.",
          "Matriz territorial ao redor das células.",
          "Contraste útil com conjuntivos fibrosos e cartilagem elástica.",
        ],
      },
    ],
    status: "rascunho",
  },
  criarModeloSugerido({
    id: "epitelio-simples-cubico-40x",
    grupoId: "epitelio-simples-cubico",
    sequenciaOrdem: 1,
    sequenciaTipo: "visao-geral",
    moduloId: "tecidos-basicos",
    categoriaId: "epitelial",
    titulo: "Epitélio simples cúbico",
    subtitulo: "Campo introdutório para reconhecer células cúbicas em arranjo simples",
    aumento: "40x",
    apoioEdicao: [
      {
        titulo: "Tipo de epitélio",
        resumo: "A proposta aqui é reconhecer o padrão simples cúbico ainda em visão inicial.",
        itens: [
          "Uma camada celular.",
          "Altura e largura próximas.",
          "Núcleo geralmente mais central que no pavimentoso.",
        ],
      },
      {
        titulo: "Comparação útil",
        resumo: "Vale comparar com o simples pavimentoso para não confundir delicadeza com espessura real.",
        itens: [
          "Mais espesso que o pavimentoso.",
          "Menos alto que o prismático.",
          "Muito comum em túbulos e ductos pequenos.",
        ],
      },
    ],
    observacoesTecnicas:
      "Modelo sugerido para comparação direta com epitélio simples pavimentoso e prismático.",
    compararCom: ["epitelio-simples-pavimentoso-40x"],
    revisarAntesDepois: ["epitelio-simples-cubico-400x"],
  }),
  criarModeloSugerido({
    id: "epitelio-simples-cubico-400x",
    grupoId: "epitelio-simples-cubico",
    sequenciaOrdem: 2,
    sequenciaTipo: "detalhe",
    moduloId: "tecidos-basicos",
    categoriaId: "epitelial",
    titulo: "Epitélio simples cúbico",
    subtitulo: "Detalhe para destacar núcleo central e altura celular semelhante à largura",
    aumento: "400x",
    apoioEdicao: [
      {
        titulo: "Detalhe celular",
        resumo: "No maior aumento, a intenção é reforçar a geometria cúbica das células.",
        itens: [
          "Núcleo arredondado ou central.",
          "Citoplasma mais evidente que no pavimentoso.",
          "Perfil celular mais alto e mais nítido.",
        ],
      },
    ],
    observacoesTecnicas:
      "Sugestão para registrar detalhes celulares em maior aumento dentro do mesmo grupo.",
  }),
  criarModeloSugerido({
    id: "tecido-conjuntivo-frouxo-100x",
    grupoId: "tecido-conjuntivo-frouxo",
    moduloId: "tecidos-basicos",
    categoriaId: "conjuntivo",
    titulo: "Tecido conjuntivo frouxo",
    subtitulo: "Leitura inicial de fibras finas, substância fundamental e células dispersas",
    aumento: "100x",
    apoioEdicao: [
      {
        titulo: "Tipo de tecido",
        resumo: "A chave aqui é perceber um tecido mais aberto, com matriz e fibras delicadas.",
        itens: [
          "Fibras finas e menos compactas.",
          "Células dispersas entre os componentes da matriz.",
          "Aspecto geral menos denso que o conjuntivo denso.",
        ],
      },
    ],
    observacoesTecnicas:
      "Bom modelo para contraste com tecido conjuntivo denso e cartilagens.",
  }),
  criarModeloSugerido({
    id: "musculo-estriado-esqueletico-100x",
    grupoId: "musculo-estriado-esqueletico",
    moduloId: "tecidos-basicos",
    categoriaId: "muscular",
    titulo: "Músculo estriado esquelético",
    subtitulo: "Visão inicial para reconhecer fibras longas, feixes e estriações",
    aumento: "100x",
    apoioEdicao: [
      {
        titulo: "Tipo de músculo",
        resumo: "Busque fibras longas e paralelas organizadas em feixes.",
        itens: [
          "Estriações transversais quando o preparo favorece.",
          "Núcleos periféricos.",
          "Contraste com músculo liso e cardíaco.",
        ],
      },
    ],
    observacoesTecnicas:
      "Modelo sugerido para contrastar com músculo liso e músculo cardíaco.",
  }),
  criarModeloSugerido({
    id: "tecido-nervoso-neuronio-100x",
    grupoId: "tecido-nervoso-neuronio",
    moduloId: "tecidos-basicos",
    categoriaId: "nervoso",
    titulo: "Tecido nervoso",
    subtitulo: "Modelo para localizar corpos celulares neuronais e neuropilo ao redor",
    aumento: "100x",
    apoioEdicao: [
      {
        titulo: "Elementos esperados",
        resumo: "A leitura inicial costuma separar corpos neuronais maiores do fundo neuropilar.",
        itens: [
          "Neurônios mais volumosos.",
          "Células da glia menores e mais numerosas.",
          "Neuropilo preenchendo o espaço entre corpos celulares.",
        ],
      },
    ],
    observacoesTecnicas:
      "Sugestão inicial para eixo nervoso com foco em diferenciação entre neurônios e glia.",
  }),
  criarModeloSugerido({
    id: "estomago-mucosa-40x",
    grupoId: "estomago-mucosa",
    moduloId: "orgaos-sistemas",
    categoriaId: "digestorio",
    titulo: "Estômago",
    subtitulo: "Campo de reconhecimento da mucosa gástrica e organização das glândulas",
    aumento: "40x",
    apoioEdicao: [
      {
        titulo: "Leitura de órgão",
        resumo: "Primeiro reconheça a mucosa e o relevo superficial antes das células glandulares.",
        itens: [
          "Fossetas gástricas.",
          "Glândulas na mucosa.",
          "Ausência de vilosidades verdadeiras.",
        ],
      },
    ],
    observacoesTecnicas:
      "Modelo sugerido para introduzir o padrão histológico do tubo digestório.",
  }),
  criarModeloSugerido({
    id: "intestino-delgado-vilosidade-40x",
    grupoId: "intestino-delgado-vilosidade",
    moduloId: "orgaos-sistemas",
    categoriaId: "digestorio",
    titulo: "Intestino delgado",
    subtitulo: "Leitura panorâmica das vilosidades e da disposição da mucosa intestinal",
    aumento: "40x",
    apoioEdicao: [
      {
        titulo: "Leitura de órgão",
        resumo: "A marca principal costuma ser a presença de vilosidades projetando-se para a luz.",
        itens: [
          "Vilosidades evidentes.",
          "Criptas entre as projeções.",
          "Superfície mais recortada que no estômago.",
        ],
      },
    ],
    observacoesTecnicas:
      "Sugestão para comparação com estômago e intestino grosso.",
  }),
  criarModeloSugerido({
    id: "traqueia-100x",
    grupoId: "traqueia",
    moduloId: "orgaos-sistemas",
    categoriaId: "respiratorio",
    titulo: "Traqueia",
    subtitulo: "Reconhecimento do epitélio respiratório e da cartilagem associada",
    aumento: "100x",
    apoioEdicao: [
      {
        titulo: "Conjunto diagnóstico",
        resumo: "Esta lâmina combina epitélio, conjuntivo e cartilagem no mesmo órgão.",
        itens: [
          "Epitélio respiratório pseudoestratificado.",
          "Cartilagem hialina associada.",
          "Possíveis glândulas na submucosa.",
        ],
      },
    ],
    observacoesTecnicas:
      "Modelo útil para integrar sistema respiratório com tecido conjuntivo cartilaginoso.",
  }),
  criarModeloSugerido({
    id: "rim-cortex-100x",
    grupoId: "rim-cortex",
    moduloId: "orgaos-sistemas",
    categoriaId: "urinario",
    titulo: "Rim",
    subtitulo: "Campo cortical para localizar glomérulos e túbulos renais",
    aumento: "100x",
    apoioEdicao: [
      {
        titulo: "Estruturas esperadas",
        resumo: "No córtex renal, a leitura inicial já deve separar corpúsculos e túbulos.",
        itens: [
          "Glomérulos arredondados.",
          "Túbulos com lúmen variado.",
          "Diferença entre campo cortical e regiões mais profundas.",
        ],
      },
    ],
    observacoesTecnicas:
      "Sugestão central para eixo urinário e diferenciação de néfron.",
  }),
  criarModeloSugerido({
    id: "pele-delgada-40x",
    grupoId: "pele-delgada",
    moduloId: "orgaos-sistemas",
    categoriaId: "tegumentar",
    titulo: "Pele delgada",
    subtitulo: "Modelo para leitura inicial de epiderme, derme e anexos cutâneos",
    aumento: "40x",
    observacoesTecnicas:
      "Pode ser usado em contraste com pele espessa e tecidos glandulares associados.",
  }),
  criarModeloSugerido({
    id: "glandula-salivar-100x",
    grupoId: "glandula-salivar",
    moduloId: "orgaos-sistemas",
    categoriaId: "glandular",
    titulo: "Glândula salivar",
    subtitulo: "Leitura de ácinos, ductos e padrão geral de glândula exócrina",
    aumento: "100x",
    observacoesTecnicas:
      "Modelo sugerido para introduzir organização glandular e variação de secreção.",
  }),
  criarModeloSugerido({
    id: "he-basico-40x",
    grupoId: "he-basico",
    moduloId: "tecnicas-e-coloracoes",
    categoriaId: "hematoxilina-eosina",
    titulo: "Hematoxilina-eosina",
    subtitulo: "Modelo para reconhecer contraste geral entre núcleos basófilos e citoplasmas acidófilos",
    aumento: "40x",
    observacoesTecnicas:
      "Sugestão didática para introduzir a coloração-base mais usada no atlas.",
  }),
  criarModeloSugerido({
    id: "tricromico-masson-100x",
    grupoId: "tricromico-masson",
    moduloId: "tecnicas-e-coloracoes",
    categoriaId: "tricromicos",
    titulo: "Tricrômico de Masson",
    subtitulo: "Modelo para distinguir colágeno, citoplasma e núcleos em tricrômico",
    aumento: "100x",
    coloracao: "Tricrômico de Masson",
    observacoesTecnicas:
      "Útil para comparação com hematoxilina-eosina em tecidos conjuntivos e musculares.",
  }),
  criarModeloSugerido({
    id: "pas-membrana-basal-100x",
    grupoId: "pas-membrana-basal",
    moduloId: "tecnicas-e-coloracoes",
    categoriaId: "coloracoes-especiais",
    titulo: "PAS",
    subtitulo: "Modelo sugerido para evidenciar glicoconjugados e membranas basais",
    aumento: "100x",
    coloracao: "PAS",
    observacoesTecnicas:
      "Pode sustentar comparações com epitélios, glândulas e bordas em escova.",
  }),
  criarModeloSugerido({
    id: "artefato-retracao-40x",
    grupoId: "artefato-retracao",
    moduloId: "tecnicas-e-coloracoes",
    categoriaId: "artefatos",
    titulo: "Artefato de retração",
    subtitulo: "Modelo para discutir espaços artificiais e limites da interpretação histológica",
    aumento: "40x",
    observacoesTecnicas:
      "Serve como sugestão de leitura crítica do preparo e dos erros de processamento.",
  }),
  criarModeloSugerido({
    id: "comparacao-epitelios-40x",
    grupoId: "comparacao-epitelios",
    moduloId: "comparacoes-orientadas",
    categoriaId: "epitelios",
    titulo: "Comparação de epitélios",
    subtitulo: "Modelo orientado para contrastar epitélio simples pavimentoso e cúbico",
    aumento: "40x",
    observacoesTecnicas:
      "Pode ser preenchido depois com duas imagens autorais do mesmo conjunto comparativo.",
  }),
  criarModeloSugerido({
    id: "comparacao-conjuntivos-100x",
    grupoId: "comparacao-conjuntivos",
    moduloId: "comparacoes-orientadas",
    categoriaId: "conjuntivos",
    titulo: "Comparação de tecidos conjuntivos",
    subtitulo: "Modelo para contrastar conjuntivo frouxo, denso e cartilagem",
    aumento: "100x",
    observacoesTecnicas:
      "Sugestão para organizar critérios morfológicos de matriz e celularidade.",
  }),
  criarModeloSugerido({
    id: "comparacao-musculos-100x",
    grupoId: "comparacao-musculos",
    moduloId: "comparacoes-orientadas",
    categoriaId: "musculos",
    titulo: "Comparação de músculos",
    subtitulo: "Modelo para diferenciar músculo liso, estriado esquelético e cardíaco",
    aumento: "100x",
    observacoesTecnicas:
      "Ajuda a consolidar variações de estriação, núcleo e organização fascicular.",
  }),
  criarModeloSugerido({
    id: "comparacao-orgaos-homologos-40x",
    grupoId: "comparacao-orgaos-homologos",
    moduloId: "comparacoes-orientadas",
    categoriaId: "orgaos-homologos",
    titulo: "Comparação de órgãos homólogos",
    subtitulo: "Modelo para confrontar padrões histológicos com função semelhante",
    aumento: "40x",
    observacoesTecnicas:
      "Espaço sugerido para comparações entre órgãos ou segmentos de sistemas aparentados.",
  }),
];

export function gerarResumoAtlasHistologiaApp() {
  const linhas = [
    "Atlas didático de Histologia",
    "",
    "Modelo em desenvolvimento",
    "• entrada principal com módulos, busca e atalhos de estudo;",
    "• organização por tecidos, órgãos, técnicas e comparações;",
    "• galeria de lâminas com filtros por categoria, coloração e aumento;",
    "• tela de lâmina com imagem anotada, estruturas, leitura e metadados;",
    "• comparação de lâminas para contraste lado a lado;",
    "• edição da lâmina usando o editor anotado do próprio app.",
    "",
    "Unidade visual proposta",
    "• a imagem oficial do atlas pode ser produzida no mesmo editor usado pelo aluno;",
    "• o atlas interno vira referência visual para as atividades;",
    "• a atividade do aluno reaproveita o mesmo padrão de leitura, anotação e legenda.",
    "",
    "Próximos incrementos",
    "• consolidar a entrada principal do atlas;",
    "• definir uma tela-base de lâmina;",
    "• salvar uma primeira coleção de lâminas em formato compatível com este modelo.",
  ];

  return linhas.join("\n");
}
