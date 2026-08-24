import { useEffect, useState } from "react";

import Placeholder3D from "./Placeholder3D.jsx";

const MODEL_VIEWER_SRC =
  "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";

function carregarModelViewer() {
  if (typeof customElements !== "undefined" && customElements.get("model-viewer")) {
    return Promise.resolve();
  }

  const scriptExistente = document.querySelector(
    `script[src="${MODEL_VIEWER_SRC}"]`
  );

  if (scriptExistente) {
    return new Promise((resolve, reject) => {
      scriptExistente.addEventListener("load", resolve, { once: true });
      scriptExistente.addEventListener("error", reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = MODEL_VIEWER_SRC;
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.appendChild(script);
  });
}

export default function Modelo3DAranha({ src = "/models/aranha.glb" }) {
  const [viewerReady, setViewerReady] = useState(
    () => typeof customElements !== "undefined" && customElements.get("model-viewer")
  );
  const [failedSrc, setFailedSrc] = useState("");
  const hasError = failedSrc === src;

  useEffect(() => {
    let active = true;

    if (typeof customElements !== "undefined" && customElements.get("model-viewer")) {
      return undefined;
    }

    carregarModelViewer()
      .then(() => {
        if (active) setViewerReady(true);
      })
      .catch((error) => {
        console.warn("Nao foi possivel carregar o visualizador 3D:", error);
        if (active) setFailedSrc(src);
      });

    return () => {
      active = false;
    };
  }, [src]);

  if (hasError) {
    return (
      <Placeholder3D
        label="Nao foi possivel carregar este modelo no momento."
        titulo="Modelo 3D"
      />
    );
  }

  if (!viewerReady) {
    return <Placeholder3D label="Carregando modelo 3D..." titulo="Modelo 3D" />;
  }

  return (
    <model-viewer
      src={src}
      alt="Modelo 3D do organismo"
      camera-controls
      auto-rotate
      interaction-prompt="none"
      shadow-intensity="0.8"
      exposure="0.95"
      style={{
        width: "100%",
        height: 420,
        borderRadius: 16,
        overflow: "hidden",
        background: "var(--color-surface-soft)",
      }}
      onError={() => setFailedSrc(src)}
    />
  );
}
