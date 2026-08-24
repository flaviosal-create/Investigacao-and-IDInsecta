import { ordensInsectaV1 } from "../src/protocols/zoologia/ordensInsectaV1.js";
import { tecidosBasicosV1 } from "../src/protocols/histologia/tecidosBasicosV1.js";
import { orgaosHistologicosV1 } from "../src/protocols/histologia/orgaosHistologicosV1.js";
import {
  startSession,
  addSessionObservation,
  runSession,
  generateSessionReport,
} from "../src/engine/sessionEngine.js";

const protocols = [
  ordensInsectaV1,
  tecidosBasicosV1,
  orgaosHistologicosV1,
];

const protocolCatalog = [
  {
    id: ordensInsectaV1.id,
    track: "Universo autônomo",
    stage: "Fundamentos",
    stageOrder: 1,
    order: 1,
    related: [],
  },
  {
    id: tecidosBasicosV1.id,
    track: "Universo autônomo",
    stage: "Tecido",
    stageOrder: 1,
    order: 1,
    related: [],
  },
  {
    id: orgaosHistologicosV1.id,
    track: "Universo autônomo",
    stage: "Órgão",
    stageOrder: 1,
    order: 2,
    related: [],
  },
];

const domains = [
  {
    id: "zoologia",
    label: "Zoologia",
  },
  {
    id: "histologia",
    label: "Histologia",
  },
];

const state = {
  selectedDomainId:
    domains[0].id,
  selectedProtocolId:
    protocols[0].id,
  session: null,
};

const elements = {
  domainSelect:
    document.querySelector(
      "#domain-select"
    ),
  protocolSelect:
    document.querySelector(
      "#protocol-select"
    ),
  protocolDescription:
    document.querySelector(
      "#protocol-description"
    ),
  protocolOrientation:
    document.querySelector(
      "#protocol-orientation"
    ),
  protocolTrackName:
    document.querySelector(
      "#protocol-track-name"
    ),
  protocolStage:
    document.querySelector(
      "#protocol-stage"
    ),
  protocolTrail:
    document.querySelector(
      "#protocol-trail"
    ),
  summaryObservations:
    document.querySelector(
      "#summary-observations"
    ),
  summaryLeader:
    document.querySelector(
      "#summary-leader"
    ),
  summaryConfidence:
    document.querySelector(
      "#summary-confidence"
    ),
  summaryConfidenceHint:
    document.querySelector(
      "#summary-confidence-hint"
    ),
  summaryMargin:
    document.querySelector(
      "#summary-margin"
    ),
  observationForm:
    document.querySelector(
      "#observation-form"
    ),
  observationsList:
    document.querySelector(
      "#observations-list"
    ),
  observationsEmpty:
    document.querySelector(
      "#observations-empty"
    ),
  hypothesesList:
    document.querySelector(
      "#hypotheses-list"
    ),
  hypothesesEmpty:
    document.querySelector(
      "#hypotheses-empty"
    ),
  nextProtocolCard:
    document.querySelector(
      "#next-protocol-card"
    ),
  suggestionCard:
    document.querySelector(
      "#suggestion-card"
    ),
  conclusionCard:
    document.querySelector(
      "#conclusion-card"
    ),
  reportCard:
    document.querySelector(
      "#report-card"
    ),
  resetButton:
    document.querySelector(
      "#reset-button"
    ),
};

initialize();

function initialize() {
  renderDomainOptions();
  renderProtocolOptions();
  bindEvents();
  resetSession();
}

function bindEvents() {
  elements.domainSelect.addEventListener(
    "change",
    (event) => {
      state.selectedDomainId =
        event.target.value;
      renderProtocolOptions();
      resetSession();
    }
  );

  elements.protocolSelect.addEventListener(
    "change",
    (event) => {
      state.selectedProtocolId =
        event.target.value;
      resetSession();
    }
  );

  elements.resetButton.addEventListener(
    "click",
    () => {
      resetSession();
    }
  );
}

function renderDomainOptions() {
  elements.domainSelect.innerHTML =
    domains
      .map(
        (domain) =>
          `<option value="${domain.id}">${domain.label}</option>`
      )
      .join("");

  elements.domainSelect.value =
    state.selectedDomainId;
}

