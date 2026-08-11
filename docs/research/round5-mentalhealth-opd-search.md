# Round 5: a dedicated search for standalone OPD and standalone mental health

Research date: 2026-08-12. Scope: exactly the two open items `round4-gap-analysis.md` §3b
and §3e left unresolved — (a) a Thai insurer selling outpatient-only (OPD) cover as an
independent product with its own premium, and (b) a Thai insurer selling a standalone
mental-health/psychiatric product, or a rider where mental health carries its own clearly
separated premium line rather than a copay buried in a general benefit. Eleven prior files
touched both categories in passing; this is the first pass that searched for them on
purpose. Every claim below is followed by the exact URL and the verbatim Thai (or English)
it rests on. Insurer-owned domains only for product facts; คปภ./OIC would be licence-check
only (not needed this round); `agent_site` allowed for premiums only, cross-checked against
a second independent source per `CONTRIBUTING.md`.

**Outcome, in one line: both categories remain empty for data-entry purposes, but not for
the reason previously assumed.** Standalone mental health is still a clean, total negative —
broader and more targeted searching than any prior round found nothing beyond the same Chubb
Life copay line already on record. Standalone OPD is no longer a clean negative: Muang Thai
Life sells an OPD rider that explicitly does **not** require an IPD host (contradicting
`round4-gap-analysis.md` §3b's "every OPD benefit found is a buy-up attached to an IPD
host"), but it still requires an existing life-policy host, publishes no premium on its own
domain, and the only full premium table found sits on a single uncorroborated agent site with
an internal inconsistency — so it fails this project's sourcing bar for a different reason
than assumed. No record was added. Full reasoning below.

## Search terms used

Thai and English, run as both exact strings and natural-language variants: `ประกัน OPD เดี่ยว
เบี้ยประกัน`, `ประกันสุขภาพจิต เบี้ยประกัน`, `standalone OPD insurance Thailand`, `mental
health insurance rider Thailand premium`, plus follow-ups once specific insurers or products
surfaced (`"ประกัน OPD อย่างเดียว"`, `สัญญาเพิ่มเติมสุขภาพจิต เบี้ยประกันภัย บาท/ปี`,
`"โรคทางจิตเวช" เบี้ยประกันภัย`, insurer-name + `สุขภาพจิต`/`จิตเวช`, insurer-name +
`OPD เดี่ยว`/`OPD อย่างเดียว`). Roughly 20 distinct queries in total.

---

## 1. Standalone OPD

### 1a. The lead: Muang Thai Life's OPD riders do not require an IPD host

Muang Thai Life (already in the dataset via MTI Health Me Plus) sells two OPD-only riders,
sold together and compared side by side:

> โดนใจ เลือกซื้อได้ **ไม่ต้องซื้อร่วม**กับความคุ้มครองสุขภาพผู้ป่วยใน

https://www.muangthai.co.th/th/health-insurance/opd (fetched 2026-08-12, `curl`-exact after
a plain `curl` 403'd and a spoofed browser User-Agent got HTTP 200; WebFetch also 403'd on
this domain throughout this pass — see method note below)

The page's own marketing icon strip repeats the same point as an image `alt` attribute:

> ไม่ต้องซื้อพร้อม IPD

Same URL. This directly contradicts the shape `round4-gap-analysis.md` §3b described
("every OPD benefit found is a buy-up attached to an IPD host") — these two riders are pure
OPD, no IPD component, and no IPD purchase is required alongside them.

### 1b. But it is still a rider, not standalone — just on a different host

> A: ต้องซื้อแนบท้ายกรมธรรม์ประกันชีวิตหลัก (สัญญาหลัก) สนใจรายละเอียดเพิ่มเติมสามารถ
> สอบถามข้อมูลได้จากตัวแทนของบริษัทฯ

Same URL, from the page's own FAQ answering "ต้องซื้อแนบท้ายกรมธรรม์ประกันชีวิต (สัญญาหลัก)?"
(must it be attached to a life policy?). A second FAQ on the same page confirms it can attach
to an **existing** life policy the buyer already owns, not just a new one, subject to a
minimum sum insured on that host:

