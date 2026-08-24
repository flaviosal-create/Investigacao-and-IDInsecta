import { useMemo, useState } from "react";

import {
  arvoreTaxonomica,
  buscarNaArvoreTaxonomica,
  encontrarTaxon,
} from "../utils/taxonomia.js";

const RANK_LABELS = {
  filo: "Filo",
  classe: "Classe",
  ordem: "Ordem",
  subordem: "Subordem",
  família: "Família",
  subfamília: "Subfamília",
  categoria: "Categoria didática",
};

export default function NavegadorTaxonomico({ onBack, onOpenKey }) {
  const [taxonId, setTaxonId] = useState(arvoreTaxonomica.uid);
  const [busca, setBusca] = useState("");
  const atual = encontrarTaxon(arvoreTaxonomica, taxonId) || arvoreTaxonomica;
  const resultados = useMemo(
    () => buscarNaArvoreTaxonomica(arvoreTaxonomica, busca).slice(0, 40),
    [busca]
  );
  const mostrandoBusca = busca.trim().length > 0;

  function abrirCaminho(index) {
    const uid = atual.caminhoIds.slice(0, index + 1).join("/");
    const node = encontrarTaxon(arvoreTaxonomica, uid);
    if (node) setTaxonId(node.uid);
  }

  return (
    <main className="tax-browser">
      <header className="tax-browser__hero">
        <button className="btn btn--secondary btn--compact" onClick={onBack}>
          ← Voltar
        </button>
        <div>
          <span className="tax-browser__eyebrow">Navegação visual</span>
          <h1>Árvore taxonômica</h1>
          <p>
            Explore por níveis, sem precisar abrir a moita taxonômica inteira
            de uma vez.
          </p>
        </div>
      </header>

      <section className="tax-browser__panel">
        <label className="tax-browser__search">
          <span>Buscar ordem, família ou subfamília</span>
          <input
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Ex.: Coleoptera, Muscidae, Nymphalinae"
          />
        </label>

        {!mostrandoBusca ? (
          <>
            <nav className="tax-browser__breadcrumbs" aria-label="Caminho taxonômico">
              {atual.caminho.map((nome, index) => (
                <button
                  key={`${nome}-${index}`}
                  type="button"
                  onClick={() => abrirCaminho(index)}
                >
                  {nome}
                </button>
              ))}
            </nav>

            <div className="tax-browser__current">
              <div>
                <span className={`tax-rank tax-rank--${atual.rank}`}>
                  {RANK_LABELS[atual.rank] || atual.rank}
                </span>
                <h2>{atual.nome}</h2>
                <p>
                  {atual.filhos.length
                    ? `${atual.filhos.length} grupos no próximo nível · ${atual.totalDescendentes} itens abaixo deste ramo`
                    : "Este é um resultado terminal na árvore atual."}
                </p>
              </div>

              {atual.chave ? (
                <button
                  className="btn btn--primary"
                  onClick={() => onOpenKey(atual.chave)}
                >
                  Abrir chave de {atual.nome}
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <div className="tax-browser__search-summary">
            {resultados.length
              ? `${resultados.length} resultado(s) exibido(s)`
              : "Nenhum táxon encontrado."}
          </div>
        )}

        <div className="tax-browser__grid">
          {(mostrandoBusca ? resultados : atual.filhos).map((node) => (
            <article className="tax-card" key={node.uid}>
              <div className="tax-card__top">
                <span className={`tax-rank tax-rank--${node.rank}`}>
                  {RANK_LABELS[node.rank] || node.rank}
                </span>
                {node.filhos.length ? (
                  <span className="tax-card__count">{node.filhos.length} ramos</span>
                ) : null}
              </div>
              <h3>{node.nome}</h3>
              {mostrandoBusca ? (
                <p className="tax-card__path">{node.caminho.join(" › ")}</p>
              ) : null}
              <div className="tax-card__actions">
                {node.filhos.length ? (
                  <button
                    className="btn btn--secondary btn--compact"
                    onClick={() => {
                      setTaxonId(node.uid);
                      setBusca("");
                    }}
                  >
                    Explorar ramo
                  </button>
                ) : (
                  <span className="tax-card__terminal">Resultado terminal</span>
                )}
                {node.chave ? (
                  <button
                    className="tax-card__key"
                    onClick={() => onOpenKey(node.chave)}
                  >
                    Abrir chave
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
