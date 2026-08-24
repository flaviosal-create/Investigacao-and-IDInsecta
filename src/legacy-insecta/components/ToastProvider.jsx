import { useCallback, useState } from "react";
import Toast from "./Toast";
import { ToastContext } from "./ToastContext.js";
import "./ToastContainer.css";

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /**
   * Adiciona um novo toast à fila
   * @param {string} message - Mensagem a exibir
   * @param {string} type - Tipo: "success", "error", "info", "warning"
   * @param {number} duration - Tempo em ms (padrão: 3000)
   */
  const addToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Math.random().toString(36).slice(2);
    const toast = { id, message, type };

    setToasts((prev) => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }

    return id;
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="toast-container" role="region" aria-live="polite" aria-label="Notificações">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}

export default ToastProvider;
