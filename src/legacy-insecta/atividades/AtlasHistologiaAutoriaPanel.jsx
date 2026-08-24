import { useEffect, useMemo, useState } from "react";

import {
  CampoTexto,
  CampoTextarea,
  ResumoLinhaCompacta,
} from "../components/EditorSupportBlocks.jsx";
import FluxoEtapasCard from "../components/FluxoEtapasCard.jsx";
import FotoAnotadaEditor from "../components/FotoAnotadaEditor.jsx";
import { listarAssetsBiblioteca } from "../services/assetsContribuidos.js";
import AtlasHistologiaLaminaCard from "./AtlasHistologiaLaminaCard.jsx";

export default function AtlasHistologiaAutoriaPanel({
  laminaBase,
  moduloAtivo,
  professorUserId = "",
  slidesRelacionados = [],
  onLaminaChange,
  iniciarVazio = false,
  publicacaoAtual = null,
  onSalvarRascunho,
  onPublicar,
  onDescartarRascunho,
  onDescartarPublicacao,
}) {
  const [rascunho, setRascunho] = useState(() =>
    criarRascunho(laminaBase, { iniciarVazio }),
  );
  const [etapaAtivaId, setEtapaAtivaId] = useState("editor");
  const [assetsBiblioteca, setAssetsBiblioteca] = useState([]);
  const [mensagemBiblioteca, setMensagemBiblioteca] = useState("");
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );
  const mobile = viewportWidth < 720;
  const apoioEdicaoAtivo = useMemo(
    () => (Array.isArray(rascunho?.apoioEdicao) ? rascunho.apoioEdicao : []),
    [rascunho],
  );

  const estruturasSincronizadas = useMemo(
    () => sincronizarEstruturasComSetas(rascunho.setas || [], rascunho.estruturas || []),
    [rascunho.estruturas, rascunho.setas],
  );

  const previewLamina = useMemo(
    () => ({
      ...rascunho,
      estruturas: estruturasSincronizadas,
      imagemAnotada: rascunho.foto || rascunho.imagemAnotada || rascunho.imagemBase,
      imagemBase: rascunho.foto || rascunho.imagemBase,
    }),
    [estruturasSincronizadas, rascunho],
  );
  const checklistPublicacao = useMemo(
    () => [
      {
        id: "imagem",
        label: "Imagem carregada",
        ok: Boolean(previewLamina.imagemBase),
      },
      {
        id: "edicao",
        label: "Edição concluída",
        ok: Boolean(previewLamina.edicaoConcluida),
      },
      {
        id: "titulo",
        label: "Título preenchido",
        ok: Boolean(previewLamina.titulo?.trim()),
      },
      {
        id: "aumento",
        label: "Aumento informado",
        ok: Boolean(previewLamina.metadados?.aumento?.trim()),
      },
      {
        id: "origem",
        label: "Origem informada",
        ok: Boolean(previewLamina.metadados?.origem?.trim()),
      },
      {
        id: "estruturas",
        label: "Ao menos uma estrutura registrada",
        ok: Boolean(estruturasSincronizadas.length),
      },
    ],
    [estruturasSincronizadas.length, previewLamina],
  );
  const publicacaoLiberada = checklistPublicacao.every((item) => item.ok);
  const etapasAutoria = useMemo(
    () => [
      {
        id: "editor",
        rotulo: "Imagem",
        descricao: "Escolher a foto e construir as marcações principais da lâmina.",
      },
      {
        id: "ficha",
        rotulo: "Dados",
        descricao: "Preencher título, categoria, aumento e metadados da lâmina.",
      },
      {
        id: "estruturas",
        rotulo: "Estruturas",
        descricao: "Registrar as estruturas que vão sustentar a leitura orientada.",
      },
      {
        id: "preview",
        rotulo: "Revisão",
        descricao: "Conferir a prancha final e validar a publicação do atlas.",
      },
    ],
    [],
  );
  const etapaAtiva =
    etapasAutoria.find((item) => item.id === etapaAtivaId) || etapasAutoria[0];
  const etapaAtivaIndex = etapasAutoria.findIndex((item) => item.id === etapaAtiva.id);
  const etapaAnterior = etapaAtivaIndex > 0 ? etapasAutoria[etapaAtivaIndex - 1] : null;
  const proximaEtapa =
    etapaAtivaIndex < etapasAutoria.length - 1
      ? etapasAutoria[etapaAtivaIndex + 1]
      : null;

  useEffect(() => {
    onLaminaChange?.(previewLamina);
  }, [onLaminaChange, previewLamina]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!professorUserId) return undefined;

    let ativo = true;
    const timer = window.setTimeout(() => {
      listarAssetsBiblioteca(professorUserId, {
        tipo: "imagem",
        status: ["aguardando_aprovacao", "aprovado"],
      })
        .then((lista) => {
          if (!ativo) return;
          setAssetsBiblioteca(lista);
          if (!lista.length) {
            setMensagemBiblioteca("Nenhuma imagem da biblioteca foi encontrada para esta conta.");
          }
        })
        .catch((error) => {
          if (!ativo) return;
          setMensagemBiblioteca(
            error?.message || "Não foi possível carregar a biblioteca de imagens.",
          );
        });
    }, 0);

    return () => {
      ativo = false;
      window.clearTimeout(timer);
    };
  }, [professorUserId]);

  return (
    <section style={card}>
      <div style={topo}>
        <div style={topoCopy}>
          <span style={eyebrow}>Editar lâmina</span>
          <h2 style={titulo}>Montagem da lâmina oficial</h2>
          <p style={texto}>
            Monte a imagem principal do atlas, complete os dados da leitura e
            revise a prancha final antes de publicar.
          </p>
        </div>
        <div style={topoMeta}>
          <span style={chip}>{moduloAtivo?.titulo || "Histologia"}</span>
          <span style={chip}>{formatarSlug(rascunho.categoriaId || "sem-categoria")}</span>
        </div>
      </div>

      <div style={barraDescarte}>
        <span style={barraDescarteTexto}>
          Use os descartes para limpar o rascunho atual ou remover a lâmina publicada deste dispositivo.
        </span>
        <div style={barraDescarteAcoes}>
          <button
            type="button"
            className="btn btn--secondary btn--compact"
            onClick={() => onDescartarRascunho?.()}
          >
            Descartar rascunho
          </button>
          {publicacaoAtual ? (
            <button
              type="button"
              className="btn btn--secondary btn--compact"
              onClick={() => onDescartarPublicacao?.()}
            >
              Descartar publicação
            </button>
          ) : null}
        </div>
      </div>

      <FluxoEtapasCard
        eyebrow="Sequência guiada"
        title="Construção da lâmina"
        currentLabel={etapaAtiva.rotulo}
        steps={etapasAutoria}
        activeId={etapaAtivaId}
        onChange={setEtapaAtivaId}
        ariaLabel="Etapas da autoria do atlas"
        mobile={mobile}
        actions={
          <>
            <button
              type="button"
              className="btn btn--secondary btn--compact"
              style={etapaAcaoBotao}
              onClick={() => etapaAnterior && setEtapaAtivaId(etapaAnterior.id)}
              disabled={!etapaAnterior}
            >
              Anterior
            </button>
            <button
              type="button"
              className="btn btn--primary btn--compact"
              style={etapaAcaoBotao}
              onClick={() => proximaEtapa && setEtapaAtivaId(proximaEtapa.id)}
              disabled={!proximaEtapa}
            >
              {proximaEtapa ? `Próxima: ${proximaEtapa.rotulo}` : "Fluxo concluído"}
            </button>
          </>
        }
      />

      {etapaAtivaId === "editor" ? (
        <div style={{ ...colunaEdicao, ...(mobile ? colunaMobile : null) }}>
          {apoioEdicaoAtivo.length ? (
            <div style={apoioPanel}>
              <div style={{ ...secaoHeader, ...(mobile ? secaoHeaderMobile : null) }}>
                <div>
                  <span style={secaoRotulo}>Referência da lâmina sugerida</span>
                  <h3 style={secaoTitulo}>Informações prévias para esta edição</h3>
                </div>
              </div>

              <p style={textoApoio}>
                Esses pontos acompanham esta lâmina como apoio curto para orientar a
                leitura antes e durante a sua edição.
              </p>

              <div style={apoioGrid}>
                {apoioEdicaoAtivo.map((bloco) => (
                  <article key={bloco.titulo} style={apoioCard}>
                    <strong style={apoioCardTitle}>{bloco.titulo}</strong>
                    <p style={apoioCardResumo}>{bloco.resumo}</p>
                    <div style={apoioLista}>
                      {bloco.itens.map((item) => (
                        <span key={item} style={apoioItem}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <div style={secao}>
            <div style={{ ...secaoHeader, ...(mobile ? secaoHeaderMobile : null) }}>
              <div>
                <span style={secaoRotulo}>Imagem principal</span>
                <h3 style={secaoTitulo}>Marcação da lâmina</h3>
              </div>
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                onClick={() =>
                  setRascunho(criarRascunho(laminaBase, { iniciarVazio: false }))
                }
              >
                Restaurar exemplo
              </button>
            </div>

            <p style={textoApoio}>
              As marcações iniciais funcionam como ponto de partida. Você pode
              adicionar novas setas sempre que quiser evidenciar outras regiões
              ou estruturas do mesmo campo.
            </p>

            {professorUserId ? (
              <div style={bibliotecaBox}>
                <div style={{ ...secaoHeader, ...(mobile ? secaoHeaderMobile : null) }}>
                  <div>
                    <span style={secaoRotulo}>Biblioteca do professor</span>
                    <h4 style={bibliotecaTitulo}>Reaproveitar imagem já enviada</h4>
                  </div>
                  <span style={contador}>
                    {assetsBiblioteca.length}{" "}
                    {assetsBiblioteca.length === 1 ? "imagem" : "imagens"}
                  </span>
                </div>

                <p style={textoApoio}>
                  Escolha uma imagem da sua biblioteca para entrar no editor como
                  base desta lâmina.
                </p>

                {mensagemBiblioteca && !assetsBiblioteca.length ? (
                  <div style={estadoVazio}>{mensagemBiblioteca}</div>
                ) : null}

                {assetsBiblioteca.length ? (
                  <div style={bibliotecaGrid}>
                    {assetsBiblioteca.slice(0, 6).map((item) => (
                      <article key={item.id} style={bibliotecaCard}>
                        {item.previewUrl ? (
                          <img
                            src={item.previewUrl}
                            alt={item.legenda}
                            style={bibliotecaImagem}
                          />
                        ) : (
                          <div style={bibliotecaImagemVazia}>Sem prévia</div>
                        )}
                        <div style={bibliotecaCardBody}>
                          <strong style={bibliotecaNome}>{item.taxon}</strong>
                          <span style={bibliotecaMeta}>{item.legenda}</span>
                          <button
                            type="button"
                            className="btn btn--secondary btn--compact"
                            onClick={() =>
                              setRascunho((atual) => ({
                                ...atual,
                                foto: item.downloadUrl || item.previewUrl || "",
                                imagemBase: item.downloadUrl || item.previewUrl || "",
                                imagemAnotada: item.downloadUrl || item.previewUrl || "",
                                assetBibliotecaId: item.id,
                                metadados: {
                                  ...atual.metadados,
                                  origem:
                                    atual.metadados?.origem?.trim() ||
                                    "Biblioteca do professor",
                                },
                              }))
                            }
                          >
                            Usar no editor
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            <FotoAnotadaEditor
              foto={rascunho.foto || rascunho.imagemBase}
              onFotoChange={(foto) =>
                setRascunho((atual) => ({
                  ...atual,
                  // O botão "Remover foto" envia uma string vazia. É
                  // importante limpar todos os espelhos da imagem; caso
                  // contrário o fallback imagemBase/imagemAnotada recoloca
                  // a foto imediatamente no editor.
                  foto: foto || "",
                  imagemBase: foto || "",
                  imagemAnotada: foto || "",
                  setas: foto ? atual.setas : [],
                  edicaoConcluida: foto ? atual.edicaoConcluida : false,
                }))
              }
              edicaoConcluida={rascunho.edicaoConcluida}
              onEdicaoConcluidaChange={(edicaoConcluida) =>
                setRascunho((atual) => ({ ...atual, edicaoConcluida }))
              }
              setas={rascunho.setas || []}
              onSetasChange={(setas) =>
                setRascunho((atual) => ({
                  ...atual,
                  setas: normalizarOrigemSetas(atual.setas || [], setas),
                }))
              }
              rotuloFoto="Imagem-base da lâmina"
              titulo="Editor oficial do atlas"
            />
          </div>
        </div>
      ) : null}

      {etapaAtivaId === "ficha" ? (
        <div style={{ ...colunaEdicao, ...(mobile ? colunaMobile : null) }}>
          <div style={secao}>
            <div style={{ ...secaoHeader, ...(mobile ? secaoHeaderMobile : null) }}>
              <div>
                <span style={secaoRotulo}>Metadados</span>
                <h3 style={secaoTitulo}>Ficha da lâmina</h3>
              </div>
            </div>

            <div style={{ ...formGrid, ...(mobile ? formGridMobile : null) }}>
              <CampoTexto
                containerStyle={campo}
                labelStyle={campoRotulo}
                inputStyle={input}
                label="Título"
                value={rascunho.titulo}
                onChange={(tituloCampo) =>
                  setRascunho((atual) => ({ ...atual, titulo: tituloCampo }))
                }
              />
              <CampoTexto
                containerStyle={campo}
                labelStyle={campoRotulo}
                inputStyle={input}
                label="Subtítulo"
                value={rascunho.subtitulo}
                onChange={(subtitulo) =>
                  setRascunho((atual) => ({ ...atual, subtitulo }))
                }
              />
              <CampoTexto
                containerStyle={campo}
                labelStyle={campoRotulo}
                inputStyle={input}
                label="Categoria"
                value={rascunho.categoriaId}
                onChange={(categoriaId) =>
                  setRascunho((atual) => ({ ...atual, categoriaId }))
                }
              />
              <CampoTexto
                containerStyle={campo}
                labelStyle={campoRotulo}
                inputStyle={input}
                label="Status"
                value={rascunho.status}
                onChange={(status) =>
                  setRascunho((atual) => ({ ...atual, status }))
                }
              />
              <CampoTexto
                containerStyle={campo}
                labelStyle={campoRotulo}
                inputStyle={input}
                label="Aumento"
                value={rascunho.metadados?.aumento || ""}
                onChange={(aumento) =>
                  setRascunho((atual) => ({
                    ...atual,
                    metadados: { ...atual.metadados, aumento },
                  }))
                }
              />
              <CampoTexto
                containerStyle={campo}
                labelStyle={campoRotulo}
                inputStyle={input}
                label="Coloração"
                value={rascunho.metadados?.coloracao || ""}
                onChange={(coloracao) =>
                  setRascunho((atual) => ({
                    ...atual,
                    metadados: { ...atual.metadados, coloracao },
                  }))
                }
              />
              <CampoTexto
                containerStyle={campo}
                labelStyle={campoRotulo}
                inputStyle={input}
                label="Origem"
                value={rascunho.metadados?.origem || ""}
                onChange={(origem) =>
                  setRascunho((atual) => ({
                    ...atual,
                    metadados: { ...atual.metadados, origem },
                  }))
                }
              />
            </div>

            <CampoTextarea
              containerStyle={campo}
              labelStyle={campoRotulo}
              textareaStyle={textarea}
              label="Observações técnicas"
              value={rascunho.metadados?.observacoesTecnicas || ""}
              onChange={(observacoesTecnicas) =>
                setRascunho((atual) => ({
                  ...atual,
                  metadados: { ...atual.metadados, observacoesTecnicas },
                }))
              }
            />
          </div>
        </div>
      ) : null}

      {etapaAtivaId === "estruturas" ? (
        <div style={{ ...colunaEdicao, ...(mobile ? colunaMobile : null) }}>
          <div style={secao}>
            <div style={{ ...secaoHeader, ...(mobile ? secaoHeaderMobile : null) }}>
              <div>
                <span style={secaoRotulo}>Dados de apoio</span>
                <h3 style={secaoTitulo}>Coleta para leitura orientada</h3>
              </div>
              <span style={contador}>
                {estruturasSincronizadas.length}{" "}
                {estruturasSincronizadas.length === 1 ? "marcação" : "marcações"}
              </span>
            </div>

            <p style={textoApoio}>
              Esses dados entram na construção do atlas e também podem servir de
              base para a leitura orientada da atividade do aluno depois. Cada
              nova seta criada no editor abre espaço para registrar uma
              estrutura aqui.
            </p>

            <div style={estruturasGrid}>
              {estruturasSincronizadas.length ? (
                <GrupoEstruturas
                  titulo="Marcações registradas"
                  descricao="Estruturas criadas por você no editor desta lâmina."
                  estruturas={estruturasSincronizadas}
                  setRascunho={setRascunho}
                  vazio="Nenhuma marcação registrada ainda."
                  mobile={mobile}
                />
              ) : (
                <div style={estadoVazio}>
                  Adicione pelo menos uma seta no editor para habilitar a coleta
                  dessas estruturas.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {etapaAtivaId === "preview" ? (
        <div style={{ ...colunaPreview, ...(mobile ? colunaMobile : null) }}>
          <div style={secao}>
            <div style={{ ...secaoHeader, ...(mobile ? secaoHeaderMobile : null) }}>
              <div>
                <span style={secaoRotulo}>Preview</span>
                <h3 style={secaoTitulo}>Como a prancha vai aparecer</h3>
              </div>
            </div>

            <AtlasHistologiaLaminaCard
              lamina={previewLamina}
              slidesRelacionados={slidesRelacionados}
              compacto
            />
          </div>

          <div style={secao}>
            <div style={{ ...secaoHeader, ...(mobile ? secaoHeaderMobile : null) }}>
              <div>
                <span style={secaoRotulo}>Resumo</span>
                <h3 style={secaoTitulo}>Checklist da publicação</h3>
              </div>
            </div>

            <div style={resumoLista}>
              <ResumoLinhaCompacta
                rowStyle={resumoLinha}
                labelStyle={resumoLabel}
                valueStyle={resumoValue}
                label="Imagem carregada"
                value={previewLamina.imagemBase ? "Sim" : "Não"}
              />
              <ResumoLinhaCompacta
                rowStyle={resumoLinha}
                labelStyle={resumoLabel}
                valueStyle={resumoValue}
                label="Setas criadas"
                value={String(previewLamina.setas?.length || 0)}
              />
              <ResumoLinhaCompacta
                rowStyle={resumoLinha}
                labelStyle={resumoLabel}
                valueStyle={resumoValue}
                label="Marcações com legenda"
                value={String(
                  (previewLamina.setas || []).filter((item) => item.legenda?.trim()).length,
                )}
              />
              <ResumoLinhaCompacta
                rowStyle={resumoLinha}
                labelStyle={resumoLabel}
                valueStyle={resumoValue}
                label="Status"
                value={previewLamina.status || "rascunho"}
              />
              <ResumoLinhaCompacta
                rowStyle={resumoLinha}
                labelStyle={resumoLabel}
                valueStyle={resumoValue}
                label="Publicação local"
                value={publicacaoAtual ? "Já publicada" : "Ainda não publicada"}
              />
            </div>

            <div style={checklistBox}>
              <strong style={checklistTitulo}>Pronto para publicar</strong>
              <div style={checklistLista}>
                {checklistPublicacao.map((item) => (
                  <span
                    key={item.id}
                    style={{
                      ...checklistItem,
                      ...(item.ok ? checklistItemOk : checklistItemPendente),
                    }}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div style={publicacaoAcoes}>
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                onClick={() =>
                  onSalvarRascunho?.({
                    ...previewLamina,
                    status: "rascunho",
                  })
                }
              >
                Salvar rascunho
              </button>
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                onClick={() => onDescartarRascunho?.()}
              >
                Descartar rascunho
              </button>
              {publicacaoAtual ? (
                <button
                  type="button"
                  className="btn btn--secondary btn--compact"
                  onClick={() => onDescartarPublicacao?.()}
                >
                  Descartar publicação
                </button>
              ) : null}
              <button
                type="button"
                className="btn btn--primary btn--compact"
                disabled={!publicacaoLiberada}
                onClick={() =>
                  onPublicar?.({
                    ...previewLamina,
                    status: "publicado",
                  })
                }
              >
                {publicacaoAtual ? "Atualizar publicação" : "Publicar no atlas"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function GrupoEstruturas({
  titulo,
  descricao,
  estruturas,
  setRascunho,
  vazio = "Sem estruturas neste grupo.",
  mobile = false,
}) {
  return (
    <section style={grupoEstruturas}>
      <div style={grupoEstruturasTopo}>
        <strong style={grupoEstruturasTitulo}>{titulo}</strong>
        <span style={grupoEstruturasDescricao}>{descricao}</span>
      </div>

      {estruturas.length ? (
        estruturas.map((estrutura, index) => (
          <article
            key={estrutura.id}
            style={{ ...estruturaCard, ...(mobile ? estruturaCardMobile : null) }}
          >
            <div style={{ ...estruturaHeader, ...(mobile ? estruturaHeaderMobile : null) }}>
              <div style={estruturaHeaderInfo}>
                <span style={estruturaIndice}>{index + 1}</span>
                <strong style={estruturaTitulo}>
                  {estrutura.nome || `Estrutura ${index + 1}`}
                </strong>
              </div>
              <button
                type="button"
                className="btn btn--secondary btn--compact"
                style={botaoExcluirEstrutura}
                onClick={() => removerEstrutura(estrutura.id, setRascunho)}
              >
                Excluir
              </button>
            </div>

            <CampoTexto
              containerStyle={campo}
              labelStyle={campoRotulo}
              inputStyle={input}
              label="Nome da estrutura"
              value={estrutura.nome}
              onChange={(nome) =>
                atualizarEstrutura(estrutura.id, { nome }, setRascunho)
              }
            />
            <CampoTextarea
              containerStyle={campo}
              labelStyle={campoRotulo}
              textareaStyle={textarea}
              label="Descrição curta"
              value={estrutura.descricaoCurta}
              onChange={(descricaoCurta) =>
                atualizarEstrutura(
                  estrutura.id,
                  { descricaoCurta },
                  setRascunho,
                )
              }
            />
            <CampoTextarea
              containerStyle={campo}
              labelStyle={campoRotulo}
              textareaStyle={textarea}
              label="Descrição ampliada"
              value={estrutura.descricaoAmpliada}
              onChange={(descricaoAmpliada) =>
                atualizarEstrutura(
                  estrutura.id,
                  { descricaoAmpliada },
                  setRascunho,
                )
              }
            />
          </article>
        ))
      ) : (
        <div style={estadoVazioSecundario}>{vazio}</div>
      )}
    </section>
  );
}

function criarRascunho(laminaBase, options = {}) {
  const iniciarVazio = options.iniciarVazio === true;
  const laminaNormalizada = limparMarcacoesBaseDaLamina(laminaBase);
  const usarSugestaoInicial = laminaNormalizada?.origemAtlas !== "modelo";
  const imagemInicial = iniciarVazio ? "" : laminaBase?.imagemBase || "";
  const imagemAnotadaInicial = iniciarVazio
    ? ""
    : laminaBase?.imagemAnotada || laminaBase?.imagemBase || "";
  const setasIniciais =
    usarSugestaoInicial && Array.isArray(laminaNormalizada?.setas)
      ? laminaNormalizada.setas.map((seta) => ({
          ...seta,
          origemMarcacao: seta.origemMarcacao || "base",
        }))
      : [];
  const estruturasIniciais =
    usarSugestaoInicial && Array.isArray(laminaNormalizada?.estruturas)
      ? laminaNormalizada.estruturas.map((estrutura) => ({ ...estrutura }))
      : [];
  const temImagemInicial = Boolean(imagemInicial || imagemAnotadaInicial);

  return {
    ...laminaNormalizada,
    foto: imagemInicial,
    imagemBase: imagemInicial,
    imagemAnotada: imagemAnotadaInicial,
    setas: setasIniciais,
    estruturas: estruturasIniciais,
    metadados: { ...(laminaNormalizada?.metadados || {}) },
    relacoes: { ...(laminaNormalizada?.relacoes || {}) },
    status: laminaNormalizada?.status || "rascunho",
    edicaoConcluida: Boolean(laminaNormalizada?.edicaoConcluida && temImagemInicial),
  };
}

function limparMarcacoesBaseDaLamina(lamina) {
  if (!lamina || !Array.isArray(lamina.apoioEdicao) || !lamina.apoioEdicao.length) {
    return lamina;
  }

  return {
    ...lamina,
    setas: Array.isArray(lamina.setas)
      ? lamina.setas.filter((seta) => seta?.origemMarcacao !== "base")
      : [],
    estruturas: Array.isArray(lamina.estruturas)
      ? lamina.estruturas.filter((estrutura) => estrutura?.origemMarcacao === "complementar")
      : [],
  };
}

function sincronizarEstruturasComSetas(setas, estruturasExistentes) {
  return (setas || []).map((seta, index) => {
    const existente = estruturasExistentes[index] || {};
    const nomePadrao = seta.legenda?.trim() || `Estrutura ${index + 1}`;

    return {
      id: existente.id || `estrutura-${index + 1}`,
      nome: existente.nome || nomePadrao,
      descricaoCurta: existente.descricaoCurta || "",
      descricaoAmpliada: existente.descricaoAmpliada || "",
      origemMarcacao:
        existente.origemMarcacao || seta.origemMarcacao || "complementar",
    };
  });
}

function normalizarOrigemSetas(setasAnteriores, proximasSetas) {
  const origemPorId = new Map(
    (setasAnteriores || []).map((seta) => [seta.id, seta.origemMarcacao || "base"]),
  );

  return (proximasSetas || []).map((seta) => ({
    ...seta,
    origemMarcacao: origemPorId.get(seta.id) || seta.origemMarcacao || "complementar",
  }));
}

function formatarSlug(valor) {
  return String(valor || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

function atualizarEstrutura(estruturaId, patch, setRascunho) {
  setRascunho((atual) => ({
    ...atual,
    estruturas: sincronizarEstruturasComSetas(atual.setas || [], atual.estruturas || []).map(
      (estrutura) =>
        estrutura.id === estruturaId ? { ...estrutura, ...patch } : estrutura,
    ),
  }));
}

function removerEstrutura(estruturaId, setRascunho) {
  setRascunho((atual) => {
    const estruturasAtuais = sincronizarEstruturasComSetas(
      atual.setas || [],
      atual.estruturas || [],
    );
    const indiceAlvo = estruturasAtuais.findIndex(
      (estrutura) => estrutura.id === estruturaId,
    );

    if (indiceAlvo < 0) return atual;

    return {
      ...atual,
      setas: (atual.setas || []).filter((_, index) => index !== indiceAlvo),
      estruturas: estruturasAtuais.filter((_, index) => index !== indiceAlvo),
    };
  });
}

const card = {
  display: "grid",
  gap: 16,
  padding: 16,
  borderRadius: 18,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  boxShadow: "var(--shadow-sm)",
};

const topo = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "flex-start",
  flexWrap: "wrap",
};

const topoCopy = {
  display: "grid",
  gap: 6,
  maxWidth: 760,
};

const topoMeta = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const barraDescarte = {
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

const barraDescarteTexto = {
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.4,
};

const barraDescarteAcoes = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
};

const eyebrow = {
  color: "var(--color-secondary)",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const titulo = {
  margin: 0,
  fontSize: 24,
  lineHeight: 1.1,
};

const texto = {
  margin: 0,
  color: "var(--color-muted)",
  lineHeight: 1.5,
};

const chip = {
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
  fontSize: 12,
  fontWeight: 700,
};

const colunaEdicao = {
  display: "grid",
  gap: 14,
  minWidth: 0,
};

const colunaPreview = {
  display: "grid",
  gap: 14,
  minWidth: 0,
};

const colunaMobile = {
  minWidth: 0,
};

const apoioPanel = {
  display: "grid",
  gap: 10,
  padding: 14,
  borderRadius: 16,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const apoioGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 10,
};

const apoioCard = {
  display: "grid",
  gap: 8,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const apoioCardTitle = {
  fontSize: 14,
};

const apoioCardResumo = {
  margin: 0,
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.45,
};

const apoioLista = {
  display: "grid",
  gap: 6,
};

const apoioItem = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
  fontSize: 12,
  lineHeight: 1.4,
  color: "var(--color-text)",
};

const etapaAcaoBotao = {
  minHeight: 40,
};

const secao = {
  display: "grid",
  gap: 12,
  padding: 14,
  borderRadius: 16,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const secaoHeader = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "flex-start",
  flexWrap: "wrap",
};

const secaoHeaderMobile = {
  display: "grid",
  justifyContent: "stretch",
};

const secaoRotulo = {
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const secaoTitulo = {
  margin: "2px 0 0",
  fontSize: 18,
  lineHeight: 1.15,
};

const contador = {
  fontSize: 12,
  color: "var(--color-muted)",
  fontWeight: 700,
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 10,
};

const formGridMobile = {
  gridTemplateColumns: "minmax(0, 1fr)",
};

const campo = {
  display: "grid",
  gap: 6,
};

const campoRotulo = {
  fontSize: 12,
  fontWeight: 800,
  color: "var(--color-muted)",
};

const input = {
  width: "100%",
  minHeight: 42,
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  font: "inherit",
};

const textarea = {
  ...input,
  minHeight: 88,
  resize: "vertical",
};

const textoApoio = {
  margin: 0,
  color: "var(--color-muted)",
  lineHeight: 1.5,
};

const estruturasGrid = {
  display: "grid",
  gap: 10,
};

const grupoEstruturas = {
  display: "grid",
  gap: 10,
};

const grupoEstruturasTopo = {
  display: "grid",
  gap: 2,
};

const grupoEstruturasTitulo = {
  fontSize: 13,
};

const grupoEstruturasDescricao = {
  color: "var(--color-muted)",
  fontSize: 12,
  lineHeight: 1.45,
};

const estruturaCard = {
  display: "grid",
  gap: 10,
  padding: 12,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const estruturaCardMobile = {
  minWidth: 0,
};

const estruturaHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
};

const estruturaHeaderMobile = {
  alignItems: "flex-start",
  flexWrap: "wrap",
};

const estruturaHeaderInfo = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  minWidth: 0,
};

const estruturaIndice = {
  minWidth: 24,
  height: 24,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  background: "var(--color-secondary)",
  color: "#fff",
  fontSize: 12,
  fontWeight: 800,
};

const estruturaTitulo = {
  fontSize: 14,
};

const botaoExcluirEstrutura = {
  flexShrink: 0,
};

const bibliotecaBox = {
  display: "grid",
  gap: 12,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const bibliotecaTitulo = {
  margin: 0,
  fontSize: 16,
};

const bibliotecaGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 10,
};

const bibliotecaCard = {
  display: "grid",
  overflow: "hidden",
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const bibliotecaImagem = {
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
  display: "block",
  background: "var(--color-bg-soft)",
};

const bibliotecaImagemVazia = {
  display: "grid",
  placeItems: "center",
  aspectRatio: "4 / 3",
  padding: 12,
  color: "var(--color-muted)",
  background: "var(--color-bg-soft)",
};

const bibliotecaCardBody = {
  display: "grid",
  gap: 8,
  padding: 12,
};

const bibliotecaNome = {
  fontSize: 14,
};

const bibliotecaMeta = {
  color: "var(--color-muted)",
  fontSize: 12,
  lineHeight: 1.45,
};

const estadoVazio = {
  padding: 12,
  borderRadius: 12,
  border: "1px dashed var(--color-border)",
  color: "var(--color-muted)",
  background: "var(--color-surface)",
  lineHeight: 1.5,
};

const estadoVazioSecundario = {
  padding: 10,
  borderRadius: 12,
  border: "1px dashed var(--color-border)",
  background: "var(--color-surface)",
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.45,
};

const resumoLista = {
  display: "grid",
  gap: 10,
};

const checklistBox = {
  display: "grid",
  gap: 8,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
};

const checklistTitulo = {
  fontSize: 13,
};

const checklistLista = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const checklistItem = {
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
};

const checklistItemOk = {
  border: "1px solid color-mix(in srgb, var(--color-success) 35%, transparent)",
  background: "color-mix(in srgb, var(--color-success) 12%, white)",
  color: "var(--color-success)",
};

const checklistItemPendente = {
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  color: "var(--color-muted)",
};

const publicacaoAcoes = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const resumoLinha = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  paddingBottom: 8,
  borderBottom: "1px solid var(--color-border)",
};

const resumoLabel = {
  color: "var(--color-muted)",
};

const resumoValue = {
  textAlign: "right",
};
