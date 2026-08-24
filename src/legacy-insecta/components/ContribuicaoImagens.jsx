import { useEffect, useMemo, useState } from "react";

import {
  enviarContribuicaoImagem,
  listarContribuicoesParaModeracao,
  listarContribuicoesImagem,
  moderarContribuicaoImagem,
  retirarContribuicaoImagem,
  TERMO_CONTRIBUICAO_VERSAO,
  TIPOS_ASSET_CONTRIBUIDO,
  verificarModeradorContribuicoes,
} from "../services/assetsContribuidos.js";

const LICENCAS = [
  {
    valor: "LABSED_NAO_EXCLUSIVA",
    rotulo: "Autorização não exclusiva ao LABSED",
    descricao:
      "Você mantém os direitos autorais e autoriza armazenamento, exibição e uso educacional no aplicativo, com atribuição.",
  },
  {
    valor: "CC_BY_4_0",
    rotulo: "Creative Commons CC BY 4.0",
    descricao:
      "Permite compartilhamento e adaptação, inclusive comercial, com atribuição.",
  },
  {
    valor: "CC_BY_SA_4_0",
    rotulo: "Creative Commons CC BY-SA 4.0",
    descricao:
      "Exige atribuição e que adaptações sejam distribuídas sob a mesma licença.",
  },
  {
    valor: "CC0_1_0",
    rotulo: "CC0 1.0 / domínio público",
    descricao:
      "Permite reutilização ampla sem exigência de atribuição, embora o crédito continue registrado.",
  },
];

