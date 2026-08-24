# Lógica Investigativa do App

## O que o app faz

O LABSED Investigação organiza uma leitura científica guiada por observações.

O sistema não foi concebido como:

- chave dicotômica;
- sequência fixa de entrada e saída;
- trilha obrigatória entre níveis taxonômicos ou anatômicos;
- classificador automático que apenas devolve a resposta.

Ele foi concebido como um motor de investigação por hipóteses.

---

## Unidade central: o protocolo

Cada protocolo abre um universo próprio de hipóteses investigáveis.

Dentro dele, o estudante ou professor registra observações, acumula evidências, encontra conflitos, acompanha a confiança e decide se já há base para encerrar a leitura.

O protocolo é a unidade central da investigação.

### Sustentação relativa não é certeza

Quando a interface apresenta uma hipótese com 100%, isso representa a maior
sustentação relativa entre as hipóteses atualmente comparadas. Não representa
100% de probabilidade, verdade ou certeza científica.

A confiança deve ser interpretada junto com o nível textual da hipótese, a
margem para as concorrentes, os conflitos e o estado da investigação.

Não é um degrau preso a outro degrau.

---

## O que pode existir entre protocolos

Protocolos podem manter relações pedagógicas entre si.

Exemplos:

- um protocolo de tecidos pode dialogar com um protocolo de órgãos;
- um protocolo de ordens pode ser seguido por outro de famílias;
- um protocolo introdutório pode inspirar um aprofundamento posterior.

Mas essas relações devem aparecer como continuidade opcional.

Elas não devem transformar o motor em uma chave linear.

---

## Regra de desenho

Sempre que criarmos ou revisarmos um protocolo, precisamos perguntar:

1. Qual é o universo de hipóteses deste protocolo?
2. Quais observações realmente sustentam ou enfraquecem essas hipóteses?
3. O protocolo consegue parar em si mesmo com uma leitura coerente?
4. Se houver outro protocolo relacionado, ele entra como nova investigação ou como continuação obrigatória?

Se a resposta da pergunta 4 for "continuação obrigatória", provavelmente estamos fugindo da proposta do app.

---

## Aplicação em histologia

Em histologia, a lógica correta é:

- um protocolo pode investigar tipos de tecido como hipóteses;
- outro protocolo pode investigar órgãos como hipóteses;
- tecidos, estruturas e tipos celulares podem aparecer como evidências dentro do protocolo de órgãos;
- o professor decide se encerra a leitura em tecido ou se abre depois uma nova investigação em órgão.

Ou seja: tecido não é uma etapa mecânica para chegar ao órgão.

É um universo investigativo próprio.

Na versão atual, o protocolo de tecidos inclui tecidos clássicos e especializações conjuntivas dentro do mesmo universo. O protocolo de órgãos reúne órgãos de diferentes sistemas sem separar por sistema anatômico.

---

## Aplicação em zoologia

Em zoologia, o protocolo de ordens de Insecta não funciona comparando "blocos prontos" de uma trilha hierárquica.

Ele funciona sustentando hipóteses concorrentes dentro do universo daquele protocolo.

Se no futuro houver famílias, gêneros ou espécies, cada novo nível deve continuar obedecendo essa mesma lógica:

- novo universo;
- novas hipóteses;
- novas evidências;
- sem sequência automática da resposta anterior.

---

## Consequência para a interface

A interface deve:

- apresentar o protocolo como universo atual;
- mostrar protocolos relacionados como leituras possíveis;
- evitar rótulos que sugiram escada obrigatória;
- reforçar que a conclusão precisa se sustentar dentro do protocolo escolhido.

---

## Consequência para os testes

Os testes não devem validar apenas acerto classificatório.

Eles também devem proteger o comportamento conceitual do app, por exemplo:

- não concluir cedo demais;
- manter disputa quando a margem é apertada;
- sugerir observação discriminativa;
- preservar a autonomia entre protocolos;
- impedir que textos e mensagens transformem a experiência em chave automática.
