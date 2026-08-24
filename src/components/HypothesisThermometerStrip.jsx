import {
  useEffect,
  useState,
} from "react";
import { formatNumber } from "../utils/presentation.js";

function getFillPercent(
  hypothesis,
  maxScore
) {
  if (maxScore <= 0) {
    return 0;
  }

  return Math.round(
    (Math.max(0, hypothesis.score) /
      maxScore) *
      100
  );
}

function getFillClass(hypothesis) {
  const level =
    hypothesis.confidence?.level;

  if (level === "bem_sustentada") {
    return "is-strong";
  }

  if (level === "disputada") {
    return "is-warning";
  }

  if (level === "contraditoria") {
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

export function HypothesisThermometerStrip({
  selectedProtocol,
  investigation,
}) {
  const [isCollapsed, setIsCollapsed] = useState(
    () =>
      typeof window !== "undefined" &&
      window.innerWidth <= 720
  );

  useEffect(() => {
    function collapseForSmallViewport() {
      if (window.innerWidth <= 720) {
        setIsCollapsed(true);
      }
    }

    window.addEventListener(
      "resize",
      collapseForSmallViewport
    );

    collapseForSmallViewport();

    return () => {
      window.removeEventListener(
        "resize",
        collapseForSmallViewport
      );
    };
  }, []);
  const hypotheses =
    investigation?.hypotheses ?? [];

  if (hypotheses.length === 0) {
    return null;
  }

  const maxScore = Math.max(
    ...hypotheses.map((hypothesis) =>
      Math.max(0, hypothesis.score)
    ),
    0
  );

  const visibleHypotheses =
    hypotheses
      .map((hypothesis) => ({
        hypothesis,
        fillPercent: getFillPercent(
          hypothesis,
          maxScore
        ),
      }))
      .filter(
        (item) => item.fillPercent > 0
      );

  if (visibleHypotheses.length === 0) {
    return null;
  }

  return (
    <aside
      className={`hypothesis-thermometer-panel ${
        isCollapsed ? "is-collapsed" : ""
      }`}
      aria-label="Sustentação relativa das hipóteses"
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
              Sustentação relativa · {visibleHypotheses.length} hipóteses
            </span>
            <small>
              A barra compara a força atual entre as hipóteses.
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
          return (
            <article
              key={hypothesis.id}
              className={`thermometer-order ${getFillClass(
                hypothesis
              )} ${hypothesis.rank === 1 ? "is-leading" : ""}`}
              title={`${hypothesis.name}: score ${formatNumber(
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
                    {fillPercent}% relativo
                  </span>
                </div>
                <span className="thermometer-status">
                  #{hypothesis.rank} · {hypothesis.confidence.label}
                </span>
                <span className="thermometer-progress" aria-hidden="true">
                  <span style={{ width: `${fillPercent}%` }} />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}
