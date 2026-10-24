# Weekly operating decision memo — synthetic week 1

This memo evaluates a synthetic operating scenario for Asset Market Cap's participation capability, using Suncrest Protocol as the fictional disclosure example. The fixture window is **19–25 October 2026**, rather than an elapsed real operating week. No campaign, interview, user validation or real transaction occurred.

## Decision

**CHANGE the validation plan; do not declare an experiment winner.** I would retain wallet-free contribution and visible reasoned review, prepare clearer section-specific clarification guidance, and request approval for moderated usability validation before considering a real campaign. A real campaign depends on validation and operational readiness.

## What the records show

| Measure | Control | Variant | Pooled |
|---|---:|---:|---:|
| Delivered synthetic invitations | 25 | 25 | 50 |
| Eligible disclosure viewers | 20 | 20 | 40 |
| Distinct submitters / accepted questions | 8 / 9 | 12 / 12 | 20 / 21 |
| Qualified questions / qualified people | 5 / 4 | 7 / 7 | 12 / 11 |
| Product qualified-viewer conversion | 20% | 35% | 27.5% |
| Invitation-stage illustration | 16% | 28% | 22% |

The viewer-based illustration is +15pp and +75% relative. Twelve qualified questions come from eleven people because one control person has two. Three primary questions remain pending, four need clarification and two are excluded. Current adjudication determines the snapshot outcome, not historical peak qualification. Raw questions and qualified people are different measures.

The primary cohort has 51 registration attempts for 50 people, including an extra alias resolved to an existing person. Two QA-only people, including an ineligible adversarial record, are excluded. Full exports have 52 people, 53 registrations, 23 questions and 250 events. Three demo acknowledgement attempts on two questions include one failure, two successes and one sponsored success; **zero actual blockchain transactions** and no fees. Nineteen accepted primary questions have no successful demo acknowledgement. See [records and equations](../measurement/README.md#reconciled-fixture-totals).

## Interpretation and limits

The hypothesis is that a referenced question and visible review/next action reduce uncertainty. Chosen group sizes/outcomes cannot establish that explanation, demand, real reviewer quality or causal uplift. For example, synthetic `C-Q05` and `V-Q08` ask “Could you share more details about the project?” and need clarification; `C-Q01` asks who independently verifies monthly operating reports. These examples justify preparing clearer guidance for a usability test, not claiming users were confused in research. The [question export](../data/questions.synthetic.json) preserves their actual labels.

The future email decision metric is qualified people / eligible randomly assigned invitees; viewer conversion is diagnostic because email can change who visits. Existing 16%/28% invitation-stage arithmetic is not evidence that these synthetic people were randomized or contacted. Seed review records are simplified relative to the live checklist/history workflow; neither proves real operational quality.

The proposed quality investigation trigger (>5pp below control while submissions rise) is not crossed by 58.33% variant versus 55.56% control qualification. It remains an unvalidated planning trigger with sample/maturation/cadence decisions pending. No observed baseline or statistically justified winning threshold exists. The [PRD](prd.md#outcomes-and-provisional-planning-assumptions) proposes +5pp over a separately observed product baseline, 14 days plus 7 days maturation, and response expectations; none is achieved performance or a scheduled pilot.

## Responsible roles and checkable next steps

These are proposed next actions, not completed work or assignments to named people. The pilot owner must be named before a pilot.

| Role | Next output and completion condition | Dependency / escalation |
|---|---|---|
| Engineering | Produce a readiness comparison between intended event/recovery contracts and existing behavior; reconciliation and refusal/duplicate/failure evidence remain inspectable; identify unimplemented controls explicitly. | Uses measurement contract; report identity, saved-work or denominator defects to pilot owner. |
| Operations | Prepare critical/supportive/clarification calibration examples, a follow-up owner/action handoff and an appeal-routing plan; flag proposed response capacity and unresolved calendar/authority. | Product resolves criteria ambiguity; pilot owner resolves capacity and coverage. |
| Product | Review section-specific guidance against examples; approve or revise the moderated test plan and pending policy details. | Requires readiness/calibration inputs; no recruitment before approval. |
| Pilot owner | At the readiness checkpoint record continue-to-validation, change, or hold, with reasons and accountable actions. Consider identity/access, reviewer authority, event/cutoff controls, sample/timing and optional sponsorship separately. | No real pilot until its scope, capacity, remaining controls and authorization are explicit. |

## Next decision checkpoint and hold conditions

**Checkpoint:** after engineering readiness and operations calibration plans are available, before recruiting anyone for moderated validation. Product and the accountable pilot owner review the outputs and record a decision. No date is scheduled and no automatic elapsed-time approval applies.

- Continue to moderated validation only with explicit approval, a clear synthetic-task plan, fair review examples and recorded limitations. Its results would be new evidence, not a restatement of this fixture.
- Hold affected participation for wallet gating, saved-work loss, unfair exclusions or false transaction/fee claims. Freeze decisions for unreconciled identity/conversion; pause optional sponsorship separately for cost/abuse uncertainty.
- Before a future email experiment, finalize assignment/sample criteria, eligibility and appeals, 14-day/7-day timing feasibility and reporting freeze; evaluate only at its predeclared mature-data checkpoint.
- Resume only after the pilot owner records corrective evidence and operational review under [hold rules](journey-and-rules.md#operations-handoffs-and-holds).

There is no evidence here supporting campaign scale or a real-world uplift announcement. Historical behavioral checks, their execution dates and limits are recorded in [verification](../evidence/verification.md).
