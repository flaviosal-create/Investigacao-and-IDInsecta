export function getEffectiveRuleWeight(
  protocol,
  rule
) {
  if (
    rule.effect !== "negative"
  ) {
    return rule.weight;
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
    (rule.weight * factor).toFixed(
      2
    )
  );
}
