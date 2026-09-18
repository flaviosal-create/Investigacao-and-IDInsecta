/**
 * Responsável por:
 *
 * - sugerir próxima observação
 * - maximizar ganho de informação
 */

import { getEffectiveRuleWeight } from "../protocols/scoring.js";

export function suggestObservation(
  observations,
  protocol,
  hypotheses
) {
  const leader = hypotheses[0];
  const runnerUp = hypotheses[1];

  if (!leader) {
    return null;
  }

  const observedStructures = observations.map(
    (obs) => obs.structure
  );

  const tied = hypotheses.filter((item) => item.score === leader.score);
  if (tied.length > 1) {
    const candidates = protocol.observations.filter((item) => !observedStructures.includes(item.structure));
    const ranked = candidates.map((observation) => {
      const profiles = tied.map((hypothesis) => calculateStructureProfile(protocol.rules, hypothesis.id, observation.structure, protocol));
      let distance = 0;
      for (let i = 0; i < profiles.length; i += 1) {
        for (let j = i + 1; j < profiles.length; j += 1) {
          distance += calculateProfileDistance(profiles[i], profiles[j]);
        }
      }
      return { structure: observation.structure, distance };
    }).sort((a, b) => b.distance - a.distance || a.structure.localeCompare(b.structure));
    if (!ranked[0] || ranked[0].distance === 0) return null;
    return {
      structure: ranked[0].structure,
      comparedHypotheses: tied.map((item) => item.id),
      reason: `Pode diferenciar o conjunto de ${tied.length} hipóteses empatadas pelas evidências observadas.`,
    };
  }

  const discriminativeSuggestion =
    buildDiscriminativeSuggestion({
      observedStructures,
      protocol,
      leader,
      runnerUp,
      force:
        protocol.investigationPolicy
          ?.preferDiscriminativeSuggestion === true,
    });

  if (discriminativeSuggestion) {
    return discriminativeSuggestion;
  }

  const candidateRules = protocol.rules
    .filter(
      (rule) =>
        rule.hypothesis === leader.id &&
        rule.effect === "positive" &&
        !observedStructures.includes(
          rule.structure
        )
    )
    .sort(
      (a, b) =>
        getEffectiveRuleWeight(protocol, b) - getEffectiveRuleWeight(protocol, a)
    );

  if (candidateRules.length === 0) {
    return null;
  }

  return {
    structure:
      candidateRules[0].structure,

    reason:
      `Pode fortalecer a hipótese ${leader.name}.`,
  };
}

function buildDiscriminativeSuggestion({
  observedStructures,
  protocol,
  leader,
  runnerUp,
  force = false,
}) {
  const margin = typeof leader?.margin === "number" ? leader.margin : 0;

  if (
    !runnerUp ||
    (!force && margin > 1)
  ) {
    return null;
  }

  const availableStructures =
    protocol.observations.filter(
      (observation) =>
        !observedStructures.includes(
          observation.structure
        )
    );

  let bestCandidate = null;

  availableStructures.forEach(
    (observation) => {
      const leaderImpact =
        calculateStructureProfile(
          protocol.rules,
          leader.id,
          observation.structure,
          protocol
        );

      const runnerUpImpact =
        calculateStructureProfile(
          protocol.rules,
          runnerUp.id,
          observation.structure,
          protocol
        );

      const discriminationPower =
        calculateProfileDistance(
          leaderImpact,
          runnerUpImpact
        );

      if (
        discriminationPower === 0
      ) {
        return;
      }

      if (
        !bestCandidate ||
        discriminationPower >
          bestCandidate.discriminationPower
      ) {
        bestCandidate = {
          structure:
            observation.structure,
          discriminationPower,
        };
      }
    }
  );

  if (!bestCandidate) {
    return null;
  }

  return {
    structure:
      bestCandidate.structure,
    reason:
      `Pode diferenciar ${leader.name} de ${runnerUp.name}.`,
  };
}

function calculateStructureProfile(
  rules,
  hypothesisId,
  structure,
  protocol
) {
  return rules
    .filter(
      (rule) =>
        rule.hypothesis ===
          hypothesisId &&
        rule.structure ===
          structure
    )
    .reduce(
      (profile, rule) => {
        const signal =
          rule.effect === "positive"
            ? getEffectiveRuleWeight(protocol, rule)
            : -getEffectiveRuleWeight(protocol, rule);

        profile[rule.value] =
          (profile[rule.value] ?? 0) +
          signal;

        return profile;
      },
      {}
    );
}

function calculateProfileDistance(
  leaderProfile,
  runnerUpProfile
) {
  const values = new Set([
    ...Object.keys(
      leaderProfile
    ),
    ...Object.keys(
      runnerUpProfile
    ),
  ]);

  return Array.from(values).reduce(
    (total, value) =>
      total +
      Math.abs(
        (leaderProfile[value] ?? 0) -
          (runnerUpProfile[value] ?? 0)
      ),
    0
  );
}
