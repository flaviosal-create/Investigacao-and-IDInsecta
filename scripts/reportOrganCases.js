import { orgaosHistologicosV1 } from "../src/protocols/histologia/orgaosHistologicosV1.js";
import {
  organRepresentativeCases,
  organAmbiguousCases,
  organMixedCases,
  organStressCases,
  organResolutionCases,
} from "../tests/fixtures/organCases.js";
import { runProtocolCase } from "../tests/helpers/runProtocolCase.js";

const report =
  buildProtocolCaseReport(
    orgaosHistologicosV1
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
    organRepresentativeCases.map(
      (testCase) =>
        analyzeRepresentativeCase(
          protocol,
          testCase
        )
    );

  const ambiguousResults =
    organAmbiguousCases.map(
      (testCase) =>
        analyzeAmbiguousCase(
          protocol,
          testCase
        )
    );

  const mixedResults =
    organMixedCases.map(
      (testCase) =>
        analyzeMixedCase(
          protocol,
          testCase
        )
    );

  const stressResults =
    organStressCases.map(
      (testCase) =>
        analyzeStressCase(
          protocol,
          testCase
        )
    );

  const resolutionResults =
    organResolutionCases.map(
      (testCase) =>
        analyzeRepresentativeCase(
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
    stressSummary:
      summarizeStressResults(
        stressResults
      ),
    resolutionSummary:
      summarizeRepresentativeResults(
        resolutionResults
      ),
    weakestRepresentativeCases:
      representativeResults
        .slice()
        .sort(
          (a, b) =>
            a.margin - b.margin
        )
        .slice(0, 8),
    mostCrowdedAmbiguousCases:
      ambiguousResults
        .slice()
        .sort(
          (a, b) =>
            a.margin - b.margin
        )
        .slice(0, 8),
    representativeResults,
    ambiguousResults,
    mixedResults,
    stressResults,
    resolutionResults,
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
    id: testCase.id,
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
    decision:
      investigation.decision
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

function analyzeStressCase(
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
    type: "stress",
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

function summarizeRepresentativeResults(
  results
) {
  const matched =
    results.filter(
      (result) => result.matched
    ).length;

  return {
    total: results.length,
    matched,
    matchRate: Number(
      (
        matched /
        results.length
      ).toFixed(2)
    ),
    averageMargin: averageOf(
      results,
      "margin"
    ),
  };
}

function summarizeAmbiguousResults(
  results
) {
  const matchedLeader =
    results.filter(
      (result) =>
        result.matchedLeader
    ).length;
  const matchedRunnerUp =
    results.filter(
      (result) =>
        result.matchedRunnerUp
    ).length;

  return {
    total: results.length,
    matchedLeader,
    matchedRunnerUp,
    averageMargin: averageOf(
      results,
      "margin"
    ),
  };
}

function summarizeMixedResults(
  results
) {
  const matchedLeader =
    results.filter(
      (result) =>
        result.matchedLeader
    ).length;

  const confidenceProfile =
    results.reduce(
      (profile, result) => {
        profile[
          result.confidence
        ] =
          (profile[
            result.confidence
          ] ?? 0) + 1;
        return profile;
      },
      {}
    );

  return {
    total: results.length,
    matchedLeader,
    averageMargin: averageOf(
      results,
      "margin"
    ),
    confidenceProfile,
  };
}

function summarizeStressResults(
  results
) {
  const matchedLeader =
    results.filter(
      (result) =>
        result.matchedLeader
    ).length;
  const matchedRunnerUp =
    results.filter(
      (result) =>
        result.matchedRunnerUp
    ).length;
  const nonConclusive =
    results.filter(
      (result) =>
        result.conclusion !==
        "concluida"
    ).length;

  const confidenceProfile =
    results.reduce(
      (profile, result) => {
        profile[
          result.confidence
        ] =
          (profile[
            result.confidence
          ] ?? 0) + 1;
        return profile;
      },
      {}
    );

  return {
    total: results.length,
    matchedLeader,
    matchedRunnerUp,
    nonConclusive,
    averageMargin: averageOf(
      results,
      "margin"
    ),
    confidenceProfile,
  };
}

function averageOf(
  results,
  key
) {
  return Number(
    (
      results.reduce(
        (total, result) =>
          total +
          (result[key] ?? 0),
        0
      ) / results.length
    ).toFixed(2)
  );
}
