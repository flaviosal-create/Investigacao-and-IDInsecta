function resolverContexto(contexto = {}) {
  return {
    singular: contexto.singular || "exsicata",
    plural: contexto.plural || "exsicatas",
    tituloLocal: contexto.tituloLocal || "Coleção local",
    tituloConectando: contexto.tituloConectando || "Conectando coleção",
    tituloContaConectada: contexto.tituloContaConectada || "Conta conectada",
    tituloSincronizada:
      contexto.tituloSincronizada || "Coleção sincronizada",
    tituloSincronizando:
      contexto.tituloSincronizando || "Sincronizando nuvem",
    tituloFalhaSincronizacao:
      contexto.tituloFalhaSincronizacao || "Falha na sincronização",
    tituloFalhaEnvio: contexto.tituloFalhaEnvio || "Falha no envio",
    tituloConflitoResolvido:
      contexto.tituloConflitoResolvido || "Conflitos resolvidos",
  };
}

export function criarStatusInicial(professorUserId, contexto) {
  const cfg = resolverContexto(contexto);
  return professorUserId
    ? {
        tipo: "sincronizando",
        titulo: cfg.tituloConectando,
        descricao: "Verificando a coleção desta conta na nuvem.",
      }
    : {
        tipo: "local",
        titulo: cfg.tituloLocal,
        descricao: `As ${cfg.plural} estão salvas apenas neste navegador.`,
      };
}

export function criarStatusContaSemDados(contexto) {
  const cfg = resolverContexto(contexto);
  return {
    tipo: "sincronizado",
    titulo: cfg.tituloContaConectada,
    descricao: `Ainda não há ${cfg.plural} na nuvem para esta conta.`,
  };
}

export function criarStatusColecaoSincronizada(contexto) {
  const cfg = resolverContexto(contexto);
  return {
    tipo: "sincronizado",
    titulo: cfg.tituloSincronizada,
    descricao: `As ${cfg.plural} desta conta foram carregadas da nuvem.`,
  };
}

export function criarStatusSincronizandoNuvem(contexto) {
  const cfg = resolverContexto(contexto);
  return {
    tipo: "sincronizando",
    titulo: cfg.tituloSincronizando,
    descricao: `Enviando alterações da ${cfg.singular} para esta conta.`,
  };
}

export function criarStatusFalhaSincronizacao(mensagem, contexto) {
  const cfg = resolverContexto(contexto);
  return {
    tipo: "erro",
    titulo: cfg.tituloFalhaSincronizacao,
    descricao:
      mensagem ||
      "A coleção continua local, mas a nuvem não pôde ser alcançada agora.",
  };
}

export function criarStatusFalhaEnvio(mensagem, contexto) {
  const cfg = resolverContexto(contexto);
  return {
    tipo: "erro",
    titulo: cfg.tituloFalhaEnvio,
    descricao: mensagem || `A ${cfg.singular} foi mantida localmente, mas a sincronização falhou.`,
  };
}

export function criarStatusLocal(descricao, contexto) {
  const cfg = resolverContexto(contexto);
  return {
    tipo: "local",
    titulo: cfg.tituloLocal,
    descricao:
      descricao || `As ${cfg.plural} estão salvas apenas neste navegador.`,
  };
}

export function criarStatusConflitoResolvido(resumo, contexto) {
  const cfg = resolverContexto(contexto);
  const total = Number(resumo?.totalConflitos || 0);
  const local = Number(resumo?.vencedoresLocal || 0);
  const remoto = Number(resumo?.vencedoresRemoto || 0);
  const empates = Number(resumo?.empates || 0);

  return {
    tipo: "atencao",
    titulo: cfg.tituloConflitoResolvido,
    descricao:
      total <= 0
        ? `Não houve disputa entre versões de ${cfg.plural}.`
        : [
            `${total} item(ns) tinham versões diferentes entre este navegador e a nuvem.`,
            local ? `${local} manteve(m) a versão local.` : "",
            remoto ? `${remoto} assumiu(ram) a versão da nuvem.` : "",
            empates ? `${empates} ficaram empatados e seguiram a versão remota.` : "",
          ]
            .filter(Boolean)
            .join(" "),
  };
}

export function resolverStatusItem(item, professorUserId, statusAtual) {
  if (statusAtual === "sincronizado") {
    return { tipo: "sincronizado", rotulo: "Nuvem" };
  }
  if (statusAtual === "sincronizando") {
    return { tipo: "sincronizando", rotulo: "Sincronizando" };
  }
  if (statusAtual === "erro") {
    return { tipo: "erro", rotulo: "Falha" };
  }
  if (!professorUserId) {
    return { tipo: "local", rotulo: "Local" };
  }
  if (item?.status === "publicado" || item?.atualizadoEm) {
    return { tipo: "local", rotulo: "Local" };
  }
  return { tipo: "local", rotulo: "Local" };
}

export function obterStatusItemStyle(tipo, statusItemStyles) {
  return statusItemStyles[tipo] || statusItemStyles.local;
}

export function obterStatusCardStyle(tipo, statusCards) {
  return statusCards[tipo] || statusCards.local;
}
