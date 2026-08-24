export default function GeradorSidePanel({
  chave,
  nodeAtual,
  nodeIndex,
  problemas,
  onAtualizarCampo,
  onSelecionarNode,
  onAdicionarNode,
}) {
  return (
    <aside className="gerador-side-panel" style={sidePanel}>
      <label style={label}>Título da chave</label>
      <input
        className="field-control"
        value={chave.titulo}
        onChange={(e) => onAtualizarCampo("titulo", e.target.value)}
      />

      <label style={label}>Nó inicial</label>
      <select
        className="field-control"
        value={chave.startId}
        onChange={(e) => onAtualizarCampo("startId", e.target.value)}
      >
        {chave.nodes.map((node) => (
          <option key={node.id} value={node.id}>
            {node.id}
          </option>
        ))}
      </select>

      <div style={structureSummary}>
        <div style={structureSummaryItem}>
          <span style={structureSummaryLabel}>Nós</span>
          <strong>{chave.nodes.length}</strong>
        </div>
        <div style={structureSummaryItem}>
          <span style={structureSummaryLabel}>Atual</span>
          <strong>{nodeAtual?.id || "—"}</strong>
        </div>
        <div style={structureSummaryItem}>
          <span style={structureSummaryLabel}>Validação</span>
          <strong>{problemas.length ? problemas.length : "OK"}</strong>
        </div>
      </div>

      <details className="gerador-node-drawer" style={nodeDrawer}>
        <summary style={nodeDrawerSummary}>
          Estrutura da chave
          <span style={nodeDrawerMeta}>{chave.nodes.length} nós</span>
        </summary>

        <div style={nodeListHeader}>
          <strong>Selecione um nó para editar</strong>
        </div>

        <div className="gerador-node-list" style={nodeList}>
          {chave.nodes.map((node, index) => (
            <button
              key={`${node.id}-${index}`}
              type="button"
              style={index === nodeIndex ? nodeButtonActive : nodeButton}
              onClick={() => onSelecionarNode(index)}
            >
              <span style={nodeId}>{node.id || "sem id"}</span>
              <span style={nodePrompt}>{node.prompt || "Pergunta vazia"}</span>
            </button>
          ))}
        </div>
      </details>

      <div style={nodeQuickActions}>
        <button
          className="btn btn--secondary btn--compact"
          type="button"
          onClick={onAdicionarNode}
        >
          Novo nó
        </button>
      </div>
    </aside>
  );
}

const sidePanel = {
  padding: 13,
  borderRadius: 18,
  background: "color-mix(in srgb, var(--color-surface) 94%, transparent)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-md)",
  alignSelf: "start",
};

const label = {
  display: "block",
  margin: "10px 0 5px",
  fontWeight: 850,
  color: "var(--color-muted)",
  fontSize: 13,
};

const nodeListHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  marginTop: 12,
};

const nodeList = {
  display: "grid",
  gap: 8,
  marginTop: 10,
  maxHeight: 360,
  overflowY: "auto",
  paddingRight: 2,
};

const structureSummary = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 8,
  marginTop: 12,
};

const structureSummaryItem = {
  display: "grid",
  gap: 2,
  padding: "9px 8px",
  borderRadius: 12,
  background: "color-mix(in srgb, var(--color-info-soft) 35%, var(--color-surface))",
  border: "1px solid var(--color-border)",
  minWidth: 0,
};

const structureSummaryLabel = {
  color: "var(--color-muted)",
  fontSize: 10.5,
  fontWeight: 900,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

const nodeDrawer = {
  marginTop: 12,
  padding: "10px 12px",
  borderRadius: 14,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const nodeDrawerSummary = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  cursor: "pointer",
  color: "var(--color-text)",
  fontWeight: 900,
  listStylePosition: "inside",
};

const nodeDrawerMeta = {
  marginLeft: "auto",
  borderRadius: 999,
  padding: "3px 7px",
  background: "var(--color-surface)",
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 850,
  whiteSpace: "nowrap",
};

const nodeQuickActions = {
  display: "grid",
  gap: 8,
  marginTop: 10,
};

const nodeButton = {
  display: "grid",
  gridTemplateColumns: "54px 1fr",
  gap: 8,
  width: "100%",
  minHeight: 48,
  padding: 10,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  textAlign: "left",
  cursor: "pointer",
};

const nodeButtonActive = {
  ...nodeButton,
  background: "color-mix(in srgb, var(--color-info-soft) 48%, var(--color-surface))",
  borderColor: "var(--color-primary)",
};

const nodeId = {
  fontWeight: 900,
  color: "var(--color-primary)",
};

const nodePrompt = {
  minWidth: 0,
  color: "var(--color-muted)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
