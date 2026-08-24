import { normalizeProtocol } from "../normalizeProtocol.js";

export function createProfileProtocol({
  id,
  name,
  description,
  observations,
  hypotheses,
  profiles,
  references = [],
  pedagogicalNote =
    "Este protocolo compara hipóteses dentro de um recorte didático. As observações sustentam ou enfraquecem interpretações; não constituem uma chave de identificação.",
  investigationPolicy = {
    minimumObservedStructuresForConclusion: 3,
    minimumSupportingStructuresForConclusion: 3,
    preferDiscriminativeSuggestion: true,
    requireNoLeaderConflictsForConclusion: true,
  },
  generateNegativeRules = true,
}) {
  return normalizeProtocol({
    id,
    name,
    domain: "zoologia",
    description,
    references,
    investigationPolicy,
    pedagogicalNote,
    observations,
    hypotheses,
    rules: hypotheses.flatMap((hypothesis) => {
      const profile = profiles[hypothesis.id] ?? {};

      return observations.flatMap((observation) => {
        const entries = normalizeProfileEntries(
          profile[observation.structure]
        );

        if (!entries.length) {
          return [];
        }

        const expectedValues = entries.map(
          ([value]) => value
        );
        const negativeWeight = Math.max(
          ...entries.map(([, weight]) => weight)
        );

        return [
          ...entries.map(([value, weight]) => ({
            hypothesis: hypothesis.id,
            structure: observation.structure,
            value,
            effect: "positive",
            weight,
          })),
          ...(generateNegativeRules
            ? observation.values
                .filter(
                  (value) => !expectedValues.includes(value)
                )
                .map((value) => ({
                  hypothesis: hypothesis.id,
                  structure: observation.structure,
                  value,
                  effect: "negative",
                  weight: negativeWeight,
                }))
            : []),
        ];
      });
    }),
  });
}

function normalizeProfileEntries(entry) {
  if (!entry) {
    return [];
  }

  return Array.isArray(entry[0])
    ? entry
    : [entry];
}
