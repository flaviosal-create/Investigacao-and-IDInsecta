import { useEffect, useMemo, useState } from "react";

import FotoAnotadaImagem from "./FotoAnotadaImagem.jsx";

export default function AtlasHistologiaLaminaCard({
  lamina,
  slidesRelacionados = [],
  compacto = false,
  editadaNoAtlas = false,
  origemAtlas = "modelo",
  modoLeitura = "completo",
}) {
  const [estruturaAtivaId] = useState(lamina?.estruturas?.[0]?.id || "");
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );
  const mobile = viewportWidth < 720;

  const estruturaAtiva = useMemo(
    () =>
      lamina?.estruturas?.find((estrutura) => estrutura.id === estruturaAtivaId) ||
      lamina?.estruturas?.[0] ||
      null,
    [estruturaAtivaId, lamina],
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!lamina) return null;
  const leituraAtlas = modoLeitura === "atlas";

  const rotuloOrigem =
    origemAtlas === "publicada"
      ? "Lâmina publicada"
      : origemAtlas === "rascunho"
        ? "Lâmina em rascunho"
        : "Tela-padrão de lâmina";
  const placeholderImagem =
    origemAtlas === "modelo"
      ? "Modelo sugerido sem imagem. Clique em editar para adicionar a foto da lâmina."
      : "Adicione uma foto para marcar estruturas.";

  return (
    <section
      style={{
        ...card,
        ...(compacto ? cardCompacto : null),
        ...(mobile ? cardMobile : null),
      }}
    >
      <div style={{ ...topo, ...(mobile ? topoMobile : null) }}>
        <div>
          <span style={eyebrow}>{rotuloOrigem}</span>
          <h2 style={{ ...titulo, ...(compacto ? tituloCompacto : null) }}>
            {lamina.titulo}
          </h2>
          <p style={subtitulo}>{lamina.subtitulo}</p>
        </div>
        {!leituraAtlas ? (
          <div style={{ ...topoStatus, ...(mobile ? topoStatusMobile : null) }}>
            {editadaNoAtlas ? <span style={seloEdicao}>Editada no atlas</span> : null}
            <span style={status}>{lamina.status}</span>
          </div>
        ) : null}
      </div>

      <div
        style={{
          ...layout,
          ...(compacto ? layoutCompacto : null),
          ...(mobile ? layoutMobile : null),
        }}
      >
        <div style={imagemColuna}>
          <div
            style={{
              ...imagemBox,
              ...(compacto ? imagemBoxCompacto : null),
              ...(mobile ? imagemBoxMobile : null),
            }}
          >
            <FotoAnotadaImagem
              foto={lamina.foto || lamina.imagemAnotada || lamina.imagemBase}
              alt={lamina.titulo}
              setas={lamina.setas || []}
              placeholder={placeholderImagem}
              containerStyle={{
                ...imagemContainer,
                ...(compacto ? imagemContainerCompacto : null),
                ...(mobile ? imagemContainerMobile : null),
              }}
              frameStyle={{
                ...imagemFrame,
                ...(compacto ? imagemFrameCompacto : null),
                ...(mobile ? imagemFrameMobile : null),
              }}
              imagemStyle={{
                ...imagem,
                ...(compacto ? imagemCompacta : null),
                ...(mobile ? imagemMobile : null),
              }}
            />
          </div>

          <div
            style={{
              ...metadadosGrid,
              ...(compacto ? metadadosGridCompacto : null),
              ...(mobile ? metadadosGridMobile : null),
            }}
          >
            <Meta label="Aumento" value={lamina.metadados?.aumento} />
            <Meta label="Coloração" value={lamina.metadados?.coloracao} />
            <Meta label="Origem" value={lamina.metadados?.origem} />
          </div>
        </div>

        <aside
          style={{
            ...painel,
            ...(compacto ? painelCompacto : null),
            ...(mobile ? painelMobile : null),
            ...(leituraAtlas ? painelAtlas : null),
          }}
        >
          <div style={secao}>
            <span style={secaoRotulo}>
              {leituraAtlas ? "Leitura principal" : "Leitura diagnóstica"}
            </span>
            <div style={textoBox}>
              <strong style={textoTitulo}>
                {estruturaAtiva?.nome || "Estrutura"}
              </strong>
              <p style={textoCurto}>
                {estruturaAtiva?.descricaoCurta || "Sem descrição curta."}
              </p>
              <p style={textoLongo}>
                {estruturaAtiva?.descricaoAmpliada || "Sem descrição ampliada."}
              </p>
            </div>
          </div>

          {leituraAtlas ? (
            <details style={detalhesRecolhidos}>
              <summary style={detalhesResumo}>Mais informações</summary>
              <div style={detalhesConteudo}>
                <div style={secao}>
                  <span style={secaoRotulo}>Observação técnica</span>
                  <div style={textoBox}>
                    <p style={textoLongo}>
                      {lamina.metadados?.observacoesTecnicas || "Sem observações técnicas."}
                    </p>
                  </div>
                </div>

                <div style={secao}>
                  <span style={secaoRotulo}>Comparar depois</span>
                  <div style={relacoesLista}>
                    {slidesRelacionados.length ? (
                      slidesRelacionados.map((item) => (
                        <span key={item.id} style={relacaoChip}>
                          {item.titulo}
                        </span>
                      ))
                    ) : (
                      <span style={relacaoVazio}>Sem relações cadastradas ainda.</span>
                    )}
                  </div>
                </div>
              </div>
            </details>
          ) : (
            <>
              <div style={secao}>
                <span style={secaoRotulo}>Observação técnica</span>
                <div style={textoBox}>
                  <p style={textoLongo}>
                    {lamina.metadados?.observacoesTecnicas || "Sem observações técnicas."}
                  </p>
                </div>
              </div>

              <div style={secao}>
                <span style={secaoRotulo}>Comparar depois</span>
                <div style={relacoesLista}>
                  {slidesRelacionados.length ? (
                    slidesRelacionados.map((item) => (
                      <span key={item.id} style={relacaoChip}>
                        {item.titulo}
                      </span>
                    ))
                  ) : (
                    <span style={relacaoVazio}>Sem relações cadastradas ainda.</span>
                  )}
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

function Meta({ label, value }) {
  return (
    <div style={metaCard}>
      <span style={metaLabel}>{label}</span>
      <strong style={metaValue}>{value || "—"}</strong>
    </div>
  );
}

const card = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 16,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const cardCompacto = {
  gap: 12,
  padding: 14,
};

const cardMobile = {
  padding: 14,
};

const topo = {
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};

const topoMobile = {
  display: "grid",
};

const topoStatus = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

const topoStatusMobile = {
  justifyContent: "flex-start",
};

const eyebrow = {
  color: "var(--color-secondary)",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const titulo = {
  margin: "2px 0 0",
  fontSize: 24,
  lineHeight: 1.1,
};

const tituloCompacto = {
  fontSize: 18,
};

const subtitulo = {
  margin: "6px 0 0",
  color: "var(--color-muted)",
  lineHeight: 1.45,
};

const status = {
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const seloEdicao = {
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid color-mix(in srgb, var(--color-secondary) 35%, transparent)",
  background: "color-mix(in srgb, var(--color-secondary) 12%, white)",
  color: "var(--color-secondary)",
  fontSize: 11,
  fontWeight: 900,
};

const layout = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.15fr) minmax(280px, 360px)",
  gap: 14,
};

const layoutCompacto = {
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: 14,
};

const layoutMobile = {
  gridTemplateColumns: "minmax(0, 1fr)",
};

const imagemColuna = {
  display: "grid",
  gap: 12,
  minWidth: 0,
};

const imagemBox = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
};

const imagemBoxCompacto = {
  padding: 12,
};

const imagemBoxMobile = {
  overflow: "hidden",
};

const imagemContainer = {
  width: "100%",
};

const imagemContainerCompacto = {
  display: "grid",
  placeItems: "center",
};

const imagemContainerMobile = {
  display: "grid",
  placeItems: "center",
};

const imagemFrame = {
  maxWidth: "100%",
  width: "fit-content",
  margin: "0 auto",
};

const imagemFrameCompacto = {
  width: "fit-content",
  maxWidth: "100%",
  margin: "0 auto",
};

const imagemFrameMobile = {
  width: "fit-content",
  maxWidth: "100%",
  margin: "0 auto",
};

const imagem = {
  width: "auto",
  height: "auto",
  maxWidth: "100%",
  maxHeight: 680,
  objectFit: "contain",
};

const imagemCompacta = {
  width: "auto",
  maxWidth: "100%",
  maxHeight: 420,
  margin: "0 auto",
};

const imagemMobile = {
  maxHeight: 240,
};

const metadadosGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: 8,
};

const metadadosGridCompacto = {
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
};

const metadadosGridMobile = {
  gridTemplateColumns: "minmax(0, 1fr)",
};

const metaCard = {
  display: "grid",
  gap: 4,
  padding: 10,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const metaLabel = {
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 800,
  textTransform: "uppercase",
};

const metaValue = {
  fontSize: 14,
};

const painel = {
  display: "grid",
  gap: 12,
  minWidth: 0,
};

const painelCompacto = {
  gap: 10,
};

const painelMobile = {
  minWidth: 0,
};

const painelAtlas = {
  gap: 10,
};

const secao = {
  display: "grid",
  gap: 8,
  padding: 12,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const secaoRotulo = {
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const textoBox = {
  display: "grid",
  gap: 6,
};

const textoTitulo = {
  fontSize: 16,
};

const textoCurto = {
  margin: 0,
  fontWeight: 700,
  lineHeight: 1.4,
};

const textoLongo = {
  margin: 0,
  color: "var(--color-muted)",
  lineHeight: 1.5,
};

const relacoesLista = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
};

const relacaoChip = {
  padding: "6px 9px",
  borderRadius: 999,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  fontSize: 12,
  color: "var(--color-muted)",
};

const relacaoVazio = {
  color: "var(--color-muted)",
  fontSize: 12,
};

const detalhesRecolhidos = {
  display: "grid",
  gap: 10,
  padding: 12,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};

const detalhesResumo = {
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 800,
  color: "var(--color-muted)",
};

const detalhesConteudo = {
  display: "grid",
  gap: 10,
};
