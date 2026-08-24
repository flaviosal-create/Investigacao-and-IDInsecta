import { useMemo } from "react";

import {
  normalizarFonteSeta,
  normalizarRotacaoSeta,
  normalizarTamanhoSeta,
  textoLegendaSeta,
} from "../atividades/fotoAnotadaModel.js";
import { escapeHtml, safeFileName } from "../utils/text.js";

export function useRelatorioIdentificacao({
  aluno,
  caminhoTaxonomico,
  fotoInseto,
  fotoInsetoSetas = [],
  insetoIndex,
  isProva,
  ordemContextoAtual,
  registro,
  result,
  rotuloFoto = "Foto do inseto",
  titulo,
}) {
  const caminhoDetalhado = useMemo(() => {
    return registro
      .map((r, i) => `${i + 1}. ${r.passo} (${r.alternativa}) - ${r.escolha}`)
      .join("\n");
  }, [registro]);

  const relatorioTexto = useMemo(() => {
    const linhas = [];

    linhas.push("RELATÓRIO DA IDENTIFICAÇÃO");
    linhas.push(`Título: ${titulo}`);

    if (aluno) linhas.push(`Aluno: ${aluno}`);
    if (ordemContextoAtual) {
      linhas.push(`Contexto/Ordem: ${ordemContextoAtual}`);
    }

    if (caminhoTaxonomico.length > 0) {
      linhas.push(`Caminho taxonômico: ${caminhoTaxonomico.join(" > ")}`);
    }

    linhas.push(`Modo: ${isProva ? "PROVA" : "PRÁTICA"}`);
    linhas.push(`${rotuloFoto}: ${fotoInseto ? "anexada" : "não anexada"}`);
    if (fotoInsetoSetas.length) {
      linhas.push(`Anotações na foto: ${fotoInsetoSetas.length}`);
    }
    linhas.push("");
    linhas.push("CAMINHO PERCORRIDO:");
    linhas.push(caminhoDetalhado || "Nenhum passo registrado.");
    linhas.push("");

    if (result) linhas.push(`RESULTADO FINAL: ${result}`);

    return linhas.join("\n");
  }, [
    aluno,
    caminhoDetalhado,
    caminhoTaxonomico,
    fotoInseto,
    fotoInsetoSetas,
    isProva,
    ordemContextoAtual,
    result,
    rotuloFoto,
    titulo,
  ]);

  function baixarTXT() {
    const blob = new Blob([relatorioTexto], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio_inseto_${insetoIndex}_${safeFileName(
      aluno || "aluno"
    )}.txt`;

    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function salvarPDFviaPrint() {
    const html = `<!doctype html>
<html lang="pt-br">
<head>
<meta charset="utf-8" />
<title>Relatório</title>
<style>
 body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
 h1 { font-size: 18px; margin: 0 0 8px 0; }
 .meta { color:#444; margin-bottom: 12px; font-size: 13px; }
 .resultado {
   margin-top: 14px;
   padding-top: 10px;
   border-top: 1px solid #ccc;
   font-weight: bold;
 }
 .bloco {
   margin-top: 12px;
   padding: 10px;
   background: #f8fafc;
   border: 1px solid #e2e8f0;
   border-radius: 10px;
 }
 .linha-caminho {
   margin-bottom: 6px;
   line-height: 1.45;
   word-break: break-word;
 }
 .foto-frame {
   position: relative;
   display: inline-block;
   max-width: 100%;
   border: 1px solid #d1d5db;
   border-radius: 10px;
   overflow: hidden;
 }
 .foto-frame img {
   display: block;
   max-width: 100%;
   max-height: 520px;
   object-fit: contain;
 }
 .arrow {
   position: absolute;
   height: 0;
   border-top: 4px solid currentColor;
   transform-origin: right center;
 }
 .arrow::after {
   content: "";
   position: absolute;
   right: -1px;
   top: -8px;
   border-left: 14px solid currentColor;
   border-top: 6px solid transparent;
   border-bottom: 6px solid transparent;
 }
 .label {
   position: absolute;
   left: 0;
   top: 0;
   width: max-content;
   max-width: 220px;
   transform: translate(6px, -50%) rotate(calc(-1 * var(--seta-rotacao, 0deg)));
   transform-origin: left center;
   padding: 4px 7px;
   border: 1px solid;
   border-radius: 8px;
   background: rgba(255,255,255,.92);
   box-shadow: 0 6px 16px rgba(15,23,42,.16);
   font-size: var(--fonte-tamanho, 12px);
   font-weight: 700;
   line-height: 1.2;
   color: #111827;
   overflow-wrap: break-word;
 }
</style>
</head>
<body>
 <h1>Relatório da Identificação</h1>

 <div class="meta">
   <div><b>Inseto:</b> ${insetoIndex}</div>
   <div><b>Título:</b> ${escapeHtml(titulo)}</div>
   ${aluno ? `<div><b>Aluno:</b> ${escapeHtml(aluno)}</div>` : ""}
   ${
     ordemContextoAtual
       ? `<div><b>Contexto/Ordem:</b> ${escapeHtml(ordemContextoAtual)}</div>`
       : ""
   }
   ${
     caminhoTaxonomico.length
       ? `<div><b>Caminho taxonômico:</b> ${escapeHtml(
           caminhoTaxonomico.join(" > ")
         )}</div>`
       : ""
   }
   <div><b>Modo:</b> ${isProva ? "PROVA" : "PRÁTICA"}</div>
 </div>

 <div class="bloco">
   <b>Caminho percorrido:</b>
   ${
     registro.length
       ? registro
           .map(
             (r, idx) => `
     <div class="linha-caminho">
       ${idx + 1}. <b>${escapeHtml(r.passo)}</b> (${escapeHtml(
                 r.alternativa
               )}) - ${escapeHtml(r.escolha)}
     </div>
   `
           )
           .join("")
       : `<div class="linha-caminho">Nenhum passo registrado.</div>`
   }
 </div>

 ${
   result
     ? `<div class="resultado">RESULTADO FINAL: ${escapeHtml(result)}</div>`
     : ""
 }
 ${
   fotoInseto
     ? `<div class="bloco">
          <b>${escapeHtml(rotuloFoto)}:</b>
          <div style="margin-top:10px;">
            ${montarFotoAnotadaHtml({
              foto: fotoInseto,
              setas: fotoInsetoSetas,
              alt: rotuloFoto,
            })}
          </div>
        </div>`
     : ""
 }
</body>
</html>`;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } finally {
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 1000);
      }
    }, 300);
  }

  return {
    baixarTXT,
    relatorioTexto,
    salvarPDFviaPrint,
  };
}

function montarFotoAnotadaHtml({ foto, setas = [], alt }) {
  return `<div class="foto-frame">
    <img src="${foto}" alt="${escapeHtml(alt)}" />
    ${setas
      .map((seta) => {
        const tamanho = normalizarTamanhoSeta(seta.tamanho);
        const rotacao = normalizarRotacaoSeta(seta.rotacao);
        const fonteTamanho = normalizarFonteSeta(seta.fonteTamanho);
        const texto = textoLegendaSeta(seta);

        return `<span class="arrow" style="left:${seta.x}%; top:${seta.y}%; width:${tamanho}px; color:${seta.cor}; --seta-rotacao:${rotacao}deg; --fonte-tamanho:${fonteTamanho}px; transform:translate(-${tamanho}px, -2px) rotate(${rotacao}deg);">${
          texto
            ? `<span class="label" style="border-color:${seta.cor};">${escapeHtml(texto)}</span>`
            : ""
        }</span>`;
      })
      .join("")}
  </div>`;
}
