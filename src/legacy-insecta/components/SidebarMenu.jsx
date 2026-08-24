import { useMemo, useState } from "react";

import { obterMarcaDisciplina } from "../assets/identidade/marcas.js";
import labsedLogo from "../assets/simbolo-lab-softwares-educacionais.svg";
import ThemeSwitcher from "./ThemeSwitcher.jsx";
import { gerarResumoAtlasHistologiaApp } from "../atividades/histologiaAtlasModelo.js";
import { manualGeradorChaves } from "../chaves/manualGeradorChaves.js";
import { arvoreTaxonomica, encontrarTaxon } from "../utils/taxonomia.js";

const SIDEBAR_ITEMS = [
  {
    id: "autor",
    title: "Sobre o app",
    tag: "A",
    content: `Sou professor de Biologia e desenvolvo este software no LABSED como um ambiente didático integrado para práticas de Biologia.

O projeto começou a partir da Chave de Identificação de Insetos, mas hoje é o Laboratório de Biologia: um ambiente para integrar diferentes frentes de Zoologia, Botânica e Histologia, incluindo identificação taxonômica, modo investigativo, construção de chaves dicotômicas, coleção didática, observação em microscópio estereoscópico, kits de lâminas, atlas, exsicatas virtuais, organização de turmas e acompanhamento de relatórios.

Mais do que substituir o roteiro de aula, a intenção é apoiar o trabalho de observação. O software organiza etapas, registros, imagens anotadas, etiquetas, relatórios e materiais de consulta para que estudantes e professor possam concentrar atenção no que importa: observar estruturas, justificar escolhas, comparar evidências e construir raciocínio biológico.

O aplicativo segue em desenvolvimento contínuo. Cada atividade adicionada ajuda a transformar a ferramenta em um espaço de prática, documentação e revisão, adaptável às necessidades da turma e aos materiais disponíveis no laboratório.`,
  },
  {
    id: "morfologia",
    title: "Morfologia de Insecta",
    tag: "M",
    content: `Estruturas principais dos insetos:

• Cabeça: olhos compostos, ocelos, antenas e aparelho bucal
• Tórax: três segmentos, com três pares de patas e, quando presentes, asas
• Abdômen: região segmentada com funções reprodutivas e digestivas

Observe sempre o conjunto de caracteres, evitando decisões baseadas em apenas uma característica.`,
  },
  {
    id: "manual-uso",
    title: "Uso da chave de insetos",
    tag: "U",
    content: `Uso da chave dicotômica

A chave dicotômica conduz a identificação por perguntas sucessivas. Em cada pergunta, observe o exemplar e escolha a alternativa que melhor corresponde ao caráter visível.

Passos principais:
• Confira a turma ativa quando a atividade envolver relatórios de alunos
• Escolha Prática ou Prova na tela inicial
• Em Prova, carregue o QR Code fornecido pelo professor
• Em Prática, clique em Nova atividade
• Leia a pergunta atual com atenção
• Compare as alternativas com o exemplar
• Use as figuras de apoio quando existirem
• Siga até chegar ao resultado
• Use Ver sessão para revisar o caminho percorrido
• Consulte Relatórios armazenados para recuperar rascunhos e sessões concluídas

Cuidados:
• Não escolha pela aparência geral do inseto
• Confirme estruturas pequenas com lupa, quando possível
• Se uma estrutura estiver danificada, use outros caracteres disponíveis
• O caminho de identificação é parte importante da aprendizagem

Uso do modo investigativo

No modo investigativo, você não segue uma sequência fixa. Primeiro seleciona características observadas no exemplar; depois o sistema apresenta hipóteses de identificação.

Passos principais:
• Observe patas, asas, antenas, aparelho bucal e forma do corpo
• Marque as características visíveis
• Acompanhe a hipótese mais forte
• Leia a próxima observação sugerida
• Compare compatibilidades e conflitos
• Abra a chave relacionada, se a opção aparecer
• Confirme o resultado apenas quando o conjunto de evidências estiver coerente

Como interpretar:
• Compatibilidades reforçam a hipótese
• Conflitos indicam que a observação precisa ser revisada
• Uma hipótese forte não é resposta automática
• A identificação melhora quando vários caracteres concordam

Sugestão de aula:
Comece pelo modo investigativo para levantar hipóteses. Depois use a chave dicotômica para testar formalmente o caminho de identificação. Ao final, compare a hipótese inicial com o resultado da chave.`,
  },
  {
    id: "manual-gerador",
    title: "Gerador de chaves",
    tag: "G",
    content: manualGeradorChaves,
  },
  {
    id: "arvore-taxonomica",
    title: "Árvore de Insecta",
    tag: "T",
    content: `Esta visão resume a abrangência taxonômica do aplicativo. A chave principal contempla 16 ordens de Insecta; dessas, 14 possuem chaves internas para detalhamento. No conjunto, há 185 resultados terminais cadastrados nas chaves internas, sendo 182 famílias ou subfamílias e 3 categorias didáticas ou supra/fenotípicas usadas para orientar a identificação.

Ordens abordadas na chave principal:
Diptera, Thysanoptera, Hemiptera, Orthoptera, Phasmatodea, Blattodea, Mantodea, Dermaptera, Coleoptera, Lepidoptera, Trichoptera, Isoptera, Odonata, Plecoptera, Neuroptera e Hymenoptera.

Sequência de nós da chave principal:
INSECTA
|-- p1. Aparelho bucal
|   |-- p2. Segundo par de asas reduzido a balancins?
|   |   |-- DIPTERA
|   |   \`-- p3. Asas anteriores estreitas e franjadas?
|   |       |-- THYSANOPTERA
|   |       \`-- HEMIPTERA
|   \`-- p4. Pernas posteriores saltatórias?
|       |-- ORTHOPTERA
|       \`-- p4b. Corpo de graveto ou folha?
|           |-- PHASMATODEA
|           \`-- p5. Asas anteriores em tegminas?
|               |-- p6. Pernas anteriores raptatórias?
|               |   |-- BLATTODEA
|               |   \`-- MANTODEA
|               \`-- p7. Asas anteriores como élitros?
|                   |-- p8. Cercos terminais presentes?
|                   |   |-- DERMAPTERA
|                   |   \`-- COLEOPTERA
|                   \`-- p9. Asas com escamas?
|                       |-- LEPIDOPTERA
|                       \`-- p9b. Asas pilosas em telhado?
|                           |-- TRICHOPTERA
|                           \`-- p10. Antenas moniliformes?
|                               |-- ISOPTERA
|                               \`-- p11. Antenas muito curtas?
|                                   |-- ODONATA
|                                   \`-- p11b. Dois cercos longos?
|                                       |-- PLECOPTERA
|                                       \`-- p12. Asas com muitas nervuras cruzadas?
|                                           |-- NEUROPTERA
|                                           \`-- HYMENOPTERA

Cobertura taxonômica por ordem:
BLATTODEA
• Termitoidae
• Blattidae
• Blaberidae
• Ectobiidae
• Corydiidae
• Cryptocercidae
• Anaplectidae

COLEOPTERA
• Curculionidae
• Brentidae
• Passalidae
• Scarabaeidae
• Staphylinidae
• Dasytidae
• Bruchidae
• Erotylidae
• Cerambycidae
• Chrysomelidae
• Hydrophilidae
• Coccinellidae
• Meloidae
• Alleculidae
• Lagriidae
• Tenebrionidae
• Bostrychidae
• Elateridae
• Buprestidae
• Silphidae
• Melyridae
• Cantharidae
• Lampyridae
• Lycidae
• Carabidae
• Cicindelidae

DERMAPTERA
• Forficulidae
• Chelisochidae
• Anisolabididae
• Spongiphoridae
• Labiduridae

DIPTERA
• Tabanidae
• Stratiomyidae
• Dolichopodidae
• Syrphidae
• Asilidae
• Muscidae
• Tachinidae
• Calliphoridae
• Sarcophagidae
• Tephritidae
• Otitidae
• Lonchaeidae
• Agromyzidae
• Drosophilidae
• Phoridae
• Chloropidae
• Tipulidae
• Psychodidae
• Cecidomyiidae
• Culicidae
• Chironomidae
• Simuliidae
• Bibionidae
• Sciaridae
• Mycetophilidae

HEMIPTERA
• Cicadidae
• Membracidae
• Aethalionidae
• Cicadellidae
• Cercopidae
• Delphacidae
• Flatidae
• Fulgoridae
• Dictyopharidae
• Psyllidae
• Aleyrodidae
• Aphididae
• Coccidae
• Heteroptera: Scutelleridae, Tingidae, Pentatomidae, Cydnidae, Reduviidae, Nabidae, Miridae, Pyrrhocoridae, Largidae, Lygaeidae, Rhopalidae, Coreidae, Alydidae, Gerridae, Veliidae, Nepidae, Gelastocoridae, Notonectidae, Belostomatidae e Naucoridae

HYMENOPTERA
• Formicidae
• Mutillidae
• Scoliidae
• Apidae
• Pompilidae
• Vespidae
• Megachilidae
• Halictidae
• Colletidae
• Andrenidae
• Oxaeidae
• Evaniidae
• Chalcididae
• Braconidae
• Ichneumonidae
• Siricidae
• Pergidae
• Tenthredinidae
• Sphecidae
• Crabronidae
• Eulophidae

ISOPTERA
• Kalotermitidae
• Serritermitidae
• Termitidae
• Rhinotermitidae

LEPIDOPTERA
• Hesperiidae
• Papilionidae
• Pieridae
• Lycaenidae
• Riodinidae
• Nymphalidae: Satyrinae, Charaxinae, Danainae, Nymphalinae, Brassolinae, Morphinae, Heliconiinae e Acraeinae
• Pyralidae
• Sphingidae
• Saturniidae
• Geometridae
• Noctuidae

MANTODEA
• Mantidae
• Liturgusidae
• Tarachodidae
• Acanthopidae
• Thespidae
• Mantoididae
• Hymenopodidae
• Empusidae
• Photinaidae

NEUROPTERA
• Ascalaphidae
• Myrmeleontidae
• Mantispidae
• Coniopterygidae
• Chrysopidae
• Hemerobiidae

ODONATA
• Libellulidae
• Gomphidae
• Aeshnidae
• Coenagrionidae
• Calopterygidae

ORTHOPTERA
• Tetrigidae
• Proscopiidae
• Ommexechidae
• Pyrgomorphidae
• Acrididae
• Romaleidae
• Gryllotalpidae
• Gryllidae
• Tettigoniidae: Listroscelinae, Phaneropterinae, Pterochrozinae, Pseudophyllinae, Copiphorinae e Conocephalinae
• Anostostomatidae
• Stenopelmatidae

PHASMATODEA
• Phylliidae
• Pseudophasmatidae
• Formas ápteras/braquípteras
• Formas aladas

THYSANOPTERA
• Phlaeothripidae
• Aeolothripidae
• Heterothripidae
• Thripidae

Trichoptera e Plecoptera aparecem como resultados na chave principal, mas ainda não possuem chave própria de famílias no aplicativo.`,
  },
  {
    id: "qrcode",
    title: "QR da prova de insetos",
    tag: "Q",
    content: `Use este formato para formar o QR da prova:

PROVA|número de insetos|tempo por inseto|gabarito

Para novos códigos, use sempre PROVA no primeiro campo. O formato antigo LABSED|v1| continua aceito apenas para compatibilidade. Nesse formato antigo, LABSED é uma identificação técnica do código e não deve ser confundido com a identidade atual do Laboratório de Biologia.

Exemplo com tempo:
PROVA|3|5|DIPTERA,MUSCIDAE;COLEOPTERA,SCARABAEIDAE;ORTHOPTERA,ACRIDIDAE

Exemplo com tempo livre:
PROVA|3|0|DIPTERA,MUSCIDAE;COLEOPTERA,SCARABAEIDAE;ORTHOPTERA,ACRIDIDAE

Regras:
• Separe os campos principais com |
• O segundo campo é a quantidade de insetos
• O terceiro campo é o tempo em minutos por inseto; use 0 para tempo livre
• Separe cada inseto do gabarito com ;
• Em cada item, escreva ORDEM,FAMÍLIA
• Se não houver família, use apenas a ordem ou deixe depois da vírgula vazio
• A quantidade deve ser exatamente igual ao número de itens do gabarito
• Use números inteiros: quantidade maior que zero e tempo igual ou maior que zero
• Não coloque ponto e vírgula depois do último item

Como carregar no aplicativo:
1. Na tela inicial, escolha o modo Prova.
2. O leitor de QR será aberto.
3. Aponte a câmera para o código ou clique em Escolher imagem do QR.
4. Confira a mensagem de gabarito carregado antes de iniciar.
5. Para substituir o código, use Trocar QR Code.

Onde gerar o QR:
• qrcode-monkey.com: escolha Text, cole o código e baixe o PNG
• the-qrcode-generator.com: escolha Text e cole o código da prova
• adobe.com/express/feature/image/qr-code-generator: opção simples para criar e baixar
• canva.com/qr-code-generator: útil se quiser colocar o QR em uma arte

Depois de gerar, teste o QR no aplicativo antes de imprimir ou enviar aos alunos.

Atenção: o QR Code não mantém o gabarito em segredo. Qualquer leitor comum pode mostrar o texto armazenado. Em avaliações, carregue o código sob supervisão e evite enviá-lo antecipadamente aos alunos.`,
  },
  {
    id: "referencias",
    title: "Referências",
    tag: "R",
    content: `Referências gerais

BUZZI, Z. J. Entomologia didática. Curitiba: Editora UFPR, 2002.

HICKMAN JUNIOR, C. P. et al. Princípios integrados de zoologia. Rio de Janeiro: Guanabara Koogan, 2004.

RAFAEL, J. A. et al. Insetos do Brasil: diversidade e taxonomia. Ribeirão Preto: Holos, 2012.

TRIPLEHORN, C. A.; JOHNSON, N. F. Borror and DeLong's introduction to the study of insects. 7. ed. Belmont: Thomson Brooks/Cole, 2005.

ZUCCHI, R. A. Chave para algumas ordens de Insecta (adultos). ESALQ/USP, [s.d.]. Material didático.

UNIVERSIDADE FEDERAL DE LAVRAS. Departamento de Entomologia. Chaves para algumas ordens e famílias de Insecta. Disciplina Entomologia Geral - ENT107. Coordenação: Brígida de Souza. Lavras, MG: UFLA, 2007. Adaptada das chaves de R. A. Zucchi (ESALQ/USP).

Mantodea

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Mantodea, Acanthopidae, Photinaidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 13 jun. 2026.

MANTODEA SPECIES FILE. Mantodea Species File Online. Disponível em: https://mantodea.speciesfile.org. Acesso em: 13 jun. 2026.

Blattodea

BECCALONI, G. W.; EGGLETON, P. Order Blattodea. In: ZHANG, Z.-Q. (ed.). Animal biodiversity: an outline of higher-level classification and survey of taxonomic richness. Zootaxa, v. 3703, n. 1, p. 46-48, 2013.

DJERNAES, M.; KLASS, K.-D.; PICKER, M. D.; DAMGAARD, J. Phylogeny of cockroaches (Insecta, Dictyoptera, Blattodea), with placement of aberrant taxa and exploration of out-group sampling. Systematic Entomology, v. 37, n. 1, p. 65-83, 2012.

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Blattodea, Anaplectidae, Ectobiidae, Lamproblattidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 17 jun. 2026.

Orthoptera

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Orthoptera, Pyrgomorphidae, Eumastacidae, Anostostomatidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 13 jun. 2026.

ORTHOPTERA SPECIES FILE. Orthoptera Species File Online. Disponível em: https://orthoptera.speciesfile.org. Acesso em: 13 jun. 2026.

Orthoptera - Tettigoniidae

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Tettigoniidae, Pterochrozinae e grupos relacionados. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 17 jun. 2026.

BAKER, A. E. et al. Wing resonances in a new dead-leaf-mimic katydid (Tettigoniidae: Pterochrozinae) from the Andean cloud forests. Zoologischer Anzeiger, 2017.

CASTNER, J. L.; NICKLE, D. A. Intraspecific color polymorphism in leaf-mimicking katydids (Orthoptera: Tettigoniidae: Pseudophyllinae: Pterochrozini). Journal of Orthoptera Research, 2004.

Hymenoptera

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Hymenoptera, Apidae, Crabronidae, Eulophidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 14 jun. 2026.

Hemiptera

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Hemiptera, Coccidae, Diaspididae, Nabidae, Rhyparochromidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 14 jun. 2026.

Diptera

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Diptera, Cecidomyiidae, Phoridae, Ceratopogonidae, Bombyliidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 14 jun. 2026.

Coleoptera

WESTIN, L. M.; GAZAL, V.; BERBER, G. C. M. Chave dicotômica ilustrada de identificação das principais famílias de insetos da Ordem Coleoptera. Scientific Electronic Archives, v. 18, n. 1, 2025. DOI: 10.36560/18120252022.

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Coleoptera, Dasytidae, Melyridae, Lagriidae, Tenebrionidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 14 jun. 2026.

Lepidoptera

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Lepidoptera, Riodinidae, Crambidae, Erebidae, Nolidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 14 jun. 2026.

Trichoptera

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Trichoptera. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 17 jun. 2026.

MORSE, J. C. Trichoptera World Checklist. Disponível em: https://entweb.sites.clemson.edu/database/trichopt/. Acesso em: 17 jun. 2026.

WIGGINS, G. B. Caddisflies: The Underwater Architects. Toronto: University of Toronto Press, 2004.

Plecoptera

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Plecoptera. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 18 jun. 2026.

DEWALT, R. E.; HOPKINS, H.; NEU-BECKER, U.; STUEBER, G. Plecoptera Species File Online. Disponível em: http://plecoptera.speciesfile.org. Acesso em: 18 jun. 2026.

ZWICK, P. Phylogenetic system and zoogeography of the Plecoptera. Annual Review of Entomology, v. 45, p. 709-746, 2000.

Odonata

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Odonata, Gomphidae, Lestidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 14 jun. 2026.

Neuroptera

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Neuroptera, Coniopterygidae, Sisyridae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 14 jun. 2026.

ENGEL, M. S.; GRIMALDI, D. A. The neuropterid fauna of Dominican and Mexican amber (Neuropterida, Megaloptera, Neuroptera). American Museum Novitates, n. 3587, p. 1-58, 2007.

Dermaptera

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Dermaptera, Anisolabididae, Pygidicranidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 17 jun. 2026.

HAAS, F. Dermaptera. In: BEUTEL, R. G.; KRISTENSEN, N. P. Handbook of Zoology. Arthropoda: Insecta. Berlin: De Gruyter, 2003.

Hemiptera - Heteroptera

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Hemiptera, Nabidae, Anthocoridae, Aradidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 17 jun. 2026.

BRAMAN, S. K. Damsel bugs (Nabidae). In: SCHAEFER, C. W.; PANIZZI, A. R. (ed.). Heteroptera of Economic Importance. Boca Raton: CRC Press, 2000. p. 639-656.

Isoptera/termitas

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Isoptera/Blattodea, Serritermitidae, Rhinotermitidae, Termitidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 17 jun. 2026.

KRISHNA, K.; GRIMALDI, D. A.; KRISHNA, V.; ENGEL, M. S. Treatise on the Isoptera of the world. Bulletin of the American Museum of Natural History, n. 377, p. 1-2704, 2013.

CANCELLO, E. M.; DE SOUZA, O. A new species of Glossotermes (Isoptera): reappraisal of the generic status with transfer from the Rhinotermitidae to the Serritermitidae. Sociobiology, v. 44, n. 3, 2004.

Thysanoptera

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Thysanoptera, Heterothripidae, Thripidae, Aeolothripidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 17 jun. 2026.

MOUND, L. A.; MARULLO, R. The thrips of Central and South America: an introduction. Memoirs on Entomology, International, v. 6, p. 1-488, 1996.

MOUND, L. A. Thysanoptera: diversity and interactions. Annual Review of Entomology, v. 50, p. 247-269, 2005.

Phasmatodea

BROCK, P. D.; BÜSCHER, T. H.; BAKER, E. Phasmida Species File Online. Disponível em: https://phasmida.speciesfile.org. Acesso em: 17 jun. 2026.

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Phasmatodea, Phylliidae, Pseudophasmatidae e famílias relacionadas. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 17 jun. 2026.

BRADLEY, J. C.; GALIL, B. S. The taxonomic arrangement of the Phasmatodea with keys to the subfamilies and tribes. Proceedings of the Entomological Society of Washington, v. 79, n. 2, p. 176-208, 1977.

Lepidoptera - Nymphalidae

GBIF SECRETARIAT. GBIF Backbone Taxonomy: Nymphalidae, Charaxinae, Biblidinae e grupos relacionados. Copenhagen: GBIF, 2026. Disponível em: https://www.gbif.org. Acesso em: 17 jun. 2026.

WAHLBERG, N.; WEINGARTNER, E.; NYLIN, S. Towards a better understanding of the higher systematics of Nymphalidae (Lepidoptera: Papilionoidea). Molecular Phylogenetics and Evolution, v. 28, n. 3, p. 473-484, 2003.

DEVRIES, P. J. Nymphalidae. In: LEVIN, S. A. Encyclopedia of Biodiversity. Amsterdam: Academic Press, 2001.`,
  },
];

