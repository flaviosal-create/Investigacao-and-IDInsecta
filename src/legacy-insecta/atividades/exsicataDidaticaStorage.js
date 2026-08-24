import {
  criarExsicataVirtualRascunho,
  herbarioVirtualEtapas,
} from "./botanicaHerbarioVirtualModel.js";

const STORAGE_KEY = "labsed_botanica_exsicata_didatica_v1";

export function carregarColecaoExsicatasLocal() {
  if (typeof window === "undefined" || !window.localStorage) {
    return {
      colecao: criarColecaoVazia(),
      podePersistir: false,
      mensagem: "Este navegador abriu a coleção em modo temporário.",
    };
  }

  try {
    const bruto = window.localStorage.getItem(STORAGE_KEY);
    if (!bruto) {
      return {
        colecao: criarColecaoVazia(),
        podePersistir: true,
        mensagem: "",
      };
    }

    const parsed = JSON.parse(bruto);
    const colecao = normalizarColecao(parsed);
    return {
      colecao,
      podePersistir: true,
      mensagem: colecao.workspace.rascunhoAtual
        ? "Exsicata reaberta no ponto em que esta edição foi interrompida."
        : "Coleção recuperada deste navegador.",
    };
  } catch {
    return {
      colecao: criarColecaoVazia(),
      podePersistir: false,
      mensagem:
        "Não foi possível ler a coleção salva neste navegador. O app abriu em modo de proteção.",
    };
  }
}

export function salvarColecaoExsicatasLocal(colecao) {
  if (typeof window === "undefined" || !window.localStorage) {
    return {
      ok: false,
      mensagem: "Este navegador não oferece armazenamento local para a coleção.",
    };
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(normalizarColecao(colecao)),
    );
    return { ok: true, mensagem: "" };
  } catch {
    return {
      ok: false,
      mensagem:
        "O navegador não conseguiu salvar a coleção localmente. Revise o espaço disponível ou reduza a quantidade de imagens mantidas abertas.",
    };
  }
}

export function criarColecaoVazia() {
  return {
    rascunhos: {},
    publicadas: {},
    atualizadoEm: "",
    workspace: criarWorkspacePadrao(),
  };
}

export function normalizarColecao(entrada) {
  const rascunhos = normalizarMapaExsicatas(entrada?.rascunhos);
  const publicadas = normalizarMapaExsicatas(entrada?.publicadas);

  return {
    rascunhos,
    publicadas,
    atualizadoEm: String(entrada?.atualizadoEm || ""),
    workspace: normalizarWorkspace(entrada?.workspace),
  };
}

function criarWorkspacePadrao() {
  return {
    etapaAtivaId: herbarioVirtualEtapas[0]?.id || "orientacao",
    publicadaAtivaId: "",
    rascunhoAtual: null,
  };
}

function normalizarWorkspace(workspace) {
  const base = criarWorkspacePadrao();
  const etapaExiste = herbarioVirtualEtapas.some(
    (item) => item.id === workspace?.etapaAtivaId,
  );

  return {
    etapaAtivaId: etapaExiste ? workspace.etapaAtivaId : base.etapaAtivaId,
    publicadaAtivaId: String(workspace?.publicadaAtivaId || ""),
    rascunhoAtual:
      workspace?.rascunhoAtual && typeof workspace.rascunhoAtual === "object"
        ? normalizarExsicata(workspace.rascunhoAtual)
        : null,
  };
}

function normalizarMapaExsicatas(mapa) {
  if (!mapa || typeof mapa !== "object") return {};

  return Object.fromEntries(
    Object.entries(mapa)
      .map(([id, item]) => [id, normalizarExsicata(item)])
      .filter(([, item]) => Boolean(item?.id)),
  );
}

function normalizarExsicata(item) {
  const base = criarExsicataVirtualRascunho();
  const entrada = item && typeof item === "object" ? item : {};
  const fotosEntrada = Array.isArray(entrada.fotos) ? entrada.fotos : [];

  return {
    ...base,
    ...entrada,
    id: String(entrada.id || base.id),
    titulo: String(entrada.titulo || base.titulo),
    status: entrada.status === "publicado" ? "publicado" : "rascunho",
    criadoEm: String(entrada.criadoEm || ""),
    atualizadoEm: String(entrada.atualizadoEm || ""),
    publicadoEm: String(entrada.publicadoEm || ""),
    fotos: base.fotos.map((slot) => {
      const existente = fotosEntrada.find((foto) => foto?.id === slot.id) || {};
      return {
        ...slot,
        ...existente,
        id: slot.id,
        titulo: String(existente.titulo || slot.titulo),
        dica: String(existente.dica || slot.dica),
        obrigatoria: Boolean(
          typeof existente.obrigatoria === "boolean"
            ? existente.obrigatoria
            : slot.obrigatoria,
        ),
        foto: String(existente.foto || ""),
        legenda: String(existente.legenda || ""),
      };
    }),
    etiqueta: {
      ...base.etiqueta,
      ...(entrada.etiqueta || {}),
    },
    leituraMorfologica: {
      ...base.leituraMorfologica,
      ...(entrada.leituraMorfologica || {}),
    },
    cadernetaCampo: {
      ...base.cadernetaCampo,
      ...(entrada.cadernetaCampo || {}),
    },
  };
}
