# Final working directive — Suncrest participation loop

These are the final working instructions for the implemented local prototype and evaluator handoff. They were consolidated during and after the work, not represented as instructions written before implementation. External submission evidence remains explicitly unfinished below; the Quest has not been submitted.

## Objective

Prioritize **disclosure engagement → qualified questions**. Connect an invited person's referenced inquiry to a material, actionable question, a reasoned review and an operational next action. Give participants context, a saved contribution, visible disposition and wallet-free participation. Views, raw activity and transactions are not substitutes for contribution quality.

The recorded alternatives, prioritization scores, evidence, value and non-goals remain in [intent.md](intent.md).

## Scope and requirements

Deliver a small local operating loop: predefined synthetic registration and invitation, fictional referenced disclosure, saved off-chain question, independent synthetic reviewer adjudication, clarification/revision, follow-up, and optional demo acknowledgement with safe recovery.

Preserve canonical identity across returning aliases and isolate distinct people using the same browser. Separate invitation from KYC, questions from qualified inquiries, review from wallet decisions, acknowledgement attempts from real transactions, and immutable experiment records from live QA. Opening a disclosure never proves reading. Use current adjudication and matching eligible-person/cohort/time filters in numerator and denominator.

Follow the [PRD](docs/prd.md), [participant journey and rules](docs/journey-and-rules.md), [exactly five prioritized tasks T1–T5](docs/backlog.md), [one channel experiment](docs/experiment.md) and [weekly operating decision](docs/weekly-decision-memo.md). This directive adds no sixth implementation task or production scope.

Use synthetic personas and deterministic local records only. No external sending, actual transactions, payment, public deployment, production infrastructure or confidential materials. Passing tests does not authorize new scope, merge, access grants or Quest submission.

## Verifiable completion criteria

- **Eligible participation:** invited John, Maya and Avery can submit; waiting Sam can read but cannot submit or enter the eligible-viewer denominator. Invitation and synthetic KYC remain independent.
- **Canonical identity:** returning John recovers the same person and records; repeated aliases, openings and multiple questions do not add people. Avery stays distinct on a shared browser. Sign Out clears only active selection and preserves in-tab records/drafts.
- **Wallet-free questions:** save referenced full text before any wallet choice. Reject blanks, missing topic, more than 2,000 UTF-16 units and normalized exact duplicates. Preserve drafts and require confirmation for explicit discard.
- **Qualification/adjudication:** require material/actionable/not-spam confirmation, an appropriate reason and a specific reviewer note. Critical sentiment, wallet connection and KYC are not qualification criteria. Pending, excluded and clarification states do not count as qualified.
- **Revision/follow-up:** preserve prior versions and decisions; revisions return to pending fresh review. Qualified questions support owner, next action and operational status independently of acknowledgement. Reviewer return opens the selected owned question and current records; missing/differently owned questions show a safe explanation.
- **Optional acknowledgement/recovery:** refusal, close, Escape and failure retain the question. Connection retry and acknowledgement attempts remain independent. Explicit off-chain completion after failure is final for that version. Certificate previews require the matching successful current-version demo attempt and invent no transaction evidence.
- **Capped sponsorship:** verified participants receive at most two successful sponsored acknowledgements per canonical person/session, one per distinct question. Failures consume nothing. Unverified, exhausted and already-sponsored-question routes retain off-chain or simulated self-funded participation, without invented fee estimates.
- **Accessible dialogs:** content transitions focus an appropriate heading/control inside the named active dialog; Tab/Shift+Tab wrap visible enabled controls; Escape preserves the existing off-chain rule. Closing restores a surviving origin or the resulting main view when the initiating control has been replaced.
- **Accurate measurement:** derive distinct eligible qualified-person conversion from canonical records. Separate invitation, submission, qualification, demo attempts and real transactions. Apply membership/cohort/window/QA exclusions; empty denominators are N/A. Live QA never changes the fixed snapshot.
- **Evidence/reproducibility:** retain raw records, version/review/attempt histories, evaluator labels, record-derived pending badges, local launch steps, formulas, five-task backlog and actual verification output. Demonstrate all three mandatory edge cases and state verification limits honestly.

## Results / Evaluator Handoff Appendix

### Build identity, artifacts and local launch

