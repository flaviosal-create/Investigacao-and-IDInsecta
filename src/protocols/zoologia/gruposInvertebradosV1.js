import { createProfileProtocol } from "./createProfileProtocol.js";
import { referencesInvertebratesV1 } from "./referencesInvertebratesV1.js";

export const gruposInvertebradosV1 =
  createProfileProtocol({
    id: "grupos-invertebrados-v1",
    name: "Grandes Grupos de Invertebrados",
    description:
      "Investigação dos principais filos de invertebrados a partir de simetria, revestimento, sustentação e modo de locomoção.",
    references: referencesInvertebratesV1,
    observations: [
      {
        structure: "simetria",
        label: "Simetria predominante (fase adulta, quando aplicável)",
        negativeWeightFactor: 0.8,
        values: [
          "assimetria", "radial", "birradial", "bilateral", "pentarradial_adulto",
        ],
      },
      {
        structure: "revestimento_ou_estrutura_marcante",
        label: "Revestimento ou estrutura marcante",
        negativeWeightFactor: 0.85,
        values: [
          "poros_e_canais", "cnidocitos", "fileiras_ciliares", "corpo_achatado",
          "cuticula", "segmentos_com_quetas", "manto", "exoesqueleto_quitinoso", "endoesqueleto_calcario",
        ],
      },
      {
        structure: "organizacao_interna",
        label: "Organização interna ou cavidade predominante",
        negativeWeightFactor: 0.8,
        values: [
          "sem_tecidos_verdadeiros", "diploblastico", "acelomado", "pseudocelomado",
          "celomado_segmentado", "manto_e_cavidade_mantal", "hemoceloma_predominante", "sistema_ambulacrario",
        ],
      },
      {
        structure: "desenvolvimento_embrionario",
        label: "Desenvolvimento embrionário (quando aplicável)",
        negativeWeightFactor: 0.8,
        values: [
          "fora_do_recorte_bilateriano", "protostomado", "deuterostomado",
        ],
      },
      {
        structure: "modo_de_vida_ou_locomocao",
        label: "Modo de vida ou locomoção",
        negativeWeightFactor: 0.75,
        values: [
          "sessil_filtrador", "natacao_por_cilios", "deslizamento", "movimento_por_quetas",
          "pe_muscular", "apendices_articulados", "pes_ambulacrais", "polipo_sessil_ou_medusa",
          "movimento_serpenteante",
        ],
      },
    ],
    hypotheses: [
      { id: "porifera", name: "Porifera", level: "filo", clue: "Poros, canais e ausência de tecidos verdadeiros sustentam Porifera." },
      { id: "cnidaria", name: "Cnidaria", level: "filo", clue: "Cnidócitos e simetria radial são evidências centrais de Cnidaria." },
      { id: "ctenophora", name: "Ctenophora", level: "filo", clue: "Fileiras de cílios e simetria birradial favorecem Ctenophora." },
      { id: "platyhelminthes", name: "Platyhelminthes", level: "filo", clue: "Corpo achatado bilateral e condição acelomada favorecem Platyhelminthes." },
      { id: "nematoda", name: "Nematoda", level: "filo", clue: "Cutícula, corpo cilíndrico e pseudoceloma favorecem Nematoda." },
      { id: "annelida", name: "Annelida", level: "filo", clue: "Segmentação, quetas e celoma sustentam Annelida." },
      { id: "mollusca", name: "Mollusca", level: "filo", clue: "Manto, pé muscular e organização celomada reduzida favorecem Mollusca." },
      { id: "arthropoda", name: "Arthropoda", level: "filo", clue: "Exoesqueleto quitinoso e apêndices articulados sustentam Arthropoda." },
      { id: "echinodermata", name: "Echinodermata", level: "filo", clue: "Endoesqueleto calcário, simetria pentarradial e sistema ambulacrário favorecem Echinodermata." },
    ],
    profiles: {
      porifera: { simetria: ["assimetria", 4], revestimento_ou_estrutura_marcante: ["poros_e_canais", 6], organizacao_interna: ["sem_tecidos_verdadeiros", 6], desenvolvimento_embrionario: ["fora_do_recorte_bilateriano", 3], modo_de_vida_ou_locomocao: ["sessil_filtrador", 4] },
      cnidaria: { simetria: ["radial", 4], revestimento_ou_estrutura_marcante: ["cnidocitos", 6], organizacao_interna: ["diploblastico", 4], desenvolvimento_embrionario: ["fora_do_recorte_bilateriano", 3], modo_de_vida_ou_locomocao: ["polipo_sessil_ou_medusa", 3] },
      ctenophora: { simetria: ["birradial", 5], revestimento_ou_estrutura_marcante: ["fileiras_ciliares", 6], organizacao_interna: ["diploblastico", 3], desenvolvimento_embrionario: ["fora_do_recorte_bilateriano", 3], modo_de_vida_ou_locomocao: ["natacao_por_cilios", 4] },
      platyhelminthes: { simetria: ["bilateral", 3], revestimento_ou_estrutura_marcante: ["corpo_achatado", 6], organizacao_interna: ["acelomado", 5], desenvolvimento_embrionario: ["protostomado", 4], modo_de_vida_ou_locomocao: ["deslizamento", 3] },
      nematoda: { simetria: ["bilateral", 3], revestimento_ou_estrutura_marcante: ["cuticula", 5], organizacao_interna: ["pseudocelomado", 6], desenvolvimento_embrionario: ["protostomado", 4], modo_de_vida_ou_locomocao: ["movimento_serpenteante", 3] },
      annelida: { simetria: ["bilateral", 3], revestimento_ou_estrutura_marcante: ["segmentos_com_quetas", 6], organizacao_interna: ["celomado_segmentado", 6], desenvolvimento_embrionario: ["protostomado", 4], modo_de_vida_ou_locomocao: ["movimento_por_quetas", 4] },
      mollusca: { simetria: ["bilateral", 3], revestimento_ou_estrutura_marcante: ["manto", 6], organizacao_interna: ["manto_e_cavidade_mantal", 5], desenvolvimento_embrionario: ["protostomado", 4], modo_de_vida_ou_locomocao: ["pe_muscular", 4] },
      arthropoda: { simetria: ["bilateral", 3], revestimento_ou_estrutura_marcante: ["exoesqueleto_quitinoso", 6], organizacao_interna: ["hemoceloma_predominante", 4], desenvolvimento_embrionario: ["protostomado", 4], modo_de_vida_ou_locomocao: ["apendices_articulados", 6] },
      echinodermata: { simetria: ["pentarradial_adulto", 6], revestimento_ou_estrutura_marcante: ["endoesqueleto_calcario", 6], organizacao_interna: ["sistema_ambulacrario", 6], desenvolvimento_embrionario: ["deuterostomado", 6], modo_de_vida_ou_locomocao: ["pes_ambulacrais", 5] },
    },
  });
