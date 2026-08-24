import { useCallback, useEffect, useRef, useState } from "react";

import FotoAnotadaImagem from "../atividades/FotoAnotadaImagem.jsx";
import FotoInsetoControl from "./FotoInsetoControl.jsx";
import {
  coresSetasPadrao,
  criarSetaFotoAnotada,
  normalizarColcheteLargura,
  normalizarFonteSeta,
  normalizarRotacaoSeta,
  normalizarTamanhoSeta,
  normalizarTextoOffsetX,
  normalizarTextoOffsetY,
} from "../atividades/fotoAnotadaModel.js";

/**
 * Componente unificado de editor de anotações em fotos.
 * Prioriza a visualização da imagem com controles compactos.
 *
 * @param {Object} props
 * @param {string} props.foto - URL da foto
 * @param {boolean} props.edicaoConcluida - Se a edição foi concluída
 * @param {Function} props.onEdicaoConcluidaChange - Callback para mudar status
 * @param {Array} props.setas - Array de setas
 * @param {Function} props.onSetasChange - Callback para atualizar setas
 * @param {string} props.titulo - Título do editor
 * @param {string} props.modo - "cores" (padrão) ou "referencia" (microscopia)
 */
export default function FotoAnotadaEditor({
  foto,
  edicaoConcluida = false,
  onEdicaoConcluidaChange,
  setas = [],
  onSetasChange,
  onFotoChange,
  rotuloFoto = "Foto do inseto",
  titulo = "Anotações na foto",
  modo = "cores",
}) {
  const containerRef = useRef(null);
  const areaImagemRef = useRef(null);
  const layoutRef = useRef(null);
  const painelRef = useRef(null);
  const arrastePainelRef = useRef(null);
  const [corAtiva, setCorAtiva] = useState(coresSetasPadrao[0].id);
  const [setaAtivaId, setSetaAtivaId] = useState("");
  const [controlesAberto, setControlesAberto] = useState(true);
  const [larguraEditor, setLarguraEditor] = useState(0);
  const [larguraViewport, setLarguraViewport] = useState(() =>
    typeof window === "undefined" ? 0 : window.innerWidth
  );
  const [zoom, setZoom] = useState(100);
  const [controleAtivo, setControleAtivo] = useState("giro");
  const [painelPosicao, setPainelPosicao] = useState(null);
  const [painelTopOffset, setPainelTopOffset] = useState(0);
  const imagemRef = useRef(null);
  const seqRef = useRef(setas.length);
  const registrarImagemRef = useCallback((elemento) => {
    imagemRef.current = elemento;
  }, []);

  const corSelecionada =
    coresSetasPadrao.find((cor) => cor.id === corAtiva) || coresSetasPadrao[0];
  const setaAtiva = setas.find((seta) => seta.id === setaAtivaId);
  const temFoto = Boolean(foto);
  const edicaoConcluidaEfetiva = temFoto && edicaoConcluida;
  const larguraBase = larguraEditor || larguraViewport;
  const layoutMuitoCompacto = larguraBase > 0 && larguraBase < 430;
  const layoutCompacto = larguraBase > 0 && larguraBase < 540;
  const layoutDesktopAmplo = larguraBase >= 960;
  const rotulosCompactosCabecalho = layoutMuitoCompacto;
  const painelLargura = layoutMuitoCompacto
    ? 104
    : layoutCompacto
      ? 132
      : layoutDesktopAmplo
        ? 156
        : 164;
  const limiteAlturaImagemCompacta = "min(58vh, 420px)";
  const larguraMinimaImagem = layoutMuitoCompacto
    ? 184
    : layoutCompacto
      ? 208
      : layoutDesktopAmplo
        ? 420
        : 240;

  useEffect(() => {
    const elemento = containerRef.current;
    if (!elemento || typeof ResizeObserver === "undefined") return undefined;

    const atualizarLargura = () => {
      setLarguraEditor(Math.round(elemento.getBoundingClientRect().width));
    };

    atualizarLargura();

    const observer = new ResizeObserver(() => {
      atualizarLargura();
    });

    observer.observe(elemento);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const atualizarViewport = () => {
      setLarguraViewport(window.innerWidth);
    };

    atualizarViewport();
    window.addEventListener("resize", atualizarViewport);

    return () => window.removeEventListener("resize", atualizarViewport);
  }, []);

  useEffect(() => {
    const elemento = areaImagemRef.current;
    if (!elemento || zoom <= 100) return;

    const maxScrollLeft = Math.max(0, elemento.scrollWidth - elemento.clientWidth);
    const maxScrollTop = Math.max(0, elemento.scrollHeight - elemento.clientHeight);

    elemento.scrollLeft = maxScrollLeft / 2;
    elemento.scrollTop = maxScrollTop / 2;
  }, [zoom, foto]);

  useEffect(() => {
    if (!layoutMuitoCompacto) {
      arrastePainelRef.current = null;
      return;
    }

    const areaLimite = obterAreaLimitePainel(
      containerRef.current,
      layoutRef.current,
      areaImagemRef.current,
    );
    const painel = painelRef.current;
    if (!areaLimite || !painel) return;
    setPainelTopOffset(areaLimite.topOffset || 0);

    setPainelPosicao((atual) => {
      if (atual) {
        return limitarPosicaoPainel(atual, areaLimite, painel);
      }
      return obterPosicaoInicialPainel(areaLimite, painel);
    });
  }, [layoutMuitoCompacto, foto, controlesAberto, setaAtivaId]);

  useEffect(() => {
    if (!layoutMuitoCompacto) return undefined;

    function handlePointerMove(event) {
      const drag = arrastePainelRef.current;
      const areaLimite = obterAreaLimitePainel(
        containerRef.current,
        layoutRef.current,
        areaImagemRef.current,
      );
      const painel = painelRef.current;
      if (!drag || !areaLimite || !painel) return;

      const proxima = limitarPosicaoPainel(
        {
          x: drag.startLeft + (event.clientX - drag.startX),
          y: drag.startTop + (event.clientY - drag.startY),
        },
        areaLimite,
        painel,
      );
      setPainelPosicao(proxima);
    }

    function encerrarArraste() {
      arrastePainelRef.current = null;
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", encerrarArraste);
    window.addEventListener("pointercancel", encerrarArraste);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", encerrarArraste);
      window.removeEventListener("pointercancel", encerrarArraste);
    };
  }, [layoutMuitoCompacto]);

  function atualizarSetas(proximas) {
    onSetasChange?.(proximas);
  }

  function atualizarSeta(setaId, patch) {
    const larguraReferenciaAtual = obterLarguraReferenciaAtual(imagemRef.current);
    atualizarSetas(
      setas.map((seta) =>
        seta.id === setaId
          ? {
              ...seta,
              ...patch,
              larguraReferencia: larguraReferenciaAtual || seta.larguraReferencia || 0,
            }
          : seta,
      ),
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

    seqRef.current += 1;
    const novaSeta = criarSetaFotoAnotada({
      registroId: "identificacao",
      sequencia: seqRef.current,
      cor: corSelecionada,
      x,
      y,
    });

    atualizarSetas([
      ...setas,
      {
        ...novaSeta,
        larguraReferencia: obterLarguraReferenciaAtual(imagemRef.current),
        concluida: true,
      },
    ]);
    selecionarSetaAtiva(novaSeta.id);
  }

  function removerSeta(setaId) {
    atualizarSetas(setas.filter((seta) => seta.id !== setaId));
    if (setaAtivaId === setaId) setSetaAtivaId("");
  }

  function removerUltimaSeta() {
    const ultima = setas[setas.length - 1];
    if (!ultima) return;
    removerSeta(ultima.id);
  }

  function selecionarSetaAtiva(setaId) {
    setSetaAtivaId(setaId);
    setControlesAberto(true);
    setControleAtivo("giro");
  }

  const emEdicao = !edicaoConcluidaEfetiva;
  const totalConcluidas = setas.filter((seta) => seta.concluida !== false).length;
  const mensagemHint =
    modo === "referencia"
      ? "Escolha a estrutura e toque na imagem"
      : setaAtivaId
        ? "Toque para reposicionar"
        : "Toque para adicionar";
  const legendaPainel = setas.length > 0 ? (
    <div style={{ ...legendaBox, ...(layoutMuitoCompacto ? legendaBoxFlutuante : null) }}>
      <div style={legendaCabecalho}>
        <h4 style={legendaTitulo}>Legenda</h4>
        <span style={legendaContador}>{setas.length}</span>
      </div>
      <div
        style={{
          ...legendaLista,
          ...(layoutMuitoCompacto ? legendaListaFlutuante : null),
          maxHeight: layoutMuitoCompacto ? 150 : 280,
        }}
      >
        {setas.map((seta) => (
          <button
            key={seta.id}
            type="button"
            className="btn btn--secondary btn--compact"
            style={{
              ...itemLegenda,
              ...(layoutMuitoCompacto ? itemLegendaFlutuante : null),
              ...(setaAtivaId === seta.id ? itemLegendaAtivo : {}),
              fontSize: layoutMuitoCompacto ? 10 : itemLegenda.fontSize,
            }}
            onClick={() => selecionarSetaAtiva(seta.id)}
            title={seta.legenda}
          >
            <span style={{ ...amostraCor, background: seta.cor }} />
            <span style={textoLegenda}>{seta.legenda || seta.corNome}</span>
          </button>
        ))}
      </div>
    </div>
  ) : null;
  const painelEdicao = emEdicao ? (
    <aside
      ref={painelRef}
      style={{
        ...painel,
        ...(layoutMuitoCompacto ? painelFlutuante : null),
        ...(layoutMuitoCompacto && painelPosicao
          ? {
              left: painelPosicao.x,
              top: painelTopOffset + painelPosicao.y,
              right: "auto",
              bottom: "auto",
            }
          : null),
        minWidth: layoutMuitoCompacto ? undefined : painelLargura,
        width: layoutMuitoCompacto ? painelFlutuante.width : undefined,
        order: 2,
      }}
    >
      <PainelResumoMarcacoes
        setaAtiva={setaAtiva}
        totalSetas={setas.length}
        totalConcluidas={totalConcluidas}
        controlesAberto={controlesAberto}
        layoutMuitoCompacto={layoutMuitoCompacto}
        onToggleControles={() => setControlesAberto(!controlesAberto)}
        onIniciarArraste={(event) => {
          if (!layoutMuitoCompacto || !painelPosicao) return;
          event.preventDefault();
          event.stopPropagation();
          arrastePainelRef.current = {
            startX: event.clientX,
            startY: event.clientY,
            startLeft: painelPosicao.x,
            startTop: painelPosicao.y,
          };
        }}
      />

      {controlesAberto && setaAtiva ? (
        <PainelControlesSeta
          setaAtiva={setaAtiva}
          controleAtivo={controleAtivo}
          layoutMuitoCompacto={layoutMuitoCompacto}
          modo={modo}
          onSelecionarControle={setControleAtivo}
          onAtualizarPonta={(pontaTipo) => {
            atualizarSeta(setaAtiva.id, { pontaTipo });
            if (controleAtivo === "colchete" && pontaTipo !== "colchete") {
              setControleAtivo("giro");
            }
          }}
          onAjustar={(patch) => atualizarSeta(setaAtiva.id, patch)}
        />
      ) : null}

      {controlesAberto && !setaAtiva ? (
        <div
          style={{
            ...estadoVazioBox,
            ...(layoutMuitoCompacto ? estadoVazioBoxCompacto : null),
          }}
        >
          <strong style={estadoVazioTitulo}>Nenhuma seta ativa</strong>
          <span style={estadoVazioTexto}>Toque na imagem ou na legenda.</span>
        </div>
      ) : null}

      {!layoutMuitoCompacto ? legendaPainel : null}
    </aside>
  ) : null;

  return (
    <section ref={containerRef} style={container}>
      {/* HEADER */}
      <div style={header}>
        <div>
          <h3 style={tituloStyle}>{titulo}</h3>
        </div>
        <div style={{ ...acoesHeader, ...(layoutMuitoCompacto ? acoesHeaderCompacto : null) }}>
          {edicaoConcluidaEfetiva ? (
            <button
              type="button"
              className="btn btn--secondary btn--compact"
              onClick={() => onEdicaoConcluidaChange?.(false)}
            >
              Reeditar
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                onClick={() => {
                  setSetaAtivaId("");
                  setControlesAberto(true);
                }}
              >
                {rotulosCompactosCabecalho
                  ? "Nova"
                  : `Nova ${modo === "referencia" ? "estrutura" : "seta"}`}
              </button>
              {setas.length > 0 ? (
                <button
                  type="button"
                  className="btn btn--secondary btn--compact"
                  onClick={removerUltimaSeta}
                  title="Desfaz a última seta adicionada"
                >
                  {rotulosCompactosCabecalho ? "Desfazer" : "Desfazer última"}
                </button>
              ) : null}
              <button
                type="button"
                className="btn btn--primary btn--compact"
                onClick={() => {
                  setSetaAtivaId("");
                  onEdicaoConcluidaChange?.(true);
                }}
              >
                Concluir
              </button>
            </>
          )}
        </div>
      </div>

      {/* STATUS OU PALETA COMPACTA */}
      {edicaoConcluidaEfetiva ? (
        <div style={statusConcluido}>Anotações registradas ✓</div>
      ) : (
        <div style={paletaCompacta}>
          {modo === "cores" &&
            coresSetasPadrao.map((cor) => (
              <button
                key={cor.id}
                type="button"
                style={{
                  ...corBotao,
                  background: cor.valor,
                  outline: cor.id === corAtiva ? "3px solid var(--color-text)" : "none",
                }}
                aria-label={`Seta ${cor.nome}`}
                title={cor.nome}
                onClick={() => {
                  setCorAtiva(cor.id);
                  if (setaAtivaId) {
                    atualizarSeta(setaAtivaId, {
                      corId: cor.id,
                      corNome: cor.nome,
                      cor: cor.valor,
                    });
                  }
                }}
              />
            ))}
          <span style={textoDica}>{mensagemHint}</span>
        </div>
      )}

      {/* LAYOUT PRINCIPAL: IMAGEM + CONTROLES */}
      <div
        ref={layoutRef}
        style={{
          ...layoutPrincipal,
          width: "100%",
          gridTemplateColumns: layoutMuitoCompacto
            ? "1fr"
            : `minmax(${larguraMinimaImagem}px, 1fr) ${painelLargura}px`,
        }}
      >
        {/* IMAGEM (PRIORIDADE) */}
        <div
          ref={areaImagemRef}
          style={{
            ...areaImagem,
            minWidth: larguraMinimaImagem,
            minHeight: layoutMuitoCompacto ? 220 : layoutDesktopAmplo ? 420 : 240,
            maxHeight: layoutMuitoCompacto ? limiteAlturaImagemCompacta : undefined,
          }}
        >
          <div
            style={{
              ...zoomOverlay,
              ...(layoutMuitoCompacto ? zoomOverlayCompacto : null),
            }}
          >
            <ZoomControls zoom={zoom} setZoom={setZoom} compacto={layoutMuitoCompacto} />
          </div>
          <FotoAnotadaImagem
            foto={foto}
            alt={titulo}
            setas={setas}
            imagemRef={emEdicao ? registrarImagemRef : undefined}
            onImagemClick={emEdicao ? adicionarOuMoverSeta : undefined}
            onAtualizarSeta={emEdicao ? atualizarSeta : undefined}
            onSelecionarSeta={emEdicao ? (seta) => selecionarSetaAtiva(seta.id) : undefined}
            onAtualizarLegendaInline={
              emEdicao
                ? (setaId, legenda) => atualizarSeta(setaId, { legenda })
                : undefined
            }
            setaAtivaId={setaAtivaId}
            edicaoLegendaInline={emEdicao}
            frameStyle={{
              width: `${zoom}%`,
              minWidth: zoom > 100 ? `${zoom}%` : undefined,
            }}
            interactive={emEdicao}
          />
        </div>

        {onFotoChange ? (
          <div
            style={{
              ...acoesFotoBox,
              gridColumn: layoutMuitoCompacto ? "1" : "1 / -1",
              order: 3,
            }}
          >
            <FotoInsetoControl
              titulo={rotuloFoto}
              alt={rotuloFoto}
              fotoInseto={foto}
              onFotoInsetoChange={onFotoChange}
              mostrarPreview={false}
              compacto
              ocultarTitulo
              painelAuxiliar={layoutMuitoCompacto ? legendaPainel : null}
            />
          </div>
        ) : null}

        {/* CONTROLES + LEGENDA (PAINEL LATERAL COMPACTO) */}
        {!layoutMuitoCompacto ? painelEdicao : null}
      </div>
      {layoutMuitoCompacto ? painelEdicao : null}
    </section>
  );
}

function ControleCompacto({
  label,
  min,
  max,
  step,
  value,
  onChange,
  mostrarRotulo = true,
  compacto = false,
}) {
  const percentual =
    max === min ? 0 : Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <label style={controleCompactoLabel}>
      {mostrarRotulo ? <span style={controleCompactoRotulo}>{label}</span> : null}
      <div style={controleCompactoFaixaBox}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          style={compacto ? controleCompactoRangeCompacto : controleCompactoRange}
        />
        {compacto ? (
          <span
            style={{
              ...controleCompactoBolhaValor,
              left: `clamp(9px, calc(${percentual}% + 0px), calc(100% - 9px))`,
            }}
          >
            {value}
          </span>
        ) : null}
      </div>
      {!compacto ? (
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          style={controleCompactoNumero}
          aria-label={label}
        />
      ) : null}
    </label>
  );
}

