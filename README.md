# Asset Market Cap — disclosure participation MVP

Asset Market Cap is the asset-information platform; Suncrest Protocol is the fictional project disclosure used to demonstrate its reusable disclosure-participation and qualified-inquiry capability. The selected bottleneck is disclosure engagement → qualified questions. All people, email outcomes, reviews and wallet actions in this local prototype are synthetic. No deployment or Quest submission is claimed.

## Product specification and demonstration boundary

The [PRD](docs/prd.md) defines intended behavior; [journey/rules](docs/journey-and-rules.md) owns permissions and operating policy; [measurement](measurement/README.md) owns formulas/events. These documents were revised after implementation. [Exactly five product tasks](docs/backlog.md) retrospectively map requirements to evidence and unimplemented pilot dependencies.

The intended product permits anonymous public disclosure reading and approval-controlled submission. The existing prototype selects predefined people: waiting Sam can read, invited John/Maya/Avery can submit. **Anonymous public browsing is not implemented.** Neither wallet nor KYC is required to submit or qualify. Review/follow-up/acknowledgement mechanics are demonstrated with synthetic substitutes; real authority, appeals, durable identity and production services are unimplemented.

The PRD's +5pp target over a separately observed baseline, 14-day observation plus 7-day maturation and response expectations are provisional planning assumptions. No live pilot is scheduled or authorized. Persistent sponsorship policy, budgets and other pilot controls remain pending.

## Prototype build identity

