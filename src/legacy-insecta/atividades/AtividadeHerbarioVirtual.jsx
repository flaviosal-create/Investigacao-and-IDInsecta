import { useEffect, useMemo, useRef, useState } from "react";

import {
  CampoTexto,
  ResumoLinhaCompacta,
  ResumoPill,
} from "../components/EditorSupportBlocks.jsx";
import FotoInsetoControl from "../components/FotoInsetoControl.jsx";
import FluxoEtapasCard from "../components/FluxoEtapasCard.jsx";
import {
  criarExsicataVirtualRascunho,
  herbarioVirtualEtapas,
  herbarioVirtualExemploCompleto,
  herbarioVirtualExemploFotos,
} from "./botanicaHerbarioVirtualModel.js";
import {
  clonarExsicata,
  formatarDataCurta,
  resolverTituloExsicata,
} from "./exsicataDidaticaUtils.js";
import {
  carregarColecaoExsicatasLocal,
  criarColecaoVazia,
  salvarColecaoExsicatasLocal,
} from "./exsicataDidaticaStorage.js";
import {
  listarItensPendentesSincronizacao,
  mesclarColecaoComRemotaDetalhada,
} from "../utils/colecaoSincronizacao.js";
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

const STATUS_CONTEXTO_EXSICATA = {
  singular: "exsicata",
  plural: "exsicatas",
};

function formatarMomentoExsicata(valor) {
  if (!valor) return "Sem registro de horário ainda";
  return `Atualizada em ${formatarDataCurta(valor)}`;
}

