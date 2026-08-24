import { useState } from "react";

import {
  captchaSupabaseConfigurado,
  emailProfessorPermitido,
  professorEmailAutorizadoConfigurado,
  supabase,
  supabaseConfigurado,
  supabaseLocalConfigurado,
  turnstileSiteKeyPublica,
} from "../services/supabase.js";
import TurnstileWidget from "./TurnstileWidget.jsx";

const SENHA_FORTE_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const AJUDA_SENHA_FORTE =
  "Use no mínimo 8 caracteres, com letra maiúscula, letra minúscula e número.";

export default function ContaProfessor({
  session,
  recuperacaoSenhaAtiva = false,
  sincronizando = false,
  mensagem = "",
  onBaixarDados,
  onEnviarDados,
  onSairDesteDispositivo,
}) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mensagemRecuperacao, setMensagemRecuperacao] = useState("");
  const [processando, setProcessando] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaResetKey, setCaptchaResetKey] = useState(0);

  function resetarCaptcha() {
    setCaptchaToken("");
    setCaptchaResetKey((atual) => atual + 1);
  }

  async function entrar(event) {
    event.preventDefault();
    setErro("");
    const emailLimpo = email.trim();

    if (!emailProfessorPermitido(emailLimpo)) {
      setErro(
        `A conta de professor deste aplicativo está restrita a ${professorEmailAutorizadoConfigurado}.`
      );
      resetarCaptcha();
      return;
    }

    if (captchaSupabaseConfigurado && !captchaToken) {
      setErro("Confirme a verificação de segurança antes de entrar.");
      return;
    }

    setProcessando(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: emailLimpo,
        password: senha,
        options: captchaSupabaseConfigurado ? { captchaToken } : undefined,
      });

      if (error) {
        setErro(traduzirErro(error.message));
        resetarCaptcha();
      }
    } catch (error) {
      setErro(traduzirErro(error?.message));
      resetarCaptcha();
    } finally {
      setProcessando(false);
    }
  }

  async function recuperarSenha() {
    const emailLimpo = email.trim();
    setErro("");
    setMensagemRecuperacao("");

    if (!emailLimpo) {
      setErro("Informe o e-mail da conta para receber a recuperação.");
      return;
    }

    if (!emailProfessorPermitido(emailLimpo)) {
      setErro(
        `A conta de professor deste aplicativo está restrita a ${professorEmailAutorizadoConfigurado}.`
      );
      resetarCaptcha();
      return;
    }

    if (captchaSupabaseConfigurado && !captchaToken) {
      setErro("Confirme a verificação de segurança antes de recuperar a senha.");
      return;
    }

    setProcessando(true);
    const urlRecuperacao = new URL(window.location.href);
    urlRecuperacao.searchParams.set("tela", "cadastro");
    urlRecuperacao.hash = "";
    const redirectTo = urlRecuperacao.toString();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(emailLimpo, {
        redirectTo,
        captchaToken: captchaSupabaseConfigurado ? captchaToken : undefined,
      });

      if (error) {
        setErro(traduzirErro(error.message));
        resetarCaptcha();
      } else {
        setMensagemRecuperacao(
          "Se este e-mail estiver cadastrado, enviaremos um link para redefinir a senha. Verifique também spam, lixo eletrônico e promoções."
        );
        resetarCaptcha();
      }
    } catch (error) {
      setErro(traduzirErro(error?.message));
      resetarCaptcha();
    } finally {
      setProcessando(false);
    }
  }

  async function salvarNovaSenha(event) {
    event.preventDefault();
    setErro("");
    setMensagemRecuperacao("");

    if (!senhaProfessorValida(novaSenha)) {
      setErro(AJUDA_SENHA_FORTE);
      return;
    }

    setProcessando(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: novaSenha,
      });

      if (error) {
        setErro(traduzirErro(error.message));
      } else {
        setNovaSenha("");
        setMensagemRecuperacao("Senha atualizada. Você já pode continuar usando a conta.");
      }
    } catch (error) {
      setErro(traduzirErro(error?.message));
    } finally {
      setProcessando(false);
    }
  }

  if (!supabaseConfigurado) {
    return (
      <div style={aviso}>
        <strong>Sincronização ainda não configurada.</strong>
        <span>
          O cadastro continua funcionando localmente. Configure as variáveis do
          Supabase na Vercel para habilitar contas e envio.
        </span>
      </div>
    );
  }

  if (recuperacaoSenhaAtiva && session?.user) {
    return (
      <form style={contaBox} onSubmit={salvarNovaSenha}>
        <strong>Definir nova senha</strong>
        <div style={meta}>{session.user.email}</div>
        <input
          className="field-control"
          type="password"
          value={novaSenha}
          onChange={(event) => setNovaSenha(event.target.value)}
          placeholder="Nova senha"
          autoComplete="new-password"
          minLength={8}
          required
        />
        <div style={meta}>{AJUDA_SENHA_FORTE}</div>
        <button className="btn btn--primary" disabled={processando}>
          Salvar nova senha
        </button>
        {mensagemRecuperacao ? <div style={sucessoStyle}>{mensagemRecuperacao}</div> : null}
        {erro ? <div role="alert" style={erroStyle}>{erro}</div> : null}
      </form>
    );
  }

  if (session?.user) {
    return (
      <div style={contaBox}>
        <div>
          <strong>Conta do professor conectada</strong>
          <div style={meta}>{session.user.email}</div>
        </div>
        <div style={acoes}>
          <button
            className="btn btn--primary btn--compact"
            disabled={sincronizando}
            onClick={onEnviarDados}
          >
            Enviar dados locais
          </button>
          <button
            className="btn btn--secondary btn--compact"
            disabled={sincronizando}
            onClick={onBaixarDados}
          >
            Baixar dados da nuvem
          </button>
          <button
            className="btn btn--secondary btn--compact"
            onClick={() => onSairDesteDispositivo?.()}
          >
            Sair
          </button>
        </div>
        {mensagem ? <div style={meta}>{mensagem}</div> : null}
      </div>
    );
  }

  return (
    <form style={contaBox} onSubmit={entrar}>
      <strong>Conta do professor</strong>
      <input
        className="field-control"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="E-mail"
        autoComplete="email"
        required
      />
      <input
        className="field-control"
        type="password"
        value={senha}
        onChange={(event) => setSenha(event.target.value)}
        placeholder="Senha"
        autoComplete="current-password"
        required
      />
      {captchaSupabaseConfigurado ? (
        <TurnstileWidget
          key={captchaResetKey}
          siteKey={turnstileSiteKeyPublica}
          mensagemPronta="Conclua a verificação para entrar ou recuperar a senha."
          onTokenChange={(token) => {
            setCaptchaToken(token);
            if (token) setErro("");
          }}
          onErro={(mensagem) => setErro(mensagem)}
        />
      ) : null}
      <div style={acoes}>
        <button className="btn btn--primary" disabled={processando}>
          Entrar
        </button>
        <button
          type="button"
          className="btn btn--secondary"
          disabled={processando}
          onClick={recuperarSenha}
        >
          Recuperar senha
        </button>
      </div>
      <div style={meta}>
        Contas de professor não são criadas publicamente neste aplicativo.
        Solicite o acesso ao administrador responsável.
      </div>
      {mensagemRecuperacao ? <div style={sucessoStyle}>{mensagemRecuperacao}</div> : null}
      {erro ? <div role="alert" style={erroStyle}>{erro}</div> : null}
    </form>
  );
}

