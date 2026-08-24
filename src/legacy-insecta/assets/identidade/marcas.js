import logoBotanica from "./botanica.png";
import logoHistologia from "./histologia.png";
import logoProjetoGeral from "./projeto-geral.png";
import logoZoologiaI from "./zoologia-i.png";
import logoZoologiaII from "./zoologia-ii.png";

export const marcasDisciplina = {
  "projeto-geral": {
    id: "projeto-geral",
    titulo: "Laboratório de Biologia",
    alt: "Logo geral do projeto",
    src: logoProjetoGeral,
  },
  "zoologia-i": {
    id: "zoologia-i",
    titulo: "Zoologia I",
    alt: "Logo de Zoologia I",
    src: logoZoologiaI,
  },
  "zoologia-ii": {
    id: "zoologia-ii",
    titulo: "Zoologia II",
    alt: "Logo de Zoologia II",
    src: logoZoologiaII,
  },
  histologia: {
    id: "histologia",
    titulo: "Histologia",
    alt: "Logo de Histologia",
    src: logoHistologia,
  },
  "botanica-i": {
    id: "botanica-i",
    titulo: "Botânica I",
    alt: "Logo de Botânica",
    src: logoBotanica,
  },
  "botanica-ii": {
    id: "botanica-ii",
    titulo: "Botânica II",
    alt: "Logo de Botânica",
    src: logoBotanica,
  },
  "anatomia-fisiologia-vegetal": {
    id: "anatomia-fisiologia-vegetal",
    titulo: "Anatomia e Fisiologia Vegetal",
    alt: "Logo de Botânica",
    src: logoBotanica,
  },
};

export function obterMarcaDisciplina(id = "") {
  return marcasDisciplina[id] || marcasDisciplina["projeto-geral"];
}
