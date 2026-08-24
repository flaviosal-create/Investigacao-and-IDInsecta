import ChaveBase from "../components/ChaveBase.jsx";
import PainelExportar, {
  AssinaturaLabsed,
} from "./GeradorChavesExportar.jsx";
import { PainelComparacao, PainelValidacao } from "./GeradorChavesAnalysis.jsx";
import EditorNode from "./GeradorChavesEditor.jsx";
import ConstrutorGuiado from "./GeradorChavesGuided.jsx";
import EditorImagens from "./GeradorChavesImagens.jsx";
import ImportadorTexto from "./GeradorChavesImportador.jsx";
import EditorLogo, { LogoPreview } from "./GeradorChavesLogo.jsx";
import GeradorSidePanel from "./GeradorChavesSidePanel.jsx";
import { manualGeradorChaves } from "./manualGeradorChaves.js";
import { useGeradorChavesState } from "./useGeradorChavesState.js";
import {
  textoImportacaoExemplo,
} from "./geradorChavesModel.js";

export default function GeradorChaves({
  chaveComparacao = null,
  comparacaoTitulo = "Chave proposta pelo aplicativo",
  descricao = "Monte perguntas, alternativas, imagens e resultados usando o mesmo modelo visual das chaves do aplicativo.",
  eyebrowLabel = "Gerador de chaves",
  onAnexarChave,
  onBack,
  permiteAnexar = true,
  permiteExportarJson = false,
  titulo = "Construtor de chave dicotômica",
}) {
  const {
    aba,
    abasDisponiveis,
    chave,
    chaveGerada,
    idsImagem,
    mensagem,
    nodeAtual,
    nodeIndex,
    problemas,
    problemasImportacao,
    setAba,
    setNodeIndex,
    setProblemasImportacao,
    setTextoImportacao,
    textoImportacao,
    atualizarAlternativa,
    atualizarCampo,
    atualizarExplicacao,
    atualizarLogo,
    atualizarNode,
    adicionarNode,
    anexarAoAplicativo,
    baixarJson,
    baixarModeloTexto,
    carregarArquivoTexto,
    carregarLogoArquivo,
    continuarPorAlternativa,
    copiarJson,
    extrairChaveDoTextoBruto,
    importarTextoFormatado,
    limparRascunho,
    navegarNode,
    removerLogo,
    removerNode,
    salvarRascunho,
  } = useGeradorChavesState({
    chaveComparacao,
    onAnexarChave,
    permiteAnexar,
    permiteExportarJson,
  });

  return (
    <div style={page}>
      <GeradorHeader
        eyebrowLabel={eyebrowLabel}
        titulo={titulo}
        descricao={descricao}
        onBack={onBack}
        onSalvarRascunho={salvarRascunho}
        permiteAnexar={permiteAnexar}
        onAnexar={anexarAoAplicativo}
        chaveComparacao={chaveComparacao}
        onComparar={() => setAba("comparacao")}
        permiteExportarJson={permiteExportarJson}
        onExportarJson={baixarJson}
      />

      {mensagem ? <div style={notice}>{mensagem}</div> : null}

      {permiteAnexar ? (
        <div style={noticeInfo}>
          A chave anexada fica salva apenas neste navegador/equipamento e poderá ser usada como chave pessoal.
        </div>
      ) : null}

      <details style={manualCard}>
        <summary style={manualSummary}>Manual de uso do gerador</summary>
        <div style={manualText}>{manualGeradorChaves}</div>
      </details>

      <GeradorTabs abasDisponiveis={abasDisponiveis} aba={aba} onSelect={setAba} />

      <main className="gerador-grid" style={grid}>
        <GeradorSidePanel
          chave={chave}
          nodeAtual={nodeAtual}
          nodeIndex={nodeIndex}
          problemas={problemas}
          onAtualizarCampo={atualizarCampo}
          onSelecionarNode={setNodeIndex}
          onAdicionarNode={adicionarNode}
        />

        <section className="gerador-work-panel" style={workPanel}>
          {aba === "importar" ? (
            <ImportadorTexto
              texto={textoImportacao}
              problemas={problemasImportacao}
              onChange={setTextoImportacao}
              onExtractKey={extrairChaveDoTextoBruto}
              onFileChange={carregarArquivoTexto}
              onImport={importarTextoFormatado}
              onDownloadModel={baixarModeloTexto}
              onUseExample={() => {
                setTextoImportacao(textoImportacaoExemplo);
                setProblemasImportacao([]);
              }}
            />
          ) : null}

          {aba === "guiado" && nodeAtual ? (
            <ConstrutorGuiado
              canRemove={chave.nodes.length > 1}
              node={nodeAtual}
              nodeIndex={nodeIndex}
              nodes={chave.nodes}
              onChoiceChange={atualizarAlternativa}
              onContinue={continuarPorAlternativa}
              onExplanationChange={atualizarExplicacao}
              onNavigate={navegarNode}
              onNodeChange={atualizarNode}
              onPreview={() => setAba("preview")}
              onRemove={removerNode}
              onValidate={() => setAba("validacao")}
              problemas={problemas}
              totalNodes={chave.nodes.length}
            />
          ) : null}

          {aba === "editor" && nodeAtual ? (
            <EditorNode
              node={nodeAtual}
              nodes={chave.nodes}
              onNodeChange={atualizarNode}
              onChoiceChange={atualizarAlternativa}
              onExplanationChange={atualizarExplicacao}
              onRemove={removerNode}
              canRemove={chave.nodes.length > 1}
            />
          ) : null}

          {aba === "imagens" && nodeAtual ? (
            <EditorImagens
              idsImagem={idsImagem}
              node={nodeAtual}
              onChoiceChange={atualizarAlternativa}
            />
          ) : null}

          {aba === "logo" ? (
            <EditorLogo
              logo={chave.logo || {}}
              onLogoChange={atualizarLogo}
              onFileChange={carregarLogoArquivo}
              onRemove={removerLogo}
            />
          ) : null}

          {aba === "validacao" ? (
            <PainelValidacao problemas={problemas} chave={chaveGerada} />
          ) : null}

          {aba === "preview" ? (
            <div style={previewShell}>
              <AssinaturaLabsed />
              <LogoPreview logo={chaveGerada.logo} />
              <ChaveBase
                key={JSON.stringify(chaveGerada)}
                titulo={chaveGerada.titulo}
                nodes={chaveGerada.nodes}
                startId={chaveGerada.startId}
                mode="pratica"
                onBack={() => setAba("editor")}
                onTerminal={() => {}}
              />
            </div>
          ) : null}

          {aba === "comparacao" && chaveComparacao ? (
            <PainelComparacao
              chaveAluno={chaveGerada}
              chaveModelo={chaveComparacao}
              comparacaoTitulo={comparacaoTitulo}
              problemas={problemas}
              onValidate={() => setAba("validacao")}
            />
          ) : null}

          {aba === "exportar" && permiteExportarJson ? (
            <PainelExportar
              chaveGerada={chaveGerada}
              problemas={problemas}
              onAttach={anexarAoAplicativo}
              onCopy={copiarJson}
              onDownload={baixarJson}
              onReset={limparRascunho}
            />
          ) : null}
        </section>
      </main>
    </div>
  );
}

