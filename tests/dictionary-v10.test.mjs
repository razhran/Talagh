import fs from 'node:fs';import assert from 'node:assert/strict';
const words=JSON.parse(fs.readFileSync(new URL('../data/words.json', import.meta.url)));
const app=fs.readFileSync(new URL('../js/app.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../assets/native.css',import.meta.url),'utf8');
assert.equal(words.length,418);
assert.equal(new Set(words.map(w=>w.id)).size,418);
const enriched=words.filter(w=>w.otherMeanings?.length);
assert(enriched.length>=350);
for(const w of words){assert(w.arabic&&w.definition);for(const m of w.otherMeanings||[])assert(m.arabic&&m.definition);}
assert(app.includes('dictionarySenses(w,true)'));
assert(app.includes('dictionarySenses(w)}'));
assert(app.includes('otherMeanings:nextSenses'));
assert(!app.includes('استبدل الكلمة · I know this word'));
assert(app.includes('study-card-controls'));
assert(css.includes('.study-feature .replace-word-btn'));
assert(!fs.readFileSync(new URL('../js/engine.js',import.meta.url),'utf8').includes('otherMeanings'));
console.log(`v10 dictionary tests passed (${enriched.length} terms enriched)`);