function PainelResumoMarcacoes({
  setaAtiva,
  totalSetas,
  totalConcluidas,
  layoutMuitoCompacto,
  onIniciarArraste,
}) {
  return (
    <div style={layoutMuitoCompacto ? painelResumoCompacto : painelResumoBox}>
      {layoutMuitoCompacto ? (
        <button
          type="button"
          style={alcaArraste}
          onPointerDown={onIniciarArraste}
          aria-label="Mover painel"
          title="Mover painel"
        >
          <span style={alcaArrasteBarra} />
        </button>
      ) : (
        <div style={painelResumoLinha}>
          <span style={painelResumoBadge} title={`${totalSetas} marcações`}>
            {totalSetas}
          </span>
          <span style={painelResumoRotulo}>
            {totalSetas === 1 ? "marcação" : "marcações"}
          </span>
          <span style={painelResumoMeta}>
            {setaAtiva ? "1 ativa" : `${totalConcluidas} prontas`}
          </span>
        </div>
      )}
    </div>
  );
}

function obterLarguraReferenciaAtual(elementoImagem) {
  if (!elementoImagem) return 0;
  return Math.round(elementoImagem.getBoundingClientRect().width) || 0;
}

function obterPosicaoInicialPainel(area, painel) {
  const margem = 8;
  const larguraDisponivel = area.imageWidth || area.clientWidth || 0;
  const alturaDisponivel = area.imageHeight || area.clientHeight || 0;
  const larguraPainel = painel.offsetWidth || 0;
  const alturaPainel = painel.offsetHeight || 0;

  return {
    x: Math.max(margem, larguraDisponivel - larguraPainel - margem),
    y: Math.max(margem, alturaDisponivel - alturaPainel - margem),
  };
}