const REFERENCIAS_BOTANICA_II = {
  id: "referencias-botanica-ii",
  title: "Referências Botânica",
  tag: "B",
  content: `Referências usadas para a chave de Botânica II

OPENSTAX. Biology 2e. Houston: OpenStax/Rice University, 2018. Capítulo 25: Seedless Plants. Seções consultadas: Introduction, Bryophytes e Seedless Vascular Plants. Disponível em: https://openstax.org/books/biology-2e/pages/25-introduction. Acesso em: 6 jul. 2026.

OPENSTAX. Biology 2e. Houston: OpenStax/Rice University, 2018. Capítulo 26: Seed Plants. Seções consultadas: Gymnosperms e Angiosperms. Disponível em: https://openstax.org/books/biology-2e/pages/26-2-gymnosperms e https://openstax.org/books/biology-2e/pages/26-3-angiosperms. Acesso em: 6 jul. 2026.

THE ANGIOSPERM PHYLOGENY GROUP. An update of the Angiosperm Phylogeny Group classification for the orders and families of flowering plants: APG IV. Botanical Journal of the Linnean Society, v. 181, n. 1, p. 1-20, 2016. DOI: 10.1111/boj.12385. Disponível em: https://doi.org/10.1111/boj.12385. Acesso em: 6 jul. 2026.

ROYAL BOTANIC GARDENS, KEW. Plants of the World Online. Disponível em: https://powo.science.kew.org/. Acesso em: 6 jul. 2026.

Famílias incluídas nesta primeira ampliação

Monocotiledôneas: Poaceae, Cyperaceae, Arecaceae, Orchidaceae, Bromeliaceae e Araceae.

Magnoliídeas e linhagens basais: Lauraceae, Piperaceae e Nymphaeaceae como saída didática/basal quando o material permitir.

Asterídeas: Asteraceae, Lamiaceae, Rubiaceae, Apocynaceae e Solanaceae como saída provável ou indeterminada quando faltar flor/fruto.

Rosídeas e superrosídeas: Fabaceae, Malvaceae, Myrtaceae, Euphorbiaceae e Brassicaceae como saída provável ou indeterminada quando faltar material fértil.

Observação didática

A chave foi construída para fins de aula prática, priorizando caracteres observáveis em laboratório ou em material de campo: presença de tecidos vasculares, sementes, flores/frutos, cones, frondes, soros, nervação foliar e padrões gerais de flores. Como as práticas contam com microscópios estereoscópicos e microscópios ópticos, esses equipamentos são tratados como apoio para examinar estruturas pequenas e confirmar observações. Quando a separação taxonômica depende de caracteres moleculares, microscópicos especializados ou de material reprodutivo ausente, a chave usa saídas amplas ou indeterminadas para evitar identificação forçada.`,
};

