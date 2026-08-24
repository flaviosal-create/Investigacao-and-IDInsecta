export const STORAGE_KEY = "gerador_chave_dicotomica_rascunho";

export const assinaturaLabsed = {
  nome: "LABSED",
  texto: "Produzido por Laboratório de Software Didático",
  complemento: "Laboratório de Softwares Educacionais",
  obrigatorio: true,
};

export const exemploInicial = {
  titulo: "Minha chave dicotômica",
  startId: "n1",
  logo: {
    nome: "",
    src: "",
    posicao: "cabecalho",
  },
  nodes: [
    {
      id: "n1",
      title: "1",
      prompt: "Qual característica principal você observa?",
      a: {
        text: "Característica A presente",
        next: "n2",
        figs: [],
        explanation: {
          body: "Explique ao estudante como reconhecer a característica A.",
          hint: "",
        },
      },
      b: {
        text: "Característica A ausente",
        result: "RESULTADO B",
        figs: [],
        explanation: {
          body: "Explique como reconhecer a condição alternativa.",
          hint: "",
        },
      },
    },
    {
      id: "n2",
      title: "2(1)",
      prompt: "A segunda característica está presente?",
      a: {
        text: "Segunda característica presente",
        result: "RESULTADO A1",
        figs: [],
        explanation: {
          body: "",
          hint: "",
        },
      },
      b: {
        text: "Segunda característica ausente",
        result: "RESULTADO A2",
        figs: [],
        explanation: {
          body: "",
          hint: "",
        },
      },
    },
  ],
};

export const textoImportacaoExemplo = `TITULO: Chave para famílias de exemplo
START: n1
LOGO_NOME: Minha instituição
LOGO_URL:

[NODE n1]
TITULO: 1
PERGUNTA: Como são as antenas?

A: Antenas curtas
NEXT: n2
IMAGENS: Fig204, Fig205
EXPLICACAO: Observe o número de artículos visíveis.
DICA: Compare com o comprimento da cabeça.

B: Antenas longas
RESULTADO: NEMATOCERA
IMAGENS: Fig206
EXPLICACAO: Antenas longas costumam ter muitos artículos.

[NODE n2]
TITULO: 2(1)
PERGUNTA: Existe sulco ptilinal?

A: Sulco ausente
RESULTADO: GRUPO A

B: Sulco presente
RESULTADO: GRUPO B`;

export function criarNodeDisponivel(nodes) {
  const ids = new Set((nodes || []).map((node) => node.id));
  let numero = (nodes || []).length + 1;

  while (ids.has(`n${numero}`)) {
    numero += 1;
  }

  return criarNode(numero);
}

export function criarAlternativa() {
  return {
    text: "",
    next: "",
    result: "",
    figs: [],
    explanation: {
      body: "",
      hint: "",
    },
  };
}

export function criarAssinaturaLabsed(logo) {
  return {
    ...assinaturaLabsed,
    ...(logo ? { logo } : {}),
  };
}

export function montarChave(chave, produzidoPor = assinaturaLabsed) {
  const nodes = {};

  chave.nodes.forEach((node) => {
    const id = String(node.id || "").trim();
    if (!id) return;

    nodes[id] = {
      title: String(node.title || "").trim() || id,
      prompt: String(node.prompt || "").trim(),
      a: normalizarAlternativa(node.a),
      b: normalizarAlternativa(node.b),
    };
  });

  return {
    titulo: String(chave.titulo || "").trim() || "Chave sem título",
    startId: String(chave.startId || "").trim(),
    logo: normalizarLogo(chave.logo),
    produzidoPor,
    nodes,
  };
}

export function carregarRascunho() {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);
    return salvo ? JSON.parse(salvo) : exemploInicial;
  } catch {
    return exemploInicial;
  }
}

