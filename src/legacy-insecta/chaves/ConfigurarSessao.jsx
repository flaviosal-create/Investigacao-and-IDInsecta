import { useState } from "react";
import { chavesConfig } from "./config/chavesConfig.js";
import LabBioMark from "../components/LabBioMark.jsx";

export default function ConfigurarSessao({
  mode,
  aluno,
  chavesPersonalizadas = [],
  gabarito = [],
  qtdInsetosQr = 0,
  tempoPorInsetoQr = 0,
  onStart,
  onRemoverChavePersonalizada,
  onStartArtropode,
  onStartPesquisador,
  onBack,
}) {
  const isProva = mode === "prova";
  const totalDoGabarito = Array.isArray(gabarito) ? gabarito.length : 0;
  const totalDaProva = isProva && totalDoGabarito > 0
    ? totalDoGabarito
    : Math.max(0, Number(qtdInsetosQr) || 0);
  const [qtdInsetos, setQtdInsetos] = useState(totalDaProva || 1);
  const [tipoTempo, setTipoTempo] = useState(tempoPorInsetoQr > 0 ? "minutos" : "livre");
  const [minutos, setMinutos] = useState(tempoPorInsetoQr > 0 ? tempoPorInsetoQr : 5);
  const [mostrarChavesFamilia, setMostrarChavesFamilia] = useState(false);

  const ordens = Object.keys(chavesConfig || {}).filter(
    (ordem) => ordem !== "CHAVE PRINCIPAL" && !ordem.includes(" SUB")
  );

  const tempoMinutos = tipoTempo === "minutos" ? Math.max(1, Number(minutos) || 1) : 0;
  const totalFinal = isProva && totalDaProva > 0
    ? totalDaProva
    : Math.max(1, Number(qtdInsetos) || 1);

  return (
    <div className="config-sessao-page" style={container} data-testid="configurar-sessao-page">
      <section className="surface config-sessao-hero" style={hero}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
          <LabBioMark />
        </div>

        {isProva ? (
          <ConfiguracaoProvaCard
            minutos={minutos}
            setMinutos={setMinutos}
            setQtdInsetos={setQtdInsetos}
            setTipoTempo={setTipoTempo}
            tempoPorInsetoQr={tempoPorInsetoQr}
            tipoTempo={tipoTempo}
            totalDaProva={totalDaProva}
            totalFinal={totalFinal}
          />
        ) : null}

        <button
          className="config-sessao-action-card config-sessao-action-card--primary"
          data-testid="config-start-main"
          onClick={() => onStart?.(mode, aluno, totalFinal, "", gabarito, tempoMinutos)}
        >
          <span>Chave para Ordens de Insecta</span>
          <small>começar pela identificação das ordens</small>
        </button>

        {!isProva ? (
          <button
            className="config-sessao-action-card"
            data-testid="config-start-pesquisador"
            onClick={() => onStartPesquisador?.("pesquisador", aluno, 1)}
          >
            <span>Modo Investigativo</span>
            <small>abrir o fluxo investigativo do LABSED</small>
          </button>
        ) : (
          <div style={bloqueioProva}>
            Na prova, o modo investigativo e a chave de artrópodes ficam bloqueados.
          </div>
        )}

        <div style={assinaturaLab}>
          <LabBioMark compact />
        </div>
      </section>

      {!isProva ? (
        <ChavesFamiliaSection
          aluno={aluno}
          mode={mode}
          mostrarChavesFamilia={mostrarChavesFamilia}
          onStart={onStart}
          ordens={ordens}
          setMostrarChavesFamilia={setMostrarChavesFamilia}
        />
      ) : null}

      {!isProva && chavesPersonalizadas.length ? (
        <ChavesPersonalizadasSection
          aluno={aluno}
          chavesPersonalizadas={chavesPersonalizadas}
          mode={mode}
          onRemoverChavePersonalizada={onRemoverChavePersonalizada}
          onStart={onStart}
        />
      ) : null}
    </div>
  );
}

