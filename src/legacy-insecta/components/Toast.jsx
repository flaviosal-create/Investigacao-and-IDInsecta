/**
 * Componente de Toast para notificações
 * Usado para feedback visual de ações (sucesso, erro, info)
 */
import { useEffect, useState } from "react";

export default function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration === 0) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const iconMap = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "⚠",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const iconStyle = {
    flexShrink: 0,
    fontWeight: "bold",
    fontSize: "18px",
  };

  const messageStyle = {
    flex: 1,
    fontSize: "14px",
    fontWeight: 500,
  };

  const closeStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    fontSize: "18px",
    color: "inherit",
    opacity: 0.7,
    transition: "opacity 0.2s ease",
  };

  return (
    <div className={`toast toast--${type}`}>
      <div style={containerStyle}>
        <span style={iconStyle}>{iconMap[type]}</span>
        <span style={messageStyle}>{message}</span>
        <button
          style={closeStyle}
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "1")}
          onMouseLeave={(e) => (e.target.style.opacity = "0.7")}
          aria-label="Fechar notificação"
        >
          ×
        </button>
      </div>
    </div>
  );
}
