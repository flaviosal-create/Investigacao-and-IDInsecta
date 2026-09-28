import { InsightCard } from "./ui/InsightCard.jsx";

const studentSteps = [
  "Observe uma estrutura que esteja visível na amostra.",
  "Registre apenas o que pode ser sustentado pela observação.",
  "Compare as hipóteses antes de tratar a líder como conclusão.",
  "Revise observações quando uma evidência parecer frágil ou conflitante.",
  "Encerre a investigação somente quando conseguir justificar a decisão.",
];

const teacherSteps = [
  "Pergunte quais evidências sustentam a hipótese atual.",
  "Discuta hipóteses concorrentes antes de validar uma resposta.",
  "Use conflitos e empates como oportunidades de argumentação.",
  "Carregue casos de calibração para revisar o comportamento do protocolo.",
  "Leia o relatório como registro do raciocínio, não apenas do resultado.",
];

const conceptPairs = [
  {
    term: "Observação",
    description: "Característica registrada diretamente na amostra.",
  },
  {
    term: "Evidência",
    description: "Observação interpretada dentro das regras do protocolo.",
  },
  {
    term: "Hipótese",
    description: "Possível explicação para o conjunto de evidências.",
  },
  {
    term: "Conclusão",
    description: "Decisão argumentada sobre a suficiência das evidências.",
  },
];

export function InvestigationGuidancePanel() {
  return (
    <div className="guidance-grid">
      <InsightCard title="Guia do estudante">
        <ol className="guidance-list">
          {studentSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </InsightCard>

      <InsightCard title="Guia do professor">
        <ol className="guidance-list">
          {teacherSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </InsightCard>

      <InsightCard title="Vocabulário investigativo">
        <dl className="concept-definition-list">
          {conceptPairs.map((item) => (
            <div key={item.term}>
              <dt>{item.term}</dt>
              <dd>{item.description}</dd>
            </div>
          ))}
        </dl>
      </InsightCard>

      <InsightCard title="Diferença entre os modos">
        <div className="mode-comparison">
          <div>
            <span className="page-kicker">Chave</span>
            <strong>Caminho por decisão</strong>
            <p>
              Organiza perguntas sucessivas e conduz a um resultado dentro
              de uma trilha de identificação.
            </p>
          </div>
          <div>
            <span className="page-kicker">Investigação</span>
            <strong>Sustentação por evidências</strong>
            <p>
              Mantém hipóteses concorrentes, interpreta conflitos e deixa
              o encerramento como decisão consciente.
            </p>
          </div>
        </div>
      </InsightCard>
    </div>
  );
}
