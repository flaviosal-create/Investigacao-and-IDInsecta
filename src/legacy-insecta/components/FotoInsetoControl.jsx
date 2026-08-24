import { useCallback, useEffect, useRef, useState } from "react";

export default function FotoInsetoControl({
  fotoInseto,
  onFotoInsetoChange,
  titulo = "Foto do inseto",
  alt = "Inseto identificado",
  mostrarPreview = true,
  compacto = false,
  ocultarAcoesComFoto = false,
  ocultarTitulo = false,
  acoesExtras = null,
  painelAuxiliar = null,
}) {
  const [cameraAberta, setCameraAberta] = useState(false);
  const [erroCamera, setErroCamera] = useState("");
  const [larguraBox, setLarguraBox] = useState(0);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const compactoMuitoEstreito = compacto && larguraBox > 0 && larguraBox < 430;

  const pararCamera = useCallback(() => {
    pararStream(streamRef.current);
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    const elemento = containerRef.current;
    if (!elemento || typeof ResizeObserver === "undefined") return undefined;

    const atualizarLargura = () => {
      setLarguraBox(Math.round(elemento.getBoundingClientRect().width));
    };

    atualizarLargura();

    const observer = new ResizeObserver(() => {
      atualizarLargura();
    });

    observer.observe(elemento);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!cameraAberta) return undefined;

    let cancelado = false;

    async function iniciarCamera() {
      try {
        setErroCamera("");

        if (!window.isSecureContext) {
          setErroCamera("A câmera do navegador precisa de conexão segura (https). Use escolher arquivo neste dispositivo.");
          return;
        }

        if (!navigator.mediaDevices?.getUserMedia) {
          setErroCamera("Este navegador não liberou câmera dentro do aplicativo.");
          return;
        }

        const stream = await abrirCameraComFallback();

        if (cancelado) {
          pararStream(stream);
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
      } catch (err) {
        console.error("Erro ao abrir câmera:", err);
        setErroCamera("Não consegui abrir a câmera. Use a opção de escolher arquivo.");
      }
    }

    iniciarCamera();

    return () => {
      cancelado = true;
      pararCamera();
    };
  }, [cameraAberta, pararCamera]);

  function fecharCamera() {
    pararCamera();
    setCameraAberta(false);
  }

  function capturarFoto() {
    const video = videoRef.current;

    if (!video || !video.videoWidth || !video.videoHeight) {
      setErroCamera("A câmera ainda está iniciando. Tente novamente em instantes.");
      return;
    }

    const maxSide = 1280;
    const scale = Math.min(1, maxSide / Math.max(video.videoWidth, video.videoHeight));
    const width = Math.max(1, Math.round(video.videoWidth * scale));
    const height = Math.max(1, Math.round(video.videoHeight * scale));
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      setErroCamera("Não consegui preparar a captura da foto.");
      return;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(video, 0, 0, width, height);
    onFotoInsetoChange?.(canvas.toDataURL("image/jpeg", 0.82));
    fecharCamera();
  }

  async function handleChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const dataUrl = await arquivoParaImagemRelatorio(file);
    onFotoInsetoChange?.(dataUrl);
  }

  return (
    <div ref={containerRef} style={compacto ? fotoBoxCompacto : fotoBox}>
      {!ocultarTitulo ? <div style={fotoTitulo}>{titulo}</div> : null}

      {mostrarPreview ? (
        fotoInseto ? (
          <img
            src={fotoInseto}
            alt={alt}
            style={fotoPreview}
          />
        ) : (
          <div style={fotoPlaceholder}>
            Nenhuma foto adicionada.
          </div>
        )
      ) : null}

      {onFotoInsetoChange && !(ocultarAcoesComFoto && fotoInseto) ? (
        <div style={painelAuxiliar ? fotoAcoesLayout : null}>
          <div style={fotoAcoes}>
            <button
              type="button"
              className="btn btn--secondary btn--compact"
              style={
                compacto
                  ? compactoMuitoEstreito
                    ? fotoAcaoBotaoCompactoEmpilhado
                    : fotoAcaoBotaoCompacto
                  : undefined
              }
              onClick={() => setCameraAberta(true)}
            >
              {fotoInseto ? "Tirar nova foto" : "Abrir câmera"}
            </button>

            <label
              className="btn btn--secondary btn--compact"
              style={{
                ...fotoBotao,
                ...(compacto
                  ? compactoMuitoEstreito
                    ? fotoAcaoBotaoCompactoEmpilhado
                    : fotoAcaoBotaoCompacto
                  : null),
              }}
            >
              Escolher arquivo
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleChange}
                style={fotoInput}
              />
            </label>

            {fotoInseto ? (
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                style={
                  compacto
                    ? compactoMuitoEstreito
                      ? fotoAcaoBotaoCompactoEmpilhado
                      : fotoAcaoBotaoCompacto
                    : undefined
                }
                onClick={() => onFotoInsetoChange("")}
              >
                Remover foto
              </button>
            ) : null}

            {acoesExtras}
          </div>

          {painelAuxiliar ? <div style={fotoPainelAuxiliar}>{painelAuxiliar}</div> : null}
        </div>
      ) : null}

      {cameraAberta ? (
        <div style={cameraOverlay}>
          <div style={cameraDialog}>
            <div style={cameraHeader}>
              <div style={cameraTitle}>{titulo}</div>
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                onClick={fecharCamera}
              >
                Fechar
              </button>
            </div>

            <video
              ref={videoRef}
              style={cameraVideo}
              autoPlay
              muted
              playsInline
            />

            {erroCamera ? (
              <div style={cameraErro}>{erroCamera}</div>
            ) : null}

            <div style={cameraAcoes}>
              <button
                type="button"
                className="btn btn--primary"
                onClick={capturarFoto}
              >
                Capturar foto
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function pararStream(stream) {
  stream?.getTracks?.().forEach((track) => track.stop());
}

async function abrirCameraComFallback() {
  const tentativas = [
    {
      video: {
        facingMode: { ideal: "environment" },
      },
      audio: false,
    },
    {
      video: {
        facingMode: "environment",
      },
      audio: false,
    },
    {
      video: true,
      audio: false,
    },
  ];

  let ultimoErro = null;

  for (const constraints of tentativas) {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      ultimoErro = error;
    }
  }

  throw ultimoErro || new Error("Não consegui abrir a câmera.");
}

function arquivoParaImagemRelatorio(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const maxSide = 1280;
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(String(reader.result || ""));
          return;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };

      img.onerror = () => resolve(String(reader.result || ""));
      img.src = String(reader.result || "");
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const fotoBox = {
  marginTop: 16,
  marginBottom: 14,
  padding: 12,
  borderRadius: 14,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const fotoBoxCompacto = {
  ...fotoBox,
  marginTop: 0,
  marginBottom: 0,
  padding: 10,
};

const fotoTitulo = {
  marginBottom: 10,
  color: "var(--color-text)",
  fontWeight: 850,
  fontSize: 14,
};

const fotoPreview = {
  display: "block",
  width: "100%",
  maxHeight: 460,
  objectFit: "contain",
  borderRadius: 12,
  background: "var(--color-bg-soft)",
  border: "1px solid var(--color-border)",
};

const fotoPlaceholder = {
  padding: "18px 12px",
  borderRadius: 12,
  background: "var(--color-bg-soft)",
  border: "1px dashed var(--color-border)",
  color: "var(--color-muted)",
  textAlign: "center",
  fontSize: 13,
  fontWeight: 700,
};

const fotoAcoes = {
  display: "flex",
  gap: 8,
  justifyContent: "stretch",
  flexWrap: "wrap",
  marginTop: 10,
};

const fotoAcoesLayout = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
  gap: 10,
  alignItems: "start",
  marginTop: 10,
};

const fotoPainelAuxiliar = {
  minWidth: 0,
};

const fotoAcaoBotaoCompacto = {
  flex: "1 1 0",
  width: "100%",
  minWidth: 0,
  justifyContent: "center",
  textAlign: "center",
  fontSize: 10,
  lineHeight: 1.05,
  padding: "6px 4px",
  minHeight: 30,
};

const fotoAcaoBotaoCompactoEmpilhado = {
  ...fotoAcaoBotaoCompacto,
  flex: "0 0 auto",
  minHeight: 26,
  padding: "4px 6px",
  fontSize: 9.5,
};

const fotoBotao = {
  cursor: "pointer",
};

const fotoInput = {
  display: "none",
};

const cameraOverlay = {
  position: "fixed",
  inset: 0,
  zIndex: 2000,
  display: "grid",
  placeItems: "center",
  padding: 14,
  background: "var(--color-overlay)",
};

const cameraDialog = {
  width: "min(560px, 100%)",
  maxHeight: "92vh",
  overflow: "auto",
  padding: 14,
  borderRadius: 18,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-lg)",
};

const cameraHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  marginBottom: 12,
};

const cameraTitle = {
  color: "var(--color-text)",
  fontWeight: 900,
  fontSize: 16,
};

const cameraVideo = {
  display: "block",
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
  borderRadius: 14,
  background: "#020617",
};

const cameraErro = {
  marginTop: 10,
  padding: 10,
  borderRadius: 12,
  background: "var(--color-danger-soft)",
  border: "1px solid var(--color-danger-border)",
  color: "var(--color-danger-text)",
  fontSize: 13,
  fontWeight: 750,
  textAlign: "center",
};

const cameraAcoes = {
  display: "flex",
  justifyContent: "center",
  marginTop: 12,
};
