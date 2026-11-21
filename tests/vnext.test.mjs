import assert from 'node:assert/strict';
import fs from 'node:fs';
import {selectPlan,makeQuestions,scoreFor} from '../js/engine.js';
const words=JSON.parse(fs.readFileSync(new URL('../data/words.json',import.meta.url),'utf8'));
for(const goal of [3,5,7,10]){
 const ids=selectPlan(words,{},50,'2026-11-22',[],goal);
 assert.equal(ids.length,goal,`Goal ${goal} must yield ${goal} words`);
 const single=makeQuestions(ids,words,'learn',['typing']);
 assert.equal(single.length,2*goal,`Even one enabled question type must allow two independent attempts`);
 assert.ok(single.every(q=>q.type==='typing'));
}
const all=selectPlan(words,{},50,'2026-11-22',[],5);
const ids=makeQuestions(all,words,'learn',['choice','listening']);
assert.equal(ids.length,10);
const fail=scoreFor(all[0],{answers:[{wordId:all[0],correct:false},{wordId:all[0],correct:false}]});
assert.equal(fail.mistakes,2);
console.log('Talagh vNext personalization logic passed.');
