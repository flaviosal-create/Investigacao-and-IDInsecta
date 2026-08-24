import { useEffect, useState } from "react";

import { obterMarcaDisciplina } from "../assets/identidade/marcas.js";
import {
  captchaAlunoConfigurado,
  turnstileAlunoSiteKey,
} from "../services/supabase.js";
import { autenticarAlunoLocal } from "../utils/ambienteEscolar.js";
import DisciplinaLogo from "./DisciplinaLogo.jsx";
import TurnstileWidget from "./TurnstileWidget.jsx";

const TAMANHO_CODIGO_TURMA = 6;
const TAMANHO_CODIGO_ALUNO = 5;

export default function AcessoAluno({
  ambiente,
  disciplinaId,
  onBack,
  onSuccess,
}) {
  const marca = obterMarcaDisciplina(disciplinaId);
  const [codigoTurma, setCodigoTurma] = useState("");
  const [codigoAluno, setCodigoAluno] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [entrando, setEntrando] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaObrigatorio, setCaptchaObrigatorio] = useState(captchaAlunoConfigurado);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  function resetarCaptcha() {
    setCaptchaToken("");
    setCaptchaResetKey((atual) => atual + 1);
  }

  useEffect(() => {
    let cancelado = false;

    async function verificarSessaoAluno() {
      if (!captchaAlunoConfigurado) {
        setCaptchaObrigatorio(false);
        return;
      }

      try {
        const { sessaoAnonimaAlunoAtiva } = await import(
          "../services/acessoAlunoOnline.js"
        );
        const ativa = await sessaoAnonimaAlunoAtiva();
        if (!cancelado) setCaptchaObrigatorio(!ativa);
      } catch {
        if (!cancelado) setCaptchaObrigatorio(true);
      }
    }

    verificarSessaoAluno();
    return () => {
      cancelado = true;
    };
  }, []);

  async function entrar(event) {
    event.preventDefault();
    setErro("");
    setAviso("");
    setEntrando(true);

    try {
      const { entrarAlunoOnline } = await import(
        "../services/acessoAlunoOnline.js"
      );
      const acessoOnline = await entrarAlunoOnline({
        codigoTurma,
        codigoAluno,
        disciplinaId,
        captchaToken,
      });
      setCaptchaObrigatorio(false);
      onSuccess?.(acessoOnline);
      return;
    } catch (error) {
      const acessoLocal = autenticarAlunoLocal(ambiente, codigoTurma, codigoAluno);
      const motivoOnline = explicarFalhaOnline(error);

      if (!acessoLocal) {
        setErro(explicarFalhaAcessoLocal({ codigoTurma, codigoAluno, motivoOnline }));
        if (captchaObrigatorio) resetarCaptcha();
        setEntrando(false);
        return;
      }

      setAviso(
        `Entramos no modo local. Motivo da tentativa on-line: ${motivoOnline}`
      );
      if (captchaObrigatorio) resetarCaptcha();
      onSuccess?.({
        ...acessoLocal,
        online: false,
        motivoLocal: motivoOnline,
      });
    } finally {
      setEntrando(false);
    }
  }

  return (
    <main className="aluno-acesso-page" style={page}>
      <section className="surface aluno-acesso-card" style={card}>
        <div style={hero}>
          <DisciplinaLogo disciplinaId={disciplinaId} size={84} paddingRatio={0.04} />
          <div style={heroCopy}>
            <div style={kicker}>Área do aluno</div>
            <h1 style={title}>Entrar na turma</h1>
            <p style={intro}>
              Você está acessando <strong>{marca.titulo}</strong>. Confirme a
              turma e digite manualmente o código individual entregue pelo
              professor.
            </p>
          </div>
        </div>

        <div className="aluno-acesso-passos">
          <div>
            <span>1</span>
            <strong>Código da turma</strong>
            <small>igual para todos da turma</small>
          </div>
          <div>
            <span>2</span>
            <strong>Código individual</strong>
            <small>entregue só para você</small>
          </div>
        </div>

        <form className="aluno-acesso-form" style={form} onSubmit={entrar}>
          <label className="aluno-acesso-field" style={label}>
            Código da turma
            <input
              className="field-control"
              value={codigoTurma}
              onChange={(event) => setCodigoTurma(event.target.value)}
              placeholder="Ex.: ABC234"
              autoCapitalize="characters"
              autoComplete="off"
              maxLength={TAMANHO_CODIGO_TURMA}
              required
            />
            <small style={fieldHint}>
              Use o código geral da turma com {TAMANHO_CODIGO_TURMA} caracteres.
            </small>
          </label>

          <label className="aluno-acesso-field" style={label}>
            Código individual
            <input
              className="field-control"
              value={codigoAluno}
              onChange={(event) => setCodigoAluno(event.target.value)}
              placeholder="Ex.: XY789"
              autoCapitalize="characters"
              autoComplete="off"
              maxLength={TAMANHO_CODIGO_ALUNO}
              required
            />
            <small style={fieldHint}>
              Use apenas o código individual com {TAMANHO_CODIGO_ALUNO} caracteres entregue ao aluno.
            </small>
          </label>

          {captchaObrigatorio ? (
            <label className="aluno-acesso-field" style={label}>
              Verificação de segurança
              <TurnstileWidget
                key={captchaResetKey}
                siteKey={turnstileAlunoSiteKey}
                onTokenChange={(token) => {
                  setCaptchaToken(token);
                  if (token) setErro("");
                }}
                onErro={(mensagem) => setErro(mensagem)}
              />
              <small style={fieldHint}>
                Esta etapa protege a entrada da turma contra acessos automáticos.
              </small>
            </label>
          ) : null}

          {erro ? <div role="alert" style={errorStyle}>{erro}</div> : null}
          {aviso ? <div style={notice}>{aviso}</div> : null}

          <div className="aluno-acesso-actions">
            <button className="btn btn--success" disabled={entrando}>
              {entrando ? "Entrando..." : "Entrar"}
            </button>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onBack}
              disabled={entrando}
            >
              Voltar
            </button>
          </div>
        </form>

        <div className="aluno-acesso-nota" style={notice}>
          Se a turma já estiver sincronizada na nuvem, o aluno entra on-line
          nesta disciplina. Se a conexão falhar, o aplicativo mantém o acesso
          local neste aparelho, mas a entrada continua sendo feita sempre com os
          dois códigos digitados manualmente.
          {captchaAlunoConfigurado
            ? " Quando a verificação de segurança estiver ativa, conclua o desafio antes de entrar."
            : ""}
        </div>
      </section>
    </main>
  );
}

