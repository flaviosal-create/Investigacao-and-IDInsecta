import { getEffectiveRuleWeight } from "../protocols/scoring.js";

// One fixed scale for the whole protocol, independent of the current leader.
// The bar reflects the net evidence score, so conflicts can lower it even
// when the number of favorable observations has not changed.
export function getThermometerScale(protocol) {
  if (!protocol) return 0;
  const maximumByStructure = new Map();
  for (const rule of protocol.rules ?? []) {
    if (rule.effect !== "positive") continue;
    maximumByStructure.set(rule.structure, Math.max(
      maximumByStructure.get(rule.structure) ?? 0,
      getEffectiveRuleWeight(protocol, rule)
    ));
  }
  return [...maximumByStructure.values()].reduce((sum, weight) => sum + weight, 0);
}

export function getThermometerFill(score, scale) {
  if (scale <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round(score / scale * 100)));
}
