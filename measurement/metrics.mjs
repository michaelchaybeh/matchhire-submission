// Shared record-derived equations. Snapshot and live sandbox never share arrays.
export function metrics(data,{group=null,includeQA=false}={}) {
  const cohort=data.metadata.cohort_id;
  const inWindow=time=>!data.metadata.window_start||(time>=data.metadata.window_start&&time<=data.metadata.window_end);
  const primary=data.participants.filter(p=>p.cohort_id===cohort&&(includeQA||!p.is_qa_fixture)&&(!group||p.group===group));
  const ids=new Set(primary.filter(p=>p.eligible&&p.invitation_status==='approved'&&p.invitation_delivered).map(p=>p.canonical_participant_id));
  const viewed=new Set(data.events.filter(e=>e.cohort_id===cohort&&e.event_type==='disclosure_opened'&&ids.has(e.canonical_participant_id)&&inWindow(e.occurred_at)).map(e=>e.canonical_participant_id));
  const accepted=[...new Map(data.questions.filter(q=>q.cohort_id===cohort&&q.accepted!==false&&viewed.has(q.canonical_participant_id)&&inWindow(q.submitted_at)&&q.review_reason?.reason_code!=='duplicate_question').map(q=>[q.question_id,q])).values()];
  const qualified=accepted.filter(q=>q.review_status==='qualified');
  const submitters=new Set(accepted.map(q=>q.canonical_participant_id));const qualifiedPeople=new Set(qualified.map(q=>q.canonical_participant_id));
  const registrations=data.registrations.filter(r=>r.cohort_id===cohort&&ids.has(r.canonical_participant_id)&&inWindow(r.registered_at));
  const questionIds=new Set(accepted.map(q=>q.question_id));
  const attempts=data.ack_attempts.filter(a=>a.cohort_id===cohort&&questionIds.has(a.question_id)&&inWindow(a.at));
  const rate=(a,b)=>b?a*100/b:null;
  return {invited:ids.size,registered_people:new Set(registrations.map(r=>r.canonical_participant_id)).size,disclosure_viewers:viewed.size,question_submitters:submitters.size,accepted_questions:accepted.length,qualified_questions:qualified.length,qualified_participants:qualifiedPeople.size,pending_questions:accepted.filter(q=>q.review_status==='pending_review').length,clarification_questions:accepted.filter(q=>q.review_status==='needs_clarification').length,excluded_questions:accepted.filter(q=>q.review_status==='excluded').length,qualified_conversion:rate(qualifiedPeople.size,viewed.size),submission_conversion:rate(submitters.size,viewed.size),invitation_to_qualified:rate(qualifiedPeople.size,ids.size),question_qualification_rate:rate(qualified.length,accepted.length),registration_attempts:registrations.length,duplicate_registration_attempts:registrations.filter(r=>r.duplicate_resolution==='existing_canonical').length,duplicate_registration_rate:rate(registrations.filter(r=>r.duplicate_resolution==='existing_canonical').length,registrations.length),ack_attempts:attempts.length,ack_successes:attempts.filter(a=>a.outcome==='success').length,ack_success_rate:rate(attempts.filter(a=>a.outcome==='success').length,attempts.length),sponsored_successes:attempts.filter(a=>a.outcome==='success'&&a.sponsored_demo).length,real_transactions:attempts.filter(a=>a.real_transaction===true).length};
}
export function compare(data) {
  const control=metrics(data,{group:'control'});const variant=metrics(data,{group:'variant'});const pooled=metrics(data);
  const absolute_pp=control.qualified_conversion===null||variant.qualified_conversion===null?null:variant.qualified_conversion-control.qualified_conversion;
  return {control,variant,pooled,absolute_pp,relative_improvement:control.qualified_conversion?absolute_pp/control.qualified_conversion*100:null};
}
