# Asset Market Cap — proposed waitlist email experiment

This proposed A/B email experiment uses the fictional Suncrest Protocol disclosure on Asset Market Cap. The emails are unsent: no campaign, recruitment or real delivery has occurred. The synthetic illustration below demonstrates the metrics; it is separate from the proposed randomized experiment.

## Why email, and what it does not test

The Quest requires one channel experiment. I selected a hypothetical waitlist email A/B experiment because waitlist invitations initiate the fictional disclosure journey. The selected product bottleneck is disclosure engagement → qualified inquiries. This comparison asks whether invitation messaging that emphasizes useful questions and visible review/follow-up could improve meaningful participation. Both variants lead to the same disclosure and participation experience. The primary success metric measures qualified participation among eligible randomly assigned invitees, rather than email clicks, question volume or wallet activity.

The email experiment evaluates invitation messaging across the complete invitation-to-qualified-inquiry journey. It does not isolate whether section-specific question guidance, clearer review-process explanations, or visible question status and follow-up individually improve qualified-question conversion.

A separate hypothetical in-product A/B test could compare the standard disclosure-reading and question-submission experience with the same experience plus enhanced section-specific guidance and a clearer explanation of review/follow-up. Both would retain identical eligibility, qualification standards, wallet-optional participation and reviewer policies; a possible outcome would be qualified-question conversion among eligible disclosure viewers. This is an illustrative follow-on concept, not a second required Quest experiment. It has not been built, randomized, conducted or validated, and is not scheduled.

## Hypothesis and treatment

Explaining that useful inquiries receive visible reasoned review and a next action may help invited people contribute specific, actionable questions. This is a hypothesis about the complete invitation-to-contribution path, not an observed customer result.

Both arms must receive the same disclosure/version, section references, eligibility, review criteria, response experience and optional-wallet/sponsorship policy. Only email subject/body framing differs. Neither arm promises positive qualification, financial rewards or investment returns. The subject/body pair is one bundled treatment; its individual wording components cannot be separately attributed.

| Arm | Subject | Unsent example body |
|---|---|---|
| Control | Suncrest: review the project disclosure | You are invited to review the fictional Suncrest Protocol disclosure. Explore the proposed pilot, assumptions, risks and information gaps. Ask a question about anything needing clarification. Review Project Disclosure. Wallet and KYC are optional. |
| Variant | Ask a useful question — see its review status | You are invited to review the fictional Suncrest Protocol disclosure. Ask a specific question about a claim, risk or missing evidence and see its review status and next action. Review Project Disclosure. Wallet and KYC are optional. |

These examples communicate wallet/KYC-free inquiry. Any separately approved sponsorship assurance policy must not contradict that promise. The CTA destination, recipient list, consent records, sender identity and lawful/permissioned contact rules must be established before sending.

## Prospective population and assignment

Before any pilot, freeze the eligible approved waitlist population, disclosure/cohort scope, exclusions, policy versions and experiment ID. Randomize **canonical people**, once each, before treatment. A reproducible allocation record must identify arm and assignment time; returning aliases keep the same assignment. Proposed equal allocation is a recommendation pending campaign design approval, not a record of completed randomization.

Retain eligible assigned nonvisitors, delivery failures, off-chain participants and people with unqualified/pending inquiries in the primary denominator. Report delivery/reach separately. Resolve later duplicate identities and conflicting assignments through predeclared arm-neutral rules and corrected reports, not by dropping low-converting people. Do not exclude a legitimate shared-device participant or critical question. Identity assurance, fraud exclusions and final sample size remain unresolved pilot controls.

Reviewers should not see arm labels during adjudication; operations should calibrate material/actionable/not-spam criteria on supportive and critical examples before intake. Record any unavoidable unblinding or policy changes and assess comparability. These controls are prospective, not implemented reviewer authorization or blinded review.

## Metrics, timing and baseline

Definitions and correction rules are owned by the [measurement contract](../measurement/README.md).

| Role | Metric |
|---|---|
| **Primary email decision metric** | Distinct qualified participants attributable to the arm / eligible canonical invitees randomly assigned to the arm |
| Product diagnostic | Distinct eligible disclosure viewers with ≥1 currently qualified inquiry / distinct eligible disclosure viewers |
| Supporting diagnostics | Delivery and view reach, accepted submitters/questions, qualification rate, pending/clarification workload, duplicate attempts, appeals, acknowledgement attempts and actual transactions |

