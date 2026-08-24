import test from "node:test";
import assert from "node:assert/strict";

import {
  createProtocolDraft,
  hydrateProtocolDraft,
  toProtocolJson,
  validateProtocolDraft,
} from "../src/utils/protocolAuthoring.js";
import {
  buildProtocolAiPrompt,
  buildProtocolRevisionPrompt,
} from "../src/utils/protocolAiBrief.js";

test(
  "rascunho inicial sinaliza campos e comparacao ausentes",
  () => {
    const result = validateProtocolDraft(
      createProtocolDraft()
    );

    assert.ok(
      result.errors.includes(
        "Inclua ao menos duas hipóteses para permitir comparação."
      )
    );
    assert.ok(
      result.errors.includes(
        "Inclua ao menos três estruturas observáveis independentes."
      )
    );
  }
);

test(
  "exporta o rascunho como JSON legível",
  () => {
    const draft = createProtocolDraft();
    const json = toProtocolJson(draft);

    assert.deepEqual(JSON.parse(json), draft);
    assert.match(json, /\n  "id"/);
  }
);

test(
  "validador encontra regras e hipóteses inválidas",
  () => {
    const result = validateProtocolDraft({
      id: "teste-v1",
      name: "Teste",
      domain: "zoologia",
      description: "",
      hypotheses: [
        { id: "a", name: "A" },
        { id: "b", name: "B" },
      ],
      observations: [
        {
          structure: "asa",
          label: "Asa",
          values: ["elitro", "membranosa"],
        },
      ],
      rules: [
        {
          hypothesis: "inexistente",
          structure: "asa",
          value: "invalido",
          effect: "positive",
          weight: 3,
        },
      ],
    });

    assert.ok(
      result.errors.includes(
        "Uma regra aponta para hipótese inexistente."
      )
    );
    assert.ok(
      result.errors.includes(
        "Uma regra aponta para valor inexistente."
      )
    );
  }
);

test(
  "gerador exige salvaguardas contra conclusao precoce e chave automatica",
  () => {
    const draft = createProtocolDraft();
    const result = validateProtocolDraft({
      ...draft,
      generateNegativeRules: true,
      investigationPolicy: {
        ...draft.investigationPolicy,
        minimumObservedStructuresForConclusion: 2,
        minimumSupportingStructuresForConclusion: 2,
      },
    });

    assert.ok(
      result.errors.includes(
        "Mantenha a geração automática de regras negativas desativada."
      )
    );
    assert.ok(
      result.errors.includes(
        "A conclusão deve exigir ao menos três estruturas observadas."
      )
    );
    assert.ok(
      result.errors.includes(
        "A conclusão deve exigir ao menos três estruturas favoráveis."
      )
    );
  }
);

test(
  "gerador exige evidencia independente, referencias e casos de calibracao",
  () => {
    const result = validateProtocolDraft({
      ...createProtocolDraft(),
      description: "Comparação de duas hipóteses em um recorte didático.",
      pedagogicalNote: "As evidências sustentam hipóteses e não formam uma chave dicotômica.",
      references: ["Referência 1", "Referência 2", "Referência 3"],
      hypotheses: [
        { id: "a", name: "Hipótese A" },
        { id: "b", name: "Hipótese B" },
      ],
      observations: [
        { structure: "estrutura_1", label: "Estrutura 1", values: ["a", "b"] },
        { structure: "estrutura_2", label: "Estrutura 2", values: ["a", "b"] },
        { structure: "estrutura_3", label: "Estrutura 3", values: ["a", "b"] },
      ],
      rules: [
        { hypothesis: "a", structure: "estrutura_1", value: "a", effect: "positive", weight: 3 },
        { hypothesis: "a", structure: "estrutura_2", value: "a", effect: "positive", weight: 3 },
        { hypothesis: "a", structure: "estrutura_3", value: "a", effect: "positive", weight: 3 },
        { hypothesis: "b", structure: "estrutura_1", value: "b", effect: "positive", weight: 3 },
        { hypothesis: "b", structure: "estrutura_2", value: "b", effect: "positive", weight: 3 },
        { hypothesis: "b", structure: "estrutura_3", value: "b", effect: "positive", weight: 3 },
      ],
      calibrationCases: [],
    });

    assert.ok(
      result.errors.includes(
        "Inclua ao menos dois casos de calibração: um representativo e um incompleto ou misto."
      )
    );
  }
);

test(
  "contraevidencia sem justificativa nao passa na revisao",
  () => {
    const result = validateProtocolDraft({
      ...createProtocolDraft(),
      rules: [
        {
          hypothesis: "a",
          structure: "estrutura_ausente",
          value: "valor",
          effect: "negative",
          weight: 3,
          justification: "",
        },
      ],
    });

    assert.ok(
      result.errors.includes(
        "Toda contraevidência precisa de justificativa científica ou didática."
      )
    );
  }
);

test(
  "texto para IA preserva o contrato investigativo do LABSED",
  () => {
    const prompt = buildProtocolAiPrompt({
      subject: "Classes de répteis",
      taxonomicScope: "classes viventes, sem identificação de espécies",
      educationLevel: "licenciatura",
      curricularContext: "Aula prática de duas horas.",
    });

    assert.match(prompt, /não é uma chave dicotômica/i);
    assert.match(prompt, /três estruturas observadas/i);
    assert.match(prompt, /calibração/i);
    assert.match(prompt, /somente com o JSON válido solicitado/i);
    assert.match(prompt, /Classes de répteis/);
    assert.match(prompt, /Licenciatura/);
  }
);

test(
  "importacao completa campos investigativos ausentes com o rascunho seguro",
  () => {
    const imported = hydrateProtocolDraft({
      id: "teste-importado-v1",
      name: "Teste importado",
      domain: "zoologia",
      observations: [],
      hypotheses: [],
      rules: [],
    });

    assert.equal(imported.generateNegativeRules, false);
    assert.equal(
      imported.investigationPolicy.minimumObservedStructuresForConclusion,
      3
    );
    assert.deepEqual(imported.calibrationCases, []);
  }
);

test(
  "pedido de revisao para IA incorpora divergencias de calibracao",
  () => {
    const prompt = buildProtocolRevisionPrompt({
      protocol: { id: "teste-v1" },
      validationErrors: ["Inclua referências."],
      calibrationResults: [
        {
          label: "Caso misto",
          expectedConclusion: "em_andamento",
          actualConclusion: "em_disputa",
          leaderName: "Hipótese A",
          matchesExpectation: false,
        },
      ],
    });

    assert.match(prompt, /Inclua referências/);
    assert.match(prompt, /Caso misto: esperado em_andamento; obtido em_disputa/);
    assert.match(prompt, /não conte duas vezes o mesmo caráter/i);
    assert.match(prompt, /somente com o JSON completo e válido/i);
  }
);