function limitarPosicaoPainel(posicao, area, painel) {
  const margem = 8;
  const maxX = Math.max(margem, (area.clientWidth || 0) - (painel.offsetWidth || 0) - margem);
  const maxY = Math.max(margem, (area.clientHeight || 0) - (painel.offsetHeight || 0) - margem);

  return {
    x: Math.max(margem, Math.min(maxX, Math.round(posicao.x))),
    y: Math.max(margem, Math.min(maxY, Math.round(posicao.y))),
  };
}

function obterAreaLimitePainel(container, layout, areaImagem) {
  if (!container) return null;

  const containerRect = container.getBoundingClientRect();
  const layoutRect = layout?.getBoundingClientRect();
  const areaImagemRect = areaImagem?.getBoundingClientRect();
  const topOffset = layoutRect
    ? Math.max(0, Math.round(layoutRect.top - containerRect.top))
    : 0;

  return {
    clientWidth: container.clientWidth || 0,
    clientHeight: Math.max(
      0,
      Math.round((container.clientHeight || containerRect.height || 0) - topOffset),
    ),
    imageWidth: areaImagemRect ? Math.round(areaImagemRect.width || 0) : 0,
    imageHeight: areaImagemRect ? Math.round(areaImagemRect.height || 0) : 0,
    topOffset,
  };
}

