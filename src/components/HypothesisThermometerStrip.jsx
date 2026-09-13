import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HypothesisConflictsDialog } from "./HypothesisConflictsDialog.jsx";
import {
  formatNumber,
  formatStructure,
  formatValue,
} from "../utils/presentation.js";

import { getThermometerScale, getThermometerFill } from "../utils/hypothesisThermometer.js";

function getFillClass(hypothesis) {
  const level =
    (hypothesis.assessment ?? hypothesis.confidence)?.level;

  if (level === "bem_sustentada") {
    return "is-strong";
  }

  if (level === "parcial") {
    return "is-warning";
  }

  if (level === "com_conflitos") {
    return "is-danger";
  }

  return "is-developing";
}

function InsectThermometerIcon({
  hypothesis,
  fillPercent,
}) {
  const clipId = `insect-fill-${hypothesis.id}`;
  const fillHeight =
    (fillPercent / 100) * 88;
  const fillY = 92 - fillHeight;

  return (
    <svg
      className="insect-thermometer-icon"
      viewBox="0 0 64 96"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <ellipse cx="32" cy="48" rx="13" ry="25" />
          <ellipse cx="16" cy="45" rx="10" ry="27" />
          <ellipse cx="48" cy="45" rx="10" ry="27" />
          <circle cx="32" cy="17" r="9" />
          <ellipse cx="32" cy="77" rx="10" ry="14" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect
          className="insect-thermometer-fill"
          x="4"
          y={fillY}
          width="56"
          height={fillHeight}
        />
      </g>

      <ellipse cx="32" cy="48" rx="13" ry="25" />
      <ellipse cx="16" cy="45" rx="10" ry="27" />
      <ellipse cx="48" cy="45" rx="10" ry="27" />
      <circle cx="32" cy="17" r="9" />
      <ellipse cx="32" cy="77" rx="10" ry="14" />
      <path d="M26 11 17 2" />
      <path d="M38 11 47 2" />
      <path d="M19 67 7 83" />
      <path d="M45 67 57 83" />
    </svg>
  );
}

function GenericThermometerIcon({
  hypothesis,
  fillPercent,
}) {
  const fillHeight =
    (fillPercent / 100) * 48;
  const fillY = 66 - fillHeight;

  return (
    <svg
      className="generic-thermometer-icon"
      viewBox="0 0 40 76"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={`generic-fill-${hypothesis.id}`}>
          <rect x="15" y="8" width="10" height="52" rx="5" />
          <circle cx="20" cy="62" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#generic-fill-${hypothesis.id})`}>
        <rect
          className="generic-thermometer-fill"
          x="6"
          y={fillY}
          width="28"
          height={fillHeight + 12}
        />
      </g>
      <rect x="15" y="8" width="10" height="52" rx="5" />
      <circle cx="20" cy="62" r="12" />
    </svg>
  );
}

function HypothesisThermometerFigure({
  hypothesis,
  fillPercent,
  hasOrderImage,
}) {
  const [
    didImageFail,
    setDidImageFail,
  ] = useState(false);
  const imageSrc =
    `/assets/zoologia/ordens/${hypothesis.id}.jpg`;

  if (!hasOrderImage) {
    return (
      <div
        className="order-figure-frame generic-figure-frame"
        style={{
          "--order-fill": `${fillPercent}%`,
        }}
      >
        <GenericThermometerIcon
          hypothesis={hypothesis}
          fillPercent={fillPercent}
        />
      </div>
    );
  }

  if (didImageFail) {
    return (
      <div
        className="order-figure-frame"
        style={{
          "--order-fill": `${fillPercent}%`,
        }}
      >
        <InsectThermometerIcon
          hypothesis={hypothesis}
          fillPercent={fillPercent}
        />
      </div>
    );
  }

  return (
    <div
      className="order-figure-frame"
      style={{
        "--order-fill": `${fillPercent}%`,
      }}
    >
      <div className="order-image-thermometer">
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          onError={() => {
            setDidImageFail(true);
          }}
        />
      </div>
    </div>
  );
}

