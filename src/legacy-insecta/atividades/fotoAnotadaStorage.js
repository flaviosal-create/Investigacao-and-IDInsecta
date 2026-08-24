import { criarRegistroFotoAnotada } from "./fotoAnotadaModel.js";

const STORAGE_PREFIX = "labsed_foto_anotada_v1";

export function carregarRascunhoFotoAnotada(config) {
  const padrao = criarEstadoPadrao(config);

  if (typeof localStorage === "undefined") {
    return padrao;
  }

  try {
    const bruto = localStorage.getItem(chaveStorage(config));
    if (!bruto) return padrao;

    return normalizarRascunhoFotoAnotada(JSON.parse(bruto), config);
  } catch {
    return padrao;
  }
}

export function salvarRascunhoFotoAnotada(config, rascunho) {
  const normalizado = normalizarRascunhoFotoAnotada(rascunho, config);
  const registro = {
    ...normalizado,
    atualizadoEm: new Date().toISOString(),
  };

  if (typeof localStorage !== "undefined") {
    localStorage.setItem(chaveStorage(config), JSON.stringify(registro));
  }

  return registro;
}

export function limparRascunhoFotoAnotada(config) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(chaveStorage(config));
  }

  return criarEstadoPadrao(config);
}

export function normalizarRascunhoFotoAnotada(rascunho, config) {
  const entrada = rascunho && typeof rascunho === "object" ? rascunho : {};
  const registrosEntrada = Array.isArray(entrada.registros)
    ? entrada.registros
    : [];
  const registrosNormalizados = registrosEntrada
    .map((registro) => normalizarRegistro(registro, config))
    .filter(Boolean);
  const registros = config.etapasInformativas
    ? completarRegistrosPadrao(registrosNormalizados, config)
    : registrosNormalizados;
  const registrosValidos = registros.length
    ? registros
    : [criarRegistroFotoAnotada(config)];
  const registroAtivoId = registrosValidos.some(
    (registro) => registro.id === entrada.registroAtivoId
  )
    ? entrada.registroAtivoId
    : registrosValidos[0].id;

  return {
    registros: registrosValidos,
    registroAtivoId,
    relatorioId: String(entrada.relatorioId || ""),
    statusRelatorio: normalizarStatusRelatorio(entrada.statusRelatorio),
    criadoEm: String(entrada.criadoEm || ""),
    sinteseMaterial: String(entrada.sinteseMaterial || ""),
    atualizadoEm: String(entrada.atualizadoEm || ""),
  };
}

function criarEstadoPadrao(config) {
  const registrosPadrao = criarRegistrosPadrao(config);
  const registros = registrosPadrao.length
    ? registrosPadrao
    : [criarRegistroFotoAnotada(config)];

  return {
    registros,
    registroAtivoId: registros[0].id,
    relatorioId: "",
    statusRelatorio: "rascunho",
    criadoEm: "",
    sinteseMaterial: "",
    atualizadoEm: "",
  };
}

function normalizarStatusRelatorio(valor) {
  return valor === "enviado" || valor === "concluido" ? valor : "rascunho";
}

function criarRegistrosPadrao(config) {
  if (!Array.isArray(config?.registrosPadrao) || !config.registrosPadrao.length) {
    return [];
  }

  return config.registrosPadrao.map((registroPadrao, index) => ({
    ...criarRegistroFotoAnotada({
      ...config,
      _registroSequencia: index + 1,
      metaDefault: registroPadrao.metaValor || config.metaDefault,
    }),
    titulo: String(registroPadrao.titulo || ""),
    metaValor: String(registroPadrao.metaValor || config.metaDefault || ""),
    camposRelatorio: {
      ...criarRegistroFotoAnotada(config).camposRelatorio,
      ...(registroPadrao.camposRelatorio || {}),
    },
    observacoes: config.observacoesPadraoSaoOrientacao
      ? ""
      : String(registroPadrao.observacoes || ""),
    acompanhada: Boolean(registroPadrao.acompanhada),
  }));
}

