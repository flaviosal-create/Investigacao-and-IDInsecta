import test from "node:test";
import assert from "node:assert/strict";

import {
  buildProtocolOrientation,
  buildScopeMessage,
  protocols,
  getProtocolMetadata,
} from "../src/config/protocolCatalog.js";
import {
  buildSupportContent,
} from "../src/config/supportContent.js";
import { tecidosBasicosV1 } from "../src/protocols/histologia/tecidosBasicosV1.js";
import { orgaosHistologicosV1 } from "../src/protocols/histologia/orgaosHistologicosV1.js";
import { epiteliosRevestimentoV1 } from "../src/protocols/histologia/epiteliosRevestimentoV1.js";
import { musculoLisoEstriadoV1 } from "../src/protocols/histologia/musculoLisoEstriadoV1.js";
import { conjuntivoFrouxoDensoV1 } from "../src/protocols/histologia/conjuntivoFrouxoDensoV1.js";
import { getCalibrationCasesForProtocol } from "../src/protocols/zoologia/calibrationCasesV1.js";

test(
  "metadados do catalogo tratam protocolos como universos autonomos",
  () => {
    assert.equal(
      getProtocolMetadata(
        tecidosBasicosV1.id
      )?.track,
      "Universo autônomo"
    );
    assert.equal(
      getProtocolMetadata(
        orgaosHistologicosV1.id
      )?.track,
      "Universo autônomo"
    );
  }
);

test(
  "orientacao de histologia nao transforma tecido em etapa obrigatoria para orgao",
  () => {
    assert.match(
      buildProtocolOrientation(
        tecidosBasicosV1
      ),
      /sem exigir continuação automática para órgão/i
    );
    assert.match(
      buildProtocolOrientation(
        orgaosHistologicosV1
      ),
      /investiga órgãos como hipóteses centrais/i
    );
  }
);

test(
  "mensagem de escopo reforca autonomia da investigacao atual",
  () => {
    assert.match(
      buildScopeMessage(
        orgaosHistologicosV1,
        null
      ),
      /sem depender de um protocolo anterior/i
    );

    assert.match(
      buildScopeMessage(
        tecidosBasicosV1,
        {
          conclusion: {
            status: "em_andamento",
          },
        }
      ),
      /evidências morfológicas observadas/i
    );
  }
);

test(
  "catalogo visivel de histologia reune universos sem separar orgaos por sistema",
  () => {
    const visibleHistologyProtocols =
      protocols.filter(
        (protocol) =>
          protocol.domain === "histologia"
      );

    const visibleIds =
      visibleHistologyProtocols.map(
        (protocol) => protocol.id
      );

    [
      tecidosBasicosV1.id,
      orgaosHistologicosV1.id,
      epiteliosRevestimentoV1.id,
      musculoLisoEstriadoV1.id,
      conjuntivoFrouxoDensoV1.id,
    ].forEach((protocolId) => {
      assert.ok(
        visibleIds.includes(protocolId),
        `Protocolo ausente no catálogo: ${protocolId}`
      );
    });
  }
);

test(
  "protocolo de tecidos reune tecidos classicos e especializacoes no mesmo universo",
  () => {
    const hypothesisIds =
      tecidosBasicosV1.hypotheses.map(
        (hypothesis) =>
          hypothesis.id
      );

    [
      "epitelio",
      "tecido_conjuntivo",
      "tecido_muscular",
      "tecido_nervoso",
      "tecido_cartilaginoso",
      "tecido_osseo",
      "tecido_adiposo",
      "sangue",
    ].forEach((hypothesisId) => {
      assert.ok(
        hypothesisIds.includes(
          hypothesisId
        ),
        `Hipotese ausente no universo de tecidos: ${hypothesisId}`
      );
    });
  }
);

test(
  "protocolo de orgaos mantem orgaos de diferentes sistemas no mesmo universo",
  () => {
    const hypothesisIds =
      orgaosHistologicosV1.hypotheses.map(
        (hypothesis) =>
          hypothesis.id
      );

    [
      "traqueia",
      "estomago",
      "rim",
      "testiculo",
      "coracao",
      "tireoide",
      "pancreas",
      "linfonodo",
      "baco",
    ].forEach((hypothesisId) => {
      assert.ok(
        hypothesisIds.includes(
          hypothesisId
        ),
        `Hipotese ausente no universo de orgaos: ${hypothesisId}`
      );
    });
  }
);

test(
  "apoio contextual acompanha os protocolos visiveis",
  () => {
    protocols.forEach((protocol) => {
      const support =
        buildSupportContent(protocol);

      assert.equal(
        support.concepts.length,
        protocol.observations.length
      );
      assert.ok(
        support.bibliography.length > 0,
        `Bibliografia ausente para ${protocol.id}`
      );
      assert.match(
        support.note,
        /\S/
      );
    });
  }
);

test(
  "todos os protocolos do catalogo possuem casos para revisao docente",
  () => {
    protocols.forEach((protocol) => {
      const cases = getCalibrationCasesForProtocol(protocol);

      assert.ok(
        cases.length > 0,
        `Calibração ausente para ${protocol.id}`
      );

      cases.forEach((scenario) => {
        assert.ok(
          scenario.observations?.length >= 1,
          `Caso sem observações: ${scenario.id}`
        );
      });
    });
  }
);
