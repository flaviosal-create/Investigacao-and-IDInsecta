import { cloneElement } from "react";

import AtividadeMicroscopioEstereoscopico from "./AtividadeMicroscopioEstereoscopico.jsx";
import MicroscopiosInterativos, {
  MicroscopioReferenciaMini,
} from "./MicroscopiosInterativos.jsx";
import {
  coresReferenciaMicroscopia,
  equipamentosMicroscopia,
} from "./microscopiosDados.js";
import { roteiroIntroducaoMicroscopia } from "./roteirosPraticas.js";

const configIntroducaoMicroscopia = {
  roteiro: roteiroIntroducaoMicroscopia,
  titulo: "Introdução aos microscópios e preparo de lâminas",
  intro:
    "Reconheça as estruturas do microscópio óptico e do estereoscópico, treine foco e iluminação e registre uma preparação simples de lâmina.",
  tituloRelatorio: "Relatório - Introdução aos microscópios e preparo de lâminas",
  novoRegistro: "Novo registro",
  itemFallback: "Registro",
  tituloFallbackRelatorio: "Registro sem identificação",
  idPrefix: "microscopia",
  campoIdentificacao: "Identificação do registro",
  placeholderIdentificacao:
    "Ex.: microscópio óptico - objetivas; estereoscópico - iluminação; lâmina temporária...",
  tituloFoto: "Foto do equipamento ou preparação",
  altFoto: "Foto do equipamento ou preparação observada",
  tituloFotoPorMeta: {
    "microscopio-optico": "Foto do microscópio óptico",
    estereoscopico: "Foto do microscópio estereoscópico",
    "lamina-temporaria": "Foto da lâmina temporária",
    outro: "Foto do equipamento ou preparação",
  },
  altFotoPorMeta: {
    "microscopio-optico": "Foto do microscópio óptico observado",
    estereoscopico: "Foto do microscópio estereoscópico observado",
    "lamina-temporaria": "Foto da lâmina temporária preparada",
    outro: "Foto do equipamento ou preparação observada",
  },
  altRelatorio: "Registro da prática de microscopia",
  metaLabel: "Tipo de registro",
  metaDefault: "microscopio-optico",
  metaOptions: [
    ["microscopio-optico", "Microscópio óptico"],
    ["estereoscopico", "Microscópio estereoscópico"],
    ["lamina-temporaria", "Lâmina temporária"],
    ["outro", "Outro registro"],
  ],
  subetapaRegistroInicial: "imagem",
  subetapasRegistro: {
    ficha: {
      rotulo: "Registro",
      descricao:
        "Escolha o tipo de observação, nomeie o registro e mantenha a prática organizada desde o início.",
    },
    imagem: {
      rotulo: "Marcação",
      descricao:
        "Fotografe o microscópio ou a lâmina temporária e marque as estruturas principais diretamente na imagem.",
    },
    estruturas: {
      rotulo: "Legenda",
      descricao:
        "Conferira a legenda numérica das estruturas e finalize o registro visual antes do relatório.",
    },
  },
  etapaTelaInicial: "exploracao",
  etapasTelaExtras: [
    {
      id: "exploracao",
      rotulo: "Exploração",
      descricao:
        "Reconheça as partes dos dois microscópios antes de abrir a área de registro da prática.",
    },
  ],
  recursoInterativo: <MicroscopiosInterativos />,
  ocultarObservacoes: true,
  ocultarSintese: true,
  referenciasAnotacao: {
    "microscopio-optico": {
      tipo: "optico",
      titulo: "Referência do microscópio óptico para marcar a foto",
      instrucoes:
        "Use os números do microscópio óptico como guia e marque as estruturas equivalentes na foto tirada no laboratório.",
      partes: equipamentosMicroscopia.optico.partes,
      cores: coresReferenciaMicroscopia,
      Miniatura: MicroscopioReferenciaMini,
    },
    estereoscopico: {
      tipo: "estereoscopico",
      titulo: "Referência do microscópio estereoscópico para marcar a foto",
      instrucoes:
        "Use os números do microscópio estereoscópico como guia e marque as estruturas equivalentes na foto tirada no laboratório.",
      partes: equipamentosMicroscopia.estereoscopico.partes,
      cores: coresReferenciaMicroscopia,
      Miniatura: MicroscopioReferenciaMini,
    },
  },
};

export default function AtividadeIntroducaoMicroscopia({ onBack }) {
  function renderRecursoInterativo({ metaValor, atualizarMetaValor }) {
    const tipoInterativo =
      metaValor === "estereoscopico"
        ? "estereoscopico"
        : "optico";

    return cloneElement(configIntroducaoMicroscopia.recursoInterativo, {
      tipo: tipoInterativo,
      onTipoChange: (proximoTipo) => {
        atualizarMetaValor?.(
          proximoTipo === "estereoscopico"
            ? "estereoscopico"
            : "microscopio-optico",
        );
      },
    });
  }

  return (
    <AtividadeMicroscopioEstereoscopico
      onBack={onBack}
      config={{
        ...configIntroducaoMicroscopia,
        renderRecursoInterativo,
      }}
    />
  );
}
