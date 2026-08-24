import { useMemo, useState } from "react";

export default function RoteiroPratica({ roteiro }) {
  const [secaoAtiva, setSecaoAtiva] = useState(0);

  const secoes = Array.isArray(roteiro?.secoes) ? roteiro.secoes : [];
  const secaoAtual = secoes[secaoAtiva] || secoes[0];

  const metadados = useMemo(
    () =>
      [
        ["Disciplina", roteiro?.disciplina],
        ["Atividade", roteiro?.atividade],
        ["Duração", roteiro?.duracao],
        ["Público", roteiro?.publico],
      ].filter(([, valor]) => valor),
    [roteiro],
  );

  if (!roteiro || !secoes.length) return null;

  return (
    <article className="roteiro-pratica" style={container}>
      <section className="roteiro-pratica__hero" style={hero}>
        <span style={marca}>Roteiro de prática</span>
        <h2 style={titulo}>{roteiro.titulo}</h2>
        <p style={resumo}>{roteiro.resumo}</p>

        {metadados.length ? (
          <div className="roteiro-pratica__meta-grid" style={metaGrid}>
            {metadados.map(([rotulo, valor]) => (
              <div key={rotulo} style={metaItem}>
                <span style={metaRotulo}>{rotulo}</span>
                <strong>{valor}</strong>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* Stepper compacto com dropdown */}
      <nav className="roteiro-pratica__stepper" style={stepperNav} aria-label="Navegação de seções">
        {/* Botão anterior */}
        <button
          type="button"
          className="btn btn--compact"
          style={stepperButton}
          onClick={() => setSecaoAtiva(Math.max(0, secaoAtiva - 1))}
          disabled={secaoAtiva === 0}
          aria-label="Seção anterior"
        >
          ‹
        </button>

        {/* Contador de seção */}
        <div style={stepperCounter}>
          {secaoAtiva + 1} de {secoes.length}
        </div>

        {/* Dropdown com todas as seções */}
        <select
          className="roteiro-pratica__selector"
          style={stepperSelect}
          value={secaoAtiva}
          onChange={(e) => setSecaoAtiva(Number(e.target.value))}
          aria-label="Ir para seção"
        >
          {secoes.map((secao, idx) => (
            <option key={secao.titulo} value={idx}>
              {idx + 1}. {secao.titulo}
            </option>
          ))}
        </select>

        {/* Botão próximo */}
        <button
          type="button"
          className="btn btn--compact"
          style={stepperButton}
          onClick={() => setSecaoAtiva(Math.min(secoes.length - 1, secaoAtiva + 1))}
          disabled={secaoAtiva === secoes.length - 1}
          aria-label="Próxima seção"
        >
          ›
        </button>
      </nav>

      <section className="roteiro-pratica__conteudo" style={conteudo}>
        <h3 style={secaoTitulo}>{secaoAtual.titulo}</h3>
        {secaoAtual.texto ? <p style={texto}>{secaoAtual.texto}</p> : null}
        {Array.isArray(secaoAtual.itens) && secaoAtual.itens.length ? (
          <ul style={lista}>
            {secaoAtual.itens.map((item) => (
              <li key={item} style={listaItem}>
                <span style={marcador}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </article>
  );
}

const container = {
  display: "grid",
  gap: 12,
  textAlign: "left",
};

const hero = {
  display: "grid",
  gap: 8,
  padding: 14,
  borderRadius: 14,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
};

const marca = {
  color: "var(--color-secondary)",
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const titulo = {
  margin: 0,
  fontSize: 22,
  lineHeight: 1.12,
};

const resumo = {
  margin: 0,
  color: "var(--color-muted)",
  lineHeight: 1.45,
};

const metaGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
  gap: 6,
  marginTop: 6,
};

const metaItem = {
  display: "grid",
  gap: 1,
  padding: "6px 8px",
  borderRadius: 8,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  fontSize: 13,
};

const metaRotulo = {
  color: "var(--color-muted)",
  fontSize: 10,
  fontWeight: 800,
  letterSpacing: "0.02em",
};

const conteudo = {
  padding: 14,
  borderRadius: 14,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-sm)",
};

const secaoTitulo = {
  margin: "4px 0 8px",
  fontSize: 19,
  lineHeight: 1.18,
};

const texto = {
  margin: 0,
  color: "var(--color-muted)",
  lineHeight: 1.55,
};

const lista = {
  display: "grid",
  gap: 8,
  margin: 0,
  padding: 0,
  listStyle: "none",
};

const listaItem = {
  display: "grid",
  gridTemplateColumns: "18px 1fr",
  gap: 6,
  color: "var(--color-muted)",
  lineHeight: 1.45,
};

const marcador = {
  color: "var(--color-primary)",
  fontWeight: 900,
};

/* ====================== Stepper Compacto ====================== */

const stepperNav = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: 8,
  borderRadius: 12,
  background: "var(--color-surface-soft)",
  border: "1px solid var(--color-border)",
  marginBottom: 2,
};

const stepperButton = {
  minWidth: 32,
  minHeight: 32,
  padding: "0 6px",
  borderRadius: 8,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
  fontSize: 18,
  fontWeight: 700,
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};


const stepperCounter = {
  fontSize: 11,
  color: "var(--color-muted)",
  fontWeight: 600,
};

const stepperSelect = {
  padding: "6px 8px",
  borderRadius: 8,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease",
  minWidth: 90,
  flex: "1 1 90px",
};
