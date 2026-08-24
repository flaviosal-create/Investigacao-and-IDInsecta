/**
 * Base original a ser migrada para o formato canônico.
 *
 * Preencha CARACTERES e knowledgeBase com os dados legados antes
 * de executar scripts/migrateKnowledgeBase.js em uma migração real.
 */


export const CARACTERES = [
  {
    estrutura: "aparelho_bucal",
    rotulo: "Aparelho bucal",
    opcoes: [
      {
        valor: "mastigador",
        rotulo: "Mastigador",
        explicacao:
          "Possui mandíbulas visíveis para cortar ou triturar alimento. Observe a parte anterior e inferior da cabeça.",
      },
      {
        valor: "picador_sugador",
        rotulo: "Picador-sugador",
        explicacao:
          "Forma uma estrutura alongada para perfurar e sugar líquidos, como rostro ou probóscide.",
      },
      {
        valor: "sugador",
        rotulo: "Sugador",
        explicacao:
          "Estrutura adaptada para sugar líquidos, frequentemente alongada ou enrolada.",
      },
      {
        valor: "lambedor",
        rotulo: "Lambedor",
        explicacao:
          "Estrutura adaptada para lamber ou absorver líquidos na superfície.",
      },
    ],
  },
  {
    estrutura: "asas",
    rotulo: "Asas",
    opcoes: [
      {
        valor: "1_par_funcional",
        rotulo: "1 par funcional",
        explicacao:
          "Há apenas um par de asas grandes usado no voo; atrás dele podem existir balancins ou halteres.",
      },
      {
        valor: "2_pares_membranosos",
        rotulo: "2 pares membranosos",
        explicacao:
          "As asas anteriores e posteriores são finas, transparentes ou translúcidas.",
      },
      {
        valor: "elitros",
        rotulo: "Élitros",
        explicacao:
          "Asas anteriores endurecidas, com aspecto de capa protetora, típicas de besouros.",
      },
      {
        valor: "tegminas",
        rotulo: "Tégminas",
        explicacao:
          "Asas anteriores coriáceas ou pergaminosas, menos rígidas que élitros.",
      },
      {
        valor: "franjadas",
        rotulo: "Franjadas",
        explicacao:
          "Asas estreitas com franjas longas nas margens, comuns em tripes.",
      },
      {
        valor: "escamas",
        rotulo: "Com escamas",
        explicacao:
          "Asas recobertas por escamas, como em borboletas e mariposas.",
      },
      {
        valor: "pilosas_telhado",
        rotulo: "Pilosas em telhado",
        explicacao:
          "Asas com pelos, geralmente mantidas em forma de telhado sobre o corpo.",
      },
      {
        valor: "reticuladas",
        rotulo: "Muitas nervuras",
        explicacao:
          "Asas com muitas nervuras cruzadas, formando aspecto de rede.",
      },
      {
        valor: "ausentes",
        rotulo: "Ausentes",
        explicacao:
          "Verifique o dorso do tórax, onde as asas se inserem; alguns adultos têm asas reduzidas ou ausentes.",
      },
    ],
  },
  {
    estrutura: "antena",
    rotulo: "Antena",
    opcoes: [
      {
        valor: "aristada",
        rotulo: "Aristada",
        explicacao:
          "Antena curta com uma cerda lateral ou apical chamada arista.",
      },
      {
        valor: "filiforme",
        rotulo: "Filiforme",
        explicacao:
          "Antena alongada e fina, com espessura relativamente uniforme.",
      },
      {
        valor: "geniculada",
        rotulo: "Geniculada",
        explicacao:
          "Antena dobrada em ângulo, como um cotovelo.",
      },
      {
        valor: "clavada",
        rotulo: "Clavada",
        explicacao:
          "Antena com extremidade dilatada, formando uma clava.",
      },
      {
        valor: "moniliforme",
        rotulo: "Moniliforme",
        explicacao:
          "Antena com segmentos arredondados, parecendo contas sucessivas.",
      },
      {
        valor: "curta",
        rotulo: "Curta",
        explicacao:
          "Antena pequena em relação à cabeça ou ao corpo.",
      },
    ],
  },
  {
    estrutura: "pernas",
    rotulo: "Pernas",
    opcoes: [
      {
        valor: "saltatorias",
        rotulo: "Posteriores saltatórias",
        explicacao:
          "Pernas posteriores aumentadas, com fêmures robustos, adaptadas ao salto.",
      },
      {
        valor: "raptatorias",
        rotulo: "Anteriores raptatórias",
        explicacao:
          "Pernas anteriores modificadas para agarrar presas, como nos louva-a-deus.",
      },
      {
        valor: "fossoriais",
        rotulo: "Anteriores escavadoras",
        explicacao:
          "Pernas anteriores robustas e adaptadas para cavar.",
      },
      {
        valor: "ambulatorias",
        rotulo: "Ambulatórias",
        explicacao:
          "Pernas sem especialização evidente para salto, captura ou escavação.",
      },
    ],
  },
  {
    estrutura: "corpo",
    rotulo: "Corpo",
    opcoes: [
      {
        valor: "cintura_estreita",
        rotulo: "Cintura estreita",
        explicacao:
          "Constrição evidente entre tórax e abdômen.",
      },
      {
        valor: "corpo_duro",
        rotulo: "Corpo endurecido",
        explicacao:
          "Tegumento rígido ou fortemente esclerosado.",
      },
      {
        valor: "corpo_mole",
        rotulo: "Corpo mole",
        explicacao:
          "Tegumento mais flexível ou pouco esclerosado.",
      },
      {
        valor: "abdome_alongado",
        rotulo: "Abdome alongado",
        explicacao:
          "Abdômen comprido em relação ao restante do corpo.",
      },
      {
        valor: "graveto_folha",
        rotulo: "Graveto ou folha",
        explicacao:
          "Corpo muito alongado ou foliáceo, com aparência de camuflagem vegetal.",
      },
      {
        valor: "cercos_pinca",
        rotulo: "Cercos em pinça",
        explicacao:
          "Apêndices terminais parecidos com pinças, comuns em Dermaptera.",
      },
      {
        valor: "cercos_longos",
        rotulo: "Dois cercos longos",
        explicacao:
          "Dois filamentos longos no final do abdômen, úteis para suspeitar de Plecoptera.",
      },
    ],
  },
];

