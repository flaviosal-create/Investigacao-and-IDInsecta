import { useEffect, useMemo, useRef, useState } from "react";

import FluxoEtapasCard from "../components/FluxoEtapasCard.jsx";
import FotoAnotadaEditor from "../components/FotoAnotadaEditor.jsx";
import FotoInsetoControl from "../components/FotoInsetoControl.jsx";
import FotoAnotadaImagem from "./FotoAnotadaImagem.jsx";
import RoteiroPratica from "./RoteiroPratica.jsx";
import { roteiroColecaoMicroscopioEstereoscopico } from "./roteirosPraticas.js";
import {
  coresSetasPadrao,
  criarAvisosRevisao,
  criarRegistroFotoAnotada,
  criarSetaFotoAnotada,
  normalizarFonteSeta,
  normalizarRotacaoSeta,
  normalizarTamanhoSeta,
  registroTemConteudo,
  textoLegendaSeta,
} from "./fotoAnotadaModel.js";
import {
  carregarRascunhoFotoAnotada,
  limparRascunhoFotoAnotada,
  salvarRascunhoFotoAnotada,
} from "./fotoAnotadaStorage.js";
import {
  carregarImagensEtapasHistologia,
} from "../services/histologiaEtapasImagens.js";
import { salvarRelatorioLocal } from "../utils/relatoriosLocais.js";
import { criarId } from "../utils/ambienteEscolar.js";
import { escapeHtml } from "../utils/text.js";

const coresSetas = coresSetasPadrao;

const configColecaoEstereoscopico = {
  roteiro: roteiroColecaoMicroscopioEstereoscopico,
  titulo: "Observar coleção em microscópio estereoscópico",
  intro:
    "Registre cada espécime de coleção seca ou molhada, fotografe o material e use setas coloridas para montar a legenda das estruturas observadas.",
  tituloRelatorio: "Relatório - Observação em microscópio estereoscópico",
  novoRegistro: "Novo espécime",
  itemFallback: "Espécime",
  tituloFallbackRelatorio: "Espécime sem identificação",
  idPrefix: "especime",
  campoIdentificacao: "Identificação do espécime",
  placeholderIdentificacao:
    "Ex.: coleção seca - gafanhoto; coleção molhada - crustáceo...",
  tituloFoto: "Foto do espécime",
  altFoto: "Foto do espécime observado",
  altRelatorio: "Registro do espécime",
  metaLabel: "Tipo de coleção",
  metaDefault: "seca",
  metaOptions: [
    ["seca", "Coleção seca"],
    ["molhada", "Coleção molhada"],
  ],
};

const registroInicial = criarRegistroFotoAnotada;

