# Verification record — 19 October 2026

All checks concern local synthetic fixtures. No real-user or campaign result is asserted.

## Automated results

- `node --test tests/domain.test.mjs tests/metrics.test.mjs tests/artifacts.test.mjs`: **42 passed, 0 failed, 0 skipped**. [Actual complete output](tests.txt). Covers the three mandatory edge cases, explicit qualification/review changes, critical short questions, exclusion, clarification, follow-up, duplicates, canonical aliases, draft/length rules, sponsorship and version-specific certificates, dataset membership/window filters and local artifact links.
- `node --check` passed for all eight application/measurement/test JavaScript modules listed in the [README](../README.md).
- `node measurement/generate-fixtures.mjs` ran twice after final data changes; SHA-256 hashes of all eleven generated JSON/CSV outputs matched.
- `node measurement/verify.mjs`: exact record-derived output in [calculations.json](calculations.json). Control 4/20=20%; variant 7/20=35%; pooled 11/40=27.5%; +15pp; +75% relative. Invitation-stage 16%/28%.
- `server.py --check`: **8 HTTP asset checks + 3 blocked-path checks passed** (root redirect resolves to prototype, modules, data and handoff; hidden Git paths/directory listing rejected). Executed outside the socket-restricted sandbox.
- `git diff --check` run locally in both repositories. This check covers tracked diffs; new source files are independently covered by syntax/tests/link checks. No files are staged.

## Browser walkthrough — actual in-app browser, default narrow viewport

- Registration, invitation and fictional referenced disclosure: passed. Waiting Sam could view but could not submit or raise the eligible-viewer count.
- Mandatory wallet refusal: John saved a critical short question, continued off-chain and qualified without KYC/wallet. Missing reviewer checklist was rejected; explicit criteria/reason/note then qualified. Synthetic owner/next action/response-pending status saved.
- Mandatory duplicate participant: John’s returning alias preserved L-JOHN, existing questions, one registered canonical person and one eligible viewer. [Captured evidence](browser-duplicate.jpg).
- Mandatory failed acknowledgement: connection failure/recovery and acknowledgement failure retained LQ002. Retry succeeded with independent attempts and a correctly referenced demo certificate. LQ003 failure followed by explicit off-chain completion had no retry/certificate; final completion offered only LQ002’s certificate. [Final off-chain evidence](browser-offchain-final.jpg).
- Review demotion changed live conversion from 100% to 0%; needs-clarification revision retained text through backward navigation and produced version 2 pending fresh review.
- Maya’s two sponsored successes exhausted allowance; the next question displayed self-funded policy and could continue off-chain. No fees occurred.
- Normalized exact duplicate rejected with LQ004 reference. A 2,000-character question displayed escaped script-like text with no script element and a full-text region of 180px (scrollable).
- Explicit exit from a repeat empty form added one abandonment, without another disclosure-open event.
- After live QA, immutable snapshot still showed 20%, 35%, 27.5%, +15pp/+75% and zero real TXs, separate from live 0/2 conversion and six accepted questions. [Dashboard evidence](browser-dashboard.jpg).
- Actual browser reload cleared live identity/questions/wallet/reviews and restored N/A; snapshot stayed 11/40. Reset was separately exercised after the final code change.
- Final connection/attempt record used canonical ID L-JOHN and separate wallet ID DEMO-WALLET-L-JOHN; real_transaction=false. No JavaScript console errors observed. No horizontal overflow observed at the 479px default viewport.

## Reproduced corrections

An initial metric test failed: pooled percentage serialized as `27.500000000000004` instead of `27.5`. Changing the ratio from `count / denominator * 100` to `count * 100 / denominator` restored exact finite outputs. Nonterminating fractions use numerical tolerance. Canonical counts remained 11/40; this was a representation defect, not campaign evidence. The passing rerun is in tests.txt.

Inspection identified that an empty repeat-question form required a new active path for explicit abandonment. The repeat action now begins a path without inventing a disclosure view. Both automated and actual-browser checks passed.

Fixture review also aligned excluded/clarification examples with their stated reasons: irrelevant generic promotion is excluded; vague requests need clarification; precise critical questions qualify. No outcome counts were changed to obtain the approved percentages.

## Limits and final checkpoints

No real user, interview, email, payment or chain action was tested. Synthetic review judgments and alias mappings do not establish real review quality, global uniqueness or production abuse resistance. Desktop-specific layout, exhaustive keyboard/screen-reader/cross-browser accessibility and native certificate print output remain unverified.

