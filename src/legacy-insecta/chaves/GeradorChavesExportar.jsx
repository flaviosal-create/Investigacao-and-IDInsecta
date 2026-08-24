import simboloLabsed from "../assets/simbolo-lab-softwares-educacionais.svg";
import { assinaturaLabsed } from "./geradorChavesModel.js";

export default function PainelExportar({
  chaveGerada,
  onAttach,
  onCopy,
  onDownload,
  onReset,
  problemas,
}) {
  return (
    <div>
      <h2 style={sectionTitle}>Exportação</h2>
      <p style={sectionSubtitle}>
        O JSON abaixo já usa o mesmo modelo de dados consumido por `ChaveBase`.
      </p>

      <div style={exportActions}>
        <button className="btn btn--success" onClick={onDownload}>
          Baixar JSON
        </button>
        <button className="btn btn--secondary" onClick={onCopy}>
          Copiar JSON
        </button>
        <button
          className="btn btn--primary"
          onClick={onAttach}
          disabled={problemas.length > 0}
          title={problemas.length ? "Corrija a validação antes de anexar" : ""}
        >
          Anexar ao app
        </button>
        <button className="btn btn--secondary" onClick={onReset}>
          Reiniciar rascunho
        </button>
      </div>

      <pre style={jsonBox}>{JSON.stringify(chaveGerada, null, 2)}</pre>
      <AssinaturaLabsed />
    </div>
  );
}

export function AssinaturaLabsed() {
  return (
    <div style={labsedSignature}>
      <img
        src={simboloLabsed}
        alt="Logo LABSED"
        style={labsedSignatureImage}
      />
      <div>
        <div style={labsedSignatureText}>{assinaturaLabsed.texto}</div>
        <div style={labsedSignatureName}>
          {assinaturaLabsed.nome} - {assinaturaLabsed.complemento}
        </div>
      </div>
    </div>
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

const exportActions = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginBottom: 12,
};

const jsonBox = {
  padding: 12,
  borderRadius: 12,
  background: "var(--color-text)",
  color: "var(--color-bg)",
  overflow: "auto",
  maxHeight: 620,
};

const labsedSignature = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 12,
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "color-mix(in srgb, var(--color-surface) 96%, transparent)",
  color: "var(--color-text)",
  boxShadow: "var(--shadow-sm)",
};

const labsedSignatureImage = {
  width: 42,
  height: 42,
  objectFit: "contain",
  borderRadius: 10,
};

const labsedSignatureText = {
  fontWeight: 900,
  color: "var(--color-primary)",
  lineHeight: 1.15,
};

const labsedSignatureName = {
  marginTop: 2,
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 750,
};
