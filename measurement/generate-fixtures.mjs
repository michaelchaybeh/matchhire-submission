import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join,dirname} from 'node:path';
const out=join(dirname(fileURLToPath(import.meta.url)),'..','data');
await mkdir(out,{recursive:true});
const metadata={synthetic:true,cohort_id:'email-illustration-v1',label:'Illustrative synthetic email experiment; not observed results or a causal estimate',window_start:'2026-10-19T00:00:00.000Z',window_end:'2026-10-25T23:59:59.999Z'};
const data={metadata,participants:[],registrations:[],questions:[],events:[],ack_attempts:[]};
let tick=0;
const time=()=>new Date(Date.UTC(2026,9,19,3,0,tick++)).toISOString();
const emit=(id,event_type,details={})=>data.events.push({event_id:`E${data.events.length+1}`,occurred_at:time(),canonical_participant_id:id,session_id:`SESSION-${id}`,source:'synthetic',synthetic:true,cohort_id:metadata.cohort_id,event_type,...details});
function registration(p,alias,duplicate=false){const record={registration_id:`R${data.registrations.length+1}`,canonical_participant_id:p.canonical_participant_id,alias_token:alias,registered_at:time(),duplicate_resolution:duplicate?'existing_canonical':'new_canonical',channel:'synthetic_email',variant:p.group,cohort_id:metadata.cohort_id,synthetic:true};data.registrations.push(record);emit(p.canonical_participant_id,'registration_attempted',{registration_id:record.registration_id});emit(p.canonical_participant_id,'registration_resolved',{registration_id:record.registration_id,duplicate_resolution:record.duplicate_resolution});}
const questionTexts=[
  'Who will independently verify monthly operating reports for the proposed ten-project pilot?',
  'What evidence supports the assumption that contributors will report on time?',
  'Why are no independent audit results available for the proposed pilot?',
  'Which source documents would substantiate a reported project update?',
  'What happens when independent reviewers disagree about an update?',
  'How will missing source evidence be disclosed to the community?',
  'Who owns the follow-up when a project misses its monthly update?',
  'Can you explain the project?',
  'Which update should I look at?',
  'Amazing project! When token?',
  'Please share more details.',
  'What does reporting mean here?'
];
function addQuestion(p,index,status,{id=null,text=null,section='verification'}={}){
  const q={question_id:id||`${p.group==='control'?'C':'V'}-Q${String(index).padStart(2,'0')}`,canonical_participant_id:p.canonical_participant_id,disclosure_section_id:section,text:text||questionTexts[index-1],submitted_at:time(),review_status:status,review_reason:{reason_code:status==='qualified'?'specific_material_gap':status==='needs_clarification'?'vague':status==='excluded'?'off_topic':'other',reason_note:status==='qualified'?'Synthetic reviewer fixture: identifies a specific material evidence gap.':status==='excluded'?'Synthetic exclusion: generic promotion does not identify an actionable disclosure inquiry.':status==='needs_clarification'?'Synthetic clarification request: identify a specific claim or evidence gap.':'Pending synthetic review; no qualification decision.',reviewed_at:time(),reviewer_fixture_id:'SYN-REVIEWER-SEED',section_id:section},followup_status:status==='qualified'?'triaged':'unassigned',followup_owner:status==='qualified'?'Synthetic operations reviewer':'Unassigned',next_action:status==='qualified'?'Prepare a response using source evidence':'Await review or clarification',accepted:true,version:1,acknowledgement:'skipped',wallet_decision:'off_chain',cohort_id:metadata.cohort_id,synthetic:true};
  q.normalized_text=q.text.trim().replace(/\s+/g,' ').toLowerCase();data.questions.push(q);emit(p.canonical_participant_id,'question_submitted',{question_id:q.question_id,qualified:false});emit(p.canonical_participant_id,'question_reviewed',{question_id:q.question_id,decision:status,reason_code:q.review_reason.reason_code});return q;
}
for(const group of ['control','variant'])for(let i=1;i<=25;i++){
  const id=`${group==='control'?'C':'V'}${String(i).padStart(2,'0')}`;
  const p={canonical_participant_id:id,persona_label:`Synthetic ${group} participant ${i}`,eligible:true,invitation_status:'approved',invitation_delivered:true,kyc_demo_status:i%2===0?'verified':'not_verified',is_qa_fixture:false,group,cohort_id:metadata.cohort_id,synthetic:true};data.participants.push(p);registration(p,`alias-${id}`);emit(id,'invitation_confirmed',{eligible:true,delivered_demo:true});
  if(i<=20)emit(id,'disclosure_opened',{disclosure_version:'suncrest-fiction-v1',reading_verified:false});
  const max=group==='control'?8:12;const qualified=group==='control'?4:7;
  if(i<=max){let status=i<=qualified?'qualified':i%3===2?'needs_clarification':i%3===0?'pending_review':'excluded';addQuestion(p,i,status,{text:status==='excluded'?'Amazing project! When token?':status==='needs_clarification'?'Could you share more details about the project?':null});}
}
// A second distinct qualified question from the same person does not add a person.
addQuestion(data.participants[0],1,'qualified',{id:'C-Q01-B',text:'How would a failed verification be communicated in the next monthly update?',section:'reporting'});
registration(data.participants[0],'second-alias-C01',true);emit('C01','disclosure_opened',{disclosure_version:'suncrest-fiction-v1',reading_verified:false});emit('C01','question_rejected',{reason:'duplicate',original_question_id:'C-Q01'});
function attempt(q,outcome,sponsored){const p=data.participants.find(p=>p.canonical_participant_id===q.canonical_participant_id);const a={attempt_id:`A${data.ack_attempts.length+1}`,question_id:q.question_id,canonical_participant_id:p.canonical_participant_id,question_version:1,wallet_id:`DEMO-WALLET-${p.canonical_participant_id}`,wallet_connected_demo:true,outcome,kyc_demo_status:p.kyc_demo_status,sponsored_demo:sponsored,at:time(),real_transaction:false,cohort_id:metadata.cohort_id,synthetic:true};data.ack_attempts.push(a);emit(p.canonical_participant_id,'acknowledgement_result',a);q.acknowledgement=outcome==='success'?'success':'failed';q.wallet_decision='acknowledge';}
attempt(data.questions.find(q=>q.question_id==='C-Q01'),'success',false);
attempt(data.questions.find(q=>q.question_id==='C-Q02'),'failure',false);
emit('C02','acknowledgement_retry',{question_id:'C-Q02',next_attempt:2});
attempt(data.questions.find(q=>q.question_id==='C-Q02'),'success',true);
// Explicit adversarial QA fixtures. Never campaign denominator members.
for(const [id,eligible] of [['QA-ELIGIBLE',true],['QA-WAITING',false]]){
  const p={canonical_participant_id:id,persona_label:`Synthetic exclusion fixture ${id}`,eligible,invitation_status:eligible?'approved':'waiting',invitation_delivered:eligible,kyc_demo_status:'not_verified',is_qa_fixture:true,group:'qa',cohort_id:metadata.cohort_id,synthetic:true};data.participants.push(p);registration(p,'qa-'+id);emit(id,'disclosure_opened',{reading_verified:false});addQuestion(p,1,'qualified',{id:'Q-'+id,text:'Adversarial imported qualification fixture; exclude from campaign metrics.'});
}
for(const [name,records] of Object.entries(data)){
  if(name==='metadata')continue;
  await writeFile(join(out,`${name}.synthetic.json`),JSON.stringify({metadata,records},null,2)+'\n');
  const keys=[...new Set(records.flatMap(Object.keys))];const cell=value=>'"'+String(typeof value==='object'&&value!==null?JSON.stringify(value):value??'').replace(/"/g,'""')+'"';
  await writeFile(join(out,`${name}.synthetic.csv`),[keys.map(cell).join(','),...records.map(r=>keys.map(k=>cell(r[k])).join(','))].join('\n')+'\n');
}
await writeFile(join(out,'experiment.synthetic.json'),JSON.stringify(data,null,2)+'\n');
console.log(`Generated deterministic synthetic records: ${data.participants.length} people (50 primary + 2 QA), ${data.registrations.length} registrations, ${data.questions.length} questions, ${data.events.length} events, ${data.ack_attempts.length} acknowledgement attempts.`);
