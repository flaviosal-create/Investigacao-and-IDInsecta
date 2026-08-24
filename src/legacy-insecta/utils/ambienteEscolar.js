const STORAGE_KEY = "labsed_ambiente_escolar_v1";
const LEGACY_STUDENTS_KEY = "turma_alunos";
export const DISCIPLINA_PADRAO_ID = "zoologia-i";

export function chaveAmbienteEscolar(disciplinaId = DISCIPLINA_PADRAO_ID) {
  const id = normalizarDisciplinaId(disciplinaId);
  return `${STORAGE_KEY}:${id}`;
}

export function carregarAmbienteEscolar(disciplinaId = DISCIPLINA_PADRAO_ID) {
  const idDisciplina = normalizarDisciplinaId(disciplinaId);

  try {
    const salvo = JSON.parse(
      localStorage.getItem(chaveAmbienteEscolar(idDisciplina)) ||
        (idDisciplina === DISCIPLINA_PADRAO_ID
          ? localStorage.getItem(STORAGE_KEY)
          : "null") ||
        "null"
    );
    if (salvo?.versao === 1 && Array.isArray(salvo.turmas)) {
      return normalizarAmbiente(salvo, idDisciplina);
    }
  } catch {
    // Um armazenamento inválido será substituído pela estrutura inicial.
  }

  const alunosLegados =
    idDisciplina === DISCIPLINA_PADRAO_ID ? carregarAlunosLegados() : [];
  const turmaInicial = criarTurma("Turma inicial", alunosLegados);
  const ambiente = {
    versao: 1,
    disciplinaId: idDisciplina,
    professor: {
      id: criarId("professor"),
      nome: "",
    },
    turmas: [turmaInicial],
    turmaAtivaId: turmaInicial.id,
  };

  salvarAmbienteEscolar(ambiente, idDisciplina);
  return ambiente;
}

export function salvarAmbienteEscolar(
  ambiente,
  disciplinaId = ambiente?.disciplinaId || DISCIPLINA_PADRAO_ID
) {
  const normalizado = normalizarAmbiente(ambiente, disciplinaId);
  localStorage.setItem(
    chaveAmbienteEscolar(normalizado.disciplinaId),
    JSON.stringify(normalizado)
  );
  return normalizado;
}

