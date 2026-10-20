// Presentation helpers only: canonical domain codes and measurement inputs stay unchanged.
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={pending_review:'Awaiting review',qualified:'Qualified',needs_clarification:'Needs clarification',excluded:'Excluded',specific_material_gap:'Specific material disclosure gap',claim_evidence:'Claim needs supporting evidence',vague:'Question needs more detail',off_topic:'Outside disclosure scope',gibberish:'Unintelligible question',duplicate_question:'Duplicate question',ineligible:'Invitation not approved',abuse:'Spam or abuse',other:'Other — explain in note',unassigned:'Unassigned',triaged:'Triaged',response_pending:'Response pending',addressed:'Addressed'};
export const reviewDecisions=['pending_review','qualified','needs_clarification','excluded'];
export const reasonsByDecision={pending_review:['other'],qualified:['specific_material_gap','claim_evidence'],needs_clarification:['vague','other'],excluded:['off_topic','gibberish','duplicate_question','ineligible','abuse','other']};
export function label(code){return labels[code]||String(code??'').replaceAll('_',' ').replace(/^./,c=>c.toUpperCase());}
export function reasonOptions(decision,selected=''){
  const reasons=reasonsByDecision[decision]||[];
  const valid=reasons.includes(selected)?selected:'';
  return '<option value=""'+(!valid?' selected':'')+'>Choose a reason for this decision</option>'+reasons.map(reason=>'<option value="'+reason+'"'+(valid===reason?' selected':'')+'>'+esc(label(reason))+'</option>').join('');
}
export function reviewFields(q){
  const criteria=q.review_reason?.criteria||{};
  return '<div class="row"><div><label for="review-status">Review decision</label><select id="review-status">'+reviewDecisions.map(status=>'<option value="'+status+'"'+(q.review_status===status?' selected':'')+'>'+label(status)+'</option>').join('')+'</select></div><div><label for="review-reason">Review reason</label><select id="review-reason" required>'+reasonOptions(q.review_status,q.review_reason?.reason_code)+'</select></div></div><label for="review-note">Reviewer note</label><textarea id="review-note" maxlength="1000" required>'+esc(q.review_reason?.reason_note||'')+'</textarea><fieldset id="qualification-checklist"'+(q.review_status==='qualified'?'':' hidden')+'><legend>Confirm all three qualification criteria</legend>'+[['material','References a material claim, assumption, risk or information gap'],['actionable','Asks an answerable question or investigable follow-up'],['not-spam','Not duplicate, gibberish, irrelevant promotion or abuse; critical tone is allowed']].map(([id,text])=>'<label class="check"><input id="'+id+'" type="checkbox"'+(criteria[id.replace('-','_')]?' checked':'')+'> '+text+'</label>').join('')+'</fieldset><button class="button" type="submit">Save review decision</button>';
}
export function ackScenario(scenarios,q){
  const key=q.question_id+':'+q.version;
  if(!scenarios.has(key))scenarios.set(key,{connect:'success',ack:'success',expanded:false});
  return scenarios.get(key);
}
export function outcomeOptions(selected){return ['success','failure'].map(value=>'<option value="'+value+'"'+(value===selected?' selected':'')+'>'+label(value)+'</option>').join('');}
export function sponsorshipMarkup(policy){
  const remaining=Math.max(0,policy.limit-policy.used),unverified=policy.code==='self_funded_unverified';
  const heading=unverified?'Sponsorship unavailable — identity not verified':policy.sponsored?'Sponsored acknowledgements: '+remaining+' of '+policy.limit+' remaining':remaining===0?'Sponsorship allowance exhausted':'Sponsorship already used for this question';
  const explanation=unverified?'Identity verification may unlock sponsorship. It is optional for questions and the simulated acknowledgement process.':policy.sponsored?'Up to two successful acknowledgements for distinct questions per canonical participant/session.':'You can still continue using the simulated self-funded route or skip the acknowledgement.';
  return '<section class="sponsorship-summary" aria-label="Sponsorship and network fees"><strong>'+heading+'</strong><p>'+explanation+'</p>'+(!unverified?'<small>'+policy.used+' of '+policy.limit+' sponsored successes used · '+remaining+' remaining</small>':'')+(!policy.sponsored?'<div class="network-fee"><span>Estimated network fee</span><strong>Estimate unavailable — network not configured</strong><details><summary>About network fees</summary><p>Real network fees vary with network conditions. Check the network\'s official fee information and your wallet\'s transaction estimate before confirming an actual transaction. No payment occurs in this demo.</p></details></div>':'')+'</section>';
}
export function funnelMarkup(title,m){
  return '<figure class="funnel"><figcaption>'+esc(title)+'</figcaption><ol>'+[['Invitations',m.invited],['Eligible viewers',m.disclosure_viewers],['Distinct qualified people',m.qualified_participants]].map(([name,count])=>'<li><span>'+name+'</span><strong>'+count+'</strong></li>').join('')+'</ol></figure>';
}
export function certificateMarkup(c){
  return '<article class="certificate"><span class="eyebrow">EXAMPLE / DEMO PREVIEW · NO REAL TRANSACTION</span><h2 id="certificate-title">Demo Participation Acknowledgement</h2><dl>'+[['Participant',c.participant],['Canonical participant ID',c.canonical_participant_id],['Project',c.project],['Activity',c.activity],['Question reference',c.question_id+' · version '+c.version],['Current question review status',label(c.review_status)],['Acknowledgement result',c.acknowledgement],['Successful demo attempt ID',c.attempt_id],['Acknowledged at (UTC)',c.acknowledged_at]].map(([name,value])=>'<dt>'+name+'</dt><dd>'+esc(value)+'</dd>').join('')+'</dl><p class="small">No real signature, fee, blockchain transaction, genuine TXID or explorer verification link exists. Not proof of ownership, reserves, returns or question qualification.</p></article>';
}

