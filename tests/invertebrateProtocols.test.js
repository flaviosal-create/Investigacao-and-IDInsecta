import test from "node:test";
import assert from "node:assert/strict";

import { gruposInvertebradosV1 } from "../src/protocols/zoologia/gruposInvertebradosV1.js";
import { ordensInsectaV1 } from "../src/protocols/zoologia/ordensInsectaV1.js";
import {
  calibrationCasesAnnelidaV1,
  calibrationCasesArthropodaV1,
  calibrationCasesCnidariaV1,
  calibrationCasesEchinodermataV1,
  calibrationCasesMolluscaV1,
  getCalibrationCasesForProtocol,
} from "../src/protocols/zoologia/calibrationCasesV1.js";
import {
  classesPoriferaV1,
  classesCnidariaV1,
  classesAnnelidaV1,
  classesMolluscaV1,
  classesArthropodaV1,
  classesEchinodermataV1,
} from "../src/protocols/zoologia/classesInvertebradosV1.js";
import { runProtocolCase } from "./helpers/runProtocolCase.js";

const protocols = [
  gruposInvertebradosV1,
  classesPoriferaV1,
  classesCnidariaV1,
  classesAnnelidaV1,
  classesMolluscaV1,
  classesArthropodaV1,
  classesEchinodermataV1,
];

test(
  "protocolos de invertebrados registram bibliografia específica",
  () => {
    protocols.forEach((protocol) => {
      assert.ok(
        protocol.references?.length >= 3,
        `Bibliografia ausente em ${protocol.id}`
      );
    });
  }
);

test(
  "casos de calibração ficam disponíveis por protocolo para revisão docente",
  () => {
    assert.equal(
      getCalibrationCasesForProtocol("classes-echinodermata-v1").length,
      calibrationCasesEchinodermataV1.length
    );
    assert.equal(
      getCalibrationCasesForProtocol(classesPoriferaV1).length,
      4
    );
  }
);

test(
  "protocolo de Insecta segue as mesmas salvaguardas investigativas",
  () => {
    assert.ok(ordensInsectaV1.references?.length >= 3);
    assert.equal(
      ordensInsectaV1.investigationPolicy
        ?.minimumObservedStructuresForConclusion,
      3
    );
    assert.match(
      ordensInsectaV1.pedagogicalNote ?? "",
      /não constituem uma chave/i
    );
  }
);

test(
  "protocolos de invertebrados concluem casos representativos",
  () => {
    protocols.forEach((protocol) => {
      protocol.hypotheses.forEach((hypothesis) => {
        const observations = protocol.rules
          .filter(
            (rule) =>
              rule.hypothesis === hypothesis.id &&
              rule.effect === "positive"
          )
          .map((rule) => [
            rule.structure,
            rule.value,
          ]);
        const investigation = runProtocolCase(
          protocol,
          observations
        );

        assert.equal(
          investigation.hypotheses[0].id,
          hypothesis.id,
          `${protocol.id} não liderou para ${hypothesis.id}`
        );
        assert.equal(
          investigation.conclusion?.status,
          "concluida",
          `${protocol.id} não concluiu para ${hypothesis.id}`
        );
      });
    });
  }
);

test(
  "protocolos de invertebrados exigem confronto entre evidências antes de concluir",
  () => {
    const investigation = runProtocolCase(
      gruposInvertebradosV1,
      [
        ["desenvolvimento_embrionario", "deuterostomado"],
        ["revestimento_ou_estrutura_marcante", "endoesqueleto_calcario"],
      ]
    );

    assert.notEqual(
      investigation.conclusion?.status,
      "concluida"
    );
    assert.equal(
      investigation.decision?.status,
      "continuar"
    );
    assert.ok(
      investigation.suggestion?.structure,
      "A investigação deve orientar uma nova observação comparativa"
    );
  }
);

