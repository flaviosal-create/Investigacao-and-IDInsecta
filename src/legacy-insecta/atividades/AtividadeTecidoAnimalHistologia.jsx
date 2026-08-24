import AtividadeMicroscopioEstereoscopico from "./AtividadeMicroscopioEstereoscopico.jsx";
import { configTecidoAnimalHistologia } from "./histologiaConfigs.js";
import coletaUrl from "../assets/histologia/tecido-animal/coleta.jpg";
import fixacaoUrl from "../assets/histologia/tecido-animal/fixacao.jpg";
import desidratacaoUrl from "../assets/histologia/tecido-animal/desidratacao.jpg";
import diafanizacaoUrl from "../assets/histologia/tecido-animal/diafanizacao.jpg";
import inclusaoUrl from "../assets/histologia/tecido-animal/inclusao.jpg";
import formacaoBlocoUrl from "../assets/histologia/tecido-animal/formacao-bloco.jpg";
import corteMicrotomoUrl from "../assets/histologia/tecido-animal/corte-microtomo.jpg";
import coloracaoUrl from "../assets/histologia/tecido-animal/coloracao.jpg";
import montagemFinalUrl from "../assets/histologia/tecido-animal/montagem-final.jpg";
import laminaFinalUrl from "../assets/histologia/tecido-animal/lamina-final.jpg";

const imagensDidaticasIniciais = {
  coleta: {
    url: coletaUrl,
    alt: "Coleta do material para o preparo histológico",
  },
  fixacao: {
    url: fixacaoUrl,
    alt: "Fixação do tecido para o preparo histológico",
  },
  desidratacao: {
    url: desidratacaoUrl,
    alt: "Desidratação progressiva do tecido",
  },
  diafanizacao: {
    url: diafanizacaoUrl,
    alt: "Diafanização do tecido",
  },
  inclusao: {
    url: inclusaoUrl,
    alt: "Inclusão do tecido em parafina",
  },
  bloco: {
    url: formacaoBlocoUrl,
    alt: "Formação do bloco de parafina",
  },
  microtomo: {
    url: corteMicrotomoUrl,
    alt: "Corte do bloco no micrótomo",
  },
  coloracao: {
    url: coloracaoUrl,
    alt: "Coloração das lâminas histológicas",
  },
  "montagem-final": {
    url: montagemFinalUrl,
    alt: "Montagem final da lâmina histológica",
  },
  "lamina-final": {
    url: laminaFinalUrl,
    alt: "Lâmina histológica finalizada",
  },
};

export default function AtividadeTecidoAnimalHistologia({ onBack, ...props }) {
  return (
    <AtividadeMicroscopioEstereoscopico
      config={configTecidoAnimalHistologia}
      idImagensDidaticas="histologia-tecido-animal"
      imagensDidaticasIniciais={imagensDidaticasIniciais}
      onBack={onBack}
      {...props}
    />
  );
}
