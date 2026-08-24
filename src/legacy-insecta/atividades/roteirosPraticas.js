export const secoesPadraoRoteiro = [
  "Apresentação",
  "Objetivos",
  "Materiais",
  "Segurança e cuidado com os exemplares",
  "Procedimento",
    "Relatórios e acompanhamento",
  "Discussão",
  "Avaliação",
];

const fundamentosLegaisInvertebrados = {
  titulo: "Fundamentos legais, cuidados e proibições",
  itens: [
    "A observação didática deve priorizar exemplares de coleção institucional, lâminas prontas, material já autorizado pelo professor, imagens, esquemas ou organismos obtidos por procedimentos regulares da instituição.",
    "Não colete, capture, persiga, mate, transporte, mantenha em cativeiro, compre, venda ou receba animais silvestres, partes, ovos, larvas, ninfas, conchas ou outros materiais biológicos sem orientação formal do professor e sem a autorização ambiental cabível.",
    "Quando a prática envolver coleta, captura, transporte, manutenção temporária ou uso de material biológico de fauna silvestre, o professor responsável deve verificar previamente as autorizações exigidas pelo órgão ambiental competente, incluindo o SISBio/ICMBio quando aplicável.",
    "Não retire organismos de unidades de conservação, áreas protegidas, cavernas, costões, manguezais, restingas, corpos d'água, propriedades privadas ou áreas urbanas sem permissão do responsável pela área e sem autorização ambiental quando exigida.",
    "Não utilize espécies ameaçadas, raras, de procedência desconhecida ou obtidas por comércio informal.",
    "Não solte em ambiente natural organismos mantidos em laboratório, organismos de origem desconhecida ou material que possa transportar patógenos, parasitas ou espécies exóticas.",
    "Use apenas a menor quantidade de material necessária para o objetivo didático e adote procedimentos que reduzam sofrimento, desperdício, contaminação e dano aos exemplares e ao ambiente.",
    "Resíduos, conservantes, hipoclorito, álcool, sobrenadantes e fragmentos biológicos devem ser descartados apenas conforme orientação do professor, técnico responsável ou norma institucional.",
    "Em caso de dúvida sobre origem, autorização, identificação ou risco do material, a prática deve ser suspensa para aquele exemplar até orientação do professor.",
  ],
};

const referenciasOficiaisInvertebrados = {
  titulo: "Referências oficiais consultadas",
  itens: [
    "Brasil. Constituição da República Federativa do Brasil de 1988, art. 225. Portal da Legislação/Planalto: https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
    "Brasil. Lei nº 5.197, de 3 de janeiro de 1967. Dispõe sobre a proteção à fauna. Portal da Legislação/Planalto: https://www.planalto.gov.br/ccivil_03/leis/l5197.htm",
    "Brasil. Lei nº 9.605, de 12 de fevereiro de 1998. Dispõe sobre sanções penais e administrativas derivadas de condutas e atividades lesivas ao meio ambiente. Portal da Legislação/Planalto: https://www.planalto.gov.br/ccivil_03/leis/l9605.htm",
    "Brasil. Decreto nº 6.514, de 22 de julho de 2008. Dispõe sobre infrações e sanções administrativas ao meio ambiente. Portal da Legislação/Planalto: https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/decreto/d6514.htm",
    "ICMBio. Sistema de Autorização e Informação em Biodiversidade - SISBio. Portal gov.br/ICMBio: https://www.gov.br/icmbio/pt-br/servicos/sistemas/sisbio",
  ],
};

function anexarFundamentosLegais(roteiro) {
  return {
    ...roteiro,
    secoes: [
      ...roteiro.secoes,
      fundamentosLegaisInvertebrados,
      referenciasOficiaisInvertebrados,
    ],
  };
}

