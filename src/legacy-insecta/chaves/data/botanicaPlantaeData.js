// Chave didatica de Botânica II baseada em caracteres gerais de Plantae.
// Fontes de apoio consultadas: OpenStax Biology 2e, APG IV, Kew/POWO e UCMP.
// A chave prioriza caracteres observáveis em aula prática e evita exigir
// microscopia ou anatomia especializada quando houver alternativa macroscópica.

export const botanicaPlantaeNodes = {
  inicio: {
    title: "Etapa 1 · organização geral",
    prompt:
      "O exemplar apresenta tecidos vasculares evidentes, como raízes, caule e folhas verdadeiros com condução interna?",
    a: {
      text:
        "Sim. Há organização em raiz, caule e folhas verdadeiras ou estruturas vasculares equivalentes",
      next: "sementes",
      explanation: {
        body:
          "Tecidos vasculares permitem transporte de água, sais e açúcares por xilema e floema. Em aula prática, a presença de caule firme, raízes verdadeiras, folhas com nervuras e maior porte costuma indicar planta vascular.",
        hint:
          "Observe nervuras nas folhas, consistência do caule e presença de raízes verdadeiras.",
      },
    },
    b: {
      text:
        "Não. O corpo é pequeno, sem raízes, caules e folhas verdadeiros; pode ter rizoides e depender de ambiente úmido",
      next: "briofitas",
      explanation: {
        body:
          "Briófitas são plantas terrestres sem tecido vascular lignificado verdadeiro. Geralmente são pequenas, vivem em locais úmidos e apresentam gametófito como fase mais evidente.",
        hint:
          "Procure rizoides em vez de raízes e estruturas reprodutivas simples, como cápsulas em musgos.",
      },
    },
  },

  briofitas: {
    title: "Etapa 2 · briófitas",
    prompt:
      "A planta possui caulídio e filídios aparentes, lembrando um pequeno musgo com cápsulas sobre hastes?",
    a: {
      text:
        "Sim. Há eixo folhoso delicado e, quando fértil, cápsula terminal sustentada por uma seta",
      result: "BRYOPHYTA_MUSGOS",
      explanation: {
        body:
          "Musgos possuem gametófito folhoso e podem apresentar esporófito com seta e cápsula. São bons representantes didáticos das briófitas.",
        hint: "Procure uma cápsula elevada acima do tapete verde.",
      },
    },
    b: {
      text:
        "Não. O corpo é taloso ou achatado, ou não forma o padrão folhoso típico dos musgos",
      next: "briofitas_talosas",
      explanation: {
        body:
          "Entre as briófitas sem aspecto típico de musgo, podem aparecer hepáticas talosas/foliosas e antóceros. A separação pode exigir observar o talo e o tipo de esporófito.",
        hint: "Observe se o corpo é uma lâmina verde achatada.",
      },
    },
  },

  briofitas_talosas: {
    title: "Etapa 3 · briófitas talosas",
    prompt:
      "O esporófito, quando presente, é alongado como um pequeno chifre emergindo do talo?",
    a: {
      text:
        "Sim. Esporófito alongado, estreito e persistente, lembrando um chifre",
      result: "ANTHOCEROTOPHYTA_ANTOCEROS",
      explanation: {
        body:
          "Antóceros geralmente possuem talo simples e esporófito alongado em forma de chifre. É uma distinção útil quando o material está fértil.",
        hint: "Sem esporófito, a confirmação pode ser difícil em aula prática.",
      },
    },
    b: {
      text:
        "Não. Corpo taloso ou folioso sem esporófito em forma de chifre",
      result: "MARCHANTIOPHYTA_HEPATICAS",
      explanation: {
        body:
          "Hepáticas podem ser talosas ou foliosas e não apresentam o esporófito persistente em forma de chifre típico dos antóceros.",
        hint: "Em Marchantia, procure talo achatado com estruturas reprodutivas em pequenos suportes.",
      },
    },
  },

  sementes: {
    title: "Etapa 2 · reprodução",
    prompt:
      "A planta produz sementes, isto é, estruturas reprodutivas com embrião protegido?",
    a: {
      text:
        "Sim. Há sementes em cones, frutos, flores secas, vagens, aquênios ou estruturas equivalentes",
      next: "flores_frutos",
      explanation: {
        body:
          "Plantas com sementes incluem gimnospermas e angiospermas. A semente protege o embrião e torna a reprodução menos dependente de água livre do que em plantas por esporos.",
        hint: "Procure cones, frutos ou sementes visíveis.",
      },
    },
    b: {
      text:
        "Não. A planta vascular se reproduz por esporos e não forma sementes",
      next: "vasculares_sem_sementes",
      explanation: {
        body:
          "Plantas vasculares sem sementes incluem licófitas e samambaias/afins. Têm xilema e floema, mas dispersam esporos.",
        hint: "Procure soros, esporângios ou estróbilos com esporos.",
      },
    },
  },

  vasculares_sem_sementes: {
    title: "Etapa 3 · vasculares sem sementes",
    prompt:
      "As folhas são pequenas, simples e com uma única nervura, frequentemente associadas a estróbilos terminais?",
    a: {
      text:
        "Sim. Microfilos pequenos, geralmente com estróbilos em licopódios, selaginelas ou isoetes",
      result: "LYCOPHYTA_LICOFITAS",
      explanation: {
        body:
          "Licófitas possuem microfilos, folhas pequenas com uma única nervura. Muitos representantes produzem esporos em estróbilos.",
        hint: "Compare microfilos com frondes maiores e mais divididas das samambaias.",
      },
    },
    b: {
      text:
        "Não. Há frondes maiores, folhas divididas ou caules articulados; esporângios podem formar soros",
      next: "monilofitas",
      explanation: {
        body:
          "Samambaias e cavalinhas pertencem ao conjunto das monilófitas. Em aula prática, frondes com soros são o exemplo mais comum.",
        hint: "Olhe o verso das frondes procurando pontos ou faixas de soros.",
      },
    },
  },

  monilofitas: {
    title: "Etapa 4 · monilófitas",
    prompt:
      "O exemplar possui frondes, geralmente com soros no verso ou nas margens?",
    a: {
      text:
        "Sim. Frondes bem desenvolvidas com soros ou esporângios associados",
      result: "POLYPODIOPSIDA_SAMAMBAIAS",
      explanation: {
        body:
          "Samambaias possuem frondes e frequentemente apresentam soros no verso das folhas. São monilófitas comuns em aulas práticas.",
        hint: "Soros podem aparecer como pontuações marrons, linhas ou manchas no verso da folha.",
      },
    },
    b: {
      text:
        "Não. Caule articulado, ramos em verticilos ou estróbilos terminais sem frondes largas",
      result: "EQUISETOPSIDA_CAVALINHAS",
      explanation: {
        body:
          "Cavalinhas apresentam caules articulados, sílica na parede celular e estróbilos terminais. Podem ser separadas das samambaias pelo hábito articulado.",
        hint: "Procure nós e entrenós evidentes no caule.",
      },
    },
  },

  flores_frutos: {
    title: "Etapa 3 · sementes",
    prompt:
      "As sementes ficam encerradas em frutos, ou a planta apresenta flores verdadeiras?",
    a: {
      text:
        "Sim. Há flores, frutos ou sementes dentro de um ovário/fruto",
      next: "angiospermas",
      explanation: {
        body:
          "Angiospermas são plantas com flores; suas sementes ficam encerradas em frutos derivados do ovário. Mesmo quando a flor não está presente, frutos e sementes protegidas indicam o grupo.",
        hint: "Fruto não precisa ser carnoso; vagens, cápsulas e grãos também são frutos.",
      },
    },
    b: {
      text:
        "Não. As sementes ficam expostas em cones, escamas ou estruturas não encerradas por fruto",
      next: "gimnospermas",
      explanation: {
        body:
          "Gimnospermas possuem sementes não encerradas em frutos. Cones lenhosos, folhas aciculares e estruturas como pinhas são exemplos comuns.",
        hint: "Procure cones ou sementes sobre escamas.",
      },
    },
  },

  gimnospermas: {
    title: "Etapa 4 · gimnospermas",
    prompt:
      "A planta possui folhas aciculares ou escamiformes e cones lenhosos típicos de coníferas?",
    a: {
      text:
        "Sim. Folhas em agulha ou escamas e cones lenhosos, como pinheiros, ciprestes e araucárias",
      result: "PINOPHYTA_CONIFERAS",
      explanation: {
        body:
          "Coníferas são o grupo mais comum de gimnospermas em aulas práticas. Têm geralmente hábito lenhoso, folhas aciculares/escamiformes e cones.",
        hint: "Araucária, pinus e ciprestes são bons exemplos para comparação.",
      },
    },
    b: {
      text:
        "Não. Folhas grandes pinadas, folhas em leque ou estruturas reprodutivas menos típicas de coníferas",
      next: "gimnospermas_nao_coniferas",
      explanation: {
        body:
          "Gimnospermas não coníferas incluem cicas, Ginkgo e gnetófitas. A separação depende de folhas e estruturas reprodutivas.",
        hint: "Observe se a folha lembra palmeira, leque ou se há morfologia incomum.",
      },
    },
  },

  gimnospermas_nao_coniferas: {
    title: "Etapa 5 · gimnospermas não coníferas",
    prompt:
      "As folhas são grandes, compostas ou pinadas, com aspecto semelhante ao de uma palmeira?",
    a: {
      text:
        "Sim. Folhas pinadas rígidas, caule geralmente robusto, como em cicas",
      result: "CYCADOPHYTA_CICAS",
      explanation: {
        body:
          "Cicas são gimnospermas com folhas pinadas e aparência superficial de palmeira, mas produzem sementes em estruturas típicas de gimnospermas.",
        hint: "Não confunda com palmeiras, que são angiospermas monocotiledôneas.",
      },
    },
    b: {
      text:
        "Não. Folhas em leque ou morfologia peculiar de gnetófitas",
      result: "GINKGOPHYTA_OU_GNETOPHYTA",
      explanation: {
        body:
          "Ginkgo possui folhas em leque; gnetófitas têm morfologias variadas. Em material didático, podem aparecer como exemplos de gimnospermas não coníferas.",
        hint: "Use esta saída quando o exemplar não se ajusta a coníferas nem cicas.",
      },
    },
  },

  angiospermas: {
    title: "Etapa 4 · angiospermas",
    prompt:
      "As folhas têm nervuras paralelas e as flores, quando visíveis, apresentam peças geralmente em múltiplos de três?",
    a: {
      text:
        "Sim. Nervação paralela, um cotilédone, peças florais em trímeros ou hábito típico de gramíneas, palmeiras, lírios e orquídeas",
      next: "familias_monocotiledoneas",
      explanation: {
        body:
          "Monocotiledôneas são um grande clado de angiospermas. Em aula prática, nervação paralela, folhas com bainha e peças florais em múltiplos de três são critérios úteis. Quando houver caracteres suficientes, a chave pode avançar para famílias frequentes.",
        hint: "Gramíneas, palmeiras, bromélias, lírios e orquídeas são exemplos comuns.",
      },
    },
    b: {
      text:
        "Não. Folhas geralmente com nervação reticulada ou características de angiospermas não monocotiledôneas",
      next: "angiospermas_nao_mono",
      explanation: {
        body:
          "Angiospermas não monocotiledôneas incluem eudicotiledôneas, magnoliídeas e linhagens basais. A nervação reticulada é um bom início, mas flores, pólen e sementes ajudam a confirmar.",
        hint: "Verifique também número de peças florais e tipo de caule.",
      },
    },
  },

  angiospermas_nao_mono: {
    title: "Etapa 5 · angiospermas não monocotiledôneas",
    prompt:
      "As flores, quando presentes, têm peças geralmente em múltiplos de quatro ou cinco, e as folhas costumam ter nervação reticulada?",
    a: {
      text:
        "Sim. Conjunto típico de eudicotiledôneas: nervação reticulada, dois cotilédones e flores tetrâmeras ou pentâmeras",
      next: "eudicotiledoneas",
      explanation: {
        body:
          "Eudicotiledôneas formam a maior parte das antigas dicotiledôneas. O pólen tricolpado é diagnóstico, mas em aula prática usamos nervação reticulada e flores em 4 ou 5 peças.",
        hint: "Feijão, roseiras, girassóis, goiabeiras e muitas árvores comuns são eudicotiledôneas.",
      },
    },
    b: {
      text:
        "Não. Caracteres mistos, flores grandes com muitas peças livres ou padrão de linhagens basais/magnoliídeas",
      next: "magnoliideas_basais",
      explanation: {
        body:
          "Algumas angiospermas não se encaixam bem em monocotiledôneas ou eudicotiledôneas usando caracteres simples. Magnoliídeas e linhagens basais retêm combinações consideradas mais antigas.",
        hint: "Procure flores com muitas peças espiraladas ou aromáticas.",
      },
    },
  },

  magnoliideas_basais: {
    title: "Etapa 6 · angiospermas basais e magnoliídeas",
    prompt:
      "A planta possui flores grandes ou aromáticas, com muitas peças livres/espiraladas, ou pertence a grupos como magnólia, louro, pimenta ou vitória-régia?",
    a: {
      text:
        "Sim. Características compatíveis com magnoliídeas ou outras angiospermas de linhagens basais",
      next: "familias_magnoliideas",
      explanation: {
        body:
          "Magnoliídeas e linhagens basais de angiospermas ajudam a mostrar que a antiga divisão monocotiledôneas/dicotiledôneas é didática, mas não cobre toda a diversidade evolutiva. A separação por família deve ser feita apenas quando folhas, aroma, inflorescência ou flor ajudarem.",
        hint: "Use exemplos como magnólia, canela/louro, pimenta-do-reino e ninfeias quando disponíveis.",
      },
    },
    b: {
      text:
        "Não. O exemplar é angiosperma, mas os caracteres disponíveis não permitem separar com segurança",
      result: "ANGIOSPERMAE_INDETERMINADA",
      explanation: {
        body:
          "Quando flores, frutos, sementes ou folhas diagnósticas não estão disponíveis, é melhor registrar Angiospermae indeterminada e justificar quais caracteres faltaram.",
        hint: "Retorne ao exemplar com flor ou fruto, se possível.",
      },
    },
  },

  eudicotiledoneas: {
    title: "Etapa 6 · eudicotiledôneas",
    prompt:
      "O objetivo da atividade é separar grandes clados de eudicotiledôneas usando caracteres florais/vegetativos disponíveis?",
    a: {
      text:
        "Sim. Há material suficiente para uma triagem didática entre grupos frequentes",
      next: "eudicots_clados",
      explanation: {
        body:
          "A separação profunda de eudicotiledôneas segue filogenia molecular moderna. Para uso didático, convém tratar rosídeas e asterídeas como grandes conjuntos, sem forçar família quando faltam flores.",
        hint: "Observe tipo de flor, ovário, folhas, látex, estípulas e inflorescência.",
      },
    },
    b: {
      text:
        "Não. A atividade pede apenas reconhecer eudicotiledônea em nível amplo",
      result: "ANGIOSPERMAE_EUDICOTILEDONEAS",
      explanation: {
        body:
          "A identificação como eudicotiledônea já é adequada quando a chave trabalha os grandes grupos de Plantae.",
        hint: "Registre os caracteres usados: nervação, peças florais, tipo de caule e fruto.",
      },
    },
  },

  eudicots_clados: {
    title: "Etapa 7 · grandes clados de eudicotiledôneas",
    prompt:
      "A flor é geralmente simpétala, com corola tubular ou fundida, e há características comuns de asterídeas, como capítulos, látex ou flores bilabiadas?",
    a: {
      text:
        "Sim. Caracteres compatíveis com asterídeas ou superasterídeas",
      next: "familias_asterideas",
      explanation: {
        body:
          "Asterídeas incluem grupos como Asteraceae, Lamiaceae, Rubiaceae, Solanaceae e Apocynaceae. Corolas fundidas e inflorescências especializadas são frequentes e permitem uma triagem didática por família.",
        hint: "Girassol, hortelã, café, tomate e alamanda são exemplos úteis.",
      },
    },
    b: {
      text:
        "Não. Caracteres mais compatíveis com rosídeas/superrosídeas ou eudicotiledôneas basais",
      next: "rosideas",
      explanation: {
        body:
          "Rosídeas incluem muitas árvores, leguminosas, roseiras, euforbiáceas e malváceas. A distinção didática pode usar frutos, estípulas, flores livres e folhas compostas, quando presentes.",
        hint: "Feijão, hibisco, goiabeira, roseira e mandioca são exemplos comuns.",
      },
    },
  },

  rosideas: {
    title: "Etapa 8 · rosídeas e outras eudicotiledôneas",
    prompt:
      "Há folhas compostas, estípulas, flores frequentemente dialipétalas ou frutos típicos de grupos como leguminosas, rosáceas, malváceas, mirtáceas ou euforbiáceas?",
    a: {
      text:
        "Sim. Caracteres compatíveis com rosídeas ou superrosídeas",
      next: "familias_rosideas",
      explanation: {
        body:
          "Rosídeas/superrosídeas compõem um grande conjunto de eudicotiledôneas. A saída pode ser refinada por família quando houver fruto, estípulas, látex, número de estames, tipo de flor ou folhas compostas.",
        hint: "Observe estípulas, tipo de fruto, presença de látex e número de estames.",
      },
    },
    b: {
      text:
        "Não. Eudicotiledônea sem dados suficientes para encaixar em rosídeas ou asterídeas",
      result: "EUDICOTILEDONEAS_OUTRAS_OU_INDETERMINADAS",
      explanation: {
        body:
          "Algumas eudicotiledôneas pertencem a linhagens basais ou centrais fora dos exemplos mais comuns. Sem flores/frutos adequados, evite forçar um clado.",
        hint: "Registre como eudicotiledônea e indique quais estruturas faltaram.",
      },
    },
  },

  familias_monocotiledoneas: {
    title: "Famílias · monocotiledôneas",
    prompt:
      "O exemplar tem hábito graminoide, com folhas estreitas, bainha envolvendo o caule e inflorescências pouco vistosas?",
    a: {
      text:
        "Sim. Planta semelhante a capim, junco ou tiririca, com folhas estreitas e flores reduzidas",
      next: "familias_monocots_graminoides",
      explanation: {
        body:
          "Entre as monocotiledôneas, o hábito graminoide reúne famílias que podem ser confundidas em aula prática. A separação didática usa caule, bainha foliar e tipo de inflorescência.",
        hint: "Procure nós no caule, lígula na transição bainha-lâmina e espiguetas.",
      },
    },
    b: {
      text:
        "Não. A planta tem roseta, palmeira, epífita, espádice, flor vistosa ou outro hábito não graminoide",
      next: "familias_monocots_nao_graminoides",
      explanation: {
        body:
          "Monocotiledôneas não graminoides incluem palmeiras, bromélias, orquídeas, aráceas e várias ervas ornamentais. O hábito e a flor ajudam muito na triagem.",
        hint: "Observe se há espata, espádice, labelo, roseta com tanque ou tronco de palmeira.",
      },
    },
  },

  familias_monocots_graminoides: {
    title: "Famílias · monocotiledôneas graminoides",
    prompt:
      "O caule tem nós bem marcados, folhas com bainha e lígula, e as flores formam espiguetas típicas de gramíneas?",
    a: {
      text:
        "Sim. Colmo com nós, folhas alternas em duas fileiras e inflorescência formada por espiguetas",
      result: "FAMILIA_POACEAE",
      explanation: {
        body:
          "Poaceae reúne as gramíneas. Em aula prática, colmo com nós, folhas com bainha/lígula e espiguetas são caracteres fortes para reconhecer a família.",
        hint: "Capins, milho, arroz, trigo, bambus e cana-de-açúcar pertencem a Poaceae.",
      },
    },
    b: {
      text:
        "Não. O caule é frequentemente triangular ou maciço, e a planta lembra tiririca ou junco",
      next: "familia_cyperaceae",
      explanation: {
        body:
          "Quando faltam espiguetas típicas de gramíneas, vale testar caracteres de Cyperaceae, uma família comum em áreas úmidas e ambientes abertos.",
        hint: "Role o caule entre os dedos: em Cyperaceae ele costuma ser triangular.",
      },
    },
  },

  familia_cyperaceae: {
    title: "Famílias · Cyperaceae",
    prompt:
      "O caule é geralmente triangular e maciço, com folhas em três fileiras ou concentradas na base?",
    a: {
      text:
        "Sim. Caule triangular, aspecto de tiririca, folhas frequentemente tríplices ou basais",
      result: "FAMILIA_CYPERACEAE",
      explanation: {
        body:
          "Cyperaceae inclui tiriricas e ciperáceas. A chave usa o padrão triangular do caule e o hábito graminoide como triagem didática.",
        hint: "A regra não é absoluta, mas é útil para separar de Poaceae em material comum.",
      },
    },
    b: {
      text:
        "Não. Os caracteres não sustentam Poaceae nem Cyperaceae com segurança",
      result: "MONOCOTILEDONEA_GRAMINOIDE_INDETERMINADA",
      explanation: {
        body:
          "Algumas monocotiledôneas graminoides exigem flor, fruto ou chave regional. Registre como monocotiledônea graminoide indeterminada e indique os caracteres ausentes.",
        hint: "Fotografe a inflorescência e registre se há lígula, bainha e nós.",
      },
    },
  },

  familias_monocots_nao_graminoides: {
    title: "Famílias · monocotiledôneas não graminoides",
    prompt:
      "A planta tem caule lenhoso não ramificado, folhas grandes no ápice e aspecto de palmeira?",
    a: {
      text:
        "Sim. Porte de palmeira, folhas grandes pinadas ou palmadas e inflorescências protegidas por brácteas",
      result: "FAMILIA_ARECACEAE",
      explanation: {
        body:
          "Arecaceae inclui as palmeiras. O hábito com estipe, folhas grandes no ápice e inflorescências com espatas costuma ser muito reconhecível.",
        hint: "Coqueiro, açaí, jerivá e palmeiras ornamentais são exemplos úteis.",
      },
    },
    b: {
      text: "Não. Não apresenta porte típico de palmeira",
      next: "familias_monocots_epifitas_rosetas",
      explanation: {
        body:
          "Sem hábito de palmeira, outras famílias comuns podem ser separadas por flor, roseta foliar, espata/espádice ou hábito epífito.",
        hint: "Procure labelo, espádice, tanque foliar ou folhas suculentas em roseta.",
      },
    },
  },

  familias_monocots_epifitas_rosetas: {
    title: "Famílias · orquídeas, bromélias e aráceas",
    prompt:
      "A flor é bilateral, com uma peça modificada em labelo, ou a planta apresenta pseudobulbos/raízes aéreas típicas de orquídeas?",
    a: {
      text:
        "Sim. Flor com labelo ou hábito epífito com raízes aéreas e estruturas compatíveis com orquídeas",
      result: "FAMILIA_ORCHIDACEAE",
      explanation: {
        body:
          "Orchidaceae é reconhecida por flores altamente especializadas, frequentemente com labelo, coluna e simetria bilateral. Muitas espécies são epífitas.",
        hint: "Nem toda orquídea está florida; raízes aéreas e pseudobulbos ajudam, mas a flor confirma melhor.",
      },
    },
    b: {
      text: "Não. Não há labelo ou estrutura floral típica de orquídea",
      next: "familias_monocots_bromelias_araceas",
      explanation: {
        body:
          "Bromélias e aráceas são comuns em práticas e jardins. A separação usa roseta com tanque ou inflorescência em espádice com espata.",
        hint: "Observe se as folhas formam um reservatório de água ou se existe uma espiga carnosa.",
      },
    },
  },

  familias_monocots_bromelias_araceas: {
    title: "Famílias · bromélias e aráceas",
    prompt:
      "As folhas formam roseta, muitas vezes com tanque central, e podem ter escamas ou espinhos marginais?",
    a: {
      text:
        "Sim. Roseta foliar, tanque ou folhas rígidas frequentemente escamosas/espinhosas",
      result: "FAMILIA_BROMELIACEAE",
      explanation: {
        body:
          "Bromeliaceae reúne bromélias terrestres ou epífitas. A roseta foliar e o tanque central são caracteres muito úteis em aula prática.",
        hint: "Abacaxi, gravatás e muitas bromélias ornamentais pertencem à família.",
      },
    },
    b: {
      text:
        "Não. Procure inflorescência carnosa em espádice, geralmente acompanhada por espata",
      next: "familia_araceae",
      explanation: {
        body:
          "Se não há roseta bromelióide, a presença de espádice e espata pode indicar Araceae, outra família comum em ambientes sombreados e ornamentais.",
        hint: "Antúrio, copo-de-leite e comigo-ninguém-pode são exemplos didáticos.",
      },
    },
  },

  familia_araceae: {
    title: "Famílias · Araceae",
    prompt:
      "A inflorescência é um espádice carnoso, geralmente acompanhado por uma espata vistosa ou folhosa?",
    a: {
      text:
        "Sim. Espádice e espata evidentes, folhas frequentemente grandes ou cordiformes",
      result: "FAMILIA_ARACEAE",
      explanation: {
        body:
          "Araceae é marcada por inflorescência em espádice associada à espata. Em muitas espécies ornamentais, esse conjunto é fácil de observar.",
        hint: "Quando a planta estiver sem inflorescência, registre como possível Araceae e procure confirmação posterior.",
      },
    },
    b: {
      text:
        "Não. Monocotiledônea não graminoide sem caracteres suficientes para família",
      result: "MONOCOTILEDONEA_NAO_GRAMINOIDE_INDETERMINADA",
      explanation: {
        body:
          "Muitas famílias de monocotiledôneas exigem flores ou frutos. A saída indeterminada evita forçar família quando o material está incompleto.",
        hint: "Registre nervação paralela, hábito, presença de bulbo/rizoma e estruturas reprodutivas disponíveis.",
      },
    },
  },

  familias_magnoliideas: {
    title: "Famílias · magnoliídeas e linhagens basais",
    prompt:
      "As folhas são aromáticas ao amassar, geralmente coriáceas, e a planta lembra louro, canela ou abacateiro?",
    a: {
      text:
        "Sim. Folhas aromáticas, simples, coriáceas, frequentemente com glândulas ou cheiro marcante",
      result: "FAMILIA_LAURACEAE",
      explanation: {
        body:
          "Lauraceae inclui louros, canelas e abacateiro. O aroma das folhas e o hábito lenhoso são bons caracteres de triagem.",
        hint: "Use o aroma com cuidado e sem danificar excessivamente o material.",
      },
    },
    b: {
      text:
        "Não. Folhas ou inflorescências indicam outro grupo basal ou magnoliídeo",
      next: "familia_piperaceae_nymphaeaceae",
      explanation: {
        body:
          "Piperaceae e Nymphaeaceae são exemplos didáticos frequentes entre magnoliídeas/basais, mas exigem caracteres bem diferentes.",
        hint: "Compare plantas terrestres com espigas carnosas e plantas aquáticas com folhas flutuantes.",
      },
    },
  },

  familia_piperaceae_nymphaeaceae: {
    title: "Famílias · Piperaceae e Nymphaeaceae",
    prompt:
      "A planta é herbácea ou arbustiva, com nós evidentes e inflorescências em espigas carnosas, como pimentas ou peperômias?",
    a: {
      text:
        "Sim. Nós evidentes, folhas simples e inflorescências em espigas densas/carnosas",
      result: "FAMILIA_PIPERACEAE",
      explanation: {
        body:
          "Piperaceae inclui Piper e Peperomia. Inflorescências em espigas carnosas e nós bem marcados ajudam no reconhecimento.",
        hint: "Peperômias ornamentais e pimentas do gênero Piper são bons exemplos.",
      },
    },
    b: {
      text:
        "Não. Se for aquática com folhas flutuantes e flor grande, pode pertencer às ninfeáceas",
      result: "FAMILIA_NYMPHAEACEAE_OU_BASAL_INDETERMINADA",
      explanation: {
        body:
          "Nymphaeaceae inclui plantas aquáticas com folhas flutuantes e flores vistosas. Sem esse conjunto, mantenha como angiosperma basal/magnoliídea indeterminada.",
        hint: "Vitória-régia e ninfeias são exemplos reconhecíveis, mas nem sempre disponíveis em aula.",
      },
    },
  },

  familias_asterideas: {
    title: "Famílias · asterídeas",
    prompt:
      "As flores estão reunidas em capítulo, parecendo uma única flor composta, como em margaridas ou girassóis?",
    a: {
      text:
        "Sim. Capítulo com várias flores pequenas, geralmente sobre um receptáculo comum",
      result: "FAMILIA_ASTERACEAE",
      explanation: {
        body:
          "Asteraceae é reconhecida pelo capítulo, uma inflorescência que reúne muitas flores pequenas. Pode haver flores do disco e da margem.",
        hint: "Margarida, girassol, picão e serralha são exemplos úteis.",
      },
    },
    b: {
      text: "Não. Não apresenta capítulo típico de Asteraceae",
      next: "familias_asterideas_lamiaceae_rubiaceae",
      explanation: {
        body:
          "Sem capítulo, outras asterídeas comuns podem ser separadas por caule quadrangular, estípulas interpeciolares, látex ou tipo de fruto.",
        hint: "Observe disposição das folhas e presença de látex.",
      },
    },
  },

  familias_asterideas_lamiaceae_rubiaceae: {
    title: "Famílias · Lamiaceae e Rubiaceae",
    prompt:
      "O caule é quadrangular, as folhas são opostas e aromáticas, e as flores podem ser bilabiadas?",
    a: {
      text:
        "Sim. Caule quadrangular, folhas opostas aromáticas e flores frequentemente bilabiadas",
      result: "FAMILIA_LAMIACEAE",
      explanation: {
        body:
          "Lamiaceae inclui hortelã, manjericão, alecrim e muitas ervas aromáticas. Caule quadrangular e folhas opostas são caracteres didáticos fortes.",
        hint: "Aromas são úteis, mas confirme com caule, folhas e flor.",
      },
    },
    b: {
      text: "Não. Verificar estípulas interpeciolares, látex ou fruto",
      next: "familias_asterideas_rubiaceae_apocynaceae",
      explanation: {
        body:
          "Rubiaceae, Apocynaceae e Solanaceae são famílias comuns de asterídeas e podem ser separadas por estípulas, látex e padrão floral/frutífero.",
        hint: "Procure estruturas entre os pecíolos de folhas opostas.",
      },
    },
  },

  familias_asterideas_rubiaceae_apocynaceae: {
    title: "Famílias · Rubiaceae e Apocynaceae",
    prompt:
      "As folhas são opostas e há estípulas interpeciolares visíveis entre os pecíolos?",
    a: {
      text:
        "Sim. Folhas opostas com estípulas interpeciolares, muitas vezes em arbustos ou árvores",
      result: "FAMILIA_RUBIACEAE",
      explanation: {
        body:
          "Rubiaceae é reconhecida em aula por folhas opostas e estípulas interpeciolares. Café, ixora e jenipapo são exemplos.",
        hint: "As estípulas podem parecer pequenas lâminas ou dentes entre os pecíolos.",
      },
    },
    b: {
      text: "Não. Verificar látex e corola fundida",
      next: "familias_asterideas_apocynaceae_solanaceae",
      explanation: {
        body:
          "Sem estípulas interpeciolares, o látex e o tipo de flor/fruto ajudam a separar Apocynaceae e Solanaceae.",
        hint: "Quebre apenas pequena parte permitida do material para observar látex, quando a prática autorizar.",
      },
    },
  },

  familias_asterideas_apocynaceae_solanaceae: {
    title: "Famílias · Apocynaceae e Solanaceae",
    prompt:
      "A planta possui látex branco, folhas opostas ou verticiladas e flores com corola fundida frequentemente contorta?",
    a: {
      text:
        "Sim. Látex branco e flores vistosas com corola fundida, como alamanda, jasmim-manga ou vinca",
      result: "FAMILIA_APOCYNACEAE",
      explanation: {
        body:
          "Apocynaceae frequentemente apresenta látex branco, folhas opostas/verticiladas e flores simpétalas. É uma identificação provável quando esses caracteres aparecem juntos.",
        hint: "Cuidado: látex pode ser irritante; evite contato com olhos e boca.",
      },
    },
    b: {
      text:
        "Não. Flores geralmente pentâmeras com corola fundida, folhas alternas e frutos como baga ou cápsula",
      result: "FAMILIA_SOLANACEAE_OU_ASTERIDEA_INDETERMINADA",
      explanation: {
        body:
          "Solanaceae inclui tomate, pimentão, batata e muitas plantas com flores pentâmeras e frutos do tipo baga ou cápsula. Sem flor/fruto, mantenha como asterídea indeterminada.",
        hint: "Procure anteras formando cone e frutos carnosos ou cápsulas.",
      },
    },
  },

  familias_rosideas: {
    title: "Famílias · rosídeas e superrosídeas",
    prompt:
      "Há fruto do tipo legume/vagem, folhas compostas com estípulas ou flores papilionadas/mimosoides?",
    a: {
      text:
        "Sim. Vagem, folhas compostas estipuladas ou flores típicas de leguminosas",
      result: "FAMILIA_FABACEAE",
      explanation: {
        body:
          "Fabaceae é uma das famílias mais importantes em aulas práticas. Folhas compostas com estípulas, fruto tipo legume e flores papilionadas ou mimosoides são bons caracteres.",
        hint: "Feijão, ervilha, flamboyant, mimosa, ingá e pau-brasil são exemplos úteis.",
      },
    },
    b: {
      text: "Não. Não apresenta vagem ou conjunto típico de leguminosas",
      next: "familias_rosideas_malvaceae_myrtaceae",
      explanation: {
        body:
          "Sem caracteres de Fabaceae, a triagem segue para famílias comuns com muitos estames, óleos essenciais, látex ou frutos característicos.",
        hint: "Observe pelos, cheiro da folha, glândulas translúcidas, látex e tipo de fruto.",
      },
    },
  },

  familias_rosideas_malvaceae_myrtaceae: {
    title: "Famílias · Malvaceae e Myrtaceae",
    prompt:
      "A flor tem muitos estames unidos em tubo ao redor do pistilo, ou há pelos estrelados/mucilagem, como em hibiscos e quiabeiros?",
    a: {
      text:
        "Sim. Estames numerosos formando coluna, flores vistosas ou caracteres de malváceas",
      result: "FAMILIA_MALVACEAE",
      explanation: {
        body:
          "Malvaceae pode ser reconhecida por flores vistosas com coluna estaminal, além de pelos estrelados e mucilagem em muitos representantes.",
        hint: "Hibisco, algodão, quiabo e malvas são exemplos didáticos.",
      },
    },
    b: {
      text:
        "Não. Verificar folhas aromáticas com glândulas e muitos estames livres",
      next: "familias_rosideas_myrtaceae_euphorbiaceae",
      explanation: {
        body:
          "Myrtaceae e Euphorbiaceae são frequentes no Brasil, mas exigem observar folhas, látex, flores e frutos.",
        hint: "Coloque a folha contra a luz para procurar pontos glandulares translúcidos.",
      },
    },
  },

  familias_rosideas_myrtaceae_euphorbiaceae: {
    title: "Famílias · Myrtaceae e Euphorbiaceae",
    prompt:
      "As folhas são opostas, aromáticas, com pontuações translúcidas de óleo, e as flores/frutos lembram goiaba, pitanga ou eucalipto?",
    a: {
      text:
        "Sim. Folhas com óleos essenciais, muitos estames e frutos comuns em mirtáceas",
      result: "FAMILIA_MYRTACEAE",
      explanation: {
        body:
          "Myrtaceae é reconhecida por folhas com glândulas de óleo, aroma e flores com muitos estames. Goiabeira, pitangueira, jabuticabeira e eucalipto são exemplos.",
        hint: "Aroma e pontuações translúcidas nas folhas são bons sinais de apoio.",
      },
    },
    b: {
      text: "Não. Verificar látex, flores unissexuais e frutos capsulares",
      next: "familias_rosideas_euphorbiaceae_brassicaceae",
      explanation: {
        body:
          "Euphorbiaceae e Brassicaceae têm padrões muito diferentes. Látex e cápsulas favorecem Euphorbiaceae; flor cruciforme e síliqua favorecem Brassicaceae.",
        hint: "Mandioca e mamona ajudam a visualizar Euphorbiaceae; mostarda e couve ajudam em Brassicaceae.",
      },
    },
  },

  familias_rosideas_euphorbiaceae_brassicaceae: {
    title: "Famílias · Euphorbiaceae e Brassicaceae",
    prompt:
      "Há látex, flores pequenas unissexuais ou frutos secos tricocos/capsulares, como em mandioca ou mamona?",
    a: {
      text:
        "Sim. Látex ou flores unissexuais discretas e fruto capsular compatível com euforbiáceas",
      result: "FAMILIA_EUPHORBIACEAE",
      explanation: {
        body:
          "Euphorbiaceae é diversa. Em prática didática, látex, flores unissexuais e frutos capsulares ajudam, mas a confirmação pode exigir material fértil.",
        hint: "Cuidado com látex; algumas espécies são tóxicas ou irritantes.",
      },
    },
    b: {
      text:
        "Não. Flores com quatro pétalas em cruz e fruto tipo síliqua/silícula, ou outra rosídea não resolvida",
      result: "FAMILIA_BRASSICACEAE_OU_ROSIDEA_INDETERMINADA",
      explanation: {
        body:
          "Brassicaceae tem flores cruciformes e frutos do tipo síliqua ou silícula. Sem esses caracteres, registre rosídea/superrosídea indeterminada.",
        hint: "Couve, mostarda, rúcula e rabanete são exemplos comuns de Brassicaceae.",
      },
    },
  },
};
