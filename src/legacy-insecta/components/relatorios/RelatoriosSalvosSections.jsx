import ResultadoCard from "../ResultadoIdentificacao.jsx";
import { formatarContextoChave } from "../../utils/chaveRuntime.js";
import { obterSecoesComplementaresRelatorio } from "../../utils/relatorioTipoDetalhes.js";
import {
  codigoRelatorio,
  formatarCaminhoCurto,
  formatarData,
  formatarIndicadorResumo,
  status,
  statusAcompanhamento,
} from "../../utils/relatoriosApresentacao.js";

export function AcompanhamentoTurma({
  acompanhamento,
  filtro,
  onAbrirRelatorio,
  onCopiarFaltantes,
  onFiltrar,
  onSelecionarTurma,
  turmaSelecionadaId,
}) {
  const linhasFiltradas = acompanhamento.linhas.filter((linha) => {
    if (filtro === "faltando") {
      return ["faltando", "rascunho", "pendente"].includes(linha.situacao.tipo);
    }
    if (filtro === "enviados") {
      return ["enviado", "revisado"].includes(linha.situacao.tipo);
    }
    if (filtro === "revisados") {
      return linha.situacao.tipo === "revisado";
    }
    return true;
  });

  return (
    <details className="relatorios-drawer relatorios-acompanhamento" style={acompanhamentoBox}>
      <summary style={drawerSummary}>
        Acompanhamento da turma
        <span style={drawerSummaryMeta}>
          {acompanhamento.enviados}/{acompanhamento.total} enviados
        </span>
      </summary>

      <div className="relatorios-acompanhamento-topo" style={acompanhamentoTopo}>
        <div>
          <p style={acompanhamentoIntro}>
            Visão rápida de quem já enviou, quem foi revisado e quem ainda
            precisa concluir ou enviar o relatório.
          </p>
          {acompanhamento.resumoTipos.length ? (
            <div style={resumoTipoLinha}>
              {acompanhamento.resumoTipos.map((item) => (
                <span
                  key={item.tipo}
                  style={item.quantidade > 0 ? indicadorResumoBadge : tipoResumoBadge}
                >
                  {item.rotulo}: {item.quantidade}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <label style={filtroLabel}>
          Turma
          <select
            className="field-control"
            value={turmaSelecionadaId}
            onChange={(event) => onSelecionarTurma(event.target.value)}
          >
            {acompanhamento.turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.nome}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="relatorios-resumo-grid" style={resumoGrid}>
        <ResumoCard rotulo="Alunos" valor={acompanhamento.total} />
        <ResumoCard rotulo="Enviaram" valor={acompanhamento.enviados} />
        <ResumoCard rotulo="Revisados" valor={acompanhamento.revisados} />
        <ResumoCard rotulo="Faltando" valor={acompanhamento.faltando} />
      </div>

      <div className="relatorios-acompanhamento-ferramentas" style={acompanhamentoFerramentas}>
        <div className="relatorios-abas" style={abasAcompanhamento}>
          {[
            ["todos", "Todos"],
            ["faltando", "Faltando"],
            ["enviados", "Enviados"],
            ["revisados", "Revisados"],
          ].map(([valor, rotulo]) => (
            <button
              key={valor}
              type="button"
              className={
                filtro === valor
                  ? "btn btn--primary btn--compact"
                  : "btn btn--secondary btn--compact"
              }
              onClick={() => onFiltrar(valor)}
            >
              {rotulo}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="btn btn--export btn--compact"
          onClick={onCopiarFaltantes}
        >
          Copiar faltantes
        </button>
      </div>

      <div style={acompanhamentoLista}>
        {linhasFiltradas.length ? (
          linhasFiltradas.map(({ aluno, relatorio, resumoRapido, situacao }) => (
            <div className="relatorios-acompanhamento-linha" key={aluno.id} style={acompanhamentoLinha}>
              <div>
                <strong>{aluno.nome || "Aluno sem nome"}</strong>
                <div style={meta}>
                  {relatorio
                    ? `${codigoRelatorio(relatorio)} · ${formatarData(relatorio.atualizadoEm)} · ${relatorio.origem === "nuvem" ? "nuvem" : "este aparelho"}`
                    : "Nenhum relatório encontrado"}
                </div>
                {relatorio && resumoRapido ? (
                  <>
                    <div style={resumoTipoLinha}>
                      <span style={tipoResumoBadge}>{resumoRapido.tituloTipo}</span>
                      {resumoRapido.indicadores
                        .map(formatarIndicadorResumo)
                        .filter(Boolean)
                        .map((indicador) => (
                          <span key={indicador} style={indicadorResumoBadge}>
                            {indicador}
                          </span>
                        ))}
                    </div>
                    <div style={resumoSecundarioMeta}>
                      {resumoRapido.resumoPrincipal} · {resumoRapido.resumoSecundario}
                    </div>
                  </>
                ) : null}
              </div>
              <div className="relatorios-acompanhamento-acoes" style={acompanhamentoAcoes}>
                <span style={statusAcompanhamento(situacao.tipo)}>
                  {situacao.rotulo}
                </span>
                {relatorio ? (
                  <button
                    type="button"
                    className="btn btn--secondary btn--compact"
                    onClick={() => onAbrirRelatorio(relatorio)}
                  >
                    Abrir relatório
                  </button>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <div style={detalhesVazio}>
            {acompanhamento.linhas.length
              ? "Nenhum aluno corresponde ao filtro selecionado."
              : "Esta turma ainda não possui alunos cadastrados."}
          </div>
        )}
      </div>
    </details>
  );
}

export function DetalhesRelatorio({ relatorio, apresentacao }) {
  const registros = Array.isArray(relatorio.sessao) ? relatorio.sessao : [];
  const codigo = codigoRelatorio(relatorio);
  const relatorioHistologia = apresentacao.tipo === "histologia-observacao";

  if (registros.length === 0) {
    return (
      <div style={detalhesBox}>
        <div style={detalhesTitulo}>Detalhes do {codigo}</div>
        <p style={detalhesVazio}>
          Nenhum {apresentacao.rotuloItem} foi registrado neste relatório.
        </p>
      </div>
    );
  }

  return (
    <div className="relatorios-detalhes" style={detalhesBox}>
      <div style={detalhesTitulo}>Detalhes do {codigo}</div>
      <div style={detalhesLista}>
        {registros.map((item, indice) => {
          const ordemExibicao = formatarContextoChave(item.ordem);
          const secoesComplementares = obterSecoesComplementaresRelatorio(
            item,
            apresentacao
          );

          return (
            relatorioHistologia ? (
              <article
                key={`${item.inseto || indice}-${item.resultado || "resultado"}`}
                style={detalheHistologiaCard}
              >
                <div style={detalheHistologiaTag}>
                  {apresentacao.rotuloItemCapitalizado} {item.inseto || indice + 1}
                </div>
                <h3 style={detalheHistologiaTitulo}>
                  {item.resultado || "Resultado não informado"}
                </h3>
                {ordemExibicao ? (
                  <div style={detalheHistologiaMeta}>
                    <strong>{apresentacao.rotuloContexto}:</strong> {ordemExibicao}
                  </div>
                ) : null}

                {secoesComplementares.length ? (
                  <div style={detalhesComplementaresBox}>
                    {secoesComplementares.map((secao) => (
                      <div key={secao.titulo} style={detalheComplementarCard}>
                        <div style={detalheComplementarTitulo}>{secao.titulo}</div>
                        {(secao.linhas || []).map((linha) => (
                          <div key={linha} style={detalheComplementarLinha}>
                            {linha}
                          </div>
                        ))}
                        {(secao.itens || []).map((valor) => (
                          <div key={valor} style={detalheComplementarLinha}>
                            • {valor}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}

                {item.fotoUrl ? (
                  <div style={fotoBox}>
                    <div style={fotoTitulo}>{apresentacao.rotuloFoto}</div>
                    <img
                      src={item.fotoUrl}
                      alt={`${apresentacao.rotuloFoto} ${item.inseto || indice + 1}`}
                      style={fotoImg}
                    />
                  </div>
                ) : item.fotoPendente || item.fotoInseto ? (
                  <div style={fotoAviso}>
                    {apresentacao.politicaFoto.avisoIndisponivel}
                  </div>
                ) : null}
              </article>
            ) : (
              <ResultadoCard
                key={`${item.inseto || indice}-${item.resultado || "resultado"}`}
                tag={`${apresentacao.rotuloItemCapitalizado} ${item.inseto || indice + 1}`}
                tituloResultado={item.resultado || "Resultado não informado"}
                isProva={relatorio.mode === "prova"}
                aluno={relatorio.alunoNome}
                ordemContextoAtual={ordemExibicao}
                caminhoTaxonomico={[ordemExibicao, item.resultado].filter(Boolean)}
                registro={Array.isArray(item.registro) ? item.registro : []}
                caminhoPercorrido={formatarCaminhoCurto(item.registro)}
                mostrarExportacao={false}
                mostrarAcoes={false}
              >
                {secoesComplementares.length ? (
                  <div style={detalhesComplementaresBox}>
                    {secoesComplementares.map((secao) => (
                      <div key={secao.titulo} style={detalheComplementarCard}>
                        <div style={detalheComplementarTitulo}>{secao.titulo}</div>
                        {(secao.linhas || []).map((linha) => (
                          <div key={linha} style={detalheComplementarLinha}>
                            {linha}
                          </div>
                        ))}
                        {(secao.itens || []).map((valor) => (
                          <div key={valor} style={detalheComplementarLinha}>
                            • {valor}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}

                {item.fotoUrl ? (
                  <div style={fotoBox}>
                    <div style={fotoTitulo}>{apresentacao.rotuloFoto}</div>
                    <img
                      src={item.fotoUrl}
                      alt={`${apresentacao.rotuloFoto} ${item.inseto || indice + 1}`}
                      style={fotoImg}
                    />
                  </div>
                ) : item.fotoPendente || item.fotoInseto ? (
                  <div style={fotoAviso}>
                    {apresentacao.politicaFoto.avisoIndisponivel}
                  </div>
                ) : null}
              </ResultadoCard>
            )
          );
        })}
      </div>
    </div>
  );
}

export function RevisaoProfessor({
  apresentacao,
  feedback,
  onChange,
  onSalvar,
  podeEditar,
  relatorio,
  salvando,
}) {
  const revisao = relatorio.revisaoProfessor || null;
  const valor = feedback ?? revisao?.comentario ?? "";

  if (!podeEditar && !revisao?.comentario) {
    return null;
  }

  return (
    <section className="relatorios-revisao" style={revisaoBox}>
      <div className="relatorios-revisao-topo" style={revisaoTopo}>
        <div>
          <div style={revisaoTitulo}>{apresentacao.politicaRevisao.titulo}</div>
          <div style={revisaoMeta}>
            {revisao?.revisadoEm
              ? `${apresentacao.politicaRevisao.rotuloRevisadoEm} ${formatarData(revisao.revisadoEm)}`
              : apresentacao.politicaRevisao.mensagemVazia}
          </div>
        </div>
        {relatorio.status === "revisado" ? (
          <span style={status("revisado")}>Revisado</span>
        ) : null}
      </div>

      {podeEditar ? (
        <>
          <textarea
            className="field-control"
            rows={4}
            value={valor}
            onChange={(event) => onChange(event.target.value)}
            placeholder={apresentacao.politicaRevisao.placeholder}
            style={revisaoTextarea}
          />
          <div style={revisaoAcoes}>
            <button
              type="button"
              className="btn btn--primary btn--compact"
              disabled={salvando || !valor.trim()}
              onClick={onSalvar}
            >
              {salvando ? "Salvando..." : apresentacao.politicaRevisao.rotuloSalvar}
            </button>
          </div>
        </>
      ) : (
        <p style={revisaoComentario}>{revisao.comentario}</p>
      )}
    </section>
  );
}

export function ResumoCard({ rotulo, valor }) {
  return (
    <div style={resumoCard}>
      <strong style={resumoValor}>{valor}</strong>
      <span>{rotulo}</span>
    </div>
  );
}

const meta = { color: "var(--color-muted)", fontSize: 13, lineHeight: 1.45 };
const resumoSecundarioMeta = {
  ...meta,
  marginTop: 4,
  color: "var(--color-text-secondary)",
};
const resumoTipoLinha = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  marginTop: 8,
};
const tipoResumoBadge = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  padding: "4px 8px",
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
  fontSize: 11,
  fontWeight: 900,
};
const indicadorResumoBadge = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  padding: "4px 8px",
  background: "rgba(255,255,255,0.7)",
  border: "1px solid var(--color-border)",
  color: "var(--color-muted)",
  fontSize: 11,
  fontWeight: 800,
};
const acompanhamentoBox = {
  marginTop: 16,
  padding: 14,
  borderRadius: 18,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};
const drawerSummary = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  cursor: "pointer",
  color: "var(--color-text)",
  fontWeight: 900,
  listStylePosition: "inside",
};
const drawerSummaryMeta = {
  marginLeft: "auto",
  borderRadius: 999,
  padding: "4px 8px",
  background: "var(--color-surface)",
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 850,
  whiteSpace: "nowrap",
};
const acompanhamentoTopo = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  alignItems: "flex-start",
  flexWrap: "wrap",
};
const acompanhamentoIntro = {
  margin: "4px 0 0",
  color: "var(--color-muted)",
  lineHeight: 1.45,
  maxWidth: 620,
};
const filtroLabel = {
  display: "grid",
  gap: 5,
  fontSize: 12,
  fontWeight: 800,
  color: "var(--color-muted)",
};
const resumoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: 10,
  marginTop: 12,
};
const resumoCard = {
  display: "grid",
  gap: 4,
  padding: 12,
  borderRadius: 14,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  textAlign: "center",
};
const resumoValor = { fontSize: 22, lineHeight: 1, color: "var(--color-text)" };
const acompanhamentoFerramentas = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 10,
  marginTop: 12,
};
const abasAcompanhamento = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};
const acompanhamentoLista = {
  display: "grid",
  gap: 8,
  marginTop: 12,
};
const acompanhamentoLinha = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "center",
  padding: 12,
  borderRadius: 14,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
};
const acompanhamentoAcoes = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 8,
};
const detalhesBox = {
  marginTop: 12,
  padding: 12,
  borderRadius: 14,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};
const detalhesTitulo = {
  fontWeight: 900,
  marginBottom: 10,
  color: "var(--color-text)",
};
const detalhesLista = {
  display: "grid",
  gap: 14,
};

const detalheHistologiaCard = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 18,
  padding: 18,
  display: "grid",
  gap: 12,
};

const detalheHistologiaTag = {
  fontSize: 12,
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  color: "var(--color-info)",
};

const detalheHistologiaTitulo = {
  margin: 0,
  fontSize: 24,
  lineHeight: 1.15,
  color: "var(--color-primary)",
};

const detalheHistologiaMeta = {
  color: "var(--color-text-soft)",
  fontSize: 14,
};
const detalhesVazio = {
  margin: 0,
  color: "var(--color-muted)",
  fontSize: 13,
};
const detalhesComplementaresBox = {
  display: "grid",
  gap: 10,
  margin: "12px 0",
};
const detalheComplementarCard = {
  padding: 10,
  borderRadius: 12,
  background: "rgba(255, 255, 255, 0.68)",
  border: "1px solid var(--color-border)",
};
const detalheComplementarTitulo = {
  marginBottom: 6,
  fontWeight: 800,
  fontSize: 13,
  color: "var(--color-text)",
};
const detalheComplementarLinha = {
  color: "var(--color-text-secondary)",
  fontSize: 13,
  lineHeight: 1.45,
};
const fotoAviso = {
  margin: "12px 0",
  padding: 10,
  borderRadius: 12,
  background: "var(--color-info-soft)",
  color: "var(--color-info-text)",
  fontSize: 13,
  lineHeight: 1.5,
};
const fotoBox = {
  margin: "12px 0",
  padding: 10,
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};
const fotoTitulo = {
  marginBottom: 8,
  fontSize: 13,
  fontWeight: 850,
  color: "var(--color-text)",
};
const fotoImg = {
  display: "block",
  width: "100%",
  maxHeight: 420,
  objectFit: "contain",
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-soft)",
};
const revisaoBox = {
  marginTop: 12,
  padding: 14,
  borderRadius: 16,
  background: "var(--color-info-soft)",
  border: "1px solid var(--color-border)",
};
const revisaoTopo = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "flex-start",
};
const revisaoTitulo = {
  fontWeight: 900,
  color: "var(--color-text)",
};
const revisaoMeta = {
  marginTop: 4,
  color: "var(--color-muted)",
  fontSize: 13,
};
const revisaoTextarea = {
  marginTop: 12,
};
const revisaoAcoes = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 10,
};
const revisaoComentario = {
  margin: "12px 0 0",
  whiteSpace: "pre-wrap",
};
