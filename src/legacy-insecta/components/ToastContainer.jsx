/**
 * Componente Container para renderizar múltiplos Toasts
 * Use junto com o hook useToast()
 */
import Toast from "./Toast";

export default function ToastContainer({ toasts, onRemove }) {
  const containerStyle = {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    zIndex: 9999,
    pointerEvents: "none",
  };

  const toastWrapperStyle = (index) => ({
    pointerEvents: "auto",
    animation: `slideIn 0.3s ease ${index * 50}ms backwards`,
  });

  return (
    <div style={containerStyle}>
      {toasts.map((toast, index) => (
        <div key={toast.id} style={toastWrapperStyle(index)}>
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => onRemove(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