export default function AtividadeHerbarioVirtual({
  onBack,
  modo = "construcao",
  professorUserId = "",
}) {
  const colecaoLocalInicial = useMemo(() => carregarColecaoExsicatasLocal(), []);
  const workspaceInicial = colecaoLocalInicial.colecao.workspace || {};
  const [colecaoSalva, setColecaoSalva] = useState(() => colecaoLocalInicial.colecao);
  const colecaoSalvaInicialRef = useRef(colecaoLocalInicial.colecao);
  const [podePersistirColecao] = useState(() => colecaoLocalInicial.podePersistir);
  const [mensagemFluxo, setMensagemFluxo] = useState(
    () => colecaoLocalInicial.mensagem || "",
  );
  const [avisoRecuperacao] = useState(() => colecaoLocalInicial.mensagem || "");
  const [statusSincronizacao, setStatusSincronizacao] = useState(() =>
    criarStatusInicial(professorUserId, STATUS_CONTEXTO_EXSICATA),
  );
  const [statusPorItem, setStatusPorItem] = useState({});
  const [etapaAtivaId, setEtapaAtivaId] = useState(
    () => workspaceInicial.etapaAtivaId || "orientacao",
  );
  const [rascunho, setRascunho] = useState(() => {
    if (workspaceInicial.rascunhoAtual) {
      return clonarExsicata(workspaceInicial.rascunhoAtual);
    }

    const primeiraSalva =
      Object.values(colecaoLocalInicial.colecao.rascunhos || {})[0] ||
      Object.values(colecaoLocalInicial.colecao.publicadas || {})[0];
    return primeiraSalva
      ? clonarExsicata(primeiraSalva)
      : criarExsicataVirtualRascunho();
  });
  const [publicadaAtivaId, setPublicadaAtivaId] = useState(() => {
    if (workspaceInicial.publicadaAtivaId) {
      return workspaceInicial.publicadaAtivaId;
    }
    const primeiraPublicada = Object.values(
      colecaoLocalInicial.colecao.publicadas || {},
    )[0];
    return primeiraPublicada?.id || "";
  });
  const atlasSomentePublicadas = modo === "atlas";
  const rascunhoRef = useRef(rascunho);
  const publicadaAtivaIdRef = useRef(publicadaAtivaId);

  useEffect(() => {
    rascunhoRef.current = rascunho;
  }, [rascunho]);

  useEffect(() => {
    publicadaAtivaIdRef.current = publicadaAtivaId;
  }, [publicadaAtivaId]);

  const publicadasOrdenadas = useMemo(
    () =>
      Object.values(colecaoSalva.publicadas || {}).sort((a, b) =>
        String(b?.publicadoEm || b?.atualizadoEm || "").localeCompare(
          String(a?.publicadoEm || a?.atualizadoEm || ""),
        ),
      ),
    [colecaoSalva.publicadas],
  );
  const rascunhosOrdenados = useMemo(
    () =>
      Object.values(colecaoSalva.rascunhos || {}).sort((a, b) =>
        String(b?.atualizadoEm || "").localeCompare(String(a?.atualizadoEm || "")),
      ),
    [colecaoSalva.rascunhos],
  );
  const itensPendentesSincronizacao = useMemo(
    () =>
      professorUserId
        ? listarItensPendentesSincronizacao(colecaoSalva, statusPorItem)
        : [],
    [colecaoSalva, professorUserId, statusPorItem],
  );

  const etapaAtiva =
    herbarioVirtualEtapas.find((item) => item.id === etapaAtivaId) ||
    herbarioVirtualEtapas[0];
  const etapaAtivaIndex = herbarioVirtualEtapas.findIndex(
    (item) => item.id === etapaAtiva.id,
  );
  const etapaAnterior =
    etapaAtivaIndex > 0 ? herbarioVirtualEtapas[etapaAtivaIndex - 1] : null;
  const proximaEtapa =
    etapaAtivaIndex < herbarioVirtualEtapas.length - 1
      ? herbarioVirtualEtapas[etapaAtivaIndex + 1]
      : null;
  const obrigatoriasOk = useMemo(
    () =>
      (rascunho.fotos || [])
        .filter((item) => item.obrigatoria)
        .every((item) => Boolean(item.foto)),
    [rascunho.fotos],
  );
  const exsicataPublicadaAtiva = useMemo(
    () =>
      publicadasOrdenadas.find((item) => item.id === publicadaAtivaId) ||
      publicadasOrdenadas[0] ||
      null,
    [publicadaAtivaId, publicadasOrdenadas],
  );
  const statusRascunhoAtual = useMemo(
    () =>
      resolverStatusItem(
        rascunho,
        professorUserId,
        statusPorItem[rascunho?.id],
      ),
    [professorUserId, rascunho, statusPorItem],
  );

  useEffect(() => {
    if (!colecaoSalva || !podePersistirColecao) return;
    const colecaoParaSalvar = {
      ...colecaoSalva,
      atualizadoEm: new Date().toISOString(),
      workspace: {
        etapaAtivaId,
        publicadaAtivaId,
        rascunhoAtual: atlasSomentePublicadas ? null : clonarExsicata(rascunho),
      },
    };
    const resultado = salvarColecaoExsicatasLocal(colecaoParaSalvar);
    if (!resultado.ok) {
      window.setTimeout(() => setMensagemFluxo(resultado.mensagem), 0);
    }
  }, [
    atlasSomentePublicadas,
    colecaoSalva,
    etapaAtivaId,
    podePersistirColecao,
    publicadaAtivaId,
    rascunho,
  ]);

  useEffect(() => {
    if (!professorUserId) return;

    let ativo = true;
    import("../services/exsicataDidaticaRemota.js")
      .then(({ carregarExsicatasDidaticasRemotas }) =>
        carregarExsicatasDidaticasRemotas(professorUserId),
      )
      .then((remoto) => {
        if (!ativo) return;
        const totalRemoto =
          Object.keys(remoto.rascunhos || {}).length +
          Object.keys(remoto.publicadas || {}).length;

        if (!totalRemoto) {
          setStatusSincronizacao(
            criarStatusContaSemDados(STATUS_CONTEXTO_EXSICATA),
          );
          return;
        }

        const mesclado = mesclarColecaoComRemotaDetalhada(
          colecaoSalvaInicialRef.current,
          remoto,
        );
        setColecaoSalva(mesclado.colecao);
        const exsicataPreferida = resolverExsicataPreferida({
          colecao: mesclado.colecao,
          rascunhoAtual: rascunhoRef.current,
          publicadaAtivaId: publicadaAtivaIdRef.current,
        });
        if (exsicataPreferida) {
          setRascunho(clonarExsicata(exsicataPreferida));
          setEtapaAtivaId("preview");
          if (exsicataPreferida.status === "publicado") {
            setPublicadaAtivaId(exsicataPreferida.id);
          }
        }
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
            "A coleção foi carregada e as diferenças entre este navegador e a nuvem foram resolvidas automaticamente.",
          );
          setStatusSincronizacao(
            criarStatusConflitoResolvido(
              mesclado.resumo,
              STATUS_CONTEXTO_EXSICATA,
            ),
          );
        } else {
          setMensagemFluxo("Coleção da exsicata carregada da nuvem para esta conta.");
          setStatusSincronizacao(
            criarStatusColecaoSincronizada(STATUS_CONTEXTO_EXSICATA),
          );
        }
      })
      .catch((error) => {
        if (!ativo) return;
        setMensagemFluxo(
          error?.message || "Não foi possível carregar a coleção da nuvem.",
        );
        setStatusSincronizacao(
          criarStatusFalhaSincronizacao(
            error?.message,
            STATUS_CONTEXTO_EXSICATA,
          ),
        );
      });

    return () => {
      ativo = false;
    };
  }, [professorUserId]);

  useEffect(() => {
    if (!professorUserId || !itensPendentesSincronizacao.length) return;

    const timeoutId = window.setTimeout(() => {
      setStatusSincronizacao((atual) => {
        if (atual.tipo === "erro" || atual.tipo === "sincronizando") return atual;
        return criarStatusLocal(
          `${itensPendentesSincronizacao.length} item(ns) ainda dependem de sincronização com a nuvem.`,
          STATUS_CONTEXTO_EXSICATA,
        );
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [itensPendentesSincronizacao, professorUserId]);

  function atualizarFoto(slotId, foto) {
    setRascunho((atual) => ({
      ...atual,
      fotos: (atual.fotos || []).map((item) =>
        item.id === slotId ? { ...item, foto } : item,
      ),
    }));
  }

  function atualizarLegenda(slotId, legenda) {
    setRascunho((atual) => ({
      ...atual,
      fotos: (atual.fotos || []).map((item) =>
        item.id === slotId ? { ...item, legenda } : item,
      ),
    }));
  }

  function atualizarEtiqueta(campo, valor) {
    setRascunho((atual) => ({
      ...atual,
      etiqueta: {
        ...atual.etiqueta,
        [campo]: valor,
      },
    }));
  }

  function atualizarLeitura(campo, valor) {
    setRascunho((atual) => ({
      ...atual,
      leituraMorfologica: {
        ...atual.leituraMorfologica,
        [campo]: valor,
      },
    }));
  }

  function atualizarCaderneta(campo, valor) {
    setRascunho((atual) => ({
      ...atual,
      cadernetaCampo: {
        ...(atual.cadernetaCampo || {}),
        [campo]: valor,
      },
    }));
  }

  function aproveitarCadernetaNaAtividade() {
    setRascunho((atual) => {
      const caderneta = atual.cadernetaCampo || {};
      const estruturaReprodutiva = [caderneta.flores, caderneta.frutosSementes]
        .filter(Boolean)
        .join(" | ");
      const observacoesCampo = montarObservacoesCaderneta(caderneta);

      return {
        ...atual,
        fotos: (atual.fotos || []).map((foto) =>
          foto.id === "habito" && caderneta.fotoGeral
            ? {
                ...foto,
                foto: foto.foto || caderneta.fotoGeral,
                legenda:
                  foto.legenda ||
                  caderneta.habitoPorte ||
                  "Registro geral realizado em campo.",
              }
            : foto,
        ),
        etiqueta: {
          ...atual.etiqueta,
          dataColeta: atual.etiqueta?.dataColeta || caderneta.data || "",
          local: atual.etiqueta?.local || caderneta.local || "",
          municipioUf:
            atual.etiqueta?.municipioUf || caderneta.municipioUf || "",
          observacoes:
            atual.etiqueta?.observacoes || observacoesCampo,
        },
        leituraMorfologica: {
          ...atual.leituraMorfologica,
          filotaxia:
            atual.leituraMorfologica?.filotaxia || caderneta.filotaxia || "",
          tipoFolha:
            atual.leituraMorfologica?.tipoFolha || caderneta.tipoFolha || "",
          nervacao:
            atual.leituraMorfologica?.nervacao || caderneta.nervacao || "",
          margem: atual.leituraMorfologica?.margem || caderneta.margem || "",
          consistencia:
            atual.leituraMorfologica?.consistencia ||
            caderneta.consistencia ||
            "",
          estruturaReprodutiva:
            atual.leituraMorfologica?.estruturaReprodutiva ||
            estruturaReprodutiva,
        },
      };
    });
    setMensagemFluxo(
      "As anotações da caderneta foram aproveitadas na etiqueta e na leitura morfológica. Os dados já preenchidos foram preservados.",
    );
    setEtapaAtivaId("fotos");
  }

  function irParaProximaEtapa() {
    const indiceAtual = herbarioVirtualEtapas.findIndex(
      (item) => item.id === etapaAtivaId,
    );
    if (indiceAtual < 0 || indiceAtual >= herbarioVirtualEtapas.length - 1) return;
    setEtapaAtivaId(herbarioVirtualEtapas[indiceAtual + 1].id);
  }

  function reiniciarRascunho() {
    setRascunho(criarExsicataVirtualRascunho());
    setEtapaAtivaId("orientacao");
  }

  function salvarRascunhoAtual() {
    const salvo = {
      ...clonarExsicata(rascunho),
      status: "rascunho",
      atualizadoEm: new Date().toISOString(),
      criadoEm: rascunho.criadoEm || new Date().toISOString(),
      titulo: resolverTituloExsicata(rascunho),
    };

    setColecaoSalva((atual) => ({
      ...(atual || criarColecaoVazia()),
      rascunhos: {
        ...(atual?.rascunhos || {}),
        [salvo.id]: salvo,
      },
      publicadas: atual?.publicadas || {},
      atualizadoEm: salvo.atualizadoEm,
    }));
    setMensagemFluxo("Rascunho salvo nesta coleção local.");
    if (!colecaoSalva.publicadas?.[salvo.id]) {
      setStatusPorItem((atual) => ({
        ...atual,
        [salvo.id]: professorUserId ? "sincronizando" : "local",
      }));
      sincronizarExsicataNaNuvem(salvo, "Rascunho salvo também na nuvem.");
    } else if (!professorUserId) {
      setStatusPorItem((atual) => ({
        ...atual,
        [salvo.id]: "local",
      }));
      setStatusSincronizacao(
        criarStatusLocal(
          "Rascunho salvo apenas neste navegador.",
          STATUS_CONTEXTO_EXSICATA,
        ),
      );
    }
  }

  function publicarExsicataAtual() {
    if (!obrigatoriasOk) {
      setMensagemFluxo(
        "Complete as fotos obrigatórias antes de publicar a exsicata navegável.",
      );
      setEtapaAtivaId("fotos");
      return;
    }

    const publicada = {
      ...clonarExsicata(rascunho),
      status: "publicado",
      atualizadoEm: new Date().toISOString(),
      criadoEm: rascunho.criadoEm || new Date().toISOString(),
      publicadoEm: new Date().toISOString(),
      titulo: resolverTituloExsicata(rascunho),
    };

    setColecaoSalva((atual) => ({
      ...(atual || criarColecaoVazia()),
      rascunhos: {
        ...(atual?.rascunhos || {}),
        [publicada.id]: publicada,
      },
      publicadas: {
        ...(atual?.publicadas || {}),
        [publicada.id]: publicada,
      },
      atualizadoEm: publicada.atualizadoEm,
    }));
    setPublicadaAtivaId(publicada.id);
    setMensagemFluxo("Exsicata publicada no app e disponível no modo navegável.");
    setStatusPorItem((atual) => ({
      ...atual,
      [publicada.id]: professorUserId ? "sincronizando" : "local",
    }));
    sincronizarExsicataNaNuvem(
      publicada,
      "Exsicata publicada também na nuvem.",
    );
    if (!professorUserId) {
      setStatusSincronizacao(
        criarStatusLocal(
          "A exsicata foi publicada apenas neste navegador.",
          STATUS_CONTEXTO_EXSICATA,
        ),
      );
    }
  }

  function carregarExsicataSalva(item) {
    if (!item) return;
    setRascunho(clonarExsicata(item));
    setEtapaAtivaId("preview");
    setMensagemFluxo("Exsicata carregada para revisão e continuação da edição.");
  }

  function tentarSincronizarItem(item) {
    if (!item || !professorUserId) return;
    sincronizarExsicataNaNuvem(
      item,
      item.status === "publicado"
        ? "Exsicata publicada sincronizada novamente com a nuvem."
        : "Rascunho sincronizado novamente com a nuvem.",
    );
  }

  async function sincronizarPendencias() {
    if (!professorUserId || !itensPendentesSincronizacao.length) return;
    for (const item of itensPendentesSincronizacao) {
      // Sequencial para evitar uploads concorrentes demais e feedback confuso.
      await sincronizarExsicataNaNuvem(
        item,
        item.status === "publicado"
          ? "Pendências publicadas sincronizadas com a nuvem."
          : "Pendências em rascunho sincronizadas com a nuvem.",
      );
    }
  }

  function removerPublicacao(id) {
    if (!id) return;
    if (!window.confirm("Remover esta exsicata publicada do modo navegável?")) return;

    setColecaoSalva((atual) => {
      const proximasPublicadas = { ...(atual?.publicadas || {}) };
      delete proximasPublicadas[id];
      const rascunhoExistente =
        (atual?.rascunhos || {})[id] || (atual?.publicadas || {})[id];
      const rascunhosAtualizados = rascunhoExistente
        ? {
            ...(atual?.rascunhos || {}),
            [id]: {
              ...rascunhoExistente,
              status: "rascunho",
              atualizadoEm: new Date().toISOString(),
            },
          }
        : atual?.rascunhos || {};
      return {
        ...(atual || criarColecaoVazia()),
        rascunhos: rascunhosAtualizados,
        publicadas: proximasPublicadas,
        atualizadoEm: new Date().toISOString(),
      };
    });
    setMensagemFluxo("Publicação removida desta coleção local.");
    const rascunhoRemoto =
      colecaoSalva.rascunhos?.[id] || colecaoSalva.publicadas?.[id];
    if (rascunhoRemoto) {
      setStatusPorItem((atual) => ({
        ...atual,
        [id]: professorUserId ? "sincronizando" : "local",
      }));
      sincronizarExsicataNaNuvem(
        {
          ...rascunhoRemoto,
          status: "rascunho",
        },
        "Publicação removida da nuvem e mantida como rascunho.",
      );
    } else if (!professorUserId) {
      setStatusSincronizacao(
        criarStatusLocal(
          "A publicação foi removida apenas deste navegador.",
          STATUS_CONTEXTO_EXSICATA,
        ),
      );
    }
  }

  async function sincronizarExsicataNaNuvem(exsicata, mensagemSucesso) {
    if (!professorUserId) return;

    setStatusPorItem((atual) => ({
      ...atual,
      [exsicata.id]: "sincronizando",
    }));
    setStatusSincronizacao(
      criarStatusSincronizandoNuvem(STATUS_CONTEXTO_EXSICATA),
    );

    try {
      const { salvarExsicataDidaticaRemota } = await import(
        "../services/exsicataDidaticaRemota.js"
      );
      const remota = await salvarExsicataDidaticaRemota(
        exsicata,
        professorUserId,
      );
      setColecaoSalva((atual) => ({
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
            : Object.fromEntries(
                Object.entries(atual.publicadas || {}).filter(
                  ([id]) => id !== remota.id,
                ),
              ),
      }));
      setStatusPorItem((atual) => ({
        ...atual,
        [remota.id]: "sincronizado",
      }));
      setMensagemFluxo(mensagemSucesso);
      setStatusSincronizacao({
        ...criarStatusColecaoSincronizada(STATUS_CONTEXTO_EXSICATA),
        descricao: "A nuvem já recebeu a versão mais recente desta exsicata.",
      });
    } catch (error) {
      setMensagemFluxo(
        error?.message ||
          "A exsicata foi salva localmente, mas não foi enviada para a nuvem.",
      );
      setStatusPorItem((atual) => ({
        ...atual,
        [exsicata.id]: "erro",
      }));
      setStatusSincronizacao({
        ...criarStatusFalhaEnvio(
          error?.message,
          STATUS_CONTEXTO_EXSICATA,
        ),
      });
    }
  }

  const exsicataVisualizada = atlasSomentePublicadas
    ? exsicataPublicadaAtiva
    : rascunho;
  const itensColecaoRecentes = [
    ...publicadasOrdenadas,
    ...rascunhosOrdenados.filter(
      (item) => !publicadasOrdenadas.some((pub) => pub.id === item.id),
    ),
  ].slice(0, 6);

  if (atlasSomentePublicadas) {
    return (
      <main style={page} data-testid="botanica-herbario-virtual-atlas-page">
        <section style={hero}>
          <div style={heroTop}>
            <button
              type="button"
              className="btn btn--secondary btn--compact"
              onClick={onBack}
            >
              Voltar
            </button>
            <span style={chip}>Botânica II</span>
          </div>

          <div>
            <span style={eyebrow}>Coleção navegável</span>
            <h1 style={title}>Exsicata virtual didática do app</h1>
            <p style={intro}>
              Navegue apenas pelas exsicatas realmente publicadas a partir dos
              previews concluídos na construção.
            </p>
          </div>

          <section style={obterStatusCardStyle(statusSincronizacao.tipo, statusCards)}>
            <strong style={statusTitulo}>{statusSincronizacao.titulo}</strong>
            <p style={statusDescricao}>{statusSincronizacao.descricao}</p>
            {avisoRecuperacao ? (
              <p style={statusDescricao}>{avisoRecuperacao}</p>
            ) : null}
            {professorUserId && itensPendentesSincronizacao.length ? (
              <div style={statusActionsInline}>
                <span style={statusMeta}>
                  {itensPendentesSincronizacao.length} pendência
                  {itensPendentesSincronizacao.length === 1 ? "" : "s"}
                </span>
                <button
                  type="button"
                  className="btn btn--secondary btn--compact"
                  onClick={sincronizarPendencias}
                >
                  Sincronizar pendências
                </button>
              </div>
            ) : null}
          </section>

          <div style={toolbarLeft}>
            <span style={metaChip}>
              {publicadasOrdenadas.length} publicada
              {publicadasOrdenadas.length === 1 ? "" : "s"}
            </span>
          </div>
        </section>

        {publicadasOrdenadas.length ? (
          <>
            <section style={section}>
              <HerbarioAtlasNavegacao
                itens={publicadasOrdenadas}
                itemAtivoId={exsicataPublicadaAtiva?.id || ""}
                onSelecionar={setPublicadaAtivaId}
              />
            </section>

            <section style={section}>
              <HerbarioPreviewPainel
                exsicata={exsicataVisualizada}
                atlasSomentePublicadas={atlasSomentePublicadas}
                obrigatoriasOk={obrigatoriasOk}
              />
            </section>
          </>
        ) : (
          <section style={section}>
            <article style={card}>
              <strong style={cardTitle}>
                Ainda não há exsicatas publicadas nesta coleção.
              </strong>
              <p style={hint}>
                Volte para a atividade de construção, conclua o preview e publique
                a exsicata para que ela apareça aqui.
              </p>
            </article>
          </section>
        )}
      </main>
    );
  }

  return (
    <main style={page} data-testid="botanica-herbario-virtual-page">
      <section style={hero}>
        <div style={heroTop}>
          <button
            type="button"
            className="btn btn--secondary btn--compact"
            onClick={onBack}
          >
            Voltar
          </button>
          <span style={chip}>Botânica II</span>
        </div>

        <div>
          <span style={eyebrow}>Nova atividade</span>
          <h1 style={title}>Exsicata virtual didática</h1>
          <p style={intro}>
            Monte exsicatas virtuais com várias fotos do mesmo material vegetal,
            etiqueta técnica e leitura morfológica básica para compor a coleção
            interna do app.
          </p>
        </div>

        <section style={obterStatusCardStyle(statusSincronizacao.tipo, statusCards)}>
          <strong style={statusTitulo}>{statusSincronizacao.titulo}</strong>
          <p style={statusDescricao}>{statusSincronizacao.descricao}</p>
          {avisoRecuperacao ? (
            <p style={statusDescricao}>{avisoRecuperacao}</p>
          ) : null}
          {professorUserId && itensPendentesSincronizacao.length ? (
            <div style={statusActionsInline}>
              <span style={statusMeta}>
                {itensPendentesSincronizacao.length} pendência
                {itensPendentesSincronizacao.length === 1 ? "" : "s"}
              </span>
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                onClick={sincronizarPendencias}
              >
                Sincronizar pendências
              </button>
            </div>
          ) : null}
        </section>

        <FluxoEtapasCard
          eyebrow="Sequência guiada"
          title="Montagem da exsicata"
          currentLabel={etapaAtiva.rotulo}
          steps={herbarioVirtualEtapas}
          activeId={etapaAtivaId}
          onChange={setEtapaAtivaId}
          ariaLabel="Etapas da exsicata virtual didática"
          summaryTone="surface"
          actions={
            <>
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                onClick={reiniciarRascunho}
              >
                Novo rascunho
              </button>
              <div style={toolbar}>
                <button
                  type="button"
                  className="btn btn--secondary btn--compact"
                  onClick={() => etapaAnterior && setEtapaAtivaId(etapaAnterior.id)}
                  disabled={!etapaAnterior}
                >
                  Anterior
                </button>
                {proximaEtapa ? (
                  <button
                    type="button"
                    className="btn btn--primary btn--compact"
                    onClick={irParaProximaEtapa}
                  >
                    Próxima: {proximaEtapa.rotulo}
                  </button>
                ) : null}
              </div>
            </>
          }
        />
      </section>

      {etapaAtivaId === "orientacao" ? <HerbarioEtapaOrientacao /> : null}

      {etapaAtivaId === "caderneta" ? (
        <HerbarioEtapaCaderneta
          caderneta={rascunho.cadernetaCampo || {}}
          onAtualizar={atualizarCaderneta}
          onAproveitar={aproveitarCadernetaNaAtividade}
        />
      ) : null}

      {etapaAtivaId === "fotos" ? (
        <HerbarioEtapaFotos
          fotos={rascunho.fotos || []}
          onAtualizarFoto={atualizarFoto}
          onAtualizarLegenda={atualizarLegenda}
        />
      ) : null}

      {etapaAtivaId === "etiqueta" ? (
        <HerbarioEtapaEtiqueta
          etiqueta={rascunho.etiqueta}
          leituraMorfologica={rascunho.leituraMorfologica}
          onAtualizarEtiqueta={atualizarEtiqueta}
          onAtualizarLeitura={atualizarLeitura}
        />
      ) : null}

      {etapaAtivaId === "preview" ? (
        <HerbarioEtapaPreview
          mensagemFluxo={mensagemFluxo}
        exsicataVisualizada={exsicataVisualizada}
        atlasSomentePublicadas={atlasSomentePublicadas}
        obrigatoriasOk={obrigatoriasOk}
        rascunho={rascunho}
        statusRascunhoAtual={statusRascunhoAtual}
        publicadasOrdenadas={publicadasOrdenadas}
        rascunhosOrdenados={rascunhosOrdenados}
        itensColecaoRecentes={itensColecaoRecentes}
          professorUserId={professorUserId}
          statusPorItem={statusPorItem}
          onSalvarRascunho={salvarRascunhoAtual}
          onPublicar={publicarExsicataAtual}
          onAbrirItem={carregarExsicataSalva}
          onTentarSincronizar={tentarSincronizarItem}
          onRemoverPublicacao={removerPublicacao}
        />
      ) : null}
    </main>
  );
}

function HerbarioEtapaOrientacao() {
  return (
    <section style={section}>
      <div style={grid2}>
        <article style={card}>
          <strong style={cardTitle}>Apoio lateral da atividade</strong>
          <p style={hint}>
            Materiais, fundamentos legais, procedimento completo e critérios da
            exsicata virtual didática agora ficam no painel de apoio lateral para
            deixar esta tela mais direta.
          </p>
          <div style={list}>
            <div style={listItem}>Use esta etapa para organizar a captura e a montagem visual.</div>
            <div style={listItem}>Abra o apoio lateral quando quiser rever o roteiro completo.</div>
            <div style={listItem}>Mantenha na tela principal apenas o que orienta a ação imediata.</div>
          </div>
        </article>

        <article style={card}>
          <strong style={cardTitle}>Estratégia de registro recomendada</strong>
          <div style={list}>
            <div style={listItem}>1 foto de hábito ou ambiente.</div>
            <div style={listItem}>1 foto de ramo principal.</div>
            <div style={listItem}>2 fotos de folha, mostrando as duas faces.</div>
            <div style={listItem}>1 foto de flor ou fruto, quando houver.</div>
            <div style={listItem}>Legendas curtas para cada bloco visual.</div>
          </div>
        </article>
      </div>

      <article style={card}>
        <div style={exemploCabecalho}>
          <div>
            <span style={exemploEyebrow}>Exemplo visual de referência</span>
            <strong style={cardTitle}>
              Espécie hipotética de Euphorbiaceae
            </strong>
          </div>
          <span style={badgeExemplo}>Exemplo didático</span>
        </div>
        <p style={hint}>
          Esta série representa a mesma planta fictícia em todos os enquadramentos.
          Use-a para compreender o que cada campo fotográfico deve mostrar; as imagens
          não constituem documentação de uma espécie real.
        </p>

        <div style={exemploFotosGrid}>
          {herbarioVirtualExemploFotos.map((item) => (
            <figure key={item.id} style={exemploFotoCard}>
              <img src={item.foto} alt={item.alt} style={exemploFotoImg} />
              <figcaption style={exemploFotoLegenda}>
                <strong>{item.titulo}</strong>
                <span>{item.legenda}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p style={exemploNota}>
          Caracteres representados: hábito arbustivo, folhas simples alternas,
          látex branco, inflorescências com flores reduzidas, cápsulas trilobadas
          e sementes mosqueadas.
        </p>
      </article>

      <details style={exemploCompletoDetalhes}>
        <summary style={exemploCompletoResumo}>
          Ver etiqueta técnica e prancha do exemplo montado
        </summary>
        <div style={exemploCompletoConteudo}>
          <article style={card}>
            <div style={exemploCabecalho}>
              <div>
                <span style={exemploEyebrow}>Etiqueta de exemplo</span>
                <strong style={cardTitle}>Registro botânico hipotético</strong>
              </div>
              <span style={badgeExemplo}>Sem coleta real</span>
            </div>
            <div style={exemploEtiquetaGrid}>
              <ExemploEtiquetaCampo
                label="Número de registro"
                value={herbarioVirtualExemploCompleto.etiqueta.numeroRegistro}
              />
              <ExemploEtiquetaCampo
                label="Nome científico"
                value={herbarioVirtualExemploCompleto.etiqueta.nomeCientifico}
              />
              <ExemploEtiquetaCampo
                label="Família"
                value={herbarioVirtualExemploCompleto.etiqueta.familia}
              />
              <ExemploEtiquetaCampo
                label="Nome popular didático"
                value={herbarioVirtualExemploCompleto.etiqueta.nomePopular}
              />
              <ExemploEtiquetaCampo
                label="Coletor"
                value={herbarioVirtualExemploCompleto.etiqueta.coletor}
              />
              <ExemploEtiquetaCampo
                label="Data"
                value={herbarioVirtualExemploCompleto.etiqueta.dataColeta}
              />
              <ExemploEtiquetaCampo
                label="Local"
                value={herbarioVirtualExemploCompleto.etiqueta.local}
              />
              <ExemploEtiquetaCampo
                label="Município / UF"
                value={herbarioVirtualExemploCompleto.etiqueta.municipioUf}
              />
            </div>
            <p style={exemploNota}>
              <strong>Observações:</strong>{" "}
              {herbarioVirtualExemploCompleto.etiqueta.observacoes}
            </p>
          </article>

          <HerbarioPreviewPainel
            exsicata={herbarioVirtualExemploCompleto}
            atlasSomentePublicadas={false}
            obrigatoriasOk
          />
        </div>
      </details>
    </section>
  );
}

function ExemploEtiquetaCampo({ label, value }) {
  return (
    <div style={exemploEtiquetaCampo}>
      <span style={exemploEtiquetaLabel}>{label}</span>
      <strong style={exemploEtiquetaValue}>{value}</strong>
    </div>
  );
}

function HerbarioEtapaCaderneta({
  caderneta,
  onAtualizar,
  onAproveitar,
}) {
  return (
    <section style={section}>
      <article style={card}>
        <div style={exemploCabecalho}>
          <div>
            <span style={exemploEyebrow}>Registro rápido e offline</span>
            <strong style={cardTitle}>Caderneta de campo</strong>
          </div>
          <span style={badgeExemplo}>Salva neste aparelho</span>
        </div>
        <p style={hint}>
          Registre primeiro o que pode desaparecer ou ser esquecido. Uma foto geral
          é opcional; os detalhes podem ser fotografados depois, com mais tempo.
        </p>
      </article>

      <div style={grid2}>
        <article style={card}>
          <strong style={cardTitle}>Local e momento</strong>
          <div style={formGrid}>
            <CampoTexto
              containerStyle={field}
              label="Data"
              value={caderneta.data || ""}
              onChange={(valor) => onAtualizar("data", valor)}
              type="date"
            />
            <CampoTexto
              containerStyle={field}
              label="Horário"
              value={caderneta.horario || ""}
              onChange={(valor) => onAtualizar("horario", valor)}
              type="time"
            />
            <CampoTexto
              containerStyle={field}
              label="Local"
              value={caderneta.local || ""}
              onChange={(valor) => onAtualizar("local", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Município / UF"
              value={caderneta.municipioUf || ""}
              onChange={(valor) => onAtualizar("municipioUf", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Coordenadas ou referência"
              value={caderneta.coordenadas || ""}
              onChange={(valor) => onAtualizar("coordenadas", valor)}
            />
          </div>
          <label style={field}>
            Ambiente, substrato e condições do local
            <textarea
              className="field-control"
              rows={3}
              value={caderneta.ambiente || ""}
              onChange={(event) => onAtualizar("ambiente", event.target.value)}
              placeholder="Ex.: borda de mata, solo arenoso, área úmida, pleno sol..."
            />
          </label>
        </article>

        <article style={card}>
          <strong style={cardTitle}>Foto geral opcional</strong>
          <p style={hint}>
            Se houver tempo para apenas uma imagem, registre a planta inteira e o
            ambiente. Ela poderá preencher o campo “Hábito / ambiente”.
          </p>
          <FotoInsetoControl
            fotoInseto={caderneta.fotoGeral || ""}
            onFotoInsetoChange={(foto) => onAtualizar("fotoGeral", foto)}
            titulo="Foto geral de campo"
            alt="Foto geral da planta registrada na caderneta de campo"
            compacto
          />
        </article>
      </div>

      <div style={grid2}>
        <article style={card}>
          <strong style={cardTitle}>Porte e estruturas vegetativas</strong>
          <label style={field}>
            Hábito e porte aproximado
            <textarea
              className="field-control"
              rows={2}
              value={caderneta.habitoPorte || ""}
              onChange={(event) =>
                onAtualizar("habitoPorte", event.target.value)
              }
              placeholder="Ex.: arbusto ereto, aproximadamente 1,2 m..."
            />
          </label>
          <label style={field}>
            Caule, casca, odor e presença de látex
            <textarea
              className="field-control"
              rows={2}
              value={caderneta.cauleLatex || ""}
              onChange={(event) =>
                onAtualizar("cauleLatex", event.target.value)
              }
              placeholder="Ex.: caule avermelhado, látex branco ao corte..."
            />
          </label>
          <div style={formGrid}>
            <CampoTexto
              containerStyle={field}
              label="Filotaxia"
              value={caderneta.filotaxia || ""}
              onChange={(valor) => onAtualizar("filotaxia", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Tipo de folha"
              value={caderneta.tipoFolha || ""}
              onChange={(valor) => onAtualizar("tipoFolha", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Nervação"
              value={caderneta.nervacao || ""}
              onChange={(valor) => onAtualizar("nervacao", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Margem"
              value={caderneta.margem || ""}
              onChange={(valor) => onAtualizar("margem", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Consistência"
              value={caderneta.consistencia || ""}
              onChange={(valor) => onAtualizar("consistencia", valor)}
            />
          </div>
        </article>

        <article style={card}>
          <strong style={cardTitle}>Estruturas reprodutivas e notas</strong>
          <label style={field}>
            Flores ou inflorescências
            <textarea
              className="field-control"
              rows={3}
              value={caderneta.flores || ""}
              onChange={(event) => onAtualizar("flores", event.target.value)}
              placeholder="Cor, tamanho, posição, organização e abundância..."
            />
          </label>
          <label style={field}>
            Frutos e sementes
            <textarea
              className="field-control"
              rows={3}
              value={caderneta.frutosSementes || ""}
              onChange={(event) =>
                onAtualizar("frutosSementes", event.target.value)
              }
              placeholder="Tipo, cor, número de partes, abertura e sementes..."
            />
          </label>
          <label style={field}>
            Outras observações de campo
            <textarea
              className="field-control"
              rows={4}
              value={caderneta.observacoes || ""}
              onChange={(event) =>
                onAtualizar("observacoes", event.target.value)
              }
              placeholder="Associação com outras plantas, abundância, nome informado no local, dúvidas..."
            />
          </label>
        </article>
      </div>

      <article style={card}>
        <strong style={cardTitle}>Aproveitar as anotações</strong>
        <p style={hint}>
          A ação preenche campos vazios da etiqueta e da leitura morfológica,
          preservando tudo que já foi digitado. A caderneta permanece guardada no
          rascunho para consulta posterior.
        </p>
        <div style={toolbarLeft}>
          <button
            type="button"
            className="btn btn--primary btn--compact"
            onClick={onAproveitar}
          >
            Usar caderneta e continuar para Fotos
          </button>
        </div>
      </article>
    </section>
  );
}

function HerbarioEtapaFotos({
  fotos,
  onAtualizarFoto,
  onAtualizarLegenda,
}) {
  return (
    <section style={section}>
      <div style={grid2}>
        {fotos.map((slot) => (
          <article key={slot.id} style={card}>
            <div style={slotHeader}>
              <strong style={cardTitle}>{slot.titulo}</strong>
              <span style={slot.obrigatoria ? badgeObrigatoria : badgeOpcional}>
                {slot.obrigatoria ? "Obrigatória" : "Opcional"}
              </span>
            </div>
            <p style={hint}>{slot.dica}</p>
            <FotoInsetoControl
              fotoInseto={slot.foto}
              onFotoInsetoChange={(foto) => onAtualizarFoto(slot.id, foto)}
              titulo={slot.titulo}
              alt={slot.titulo}
              compacto
            />
            <label style={field}>
              Legenda curta
              <input
                className="field-control"
                value={slot.legenda}
                onChange={(event) =>
                  onAtualizarLegenda(slot.id, event.target.value)
                }
                placeholder="Ex.: folha com nervação peninérvea"
              />
            </label>
          </article>
        ))}
      </div>
    </section>
  );
}

function HerbarioEtapaEtiqueta({
  etiqueta,
  leituraMorfologica,
  onAtualizarEtiqueta,
  onAtualizarLeitura,
}) {
  return (
    <section style={section}>
      <div style={grid2}>
        <article style={card}>
          <strong style={cardTitle}>Etiqueta técnica</strong>
          <div style={formGrid}>
            <CampoTexto
              containerStyle={field}
              label="Número do registro"
              value={etiqueta.numeroRegistro}
              onChange={(valor) => onAtualizarEtiqueta("numeroRegistro", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Nome científico"
              value={etiqueta.nomeCientifico}
              onChange={(valor) => onAtualizarEtiqueta("nomeCientifico", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Família"
              value={etiqueta.familia}
              onChange={(valor) => onAtualizarEtiqueta("familia", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Nome popular"
              value={etiqueta.nomePopular}
              onChange={(valor) => onAtualizarEtiqueta("nomePopular", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Coletor"
              value={etiqueta.coletor}
              onChange={(valor) => onAtualizarEtiqueta("coletor", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Data"
              value={etiqueta.dataColeta}
              onChange={(valor) => onAtualizarEtiqueta("dataColeta", valor)}
              type="date"
            />
            <CampoTexto
              containerStyle={field}
              label="Local"
              value={etiqueta.local}
              onChange={(valor) => onAtualizarEtiqueta("local", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Município / UF"
              value={etiqueta.municipioUf}
              onChange={(valor) => onAtualizarEtiqueta("municipioUf", valor)}
            />
          </div>
          <label style={field}>
            Observações
            <textarea
              className="field-control"
              rows={4}
              value={etiqueta.observacoes}
              onChange={(event) =>
                onAtualizarEtiqueta("observacoes", event.target.value)
              }
              placeholder="Substrato, porte, coloração, odor, contexto didático..."
            />
          </label>
        </article>

        <article style={card}>
          <strong style={cardTitle}>Leitura morfológica</strong>
          <div style={formGrid}>
            <CampoTexto
              containerStyle={field}
              label="Filotaxia"
              value={leituraMorfologica.filotaxia}
              onChange={(valor) => onAtualizarLeitura("filotaxia", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Tipo de folha"
              value={leituraMorfologica.tipoFolha}
              onChange={(valor) => onAtualizarLeitura("tipoFolha", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Nervação"
              value={leituraMorfologica.nervacao}
              onChange={(valor) => onAtualizarLeitura("nervacao", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Margem"
              value={leituraMorfologica.margem}
              onChange={(valor) => onAtualizarLeitura("margem", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Consistência"
              value={leituraMorfologica.consistencia}
              onChange={(valor) => onAtualizarLeitura("consistencia", valor)}
            />
            <CampoTexto
              containerStyle={field}
              label="Estrutura reprodutiva"
              value={leituraMorfologica.estruturaReprodutiva}
              onChange={(valor) =>
                onAtualizarLeitura("estruturaReprodutiva", valor)
              }
            />
          </div>
        </article>
      </div>
    </section>
  );
}

function HerbarioEtapaPreview({
  mensagemFluxo,
  exsicataVisualizada,
  atlasSomentePublicadas,
  obrigatoriasOk,
  rascunho,
  statusRascunhoAtual,
  publicadasOrdenadas,
  rascunhosOrdenados,
  itensColecaoRecentes,
  professorUserId,
  statusPorItem,
  onSalvarRascunho,
  onPublicar,
  onAbrirItem,
  onTentarSincronizar,
  onRemoverPublicacao,
}) {
  return (
    <section style={section}>
      <div style={toolbarLeft}>
        <button
          type="button"
          className="btn btn--secondary btn--compact"
          onClick={onSalvarRascunho}
        >
          Salvar rascunho
        </button>
        <button
          type="button"
          className="btn btn--primary btn--compact"
          onClick={onPublicar}
        >
          Publicar no app
        </button>
      </div>

      {mensagemFluxo ? (
        <article style={mensagemCard}>
          <strong style={cardTitle}>Fluxo da coleção</strong>
          <p style={hint}>{mensagemFluxo}</p>
        </article>
      ) : null}

      <article style={mensagemCard}>
        <strong style={cardTitle}>Estado da exsicata atual</strong>
        <div style={estadoResumoLinha}>
          <span style={hint}>
            {resolverTituloExsicata(rascunho)} • {rascunho.status === "publicado" ? "Publicada" : "Rascunho"}
          </span>
          <span style={obterStatusItemStyle(statusRascunhoAtual.tipo, statusItemStyles)}>
            {statusRascunhoAtual.rotulo}
          </span>
        </div>
        <p style={hint}>
          {formatarMomentoExsicata(
            rascunho.publicadoEm || rascunho.atualizadoEm || rascunho.criadoEm,
          )}
        </p>
      </article>

      <HerbarioPreviewPainel
        exsicata={exsicataVisualizada}
        atlasSomentePublicadas={atlasSomentePublicadas}
        obrigatoriasOk={obrigatoriasOk}
      />

      <div style={grid2}>
        <article style={card}>
          <strong style={cardTitle}>Etiqueta da exsicata</strong>
          <div style={etiquetaBox}>
            <ResumoLinhaCompacta rowStyle={resumoLinha} labelStyle={resumoLabel} valueStyle={resumoValue} label="Registro" value={rascunho.etiqueta.numeroRegistro || "pendente"} />
            <ResumoLinhaCompacta rowStyle={resumoLinha} labelStyle={resumoLabel} valueStyle={resumoValue} label="Nome científico" value={rascunho.etiqueta.nomeCientifico || "pendente"} />
            <ResumoLinhaCompacta rowStyle={resumoLinha} labelStyle={resumoLabel} valueStyle={resumoValue} label="Família" value={rascunho.etiqueta.familia || "pendente"} />
            <ResumoLinhaCompacta rowStyle={resumoLinha} labelStyle={resumoLabel} valueStyle={resumoValue} label="Coletor" value={rascunho.etiqueta.coletor || "pendente"} />
            <ResumoLinhaCompacta rowStyle={resumoLinha} labelStyle={resumoLabel} valueStyle={resumoValue} label="Data" value={rascunho.etiqueta.dataColeta || "pendente"} />
            <ResumoLinhaCompacta rowStyle={resumoLinha} labelStyle={resumoLabel} valueStyle={resumoValue} label="Local" value={rascunho.etiqueta.local || "pendente"} />
            <ResumoLinhaCompacta rowStyle={resumoLinha} labelStyle={resumoLabel} valueStyle={resumoValue} label="Município / UF" value={rascunho.etiqueta.municipioUf || "pendente"} />
          </div>

          <strong style={cardTitle}>Leitura morfológica resumida</strong>
          <div style={etiquetaBox}>
            <ResumoLinhaCompacta
              rowStyle={resumoLinha}
              labelStyle={resumoLabel}
              valueStyle={resumoValue}
              label="Filotaxia"
              value={rascunho.leituraMorfologica.filotaxia || "pendente"}
            />
            <ResumoLinhaCompacta
              rowStyle={resumoLinha}
              labelStyle={resumoLabel}
              valueStyle={resumoValue}
              label="Tipo de folha"
              value={rascunho.leituraMorfologica.tipoFolha || "pendente"}
            />
            <ResumoLinhaCompacta
              rowStyle={resumoLinha}
              labelStyle={resumoLabel}
              valueStyle={resumoValue}
              label="Nervação"
              value={rascunho.leituraMorfologica.nervacao || "pendente"}
            />
            <ResumoLinhaCompacta
              rowStyle={resumoLinha}
              labelStyle={resumoLabel}
              valueStyle={resumoValue}
              label="Margem"
              value={rascunho.leituraMorfologica.margem || "pendente"}
            />
            <ResumoLinhaCompacta
              rowStyle={resumoLinha}
              labelStyle={resumoLabel}
              valueStyle={resumoValue}
              label="Consistência"
              value={rascunho.leituraMorfologica.consistencia || "pendente"}
            />
            <ResumoLinhaCompacta
              rowStyle={resumoLinha}
              labelStyle={resumoLabel}
              valueStyle={resumoValue}
              label="Estrutura reprodutiva"
              value={rascunho.leituraMorfologica.estruturaReprodutiva || "pendente"}
            />
          </div>
        </article>

        <article style={card}>
          <strong style={cardTitle}>Coleção do app neste navegador</strong>
          <div style={colecaoResumo}>
            <span style={metaChip}>
              {publicadasOrdenadas.length} publicada
              {publicadasOrdenadas.length === 1 ? "" : "s"}
            </span>
            <span style={metaChip}>
              {rascunhosOrdenados.length} rascunho
              {rascunhosOrdenados.length === 1 ? "" : "s"}
            </span>
          </div>
          <HerbarioColecaoLista
            itens={itensColecaoRecentes}
            professorUserId={professorUserId}
            statusPorItem={statusPorItem}
            onAbrir={onAbrirItem}
            onTentarSincronizar={onTentarSincronizar}
            onRemoverPublicacao={onRemoverPublicacao}
          />
        </article>
      </div>
    </section>
  );
}

function HerbarioPreviewPainel({
  exsicata,
  atlasSomentePublicadas,
  obrigatoriasOk,
}) {
  if (!exsicata) return null;

  const fotoPrincipal =
    (exsicata?.fotos || []).find((item) => item.id === "ramo")?.foto
      ? (exsicata?.fotos || []).find((item) => item.id === "ramo")
      : (exsicata?.fotos || []).find((item) => item.foto) || null;
  const fotosPorId = Object.fromEntries(
    (exsicata?.fotos || []).map((item) => [item.id, item]),
  );
  const blocosDidaticos = montarBlocosDidaticos(fotosPorId);

  return (
    <article style={card}>
      <div style={slotHeader}>
        <strong style={cardTitle}>
          {atlasSomentePublicadas
            ? "Exsicata virtual didática publicada"
            : "Prancha botânica didática"}
        </strong>
        <span style={obrigatoriasOk ? badgeObrigatoria : badgePendente}>
          {atlasSomentePublicadas
            ? `Publicada${exsicata.publicadoEm ? ` em ${formatarDataCurta(exsicata.publicadoEm)}` : ""}`
            : obrigatoriasOk
              ? "Fotos mínimas completas"
              : "Faltam fotos obrigatórias"}
        </span>
      </div>

      <div style={pranchaCabecalho}>
        <div style={pranchaTituloBox}>
          <span style={pranchaEyebrow}>Coleção interna do app</span>
          <h2 style={pranchaTitulo}>
            {exsicata.etiqueta?.nomeCientifico || "Espécime vegetal em edição"}
          </h2>
          <p style={pranchaSubtitulo}>
            {exsicata.etiqueta?.familia || "Família pendente"}
            {" · "}
            {exsicata.etiqueta?.nomePopular || "Nome popular pendente"}
          </p>
        </div>
        <div style={pranchaMetaChips}>
          <span style={metaChip}>
            {exsicata.etiqueta?.numeroRegistro || "Sem registro"}
          </span>
          <span style={metaChip}>
            {exsicata.etiqueta?.dataColeta || "Data pendente"}
          </span>
          <span style={metaChip}>
            {exsicata.etiqueta?.municipioUf || "Local pendente"}
          </span>
        </div>
      </div>

      <div style={pranchaNova}>
        <div style={pranchaColunaPrincipal}>
          <section style={painelPrincipal}>
            <div style={painelHeader}>
              <strong style={painelTitle}>Ramo de referência</strong>
              <span style={painelTag}>estrutura-base</span>
            </div>
            <div style={pranchaImagemPrincipal}>
              {fotoPrincipal?.foto ? (
                <img
                  src={fotoPrincipal.foto}
                  alt={fotoPrincipal.titulo}
                  style={pranchaImg}
                />
              ) : (
                <div style={pranchaVazia}>
                  A foto do ramo principal ocupará esta área central da prancha.
                </div>
              )}
            </div>
            <p style={painelLegenda}>
              {fotoPrincipal?.legenda ||
                "Use este espaço para a imagem-base que melhor represente o material vegetal."}
            </p>
          </section>

          <section style={detalhesGrid}>
            {blocosDidaticos.map((bloco) => (
              <article
                key={bloco.id}
                style={bloco.destaque ? detalheCardDestaque : detalheCard}
              >
                <div style={painelHeader}>
                  <strong style={painelTitle}>{bloco.titulo}</strong>
                </div>
                {bloco.foto?.foto ? (
                  <img
                    src={bloco.foto.foto}
                    alt={bloco.foto.titulo}
                    style={bloco.destaque ? detalheImgPanoramica : detalheImg}
                  />
                ) : (
                  <div
                    style={bloco.destaque ? detalheVazioPanoramico : miniaturaVazia}
                  >
                    {bloco.foto?.titulo || bloco.titulo}
                  </div>
                )}
                <p style={detalheDescricao}>{bloco.descricao}</p>
                <div style={miniaturaLegenda}>
                  {bloco.foto?.legenda || "Legenda curta pendente"}
                </div>
              </article>
            ))}
          </section>
        </div>

        <aside style={pranchaLateral}>
          <section style={lateralCard}>
            <strong style={painelTitle}>Etiqueta resumida</strong>
            <div style={etiquetaListaCompacta}>
              <ResumoLinhaCompacta
                rowStyle={resumoLinha}
                labelStyle={resumoLabel}
                valueStyle={resumoValue}
                label="Coletor"
                value={exsicata.etiqueta?.coletor || "pendente"}
              />
              <ResumoLinhaCompacta
                rowStyle={resumoLinha}
                labelStyle={resumoLabel}
                valueStyle={resumoValue}
                label="Local"
                value={exsicata.etiqueta?.local || "pendente"}
              />
              <ResumoLinhaCompacta
                rowStyle={resumoLinha}
                labelStyle={resumoLabel}
                valueStyle={resumoValue}
                label="Município / UF"
                value={exsicata.etiqueta?.municipioUf || "pendente"}
              />
            </div>
          </section>

          <section style={lateralCard}>
            <strong style={painelTitle}>Leitura orientada</strong>
            <div style={leituraPills}>
              <ResumoPill
                containerStyle={pillResumo}
                labelStyle={pillLabel}
                valueStyle={pillValue}
                label="Filotaxia"
                value={exsicata.leituraMorfologica?.filotaxia}
              />
              <ResumoPill
                containerStyle={pillResumo}
                labelStyle={pillLabel}
                valueStyle={pillValue}
                label="Tipo de folha"
                value={exsicata.leituraMorfologica?.tipoFolha}
              />
              <ResumoPill
                containerStyle={pillResumo}
                labelStyle={pillLabel}
                valueStyle={pillValue}
                label="Nervação"
                value={exsicata.leituraMorfologica?.nervacao}
              />
              <ResumoPill
                containerStyle={pillResumo}
                labelStyle={pillLabel}
                valueStyle={pillValue}
                label="Margem"
                value={exsicata.leituraMorfologica?.margem}
              />
              <ResumoPill
                containerStyle={pillResumo}
                labelStyle={pillLabel}
                valueStyle={pillValue}
                label="Consistência"
                value={exsicata.leituraMorfologica?.consistencia}
              />
              <ResumoPill
                containerStyle={pillResumo}
                labelStyle={pillLabel}
                valueStyle={pillValue}
                label="Estrutura reprodutiva"
                value={exsicata.leituraMorfologica?.estruturaReprodutiva}
              />
            </div>
          </section>

          <section style={lateralCard}>
            <strong style={painelTitle}>Observações didáticas</strong>
            <p style={observacaoTexto}>
              {exsicata.etiqueta?.observacoes ||
                "As observações do espécime podem registrar cor, consistência, substrato, porte e contexto de uso em aula."}
            </p>
          </section>
        </aside>
      </div>
    </article>
  );
}

function HerbarioAtlasNavegacao({ itens, itemAtivoId, onSelecionar }) {
  return (
    <div style={navegacaoGrid}>
      {itens.map((item) => (
        <button
          key={item.id}
          type="button"
          className="btn btn--secondary"
          style={item.id === itemAtivoId ? navegacaoCardAtivo : navegacaoCard}
          onClick={() => onSelecionar(item.id)}
        >
          <strong style={navegacaoCardTitle}>{resolverTituloExsicata(item)}</strong>
          <span style={navegacaoCardMeta}>
            {item.etiqueta?.familia || "Família pendente"}
          </span>
          <span style={navegacaoCardMeta}>
            {item.etiqueta?.municipioUf || "Local pendente"}
          </span>
        </button>
      ))}
    </div>
  );
}

function HerbarioColecaoLista({
  itens,
  professorUserId,
  statusPorItem,
  onAbrir,
  onTentarSincronizar,
  onRemoverPublicacao,
}) {
  return (
    <div style={colecaoLista}>
      {itens.map((item) => {
        const statusItem = resolverStatusItem(
          item,
          professorUserId,
          statusPorItem[item.id],
        );

        return (
          <div key={item.id} style={colecaoItem}>
            <button
              type="button"
              className="btn btn--secondary btn--compact"
              onClick={() => onAbrir(item)}
            >
              Abrir
            </button>
            <div style={colecaoItemTexto}>
              <strong>{resolverTituloExsicata(item)}</strong>
              <div style={colecaoMetaLinha}>
                <span style={navegacaoCardMeta}>
                  {item.status === "publicado" ? "Publicada" : "Rascunho"}
                </span>
                <span
                  style={obterStatusItemStyle(
                    statusItem.tipo,
                    statusItemStyles,
                  )}
                >
                  {statusItem.rotulo}
                </span>
              </div>
            </div>
            <div style={colecaoAcoes}>
              {statusItem.tipo === "erro" && professorUserId ? (
                <button
                  type="button"
                  className="btn btn--secondary btn--compact"
                  onClick={() => onTentarSincronizar(item)}
                >
                  Tentar sincronizar
                </button>
              ) : null}
              {item.status === "publicado" ? (
                <button
                  type="button"
                  className="btn btn--secondary btn--compact"
                  onClick={() => onRemoverPublicacao(item.id)}
                >
                  Remover publicação
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function montarBlocosDidaticos(fotosPorId) {
  return [
    {
      id: "habito",
      titulo: "Contexto e porte",
      descricao: "Situa a planta no ambiente e ajuda a reconhecer o hábito.",
      foto: fotosPorId.habito,
      destaque: true,
    },
    {
      id: "folha_superior",
      titulo: "Folha · face superior",
      descricao: "Use para forma geral, margem e padrão principal de nervação.",
      foto: fotosPorId.folha_superior,
    },
    {
      id: "folha_inferior",
      titulo: "Folha · face inferior",
      descricao: "Importante para observar textura, tricomas e relevo das nervuras.",
      foto: fotosPorId.folha_inferior,
    },
    {
      id: "flor",
      titulo: "Flor ou inflorescência",
      descricao: "Bloco-chave quando houver estrutura reprodutiva disponível.",
      foto: fotosPorId.flor,
    },
    {
      id: "fruto",
      titulo: "Fruto ou semente",
      descricao: "Complementa a comparação entre registros e espécies próximas.",
      foto: fotosPorId.fruto,
    },
  ];
}

function montarObservacoesCaderneta(caderneta) {
  const linhas = [
    ["Horário", caderneta.horario],
    ["Coordenadas ou referência", caderneta.coordenadas],
    ["Ambiente", caderneta.ambiente],
    ["Hábito e porte", caderneta.habitoPorte],
    ["Caule, odor e látex", caderneta.cauleLatex],
    ["Flores ou inflorescências", caderneta.flores],
    ["Frutos e sementes", caderneta.frutosSementes],
    ["Outras observações", caderneta.observacoes],
  ].filter(([, valor]) => Boolean(String(valor || "").trim()));

  return linhas.map(([rotulo, valor]) => `${rotulo}: ${valor}`).join("\n");
}

function resolverExsicataPreferida({
  colecao,
  rascunhoAtual,
  publicadaAtivaId,
}) {
  const rascunhos = Object.values(colecao?.rascunhos || {});
  const publicadas = Object.values(colecao?.publicadas || {});
  const itemAtualNaColecao = rascunhoAtual?.id
    ? (colecao?.rascunhos || {})[rascunhoAtual.id] ||
      (colecao?.publicadas || {})[rascunhoAtual.id] ||
      null
    : null;

  if (itemAtualNaColecao && !ehExsicataPlaceholder(rascunhoAtual)) {
    return itemAtualNaColecao;
  }

  if (publicadaAtivaId && (colecao?.publicadas || {})[publicadaAtivaId]) {
    return colecao.publicadas[publicadaAtivaId];
  }

  return [...rascunhos, ...publicadas]
    .sort((a, b) => obterCarimboExsicata(b) - obterCarimboExsicata(a))[0] || null;
}

function obterCarimboExsicata(item) {
  return Math.max(
    Date.parse(String(item?.atualizadoEm || "")) || 0,
    Date.parse(String(item?.publicadoEm || "")) || 0,
    Date.parse(String(item?.criadoEm || "")) || 0,
  );
}

function ehExsicataPlaceholder(item) {
  if (!item || typeof item !== "object") return true;

  const temTituloInformativo =
    Boolean(String(item.titulo || "").trim()) &&
    String(item.titulo || "").trim() !== "Nova exsicata virtual";
  const temFoto = Array.isArray(item.fotos)
    ? item.fotos.some((foto) => Boolean(String(foto?.foto || "").trim()))
    : false;
  const temLegenda = Array.isArray(item.fotos)
    ? item.fotos.some((foto) => Boolean(String(foto?.legenda || "").trim()))
    : false;
  const temEtiqueta = Object.values(item.etiqueta || {}).some((valor) =>
    Boolean(String(valor || "").trim()),
  );
  const temLeitura = Object.values(item.leituraMorfologica || {}).some((valor) =>
    Boolean(String(valor || "").trim()),
  );

  return !(
    temTituloInformativo ||
    temFoto ||
    temLegenda ||
    temEtiqueta ||
    temLeitura
  );
}

const page = {
  width: "100%",
  display: "grid",
  gap: 14,
  maxWidth: 1180,
  margin: "0 auto",
  padding: "16px min(4vw, 24px) 30px",
};

const hero = {
  display: "grid",
  gap: 16,
  padding: 18,
  borderRadius: 18,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  boxShadow: "var(--shadow-lg)",
};

const heroTop = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "center",
  flexWrap: "wrap",
};

const chip = {
  padding: "6px 10px",
  borderRadius: 999,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 800,
};

const eyebrow = {
  display: "inline-block",
  marginBottom: 6,
  color: "var(--color-secondary)",
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const title = {
  margin: 0,
  fontSize: "clamp(2rem, 6vw, 3.4rem)",
  lineHeight: 1,
  fontWeight: 950,
};

const intro = {
  margin: "10px 0 0",
  maxWidth: 820,
  color: "var(--color-muted)",
  fontSize: 16,
  lineHeight: 1.55,
};

const toolbar = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginLeft: "auto",
};

const section = {
  display: "grid",
  gap: 14,
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 14,
};

const card = {
  display: "grid",
  gap: 12,
  padding: 16,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const cardTitle = {
  fontSize: 16,
};

const list = {
  display: "grid",
  gap: 8,
};

const listItem = {
  color: "var(--color-text)",
  lineHeight: 1.5,
};

const slotHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  flexWrap: "wrap",
};

const badgeObrigatoria = {
  padding: "4px 10px",
  borderRadius: 999,
  background: "var(--color-success-soft)",
  color: "var(--color-success-text)",
  border: "1px solid var(--color-success-border)",
  fontSize: 12,
  fontWeight: 800,
};

const badgeOpcional = {
  padding: "4px 10px",
  borderRadius: 999,
  background: "var(--color-surface-soft)",
  color: "var(--color-muted)",
  border: "1px solid var(--color-border)",
  fontSize: 12,
  fontWeight: 800,
};

const badgePendente = {
  padding: "4px 10px",
  borderRadius: 999,
  background: "var(--color-warning-soft)",
  color: "var(--color-warning-text)",
  border: "1px solid var(--color-warning-border)",
  fontSize: 12,
  fontWeight: 800,
};

const hint = {
  margin: 0,
  color: "var(--color-muted)",
  lineHeight: 1.45,
};

const exemploCabecalho = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
};

const exemploEyebrow = {
  display: "block",
  marginBottom: 4,
  color: "var(--color-secondary)",
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const badgeExemplo = {
  ...badgeOpcional,
  background: "var(--color-secondary-soft)",
  color: "var(--color-secondary)",
  borderColor: "var(--color-secondary-border)",
};

const exemploFotosGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: 12,
};

const exemploFotoCard = {
  display: "grid",
  gap: 8,
  margin: 0,
  padding: 10,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
  minWidth: 0,
};

const exemploFotoImg = {
  display: "block",
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: 9,
  background: "var(--color-bg-soft)",
};

const exemploFotoLegenda = {
  display: "grid",
  gap: 3,
  color: "var(--color-text)",
  fontSize: 13,
  lineHeight: 1.4,
};

const exemploNota = {
  margin: 0,
  padding: 10,
  borderRadius: 10,
  background: "var(--color-secondary-soft)",
  color: "var(--color-text)",
  fontSize: 13,
  lineHeight: 1.45,
};

const exemploCompletoDetalhes = {
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  overflow: "hidden",
};

const exemploCompletoResumo = {
  padding: 16,
  color: "var(--color-primary)",
  fontWeight: 850,
  cursor: "pointer",
};

const exemploCompletoConteudo = {
  display: "grid",
  gap: 14,
  padding: "0 14px 14px",
};

const exemploEtiquetaGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: 10,
};

const exemploEtiquetaCampo = {
  display: "grid",
  gap: 3,
  padding: 10,
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const exemploEtiquetaLabel = {
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 850,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

const exemploEtiquetaValue = {
  color: "var(--color-text)",
  fontSize: 13,
  lineHeight: 1.4,
};

const field = {
  display: "grid",
  gap: 6,
  fontWeight: 750,
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
};

const pranchaCabecalho = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  flexWrap: "wrap",
  padding: 14,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const pranchaTituloBox = {
  display: "grid",
  gap: 4,
};

const pranchaEyebrow = {
  fontSize: 11,
  fontWeight: 900,
  color: "var(--color-secondary)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const pranchaTitulo = {
  margin: 0,
  fontSize: "clamp(1.35rem, 3vw, 1.8rem)",
  lineHeight: 1.1,
  fontWeight: 900,
};

const pranchaSubtitulo = {
  margin: 0,
  color: "var(--color-muted)",
  lineHeight: 1.45,
};

const pranchaMetaChips = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

const metaChip = {
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  fontSize: 12,
  fontWeight: 700,
};

const pranchaNova = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.6fr) minmax(260px, 0.8fr)",
  gap: 14,
  alignItems: "start",
};

const pranchaColunaPrincipal = {
  display: "grid",
  gap: 14,
  minWidth: 0,
};

const pranchaLateral = {
  display: "grid",
  gap: 12,
  minWidth: 0,
};

const painelPrincipal = {
  display: "grid",
  gap: 10,
  padding: 14,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-soft) 100%)",
};

const painelHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
};

const painelTitle = {
  fontSize: 14,
  fontWeight: 850,
};

const painelTag = {
  padding: "4px 8px",
  borderRadius: 999,
  background: "var(--color-secondary-soft)",
  color: "var(--color-secondary)",
  border: "1px solid var(--color-secondary-border)",
  fontSize: 11,
  fontWeight: 800,
};

const pranchaImagemPrincipal = {
  minHeight: 420,
  borderRadius: 12,
  overflow: "hidden",
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
};

const pranchaImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const pranchaVazia = {
  minHeight: 420,
  display: "grid",
  placeItems: "center",
  color: "var(--color-muted)",
  padding: 18,
  textAlign: "center",
};

const painelLegenda = {
  margin: 0,
  color: "var(--color-muted)",
  lineHeight: 1.45,
  fontSize: 13,
};

const detalhesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 12,
};

const detalheCard = {
  display: "grid",
  gap: 8,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const detalheCardDestaque = {
  ...detalheCard,
  gridColumn: "span 2",
};

const detalheImg = {
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
  borderRadius: 10,
  display: "block",
  border: "1px solid var(--color-border)",
};

const detalheImgPanoramica = {
  ...detalheImg,
  aspectRatio: "16 / 9",
};

const miniaturaVazia = {
  width: "100%",
  aspectRatio: "4 / 3",
  borderRadius: 8,
  display: "grid",
  placeItems: "center",
  background: "var(--color-surface)",
  color: "var(--color-muted)",
  textAlign: "center",
  padding: 12,
};

const detalheVazioPanoramico = {
  ...miniaturaVazia,
  aspectRatio: "16 / 9",
};

const detalheDescricao = {
  margin: 0,
  color: "var(--color-muted)",
  lineHeight: 1.4,
  fontSize: 13,
};

const lateralCard = {
  display: "grid",
  gap: 10,
  padding: 14,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const etiquetaListaCompacta = {
  display: "grid",
  gap: 8,
};

const leituraPills = {
  display: "grid",
  gap: 8,
};

const pillResumo = {
  display: "grid",
  gap: 2,
  padding: 10,
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const pillLabel = {
  fontSize: 11,
  fontWeight: 800,
  color: "var(--color-muted)",
  textTransform: "uppercase",
};

const pillValue = {
  fontSize: 14,
  lineHeight: 1.35,
};

const observacaoTexto = {
  margin: 0,
  color: "var(--color-text)",
  lineHeight: 1.55,
};

const miniaturaLegenda = {
  fontSize: 12,
  color: "var(--color-muted)",
  lineHeight: 1.4,
};

const etiquetaBox = {
  display: "grid",
  gap: 10,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const resumoLinha = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  paddingBottom: 8,
  borderBottom: "1px solid var(--color-border)",
};

const resumoLabel = {
  color: "var(--color-muted)",
};

const resumoValue = {
  textAlign: "right",
};

const toolbarLeft = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "flex-start",
};

const mensagemCard = {
  display: "grid",
  gap: 6,
  padding: 14,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const estadoResumoLinha = {
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
};

const navegacaoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
};

const navegacaoCard = {
  minHeight: 120,
  display: "grid",
  justifyItems: "start",
  alignContent: "start",
  gap: 6,
  textAlign: "left",
  padding: 14,
};

const navegacaoCardAtivo = {
  ...navegacaoCard,
  borderColor: "var(--color-primary)",
  boxShadow: "inset 0 0 0 1px var(--color-primary)",
};

const navegacaoCardTitle = {
  fontSize: 16,
  fontWeight: 850,
};

const navegacaoCardMeta = {
  fontSize: 12,
  color: "var(--color-muted)",
  lineHeight: 1.4,
};

const colecaoResumo = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const colecaoLista = {
  display: "grid",
  gap: 10,
};

const colecaoItem = {
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr) auto",
  gap: 10,
  alignItems: "center",
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const colecaoItemTexto = {
  display: "grid",
  gap: 2,
  minWidth: 0,
};

const colecaoAcoes = {
  display: "grid",
  gap: 8,
  justifyItems: "end",
};

const colecaoMetaLinha = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
};

const statusItemBase = {
  display: "inline-flex",
  alignItems: "center",
  padding: "3px 8px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 800,
  border: "1px solid var(--color-border)",
};

const statusItemStyles = {
  local: {
    ...statusItemBase,
    background: "var(--color-surface)",
    color: "var(--color-muted)",
  },
  sincronizando: {
    ...statusItemBase,
    background: "var(--color-secondary-soft)",
    color: "var(--color-secondary)",
    border: "1px solid var(--color-secondary-border)",
  },
  sincronizado: {
    ...statusItemBase,
    background: "var(--color-success-soft)",
    color: "var(--color-success-text)",
    border: "1px solid var(--color-success-border)",
  },
  erro: {
    ...statusItemBase,
    background: "var(--color-warning-soft)",
    color: "var(--color-warning-text)",
    border: "1px solid var(--color-warning-border)",
  },
};

const statusCardBase = {
  display: "grid",
  gap: 4,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
};

const statusCards = {
  local: {
    ...statusCardBase,
    background: "var(--color-surface-soft)",
  },
  sincronizando: {
    ...statusCardBase,
    background: "var(--color-secondary-soft)",
    border: "1px solid var(--color-secondary-border)",
  },
  sincronizado: {
    ...statusCardBase,
    background: "var(--color-success-soft)",
    border: "1px solid var(--color-success-border)",
  },
  atencao: {
    ...statusCardBase,
    background: "var(--color-warning-soft)",
    border: "1px solid var(--color-warning-border)",
  },
  erro: {
    ...statusCardBase,
    background: "var(--color-warning-soft)",
    border: "1px solid var(--color-warning-border)",
  },
};

const statusTitulo = {
  fontSize: 14,
  fontWeight: 850,
};

const statusDescricao = {
  margin: 0,
  fontSize: 13,
  lineHeight: 1.45,
  color: "var(--color-muted)",
};

const statusActionsInline = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 8,
  marginTop: 6,
};

const statusMeta = {
  fontSize: 12,
  fontWeight: 700,
  color: "var(--color-text)",
};
