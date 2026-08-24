/**
 * ProgressBar - Exibe progresso visual em formato de barra
 * @param {number} current - Posição atual (ex: 2)
 * @param {number} total - Total de etapas (ex: 5)
 * @param {string} label - Texto descritivo (ex: "Lepidoptera")
 */
export default function ProgressBar({ current = 0, total = 0, label = "" }) {
  if (total === 0) return null;

  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div style={progressContainer}>
      <div style={progressTextRow}>
        <span style={progressLabel}>
          {label ? `${label} · ` : ""}Etapa {current} de {total}
        </span>
        <span style={progressPercent}>{Math.round(percentage)}%</span>
      </div>

      <div style={progressTrackStyle}>
        <div
          style={{
            ...progressFillStyle,
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

const progressContainer = {
  width: "100%",
  marginBottom: 12,
  animation: "slideIn 0.4s ease-out",
};

const progressTextRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 6,
  fontSize: "clamp(11px, 2.2vw, 13px)",
};

const progressLabel = {
  color: "var(--color-text)",
  fontWeight: 600,
};

const progressPercent = {
  color: "var(--color-muted)",
  fontWeight: 700,
  fontSize: "clamp(11px, 2.2vw, 13px)",
};

const progressTrackStyle = {
  width: "100%",
  height: 8,
  borderRadius: 999,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  overflow: "hidden",
  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
};

const progressFillStyle = {
  height: "100%",
  background: "linear-gradient(90deg, var(--color-primary), var(--color-info))",
  borderRadius: 999,
  transition: "width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  boxShadow: "0 0 8px rgba(var(--color-primary-rgb, 102, 136, 255), 0.3)",
};
