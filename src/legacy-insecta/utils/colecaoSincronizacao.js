function paraTimestamp(valor) {
  const numero = Date.parse(String(valor || ""));
  return Number.isFinite(numero) ? numero : 0;
}

export function obterCarimboAtualizacao(item) {
  if (!item || typeof item !== "object") return 0;

  return Math.max(
    paraTimestamp(item.atualizadoEm),
    paraTimestamp(item.publicadoEm),
    paraTimestamp(item.salvoEm),
    paraTimestamp(item.criadoEm),
  );
}

function escolherMaisRecente(local, remoto) {
  const carimboLocal = obterCarimboAtualizacao(local);
  const carimboRemoto = obterCarimboAtualizacao(remoto);

  if (carimboRemoto > carimboLocal) return remoto;
  if (carimboLocal > carimboRemoto) return local;
  return remoto || local;
}

function resolverConflitoItem(local, remoto) {
  if (!local && !remoto) {
    return { item: null, origem: "nenhuma", houveConflito: false };
  }
  if (!local) {
    return { item: remoto, origem: "remoto", houveConflito: false };
  }
  if (!remoto) {
    return { item: local, origem: "local", houveConflito: false };
  }

  const carimboLocal = obterCarimboAtualizacao(local);
  const carimboRemoto = obterCarimboAtualizacao(remoto);
  const houveConflito = carimboLocal > 0 && carimboRemoto > 0;

  if (carimboRemoto > carimboLocal) {
    return { item: remoto, origem: "remoto", houveConflito };
  }
  if (carimboLocal > carimboRemoto) {
    return { item: local, origem: "local", houveConflito };
  }
  return { item: remoto || local, origem: "empate", houveConflito };
}

function mesclarMapasPorRecencia(local = {}, remoto = {}) {
  const chaves = new Set([
    ...Object.keys(local || {}),
    ...Object.keys(remoto || {}),
  ]);

  return Object.fromEntries(
    Array.from(chaves).map((id) => [
      id,
      escolherMaisRecente(local?.[id], remoto?.[id]),
    ]),
  );
}

export function mesclarColecaoComRemota(local = {}, remoto = {}) {
  return {
    atualizadoEm:
      remoto?.atualizadoEm || local?.atualizadoEm || "",
    rascunhos: mesclarMapasPorRecencia(local?.rascunhos, remoto?.rascunhos),
    publicadas: mesclarMapasPorRecencia(local?.publicadas, remoto?.publicadas),
  };
}

export function mesclarColecaoComRemotaDetalhada(local = {}, remoto = {}) {
  const chaves = new Set([
    ...Object.keys(local?.rascunhos || {}),
    ...Object.keys(local?.publicadas || {}),
    ...Object.keys(remoto?.rascunhos || {}),
    ...Object.keys(remoto?.publicadas || {}),
  ]);

  const conflitos = [];

  for (const id of chaves) {
    const localItem = local?.publicadas?.[id] || local?.rascunhos?.[id] || null;
    const remotoItem = remoto?.publicadas?.[id] || remoto?.rascunhos?.[id] || null;
    const resolucao = resolverConflitoItem(localItem, remotoItem);

    if (resolucao.houveConflito) {
      conflitos.push({
        id,
        origemVencedora: resolucao.origem,
        carimboLocal: obterCarimboAtualizacao(localItem),
        carimboRemoto: obterCarimboAtualizacao(remotoItem),
      });
    }
  }

  return {
    colecao: mesclarColecaoComRemota(local, remoto),
    resumo: {
      totalConflitos: conflitos.length,
      vencedoresLocal: conflitos.filter((item) => item.origemVencedora === "local").length,
      vencedoresRemoto: conflitos.filter((item) => item.origemVencedora === "remoto").length,
      empates: conflitos.filter((item) => item.origemVencedora === "empate").length,
      conflitos,
    },
  };
}

export function listarItensPendentesSincronizacao(
  colecao = {},
  statusPorItem = {},
) {
  const itens = new Map();

  [...Object.values(colecao?.rascunhos || {}), ...Object.values(colecao?.publicadas || {})]
    .forEach((item) => {
      if (!item?.id) return;
      itens.set(item.id, item);
    });

  return Array.from(itens.values())
    .filter((item) => {
      const status = statusPorItem?.[item.id] || "";
      return status !== "sincronizado" && status !== "sincronizando";
    })
    .sort(
      (a, b) => obterCarimboAtualizacao(b) - obterCarimboAtualizacao(a),
    );
}
