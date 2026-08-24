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
  const [sessionNotice, setSessionNotice] =
    useState("");

  useEffect(() => {
    if (!selectedProtocol) {
      setSession(null);
      setSessionNotice("");
      return;
    }

    const persistedSession = loadPersistedSession(selectedProtocol);

    if (!persistedSession) {
      setSession(startSession(selectedProtocol));
      setSessionNotice(
        "Nova investigação iniciada para este protocolo."
      );
      return;
    }

    try {
      // Hipóteses, sugestões e conclusões são dados derivados. Recalculá-los
      // também protege contra sessões persistidas com um protocolo atualizado.
      setSession(runSession(persistedSession));
      setSessionNotice(
        "Investigação recuperada automaticamente deste navegador."
      );
    } catch {
      // Uma sessão antiga pode conter uma observação que deixou de existir no
      // protocolo. Nesse caso, começa-se uma investigação limpa e válida.
      clearPersistedSession(selectedProtocol.id);
      setSession(startSession(selectedProtocol));
      setSessionNotice(
        "A sessão anterior não era compatível; uma nova investigação foi iniciada."
      );
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
    setSessionNotice(
      "Investigação reiniciada e sessão anterior removida deste navegador."
    );
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
      setSessionNotice(
        "Caso carregado e investigação recalculada."
      );
    } catch {
      setSession(startSession(selectedProtocol));
      setSessionNotice(
        "Não foi possível carregar o caso; uma nova investigação foi iniciada."
      );
    }
  }

  function finalizeInvestigationSession() {
    setSession((currentSession) =>
      currentSession ? finalizeSession(currentSession) : currentSession
    );
    setSessionNotice(
      "Investigação encerrada pelo aluno. O relatório final foi gerado."
    );
  }

  function reopenInvestigationSession() {
    setSession((currentSession) =>
      currentSession ? reopenSession(currentSession) : currentSession
    );
    setSessionNotice("Investigação reaberta para novas observações.");
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
    setSessionNotice("Nova investigação iniciada. A investigação anterior foi arquivada.");
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
    setSessionNotice("Investigação anterior restaurada para edição.");
  }

  return {
    session,
    investigation,
    report,
    sessionNotice,
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
