import {
  choiceBox,
  choiceGrid,
  choiceTitle,
  sectionSubtitle,
  sectionTitle,
  segmented,
  segment,
  segmentActive,
  textarea,
  textareaSmall,
  twoColumns,
} from "./GeradorChavesStyles.js";
import Campo from "./GeradorChavesField.jsx";

export default function EditorNode({
  canRemove,
  node,
  nodes,
  onChoiceChange,
  onExplanationChange,
  onNodeChange,
  onRemove,
}) {
  return (
    <div>
      <div style={sectionHeader}>
        <div>
          <h2 style={sectionTitle}>Pergunta e alternativas</h2>
          <p style={sectionSubtitle}>
            Cada alternativa pode apontar para outro nó ou encerrar em resultado.
          </p>
        </div>
        <button
          className="btn btn--secondary btn--compact"
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
        >
          Remover nó
        </button>
      </div>

      <div className="gerador-two-columns" style={twoColumns}>
        <Campo label="ID técnico">
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
          />
        </Campo>
      </div>

      <Campo label="Pergunta">
        <textarea
          className="field-control"
          style={textarea}
          value={node.prompt}
          onChange={(e) => onNodeChange("prompt", e.target.value)}
        />
      </Campo>

      <div className="gerador-choice-grid" style={choiceGrid}>
        <EditorAlternativa
          label="Alternativa A"
          lado="a"
          choice={node.a}
          nodes={nodes}
          onChoiceChange={onChoiceChange}
          onExplanationChange={onExplanationChange}
        />
        <EditorAlternativa
          label="Alternativa B"
          lado="b"
          choice={node.b}
          nodes={nodes}
          onChoiceChange={onChoiceChange}
          onExplanationChange={onExplanationChange}
        />
      </div>
    </div>
  );
}

function EditorAlternativa({
  choice,
  label,
  lado,
  nodes,
  onChoiceChange,
  onExplanationChange,
}) {
  const destino = choice?.next ? "next" : choice?.result ? "result" : "next";

  function mudarDestino(tipo) {
    if (tipo === "next") {
      onChoiceChange(lado, "result", "");
      onChoiceChange(lado, "next", nodes[0]?.id || "");
      return;
    }

    onChoiceChange(lado, "next", "");
    onChoiceChange(lado, "result", choice?.result || "");
  }

  return (
    <div style={choiceBox}>
      <h3 style={choiceTitle}>{label}</h3>

      <Campo label="Texto do botão">
        <textarea
          className="field-control"
          style={textareaSmall}
          value={choice?.text || ""}
          onChange={(e) => onChoiceChange(lado, "text", e.target.value)}
        />
      </Campo>

      <div style={segmented}>
        <button
          type="button"
          style={destino === "next" ? segmentActive : segment}
          onClick={() => mudarDestino("next")}
        >
          Próximo nó
        </button>
        <button
          type="button"
          style={destino === "result" ? segmentActive : segment}
          onClick={() => mudarDestino("result")}
        >
          Resultado
        </button>
      </div>

      {destino === "next" ? (
        <Campo label="Destino">
          <select
            className="field-control"
            value={choice?.next || ""}
            onChange={(e) => onChoiceChange(lado, "next", e.target.value)}
          >
            <option value="">Selecione</option>
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                {node.id}
              </option>
            ))}
          </select>
        </Campo>
      ) : (
        <Campo label="Resultado final">
          <input
            className="field-control"
            value={choice?.result || ""}
            onChange={(e) => onChoiceChange(lado, "result", e.target.value)}
          />
        </Campo>
      )}

      <Campo label="Explicação">
        <textarea
          className="field-control"
          style={textareaSmall}
          value={choice?.explanation?.body || ""}
          onChange={(e) => onExplanationChange(lado, "body", e.target.value)}
        />
      </Campo>

      <Campo label="Dica">
        <input
          className="field-control"
          value={choice?.explanation?.hint || ""}
          onChange={(e) => onExplanationChange(lado, "hint", e.target.value)}
        />
      </Campo>
    </div>
  );
}

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  marginBottom: 12,
};
