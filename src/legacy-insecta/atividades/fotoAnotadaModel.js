export const coresSetasPadrao = [
  { id: "vermelho", nome: "Vermelho", valor: "#dc2626" },
  { id: "azul", nome: "Azul", valor: "#2563eb" },
  { id: "verde", nome: "Verde", valor: "#16a34a" },
  { id: "amarelo", nome: "Amarelo", valor: "#ca8a04" },
  { id: "roxo", nome: "Roxo", valor: "#7c3aed" },
];

export function criarRegistroFotoAnotada(config) {
  const sequencia = Number(config?._registroSequencia || Date.now());

  return {
    id: `${config.idPrefix || "registro"}-${sequencia}`,
    titulo: "",
    metaValor: config.metaDefault || "",
    foto: "",
    edicaoConcluida: false,
    setas: [],
    rascunhosPorMeta: {},
    camposRelatorio: criarCamposRelatorioPadrao(config),
    observacoes: "",
  };
}

export function criarSetaFotoAnotada({ registroId, sequencia, cor, x, y }) {
  return {
    id: `seta-${registroId}-${sequencia}`,
    corId: cor.id,
    corNome: cor.nome,
    cor: cor.valor,
    pontaTipo: "seta",
    x: Number(x.toFixed(2)),
    y: Number(y.toFixed(2)),
    rotacao: 0,
    tamanho: 58,
    colcheteLargura: 20,
    fonteTamanho: 12,
    textoOffsetX: 2,
    textoOffsetY: -50,
    larguraReferencia: 0,
    legenda: "",
    concluida: false,
  };
}

export function registroTemConteudo(registro) {
  return Boolean(
    registro.titulo?.trim() ||
      registro.foto ||
      registro.setas?.length ||
      camposRelatorioTemConteudo(registro.camposRelatorio) ||
      registro.observacoes?.trim(),
  );
}

export function criarAvisosRevisao(registros, sinteseMaterial, options = {}) {
  const avisos = [];
  const exigirObservacoes = options.exigirObservacoes !== false;
  const exigirSintese = options.exigirSintese !== false;
  const referenciasAnotacao = options.referenciasAnotacao || {};

  registros.forEach((registro, index) => {
    const nomeRegistro = registro.titulo?.trim() || `Registro ${index + 1}`;
    const referencia = referenciasAnotacao[registro.metaValor] || null;
    const idsEsperados = new Set((referencia?.partes || []).map((parte) => parte.id));
    const usaReferenciaNumerada = idsEsperados.size > 0;

    if (!registro.foto) {
      avisos.push(`${nomeRegistro}: falta adicionar foto.`);
    }

    if (usaReferenciaNumerada) {
      const idsMarcados = new Set(
        (registro.setas || [])
          .map((seta) => seta.referenciaId)
          .filter((id) => idsEsperados.has(id)),
      );

      if (idsMarcados.size < idsEsperados.size) {
        avisos.push(
          `${nomeRegistro}: ${idsMarcados.size} de ${idsEsperados.size} números marcados.`,
        );
      }
    } else if (!registro.setas?.length) {
      avisos.push(`${nomeRegistro}: nenhuma seta identificada.`);
    }

    const setasSemTexto = (registro.setas || []).filter(
      (seta) => !seta.legenda?.trim(),
    ).length;

    if (setasSemTexto) {
      avisos.push(
        `${nomeRegistro}: ${setasSemTexto} ${setasSemTexto === 1 ? "seta está" : "setas estão"} sem texto.`,
      );
    }

    if (exigirObservacoes && !registro.observacoes?.trim()) {
      avisos.push(`${nomeRegistro}: observações da foto ainda não preenchidas.`);
    }
  });

  if (exigirSintese && !sinteseMaterial.trim()) {
    avisos.push("Síntese do material observado ainda não preenchida.");
  }

  return avisos;
}

export function normalizarRotacaoSeta(valor) {
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return 0;
  return Math.max(-180, Math.min(180, Math.round(numero)));
}

export function normalizarTamanhoSeta(valor) {
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return 58;
  return Math.max(8, Math.min(120, Math.round(numero)));
}

export function normalizarFonteSeta(valor) {
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return 12;
  return Math.max(10, Math.min(22, Math.round(numero)));
}

export function normalizarColcheteLargura(valor) {
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return 20;
  return Math.max(10, Math.min(72, Math.round(numero)));
}

export function normalizarTextoOffsetX(valor) {
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return 2;
  return Math.max(-120, Math.min(120, Math.round(numero)));
}

export function normalizarTextoOffsetY(valor) {
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return -50;
  return Math.max(-160, Math.min(80, Math.round(numero)));
}

export function textoLegendaSeta(seta) {
  return seta.legenda?.trim() || seta.corNome || "";
}

function criarCamposRelatorioPadrao(config) {
  const campos = Array.isArray(config?.camposRelatorioExtras)
    ? config.camposRelatorioExtras
    : [];

  return Object.fromEntries(
    campos
      .filter((campo) => campo?.id && campo.id !== "observacoesComplementares")
      .map((campo) => [campo.id, ""]),
  );
}

function camposRelatorioTemConteudo(camposRelatorio) {
  if (!camposRelatorio || typeof camposRelatorio !== "object") return false;
  return Object.values(camposRelatorio).some((valor) => String(valor || "").trim());
}
