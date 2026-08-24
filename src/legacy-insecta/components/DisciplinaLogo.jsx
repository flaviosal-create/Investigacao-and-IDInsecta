import { obterMarcaDisciplina } from "../assets/identidade/marcas.js";

export default function DisciplinaLogo({
  disciplinaId = "projeto-geral",
  size = 72,
  alt,
  withRing = true,
  paddingRatio = 0.04,
}) {
  const marca = obterMarcaDisciplina(disciplinaId);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.24),
        display: "grid",
        placeItems: "center",
        padding: Math.max(2, Math.round(size * paddingRatio)),
        background: "rgba(255,255,255,0.88)",
        border: withRing ? "1px solid var(--color-border)" : "none",
        boxShadow: "0 10px 22px rgba(15, 23, 42, 0.08)",
        overflow: "hidden",
      }}
    >
      <img
        src={marca.src}
        alt={alt || marca.alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
}
