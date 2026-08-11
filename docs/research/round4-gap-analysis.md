# Round 4: gap analysis — stale-rejection re-checks, the OIC licensee diff, category gaps

Research date: 2026-08-12. This file is a scoping pass, not a data-entry pass — it adds
**zero** records to `data/plans/`. Same rules as every other file in this directory: every
claim is followed by the verbatim Thai (or English, where the source is English) it rests
on and the exact URL that text lives on. Only insurer-owned domains, insurer-hosted
documents and คปภ./OIC documents were used; no broker, agent or comparison site is cited
for any product fact, premium included.

**Outcome, in one line: the single biggest gap this project has is not an insurer that was
checked and rejected — it is บริษัท ไทยพาณิชย์ประกันชีวิต จำกัด (มหาชน) (SCB Life), a
top-five-by-premium Thai life insurer that has never appeared in any research file in this
directory, checked or rejected.** Two of the three "rejected" insurers flagged for
re-checking (AXA, Bangkok Insurance) are unchanged as of today. พรูเด็นเชียล ประกันชีวิต
(Prudential Thailand) — flagged as an open target since `round2-insurers-sourcing.md` §7
and never actually checked — was checked in this pass and is a clean rejection, same shape
as every other priceless rider. No standalone dental, standalone OPD, standalone maternity
or standalone mental-health product was found anywhere on a Thai insurer's own domain.

## Method note

1. Two days separate this file's research date from the round that produced most of the
   "checked and rejected" writeups (2026-08-10). That is not long enough for a Thai
   insurer's product lineup to change, and nothing found here contradicts that — every
   re-check below reproduces the same premium gap the original file found, with a fresh URL
   and a fresh quote.
2. **Bangkok Insurance's site returns HTTP 200 to `curl` with an ordinary browser
   User-Agent**, unlike AXA (HTTP 403 to WebFetch, documented in
   `round2-insurers-sourcing.md`, §"Method note" item 3) and Tokio Marine (Incapsula WAF,
   documented in `round3-life-major-sourcing.md` §2). Quotes below from
   `bangkokinsurance.com` are `curl`-exact.
3. **Prudential Thailand's site (`online.prudential.co.th`) is a client-rendered app that
   returns an empty shell to `curl`** — no `<title>`, no body text, confirmed by fetching
   the page and grepping for any Thai string, none found. The quotes below from that domain
   were retrieved through a browser-rendering fetch, not `curl`, and are reported as such.
4. The คปภ. company-code table used for §2 is the same PDF three earlier files in this
   directory already cite —
   `https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337`, dated
   June 2020 (มิถุนายน 2563) in its own footer. It is the only machine-readable, OIC-hosted
   company list this project has ever been able to retrieve — `round3-nonlife-b-sourcing.md`
   §"Method note" item 4 documents at length why the live `oic.or.th` company-search UI
   cannot be scraped (401-ing API, client-rendered OutSystems apps, empty dropdowns). Being
   from 2020 means it is a **floor**, not a ceiling: three companies previous rounds
   independently confirmed are gone or renamed since (แมนูไลฟ์ → เคดับบลิวไอ ประกันชีวิต;
   บูพา ประกันสุขภาพ → dead domain, no successor established; แอลเอ็มจี ประกันภัย →
   amalgamated into ชับบ์สามัคคี on 2 มีนาคม 2569) are still confirmed **present** on it,
   because a 2020 licence does not vanish from a 2020 list. It is not known to be missing
   any company that existed in 2020, and this project has no evidence it has gained any new
   licensee since — that gap is stated plainly in §2.5.

---

## 1. Re-checking the "checked and rejected" list

### 1a. AXA (แอกซ่าประกันภัย) — REJECTED, unchanged

`round2-insurers-sourcing.md` §2 rejected AXA SmartCare Essential and SmartCare Value for
publishing no age-linked premium. As of today, both product pages are live and the gap is
identical:

> ประกันสุขภาพเหมาจ่าย ไม่พ่วงประกันชีวิต AXA SmartCare Essential

https://www.axa.co.th/th/personal/health-insurance/comprehensive-plan

