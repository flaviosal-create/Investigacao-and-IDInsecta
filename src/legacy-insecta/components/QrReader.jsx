import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useId, useRef, useState } from "react";

export default function QrReader({ onRead, onScan, onClose }) {
  const qrRef = useRef(null);
  const reactId = useId();
  const readerId = `reader-${reactId.replace(/:/g, "")}`;
  const startedRef = useRef(false);
  const jaLeu = useRef(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("Aponte a câmera para o QR Code");
  const handleReadRef = useRef(onRead || onScan);

  useEffect(() => {
    handleReadRef.current = onRead || onScan;
  }, [onRead, onScan]);

  useEffect(() => {
    let cancelado = false;
    const qr = new Html5Qrcode(readerId);
    qrRef.current = qr;

    qr.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        if (jaLeu.current) return;

        jaLeu.current = true;
        setMensagem("QR Code lido");

        handleReadRef.current?.(decodedText);

        if (startedRef.current) {
          qr.stop().then(() => clearQr(qr)).catch(() => {});
          startedRef.current = false;
        }
      }
    ).then(() => {
      if (cancelado) {
        qr.stop().then(() => clearQr(qr)).catch(() => {});
        return;
      }

      startedRef.current = true;
      setErro("");
    }).catch((err) => {
      console.error("Erro câmera:", err);
      setErro("Sem acesso à câmera. Você pode escolher a imagem do QR abaixo.");
    });

    return () => {
      cancelado = true;

      if (!qrRef.current) return;

      if (startedRef.current) {
        qrRef.current.stop().then(() => clearQr(qrRef.current)).catch(() => {});
      } else {
        clearQr(qrRef.current);
      }

      startedRef.current = false;
    };
  }, [readerId]);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file || !qrRef.current) return;

    setMensagem("Lendo imagem do QR...");
    setErro("");
    jaLeu.current = false;

    try {
      if (startedRef.current) {
        await qrRef.current.stop();
        startedRef.current = false;
      }

      const decodedText = await qrRef.current.scanFile(file, true);
      jaLeu.current = true;
      setMensagem("QR Code lido");
      handleReadRef.current?.(decodedText);
    } catch (err) {
      console.error("Erro ao ler arquivo QR:", err);
      setErro("Não consegui ler esse arquivo. Tente uma imagem mais nítida do QR.");
      setMensagem("Aponte a câmera para o QR Code");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div id={readerId} style={readerBoxStyle} />

      <p style={mensagemStyle}>{erro || mensagem}</p>

      <label className="btn btn--secondary" style={fileButtonStyle}>
        Escolher imagem do QR
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={fileInputStyle}
        />
      </label>

      <button
        className="btn btn--secondary"
        onClick={() => {
          if (qrRef.current && startedRef.current) {
            qrRef.current.stop().then(() => clearQr(qrRef.current)).catch(() => {});
            startedRef.current = false;
          }
          onClose();
        }}
        style={{ marginTop: 10 }}
      >
        Cancelar
      </button>
    </div>
  );
}

function clearQr(qr) {
  try {
    qr?.clear();
  } catch {
    // O elemento pode já ter sido limpo pelo React durante a desmontagem.
  }
}

const mensagemStyle = {
  margin: "10px auto 0",
  maxWidth: 320,
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.45,
};

const readerBoxStyle = {
  width: "min(300px, 100%)",
  margin: "auto",
  overflow: "hidden",
  borderRadius: 14,
};

const fileButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,
  cursor: "pointer",
};

const fileInputStyle = {
  display: "none",
};
