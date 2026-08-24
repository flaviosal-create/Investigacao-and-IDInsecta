export default function HeaderOrdem({ ordem }) {
  if (!ordem) return null;

  return (
    <div
      style={{
        marginBottom: 16,
        padding: "10px 14px",
        borderRadius: 12,
        background: "var(--color-info-soft)",
        border: "1px solid var(--color-info-border)",
        textAlign: "center",
        fontWeight: 700,
        color: "var(--color-info-text)",
        fontSize: 14,
      }}
    >
      Ordem atual: {ordem}
    </div>
  );
}
