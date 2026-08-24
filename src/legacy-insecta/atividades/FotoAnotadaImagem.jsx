import { useEffect, useRef, useState } from "react";

import {
  normalizarColcheteLargura,
  normalizarFonteSeta,
  normalizarRotacaoSeta,
  normalizarTamanhoSeta,
  normalizarTextoOffsetX,
  normalizarTextoOffsetY,
  textoLegendaSeta,
} from "./fotoAnotadaModel.js";

export default function FotoAnotadaImagem({
  foto,
  alt,
  setas = [],
  imagemRef,
  onImagemClick,
  onAtualizarSeta,
  onSelecionarSeta,
  setaAtivaId = "",
  placeholder = "Adicione uma foto para marcar estruturas.",
  containerClassName = "",
  containerStyle,
  frameStyle,
  imagemStyle,
  interactive = false,
  edicaoLegendaInline = false,
  onAtualizarLegendaInline,
}) {
  const frameRef = useRef(null);
  const imagemLocalRef = useRef(null);
  const dragStateRef = useRef(null);
  const labelRefs = useRef(new Map());
  const suprimirCliqueRef = useRef(false);
  const [larguraImagemRenderizada, setLarguraImagemRenderizada] = useState(0);

  useEffect(() => {
    const elemento = imagemLocalRef.current;
    if (!elemento) return undefined;

    const atualizar = () => {
      setLarguraImagemRenderizada(Math.round(elemento.getBoundingClientRect().width) || 0);
    };

    atualizar();

    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(() => atualizar());
    observer.observe(elemento);

    return () => observer.disconnect();
  }, [foto]);

  useEffect(() => {
    if (typeof imagemRef !== "function") return undefined;
    imagemRef(imagemLocalRef.current);
    return () => imagemRef(null);
  }, [imagemRef, foto]);

  useEffect(() => {
    if (!interactive || !dragStateRef.current) return undefined;

    function handlePointerMove(event) {
      const drag = dragStateRef.current;
      if (!drag) return;

      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;
      if (!drag.moveu && (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3)) {
        drag.moveu = true;
        suprimirCliqueRef.current = true;
      }
      const proximoX = drag.initialOffsetX + deltaX;
      const proximoY =
        drag.initialOffsetY +
        (drag.labelHeight > 0 ? (deltaY / drag.labelHeight) * 100 : 0);
      const limitado = limitarTextoNoQuadro({
        frameRect: drag.frameRect,
        seta: drag.seta,
        labelWidth: drag.labelWidth,
        labelHeight: drag.labelHeight,
        textoOffsetX: proximoX,
        textoOffsetY: proximoY,
      });

      onAtualizarSeta?.(drag.seta.id, limitado);
    }

    function handlePointerUp() {
      dragStateRef.current = null;
    }

    function handlePointerCancel() {
      dragStateRef.current = null;
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [interactive, onAtualizarSeta]);

  function handleContainerClick(event) {
    if (suprimirCliqueRef.current) {
      suprimirCliqueRef.current = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onImagemClick?.(event);
  }

  return (
    <div
      className={containerClassName}
      style={containerStyle}
      onClick={handleContainerClick}
    >
      {foto ? (
        <div
          ref={frameRef}
          style={{
            ...imagemFrame,
            ...(interactive ? imagemFrameInterativa : null),
            ...frameStyle,
          }}
        >
          <img
            ref={imagemLocalRef}
            src={foto}
            alt={alt}
            style={{
              ...imagem,
              ...(interactive ? imagemInterativa : null),
              ...imagemStyle,
            }}
          />
          {setas.map((seta) => {
            const texto = textoLegendaSeta(seta);
            const numeroMarcador = seta.referenciaNumero || texto.match(/^\d+/)?.[0] || "";
            const usarMarcadorNumero = seta.marcadorTipo === "numero" && numeroMarcador;
            const marcadorStyle = interactive ? setaMarcador : relatorioSeta;

            if (usarMarcadorNumero) {
              return (
                <span
                  key={seta.id}
                  role={interactive ? "button" : undefined}
                  tabIndex={interactive ? 0 : undefined}
                  aria-label={interactive ? `Selecionar marcador ${numeroMarcador}` : undefined}
                  onClick={
                    interactive
                      ? (event) => {
                          event.stopPropagation();
                          onSelecionarSeta?.(seta);
                        }
                      : undefined
                  }
                  onKeyDown={
                    interactive
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            onSelecionarSeta?.(seta);
                          }
                        }
                      : undefined
                  }
                  style={{
                    ...numeroMarcadorFoto,
                    ...(setaAtivaId === seta.id ? numeroMarcadorFotoAtivo : null),
                    "--marcador-tamanho": `${escalarMedida(
                      28,
                      seta,
                      larguraImagemRenderizada,
                    )}px`,
                    "--marcador-borda": `${Math.max(
                      1,
                      escalarMedida(2, seta, larguraImagemRenderizada),
                    )}px`,
                    "--marcador-fonte": `${escalarMedida(
                      13,
                      seta,
                      larguraImagemRenderizada,
                    )}px`,
                    left: `${seta.x}%`,
                    top: `${seta.y}%`,
                    background: seta.cor,
                  }}
                >
                  {numeroMarcador}
                </span>
              );
            }

            return (
              <span
                key={seta.id}
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? 0 : undefined}
                aria-label={interactive ? `Selecionar seta ${seta.corNome}` : undefined}
                onClick={
                  interactive
                    ? (event) => {
                        event.stopPropagation();
                        onSelecionarSeta?.(seta);
                      }
                    : undefined
                }
                onKeyDown={
                  interactive
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          onSelecionarSeta?.(seta);
                        }
                      }
                    : undefined
                }
                style={{
                  ...marcadorStyle,
                  ...(setaAtivaId === seta.id ? setaMarcadorAtivo : null),
                  "--seta-tamanho": `${escalarMedida(
                    normalizarTamanhoSeta(seta.tamanho),
                    seta,
                    larguraImagemRenderizada,
                  )}px`,
                  "--colchete-largura": `${escalarMedida(
                    normalizarColcheteLargura(seta.colcheteLargura),
                    seta,
                    larguraImagemRenderizada,
                  )}px`,
                  "--seta-rotacao": `${normalizarRotacaoSeta(seta.rotacao)}deg`,
                  "--fonte-tamanho": `${escalarMedida(
                    normalizarFonteSeta(seta.fonteTamanho),
                    seta,
                    larguraImagemRenderizada,
                  )}px`,
                  "--texto-offset-x": `${escalarMedida(
                    normalizarTextoOffsetX(seta.textoOffsetX),
                    seta,
                    larguraImagemRenderizada,
                  )}px`,
                  "--texto-max-width": `${escalarMedida(
                    220,
                    seta,
                    larguraImagemRenderizada,
                  )}px`,
                  "--texto-offset-y": `${normalizarTextoOffsetY(seta.textoOffsetY)}%`,
                  left: `${seta.x}%`,
                  top: `${seta.y}%`,
                  color: seta.cor,
                }}
              >
                <span
                  style={
                    seta.pontaTipo === "colchete" ? setaPontaColchete : setaPonta
                  }
                />
                {texto || (interactive && edicaoLegendaInline && setaAtivaId === seta.id) ? (
                  <span
                    style={{
                      ...setaTextoFoto,
                      ...(setaAtivaId === seta.id ? setaTextoFotoAtivo : null),
                      borderColor: seta.cor,
                      pointerEvents: interactive ? "auto" : "none",
                      cursor: interactive ? "grab" : "default",
                    }}
                    ref={(elemento) => {
                      if (elemento) {
                        labelRefs.current.set(seta.id, elemento);
                      } else {
                        labelRefs.current.delete(seta.id);
                      }
                    }}
                    onClick={
                      interactive
                        ? (event) => {
                            event.stopPropagation();
                            onSelecionarSeta?.(seta);
                          }
                        : undefined
                    }
                    onPointerDown={
                      interactive
                        ? (event) => {
                            event.stopPropagation();
                            const frame = frameRef.current;
                            const label = labelRefs.current.get(seta.id);
                            if (!frame || !label) return;

                            onSelecionarSeta?.(seta);
                            dragStateRef.current = {
                              seta,
                              startX: event.clientX,
                              startY: event.clientY,
                              moveu: false,
                              initialOffsetX: normalizarTextoOffsetX(seta.textoOffsetX),
                              initialOffsetY: normalizarTextoOffsetY(seta.textoOffsetY),
                              frameRect: frame.getBoundingClientRect(),
                              labelWidth: label.offsetWidth,
                              labelHeight: label.offsetHeight,
                            };
                          }
                        : undefined
                    }
                  >
                    {interactive && edicaoLegendaInline && setaAtivaId === seta.id ? (
                      <input
                        type="text"
                        value={seta.legenda || ""}
                        onChange={(event) => onAtualizarLegendaInline?.(seta.id, event.target.value)}
                        onFocus={(event) => event.currentTarget.select()}
                        onKeyDown={(event) => {
                          event.stopPropagation();
                          if (event.key === "Enter") {
                            event.preventDefault();
                            event.currentTarget.blur();
                          }
                          if (event.key === "Escape") {
                            event.preventDefault();
                            event.currentTarget.blur();
                          }
                        }}
                        placeholder={seta.corNome || "Legenda"}
                        maxLength={32}
                        style={{
                          ...setaTextoInput,
                          width: `${Math.max(
                            6,
                            String(seta.legenda || seta.corNome || "Legenda").length + 1,
                          )}ch`,
                        }}
                        onClick={(event) => event.stopPropagation()}
                        onPointerDown={(event) => event.stopPropagation()}
                        autoFocus
                        aria-label={`Legenda da seta ${seta.corNome || ""}`.trim()}
                      />
                    ) : (
                      texto
                    )}
                  </span>
                ) : null}
              </span>
            );
          })}
        </div>
      ) : (
        <div style={placeholderStyle}>{placeholder}</div>
      )}
    </div>
  );
}

