# Asset Market Cap — measurement contract and synthetic demonstration

This document owns entities, event definitions, counting and reporting semantics for [REQ-09/REQ-10](../docs/prd.md#functional-requirements-and-acceptance). [Journey/rules](../docs/journey-and-rules.md) owns eligibility and qualification policy; the [PRD](../docs/prd.md#outcomes-and-provisional-planning-assumptions) owns the provisional product target; [experiment](../docs/experiment.md) owns campaign design and decision rules.

The intended contract below is distinct from the existing local implementation. No real conversion baseline, campaign or production event pipeline exists. Suncrest Protocol is the fictional disclosure on Asset Market Cap.

## Business entities and identity keys

| Entity | Intended key and distinction | Existing synthetic representation |
|---|---|---|
| Participant | `canonical_participant_id`; one person independent of alias, session, device or wallet | Fixed person records and known alias mapping |
| Registration / waitlist / approval | Separate attempt, membership and effective approval/revocation records | Registration attempts plus fixed participant eligibility/delivery fields |
| Project / disclosure | Stable project ID, disclosure version and section ID | Suncrest context, `suncrest-fiction-v1`, four stable section IDs; no general project service |
| Inquiry / version | Stable inquiry ID plus version; original submission and subsequent revision times | `question_id`, `version`, text/reference; live revision/history fields |
| Review decision | Decision ID, inquiry/version, reviewer authority and supersession links | Live reviewer fixture/criteria/history; simplified seeded reason records |
| Follow-up / appeal | Inquiry-linked assignment/status and separate appeal/decision history | Follow-up fields/events; no appeal workflow |
| Experiment assignment | Experiment ID + canonical person, one immutable arm assignment | Stable `group` values; no random-assignment records |
| Acknowledgement attempt | Distinct attempt ID + person/inquiry/version, independently of wallet connection | `attempt_id`, `question_id`, `question_version`, outcome and demo wallet ID |
| Transaction / sponsorship ledger | Network + actual transaction ID, status/finality; separate allowance/reservation/spend entries | No transactions or budget ledger; demo attempts all have `real_transaction:false` |

Anonymous session identity must remain separate from canonical identity. Do not infer a person from an IP/device, wallet or similar question. Any later identity linking/merge needs deterministic evidence and correction history; assurance/retention details remain pending pilot decisions.

## Product and email metric contracts

Declare project/disclosure scope, cohort, population policy and observation window before counting. All person stages are distinct canonical-person sets; numerator membership must be a subset of its denominator.

| Measure | Definition / equation |
|---|---|
| Core product qualified-viewer conversion | eligible disclosure viewers with ≥1 currently qualified inquiry × 100 / eligible disclosure viewers |
| Prospective email primary decision metric | qualified people attributable to that arm × 100 / eligible canonical invitees randomly assigned to that arm |
| Submission conversion | eligible viewers with ≥1 accepted nonduplicate inquiry × 100 / eligible disclosure viewers |
| Inquiry qualification | currently qualified accepted nonduplicate inquiries × 100 / accepted nonduplicate inquiries |
| Invitation-stage synthetic illustration | qualified people × 100 / eligible people with delivered synthetic invitations; not proof of random assignment |
| Duplicate registration rate | duplicate registration attempts × 100 / all registration attempts in the declared primary membership |
| Demo attempt success | successful demo acknowledgement attempts × 100 / all demo acknowledgement attempts |

The email may change who visits. Conditioning only on viewers therefore omits part of its effect and changes the compared population after treatment. Keep viewer conversion as a product diagnostic; the assigned-invitee denominator retains assigned nonvisitors, delivery failures and unqualified participants. Freeze eligibility/assignment before treatment; wallet refusal and KYC never remove a person from either metric's otherwise eligible population. Predeclared fraud/identity correction rules must be arm-neutral and reported, not selected to improve conversion.

Public anonymous reading is a separate reach measure. Count an eligible viewer only with an attributable canonical identity and applicable approval, not an inferred anonymous visit. Intended public access does not imply permission to submit. The exact assurance, approval/revocation and anonymous-linking policy remains a pilot decision. A proposed conservative approach requires an identified eligible disclosure view before submission; earlier unidentified views do not establish eligible conversion.

Reject/exclude duplicate questions from qualified and accepted-nonduplicate inquiry counts as specified; this does not automatically remove an eligible person who viewed from the product denominator. Pending, clarification and excluded inquiries do not qualify. Multiple qualified inquiries add one person. Critical tone, wallet/KYC, acknowledgement and sponsorship are never qualification filters.

Zero denominators yield `null` in calculation JSON and **N/A** in presentation. Compute percentages from unrounded counts. Relative change is N/A when its control rate is zero; display absolute percentage points separately.

## Prospective windows, cutoff and corrected reports

**Provisional planning assumption:** propose 14 days of participation observation followed by 7 days of review maturation, subject to pilot approval, capacity and data sufficiency. No live dates are scheduled. The following reporting design is prospective; detailed eligibility timing/correction governance must be finalized before a pilot.

1. Declare UTC instants `window_start`, `window_end` and `review_cutoff`, using `[window_start, window_end)` for new contributions. Maturation ends 7 days after the proposed 14-day observation window. Business-day response expectations are separate from these elapsed-day windows.
2. Record eligibility effective time and event occurrence/receipt times. Proposed policy evaluates eligibility at view/submission time; prospective revocation blocks new work without silently rewriting previously valid membership. Fraud correction requires a documented adjudication/restatement. Email assignment membership stays frozen; do not drop people based on downstream outcomes.
3. Attribute original accepted inquiries submitted in the observation window. Clarification of those inquiries may mature until cutoff; use the latest version and decision as of cutoff. New independent inquiries after window end belong to another observation window. A current pending/clarification/excluded version cannot reuse earlier qualification.
4. Freeze the report as of cutoff, including its membership/policy versions, unresolved review counts, sample sizes and exclusions. Current live dashboards may continue changing; a published weekly/experiment report must not silently do so.
5. Record later reviews, appeals, delayed events and identity corrections with occurrence and receipt times. Publish an explicitly versioned restatement identifying affected counts and reasons, or include the change in the next report under a predeclared rule. Late-arrival handling, access/retention and approval authority remain pilot decisions.
6. Compare cohorts with matching definitions, exposure and maturation. Establish an observed baseline separately; never substitute the chosen synthetic 20% control. Product's proposed +5pp target is owned by the PRD and is not a statistical guarantee.

The existing module filters view/submission/registration/attempt timestamps against the fixture's inclusive ISO start/end, but invitation membership is current participant state and qualification is current question state. It does not reconstruct historical eligibility, replay decisions at cutoff, deduplicate every delivered event/attempt row, or freeze or restate reports.

## Event envelope and idempotency

For an intended pilot pipeline, require:

| Field | Type / rule |
|---|---|
| `event_id`, `schema_version`, `event_type` | Nonempty unique string ID; declared version; enumerated event name |
| `occurred_at`, `received_at` | Valid UTC ISO timestamps; preserve occurrence versus ingestion time |
| `source`, `environment` | Explicit provenance and synthetic/live/production environment; never mix QA with campaign results |
| `canonical_participant_id` | String when known; otherwise null with separate anonymous session identity where appropriate |
| `session_id`, `cohort_id` | Declared session and measurement membership; sessions do not define people |
| `project_id`, `disclosure_version`, section reference | Required where a disclosure/inquiry action needs them |
| Entity/version references | Inquiry/version, review, assignment, attempt or transaction keys required by the event type |
| Actor / authority reference | Required for approval, review, appeal and budget actions; participant and reviewer are different roles |
| `idempotency_key` | Logical-action key retained on delivery retry; a genuine new review/retry attempt has a new action identity |

Validate types, required references, ownership, approved enums and time semantics before aggregation. Entity IDs are nonempty strings; inquiry/version and next-attempt numbers are positive integers; eligibility, demo, final and reading-verification flags are booleans; related-ID collections are string arrays. Review decisions use the four states in journey/rules, connection/attempt outcomes use `success`/`failure`, and rejection/review reasons use declared codes with notes where needed. Event-specific references in the dictionary are required for their intended trigger; the source column identifies current omissions/substitutes rather than waiving the future contract. Deduplicate event delivery by event/action identity; accepted inquiries by inquiry/current version; attempt outcomes by attempt ID; transactions by network/transaction ID. A repeated delivery is not another person, inquiry or transaction. Conflicting payloads for one identity require investigation. Participant-entered text and identity documents do not belong in general analytics events; access/retention controls remain pending.

Existing events provide `event_id`, `occurred_at`, participant/session/cohort, `source:synthetic` and event-specific fields. They do not implement the full envelope above. All shipped snapshot records carry synthetic labeling; live record shapes rely on session metadata/event source and differ from seeded exports.

## Complete existing event dictionary

“Both” means seeded snapshot and live sandbox, not production. Optional or absent fields reflect differences between those sources.

| Event | Trigger | Existing payload beyond common envelope | Source |
|---|---|---|---|
| `registration_attempted` | Attempt a known alias registration | Snapshot registration ID; live alias token | Both |
| `registration_resolved` | Resolve canonical person | Registration ID, duplicate resolution | Both |
| `invitation_confirmed` | Surface configured invitation | Eligibility; snapshot `delivered_demo`; live invitation/KYC status | Both |
| `disclosure_opened` | Open disclosure | Disclosure version, `reading_verified:false`; QA imported examples can omit version | Both |
| `disclosure_navigation_back` | Return backward | Draft-preserved flag | Live |
| `disclosure_abandoned` | Explicit exit from active path/draft | Draft-discarded flag | Live |
| `question_submitted` | Accept saved inquiry | Question ID, `qualified:false`; live version | Both |
| `question_rejected` | Reject attempted save | Reason; message/original question ID where available | Both |
| `question_review_flagged` | Conservative same-person overlap | Question ID, related IDs, lexical method | Live |
| `question_revised` | Save clarification | Question ID, new version, pending status | Live |
| `question_reviewed` | Record review state | Question ID, decision/reason; live note, section, reviewer, criteria, version, review time | Both |
| `followup_status_changed` | Save owner/action/status | Question ID, status, owner, next action | Live |
| `kyc_scenario_changed` | Set synthetic KYC scenario | Status, eligibility-unchanged flag | Live |
| `wallet_decision` | Connect or finalize off-chain | Question ID, decision; final/dismissal source for off-chain | Live |
| `wallet_connection_result` | Resolve simulated connection | Question ID, outcome, demo wallet ID/null, demo flag | Live |
| `acknowledgement_retry` | Request another acknowledgement attempt | Question ID, next attempt number | Both |
| `acknowledgement_result` | Resolve demo attempt | Attempt/person/question/version, outcome, wallet/KYC/sponsorship, `at`, real-transaction flag; live gas-policy code | Both |
| `session_completed` | Explicit finish | `real_transactions:0` | Live |

Existing `question_*` names are retained as implementation keys for the product's inquiry concept. `at` on an acknowledgement is the attempt timestamp; `occurred_at` is its enclosing event time. Registration/invitation records are not public CTA clicks or real email delivery receipts. Sign-out/draft actions are not inferred as additional emitted event types.

Proposed future-pilot events, **not implemented**, must cover: `waitlist_joined` (membership key/time); `eligibility_changed` (effective status, actor/reason); `experiment_assigned` (experiment/person/arm/allocation record); `invitation_delivery_result` (assignment/invitation, attempt/status/time); `appeal_opened` / `appeal_resolved` (appeal, disputed decision, actor/outcome); sponsorship reservation/spend changes (ledger/period/amount/unit/status); and actual transaction status (network/transaction/attempt, finality and actual fee). Their exact naming/versioned payloads must be agreed before instrumentation.

## Intended review evidence and current seed limitation

The intended record requires decision ID, inquiry/current version, disclosure/section reference, reviewer identity and authority grant/policy version, decision, all qualifying criteria, appropriate reason, specific note/evidence references, review timestamp, and prior/superseding decision links. Clarification, appeal and re-review preserve prior text and decisions. Authority checks and historical evidence are requirements, not consequences of a checkbox alone.

The live model records a synthetic reviewer ID, criteria, reason/note, version and review history. Seeded snapshot records instead provide simplified status/reason/note/reviewer/section/time; they omit live checklist confirmations and full review/version history, and even pending seeds have a placeholder review-reason record. Imported QA qualifications are deliberately adversarial exclusions. Seed status demonstrates calculation behavior, not a complete adjudication audit or real review quality.

## Existing synthetic membership and equations

For the shipped snapshot, filter the same `cohort_id`, fixture window and selected group. Exclude `is_qa_fixture` people. Include approved eligible canonical IDs with delivered synthetic invitations. Views and accepted inquiries must be in window and in that membership; current adjudication supplies qualification. Questions adjudicated exact duplicate do not enter accepted-nonduplicate counts. These are existing fixture rules, not the full prospective contract.

| Measure | Existing equation |
|---|---|
| Invited people | Distinct eligible canonical IDs with delivered synthetic invitation |
| Disclosure viewers | Distinct eligible IDs with ≥1 in-window disclosure-open event |
| Question submitters | Distinct eligible viewers with ≥1 accepted nonduplicate question |
| Qualified people | Distinct eligible viewers with ≥1 currently qualified question |
| Product qualified conversion | Qualified people × 100 / disclosure viewers |
| Submission conversion | Question submitters × 100 / disclosure viewers |
| Invitation → qualified | Qualified people × 100 / invited people |
| Question qualification | Qualified nonduplicate questions × 100 / accepted nonduplicate questions |
| Duplicate registration rate | Duplicate attempts × 100 / primary registration attempts |
| Demo acknowledgement success | Successful demo attempts × 100 / all demo attempts |
| Sponsored usage | Successful sponsored demo attempts; no actual fees |
| Real transactions | Actual-transaction flags among accepted-question attempts; zero in shipped records |

## Reconciled fixture totals

| Metric | Control | Variant | Pooled |
|---|---:|---:|---:|
| Invited people | 25 | 25 | 50 |
| Eligible disclosure viewers | 20 | 20 | 40 |
| Unique question submitters | 8 | 12 | 20 |
| Accepted nonduplicate questions | 9 | 12 | 21 |
| Currently qualified questions | 5 | 7 | 12 |
| Currently qualified people | 4 | 7 | 11 |
| Pending / needs clarification / excluded | 1 / 2 / 1 | 2 / 2 / 1 | 3 / 4 / 2 |
| Product qualified-viewer conversion | 20% | 35% | 27.5% |
| Invitation → qualified illustration | 16% | 28% | 22% |
| Question qualification | 55.56% | 58.33% | 57.14% |

Viewer-based illustration: `35 − 20 = 15 percentage points`; `(35 − 20) / 20 × 100 = 75%` relative difference. Invitation-stage arithmetic: `4/25 = 16%`, `7/25 = 28%`, `11/50 = 22%`. Neither comparison is a measured lift, causal estimate, forecast or significance claim. Existing assignment and outcomes were chosen, not randomized observations.

Primary registrations: 51 attempts, 50 canonical people, one duplicate (`1/51 = 1.96%`). Full export: 52 people (50 primary + two QA), 53 registrations, 23 questions, 250 events and three acknowledgement attempts. QA-only `QA-ELIGIBLE` and `QA-WAITING` carry adversarial imported qualification examples; neither changes the primary numerator/denominator.

Wallet figures: three attempts on two primary questions, one failure and two successes (`2/3 = 66.67%` attempt success), one sponsored success and **zero actual blockchain transactions**. Nineteen accepted primary questions have no successful demo acknowledgement. These are question/attempt counts, not disjoint unique-person groups or actual connected-wallet counts. A future transaction metric must count unique actual transactions, including failed transactions, independently of inquiry qualification; retries and wallet connections are not transactions. Real gas spend needs a ledger and cannot be inferred from successful allowance.

## Source boundaries and reproducibility

The deterministic [experiment bundle](../data/experiment.synthetic.json) and individual JSON/CSV exports contain no real observations. Its illustrative UTC fixture window is 19–25 October 2026, not an elapsed operating week or assessment deadline. The live sandbox has a separate `live` cohort, deliberately includes its QA personas, and never appends to snapshot arrays. Reset/reload clears live state and reloads the same snapshot.

Read-only reproduction from the submission root:

```powershell
node measurement/verify.mjs
node --test tests/domain.test.mjs tests/metrics.test.mjs
```

The separate command `node measurement/generate-fixtures.mjs` **writes** the eleven generated JSON/CSV outputs; the read-only checks above use the existing exports. Historical deterministic-generation and behavioral results are in [verification](../evidence/verification.md), with actual [calculation output](../evidence/calculations.json). The existing modules implement the synthetic calculation rules described above; the full intended event and reporting contract remains unimplemented.
