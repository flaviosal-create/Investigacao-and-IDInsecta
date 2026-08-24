export default function LayoutChave({
  title,
  onBack,
  onReset,
  ordem,
  caminhoTaxonomico = [],
  mode = "pratica",
  insetoIndex = 1,
  totalInsetos = 1,
  itemLabel = "Inseto",
  tempoProvaTexto = "",
  onOpenSession,
  history = [],
  onHistorySelect,
  showResult = false,
  children,
}) {
  const isProva = mode === "prova";
  const isChaveOrdens = title === "Ordens de Insecta";
  const isModoInvestigativo = title === "Modo Investigativo";
  const contextoChave =
    isChaveOrdens || isModoInvestigativo ? "" : "Chave para famílias";
  const progresso = isProva
    ? Math.min(100, Math.max(0, (insetoIndex / totalInsetos) * 100))
    : 0;

  return (
    <main style={page}>
      <section className="layout-chave-hero" style={hero}>
        <div className="layout-chave-hero-main" style={heroMain}>
          <div className="layout-chave-title-block" style={titleBlock}>
            <div style={eyebrow}>
              {isProva ? "Avaliação guiada" : "Prática orientada"}
              {contextoChave ? (
                <span style={eyebrowContext}>({contextoChave})</span>
              ) : null}
            </div>

            <h1 style={titleStyle}>{title}</h1>
          </div>

          {ordem ? <div style={ordemPill}>{ordem}</div> : null}

          {caminhoTaxonomico.length > 0 ? (
            <div style={taxPathWrap} aria-label="Caminho taxonômico">
              {caminhoTaxonomico.map((item, index) => (
                <span key={`${item}-${index}`} style={taxStep}>
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="layout-chave-status-panel" style={statusPanel}>
          <div style={statusInfo}>
            <div style={modeBadge(isProva)}>
              {isProva ? "Prova" : "Prática"}
            </div>

            <div style={counterText}>
              {isProva
                ? `${itemLabel} ${insetoIndex} de ${totalInsetos}`
                : `${itemLabel} ${insetoIndex}`}
            </div>

            {tempoProvaTexto ? (
              <div style={timerText}>{tempoProvaTexto}</div>
            ) : null}

            {isProva ? (
              <div style={progressTrack}>
                <div style={{ ...progressFill, width: `${progresso}%` }} />
              </div>
            ) : null}
          </div>

          {(onBack || onReset || onOpenSession) ? (
            <div className="layout-chave-status-actions" style={statusActions}>
              {onBack ? (
                <button className="btn btn--secondary btn--compact" style={statusButton} onClick={onBack}>
                  Voltar
                </button>
              ) : null}

              {onReset ? (
                <button className="btn btn--secondary btn--compact" style={statusButton} onClick={onReset}>
                  Reiniciar
                </button>
              ) : null}

              {onOpenSession ? (
                <button className="btn btn--primary btn--compact" style={statusButton} onClick={onOpenSession}>
                  Ver sessão
                </button>
              ) : null}
            </div>
          ) : null}
        </aside>

      </section>

      <section style={contentGrid}>
        <div className="surface layout-chave-main-card" style={mainCard}>
          {children}
        </div>

        {!isProva && !showResult && history.length > 0 ? (
          <aside className="surface layout-chave-history" style={historyBox}>
            <div className="layout-chave-history-title" style={historyTitle}>
              Histórico
            </div>

            {history.map((item, index) => (
              <button
                className="layout-chave-history-item"
                key={`${item.id}-${index}`}
                type="button"
                style={historyItem}
                onClick={() => onHistorySelect?.(index)}
              >
                <span style={historyQuestion}>
                  {index + 1}. {item.title}
                </span>
                <span style={historyAnswer}>{item.selected}</span>
              </button>
            ))}
          </aside>
        ) : null}
      </section>
    </main>
  );
}

const page = {
  width: "min(980px, 100%)",
  margin: "0 auto",
};

const hero = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(155px, 205px)",
  gap: 10,
  alignItems: "stretch",
  marginBottom: 10,
};

const heroMain = {
  minWidth: 0,
  minHeight: 112,
  padding: "16px 18px",
  borderRadius: 18,
  color: "var(--color-text)",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-lg)",
};

const titleBlock = {
  paddingLeft: 58,
};

const eyebrow = {
  display: "flex",
  alignItems: "baseline",
  gap: 6,
  flexWrap: "wrap",
  marginBottom: 4,
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-info)",
};

const eyebrowContext = {
  fontSize: 9.5,
  fontWeight: 700,
  letterSpacing: 0,
  textTransform: "none",
  color: "var(--color-muted)",
};

const titleStyle = {
  margin: 0,
  fontSize: "clamp(1.45rem, 3.4vw, 2.1rem)",
  lineHeight: 1.02,
};

const ordemPill = {
  display: "inline-flex",
  marginTop: 9,
  padding: "5px 9px",
  borderRadius: 999,
  background: "var(--color-info-soft)",
  border: "1px solid var(--color-info-border)",
  color: "var(--color-info-text)",
  fontWeight: 750,
};

const taxPathWrap = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  marginTop: 10,
};

const taxStep = {
  padding: "4px 8px",
  borderRadius: 999,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 700,
};

const statusPanel = {
  minWidth: 0,
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  alignItems: "center",
  gap: 8,
  padding: 10,
  borderRadius: 15,
  background: "color-mix(in srgb, var(--color-surface) 92%, transparent)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-md)",
};

const statusInfo = {
  minWidth: 0,
  display: "grid",
  gap: 5,
};

const modeBadge = (isProva) => ({
  alignSelf: "flex-start",
  padding: "5px 8px",
  borderRadius: 999,
  color: isProva ? "var(--color-warning-text)" : "var(--color-success-text)",
  background: isProva ? "var(--color-warning-soft)" : "var(--color-success-soft)",
  fontSize: 10.5,
  fontWeight: 850,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

const counterText = {
  color: "var(--color-text)",
  fontSize: 15,
  fontWeight: 850,
  lineHeight: 1.15,
  wordBreak: "break-word",
};

const timerText = {
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 800,
};

const progressTrack = {
  height: 7,
  overflow: "hidden",
  borderRadius: 999,
  background: "var(--color-bg-soft)",
};

const progressFill = {
  height: "100%",
  borderRadius: 999,
  background: "var(--color-secondary)",
};

const statusActions = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 4,
  minWidth: 68,
};

const statusButton = {
  minHeight: 28,
  padding: "0.28rem 0.45rem",
  borderRadius: 9,
  fontSize: 11,
  lineHeight: 1.1,
};

const contentGrid = {
  display: "grid",
  gap: 10,
};

const mainCard = {
  padding: 14,
};

const historyTitle = {
  marginBottom: 10,
  color: "var(--color-text)",
  fontWeight: 850,
};

const historyBox = {
  padding: 16,
};

const historyItem = {
  display: "grid",
  width: "100%",
  gap: 4,
  marginBottom: 8,
  padding: 12,
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  color: "var(--color-text)",
  textAlign: "left",
  cursor: "pointer",
};

const historyQuestion = {
  fontWeight: 760,
};

const historyAnswer = {
  color: "var(--color-muted)",
  fontSize: 13,
};
