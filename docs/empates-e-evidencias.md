# Empates e evidências observadas

O estudo compara as contribuições dos métodos de chave e investigação para
Arthropoda e Insecta em diferentes níveis de ensino. O método investigativo deve
permitir comparar hipóteses e justificar diferenças de sustentação.

## Regra implementada

Os protocolos `classes-arthropoda-v1`, `ordens-insecta-v1` e
`familias-coleoptera-v1` usam `investigationPolicy.scoringMode: shared-evidence`.
Para a mesma estrutura, valor observado e efeito (favorável ou conflitante),
o peso é compartilhado entre as hipóteses. O peso comum é o maior peso já
cadastrado para essa evidência e efeito no protocolo. Mantém-se a escala de
pesos por evidência e o fator de atenuação de conflitos da estrutura, mas
remove-se a preferência por uma hipótese que responde da mesma forma às
observações. Esta é uma regra operacional, não uma estimativa de probabilidade.

Somente regras correspondentes às observações registradas contribuem para o
resultado. Ausência de regra não é convertida em incompatibilidade. Hipóteses
com os mesmos perfis de compatibilidade e conflito permanecem empatadas com
uma ou várias observações. Perfis diferentes também podem empatar no saldo;
esse empate é mantido, sem desempate por ordem de cadastro.

Uma líder exige pontuação positiva estritamente maior que a das concorrentes.
Empatadas compartilham posição e nenhuma recebe destaque exclusivo. A próxima
observação considera o conjunto de hipóteses empatadas. Uma liderança não
substitui os critérios mínimos de conclusão do protocolo.

## Interface e relatórios

O termômetro destaca a avaliação de confiança, o empate ou a liderança e o
saldo de pontos, considerando evidências e conflitos. Sua escala é fixa no
protocolo: a soma do maior peso positivo efetivo por estrutura. A barra usa o
saldo dividido por essa escala, limitado ao intervalo visual de 0 a 100%;
essa proporção não é exibida como probabilidade ou certificação da identificação.
Saldos negativos continuam visíveis em pontos, com barra vazia e avaliação. Hipóteses sem evidência favorável continuam disponíveis na
aba Hipóteses para discussão. Textos, relatório e histórico não atribuem uma
liderança nova em empate. Sessões recuperadas são recalculadas a partir das
observações; entradas históricas anteriores à mudança permanecem como registro
do comportamento da versão em que foram criadas.

## Casos de regressão

- Apenas mastigador: 12 hipóteses empatadas, sem líder.
- Mastigador e élitros: Dermaptera e Coleoptera empatadas no cadastro atual.
- Acrescentar corpo duro: Coleoptera assume liderança; remover restaura empate.
- Antena curta, dois pares membranosos e abdome alongado: o cadastro atual
  sustenta igualmente Orthoptera e Odonata; a aplicação mantém essa ambiguidade.
  A adequação biológica dessas regras requer revisão docente, não desempate
  artificial por pesos diferentes.
- Reordenar o cadastro não altera pontuações, posições de empate ou a estrutura
  sugerida no caso mastigador.

Os testes de perfis compartilhados cobrem uma e várias observações nos três
protocolos, incluindo respostas conflitantes. A chave dicotômica não foi alterada.

## Sustentação e comparação são avaliações separadas

A classificação `assessment` descreve as evidências de cada hipótese:

- `insuficiente`: sem apoio positivo suficiente;
- `parcial`: apoio positivo, mas sem atingir os critérios de sustentação;
- `bem_sustentada`: pelo menos 8 pontos, apoio em pelo menos três estruturas
  distintas (ou mais, se a política do protocolo exigir) e nenhum conflito;
- `com_conflitos`: uma ou mais contraevidências, mesmo com saldo positivo.

A classificação `comparison` descreve a posição: `No grupo líder`, `À frente no
momento`, `Grupo empatado`, `Abaixo da líder` ou ausência de grupo líder quando
nenhuma hipótese tem saldo positivo. Quando uma hipótese está abaixo, a interface
informa também quantos pontos a separam da líder e com quantas outras ela empata.
Uma hipótese bem sustentada pode empatar ou permanecer abaixo da líder.

A interface, o termômetro e os relatórios usam essas duas avaliações. O campo
interno `confidence` conserva os critérios de competição usados pelos motores
de decisão e conclusão; mudar a apresentação da sustentação não dispensa os
critérios de encerramento. Os pesos e o cálculo das pontuações não foram alterados
nesta separação.
