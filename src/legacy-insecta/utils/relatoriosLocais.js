import { DISCIPLINA_PADRAO_ID } from "./ambienteEscolar.js";
import {
  inferirContextoTipoRelatorio,
  obterPoliticaRetomadaTipoRelatorio,
} from "./tiposRelatorio.js";

const DB_NAME = "labsed_identificador";
const DB_VERSION = 1;
const STORE_NAME = "relatorios";

export async function salvarRelatorioLocal(
  relatorio,
  disciplinaId = relatorio?.disciplinaId || DISCIPLINA_PADRAO_ID
) {
  const banco = await abrirBanco();
  const registro = {
    ...relatorio,
    disciplinaId: normalizarDisciplinaId(disciplinaId),
    atualizadoEm: new Date().toISOString(),
  };

  await executarTransacao(banco, "readwrite", (store) => store.put(registro));
  return registro;
}

export async function listarRelatoriosLocais(
  disciplinaId = DISCIPLINA_PADRAO_ID
) {
  const idDisciplina = normalizarDisciplinaId(disciplinaId);
  const banco = await abrirBanco();
  const registros = await executarTransacao(
    banco,
    "readonly",
    (store) => store.getAll()
  );

  return registros
    .filter((relatorio) => relatorioDaDisciplina(relatorio, idDisciplina))
    .sort((a, b) => new Date(b.atualizadoEm) - new Date(a.atualizadoEm));
}

export async function listarTodosRelatoriosLocais() {
  const banco = await abrirBanco();
  const registros = await executarTransacao(
    banco,
    "readonly",
    (store) => store.getAll()
  );

  return Array.isArray(registros) ? registros : [];
}

export async function removerRelatorioLocal(id) {
  const banco = await abrirBanco();
  await executarTransacao(banco, "readwrite", (store) => store.delete(id));
}

export async function removerRelatoriosLocaisPorAluno(alunoId) {
  if (!alunoId) return 0;

  const registros = await listarTodosRelatoriosLocais();
  const ids = registros
    .filter((relatorio) => relatorio?.alunoId === alunoId)
    .map((relatorio) => relatorio.id)
    .filter(Boolean);

  await Promise.all(ids.map((id) => removerRelatorioLocal(id)));
  return ids.length;
}

export async function atualizarStatusRelatorioLocal(id, status) {
  const banco = await abrirBanco();
  const atual = await executarTransacao(
    banco,
    "readonly",
    (store) => store.get(id)
  );

  if (!atual) return null;
  return salvarRelatorioLocal(
    { ...atual, status },
    atual.disciplinaId || DISCIPLINA_PADRAO_ID
  );
}

export function podeRetomarRelatorio(relatorio) {
  const politica = obterPoliticaRetomadaTipoRelatorio(
    inferirContextoTipoRelatorio(relatorio)
  );

  return Boolean(
    relatorio &&
      relatorio.status === "rascunho" &&
      relatorio.origem !== "nuvem" &&
      politica.permiteRetomadaLocal &&
      politica.telasPermitidas.has(relatorio.progresso?.tela) &&
      relatorio.progresso?.chaveId &&
      relatorio.progresso?.currentId
  );
}

function relatorioDaDisciplina(relatorio, disciplinaId) {
  const idRelatorio = normalizarDisciplinaId(
    relatorio?.disciplinaId || DISCIPLINA_PADRAO_ID
  );
  return idRelatorio === disciplinaId;
}

function normalizarDisciplinaId(valor) {
  return (
    String(valor || DISCIPLINA_PADRAO_ID)
      .trim()
      .toLocaleLowerCase("pt-BR")
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "") || DISCIPLINA_PADRAO_ID
  );
}

function abrirBanco() {
  return new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) {
      reject(new Error("IndexedDB não está disponível neste navegador."));
      return;
    }

    const request = globalThis.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const banco = request.result;
      if (!banco.objectStoreNames.contains(STORE_NAME)) {
        const store = banco.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("turmaId", "turmaId");
        store.createIndex("alunoId", "alunoId");
        store.createIndex("status", "status");
        store.createIndex("atualizadoEm", "atualizadoEm");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function executarTransacao(banco, modo, operacao) {
  return new Promise((resolve, reject) => {
    const transacao = banco.transaction(STORE_NAME, modo);
    const request = operacao(transacao.objectStore(STORE_NAME));

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transacao.oncomplete = () => banco.close();
    transacao.onerror = () => reject(transacao.error);
  });
}