function GeradorHeader({
  eyebrowLabel,
  titulo,
  descricao,
  onBack,
  onSalvarRascunho,
  permiteAnexar,
  onAnexar,
  chaveComparacao,
  onComparar,
  permiteExportarJson,
  onExportarJson,
}) {
  return (
    <header className="gerador-header" style={header}>
      <div>
        <div style={eyebrow}>{eyebrowLabel}</div>
        <h1 style={title}>{titulo}</h1>
        <p style={subtitle}>{descricao}</p>
      </div>

      <div className="gerador-header-actions" style={headerActions}>
        <button className="btn btn--secondary btn--compact" onClick={onBack}>
          Voltar
        </button>
        <button className="btn btn--secondary btn--compact" onClick={onSalvarRascunho}>
          Salvar rascunho
        </button>
        {permiteAnexar ? (
          <button className="btn btn--primary btn--compact" onClick={onAnexar}>
            Anexar ao meu app neste dispositivo
          </button>
        ) : null}
        {chaveComparacao ? (
          <button
            className="btn btn--primary btn--compact"
            onClick={onComparar}
            type="button"
          >
            Comparar chave
          </button>
        ) : null}
        {permiteExportarJson ? (
          <button className="btn btn--success btn--compact" onClick={onExportarJson}>
            Exportar JSON
          </button>
        ) : null}
      </div>
    </header>
  );
}

