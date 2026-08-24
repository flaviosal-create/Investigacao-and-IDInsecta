const POLITICA_EXPORTACAO_PADRAO = Object.freeze({
  rotuloBaixarTexto: "Baixar TXT",
  rotuloSalvarPdf: "Salvar PDF",
  rotuloImprimirPdf: "Imprimir / PDF",
});

const MARCA_IMPRESSAO_PADRAO = "LABSED · Laboratório de Biologia";

function criarPoliticaExportacao(nomeArquivoBase, overrides = {}) {
  return {
    ...POLITICA_EXPORTACAO_PADRAO,
    nomeArquivoBase,
    ...overrides,
  };
}

function criarPoliticaFoto(overrides = {}) {
  return {
    textoPresente: "anexada",
    textoAusente: "não anexada",
    legendaFigura: "Foto registrada pelo aluno.",
    avisoIndisponivel:
      "Foto registrada na atividade, mas não disponível para impressão nesta visualização.",
    ...overrides,
  };
}

function criarPoliticaAvaliacao(overrides = {}) {
  return {
    permiteCorrecaoAutomatica: false,
    rotuloAcertos: "Acertos",
    rotuloNota: "Nota",
    rotuloEsperado: "Esperado",
    rotuloSituacao: "Situação",
    valorAcerto: "ACERTO",
    valorErro: "ERRO",
    rotuloGabaritoIncompleto: "Gabarito incompleto",
    mensagemGabaritoIncompleto:
      "O gabarito está incompleto: foram informadas {preenchido} respostas para {total}.",
    ...overrides,
  };
}

function criarPoliticaRevisao(overrides = {}) {
  return {
    titulo: "Devolutiva do professor",
    mensagemVazia:
      "Use este espaço para orientar o aluno após a leitura do relatório.",
    placeholder:
      "Ex.: Boa observação das asas. Revise a diferença entre élitro e asa membranosa no inseto 2.",
    rotuloSalvar: "Salvar revisão",
    mensagemSucesso: "Relatório marcado como revisado e feedback salvo.",
    rotuloRevisadoEm: "Revisado em",
    ...overrides,
  };
}

