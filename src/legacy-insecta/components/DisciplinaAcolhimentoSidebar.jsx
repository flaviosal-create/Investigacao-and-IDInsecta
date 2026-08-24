import { useState } from "react";

import DisciplinaLogo from "./DisciplinaLogo.jsx";
import { obterMarcaDisciplina } from "../assets/identidade/marcas.js";

const CONTEUDO_DISCIPLINA = {
  "zoologia-i": {
    resumo:
      "Práticas de observação, identificação e registro em Zoologia I com apoio do Laboratório de Biologia.",
    destaques: [
      "Acesso por turma e código individual do aluno.",
      "Rascunhos e relatórios vinculados à disciplina ativa.",
      "Fluxo pensado para aula prática, revisão e acompanhamento.",
    ],
  },
  histologia: {
    resumo:
      "Entrada para observação orientada, atlas e relatórios da disciplina de Histologia.",
    destaques: [
      "Turmas separadas por disciplina.",
      "Acesso do aluno com código individual.",
      "Professor acompanha cadastros, sincronização e relatórios.",
    ],
  },
};

const CONTEUDO_POR_AREA = {
  aluno: {
    eyebrow: "Entrada do aluno",
    titulo: "Acesso seguro à turma",
    texto:
      "Use a barra lateral como referência rápida para entrar corretamente, evitar troca de usuário e entender o que acontece com seus rascunhos.",
    cards: [
      {
        titulo: "Como entrar",
        texto:
          "Selecione a turma correta, confira o seu nome e digite manualmente o código individual entregue pelo professor.",
      },
      {
        titulo: "Evite trocas",
        texto:
          "O nome do aluno é apenas conferência visual. A entrada só acontece com o código individual correto.",
      },
      {
        titulo: "Rascunhos",
        texto:
          "Quando o acesso on-line estiver ativo, os relatórios podem ser sincronizados com a disciplina atual.",
      },
    ],
  },
  portal: {
    eyebrow: "Portal do aluno",
    titulo: "Continuidade da prática",
    texto:
      "Depois da entrada, o aluno segue para novas práticas, rascunhos e relatórios dentro da disciplina e da turma corretas.",
    cards: [
      {
        titulo: "Nova prática",
        texto:
          "Abre a atividade vinculada à disciplina ativa, sem misturar turmas de outras áreas.",
      },
      {
        titulo: "Meus relatórios",
        texto:
          "Recupere rascunhos e acompanhe o que já foi salvo neste dispositivo ou na nuvem.",
      },
      {
        titulo: "Sessão segura",
        texto:
          "Se o aluno trocar de disciplina, o acesso precisa ser validado novamente para evitar cruzamento de turmas.",
      },
    ],
  },
  professor: {
    eyebrow: "Área do professor",
    titulo: "Organização da disciplina",
    texto:
      "Cadastre turmas, entregue códigos, sincronize dados e mantenha a operação da disciplina pronta para aula em diferentes navegadores.",
    cards: [
      {
        titulo: "Cadastre na disciplina certa",
        texto:
          "Cada disciplina guarda suas próprias turmas, alunos, códigos e relatórios.",
      },
      {
        titulo: "Sincronização",
        texto:
          "Use Enviar dados locais depois de editar e Baixar dados da nuvem para restaurar em outro navegador.",
      },
      {
        titulo: "Acesso docente",
        texto:
          "Contas de professor são liberadas por convite, mantendo o acesso institucional controlado.",
      },
    ],
  },
};

export default function DisciplinaAcolhimentoSidebar({
  disciplinaId = "projeto-geral",
  area = "aluno",
}) {
  const [aberto, setAberto] = useState(false);
  const marca = obterMarcaDisciplina(disciplinaId);
  const disciplina = CONTEUDO_DISCIPLINA[disciplinaId] || {
    resumo:
      "Ambiente didático do Laboratório de Biologia para turmas, práticas e relatórios da disciplina ativa.",
    destaques: [
      "Acesso e organização por disciplina.",
      "Fluxo de professor e aluno em um mesmo ambiente.",
      "Relatórios e rascunhos vinculados à turma atual.",
    ],
  };
  const conteudo = CONTEUDO_POR_AREA[area] || CONTEUDO_POR_AREA.aluno;

  return (
    <>
      <button
        type="button"
        className="acolhimento-sidebar__toggle"
        onClick={() => setAberto(true)}
      >
        <span>i</span>
        <strong>Apoio</strong>
      </button>

      <div
        className={`acolhimento-sidebar__backdrop${
          aberto ? " acolhimento-sidebar__backdrop--open" : ""
        }`}
        onClick={() => setAberto(false)}
      />

      <aside
        className={`acolhimento-sidebar${
          aberto ? " acolhimento-sidebar--open" : ""
        }`}
      >
        <div className="acolhimento-sidebar__mobile-actions">
          <div className="acolhimento-sidebar__eyebrow">{conteudo.eyebrow}</div>
          <button
            type="button"
            className="acolhimento-sidebar__close"
            onClick={() => setAberto(false)}
            aria-label="Fechar painel lateral"
          >
            ×
          </button>
        </div>
        <div className="acolhimento-sidebar__hero">
          <div className="acolhimento-sidebar__marca">
            <DisciplinaLogo
              disciplinaId={marca.id}
              size={74}
              withRing={false}
              paddingRatio={0.06}
            />
            <div>
              <h2>{marca.titulo}</h2>
              <p>{disciplina.resumo}</p>
            </div>
          </div>
        </div>

        <section className="acolhimento-sidebar__section">
          <h3>{conteudo.titulo}</h3>
          <p>{conteudo.texto}</p>
        </section>

        <section className="acolhimento-sidebar__section">
          <div className="acolhimento-sidebar__stack">
            {conteudo.cards.map((card) => (
              <article key={card.titulo} className="acolhimento-sidebar__card">
                <strong>{card.titulo}</strong>
                <span>{card.texto}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="acolhimento-sidebar__section">
          <h3>O que está ativo aqui</h3>
          <ul className="acolhimento-sidebar__list">
            {disciplina.destaques.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </aside>
    </>
  );
}
