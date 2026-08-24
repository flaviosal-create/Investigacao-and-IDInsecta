import { ordensInsectaV1 } from "../protocols/zoologia/ordensInsectaV1.js";
import { grandesGruposVegetaisV1 } from "../protocols/botanica/grandesGruposVegetaisV1.js";
import { grandesGruposAngiospermasV1 } from "../protocols/botanica/grandesGruposAngiospermasV1.js";
import { ordensAngiospermasBrasilV1 } from "../protocols/botanica/ordensAngiospermasBrasilV1.js";
import { familiasAngiospermasBrasilV1 } from "../protocols/botanica/familiasAngiospermasBrasilV1.js";
import { generosAngiospermasBrasilV1 } from "../protocols/botanica/generosAngiospermasBrasilV1.js";
import { tecidosBasicosV1 } from "../protocols/histologia/tecidosBasicosV1.js";
import { orgaosHistologicosV1 } from "../protocols/histologia/orgaosHistologicosV1.js";
import { epiteliosRevestimentoV1 } from "../protocols/histologia/epiteliosRevestimentoV1.js";
import { musculoLisoEstriadoV1 } from "../protocols/histologia/musculoLisoEstriadoV1.js";
import { conjuntivoFrouxoDensoV1 } from "../protocols/histologia/conjuntivoFrouxoDensoV1.js";
import { generosFabaceaeBrasilV1 } from "../protocols/botanica/generosFabaceaeBrasilV1.js";
import { generosAsteraceaeBrasilV1 } from "../protocols/botanica/generosAsteraceaeBrasilV1.js";
import { generosPoaceaeBrasilV1 } from "../protocols/botanica/generosPoaceaeBrasilV1.js";
import { gruposInvertebradosV1 } from "../protocols/zoologia/gruposInvertebradosV1.js";
import {
  classesPoriferaV1,
  classesCnidariaV1,
  classesAnnelidaV1,
  classesMolluscaV1,
  classesArthropodaV1,
  classesEchinodermataV1,
} from "../protocols/zoologia/classesInvertebradosV1.js";

export const protocols = [
  ordensInsectaV1,
  gruposInvertebradosV1,
  classesPoriferaV1,
  classesCnidariaV1,
  classesAnnelidaV1,
  classesMolluscaV1,
  classesArthropodaV1,
  classesEchinodermataV1,
  grandesGruposVegetaisV1,
  grandesGruposAngiospermasV1,
  ordensAngiospermasBrasilV1,
  familiasAngiospermasBrasilV1,
  generosAngiospermasBrasilV1,
  generosFabaceaeBrasilV1,
  generosAsteraceaeBrasilV1,
  generosPoaceaeBrasilV1,
  tecidosBasicosV1,
  orgaosHistologicosV1,
  epiteliosRevestimentoV1,
  musculoLisoEstriadoV1,
  conjuntivoFrouxoDensoV1,
];