> เบี้ยประกันภัยเริ่มต้นที่ 6,700 บาท ต่อปี*

https://thailandgi-ktaxa.cdn.prismic.io/thailandgi-ktaxa/afLX3cBOoF08xenI_BrochureSmartCareValue.pdf
(quoted at `round2-insurers-sourcing.md` line 351; this pass re-confirmed the same brochure
URL is still live and still carries only the one age-unlinked figure)

**No age-band table has appeared on `axa.co.th` since 2026-08-10. Verdict unchanged:
NOT INCLUDED.**

### 1b. กรุงเทพประกันภัย (Bangkok Insurance) — REJECTED, unchanged

`standalone-health-sourcing.md` §4 rejected Bangkok Insurance's three-tier health range
(Classic/Superior/Premier Care) for publishing no premium at all, while noting it is the
one insurer in that file with genuine filed policy wording. Re-checked today, `curl`-exact:

> เบี้ยประกันภัยปรับเพิ่มขึ้นตามช่วงอายุ

https://www.bangkokinsurance.com/th/product/health/new (fetched 2026-08-12; the page states
premiums rise by age band without printing the bands or the figures)

The page's only pricing mechanism is a `เช็คเบี้ยประกัน` control that resolves to
`/th/product/health/new/insurance-calculator/compare`, which today issues an HTTP redirect
to a lead form rather than a calculator:

> `<title>Document Moved</title>` → `Redirecting to
> https://www.bangkokinsurance.com/product/health/new/register`

https://www.bangkokinsurance.com/th/product/health/new/insurance-calculator/compare
(fetched 2026-08-12, `curl`-exact; the destination `.../register` page's form fields are
`care_name` and other lead-capture inputs, not a date-of-birth-only quote engine like the
Dhipaya/Viriyah/Ocean Life/Pacific Cross endpoints this project has swept elsewhere)

**No calculator, no age-band table, no change from `standalone-health-sourcing.md`.
Verdict unchanged: NOT INCLUDED.**

### 1c. ซิกน่า / Cigna — the brand is confirmed dead, not merely unpriced

`standalone-health-sourcing.md` §5 already established that Cigna's Thai retail health
business no longer trades under that name — it was sold to Chubb in 2022 and now operates
as Chubb Life / Chubb Samaggi. `round3-health-specialists-sourcing.md` §3c independently
confirmed the คปภ. code table still lists Cigna as a live licence (`2064 บริษัท ซิกน่า
ประกันภัย จำกัด (มหาชน)`) but that the public-facing brand and product pages are gone. This
pass did not find a `cigna.co.th` product page, a Cigna-branded rate table, or any evidence
the sale-to-Chubb finding is wrong. **There is no "Cigna" left to re-check — the correct
re-check target is its successor, Chubb Life, done next.**

### 1d. Chubb Life (ชับบ์ ไลฟ์ แอสชัวรันซ์) — REJECTED, unchanged

`round3-life-major-sourcing.md` §4 rejected both Chubb Life riders (3D Health Excellence,
3D Health Extra/Advance) for publishing full benefit schedules and zero premium anywhere.
Re-checked today: the same brochure is still the only document linked from the product
page, and it still contains no rate table —

> 3D Health Excellence ทําถึงทุกความคุ้มครอง ครอบคลุมทุกมิติสุขภาพ

https://www.chubb.com/th-th/personal/3d-health-excellence.html — brochure at
https://www.chubb.com/content/dam/chubb-sites/chubb-com/th-th/personal/3d-health-excellence/3d-health-excellence-brochure.pdf
(both URLs identical to the ones `round3-life-major-sourcing.md` §4a already cites; no new
document, no new page, no premium appeared)

**Verdict unchanged: NOT INCLUDED, no premium anywhere.**

### 1e. พรูเด็นเชียล ประกันชีวิต (Prudential Thailand) — newly checked in this pass, REJECTED

