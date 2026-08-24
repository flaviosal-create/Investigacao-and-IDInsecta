import test from "node:test";
import assert from "node:assert/strict";

import {
  loadLocalProtocols,
  saveLocalProtocol,
} from "../src/utils/localProtocolCatalog.js";

function createMemoryStorage() {
  const values = new Map();
  return {
    getItem(key) {
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
  };
}

test(
  "salva protocolo local como rascunho revisável no navegador",
  () => {
    const storage = createMemoryStorage();
    const protocol = {
      id: "protocolo-local-v1",
      name: "Protocolo local",
      domain: "zoologia",
    };

    assert.equal(saveLocalProtocol(protocol, storage), true);

    const [saved] = loadLocalProtocols(storage);
    assert.equal(saved.id, protocol.id);
    assert.equal(
      saved.localCatalogMetadata.track,
      "Protocolos locais em revisão"
    );
  }
);

test(
  "atualiza o protocolo local com o mesmo identificador",
  () => {
    const storage = createMemoryStorage();

    saveLocalProtocol(
      { id: "protocolo-local-v1", name: "Versão inicial", domain: "zoologia" },
      storage
    );
    saveLocalProtocol(
      { id: "protocolo-local-v1", name: "Versão revisada", domain: "zoologia" },
      storage
    );

    const protocols = loadLocalProtocols(storage);
    assert.equal(protocols.length, 1);
    assert.equal(protocols[0].name, "Versão revisada");
  }
);