function explicarFalhaAcessoLocal({ codigoTurma, codigoAluno, motivoOnline }) {
  const turmaCodigo = normalizarCodigoLocal(codigoTurma);
  const alunoCodigo = normalizarCodigoLocal(codigoAluno);

  if (turmaCodigo && turmaCodigo === alunoCodigo) {
    return "O código informado no campo individual é o código da turma. Use o código individual entregue ao aluno.";
  }

  if (!alunoCodigo) {
    return "Informe o código individual do aluno.";
  }

  return (
    motivoOnline ||
    "Não foi possível validar os códigos informados. Confira os dois códigos com o professor e tente novamente."
  );
}

function normalizarCodigoLocal(codigo) {
  return String(codigo || "")
    .trim()
    .replace(/[^a-z0-9]/gi, "")
    .toUpperCase();
}

function explicarFalhaOnline(error) {
  const mensagem = String(error?.message || "").trim();

  if (!mensagem) {
    return "não foi possível completar a verificação on-line agora.";
  }

  if (/login on-line do aluno está desativado/i.test(mensagem)) {
    return "o login on-line do aluno está desativado no Supabase.";
  }

  if (/sem VITE_TURNSTILE_SITE_KEY/i.test(mensagem)) {
    return "o Supabase exige captcha para o aluno, mas o app está sem a chave pública do Turnstile.";
  }

  if (/verificação de segurança do aluno falhou/i.test(mensagem)) {
    return "a verificação de segurança do aluno falhou e precisa ser refeita.";
  }

  if (/captcha|anonymous|anônima|anonima|signups not allowed|provider/i.test(mensagem)) {
    return "a autenticação on-line do aluno não está disponível neste momento.";
  }

  if (/confirme a verificação de segurança/i.test(mensagem)) {
    return "confirme a verificação de segurança para continuar on-line.";
  }

  if (/supabase ainda não foi configurado|invalid supabase/i.test(mensagem)) {
    return "a sincronização on-line do aplicativo ainda não está pronta.";
  }

  if (/c[oó]digos n[aã]o encontrados|not found/i.test(mensagem)) {
    return "os códigos não puderam ser validados on-line agora.";
  }

  if (/atualização mais recente do acesso do aluno|migration de disciplina por turma/i.test(mensagem)) {
    return "o Supabase desta publicação está desatualizado para o acesso on-line do aluno.";
  }

  if (/estrutura on-line desta disciplina ainda não foi atualizada/i.test(mensagem)) {
    return "a estrutura on-line desta disciplina ainda não foi atualizada no Supabase.";
  }

  if (/sessão on-line do aluno foi recusada/i.test(mensagem)) {
    return "a sessão on-line do aluno foi recusada e precisa ser refeita.";
  }

  if (/conectar ao Supabase para validar a turma on-line/i.test(mensagem)) {
    return "não foi possível conectar ao Supabase para validar a turma on-line.";
  }

  return "não foi possível completar a verificação on-line agora.";
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
const intro = {
  margin: 0,
  color: "var(--color-muted)",
  lineHeight: 1.5,
  maxWidth: 560,
};
const form = { display: "grid", gap: 15, textAlign: "left" };
const label = { display: "grid", gap: 6, fontWeight: 800 };
const fieldHint = {
  color: "var(--color-muted)",
  fontSize: 12,
  fontWeight: 700,
};
const errorStyle = {
  padding: 12,
  borderRadius: 14,
  background: "var(--color-danger-soft)",
  color: "var(--color-danger-text)",
  fontSize: 13,
  lineHeight: 1.45,
};
const notice = {
  padding: 14,
  borderRadius: 16,
  background:
    "linear-gradient(135deg, color-mix(in srgb, var(--color-info-soft) 86%, white), color-mix(in srgb, var(--color-surface) 94%, white))",
  color: "var(--color-info-text)",
  fontSize: 12,
  border: "1px solid color-mix(in srgb, var(--color-info-soft) 60%, var(--color-border))",
  lineHeight: 1.45,
};
