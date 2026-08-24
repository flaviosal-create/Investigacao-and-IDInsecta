# Estrutura atual e legado

## Fonte atual da aplicação

A aplicação executada pelo Vite começa em `src/main.jsx` e usa:

- `src/engine/` para inferência, sugestões, conclusões e relatórios;
- `src/protocols/` para os protocolos de conhecimento;
- `src/components/` para a interface React;
- `src/config/` para catálogo e relações entre protocolos;
- `src/utils/` para persistência, autoria e exportação.

## Estruturas mantidas para migração ou referência

`data/knowledgeBase.js` contém a base de dados anterior e é utilizada pelos
scripts de migração em `scripts/migrateKnowledgeBase.js`. Ela não é importada
pela aplicação atual.

Os arquivos `ui/app.js`, `ui/index.html` e `ui/styles.css` também não são
importados pelo ponto de entrada atual. Devem ser tratados como interface
legada até que se decida formalmente entre arquivá-los ou removê-los.

## Regra para evolução

Novos protocolos devem ser adicionados em `src/protocols/` e registrados no
catálogo em `src/config/protocolCatalog.js`. A base legada só deve ser alterada
quando houver uma tarefa explícita de migração ou preservação histórica.
