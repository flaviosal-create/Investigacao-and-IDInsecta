# API do Motor V1

## iniciarInvestigacao()

Cria uma investigação vazia.

Entrada:

- protocolo

Saída:

- investigação

---

## registrarObservacao()

Adiciona uma observação.

Entrada:

- investigação
- observação

Saída:

- investigação atualizada

---

## calcularHipoteses()

Calcula hipóteses a partir das observações.

Entrada:

- investigação

Saída:

- lista de hipóteses

---

## sugerirObservacao()

Sugere a próxima observação mais informativa.

Entrada:

- investigação

Saída:

- sugestão

---

## avaliarConclusao()

Determina o estado atual da investigação.

Entrada:

- hipóteses

Saída:

- insuficiente
- inicial
- bem_sustentada
- contraditoria

---

## gerarRelatorio()

Produz o relatório investigativo.