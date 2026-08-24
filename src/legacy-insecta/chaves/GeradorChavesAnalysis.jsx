import {
  sectionSubtitle,
  sectionTitle,
  subsectionTitle,
  twoColumns,
} from "./GeradorChavesStyles.js";

export function PainelValidacao({ chave, problemas }) {
  const resumo = resumirChave(chave);

  return (
    <div>
      <h2 style={sectionTitle}>Validação da chave</h2>
      <p style={sectionSubtitle}>
        A validação confere nós, destinos e IDs de imagem antes de usar a chave.
      </p>

      <div style={problemas.length ? errorBox : okBox}>
        {problemas.length
          ? `${problemas.length} ponto(s) precisam de revisão.`
          : "Chave válida para prévia e uso no aplicativo."}
      </div>

      {problemas.length ? (
        <ul style={problemList}>
          {problemas.map((problema) => (
            <li key={problema}>{problema}</li>
          ))}
        </ul>
      ) : null}

      <div style={summaryBox}>
        <strong>{resumo.titulo}</strong>
        <div>Nó inicial: {resumo.startId || "não definido"}</div>
        <div>Nós: {resumo.totalNos}</div>
        <div>Resultados finais: {resumo.resultados.length || 0}</div>
      </div>
    </div>
  );
}

export function PainelComparacao({
  chaveAluno,
  chaveModelo,
  comparacaoTitulo,
  onValidate,
  problemas,
}) {
  const aluno = resumirChave(chaveAluno);
  const modelo = resumirChave(chaveModelo);
  const resultadosAluno = new Set(aluno.resultados);
  const resultadosEmComum = modelo.resultados.filter((resultado) =>
    resultadosAluno.has(resultado)
  );

  return (
    <div>
      <h2 style={sectionTitle}>Comparação e reflexão</h2>
      <p style={sectionSubtitle}>
        Use esta etapa para comparar a chave criada pelo estudante com a chave de
        artrópodes proposta pelo aplicativo. A chave do aluno não é anexada ao
        app nesta atividade.
      </p>

      <div className="gerador-two-columns" style={twoColumns}>
        <ResumoChave titulo="Chave do estudante" resumo={aluno} />
        <ResumoChave titulo={comparacaoTitulo} resumo={modelo} />
      </div>

      <div style={reflectionBox}>
        <strong>Pontos para avaliação</strong>
        <ul style={reflectionList}>
          <li>Quais caracteres o estudante escolheu primeiro e por quê?</li>
          <li>As alternativas usam estruturas observáveis, como patas, antenas, asas ou divisão corporal?</li>
          <li>Os grupos finais aparecem de forma coerente em relação à chave proposta pelo aplicativo?</li>
          <li>Há caminhos ambíguos, sobrepostos ou difíceis de testar com os exemplares disponíveis?</li>
        </ul>
      </div>

      <div style={resultBox}>
        <strong>Resultados em comum</strong>
        <div>
          {resultadosEmComum.length
            ? resultadosEmComum.join(", ")
            : "Nenhum resultado final com o mesmo nome foi encontrado. Isso pode ser aceitável se a atividade usou outros grupos ou nomes definidos pelo professor."}
        </div>
      </div>

      <button className="btn btn--secondary" type="button" onClick={onValidate}>
        Revisar validação
        {problemas.length ? ` (${problemas.length})` : ""}
      </button>
    </div>
  );
}

function ResumoChave({ resumo, titulo }) {
  return (
    <section style={comparisonCard}>
      <h3 style={subsectionTitle}>{titulo}</h3>
      <div style={comparisonMeta}>Título: {resumo.titulo}</div>
      <div style={comparisonMeta}>Nó inicial: {resumo.startId || "não definido"}</div>
      <div style={comparisonMeta}>Nós: {resumo.totalNos}</div>
      <div style={comparisonMeta}>Resultados finais: {resumo.resultados.length}</div>
      <div style={comparisonResults}>
        {resumo.resultados.length ? resumo.resultados.join(", ") : "Sem resultados finais"}
      </div>
    </section>
  );
}

function resumirChave(chave) {
  const nodes = Object.values(chave?.nodes || {});
  const resultados = new Set();

  nodes.forEach((node) => {
    ["a", "b"].forEach((lado) => {
      const resultado = String(node?.[lado]?.result || "").trim();
      if (resultado) resultados.add(resultado);
    });
  });

  return {
    titulo: chave?.titulo || "Chave sem título",
    startId: chave?.startId || "",
    totalNos: nodes.length,
    resultados: [...resultados].sort((a, b) => a.localeCompare(b)),
  };
}

const comparisonCard = {
  padding: 13,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
  boxShadow: "var(--shadow-sm)",
};

const comparisonMeta = {
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.45,
};

const comparisonResults = {
  marginTop: 10,
  lineHeight: 1.45,
  fontWeight: 750,
};

const reflectionBox = {
  marginTop: 12,
  padding: 13,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "color-mix(in srgb, var(--color-info-soft) 62%, var(--color-surface))",
};

const reflectionList = {
  margin: "10px 0 0",
  lineHeight: 1.5,
};

const resultBox = {
  display: "grid",
  gap: 6,
  margin: "12px 0",
  padding: 13,
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  lineHeight: 1.45,
};

const okBox = {
  padding: 12,
  borderRadius: 12,
  background: "var(--color-success-soft)",
  border: "1px solid var(--color-success-border)",
  color: "var(--color-success-text)",
  fontWeight: 850,
};

const errorBox = {
  ...okBox,
  background: "var(--color-warning-soft)",
  borderColor: "var(--color-warning-border)",
  color: "var(--color-warning-text)",
};

const problemList = {
  marginTop: 12,
  color: "var(--color-warning-text)",
  lineHeight: 1.45,
};

const summaryBox = {
  marginTop: 12,
  padding: 12,
  borderRadius: 12,
  background: "var(--color-text)",
  color: "var(--color-bg)",
  overflow: "auto",
  maxHeight: 420,
};
