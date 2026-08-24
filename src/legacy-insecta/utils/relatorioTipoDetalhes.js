import { formatarContextoChave } from "./chaveRuntime.js";
import { formatObs, interpretarConfianca } from "../Pesquisador/knowledgeBase.js";

export function obterRotuloResultadoRelatorio(apresentacao = {}) {
  return apresentacao.rotuloResultado || "Resultado obtido";
}

export function obterSecoesComplementaresRelatorio(
  item = {},
  apresentacao = {}
) {
  if (apresentacao.tipo === "histologia-observacao") {
    const detalhes = item.detalhesTipoRelatorio || {};
    const secoes = [];

    if (Array.isArray(detalhes.camposHistologia) && detalhes.camposHistologia.length) {
      secoes.push({
        titulo: "Leitura do registro",
        itens: detalhes.camposHistologia.map(
          (campo) => `${campo.label}: ${campo.valor}`
        ),
      });
    }

    if (detalhes.observacoes) {
      secoes.push({
        titulo: "Observações complementares",
        linhas: [detalhes.observacoes],
      });
    }

    if (Array.isArray(detalhes.objetivos) && detalhes.objetivos.length) {
      secoes.push({
        titulo: "Objetivos da prática",
        itens: detalhes.objetivos,
      });
    }

    if (Array.isArray(detalhes.procedimento) && detalhes.procedimento.length) {
      secoes.push({
        titulo: "Procedimento orientado",
        itens: detalhes.procedimento,
      });
    }

    return secoes;
  }

  if (apresentacao.tipo !== "investigativo") {
    return [];
  }

  const detalhes = item.detalhesTipoRelatorio || {};
  const taxon = normalizarTaxonInvestigativo(item, detalhes);
  const observacoes = normalizarObservacoesInvestigativas(item, detalhes);
  const secoes = [];

  if (taxon?.nome || item.resultado) {
    const confianca = taxon ? interpretarConfianca(taxon) : null;
    const linhas = [
      taxon?.nivel ? `${taxon.nivel}: ${taxon.nome || item.resultado}` : "",
      confianca?.rotulo
        ? confianca.descricao
          ? `${confianca.rotulo} — ${confianca.descricao}`
          : confianca.rotulo
        : "",
      taxon?.pista || "",
    ].filter(Boolean);

    if (linhas.length) {
      secoes.push({ titulo: "Interpretação", linhas });
    }
  }

  if (observacoes.length) {
    secoes.push({
      titulo: "Características usadas",
      itens: observacoes.map((obs) => formatObs(obs)),
    });
  }

  if (Array.isArray(taxon?.matches) && taxon.matches.length) {
    secoes.push({
      titulo: "Compatibilidades",
      itens: taxon.matches.map((obs) => formatObs(obs)),
    });
  }

  if (Array.isArray(taxon?.conflitos) && taxon.conflitos.length) {
    secoes.push({
      titulo: "Pontos a revisar",
      itens: taxon.conflitos.map((obs) => formatObs(obs)),
    });
  }

  return secoes;
}

export function obterResumoListaRelatorio(relatorio = {}, apresentacao = {}) {
  const sessao = Array.isArray(relatorio.sessao) ? relatorio.sessao : [];
  const totalRegistrados = sessao.length;
  const totalPrevisto = Math.max(
    totalRegistrados,
    Number(relatorio.totalInsetos) || 0
  );
  const resultados = sessao
    .map((item) => String(item?.resultado || "").trim())
    .filter(Boolean);
  const ultimoResultado = resultados.at(-1) || "";
  const contextos = [...new Set(
    sessao
      .map((item) => formatarContextoChave(item?.ordem))
      .filter(Boolean)
  )];
  const observacoes = contarObservacoesInvestigativas(sessao);

  const resumoPrincipal = `${totalRegistrados} de ${totalPrevisto} ${apresentacao.rotuloItemPlural}`;
  const resumoSecundario = obterResumoSecundarioPorTipo(
    apresentacao,
    ultimoResultado,
    contextos,
    observacoes
  );
  const indicadores = obterIndicadoresResumoPorTipo(
    relatorio,
    apresentacao,
    resultados,
    observacoes
  );

  return {
    tituloTipo: apresentacao.tituloRelatorio,
    resumoPrincipal,
    resumoSecundario,
    indicadores,
  };
}