export const protocolCatalog = [
  {
    id: gruposInvertebradosV1.id,
    track: "Universo autônomo",
    stage: "Filos",
    stageOrder: 1,
    order: 1,
    related: [],
  },
  {
    id: classesPoriferaV1.id,
    track: "Universo autônomo",
    stage: "Classes de Porifera",
    stageOrder: 2,
    order: 2,
    related: [],
  },
  {
    id: classesCnidariaV1.id,
    track: "Universo autônomo",
    stage: "Classes de Cnidaria",
    stageOrder: 2,
    order: 3,
    related: [],
  },
  {
    id: classesAnnelidaV1.id,
    track: "Universo autônomo",
    stage: "Classes de Annelida",
    stageOrder: 2,
    order: 4,
    related: [],
  },
  {
    id: classesMolluscaV1.id,
    track: "Universo autônomo",
    stage: "Classes de Mollusca",
    stageOrder: 2,
    order: 5,
    related: [],
  },
  {
    id: classesArthropodaV1.id,
    track: "Universo autônomo",
    stage: "Classes de Arthropoda",
    stageOrder: 2,
    order: 6,
    related: [],
  },
  {
    id: classesEchinodermataV1.id,
    track: "Universo autônomo",
    stage: "Classes de Echinodermata",
    stageOrder: 2,
    order: 7,
    related: [],
  },
  {
    id: ordensInsectaV1.id,
    track: "Universo autônomo",
    stage: "Fundamentos",
    stageOrder: 3,
    order: 8,
    related: [],
  },
  {
    id: grandesGruposVegetaisV1.id,
    track: "Universo autônomo",
    stage: "Filo",
    stageOrder: 1,
    order: 1,
    related: [],
  },
  {
    id: grandesGruposAngiospermasV1.id,
    track: "Universo autônomo",
    stage: "Classe",
    stageOrder: 2,
    order: 2,
    related: [],
  },
  {
    id: ordensAngiospermasBrasilV1.id,
    track: "Universo autônomo",
    stage: "Ordem",
    stageOrder: 3,
    order: 3,
    related: [],
  },
  {
    id: familiasAngiospermasBrasilV1.id,
    track: "Universo autônomo",
    stage: "Família",
    stageOrder: 4,
    order: 4,
    related: [],
  },
  {
    id: generosAngiospermasBrasilV1.id,
    track: "Universo autônomo",
    stage: "Gênero",
    stageOrder: 5,
    order: 5,
    related: [],
  },
  {
    id: generosFabaceaeBrasilV1.id,
    track: "Universo autônomo",
    stage: "Gênero: Fabaceae",
    stageOrder: 5,
    order: 6,
    related: [],
  },
  {
    id: generosAsteraceaeBrasilV1.id,
    track: "Universo autônomo",
    stage: "Gênero: Asteraceae",
    stageOrder: 5,
    order: 7,
    related: [],
  },
  {
    id: generosPoaceaeBrasilV1.id,
    track: "Universo autônomo",
    stage: "Gênero: Poaceae",
    stageOrder: 5,
    order: 8,
    related: [],
  },
  {
    id: tecidosBasicosV1.id,
    track: "Universo autônomo",
    stage: "Tecido",
    stageOrder: 1,
    order: 1,
    related: [],
  },
  {
    id: orgaosHistologicosV1.id,
    track: "Universo autônomo",
    stage: "Órgão",
    stageOrder: 1,
    order: 2,
    related: [],
  },
  {
    id: epiteliosRevestimentoV1.id,
    track: "Universo autônomo",
    stage: "Epitélio",
    stageOrder: 2,
    order: 3,
    related: [],
  },
  {
    id: musculoLisoEstriadoV1.id,
    track: "Universo autônomo",
    stage: "Músculo",
    stageOrder: 2,
    order: 4,
    related: [],
  },
  {
    id: conjuntivoFrouxoDensoV1.id,
    track: "Universo autônomo",
    stage: "Tecido conjuntivo",
    stageOrder: 2,
    order: 5,
    related: [],
  },
];

export const domains = [
  {
    id: "zoologia",
    label: "Zoologia",
  },
  {
    id: "botanica",
    label: "Botânica",
  },
  {
    id: "histologia",
    label: "Histologia",
  },
];

export function getProtocolMetadata(
  protocolId
) {
  return protocolCatalog.find(
    (item) => item.id === protocolId
  );
}

export function getProtocolById(
  protocolId
) {
  return protocols.find(
    (protocol) => protocol.id === protocolId
  ) ?? null;
}

export function compareProtocols(
  leftProtocol,
  rightProtocol
) {
  const leftMetadata =
    getProtocolMetadata(
      leftProtocol.id
    );
  const rightMetadata =
    getProtocolMetadata(
      rightProtocol.id
    );

  const stageDifference =
    (leftMetadata?.stageOrder ?? 99) -
    (rightMetadata?.stageOrder ?? 99);

  if (stageDifference !== 0) {
    return stageDifference;
  }

  return (
    (leftMetadata?.order ?? 99) -
    (rightMetadata?.order ?? 99)
  );
}

