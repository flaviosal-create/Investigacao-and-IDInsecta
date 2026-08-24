import { ordensInsectaV1 } from "../src/protocols/zoologia/ordensInsectaV1.js";

function lintProtocol(
  protocol
) {
  const structures = new Map(
    protocol.observations.map(
      (observation) => [
        observation.structure,
        new Set(observation.values),
      ]
    )
  );

  const invalidStructures =
    protocol.rules.filter(
      (rule) =>
        !structures.has(
          rule.structure
        )
    );

  const invalidValues =
    protocol.rules.filter(
      (rule) =>
        structures.has(
          rule.structure
        ) &&
        !structures
          .get(rule.structure)
          .has(rule.value)
    );

  const duplicateRules =
    collectDuplicateRules(
      protocol.rules
    );

  return {
    invalidStructures,
    invalidValues,
    duplicateRules,
  };
}

function collectDuplicateRules(
  rules
) {
  const occurrences =
    new Map();

  rules.forEach((rule) => {
    const key = [
      rule.hypothesis,
      rule.structure,
      rule.value,
      rule.effect,
    ].join(":");

    const current =
      occurrences.get(key) ?? [];

    current.push(rule.weight);
    occurrences.set(key, current);
  });

  return Array.from(
    occurrences.entries()
  )
    .filter(
      ([, weights]) =>
        weights.length > 1
    )
    .map(
      ([key, weights]) => ({
        key,
        weights,
      })
    );
}

const result =
  lintProtocol(
    ordensInsectaV1
  );

if (
  result.invalidStructures.length >
    0 ||
  result.invalidValues.length > 0
) {
  console.error(
    JSON.stringify(result, null, 2)
  );
  process.exit(1);
}

if (
  result.duplicateRules.length > 0
) {
  console.warn(
    JSON.stringify(
      {
        warning:
          "Duplicate rules found.",
        duplicateRules:
          result.duplicateRules.slice(
            0,
            20
          ),
        duplicateRuleCount:
          result.duplicateRules.length,
      },
      null,
      2
    )
  );
}

console.log(
  JSON.stringify(
    {
      ok: true,
      invalidStructureCount:
        result.invalidStructures.length,
      invalidValueCount:
        result.invalidValues.length,
      duplicateRuleCount:
        result.duplicateRules.length,
    },
    null,
    2
  )
);
