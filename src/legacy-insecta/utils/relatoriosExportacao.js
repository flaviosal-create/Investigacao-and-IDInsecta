import { formatarContextoChave } from "./chaveRuntime.js";
import {
  obterRotuloResultadoRelatorio,
  obterSecoesComplementaresRelatorio,
} from "./relatorioTipoDetalhes.js";
import {
  inferirContextoTipoRelatorio,
  obterApresentacaoTipoRelatorio,
} from "./tiposRelatorio.js";
import {
  codigoRelatorio,
  formatarData,
  rotuloStatus,
} from "./relatoriosApresentacao.js";
import { escapeHtml, safeFileName } from "./text.js";

export function baixarTextoRelatorioSalvo(relatorio) {
  const apresentacao = obterApresentacaoRelatorio(relatorio);
  const codigo = codigoRelatorio(relatorio);
  const blob = new Blob([montarTextoRelatorioSalvo(relatorio)], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${
    apresentacao.politicaExportacao.nomeArquivoBase
  }_${safeFileName(codigo)}_${safeFileName(relatorio.alunoNome || "aluno") || "aluno"}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function montarTextoRelatorioSalvo(relatorio) {
  const apresentacao = obterApresentacaoRelatorio(relatorio);
  const revisao = relatorio.revisaoProfessor || null;
  const codigo = codigoRelatorio(relatorio);
  const linhas = [
    apresentacao.tituloRelatorio.toUpperCase(),
    `Código: ${codigo}`,
    `Aluno: ${relatorio.alunoNome || "Não identificado"}`,
    `Turma: ${relatorio.turmaNome || "Não informada"}`,
    `Modo: ${relatorio.mode === "prova" ? "PROVA" : "PRÁTICA"}`,
    `Situação: ${rotuloStatus(relatorio.status).toUpperCase()}`,
    `Origem: ${relatorio.origem === "nuvem" ? "NUVEM" : "ESTE APARELHO"}`,
    `Atualizado em: ${formatarData(relatorio.atualizadoEm)}`,
    `${apresentacao.rotuloContagem}: ${relatorio.sessao?.length || 0} de ${
      relatorio.totalInsetos || 0
    }`,
    "",
  ];

  if (revisao?.comentario) {
    linhas.push(apresentacao.politicaRevisao.titulo.toUpperCase());
    if (revisao.revisadoEm) {
      linhas.push(
        `${apresentacao.politicaRevisao.rotuloRevisadoEm}: ${formatarData(
          revisao.revisadoEm
        )}`
      );
    }
    linhas.push(revisao.comentario);
    linhas.push("");
  }

  (relatorio.sessao || []).forEach((item) => {
    const ordemExibicao = formatarContextoChave(item.ordem);
    const secoesComplementares = obterSecoesComplementaresRelatorio(
      item,
      apresentacao
    );

    linhas.push(`${apresentacao.rotuloItemCapitalizado} ${item.inseto}`);
    if (ordemExibicao) linhas.push(`${apresentacao.rotuloContexto}: ${ordemExibicao}`);
    linhas.push(
      `${obterRotuloResultadoRelatorio(apresentacao)}: ${
        item.resultado || "Não informado"
      }`
    );
    if (deveMostrarRegistroSequencial(apresentacao, item)) {
      linhas.push(`${apresentacao.rotuloCaminho}:`);
      (item.registro || []).forEach((passo, indice) => {
        linhas.push(
          `${indice + 1}. ${passo.passo} (${passo.alternativa}) - ${passo.escolha}`
        );
      });
    }
    secoesComplementares.forEach((secao) => {
      linhas.push(`${secao.titulo}:`);
      (secao.linhas || []).forEach((linha) => linhas.push(`- ${linha}`));
      (secao.itens || []).forEach((valor) => linhas.push(`- ${valor}`));
    });
    linhas.push("");
  });

  return linhas.join("\n");
}

export function imprimirRelatorioSalvo(relatorio) {
  const janela = window.open("", "_blank");
  if (!janela) {
    alert(
      "O navegador bloqueou a janela de impressão. Libere pop-ups para este site e tente novamente."
    );
    return;
  }

  janela.opener = null;
  janela.document.write(montarHtmlRelatorioSalvoImpressao(relatorio));
  janela.document.close();
  janela.focus();
}

export function montarHtmlRelatorioSalvoImpressao(relatorio) {
  const apresentacao = obterApresentacaoRelatorio(relatorio);
  const registros = Array.isArray(relatorio.sessao) ? relatorio.sessao : [];
  const revisao = relatorio.revisaoProfessor || null;
  const statusTexto = rotuloStatus(relatorio.status).toUpperCase();
  const modoTexto = relatorio.mode === "prova" ? "PROVA" : "PRÁTICA";
  const codigo = codigoRelatorio(relatorio);

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(apresentacao.tituloRelatorio)} - ${escapeHtml(relatorio.alunoNome || "Aluno")}</title>
  <style>
    :root {
      color: #1f2933;
      font-family: Inter, Arial, sans-serif;
      line-height: 1.45;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #f7f3ea;
      color: #1f2933;
    }
    main {
      max-width: 920px;
      margin: 0 auto;
      padding: 28px;
    }
    header {
      display: grid;
      gap: 10px;
      padding: 24px;
      border-radius: 22px;
      background: linear-gradient(135deg, #fff8e9, #e9f6ee);
      border: 1px solid #d7cab0;
      margin-bottom: 18px;
    }
    .marca {
      color: #6d4c1d;
      font-size: 13px;
      font-weight: 900;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    h1 {
      margin: 0;
      font-size: 28px;
      line-height: 1.1;
    }
    h2 {
      margin: 0 0 10px;
      font-size: 18px;
      color: #24422f;
    }
    h3 {
      margin: 0 0 8px;
      font-size: 15px;
      color: #24422f;
    }
    .subtitulo {
      margin: 0;
      color: #56616b;
      max-width: 68ch;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-top: 10px;
    }
    .campo, section, article {
      background: #fffdf8;
      border: 1px solid #ded4bf;
      border-radius: 16px;
      padding: 14px;
    }
    .campo span {
      display: block;
      color: #68737d;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .04em;
    }
    .campo strong {
      display: block;
      margin-top: 2px;
      font-size: 15px;
    }
    .revisao {
      margin: 18px 0;
      background: #edf8f1;
      border-color: #b8d8c2;
    }
    .comentario {
      white-space: pre-wrap;
      margin: 0;
    }
    .insetos {
      display: grid;
      gap: 14px;
      margin-top: 18px;
    }
    article {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .resultado {
      display: inline-block;
      padding: 5px 9px;
      border-radius: 999px;
      background: #e8f4ed;
      color: #1f5f3d;
      font-weight: 900;
      font-size: 13px;
    }
    ol {
      margin: 8px 0 0;
      padding-left: 22px;
    }
    li {
      margin: 4px 0;
    }
    figure {
      margin: 12px 0 0;
    }
    img {
      max-width: 100%;
      max-height: 360px;
      object-fit: contain;
      border-radius: 14px;
      border: 1px solid #ded4bf;
      background: #f7f3ea;
    }
    figcaption {
      margin-top: 5px;
      color: #68737d;
      font-size: 12px;
    }
    .sem-dados {
      color: #68737d;
      font-style: italic;
    }
    .acoes-impressao {
      position: sticky;
      top: 0;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 10px 0;
      background: #f7f3ea;
      z-index: 2;
    }
    button {
      border: 0;
      border-radius: 999px;
      padding: 10px 14px;
      background: #315f3d;
      color: white;
      font-weight: 800;
      cursor: pointer;
    }
    @media print {
      body { background: white; }
      main { max-width: none; padding: 0; }
      .acoes-impressao { display: none; }
      header, .campo, section, article {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <main>
    <div class="acoes-impressao">
      <button onclick="window.print()">${escapeHtml(
        apresentacao.politicaExportacao.rotuloImprimirPdf
      )}</button>
    </div>
    <header>
      <div class="marca">${escapeHtml(apresentacao.marcaImpressao)}</div>
      <h1>${escapeHtml(apresentacao.tituloRelatorio)}</h1>
      <p class="subtitulo">${escapeHtml(apresentacao.subtituloImpressao)}</p>
      <div class="grid">
        ${campoImpressao("Código do relatório", codigo)}
        ${campoImpressao("Aluno", relatorio.alunoNome || "Não identificado")}
        ${campoImpressao("Turma", relatorio.turmaNome || "Não informada")}
        ${campoImpressao("Modo", modoTexto)}
        ${campoImpressao("Situação", statusTexto)}
        ${campoImpressao("Origem", relatorio.origem === "nuvem" ? "Nuvem" : "Este aparelho")}
        ${campoImpressao("Atualizado em", formatarData(relatorio.atualizadoEm))}
      </div>
    </header>

    ${revisao?.comentario ? secaoRevisaoImpressao(revisao, apresentacao) : ""}

    <section>
      <h2>Resumo da atividade</h2>
      <p>${escapeHtml(String(registros.length))} de ${escapeHtml(String(relatorio.totalInsetos || 0))} ${escapeHtml(apresentacao.rotuloItemPlural)} registrados.</p>
    </section>

    <div class="insetos">
      ${
        registros.length
          ? registros.map((item, indice) => itemImpressao(item, indice, apresentacao)).join("")
          : `<article><p class="sem-dados">Nenhum ${escapeHtml(apresentacao.rotuloItem)} foi registrado neste relatório.</p></article>`
      }
    </div>
  </main>
</body>
</html>`;
}

function obterApresentacaoRelatorio(relatorio) {
  return obterApresentacaoTipoRelatorio(inferirContextoTipoRelatorio(relatorio));
}

function campoImpressao(rotulo, valor) {
  return `<div class="campo"><span>${escapeHtml(rotulo)}</span><strong>${escapeHtml(valor)}</strong></div>`;
}

function secaoRevisaoImpressao(revisao, apresentacao) {
  return `<section class="revisao">
    <h2>${escapeHtml(apresentacao.politicaRevisao.titulo)}</h2>
    ${
      revisao.revisadoEm
        ? `<p><strong>${escapeHtml(apresentacao.politicaRevisao.rotuloRevisadoEm)}:</strong> ${escapeHtml(formatarData(revisao.revisadoEm))}</p>`
        : ""
    }
    <p class="comentario">${escapeHtml(revisao.comentario)}</p>
  </section>`;
}

function itemImpressao(item, indice, apresentacao) {
  const registro = Array.isArray(item.registro) ? item.registro : [];
  const ordemExibicao = formatarContextoChave(item.ordem);
  const secoesComplementares = obterSecoesComplementaresRelatorio(
    item,
    apresentacao
  );

  return `<article>
    <h2>${escapeHtml(apresentacao.rotuloItemCapitalizado)} ${escapeHtml(item.inseto || indice + 1)}</h2>
    ${ordemExibicao ? `<p><strong>${escapeHtml(apresentacao.rotuloContexto)}:</strong> ${escapeHtml(ordemExibicao)}</p>` : ""}
    <p><strong>${escapeHtml(obterRotuloResultadoRelatorio(apresentacao))}:</strong> <span class="resultado">${escapeHtml(item.resultado || "Resultado não informado")}</span></p>
    ${
      deveMostrarRegistroSequencial(apresentacao, item) && registro.length
        ? `<h3>${escapeHtml(apresentacao.rotuloCaminho)}</h3>
          <ol>
            ${registro
              .map(
                (passo) =>
                  `<li><strong>${escapeHtml(passo.passo || "Passo")}</strong> (${escapeHtml(
                    passo.alternativa || "alternativa"
                  )}) - ${escapeHtml(passo.escolha || "")}</li>`
              )
              .join("")}
          </ol>`
        : ""
    }
    ${secoesComplementaresHtml(secoesComplementares)}
    ${
      item.fotoUrl
        ? figuraImpressao(item, indice, apresentacao)
        : avisoFotoImpressao(item, apresentacao)
    }
  </article>`;
}

function secoesComplementaresHtml(secoes) {
  return (secoes || [])
    .map(
      (secao) => `<div>
        <h3>${escapeHtml(secao.titulo)}</h3>
        ${(secao.linhas || [])
          .map((linha) => `<p>${escapeHtml(linha)}</p>`)
          .join("")}
        ${
          secao.itens?.length
            ? `<ul>${secao.itens
                .map((valor) => `<li>${escapeHtml(valor)}</li>`)
                .join("")}</ul>`
            : ""
        }
      </div>`
    )
    .join("");
}

function figuraImpressao(item, indice, apresentacao) {
  return `<figure>
    <img src="${escapeHtml(item.fotoUrl)}" alt="${escapeHtml(apresentacao.rotuloFoto)} ${escapeHtml(item.inseto || indice + 1)}" />
    <figcaption>${escapeHtml(apresentacao.politicaFoto.legendaFigura)}</figcaption>
  </figure>`;
}

function avisoFotoImpressao(item, apresentacao) {
  if (!item.fotoPendente && !item.fotoInseto) return "";

  return `<p class="sem-dados">${escapeHtml(
    apresentacao.politicaFoto.avisoIndisponivel
  )}</p>`;
}

function deveMostrarRegistroSequencial(apresentacao, item) {
  if (apresentacao.tipo === "histologia-observacao") {
    return false;
  }

  return Array.isArray(item?.registro) && item.registro.length > 0;
}
