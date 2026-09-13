import {
  formatStructure,
  formatValue,
} from "../utils/presentation.js";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState } from "react";
import { Panel } from "./ui/Panel.jsx";
import { PanelHeader } from "./ui/PanelHeader.jsx";

function ObservationDetailsDialog({
  observation,
  activeValue,
  isFinalized,
  onRegisterObservation,
  onUnregisterObservation,
  onDismiss,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const activeVisualExample = observation.visualExamples?.[activeValue];

  useEffect(() => {
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }, []);

  function closeDialog() {
    dialogRef.current?.close();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="observation-details-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClose={onDismiss}
    >
      <header className="observation-details-header">
        <div>
          <span>Característica observável</span>
          <h2 id={titleId}>{observation.label}</h2>
        </div>
        <button type="button" className="secondary-button" onClick={closeDialog}>
          Fechar
        </button>
      </header>
      {activeVisualExample ? (
        <div className="observation-details-visual">
          <img src={activeVisualExample.src} alt={activeVisualExample.alt} />
        </div>
      ) : null}
      <div className="observation-details-options" role="group" aria-label={`Opções para ${observation.label}`}>
        {observation.values.map((value) => {
          const isActive = activeValue === value;
          return (
            <button
              key={value}
              type="button"
              className={`option-button ${isActive ? "is-active" : ""}`}
              aria-pressed={isActive}
              disabled={isFinalized}
              onClick={() => {
                if (isActive) onUnregisterObservation(observation.structure);
                else onRegisterObservation({ structure: observation.structure, value });
              }}
            >
              {formatValue(value)}
            </button>
          );
        })}
      </div>
    </dialog>,
    document.body
  );
}

export function ObservationFormPanel({
  selectedProtocol,
  activeObservationMap,
  observationRefs,
  onReset,
  onRegisterObservation,
  onUnregisterObservation,
  isFinalized = false,
}) {
  const observations =
    selectedProtocol?.observations ?? [];
  const [openStructure, setOpenStructure] =
    useState(observations[0]?.structure ?? null);
  const [failedImages, setFailedImages] =
    useState(() => new Set());
  const [statusMessage, setStatusMessage] =
    useState("");
  const [mobileObservationStructure, setMobileObservationStructure] =
    useState(null);
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

  function toggleObservation(observation) {
    if (window.innerWidth <= 720) {
      setMobileObservationStructure(observation.structure);
      return;
    }
    setOpenStructure((current) =>
      current === observation.structure ? null : observation.structure
    );
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
            disabled={!hasObservations || isFinalized}
          >
            Reiniciar
          </button>
        }
      />

      {isFinalized ? (
        <p className="investigation-finalized-notice" role="status">
          Investigação encerrada pelo aluno. Reabra o relatório para registrar
          novas observações.
        </p>
      ) : null}

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
                  onClick={() => toggleObservation(observation)}
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
                  </span>
                  {activeVisualExample ? (
                    <span className="observation-card-selection-thumb" aria-hidden="true">
                      <img
                        src={activeVisualExample.src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                  ) : null}
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
                            disabled={isFinalized}
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
                </div>
              </article>
            );
          }
        )}
      </div>
      {mobileObservationStructure && (
        <ObservationDetailsDialog
          observation={observations.find(
            (observation) => observation.structure === mobileObservationStructure
          )}
          activeValue={activeObservationMap.get(mobileObservationStructure)}
          isFinalized={isFinalized}
          onRegisterObservation={onRegisterObservation}
          onUnregisterObservation={onUnregisterObservation}
          onDismiss={() => setMobileObservationStructure(null)}
        />
      )}
    </Panel>
  );
}
