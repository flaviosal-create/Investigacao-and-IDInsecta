import { useState } from "react";

import { imagens } from "../data/imagens";
import { montarAjudaObservacao } from "../utils/ajudaObservacao.js";
import { getChoiceLabel, hasChoice } from "../utils/chaveRuntime.js";
import FigureStrip from "./FigureStrip.jsx";
import FigurasChave from "./FigurasChave.jsx";
import { useToast } from "../hooks/useToast.js";

const perguntaBox = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 14,
  padding: "12px 12px",
  marginBottom: 10,
};

const perguntaEyebrow = {
  textAlign: "center",
  fontSize: 10,
  fontWeight: 800,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-info)",
  marginBottom: 3,
};

const perguntaTitulo = {
  textAlign: "center",
  fontSize: "clamp(16px, 3.8vw, 21px)",
  fontWeight: 820,
  color: "var(--color-text)",
  marginBottom: 5,
  lineHeight: 1.18,
  wordBreak: "break-word",
};

const perguntaTexto = {
  textAlign: "center",
  color: "var(--color-muted)",
  lineHeight: 1.32,
  fontSize: "clamp(12.5px, 2.8vw, 14px)",
  padding: 0,
  wordBreak: "break-word",
};

const btnOpcao = {
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  gap: 8,
  padding: "9px 10px",
  borderRadius: 11,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
  color: "var(--color-text)",
  cursor: "pointer",
  fontSize: "clamp(12.5px, 2.8vw, 14px)",
  textAlign: "left",
  lineHeight: 1.32,
  boxShadow: "var(--shadow-sm)",
  marginTop: 0,
  flexWrap: "nowrap",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const textoOpcao = {
  flex: 1,
  minWidth: 0,
  whiteSpace: "normal",
  wordBreak: "break-word",
  overflowWrap: "anywhere",
};

const badgeA = {
  display: "inline-block",
  minWidth: 24,
  textAlign: "center",
  fontWeight: 900,
  fontSize: 10,
  flexShrink: 0,
  borderRadius: 9,
  padding: "4px 7px",
  background: "var(--color-success-soft)",
  color: "var(--color-success-text)",
  border: "1px solid var(--color-success-border)",
};

const badgeB = {
  ...badgeA,
  background: "var(--color-info-soft)",
  color: "var(--color-info-text)",
  border: "1px solid var(--color-info-border)",
};

const figBox = {
  marginTop: 6,
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

const explicacaoTexto = {
  color: "var(--color-text)",
};

const explicacaoHint = {
  color: "var(--color-info-text)",
};

const explicacaoCriterio = {
  margin: "8px 0",
  padding: "8px 9px",
  borderRadius: 8,
  background: "color-mix(in srgb, var(--color-info-soft) 55%, var(--color-surface))",
  color: "var(--color-text)",
};

const blocoOpcao = {
  marginTop: 9,
};

const linhaOpcao = {
  display: "flex",
  alignItems: "flex-start",
  gap: 6,
};

const btnHelp = {
  marginTop: 0,
  minWidth: 34,
  height: 34,
  minHeight: 34,
  borderRadius: 999,
  border: "1px solid var(--color-info-border)",
  background: "var(--color-surface)",
  color: "var(--color-info-text)",
  fontWeight: 900,
  cursor: "pointer",
  flexShrink: 0,
};

const explicacaoBox = {
  marginTop: 6,
  marginLeft: 0,
  padding: "9px 10px",
  borderRadius: 10,
  background: "var(--color-info-soft)",
  borderLeft: "3px solid var(--color-info-border)",
  color: "var(--color-info-text)",
  lineHeight: 1.42,
  fontSize: "clamp(12.5px, 2.8vw, 14px)",
};

function FigurasFallback({ figs = [] }) {
  if (!figs || figs.length === 0) return null;

  const novas = figs.filter((id) => imagens?.[id]);
  const antigas = figs.filter((id) => !imagens?.[id]);

  return (
    <>
      {novas.length > 0 ? <FigurasChave figs={novas} /> : null}
      {antigas.length > 0 ? <FigureStrip figs={antigas} /> : null}
    </>
  );
}

export default function PerguntaAtual({ node, pick, mode }) {
  const [helpAtivo, setHelpAtivo] = useState(null);
  const { info } = useToast();
  const ajudaA = montarAjudaObservacao(node, node.a);
  const ajudaB = montarAjudaObservacao(node, node.b);

  function toggleHelp(key) {
    setHelpAtivo((prev) => (prev === key ? null : key));
  }

  function handlePick(choice) {
    info(`Selecionado: ${getChoiceLabel(node[choice], choice)}`);
    pick(choice);
  }

  return (
    <div className="pergunta-atual" style={perguntaBox}>
      <div className="pergunta-atual__eyebrow" style={perguntaEyebrow}>
        Pergunta atual
      </div>
      <div className="pergunta-atual__titulo" style={perguntaTitulo}>
        {node.title}
      </div>
      <div className="pergunta-atual__texto" style={perguntaTexto}>
        {node.prompt}
      </div>

      {hasChoice(node.a) ? (
        <div className="pergunta-atual__opcao" style={blocoOpcao}>
          <div className="pergunta-atual__linha-opcao" style={linhaOpcao}>
            <button
              className="pergunta-atual__botao-opcao pergunta-atual__botao-opcao--a"
              data-testid="key-choice-a"
              onClick={() => handlePick("a")}
              style={btnOpcao}
            >
              <span style={badgeA}>A</span>
              <span style={textoOpcao}>{getChoiceLabel(node.a, "a")}</span>
            </button>

            {mode !== "pesquisador" ? (
              <button
                type="button"
                className="pergunta-atual__help"
                style={btnHelp}
                onClick={() => toggleHelp("a")}
                title="Ver explicação"
              >
                ?
              </button>
            ) : null}
          </div>

          {node.a?.figs && node.a.figs.length > 0 ? (
            <div style={figBox}>
              <FigurasFallback figs={node.a.figs} />
            </div>
          ) : null}

          {mode !== "pesquisador" &&
          helpAtivo === "a" &&
          node.a ? (
            <div className="pergunta-atual__explicacao" style={explicacaoBox}>
              <div style={explicacaoHint}>
                <strong>Onde olhar:</strong> {ajudaA.ondeOlhar}
              </div>
              <div style={explicacaoCriterio}>
                <strong>Confirme se:</strong> {ajudaA.criterio}
              </div>
              <div style={explicacaoTexto}>
                <strong>Por que isso importa:</strong> {ajudaA.importancia}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {hasChoice(node.b) ? (
        <div className="pergunta-atual__opcao" style={blocoOpcao}>
          <div className="pergunta-atual__linha-opcao" style={linhaOpcao}>
            <button
              className="pergunta-atual__botao-opcao pergunta-atual__botao-opcao--b"
              data-testid="key-choice-b"
              onClick={() => handlePick("b")}
              style={btnOpcao}
            >
              <span style={badgeB}>B</span>
              <span style={textoOpcao}>{getChoiceLabel(node.b, "b")}</span>
            </button>

            {mode !== "pesquisador" ? (
              <button
                type="button"
                className="pergunta-atual__help"
                style={btnHelp}
                onClick={() => toggleHelp("b")}
                title="Ver explicação"
              >
                ?
              </button>
            ) : null}
          </div>

          {node.b?.figs && node.b.figs.length > 0 ? (
            <div style={figBox}>
              <FigurasFallback figs={node.b.figs} />
            </div>
          ) : null}

          {mode !== "pesquisador" &&
          helpAtivo === "b" &&
          node.b ? (
            <div className="pergunta-atual__explicacao" style={explicacaoBox}>
              <div style={explicacaoHint}>
                <strong>Onde olhar:</strong> {ajudaB.ondeOlhar}
              </div>
              <div style={explicacaoCriterio}>
                <strong>Confirme se:</strong> {ajudaB.criterio}
              </div>
              <div style={explicacaoTexto}>
                <strong>Por que isso importa:</strong> {ajudaB.importancia}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {!hasChoice(node.a) && !hasChoice(node.b) ? (
        <div style={{ marginTop: 12 }}>
          <div>
            <strong>Nó sem opções válidas</strong>
          </div>
          <div>Este nó não possui alternativas configuradas corretamente.</div>
        </div>
      ) : null}
    </div>
  );
}