function PainelControlesSeta({
  setaAtiva,
  controleAtivo,
  layoutMuitoCompacto,
  modo,
  onSelecionarControle,
  onAtualizarPonta,
  onAjustar,
}) {
  const controleAtivoElemento =
    modo === "cores" ? (
      <ControleSetaAtivo
        controleAtivo={controleAtivo}
        setaAtiva={setaAtiva}
        onChange={onAjustar}
        mostrarRotulo={!layoutMuitoCompacto}
        compacto={layoutMuitoCompacto}
      />
    ) : null;

  return (
    <div style={{ ...controlesBox, ...(layoutMuitoCompacto ? controlesBoxCompacto : null) }}>
      {controleAtivoElemento}
      {modo === "cores" ? (
        <div style={controleSeletor}>
          {obterControlesSeta(setaAtiva).map((controle) => (
            <button
              key={controle.id}
              type="button"
              className="btn btn--secondary btn--compact"
              style={{
                ...controleChip,
                ...(controleAtivo === controle.id ? controleChipAtivo : null),
              }}
              onClick={() => onSelecionarControle(controle.id)}
              title={controle.titulo}
            >
              {controle.rotulo}
            </button>
          ))}
        </div>
      ) : null}
      {!layoutMuitoCompacto ? (
        <div style={painelSecaoTopo}>
          <span style={{ ...amostraCor, background: setaAtiva.cor }} />
          <div style={painelSecaoTexto}>
            <strong style={painelSecaoTitulo}>Ajuste ativo</strong>
            <span style={painelSecaoSubtitulo}>
              {setaAtiva.legenda || setaAtiva.corNome}
            </span>
          </div>
        </div>
      ) : null}
      <div style={controleSeletorPonta}>
        {tiposPonta.map((tipo) => (
          <button
            key={tipo.id}
            type="button"
            className="btn btn--secondary btn--compact"
            style={{
              ...controleChip,
              ...(setaAtiva.pontaTipo === tipo.id ? controleChipAtivo : null),
            }}
            onClick={() => onAtualizarPonta(tipo.id)}
            title={tipo.titulo}
          >
            {tipo.rotulo}
          </button>
        ))}
      </div>
    </div>
  );
}

