# Engine V1

## Entrada

O motor recebe:

- protocolo
- observações do aluno

Exemplo:

Observações:

- Asas = élitros
- Corpo = endurecido

---

## Processamento

Para cada hipótese:

1. Procurar evidências compatíveis
2. Procurar conflitos
3. Calcular força da hipótese
4. Atualizar confiança

---

## Saída

O motor retorna:

- hipóteses ordenadas
- evidências
- conflitos
- confiança
- próxima observação sugerida

## Observação

{
  id,
  estrutura,
  valor
}

## Hipótese

{
  id,
  nome,
  score,
  confianca
}

## Resultado

{
  hipoteses,
  sugestao,
  conclusao
}