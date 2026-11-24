import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {makeQuickReviewQuestions} from '../js/engine.js';
const words=JSON.parse(readFileSync(new URL('../data/words.json',import.meta.url),'utf8'));
const ids=words.slice(0,20).map(w=>w.id);
for(const types of [['choice','typing','blank','listening'],['typing'],['blank'],['listening'],['choice']]){
  const questions=makeQuickReviewQuestions(ids,words,types);
  assert.equal(questions.length,20,'exactly one question per word');
  assert.equal(new Set(questions.map(q=>q.wordId)).size,20,'no repeated word');
  assert.equal(new Set(questions.map(q=>q.id)).size,20,'unique question IDs');
  for(const q of questions)assert.ok(['choice','typing','blank','listening'].includes(q.type));
}
const varied=makeQuickReviewQuestions(ids,words,['choice','typing','blank','listening']);
assert.ok(new Set(varied.map(q=>q.type)).size>=2,'multiple question formats');
assert.equal(makeQuickReviewQuestions([ids[0],ids[0],ids[1]],words).length,2,'de-duplicates IDs');
assert.equal(makeQuickReviewQuestions(['not-in-bank'],words).length,0,'ignores missing words');
const app=readFileSync(new URL('../js/app.js',import.meta.url),'utf8');
assert.ok(app.includes("if(state.quiz.mode==='quick'){/* Optional practice"),'no attempt or day writes');
assert.ok(app.includes("if(quiz.mode==='quick'){renderQuickReviewResults(quiz);return;}"),'no SRS progress writes');
assert.ok(app.includes('learnedQuickReviewIds()'),'eligible learned words only');
console.log('Talagh v11 Quick Review tests passed.');