export const LABELS = CARACTERES.reduce((acc, grupo) => {
  acc[grupo.estrutura] = grupo.rotulo;

  grupo.opcoes.forEach((opcao) => {
    acc[opcao.valor] = opcao.rotulo;
  });

  return acc;
}, {});

export const knowledgeBase = [
  {
    id: "diptera",
    nome: "Diptera",
    nivel: "ordem",
    chave: "DIPTERA",
    caracteres: {
      patas: ["6"],
      asas: ["1_par_funcional"],
      antena: ["aristada", "filiforme", "curta"],
      aparelho_bucal: ["picador_sugador", "lambedor", "sugador"],
      corpo: ["corpo_mole"],
    },
    pesos: { asas: 5, antena: 2, aparelho_bucal: 2 },
    pista:
      "Um par funcional de asas é a evidência mais forte; procure halteres atrás das asas.",
  },
  {
    id: "thysanoptera",
    nome: "Thysanoptera",
    nivel: "ordem",
    chave: "THYSANOPTERA",
    caracteres: {
      patas: ["6"],
      asas: ["franjadas", "ausentes"],
      antena: ["filiforme"],
      aparelho_bucal: ["picador_sugador"],
      corpo: ["corpo_mole"],
    },
    pesos: { asas: 5, aparelho_bucal: 3 },
    pista:
      "Asas estreitas com franjas são o melhor ponto de confirmação; em exemplares sem asas, observe o corpo pequeno e o aparelho bucal.",
  },
  {
    id: "hemiptera",
    nome: "Hemiptera",
    nivel: "ordem",
    chave: "HEMIPTERA",
    caracteres: {
      patas: ["6"],
      asas: ["2_pares_membranosos", "ausentes"],
      antena: ["filiforme", "curta"],
      aparelho_bucal: ["picador_sugador"],
      corpo: ["corpo_mole"],
    },
    pesos: { aparelho_bucal: 5, asas: 2 },
    pista:
      "O aparelho bucal picador-sugador é a pista mais importante.",
  },
  {
    id: "orthoptera",
    nome: "Orthoptera",
    nivel: "ordem",
    chave: "ORTHOPTERA",
    caracteres: {
      patas: ["6"],
      asas: ["tegminas", "2_pares_membranosos", "ausentes"],
      antena: ["filiforme", "curta"],
      aparelho_bucal: ["mastigador"],
      pernas: ["saltatorias", "fossoriais"],
      corpo: ["abdome_alongado"],
    },
    pesos: { pernas: 5, aparelho_bucal: 3, asas: 2 },
    pista:
      "Pernas posteriores saltatórias e aparelho bucal mastigador fortalecem a hipótese.",
  },
  {
    id: "phasmatodea",
    nome: "Phasmatodea",
    nivel: "ordem",
    chave: "PHASMATODEA",
    caracteres: {
      patas: ["6"],
      asas: ["2_pares_membranosos", "ausentes"],
      antena: ["filiforme"],
      aparelho_bucal: ["mastigador"],
      pernas: ["ambulatorias"],
      corpo: ["graveto_folha", "abdome_alongado"],
    },
    pesos: { corpo: 5, aparelho_bucal: 2 },
    pista:
      "Corpo em forma de graveto ou folha é o caráter mais forte.",
  },
  {
    id: "blattodea",
    nome: "Blattodea",
    nivel: "ordem",
    chave: "BLATTODEA",
    caracteres: {
      patas: ["6"],
      asas: ["tegminas", "ausentes"],
      antena: ["filiforme"],
      aparelho_bucal: ["mastigador"],
      pernas: ["ambulatorias"],
      corpo: ["corpo_duro"],
    },
    pesos: { asas: 3, aparelho_bucal: 2, antena: 2 },
    pista:
      "Tégminas, antenas longas e pernas ambulatórias ajudam a separar de Mantodea.",
  },
  {
    id: "mantodea",
    nome: "Mantodea",
    nivel: "ordem",
    chave: "MANTODEA",
    caracteres: {
      patas: ["6"],
      asas: ["tegminas", "2_pares_membranosos", "ausentes"],
      antena: ["filiforme"],
      aparelho_bucal: ["mastigador"],
      pernas: ["raptatorias"],
      corpo: ["abdome_alongado"],
    },
    pesos: { pernas: 5, aparelho_bucal: 2 },
    pista:
      "Pernas anteriores raptatórias são o caráter decisivo.",
  },
  {
    id: "dermaptera",
    nome: "Dermaptera",
    nivel: "ordem",
    chave: "DERMAPTERA",
    caracteres: {
      patas: ["6"],
      asas: ["elitros", "ausentes"],
      antena: ["filiforme"],
      aparelho_bucal: ["mastigador"],
      corpo: ["cercos_pinca", "abdome_alongado"],
    },
    pesos: { corpo: 5, aparelho_bucal: 2 },
    pista:
      "Cercos terminais em forma de pinça são a evidência mais forte.",
  },
  {
    id: "coleoptera",
    nome: "Coleoptera",
    nivel: "ordem",
    chave: "COLEOPTERA",
    caracteres: {
      patas: ["6"],
      asas: ["elitros"],
      antena: ["filiforme", "clavada", "geniculada"],
      aparelho_bucal: ["mastigador"],
      corpo: ["corpo_duro"],
    },
    pesos: { asas: 5, corpo: 3, aparelho_bucal: 2 },
    pista:
      "Élitros e corpo endurecido são os pontos mais fortes.",
  },
  {
    id: "lepidoptera",
    nome: "Lepidoptera",
    nivel: "ordem",
    chave: "LEPIDOPTERA",
    caracteres: {
      patas: ["6"],
      asas: ["escamas", "2_pares_membranosos"],
      antena: ["clavada", "filiforme"],
      aparelho_bucal: ["sugador"],
      corpo: ["corpo_mole"],
    },
    pesos: { asas: 5, aparelho_bucal: 3 },
    pista:
      "Asas com escamas e aparelho bucal sugador são sinais fortes.",
  },
  {
    id: "trichoptera",
    nome: "Trichoptera",
    nivel: "ordem",
    caracteres: {
      patas: ["6"],
      asas: ["pilosas_telhado", "2_pares_membranosos"],
      antena: ["filiforme"],
      aparelho_bucal: ["mastigador"],
      corpo: ["corpo_mole"],
    },
    pesos: { asas: 5, antena: 2 },
    pista:
      "Asas pilosas mantidas em telhado ajudam a diferenciar de Lepidoptera.",
  },
  {
    id: "isoptera",
    nome: "Isoptera",
    nivel: "ordem",
    chave: "ISOPTERA",
    caracteres: {
      patas: ["6"],
      asas: ["2_pares_membranosos", "ausentes"],
      antena: ["moniliforme"],
      aparelho_bucal: ["mastigador"],
      corpo: ["corpo_mole"],
    },
    pesos: { antena: 5, aparelho_bucal: 2 },
    pista:
      "Antenas moniliformes e corpo mole são bons indicadores.",
  },
  {
    id: "odonata",
    nome: "Odonata",
    nivel: "ordem",
    chave: "ODONATA",
    caracteres: {
      patas: ["6"],
      asas: ["2_pares_membranosos", "reticuladas"],
      antena: ["curta"],
      aparelho_bucal: ["mastigador"],
      corpo: ["abdome_alongado"],
    },
    pesos: { antena: 4, asas: 4, corpo: 2 },
    pista:
      "Antenas muito curtas e asas membranosas com muitas nervuras são importantes.",
  },
  {
    id: "plecoptera",
    nome: "Plecoptera",
    nivel: "ordem",
    caracteres: {
      patas: ["6"],
      asas: ["2_pares_membranosos"],
      antena: ["filiforme"],
      aparelho_bucal: ["mastigador"],
      corpo: ["cercos_longos", "abdome_alongado"],
    },
    pesos: { corpo: 5, asas: 2 },
    pista:
      "Dois cercos longos no final do abdômen são a pista mais útil.",
  },
  {
    id: "neuroptera",
    nome: "Neuroptera",
    nivel: "ordem",
    chave: "NEUROPTERA",
    caracteres: {
      patas: ["6"],
      asas: ["reticuladas", "2_pares_membranosos"],
      antena: ["filiforme", "clavada"],
      aparelho_bucal: ["mastigador"],
      corpo: ["corpo_mole"],
    },
    pesos: { asas: 5, aparelho_bucal: 2 },
    pista:
      "Asas com muitas nervuras cruzadas e aspecto de rede são decisivas.",
  },
  {
    id: "hymenoptera",
    nome: "Hymenoptera",
    nivel: "ordem",
    chave: "HYMENOPTERA",
    caracteres: {
      patas: ["6"],
      asas: ["2_pares_membranosos", "ausentes"],
      antena: ["filiforme", "geniculada"],
      aparelho_bucal: ["mastigador", "lambedor"],
      corpo: ["cintura_estreita"],
    },
    pesos: { corpo: 4, antena: 2, aparelho_bucal: 2 },
    pista:
      "Cintura estreita, antenas e dois pares de asas membranosas ajudam na confirmação.",
  },
];