Human focused effort was not timed; the planning estimate is not actual effort. Loom, exact acceptance/deadline/timezone, final reviewer access and final Quest submission remain owner checkpoints. No deployed or transaction links are fabricated. Preview server started for this walkthrough was stopped after checks.

Final boundary verification: both repository HEADs and branches are unchanged; nothing is staged, committed, pushed, merged, synchronized or deployed. Internal changes are AGENTS.md plus four approved vault documents; submission changes are README.md plus 36 new assessment files. Pre-existing internal prototype files are unchanged. All three source/vault copies match SHA-256. Obsidian’s ignored workspace.json changed during the session; this task did not write it, and no other pre-existing vault settings/files changed. Existing source Downloads were preserved.

## 20 October 2026 (KST) — Subsequent private review checkpoint

The original implementation verification recorded above preceded creation of the GitHub review commits. Its test results and pre-commit boundary statements remain a historical record of that earlier checkpoint.

At the subsequent, separately authorized GitHub review checkpoint:

- Submission branch `review/qualified-participation-mvp` was pushed privately at commit `72d934bdd64afb75619f491a0972fbc1c10383e1`.
- Internal documentation branch `review/mvp-documentation-20261019` was pushed privately at commit `1c86852d97d783f616986a51289ab078cb65b31a`.
- Both `main` branches remained unchanged at that checkpoint.
- No merge, deployment or assessment submission occurred.

This dated clarification does not replace or rerun the original verification. The 20 October 2026 documentation correction pass checked document links and Git diff whitespace only; it did not rerun the application regression suite, module syntax checks, data reconciliation, HTTP checks or browser walkthrough. The corrections were local and uncommitted when those checks ran and were subsequently committed and pushed to the private `review/mvp-final-documentation-20261020` branch under separate Product Owner authorization.

## 20 October 2026 (KST) — Final acceptance and correction pass

### Baseline and chronology

