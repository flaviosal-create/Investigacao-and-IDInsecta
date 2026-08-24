import { calculateConfidence } from "./ConfidenceEngine.js";
import { getEffectiveRuleWeight } from "../protocols/scoring.js";

export function calculateHypotheses(
  observations,
  protocol
) {
  const ranked = protocol.hypotheses
    .map((hypothesis) => {
      const evidences = getMatchingRules(
        protocol,
        hypothesis.id,
        "positive",
        observations
      );

      const conflicts = getMatchingRules(
        protocol,
        hypothesis.id,
        "negative",
        observations
      );

      const uniqueConflicts = Array.from(
        new Map(
          conflicts.map((conflict) => [
            `${conflict.structure}:${conflict.value}`,
            conflict,
          ])
        ).values()
      );

      const positive = evidences.reduce(
        (total, rule) =>
          total +
          getEffectiveRuleWeight(
            protocol,
            rule
          ),
        0
      );

      const negative = uniqueConflicts.reduce(
        (total, rule) =>
          total +
          getEffectiveRuleWeight(
            protocol,
            rule
          ),
        0
      );

      return {
        ...hypothesis,

        score: positive - negative,

        evidences,

        conflicts: uniqueConflicts,
      };
    })
    .sort(
      (a, b) => b.score - a.score
    );

  return ranked.map(
    (hypothesis, index) => {
      const leader = ranked[0];
      const runnerUp = ranked[1];

      const margin =
        index === 0
          ? (
              runnerUp
                ? leader.score - runnerUp.score
                : leader.score
            )
          : hypothesis.score - leader.score;

      return {
        ...hypothesis,

        rank: index + 1,

        margin,

        confidence: calculateConfidence({
          score: hypothesis.score,
          conflicts: hypothesis.conflicts,
          margin,
          isLeader: index === 0,
          hasCompetition:
            ranked.length > 1,
        }),
      };
    }
  );
}

function getMatchingRules(
  protocol,
  hypothesisId,
  effect,
  observations
) {
  return protocol.rules.filter(
    (rule) =>
      rule.hypothesis === hypothesisId &&
      rule.effect === effect &&
      observations.some(
        (obs) =>
          obs.structure === rule.structure &&
          obs.value === rule.value
      )
  );
}
