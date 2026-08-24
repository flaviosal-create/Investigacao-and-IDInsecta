import { useMemo, useState } from "react";
import {
  addSessionObservation,
  runSession,
  startSession,
} from "../engine/sessionEngine.js";
import { buildProtocolRevisionPrompt } from "../utils/protocolAiBrief.js";

function runCalibrationCase(protocol, observations) {
  const session = observations.reduce(
    (current, [structure, value]) =>
      addSessionObservation(current, { structure, value }),
    startSession(protocol)
  );

  return runSession(session).investigation;
}

export function getReviewOutcome({
  validationErrors,
  calibrationResults,
  hasCalibrationCases,
}) {
  if (validationErrors.length) {
    return {
      tone: "is-blocked",
      title: "Rascunho ainda não está pronto para revisão científica",
      summary: `${validationErrors.length} impedimento(s) estrutural(is) precisam ser corrigidos.`,
      action: "Corrigir os impedimentos no editor ou pedir uma revisão estrutural à IA.",
    };
  }

  if (!hasCalibrationCases) {
    return {
      tone: "is-blocked",
      title: "Calibração ainda não foi registrada",
      summary: "O protocolo não possui casos para verificar seu comportamento.",
      action: "Adicionar um caso representativo e um caso incompleto ou misto.",
    };
  }

  const mismatches = calibrationResults.filter(
    (result) => !result.matchesExpectation
  );

  if (mismatches.length) {
    return {
      tone: "is-review",
      title: "Revisão de calibração necessária",
      summary: `${mismatches.length} caso(s) não produzem o resultado pedagógico esperado.`,
      action: "Revisar as evidências, pesos ou a finalidade dos casos; depois executar a calibração novamente.",
    };
  }

  return {
    tone: "is-ready",
    title: "Verificação automática concluída",
    summary: "Estrutura e casos de calibração conferem com o esperado.",
    action: "Realizar a revisão científica-docente de recorte, referências e adequação didática antes de integrar o protocolo.",
  };
}

export function ProtocolReviewGuidance({ protocol, validation }) {
  const [copyStatus, setCopyStatus] = useState("");
  const calibrationResults = useMemo(() =>
    (protocol.calibrationCases ?? []).map((scenario) => {
      const investigation = runCalibrationCase(
        protocol,
        scenario.observations ?? []
      );
      const actualConclusion = investigation.conclusion?.status;
      const leader = investigation.hypotheses?.[0];
      return {
        id: scenario.id,
        label: scenario.label || scenario.id,
        expectedConclusion: scenario.expectedConclusion,
        actualConclusion,
        leaderName: leader?.name,
        matchesExpectation:
          actualConclusion === scenario.expectedConclusion,
      };
    }),
    [protocol]
  );
  const mismatches = calibrationResults.filter(
    (result) => !result.matchesExpectation
  );
  const outcome = getReviewOutcome({
    validationErrors: validation.errors,
    calibrationResults,
    hasCalibrationCases: Boolean(protocol.calibrationCases?.length),
  });

  async function copyRevisionPrompt() {
    const prompt = buildProtocolRevisionPrompt({
      protocol,
      validationErrors: validation.errors,
      calibrationResults,
    });

    try {
      await navigator.clipboard.writeText(prompt);
      setCopyStatus("Pedido de revisão copiado. Cole-o na IA com o JSON completo.");
    } catch {
      setCopyStatus("Não foi possível copiar automaticamente. Use a prévia JSON e o roteiro para revisar.");
    }
  }

  return (
    <section className="protocol-review-guidance">
      <section className={`review-verdict ${outcome.tone}`}>
        <span>Resultado automático</span>
        <strong>{outcome.title}</strong>
        <p>{outcome.summary}</p>
        <p><b>Próxima ação:</b> {outcome.action}</p>
      </section>

      <h3>Caminho até um protocolo revisável</h3>
      <ol>
        <li>Delimite o universo e o nível de ensino.</li>
        <li>Gere e importe o JSON como rascunho.</li>
        <li>Corrija os impedimentos estruturais.</li>
        <li>Revise cientificamente independência das evidências, variação e referências.</li>
        <li>Confira os casos de calibração antes de exportar.</li>
      </ol>

      {protocol.calibrationCases?.length ? (
        <ul className="review-calibration-list">
          {calibrationResults.map((result) => (
            <li
              className={result.matchesExpectation ? "is-match" : "is-mismatch"}
              key={result.id}
            >
              <strong>{result.matchesExpectation ? "Coerente" : "Divergente"}</strong>
              {": "}{result.label}. Esperado: {result.expectedConclusion || "—"}; obtido: {result.actualConclusion || "—"}.
            </li>
          ))}
        </ul>
      ) : (
        <p>Inclua casos de calibração para testar o comportamento do protocolo.</p>
      )}

      <button
        className="secondary-button"
        type="button"
        onClick={copyRevisionPrompt}
      >
        Copiar pedido de revisão para IA
      </button>
      {copyStatus ? <p aria-live="polite">{copyStatus}</p> : null}
      {mismatches.length ? (
        <p className="review-warning">
          Há {mismatches.length} caso(s) que não produzem o estado esperado.
        </p>
      ) : null}
    </section>
  );
}
