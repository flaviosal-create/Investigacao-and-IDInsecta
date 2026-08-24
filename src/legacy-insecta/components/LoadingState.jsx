/**
 * Componente de Loading State com Spinner
 * Usado para indicar que um processo está em andamento
 */
export default function LoadingState({
  message = "Carregando...",
  fullscreen = false,
  size = "medium",
}) {
  const sizeMap = {
    small: "16px",
    medium: "24px",
    large: "36px",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    padding: fullscreen ? undefined : "32px",
    minHeight: fullscreen ? "100vh" : "200px",
    width: "100%",
  };

  const spinnerStyle = {
    width: sizeMap[size] || "24px",
    height: sizeMap[size] || "24px",
  };

  const messageStyle = {
    color: "var(--color-muted)",
    fontSize: "14px",
    fontWeight: 500,
  };

  return (
    <div style={containerStyle}>
      <div className="loading-spinner" style={spinnerStyle} />
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
}
