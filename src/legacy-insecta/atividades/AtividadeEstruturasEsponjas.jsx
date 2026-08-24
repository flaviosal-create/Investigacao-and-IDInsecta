import AtividadeMicroscopioEstereoscopico from "./AtividadeMicroscopioEstereoscopico.jsx";
import { roteiroEstruturasSustentacaoEsponjas } from "./roteirosPraticas.js";

const configEstruturasEsponjas = {
  roteiro: roteiroEstruturasSustentacaoEsponjas,
  titulo: "Estruturas de sustentação das esponjas",
  intro:
    "Prepare fragmentos de esponjas, observe espículas e espongina ao microscópio e registre fotos anotadas das estruturas de sustentação.",
  tituloRelatorio: "Relatório - Estruturas de sustentação das esponjas",
  novoRegistro: "Nova preparação",
  itemFallback: "Preparação",
  tituloFallbackRelatorio: "Preparação sem identificação",
  idPrefix: "esponja",
  campoIdentificacao: "Identificação da amostra",
  placeholderIdentificacao:
    "Ex.: coleção úmida - amostra 1; material recém coletado - ponto A...",
  tituloFoto: "Foto da preparação",
  altFoto: "Foto da preparação de espículas",
  altRelatorio: "Registro da preparação de esponja",
  metaLabel: "Origem do material",
  metaDefault: "colecao-umida",
  metaOptions: [
    ["colecao-umida", "Coleção úmida"],
    ["recem-coletado", "Recém coletado"],
    ["outra", "Outra origem"],
  ],
};

export default function AtividadeEstruturasEsponjas({ onBack }) {
  return (
    <AtividadeMicroscopioEstereoscopico
      onBack={onBack}
      config={configEstruturasEsponjas}
    />
  );
}
