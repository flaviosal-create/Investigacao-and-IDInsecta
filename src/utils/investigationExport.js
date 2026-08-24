const SNAPSHOT_FORMAT = "labsed-investigacao-session";
const SNAPSHOT_VERSION = 1;

export function createInvestigationSnapshot(report, protocol) {
  if (!report || !protocol) {
    return null;
  }

  return {
    format: SNAPSHOT_FORMAT,
    version: SNAPSHOT_VERSION,
    protocolId: protocol.id,
    protocolName: protocol.name,
    exportedAt: new Date().toISOString(),
    observations: (report.observations ?? []).map(
      ({ structure, value }) => [structure, value]
    ),
  };
}

export function serializeInvestigationSnapshot(report, protocol) {
  const snapshot = createInvestigationSnapshot(report, protocol);
  return snapshot ? JSON.stringify(snapshot, null, 2) : null;
}

export function parseInvestigationSnapshot(serialized, protocol) {
  const snapshot = JSON.parse(serialized);

  if (
    snapshot?.format !== SNAPSHOT_FORMAT ||
    snapshot?.version !== SNAPSHOT_VERSION
  ) {
    throw new Error("O arquivo não é um snapshot de investigação do LABSED.");
  }

  if (!protocol || snapshot.protocolId !== protocol.id) {
    throw new Error("O arquivo pertence a outro protocolo investigativo.");
  }

  if (
    !Array.isArray(snapshot.observations) ||
    snapshot.observations.some(
      (observation) =>
        !Array.isArray(observation) ||
        observation.length !== 2 ||
        !observation[0] ||
        !observation[1]
    )
  ) {
    throw new Error("O arquivo não contém observações válidas.");
  }

  return snapshot.observations;
}

export function downloadInvestigationSnapshot(report, protocol) {
  const serialized = serializeInvestigationSnapshot(report, protocol);

  if (!serialized || typeof document === "undefined") {
    return false;
  }

  const file = new Blob([serialized], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `investigacao-${protocol.id}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);

  return true;
}
