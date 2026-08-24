export default function TelaCarregando({ rotulo }) {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: "28px auto",
        padding: 18,
        textAlign: "center",
        borderRadius: 16,
        background: "color-mix(in srgb, var(--color-surface) 94%, transparent)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text)",
        fontWeight: 700,
      }}
    >
      {rotulo}
    </div>
  );
}