function limitarTextoNoQuadro({
  frameRect,
  seta,
  labelWidth,
  labelHeight,
  textoOffsetX,
  textoOffsetY,
}) {
  const offsetXNormalizado = normalizarTextoOffsetX(textoOffsetX);
  const offsetYNormalizado = normalizarTextoOffsetY(textoOffsetY);

  if (!frameRect || !labelWidth || !labelHeight) {
    return {
      textoOffsetX: offsetXNormalizado,
      textoOffsetY: offsetYNormalizado,
    };
  }

  const margem = 4;
  const ancoraX = (frameRect.width * seta.x) / 100;
  const ancoraY = (frameRect.height * seta.y) / 100;
  const offsetYPx = (offsetYNormalizado / 100) * labelHeight;
  const minOffsetX = margem - ancoraX;
  const maxOffsetX = frameRect.width - margem - ancoraX - labelWidth;
  const minOffsetYPx = margem - ancoraY;
  const maxOffsetYPx = frameRect.height - margem - ancoraY - labelHeight;

  const limitadoX = clamp(offsetXNormalizado, minOffsetX, maxOffsetX);
  const limitadoYPx = clamp(offsetYPx, minOffsetYPx, maxOffsetYPx);

  return {
    textoOffsetX: Math.round(limitadoX),
    textoOffsetY: Math.round((limitadoYPx / labelHeight) * 100),
  };
}