Previous accepted baseline: [8c70b012b3e1a8b6498797142bcb4af81ed65b4b](https://github.com/michaelchaybeh/matchhire-submission/commit/8c70b012b3e1a8b6498797142bcb4af81ed65b4b), on the [private product-experience review branch](https://github.com/michaelchaybeh/matchhire-submission/tree/review/product-experience-20261020). Local/remote parity and clean submission/internal worktrees were confirmed before corrections.

The preceding independent acceptance was a verification-only pass: **109 automated tests passed, 0 failed, 0 skipped; 17 JavaScript syntax checks passed; 19 HTTP/assets plus 3 blocked-path checks passed (22 total)**. Core workflows, responsive examples and immutable reconciliation passed. Its real-browser checks found the two minor defects below; no blocker or major product defect was identified. That pass changed no repository files and made no commits/pushes.

The original 19 October results and earlier review checkpoint above remain historical evidence. Their counts, limitations and boundary statements have not been rewritten as results from this corrected build. The acceptance details summarized here come from the actual acceptance report, not a newly claimed user study.

### Reproduced defects and corrections

1. **Wallet dialog focus:** choose verified Maya, submit a question, then Explore optional acknowledgement. Replacing the open dialog content left focus on BODY. The correction focuses the active dialog heading deterministically on entry/stage changes, preserves a still-available focused control during wallet rerenders, wraps Tab/Shift+Tab among visible enabled controls, and restores a surviving origin on close. When the initiating form/control has been replaced, the resulting main view receives focus. No arbitrary focus timeout or dialog dependency was added; the existing simulated connection delay is unchanged.
2. **Wrong reviewer return target:** create several questions for Maya, select an older one in Reviewer Queue, then Return to participant question. The accepted baseline opened the newest owned question (acceptance example: LQ004 selected, LQ007 shown). The correction binds return to the selected question ID and resolves it against current canonical state and active ownership. It preserves text/version/review/acknowledgement/follow-up, creates no submission/view/navigation event and does not silently substitute a newest question. Missing or differently owned targets show a safe explanation without switching the active person.

### Actual correction-pass automated verification

[Complete actual test, syntax, reconciliation and HTTP output](final-corrections-tests.txt). Reproduction commands, including the new test file, are in the [README](../README.md).

- Full suite: **124 passed, 0 failed, 0 skipped**, comprising all 109 existing tests and 15 added [handoff regressions](../tests/handoff.test.mjs). Existing assertions were retained.
- Syntax: **18 JavaScript files passed**, including all application, measurement and test modules.
- Reconciliation: passed all existing record/export checks. Fifty invitations, 40 eligible viewers, 11 qualified people; control 20%, variant 35%, pooled 27.5%, +15 percentage points, +75% relative illustration; zero real transactions.
- HTTP: **19 successful resource checks + 3 blocked-path checks passed** using an ephemeral loopback test server; the running walkthrough server was not stopped or reset.
- Markdown artifact-link validation: passed through the full suite, including this report, the final directive and linked actual output.
- Git diff whitespace: checked during the correction pass and again before committing, including staged additions.
- Core domain module, measurement modules, fixture/export files and historical evidence artifacts were not altered. The generator was not rerun because no fixture rewrite was needed.

The automated focus tests cover initial entry, replacement, KYC/back/sponsorship, connection failure/retry/success, preserving an available focused control on async completion, acknowledgement failure/retry, Tab/Shift+Tab, Escape and explicit close in every acknowledgement stage, and restoration. The DOM adapter tests app-controlled focus decisions; native browser tests below verify actual browser navigation.

Return tests cover one question, multiple questions, oldest/middle/newest, revision and current review/follow-up, account switching/isolation, returning John, missing targets and signed-out access. They compare full state and live metrics before/after navigation.

### Native browser verification after corrections

A fresh agent-created tab reused the existing localhost server. The Product Owner's session was not accessed, refreshed or reset.

- At 1440px, initial offer and replaced wallet content focused ack-title inside the active modal. Tab from the heading reached Close; Shift+Tab from Close reached Continue off-chain; Tab from the last control wrapped to Close without BODY focus.
- Connection failure/retry and connection success focused inside the replaced wallet content. Acknowledgement failure returned focus to main; Retry acknowledgement focused the wallet heading; success returned to the receipt/main. Separate failure/success attempts remained intact; failure consumed no sponsorship.
- Unverified John's sponsorship, KYC, return-to-sponsorship and Continue without KYC focused sponsorship-title, kyc-title, sponsorship-title and ack-title respectively. Verification state and fee policy stayed unchanged.
- Native Escape from the offer and wallet followed the existing off-chain rule, retained the question and focused the resulting main view.
- For Maya's three questions, selected LQ001, LQ002 and LQ003 each returned to its own text. The oldest retained qualification, successful demo acknowledgement and triaged follow-up; the middle retained off-chain status. Full raw state was identical across each return.
- Clarification of LQ002 produced version 2 and pending fresh review. Returning from the queue showed that revised text with no mutation. A John-active return to Maya's LQ001 showed an ownership explanation, no question view and unchanged records. John's returning alias returned to his own LQ004 with L-JOHN preserved.
- At 320px, wallet controls remained inside the dialog, Shift+Tab worked and no horizontal overflow/missing images appeared. At 390px, dashboard natural scrolling and Measurement worked without horizontal overflow. Desktop rendering and evaluator navigation remained functional.
- Live QA separately showed 1/2 = 50% qualified-person conversion from four accepted questions and three demo attempts; real transactions stayed zero. The fixed snapshot remained 20%/35%/27.5%/+15pp/+75%/zero real transactions. Reset in the agent test tab cleared its questions and returned the timer to 00:00:00.
- No captured browser console warnings/errors occurred. Temporary viewport overrides were reset.

### Limits and commit identification

Actual screen-reader operation, exhaustive cross-browser/physical-device accessibility and native certificate printing were not performed. The missing-question fallback was verified through automated app-handler tests; the product has no question-deletion UI for a native missing-target replay. Native Tab order/focus restoration supplement the simulated-DOM tests. No real wallet, KYC, fee, transaction, campaign, interview or observed adoption result is claimed.

The final directive now links the current private review branch, concrete local artifacts, current evidence and the previous accepted baseline. The Product Owner's prioritization and recorded scores in intent.md are unchanged; its provenance now acknowledges completed hands-on walkthroughs. Loom URL, actual focused human effort, verified reviewer access and candidate-controlled submission details remain explicit placeholders. The planned submission schedule continues; no separate deadline-confirmation workflow is introduced.

This dated record is committed with the two corrections. To avoid a self-referential HEAD, the **final correction SHA and immutable commit permalink are supplied independently in the completion report**, together with post-push remote parity and clean-worktree verification. The stable review-branch link above locates the committed record but is not proof of hiring-team access or final Product Owner approval.

No main/internal/other-branch changes, merge, deployment, outreach, access grant, real transaction or Quest submission are part of this correction pass.