> ได้ แต่ต้องเป็นไปตามเงื่อนไข คือ แบบประกันภัยหลักจะต้องมีจำนวนเงินเอาประกันภัยขั้นต่ำ
> ตั้งแต่ 5[00,000 บาท ขึ้นไป — figure cut off mid-fetch, not independently re-confirmed
> this pass]

Same URL. The independent agent site `muangthai-agent.com` describes the same requirement
more bluntly for the OPD Maochai variant: `เป็นสัญญาเพิ่มเติม ต้องพ่วงประกันชีวิต` ("this is a
rider, must be bundled with a life policy") — consistent with, not contradicting, the
official FAQ.

So the correct characterisation is: this is OPD cover that does not need an *IPD* host, but
it does need a *life-policy* host — the same rider pattern every other health product in this
dataset already follows (per the README: "Most 'health insurance' sold in Thailand is a rider
... on a whole-life policy you cannot decline"). It narrows the previous finding; it does not
overturn the broader one that fully host-free OPD does not exist in the Thai retail market.

### 1c. Benefit structure and eligibility — from Muang Thai's own filed brochure

Muang Thai publishes a proper brochure (not just a marketing page) for both riders:

https://www.muangthai.co.th/filestorage/brochures/Brochure_OPD%20PT%20vs%20OPD%20MC.pdf
(fetched 2026-08-12, 12 pages, `MTL_2-02-04-0487_ 25/10/2566` footer code — this reads as a
filed/compliance-tracked document, not a plain ad, though it is not labelled
"เอกสารสรุปสาระสำคัญ" or "กรมธรรม์" and so is treated here as `official_insurer`, not
`filed_wording`)

Plan tiers (p.5): OPD Per Time pays 500 / 800 / 1,000 / 1,500 / 2,000 / 2,500 / 3,000 บาท per
visit, capped at 30 visits/year (annual totals 15,000–90,000 บาท); OPD Maochai pays a flat
15,000 / 20,000 / 25,000 / 30,000 / 50,000 / 100,000 บาท per policy year with no per-visit
cap. Entry ages and renewal (p.9, "เงื่อนไขการรับประกันภัย" table): OPD Per Time is age 6–80
at entry, renewable to 98, covered to 99; OPD Maochai is age 6–90 at entry, same renewal/cover
ceiling. Waiting periods (p.9): 30 days general; 120 days for a named list of conditions
(เนื้องอก ถุงน้ำ ฯลฯ — the same category Dhipaya and others use); 180 days for a second named
list (โรคต่อมไทรอยด์, โรคหัวใจ, นิ่วทุกชนิด, etc.). Exclusions (same page) run to 26 items
across 5 numbered categories: pre-existing/undeclared conditions, cosmetic/refractive/fertility
procedures, pregnancy and prenatal care, preventive/lifestyle items (vaccines outside the
covered list, vitamins, weight programs), and non-medically-necessary treatment.

**No premium figure of any kind appears anywhere in this 12-page brochure.** It is entirely a
benefit-and-eligibility document.

### 1d. No official premium table exists, and the one agent table found cannot be cross-checked

The product page itself states only that premium depends on age/sex/occupation class and
links no rate table. Every `onlinesales.muangthai.co.th` and `online.muangthai.co.th` URL
that plausibly hosts a purchase flow with live pricing returned HTTP 403 to both `curl` and
WebFetch throughout this pass (see method note). One agent site,
`muangthai-agent.com/product/339813/opd-maochai`, publishes a full age-band table by sex for
all six OPD Maochai tiers — e.g. male, age 21–30, plan 20,000: 8,831 บาท/ปี. This is the kind
of table CONTRIBUTING.md's `agent_site` tier exists for, **except** the rule requires
cross-checking against a second independent source, and none was found: `mtl-insure.com` and
`evemtl.com` both describe the same product but publish no premium table at all, and
`muangthaiproduct.com` publishes a table only for the unrelated per-visit OPD product family.
Worse, the one table found is internally inconsistent — its own age 81–90 row shows the
30,000-บาท plan (13,331 บาท/ปี) priced *below* the 25,000-บาท plan (28,500 บาท/ปี) at the same
age and sex, which cannot be a real rate schedule. **Verdict: real product, real eligibility
terms from an official brochure, zero official premium, and the only premium table found
fails this project's own cross-check requirement on both count and internal consistency.
NOT INCLUDED.**

### 1e. SCB's "OPD คุ้มครบ จบหายห่วง" is not a lead — bundled IPD, wrong underwriter

SCB's retail banking site advertises an OPD product prominently enough to rank at the top of
generic search results, which made it worth checking directly. It fails on two counts at
once:

> รวมความคุ้มครองกรณีผู้ป่วยใน IPD

https://www.scb.co.th/th/personal-banking/insurance/health-insurance/opd-worry-free.html
(fetched 2026-08-12) — the product bundles IPD in regardless, so it is not OPD-only. It is
also not an SCB Life product at all:

> รับประกันชีวิตโดย บริษัท เอฟดับบลิวดี ประกันชีวิต จำกัด (มหาชน)

Same URL. SCB's insurance hub sells FWD-underwritten paper under an SCB-branded landing page;
the underwriter is FWD, already in the dataset. This is a distribution-channel product, not a
new insurer or a new structural finding, and it publishes no premium table either way.

### 1f. SCB Life itself — checked for the first time, still nothing standalone

`round4-gap-analysis.md` §2b flagged ไทยพาณิชย์ประกันชีวิต (SCB Life) as the single
highest-priority never-checked insurer in the whole project. This pass looked specifically
for OPD and mental-health products on `scblife.co.th` and `scb.co.th`'s insurance hub and
found nothing under the SCB Life name itself in either category — every OPD-branded product
on `scb.co.th` traces to a different underwriter (FWD, §1e above). SCB Life's own launch
product, reported by trade press, is a critical-illness/multi-claim product ("SCB Multi Care
Multi Claims"), out of scope for both categories here. A full sweep of SCB Life's product
lineup for the dataset's general "largest insurers" gap remains open and is not what this
file was scoped to close — see `round4-gap-analysis.md` §4 item 1 for that separate task.

### 1g. Other insurers checked and confirmed to add nothing new

Pacific Cross, Generali, AIA, Bangkok Life, Dhipaya, Allianz Ayudhya, Krungthai-AXA — all
already in the dataset — were searched for an OPD-only line distinct from their existing
IPD-hosted OPD buy-ups. None surfaced. ไทยวิวัฒน์ (Thai Vivat), a non-life insurer never
mentioned in any file in this directory before today, was checked directly on
`thaivivat.co.th`: its four retail health products (Active Health, Jaipum Mee Khuen, TTB
Health Care Plus, Delight) are all IPD-hosted with OPD as a bundled feature, same shape as
everything else in the market. Not a lead for either category.

---

## 2. Standalone mental health

### 2a. Still a clean negative, more broadly searched than any prior round

No insurer-owned page, brochure, or brochure-adjacent document found in this pass shows a
mental-health or psychiatric product sold on its own, or a rider with mental health broken
out as its own priced line item. The only mention anywhere in this project remains the one
`round4-gap-analysis.md` §3e already found — Chubb Life's 3D Health Excellence copay line,
unreachable because Chubb Life publishes no premium at all (`round4-gap-analysis.md` §1d).
Nothing in this pass changes that.

### 2b. Two insurer-side data points on how mental health is actually treated, worth recording even though neither is includable

Two brokers/aggregators independently pointed at the same two insurers as unusually
generous on psychiatric coverage, both already in the dataset:

> [iHealthy] คุ้มครองทุกภาวะที่เกี่ยวข้องกับทางจิตเวช ตามคำสั่งแพทย์ ... Diamond
> [plan]: 5,000 บาท [annual sub-limit] ... Platinum [plan]: 200,000 บาท

> [Muang Thai Elite Health] คุ้มครองทุกภาวะที่เกี่ยวข้องกับทางจิตเวช โรคอะไรก็ได้ตามคำสั่งแพทย์
> ... Plan 3: 75,000 บาทต่อโรค ... Plan 4: 100,000 บาทต่อโรค

Both quoted from https://www.insurefriend.co.th/2021/03/psychiatric-disorder.html (fetched
2026-08-12) — an insurance-content aggregator, not an insurer domain, so **not citable for a
product fact under CONTRIBUTING.md**, and neither claim was independently re-verified against
Krungthai-AXA's or Muang Thai's own filed wording in this pass (both insurers publish long
benefit-schedule PDFs that were not opened for this specific line item — a five-minute
follow-up for whoever picks this up next). If accurate, both describe mental health as a
**sub-limit inside a combined IPD+OPD or IPD limit**, structurally identical to Chubb's
copay-line finding: present, but never its own separately priced item. Recorded here as an
unverified lead, not as grounds for any data change.

### 2c. The market default is exclusion, confirmed from a third angle

A third, independent aggregator source states plainly that most Thai retail health policies
exclude psychiatric conditions outright regardless of what marketing copy implies:

> แม้ในแผนประกันจะเขียนว่าคุ้มครองโรคทางจิตเวช แต่เอาเข้าจริงก็ไม่คุ้มครองซะงั้น
> ที่เห็นได้ชัดเลยคือโรคซึมเศร้าที่แทบจะไม่คุ้มครองเลยล่ะ

https://gettgo.com/blog/health-psychiatric (fetched 2026-08-12) — again a broker/content
site, not citable for a product fact, but consistent with everything else found this pass:
the honest default in this market is exclusion, and the exceptions found are sub-limits
inside a general benefit, never a separately priced item.

### 2d. International/Cigna-branded "mental health insurance" is not a Thai product

English-language search results repeatedly surface Cigna as offering "mental health
insurance" in Thailand. This is the same dead brand `standalone-health-sourcing.md` §5 and
`round4-gap-analysis.md` §1c already established does not sell retail policy in Thailand
under that name (sold to Chubb in 2022). Every English source found routes to Cigna
Global/international brokerage content, not a Thai-licensed retail product, and none names a
premium.

---

## 3. Method note

1. `muangthai.co.th`'s main site 403's to a plain `curl` request but returns HTTP 200 to
   `curl` with an ordinary desktop-browser User-Agent — the same asymmetry
   `round4-gap-analysis.md` §"Method note" item 2 documented for `bangkokinsurance.com`.
   WebFetch itself 403'd on every `muangthai.co.th`-family domain tried in this pass,
   including the base site once a `curl -A` fetch had already succeeded — all Muang Thai
   quotes above therefore come from `curl`-with-spoofed-UA, not WebFetch.
2. `onlinesales.muangthai.co.th` and `online.muangthai.co.th` — the two subdomains that most
   plausibly host a live, age-linked quote calculator with real pricing — 403'd to both
   `curl` (with the same spoofed UA) and WebFetch, on every URL tried. This is the same
   unscrapable-quote-engine problem documented for other insurers elsewhere in this project's
   files, and it is the reason §1d above could not close the premium gap from an official
   source.
3. No คปภ./OIC lookup was needed this round — every insurer discussed above already has a
   confirmed licence status from prior rounds, and Thai Vivat's non-life licence was not
   independently re-checked against the OIC table since its product pages alone were enough
   to rule it out for both categories in scope here.

---

## 4. Conclusion and what would change it

**No record was added.** Neither category clears this project's sourcing bar today:

- Standalone OPD exists in a narrower sense than previously stated (OPD without an IPD host)
  but not in the sense the brief asked for (an independent product with its own premium) —
  Muang Thai's OPD riders have real eligibility terms and zero official premium, and the one
  agent-published premium table found is uncorroborated and internally inconsistent.
- Standalone mental health remains a total negative for both a dedicated product and a
  separately priced rider line; the two best leads found (iHealthy, Muang Thai Elite Health)
  describe sub-limits inside a combined benefit, sourced only from broker content this pass
  did not have time to verify against the insurers' own filed wording.

Two concrete next steps, in priority order: (1) re-fetch
`onlinesales.muangthai.co.th/en/detail/opdmaochai/` and
`online.muangthai.co.th/th/detail/opd-15-15` with a real browser rather than `curl`/WebFetch —
both are official Muang Thai subdomains and the likeliest place an official OPD Maochai
premium table actually lives; (2) open Krungthai-AXA's and Muang Thai's own filed benefit
schedules (not just the summary product pages already in this dataset's sourcing) for the two
records already in `data/plans/` to confirm or refute the §2b psychiatric sub-limit figures
against `terms_source`-grade documents, since a confirmed figure there — even as a sub-limit,
not a standalone line — would be a stronger, sourceable version of the same finding
`round4-gap-analysis.md` §3e already flagged from Chubb.
