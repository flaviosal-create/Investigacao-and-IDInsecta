/**
 * Responsável por:
 *
 * - sugerir próxima observação
 * - maximizar ganho de informação
 */

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
        b.weight - a.weight
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
  if (
    !runnerUp ||
    (!force && leader.margin > 1)
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
          observation.structure
        );

      const runnerUpImpact =
        calculateStructureProfile(
          protocol.rules,
          runnerUp.id,
          observation.structure
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
  structure
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
            ? rule.weight
            : -rule.weight;

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
