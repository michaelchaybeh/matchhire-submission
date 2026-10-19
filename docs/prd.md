# Participation MVP — evaluator product requirements

Status: local MVP for review; final external evidence and submission remain pending. All scenario claims and outcomes are synthetic.

## Problem and outcome

Invited people can open a disclosure without producing a useful inquiry. Counting clicks, raw questions or wallet actions can obscure whether the project received an actionable question. The selected bottleneck is disclosure engagement → qualified questions.

Primary outcome: distinct eligible canonical disclosure viewers with at least one currently qualified question divided by distinct eligible canonical disclosure viewers. A view does not prove reading. The illustrative baseline is control 4/20 (20%); the illustrative variant is 7/20 (35%). These are fixtures, not an observed baseline or validated target forecast.

## Users and scope

Participants need clear context and wallet-free inquiry; returning aliases need correct identity resolution; reviewers need sentiment-neutral criteria and reasons; operations needs a deduplicated funnel and next actions. Evaluators need reproducible failures and inspectable source data.

The app covers registration, invitation, referenced disclosure, saved question, optional acknowledgement, independent review, clarification, follow-up and measurement. No production auth, KYC, blockchain, real campaign, real incentive, public deployment or durable storage is included. Scope and acceptance are organized in [exactly five tasks](backlog.md).

## Functional requirements

- Resolve predefined aliases to a canonical participant ID distinct from registration, wallet and session IDs. Log original and duplicate attempts; preserve legitimate different people on a shared browser.
- Waiting identities cannot submit or enter eligible conversion. Invitation eligibility and KYC remain separate.
- Provide fictional disclosure claims, assumptions, material risks and evidence gaps with stable section IDs. No verified assets, reserves, audit or returns are implied.
- Preserve full original text and drafts across backward navigation. Explicit exit discards drafts. Reject blanks, >2,000 UTF-16 units, missing section and normalized exact duplicate. Flag close wording conservatively without auto-rejection.
- Save before any wallet modal. Refusal/failure never deletes the question. Keep independent attempt history; off-chain after failure is final. Reuse connection per canonical fixture across questions.
- Reviewer explicitly adjudicates `pending_review`, `qualified`, `needs_clarification`, `excluded` with a specific reason/note, section, timestamp and reviewer fixture. Require material/actionable/not-spam confirmation to qualify. Critical inquiry is welcome. Revisions need a fresh decision.
- Keep review, acknowledgement, sponsorship and certificate eligibility independent. Successful current-version demo acknowledgement is required for certificate preview, with no invented transaction evidence.
- Show synthetic follow-up owner/action/status and preserve review/attempt/version history.
- Derive snapshot and live metrics from their own records, with distinct people, eligible membership, cohort/time filters, current review and zero-denominator N/A.

## Qualification and measurement

A qualified inquiry identifies a material referenced topic and asks for an answer or investigable follow-up; it is neither a duplicate nor spam, gibberish, irrelevant promotion or deliberate abuse. There is no positive-tone, wallet, KYC or minimum-word requirement. The reviewer’s fixture judgment is visible, not treated as objective proof of business value.

The dataset has 50 eligible primary invitations (25/arm), 40 viewers (20/arm), 4 control and 7 variant qualified people. One person has two qualified questions; alias/repeated-view fixtures demonstrate deduplication. Two explicit QA-only people are excluded. Attempt-level wallet results never substitute for the primary outcome. Exact formulas and raw records are in [measurement](../measurement/README.md).

## Operational stop criteria

Hold for any refusal blocking participation, failure deleting a question, fabricated transaction/fee claim, or exclusion/deduplication error raising conversion. Investigate if raw submissions rise while question qualification falls more than 5 percentage points below control. Hold for sentiment-biased decisions, spam/sponsorship exploitation or unreconciled eligibility. These are proposed planning guardrails, not statistical guarantees. See [experiment](experiment.md) and [decision memo](weekly-decision-memo.md).

## Completion and limitations

Completion requires reproducible core journeys, three mandatory edge cases, record-derived calculations, exactly five prioritized tasks, experiment/decision documents and verification evidence. Final Loom (≤5 minutes), external reviewer-access checks and final submission approval remain separate. No interview, real-user performance or live campaign result is asserted.