export const roteiroObservacaoIdentificacaoInsetos = anexarFundamentosLegais({
  id: "observacao-identificacao-insetos",
  titulo: "Roteiro: observação e identificação de insetos",
  atividade: "Chave de Identificação de Insetos",
  disciplina: "Zoologia I",
  duracao: "1 aula prática",
  publico: "Estudantes de Zoologia I",
  resumo:
    "Roteiro básico para observar exemplares de insetos, reconhecer caracteres morfológicos e utilizar a chave de identificação do aplicativo.",
  secoes: [
    {
      titulo: "Apresentação",
      texto:
        "Nesta prática, cada estudante ou grupo observa exemplares de insetos e utiliza a chave dicotômica para chegar a uma identificação justificada. O foco da atividade é o processo de observação e comparação, não apenas o nome final obtido. O caminho percorrido na chave é registrado automaticamente pelo aplicativo.",
    },
    {
      titulo: "Objetivos",
      itens: [
        "Reconhecer estruturas morfológicas externas dos insetos.",
        "Utilizar uma chave dicotômica como ferramenta de identificação.",
        "Acompanhar o caminho de identificação registrado automaticamente pelo aplicativo.",
        "Relacionar caracteres observados com hipóteses taxonômicas.",
        "Discutir dúvidas, ambiguidades e limitações da identificação morfológica.",
      ],
    },
    {
      titulo: "Materiais",
      itens: [
        "Exemplares de insetos da coleção didática ou fornecidos pelo professor.",
        "Lupa de mão ou microscópio estereoscópico, quando disponível.",
        "Pinça, placa de Petri ou bandeja de observação.",
        "Dispositivo com acesso ao aplicativo.",
        "Relatório digital gerado pelo aplicativo.",
      ],
    },
    {
      titulo: "Segurança e cuidado com os exemplares",
      itens: [
        "Manipule os exemplares com cuidado, evitando quebrar antenas, pernas e asas.",
        "Não toque diretamente em estruturas frágeis quando houver pinça ou bandeja disponível.",
        "Mantenha os exemplares identificados ou separados conforme a orientação do professor.",
        "Não force abertura de asas, peças bucais ou apêndices preservados.",
        "Ao final, devolva cada exemplar ao recipiente, caixa ou bandeja correspondente.",
      ],
    },
    {
      titulo: "Procedimento",
      itens: [
        "Observe primeiro o corpo inteiro do exemplar, distinguindo cabeça, tórax e abdômen.",
        "Verifique número de patas, presença de antenas, tipo de asa e aparelho bucal.",
        "Abra a atividade Chave de Identificação de Insetos no aplicativo.",
        "Escolha o modo indicado pelo professor: prática livre ou prova com QR Code.",
        "Leia cada pergunta da chave e compare cuidadosamente as alternativas.",
        "Use lupa ou estereoscópio para confirmar estruturas pequenas.",
        "Acompanhe o relatório parcial gerado pelo aplicativo e, quando necessário, registre dúvidas ou caracteres difíceis de observar.",
        "Ao chegar ao resultado, revise se ele é compatível com as características observadas.",
      ],
    },
    {
      titulo: "Relatórios e acompanhamento",
      itens: [
        "O aplicativo registra automaticamente o caminho percorrido na chave.",
        "Durante a prática, o estudante pode consultar relatórios parciais para revisar escolhas e resultados.",
        "Ao concluir a atividade, o aplicativo organiza um relatório final com o percurso de identificação.",
        "O relatório final deve ser encaminhado ao professor pela área do aluno, quando a turma estiver usando esse fluxo.",
        "Dúvidas, conflitos ou caracteres não observáveis devem ser anotados como observações da atividade.",
        "Fotos do exemplar podem ser incluídas quando solicitado e autorizado pelo professor.",
      ],
    },
    {
      titulo: "Discussão",
      itens: [
        "Quais caracteres foram mais fáceis de observar?",
        "Quais estruturas geraram dúvida durante a identificação?",
        "O resultado final concorda com a aparência geral do exemplar?",
        "Algum passo da chave exigiu revisão ou comparação com outro exemplar?",
        "Como danos, preservação ou tamanho do inseto interferiram no processo?",
      ],
    },
    {
      titulo: "Avaliação",
      itens: [
        "Participação e cuidado na observação dos exemplares.",
        "Uso correto da chave dicotômica.",
        "Coerência do caminho de identificação registrado pelo aplicativo.",
        "Justificativa do resultado obtido.",
        "Capacidade de reconhecer dúvidas e limitações da identificação.",
      ],
    },
  ],
});

