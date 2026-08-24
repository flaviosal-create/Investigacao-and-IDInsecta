import test from "node:test";
import assert from "node:assert/strict";

import {
  criarStatusColecaoSincronizada,
  criarStatusConflitoResolvido,
  criarStatusContaSemDados,
  criarStatusFalhaEnvio,
  criarStatusFalhaSincronizacao,
  criarStatusInicial,
  criarStatusLocal,
  criarStatusSincronizandoNuvem,
  resolverStatusItem,
} from "./sincronizacaoStatus.js";

test("criarStatusInicial usa modo local sem professor", () => {
  assert.deepEqual(criarStatusInicial(""), {
    tipo: "local",
    titulo: "Coleção local",
    descricao: "As exsicatas estão salvas apenas neste navegador.",
  });
});

test("criarStatusInicial usa modo sincronizando com professor", () => {
  assert.deepEqual(criarStatusInicial("prof-1"), {
    tipo: "sincronizando",
    titulo: "Conectando coleção",
    descricao: "Verificando a coleção desta conta na nuvem.",
  });
});

test("factories de status retornam tipos esperados", () => {
  assert.equal(criarStatusContaSemDados().tipo, "sincronizado");
  assert.equal(criarStatusColecaoSincronizada().tipo, "sincronizado");
  assert.equal(criarStatusSincronizandoNuvem().tipo, "sincronizando");
  assert.equal(criarStatusConflitoResolvido({ totalConflitos: 1 }).tipo, "atencao");
  assert.equal(criarStatusFalhaSincronizacao("x").tipo, "erro");
  assert.equal(criarStatusFalhaEnvio("y").tipo, "erro");
  assert.equal(criarStatusLocal("z").tipo, "local");
});

test("factories aceitam contexto customizado para outras colecoes", () => {
  const contexto = {
    singular: "lâmina",
    plural: "lâminas",
    tituloLocal: "Atlas local",
    tituloConectando: "Conectando atlas",
    tituloSincronizada: "Atlas sincronizado",
  };

  assert.deepEqual(criarStatusInicial("", contexto), {
    tipo: "local",
    titulo: "Atlas local",
    descricao: "As lâminas estão salvas apenas neste navegador.",
  });
  assert.equal(
    criarStatusContaSemDados(contexto).descricao,
    "Ainda não há lâminas na nuvem para esta conta.",
  );
  assert.equal(
    criarStatusColecaoSincronizada(contexto).titulo,
    "Atlas sincronizado",
  );
  assert.equal(
    criarStatusSincronizandoNuvem(contexto).descricao,
    "Enviando alterações da lâmina para esta conta.",
  );
  assert.equal(
    criarStatusFalhaEnvio("", contexto).descricao,
    "A lâmina foi mantida localmente, mas a sincronização falhou.",
  );
  assert.equal(
    criarStatusConflitoResolvido(
      { totalConflitos: 2, vencedoresLocal: 1, vencedoresRemoto: 1, empates: 0 },
      contexto,
    ).titulo,
    "Conflitos resolvidos",
  );
});

test("resolverStatusItem prioriza o status atual do item", () => {
  assert.deepEqual(resolverStatusItem({}, "prof", "sincronizado"), {
    tipo: "sincronizado",
    rotulo: "Nuvem",
  });
  assert.deepEqual(resolverStatusItem({}, "prof", "sincronizando"), {
    tipo: "sincronizando",
    rotulo: "Sincronizando",
  });
  assert.deepEqual(resolverStatusItem({}, "prof", "erro"), {
    tipo: "erro",
    rotulo: "Falha",
  });
});

test("resolverStatusItem cai para local quando nao ha status remoto", () => {
  assert.deepEqual(resolverStatusItem({ status: "publicado" }, "prof", ""), {
    tipo: "local",
    rotulo: "Local",
  });
  assert.deepEqual(resolverStatusItem({}, "", ""), {
    tipo: "local",
    rotulo: "Local",
  });
});
