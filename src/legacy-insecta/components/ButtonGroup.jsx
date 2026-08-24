/**
 * Componente ButtonGroup
 * Agrupa e organiza botões de forma responsiva
 */

export default function ButtonGroup({
  buttons = [],
  layout = "horizontal",
  align = "center",
  gap = "12px",
}) {
  const containerStyle = {
    display: "flex",
    flexDirection: layout === "vertical" ? "column" : "row",
    gap,
    alignItems: align === "center" ? "center" : align === "start" ? "flex-start" : "flex-end",
    justifyContent:
      align === "center"
        ? "center"
        : align === "start"
          ? "flex-start"
          : "flex-end",
    flexWrap: "wrap",
  };

  return (
    <div style={containerStyle}>
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          disabled={btn.disabled}
          title={btn.title}
          aria-label={btn.ariaLabel}
          style={{
            ...btn.style,
            minHeight: "44px",
            minWidth: layout === "vertical" ? "100%" : "auto",
          }}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