const TIPOS_RELATORIO = {
  "identificacao-zoologia": {
    id: "identificacao-zoologia",
    implementadoHoje: true,
    usaPipelineSessaoAtual: true,
    disciplinaIds: ["zoologia-i"],
    rotuloItem: "inseto",
    rotuloItemPlural: "insetos",
    rotuloContagem: "Insetos concluídos",
    rotuloFoto: "Foto do inseto",
    tituloRelatorio: "Relatório de identificação",
    rotuloResultado: "Resultado obtido",
    marcaImpressao: MARCA_IMPRESSAO_PADRAO,
    subtituloImpressao:
      "Documento gerado a partir da atividade de identificação taxonômica.",
    rotuloContexto: "Ordem/Contexto",
    rotuloCaminho: "Caminho",
    suportaGabarito: true,
    suportaNota: true,
    suportaFotosAnotadas: true,
    permiteRetomadaLocal: true,
    telasRetomadaLocal: ["principal", "ordem"],
    politicaExportacao: criarPoliticaExportacao("relatorio_identificacao"),
    politicaFoto: criarPoliticaFoto({
      legendaFigura: "Foto do inseto registrada pelo aluno.",
    }),
    politicaAvaliacao: criarPoliticaAvaliacao({
      permiteCorrecaoAutomatica: true,
    }),
    politicaRevisao: criarPoliticaRevisao(),
    descricao:
      "Relatórios das chaves de identificação de insetos e subchaves taxonômicas.",
  },
  "identificacao-artropodes": {
    id: "identificacao-artropodes",
    implementadoHoje: true,
    usaPipelineSessaoAtual: true,
    disciplinaIds: ["zoologia-i"],
    rotuloItem: "artrópode",
    rotuloItemPlural: "artrópodes",
    rotuloContagem: "Artrópodes concluídos",
    rotuloFoto: "Foto do artrópode",
    tituloRelatorio: "Relatório de identificação",
    rotuloResultado: "Resultado obtido",
    marcaImpressao: MARCA_IMPRESSAO_PADRAO,
    subtituloImpressao:
      "Documento gerado a partir da atividade de identificação de artrópodes.",
    rotuloContexto: "Grupo/Contexto",
    rotuloCaminho: "Caminho",
    suportaGabarito: false,
    suportaNota: false,
    suportaFotosAnotadas: true,
    permiteRetomadaLocal: true,
    telasRetomadaLocal: ["principal", "ordem", "artropodes"],
    politicaExportacao: criarPoliticaExportacao("relatorio_artropodes"),
    politicaFoto: criarPoliticaFoto({
      legendaFigura: "Foto do artrópode registrada pelo aluno.",
    }),
    politicaAvaliacao: criarPoliticaAvaliacao(),
    politicaRevisao: criarPoliticaRevisao({
      placeholder:
        "Ex.: Boa distinção entre os grupos observados. Revise especialmente o papel das antenas e do número de pernas.",
    }),
    descricao:
      "Relatórios da chave didática de artrópodes, com contexto distinto da chave principal de insetos.",
  },
  investigativo: {
    id: "investigativo",
    implementadoHoje: true,
    usaPipelineSessaoAtual: true,
    disciplinaIds: ["zoologia-i"],
    rotuloItem: "espécime",
    rotuloItemPlural: "espécimes",
    rotuloContagem: "Espécimes analisados",
    rotuloFoto: "Foto do exemplar",
    tituloRelatorio: "Relatório do modo investigativo",
    rotuloResultado: "Hipótese confirmada",
    marcaImpressao: MARCA_IMPRESSAO_PADRAO,
    subtituloImpressao:
      "Documento gerado a partir do modo investigativo, com observações, hipóteses e confirmação.",
    rotuloContexto: "Contexto",
    rotuloCaminho: "Registro investigativo",
    suportaGabarito: false,
    suportaNota: false,
    suportaFotosAnotadas: false,
    permiteRetomadaLocal: false,
    telasRetomadaLocal: [],
    politicaExportacao: criarPoliticaExportacao("relatorio_modo_investigativo"),
    politicaFoto: criarPoliticaFoto({
      legendaFigura: "Registro fotográfico do espécime analisado.",
      avisoIndisponivel:
        "Registro fotográfico feito durante a atividade, mas não disponível para impressão nesta visualização.",
    }),
    politicaAvaliacao: criarPoliticaAvaliacao(),
    politicaRevisao: criarPoliticaRevisao({
      mensagemVazia:
        "Use este espaço para comentar a qualidade das observações, hipóteses e justificativas do aluno.",
      placeholder:
        "Ex.: As observações estão coerentes com Diptera, mas vale revisar como os halteres sustentam a hipótese escolhida.",
    }),
    descricao:
      "Relatórios baseados em observações, hipóteses e confirmação, sem caminho dicotômico puro.",
  },
  "botanica-plantae": {
    id: "botanica-plantae",
    implementadoHoje: true,
    usaPipelineSessaoAtual: true,
    disciplinaIds: ["botanica-ii"],
    rotuloItem: "planta",
    rotuloItemPlural: "plantas",
    rotuloContagem: "Plantas registradas",
    rotuloFoto: "Foto da planta ou estrutura vegetal",
    tituloRelatorio: "Relatório de identificação vegetal",
    rotuloResultado: "Resultado obtido",
    marcaImpressao: MARCA_IMPRESSAO_PADRAO,
    subtituloImpressao:
      "Documento gerado a partir da atividade de identificação do Reino Plantae.",
    rotuloContexto: "Grupo/Contexto",
    rotuloCaminho: "Caminho observado",
    suportaGabarito: false,
    suportaNota: false,
    suportaFotosAnotadas: true,
    permiteRetomadaLocal: false,
    telasRetomadaLocal: [],
    politicaExportacao: criarPoliticaExportacao(
      "relatorio_identificacao_vegetal"
    ),
    politicaFoto: criarPoliticaFoto({
      legendaFigura:
        "Registro fotográfico da planta ou estrutura vegetal observada.",
    }),
    politicaAvaliacao: criarPoliticaAvaliacao(),
    politicaRevisao: criarPoliticaRevisao({
      placeholder:
        "Ex.: Boa leitura das estruturas vegetativas. Revise a diferença entre folha composta e simples no item 2.",
    }),
    descricao:
      "Relatórios da chave do Reino Plantae, com linguagem e fotos voltadas à Botânica II.",
  },
  "histologia-observacao": {
    id: "histologia-observacao",
    implementadoHoje: false,
    usaPipelineSessaoAtual: false,
    disciplinaIds: ["histologia"],
    rotuloItem: "lâmina",
    rotuloItemPlural: "lâminas",
    rotuloContagem: "Lâminas registradas",
    rotuloFoto: "Foto da lâmina ou estrutura observada",
    tituloRelatorio: "Relatório de observação histológica",
    rotuloResultado: "Resultado observado",
    marcaImpressao: MARCA_IMPRESSAO_PADRAO,
    subtituloImpressao:
      "Documento gerado a partir de uma atividade de observação histológica.",
    rotuloContexto: "Tecido/Contexto",
    rotuloCaminho: "Registro de observação",
    suportaGabarito: false,
    suportaNota: false,
    suportaFotosAnotadas: true,
    permiteRetomadaLocal: false,
    telasRetomadaLocal: [],
    politicaExportacao: criarPoliticaExportacao("relatorio_histologia"),
    politicaFoto: criarPoliticaFoto({
      legendaFigura:
        "Registro fotográfico da lâmina ou estrutura observada.",
    }),
    politicaAvaliacao: criarPoliticaAvaliacao(),
    politicaRevisao: criarPoliticaRevisao({
      mensagemVazia:
        "Use este espaço para orientar a leitura da lâmina e a descrição das estruturas observadas.",
      placeholder:
        "Ex.: A descrição está promissora. Revise a diferenciação entre epitélio simples e pseudoestratificado antes de concluir.",
    }),
    descricao:
      "Estrutura-alvo para atlas, lâminas e órgãos, ainda não integrada ao pipeline atual de relatórios.",
  },
  "colecao-didatica": {
    id: "colecao-didatica",
    implementadoHoje: false,
    usaPipelineSessaoAtual: false,
    disciplinaIds: ["zoologia-i"],
    rotuloItem: "espécime",
    rotuloItemPlural: "espécimes",
    rotuloContagem: "Espécimes registrados",
    rotuloFoto: "Foto do espécime ou material coletado",
    tituloRelatorio: "Relatório da coleção didática",
    rotuloResultado: "Registro principal",
    marcaImpressao: MARCA_IMPRESSAO_PADRAO,
    subtituloImpressao:
      "Documento gerado a partir da atividade de coleção e documentação de exemplares.",
    rotuloContexto: "Contexto",
    rotuloCaminho: "Registro",
    suportaGabarito: false,
    suportaNota: false,
    suportaFotosAnotadas: true,
    permiteRetomadaLocal: false,
    telasRetomadaLocal: [],
    politicaExportacao: criarPoliticaExportacao("relatorio_colecao_didatica"),
    politicaFoto: criarPoliticaFoto({
      legendaFigura:
        "Registro fotográfico do espécime ou material coletado.",
    }),
    politicaAvaliacao: criarPoliticaAvaliacao(),
    politicaRevisao: criarPoliticaRevisao({
      mensagemVazia:
        "Use este espaço para comentar a documentação do espécime, a coleta e a identificação registrada.",
      placeholder:
        "Ex.: Boa documentação do exemplar. Vale detalhar melhor a procedência e o estado de conservação.",
    }),
    descricao:
      "Estrutura-alvo para atividades de coleção e documentação de exemplares, ainda fora do pipeline atual.",
  },
};