export function textoParaFiguras(valor) {
  return String(valor || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function figurasParaTexto(figs) {
  return Array.isArray(figs) ? figs.join(", ") : "";
}

export function parseTextoChave(texto) {
  const problemas = [];
  const chave = {
    titulo: "",
    startId: "",
    logo: {
      nome: "",
      src: "",
      posicao: "cabecalho",
    },
    nodes: [],
  };
  let nodeAtual = null;
  let ladoAtual = null;

  function garantirNode(linha) {
    if (nodeAtual) return true;
    problemas.push(`Linha ${linha}: informação de nó encontrada antes de [NODE id].`);
    return false;
  }

  function garantirAlternativa(linha) {
    if (garantirNode(linha) && ladoAtual) return true;
    problemas.push(`Linha ${linha}: detalhe de alternativa sem A: ou B: anterior.`);
    return false;
  }

  String(texto || "")
    .split(/\r?\n/)
    .forEach((linhaOriginal, index) => {
      const linhaNumero = index + 1;
      const linha = linhaOriginal.trim();
      if (!linha || linha.startsWith("#")) return;

      const nodeMatch = linha.match(/^\[NODE\s+([^\]]+)\]$/i);
      if (nodeMatch) {
        const id = nodeMatch[1].trim();
        nodeAtual = {
          id,
          title: id,
          prompt: "",
          a: criarAlternativa(),
          b: criarAlternativa(),
        };
        chave.nodes.push(nodeAtual);
        ladoAtual = null;
        return;
      }

      const campoMatch = linha.match(/^([^:]+):\s*(.*)$/);
      if (!campoMatch) {
        problemas.push(`Linha ${linhaNumero}: formato não reconhecido.`);
        return;
      }

      const rotuloOriginal = campoMatch[1].trim();
      const rotulo = normalizarRotulo(rotuloOriginal);
      const valor = campoMatch[2].trim();

      if (rotulo === "A" || rotulo === "B") {
        if (!garantirNode(linhaNumero)) return;
        ladoAtual = rotulo.toLowerCase();
        nodeAtual[ladoAtual] = {
          ...criarAlternativa(),
          text: valor,
        };
        return;
      }

      if (!nodeAtual) {
        if (rotulo === "TITULO") {
          chave.titulo = valor;
          return;
        }
        if (rotulo === "START" || rotulo === "START_ID" || rotulo === "INICIO") {
          chave.startId = valor;
          return;
        }
        if (rotulo === "LOGO_NOME") {
          chave.logo.nome = valor;
          return;
        }
        if (rotulo === "LOGO_URL" || rotulo === "LOGO_SRC") {
          chave.logo.src = valor;
          return;
        }
        if (rotulo === "LOGO_POSICAO") {
          chave.logo.posicao = valor || "cabecalho";
          return;
        }
      }

      if (rotulo === "TITULO") {
        if (!garantirNode(linhaNumero)) return;
        nodeAtual.title = valor;
        return;
      }

      if (rotulo === "PERGUNTA") {
        if (!garantirNode(linhaNumero)) return;
        nodeAtual.prompt = valor;
        return;
      }

      if (rotulo === "NEXT" || rotulo === "PROXIMO") {
        if (!garantirAlternativa(linhaNumero)) return;
        nodeAtual[ladoAtual].next = valor;
        nodeAtual[ladoAtual].result = "";
        return;
      }

      if (rotulo === "RESULTADO" || rotulo === "RESULT") {
        if (!garantirAlternativa(linhaNumero)) return;
        nodeAtual[ladoAtual].result = valor;
        nodeAtual[ladoAtual].next = "";
        return;
      }

      if (rotulo === "IMAGENS" || rotulo === "FIGS" || rotulo === "FIGURAS") {
        if (!garantirAlternativa(linhaNumero)) return;
        nodeAtual[ladoAtual].figs = textoParaFiguras(valor);
        return;
      }

      if (rotulo === "EXPLICACAO" || rotulo === "EXPLICAÇÃO") {
        if (!garantirAlternativa(linhaNumero)) return;
        nodeAtual[ladoAtual].explanation = {
          ...nodeAtual[ladoAtual].explanation,
          body: valor,
        };
        return;
      }

      if (rotulo === "DICA") {
        if (!garantirAlternativa(linhaNumero)) return;
        nodeAtual[ladoAtual].explanation = {
          ...nodeAtual[ladoAtual].explanation,
          hint: valor,
        };
        return;
      }

      problemas.push(`Linha ${linhaNumero}: campo "${rotuloOriginal}" não reconhecido.`);
    });

  if (!chave.titulo) chave.titulo = "Chave importada";
  if (!chave.startId) chave.startId = chave.nodes[0]?.id || "";
  if (!chave.nodes.length) {
    problemas.push("Nenhum nó encontrado. Use blocos no formato [NODE n1].");
  }

  return { chave, problemas };
}

export function extrairProvavelChave(texto) {
  const linhas = String(texto || "")
    .replace(/\f/g, "\n")
    .split(/\r?\n/)
    .map((linha) => linha.replace(/\s+/g, " ").trim());
  const selecionadas = [];
  let grupoAtivo = false;
  let ultimaFoiSeparador = false;

  linhas.forEach((linha) => {
    if (linhaDescartavelParaChave(linha)) {
      if (grupoAtivo && !ultimaFoiSeparador && selecionadas.length) {
        selecionadas.push("");
        ultimaFoiSeparador = true;
      }
      grupoAtivo = false;
      return;
    }

    const pareceChave = linhaPareceChave(linha);
    const continuacaoCurta =
      grupoAtivo &&
      linha.length <= 130 &&
      !/^[A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-ZÁÉÍÓÚÂÊÔÃÕÇ\s]{8,}$/.test(linha);

    if (!pareceChave && !continuacaoCurta) {
      if (grupoAtivo && !ultimaFoiSeparador && selecionadas.length) {
        selecionadas.push("");
        ultimaFoiSeparador = true;
      }
      grupoAtivo = false;
      return;
    }

    selecionadas.push(linha);
    grupoAtivo = true;
    ultimaFoiSeparador = false;
  });

  return selecionadas.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function criarNode(numero) {
  return {
    id: `n${numero}`,
    title: String(numero),
    prompt: "",
    a: criarAlternativa(),
    b: criarAlternativa(),
  };
}

function normalizarAlternativa(choice) {
  const figs = Array.isArray(choice?.figs)
    ? choice.figs.map((fig) => String(fig).trim()).filter(Boolean)
    : [];
  const alternativa = {
    text: String(choice?.text || "").trim(),
    figs,
  };
  const next = String(choice?.next || "").trim();
  const result = String(choice?.result || "").trim();
  const body = String(choice?.explanation?.body || "").trim();
  const hint = String(choice?.explanation?.hint || "").trim();

  if (next) alternativa.next = next;
  if (result) alternativa.result = result;
  if (body || hint) {
    alternativa.explanation = { body, hint };
  }

  return alternativa;
}

function normalizarLogo(logo) {
  const src = String(logo?.src || "").trim();
  const nome = String(logo?.nome || "").trim();
  const posicao = String(logo?.posicao || "").trim() || "cabecalho";

  if (!src && !nome) return undefined;

  return {
    nome,
    src,
    posicao,
  };
}

function normalizarRotulo(rotulo) {
  return String(rotulo || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/\s+/g, "_");
}

function linhaDescartavelParaChave(linha) {
  const texto = linha.trim();
  const baixo = texto.toLowerCase();

  if (!texto) return true;
  if (/^\d+$/.test(texto)) return true;
  if (/^p[áa]gina\s+\d+/i.test(texto)) return true;
  if (/^(resumo|abstract|introdu[cç][aã]o|refer[eê]ncias|bibliografia)$/i.test(texto)) {
    return true;
  }
  if (/\b(doi|issn|isbn)\b/i.test(texto)) return true;
  if (/https?:\/\//i.test(texto)) return true;
  if (baixo.includes("universidade") && texto.length > 80) return true;

  return false;
}

function linhaPareceChave(linha) {
  const texto = linha.trim();
  const rotuloEstruturado = /^(TITULO|START|START_ID|INICIO|LOGO_NOME|LOGO_URL|LOGO_SRC|LOGO_POSICAO|PERGUNTA|NEXT|PROXIMO|RESULTADO|RESULT|IMAGENS|FIGS|FIGURAS|EXPLICACAO|EXPLICAÇÃO|DICA|A|B)\s*:/i;
  const inicioAlternativa = /^(\d{1,3}\s*['’]?[a-z]?[.)\-:]?|[a-bA-B][.)\-:]|[A-B]:)\s+\S/;
  const destino =
    /\.{2,}|…|(?:vai|v[áa]|siga|segue|ir)\s+para|go\s+to|\bnext\b|\bresultado\b|\bresult\b/i;
  const terminaEmDestino = /(?:\s|\.{2,}|…)(\d{1,3}|[A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-ZÁÉÍÓÚÂÊÔÃÕÇ -]{3,})\.?$/.test(texto);

  return (
    /^\[NODE\s+[^\]]+\]$/i.test(texto) ||
    rotuloEstruturado.test(texto) ||
    (inicioAlternativa.test(texto) && (destino.test(texto) || terminaEmDestino)) ||
    (/^\d{1,3}\s*['’]\s+\S/.test(texto) && texto.length < 220)
  );
}
