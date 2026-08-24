import { createProfileProtocol } from "./createProfileProtocol.js";
import { referencesInvertebratesV1 } from "./referencesInvertebratesV1.js";

export const classesPoriferaV1 = createProfileProtocol({
  id: "classes-porifera-v1",
  name: "Classes Selecionadas de Porifera",
  description: "Investigação comparativa de Calcarea, Demospongiae e Hexactinellida por composição e forma do esqueleto.",
  references: referencesInvertebratesV1,
  pedagogicalNote: "Este protocolo trabalha com três classes selecionadas de Porifera. A composição e a forma das espículas sustentam a comparação; o habitat é contextual e não identifica uma classe isoladamente.",
  investigationPolicy: {
    minimumObservedStructuresForConclusion: 3,
    minimumSupportingStructuresForConclusion: 2,
    preferDiscriminativeSuggestion: true,
  },
  observations: [
    { structure: "composicao_do_esqueleto", label: "Composição do esqueleto (quando observável)", negativeWeightFactor: 0.8, values: ["espiculas_calcarias", "espiculas_siliceas", "espongina_com_ou_sem_espiculas_silicosas"] },
    { structure: "forma_das_espiculas", label: "Forma das espículas (quando observável)", negativeWeightFactor: 0.85, values: ["tres_ou_quatro_raios", "ausentes_ou_nao_hexarradiadas", "seis_raios"] },
    { structure: "habitat_tipico", label: "Ambiente frequentemente associado", negativeWeightFactor: 0.75, values: ["marinho_raso", "marinho_ou_doce", "marinho_profundo"] },
  ],
  hypotheses: [
    { id: "calcarea", name: "Calcarea", level: "classe", clue: "Espículas calcárias favorecem Calcarea." },
    { id: "demospongiae", name: "Demospongiae", level: "classe", clue: "Espongina e espículas silicosas não hexarradiadas favorecem Demospongiae." },
    { id: "hexactinellida", name: "Hexactinellida", level: "classe", clue: "Espículas silicosas de seis raios e mar profundo favorecem Hexactinellida." },
  ],
  profiles: {
    calcarea: { composicao_do_esqueleto: ["espiculas_calcarias", 6], forma_das_espiculas: ["tres_ou_quatro_raios", 4], habitat_tipico: ["marinho_raso", 1] },
    demospongiae: { composicao_do_esqueleto: ["espongina_com_ou_sem_espiculas_silicosas", 6], forma_das_espiculas: ["ausentes_ou_nao_hexarradiadas", 4], habitat_tipico: ["marinho_ou_doce", 2] },
    hexactinellida: { composicao_do_esqueleto: ["espiculas_siliceas", 5], forma_das_espiculas: ["seis_raios", 6], habitat_tipico: ["marinho_profundo", 2] },
  },
});

