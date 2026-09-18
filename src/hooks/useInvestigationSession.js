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
import { getSpecimenCode } from "../utils/studyInstrumentation.js";

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
      return;
    }

    const persistedSession = loadPersistedSession(selectedProtocol);

    if (!persistedSession) {
      setSession(startSession(selectedProtocol, { specimenCode: getSpecimenCode(1) }));
      setSessionNotice(
        "Nova investigação iniciada para este protocolo."
      );
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
      setSession(startSession(selectedProtocol, { specimenCode: getSpecimenCode(1) }));
      setSessionNotice(
        "A sessão anterior não era compatível; uma nova investigação foi iniciada."
      );
    }
  }, [selectedProtocol]);

  useEffect(() => {
    if (session && !saveSession(session)) {
      setSessionNotice(
        "Não foi possível salvar a investigação neste navegador. Verifique o armazenamento disponível."
      );
    }
  }, [session]);

  const investigation =
    session?.investigation ?? null;
  const archivedInvestigations =
    session?.archivedInvestigations ?? [];
  const completedInvestigations =
    archivedInvestigations.filter((item) => item?.finalizedAt).length +
    (investigation?.finalizedAt ? 1 : 0);
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
    setSession(startSession(selectedProtocol, { specimenCode: getSpecimenCode(1) }));
    setSessionNotice(
      "Investigação reiniciada e sessão anterior removida deste navegador."
    );
  }

  function loadObservations(observations) {
    if (!selectedProtocol || !Array.isArray(observations)) {
      return;
    }

    try {
      const validObservations = observations.filter(
        (obs) =>
          Array.isArray(obs) &&
          obs.length >= 2 &&
          typeof obs[0] === "string" &&
          obs[0].length > 0 &&
          obs[1] !== undefined &&
          obs[1] !== null
      );

      const loadedSession = validObservations.reduce(
        (nextSession, [structure, value]) =>
          addSessionObservation(nextSession, {
            structure,
            value,
          }),
        startSession(selectedProtocol, { specimenCode: getSpecimenCode(1) })
      );

      setSession(runSession(loadedSession));
    } catch {
      setSession(startSession(selectedProtocol, { specimenCode: getSpecimenCode(1) }));
      setSessionNotice(
        "Não foi possível carregar o caso; uma nova investigação foi iniciada."
      );
    }
  }

  function transitionSession(transform, successNotice) {
    if (!session) {
      return false;
    }

    setSession((currentSession) =>
      currentSession ? transform(currentSession) : currentSession
    );
    setSessionNotice(successNotice);
    return true;
  }

  function finalizeInvestigationSession() {
    transitionSession(
      finalizeSession,
      "Investigação encerrada pelo aluno. O relatório final foi gerado."
    );
  }

  function reopenInvestigationSession() {
    transitionSession(
      reopenSession,
      "Investigação reaberta para novas observações."
    );
  }

  function startNewInvestigationSession() {
    if (!selectedProtocol) return;

    setSession((currentSession) => {
      if (!currentSession) return currentSession;

      return {
        ...startSession(selectedProtocol, { specimenCode: getSpecimenCode((currentSession.archivedInvestigations?.length ?? 0) + 1) }),
        archivedInvestigations: [
          ...(currentSession.archivedInvestigations ?? []),
          currentSession.investigation,
        ],
      };
    });
  }

  function restoreArchivedInvestigation(index) {
    if (!selectedProtocol) {
      setSessionNotice("Não foi possível restaurar a investigação selecionada.");
      return false;
    }

    const archived = session?.archivedInvestigations ?? [];
    const selected = archived[index];

    if (!session || !selected) {
      setSessionNotice("Não foi possível restaurar a investigação selecionada.");
      return false;
    }

    setSession((currentSession) => {
      const currentArchived = currentSession?.archivedInvestigations ?? [];
      const currentSelected = currentArchived[index];

      if (!currentSession || !currentSelected) {
        return currentSession;
      }

      return {
        ...currentSession,
        investigation: runSession({
          protocol: selectedProtocol,
          investigation: currentSelected,
        }).investigation,
        archivedInvestigations: [
          ...currentArchived.slice(0, index),
          ...currentArchived.slice(index + 1),
          currentSession.investigation,
        ],
      };
    });

    setSessionNotice("Investigação anterior restaurada para edição.");
    return true;
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
    completedInvestigations,
  };
}
