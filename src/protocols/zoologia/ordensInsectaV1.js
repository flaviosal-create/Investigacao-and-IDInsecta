import { normalizeProtocol } from "../normalizeProtocol.js";
import { referencesInvertebratesV1 } from "./referencesInvertebratesV1.js";

const rawOrdensInsectaV1 = {
  "id": "ordens-insecta-v1",
  "name": "Ordens de Insecta",
  "domain": "zoologia",
  "description": "Investigação comparativa de ordens de Insecta por combinações de caracteres morfológicos.",
  "references": referencesInvertebratesV1,
  "pedagogicalNote": "Este protocolo compara hipóteses de ordens de Insecta dentro de um recorte didático. As observações sustentam ou enfraquecem interpretações; não constituem uma chave de identificação.",
  "investigationPolicy": {
    "minimumObservedStructuresForConclusion": 3,
    "minimumSupportingStructuresForConclusion": 3
  },
  "observations": [
    {
      "structure": "aparelho_bucal",
      "label": "Aparelho bucal",
      "values": [
        "mastigador",
        "picador_sugador",
        "sugador",
        "lambedor"
      ],
      "visualExamples": {
        "mastigador": {
          "src": "/assets/zoologia/aparelho-bucal/mastigador.jpg",
          "alt": "Ilustração de aparelho bucal mastigador"
        },
        "picador_sugador": {
          "src": "/assets/zoologia/aparelho-bucal/picador-sugador.jpg",
          "alt": "Ilustração de aparelho bucal picador-sugador"
        },
        "sugador": {
          "src": "/assets/zoologia/aparelho-bucal/sugador.jpg",
          "alt": "Ilustração de aparelho bucal sugador"
        },
        "lambedor": {
          "src": "/assets/zoologia/aparelho-bucal/lambedor.jpg",
          "alt": "Ilustração de aparelho bucal lambedor"
        }
      }
    },
    {
      "structure": "asas",
      "label": "Asas",
      "negativeWeightFactor": 0.85,
      "values": [
        "1_par_funcional",
        "2_pares_membranosos",
        "elitros",
        "tegminas",
        "franjadas",
        "escamas",
        "pilosas_telhado",
        "reticuladas",
        "ausentes"
      ],
      "visualExamples": {
        "1_par_funcional": {
          "src": "/assets/zoologia/asas/1-par-funcional.jpg",
          "alt": "Ilustração de asas com um par funcional"
        },
        "2_pares_membranosos": {
          "src": "/assets/zoologia/asas/2-pares-membranosos.jpg",
          "alt": "Ilustração de asas com dois pares membranosos"
        },
        "elitros": {
          "src": "/assets/zoologia/asas/elitros.jpg",
          "alt": "Ilustração de élitros"
        },
        "tegminas": {
          "src": "/assets/zoologia/asas/tegminas.jpg",
          "alt": "Ilustração de tégminas"
        },
        "franjadas": {
          "src": "/assets/zoologia/asas/franjadas.jpg",
          "alt": "Ilustração de asas franjadas"
        },
        "escamas": {
          "src": "/assets/zoologia/asas/escamas.jpg",
          "alt": "Ilustração de asas com escamas"
        },
        "pilosas_telhado": {
          "src": "/assets/zoologia/asas/pilosas-telhado.jpg",
          "alt": "Ilustração de asas pilosas em telhado"
        },
        "reticuladas": {
          "src": "/assets/zoologia/asas/reticuladas.jpg",
          "alt": "Ilustração de asas reticuladas"
        }
      }
    },
    {
      "structure": "antena",
      "label": "Antena",
      "negativeWeightFactor": 0.8,
      "values": [
        "aristada",
        "filiforme",
        "geniculada",
        "clavada",
        "moniliforme",
        "curta"
      ],
      "visualExamples": {
        "aristada": {
          "src": "/assets/zoologia/antenas/aristada.jpg",
          "alt": "Ilustração de antena aristada"
        },
        "filiforme": {
          "src": "/assets/zoologia/antenas/filiforme.jpg",
          "alt": "Ilustração de antena filiforme"
        },
        "geniculada": {
          "src": "/assets/zoologia/antenas/geniculada.jpg",
          "alt": "Ilustração de antena geniculada"
        },
        "clavada": {
          "src": "/assets/zoologia/antenas/clavada.jpg",
          "alt": "Ilustração de antena clavada"
        },
        "moniliforme": {
          "src": "/assets/zoologia/antenas/moniliforme.jpg",
          "alt": "Ilustração de antena moniliforme"
        },
        "curta": {
          "src": "/assets/zoologia/antenas/curta.jpg",
          "alt": "Ilustração de antena curta"
        }
      }
    },
    {
      "structure": "pernas",
      "label": "Pernas",
      "negativeWeightFactor": 0.5,
      "values": [
        "saltatorias",
        "raptatorias",
        "fossoriais",
        "ambulatorias"
      ],
      "visualExamples": {
        "saltatorias": {
          "src": "/assets/zoologia/pernas/saltatorias.jpg",
          "alt": "Ilustração de perna saltatória"
        },
        "raptatorias": {
          "src": "/assets/zoologia/pernas/raptatorias.jpg",
          "alt": "Ilustração de perna raptatória"
        },
        "fossoriais": {
          "src": "/assets/zoologia/pernas/fossoriais.jpg",
          "alt": "Ilustração de perna fossorial"
        },
        "ambulatorias": {
          "src": "/assets/zoologia/pernas/ambulatorias.jpg",
          "alt": "Ilustração de perna ambulatória"
        }
      }
    },
    {
      "structure": "corpo",
      "label": "Corpo",
      "negativeWeightFactor": 0.75,
      "values": [
        "cintura_estreita",
        "corpo_duro",
        "corpo_mole",
        "abdome_alongado",
        "graveto_folha",
        "cercos_pinca",
        "cercos_longos"
      ],
      "visualExamples": {
        "cintura_estreita": {
          "src": "/assets/zoologia/corpo/cintura-estreita.jpg",
          "alt": "Ilustração de cintura estreita"
        },
        "corpo_duro": {
          "src": "/assets/zoologia/corpo/corpo-duro.jpg",
          "alt": "Ilustração de corpo duro"
        },
        "corpo_mole": {
          "src": "/assets/zoologia/corpo/corpo-mole.jpg",
          "alt": "Ilustração de corpo mole"
        },
        "abdome_alongado": {
          "src": "/assets/zoologia/corpo/abdome-alongado.jpg",
          "alt": "Ilustração de abdome alongado"
        },
        "graveto_folha": {
          "src": "/assets/zoologia/corpo/graveto-folha.jpg",
          "alt": "Ilustração de corpo mimético em forma de graveto ou folha"
        },
        "cercos_pinca": {
          "src": "/assets/zoologia/corpo/cercos-pinca.jpg",
          "alt": "Ilustração de cercos em pinça"
        },
        "cercos_longos": {
          "src": "/assets/zoologia/corpo/cercos-longos.jpg",
          "alt": "Ilustração de cercos longos"
        }
      }
    }
  ],
  "hypotheses": [
    {
      "id": "diptera",
      "name": "Diptera",
      "level": "ordem",
      "clue": "Um par funcional de asas é a evidência mais forte; procure halteres atrás das asas."
    },
    {
      "id": "thysanoptera",
      "name": "Thysanoptera",
      "level": "ordem",
      "clue": "Asas estreitas com franjas são o melhor ponto de confirmação; em exemplares sem asas, observe o corpo pequeno e o aparelho bucal."
    },
    {
      "id": "hemiptera",
      "name": "Hemiptera",
      "level": "ordem",
      "clue": "O aparelho bucal picador-sugador é a pista mais importante."
    },
    {
      "id": "orthoptera",
      "name": "Orthoptera",
      "level": "ordem",
      "clue": "Pernas posteriores saltatórias e aparelho bucal mastigador fortalecem a hipótese."
    },
    {
      "id": "phasmatodea",
      "name": "Phasmatodea",
      "level": "ordem",
      "clue": "Corpo em forma de graveto ou folha é o caráter mais forte."
    },
    {
      "id": "blattodea",
      "name": "Blattodea",
      "level": "ordem",
      "clue": "Tégminas, antenas longas e pernas ambulatórias ajudam a separar de Mantodea."
    },
    {
      "id": "mantodea",
      "name": "Mantodea",
      "level": "ordem",
      "clue": "Pernas anteriores raptatórias são o caráter decisivo."
    },
    {
      "id": "dermaptera",
      "name": "Dermaptera",
      "level": "ordem",
      "clue": "Cercos terminais em forma de pinça são a evidência mais forte."
    },
    {
      "id": "coleoptera",
      "name": "Coleoptera",
      "level": "ordem",
      "clue": "Élitros e corpo endurecido são os pontos mais fortes."
    },
    {
      "id": "lepidoptera",
      "name": "Lepidoptera",
      "level": "ordem",
      "clue": "Asas com escamas e aparelho bucal sugador são sinais fortes."
    },
    {
      "id": "trichoptera",
      "name": "Trichoptera",
      "level": "ordem",
      "clue": "Asas pilosas mantidas em telhado ajudam a diferenciar de Lepidoptera."
    },
    {
      "id": "isoptera",
      "name": "Isoptera",
      "level": "ordem",
      "clue": "Antenas moniliformes e corpo mole são bons indicadores."
    },
    {
      "id": "odonata",
      "name": "Odonata",
      "level": "ordem",
      "clue": "Antenas muito curtas e asas membranosas com muitas nervuras são importantes."
    },
    {
      "id": "plecoptera",
      "name": "Plecoptera",
      "level": "ordem",
      "clue": "Dois cercos longos no final do abdômen são a pista mais útil."
    },
    {
      "id": "neuroptera",
      "name": "Neuroptera",
      "level": "ordem",
      "clue": "Asas com muitas nervuras cruzadas e aspecto de rede são decisivas."
    },
    {
      "id": "hymenoptera",
      "name": "Hymenoptera",
      "level": "ordem",
      "clue": "Cintura estreita, antenas e dois pares de asas membranosas ajudam na confirmação."
    }
  ],
  "rules": [
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "diptera",
      "structure": "antena",
      "value": "aristada",
      "effect": "positive",
      "weight": 4
    },
    {
      "hypothesis": "diptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "antena",
      "value": "curta",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "franjadas",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "positive",
      "weight": 3
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "antena",
      "value": "curta",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "hemiptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "positive",
      "weight": 3
    },
    {
      "hypothesis": "orthoptera",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "orthoptera",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "asas",
      "value": "ausentes",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "tegminas",
      "effect": "positive",
      "weight": 4
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "ausentes",
      "effect": "positive",
      "weight": 3
    },
    {
      "hypothesis": "blattodea",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "asas",
      "value": "tegminas",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "asas",
      "value": "ausentes",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "positive",
      "weight": 6
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "positive",
      "weight": 6
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "coleoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "positive",
      "weight": 4
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "escamas",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "positive",
      "weight": 3
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "trichoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "isoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "positive",
      "weight": 4
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "positive",
      "weight": 4
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "curta",
      "effect": "positive",
      "weight": 4
    },
    {
      "hypothesis": "odonata",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "positive",
      "weight": 6
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "neuroptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "positive",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "positive",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "positive",
      "weight": 5
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "asas",
      "value": "1_par_funcional",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "antena",
      "value": "aristada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "asas",
      "value": "franjadas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "aparelho_bucal",
      "value": "picador_sugador",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "pernas",
      "value": "saltatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "pernas",
      "value": "fossoriais",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "graveto_folha",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "pernas",
      "value": "ambulatorias",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "asas",
      "value": "tegminas",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "pernas",
      "value": "raptatorias",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "cercos_pinca",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "asas",
      "value": "elitros",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "corpo_duro",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "asas",
      "value": "escamas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "aparelho_bucal",
      "value": "sugador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "asas",
      "value": "pilosas_telhado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "antena",
      "value": "moniliforme",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "antena",
      "value": "curta",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "cercos_longos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "abdome_alongado",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "asas",
      "value": "reticuladas",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "antena",
      "value": "clavada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hymenoptera",
      "structure": "corpo",
      "value": "corpo_mole",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "2_pares_membranosos",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "asas",
      "value": "ausentes",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "filiforme",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "antena",
      "value": "geniculada",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "mastigador",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "hemiptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "orthoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "blattodea",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "mantodea",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "dermaptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "coleoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "trichoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "isoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "odonata",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "plecoptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "neuroptera",
      "structure": "aparelho_bucal",
      "value": "lambedor",
      "effect": "negative",
      "weight": 1
    },
    {
      "hypothesis": "diptera",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "thysanoptera",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "hemiptera",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "orthoptera",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "phasmatodea",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "blattodea",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "mantodea",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "dermaptera",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "coleoptera",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "lepidoptera",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "trichoptera",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "isoptera",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "odonata",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "plecoptera",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    },
    {
      "hypothesis": "neuroptera",
      "structure": "corpo",
      "value": "cintura_estreita",
      "effect": "negative",
      "weight": 2
    }
  ]
};

export const ordensInsectaV1 =
  normalizeProtocol(
    rawOrdensInsectaV1
  );