export const roteiroConstrucaoChaveArtropodes = anexarFundamentosLegais({
  id: "construcao-chave-artropodes",
  titulo: "Roteiro: construção de chave dicotômica para artrópodes",
  atividade: "Construção de Chave Dicotômica para Artrópodes",
  disciplina: "Zoologia I",
  duracao: "1 a 2 aulas práticas",
  publico: "Estudantes de Zoologia I",
  resumo:
    "Roteiro para planejar, construir e testar uma chave dicotômica autoral usando características observáveis de artrópodes.",
  secoes: [
    {
      titulo: "Apresentação",
      texto:
        "Nesta atividade, o estudante constrói uma chave dicotômica própria para separar grupos de artrópodes. A escolha das características, do número de nós e dos resultados é livre, desde que a chave seja coerente, observável e testável com exemplares ou imagens indicadas pelo professor.",
    },
    {
      titulo: "Objetivos",
      itens: [
        "Compreender a lógica de uma chave dicotômica.",
        "Selecionar características morfológicas observáveis em artrópodes.",
        "Organizar alternativas em pares contrastantes.",
        "Construir uma sequência de nós coerente e sem contradições.",
        "Testar a chave criada e revisar pontos ambíguos.",
      ],
    },
    {
      titulo: "Materiais",
      itens: [
        "Exemplares, imagens ou esquemas de diferentes grupos de artrópodes.",
        "Dispositivo com acesso ao gerador de chaves do aplicativo.",
        "Lupa ou microscópio estereoscópico, quando houver exemplares disponíveis.",
        "Anotações preliminares sobre características observáveis.",
      ],
    },
    {
      titulo: "Segurança e cuidado com os exemplares",
      itens: [
        "Manipule exemplares preservados apenas quando autorizado pelo professor.",
        "Evite danificar antenas, pernas, asas, quelíceras, pedipalpos ou outros apêndices.",
        "Não use características que exijam dissecação ou manipulação inadequada para a atividade.",
        "Priorize caracteres visíveis externamente e comparáveis entre os grupos escolhidos.",
      ],
    },
    {
      titulo: "Procedimento",
      itens: [
        "Defina quais grupos de artrópodes a chave pretende separar.",
        "Liste características externas que possam ser observadas nos exemplares ou imagens.",
        "Escolha a primeira característica que melhor divide o conjunto em dois caminhos.",
        "Crie alternativas contrastantes para cada nó, evitando frases vagas ou sobrepostas.",
        "Adicione novos nós conforme necessário até chegar aos resultados finais.",
        "Teste a chave com pelo menos dois exemplos e revise ambiguidades.",
        "Use a prévia do gerador para simular o uso da chave.",
        "Compare a chave criada com a chave de artrópodes proposta pelo aplicativo.",
      ],
    },
    {
      titulo: "Relatórios e acompanhamento",
      itens: [
        "O arquivo ou chave criada deve registrar título, nós, alternativas e resultados.",
        "O estudante deve revisar a validação do gerador antes de entregar.",
        "A chave criada nesta atividade não deve ser anexada ao aplicativo; ela serve como produção avaliativa e base para reflexão.",
        "O professor poderá avaliar a coerência dos nós, a clareza das alternativas e a adequação dos caracteres escolhidos.",
      ],
    },
    {
      titulo: "Discussão",
      itens: [
        "Quais características foram mais eficientes para separar os grupos?",
        "Alguma alternativa ficou ambígua ou difícil de observar?",
        "A chave funciona para todos os exemplos testados?",
        "Que mudanças melhorariam a sequência dos nós?",
        "A chave depende de características adequadas para aula prática?",
      ],
    },
    {
      titulo: "Avaliação",
      itens: [
        "Clareza do objetivo da chave.",
        "Escolha de características observáveis e adequadas.",
        "Organização lógica dos nós e alternativas.",
        "Ausência de destinos quebrados ou resultados contraditórios.",
        "Capacidade de testar, revisar e justificar a chave construída.",
      ],
    },
  ],
});

