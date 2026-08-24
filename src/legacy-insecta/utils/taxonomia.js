import {
  chavePrincipalConfig,
  chavesConfig,
} from "../chaves/config/chavesConfig.js";
import { normalizar } from "./text.js";

const CLASSES_ARTROPODES = [
  { id: "ARACHNIDA", nome: "Arachnida" },
  { id: "CRUSTACEA", nome: "Crustacea" },
  { id: "CHILOPODA", nome: "Chilopoda" },
  { id: "DIPLOPODA", nome: "Diplopoda" },
];

const SUBCHAVES_ESPECIAIS = {
  HEMIPTERA: {
    id: "HETEROPTERA",
    nome: "Heteroptera",
    rank: "subordem",
    chave: "HEMIPTERA HETEROPTERA",
  },
};

function escolhasDosNos(nodes = {}) {
  return Object.values(nodes).flatMap((node) =>
    Object.values(node || {}).filter(
      (valor) =>
        valor &&
        typeof valor === "object" &&
        ("result" in valor || "goto" in valor || "next" in valor)
    )
  );
}

function resultadoRank(id) {
  if (id.endsWith("INAE")) return "subfamília";
  if (id.endsWith("IDAE")) return "família";
  return "categoria";
}

export function formatarNomeTaxon(id = "") {
  return String(id)
    .trim()
    .toLocaleLowerCase("pt-BR")
    .replace(/(^|[\s-])(\p{L})/gu, (_, separador, letra) =>
      `${separador}${letra.toLocaleUpperCase("pt-BR")}`
    );
}

function resultadosDaChave(chave, configs, visitadas = new Set()) {
  const config = configs[chave];
  if (!config || visitadas.has(chave)) return [];

  const proximasVisitadas = new Set(visitadas);
  proximasVisitadas.add(chave);
  const vistos = new Set();

  return escolhasDosNos(config.nodes).flatMap((escolha) => {
    const resultado = escolha.result?.trim();
    if (!resultado || vistos.has(resultado)) return [];
    vistos.add(resultado);

    const filho = {
      id: resultado,
      nome: formatarNomeTaxon(resultado),
      rank: resultadoRank(resultado),
      chave: escolha.goto || null,
      filhos: [],
    };

    if (escolha.goto && configs[escolha.goto]) {
      filho.filhos = resultadosDaChave(
        escolha.goto,
        configs,
        proximasVisitadas
      );
    }

    return [filho];
  });
}

function ordensDaChavePrincipal(config) {
  const vistos = new Set();

  return escolhasDosNos(config.nodes).flatMap((escolha) => {
    const resultado = escolha.result?.trim();
    if (!resultado || vistos.has(resultado)) return [];
    vistos.add(resultado);
    return [{ id: resultado, chave: escolha.goto || resultado }];
  });
}

function enriquecer(node, caminho = [], caminhoIds = []) {
  const caminhoAtual = [...caminho, node.nome];
  const caminhoIdsAtual = [...caminhoIds, node.id];
  const uid = caminhoIdsAtual.join("/");
  const filhos = (node.filhos || []).map((filho) =>
    enriquecer(filho, caminhoAtual, caminhoIdsAtual)
  );
  const totalDescendentes = filhos.reduce(
    (total, filho) => total + 1 + filho.totalDescendentes,
    0
  );

  return {
    ...node,
    uid,
    caminho: caminhoAtual,
    caminhoIds: caminhoIdsAtual,
    filhos,
    totalDescendentes,
  };
}

export function criarArvoreTaxonomica({
  principal = chavePrincipalConfig,
  configs = chavesConfig,
} = {}) {
  const ordens = ordensDaChavePrincipal(principal).map(({ id, chave }) => {
    const filhos = resultadosDaChave(chave, configs);
    const subchaveEspecial = SUBCHAVES_ESPECIAIS[id];

    if (subchaveEspecial) {
      filhos.push({
        ...subchaveEspecial,
        filhos: resultadosDaChave(subchaveEspecial.chave, configs),
      });
    }

    return {
      id,
      nome: formatarNomeTaxon(id),
      rank: "ordem",
      chave: configs[chave] ? chave : null,
      filhos,
    };
  });

  return enriquecer({
    id: "ARTHROPODA",
    nome: "Arthropoda",
    rank: "filo",
    chave: null,
    filhos: [
      ...CLASSES_ARTROPODES.map((classe) => ({
        ...classe,
        rank: "classe",
        chave: null,
        filhos: [],
      })),
      {
        id: "INSECTA",
        nome: "Insecta",
        rank: "classe",
        chave: "CHAVE PRINCIPAL",
        filhos: ordens,
      },
    ],
  });
}

export function achatarArvoreTaxonomica(raiz) {
  const itens = [];

  function visitar(node) {
    itens.push(node);
    node.filhos.forEach(visitar);
  }

  visitar(raiz);
  return itens;
}

export function buscarNaArvoreTaxonomica(raiz, busca) {
  const termo = normalizar(busca);
  if (!termo) return [];

  return achatarArvoreTaxonomica(raiz).filter((node) => {
    const texto = normalizar(
      `${node.nome} ${node.rank} ${node.caminho.join(" ")}`
    );
    return texto.includes(termo);
  });
}

export function encontrarTaxon(raiz, id) {
  return (
    achatarArvoreTaxonomica(raiz).find(
      (node) => node.uid === id || node.id === id
    ) || null
  );
}

export const arvoreTaxonomica = criarArvoreTaxonomica();
