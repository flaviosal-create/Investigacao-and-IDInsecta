export const calibrationCasesCnidariaV1 = [
  {
    id: "hydrozoa-medusa-velada",
    label: "Ciclo hidrozoário com medusa velada",
    purpose:
      "Verifica que a presença de medusa com velum é uma variação sustentadora de Hydrozoa.",
    observations: [
      ["fase_dominante", "polipo_frequente"],
      ["tipo_de_medusa", "com_velum"],
      ["caracter_anatomico_funcional", "gonadas_epidermicas"],
    ],
    expectedLeader: "hydrozoa",
    expectedConclusion: "concluida",
  },
  {
    id: "scyphozoa-medusa-com-ropalios",
    label: "Medusa com ropálios e estrobilação",
    purpose:
      "Verifica a convergência entre fase, morfologia da medusa e ciclo em Scyphozoa.",
    observations: [
      ["fase_dominante", "medusa_predominante"],
      ["tipo_de_medusa", "cupuliforme_com_ropalios"],
      ["caracter_anatomico_funcional", "ropalios_e_estrobilacao"],
    ],
    expectedLeader: "scyphozoa",
    expectedConclusion: "concluida",
  },
  {
    id: "cubozoa-pedalia-e-olhos",
    label: "Medusa cúbica com pedálios e olhos complexos",
    purpose:
      "Verifica que Cubozoa depende de caracteres anatômico-funcionais, não apenas de fase medusóide.",
    observations: [
      ["fase_dominante", "medusa_predominante"],
      ["tipo_de_medusa", "cubica_com_pedalia"],
      ["caracter_anatomico_funcional", "pedalia_e_olhos_complexos"],
    ],
    expectedLeader: "cubozoa",
    expectedConclusion: "concluida",
  },
  {
    id: "anthozoa-polipo-exclusivo",
    label: "Pólipo exclusivo com mesentérios",
    purpose:
      "Verifica a leitura integrada de ausência de medusa, pólipo exclusivo e organização interna em Anthozoa.",
    observations: [
      ["fase_dominante", "polipo_exclusivo"],
      ["tipo_de_medusa", "ausente_ou_reduzida"],
      ["caracter_anatomico_funcional", "mesenterios_e_faringe"],
    ],
    expectedLeader: "anthozoa",
    expectedConclusion: "concluida",
  },
  {
    id: "medusa-incompleta",
    label: "Leitura incompleta de medusa",
    purpose:
      "Verifica que fase medusóide e organização solitária não encerram a investigação entre Scyphozoa e Cubozoa.",
    observations: [
      ["fase_dominante", "medusa_predominante"],
      ["organizacao", "solitaria"],
    ],
    expectedConclusion: "em_disputa",
  },
];

export const calibrationCasesAnnelidaV1 = [
  {
    id: "polychaeta-parapodios-e-larva",
    label: "Anelídeo com parapódios e desenvolvimento larval",
    purpose:
      "Sustenta o recorte tradicional Polychaeta por caracteres estruturais e de desenvolvimento.",
    observations: [
      ["condicao_do_clitelo", "ausente_no_adulto"],
      ["apendices_ou_fixacao", "parapodios"],
      ["condicao_do_celoma", "celoma_segmentar_amplo"],
      ["desenvolvimento", "larva_trocofora_ou_fertilizacao_externa"],
    ],
    expectedLeader: "polychaeta",
    expectedConclusion: "concluida",
  },
  {
    id: "oligochaeta-clitelo-permanente",
    label: "Clitelado com clitelo permanente",
    purpose:
      "Sustenta o recorte tradicional Oligochaeta dentro de Clitellata.",
    observations: [
      ["condicao_do_clitelo", "permanente"],
      ["apendices_ou_fixacao", "sem_parapodios"],
      ["condicao_do_celoma", "celoma_segmentar_amplo"],
      ["desenvolvimento", "direto_em_casulo"],
    ],
    expectedLeader: "oligochaeta",
    expectedConclusion: "concluida",
  },
  {
    id: "hirudinea-clitelo-sazonal",
    label: "Clitelado com ventosas e celoma reduzido",
    purpose:
      "Sustenta Hirudinea dentro de Clitellata por um conjunto de estruturas independentes.",
    observations: [
      ["condicao_do_clitelo", "sazonal"],
      ["apendices_ou_fixacao", "ventosas_anterior_e_posterior"],
      ["condicao_do_celoma", "celoma_reduzido_em_canais"],
      ["desenvolvimento", "direto_em_casulo"],
    ],
    expectedLeader: "hirudinea",
    expectedConclusion: "concluida",
  },
  {
    id: "clitellata-incompleto",
    label: "Clitelado com leitura incompleta",
    purpose:
      "Mantém a investigação aberta quando só há desenvolvimento direto e ausência de parapódios.",
    observations: [
      ["desenvolvimento", "direto_em_casulo"],
      ["apendices_ou_fixacao", "sem_parapodios"],
    ],
    expectedLeader: "oligochaeta",
    expectedConclusion: "em_andamento",
  },
  {
    id: "clitellata-celoma-compartilhado",
    label: "Desenvolvimento direto e celoma amplo",
    purpose:
      "Mostra que evidências compartilhadas de Clitellata não substituem a leitura do clitelo.",
    observations: [
      ["desenvolvimento", "direto_em_casulo"],
      ["condicao_do_celoma", "celoma_segmentar_amplo"],
    ],
    expectedLeader: "oligochaeta",
    expectedConclusion: "em_andamento",
  },
];