function completarRegistrosPadrao(registros, config) {
  const registrosPadrao = criarRegistrosPadrao(config);
  if (!registrosPadrao.length) return registros;

  const metasPadrao = new Set(
    registrosPadrao.map((registro) => registro.metaValor),
  );
  const existentesPorMeta = new Map(
    registros.map((registro) => [registro.metaValor, registro]),
  );

  return [
    ...registrosPadrao.map(
      (registroPadrao) =>
        existentesPorMeta.get(registroPadrao.metaValor) || registroPadrao,
    ),
    ...registros.filter((registro) => !metasPadrao.has(registro.metaValor)),
  ];
}

function normalizarRegistro(registro, config) {
  if (!registro || typeof registro !== "object") return null;

  const metaValor = String(registro.metaValor || config.metaDefault || "");
  const orientacaoPadrao = config.observacoesPadraoSaoOrientacao
    ? String(
        config.registrosPadrao?.find((item) => item.metaValor === metaValor)
          ?.observacoes || "",
      )
    : "";

  return {
    id: String(registro.id || criarRegistroFotoAnotada(config).id),
    titulo: String(registro.titulo || ""),
    metaValor,
    foto: String(registro.foto || ""),
    acompanhada: Boolean(registro.acompanhada),
    edicaoConcluida: Boolean(registro.edicaoConcluida),
    setas: Array.isArray(registro.setas)
      ? registro.setas.map(normalizarSeta).filter(Boolean)
      : [],
    rascunhosPorMeta: normalizarRascunhosPorMeta(registro.rascunhosPorMeta),
    camposRelatorio: normalizarCamposRelatorio(
      registro.camposRelatorio,
      config,
    ),
    observacoes:
      String(registro.observacoes || "") === orientacaoPadrao
        ? ""
        : String(registro.observacoes || ""),
  };
}

function normalizarCamposRelatorio(entrada, config) {
  const base = criarRegistroFotoAnotada(config).camposRelatorio;
  if (!entrada || typeof entrada !== "object") return base;

  return Object.fromEntries(
    Object.keys(base).map((chave) => [chave, String(entrada[chave] || "")]),
  );
}

function normalizarRascunhosPorMeta(entrada) {
  if (!entrada || typeof entrada !== "object") return {};

  return Object.fromEntries(
    Object.entries(entrada).map(([metaValor, rascunho]) => [
      String(metaValor),
      {
        foto: String(rascunho?.foto || ""),
        edicaoConcluida: Boolean(rascunho?.edicaoConcluida),
        setas: Array.isArray(rascunho?.setas)
          ? rascunho.setas.map(normalizarSeta).filter(Boolean)
          : [],
      },
    ]),
  );
}

function normalizarSeta(seta) {
  if (!seta || typeof seta !== "object") return null;

  return {
    ...seta,
    id: String(seta.id || `seta-${Date.now()}`),
    corId: String(seta.corId || ""),
    corNome: String(seta.corNome || ""),
    cor: String(seta.cor || "#dc2626"),
    x: numeroPercentual(seta.x),
    y: numeroPercentual(seta.y),
    rotacao: Number(seta.rotacao) || 0,
    tamanho: Number(seta.tamanho) || 58,
    fonteTamanho: Number(seta.fonteTamanho) || 12,
    larguraReferencia:
      Number.isFinite(Number(seta.larguraReferencia)) && Number(seta.larguraReferencia) > 0
        ? Number(seta.larguraReferencia)
        : 0,
    textoOffsetX: Number(seta.textoOffsetX) || 6,
    textoOffsetY:
      Number.isFinite(Number(seta.textoOffsetY)) ? Number(seta.textoOffsetY) : -50,
    legenda: String(seta.legenda || ""),
    concluida: Boolean(seta.concluida),
  };
}

function numeroPercentual(valor) {
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return 0;
  return Math.max(0, Math.min(100, numero));
}

function chaveStorage(config) {
  return `${STORAGE_PREFIX}_${config?.idPrefix || "registro"}`;
}
