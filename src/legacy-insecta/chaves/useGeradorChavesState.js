import { useMemo, useState } from "react";

import simboloLabsed from "../assets/simbolo-lab-softwares-educacionais.svg";
import { imagens } from "../data/imagens.js";
import { safeFileName } from "../utils/text.js";
import { anexarChavePersonalizada } from "../utils/chavesPersonalizadas.js";
import { validarChave } from "../utils/validacaoChaves.js";
import {
  STORAGE_KEY,
  carregarRascunho,
  criarAlternativa,
  criarAssinaturaLabsed,
  criarNodeDisponivel,
  exemploInicial,
  extrairProvavelChave,
  montarChave,
  parseTextoChave,
  textoImportacaoExemplo,
} from "./geradorChavesModel.js";

export function useGeradorChavesState({
  chaveComparacao,
  onAnexarChave,
  permiteAnexar,
  permiteExportarJson,
}) {
  const [chave, setChave] = useState(carregarRascunho);
  const [nodeIndex, setNodeIndex] = useState(0);
  const [aba, setAba] = useState("guiado");
  const [mensagem, setMensagem] = useState("");
  const [textoImportacao, setTextoImportacao] = useState(textoImportacaoExemplo);
  const [problemasImportacao, setProblemasImportacao] = useState([]);

  const assinaturaGerador = useMemo(
    () => criarAssinaturaLabsed(simboloLabsed),
    []
  );
  const chaveGerada = useMemo(
    () => montarChave(chave, assinaturaGerador),
    [assinaturaGerador, chave]
  );
  const problemas = useMemo(() => {
    return validarChave(chaveGerada, chaveGerada.titulo, {
      validarFigura: ({ fig, nodeId, lado }) =>
        imagens?.[fig]
          ? []
          : [
              `[${chaveGerada.titulo}] imagem "${fig}" em ${nodeId}.${lado} não está cadastrada.`,
            ],
    });
  }, [chaveGerada]);

  const nodeAtual = chave.nodes[nodeIndex] || chave.nodes[0];
  const idsImagem = Object.keys(imagens || {}).sort();
  const abasDisponiveis = [
    ["importar", "Importar texto"],
    ["guiado", "Guiado"],
    ["editor", "Avançado"],
    ["imagens", "Imagens"],
    ["logo", "Logo"],
    ["validacao", "Validação"],
    ["preview", "Prévia"],
    chaveComparacao ? ["comparacao", "Comparação"] : null,
    permiteExportarJson ? ["exportar", "JSON"] : null,
  ].filter(Boolean);

  function atualizarCampo(campo, valor) {
    setChave((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  function atualizarLogo(campo, valor) {
    setChave((atual) => ({
      ...atual,
      logo: {
        ...(atual.logo || {}),
        [campo]: valor,
      },
    }));
  }

  function carregarLogoArquivo(arquivo) {
    if (!arquivo) return;

    const reader = new FileReader();
    reader.onload = () => {
      setChave((atual) => ({
        ...atual,
        logo: {
          ...(atual.logo || {}),
          nome: arquivo.name,
          src: String(reader.result || ""),
        },
      }));
      setMensagem("Logo carregada no rascunho.");
    };
    reader.readAsDataURL(arquivo);
  }

  function removerLogo() {
    setChave((atual) => ({
      ...atual,
      logo: {
        nome: "",
        src: "",
        posicao: atual.logo?.posicao || "cabecalho",
      },
    }));
    setMensagem("Logo removida do rascunho.");
  }

  function atualizarNode(campo, valor) {
    setChave((atual) => {
      const nodes = [...atual.nodes];
      nodes[nodeIndex] = {
        ...nodes[nodeIndex],
        [campo]: valor,
      };
      return { ...atual, nodes };
    });
  }

  function atualizarAlternativa(lado, campo, valor) {
    setChave((atual) => {
      const nodes = [...atual.nodes];
      const node = nodes[nodeIndex];
      nodes[nodeIndex] = {
        ...node,
        [lado]: {
          ...node[lado],
          [campo]: valor,
        },
      };
      return { ...atual, nodes };
    });
  }

  function atualizarExplicacao(lado, campo, valor) {
    setChave((atual) => {
      const nodes = [...atual.nodes];
      const node = nodes[nodeIndex];
      nodes[nodeIndex] = {
        ...node,
        [lado]: {
          ...node[lado],
          explanation: {
            ...node[lado]?.explanation,
            [campo]: valor,
          },
        },
      };
      return { ...atual, nodes };
    });
  }

  function adicionarNode() {
    setChave((atual) => {
      const proximo = criarNodeDisponivel(atual.nodes);
      setNodeIndex(atual.nodes.length);
      return {
        ...atual,
        nodes: [...atual.nodes, proximo],
      };
    });
  }

  function navegarNode(delta) {
    setNodeIndex((atual) =>
      Math.min(Math.max(atual + delta, 0), Math.max(chave.nodes.length - 1, 0))
    );
  }

  function continuarPorAlternativa(lado) {
    setChave((atual) => {
      const nodes = [...atual.nodes];
      const node = nodes[nodeIndex];
      if (!node) return atual;

      const alternativa = node[lado] || criarAlternativa();

      if (alternativa.next) {
        const destinoIndex = nodes.findIndex((item) => item.id === alternativa.next);
        if (destinoIndex >= 0) {
          setNodeIndex(destinoIndex);
          setMensagem(`Continuando pelo caminho ${node.title || node.id}${lado.toUpperCase()}.`);
          return atual;
        }
      }

      const proximo = criarNodeDisponivel(nodes);
      proximo.title = `${nodes.length + 1}(${node.title || node.id}${lado.toUpperCase()})`;

      nodes[nodeIndex] = {
        ...node,
        [lado]: {
          ...alternativa,
          next: proximo.id,
          result: "",
        },
      };

      setNodeIndex(nodes.length);
      setMensagem(`Nova página criada a partir da alternativa ${lado.toUpperCase()}.`);

      return {
        ...atual,
        nodes: [...nodes, proximo],
      };
    });
  }

  function removerNode() {
    if (chave.nodes.length <= 1) return;

    setChave((atual) => {
      const nodes = atual.nodes.filter((_, index) => index !== nodeIndex);
      setNodeIndex(Math.max(0, nodeIndex - 1));
      return {
        ...atual,
        nodes,
        startId: nodes.some((node) => node.id === atual.startId)
          ? atual.startId
          : nodes[0]?.id || "",
      };
    });
  }

  function salvarRascunho() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chave));
    setMensagem("Rascunho salvo apenas neste navegador/equipamento.");
  }

  function limparRascunho() {
    localStorage.removeItem(STORAGE_KEY);
    setChave(exemploInicial);
    setNodeIndex(0);
    setMensagem("Rascunho reiniciado.");
  }

  function baixarJson() {
    const conteudo = JSON.stringify(chaveGerada, null, 2);
    const blob = new Blob([conteudo], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeFileName(chaveGerada.titulo || "chave")}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMensagem("Arquivo JSON gerado.");
  }

  function copiarJson() {
    navigator.clipboard?.writeText(JSON.stringify(chaveGerada, null, 2));
    setMensagem("JSON copiado para a área de transferência.");
  }

  function anexarAoAplicativo() {
    if (!permiteAnexar) {
      setMensagem("Nesta atividade, a chave criada serve para comparação didática e não será anexada ao aplicativo.");
      setAba(chaveComparacao ? "comparacao" : "validacao");
      return;
    }

    if (problemas.length) {
      setMensagem("Revise a validação antes de anexar a chave ao app.");
      setAba("validacao");
      return;
    }

    const item = anexarChavePersonalizada(chaveGerada);
    onAnexarChave?.(item);
    setMensagem(`"${item.titulo}" foi anexada ao seu app neste navegador/equipamento e ficará disponível para uso pessoal.`);
  }

  function importarTextoFormatado() {
    const resultado = parseTextoChave(textoImportacao);
    setProblemasImportacao(resultado.problemas);

    if (resultado.problemas.length) {
      setMensagem("Texto importado com pontos para revisão.");
    } else {
      setMensagem("Texto importado sem problemas detectados.");
    }

    if (resultado.chave.nodes.length) {
      setChave(resultado.chave);
      setNodeIndex(0);
      setAba("editor");
    }
  }

  function extrairChaveDoTextoBruto() {
    const extraido = extrairProvavelChave(textoImportacao);

    if (!extraido) {
      setMensagem("Nenhum trecho com padrão de chave foi detectado.");
      return;
    }

    setTextoImportacao(extraido);
    setProblemasImportacao([]);
    setMensagem("Trecho provável de chave extraído para revisão.");
  }

  function baixarModeloTexto() {
    const blob = new Blob([textoImportacaoExemplo], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "modelo-chave-dicotomica.txt";
    link.click();
    URL.revokeObjectURL(url);
    setMensagem("Modelo TXT baixado.");
  }

  function carregarArquivoTexto(arquivo) {
    if (!arquivo) return;

    const reader = new FileReader();
    reader.onload = () => {
      setTextoImportacao(String(reader.result || ""));
      setMensagem("Arquivo de texto carregado.");
    };
    reader.readAsText(arquivo);
  }

  return {
    aba,
    abasDisponiveis,
    chave,
    chaveGerada,
    idsImagem,
    mensagem,
    nodeAtual,
    nodeIndex,
    problemas,
    problemasImportacao,
    setAba,
    setNodeIndex,
    setProblemasImportacao,
    setTextoImportacao,
    textoImportacao,
    atualizarAlternativa,
    atualizarCampo,
    atualizarExplicacao,
    atualizarLogo,
    atualizarNode,
    adicionarNode,
    anexarAoAplicativo,
    baixarJson,
    baixarModeloTexto,
    carregarArquivoTexto,
    carregarLogoArquivo,
    continuarPorAlternativa,
    copiarJson,
    extrairChaveDoTextoBruto,
    importarTextoFormatado,
    limparRascunho,
    navegarNode,
    removerLogo,
    removerNode,
    salvarRascunho,
  };
}
