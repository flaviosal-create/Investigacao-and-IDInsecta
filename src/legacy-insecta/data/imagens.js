// Catálogo de imagens com metadados próprios.
// As figuras abaixo apoiam a chave principal de Insecta e o Gerador de Chaves.

const base = "/assets/insecta-key";

function figura(src, legenda, extra = {}) {
  return {
    src: `${base}/${src}`,
    legenda,
    credito: "LABSED · chave visual de Insecta",
    fonte: "Ilustrações didáticas revisadas para uso interno no aplicativo.",
    ...extra,
  };
}

export const imagens = {
  insecta_asas_anteriores_comparacao: figura(
    "01-comparacao-tipos-de-asa-anterior.png",
    "Comparação entre élitro, tégmina, hemiélitro e asa membranosa.",
    { grupo: "apoio", taxon: "Insecta" },
  ),
  insecta_elitros_coleoptera: figura(
    "01-elitros-coleoptera.png",
    "Élitros rígidos característicos de Coleoptera.",
    { grupo: "decisao", taxon: "Coleoptera" },
  ),
  insecta_um_par_asas: figura(
    "02-um-par-de-asas.png",
    "Um par funcional de asas.",
    { grupo: "decisao", taxon: "Diptera" },
  ),
  insecta_dois_pares_asas: figura(
    "02-dois-pares-de-asas.png",
    "Dois pares funcionais de asas.",
    { grupo: "decisao", taxon: "Insecta" },
  ),
  insecta_halteres_diptera: figura(
    "03-halteres-diptera.png",
    "Halter posterior característico de Diptera.",
    { grupo: "decisao", taxon: "Diptera" },
  ),
  insecta_escamas_lepidoptera: figura(
    "04-asas-com-escamas-lepidoptera.png",
    "Escamas alares características de Lepidoptera.",
    { grupo: "decisao", taxon: "Lepidoptera" },
  ),
  insecta_superficie_asa_comparacao: figura(
    "04-comparacao-asa-escamosa-membranosa.png",
    "Comparação entre asa com escamas e asa membranosa lisa.",
    { grupo: "apoio", taxon: "Insecta" },
  ),
  insecta_rostro_hemiptera: figura(
    "05-rostro-sugador.png",
    "Rostro sugador com lábio segmentado e estiletes.",
    { grupo: "decisao", taxon: "Hemiptera" },
  ),
  insecta_bucal_mastigador: figura(
    "05-aparelho-bucal-mastigador.png",
    "Aparelho bucal mastigador com mandíbulas, maxilas e palpos.",
    { grupo: "apoio", taxon: "Insecta" },
  ),
  insecta_hemielitro_hemiptera: figura(
    "06-hemielitro-hemiptera.png",
    "Hemiélitro com porção basal coriácea e ápice membranoso.",
    { grupo: "decisao", taxon: "Hemiptera" },
  ),
  insecta_hemielitro_comparacao: figura(
    "06-comparacao-hemielitro-asa-membranosa.png",
    "Comparação entre hemiélitro e asa membranosa.",
    { grupo: "apoio", taxon: "Insecta" },
  ),
  insecta_cintura_apocrita: figura(
    "07-cintura-estreita-apocrita.png",
    "Cintura estreita com propódeo, pecíolo e gáster.",
    { grupo: "decisao", taxon: "Hymenoptera" },
  ),
  insecta_perna_saltatoria_orthoptera: figura(
    "08-perna-saltatoria-orthoptera.png",
    "Perna saltatória com fêmur robusto e tíbia espinhosa.",
    { grupo: "decisao", taxon: "Orthoptera" },
  ),
  insecta_pernas_comparacao: figura(
    "08-comparacao-perna-saltatoria-ambulatoria.png",
    "Comparação entre perna saltatória e ambulatória.",
    { grupo: "apoio", taxon: "Insecta" },
  ),
  insecta_cercos_dermaptera: figura(
    "09-cercos-em-pinca-dermaptera.png",
    "Cercos em pinça característicos de Dermaptera.",
    { grupo: "decisao", taxon: "Dermaptera" },
  ),
  insecta_corpo_blattodea: figura(
    "10-corpo-achatado-blattodea.png",
    "Corpo achatado e pronoto amplo em Blattodea.",
    { grupo: "decisao", taxon: "Blattodea" },
  ),
  insecta_forma_corpo_comparacao: figura(
    "10-comparacao-corpo-achatado.png",
    "Comparação entre corpo achatado e corpo convexo.",
    { grupo: "apoio", taxon: "Insecta" },
  ),
  insecta_asas_semelhantes_cupins: figura(
    "11-asas-semelhantes-cupins.png",
    "Dois pares de asas membranosas com tamanho e forma semelhantes.",
    { grupo: "decisao", taxon: "Cupins / Blattodea" },
  ),
  insecta_asas_pares_comparacao: figura(
    "11-comparacao-asas-semelhantes-diferenciadas.png",
    "Comparação entre pares de asas semelhantes e diferenciados.",
    { grupo: "apoio", taxon: "Insecta" },
  ),
  insecta_antena_aristada_diptera: figura(
    "12-antena-aristada-diptera.png",
    "Antena aristada com escapo, pedicelo, flagelo e arista.",
    { grupo: "apoio", taxon: "Diptera" },
  ),
  insecta_antena_fusiforme_lepidoptera: figura(
    "13-antena-fusiforme-lepidoptera.png",
    "Antena fusiforme com região mediana dilatada.",
    { grupo: "decisao", taxon: "Lepidoptera" },
  ),
  insecta_perna_raptorial_limpa: figura(
    "13-perna-raptorial-limpa.png",
    "Perna anterior raptorial com espinhos e adaptação para apreensão.",
    { grupo: "decisao", taxon: "Mantodea" },
  ),
  insecta_painel_asas: figura(
    "painel-tipos-de-asas.png",
    "Painel com os principais tipos de asas dos insetos.",
    { grupo: "painel", taxon: "Insecta" },
  ),
  insecta_painel_antenas: figura(
    "painel-tipos-de-antenas.png",
    "Painel com os principais tipos de antenas dos insetos.",
    { grupo: "painel", taxon: "Insecta" },
  ),
  insecta_painel_pernas: figura(
    "painel-tipos-de-pernas.png",
    "Painel com os principais tipos de pernas dos insetos.",
    { grupo: "painel", taxon: "Insecta" },
  ),
  insecta_painel_bucais: figura(
    "painel-aparelhos-bucais.png",
    "Painel com os principais aparelhos bucais dos insetos.",
    { grupo: "painel", taxon: "Insecta" },
  ),
  insecta_catalogo_visual: figura(
    "catalogo-visual.png",
    "Catálogo visual consolidado das imagens da chave de Insecta.",
    { grupo: "catalogo", taxon: "Insecta" },
  ),
};
