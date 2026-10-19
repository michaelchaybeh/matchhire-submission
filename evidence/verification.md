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