function GeradorTabs({ abasDisponiveis, aba, onSelect }) {
  return (
    <div className="gerador-tabs" style={tabs} role="tablist" aria-label="Áreas do gerador">
      {abasDisponiveis.map(([id, label]) => (
        <button
          key={id}
          type="button"
          style={aba === id ? tabActive : tab}
          onClick={() => onSelect(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

const page = {
  maxWidth: 1080,
  margin: "0 auto",
  padding: "8px 10px 28px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 14,
  padding: "18px 18px 16px",
  borderRadius: 20,
  background: "color-mix(in srgb, var(--color-surface) 94%, transparent)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
  boxShadow: "var(--shadow-lg)",
};

const eyebrow = {
  color: "var(--color-secondary)",
  fontSize: 12,
  fontWeight: 900,
  textTransform: "uppercase",
};

const title = {
  margin: "4px 0",
  fontSize: "clamp(23px, 4vw, 32px)",
  lineHeight: 1.08,
  fontWeight: 850,
};

const subtitle = {
  margin: 0,
  maxWidth: 560,
  color: "var(--color-muted)",
  fontSize: 13.5,
  lineHeight: 1.35,
};

const headerActions = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  gap: 8,
};

const notice = {
  marginTop: 12,
  padding: "10px 12px",
  borderRadius: 12,
  background: "var(--color-success-soft)",
  border: "1px solid var(--color-success-border)",
  color: "var(--color-success-text)",
  fontWeight: 750,
};

const noticeInfo = {
  marginTop: 12,
  padding: "10px 12px",
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.45,
};

const manualCard = {
  marginTop: 12,
  padding: "10px 12px",
  borderRadius: 14,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-sm)",
};

const manualSummary = {
  cursor: "pointer",
  color: "var(--color-primary)",
  fontWeight: 900,
};

const manualText = {
  marginTop: 10,
  color: "var(--color-muted)",
  fontSize: 13.5,
  lineHeight: 1.52,
  whiteSpace: "pre-wrap",
};

const tabs = {
  display: "flex",
  flexWrap: "nowrap",
  gap: 8,
  marginTop: 12,
  overflowX: "auto",
  padding: "8px",
  borderRadius: 16,
  background: "color-mix(in srgb, var(--color-surface) 88%, transparent)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-sm)",
};

const tab = {
  flex: "0 0 auto",
  minHeight: 40,
  padding: "8px 13px",
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
  color: "var(--color-text)",
  fontWeight: 800,
  cursor: "pointer",
};

const tabActive = {
  ...tab,
  background: "var(--color-primary)",
  color: "var(--color-hero-text)",
  borderColor: "var(--color-primary)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "280px minmax(0, 1fr)",
  gap: 12,
  marginTop: 12,
};

const workPanel = {
  minWidth: 0,
  padding: 16,
  borderRadius: 18,
  background: "color-mix(in srgb, var(--color-surface) 94%, transparent)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-md)",
};

const previewShell = {
  borderRadius: 14,
  overflow: "hidden",
};
