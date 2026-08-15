# Competitor landscape: Thai individual health insurance comparison

Research date: 2026-08-12. Method: live WebSearch + WebFetch against each site's
current pages (August 2026), not archived reviews. Every claim below carries the URL
it came from and, where the fetched page returned exact wording, a verbatim quote.
**No file under `data/` was modified.**

**Headline finding: every real comparison site found is a lead-generation broker.**
None publish a browsable table of premiums and coverage the way this repo does — they
collect an age/gender/budget from the visitor first, then either show a form-gated
"indicative range" or hand the lead to a human agent. The one site that shows a real
comparison **table** in-page (Rabbit Care) is still a licensed commission-earning
broker, not a neutral publisher. That gap — public, browsable, source-cited data with
no lead capture — is this project's entire competitive position, and it currently has
no competitor occupying it.

## Method note

- Several candidate URLs from the brief are dead or renamed: `frank.co.th` no longer
  resolves (`getaddrinfo ENOTFOUND`) — it rebranded to `bolttech.co.th` in January
  2021, per
  https://thailandinsurancenews.com/featured/%E0%B9%81%E0%B8%9F%E0%B8%A3%E0%B8%87%E0%B8%84%E0%B9%8C-%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99-%E0%B9%82/
  and confirmed live at https://www.bolttech.co.th/.
- `masii.co.th` no longer brokers insurance at all — its insurance book was sold, per
  its own site (see §7).
- Direct `WebFetch` of `rabbitcare.com` returned HTTP 403 (bot-blocked); its features
  below are reconstructed from Google's indexed snippets of its own live pages
  (`rabbitcare.com/health-insurance`, `/health-insurance/ipd-opd`,
  `/critical-illness-cancer`, `/corporate-insurance/...`), which is a weaker source
  than a direct fetch and should be re-verified with a browser session before citing
  numbers from it.
