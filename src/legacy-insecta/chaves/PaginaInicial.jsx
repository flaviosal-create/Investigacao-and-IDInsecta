import { lazy, Suspense, useState } from "react";
import RoteiroPratica from "../atividades/RoteiroPratica.jsx";
import { roteiroObservacaoIdentificacaoInsetos } from "../atividades/roteirosPraticas.js";
import LabBioMark from "../components/LabBioMark.jsx";
import LogoMark from "../components/LogoMark.jsx";

const QrReader = lazy(() => import("../components/QrReader.jsx"));

function CartaoAcao({
  titulo,
  descricao,
  destaque = false,
  disabled = false,
  onClick,
  testId,
}) {
  return (
    <button
      type="button"
      className={`home-action-card${destaque ? " home-action-card--primary" : ""}`}
      disabled={disabled}
      onClick={onClick}
      data-testid={testId}
    >
      <span className="home-action-card__title">{titulo}</span>
      <span className="home-action-card__desc">{descricao}</span>
    </button>
  );
}

export default function PaginaInicial({
  onAbrirConfiguracao,
  onAbrirGerador,
  onAbrirGeradorPraticas,
  onVoltarAtividades,
  decodeGabaritoQR,
  setGabarito,
}) {
  const [modo, setModo] = useState("pratica");
  const [lerQR, setLerQR] = useState(false);
  const [gabaritoLocal, setGabaritoLocal] = useState([]);
  const [configQr, setConfigQr] = useState({ qtdInsetos: 0, tempoMinutos: 0 });
  const [erroQr, setErroQr] = useState("");
  const [readerKey, setReaderKey] = useState(0);

  function abrirLeitorQr({ limparGabarito = false } = {}) {
    setErroQr("");
    setReaderKey((atual) => atual + 1);
    setLerQR(true);

    if (limparGabarito) {
      setGabaritoLocal([]);
      setConfigQr({ qtdInsetos: 0, tempoMinutos: 0 });
      setGabarito?.([]);
    }
  }

  function handleNovaAtividade() {
    if (modo === "prova") {
      if (gabaritoLocal.length === 0) {
        abrirLeitorQr();
        return;
      }

      onAbrirConfiguracao?.(modo, null, {
        gabarito: gabaritoLocal,
        qtdInsetos: configQr.qtdInsetos || gabaritoLocal.length,
        tempoMinutos: configQr.tempoMinutos || 0,
      });
      return;
    }

    onAbrirConfiguracao?.(modo, null, {
      gabarito: [],
    });
  }

  function handleScanQR(codigo) {
    if (!codigo) return;

    const dadosQr = decodeGabaritoQR?.(codigo) || {};
    const gabaritoDecodificado = dadosQr.gabarito;

    if (!dadosQr.valido || !Array.isArray(gabaritoDecodificado)) {
      setErroQr(dadosQr.erro || "Não foi possível validar este QR Code.");
      return;
    }

    if (gabaritoDecodificado.length > 0) {
      setErroQr("");
      setModo("prova");
      setGabarito?.(gabaritoDecodificado);
      setGabaritoLocal(gabaritoDecodificado);
      setConfigQr({
        qtdInsetos: dadosQr.qtdInsetos || gabaritoDecodificado.length,
        tempoMinutos: dadosQr.tempoMinutos || 0,
      });
      setLerQR(false);

      onAbrirConfiguracao?.("prova", null, {
        gabarito: gabaritoDecodificado,
        qtdInsetos: dadosQr.qtdInsetos || gabaritoDecodificado.length,
        tempoMinutos: dadosQr.tempoMinutos || 0,
      });
    }
  }

  return (
    <div className="home-page" style={container} data-testid="chave-home-page">
      <div className="home-hero" style={hero}>
        <div style={topActions}>
          <button
            type="button"
            className="btn btn--secondary btn--compact"
            onClick={onVoltarAtividades}
          >
            Atividades de Zoologia I
          </button>
        </div>

        <div style={logoInicial}>
          <LogoMark />
        </div>

        <h1 style={titulo}>Chave de Identificação de Insetos</h1>
        <p style={subtitulo}>
          Atividade guiada para observar estruturas morfológicas, registrar o
          caminho de identificação e revisar resultados.
        </p>

        <div className="home-field" style={bloco}>
          <label style={labelHero}>Modo</label>
          <select
            value={modo}
            data-testid="chave-home-mode-select"
            onChange={(e) => {
              const novoModo = e.target.value;
              setModo(novoModo);

              if (novoModo === "prova") {
                abrirLeitorQr();
              } else {
                setLerQR(false);
                setErroQr("");
              }
            }}
            style={selectHero}
          >
            <option value="pratica">Prática</option>
            <option value="prova">Prova</option>
          </select>
        </div>

        {modo === "prova" && (
          <div style={statusQr}>
            {gabaritoLocal.length > 0
              ? `Gabarito carregado: ${gabaritoLocal.length} ${
                  gabaritoLocal.length === 1 ? "inseto" : "insetos"
                }`
              : "Aguardando leitura do QR"}
          </div>
        )}

        {modo === "prova" && erroQr ? (
          <div role="alert" style={erroQrStyle}>
            <strong>QR Code inválido.</strong>
            <span>{erroQr}</span>
            <button
              type="button"
              className="btn btn--secondary btn--compact"
              onClick={() => abrirLeitorQr()}
            >
              Tentar outro QR
            </button>
          </div>
        ) : null}

        {lerQR && (
          <div style={leitorQrBox}>
            <Suspense fallback={<div style={qrFallback}>Carregando leitor de QR...</div>}>
              <QrReader
                key={readerKey}
                onScan={handleScanQR}
                onClose={() => setLerQR(false)}
              />
            </Suspense>
          </div>
        )}

        {modo === "prova" && gabaritoLocal.length > 0 && !lerQR ? (
          <button
            type="button"
            className="btn btn--secondary btn--compact"
            onClick={() => abrirLeitorQr({ limparGabarito: true })}
          >
            Trocar QR Code
          </button>
        ) : null}

        <details style={roteiroBox}>
          <summary style={roteiroSummary}>Roteiro da prática</summary>
          <div style={roteiroConteudo}>
            <RoteiroPratica roteiro={roteiroObservacaoIdentificacaoInsetos} />
          </div>
        </details>

        <div className="home-actions" style={acoesPrincipais}>
          <CartaoAcao
            titulo="Nova atividade"
            descricao={
              modo === "prova"
                ? "Iniciar prova com o QR Code carregado"
                : "Começar uma identificação guiada"
            }
            destaque
            disabled={modo === "prova" && gabaritoLocal.length === 0}
            onClick={handleNovaAtividade}
            testId="chave-home-new-activity"
          />

          <CartaoAcao
            titulo="Gerador de chaves"
            descricao="Criar ou revisar chaves didáticas"
            onClick={onAbrirGerador}
            testId="chave-home-open-generator"
          />

          <CartaoAcao
            titulo="Gerador de práticas"
            descricao="Montar práticas modulares com textos, relatório e módulos didáticos"
            onClick={onAbrirGeradorPraticas}
            testId="chave-home-open-practice-generator"
          />

        </div>

        <div style={assinaturaLab}>
          <LabBioMark compact />
        </div>
      </div>
    </div>
  );
}