const ARVORE_BOTANICA_II = [
  {
    id: "briofitas",
    nome: "Briófitas",
    filhos: [
      "Bryophyta (musgos)",
      "Marchantiophyta (hepáticas)",
      "Anthocerotophyta (antóceros)",
    ],
  },
  {
    id: "vasculares-sem-sementes",
    nome: "Vasculares sem sementes",
    filhos: [
      "Lycophyta (licófitas)",
      "Polypodiopsida (samambaias)",
      "Equisetopsida (cavalinhas)",
    ],
  },
  {
    id: "gimnospermas",
    nome: "Gimnospermas",
    filhos: [
      "Pinophyta (coníferas)",
      "Cycadophyta (cicas)",
      "Ginkgo/Gnetophyta",
    ],
  },
  {
    id: "monocotiledoneas",
    nome: "Angiospermas · monocotiledôneas",
    filhos: [
      "Poaceae (gramíneas)",
      "Cyperaceae (tiriricas e ciperáceas)",
      "Arecaceae (palmeiras)",
      "Orchidaceae (orquídeas)",
      "Bromeliaceae (bromélias)",
      "Araceae (aráceas)",
      "Monocotiledôneas indeterminadas",
    ],
  },
  {
    id: "magnoliideas-basais",
    nome: "Angiospermas · magnoliídeas/basais",
    filhos: [
      "Lauraceae",
      "Piperaceae",
      "Nymphaeaceae ou basal indeterminada",
    ],
  },
  {
    id: "asterideas",
    nome: "Eudicotiledôneas · asterídeas",
    filhos: [
      "Asteraceae",
      "Lamiaceae",
      "Rubiaceae",
      "Apocynaceae",
      "Solanaceae ou asterídea indeterminada",
    ],
  },
  {
    id: "rosideas",
    nome: "Eudicotiledôneas · rosídeas/superrosídeas",
    filhos: [
      "Fabaceae",
      "Malvaceae",
      "Myrtaceae",
      "Euphorbiaceae",
      "Brassicaceae ou rosídea indeterminada",
    ],
  },
];

