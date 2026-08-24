import { removerRelatoriosLocaisPorAluno } from "./relatoriosLocais.js";

const FOTO_ANOTADA_PREFIX = "labsed_foto_anotada_v1";
const PROFESSOR_AUTH_KEY = "labsed_professor_auth";
const ALUNO_AUTH_KEY = "labsed_aluno_auth";

export async function limparDadosLocaisAlunoOnline(alunoId = "") {
  removerChavesLocalStoragePorPrefixo([FOTO_ANOTADA_PREFIX]);
  removerChavesLocalStorageExatas([ALUNO_AUTH_KEY]);
  await removerRelatoriosLocaisPorAluno(alunoId);
}

export function limparSessaoLocalProfessor() {
  removerChavesLocalStorageExatas([PROFESSOR_AUTH_KEY]);
}

function removerChavesLocalStorageExatas(chaves) {
  if (typeof localStorage === "undefined") return;

  chaves.forEach((chave) => {
    if (chave) localStorage.removeItem(chave);
  });
}

function removerChavesLocalStoragePorPrefixo(prefixos) {
  if (typeof localStorage === "undefined") return;

  const remover = [];
  for (let indice = 0; indice < localStorage.length; indice += 1) {
    const chave = localStorage.key(indice);
    if (!chave) continue;
    if (prefixos.some((prefixo) => chave.startsWith(prefixo))) {
      remover.push(chave);
    }
  }

  remover.forEach((chave) => localStorage.removeItem(chave));
}
