# Prioritized implementation backlog — exactly five tasks

| Priority / task | Deliverable | Acceptance criteria | Main evidence |
|---|---|---|---|
| P0 · T1 | Synthetic registration, invitation and disclosure | Alias registration resolves to canonical ID; second alias does not add a person; another person on the same browser remains distinct; waiting fixture cannot submit; disclosure sections have stable IDs and views do not assert reading. | `prototype/domain.mjs`, registration/disclosure tests |
| P0 · T2 | Guided inquiry, qualification and follow-up | Save referenced full text without wallet/KYC; preserve/discard drafts appropriately; reject blank/oversize/exact duplicate; reviewer records criteria, reason, note and history; critical short inquiry can qualify; clarification resets qualification; qualified inquiry has owner/action/status. | Reviewer queue, domain tests |
| P0 · T3 | Optional acknowledgement and recovery | Save before modal; refusal/connect failure/ack failure retain question; retry attempts independent; off-chain after failure final; two sponsored successes per verified canonical person and one per question; certificate only for successful current-version demo, no TXID. | Modal, attempt histories, sponsorship/certificate tests |
| P1 · T4 | Synthetic experiment records and measurement | 50 eligible invites, 40 eligible viewers, 4/20 vs 7/20 qualified people derive from records; aliases/repeated views/multiple questions deduplicate; QA/live records excluded; JSON/CSV/formulas reconcile; attempts and zero real TXs distinct. | `data/`, `measurement/`, metric tests |
| P1 · T5 | Reproducible evaluator handoff and operating decision | Journey/rules, PRD, one email experiment and one weekly memo linked; actual checks and corrections recorded; exactly three eventual submission items identified; unavailable Loom/access/deadline evidence stays explicit. | README, intent/directive drafts, evidence |

No extra production, blockchain or identity-integration tasks are hidden in this backlog.
