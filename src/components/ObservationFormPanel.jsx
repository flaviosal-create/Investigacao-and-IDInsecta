import {
  formatStructure,
  formatValue,
} from "../utils/presentation.js";
import { useEffect, useState } from "react";
import { Panel } from "./ui/Panel.jsx";
import { PanelHeader } from "./ui/PanelHeader.jsx";

export function ObservationFormPanel({
  selectedProtocol,
  activeObservationMap,
  observationRefs,
  onReset,
  onRegisterObservation,
  onUnregisterObservation,
}) {
  const observations =
    selectedProtocol?.observations ?? [];
  const [openStructure, setOpenStructure] =
    useState(observations[0]?.structure ?? null);
  const [failedImages, setFailedImages] =
    useState(() => new Set());
  const [statusMessage, setStatusMessage] =
    useState("");
  const hasObservations = activeObservationMap.size > 0;

  useEffect(() => {
    setOpenStructure(observations[0]?.structure ?? null);
  }, [selectedProtocol?.id]);

  function handleReset() {
    if (
      hasObservations &&
      window.confirm(
        "Reiniciar a investigação? Todas as observações atuais serão removidas."
      )
    ) {
      onReset();
      setStatusMessage("Investigação reiniciada. Nenhuma observação está registrada.");
    }
  }

  return (
    <Panel className="investigation-panel">
      <PanelHeader
        title="Investigar"
        description={
          observations.length
            ? `${observations.length} estruturas observáveis disponíveis para sustentar ou enfraquecer hipóteses.`
            : "Registre observações e acompanhe como elas reordenam as hipóteses."
        }
        actions={
          <button
            className="secondary-button"
            type="button"
            onClick={handleReset}
            disabled={!hasObservations}
          >
            Reiniciar
          </button>
        }
      />

      <p
        className="investigation-progress"
        aria-live="polite"
      >
        {activeObservationMap.size} de {observations.length} características observadas
      </p>
      <p className="screen-reader-only" aria-live="polite">
        {statusMessage}
      </p>

      <div className="observation-grid">
        {observations.map(
          (observation) => {
            const activeValue =
              activeObservationMap.get(
                observation.structure
              );
            const activeVisualExample =
              observation.visualExamples?.[
                activeValue
              ];
            const imageKey =
              activeVisualExample?.src ?? "";
            const imageFailed =
              imageKey && failedImages.has(imageKey);

            return (
              <article
                key={observation.structure}
                className={`observation-card ${
                  openStructure ===
                  observation.structure
                    ? "is-open"
                    : "is-collapsed"
                }`}
                ref={(element) => {
                  if (element) {
                    observationRefs.current.set(
                      observation.structure,
                      element
                    );
                  }
                }}
              >
                <button
                  type="button"
                  className="observation-card-toggle"
                  aria-expanded={
                    openStructure ===
                    observation.structure
                  }
                  onClick={() => {
                    setOpenStructure((current) =>
                      current === observation.structure
                        ? null
                        : observation.structure
                    );
                  }}
                >
                  <span className="observation-card-title">
                    <span className="observation-card-heading">
                      {observation.label}
                    </span>
                    <span className="hint">
                      {formatStructure(
                        observation.structure
                      )}
                    </span>
                    <span className="card-explainer">
                      Escolha o valor que melhor
                      descreve o que foi observado.
                    </span>
                  </span>
                  <span
                    className="observation-card-toggle-state"
                    aria-hidden="true"
                  >
                    {openStructure ===
                    observation.structure
                      ? "Fechar"
                      : "Abrir"}
                  </span>
                </button>

                <div className="observation-card-content">
                  <div
                    className="visual-card-frame"
                    role="img"
                    aria-label={
                      activeVisualExample
                        ? `Imagem de apoio para ${observation.label}`
                        : `Espaço reservado para imagem de apoio de ${observation.label}`
                    }
                  >
                    {activeVisualExample && !imageFailed ? (
                      <img
                        src={activeVisualExample.src}
                        alt={activeVisualExample.alt}
                        loading="lazy"
                        decoding="async"
                        onError={() => {
                          setFailedImages((current) =>
                            new Set(current).add(imageKey)
                          );
                        }}
                      />
                    ) : (
                      <div className="visual-preview-empty">
                        <span
                          className="visual-preview-placeholder"
                          aria-hidden="true"
                        >
                          {imageFailed ? "!" : "?"}
                        </span>
                        <span>
                          {imageFailed
                            ? "Imagem indisponível"
                            : "Imagem de apoio"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    className="option-grid"
                    role="group"
                    aria-label={`Opções para ${observation.label}`}
                  >
                    {observation.values.map(
                      (value) => {
                        const isActive =
                          activeValue === value;

                        return (
                          <button
                            key={value}
                            type="button"
                            className={`option-button ${
                              isActive
                                ? "is-active"
                                : ""
                            }`}
                            aria-pressed={
                              isActive
                            }
                            onClick={() => {
                              if (isActive) {
                                onUnregisterObservation(
                                  observation.structure
                                );
                                setStatusMessage(
                                  `${observation.label}: ${formatValue(value)} removido. As hipóteses foram atualizadas.`
                                );
                                return;
                              }

                              onRegisterObservation({
                                structure:
                                  observation.structure,
                                value,
                              });
                              setStatusMessage(
                                `${observation.label}: ${formatValue(value)} registrado. As hipóteses foram atualizadas.`
                              );
                            }}
                          >
                            {formatValue(value)}
                          </button>
                        );
                      }
                    )}
                  </div>
                  {activeValue ? (
                    <button
                      className="clear-observation-button"
                      type="button"
                      onClick={() => {
                        onUnregisterObservation(
                          observation.structure
                        );
                        setStatusMessage(
                          `${observation.label}: observação removida. As hipóteses foram atualizadas.`
                        );
                      }}
                    >
                      Limpar característica
                    </button>
                  ) : null}
                </div>
              </article>
            );
          }
        )}
      </div>
    </Panel>
  );
}
