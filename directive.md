# Final directive — Asset Market Cap participation capability

Demonstrate how Asset Market Cap can turn disclosure engagement into qualified inquiries with reasoned review and an accountable next action. This directive sets out the delivery boundaries, prototype completion criteria and evaluator handoff. The product requirements and five-task backlog were refined after implementation.

## Objective and product direction

I selected **disclosure engagement → qualified inquiries** as the bottleneck. Asset Market Cap is the asset-information platform; Suncrest Protocol is the fictional project disclosure used in the demonstration. The reusable capability connects a referenced question to reasoned review and an operational next action. Views, raw questions and transactions cannot substitute for contribution quality. My alternatives, prioritization scores and evidence interpretation are in [intent](intent.md).

The product model combines public disclosure reading with permissioned submission and wallet/KYC-independent qualification. Product viewer conversion and email assigned-invitee conversion serve different decisions. Operations owns the response path; acknowledgement remains optional and secondary. The PRD defines intended product behavior, while the existing persona flow demonstrates selected mechanics with simplified synthetic records. Public anonymous reading, production identity and authority controls remain unimplemented.

## Scope, source documents and boundaries

- [PRD](docs/prd.md): numbered intended requirements, acceptance, assumptions and prototype mapping.
- [Journey/rules](docs/journey-and-rules.md): permissions, qualification, identity/fairness, operations, appeals and sponsorship policy.
- [Measurement](measurement/README.md): entities, existing/prospective schema, denominators, cutoff/corrections, formulas and synthetic totals.
- [Exactly five product tasks](docs/backlog.md): priorities, acceptance criteria and implementation evidence/status.
- [One email experiment](docs/experiment.md): prospective assigned-invitee decision metric and viewer diagnostic, not an executed campaign.
- [Weekly operating memo](docs/weekly-decision-memo.md): simulation-based decision, role-owned next steps and pilot-readiness checkpoint.

The provisional planning assumptions are: +5pp product qualified-viewer improvement over a separately observed baseline; 14 days of participation plus 7 days of review maturation; proposed review/follow-up/response expectations. They are not forecasts, achieved SLAs, staffing commitments or pilot authorization. The proposed allowance of two sponsored successes per canonical person per 30 days and one per inquiry across revisions remains pending; budget, KYC method/vendor, retry allowance and funding are unset.

The delivery is a local synthetic prototype. Production integrations, campaign delivery, funding and recruitment depend on separate pilot decisions. The historical records provide technical evidence; they do not establish pilot readiness.

## Existing prototype completion criteria

These describe local demonstration behavior, not all intended pilot requirements:

- **Eligibility and identity:** John/Maya/Avery can submit; waiting Sam can read but cannot submit or enter eligible conversion. Returning John retains one canonical person/records; Avery stays distinct on a shared browser. Sign-out clears active selection while retaining in-tab records/drafts.
- **Wallet-free inquiry:** save referenced full text before wallet choice; reject blank, missing-topic, over-2,000-UTF-16-unit and normalized same-person duplicate attempts; preserve drafts and confirm explicit meaningful discard.
- **Review and revision:** live qualification requires material/actionable/not-spam checks, appropriate reason and specific note. Wallet/KYC and sentiment are independent. Revision returns to pending; prior versions/reviews/attempts remain. Seeded snapshot review evidence is simplified and does not demonstrate full live checklist/history completeness.
- **Follow-up and navigation:** owner/action/status simulate an operating next step; selected owned-question return preserves records, and missing/different-owner targets show a safe explanation. No actual response or appeal is delivered.
- **Acknowledgement/recovery:** refusal, close, Escape, connection failure and acknowledgement failure retain the inquiry. Retry attempts are independent; final off-chain choice ends retry for that version. Receipts require matching current-version success with no fabricated transaction evidence.
- **Session sponsorship:** two successful sponsored acknowledgements per verified canonical person/session, one per distinct question; failures consume no successful allowance and no fees occur. Self-funded routes are simulated. This is separate from pending persistent policy; failed real transactions may spend gas.
- **Dialogs:** named active dialogs retain appropriate focus, Tab/Shift+Tab wrapping and safe Escape/close restoration under the recorded correction evidence.
- **Measurement/evidence:** record-derived distinct eligible people, QA/window/cohort exclusions and N/A; fixed snapshot never changes with live actions. Provide the three required edge cases, raw records, live histories, evaluator labels and actual output. The dashboard's synthetic viewer comparison is unchanged; it does not implement prospective assignment or reporting freezes.

## Results / Evaluator Handoff Appendix

### Build identity, artifacts and local launch

