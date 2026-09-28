const RESEARCH_EXPORT_FORMAT = "labsed-research-session";
const RESEARCH_EXPORT_VERSION = 1;

export function createResearchSessionExport(report, protocol) {
  if (!report || !protocol) {
    return null;
  }

  return {
    format: RESEARCH_EXPORT_FORMAT,
    version: RESEARCH_EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    privacy: {
      containsPersonalData: false,
      note: "Exportação local sem identificação nominal de estudante.",
    },
    protocol: {
      id: protocol.id,
      name: protocol.name,
      domain: protocol.domain,
    },
    observations: (report.observations ?? []).map((observation, index) => ({
      index: index + 1,
      structure: observation.structure,
      value: observation.value,
    })),
    hypotheses: (report.hypotheses ?? []).map((hypothesis) => ({
      id: hypothesis.id,
      name: hypothesis.name,
      rank: hypothesis.rank ?? null,
      score: hypothesis.score ?? 0,
      isLeader: Boolean(hypothesis.isLeader),
      isTied: Boolean(hypothesis.isTied),
      margin: hypothesis.margin ?? null,
      assessment: hypothesis.assessment?.label ?? hypothesis.confidence?.label ?? null,
      comparison: hypothesis.comparison?.label ?? null,
      evidenceCount: hypothesis.evidences?.length ?? 0,
      conflictCount: hypothesis.conflicts?.length ?? 0,
    })),
    decision: report.decision ?? null,
    conclusion: report.conclusion ?? null,
    leadingHypothesis: report.leadingHypothesis ?? null,
    competingHypothesis: report.competingHypothesis ?? null,
    tiedHypotheses: report.tiedHypotheses ?? [],
    history: report.history ?? [],
  };
}

export function serializeResearchSessionExport(report, protocol) {
  const data = createResearchSessionExport(report, protocol);
  return data ? JSON.stringify(data, null, 2) : null;
}

export function downloadResearchSessionExport(report, protocol) {
  const serialized = serializeResearchSessionExport(report, protocol);

  if (!serialized || typeof document === "undefined") {
    return false;
  }

  const file = new Blob([serialized], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `dados-pesquisa-${protocol.id}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);

  return true;
}