function ControleSetaAtivo({
  controleAtivo,
  setaAtiva,
  onChange,
  mostrarRotulo = true,
  compacto = false,
}) {
  if (!setaAtiva) return null;

  switch (controleAtivo) {
    case "colchete":
      if (setaAtiva.pontaTipo !== "colchete") return null;
      return (
        <ControleCompacto
          label="Colchete"
          min={10}
          max={72}
          step={1}
          value={normalizarColcheteLargura(setaAtiva.colcheteLargura)}
          onChange={(valor) => onChange({ colcheteLargura: valor })}
          mostrarRotulo={mostrarRotulo}
          compacto={compacto}
        />
      );
    case "tamanho":
      return (
        <ControleCompacto
          label="Tamanho"
          min={8}
          max={120}
          step={1}
          value={normalizarTamanhoSeta(setaAtiva.tamanho)}
          onChange={(valor) => onChange({ tamanho: valor })}
          mostrarRotulo={mostrarRotulo}
          compacto={compacto}
        />
      );
    case "fonte":
      return (
        <ControleCompacto
          label="Fonte"
          min={10}
          max={22}
          step={1}
          value={normalizarFonteSeta(setaAtiva.fonteTamanho)}
          onChange={(valor) => onChange({ fonteTamanho: valor })}
          mostrarRotulo={mostrarRotulo}
          compacto={compacto}
        />
      );
    case "texto-x":
      return (
        <ControleCompacto
          label="Texto X"
          min={-120}
          max={120}
          step={1}
          value={normalizarTextoOffsetX(setaAtiva.textoOffsetX)}
          onChange={(valor) => onChange({ textoOffsetX: valor })}
          mostrarRotulo={mostrarRotulo}
          compacto={compacto}
        />
      );
    case "texto-y":
      return (
        <ControleCompacto
          label="Texto Y"
          min={-160}
          max={80}
          step={2}
          value={normalizarTextoOffsetY(setaAtiva.textoOffsetY)}
          onChange={(valor) => onChange({ textoOffsetY: valor })}
          mostrarRotulo={mostrarRotulo}
          compacto={compacto}
        />
      );
    case "giro":
    default:
      return (
        <ControleCompacto
          label="Giro"
          min={-180}
          max={180}
          step={2}
          value={normalizarRotacaoSeta(setaAtiva.rotacao)}
          onChange={(valor) => onChange({ rotacao: valor })}
          mostrarRotulo={mostrarRotulo}
          compacto={compacto}
        />
      );
  }
}

