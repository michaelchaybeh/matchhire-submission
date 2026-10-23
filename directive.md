# Final working directive — Asset Market Cap participation capability

These consolidated instructions and the evaluator appendix were written during and after implementation. The current product specification and five-task restructuring are retrospective revisions, not claims about requirements written before the prototype. This local documentation revision does not submit the Quest or authorize further implementation.

## Objective and approved product direction

I retain **disclosure engagement → qualified inquiries** as the selected bottleneck. Asset Market Cap is the asset-information platform; Suncrest Protocol is the fictional project disclosure used in the demonstration. The reusable capability connects a referenced question to reasoned review and an operational next action. Views, raw questions and transactions cannot substitute for contribution quality. My alternatives, unchanged scores and evidence interpretation are in [intent](intent.md).

D1–D8 establish platform identity, public reading versus approved submission, wallet/KYC-free qualification, distinct product/email metrics, operating ownership, secondary acknowledgement, preserved simplified seeds and accurate authorship. The PRD primarily defines intended product behavior. Public anonymous reading, production authority/identity and other pilot controls are not implied by the existing persona flow.

## Scope, source documents and boundaries

- [PRD](docs/prd.md): numbered intended requirements, acceptance, assumptions and prototype mapping.
- [Journey/rules](docs/journey-and-rules.md): permissions, qualification, identity/fairness, operations, appeals and sponsorship policy.
- [Measurement](measurement/README.md): entities, existing/prospective schema, denominators, cutoff/corrections, formulas and preserved synthetic totals.
- [Exactly five product tasks](docs/backlog.md): retrospective delivery structure and evidence/status, without recruitment packaging as a task.
- [One email experiment](docs/experiment.md): prospective assigned-invitee decision metric and viewer diagnostic, not an executed campaign.
- [Weekly operating memo](docs/weekly-decision-memo.md): simulation-based decision, role-owned next steps and pre-validation checkpoint.

P1–P3 are provisional planning assumptions: +5pp product qualified-viewer improvement over a separately observed baseline; 14 days of participation plus 7 days of review maturation; proposed review/follow-up/response expectations. They are not forecasts, achieved SLAs, staffing commitments or pilot authorization. The proposed two sponsored successes per canonical person per 30 days and one per inquiry across revisions requires further approval; budget, KYC method/vendor, retry allowance and funding are unset.

Preserve synthetic personas, deterministic records and historical evidence. No source/data/test/image changes or fixture regeneration are part of this revision. No commit, push, merge, branch creation, deployment, sending, real transaction, payment, permission change, private-record incorporation or Quest submission is authorized. These boundaries also apply if a check passes.

## Existing prototype completion criteria

These describe local demonstration behavior, not all intended pilot requirements:

- **Eligibility and identity:** John/Maya/Avery can submit; waiting Sam can read but cannot submit or enter eligible conversion. Returning John retains one canonical person/records; Avery stays distinct on a shared browser. Sign-out clears active selection while retaining in-tab records/drafts.
- **Wallet-free inquiry:** save referenced full text before wallet choice; reject blank, missing-topic, over-2,000-UTF-16-unit and normalized same-person duplicate attempts; preserve drafts and confirm explicit meaningful discard.
- **Review and revision:** live qualification requires material/actionable/not-spam checks, appropriate reason and specific note. Wallet/KYC and sentiment are independent. Revision returns to pending; prior versions/reviews/attempts remain. Seeded snapshot review evidence is simplified and does not demonstrate full live checklist/history completeness.
- **Follow-up and navigation:** owner/action/status simulate an operating next step; selected owned-question return preserves records, and missing/different-owner targets show a safe explanation. No actual response or appeal is delivered.
- **Acknowledgement/recovery:** refusal, close, Escape, connection failure and acknowledgement failure retain the inquiry. Retry attempts are independent; final off-chain choice ends retry for that version. Receipts require matching current-version success with no fabricated transaction evidence.
- **Session sponsorship:** two successful sponsored acknowledgements per verified canonical person/session, one per distinct question; failures consume no successful allowance and no fees occur. Self-funded routes are simulated. This is separate from pending persistent policy; failed real transactions may spend gas.
- **Dialogs:** named active dialogs retain appropriate focus, Tab/Shift+Tab wrapping and safe Escape/close restoration under the recorded correction evidence.
- **Measurement/evidence:** record-derived distinct eligible people, QA/window/cohort exclusions and N/A; fixed snapshot never changes with live actions. Preserve three required edge cases, raw records, live histories, evaluator labels and actual output. The dashboard's synthetic viewer comparison is unchanged; it does not implement prospective assignment or reporting freezes.

