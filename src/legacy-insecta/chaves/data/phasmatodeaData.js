import { EXPLICACOES_PHASMATODEA as E } from "./explicacoes.js";

export const phasmatodeaNodes = {
  p1: {
    title: "1",
    prompt:
      "Corpo deprimido, foliáceo, com expansões laminares laterais bem evidentes nas pernas e no corpo OU corpo alongado, subcilíndrico ou apenas levemente achatado, sem expansões laminares foliares típicas",
    a: {
      text:
        "Corpo deprimido, foliáceo, com expansões laminares laterais bem evidentes nas pernas e no corpo",
      result: "PHYLLIIDAE",
      explanation: E.CORPO_FOLIACEO,
    },
    b: {
      text:
        "Corpo alongado, subcilíndrico ou apenas levemente achatado, sem expansões laminares foliares típicas",
      next: "p1b",
      explanation: E.CORPO_BACILIFORME,
    },
  },

  p1b: {
    title: "2(1')",
    prompt:
      "O mesotórax é relativamente curto, nunca mais de três vezes o comprimento do protórax?",
    a: {
      text:
        "Mesotórax relativamente curto, com corpo menos extremamente alongado que os bichos-pau típicos",
      result: "PSEUDOPHASMATIDAE",
      explanation: E.MESOTORAX_CURTO_PSEUDOPHASMATIDAE,
    },
    b: {
      text:
        "Mesotórax muito alongado, formando corpo nitidamente baciliforme",
      next: "p2",
      explanation: E.MESOTORAX_ALONGADO_BACILIFORME,
    },
  },

  p2: {
    title: "3(2')",
    prompt:
      "Asas ausentes ou muito reduzidas OU asas presentes e evidentes",
    a: {
      text: "Asas ausentes ou muito reduzidas",
      result: "PHASMATODEA_APTERO_BRAQUIPTERO",
      explanation: E.ASAS_AUSENTES_REDUZIDAS,
    },
    b: {
      text: "Asas presentes e evidentes",
      result: "PHASMATODEA_ALADO",
      explanation: E.ASAS_PRESENTES,
    },
  },
};
