function finalizarFrase(texto = "") {
  const limpo = String(texto).trim().replace(/[?.!]+$/, "");
  return limpo ? `${limpo}.` : "";
}

export function montarAjudaObservacao(node, escolha) {
  const explicacao = escolha?.explanation || {};
  const dica = finalizarFrase(explicacao.hint);
  const pergunta = finalizarFrase(node?.prompt);
  const criterio = finalizarFrase(escolha?.text);

  return {
    ondeOlhar: dica
      ? `Para localizar o caráter, ${dica.charAt(0).toLocaleLowerCase("pt-BR")}${dica.slice(1)}`
      : pergunta
        ? `Examine a estrutura indicada na pergunta: ${pergunta}`
        : "Examine cuidadosamente a estrutura mencionada nesta alternativa.",
    criterio: criterio
      ? `A estrutura observada corresponde a: ${criterio}`
      : "Compare a estrutura observada com a descrição desta alternativa.",
    importancia:
      finalizarFrase(explicacao.body) ||
      "Este caráter é usado para separar esta alternativa das demais possibilidades da chave.",
  };
}
