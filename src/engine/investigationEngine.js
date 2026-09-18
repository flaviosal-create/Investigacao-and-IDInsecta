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
  protocolId,
  metadata = {}
) {
  return createInvestigation({
    protocolId,
    specimenCode: metadata.specimenCode ?? "",
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

  const timestamp = new Date().toISOString();

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

        timestamp,
      },
    ],

    updatedAt:
      timestamp,
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

  const derivedResults = calculateDerivedResults(
    investigation,
    protocol
  );
  const {
    hypotheses,
    suggestion,
    conclusion,
    decision,
    interpretation,
    nextProtocol,
  } = derivedResults;

  const history = updateHypothesisHistory(
    investigation.history,
    hypotheses,
    new Date().toISOString()
  );

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

function calculateDerivedResults(investigation, protocol) {
  const { observations, finalizedAt } = investigation;
  const hypotheses = calculateHypotheses(observations, protocol);
  const suggestion = suggestObservation(observations, protocol, hypotheses);
  const conclusion = calculateConclusion(hypotheses, {
    observations,
    policy: protocol.investigationPolicy,
  });

  return {
    hypotheses,
    suggestion,
    conclusion,
    decision: makeDecision(hypotheses, conclusion),
    interpretation: generateInterpretation({ hypotheses }),
    nextProtocol: suggestNextProtocol(protocol.id, {
      hypotheses,
      conclusion,
      finalizedAt,
    }),
  };
}

function updateHypothesisHistory(history, hypotheses, timestamp) {
  const leader = hypotheses[0] ?? null;
  const lastUpdate = [...history]
    .reverse()
    .find((entry) => entry.type === "hypothesis-update");
  const leaderName = leader?.isLeader ? leader.name : null;
  const leaderScore = leader?.isLeader ? leader.score : null;

  if (
    lastUpdate &&
    lastUpdate.leader === leaderName &&
    lastUpdate.score === leaderScore
  ) {
    return history;
  }

  return [
    ...history,
    {
      type: "hypothesis-update",
      leader: leaderName,
      score: leaderScore,
      timestamp,
    },
  ];
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