/* ===== ESTILOS ===== */

const container = {
  maxWidth: 980,
  margin: "0 auto",
  padding: "8px 10px 16px",
  minHeight: "auto",
  fontFamily: "system-ui, sans-serif",
};

const hero = {
  textAlign: "center",
  padding: "18px 18px 16px",
  borderRadius: 18,
  display: "flex",
  flexDirection: "column",
  gap: 9,
  background: "color-mix(in srgb, var(--color-surface) 94%, transparent)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
  maxWidth: 500,
  margin: "0 auto",
  boxShadow: "var(--shadow-lg)",
};

const topActions = {
  display: "flex",
  justifyContent: "flex-start",
};

const logoInicial = {
  display: "flex",
  justifyContent: "center",
  marginBottom: 0,
  transform: "scale(0.9)",
};

const titulo = {
  margin: 0,
  fontSize: "clamp(23px, 5vw, 32px)",
  lineHeight: 1.05,
  fontWeight: 800,
};

const subtitulo = {
  margin: "0 auto",
  maxWidth: 430,
  color: "var(--color-muted)",
  fontSize: 13.5,
  lineHeight: 1.35,
};

const bloco = {
  marginTop: 2,
  textAlign: "left",
};

const labelHero = {
  color: "var(--color-muted)",
  fontWeight: 800,
  display: "block",
  fontSize: 12.5,
};

const selectHero = {
  width: "100%",
  marginTop: 4,
  minHeight: 40,
  padding: "8px 11px",
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  color: "var(--color-text)",
};

const acoesPrincipais = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 8,
  marginTop: 2,
};

const roteiroBox = {
  marginTop: 4,
  padding: "10px 12px",
  borderRadius: 14,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const roteiroSummary = {
  cursor: "pointer",
  color: "var(--color-primary)",
  fontWeight: 900,
  textAlign: "left",
};

const roteiroConteudo = {
  marginTop: 12,
};

const statusQr = {
  marginTop: 2,
  padding: "8px 10px",
  borderRadius: 10,
  background: "var(--color-success-soft)",
  border: "1px solid var(--color-success-border)",
  color: "var(--color-success-text)",
  fontWeight: 750,
  fontSize: 13,
};

const leitorQrBox = {
  marginTop: 6,
};

const erroQrStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 7,
  marginTop: 2,
  padding: "10px 12px",
  borderRadius: 10,
  background: "var(--color-danger-soft, #fef2f2)",
  border: "1px solid var(--color-danger-border, #fecaca)",
  color: "var(--color-danger-text, #991b1b)",
  fontSize: 13,
  lineHeight: 1.4,
};

const qrFallback = {
  padding: 14,
  color: "var(--color-muted)",
  fontSize: 13,
  fontWeight: 700,
};

const assinaturaLab = {
  display: "flex",
  justifyContent: "center",
  marginTop: 2,
  paddingTop: 8,
  borderTop: "1px solid rgba(148,163,184,0.22)",
};