## Results / Evaluator Handoff Appendix

### Build identity, artifacts and local launch

The prototype/evidence baseline is **`36d19a0875a44a78121bdad469817f4e1f9d725e`**, [immutable commit reference](https://github.com/michaelchaybeh/matchhire-submission/commit/36d19a0875a44a78121bdad469817f4e1f9d725e), on [review/product-experience-20261020](https://github.com/michaelchaybeh/matchhire-submission/tree/review/product-experience-20261020). The earlier independently accepted build is [8c70b012b3e1a8b6498797142bcb4af81ed65b4b](https://github.com/michaelchaybeh/matchhire-submission/commit/8c70b012b3e1a8b6498797142bcb4af81ed65b4b). These private links do **not** establish intended-reviewer access or current remote parity.

The known baseline identifies unchanged application/evidence separately from later local documentation revisions. This revision remains uncommitted unless separately authorized; it does not invent a new release SHA or depend on an unavailable accompanying report to identify the prototype. See the dated documentation checkpoint in [verification](evidence/verification.md) for checks actually performed.

- [Prototype entry](prototype/index.html), [application](prototype/app.js), [domain rules](prototype/domain.mjs), [local launch/replays](README.md).
- [PRD](docs/prd.md), [journey/rules](docs/journey-and-rules.md), [five-task backlog](docs/backlog.md).
- [Full dataset](data/experiment.synthetic.json), [participants CSV](data/participants.synthetic.csv), [questions CSV](data/questions.synthetic.csv), [measurement contract/equations](measurement/README.md), [saved calculations](evidence/calculations.json).
- [Channel experiment](docs/experiment.md), [weekly memo](docs/weekly-decision-memo.md), [selection/research/provenance](intent.md).
- [Historical verification](evidence/verification.md), [original actual test output](evidence/tests.txt), [actual correction-pass output](evidence/final-corrections-tests.txt), [correction regressions](tests/handoff.test.mjs).

From the submission root run `python server.py`, then open http://127.0.0.1:8770/prototype/ in a **new tab**. There are no dependencies or build step. Reuse an existing server; preserve another person's walkthrough without reset/refresh. Module/data requests require HTTP, not direct file opening. There is no public production deployment.

### Three mandatory edge-case replays

1. **Wallet refusal:** choose John primary → Review Project Disclosure → save a referenced question → Continue off-chain. Verify it remains. In Reviewer Queue, supply all three criteria, reason and note to qualify without wallet/KYC; assign owner/action/status separately.
2. **Duplicate participant:** select John's returning alias. Verify the same canonical person, questions and wallet state, with no increase in registered people/eligible viewers. Avery remains a different person on this browser.
3. **Acknowledgement failure:** save another question → Explore optional acknowledgement → for John, Continue without KYC → expand Evaluator Tool / Reviewer test scenarios. Choose connection failure, then success/retry. Choose acknowledgement failure and record; the inquiry/failed attempt remain. A retry may succeed as a separate attempt with matching receipt. Alternatively final Continue off-chain removes retry/certificate for that question/version.

### Actual historical results and preserved synthetic outcomes

The **20 October 2026** independent acceptance on the preceding baseline recorded 109 passing regression tests, 17 syntax checks and 22 HTTP/asset/blocked-path checks. It identified BODY focus after wallet content replacement and return to the newest rather than selected question. The correction pass added 15 regressions and recorded **124 passed, 0 failed, 0 skipped**, **18 JavaScript syntax checks**, and **19 HTTP/assets + 3 blocked-path checks**. Recorded native browser checks covered focus/wrapping, KYC/sponsorship transitions, failures/retries, Escape/restoration, exact selected/revised question return, isolation and returning John. These are historical results with dated scope, not newly executed behavioral checks.

The original **19 October 2026** record contains 42 passing tests and the floating-point representation correction. Its dates, outputs, screenshots and boundaries remain historical. New documentation checks are separately appended; no old output or screenshot is rewritten as current UI evidence.

The unchanged synthetic snapshot contains 50 invitations (25/arm), 40 eligible viewers (20/arm), 20 distinct submitters, 21 accepted nonduplicate questions, 12 qualified questions and 11 qualified people. Viewer conversion is `4/20 = 20%`, `7/20 = 35%`, pooled `11/40 = 27.5%`; viewer-based differences are +15pp and +75% relative. Invitation-stage illustration is `4/25 = 16%`, `7/25 = 28%`, pooled 22%. Three demo acknowledgement attempts have two successes, one failure and one sponsored success; **zero actual blockchain transactions**. Live QA is separate. These are chosen fixtures, not an observed baseline, randomized email result, significance finding, forecast or validated uplift.

### Product judgment, AI contribution and provenance

My current revision decisions retain the selected bottleneck/scores and establish the approved D1–D8 direction and provisional P1–P3 assumptions. Product policy, documentation structure and pilot readiness are distinct from implementation and final submission acceptance.

Codex contributed research/source checking, implementation/domain/measurement logic, labeled synthetic records/tests, drafting and the historically recorded automated/native-browser verification and corrections. This pass revises documentation and records its actual scoped checks. Synthetic reviewer actions are test judgments, not AI grading of real people. Additional ChatGPT involvement beyond recorded work requires confirmation.

Recorded pre-existing-work attribution credits an exploratory wireframe with visual, bounded-preview/escaping and optional-wallet recovery patterns; canonical identity, qualification/revision/follow-up, equations, tests and assessment artifacts are attributed to the MVP work. No private records are imported by this revision.

Technical revision history includes correct question-specific certificates, final off-chain decisions after failure, participant/sign-out/evaluator refinements, deterministic dialog focus and exact selected-question return with 15 added regressions. The earlier numeric-representation failure and passing rerun remain in evidence. The **personal ownership/timing** previously attributed to candidate walkthroughs, approvals, score reasoning and specific refinements, together with the exact pre-existing/AI split, **requires candidate confirmation**. Those historical assertions are not newly certified by rewriting them in first person. No interview or prior-instruction chronology is fabricated.

### Limitations and unfinished submission evidence

Anonymous public browsing, real authentication/approval/revocation, reviewer authorization, appeals, durable storage, production bot detection/global uniqueness, KYC, wallet/chain integration, gas/payment and campaign sending are unimplemented. Refresh/closure clears live state. Follow-up fields and synthetic review do not establish actual usefulness, delivered responses or achieved SLAs. Full event idempotency, historical reporting and budget controls are prospective requirements.

Actual screen-reader operation, exhaustive cross-browser/physical-device accessibility and native certificate printing remain unverified. Historical DOM/native-browser checks cover their stated scope only. Pilot identity/access/retention, authority/appeals, sample/uncertainty criteria, business calendar/capacity and sponsorship funding/policy remain unresolved.

The required submission package has **exactly three items**: (1) **Loom ≤5 minutes**, (2) **intent.md**, (3) **final directive.md**. All linked materials are supporting evidence, not additional top-level submissions.

- **Loom:** outstanding; candidate must record and supply a verified URL covering selection, result, important revision/check, AI role, personal decisions and limits. No duration is claimed verified.
- **Actual focused human effort:** outstanding; candidate must report actual effort. Estimates and the tab's Demo Session timer are not measured total effort.
- **Intended-reviewer access:** outstanding; candidate must separately authorize any sharing and verify each final link as the intended reviewer. Owner authentication and local file existence are insufficient.
- **Submission metadata/destination:** candidate-controlled details remain outstanding. No assessment cutoff/timezone is invented and no new deadline-confirmation workflow is introduced.
- **Final personal acceptance and submission authorization:** outstanding. Documentation approval, passing checks and this directive do not constitute submission or permission changes.

No commit, push, merge, publication, deployment, external contact, access grant, actual transaction or Quest submission is part of this documentation revision. The Quest threshold is 76/100; no official score or hiring outcome is assigned here.
