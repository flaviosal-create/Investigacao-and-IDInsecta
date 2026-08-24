import {
  lazy,
  Suspense,
  useCallback,
  useState,
} from "react";
import LayoutChave from "../components/LayoutChave.jsx";
import Placeholder3D from "./Placeholder3D";
import PerguntaAtual from "./PerguntaAtual.jsx";
import ResultadoCard from "./ResultadoIdentificacao.jsx";
import FotoInsetoControl from "./FotoInsetoControl.jsx";
import FotoInsetoAnotacaoEditor from "./FotoInsetoAnotacaoEditor.jsx";
import ToastContainer from "./ToastContainer.jsx";
import SkeletonLoader from "./SkeletonLoader.jsx";
import ProgressBar from "./ProgressBar.jsx";
import Breadcrumb from "./Breadcrumb.jsx";
import { useToast } from "../hooks/useToast.js";
import { useChaveIdentificacao } from "../hooks/useChaveIdentificacao.js";
import { useRelatorioIdentificacao } from "../hooks/useRelatorioIdentificacao.js";
import {
  formatarTempoProva,
  formatarResultado,
  getOrdemContextoAtual,
  getRotuloItem,
  getTituloExibicao,
  idsDisponiveis,
  formatarCaminhoPercorrido,
  montarCaminhoTaxonomico,
  montarHistoricoEscolha,
  montarPassoEscolha,
} from "../utils/chaveRuntime.js";

/* ====================== HELPERS ====================== */

const Modelo3DAranha = lazy(() => import("./Modelo3DAranha.jsx"));

/* ====================== ESTILOS ====================== */

const btnExport = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "44px",
  padding: "12px 14px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  cursor: "pointer",
  fontWeight: 800,
  fontSize: "clamp(12px, 2.8vw, 14px)",
  whiteSpace: "normal",
  wordBreak: "break-word",
  textAlign: "center",
  transition: "var(--btn-transition)",
};

const btnProximo = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "44px",
  padding: "12px 20px",
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
  border: "none",
  fontWeight: 900,
  color: "white",
  background: "var(--color-secondary)",
  boxShadow: "var(--shadow-md)",
  fontSize: "clamp(13px, 3vw, 15px)",
  whiteSpace: "normal",
  wordBreak: "break-word",
  transition: "var(--btn-transition)",
};

const btnFinalizar = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "44px",
  padding: "12px 20px",
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
  border: "none",
  fontWeight: 800,
  color: "white",
  background: "var(--color-warning)",
  boxShadow: "var(--shadow-md)",
  fontSize: "clamp(13px, 3vw, 15px)",
  whiteSpace: "normal",
  wordBreak: "break-word",
  transition: "var(--btn-transition)",
};

/* ====================== COMPONENTE PRINCIPAL ====================== */

