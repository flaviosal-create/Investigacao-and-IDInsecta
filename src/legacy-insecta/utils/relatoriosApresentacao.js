export function formatarCaminhoCurto(registro) {
  if (!Array.isArray(registro) || registro.length === 0) {
    return "Caminho não registrado.";
  }

  return registro
    .map(
      (passo, indice) =>
        `${indice + 1}. ${passo.passo || "Passo"} (${
          passo.alternativa || "alternativa"
        })`
    )
    .join(" -> ");
}

export function formatarData(valor) {
  if (!valor) return "data desconhecida";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(valor));
}

export function codigoRelatorio(relatorio) {
  const bruto = String(relatorio?.id || relatorio?.atualizadoEm || "");
  const limpo = bruto
    .replace(/^relatorio[_-]?/i, "")
    .replace(/[^a-zA-Z0-9]/g, "");
  const trecho = limpo.slice(-6).toUpperCase();

  return `Relatório #${trecho || "LOCAL"}`;
}

export function statusAcompanhamento(tipo) {
  const estilos = {
    revisado: {
      background: "var(--color-success-soft)",
      color: "var(--color-success-text)",
    },
    enviado: {
      background: "var(--color-info-soft)",
      color: "var(--color-info-text)",
    },
    pendente: {
      background: "var(--color-warning-soft)",
      color: "var(--color-warning-text)",
    },
    rascunho: {
      background: "var(--color-warning-soft)",
      color: "var(--color-warning-text)",
    },
    faltando: {
      background: "var(--color-danger-soft)",
      color: "var(--color-danger-text)",
    },
  };

  return {
    ...(estilos[tipo] || estilos.faltando),
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 850,
    padding: "5px 9px",
    whiteSpace: "nowrap",
  };
}

export function status(tipo) {
  return {
    padding: "5px 9px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    background:
      ["concluido", "enviado", "revisado"].includes(tipo)
        ? "var(--color-success-soft)"
        : "var(--color-warning-soft)",
    color:
      ["concluido", "enviado", "revisado"].includes(tipo)
        ? "var(--color-success-text)"
        : "var(--color-warning-text)",
  };
}

export function rotuloStatus(tipo) {
  return {
    rascunho: "Rascunho",
    concluido: "Concluído",
    enviado: "Enviado",
    revisado: "Revisado",
  }[tipo] || tipo;
}

export function formatarIndicadorResumo(valor) {
  const mapa = {
    investigativo: "Investigativo",
    "identificacao-zoologia": "Identificação",
    "identificacao-artropodes": "Artrópodes",
    "botanica-plantae": "Botânica II",
    "histologia-observacao": "Histologia",
    "colecao-didatica": "Coleção",
    "correcao-automatica": "Correção automática",
  };

  if (mapa[valor]) {
    return mapa[valor];
  }

  if (/^\d+-observacoes$/.test(valor)) {
    return `${valor.split("-")[0]} observações`;
  }

  if (/^\d+-resultados$/.test(valor)) {
    return `${valor.split("-")[0]} resultados`;
  }

  return "";
}

export function resumirTiposAcompanhamento(linhas) {
  const contagens = new Map();

  (linhas || []).forEach((linha) => {
    const tipo = linha.apresentacao?.tipo;
    if (!tipo) return;
    contagens.set(tipo, (contagens.get(tipo) || 0) + 1);
  });

  return [...contagens.entries()]
    .sort(
      (a, b) =>
        b[1] - a[1] ||
        formatarIndicadorResumo(a[0]).localeCompare(
          formatarIndicadorResumo(b[0]),
          "pt-BR"
        )
    )
    .map(([tipo, quantidade]) => ({
      tipo,
      quantidade,
      rotulo: formatarIndicadorResumo(tipo) || tipo,
    }));
}
