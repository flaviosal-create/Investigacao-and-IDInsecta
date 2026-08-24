import AtividadeMicroscopioEstereoscopico from "./AtividadeMicroscopioEstereoscopico.jsx";
import { configBochechaHistologia } from "./histologiaConfigs.js";

export default function AtividadeBochechaHistologia({ onBack, ...props }) {
  return (
    <AtividadeMicroscopioEstereoscopico
      config={configBochechaHistologia}
      onBack={onBack}
      {...props}
    />
  );
}
