import { useEffect, useState } from "react";

import {
  atualizarBuscaTela,
  lerTelaInicial,
} from "../utils/navegacaoApp.js";

export function useTelaUrl() {
  const [tela, setTela] = useState(() => lerTelaInicial(window.location.search));

  useEffect(() => {
    const proximaBusca = atualizarBuscaTela(window.location.search, tela);

    if (proximaBusca === window.location.search) return;

    const proximaUrl = `${window.location.pathname}${proximaBusca}${window.location.hash}`;
    window.history.replaceState(window.history.state, "", proximaUrl);
  }, [tela]);

  return [tela, setTela];
}
