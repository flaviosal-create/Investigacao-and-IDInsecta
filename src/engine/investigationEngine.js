import {
  createInvestigation,
} from "../models/Investigation.js";

import {
  calculateHypotheses,
} from "./HypothesisEngine.js";

import {
  suggestObservation,
} from "./SuggestionEngine.js";

import {
  calculateConclusion,
} from "./ConclusionEngine.js";

import {
  makeDecision,
} from "./DecisionEngine.js";

import { generateInterpretation }
from "./InterpretationEngine.js";

import {
  suggestNextProtocol,
} from "./ProtocolGraphEngine.js";

/**
 * Cria uma nova investigação.
 */
export function startInvestigation(
  protocolId
) {
  return createInvestigation({
    protocolId,
  });
}

/**
 * Registra uma observação.
 */
export function addObservation(
  investigation,
  observation,
  protocol = null
) {
  if (protocol) {
    validateObservation(
      observation,
      protocol
    );
  }

  const existingObservation =
    investigation.observations.find(
      (item) =>
        item.structure ===
        observation.structure
    );

  const nextObservations =
    existingObservation
      ? investigation.observations.map(
          (item) =>
            item.structure ===
            observation.structure
              ? observation
              : item
        )
      : [
          ...investigation.observations,
          observation,
        ];

  return {
    ...investigation,

    observations:
      nextObservations,

    history: [
      ...investigation.history,

      {
        type:
          existingObservation
            ? "observation-update"
            : "observation",

        structure:
          observation.structure,

        value:
          observation.value,

        timestamp:
          new Date().toISOString(),
      },
    ],

    updatedAt:
      new Date().toISOString(),
  };
}

/**
 * Remove uma observação registrada.
 */
export function removeObservation(
  investigation,
  structure
) {
  const existingObservation =
    investigation.observations.find(
      (item) =>
        item.structure === structure
    );

  if (!existingObservation) {
    return investigation;
  }

  return {
    ...investigation,

    observations:
      investigation.observations.filter(
        (item) =>
          item.structure !== structure
      ),

    history: [
      ...investigation.history,

      {
        type: "observation-remove",

        structure,

        value:
          existingObservation.value,

        timestamp:
          new Date().toISOString(),
      },
    ],

    updatedAt:
      new Date().toISOString(),
  };
}

export function finalizeInvestigation(investigation) {
  if (investigation.finalizedAt) {
    return investigation;
  }

  const finalizedAt = new Date().toISOString();

  return {
    ...investigation,
    status: "finalized",
    finalizedAt,
    history: [
      ...investigation.history,
      { type: "investigation-finalized", timestamp: finalizedAt },
    ],
    updatedAt: finalizedAt,
  };
}

export function reopenInvestigation(investigation) {
  if (!investigation.finalizedAt) {
    return investigation;
  }

  return {
    ...investigation,
    status: "started",
    finalizedAt: null,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Executa uma rodada de investigação.
 */
export function runInvestigation(
  investigation,
  protocol
) {
  investigation.observations.forEach(
    (observation) => {
      validateObservation(
        observation,
        protocol
      );
    }
  );

  const hypotheses =
    calculateHypotheses(
      investigation.observations,
      protocol
    );

  const suggestion =
    suggestObservation(
      investigation.observations,
      protocol,
      hypotheses
    );

  const conclusion =
    calculateConclusion(
      hypotheses,
      {
        observations:
          investigation.observations,
        policy:
          protocol.investigationPolicy,
      }
    );

  const decision =
    makeDecision(
      hypotheses,
      conclusion
    );

  const interpretation =
    generateInterpretation({
    hypotheses,
  });

  const nextProtocol =
  suggestNextProtocol(
    protocol.id,
    {
      hypotheses,
      conclusion,
      finalizedAt: investigation.finalizedAt,
    }
  );

  const leader =
    hypotheses.length > 0
      ? hypotheses[0]
      : null;

  const lastHypothesisUpdate = [...investigation.history]
    .reverse()
    .find((entry) => entry.type === "hypothesis-update");

  const leaderName = leader?.name ?? null;
  const leaderScore = leader?.score ?? null;

  const hasLeaderChanged =
    !lastHypothesisUpdate ||
    lastHypothesisUpdate.leader !== leaderName ||
    lastHypothesisUpdate.score !== leaderScore;

  const history = hasLeaderChanged
    ? [
        ...investigation.history,

        {
          type: "hypothesis-update",

          leader: leaderName,

          score: leaderScore,

          timestamp:
            new Date().toISOString(),
        },
      ]
    : investigation.history;

  return {
    ...investigation,

    hypotheses,

    suggestion,

    conclusion,

    decision,

    interpretation,

    nextProtocol,

    history,

    updatedAt:
      new Date().toISOString(),
  };
}

function validateObservation(
  observation,
  protocol
) {
  const definition =
    protocol.observations.find(
      (item) =>
        item.structure ===
        observation.structure
    );

  if (!definition) {
    throw new Error(
      `Estrutura de observacao invalida: ${observation.structure}.`
    );
  }

  if (
    !definition.values.includes(
      observation.value
    )
  ) {
    throw new Error(
      `Valor de observacao invalido para ${observation.structure}: ${observation.value}.`
    );
  }
}
