import { useState } from "react";
import {
  aplicarTemaVisual,
  normalizarTemaVisual,
  THEME_STORAGE_KEY,
} from "../theme/appTheme.js";

/**
 * ThemeSwitcher - Dropdown compacto para seleção de temas
 * Temas: labsed (padrão), rio, campo, noite, contraste
 */
export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) return normalizarTemaVisual(saved);
    }
    return "labsed";
  });

  const themes = [
    { id: "labsed", label: "Padrão" },
    { id: "rio", label: "Rio" },
    { id: "campo", label: "Campo" },
    { id: "noite", label: "Noite" },
    { id: "contraste", label: "Contraste" },
  ];

  const handleThemeChange = (e) => {
    const themeId = normalizarTemaVisual(e.target.value);
    setCurrentTheme(themeId);

    aplicarTemaVisual(themeId);
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  };

  return (
    <select
      value={currentTheme}
      onChange={handleThemeChange}
      style={selectStyle}
      title="Selecionar tema"
      aria-label="Tema visual"
    >
      {themes.map((theme) => (
        <option key={theme.id} value={theme.id}>
          {theme.label}
        </option>
      ))}
    </select>
  );
}

const selectStyle = {
  width: "100%",
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  fontSize: "12px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.15s ease",
  outline: "none",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
};
