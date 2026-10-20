// Pure local synthetic participation model. No browser storage or integrations.
export const SECTIONS = [
  {id:'pilot',title:'Proposed pilot',text:'Suncrest proposes a pilot covering 10 renewable-energy projects. No operating assets have been verified.'},
  {id:'reporting',title:'Monthly reporting assumption',text:'Monthly project updates are expected. This assumes accurate, timely contributor reporting and available source documents; neither is validated.'},
  {id:'verification',title:'Verification gap',text:'Independent verification procedures, reviewer responsibilities and source-evidence standards are not finalized. No independent audit or reserve verification exists.'},
  {id:'risk',title:'Material risks',text:'Incomplete or misleading reports, software flaws, service interruptions, governance disputes, costs and uncertain legal requirements may prevent delivery.'}
];
export const REVIEW_REASONS = ['specific_material_gap','claim_evidence','vague','off_topic','gibberish','duplicate_question','ineligible','abuse','other'];
export const normalize = text => String(text).trim().replace(/\s+/g,' ').toLowerCase();
const sectionValid = id => SECTIONS.some(section=>section.id===id);
const fail = message => {throw new Error(message);};
export function createSession() {
  return {
    metadata:{synthetic:true,cohort_id:'live',label:'Live demo sandbox; excluded from experiment snapshot'},
    session_id:'SYN-LIVE-SESSION',participants:[
      {canonical_participant_id:'L-JOHN',persona_label:'John Doe',eligible:true,invitation_status:'approved',invitation_delivered:true,kyc_demo_status:'not_verified',is_qa_fixture:true,cohort_id:'live',group:'sandbox'},
      {canonical_participant_id:'L-MAYA',persona_label:'Maya (synthetic)',eligible:true,invitation_status:'approved',invitation_delivered:true,kyc_demo_status:'verified',is_qa_fixture:true,cohort_id:'live',group:'sandbox'},
      {canonical_participant_id:'L-AVERY',persona_label:'Avery (synthetic)',eligible:true,invitation_status:'approved',invitation_delivered:true,kyc_demo_status:'not_verified',is_qa_fixture:true,cohort_id:'live',group:'sandbox'},
      {canonical_participant_id:'L-SAM',persona_label:'Sam (synthetic)',eligible:false,invitation_status:'waiting',invitation_delivered:false,kyc_demo_status:'not_verified',is_qa_fixture:true,cohort_id:'live',group:'sandbox'}
    ],
    aliases:{'john-primary':'L-JOHN','john-returning-alias':'L-JOHN','maya-primary':'L-MAYA','avery-primary':'L-AVERY','sam-waiting':'L-SAM'},
    registrations:[],questions:[],events:[],ack_attempts:[],active_participant_id:null,wallet_connections:[],drafts:{},active_paths:[],sequence:0
  };
}
export function participant(state,id=state.active_participant_id) {return state.participants.find(p=>p.canonical_participant_id===id);}
function event(state,type,details={}) {
  const record={event_id:`LE${++state.sequence}`,occurred_at:new Date().toISOString(),canonical_participant_id:state.active_participant_id,session_id:state.session_id,source:'synthetic',cohort_id:'live',event_type:type,...details};
  state.events.push(record);return record;
}
function active(state) {return participant(state) || fail('Choose a synthetic participant first.');}
function eligible(state) {const p=active(state);if(!p.eligible||p.invitation_status!=='approved')fail('This fixture is waiting for an invitation. It cannot submit questions.');return p;}
function question(state,id) {return state.questions.find(q=>q.question_id===id)||fail('Question not found.');}
function ownQuestion(state,id) {const q=question(state,id);if(q.canonical_participant_id!==active(state).canonical_participant_id)fail('Select the participant who owns this question.');return q;}
export function register(state,alias) {
  const id=state.aliases[alias];if(!id)fail('Select a preconfigured synthetic alias; no real email or personal data.');
  event(state,'registration_attempted',{canonical_participant_id:id,alias_token:alias});
  const duplicate=state.registrations.some(r=>r.canonical_participant_id===id);
  state.active_participant_id=id;
  const r={registration_id:`LR${state.registrations.length+1}`,canonical_participant_id:id,alias_token:alias,registered_at:new Date().toISOString(),duplicate_resolution:duplicate?'existing_canonical':'new_canonical',channel:'demo',variant:'sandbox',cohort_id:'live'};
  state.registrations.push(r);event(state,'registration_resolved',{registration_id:r.registration_id,duplicate_resolution:r.duplicate_resolution});
  event(state,'invitation_confirmed',{eligible:participant(state).eligible,invitation_status:participant(state).invitation_status,kyc_demo_status:participant(state).kyc_demo_status});return r;
}
export function openDisclosure(state,backward=false) {
  active(state);if(!state.active_paths.includes(state.active_participant_id))state.active_paths.push(state.active_participant_id);
  event(state,'disclosure_opened',{disclosure_version:'suncrest-fiction-v1',reading_verified:false});
  if(backward)event(state,'disclosure_navigation_back',{draft_preserved:!!state.drafts[state.active_participant_id]?.text});
}
export function beginQuestion(state) {eligible(state);if(!state.active_paths.includes(state.active_participant_id))state.active_paths.push(state.active_participant_id);}
export function saveDraft(state,text,section_id) {active(state);state.drafts[state.active_participant_id]={text,section_id};}
export function abandon(state) {
  active(state);const id=state.active_participant_id;
  if(state.active_paths.includes(id)||state.drafts[id]?.text)event(state,'disclosure_abandoned',{draft_discarded:!!state.drafts[id]?.text});
  state.active_paths=state.active_paths.filter(p=>p!==id);delete state.drafts[id];
}
function validate(state,text,section_id,exceptId=null) {
  eligible(state);if(!text.trim())return {reason:'empty',message:'Enter a specific question.'};
  if(text.length>2000)return {reason:'too_long',message:'Maximum 2,000 characters. Your draft is preserved.'};
  if(!sectionValid(section_id))return {reason:'section_required',message:'Choose the disclosure claim, risk or evidence gap your question addresses.'};
  const duplicate=state.questions.find(q=>q.canonical_participant_id===state.active_participant_id&&q.question_id!==exceptId&&q.normalized_text===normalize(text));
  if(duplicate)return {reason:'duplicate',message:`Already submitted as ${duplicate.question_id}; its review and acknowledgement are unchanged.`,original_question_id:duplicate.question_id};
  return null;
}
function similar(state,text,exceptId=null) {
  const tokens=t=>new Set(normalize(t).match(/[\p{L}\p{N}]+/gu)||[]);const incoming=tokens(text);
  return state.questions.filter(q=>q.question_id!==exceptId&&q.canonical_participant_id===state.active_participant_id).filter(q=>{const old=tokens(q.text);const shared=[...incoming].filter(t=>old.has(t)).length;return old.size>=6&&incoming.size>=6&&shared>=5&&shared/new Set([...old,...incoming]).size>=0.8;}).map(q=>q.question_id);
}
function reject(state,error) {event(state,'question_rejected',error);return {ok:false,...error};}
export function submitQuestion(state,text,section_id) {
  saveDraft(state,text,section_id);const error=validate(state,text,section_id);if(error)return reject(state,error);
  if(!state.events.some(e=>e.event_type==='disclosure_opened'&&e.canonical_participant_id===state.active_participant_id))return reject(state,{reason:'disclosure_required',message:'Open the disclosure before submitting.'});
  const q={question_id:`LQ${String(state.questions.length+1).padStart(3,'0')}`,canonical_participant_id:state.active_participant_id,disclosure_section_id:section_id,text,normalized_text:normalize(text),submitted_at:new Date().toISOString(),cohort_id:'live',accepted:true,version:1,revisions:[],review_status:'pending_review',review_reason:null,review_history:[],followup_status:'unassigned',followup_owner:'Unassigned',next_action:'Await synthetic review',acknowledgement:'pending',wallet_decision:'pending',similar_to:similar(state,text)};
  state.questions.push(q);delete state.drafts[state.active_participant_id];state.active_paths=state.active_paths.filter(id=>id!==state.active_participant_id);
  event(state,'question_submitted',{question_id:q.question_id,version:q.version,qualified:false});if(q.similar_to.length)event(state,'question_review_flagged',{question_id:q.question_id,similar_to:q.similar_to,method:'conservative_lexical_overlap'});
  return {ok:true,question:q};
}
export function reviseQuestion(state,id,text,section_id) {
  const q=ownQuestion(state,id);if(q.review_status!=='needs_clarification')fail('Only a question needing clarification can be revised.');
  saveDraft(state,text,section_id);const error=validate(state,text,section_id,id);if(error)return reject(state,error);
  q.revisions.push({version:q.version,text:q.text,section_id:q.disclosure_section_id,review_status:q.review_status,review_reason:q.review_reason,acknowledgement:q.acknowledgement,wallet_decision:q.wallet_decision});
  q.version++;q.text=text;q.normalized_text=normalize(text);q.disclosure_section_id=section_id;q.review_status='pending_review';q.review_reason=null;q.acknowledgement='pending';q.wallet_decision='pending';q.followup_status='unassigned';q.followup_owner='Unassigned';q.next_action='Review revised evidence question';q.similar_to=similar(state,text,id);
  delete state.drafts[state.active_participant_id];state.active_paths=state.active_paths.filter(p=>p!==state.active_participant_id);
  event(state,'question_revised',{question_id:id,version:q.version,review_status:'pending_review'});return {ok:true,question:q};
}
export function reviewQuestion(state,id,{decision,reason_code,reason_note,criteria={}}) {
  const q=question(state,id);const p=participant(state,q.canonical_participant_id);
  if(!['pending_review','qualified','needs_clarification','excluded'].includes(decision)||!REVIEW_REASONS.includes(reason_code)||!reason_note.trim())fail('Choose a review status, reason and specific reviewer note.');
  if(decision==='qualified') {
    if(!p.eligible||p.invitation_status!=='approved'||!sectionValid(q.disclosure_section_id)||!state.events.some(e=>e.event_type==='disclosure_opened'&&e.canonical_participant_id===p.canonical_participant_id))fail('Qualification requires an eligible disclosure viewer with a referenced section.');
    if(!['specific_material_gap','claim_evidence'].includes(reason_code)||!criteria.material||!criteria.actionable||!criteria.not_spam)fail('Confirm all three sentiment-neutral qualification criteria and choose a qualification reason.');
  }
  const record={decision,reason_code,reason_note:reason_note.trim(),section_id:q.disclosure_section_id,reviewed_at:new Date().toISOString(),reviewer_fixture_id:'SYN-REVIEWER-01',version:q.version,criteria:{...criteria}};
  q.review_status=decision;q.review_reason=record;q.review_history.push(record);
  if(decision==='qualified'&&q.followup_status==='unassigned'&&q.followup_owner==='Unassigned'&&['Await synthetic review','Review revised evidence question','Await review or disposition','Participant to clarify referenced gap'].includes(q.next_action))q.next_action='Assign a synthetic owner and next follow-up action';
  if(decision!=='qualified'){q.followup_status='unassigned';q.followup_owner='Unassigned';q.next_action=decision==='needs_clarification'?'Participant to clarify referenced gap':'Await review or disposition';}
  event(state,'question_reviewed',{canonical_participant_id:q.canonical_participant_id,question_id:id,...record});return q;
}
export function setFollowup(state,id,{status,owner,next_action}) {
  const q=question(state,id);if(q.review_status!=='qualified')fail('Qualify the question before assigning operational follow-up.');
  if(!['unassigned','triaged','response_pending','addressed'].includes(status)||!owner.trim()||!next_action.trim())fail('Select a follow-up status, synthetic owner and next action.');
  q.followup_status=status;q.followup_owner=owner.trim();q.next_action=next_action.trim();event(state,'followup_status_changed',{canonical_participant_id:q.canonical_participant_id,question_id:id,status,owner:q.followup_owner,next_action:q.next_action});
}
export function setKyc(state,status) {const p=active(state);if(!['verified','not_verified'].includes(status))fail('Unknown synthetic KYC status.');p.kyc_demo_status=status;event(state,'kyc_scenario_changed',{status,eligibility_unchanged:true});}
export function gasPolicy(state,id) {
  const q=question(state,id);const p=participant(state,q.canonical_participant_id);
  const used=state.ack_attempts.filter(a=>a.canonical_participant_id===p.canonical_participant_id&&a.outcome==='success'&&a.sponsored_demo).length;
  const alreadySponsored=state.ack_attempts.some(a=>a.question_id===id&&a.outcome==='success'&&a.sponsored_demo);
  if(p.kyc_demo_status!=='verified')return {code:'self_funded_unverified',sponsored:false,used,limit:2,message:'Without KYC verification, an actual on-chain acknowledgement would require participant-funded network fees. No fees are processed here.'};
  if(used>=2||alreadySponsored)return {code:'self_funded_limit',sponsored:false,used,limit:2,message:'Sponsorship unavailable: two successes per canonical person/session, one per distinct question. An actual transaction would require participant-funded fees; off-chain remains available.'};
  return {code:'sponsored',sponsored:true,used,limit:2,message:`Suncrest would sponsor eligible gas. ${2-used} of 2 successes remain; one per distinct question. Failed attempts use no allowance. No fees are processed in this demo.`};
}
export function connectWallet(state,id,outcome) {
  const q=ownQuestion(state,id);if(q.wallet_decision==='off_chain'||q.acknowledgement==='success')fail('This acknowledgement decision is final.');
  if(!['success','failure'].includes(outcome))fail('Select a reviewer connection outcome.');
  q.wallet_decision='connect';event(state,'wallet_decision',{question_id:id,decision:'connect'});
  if(outcome==='success'&&!state.wallet_connections.includes(q.canonical_participant_id))state.wallet_connections.push(q.canonical_participant_id);
  event(state,'wallet_connection_result',{question_id:id,outcome,wallet_id:outcome==='success'?`DEMO-WALLET-${q.canonical_participant_id}`:null,demo:true});return outcome==='success';
}
export function canRetry(q) {return q.acknowledgement==='failed'&&q.wallet_decision!=='off_chain';}
export function retryAcknowledgement(state,id) {const q=ownQuestion(state,id);if(!canRetry(q))fail('Retry is unavailable after a final off-chain decision or success.');event(state,'acknowledgement_retry',{question_id:id,next_attempt:state.ack_attempts.filter(a=>a.question_id===id).length+1});}
export function acknowledge(state,id,outcome) {
  const q=ownQuestion(state,id);if(q.wallet_decision==='off_chain'||q.acknowledgement==='success')fail('This acknowledgement decision is final.');
  if(!state.wallet_connections.includes(q.canonical_participant_id))fail('Connect the demo wallet first.');
  if(!['success','failure'].includes(outcome))fail('Select a reviewer acknowledgement outcome.');
  const policy=gasPolicy(state,id);const a={attempt_id:`LA${state.ack_attempts.length+1}`,question_id:id,canonical_participant_id:q.canonical_participant_id,question_version:q.version,wallet_id:`DEMO-WALLET-${q.canonical_participant_id}`,wallet_connected_demo:true,outcome,kyc_demo_status:active(state).kyc_demo_status,sponsored_demo:policy.sponsored&&outcome==='success',gas_policy:policy.code,at:new Date().toISOString(),real_transaction:false,cohort_id:'live'};
  state.ack_attempts.push(a);q.acknowledgement=outcome==='success'?'success':'failed';q.wallet_decision='acknowledge';event(state,'acknowledgement_result',{...a});return a;
}
export function continueOffchain(state,id,source='continue_off_chain') {
  const q=ownQuestion(state,id);if(q.acknowledgement==='success')fail('Successful acknowledgement already recorded.');
  if(q.wallet_decision==='off_chain')return q;
  q.wallet_decision='off_chain';if(q.acknowledgement!=='failed')q.acknowledgement='skipped';event(state,'wallet_decision',{question_id:id,decision:'off_chain',final:true,dismissal_source:source});return q;
}
export function certificateRecord(state,id) {
  const q=question(state,id);if(q.acknowledgement!=='success')fail('Certificates require a successful demo acknowledgement for this version.');
  const attempt=state.ack_attempts.findLast(a=>a.question_id===id&&a.question_version===q.version&&a.canonical_participant_id===q.canonical_participant_id&&a.outcome==='success'&&a.real_transaction===false);
  if(!attempt)fail('A successful demo acknowledgement attempt for this question and version is required.');
  return {demo:true,participant:participant(state,q.canonical_participant_id).persona_label,canonical_participant_id:q.canonical_participant_id,project:'Suncrest Protocol',question_id:id,version:q.version,review_status:q.review_status,attempt_id:attempt.attempt_id,acknowledged_at:attempt.at,activity:'Question submitted; qualification is a separate reviewer decision',acknowledgement:'Successful demo outcome; no real transaction',txid:null,explorer_url:null};
}
export function completeSession(state) {event(state,'session_completed',{real_transactions:0});}