export default function AtividadeMicroscopioEstereoscopico({
  onBack,
  config = configColecaoEstereoscopico,
  idImagensDidaticas = "",
  imagensDidaticasIniciais = null,
  disciplinaId = "",
  acessoAluno = null,
  onEnviarRelatorio = null,
}) {
  const [rascunhoInicial] = useState(() => carregarRascunhoFotoAnotada(config));
  const [registros, setRegistros] = useState(rascunhoInicial.registros);
  const [registroAtivoId, setRegistroAtivoId] = useState(
    rascunhoInicial.registroAtivoId,
  );
  const [relatorioId, setRelatorioId] = useState(
    () => rascunhoInicial.relatorioId || criarId("relatorio"),
  );
  const [statusRelatorio, setStatusRelatorio] = useState(
    () => rascunhoInicial.statusRelatorio || "rascunho",
  );
  const [relatorioCriadoEm, setRelatorioCriadoEm] = useState(
    () => rascunhoInicial.criadoEm || new Date().toISOString(),
  );
  const [mensagemEnvio, setMensagemEnvio] = useState("");
  const [erroEnvio, setErroEnvio] = useState("");
  const [enviandoRelatorio, setEnviandoRelatorio] = useState(false);
  const [corAtiva, setCorAtiva] = useState(coresSetas[0].id);
  const [setaAtivaId, setSetaAtivaId] = useState("");
  const [mostrarRoteiro, setMostrarRoteiro] = useState(false);
  const [mostrarRelatorio, setMostrarRelatorio] = useState(false);
  const [etapaTela, setEtapaTela] = useState(
    () => config.etapaTelaInicial || "registro",
  );
  const [subetapaRegistroId, setSubetapaRegistroId] = useState(
    () => config.subetapaRegistroInicial || "ficha",
  );
  const [sinteseMaterial, setSinteseMaterial] = useState(
    rascunhoInicial.sinteseMaterial,
  );
  const [viewportWidth, setViewportWidth] = useState(
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );
  const [rascunhoRecuperadoEm] = useState(
    rascunhoInicial.atualizadoEm,
  );
  const [rascunhoFoiLimpo, setRascunhoFoiLimpo] = useState(false);
  const [referenciaAtivaId, setReferenciaAtivaId] = useState("");
  const [imagensDidaticasRemotas, setImagensDidaticasRemotas] = useState({
    atividadeId: "",
    imagens: {},
  });
  const imagemRef = useRef(null);
  const setaSeqRef = useRef(0);

  const registroAtivo = useMemo(
    () => registros.find((registro) => registro.id === registroAtivoId) || registros[0],
    [registroAtivoId, registros],
  );
  const registrosOrdenados = useMemo(
    () => ordenarRegistrosPorMeta(config, registros),
    [config, registros],
  );
  const permiteAcompanharEtapas = Boolean(config.permiteAcompanharEtapas);
  const etapasInformativas = Boolean(config.etapasInformativas);
  const atividadeImagensId = idImagensDidaticas;
  const mobileCompacto = viewportWidth <= 560;
  const alunoOnline = Boolean(acessoAluno?.online && acessoAluno?.aluno?.id);
  const alunoDaPratica = acessoAluno?.aluno || null;
  const camposRelatorioExtras = Array.isArray(config.camposRelatorioExtras)
    ? config.camposRelatorioExtras
    : [];
  const secoesRoteiroRelatorio = useMemo(
    () => obterSecoesRoteiroRelatorio(config),
    [config],
  );
  const imagensDidaticas = useMemo(
    () => ({
      ...(imagensDidaticasIniciais || {}),
      ...(imagensDidaticasRemotas.atividadeId === atividadeImagensId
        ? imagensDidaticasRemotas.imagens
        : {}),
    }),
    [atividadeImagensId, imagensDidaticasIniciais, imagensDidaticasRemotas],
  );
  const imagemDidaticaAtual = imagensDidaticas[registroAtivo?.metaValor] || null;
  const mensagemRascunho = rascunhoFoiLimpo
    ? mobileCompacto
      ? "Novo rascunho iniciado neste aparelho."
      : "Novo rascunho iniciado neste aparelho."
    : rascunhoRecuperadoEm
      ? mobileCompacto
        ? `Recuperado às ${formatarHorarioCurto(rascunhoRecuperadoEm)} neste aparelho.`
        : `Rascunho recuperado deste aparelho. Última edição: ${formatarHorarioCurto(rascunhoRecuperadoEm)}.`
      : mobileCompacto
        ? "Salvo automaticamente neste aparelho."
        : "Rascunho salvo automaticamente neste aparelho.";

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!atividadeImagensId) return undefined;
    let ativo = true;
    carregarImagensEtapasHistologia(atividadeImagensId)
      .then((imagens) => {
        if (!ativo) return;
        setImagensDidaticasRemotas({
          atividadeId: atividadeImagensId,
          imagens,
        });
      })
      .catch(() => {
        if (!ativo) return;
        setImagensDidaticasRemotas({
          atividadeId: atividadeImagensId,
          imagens: {},
        });
      });
    return () => { ativo = false; };
  }, [atividadeImagensId]);

  useEffect(() => {
    if (!permiteAcompanharEtapas || etapasInformativas) return;
    const etapasAcompanhadas = registros.filter((registro) => registro.acompanhada);
    if (etapasAcompanhadas.length <= 1) return;

    let cancelado = false;
    queueMicrotask(() => {
      if (cancelado) return;
      setRegistros((atuais) =>
        atuais.map((registro) => ({
          ...registro,
          acompanhada: registro.id === registroAtivoId,
        })),
      );
    });
    return () => {
      cancelado = true;
    };
  }, [etapasInformativas, permiteAcompanharEtapas, registroAtivoId, registros]);

  const corSelecionada =
    coresSetas.find((cor) => cor.id === corAtiva) || coresSetas[0];
  const setasEmEdicao = (registroAtivo?.setas || []).filter(
    (seta) => !seta.concluida && (!setaAtivaId || seta.id === setaAtivaId),
  );
  const setasConcluidas = (registroAtivo?.setas || []).filter(
    (seta) => seta.concluida,
  );
  const registrosParaRelatorio = useMemo(() => {
    const expandidos = expandirRegistrosParaRelatorio(registrosOrdenados);
    const preenchidos = expandidos.filter((registro) =>
      etapasInformativas
        ? Boolean(
            registro.foto ||
              registro.setas?.length ||
              registro.observacoes?.trim(),
          )
        : registroTemConteudo(registro),
    );
    return etapasInformativas ? preenchidos : preenchidos.length ? preenchidos : expandidos;
  }, [etapasInformativas, registrosOrdenados]);
  const relatorioAtual = useMemo(() => {
    if (!alunoDaPratica?.id || !relatorioId) return null;

    return {
      id: relatorioId,
      disciplinaId: disciplinaId || "",
      professorId: acessoAluno?.professorId || "",
      turmaId: acessoAluno?.turma?.id || "",
      turmaNome: acessoAluno?.turma?.nome || "",
      alunoId: alunoDaPratica.id,
      alunoNome: alunoDaPratica.nome || "",
      mode: "pratica",
      status: statusRelatorio,
      totalInsetos: registrosParaRelatorio.length,
      tempoPorInsetoMin: 0,
      gabarito: [],
      sessao: registrosParaRelatorio.map((registro, index) =>
        montarItemSessaoHistologia({
          config,
          registro,
          index,
          secoesRoteiroRelatorio,
        }),
      ),
      progresso: null,
      criadoEm: relatorioCriadoEm || new Date().toISOString(),
    };
  }, [
    acessoAluno?.professorId,
    acessoAluno?.turma?.id,
    acessoAluno?.turma?.nome,
    alunoDaPratica,
    config,
    disciplinaId,
    registrosParaRelatorio,
    relatorioCriadoEm,
    relatorioId,
    secoesRoteiroRelatorio,
    statusRelatorio,
  ]);
  const resumoMarcacoesReferencia = useMemo(
    () =>
      registrosParaRelatorio
        .map((registro, index) => {
          const referencia = config.referenciasAnotacao?.[registro.metaValor] || null;
          const idsEsperados = new Set(
            (referencia?.partes || []).map((parte) => parte.id),
          );

          if (!idsEsperados.size) return null;

          const idsMarcados = new Set(
            (registro.setas || [])
              .map((seta) => seta.referenciaId)
              .filter((id) => idsEsperados.has(id)),
          );

          return {
            id: registro.id,
            nome: registro.titulo?.trim() || `${config.itemFallback} ${index + 1}`,
            marcados: idsMarcados.size,
            total: idsEsperados.size,
          };
        })
        .filter(Boolean),
    [config.itemFallback, config.referenciasAnotacao, registrosParaRelatorio],
  );
  const avisosRevisao = useMemo(
    () => {
      const avisos = criarAvisosRevisao(registrosParaRelatorio, sinteseMaterial, {
        exigirObservacoes: !config.ocultarObservacoes,
        exigirSintese: !config.ocultarSintese,
        referenciasAnotacao: config.referenciasAnotacao,
      });

      if (config.exigirAoMenosUmRegistro && !registrosParaRelatorio.length) {
        avisos.unshift(
          "Registre ao menos uma etapa com foto, marcação ou observação antes de concluir.",
        );
      }

      return avisos;
    },
    [
      config.ocultarObservacoes,
      config.ocultarSintese,
      config.exigirAoMenosUmRegistro,
      config.referenciasAnotacao,
      registrosParaRelatorio,
      sinteseMaterial,
    ],
  );
  const referenciaAtual =
    config.referenciasAnotacao?.[registroAtivo?.metaValor] || null;
  const tituloFotoAtual = obterTituloFoto(config, registroAtivo?.metaValor);
  const altFotoAtual = obterAltFoto(config, registroAtivo?.metaValor);
  const metaResumoAtual = obterResumoMeta(config, registroAtivo?.metaValor);
  const orientacaoEtapaAtual = obterOrientacaoEtapa(config, registroAtivo?.metaValor);
  const dadosContexto = obterDadosContexto(config);
  const usaMarcadoresNumerados = Boolean(referenciaAtual);
  const referenciaPartes = referenciaAtual?.partes || [];
  const referenciaAtivaIdAtual = referenciaPartes.some(
    (parte) => parte.id === referenciaAtivaId,
  )
    ? referenciaAtivaId
    : referenciaPartes[0]?.id || "";
  const referenciaAtivaIndex = referenciaPartes.findIndex(
    (parte) => parte.id === referenciaAtivaIdAtual,
  );
  const referenciaAtiva =
    referenciaAtivaIndex >= 0 ? referenciaPartes[referenciaAtivaIndex] : null;
  const ReferenciaMini = referenciaAtual?.Miniatura || null;
  const referenciasUsadas = new Set(
    (registroAtivo?.setas || [])
      .map((seta) => seta.referenciaId)
      .filter(Boolean),
  );
  const corReferenciaAtiva = referenciaAtiva
    ? referenciaAtual?.cores?.[referenciaAtivaIndex]
    : null;
  const etapasTela = [
    ...(config.etapasTelaExtras || []),
    {
      id: "registro",
      rotulo: etapasInformativas ? "Prática" : "Registro",
      descricao: etapasInformativas
        ? "Consulte as etapas do preparo, registre suas observações e documente o que foi acompanhado."
        : "Organize os registros, monte as imagens e identifique as estruturas observadas.",
    },
    ...(!config.ocultarSintese
      ? [
          {
            id: "sintese",
            rotulo: "Síntese",
            descricao: "Escreva a síntese final do material observado ao longo da prática.",
          },
        ]
      : []),
    {
      id: "revisao",
      rotulo: avisosRevisao.length ? `Revisão (${avisosRevisao.length})` : "Revisão",
      descricao:
        "Confira pendências antes de gerar ou revisar o relatório da atividade.",
    },
  ];
  const etapaTelaAtiva = etapasTela.some((item) => item.id === etapaTela)
    ? etapaTela
    : etapasTela[0]?.id || "registro";
  const etapaTelaAtual = etapasTela.find((item) => item.id === etapaTelaAtiva) || etapasTela[0];
  const etapasRegistro = useMemo(() => {
    const padrao = [
      {
        id: "ficha",
        rotulo: "Ficha",
        descricao:
          "Organize os registros da prática e preencha identificação, tipo de coleção e contexto do material.",
      },
      {
        id: "imagem",
        rotulo: "Imagem",
        descricao: referenciaAtual
          ? "Fotografe o material e posicione as marcações diretamente sobre a imagem observada."
          : "Fotografe o material e faça a edição principal da imagem anotada.",
      },
      {
        id: "estruturas",
        rotulo: referenciaAtual ? "Estruturas" : "Observações",
        descricao: referenciaAtual
          ? "Nomeie as estruturas, ajuste a legenda das marcações e finalize as observações do registro."
          : "Revise as setas registradas e complete as observações do material observado.",
      },
    ];
    const overrides = config.subetapasRegistro || {};

    return padrao
      .filter((etapa) => !(config.ocultarSubetapaEstruturas && etapa.id === "estruturas"))
      .map((etapa) => ({
        ...etapa,
        ...(overrides[etapa.id] || {}),
      }));
  }, [config.ocultarSubetapaEstruturas, config.subetapasRegistro, referenciaAtual]);
  const subetapaRegistroAtiva =
    etapasRegistro.find((item) => item.id === subetapaRegistroId) || etapasRegistro[0];
  const subetapaRegistroIndex = etapasRegistro.findIndex(
    (item) => item.id === subetapaRegistroAtiva.id,
  );
  const subetapaRegistroAnterior =
    subetapaRegistroIndex > 0 ? etapasRegistro[subetapaRegistroIndex - 1] : null;
  const proximaSubetapaRegistro =
    subetapaRegistroIndex < etapasRegistro.length - 1
      ? etapasRegistro[subetapaRegistroIndex + 1]
      : null;

  useEffect(() => {
    salvarRascunhoFotoAnotada(config, {
      registros,
      registroAtivoId,
      relatorioId,
      statusRelatorio,
      criadoEm: relatorioCriadoEm,
      sinteseMaterial,
    });
  }, [
    config,
    registros,
    registroAtivoId,
    relatorioCriadoEm,
    relatorioId,
    sinteseMaterial,
    statusRelatorio,
  ]);

  useEffect(() => {
    if (!relatorioAtual) return;

    salvarRelatorioLocal(relatorioAtual, disciplinaId || relatorioAtual.disciplinaId).catch(
      (error) => {
        console.error("Não foi possível salvar o relatório local da prática:", error);
      },
    );
  }, [disciplinaId, relatorioAtual]);

  useEffect(() => {
    if (etapaTelaAtiva !== "registro") return;
    if (etapasRegistro.some((item) => item.id === subetapaRegistroId)) return;
    const timeoutId = window.setTimeout(() => {
      setSubetapaRegistroId(etapasRegistro[0]?.id || "ficha");
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [etapaTelaAtiva, etapasRegistro, subetapaRegistroId]);

  function atualizarRegistro(id, patch) {
    setRegistros((atuais) =>
      atuais.map((registro) =>
        registro.id === id ? { ...registro, ...patch } : registro,
      ),
    );
  }

  function atualizarCampoRelatorio(registroId, campoId, valor) {
    if (campoId === "observacoesComplementares") {
      atualizarRegistro(registroId, { observacoes: valor });
      return;
    }

    atualizarRegistroComTransform(registroId, (registro) => ({
      ...registro,
      camposRelatorio: {
        ...(registro.camposRelatorio || {}),
        [campoId]: valor,
      },
    }));
  }

  function atualizarRegistroComTransform(id, transform) {
    setRegistros((atuais) =>
      atuais.map((registro) =>
        registro.id === id ? transform(registro) : registro,
      ),
    );
  }

  function selecionarRegistro(registro) {
    setRegistroAtivoId(registro.id);
    if (permiteAcompanharEtapas && !etapasInformativas) {
      setRegistros((atuais) =>
        atuais.map((item) => ({
          ...item,
          acompanhada:
            item.id === registro.id ? !registro.acompanhada : false,
        })),
      );
    }
    setReferenciaAtivaId("");
    setSetaAtivaId("");
  }

  function selecionarEtapaInformativa(metaValor) {
    const etapa = registros.find((registro) => registro.metaValor === metaValor);
    if (etapa) selecionarRegistro(etapa);
  }

  function criarSnapshotMeta(registro) {
    return {
      foto: registro.foto || "",
      edicaoConcluida: Boolean(registro.edicaoConcluida),
      setas: Array.isArray(registro.setas) ? registro.setas : [],
    };
  }

  function obterSnapshotMeta(registro, metaValor) {
    if (!registro) {
      return { foto: "", edicaoConcluida: false, setas: [] };
    }

    if (registro.metaValor === metaValor) {
      return criarSnapshotMeta(registro);
    }

    return registro.rascunhosPorMeta?.[metaValor] || {
      foto: "",
      edicaoConcluida: false,
      setas: [],
    };
  }

  function atualizarConteudoVisivelRegistro(id, patch) {
    atualizarRegistroComTransform(id, (registro) => {
      const proximo = { ...registro, ...patch };
      return {
        ...proximo,
        rascunhosPorMeta: {
          ...(registro.rascunhosPorMeta || {}),
          [proximo.metaValor]: criarSnapshotMeta(proximo),
        },
      };
    });
  }

  function atualizarMetaValorRegistro(valor) {
    if (!registroAtivo) return;
    if (registroAtivo.metaValor === valor) return;

    atualizarRegistroComTransform(registroAtivo.id, (registro) => {
      const snapshotAtual = criarSnapshotMeta(registro);
      const snapshotDestino = obterSnapshotMeta(registro, valor);

      return {
        ...registro,
        metaValor: valor,
        foto: snapshotDestino.foto,
        edicaoConcluida: snapshotDestino.edicaoConcluida,
        setas: snapshotDestino.setas,
        rascunhosPorMeta: {
          ...(registro.rascunhosPorMeta || {}),
          [registro.metaValor]: snapshotAtual,
          [valor]: snapshotDestino,
        },
      };
    });
    setReferenciaAtivaId("");
    setSetaAtivaId("");
  }

  function adicionarRegistro() {
    const novo = registroInicial(config);
    setRegistros((atuais) => [...atuais, novo]);
    setRegistroAtivoId(novo.id);
    setSetaAtivaId("");
  }

  function removerRegistro(id) {
    setRegistros((atuais) => {
      if (atuais.length === 1) return atuais;
      const proximos = atuais.filter((registro) => registro.id !== id);
      if (registroAtivoId === id) {
        setRegistroAtivoId(proximos[0].id);
        setSetaAtivaId("");
      }
      return proximos;
    });
  }

  function adicionarSeta(event) {
    if (!registroAtivo?.foto || !imagemRef.current) return;

    const rect = imagemRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    if (x < 0 || x > 100 || y < 0 || y > 100) return;

    if (setaAtivaId && registroAtivo.setas.some((seta) => seta.id === setaAtivaId)) {
      atualizarSeta(setaAtivaId, {
        concluida: false,
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
      });
      return;
    }

    if (referenciaAtiva?.id && referenciasUsadas.has(referenciaAtiva.id)) {
      const setaExistente = registroAtivo.setas.find(
        (seta) => seta.referenciaId === referenciaAtiva.id,
      );

      if (setaExistente) {
        atualizarSeta(setaExistente.id, {
          concluida: false,
          x: Number(x.toFixed(2)),
          y: Number(y.toFixed(2)),
        });
        setSetaAtivaId(setaExistente.id);
      }
      return;
    }

    setaSeqRef.current += 1;

    const novaSeta = criarSetaFotoAnotada({
      registroId: registroAtivo.id,
      sequencia: setaSeqRef.current,
      cor: corReferenciaAtiva || corSelecionada,
      x,
      y,
    });
    const legendaReferencia = criarLegendaReferencia(
      referenciaAtiva,
      referenciaAtivaIndex,
    );

    atualizarConteudoVisivelRegistro(registroAtivo.id, {
      setas: [
        ...registroAtivo.setas.map((seta) => ({ ...seta, concluida: true })),
        legendaReferencia
          ? {
              ...novaSeta,
              legenda: legendaReferencia,
              referenciaId: referenciaAtiva.id,
              referenciaNome: referenciaAtiva.nome,
              referenciaNumero: referenciaAtivaIndex + 1,
              marcadorTipo: "numero",
              corId: corReferenciaAtiva?.id || novaSeta.corId,
              corNome: corReferenciaAtiva?.nome || novaSeta.corNome,
              cor: corReferenciaAtiva?.valor || novaSeta.cor,
            }
          : novaSeta,
      ],
    });
    setSetaAtivaId(novaSeta.id);
  }

  function atualizarFotoRegistro(foto) {
    atualizarConteudoVisivelRegistro(registroAtivo.id, {
      foto,
      edicaoConcluida: false,
      setas: foto ? registroAtivo.setas : [],
    });
  }

  function atualizarSeta(setaId, patch) {
    atualizarConteudoVisivelRegistro(registroAtivo.id, {
      setas: registroAtivo.setas.map((seta) =>
        seta.id === setaId ? { ...seta, ...patch } : seta,
      ),
    });
  }

  function removerSeta(setaId) {
    atualizarConteudoVisivelRegistro(registroAtivo.id, {
      setas: registroAtivo.setas.filter((seta) => seta.id !== setaId),
    });
    if (setaAtivaId === setaId) {
      setSetaAtivaId("");
    }
  }

  function prepararProximaSeta(setaAtual) {
    if (setaAtual?.id) {
      atualizarSeta(setaAtual.id, { concluida: true });
    }

    setSetaAtivaId("");

    const corAtualIndex = coresSetas.findIndex(
      (cor) => cor.id === setaAtual?.corId,
    );
    const proximaCor =
      coresSetas[(corAtualIndex >= 0 ? corAtualIndex + 1 : 0) % coresSetas.length];

    if (proximaCor) {
      setCorAtiva(proximaCor.id);
    }
  }

  function imprimirRelatorio() {
    const registrosImpressao = registrosParaRelatorio;
    const html = `<!doctype html>
<html lang="pt-br">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(config.tituloRelatorio)}</title>
<style>
  body { font-family: Arial, sans-serif; color: #111827; padding: 24px; }
  h1 { font-size: 22px; margin: 0 0 18px; }
  h2 { font-size: 17px; margin: 0 0 8px; }
  section { page-break-inside: avoid; margin: 0 0 24px; }
  .frame { position: relative; display: inline-block; max-width: 100%; border: 1px solid #d1d5db; border-radius: 10px; overflow: hidden; }
  .frame img { display: block; max-width: 100%; max-height: 560px; object-fit: contain; }
  .arrow { position: absolute; height: 0; border-top: 4px solid currentColor; transform-origin: right center; }
  .arrow::after { content: ""; position: absolute; right: -1px; top: -8px; border-left: 14px solid currentColor; border-top: 6px solid transparent; border-bottom: 6px solid transparent; }
  .label { position: absolute; left: 0; top: 0; width: max-content; max-width: 220px; transform: translate(6px, -50%) rotate(calc(-1 * var(--seta-rotacao, 0deg))); transform-origin: left center; padding: 4px 7px; border: 1px solid; border-radius: 8px; background: rgba(255,255,255,.92); box-shadow: 0 6px 16px rgba(15,23,42,.16); font-size: var(--fonte-tamanho, 12px); font-weight: 700; line-height: 1.2; color: #111827; overflow-wrap: break-word; word-break: normal; hyphens: none; }
  .number-marker { position: absolute; width: 28px; height: 28px; transform: translate(-50%, -50%); display: grid; place-items: center; border-radius: 999px; border: 2px solid white; color: white; font-size: 13px; font-weight: 800; line-height: 1; box-shadow: 0 6px 14px rgba(15,23,42,.18); }
  ul { line-height: 1.5; }
  p { color: #374151; white-space: pre-wrap; }
  .referencia { margin: 8px 0 12px; padding: 10px; border: 1px solid #d1d5db; border-radius: 10px; background: #f9fafb; }
  .referencia ul { margin: 6px 0 0; columns: 2; }
</style>
</head>
<body>
  <h1>${escapeHtml(config.tituloRelatorio)}</h1>
  ${secoesRoteiroRelatorio
    .map(
      (secao) => `
      <section>
        <h2>${escapeHtml(secao.titulo)}</h2>
        <ul>${secao.itens.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>`,
    )
    .join("")}
  ${registrosImpressao
    .map(
      (registro, index) => `
      <section>
        <h2>${index + 1}. ${escapeHtml(registro.titulo || config.tituloFallbackRelatorio)}</h2>
        ${
          config.metaLabel
            ? `<p><strong>${escapeHtml(config.metaLabel)}:</strong> ${escapeHtml(formatarMeta(config, registro.metaValor))}</p>`
            : ""
        }
        ${montarCamposRelatorioHtml(config, registro)}
        ${montarReferenciaRelatorioHtml(config, registro.metaValor)}
        ${
          registro.foto
            ? `<div class="frame">
                <img src="${registro.foto}" alt="${escapeHtml(registro.titulo || config.altRelatorio)}" />
                ${registro.setas
                  .map(
                    (seta) => {
                      if (seta.marcadorTipo === "numero") {
                        const numero = seta.referenciaNumero || String(seta.legenda || "").match(/^\\d+/)?.[0] || "";
                        return `<span class="number-marker" style="left:${seta.x}%; top:${seta.y}%; background:${seta.cor};">${escapeHtml(String(numero))}</span>`;
                      }

                      const tamanho = normalizarTamanhoSeta(seta.tamanho);
                      const rotacao = normalizarRotacaoSeta(seta.rotacao);
                      const fonteTamanho = normalizarFonteSeta(seta.fonteTamanho);
                      const texto = textoLegendaSeta(seta);
                      return `<span class="arrow" style="left:${seta.x}%; top:${seta.y}%; width:${tamanho}px; color:${seta.cor}; --seta-rotacao:${rotacao}deg; --fonte-tamanho:${fonteTamanho}px; transform:translate(-${tamanho}px, -2px) rotate(${rotacao}deg);">${
                        texto
                          ? `<span class="label" style="border-color:${seta.cor};">${escapeHtml(texto)}</span>`
                          : ""
                      }</span>`;
                    },
                  )
                  .join("")}
              </div>`
            : "<p>Sem foto registrada.</p>"
        }
        ${
          registro.setas.length
            ? `<ul>${registro.setas
                .map(
                  (seta) =>
                    `<li>${escapeHtml(seta.legenda || "sem legenda")}</li>`,
                )
                .join("")}</ul>`
            : "<p>Sem setas identificadas.</p>"
        }
        ${registro.observacoes ? `<p>${escapeHtml(registro.observacoes)}</p>` : ""}
      </section>`,
    )
    .join("")}
  ${
    sinteseMaterial.trim()
      ? `<section>
          <h2>Síntese do material observado</h2>
          <p>${escapeHtml(sinteseMaterial.trim())}</p>
        </section>`
      : ""
  }
</body>
</html>`;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } finally {
        setTimeout(() => iframe.remove(), 1000);
      }
    }, 300);
  }

  function editarSeta(seta) {
    atualizarConteudoVisivelRegistro(registroAtivo.id, {
      setas: registroAtivo.setas.map((item) => ({
        ...item,
        concluida: item.id !== seta.id,
      })),
    });
    setCorAtiva(seta.corId || coresSetas[0].id);
    setSetaAtivaId(seta.id);
    setMostrarRelatorio(false);
  }

  function selecionarReferencia(parte, index) {
    const legendaReferencia = criarLegendaReferencia(parte, index);
    const setaAtiva = registroAtivo.setas.find((seta) => seta.id === setaAtivaId);
    const referenciaJaUsada = registroAtivo.setas.some(
      (seta) => seta.referenciaId === parte.id && seta.id !== setaAtivaId,
    );

    setReferenciaAtivaId(parte.id);

    if (referenciaJaUsada) {
      const setaExistente = registroAtivo.setas.find(
        (seta) => seta.referenciaId === parte.id,
      );
      if (setaExistente) {
        editarSeta(setaExistente);
      }
      return;
    }

    if (setaAtiva?.id && legendaReferencia) {
      const corReferencia = referenciaAtual?.cores?.[index];
      atualizarSeta(setaAtivaId, {
        legenda: legendaReferencia,
        referenciaId: parte.id,
        referenciaNome: parte.nome,
        referenciaNumero: index + 1,
        marcadorTipo: "numero",
        ...(corReferencia
          ? {
              corId: corReferencia.id,
              corNome: corReferencia.nome,
              cor: corReferencia.valor,
            }
          : null),
      });
    }
  }

  function reiniciarRascunho() {
    const limpo = limparRascunhoFotoAnotada(config);
    setaSeqRef.current = 0;
    setRegistros(limpo.registros);
    setRegistroAtivoId(limpo.registroAtivoId);
    setRelatorioId(alunoDaPratica?.id ? criarId("relatorio") : "");
    setRelatorioCriadoEm(alunoDaPratica?.id ? new Date().toISOString() : "");
    setStatusRelatorio("rascunho");
    setMensagemEnvio("");
    setErroEnvio("");
    setSinteseMaterial(limpo.sinteseMaterial);
    setSetaAtivaId("");
    setReferenciaAtivaId("");
    setRascunhoFoiLimpo(true);
    setEtapaTela("registro");
    setMostrarRelatorio(false);
  }

  async function enviarRelatorioAoProfessor() {
    if (!relatorioAtual || !onEnviarRelatorio || enviandoRelatorio) return;

    setEnviandoRelatorio(true);
    setMensagemEnvio("");
    setErroEnvio("");

    try {
      await onEnviarRelatorio({
        ...relatorioAtual,
        status: "enviado",
      });
      setStatusRelatorio("enviado");
      setMensagemEnvio("Relatório enviado ao professor.");
    } catch (error) {
      setStatusRelatorio("concluido");
      setErroEnvio(error?.message || "Não foi possível enviar o relatório ao professor.");
    } finally {
      setEnviandoRelatorio(false);
    }
  }

  if (mostrarRelatorio) {
    return (
      <main className="microscopia-page" style={page}>
        <section className="surface microscopia-header" style={header}>
          <div>
            <span style={eyebrow}>Relatório da prática</span>
            <h2 style={titulo}>{config.tituloRelatorio}</h2>
            <p style={intro}>
              Revise as fotos anotadas, legendas e observações antes de imprimir
              ou salvar em PDF pelo navegador.
            </p>
          </div>

          <div className="microscopia-acoes-topo" style={acoesTopo}>
            <button
              type="button"
              className="btn btn--secondary btn--compact"
              onClick={() => setMostrarRelatorio(false)}
            >
              ← Voltar à edição
            </button>
            <button
              type="button"
              className="btn btn--primary btn--compact"
              onClick={imprimirRelatorio}
            >
              Imprimir / salvar PDF
            </button>
          </div>
        </section>

        <section style={relatorioBox}>
          {mensagemEnvio ? <div style={sucessoBox}>{mensagemEnvio}</div> : null}
          {erroEnvio ? <div style={erroBox}>{erroEnvio}</div> : null}

          {secoesRoteiroRelatorio.map((secao) => (
            <article key={secao.titulo} style={relatorioItem}>
              <h3 style={relatorioTitulo}>{secao.titulo}</h3>
              <ul style={relatorioListaRoteiro}>
                {secao.itens.map((item) => (
                  <li key={item} style={relatorioListaRoteiroItem}>{item}</li>
                ))}
              </ul>
            </article>
          ))}

          {registrosParaRelatorio.map((registro, index) => (
            <article key={registro.id} style={relatorioItem}>
              <h3 style={relatorioTitulo}>
                {index + 1}. {registro.titulo || config.tituloFallbackRelatorio}
              </h3>

              {config.metaLabel ? (
                <p style={relatorioMeta}>
                  <strong>{config.metaLabel}:</strong>{" "}
                  {formatarMeta(config, registro.metaValor)}
                </p>
              ) : null}

              <CamposRelatorioRegistro
                config={config}
                registro={registro}
              />

              <ReferenciaRelatorio
                referencia={obterReferenciaRelatorio(config, registro.metaValor)}
              />

              <DadosContextoRelatorio dados={obterDadosContexto(config)} />

              {registro.foto ? (
                <FotoAnotadaImagem
                  foto={registro.foto}
                  alt={registro.titulo || config.altRelatorio}
                  setas={registro.setas}
                  containerStyle={relatorioImagemContainer}
                  frameStyle={relatorioImagemFrame}
                  imagemStyle={relatorioImagem}
                />
              ) : (
                <p style={muted}>Sem foto registrada.</p>
              )}

              {registro.setas.length ? (
                <ul style={relatorioLegendaLista}>
                  {registro.setas.map((seta) => (
                    <li key={seta.id} style={relatorioLegendaItem}>
                      <span style={{ ...amostraCor, background: seta.cor }} />
                      <span>{seta.legenda || "sem legenda"}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={muted}>Sem setas identificadas.</p>
              )}

              {registro.observacoes ? (
                <p style={relatorioObservacoes}>{registro.observacoes}</p>
              ) : null}
            </article>
          ))}

          {sinteseMaterial.trim() ? (
            <article style={relatorioItem}>
              <h3 style={relatorioTitulo}>Síntese do material observado</h3>
              <p style={relatorioObservacoes}>{sinteseMaterial.trim()}</p>
            </article>
          ) : null}

          {relatorioAtual ? (
            <article style={relatorioItem}>
              <h3 style={relatorioTitulo}>Envio do relatório</h3>
              <p style={relatorioObservacoes}>
                {statusRelatorio === "enviado"
                  ? "Este relatório já foi enviado ao professor e permanece salvo neste dispositivo."
                  : alunoOnline
                    ? "Quando estiver tudo certo, envie este relatório para a conta do professor."
                    : "Este relatório fica salvo neste dispositivo. O envio só aparece quando a entrada do aluno foi validada on-line."}
              </p>
              <div style={relatorioAcoes}>
                <button
                  type="button"
                  className="btn btn--primary btn--compact"
                  disabled={!alunoOnline || enviandoRelatorio || statusRelatorio === "enviado"}
                  onClick={enviarRelatorioAoProfessor}
                >
                  {statusRelatorio === "enviado"
                    ? "Relatório enviado"
                    : enviandoRelatorio
                      ? "Enviando..."
                      : "Enviar relatório ao professor"}
                </button>
              </div>
            </article>
          ) : null}
        </section>
      </main>
    );
  }

  return (
    <main className="microscopia-page" style={page}>
      <section className="surface microscopia-header" style={header}>
        <div className="microscopia-header__copy">
          <span className="microscopia-header__eyebrow" style={eyebrow}>
            {config.disciplinaLabel || "Zoologia I"}
          </span>
          <h2 className="microscopia-header__title" style={titulo}>{config.titulo}</h2>
          <p className="microscopia-header__intro" style={intro}>{config.intro}</p>
        </div>

        <div className="microscopia-acoes-topo" style={acoesTopo}>
          <button type="button" className="btn btn--secondary btn--compact" onClick={onBack}>
            ← Voltar
          </button>
          <button
            type="button"
            className="btn btn--secondary btn--compact microscopia-acao-roteiro"
            onClick={() => setMostrarRoteiro((atual) => !atual)}
          >
            {mostrarRoteiro ? "Ocultar roteiro" : "Ver roteiro"}
          </button>
          <button
            type="button"
            className="btn btn--primary btn--compact"
            onClick={() => setMostrarRelatorio(true)}
          >
            Ver relatório
          </button>
        </div>
      </section>

      <section className="surface microscopia-status-rascunho" style={rascunhoStatusBox}>
        <div className="microscopia-status-rascunho__copy">
          <strong className="microscopia-status-rascunho__title">
            {rascunhoFoiLimpo
              ? "Rascunho local"
              : rascunhoRecuperadoEm
                ? "Rascunho recuperado"
                : "Rascunho local"}
          </strong>
          <span className="microscopia-status-rascunho__text">{mensagemRascunho}</span>
        </div>
        <button
          type="button"
          className="btn btn--secondary btn--compact"
          onClick={reiniciarRascunho}
        >
          Limpar rascunho
        </button>
      </section>

      <FluxoEtapasCard
        eyebrow={etapasInformativas ? "Fluxo principal" : "Sequência da prática"}
        title={etapasInformativas ? "Produção da lâmina" : "Etapas da atividade"}
        currentLabel={etapaTelaAtual?.rotulo || "Registro"}
        steps={etapasTela}
        activeId={etapaTelaAtiva}
        onChange={setEtapaTela}
        ariaLabel="Etapas da atividade"
        mobile={mobileCompacto}
      />

      {etapaTelaAtiva === "exploracao" ? (
        <>
          {mostrarRoteiro ? (
            <section className="microscopia-roteiro-box" style={roteiroBox}>
              <RoteiroPratica roteiro={config.roteiro} />
            </section>
          ) : !config.ocultarAvisoApoio ? (
            <section style={apoioLateralBox}>
              <strong style={apoioLateralTitulo}>Apoio lateral disponível</strong>
              <p style={apoioLateralTexto}>
                O roteiro completo, materiais, cuidados e referências desta prática
                ficam no painel de apoio lateral. Abra o roteiro na tela apenas quando
                precisar consultar tudo de uma vez.
              </p>
            </section>
          ) : null}

          {config.recursoInterativo || config.renderRecursoInterativo ? (
            <section className="microscopia-recurso-interativo">
              {config.renderRecursoInterativo
                ? config.renderRecursoInterativo({
                    metaValor: registroAtivo?.metaValor,
                    atualizarMetaValor: atualizarMetaValorRegistro,
                  })
                : config.recursoInterativo}
            </section>
          ) : null}

          <section style={transicaoWorkspaceBox}>
            <div style={transicaoWorkspaceCopy}>
              <strong style={transicaoWorkspaceTitulo}>Exploração concluída</strong>
              <p style={transicaoWorkspaceTexto}>
                Quando quiser começar o material da prática, siga para o registro
                e monte a foto anotada em uma etapa separada.
              </p>
            </div>
            <button
              type="button"
              className="btn btn--primary btn--compact"
              onClick={() => setEtapaTela("registro")}
            >
              Abrir registro
            </button>
          </section>
        </>
      ) : null}

      {etapaTelaAtiva === "registro" ? (
        <>
          {mostrarRoteiro ? (
            <section className="microscopia-roteiro-box" style={roteiroBox}>
              <RoteiroPratica roteiro={config.roteiro} />
            </section>
          ) : !config.ocultarAvisoApoio ? (
            <section style={apoioLateralBox}>
              <strong style={apoioLateralTitulo}>Apoio lateral disponível</strong>
              <p style={apoioLateralTexto}>
                O roteiro completo, materiais, cuidados e referências desta prática
                ficam no painel de apoio lateral. Abra o roteiro na tela apenas quando
                precisar consultar tudo de uma vez.
              </p>
            </section>
          ) : null}

          {config.recursoInterativo || config.renderRecursoInterativo ? (
            <section style={workspaceIntroBox}>
              <div style={workspaceIntroCopy}>
                <strong style={workspaceIntroTitulo}>Registro separado da exploração</strong>
                <p style={workspaceIntroTexto}>
                  A área interativa dos microscópios fica na etapa de exploração.
                  Aqui o foco passa a ser organizar o registro, editar a imagem e
                  concluir a legenda.
                </p>
              </div>
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                onClick={() => setEtapaTela("exploracao")}
              >
                Voltar para exploração
              </button>
            </section>
          ) : null}

          <FluxoEtapasCard
            eyebrow={etapasInformativas ? "Trabalho na prática" : "Área de trabalho"}
            title={etapasInformativas ? "Etapa selecionada" : "Registro em foco"}
            currentLabel={subetapaRegistroAtiva.rotulo}
            steps={etapasRegistro}
            activeId={subetapaRegistroAtiva.id}
            onChange={setSubetapaRegistroId}
            ariaLabel="Subetapas do registro"
            mobile={mobileCompacto}
            summaryTone="surface"
            actions={
              <>
                <button
                  type="button"
                  className="btn btn--secondary btn--compact"
                  onClick={() =>
                    subetapaRegistroAnterior &&
                    setSubetapaRegistroId(subetapaRegistroAnterior.id)
                  }
                  disabled={!subetapaRegistroAnterior}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  className="btn btn--primary btn--compact"
                  onClick={() =>
                    proximaSubetapaRegistro &&
                    setSubetapaRegistroId(proximaSubetapaRegistro.id)
                  }
                  disabled={!proximaSubetapaRegistro}
                >
                  {proximaSubetapaRegistro
                    ? `Próxima: ${proximaSubetapaRegistro.rotulo}`
                    : "Última etapa do registro"}
                </button>
              </>
            }
          />

          <section
            className="microscopia-workspace"
            style={etapasInformativas ? workspaceSemLista : workspace}
          >
            {!etapasInformativas ? (
              <aside className="microscopia-lista-registros" style={listaRegistros} aria-label="Registros da prática">
                <button type="button" className="btn btn--primary btn--compact" onClick={adicionarRegistro}>
                  {config.novoRegistro}
                </button>

                {registrosOrdenados.map((registro, index) => (
                  <div
                    key={registro.id}
                    role="button"
                    tabIndex={0}
                    className="microscopia-registro-card"
                    aria-pressed={
                      permiteAcompanharEtapas ? Boolean(registro.acompanhada) : undefined
                    }
                    style={
                      permiteAcompanharEtapas
                      ? registro.acompanhada
                        ? itemAtivo
                        : itemRegistro
                      : registro.id === registroAtivo.id
                        ? itemAtivo
                        : itemRegistro
                    }
                    onClick={() => selecionarRegistro(registro)}
                    onKeyDown={(event) => {
                      if (event.key !== "Enter" && event.key !== " ") return;
                      event.preventDefault();
                      selecionarRegistro(registro);
                    }}
                  >
                    <strong>{registro.titulo || `${config.itemFallback} ${index + 1}`}</strong>
                    <span>
                      {permiteAcompanharEtapas
                      ? registro.acompanhada
                        ? "etapa acompanhada"
                        : "etapa não acompanhada"
                      : registro.foto
                        ? "foto adicionada"
                        : "sem foto"} · {registro.setas.length} setas
                    </span>
                  </div>
                ))}
              </aside>
            ) : null}

            <section className="microscopia-editor" style={editor}>
              {atividadeImagensId ? (
                <section className="microscopia-figura-didatica" style={blocoFiguraDidatica}>
                  <strong>Figura didática da etapa</strong>
                  {imagemDidaticaAtual ? (
                    <img src={imagemDidaticaAtual.url} alt={imagemDidaticaAtual.alt} style={imagemDidatica} />
                  ) : (
                    <p className="microscopia-figura-didatica__texto" style={textoFiguraDidatica}>Esta etapa ainda não possui uma figura didática publicada.</p>
                  )}
                  {metaResumoAtual ? (
                    <p className="microscopia-figura-didatica__texto" style={textoFiguraDidatica}>
                      <strong>O que acontece nesta etapa:</strong> {metaResumoAtual}
                    </p>
                  ) : null}
                  {etapasInformativas ? (
                    <p className="microscopia-figura-didatica__texto" style={textoFiguraDidatica}>
                      Esta figura é uma referência didática. Faça seus registros, fotos e
                      observações nas etapas de Registro.
                    </p>
                  ) : null}
                </section>
              ) : null}
              {subetapaRegistroAtiva.id === "ficha" ? (
                <>
                  <div className="microscopia-linha-campos" style={linhaCampos}>
                    {!etapasInformativas ? (
                      <label style={label}>
                      {config.campoIdentificacao}
                      <input
                        value={registroAtivo.titulo}
                        onChange={(event) =>
                          atualizarRegistro(registroAtivo.id, { titulo: event.target.value })
                        }
                        placeholder={config.placeholderIdentificacao}
                        style={input}
                      />
                      </label>
                    ) : null}

                    {config.metaLabel &&
                    Array.isArray(config.metaOptions) ? (
                      <label style={etapasInformativas ? label : labelCurto}>
                        {config.metaLabel}
                        <select
                          value={registroAtivo.metaValor}
                          onChange={(event) =>
                            etapasInformativas
                              ? selecionarEtapaInformativa(event.target.value)
                              : atualizarMetaValorRegistro(event.target.value)
                          }
                          style={input}
                        >
                          {config.metaOptions
                            .filter(
                              ([valor]) =>
                                etapasInformativas
                                  ? registros.some((registro) => registro.metaValor === valor)
                                  : true,
                            )
                            .map(([valor, rotulo]) => (
                            <option key={valor} value={valor}>
                              {rotulo}
                            </option>
                            ))}
                        </select>
                      </label>
                    ) : null}

                    {!etapasInformativas && registros.length > 1 ? (
                      <button
                        type="button"
                        className="btn btn--secondary btn--compact"
                        onClick={() => removerRegistro(registroAtivo.id)}
                      >
                        Remover registro
                      </button>
                    ) : null}
                  </div>

                  {config.metaLabel && (metaResumoAtual || dadosContexto.length) ? (
                    <section className="microscopia-meta-resumo" style={metaResumoBox}>
                      <div style={metaResumoTopo}>
                        <span className="microscopia-meta-resumo__eyebrow" style={metaResumoEyebrow}>
                          {etapasInformativas ? "Teoria da etapa" : "Etapa em foco"}
                        </span>
                        <strong className="microscopia-meta-resumo__titulo" style={metaResumoTitulo}>
                          {formatarMeta(config, registroAtivo.metaValor)}
                        </strong>
                      </div>

                      {metaResumoAtual ? (
                        <p className="microscopia-meta-resumo__texto" style={metaResumoTexto}>
                          {metaResumoAtual}
                        </p>
                      ) : null}

                      {etapasInformativas && orientacaoEtapaAtual ? (
                        <p className="microscopia-meta-resumo__texto" style={metaResumoTexto}>
                          <strong>O que observar:</strong> {orientacaoEtapaAtual}
                        </p>
                      ) : null}

                      {dadosContexto.length ? (
                        <div style={metaResumoChips}>
                          {dadosContexto.map(([rotulo, valor]) => (
                            <span key={`${rotulo}-${valor}`} style={metaResumoChip}>
                              <strong>{rotulo}:</strong> {valor}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </section>
                  ) : null}
                </>
              ) : null}

              {subetapaRegistroAtiva.id === "imagem" ? (
                <>
                  {config.metaLabel && Array.isArray(config.metaOptions) && etapasInformativas ? (
                    <label style={label}>
                      {config.metaLabel}
                      <select
                        value={registroAtivo.metaValor}
                        onChange={(event) => atualizarMetaValorRegistro(event.target.value)}
                        style={input}
                      >
                        {config.metaOptions.map(([valor, rotulo]) => (
                          <option key={valor} value={valor}>
                            {rotulo}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : null}

                  <div
                  className="microscopia-editor-imagem-grid"
                  style={
                    referenciaAtual
                      ? editorImagemGrid
                      : { ...editorImagemGrid, ...editorImagemGridSemReferencia }
                  }
                >
                  <div className="microscopia-foto-marcacao" style={fotoMarcacaoCol}>
                    {usaMarcadoresNumerados && !registroAtivo.foto ? (
                      <FotoInsetoControl
                        titulo={tituloFotoAtual}
                        alt={registroAtivo.titulo || altFotoAtual}
                        fotoInseto={registroAtivo.foto}
                        onFotoInsetoChange={atualizarFotoRegistro}
                      />
                    ) : null}

                    {usaMarcadoresNumerados ? (
                      <div className="microscopia-palette" style={palette} aria-label="Edição da próxima marcação">
                        {!referenciaAtual
                          ? coresSetas.map((cor) => (
                              <button
                                key={cor.id}
                                type="button"
                                style={{
                                  ...corBotao,
                                  background: cor.valor,
                                  outline: cor.id === corAtiva ? "3px solid var(--color-text)" : "none",
                                }}
                                aria-label={`Usar seta ${cor.nome}`}
                                title={`Seta ${cor.nome}`}
                                onClick={() => {
                                  setCorAtiva(cor.id);
                                  if (setaAtivaId) {
                                    atualizarSeta(setaAtivaId, {
                                      corId: cor.id,
                                      corNome: cor.nome,
                                      cor: cor.valor,
                                    });
                                  }
                                }}
                              />
                            ))
                          : null}
                        <button
                          type="button"
                          className="btn btn--secondary btn--compact"
                          style={novaSetaBotao}
                          onClick={() => setSetaAtivaId("")}
                        >
                          Nova marcação
                        </button>
                        <span style={paletteTexto}>
                          {referenciaAtual
                            ? "Escolha o número na referência e toque na foto."
                            : setaAtivaId
                              ? "Seta selecionada: toque na imagem para reposicionar."
                              : "Toque na imagem para posicionar uma nova seta."}
                        </span>
                      </div>
                    ) : null}

                    {usaMarcadoresNumerados ? (
                      <FotoAnotadaImagem
                        foto={registroAtivo.foto}
                        alt={registroAtivo.titulo || "Foto anotada"}
                        setas={registroAtivo.setas}
                        imagemRef={(elemento) => {
                          imagemRef.current = elemento;
                        }}
                        onImagemClick={adicionarSeta}
                        onSelecionarSeta={(seta) => {
                          if (seta.concluida) {
                            editarSeta(seta);
                            return;
                          }
                          setSetaAtivaId(seta.id);
                        }}
                        setaAtivaId={setaAtivaId}
                        containerClassName="microscopia-imagem-box"
                        containerStyle={imagemBox}
                        imagemStyle={imagemEditor}
                        interactive
                      />
                    ) : (
                      <FotoAnotadaEditor
                        foto={registroAtivo.foto}
                        edicaoConcluida={registroAtivo.edicaoConcluida}
                        onEdicaoConcluidaChange={(edicaoConcluida) =>
                          atualizarConteudoVisivelRegistro(registroAtivo.id, {
                            edicaoConcluida,
                          })
                        }
                        setas={registroAtivo.setas}
                        onSetasChange={(setas) =>
                          atualizarConteudoVisivelRegistro(registroAtivo.id, {
                            setas: setas.map((seta) => ({ ...seta, concluida: true })),
                          })
                        }
                        onFotoChange={atualizarFotoRegistro}
                        rotuloFoto={tituloFotoAtual}
                        titulo={tituloFotoAtual}
                        modo="cores"
                      />
                    )}
                  </div>

                  {referenciaAtual ? (
                    <aside className="microscopia-referencia-editor" style={referenciaEditor}>
                      <div style={referenciaTopo}>
                        <div>
                          <h3 style={subtitulo}>{referenciaAtual.titulo}</h3>
                        </div>
                        {referenciaAtiva ? (
                          <span
                            style={{
                              ...referenciaNumero,
                              ...(corReferenciaAtiva
                                ? { background: corReferenciaAtiva.valor }
                                : null),
                            }}
                          >
                            {referenciaAtivaIndex + 1}
                          </span>
                        ) : null}
                      </div>

                      {ReferenciaMini ? (
                        <ReferenciaMini
                          key={`${registroAtivo?.id || "registro"}-${referenciaAtual.tipo}`}
                          tipo={referenciaAtual.tipo}
                          parteAtivaId={referenciaAtivaIdAtual}
                          partesUsadasIds={referenciasUsadas}
                          onSelecionarParte={selecionarReferencia}
                        />
                      ) : null}

                      {referenciaAtiva ? (
                        <button
                          type="button"
                          className="btn btn--secondary btn--compact"
                          style={{
                            ...(referenciasUsadas.has(referenciaAtiva.id)
                              ? referenciaBotaoUsado
                              : referenciaBotaoAtivo),
                            ...(corReferenciaAtiva
                              ? {
                                  "--referencia-cor": corReferenciaAtiva.valor,
                                  borderColor: corReferenciaAtiva.valor,
                                }
                              : null),
                          }}
                          title={
                            referenciasUsadas.has(referenciaAtiva.id)
                              ? "Estrutura já marcada. Clique para editar a marcação existente."
                              : "Estrutura selecionada para a próxima marcação."
                          }
                          onClick={() => selecionarReferencia(referenciaAtiva, referenciaAtivaIndex)}
                        >
                          <strong>
                            {referenciaAtivaIndex + 1}. {referenciaAtiva.nome}
                          </strong>
                        </button>
                      ) : null}
                    </aside>
                  ) : null}
                  </div>

                  {!config.ocultarObservacoes ? (
                    camposRelatorioExtras.length ? (
                      <div style={camposRelatorioBox}>
                        {camposRelatorioExtras.map((campo) => {
                          const valor = obterValorCampoRelatorio(registroAtivo, campo.id);
                          const placeholder =
                            campo.placeholder ||
                            (etapasInformativas
                              ? "Registre o que você observou nesta etapa."
                              : "Complete este campo para compor o relatório.");
                          const linhas = campo.id === "observacoesComplementares" ? 4 : 2;

                          return (
                            <label key={campo.id} style={label}>
                              {campo.label}
                              <textarea
                                value={valor}
                                onChange={(event) =>
                                  atualizarCampoRelatorio(
                                    registroAtivo.id,
                                    campo.id,
                                    event.target.value,
                                  )
                                }
                                placeholder={placeholder}
                                rows={linhas}
                                style={textarea}
                              />
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <label style={label}>
                        Observações do registro
                        <textarea
                          value={registroAtivo.observacoes}
                          onChange={(event) =>
                            atualizarRegistro(registroAtivo.id, { observacoes: event.target.value })
                          }
                          placeholder={
                            etapasInformativas
                              ? "Registre o que você observou nesta etapa, dúvidas e a relação com a figura didática."
                              : "Anote aumento usado, dúvidas, estruturas parcialmente visíveis ou orientações do professor."
                          }
                          style={textarea}
                        />
                      </label>
                    )
                  ) : null}
                </>
              ) : null}

              {subetapaRegistroAtiva.id === "estruturas" ? (
                <>
                  {usaMarcadoresNumerados ? (
                    <section className="microscopia-legenda-box" style={legendaBox}>
            <h3 style={subtitulo}>Legenda das estruturas</h3>
            {setasEmEdicao.length ? (
              <div className="microscopia-legenda-lista" style={legendaLista}>
                {setasEmEdicao.map((seta) => (
                  <div
                    key={seta.id}
                    className={`microscopia-legenda-linha${
                      seta.marcadorTipo === "numero"
                        ? " microscopia-legenda-linha--numero"
                        : ""
                    }`}
                    style={{
                      ...legendaLinha,
                      ...(seta.marcadorTipo === "numero" ? legendaLinhaNumero : null),
                      ...(setaAtivaId === seta.id ? legendaLinhaAtiva : null),
                    }}
                    onClick={() => setSetaAtivaId(seta.id)}
                  >
                    <span style={{ ...amostraCor, background: seta.cor }} />
                    <span style={legendaCor}>
                      {seta.marcadorTipo === "numero"
                        ? `Nº ${seta.referenciaNumero || ""}`
                        : seta.corNome}
                    </span>
                    <input
                      value={seta.legenda}
                      onChange={(event) =>
                        atualizarSeta(seta.id, { legenda: event.target.value })
                      }
                      placeholder="Nome da estrutura"
                      style={seta.marcadorTipo === "numero" ? inputCompacto : input}
                    />
                    {seta.marcadorTipo !== "numero" && setaAtivaId === seta.id ? (
                      <div className="microscopia-seta-controles" style={setaControles}>
                        <label style={controleSetaLabel}>
                          Giro: {normalizarRotacaoSeta(seta.rotacao)}°
                          <input
                            type="range"
                            min="-180"
                            max="180"
                            step="5"
                            value={normalizarRotacaoSeta(seta.rotacao)}
                            onChange={(event) =>
                              atualizarSeta(seta.id, {
                                rotacao: Number(event.target.value),
                              })
                            }
                            style={rangeInput}
                            aria-label={`Giro da seta ${seta.corNome}`}
                          />
                        </label>

                        <label style={controleSetaLabel}>
                          Tamanho: {normalizarTamanhoSeta(seta.tamanho)}
                          <input
                            type="range"
                            min="28"
                            max="120"
                            step="2"
                            value={normalizarTamanhoSeta(seta.tamanho)}
                            onChange={(event) =>
                              atualizarSeta(seta.id, {
                                tamanho: Number(event.target.value),
                              })
                            }
                            style={rangeInput}
                            aria-label={`Tamanho da seta ${seta.corNome}`}
                          />
                        </label>

                        <label style={controleSetaLabel}>
                          Fonte: {normalizarFonteSeta(seta.fonteTamanho)}
                          <input
                            type="range"
                            min="10"
                            max="22"
                            step="1"
                            value={normalizarFonteSeta(seta.fonteTamanho)}
                            onChange={(event) =>
                              atualizarSeta(seta.id, {
                                fonteTamanho: Number(event.target.value),
                              })
                            }
                            style={rangeInput}
                            aria-label={`Tamanho da fonte da seta ${seta.corNome}`}
                          />
                        </label>
                      </div>
                    ) : null}
                    <div
                      className="microscopia-seta-acoes"
                      style={seta.marcadorTipo === "numero" ? setaAcoesNumero : setaAcoes}
                    >
                      <button
                        type="button"
                        className="btn btn--primary btn--compact"
                        onClick={(event) => {
                          event.stopPropagation();
                          prepararProximaSeta(seta);
                        }}
                      >
                        Próxima
                      </button>
                      <button
                        type="button"
                        className="btn btn--secondary btn--compact"
                        onClick={(event) => {
                          event.stopPropagation();
                          removerSeta(seta.id);
                        }}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={muted}>
                {setasConcluidas.length
                  ? "Toque na imagem para criar a próxima seta."
                  : "Nenhuma seta adicionada ainda."}
              </p>
            )}

            {setasConcluidas.length && usaMarcadoresNumerados ? (
              <p style={legendaResumoCompacto}>
                {setasConcluidas.length}{" "}
                {setasConcluidas.length === 1 ? "número marcado" : "números marcados"}.
                Clique em um número na referência ou na foto para editar.
              </p>
            ) : null}

            {setasConcluidas.length && !usaMarcadoresNumerados ? (
              <div className="microscopia-legenda-gerada" style={legendaGeradaBox}>
                <div style={legendaGeradaTitulo}>Estruturas já registradas</div>
                <div className="microscopia-legenda-gerada-lista" style={legendaGeradaLista}>
                  {setasConcluidas.map((seta) => (
                    <div
                      key={seta.id}
                      className="microscopia-legenda-gerada-item"
                      style={legendaGeradaItem}
                    >
                      <span style={{ ...amostraCor, background: seta.cor }} />
                      <strong style={legendaCor}>{seta.corNome}</strong>
                      <span style={legendaGeradaTexto}>
                        {seta.legenda || "sem legenda"}
                      </span>
                      <button
                        type="button"
                        className="btn btn--secondary btn--compact"
                        onClick={() => editarSeta(seta)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn--secondary btn--compact"
                        onClick={() => removerSeta(seta.id)}
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
                    </section>
                  ) : null}

                  {registroAtivo.foto && usaMarcadoresNumerados ? (
                    <FotoInsetoControl
                      titulo={tituloFotoAtual}
                      alt={registroAtivo.titulo || altFotoAtual}
                      fotoInseto={registroAtivo.foto}
                      mostrarPreview={false}
                      compacto
                      ocultarTitulo
                      onFotoInsetoChange={atualizarFotoRegistro}
                    />
                  ) : null}

                </>
              ) : null}
            </section>
          </section>
        </>
      ) : null}

      {!config.ocultarSintese && etapaTelaAtiva === "sintese" ? (
        <section className="surface microscopia-sintese" style={sinteseBox}>
          <div style={sinteseCabecalho}>
            <div>
              <span style={eyebrow}>Etapa final</span>
              <h3 style={subtitulo}>Síntese do material observado</h3>
            </div>
            <span style={sinteseResumo}>
              {registros.length} {registros.length === 1 ? "registro" : "registros"} na prática
            </span>
          </div>

          <label style={label}>
            Texto geral da prática
            <textarea
              value={sinteseMaterial}
              onChange={(event) => setSinteseMaterial(event.target.value)}
              placeholder="Depois de editar todas as fotos, descreva o conjunto do material observado: estruturas reconhecidas, diferenças entre exemplares, dificuldades de identificação e conclusão da prática."
              style={sinteseTextarea}
            />
          </label>
        </section>
      ) : null}

      {etapaTelaAtiva === "revisao" ? (
      <section className="surface microscopia-revisao" style={revisaoBox}>
        <div style={sinteseCabecalho}>
          <div>
            <span style={eyebrow}>Revisão</span>
            <h3 style={subtitulo}>Antes do relatório</h3>
          </div>
          <span
            style={{
              ...revisaoStatus,
              ...(avisosRevisao.length ? revisaoStatusAlerta : revisaoStatusOk),
            }}
          >
            {avisosRevisao.length
              ? `${avisosRevisao.length} ${avisosRevisao.length === 1 ? "aviso" : "avisos"}`
              : "pronto"}
          </span>
        </div>

        {resumoMarcacoesReferencia.length ? (
          <div style={revisaoMarcacoesBox}>
            {resumoMarcacoesReferencia.map((item) => {
              const completo = item.marcados === item.total;

              return (
                <div
                  key={item.id}
                  style={{
                    ...revisaoMarcacaoItem,
                    ...(completo ? revisaoMarcacaoOk : revisaoMarcacaoPendente),
                  }}
                >
                  <strong>{item.nome}</strong>
                  <span>
                    {item.marcados} de {item.total} números marcados
                  </span>
                </div>
              );
            })}
          </div>
        ) : null}

        {avisosRevisao.length ? (
          <ul style={revisaoLista}>
            {avisosRevisao.map((aviso) => (
              <li key={aviso} style={revisaoItem}>
                {aviso}
              </li>
            ))}
          </ul>
        ) : (
          <p style={muted}>
            Os registros têm conteúdo suficiente para gerar o relatório.
          </p>
        )}
      </section>
      ) : null}
    </main>
  );
}

function formatarMeta(config, valor) {
  const opcao = config.metaOptions?.find(([id]) => id === valor);
  return opcao?.[1] || valor || "";
}

function ordenarRegistrosPorMeta(config, registros) {
  if (!Array.isArray(registros)) return [];

  const ordemMeta = new Map(
    (config.metaOptions || []).map(([valor], index) => [valor, index]),
  );

  return registros
    .map((registro, index) => ({ registro, index }))
    .sort((a, b) => {
      const ordemA = ordemMeta.get(a.registro.metaValor) ?? Number.MAX_SAFE_INTEGER;
      const ordemB = ordemMeta.get(b.registro.metaValor) ?? Number.MAX_SAFE_INTEGER;

      if (ordemA !== ordemB) return ordemA - ordemB;

      return a.index - b.index;
    })
    .map((item) => item.registro);
}

function expandirRegistrosParaRelatorio(registros) {
  return registros.flatMap((registro) => {
    const rascunhosPorMeta = registro.rascunhosPorMeta || {};
    const metas = Array.from(
      new Set([registro.metaValor, ...Object.keys(rascunhosPorMeta)]),
    );

    const expandidos = metas.map((metaValor) => {
      const snapshot =
        metaValor === registro.metaValor
          ? {
              foto: registro.foto || "",
              edicaoConcluida: Boolean(registro.edicaoConcluida),
              setas: Array.isArray(registro.setas) ? registro.setas : [],
            }
          : rascunhosPorMeta[metaValor] || {
              foto: "",
              edicaoConcluida: false,
              setas: [],
            };

      return {
        ...registro,
        id: `${registro.id}::${metaValor}`,
        metaValor,
        foto: String(snapshot.foto || ""),
        edicaoConcluida: Boolean(snapshot.edicaoConcluida),
        setas: Array.isArray(snapshot.setas) ? snapshot.setas : [],
      };
    });

    return expandidos.filter((item) =>
      Boolean(item.foto || item.setas?.length || item.observacoes?.trim() || item.titulo?.trim()),
    );
  });
}

function formatarHorarioCurto(valor) {
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return "agora";

  return data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function obterReferenciaRelatorio(config, valor) {
  return config.referenciasAnotacao?.[valor] || null;
}

function obterTituloFoto(config, metaValor) {
  return config.tituloFotoPorMeta?.[metaValor] || config.tituloFoto;
}

function obterAltFoto(config, metaValor) {
  return config.altFotoPorMeta?.[metaValor] || config.altFoto;
}

function obterResumoMeta(config, metaValor) {
  return config.metaResumoPorValor?.[metaValor] || "";
}

function obterOrientacaoEtapa(config, metaValor) {
  return (
    config.registrosPadrao?.find((registro) => registro.metaValor === metaValor)
      ?.observacoes || ""
  );
}

function obterDadosContexto(config) {
  return Array.isArray(config.dadosContexto) ? config.dadosContexto : [];
}

function obterSecoesRoteiroRelatorio(config) {
  if (!config?.incluirRoteiroNoRelatorio) return [];

  const secoes = Array.isArray(config?.roteiro?.secoes) ? config.roteiro.secoes : [];
  return secoes
    .filter((secao) => /objetivos|procedimento/i.test(String(secao?.titulo || "")))
    .map((secao) => ({
      titulo: String(secao.titulo || ""),
      itens: Array.isArray(secao.itens)
        ? secao.itens.map((item) => String(item || "")).filter(Boolean)
        : [],
    }))
    .filter((secao) => secao.titulo && secao.itens.length);
}

function montarItemSessaoHistologia({ config, registro, index, secoesRoteiroRelatorio }) {
  const campos = Array.isArray(config?.camposRelatorioExtras)
    ? config.camposRelatorioExtras
    : [];
  const camposPreenchidos = campos
    .map((campo) => ({
      id: campo.id,
      label: campo.label,
      valor: obterValorCampoRelatorio(registro, campo.id).trim(),
    }))
    .filter((campo) => campo.label && campo.valor);

  const registroPassos = [
    {
      passo: config.campoIdentificacao || "Identificação",
      alternativa: "Registro",
      escolha: registro.titulo || config.tituloFallbackRelatorio || "Sem identificação",
    },
    ...(config.metaLabel
      ? [
          {
            passo: config.metaLabel,
            alternativa: "Contexto",
            escolha: formatarMeta(config, registro.metaValor),
          },
        ]
      : []),
  ];

  return {
    inseto: index + 1,
    titulo: config.tituloRelatorio || "",
    ordem: formatarMeta(config, registro.metaValor),
    resultado:
      camposPreenchidos.find((campo) => campo.id === "classificacaoTecido")?.valor ||
      registro.titulo ||
      formatarMeta(config, registro.metaValor) ||
      "Registro histológico",
    registro: registroPassos,
    fotoInseto: registro.foto || "",
    fotoInsetoEdicaoConcluida: Boolean(registro.edicaoConcluida),
    fotoInsetoSetas: Array.isArray(registro.setas) ? registro.setas : [],
    detalhesTipoRelatorio: {
      camposHistologia: camposPreenchidos,
      observacoes: String(registro.observacoes || "").trim(),
      objetivos: secoesRoteiroRelatorio.find((secao) => /objetivos/i.test(secao.titulo))?.itens || [],
      procedimento:
        secoesRoteiroRelatorio.find((secao) => /procedimento/i.test(secao.titulo))?.itens || [],
    },
  };
}

function obterValorCampoRelatorio(registro, campoId) {
  if (campoId === "observacoesComplementares") {
    return String(registro?.observacoes || "");
  }

  return String(registro?.camposRelatorio?.[campoId] || "");
}

function CamposRelatorioRegistro({ config, registro }) {
  const campos = Array.isArray(config?.camposRelatorioExtras)
    ? config.camposRelatorioExtras
    : [];
  const preenchidos = campos
    .map((campo) => ({
      label: campo.label,
      valor: obterValorCampoRelatorio(registro, campo.id).trim(),
    }))
    .filter((campo) => campo.label && campo.valor);

  if (!preenchidos.length) return null;

  return (
    <div style={relatorioCamposBox}>
      {preenchidos.map((campo) => (
        <div key={campo.label} style={relatorioCampoItem}>
          <strong>{campo.label}:</strong> {campo.valor}
        </div>
      ))}
    </div>
  );
}

function ReferenciaRelatorio({ referencia }) {
  if (!referencia?.partes?.length) return null;

  return (
    <div style={relatorioReferenciaBox}>
      <strong>Referência utilizada</strong>
      <div style={relatorioReferenciaLista}>
        {referencia.partes.map((parte, index) => (
          <span key={parte.id} style={relatorioReferenciaItem}>
            {index + 1}. {parte.nome}
          </span>
        ))}
      </div>
    </div>
  );
}

function DadosContextoRelatorio({ dados }) {
  if (!dados.length) return null;

  return (
    <div style={relatorioReferenciaBox}>
      <strong>Dados da prática</strong>
      <div style={relatorioReferenciaLista}>
        {dados.map(([rotulo, valor]) => (
          <span key={`${rotulo}-${valor}`} style={relatorioReferenciaItem}>
            {rotulo}: {valor}
          </span>
        ))}
      </div>
    </div>
  );
}

function montarReferenciaRelatorioHtml(config, valor) {
  const referencia = obterReferenciaRelatorio(config, valor);
  if (!referencia?.partes?.length) return "";

  return `<div class="referencia">
    <strong>Referência utilizada:</strong>
    <ul>
      ${referencia.partes
        .map((parte, index) => `<li>${index + 1}. ${escapeHtml(parte.nome)}</li>`)
        .join("")}
    </ul>
  </div>`;
}

function montarCamposRelatorioHtml(config, registro) {
  const campos = Array.isArray(config?.camposRelatorioExtras)
    ? config.camposRelatorioExtras
    : [];
  const preenchidos = campos
    .map((campo) => ({
      label: campo.label,
      valor: obterValorCampoRelatorio(registro, campo.id).trim(),
    }))
    .filter((campo) => campo.label && campo.valor);

  if (!preenchidos.length) return "";

  return `<div class="referencia">
    ${preenchidos
      .map(
        (campo) =>
          `<p><strong>${escapeHtml(campo.label)}:</strong> ${escapeHtml(campo.valor)}</p>`,
      )
      .join("")}
  </div>`;
}

function criarLegendaReferencia(parte, index) {
  if (!parte) return "";
  return `${index + 1}. ${parte.nome}`;
}

const page = {
  display: "grid",
  gap: 14,
  maxWidth: 1380,
  margin: "0 auto",
  padding: "16px min(4vw, 24px) 30px",
};

const rascunhoStatusBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 12,
  color: "var(--color-muted)",
  fontSize: 13,
  fontWeight: 700,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
  padding: 18,
  borderRadius: 18,
  border: "1px solid var(--color-border)",
};

const eyebrow = {
  color: "var(--color-secondary)",
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const titulo = {
  margin: "4px 0 8px",
  fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
  lineHeight: 1.05,
};

const intro = {
  maxWidth: 760,
  margin: 0,
  color: "var(--color-muted)",
  lineHeight: 1.5,
};

const acoesTopo = {
  display: "flex",
  alignItems: "start",
  gap: 8,
  flexWrap: "wrap",
};

const roteiroBox = {
  padding: 12,
  borderRadius: 16,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const apoioLateralBox = {
  display: "grid",
  gap: 6,
  padding: 12,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const apoioLateralTitulo = {
  fontSize: 14,
};

const apoioLateralTexto = {
  margin: 0,
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.45,
};

const transicaoWorkspaceBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const transicaoWorkspaceCopy = {
  display: "grid",
  gap: 4,
  maxWidth: 760,
};

const transicaoWorkspaceTitulo = {
  fontSize: 14,
};

const transicaoWorkspaceTexto = {
  margin: 0,
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.45,
};

const workspaceIntroBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const workspaceIntroCopy = {
  display: "grid",
  gap: 4,
  maxWidth: 760,
};

const workspaceIntroTitulo = {
  fontSize: 14,
};

const workspaceIntroTexto = {
  margin: 0,
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.45,
};

const workspace = {
  display: "grid",
  gridTemplateColumns: "minmax(220px, 280px) minmax(0, 1.25fr)",
  gap: 18,
};

const workspaceSemLista = {
  ...workspace,
  gridTemplateColumns: "minmax(0, 1fr)",
};

const listaRegistros = {
  display: "grid",
  alignContent: "start",
  gap: 8,
  minWidth: 0,
};

const itemRegistro = {
  display: "grid",
  gap: 4,
  appearance: "none",
  WebkitAppearance: "none",
  outline: "none",
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  boxShadow: "none",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  textAlign: "left",
  cursor: "pointer",
};

const itemAtivo = {
  ...itemRegistro,
  borderColor: "var(--color-primary)",
  boxShadow: "var(--shadow-sm)",
};

const editor = {
  display: "grid",
  gap: 14,
  minWidth: 0,
  padding: 18,
  borderRadius: 16,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
};

const linhaCampos = {
  display: "flex",
  gap: 10,
  alignItems: "end",
  flexWrap: "wrap",
};

const label = {
  display: "grid",
  gap: 6,
  flex: "1 1 260px",
  color: "var(--color-text)",
  fontSize: 13,
  fontWeight: 800,
};

const labelCurto = {
  ...label,
  flex: "0 1 190px",
};

const input = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 11px",
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
  color: "var(--color-text)",
};

const inputCompacto = {
  ...input,
  padding: "6px 8px",
  minHeight: 34,
  fontSize: 12,
};

const metaResumoBox = {
  display: "grid",
  gap: 8,
  padding: 12,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const metaResumoTopo = {
  display: "grid",
  gap: 2,
};

const metaResumoEyebrow = {
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const metaResumoTitulo = {
  fontSize: 15,
};

const metaResumoTexto = {
  margin: 0,
  color: "var(--color-text)",
  lineHeight: 1.45,
};

const metaResumoChips = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const metaResumoChip = {
  padding: "6px 9px",
  borderRadius: 999,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  fontSize: 12,
  color: "var(--color-muted)",
};

const textarea = {
  ...input,
  minHeight: 96,
  resize: "vertical",
  fontFamily: "inherit",
};

const camposRelatorioBox = {
  display: "grid",
  gap: 10,
};

const sinteseBox = {
  display: "grid",
  gap: 12,
  padding: 16,
  borderRadius: 16,
};

const sinteseCabecalho = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
  flexWrap: "wrap",
};

const sinteseResumo = {
  padding: "6px 9px",
  borderRadius: 999,
  background: "var(--color-surface-soft)",
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 850,
};

const sinteseTextarea = {
  ...textarea,
  minHeight: 150,
};

const revisaoBox = {
  display: "grid",
  gap: 12,
  padding: 16,
  borderRadius: 16,
};

const revisaoStatus = {
  padding: "6px 9px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 900,
};

const revisaoStatusOk = {
  background: "var(--color-success-soft)",
  color: "var(--color-success-text)",
};

const revisaoStatusAlerta = {
  background: "var(--color-warning-soft)",
  color: "var(--color-warning-text)",
};

const revisaoLista = {
  display: "grid",
  gap: 7,
  margin: 0,
  padding: 0,
  listStyle: "none",
};

const revisaoItem = {
  padding: "8px 10px",
  borderRadius: 10,
  background: "var(--color-surface-soft)",
  color: "var(--color-text)",
  fontSize: 13,
  lineHeight: 1.35,
};

const revisaoMarcacoesBox = {
  display: "grid",
  gap: 7,
};

const revisaoMarcacaoItem = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  fontSize: 13,
};

const revisaoMarcacaoOk = {
  background: "var(--color-success-soft)",
  color: "var(--color-success-text)",
};

const revisaoMarcacaoPendente = {
  background: "var(--color-warning-soft)",
  color: "var(--color-warning-text)",
};

const palette = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexWrap: "wrap",
  padding: 6,
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const corBotao = {
  width: 28,
  height: 28,
  minHeight: 0,
  padding: 0,
  borderRadius: 999,
  border: "2px solid white",
  cursor: "pointer",
  boxShadow: "var(--shadow-sm)",
  flexShrink: 0,
};

const paletteTexto = {
  flex: "1 1 180px",
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 750,
  lineHeight: 1.25,
};

const novaSetaBotao = {
  minHeight: 34,
  padding: "0.38rem 0.65rem",
};

const imagemBox = {
  minHeight: 220,
  display: "grid",
  placeItems: "center",
  borderRadius: 14,
  background: "var(--color-bg-soft)",
  border: "1px dashed var(--color-border)",
  overflow: "auto",
};

const editorImagemGrid = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.25fr) minmax(252px, 320px)",
  gap: 12,
  alignItems: "start",
};

const editorImagemGridSemReferencia = {
  gridTemplateColumns: "minmax(0, 1fr)",
  maxWidth: 980,
};

const fotoMarcacaoCol = {
  display: "grid",
  gap: 8,
  minWidth: 0,
};

const imagemEditor = {
  maxHeight: 720,
};

const referenciaEditor = {
  display: "grid",
  gap: 6,
  padding: 8,
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  minWidth: 0,
};

const referenciaTopo = {
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
  gap: 10,
};

const referenciaNumero = {
  width: 34,
  height: 34,
  display: "grid",
  placeItems: "center",
  borderRadius: 999,
  background: "var(--color-primary)",
  color: "white",
  fontWeight: 950,
};

const referenciaBotao = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: 28,
  padding: "4px 6px",
  textAlign: "center",
  whiteSpace: "normal",
  lineHeight: 1.12,
  fontSize: 11,
};

const referenciaBotaoAtivo = {
  ...referenciaBotao,
  background: "color-mix(in srgb, var(--referencia-cor, var(--color-primary)) 14%, var(--color-surface))",
  borderColor: "var(--referencia-cor, var(--color-primary))",
  boxShadow: "0 0 0 2px color-mix(in srgb, var(--referencia-cor, var(--color-primary)) 22%, transparent)",
};

const referenciaBotaoUsado = {
  ...referenciaBotao,
  background: "color-mix(in srgb, var(--referencia-cor, var(--color-success)) 20%, var(--color-surface))",
  borderColor: "var(--referencia-cor, var(--color-success))",
  boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--referencia-cor, var(--color-success)) 18%, transparent)",
};

const legendaBox = {
  display: "grid",
  gap: 6,
  padding: 10,
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const subtitulo = {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.2,
};

const legendaLista = {
  display: "grid",
  gap: 6,
};

const legendaGeradaBox = {
  display: "grid",
  gap: 8,
  padding: 10,
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const legendaGeradaTitulo = {
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 900,
  textTransform: "uppercase",
};

const legendaGeradaLista = {
  display: "grid",
  gap: 6,
};

const legendaGeradaItem = {
  display: "grid",
  gridTemplateColumns: "18px 76px minmax(150px, 1fr) auto auto",
  alignItems: "center",
  gap: 8,
};

const legendaGeradaTexto = {
  color: "var(--color-text)",
  fontSize: 13,
  lineHeight: 1.3,
};

const legendaLinha = {
  display: "grid",
  gridTemplateColumns: "22px 76px minmax(0, 1fr)",
  alignItems: "center",
  gap: 8,
};

const legendaLinhaNumero = {
  gridTemplateColumns: "18px 44px minmax(0, 1fr)",
  gap: 6,
  padding: 6,
  minHeight: 40,
  borderRadius: 8,
  background: "var(--color-bg-soft)",
  border: "1px solid var(--color-border)",
};

const legendaLinhaAtiva = {
  borderColor: "var(--color-primary)",
  boxShadow: "0 0 0 2px color-mix(in srgb, var(--color-primary) 18%, transparent)",
};

const setaControles = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 6,
  gridColumn: "1 / -1",
  width: "100%",
  minWidth: 0,
  padding: "4px 0",
};

const setaAcoes = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(120px, 160px))",
  justifyContent: "end",
  gap: 8,
  gridColumn: "1 / -1",
  width: "100%",
};

const setaAcoesNumero = {
  ...setaAcoes,
  gridTemplateColumns: "repeat(2, minmax(88px, 120px))",
  gap: 6,
};

const legendaResumoCompacto = {
  margin: 0,
  padding: "7px 9px",
  borderRadius: 10,
  background: "var(--color-bg-soft)",
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 750,
};

const controleSetaLabel = {
  display: "grid",
  gap: 2,
  color: "var(--color-muted)",
  fontSize: 10,
  fontWeight: 800,
  minWidth: 0,
};

const rangeInput = {
  width: "100%",
  minWidth: 0,
};

const amostraCor = {
  width: 18,
  height: 18,
  borderRadius: 999,
  border: "2px solid white",
  boxShadow: "var(--shadow-sm)",
};

const legendaCor = {
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 850,
};

const muted = {
  margin: 0,
  color: "var(--color-muted)",
};

const blocoFiguraDidatica = {
  display: "grid",
  gap: 8,
  marginBottom: 14,
  padding: 12,
  borderRadius: 14,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const imagemDidatica = {
  width: "100%",
  maxHeight: 300,
  objectFit: "contain",
  borderRadius: 10,
  background: "var(--color-bg-soft)",
};

const textoFiguraDidatica = {
  margin: 0,
  color: "var(--color-muted)",
  fontSize: 13,
};

const relatorioBox = {
  display: "grid",
  gap: 14,
  padding: 14,
  borderRadius: 18,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
};

const relatorioCamposBox = {
  display: "grid",
  gap: 8,
  marginBottom: 12,
  padding: 12,
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const relatorioCampoItem = {
  color: "var(--color-text)",
  fontSize: 13,
  lineHeight: 1.5,
};

const relatorioListaRoteiro = {
  margin: 0,
  paddingLeft: 20,
  display: "grid",
  gap: 6,
  color: "var(--color-text)",
};

const relatorioListaRoteiroItem = {
  lineHeight: 1.5,
};

const relatorioItem = {
  display: "grid",
  gap: 10,
  padding: 12,
  borderRadius: 14,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  pageBreakInside: "avoid",
};

const relatorioAcoes = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const sucessoBox = {
  padding: "10px 12px",
  borderRadius: 12,
  background: "var(--color-success-soft)",
  color: "var(--color-success-text)",
  fontWeight: 700,
};

const erroBox = {
  padding: "10px 12px",
  borderRadius: 12,
  background: "var(--color-danger-soft)",
  color: "var(--color-danger-text)",
  fontWeight: 700,
};

const relatorioTitulo = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.2,
};

const relatorioMeta = {
  margin: 0,
  color: "var(--color-muted)",
};

const relatorioReferenciaBox = {
  display: "grid",
  gap: 7,
  padding: 10,
  borderRadius: 10,
  background: "var(--color-bg-soft)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
};

const relatorioReferenciaLista = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
};

const relatorioReferenciaItem = {
  padding: "4px 7px",
  borderRadius: 999,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 800,
};

const relatorioImagemContainer = {
  display: "inline-block",
  maxWidth: "100%",
};

const relatorioImagemFrame = {
  position: "relative",
  width: "fit-content",
  maxWidth: "100%",
  cursor: "default",
  overflow: "hidden",
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
};

const relatorioImagem = {
  display: "block",
  width: "auto",
  maxWidth: "100%",
  maxHeight: 620,
  objectFit: "contain",
};

const relatorioLegendaLista = {
  display: "grid",
  gap: 7,
  margin: 0,
  padding: 0,
  listStyle: "none",
};

const relatorioLegendaItem = {
  display: "grid",
  gridTemplateColumns: "18px minmax(120px, 1fr)",
  alignItems: "center",
  gap: 8,
  color: "var(--color-text)",
};

const relatorioObservacoes = {
  margin: 0,
  padding: 10,
  borderRadius: 10,
  background: "var(--color-bg-soft)",
  color: "var(--color-muted)",
  whiteSpace: "pre-wrap",
};
