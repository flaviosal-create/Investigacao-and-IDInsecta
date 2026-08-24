import { conjuntivoFrouxoDensoV1 } from "../src/protocols/histologia/conjuntivoFrouxoDensoV1.js";
import {
  connectiveRepresentativeCases,
  connectiveAmbiguousCases,
  connectiveMixedCases,
} from "../tests/fixtures/connectiveCases.js";
import { runProtocolCase } from "../tests/helpers/runProtocolCase.js";

const report =
  buildProtocolCaseReport(
    conjuntivoFrouxoDensoV1
  );

console.log(
  JSON.stringify(
    report,
    null,
    2
  )
);

function buildProtocolCaseReport(
  protocol
) {
  const representativeResults =
    connectiveRepresentativeCases.map(
      (testCase) =>
        analyzeRepresentativeCase(
          protocol,
          testCase
        )
    );

  const ambiguousResults =
    connectiveAmbiguousCases.map(
      (testCase) =>
        analyzeAmbiguousCase(
          protocol,
          testCase
        )
    );

  const mixedResults =
    connectiveMixedCases.map(
      (testCase) =>
        analyzeMixedCase(
          protocol,
          testCase
        )
    );

  return {
    protocolId: protocol.id,
    representativeSummary:
      summarizeRepresentativeResults(
        representativeResults
      ),
    ambiguousSummary:
      summarizeAmbiguousResults(
        ambiguousResults
      ),
    mixedSummary:
      summarizeMixedResults(
        mixedResults
      ),
    weakestRepresentativeCases:
      representativeResults
        .slice()
        .sort(
          (a, b) =>
            a.margin - b.margin
        )
        .slice(0, 5),
    representativeResults,
    ambiguousResults,
    mixedResults,
  };
}

function analyzeRepresentativeCase(
  protocol,
  testCase
) {
  const investigation =
    runProtocolCase(
      protocol,
      testCase.observations
    );

  const leader =
    investigation.hypotheses[0];
  const runnerUp =
    investigation.hypotheses[1];

  return {
    type: "representative",
    expected:
      testCase.expected,
    leader: leader.id,
    runnerUp:
      runnerUp?.id ?? null,
    matched:
      leader.id ===
      testCase.expected,
    score: leader.score,
    margin:
      leader.margin ?? null,
    confidence:
      leader.confidence.level,
    conclusion:
      investigation.conclusion
        ?.status ?? null,
    suggestion:
      investigation.suggestion
        ?.structure ?? null,
  };
}

function analyzeAmbiguousCase(
  protocol,
  testCase
) {
  const investigation =
    runProtocolCase(
      protocol,
      testCase.observations
    );

  const leader =
    investigation.hypotheses[0];
  const runnerUp =
    investigation.hypotheses[1];

  return {
    type: "ambiguous",
    id: testCase.id,
    leader: leader.id,
    runnerUp:
      runnerUp?.id ?? null,
    matchedLeader:
      leader.id ===
      testCase.expectedLeader,
    matchedRunnerUp:
      runnerUp?.id ===
      testCase.expectedRunnerUp,
    margin:
      leader.margin ?? null,
    confidence:
      leader.confidence.level,
    conclusion:
      investigation.conclusion
        ?.status ?? null,
    decision:
      investigation.decision
        ?.status ?? null,
    suggestion:
      investigation.suggestion
        ?.structure ?? null,
  };
}

function analyzeMixedCase(
  protocol,
  testCase
) {
  const investigation =
    runProtocolCase(
      protocol,
      testCase.observations
    );

  const leader =
    investigation.hypotheses[0];
  const runnerUp =
    investigation.hypotheses[1];

  return {
    type: "mixed",
    id: testCase.id,
    leader: leader.id,
    runnerUp:
      runnerUp?.id ?? null,
    matchedLeader:
      leader.id ===
      testCase.expectedLeader,
    margin:
      leader.margin ?? null,
    confidence:
      leader.confidence.level,
    conclusion:
      investigation.conclusion
        ?.status ?? null,
    decision:
      investigation.decision
        ?.status ?? null,
    suggestion:
      investigation.suggestion
        ?.structure ?? null,
  };
}

function summarizeRepresentativeResults(
  results
) {
  const matched =
    results.filter(
      (result) => result.matched
    ).length;

  const averageMargin =
    Number(
      (
        results.reduce(
          (total, result) =>
            total + result.margin,
          0
        ) / results.length
      ).toFixed(2)
    );

  const disputed =
    results.filter(
      (result) =>
        result.confidence ===
        "disputada"
    ).length;

  return {
    total: results.length,
    matched,
    accuracy:
      Number(
        (
          matched /
          results.length
        ).toFixed(2)
      ),
    averageMargin,
    disputed,
  };
}

function summarizeAmbiguousResults(
  results
) {
  return {
    total: results.length,
    preservedOpenState:
      results.filter(
        (result) =>
          result.conclusion !==
            "concluida" &&
          result.decision ===
            "continuar"
      ).length,
    withSuggestion:
      results.filter(
        (result) =>
          result.suggestion
      ).length,
  };
}

function summarizeMixedResults(
  results
) {
  return {
    total: results.length,
    matchedLeader:
      results.filter(
        (result) =>
          result.matchedLeader
      ).length,
    preservedOpenState:
      results.filter(
        (result) =>
          result.conclusion !==
            "concluida" &&
          result.decision ===
            "continuar"
      ).length,
    withSuggestion:
      results.filter(
        (result) =>
          result.suggestion
      ).length,
  };
}