const controlesSeta = [
  { id: "giro", rotulo: "Giro", titulo: "Giro" },
  { id: "tamanho", rotulo: "Tam.", titulo: "Tamanho" },
  { id: "fonte", rotulo: "Fonte", titulo: "Fonte" },
  { id: "texto-x", rotulo: "X", titulo: "Posição do texto em X" },
  { id: "texto-y", rotulo: "Y", titulo: "Posição do texto em Y" },
];

const tiposPonta = [
  { id: "seta", rotulo: "Seta", titulo: "Ponta em seta" },
  { id: "colchete", rotulo: "Colch.", titulo: "Ponta em colchete" },
];

function obterControlesSeta(setaAtiva) {
  if (!setaAtiva) return controlesSeta;
  return setaAtiva.pontaTipo === "colchete"
    ? [...controlesSeta, { id: "colchete", rotulo: "Colch.", titulo: "Largura do colchete" }]
    : controlesSeta;
}

function ZoomControls({ zoom, setZoom, compacto = false }) {
  return (
    <div style={{ ...zoomBox, ...(compacto ? zoomBoxCompacto : null) }}>
      <button
        type="button"
        className="btn btn--secondary btn--compact"
        style={{
          ...zoomBotao,
          ...(compacto ? zoomBotaoCompacto : null),
          ...(zoom <= 70 ? zoomBotaoDesabilitado : null),
        }}
        onClick={() => setZoom((atual) => Math.max(70, atual - 10))}
        title="Reduzir imagem"
        aria-label="Reduzir imagem"
        disabled={zoom <= 70}
      >
        −
      </button>
      <button
        type="button"
        className="btn btn--secondary btn--compact"
        style={{
          ...zoomValor,
          ...(compacto ? zoomValorCompacto : null),
        }}
        onClick={() => setZoom(100)}
        title="Voltar para 100%"
        aria-label="Voltar para 100%"
      >
        {zoom}%
      </button>
      <button
        type="button"
        className="btn btn--secondary btn--compact"
        style={{
          ...zoomBotao,
          ...(compacto ? zoomBotaoCompacto : null),
          ...(zoom >= 170 ? zoomBotaoDesabilitado : null),
        }}
        onClick={() => setZoom((atual) => Math.min(170, atual + 10))}
        title="Ampliar imagem"
        aria-label="Ampliar imagem"
        disabled={zoom >= 170}
      >
        +
      </button>
    </div>
  );
}

/* ===================== ESTILOS ===================== */

const container = {
  position: "relative",
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

const acoesHeader = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
  alignItems: "center",
};

const acoesHeaderCompacto = {
  flexWrap: "nowrap",
  gap: 4,
};

const zoomOverlay = {
  position: "sticky",
  top: 8,
  right: 0,
  zIndex: 6,
  justifySelf: "end",
  alignSelf: "start",
  marginLeft: "auto",
  marginBottom: -42,
  pointerEvents: "none",
};

const zoomOverlayCompacto = {
  top: 6,
  marginBottom: -38,
};

const zoomBox = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: "4px",
  minHeight: 36,
  borderRadius: 12,
  background: "color-mix(in srgb, var(--color-surface) 92%, transparent)",
  border: "1px solid var(--color-border)",
  boxShadow:
    "0 10px 24px color-mix(in srgb, var(--color-text) 14%, transparent), inset 0 1px 0 color-mix(in srgb, white 65%, transparent)",
  backdropFilter: "blur(10px)",
  pointerEvents: "auto",
};

