import { useMemo, useState } from "react";

import simboloLasbio from "../assets/simbolo-lab-softwares-educacionais.svg";
import FotoAnotadaImagem from "../atividades/FotoAnotadaImagem.jsx";
import LabBioMark from "./LabBioMark.jsx";
import ResultadoCard from "./ResultadoIdentificacao.jsx";
import { obterExemploArtropodePorResultado } from "../data/artropodesExemplos.js";
import {
  normalizarFonteSeta,
  normalizarRotacaoSeta,
  normalizarTamanhoSeta,
  textoLegendaSeta,
} from "../atividades/fotoAnotadaModel.js";
import { formatarContextoChave } from "../utils/chaveRuntime.js";
import {
  obterRotuloResultadoRelatorio,
  obterSecoesComplementaresRelatorio,
} from "../utils/relatorioTipoDetalhes.js";
import { obterApresentacaoTipoRelatorio } from "../utils/tiposRelatorio.js";
import { escapeHtml, normalizar, safeFileName } from "../utils/text.js";

export default function RelatorioSessao({
  mode,
  aluno,
  totalInsetos,
  sessao,
  gabarito,
  problemasChaves,
  statusArmazenamento,
  contextoTipoRelatorio,
  envioAlunoDisponivel = false,
  onEnviarRelatorio,
  relatorioAtual = null,
  onBack,
  onResetSessao,
  onStatusChange,
}) {
  const isProva = mode === "prova";
  const [encerrada, setEncerrada] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [mensagemEnvio, setMensagemEnvio] = useState("");
  const [erroEnvio, setErroEnvio] = useState("");
  const apresentacao = useMemo(
    () =>
      obterApresentacaoTipoRelatorio({
        ...contextoTipoRelatorio,
        tituloDaChave:
          contextoTipoRelatorio?.tituloDaChave || sessao[0]?.titulo || "",
      }),
    [contextoTipoRelatorio, sessao]
  );
  const mostrarCorrecaoAutomatica =
    isProva && apresentacao.politicaAvaliacao.permiteCorrecaoAutomatica;

  const avaliacao = useMemo(() => {
    const itens = sessao.map((item) => {
      if (!apresentacao.politicaAvaliacao.permiteCorrecaoAutomatica) {
        return {
          ...item,
          esperadoOrdem: "",
          esperadoFamilia: "",
          temGabarito: false,
          acertouOrdem: null,
          acertouFamilia: null,
          acertou: null,
        };
      }

      const gabaritoItem = gabarito[item.inseto - 1];

      let esperadoOrdem = "";
      let esperadoFamilia = "";

      if (typeof gabaritoItem === "string") {
        const partes = gabaritoItem
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean);

        if (partes.length >= 2) {
          esperadoOrdem = partes[0] || "";
          esperadoFamilia = partes[1] || "";
        } else if (partes.length === 1) {
          esperadoFamilia = partes[0] || "";
        }
      } else if (gabaritoItem && typeof gabaritoItem === "object") {
        esperadoOrdem = gabaritoItem.ordem || "";
        esperadoFamilia = gabaritoItem.familia || "";
      }

      const temGabarito =
        Boolean(normalizar(esperadoOrdem)) ||
        Boolean(normalizar(esperadoFamilia));

      const acertouOrdem = esperadoOrdem
        ? normalizar(item.ordem) === normalizar(esperadoOrdem)
        : true;

      const acertouFamilia = esperadoFamilia
        ? normalizar(item.resultado) === normalizar(esperadoFamilia)
        : true;

      const acertou = temGabarito
        ? acertouOrdem && acertouFamilia
        : null;

      return {
        ...item,
        esperadoOrdem,
        esperadoFamilia,
        temGabarito,
        acertouOrdem,
        acertouFamilia,
        acertou,
      };
    });

    const totalCorrigidos = itens.filter((x) => x.temGabarito).length;
    const acertos = itens.filter((x) => x.acertou === true).length;

    const nota =
      totalCorrigidos > 0
        ? Number(((acertos / totalCorrigidos) * 10).toFixed(2))
        : null;

    const gabaritoPreenchido = gabarito.filter(Boolean).length;

    const gabaritoIncompleto =
      isProva &&
      apresentacao.politicaAvaliacao.permiteCorrecaoAutomatica &&
      gabaritoPreenchido < totalInsetos;

    return {
      itens,
      totalCorrigidos,
      acertos,
      nota,
      gabaritoPreenchido,
      gabaritoIncompleto,
    };
  }, [sessao, gabarito, totalInsetos, isProva, apresentacao]);

  const textoSessao = useMemo(() => {
    const linhas = [];

    linhas.push(apresentacao.tituloRelatorio.toUpperCase());

    if (aluno) linhas.push(`Aluno: ${aluno}`);

    linhas.push(`Modo: ${isProva ? "PROVA" : "PRÁTICA"}`);
    linhas.push(`${apresentacao.rotuloContagem}: ${sessao.length} de ${totalInsetos}`);

    if (mostrarCorrecaoAutomatica) {
      linhas.push(
        `${apresentacao.politicaAvaliacao.rotuloAcertos}: ${avaliacao.acertos} de ${avaliacao.totalCorrigidos}`
      );

      if (avaliacao.nota !== null) {
        linhas.push(
          `${apresentacao.politicaAvaliacao.rotuloNota}: ${avaliacao.nota}`
        );
      }

      if (avaliacao.gabaritoIncompleto) {
        linhas.push(
          preencherMensagemAvaliacao(
            apresentacao.politicaAvaliacao.mensagemGabaritoIncompleto,
            avaliacao.gabaritoPreenchido,
            totalInsetos
          )
        );
      }
    }

    if (problemasChaves?.length) {
      linhas.push("");
      linhas.push("PROBLEMAS DE VALIDAÇÃO DAS CHAVES:");
      problemasChaves.forEach((p) => linhas.push(`- ${p}`));
    }

    linhas.push("");

    avaliacao.itens.forEach((item) => {
      const ordemExibicao = formatarContextoChave(item.ordem);
      const secoesComplementares = obterSecoesComplementaresRelatorio(
        item,
        apresentacao
      );

      linhas.push(`${apresentacao.rotuloItemCapitalizado} ${item.inseto}`);

      if (ordemExibicao) {
        linhas.push(`${apresentacao.rotuloContexto}: ${ordemExibicao}`);
      }

      linhas.push(
        `${obterRotuloResultadoRelatorio(apresentacao)}: ${item.resultado}`
      );
      linhas.push(
        `${apresentacao.rotuloFoto}: ${
          item.fotoInseto
            ? apresentacao.politicaFoto.textoPresente
            : apresentacao.politicaFoto.textoAusente
        }`
      );

      const exemploArtropode = !item.fotoInseto
        ? obterExemploArtropodePorResultado(item.resultado || item.ordem)
        : null;

      if (exemploArtropode) {
        linhas.push(`Exemplo visual de referência: ${exemploArtropode.titulo}`);
      }

      if (mostrarCorrecaoAutomatica && item.temGabarito) {
        linhas.push(
          `${apresentacao.politicaAvaliacao.rotuloEsperado}: ${[
            item.esperadoOrdem,
            item.esperadoFamilia,
          ]
            .filter(Boolean)
            .join(" / ")}`
        );

        linhas.push(
          `${apresentacao.politicaAvaliacao.rotuloSituacao}: ${
            item.acertou
              ? apresentacao.politicaAvaliacao.valorAcerto
              : apresentacao.politicaAvaliacao.valorErro
          }`
        );
      }

      linhas.push(`${apresentacao.rotuloCaminho}:`);

      (item.registro || []).forEach((r, i) => {
        linhas.push(
          `${i + 1}. ${r.passo} (${r.alternativa}) - ${r.escolha}`
        );
      });

      secoesComplementares.forEach((secao) => {
        linhas.push(`${secao.titulo}:`);
        (secao.linhas || []).forEach((linha) => linhas.push(`- ${linha}`));
        (secao.itens || []).forEach((valor) => linhas.push(`- ${valor}`));
      });

      linhas.push("");
    });

    return linhas.join("\n");
  }, [
    sessao,
    aluno,
    apresentacao,
    isProva,
    mostrarCorrecaoAutomatica,
    totalInsetos,
    avaliacao,
    problemasChaves,
  ]);

  function baixarTXT() {
    const blob = new Blob([textoSessao], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${
      apresentacao.politicaExportacao.nomeArquivoBase
    }_${safeFileName(aluno || "aluno") || "aluno"}.txt`;

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
<title>${escapeHtml(apresentacao.tituloRelatorio)}</title>
<style>
  body {
    font-family: Arial, sans-serif;
    padding: 24px;
    color: #111827;
  }

  h1 {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .lab-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid #d1d5db;
  }

  .lab-header img {
    width: 64px;
    height: 64px;
    border-radius: 14px;
  }

  .lab-title {
    color: #1f4e5f;
    font-weight: 800;
    line-height: 1.2;
  }

  .lab-subtitle {
    margin-top: 4px;
    color: #475569;
    font-size: 12px;
    font-weight: 700;
  }

  pre {
    white-space: pre-wrap;
    line-height: 1.5;
    font-size: 13px;
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
  <header class="lab-header">
    <img src="${simboloLasbio}" alt="Símbolo do LABSED" />
    <div>
      <div class="lab-title">${escapeHtml(apresentacao.marcaImpressao)}</div>
      <div class="lab-subtitle">${escapeHtml(apresentacao.subtituloImpressao)}</div>
    </div>
  </header>
  <h1>${escapeHtml(apresentacao.tituloRelatorio)}</h1>
  <pre>${escapeHtml(textoSessao)}</pre>
  ${avaliacao.itens
    .map((item) => ({
      item,
      exemploArtropode: !item.fotoInseto
        ? obterExemploArtropodePorResultado(item.resultado || item.ordem)
        : null,
    }))
    .filter(({ item, exemploArtropode }) => item.fotoInseto || exemploArtropode)
    .map(
      ({ item, exemploArtropode }) => `
        <section style="margin-top:18px; page-break-inside:avoid;">
          <h2 style="font-size:16px;">${escapeHtml(
            item.fotoInseto
              ? `${apresentacao.rotuloFoto} ${item.inseto}`
              : `Exemplo visual de referência ${item.inseto}`
          )}</h2>
          ${
            item.fotoInseto
              ? montarFotoAnotadaHtml({
                  foto: item.fotoInseto,
                  setas: item.fotoInsetoSetas,
                  alt: `${apresentacao.rotuloFoto} ${item.inseto}`,
                })
              : montarFotoAnotadaHtml({
                  foto: exemploArtropode.src,
                  setas: [],
                  alt: exemploArtropode.legenda,
                })
          }
          ${
            exemploArtropode
              ? `<p style="font-size:12px;color:#475569;margin-top:8px;">${escapeHtml(
                  exemploArtropode.legenda
                )}</p>`
              : ""
          }
        </section>
      `
    )
    .join("")}
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

  async function concluir() {
    setEncerrada(true);
    setErroEnvio("");
    setMensagemEnvio("");
    onStatusChange?.("concluido");
  }

  async function enviarAoProfessor() {
    if (!relatorioAtual || !onEnviarRelatorio || enviando) return;

    setEncerrada(true);
    setErroEnvio("");
    setMensagemEnvio("");
    onStatusChange?.("concluido");
    setEnviando(true);

    try {
      await onEnviarRelatorio({
        ...relatorioAtual,
        status: "enviado",
      });
      setMensagemEnvio("Relatório enviado ao professor.");
    } catch (error) {
      onStatusChange?.("concluido");
      setErroEnvio(error?.message || "Não foi possível enviar o relatório ao professor.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="relatorio-sessao" style={container}>
      <header className="relatorio-sessao__cabecalho">
        <h2 style={{ textAlign: "center", marginBottom: 6 }}>
          {apresentacao.tituloRelatorio}
        </h2>

        <div style={labRelatorioHeader}>
          <LabBioMark />
        </div>
      </header>

      <div className="relatorio-sessao__resumo">
        {aluno ? (
          <div className="relatorio-sessao__resumo-card">
            <span>Aluno</span>
            <strong>{aluno}</strong>
          </div>
        ) : null}

        <div className="relatorio-sessao__resumo-card">
          <span>Modo</span>
          <strong>{isProva ? "PROVA" : "PRÁTICA"}</strong>
        </div>

        <div className="relatorio-sessao__resumo-card">
          <span>{apresentacao.rotuloContagem}</span>
          <strong>{sessao.length} de {totalInsetos}</strong>
        </div>
      </div>

      {mostrarCorrecaoAutomatica ? (
        <p className="relatorio-sessao__prova-resumo" style={provaResumo}>
          {apresentacao.politicaAvaliacao.rotuloAcertos}: {avaliacao.acertos} de{" "}
          {avaliacao.totalCorrigidos}
          {avaliacao.nota !== null
            ? ` | ${apresentacao.politicaAvaliacao.rotuloNota}: ${avaliacao.nota}`
            : ""}
        </p>
      ) : null}

      {mostrarCorrecaoAutomatica && avaliacao.gabaritoIncompleto ? (
        <div style={alertaGabarito}>
          ⚠️{" "}
          {preencherMensagemAvaliacao(
            apresentacao.politicaAvaliacao.mensagemGabaritoIncompleto,
            avaliacao.gabaritoPreenchido,
            totalInsetos
          )}
        </div>
      ) : null}

      {problemasChaves?.length > 0 ? (
        <div style={alertaProblemas}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>
            ⚠️ Problemas detectados nas chaves
          </div>

          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {problemasChaves.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="relatorio-sessao__acoes" style={acoes}>
        <button
          className="btn btn--export btn--compact"
          onClick={baixarTXT}
        >
          {apresentacao.politicaExportacao.rotuloBaixarTexto}
        </button>

        <button
          className="btn btn--export btn--compact"
          onClick={salvarPDFviaPrint}
        >
          {apresentacao.politicaExportacao.rotuloSalvarPdf}
        </button>

        {!isProva || encerrada ? (
          <button
            className="btn btn--secondary btn--compact"
            onClick={onBack}
          >
            ← Voltar
          </button>
        ) : null}

        <button
          className="btn btn--secondary btn--rounded"
          onClick={concluir}
          style={{ minWidth: 170 }}
        >
          Encerrar sessão
        </button>

        {relatorioAtual?.alunoId ? (
          <button
            className="btn btn--primary btn--rounded"
            disabled={!envioAlunoDisponivel || enviando}
            onClick={enviarAoProfessor}
            style={{ minWidth: 220 }}
            title={
              envioAlunoDisponivel
                ? "Concluir e enviar ao professor"
                : "Este envio só fica disponível quando a entrada do aluno foi validada on-line."
            }
          >
            {enviando ? "Enviando..." : "Concluir e enviar ao professor"}
          </button>
        ) : null}

        {!isProva || encerrada ? (
          <button
            className="btn btn--export btn--rounded"
            onClick={onResetSessao}
            style={{ minWidth: 210 }}
          >
            Finalizar e voltar ao início
          </button>
        ) : null}
      </div>

      {statusArmazenamento ? (
        <div style={armazenamentoInfo}>{statusArmazenamento}</div>
      ) : null}

      {mensagemEnvio ? (
        <div style={sucessoEnvioBox}>{mensagemEnvio}</div>
      ) : null}

      {erroEnvio ? (
        <div style={erroEnvioBox}>{erroEnvio}</div>
      ) : null}

      {encerrada ? (
        <div style={sessaoEncerrada}>
          ✅ Sessão encerrada - salve ou exporte o relatório antes de sair.
        </div>
      ) : null}

      {avaliacao.itens.length === 0 ? (
        <div style={vazio}>
          Nenhum {apresentacao.rotuloItem} registrado ainda.
        </div>
      ) : (
        avaliacao.itens.map((item, index) => {
          const ordemExibicao = formatarContextoChave(item.ordem);
          const exemploArtropode = !item.fotoInseto
            ? obterExemploArtropodePorResultado(item.resultado || item.ordem)
            : null;
          const secoesComplementares = obterSecoesComplementaresRelatorio(
            item,
            apresentacao
          );

          return (
          <article
            className="relatorio-sessao__item"
            key={`${item.inseto}-${index}`}
            style={{ marginBottom: 22 }}
          >
            <ResultadoCard
              tag={`${apresentacao.rotuloItemCapitalizado} ${item.inseto}`}
              tituloResultado={item.resultado}
              isProva={isProva}
              aluno={item.aluno || aluno}
              ordemContextoAtual={ordemExibicao}
              caminhoTaxonomico={[
                ordemExibicao,
                item.resultado,
              ].filter(Boolean)}
              registro={item.registro || []}
              caminhoPercorrido={
                (item.registro || [])
                  .map(
                    (r, i) =>
                      `${i + 1}. ${r.passo} (${r.alternativa})`
                  )
                  .join(" -> ")
              }
              mostrarExportacao={false}
              mostrarAcoes={false}
            >
              {secoesComplementares.length ? (
                <div style={secoesComplementaresBox}>
                  {secoesComplementares.map((secao) => (
                    <div key={secao.titulo} style={secaoComplementarItem}>
                      <div style={secaoComplementarTitulo}>{secao.titulo}</div>
                      {(secao.linhas || []).map((linha) => (
                        <div key={linha} style={secaoComplementarLinha}>
                          {linha}
                        </div>
                      ))}
                      {(secao.itens || []).map((valor) => (
                        <div key={valor} style={secaoComplementarLinha}>
                          • {valor}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : null}

              {mostrarCorrecaoAutomatica && item.temGabarito ? (
                <div
                  style={{
                    ...resultadoAvaliacao,
                    background: item.acertou
                      ? "rgba(220, 252, 231, 0.8)"
                      : "rgba(254, 226, 226, 0.8)",
                    border: item.acertou
                      ? "1px solid #22c55e"
                      : "1px solid #ef4444",
                    color: item.acertou
                      ? "#166534"
                      : "#991b1b",
                  }}
                >
                  {item.acertou
                    ? apresentacao.politicaAvaliacao.valorAcerto
                    : apresentacao.politicaAvaliacao.valorErro}

                  <div style={resultadoEsperado}>
                    {apresentacao.politicaAvaliacao.rotuloEsperado}:{" "}
                    {[item.esperadoOrdem, item.esperadoFamilia]
                      .filter(Boolean)
                      .join(" / ")}
                  </div>
                </div>
              ) : null}

              {item.fotoInseto ? (
                <div style={fotoRelatorioBox}>
                  <div style={fotoRelatorioTitulo}>{apresentacao.rotuloFoto}</div>
                  <FotoAnotadaImagem
                    foto={item.fotoInseto}
                    alt={`${apresentacao.rotuloFoto} ${item.inseto}`}
                    setas={item.fotoInsetoSetas || []}
                    containerStyle={fotoAnotadaRelatorioContainer}
                    frameStyle={fotoAnotadaRelatorioFrame}
                    imagemStyle={fotoRelatorioImg}
                  />
                </div>
              ) : exemploArtropode ? (
                <div style={fotoRelatorioBox}>
                  <div style={fotoRelatorioTitulo}>Exemplo visual de referência</div>
                  <div style={exemploFotoBox}>
                    <img
                      src={exemploArtropode.src}
                      alt={exemploArtropode.legenda}
                      style={exemploFotoImg}
                      loading="lazy"
                    />
                    <div style={exemploFotoTexto}>
                      <strong>{exemploArtropode.titulo}</strong>
                      <span>{exemploArtropode.legenda}</span>
                      <small>
                        A imagem é apenas referência inicial; substitua pela foto do
                        material observado quando houver registro do aluno.
                      </small>
                    </div>
                  </div>
                </div>
              ) : null}
            </ResultadoCard>
          </article>
          );
        })
      )}
    </div>
  );
}

function preencherMensagemAvaliacao(template, preenchido, total) {
  return String(template || "")
    .replace("{preenchido}", String(preenchido))
    .replace("{total}", String(total));
}

function montarFotoAnotadaHtml({ foto, setas = [], alt }) {
  return `<div class="foto-frame">
    <img src="${foto}" alt="${escapeHtml(alt)}" />
    ${(setas || [])
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

const container = {
  maxWidth: 980,
  margin: "28px auto",
  padding: 24,
  fontFamily: "Arial, sans-serif",
  background: "color-mix(in srgb, var(--color-surface) 96%, transparent)",
  border: "1px solid var(--color-border)",
  borderRadius: 24,
  boxShadow: "var(--shadow-lg)",
};

const labRelatorioHeader = {
  display: "flex",
  justifyContent: "center",
  margin: "0 auto 18px",
  paddingBottom: 16,
  borderBottom: "1px solid var(--color-border)",
};

const provaResumo = {
  textAlign: "center",
  fontWeight: 700,
  color: "var(--color-text)",
};

const alertaGabarito = {
  marginBottom: 16,
  padding: 12,
  background: "var(--color-warning-soft)",
  border: "1px solid var(--color-warning-border)",
  borderRadius: 12,
  color: "var(--color-warning-text)",
  fontWeight: 600,
  textAlign: "center",
};

const alertaProblemas = {
  marginBottom: 16,
  padding: 12,
  background: "var(--color-danger-soft)",
  border: "1px solid var(--color-danger-border)",
  borderRadius: 12,
  color: "var(--color-danger-text)",
};

const acoes = {
  display: "flex",
  gap: 10,
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: 18,
};

const sessaoEncerrada = {
  marginTop: 12,
  marginBottom: 16,
  padding: 14,
  background: "var(--color-success-soft)",
  border: "1px solid var(--color-success-border)",
  borderRadius: 14,
  textAlign: "center",
  fontWeight: 600,
  color: "var(--color-success-text)",
};

const armazenamentoInfo = {
  marginBottom: 16,
  padding: 12,
  borderRadius: 12,
  textAlign: "center",
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  color: "var(--color-muted)",
  fontSize: 13,
  fontWeight: 650,
};

const sucessoEnvioBox = {
  marginTop: 10,
  padding: "10px 12px",
  borderRadius: 12,
  background: "var(--color-success-soft)",
  color: "var(--color-success-text)",
  fontWeight: 700,
};

const erroEnvioBox = {
  marginTop: 10,
  padding: "10px 12px",
  borderRadius: 12,
  background: "var(--color-danger-soft)",
  color: "var(--color-danger-text)",
  fontWeight: 700,
};

const vazio = {
  textAlign: "center",
  opacity: 0.75,
  padding: 16,
  borderRadius: 14,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const resultadoAvaliacao = {
  marginTop: 14,
  padding: 12,
  borderRadius: 12,
  fontWeight: 800,
  textAlign: "center",
};

const resultadoEsperado = {
  marginTop: 6,
  fontSize: 13,
  fontWeight: 600,
};

const fotoRelatorioBox = {
  marginTop: 14,
  padding: 12,
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const fotoRelatorioTitulo = {
  marginBottom: 8,
  color: "var(--color-text)",
  fontWeight: 850,
  fontSize: 14,
};

const fotoAnotadaRelatorioContainer = {
  display: "grid",
  placeItems: "center",
  width: "100%",
  background: "var(--color-bg-soft)",
  borderRadius: 10,
  overflow: "auto",
};

const fotoAnotadaRelatorioFrame = {
  cursor: "default",
};

const fotoRelatorioImg = {
  display: "block",
  width: "100%",
  maxHeight: 360,
  objectFit: "contain",
  borderRadius: 10,
  background: "var(--color-bg-soft)",
};

const exemploFotoBox = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 14,
  alignItems: "center",
};

const exemploFotoImg = {
  width: "100%",
  maxHeight: 180,
  objectFit: "contain",
  borderRadius: 10,
  background: "var(--color-bg-soft)",
  border: "1px solid var(--color-border)",
};

const exemploFotoTexto = {
  display: "grid",
  gap: 6,
  color: "var(--color-muted)",
  lineHeight: 1.45,
};

const secoesComplementaresBox = {
  display: "grid",
  gap: 10,
  marginTop: 12,
};

const secaoComplementarItem = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "rgba(255, 255, 255, 0.55)",
};

const secaoComplementarTitulo = {
  marginBottom: 6,
  color: "var(--color-text)",
  fontWeight: 800,
  fontSize: 14,
};

const secaoComplementarLinha = {
  color: "var(--color-text-secondary)",
  fontSize: 14,
  lineHeight: 1.45,
};
