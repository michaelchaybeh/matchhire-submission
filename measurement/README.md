# Synthetic measurement contract

Run from the submission root:

```powershell
node measurement/generate-fixtures.mjs
node measurement/verify.mjs
node --test tests/domain.test.mjs tests/metrics.test.mjs
```

The generator is deterministic. It produces the immutable [experiment bundle](../data/experiment.synthetic.json) and individual JSON/CSV files for participants, registrations, questions, events and acknowledgement attempts. No input or outcome is a real observation. The illustrative fixture window is 19–25 October 2026, not an assessment deadline or elapsed operating week.

## Membership and equations

Filter to the same `cohort_id`, fixture window and selected group. Exclude `is_qa_fixture` people. Include only approved, eligible canonical IDs with delivered synthetic invitations. Each person-based stage is a distinct canonical-ID set. Question submission requires a disclosure view; qualified status is current adjudication, not “ever qualified.” Question records adjudicated as exact duplicates do not enter accepted-nonduplicate counts.

| Measure | Equation |
|---|---|
| Invited people | distinct eligible canonical IDs with delivered invitation |
| Disclosure viewers | distinct eligible IDs with ≥1 in-window disclosure-open event |
| Question submitters | distinct eligible viewers with ≥1 accepted nonduplicate question |
| Qualified people | distinct eligible viewers with ≥1 currently qualified question |
| Primary qualified conversion | qualified people × 100 / disclosure viewers |
| Submission conversion | question submitters × 100 / disclosure viewers |
| Invitation → qualified | qualified people × 100 / invited people |
| Question qualification | qualified nonduplicate questions × 100 / accepted nonduplicate questions |
| Duplicate registration rate | duplicate attempts × 100 / all registration attempts within primary campaign membership |
| Demo acknowledgement success | successful demo attempts × 100 / all demo attempts (attempt-level) |
| Sponsored usage | successful sponsored demo attempts; never actual fees |
| Real transactions | count of actual-transaction flags; zero in every shipped record |

Zero denominators produce `null` in JSON and **N/A** in the UI. Percentages are calculated from counts; displayed rounding does not change denominators. The primary calculation remains independent of wallet decisions, KYC and sponsorship.

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
| Primary qualified conversion | 20% | 35% | 27.5% |
| Invitation → qualified | 16% | 28% | 22% |
| Question qualification | 55.56% | 58.33% | 57.14% |

Absolute illustration: `35 − 20 = 15 percentage points`. Relative illustration: `(35 − 20) / 20 × 100 = 75%`. Neither is a measured lift, causal estimate, forecast or significance claim.

Primary registrations: 51 attempts, 50 canonical people, one duplicate (1/51 = 1.96%). Full export: 52 person fixtures (50 primary + 2 QA), 53 registration records, 23 question records, 250 events and 3 acknowledgement attempts. QA-only people `QA-ELIGIBLE` and `QA-WAITING` have adversarial imported qualification fixtures to test exclusion; they are not campaign evidence and cannot change the primary denominator/numerator.

Wallet figures: 3 attempts on 2 primary questions; 1 failure and 2 successes (66.67% attempt success), 1 sponsored success, **0 real transactions**. Nineteen accepted primary questions have no successful demo acknowledgement. These are question-level counts, not disjoint unique-person groups.

## Events and source distinctions

Every event carries ID, ISO time, canonical participant when known, session, `source: synthetic`, cohort and relevant entity IDs. The model distinguishes registration attempts/resolution, invitation, view, explicit abandonment, submission/rejection, review/revision, wallet decisions/connection, acknowledgement result/retry, follow-up and completion. Extra local events identify backward disclosure navigation, conservative wording flags and KYC scenario changes.

The live sandbox is created afresh in memory; its QA personas have a separate `live` cohort. Its dashboard deliberately opts into QA membership and is labelled separately. Live actions never mutate or append to experiment arrays. Reset/reload clears the live data and reloads the same snapshot.
