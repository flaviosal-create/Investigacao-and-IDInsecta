import { useMemo, useState } from "react";

import microscopioEstereoscopicoImg from "../assets/microscopio-estereoscopico-referencia.svg";
import microscopioOpticoImg from "../assets/microscopio-optico-referencia.svg";
import {
  corReferenciaMicroscopia,
  equipamentosMicroscopia,
} from "./microscopiosDados.js";

export default function MicroscopiosInterativos({
  tipo: tipoControlado,
  onTipoChange,
}) {
  const tipoInicial =
    tipoControlado && equipamentosMicroscopia[tipoControlado]
      ? tipoControlado
      : "optico";
  const [tipoInterno, setTipoInterno] = useState(tipoInicial);
  const [parteId, setParteId] = useState(equipamentosMicroscopia[tipoInicial].partes[0].id);
  const tipo = tipoControlado && equipamentosMicroscopia[tipoControlado]
    ? tipoControlado
    : tipoInterno;
  const equipamento = equipamentosMicroscopia[tipo];
  const parteSelecionada = useMemo(
    () =>
      equipamento.partes.find((parte) => parte.id === parteId) ||
      equipamento.partes[0],
    [equipamento, parteId],
  );

  function trocarTipo(proximoTipo) {
    if (!tipoControlado) {
      setTipoInterno(proximoTipo);
    }
    setParteId(equipamentosMicroscopia[proximoTipo].partes[0].id);
    onTipoChange?.(proximoTipo);
  }

  return (
    <section className="surface microscopios-interativos" style={box}>
      <div style={topo}>
        <div>
          <span style={eyebrow}>Exploração guiada</span>
          <h3 style={titulo}>Microscópios interativos</h3>
        </div>

        <div style={tabs} role="tablist" aria-label="Tipo de microscópio">
          {Object.entries(equipamentosMicroscopia).map(([id, item]) => (
            <button
              key={id}
              type="button"
              className="btn btn--secondary btn--compact"
              style={tipo === id ? tabAtiva : tab}
              onClick={() => trocarTipo(id)}
            >
              {item.titulo.replace("Microscópio ", "")}
            </button>
          ))}
        </div>
      </div>

      <div className="microscopios-interativos__conteudo" style={conteudo}>
        <div className="microscopios-interativos__diagrama" style={diagramaBox}>
          <div style={diagramaTitulo}>
            <strong>{equipamento.titulo}</strong>
            <span>{equipamento.subtitulo}</span>
          </div>
          <div style={diagramaWrap}>
            <div style={obterStageFigura(tipo, false)}>
              <MicroscopioFigura tipo={tipo} />
              {equipamento.partes.map((parte, index) => (
                <button
                  key={parte.id}
                  type="button"
                  style={{
                    ...hotspot,
                    ...(parte.id === parteSelecionada.id ? hotspotAtivo : null),
                    left: `${parte.x}%`,
                    top: `${parte.y}%`,
                  }}
                  aria-label={parte.nome}
                  onClick={() => setParteId(parte.id)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="microscopios-interativos__painel" style={painel}>
          <span style={numero}>{equipamento.partes.indexOf(parteSelecionada) + 1}</span>
          <h4 style={parteTitulo}>{parteSelecionada.nome}</h4>
          <p style={funcao}>{parteSelecionada.funcao}</p>
        </aside>
      </div>
    </section>
  );
}

export function MicroscopioReferenciaMini({
  tipo = "optico",
  parteAtivaId = "",
  partesUsadasIds,
  onSelecionarParte,
}) {
  const equipamento =
    equipamentosMicroscopia[tipo] || equipamentosMicroscopia.optico;
  const usadasIds = partesUsadasIds || new Set();

  return (
    <div style={referenciaMiniWrap}>
      <div style={referenciaMiniDiagrama}>
        <div style={obterStageFigura(tipo, true)}>
          <MicroscopioFigura tipo={tipo} mini />
          {equipamento.partes.map((parte, index) => {
            const posicao = posicoesReferenciaMini[tipo]?.[parte.id] || parte;
            const corReferencia = corReferenciaMicroscopia(index);
            const estiloEstado = parte.id === parteAtivaId
                ? hotspotAtivo
                : usadasIds.has(parte.id)
                  ? hotspotUsado
                : null;

            return (
              <button
                key={parte.id}
                type="button"
                style={{
                  ...hotspot,
                  ...hotspotMini,
                  background: corReferencia.valor,
                  borderColor: "var(--color-surface)",
                  "--cor-referencia": corReferencia.valor,
                  ...estiloEstado,
                  left: `${posicao.x}%`,
                  top: `${posicao.y}%`,
                }}
                aria-label={`Usar referência ${parte.nome}`}
                title={`${index + 1}. ${parte.nome}`}
                onClick={() => onSelecionarParte?.(parte, index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MicroscopioFigura({ tipo = "optico", mini = false }) {
  const srcPreferencial =
    tipo === "estereoscopico"
      ? "/microscopios/microscopio-estereoscopico-referencia.png"
      : "/microscopios/microscopio-optico-referencia.png";
  const srcFallback =
    tipo === "estereoscopico"
      ? microscopioEstereoscopicoImg
      : microscopioOpticoImg;
  const alt =
    tipo === "estereoscopico"
      ? "Ilustracao de referencia de microscopio estereoscopico"
      : "Ilustracao de referencia de microscopio optico";

  return (
    <MicroscopioFiguraImagem
      key={`${tipo}-${mini ? "mini" : "full"}`}
      srcPreferencial={srcPreferencial}
      srcFallback={srcFallback}
      alt={alt}
      style={obterEstiloFigura(tipo, mini)}
    />
  );
}

function MicroscopioFiguraImagem({
  srcPreferencial,
  srcFallback,
  alt,
  style,
}) {
  const [usarFallback, setUsarFallback] = useState(false);

  return (
    <img
      key={srcPreferencial}
      src={usarFallback ? srcFallback : srcPreferencial}
      alt={alt}
      style={style}
      draggable="false"
      onError={() => setUsarFallback(true)}
    />
  );
}

const box = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 16,
};

const topo = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
  flexWrap: "wrap",
};

const eyebrow = {
  color: "var(--color-secondary)",
  fontSize: 12,
  fontWeight: 900,
  textTransform: "uppercase",
};

const titulo = {
  margin: "2px 0 0",
  fontSize: 20,
};

const tabs = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const tab = {
  minWidth: 110,
};

const tabAtiva = {
  ...tab,
  background: "var(--color-primary)",
  color: "white",
  borderColor: "var(--color-primary)",
};

const conteudo = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 14,
  alignItems: "stretch",
};

const diagramaBox = {
  display: "grid",
  gap: 10,
  minWidth: 0,
};

const diagramaTitulo = {
  display: "grid",
  gap: 2,
  color: "var(--color-text)",
};

const diagramaWrap = {
  minHeight: 400,
  display: "grid",
  placeItems: "center",
  borderRadius: 14,
  background: "var(--color-bg-soft)",
  border: "1px solid var(--color-border)",
  overflow: "hidden",
  padding: 12,
};

const figura = {
  width: "100%",
  height: "100%",
  objectFit: "fill",
  userSelect: "none",
  pointerEvents: "none",
};

const figuraMini = {
  width: "100%",
  height: "100%",
  objectFit: "fill",
  userSelect: "none",
  pointerEvents: "none",
};

const posicoesReferenciaMini = {
  optico: {
    ocular: { x: 46, y: 16 },
    revolver: { x: 44, y: 33 },
    objetivas: { x: 40, y: 44 },
    platina: { x: 37, y: 55 },
    diafragma: { x: 43, y: 66 },
    foco: { x: 63, y: 50 },
    luz: { x: 49, y: 66 },
    base: { x: 48, y: 74 },
  },
  estereoscopico: {
    oculares: { x: 45, y: 16 },
    cabecote: { x: 45, y: 32 },
    zoom: { x: 41, y: 48 },
    foco: { x: 72, y: 42 },
    "iluminacao-superior": { x: 54, y: 52 },
    platina: { x: 40, y: 63 },
    braco: { x: 64, y: 63 },
    base: { x: 49, y: 84 },
  },
};

const hotspot = {
  position: "absolute",
  width: "clamp(24px, 7.5%, 32px)",
  height: "clamp(24px, 7.5%, 32px)",
  transform: "translate(-50%, -50%)",
  borderRadius: 999,
  border: "2px solid var(--color-surface)",
  background: "var(--color-primary)",
  color: "white",
  fontWeight: 950,
  fontSize: "clamp(12px, 3.1%, 16px)",
  cursor: "pointer",
  boxShadow: "var(--shadow-sm)",
  padding: 0,
  lineHeight: 1,
  display: "grid",
  placeItems: "center",
};

const hotspotAtivo = {
  transform: "translate(-50%, -50%) scale(1.12)",
  boxShadow: "0 0 0 4px color-mix(in srgb, var(--cor-referencia) 28%, transparent)",
};

const hotspotUsado = {
  transform: "translate(-50%, -50%) scale(0.98)",
  boxShadow: "0 0 0 3px color-mix(in srgb, var(--cor-referencia) 26%, transparent)",
};

const hotspotMini = {
  width: "clamp(18px, 8.5%, 22px)",
  height: "clamp(18px, 8.5%, 22px)",
  fontSize: "clamp(9px, 3.5%, 11px)",
  borderWidth: 1,
  minWidth: 18,
  minHeight: 18,
  padding: 0,
  lineHeight: 1,
  display: "grid",
  placeItems: "center",
};

const referenciaMiniWrap = {
  display: "grid",
  gap: 6,
};

const referenciaMiniDiagrama = {
  ...diagramaWrap,
  width: "min(100%, 260px)",
  minHeight: 250,
  borderRadius: 12,
  justifySelf: "center",
};

const painel = {
  display: "grid",
  alignContent: "start",
  gap: 6,
  padding: 12,
  borderRadius: 14,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  minWidth: 0,
};

const numero = {
  width: 36,
  height: 36,
  display: "grid",
  placeItems: "center",
  borderRadius: 999,
  background: "var(--color-primary)",
  color: "white",
  fontWeight: 950,
};

const parteTitulo = {
  margin: 0,
  fontSize: 17,
  lineHeight: 1.15,
};

const funcao = {
  margin: 0,
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.3,
};

function obterEstiloFigura(tipo, mini) {
  return mini ? figuraMini : figura;
}

function obterStageFigura(tipo, mini) {
  const aspectRatio = tipo === "optico" ? "2 / 3" : "1 / 1";
  const largura = mini
    ? tipo === "optico"
      ? "min(100%, 170px)"
      : "min(100%, 250px)"
    : tipo === "optico"
      ? "min(100%, 285px)"
      : "min(100%, 360px)";

  return {
    position: "relative",
    width: largura,
    aspectRatio,
    flexShrink: 0,
  };
}
