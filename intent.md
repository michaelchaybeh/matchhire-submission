# Why I chose disclosure engagement → qualified questions

I selected disclosure engagement → qualified questions as the bottleneck for Asset Market Cap's reusable disclosure-participation and qualified-inquiry capability. Suncrest Protocol is the fictional project used to demonstrate it.

An invited person can encounter a disclosure but remain unsure what to ask or what happens next. I want the participation loop to produce a specific material question, a reasoned review and an accountable next action. Views and wallet activity alone cannot establish that outcome.

## Alternatives and prioritization

My prioritization uses four criteria: user value, business conversion, ease of delivery and confidence. The original scores below are judgments on 1–5 scales, not observed product performance; a higher ease/effort score means easier delivery. The rationale explains my current prioritization. The timing and personal basis of the original scores remain unconfirmed, as noted in the [handoff](directive.md#product-judgment-ai-contribution-and-provenance).

| Bottleneck | User value | Business conversion | Ease/effort | Confidence | Total |
|---|---:|---:|---:|---:|---:|
| Disclosure engagement → qualified questions | 5 | 5 | 4 | 4 | 18/20 |
| Disclosure comprehension | 5 | 4 | 4 | 3 | 16/20 |
| Qualified-question follow-up | 5 | 5 | 3 | 3 | 16/20 |
| Waitlist reactivation | 4 | 4 | 4 | 3 | 15/20 |

| Alternative | Rationale for value, conversion, effort and confidence |
|---|---|
| Disclosure → qualified question | Connects participant uncertainty to an investigable contribution. A bounded save/review loop is feasible in a small prototype. Confidence 4 reflects a clear testable mechanism and inspectable behavior, not validated demand or uplift. |
| Comprehension | Understanding has high participant value, but opening a page cannot verify comprehension or its conversion effect. A simple explanatory intervention is feasible; measuring understanding needs validation, supporting lower confidence. |
| Follow-up | An answer path has high user/business value. Staffing, response authority and closure quality add operating effort and uncertainty. I include owner/action/status while avoiding a full support operation. |
| Reactivation | Could improve invitation reach with relatively modest interface work, but deliverability and whether returning people make useful contributions remain unobserved. It does not by itself resolve contribution quality. |

I prioritize disclosure engagement → qualified questions because it connects a visible participant action to a useful operating outcome and can be demonstrated in a small prototype. The alternatives may prove more valuable with evidence from real participants.

## People, value and hypothesis

Public readers need disclosure context without registration. Interested people need clear waitlist/approval status. Approved participants need wallet-free questions and visible disposition. Returning people need correct identity recovery; shared-device users need fair separation. Reviewers need sentiment-neutral criteria and evidence; operations needs deduplicated people, ownership and next actions.

My hypothesis is that section-specific guidance plus visible review/follow-up lowers uncertainty. A saved reference and reasoned disposition provide nonfinancial value without requiring wallet, KYC, positive sentiment or raw volume. An actionable inquiry and response path remain leading indicators; synthetic qualification and a status field do not prove a valuable response was delivered.

Product conversion is distinct eligible disclosure viewers with ≥1 currently qualified inquiry / distinct eligible disclosure viewers. For a future email experiment, the primary decision metric instead uses eligible randomly assigned invitees; viewer conversion is diagnostic. Definitions are in [measurement](measurement/README.md) and [experiment](docs/experiment.md).

No observed conversion baseline exists. The 20% control, 35% variant and 27.5% pooled results are chosen synthetic examples. The [PRD](docs/prd.md#outcomes-and-provisional-planning-assumptions) documents a provisional +5pp product improvement target over a separately observed baseline, a proposed 14-day observation plus 7-day maturation period, and proposed response expectations. They are planning assumptions; evaluation still needs a separately observed baseline, sufficient capacity and an agreed measurement plan.

## External industry evidence

The recorded source check is dated 20 October 2026. I use these cases as supporting context; the record does not establish that they informed the original selection before implementation.

- **First-party case-study claims:** Galxe's [How daGama Built Seasonal Growth on Galxe](https://www.galxe.com/blog/how-dagama-built-seasonal-growth-on-galxe) (30 March 2026) reports 130K+ participations across seasonal campaigns, separately reports 8,177 participants and 4,370 contributors, and describes contribution analytics and anti-cheat controls. Gitcoin's [GG24 OSS QF on Giveth Retrospective](https://gitcoin.co/case-studies/gg24-oss-qf-giveth-retrospective) (27 November 2025) reports 3,042 donations from 1,286 unique donors and identifies clearer eligibility and standardized review guidance as operational improvements. These are the providers' accounts, not independently audited findings.
- **My interpretation:** these accounts distinguish actions from people/contributors and discuss integrity. They support examining identity, eligibility and useful contribution instead of assuming activity is value. Their program-specific rates/totals do not transfer to Asset Market Cap's capability or Suncrest's fictional disclosure.
- **Unvalidated hypothesis:** neither case study tests this MVP or proves it increases qualified inquiries.
- **Synthetic evidence:** 20%/35%/27.5%, +15 percentage points and +75% relative come from fixtures, not industry benchmarks, observed customers or forecasts derived from these sources.

## Product judgment, AI contributions and chronology

My product rationale centers on public access to disclosure, permissioned submission, wallet/KYC-independent qualification and person-based measurement. Optional acknowledgement supports the participation loop without determining contribution quality. The product requirements and five-task backlog were refined after the prototype was built.

Codex assisted with research/source checking, drafting, implementation, synthetic fixture/test generation and the historically recorded automated/browser verification and corrections. The verification record includes actual corrections and an earlier floating-point representation failure. I distinguish these technical checks from validation with real participants.

The recorded provenance credits a pre-existing exploratory wireframe with visual language, bounded preview/escaping and optional-wallet recovery patterns. It attributes canonical identity, qualification/revision/follow-up logic, records/equations, tests and assessment documents to this MVP. The exact contribution split, additional ChatGPT involvement, personal walkthroughs and ownership of specific decisions require my confirmation in the [handoff](directive.md#product-judgment-ai-contribution-and-provenance). The repository supports the technical history, but does not independently establish those personal claims.

## Scope and evidence limits

The current prototype has predefined people and per-tab memory; anonymous public browsing, real authentication/approval, global uniqueness/bot detection, appeals, KYC, wallet/chain integration, gas payment, production storage and campaign delivery are unimplemented. No interview, real-user validation or causal uplift is claimed. Public access and pilot controls are intended requirements. Replays, historical results and the three-item submission package are in the [handoff](directive.md).
