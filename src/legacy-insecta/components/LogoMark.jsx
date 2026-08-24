import logo from "../assets/logo-diptera.png";

export default function LogoMark({ inverted = false }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: inverted ? "#ffffff" : "var(--color-primary)",
      }}
    >
      <img
        src={logo}
        alt="Logo da Chave de Identificação de Insetos"
        style={{
          width: 66,
          height: 66,
          filter: inverted ? "drop-shadow(0 8px 16px rgba(0,0,0,0.18))" : "none",
        }}
      />

      <div
        style={{
          fontWeight: 850,
          fontSize: 18,
          color: "currentColor",
          lineHeight: 1.1,
        }}
      >
        Chave de Identificação de Insetos
      </div>
    </div>
  );
}