export const classesCnidariaV1 = createProfileProtocol({
  id: "classes-cnidaria-v1",
  name: "Classes Selecionadas de Cnidaria",
  description: "Investigação comparativa de Hydrozoa, Scyphozoa, Cubozoa e Anthozoa por ciclo de vida, morfologia da medusa e organização gastrovascular.",
  references: referencesInvertebratesV1,
  generateNegativeRules: false,
  pedagogicalNote: "O protocolo usa classes selecionadas de Cnidaria em um recorte de graduação. Fase de vida, caracteres da medusa e organização interna devem ser lidos em conjunto, considerando a diversidade dos ciclos de vida.",
  observations: [
    { structure: "fase_dominante", label: "Fase predominante no ciclo de vida", negativeWeightFactor: 0.8, values: ["polipo_frequente", "medusa_predominante", "polipo_exclusivo"] },
    { structure: "tipo_de_medusa", label: "Morfologia da medusa (quando presente)", negativeWeightFactor: 0.85, values: ["ausente_ou_reduzida", "com_velum", "cupuliforme_com_ropalios", "cubica_com_pedalia"] },
    { structure: "organizacao", label: "Organização corporal frequentemente observada", negativeWeightFactor: 0.75, values: ["colonial_ou_polimorfica", "solitaria", "recife_ou_anemona"] },
    { structure: "caracter_anatomico_funcional", label: "Caráter anatômico-funcional", negativeWeightFactor: 0.8, values: ["gonadas_epidermicas", "ropalios_e_estrobilacao", "pedalia_e_olhos_complexos", "mesenterios_e_faringe"] },
  ],
  hypotheses: [
    { id: "hydrozoa", name: "Hydrozoa", level: "classe", clue: "Pólipos frequentes e colônias favorecem Hydrozoa." },
    { id: "scyphozoa", name: "Scyphozoa", level: "classe", clue: "Medusa cupuliforme dominante favorece Scyphozoa." },
    { id: "cubozoa", name: "Cubozoa", level: "classe", clue: "Medusa cúbica favorece Cubozoa." },
    { id: "anthozoa", name: "Anthozoa", level: "classe", clue: "Pólipo sem medusa, como corais e anêmonas, favorece Anthozoa." },
  ],
  profiles: {
    hydrozoa: { fase_dominante: ["polipo_frequente", 4], tipo_de_medusa: [["ausente_ou_reduzida", 3], ["com_velum", 5]], organizacao: ["colonial_ou_polimorfica", 3], caracter_anatomico_funcional: ["gonadas_epidermicas", 6] },
    scyphozoa: { fase_dominante: ["medusa_predominante", 5], tipo_de_medusa: ["cupuliforme_com_ropalios", 6], organizacao: ["solitaria", 1], caracter_anatomico_funcional: ["ropalios_e_estrobilacao", 5] },
    cubozoa: { fase_dominante: ["medusa_predominante", 4], tipo_de_medusa: ["cubica_com_pedalia", 6], organizacao: ["solitaria", 1], caracter_anatomico_funcional: ["pedalia_e_olhos_complexos", 6] },
    anthozoa: { fase_dominante: ["polipo_exclusivo", 6], tipo_de_medusa: ["ausente_ou_reduzida", 4], organizacao: ["recife_ou_anemona", 3], caracter_anatomico_funcional: ["mesenterios_e_faringe", 6] },
  },
});

export const classesAnnelidaV1 = createProfileProtocol({
  id: "classes-annelida-v1",
  name: "Grupos Selecionados de Annelida",
  description: "Investigação de Polychaeta e de dois recortes de Clitellata, articulando clitelo, apêndices, celoma e desenvolvimento.",
  references: referencesInvertebratesV1,
  generateNegativeRules: false,
  pedagogicalNote: "O protocolo coloca Clitellata em primeiro plano: Oligochaeta e Hirudinea são recortes tradicionais dentro desse clado. Cerdas não são contadas como critério decisivo; clitelo, ventosas, parapódios, celoma e desenvolvimento são comparados como evidências.",
  investigationPolicy: {
    minimumObservedStructuresForConclusion: 3,
    minimumSupportingStructuresForConclusion: 3,
    preferDiscriminativeSuggestion: true,
    requireNoLeaderConflictsForConclusion: true,
  },
  observations: [
    { structure: "condicao_do_clitelo", label: "Condição do clitelo", negativeWeightFactor: 0.8, values: ["ausente_no_adulto", "permanente", "sazonal"] },
    { structure: "apendices_ou_fixacao", label: "Apêndices laterais ou estruturas de fixação", negativeWeightFactor: 0.8, values: ["parapodios", "sem_parapodios", "ventosas_anterior_e_posterior"] },
    { structure: "condicao_do_celoma", label: "Condição do celoma e da segmentação", negativeWeightFactor: 0.8, values: ["celoma_segmentar_amplo", "celoma_reduzido_em_canais"] },
    { structure: "desenvolvimento", label: "Desenvolvimento", negativeWeightFactor: 0.8, values: ["larva_trocofora_ou_fertilizacao_externa", "direto_em_casulo"] },
  ],
  hypotheses: [
    { id: "polychaeta", name: "Polychaeta (recorte tradicional)", level: "grupo tradicional", clue: "Parapódios, ausência de clitelo no adulto e desenvolvimento larval favorecem o recorte Polychaeta." },
    { id: "oligochaeta", name: "Oligochaeta (Clitellata, recorte tradicional)", level: "recorte em Clitellata", clue: "Clitelo permanente e desenvolvimento direto em casulo sustentam este recorte de Clitellata." },
    { id: "hirudinea", name: "Hirudinea (Clitellata)", level: "grupo em Clitellata", clue: "Clitelo sazonal, ventosas e redução do celoma favorecem Hirudinea." },
  ],
  profiles: {
    polychaeta: { condicao_do_clitelo: ["ausente_no_adulto", 4], apendices_ou_fixacao: ["parapodios", 6], condicao_do_celoma: ["celoma_segmentar_amplo", 4], desenvolvimento: ["larva_trocofora_ou_fertilizacao_externa", 5] },
    oligochaeta: { condicao_do_clitelo: ["permanente", 6], apendices_ou_fixacao: ["sem_parapodios", 3], condicao_do_celoma: ["celoma_segmentar_amplo", 4], desenvolvimento: ["direto_em_casulo", 5] },
    hirudinea: { condicao_do_clitelo: ["sazonal", 6], apendices_ou_fixacao: ["ventosas_anterior_e_posterior", 6], condicao_do_celoma: ["celoma_reduzido_em_canais", 6], desenvolvimento: ["direto_em_casulo", 4] },
  },
});

