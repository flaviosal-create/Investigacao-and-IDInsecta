/**
 * Investigation
 *
 * Representa uma investigação em andamento ou concluída.
 *
 * Contém:
 * - protocolo utilizado
 * - observações
 * - hipóteses
 * - sugestões
 * - conclusão
 * - histórico
 */

/**
 * Investigation
 *
 * Entidade central do LABSED Investigação.
 */

export function createInvestigation({
  protocolId,
}) {
  return {
    id: crypto.randomUUID(),

    protocolId,

    status: "started",

    observations: [],

    hypotheses: [],

    suggestion: null,

    conclusion: null,

    decision: null,

    history: [],

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };
}