function ConfiguracaoProvaCard({
  minutos,
  setMinutos,
  setQtdInsetos,
  setTipoTempo,
  tempoPorInsetoQr,
  tipoTempo,
  totalDaProva,
  totalFinal,
}) {
  return (
    <div style={provaBox}>
      <div style={provaTitulo}>Configuração da prova</div>

      <label style={label}>
        Quantos insetos serão observados
        <input
          className="field-control"
          type="number"
          min="1"
          value={totalFinal}
          disabled={totalDaProva > 0}
          onChange={(e) => setQtdInsetos(e.target.value)}
          style={input}
        />
      </label>

      {totalDaProva > 0 ? (
        <div style={hint}>
          Quantidade definida pelo QR: {totalDaProva}{" "}
          {totalDaProva === 1 ? "inseto" : "insetos"}.
        </div>
      ) : null}

      {tempoPorInsetoQr > 0 ? (
        <div style={hint}>
          Tempo definido pelo QR: {tempoPorInsetoQr}{" "}
          {tempoPorInsetoQr === 1 ? "minuto" : "minutos"} por inseto.
        </div>
      ) : null}

      <div style={label}>Tempo por inseto</div>
      <div style={tempoGrid}>
        <button
          type="button"
          className={tipoTempo === "livre" ? "btn btn--primary" : "btn btn--secondary"}
          style={tempoBtn}
          onClick={() => setTipoTempo("livre")}
        >
          Tempo livre
        </button>

        <button
          type="button"
          className={tipoTempo === "minutos" ? "btn btn--primary" : "btn btn--secondary"}
          style={tempoBtn}
          onClick={() => setTipoTempo("minutos")}
        >
          Minutos por inseto
        </button>
      </div>

      {tipoTempo === "minutos" ? (
        <label style={label}>
          Minutos
          <input
            className="field-control"
            type="number"
            min="1"
            value={minutos}
            onChange={(e) => setMinutos(e.target.value)}
            style={input}
          />
        </label>
      ) : null}
    </div>
  );
}

