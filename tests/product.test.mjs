import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access,readdir} from 'node:fs/promises';
import * as model from '../prototype/domain.mjs';
import {metrics} from '../measurement/metrics.mjs';
import * as ui from '../prototype/ui.mjs';
import * as product from '../prototype/product.mjs';
import {lab,questionLab,qualify} from './browser-harness.mjs';
const root=new URL('../',import.meta.url);
const begin=async alias=>{const l=await lab();l.register(alias);l.click('disclosure');l.click('question');return l;};

test('five illustrated account rows preserve all fixture mappings and registration events',async()=>{
  const l=await lab();l.click('choose');assert.equal((l.get('accounts').innerHTML.match(/class="account-row"/g)||[]).length,5);assert.doesNotMatch(l.get('accounts').innerHTML,/<select/);
  for(const person of ui.personas){l.register(person.alias);assert.equal(l.state().active_participant_id,person.id);assert.equal(l.state().events.filter(e=>e.event_type==='registration_attempted').at(-1).alias_token,person.alias);assert.equal(l.get('accounts').open,false);assert(l.get('identity').innerHTML.includes(person.name));assert.doesNotMatch(l.get('identity').innerHTML,/L-JOHN|L-MAYA|L-SAM|L-AVERY|\(synthetic\)/);}
  assert.equal(new Set(l.state().registrations.map(r=>r.canonical_participant_id)).size,4);
});
test('account rows pair one readable status with each local icon and distinguish the returning alias',()=>{
  const rows=[...product.accounts().matchAll(/<button type="button" class="account-row" data-action="register" data-id="([^"]+)">([\s\S]*?)<\/button>/g)];assert.equal(rows.length,5);
  for(const [index,[,alias,markup]]of rows.entries()){
    const person=ui.personas[index];assert.equal(alias,person.alias);assert(markup.includes('assets/'+person.portrait+'.svg'));assert(markup.includes(person.name));assert.equal((markup.match(/Invitation (?:approved|pending)/g)||[]).length,1);assert.equal((markup.match(/Identity (?:not verified|verified \(demo\))/g)||[]).length,1);assert.doesNotMatch(markup,/account-icons|[✓◆◌◷↻]/);
    assert(markup.includes('icons/lucide/'+(alias==='sam-waiting'?'clock':'circle-check')+'.svg'));assert(markup.includes('icons/lucide/'+(alias==='maya-primary'?'shield-check':'shield')+'.svg'));for(const [,attributes]of markup.matchAll(/<img class="account-icon" ([^>]+)>/g)){assert(attributes.includes('alt=""'));assert(attributes.includes('aria-hidden="true"'));}
    assert.equal(markup.includes('rotate-ccw-clock.svg'),person.returning);assert.equal(markup.includes('Returning</span>'),person.returning);if(person.returning)assert(markup.includes('Resume John’s saved questions'));
  }
});
test('chooser vendors only five safe SVG assets with upstream license and attribution',async()=>{
  const folder=new URL('prototype/assets/icons/lucide/',root);assert.deepEqual((await readdir(folder)).filter(name=>name.endsWith('.svg')).sort(),['circle-check.svg','clock.svg','rotate-ccw-clock.svg','shield-check.svg','shield.svg']);for(const name of ['circle-check','shield-check','shield','rotate-ccw-clock','clock']){const svg=await readFile(new URL(name+'.svg',folder),'utf8');assert.match(svg,/viewBox="0 0 24 24"/);assert.match(svg,/stroke-width="2"/);assert.doesNotMatch(svg,/<script|<foreignObject|<image\b|onload=|href=/);}
  const license=await readFile(new URL('LICENSE',folder),'utf8');for(const notice of ['ISC License','Lucide Icons and Contributors','The MIT License (MIT)','Cole Bemis'])assert(license.includes(notice));const attribution=await readFile(new URL('README.md',folder),'utf8');assert(attribution.includes('c29c276f16590cf017126671535ad8c792be64d8'));assert(attribution.includes('[LICENSE](LICENSE)'));
});

