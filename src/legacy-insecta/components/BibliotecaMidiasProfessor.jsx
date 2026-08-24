import { useCallback, useEffect, useMemo, useState } from "react";

import { artropodesNodes } from "../chaves/data/artropodesData.js";
import { carregarAtlasHistologiaRemoto } from "../services/atlasHistologiaRemoto.js";
import { listarAssetsBiblioteca } from "../services/assetsContribuidos.js";
import ContribuicaoImagens from "./ContribuicaoImagens.jsx";

const MODELOS_3D_APP = Object.values(artropodesNodes || {})
  .flatMap((node) =>
    ["a", "b"]
      .map((lado) => node?.[lado])
      .filter((item) => item?.model3d)
      .map((item) => ({
        id: `${item.result || item.text}-${item.model3d}`,
        titulo: item.result || item.text || "Modelo 3D",
        caminho: item.model3d,
        possuiVisualizador: Boolean(item.has3d),
      })),
  )
  .filter(
    (item, indice, lista) =>
      lista.findIndex((candidato) => candidato.caminho === item.caminho) === indice,
  );

export default function BibliotecaMidiasProfessor({ session }) {
  const userId = session?.user?.id || "";
  const [aba, setAba] = useState("atlas");
  const [filtroAtlas, setFiltroAtlas] = useState("todos");
  const [atlas, setAtlas] = useState([]);
  const [assetsProfessor, setAssetsProfessor] = useState([]);
  const [carregandoAtlas, setCarregandoAtlas] = useState(false);
  const [mensagemAtlas, setMensagemAtlas] = useState("");

  const carregarAtlas = useCallback(async () => {
    setCarregandoAtlas(true);
    setMensagemAtlas("");

    try {
      const remoto = await carregarAtlasHistologiaRemoto(userId);
      const laminas = Object.values(remoto?.rascunhos || {})
        .map((item) => ({
          id: item.id,
          titulo: item.titulo || "Lâmina",
          moduloId: item.moduloId || "",
          categoriaId: item.categoriaId || "",
          status: item.status || "rascunho",
          imagemUrl: item.imagemAnotada || item.imagemBase || item.foto || "",
          atualizadoEm: item.atualizadoEm || item.publicadoEm || "",
          estruturas: Array.isArray(item.estruturas) ? item.estruturas.length : 0,
        }))
        .sort((a, b) => {
          const dataA = new Date(a.atualizadoEm || 0).getTime();
          const dataB = new Date(b.atualizadoEm || 0).getTime();
          return dataB - dataA;
        });

      setAtlas(laminas);
      if (!laminas.length) {
        setMensagemAtlas("Nenhuma lâmina do atlas foi salva na nuvem por esta conta ainda.");
      }
    } catch (error) {
      setMensagemAtlas(
        error?.message || "Não foi possível carregar a biblioteca do atlas.",
      );
    } finally {
      setCarregandoAtlas(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    const timer = window.setTimeout(() => {
      void carregarAtlas();
      listarAssetsBiblioteca(userId, {
        status: ["aguardando_aprovacao", "aprovado"],
      }).then(setAssetsProfessor).catch(() => setAssetsProfessor([]));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [carregarAtlas, userId]);

  const atlasFiltrado = useMemo(() => {
    return atlas.filter((item) => {
      if (filtroAtlas === "todos") return true;
      return item.status === filtroAtlas;
    });
  }, [atlas, filtroAtlas]);

  const resumoBiblioteca = useMemo(() => {
    const publicadas = atlas.filter((item) => item.status === "publicado").length;
    const rascunhos = atlas.filter((item) => item.status !== "publicado").length;
    const modelosProfessor = assetsProfessor.filter((item) => item.tipo === "modelo3d").length;
    return {
      atlas: atlas.length,
      publicadas,
      rascunhos,
      modelos3d: MODELOS_3D_APP.length + modelosProfessor,
    };
  }, [assetsProfessor, atlas]);

  const modelosProfessor = useMemo(
    () => assetsProfessor.filter((item) => item.tipo === "modelo3d"),
    [assetsProfessor],
  );

  async function copiarTexto(valor, mensagem) {
    try {
      await navigator.clipboard?.writeText(valor);
      setMensagemAtlas(mensagem);
    } catch {
      setMensagemAtlas("");
    }
  }

  return (
    <section style={container}>
      <div style={header}>
        <div>
          <h3 style={titulo}>Biblioteca de mídias do professor</h3>
          <p style={intro}>
            Reúne as lâminas do atlas, as contribuições de imagens e os modelos 3D
            já disponíveis no app para reaproveitamento didático.
          </p>
        </div>
        <button
          type="button"
          className="btn btn--secondary btn--compact"
          onClick={carregarAtlas}
          disabled={carregandoAtlas}
        >
          {carregandoAtlas ? "Atualizando..." : "Atualizar biblioteca"}
        </button>
      </div>

      <div style={resumoGrid}>
        <ResumoItem rotulo="Lâminas no atlas" valor={String(resumoBiblioteca.atlas)} />
        <ResumoItem rotulo="Publicadas" valor={String(resumoBiblioteca.publicadas)} />
        <ResumoItem rotulo="Rascunhos" valor={String(resumoBiblioteca.rascunhos)} />
        <ResumoItem rotulo="Modelos 3D" valor={String(resumoBiblioteca.modelos3d)} />
      </div>

      <nav style={abas} aria-label="Áreas da biblioteca de mídias">
        {[
          ["atlas", "Atlas"],
          ["imagens", "Imagens"],
          ["modelos3d", "Modelos 3D"],
        ].map(([id, rotulo]) => (
          <button
            key={id}
            type="button"
            className={
              aba === id
                ? "btn btn--primary btn--compact"
                : "btn btn--secondary btn--compact"
            }
            onClick={() => setAba(id)}
          >
            {rotulo}
          </button>
        ))}
      </nav>

      {aba === "atlas" ? (
        <div style={bloco}>
          <div style={blocoHeader}>
            <div>
              <strong>Atlas de Histologia</strong>
              <div style={meta}>
                Aqui aparecem as imagens já guardadas na nuvem por esta conta.
              </div>
            </div>
            <div style={filtros}>
              {[
                ["todos", "Todas"],
                ["publicado", "Publicadas"],
                ["rascunho", "Rascunhos"],
              ].map(([id, rotulo]) => (
                <button
                  key={id}
                  type="button"
                  className={
                    filtroAtlas === id
                      ? "btn btn--primary btn--compact"
                      : "btn btn--secondary btn--compact"
                  }
                  onClick={() => setFiltroAtlas(id)}
                >
                  {rotulo}
                </button>
              ))}
            </div>
          </div>

          {mensagemAtlas ? <div style={mensagemInfo}>{mensagemAtlas}</div> : null}

          {atlasFiltrado.length ? (
            <div style={atlasGrid}>
              {atlasFiltrado.map((item) => (
                <article key={item.id} style={card}>
                  {item.imagemUrl ? (
                    <img
                      src={item.imagemUrl}
                      alt={item.titulo}
                      style={imagem}
                    />
                  ) : (
                    <div style={imagemVazia}>Sem imagem assinada disponível</div>
                  )}
                  <div style={cardBody}>
                    <div style={cardTop}>
                      <strong>{item.titulo}</strong>
                      <span style={statusStyle(item.status)}>
                        {item.status === "publicado" ? "Publicada" : "Rascunho"}
                      </span>
                    </div>
                    <div style={meta}>
                      {item.moduloId || "Sem módulo"} · {item.categoriaId || "Sem categoria"}
                    </div>
                    <div style={meta}>
                      {item.estruturas} {item.estruturas === 1 ? "estrutura" : "estruturas"} ·{" "}
                      {formatarData(item.atualizadoEm)}
                    </div>
                    <div style={acoes}>
                      <button
                        type="button"
                        className="btn btn--secondary btn--compact"
                        onClick={() =>
                          copiarTexto(
                            item.id,
                            `ID da lâmina ${item.titulo} copiado.`,
                          )
                        }
                      >
                        Copiar ID
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={mensagemVazia}>
              Nenhuma lâmina encontrada para o filtro atual.
            </div>
          )}
        </div>
      ) : null}

      {aba === "imagens" ? <ContribuicaoImagens session={session} /> : null}

      {aba === "modelos3d" ? (
        <div style={bloco}>
          <div style={blocoHeader}>
            <div>
              <strong>Modelos 3D</strong>
              <div style={meta}>
                Aqui aparecem os modelos enviados pela sua conta e os arquivos `.glb`
                já embutidos no aplicativo.
              </div>
            </div>
          </div>

          <div style={atlasGrid}>
            {modelosProfessor.map((item) => (
              <article key={item.id} style={card}>
                <div style={modeloBox}>3D</div>
                <div style={cardBody}>
                  <div style={cardTop}>
                    <strong>{item.taxon}</strong>
                    <span style={statusStyle(item.status === "aprovado" ? "publicado" : "rascunho")}>
                      {item.status === "aprovado" ? "Aprovado" : "Em análise"}
                    </span>
                  </div>
                  <div style={meta}>{item.legenda}</div>
                  <div style={meta}>{item.nome_arquivo}</div>
                  <div style={acoes}>
                    <button
                      type="button"
                      className="btn btn--secondary btn--compact"
                      onClick={() =>
                        copiarTexto(
                          item.downloadUrl || "",
                          `Link assinado do modelo ${item.taxon} copiado.`,
                        )
                      }
                    >
                      Copiar link
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {MODELOS_3D_APP.map((item) => (
              <article key={item.id} style={card}>
                <div style={modeloBox}>3D</div>
                <div style={cardBody}>
                  <div style={cardTop}>
                    <strong>{item.titulo}</strong>
                    <span style={statusStyle(item.possuiVisualizador ? "publicado" : "rascunho")}>
                      {item.possuiVisualizador ? "Visualizável" : "Cadastrado"}
                    </span>
                  </div>
                  <div style={meta}>{item.caminho}</div>
                  <div style={acoes}>
                    <button
                      type="button"
                      className="btn btn--secondary btn--compact"
                      onClick={() =>
                        copiarTexto(
                          item.caminho,
                          `Caminho ${item.caminho} copiado.`,
                        )
                      }
                    >
                      Copiar caminho
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ResumoItem({ rotulo, valor }) {
  return (
    <div style={resumoItem}>
      <span style={resumoRotulo}>{rotulo}</span>
      <strong style={resumoValor}>{valor}</strong>
    </div>
  );
}

function formatarData(valor) {
  if (!valor) return "sem data";

  try {
    return new Date(valor).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "sem data";
  }
}

function statusStyle(status) {
  const publicado = status === "publicado";
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 28,
    padding: "4px 10px",
    borderRadius: 999,
    border: `1px solid ${
      publicado ? "var(--color-success-border)" : "var(--color-border)"
    }`,
    background: publicado
      ? "var(--color-success-soft)"
      : "var(--color-surface)",
    color: publicado
      ? "var(--color-success-text)"
      : "var(--color-muted)",
    fontSize: 12,
    fontWeight: 800,
  };
}

const container = {
  display: "grid",
  gap: 16,
};

const header = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  justifyContent: "space-between",
  flexWrap: "wrap",
};

const titulo = {
  margin: 0,
  fontSize: 22,
};

const intro = {
  margin: "6px 0 0",
  color: "var(--color-muted)",
};

const abas = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const resumoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 10,
};

const resumoItem = {
  display: "grid",
  gap: 6,
  padding: 14,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const resumoRotulo = {
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 800,
  textTransform: "uppercase",
};

const resumoValor = {
  fontSize: 24,
  lineHeight: 1,
};

const bloco = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const blocoHeader = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
};

const filtros = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const mensagemInfo = {
  padding: 12,
  borderRadius: 12,
  background: "var(--color-info-soft)",
  color: "var(--color-info-text)",
  fontWeight: 700,
};

const mensagemVazia = {
  padding: 18,
  borderRadius: 12,
  border: "1px dashed var(--color-border)",
  color: "var(--color-muted)",
  background: "var(--color-surface)",
};

const atlasGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 12,
};

const card = {
  display: "grid",
  gap: 0,
  overflow: "hidden",
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const imagem = {
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
  display: "block",
  background: "var(--color-bg-soft)",
};

const imagemVazia = {
  display: "grid",
  placeItems: "center",
  width: "100%",
  aspectRatio: "4 / 3",
  background: "var(--color-bg-soft)",
  color: "var(--color-muted)",
  padding: 12,
  textAlign: "center",
};

const modeloBox = {
  display: "grid",
  placeItems: "center",
  width: "100%",
  aspectRatio: "4 / 3",
  background:
    "linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 14%, white), var(--color-bg-soft))",
  color: "var(--color-primary)",
  fontSize: 52,
  fontWeight: 900,
};

const cardBody = {
  display: "grid",
  gap: 8,
  padding: 12,
};

const cardTop = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  justifyContent: "space-between",
};

const meta = {
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.5,
};

const acoes = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};