Email framing can change who visits. A viewer-only denominator conditions on behavior after treatment and cannot assess the complete experiment. A disclosure view is not proof of reading/comprehension, and a wallet event is not useful conversion.

**Provisional observation period:** 14 days for participation, then 7 days for review maturation, subject to pilot approval, capacity and data sufficiency. For a single planned invitation batch, declare UTC start/end/cutoff before sending; for staggered batches, finalize equal per-person exposure/maturation and aggregate cutoff before launch. No dates or outreach are scheduled. Attribute original in-window inquiries; permit their clarification to mature until cutoff; use current version/decision then. Show pending workload rather than treating it as qualified. Freeze the report; late reviews/appeals/events follow versioned correction rules.

No observed baseline exists. Establish it separately under the same scope/review/measurement rules. The [PRD](prd.md#outcomes-and-provisional-planning-assumptions) proposes +5pp in **product qualified-viewer conversion** over an observed baseline. That target is not an approved email effect threshold and is not derived from synthetic 35%. Before campaign approval, specify a minimum worthwhile assigned-invitee effect, sample/uncertainty plan and sufficient review capacity. No significance, power or sample adequacy is claimed here.

## Guardrails, decisions and responsibilities

The [universal hold policy](journey-and-rules.md#operations-handoffs-and-holds) applies. Product owns qualification policy; authorized reviewers adjudicate; operations coordinates backlog/appeals/follow-up; engineering validates recovery/events; the pilot owner makes scoped hold/resume decisions.

| Condition | Operating action |
|---|---|
| Refusal gates submission, saved work is lost, critical questions are suppressed or false transaction/fee claims appear | Hold affected participation; investigate and demonstrate correction before pilot-owner resumption. |
| Eligibility, assignment, deduplication or totals cannot reconcile | Freeze the experiment decision and affected report; reconcile and publish correction/version. |
| Generic-question farming, alias abuse or sponsorship exploitation | Operations investigates with fair appeal; pause affected intake/sponsorship as needed without automatically removing legitimate participants. |
| Raw submissions rise while question qualification falls >5pp below control | Proposed investigation trigger, not a validated stop/significance boundary. Finalize sample/maturation conditions, cadence and escalation before launch. |
| Reviews do not mature comparably or proposed response expectations exceed capacity | Defer a winner decision; pilot owner can pause intake, address workload and revise the plan transparently. |

At the declared mature-data checkpoint, compare the primary assigned-invitee metric, uncertainty, quality, delivery, unresolved reviews and operational cost. Continue/modify/stop according to predeclared criteria. If criteria/sample sufficiency remain unset or guardrails unresolved, the decision is **inconclusive/hold**, not “variant wins.” Do not repeatedly extend observation until a preferred result appears. Safety monitoring can occur during the experiment without using interim conversion to declare a winner. No campaign-specific effect threshold or automatic stop service is approved or implemented.

## Synthetic illustration

The chosen fixtures have 25 delivered synthetic invitations and 20 eligible viewers per arm. Canonical assignment is stable; outcomes are generated, not randomized observations.

- Product diagnostic: control `4/20 = 20%`, variant `7/20 = 35%`, pooled `11/40 = 27.5%`; viewer-based difference `+15pp`, `+75%` relative.
- Invitation-stage illustration: `4/25 = 16%`, `7/25 = 28%`, pooled `11/50 = 22%`. These records demonstrate arithmetic, not a completed prospective assigned-invitee experiment or real delivery.
- Qualification: control `5/9 = 55.56%`, variant `7/12 = 58.33%`. The chosen fixtures do not cross the proposed quality investigation trigger.

No causal conclusion, forecast, winner, observed baseline or significance follows. See [raw records and equations](../measurement/README.md#reconciled-fixture-totals).

## Next validation and launch prerequisites

The activities below are hypothetical measures that would be necessary if this fictional concept were ever considered for real-world use. This prototype exists solely for a recruitment assessment; no product launch, participant recruitment, live email campaign or commercialization is planned. A real pilot would require separate approval.

In that hypothetical situation, moderated synthetic-task usability validation would first examine references, review understanding and refusal/recovery. Recruitment and testing would require Product approval before any session. Engineering would prepare record/recovery checks; operations would prepare critical/supportive calibration examples and follow-up/appeal ownership; Product would review prompt comprehension and adverse incentives. The pilot owner would then evaluate readiness, identity/access controls, sample/timing, capacity and pending sponsorship policy before considering a real campaign. Any in-product A/B test would be a separate hypothetical validation step subject to its own design and approval.