test('returning John resumes saved work without double-counting and Avery stays distinct',async()=>{
  const l=await questionLab(undefined,{wallet:false});l.click('offchain');l.click('queue');qualify(l);l.register('john-returning-alias');assert.match(l.html(),/Welcome back, John/);assert.match(l.html(),/one saved question/);assert.doesNotMatch(l.html(),/Canonical identity|fixed synthetic fixture|Choose another fixture/);l.click('disclosure');assert.equal(metrics(l.state(),{includeQA:true}).disclosure_viewers,1);assert.equal(l.state().questions.length,1);l.register('avery-primary');l.click('disclosure');assert.equal(metrics(l.state(),{includeQA:true}).disclosure_viewers,2);assert.equal(metrics(l.state(),{includeQA:true}).qualified_participants,1);
});
test('homepage and evaluator surfaces have clear context, local original artwork and no fake market controls',async()=>{
  const l=await lab();assert.match(l.get('identity').innerHTML,/Choose participant/);assert.match(l.html(),/Community Disclosure Review/);assert.match(l.html(),/No live market quotations/);assert.equal((l.html().match(/class="asset-tile"/g)||[]).length,3);assert.doesNotMatch(l.html(),/Buy now|Trade now|\$[0-9]/);
  const index=await readFile(new URL('prototype/index.html',root),'utf8');for(const label of ['Evaluator Control Center','Participant Journey','Reviewer Queue','Measurement','Switch Synthetic Persona','Reset Live Sandbox','Recruiter Demo Companion','Evaluator handoff'])assert(index.includes(label));assert.doesNotMatch(index,/Draft evaluator handoff|No fixture selected/);
  const markup=l.html()+product.accounts()+product.profile(null);for(const [,path]of markup.matchAll(/src="([^"]+)"/g)){await access(new URL('prototype/'+path,root));const svg=await readFile(new URL('prototype/'+path,root),'utf8');assert.match(svg,/<svg/);assert.doesNotMatch(svg,/<script|<foreignObject|<image\b/);}
});
test('homepage keeps the primary invitation without redundant labels and retains evaluator navigation',async()=>{
  const l=await lab();assert.match(l.html(),/A closer look\. A better question\./);assert.match(l.html(),/Explore the ideas, assumptions and evidence behind emerging Web3 projects\./);assert.match(l.html(),/Review disclosure & participate/);assert.doesNotMatch(l.html(),/ASSET DISCOVERY \/ COMMUNITY PARTICIPATION|No wallet required/);assert.equal(l.get('mode-indicator').hidden,true);assert.equal(l.get('mode-indicator').textContent,'');
  l.click('choose');assert.equal(l.get('accounts').open,true);assert.equal((l.get('accounts').innerHTML.match(/class="account-row"/g)||[]).length,5);assert.equal(l.state().registrations.length,0);l.click('register','john-primary');assert.equal(l.state().active_participant_id,'L-JOHN');
  l.click('queue');assert.equal(l.get('mode-indicator').hidden,false);assert.match(l.get('mode-indicator').textContent,/Reviewer mode/);l.click('dashboard');assert.equal(l.get('mode-indicator').hidden,false);assert.match(l.get('mode-indicator').textContent,/Measurement mode/);l.click('journey');assert.match(l.html(),/Welcome, John/);l.click('switch');assert.equal(l.get('accounts').open,true);l.get('reset').emit('click');assert.equal(l.state().active_participant_id,null);assert.equal(l.get('mode-indicator').hidden,true);
  const index=await readFile(new URL('prototype/index.html',root),'utf8');const controls=index.match(/<nav class="tabs"[^>]*>(.*?)<\/nav>/)[1];assert.equal((controls.match(/<button/g)||[]).length,5);
});

