import DisciplinaLogo from "./DisciplinaLogo.jsx";
import StatusSistemaCard from "./StatusSistemaCard.jsx";

export default function PortalAluno({
  acesso,
  disciplinaId = "projeto-geral",
  onExit,
  onNewPractice,
  onOpenReports,
}) {
  const motivoLocal =
    acesso.motivoLocal ||
    "este acesso foi validado apenas com os dados locais deste aparelho. Saia e entre novamente depois de confirmar que os dados foram enviados para a nuvem.";

  return (
    <main className="aluno-portal-page" style={page} data-testid="portal-aluno-page">
      <section className="surface aluno-portal-card" style={card}>
        <div style={hero}>
          <DisciplinaLogo disciplinaId={disciplinaId} size={84} paddingRatio={0.04} />
          <div style={heroCopy}>
            <div style={kicker}>Área do aluno</div>
            <h1 style={title}>Olá, {acesso.aluno.nome}</h1>
            <p style={intro}>
              Turma: <strong>{acesso.turma.nome}</strong>
            </p>
            <div className="aluno-portal-badge" style={badge(acesso.online)}>
              {acesso.online ? "Acesso on-line" : "Acesso local"}
            </div>
          </div>
        </div>

        <div className="aluno-portal-actions" style={actions}>
          <button
            className="btn btn--success"
            onClick={onNewPractice}
            data-testid="portal-aluno-new-practice"
          >
            Nova prática
          </button>
          <button
            className="btn btn--primary"
            onClick={onOpenReports}
            data-testid="portal-aluno-open-reports"
          >
            Meus relatórios e rascunhos
          </button>
          <button className="btn btn--secondary" onClick={onExit}>
            Sair da área do aluno
          </button>
        </div>

        <StatusSistemaCard
          titulo="Situação do seu acesso"
          descricao="Use este resumo para saber se seus relatórios podem seguir para a nuvem ou se permanecerão somente neste dispositivo."
          destaque={acesso.online ? "positivo" : "info"}
          itens={[
            {
              rotulo: "Modo do aluno",
              valor: acesso.online ? "On-line" : "Local",
              tom: acesso.online ? "positivo" : "alerta",
              ajuda: acesso.online
                ? "A turma foi validada na nuvem e os relatórios podem ser enviados ao professor."
                : "A validação desta vez ficou restrita aos dados locais deste navegador.",
            },
            {
              rotulo: "Turma vinculada",
              valor: acesso.turma.nome,
              tom: "neutro",
              ajuda: "Todos os rascunhos e relatórios desta área ficam amarrados à turma mostrada aqui.",
            },
            {
              rotulo: "Envio ao professor",
              valor: acesso.online ? "Disponível" : "Aguardando nuvem",
              tom: acesso.online ? "positivo" : "alerta",
              ajuda: acesso.online
                ? "Conclua a prática e envie o relatório quando terminar."
                : "Saia e entre novamente depois que o professor confirmar a sincronização da turma.",
            },
          ]}
        />

        <p className="aluno-portal-help" style={help}>
          {acesso.online
            ? "Seus rascunhos ficam neste dispositivo e podem ser enviados ao professor pela nuvem."
            : `Seus rascunhos são salvos neste dispositivo. Motivo: ${motivoLocal}`}
        </p>

        {!acesso.online ? (
          <p className="aluno-portal-warning" style={warning}>
            Tentativa on-line não concluída: {motivoLocal}
          </p>
        ) : null}
      </section>
    </main>
  );
}

const page = {
  width: "min(760px, 100%)",
  margin: "0 auto",
  padding: "32px 20px 40px",
};
const card = {
  display: "grid",
  gap: 22,
  padding: 28,
  borderRadius: 28,
  border: "1px solid color-mix(in srgb, var(--color-border) 78%, white)",
  background:
    "linear-gradient(180deg, color-mix(in srgb, var(--color-surface) 95%, white), color-mix(in srgb, var(--color-surface-soft) 94%, white))",
  boxShadow: "0 28px 60px rgba(15, 23, 42, 0.09)",
};
const hero = {
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr)",
  gap: 18,
  alignItems: "center",
};
const heroCopy = { display: "grid", gap: 8 };
const kicker = {
  color: "var(--color-primary)",
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
};
const title = { margin: 0, fontSize: "clamp(2rem, 2.8vw, 2.8rem)", lineHeight: 1.02 };
const intro = { margin: 0, color: "var(--color-muted)", lineHeight: 1.5 };
const badge = (online) => ({
  display: "inline-block",
  marginTop: 4,
  padding: "6px 11px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 900,
  background: online
    ? "var(--color-success-soft)"
    : "var(--color-warning-soft)",
  color: online
    ? "var(--color-success-text)"
    : "var(--color-warning-text)",
});
const actions = { display: "grid", gap: 12 };
const help = {
  margin: 0,
  padding: 14,
  borderRadius: 16,
  background:
    "linear-gradient(135deg, color-mix(in srgb, var(--color-info-soft) 86%, white), color-mix(in srgb, var(--color-surface) 94%, white))",
  color: "var(--color-info-text)",
  border: "1px solid color-mix(in srgb, var(--color-info-soft) 60%, var(--color-border))",
  fontSize: 13,
  lineHeight: 1.5,
};
const warning = {
  margin: 0,
  padding: 14,
  borderRadius: 16,
  background:
    "linear-gradient(135deg, color-mix(in srgb, var(--color-warning-soft) 86%, white), color-mix(in srgb, var(--color-surface) 94%, white))",
  color: "var(--color-warning-text)",
  border: "1px solid color-mix(in srgb, var(--color-warning-soft) 60%, var(--color-border))",
  fontSize: 13,
  lineHeight: 1.5,
};
