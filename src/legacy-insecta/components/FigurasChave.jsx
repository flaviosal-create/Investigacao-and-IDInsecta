import { useState } from "react";
import { imagens } from "../data/imagens";

export default function FigurasChave({ figs = [] }) {
  const [ampliada, setAmpliada] = useState(null);

  if (!figs || figs.length === 0) return null;

  return (
    <>
      <div style={container}>
        {figs.map((id) => {
          const img = imagens[id];

          if (!img) {
            return (
              <div key={id} style={fallback}>
                {id} não encontrada
              </div>
            );
          }

          return (
            <button
              key={id}
              type="button"
              style={card}
              onClick={() => setAmpliada({ id, ...img })}
              aria-label={`Ampliar figura ${img.legenda || id}`}
              title="Ampliar figura"
            >
              <img
                src={img.src}
                alt={img.legenda || id}
                style={imagem}
                loading="lazy"
              />
              <span aria-hidden="true" style={zoomBadge}>
                +
              </span>
            </button>
          );
        })}
      </div>

      {ampliada ? (
        <FiguraAmpliada figura={ampliada} onClose={() => setAmpliada(null)} />
      ) : null}
    </>
  );
}

function FiguraAmpliada({ figura, onClose }) {
  const [zoom, setZoom] = useState(1);

  const ajustarZoom = (delta) => {
    setZoom((valor) => Math.min(3, Math.max(0.75, Number((valor + delta).toFixed(2)))));
  };

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(event) => event.stopPropagation()}>
        <div style={modalHeader}>
          <div>
            <div style={modalKicker}>Figura ampliada</div>
            <div style={modalTitle}>{figura.legenda || figura.id}</div>
          </div>

          <button
            type="button"
            className="btn btn--secondary btn--compact"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>

        <div style={zoomToolbar}>
          <button
            type="button"
            style={zoomButton}
            onClick={() => ajustarZoom(-0.25)}
            aria-label="Diminuir zoom da figura"
          >
            -
          </button>
          <button
            type="button"
            style={zoomValue}
            onClick={() => setZoom(1)}
            aria-label="Voltar zoom da figura para 100%"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            style={zoomButton}
            onClick={() => ajustarZoom(0.25)}
            aria-label="Aumentar zoom da figura"
          >
            +
          </button>
        </div>

        <div style={modalImageWrap}>
          <img
            src={figura.src}
            alt={figura.legenda || figura.id}
            style={{
              ...modalImage,
              width: zoom > 1 ? `${zoom * 100}%` : "auto",
              maxWidth: zoom > 1 ? "none" : "100%",
              maxHeight: zoom > 1 ? "none" : "calc(94vh - 112px)",
              cursor: zoom > 1 ? "zoom-out" : "zoom-in",
            }}
            onClick={() => setZoom((valor) => (valor > 1 ? 1 : 1.75))}
          />
        </div>
      </div>
    </div>
  );
}

// ====================== estilos ======================

const container = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "stretch",
  width: "100%",
  marginTop: 6
};

const card = {
  position: "relative",
  width: "min(190px, 100%)",
  padding: 0,
  borderRadius: 10,
  overflow: "hidden",
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
  margin: "0 auto",
  cursor: "zoom-in",
  boxShadow: "none"
};

const imagem = {
  display: "block",
  width: "100%",
  height: 110,
  objectFit: "contain",
  objectPosition: "center",
  background: "var(--color-bg-soft)"
};

const zoomBadge = {
  position: "absolute",
  right: 6,
  bottom: 6,
  display: "grid",
  placeItems: "center",
  width: 24,
  height: 24,
  borderRadius: 999,
  background: "var(--color-surface)",
  color: "var(--color-primary)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-sm)",
  fontSize: 18,
  fontWeight: 900,
  lineHeight: 1
};

const fallback = {
  padding: 10,
  borderRadius: 10,
  background: "var(--color-warning-soft)",
  border: "1px solid var(--color-warning-border)",
  color: "var(--color-warning-text)",
  fontSize: 12
};

const overlay = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  display: "grid",
  placeItems: "center",
  padding: 14,
  background: "var(--color-overlay)",
};

const modal = {
  position: "relative",
  width: "min(1040px, 96vw)",
  maxHeight: "94vh",
  overflow: "hidden",
  borderRadius: 18,
  background: "var(--color-surface)",
  boxShadow: "0 28px 90px rgba(0, 0, 0, 0.36)",
};

const modalHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "12px 14px",
  borderBottom: "1px solid var(--color-border)",
};

const modalKicker = {
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 850,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
};

const modalTitle = {
  color: "var(--color-text)",
  fontSize: 16,
  fontWeight: 850,
};

const zoomToolbar = {
  position: "absolute",
  top: 72,
  right: 18,
  zIndex: 2,
  display: "inline-flex",
  alignItems: "center",
  gap: 3,
  padding: 4,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "color-mix(in srgb, var(--color-surface) 92%, transparent)",
  boxShadow: "var(--shadow-md)",
};

const zoomButton = {
  display: "grid",
  placeItems: "center",
  width: 34,
  height: 34,
  borderRadius: 9,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  fontSize: 20,
  fontWeight: 900,
  cursor: "pointer",
};

const zoomValue = {
  minWidth: 54,
  height: 34,
  borderRadius: 9,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  fontSize: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const modalImageWrap = {
  display: "grid",
  placeItems: "center",
  maxHeight: "calc(94vh - 64px)",
  minHeight: "min(70vh, 680px)",
  padding: 16,
  overflow: "auto",
  background: "var(--color-surface-soft)",
};

const modalImage = {
  display: "block",
  maxWidth: "100%",
  maxHeight: "calc(94vh - 112px)",
  transition: "width 160ms ease, max-width 160ms ease",
  objectFit: "contain",
  objectPosition: "center",
};