export const roteiroColecaoMicroscopioEstereoscopico = anexarFundamentosLegais({
  id: "colecao-microscopio-estereoscopico",
  titulo: "Roteiro: observação de coleção em microscópio estereoscópico",
  atividade: "Observar coleção em microscópio estereoscópico",
  disciplina: "Zoologia I",
  duracao: "1 aula prática",
  publico: "Estudantes de Zoologia I",
  resumo:
    "Roteiro para observar espécimes de coleção seca e molhada em estereoscópio, fotografar os exemplares e identificar estruturas por setas coloridas com legenda.",
  secoes: [
    {
      titulo: "Apresentação",
      texto:
        "Nesta prática, cada estudante ou grupo observa diferentes espécimes preservados em coleção a seco e em coleção molhada. As estruturas morfológicas visíveis devem ser fotografadas, marcadas com setas coloridas e acompanhadas de legenda para compor o relatório da atividade.",
    },
    {
      titulo: "Objetivos",
      itens: [
        "Treinar o uso do microscópio estereoscópico em material preservado.",
        "Reconhecer estruturas externas ou anatômicas indicadas pelo professor.",
        "Registrar imagens com foco, iluminação e enquadramento adequados.",
        "Identificar estruturas nas fotos usando setas coloridas e legenda.",
        "Organizar as observações em um relatório visual da prática.",
      ],
    },
    {
      titulo: "Materiais",
      itens: [
        "Microscópio estereoscópico.",
        "Espécimes de coleção a seco e espécimes preservados em líquido.",
        "Dispositivo com câmera ou arquivo de imagem obtido no laboratório.",
        "Pinça, bandeja, placa de Petri, frascos e meio de conservação quando orientado.",
        "Aplicativo para registrar foto, setas coloridas, legenda e observações.",
      ],
    },
    {
      titulo: "Segurança e cuidado com os exemplares",
      itens: [
        "Manipule exemplares secos e frascos de coleção molhada apenas sobre a bancada.",
        "Evite pressionar apêndices, asas, antenas, cerdas ou estruturas frágeis.",
        "Não retire material do frasco ou do meio de conservação sem autorização.",
        "Mantenha cada espécime com sua etiqueta, frasco ou identificação original.",
        "Feche os frascos de coleção molhada após a observação para evitar perda de conservante.",
        "Ao final, devolva o material ao local indicado pelo professor.",
      ],
    },
    {
      titulo: "Procedimento",
      itens: [
        "Selecione um espécime da coleção seca ou molhada e registre seu nome, grupo ou código.",
        "Observe o organismo inteiro em menor aumento antes de ampliar detalhes.",
        "Ajuste foco e iluminação até a estrutura de interesse ficar nítida.",
        "Fotografe o exemplar ou a estrutura observada, ou escolha uma imagem já capturada.",
        "Adicione setas coloridas apontando para as estruturas solicitadas.",
        "Preencha a legenda com o nome da estrutura correspondente a cada cor.",
        "Repita o processo para os demais espécimes da coleção.",
        "Revise se a legenda permite entender a imagem sem explicação oral.",
      ],
    },
    {
      titulo: "Relatórios e acompanhamento",
      itens: [
        "Cada registro deve conter identificação do espécime, tipo de coleção, foto anotada, legenda e observações.",
        "As fotos podem ser adicionadas pelo mesmo fluxo usado no relatório da chave de identificação.",
        "A versão anotada da imagem deve ser exportada ou impressa junto ao relatório da prática.",
        "Quando solicitado, o estudante deve justificar como reconheceu cada estrutura.",
        "Dúvidas, estruturas parcialmente visíveis ou problemas de foco devem ser descritos nas observações.",
      ],
    },
    {
      titulo: "Discussão",
      itens: [
        "Quais estruturas foram mais fáceis de reconhecer?",
        "O aumento usado ajudou ou dificultou a identificação?",
        "Alguma estrutura ficou ambígua na foto?",
        "Como iluminação, posição do organismo e tipo de preservação interferiram no registro?",
        "Que nova foto ou seta melhoraria a legenda?",
      ],
    },
    {
      titulo: "Avaliação",
      itens: [
        "Qualidade técnica mínima da foto: foco, iluminação e enquadramento.",
        "Correspondência correta entre setas, cores e legenda.",
        "Identificação adequada das estruturas solicitadas.",
        "Cuidado com os materiais da coleção.",
        "Clareza das observações no relatório final.",
      ],
    },
  ],
});