export const calibrationCasesMolluscaV1 = [
  {
    id: "gastropoda-plano-corporal",
    label: "Molusco rastejante com rádula",
    purpose:
      "Sustenta Gastropoda pelo conjunto pé ventral, concha variável e sistema funcional.",
    observations: [
      ["pe", "rastejante_ventral"],
      ["concha", "espiralada_ou_reduzida"],
      ["cabeca", "com_tentaculos"],
      ["sistema_funcional", "radula_e_circulacao_aberta"],
    ],
    expectedLeader: "gastropoda",
    expectedConclusion: "concluida",
  },
  {
    id: "bivalvia-filtrador",
    label: "Molusco bivalve filtrador",
    purpose:
      "Sustenta Bivalvia por valvas, redução cefálica e ausência de rádula associada à filtração.",
    observations: [
      ["concha", "duas_valvas_articuladas"],
      ["cabeca", "reduzida"],
      ["sistema_funcional", "sem_radula_e_filtracao"],
    ],
    expectedLeader: "bivalvia",
    expectedConclusion: "concluida",
  },
  {
    id: "cephalopoda-predador",
    label: "Cefalópode com funil e circulação fechada",
    purpose:
      "Sustenta Cephalopoda por modificação do pé, cefalização e sistema funcional predatório.",
    observations: [
      ["pe", "bracos_tentaculos_e_funil"],
      ["cabeca", "olhos_complexos"],
      ["sistema_funcional", "radula_bico_e_circulacao_fechada"],
    ],
    expectedLeader: "cephalopoda",
    expectedConclusion: "concluida",
  },
  {
    id: "polyplacophora-aderente",
    label: "Quiton aderido ao substrato",
    purpose:
      "Sustenta Polyplacophora por placas dorsais, pé aderente e rádula raspadora.",
    observations: [
      ["pe", "ventral_aderente"],
      ["concha", "oito_placas_dorsais"],
      ["sistema_funcional", "radula_e_aderencia_ao_substrato"],
    ],
    expectedLeader: "polyplacophora",
    expectedConclusion: "concluida",
  },
  {
    id: "cephalopoda-incompleto",
    label: "Leitura cefalópode incompleta",
    purpose:
      "Mantém a investigação aberta com concha interna/reduzida e olhos complexos, sem o eixo funcional.",
    observations: [
      ["concha", "interna_reduzida_ou_ausente"],
      ["cabeca", "olhos_complexos"],
    ],
    expectedLeader: "cephalopoda",
    expectedConclusion: "em_andamento",
  },
];

