# One channel experiment — synthetic waitlist email

This is an unsent email A/B experiment design with illustrative records, not an executed campaign. No recipients or personal email addresses are collected.

## Hypothesis and design

Explaining that useful questions receive visible review status may help eligible disclosure viewers ask specific, actionable questions. That is a hypothesis; the fixture uplift was chosen for demonstration. A real pilot would need separate approval, consent, deliverability checks and canonical-person random assignment before sending anything.

The synthetic assignment is stable by canonical ID: 25 control invitations and 25 variant invitations, with 20 disclosure viewers each. A duplicate alias retains its person’s group. Both arms receive identical disclosure, section references, invitation policy, optional-wallet treatment and sentiment-neutral qualification. Only the email framing differs.

| Arm | Subject | Unsent example body |
|---|---|---|
| Control | Suncrest: review the project disclosure | You are invited to review the fictional Suncrest Protocol disclosure. Explore the proposed pilot, assumptions, risks and information gaps. Ask a question about anything needing clarification. Review Project Disclosure. Wallet and KYC are optional. |
| Variant | Ask a useful question — see its review status | You are invited to review the fictional Suncrest Protocol disclosure. Ask a specific question about a claim, risk or missing evidence and see its review status and next action. Review Project Disclosure. Wallet and KYC are optional. |

No urgency, investment claim, promised reward or positive-tone request appears in either arm. No real CTA destination or delivery event is fabricated.

## Measurement and guardrails

Primary: distinct eligible viewers with ≥1 currently qualified question / distinct eligible disclosure viewers. Track invitation-stage conversion separately, along with raw submissions, question qualification, pending/clarification, duplicate attempts and acknowledgement outcomes. An email open or disclosure view is not comprehension. Reviewer qualification must be blind to sentiment and, in a real pilot, ideally arm assignment.

The illustrative control is 4/20 = 20%, variant 7/20 = 35%; pooled 11/40 = 27.5%, +15pp and +75% relative. Invitation-stage results are 4/25 = 16% and 7/25 = 28%. These reproduce the fixture, not a causal conclusion. No power calculation, confidence interval or significance is asserted.

Hold immediately for wallet refusal blocking participation, failures deleting saved work, fake transaction/fee claims, or identity/eligibility errors inflating conversion. Investigate if raw submissions rise but question qualification drops more than 5pp below control. In these fixtures, 58.33% variant versus 55.56% control does not cross that proposed guardrail. Stop/hold for critical-question suppression, spam/sponsorship exploitation or unreconciled rules. A single simulation cannot choose a winner.

Abuse risks include generic-question farming, alias reuse, reviewer bias and gas-sponsorship loops. Controls demonstrated here are canonical aliases, exact duplicate rejection, conservative overlap flags, reasoned human-fixture review, nonfinancial incentives and capped one-per-question sponsorship. They are not production bot or identity controls.

Next validation: a moderated, synthetic-task usability session to test disclosure references, review understanding and refusal/recovery. Product Owner approval is required before recruiting anyone or running a permissioned real pilot. Engineering validates events/recovery; operations calibrates reasons and follow-up; product evaluates prompt comprehension and adverse incentives.
