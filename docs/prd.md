# Asset Market Cap — disclosure participation MVP

Status: intended product specification revised after the synthetic prototype was built. D1–D8 establish approved direction. P1–P3 are approved for documentation as provisional planning assumptions; they do not authorize a pilot or establish operational commitments. Production controls and sponsorship parameters remain pending where identified below.

## Product boundary and business context

Asset Market Cap is the asset-information platform. Suncrest Protocol is a fictional project whose public disclosure supplies the example content. This specification covers the platform's reusable disclosure-participation and qualified-inquiry capability, not construction of Suncrest's proposed energy-evidence registry or a complete asset-information platform.

The selected bottleneck is **disclosure engagement → qualified inquiries**. A person may encounter a disclosure without knowing what to ask or what will happen afterward. Views, raw question volume and wallet activity do not establish that the project received an investigable contribution. The business value sought is a useful evidence gap with an accountable response path. Qualification is a leading indicator; a recorded owner or status is not proof that an answer was delivered or valuable.

Hypothesis: section-specific guidance, a saved reference, visible reasoned review and follow-up reduce uncertainty and help eligible viewers contribute useful inquiries. This remains unvalidated. The alternatives and unchanged prioritization judgments are in [intent](../intent.md).

## Actors and needs

| Actor | Need and intended value |
|---|---|
| Public reader | Read the disclosure, assumptions, risks and missing evidence without registration or invitation. |
| Interested registered person | Join the waitlist and understand approval status and next steps. |
| Approved participant | Ask without wallet/KYC, recover their own saved inquiry and understand its disposition. |
| Authorized reviewer | Apply consistent, sentiment-neutral criteria with reasons and traceable evidence. |
| Operations | Coordinate ownership, clarification, response updates and appeals without conflating them with acknowledgement. |
| Product | Own qualification policy and prioritize useful participation rather than activity volume. |
| Accountable pilot owner | Decide scoped holds and resumption using engineering and operations evidence. |

The project team may supply evidence to operations; a real response channel and authority must be agreed before a pilot. Evaluator controls are demonstration tooling, not product actors.

## Outcomes and provisional planning assumptions

The core product outcome is distinct eligible disclosure viewers with at least one currently qualified inquiry divided by distinct eligible disclosure viewers. The scope, membership, cutoff and formulas are owned by the [measurement contract](../measurement/README.md). Opening a disclosure never proves reading or comprehension.

- **Baseline:** none has been observed. After separate pilot authorization, establish an observed baseline using a declared population/disclosure scope, consistent review policy and the same measurement/maturation rules used for evaluation. Record sample size, pending workload, delivery context and exclusions; do not borrow an industry or fixture percentage.
- **P1 — provisional target:** propose a **+5-percentage-point improvement** in qualified-viewer conversion relative to that separately observed baseline. It is a planning target, not proven performance, an absolute 35% target or a validated forecast. Population comparability and data sufficiency must be assessed before interpreting it.
- **P2 — provisional period:** propose **14 days of participation observation followed by 7 days of review maturation**. Capacity, data sufficiency and pilot approval remain prerequisites. No live dates are scheduled.
- **P3 — proposed response expectations:** initial review within **2 business days**; follow-up assignment within **1 business day after qualification**; response or progress update within **5 business days after qualification**. These are proposals, not achieved SLAs or staffing commitments. The pilot business calendar, escalation coverage and capacity remain unresolved.

The prospective email experiment uses qualified people / eligible randomly assigned invitees as its primary decision metric; viewer conversion remains its product diagnostic. This avoids judging the email only among people who chose to visit. See [experiment](experiment.md).

## MVP boundary and non-goals

The intended MVP joins public disclosure access, permissioned inquiry submission, review/clarification, participant status, operational follow-up and person-based measurement. Optional acknowledgement is secondary. A small synthetic implementation demonstrates selected mechanics; it need not implement every future-pilot requirement to satisfy the Quest.

Non-goals: trading, investment solicitation, asset/reserve verification, building an energy registry, rewards or token distribution, automated quality grading, a full support platform, and production identity/blockchain infrastructure in this revision. No wallet, KYC vendor, spending, campaign, deployment or participant recruitment is authorized here. The disclosure and any acknowledgement cannot establish ownership, verified reserves or guaranteed returns.

## Functional requirements and acceptance

Detailed policy is owned by [journey and rules](journey-and-rules.md); schema and counting are owned by [measurement](../measurement/README.md). Acceptance below specifies intended behavior. Prototype coverage is listed separately, and unresolved pilot controls remain dependencies rather than implemented claims.