export const classesMolluscaV1 = createProfileProtocol({
  id: "classes-mollusca-v1",
  name: "Classes Selecionadas de Mollusca",
  description: "Investigação comparativa de Gastropoda, Bivalvia, Cephalopoda e Polyplacophora por pé, concha, cefalização e sistemas funcionais.",
  references: referencesInvertebratesV1,
  generateNegativeRules: false,
  pedagogicalNote: "O protocolo usa quatro classes selecionadas de Mollusca. Pé, concha, cabeça, rádula e circulação expressam modificações de um mesmo plano corporal; concha isolada não decide a leitura, pois pode ser reduzida ou ausente em diferentes linhagens.",
  observations: [
    { structure: "pe", label: "Modificação do pé", negativeWeightFactor: 0.8, values: ["rastejante_ventral", "em_cunha_para_escavacao", "bracos_tentaculos_e_funil", "ventral_aderente"] },
    { structure: "concha", label: "Concha e manto", negativeWeightFactor: 0.85, values: ["espiralada_ou_reduzida", "duas_valvas_articuladas", "interna_reduzida_ou_ausente", "oito_placas_dorsais"] },
    { structure: "cabeca", label: "Cabeça", negativeWeightFactor: 0.75, values: ["com_tentaculos", "reduzida", "olhos_complexos", "sem_tentaculos_evidentes"] },
    { structure: "sistema_funcional", label: "Sistema funcional", negativeWeightFactor: 0.8, values: ["radula_e_circulacao_aberta", "sem_radula_e_filtracao", "radula_bico_e_circulacao_fechada", "radula_e_aderencia_ao_substrato"] },
  ],
  hypotheses: [
    { id: "gastropoda", name: "Gastropoda", level: "classe", clue: "Pé rastejante e concha espiralada favorecem Gastropoda." },
    { id: "bivalvia", name: "Bivalvia", level: "classe", clue: "Duas valvas e cabeça reduzida favorecem Bivalvia." },
    { id: "cephalopoda", name: "Cephalopoda", level: "classe", clue: "Braços, tentáculos e olhos complexos favorecem Cephalopoda." },
    { id: "polyplacophora", name: "Polyplacophora", level: "classe", clue: "Oito placas dorsais favorecem Polyplacophora." },
  ],
  profiles: {
    gastropoda: { pe: ["rastejante_ventral", 4], concha: ["espiralada_ou_reduzida", 3], cabeca: ["com_tentaculos", 4], sistema_funcional: ["radula_e_circulacao_aberta", 5] },
    bivalvia: { pe: ["em_cunha_para_escavacao", 2], concha: ["duas_valvas_articuladas", 5], cabeca: ["reduzida", 5], sistema_funcional: ["sem_radula_e_filtracao", 6] },
    cephalopoda: { pe: ["bracos_tentaculos_e_funil", 6], concha: ["interna_reduzida_ou_ausente", 2], cabeca: ["olhos_complexos", 6], sistema_funcional: ["radula_bico_e_circulacao_fechada", 6] },
    polyplacophora: { pe: ["ventral_aderente", 4], concha: ["oito_placas_dorsais", 6], cabeca: ["sem_tentaculos_evidentes", 2], sistema_funcional: ["radula_e_aderencia_ao_substrato", 5] },
  },
});

