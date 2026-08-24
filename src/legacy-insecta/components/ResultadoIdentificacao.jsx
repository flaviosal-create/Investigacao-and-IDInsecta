import { formatarContextoChave } from "../utils/chaveRuntime.js";

function MetaResumo({ aluno, ordemContextoAtual, caminhoTaxonomico }) {
  const ordemExibicao = formatarContextoChave(ordemContextoAtual);
  const caminhoExibicao = caminhoTaxonomico
    .map((parte) => formatarContextoChave(parte))
    .filter(Boolean);

  return (
    <>
      {aluno ? (
        <div style={metaLinha}>
          <strong>Aluno:</strong> {aluno}
        </div>
      ) : null}

      {ordemExibicao ? (
        <div
          style={{
            ...metaLinha,
            color: "var(--color-danger-text)",
            fontWeight: 700,
            background: "var(--color-danger-soft)",
            border: "2px solid var(--color-danger-border)",
            borderRadius: 12,
            padding: "10px 12px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <strong>Ordem/Contexto:</strong> {ordemExibicao}
        </div>
      ) : null}

      {caminhoExibicao.length > 0 ? (
        <div style={metaLinha}>
          <strong>Caminho taxonômico:</strong>{" "}
          {caminhoExibicao.join(" > ")}
        </div>
      ) : null}
    </>
  );
}

function RegistroLista({ registro, ordemContextoAtual }) {
  const ordemExibicao = formatarContextoChave(ordemContextoAtual);
  const indiceOrdem = registro.findIndex((r) => {
    const contexto = formatarContextoChave(r.contextoVisual || r.goto || "");
    return contexto === ordemExibicao;
  });

  return (
    <div className="resultado-identificacao__registro-lista" style={relatorioLista}>
      {registro.map((r, i) => {
        const destacarOrdem = indiceOrdem >= 0 && i <= indiceOrdem;

        return (
          <div
            key={i}
            className="resultado-identificacao__registro-item"
            style={{
              ...relatorioItem,
              border: destacarOrdem
                ? "2px solid var(--color-danger-border)"
                : relatorioItem.border,
              background: destacarOrdem
                ? "var(--color-danger-soft)"
                : relatorioItem.background,
            }}
          >
            <div
              style={{
                ...relatorioItemTexto,
                color: destacarOrdem ? "var(--color-danger-text)" : "var(--color-text)",
                fontWeight: destacarOrdem ? 700 : 400,
              }}
            >
              <strong>{r.passo}</strong> ({r.alternativa}) - {r.escolha}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ResultActions({
  isProva,
  onNextInseto,
  permiteProximoInseto,
  onReset,
  onResetToPrincipal,
  onOpenSession,
  isSubKey,
  onBack,
  baixarTXT,
  salvarPDFviaPrint,
  btnExport,
  btnProximo,
  btnFinalizar,
  rotuloItem,
  insetoIndex,
  totalInsetos,
  mostrarExportacao = true,
}) {
  const finalizarSessao = isProva && onOpenSession
    ? onOpenSession
    : onResetToPrincipal || onBack;

  return (
    <div className="resultado-identificacao__acoes" style={relatorioAcoes}>
      {mostrarExportacao ? (
        <>
          <button type="button" style={btnExport} onClick={baixarTXT}>
            Baixar TXT
          </button>

          <button type="button" style={btnExport} onClick={salvarPDFviaPrint}>
            Salvar PDF
          </button>
        </>
      ) : null}

      {!isProva ? (
        <button type="button" style={btnProximo} onClick={onReset}>
          Reiniciar chave
        </button>
      ) : null}

      {permiteProximoInseto && onNextInseto ? (
        <button
          type="button"
          style={btnProximo}
          onClick={() => onNextInseto?.()}
        >
          Próximo {rotuloItem} ({insetoIndex}/{totalInsetos})
        </button>
      ) : (
        <button
          type="button"
          style={btnFinalizar}
          onClick={finalizarSessao}
        >
          Finalizar sessão
        </button>
      )}

      {!isProva && isSubKey && onBack ? (
        <button type="button" style={btnExport} onClick={onBack}>
          Voltar
        </button>
      ) : null}
    </div>
  );
}

export default function ResultadoCard({
  tag,
  tituloResultado,
  isProva,
  aluno,
  ordemContextoAtual,
  caminhoTaxonomico,
  registro,
  caminhoPercorrido,
  onNextInseto,
  permiteProximoInseto,
  onReset,
  onResetToPrincipal,
  onOpenSession,
  isSubKey,
  onBack,
  baixarTXT,
  salvarPDFviaPrint,
  btnExport,
  btnProximo,
  btnFinalizar,
  rotuloItem,
  insetoIndex,
  totalInsetos,
  children,
  mostrarExportacao = true,
  mostrarAcoes = true,
}) {
  return (
    <div className="resultado-identificacao" style={resultadoBox}>
      <div className="resultado-identificacao__tag" style={resultadoTag}>
        {tag}
      </div>

      <div className="resultado-identificacao__titulo" style={resultadoTitulo}>
        {tituloResultado}
      </div>

      <div className="resultado-identificacao__relatorio" style={relatorioBox}>
        <div className="resultado-identificacao__relatorio-titulo" style={relatorioTitulo}>
          {isProva ? "Relatório da identificação" : "Caminho da identificação"}
        </div>

        <MetaResumo
          aluno={aluno}
          ordemContextoAtual={ordemContextoAtual}
          caminhoTaxonomico={caminhoTaxonomico}
        />

        {children}

        {registro.length > 0 ? (
          <div className="resultado-identificacao__caminho-resumo" style={{ marginBottom: 12, marginTop: 16 }}>
            <strong>Caminho percorrido:</strong>

            <div className="resultado-identificacao__caminho-box" style={caminhoBox}>
              {caminhoPercorrido}
            </div>
          </div>
        ) : null}

        <RegistroLista
          registro={registro}
          ordemContextoAtual={ordemContextoAtual}
        />

        {mostrarAcoes ? (
          <ResultActions
            isProva={isProva}
            onNextInseto={onNextInseto}
            permiteProximoInseto={permiteProximoInseto}
            onReset={onReset}
            onResetToPrincipal={onResetToPrincipal}
            onOpenSession={onOpenSession}
            isSubKey={isSubKey}
            onBack={onBack}
            baixarTXT={baixarTXT}
            salvarPDFviaPrint={salvarPDFviaPrint}
            btnExport={btnExport}
            btnProximo={btnProximo}
            btnFinalizar={btnFinalizar}
            rotuloItem={rotuloItem}
            insetoIndex={insetoIndex}
            totalInsetos={totalInsetos}
            mostrarExportacao={mostrarExportacao}
          />
        ) : null}
      </div>
    </div>
  );
}

const resultadoBox = {
  textAlign: "center",
  padding: "22px 20px",
  borderRadius: 18,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  boxSizing: "border-box",
};

const resultadoTag = {
  fontSize: "clamp(12px, 2.8vw, 13px)",
  color: "var(--color-info)",
  marginBottom: 8,
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: 0.5,
};

const resultadoTitulo = {
  fontSize: "clamp(22px, 5vw, 30px)",
  fontWeight: 900,
  color: "var(--color-primary)",
};

const relatorioBox = {
  marginTop: 18,
  textAlign: "left",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 16,
  padding: 18,
  boxSizing: "border-box",
};

const relatorioTitulo = {
  fontWeight: 900,
  color: "var(--color-text)",
  marginBottom: 10,
  fontSize: "clamp(15px, 3vw, 17px)",
};

const metaLinha = {
  marginBottom: 8,
  fontSize: "clamp(13px, 3vw, 15px)",
  lineHeight: 1.55,
  wordBreak: "break-word",
};

const caminhoBox = {
  marginTop: 10,
  fontSize: "clamp(13px, 2.8vw, 14px)",
  color: "var(--color-muted)",
  lineHeight: 1.6,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  padding: 12,
  wordBreak: "break-word",
  overflowWrap: "anywhere",
};

const relatorioLista = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  fontSize: "clamp(13px, 2.8vw, 15px)",
  color: "var(--color-text)",
};

const relatorioItem = {
  padding: "12px 14px",
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const relatorioItemTexto = {
  wordBreak: "break-word",
  lineHeight: 1.6,
};

const relatorioAcoes = {
  display: "flex",
  gap: 10,
  justifyContent: "center",
  flexWrap: "wrap",
  marginTop: 16,
};
