export default function EditorLogo({ logo, onFileChange, onLogoChange, onRemove }) {
  return (
    <div>
      <h2 style={sectionTitle}>Logo da chave</h2>
      <p style={sectionSubtitle}>
        A logo será salva na chave gerada e aparece na prévia do gerador.
      </p>

      <div className="gerador-logo-grid" style={logoGrid}>
        <div style={logoEditorBox}>
          <Campo label="Nome da instituição, coleção ou projeto">
            <input
              className="field-control"
              value={logo.nome || ""}
              onChange={(e) => onLogoChange("nome", e.target.value)}
              placeholder="Ex.: LABSED"
            />
          </Campo>

          <Campo label="URL da logo">
            <input
              className="field-control"
              value={logo.src || ""}
              onChange={(e) => onLogoChange("src", e.target.value)}
              placeholder="https://... ou /imgs/minha-logo.svg"
            />
          </Campo>

          <Campo label="Enviar arquivo">
            <input
              className="field-control"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={(e) => onFileChange(e.target.files?.[0])}
            />
          </Campo>

          <Campo label="Uso sugerido">
            <select
              className="field-control"
              value={logo.posicao || "cabecalho"}
              onChange={(e) => onLogoChange("posicao", e.target.value)}
            >
              <option value="cabecalho">Cabeçalho da chave</option>
              <option value="marca-dagua">Marca d’água</option>
              <option value="relatorio">Relatório</option>
            </select>
          </Campo>

          <button
            className="btn btn--secondary"
            type="button"
            onClick={onRemove}
          >
            Remover logo
          </button>
        </div>

        <LogoPreview logo={logo} />
      </div>
    </div>
  );
}

export function LogoPreview({ logo }) {
  if (!logo?.src && !logo?.nome) {
    return (
      <div style={logoPreviewEmpty}>
        <strong>Sem logo definida</strong>
        <span>Use uma URL ou envie um arquivo de imagem.</span>
      </div>
    );
  }

  return (
    <div style={logoPreviewBox}>
      {logo.src ? (
        <img
          src={logo.src}
          alt={logo.nome || "Logo da chave"}
          style={logoPreviewImage}
        />
      ) : null}
      <div>
        <div style={logoPreviewName}>{logo.nome || "Logo sem nome"}</div>
        <div style={logoPreviewMeta}>
          Uso sugerido: {logo.posicao || "cabecalho"}
        </div>
      </div>
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

const sectionTitle = {
  margin: 0,
  fontSize: 21,
  lineHeight: 1.15,
};

const sectionSubtitle = {
  margin: "4px 0 14px",
  color: "var(--color-muted)",
};

const logoGrid = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.2fr) minmax(260px, 0.8fr)",
  gap: 14,
  alignItems: "start",
};

const logoEditorBox = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const logoPreviewBox = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  minHeight: 120,
  padding: 14,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  boxShadow: "var(--shadow-sm)",
};

const logoPreviewEmpty = {
  ...logoPreviewBox,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  color: "var(--color-muted)",
};

const logoPreviewImage = {
  width: 78,
  height: 78,
  objectFit: "contain",
  borderRadius: 12,
  border: "1px solid rgba(148,163,184,0.28)",
  background: "var(--color-surface-soft)",
};

const logoPreviewName = {
  fontWeight: 900,
  color: "var(--color-primary)",
  wordBreak: "break-word",
};

const logoPreviewMeta = {
  marginTop: 4,
  color: "var(--color-muted)",
  fontSize: 13,
  fontWeight: 750,
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
