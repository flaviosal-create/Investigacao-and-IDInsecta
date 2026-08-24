import test from "node:test";
import assert from "node:assert/strict";

import { normalizarColecao } from "./exsicataDidaticaStorage.js";

test("normalizarColecao preserva rascunhos e normaliza fotos faltantes", () => {
  const colecao = normalizarColecao({
    rascunhos: {
      a1: {
        id: "a1",
        titulo: "Teste",
        fotos: [{ id: "ramo", foto: "abc", legenda: "ramo" }],
      },
    },
  });

  assert.equal(colecao.rascunhos.a1.id, "a1");
  assert.equal(colecao.rascunhos.a1.titulo, "Teste");
  assert.equal(
    colecao.rascunhos.a1.fotos.find((foto) => foto.id === "ramo").foto,
    "abc",
  );
  assert.ok(
    colecao.rascunhos.a1.fotos.find((foto) => foto.id === "habito"),
    "deve completar slots padrão ausentes",
  );
});

test("normalizarColecao retorna estrutura vazia para entrada inválida", () => {
  const colecao = normalizarColecao(null);
  assert.deepEqual(colecao, {
    rascunhos: {},
    publicadas: {},
    atualizadoEm: "",
    workspace: {
      etapaAtivaId: "orientacao",
      publicadaAtivaId: "",
      rascunhoAtual: null,
    },
  });
});

test("normalizarColecao preserva workspace de reabertura", () => {
  const colecao = normalizarColecao({
    workspace: {
      etapaAtivaId: "preview",
      publicadaAtivaId: "pub-1",
      rascunhoAtual: {
        id: "rasc-1",
        titulo: "Rascunho atual",
      },
    },
  });

  assert.equal(colecao.workspace.etapaAtivaId, "preview");
  assert.equal(colecao.workspace.publicadaAtivaId, "pub-1");
  assert.equal(colecao.workspace.rascunhoAtual.id, "rasc-1");
});