test(
  "uma terceira observação não confirmatória mantém a leitura aberta nos novos protocolos",
  () => {
    protocols.forEach((protocol) => {
      const hypothesis = protocol.hypotheses[0];
      const supportingRules = protocol.rules.filter(
        (rule) =>
          rule.hypothesis === hypothesis.id &&
          rule.effect === "positive"
      );
      const selectedStructures = supportingRules
        .slice(0, 2)
        .map((rule) => rule.structure);
      const nonConfirmingObservation = protocol.observations
        .find((observation) => {
          if (selectedStructures.includes(observation.structure)) {
            return false;
          }

          const positiveValues = protocol.rules
            .filter(
              (rule) =>
                rule.hypothesis === hypothesis.id &&
                rule.effect === "positive" &&
                rule.structure === observation.structure
            )
            .map((rule) => rule.value);

          return observation.values.some(
            (value) => !positiveValues.includes(value)
          );
        });
      const nonConfirmingValue =
        nonConfirmingObservation.values.find(
          (value) => !protocol.rules.some(
            (rule) =>
              rule.hypothesis === hypothesis.id &&
              rule.effect === "positive" &&
              rule.structure === nonConfirmingObservation.structure &&
              rule.value === value
          )
        );

      const investigation = runProtocolCase(
        protocol,
        [
          ...supportingRules.slice(0, 2).map((rule) => [
            rule.structure,
            rule.value,
          ]),
          [
            nonConfirmingObservation.structure,
            nonConfirmingValue,
          ],
        ]
      );

      assert.notEqual(
        investigation.conclusion?.status,
        "concluida",
        `${protocol.id} concluiu sem três evidências convergentes`
      );
      assert.equal(
        investigation.decision?.status,
        "continuar"
      );
    });
  }
);

test(
  "protocolo de filos registra protostomia e deuterostomia como evidências didáticas",
  () => {
    const development = gruposInvertebradosV1.observations.find(
      (observation) =>
        observation.structure ===
        "desenvolvimento_embrionario"
    );

    assert.deepEqual(development?.values, [
      "fora_do_recorte_bilateriano",
      "protostomado",
      "deuterostomado",
    ]);

    const echinodermInvestigation = runProtocolCase(
      gruposInvertebradosV1,
      [
        ["desenvolvimento_embrionario", "deuterostomado"],
        ["revestimento_ou_estrutura_marcante", "endoesqueleto_calcario"],
      ]
    );

    assert.equal(
      echinodermInvestigation.hypotheses[0].id,
      "echinodermata"
    );
    const porifera = echinodermInvestigation.hypotheses.find(
      (hypothesis) => hypothesis.id === "porifera"
    );

    assert.ok(
      porifera?.conflicts.some(
        (conflict) =>
          conflict.structure ===
            "revestimento_ou_estrutura_marcante" &&
          conflict.value === "endoesqueleto_calcario"
      ),
      "Uma evidência incompatível deve enfraquecer hipóteses concorrentes"
    );
  }
);

test(
  "conclusões de invertebrados podem abrir uma nova investigação opcional",
  () => {
    const investigation = runProtocolCase(
      gruposInvertebradosV1,
      [
        ["revestimento_ou_estrutura_marcante", "exoesqueleto_quitinoso"],
        ["desenvolvimento_embrionario", "protostomado"],
        ["modo_de_vida_ou_locomocao", "apendices_articulados"],
      ]
    );

    assert.equal(investigation.protocolId, gruposInvertebradosV1.id);
    assert.equal(investigation.conclusion?.status, "concluida");
    assert.equal(
      investigation.nextProtocol?.nextProtocol,
      "classes-arthropoda-v1"
    );
  }
);

test(
  "Hydrozoa admite medusa com velum como variação sustentadora",
  () => {
    const investigation = runProtocolCase(
      classesCnidariaV1,
      [
        ["fase_dominante", "polipo_frequente"],
        ["tipo_de_medusa", "com_velum"],
        ["caracter_anatomico_funcional", "gonadas_epidermicas"],
      ]
    );

    assert.equal(investigation.hypotheses[0].id, "hydrozoa");
    assert.equal(investigation.conclusion?.status, "concluida");
  }
);

test(
  "casos docentes de Cnidaria mantêm a investigação no comportamento esperado",
  () => {
    calibrationCasesCnidariaV1.forEach((scenario) => {
      const investigation = runProtocolCase(
        classesCnidariaV1,
        scenario.observations
      );

      if (scenario.expectedLeader) {
        assert.equal(
          investigation.hypotheses[0].id,
          scenario.expectedLeader,
          `Hipótese líder inesperada em ${scenario.id}`
        );
      }

      assert.equal(
        investigation.conclusion?.status,
        scenario.expectedConclusion,
        `Conclusão inesperada em ${scenario.id}`
      );
    });
  }
);

test(
  "casos docentes de Annelida preservam Clitellata como hipótese compartilhada",
  () => {
    calibrationCasesAnnelidaV1.forEach((scenario) => {
      const investigation = runProtocolCase(
        classesAnnelidaV1,
        scenario.observations
      );

      assert.equal(
        investigation.hypotheses[0].id,
        scenario.expectedLeader,
        `Hipótese líder inesperada em ${scenario.id}`
      );
      assert.equal(
        investigation.conclusion?.status,
        scenario.expectedConclusion,
        `Conclusão inesperada em ${scenario.id}`
      );
    });
  }
);

