import { useMemo, useState } from "react";

function buildCandidates(fig) {
  const bases = [`/figuras/${fig}`, `/figuras/${fig.toLowerCase()}`];
  const exts = [".png", ".jpg", ".jpeg", ".webp", ".svg"];

  const urls = [];
  for (const base of bases) {
    for (const ext of exts) {
      urls.push(`${base}${ext}`);
    }
  }

  return urls;
}

function FigureButton({ fig, onOpen }) {
  const candidates = useMemo(() => buildCandidates(fig), [fig]);

  return (
    <button
      type="button"
      style={figureButton}
      onClick={() => onOpen({ fig, candidates })}
      title={`Abrir ${fig}`}
    >
      <span style={figureButtonBadge}>Imagem</span>
      <span style={figureButtonText}>{fig}</span>
    </button>
  );
}

function FigureModal({ zoomed, onClose }) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [missing, setMissing] = useState(false);
  const currentSrc = zoomed.candidates[candidateIndex];

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(event) => event.stopPropagation()}>
        <div style={modalHeader}>
          <div>
            <div style={modalKicker}>Figura ampliada</div>
            <div style={modalTitle}>{zoomed.fig}</div>
          </div>

          <button
            type="button"
            className="btn btn--secondary btn--compact"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>

        <div style={modalImageWrap}>
          {missing ? (
            <div style={missingState}>
              <div style={missingMark}>?</div>
              <div>Figura não encontrada</div>
            </div>
          ) : (
            <img
              src={currentSrc}
              alt={zoomed.fig}
              style={modalImage}
              onError={() => {
                const next = candidateIndex + 1;
                if (next < zoomed.candidates.length) {
                  setCandidateIndex(next);
                } else {
                  setMissing(true);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function FigureStrip({ figs }) {
  const [zoomed, setZoomed] = useState(null);

  if (!figs || figs.length === 0) return null;

  return (
    <>
      <div style={buttonGroup}>
        {figs.map((fig) => (
          <FigureButton key={fig} fig={fig} onOpen={setZoomed} />
        ))}
      </div>

      {zoomed ? (
        <FigureModal zoomed={zoomed} onClose={() => setZoomed(null)} />
      ) : null}
    </>
  );
}

const buttonGroup = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 8,
  marginTop: 10,
};

const figureButton = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  minHeight: 38,
  maxWidth: "100%",
  padding: "7px 10px",
  border: "1px solid var(--color-border)",
  borderRadius: 999,
  background: "var(--color-surface)",
  color: "var(--color-primary)",
  boxShadow: "var(--shadow-sm)",
  cursor: "pointer",
  fontWeight: 800,
};

const figureButtonBadge = {
  padding: "4px 7px",
  borderRadius: 999,
  background: "var(--color-bg-soft)",
  color: "var(--color-primary)",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const figureButtonText = {
  minWidth: 0,
  overflowWrap: "anywhere",
  fontSize: 13,
};

const overlay = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  display: "grid",
  placeItems: "center",
  padding: 18,
  background: "var(--color-overlay)",
};

const modal = {
  width: "min(980px, 96vw)",
  maxHeight: "92vh",
  margin: "auto",
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
  padding: "14px 16px",
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
  fontSize: 18,
  fontWeight: 850,
};

const modalImageWrap = {
  display: "grid",
  placeItems: "center",
  justifyItems: "center",
  alignItems: "center",
  maxHeight: "calc(92vh - 76px)",
  padding: 16,
  background: "var(--color-surface-soft)",
};

const modalImage = {
  display: "block",
  width: "auto",
  height: "auto",
  maxWidth: "100%",
  maxHeight: "calc(92vh - 108px)",
  margin: "0 auto",
  objectFit: "contain",
  objectPosition: "center",
};

const missingState = {
  display: "grid",
  placeItems: "center",
  gap: 10,
  minHeight: 260,
  color: "var(--color-muted)",
  fontWeight: 800,
};

const missingMark = {
  display: "grid",
  placeItems: "center",
  width: 52,
  height: 52,
  borderRadius: 999,
  background: "var(--color-warning-soft)",
  color: "var(--color-warning)",
  border: "1px solid var(--color-warning-border)",
  fontSize: 24,
  fontWeight: 900,
};