export const roteiroKitLaminasInvertebrados = anexarFundamentosLegais({
  id: "kit-laminas-invertebrados",
  titulo: "Roteiro: kit de lâminas de invertebrados",
  atividade: "Kit de Lâminas de Invertebrados",
  disciplina: "Zoologia I",
  duracao: "1 aula prática",
  publico: "Estudantes de Zoologia I",
  resumo:
    "Roteiro para observar lâminas prontas de invertebrados, fotografar campos ou estruturas relevantes e identificá-las com setas coloridas e legenda.",
  secoes: [
    {
      titulo: "Apresentação",
      texto:
        "Nesta prática, cada estudante ou grupo observa um kit de lâminas prontas com estruturas ou organismos de diferentes grupos de invertebrados. O registro deve combinar observação ao microscópio, fotografia do campo observado e identificação das estruturas por setas coloridas com legenda.",
    },
    {
      titulo: "Objetivos",
      itens: [
        "Reconhecer estruturas anatômicas e morfológicas em lâminas de invertebrados.",
        "Treinar ajuste de foco, iluminação e aumento no microscópio.",
        "Fotografar campos representativos das lâminas observadas.",
        "Identificar estruturas nas imagens usando setas coloridas e legenda.",
        "Comparar diferenças entre grupos ou tipos de preparação.",
      ],
    },
    {
      titulo: "Materiais",
      itens: [
        "Kit de lâminas prontas de invertebrados.",
        "Microscópio óptico ou estereoscópico, conforme orientação do professor.",
        "Dispositivo com câmera ou arquivo de imagem obtido durante a aula.",
        "Papel lens, bancada limpa e suporte adequado para as lâminas.",
        "Aplicativo para registrar foto, setas coloridas, legenda e observações.",
      ],
    },
    {
      titulo: "Segurança e cuidado com os exemplares",
      itens: [
        "Manipule as lâminas sempre pelas bordas.",
        "Não pressione a lamínula nem toque a área de montagem.",
        "Evite deixar lâminas na borda da bancada.",
        "Limpe apenas quando orientado pelo professor e com material adequado.",
        "Mantenha cada lâmina associada ao seu código, caixa ou posição no kit.",
        "Ao final, devolva as lâminas à caixa na ordem indicada.",
      ],
    },
    {
      titulo: "Procedimento",
      itens: [
        "Selecione uma lâmina do kit e registre seu nome, código ou grupo taxonômico.",
        "Comece a observação no menor aumento para localizar a estrutura principal.",
        "Ajuste foco, iluminação e posição da lâmina antes de fotografar.",
        "Fotografe o campo observado ou escolha uma imagem já capturada.",
        "Adicione setas coloridas apontando para as estruturas solicitadas.",
        "Preencha a legenda com o nome da estrutura correspondente a cada cor.",
        "Repita o processo para as demais lâminas indicadas pelo professor.",
        "Revise se a foto e a legenda permitem reconhecer a estrutura sem explicação oral.",
      ],
    },
    {
      titulo: "Relatórios e acompanhamento",
      itens: [
        "Cada registro deve conter identificação da lâmina, tipo de preparação, foto anotada, legenda e observações.",
        "A versão anotada da imagem deve ser exportada ou impressa junto ao relatório da prática.",
        "Quando solicitado, o estudante deve justificar como reconheceu cada estrutura.",
        "Dúvidas, estruturas parcialmente visíveis, baixa nitidez ou problemas de contraste devem ser descritos nas observações.",
        "O relatório deve permitir comparar o que foi observado em diferentes lâminas do kit.",
      ],
    },
    {
      titulo: "Discussão",
      itens: [
        "Quais estruturas foram mais fáceis de reconhecer nas lâminas?",
        "O aumento usado foi adequado para a estrutura fotografada?",
        "Alguma preparação ficou difícil de interpretar por corte, coloração ou contraste?",
        "Como a orientação da lâmina influenciou a identificação das estruturas?",
        "Que nova foto, aumento ou seta melhoraria a legenda?",
      ],
    },
    {
      titulo: "Avaliação",
      itens: [
        "Qualidade técnica mínima da foto: foco, iluminação, contraste e enquadramento.",
        "Correspondência correta entre setas, cores e legenda.",
        "Identificação adequada das estruturas solicitadas.",
        "Cuidado no manuseio e organização das lâminas.",
        "Clareza das observações no relatório final.",
      ],
    },
  ],
});

