export function resolveSuggestionMode(
  investigation
) {
  const leader =
    investigation.hypotheses?.[0] ??
    null;

  if (
    leader?.confidence?.level ===
    "disputada"
  ) {
    return {
      label:
        "Observação para resolver a disputa",
      focus:
        "A investigação ainda está muito apertada entre as hipóteses mais fortes.",
    };
  }

  if (
    investigation.decision
      ?.status === "continuar"
  ) {
    return {
      label:
        "Observação para fortalecer a leitura",
      focus:
        "A hipótese líder já existe, mas ainda precisa ganhar sustentação antes do encerramento.",
    };
  }

  return {
    label: "Próxima observação útil",
    focus:
      "Esta é a próxima estrutura com maior potencial de ganho informativo dentro do protocolo atual.",
  };
}

export function buildSuggestionContext({
  leader,
  runnerUp,
  suggestion,
}) {
  if (!leader || !suggestion) {
    return "Registre a observação sugerida para destravar a leitura atual.";
  }

  if (
    leader.confidence.level ===
      "disputada" &&
    runnerUp
  ) {
    return `Ela pode separar ${leader.name} de ${runnerUp.name} sem sair do universo deste protocolo.`;
  }

  if (runnerUp) {
    return `Ela pode consolidar ${leader.name} e ampliar a distância para ${runnerUp.name}.`;
  }

  return `Ela pode reforçar a hipótese ${leader.name} dentro da investigação atual.`;
}

export function getConclusionStatusMeta(
  status
) {
  const statusMap = {
    concluida: {
      label: "Encerramento possível",
      title:
        "A investigação já pode ser concluída",
      summary:
        "A hipótese líder está suficientemente isolada dentro do protocolo atual.",
      className: "is-success",
    },
    em_disputa: {
      label: "Disputa aberta",
      title:
        "As hipóteses mais fortes continuam muito próximas",
      summary:
        "Ainda não é hora de encerrar. O melhor próximo passo é buscar uma observação discriminativa.",
      className: "is-warning",
    },
    em_andamento: {
      label: "Leitura em andamento",
      title:
        "Já existe direção, mas ainda falta sustentação",
      summary:
        "A investigação tem uma líder útil, porém ainda precisa de mais base observacional.",
      className: "is-info",
    },
    em_revisao: {
      label: "Revisão necessária",
      title:
        "Há sinais conflitantes dentro da investigação",
      summary:
        "Vale revisar observações ou buscar novos dados antes de aceitar a liderança atual.",
      className: "is-danger",
    },
  };

  return (
    statusMap[status] ?? {
      label: formatStatus(status),
      title: "Estado da investigação",
      summary:
        "O protocolo registrou um estado intermediário para a investigação atual.",
      className: "is-neutral",
    }
  );
}

export function getDecisionStatusMeta(
  status
) {
  const statusMap = {
    concluir: {
      label: "Ação recomendada",
      title: "Concluir investigação",
      className: "is-success",
    },
    continuar: {
      label: "Ação recomendada",
      title: "Continuar investigando",
      className: "is-warning",
    },
    sem_dados: {
      label: "Ação recomendada",
      title: "Registrar observações",
      className: "is-neutral",
    },
  };

  return (
    statusMap[status] ?? {
      label: "Ação recomendada",
      title: formatStatus(status),
      className: "is-neutral",
    }
  );
}

export function formatStructure(value) {
  return capitalizeWords(
    value.replaceAll("_", " ")
  );
}

export function formatValue(value) {
  return capitalizeWords(
    value.replaceAll("_", " ")
  );
}

export function formatStatus(value) {
  if (!value) {
    return "-";
  }

  return capitalizeWords(
    value.replaceAll("_", " ")
  );
}

export function formatNumber(value) {
  return Number(value)
    .toFixed(1)
    .replace(".0", "");
}

export function describeConfidenceTone(
  level
) {
  const toneByLevel = {
    insuficiente:
      "Ainda nao ha base suficiente para sustentar bem as hipoteses.",
    inicial:
      "Existe algum sinal util, mas a leitura ainda esta incompleta.",
    promissora:
      "A lider ja aponta uma direcao boa, mas ainda nao deve encerrar a investigacao.",
    disputada:
      "As hipoteses mais fortes continuam proximas e pedem observacao discriminativa.",
    bem_sustentada:
      "A lider esta bem apoiada e claramente separada das concorrentes.",
    contraditoria:
      "Ha sinais em conflito que pedem revisao antes de concluir.",
  };

  return (
    toneByLevel[level] ??
    "A confianca sera detalhada conforme novas observacoes forem registradas."
  );
}

function capitalizeWords(text) {
  return text.replace(
    /\b\p{L}/gu,
    (letter) =>
      letter.toUpperCase()
  );
}