export function formatObs(obs) {
  return `${LABELS[obs.estrutura] || obs.estrutura}: ${
    LABELS[obs.valor] || obs.valor
  }`;
}

export function classificarHipotese(taxon) {
  if (taxon.conflitosGraves > 0 || taxon.score < 2) {
    return "contraditoria";
  }
  if (
    taxon.estruturasObservadas >= 3 &&
    taxon.evidenciasDiagnosticas > 0 &&
    taxon.margem >= 2 &&
    taxon.conflitos.length === 0
  ) {
    return "bem_sustentada";
  }
  if (taxon.matches.length >= 2 && taxon.score >= 4) {
    return "inicial";
  }
  return "insuficiente";
}

export function calcularHipoteses(observacoes, base = knowledgeBase) {
  const estruturasObservadas = new Set(
    observacoes.map((obs) => obs.estrutura)
  ).size;
  const resultados = base
    .map((taxon) => {
      const matches = [];
      const conflitos = [];

      observacoes.forEach((obs) => {
        const permitidos = taxon.caracteres?.[obs.estrutura] || [];
        const peso = taxon.pesos?.[obs.estrutura] || 1;

        if (permitidos.includes(obs.valor)) {
          matches.push({ ...obs, peso });
        } else if (permitidos.length > 0) {
          conflitos.push({ ...obs, peso });
        }
      });

      let score =
        matches.reduce((total, obs) => total + obs.peso, 0) -
        conflitos.reduce((total, obs) => total + Math.max(1, obs.peso - 1), 0);

      if (
        observacoes.length === 1 &&
        observacoes[0].estrutura === "patas" &&
        (taxon.nivel === "classe" || taxon.nivel === "grupo externo")
      ) {
        score += 3;
      }

      const resultado = {
        ...taxon,
        score,
        matches,
        conflitos,
        estruturasObservadas,
        evidenciasDiagnosticas: matches.filter((obs) => obs.peso >= 4).length,
        conflitosGraves: conflitos.filter((obs) => obs.peso >= 4).length,
      };

      return resultado;
    })
    .filter((taxon) => taxon.score > -4)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.conflitos.length - b.conflitos.length ||
        b.matches.length - a.matches.length ||
        (a.nivel === "ordem" ? -1 : 1)
    );

  const refinados = resultados;

  return refinados.map((taxon, indice) => {
    const lider = refinados[0];
    const segunda = refinados[1];
    const margem =
      indice === 0
        ? segunda
          ? taxon.score - segunda.score
          : taxon.score
        : taxon.score - lider.score;
    const resultado = { ...taxon, margem };
    const classeConfianca = classificarHipotese(resultado);

    return {
      ...resultado,
      classeForca: classeConfianca,
      classeConfianca,
      podeConfirmar:
        taxon.nivel !== "classe" &&
        classeConfianca === "bem_sustentada",
    };
  });
}

