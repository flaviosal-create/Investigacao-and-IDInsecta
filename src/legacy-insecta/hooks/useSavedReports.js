import { useEffect, useMemo, useState } from "react";

import { DISCIPLINA_PADRAO_ID } from "../utils/ambienteEscolar.js";
import {
  atualizarStatusRelatorioLocal,
  listarRelatoriosLocais,
  removerRelatorioLocal,
} from "../utils/relatoriosLocais.js";
import {
  inferirContextoTipoRelatorio,
  obterApresentacaoTipoRelatorio,
} from "../utils/tiposRelatorio.js";
import { obterResumoListaRelatorio } from "../utils/relatorioTipoDetalhes.js";
import { resumirTiposAcompanhamento } from "../utils/relatoriosApresentacao.js";

export function useSavedReports({
  ambiente,
  authSession,
  disciplinaId,
  remotoAtivo,
  onEnviarRelatorio,
  onListarRelatoriosRemotos,
  onRevisarRelatorio,
  alunoFiltroId = "",
}) {
  const [relatorios, setRelatorios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [relatorioAbertoId, setRelatorioAbertoId] = useState("");
  const [feedbacks, setFeedbacks] = useState({});
  const [revisandoId, setRevisandoId] = useState("");
  const [filtros, setFiltros] = useState({
    turmaId: "",
    alunoId: "",
    status: "",
    origem: "",
    busca: "",
  });
  const [turmaAcompanhamentoId, setTurmaAcompanhamentoId] = useState("");
  const [filtroAcompanhamento, setFiltroAcompanhamento] = useState("todos");
  const [abaRelatorios, setAbaRelatorios] = useState("relatorios");

  useEffect(() => {
    const carregar = async () => {
      const locais = (await listarRelatoriosLocais(disciplinaId)).map((item) => ({
        ...item,
        origem: "local",
      }));
      const podeConsultarRemoto = remotoAtivo ?? Boolean(authSession?.user);
      const remotos = podeConsultarRemoto
        ? await onListarRelatoriosRemotos?.()
        : [];
      const porId = new Map(locais.map((item) => [item.id, item]));
      (remotos || [])
        .filter((item) => relatorioDaDisciplina(item, disciplinaId))
        .forEach((item) => porId.set(item.id, item));
      return [...porId.values()]
        .filter((item) => !alunoFiltroId || item.alunoId === alunoFiltroId)
        .sort((a, b) => new Date(b.atualizadoEm) - new Date(a.atualizadoEm));
    };

    carregar()
      .then(setRelatorios)
      .catch(() => setErro("Não foi possível consultar os relatórios."))
      .finally(() => setCarregando(false));
  }, [
    alunoFiltroId,
    authSession?.user,
    disciplinaId,
    onListarRelatoriosRemotos,
    remotoAtivo,
  ]);

  const nomesTurmas = useMemo(
    () => Object.fromEntries((ambiente.turmas || []).map((turma) => [turma.id, turma.nome])),
    [ambiente.turmas]
  );

  const relatoriosFiltrados = useMemo(() => {
    const busca = normalizarBusca(filtros.busca);

    return relatorios.filter((relatorio) => {
      if (filtros.turmaId && relatorio.turmaId !== filtros.turmaId) return false;
      if (filtros.alunoId && relatorio.alunoId !== filtros.alunoId) return false;
      if (filtros.status && relatorio.status !== filtros.status) return false;
      if (filtros.origem && relatorio.origem !== filtros.origem) return false;

      if (busca) {
        const texto = normalizarBusca(
          [
            relatorio.alunoNome,
            relatorio.turmaNome,
            nomesTurmas[relatorio.turmaId],
            relatorio.mode,
            relatorio.status,
            relatorio.origem,
          ].join(" ")
        );
        if (!texto.includes(busca)) return false;
      }

      return true;
    });
  }, [filtros, nomesTurmas, relatorios]);

  const opcoesFiltro = useMemo(() => {
    const turmas = new Map();
    const alunos = new Map();

    relatorios.forEach((relatorio) => {
      if (relatorio.turmaId) {
        turmas.set(
          relatorio.turmaId,
          nomesTurmas[relatorio.turmaId] || relatorio.turmaNome || "Sem turma"
        );
      }
      if (relatorio.alunoId) {
        alunos.set(relatorio.alunoId, relatorio.alunoNome || "Aluno sem nome");
      }
    });

    return {
      turmas: [...turmas.entries()].sort((a, b) => a[1].localeCompare(b[1], "pt-BR")),
      alunos: [...alunos.entries()].sort((a, b) => a[1].localeCompare(b[1], "pt-BR")),
    };
  }, [nomesTurmas, relatorios]);

  const resumo = useMemo(() => {
    const enviados = relatorios.filter((item) => item.status === "enviado").length;
    const concluidos = relatorios.filter((item) => item.status === "concluido").length;
    const rascunhos = relatorios.filter((item) => item.status === "rascunho").length;
    const nuvem = relatorios.filter((item) => item.origem === "nuvem").length;

    return { total: relatorios.length, enviados, concluidos, rascunhos, nuvem };
  }, [relatorios]);

  const acompanhamento = useMemo(() => {
    const turmas = ambiente.turmas || [];
    const turma =
      turmas.find((item) => item.id === turmaAcompanhamentoId) || turmas[0] || null;
    const alunos = turma?.alunos || [];

    const linhas = alunos.map((aluno) => {
      const relatorioMaisRecente = relatorios
        .filter(
          (relatorio) =>
            relatorio.turmaId === turma.id && relatorio.alunoId === aluno.id
        )
        .sort((a, b) => new Date(b.atualizadoEm) - new Date(a.atualizadoEm))[0];
      const apresentacao = relatorioMaisRecente
        ? obterApresentacaoTipoRelatorio(
            inferirContextoTipoRelatorio(relatorioMaisRecente)
          )
        : null;

      return {
        aluno,
        apresentacao,
        relatorio: relatorioMaisRecente || null,
        resumoRapido: relatorioMaisRecente
          ? obterResumoListaRelatorio(relatorioMaisRecente, apresentacao)
          : null,
        situacao: situacaoAcompanhamento(relatorioMaisRecente),
      };
    });

    const enviados = linhas.filter((linha) =>
      ["enviado", "revisado"].includes(linha.relatorio?.status)
    ).length;
    const revisados = linhas.filter(
      (linha) => linha.relatorio?.status === "revisado"
    ).length;
    const faltando = linhas.filter(
      (linha) =>
        !linha.relatorio ||
        ["rascunho", "concluido"].includes(linha.relatorio.status)
    ).length;

    return {
      faltando,
      linhas,
      revisados,
      resumoTipos: resumirTiposAcompanhamento(linhas),
      enviados,
      total: alunos.length,
      turma,
      turmas,
    };
  }, [ambiente.turmas, relatorios, turmaAcompanhamentoId]);

  const abasRelatorios = !alunoFiltroId
    ? [
        ["relatorios", "Relatórios"],
        ...(acompanhamento.turma ? [["acompanhamento", "Acompanhamento"]] : []),
      ]
    : [];

  const abaAtivaRelatorios = abasRelatorios.some(([id]) => id === abaRelatorios)
    ? abaRelatorios
    : "relatorios";

  function atualizarFiltro(campo, valor) {
    setFiltros((atuais) => ({
      ...atuais,
      [campo]: valor,
      ...(campo === "turmaId" ? { alunoId: "" } : {}),
    }));
  }

  async function remover(id) {
    await removerRelatorioLocal(id);
    setRelatorios((atuais) => atuais.filter((relatorio) => relatorio.id !== id));
  }

  async function enviar(relatorio) {
    setErro("");
    setMensagem("");
    try {
      await onEnviarRelatorio?.(relatorio);
      await atualizarStatusRelatorioLocal(relatorio.id, "enviado");
      setRelatorios((atuais) =>
        atuais.map((item) =>
          item.id === relatorio.id
            ? { ...item, status: "enviado", origem: "nuvem" }
            : item
        )
      );
      setMensagem("Relatório enviado ao professor e marcado como enviado.");
    } catch (error) {
      setErro(error?.message || "Não foi possível enviar o relatório.");
    }
  }

  async function revisar(relatorio) {
    const feedback = feedbacks[relatorio.id] ?? relatorio.revisaoProfessor?.comentario ?? "";
    const apresentacao = obterApresentacaoTipoRelatorio(
      inferirContextoTipoRelatorio(relatorio)
    );
    setErro("");
    setMensagem("");

    try {
      setRevisandoId(relatorio.id);
      const revisao = await onRevisarRelatorio?.({
        feedback,
        relatorioId: relatorio.id,
      });

      setRelatorios((atuais) =>
        atuais.map((item) =>
          item.id === relatorio.id
            ? {
                ...item,
                status: revisao?.status || "revisado",
                revisaoProfessor:
                  revisao?.revisaoProfessor || {
                    comentario: feedback.trim(),
                    revisadoEm: new Date().toISOString(),
                  },
                atualizadoEm: revisao?.atualizadoEm || new Date().toISOString(),
              }
            : item
        )
      );
      setMensagem(apresentacao.politicaRevisao.mensagemSucesso);
    } catch (error) {
      setErro(error?.message || "Não foi possível revisar o relatório.");
    } finally {
      setRevisandoId("");
    }
  }

  function abrirRelatorioDoAcompanhamento(relatorio) {
    setFiltros({
      alunoId: relatorio.alunoId || "",
      busca: "",
      origem: "",
      status: "",
      turmaId: relatorio.turmaId || "",
    });
    setRelatorioAbertoId(relatorio.id);
    setAbaRelatorios("relatorios");
  }

  async function copiarFaltantesAcompanhamento() {
    const faltantes = acompanhamento.linhas.filter((linha) =>
      ["faltando", "rascunho", "pendente"].includes(linha.situacao.tipo)
    );

    if (!faltantes.length) {
      setMensagem("Todos os alunos desta turma já enviaram relatório.");
      return;
    }

    const texto = [
      `Alunos pendentes - ${acompanhamento.turma?.nome || "turma"}`,
      "",
      ...faltantes.map(
        (linha, indice) =>
          `${indice + 1}. ${linha.aluno.nome || "Aluno sem nome"} - ${linha.situacao.rotulo}`
      ),
    ].join("\n");

    try {
      await copiarTexto(texto);
      setMensagem("Lista de faltantes copiada.");
    } catch {
      setErro("Não foi possível copiar a lista de faltantes neste navegador.");
    }
  }

  return {
    abaAtivaRelatorios,
    abasRelatorios,
    acompanhamento,
    abrirRelatorioDoAcompanhamento,
    abaRelatorios,
    atualizarFiltro,
    carregando,
    copiarFaltantesAcompanhamento,
    enviar,
    erro,
    feedbacks,
    filtroAcompanhamento,
    filtros,
    mensagem,
    nomesTurmas,
    opcoesFiltro,
    relatorioAbertoId,
    relatorios,
    relatoriosFiltrados,
    remover,
    resumo,
    revisar,
    revisandoId,
    setAbaRelatorios,
    setFeedbacks,
    setFiltroAcompanhamento,
    setFiltros,
    setRelatorioAbertoId,
    setTurmaAcompanhamentoId,
  };
}

function relatorioDaDisciplina(relatorio, disciplinaId) {
  return (
    normalizarDisciplinaId(relatorio?.disciplinaId || DISCIPLINA_PADRAO_ID) ===
    normalizarDisciplinaId(disciplinaId || DISCIPLINA_PADRAO_ID)
  );
}

function normalizarDisciplinaId(valor) {
  return (
    String(valor || DISCIPLINA_PADRAO_ID)
      .trim()
      .toLocaleLowerCase("pt-BR")
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "") || DISCIPLINA_PADRAO_ID
  );
}

function normalizarBusca(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

async function copiarTexto(texto) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(texto);
    return;
  }

  const area = document.createElement("textarea");
  area.value = texto;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  const copiado = document.execCommand("copy");
  area.remove();

  if (!copiado) {
    throw new Error("Cópia não permitida.");
  }
}

function situacaoAcompanhamento(relatorio) {
  if (!relatorio) {
    return { rotulo: "Não enviou", tipo: "faltando" };
  }

  if (relatorio.status === "revisado") {
    return { rotulo: "Revisado", tipo: "revisado" };
  }

  if (relatorio.status === "enviado") {
    return { rotulo: "Enviado", tipo: "enviado" };
  }

  if (relatorio.status === "concluido") {
    return { rotulo: "Pronto local", tipo: "pendente" };
  }

  return { rotulo: "Rascunho", tipo: "rascunho" };
}
