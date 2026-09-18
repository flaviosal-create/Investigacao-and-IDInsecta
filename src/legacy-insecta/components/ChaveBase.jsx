import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
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
import { MethodEvaluationCard } from "../../components/MethodEvaluationCard.jsx";
import { normalizeKeyEvents, getSpecimenCode } from "../../utils/studyInstrumentation.js";
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

function ResultMedia({ result, resultChoice }) {
  if (resultChoice?.has3d) {
    return (
      <div style={{ marginTop: 16 }}>
        <Suspense fallback={<Placeholder3D label="Carregando modelo 3D..." />}>
          <Modelo3DAranha src={resultChoice.model3d} />
        </Suspense>
      </div>
    );
  }

  if (resultChoice?.image) {
    return (
      <div style={{ marginTop: 16 }}>
        <img
          src={resultChoice.image}
          alt="Resultado"
          style={{
            width: "100%", maxWidth: 420, borderRadius: 16, display: "block",
            margin: "0 auto", boxShadow: "0 12px 28px rgba(15,23,42,0.12)",
          }}
        />
      </div>
    );
  }

  return <Placeholder3D titulo={formatarResultado(result)} />;
}

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

function KeyResultView({ view }) {
  const {
    result, resultChoice, isProva, aluno, ordemContextoAtual, caminhoTaxonomico,
    registro, caminhoPercorrido, onNextInseto, permiteProximoInseto, onReset,
    onResetToPrincipal, onOpenSession, isSubKey, onBack, handleExportTXT,
    handleExportPDF, rotuloItem, insetoIndex, totalInsetos, fotoInseto,
    handleFotoInsetoChange, fotoInsetoEdicaoConcluida,
    handleFotoInsetoEdicaoConcluidaChange, fotoInsetoSetas,
    handleFotoInsetoSetasChange, chaveId, titulo, rotuloFoto,
  } = view;

  return (
    <ResultadoCard
      tag={resultChoice?.has3d ? "Modelo 3D" : resultChoice?.image ? "Imagem" : "Resultado"}
      tituloResultado={formatarResultado(result)} isProva={isProva} aluno={aluno}
      ordemContextoAtual={ordemContextoAtual} caminhoTaxonomico={caminhoTaxonomico}
      registro={registro} caminhoPercorrido={caminhoPercorrido} onNextInseto={onNextInseto}
      permiteProximoInseto={permiteProximoInseto} onReset={onReset}
      onResetToPrincipal={onResetToPrincipal} onOpenSession={onOpenSession}
      isSubKey={isSubKey} onBack={onBack} baixarTXT={handleExportTXT}
      salvarPDFviaPrint={handleExportPDF} btnExport={btnExport} btnProximo={btnProximo}
      btnFinalizar={btnFinalizar} rotuloItem={rotuloItem} insetoIndex={insetoIndex}
      totalInsetos={totalInsetos}
    >
      <ResultMedia result={result} resultChoice={resultChoice} />
      {!fotoInseto ? (
        <FotoInsetoControl titulo={rotuloFoto} alt={rotuloFoto} fotoInseto={fotoInseto} onFotoInsetoChange={handleFotoInsetoChange} />
      ) : null}
      <FotoInsetoAnotacaoEditor
        foto={fotoInseto} edicaoConcluida={fotoInsetoEdicaoConcluida}
        onEdicaoConcluidaChange={handleFotoInsetoEdicaoConcluidaChange}
        setas={fotoInsetoSetas} onSetasChange={handleFotoInsetoSetasChange}
        onFotoChange={handleFotoInsetoChange} rotuloFoto={rotuloFoto}
        titulo="Identificações na foto"
      />
      <MethodEvaluationCard
        evaluationId={`${chaveId || titulo}-${result}`} protocolId={chaveId || titulo}
        method="chave-dicotomica"
        methodLabel={chaveId === "CHAVE ARTROPODES" ? "Chave de Arthropoda" : "Chave de Insecta"}
        methodStage="chave-dicotomica"
        stageComplete={insetoIndex >= totalInsetos}
        specimenCode={getSpecimenCode(insetoIndex)}
        eventLog={normalizeKeyEvents(registro, result)}
      />
    </ResultadoCard>
  );
}

function StructuralError({ currentId, availableIds }) {
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
        IDs disponíveis: {availableIds.length ? availableIds.join(", ") : "nenhum"}
      </div>
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div style={{
      position: "fixed", inset: 0, display: "flex", alignItems: "center",
      justifyContent: "center", background: "rgba(255, 255, 255, 0.95)",
      zIndex: 1000, backdropFilter: "blur(2px)",
    }}>
      <SkeletonLoader type="card" count={1} />
    </div>
  );
}

function NavigationProgress({ isProva, history, currentId, ordem, onNavigate }) {
  if (isProva) return null;

  const path = history.map((item, index) => ({
    id: item.id,
    title: item.title,
    number: index + 1,
  }));

  return (
    <>
      <ProgressBar current={history.length + 1} total={Math.max(5, history.length + 2)} label={ordem} />
      {path.length ? (
        <Breadcrumb path={path} currentId={currentId} onNavigate={onNavigate} />
      ) : null}
    </>
  );
}

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

  useEffect(() => {
    if (!isLoading) return undefined;

    const loadingTimer = window.setTimeout(() => setIsLoading(false), 600);
    return () => window.clearTimeout(loadingTimer);
  }, [currentId, isLoading]);

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
        setIsLoading(false);
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
    return <StructuralError currentId={currentId} availableIds={idsDisponiveis(nodeMap)} />;
  }

 return (
  <>
    <ToastContainer toasts={toasts} onRemove={removeToast} />
    {isLoading ? <LoadingOverlay /> : null}
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
      <KeyResultView view={{
        result, resultChoice, isProva, aluno, ordemContextoAtual, caminhoTaxonomico,
        registro, caminhoPercorrido, onNextInseto, permiteProximoInseto, onReset,
        onResetToPrincipal, onOpenSession, isSubKey, onBack, handleExportTXT,
        handleExportPDF, rotuloItem, insetoIndex, totalInsetos, fotoInseto,
        handleFotoInsetoChange, fotoInsetoEdicaoConcluida,
        handleFotoInsetoEdicaoConcluidaChange, fotoInsetoSetas,
        handleFotoInsetoSetasChange, chaveId, titulo, rotuloFoto,
      }} />

) : (
      <div style={{ width: "100%" }}>
        <NavigationProgress
          isProva={isProva} history={history} currentId={currentId}
          ordem={ordemContextoAtual} onNavigate={handleHistorySelect}
        />
        <PerguntaAtual node={node} pick={pick} mode={mode} />
      </div>
)}
  </LayoutChave>
  </>
);
}
