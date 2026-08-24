import { useCallback, useRef, useState } from "react";

import FotoAnotadaImagem from "../atividades/FotoAnotadaImagem.jsx";
import {
  criarSetaFotoAnotada,
} from "../atividades/fotoAnotadaModel.js";

/**
 * Editor especializado para microscopia com numeração de referências.
 * Layout compacto que prioriza a visualização da imagem.
 *
 * @param {Object} props
 * @param {string} props.foto - URL da foto
 * @param {Array} props.setas - Array de setas com suporte a referenciaNumero
 * @param {Function} props.onSetasChange - Callback para atualizar setas
 * @param {Object} props.referencia - Objeto com {titulo, tipo, partes: [...]}
 * @param {Array} props.partesUsadas - Array de ids de partes já usadas
 * @param {Function} props.onSelecionarParte - Callback ao selecionar parte
 */
export default function FotoAnotadaEditorMicroscopia({
  foto,
  setas = [],
  onSetasChange,
  referencia = null,
  partesUsadas = [],
  onSelecionarParte,
  titulo = "Microscopia Estereoscópica",
}) {
  const [setaAtivaId, setSetaAtivaId] = useState("");
  const [controlesAberto, setControlesAberto] = useState(false);
  const imagemRef = useRef(null);
  const seqRef = useRef(setas.length);
  const registrarImagemRef = useCallback((elemento) => {
    imagemRef.current = elemento;
  }, []);

  const setaAtiva = setas.find((seta) => seta.id === setaAtivaId);

  function atualizarSetas(proximas) {
    onSetasChange?.(proximas);
  }

  function atualizarSeta(setaId, patch) {
    atualizarSetas(
      setas.map((seta) => (seta.id === setaId ? { ...seta, ...patch } : seta)),
    );
  }

  function adicionarOuMoverSeta(event) {
    if (!foto || !imagemRef.current) return;

    const rect = imagemRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    if (x < 0 || x > 100 || y < 0 || y > 100) return;

    if (setaAtivaId && setas.some((seta) => seta.id === setaAtivaId)) {
      atualizarSeta(setaAtivaId, {
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
      });
      return;
    }

    // Encontra próximo número de referência
    const numerosUsados = new Set(
      setas
        .filter((s) => s.marcadorTipo === "numero" && s.referenciaNumero)
        .map((s) => s.referenciaNumero),
    );
    let proximoNumero = 1;
    while (numerosUsados.has(proximoNumero)) proximoNumero += 1;

    seqRef.current += 1;
    const novaSeta = {
      ...criarSetaFotoAnotada({
        registroId: "microscopia",
        sequencia: seqRef.current,
        cor: { id: "microscopia", nome: "Numeração", valor: "#666666" },
        x,
        y,
      }),
      marcadorTipo: "numero",
      referenciaNumero: proximoNumero,
    };

    atualizarSetas([...setas, { ...novaSeta, concluida: true }]);
    setSetaAtivaId(novaSeta.id);
  }

  function removerSeta(setaId) {
    atualizarSetas(setas.filter((seta) => seta.id !== setaId));
    if (setaAtivaId === setaId) setSetaAtivaId("");
  }

  function selecionarSetaAtiva(setaId) {
    setSetaAtivaId(setaId);
    setControlesAberto(true);
  }

  if (!foto) return null;

  return (
    <section style={container}>
      {/* HEADER */}
      <div style={header}>
        <div>
          <div style={eyebrow}>Estruturas do material</div>
          <h3 style={tituloStyle}>{titulo}</h3>
        </div>
        <button
          type="button"
          className="btn btn--secondary btn--compact"
          onClick={() => {
            setSetaAtivaId("");
            setControlesAberto(true);
          }}
          style={{ fontSize: 12 }}
        >
          Nova marcação
        </button>
      </div>

      {/* DICA DE USO */}
      <div style={paletaCompacta}>
        <span style={textoDica}>
          {setaAtivaId
            ? "Toque para reposicionar a marcação"
            : "Toque na imagem para marcar estruturas"}
        </span>
      </div>

      {/* LAYOUT PRINCIPAL: IMAGEM + CONTROLES */}
      <div style={layoutPrincipal}>
        {/* IMAGEM (PRIORIDADE) */}
        <div style={areaImagem}>
          <FotoAnotadaImagem
            foto={foto}
            alt={titulo}
            setas={setas}
            imagemRef={registrarImagemRef}
            onImagemClick={adicionarOuMoverSeta}
            onSelecionarSeta={(seta) => selecionarSetaAtiva(seta.id)}
            setaAtivaId={setaAtivaId}
            interactive
          />
        </div>

        {/* CONTROLES + LEGENDA (PAINEL LATERAL COMPACTO) */}
        <aside style={painel}>
          {/* Botão toggle controles */}
          <button
            type="button"
            className="btn btn--secondary btn--compact"
            style={botaoToggle}
            onClick={() => setControlesAberto(!controlesAberto)}
            title={controlesAberto ? "Fechar" : "Abrir controles"}
          >
            ⚙ {controlesAberto ? "−" : "+"}
          </button>

          {/* CONTROLES (colapsável) */}
          {controlesAberto && setaAtiva && (
            <div style={controlesBox}>
              <input
                value={setaAtiva.legenda || ""}
                onChange={(event) =>
                  atualizarSeta(setaAtiva.id, { legenda: event.target.value })
                }
                placeholder="Nome da estrutura"
                style={inputCompacto}
                maxLength="32"
              />
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                style={{ width: "100%", fontSize: 12 }}
                onClick={() => removerSeta(setaAtiva.id)}
              >
                Remover
              </button>
            </div>
          )}

          {/* LEGENDA (lista compacta com numeração) */}
          {setas.length > 0 && (
            <div style={legendaBox}>
              <h4 style={legendaTitulo}>Marcações</h4>
              <div style={legendaLista}>
                {setas.map((seta) => (
                  <button
                    key={seta.id}
                    type="button"
                    className="btn btn--secondary btn--compact"
                    style={{
                      ...itemLegenda,
                      ...(setaAtivaId === seta.id ? itemLegendaAtivo : {}),
                    }}
                    onClick={() => selecionarSetaAtiva(seta.id)}
                    title={seta.legenda}
                  >
                    <span style={numeroMarcador}>
                      {seta.referenciaNumero || ""}
                    </span>
                    <span style={textoLegenda}>{seta.legenda || "sem nome"}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* REFERÊNCIA (se fornecida) */}
          {referencia && (
            <div style={referenciaBox}>
              <h4 style={legendaTitulo}>Referência</h4>
              <div style={partesList}>
                {referencia.partes?.map((parte, idx) => (
                  <button
                    key={parte.id || idx}
                    type="button"
                    className="btn btn--secondary btn--compact"
                    style={{
                      ...itemReferencia,
                      ...(partesUsadas.includes(parte.id)
                        ? itemReferenciaUsado
                        : {}),
                    }}
                    onClick={() => onSelecionarParte?.(parte, idx)}
                    title={parte.nome}
                  >
                    <span style={numeroReferencia}>{idx + 1}</span>
                    <span style={textoReferencia}>{parte.nome}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

/* ===================== ESTILOS ===================== */

const container = {
  display: "grid",
  gap: 8,
  padding: 12,
  borderRadius: 14,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  alignItems: "flex-start",
  flexWrap: "wrap",
};

const eyebrow = {
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const tituloStyle = {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.2,
};

const paletaCompacta = {
  display: "flex",
  alignItems: "center",
  gap: 6,
};

const textoDica = {
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 700,
};

const layoutPrincipal = {
  display: "grid",
  gridTemplateColumns: "1fr 160px",
  gap: 8,
  alignItems: "start",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
  },
};

const areaImagem = {
  minHeight: 240,
  borderRadius: 10,
  background: "var(--color-bg-soft)",
  border: "1px dashed var(--color-border)",
  overflow: "auto",
  display: "grid",
  placeItems: "center",
};

const painel = {
  display: "grid",
  gap: 6,
  alignItems: "start",
};

const botaoToggle = {
  width: "100%",
  padding: "6px 8px",
  fontSize: 12,
  fontWeight: 600,
};

const controlesBox = {
  display: "grid",
  gap: 6,
  padding: 8,
  borderRadius: 8,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const inputCompacto = {
  padding: "6px 8px",
  borderRadius: 6,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
  color: "var(--color-text)",
  fontSize: 12,
  boxSizing: "border-box",
  width: "100%",
};

const legendaBox = {
  display: "grid",
  gap: 6,
  padding: 8,
  borderRadius: 8,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const legendaTitulo = {
  margin: 0,
  fontSize: 11,
  fontWeight: 800,
  color: "var(--color-muted)",
  textTransform: "uppercase",
};

const legendaLista = {
  display: "grid",
  gap: 4,
  maxHeight: 200,
  overflowY: "auto",
};

const itemLegenda = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 6px",
  borderRadius: 6,
  background: "var(--color-bg-soft)",
  border: "1px solid var(--color-border)",
  fontSize: 11,
  textAlign: "left",
  justifyContent: "flex-start",
};

const itemLegendaAtivo = {
  background: "var(--color-primary-soft)",
  borderColor: "var(--color-primary)",
};

const numeroMarcador = {
  minWidth: 18,
  height: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 3,
  background: "#666666",
  color: "white",
  fontSize: 10,
  fontWeight: 800,
  flexShrink: 0,
};

const textoLegenda = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
};

const referenciaBox = {
  display: "grid",
  gap: 6,
  padding: 8,
  borderRadius: 8,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const partesList = {
  display: "grid",
  gap: 3,
  maxHeight: 150,
  overflowY: "auto",
};

const itemReferencia = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: "3px 5px",
  borderRadius: 4,
  background: "var(--color-bg-soft)",
  border: "1px solid var(--color-border)",
  fontSize: 10,
  textAlign: "left",
};

const itemReferenciaUsado = {
  background: "color-mix(in srgb, var(--color-success) 10%, var(--color-bg-soft))",
  borderColor: "var(--color-success-text)",
};

const numeroReferencia = {
  minWidth: 14,
  height: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 2,
  background: "var(--color-primary)",
  color: "white",
  fontSize: 8,
  fontWeight: 800,
  flexShrink: 0,
};

const textoReferencia = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
};