const ARVORE_BOTANICA_ITEM = {
  id: "arvore-botanica",
  title: "Árvore Plantae",
  tag: "T",
  content: "Árvore didática da chave de Botânica II",
};

const RECURSOS_OBSERVACAO_BOTANICA = {
  id: "recursos-observacao-botanica",
  title: "Recursos de observação",
  tag: "M",
  content: `Recursos disponíveis nas práticas

As atividades práticas de Botânica II consideram que o laboratório possui microscópios estereoscópicos e microscópios ópticos.

Microscópio estereoscópico
• observar estruturas externas com aumento baixo a médio;
• examinar flores pequenas, frutos, sementes, soros, escamas, tricomas, estípulas, lígulas, espiguetas e detalhes de inflorescências;
• comparar superfícies, margens foliares, nervuras, inserção de folhas e organização geral do material.

Microscópio óptico
• observar detalhes mais finos quando a prática permitir preparo simples;
• examinar fragmentos, epiderme, tricomas, estômatos, esporos, grãos de pólen ou cortes simples;
• usar como apoio, não como requisito obrigatório para todos os passos da chave.

Orientação didática

A chave continua priorizando caracteres visíveis no exemplar inteiro ou com auxílio do estereoscópio. O microscópio óptico entra como recurso de confirmação, comparação e reflexão quando a estrutura não puder ser reconhecida com segurança apenas pela observação macroscópica.`,
};

