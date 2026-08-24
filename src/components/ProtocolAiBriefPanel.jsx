import { useMemo, useState } from "react";
import {
  buildProtocolAiPrompt,
  createAiBriefDraft,
} from "../utils/protocolAiBrief.js";

export function ProtocolAiBriefPanel() {
  const [brief, setBrief] = useState(createAiBriefDraft);
  const [copyStatus, setCopyStatus] = useState("");
  const prompt = useMemo(() => buildProtocolAiPrompt(brief), [brief]);

  function updateBrief(field, value) {
    setBrief((current) => ({ ...current, [field]: value }));
    setCopyStatus("");
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyStatus("Texto copiado. Cole-o em uma conversa com a IA.");
    } catch {
      setCopyStatus("Não foi possível copiar automaticamente. Selecione o texto abaixo e copie.");
    }
  }

  return (
    <section className="ai-brief-panel">
      <div className="editor-field-grid">
        <label className="field">
          <span>Assunto do protocolo</span>
          <input
            value={brief.subject}
            placeholder="Ex.: classes de répteis brasileiros"
            onChange={(event) => updateBrief("subject", event.target.value)}
          />
        </label>
        <label className="field">
          <span>Nível de ensino</span>
          <select
            value={brief.educationLevel}
            onChange={(event) => updateBrief("educationLevel", event.target.value)}
          >
            <option value="ensino_medio">Ensino médio</option>
            <option value="licenciatura">Superior — Licenciatura</option>
            <option value="bacharelado">Superior — Bacharelado</option>
          </select>
        </label>
        <label className="field editor-field-wide">
          <span>Limite taxonômico ou conceitual</span>
          <input
            value={brief.taxonomicScope}
            placeholder="Ex.: apenas classes viventes; excluir fósseis e identificação de espécies"
            onChange={(event) => updateBrief("taxonomicScope", event.target.value)}
          />
        </label>
        <label className="field editor-field-wide">
          <span>Contexto adicional da turma (opcional)</span>
          <textarea
            value={brief.curricularContext}
            placeholder="Ex.: atividade de laboratório com exemplares, 2 horas, revisão de evolução."
            onChange={(event) => updateBrief("curricularContext", event.target.value)}
          />
        </label>
      </div>

      <div className="ai-brief-actions">
        <button className="secondary-button" type="button" onClick={copyPrompt}>
          Copiar texto para IA
        </button>
        {copyStatus ? <p aria-live="polite">{copyStatus}</p> : null}
      </div>

      <label className="field">
        <span>Texto preparado para a IA</span>
        <textarea className="ai-prompt-preview" readOnly value={prompt} />
      </label>
    </section>
  );
}
