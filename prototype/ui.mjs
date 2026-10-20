// Presentation helpers only: canonical domain codes and measurement inputs stay unchanged.
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={pending_review:'Pending review',qualified:'Qualified',needs_clarification:'Needs clarification',excluded:'Excluded',specific_material_gap:'Specific material disclosure gap',claim_evidence:'Claim needs supporting evidence',vague:'Question needs more detail',off_topic:'Outside disclosure scope',gibberish:'Unintelligible question',duplicate_question:'Duplicate question',ineligible:'Invitation not approved',abuse:'Spam or abuse',other:'Other — explain in note',unassigned:'Unassigned',triaged:'Triaged',response_pending:'Response pending',addressed:'Addressed'};
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
  return '<div class="row"><div><label for="review-status">Review decision</label><select id="review-status">'+reviewDecisions.map(status=>'<option value="'+status+'"'+(q.review_status===status?' selected':'')+'>'+label(status)+'</option>').join('')+'</select></div><div><label for="review-reason">Review reason</label><select id="review-reason" required>'+reasonOptions(q.review_status,q.review_reason?.reason_code)+'</select></div></div><label for="review-note">Specific synthetic reviewer note</label><textarea id="review-note" maxlength="1000" required>'+esc(q.review_reason?.reason_note||'')+'</textarea><fieldset id="qualification-checklist"'+(q.review_status==='qualified'?'':' hidden')+'><legend>Confirm all three qualification criteria</legend>'+[['material','References a material claim, assumption, risk or information gap'],['actionable','Asks an answerable question or investigable follow-up'],['not-spam','Not duplicate, gibberish, irrelevant promotion or abuse; critical tone is allowed']].map(([id,text])=>'<label class="check"><input id="'+id+'" type="checkbox"'+(criteria[id.replace('-','_')]?' checked':'')+'> '+text+'</label>').join('')+'</fieldset><button class="button" type="submit">Save synthetic review</button>';
}
export function ackScenario(scenarios,q){
  const key=q.question_id+':'+q.version;
  if(!scenarios.has(key))scenarios.set(key,{connect:'success',ack:'success',expanded:false});
  return scenarios.get(key);
}
export function outcomeOptions(selected){return ['success','failure'].map(value=>'<option value="'+value+'"'+(value===selected?' selected':'')+'>'+label(value)+'</option>').join('');}
export function sponsorshipMarkup(policy){
  const available=policy.sponsored?Math.max(0,policy.limit-policy.used):0;
  return '<strong>Sponsored acknowledgements available: '+available+' of '+policy.limit+'</strong><p>Verified synthetic KYC permits eligible sponsorship, up to two successes per canonical person/session and one per distinct question. Only successful acknowledgements consume the allowance. No real gas, fee or transaction occurs.</p>'+(policy.sponsored?'':'<p>'+esc(policy.message)+'</p>')+'Questions can always be submitted and qualified off-chain without KYC.';
}
export function funnelMarkup(title,m){
  return '<figure class="funnel"><figcaption>'+esc(title)+'</figcaption><ol>'+[['Invitations',m.invited],['Eligible viewers',m.disclosure_viewers],['Distinct qualified people',m.qualified_participants]].map(([name,count])=>'<li><span>'+name+'</span><strong>'+count+'</strong></li>').join('')+'</ol></figure>';
}
export function certificateMarkup(c){
  return '<article class="certificate"><span class="eyebrow">EXAMPLE / DEMO PREVIEW · NO REAL TRANSACTION</span><h2 id="certificate-title">Demo Participation Acknowledgement</h2><dl>'+[['Participant',c.participant],['Canonical participant ID',c.canonical_participant_id],['Project',c.project],['Activity',c.activity],['Question reference',c.question_id+' · version '+c.version],['Current question review status',label(c.review_status)],['Acknowledgement result',c.acknowledgement],['Successful demo attempt ID',c.attempt_id],['Acknowledged at (UTC)',c.acknowledged_at]].map(([name,value])=>'<dt>'+name+'</dt><dd>'+esc(value)+'</dd>').join('')+'</dl><p class="small">No real signature, fee, blockchain transaction, genuine TXID or explorer verification link exists. Not proof of ownership, reserves, returns or question qualification.</p></article>';
}
