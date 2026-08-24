import test from "node:test";
import assert from "node:assert/strict";

import {
  suggestNextProtocol,
} from "../src/engine/ProtocolGraphEngine.js";

test(
  "sugere um protocolo relacionado após conclusão sustentada",
  () => {
    const suggestion = suggestNextProtocol(
      "familias-angiospermas-brasil-v1",
      {
        conclusion: {
          status: "concluida",
        },
        hypotheses: [
          {
            id: "fabaceae",
            name: "Fabaceae",
          },
        ],
      }
    );

    assert.deepEqual(suggestion, {
      basedOn: "fabaceae",
      nextProtocol: "generos-fabaceae-brasil-v1",
      name: "Gêneros Selecionados de Fabaceae",
      description:
        "Primeiro recorte em nível de gênero dentro de Fabaceae, com gêneros relevantes no Brasil e sustentados por combinações de hábito, folhas, flores, estruturas reprodutivas e fruto.",
      reason:
        "A conclusão atual sustenta Fabaceae. Se desejar aprofundar a investigação, o protocolo seguinte explora um novo universo de hipóteses relacionado a essa conclusão.",
    });
  }
);

test(
  "nao sugere continuidade antes da conclusão",
  () => {
    assert.equal(
      suggestNextProtocol(
        "familias-angiospermas-brasil-v1",
        {
          conclusion: {
            status: "em_andamento",
          },
          hypotheses: [
            {
              id: "fabaceae",
              name: "Fabaceae",
            },
          ],
        }
      ),
      null
    );
  }
);

test(
  "sugere aprofundamento histológico para um tecido concluído",
  () => {
    const suggestion = suggestNextProtocol(
      "tecidos-basicos-v1",
      {
        conclusion: {
          status: "concluida",
        },
        hypotheses: [
          {
            id: "tecido_muscular",
            name: "Tecido muscular",
          },
        ],
      }
    );

    assert.equal(
      suggestion?.nextProtocol,
      "musculo-liso-estriado-v1"
    );
    assert.equal(
      suggestion?.name,
      "Aprofundamento em Músculo"
    );
  }
);

test(
  "encadeia filo de invertebrados para classes e Insecta para ordens",
  () => {
    const classSuggestion = suggestNextProtocol(
      "grupos-invertebrados-v1",
      {
        conclusion: { status: "concluida" },
        hypotheses: [
          { id: "arthropoda", name: "Arthropoda" },
        ],
      }
    );
    const orderSuggestion = suggestNextProtocol(
      "classes-arthropoda-v1",
      {
        conclusion: { status: "concluida" },
        hypotheses: [
          { id: "insecta", name: "Insecta" },
        ],
      }
    );

    assert.equal(
      classSuggestion?.nextProtocol,
      "classes-arthropoda-v1"
    );
    assert.equal(
      orderSuggestion?.nextProtocol,
      "ordens-insecta-v1"
    );
  }
);

test(
  "nao sugere protocolo quando a hipótese não possui ligação",
  () => {
    assert.equal(
      suggestNextProtocol(
        "familias-angiospermas-brasil-v1",
        {
          conclusion: {
            status: "concluida",
          },
          hypotheses: [
            {
              id: "solanaceae",
              name: "Solanaceae",
            },
          ],
        }
      ),
      null
    );
  }
);