function clamp(valor, min, max) {
  if (min > max) return valor;
  return Math.max(min, Math.min(max, valor));
}

function escalarMedida(valorBase, seta, larguraImagemRenderizada) {
  const numeroBase = Number(valorBase);
  if (!Number.isFinite(numeroBase)) return valorBase;

  const larguraReferencia =
    Number.isFinite(Number(seta?.larguraReferencia)) && Number(seta?.larguraReferencia) > 0
      ? Number(seta.larguraReferencia)
      : 320;
  const larguraAtual = Number(larguraImagemRenderizada) || larguraReferencia;
  const escala = clamp(larguraAtual / larguraReferencia, 0.55, 2.2);

  return Math.round(numeroBase * escala * 10) / 10;
}

const imagemFrame = {
  position: "relative",
  maxWidth: "100%",
};

const imagemFrameInterativa = {
  cursor: "crosshair",
  touchAction: "none",
};

const imagem = {
  display: "block",
  width: "100%",
  maxHeight: 560,
  objectFit: "contain",
  borderRadius: 12,
};

const imagemInterativa = {
  maxHeight: "none",
};

const setaMarcador = {
  position: "absolute",
  width: "var(--seta-tamanho, 58px)",
  height: 0,
  borderTop: "3px solid currentColor",
  transform:
    "translate(calc(-1 * var(--seta-tamanho, 58px)), -1.5px) rotate(var(--seta-rotacao, 0deg))",
  transformOrigin: "right center",
  pointerEvents: "auto",
  cursor: "pointer",
  filter: "drop-shadow(0 1px 1px color-mix(in srgb, var(--color-text) 14%, transparent))",
};