function textoDaSecao(secao) {
  if (!secao) return "";

  const partes = [];
  if (secao.texto) partes.push(secao.texto);
  if (Array.isArray(secao.itens) && secao.itens.length) {
    partes.push(secao.itens.map((item) => `• ${item}`).join("\n"));
  }
  return partes.filter(Boolean).join("\n\n");
}

function encontrarSecao(roteiro, termos) {
  const secoes = Array.isArray(roteiro?.secoes) ? roteiro.secoes : [];
  return secoes.find((secao) =>
    termos.some((termo) => secao.titulo.toLocaleLowerCase("pt-BR").includes(termo))
  );
}

function criarItensRoteiro(roteiro) {
  if (!roteiro) return [];

  const ehHistologia = roteiro.disciplina === "Histologia";
  const apresentacao = encontrarSecao(roteiro, ["apresentação"]);
  const objetivos = encontrarSecao(roteiro, ["objetivos"]);
  const materiais = encontrarSecao(roteiro, ["materiais"]);
  const seguranca = encontrarSecao(roteiro, ["segurança", "cuidado"]);
  const fundamentosLegais = encontrarSecao(roteiro, ["fundamentos legais"]);
  const procedimento = encontrarSecao(roteiro, ["procedimento"]);
  const relatorios = encontrarSecao(roteiro, ["relatórios"]);
  const discussao = encontrarSecao(roteiro, ["discussão"]);
  const avaliacao = encontrarSecao(roteiro, ["avaliação"]);
  const referencias =
    encontrarSecao(roteiro, ["referências oficiais"]) ||
    encontrarSecao(roteiro, ["referências"]);
  const itens = [
    {
      id: "roteiro-pratica",
      title: "Roteiro",
      tag: "R",
      content: [
        roteiro.titulo,
        roteiro.resumo,
        textoDaSecao(apresentacao),
        textoDaSecao(objetivos),
      ].filter(Boolean).join("\n\n"),
    },
    ehHistologia && {
      id: "atlas-app-histologia",
      title: "Atlas do app",
      tag: "A",
      content: gerarResumoAtlasHistologiaApp(),
    },
    materiais && {
      id: "materiais-pratica",
      title: "Materiais",
      tag: "M",
      content: textoDaSecao(materiais),
    },
    seguranca && {
      id: "cuidados-pratica",
      title: "Cuidados",
      tag: "C",
      content: textoDaSecao(seguranca),
    },
    fundamentosLegais && {
      id: "fundamentos-legais-pratica",
      title: "Base Legal",
      tag: "L",
      content: textoDaSecao(fundamentosLegais),
    },
    procedimento && {
      id: "procedimento-pratica",
      title: "Procedimento",
      tag: "P",
      content: textoDaSecao(procedimento),
    },
    relatorios && {
      id: "relatorio-pratica",
      title: "Relatório",
      tag: "L",
      content: textoDaSecao(relatorios),
    },
    discussao && {
      id: "discussao-pratica",
      title: "Discussão",
      tag: "D",
      content: textoDaSecao(discussao),
    },
    avaliacao && {
      id: "avaliacao-pratica",
      title: "Avaliação",
      tag: "A",
      content: textoDaSecao(avaliacao),
    },
    referencias && {
      id: "referencias-pratica",
      title: "Referências",
      tag: "B",
      content: textoDaSecao(referencias),
    },
  ];

  return itens.filter(Boolean);
}

function listaSidebar(itens = []) {
  return (itens || [])
    .filter(Boolean)
    .map((item) => `• ${item}`)
    .join("\n");
}

function criarItensColecao(colecao = {}) {
  const atividade = colecao.atividade || {};
  const medidas = atividade.medidasEtiqueta || {};
  const gruposObrigatorios = atividade.gruposObrigatorios || [];
  const gruposNaoAceitos = atividade.gruposNaoAceitos || [];
  const criterios = atividade.criteriosAvaliacao || [];

  return [
    {
      id: "fluxo-colecao",
      title: "Fluxo da Atividade",
      tag: "F",
      content: [
        atividade.titulo || "Atividade de coleção",
        atividade.descricao,
        "1. Configure as regras, grupos aceitos e medidas das etiquetas.",
        "2. Oriente a turma pelo manual e pelo checklist de entrega.",
        "3. Gere ou importe etiquetas padronizadas para impressão.",
      ].filter(Boolean).join("\n\n"),
    },
    {
      id: "regras-colecao",
      title: "Regras",
      tag: "R",
      content: [
        `Entrega: ${atividade.dataEntrega || "a definir"}`,
        `Forma: ${atividade.formaEntrega || "não definida"}`,
        `Mínimo: ${atividade.numeroMinimo || 0} exemplares`,
        `Máximo: ${atividade.numeroMaximo || "sem máximo definido"}`,
        `Identificação: ${atividade.nivelIdentificacao || "a definir"}`,
        atividade.aceitaMaterialAlcool
          ? "Material em álcool aceito sob orientação."
          : "Material em álcool não aceito, salvo nova orientação.",
        atividade.aceitaInsetosEncontradosMortos
          ? "Insetos encontrados mortos podem ser usados se estiverem bem preservados."
          : "Insetos encontrados mortos não serão aceitos.",
      ].join("\n"),
    },
    {
      id: "grupos-colecao",
      title: "Grupos",
      tag: "G",
      content: [
        "Grupos obrigatórios",
        gruposObrigatorios.length ? listaSidebar(gruposObrigatorios) : "• Nenhum grupo obrigatório definido",
        "",
        "Grupos não aceitos",
        gruposNaoAceitos.length ? listaSidebar(gruposNaoAceitos) : "• Nenhuma restrição definida",
      ].join("\n"),
    },
    {
      id: "checklist-colecao",
      title: "Checklist",
      tag: "C",
      content: listaSidebar(colecao.checklist || []),
    },
    {
      id: "etiquetas-colecao",
      title: "Etiquetas",
      tag: "E",
      content: [
        "Etiqueta de coleta",
        listaSidebar(atividade.etiquetaColeta || []),
        "",
        "Etiqueta de identificação",
        listaSidebar(atividade.etiquetaIdentificacao || []),
        "",
        `Medidas: ${medidas.larguraMm || "?"} x ${medidas.alturaMm || "?"} mm, fonte ${medidas.fontePt || "?"} pt, alinhamento ${medidas.alinhamento === "left" ? "à esquerda" : "centralizado"}.`,
      ].join("\n"),
    },
    {
      id: "avaliacao-colecao",
      title: "Avaliação",
      tag: "A",
      content: criterios.length
        ? criterios
            .map((item) =>
              `• ${item.criterio}${item.descricao ? `: ${item.descricao}` : ""}`
            )
            .join("\n")
        : "• Nenhum critério de avaliação definido.",
    },
  ];
}