function renderProtocolOptions() {
  const visibleProtocols =
    protocols.filter(
      (protocol) =>
        protocol.domain ===
        state.selectedDomainId
    )
      .sort(compareProtocols);

  if (
    !visibleProtocols.some(
      (protocol) =>
        protocol.id ===
        state.selectedProtocolId
    )
  ) {
    state.selectedProtocolId =
      visibleProtocols[0]?.id ?? null;
  }

  elements.protocolSelect.innerHTML =
    buildProtocolOptionsMarkup(
      visibleProtocols
    );

  elements.protocolSelect.value =
    state.selectedProtocolId;
}

function resetSession() {
  const protocol =
    getSelectedProtocol();

  if (!protocol) {
    return;
  }

  state.session =
    startSession(protocol);

  renderProtocolMeta(protocol);
  renderObservationForm(protocol);
  renderWorkspace();
}

function getSelectedProtocol() {
  return protocols.find(
    (protocol) =>
      protocol.id ===
      state.selectedProtocolId
  );
}

function renderProtocolMeta(protocol) {
  const metadata =
    getProtocolMetadata(protocol.id);
  const trailProtocols =
    protocols
      .filter(
        (item) =>
          item.domain === protocol.domain
      )
      .sort(compareProtocols);

  elements.protocolTrackName.textContent =
    metadata?.track ??
    "Universo autônomo";
  elements.protocolStage.textContent =
    metadata?.stage ?? "Protocolo";
  elements.protocolDescription.textContent =
    protocol.description;
  elements.protocolOrientation.textContent =
    buildProtocolOrientation(
      protocol
    );
  elements.protocolTrail.innerHTML =
    trailProtocols
      .map((item) => {
        const itemMetadata =
          getProtocolMetadata(item.id);
        const isCurrent =
          item.id === protocol.id;

        return `
          <div class="trail-item ${
            isCurrent
              ? "is-current"
              : ""
          }">
            <span class="trail-step">
              ${itemMetadata?.order ?? "-"}
            </span>
            <div class="trail-copy">
              <strong>${item.name}</strong>
              <span>${itemMetadata?.stage ?? "Protocolo"}</span>
            </div>
          </div>
        `;
      })
      .join("");
}

function buildProtocolOrientation(
  protocol
) {
  if (protocol.domain === "histologia") {
    if (protocol.id === tecidosBasicosV1.id) {
      return "Este protocolo investiga tipos de tecido como hipóteses centrais. As evidências vêm de características celulares, estruturais e morfológicas observáveis, sem exigir continuação automática para órgão.";
    }

    if (protocol.id === orgaosHistologicosV1.id) {
      return "Este protocolo investiga órgãos como hipóteses centrais. Tecidos, arranjos celulares e estruturas marcantes entram aqui como evidências para sustentar ou enfraquecer cada órgão dentro do mesmo universo investigativo.";
    }
  }

  return "Cada protocolo representa um universo próprio de hipóteses investigáveis dentro da investigação atual.";
}

function buildProtocolOptionsMarkup(
  visibleProtocols
) {
  const groups = new Map();

  visibleProtocols.forEach(
    (protocol) => {
      const metadata =
        getProtocolMetadata(protocol.id);
      const groupLabel =
        metadata?.track ??
        "Protocolos";

      if (!groups.has(groupLabel)) {
        groups.set(groupLabel, []);
      }

      groups.get(groupLabel).push(
        protocol
      );
    }
  );

  return Array.from(
    groups.entries()
  )
    .map(
      ([groupLabel, items]) => `
        <optgroup label="${groupLabel}">
          ${items
            .map((protocol) => {
              const metadata =
                getProtocolMetadata(
                  protocol.id
                );

              return `
                <option value="${protocol.id}">
                  ${metadata?.order ?? "-"}.
                  ${protocol.name}
                </option>
              `;
            })
            .join("")}
        </optgroup>
      `
    )
    .join("");
}

function getProtocolMetadata(
  protocolId
) {
  return protocolCatalog.find(
    (item) => item.id === protocolId
  );
}