Flagged as an open target at the end of `round2-insurers-sourcing.md` §7 and again at the
end of `round3-life-minor-sourcing.md` §6 ("remain unsourced and are still the obvious next
target... this round did not touch them") — **but no file in this directory had actually
opened a Prudential product page until now.** This closes that gap with a negative result.

Prudential Thailand sells five individually named health-and-protection products from
`online.prudential.co.th/health-insurance`, a client-rendered page (see method note §3).
The one IPD medical-expense product in the list, **พรูเฮลธี้ พลัส (Pru Healthy Plus)** —
also reachable directly at https://online.prudential.co.th/o2o/pruhealthyplus — carries no
premium figure of any kind on the page; its only call to action routes to an agent contact
flow. The only premium figure on the whole page belongs to a different, non-health product:

> พรูเหมา เหมา ดับเบิล ชัวร์ — จ่ายเบี้ยฯ เริ่มต้น 15 บาท/วัน

https://online.prudential.co.th/health-insurance (fetched 2026-08-12)

`เหมา เหมา ดับเบิล ชัวร์` is a daily hospital-cash / lump-sum product from its own name
pattern (`ดับเบิล ชัวร์` = "double sure" payout), not a medical-expense (เหมาจ่าย
ค่ารักษาพยาบาลตามจริง) plan, so this figure would not belong in `data/plans/` even if it
were the product in question. **Pru Healthy Plus itself — the actual IPD product — has
zero published premium, at any age, anywhere on Prudential's own domain, same shape as
every other rejection in this dataset. Verdict: NOT INCLUDED, no premium anywhere.**

### 1f. Samsung and MTL — not re-fetched, and why that is defensible here

The brief asked to prioritise Cigna, Bangkok Insurance and AXA, done above. ซัมซุง
ประกันชีวิต (`round3-life-minor-sourcing.md` §3) and MTL D Health Lite / Elite Health Plus
(`mtl-bla-sourcing.md` §3–4) were not independently re-fetched in this pass. Both existing
writeups are two days old, both are unusually thorough — Samsung's rejection rests on
reading benefit tables published as JPEG images with no price text anywhere in them, and
MTL's on a byte-exact brochure PDF that names every field except one — and neither pattern
(image-only benefit tables; brochure with a `premium` field structurally absent) is the
kind of thing that changes on a two-day horizon. Re-fetching them would have reproduced the
same negative result at the cost of the OIC diff in §2, which found the actually new
material in this pass.

---

## 2. The OIC licensee diff

### 2a. Life insurers (24 licences on the June 2020 table) — checked vs. never checked

| # | รหัส | Company | Status in this project |
|---|---|---|---|
| 1 | 1006 | กรุงเทพประกันชีวิต (BLA) | **In dataset** (`bla-happy-health-premier-10m.yaml`), `mtl-bla-sourcing.md` |
| 2 | 1022 | กรุงไทย-แอกซ่า (KTAXA) | **In dataset** (`ktaxa-ihealthy-ultra-gold.yaml`), `round2-insurers-sourcing.md` |
| 3 | 1015 | เจนเนอราลี่ ประกันชีวิต | **In dataset** (3 Generali plans), `round3-life-major-sourcing.md` §3 |
| 4 | 1025 | ชับบ์ ไลฟ์ แอสชัวรันซ์ | Checked, rejected — no premium (`round3-life-major-sourcing.md` §4, re-confirmed §1d above) |
| 5 | 1016 | โตเกียวมารีนประกันชีวิต | Checked, **blocked by WAF, not actually assessed** (`round3-life-major-sourcing.md` §2) |
| 6 | 1011 | ทิพยประกันชีวิต | Checked, rejected — no individual health product (`round3-life-minor-sourcing.md` §1) |
| 7 | 1018 | ไทยคาร์ดิฟ ประกันชีวิต | Named only in passing while disambiguating T Life (`round3-life-minor-sourcing.md` §2a) — **never itself researched** |
| 8 | 1021 | ไทยซัมซุง ประกันชีวิต (Samsung) | Checked, rejected — no premium (`round3-life-minor-sourcing.md` §3) |
| 9 | 1001 | ไทยประกันชีวิต | **In dataset** (3 Health Fit plans), `round2-insurers-sourcing.md` §4 |
| 10 | 1012 | **ไทยพาณิชย์ประกันชีวิต (SCB Life)** | **NEVER CHECKED — see §2b, this is the finding of this pass** |
| 11 | 4001 | ไทยรีประกันชีวิต | Reinsurer — writes no retail policy, out of scope by definition |
| 12 | 1005 | ไทยสมุทรประกันชีวิต (Ocean Life) | **In dataset** (2 plans), `round3-life-major-sourcing.md` §1 |
| 13 | 1020 | ธนชาตประกันชีวิต | Flagged as unchecked in `round3-life-minor-sourcing.md` §6; checked in this pass — see §2c, identity now uncertain |
| 14 | 1019 | บางกอกสหประกันชีวิต (BUI Life) | **Never checked in any file** |
| 15 | 1017 | ประกันชีวิตนครหลวงไทย → ที ไลฟ์ (T Life) | Checked, rejected — no medical-expense product (`round3-life-minor-sourcing.md` §2) |
| 16 | 1010 | พรูเด็นเชียล ประกันชีวิต | Checked in this pass, rejected — see §1e |
| 17 | 1002 | ฟิลลิปประกันชีวิต (ex-ฟินันซ่า) | Checked, no individual health product (`round3-life-minor-sourcing.md` §4) |
| 18 | 1004 | เมืองไทยประกันชีวิต (MTL) | **In dataset** (2 MTI Health Me Plus plans), `mtl-bla-sourcing.md` |
| 19 | 1009 | แมนูไลฟ์ → เคดับบลิวไอ ประกันชีวิต | Checked, name-change confirmed, no further health product found (`round3-life-major-sourcing.md` §5) |
| 20 | 1013 | สหประกันชีวิต (Union Life) | **Never checked in any file** |
| 21 | 1007 | อลิอันซ์ อยุธยา ประกันชีวิต | **In dataset** (Basic Care plan is the group's non-life sibling, 2042; the life licence 1007 itself has not been separately researched for a health rider) |
| 22 | 1003 | อาคเนย์ประกันชีวิต (Southeast Life) | Named only as ไทยไพบูลย์'s corporate parent (`round3-nonlife-b-sourcing.md` §3) — **never itself researched for a health product** |
| 23 | 1023 | เอฟดับบลิวดี (FWD) | **In dataset** (2 FWD plans), `fwd-allianz-sourcing.md` |
| 24 | 1008 | เอไอเอ (AIA) | **In dataset** (2 AIA plans), `aia-rider-sourcing.md` |
| 25 | 1024 | แอ๊ดวานซ์ ไลฟ์ ประกันชีวิต | **Never checked in any file** |

### 2b. Why SCB Life is the headline finding

**ไทยพาณิชย์ประกันชีวิต (SCB Life) does not appear — checked, rejected, or otherwise — in
any of the eleven files in this directory before today.** It is not a fringe insurer: it is
the bancassurance arm of Siam Commercial Bank, one of Thailand's largest retail banks, and
every prior round that built a target list from "largest insurers by written premium" (the
README's own inclusion criterion) should have surfaced it. It did not. A first-pass search
of the company's own domains today found a live product ecosystem — `scblife.co.th`,
`scb.co.th/th/personal-banking/insurance`, and a distinct micro-site
`play.scblife.co.th/landing/...` titled "เช็คสิทธิ์ค่ารักษาพยาบาลของคุณ" (check your
medical-expense benefit) — but this pass did **not** get far enough to confirm whether a
full age-band premium table exists on any of them; that is exactly the work item this file
recommends first in §4.

### 2c. ธนชาตประกันชีวิต — checked in this pass, and the identity question is now open

`round3-life-minor-sourcing.md` §6 flagged licence 1020, ธนชาตประกันชีวิต, as a lead the
round did not have time to pursue. This pass looked: Thanachart Capital's own group page
lists exactly two insurance subsidiaries today, and neither is named ธนชาตประกันชีวิต —

> บริษัท ธนชาตประกันภัย จำกัด (มหาชน) ประกอบธุรกิจให้บริการประกันภัย...
> บริษัท ที ไลฟ์ ประกันชีวิต จำกัด (มหาชน)

https://www.thanachart.co.th/th/thanachart-group/thanachart-group/thanachart-insurance
(fetched 2026-08-12)

ธนชาตประกันภัย (non-life, licence 2067) and ที ไลฟ์ (the former ประกันชีวิตนครหลวงไทย,
licence 1017, already checked and rejected in `round3-life-minor-sourcing.md` §2) are the
only two group insurers named. **No `thanachartlife.co.th` or equivalent domain resolves**
(checked directly, connection failure). This is a real ambiguity, not a rejection: either
licence 1020 has been absorbed, renamed, or gone dormant since the June 2020 OIC table was
generated, or its current live domain simply was not found in one search pass. Recorded as
**unresolved — do not assert this licence is dead, and do not assert a product exists**
until someone finds where (if anywhere) 1020 still trades.

### 2d. Non-life insurers (≈53 licences on the same table) — the never-checked list

Cross-referencing the table's non-life section against every research file in this
directory (full method in the appendix search log) turns up the following licences with
**zero appearances, checked or rejected, in any file**:

| รหัส | Company | Note |
|---|---|---|
| 2061 | สินมั่นคงประกันภัย (Synmunkong) | One of the largest Thai motor insurers by written premium; never checked for a health line |
| 2020 | เทเวศประกันภัย (The Deves Insurance) | Long-established, state-connected insurer; never checked |
| 2079 | อาคเนย์ประกันภัย (Southeast Insurance, non-life) | Sibling of the already-checked Indara/TGH group (`round3-nonlife-b-sourcing.md` §3); the non-life entity itself was never opened |
| 2001 | ไทยประกันภัย (Thai Insurance PCL) | Not to be confused with the already-checked ไทยประกันสุขภาพ (2033); never checked |
| 2006 | สยามซิตี้ประกันภัย (Siam City Insurance) | Never checked |
| 2007 | นำสินประกันภัย (Nam Seng Insurance) | Never checked |
| 2009 | จรัญประกันภัย (Charan Insurance) | Never checked |
| 2074 | เคเอสเค ประกันภัย (KSK Insurance) | Distinct licence from QBE/KWI (2059, already checked as เคดับบลิวไอ in `round3-nonlife-b-sourcing.md` §6); never itself checked |
| 2073 | เจ้าพระยาประกันภัย (Chao Phaya Insurance) | Never checked |
| 2008 | ไชน่าอินชัวรันส์ (ไทย) | Never checked |
| 2069 | ทูนประกันภัย (Tune Insurance) | Never checked; likely travel/micro-PA given the brand, but not verified |
| 2029 | ไทยศรีประกันภัย (Thaisri) | Distinct from the already-checked ไทยเศรษฐกิจ/TSI (2003); never checked |
| 2017 | บางกอกสหประกันภัย (Bangkok Union Insurance) | Never checked |
| 2066 | ฟีนิกซ์ ประกันภัย (ประเทศไทย) | Never checked |
| 2046 | เอราวัณประกันภัย (Erawan Insurance) | Never checked |
| 2005 | สหนิรภัยประกันภัย | Never checked |
| 2056 | สหมงคลประกันภัย | Never checked |
| 2040 | สินทรัพย์ประกันภัย | Never checked |
| 2022 | สัจจะประกันภัย | Never checked |
| 2049 | เอเชียประกันภัย 1950 | Never checked |
| 2053 | เอฟพีจี ประกันภัย (ประเทศไทย) | Never checked |
| 2071 | พุทธธรรมประกันภัย | Never checked |
| 2004 | สัญญาประกันภัย | Only appears in `fwd-allianz-sourcing.md` as an unrelated Thai word ("สัญญาประกันภัย" = "insurance contract"), not as the company — effectively never checked |
| 2013 | นิวอินเดีย แอสชัวรันส์ (Thailand branch) | Foreign-branch licence, small; never checked |
| 2081 | กลางคุ้มครองผู้ประสบภัยจากรถ (RVP) | Compulsory-motor claims pool, writes no individual health product by charter — out of scope, not a real gap |
| 5001 | ไทยรับประกันภัยต่อ | Reinsurer — out of scope by definition |

Of these, **สินมั่นคงประกันภัย, เทเวศประกันภัย, อาคเนย์ประกันภัย and ไทยประกันภัย** are the
four worth a real screening pass before the smaller names on this list — each is an
established, meaningfully sized carrier, the same size class as the eight companies
`round3-nonlife-b-sourcing.md` screened and came up empty on, but none of these four has
even been screened once.

### 2e. What this diff could not do

The June 2020 table is the only OIC-hosted company list this or any prior round could
retrieve (method note §4). It cannot show a licence issued after mid-2020, and this project
has no way today to check whether one exists — the live `oic.or.th` consumer-facing company
list remains unscrapable for the same reasons `round3-nonlife-b-sourcing.md` §"Method note"
item 4 documented in the previous round. That is a standing gap in this project's method,
not merely in its data, and it is worth someone revisiting with a real browser rather than
`curl`/`WebFetch` if a definitive "these are ALL current OIC licensees" list is ever needed.

---

## 3. Category gaps in the dataset itself

Every one of the 37 records under `data/plans/` (excluding the two `_example-*` templates)
is a general medical-expense plan — a standalone หรือ rider เหมาจ่าย product covering IPD,
mostly with OPD as a buy-up. Checked against the schema (`_example-standalone.yaml`,
`_example-rider.yaml`) and against the file names in `data/plans/`, none of the following
product categories has a single record, and this pass looked for whether a publishable one
(real premium table, primary source) exists anywhere in the Thai market:

### 3a. Standalone dental — no publishable product found

The only lead found is Falcon Insurance's **i-Dental**, an insurer already in the dataset
(`falcon-health-ox-plan1.yaml`). A third-party site describes a live dental plan at 482
บาท/month, but that site is a broker/aggregator and cannot be cited for any figure per
`CONTRIBUTING.md`. Checked directly against Falcon's own site today: `i-Dental` does **not**
appear in the current site navigation —

> `/accident-health`, `/accident-health/health-o-x-plan`, `/accident-health/ismart-health-oa`,
> `/accident-health/iwill-1`, `/accident-health/pa-new-isure-plus3`,
> `/accident-health/pa-save-save`, `/accident-health/travel2go`,
> `/accident-health/travel-accident`, `/accident-health/group-personal-acc`

https://falconinsurance.co.th/accident-health (fetched 2026-08-12; this is the complete
list of links under Falcon's own `accident-health` hub page — no dental product among them)

**Disposition: not found on a primary source as of today. Either Falcon discontinued
i-Dental, moved it off this hub, or it never had a dedicated primary-sourceable page — any
of the three means it cannot go in `data/plans/` right now. Worth a five-minute re-check by
a human with a real browser before writing this off completely, since a JS-rendered product
catalogue (the same pattern documented for several round-3 insurers) could be hiding it from
`curl`.**

### 3b. Standalone OPD — none found

No insurer researched across all eleven files in this directory sells outpatient-only cover
as an independent product with its own premium line; every OPD benefit found is a buy-up
attached to an IPD host (Pacific Cross's `หมวด` add-ons, Ocean Life's OCHI OPD endorsement,
Generali's หมวด 16 tier). This is consistent with the general shape of the Thai market this
project has already documented, not a new finding.

### 3c. Standalone critical-illness / cancer — intentionally out of scope, not a gap

Several fully-priced CI/cancer products exist and were found and rejected on scope grounds,
not on a sourcing gap: MSIG Cancer Fix (`round3-health-specialists-sourcing.md`, "Full rate
table published, but a dread-disease lump sum — no IPD limit exists to record"), Indara's
three cancer plans, KWI's cancer plans, AIG's iCancer. All pay a lump sum on diagnosis
rather than actual medical expense, which the schema's `ipd_annual_limit_thb` and
`ipd_limit_basis` fields cannot represent honestly. **This is a scope decision already made
and repeatedly re-confirmed, not an open gap** — adding one would require a schema change
this file is not proposing.

### 3d. Maternity rider — not found as a separate line item, and not exhaustively searched

No file in this directory records a maternity/childbirth benefit as its own priced rider.
It was not the subject of a dedicated search in this pass either — the closest thing found
is Generali Gen Extra Health Care's child-must-pair-with-parent rule
(`round3-life-major-sourcing.md` §3b), which is an eligibility condition, not a maternity
benefit. **Open**, not ruled out.

### 3e. Standalone mental health — not found; the only mention is a copay line

The only place mental health appears anywhere in this project's sourcing is buried inside
Chubb Life's 3D Health Excellence benefit schedule, as one of several ancillary categories
carrying its own copay rate:

> ข้อ 2 ความคุ้มครองสุขภาพจิต(1) (ค่าใช้จ่ายร่วม 20%)

`round3-life-major-sourcing.md` line 627, sourced from Chubb's own brochure. Chubb Life has
no published premium at all (§1d above), so this benefit is unreachable regardless. No
standalone mental-health product, and no other insurer's mental-health benefit, was found.

### 3f. International / expat tiers — partially covered already, and a scope question

Pacific Cross — already the dataset's biggest single insurer by record count, five plans —
publishes worldwide-coverage tiers within its existing range (`pacificcross-ultima-plus`
and others carry global coverage options per `round3-health-specialists-sourcing.md` §1).
**This category is not empty**, which the brief's framing ("standalone... international/
expat health plan") could obscure if read as "zero coverage." What is genuinely absent is
any product from a globally-branded international insurer — Cigna Global, Bupa Global,
Allianz Care, April International. This pass did not find one, but for a structural reason
already established by three separate rejections in this project: Cigna, Aetna and Bupa all
confirmed **do not operate a Thai-licensed retail entity under those names**
(`standalone-health-sourcing.md` §5, `round3-health-specialists-sourcing.md` §3). A product
sold under a global brand to Thailand-based expats, if one exists, would be underwritten by
a foreign entity outside the OIC's licensing regime this project's other 37 records all sit
inside — the README does not explicitly restrict sourcing to OIC-licensed insurers, but
every record to date is one. **This is a scope question for whoever maintains this project,
not a sourcing gap this file can close: decide first whether an internationally-underwritten
plan sold into Thailand belongs in this dataset at all, then research it.**

---

## 4. Candidates worth a full data-entry pass next, in priority order

1. **ไทยพาณิชย์ประกันชีวิต (SCB Life)** — never checked in any prior round, a top-tier
   bancassurance insurer, with a live product ecosystem at `scblife.co.th` /
   `play.scblife.co.th` that this pass did not have time to fully open. Highest-value single
   target in this entire file.
2. **สินมั่นคงประกันภัย (Synmunkong), เทเวศประกันภัย (Deves), อาคเนย์ประกันภัย (Southeast,
   non-life), ไทยประกันภัย (Thai Insurance PCL)** — four established non-life carriers,
   never screened even once, same size class as the `round3-nonlife-b` batch that
   ultimately found nothing but is the right comparison point for how to screen them fast.
3. **Falcon i-Dental** — re-check with a real browser (not `curl`) in case it is a
   JS-rendered page this pass's tooling could not see; the only concrete standalone-dental
   lead found anywhere in this project.
4. **โตเกียวมารีนประกันชีวิต (Tokio Marine Life)** — still blocked by an Incapsula WAF as of
   `round3-life-major-sourcing.md` §2; a human opening
   `https://www.tokiomarine.com/th/th/life/products/personal/riders/health/tokio-good-health-prime.html`
   in a real browser remains a ten-minute task nobody has done yet.
5. **ธนชาตประกันชีวิต (licence 1020)** — identity now genuinely unresolved (§2c); confirm
   whether it is dormant, renamed, or simply has a domain this pass did not find, before
   spending research time on it either way.
6. **Maternity rider — a dedicated search**, not attempted in any round including this one.
7. **บางกอกสหประกันชีวิต, สหประกันชีวิต, แอ๊ดวานซ์ไลฟ์, อาคเนย์ประกันชีวิต, ไทยคาร์ดิฟ** —
   five smaller life licences never checked; lowest priority of the licensee gaps because
   of size, but genuinely untouched.
8. **Standalone mental-health and standalone OPD** — searched in this pass and found empty;
   worth one more dedicated round before concluding they structurally do not exist in the
   Thai retail market, since this pass's search was not exhaustive.