export function limparAmbienteEscolar(disciplinaId = DISCIPLINA_PADRAO_ID) {
  const idDisciplina = normalizarDisciplinaId(disciplinaId);
  localStorage.removeItem(chaveAmbienteEscolar(idDisciplina));

  if (idDisciplina === DISCIPLINA_PADRAO_ID) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function criarTurma(nome = "Nova turma", alunos = []) {
  return {
    id: criarId("turma"),
    nome: String(nome || "").trim() || "Nova turma",
    codigo: criarCodigo(6),
    criadaEm: new Date().toISOString(),
    alunos: alunos.map((aluno) =>
      criarAluno(typeof aluno === "string" ? aluno : aluno?.nome)
    ),
  };
}

export function criarAluno(nome) {
  return {
    id: criarId("aluno"),
    nome: String(nome || "").trim(),
    codigoAcesso: gerarCodigoSeguro(5),
    ativo: true,
    criadoEm: new Date().toISOString(),
  };
}

export function regenerarCodigoTurma(turma) {
  return {
    ...turma,
    codigo: gerarCodigoSeguro(6),
    codigoProtegido: false,
  };
}

export function regenerarCodigoAluno(aluno) {
  return {
    ...aluno,
    codigoAcesso: gerarCodigoSeguro(5),
    codigoAcessoProtegido: false,
  };
}

export function obterTurmaAtiva(ambiente) {
  return (
    ambiente?.turmas?.find((turma) => turma.id === ambiente.turmaAtivaId) ||
    ambiente?.turmas?.[0] ||
    null
  );
}

export function associarProfessorAoAmbiente(ambiente, professorId) {
  const normalizado = normalizarAmbiente(ambiente, ambiente?.disciplinaId);
  const id = String(professorId || "").trim();

  if (!id || normalizado.professor.id === id) return normalizado;

  return {
    ...normalizado,
    professor: {
      ...normalizado.professor,
      id,
    },
  };
}

export function mesclarAmbientesEscolares(local, remoto) {
  const idDisciplina = normalizarDisciplinaId(
    local?.disciplinaId || remoto?.disciplinaId
  );
  const ambienteLocal = normalizarAmbiente(local, idDisciplina);
  const ambienteRemoto = normalizarAmbiente(remoto, idDisciplina);
  const ambienteLocalFiltrado = removerTurmasPlaceholder(
    ambienteLocal,
    ambienteRemoto
  );

  if (!ambienteRemoto.turmas.length) return ambienteLocal;

  const turmasPorId = new Map();

  ambienteRemoto.turmas.forEach((turma) => {
    turmasPorId.set(turma.id, turma);
  });

  ambienteLocalFiltrado.turmas.forEach((turma) => {
    turmasPorId.set(turma.id, mesclarTurma(turmasPorId.get(turma.id), turma));
  });

  const turmas = [...turmasPorId.values()];
  const turmaAtivaId =
    turmas.find((turma) => turma.id === ambienteLocalFiltrado.turmaAtivaId)?.id ||
    turmas.find((turma) => turma.id === ambienteRemoto.turmaAtivaId)?.id ||
    turmas[0]?.id ||
    "";

  return normalizarAmbiente({
    versao: 1,
    disciplinaId: idDisciplina,
    professor: {
      ...ambienteLocalFiltrado.professor,
      id: ambienteRemoto.professor.id || ambienteLocalFiltrado.professor.id,
      nome: ambienteLocalFiltrado.professor.nome || ambienteRemoto.professor.nome,
    },
    turmas,
    turmaAtivaId,
  });
}

export function autenticarAlunoLocal(
  ambiente,
  codigoTurma,
  codigoAluno
) {
  const turmaCodigo = normalizarCodigo(codigoTurma);
  const alunoCodigo = normalizarCodigo(codigoAluno);

  if (!turmaCodigo || !alunoCodigo) return null;

  const turma = (ambiente?.turmas || []).find(
    (item) => normalizarCodigo(item.codigo) === turmaCodigo
  );
  if (!turma) return null;

  const aluno = (turma.alunos || []).find(
    (item) =>
      item.ativo !== false &&
      normalizarCodigo(item.codigoAcesso) === alunoCodigo
  );

  return aluno
    ? {
        turma: {
          ...turma,
          disciplinaId: normalizarDisciplinaId(ambiente?.disciplinaId),
        },
        aluno,
      }
    : null;
}

export function criarId(prefixo = "id") {
  if (globalThis.crypto?.randomUUID) {
    return `${prefixo}_${globalThis.crypto.randomUUID()}`;
  }

  return `${prefixo}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function carregarAlunosLegados() {
  try {
    const salvos = JSON.parse(localStorage.getItem(LEGACY_STUDENTS_KEY) || "null");
    if (Array.isArray(salvos) && salvos.length > 0) {
      return salvos
        .map((aluno) => (typeof aluno === "string" ? aluno : aluno?.nome))
        .filter(Boolean);
    }
  } catch {
    // Usa a lista original embutida quando não há cadastro local válido.
  }

  return [];
}

function normalizarAmbiente(
  ambiente,
  disciplinaId = ambiente?.disciplinaId || DISCIPLINA_PADRAO_ID
) {
  const idDisciplina = normalizarDisciplinaId(disciplinaId);
  const turmas = Array.isArray(ambiente?.turmas)
    ? ambiente.turmas.map((turma) => ({
        ...turma,
        id: turma.id || criarId("turma"),
        nome: String(turma.nome || "Turma").trim(),
        codigo: turma.codigo || (turma.codigoProtegido ? "" : gerarCodigoSeguro(6)),
        codigoProtegido: Boolean(turma.codigoProtegido && !turma.codigo),
        alunos: Array.isArray(turma.alunos)
          ? turma.alunos
              .map((aluno) => ({
                ...aluno,
                id: aluno.id || criarId("aluno"),
                nome: String(aluno.nome || "").trim(),
                codigoAcesso:
                  aluno.codigoAcesso ||
                  (aluno.codigoAcessoProtegido ? "" : gerarCodigoSeguro(5)),
                codigoAcessoProtegido: Boolean(
                  aluno.codigoAcessoProtegido && !aluno.codigoAcesso
                ),
                ativo: aluno.ativo !== false,
              }))
              .filter((aluno) => aluno.nome)
          : [],
      }))
    : [];

  return {
    versao: 1,
    disciplinaId: idDisciplina,
    professor: {
      id: ambiente?.professor?.id || criarId("professor"),
      nome: String(ambiente?.professor?.nome || "").trim(),
    },
    turmas,
    turmaAtivaId:
      turmas.find((turma) => turma.id === ambiente?.turmaAtivaId)?.id ||
      turmas[0]?.id ||
      "",
  };
}

function normalizarDisciplinaId(valor) {
  return (
    String(valor || DISCIPLINA_PADRAO_ID)
      .trim()
      .toLocaleLowerCase("pt-BR")
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "") || DISCIPLINA_PADRAO_ID
  );
}

export { normalizarDisciplinaId };

function mesclarTurma(remota, local) {
  if (!remota) return local;
  if (!local) return remota;

  const alunosPorId = new Map();

  (remota.alunos || []).forEach((aluno) => {
    alunosPorId.set(aluno.id, aluno);
  });

  (local.alunos || []).forEach((aluno) => {
    alunosPorId.set(aluno.id, aluno);
  });

  return {
    ...remota,
    ...local,
    codigo: local.codigo || remota.codigo,
    criadaEm: local.criadaEm || remota.criadaEm,
    alunos: [...alunosPorId.values()],
  };
}

function removerTurmasPlaceholder(local, remoto) {
  if (!local?.turmas?.length || !remoto?.turmas?.length) return local;

  const turmas = local.turmas.filter((turma) => !turmaPlaceholder(turma, remoto));
  if (turmas.length === local.turmas.length) return local;

  return {
    ...local,
    turmas,
    turmaAtivaId:
      turmas.find((turma) => turma.id === local.turmaAtivaId)?.id ||
      turmas[0]?.id ||
      "",
  };
}

function turmaPlaceholder(turma, remoto) {
  const nome = String(turma?.nome || "").trim().toLocaleLowerCase("pt-BR");
  const alunos = Array.isArray(turma?.alunos) ? turma.alunos : [];
  const codigo = String(turma?.codigo || "").trim();

  return (
    nome === "turma inicial" &&
    alunos.length === 0 &&
    Boolean(codigo) &&
    !remoto.turmas.some((item) => item.id === turma.id)
  );
}

function criarCodigo(tamanho) {
  const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const valores = new Uint32Array(tamanho);

  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(valores);
  } else {
    for (let indice = 0; indice < valores.length; indice += 1) {
      valores[indice] = Math.floor(Math.random() * caracteres.length);
    }
  }

  return Array.from(
    valores,
    (valor) => caracteres[valor % caracteres.length]
  ).join("");
}

export function gerarCodigoSeguro(tamanho) {
  return criarCodigo(tamanho);
}

function normalizarCodigo(valor) {
  return String(valor || "")
    .toLocaleUpperCase("pt-BR")
    .replace(/[^A-Z2-9]/g, "");
}
