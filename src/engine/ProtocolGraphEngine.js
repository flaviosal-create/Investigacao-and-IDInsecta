import { protocolGraph }
  from "../config/protocolGraph.js";
import { getProtocolById }
  from "../config/protocolCatalog.js";

export function
suggestNextProtocol(
  protocolId,
  investigation
) {
  const leader =
    investigation?.hypotheses?.[0];

  if (!leader) {
    return null;
  }

  if (
    protocolId === "ordens-insecta-v1" &&
    !investigation?.finalizedAt
  ) {
    return null;
  }

  if (
    protocolId !== "ordens-insecta-v1" &&
    investigation?.conclusion?.status !== "concluida"
  ) {
    return null;
  }

  const nextProtocol =
    protocolGraph?.[
      protocolId
    ]?.[leader.id];

  if (!nextProtocol) {
    return null;
  }

  const targetProtocol =
    getProtocolById(nextProtocol);

  if (!targetProtocol) {
    return null;
  }

  return {
    basedOn:
      leader.id,

    nextProtocol,

    name: targetProtocol.name,

    description:
      targetProtocol.description,

    reason:
      `A conclusão atual sustenta ${leader.name}. Se desejar aprofundar a investigação, o protocolo seguinte explora um novo universo de hipóteses relacionado a essa conclusão.`,
  };
}
