export function toNodeMap(nodes) {
  if (!nodes) return {};

  if (!Array.isArray(nodes) && typeof nodes === "object") {
    return nodes;
  }

  if (Array.isArray(nodes)) {
    return nodes.reduce((acc, node) => {
      if (node?.id) acc[node.id] = node;
      return acc;
    }, {});
  }

  return {};
}

export function idsDisponiveis(nodeMap) {
  return Object.keys(nodeMap || {});
}

export function formatarResultado(result) {
  const mapa = {
    CRUSTACEA: "Crustacea",
    CHILOPODA: "Chilopoda",
    DIPLOPODA: "Diplopoda",
    INSECTA: "Insecta",
    ARACNIDA_3D: "Aracnídeo",
    ARACHNIDA: "Aracnídeo",
    BRYOPHYTA_MUSGOS: "Bryophyta (musgos)",
    ANTHOCEROTOPHYTA_ANTOCEROS: "Anthocerotophyta (antóceros)",
    MARCHANTIOPHYTA_HEPATICAS: "Marchantiophyta (hepáticas)",
    LYCOPHYTA_LICOFITAS: "Lycophyta (licófitas)",
    POLYPODIOPSIDA_SAMAMBAIAS: "Polypodiopsida (samambaias)",
    EQUISETOPSIDA_CAVALINHAS: "Equisetopsida (cavalinhas)",
    PINOPHYTA_CONIFERAS: "Pinophyta (coníferas)",
    CYCADOPHYTA_CICAS: "Cycadophyta (cicas)",
    GINKGOPHYTA_OU_GNETOPHYTA: "Ginkgo/Gnetophyta",
    ANGIOSPERMAE_EUDICOTILEDONEAS: "Angiospermae: eudicotiledôneas",
    ANGIOSPERMAE_INDETERMINADA: "Angiospermae indeterminada",
    EUDICOTILEDONEAS_OUTRAS_OU_INDETERMINADAS:
      "Eudicotiledôneas outras ou indeterminadas",
    FAMILIA_POACEAE: "Poaceae (gramíneas)",
    FAMILIA_CYPERACEAE: "Cyperaceae (tiriricas e ciperáceas)",
    MONOCOTILEDONEA_GRAMINOIDE_INDETERMINADA:
      "Monocotiledônea graminoide indeterminada",
    FAMILIA_ARECACEAE: "Arecaceae (palmeiras)",
    FAMILIA_ORCHIDACEAE: "Orchidaceae (orquídeas)",
    FAMILIA_BROMELIACEAE: "Bromeliaceae (bromélias)",
    FAMILIA_ARACEAE: "Araceae (aráceas)",
    MONOCOTILEDONEA_NAO_GRAMINOIDE_INDETERMINADA:
      "Monocotiledônea não graminoide indeterminada",
    FAMILIA_LAURACEAE: "Lauraceae (louros, canelas e abacateiro)",
    FAMILIA_PIPERACEAE: "Piperaceae (pimentas e peperômias)",
    FAMILIA_NYMPHAEACEAE_OU_BASAL_INDETERMINADA:
      "Nymphaeaceae ou angiosperma basal indeterminada",
    FAMILIA_ASTERACEAE: "Asteraceae (compostas)",
    FAMILIA_LAMIACEAE: "Lamiaceae (hortelãs e afins)",
    FAMILIA_RUBIACEAE: "Rubiaceae (café, ixora e afins)",
    FAMILIA_APOCYNACEAE: "Apocynaceae",
    FAMILIA_SOLANACEAE_OU_ASTERIDEA_INDETERMINADA:
      "Solanaceae ou asterídea indeterminada",
    FAMILIA_FABACEAE: "Fabaceae (leguminosas)",
    FAMILIA_MALVACEAE: "Malvaceae",
    FAMILIA_MYRTACEAE: "Myrtaceae (mirtáceas)",
    FAMILIA_EUPHORBIACEAE: "Euphorbiaceae",
    FAMILIA_BRASSICACEAE_OU_ROSIDEA_INDETERMINADA:
      "Brassicaceae ou rosídea indeterminada",
  };

  return mapa[result] || result;
}

