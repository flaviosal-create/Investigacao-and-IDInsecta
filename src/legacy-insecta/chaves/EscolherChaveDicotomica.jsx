import LogoMark from "../components/LogoMark.jsx";

export default function EscolherChaveDicotomica({
  onSelectInsecta,
  onSelectArthropoda,
  onBack,
}) {
  return (
    <div className="config-sessao-page chave-escolha-page">
      <div className="chave-escolha-brand">
        <LogoMark />
        <p>
          Plataforma educacional baseada em observação, evidência e sustentação de hipóteses.
        </p>
      </div>

      <section className="surface chave-escolha-card" aria-labelledby="chave-escolha-title">
        <h1 id="chave-escolha-title">Modo Chave Dicotômica</h1>
        <p className="chave-escolha-intro">
          Escolha o universo da chave que será usado para conduzir a identificação.
        </p>

        <div className="chave-escolha-options">
          <button
            className="chave-escolha-option"
            type="button"
            onClick={onSelectInsecta}
          >
            <strong>Chave dicotômica de Insecta</strong>
            <span>Identificação de ordens de insetos.</span>
          </button>
          <button
            className="chave-escolha-option"
            type="button"
            onClick={onSelectArthropoda}
          >
            <strong>Chave dicotômica de Arthropoda</strong>
            <span>Identificação dos principais grupos de artrópodes.</span>
          </button>
        </div>

        <button className="chave-escolha-back" type="button" onClick={onBack}>
          Voltar
        </button>
      </section>
    </div>
  );
}
