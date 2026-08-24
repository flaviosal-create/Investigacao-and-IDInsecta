import { podeRetomarRelatorio } from "../utils/relatoriosLocais.js";
import { useSavedReports } from "../hooks/useSavedReports.js";
import {
  inferirContextoTipoRelatorio,
  obterApresentacaoTipoRelatorio,
} from "../utils/tiposRelatorio.js";
import { obterResumoListaRelatorio } from "../utils/relatorioTipoDetalhes.js";
import {
  baixarTextoRelatorioSalvo,
  imprimirRelatorioSalvo,
} from "../utils/relatoriosExportacao.js";
import {
  codigoRelatorio,
  formatarData,
  formatarIndicadorResumo,
  rotuloStatus,
  status,
} from "../utils/relatoriosApresentacao.js";
import {
  AcompanhamentoTurma,
  DetalhesRelatorio,
  RevisaoProfessor,
  ResumoCard,
} from "./relatorios/RelatoriosSalvosSections.jsx";

export default function RelatoriosSalvos({
  ambiente,
  authSession,
  disciplinaId,
  remotoAtivo,
  onBack,
  onEnviarRelatorio,
  onListarRelatoriosRemotos,
  onRevisarRelatorio,
  onRetomarRelatorio,
  alunoFiltroId = "",
}) {
  const {
    abaAtivaRelatorios,
    abasRelatorios,
    acompanhamento,
    abrirRelatorioDoAcompanhamento,
    atualizarFiltro,
    carregando,
    copiarFaltantesAcompanhamento,
    enviar,
    erro,
    feedbacks,
    filtroAcompanhamento,
    filtros,
    mensagem,
    nomesTurmas,
    opcoesFiltro,
    relatorioAbertoId,
    relatorios,
    relatoriosFiltrados,
    remover,
    resumo,
    revisar,
    revisandoId,
    setAbaRelatorios,
    setFeedbacks,
    setFiltroAcompanhamento,
    setFiltros,
    setRelatorioAbertoId,
    setTurmaAcompanhamentoId,
  } = useSavedReports({
    ambiente,
    authSession,
    disciplinaId,
    remotoAtivo,
    onEnviarRelatorio,
    onListarRelatoriosRemotos,
    onRevisarRelatorio,
    alunoFiltroId,
  });

  return (
    <main style={container} data-testid="relatorios-page">
      <section className="surface relatorios-card" style={card}>
        <RelatoriosCabecalho alunoFiltroId={alunoFiltroId} onBack={onBack} />

        {carregando ? <p>Carregando relatórios...</p> : null}
        {erro ? <div style={erroStyle}>{erro}</div> : null}
        {mensagem ? <div style={sucessoStyle}>{mensagem}</div> : null}

        {abasRelatorios.length > 1 ? (
          <nav className="relatorios-abas" style={abasNavegacao} aria-label="Áreas de relatórios">
            {abasRelatorios.map(([id, rotulo]) => (
              <button
                key={id}
                type="button"
                className={
                  abaAtivaRelatorios === id
                    ? "btn btn--primary btn--compact"
                    : "btn btn--secondary btn--compact"
                }
                onClick={() => setAbaRelatorios(id)}
              >
                {rotulo}
              </button>
            ))}
          </nav>
        ) : null}

        {abaAtivaRelatorios === "relatorios" ? (
          <ListaRelatoriosScreen
            alunoFiltroId={alunoFiltroId}
            relatorios={relatorios}
            resumo={resumo}
            relatoriosFiltrados={relatoriosFiltrados}
            filtros={filtros}
            atualizarFiltro={atualizarFiltro}
            opcoesFiltro={opcoesFiltro}
            setFiltros={setFiltros}
            carregando={carregando}
            erro={erro}
            relatorioAbertoId={relatorioAbertoId}
            setRelatorioAbertoId={setRelatorioAbertoId}
            nomesTurmas={nomesTurmas}
            feedbacks={feedbacks}
            setFeedbacks={setFeedbacks}
            revisar={revisar}
            onRevisarRelatorio={onRevisarRelatorio}
            revisandoId={revisandoId}
            onRetomarRelatorio={onRetomarRelatorio}
            remotoAtivo={remotoAtivo}
            authSession={authSession}
            enviar={enviar}
            remover={remover}
          />
        ) : null}

        {!alunoFiltroId && acompanhamento.turma && abaAtivaRelatorios === "acompanhamento" ? (
          <AcompanhamentoTurma
            acompanhamento={acompanhamento}
            filtro={filtroAcompanhamento}
            onAbrirRelatorio={abrirRelatorioDoAcompanhamento}
            onCopiarFaltantes={copiarFaltantesAcompanhamento}
            onFiltrar={setFiltroAcompanhamento}
            onSelecionarTurma={setTurmaAcompanhamentoId}
            turmaSelecionadaId={acompanhamento.turma.id}
          />
        ) : null}
      </section>
    </main>
  );
}

