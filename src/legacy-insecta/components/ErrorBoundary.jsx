/**
 * Error Boundary Component
 * Captura erros e exibe UI amigável
 */
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Log para serviço de monitoramento (ex: Sentry)
    if (window.__reportError) {
      window.__reportError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              marginBottom: "16px",
            }}
          >
            ⚠️
          </div>

          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "var(--color-text)",
              margin: "0 0 12px 0",
            }}
          >
            Algo deu errado
          </h1>

          <p
            style={{
              fontSize: "14px",
              color: "var(--color-muted)",
              maxWidth: "500px",
              margin: "0 0 24px 0",
            }}
          >
            Desculpe-nos! Encontramos um erro inesperado. Tente recarregar a
            página.
          </p>

          {import.meta.env.DEV && this.state.error && (
            <details
              style={{
                background: "var(--color-surface-soft)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "12px",
                maxWidth: "600px",
                marginBottom: "20px",
                textAlign: "left",
                fontSize: "12px",
                color: "var(--color-muted)",
                overflowX: "auto",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: 700 }}>
                Detalhes do erro (dev only)
              </summary>
              <pre
                style={{
                  margin: "12px 0 0 0",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {this.state.error.toString()}
                {"\n\n"}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                minHeight: "44px",
                padding: "12px 24px",
                borderRadius: "var(--radius-md)",
                border: "none",
                background: "var(--color-primary)",
                color: "white",
                fontWeight: 800,
                cursor: "pointer",
                transition: "var(--btn-transition)",
              }}
            >
              Recarregar página
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              style={{
                minHeight: "44px",
                padding: "12px 24px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text)",
                fontWeight: 700,
                cursor: "pointer",
                transition: "var(--btn-transition)",
              }}
            >
              Ir para início
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
