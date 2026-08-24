import {
  figurasParaTexto,
  textoParaFiguras,
} from "./geradorChavesModel.js";
import {
  choiceBox,
  choiceGrid,
  choiceTitle,
  sectionSubtitle,
  sectionTitle,
  segmented,
  segment,
  segmentActive,
  textareaSmall,
  twoColumns,
} from "./GeradorChavesStyles.js";
import Campo from "./GeradorChavesField.jsx";

export default function ConstrutorGuiado({
  canRemove,
  node,
  nodeIndex,
  nodes,
  onChoiceChange,
  onContinue,
  onExplanationChange,
  onNavigate,
  onNodeChange,
  onPreview,
  onRemove,
  onValidate,
  problemas,
  totalNodes,
}) {
  return (
    <div>
      <div style={guidedHero}>
        <div>
          <div style={guidedEyebrow}>Página {nodeIndex + 1} da chave</div>
          <h2 style={guidedSectionTitle}>Construa como se estivesse navegando</h2>
          <p style={guidedSectionSubtitle}>
            Preencha a pergunta, defina as alternativas A e B, e continue pelo
            caminho que precisa virar uma nova página.
          </p>
        </div>
        <div style={guidedStatusGrid}>
          <span style={guidedStatusPill}>{totalNodes} páginas</span>
          <span style={problemas.length ? guidedStatusWarning : guidedStatusPill}>
            {problemas.length ? `${problemas.length} alertas` : "Validação OK"}
          </span>
        </div>
      </div>

      <div style={guidedToolbar}>
        <button
          className="btn btn--secondary btn--compact"
          type="button"
          onClick={() => onNavigate(-1)}
          disabled={nodeIndex <= 0}
        >
          ← Página anterior
        </button>
        <button
          className="btn btn--secondary btn--compact"
          type="button"
          onClick={() => onNavigate(1)}
          disabled={nodeIndex >= totalNodes - 1}
        >
          Próxima página →
        </button>
        <button
          className="btn btn--secondary btn--compact"
          type="button"
          onClick={onValidate}
        >
          Validar
        </button>
        <button
          className="btn btn--primary btn--compact"
          type="button"
          onClick={onPreview}
        >
          Testar prévia
        </button>
      </div>

      <section style={guidedPageCard}>
        <div className="gerador-two-columns" style={twoColumns}>
          <Campo label="Identificador da página">
            <input
              className="field-control"
              value={node.id}
              onChange={(e) => onNodeChange("id", e.target.value)}
            />
          </Campo>

          <Campo label="Título curto">
            <input
              className="field-control"
              value={node.title}
              onChange={(e) => onNodeChange("title", e.target.value)}
              placeholder="Ex.: 3(2A)"
            />
          </Campo>
        </div>

        <Campo label="Pergunta que aparecerá para o aluno">
          <textarea
            className="field-control"
            style={guidedQuestion}
            value={node.prompt}
            onChange={(e) => onNodeChange("prompt", e.target.value)}
            placeholder="Ex.: As asas anteriores são rígidas ou membranosas?"
          />
        </Campo>

        <div className="gerador-choice-grid" style={choiceGrid}>
          {["a", "b"].map((lado) => (
            <AlternativaGuiada
              key={lado}
              choice={node[lado]}
              label={`Alternativa ${lado.toUpperCase()}`}
              lado={lado}
              nodes={nodes}
              onChoiceChange={onChoiceChange}
              onContinue={onContinue}
              onExplanationChange={onExplanationChange}
            />
          ))}
        </div>
      </section>

      <div style={guidedFooterActions}>
        <button
          className="btn btn--secondary btn--compact"
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
        >
          Remover esta página
        </button>
      </div>
    </div>
  );
}