export function sugerirProximaObservacaoDetalhada(observacoes, hipoteses) {
  const observadas = new Set(observacoes.map((obs) => obs.estrutura));
  const [primeira, segunda] = hipoteses;

  if (!primeira) {
    return {
      estrutura: "asas",
      mensagem:
        "Comece pelas asas, uma das estruturas mais informativas para separar ordens de insetos.",
    };
  }

  if (segunda) {
    const estruturas = CARACTERES.map((grupo) => grupo.estrutura).filter(
      (estrutura) => !observadas.has(estrutura)
    );

    const discriminante = estruturas
      .map((estrutura) => {
        const a = primeira.caracteres?.[estrutura] || [];
        const b = segunda.caracteres?.[estrutura] || [];
        const diferentes =
          a.length > 0 && b.length > 0 && a.join("|") !== b.join("|");
        const peso =
          Math.max(
            primeira.pesos?.[estrutura] || 1,
            segunda.pesos?.[estrutura] || 1
          ) + (diferentes ? 3 : 0);

        return { estrutura, diferentes, peso };
      })
      .filter((item) => item.diferentes)
      .sort((a, b) => b.peso - a.peso)[0];

    if (discriminante) {
      return {
        estrutura: discriminante.estrutura,
        mensagem: `Para separar ${primeira.nome} de ${segunda.nome}, observe ${
          LABELS[discriminante.estrutura] || discriminante.estrutura
        }.`,
      };
    }
  }

  const faltanteForte = Object.entries(primeira.pesos || {})
    .filter(([estrutura]) => !observadas.has(estrutura))
    .sort((a, b) => b[1] - a[1])[0];

  if (faltanteForte) {
    return {
      estrutura: faltanteForte[0],
      mensagem: `Para confirmar ${primeira.nome}, observe ${
        LABELS[faltanteForte[0]] || faltanteForte[0]
      }.`,
    };
  }

  const primeiraNaoObservada = CARACTERES.find(
    (grupo) => !observadas.has(grupo.estrutura)
  );

  return {
    estrutura: primeiraNaoObservada?.estrutura || null,
    mensagem:
      "Compare os conflitos e confirme a hipótese somente se as características principais estiverem coerentes.",
  };
}

export function sugerirProximaObservacao(observacoes, hipoteses) {
  return sugerirProximaObservacaoDetalhada(observacoes, hipoteses).mensagem;
}

export function interpretarConfianca(hipotese) {
  if (!hipotese) {
    return {
      rotulo: "Sem hipótese",
      descricao: "Selecione observações para iniciar a comparação.",
    };
  }

  const interpretacoes = {
    bem_sustentada: {
      rotulo: "Hipótese bem sustentada",
      descricao:
        "Há observações variadas, caráter diagnóstico e vantagem sobre as demais possibilidades.",
    },
    inicial: {
      rotulo: "Hipótese inicial",
      descricao:
        "Alguns caracteres combinam, mas ainda é preciso observar estruturas mais diagnósticas.",
    },
    insuficiente: {
      rotulo: "Evidência insuficiente",
      descricao:
        "As observações ainda são poucas ou genéricas para sustentar a identificação.",
    },
    contraditoria: {
      rotulo: "Hipótese contraditória",
      descricao:
        "Uma ou mais observações importantes entram em conflito com esta possibilidade.",
    },
  };

  return interpretacoes[hipotese.classeConfianca] || interpretacoes.insuficiente;
}