# Competitive data gaps — what we still lack for the site

Research synthesis date: 2026-08-12. Sources: live competitor pass in
[`competitor-landscape.md`](./competitor-landscape.md), insurer gap pass in
[`round4-gap-analysis.md`](./round4-gap-analysis.md), round-5 follow-ups (SCB Life,
maternity, OPD/mental health, Falcon/Tokio Marine, non-life screening, minor life
licences), and a machine count of the current `data/plans/` corpus (40 real plans,
excluding `_example-*`).

**Verdict:** we already occupy the only empty niche — public, browsable, source-cited
plan data with no lead capture. Competitors do not beat us on transparency. What they
*show* that we do not is mostly **product categories** (CI/cancer, child, dental) and
**UX language** (English). What hurts us more day-to-day is **incomplete figures inside
records we already list** — especially full age-band premiums and host-policy premiums —
because that is the math the site exists to show.

---

## 1. What competitors show that we do not

| Competitor asset | Who has it | Status in this repo | Put on the site? |
|---|---|---|---|
| Standalone **critical-illness / cancer** comparison | Rabbit Care, Roojai, TQM tiles, InsureDD-adjacent market | Intentionally out of scope: CI pays a diagnosis lump sum; schema has no honest `ipd_*` home for it (`round4` §3c) | Only after a schema/scope decision |
| **Child / newborn** health line | Rabbit Care `/health-insurance/child` | No dedicated child product line | Worth a dedicated search; not yet done |
| **English** mirror | CheckDi, Pacific Prime | Thai-only (`lang="th"`) | Yes if the goal is “please copy / translate” (README), not broker parity |
| **Dental** as its own product | Broker showcases; Falcon i-Dental was the only primary lead | Falcon i-Dental confirmed absent from live Falcon site (`round5-falcon-tokiomarine-recheck`) | No publishable primary-source product today |
| **Standalone OPD** | Market pages / InsureDD tags | MTL OPD riders exist without an IPD host, but fail the sourcing bar (no insurer-published premium) (`round5-mentalhealth-opd-search`) | Blocked until a second, primary rate table appears |
| **Maternity** as its own priced line | Broker education content | **Closed:** `muangthailife-maternity-plus-plan1.yaml` added in round 5 | Done for one product; more insurers unsearched |
| **Flexible / build-your-own** cover | Sunday (easysunday) | No Sunday or Roojai plan in `data/plans/`; `shape` enum has no “modular” value | Treat as a *data candidate* (their own products), not a broker UX to copy |
| **Hospital-cost scenarios** next to premiums | CheckDi | Not in schema or UI | Optional education layer; does not replace sourced plan rows |
| **Group / corporate** health | Rabbit Care | Explicitly excluded (README) | Do not add |
| Lead forms / “best for you” | Every broker | Deliberately rejected | Do not add |

**Bottom line vs brokers:** do not copy their funnel. Close gaps only where we can cite a
primary source the way CONTRIBUTING requires.

---

## 2. Data we lack *inside* plans already on the site

These are the numbers competitors paper over with “starting from” or a contact form. We
show the hole instead — which is correct — but the table is still thin where it matters.

Counts from `data/plans/*.yaml` (40 plans, 2026-08-12):

| Gap | Count | Why it matters on-site |
|---|---|---|
| Incomplete age-band premium (lifetime cost partial) | **26 / 37** plans that have any premium | Lifetime-cost column is the differentiator vs “เบี้ยเริ่มต้น” brokers |
| Full lifetime bands present | only **11 / 40** | Same |
| Riders with **host** premium published | only **3 / 18** | Premium-split bar cannot render without both sides |
| Terms from **filed wording** | only **8 / 40** | Brochure-sourced terms are weaker trust than the project’s own rule |
| Empty **exclusions** list | **19 / 40** | Expandable panel has nothing to cite |
| Null **OPD** annual limit | **24 / 40** | Brokers advertise IPD+OPD tags; we often cannot show OPD |
| Null **IPD** limit | **7 / 40** | Core compare column blank |
| No premium at all | **3 / 40** (Allianz Basic Care, Falcon Health O-X, Thai Life Fit Ultra) | Sort/filter “hide unpublished premium” drops them |

Highest leverage for “look more complete than brokers” without changing scope:

1. Finish **full age-band tables** wherever an insurer already published them (or re-fetch
   calculators that return per-age quotes).
2. Chase **host life premiums** for the 15 riders still blank — Ocean Life OCHI is the
   proof that the split bar works when both sides exist.
3. Replace brochure `terms_source` with **filed wording** and fill **exclusions** /
   waiting periods from that wording.

That work makes existing rows stronger. It is more valuable than adding another
unpriced insurer name.

---

## 3. Product / insurer candidates still worth chasing

Updated after round 5 closed several round-4 “never checked” items.

### Still open (actionable)

| Priority | Target | Why | Blocker |
|---|---|---|---|
| High | **Tokio Marine Life — Tokio Good Health Prime** | Premium brochure recovered; major life rider still not in dataset | Agent-hosted rates lack a second source; filed wording behind WAF (`round5-falcon-tokiomarine-recheck`) |
| High | **Sunday** and **Roojai** own IPD/OPD (and CI) products | Competitors *as substitutes*; individually buyable; absent from `data/plans/` | Need primary rate tables + scope call on CI and modular `shape` |
| Medium | **เทเวศประกันภัย (Deves)** health line | Only live never-screened non-life of the round-4 four | Product catalogue does not render to fetch tooling (`round5-nonlife-screening`) — needs a real browser |
| Medium | **Child / newborn** medical-expense plans | Rabbit Care treats as its own line | Dedicated search not started |
| Medium | More **maternity** endorsements beyond MTL | Category now proven publishable | Per-insurer search |
| Low | **Muang Thai Life OPD** riders (no IPD required) | Only near-miss standalone-OPD | No insurer-published premium; agent table uncorroborated |
| Low | Remaining small life licences / Thai Cardif | Catalogue completeness | Domains dead or no retail health product (`round5-minor-life-licences`) |

### Closed / not a live gap

| Former lead | Outcome |
|---|---|
| SCB Life | Merged into FWD (2020); SCB bank products are FWD-underwritten (`round5-scblife-sourcing`) |
| Falcon i-Dental | Not on live Falcon site |
| Synmunkong / Southeast Insurance (non-life) / Thai Insurance PCL | Dead domain or licence revoked |
| Prudential / AXA / Bangkok Insurance / Chubb Life health | Rechecked: still no publishable age-linked premium |
| Standalone mental health | No publishable product found |
| Thanachart Life (licence 1020) | Identity unresolved; do not invent a product |

---

## 4. Recommended order of work for the site

1. **Deepen existing rows** — full age bands, host premiums, filed exclusions (section 2).
   This is the data gap readers feel when they open a plan and see blanks.
2. **Add DTC insurtech rows** — Sunday / Roojai medical-expense plans if primary rates
   exist (section 3).
3. **Decide scope** — CI/cancer schema, child line, English mirror (section 1). These are
   competitor *category* gaps, not failures of the current 40-plan medical-expense corpus.
4. **Do not** add group plans, lead forms, scores, or indicative “starting from” prices
   without age bands.

---

## 5. One-line summary for maintainers

Competitors lack our public sourced table; we lack their CI/child/dental *categories* and,
more urgently, complete **lifetime** and **host** premiums on plans we already publish.
