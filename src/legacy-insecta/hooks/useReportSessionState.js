import { useEffect, useState } from "react";

import { salvarRelatorioLocal } from "../utils/relatoriosLocais.js";

export function useReportSessionState({
  disciplinaAtualId,
  professorId,
  professorNome,
}) {
  const [ordem, setOrdem] = useState("");
  const [ordemStack, setOrdemStack] = useState([]);
  const [mode, setMode] = useState("pratica");
  const [aluno, setAluno] = useState("");
  const [alunoId, setAlunoId] = useState("");
  const [sessaoId, setSessaoId] = useState("");
  const [sessaoCriadaEm, setSessaoCriadaEm] = useState("");
  const [sessaoContexto, setSessaoContexto] = useState({
    professorId: "",
    turmaId: "",
    turmaNome: "",
    alunoId: "",
  });
  const [statusRelatorio, setStatusRelatorio] = useState("rascunho");
  const [progressoAtual, setProgressoAtual] = useState(null);
  const [progressoRestaurado, setProgressoRestaurado] = useState(null);
  const [modoArtropode, setModoArtropode] = useState(false);
  const [totalInsetos, setTotalInsetos] = useState(1);
  const [gabarito, setGabarito] = useState([]);
  const [qtdInsetosQr, setQtdInsetosQr] = useState(0);
  const [tempoQrMinutos, setTempoQrMinutos] = useState(0);
  const [tempoPorInsetoMin, setTempoPorInsetoMin] = useState(0);
  const [insetoIndex, setInsetoIndex] = useState(1);
  const [sessao, setSessao] = useState([]);
  const [registroAtual, setRegistroAtual] = useState([]);

  useEffect(() => {
    if (!sessaoId || !sessaoContexto.alunoId) return;

    salvarRelatorioLocal(
      {
        id: sessaoId,
        disciplinaId: disciplinaAtualId,
        professorId: sessaoContexto.professorId || professorId,
        professorNome,
        turmaId: sessaoContexto.turmaId,
        turmaNome: sessaoContexto.turmaNome,
        alunoId: sessaoContexto.alunoId,
        alunoNome: aluno,
        mode,
        status: statusRelatorio,
        totalInsetos,
        tempoPorInsetoMin,
        gabarito,
        sessao,
        progresso: progressoAtual
          ? {
              ...progressoAtual,
              insetoIndex,
              modoArtropode,
              ordem,
              ordemStack,
            }
          : null,
        criadoEm: sessaoCriadaEm,
      },
      disciplinaAtualId
    ).catch((erro) => {
      console.error("Não foi possível salvar o relatório local:", erro);
    });
  }, [
    aluno,
    disciplinaAtualId,
    gabarito,
    insetoIndex,
    mode,
    modoArtropode,
    ordem,
    ordemStack,
    professorId,
    professorNome,
    progressoAtual,
    sessao,
    sessaoContexto,
    sessaoCriadaEm,
    sessaoId,
    statusRelatorio,
    tempoPorInsetoMin,
    totalInsetos,
  ]);

  return {
    aluno,
    alunoId,
    gabarito,
    insetoIndex,
    mode,
    modoArtropode,
    ordem,
    ordemStack,
    progressoAtual,
    progressoRestaurado,
    qtdInsetosQr,
    registroAtual,
    sessao,
    sessaoContexto,
    sessaoCriadaEm,
    sessaoId,
    setAluno,
    setAlunoId,
    setGabarito,
    setInsetoIndex,
    setMode,
    setModoArtropode,
    setOrdem,
    setOrdemStack,
    setProgressoAtual,
    setProgressoRestaurado,
    setQtdInsetosQr,
    setRegistroAtual,
    setSessao,
    setSessaoContexto,
    setSessaoCriadaEm,
    setSessaoId,
    setStatusRelatorio,
    setTempoPorInsetoMin,
    setTempoQrMinutos,
    setTotalInsetos,
    statusRelatorio,
    tempoPorInsetoMin,
    tempoQrMinutos,
    totalInsetos,
  };
}
