import AtividadeAtlasHistologiaApp from "./AtividadeAtlasHistologiaApp.jsx";

export default function AtividadeAtlasHistologia({
  onBack,
  professorUserId = "",
  acessoAluno = null,
  onListarRelatorios = null,
}) {
  return (
    <AtividadeAtlasHistologiaApp
      onBack={onBack}
      modo="atlas"
      professorUserId={professorUserId}
      acessoAluno={acessoAluno}
      onListarRelatorios={onListarRelatorios}
    />
  );
}