const relatorioSeta = {
  ...setaMarcador,
  pointerEvents: "none",
  cursor: "default",
};

const setaMarcadorAtivo = {
  filter:
    "drop-shadow(0 0 0.5px currentColor) drop-shadow(0 0 6px color-mix(in srgb, currentColor 38%, transparent))",
  zIndex: 3,
};

const setaTextoFoto = {
  position: "absolute",
  left: 0,
  top: 0,
  width: "max-content",
  maxWidth: "var(--texto-max-width, 220px)",
  transform:
    "translate(var(--texto-offset-x, 6px), var(--texto-offset-y, -50%)) rotate(calc(-1 * var(--seta-rotacao, 0deg)))",
  transformOrigin: "left center",
  padding: "3px 8px",
  border: "1px solid",
  borderRadius: 999,
  background: "color-mix(in srgb, var(--color-surface) 94%, transparent)",
  boxShadow:
    "0 6px 18px color-mix(in srgb, var(--color-text) 12%, transparent), inset 0 1px 0 color-mix(in srgb, white 65%, transparent)",
  color: "var(--color-text)",
  fontSize: "var(--fonte-tamanho, 12px)",
  fontWeight: 700,
  lineHeight: 1.15,
  letterSpacing: 0,
  pointerEvents: "none",
  zIndex: 2,
  overflowWrap: "break-word",
  wordBreak: "normal",
  hyphens: "none",
  backdropFilter: "blur(6px)",
  userSelect: "none",
};

const setaTextoInput = {
  width: "100%",
  minWidth: "8ch",
  padding: 0,
  margin: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  color: "inherit",
  font: "inherit",
  lineHeight: "inherit",
};

const setaTextoFotoAtivo = {
  zIndex: 4,
  boxShadow:
    "0 0 0 2px color-mix(in srgb, var(--color-primary) 18%, transparent), 0 8px 20px color-mix(in srgb, var(--color-text) 16%, transparent), inset 0 1px 0 color-mix(in srgb, white 65%, transparent)",
};

const setaPonta = {
  position: "absolute",
  right: -1,
  top: -6,
  width: 0,
  height: 0,
  borderLeft: "11px solid currentColor",
  borderTop: "5px solid transparent",
  borderBottom: "5px solid transparent",
};

const setaPontaColchete = {
  position: "absolute",
  right: -1,
  top: "calc(var(--colchete-largura, 20px) / -2)",
  width: 14,
  height: "var(--colchete-largura, 20px)",
  borderRight: "3px solid currentColor",
  borderTop: "3px solid currentColor",
  borderBottom: "3px solid currentColor",
  borderTopRightRadius: 3,
  borderBottomRightRadius: 3,
};

const numeroMarcadorFoto = {
  position: "absolute",
  width: "var(--marcador-tamanho, 28px)",
  height: "var(--marcador-tamanho, 28px)",
  transform: "translate(-50%, -50%)",
  display: "grid",
  placeItems: "center",
  borderRadius: 999,
  border: "var(--marcador-borda, 2px) solid var(--color-surface)",
  color: "white",
  fontSize: "var(--marcador-fonte, 13px)",
  fontWeight: 950,
  lineHeight: 1,
  boxShadow: "0 6px 14px color-mix(in srgb, var(--color-text) 18%, transparent)",
  pointerEvents: "auto",
  cursor: "pointer",
  zIndex: 2,
};

const numeroMarcadorFotoAtivo = {
  transform: "translate(-50%, -50%) scale(1.14)",
  boxShadow:
    "0 0 0 4px color-mix(in srgb, var(--color-primary) 20%, transparent), 0 6px 14px color-mix(in srgb, var(--color-text) 18%, transparent)",
};

const placeholderStyle = {
  padding: 18,
  color: "var(--color-muted)",
  fontWeight: 800,
  textAlign: "center",
};