const zoomBotao = {
  minWidth: 32,
  width: 32,
  height: 30,
  borderRadius: 8,
  paddingInline: 0,
  fontSize: 18,
  lineHeight: 1,
  fontWeight: 700,
};

const zoomBoxCompacto = {
  gap: 2,
  padding: "1px 2px",
  minHeight: 28,
  borderRadius: 8,
};

const zoomBotaoCompacto = {
  minWidth: 24,
  width: 24,
  height: 24,
  fontSize: 14,
  borderRadius: 6,
};

const zoomBotaoDesabilitado = {
  opacity: 0.45,
  cursor: "default",
};

const zoomValor = {
  minWidth: 56,
  height: 30,
  borderRadius: 8,
  padding: "0 10px",
  textAlign: "center",
  fontSize: 11,
  fontWeight: 800,
  color: "var(--color-text)",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-sm)",
};

const zoomValorCompacto = {
  minWidth: 40,
  height: 24,
  padding: "0 6px",
  fontSize: 9,
  borderRadius: 6,
};

const tituloStyle = {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.2,
};

const statusConcluido = {
  padding: "6px 8px",
  borderRadius: 8,
  background: "var(--color-success-soft)",
  color: "var(--color-success-text)",
  fontSize: 12,
  fontWeight: 800,
};

const paletaCompacta = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexWrap: "wrap",
};

const corBotao = {
  width: 28,
  height: 28,
  minHeight: 0,
  padding: 0,
  borderRadius: 999,
  border: "2px solid white",
  cursor: "pointer",
  boxShadow: "var(--shadow-sm)",
  flexShrink: 0,
};

const textoDica = {
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 700,
  marginLeft: "auto",
};

const layoutPrincipal = {
  display: "grid",
  gridTemplateColumns: "minmax(148px, 1fr) clamp(118px, 34vw, 148px)",
  gap: 8,
  alignItems: "start",
};

const areaImagem = {
  position: "relative",
  minWidth: 148,
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
  minWidth: 118,
};

const painelFlutuante = {
  position: "absolute",
  left: "auto",
  right: 8,
  bottom: 8,
  zIndex: 5,
  width: "clamp(126px, 40vw, 148px)",
  minWidth: 0,
  maxHeight: "48%",
  overflowY: "auto",
  padding: 4,
  borderRadius: 8,
  background: "color-mix(in srgb, var(--color-surface) 66%, transparent)",
  border: "1px solid color-mix(in srgb, var(--color-border) 72%, transparent)",
  boxShadow:
    "0 8px 20px color-mix(in srgb, var(--color-text) 12%, transparent), inset 0 1px 0 color-mix(in srgb, white 52%, transparent)",
  backdropFilter: "blur(10px)",
};

const painelResumoBox = {
  display: "grid",
  gap: 2,
  padding: 4,
  borderRadius: 8,
  background: "color-mix(in srgb, var(--color-surface-soft) 82%, transparent)",
  border: "1px solid var(--color-border)",
  boxShadow: "inset 0 1px 0 color-mix(in srgb, white 55%, transparent)",
};

const painelResumoCompacto = {
  display: "grid",
  gap: 0,
};

const alcaArraste = {
  display: "grid",
  placeItems: "center",
  width: "100%",
  minHeight: 18,
  padding: "1px 0 3px",
  border: "none",
  background: "transparent",
  cursor: "grab",
  touchAction: "none",
};

const alcaArrasteBarra = {
  width: 34,
  height: 4,
  borderRadius: 999,
  background: "color-mix(in srgb, var(--color-text) 22%, transparent)",
};

const painelResumoLinha = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  minWidth: 0,
};

const painelResumoBadge = {
  minWidth: 16,
  height: 16,
  display: "grid",
  placeItems: "center",
  padding: "0 4px",
  borderRadius: 999,
  background: "color-mix(in srgb, var(--color-bg-soft) 92%, transparent)",
  border: "1px solid var(--color-border)",
  fontSize: 9,
  lineHeight: 1,
  fontWeight: 900,
  color: "var(--color-muted)",
};

const painelResumoRotulo = {
  fontSize: 8,
  fontWeight: 800,
  color: "var(--color-muted)",
  textTransform: "uppercase",
};

const painelResumoMeta = {
  fontSize: 8,
  lineHeight: 1.1,
  color: "var(--color-muted)",
  marginLeft: "auto",
};

const acoesFotoBox = {
  minWidth: 0,
};

const controlesBox = {
  display: "grid",
  gap: 5,
  padding: 6,
  borderRadius: 8,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  boxShadow: "inset 0 1px 0 color-mix(in srgb, white 55%, transparent)",
};

