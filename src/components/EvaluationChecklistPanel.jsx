import { InsightCard } from "./ui/InsightCard.jsx";

const productChecks = [
  "A chave e a investigação são reconhecidas como modalidades diferentes.",
  "Os estudantes distinguem observação, interpretação, hipótese e conclusão.",
  "Os relatórios relacionam características observadas e hipóteses.",
  "A interface permite revisar observações e não força conclusão insuficiente.",
  "Professores conseguem usar relatórios e casos de calibração para mediação.",
  "O sistema apresenta estabilidade, acessibilidade básica e documentação.",
];

const studentQuestions = [
  "Consegui entender o que deveria observar?",
  "As imagens e descrições ajudaram a reconhecer as características?",
  "Entendi por que uma hipótese ficou mais forte ou enfraquecida?",
  "Percebi quando as evidências ainda eram insuficientes?",
  "O relatório me ajudou a explicar minha conclusão?",
];

const teacherQuestions = [
  "O app favorece discussão sobre evidências, e não apenas resposta final?",
  "A linguagem está adequada ao público pretendido?",
  "As características escolhidas são observáveis no material didático?",
  "Os casos de calibração ajudam a revisar o protocolo?",
  "O produto é viável em contexto de conectividade variável?",
];

const reportRubric = [
  {
    dimension: "Observação",
    expectation: "Registra características visíveis com vocabulário adequado.",
  },
  {
    dimension: "Evidência",
    expectation: "Relaciona observações a hipóteses e conflitos.",
  },
  {
    dimension: "Comparação",
    expectation: "Compara líder, concorrentes, empates e margem.",
  },
  {
    dimension: "Incerteza",
    expectation: "Reconhece insuficiência e busca nova evidência.",
  },
  {
    dimension: "Conclusão",
    expectation: "Justifica a decisão com evidências, conflitos e limites.",
  },
];

export function EvaluationChecklistPanel() {
  return (
    <div className="evaluation-grid">
      <InsightCard title="Indicadores do projeto">
        <Checklist items={productChecks} />
      </InsightCard>

      <InsightCard title="Perguntas ao estudante">
        <Checklist items={studentQuestions} />
      </InsightCard>

      <InsightCard title="Perguntas ao professor">
        <Checklist items={teacherQuestions} />
      </InsightCard>

      <InsightCard title="Rubrica do relatório">
        <dl className="rubric-list">
          {reportRubric.map((item) => (
            <div key={item.dimension}>
              <dt>{item.dimension}</dt>
              <dd>{item.expectation}</dd>
            </div>
          ))}
        </dl>
      </InsightCard>
    </div>
  );
}

function Checklist({ items }) {
  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>
          <span aria-hidden="true" />
          <p>{item}</p>
        </li>
      ))}
    </ul>
  );
}
