# Suncrest participation MVP — local synthetic assessment prototype

Disclosure engagement → qualified questions. All people, projects, email outcomes, reviews and wallet actions are synthetic. This is a local review build, not a deployed product or submitted Quest.

## Launch on Windows

No dependencies or build step. Python standard library runs the local server; Node.js runs tests and formulas.

```powershell
Set-Location C:\Repos\MatchHire\submission
python server.py
```

Open http://127.0.0.1:8770/prototype/ and stop with Ctrl+C. The runner serves only this assessment repository, rejects hidden paths such as `.git`, disables directory listings and binds to loopback. Do not open the app as a `file://` page; its local module/data requests need HTTP.

## Reproduce the three required edge cases

1. **Wallet refusal:** choose John’s primary alias → Join waitlist → disclosure → select `verification` → ask “Who will independently verify the monthly project updates?” → Submit question → Continue off-chain. The question remains saved with no wallet/attempt. Open Reviewer queue, set qualified, choose a qualification reason, enter a specific note and confirm all three criteria. Save review. A critical question uses identical rules. Assign a synthetic follow-up owner/action/status.
2. **Duplicate participant:** switch persona → John’s duplicate/returning alias → Join waitlist. It resolves to `L-JOHN`; canonical registered people and unique-viewer count do not increase. Existing questions remain. Avery is a different person using this same browser and is not merged with John.
3. **Failed acknowledgement:** save another distinct question → expand Reviewer test scenarios in the modal → select connection failure and Connect Wallet (question remains saved) → choose connection success and reconnect → select acknowledgement failure → Record demo acknowledgement. Retry may succeed, preserving both attempts. Alternatively Continue off-chain finalizes the failure decision and removes retry. No TXID, transaction or fee exists.

Maya is a preconfigured KYC-verified fixture for the two-success sponsorship limit; John is not verified. Sam is waiting/ineligible and cannot submit. Ineligibility, aliases and KYC are fixed local test scenarios, not actual identity checks.

Questions can be revised only after needs-clarification review. The prior version and decisions remain in history; new text returns to pending review. Certificates require successful acknowledgement of the selected current version. Multiple successful questions have separate labelled certificate actions. Closing the acknowledgement modal or pressing Escape preserves the submission and continues off-chain.

## Verification commands

```powershell
node measurement/generate-fixtures.mjs
node measurement/verify.mjs
node --test tests/domain.test.mjs tests/metrics.test.mjs tests/artifacts.test.mjs
node --check prototype/app.js
node --check prototype/domain.mjs
node --check measurement/metrics.mjs
node --check measurement/generate-fixtures.mjs
node --check measurement/verify.mjs
node --check tests/domain.test.mjs
node --check tests/metrics.test.mjs
node --check tests/artifacts.test.mjs
python server.py --check
git -C C:\Repos\MatchHire\submission diff --check
```

Generated files are deterministic. The experiment bundle has 50 primary people plus two excluded QA fixtures; charts and equations derive from records. Immutable experiment metrics and live sandbox metrics are displayed separately. Reset/reload erases live state, including identity, drafts, questions, reviews, wallet and sponsorship; it reloads the same snapshot.

## Evaluator artifacts

- [intent.md](intent.md) and [directive.md](directive.md) are review drafts; Loom/final access evidence remains pending.
- [Journey/rules](docs/journey-and-rules.md), [PRD](docs/prd.md), [five-task backlog](docs/backlog.md)
- [Dataset/equations](measurement/README.md), [email experiment](docs/experiment.md), [weekly decision memo](docs/weekly-decision-memo.md)
- [Verification evidence](evidence/verification.md)

## Boundaries and provenance

The owner’s pre-existing internal exploratory wireframe informed the visual language, bounded previews, escaping and optional-wallet recovery patterns. The canonical identity, qualification/revision/follow-up logic, dataset, measurement modules, tests and these assessment documents were authored for the approved MVP. No private internal planning records, AI instruction files or Obsidian settings were copied here.

There is no real authentication, KYC, global uniqueness/bot detection, blockchain, gas processing, production analytics, durable database or email delivery. Synthetic reviewer judgment is not proof of actual value. Native certificate printing and comprehensive cross-browser/accessibility testing require separate manual confirmation. No new commits, pushes, merges, public deployment, participant contact, access grants or Quest submission are authorized by this build.
