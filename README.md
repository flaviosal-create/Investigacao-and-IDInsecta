# LABSED Investigação

Plataforma educacional para desenvolver investigação científica baseada em observação, formulação de hipóteses, comparação de evidências e justificativa de conclusões.

O sistema não se limita à identificação biológica: cada investigação é conduzida por um protocolo com um universo próprio de hipóteses e evidências observáveis.

## Domínios atuais

- Zoologia
- Botânica
- Histologia

## Tecnologias

- React 18
- Vite 5
- Test runner nativo do Node.js

## Como executar

Pré-requisito: Node.js 18 ou superior.

```bash
npm install
npm run dev
```

Para criar a versão de produção:

```bash
npm run build
```

## Testes

```bash
npm test
```

Para executar a validação local completa:

```bash
npm run validate
```

## Estrutura do projeto

- `src/engine/`: regras de inferência, confiança, sugestões, conclusões e relatórios.
- `src/protocols/`: protocolos por domínio e normalização das regras.
- `src/components/`: interface da investigação.
- `tests/`: testes automatizados dos motores e protocolos.
- `docs/`: visão pedagógica, arquitetura e especificações.
- `public/assets/`: recursos visuais usados nos protocolos.

## Documentação principal

- [Visão do produto](docs/visao.md)
- [Arquitetura](docs/arquitetura-v1.md)
- [Princípios pedagógicos](docs/principios-pedagogicos.md)
- [Lógica investigativa](docs/logica-investigativa.md)
- [Estrutura atual e legado](docs/estrutura-legada.md)
- [Proveniência dos assets visuais](docs/proveniencia-assets.md)
- [Roadmap e pendências](docs/roadmap.md)

## Autoria e uso

Antes de distribuir ou abrir este repositório, registre no arquivo [AUTHORS.md](AUTHORS.md) os autores, titulares e termos de cessão aplicáveis. A licença de uso ainda deve ser definida e incluída em um arquivo `LICENSE`.
