const QUERY_PARAM_TELA = "tela";

const TELA_POR_QUERY = {
  colecao: "colecao",
  insetos: "inicio",
  "zoologia-i": "atividades",
  histologia: "histologia",
  taxonomia: "taxonomia",
  cadastro: "cadastro",
};

const QUERY_POR_TELA = {
  colecao: "colecao",
  inicio: "insetos",
  atividades: "zoologia-i",
  histologia: "histologia",
  taxonomia: "taxonomia",
  cadastro: "cadastro",
};

export function lerTelaInicial(search) {
  const params = new URLSearchParams(search || "");
  const tela = params.get(QUERY_PARAM_TELA);

  return TELA_POR_QUERY[tela] || "disciplinas";
}

export function atualizarBuscaTela(search, tela) {
  const params = new URLSearchParams(search || "");
  const valor = QUERY_POR_TELA[tela];

  if (valor) {
    params.set(QUERY_PARAM_TELA, valor);
  } else {
    params.delete(QUERY_PARAM_TELA);
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}
