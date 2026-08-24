import { useEffect, useMemo, useRef, useState } from "react";

import {
  idsDisponiveis,
  montarPassoTempoEsgotado,
  toNodeMap,
} from "../utils/chaveRuntime.js";

function getTempoInicial({ isProva, tempoPorInsetoMin }) {
  return isProva && tempoPorInsetoMin > 0
    ? Math.round(tempoPorInsetoMin * 60)
    : null;
}

export function useChaveIdentificacao({
  aluno,
  insetoIndex,
  isProva,
  mode,
  nodes,
  onProgress,
  onTerminal,
  ordemContextoAtual,
  registroInicial = [],
  progressoInicial = null,
  startId,
  tempoPorInsetoMin,
  titulo,
}) {
  const [currentId, setCurrentId] = useState(
    progressoInicial?.currentId || startId
  );
  const [result, setResult] = useState(progressoInicial?.result || "");
  const [history, setHistory] = useState(progressoInicial?.history || []);
  const [registro, setRegistro] = useState(
    progressoInicial?.registro || registroInicial
  );
  const [resultChoice, setResultChoice] = useState(
    progressoInicial?.resultChoice || null
  );
  const [tempoRestante, setTempoRestante] = useState(() =>
    Number.isFinite(progressoInicial?.tempoRestante)
      ? progressoInicial.tempoRestante
      : getTempoInicial({ isProva, tempoPorInsetoMin })
  );
  const [fotoInseto, setFotoInseto] = useState(
    progressoInicial?.fotoInseto || ""
  );
  const [fotoInsetoSetas, setFotoInsetoSetas] = useState(
    progressoInicial?.fotoInsetoSetas || []
  );
  const [fotoInsetoEdicaoConcluida, setFotoInsetoEdicaoConcluida] = useState(
    Boolean(progressoInicial?.fotoInsetoEdicaoConcluida)
  );

  const prevDeps = useRef({
    insetoIndex,
    isProva,
    nodes,
    startId,
    tempoPorInsetoMin,
  });
  const nodeMap = useMemo(() => toNodeMap(nodes), [nodes]);
  const node = nodeMap?.[currentId];

  useEffect(() => {
    onProgress?.({
      currentId,
      fotoInseto,
      fotoInsetoEdicaoConcluida,
      fotoInsetoSetas,
      history,
      registro,
      result,
      resultChoice,
      tempoRestante,
    });
  }, [
    currentId,
    fotoInseto,
    fotoInsetoEdicaoConcluida,
    fotoInsetoSetas,
    history,
    onProgress,
    registro,
    result,
    resultChoice,
    tempoRestante,
  ]);

  useEffect(() => {
    if (
      prevDeps.current.insetoIndex !== insetoIndex ||
      prevDeps.current.isProva !== isProva ||
      prevDeps.current.startId !== startId ||
      prevDeps.current.nodes !== nodes ||
      prevDeps.current.tempoPorInsetoMin !== tempoPorInsetoMin
    ) {
      prevDeps.current = {
        insetoIndex,
        isProva,
        nodes,
        startId,
        tempoPorInsetoMin,
      };
      setCurrentId(startId);
      setResult("");
      setResultChoice(null);
      setFotoInseto("");
      setFotoInsetoEdicaoConcluida(false);
      setFotoInsetoSetas([]);
      setHistory([]);
      setRegistro(registroInicial || []);
      setTempoRestante(getTempoInicial({ isProva, tempoPorInsetoMin }));
    }
  }, [
    insetoIndex,
    isProva,
    nodes,
    registroInicial,
    startId,
    tempoPorInsetoMin,
  ]);

  useEffect(() => {
    if (!isProva || tempoPorInsetoMin <= 0 || result || tempoRestante === null) {
      return undefined;
    }

    const id = window.setTimeout(() => {
      if (tempoRestante <= 1) {
        const timeoutStep = montarPassoTempoEsgotado({
          currentId,
          node,
          ordemContextoAtual,
        });
        const nextRegistro = [...registro, timeoutStep];

        setTempoRestante(0);
        setRegistro(nextRegistro);
        setResult("TEMPO ESGOTADO");
        setResultChoice(null);

        onTerminal?.({
          inseto: insetoIndex,
          tituloDaChave: titulo,
          ordemContexto: ordemContextoAtual,
          resultado: "TEMPO ESGOTADO",
          registro: nextRegistro,
          fotoInseto,
          fotoInsetoEdicaoConcluida,
          fotoInsetoSetas,
          mode,
          aluno,
        });
        return;
      }

      setTempoRestante(tempoRestante - 1);
    }, 1000);

    return () => window.clearTimeout(id);
  }, [
    aluno,
    currentId,
    fotoInseto,
    fotoInsetoEdicaoConcluida,
    fotoInsetoSetas,
    insetoIndex,
    isProva,
    mode,
    node,
    onTerminal,
    ordemContextoAtual,
    registro,
    result,
    tempoPorInsetoMin,
    tempoRestante,
    titulo,
  ]);

  useEffect(() => {
    if (!startId) {
      console.warn(`[${titulo}] startId indefinido.`);
      return;
    }

    if (!nodeMap?.[startId]) {
      console.warn(
        `[${titulo}] startId "${String(
          startId
        )}" não encontrado. IDs disponíveis: ${idsDisponiveis(nodeMap).join(
          ", "
        )}`
      );
    }
  }, [startId, nodeMap, titulo]);

  function onReset() {
    setCurrentId(startId);
    setResult("");
    setResultChoice(null);
    setHistory([]);
    setRegistro([]);
    setFotoInseto("");
    setFotoInsetoEdicaoConcluida(false);
    setFotoInsetoSetas([]);
    setTempoRestante(getTempoInicial({ isProva, tempoPorInsetoMin }));
  }

  function registrarTerminal({
    resultado,
    registroFinal,
    foto = fotoInseto,
    edicaoConcluida = fotoInsetoEdicaoConcluida,
    setasFoto = fotoInsetoSetas,
  }) {
    onTerminal?.({
      inseto: insetoIndex,
      tituloDaChave: titulo,
      ordemContexto: ordemContextoAtual,
      resultado,
      registro: registroFinal,
      fotoInseto: foto,
      fotoInsetoEdicaoConcluida: edicaoConcluida,
      fotoInsetoSetas: setasFoto,
      mode,
      aluno,
    });
  }

  function handleFotoInsetoChange(foto) {
    setFotoInseto(foto);
    setFotoInsetoEdicaoConcluida(false);
    if (!foto) setFotoInsetoSetas([]);

    if (!result) return;

    registrarTerminal({
      resultado: result,
      registroFinal: registro,
      foto,
      edicaoConcluida: false,
      setasFoto: foto ? fotoInsetoSetas : [],
    });
  }

  function handleFotoInsetoSetasChange(setas) {
    setFotoInsetoSetas(setas);
    setFotoInsetoEdicaoConcluida(false);

    if (!result) return;

    registrarTerminal({
      resultado: result,
      registroFinal: registro,
      edicaoConcluida: false,
      setasFoto: setas,
    });
  }

  function handleFotoInsetoEdicaoConcluidaChange(concluida) {
    setFotoInsetoEdicaoConcluida(concluida);

    if (!result) return;

    registrarTerminal({
      resultado: result,
      registroFinal: registro,
      edicaoConcluida: concluida,
    });
  }

  return {
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
  };
}
