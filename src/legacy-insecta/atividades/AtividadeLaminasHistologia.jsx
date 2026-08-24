import AtividadeMicroscopioEstereoscopico from "./AtividadeMicroscopioEstereoscopico.jsx";
import { configLaminasHistologia } from "./histologiaConfigs.js";

export default function AtividadeLaminasHistologia({ onBack, ...props }) {
  return (
    <AtividadeMicroscopioEstereoscopico
      config={configLaminasHistologia}
      onBack={onBack}
      {...props}
    />
  );
}
