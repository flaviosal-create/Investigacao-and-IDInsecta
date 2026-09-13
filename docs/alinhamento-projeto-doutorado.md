# Alinhamento com o projeto de doutorado

Documento de verificação entre o arquivo `projeto-cdeKey_528604C700E84010BC15E14144F3E7F5.pdf` e o estado atual do LABSED.

## Síntese

O app está alinhado com a tese central do projeto: uma plataforma educacional integrada que diferencia identificação por chave e investigação por evidências. O modo investigativo já implementa observação, hipóteses concorrentes, evidências favoráveis, conflitos, sugestão de próxima observação, revisão de registros, encerramento manual e relatório exportável.

O desalinhamento técnico encontrado foi a promessa de aplicação web instalável. A aplicação possuía elementos antigos de prompt de instalação no legado, mas não expunha `manifest.webmanifest` nem registrava service worker no ponto de entrada atual. Isso foi corrigido com metadados PWA mínimos e teste automatizado.

## Pontos do PDF que batem com o app

- Dois modos aparecem no produto: a chave de insetos no fluxo `legacy-insecta` e o LABSED Investigação no fluxo atual em React.
- A investigação não foi transformada em chave dicotômica: os protocolos são universos autônomos de hipóteses e o motor trabalha por sustentação relativa.
- O app mantém observações revisáveis e removíveis.
- O motor calcula hipóteses, evidências, conflitos, confiança, sugestão, decisão, explicação, conclusão e relatório.
- Há protocolos de Zoologia, Botânica e Histologia.
- Há protocolo investigativo de ordens de Insecta e aprofundamento em famílias de Coleoptera.
- Há casos de calibração e revisão docente nos protocolos.
- Há persistência local de sessões por protocolo.
- Há exportação de relatório investigativo e snapshot.
- Há testes automatizados com `node --test` e validação por `npm run validate`.

## Ajuste realizado

- Inclusão de `public/manifest.webmanifest`.
- Inclusão de `public/service-worker.js`.
- Inclusão de `public/assets/labsed-icon.svg`.
- Registro de service worker em produção por `src/registerServiceWorker.js`.
- Metadados de instalação no `index.html`.
- Testes em `tests/installableApp.test.js`.

## Pontos que ainda merecem atenção antes da seleção

- O PDF fala em documentação de uso para estudantes e professores. O repositório tem documentação pedagógica e técnica, mas ainda pode ganhar um guia curto de uso em linguagem de produto.
- A chave de insetos está integrada ao app atual por um componente chamado `LegacyInsectaKey`. Funcionalmente isso não impede o alinhamento, mas o nome interno indica que ainda há dívida de migração.
- O projeto menciona registros de navegação e escolhas nas duas modalidades como instrumentos de pesquisa. O app possui histórico investigativo e relatórios, mas uma telemetria de pesquisa/exportação consolidada ainda deve ser desenhada com cuidado ético e privacidade.
- A validação com professores, especialistas e estudantes continua como etapa de pesquisa, não como algo que o app sozinho possa comprovar.

## Verificação local

Última validação executada após os ajustes:

```bash
npm run validate
```

Resultado: testes automatizados passaram e a build de produção foi gerada com os arquivos PWA no `dist`.