test(
  "casos docentes de Mollusca comparam plano corporal e função",
  () => {
    calibrationCasesMolluscaV1.forEach((scenario) => {
      const investigation = runProtocolCase(
        classesMolluscaV1,
        scenario.observations
      );

      assert.equal(
        investigation.hypotheses[0].id,
        scenario.expectedLeader,
        `Hipótese líder inesperada em ${scenario.id}`
      );
      assert.equal(
        investigation.conclusion?.status,
        scenario.expectedConclusion,
        `Conclusão inesperada em ${scenario.id}`
      );
    });
  }
);

test(
  "casos docentes de Arthropoda preservam a disputa entre miriápodes",
  () => {
    calibrationCasesArthropodaV1.forEach((scenario) => {
      const investigation = runProtocolCase(
        classesArthropodaV1,
        scenario.observations
      );

      if (scenario.expectedLeader) {
        assert.equal(
          investigation.hypotheses[0].id,
          scenario.expectedLeader,
          `Hipótese líder inesperada em ${scenario.id}`
        );
      }
      assert.equal(
        investigation.conclusion?.status,
        scenario.expectedConclusion,
        `Conclusão inesperada em ${scenario.id}`
      );
    });
  }
);

test(
  "casos docentes de Echinodermata integram estrutura e função",
  () => {
    calibrationCasesEchinodermataV1.forEach((scenario) => {
      const investigation = runProtocolCase(
        classesEchinodermataV1,
        scenario.observations
      );

      assert.equal(
        investigation.hypotheses[0].id,
        scenario.expectedLeader,
        `Hipótese líder inesperada em ${scenario.id}`
      );
      assert.equal(
        investigation.conclusion?.status,
        scenario.expectedConclusion,
        `Conclusão inesperada em ${scenario.id}`
      );
    });
  }
);

test(
  "Clitellata é sustentado por desenvolvimento direto sem decidir sozinho o recorte",
  () => {
    const investigation = runProtocolCase(
      classesAnnelidaV1,
      [
        ["desenvolvimento", "direto_em_casulo"],
        ["condicao_do_clitelo", "permanente"],
        ["apendices_ou_fixacao", "sem_parapodios"],
      ]
    );

    assert.equal(investigation.hypotheses[0].id, "oligochaeta");
    assert.equal(investigation.conclusion?.status, "concluida");
    assert.ok(
      investigation.hypotheses.find(
        (hypothesis) => hypothesis.id === "hirudinea"
      )?.evidences.some(
        (evidence) =>
          evidence.structure === "desenvolvimento" &&
          evidence.value === "direto_em_casulo"
      ),
      "O desenvolvimento direto deve também sustentar Hirudinea como Clitellata"
    );
  }
);

test(
  "Gastropoda admite concha reduzida como variação do plano corporal",
  () => {
    const investigation = runProtocolCase(
      classesMolluscaV1,
      [
        ["pe", "rastejante_ventral"],
        ["concha", "espiralada_ou_reduzida"],
        ["sistema_funcional", "radula_e_circulacao_aberta"],
      ]
    );

    assert.equal(investigation.hypotheses[0].id, "gastropoda");
    assert.equal(investigation.conclusion?.status, "concluida");
  }
);

test(
  "Crustacea exige conjunto de antenas, apêndices e trocas gasosas",
  () => {
    const investigation = runProtocolCase(
      classesArthropodaV1,
      [
        ["antenas", "dois_pares"],
        ["apendices_especializados", "apendices_birramos"],
        ["trocas_gasosas", "branquias"],
      ]
    );

    assert.equal(investigation.hypotheses[0].id, "crustacea");
    assert.equal(investigation.conclusion?.status, "concluida");
  }
);

test(
  "Holothuroidea integra forma, tentáculos e árvores respiratórias",
  () => {
    const investigation = runProtocolCase(
      classesEchinodermataV1,
      [
        ["forma_do_corpo", "alongada_mole"],
        ["estrutura_marcante", "tentaculos_orais"],
        [
          "funcao_predominante",
          "arvores_respiratorias_e_tentaculos",
        ],
      ]
    );

    assert.equal(investigation.hypotheses[0].id, "holothuroidea");
    assert.equal(investigation.conclusion?.status, "concluida");
  }
);
