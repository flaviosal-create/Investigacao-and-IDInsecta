import { useCallback, useEffect, useRef, useState } from "react";

import {
  associarProfessorAoAmbiente,
  carregarAmbienteEscolar,
  limparAmbienteEscolar,
  mesclarAmbientesEscolares,
  normalizarDisciplinaId,
} from "../utils/ambienteEscolar.js";
import {
  emailProfessorPermitido,
  professorEmailAutorizadoConfigurado,
} from "../services/supabase.js";

export function useProfessorCloudSync({
  ambienteEscolar,
  disciplinaAtualId,
  setAmbienteEscolar,
}) {
  const [authSession, setAuthSession] = useState(null);
  const [recuperacaoSenhaAtiva, setRecuperacaoSenhaAtiva] = useState(false);
  const [sincronizando, setSincronizando] = useState(false);
  const [mensagemSincronizacao, setMensagemSincronizacao] = useState("");
  const professorRestauradoRef = useRef("");
  const userId = authSession?.user?.id || "";
  const disciplinaNormalizada = normalizarDisciplinaId(
    disciplinaAtualId || ambienteEscolar?.disciplinaId
  );

  const limparEstadoProfessorLocal = useCallback(({ preservarAmbiente = false } = {}) => {
    professorRestauradoRef.current = "";
    setAuthSession(null);
    if (!preservarAmbiente) {
      limparAmbienteEscolar(disciplinaNormalizada);
      setAmbienteEscolar(carregarAmbienteEscolar(disciplinaNormalizada));
    }
    setMensagemSincronizacao("");
    setRecuperacaoSenhaAtiva(false);
  }, [disciplinaNormalizada, setAmbienteEscolar]);

  const atualizarSessaoProfessor = useCallback((session) => {
    const emailProfessor = String(session?.user?.email || "").trim();
    if (session?.user && !emailProfessorPermitido(emailProfessor)) {
      import("../services/supabase.js")
        .then(({ supabase }) => supabase?.auth?.signOut?.({ scope: "local" }))
        .catch(() => {})
        .finally(() => {
          limparEstadoProfessorLocal({ preservarAmbiente: true });
          setMensagemSincronizacao(
            `A conta de professor deste aplicativo está restrita a ${professorEmailAutorizadoConfigurado}.`
          );
        });
      return;
    }

    setAuthSession(session || null);

    const professorId = session?.user?.id;
    if (!professorId) return;

    setAmbienteEscolar((atual) =>
      associarProfessorAoAmbiente(atual, professorId)
    );
  }, [limparEstadoProfessorLocal, setAmbienteEscolar]);

  useEffect(() => {
    const chaveRestauro = `${userId}:${disciplinaNormalizada}`;
    if (!userId || professorRestauradoRef.current === chaveRestauro) return;

    professorRestauradoRef.current = chaveRestauro;
    let ativo = true;

    import("../services/sincronizacao.js")
      .then(({ carregarAmbienteRemoto }) =>
        carregarAmbienteRemoto(userId, disciplinaNormalizada)
      )
      .then((remoto) => {
        if (!ativo || !remoto) return;

        setAmbienteEscolar((atual) => mesclarAmbientesEscolares(atual, remoto));
      })
      .catch((error) => {
        if (erroSessaoSupabaseInvalida(error)) {
          import("../services/supabase.js")
            .then(({ supabase }) => supabase?.auth?.signOut?.({ scope: "local" }))
            .catch(() => {})
            .finally(() => {
              if (!ativo) return;
              limparEstadoProfessorLocal({ preservarAmbiente: true });
              setMensagemSincronizacao(
                "A sessão do professor expirou neste navegador. Entre novamente para restaurar as turmas da nuvem."
              );
            });
          return;
        }
        console.warn("Não foi possível restaurar turmas da nuvem:", error);
      });

    return () => {
      ativo = false;
    };
  }, [disciplinaNormalizada, limparEstadoProfessorLocal, setAmbienteEscolar, userId]);

  useEffect(() => {
    let subscription;
    let ativo = true;

    import("../services/supabase.js").then(({ supabase, supabaseConfigurado }) => {
      if (!ativo || !supabaseConfigurado || !supabase) return;

      supabase.auth.getSession().then(({ data }) => {
        if (ativo) atualizarSessaoProfessor(data.session || null);
      });

      const { data } = supabase.auth.onAuthStateChange((evento, session) => {
        atualizarSessaoProfessor(session);
        setRecuperacaoSenhaAtiva(evento === "PASSWORD_RECOVERY");
        setMensagemSincronizacao("");
      });
      subscription = data.subscription;
    });

    return () => {
      ativo = false;
      subscription?.unsubscribe();
    };
  }, [atualizarSessaoProfessor]);

  const enviarAmbienteParaNuvem = useCallback(async () => {
    setSincronizando(true);
    setMensagemSincronizacao("");

    try {
      const { sincronizarAmbienteRemoto } = await import(
        "../services/sincronizacao.js"
      );
      const resultado = await sincronizarAmbienteRemoto(
        ambienteEscolar,
        userId,
        disciplinaNormalizada
      );
      setMensagemSincronizacao(
        `${resultado.turmas} turmas e ${resultado.alunos} alunos enviados.`
      );
    } catch (error) {
      setMensagemSincronizacao(
        error?.message || "Não foi possível enviar os dados."
      );
    } finally {
      setSincronizando(false);
    }
  }, [ambienteEscolar, disciplinaNormalizada, userId]);

  const baixarAmbienteDaNuvem = useCallback(async () => {
    setSincronizando(true);
    setMensagemSincronizacao("");

    try {
      const { carregarAmbienteRemoto } = await import(
        "../services/sincronizacao.js"
      );
      const remoto = await carregarAmbienteRemoto(userId, disciplinaNormalizada);
      if (!remoto) {
        setMensagemSincronizacao("A conta ainda não possui turmas na nuvem.");
        return;
      }

      setAmbienteEscolar(remoto);
      setMensagemSincronizacao("Dados da nuvem carregados neste dispositivo.");
    } catch (error) {
      setMensagemSincronizacao(
        error?.message || "Não foi possível baixar os dados."
      );
    } finally {
      setSincronizando(false);
    }
  }, [disciplinaNormalizada, setAmbienteEscolar, userId]);

  const listarRelatoriosDaNuvem = useCallback(async () => {
    const { listarRelatoriosRemotos } = await import(
      "../services/sincronizacao.js"
    );
    return listarRelatoriosRemotos(userId);
  }, [userId]);

  const enviarRelatorioParaNuvem = useCallback(async (relatorio) => {
    const { enviarRelatorioRemoto } = await import(
      "../services/sincronizacao.js"
    );
    return enviarRelatorioRemoto(relatorio, userId);
  }, [userId]);

  const revisarRelatorioDaNuvem = useCallback(async ({ relatorioId, feedback }) => {
    const { revisarRelatorioRemoto } = await import(
      "../services/sincronizacao.js"
    );
    return revisarRelatorioRemoto(
      { relatorioId, feedback },
      userId
    );
  }, [userId]);

  const sairProfessorDesteDispositivo = useCallback(async () => {
    const [{ supabase }, { limparSessaoLocalProfessor }] = await Promise.all([
      import("../services/supabase.js"),
      import("../utils/localSecurity.js"),
    ]);

    try {
      await supabase?.auth?.signOut?.({ scope: "local" });
    } finally {
      limparEstadoProfessorLocal({ preservarAmbiente: true });
      limparSessaoLocalProfessor();
    }
  }, [limparEstadoProfessorLocal]);

  return {
    authSession,
    baixarAmbienteDaNuvem,
    enviarAmbienteParaNuvem,
    enviarRelatorioParaNuvem,
    listarRelatoriosDaNuvem,
    mensagemSincronizacao,
    recuperacaoSenhaAtiva,
    revisarRelatorioDaNuvem,
    sairProfessorDesteDispositivo,
    sincronizando,
  };
}

function erroSessaoSupabaseInvalida(error) {
  const mensagem = String(error?.message || error || "").trim();
  const status = Number(error?.status || error?.code || 0);

  return (
    status === 401 ||
    /jwt|unauthorized|invalid token|invalid jwt|refresh token|session/i.test(
      mensagem
    )
  );
}
