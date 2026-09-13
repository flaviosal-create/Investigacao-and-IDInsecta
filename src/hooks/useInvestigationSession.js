import { useEffect, useMemo, useState } from "react";
import {
  startSession,
  addSessionObservation,
  removeSessionObservation,
  runSession,
  generateSessionReport,
  finalizeSession,
  reopenSession,
} from "../engine/sessionEngine.js";
import {
  clearPersistedSession,
  loadPersistedSession,
  saveSession,
} from "../utils/sessionPersistence.js";

export function useInvestigationSession(
  selectedProtocol
) {
  const [session, setSession] = useState(
    null
  );
  useEffect(() => {
    if (!selectedProtocol) {
      setSession(null);
      return;
    }

    const persistedSession = loadPersistedSession(selectedProtocol);

    if (!persistedSession) {
      setSession(startSession(selectedProtocol));
      return;
    }

    try {
      // Hipóteses, sugestões e conclusões são dados derivados. Recalculá-los
      // também protege contra sessões persistidas com um protocolo atualizado.
      setSession(runSession(persistedSession));
    } catch {
      // Uma sessão antiga pode conter uma observação que deixou de existir no
      // protocolo. Nesse caso, começa-se uma investigação limpa e válida.
      clearPersistedSession(selectedProtocol.id);
      setSession(startSession(selectedProtocol));
    }
  }, [selectedProtocol]);

  useEffect(() => {
    if (session) {
      saveSession(session);
    }
  }, [session]);

  const investigation =
    session?.investigation ?? null;
  const archivedInvestigations =
    session?.archivedInvestigations ?? [];
  const report = useMemo(
    () =>
      session
        ? generateSessionReport(session)
        : null,
    [session]
  );

  const activeObservationMap = useMemo(
    () =>
      new Map(
        (
          investigation?.observations ?? []
        ).map((observation) => [
          observation.structure,
          observation.value,
        ])
      ),
    [investigation]
  );

  function updateSessionWith(transform) {
    setSession((currentSession) => {
      if (!currentSession) {
        return currentSession;
      }

      const updatedSession =
        transform(currentSession);

      return runSession(
        updatedSession
      );
    });
  }

  function registerObservation(
    observation
  ) {
    updateSessionWith((currentSession) =>
      addSessionObservation(
        currentSession,
        observation
      )
    );
  }

  function unregisterObservation(
    structure
  ) {
    updateSessionWith((currentSession) =>
      removeSessionObservation(
        currentSession,
        structure
      )
    );
  }

  function resetSession() {
    if (!selectedProtocol) {
      return;
    }

    clearPersistedSession(selectedProtocol.id);
    setSession(startSession(selectedProtocol));
  }

  function loadObservations(observations) {
    if (!selectedProtocol || !Array.isArray(observations)) {
      return;
    }

    try {
      const loadedSession = observations.reduce(
        (nextSession, [structure, value]) =>
          addSessionObservation(nextSession, {
            structure,
            value,
          }),
        startSession(selectedProtocol)
      );

      setSession(runSession(loadedSession));
    } catch {
      setSession(startSession(selectedProtocol));
    }
  }

  function finalizeInvestigationSession() {
    setSession((currentSession) =>
      currentSession ? finalizeSession(currentSession) : currentSession
    );
  }

  function reopenInvestigationSession() {
    setSession((currentSession) =>
      currentSession ? reopenSession(currentSession) : currentSession
    );
  }

  function startNewInvestigationSession() {
    if (!selectedProtocol) return;

    setSession((currentSession) => {
      if (!currentSession) return currentSession;

      return {
        ...startSession(selectedProtocol),
        archivedInvestigations: [
          ...(currentSession.archivedInvestigations ?? []),
          currentSession.investigation,
        ],
      };
    });
  }

  function restoreArchivedInvestigation(index) {
    setSession((currentSession) => {
      const archived = currentSession?.archivedInvestigations ?? [];
      const selected = archived[index];
      if (!currentSession || !selected) return currentSession;

      return {
        ...currentSession,
        investigation: runSession({
          protocol: selectedProtocol,
          investigation: selected,
        }).investigation,
        archivedInvestigations: [
          ...archived.slice(0, index),
          ...archived.slice(index + 1),
          currentSession.investigation,
        ],
      };
    });
  }

  return {
    session,
    investigation,
    report,
    activeObservationMap,
    registerObservation,
    unregisterObservation,
    resetSession,
    loadObservations,
    finalizeInvestigation: finalizeInvestigationSession,
    reopenInvestigation: reopenInvestigationSession,
    startNewInvestigation: startNewInvestigationSession,
    restoreArchivedInvestigation,
    archivedInvestigations,
  };
}