const controlesBoxCompacto = {
  gap: 3,
  padding: 3,
};

const legendaBoxFlutuante = {
  gap: 2,
  padding: 2,
  background: "color-mix(in srgb, var(--color-surface-soft) 62%, transparent)",
  borderRadius: 8,
};

const legendaListaFlutuante = {
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: 3,
};

const itemLegendaFlutuante = {
  minWidth: 0,
  padding: "1px 2px",
};

const painelSecaoTopo = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  minWidth: 0,
};

const painelSecaoTexto = {
  display: "grid",
  minWidth: 0,
};

const painelSecaoTitulo = {
  fontSize: 8,
  lineHeight: 1.1,
  color: "var(--color-muted)",
  textTransform: "uppercase",
};

const painelSecaoSubtitulo = {
  fontSize: 9,
  fontWeight: 800,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const controleSeletor = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 2,
};

const controleSeletorPonta = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 2,
};

const controleChip = {
  minHeight: 18,
  minWidth: 0,
  padding: "1px 3px",
  fontSize: 6.5,
  fontWeight: 800,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

const controleChipAtivo = {
  background: "var(--color-primary-soft)",
  borderColor: "var(--color-primary)",
  color: "var(--color-primary-text)",
};

const controleCompactoLabel = {
  display: "grid",
  gap: 1,
  fontSize: 9,
};

const controleCompactoRotulo = {
  fontWeight: 700,
  color: "var(--color-muted)",
  fontSize: 8,
};

const controleCompactoFaixaBox = {
  position: "relative",
  display: "grid",
  alignItems: "center",
};

const controleCompactoRange = {
  width: "100%",
  height: 20,
  cursor: "pointer",
};

const controleCompactoRangeCompacto = {
  ...controleCompactoRange,
  height: 22,
  touchAction: "pan-x",
};

const controleCompactoBolhaValor = {
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 18,
  height: 18,
  display: "grid",
  placeItems: "center",
  padding: "0 2px",
  borderRadius: 999,
  background: "color-mix(in srgb, var(--color-primary) 88%, white 12%)",
  color: "white",
  fontSize: 7,
  fontWeight: 900,
  lineHeight: 1,
  pointerEvents: "none",
  boxShadow: "0 1px 3px color-mix(in srgb, var(--color-text) 18%, transparent)",
};

const controleCompactoNumero = {
  width: "100%",
  padding: "3px 4px",
  borderRadius: 4,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
  color: "var(--color-text)",
  fontSize: 9,
  boxSizing: "border-box",
};

const legendaBox = {
  display: "grid",
  gap: 3,
  padding: 4,
  borderRadius: 10,
  background: "color-mix(in srgb, var(--color-surface-soft) 82%, transparent)",
  border: "1px solid var(--color-border)",
  boxShadow: "inset 0 1px 0 color-mix(in srgb, white 55%, transparent)",
};

const legendaCabecalho = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 6,
};

const legendaTitulo = {
  margin: 0,
  fontSize: 10,
  fontWeight: 800,
  color: "var(--color-muted)",
  textTransform: "uppercase",
};

const legendaContador = {
  minWidth: 18,
  height: 18,
  display: "grid",
  placeItems: "center",
  padding: "0 5px",
  borderRadius: 999,
  background: "var(--color-bg-soft)",
  border: "1px solid var(--color-border)",
  color: "var(--color-muted)",
  fontSize: 9,
  fontWeight: 900,
};

const legendaLista = {
  display: "grid",
  gap: 2,
  maxHeight: 280,
  overflowY: "auto",
};

const itemLegenda = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: "3px 4px",
  borderRadius: 6,
  background: "var(--color-bg-soft)",
  border: "1px solid var(--color-border)",
  fontSize: 9,
  textAlign: "left",
  justifyContent: "flex-start",
};

const itemLegendaAtivo = {
  background: "var(--color-primary-soft)",
  borderColor: "var(--color-primary)",
};

const amostraCor = {
  width: 12,
  height: 12,
  borderRadius: 2,
  flexShrink: 0,
};

const textoLegenda = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
};

const estadoVazioBox = {
  display: "grid",
  gap: 3,
  padding: "10px 9px",
  borderRadius: 10,
  background: "color-mix(in srgb, var(--color-bg-soft) 88%, transparent)",
  border: "1px dashed var(--color-border)",
};

const estadoVazioBoxCompacto = {
  gap: 2,
  padding: "5px 6px",
  borderRadius: 8,
  background: "color-mix(in srgb, var(--color-bg-soft) 74%, transparent)",
};

const estadoVazioTitulo = {
  fontSize: 11,
  fontWeight: 800,
  color: "var(--color-text)",
};

const estadoVazioTexto = {
  fontSize: 10,
  lineHeight: 1.3,
  color: "var(--color-muted)",
};