const CONTEXTO_PADRAO = {
  chaveId: "",
  disciplinaId: "",
  modoArtropode: false,
  tituloDaChave: "",
};

export function listarTiposRelatorio() {
  return Object.values(TIPOS_RELATORIO);
}

export function obterTipoRelatorio(id) {
  return TIPOS_RELATORIO[id] || null;
}

export function resolverTipoRelatorio(contexto = {}) {
  const atual = {
    ...CONTEXTO_PADRAO,
    ...contexto,
  };
  const titulo = String(atual.tituloDaChave || "").trim();
  const disciplinaId = String(atual.disciplinaId || "").trim().toLowerCase();
  const chaveId = String(atual.chaveId || "").trim().toUpperCase();

  if (titulo.startsWith("Modo Investigativo")) {
    return {
      tipo: "investigativo",
      variante: titulo.includes("Artrópodes") ? "artropodes" : "insecta",
      definicao: TIPOS_RELATORIO.investigativo,
    };
  }

  if (chaveId === "BOTANICA_PLANTAE" || disciplinaId === "botanica-ii") {
    return {
      tipo: "botanica-plantae",
      variante: "plantae",
      definicao: TIPOS_RELATORIO["botanica-plantae"],
    };
  }

  if (chaveId === "ARTRÓPODES" || atual.modoArtropode) {
    return {
      tipo: "identificacao-artropodes",
      variante: "artropodes",
      definicao: TIPOS_RELATORIO["identificacao-artropodes"],
    };
  }

  if (disciplinaId === "histologia") {
    return {
      tipo: "histologia-observacao",
      variante: "histologia",
      definicao: TIPOS_RELATORIO["histologia-observacao"],
    };
  }

  return {
    tipo: "identificacao-zoologia",
    variante: "insetos",
    definicao: TIPOS_RELATORIO["identificacao-zoologia"],
  };
}