export default function ContribuicaoImagens({ session }) {
  const userId = session?.user?.id;
  const [tipoAsset, setTipoAsset] = useState("imagem");
  const [arquivo, setArquivo] = useState(null);
  const [taxon, setTaxon] = useState("");
  const [legenda, setLegenda] = useState("");
  const [autor, setAutor] = useState("");
  const [fonteUrl, setFonteUrl] = useState("");
  const [licenca, setLicenca] = useState("LABSED_NAO_EXCLUSIVA");
  const [declaracaoAceita, setDeclaracaoAceita] = useState(false);
  const [contribuicoes, setContribuicoes] = useState([]);
  const [contribuicoesModeracao, setContribuicoesModeracao] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [observacoes, setObservacoes] = useState({});
  const [podeModerar, setPodeModerar] = useState(false);
  const [processando, setProcessando] = useState(false);
  const [processandoModeracao, setProcessandoModeracao] = useState("");
  const [aba, setAba] = useState("enviar");

  const preview = useMemo(
    () => (arquivo ? URL.createObjectURL(arquivo) : ""),
    [arquivo]
  );

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    if (!userId) return;

    listarContribuicoesImagem(userId)
      .then(setContribuicoes)
      .catch((error) => setErro(traduzirErro(error)));

    verificarModeradorContribuicoes(userId)
      .then((autorizado) => {
        setPodeModerar(autorizado);
        if (!autorizado) return [];
        return listarContribuicoesParaModeracao(userId);
      })
      .then((lista) => {
        if (Array.isArray(lista)) setContribuicoesModeracao(lista);
      })
      .catch((error) => setErro(traduzirErro(error)));
  }, [userId]);

  async function enviar(event) {
    event.preventDefault();
    const formularioAtual = event.currentTarget;
    setErro("");
    setMensagem("");
    setProcessando(true);

    try {
      const nova = await enviarContribuicaoImagem({
        arquivo,
        autor,
        declaracaoAceita,
        fonteUrl,
        legenda,
        licenca,
        taxon,
        tipo: tipoAsset,
        userId,
      });
      const atualizadas = await listarContribuicoesImagem(userId);
      setContribuicoes(atualizadas);
      setMensagem(
        `${rotuloTipoAsset(tipoAsset)} enviado com status ${rotuloStatus(nova.status)}. Ele não será publicado antes da moderação.`
      );
      setArquivo(null);
      setTipoAsset("imagem");
      setTaxon("");
      setLegenda("");
      setFonteUrl("");
      setDeclaracaoAceita(false);
      setAba("minhas");
      formularioAtual.reset();
    } catch (error) {
      setErro(traduzirErro(error));
    } finally {
      setProcessando(false);
    }
  }

  async function retirar(item) {
    setErro("");
    setMensagem("");
    try {
      await retirarContribuicaoImagem(item, userId);
      setContribuicoes((atuais) =>
        atuais.filter((contribuicao) => contribuicao.id !== item.id)
      );
      setMensagem("A contribuição pendente foi retirada.");
    } catch (error) {
      setErro(traduzirErro(error));
    }
  }

  async function moderar(item, status) {
    setErro("");
    setMensagem("");
    setProcessandoModeracao(`${item.id}-${status}`);

    try {
      const atualizada = await moderarContribuicaoImagem({
        id: item.id,
        observacao: observacoes[item.id] || "",
        status,
        userId,
      });
      setContribuicoesModeracao((atuais) =>
        atuais.map((contribuicao) =>
          contribuicao.id === atualizada.id ? atualizada : contribuicao
        )
      );
      setContribuicoes((atuais) =>
        atuais.map((contribuicao) =>
          contribuicao.id === atualizada.id ? atualizada : contribuicao
        )
      );
      setMensagem(
        status === "aprovado"
          ? "Contribuição aprovada para uso futuro no catálogo."
          : "Contribuição rejeitada com observação para o professor."
      );
    } catch (error) {
      setErro(traduzirErro(error));
    } finally {
      setProcessandoModeracao("");
    }
  }

  return (
    <div style={container}>
      <div>
        <h3 style={titulo}>Contribuir com mídia didática</h3>
        <p style={intro}>
          O envio fica privado e aguardando aprovação. Ele não entra
          automaticamente nas chaves, no atlas nem substitui mídias oficiais.
        </p>
      </div>

      <nav style={abas} aria-label="Áreas de contribuição de imagens">
        {[
          ["enviar", "Enviar"],
          ["minhas", "Minhas"],
          ...(podeModerar ? [["moderacao", "Moderação"]] : []),
        ].map(([id, rotulo]) => (
          <button
            key={id}
            type="button"
            className={
              aba === id
                ? "btn btn--primary btn--compact"
                : "btn btn--secondary btn--compact"
            }
            onClick={() => setAba(id)}
          >
            {rotulo}
          </button>
        ))}
      </nav>

      {aba === "enviar" ? (
        <form style={formulario} onSubmit={enviar}>
          <label style={campo}>
            Tipo de mídia
            <select
              className="field-control"
              value={tipoAsset}
              onChange={(event) => setTipoAsset(event.target.value)}
            >
              {TIPOS_ASSET_CONTRIBUIDO.map((item) => (
                <option key={item.valor} value={item.valor}>
                  {item.rotulo}
                </option>
              ))}
            </select>
          </label>

          <label style={campo}>
            Arquivo
            <input
              className="field-control"
              type="file"
              accept={
                tipoAsset === "modelo3d"
                  ? ".glb,.gltf,model/gltf-binary,model/gltf+json"
                  : "image/jpeg,image/png,image/webp"
              }
              onChange={(event) => setArquivo(event.target.files?.[0] || null)}
              required
            />
            <span style={ajuda}>
              {tipoAsset === "modelo3d"
                ? "GLB ou GLTF, com até 25 MB."
                : "JPEG, PNG ou WebP, com até 8 MB."}
            </span>
          </label>

          {preview && tipoAsset === "imagem" ? (
            <img src={preview} alt="Prévia da contribuição" style={previewStyle} />
          ) : null}
          {arquivo && tipoAsset === "modelo3d" ? (
            <div style={modeloPreview}>
              <strong>{arquivo.name}</strong>
              <span style={ajuda}>Modelo 3D pronto para envio.</span>
            </div>
          ) : null}

          <div style={duasColunas}>
            <label style={campo}>
              Táxon, estrutura ou título
              <input
                className="field-control"
                value={taxon}
                onChange={(event) => setTaxon(event.target.value)}
                placeholder={
                  tipoAsset === "modelo3d"
                    ? "Ex.: Aracnídeo — modelo completo"
                    : "Ex.: Coleoptera — élitros"
                }
                required
              />
            </label>

            <label style={campo}>
              Autor da imagem
              <input
                className="field-control"
                value={autor}
                onChange={(event) => setAutor(event.target.value)}
                placeholder="Nome para atribuição"
                required
              />
            </label>
          </div>

          <label style={campo}>
            Legenda didática
            <textarea
              className="field-control"
              value={legenda}
              onChange={(event) => setLegenda(event.target.value)}
              placeholder={
                tipoAsset === "modelo3d"
                  ? "Descreva para que este modelo 3D deve ser usado."
                  : "Descreva a estrutura que deve ser observada."
              }
              rows={3}
              required
            />
          </label>

          <label style={campo}>
            Fonte ou página de origem
            <input
              className="field-control"
              type="url"
              value={fonteUrl}
              onChange={(event) => setFonteUrl(event.target.value)}
              placeholder="https://... (obrigatória para material de terceiros)"
            />
          </label>

          <label style={campo}>
            Licença
            <select
              className="field-control"
              value={licenca}
              onChange={(event) => setLicenca(event.target.value)}
            >
              {LICENCAS.map((item) => (
                <option key={item.valor} value={item.valor}>
                  {item.rotulo}
                </option>
              ))}
            </select>
            <span style={ajuda}>
              {LICENCAS.find((item) => item.valor === licenca)?.descricao}
            </span>
          </label>

          <label style={declaracao}>
            <input
              type="checkbox"
              checked={declaracaoAceita}
              onChange={(event) => setDeclaracaoAceita(event.target.checked)}
              required
            />
            <span>
              Declaro que sou autor ou possuo autorização para enviar esta mídia
              e concedo ao LABSED os usos previstos na licença selecionada,
              mantendo a atribuição informada quando aplicável.
            </span>
          </label>

          <div style={avisoLegal}>
            Esta declaração não transfere automaticamente a titularidade dos
            direitos autorais. Licenças Creative Commons podem ser irrevogáveis;
            confira a licença antes de enviar. O texto deve ser revisado
            juridicamente antes de uso institucional definitivo. Versão do termo:{" "}
            {TERMO_CONTRIBUICAO_VERSAO}.
          </div>

          <button className="btn btn--primary" disabled={processando}>
            {processando ? "Enviando..." : "Enviar para avaliação"}
          </button>
        </form>
      ) : null}

      {mensagem ? <div style={sucesso}>{mensagem}</div> : null}
      {erro ? <div role="alert" style={erroStyle}>{erro}</div> : null}

      {aba === "minhas" ? (
      <div style={lista}>
        <h4 style={{ margin: 0 }}>Minhas contribuições</h4>
        {contribuicoes.length === 0 ? (
          <p style={ajuda}>Nenhuma mídia enviada por esta conta.</p>
        ) : (
          contribuicoes.map((item) => (
            <article key={item.id} style={itemStyle}>
              {item.previewUrl ? (
                <img
                  src={item.previewUrl}
                  alt={item.legenda}
                  style={miniatura}
                />
              ) : item.tipo === "modelo3d" ? (
                <div style={miniaturaModelo}>3D</div>
              ) : null}
              <div style={{ flex: 1 }}>
                <strong>{item.taxon}</strong>
                <div style={meta}>{item.legenda}</div>
                <div style={meta}>
                  {rotuloTipoAsset(item.tipo)} · {item.autor} · {rotuloLicenca(item.licenca)}
                </div>
                <span style={statusStyle(item.status)}>
                  {rotuloStatus(item.status)}
                </span>
                {item.observacao_moderacao ? (
                  <div style={observacaoModeracao}>
                    Moderação: {item.observacao_moderacao}
                  </div>
                ) : null}
              </div>
              {["aguardando_aprovacao", "rejeitado"].includes(item.status) ? (
                <button
                  type="button"
                  className="btn btn--secondary btn--compact"
                  onClick={() => retirar(item)}
                >
                  Retirar
                </button>
              ) : null}
            </article>
          ))
        )}
      </div>
      ) : null}

      {aba === "moderacao" && podeModerar ? (
        <div style={lista}>
          <div>
            <h4 style={{ margin: 0 }}>Moderação de contribuições</h4>
            <p style={ajuda}>
              Esta área aparece apenas para contas cadastradas como moderadoras
              no Supabase. Aprove somente imagens com autoria/licença
              compatíveis e utilidade didática clara.
            </p>
          </div>

          {contribuicoesModeracao.length === 0 ? (
            <p style={ajuda}>Nenhuma contribuição disponível para moderação.</p>
          ) : (
            contribuicoesModeracao.map((item) => (
              <article key={item.id} style={itemStyle}>
                {item.previewUrl ? (
                  <img
                    src={item.previewUrl}
                    alt={item.legenda}
                    style={miniatura}
                  />
                ) : item.tipo === "modelo3d" ? (
                  <div style={miniaturaModelo}>3D</div>
                ) : null}
                <div style={{ flex: 1 }}>
                  <strong>{item.taxon}</strong>
                  <div style={meta}>{item.legenda}</div>
                  <div style={meta}>
                    {rotuloTipoAsset(item.tipo)} · {item.autor} · {rotuloLicenca(item.licenca)}
                  </div>
                  {item.fonte_url ? (
                    <a
                      href={item.fonte_url}
                      rel="noreferrer"
                      target="_blank"
                      style={link}
                    >
                      Ver fonte declarada
                    </a>
                  ) : null}
                  <span style={statusStyle(item.status)}>
                    {rotuloStatus(item.status)}
                  </span>
                  <textarea
                    className="field-control"
                    rows={2}
                    style={campoModeracao}
                    value={observacoes[item.id] ?? item.observacao_moderacao ?? ""}
                    onChange={(event) =>
                      setObservacoes((atuais) => ({
                        ...atuais,
                        [item.id]: event.target.value,
                      }))
                    }
                    placeholder="Observação para rejeição ou anotação interna"
                  />
                </div>
                <div style={acoesModeracao}>
                  <button
                    type="button"
                    className="btn btn--primary btn--compact"
                    disabled={Boolean(processandoModeracao)}
                    onClick={() => moderar(item, "aprovado")}
                  >
                    {processandoModeracao === `${item.id}-aprovado`
                      ? "Aprovando..."
                      : "Aprovar"}
                  </button>
                  <button
                    type="button"
                    className="btn btn--secondary btn--compact"
                    disabled={Boolean(processandoModeracao)}
                    onClick={() => moderar(item, "rejeitado")}
                  >
                    {processandoModeracao === `${item.id}-rejeitado`
                      ? "Rejeitando..."
                      : "Rejeitar"}
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

function rotuloLicenca(valor) {
  return LICENCAS.find((item) => item.valor === valor)?.rotulo || valor;
}

function rotuloTipoAsset(valor) {
  return TIPOS_ASSET_CONTRIBUIDO.find((item) => item.valor === valor)?.rotulo || valor;
}

function rotuloStatus(valor) {
  return {
    aguardando_aprovacao: "Aguardando aprovação",
    aprovado: "Aprovado",
    rejeitado: "Rejeitado",
    retirado: "Retirado",
  }[valor] || valor;
}

function traduzirErro(error) {
  const mensagem = error?.message || "Não foi possível concluir o envio.";
  if (/assets_contribuidos|bucket/i.test(mensagem)) {
    return "O banco ainda não recebeu a migração de contribuições de imagens.";
  }
  if (/usuario_pode_moderar_assets|moderar_asset_contribuido|schema cache/i.test(mensagem)) {
    return "O banco ainda não recebeu a migração de moderação de imagens.";
  }
  return mensagem;
}

function statusStyle(status) {
  const positivo = status === "aprovado";
  const negativo = status === "rejeitado";
  return {
    display: "inline-block",
    marginTop: 7,
    padding: "4px 8px",
    borderRadius: 999,
    background: positivo
      ? "var(--color-success-soft)"
      : negativo
        ? "var(--color-danger-soft)"
        : "var(--color-warning-soft)",
    color: positivo
      ? "var(--color-success-text)"
      : negativo
        ? "var(--color-danger-text)"
        : "var(--color-warning-text)",
    fontSize: 12,
    fontWeight: 800,
  };
}

const container = {
  display: "grid",
  gap: 16,
  marginTop: 24,
  paddingTop: 20,
  borderTop: "1px solid var(--color-border)",
};
const titulo = { margin: 0 };
const intro = { margin: "6px 0 0", color: "var(--color-muted)", lineHeight: 1.5 };
const abas = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};
const formulario = { display: "grid", gap: 14 };
const campo = { display: "grid", gap: 6, fontWeight: 750 };
const duasColunas = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
};
const ajuda = { color: "var(--color-muted)", fontSize: 12, lineHeight: 1.45 };
const previewStyle = {
  width: "100%",
  maxHeight: 320,
  objectFit: "contain",
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};
const modeloPreview = {
  display: "grid",
  gap: 6,
  padding: 18,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface-soft)",
};
const declaracao = {
  display: "flex",
  alignItems: "flex-start",
  gap: 9,
  color: "var(--color-text)",
  fontSize: 13,
  lineHeight: 1.5,
};
const avisoLegal = {
  padding: 11,
  borderRadius: 11,
  background: "var(--color-warning-soft)",
  border: "1px solid var(--color-warning-border)",
  color: "var(--color-warning-text)",
  fontSize: 12,
  lineHeight: 1.45,
};
const sucesso = {
  padding: 12,
  borderRadius: 12,
  background: "var(--color-success-soft)",
  color: "var(--color-success-text)",
};
const erroStyle = {
  padding: 12,
  borderRadius: 12,
  background: "var(--color-danger-soft)",
  color: "var(--color-danger-text)",
};
const lista = { display: "grid", gap: 10 };
const itemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};
const miniatura = {
  width: 84,
  height: 70,
  objectFit: "cover",
  borderRadius: 9,
};
const miniaturaModelo = {
  ...miniatura,
  display: "grid",
  placeItems: "center",
  background: "var(--color-surface-soft)",
  color: "var(--color-primary)",
  fontSize: 30,
  fontWeight: 900,
};
const meta = { marginTop: 3, color: "var(--color-muted)", fontSize: 12 };
const observacaoModeracao = {
  marginTop: 7,
  color: "var(--color-danger-text)",
  fontSize: 12,
};
const link = {
  display: "inline-block",
  marginTop: 6,
  color: "var(--color-primary)",
  fontSize: 12,
  fontWeight: 800,
};
const campoModeracao = { marginTop: 8 };
const acoesModeracao = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};
