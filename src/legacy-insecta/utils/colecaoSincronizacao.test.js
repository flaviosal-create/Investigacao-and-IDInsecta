import test from "node:test";
import assert from "node:assert/strict";

import {
  listarItensPendentesSincronizacao,
  mesclarColecaoComRemota,
  mesclarColecaoComRemotaDetalhada,
  obterCarimboAtualizacao,
} from "./colecaoSincronizacao.js";

test("obterCarimboAtualizacao usa o timestamp mais recente disponivel", () => {
  const carimbo = obterCarimboAtualizacao({
    salvoEm: "2026-07-10T10:00:00.000Z",
    atualizadoEm: "2026-07-11T10:00:00.000Z",
    publicadoEm: "2026-07-12T10:00:00.000Z",
  });

  assert.equal(carimbo, Date.parse("2026-07-12T10:00:00.000Z"));
});

test("mesclarColecaoComRemota preserva a versao mais recente por item", () => {
  const local = {
    atualizadoEm: "2026-07-11T10:00:00.000Z",
    rascunhos: {
      a1: {
        id: "a1",
        titulo: "Local mais novo",
        atualizadoEm: "2026-07-12T12:00:00.000Z",
      },
    },
    publicadas: {},
  };
  const remoto = {
    atualizadoEm: "2026-07-13T10:00:00.000Z",
    rascunhos: {
      a1: {
        id: "a1",
        titulo: "Remoto mais antigo",
        atualizadoEm: "2026-07-11T12:00:00.000Z",
      },
      a2: {
        id: "a2",
        titulo: "Remoto novo",
        atualizadoEm: "2026-07-13T09:00:00.000Z",
      },
    },
    publicadas: {},
  };

  const mesclado = mesclarColecaoComRemota(local, remoto);

  assert.equal(mesclado.rascunhos.a1.titulo, "Local mais novo");
  assert.equal(mesclado.rascunhos.a2.titulo, "Remoto novo");
  assert.equal(mesclado.atualizadoEm, "2026-07-13T10:00:00.000Z");
});

test("mesclarColecaoComRemotaDetalhada resume conflitos resolvidos", () => {
  const { colecao, resumo } = mesclarColecaoComRemotaDetalhada(
    {
      rascunhos: {
        a1: { id: "a1", atualizadoEm: "2026-07-15T10:00:00.000Z" },
      },
      publicadas: {},
    },
    {
      rascunhos: {
        a1: { id: "a1", atualizadoEm: "2026-07-14T10:00:00.000Z" },
        a2: { id: "a2", atualizadoEm: "2026-07-16T10:00:00.000Z" },
      },
      publicadas: {},
    },
  );

  assert.equal(colecao.rascunhos.a1.atualizadoEm, "2026-07-15T10:00:00.000Z");
  assert.equal(resumo.totalConflitos, 1);
  assert.equal(resumo.vencedoresLocal, 1);
  assert.equal(resumo.vencedoresRemoto, 0);
});

test("listarItensPendentesSincronizacao retorna apenas itens ainda nao sincronizados", () => {
  const pendentes = listarItensPendentesSincronizacao(
    {
      rascunhos: {
        a1: { id: "a1", atualizadoEm: "2026-07-10T10:00:00.000Z" },
        a2: { id: "a2", atualizadoEm: "2026-07-12T10:00:00.000Z" },
      },
      publicadas: {
        a3: { id: "a3", atualizadoEm: "2026-07-11T10:00:00.000Z" },
      },
    },
    {
      a1: "sincronizado",
      a3: "erro",
    },
  );

  assert.deepEqual(
    pendentes.map((item) => item.id),
    ["a2", "a3"],
  );
});
