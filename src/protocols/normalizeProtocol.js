export function normalizeProtocol(
  protocol
) {
  return {
    ...protocol,
    rules: normalizeRules(
      protocol.rules ?? []
    ),
  };
}

function normalizeRules(
  rules
) {
  const uniqueRules =
    new Map();

  rules.forEach((rule) => {
    const key = [
      rule.hypothesis,
      rule.structure,
      rule.value,
      rule.effect,
    ].join(":");

    const current =
      uniqueRules.get(key);

    if (
      !current ||
      rule.weight > current.weight
    ) {
      uniqueRules.set(key, rule);
    }
  });

  return Array.from(
    uniqueRules.values()
  );
}