function compareProtocols(
  leftProtocol,
  rightProtocol
) {
  const leftMetadata =
    getProtocolMetadata(
      leftProtocol.id
    );
  const rightMetadata =
    getProtocolMetadata(
      rightProtocol.id
    );

  const stageDifference =
    (leftMetadata?.stageOrder ?? 99) -
    (rightMetadata?.stageOrder ?? 99);

  if (stageDifference !== 0) {
    return stageDifference;
  }

  return (
    (leftMetadata?.order ?? 99) -
    (rightMetadata?.order ?? 99)
  );
}

function getNextProtocol(
  protocolId
) {
  return getRelatedProtocols(
    protocolId
  )[0] ?? null;
}

function renderObservationForm(protocol) {
  elements.observationForm.innerHTML =
    protocol.observations
      .map(
        (observation) => `
          <article class="observation-card">
            <div>
              <h3>${observation.label}</h3>
              <p class="hint">${formatStructure(
                observation.structure
              )}</p>
            </div>
            <div class="option-grid">
              ${observation.values
                .map(
                  (value) => `
                    <button
                      type="button"
                      class="option-button"
                      data-structure="${observation.structure}"
                      data-value="${value}"
                    >
                      ${formatValue(value)}
                    </button>
                  `
                )
                .join("")}
            </div>
          </article>
        `
      )
      .join("");

  elements.observationForm
    .querySelectorAll(
      ".option-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          registerObservation({
            structure:
              button.dataset
                .structure,
            value:
              button.dataset.value,
          });
        }
      );
    });
}

function registerObservation(
  observation
) {
  state.session =
    addSessionObservation(
      state.session,
      observation
    );
  state.session =
    runSession(state.session);

  renderWorkspace();
}

function renderWorkspace() {
  const investigation =
    state.session.investigation;
  const report =
    generateSessionReport(
      state.session
    );

  renderSummary(
    investigation,
    report
  );
  renderObservationSelection(
    investigation
  );
  renderObservationList(
    investigation
  );
  renderHypotheses(
    investigation
  );
  renderNextProtocol(
    investigation
  );
  renderSuggestion(
    investigation,
    report
  );
  renderConclusion(report);
  renderNarrative(report);
}

function renderSummary(
  investigation,
  report
) {
  const leader =
    investigation.hypotheses?.[0];

  elements.summaryObservations.textContent =
    report.totalObservations;
  elements.summaryLeader.textContent =
    report.leadingHypothesis ??
    "-";
  elements.summaryConfidence.textContent =
    report.confidence ?? "-";
  elements.summaryConfidenceHint.textContent =
    leader
      ? describeConfidenceTone(
          leader.confidence.level
        )
      : "Registre observações para iniciar a leitura de confiança.";
  elements.summaryMargin.textContent =
    report.leadingMargin ??
    "-";
}

function renderObservationSelection(
  investigation
) {
  const activeMap =
    new Map(
      investigation.observations.map(
        (observation) => [
          observation.structure,
          observation.value,
        ]
      )
    );

  elements.observationForm
    .querySelectorAll(
      ".option-button"
    )
    .forEach((button) => {
      const isActive =
        activeMap.get(
          button.dataset.structure
        ) ===
        button.dataset.value;

      button.classList.toggle(
        "is-active",
        isActive
      );
    });
}

function renderObservationList(
  investigation
) {
  const observations =
    investigation.observations;

  elements.observationsEmpty.hidden =
    observations.length > 0;
  elements.observationsList.hidden =
    observations.length === 0;

  elements.observationsList.innerHTML =
    observations
      .map(
        (observation) => `
          <li class="observation-item">
            <div>
              <span>${formatStructure(
                observation.structure
              )}</span>
              <strong>${formatValue(
                observation.value
              )}</strong>
            </div>
            <button
              type="button"
              class="chip-button"
              data-remove-structure="${observation.structure}"
            >
              Substituir
            </button>
          </li>
        `
      )
      .join("");

  elements.observationsList
    .querySelectorAll(
      "[data-remove-structure]"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          highlightStructure(
            button.dataset
              .removeStructure
          );
        }
      );
    });
}