export default function ChaveBase({
  titulo,
  nodes,
  startId,
  onBack,
  onResetToPrincipal,
  ordem,
  isSubKey = false,
  onResult,
  mode = "pratica",
  aluno = "",
  chaveId = "",
  insetoIndex = 1,
  totalInsetos = 1,
  tempoPorInsetoMin = 0,
  onNextInseto,
  onOpenSession,
  onProgress,
  onTerminal,
  progressoInicial = null,
  registroInicial = [],
  rotuloFoto = "Foto do inseto",
  telaProgresso = "ordem",
}) {
  const isProva = mode === "prova";
  const { toasts, removeToast, success: toastSuccess, error: toastError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const ordemContextoAtual = getOrdemContextoAtual({ ordem, titulo });
  const tituloExibicao = getTituloExibicao(titulo);
  const rotuloItem = getRotuloItem({ titulo, ordemContextoAtual });
  const registrarProgresso = useCallback(
    (estado) =>
      onProgress?.({
        ...estado,
        chaveId,
        tela: telaProgresso,
      }),
    [chaveId, onProgress, telaProgresso]
  );

  const {
    currentId,
    fotoInseto,
    fotoInsetoEdicaoConcluida,
    fotoInsetoSetas,
    handleFotoInsetoChange,
    handleFotoInsetoEdicaoConcluidaChange,
    handleFotoInsetoSetasChange,
    history,
    node,
    nodeMap,
    onReset,
    registrarTerminal,
    registro,
    result,
    resultChoice,
    setCurrentId,
    setHistory,
    setRegistro,
    setResult,
    setResultChoice,
    tempoRestante,
  } = useChaveIdentificacao({
    aluno,
    insetoIndex,
    isProva,
    mode,
    nodes,
    onProgress: registrarProgresso,
    onTerminal,
    ordemContextoAtual,
    registroInicial,
    progressoInicial,
    startId,
    tempoPorInsetoMin,
    titulo,
  });

  const permiteProximoInseto = isProva ? insetoIndex < totalInsetos : true;

  const tempoProvaTexto = formatarTempoProva({
    isProva,
    tempoPorInsetoMin,
    tempoRestante,
  });

  const caminhoTaxonomico = montarCaminhoTaxonomico({
    titulo,
    ordemContextoAtual,
    isSubKey,
    result,
  });

  const pick = (key) => {
    setIsLoading(true);
    
    if (!node || typeof node !== "object") {
      console.warn(`[${titulo}] Node inválido: ${String(currentId)}`);
      setResult("ERRO ESTRUTURAL NA CHAVE");
      setIsLoading(false);
      return;
    }

    const choice = node[key];
    if (!choice) {
      setIsLoading(false);
      return;
    }

    const step = montarPassoEscolha({
      currentId,
      node,
      key,
      choice,
      ordemContextoAtual,
    });

    const nextRegistro = [...registro, step];
    setRegistro(nextRegistro);

    if (!isProva) {
      setHistory((prev) => [
        ...prev,
        montarHistoricoEscolha({ currentId, node, key, choice }),
      ]);
    }

    if (choice.goto) {
      const routed =
        onResult?.(choice.goto, {
          rawResult: choice.result || "",
          registro: nextRegistro,
          origem: titulo,
          ordemContexto: ordemContextoAtual,
        }) === true;

      if (routed) {
        return;
      }

      console.warn(`[${titulo}] goto não resolvido: ${choice.goto}`);
      setResult(
        `ERRO NA CHAVE: destino técnico inválido (${String(choice.goto)})`
      );
      setIsLoading(false);
      return;
    }

    if (choice.result) {
      setResult(choice.result);
      setResultChoice(choice);

      registrarTerminal({
        resultado: choice.result,
        registroFinal: nextRegistro,
      });

      setIsLoading(false);
      return;
    }

    const nextId = choice.next;

    if (!nextId || !nodeMap?.[nextId]) {
      const disponiveis = idsDisponiveis(nodeMap);
      const mensagem = `ERRO NA CHAVE: próximo nó inválido (${String(nextId)})`;

      console.warn(
        `[${titulo}] ${mensagem}. Nó atual: "${currentId}". IDs disponíveis: ${disponiveis.join(
          ", "
        )}`
      );

      setResult(mensagem);
      setIsLoading(false);
      return;
    }

    setCurrentId(nextId);
    
    // Desativar loading após a transição
    setTimeout(() => setIsLoading(false), 600);
  };

  // ✅ Wrappers para handlers de export com Toast
  const handleExportTXT = () => {
    try {
      baixarTXT();
      toastSuccess("Relatório TXT baixado com sucesso");
    } catch (err) {
      console.error("Erro ao baixar TXT:", err);
      toastError("Erro ao baixar relatório TXT");
    }
  };

  const handleExportPDF = () => {
    try {
      salvarPDFviaPrint();
      toastSuccess("Diálogo de impressão/PDF aberto");
    } catch (err) {
      console.error("Erro ao salvar PDF:", err);
      toastError("Erro ao salvar relatório PDF");
    }
  };

  const handleHistorySelect = (index) => {
    if (isProva) return;

    const selected = history[index];
    if (!selected) return;

    setCurrentId(selected.id);
    setResult("");
    setResultChoice(null);
    setHistory(history.slice(0, index));
    setRegistro((prev) => prev.slice(0, index));
  };

  // Montar breadcrumb path para navegação
  const breadcrumbPath = history.map((item, idx) => ({
    id: item.id,
    title: item.title,
    number: idx + 1,
  }));

  // Calcular progresso: current (history.length + 1 pois estamos na próxima), total (estimado)
  const progressTotal = Math.max(5, history.length + 2); // Mínimo 5, ou histórico + margem
  const progressCurrent = history.length + 1;

  const caminhoPercorrido = formatarCaminhoPercorrido(registro);

  const { baixarTXT, salvarPDFviaPrint } = useRelatorioIdentificacao({
    aluno,
    caminhoTaxonomico,
    fotoInseto,
    fotoInsetoSetas,
    insetoIndex,
    isProva,
    ordemContextoAtual,
    registro,
    result,
    rotuloFoto,
    titulo,
  });

  if (!node && !result) {
    const disponiveis = idsDisponiveis(nodeMap);

    return (
      <div style={{ padding: 20 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>
          Erro: nó "{String(currentId)}" não encontrado
        </div>

        <div style={{ color: "var(--color-muted)", marginBottom: 10 }}>
          Verifique se esse id existe na configuração da chave.
        </div>

        <div
          style={{
            background: "var(--color-surface-soft)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            padding: 12,
            fontSize: 14,
            color: "var(--color-text)",
            whiteSpace: "pre-wrap",
          }}
        >
          IDs disponíveis:{" "}
          {disponiveis.length ? disponiveis.join(", ") : "nenhum"}
        </div>
      </div>
    );
  }

 return (
  <>
    <ToastContainer toasts={toasts} onRemove={removeToast} />
    {isLoading && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.95)',
        zIndex: 1000,
        backdropFilter: 'blur(2px)'
      }}>
        <SkeletonLoader type="card" count={1} />
      </div>
    )}
    <LayoutChave
      title={tituloExibicao}
      onBack={isProva ? undefined : onBack}
    onReset={isProva ? undefined : onReset}
    ordem={ordemContextoAtual}
    caminhoTaxonomico={caminhoTaxonomico}
    mode={mode}
    insetoIndex={insetoIndex}
    totalInsetos={totalInsetos}
    itemLabel={rotuloItem.charAt(0).toUpperCase() + rotuloItem.slice(1)}
    tempoProvaTexto={tempoProvaTexto}
    onOpenSession={onOpenSession}
    history={isProva ? [] : history}
    onHistorySelect={handleHistorySelect}
    showResult={!!result}
  >
    {result ? (
  <ResultadoCard
    tag={
      resultChoice?.has3d
        ? "Modelo 3D"
        : resultChoice?.image
        ? "Imagem"
        : "Resultado"
    }
    tituloResultado={formatarResultado(result)}
    isProva={isProva}
    aluno={aluno}
    ordemContextoAtual={ordemContextoAtual}
    caminhoTaxonomico={caminhoTaxonomico}
    registro={registro}
    caminhoPercorrido={caminhoPercorrido}
    onNextInseto={onNextInseto}
    permiteProximoInseto={permiteProximoInseto}
    onReset={onReset}
    onResetToPrincipal={onResetToPrincipal}
    onOpenSession={onOpenSession}
    isSubKey={isSubKey}
    onBack={onBack}
    baixarTXT={handleExportTXT}
    salvarPDFviaPrint={handleExportPDF}
    btnExport={btnExport}
    btnProximo={btnProximo}
    btnFinalizar={btnFinalizar}
    rotuloItem={rotuloItem}
    insetoIndex={insetoIndex}
    totalInsetos={totalInsetos}
  >

    {/* 🔹 MODELO 3D */}
    {resultChoice?.has3d ? (
      <div style={{ marginTop: 16 }}>
        <Suspense fallback={<Placeholder3D label="Carregando modelo 3D..." />}>
          <Modelo3DAranha src={resultChoice.model3d} />
        </Suspense>
      </div>
    ) : resultChoice?.image ? (

      /* 🔹 IMAGEM */
      <div style={{ marginTop: 16 }}>
        <img
          src={resultChoice.image}
          alt="Resultado"
          style={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 16,
            display: "block",
            margin: "0 auto",
            boxShadow: "0 12px 28px rgba(15,23,42,0.12)",
          }}
        />
      </div>

    ) : (

      /* 🔹 PLACEHOLDER */
      <Placeholder3D titulo={formatarResultado(result)} />

    )}

    {!fotoInseto ? (
      <FotoInsetoControl
        titulo={rotuloFoto}
        alt={rotuloFoto}
        fotoInseto={fotoInseto}
        onFotoInsetoChange={handleFotoInsetoChange}
      />
    ) : null}

    <FotoInsetoAnotacaoEditor
      foto={fotoInseto}
      edicaoConcluida={fotoInsetoEdicaoConcluida}
      onEdicaoConcluidaChange={handleFotoInsetoEdicaoConcluidaChange}
      setas={fotoInsetoSetas}
      onSetasChange={handleFotoInsetoSetasChange}
      onFotoChange={handleFotoInsetoChange}
      rotuloFoto={rotuloFoto}
      titulo="Identificações na foto"
    />

  </ResultadoCard>
) : (
  <div style={{ width: "100%" }}>
    {/* Progress Bar */}
    {!isProva && (
      <ProgressBar
        current={progressCurrent}
        total={progressTotal}
        label={ordemContextoAtual}
      />
    )}

    {/* Breadcrumb Interativo */}
    {!isProva && breadcrumbPath.length > 0 && (
      <Breadcrumb
        path={breadcrumbPath}
        currentId={currentId}
        onNavigate={handleHistorySelect}
      />
    )}

    {/* Pergunta Atual */}
    <PerguntaAtual node={node} pick={pick} mode={mode} />
  </div>
)}
  </LayoutChave>
  </>
);
}
