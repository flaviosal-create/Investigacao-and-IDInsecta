import { useEffect, useRef, useState } from "react";

const TURNSTILE_SCRIPT_ID = "labsed-turnstile-script";
const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let turnstileScriptPromise = null;

export default function TurnstileWidget({
  siteKey,
  onTokenChange,
  onErro,
  mensagemPronta = "Conclua a verificação para continuar.",
}) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const onErroRef = useRef(onErro);
  const [carregando, setCarregando] = useState(Boolean(siteKey));

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    onErroRef.current = onErro;
  }, [onErro]);

  useEffect(() => {
    onTokenChangeRef.current?.("");
  }, [siteKey]);

  useEffect(() => {
    if (!siteKey || typeof window === "undefined" || typeof document === "undefined") {
      return undefined;
    }

    let cancelado = false;

    async function montarWidget() {
      setCarregando(true);

      try {
        await carregarTurnstile();
        if (cancelado || !containerRef.current || !window.turnstile?.render) return;

        if (widgetIdRef.current !== null) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "light",
          callback: (token) => onTokenChangeRef.current?.(token || ""),
          "expired-callback": () => onTokenChangeRef.current?.(""),
          "error-callback": () => {
            onTokenChangeRef.current?.("");
            onErroRef.current?.(
              "Não foi possível concluir a verificação de segurança. Atualize a página e tente novamente."
            );
          },
        });
      } catch (error) {
        if (!cancelado) {
          onErroRef.current?.(
            error?.message ||
              "Não foi possível carregar a verificação de segurança."
          );
        }
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    montarWidget();

    return () => {
      cancelado = true;
      onTokenChangeRef.current?.("");
      if (widgetIdRef.current !== null && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  if (!siteKey) return null;

  return (
    <div className="turnstile-widget">
      <div className="turnstile-widget__frame" ref={containerRef} />
      <small className="turnstile-widget__hint">
        {siteKey && carregando
          ? "Carregando verificação de segurança..."
          : mensagemPronta}
      </small>
    </div>
  );
}

async function carregarTurnstile() {
  if (window.turnstile?.render) return;
  if (!turnstileScriptPromise) {
    turnstileScriptPromise = new Promise((resolve, reject) => {
      const existente = document.getElementById(TURNSTILE_SCRIPT_ID);
      if (existente) {
        existente.addEventListener("load", () => resolve(), { once: true });
        existente.addEventListener(
          "error",
          () => reject(new Error("Falha ao carregar o script do Turnstile.")),
          { once: true }
        );
        return;
      }

      const script = document.createElement("script");
      script.id = TURNSTILE_SCRIPT_ID;
      script.src = TURNSTILE_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Falha ao carregar o script do Turnstile."));
      document.head.appendChild(script);
    });
  }

  await turnstileScriptPromise;
}