function AlternativaGuiada({
  choice,
  label,
  lado,
  nodes,
  onChoiceChange,
  onContinue,
  onExplanationChange,
}) {
  const destino = choice?.next ? "next" : choice?.result ? "result" : "next";

  function mudarDestino(tipo) {
    if (tipo === "next") {
      onChoiceChange(lado, "result", "");
      onChoiceChange(lado, "next", choice?.next || "");
      return;
    }

    onChoiceChange(lado, "next", "");
    onChoiceChange(lado, "result", choice?.result || "");
  }

  return (
    <article style={guidedChoiceBox}>
      <div style={guidedChoiceHeader}>
        <h3 style={choiceTitle}>{label}</h3>
        <span style={destino === "next" ? guidedRouteBadge : guidedResultBadge}>
          {destino === "next" ? "Continua" : "Resultado"}
        </span>
      </div>

      <Campo label="Texto que o aluno verá">
        <textarea
          className="field-control"
          style={textareaSmall}
          value={choice?.text || ""}
          onChange={(e) => onChoiceChange(lado, "text", e.target.value)}
          placeholder="Descreva a condição observável desta alternativa."
        />
      </Campo>

      <div style={segmented}>
        <button
          type="button"
          style={destino === "next" ? segmentActive : segment}
          onClick={() => mudarDestino("next")}
        >
          Nova pergunta
        </button>
        <button
          type="button"
          style={destino === "result" ? segmentActive : segment}
          onClick={() => mudarDestino("result")}
        >
          Resultado final
        </button>
      </div>

      {destino === "next" ? (
        <>
          <Campo label="Página de destino">
            <select
              className="field-control"
              value={choice?.next || ""}
              onChange={(e) => onChoiceChange(lado, "next", e.target.value)}
            >
              <option value="">Criar ao continuar</option>
              {nodes.map((node) => (
                <option key={node.id} value={node.id}>
                  {node.id} — {node.title || "sem título"}
                </option>
              ))}
            </select>
          </Campo>
          <button
            className="btn btn--primary btn--compact"
            type="button"
            onClick={() => onContinue(lado)}
          >
            Salvar e continuar por {lado.toUpperCase()}
          </button>
        </>
      ) : (
        <Campo label="Nome do resultado final">
          <input
            className="field-control"
            value={choice?.result || ""}
            onChange={(e) => onChoiceChange(lado, "result", e.target.value)}
            placeholder="Ex.: COLEOPTERA"
          />
        </Campo>
      )}

      <details style={guidedOptionalBox}>
        <summary style={detailsSummary}>Ajuda e figuras opcionais</summary>
        <Campo label="Explicação para o aluno">
          <textarea
            className="field-control"
            style={textareaSmall}
            value={choice?.explanation?.body || ""}
            onChange={(e) => onExplanationChange(lado, "body", e.target.value)}
            placeholder="Explique objetivamente o que observar."
          />
        </Campo>

        <Campo label="Dica curta">
          <input
            className="field-control"
            value={choice?.explanation?.hint || ""}
            onChange={(e) => onExplanationChange(lado, "hint", e.target.value)}
            placeholder="Ex.: Compare a textura da asa anterior."
          />
        </Campo>

        <Campo label="Figuras">
          <input
            className="field-control"
            value={figurasParaTexto(choice?.figs)}
            onChange={(e) =>
              onChoiceChange(lado, "figs", textoParaFiguras(e.target.value))
            }
            placeholder="Ex.: Fig204, Fig205"
          />
        </Campo>
      </details>
    </article>
  );
}

const guidedSectionTitle = {
  ...sectionTitle,
  margin: "0 0 4px",
  fontSize: 24,
  lineHeight: 1.1,
};

const guidedSectionSubtitle = {
  ...sectionSubtitle,
  margin: 0,
  fontSize: 14,
  lineHeight: 1.45,
};

const guidedHero = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexWrap: "wrap",
  gap: 12,
  marginBottom: 12,
  padding: 14,
  borderRadius: 16,
  background: "color-mix(in srgb, var(--color-info-soft) 38%, var(--color-surface))",
  border: "1px solid var(--color-info-border)",
};

const guidedEyebrow = {
  color: "var(--color-info-text)",
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

const guidedStatusGrid = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  gap: 8,
  minWidth: 0,
};

const guidedStatusPill = {
  borderRadius: 999,
  padding: "5px 8px",
  background: "var(--color-surface)",
  color: "var(--color-info-text)",
  fontSize: 11.5,
  fontWeight: 900,
  lineHeight: 1.15,
  maxWidth: "100%",
  overflowWrap: "anywhere",
};

const guidedStatusWarning = {
  ...guidedStatusPill,
  background: "var(--color-warning-soft)",
  color: "var(--color-warning-text)",
};

const guidedToolbar = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginBottom: 12,
};

const guidedPageCard = {
  padding: 14,
  borderRadius: 18,
  background: "color-mix(in srgb, var(--color-surface) 92%, transparent)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-sm)",
};

const guidedQuestion = {
  minHeight: 86,
  resize: "vertical",
  fontSize: 16,
  lineHeight: 1.45,
};

const guidedChoiceBox = {
  ...choiceBox,
  background: "var(--color-surface-soft)",
};

const guidedChoiceHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 8,
};

const guidedRouteBadge = {
  borderRadius: 999,
  padding: "4px 8px",
  background: "var(--color-info-soft)",
  color: "var(--color-info-text)",
  fontSize: 11,
  fontWeight: 900,
  whiteSpace: "nowrap",
};

const guidedResultBadge = {
  ...guidedRouteBadge,
  background: "var(--color-success-soft)",
  color: "var(--color-success-text)",
};

const guidedOptionalBox = {
  marginTop: 12,
  padding: "8px 10px",
  borderRadius: 12,
  background: "color-mix(in srgb, var(--color-surface) 70%, transparent)",
  border: "1px solid var(--color-border)",
};

const guidedFooterActions = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 12,
};

const detailsSummary = {
  cursor: "pointer",
  fontWeight: 850,
  color: "var(--color-primary)",
};
