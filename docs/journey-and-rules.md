# Asset Market Cap — participation journey and operating rules

This document owns participation policy for the [MVP requirements](prd.md). Suncrest Protocol is the fictional disclosure example. Approved direction is distinguished from provisional response expectations, proposed pilot controls and the existing synthetic implementation. No real pilot is authorized.

## Permissions and intended journey

| Actor/status | Read public disclosure | Register/waitlist | Submit candidate inquiry | Review/appeal | Optional sponsorship |
|---|---|---|---|---|---|
| Anonymous reader | Yes, without registration/invitation | May choose to register | No | No adjudication rights | No entitlement |
| Registered/waiting | Yes | See waiting status | No until approved | May seek eligibility reconsideration through the pilot's agreed route | Separate policy; waiting status does not authorize a transaction |
| Approved participant | Yes | See approval status | Yes, without wallet/KYC | See own decision/reason; request clarification or appeal | Only if separately eligible; never required to contribute |
| Revoked participant | Yes | See status/reconsideration route | No new submission | Historical record/appeal access under the pending access policy | No new sponsorship while eligibility is unresolved |
| Authorized reviewer | Yes | No special participant approval implied | Ordinary participant rules if contributing | Adjudicate within granted scope; record reasons/evidence | No special fee entitlement |
| Operations / pilot owner | Yes | Administer only within approved authority | No bypass of participant rules | Coordinate appeals/follow-up; pilot owner decides holds | Administer only an explicitly approved policy/budget |

Public reading, permissioned inquiry submission and sponsored acknowledgement are separate permissions. An eligible submission is a **candidate inquiry**, not an automatically qualified result.

1. Read a versioned public project disclosure, including claims, assumptions, material risks and evidence gaps. Opening is not verified reading or comprehension.
2. If interested, register and join the waitlist. Explain that approval controls submission, not disclosure access.
3. On approval, identify the participant and referenced disclosure. A waiting or revoked person can keep reading and seek reconsideration without being added to eligible conversion.
4. Select a material section and save a question. Show a saved reference and pending review before offering any wallet action.
5. Optionally acknowledge participation, or continue off-chain. Acknowledgement cannot affect qualification.
6. An authorized reviewer records a reasoned decision. The participant sees the decision and next step.
7. Where clarification is requested, revise the inquiry; retain prior versions and require fresh review.
8. Operations coordinates a qualified inquiry's owner, next action and response/update. A disputed decision may enter the separate appeal route.
9. The participant may ask another question or finish. Multiple qualified inquiries still count once per person within the declared metric scope.

## Eligibility, approval and identity assurance

Intended lifecycle: registration/waitlist → recorded approval/invitation → eligible participation; revocation blocks new submissions; recorded reinstatement can restore permission. Invitation delivery and approval are separate facts. An undelivered campaign invitation does not silently alter the prospective experiment's frozen assigned denominator.

Before a pilot, Product and the pilot owner must name approval/revocation authorities, grounds, notification/reconsideration route and assurance method. A verified contact/account plus a controlled invitation is a proposed lightweight approach, not a selected implementation or compliance policy. No wallet or KYC is required to ask or qualify. A device, IP, wallet, registration attempt and canonical person are different identifiers.

Returning aliases must recover the same canonical participant. Identity merges need recorded evidence, provenance and reversible correction; conflicting experiment assignments must be investigated. Shared-device use alone must never merge or exclude distinct people. Ambiguous identity cases require human review and an appeal route. Access controls, account recovery and retention/deletion periods remain pilot decisions; the proposed default is own-record participant access and authorized reviewer/operations access, without assuming public inquiry publication.

## Inquiry qualification, exclusions and transitions

A qualified inquiry references a material claim, assumption, risk or information gap and asks for an answer or investigable follow-up. The reviewer confirms **material, actionable and not spam/duplicate/abuse**, records an appropriate reason and specific note/evidence, and identifies their authority and the inquiry version. Critical sentiment, wallet connection, KYC and minimum word count are not criteria. A precise question such as “Which audit?” can qualify.

| Current state / action | Result and required record |
|---|---|
| Valid accepted submission | `pending_review`; saved full text and disclosure reference. |
| Authorized review | `qualified`, `needs_clarification`, `excluded`, or reasoned return to `pending_review`; actor, criteria where qualifying, reason, note/evidence, time and version. |
| Participant revision from `needs_clarification` | New current version becomes `pending_review`; prior text/review/acknowledgement remains traceable. |
| Reconsideration/demotion | Append a new decision; recompute current qualification without erasing history. |
| Appeal opened | Separate appeal record; disputed decision remains until authorized reconsideration. No automatic qualification. |

Exclude spam, gibberish, irrelevant promotion, deliberate abuse and adjudicated duplicate questions using a documented reason. Pending and clarification are unresolved states, not qualified outcomes or proof of participant failure. Distinguish a rejected duplicate submission from an accepted inquiry later adjudicated duplicate; [measurement](../measurement/README.md) owns their counting treatment. Excluding a question does not automatically remove its otherwise eligible viewer from the product denominator.

Preserve full text and drafts on backward navigation; confirm explicit discard of meaningful drafts. Reject blank text, missing section, more than 2,000 UTF-16 units and same-person exact duplicates after case/whitespace normalization. Similar wording alone cannot establish duplicate identity, a bot or poor quality. The current conservative overlap flag only compares the same person's questions.

## Abuse controls and nonfinancial incentives

Value comes from a saved contribution, visible reasoned disposition and an accountable response path. No token, money, yield, ownership, future reward or positive-sentiment requirement is offered. A wallet-only receipt is optional; the off-chain contribution retains the same review and follow-up rules.

