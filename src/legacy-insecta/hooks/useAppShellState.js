import { useEffect, useMemo, useState } from "react";

import {
  chaveArtropodes,
  chavePrincipalConfig,
  chavesConfig,
} from "../chaves/config/chavesConfig.js";
import { validarTodasAsChaves } from "../utils/validacaoChaves.js";
import {
  carregarAmbienteEscolar,
  DISCIPLINA_PADRAO_ID,
  obterTurmaAtiva,
  salvarAmbienteEscolar,
} from "../utils/ambienteEscolar.js";
import {
  aplicarTemaVisual,
  normalizarTemaVisual,
  THEME_STORAGE_KEY,
} from "../theme/appTheme.js";

export function useAppShellState() {
  const [retornoCadastro, setRetornoCadastro] = useState("atividades");
  const [retornoRelatorios, setRetornoRelatorios] = useState("atividades");
  const [retornoColecao, setRetornoColecao] = useState("atividades");
  const [retornoMicroscopio, setRetornoMicroscopio] = useState("atividades");
  const [retornoLaminas, setRetornoLaminas] = useState("atividades");
  const [retornoEsponjas, setRetornoEsponjas] = useState("atividades");
  const [retornoIntroMicroscopia, setRetornoIntroMicroscopia] =
    useState("atividades");
  const [retornoHistologiaAtividade, setRetornoHistologiaAtividade] =
    useState("histologia");
  const [retornoAluno, setRetornoAluno] = useState("atividades");
  const [retornoGerador, setRetornoGerador] = useState("inicio");
  const [contextoGerador, setContextoGerador] = useState("insetos");
  const [retornoTaxonomia, setRetornoTaxonomia] = useState("inicio");
  const [acessoAluno, setAcessoAluno] = useState(null);
  const [temaVisual, setTemaVisual] = useState(() => {
    try {
      return normalizarTemaVisual(
        localStorage.getItem(THEME_STORAGE_KEY) || "labsed",
      );
    } catch {
      return "labsed";
    }
  });
  const [sidebarContexto, setSidebarContexto] = useState({
    observacoes: [],
    hipoteses: [],
  });
  const [disciplinaAtualId, setDisciplinaAtualId] =
    useState(DISCIPLINA_PADRAO_ID);
  const [ambienteEscolar, setAmbienteEscolar] = useState(() =>
    carregarAmbienteEscolar(DISCIPLINA_PADRAO_ID)
  );
  const turmaAtiva = useMemo(
    () => obterTurmaAtiva(ambienteEscolar),
    [ambienteEscolar]
  );
  const [problemasChaves] = useState(() =>
    validarTodasAsChaves({
      chavePrincipalConfig,
      chaveArtropodes,
      chavesConfig,
    })
  );

  useEffect(() => {
    salvarAmbienteEscolar(ambienteEscolar, disciplinaAtualId);
  }, [ambienteEscolar, disciplinaAtualId]);

  useEffect(() => {
    const temaNormalizado = normalizarTemaVisual(temaVisual);
    aplicarTemaVisual(temaNormalizado);
    localStorage.setItem(THEME_STORAGE_KEY, temaNormalizado);
  }, [temaVisual]);

  return {
    acessoAluno,
    ambienteEscolar,
    contextoGerador,
    disciplinaAtualId,
    problemasChaves,
    retornoAluno,
    retornoCadastro,
    retornoColecao,
    retornoEsponjas,
    retornoGerador,
    retornoHistologiaAtividade,
    retornoIntroMicroscopia,
    retornoLaminas,
    retornoMicroscopio,
    retornoRelatorios,
    retornoTaxonomia,
    setAcessoAluno,
    setAmbienteEscolar,
    setContextoGerador,
    setDisciplinaAtualId,
    setRetornoAluno,
    setRetornoCadastro,
    setRetornoColecao,
    setRetornoEsponjas,
    setRetornoGerador,
    setRetornoHistologiaAtividade,
    setRetornoIntroMicroscopia,
    setRetornoLaminas,
    setRetornoMicroscopio,
    setRetornoRelatorios,
    setRetornoTaxonomia,
    setSidebarContexto,
    setTemaVisual,
    sidebarContexto,
    temaVisual,
    turmaAtiva,
  };
}
