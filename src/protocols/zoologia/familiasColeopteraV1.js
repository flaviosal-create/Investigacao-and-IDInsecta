import { createProfileProtocol } from "./createProfileProtocol.js";
import { referencesInvertebratesV1 } from "./referencesInvertebratesV1.js";

export const familiasColeopteraV1 = createProfileProtocol({
  id: "familias-coleoptera-v1",
  name: "Famílias selecionadas de Coleoptera",
  description: "Investigação comparativa de cinco famílias de Coleoptera por combinações de caracteres observáveis.",
  references: referencesInvertebratesV1,
  pedagogicalNote: "Este protocolo começa após uma investigação de Coleoptera, mas constitui um novo universo de hipóteses. As características sustentam comparações entre famílias; não formam uma chave dicotômica nem identificam automaticamente o exemplar.",
  investigationPolicy: {
    minimumObservedStructuresForConclusion: 3,
    minimumSupportingStructuresForConclusion: 3,
    preferDiscriminativeSuggestion: true,
    requireNoLeaderConflictsForConclusion: true,
  },
  observations: [
    {
      structure: "forma_do_corpo",
      label: "Forma geral do corpo",
      values: ["alongado_estreito", "alongado_com_rostro", "oval_convexo", "arredondado", "alongado_com_antenas_longa"],
    },
    {
      structure: "antenas",
      label: "Antenas",
      values: ["filiformes", "geniculadas", "lameladas", "clavadas", "longas_com_mais_de_metade_do_corpo"],
    },
    {
      structure: "pronoto",
      label: "Pronoto e ligação com os élitros",
      values: ["estreito_e_constrito", "com_cantos_marcados", "largo_e_convexo", "com_bordas_arredondadas", "alongado_e_visivel"],
    },
    {
      structure: "aparelho_bucal",
      label: "Aparelho bucal",
      values: ["mandibulas_robustas", "rostro_com_pecas_bucais_no_apice", "mandibulas_curvas", "mandibulas_pequenas", "mandibulas_visiveis"],
    },
    {
      structure: "pistas_funcionais",
      label: "Pista funcional ou ecológica observável",
      values: ["corrida_no_solo", "associacao_com_sementes_ou_frutos", "larvas_em_madeira_ou_caules", "predacao_de_pequenos_artropodes", "coloracao_de_aviso_ou_defesa"],
    },
  ],
  hypotheses: [
    { id: "carabidae", name: "Carabidae", level: "família", clue: "Corpo alongado, pernas adaptadas à corrida e mandíbulas robustas favorecem Carabidae." },
    { id: "curculionidae", name: "Curculionidae", level: "família", clue: "Rostro evidente e antenas geniculadas favorecem Curculionidae." },
    { id: "scarabaeidae", name: "Scarabaeidae", level: "família", clue: "Corpo convexo e antenas lameladas favorecem Scarabaeidae." },
    { id: "coccinellidae", name: "Coccinellidae", level: "família", clue: "Corpo arredondado e convexo, frequentemente com coloração de aviso, favorecem Coccinellidae." },
    { id: "cerambycidae", name: "Cerambycidae", level: "família", clue: "Antenas muito longas e corpo alongado favorecem Cerambycidae." },
  ],
  profiles: {
    carabidae: {
      forma_do_corpo: ["alongado_estreito", 5],
      antenas: ["filiformes", 3],
      pronoto: ["estreito_e_constrito", 4],
      aparelho_bucal: ["mandibulas_robustas", 5],
      pistas_funcionais: ["corrida_no_solo", 4],
    },
    curculionidae: {
      forma_do_corpo: ["alongado_com_rostro", 5],
      antenas: ["geniculadas", 6],
      pronoto: ["com_cantos_marcados", 2],
      aparelho_bucal: ["rostro_com_pecas_bucais_no_apice", 6],
      pistas_funcionais: ["associacao_com_sementes_ou_frutos", 4],
    },
    scarabaeidae: {
      forma_do_corpo: ["oval_convexo", 5],
      antenas: ["lameladas", 6],
      pronoto: ["largo_e_convexo", 4],
      aparelho_bucal: ["mandibulas_curvas", 3],
      pistas_funcionais: ["associacao_com_sementes_ou_frutos", 2],
    },
    coccinellidae: {
      forma_do_corpo: ["arredondado", 6],
      antenas: ["clavadas", 3],
      pronoto: ["com_bordas_arredondadas", 4],
      aparelho_bucal: ["mandibulas_pequenas", 3],
      pistas_funcionais: ["predacao_de_pequenos_artropodes", 5],
    },
    cerambycidae: {
      forma_do_corpo: ["alongado_com_antenas_longa", 5],
      antenas: ["longas_com_mais_de_metade_do_corpo", 6],
      pronoto: ["alongado_e_visivel", 3],
      aparelho_bucal: ["mandibulas_visiveis", 3],
      pistas_funcionais: ["larvas_em_madeira_ou_caules", 5],
    },
  },
});
