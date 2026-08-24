export default function FluxoEtapasCard({
  eyebrow = "Sequência guiada",
  title,
  steps = [],
  activeId = "",
  onChange,
  ariaLabel = "Etapas",
  currentLabel = "",
  mobile = false,
  summaryTone = "soft",
  actions = null,
}) {
  const activeStep = steps.find((item) => item.id === activeId) || steps[0] || null;

  if (!activeStep) return null;

  return (
    <div style={{ ...container, ...(mobile ? containerMobile : null) }}>
      <div style={{ ...header, ...(mobile ? headerMobile : null) }}>
        <div>
          <span style={{ ...eyebrowStyle, ...(mobile ? eyebrowMobile : null) }}>{eyebrow}</span>
          <h3 style={{ ...titleStyle, ...(mobile ? titleMobile : null) }}>{title}</h3>
        </div>
        {currentLabel ? (
          <span style={{ ...counter, ...(mobile ? counterMobile : null) }}>{currentLabel}</span>
        ) : null}
      </div>

      <div style={{ ...tabs, ...(mobile ? tabsMobile : null) }} role="tablist" aria-label={ariaLabel}>
        {steps.map((step) => (
          <button
            key={step.id}
            type="button"
            className={
              step.id === activeStep.id
                ? "btn btn--primary btn--compact"
                : "btn btn--secondary btn--compact"
            }
            style={{ ...tabButton, ...(mobile ? tabButtonMobile : null) }}
            onClick={() => onChange?.(step.id)}
          >
            {step.rotulo}
          </button>
        ))}
      </div>

      <div
        style={{
          ...summary,
          ...(mobile ? summaryMobile : null),
          ...(summaryTone === "surface" ? summarySurface : null),
        }}
      >
        <strong style={{ ...summaryTitle, ...(mobile ? summaryTitleMobile : null) }}>
          {activeStep.rotulo}
        </strong>
        <p style={{ ...summaryText, ...(mobile ? summaryTextMobile : null) }}>
          {activeStep.descricao}
        </p>
      </div>

      {actions ? <div style={{ ...actionsWrap, ...(mobile ? actionsWrapMobile : null) }}>{actions}</div> : null}
    </div>
  );
}

const container = {
  display: "grid",
  gap: 12,
  padding: 14,
  borderRadius: 16,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const containerMobile = {
  gap: 10,
  padding: 12,
  borderRadius: 14,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "flex-start",
  flexWrap: "wrap",
};

const headerMobile = {
  display: "grid",
  justifyContent: "stretch",
  gap: 8,
};

const eyebrowStyle = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-accent-strong)",
};

const eyebrowMobile = {
  fontSize: 10,
  letterSpacing: "0.07em",
};

const titleStyle = {
  margin: "4px 0 0",
  fontSize: 20,
};

const titleMobile = {
  marginTop: 2,
  fontSize: 16,
  lineHeight: 1.12,
};

const counter = {
  alignSelf: "flex-start",
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  fontSize: 12,
  fontWeight: 700,
  color: "var(--color-text)",
};

const counterMobile = {
  padding: "6px 10px",
  fontSize: 11,
};

const tabs = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const tabsMobile = {
  gap: 6,
};

const tabButton = {
  minHeight: 38,
};

const tabButtonMobile = {
  minHeight: 34,
  padding: "0.45rem 0.7rem",
  fontSize: 13,
};

const summary = {
  display: "grid",
  gap: 4,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const summaryMobile = {
  gap: 3,
  padding: 10,
  borderRadius: 10,
};

const summarySurface = {
  background: "var(--color-surface-soft)",
};

const summaryTitle = {
  fontSize: 15,
};

const summaryTitleMobile = {
  fontSize: 14,
  lineHeight: 1.2,
};

const summaryText = {
  margin: 0,
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.45,
};

const summaryTextMobile = {
  fontSize: 12.5,
  lineHeight: 1.38,
};

const actionsWrap = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "space-between",
};

const actionsWrapMobile = {
  gap: 6,
};
