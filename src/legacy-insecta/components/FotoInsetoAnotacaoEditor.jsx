import FotoAnotadaEditor from "./FotoAnotadaEditor.jsx";

/**
 * Wrapper de compatibilidade com o novo componente unificado.
 * Mantém a mesma API da versão anterior para não quebrar imports existentes.
 * 
 * Para novos desenvolvimentos, use FotoAnotadaEditor diretamente.
 */
export default function FotoInsetoAnotacaoEditor({
  foto,
  edicaoConcluida = false,
  onEdicaoConcluidaChange,
  setas = [],
  onSetasChange,
  onFotoChange,
  rotuloFoto = "Foto do inseto",
  titulo = "Anotações na foto",
}) {
  return (
    <FotoAnotadaEditor
      foto={foto}
      edicaoConcluida={edicaoConcluida}
      onEdicaoConcluidaChange={onEdicaoConcluidaChange}
      setas={setas}
      onSetasChange={onSetasChange}
      onFotoChange={onFotoChange}
      rotuloFoto={rotuloFoto}
      titulo={titulo}
      modo="cores"
    />
  );
}
