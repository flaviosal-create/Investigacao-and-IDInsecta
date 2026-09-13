import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { formatStructure, formatValue } from "../utils/presentation.js";

export function HypothesisConflictsDialog({ hypothesis, protocol, onDismiss }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
  }, []);

  function closeDialog() {
    dialogRef.current?.close();
  }

  function dismissOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      closeDialog();
    }
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="hypothesis-conflicts-dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClose={onDismiss}
      onClick={dismissOnBackdrop}
    >
      <header className="conflicts-dialog-header">
        <div>
          <span className="conflicts-dialog-kicker">Evidências em conflito</span>
          <h2 id={titleId}>{hypothesis.name}</h2>
        </div>
        <button type="button" className="secondary-button" onClick={closeDialog}>
          Fechar
        </button>
      </header>
      <p id={descriptionId}>
        Estas observações registradas enfraquecem esta hipótese segundo o protocolo.
        Um conflito pede revisão das evidências; não exclui automaticamente a hipótese.
      </p>
      <ul className="conflicts-dialog-list">
        {hypothesis.conflicts.map((conflict) => {
          const label = protocol?.observations?.find(
            (observation) => observation.structure === conflict.structure
          )?.label ?? formatStructure(conflict.structure);
          return (
            <li key={`${conflict.structure}:${conflict.value}`}>
              <strong>{label}</strong>
              <span>Observado: {formatValue(conflict.value)}</span>
              <p>Esta característica foi registrada como contraevidência para {hypothesis.name}.</p>
            </li>
          );
        })}
      </ul>
      <p className="conflicts-dialog-note">
        Compare essas observações com a amostra antes de manter ou revisar suas escolhas.
      </p>
    </dialog>,
    document.body
  );
}
