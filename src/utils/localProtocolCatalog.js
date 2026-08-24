const STORAGE_KEY = "labsed.protocolos-locais.v1";

function resolveStorage(storage) {
  if (storage) return storage;
  if (typeof localStorage === "undefined") return null;
  return localStorage;
}

function loadEntries(storage) {
  try {
    const entries = JSON.parse(storage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(entries)
      ? entries.filter((entry) => entry?.protocol?.id)
      : [];
  } catch {
    return [];
  }
}

export function loadLocalProtocols(storage) {
  const target = resolveStorage(storage);
  if (!target) return [];

  return loadEntries(target)
    .filter((entry) => entry.protocol?.domain)
    .map((entry) => ({
      ...entry.protocol,
      localCatalogMetadata: entry.metadata,
    }));
}

export function saveLocalProtocol(protocol, storage) {
  const target = resolveStorage(storage);
  if (!target || !protocol?.id || !protocol?.domain) return false;

  const entries = loadEntries(target);
  const nextEntry = {
    protocol,
    metadata: {
      id: protocol.id,
      track: "Protocolos locais em revisão",
      stage: "Rascunho revisável",
      stageOrder: 90,
      order: Date.now(),
    },
  };
  const index = entries.findIndex(
    (entry) => entry.protocol.id === protocol.id
  );

  if (index >= 0) entries[index] = nextEntry;
  else entries.push(nextEntry);

  try {
    target.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
}
