const STORAGE_PREFIX =
  "labsed-investigacao:session:v2";
const LEGACY_STORAGE_PREFIX =
  "labsed-investigacao:session:v1";
const SESSION_VERSION = 2;

export function loadPersistedSession(
  protocol,
  storage = getLocalStorage()
) {
  if (!protocol || !storage) {
    return null;
  }

  try {
    const serialized =
      storage.getItem(getSessionKey(protocol.id)) ??
      storage.getItem(
        getSessionKey(protocol.id, LEGACY_STORAGE_PREFIX)
      );

    if (!serialized) {
      return null;
    }

    const snapshot = JSON.parse(serialized);

    if (!isValidSnapshot(snapshot, protocol.id)) {
      return null;
    }

    return {
      protocol,
      investigation: snapshot.investigation,
    };
  } catch {
    return null;
  }
}

export function saveSession(
  session,
  storage = getLocalStorage()
) {
  const protocolId = session?.protocol?.id;
  const investigation = session?.investigation;

  if (
    !storage ||
    !protocolId ||
    !investigation ||
    investigation.protocolId !== protocolId
  ) {
    return false;
  }

  try {
    storage.setItem(
      getSessionKey(protocolId),
      JSON.stringify({
        version: SESSION_VERSION,
        protocolId,
        investigation,
      })
    );

    return true;
  } catch {
    return false;
  }
}

export function clearPersistedSession(
  protocolId,
  storage = getLocalStorage()
) {
  if (!protocolId || !storage) {
    return false;
  }

  try {
    storage.removeItem(getSessionKey(protocolId));
    storage.removeItem(
      getSessionKey(protocolId, LEGACY_STORAGE_PREFIX)
    );
    return true;
  } catch {
    return false;
  }
}

function getSessionKey(
  protocolId,
  prefix = STORAGE_PREFIX
) {
  return `${prefix}:${protocolId}`;
}

function getLocalStorage() {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}

function isValidSnapshot(snapshot, protocolId) {
  const investigation = snapshot?.investigation;

  return (
    (snapshot?.version === 1 ||
      snapshot?.version === SESSION_VERSION) &&
    snapshot.protocolId === protocolId &&
    investigation?.protocolId === protocolId &&
    Array.isArray(investigation.observations) &&
    Array.isArray(investigation.history)
  );
}