Future-pilot controls should layer account/invitation assurance, calibrated rate limits, duplicate review, reviewer calibration, monitoring and appeals. Thresholds, tooling, escalation coverage and any automation require decisions and validation. Do not treat an overlap score or shared device as sufficient exclusion evidence. Operations reviews disputed flags; Product reviews qualification-policy bias; engineering investigates event/identity defects. These are requirements, not implemented bot detection.

## Operations handoffs and holds

| Role | Responsibility and handoff |
|---|---|
| Product | Own criteria, policy versions and prioritization; resolve policy ambiguity and investigate sentiment-biased patterns. |
| Authorized reviewer | Adjudicate within granted scope; document evidence/reasons; send clarification to the participant or qualified work to operations. |
| Operations | Assign follow-up owner/action/status; coordinate project responses/updates; route appeals for reconsideration, preferably to another authorized reviewer where feasible. |
| Engineering | Diagnose saved-work, identity, event and recovery failures; provide reproducible corrective evidence. |
| Accountable pilot owner | Record scope/reason of hold; coordinate corrective action; authorize resumption after evidence and operational review. A named owner is required before launch. |

Proposed P3 expectations: initial review within **2 business days of submission**; follow-up assignment within **1 business day after qualification**; response or progress update within **5 business days after qualification**. These are planning proposals, not achieved SLAs or staffing commitments. Business calendar/timezone, workload coverage, appeal turnaround and escalation contacts remain unresolved. Operations escalates threatened/missed expectations to the pilot owner rather than marking a response delivered. Product receives recurrent policy/quality issues; engineering receives data/recovery defects.

Follow-up states are `unassigned`, `triaged`, `response_pending`, `addressed`. A pilot must require an accountable owner and next action before work is considered triaged; an addressed status needs a response/evidence reference. The local status editor simulates these operating actions and does not deliver a response or enforce a production SLA.

| Trigger | Hold scope and evidence required to resume |
|---|---|
| Wallet refusal blocks participation, saved inquiry is lost, unfair exclusions or false transaction/ownership claims | Hold affected participation flow; engineering reproduces/fixes the defect and operations/Product checks policy and impacted records. |
| Unreconciled eligibility, duplicates or conversion | Freeze affected reporting and experiment decisions; reconcile membership/events and publish corrections. Public reading need not be stopped. |
| Sponsorship exploitation, unknown expenditure or budget breach | Pause affected sponsorship/acknowledgement; reconcile cost/status and abuse controls; retain safe off-chain participation. |
| Workload threatens fair review or response expectations | Pause further pilot intake or reduce scope as decided by pilot owner; clear/calibrate backlog and confirm capacity. |

The pilot owner records corrective evidence, impact/remediation, consulted roles and explicit resume decision. The [experiment](experiment.md) owns campaign-specific quality triggers; the [memo](weekly-decision-memo.md) records the simulation's next actions. No automated hold service is implemented.

## Optional acknowledgement and sponsorship

Acknowledgement is secondary to the saved inquiry and independent of review. Refusal, close or Escape continues off-chain. Connection failure supports recovery; failed acknowledgement retains the inquiry and separate attempts. An explicit final off-chain choice after failure ends retry for that version. A receipt must match a successful current-version acknowledgement and must not assert qualification, ownership, verified reserves or guaranteed returns.

**Pending production proposal (P4):** up to **two sponsored successes per canonical participant per 30 days**, at most **one per inquiry across revisions**. This requires further approval. The period's exact boundary, persistent identity assurance, KYC justification, verification method, network/finality rules, retry allowance, per-transaction cap, total budget and funding are not established. KYC may apply to a justified sponsored-fee path; it is not automatically mandatory for all acknowledgement paths. An eligible off-chain participant can always decline.

Before any real sponsored path, distinguish and persist:

- Sponsorship eligibility and its reason, independently of submission/qualification.
- Successful-acknowledgement allowance across aliases, sessions, devices and versions.
- Budget reserved before broadcast, released/reconciled on resolution, and actual network-fee spend.
- Attempt and transaction identity; reconcile unknown status before retry to avoid duplicate broadcast.

A failed real transaction may consume gas budget without consuming successful allowance. Network fees differ from an ordinary off-chain wallet-message signature. No fee estimate, actual spend or funding commitment exists here. Safe off-chain continuation remains available when sponsorship is unavailable.

## Current synthetic implementation and evidence

The prototype selects predefined personas; **anonymous public browsing is not implemented**. John/Maya/Avery are invited; Sam waits and can read but cannot submit or enter eligible conversion. John's returning alias resolves to L-JOHN; Avery is separate. These are fixed scenario mappings, not actual authentication, waitlist approval, revocation or KYC.

Suncrest's `pilot`, `reporting`, `verification` and `risk` sections are stable fictional references. Drafts, saved text, checklist review, clarification, follow-up fields and attempt histories are local mechanics. Live review uses a synthetic reviewer ID; seeded snapshot reviews contain simplified reasons and omit live checklist/history completeness. Real authority, appeals, responses, durable storage and production abuse controls are unimplemented.

The sponsorship simulation allows two successful acknowledgements per verified canonical person **per tab session**, one per distinct question. Failures use no successful allowance; no fees occur. Unverified/exhausted/already-sponsored routes simulate self-funding or continue off-chain. Reload/reset clears the live sandbox, so the session cap is not persistent production budget protection. Connection is reused per canonical fixture; receipts require matching current-version success and have no TXID/explorer link.

The fixed experiment snapshot and mutable live QA are separate. See [measurement](../measurement/README.md), [five-task evidence](backlog.md), [local replays](../README.md) and [historical verification](../evidence/verification.md).
