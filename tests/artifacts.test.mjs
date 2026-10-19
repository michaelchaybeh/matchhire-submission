import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const read=p=>readFile(new URL(p,root),'utf8');
test('exactly five prioritized backlog tasks are documented',async()=>{const text=await read('docs/backlog.md');assert.equal((text.match(/\| P[01] · T[1-5] \|/g)||[]).length,5);});
test('all assessment Markdown artifact links resolve locally',async()=>{for(const file of ['README.md','intent.md','directive.md','docs/prd.md','docs/backlog.md','docs/journey-and-rules.md','docs/experiment.md','docs/weekly-decision-memo.md','measurement/README.md','evidence/verification.md']){const text=await read(file);for(const match of text.matchAll(/\]\(([^)]+)\)/g)){const target=match[1].split('#')[0];if(!target||/^[a-z]+:/i.test(target))continue;await assert.doesNotReject(()=>access(new URL(target,new URL(file,root))),`${file} → ${target}`);}}});
test('UI uses escaped bounded question previews and local-only data request',async()=>{const app=await read('prototype/app.js'),css=await read('prototype/styles.css');assert.match(app,/esc\(q\.text/);assert.match(app,/\.slice\(0,160\)/);assert.match(css,/max-height:180px;overflow:auto/);assert.match(app,/fetch\('\.\.\/data\/experiment.synthetic.json'\)/);assert.doesNotMatch(app,/localStorage|sessionStorage|https:\/\//);});
test('submission documents do not contain private vault copy or internal instruction links',async()=>{for(const file of ['README.md','intent.md','directive.md','docs/prd.md','docs/backlog.md','docs/journey-and-rules.md','docs/experiment.md','docs/weekly-decision-memo.md']){const text=await read(file);assert.doesNotMatch(text,/\.obsidian\/|internal\/AGENTS\.md|docs\/decisions\/2026/);}});