export function buildProtocolOrientation(
  protocol
) {
  if (protocol.domain === "histologia") {
    if (protocol.id === tecidosBasicosV1.id) {
      return "Este protocolo investiga tipos de tecido como hipóteses centrais. As evidências vêm de características celulares, estruturais e morfológicas observáveis, sem exigir continuação automática para órgão.";
    }

    if (protocol.id === orgaosHistologicosV1.id) {
      return "Este protocolo investiga órgãos como hipóteses centrais. Tecidos, arranjos celulares e estruturas marcantes entram aqui como evidências para sustentar ou enfraquecer cada órgão dentro do mesmo universo investigativo.";
    }

    if (protocol.id === epiteliosRevestimentoV1.id) {
      return "Este protocolo investiga tipos de epitélio de revestimento como hipóteses centrais, a partir de camadas celulares, núcleos e especializações observáveis.";
    }

    if (protocol.id === musculoLisoEstriadoV1.id) {
      return "Este protocolo investiga tipos de tecido muscular como hipóteses centrais, a partir de estriações, formato celular e posição dos núcleos.";
    }

    if (protocol.id === conjuntivoFrouxoDensoV1.id) {
      return "Este protocolo investiga especializações do tecido conjuntivo como hipóteses centrais, a partir de matriz, fibras, células e organização histológica.";
    }
  }

  if (protocol.domain === "zoologia") {
    if (protocol.id === gruposInvertebradosV1.id) {
      return "Este protocolo investiga grandes filos de invertebrados como hipóteses centrais, a partir de simetria, revestimento, organização interna e locomoção.";
    }

    if (protocol.id.startsWith("classes-")) {
      return "Este protocolo investiga classes como hipóteses centrais dentro de um filo, usando características gerais comparáveis. Ele funciona como um universo autônomo, mesmo quando for sugerido após outra investigação.";
    }
  }

  if (protocol.domain === "botanica") {
    if (
      protocol.id ===
      grandesGruposVegetaisV1.id
    ) {
      return "Este protocolo investiga grandes grupos vegetais como hipóteses centrais, sustentadas por evidências reprodutivas, vasculares e morfofuncionais.";
    }

    if (
      protocol.id ===
      grandesGruposAngiospermasV1.id
    ) {
      return "Este protocolo investiga grandes grupos de angiospermas como hipóteses centrais, sustentadas por caracteres florais, foliares e anatômicos.";
    }

    if (
      protocol.id ===
      ordensAngiospermasBrasilV1.id
    ) {
      return "Este protocolo investiga ordens botânicas relevantes no Brasil como hipóteses centrais, sustentadas por caracteres florais, foliares, inflorescências e frutos.";
    }

    if (
      protocol.id ===
      familiasAngiospermasBrasilV1.id
    ) {
      return "Este protocolo investiga famílias botânicas importantes no Brasil como hipóteses centrais, sustentadas por combinações de porte, folhas, flores, androceu, ovário e fruto.";
    }

    if (
      protocol.id ===
      generosAngiospermasBrasilV1.id
    ) {
      return "Este protocolo investiga gêneros selecionados do Brasil como hipóteses centrais, sustentados por combinações diagnósticas de hábito, folhas, organização reprodutiva, pista marcante e fruto ou diásporo.";
    }

    if (protocol.id === generosFabaceaeBrasilV1.id) {
      return "Este protocolo investiga gêneros selecionados de Fabaceae como hipóteses centrais, sustentados por combinações de hábito, folhas, flores e fruto.";
    }

    if (protocol.id === generosAsteraceaeBrasilV1.id) {
      return "Este protocolo investiga gêneros selecionados de Asteraceae como hipóteses centrais, sustentados por hábito, folhas, capítulo, flores e fruto.";
    }

    if (protocol.id === generosPoaceaeBrasilV1.id) {
      return "Este protocolo investiga gêneros selecionados de Poaceae como hipóteses centrais, sustentados por porte, colmo, folhas, inflorescência e espigueta.";
    }
  }

  return "Cada protocolo representa um universo próprio de hipóteses investigáveis dentro da investigação atual.";
}

