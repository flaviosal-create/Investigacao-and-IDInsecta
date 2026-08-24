export default function Placeholder3D({
  label = "Modelo 3D indisponivel",
  titulo = "",
}) {
  return (
    <div style={placeholderStyle} role="status" aria-live="polite">
      <div style={iconStyle} aria-hidden="true">
        3D
      </div>
      <div>
        {titulo ? <div style={titleStyle}>{titulo}</div> : null}
        <div style={labelStyle}>{label}</div>
      </div>
    </div>
  );
}

const placeholderStyle = {
  alignItems: "center",
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  borderRadius: 16,
  color: "var(--color-muted)",
  display: "flex",
  gap: 12,
  justifyContent: "center",
  margin: "12px auto",
  maxWidth: 420,
  minHeight: 120,
  padding: 16,
  textAlign: "left",
};

const iconStyle = {
  alignItems: "center",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  color: "var(--color-text)",
  display: "inline-flex",
  flex: "0 0 auto",
  fontSize: 13,
  fontWeight: 900,
  height: 44,
  justifyContent: "center",
  width: 44,
};

const titleStyle = {
  color: "var(--color-text)",
  fontWeight: 900,
  lineHeight: 1.25,
  marginBottom: 4,
};

const labelStyle = {
  fontSize: 13,
  lineHeight: 1.4,
};
