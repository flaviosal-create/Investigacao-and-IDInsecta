import AtividadeMicroscopioEstereoscopico from "./AtividadeMicroscopioEstereoscopico.jsx";
import { roteiroKitLaminasInvertebrados } from "./roteirosPraticas.js";

const configKitLaminas = {
  roteiro: roteiroKitLaminasInvertebrados,
  titulo: "Kit de lâminas de invertebrados",
  intro:
    "Registre cada lâmina do kit, fotografe o campo observado e use setas coloridas para montar a legenda das estruturas identificadas.",
  tituloRelatorio: "Relatório - Kit de lâminas de invertebrados",
  novoRegistro: "Nova lâmina",
  itemFallback: "Lâmina",
  tituloFallbackRelatorio: "Lâmina sem identificação",
  idPrefix: "lamina",
  campoIdentificacao: "Identificação da lâmina",
  placeholderIdentificacao:
    "Ex.: Platyhelminthes - corte transversal; Nematoda - corpo inteiro...",
  tituloFoto: "Foto da lâmina",
  altFoto: "Foto da lâmina observada",
  altRelatorio: "Registro da lâmina",
  metaLabel: "Tipo de preparação",
  metaDefault: "montagem",
  metaOptions: [
    ["montagem", "Montagem total"],
    ["corte", "Corte histológico"],
    ["esfregaco", "Esfregaço"],
    ["detalhe", "Detalhe anatômico"],
  ],
};

export default function AtividadeKitLaminasInvertebrados({ onBack }) {
  return (
    <AtividadeMicroscopioEstereoscopico
      onBack={onBack}
      config={configKitLaminas}
    />
  );
}
