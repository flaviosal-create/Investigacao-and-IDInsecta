const educationLabels = {
  ensino_medio: "ensino médio",
  licenciatura: "ensino superior — Licenciatura",
  bacharelado: "ensino superior — Bacharelado",
};

export function createAiBriefDraft() {
  return {
    subject: "",
    taxonomicScope: "",
    educationLevel: "ensino_medio",
    curricularContext: "",
  };
}

export function buildProtocolAiPrompt(brief) {
  const level = educationLabels[brief.educationLevel] ?? brief.educationLevel;
  const context = brief.curricularContext?.trim()
    ? `Contexto adicional da turma: ${brief.curricularContext.trim()}`
    : "Contexto adicional da turma: não informado.";

  return `Você é coautor científico-pedagógico de um protocolo para o LABSED Investigação.

Tarefa: propor um protocolo investigativo para o tema “${brief.subject.trim() || "[tema a informar]"}”.
Recorte taxonômico ou conceitual exigido: “${brief.taxonomicScope.trim() || "[recorte a informar]"}”.
Nível de ensino: ${level}.
${context}

Princípio inegociável do LABSED: o protocolo não é uma chave dicotômica e não deve identificar automaticamente uma amostra. Ele organiza observações para comparar hipóteses dentro de um recorte explícito. Uma observação que não sustenta uma hipótese não a invalida automaticamente; contraevidências só podem ser usadas quando houver justificativa científica ou didática explícita.

Construa o protocolo com estes critérios:
1. Declare claramente o que o protocolo compara e o que fica fora do recorte. Não apresente a classificação como verdade final nem force uma sequência de decisões.
2. Formule ao menos duas hipóteses comparáveis. Para cada hipótese, forneça sustentação positiva em pelo menos três estruturas observáveis independentes.
3. Use características adequadas ao nível indicado. Para ensino médio, prefira observações acessíveis e vocabulário progressivo; para Licenciatura, explicite implicações didáticas e conceituais; para Bacharelado, incorpore precisão morfofuncional, desenvolvimento, filogenia ou variação relevante quando apropriado.
4. Não transforme ausência de um caráter em exclusão automática. Evite regras negativas; se alguma for indispensável, use-a apenas como “negative” e escreva uma justificativa científica ou didática específica.
5. A conclusão só poderá ocorrer após três estruturas observadas e três evidências favoráveis. Inclua também sugestões discriminativas e revisão diante de conflito.
6. Registre no mínimo três referências confiáveis e específicas. Priorize livros-texto, revisões ou fontes institucionais/primárias; não invente referências.
7. Crie pelo menos dois casos de calibração: um representativo que possa chegar a “concluida” com três ou mais evidências convergentes e outro incompleto ou misto que permaneça “em_andamento”, “em_disputa” ou “em_revisao”.
8. Use valores observáveis, sem usar rótulos de hipótese como se fossem observações. Quando houver variação biológica importante, apresente-a como variação sustentadora ou limite do recorte.

Devolva somente um JSON válido, sem Markdown, seguindo exatamente este contrato:
{
  "id": "slug-do-protocolo-v1",
  "name": "Nome do protocolo",
  "domain": "zoologia|botanica|histologia",
  "description": "recorte, propósito e limites",
  "pedagogicalNote": "texto explícito dizendo que o protocolo sustenta hipóteses e não é chave dicotômica",
  "references": ["Referência 1", "Referência 2", "Referência 3"],
  "generateNegativeRules": false,
  "investigationPolicy": {
    "minimumObservedStructuresForConclusion": 3,
    "minimumSupportingStructuresForConclusion": 3,
    "preferDiscriminativeSuggestion": true,
    "requireNoLeaderConflictsForConclusion": true
  },
  "observations": [
    {"structure": "estrutura_slug", "label": "Estrutura observável", "values": ["valor_a", "valor_b"]}
  ],
  "hypotheses": [
    {"id": "hipotese_slug", "name": "Nome", "clue": "pista interpretativa opcional"}
  ],
  "rules": [
    {"hypothesis": "hipotese_slug", "structure": "estrutura_slug", "value": "valor_a", "effect": "positive", "weight": 3, "justification": ""}
  ],
  "calibrationCases": [
    {
      "id": "caso_representativo",
      "label": "Caso representativo",
      "purpose": "o que deve ser verificado",
      "expectedConclusion": "concluida",
      "observations": [["estrutura_slug", "valor_a"]]
    },
    {
      "id": "caso_incompleto",
      "label": "Caso incompleto ou misto",
      "purpose": "por que a investigação deve permanecer aberta",
      "expectedConclusion": "em_andamento",
      "observations": [["estrutura_slug", "valor_a"]]
    }
  ]
}

Antes de devolver o JSON, confira internamente se cada hipótese possui três estruturas favoráveis, se as referências são reais, se os valores usados nos casos existem em observations e se o recorte não se tornou uma chave dicotômica.

Responda agora somente com o JSON válido solicitado, sem comentários, explicações ou blocos Markdown.`;
}

export function buildProtocolRevisionPrompt({
  protocol,
  validationErrors = [],
  calibrationResults = [],
}) {
  const calibrationIssues = calibrationResults.filter(
    (result) => !result.matchesExpectation
  );

  return `Você é revisor científico-pedagógico de um protocolo do LABSED Investigação. Revise o JSON abaixo e devolva uma nova versão completa do JSON, pronta para nova importação.

O LABSED não é uma chave dicotômica: o protocolo deve acumular evidências para comparar hipóteses, sem identificação automática. Não use a simples ausência de um caráter como exclusão. Contraevidências, se estritamente necessárias, exigem justificativa científica ou didática explícita.

Revise obrigatoriamente:
1. O recorte taxonômico/conceitual: declare limites, táxons incluídos e excluídos e atualize nomes ou relações filogenéticas quando necessário.
2. A independência das evidências: não conte duas vezes o mesmo caráter sob rótulos diferentes. “Não observado”, “variável” ou “não avaliado” não devem ser valores de uma observação; ausência de dado significa deixar a estrutura sem registro.
3. A adequação ao nível de ensino, a acessibilidade real das observações e a variação biológica dentro de cada hipótese.
4. As referências: mantenha apenas referências reais, específicas, completas e verificáveis; inclua fonte brasileira/institucional quando o recorte depender de ocorrência no Brasil.
5. Os casos de calibração: um caso representativo deve concluir somente por três ou mais evidências convergentes; um caso incompleto ou misto deve permanecer aberto. Não altere apenas o estado esperado para “fazer o teste passar”; ajuste a finalidade, observações ou regras de acordo com o objetivo didático.
6. Mantenha generateNegativeRules como false e a política de três estruturas observadas/favoráveis.

Impedimentos apontados pelo validador:
${validationErrors.length ? validationErrors.map((item) => `- ${item}`).join("\n") : "- Nenhum impedimento estrutural."}

Resultados de calibração que não conferem com o esperado:
${calibrationIssues.length ? calibrationIssues.map((item) => `- ${item.label}: esperado ${item.expectedConclusion}; obtido ${item.actualConclusion}; hipótese líder ${item.leaderName ?? "sem liderança"}.`).join("\n") : "- Nenhuma divergência automática encontrada."}

JSON a revisar:
${JSON.stringify(protocol, null, 2)}

Responda somente com o JSON completo e válido, sem Markdown, comentários ou explicações.`;
}