function ChavesFamiliaSection({
  aluno,
  mode,
  mostrarChavesFamilia,
  onStart,
  ordens,
  setMostrarChavesFamilia,
}) {
  return (
    <section className="surface config-sessao-card" style={card}>
      <button
        type="button"
        style={ordensToggle}
        onClick={() => setMostrarChavesFamilia((atual) => !atual)}
        aria-expanded={mostrarChavesFamilia}
      >
        <span>Acesso às chaves de família</span>
        <span style={ordensToggleIcon}>
          {mostrarChavesFamilia ? "Fechar" : "Abrir"}
        </span>
      </button>

      {mostrarChavesFamilia ? (
        <div style={ordensConteudo}>
          <p style={ordensIntro}>
            Escolha uma ordem para abrir diretamente a chave correspondente.
          </p>

          <div style={ordensGrid}>
            {ordens.map((ordem) => (
              <button
                key={ordem}
                type="button"
                style={btnOrdem}
                onClick={() => onStart?.(mode, aluno, 1, ordem)}
              >
                <span>{ordem}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ChavesPersonalizadasSection({
  aluno,
  chavesPersonalizadas,
  mode,
  onRemoverChavePersonalizada,
  onStart,
}) {
  return (
    <section className="surface config-sessao-card" style={card}>
      <div style={customHeader}>
        <div>
          <h3 style={customTitle}>Chaves criadas pelo usuário</h3>
          <p style={customIntro}>
            Chaves pessoais anexadas pelo gerador e salvas apenas neste navegador/equipamento.
          </p>
        </div>
      </div>

      <div style={customGrid}>
        {chavesPersonalizadas.map((item) => (
          <div key={item.id} style={customItem}>
            <button
              type="button"
              style={customOpenButton}
              onClick={() => onStart?.(mode, aluno, 1, item.id)}
            >
              <span>{item.titulo || item.chave?.titulo || "Chave personalizada"}</span>
            </button>
            <button
              type="button"
              className="btn btn--secondary btn--compact"
              style={customRemoveButton}
              onClick={() => onRemoverChavePersonalizada?.(item.id)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

const container = {
  maxWidth: 980,
  margin: "0 auto",
  padding: "10px 10px 20px",
};

const hero = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  maxWidth: 520,
  margin: "0 auto",
  padding: "18px 18px",
  borderRadius: 18,
  color: "var(--color-text)",
  textAlign: "center",
  boxShadow: "var(--shadow-lg)",
};

const titulo = {
  margin: 0,
  fontSize: "clamp(21px, 5vw, 30px)",
  lineHeight: 1.04,
  fontWeight: 850,
};

const subtitulo = {
  margin: 0,
  color: "var(--color-muted)",
  fontSize: 13.5,
  lineHeight: 1.35,
};

const btnVoltar = {
  alignSelf: "center",
  marginTop: 0,
  minHeight: 34,
  padding: "0.45rem 0.7rem",
};

const provaBox = {
  display: "grid",
  gap: 8,
  padding: 11,
  borderRadius: 14,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  textAlign: "left",
};

const provaTitulo = {
  fontWeight: 900,
  fontSize: 15,
};

const label = {
  display: "grid",
  gap: 6,
  color: "var(--color-muted)",
  fontSize: 13,
  fontWeight: 800,
};

const input = {
  minHeight: 42,
};

const hint = {
  padding: "9px 10px",
  borderRadius: 12,
  background: "var(--color-info-soft)",
  color: "var(--color-info-text)",
  fontSize: 13,
  fontWeight: 700,
};

const tempoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 8,
};

const tempoBtn = {
  minHeight: 38,
  padding: "0.55rem 0.65rem",
  fontSize: 13,
};

const bloqueioProva = {
  padding: "10px 12px",
  borderRadius: 13,
  background: "var(--color-warning-soft)",
  border: "1px solid var(--color-warning-border)",
  color: "var(--color-warning-text)",
  fontSize: 13,
  fontWeight: 750,
};

const assinaturaLab = {
  display: "flex",
  justifyContent: "center",
  marginTop: 2,
  paddingTop: 8,
  borderTop: "1px solid var(--color-border)",
};

const card = {
  padding: 0,
  marginTop: 16,
  overflow: "hidden",
};

const ordensToggle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  minHeight: 58,
  padding: "16px 18px",
  border: "none",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  cursor: "pointer",
  fontSize: "clamp(17px, 3.6vw, 22px)",
  fontWeight: 900,
  lineHeight: 1.15,
  textAlign: "left",
};

const ordensToggleIcon = {
  flexShrink: 0,
  padding: "5px 9px",
  borderRadius: 999,
  background: "var(--color-bg-soft)",
  color: "var(--color-primary)",
  fontSize: 12,
  fontWeight: 900,
};

const ordensConteudo = {
  padding: "0 18px 18px",
  borderTop: "1px solid var(--color-border)",
};

const ordensIntro = {
  maxWidth: 620,
  margin: "14px auto 16px",
  color: "var(--color-muted)",
  fontSize: 14,
  lineHeight: 1.45,
  textAlign: "center",
};

const ordensGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
  gap: 12,
};

const btnOrdem = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 58,
  padding: "13px 14px",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  color: "var(--color-text)",
  cursor: "pointer",
  textAlign: "center",
  fontSize: 15,
  fontWeight: 820,
  lineHeight: 1.2,
  boxShadow: "var(--shadow-sm)",
};

const customHeader = {
  padding: "16px 18px 6px",
  textAlign: "center",
};

const customTitle = {
  margin: 0,
  color: "var(--color-text)",
  fontSize: 20,
  fontWeight: 900,
};

const customIntro = {
  margin: "6px auto 0",
  maxWidth: 580,
  color: "var(--color-muted)",
  fontSize: 14,
  lineHeight: 1.4,
};

const customGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  padding: "12px 18px 18px",
};

const customItem = {
  display: "grid",
  gap: 8,
};

const customOpenButton = {
  ...btnOrdem,
  minHeight: 66,
  background: "var(--color-success-soft)",
  borderColor: "var(--color-success-border)",
  color: "var(--color-success-text)",
};

const customRemoveButton = {
  width: "100%",
  minHeight: 34,
};