function renderHypotheses(
  investigation
) {
  const hypotheses =
    investigation.hypotheses ?? [];

  elements.hypothesesEmpty.hidden =
    hypotheses.length > 0;
  elements.hypothesesList.hidden =
    hypotheses.length === 0;

  elements.hypothesesList.innerHTML =
    hypotheses
      .slice(0, 6)
      .map(
        (hypothesis, index) => `
          <article class="hypothesis-card ${
            index === 0
              ? "is-leading"
              : ""
          }">
            <div class="hypothesis-header">
              <div>
                <h3>${hypothesis.name}</h3>
                <p class="hint">${hypothesis.clue ?? ""}</p>
              </div>
              <span class="rank-badge">#${hypothesis.rank}</span>
            </div>

            <div class="hypothesis-meta">
              <div class="meta-group">
                <span class="meta-label">Score</span>
                <strong>${formatNumber(
                  hypothesis.score
                )}</strong>
              </div>
              <div class="meta-group">
                <span class="meta-label">Margem</span>
                <strong>${formatNumber(
                  hypothesis.margin
                )}</strong>
              </div>
              <span class="status-badge ${hypothesis.confidence.level}">
                ${hypothesis.confidence.label}
              </span>
            </div>

            <p class="confidence-note">
              ${hypothesis.confidence.description}
            </p>

            <div class="evidence-list">
              ${hypothesis.evidences
                .map(
                  (evidence) => `
                    <span class="evidence-chip positive">
                      + ${formatStructure(
                        evidence.structure
                      )}: ${formatValue(
                        evidence.value
                      )}
                    </span>
                  `
                )
                .join("")}
              ${hypothesis.conflicts
                .map(
                  (conflict) => `
                    <span class="evidence-chip negative">
                      - ${formatStructure(
                        conflict.structure
                      )}: ${formatValue(
                        conflict.value
                      )}
                    </span>
                  `
                )
                .join("")}
            </div>
          </article>
        `
      )
      .join("");
}

function renderSuggestion(
  investigation,
  report
) {
  if (!investigation.suggestion) {
    elements.suggestionCard.innerHTML = `
      <strong>Nenhuma observação sugerida.</strong>
      <p>As observações atuais já cobrem bem o protocolo ou ainda não existe hipótese líder para orientar o próximo passo.</p>
    `;
    return;
  }

  const leader =
    investigation.hypotheses?.[0] ?? null;
  const runnerUp =
    investigation.hypotheses?.[1] ?? null;
  const suggestionMode =
    resolveSuggestionMode(
      investigation
    );

  elements.suggestionCard.innerHTML = `
    <span class="report-label">${
      suggestionMode.label
    }</span>
    <strong>${formatStructure(
      investigation.suggestion.structure
    )}</strong>
    <p class="suggestion-focus">${
      suggestionMode.focus
    }</p>
    <p>${report.suggestion.reason}</p>
    <p class="suggestion-context">${buildSuggestionContext({
      leader,
      runnerUp,
      suggestion: investigation.suggestion,
    })}</p>
    <button
      type="button"
      class="secondary-button next-step-button"
      data-jump-structure="${
        investigation.suggestion.structure
      }"
    >
      Ir para esta observação
    </button>
  `;

  elements.suggestionCard
    .querySelector(
      "[data-jump-structure]"
    )
    ?.addEventListener(
      "click",
      () => {
        highlightStructure(
          investigation.suggestion
            .structure
        );
      }
    );
}

