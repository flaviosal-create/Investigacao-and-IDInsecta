import { useEffect, useMemo, useState } from "react";
import {
  domains,
  protocols,
  getProtocolMetadata as getOfficialProtocolMetadata,
} from "../config/protocolCatalog.js";
import {
  loadLocalProtocols,
  saveLocalProtocol,
} from "../utils/localProtocolCatalog.js";

export function useProtocolSelection() {
  const [selectedDomainId, setSelectedDomainId] = useState("zoologia");
  const [selectedProtocolId, setSelectedProtocolId] = useState("ordens-insecta-v1");
  const [localProtocols, setLocalProtocols] = useState(loadLocalProtocols);
  const allProtocols = useMemo(
    () => [...protocols, ...localProtocols],
    [localProtocols]
  );

  function getProtocolMetadata(protocolId) {
    return getOfficialProtocolMetadata(protocolId) ??
      allProtocols.find((protocol) => protocol.id === protocolId)
        ?.localCatalogMetadata ??
      null;
  }

  function compareAllProtocols(leftProtocol, rightProtocol) {
    const leftMetadata = getProtocolMetadata(leftProtocol.id);
    const rightMetadata = getProtocolMetadata(rightProtocol.id);
    const stageDifference =
      (leftMetadata?.stageOrder ?? 99) -
      (rightMetadata?.stageOrder ?? 99);

    if (stageDifference !== 0) return stageDifference;
    return (leftMetadata?.order ?? 99) - (rightMetadata?.order ?? 99);
  }

  const visibleProtocols = useMemo(
    () => allProtocols
      .filter((protocol) => protocol.domain === selectedDomainId)
      .sort(compareAllProtocols),
    [allProtocols, selectedDomainId]
  );

  useEffect(() => {
    if (!visibleProtocols.some((protocol) => protocol.id === selectedProtocolId)) {
      setSelectedProtocolId(visibleProtocols[0]?.id ?? null);
    }
  }, [selectedProtocolId, visibleProtocols]);

  const selectedProtocol = useMemo(
    () => allProtocols.find((protocol) => protocol.id === selectedProtocolId) ?? null,
    [allProtocols, selectedProtocolId]
  );

  const domainProtocols = useMemo(
    () => allProtocols
      .filter((protocol) => protocol.domain === selectedProtocol?.domain)
      .sort(compareAllProtocols),
    [allProtocols, selectedProtocol]
  );

  const groupedProtocols = useMemo(() => {
    const groups = new Map();

    visibleProtocols.forEach((protocol) => {
      const groupLabel = getProtocolMetadata(protocol.id)?.track ?? "Protocolos";
      if (!groups.has(groupLabel)) groups.set(groupLabel, []);
      groups.get(groupLabel).push(protocol);
    });

    return Array.from(groups.entries());
  }, [visibleProtocols, allProtocols]);

  function addLocalProtocol(protocol) {
    if (protocols.some((item) => item.id === protocol.id)) {
      return {
        ok: false,
        message: "Esse identificador já pertence a um protocolo oficial.",
      };
    }

    if (!saveLocalProtocol(protocol)) {
      return {
        ok: false,
        message: "Não foi possível salvar o protocolo neste navegador.",
      };
    }

    setLocalProtocols(loadLocalProtocols());
    return { ok: true };
  }

  return {
    domains,
    selectedDomainId,
    setSelectedDomainId,
    selectedProtocolId,
    setSelectedProtocolId,
    selectedProtocol,
    domainProtocols,
    groupedProtocols,
    getProtocolMetadata,
    addLocalProtocol,
  };
}
