import { ordensInsectaV1 } from "../src/protocols/zoologia/ordensInsectaV1.js";
import { getEffectiveRuleWeight } from "../src/protocols/scoring.js";

const summary =
  analyzeProtocolBalance(
    ordensInsectaV1
  );

console.log(
  JSON.stringify(
    summary,
    null,
    2
  )
);

function analyzeProtocolBalance(
  protocol
) {
  const structureSummary =
    summarizeByStructure(
      protocol
    );

  const hypothesisSummary =
    summarizeByHypothesis(
      protocol
    );

  const valueCoverage =
    summarizeValueCoverage(
      protocol
    );

  const flaggedValues =
    valueCoverage.filter(
      isFragileValueSignal
    );

  return {
    protocolId: protocol.id,
    totalHypotheses:
      protocol.hypotheses.length,
    totalRules:
      protocol.rules.length,
    structureSummary,
    hypothesisSummary,
    valueCoverage,
    flaggedStructures:
      structureSummary.filter(
        isImbalanced
      ),
    flaggedHypotheses:
      hypothesisSummary.filter(
        isImbalanced
      ),
    flaggedValues,
    recommendations:
      buildRecommendations({
        structureSummary,
        hypothesisSummary,
        flaggedValues,
      }),
  };
}

function summarizeByStructure(
  protocol
) {
  const grouped =
    new Map();

  protocol.rules.forEach((rule) => {
    const current =
      grouped.get(
        rule.structure
      ) ?? createBucket(
        rule.structure
      );

    applyRuleToBucket(
      current,
      rule,
      protocol
    );

    grouped.set(
      rule.structure,
      current
    );
  });

  return Array.from(
    grouped.values()
  ).map(enrichBucket);
}

function summarizeByHypothesis(
  protocol
) {
  return protocol.hypotheses.map(
    (hypothesis) => {
      const bucket =
        createBucket(
          hypothesis.id
        );

      protocol.rules
        .filter(
          (rule) =>
            rule.hypothesis ===
            hypothesis.id
        )
        .forEach((rule) => {
          applyRuleToBucket(
            bucket,
            rule,
            protocol
          );
        });

      return {
        ...enrichBucket(bucket),
        positiveStructures:
          new Set(
            protocol.rules
              .filter(
                (rule) =>
                  rule.hypothesis ===
                    hypothesis.id &&
                  rule.effect ===
                    "positive"
              )
              .map(
                (rule) =>
                  rule.structure
              )
          ).size,
        strongestPositive:
          findStrongestRule(
            protocol.rules,
            hypothesis.id,
            "positive"
          ),
      };
    }
  );
}

function summarizeValueCoverage(
  protocol
) {
  return protocol.observations.flatMap(
    (observation) =>
      observation.values.map(
        (value) => {
          const positiveRules =
            protocol.rules.filter(
              (rule) =>
                rule.structure ===
                  observation.structure &&
                rule.value === value &&
                rule.effect ===
                  "positive"
            );

          const negativeRules =
            protocol.rules.filter(
              (rule) =>
                rule.structure ===
                  observation.structure &&
                rule.value === value &&
                rule.effect ===
                  "negative"
            );

          return {
            structure:
              observation.structure,
            value,
            positiveHypotheses:
              new Set(
                positiveRules.map(
                  (rule) =>
                    rule.hypothesis
                )
              ).size,
            negativeHypotheses:
              new Set(
                negativeRules.map(
                  (rule) =>
                    rule.hypothesis
                )
              ).size,
            strongestPositive:
              positiveRules.reduce(
                (
                  strongest,
                  rule
                ) =>
                  strongest &&
                  strongest.weight >=
                    rule.weight
                    ? strongest
                    : {
                        hypothesis:
                          rule.hypothesis,
                        weight:
                          rule.weight,
                      },
                null
              ),
          };
        }
      )
  );
}

function createBucket(name) {
  return {
    name,
    positiveWeight: 0,
    negativeWeight: 0,
    positiveRules: 0,
    negativeRules: 0,
  };
}

function applyRuleToBucket(
  bucket,
  rule,
  protocol
) {
  if (
    rule.effect === "positive"
  ) {
    bucket.positiveWeight +=
      rule.weight;
    bucket.positiveRules += 1;
    return;
  }

  bucket.negativeWeight +=
    getEffectiveRuleWeight(
      protocol,
      rule
    );
  bucket.negativeRules += 1;
}

function enrichBucket(bucket) {
  const ratio =
    bucket.negativeWeight === 0
      ? null
      : Number(
          (
            bucket.positiveWeight /
            bucket.negativeWeight
          ).toFixed(2)
        );

  return {
    ...bucket,
    ratio,
  };
}

function findStrongestRule(
  rules,
  hypothesisId,
  effect
) {
  return rules
    .filter(
      (rule) =>
        rule.hypothesis ===
          hypothesisId &&
        rule.effect === effect
    )
    .reduce(
      (strongest, rule) =>
        strongest &&
        strongest.weight >=
          rule.weight
          ? strongest
          : {
              structure:
                rule.structure,
              value: rule.value,
              weight: rule.weight,
            },
      null
    );
}

function isImbalanced(bucket) {
  if (
    bucket.negativeWeight === 0
  ) {
    return false;
  }

  return (
    bucket.positiveWeight <
    bucket.negativeWeight / 2
  );
}

function buildRecommendations({
  structureSummary,
  hypothesisSummary,
  flaggedValues,
}) {
  const recommendations =
    [];

  structureSummary
    .filter(isImbalanced)
    .forEach((structure) => {
      recommendations.push(
        `Revisar pesos negativos de ${structure.name}: proporcao positiva/negativa em ${structure.ratio}.`
      );
    });

  hypothesisSummary
    .filter(
      (hypothesis) =>
        hypothesis.positiveStructures <
          4 ||
        !hypothesis.strongestPositive ||
        hypothesis.strongestPositive
          .weight < 4
    )
    .forEach((hypothesis) => {
      recommendations.push(
        `Fortalecer ancora positiva de ${hypothesis.name}: cobertura em ${hypothesis.positiveStructures} estruturas.`
      );
    });

  flaggedValues.forEach((value) => {
    recommendations.push(
      `Reforcar sinal de ${value.structure}=${value.value}: ancora positiva atual esta fraca.`
    );
  });

  return recommendations;
}

function isFragileValueSignal(
  value
) {
  if (
    value.positiveHypotheses === 0
  ) {
    return true;
  }

  if (
    value.positiveHypotheses === 1
  ) {
    return (
      !value.strongestPositive ||
      value.strongestPositive
        .weight < 4
    );
  }

  return false;
}