| ID | Requirement | Objective acceptance | Task |
|---|---|---|---|
| REQ-01 | Public, referenced disclosure | A public reader can read without registration/invitation; project, disclosure version, stable sections, assumptions, material risks and evidence gaps are identifiable; no reading or asset-verification claim is inferred. | T1 |
| REQ-02 | Permissioned participation | Registration/waitlist is separate from approval; approved participants can submit; waiting/revoked users cannot create new inquiries; public reading remains available. Wallet/KYC cannot gate submission or qualification. | T1 |
| REQ-03 | Canonical identity and fairness | Returning aliases preserve one person and their records; a different person sharing a browser remains distinct; ambiguous identity/abuse cases receive documented review rather than device-based automatic exclusion. | T1 |
| REQ-04 | Guided candidate inquiry | Require a disclosure section and nonblank full text; reject over 2,000 UTF-16 units and normalized same-person exact duplicates without another accepted ID; similar wording only flags review. A saved submission begins pending review. | T2 |
| REQ-05 | Saved contribution, draft and status | Save before any wallet offer; backward navigation preserves the draft; explicit discard is confirmed when meaningful; participants recover their own text/current status, reasons and next step. No other participant's inquiry is substituted. | T2 |
| REQ-06 | Reasoned qualification | Authorized reviewers record material/actionable/not-spam confirmations, appropriate reason, specific note/evidence, actor, version and time. Supportive/critical inquiries use the same criteria; pending/clarification/excluded states never count qualified. | T3 |
| REQ-07 | Clarification and historical traceability | Clarification creates a new current version pending fresh review; prior text, decisions and acknowledgement attempts remain traceable; no prior-version success creates a current-version receipt. | T3 |
| REQ-08 | Operational follow-up and appeals | Qualified inquiries support owner, next action and status. Operations coordinates responses/appeals; an appeal preserves the disputed decision and routes to authorized reconsideration without automatic qualification. | T3 |
| REQ-09 | Qualified-person measurement | Distinct eligible people define product conversion; assigned eligible invitees define the email decision denominator. Declare cohort/window/cutoff, QA exclusions and N/A for zero denominators; deduplicate people without merging shared-device users; reconcile source/export counts. | T4 |
| REQ-10 | Operating controls | Refusal gating, saved-work loss, unfair exclusions and false transaction claims trigger scoped holds; measurement and sponsorship failures have appropriate narrower holds. The pilot owner records corrective evidence and a resume decision. | T4 |
| REQ-11 | Optional acknowledgement and safe recovery | Refusal, dismissal, Escape and connection/acknowledgement failures retain the saved inquiry. Genuine retries retain separate attempts; explicit final off-chain choice is respected. A receipt requires matching current-version success and cannot imply qualification or project verification. | T5 |
| REQ-12 | Separate sponsorship accounting | Distinguish sponsorship eligibility, successful allowance, reserved budget and actual spend; persist approved limits across sessions/aliases/revisions in a pilot; failed real transactions may spend gas without using successful allowance. Unresolved parameters cannot authorize spending. | T5 |

## Ownership, safeguards and dependencies

Product owns qualification policy; authorized reviewers adjudicate; operations coordinates follow-up and appeals; the accountable pilot owner decides hold/resume. Engineering diagnoses data/recovery failures and supplies corrective evidence. The [responsibility and hold rules](journey-and-rules.md#operations-handoffs-and-holds) define handoffs, escalation and proposed response timing.

Before real participation, resolve identity assurance and approval/revocation authority, reviewer permissions, appeal handling, account recovery, access/retention, capacity and business calendar, event idempotency/historical reporting, and the pilot's disclosure/response channel. Similar wording and shared devices alone cannot establish duplicate identity or bot activity. Layered abuse controls need validation; the local model is not production bot detection.

For optional sponsored transactions, the proposed two successes per canonical person per 30 days and one per inquiry across revisions **requires further approval**. Budget, verification method, retry allowance, chain/finality rules and funding remain unset. See [sponsorship policy](journey-and-rules.md#optional-acknowledgement-and-sponsorship).

## Assumptions and unresolved decisions

The hypothesis assumes disclosures expose meaningful gaps, participants value reasoned disposition, reviewers can calibrate criteria, and operations can obtain useful responses. None is validated by the synthetic outcomes. Baseline/sample adequacy, experiment effect threshold/uncertainty plan, the proposed quality trigger's operating conditions, response capacity, identity assurance, retention and sponsorship policy need explicit pilot decisions. No current vendor or compliance policy is selected.

## Existing prototype mapping

| Intended capability | Existing demonstration | Simulated or unimplemented boundary |
|---|---|---|
| Public reading and eligibility | Waiting Sam can read; invited John/Maya/Avery submit. | Anonymous public browsing, real waitlist approval/revocation and authentication are not implemented. |
| Identity/fairness | John's aliases share L-JOHN; Avery remains distinct on the same browser. | Predefined aliases do not establish real-person uniqueness, account recovery or bot resistance. |
| Inquiry/status | Referenced save, drafts, rejection, own-record dashboard and wallet refusal. | State is in memory per tab; refresh/closure clears it. No durable participant service. |
| Review/clarification/follow-up | Explicit checklist/reason/note, revision/history and owner/action/status mechanics. | Reviewer authority and follow-up are simulated; no real response/appeal service. Seed reviews are simplified and omit live checklist/history completeness. |
| Measurement/controls | Fixed snapshot and separate live QA; distinct-person equations and saved tests. | No production ingestion, random assignment, historical eligibility, frozen reports or automatic operating control service. |
| Optional acknowledgement | Connection/failure/retry/off-chain recovery and matching demo receipt; two sponsored successes per person/session. | No real wallet, KYC, payment or transaction. Session allowance is not a persistent budget policy. |

Implementation evidence and status are linked from [exactly five retrospective product tasks](backlog.md). Historical verification is in [evidence](../evidence/verification.md). Recruitment packaging and final submission readiness belong in [directive](../directive.md), not product acceptance.