export function formatarContextoChave(valor) {
  return String(valor || "")
    .replace(/^bônus:\s*/i, "")
    .trim();
}

export function getChoiceLabel(choice, key) {
  if (!choice) return null;
  if (choice.text) return choice.text;
  if (choice.result) return formatarResultado(choice.result);
  if (choice.next) return String(choice.next).toUpperCase();
  return key.toUpperCase();
}

export function hasChoice(choice) {
  if (!choice || typeof choice !== "object") return false;
  if (choice.text) return true;
  if (choice.result) return true;
  if (choice.goto) return true;

  if (choice.next && typeof choice.next === "string" && choice.next.trim()) {
    return true;
  }

  return false;
}

export function getOrdemContextoAtual({ ordem, titulo }) {
  return formatarContextoChave(
    ordem || (titulo && titulo !== "Chave Principal" ? titulo : "")
  );
}

export function getTituloExibicao(titulo) {
  if (titulo === "Chave Principal") return "Ordens de Insecta";
  return formatarContextoChave(titulo);
}

export function getRotuloItem({ titulo, ordemContextoAtual }) {
  const contexto = `${titulo || ""} ${ordemContextoAtual || ""}`;
  const ehChaveArtropodes = /artropod|artrópod/i.test(
    contexto
  );
  const ehChaveBotanica = /bot[aâ]nic|plantae|planta|vegetal/i.test(contexto);

  if (ehChaveBotanica) return "planta";
  return ehChaveArtropodes ? "artrópode" : "inseto";
}

export function formatarTempoProva({
  isProva,
  tempoPorInsetoMin,
  tempoRestante,
}) {
  if (!isProva) return "";
  if (tempoPorInsetoMin <= 0) return "Tempo livre";
  if (tempoRestante === null) return "";

  const minutos = Math.floor(Math.max(0, tempoRestante) / 60);
  const segundos = Math.max(0, tempoRestante) % 60;

  return `Tempo ${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

export function montarCaminhoTaxonomico({
  titulo,
  ordemContextoAtual,
  isSubKey,
  result,
}) {
  const partes = [];

  const add = (valor) => {
    const txt = String(valor || "").trim();
    if (!txt) return;
    if (!partes.includes(txt)) partes.push(txt);
  };

  if (titulo === "Chave Principal") {
    add("Ordens de Insecta");
  } else {
    add(formatarContextoChave(ordemContextoAtual || titulo));

    if (isSubKey && titulo && titulo !== ordemContextoAtual) {
      add(formatarContextoChave(titulo));
    }
  }

  if (result) {
    const finalLabel = formatarResultado(result);

    if (
      finalLabel &&
      finalLabel !== ordemContextoAtual &&
      finalLabel !== titulo
    ) {
      add(finalLabel);
    }
  }

  return partes;
}

export function montarPassoEscolha({
  currentId,
  node,
  key,
  choice,
  ordemContextoAtual,
}) {
  return {
    id: currentId,
    passo: node.title,
    prompt: node.prompt,
    alternativa: key.toUpperCase(),
    escolha: choice.text || choice.result || key,
    figs: choice.figs || [],
    next: choice.next || null,
    result: choice.result || null,
    goto: choice.goto || null,
    contextoVisual: choice.goto || ordemContextoAtual || "",
  };
}

export function montarHistoricoEscolha({ currentId, node, key, choice }) {
  return {
    id: currentId,
    title: node.title,
    selected: choice.text || choice.result || key,
  };
}

export function montarPassoTempoEsgotado({
  currentId,
  node,
  ordemContextoAtual,
}) {
  return {
    id: currentId,
    passo: node?.title || "Tempo da prova",
    prompt: node?.prompt || "",
    alternativa: "-",
    escolha: "Tempo esgotado",
    figs: [],
    next: null,
    result: "TEMPO ESGOTADO",
    goto: null,
    contextoVisual: ordemContextoAtual || "",
  };
}

export function formatarCaminhoPercorrido(registro) {
  return registro
    .map((r, i) => `${i + 1}. ${r.passo} (${r.alternativa})`)
    .join(" -> ");
}