export const roteiroEstruturasSustentacaoEsponjas = anexarFundamentosLegais({
  id: "estruturas-sustentacao-esponjas",
  titulo: "Roteiro: estruturas de sustentação das esponjas",
  atividade: "Estruturas de Sustentação das Esponjas",
  disciplina: "Zoologia I",
  duracao: "1 aula prática",
  publico: "Estudantes de Zoologia I",
  resumo:
    "Roteiro para preparar pequenos fragmentos de esponjas, remover parte do material orgânico com hipoclorito, concentrar espículas por centrifugação e registrar estruturas de sustentação ao microscópio.",
  secoes: [
    {
      titulo: "Apresentação",
      texto:
        "Nesta prática, cada estudante ou grupo observa estruturas de sustentação de esponjas a partir de material de coleção úmida ou material recém coletado. Pequenos fragmentos são tratados com hipoclorito para degradar parte do material orgânico, permitindo observar espículas e, quando presente, a associação com espongina. As estruturas observadas devem ser fotografadas e identificadas com setas e textos no aplicativo.",
    },
    {
      titulo: "Objetivos",
      itens: [
        "Reconhecer espículas como elementos estruturais do corpo das esponjas.",
        "Relacionar espículas e espongina ao papel de sustentação em Porifera.",
        "Preparar material para observação microscópica após degradação parcial do tecido orgânico.",
        "Observar diferenças de forma, abundância e organização das espículas em aumentos variados.",
        "Registrar fotos anotadas e observações sobre o material analisado.",
      ],
    },
    {
      titulo: "Materiais",
      itens: [
        "Fragmentos de esponjas provenientes de coleção úmida ou material recém coletado.",
        "Placa de Petri.",
        "Pinça, bisturi, lâmina ou tesoura apropriada para cortar pequenos fragmentos.",
        "Hipoclorito de sódio ou cloro, conforme orientação do professor.",
        "Água para lavagem do material.",
        "Tubo Falcon.",
        "Centrífuga.",
        "Pipeta ou conta-gotas para retirar sobrenadante e transferir amostras.",
        "Lâminas e lamínulas.",
        "Microscópio óptico.",
        "Dispositivo com câmera ou arquivo de imagem obtido no laboratório.",
        "Aplicativo para registrar foto, setas, textos, observações e síntese.",
      ],
    },
    {
      titulo: "Segurança e cuidado com os exemplares",
      itens: [
        "Use luvas, jaleco e óculos de proteção durante o manuseio de hipoclorito.",
        "Realize o procedimento com cloro em local ventilado e sob supervisão do professor.",
        "Não misture hipoclorito com ácidos, álcool, amônia ou outros reagentes.",
        "Corte apenas pequenos fragmentos do material indicado, preservando o restante da amostra.",
        "Identifique o material de origem para não misturar amostras de espécies ou pontos de coleta diferentes.",
        "Descarte resíduos e sobrenadantes somente conforme orientação do professor ou técnico responsável.",
      ],
    },
    {
      titulo: "Procedimento",
      itens: [
        "Observe inicialmente o material inteiro ou o fragmento preservado, registrando origem, tipo de material e aspecto geral.",
        "Corte pequenos pedaços da esponja com pinça e lâmina, bisturi ou tesoura apropriada.",
        "Coloque os fragmentos em uma placa de Petri com hipoclorito de sódio ou cloro.",
        "Aguarde a degradação do material orgânico até que o resíduo fique adequado para observação das estruturas de sustentação.",
        "Após a degradação, lave o material residual, incluindo a espongina quando ela permanecer visível.",
        "Transfira o material lavado para um tubo Falcon.",
        "Leve o tubo à centrífuga por aproximadamente 10 segundos para concentrar as espículas no fundo.",
        "Retire cuidadosamente o sobrenadante, evitando ressuspender o material depositado no fundo do tubo.",
        "Transfira uma pequena porção do sedimento para uma lâmina e cubra com lamínula.",
        "Observe ao microscópio em aumentos variados, começando em menor aumento para localizar o material.",
        "Fotografe campos representativos das espículas e, quando possível, da associação com espongina.",
        "No aplicativo, adicione setas e textos para indicar espículas, feixes, fibras de espongina ou outros elementos observados.",
        "Registre observações por foto e preencha a síntese final do material observado.",
      ],
    },
    {
      titulo: "Relatórios e acompanhamento",
      itens: [
        "Cada registro deve conter origem do material, tipo de material, foto anotada, textos explicativos e observações.",
        "As fotos devem evidenciar espículas ou estruturas de sustentação relacionadas ao material observado.",
        "O estudante deve indicar o aumento utilizado sempre que essa informação estiver disponível.",
        "O relatório deve incluir observações sobre abundância, forma, organização e nitidez das espículas.",
        "A síntese final deve relacionar as estruturas observadas à sustentação do corpo das esponjas.",
      ],
    },
    {
      titulo: "Discussão",
      itens: [
        "Que tipos de estruturas de sustentação foram observadas?",
        "As espículas apareceram isoladas, em feixes ou associadas a material fibroso?",
        "A preparação com hipoclorito facilitou ou dificultou a visualização?",
        "Houve diferença entre material de coleção úmida e material recém coletado?",
        "O aumento utilizado permitiu observar forma e extremidades das espículas?",
        "A presença ou ausência de espongina alterou a interpretação do material?",
      ],
    },
    {
      titulo: "Observação ao professor",
      itens: [
        "Grande parte das esponjas encontradas no litoral pertence a Demospongiae, mas nem todas apresentarão o mesmo padrão de espículas associadas à espongina.",
        "Antes da prática, verifique quais esponjas da sua região ou coleção apresentam espículas, espongina ou ambos de forma adequada para observação didática.",
        "Quando houver espécies com esqueleto predominantemente de espongina, o professor pode usar a comparação para discutir diversidade estrutural em Porifera.",
        "Ajuste o tempo de exposição ao hipoclorito conforme o estado do material, evitando degradação excessiva ou perda do resíduo útil para observação.",
      ],
    },
    {
      titulo: "Avaliação",
      itens: [
        "Cuidado no manuseio do material biológico e do hipoclorito.",
        "Execução correta das etapas de lavagem, centrifugação e retirada do sobrenadante.",
        "Qualidade das imagens microscópicas registradas.",
        "Identificação adequada das estruturas por setas e textos.",
        "Clareza das observações e da síntese final no relatório.",
      ],
    },
    {
      titulo: "Referências de apoio",
      itens: [
        "Boury-Esnault, N.; Rützler, K. 1997. Thesaurus of Sponge Morphology. Smithsonian Contributions to Zoology, 596.",
        "Hajdu, E.; Peixinho, S.; Fernandez, J. C. C. 2011. Esponjas Marinhas da Bahia: Guia de Campo e Laboratório. Museu Nacional/UFRJ.",
        "World Porifera Database e literatura de morfologia de Porifera para confirmação dos grupos e tipos de esqueleto presentes na região.",
      ],
    },
  ],
});

