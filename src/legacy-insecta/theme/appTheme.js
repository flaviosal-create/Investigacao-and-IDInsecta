export const THEME_STORAGE_KEY = "tema_visual_app";

export const THEMES_DISPONIVEIS = [
  "labsed",
  "rio",
  "campo",
  "noite",
  "contraste",
];

export function normalizarTemaVisual(valor) {
  return THEMES_DISPONIVEIS.includes(valor) ? valor : "labsed";
}

export function aplicarTemaVisual(temaVisual = "labsed") {
  if (typeof document === "undefined") return;

  const temaNormalizado = normalizarTemaVisual(temaVisual);

  if (temaNormalizado === "labsed") {
    document.documentElement.removeAttribute("data-theme");
    return;
  }

  document.documentElement.setAttribute("data-theme", temaNormalizado);
}