export const classesArthropodaV1 = createProfileProtocol({
  id: "classes-arthropoda-v1",
  name: "Grandes Grupos de Arthropoda",
  description: "Investigação comparativa de Insecta, Arachnida, Crustacea, Chilopoda e Diplopoda por tagmose, apêndices e sistemas respiratórios.",
  references: referencesInvertebratesV1,
  generateNegativeRules: false,
  pedagogicalNote: "O protocolo usa um recorte morfológico de grandes grupos de Arthropoda, com categorias de diferentes posições taxonômicas em classificações atuais. Tagmose, apêndices e respiração devem ser comparados antes de abrir, opcionalmente, a investigação de ordens de Insecta.",
  observations: [
    { structure: "tagmas", label: "Regiões do corpo", negativeWeightFactor: 0.8, values: ["cabeca_torax_abdome", "cefalotorax_abdome", "cabeca_tronco_segmentado"] },
    { structure: "pares_de_pernas", label: "Pares de pernas", negativeWeightFactor: 0.85, values: ["tres", "quatro", "cinco_ou_mais", "um_por_segmento", "dois_por_segmento"] },
    { structure: "antenas", label: "Antenas", negativeWeightFactor: 0.75, values: ["um_par", "dois_pares", "ausentes"] },
    { structure: "trocas_gasosas", label: "Estruturas de trocas gasosas", negativeWeightFactor: 0.8, values: ["traqueias", "pulmoes_foliaceos_ou_traqueias", "branquias", "traqueias_em_corpo_multissegmentado"] },
    { structure: "apendices_especializados", label: "Apêndices especializados", negativeWeightFactor: 0.8, values: ["mandibulas_e_apendices_toracicos", "queliceras", "apendices_birramos", "forcipulas", "diplosegmentos"] },
  ],
  hypotheses: [
    { id: "insecta", name: "Insecta", level: "classe", clue: "Três pares de pernas, um par de antenas e três tagmas favorecem Insecta." },
    { id: "arachnida", name: "Arachnida", level: "classe", clue: "Quatro pares de pernas e ausência de antenas favorecem Arachnida." },
    { id: "crustacea", name: "Crustacea", level: "classe", clue: "Dois pares de antenas e cinco ou mais pares de pernas favorecem Crustacea." },
    { id: "chilopoda", name: "Chilopoda", level: "classe", clue: "Um par de pernas por segmento favorece Chilopoda." },
    { id: "diplopoda", name: "Diplopoda", level: "classe", clue: "Dois pares de pernas por segmento favorecem Diplopoda." },
  ],
  profiles: {
    insecta: { tagmas: ["cabeca_torax_abdome", 4], pares_de_pernas: ["tres", 5], antenas: ["um_par", 3], trocas_gasosas: ["traqueias", 4], apendices_especializados: ["mandibulas_e_apendices_toracicos", 4] },
    arachnida: { tagmas: ["cefalotorax_abdome", 3], pares_de_pernas: ["quatro", 5], antenas: ["ausentes", 4], trocas_gasosas: ["pulmoes_foliaceos_ou_traqueias", 4], apendices_especializados: ["queliceras", 6] },
    crustacea: { tagmas: ["cefalotorax_abdome", 3], pares_de_pernas: ["cinco_ou_mais", 2], antenas: ["dois_pares", 5], trocas_gasosas: ["branquias", 4], apendices_especializados: ["apendices_birramos", 6] },
    chilopoda: { tagmas: ["cabeca_tronco_segmentado", 4], pares_de_pernas: ["um_por_segmento", 5], antenas: ["um_par", 2], trocas_gasosas: ["traqueias_em_corpo_multissegmentado", 3], apendices_especializados: ["forcipulas", 6] },
    diplopoda: { tagmas: ["cabeca_tronco_segmentado", 4], pares_de_pernas: ["dois_por_segmento", 5], antenas: ["um_par", 2], trocas_gasosas: ["traqueias_em_corpo_multissegmentado", 3], apendices_especializados: ["diplosegmentos", 6] },
  },
});

