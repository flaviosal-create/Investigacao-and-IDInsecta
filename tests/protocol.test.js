import test from "node:test";
import assert from "node:assert/strict";

import { ordensInsectaV1 } from "../src/protocols/zoologia/ordensInsectaV1.js";
import { tecidosBasicosV1 } from "../src/protocols/histologia/tecidosBasicosV1.js";
import { epiteliosRevestimentoV1 } from "../src/protocols/histologia/epiteliosRevestimentoV1.js";
import { musculoLisoEstriadoV1 } from "../src/protocols/histologia/musculoLisoEstriadoV1.js";
import { conjuntivoFrouxoDensoV1 } from "../src/protocols/histologia/conjuntivoFrouxoDensoV1.js";
import { orgaosHistologicosV1 } from "../src/protocols/histologia/orgaosHistologicosV1.js";
import { gruposInvertebradosV1 } from "../src/protocols/zoologia/gruposInvertebradosV1.js";
import {
  classesPoriferaV1,
  classesCnidariaV1,
  classesAnnelidaV1,
  classesMolluscaV1,
  classesArthropodaV1,
  classesEchinodermataV1,
} from "../src/protocols/zoologia/classesInvertebradosV1.js";

const protocols = [
  ordensInsectaV1,
  tecidosBasicosV1,
  epiteliosRevestimentoV1,
  musculoLisoEstriadoV1,
  conjuntivoFrouxoDensoV1,
  orgaosHistologicosV1,
  gruposInvertebradosV1,
  classesPoriferaV1,
  classesCnidariaV1,
  classesAnnelidaV1,
  classesMolluscaV1,
  classesArthropodaV1,
  classesEchinodermataV1,
];

test(
  "protocolos normalizados nao possuem regras duplicadas",
  () => {
    protocols.forEach((protocol) => {
      const keys = protocol.rules.map(
        (rule) =>
          [
            rule.hypothesis,
            rule.structure,
            rule.value,
            rule.effect,
          ].join(":")
      );

      assert.equal(
        new Set(keys).size,
        keys.length
      );
    });
  }
);

test(
  "toda regra aponta para estrutura e valor validos do protocolo",
  () => {
    protocols.forEach((protocol) => {
      const observationsByStructure =
        new Map(
          protocol.observations.map(
            (observation) => [
              observation.structure,
              observation,
            ]
          )
        );

      protocol.rules.forEach((rule) => {
        const observation =
          observationsByStructure.get(
            rule.structure
          );

        assert.ok(
          observation,
          `Estrutura ausente no protocolo ${protocol.id}: ${rule.structure}`
        );

        assert.ok(
          observation.values.includes(
            rule.value
          ),
          `Valor invalido em ${protocol.id}/${rule.structure}: ${rule.value}`
        );
      });
    });
  }
);

test(
  "cada hipotese possui ancora positiva forte e cobertura minima",
  () => {
    protocols.forEach((protocol) => {
      const minimumStructures =
        protocol.domain ===
        "histologia"
          ? 3
          : protocol.id.startsWith(
              "classes-"
            )
            ? 3
          : 4;

      protocol.hypotheses.forEach(
        (hypothesis) => {
          const positiveRules =
            protocol.rules.filter(
              (rule) =>
                rule.hypothesis ===
                  hypothesis.id &&
                rule.effect ===
                  "positive"
            );

          const positiveStructures =
            new Set(
              positiveRules.map(
                (rule) =>
                  rule.structure
              )
            );

          const strongestWeight =
            positiveRules.reduce(
              (
                strongest,
                rule
              ) =>
                Math.max(
                  strongest,
                  rule.weight
                ),
              0
            );

          assert.ok(
            positiveStructures.size >=
              minimumStructures,
            `${protocol.id}/${hypothesis.id} cobre poucas estruturas positivas`
          );

          assert.ok(
            strongestWeight >= 4,
            `${protocol.id}/${hypothesis.id} nao possui ancora forte`
          );
        }
      );
    });
  }
);

test(
  "cada valor observavel participa de pelo menos uma regra positiva",
  () => {
    protocols.forEach((protocol) => {
      protocol.observations.forEach(
        (observation) => {
          observation.values.forEach(
            (value) => {
              const positiveRules =
                protocol.rules.filter(
                  (rule) =>
                    rule.structure ===
                      observation.structure &&
                    rule.value ===
                      value &&
                    rule.effect ===
                      "positive"
                );

              assert.ok(
                positiveRules.length >
                  0,
                `Valor sem suporte positivo em ${protocol.id}: ${observation.structure}=${value}`
              );
            }
          );
        }
      );
    });
  }
);