export const roteiroIntroducaoMicroscopia = {
  id: "introducao-microscopia-preparo-laminas",
  titulo: "Roteiro: microscópios e preparo inicial de lâminas",
  atividade: "Introdução ao Microscópio Óptico, Estereoscópico e Preparo de Lâminas",
  disciplina: "Zoologia I",
  duracao: "1 aula prática",
  publico: "Estudantes de Zoologia I",
  resumo:
    "Roteiro introdutório para reconhecer as partes do microscópio óptico e do microscópio estereoscópico, compreender suas funções e preparar uma lâmina simples para observação.",
  secoes: [
    {
      titulo: "Apresentação",
      texto:
        "Esta prática deve ser realizada no início da disciplina para familiarizar os estudantes com os instrumentos usados nas demais aulas. O objetivo é reconhecer as partes principais do microscópio óptico e do microscópio estereoscópico, compreender suas funções, treinar foco e iluminação e realizar uma preparação simples de lâmina temporária para observação.",
    },
    {
      titulo: "Objetivos",
      itens: [
        "Identificar as principais estruturas do microscópio óptico e suas funções.",
        "Identificar as principais estruturas do microscópio estereoscópico e suas funções.",
        "Diferenciar situações de uso do microscópio óptico e do estereoscópico.",
        "Treinar ajuste de iluminação, foco e aumento.",
        "Preparar uma lâmina temporária simples para observação.",
        "Registrar imagens observadas e descrevê-las no relatório da prática.",
      ],
    },
    {
      titulo: "Materiais",
      itens: [
        "Microscópio óptico.",
        "Microscópio estereoscópico.",
        "Lâminas e lamínulas.",
        "Conta-gotas ou pipeta Pasteur.",
        "Água ou meio indicado pelo professor.",
        "Pinça, estilete, agulha histológica ou outro instrumento de manipulação.",
        "Papel absorvente ou papel lens.",
        "Material simples para preparo de lâmina, como fibras vegetais, pequenos fragmentos de tecido biológico, água de cultura, epiderme vegetal, grãos de areia fina ou material indicado pelo professor.",
        "Dispositivo com câmera ou arquivo de imagem obtido no laboratório.",
        "Aplicativo para registrar fotos, setas, textos, observações e síntese.",
      ],
    },
    {
      titulo: "Segurança e cuidado com os equipamentos",
      itens: [
        "Transporte microscópios sempre com as duas mãos, segurando braço e base.",
        "Não force botões de foco, revólver, platina ou controles de iluminação.",
        "Comece sempre pelo menor aumento antes de usar aumentos maiores.",
        "No microscópio óptico, evite encostar a objetiva na lâmina.",
        "Manipule lâminas e lamínulas pelas bordas, pois podem quebrar e cortar.",
        "Limpe lentes apenas com material adequado e quando orientado pelo professor.",
        "Desligue a iluminação e cubra o equipamento ao final, conforme rotina do laboratório.",
      ],
    },
    {
      titulo: "Estruturas do microscópio óptico",
      itens: [
        "Oculares: lentes pelas quais o observador visualiza a imagem.",
        "Revólver porta-objetivas: peça giratória que permite escolher a objetiva.",
        "Objetivas: lentes de diferentes aumentos usadas para ampliar a imagem.",
        "Platina: superfície onde a lâmina é posicionada.",
        "Charriot ou presilhas: sistema que prende e movimenta a lâmina sobre a platina.",
        "Condensador e diafragma: controlam a concentração e a passagem de luz.",
        "Fonte de luz: ilumina a preparação.",
        "Parafuso macrométrico: ajuste grosseiro do foco, usado principalmente em menor aumento.",
        "Parafuso micrométrico: ajuste fino do foco.",
        "Braço e base: estruturas de sustentação do equipamento.",
      ],
    },
    {
      titulo: "Estruturas do microscópio estereoscópico",
      itens: [
        "Oculares: permitem observação binocular.",
        "Cabeçote binocular: estrutura que sustenta as oculares e permite visão tridimensional aparente.",
        "Objetiva ou sistema zoom: controla o aumento da imagem.",
        "Botão de foco: aproxima ou afasta o conjunto óptico da amostra.",
        "Platina ou base de observação: local onde o exemplar é posicionado.",
        "Iluminação incidente: luz superior, útil para observar superfícies externas.",
        "Iluminação transmitida, quando disponível: luz inferior, útil para materiais translúcidos.",
        "Controle de intensidade luminosa: ajusta a quantidade de luz.",
        "Braço e base: sustentam o equipamento e a amostra.",
      ],
    },
    {
      titulo: "Procedimento",
      itens: [
        "Observe o microscópio óptico desligado e identifique cada estrutura indicada pelo professor.",
        "Observe o microscópio estereoscópico e compare suas partes com as do microscópio óptico.",
        "Discuta em quais situações cada equipamento é mais adequado: lâminas finas, material translúcido, organismos inteiros, estruturas externas ou objetos tridimensionais.",
        "No microscópio óptico, coloque uma lâmina pronta ou lâmina demonstrativa e inicie a observação no menor aumento.",
        "Ajuste iluminação, posição da lâmina e foco usando primeiro o macrométrico e depois o micrométrico.",
        "No estereoscópico, posicione um pequeno exemplar ou objeto e ajuste foco, iluminação e aumento.",
        "Prepare uma lâmina temporária simples com uma gota de água ou meio indicado.",
        "Coloque pequena quantidade do material sobre a lâmina.",
        "Aproxime a lamínula inclinada e abaixe-a lentamente para reduzir bolhas de ar.",
        "Retire excesso de líquido com papel absorvente, se necessário.",
        "Observe a lâmina no microscópio óptico em aumentos progressivos.",
        "Fotografe uma imagem representativa da preparação ou do equipamento, conforme orientação.",
        "No aplicativo, registre a foto, marque estruturas com setas e escreva observações sobre foco, iluminação, aumento e preparo.",
      ],
    },
    {
      titulo: "Relatórios e acompanhamento",
      itens: [
        "Cada registro pode corresponder a um equipamento observado ou a uma preparação de lâmina.",
        "O estudante deve identificar estruturas do microscópio ou elementos observados na lâmina usando setas e textos.",
        "As observações devem registrar dificuldades de foco, iluminação, formação de bolhas, excesso de material ou problemas de contraste.",
        "A síntese final deve comparar o uso do microscópio óptico e do estereoscópico.",
        "O relatório deve demonstrar que o estudante compreendeu função, cuidado e aplicação de cada equipamento.",
      ],
    },
    {
      titulo: "Discussão",
      itens: [
        "Qual equipamento foi mais adequado para observar material tridimensional?",
        "Qual equipamento foi mais adequado para observar lâminas delgadas?",
        "O que mudou ao aumentar a objetiva no microscópio óptico?",
        "Como iluminação e foco interferiram na qualidade da imagem?",
        "Que dificuldades apareceram durante o preparo da lâmina temporária?",
        "Por que a lamínula deve ser abaixada lentamente?",
      ],
    },
    {
      titulo: "Avaliação",
      itens: [
        "Identificação correta das estruturas dos microscópios.",
        "Compreensão da função de cada componente.",
        "Uso cuidadoso dos equipamentos e lâminas.",
        "Execução adequada da lâmina temporária.",
        "Qualidade mínima das imagens registradas.",
        "Clareza das observações e da síntese final.",
      ],
    },
  ],
};
