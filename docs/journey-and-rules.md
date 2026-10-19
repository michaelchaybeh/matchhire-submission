# Participant journey and rules

All entities, aliases, identities, review outcomes and transaction outcomes in this prototype are synthetic.

1. Choose a predefined alias and join the local waitlist. John’s returning alias maps to the same canonical person. Avery is a different fixture on the same browser: shared devices alone are not grounds for exclusion.
2. Confirm invitation status. John, Maya and Avery are invited; Sam is waiting and cannot submit or enter eligible conversion. Synthetic KYC is separate. This is a fixture policy, not real identity verification.
3. Open Suncrest’s fictional disclosure. Sections `pilot`, `reporting`, `verification` and `risk` give stable references. Opening records a view, never verified reading, comprehension or intent.
4. Reference a section and ask an answerable question about a claim, assumption, risk or missing evidence. Save full text before any wallet choice. Maximum 2,000 UTF-16 units; empty/whitespace and normalized exact duplicates are rejected without another ID. Case and collapsed whitespace determine exact duplication. A conservative token-overlap flag requests review only; it is not AI grading or a quality decision.
5. Optionally connect a demo wallet and record an acknowledgement. Refusal, close or Escape continues off-chain with the question intact. Connection failure allows recovery. A failed acknowledgement retains the question and independent attempts; retry may succeed. Explicit off-chain choice after failure is final for that version, and retry disappears.
6. A synthetic reviewer sets `pending_review`, `qualified`, `needs_clarification` or `excluded`, documenting reason, section, note, reviewer fixture and ISO timestamp. Qualification requires confirmation of a material topic, actionable inquiry and no spam/duplicate/abuse. KYC, wallet, supportive tone and minimum word count are not criteria. A precise critical question such as “Which audit?” can qualify. A generic promotion or repeated letters can be excluded with reasons, never auto-qualified.
7. Needs-clarification questions can be revised by their participant. The old text/review/acknowledgement remains in history; the new version returns to pending review and requires explicit qualification. A new optional acknowledgement applies to the new version; earlier attempts remain versioned. One question cannot receive a second sponsorship by being revised.
8. Qualified questions get a synthetic follow-up owner, next action and status (`unassigned`, `triaged`, `response_pending`, `addressed`). These are simulated operating actions, not delivered responses. No real SLA performance is claimed.
9. Ask another question or finish. Wallet connection is maintained per canonical fixture. Multiple useful questions remain visible but count once per person in the primary numerator. A certificate is available only for a successful current-version demo acknowledgement, labelled with the correct question/version and no TXID or explorer link.

## Eligibility, exclusions and incentive logic

An approved invitation provides access; KYC is not needed for participation or review. Immediate saved reference, visible review status and follow-up are nonfinancial incentives. No tokens, money, yield, ownership or future reward is offered.

Exclude spam, gibberish, deliberate abuse, irrelevant promotion and duplicates from qualification using a documented reviewer reason. “Needs clarification” and “pending review” are neither qualified results nor automatic failures. Review changes preserve history and recalculate from current adjudication. Critical sentiment alone is never an exclusion reason.

Canonical fixture aliases demonstrate duplicate-person resolution, not global human uniqueness. No IP/device fingerprint, real identity check or bot detector exists. In a permissioned future pilot, rate limits, appeals and human duplicate review would need separate validation. No real person should be rejected merely for sharing a device. Similar phrasing alone does not establish a bot or duplicate person.

Option C would sponsor at most two successful acknowledgements per verified canonical participant per session, one per distinct question. Failures do not consume allowance. Unverified participants, exhausted allowance and already-sponsored questions would require participant-funded network fees on a real chain. This prototype processes no fees. Off-chain remains available and uses the same qualification rules.

## Measurement boundary

The experiment snapshot is deterministic and read-only. Mutable live-demo QA fixtures are shown separately and never appended to it. Reset/reload erases the live sandbox. Question submission, unique submitters, qualification, qualified people, demo attempts and real transactions are distinct measures. See [equations](../measurement/README.md).
