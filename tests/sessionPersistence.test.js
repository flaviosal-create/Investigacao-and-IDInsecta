import test from "node:test";
import assert from "node:assert/strict";

import {
  clearPersistedSession,
  loadPersistedSession,
  saveSession,
} from "../src/utils/sessionPersistence.js";

function createStorage() {
  const values = new Map();

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

const protocol = {
  id: "protocolo-de-teste",
};

const session = {
  protocol,
  investigation: {
    id: "investigacao-1",
    protocolId: protocol.id,
    observations: [
      {
        structure: "asa",
        value: "elitro",
      },
    ],
    history: [],
  },
};

test(
  "persiste e recupera a investigacao do protocolo correto",
  () => {
    const storage = createStorage();

    assert.equal(saveSession(session, storage), true);
    assert.deepEqual(
      loadPersistedSession(protocol, storage),
      session
    );
  }
);

test(
  "nao recupera uma investigacao de outro protocolo",
  () => {
    const storage = createStorage();
    saveSession(session, storage);

    assert.equal(
      loadPersistedSession(
        { id: "outro-protocolo" },
        storage
      ),
      null
    );
  }
);

test(
  "limpa a investigacao persistida ao reiniciar a sessao",
  () => {
    const storage = createStorage();
    saveSession(session, storage);

    assert.equal(
      clearPersistedSession(protocol.id, storage),
      true
    );
    assert.equal(
      loadPersistedSession(protocol, storage),
      null
    );
  }
);

test(
  "ignora dados persistidos malformados",
  () => {
    const storage = createStorage();
    storage.setItem(
      "labsed-investigacao:session:v1:protocolo-de-teste",
      "{dados invalidos"
    );

    assert.equal(
      loadPersistedSession(protocol, storage),
      null
    );
  }
);

test(
  "recupera uma sessão legada v1 para migração",
  () => {
    const storage = createStorage();
    storage.setItem(
      "labsed-investigacao:session:v1:protocolo-de-teste",
      JSON.stringify({
        version: 1,
        protocolId: protocol.id,
        investigation: session.investigation,
      })
    );

    assert.deepEqual(
      loadPersistedSession(protocol, storage),
      session
    );
  }
);