function gerarMensagem(tela, contexto = {}, roteiro = null) {
  const observacoes = contexto?.observacoes || [];
  const hipoteses = contexto?.hipoteses || [];

  if (contexto?.colecao?.atividade) {
    const aba = contexto.colecao.aba;
    const secao = contexto.colecao.secaoConfig;
    if (aba === "configurar") {
      return `Apoio da coleção: você está em Configurar/${secao}. Use a barra para conferir regras, grupos, etiquetas e critérios sem alternar abas.`;
    }
    if (aba === "manual") {
      return "Apoio da coleção: mantenha checklist, etiquetas e critérios à mão enquanto revisa o manual da turma.";
    }
    if (aba === "etiquetas") {
      return "Apoio da coleção: confira o padrão das etiquetas e os dados exigidos enquanto gera ou importa pares para impressão.";
    }
  }

  if (roteiro?.atividade) {
    return `Apoio lateral da prática: ${roteiro.atividade}. Consulte materiais, cuidados, procedimento e critérios sem voltar ao topo da tela.`;
  }

  if (tela === "pesquisador") {
    if (contexto?.etapa === "artropodes") {
      return "Apoio da chave de insetos: comece pelo enquadramento em Artrópodes. Observe antenas e distribuição das pernas; somente Insecta seguirá para a investigação das ordens.";
    }

    if (contexto?.etapa === "resultado_artropode") {
      return "Apoio da chave de insetos: a triagem chegou a um grupo não inseto. Revise as características registradas; a investigação de ordens é exclusiva de Insecta.";
    }

    if (observacoes.length === 0) {
      return "Apoio da chave de insetos: o exemplar foi enquadrado em Insecta. Agora observe asas, antenas, aparelho bucal, pernas e corpo para comparar as ordens.";
    }

    const patas = observacoes.find((o) => o.estrutura === "patas");
    const asas = observacoes.find((o) => o.estrutura === "asas");
    const antena = observacoes.find((o) => o.estrutura === "antena");

    if (patas?.valor === "8") {
      return "Oito patas sugerem um artrópode não inseto. Confira ausência de asas e organização corporal antes de confirmar.";
    }

    if (observacoes.length > 0 && hipoteses.length === 0) {
      return "As características selecionadas parecem conflitar. Revise as estruturas e compare novamente com as alternativas.";
    }

    if (hipoteses.length > 0) {
      return `A combinação atual sugere ${hipoteses[0].nome}. Continue observando outras estruturas para reduzir ambiguidades.`;
    }

    if (asas && !antena) {
      return "Você já observou as asas. Agora compare essa informação com o tipo de antena para refinar a identificação.";
    }

    return "Continue combinando estruturas morfológicas para construir uma hipótese mais consistente.";
  }

  if (tela === "principal" || tela === "ordem" || tela === "artropodes") {
    return "Apoio da chave: compare cada alternativa com o exemplar antes de avançar. O caminho percorrido é tão importante quanto o resultado final.";
  }

  if (tela === "sessao") {
    return "Revise o caminho percorrido e compare o resultado final com as características observadas durante a identificação.";
  }

  if (tela === "configurar") {
    return "Defina o modo de atividade e escolha por onde a prática deve começar.";
  }

  return "Use este painel como apoio didático do Laboratório de Biologia para interpretação, revisão conceitual e acompanhamento da atividade atual.";
}