function RelatoriosCabecalho({ alunoFiltroId, onBack }) {
  return (
    <div className="relatorios-cabecalho" style={cabecalho}>
      <div>
        <h2 style={titulo}>
          {alunoFiltroId ? "Meus relatórios" : "Relatórios armazenados"}
        </h2>
        <p style={intro}>
          Rascunhos locais podem ser retomados neste aparelho. Quando a conta ou
          o acesso do aluno estiver on-line, relatórios concluídos também podem
          ser enviados ao professor.
        </p>
      </div>
      <button className="btn btn--secondary btn--compact" onClick={onBack}>
        ← Voltar
      </button>
    </div>
  );
}

function ListaRelatoriosScreen(props) {
  const {
    alunoFiltroId,
    relatorios,
    resumo,
    relatoriosFiltrados,
    filtros,
    atualizarFiltro,
    opcoesFiltro,
    setFiltros,
    carregando,
    erro,
    relatorioAbertoId,
    setRelatorioAbertoId,
    nomesTurmas,
    feedbacks,
    setFeedbacks,
    revisar,
    onRevisarRelatorio,
    revisandoId,
    onRetomarRelatorio,
    remotoAtivo,
    authSession,
    enviar,
    remover,
  } = props;

  return (
    <>
      {!alunoFiltroId && relatorios.length > 0 ? (
        <div className="relatorios-resumo-grid" style={resumoGrid}>
          <ResumoCard rotulo="Total" valor={resumo.total} />
          <ResumoCard rotulo="Na nuvem" valor={resumo.nuvem} />
          <ResumoCard rotulo="Enviados" valor={resumo.enviados} />
          <ResumoCard rotulo="Concluídos locais" valor={resumo.concluidos} />
          <ResumoCard rotulo="Rascunhos" valor={resumo.rascunhos} />
        </div>
      ) : null}

      {!alunoFiltroId && relatorios.length > 0 ? (
        <FiltrosRelatoriosDrawer
          filtros={filtros}
          atualizarFiltro={atualizarFiltro}
          opcoesFiltro={opcoesFiltro}
          total={relatorios.length}
          filtrados={relatoriosFiltrados.length}
          onLimpar={() =>
            setFiltros({ turmaId: "", alunoId: "", status: "", origem: "", busca: "" })
          }
        />
      ) : null}

      {!carregando && !erro && relatorios.length === 0 ? (
        <div style={vazio}>Nenhum relatório foi armazenado ainda.</div>
      ) : null}

      {!carregando && !erro && relatorios.length > 0 && relatoriosFiltrados.length === 0 ? (
        <div style={vazio}>Nenhum relatório corresponde aos filtros selecionados.</div>
      ) : null}

      <div className="relatorios-lista" style={lista}>
        {relatoriosFiltrados.map((relatorio) => (
          <RelatorioListaItem
            key={relatorio.id}
            relatorio={relatorio}
            aberto={relatorioAbertoId === relatorio.id}
            onAlternar={() =>
              setRelatorioAbertoId((atual) =>
                atual === relatorio.id ? "" : relatorio.id
              )
            }
            nomesTurmas={nomesTurmas}
            feedback={feedbacks[relatorio.id]}
            onChangeFeedback={(valor) =>
              setFeedbacks((atuais) => ({
                ...atuais,
                [relatorio.id]: valor,
              }))
            }
            onRevisar={() => revisar(relatorio)}
            podeEditarRevisao={
              !alunoFiltroId &&
              relatorio.origem === "nuvem" &&
              Boolean(onRevisarRelatorio)
            }
            revisando={revisandoId === relatorio.id}
            onRetomar={() => onRetomarRelatorio?.(relatorio)}
            remotoAtivo={remotoAtivo}
            authSession={authSession}
            alunoFiltroId={alunoFiltroId}
            onEnviar={() => enviar(relatorio)}
            onRemover={() => remover(relatorio.id)}
          />
        ))}
      </div>
    </>
  );
}