Use the [latest private review branch](https://github.com/michaelchaybeh/matchhire-submission/tree/review/product-experience-20261020). This is a private review link, **not verified hiring-team access**. The [previous accepted baseline](https://github.com/michaelchaybeh/matchhire-submission/commit/8c70b012b3e1a8b6498797142bcb4af81ed65b4b) identifies the build independently tested before the final two corrections.

The correction commit containing this directive and dated verification is independently identified by the full SHA and immutable GitHub commit permalink in the accompanying completion report after commit/push and remote verification. This avoids a self-referential current HEAD SHA and does not imply Product Owner acceptance of a new commit before handoff review. The branch link alone does not pin a future branch state.

- [Prototype entry](prototype/index.html), [application source](prototype/app.js) and [domain rules](prototype/domain.mjs).
- [Local launch and replay instructions](README.md).
- [PRD](docs/prd.md), [five-task backlog](docs/backlog.md), [journey/rules](docs/journey-and-rules.md).
- [Full synthetic dataset](data/experiment.synthetic.json), [participants CSV](data/participants.synthetic.csv), [questions CSV](data/questions.synthetic.csv), [measurement formulas and export contract](measurement/README.md).
- [Channel experiment](docs/experiment.md), [weekly decision memo](docs/weekly-decision-memo.md).
- [Historical/current verification](evidence/verification.md), [actual correction-pass output](evidence/final-corrections-tests.txt), [targeted correction regressions](tests/handoff.test.mjs).
- [Problem selection, external context and provenance](intent.md).

The prototype runs locally with no dependencies or build step. From the repository root run:

    python server.py

Open http://127.0.0.1:8770/prototype/ in a **new tab**. Reuse an already running server; do not reset/refresh another person's walkthrough. Direct file opening cannot load module/data requests. There is no public production URL or deployment.

### Three mandatory edge-case replays

1. **Wallet refusal:** choose John primary → Review Project Disclosure → ask a referenced question → Submit question → Continue off-chain. Verify the saved question. In Reviewer Queue, supply all three criteria, reason and note to qualify without wallet/KYC; assign owner/action/status separately.
2. **Returning duplicate participant:** switch to John's returning alias. Verify the same canonical person, questions and wallet state; registered people and unique eligible viewers do not increase. Avery is a distinct person using this browser.
3. **Failed acknowledgement/recovery:** save another question → Explore optional acknowledgement → for unverified John, Continue without KYC → expand Evaluator Tool / Reviewer test scenarios. Choose connection Failure, connect, then Success and Retry connection. Choose acknowledgement Failure and record; verify the question and failed attempt remain. Retry may succeed as another attempt with its matching demo preview. Alternatively Continue off-chain finalizes the failure and removes retry/certificate for that question/version.

### Actual results

Independent acceptance on the previous baseline ran **109 regression tests**, **17 syntax checks** and **22 HTTP/asset/blocked-path checks**, with core workflows and reconciliation passing. It found two minor defects: focus moved to BODY after wallet content replacement; reviewer return opened the newest question instead of the selected one.

The correction pass added 15 regressions: **124 passed, 0 failed, 0 skipped**; **18 JavaScript syntax checks** passed; **19 HTTP/assets + 3 blocked-path checks** passed. Reconciliation, Markdown artifact links and whitespace passed. Native desktop/mobile verification covered dialog focus/wrapping, KYC/sponsorship transitions, connection/acknowledgement failure/retry, Escape/restoration, exact oldest/middle/newest/revised question return, account isolation and returning John. The dated verification and actual output provide scope and limits.

All experiment results are **illustrative synthetic fixtures**: 50 invitations (25/arm), 40 eligible viewers (20/arm), 11 distinct qualified participants; control 4/20 = 20%, variant 7/20 = 35%, pooled 11/40 = 27.5%; absolute +15 percentage points and relative +75%. Invitation-stage conversion is 16%/28%. Twelve qualified questions come from eleven people. Real blockchain transactions are zero. Live QA records are separate. No observed campaign result, significance, validated uplift or real-world adoption is claimed.

### AI collaboration, revisions and provenance

**Product Owner decisions:** selected/prioritized the problem; approved journeys, scope and business rules; established qualification, eligibility and sponsorship policy; conducted hands-on walkthroughs; identified usability issues; approved refinements and final acceptance criteria. Handoff approval and submission remain the owner's decisions.

**Codex contributions:** implemented application/domain/measurement logic; generated labelled synthetic fixtures and tests; produced/refined documents; executed automated and native-browser verification; corrected defects. Synthetic reviewer actions are explicit test judgments, not AI grading of real people.

**Pre-existing work:** the owner's exploratory wireframe supplied reusable visual, bounded-preview/escaping and optional-wallet recovery patterns. The canonical model, qualification/revision/follow-up logic, experiment calculations, tests and assessment artifacts were authored for this MVP. No private coordination records or vault settings were copied into the submission.

Genuine owner-directed revisions include restricting certificate previews to the correct successfully acknowledged question, finalizing explicit off-chain decisions after failure, and refining participant selection/sign-out and evaluator separation after hands-on walkthroughs. The final acceptance findings led to deterministic dialog focus and exact selected-question return, with 15 new regressions. The earlier numerical-representation correction and actual passing reruns remain in the historical verification. These are revisions made during the work, not fabricated prior instructions or user research.

### Limitations and unfinished submission evidence

No real authentication, KYC, live blockchain connection, gas/payment processing, durable storage, production bot detection/global uniqueness, real incentives or campaign sending exists. Refresh/closure clears the tab's live state. Synthetic review does not prove real-world usefulness or reviewer quality. Actual screen-reader operation, exhaustive cross-browser/physical-device accessibility and native certificate printing remain unverified; DOM semantics and representative browser widths were checked.

The required package contains **exactly three items**: (1) Loom ≤5 minutes, (2) intent.md, (3) this final directive.md. Linked supporting artifacts are not additional required top-level submissions.

- **Final Loom URL:** OWNER TO RECORD / INSERT VERIFIED LINK. Explain selection, result, an important revision/check, AI role, personal decisions and limits.
- **Actual focused candidate effort, including documentation/Loom:** OWNER TO RECORD. Suggested effort and the Demo Session timer are not measured total human effort.
- **Reviewer-access verification:** OWNER TO AUTHORIZE REQUIRED SHARING AND VERIFY EVERY FINAL LINK AS THE INTENDED REVIEWER. Owner authentication/private links do not prove hiring-team access.
- **Candidate-controlled invitation/submission details:** OWNER TO PROVIDE REQUIRED INVITATION METADATA AND FINAL DESTINATION. Exact invitation cutoff/timezone is not supplied here. Follow the Product Owner's planned schedule; this handoff introduces no separate deadline-confirmation workflow.
- **Final handoff approval and Quest submission authorization:** STILL REQUIRED. Product checks and this directive do not constitute submission, access authorization or a hiring decision.

No merge, public publication, deployment, outreach, real transaction or Quest submission occurred in this correction pass. The Quest threshold is 76/100; this handoff assigns no score and guarantees no hiring outcome.
