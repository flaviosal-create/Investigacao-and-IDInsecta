import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import AtlasHistologiaAutoriaPanel from "./AtlasHistologiaAutoriaPanel.jsx";
import AtlasHistologiaLaminaCard from "./AtlasHistologiaLaminaCard.jsx";
import { CampoSelect } from "../components/EditorSupportBlocks.jsx";
import {
  listarItensPendentesSincronizacao,
  mesclarColecaoComRemotaDetalhada,
} from "../utils/colecaoSincronizacao.js";
import {
  atlasHistologiaModules,
} from "./histologiaAtlasModelo.js";
import {
  criarStatusColecaoSincronizada,
  criarStatusConflitoResolvido,
  criarStatusContaSemDados,
  criarStatusFalhaEnvio,
  criarStatusFalhaSincronizacao,
  criarStatusInicial,
  criarStatusLocal,
  criarStatusSincronizandoNuvem,
  obterStatusCardStyle,
  obterStatusItemStyle,
  resolverStatusItem,
} from "../utils/sincronizacaoStatus.js";

const STATUS_CONTEXTO_ATLAS = {
  singular: "lâmina",
  plural: "lâminas",
  tituloLocal: "Atlas local",
  tituloConectando: "Conectando atlas",
  tituloSincronizada: "Atlas sincronizado",
};