export const classesEchinodermataV1 = createProfileProtocol({
  id: "classes-echinodermata-v1",
  name: "Classes de Echinodermata",
  description: "Investigação comparativa das classes atuais mais frequentes em cursos introdutórios, por morfologia externa e organização do sistema ambulacrário.",
  references: referencesInvertebratesV1,
  generateNegativeRules: false,
  pedagogicalNote: "O protocolo compara cinco classes viventes de Echinodermata. Forma corporal, braços e estruturas orais/ambulacrais devem ser integrados; simetria e sistema ambulacrário são caracteres do filo e não uma resposta pronta de classe.",
  observations: [
    { structure: "forma_do_corpo", label: "Forma do corpo", negativeWeightFactor: 0.8, values: ["estrela_com_bracos_largos", "disco_com_bracos_finos", "globosa_espinhosa", "alongada_mole", "coroa_com_bracos_ramificados"] },
    { structure: "bracos", label: "Braços", negativeWeightFactor: 0.8, values: ["largos_com_sulcos", "finos_e_articulados", "ausentes", "ramificados_para_filtracao"] },
    { structure: "estrutura_marcante", label: "Estrutura marcante", negativeWeightFactor: 0.85, values: ["madreporito_dorsal", "movimento_serpentino", "espinhos_moveis", "tentaculos_orais", "cirros"] },
    { structure: "organizacao_ambulacraria", label: "Organização ambulacrária ou oral", negativeWeightFactor: 0.8, values: ["sulcos_ambulacrais_abertos", "sulcos_ambulacrais_fechados", "lanterna_de_aristoteles", "tentaculos_bucais_modificados", "pinnulas_para_filtracao"] },
    { structure: "funcao_predominante", label: "Função predominante das estruturas", negativeWeightFactor: 0.8, values: ["predacao_com_estomago_eversivel", "locomocao_por_bracos", "pastejo_com_lanterna", "arvores_respiratorias_e_tentaculos", "suspensivoria_por_bracos"] },
  ],
  hypotheses: [
    { id: "asteroidea", name: "Asteroidea", level: "classe", clue: "Braços largos com sulcos ambulacrais favorecem Asteroidea." },
    { id: "ophiuroidea", name: "Ophiuroidea", level: "classe", clue: "Braços finos e articulados favorecem Ophiuroidea." },
    { id: "echinoidea", name: "Echinoidea", level: "classe", clue: "Corpo globoso e espinhos móveis favorecem Echinoidea." },
    { id: "holothuroidea", name: "Holothuroidea", level: "classe", clue: "Corpo alongado e tentáculos orais favorecem Holothuroidea." },
    { id: "crinoidea", name: "Crinoidea", level: "classe", clue: "Braços ramificados e cirros favorecem Crinoidea." },
  ],
  profiles: {
    asteroidea: { forma_do_corpo: ["estrela_com_bracos_largos", 5], bracos: ["largos_com_sulcos", 5], estrutura_marcante: ["madreporito_dorsal", 1], organizacao_ambulacraria: ["sulcos_ambulacrais_abertos", 4], funcao_predominante: ["predacao_com_estomago_eversivel", 5] },
    ophiuroidea: { forma_do_corpo: ["disco_com_bracos_finos", 5], bracos: ["finos_e_articulados", 6], estrutura_marcante: ["movimento_serpentino", 2], organizacao_ambulacraria: ["sulcos_ambulacrais_fechados", 4], funcao_predominante: ["locomocao_por_bracos", 5] },
    echinoidea: { forma_do_corpo: ["globosa_espinhosa", 5], bracos: ["ausentes", 2], estrutura_marcante: ["espinhos_moveis", 5], organizacao_ambulacraria: ["lanterna_de_aristoteles", 6], funcao_predominante: ["pastejo_com_lanterna", 4] },
    holothuroidea: { forma_do_corpo: ["alongada_mole", 5], bracos: ["ausentes", 2], estrutura_marcante: ["tentaculos_orais", 5], organizacao_ambulacraria: ["tentaculos_bucais_modificados", 4], funcao_predominante: ["arvores_respiratorias_e_tentaculos", 6] },
    crinoidea: { forma_do_corpo: ["coroa_com_bracos_ramificados", 5], bracos: ["ramificados_para_filtracao", 6], estrutura_marcante: ["cirros", 4], organizacao_ambulacraria: ["pinnulas_para_filtracao", 5], funcao_predominante: ["suspensivoria_por_bracos", 6] },
  },
});