export const calibrationCasesArthropodaV1 = [
  {
    id: "insecta-tagmose-e-traqueias",
    label: "Hexápode com tagmose e traqueias",
    purpose:
      "Sustenta Insecta por três pares de pernas, traqueias e apêndices mandibulados.",
    observations: [
      ["pares_de_pernas", "tres"],
      ["trocas_gasosas", "traqueias"],
      ["apendices_especializados", "mandibulas_e_apendices_toracicos"],
    ],
    expectedLeader: "insecta",
    expectedConclusion: "concluida",
  },
  {
    id: "arachnida-queliceras",
    label: "Quelicerado terrestre",
    purpose:
      "Sustenta Arachnida por quelíceras, quatro pares de pernas e ausência de antenas.",
    observations: [
      ["pares_de_pernas", "quatro"],
      ["antenas", "ausentes"],
      ["apendices_especializados", "queliceras"],
    ],
    expectedLeader: "arachnida",
    expectedConclusion: "concluida",
  },
  {
    id: "crustacea-birramos",
    label: "Artrópode com apêndices birremes",
    purpose:
      "Sustenta Crustacea por dois pares de antenas, apêndices birremes e brânquias.",
    observations: [
      ["antenas", "dois_pares"],
      ["trocas_gasosas", "branquias"],
      ["apendices_especializados", "apendices_birramos"],
    ],
    expectedLeader: "crustacea",
    expectedConclusion: "concluida",
  },
  {
    id: "chilopoda-forcipulas",
    label: "Miriápode com forcípulas",
    purpose:
      "Sustenta Chilopoda por um par de pernas por segmento, corpo multissegmentado e forcípulas.",
    observations: [
      ["pares_de_pernas", "um_por_segmento"],
      ["tagmas", "cabeca_tronco_segmentado"],
      ["apendices_especializados", "forcipulas"],
    ],
    expectedLeader: "chilopoda",
    expectedConclusion: "concluida",
  },
  {
    id: "diplopoda-diplosegmentos",
    label: "Miriápode com diplosegmentos",
    purpose:
      "Sustenta Diplopoda por dois pares de pernas por diplosegmento e tagmose de cabeça e tronco.",
    observations: [
      ["pares_de_pernas", "dois_por_segmento"],
      ["tagmas", "cabeca_tronco_segmentado"],
      ["apendices_especializados", "diplosegmentos"],
    ],
    expectedLeader: "diplopoda",
    expectedConclusion: "concluida",
  },
  {
    id: "myriapoda-incompleto",
    label: "Miriápode sem apêndice especializado observado",
    purpose:
      "Mantém Chilopoda e Diplopoda em disputa quando só há caracteres compartilhados de miriápode.",
    observations: [
      ["tagmas", "cabeca_tronco_segmentado"],
      ["antenas", "um_par"],
      ["trocas_gasosas", "traqueias_em_corpo_multissegmentado"],
    ],
    expectedConclusion: "em_disputa",
  },
];

export const calibrationCasesEchinodermataV1 = [
  {
    id: "asteroidea-sulcos-e-predacao",
    label: "Estrela com sulcos ambulacrais e predação",
    purpose:
      "Sustenta Asteroidea pela integração entre braços largos, sulcos ambulacrais e função alimentar.",
    observations: [
      ["forma_do_corpo", "estrela_com_bracos_largos"],
      ["bracos", "largos_com_sulcos"],
      ["organizacao_ambulacraria", "sulcos_ambulacrais_abertos"],
      ["funcao_predominante", "predacao_com_estomago_eversivel"],
    ],
    expectedLeader: "asteroidea",
    expectedConclusion: "concluida",
  },
  {
    id: "ophiuroidea-disco-e-bracos-articulados",
    label: "Ofiuróide com disco e braços articulados",
    purpose:
      "Sustenta Ophiuroidea pela relação entre forma corporal, braços e locomoção.",
    observations: [
      ["forma_do_corpo", "disco_com_bracos_finos"],
      ["bracos", "finos_e_articulados"],
      ["organizacao_ambulacraria", "sulcos_ambulacrais_fechados"],
      ["funcao_predominante", "locomocao_por_bracos"],
    ],
    expectedLeader: "ophiuroidea",
    expectedConclusion: "concluida",
  },
  {
    id: "echinoidea-lanterna-e-espinhos",
    label: "Equinóide com espinhos móveis e lanterna",
    purpose:
      "Sustenta Echinoidea por esqueleto externo evidente, lanterna de Aristóteles e pastejo.",
    observations: [
      ["forma_do_corpo", "globosa_espinhosa"],
      ["estrutura_marcante", "espinhos_moveis"],
      ["organizacao_ambulacraria", "lanterna_de_aristoteles"],
      ["funcao_predominante", "pastejo_com_lanterna"],
    ],
    expectedLeader: "echinoidea",
    expectedConclusion: "concluida",
  },
  {
    id: "holothuroidea-tentaculos-e-arvores-respiratorias",
    label: "Holoturóide com tentáculos e árvores respiratórias",
    purpose:
      "Sustenta Holothuroidea pela forma alongada e pela integração entre estruturas orais e respiratórias.",
    observations: [
      ["forma_do_corpo", "alongada_mole"],
      ["estrutura_marcante", "tentaculos_orais"],
      ["organizacao_ambulacraria", "tentaculos_bucais_modificados"],
      ["funcao_predominante", "arvores_respiratorias_e_tentaculos"],
    ],
    expectedLeader: "holothuroidea",
    expectedConclusion: "concluida",
  },
  {
    id: "crinoidea-bracos-ramificados",
    label: "Crinóide suspensívoro",
    purpose:
      "Sustenta Crinoidea por braços ramificados, pínulas e função de suspensão.",
    observations: [
      ["forma_do_corpo", "coroa_com_bracos_ramificados"],
      ["bracos", "ramificados_para_filtracao"],
      ["organizacao_ambulacraria", "pinnulas_para_filtracao"],
      ["funcao_predominante", "suspensivoria_por_bracos"],
    ],
    expectedLeader: "crinoidea",
    expectedConclusion: "concluida",
  },
  {
    id: "asteroidea-leitura-incompleta",
    label: "Leitura incompleta de estrela",
    purpose:
      "Garante que forma e braços, sem organização ou função observada, mantenham a investigação aberta.",
    observations: [
      ["forma_do_corpo", "estrela_com_bracos_largos"],
      ["bracos", "largos_com_sulcos"],
    ],
    expectedLeader: "asteroidea",
    expectedConclusion: "em_andamento",
  },
];

