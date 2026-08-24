import { safeFileName } from "./text.js";

export const CUSTOM_KEYS_STORAGE_KEY = "chaves_personalizadas_usuario";

function criarIdChave(titulo) {
  const base = safeFileName(titulo || "chave-personalizada")
    .replace(/\.json$/i, "")
    .replace(/[^a-z0-9_-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return `USER:${base || "chave-personalizada"}-${Date.now()}`;
}

export function carregarChavesPersonalizadas() {
  try {
    const bruto = localStorage.getItem(CUSTOM_KEYS_STORAGE_KEY);
    const lista = bruto ? JSON.parse(bruto) : [];

    return Array.isArray(lista)
      ? lista.filter((item) => item?.id && item?.chave?.nodes)
      : [];
  } catch {
    return [];
  }
}

export function salvarChavesPersonalizadas(lista) {
  localStorage.setItem(CUSTOM_KEYS_STORAGE_KEY, JSON.stringify(lista || []));
  window.dispatchEvent(new Event("chaves-personalizadas-atualizadas"));
}

export function anexarChavePersonalizada(chave) {
  const lista = carregarChavesPersonalizadas();
  const titulo = String(chave?.titulo || "").trim() || "Chave personalizada";
  const item = {
    id: criarIdChave(titulo),
    titulo,
    criadaEm: new Date().toISOString(),
    chave,
  };

  salvarChavesPersonalizadas([item, ...lista]);
  return item;
}

export function removerChavePersonalizada(id) {
  const lista = carregarChavesPersonalizadas().filter((item) => item.id !== id);
  salvarChavesPersonalizadas(lista);
  return lista;
}
