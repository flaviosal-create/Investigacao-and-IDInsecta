import { imagens } from "../data/imagens.js";
import {
  figurasParaTexto,
  textoParaFiguras,
} from "./geradorChavesModel.js";

export default function EditorImagens({ idsImagem, node, onChoiceChange }) {
  return (
    <div>
      <h2 style={sectionTitle}>Sequência de imagens</h2>
      <p style={sectionSubtitle}>
        Informe IDs separados por vírgula. Os IDs cadastrados aparecem abaixo.
      </p>

      {["a", "b"].map((lado) => (
        <div key={lado} style={imageEditor}>
          <h3 style={choiceTitle}>Alternativa {lado.toUpperCase()}</h3>
          <Campo label="IDs de imagem">
            <input
              className="field-control"
              value={figurasParaTexto(node[lado]?.figs)}
              onChange={(e) =>
                onChoiceChange(lado, "figs", textoParaFiguras(e.target.value))
              }
              placeholder="Ex.: Fig204, Fig205"
            />
          </Campo>

          <div style={imagePreviewRow}>
            {(node[lado]?.figs || []).map((fig) => (
              <div key={fig} style={imageTag}>
                {fig}
                {imagens?.[fig] ? "" : " não cadastrada"}
              </div>
            ))}
          </div>
        </div>
      ))}

      <details style={detailsBox}>
        <summary style={detailsSummary}>Ver IDs cadastrados</summary>
        <div style={imageIdGrid}>
          {idsImagem.map((id) => (
            <button
              key={id}
              type="button"
              style={imageIdButton}
              onClick={() => navigator.clipboard?.writeText(id)}
              title="Copiar ID"
            >
              {id}
            </button>
          ))}
        </div>
      </details>
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

const choiceTitle = {
  margin: "0 0 10px",
  fontSize: 16,
};

const imageEditor = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
  marginBottom: 12,
};

const imagePreviewRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const imageTag = {
  padding: "6px 8px",
  borderRadius: 999,
  background: "var(--color-info-soft)",
  color: "var(--color-info-text)",
  fontSize: 12,
  fontWeight: 800,
};

const detailsBox = {
  marginTop: 12,
};

const detailsSummary = {
  cursor: "pointer",
  fontWeight: 850,
  color: "var(--color-primary)",
};

const imageIdGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: 8,
  marginTop: 10,
};

const imageIdButton = {
  minHeight: 34,
  padding: "6px 8px",
  borderRadius: 8,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  fontSize: 12,
  fontWeight: 750,
  cursor: "pointer",
  textAlign: "left",
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
