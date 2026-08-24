import AtividadeMicroscopioEstereoscopico from "./AtividadeMicroscopioEstereoscopico.jsx";
import { configOrgaosHistologia } from "./histologiaConfigs.js";

export default function AtividadeOrgaosHistologia({ onBack, ...props }) {
  return (
    <AtividadeMicroscopioEstereoscopico
      config={configOrgaosHistologia}
      onBack={onBack}
      {...props}
    />
  );
}
