/**
 * Breadcrumb - Navegação interativa através do histórico de perguntas
 * @param {Array} path - Array de objetos {title, id, number}
 * @param {function} onNavigate - Callback quando user clica em um item
 * @param {string} currentId - ID da pergunta atual (não clicável)
 */
export default function Breadcrumb({ path = [], onNavigate, currentId = null }) {
  if (!path || path.length === 0) return null;

  return (
    <nav style={breadcrumbNav} aria-label="Caminho de navegação">
      <ol style={breadcrumbList}>
        {path.map((item, index) => {
          const isLast = index === path.length - 1;
          const isCurrent = item.id === currentId;

          return (
            <li key={`${item.id}-${index}`} style={breadcrumbItem}>
              {isCurrent ? (
                // Item atual (não clicável)
                <span style={{ ...breadcrumbLink, ...breadcrumbCurrent }}>
                  <span style={breadcrumbNumber}>{index + 1}</span>
                  <span style={breadcrumbText}>{item.title}</span>
                </span>
              ) : (
                // Item anterior (clicável)
                <button
                  style={{ ...breadcrumbLink, ...breadcrumbClickable }}
                  onClick={() => onNavigate?.(index)}
                  type="button"
                  title={`Voltar para: ${item.title}`}
                  className="breadcrumb-btn"
                >
                  <span style={breadcrumbNumber}>{index + 1}</span>
                  <span style={breadcrumbText}>{item.title}</span>
                </button>
              )}

              {!isLast && <span style={breadcrumbSeparator}>›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const breadcrumbNav = {
  marginBottom: 12,
  marginTop: 8,
};

const breadcrumbList = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 0,
  padding: 0,
  margin: 0,
  listStyle: "none",
};

const breadcrumbItem = {
  display: "flex",
  alignItems: "center",
  gap: 0,
};

const breadcrumbLink = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "6px 8px",
  borderRadius: 8,
  fontSize: "clamp(11px, 2.2vw, 13px)",
  fontWeight: 600,
  textDecoration: "none",
  whiteSpace: "nowrap",
};

const breadcrumbClickable = {
  background: "var(--color-surface-soft)",
  color: "var(--color-primary)",
  cursor: "pointer",
  border: "1px solid var(--color-primary-soft)",
  transition: "all 0.2s ease-out",
};

const breadcrumbCurrent = {
  background: "var(--color-primary-soft)",
  color: "var(--color-primary-text)",
  border: "1px solid var(--color-primary-border)",
  cursor: "default",
};

const breadcrumbNumber = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 20,
  height: 20,
  borderRadius: 999,
  background: "rgba(0,0,0,0.08)",
  fontWeight: 700,
  fontSize: "11px",
};

const breadcrumbText = {
  maxWidth: "120px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const breadcrumbSeparator = {
  display: "inline-flex",
  alignItems: "center",
  color: "var(--color-border)",
  fontSize: "16px",
  fontWeight: 300,
  margin: "0 -2px",
  lineHeight: 1,
};

// Adicionar hover state via CSS
const hoverStyles = `
  .breadcrumb-btn:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(102, 136, 255, 0.2);
  }

  .breadcrumb-btn:active {
    transform: translateY(0);
  }
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = hoverStyles;
  document.head.appendChild(style);
}