const curatedCalibrationCasesByProtocolId = {
  "classes-cnidaria-v1": calibrationCasesCnidariaV1,
  "classes-annelida-v1": calibrationCasesAnnelidaV1,
  "classes-mollusca-v1": calibrationCasesMolluscaV1,
  "classes-arthropoda-v1": calibrationCasesArthropodaV1,
  "classes-echinodermata-v1": calibrationCasesEchinodermataV1,
};

export function getCalibrationCasesForProtocol(protocolOrId) {
  const protocol =
    typeof protocolOrId === "object"
      ? protocolOrId
      : null;
  const protocolId =
    protocol?.id ?? protocolOrId;

  if (protocol?.calibrationCases?.length) {
    return protocol.calibrationCases;
  }

  if (curatedCalibrationCasesByProtocolId[protocolId]) {
    return curatedCalibrationCasesByProtocolId[protocolId];
  }

  return protocol
    ? createBaselineCalibrationCases(protocol)
    : [];
}

function createBaselineCalibrationCases(protocol) {
  const cases = [];

  for (const hypothesis of protocol.hypotheses ?? []) {
    const rules = protocol.rules
      .filter(
        (rule) =>
          rule.hypothesis === hypothesis.id &&
          rule.effect === "positive"
      )
      .sort((left, right) => right.weight - left.weight);

    const observations = [];
    const structures = new Set();

    for (const rule of rules) {
      if (structures.has(rule.structure)) continue;
      structures.add(rule.structure);
      observations.push([
        rule.structure,
        rule.value,
      ]);
    }

    if (observations.length < 2) continue;

    cases.push({
      id: `${protocol.id}-${hypothesis.id}-baseline`,
      label: `${hypothesis.name} — caso-base automático`,
      purpose:
        "Caso gerado a partir das regras positivas do protocolo; requer revisão docente antes de ser tratado como calibração oficial.",
      source: "generated-baseline",
      expectedLeader: hypothesis.id,
      expectedConclusion: "concluida",
      observations,
    });
  }

  const firstCase = cases[0];
  if (firstCase && firstCase.observations.length > 2) {
    cases.push({
      id: `${protocol.id}-incomplete-baseline`,
      label: "Leitura incompleta — caso-base automático",
      purpose:
        "Caso parcial gerado para verificar que o protocolo não conclui cedo demais.",
      source: "generated-baseline",
      expectedLeader: firstCase.expectedLeader,
      expectedConclusion: "em_andamento",
      observations: firstCase.observations.slice(0, 1),
    });
  }

  return cases;
}
