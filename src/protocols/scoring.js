export function getEffectiveRuleWeight(
  protocol,
  rule
) {
  // The weight belongs to the observed evidence, never to the candidate.
  // Preserve the protocol's scale while sharing each evidence's strongest
  // declared weight across hypotheses with the same compatibility response.
  const weight = protocol.investigationPolicy?.scoringMode === "shared-evidence"
    ? Math.max(...protocol.rules.filter((candidate) =>
        candidate.structure === rule.structure &&
        candidate.value === rule.value && candidate.effect === rule.effect
      ).map((candidate) => candidate.weight))
    : rule.weight;
  if (
    rule.effect !== "negative"
  ) {
    return weight;
  }

  const observation =
    protocol.observations.find(
      (item) =>
        item.structure ===
        rule.structure
    );

  const factor =
    observation
      ?.negativeWeightFactor ??
    1;

  return Number(
    (weight * factor).toFixed(
      2
    )
  );
}