test('disclosure retains four stable material references with a proposed Web3 narrative',()=>{
  assert.deepEqual(model.SECTIONS.map(s=>s.id),['pilot','reporting','verification','risk']);const text=model.SECTIONS.map(s=>s.text).join(' ');for(const word of ['tamper-evident','on-chain attestations','smart-contract','governance','uncertain legal requirements'])assert(text.includes(word));const markup=product.disclosure(model.createSession().participants[0]);assert.doesNotMatch(markup,/<span class="eyebrow">(?:pilot|reporting|verification|risk)<\/span>|view, not evidence of reading/);assert.match(markup,/No verified assets, independent audit/);
});
test('single-question topic dropdown hides identifiers and does not add Other',async()=>{
  const l=await begin();const options=l.get('section').innerHTML;for(const section of model.SECTIONS)assert(options.includes('value="'+section.id+'">'+section.title));assert.equal((options.match(/<option/g)||[]).length,5);assert.doesNotMatch(options,/pilot ·|reporting ·|verification ·|risk ·|>Other</);assert.match(l.html(),/maxlength="2000"/);assert.doesNotMatch(l.html(),/UTF-16 units|Synthetic content only/);
});
test('draft counter and saved status reflect the actual in-memory save and survive backward navigation',async()=>{
  const l=await begin();assert.equal(l.get('draft-status').textContent,'');l.get('question-text').value='Which audit?';l.get('section').value='verification';l.input('question-text');assert.equal(l.get('draft-status').textContent,'✓ Draft saved');assert.equal(l.get('question-count').textContent,'12 / 2,000 characters');assert.equal(l.state().drafts['L-JOHN'].text,'Which audit?');l.click('back');l.click('question');assert.equal(l.get('question-text').value,'Which audit?');assert.equal(l.get('section').value,'verification');assert.match(l.html(),/Drafts stay in this tab/);assert.match(l.html(),/✓ Draft saved/);
});
test('Keep editing and Escape preserve a meaningful draft without recording abandonment',async()=>{
  const l=await begin();l.get('question-text').value='Keep this question.';l.get('section').value='risk';l.input('section');l.click('abandon');assert.equal(l.get('discard').open,true);assert.equal(l.state().events.filter(e=>e.event_type==='disclosure_abandoned').length,0);l.click('keep-editing');assert.equal(l.get('question-text').value,'Keep this question.');assert.equal(l.get('section').value,'risk');assert.equal(l.focus().id,'question-text');l.click('abandon');l.get('discard').emit('cancel');assert.equal(l.get('discard').open,false);assert.equal(l.state().drafts['L-JOHN'].text,'Keep this question.');assert.equal(l.state().events.filter(e=>e.event_type==='disclosure_abandoned').length,0);
});
test('a selected topic alone needs confirmation; discard uses existing abandonment behavior',async()=>{
  const l=await begin();l.get('section').value='risk';l.input('section');l.click('abandon');assert.equal(l.get('discard').open,true);assert.equal(l.state().drafts['L-JOHN'].section_id,'risk');l.click('discard');assert.equal(l.state().drafts['L-JOHN'],undefined);assert.equal(l.state().events.filter(e=>e.event_type==='disclosure_abandoned').length,1);assert.match(l.html(),/Welcome, John/);
});
test('empty drafts exit immediately and over-limit input keeps existing validation semantics',async()=>{
  const l=await begin();l.click('abandon');assert.equal(l.get('discard').open,false);assert.equal(l.state().events.filter(e=>e.event_type==='disclosure_abandoned').length,1);l.click('question');l.get('question-text').value='a'.repeat(2001);l.get('section').value='risk';l.input('question-text');assert.equal(l.get('question-count').textContent,'2,001 / 2,000 characters');assert.equal(l.get('question-count').attributes.get('data-limit-exceeded'),'true');l.submit('question-form');assert.match(l.get('question-error').textContent,/2,000/);assert.equal(l.state().questions.length,0);assert.equal(l.state().drafts['L-JOHN'].text.length,2001);
});
test('submission success precedes every optional acknowledgement decision without prominent question IDs',async()=>{
  const l=await questionLab(undefined,{wallet:false});assert.match(l.html(),/Question saved/);assert.match(l.get('ack').innerHTML,/Your question has been submitted for review/);assert.match(l.get('ack').innerHTML,/Would you like to record an acknowledgement of your participation/);assert.doesNotMatch(l.get('ack').innerHTML,/<h[12][^>]*>[^<]*LQ001/);assert.equal(l.state().questions[0].wallet_decision,'pending');assert.equal(l.state().ack_attempts.length,0);
});
test('John can explore KYC information without changing verification, qualification or sponsorship',async()=>{
  const l=await questionLab(undefined,{wallet:false});l.click('ack-proceed');assert.equal(l.get('sponsorship').open,true);assert.match(l.get('sponsorship').innerHTML,/Network fee sponsorship/);l.click('kyc-info');assert.equal(l.get('kyc').open,true);assert.match(l.get('kyc').innerHTML,/No verification service is connected/);assert.doesNotMatch(l.get('kyc').innerHTML,/<input|<form/);assert.equal(l.state().participants[0].kyc_demo_status,'not_verified');assert.equal(l.state().events.filter(e=>e.event_type==='kyc_scenario_changed').length,0);l.click('without-kyc');assert.equal(l.get('ack').open,true);assert.match(l.get('ack').innerHTML,/Sponsored acknowledgements available: 0 of 2/);await l.click('connect');l.click('acknowledge');assert.equal(l.state().ack_attempts[0].sponsored_demo,false);assert.equal(l.state().ack_attempts[0].gas_policy,'self_funded_unverified');assert.equal(l.state().questions[0].review_status,'pending_review');assert.match(l.html(),/Self-funded simulation · No fee charged/);
});
test('verified Maya proceeds directly to the wallet without an unnecessary KYC prompt',async()=>{
  const l=await questionLab('maya-primary',{wallet:false});l.click('ack-proceed');assert.equal(l.get('sponsorship').open,false);assert.equal(l.get('kyc').open,false);assert.match(l.get('ack').innerHTML,/Sponsored acknowledgements available: 2 of 2/);await l.click('connect');l.click('acknowledge');assert.equal(l.state().ack_attempts[0].sponsored_demo,true);assert.match(l.html(),/Sponsored simulation · No fee charged/);
});
test('connection states show progress, failure, retry and success while retaining the saved question',async()=>{
  const l=await questionLab();assert.match(l.get('ack').innerHTML,/Not connected/);l.change('connect-outcome','failure');const pending=l.click('connect');assert.match(l.get('ack').innerHTML,/<strong>Connecting<\/strong>/);assert.match(l.get('ack').innerHTML,/disabled aria-busy="true"/);await pending;assert.match(l.get('ack').innerHTML,/Connection failed/);assert.match(l.get('ack').innerHTML,/Retry connection/);l.change('connect-outcome','success');await l.click('connect');assert.match(l.get('ack').innerHTML,/Connected successfully/);assert.match(l.get('ack').innerHTML,/Demo wallet connection · No real wallet access/);assert.equal(l.state().questions.length,1);assert.equal(l.state().wallet_connections.length,1);
});
test('off-chain continuation during connection prevents a late connection from changing state',async()=>{
  const l=await questionLab();const pending=l.click('connect');l.click('offchain');await pending;assert.equal(l.state().questions.length,1);assert.equal(l.state().questions[0].wallet_decision,'off_chain');assert.equal(l.state().wallet_connections.length,0);assert.equal(l.state().events.filter(e=>e.event_type==='wallet_connection_result').length,0);assert.equal(l.get('ack').open,false);
});
test('off-chain continuation stays available in offer, sponsorship, KYC and wallet dialogs',async()=>{
  for(const stage of ['offer','sponsorship','kyc','wallet']){const l=await questionLab(undefined,{wallet:false});if(stage!=='offer')l.click('ack-proceed');if(stage==='kyc')l.click('kyc-info');if(stage==='wallet')l.click('without-kyc');l.click('offchain');assert.equal(l.state().questions[0].wallet_decision,'off_chain',stage);assert.equal(l.state().questions.length,1);assert.equal(l.state().ack_attempts.length,0);for(const id of ['ack','sponsorship','kyc'])assert.equal(l.get(id).open,false);}
});
test('successful acknowledgement has a separate traceable receipt without qualifying the question',async()=>{
  const l=await questionLab();await l.click('connect');l.click('acknowledge');const a=l.state().ack_attempts[0];assert.match(l.html(),/Demo acknowledgement recorded successfully/);assert.match(l.html(),/Simulated receipt reference/);assert(l.html().includes('DEMO-LQ001-V1-'+a.attempt_id));assert(l.html().includes(a.at));assert.match(l.html(),/Current question review status<\/dt><dd>Awaiting review/);assert.match(l.html(),/Self-funded simulation · No fee charged/);assert.equal(a.real_transaction,false);assert.equal(l.state().questions[0].review_status,'pending_review');assert.doesNotMatch(l.html(),/etherscan|blockscout|0x[0-9a-f]{40,}/i);
});
test('reviewer primary labels use names and Technical Evidence retains canonical references',async()=>{
  const l=await questionLab(undefined,{wallet:false});l.click('offchain');l.click('queue');const visibleOptions=l.get('review-question').innerHTML.replace(/<[^>]+>/g,'');assert.match(visibleOptions,/John Doe — Awaiting review/);assert.doesNotMatch(visibleOptions,/LQ001|L-JOHN|pending_review/);assert.match(l.html(),/Technical Evidence/);assert.match(l.html(),/canonical_participant_id/);assert.match(l.html(),/L-JOHN/);assert.match(l.html(),/QUESTION REVIEW/);assert.match(l.html(),/ACKNOWLEDGEMENT/);assert.match(l.html(),/FOLLOW-UP/);
});
test('review and follow-up success feedback stays next to the action with preserved focus context',async()=>{
  const l=await questionLab(undefined,{wallet:false});l.click('offchain');l.click('queue');qualify(l);assert.equal(l.get('review-feedback').textContent,'✓ Review decision saved — Question qualified');assert.equal(l.focus().id,'review-feedback');assert.equal(l.focus().options.preventScroll,true);assert.equal(l.get('next-action').value,'');assert.match(l.get('next-action').attributes.get('placeholder'),/Request source evidence/);assert.match(l.get('followup-owner').innerHTML,/>Operations Reviewer<\/option>/);assert.match(l.get('followup-owner').innerHTML,/>Engineering Reviewer<\/option>/);
  l.get('followup-owner').value='Synthetic operations reviewer';l.get('followup-status').value='triaged';l.get('next-action').value='Request the monthly source records';l.submit('followup-form');assert.match(l.get('followup-feedback').textContent,/✓ Follow-up saved — Triaged and assigned to Operations Reviewer/);assert.equal(l.focus().id,'followup-feedback');assert.equal(l.focus().options.preventScroll,true);assert.equal(l.state().questions[0].review_status,'qualified');assert.equal(l.state().questions[0].followup_status,'triaged');assert.equal(l.get('next-action').value,'Request the monthly source records');
});
test('demo wallets remain isolated per person and a fresh tab has independent session state',async()=>{
  const l=await questionLab();await l.click('connect');l.click('acknowledge');l.register('maya-primary');l.click('disclosure');l.click('question');l.save('Who owns the reporting process?');assert.match(l.get('ack').innerHTML,/Not connected/);assert.deepEqual(l.state().wallet_connections,['L-JOHN']);const fresh=await lab();assert.equal(fresh.state().questions.length,0);assert.equal(fresh.state().registrations.length,0);assert.equal(l.state().questions.length,2);assert.equal(l.state().wallet_connections[0],'L-JOHN');
});

test('secondary question-form actions cannot submit through native button defaults',async()=>{
  const l=await begin();const secondary=[...l.html().matchAll(/<button\b[^>]*data-action="(?:back|abandon)"[^>]*>/g)];assert.equal(secondary.length,2);assert(secondary.every(match=>/type="button"/.test(match[0])));assert.match(l.html(),/type="submit">Submit question/);
});