- "Anywhere.co.th / Anywhere Expert" from the brief was not found as an independent
  comparison site. Search only surfaces Allianz Ayudhya's own **product** called
  "แผนแคร์เอนีแวร์" (Care Anywhere, https://www.allianz.co.th/th_TH/health/lump-sum/care-anywhere.html)
  and the unrelated "Doctor Anywhere" telemedicine app
  (https://www.doctoranywhere.co.th/). Treated as not a real competitor.
- "iSure" from the brief returned no distinct Thai health-insurance platform in search
  results and is not included below as a verified competitor.

---

## 1. Rabbit Care — rabbitcare.com

**Business model:** licensed insurance broker under BTS Group. Its own tagline:
"Rabbit Care | โบรกเกอร์ประกันภัยออนไลน์ มีใบอนุญาตจาก OIC" (online insurance broker,
licensed by the OIC) — https://rabbitcare.com/en. Search snippets describe it as
comparing products "from 50+ partners."

**What it shows:** the only candidate found with an actual **in-page comparison
table**, not just a lead form — per indexed copy of its own pages: "Comparison
Tables: You can use comparison tables to view and compare actual plans from multiple
insurance companies on Rabbit Care, then select the most suitable plan." It segments
by product line with dedicated URLs:
- IPD+OPD general health: https://rabbitcare.com/health-insurance/ipd-opd
- Critical illness / cancer standalone: https://rabbitcare.com/critical-illness-cancer
- Child/newborn health: https://rabbitcare.com/health-insurance/child
- Corporate/group health: https://rabbitcare.com/corporate-insurance/rabbit-life-super-care-health-protect

**Gap vs. this repo:** no visible sourcing/citation per figure, no lifetime-cost
math, no rider-vs-host-policy split, no public-scheme baseline, and it earns
commission on every sale shown — the comparison table exists to convert, not to be
checked against a primary source.

**What it has that this repo doesn't:** standalone critical-illness/cancer product
comparison, a dedicated child/newborn health product line, and a group/corporate
insurance line (this repo explicitly excludes group plans, per README: "Group/employer
plans are excluded, because you cannot buy them individually").

## 2. TQM — tqm.co.th

**Business model:** insurance broker. Self-description: "TQM is a leading insurance
broker in Thailand... representing over 40 insurance companies... 24-hour hotline
1737." https://www.tqm.co.th/health-insurance and https://www.tqm.co.th/aboutus.

**What it shows:** a **lead-capture form**, not a browsable table. The health
insurance page asks for gender, date of birth, and preferred contact method, then
either has "a representative contact them or search for matching plans"
(https://www.tqm.co.th/health-insurance). Product categories are shown as three
visual tiles (general health, cancer, tax-deduction plans) with educational IPD/OPD
explainers and customer testimonials, but "lacks transparent, side-by-side premium and
coverage tables for direct comparison" on the fetched page. Does not disclose broker
license number or commission structure on this page.

**Gap vs. this repo:** no public price table at all — TQM's stated method is
"the system will display insurance premiums from multiple insurance companies for
comparison immediately" only after the visitor submits contact details, per its own
marketing copy found in search results.

## 3. InsureDD — insuredd.com

**Business model:** broker/aggregator, commission-based (not disclosed on-page, but
functions as one). https://insuredd.com/health-insurances/

**What it shows:** a **product showcase**, not an interactive table — 6 named plans
from Muang Thai, V Prestige Care (Viriyah), TIP Insure (Dhipaya), Bangkok Insurance,
Pacific Cross, and LMG, each with a starting premium (~15,000–19,900 THB/year), a max
coverage figure, an age-eligibility range, and an IPD/OPD tag, each linking to a
"View Plan" page. No filters, no sort, no ratings, no "best for you" logic. Contact
CTAs (LINE/phone) dominate.

**Gap vs. this repo:** premiums shown are entry-level "starting from" figures with no
full age-band table, no verified_on date, and no link to primary policy wording — the
opposite of this repo's per-record `premium_source`/`terms_source` citation pair.

## 4. CheckDi — checkdi.com/th/health

**Business model:** licensed broker, and the only site found that publishes its OIC
license numbers on the page itself: "OIC Non-Life Insurance Broker License No.
ว00012/2544 | OIC Life Insurance Broker License No. ช00010/2565" — comparing "30+ top
insurers," "฿0 Service fee, free." https://checkdi.com/th/health/main?lg=en

**What it shows:** educational premium **range** tables by tier (basic IPD ~5,000
THB to comprehensive 150,000+ THB/year) with an explicit disclaimer — "Indicative
ranges only. Actual premiums depend on plan/coverage, customer profile, and current
campaigns" — then funnels to a quote form at
`checkdi.com/th/health/quotes/quoteform?lg=en&p=health`. Has a working **English
language toggle** (`?lg=en`), which this repo does not.

**Gap vs. this repo:** ranges are indicative and unattributed to any single insurer's
filed rate table; no per-figure source URL or `verified_on` date; ultimately a lead
funnel behind the education layer.

**What it has that this repo doesn't:** English-language version; real hospital-cost
scenario content alongside the premium ranges; disclosed broker license numbers as a
trust signal (this repo instead states it is *not* OIC-licensed, in README: "Not a
broker. Not licensed by the OIC (คปภ.).").

## 5. SILKSPAN — silkspan.com

**Business model:** broker/aggregator, "500+ employees, earning through commissions
on policy sales across multiple insurers." Self-description: "Thailand's first and
leading online financial supermarket... partnered up with 9 banks and 30 Insurers."
https://www.silkspan.com/online/health-center/

**What it shows:** a lead-generation hub — 4 showcased plans (FWD, Thai Life) with
one-line benefit highlights (e.g. "room rate up to 3,000 baht/day"), tax-deduction
messaging, and phone/LINE contact channels. States it offers a
"บริการตรวจเช็กเบี้ยประกันสุขภาพ" (premium-checking service) but no comparison tool is
embedded on the page itself.

**Gap vs. this repo:** no comparison table, no filters, no sourcing.

## 6. Pacific Prime Thailand — pacificprime.co.th

**Business model:** international broker, "partner with more than 60 global
insurers," free quotation funded by insurer commission (standard broker model, not
explicitly disclosed as a percentage). https://www.pacificprime.co.th/compare-health-insurance/

**What it shows:** guided 5-step self-education content (assess medical needs →
budget → learn terminology → research insurer reputation → understand deductibles),
then a multi-step quote form that promises "a list of comprehensive details about the
most suitable plans for you" — personalized, not public. Has a **working English
toggle**.

**Gap vs. this repo:** nothing public to check figures against; oriented at expats
buying international/global cover rather than the domestic-insurer individual market
this repo tracks.

## 7. masii — masii.co.th (defunct as a health-insurance competitor)

**Status:** masii's insurance brokerage was sold. Its own site states: "ธุรกิจนายหน้า
ประกันของ masii ถูก Lockton Wattana Insurance Brokers หนึ่งในนายหน้าประกันรายใหญ่ที่สุด
เข้าซื้อกิจการ" (masii's insurance brokerage business was acquired by Lockton Wattana,
one of the largest insurance brokers, in 2567/2024) — https://masii.co.th/. It states
plainly: "Masii โฟกัสเฉพาะการเปรียบเทียบสินเชื่อส่วนบุคคลแล้ว" (masii now focuses
exclusively on personal loan comparison). Health/auto/travel/life insurance inquiries
are redirected to Lockton Wattana by phone. **Not a current competitor** — listed here
only to correct the brief's assumption that it's still operating as a comparison site.

## 8. noon.in.th

**Business model:** affiliate/lead-generation, not a broker of record on its own
pages. Tagline: "Insure With Accuracy - ค้นหาแบบประกันภัยที่ใช่ ตามไลฟ์สไตล์คุณ" (find
the right plan for your lifestyle). https://www.noon.in.th/

**What it shows:** a "เช็คแบบประกัน" (check insurance) matching tool that, per the
fetched page, "redirects users to 'BUY ONLINE' through LINE Shop with affiliate
parameters (`utm_source=affiliate&utm_medium=tqd`)" rather than displaying premiums or
a comparison table on the page itself. Its real asset is a large Thai-language
insurance-education blog (waiting periods, OPD-vs-IPD, new health standard,
rider-vs-standalone, mental health coverage) — topically adjacent to this repo's
explanatory copy but written to build affiliate trust rather than cite primary
sources. Example post directly on this repo's own differentiator:
"ประกันสุขภาพเดี่ยว กับประกันสุขภาพแบบสัญญาเพิ่มเติม ต่างกันอย่างไร"
(https://www.noon.in.th/blog/how-different-between-health-insurance-and-health-riders/)
— confirms standalone-vs-rider is a live point of confusion in the market, which is
this repo's core thesis, but noon explains it in prose with no per-plan data to check
it against.

**Gap vs. this repo:** zero public plan data; monetizes via affiliate redirect, the
exact model this repo's README defines itself against ("No affiliate links.").

## 9. Sunday Insurance — easysunday.com / Jolly by Sunday

**Not a comparison site — a direct insurtech insurer.** Confirmed: "Sunday is a
direct insurer, not a broker or comparison site... offers proprietary health and
motor insurance products sold directly through their platform." Self-description:
"Purchase individual health and other insurance solutions online directly from us,"
"full-stack insurtech company." https://easysunday.com/en/

**What it has that this repo doesn't:** instant online underwriting/purchase,
customizable coverage ("only pay for what you need instead of buying standardized,
pre-packaged products"), integrated telemedicine and medicine delivery, a claims app
("Jolly by Sunday" super-app, https://jollyinsure.com/th/superapp/?region=th").

**Relevance:** not a direct competitor for *comparison*, since Sunday only sells its
own product — but it is a substitute for a reader who wants to skip comparison
entirely and buy something flexible and app-native. Its OPD/IPD standalone,
build-your-own-coverage model is not represented anywhere in `data/plans/`.

## 10. Roojai — roojai.com

**Not a comparison site — a direct non-life insurer**, per its own Wikipedia entry
and marketing: "get quotes, customize coverage plans, submit claims online... purchase
online easily in just 3 minutes... 24 hours a day." Products include health,
critical-illness/cancer, and expat health insurance
(https://www.roojai.com/article/health-insurance-tips/critical-illness-vs-health-insurance/).

**Relevance:** same category as Sunday — a direct-to-consumer digital insurer, not a
comparison layer. Worth tracking as a *data source* (its own IPD/OPD and CI products
are individually purchasable and currently absent from `data/plans/`) rather than as
a competing publisher.

## 11. Bank/fintech apps — SCB Easy, MAKE by KBank, TrueMoney, LINE

**SCB Easy** sells insurance in-app, including "แผนประกันคุ้มครองกลุ่มโรคร้ายแรง"
(critical-illness group plans) — https://www.scb.co.th/th/personal-banking/insurance/easy-app-insurance.html
and https://www.scb.co.th/th/personal-banking/digital-banking/scb-easy/insurance-info/how-to-insurance.

**MAKE by KBank** sells "D Health Easy Care" life+health insurance in-app, covering
"โรคระบาด โรคร้ายแรง และอุบัติเหตุ" (epidemic disease, critical illness, accidents) —
https://makebykbank.kbtg.tech/en/insurance and a companion educational article at
https://makebykbank.kbtg.tech/en/articles/how-to-choose-health-insurance.

**Search turned up no equivalent in-app health-insurance comparison or purchase
feature for TrueMoney or LINE** specifically — both are payment/super-app platforms
in Thailand but did not surface a dedicated health-insurance shopping flow in this
search pass; treat as unconfirmed rather than ruled out.

**What these have that this repo doesn't:** one-tap purchase inside an app the
customer already uses daily, tied to their bank/payment identity (KYC pre-filled,
premium auto-debit). This is a distribution advantage, not a data-transparency one —
neither bank app publishes a cross-insurer comparison; each sells only the
products it has struck a deal for.

**Gap vs. this repo:** same as the standalone insurers above — single-issuer
in-app sales, no cross-insurer comparison, no public source citations.

---

## Where this repo is clearly ahead

Every competitor found above fits one of two categories, and neither overlaps with
what this repo does:

1. **Lead-generation brokers** (Rabbit Care, TQM, InsureDD, CheckDi, SILKSPAN, Pacific
   Prime, noon.in.th, masii-via-Lockton) — monetize through commission or affiliate
   redirect, gate real numbers behind a contact form or "indicative range," and have
   a structural incentive to surface the plans that pay best, not the plans that fit
   best. None publish a `verified_on` date or a primary-source URL per figure. None
   compute a lifetime cost across full age bands — the closest is CheckDi's disclaimed
   indicative range. **None split a rider premium from its host life-policy premium**
   — this is the one differentiator not one single competitor in this list attempts,
   despite noon.in.th's own blog post acknowledging that standalone-vs-rider
   confusion is a live problem in the market.
2. **Direct insurtechs** (Sunday, Roojai) and **bank-app insurance features** (SCB
   Easy, MAKE by KBank) — sell one issuer's product, well, with real digital UX
   (instant quote, app-native claims), but are not comparison sites and cite no
   competitor's numbers at all.

This repo's differentiators from README/DESIGN.md — no affiliate links, no lead
capture, no ranking/scoring, public-scheme entitlement shown first, rider-vs-host
premium split, lifetime cost summed across full age bands, and a `verified_on`/source
URL on every figure with staleness auto-hiding past 18 months — have **no matching
feature on any site found in this research pass**. That combination is not
"our version of X," it's a category none of the ten real competitors above occupy.

## Concrete gaps this repo could consider closing

Ranked by how directly they extend the existing schema and scope, not by market size:

1. **Standalone critical-illness / cancer products** — Rabbit Care and Roojai both
   sell these as distinct, individually-purchasable products; `data/plans/*.yaml`
   currently has none tagged as CI-only (the schema's `shape` enum has no CI-specific
   value). Small schema/scope decision, not a rewrite.
2. **English-language toggle** — CheckDi and Pacific Prime both serve an `en`
   variant; this repo is Thai-only (`<html lang="th">`, no `en` route found). Given
   the CC BY-SA "please copy this, translate it" invitation in the README, an English
   mirror is arguably more aligned with this repo's own stated goals than with
   competing against brokers.
3. **Standalone OPD-only / dental products** — several competitors (InsureDD's tagged
   plans, general market pages) treat pure-OPD and dental as separate purchasable
   lines; this repo's schema has `opd_annual_limit_thb` as a field on a broader plan
   but no dental field or dental-only product category at all.
4. **A build-your-own / flexible-coverage product type** (Sunday's model: "only pay
   for what you need instead of buying standardized, pre-packaged products") has no
   analogue in the current `shape` enum (`lump_sum`, `per_item_schedule`,
   `deductible_first`, `opd_inclusive`), because no insurer in the current 16-insurer
   dataset sells this way — worth a scan of Sunday's own filed rates as a future
   `data/plans/` candidate, distinct from adding a comparison-site feature.
5. **Nothing found in this pass warrants copying a broker UX pattern** — filters,
   sort, and per-facet tags are already present per DESIGN.md, and this repo
   deliberately rejects the one pattern every competitor above relies on (a lead
   form / "best for you" pick), which is correctly identified in README/DESIGN.md as
   the reason to trust it over them.

---

## Follow-up

Prioritized “what to put on the site next,” merged with round-4/5 insurer outcomes and
a live count of blanks in `data/plans/`, is in
[`competitive-data-gaps.md`](./competitive-data-gaps.md).
