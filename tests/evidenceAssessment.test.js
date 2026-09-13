import test from 'node:test';
import assert from 'node:assert/strict';
import { assessEvidence, assessComparison } from '../src/engine/EvidenceAssessment.js';
import { getProtocolById } from '../src/config/protocolCatalog.js';
import { startSession, addSessionObservation, runSession, generateSessionReport } from '../src/engine/sessionEngine.js';

const evidence = (structure) => ({ structure, value: 'observado', effect: 'positive' });

test('sustentação depende das evidências e conflitos, não da posição no ranking', () => {
  const h = { score: 10, evidences: ['a','b','c'].map(evidence), conflicts: [] };
  assert.equal(assessEvidence({...h, rank: 1, margin: 10}).level, 'bem_sustentada');
  assert.deepEqual(assessEvidence({...h, rank: 1, margin: 10}), assessEvidence({...h, rank: 4, margin: -10}));
  assert.equal(assessEvidence({...h, evidences: [evidence('a')]}).level, 'parcial');
  assert.equal(assessEvidence({...h, conflicts: [{structure: 'd'}]}).level, 'com_conflitos');
  assert.equal(assessEvidence({score: 0, evidences: [], conflicts: []}).level, 'insuficiente');
  assert.equal(assessEvidence({...h, evidences: [evidence('a'), evidence('a'), evidence('b')]}).level, 'parcial');
  assert.equal(assessEvidence(h, {minimumSupportingStructuresForConclusion: 4}).level, 'parcial');
});

test('posição distingue líder, empate no topo, empate abaixo e ausência de liderança', () => {
  assert.equal(assessComparison({score: 8}, {topScore: 8, tiedCount: 1}).level, 'lider');
  assert.equal(assessComparison({score: 8}, {topScore: 8, tiedCount: 2}).label, 'No grupo líder');
  const belowTied = assessComparison({score: 3}, {topScore: 8, tiedCount: 2});
  assert.equal(belowTied.label, 'Grupo empatado');
  assert.equal(belowTied.scoreGap, 5);
  assert.match(belowTied.detail, /5 pontos abaixo da líder/);
  assert.equal(assessComparison({score: 3}, {topScore: 8, tiedCount: 1}).label, 'Abaixo da líder');
  assert.equal(assessComparison({score: -1}, {topScore: 0, tiedCount: 1}).level, 'sem_lideranca');
});

test('mastigador é sustentação parcial; élitros evidencia conflitos nas outras hipóteses', () => {
  const p = getProtocolById('ordens-insecta-v1');
  let session = runSession(addSessionObservation(startSession(p), {structure:'aparelho_bucal',value:'mastigador'}));
  assert.ok(session.investigation.hypotheses.filter(h => h.score > 0).every(h => h.assessment.level === 'parcial' && h.comparison.level === 'empatada'));
  session = runSession(addSessionObservation(session, {structure:'asas', value:'elitros'}));
  const orthoptera = session.investigation.hypotheses.find(h => h.id === 'orthoptera');
  assert.equal(orthoptera.assessment.level, 'com_conflitos');
  assert.equal(orthoptera.comparison.level, 'menor_sustentacao');
  assert.ok(orthoptera.score > 0, 'Conflito deve aparecer mesmo com saldo positivo');
});

test('hipóteses bem sustentadas podem empatar sem permitir conclusão', () => {
  const p = {
    id: 'assessment-test',
    observations: ['a','b','c'].map(structure => ({structure, values:['observado']})),
    hypotheses: [{id:'h1', name:'H1'}, {id:'h2', name:'H2'}],
    investigationPolicy: {minimumObservedStructuresForConclusion:3, minimumSupportingStructuresForConclusion:3},
    rules: ['h1','h2'].flatMap(hypothesis => ['a','b','c'].map(structure => ({...evidence(structure), hypothesis, weight:3}))),
  };
  let session = startSession(p);
  for (const structure of ['a','b','c']) session = runSession(addSessionObservation(session, {structure, value:'observado'}));
  assert.ok(session.investigation.hypotheses.every(h => h.assessment.level === 'bem_sustentada' && h.comparison.level === 'empatada'));
  assert.notEqual(session.investigation.conclusion.status, 'concluida');
  assert.equal(generateSessionReport(session).leadingHypothesis, null);
  assert.equal(generateSessionReport(session).confidence, 'Bem sustentada');
});
