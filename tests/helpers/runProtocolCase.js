import {
  startInvestigation,
  addObservation,
  runInvestigation,
} from "../../src/engine/investigationEngine.js";

export function runProtocolCase(
  protocol,
  observations
) {
  let investigation =
    startInvestigation(
      protocol.id
    );

  observations.forEach(
    ([structure, value]) => {
      investigation =
        addObservation(
          investigation,
          {
            structure,
            value,
          },
          protocol
        );
    }
  );

  return runInvestigation(
    investigation,
    protocol
  );
}