export default function SidebarMenu({
  tela = "inicio",
  contexto = {},
  onOpenTaxonomy,
  variante = "identificacao",
  roteiro = null,
}) {
  const telaBotanica =
    tela === "botanica-ii" ||
    tela === "botanica-ii-plantae" ||
    tela === "botanica-herbario-virtual" ||
    tela === "botanica-herbario-virtual-app";
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [showTaxTree, setShowTaxTree] = useState(false);
  const [expandedTaxon, setExpandedTaxon] = useState("");
  const somenteNotaAutor = variante === "nota-autor" && !telaBotanica;
  const usarLogoLabsedInterna = variante !== "identificacao";
  const logoInterna = usarLogoLabsedInterna
    ? labsedLogo
    : obterMarcaDisciplina("projeto-geral").src;
  const altLogoInterna = usarLogoLabsedInterna
    ? "Símbolo do LABSED"
    : "Logo geral do projeto";
  const sidebarItems = useMemo(() => {
    if (telaBotanica) {
      return [
        ...SIDEBAR_ITEMS.filter((item) => item.id === "autor"),
        ARVORE_BOTANICA_ITEM,
        RECURSOS_OBSERVACAO_BOTANICA,
        REFERENCIAS_BOTANICA_II,
      ];
    }
    if (variante === "colecao") {
      return criarItensColecao(contexto?.colecao);
    }
    if (variante === "atividade" && roteiro) {
      return criarItensRoteiro(roteiro);
    }
    if (somenteNotaAutor) {
      return SIDEBAR_ITEMS.filter((item) => item.id === "autor");
    }
    return SIDEBAR_ITEMS;
  }, [contexto?.colecao, roteiro, somenteNotaAutor, telaBotanica, variante]);

  const mensagemAtual = useMemo(
    () => gerarMensagem(tela, contexto, roteiro),
    [tela, contexto, roteiro]
  );

  function toggleItem(id) {
    const itemComArvore = id === "arvore-taxonomica" || id === "arvore-botanica";
    if (!itemComArvore || activeItem === id) {
      setShowTaxTree(false);
      setExpandedTaxon("");
    }

    setActiveItem(activeItem === id ? null : id);
  }

  function renderArvoreBotanica() {
    return (
      <div className="sidebar-panel__content" style={itemContentStyle}>
        <p style={{ margin: 0 }}>
          Visualize a abrangência da chave de Botânica II, do Reino Plantae aos
          grupos e famílias trabalhados nesta primeira versão.
        </p>

        <div style={treeToggleWrapStyle}>
          <button
            type="button"
            style={treeToggleButtonStyle}
            onClick={() => setShowTaxTree((atual) => !atual)}
          >
            {showTaxTree ? "Recolher ramos" : "Ver grupos e famílias"}
          </button>
        </div>

        {showTaxTree ? (
          <div style={treeContentStyle}>
            <div style={compactRootStyle}>
              <span style={compactNodeDotStyle} />
              <div>
                <b>Plantae</b>
                <div style={compactBranchLabelStyle}>
                  Grandes grupos e famílias didáticas
                </div>
              </div>
            </div>

            <div style={compactOrdersStyle}>
              {ARVORE_BOTANICA_II.map((grupo) => {
                const expandida = expandedTaxon === grupo.id;
                return (
                  <div key={grupo.id} style={compactOrderWrapStyle}>
                    <button
                      type="button"
                      style={compactOrderButtonStyle}
                      onClick={() =>
                        setExpandedTaxon(expandida ? "" : grupo.id)
                      }
                    >
                      <span>{expandida ? "−" : "+"}</span>
                      <b>{grupo.nome}</b>
                      <small>{grupo.filhos.length} ramos</small>
                    </button>

                    {expandida ? (
                      <div style={compactChildrenStyle}>
                        {grupo.filhos.map((filho) => (
                          <div key={filho} style={compactChildStyle}>
                            <span style={compactChildLineStyle} />
                            <span>{filho}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div style={treeNoteStyle}>
              Esta árvore resume a cobertura atual da chave. Saídas
              indeterminadas foram mantidas quando a identificação depende de
              flores, frutos ou caracteres não disponíveis no material.
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  function renderItemContent(item) {
    if (item.id === "arvore-botanica") {
      return renderArvoreBotanica();
    }

    if (item.id !== "arvore-taxonomica") {
      return (
        <div className="sidebar-panel__content" style={itemContentStyle}>
          {item.content}
        </div>
      );
    }

    const insecta = encontrarTaxon(arvoreTaxonomica, "INSECTA");

    return (
      <div className="sidebar-panel__content" style={itemContentStyle}>
        <p style={{ margin: 0 }}>
          Navegue da classe Insecta até ordens, famílias e subfamílias. Abra
          apenas o ramo que deseja consultar.
        </p>

        <div style={treeToggleWrapStyle}>
          <button
            type="button"
            style={treeToggleButtonStyle}
            onClick={() => setShowTaxTree((atual) => !atual)}
          >
            {showTaxTree ? "Recolher ramos" : "Ver ordens e famílias"}
          </button>
        </div>

        {showTaxTree ? (
          <div style={treeContentStyle}>
            <div style={compactRootStyle}>
              <span style={compactNodeDotStyle} />
              <div>
                <b>Arthropoda</b>
                <div style={compactBranchLabelStyle}>Classe Insecta</div>
              </div>
            </div>

            <div style={compactOrdersStyle}>
              {insecta?.filhos.map((ordem) => {
                const expandida = expandedTaxon === ordem.uid;
                return (
                  <div key={ordem.uid} style={compactOrderWrapStyle}>
                    <button
                      type="button"
                      style={compactOrderButtonStyle}
                      onClick={() =>
                        setExpandedTaxon(expandida ? "" : ordem.uid)
                      }
                    >
                      <span>{expandida ? "−" : "+"}</span>
                      <b>{ordem.nome}</b>
                      <small>{ordem.filhos.length || "sem"} ramos</small>
                    </button>

                    {expandida ? (
                      <div style={compactChildrenStyle}>
                        {ordem.filhos.map((filho) => (
                          <div key={filho.uid} style={compactChildStyle}>
                            <span style={compactChildLineStyle} />
                            <span>
                              {filho.nome}
                              {filho.filhos.length
                                ? ` · ${filho.filhos.length} subgrupos`
                                : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {onOpenTaxonomy ? (
              <button
                type="button"
                style={fullTreeButtonStyle}
                onClick={() => {
                  setIsOpen(false);
                  setActiveItem(null);
                  setShowTaxTree(false);
                  onOpenTaxonomy();
                }}
              >
                Explorar árvore completa →
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className="sidebar-toggle-button"
        style={toggleButtonStyle}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir painel de apoio"
        title="Painel de apoio"
      >
        <span style={toggleIconStyle}>i</span>
        <span className="sidebar-toggle-label" style={toggleLabelStyle}>
          Apoio
        </span>
      </button>

      {isOpen ? (
        <div
          style={overlayStyle}
          onClick={() => {
            setIsOpen(false);
            setActiveItem(null);
            setShowTaxTree(false);
          }}
        />
      ) : null}

      <aside
        className="sidebar-panel"
        style={{
          ...sidebarStyle,
          transform: isOpen ? "translateX(0)" : "translateX(-104%)",
        }}
        aria-hidden={!isOpen}
      >
        <div className="sidebar-panel__header" style={sidebarHeaderStyle}>
          <div>
            <div style={sidebarKicker}>Apoio didático</div>
            <h2 style={sidebarTitleStyle}>Informações</h2>
          </div>

          <button
            type="button"
            style={closeButtonStyle}
            onClick={() => {
              setIsOpen(false);
              setActiveItem(null);
              setShowTaxTree(false);
            }}
            aria-label="Fechar painel"
          >
            x
          </button>
        </div>

        {somenteNotaAutor ? null : (
          <div className="sidebar-panel__hint" style={hintCardStyle}>
            <div style={hintLogoStyle} aria-label={altLogoInterna}>
              <img
                src={logoInterna}
                alt={altLogoInterna}
                style={{
                  ...hintLogoImageStyle,
                  ...(usarLogoLabsedInterna ? hintLabsedImageStyle : null),
                }}
              />
            </div>
            <div style={hintTextStyle}>{mensagemAtual}</div>
          </div>
        )}

        <div style={temaCardStyle}>
          <div style={temaTituloStyle}>Tema visual</div>
          <ThemeSwitcher />
        </div>

        <div className="sidebar-panel__nav" style={sidebarNavStyle}>
          {sidebarItems.map((item) => (
            <section
              className={`sidebar-panel__item${(somenteNotaAutor || activeItem === item.id) ? " sidebar-panel__item--open" : ""}`}
              key={item.id}
              style={itemContainerStyle}
            >
              <button
                type="button"
                className="sidebar-panel__item-button"
                style={sidebarItemStyle}
                onClick={() => {
                  if (!somenteNotaAutor) toggleItem(item.id);
                }}
              >
                <span style={itemTagStyle}>{item.tag}</span>
                <span style={itemTitleStyle}>{item.title}</span>
                {somenteNotaAutor ? null : (
                  <span className="sidebar-panel__chevron" aria-hidden="true">
                    {activeItem === item.id ? "−" : "+"}
                  </span>
                )}
              </button>

              {somenteNotaAutor || activeItem === item.id ? (
                <div className="sidebar-panel__content-wrap">
                  {renderItemContent(item)}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </aside>
    </>
  );
}

const toggleButtonStyle = {
  position: "fixed",
  top: 18,
  left: 18,
  minHeight: 48,
  padding: "0 16px 0 8px",
  zIndex: 1000,
  display: "inline-flex",
  alignItems: "center",
  gap: 9,
  border: "2px solid rgba(255,255,255,0.86)",
  borderRadius: 999,
  background:
    "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
  color: "var(--color-hero-text)",
  boxShadow:
    "0 16px 34px rgba(18, 38, 34, 0.24), 0 0 0 6px rgba(31, 78, 95, 0.1)",
  cursor: "pointer",
  fontWeight: 850,
  fontSize: 15,
};

const toggleIconStyle = {
  display: "inline-grid",
  placeItems: "center",
  width: 30,
  height: 30,
  borderRadius: 999,
  background: "rgba(255,255,255,0.18)",
  border: "1px solid rgba(255,255,255,0.22)",
  fontWeight: 950,
  fontSize: 17,
};

const toggleLabelStyle = {
  lineHeight: 1,
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  background: "color-mix(in srgb, var(--color-overlay) 48%, transparent)",
};

const sidebarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "min(360px, 88vw)",
  height: "100vh",
  zIndex: 1001,
  overflowY: "auto",
  background: "var(--color-bg)",
  borderRight: "1px solid var(--color-border)",
  boxShadow: "24px 0 54px rgba(15, 23, 42, 0.18)",
  transition: "transform 220ms ease",
};

const sidebarHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 18,
  padding: 22,
  color: "white",
  background:
    "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
};

const sidebarKicker = {
  marginBottom: 4,
  opacity: 0.78,
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const sidebarTitleStyle = {
  margin: 0,
  fontSize: 24,
  lineHeight: 1.1,
};

const closeButtonStyle = {
  width: 36,
  height: 36,
  minHeight: 36,
  border: "1px solid rgba(255,255,255,0.26)",
  borderRadius: 999,
  background: "rgba(255,255,255,0.12)",
  color: "white",
  cursor: "pointer",
  fontSize: 18,
  fontWeight: 800,
};

const hintCardStyle = {
  margin: 16,
  padding: 14,
  borderRadius: 14,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-sm)",
};

const hintLogoStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 12,
  color: "var(--color-primary)",
};

const hintLogoImageStyle = {
  width: "100%",
  maxWidth: 272,
  height: "auto",
  objectFit: "contain",
  flex: "0 0 auto",
};

const hintLabsedImageStyle = {
  width: 96,
  maxWidth: 96,
  filter: "drop-shadow(0 10px 18px rgba(15, 23, 42, 0.12))",
};

const hintTextStyle = {
  color: "var(--color-text)",
  fontSize: 14,
  lineHeight: 1.55,
};

const temaCardStyle = {
  display: "grid",
  gap: 8,
  margin: "0 16px 14px",
  padding: 12,
  borderRadius: 14,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-sm)",
};

const temaTituloStyle = {
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 800,
  textTransform: "uppercase",
};

const sidebarNavStyle = {
  display: "grid",
  gap: 10,
  padding: "0 16px 20px",
};

const itemContainerStyle = {
  overflow: "hidden",
  border: "1px solid var(--color-border)",
  borderRadius: 14,
  background: "var(--color-surface)",
};

const sidebarItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  width: "100%",
  padding: 12,
  border: "none",
  background: "transparent",
  color: "var(--color-text)",
  cursor: "pointer",
  textAlign: "left",
};

const itemTagStyle = {
  display: "inline-grid",
  placeItems: "center",
  width: 30,
  height: 30,
  borderRadius: 999,
  background: "var(--color-bg-soft)",
  color: "var(--color-primary)",
  fontWeight: 900,
};

const itemTitleStyle = {
  fontWeight: 790,
  minWidth: 0,
  overflowWrap: "anywhere",
};

const itemContentStyle = {
  padding: "0 12px 14px 44px",
  color: "var(--color-muted)",
  fontSize: 13,
  lineHeight: 1.52,
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const treeToggleButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 34,
  padding: "7px 12px",
  border: "1px solid var(--color-info-border)",
  borderRadius: 10,
  background: "var(--color-info-soft)",
  color: "var(--color-info-text)",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 850,
};

const treeToggleWrapStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 12,
};

const treeContentStyle = {
  marginTop: 12,
  padding: 10,
  borderRadius: 10,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
  fontSize: 12.5,
  lineHeight: 1.45,
  whiteSpace: "pre-wrap",
};

const compactRootStyle = {
  display: "flex",
  alignItems: "center",
  gap: 9,
  paddingBottom: 10,
};

const compactNodeDotStyle = {
  width: 13,
  height: 13,
  borderRadius: 999,
  background: "var(--color-primary)",
  boxShadow: "0 0 0 5px var(--color-info-soft)",
};

const compactBranchLabelStyle = {
  marginTop: 2,
  color: "var(--color-muted)",
  fontSize: 11,
};

const compactOrdersStyle = {
  display: "grid",
  gap: 6,
  maxHeight: 390,
  overflowY: "auto",
  paddingLeft: 9,
  borderLeft: "2px solid var(--color-border)",
};

const compactOrderWrapStyle = {
  minWidth: 0,
};

const compactOrderButtonStyle = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "18px 1fr auto",
  alignItems: "center",
  gap: 6,
  padding: "7px 8px",
  border: "1px solid var(--color-border)",
  borderRadius: 9,
  background: "var(--color-surface)",
  color: "var(--color-text)",
  textAlign: "left",
  cursor: "pointer",
  fontSize: 12,
};

const compactChildrenStyle = {
  display: "grid",
  gap: 3,
  padding: "5px 0 8px 17px",
};

const compactChildStyle = {
  display: "grid",
  gridTemplateColumns: "12px 1fr",
  alignItems: "start",
  gap: 4,
  color: "var(--color-muted)",
  fontSize: 11.5,
};

const compactChildLineStyle = {
  height: 8,
  borderLeft: "1px solid var(--color-border)",
  borderBottom: "1px solid var(--color-border)",
};

const treeNoteStyle = {
  marginTop: 10,
  padding: "9px 10px",
  borderRadius: 9,
  background: "var(--color-info-soft)",
  color: "var(--color-info-text)",
  fontSize: 11.5,
  lineHeight: 1.45,
};

const fullTreeButtonStyle = {
  width: "100%",
  marginTop: 12,
  padding: "10px 12px",
  border: 0,
  borderRadius: 10,
  background: "var(--color-primary)",
  color: "var(--color-hero-text)",
  cursor: "pointer",
  fontWeight: 850,
};
