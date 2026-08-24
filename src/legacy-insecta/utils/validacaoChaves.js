export function toNodeList(nodes) {
  if (Array.isArray(nodes)) return nodes.filter(Boolean);

  if (nodes && typeof nodes === "object") {
    return Object.entries(nodes).map(([key, value]) => ({
      id: value?.id || key,
      ...value,
    }));
  }

  return [];
}

export function validarChave(chave, nomeChave = "sem nome", options = {}) {
  const problemas = [];
  const { chavesDisponiveis, validarFigura } = options;

  if (!chave) {
    problemas.push(`[${nomeChave}] chave ausente ou indefinida.`);
    return problemas;
  }

  const nodes = toNodeList(chave.nodes);
  const ids = new Set(
    nodes
      .map((node) => String(node?.id || "").trim())
      .filter(Boolean)
  );

  if (!nodes.length) {
    problemas.push(`[${nomeChave}] não possui nodes válidos.`);
    return problemas;
  }

  if (chave.startId && !ids.has(String(chave.startId).trim())) {
    problemas.push(
      `[${nomeChave}] startId "${chave.startId}" não existe entre os nós.`
    );
  }

  nodes.forEach((node) => {
    const id = String(node?.id || "").trim();

    if (!id) {
      problemas.push(`[${nomeChave}] existe um nó sem "id".`);
      return;
    }

    ["a", "b"].forEach((lado) => {
      const choice = node?.[lado];
      if (!choice) return;

      if (choice.next) {
        const destino = String(choice.next).trim();

        if (!ids.has(destino)) {
          problemas.push(
            `[${nomeChave}] nó "${id}" aponta para "${destino}" em "${lado}.next", mas esse nó não existe.`
          );
        }
      }

      if (choice.goto && chavesDisponiveis && !chavesDisponiveis.has(choice.goto)) {
        problemas.push(
          `[${nomeChave}] nó "${id}" alternativa "${lado}" usa goto "${choice.goto}", mas essa chave não existe em chavesConfig.`
        );
      }

      if (validarFigura) {
        (choice.figs || []).forEach((fig) => {
          problemas.push(
            ...validarFigura({
              fig,
              nomeChave,
              nodeId: id,
              lado,
            })
          );
        });
      }
    });
  });

  return problemas;
}

export function validarTodasAsChaves({
  chavePrincipalConfig,
  chaveArtropodes,
  chavesConfig,
  validarFigura,
}) {
  const problemas = [];
  const chavesDisponiveis = new Set(Object.keys(chavesConfig || {}));
  const options = { chavesDisponiveis, validarFigura };

  problemas.push(
    ...validarChave(chavePrincipalConfig, "chavePrincipal", options)
  );
  problemas.push(
    ...validarChave(chaveArtropodes, "chaveArtropodes", options)
  );

  Object.entries(chavesConfig || {}).forEach(([nome, chave]) => {
    problemas.push(...validarChave(chave, nome, options));
  });

  return problemas;
}
