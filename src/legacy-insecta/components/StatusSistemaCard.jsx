const TEMA_STATUS = {
  neutro: {
    fundo:
      "linear-gradient(135deg, color-mix(in srgb, var(--color-surface) 95%, white), color-mix(in srgb, var(--color-surface-soft) 94%, white))",
    borda: "color-mix(in srgb, var(--color-border) 82%, white)",
    seloFundo: "color-mix(in srgb, var(--color-surface-soft) 88%, white)",
    seloTexto: "var(--color-text)",
  },
  positivo: {
    fundo:
      "linear-gradient(135deg, color-mix(in srgb, var(--color-success-soft) 78%, white), color-mix(in srgb, var(--color-surface) 94%, white))",
    borda: "color-mix(in srgb, var(--color-success-soft) 58%, var(--color-border))",
    seloFundo: "var(--color-success-soft)",
    seloTexto: "var(--color-success-text)",
  },
  alerta: {
    fundo:
      "linear-gradient(135deg, color-mix(in srgb, var(--color-warning-soft) 84%, white), color-mix(in srgb, var(--color-surface) 94%, white))",
    borda: "color-mix(in srgb, var(--color-warning-soft) 58%, var(--color-border))",
    seloFundo: "var(--color-warning-soft)",
    seloTexto: "var(--color-warning-text)",
  },
  info: {
    fundo:
      "linear-gradient(135deg, color-mix(in srgb, var(--color-info-soft) 84%, white), color-mix(in srgb, var(--color-surface) 94%, white))",
    borda: "color-mix(in srgb, var(--color-info-soft) 58%, var(--color-border))",
    seloFundo: "var(--color-info-soft)",
    seloTexto: "var(--color-info-text)",
  },
};

export default function StatusSistemaCard({
  titulo = "Status do sistema",
  descricao = "",
  itens = [],
  destaque = "neutro",
}) {
  const tema = TEMA_STATUS[destaque] || TEMA_STATUS.neutro;

  return (
    <section style={{ ...card, background: tema.fundo, borderColor: tema.borda }}>
      <div style={cabecalho}>
        <div style={eyebrow}>Status do sistema</div>
        <h3 style={tituloStyle}>{titulo}</h3>
        {descricao ? <p style={descricaoStyle}>{descricao}</p> : null}
      </div>

      <div style={lista}>
        {itens.map((item) => {
          const temaItem = TEMA_STATUS[item.tom || "neutro"] || tema;
          return (
            <article key={item.rotulo} style={itemCard}>
              <div style={itemTopo}>
                <strong style={itemRotulo}>{item.rotulo}</strong>
                <span
                  style={{
                    ...selo,
                    background: temaItem.seloFundo,
                    color: temaItem.seloTexto,
                  }}
                >
                  {item.valor}
                </span>
              </div>
              {item.ajuda ? <p style={ajuda}>{item.ajuda}</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}

const card = {
  display: "grid",
  gap: 14,
  padding: 18,
  borderRadius: 22,
  border: "1px solid var(--color-border)",
  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.06)",
};

const cabecalho = { display: "grid", gap: 6 };
const eyebrow = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--color-primary)",
};
const tituloStyle = { margin: 0, fontSize: 20, lineHeight: 1.1 };
const descricaoStyle = {
  margin: 0,
  color: "var(--color-muted)",
  fontSize: 14,
  lineHeight: 1.5,
};
const lista = {
  display: "grid",
  gap: 10,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
};
const itemCard = {
  display: "grid",
  gap: 8,
  padding: 14,
  borderRadius: 16,
  background: "color-mix(in srgb, var(--color-surface) 94%, white)",
  border: "1px solid color-mix(in srgb, var(--color-border) 82%, white)",
};
const itemTopo = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
};
const itemRotulo = { fontSize: 14 };
const selo = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "5px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 900,
  whiteSpace: "nowrap",
};
const ajuda = {
  margin: 0,
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.45,
};
