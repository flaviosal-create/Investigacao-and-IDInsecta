import {
  startInvestigation,
  addObservation,
  removeObservation,
  runInvestigation,
} from "./investigationEngine.js";

import {
  generateReport,
} from "./reportEngine.js";

export function startSession(
  protocol
) {
  return {
    protocol,
    investigation:
      startInvestigation(
        protocol.id
      ),
  };
}

export function addSessionObservation(
  session,
  observation
) {
  return {
    ...session,
    investigation:
      addObservation(
        session.investigation,
        observation,
        session.protocol
      ),
  };
}

export function removeSessionObservation(
  session,
  structure
) {
  return {
    ...session,
    investigation:
      removeObservation(
        session.investigation,
        structure
      ),
  };
}

export function runSession(
  session
) {
  return {
    ...session,
    investigation:
      runInvestigation(
        session.investigation,
        session.protocol
      ),
  };
}

export function generateSessionReport(
  session
) {
  return generateReport(
    session.investigation
  );
}