function normalizarObservacoesInvestigativas(item, detalhes) {
  if (Array.isArray(detalhes.observacoes) && detalhes.observacoes.length) {
    return detalhes.observacoes.filter(
      (obs) => obs && obs.estrutura && obs.valor
    );
  }

  return (Array.isArray(item.registro) ? item.registro : [])
    .filter((passo) => passo?.tipo === "observacao")
    .map((passo) => ({
      estrutura: passo.estrutura || passo.passo,
      valor: passo.valor || passo.escolha,
    }))
    .filter((obs) => obs.estrutura && obs.valor);
}

function normalizarTaxonInvestigativo(item, detalhes) {
  if (detalhes.taxon && typeof detalhes.taxon === "object") {
    return detalhes.taxon;
  }

  const hipotese = (Array.isArray(item.registro) ? item.registro : [])
    .filter((passo) => passo?.tipo === "hipotese")
    .at(-1);

  if (!hipotese) {
    return null;
  }

  return {
    nivel: hipotese.alternativa || "",
    nome: hipotese.escolha || item.resultado || "",
    pista: "",
    matches: [],
    conflitos: [],
  };
}

function contarObservacoesInvestigativas(sessao) {
  return sessao.reduce((total, item) => {
    const detalhes = item?.detalhesTipoRelatorio || {};
    if (Array.isArray(detalhes.observacoes) && detalhes.observacoes.length) {
      return total + detalhes.observacoes.length;
    }

    return (
      total +
      (Array.isArray(item?.registro)
        ? item.registro.filter((passo) => passo?.tipo === "observacao").length
        : 0)
    );
  }, 0);
}

function obterResumoSecundarioPorTipo(
  apresentacao,
  ultimoResultado,
  contextos,
  observacoes
) {
  switch (apresentacao.tipo) {
    case "investigativo":
      if (ultimoResultado && observacoes > 0) {
        return `${observacoes} observações registradas · última hipótese: ${ultimoResultado}`;
      }
      if (ultimoResultado) {
        return `Última hipótese confirmada: ${ultimoResultado}`;
      }
      if (observacoes > 0) {
        return `${observacoes} observações registradas`;
      }
      return "Relatório orientado por observações e hipóteses.";
    case "identificacao-artropodes":
      if (ultimoResultado) {
        return `Último grupo identificado: ${ultimoResultado}`;
      }
      return "Triagem didática de grupos de artrópodes.";
    case "botanica-plantae":
      if (ultimoResultado) {
        return `Última identificação vegetal: ${ultimoResultado}`;
      }
      return "Relatório da chave do Reino Plantae.";
    case "identificacao-zoologia":
      if (ultimoResultado && contextos.length) {
        return `${contextos.length} contextos percorridos · último resultado: ${ultimoResultado}`;
      }
      if (ultimoResultado) {
        return `Último resultado taxonômico: ${ultimoResultado}`;
      }
      return "Relatório de identificação taxonômica.";
    default:
      if (ultimoResultado) {
        return `Último registro: ${ultimoResultado}`;
      }
      return apresentacao.subtituloImpressao || "";
  }
}

function obterIndicadoresResumoPorTipo(
  relatorio,
  apresentacao,
  resultados,
  observacoes
) {
  const indicadores = [apresentacao.tipo];

  if (relatorio.mode === "prova" && apresentacao.politicaAvaliacao?.permiteCorrecaoAutomatica) {
    indicadores.push("correcao-automatica");
  }

  if (apresentacao.tipo === "investigativo" && observacoes > 0) {
    indicadores.push(`${observacoes}-observacoes`);
  }

  if (resultados.length > 1) {
    indicadores.push(`${new Set(resultados).size}-resultados`);
  }

  return indicadores;
}
