# Estado da Investigação

## Objetivo

Definir todas as informações que uma investigação pode possuir durante seu ciclo de vida.

---

# Investigação

Uma investigação representa o estado atual do processo investigativo.

Ela armazena:

- protocolo utilizado;
- observações registradas;
- hipóteses calculadas;
- sugestões geradas;
- conclusão atual;
- histórico.

---

# Estrutura Conceitual

Investigação

├── protocolo
├── status
├── observações
├── hipóteses
├── sugestão atual
├── conclusão
└── histórico

---

# Status

Uma investigação pode estar em:

## Iniciada

O protocolo foi selecionado.

Nenhuma observação foi registrada.

---

## Em andamento

Existem observações registradas.

O motor está produzindo hipóteses.

---

## Concluída

A investigação foi encerrada.

Existe um relatório final.

---

# Observações

Representam os fatos registrados pelo estudante.

Exemplo:

- Asas = élitros
- Corpo = endurecido

---

# Hipóteses

Representam as explicações atualmente possíveis.

Cada hipótese possui:

- nome;
- score;
- confiança;
- evidências;
- conflitos.

---

# Sugestão Atual

Representa a observação mais informativa para continuar a investigação.

Exemplo:

"Observe os cercos."

---

# Conclusão

Pode assumir:

## Insuficiente

Pouca informação disponível.

---

## Inicial

Existem evidências favoráveis, mas insuficientes.

---

## Bem sustentada

As evidências sustentam claramente uma hipótese.

---

## Contraditória

Existem conflitos importantes.

---

# Histórico

Registra a sequência da investigação.

Exemplo:

1. Élitros observados
2. Coleoptera tornou-se hipótese líder
3. Corpo endurecido observado
4. Confiança aumentou