export function inferirContextoTipoRelatorio(relatorio = {}) {
  const primeiroItem = Array.isArray(relatorio.sessao) ? relatorio.sessao[0] : null;
  const progresso = relatorio.progresso || null;

  return {
    disciplinaId: relatorio.disciplinaId || "",
    chaveId: progresso?.chaveId || "",
    modoArtropode: Boolean(progresso?.modoArtropode),
    tituloDaChave: primeiroItem?.titulo || "",
  };
}

export function obterApresentacaoTipoRelatorio(contexto = {}) {
  const resolvido = resolverTipoRelatorio(contexto);
  const definicao = resolvido.definicao;

  return {
    ...resolvido,
    ...definicao,
    rotuloItemCapitalizado: capitalizar(definicao.rotuloItem),
  };
}

export function obterPoliticaRetomadaTipoRelatorio(contexto = {}) {
  const apresentacao = obterApresentacaoTipoRelatorio(contexto);
  const telasPermitidas = new Set(apresentacao.telasRetomadaLocal || []);

  return {
    ...apresentacao,
    telasPermitidas,
  };
}

export function obterPoliticaFotoTipoRelatorio(contexto = {}) {
  return obterApresentacaoTipoRelatorio(contexto).politicaFoto;
}

export function obterPoliticaExportacaoTipoRelatorio(contexto = {}) {
  return obterApresentacaoTipoRelatorio(contexto).politicaExportacao;
}

export function obterPoliticaAvaliacaoTipoRelatorio(contexto = {}) {
  return obterApresentacaoTipoRelatorio(contexto).politicaAvaliacao;
}

export function obterPoliticaRevisaoTipoRelatorio(contexto = {}) {
  return obterApresentacaoTipoRelatorio(contexto).politicaRevisao;
}

function capitalizar(valor) {
  const texto = String(valor || "");
  return texto ? texto.charAt(0).toLocaleUpperCase("pt-BR") + texto.slice(1) : "";
}
