import { chavePrincipalNodes } from "../data/chavePrincipalData.js";
import { coleopteraNodes } from "../data/coleopteraData.js";
import { dermapteraNodes } from "../data/dermapteraData.js";
import { dipteraNodes } from "../data/dipteraData.js";
import { hemipteraHeteropteraNodes } from "../data/hemipteraHeteropteraData.js";
import { hemipteraSubNodes } from "../data/hemipteraSubData.js";
import { hymenopteraNodes } from "../data/hymenopteraData.js";
import { isopteraNodes } from "../data/isopteraData.js";
import { lepidopteraNodes } from "../data/lepidopteraData.js";
import { lepidopteraSubNodes } from "../data/lepidopteraSubData.js";
import { neuropteraNodes } from "../data/neuropteraData.js";
import { odonataNodes } from "../data/odonataData.js";
import { orthopteraNodes } from "../data/orthopteraData.js";
import { orthopteraSubNodes } from "../data/orthopteraSubData.js";
import { thysanopteraNodes } from "../data/thysanopteraData.js";
import { artropodesNodes } from "../data/artropodesData.js";
import { blattodeaNodes } from "../data/blattodeaData.js";
import { mantodeaNodes } from "../data/mantodeaData.js";
import { phasmatodeaNodes } from "../data/phasmatodeaData.js";



/* ====================== CHAVE PRINCIPAL ====================== */

export const chavePrincipalConfig = {
  titulo: "Chave Principal",
  nodes: chavePrincipalNodes,
  startId: "visao_geral",
};

/* ====================== CHAVES DAS ORDENS ====================== */

export const chavesConfig = {
  /* ✅ permite retorno seguro */
  "CHAVE PRINCIPAL": chavePrincipalConfig,

  COLEOPTERA: {
    titulo: "Coleoptera",
    nodes: coleopteraNodes,
    startId: "c1",
    aliases: [],
  },

  DERMAPTERA: {
    titulo: "Dermaptera",
    nodes: dermapteraNodes,
    startId: "d1",
    aliases: [],
  },

  DIPTERA: {
    titulo: "Diptera",
    nodes: dipteraNodes,
    startId: "d1",
    aliases: [],
  },

  /* ✅ HEMIPTERA COM SUBORDENS */
  HEMIPTERA: {
    titulo: "Hemiptera",
    nodes: hemipteraSubNodes,
    startId: "h0",
    aliases: [],
  },

  "HEMIPTERA HETEROPTERA": {
    titulo: "Heteroptera",
    nodes: hemipteraHeteropteraNodes,
    startId: "h1",
    aliases: ["HETEROPTERA"],
  },

  /* ✅ PLACEHOLDERS CORRIGIDOS */

 
  MANTODEA: {
    titulo: "Mantodea",
    nodes: mantodeaNodes,
    startId: "m1",
    aliases: [],
  },

  BLATTODEA: {
    titulo: "Blattodea",
    nodes: blattodeaNodes,
    startId: "b1",
    aliases: [],
  },


  HYMENOPTERA: {
    titulo: "Hymenoptera",
    nodes: hymenopteraNodes,
    startId: "h1",
    aliases: [],
  },

  ISOPTERA: {
    titulo: "Isoptera",
    nodes: isopteraNodes,
    startId: "i1",
    aliases: [],
  },

  LEPIDOPTERA: {
    titulo: "Lepidoptera",
    nodes: lepidopteraNodes,
    startId: "l1",
    aliases: [],
  },

  "LEPIDOPTERA SUB": {
    titulo: "Lepidoptera – Subfamílias",
    nodes: lepidopteraSubNodes,
    startId: "ls1",
    aliases: [],
  },

  NEUROPTERA: {
    titulo: "Neuroptera",
    nodes: neuropteraNodes,
    startId: "n1",
    aliases: [],
  },

  ODONATA: {
    titulo: "Odonata",
    nodes: odonataNodes,
    startId: "o1",
    aliases: [],
  },

  ORTHOPTERA: {
    titulo: "Orthoptera",
    nodes: orthopteraNodes,
    startId: "o1",
    aliases: [],
  },

  "ORTHOPTERA SUB": {
    titulo: "Orthoptera – Subfamílias",
    nodes: orthopteraSubNodes,
    startId: "os1",
    aliases: [],
  },

  THYSANOPTERA: {
    titulo: "Thysanoptera",
    nodes: thysanopteraNodes,
    startId: "t1",
    aliases: [],
  },

  PHASMATODEA: {
  titulo: "Phasmatodea",
  startId: "p1",
  nodes: phasmatodeaNodes,
}
};





/* ====================== ARTRÓPODES ====================== */

export const chaveArtropodes = {
  titulo: "Bônus: Chave de Artrópodes",
  startId: "a1",
  nodes: artropodesNodes,
};