function traduzirErro(mensagem) {
  if (/failed to fetch|networkerror|load failed/i.test(mensagem || "")) {
    if (supabaseLocalConfigurado) {
      return "Não foi possível conectar ao Supabase local em 127.0.0.1:54321. Inicie o ambiente local com `npx supabase start` e tente novamente.";
    }
    return "Não foi possível conectar ao Supabase. Verifique se as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY estão corretas na Vercel e se o domínio do app está liberado nas URLs de autenticação do Supabase.";
  }
  if (/invalid login credentials/i.test(mensagem)) {
    return "E-mail ou senha incorretos.";
  }
  if (/user already registered/i.test(mensagem)) {
    return "Este e-mail já possui uma conta.";
  }
  if (/rate limit|security purposes/i.test(mensagem)) {
    return "Aguarde alguns instantes antes de solicitar outro e-mail de recuperação.";
  }
  if (/captcha protection|captcha_token|request disallowed/i.test(mensagem || "")) {
    return "Confirme a verificação de segurança para continuar.";
  }
  return mensagem;
}

function senhaProfessorValida(valor) {
  return SENHA_FORTE_REGEX.test(String(valor || ""));
}

const contaBox = {
  display: "grid",
  gap: 12,
  marginTop: 18,
  padding: 18,
  borderRadius: 18,
  border: "1px solid color-mix(in srgb, var(--color-border) 78%, white)",
  background:
    "linear-gradient(180deg, color-mix(in srgb, var(--color-surface) 96%, white), color-mix(in srgb, var(--color-surface-soft) 92%, white))",
  boxShadow: "0 14px 30px rgba(15, 23, 42, 0.05)",
};
const aviso = {
  display: "grid",
  gap: 5,
  marginTop: 18,
  padding: 16,
  borderRadius: 16,
  background: "var(--color-warning-soft)",
  border: "1px solid var(--color-warning-border)",
  color: "var(--color-warning-text)",
};
const acoes = { display: "flex", gap: 8, flexWrap: "wrap" };
const meta = { color: "var(--color-muted)", fontSize: 13, lineHeight: 1.5 };
const sucessoStyle = {
  color: "var(--color-success-text)",
  fontWeight: 700,
  padding: 10,
  borderRadius: 12,
  background: "color-mix(in srgb, var(--color-success-soft) 82%, white)",
};
const erroStyle = {
  color: "var(--color-danger-text)",
  fontWeight: 700,
  padding: 10,
  borderRadius: 12,
  background: "color-mix(in srgb, var(--color-danger-soft) 82%, white)",
};