function MobileHypothesisDialog({
  item,
  selectedProtocol,
  onDismiss,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
  }, []);

  function closeDialog() {
    dialogRef.current?.close();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="mobile-hypotheses-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClose={onDismiss}
    >
      <header className="mobile-hypotheses-dialog-header">
        <div>
          <span>Leitura da hipótese</span>
          <h2 id={titleId}>{item.hypothesis.name}</h2>
        </div>
        <button type="button" className="secondary-button" onClick={closeDialog}>
          Fechar
        </button>
      </header>
      <div className="mobile-hypothesis-reading">
        <HypothesisThermometerFigure
          hypothesis={item.hypothesis}
          fillPercent={item.fillPercent}
          hasOrderImage={selectedProtocol?.id === "ordens-insecta-v1"}
        />
        <div>
          <p><b>Saldo:</b> {formatNumber(item.hypothesis.score)}</p>
          <p><b>Sustentação:</b> {(item.hypothesis.assessment ?? item.hypothesis.confidence).label}</p>
          <p><b>Comparação:</b> {item.hypothesis.comparison?.label ?? "Em comparação"}</p>
          {item.hypothesis.comparison?.detail && <p>{item.hypothesis.comparison.detail}</p>}
          <p>{new Set(item.hypothesis.evidences.map((evidence) => evidence.structure)).size} estruturas favoráveis · {item.hypothesis.conflicts.length === 0 ? "nenhum conflito" : `${item.hypothesis.conflicts.length} conflito(s)`}</p>
          {item.hypothesis.conflicts.length > 0 && (
            <details className="mobile-hypothesis-conflicts">
              <summary>Ver conflitos</summary>
              <ul>
                {item.hypothesis.conflicts.map((conflict) => (
                  <li key={`${conflict.structure}:${conflict.value}`}>
                    {formatStructure(conflict.structure)}: {formatValue(conflict.value)}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </div>
    </dialog>,
    document.body
  );
}

export function HypothesisThermometerStrip({
  selectedProtocol,
  investigation,
}) {
  const [conflictHypothesisId, setConflictHypothesisId] = useState(null);
  const [mobileHypothesisId, setMobileHypothesisId] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const hypotheses =
    investigation?.hypotheses ?? [];

  const conflictHypothesis = hypotheses.find((hypothesis) => hypothesis.id === conflictHypothesisId);
  const scoreScale = useMemo(() => getThermometerScale(selectedProtocol), [selectedProtocol]);

  if (hypotheses.length === 0) {
    return null;
  }

  const visibleHypotheses =
    hypotheses
      .map((hypothesis) => ({
        hypothesis,
        fillPercent: getThermometerFill(hypothesis.score, scoreScale),
      }))
      .filter(
        (item) =>
          item.hypothesis.evidences.length > 0 ||
          item.hypothesis.conflicts.length > 0
      );

  if (visibleHypotheses.length === 0) {
    return null;
  }

  const mobileHypothesis = visibleHypotheses.find(
    ({ hypothesis }) => hypothesis.id === mobileHypothesisId
  );

  return (
    <>
      <aside className="mobile-hypotheses-strip" aria-label="Hipóteses avaliadas">
        {visibleHypotheses.map(({ hypothesis, fillPercent }) => (
          <button
            key={hypothesis.id}
            type="button"
            className={`mobile-hypothesis-button ${getFillClass(hypothesis)}`}
            aria-label={`Abrir leitura de ${hypothesis.name}`}
            onClick={() => setMobileHypothesisId(hypothesis.id)}
          >
            <HypothesisThermometerFigure
              hypothesis={hypothesis}
              fillPercent={fillPercent}
              hasOrderImage={selectedProtocol?.id === "ordens-insecta-v1"}
            />
          </button>
        ))}
      </aside>
      <aside
        className={`hypothesis-thermometer-panel ${
          isCollapsed ? "is-collapsed" : ""
        }`}
        aria-label="Avaliação das hipóteses"
      >
      <div
        className="thermometer-panel-header"
      >
        <div className="thermometer-title">
          <span
            className="thermometer-symbol"
            aria-hidden="true"
          >
            🌡
          </span>
          <div className="thermometer-title-copy">
            <strong>Hipóteses</strong>
            <span>
              {visibleHypotheses.length} hipóteses avaliadas
            </span>
            <small>
              Sustentação: evidências e conflitos. Comparação: posição no grupo. Pontos não são probabilidade.
            </small>
          </div>
        </div>
        <button
          type="button"
          className="thermometer-toggle"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? "Mostrar sustentação das hipóteses" : "Recolher sustentação das hipóteses"}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => setIsCollapsed((current) => !current)}
        >
          {isCollapsed ? "+" : "−"}
        </button>
      </div>

      <div className="thermometer-strip" aria-hidden={isCollapsed}>
        {visibleHypotheses.map((item) => {
          const { hypothesis, fillPercent } =
            item;
          const assessment =
            hypothesis.assessment ?? hypothesis.confidence;
          const comparison = hypothesis.comparison;
          const evidenceCount = new Set(
            hypothesis.evidences.map((evidence) => evidence.structure)
          ).size;
          return (
            <article
              key={hypothesis.id}
              className={`thermometer-order ${getFillClass(
                hypothesis
              )} ${hypothesis.isLeader ? "is-leading" : ""}`}
              title={`${hypothesis.name}: sustentação ${formatNumber(
                hypothesis.score
              )}`}
            >
              <HypothesisThermometerFigure
                hypothesis={hypothesis}
                fillPercent={fillPercent}
                hasOrderImage={
                  selectedProtocol?.id ===
                    "ordens-insecta-v1"
                }
              />
              <div className="thermometer-order-copy">
                <div className="thermometer-order-heading">
                  <strong>{hypothesis.name}</strong>
                  <span className="thermometer-percent">
                    Saldo: {formatNumber(hypothesis.score)}
                  </span>
                </div>
                <div className="thermometer-readings">
                  <span>Sustentação</span>
                  <strong className="thermometer-assessment">
                    {assessment.label}
                  </strong>
                  <span>Comparação</span>
                  <strong className="thermometer-comparison">
                    {comparison?.label ?? "Em comparação"}
                  </strong>
                </div>
                {comparison?.detail && (
                  <span className="thermometer-comparison-detail">
                    {comparison.detail}
                  </span>
                )}
                <span className="thermometer-evidence-summary">
                  {evidenceCount} {evidenceCount === 1 ? "estrutura favorável" : "estruturas favoráveis"}
                </span>
                {hypothesis.conflicts.length > 0 ? (
                  <button
                    type="button"
                    className="thermometer-conflicts-button"
                    aria-haspopup="dialog"
                    aria-label={`Ver ${hypothesis.conflicts.length} conflito(s) de ${hypothesis.name}`}
                    onClick={() => setConflictHypothesisId(hypothesis.id)}
                  >
                    Ver {hypothesis.conflicts.length} conflito(s)
                  </button>
                ) : (
                  <span className="thermometer-status">Conflitos: nenhum</span>
                )}
                <span className="thermometer-progress" aria-hidden="true">
                  <span style={{ width: `${fillPercent}%` }} />
                </span>
              </div>
            </article>
          );
        })}
      </div>
      </aside>
      {conflictHypothesis && (
        <HypothesisConflictsDialog
          hypothesis={conflictHypothesis}
          protocol={selectedProtocol}
          onDismiss={() => setConflictHypothesisId(null)}
        />
      )}
      {mobileHypothesis && (
        <MobileHypothesisDialog
          item={mobileHypothesis}
          selectedProtocol={selectedProtocol}
          onDismiss={() => setMobileHypothesisId(null)}
        />
      )}
    </>
  );
}