function FiltrosRelatoriosDrawer({
  filtros,
  atualizarFiltro,
  opcoesFiltro,
  total,
  filtrados,
  onLimpar,
}) {
  return (
    <details className="relatorios-drawer" style={drawerBox}>
      <summary style={drawerSummary}>
        Filtrar relatórios
        <span style={drawerSummaryMeta}>
          {filtrados} de {total}
        </span>
      </summary>
      <div className="relatorios-filtros" style={filtrosBox}>
        <label style={filtroLabel}>
          Buscar
          <input
            className="field-control"
            value={filtros.busca}
            onChange={(event) => atualizarFiltro("busca", event.target.value)}
            placeholder="Aluno, turma, status..."
          />
        </label>

        <label style={filtroLabel}>
          Turma
          <select
            className="field-control"
            value={filtros.turmaId}
            onChange={(event) => atualizarFiltro("turmaId", event.target.value)}
          >
            <option value="">Todas</option>
            {opcoesFiltro.turmas.map(([id, nome]) => (
              <option key={id} value={id}>{nome}</option>
            ))}
          </select>
        </label>

        <label style={filtroLabel}>
          Aluno
          <select
            className="field-control"
            value={filtros.alunoId}
            onChange={(event) => atualizarFiltro("alunoId", event.target.value)}
          >
            <option value="">Todos</option>
            {opcoesFiltro.alunos.map(([id, nome]) => (
              <option key={id} value={id}>{nome}</option>
            ))}
          </select>
        </label>

        <label style={filtroLabel}>
          Status
          <select
            className="field-control"
            value={filtros.status}
            onChange={(event) => atualizarFiltro("status", event.target.value)}
          >
            <option value="">Todos</option>
            <option value="rascunho">Rascunho</option>
            <option value="concluido">Concluído</option>
            <option value="enviado">Enviado</option>
            <option value="revisado">Revisado</option>
          </select>
        </label>

        <label style={filtroLabel}>
          Origem
          <select
            className="field-control"
            value={filtros.origem}
            onChange={(event) => atualizarFiltro("origem", event.target.value)}
          >
            <option value="">Todas</option>
            <option value="nuvem">Nuvem</option>
            <option value="local">Este aparelho</option>
          </select>
        </label>

        <button
          type="button"
          className="btn btn--secondary btn--compact"
          onClick={onLimpar}
        >
          Limpar filtros
        </button>
      </div>
    </details>
  );
}

function RelatorioListaItem({
  relatorio,
  aberto,
  onAlternar,
  nomesTurmas,
  feedback,
  onChangeFeedback,
  onRevisar,
  podeEditarRevisao,
  revisando,
  onRetomar,
  remotoAtivo,
  authSession,
  alunoFiltroId,
  onEnviar,
  onRemover,
}) {
  const podeEnviar =
    relatorio.status === "concluido" &&
    (relatorio.origem !== "nuvem" || Boolean(alunoFiltroId));
  const codigo = codigoRelatorio(relatorio);
  const apresentacao = obterApresentacaoTipoRelatorio(
    inferirContextoTipoRelatorio(relatorio)
  );
  const resumoRapido = obterResumoListaRelatorio(relatorio, apresentacao);

  return (
    <article className="relatorios-item" style={item}>
      <div className="relatorios-item-topo" style={itemTopo}>
        <div>
          <div style={identificacaoRelatorioLinha}>
            <span style={codigoRelatorioBadge}>{codigo}</span>
            <strong>{relatorio.alunoNome || "Aluno não identificado"}</strong>
          </div>
          <div style={meta}>
            {nomesTurmas[relatorio.turmaId] || relatorio.turmaNome || "Sem turma"}
            {" · "}
            {relatorio.mode === "prova" ? "Prova" : "Prática"}
          </div>
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
        </div>
        <span style={status(relatorio.status)}>
          {rotuloStatus(relatorio.status)}
        </span>
      </div>

      <div style={meta}>
        {resumoRapido.resumoPrincipal}
        {" · "}
        atualizado em {formatarData(relatorio.atualizadoEm)}
        {" · "}
        {relatorio.origem === "nuvem" ? "na nuvem" : "neste aparelho"}
      </div>
      <div style={resumoSecundarioMeta}>{resumoRapido.resumoSecundario}</div>

      {aberto ? (
        <>
          <DetalhesRelatorio relatorio={relatorio} apresentacao={apresentacao} />
          <RevisaoProfessor
            apresentacao={apresentacao}
            feedback={feedback}
            onChange={onChangeFeedback}
            onSalvar={onRevisar}
            podeEditar={podeEditarRevisao}
            relatorio={relatorio}
            salvando={revisando}
          />
        </>
      ) : null}

      <div className="relatorios-acoes" style={acoes}>
        <button className="btn btn--secondary btn--compact" onClick={onAlternar}>
          {aberto ? "Ocultar detalhes" : "Ver detalhes"}
        </button>

        {podeRetomarRelatorio(relatorio) ? (
          <button className="btn btn--success btn--compact" onClick={onRetomar}>
            Continuar atividade
          </button>
        ) : null}

        {podeEnviar ? (
          <button
            className="btn btn--primary btn--compact"
            disabled={!(remotoAtivo ?? Boolean(authSession?.user))}
            title={
              remotoAtivo ?? Boolean(authSession?.user)
                ? alunoFiltroId
                  ? "Enviar para a conta do professor"
                  : "Enviar para a nuvem"
                : "Entre on-line para enviar"
            }
            onClick={onEnviar}
          >
            {alunoFiltroId ? "Enviar ao professor" : "Enviar para a nuvem"}
          </button>
        ) : null}

        {aberto ? (
          <details className="relatorios-drawer relatorios-drawer--acoes" style={drawerAcoesBox}>
            <summary style={drawerAcoesSummary}>Mais opções</summary>
            <div style={acoesSecundarias}>
              <button
                className="btn btn--export btn--compact"
                onClick={() => baixarTextoRelatorioSalvo(relatorio)}
              >
                {apresentacao.politicaExportacao.rotuloBaixarTexto}
              </button>
              <button
                className="btn btn--export btn--compact"
                onClick={() => imprimirRelatorioSalvo(relatorio)}
              >
                {apresentacao.politicaExportacao.rotuloImprimirPdf}
              </button>
              {relatorio.origem !== "nuvem" ? (
                <button className="btn btn--secondary btn--compact" onClick={onRemover}>
                  Remover deste aparelho
                </button>
              ) : null}
            </div>
          </details>
        ) : null}

        {!aberto && relatorio.origem !== "nuvem" ? (
          <button className="btn btn--secondary btn--compact" onClick={onRemover}>
            Remover deste aparelho
          </button>
        ) : null}
      </div>
    </article>
  );
}

