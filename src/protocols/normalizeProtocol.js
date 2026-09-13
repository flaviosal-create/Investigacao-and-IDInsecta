export function normalizeProtocol(
  protocol
) {
  return {
    ...protocol,
    rules: normalizeRules(
      filterConflictRules(protocol)
    ),
  };
}

function filterConflictRules(protocol) {
  const allowedConflicts =
    protocol.investigationPolicy
      ?.allowedConflictEvidence;

  if (!allowedConflicts) {
    return protocol.rules ?? [];
  }

  return (protocol.rules ?? []).filter((rule) => {
    if (rule.effect !== "negative") {
      return true;
    }

    return allowedConflicts.some(
      ({ structure, values }) =>
        rule.structure === structure &&
        values.includes(rule.value)
    );
  });
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
