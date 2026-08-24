import { useMemo, useState } from "react";
import { Panel } from "./ui/Panel.jsx";
import { PanelHeader } from "./ui/PanelHeader.jsx";
import {
  createProtocolDraft,
  downloadProtocolDraft,
  hydrateProtocolDraft,
  toProtocolJson,
  validateProtocolDraft,
} from "../utils/protocolAuthoring.js";
import { ProtocolAiBriefPanel } from "./ProtocolAiBriefPanel.jsx";
import { ProtocolReviewGuidance } from "./ProtocolReviewGuidance.jsx";
import { BrandLogo } from "./ui/BrandLogo.jsx";

export function ProtocolEditor({ onBack, onAddToLocalCatalog }) {
  const [protocol, setProtocol] = useState(createProtocolDraft);
  const [importText, setImportText] = useState("");
  const [importMessage, setImportMessage] = useState("");
  const [catalogMessage, setCatalogMessage] = useState("");
  const [draftOrigin, setDraftOrigin] = useState("Rascunho novo");
  const [lastAction, setLastAction] = useState("Nenhuma ação realizada ainda.");
  const validation = useMemo(
    () => validateProtocolDraft(protocol),
    [protocol]
  );
  const exportJson = useMemo(
    () => toProtocolJson(protocol),
    [protocol]
  );
  const canPublishLocally = validation.errors.length === 0;

  function importProtocolJson() {
    try {
      const imported = hydrateProtocolDraft(JSON.parse(importText));
      setProtocol(imported);
      setDraftOrigin("Importado da IA");
      setLastAction("JSON importado e pronto para validação.");
      setCatalogMessage("");
      setImportMessage(
        "Rascunho importado. Consulte a validação e o roteiro de revisão antes de adicioná-lo ao catálogo local."
      );
    } catch (error) {
      setImportMessage(`Não foi possível importar: ${error.message}`);
    }
  }

  function addToLocalCatalog() {
    const result = onAddToLocalCatalog?.(protocol);
    setCatalogMessage(
      result?.ok
        ? "Protocolo adicionado ao catálogo local deste navegador."
        : result?.message ?? "Não foi possível adicionar o protocolo ao catálogo local."
    );
    if (result?.ok) {
      setLastAction("Protocolo adicionado ao catálogo local.");
    }
  }

  function downloadDraft() {
    const downloaded = downloadProtocolDraft(protocol);
    setLastAction(
      downloaded
        ? "JSON do protocolo preparado para download."
        : "Não foi possível preparar o JSON para download."
    );
  }

  return (
    <main className="protocol-editor-page">
      <header className="workspace-page-header">
        <div>
          <BrandLogo className="editor-brand-logo" />
          <span className="page-kicker">Autoria / Protocolos</span>
          <h1>Gerador de protocolos com IA</h1>
          <p>
            O LABSED prepara, revisa e testa protocolos gerados por IA; a autoria manual direta não faz parte deste fluxo.
          </p>
        </div>
        <button className="secondary-button" type="button" onClick={onBack}>
          Voltar
        </button>
      </header>

      <section
        className="editor-status-bar"
        aria-label="Estado do rascunho"
        aria-live="polite"
      >
        <div>
          <span className="meta-label">Origem</span>
          <strong>{draftOrigin}</strong>
        </div>
        <div>
          <span className="meta-label">Validação</span>
          <strong className={canPublishLocally ? "is-ready" : "is-blocked"}>
            {canPublishLocally ? "Pronta para revisão docente" : "Impedimentos encontrados"}
          </strong>
        </div>
        <div>
          <span className="meta-label">Pendências</span>
          <strong>{validation.errors.length} impedimentos · {validation.warnings.length} atenções</strong>
        </div>
        <p>{lastAction}</p>
      </section>

      <div className="protocol-editor-grid">
        <div className="protocol-editor-main">
          <Panel>
            <PanelHeader
              title="1. Preparar consulta para IA"
              description="Informe o tema, o recorte e o nível de ensino. Copie o texto gerado e envie-o em uma conversa com IA."
            />
            <ProtocolAiBriefPanel />
          </Panel>

          <Panel>
            <PanelHeader
              title="2. Importar resposta da IA"
              description="Cole somente o JSON retornado pela IA. O rascunho será submetido às salvaguardas investigativas do LABSED."
            />
            <div className="editor-import-stack">
              <textarea
                className="protocol-import-input"
                aria-label="JSON do protocolo gerado por IA"
                value={importText}
                placeholder="Cole aqui o JSON produzido pela IA"
                onChange={(event) => {
                  setImportText(event.target.value);
                  setImportMessage("");
                }}
              />
              <div className="editor-case-actions">
                <button
                  className="secondary-button"
                  type="button"
                  disabled={!importText.trim()}
                  onClick={importProtocolJson}
                >
                  Importar para revisão
                </button>
                {importMessage ? (
                  <p
                    className={`editor-import-message ${importMessage.startsWith("Não") ? "is-error" : ""}`}
                    role={importMessage.startsWith("Não") ? "alert" : "status"}
                  >
                    {importMessage}
                  </p>
                ) : null}
              </div>
            </div>
          </Panel>
        </div>

        <aside className="protocol-editor-sidebar">
          <Panel>
            <PanelHeader
              title="3. Validação investigativa"
              description="Impedimentos bloqueiam o catálogo local. A validação técnica não substitui a revisão docente ou científica."
            />
            <ValidationList
              title="Impedimentos"
              items={validation.errors}
              empty="O rascunho atende aos requisitos mínimos."
              tone="is-danger"
            />
            <ValidationList
              title="Atenções"
              items={validation.warnings}
              empty="Nenhuma atenção adicional."
              tone="is-warning"
            />
          </Panel>

          <Panel>
            <PanelHeader
              title="4. Roteiro de revisão"
              description="Use o pedido de revisão para a IA quando o recorte, as referências ou os casos precisarem de ajuste."
            />
            <ProtocolReviewGuidance
              protocol={protocol}
              validation={validation}
            />
          </Panel>

          <Panel>
            <PanelHeader
              title="5. Destino do protocolo"
              description={
                canPublishLocally
                  ? "Adicione o protocolo ao catálogo local para testá-lo neste navegador ou baixe o JSON para futura incorporação oficial."
                  : "Complete os impedimentos antes de liberar os destinos do protocolo."
              }
              actions={
                <div className="editor-destination-actions">
                  <button
                    className="secondary-button"
                    type="button"
                    disabled={!canPublishLocally}
                    onClick={addToLocalCatalog}
                  >
                    Adicionar ao catálogo local
                  </button>
                  <button
                    className="secondary-button"
                    type="button"
                    disabled={!canPublishLocally}
                    onClick={downloadDraft}
                  >
                    Baixar JSON
                  </button>
                </div>
              }
            />
            {catalogMessage ? (
              <p className="editor-import-message" aria-live="polite">
                {catalogMessage}
              </p>
            ) : null}
            <textarea
              className="protocol-json-preview"
              readOnly
              value={exportJson}
              aria-label="Prévia JSON do protocolo"
            />
          </Panel>
        </aside>
      </div>
    </main>
  );
}

function ValidationList({ title, items, empty, tone }) {
  return (
    <section className="validation-group">
      <strong>
        {title}{" "}
        <span className="validation-count">{items.length}</span>
      </strong>
      {items.length ? (
        <ul className={tone}>
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      ) : (
        <p>{empty}</p>
      )}
    </section>
  );
}
