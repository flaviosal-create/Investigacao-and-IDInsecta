import test from 'node:test';
import assert from 'node:assert/strict';
import { getProtocolById } from '../src/config/protocolCatalog.js';
import { startSession, addSessionObservation, removeSessionObservation, runSession, finalizeSession, generateSessionReport } from '../src/engine/sessionEngine.js';
import { calculateHypotheses } from '../src/engine/HypothesisEngine.js';
import { suggestObservation } from '../src/engine/SuggestionEngine.js';
import { loadPersistedSession, saveSession } from '../src/utils/sessionPersistence.js';
const protocol = getProtocolById('ordens-insecta-v1');
const observe = (session, structure, value) => runSession(addSessionObservation(session, {structure, value}));

test('mastigador mantém as 12 hipóteses favorecidas empatadas, sem liderança no relatório ou histórico', () => {
  const session = observe(startSession(protocol), 'aparelho_bucal', 'mastigador');
  const positive = session.investigation.hypotheses.filter(h => h.score > 0);
  assert.equal(positive.length, 12);
  assert.equal(new Set(positive.map(h => h.score)).size, 1);
  assert.ok(positive.every(h => h.rank === 1 && h.isTied && !h.isLeader && h.confidence.level === 'disputada'));
  const report = generateSessionReport(session);
  assert.equal(report.leadingHypothesis, null);
  assert.equal(report.confidence, "Sustentação parcial");
  assert.equal(report.competingHypothesis, null);
  assert.equal(report.tiedHypotheses.length, 12);
  assert.doesNotMatch(report.narrative, /Orthoptera lidera|Hipótese líder:|disputa com Phasmatodea/);
  assert.ok(report.history.every(e => !e.leader));
  assert.equal(session.investigation.suggestion.comparedHypotheses.length, 12);
  assert.equal(finalizeSession(session).investigation.nextProtocol, null);
});

test('característica discriminativa cria liderança e sua remoção restaura o empate', () => {
  let session = observe(startSession(protocol), 'aparelho_bucal', 'mastigador');
  session = observe(session, 'asas', 'elitros');
  assert.deepEqual(session.investigation.hypotheses.filter(h => h.rank === 1).map(h => h.id), ['dermaptera', 'coleoptera']);
  session = observe(session, 'corpo', 'corpo_duro');
  assert.equal(generateSessionReport(session).leadingHypothesis, 'Coleoptera');
  assert.equal(session.investigation.hypotheses[0].isLeader, true);
  session = runSession(removeSessionObservation(session, 'corpo'));
  assert.equal(generateSessionReport(session).leadingHypothesis, null);
  assert.equal(generateSessionReport(session).tiedHypotheses.length, 2);
});

test('perfis iguais permanecem empatados com uma ou várias observações, incluindo conflitos', () => {
  for (const id of ['ordens-insecta-v1', 'familias-coleoptera-v1', 'classes-arthropoda-v1']) {
    const p = getProtocolById(id);
    const signature = (h, structure, value) => p.rules.filter(r => r.hypothesis === h.id && r.structure === structure && r.value === value).map(r => r.effect).sort().join(',');
    let checks = 0;
    for (let a = 0; a < p.hypotheses.length; a++) {
      for (let b = a + 1; b < p.hypotheses.length; b++) {
        const left = p.hypotheses[a], right = p.hypotheses[b];
        const observations = [];
        for (const definition of p.observations) {
          const matches = definition.values.filter(value => signature(left, definition.structure, value) === signature(right, definition.structure, value));
          for (const value of matches) {
            const ranked = calculateHypotheses([...observations, {structure: definition.structure, value}], p);
            const l = ranked.find(h => h.id === left.id), r = ranked.find(h => h.id === right.id);
            assert.equal(l.score, r.score, `${id}: ${left.id}/${right.id} em ${definition.structure}`);
            assert.equal(l.rank, r.rank);
            checks++;
          }
          if (matches.length) observations.push({structure: definition.structure, value: matches[0]});
        }
      }
    }
    assert.ok(checks > 0);
  }
});

test('ordem do cadastro não escolhe líder nem altera sugestão em empate', () => {
  const observations = [{structure: 'aparelho_bucal', value: 'mastigador'}];
  const reversed = {...protocol, hypotheses: [...protocol.hypotheses].reverse(), rules: [...protocol.rules].reverse()};
  const normal = calculateHypotheses(observations, protocol);
  const reverse = calculateHypotheses(observations, reversed);
  const byId = hs => hs.map(h => [h.id, h.score, h.rank, h.isLeader, h.confidence.level]).sort();
  assert.deepEqual(byId(normal), byId(reverse));
  assert.equal(suggestObservation(observations, protocol, normal).structure, suggestObservation(observations, reversed, reverse).structure);
});

test('sessão persistida recalcula pesos antigos sem perder observações', () => {
  const session = observe(startSession(protocol), 'aparelho_bucal', 'mastigador');
  session.investigation.hypotheses[0].score = 99;
  const data = new Map();
  const storage = {getItem: k => data.get(k), setItem: (k,v) => data.set(k,v)};
  saveSession(session, storage);
  const restored = runSession(loadPersistedSession(protocol, storage));
  assert.deepEqual(restored.investigation.observations, session.investigation.observations);
  assert.equal(generateSessionReport(restored).leadingHypothesis, null);
});


test('uma única observação nunca autoriza conclusão nos protocolos do estudo', () => {
  for (const id of ['ordens-insecta-v1', 'familias-coleoptera-v1', 'classes-arthropoda-v1']) {
    const p = getProtocolById(id);
    for (const observation of p.observations) {
      for (const value of observation.values) {
        const session = observe(startSession(p), observation.structure, value);
        assert.notEqual(session.investigation.conclusion?.status, 'concluida');
        assert.notEqual(session.investigation.decision?.status, 'concluir');
      }
    }
  }
});