export const personas=[
  {alias:'john-primary',id:'L-JOHN',name:'John Doe',first:'John',portrait:'john',description:'Participate as John',returning:false},
  {alias:'john-returning-alias',id:'L-JOHN',name:'John Doe',first:'John',portrait:'john',description:'Returning account alias · Resume John’s saved questions',returning:true},
  {alias:'maya-primary',id:'L-MAYA',name:'Maya',first:'Maya',portrait:'maya',description:'Explore the verified-participant experience',returning:false},
  {alias:'avery-primary',id:'L-AVERY',name:'Avery',first:'Avery',portrait:'avery',description:'A distinct participant using this browser',returning:false},
  {alias:'sam-waiting',id:'L-SAM',name:'Sam',first:'Sam',portrait:'sam',description:'Read the disclosure while awaiting an invitation',returning:false}
];
export const personaFor=p=>personas.find(x=>x.id===p?.canonical_participant_id);
export const nameFor=p=>personaFor(p)?.name||String(p?.persona_label||'Participant').replace(/ \(synthetic\)$/,'');
export const ownerLabel=owner=>({'Synthetic operations reviewer':'Operations Reviewer','Synthetic engineering reviewer':'Engineering Reviewer','Unassigned':'Not assigned'})[owner]||owner;
export const meaningfulDraft=draft=>!!(draft?.text?.trim()||draft?.section_id);
export const characterCount=text=>String(text.length).replace(/\B(?=(\d{3})+(?!\d))/g,',')+' / 2,000 characters';
export function nextActionValue(state,q){
  const saved=state.events.some(e=>e.event_type==='followup_status_changed'&&e.question_id===q.question_id&&e.next_action===q.next_action&&e.owner===q.followup_owner&&e.status===q.followup_status);
  return !saved&&['Assign a synthetic owner and next follow-up action','Await synthetic review','Await review or disposition','Review revised evidence question','Participant to clarify referenced gap'].includes(q.next_action)?'':q.next_action;
}

export const evaluatorLabel=()=>'<span class="evaluator-label"><img src="assets/evaluator-tool.svg" alt="" aria-hidden="true">Evaluator Tool</span>';
export const reviewerQueueAction=()=>'<button type="button" class="button secondary evaluator-queue-action" data-action="queue">'+evaluatorLabel()+'<span>View reviewer queue</span></button>';
