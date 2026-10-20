import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as model from '../prototype/domain.mjs';
import {metrics,compare} from '../measurement/metrics.mjs';
import * as ui from '../prototype/ui.mjs';

// A dependency-free DOM adapter runs the actual app handlers in an isolated session.
// It tests control values and generated markup; native browser behavior is checked separately.
const decode=text=>text.replace(/&(?:amp|lt|gt|quot|#39);/g,s=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"}[s]));
async function lab(){
  const elements=new Map(),listeners=new Map();
  class Element{
    constructor(id='',tag='div',attrs=''){this.id=id;this.tag=tag;this.dataset={};this.listeners=new Map();this.textContent='';this.value='';this.checked=/\bchecked\b/.test(attrs);this.hidden=/\bhidden\b/.test(attrs);this.open=/\bopen\b/.test(attrs);this.children=[];this.attributes=new Map();this.html='';for(const a of attrs.matchAll(/([\w-]+)="([^"]*)"/g)){this.attributes.set(a[1],decode(a[2]));if(a[1].startsWith('data-'))this.dataset[a[1].slice(5)]=decode(a[2]);}if(tag==='input')this.value=this.attributes.get('value')||'';}
    set innerHTML(html){
      for(const id of this.children)elements.delete(id);this.children=[];this.html=html;
      if(this.tag==='select'){const options=[...html.matchAll(/<option\b([^>]*)>([\s\S]*?)<\/option>/g)];const chosen=options.find(o=>/\bselected\b/.test(o[1]))||options[0];this.value=chosen?decode(chosen[1].match(/value="([^"]*)"/)?.[1]??chosen[2]):'';}
      if(this.tag==='textarea')this.value=decode(html);
      for(const match of html.matchAll(/<([a-z][\w-]*)\b([^>]*?\sid="([^"]+)"[^>]*)>/g)){
        const [whole,tag,attrs,id]=match,child=new Element(id,tag,attrs);elements.set(id,child);this.children.push(id);
        const start=match.index+whole.length,end=html.indexOf('</'+tag+'>',start);
        if(['select','textarea'].includes(tag))child.innerHTML=html.slice(start,end);
      }
    }
    get innerHTML(){return this.html;}
    addEventListener(type,fn){this.listeners.set(type,fn);}
    emit(type,event={}){this.listeners.get(type)?.({preventDefault(){},target:this,...event});}
    setAttribute(name,value){this.attributes.set(name,value);}
    removeAttribute(name){this.attributes.delete(name);}
    focus(){}
    showModal(){this.open=true;}
    close(){this.open=false;this.emit('close');}
  }
  for(const id of ['main','notice','identity','facts','event-log','raw-live','ack','certificate','certificate-content','close-certificate','print-certificate','reset','brand','mode-indicator'])elements.set(id,new Element(id));
  const tabs=['journey','queue','dashboard','switch'].map(action=>new Element('','button','data-action="'+action+'"'));
  const document={querySelector:selector=>elements.get(selector.slice(1)),querySelectorAll:()=>tabs,addEventListener:(type,fn)=>listeners.set(type,fn)};
  const fixture=JSON.parse(await readFile(new URL('../data/experiment.synthetic.json',import.meta.url),'utf8'));
  const app=(await readFile(new URL('../prototype/app.js',import.meta.url),'utf8')).replace(/^import .*;\r?\n/gm,'');
  await vm.runInNewContext('(async()=>{'+app+'\n})()',{document,model,metrics,compare,...ui,window:{print(){}},fetch:async()=>({ok:true,json:async()=>fixture})});
  const get=id=>{assert(elements.has(id),'Missing control '+id);return elements.get(id);};
  const click=(action,id)=>listeners.get('click')({target:{closest:()=>({dataset:{action,id}})}});
  const change=(id,value)=>{get(id).value=value;get(['connect-outcome','ack-outcome'].includes(id)?'ack':'main').emit('change',{target:get(id)});};
  const submit=id=>get('main').emit('submit',{target:get(id)});
  const register=(alias='john-primary')=>{get('persona').value=alias;click('register');};
  const save=(text='Who independently verifies monthly reports?')=>{get('section').value='verification';get('question-text').value=text;submit('question-form');};
  return {get,click,change,submit,register,save,state:()=>JSON.parse(get('raw-live').textContent),html:()=>get('main').innerHTML,tabs};
}
async function questionLab(alias){const l=await lab();l.register(alias);l.click('disclosure');l.click('question');l.save();return l;}
function qualify(l){l.change('review-status','qualified');l.get('review-reason').value='specific_material_gap';l.get('review-note').value='A specific investigable reporting evidence gap.';for(const id of ['material','actionable','not-spam'])l.get(id).checked=true;l.submit('review-form');}

test('unreviewed UI has human labels, no implicit reason and a hidden qualification checklist',async()=>{
  const l=await questionLab();l.click('offchain');assert.match(l.html(),/Review: Pending review/);l.click('queue');
  assert.equal(l.get('review-reason').value,'');assert.match(l.get('review-reason').innerHTML,/Choose a reason/);assert.doesNotMatch(l.get('review-reason').innerHTML,/specific_material_gap/);assert.equal(l.get('qualification-checklist').hidden,true);
  assert.match(l.get('review-status').innerHTML,/value="needs_clarification">Needs clarification/);assert.match(l.get('mode-indicator').textContent,/Reviewer mode/);assert.equal(l.tabs[1].attributes.get('aria-current'),'page');
});
test('decision changes filter reasons and toggle criteria without losing edited notes or checks',async()=>{
  const l=await questionLab();l.click('offchain');l.click('queue');l.get('review-note').value='Keep this edited note.';const note=l.get('review-note');
  l.change('review-status','qualified');assert.equal(l.get('qualification-checklist').hidden,false);assert.equal(l.get('review-reason').value,'');assert.match(l.get('review-reason').innerHTML,/Specific material disclosure gap/);assert.doesNotMatch(l.get('review-reason').innerHTML,/value="gibberish"/);
  l.get('review-reason').value='specific_material_gap';l.get('material').checked=true;l.change('review-status','needs_clarification');assert.equal(l.get('review-reason').value,'');assert.equal(l.get('qualification-checklist').hidden,true);assert.equal(l.get('review-note'),note);assert.equal(note.value,'Keep this edited note.');assert.equal(l.get('material').checked,true);
  l.get('review-reason').value='vague';l.submit('review-form');assert.equal(l.state().questions[0].review_status,'needs_clarification');assert.deepEqual(l.state().questions[0].review_reason.criteria,{});l.click('show-current');assert.match(l.html(),/Review: Needs clarification/);
});
test('review save still requires a reason, note and every qualified criterion',async()=>{
  const l=await questionLab();l.click('offchain');l.click('queue');l.change('review-status','qualified');l.get('review-note').value='Evidence needed.';l.submit('review-form');assert.match(l.get('notice').textContent,/status, reason and specific reviewer note/);
  l.get('review-reason').value='specific_material_gap';l.submit('review-form');assert.match(l.get('notice').textContent,/all three/);assert.equal(l.state().questions[0].review_status,'pending_review');
  qualify(l);assert.equal(l.state().questions[0].review_status,'qualified');assert.equal(l.get('material').checked,true);assert.equal(l.get('qualification-checklist').hidden,false);
});
test('qualified follow-up defaults to assignment guidance and preserves manually saved work',async()=>{
  const l=await questionLab();l.click('offchain');l.click('queue');qualify(l);assert.equal(l.state().questions[0].next_action,'Assign a synthetic owner and next follow-up action');assert.doesNotMatch(l.html(),/Await synthetic review/);
  l.get('followup-owner').value='Synthetic engineering reviewer';l.get('followup-status').value='response_pending';l.get('next-action').value='Request the fictional source record';l.submit('followup-form');qualify(l);
  assert.equal(l.get('followup-owner').value,'Synthetic engineering reviewer');assert.equal(l.get('followup-status').value,'response_pending');assert.equal(l.get('next-action').value,'Request the fictional source record');
});
test('all reason codes have friendly labels and decision options preserve canonical codes',()=>{
  for(const reason of model.REVIEW_REASONS)assert.notEqual(ui.label(reason),reason);
  for(const decision of ui.reviewDecisions){const options=ui.reasonOptions(decision,'');assert.match(options,/value="" selected/);for(const code of ui.reasonsByDecision[decision]){assert(model.REVIEW_REASONS.includes(code));assert(options.includes('value="'+code+'"'));}}
});
test('acknowledgement Failure survives connection failure, recovery and modal rerenders',async()=>{
  const l=await questionLab();l.get('ack-scenarios').open=true;l.change('ack-outcome','failure');l.change('connect-outcome','failure');l.click('connect');assert.equal(l.get('ack-outcome').value,'failure');assert.equal(l.get('connect-outcome').value,'failure');assert.equal(l.get('ack-scenarios').open,true);
  l.change('connect-outcome','success');l.click('connect');assert.equal(l.get('ack-outcome').value,'failure');l.click('acknowledge');assert.equal(l.state().questions[0].acknowledgement,'failed');assert.equal(l.state().ack_attempts[0].outcome,'failure');assert.match(l.html(),/Retry acknowledgement/);
  l.click('retry');assert.equal(l.get('ack-outcome').value,'failure');l.change('ack-outcome','success');l.click('acknowledge');assert.deepEqual(l.state().ack_attempts.map(a=>a.outcome),['failure','success']);
  l.click('another');l.save('Which independent reviewer owns the source evidence?');assert.equal(l.get('ack-outcome').value,'success');assert.match(l.get('ack').innerHTML,/Record demo acknowledgement/);l.change('ack-outcome','failure');l.click('acknowledge');l.click('offchain');assert.doesNotMatch(l.html(),/Retry acknowledgement|data-action="certificate"/);assert.equal(l.state().questions[0].acknowledgement,'success');assert.equal(l.state().questions[1].wallet_decision,'off_chain');
});
test('certificates render the exact successful attempt, timestamp, identity and independent review status',async()=>{
  const l=await questionLab();l.change('ack-outcome','failure');l.click('connect');l.click('acknowledge');l.click('retry');l.change('ack-outcome','success');l.click('acknowledge');const attempt=l.state().ack_attempts[1];l.click('certificate','LQ001');const certificate=l.get('certificate-content').innerHTML;
  assert.match(certificate,/Demo Participation Acknowledgement/);assert.match(certificate,/EXAMPLE \/ DEMO PREVIEW/);assert.match(certificate,/L-JOHN/);assert.match(certificate,/LQ001 · version 1/);assert.match(certificate,/Successful demo attempt ID<\/dt><dd>LA2/);assert(certificate.includes(attempt.at));assert.match(certificate,/Current question review status<\/dt><dd>Pending review/);assert.doesNotMatch(certificate,/<a\b/);
  l.get('close-certificate').emit('click');l.click('queue');qualify(l);l.click('certificate','LQ001');assert.match(l.get('certificate-content').innerHTML,/Current question review status<\/dt><dd>Qualified/);
});
test('certificate derivation rejects stale versions or unmatched records and chooses the correct question',()=>{
  const s=model.createSession();model.register(s,'john-primary');model.openDisclosure(s);const q=model.submitQuestion(s,'Which independent audit exists?','verification').question;model.connectWallet(s,q.question_id,'success');model.acknowledge(s,q.question_id,'success');model.reviewQuestion(s,q.question_id,{decision:'needs_clarification',reason_code:'vague',reason_note:'Name the requested evidence.'});model.reviseQuestion(s,q.question_id,'Which source supports the audit claim?','verification');assert.throws(()=>model.certificateRecord(s,q.question_id),/successful/);
  q.acknowledgement='success';assert.throws(()=>model.certificateRecord(s,q.question_id),/successful/);q.acknowledgement='pending';model.acknowledge(s,q.question_id,'failure');model.retryAcknowledgement(s,q.question_id);const success=model.acknowledge(s,q.question_id,'success');const other=model.submitQuestion(s,'Who owns monthly reporting?','reporting').question;model.acknowledge(s,other.question_id,'success');const c=model.certificateRecord(s,q.question_id);assert.equal(c.version,2);assert.equal(c.attempt_id,success.attempt_id);assert.equal(c.acknowledged_at,success.at);assert.equal(c.canonical_participant_id,q.canonical_participant_id);assert.equal(c.txid,null);assert.equal(c.explorer_url,null);
});
test('waiting persona gets readable disclosure and an accessible disabled question action',async()=>{
  const l=await lab();l.register('sam-waiting');assert.match(l.html(),/Your invitation is still pending\. You're welcome to read/);assert.doesNotMatch(l.html(),/Review the disclosure, submit a specific question/);l.click('disclosure');assert.match(l.html(),/Suncrest Protocol — Public Project Disclosure/);assert.match(l.html(),/data-action="question" disabled aria-describedby="invitation-help"/);assert.match(l.html(),/id="invitation-help"[^>]*>Question submission is available after invitation approval\./);assert.equal(metrics(l.state(),{includeQA:true}).disclosure_viewers,0);
});
test('sponsorship UI reflects two distinct successes, free failures and unchanged exhausted CTA',async()=>{
  const l=await questionLab('maya-primary');assert.match(l.get('ack').innerHTML,/Sponsored acknowledgements available: 2 of 2/);l.change('ack-outcome','failure');l.click('connect');l.click('acknowledge');l.click('retry');assert.match(l.get('ack').innerHTML,/available: 2 of 2/);l.change('ack-outcome','success');l.click('acknowledge');l.click('another');l.save('Who validates the reporting evidence?');assert.match(l.get('ack').innerHTML,/available: 1 of 2/);l.click('acknowledge');l.click('another');l.save('Who verifies the governance risk?');assert.match(l.get('ack').innerHTML,/available: 0 of 2/);assert.match(l.get('ack').innerHTML,/participant-funded fees; off-chain remains available/);assert.match(l.get('ack').innerHTML,/>Record demo acknowledgement<\/button>/);assert.doesNotMatch(l.get('ack').innerHTML,/Record self-funded demo acknowledgement/);l.click('acknowledge');assert.equal(l.state().ack_attempts.filter(a=>a.sponsored_demo).length,2);assert(l.state().ack_attempts.every(a=>a.real_transaction===false));
});
test('unverified participant sees no eligible sponsorship and retains wallet-free participation',async()=>{
  const l=await questionLab();assert.match(l.get('ack').innerHTML,/available: 0 of 2/);assert.match(l.get('ack').innerHTML,/Only successful acknowledgements consume the allowance/);assert.match(l.get('ack').innerHTML,/No real gas, fee or transaction/);l.click('offchain');assert.equal(l.state().questions[0].wallet_decision,'off_chain');
});
test('measurement separates synthetic funnels and collapsed technical outputs without changing calculations',async()=>{
  const l=await questionLab();l.click('offchain');l.click('queue');qualify(l);l.click('dashboard');const html=l.html();
  assert.match(html,/Synthetic, unsent email variants/);assert.match(html,/<strong>Control:<\/strong> Generic invitation/);assert.match(html,/<strong>Variant:<\/strong> Invitation emphasizes asking a specific question/);assert.match(html,/Tiny synthetic sample — not an experiment result/);assert.match(html,/Qualified conversion 100% = 1\/1/);assert.match(html,/20%/);assert.match(html,/35%/);assert.match(html,/27\.5%/);
  assert(html.includes(ui.funnelMarkup('Snapshot funnel · pooled synthetic records',{invited:50,disclosure_viewers:40,qualified_participants:11})));assert(html.includes(ui.funnelMarkup('Live QA funnel · separate synthetic records',metrics(l.state(),{includeQA:true}))));
  const details=[...html.matchAll(/<details class="technical-evidence"([^>]*)><summary>Technical Evidence<\/summary>([\s\S]*?)<\/details>/g)];assert.equal(details.length,2);assert(details.every(d=>!d[1].includes('open')));assert.equal((html.match(/<pre>/g)||[]).length,2);assert(details.every(d=>d[2].includes('<pre>')));for(const target of ['experiment.synthetic.json','participants.synthetic.csv','questions.synthetic.csv','measurement/README.md'])assert(html.includes(target));assert.match(l.get('mode-indicator').textContent,/Measurement mode/);
});
test('ack scenario selections are scoped to question and version',()=>{
  const scenarios=new Map(),q={question_id:'LQ001',version:1};ui.ackScenario(scenarios,q).ack='failure';assert.equal(ui.ackScenario(scenarios,q).ack,'failure');assert.equal(ui.ackScenario(scenarios,{question_id:'LQ002',version:1}).ack,'success');assert.equal(ui.ackScenario(scenarios,{...q,version:2}).ack,'success');
});
