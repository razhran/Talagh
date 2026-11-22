import fs from 'node:fs';
import assert from 'node:assert/strict';
import {selectPlan,makeQuestions,isTechnical} from '../js/engine.js';
const words=JSON.parse(fs.readFileSync(new URL('../data/words.json',import.meta.url),'utf8'));
assert.ok(words.length>=340);
const ids=new Set(),terms=new Set();
for(const w of words){
 for(const field of ['id','word','arabic','definition','example','category','level','source'])assert.ok(typeof w[field]==='string'&&w[field].trim(),`${w.id}: missing ${field}`);
 assert.ok(!ids.has(w.id),`Duplicate id ${w.id}`);ids.add(w.id);
 const normalized=w.word.toLowerCase().replace(/\s+/g,' ').trim();assert.ok(!terms.has(normalized),`Duplicate term ${w.word}`);terms.add(normalized);
 if(w.id.startsWith('v7-')){assert.ok(['neutral','formal','informal','literary','expressive'].includes(w.register));assert.ok(['B2+','C1'].includes(w.level));assert.equal(w.source,'builtin');}
}
const plan=selectPlan(words,{},15,'2026-11-22',[],10);assert.equal(plan.length,10);assert.equal(new Set(plan).size,10);
const chosen=plan.map(id=>words.find(w=>w.id===id));assert.ok(chosen.filter(isTechnical).length<=4);
const quiz=makeQuestions(plan,words);assert.ok(quiz.length>0);
console.log(`PASS: ${words.length} unique words, ${words.filter(w=>w.id.startsWith('v7-')).length} v7 additions; planning and quiz generation`);