const container = { maxWidth: 980, margin: "24px auto", padding: "0 12px 24px" };
const card = { padding: 22, borderRadius: 20 };
const cabecalho = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 16,
  flexWrap: "wrap",
};
const titulo = { margin: 0 };
const intro = { color: "var(--color-muted)", maxWidth: 620, lineHeight: 1.5 };
const abasNavegacao = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 8,
  marginTop: 16,
};
const resumoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
  gap: 10,
  marginTop: 18,
};
const drawerBox = {
  marginTop: 14,
  padding: 12,
  borderRadius: 16,
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
const filtrosBox = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 10,
  alignItems: "end",
  marginTop: 14,
  padding: 12,
  borderRadius: 16,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};
const filtroLabel = {
  display: "grid",
  gap: 5,
  fontSize: 12,
  fontWeight: 800,
  color: "var(--color-muted)",
};
const lista = { display: "grid", gap: 12, marginTop: 18 };
const item = {
  padding: 16,
  border: "1px solid var(--color-border)",
  borderRadius: 14,
  background: "var(--color-surface)",
};
const itemTopo = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "flex-start",
  marginBottom: 8,
};
const identificacaoRelatorioLinha = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 8,
};
const codigoRelatorioBadge = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  padding: "4px 8px",
  background: "var(--color-info-soft)",
  color: "var(--color-info-text)",
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.03em",
  whiteSpace: "nowrap",
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
const meta = { color: "var(--color-muted)", fontSize: 13, lineHeight: 1.45 };
const resumoSecundarioMeta = {
  ...meta,
  marginTop: 4,
  color: "var(--color-text-secondary)",
};
const acoes = {
  display: "flex",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 12,
};
const drawerAcoesBox = {
  flexBasis: "100%",
  width: "100%",
  marginTop: 2,
  padding: 10,
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};
const drawerAcoesSummary = {
  cursor: "pointer",
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 900,
  listStylePosition: "inside",
  textTransform: "uppercase",
};
const acoesSecundarias = {
  display: "flex",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 10,
};
const vazio = {
  marginTop: 18,
  padding: 16,
  textAlign: "center",
  border: "1px dashed var(--color-border)",
  borderRadius: 14,
  color: "var(--color-muted)",
};
const erroStyle = {
  padding: 12,
  borderRadius: 12,
  background: "var(--color-danger-soft)",
  color: "var(--color-danger-text)",
};
const sucessoStyle = {
  padding: 12,
  borderRadius: 12,
  background: "var(--color-success-soft)",
  color: "var(--color-success-text)",
};