Prototype/source and historical correction evidence baseline: `36d19a0875a44a78121bdad469817f4e1f9d725e` on `review/product-experience-20261020`, [immutable commit reference](https://github.com/michaelchaybeh/matchhire-submission/commit/36d19a0875a44a78121bdad469817f4e1f9d725e). This is a private reference; intended-reviewer access has not been verified. Documentation revisions after that baseline are separate from application changes and do not imply a newly committed/pushed release. The [verification checkpoint](evidence/verification.md) records actual revision checks.

## Launch on Windows

No dependencies or build step. Python standard library runs the local server; Node.js runs tests and formulas.

```powershell
Set-Location C:\Repos\MatchHire\submission
python server.py
```

Open http://127.0.0.1:8770/prototype/ in a **new browser tab** to begin a fresh walkthrough. Each tab owns its in-memory state; keep any existing Product Owner tab open and do not reload it or use Reset Live Sandbox. If the server is already running, reuse it. To restart later, stop the server with Ctrl+C and run the same command; existing tabs keep their state until they reload. The runner serves only this assessment repository, rejects hidden paths such as `.git`, disables directory listings and binds to loopback. Do not open the app as a `file://` page; its local module/data requests need HTTP.

## Reproduce the three required edge cases

1. **Wallet refusal:** Review disclosure & participate → choose John Doe’s primary account → disclosure → select Verification Gap → ask “Who will independently verify the monthly project updates?” → Submit question → Continue off-chain. The question remains saved with no wallet/attempt. Open Reviewer queue, set qualified, choose a qualification reason, enter a specific note and confirm all three criteria. Save review. A critical question uses identical rules. Assign a synthetic follow-up owner/action/status.
2. **Duplicate participant:** Switch Synthetic Persona → John Doe’s returning account alias. It resolves to `L-JOHN`; canonical registered people and unique-viewer count do not increase. Existing questions remain. Avery is a different person using this same browser and is not merged with John.
3. **Failed acknowledgement:** save another distinct question → Explore optional acknowledgement → for unverified John, inspect Network fee sponsorship and optionally Explore KYC verification, then Continue without KYC → expand Reviewer test scenarios in the wallet dialog → select connection failure and Connect Wallet (question remains saved) → choose connection success and reconnect → select acknowledgement failure → Record demo acknowledgement. Retry may succeed, preserving both attempts. Alternatively Continue off-chain finalizes the failure decision and removes retry. No TXID, transaction or fee exists.

Maya is a preconfigured KYC-verified fixture for the two-success sponsorship limit; John is not verified. Sam is waiting/ineligible and cannot submit. Ineligibility, aliases and KYC are fixed local test scenarios, not actual identity checks.

Drafts show a live character counter and an in-tab saved indicator after a draft-save operation. Back preserves the selected topic and text; Exit and discard draft asks for confirmation when either is present. Keep editing or Escape preserves the draft. No draft survives refresh or tab closure.

The account portraits and proposed-network art are original local SVG illustrations. The compact ecosystem profiles and decorative trends are presentational examples, not market quotations or performance data. KYC exploration collects nothing and never changes a participant’s verification state.

Questions can be revised only after needs-clarification review. The prior version and decisions remain in history; new text returns to pending review. Certificates require successful acknowledgement of the selected current version. Multiple successful questions have separate labelled certificate actions. Closing the acknowledgement modal or pressing Escape preserves the submission and continues off-chain.

## Verification commands

Read-only calculations and the existing artifact checks can be run independently:

```powershell
node measurement/verify.mjs
node --test tests/artifacts.test.mjs
```

For an authorized full behavioral reproduction, the original suite and syntax/HTTP commands remain below. Listing them does not claim they were rerun during the documentation revision. Use the dated verification record for actual scope/results.

```powershell
node measurement/verify.mjs
node --test tests/artifacts.test.mjs tests/domain.test.mjs tests/metrics.test.mjs tests/product.test.mjs tests/ui.test.mjs tests/participant.test.mjs tests/evaluator.test.mjs tests/handoff.test.mjs
node --check prototype/app.js
node --check prototype/domain.mjs
node --check prototype/ui.mjs
node --check prototype/product.mjs
node --check prototype/participant.mjs
node --check prototype/evaluator.mjs
node --check measurement/metrics.mjs
node --check measurement/generate-fixtures.mjs
node --check measurement/verify.mjs
node --check tests/domain.test.mjs
node --check tests/metrics.test.mjs
node --check tests/artifacts.test.mjs
node --check tests/ui.test.mjs
node --check tests/product.test.mjs
node --check tests/participant.test.mjs
node --check tests/evaluator.test.mjs
node --check tests/handoff.test.mjs
node --check tests/browser-harness.mjs
python server.py --check
git -C C:\Repos\MatchHire\submission diff --check
```

Fixture regeneration is separate: `node measurement/generate-fixtures.mjs` writes eleven JSON/CSV outputs and requires specific authorization; do not run it for this documentation revision. Generated files are deterministic. The experiment bundle has 50 primary people plus two excluded QA fixtures; charts and equations derive from records. Immutable experiment metrics and live sandbox metrics are displayed separately. Reset/reload erases live state, including identity, drafts, questions, reviews, wallet and sponsorship; it reloads the same snapshot.

Shipped totals remain 50 invitations, 40 eligible viewers, 20 submitters, 21 accepted nonduplicate questions, 12 qualified questions and 11 qualified people. Viewer conversion is 20%/35%/27.5%; invitation-stage illustration is 16%/28%/22%. Three demo attempts include two successes and one failure; actual transactions are zero. These chosen records are neither an observed baseline nor a randomized campaign. The prospective email decision denominator is eligible randomly assigned invitees; the current dashboard retains its synthetic labels and viewer-based comparison.

## Evaluator artifacts

- [intent.md](intent.md) records selection and unchanged scores; [directive.md](directive.md) preserves final working instructions and the mandatory evaluator results/handoff appendix. Exactly three required submission items remain Loom ≤5 minutes, intent.md and final directive.md. Supporting files are linked evidence; Loom, intended-reviewer access, actual human effort and final submission approval remain outstanding.
- [Journey/rules](docs/journey-and-rules.md), [PRD](docs/prd.md), [five-task backlog](docs/backlog.md)
- [Dataset/equations](measurement/README.md), [email experiment](docs/experiment.md), [weekly decision memo](docs/weekly-decision-memo.md)
- [Verification evidence](evidence/verification.md)

## Boundaries and provenance

Recorded provenance credits a pre-existing exploratory wireframe with visual language, bounded previews, escaping and optional-wallet recovery patterns, and credits the MVP work with canonical identity, qualification/revision/follow-up logic, data, measurement and tests. Codex contributed implementation, research/drafting and historical verification/corrections. The candidate's exact historical approvals, walkthroughs and contribution split require personal confirmation in intent/directive. No private coordination records are incorporated by this revision.

There is no real authentication, KYC, global uniqueness/bot detection, blockchain, gas processing, production analytics, durable database or email delivery. The live sponsorship cap is two successful acknowledgements per canonical person/session, one per inquiry; it resets with the sandbox and is not a persistent budget policy. Failed real transactions may cost gas, while this demonstration processes none. Seed reviews are simplified relative to the live checklist/history workflow. Synthetic reviewer judgment and follow-up status are not proof of real value or delivered responses. Native certificate printing and comprehensive cross-browser/accessibility testing require separate manual confirmation. No commit, push, merge, deployment, contact, access grant or Quest submission is authorized by the documentation revision.
