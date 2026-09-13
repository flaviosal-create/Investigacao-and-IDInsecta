import test from 'node:test';
import assert from 'node:assert/strict';
import { getThermometerScale, getThermometerFill } from '../src/utils/hypothesisThermometer.js';
import { getProtocolById } from '../src/config/protocolCatalog.js';
import { startSession, addSessionObservation, runSession } from '../src/engine/sessionEngine.js';
const p = getProtocolById('ordens-insecta-v1');
const observe = (s, structure, value) => runSession(addSessionObservation(s, {structure, value}));

test('termômetro mantém mastigadores empatados sem preencher a escala inteira', () => {
  const s = observe(startSession(p), 'aparelho_bucal', 'mastigador');
  const fills = s.investigation.hypotheses.filter(h => h.score > 0).map(h => getThermometerFill(h.score, getThermometerScale(p)));
  assert.equal(fills.length, 12);
  assert.equal(new Set(fills).size, 1);
  assert.ok(fills[0] > 0 && fills[0] < 100);
});

test('conflito reduz a barra mesmo sem mudar a quantidade de evidências favoráveis', () => {
  const s = observe(startSession(p), 'aparelho_bucal', 'mastigador');
  const conflict = observe(s, 'asas', 'escamas');
  const before = s.investigation.hypotheses.find(h => h.id === 'orthoptera');
  const after = conflict.investigation.hypotheses.find(h => h.id === 'orthoptera');
  assert.equal(before.evidences.length, after.evidences.length);
  assert.ok(after.conflicts.length > before.conflicts.length);
  const scale = getThermometerScale(p);
  assert.ok(getThermometerFill(after.score, scale) < getThermometerFill(before.score, scale));
});

test('a escala independe do líder e representa saldos não positivos com barra vazia', () => {
  const scale = getThermometerScale(p);
  assert.equal(getThermometerFill(-3, scale), 0);
  assert.equal(getThermometerFill(0, scale), 0);
  assert.equal(getThermometerFill(10, 0), 0);
  assert.equal(getThermometerScale(null), 0);
  assert.equal(getThermometerFill(scale * 2, scale), 100);
});
