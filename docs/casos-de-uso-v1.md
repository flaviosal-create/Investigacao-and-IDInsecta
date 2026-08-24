# Casos de Uso V1

## Objetivo

Descrever as principais interações do estudante com o LABSED Investigação.

---

# CU-01 — Iniciar Investigação

## Objetivo

Permitir que o estudante inicie uma nova investigação em um protocolo específico.

## Atores

- Estudante

## Pré-condições

- Existe pelo menos um domínio disponível.
- Existe pelo menos um protocolo disponível.

## Fluxo Principal

1. O estudante acessa a plataforma.
2. Seleciona um domínio.
3. Seleciona um protocolo.
4. O sistema cria uma nova investigação.

## Resultado Esperado

Uma investigação ativa é criada.

---

# CU-02 — Registrar Observação

## Objetivo

Registrar uma observação realizada pelo estudante.

## Atores

- Estudante

## Pré-condições

- Existe uma investigação ativa.

## Fluxo Principal

1. O estudante escolhe uma estrutura.
2. O estudante escolhe um valor observado.
3. O sistema registra a observação.

## Resultado Esperado

A observação passa a fazer parte da investigação.

---

# CU-03 — Atualizar Hipóteses

## Objetivo

Recalcular as hipóteses após uma nova observação.

## Atores

- Sistema

## Gatilho

Nova observação registrada.

## Fluxo Principal

1. O sistema consulta o protocolo.
2. O sistema compara observações e hipóteses.
3. O sistema calcula conflitos e evidências.
4. O sistema atualiza o ranking das hipóteses.

## Resultado Esperado

As hipóteses são reordenadas.

---

# CU-04 — Consultar Hipótese

## Objetivo

Permitir que o estudante compreenda uma hipótese.

## Atores

- Estudante

## Fluxo Principal

1. O estudante seleciona uma hipótese.
2. O sistema exibe:
   - evidências favoráveis;
   - conflitos;
   - confiança;
   - justificativa.

## Resultado Esperado

O estudante compreende por que a hipótese foi sugerida.

---

# CU-05 — Solicitar Próxima Observação

## Objetivo

Receber orientação para continuar a investigação.

## Atores

- Estudante

## Fluxo Principal

1. O estudante solicita ajuda.
2. O sistema identifica as principais hipóteses.
3. O sistema calcula a observação mais informativa.
4. O sistema apresenta uma sugestão.

## Resultado Esperado

O estudante recebe orientação investigativa.

---

# CU-06 — Encerrar Investigação

## Objetivo

Finalizar uma investigação.

## Atores

- Estudante

## Fluxo Principal

1. O estudante encerra a investigação.
2. O sistema consolida os resultados.
3. O sistema gera um relatório.

## Resultado Esperado

Um relatório investigativo é criado.

---

# CU-07 — Consultar Relatório

## Objetivo

Revisar uma investigação concluída.

## Atores

- Estudante

## Fluxo Principal

1. O estudante abre um relatório.
2. O sistema exibe:
   - observações;
   - hipóteses;
   - conflitos;
   - conclusão;
   - justificativas.

## Resultado Esperado

O estudante consegue revisar todo o processo investigativo.