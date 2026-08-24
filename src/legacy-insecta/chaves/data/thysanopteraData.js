import { EXPLICACOES_THYSANOPTERA as E } from "./explicacoes.js";

export const thysanopteraNodes = {

  t1: {
    title: "1",
    prompt: "Observe o ápice do abdome e as asas anteriores",

    a: {
      text: "Extremidade abdominal em tubo; asas anteriores sem nervuras aparentes e sem setas, em fêmeas e machos (Subordem Tubulifera)",
      result: "PHLAEOTHRIPIDAE",
      explanation: E.THYSANOPTERA_ABDOME_TUBULAR
    },

    b: {
      text: "Extremidade abdominal sem forma tubular; asas anteriores com nervuras e setas, e ovipositor desenvolvido (Subordem Terebrantia)",
      next: "t2",
      explanation: E.THYSANOPTERA_ABDOME_NAO_TUBULAR
    },
  },

  t2: {
    title: "2(1')",
    prompt: "Qual é a posição do ovipositor e como são as antenas?",

    a: {
      text: "Em vista lateral, ovipositor dirigido para cima; antenas com 9 artículos, sensilo linear alongado no antenômero III e asas anteriores largas",
      result: "AEOLOTHRIPIDAE",
      explanation: E.THYSANOPTERA_OVIPOSITOR_PARA_CIMA
    },

    b: {
      text: "Em vista lateral, ovipositor dirigido para baixo",
      next: "t3",
      explanation: E.THYSANOPTERA_OVIPOSITOR_PARA_BAIXO
    },
  },

  t3: {
    title: "3(2')",
    prompt: "Quantos artículos há nas antenas e como são os sensórios?",

    a: {
      text: "Antenas com 9 artículos; sensórios dos antenômeros III e IV formando estruturas anelares",
      result: "HETEROTHRIPIDAE",
      explanation: E.THYSANOPTERA_ANTENA_9_SENSORIO_ANELAR
    },

    b: {
      text: "Antenas geralmente com 6 a 8 artículos; sensilos pontiagudos simples ou bifurcados nos antenômeros III e IV",
      result: "THRIPIDAE",
      explanation: E.THYSANOPTERA_ANTENA_6_8_SENSORIO_PONTIAGUDO
    },
  },

};
