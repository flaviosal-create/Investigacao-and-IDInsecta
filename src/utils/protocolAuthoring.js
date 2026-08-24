const investigationDefaults = {
  minimumObservedStructuresForConclusion: 3,
  minimumSupportingStructuresForConclusion: 3,
  preferDiscriminativeSuggestion: true,
  requireNoLeaderConflictsForConclusion: true,
};

export function createProtocolDraft() {
  return {
    id: "novo-protocolo-v1",
    name: "Novo protocolo",
    domain: "botanica",
    description: "",
    pedagogicalNote: "",
    references: [""],
    generateNegativeRules: false,
    investigationPolicy: { ...investigationDefaults },
    observations: [],
    hypotheses: [],
    rules: [],
    calibrationCases: [],
  };
}

export function hydrateProtocolDraft(candidate) {
  const draft = createProtocolDraft();

  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    throw new Error("O conteúdo importado precisa ser um objeto JSON de protocolo.");
  }

  return {
    ...draft,
    ...candidate,
    references: Array.isArray(candidate.references)
      ? candidate.references
      : draft.references,
    observations: Array.isArray(candidate.observations)
      ? candidate.observations
      : draft.observations,
    hypotheses: Array.isArray(candidate.hypotheses)
      ? candidate.hypotheses
      : draft.hypotheses,
    rules: Array.isArray(candidate.rules)
      ? candidate.rules
      : draft.rules,
    calibrationCases: Array.isArray(candidate.calibrationCases)
      ? candidate.calibrationCases
      : draft.calibrationCases,
    investigationPolicy: {
      ...draft.investigationPolicy,
      ...(candidate.investigationPolicy ?? {}),
    },
  };
}

export function validateProtocolDraft(protocol) {
  const errors = [];
  const warnings = [];
  const structures = new Map(
    protocol.observations.map((observation) => [
      observation.structure,
      observation,
    ])
  );
  const hypothesisIds = new Set(
    protocol.hypotheses.map((hypothesis) => hypothesis.id)
  );
  const references = (protocol.references ?? []).filter(Boolean);
  const policy = protocol.investigationPolicy ?? {};

  ["id", "name", "domain", "description", "pedagogicalNote"].forEach((field) => {
    if (!protocol[field]?.trim()) {
      errors.push(`Preencha ${field}.`);
    }
  });

  if (references.length < 3) {
    errors.push("Inclua ao menos três referências para revisão científica.");
  }

  if (protocol.generateNegativeRules !== false) {
    errors.push("Mantenha a geração automática de regras negativas desativada.");
  }

  if (policy.minimumObservedStructuresForConclusion < 3) {
    errors.push("A conclusão deve exigir ao menos três estruturas observadas.");
  }

  if (policy.minimumSupportingStructuresForConclusion < 3) {
    errors.push("A conclusão deve exigir ao menos três estruturas favoráveis.");
  }

  if (!policy.preferDiscriminativeSuggestion) {
    errors.push("Ative sugestões de observações discriminativas.");
  }

  if (!policy.requireNoLeaderConflictsForConclusion) {
    errors.push("Exija revisão quando a hipótese líder tiver conflitos.");
  }

  if (protocol.hypotheses.length < 2) {
    errors.push("Inclua ao menos duas hipóteses para permitir comparação.");
  }

  if (protocol.observations.length < 3) {
    errors.push("Inclua ao menos três estruturas observáveis independentes.");
  }

  protocol.observations.forEach((observation) => {
    if (!observation.structure || !observation.label) {
      errors.push("Toda observação precisa de estrutura e rótulo.");
    }

    if (observation.values.length < 2) {
      warnings.push(
        `${observation.label || observation.structure || "Uma observação"} possui menos de dois valores.`
      );
    }
  });

  const ruleKeys = new Set();
  const positiveEvidenceByHypothesis = new Map();

  protocol.rules.forEach((rule) => {
    const observation = structures.get(rule.structure);
    const key = [
      rule.hypothesis,
      rule.structure,
      rule.value,
      rule.effect,
    ].join(":");

    if (!hypothesisIds.has(rule.hypothesis)) {
      errors.push("Uma regra aponta para hipótese inexistente.");
    }

    if (!observation) {
      errors.push("Uma regra aponta para estrutura inexistente.");
    } else if (!observation.values.includes(rule.value)) {
      errors.push("Uma regra aponta para valor inexistente.");
    }

    if (!Number.isFinite(rule.weight) || rule.weight < 1 || rule.weight > 10) {
      errors.push("Toda regra deve ter peso entre 1 e 10.");
    }

    if (rule.effect === "positive") {
      const structuresForHypothesis =
        positiveEvidenceByHypothesis.get(rule.hypothesis) ?? new Set();
      structuresForHypothesis.add(rule.structure);
      positiveEvidenceByHypothesis.set(
        rule.hypothesis,
        structuresForHypothesis
      );
    }

    if (rule.effect === "negative" && !rule.justification?.trim()) {
      errors.push("Toda contraevidência precisa de justificativa científica ou didática.");
    }

    if (ruleKeys.has(key)) {
      warnings.push("Existem regras duplicadas.");
    }
    ruleKeys.add(key);
  });

  protocol.hypotheses.forEach((hypothesis) => {
    if (!hypothesis.id || !hypothesis.name) {
      errors.push("Toda hipótese precisa de identificador e nome.");
    }

    if ((positiveEvidenceByHypothesis.get(hypothesis.id)?.size ?? 0) < 3) {
      errors.push(
        `${hypothesis.name || hypothesis.id || "Uma hipótese"} precisa de evidências positivas em ao menos três estruturas.`
      );
    }
  });

  validateCalibrationCases(
    protocol.calibrationCases ?? [],
    structures,
    errors
  );

  return {
    errors: Array.from(new Set(errors)),
    warnings: Array.from(new Set(warnings)),
  };
}

function validateCalibrationCases(cases, structures, errors) {
  if (cases.length < 2) {
    errors.push("Inclua ao menos dois casos de calibração: um representativo e um incompleto ou misto.");
    return;
  }

  if (!cases.some((scenario) => scenario.expectedConclusion === "concluida")) {
    errors.push("Inclua um caso de calibração com conclusão possível.");
  }

  if (!cases.some((scenario) => scenario.expectedConclusion !== "concluida")) {
    errors.push("Inclua um caso de calibração que mantenha a investigação aberta.");
  }

  cases.forEach((scenario) => {
    if (!scenario.id || !scenario.label || !scenario.purpose) {
      errors.push("Todo caso de calibração precisa de identificador, título e finalidade.");
    }

    if ((scenario.observations ?? []).length < 2) {
      errors.push("Todo caso de calibração precisa de ao menos duas observações.");
    }

    (scenario.observations ?? []).forEach(([structure, value]) => {
      const observation = structures.get(structure);
      if (!observation || !observation.values.includes(value)) {
        errors.push("Um caso de calibração usa observação que não existe no protocolo.");
      }
    });
  });
}

export function toProtocolJson(protocol) {
  return JSON.stringify(protocol, null, 2);
}

export function downloadProtocolDraft(protocol) {
  if (typeof document === "undefined") {
    return false;
  }

  const file = new Blob([toProtocolJson(protocol)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `${protocol.id || "protocolo"}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);

  return true;
}
