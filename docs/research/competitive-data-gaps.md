# Competitive data gaps — what we still lack for the site

Research synthesis date: 2026-08-12 (revised same day to hard-gate every item
against README / CONTRIBUTING / site disclaimers). Tracking issue: [#8](https://github.com/ChindanaiNaKub/thai-health-compare/issues/8).
Sources:
[`competitor-landscape.md`](./competitor-landscape.md),
[`round4-gap-analysis.md`](./round4-gap-analysis.md), round-5 follow-ups, and a
machine count of `data/plans/` (40 real plans, excluding `_example-*`).

**Verdict:** Brokers do not publish a public, source-cited table. Closing gaps
here means publishing **more published facts with citations**, never advice,
rankings, or a path to buy. Incomplete age-band and host premiums on rows we
already list are the main factual holes. Competitor *categories* (CI/cancer,
child, dental, English) are optional scope decisions — and only if they can be
stated the same way everything else is: numbers, limits, sources, blanks left
blank.

---

## 0. Hard rules (read before acting on any gap)

Taken from [README](../../README.md), [CONTRIBUTING](../../CONTRIBUTING.md),
[DESIGN](../../DESIGN.md), the footer on every page, and `/method`. These are
not style tips; they are the legal and editorial envelope of the project.

| Rule | Implication for gap-filling |
|---|---|
| **Not a broker. Not OIC-licensed. Nothing here is advice.** | Never add “เหมาะกับ…”, “ควรซื้อ…”, scores, stars, “best for you”, or a default sort that implies a winner. Sorting is the reader picking a column. |
| **No affiliate links. No lead capture. No commission.** | Never add buy buttons, LINE/agent CTAs, quote forms, partner deep-links, or “contact us for a plan”. Inclusion of an insurer is not endorsement (README). |
| **Only facts and arithmetic you can check against cited sources.** | Every new figure needs `premium_source` / `terms_source` with URL, tier, `verified_on`. Lifetime totals are sums of **published** bands, labelled as arithmetic — not a quote. |
| **Coverage terms / exclusions / waiting periods → filed wording only.** | Brochures and agent pages may not fill those fields. Prefer leaving exclusions empty over copying ad copy. |
| **Premiums: never estimate or interpolate.** | Missing band → incomplete lifetime, or `premium: null` + Thai `premium_unknown_reason`. Host premium unknown → say so; do not invent a floor. |
| **Stale prices hide themselves** (`verified_on`, 18 months). | Do not bump dates without re-opening sources. Do not paste broker “indicative ranges”. |
| **Thai copy: state facts; never “ดีที่สุด” / “คุ้มที่สุด”.** | Research docs and UI copy about gaps must not rank insurers or plans. |
| **Scope: individual plans / health riders; no group/employer.** | Rabbit Care’s corporate line stays out. |
| **Blank is better than a lie.** | Showing “ไม่เปิดเผย” with a reason is correct; filling a hole to “match” a competitor is not. |

**Allowed when closing a gap:** published age-band tables, host minimums as
floors with caveats, IPD/OPD limits with `ipd_limit_basis`, filed exclusions,
waiting periods, renewal ceilings — each with a primary URL.

**Forbidden when closing a gap:** recommendations, comparative verdicts, tax
savings per plan (method page: that becomes personal advice), hospital “you
will pay X” scenarios framed as guidance, lead funnels, scores, estimated
premiums, brochure-as-contract.

---

## 1. What competitors show — filtered by the rules above

| Competitor asset | Who has it | Status here | Under our rules |
|---|---|---|---|
| Standalone **CI / cancer** comparison | Rabbit Care, Roojai, TQM | Out of scope today (lump-sum on diagnosis ≠ medical-expense `ipd_*`) | Only if schema can record it as a **fact type of its own**, with sources, and UI copy that does not mix it with IPD as if they were the same product. No “better than health insurance” framing. |
| **Child / newborn** medical-expense plans | Rabbit Care | No dedicated line yet | Allowed **if** primary age-band + terms exist. Same table treatment; inclusion ≠ endorsement. |
| **English** mirror | CheckDi, Pacific Prime | Thai-only | Allowed as a translation of the same facts + same disclaimers (`ไม่ใช่นายหน้า`, no advice). Not a marketing locale. |
| **Dental** standalone | Broker showcases | Falcon i-Dental not on live Falcon site | No primary-source product → **do not add**. |
| **Standalone OPD** | Market pages | MTL OPD riders: no insurer-published premium | **Blocked** until a primary (or dual-sourced) rate table exists. Do not use a single agent PDF. |
| **Maternity** priced line | Broker education | `muangthailife-maternity-plus-plan1.yaml` added | Further plans OK under CONTRIBUTING. State limits and premiums; do not say who “needs” maternity cover. |
| **Flexible / build-your-own** (Sunday) | Sunday | Not in `data/plans/` | Add only published modular prices as facts. Do not copy “only pay for what you need” sales voice. |
| **Hospital-cost scenarios** | CheckDi | Not in schema/UI | **Out for now.** Easy to read as advice (“you should budget X”). Educational copy belongs on `/method` as methodology, not as a personal cost forecast. |
| **Group / corporate** | Rabbit Care | Excluded by README | **Do not add.** |
| Lead forms / “best for you” | Every broker | Rejected by design | **Do not add.** |

Closing gaps = more citable rows and fewer blank cells. It is not feature-parity
with commission sites.

This document is a research brief, not a decision to expand the product scope.
Each candidate still needs its own primary-source review and an explicit
taxonomy decision before it can become a plan record or a UI feature.

---

## 2. Factual holes inside plans already listed

Competitors hide these behind “starting from” or a contact form. We leave them
visible as gaps — correct under the rules — but the public record is still thin.

Counts from `data/plans/*.yaml` (40 plans, 2026-08-12):

| Gap | Count | Why it is a *data* gap (not a sales gap) |
|---|---|---|
| Incomplete age-band premium (lifetime partial) | **26 / 37** with any premium | Lifetime total is arithmetic over published bands; missing bands → incomplete, never guessed |
| Full lifetime bands | **11 / 40** | Same |
| Riders with published **host** premium | **3 / 18** | Split bar only when both sides are published; else show unknown |
| Terms from **filed wording** | **8 / 40** | CONTRIBUTING requires this for contract terms |
| Empty **exclusions** | **19 / 40** | Prefer empty over brochure lists unless filed |
| Null **OPD** annual limit | **24 / 40** | Show null / unknown; do not infer from marketing tags |
| Null **IPD** limit | **7 / 40** | Same |
| No premium at all | **3 / 40** | Keep `premium_unknown_reason`; do not invent |

**Work that stays inside the rules** (priority for research, not a product ranking):

1. Enter **full published** age-band tables where the insurer (or dual-sourced
   agent table per CONTRIBUTING) actually prints them.
2. Enter **host** premiums only when published; otherwise keep the Thai reason.
3. Move `terms_source` to **filed wording** and fill exclusions / waiting periods
   from that document only.

Do not fill blanks to look denser than a broker page.

---

## 3. Insurer / product candidates (still facts-only)

### Still open (actionable under CONTRIBUTING)

| Priority | Target | Why it is a factual gap | Gate |
|---|---|---|---|
| High | **Tokio Marine Life — Tokio Good Health Prime** | Major rider; brochure recovered | Need second source for premiums + reachable filed wording. No entry on agent PDF alone. |
| High | **Sunday / Roojai** medical-expense products | Individually buyable; absent from corpus | Primary rate tables required. CI only after schema can state lump-sum honestly. No buy CTA. |
| Medium | **เทเวศประกันภัย (Deves)** health line | Never fully screened | Browser pass; include only if premium + terms meet tiers. |
| Medium | **Child / newborn** medical-expense | Category competitors list | Same sourcing bar; no “for parents” advice copy. |
| Medium | More **maternity** endorsements | Category proven once | Per-insurer; facts only. |
| Low | **MTL OPD** riders | Near-miss OPD without IPD host | Blocked until primary premium. |
| Low | Small life licences / Thai Cardif | Catalogue completeness | No invented products; dead domains stay closed. |

### Closed / not a live gap

| Former lead | Outcome |
|---|---|
| SCB Life | Merged into FWD (2020); bank-channel products are FWD-underwritten |
| Falcon i-Dental | Not on live Falcon site |
| Synmunkong / Southeast Insurance (non-life) / Thai Insurance PCL | Dead domain or licence revoked |
| Prudential / AXA / Bangkok Insurance / Chubb Life health | No publishable age-linked premium |
| Standalone mental health | No publishable product found |
| Thanachart Life (licence 1020) | Identity unresolved — do not invent |

---

## 4. Work order (facts only)

1. **Deepen existing rows** — published age bands, published host premiums, filed
   exclusions (section 2).
2. **Add missing individual medical-expense plans** when primary sources exist
   (Sunday/Roojai IPD/OPD, Tokio Marine if dual-sourced, Deves if confirmable).
3. **Optional scope** — CI schema, child line, English mirror — only with the
   same disclaimers and no recommendation language (section 0–1).
4. **Never** — group plans, lead forms, scores, indicative unbanded prices,
   estimated premiums, tax-savings-per-plan, hospital-cost “advice” blocks,
   affiliate or buy links.

Site copy already states the legal position (footer + home + `/method`). New
data must not contradict it.

---

## 5. One-line summary

We lack **published figures** (full bands, host premiums, filed terms) more than
we lack broker features. Fill only what insurers published; leave the rest blank;
recommend nothing.
