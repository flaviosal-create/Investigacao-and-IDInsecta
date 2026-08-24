import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "install_prompt_dismissed_v2";

function estaInstalado() {
  return (
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    window.navigator.standalone === true
  );
}

function detectarIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent || "");
}

export default function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [visivel, setVisivel] = useState(false);
  const [mostraAjudaInstalacao, setMostraAjudaInstalacao] = useState(false);
  const [instalado, setInstalado] = useState(() => {
    if (typeof window === "undefined") return false;
    return estaInstalado();
  });

  const ehIos = useMemo(() => {
    if (typeof window === "undefined") return false;
    return detectarIos();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const dispensado = (() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
    })();

    if (dispensado || estaInstalado()) return undefined;

    let fallbackTimer;

    const onBeforeInstallPrompt = (event) => {
      event.preventDefault();
      window.clearTimeout(fallbackTimer);
      setPromptEvent(event);
      fallbackTimer = window.setTimeout(() => setVisivel(true), 6000);
    };

    const onInstalled = () => {
      window.clearTimeout(fallbackTimer);
      setInstalado(true);
      setVisivel(false);
      setPromptEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    fallbackTimer = window.setTimeout(() => setVisivel(true), 6000);

    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [ehIos]);

  if (instalado || !visivel) return null;

  async function instalar() {
    if (promptEvent) {
      promptEvent.prompt();
      const escolha = await promptEvent.userChoice.catch(() => null);

      if (escolha?.outcome === "accepted") {
        setVisivel(false);
      }

      setPromptEvent(null);
      return;
    }

    if (ehIos) {
      setMostraAjudaInstalacao(true);
      return;
    }

    setMostraAjudaInstalacao(true);
  }

  function dispensar() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Sem problema: apenas deixa de memorizar a escolha.
    }

    setVisivel(false);
  }

  return (
    <aside style={caixa} aria-label="Instalar aplicativo">
      <div style={textoBox}>
        <strong style={titulo}>Instalar app</strong>
        <span style={texto}>
          {mostraAjudaInstalacao && ehIos
            ? "No iPhone/iPad: toque em Compartilhar e depois em Adicionar à Tela de Início."
            : mostraAjudaInstalacao
            ? "No Chrome/Edge: use o ícone de instalação na barra de endereço ou o menu do navegador."
            : "Abra direto pela tela inicial do celular."}
        </span>
      </div>

      <div style={acoes}>
        <button type="button" style={botaoPrincipal} onClick={instalar}>
          {!promptEvent ? "Como instalar" : "Instalar"}
        </button>
        <button type="button" style={botaoSecundario} onClick={dispensar}>
          Agora não
        </button>
      </div>
    </aside>
  );
}

const caixa = {
  position: "fixed",
  right: "max(12px, env(safe-area-inset-right))",
  bottom: "max(12px, env(safe-area-inset-bottom))",
  zIndex: 2000,
  width: "min(330px, calc(100vw - 24px))",
  border: "1px solid rgba(49, 95, 61, 0.22)",
  borderRadius: 18,
  background: "rgba(255, 252, 244, 0.96)",
  boxShadow: "0 18px 48px rgba(31, 41, 55, 0.18)",
  color: "var(--color-text, #1f2937)",
  display: "grid",
  gap: 10,
  padding: 12,
  backdropFilter: "blur(10px)",
};

const textoBox = {
  display: "grid",
  gap: 3,
};

const titulo = {
  fontSize: 14,
};

const texto = {
  color: "var(--color-muted, #64748b)",
  fontSize: 12,
  lineHeight: 1.35,
};

const acoes = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const botaoPrincipal = {
  border: 0,
  borderRadius: 999,
  background: "var(--color-primary, #315f3d)",
  color: "#fff",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 900,
  padding: "8px 12px",
};

const botaoSecundario = {
  border: "1px solid rgba(49, 95, 61, 0.22)",
  borderRadius: 999,
  background: "rgba(255,255,255,0.72)",
  color: "var(--color-muted, #64748b)",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 800,
  padding: "8px 12px",
};
