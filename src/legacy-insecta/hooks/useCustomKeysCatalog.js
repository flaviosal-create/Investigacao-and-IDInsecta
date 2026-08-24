import { useEffect, useMemo, useState } from "react";

import { carregarChavesPersonalizadas } from "../utils/chavesPersonalizadas.js";
import { normalizar } from "../utils/text.js";

export function useCustomKeysCatalog({ chavesBase }) {
  const [chavesPersonalizadas, setChavesPersonalizadas] = useState(() =>
    carregarChavesPersonalizadas()
  );

  const chavesComPersonalizadas = useMemo(() => {
    const personalizadas = {};

    chavesPersonalizadas.forEach((item) => {
      if (!item?.id || !item?.chave?.nodes) return;

      personalizadas[item.id] = {
        titulo: item.titulo || item.chave.titulo || "Chave personalizada",
        nodes: item.chave.nodes,
        startId: item.chave.startId,
        aliases: [item.chave.titulo, item.titulo].filter(Boolean),
        personalizada: true,
      };
    });

    return {
      ...chavesBase,
      ...personalizadas,
    };
  }, [chavesBase, chavesPersonalizadas]);

  const chavesIndex = useMemo(() => {
    const idx = {};

    Object.entries(chavesComPersonalizadas || {}).forEach(([keyCanonica, cfg]) => {
      const registrar = (valor) => {
        if (!valor) return;

        const n = normalizar(valor);
        if (!n) return;

        idx[n] = keyCanonica;
        idx[n.replace(/\s+/g, "")] = keyCanonica;
      };

      registrar(keyCanonica);
      registrar(cfg?.titulo);
      (cfg?.aliases || []).forEach((alias) => registrar(alias));
    });

    return idx;
  }, [chavesComPersonalizadas]);

  useEffect(() => {
    const atualizar = () => setChavesPersonalizadas(carregarChavesPersonalizadas());

    window.addEventListener("chaves-personalizadas-atualizadas", atualizar);
    window.addEventListener("storage", atualizar);

    return () => {
      window.removeEventListener("chaves-personalizadas-atualizadas", atualizar);
      window.removeEventListener("storage", atualizar);
    };
  }, []);

  return {
    chavesComPersonalizadas,
    chavesIndex,
    chavesPersonalizadas,
    setChavesPersonalizadas,
  };
}
