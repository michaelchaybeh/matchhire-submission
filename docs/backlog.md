# Asset Market Cap — exactly five prioritized product tasks

These five tasks retrospectively restructure the existing assessment MVP and identify intended requirements and remaining pilot dependencies. They were not the task breakdown written before implementation. This document authorizes no additional implementation. Product acceptance is distinct from the [assessment handoff](../directive.md).

| Priority / task | Capability | PRD requirements | Business priority |
|---|---|---|---|
| P0 · T1 | Eligible participation and referenced disclosures | REQ-01–REQ-03 | Establish context, permission and fair person identity. |
| P0 · T2 | Guided wallet-free inquiry and participant status | REQ-04–REQ-05 | Reduce uncertainty between disclosure and saved contribution. |
| P0 · T3 | Qualification, clarification and operational follow-up | REQ-06–REQ-08 | Convert saved questions into reasoned, actionable inquiries. |
| P0 · T4 | Qualified-person measurement and operating controls | REQ-09–REQ-10 | Observe meaningful conversion and detect misleading/unsafe outcomes. |
| P1 · T5 | Optional acknowledgement and safe recovery | REQ-11–REQ-12 | Support secondary Web3 acknowledgement without harming off-chain participation. |

Requirement IDs refer to the [PRD acceptance table](prd.md#functional-requirements-and-acceptance). T1 → T2 → T3 supplies the core loop. Agree T4's schema/membership early, then verify measurement against T1–T3 records. T5 depends on a saved inquiry and measurement identities, not on qualification. Its P1 business priority does not remove the Quest's mandatory acknowledgement-failure demonstration. All three required edge cases remain assessment completion conditions.

## T1 — Eligible participation and referenced disclosures

**Business outcome / user value:** readers understand project assumptions and their permission to contribute; returning people recover one identity without unfairly merging shared-device users.

**Scope / requirements:** public disclosure and stable references, registration/waitlist, approval/revocation, canonical identity and fairness; REQ-01–REQ-03.

**Dependencies:** [eligibility/identity policy](journey-and-rules.md#eligibility-approval-and-identity-assurance), approved disclosure content/version, measurement keys. Actual assurance method, approval authority, access and recovery remain pilot decisions.

**Acceptance criteria:**

- Intended public disclosure access requires neither registration nor invitation; approval controls new inquiry submission only.
- Waiting/revoked people cannot submit; approved people can submit without wallet/KYC. Invitation delivery is recorded separately from permission.
- Returning aliases recover one canonical person and existing records; a different person sharing the browser is not merged.
- Project, disclosure version and section references are stable; assumptions/risks/evidence gaps and acknowledgement limitations are visible. Opening never asserts reading or comprehension.
- Disputed identity/revocation has a documented reconsideration route; similar text/device identity is insufficient exclusion evidence.

**Prototype status:** invited/waiting behavior, alias resolution, shared-device separation and four Suncrest sections are demonstrated. Approval/KYC are fixed fixtures. Anonymous public browsing, actual approval/revocation, account assurance/recovery and production access controls are unimplemented.

**Evidence:** [domain model](../prototype/domain.mjs), [domain tests](../tests/domain.test.mjs), [product tests](../tests/product.test.mjs), [duplicate screenshot](../evidence/browser-duplicate.jpg), [dated verification](../evidence/verification.md). Historical tests do not establish anonymous access or global uniqueness.

## T2 — Guided wallet-free inquiry and participant status

**Business outcome / user value:** an eligible viewer saves a referenced question, understands pending review and can return to their own disposition without wallet friction.

**Scope / requirements:** guidance, topic/full text, input/duplicate safeguards, drafts/discard, saved confirmation and own-record status; REQ-04–REQ-05.

**Dependencies:** T1 identities/references/eligibility; review-state contract from T3; event/entity contract from T4. Durable authenticated recovery is a future-pilot prerequisite.

**Acceptance criteria:**

- A valid inquiry is saved as pending before any wallet offer; wallet refusal does not prevent saving or qualifying.
- Blank text, absent section, text above 2,000 UTF-16 units and normalized same-person exact duplicates create no additional accepted inquiry ID. Rejection preserves the draft and original record.
- Backward navigation preserves text/topic. Explicit discard of a meaningful draft requires confirmation; keep editing/Escape preserves it.
- Similar wording flags review without automatic qualification, rejection or identity merging.
- The participant can see their own full current inquiry, review reason and next step; navigation cannot substitute another person's inquiry. Status describes records rather than an invented delivered response.

**Prototype status:** these local mechanics and own-person dashboard are demonstrated. Storage is per-tab memory; refresh/closure clears it. Authentication, durable recovery and production permissions are unimplemented.

**Evidence:** [participant presentation](../prototype/participant.mjs), [application handlers](../prototype/app.js), [domain](../tests/domain.test.mjs), [participant](../tests/participant.test.mjs), [product](../tests/product.test.mjs) and [handoff tests](../tests/handoff.test.mjs); [wallet-refusal replay](../README.md#reproduce-the-three-required-edge-cases).

## T3 — Qualification, clarification and operational follow-up

**Business outcome / user value:** a saved question receives a reasoned decision and accountable next step; participants can clarify or challenge it fairly.

**Scope / requirements:** sentiment-neutral adjudication, reviewer authority/evidence, versions/history, follow-up owner/action/status and appeals; REQ-06–REQ-08.

**Dependencies:** T2 inquiry/version, Product-owned qualification policy, operations coordination, designated reviewer/pilot-owner authority, [review data contract](../measurement/README.md#intended-review-evidence-and-current-seed-limitation).

**Acceptance criteria:**

- Qualification requires all material/actionable/not-spam criteria, an appropriate reason and specific note/evidence, actor/authority, version and timestamp.
- Precise critical questions can qualify without wallet/KYC or minimum word count. Pending, clarification and excluded inquiries do not count qualified.
- Only a clarification-eligible participant revision creates a new current version pending fresh review; prior text/decisions/attempts remain traceable.
- Qualified work supports owner, next action and operational status. A pilot must record response/evidence before treating work as addressed; local status fields alone do not prove delivery.
- Operations routes appeals to authorized reconsideration without erasing the original decision or automatically qualifying; policy ambiguity goes to Product and capacity/safety escalation to the pilot owner.
- Proposed response expectations remain identified as proposals, with calendar/capacity/appeal turnaround unresolved before a pilot.

**Prototype status:** checklist/reason/note review, current status changes, clarification history, follow-up fields and selected-question return are demonstrated with synthetic authority. Appeals, actual authorization/responses and operational performance are unimplemented. Seeded reviews omit live checklist/history completeness.

**Evidence:** [domain review logic](../prototype/domain.mjs), [UI tests](../tests/ui.test.mjs), [domain tests](../tests/domain.test.mjs), [selected-return regressions](../tests/handoff.test.mjs), [historical correction record](../evidence/verification.md#20-october-2026-kst--final-acceptance-and-correction-pass).

## T4 — Qualified-person measurement and operating controls

**Business outcome / user value:** Product/operations distinguish useful participation from activity, spot unfair/inflated outcomes and make scoped decisions.

**Scope / requirements:** entity/event contracts, product and assigned-invitee metrics, membership/time rules, exclusions, reconciliation and hold/resume signals; REQ-09–REQ-10.

**Dependencies:** agree [measurement definitions](../measurement/README.md) before changing interpretation; T1–T3 supply identities/views/inquiries/reviews. [Experiment](experiment.md) owns campaign configuration; pilot policies and ingestion/reporting controls require separate implementation approval.

**Acceptance criteria:**

- Product numerator is a subset of distinct eligible viewers; email numerator is attributable to eligible randomly assigned invitees. The denominators are named separately.
- Aliases/repeated views/multiple qualified inquiries do not add people; QA/live records remain excluded from the snapshot and shared-device people remain distinct.
- Current adjudication, observation/maturation/cutoff and corrected-report rules are explicit; empty denominators are N/A.
- Questions, people, review decisions, acknowledgement attempts, successful allowance and actual transactions/spend remain distinct.
- Unchanged raw JSON/CSV exports and calculations reconcile, including 50 invitations, 40 viewers, 20 submitters, 21 accepted questions, 12 qualified questions, 11 qualified people and zero real transactions.
- Event dictionary, required fields/keys/idempotency and authority references distinguish actual payloads from future controls.
- Reporting or safety failures route to an accountable scoped hold and recorded resume decision; an unapproved target/sample threshold cannot declare success.

**Prototype status:** snapshot/live separation, current-state equations, cohort/window filters, N/A, source/export reconciliation and dashboards are demonstrated. Random assignment, historical eligibility, general delivery idempotency, frozen/restated reports and automated operating controls are unimplemented.

**Evidence:** [metrics](../measurement/metrics.mjs), [metric tests](../tests/metrics.test.mjs), [raw bundle](../data/experiment.synthetic.json), [calculation output](../evidence/calculations.json), [dashboard screenshot](../evidence/browser-dashboard.jpg), [decision memo](weekly-decision-memo.md).

## T5 — Optional acknowledgement and safe recovery

**Business outcome / user value:** a participant can explore a secondary acknowledgement while retaining the same off-chain contribution and review path.

**Scope / requirements:** optional wallet flow, failure/retry/final off-chain recovery, matching receipts and separate sponsorship accounting; REQ-11–REQ-12.

**Dependencies:** T2 saved inquiry; T1 canonical identity; T4 attempt/transaction definitions; [pending sponsorship controls](journey-and-rules.md#optional-acknowledgement-and-sponsorship). No actual integration or spending is authorized.

**Acceptance criteria:**

- Refusal, close, Escape, connection failure and acknowledgement failure retain saved work and qualification eligibility.
- Genuine retries preserve separate attempts; explicit final off-chain choice ends retry for that version without changing other inquiries.
- A receipt matches the selected person's successful current-version attempt; it cannot assert question qualification, ownership, reserves or returns.
- Existing simulation keeps two sponsored successes per canonical person/session and one per distinct question; failures consume no successful allowance and no actual fees occur.
- The proposed persistent two-per-30-days policy is labeled pending further approval. Separate sponsorship eligibility, allowance, reserved budget and actual spend; failed real transactions may cost gas. No budget/vendor/retry allowance is invented.

**Prototype status:** optional recovery, version-specific demo receipts and session sponsorship are demonstrated. Real wallets/KYC, persistent allowance/budget, finality and actual transactions are unimplemented.

**Evidence:** [domain acknowledgement logic](../prototype/domain.mjs), [domain](../tests/domain.test.mjs), [UI](../tests/ui.test.mjs), [product](../tests/product.test.mjs) and [handoff tests](../tests/handoff.test.mjs); [off-chain failure screenshot](../evidence/browser-offchain-final.jpg), [required replay](../README.md#reproduce-the-three-required-edge-cases).

## Assessment completion boundary

The problem comparison, one experiment, one weekly memo, AI/verification history and three-item submission package remain required evidence linked by [directive](../directive.md). Loom preparation and evaluator handoff are assessment completion work, not a sixth product task. This backlog and its evidence references do not claim new behavioral tests or newly implemented production controls.