export function buildScopeMessage(
  protocol,
  investigation
) {
  if (
    investigation?.conclusion?.status ===
    "concluida"
  ) {
    if (protocol.id === tecidosBasicosV1.id) {
      return "Você concluiu a investigação do tecido dentro do universo de hipóteses deste protocolo.";
    }

    if (
      protocol.id ===
      orgaosHistologicosV1.id
    ) {
      return "Você concluiu a investigação do órgão dentro do universo de hipóteses deste protocolo.";
    }

    return "Você concluiu a investigação dentro do universo de hipóteses deste protocolo.";
  }

  if (protocol.id === tecidosBasicosV1.id) {
    return "Este protocolo sustenta hipóteses de tecido a partir das evidências morfológicas observadas na amostra atual.";
  }

  if (protocol.id === gruposInvertebradosV1.id) {
    return "Este protocolo sustenta hipóteses de filos de invertebrados a partir de simetria, revestimento, organização interna e locomoção observáveis.";
  }

  if (protocol.domain === "zoologia" && protocol.id.startsWith("classes-")) {
    return "Este protocolo sustenta hipóteses de classes a partir de características gerais observáveis dentro do filo selecionado.";
  }

  if (
    protocol.id ===
    orgaosHistologicosV1.id
  ) {
    return "Este protocolo sustenta hipóteses de órgão a partir das evidências observadas na lâmina, sem depender de um protocolo anterior para funcionar.";
  }

  if (
    protocol.id ===
    grandesGruposVegetaisV1.id
  ) {
    return "Este protocolo sustenta hipóteses de grandes grupos vegetais a partir de evidências reprodutivas, vasculares e estruturais.";
  }

  if (
    protocol.id ===
    grandesGruposAngiospermasV1.id
  ) {
    return "Este protocolo sustenta hipóteses de grandes grupos de angiospermas a partir de cotilédones, flores, nervação e outros caracteres diagnósticos.";
  }

  if (
    protocol.id ===
    ordensAngiospermasBrasilV1.id
  ) {
    return "Este protocolo sustenta hipóteses de ordens de angiospermas a partir de caracteres florais, foliares, inflorescências e tipos de fruto.";
  }

  if (
    protocol.id ===
    familiasAngiospermasBrasilV1.id
  ) {
    return "Este protocolo sustenta hipóteses de famílias de angiospermas a partir de combinações diagnósticas de folhas, flores, androceu, ovário e fruto.";
  }

  if (
    protocol.id ===
    generosAngiospermasBrasilV1.id
  ) {
    return "Este protocolo sustenta hipóteses de gêneros de angiospermas a partir de combinações diagnósticas de hábito, folhas, organização reprodutiva, pista marcante e fruto ou diásporo.";
  }

  if (protocol.id === generosFabaceaeBrasilV1.id) {
    return "Este protocolo sustenta hipóteses de gêneros de Fabaceae a partir de combinações diagnósticas de hábito, folhas, flores e fruto.";
  }

  if (protocol.id === generosAsteraceaeBrasilV1.id) {
    return "Este protocolo sustenta hipóteses de gêneros de Asteraceae a partir de combinações diagnósticas de hábito, folhas, capítulo, flores e fruto.";
  }

  if (protocol.id === generosPoaceaeBrasilV1.id) {
    return "Este protocolo sustenta hipóteses de gêneros de Poaceae a partir de combinações diagnósticas de porte, colmo, folhas, inflorescência e espigueta.";
  }

  if (protocol.id === epiteliosRevestimentoV1.id) {
    return "Este protocolo sustenta hipóteses de epitélio de revestimento a partir das camadas celulares, da disposição nuclear e das especializações observadas.";
  }

  if (protocol.id === musculoLisoEstriadoV1.id) {
    return "Este protocolo sustenta hipóteses de tecido muscular a partir das estriações, do formato das fibras e da posição dos núcleos.";
  }

  if (protocol.id === conjuntivoFrouxoDensoV1.id) {
    return "Este protocolo sustenta hipóteses de especializações conjuntivas a partir de matriz, fibras, células e organização histológica.";
  }

  return "Você está em uma investigação autônoma. Outros protocolos podem ser escolhidos depois como novas leituras, mas a resposta atual precisa se sustentar aqui dentro.";
}