The prototype/evidence baseline is **`36d19a0875a44a78121bdad469817f4e1f9d725e`**, [immutable commit reference](https://github.com/michaelchaybeh/matchhire-submission/commit/36d19a0875a44a78121bdad469817f4e1f9d725e), on [review/product-experience-20261020](https://github.com/michaelchaybeh/matchhire-submission/tree/review/product-experience-20261020). The earlier independently accepted build is [8c70b012b3e1a8b6498797142bcb4af81ed65b4b](https://github.com/michaelchaybeh/matchhire-submission/commit/8c70b012b3e1a8b6498797142bcb4af81ed65b4b). These private links do **not** establish intended-reviewer access or current remote parity.

The 23 October 2026 product documentation revision is recorded in commit **`eed42b0ded60c35f615ff3e89463d7fa72411cdc`** (24 October 2026, KST). The prototype/evidence baseline above identifies the application to reproduce; the later documentation commit does not represent a new application release. The dated documentation checkpoint in [verification](evidence/verification.md) records the checks performed before that commit.

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

### Historical verification and synthetic outcomes

The **20 October 2026** independent acceptance on the preceding baseline recorded 109 passing regression tests, 17 syntax checks and 22 HTTP/asset/blocked-path checks. It identified BODY focus after wallet content replacement and return to the newest rather than selected question. The correction pass added 15 regressions and recorded **124 passed, 0 failed, 0 skipped**, **18 JavaScript syntax checks**, and **19 HTTP/assets + 3 blocked-path checks**. Recorded native browser checks covered focus/wrapping, KYC/sponsorship transitions, failures/retries, Escape/restoration, exact selected/revised question return, isolation and returning John. These are historical results with dated scope, not newly executed behavioral checks.

The original **19 October 2026** record contains 42 passing tests and the floating-point representation correction. Its dates, outputs, screenshots and boundaries remain historical. The 23 October documentation checks are recorded separately in the same verification record.

The unchanged synthetic snapshot contains 50 invitations (25/arm), 40 eligible viewers (20/arm), 20 distinct submitters, 21 accepted nonduplicate questions, 12 qualified questions and 11 qualified people. Viewer conversion is `4/20 = 20%`, `7/20 = 35%`, pooled `11/40 = 27.5%`; viewer-based differences are +15pp and +75% relative. Invitation-stage illustration is `4/25 = 16%`, `7/25 = 28%`, pooled 22%. Three demo acknowledgement attempts have two successes, one failure and one sponsored success; **zero actual blockchain transactions**. Live QA is separate. These are chosen fixtures, not an observed baseline, randomized email result, significance finding, forecast or validated uplift.

### Product judgment, AI contribution and provenance

My product rationale is to prioritize useful, person-based participation with public reading, permissioned submission, consistent qualification and an accountable response path. The prioritization scores and provisional assumptions are documented in [intent](intent.md) and the [PRD](docs/prd.md).

I directed and approved the product decisions and the ChatGPT–Codex workflow, and retained responsibility for product direction, prioritization and approval of the work. No work in that workflow proceeded without my approval. I personally reviewed and approved all four alternatives and their prioritization scores on 19 October 2026.

ChatGPT and Codex assisted with research, drafting, implementation and technical verification. Codex's recorded contributions include source checking, domain/measurement logic, labeled synthetic records/tests and the historical automated/native-browser verification and corrections. Synthetic reviewer actions are test judgments, not AI grading of real people.

Recorded pre-existing-work attribution credits an exploratory wireframe with visual, bounded-preview/escaping and optional-wallet recovery patterns; canonical identity, qualification/revision/follow-up, equations, tests and assessment artifacts are attributed to the MVP work.

Technical revision history includes correct question-specific certificates, final off-chain decisions after failure, participant/sign-out/evaluator refinements, deterministic dialog focus and exact selected-question return with 15 added regressions. The earlier numeric-representation failure and passing rerun remain in evidence. The repository records these implementation changes and technical outcomes. The remaining details to confirm are:

- Details of personal walkthroughs and hands-on contributions to certificate/off-chain, account and evaluator refinements attributed in the historical handoff.
- The fine-grained split between pre-existing work, my hands-on contributions and AI assistance.

No interviews or real-user validation are recorded.

### Limitations, submission status and unverified evidence

Anonymous public browsing, real authentication/approval/revocation, reviewer authorization, appeals, durable storage, production bot detection/global uniqueness, KYC, wallet/chain integration, gas/payment and campaign sending are unimplemented. Refresh/closure clears live state. Follow-up fields and synthetic review do not establish actual usefulness, delivered responses or achieved SLAs. Full event idempotency, historical reporting and budget controls are prospective requirements.

Actual screen-reader operation, exhaustive cross-browser/physical-device accessibility and native certificate printing remain unverified. Historical DOM/native-browser checks cover their stated scope only. Pilot identity/access/retention, authority/appeals, sample/uncertainty criteria, business calendar/capacity and sponsorship funding/policy remain unresolved.

The required submission package has **exactly three items**: (1) **Loom ≤5 minutes**, (2) **intent.md**, (3) **final directive.md**. All linked materials are supporting evidence, not additional top-level submissions.

**Owner-confirmed status:** the Quest has been submitted, including the three required links. This post-submission QA corrects the repository handoff; it does not alter the submitted Loom or assessment portal. Earlier dated statements in the verification record describe readiness at those historical checkpoints, not current submission status.

- **Loom:** its link was submitted according to the owner. The URL, playback/reviewer access and actual video duration have not been independently verified in this QA. The required maximum remains five minutes; no URL or measured duration is invented.
- **Actual focused human effort:** not independently established. Estimates and the tab's Demo Session timer are not measured total effort; no working-hours claim is added.
- **Intended-reviewer access:** not independently verified. This repository remains private; the intended reviewer needs appropriate read permission to open private links or clone it. Owner authentication and local file existence do not establish reviewer access. This QA does not change collaborators or visibility.
- **Portal evidence and submission details:** submission of the three links is owner-confirmed; no portal receipt, acceptance confirmation, submission timestamp or destination is independently established here.
- **Post-submission corrections:** the focused repository corrections are separate from the already-submitted video and portal. Final review of those corrections does not make the original submission unfinished or imply a hiring outcome.

The Quest threshold is 76/100. This handoff does not assign an official score or hiring outcome.