function renderNextProtocol(
  investigation
) {
  const currentProtocol =
    getSelectedProtocol();

  if (!currentProtocol) {
    elements.nextProtocolCard.innerHTML = `
      <strong>Sem investigação ativa.</strong>
      <p>Selecione um protocolo para definir o universo de hipóteses da investigação.</p>
    `;
    return;
  }

  if (
    investigation.conclusion?.status !==
    "concluida"
  ) {
    elements.nextProtocolCard.innerHTML = `
      <span class="report-label">Universo atual</span>
      <strong>${currentProtocol.name}</strong>
      <p>Você está em uma investigação autônoma. ${
        currentProtocol.id ===
        tecidosBasicosV1.id
          ? "Este protocolo sustenta hipóteses de tecido a partir das evidências morfológicas observadas na amostra atual."
          : currentProtocol.id ===
              orgaosHistologicosV1.id
            ? "Este protocolo sustenta hipóteses de órgão a partir das evidências observadas na lâmina, sem depender de um protocolo anterior para funcionar."
            : "Os protocolos relacionados aparecem como novas investigações possíveis, sem continuação automática da resposta."
      }</p>
    `;
    return;
  }

  elements.nextProtocolCard.innerHTML = `
    <span class="report-label">Escopo atual</span>
    <strong>${currentProtocol.name}</strong>
    <p>${
      currentProtocol.id === tecidosBasicosV1.id
        ? "Você concluiu a investigação do tecido dentro do universo de hipóteses deste protocolo."
        : currentProtocol.id ===
            orgaosHistologicosV1.id
          ? "Você concluiu a investigação do órgão dentro do universo de hipóteses deste protocolo."
          : "Você concluiu a investigação dentro do universo de hipóteses deste protocolo."
    }</p>
  `;
}

function getRelatedProtocols(
  protocolId
) {
  const metadata =
    getProtocolMetadata(protocolId);

  if (!metadata) {
    return [];
  }

  const relatedIds =
    metadata.related ?? [];

  return relatedIds
    .map((relatedId) =>
      protocols.find(
        (protocol) =>
          protocol.id === relatedId
      )
    )
    .filter(Boolean);
}

function renderConclusion(report) {
  if (!report.conclusion) {
    elements.conclusionCard.innerHTML = `
      <strong>Sem leitura de estado ainda.</strong>
      <p>Registre observações para que o protocolo avalie a investigação e indique o próximo movimento.</p>
    `;
    return;
  }

  const statusMeta =
    getConclusionStatusMeta(
      report.conclusion.status
    );
  const decisionMeta =
    getDecisionStatusMeta(
      report.decision?.status
    );

  elements.conclusionCard.innerHTML = `
    <span class="report-label">Leitura atual</span>
    <span class="insight-badge ${
      statusMeta.className
    }">${statusMeta.label}</span>
    <strong>${statusMeta.title}</strong>
    <p class="suggestion-focus">${statusMeta.summary}</p>
    <p>${report.conclusion.reason}</p>
    <span class="report-label">Decisão atual</span>
    <span class="insight-badge ${
      decisionMeta.className
    }">${decisionMeta.label}</span>
    <strong>${decisionMeta.title}</strong>
    <p>${report.decision?.reason ?? ""}</p>
  `;
}

function renderNarrative(report) {
  const narrative =
    report.narrative
      .split(". ")
      .filter(Boolean)
      .map((line) =>
        line.endsWith(".")
          ? line
          : `${line}.`
      );

  elements.reportCard.innerHTML = `
    <span class="report-label">Síntese</span>
    <p class="report-note">Esta síntese descreve a investigação atual dentro do protocolo selecionado.</p>
    <p>Hipótese líder: <strong>${report.leadingHypothesis ?? "-"}</strong></p>
    <p>Hipótese concorrente: <strong>${report.competingHypothesis ?? "-"}</strong></p>
    <ul>
      ${narrative
        .map(
          (line) =>
            `<li>${line}</li>`
        )
        .join("")}
    </ul>
  `;
}

function highlightStructure(
  structure
) {
  const button =
    elements.observationForm.querySelector(
      `[data-structure="${structure}"]`
    );

  button?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

function formatStructure(value) {
  return capitalizeWords(
    value.replaceAll("_", " ")
  );
}

function formatValue(value) {
  return capitalizeWords(
    value.replaceAll("_", " ")
  );
}

function formatStatus(value) {
  if (!value) {
    return "-";
  }

  return capitalizeWords(
    value.replaceAll("_", " ")
  );
}

function formatNumber(value) {
  return Number(value).toFixed(1).replace(".0", "");
}

function describeConfidenceTone(
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

function getConclusionStatusMeta(
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

function getDecisionStatusMeta(
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

function resolveSuggestionMode(
  investigation
) {
  const leader =
    investigation.hypotheses?.[0] ?? null;

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

function buildSuggestionContext({
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

function capitalizeWords(text) {
  return text.replace(
    /\b\p{L}/gu,
    (letter) =>
      letter.toUpperCase()
  );
}
