import { textoImportacaoExemplo } from "./geradorChavesModel.js";

export default function ImportadorTexto({
  onChange,
  onDownloadModel,
  onExtractKey,
  onFileChange,
  onImport,
  onUseExample,
  problemas,
  texto,
}) {
  return (
    <div>
      <div style={sectionHeader}>
        <div>
          <h2 style={sectionTitle}>Importar chave textual</h2>
          <p style={sectionSubtitle}>
            Cole texto bruto, uma chave estruturada ou carregue um arquivo
            `.txt`. Use a extração para separar prováveis trechos de chave e
            revise antes de converter.
          </p>
        </div>
        <button
          className="btn btn--secondary btn--compact"
          type="button"
          onClick={onUseExample}
        >
          Usar exemplo
        </button>
      </div>

      <div style={importActions}>
        <label className="btn btn--secondary" style={fileImportButton}>
          Abrir TXT
          <input
            type="file"
            accept=".txt,text/plain"
            style={{ display: "none" }}
            onChange={(e) => onFileChange(e.target.files?.[0])}
          />
        </label>
        <button className="btn btn--success" type="button" onClick={onImport}>
          Converter para editor
        </button>
        <button
          className="btn btn--secondary"
          type="button"
          onClick={onDownloadModel}
        >
          Baixar modelo TXT
        </button>
        <button
          className="btn btn--secondary"
          type="button"
          onClick={onExtractKey}
        >
          Extrair provável chave
        </button>
      </div>

      <Campo label="Texto bruto ou formatado">
        <textarea
          className="field-control"
          style={importTextarea}
          value={texto}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
        />
      </Campo>

      <details style={detailsBox} open>
        <summary style={detailsSummary}>Modelo aceito</summary>
        <pre style={modelBox}>{textoImportacaoExemplo}</pre>
      </details>

      {problemas.length ? (
        <div style={importProblemBox}>
          <strong>Revisar antes de continuar</strong>
          <ul style={problemList}>
            {problemas.map((problema) => (
              <li key={problema}>{problema}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Campo({ children, label }) {
  return (
    <label style={fieldWrap}>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  );
}

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  marginBottom: 12,
};

const sectionTitle = {
  margin: 0,
  fontSize: 21,
  lineHeight: 1.15,
};

const sectionSubtitle = {
  margin: "4px 0 14px",
  color: "var(--color-muted)",
};

const importActions = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginBottom: 12,
};

const fileImportButton = {
  cursor: "pointer",
};

const importTextarea = {
  minHeight: 360,
  resize: "vertical",
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: 13,
  lineHeight: 1.45,
};

const detailsBox = {
  marginTop: 12,
};

const detailsSummary = {
  cursor: "pointer",
  fontWeight: 850,
  color: "var(--color-primary)",
};

const modelBox = {
  marginTop: 10,
  padding: 12,
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
  overflow: "auto",
  maxHeight: 360,
  fontSize: 12.5,
};

const importProblemBox = {
  marginTop: 12,
  padding: 12,
  borderRadius: 12,
  background: "var(--color-warning-soft)",
  border: "1px solid var(--color-warning-border)",
  color: "var(--color-warning-text)",
};

const problemList = {
  marginTop: 12,
  color: "var(--color-warning-text)",
  lineHeight: 1.45,
};

const fieldWrap = {
  display: "block",
  marginBottom: 10,
};

const labelStyle = {
  display: "block",
  marginBottom: 5,
  color: "var(--color-muted)",
  fontWeight: 800,
  fontSize: 12.5,
};