export default function AtividadeAtlasHistologiaApp({
  onBack,
  modo = "construcao",
  professorUserId = "",
  acessoAluno = null,
  onListarRelatorios = null,
}) {
  const atlasEscopo = modo === "atlas" ? "aluno" : "app";
  const atlasLocalInicial = useMemo(
    () => carregarAtlasLocal(atlasEscopo),
    [atlasEscopo],
  );
  const workspaceInicial = atlasLocalInicial.workspace || {};
  const atlasInicialTemLamina =
    Object.keys(atlasLocalInicial.atlas?.rascunhos || {}).length > 0 ||
    Object.keys(atlasLocalInicial.atlas?.publicadas || {}).length > 0;
  const [atlasSalvo, setAtlasSalvo] = useState(() => atlasLocalInicial.atlas);
  const atlasSalvoInicialRef = useRef(atlasLocalInicial.atlas);
  const [podePersistirAtlas] = useState(
    () => atlasLocalInicial.podePersistir,
  );
  const [moduloAtivoId, setModuloAtivoId] = useState(
    workspaceInicial.moduloAtivoId || atlasHistologiaModules[0]?.id || "",
  );
  const [telaAtivaId, setTelaAtivaId] = useState(
    () =>
      workspaceInicial.telaAtivaId === "autoria" && !atlasInicialTemLamina
        ? "modulo"
        : workspaceInicial.telaAtivaId || "laminas",
  );
  const [mensagemFluxo, setMensagemFluxo] = useState(
    () => atlasLocalInicial.mensagem || "",
  );
  const [avisoRecuperacao] = useState(() => atlasLocalInicial.mensagem || "");
  const [statusSincronizacao, setStatusSincronizacao] = useState(() =>
    criarStatusInicial(modo === "atlas" ? "" : professorUserId, STATUS_CONTEXTO_ATLAS),
  );
  const [statusPorItem, setStatusPorItem] = useState({});
  const [laminaAtivaId, setLaminaAtivaId] = useState(
    () => workspaceInicial.laminaAtivaId || "",
  );
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroAumento, setFiltroAumento] = useState("todos");
  const [visaoColecaoAtiva, setVisaoColecaoAtiva] = useState(
    () => workspaceInicial.visaoColecaoAtiva || "lista",
  );
  const [enviandoColecao, setEnviandoColecao] = useState(false);
  const atlasSomenteEditados = modo === "atlas";
  const professorAtlasId = atlasSomenteEditados ? "" : professorUserId;
  const laminasEditadas = useMemo(() => atlasSalvo.rascunhos || {}, [atlasSalvo.rascunhos]);
  const laminasPublicadas = useMemo(
    () => atlasSalvo.publicadas || {},
    [atlasSalvo.publicadas],
  );
  const itensPendentesSincronizacao = useMemo(
    () =>
      professorAtlasId
        ? listarItensPendentesSincronizacao(atlasSalvo, statusPorItem)
        : [],
    [atlasSalvo, professorAtlasId, statusPorItem],
  );

  useEffect(() => {
    if (!atlasSomenteEditados || !acessoAluno?.aluno?.id || !onListarRelatorios) {
      return undefined;
    }

    let ativo = true;
    onListarRelatorios()
      .then((relatorios) => {
        if (!ativo) return;
        const laminas = converterRelatoriosEmLaminasAtlasAluno(relatorios);
        setAtlasSalvo((atual) => ({
          ...atual,
          publicadas: {
            ...Object.fromEntries(laminas.map((lamina) => [lamina.id, lamina])),
            ...(atual.publicadas || {}),
          },
          atualizadoEm: new Date().toISOString(),
        }));
        setMensagemFluxo(
          laminas.length
            ? `${laminas.length} ${laminas.length === 1 ? "registro" : "registros"} do aluno carregado${laminas.length === 1 ? "" : "s"} no atlas.`
            : "Ainda não há fotos editadas enviadas para compor o atlas.",
        );
      })
      .catch((error) => {
        if (!ativo) return;
        setMensagemFluxo(error?.message || "Não foi possível carregar seus registros para o atlas.");
      })

    return () => {
      ativo = false;
    };
  }, [acessoAluno?.aluno?.id, atlasSomenteEditados, onListarRelatorios]);

  const moduloAtivo = useMemo(
    () =>
      atlasHistologiaModules.find((modulo) => modulo.id === moduloAtivoId) ||
      atlasHistologiaModules[0] ||
      null,
    [moduloAtivoId],
  );
  const laminasBaseDoModulo = useMemo(
    () => [],
    [],
  );
  const laminasSalvasDoModulo = useMemo(
    () =>
      [...Object.values(laminasPublicadas), ...Object.values(laminasEditadas)]
        .filter(
          (slide) =>
            slide &&
            slide.moduloId === moduloAtivo?.id,
        )
        .reduce((acc, slide) => {
          if (!slide?.id) return acc;
          acc.set(slide.id, slide);
          return acc;
        }, new Map()),
    [laminasEditadas, laminasPublicadas, moduloAtivo],
  );
  const correspondenciaSalvaPorBaseId = useMemo(() => {
    const mapa = new Map();
    const salvas = Array.from(laminasSalvasDoModulo.values());

    laminasBaseDoModulo.forEach((base) => {
      const direta = salvas.find((slide) => slide.id === base.id);
      if (direta) {
        mapa.set(base.id, direta);
        return;
      }

      const porTitulo = salvas.find(
        (slide) =>
          normalizarChaveTitulo(slide?.titulo) === normalizarChaveTitulo(base?.titulo),
      );
      if (porTitulo) {
        mapa.set(base.id, porTitulo);
      }
    });

    return mapa;
  }, [laminasBaseDoModulo, laminasSalvasDoModulo]);
  const laminasDoModulo = useMemo(
    () => {
      const base = laminasBaseDoModulo.map((slide) => {
          const salva = correspondenciaSalvaPorBaseId.get(slide.id);
          const idSalvo = salva?.id;

          if (idSalvo && laminasPublicadas[idSalvo]) {
            return {
              ...slide,
              ...laminasPublicadas[idSalvo],
              id: slide.id,
              origemAtlas: "publicada",
            };
          }
          if (idSalvo && laminasEditadas[idSalvo]) {
            return {
              ...slide,
              ...laminasEditadas[idSalvo],
              id: slide.id,
              origemAtlas: "rascunho",
            };
          }
          return {
            ...slide,
            origemAtlas: "modelo",
          };
        });

      const idsBase = new Set(base.map((slide) => slide.id));
      const idsSalvosVinculados = new Set(
        Array.from(correspondenciaSalvaPorBaseId.values())
          .map((slide) => slide?.id)
          .filter(Boolean),
      );
      const extras = Array.from(laminasSalvasDoModulo.values())
        .filter((slide) => !idsBase.has(slide.id) && !idsSalvosVinculados.has(slide.id))
        .map((slide) => ({
          ...slide,
          origemAtlas: laminasPublicadas[slide.id] ? "publicada" : "rascunho",
        }));

      const ordenadas = [...base, ...extras].sort(
        (a, b) =>
          Number(a?.sequenciaOrdem || 99) - Number(b?.sequenciaOrdem || 99),
      );

      const porAssinatura = new Map();
      ordenadas.forEach((slide) => {
        const assinatura = criarAssinaturaLamina(slide);
        const existente = porAssinatura.get(assinatura);
        if (!existente || prioridadeOrigemAtlas(slide.origemAtlas) > prioridadeOrigemAtlas(existente.origemAtlas)) {
          porAssinatura.set(assinatura, slide);
        }
      });

      return Array.from(porAssinatura.values()).sort(
        (a, b) =>
          Number(a?.sequenciaOrdem || 99) - Number(b?.sequenciaOrdem || 99),
      );
    },
    [
      correspondenciaSalvaPorBaseId,
      laminasBaseDoModulo,
      laminasEditadas,
      laminasPublicadas,
      laminasSalvasDoModulo,
    ],
  );
  const categoriasDisponiveis = useMemo(
    () =>
      Array.from(
        new Set(
          laminasDoModulo
            .map((slide) => slide?.categoriaId)
            .filter(Boolean),
        ),
      ),
    [laminasDoModulo],
  );
  const aumentosDisponiveis = useMemo(
    () =>
      Array.from(
        new Set(
          laminasDoModulo
            .map((slide) => slide?.metadados?.aumento)
            .filter(Boolean),
        ),
      ),
    [laminasDoModulo],
  );
  const laminasFiltradas = useMemo(
    () =>
      laminasDoModulo.filter((slide) => {
        if (atlasSomenteEditados && slide.origemAtlas === "modelo") {
          return false;
        }
        if (filtroCategoria !== "todas" && slide.categoriaId !== filtroCategoria) {
          return false;
        }
        if (filtroAumento !== "todos" && slide.metadados?.aumento !== filtroAumento) {
          return false;
        }
        if (filtroStatus === "publicadas" && !laminasPublicadas[slide.id]) {
          return false;
        }
        if (filtroStatus === "rascunhos" && !laminasEditadas[slide.id]) {
          return false;
        }
        if (filtroStatus === "modelo" && (laminasEditadas[slide.id] || laminasPublicadas[slide.id])) {
          return false;
        }
        return true;
      }),
    [
      filtroAumento,
      atlasSomenteEditados,
      filtroCategoria,
      filtroStatus,
      laminasDoModulo,
      laminasEditadas,
      laminasPublicadas,
    ],
  );
  const laminaDestaque = useMemo(
    () =>
      laminasFiltradas.find((slide) => slide.id === laminaAtivaId) ||
      laminasDoModulo.find((slide) => slide.origemAtlas === "publicada") ||
      laminasDoModulo.find((slide) => slide.origemAtlas === "rascunho") ||
      laminasDoModulo.find((slide) => slide.id === laminaAtivaId) ||
      laminasFiltradas[0] ||
      laminasDoModulo[0] ||
      null,
    [laminaAtivaId, laminasDoModulo, laminasFiltradas],
  );

  const laminaDestaqueTemEdicaoSalva = Boolean(
    laminaDestaque &&
      (laminasEditadas[laminaDestaque.id] || laminasPublicadas[laminaDestaque.id]),
  );
  const laminaDestaquePublicada = Boolean(
    laminaDestaque && laminasPublicadas[laminaDestaque.id],
  );
  const estadoLaminaDestaque = laminaDestaquePublicada
    ? "publicada"
    : laminaDestaque && laminasEditadas[laminaDestaque.id]
      ? "rascunho"
      : "modelo";
  const statusLaminaDestaque = useMemo(
    () =>
      laminaDestaque
        ? resolverStatusItem(
            laminaDestaque,
          professorAtlasId,
            statusPorItem[laminaDestaque.id],
          )
        : null,
    [laminaDestaque, professorAtlasId, statusPorItem],
  );
  const slidesRelacionados = useMemo(
    () =>
      laminasDoModulo.filter(
        (slide) =>
          slide.id !== laminaDestaque?.id &&
          (slide.grupoId
            ? slide.grupoId === laminaDestaque?.grupoId
            : slide.moduloId === laminaDestaque?.moduloId),
      ),
    [laminaDestaque, laminasDoModulo],
  );
  const laminasPublicadasDoModulo = useMemo(
    () =>
      laminasDoModulo.filter((slide) => Boolean(laminasPublicadas[slide.id])),
    [laminasDoModulo, laminasPublicadas],
  );
  const resumoModulo = useMemo(() => {
    const totalPublicadas = laminasDoModulo.filter((slide) => laminasPublicadas[slide.id]).length;
    const totalRascunhos = laminasDoModulo.filter(
      (slide) => laminasEditadas[slide.id] && !laminasPublicadas[slide.id],
    ).length;
    const totalModelos = laminasDoModulo.length - totalPublicadas - totalRascunhos;
    return { totalPublicadas, totalRascunhos, totalModelos };
  }, [laminasDoModulo, laminasEditadas, laminasPublicadas]);
  useEffect(() => {
    if (!podePersistirAtlas) return;
    const resultado = salvarAtlasLocal({
      ...atlasSalvo,
      workspace: {
        moduloAtivoId,
        telaAtivaId,
        laminaAtivaId,
        visaoColecaoAtiva,
      },
    }, atlasEscopo);
    if (!resultado.ok) {
      window.setTimeout(() => setMensagemFluxo(resultado.mensagem), 0);
    }
  }, [
    atlasSalvo,
    atlasEscopo,
    laminaAtivaId,
    moduloAtivoId,
    podePersistirAtlas,
    telaAtivaId,
    visaoColecaoAtiva,
  ]);

  useEffect(() => {
    if (!professorAtlasId) return;

    let ativo = true;
    import("../services/atlasHistologiaRemoto.js")
      .then(({ carregarAtlasHistologiaRemoto }) =>
        carregarAtlasHistologiaRemoto(professorAtlasId, atlasEscopo)
      )
      .then((remoto) => {
        if (!ativo) return;
        const totalRemoto =
          Object.keys(remoto.rascunhos || {}).length +
          Object.keys(remoto.publicadas || {}).length;

        if (!totalRemoto) {
          setStatusSincronizacao(
            criarStatusContaSemDados(STATUS_CONTEXTO_ATLAS),
          );
          return;
        }

        const mesclado = mesclarColecaoComRemotaDetalhada(
          atlasSalvoInicialRef.current,
          remoto,
        );
        setAtlasSalvo(mesclado.colecao);
        setStatusPorItem((atual) => ({
          ...atual,
          ...Object.fromEntries(
            [
              ...Object.keys(remoto.rascunhos || {}),
              ...Object.keys(remoto.publicadas || {}),
            ].map((id) => [id, "sincronizado"]),
          ),
        }));
        if (mesclado.resumo.totalConflitos > 0) {
          setMensagemFluxo(
            "O atlas foi carregado e as diferenças entre este navegador e a nuvem foram resolvidas automaticamente.",
          );
          setStatusSincronizacao(
            criarStatusConflitoResolvido(
              mesclado.resumo,
              STATUS_CONTEXTO_ATLAS,
            ),
          );
        } else {
          setMensagemFluxo("Atlas carregado da nuvem para esta conta.");
          setStatusSincronizacao(
            criarStatusColecaoSincronizada(STATUS_CONTEXTO_ATLAS),
          );
        }
      })
      .catch((error) => {
        if (!ativo) return;
        setMensagemFluxo(
          error?.message || "Não foi possível carregar o atlas da nuvem.",
        );
        setStatusSincronizacao(
          criarStatusFalhaSincronizacao(
            error?.message,
            STATUS_CONTEXTO_ATLAS,
          ),
        );
      });

    return () => {
      ativo = false;
    };
  }, [atlasEscopo, professorAtlasId]);

  useEffect(() => {
    if (!professorAtlasId || !itensPendentesSincronizacao.length) return;

    const timeoutId = window.setTimeout(() => {
      setStatusSincronizacao((atual) => {
        if (atual.tipo === "erro" || atual.tipo === "sincronizando") return atual;
        return criarStatusLocal(
          `${itensPendentesSincronizacao.length} item(ns) ainda dependem de sincronização com a nuvem.`,
          STATUS_CONTEXTO_ATLAS,
        );
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [itensPendentesSincronizacao, professorAtlasId]);

  function registrarRascunho(laminaAtualizada) {
    const rascunho = {
      ...laminaAtualizada,
      status: laminaAtualizada.status || "rascunho",
      salvoEm: new Date().toISOString(),
    };

    setAtlasSalvo((atual) => ({
      ...atual,
      atualizadoEm: new Date().toISOString(),
      rascunhos: {
        ...atual.rascunhos,
        [rascunho.id]: rascunho,
      },
    }));
    setMensagemFluxo("Rascunho salvo neste dispositivo.");
    if (!laminasPublicadas[rascunho.id]) {
      setStatusPorItem((atual) => ({
        ...atual,
        [rascunho.id]: professorAtlasId ? "sincronizando" : "local",
      }));
      sincronizarLaminaNaNuvem(rascunho, "Rascunho salvo também na nuvem.");
    } else if (!professorAtlasId) {
      setStatusSincronizacao(
        criarStatusLocal(
          "Rascunho salvo apenas neste navegador.",
          STATUS_CONTEXTO_ATLAS,
        ),
      );
    }
  }

  function publicarLamina(laminaAtualizada) {
    const publicada = {
      ...laminaAtualizada,
      status: "publicado",
      publicadoEm: new Date().toISOString(),
    };

    setAtlasSalvo((atual) => ({
      ...atual,
      atualizadoEm: new Date().toISOString(),
      rascunhos: {
        ...atual.rascunhos,
        [publicada.id]: publicada,
      },
      publicadas: {
        ...atual.publicadas,
        [publicada.id]: publicada,
      },
    }));
    setTelaAtivaId("laminas");
    setLaminaAtivaId(publicada.id);
    setMensagemFluxo("Lâmina publicada no atlas deste dispositivo.");
    setStatusPorItem((atual) => ({
      ...atual,
      [publicada.id]: professorAtlasId ? "sincronizando" : "local",
    }));
    sincronizarLaminaNaNuvem(publicada, "Lâmina publicada também na nuvem.");
    if (!professorAtlasId) {
      setStatusSincronizacao(
        criarStatusLocal(
          "A lâmina foi publicada apenas neste navegador.",
          STATUS_CONTEXTO_ATLAS,
        ),
      );
    }
  }

  const atualizarLaminaEmEdicao = useCallback((laminaAtualizada) => {
    setAtlasSalvo((atual) => ({
      ...atual,
      atualizadoEm: new Date().toISOString(),
      rascunhos: {
        ...atual.rascunhos,
        [laminaAtualizada.id]: laminaAtualizada,
      },
    }));
  }, []);

  function criarLaminaDoZero() {
    const novaLamina = {
      id: `atlas-${moduloAtivo?.id || "modulo"}-${Date.now()}`,
      grupoId: "",
      sequenciaOrdem: (laminasDoModulo.at(-1)?.sequenciaOrdem || 0) + 1,
      sequenciaTipo: "autoral",
      moduloId: moduloAtivo?.id || "",
      categoriaId: moduloAtivo?.categorias?.[0] || "",
      titulo: "Nova lâmina",
      subtitulo: "Lâmina autoral em construção",
      foto: "",
      imagemBase: "",
      imagemAnotada: "",
      setas: [],
      estruturas: [],
      metadados: {
        aumento: "",
        coloracao: "",
        origem: "Lâmina autoral",
        observacoesTecnicas: "",
      },
      relacoes: {
        compararCom: [],
        revisarAntesDepois: [],
      },
      status: "rascunho",
      origemAtlas: "rascunho",
      edicaoConcluida: false,
    };

    setAtlasSalvo((atual) => ({
      ...atual,
      atualizadoEm: new Date().toISOString(),
      rascunhos: {
        ...atual.rascunhos,
        [novaLamina.id]: novaLamina,
      },
    }));
    setLaminaAtivaId(novaLamina.id);
    setTelaAtivaId("autoria");
    setVisaoColecaoAtiva("lista");
    setMensagemFluxo("Nova lâmina autoral iniciada neste módulo.");
  }

  async function adicionarColecaoDeImagens(arquivos) {
    if (!professorAtlasId || !arquivos?.length || !moduloAtivo) return;

    setEnviandoColecao(true);
    try {
      const imagens = await Promise.all(
        Array.from(arquivos).map(async (arquivo, indice) => {
          const foto = await lerArquivoComoDataUrl(arquivo);
          const tituloArquivo = removerExtensaoArquivo(arquivo.name);
          const id = `atlas-${moduloAtivo.id}-${Date.now()}-${indice}`;

          return {
            id,
            grupoId: "",
            sequenciaOrdem: (laminasDoModulo.at(-1)?.sequenciaOrdem || 0) + indice + 1,
            sequenciaTipo: "autoral",
            moduloId: moduloAtivo.id,
            categoriaId: moduloAtivo.categorias?.[0] || "",
            titulo: tituloArquivo || "Nova lâmina",
            subtitulo: "Imagem enviada pelo professor",
            foto,
            imagemBase: foto,
            imagemAnotada: foto,
            setas: [],
            estruturas: [],
            metadados: {
              aumento: "",
              coloracao: "",
              origem: "Imagem enviada pelo professor",
              observacoesTecnicas: "",
            },
            relacoes: {
              compararCom: [],
              revisarAntesDepois: [],
            },
            status: "rascunho",
            origemAtlas: "rascunho",
            edicaoConcluida: false,
          };
        }),
      );

      imagens.forEach((imagem) => registrarRascunho(imagem));
      setLaminaAtivaId(imagens[0]?.id || "");
      setTelaAtivaId("autoria");
      setMensagemFluxo(
        `${imagens.length} ${imagens.length === 1 ? "imagem foi adicionada" : "imagens foram adicionadas"} à coleção como rascunho.`,
      );
    } catch (error) {
      setMensagemFluxo(error?.message || "Não foi possível ler as imagens enviadas.");
    } finally {
      setEnviandoColecao(false);
    }
  }

  function descartarRascunho(laminaId) {
    if (!laminaId) return;
    if (
      typeof window !== "undefined" &&
      !window.confirm("Descartar o rascunho desta lâmina neste dispositivo?")
    ) {
      return;
    }

    setAtlasSalvo((atual) => {
      const proximosRascunhos = { ...(atual.rascunhos || {}) };
      delete proximosRascunhos[laminaId];

      return {
        ...atual,
        atualizadoEm: new Date().toISOString(),
        rascunhos: proximosRascunhos,
      };
    });
    // O editor deixa de ter uma lâmina ativa depois do descarte. Voltar para
    // a coleção evita que a tela fique vazia quando esse era o único rascunho.
    setLaminaAtivaId("");
    setTelaAtivaId("laminas");
    setVisaoColecaoAtiva("lista");
    setMensagemFluxo("Rascunho descartado neste dispositivo.");
    if (!laminasPublicadas[laminaId]) {
      removerLaminaDaNuvem(laminasEditadas[laminaId] || { id: laminaId });
    } else if (!professorAtlasId) {
      setStatusSincronizacao(
        criarStatusLocal(
          "O rascunho foi removido apenas deste navegador.",
          STATUS_CONTEXTO_ATLAS,
        ),
      );
    }
  }

  function descartarPublicacao(laminaId) {
    if (!laminaId) return;
    if (
      typeof window !== "undefined" &&
      !window.confirm("Remover a lâmina publicada deste dispositivo?")
    ) {
      return;
    }

    setAtlasSalvo((atual) => {
      const proximosRascunhos = { ...(atual.rascunhos || {}) };
      const proximasPublicadas = { ...(atual.publicadas || {}) };
      delete proximosRascunhos[laminaId];
      delete proximasPublicadas[laminaId];

      return {
        ...atual,
        atualizadoEm: new Date().toISOString(),
        rascunhos: proximosRascunhos,
        publicadas: proximasPublicadas,
      };
    });
    setMensagemFluxo("Lâmina publicada removida deste dispositivo.");
    removerLaminaDaNuvem(laminasPublicadas[laminaId] || { id: laminaId });
    if (!professorAtlasId) {
      setStatusSincronizacao(
        criarStatusLocal(
          "A publicação foi removida apenas deste navegador.",
          STATUS_CONTEXTO_ATLAS,
        ),
      );
    }
  }

  async function sincronizarLaminaNaNuvem(lamina, mensagemSucesso) {
    if (!professorAtlasId) return;

    setStatusPorItem((atual) => ({
      ...atual,
      [lamina.id]: "sincronizando",
    }));
    setStatusSincronizacao(
      criarStatusSincronizandoNuvem(STATUS_CONTEXTO_ATLAS),
    );

    try {
      const { salvarLaminaAtlasHistologiaRemoto } = await import(
        "../services/atlasHistologiaRemoto.js"
      );
      const remota = await salvarLaminaAtlasHistologiaRemoto(
        lamina,
        professorAtlasId,
        atlasEscopo,
      );
      setAtlasSalvo((atual) => ({
        ...atual,
        atualizadoEm: new Date().toISOString(),
        rascunhos: {
          ...(atual.rascunhos || {}),
          [remota.id]: remota,
        },
        publicadas:
          remota.status === "publicado"
            ? {
                ...(atual.publicadas || {}),
                [remota.id]: remota,
              }
            : atual.publicadas,
      }));
      setStatusPorItem((atual) => ({
        ...atual,
        [remota.id]: "sincronizado",
      }));
      setMensagemFluxo(mensagemSucesso);
      setStatusSincronizacao({
        ...criarStatusColecaoSincronizada(STATUS_CONTEXTO_ATLAS),
        descricao: "A nuvem já recebeu a versão mais recente desta lâmina.",
      });
    } catch (error) {
      setMensagemFluxo(
        error?.message ||
          "A lâmina foi salva localmente, mas não foi enviada para a nuvem.",
      );
      setStatusPorItem((atual) => ({
        ...atual,
        [lamina.id]: "erro",
      }));
      setStatusSincronizacao(
        criarStatusFalhaEnvio(error?.message, STATUS_CONTEXTO_ATLAS),
      );
    }
  }

  function tentarSincronizarLamina(lamina) {
    if (!lamina || !professorAtlasId) return;
    sincronizarLaminaNaNuvem(
      lamina,
      lamina.status === "publicado"
        ? "Lâmina publicada sincronizada novamente com a nuvem."
        : "Rascunho sincronizado novamente com a nuvem.",
    );
  }

  async function sincronizarPendencias() {
    if (!professorAtlasId || !itensPendentesSincronizacao.length) return;
    for (const item of itensPendentesSincronizacao) {
      // Sequencial para evitar competição de uploads e feedback duplicado demais.
      await sincronizarLaminaNaNuvem(
        item,
        item.status === "publicado"
          ? "Pendências publicadas sincronizadas com a nuvem."
          : "Pendências em rascunho sincronizadas com a nuvem.",
      );
    }
  }

  async function removerLaminaDaNuvem(lamina) {
    if (!professorAtlasId || !lamina?.id) return;

    try {
      const { removerLaminaAtlasHistologiaRemoto } = await import(
        "../services/atlasHistologiaRemoto.js"
      );
      await removerLaminaAtlasHistologiaRemoto(lamina, professorAtlasId, atlasEscopo);
    } catch (error) {
      setMensagemFluxo(
        error?.message ||
          "Removido localmente, mas não foi possível remover da nuvem.",
      );
    }
  }

  return (
    <main style={page} data-testid="histologia-atlas-app-page">
      <section className="surface" style={hero}>
        <div style={topActions}>
          <button
            type="button"
            className="btn btn--secondary btn--compact"
            onClick={onBack}
          >
            Histologia
          </button>
        </div>

        <div style={heroCopy}>
          <span style={eyebrow}>Atlas interno</span>
          <h1 style={titulo}>
            {atlasSomenteEditados
              ? "Meu atlas de Histologia"
              : "Construção do atlas do app"}
          </h1>
          <p style={texto}>
            {atlasSomenteEditados
              ? "Coleção local das fotos dos seus relatórios, com edição, reedição e novas lâminas autorais."
              : "Ambiente para consultar modelos sugeridos, montar a imagem oficial de cada tema e expandir o atlas da disciplina com novas lâminas."}
          </p>
        </div>

      </section>

      <section
        style={{
          ...obterStatusCardStyle(statusSincronizacao.tipo, statusCards),
          ...statusCompacto,
        }}
      >
        <div style={statusCompactoLinha}>
          <strong style={feedbackTitle}>{statusSincronizacao.titulo}</strong>
          <span style={feedbackText}>{statusSincronizacao.descricao}</span>
        </div>
        {mensagemFluxo ? (
          <div style={statusCompactoLinhaSecundaria}>
            <strong style={feedbackTitle}>Fluxo</strong>
            <span style={feedbackText}>{mensagemFluxo}</span>
          </div>
        ) : null}
        {avisoRecuperacao && avisoRecuperacao !== mensagemFluxo ? (
          <div style={statusCompactoLinhaSecundaria}>
            <strong style={feedbackTitle}>Recuperação</strong>
            <span style={feedbackText}>{avisoRecuperacao}</span>
          </div>
        ) : null}
        {professorAtlasId && itensPendentesSincronizacao.length ? (
          <div style={statusCompactoLinhaSecundaria}>
            <strong style={feedbackTitle}>Pendências</strong>
            <div style={statusCompactoAcoes}>
              <span style={feedbackText}>
                {itensPendentesSincronizacao.length} item(ns) aguardando sincronização.
              </span>
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                onClick={sincronizarPendencias}
              >
                Sincronizar pendências
              </button>
            </div>
          </div>
        ) : null}
        {laminaDestaque ? (
          <div style={statusCompactoLinhaSecundaria}>
            <strong style={feedbackTitle}>Lâmina atual</strong>
            <div style={statusCompactoAcoes}>
              <span style={feedbackText}>
                {laminaDestaque.titulo} • {formatarEstadoLamina(estadoLaminaDestaque)}
              </span>
              {statusLaminaDestaque ? (
                <span
                  style={{
                    ...obterStatusItemStyle(
                      statusLaminaDestaque.tipo,
                      statusItemStyles,
                    ),
                  }}
                >
                  {statusLaminaDestaque.rotulo}
                </span>
              ) : null}
              <span style={feedbackText}>
                {formatarMomentoAtlas(
                  laminaDestaque.publicadoEm ||
                    laminaDestaque.atualizadoEm ||
                    laminaDestaque.salvoEm,
                )}
              </span>
            </div>
          </div>
        ) : null}
      </section>

      {telaAtivaId === "modulo" ? (
        <section style={section}>
          <div style={sectionHeader}>
            <div>
              <span style={sectionEyebrow}>Mapa</span>
              <h2 style={sectionTitle}>Módulos do atlas</h2>
            </div>
          </div>

          <div style={moduleTabs} role="tablist" aria-label="Módulos do atlas">
            {atlasHistologiaModules.map((modulo) => (
              <button
                key={modulo.id}
                type="button"
                className={
                  modulo.id === moduloAtivo?.id
                    ? "btn btn--primary btn--compact"
                    : "btn btn--secondary btn--compact"
                }
                style={moduleTab}
                onClick={() => {
                  setModuloAtivoId(modulo.id);
                  setLaminaAtivaId("");
                }}
              >
                {modulo.titulo}
              </button>
            ))}
          </div>

          {moduloAtivo ? (
            <div style={modulePanel}>
              <div style={moduleIntro}>
                <h3 style={moduleTitle}>{moduloAtivo.titulo}</h3>
                <p style={moduleText}>{moduloAtivo.descricao}</p>
                <button
                  type="button"
                  className="btn btn--primary btn--compact"
                  style={colecaoModuloBotao}
                  onClick={() => {
                    setLaminaAtivaId("");
                    setTelaAtivaId("laminas");
                  }}
                  disabled={!atlasSomenteEditados && !professorAtlasId}
                >
                  Abrir coleção deste módulo
                </button>
              </div>

              <div style={categoryGrid}>
                {moduloAtivo.categorias.map((categoria) => (
                  <article key={categoria} style={categoryCard}>
                    <strong style={categoryTitle}>{formatarSlug(categoria)}</strong>
                    <span style={categoryMeta}>Categoria inicial do atlas</span>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

            {telaAtivaId === "laminas" ? (
        <section style={section}>
          <div style={galleryPanel}>
            <div style={sectionHeader}>
              <div>
                <span style={sectionEyebrow}>Lâminas do módulo</span>
                <h2 style={sectionTitle}>Coleção para edição</h2>
              </div>
              <div style={atlasStageBar}>
                <div style={subtabsColecao} role="tablist" aria-label="Visão da coleção">
                  <button
                    type="button"
                    className={
                      visaoColecaoAtiva === "lista"
                        ? "btn btn--primary btn--compact"
                        : "btn btn--secondary btn--compact"
                    }
                    style={subtabColecaoBotao}
                    onClick={() => setVisaoColecaoAtiva("lista")}
                  >
                    Lista
                  </button>
                  <button
                    type="button"
                    className={
                      visaoColecaoAtiva === "previa"
                        ? "btn btn--primary btn--compact"
                        : "btn btn--secondary btn--compact"
                    }
                    style={subtabColecaoBotao}
                    onClick={() => setVisaoColecaoAtiva("previa")}
                  >
                    Prévia
                  </button>
                </div>
                <span style={screenHint}>
                  {laminasFiltradas.length}{" "}
                  {laminasFiltradas.length === 1 ? "lâmina" : "lâminas"}
                </span>
                <button
                  type="button"
                  className="btn btn--secondary btn--compact"
                  onClick={() => setTelaAtivaId("modulo")}
                >
                  Módulos
                </button>
              </div>
            </div>

            <div style={galleryIntroBar}>
              <p style={galleryIntroText}>
                {atlasSomenteEditados
                  ? "As fotos enviadas nos seus relatórios entram aqui. Você pode reeditá-las ou criar novas lâminas do zero neste dispositivo."
                  : "O professor cria o atlas enviando uma coleção de imagens. Cada arquivo entra como rascunho e pode ser revisado, substituído e publicado individualmente."}
              </p>
              <div style={colecaoAcoes}>
                {!atlasSomenteEditados ? (
                  <label className="btn btn--primary btn--compact" style={botaoArquivo}>
                    {enviandoColecao ? "Enviando imagens..." : "Enviar imagens"}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={enviandoColecao || !professorAtlasId}
                      onChange={(event) => {
                        adicionarColecaoDeImagens(event.target.files);
                        event.target.value = "";
                      }}
                      style={inputArquivo}
                    />
                  </label>
                ) : null}
                <button
                  type="button"
                  className="btn btn--secondary btn--compact"
                  onClick={criarLaminaDoZero}
                  disabled={!atlasSomenteEditados && !professorAtlasId}
                >
                  Nova lâmina do zero
                </button>
              </div>
            </div>

            <div style={filtersRow}>
              <CampoSelect
                label="Categoria"
                value={filtroCategoria}
                onChange={(value) => {
                  setFiltroCategoria(value);
                  setLaminaAtivaId("");
                }}
                options={[
                  { value: "todas", label: "Todas" },
                  ...categoriasDisponiveis.map((item) => ({
                    value: item,
                    label: formatarSlug(item),
                  })),
                ]}
                containerStyle={filterField}
                labelStyle={filterLabel}
                selectStyle={filterSelect}
              />
              <CampoSelect
                label="Aumento"
                value={filtroAumento}
                onChange={(value) => {
                  setFiltroAumento(value);
                  setLaminaAtivaId("");
                }}
                options={[
                  { value: "todos", label: "Todos" },
                  ...aumentosDisponiveis.map((item) => ({
                    value: item,
                    label: item,
                  })),
                ]}
                containerStyle={filterField}
                labelStyle={filterLabel}
                selectStyle={filterSelect}
              />
              <CampoSelect
                label="Status"
                value={filtroStatus}
                onChange={(value) => {
                  setFiltroStatus(value);
                  setLaminaAtivaId("");
                }}
                options={
                  atlasSomenteEditados
                    ? [
                        { value: "todos", label: "Todos" },
                        { value: "publicadas", label: "Publicadas" },
                        { value: "rascunhos", label: "Com rascunho" },
                      ]
                    : [
                        { value: "todos", label: "Todos" },
                        { value: "publicadas", label: "Publicadas" },
                        { value: "rascunhos", label: "Com rascunho" },
                        { value: "modelo", label: "Só modelo" },
                      ]
                }
                containerStyle={filterField}
                labelStyle={filterLabel}
                selectStyle={filterSelect}
              />
            </div>

            {laminaDestaque ? (
              <div style={galleryActionsBar}>
                <div style={galleryActionsCopy}>
                  <div style={galleryActionsHeader}>
                    <strong style={galleryActionsTitle}>
                      Lâmina selecionada: {laminaDestaque.titulo}
                    </strong>
                    <span
                      style={
                        estadoLaminaDestaque === "publicada"
                          ? galleryStatusChipPublicada
                          : estadoLaminaDestaque === "rascunho"
                            ? galleryStatusChipRascunho
                            : galleryStatusChipModelo
                      }
                    >
                      {formatarEstadoLamina(estadoLaminaDestaque)}
                    </span>
                  </div>
                  <span style={galleryActionsMeta}>
                    {laminaDestaquePublicada
                      ? "As ações abaixo valem para esta lâmina publicada neste dispositivo."
                      : laminasEditadas[laminaDestaque.id]
                        ? "As ações abaixo valem para esta lâmina com rascunho salvo neste dispositivo."
                        : "Esta lâmina ainda está usando apenas o modelo de referência."}
                  </span>
                  <span style={galleryActionsMetaSecundaria}>
                    Módulo: {resumoModulo.totalPublicadas} publicadas, {resumoModulo.totalRascunhos} em rascunho e {resumoModulo.totalModelos} no modelo.
                  </span>
                </div>
                <div style={galleryActionsButtons}>
                  <button
                    type="button"
                    className="btn btn--secondary btn--compact"
                    onClick={() => setVisaoColecaoAtiva("previa")}
                  >
                    Abrir prévia
                  </button>
                  <button
                    type="button"
                    className="btn btn--primary btn--compact"
                    onClick={() => setTelaAtivaId("autoria")}
                  >
                    {atlasSomenteEditados
                      ? "Editar lâmina"
                      : estadoLaminaDestaque === "modelo"
                        ? "Editar modelo"
                        : "Continuar edição"}
                  </button>
                  {laminasEditadas[laminaDestaque.id] ? (
                    <button
                      type="button"
                      className="btn btn--secondary btn--compact"
                      onClick={() => descartarRascunho(laminaDestaque.id)}
                    >
                      Descartar rascunho
                    </button>
                  ) : null}
                  {laminaDestaquePublicada ? (
                    <button
                      type="button"
                      className="btn btn--secondary btn--compact"
                      onClick={() => descartarPublicacao(laminaDestaque.id)}
                    >
                      Remover publicação
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}

            {laminasFiltradas.length ? (
              <>
                <div style={galleryGrid}>
                  {laminasFiltradas.map((lamina) => {
                    const ativa = lamina.id === laminaDestaque?.id;
                    return (
                      <button
                        key={lamina.id}
                        type="button"
                        style={{
                          ...galleryCard,
                          ...(ativa ? galleryCardActive : null),
                        }}
                        onClick={() => setLaminaAtivaId(lamina.id)}
                      >
                        <strong style={galleryCardTitle}>{lamina.titulo}</strong>
                        <span style={galleryCardMeta}>
                          {lamina.metadados?.aumento || "Sem aumento"} • {formatarSequenciaCurta(lamina)}
                        </span>
                        <div style={galleryCardChips}>
                          <span style={galleryChip}>{formatarSlug(lamina.categoriaId)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div style={emptyState}>
                Nenhuma lâmina do módulo atende aos filtros atuais.
              </div>
            )}
          </div>

          {visaoColecaoAtiva === "previa" ? (
            <>
              <AtlasHistologiaLaminaCard
                lamina={laminaDestaque}
                slidesRelacionados={slidesRelacionados}
                editadaNoAtlas={laminaDestaqueTemEdicaoSalva}
                origemAtlas={laminaDestaque.origemAtlas}
              />

              <div style={statusPanel}>
                <div style={statusCopy}>
                  <span style={sectionEyebrow}>
                    {atlasSomenteEditados ? "Situação" : "Publicação"}
                  </span>
                  <h3 style={statusTitle}>
                    {laminaDestaquePublicada
                      ? "Lâmina publicada neste atlas"
                      : atlasSomenteEditados
                        ? "Lâmina editada e ainda em rascunho"
                        : "Lâmina ainda não publicada"}
                  </h3>
                  <p style={statusText}>
                    {laminaDestaquePublicada
                      ? "A versão concluída já substitui o modelo de referência nesta atividade e fica disponível neste dispositivo."
                      : atlasSomenteEditados
                        ? "Esta lâmina já entrou no atlas navegável porque foi realmente editada, mesmo antes da publicação final."
                        : "Edite a lâmina selecionada, conclua a revisão e publique para substituir a referência do módulo pelo material produzido no editor."}
                  </p>
                </div>
                <div style={statusActions}>
                  <button
                    type="button"
                    className="btn btn--primary btn--compact"
                    onClick={() => setTelaAtivaId("autoria")}
                  >
                    {laminaDestaquePublicada
                      ? atlasSomenteEditados
                        ? "Reeditar lâmina"
                        : "Atualizar publicação"
                      : "Ir para edição"}
                  </button>
                  {laminaDestaquePublicada ? (
                    <button
                      type="button"
                      className="btn btn--secondary btn--compact"
                      onClick={() => descartarPublicacao(laminaDestaque.id)}
                    >
                      Remover publicação
                    </button>
                  ) : null}
                </div>
              </div>

              {laminasPublicadasDoModulo.length ? (
                <div style={publishedPanel}>
                  <div style={sectionHeader}>
                    <div>
                      <span style={sectionEyebrow}>Resultado</span>
                      <h2 style={sectionTitle}>Lâminas publicadas deste módulo</h2>
                    </div>
                  </div>

                  <div style={publishedGrid}>
                    {laminasPublicadasDoModulo.map((lamina) => {
                      const statusItem = resolverStatusItem(
                        lamina,
                        professorAtlasId,
                        statusPorItem[lamina.id],
                      );

                      return (
                        <article key={lamina.id} style={publishedCard}>
                          <strong style={publishedCardTitle}>{lamina.titulo}</strong>
                          <span style={publishedCardMeta}>
                            {lamina.metadados?.aumento || "Sem aumento"} • {lamina.status}
                          </span>
                          <span style={publishedCardMeta}>
                            {lamina.publicadoEm
                              ? `Publicado em ${formatarDataCurta(lamina.publicadoEm)}`
                              : "Publicado neste dispositivo"}
                          </span>
                          <div style={publishedCardFooter}>
                            <span
                              style={obterStatusItemStyle(
                                statusItem.tipo,
                                statusItemStyles,
                              )}
                            >
                              {statusItem.rotulo}
                            </span>
                            {statusItem.tipo === "erro" && professorAtlasId ? (
                              <button
                                type="button"
                                className="btn btn--secondary btn--compact"
                                onClick={() => tentarSincronizarLamina(lamina)}
                              >
                                Tentar sincronizar
                              </button>
                            ) : null}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </section>
      ) : null}

      {telaAtivaId === "autoria" && laminaDestaque ? (
        <>
          <section style={section}>
            <div style={atlasStageBar}>
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                onClick={() => setTelaAtivaId("laminas")}
              >
                Voltar para coleção
              </button>
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                onClick={() => setTelaAtivaId("modulo")}
              >
                Módulos
              </button>
              <span style={screenHint}>{laminaDestaque.titulo}</span>
            </div>
          </section>
          <AtlasHistologiaAutoriaPanel
            key={`${laminaDestaque.id}-${laminaDestaqueTemEdicaoSalva ? "editada" : "nova"}`}
            laminaBase={laminaDestaque}
            moduloAtivo={moduloAtivo}
            professorUserId={professorAtlasId}
            slidesRelacionados={slidesRelacionados}
            iniciarVazio={!laminaDestaqueTemEdicaoSalva}
            publicacaoAtual={laminaDestaquePublicada ? laminasPublicadas[laminaDestaque.id] : null}
            onLaminaChange={atualizarLaminaEmEdicao}
            onSalvarRascunho={registrarRascunho}
            onPublicar={publicarLamina}
            onDescartarRascunho={() => descartarRascunho(laminaDestaque.id)}
            onDescartarPublicacao={() => descartarPublicacao(laminaDestaque.id)}
          />
        </>
      ) : null}

    </main>
  );
}

function lerArquivoComoDataUrl(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => resolve(String(leitor.result || ""));
    leitor.onerror = () => reject(new Error(`Não foi possível ler ${arquivo.name}.`));
    leitor.readAsDataURL(arquivo);
  });
}

function removerExtensaoArquivo(nome) {
  return String(nome || "")
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .trim();
}

function converterRelatoriosEmLaminasAtlasAluno(relatorios) {
  return (Array.isArray(relatorios) ? relatorios : [])
    .filter((relatorio) => relatorio?.status === "enviado")
    .flatMap((relatorio) =>
      (Array.isArray(relatorio.sessao) ? relatorio.sessao : [])
        .map((item, indice) => {
          const campos = Array.isArray(item?.detalhesTipoRelatorio?.camposHistologia)
            ? item.detalhesTipoRelatorio.camposHistologia
            : [];
          const tecido =
            campos.find((campo) => campo.id === "classificacaoTecido")?.valor ||
            item?.resultado ||
            "Tecido não informado";
          const foto = item?.fotoUrl || item?.fotoInseto || "";
          if (!foto || !String(tecido).trim()) return null;

          const id = `relatorio-${relatorio.id}-${item.inseto || indice + 1}`;
          return {
            id,
            moduloId: "tecidos-basicos",
            categoriaId: categoriaAtlasAluno(tecido),
            grupoId: normalizarChaveTitulo(tecido),
            sequenciaOrdem: indice + 1,
            sequenciaTipo: "relatorio-aluno",
            titulo: String(tecido).trim(),
            subtitulo: `Contribuição da prática ${relatorio.id}`,
            foto,
            imagemBase: foto,
            imagemAnotada: foto,
            setas: Array.isArray(item.fotoInsetoSetas) ? item.fotoInsetoSetas : [],
            estruturas: [],
            metadados: {
              aumento: obterCampoHistologia(campos, "aumentoUtilizado"),
              coloracao: "",
              origem: "Relatório enviado pelo aluno",
              observacoesTecnicas:
                item?.detalhesTipoRelatorio?.observacoes || "",
            },
            relacoes: { compararCom: [], revisarAntesDepois: [] },
            status: "publicado",
            origemAtlas: "publicada",
            publicadoEm: relatorio.atualizadoEm || relatorio.criadoEm || "",
          };
        })
        .filter(Boolean),
    );
}

function obterCampoHistologia(campos, id) {
  return String(campos.find((campo) => campo.id === id)?.valor || "").trim();
}

function categoriaAtlasAluno(tecido) {
  const chave = normalizarChaveTitulo(tecido);
  if (chave.includes("epitel")) return "epitelial";
  if (chave.includes("conjunt")) return "conjuntivo";
  if (chave.includes("muscul")) return "muscular";
  if (chave.includes("nerv")) return "nervoso";
  return "conjuntivo";
}

function carregarAtlasLocal(escopo = "aluno") {
  if (typeof window === "undefined") {
    return {
      atlas: { rascunhos: {}, publicadas: {}, atualizadoEm: "" },
      workspace: criarWorkspaceAtlasPadrao(),
      podePersistir: true,
      mensagem: "",
    };
  }

  const principal = lerAtlasStorage(window.localStorage, obterChaveAtlas(escopo));
  if (principal.status === "ok") {
    return {
      atlas: principal.atlas,
      workspace: principal.workspace,
      podePersistir: true,
      mensagem: principal.workspace.temRecuperacao
        ? "Atlas reaberto no ponto em que esta edição foi interrompida."
        : "",
    };
  }

  const backup = lerAtlasStorage(
    window.localStorage,
    obterChaveAtlasBackup(escopo),
  );
  if (backup.status === "ok") {
    return {
      atlas: backup.atlas,
      workspace: backup.workspace,
      podePersistir: true,
      mensagem:
        "Atlas recuperado do backup local deste navegador. Revise as lâminas antes de continuar.",
    };
  }

  return {
    atlas: { rascunhos: {}, publicadas: {}, atualizadoEm: "" },
    workspace: criarWorkspaceAtlasPadrao(),
    podePersistir: principal.status === "vazio",
    mensagem:
      principal.status === "erro"
        ? "Não foi possível ler o atlas salvo neste navegador. O app foi aberto em modo de proteção para evitar sobrescrever os dados."
        : "",
  };
}

function salvarAtlasLocal(valor, escopo = "aluno") {
  if (typeof window === "undefined") {
    return { ok: true, mensagem: "" };
  }

  try {
    const serializado = JSON.stringify(valor);
    window.localStorage.setItem(obterChaveAtlas(escopo), serializado);

    if (serializado.length <= ATLAS_BACKUP_MAX_CHARS) {
      try {
        window.localStorage.setItem(obterChaveAtlasBackup(escopo), serializado);
      } catch {
        // O backup é auxiliar; a gravação principal acima é a fonte válida.
      }
    }

    return { ok: true, mensagem: "" };
  } catch {
    return {
      ok: false,
      mensagem:
        "O navegador não conseguiu salvar o atlas localmente. As imagens podem estar grandes demais para o armazenamento local.",
    };
  }
}

function lerAtlasStorage(storage, chave) {
  try {
    const bruto = storage.getItem(chave);
    if (!bruto) {
      return { status: "vazio", atlas: null };
    }

    const parsed = JSON.parse(bruto);
    return {
      status: "ok",
      atlas: {
        rascunhos:
          parsed?.rascunhos && typeof parsed.rascunhos === "object"
            ? sanitizarColecaoAtlas(parsed.rascunhos)
            : {},
        publicadas:
          parsed?.publicadas && typeof parsed.publicadas === "object"
            ? sanitizarColecaoAtlas(parsed.publicadas)
            : {},
        atualizadoEm:
          typeof parsed?.atualizadoEm === "string" ? parsed.atualizadoEm : "",
      },
      workspace: normalizarWorkspaceAtlas(parsed?.workspace),
    };
  } catch {
    return { status: "erro", atlas: null };
  }
}

function criarWorkspaceAtlasPadrao() {
  return {
    moduloAtivoId: atlasHistologiaModules[0]?.id || "",
    telaAtivaId: "laminas",
    laminaAtivaId: "",
    atlasTelaNavegavel: "modulos",
    atlasCategoriaAtiva: "",
    visaoColecaoAtiva: "lista",
    temRecuperacao: false,
  };
}

function normalizarWorkspaceAtlas(workspace) {
  const base = criarWorkspaceAtlasPadrao();
  const moduloExiste = atlasHistologiaModules.some(
    (modulo) => modulo.id === workspace?.moduloAtivoId,
  );

  return {
    moduloAtivoId: moduloExiste ? workspace.moduloAtivoId : base.moduloAtivoId,
    telaAtivaId: ["modulo", "laminas", "autoria"].includes(
      workspace?.telaAtivaId,
    )
      ? workspace.telaAtivaId
      : base.telaAtivaId,
    laminaAtivaId: String(workspace?.laminaAtivaId || ""),
    atlasTelaNavegavel: ["modulos", "categorias", "lamina"].includes(
      workspace?.atlasTelaNavegavel,
    )
      ? workspace.atlasTelaNavegavel
      : base.atlasTelaNavegavel,
    atlasCategoriaAtiva: String(workspace?.atlasCategoriaAtiva || ""),
    visaoColecaoAtiva: ["lista", "previa"].includes(workspace?.visaoColecaoAtiva)
      ? workspace.visaoColecaoAtiva
      : base.visaoColecaoAtiva,
    temRecuperacao: Boolean(
      workspace?.laminaAtivaId ||
        (workspace?.telaAtivaId && workspace.telaAtivaId !== "laminas") ||
        (workspace?.atlasTelaNavegavel &&
          workspace.atlasTelaNavegavel !== "modulos") ||
        workspace?.atlasCategoriaAtiva ||
        (workspace?.visaoColecaoAtiva &&
          workspace.visaoColecaoAtiva !== "lista"),
    ),
  };
}

function sanitizarColecaoAtlas(colecao) {
  return Object.fromEntries(
    Object.entries(colecao || {}).map(([id, lamina]) => [id, sanitizarLaminaAtlas(lamina)]),
  );
}

function sanitizarLaminaAtlas(lamina) {
  if (!lamina || !Array.isArray(lamina.apoioEdicao) || !lamina.apoioEdicao.length) {
    return lamina;
  }

  const setasOriginais = Array.isArray(lamina.setas) ? lamina.setas : [];
  const estruturasOriginais = Array.isArray(lamina.estruturas) ? lamina.estruturas : [];
  const setas = setasOriginais.filter((seta) => seta?.origemMarcacao !== "base");
  const estruturas = estruturasOriginais.filter(
    (estrutura) => estrutura?.origemMarcacao === "complementar",
  );

  if (setas.length === setasOriginais.length && estruturas.length === estruturasOriginais.length) {
    return lamina;
  }

  return {
    ...lamina,
    setas,
    estruturas,
  };
}

function formatarDataCurta(valor) {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(valor));
  } catch {
    return "agora";
  }
}

function formatarSlug(valor) {
  return String(valor || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

function formatarSequenciaCurta(lamina) {
  if (Number(lamina?.sequenciaOrdem || 0) === 1) return "Visão geral";
  if (Number(lamina?.sequenciaOrdem || 0) === 2) return "Detalhe";
  return `Ordem ${lamina?.sequenciaOrdem || "?"}`;
}

function normalizarChaveTitulo(valor) {
  return String(valor || "")
    .trim()
    .toLocaleLowerCase("pt-BR");
}

function formatarEstadoLamina(estado) {
  if (estado === "publicada") return "Publicada";
  if (estado === "rascunho") return "Rascunho";
  return "Modelo";
}

function formatarMomentoAtlas(valor) {
  if (!valor) return "Sem registro de horário ainda";
  return `Atualizado em ${formatarDataCurta(valor)}`;
}

function criarAssinaturaLamina(lamina) {
  return [
    normalizarChaveTitulo(lamina?.titulo),
    String(lamina?.metadados?.aumento || "").trim().toLocaleLowerCase("pt-BR"),
    String(lamina?.sequenciaTipo || "").trim().toLocaleLowerCase("pt-BR"),
    String(lamina?.categoriaId || "").trim().toLocaleLowerCase("pt-BR"),
  ].join("|");
}

function prioridadeOrigemAtlas(origemAtlas) {
  if (origemAtlas === "publicada") return 3;
  if (origemAtlas === "rascunho") return 2;
  return 1;
}

// O escopo aluno preserva as chaves legadas para não alterar o atlas existente.
const ATLAS_STORAGE_KEY_ALUNO = "atlas_histologia_app_v1";
const ATLAS_STORAGE_KEY_APP = "atlas_aplicativo_v1";
const ATLAS_STORAGE_BACKUP_KEY_ALUNO = "atlas_histologia_app_backup_v1";
const ATLAS_STORAGE_BACKUP_KEY_APP = "atlas_aplicativo_backup_v1";
const ATLAS_BACKUP_MAX_CHARS = 1500000;

function obterChaveAtlas(escopo) {
  return escopo === "app" ? ATLAS_STORAGE_KEY_APP : ATLAS_STORAGE_KEY_ALUNO;
}

function obterChaveAtlasBackup(escopo) {
  return escopo === "app"
    ? ATLAS_STORAGE_BACKUP_KEY_APP
    : ATLAS_STORAGE_BACKUP_KEY_ALUNO;
}

const page = {
  width: "100%",
  display: "grid",
  gap: 16,
  maxWidth: 1240,
  margin: "0 auto",
  padding: "16px min(4vw, 24px) 32px",
};

const hero = {
  display: "grid",
  gap: 18,
  padding: 18,
  borderRadius: 18,
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-lg)",
};

const topActions = {
  display: "flex",
  justifyContent: "flex-start",
};

const heroCopy = {
  display: "grid",
  gap: 8,
  maxWidth: 900,
};

const eyebrow = {
  color: "var(--color-secondary)",
  fontSize: 12,
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const titulo = {
  margin: 0,
  fontSize: "clamp(2rem, 5vw, 3.4rem)",
  lineHeight: 1,
  fontWeight: 950,
};

const texto = {
  margin: 0,
  color: "var(--color-muted)",
  fontSize: 16,
  lineHeight: 1.55,
};

const statusCompacto = {
  gap: 8,
  padding: "10px 12px",
};

const statusCompactoLinha = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
};

const statusCompactoLinhaSecundaria = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
  paddingTop: 6,
  borderTop: "1px solid color-mix(in srgb, var(--color-border) 80%, transparent)",
};

const statusCompactoAcoes = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
};

const statusCardBase = {
  display: "grid",
  gap: 4,
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid var(--color-border)",
};

const statusCards = {
  neutro: {
    ...statusCardBase,
    background: "var(--color-surface)",
  },
  sincronizado: {
    ...statusCardBase,
    border:
      "1px solid color-mix(in srgb, var(--color-success) 35%, transparent)",
    background: "color-mix(in srgb, var(--color-success) 12%, white)",
  },
  sincronizando: {
    ...statusCardBase,
    border:
      "1px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
    background: "color-mix(in srgb, var(--color-primary) 10%, white)",
  },
  local: {
    ...statusCardBase,
    border:
      "1px solid color-mix(in srgb, var(--color-secondary) 35%, transparent)",
    background: "color-mix(in srgb, var(--color-secondary) 10%, white)",
  },
  atencao: {
    ...statusCardBase,
    border:
      "1px solid color-mix(in srgb, var(--color-warning) 40%, transparent)",
    background: "color-mix(in srgb, var(--color-warning) 12%, white)",
  },
  erro: {
    ...statusCardBase,
    border: "1px solid color-mix(in srgb, var(--color-danger) 35%, transparent)",
    background: "color-mix(in srgb, var(--color-danger) 10%, white)",
  },
};

const feedbackTitle = {
  fontSize: 12,
  fontWeight: 900,
  textTransform: "uppercase",
  color: "var(--color-secondary)",
};

const feedbackText = {
  color: "var(--color-text)",
  fontSize: 14,
};

const section = {
  display: "grid",
  gap: 12,
};

const statusPanel = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  padding: 14,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const galleryPanel = {
  display: "grid",
  gap: 12,
  padding: 14,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const galleryIntroBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const galleryIntroText = {
  margin: 0,
  maxWidth: 760,
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.45,
};

const filtersRow = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 10,
};

const subtabsColecao = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
};

const subtabColecaoBotao = {
  minHeight: 34,
};

const filterField = {
  display: "grid",
  gap: 6,
};

const filterLabel = {
  fontSize: 12,
  fontWeight: 800,
  color: "var(--color-muted)",
  textTransform: "uppercase",
};

const filterSelect = {
  minHeight: 42,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  padding: "0 12px",
  font: "inherit",
  color: "var(--color-text)",
};

const galleryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 10,
};

const galleryActionsBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  flexWrap: "wrap",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
};

const galleryActionsCopy = {
  display: "grid",
  gap: 2,
};

const galleryActionsHeader = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
};

const galleryActionsTitle = {
  fontSize: 14,
};

const galleryActionsMeta = {
  fontSize: 12,
  color: "var(--color-muted)",
  lineHeight: 1.4,
};

const galleryActionsMetaSecundaria = {
  fontSize: 12,
  color: "var(--color-muted)",
  lineHeight: 1.4,
};

const galleryActionsButtons = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
};

const galleryStatusChipBase = {
  padding: "4px 8px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 800,
  border: "1px solid var(--color-border)",
};

const galleryStatusChipPublicada = {
  ...galleryStatusChipBase,
  border: "1px solid color-mix(in srgb, var(--color-success) 35%, transparent)",
  background: "color-mix(in srgb, var(--color-success) 12%, white)",
  color: "var(--color-success)",
};

const galleryStatusChipRascunho = {
  ...galleryStatusChipBase,
  border: "1px solid color-mix(in srgb, var(--color-secondary) 35%, transparent)",
  background: "color-mix(in srgb, var(--color-secondary) 10%, white)",
  color: "var(--color-secondary)",
};

const galleryStatusChipModelo = {
  ...galleryStatusChipBase,
  background: "var(--color-surface)",
  color: "var(--color-muted)",
};

const galleryCard = {
  display: "grid",
  gap: 6,
  textAlign: "left",
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
  cursor: "pointer",
};

const galleryCardActive = {
  border: "1px solid var(--color-primary)",
  boxShadow: "0 0 0 1px color-mix(in srgb, var(--color-primary) 35%, transparent)",
  background: "color-mix(in srgb, var(--color-primary) 6%, white)",
};

const galleryCardTitle = {
  fontSize: 14,
};

const galleryCardMeta = {
  fontSize: 12,
  color: "var(--color-muted)",
  lineHeight: 1.4,
};

const galleryCardChips = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
};

const galleryChip = {
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  fontSize: 11,
  color: "var(--color-muted)",
};

const emptyState = {
  padding: 14,
  borderRadius: 12,
  border: "1px dashed var(--color-border)",
  color: "var(--color-muted)",
  background: "var(--color-bg-soft)",
};

const statusCopy = {
  display: "grid",
  gap: 4,
  maxWidth: 760,
};

const statusActions = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
};

const statusTitle = {
  margin: 0,
  fontSize: 18,
};

const statusText = {
  margin: 0,
  color: "var(--color-muted)",
  lineHeight: 1.5,
};

const publishedPanel = {
  display: "grid",
  gap: 12,
  padding: 14,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const publishedGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 10,
};

const publishedCard = {
  display: "grid",
  gap: 4,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
};

const publishedCardFooter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 6,
};

const publishedCardTitle = {
  fontSize: 14,
};

const publishedCardMeta = {
  color: "var(--color-muted)",
  fontSize: 12,
  lineHeight: 1.4,
};

const statusItemBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 28,
  padding: "4px 10px",
  borderRadius: 999,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  fontSize: 11,
  fontWeight: 800,
};

const statusItemStyles = {
  neutro: {
    ...statusItemBase,
    color: "var(--color-muted)",
  },
  sincronizado: {
    ...statusItemBase,
    border:
      "1px solid color-mix(in srgb, var(--color-success) 35%, transparent)",
    background: "color-mix(in srgb, var(--color-success) 12%, white)",
    color: "var(--color-success)",
  },
  sincronizando: {
    ...statusItemBase,
    border:
      "1px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
    background: "color-mix(in srgb, var(--color-primary) 10%, white)",
    color: "var(--color-primary)",
  },
  local: {
    ...statusItemBase,
    border:
      "1px solid color-mix(in srgb, var(--color-secondary) 35%, transparent)",
    background: "color-mix(in srgb, var(--color-secondary) 10%, white)",
    color: "var(--color-secondary)",
  },
  erro: {
    ...statusItemBase,
    border: "1px solid color-mix(in srgb, var(--color-danger) 35%, transparent)",
    background: "color-mix(in srgb, var(--color-danger) 10%, white)",
    color: "var(--color-danger)",
  },
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "start",
};

const sectionEyebrow = {
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const sectionTitle = {
  margin: "2px 0 0",
  fontSize: 20,
  lineHeight: 1.15,
};

const moduleTabs = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const moduleTab = {
  minHeight: 36,
};

const atlasStageBar = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
};

const screenHint = {
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
  fontSize: 12,
  fontWeight: 800,
  color: "var(--color-muted)",
};

const modulePanel = {
  display: "grid",
  gap: 12,
  padding: 14,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const moduleIntro = {
  display: "grid",
  gap: 6,
};

const moduleTitle = {
  margin: 0,
  fontSize: 22,
};

const moduleText = {
  margin: 0,
  color: "var(--color-muted)",
  lineHeight: 1.5,
};

const colecaoModuloBotao = {
  justifySelf: "start",
  marginTop: 4,
};

const categoryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 10,
};

const categoryCard = {
  display: "grid",
  gap: 4,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
};

const categoryTitle = {
  fontSize: 14,
};

const categoryMeta = {
  color: "var(--color-muted)",
  fontSize: 12,
};

const colecaoAcoes = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
};

const botaoArquivo = {
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
};

const inputArquivo = {
  position: "absolute",
  inset: 0,
  opacity: 0,
  cursor: "pointer",
};
