# Round 5: SCB Life (ไทยพาณิชย์ประกันชีวิต) sourcing — the company merged out of existence in 2020

Research date: 2026-08-12. Assignment: close the single highest-priority gap
`round4-gap-analysis.md` §2b/§4 identified — บริษัท ไทยพาณิชย์ประกันชีวิต จำกัด (มหาชน)
(SCB Life), OIC licence 1012, flagged as "never checked — checked, rejected, or
otherwise — in any of the eleven files in this directory before today," with a
first-pass sighting of a live product ecosystem at `scblife.co.th`,
`scb.co.th/th/personal-banking/insurance`, and `play.scblife.co.th`.

Every claim below is followed by the exact URL and the verbatim Thai it rests on.
Only insurer-owned domains — `scb.co.th` and, once the underwriter identity became
the actual question, `fwd.co.th` — were used for product and company facts. No
broker or agent site is cited for anything, premiums included (there are none to
cite). This file adds **zero** records to `data/plans/`.

**Outcome, in one line: SCB Life does not exist to research. It legally merged
into FWD Life Insurance PCL effective 1 ตุลาคม 2563 (1 October 2020) — nearly six
years before this pass — and every health product on `scb.co.th` today is
curl-exact confirmed underwritten by "บริษัท เอฟดับบลิวดี ประกันชีวิต จำกัด
(มหาชน)", an insurer already in this dataset (`fwd-allianz-sourcing.md`). The
domains round4 saw as evidence of a live SCB Life ecosystem — `scblife.co.th` and
`play.scblich.co.th` — are dead: they fail DNS resolution outright as of today.**

## Method note

1. `scblife.co.th`, `www.scblife.co.th`, and `play.scblife.co.th` all fail DNS
   resolution today. `getent hosts <domain>` returns nothing for all three, and a
   direct `curl` to each times out with no resolved address (checked 2026-08-12).
   Round4's citation of `play.scblife.co.th/landing/...` came from a search-engine
   cached page title, not a live fetch — that page's title is still indexed, but
   the domain behind it is gone. This is worth stating plainly since it is the
   exact evidence round4 used to justify SCB Life as "a live product ecosystem."
2. SCB's own current insurance hub lives at `www.scb.co.th/th/personal-banking/
   insurance/health-insurance` and its child pages, all HTTP 200 to a plain
   `curl` with a standard browser User-Agent — no Cloudflare interstitial, no
   client-rendered empty shell. The Thai body text on these pages is delivered as
   numeric HTML entities (`&#xE2A;&#xE04;&#xE1A;...`), decoded here with Python's
   `html.unescape()` and cross-checked against the same strings rendered by
   WebFetch — the two methods agree on every quote below.
3. FWD's own merger-history page (`fwd.co.th/th/merger/`) is what actually answers
   the identity question, so it is cited alongside `scb.co.th` even though the
   assignment named SCB Life — it is FWD's successor entity making the statement
   about its own corporate history, which is exactly the kind of primary,
   insurer-owned source this project requires.

---

## 1. The merger — verbatim, from the successor insurer's own site

FWD's Thailand merger-information page states the two companies' full legal
names and the effective date directly:

> บริษัท เอฟดับบลิวดี ประกันชีวิต จำกัด (มหาชน) ("FWD Life") และ บริษัทไทยพาณิชย์
> ประกันชีวิต จำกัด (มหาชน) ("SCB Life") ซึ่งทั้งสองบริษัทเป็นบริษัทในเครือกลุ่ม
> เอฟดับบลิวดี อยู่ในระหว่างควบรวมกิจการเพื่อรวมเป็นหนึ่งเดียวภายใต้บริษัทใหม่ชื่อ
> "บริษัท เอฟดับบลิวดี ประกันชีวิต จำกัด (มหาชน)" คาดว่าการควบรวมกิจการจะมีผลตั้งแต่
> วันที่ 1 ตุลาคม 2563 เป็นต้นไป

https://www.fwd.co.th/th/merger/ (fetched 2026-08-12, `curl`-exact, one of the
FAQ blocks under "ข้อมูลการควบรวมกิจการ")

This is unambiguous: SCB Life and FWD Life amalgamated into a single legal
entity retaining the FWD Life name, with the merger's own stated effective date
of 1 ตุลาคม 2563. There is no "SCB Life" left to hold a product, a rate table, or
filed wording under its own name — the entity itself stopped existing.

Background context (not load-bearing, not cited for any fact used in this
file's conclusion, English-language news reporting only): FWD Group agreed to
buy SCB's life insurance subsidiary in 2019 for a reported THB 92.7 billion,
alongside a 15-year bancassurance distribution agreement with the bank —
consistent in shape and date with the merger page's own account. Sources:
[Marketeer Online](https://marketeeronline.co/archives/111819),
[FWD Group's own press release](https://www.fwd.com/en/newsroom/press-releases/fwd-group-completes-acquisition-of-scb-life-assurance-and-enters-15-year-bancassurance-partnership/).
The FWD Group press release is itself an insurer-owned source and independently
corroborates the `fwd.co.th` merger page above.

## 2. Confirmed: today's "SCB" health products are FWD products wearing an SCB skin

Three health-insurance product pages were pulled directly from `scb.co.th`'s own
insurance hub (`www.scb.co.th/th/personal-banking/insurance/health-insurance`)
and fetched `curl`-exact. All three carry the identical underwriter disclosure,
word for word:

> รับประกันชีวิตโดย บริษัท เอฟดับบลิวดี ประกันชีวิต จำกัด (มหาชน) ธนาคารเป็นเพียง
> นายหน้าผู้ชี้ช่องให้ทำประกันภัยเท่านั้น การรับประกันภัยเป็นไปตามเงื่อนไข และ
> หลักเกณฑ์ของ บริษัท เอฟดับบลิวดี ประกันชีวิต จำกัด (มหาชน)

Found on:
- **SCB Health Elite** — https://www.scb.co.th/th/personal-banking/insurance/health-insurance/scb-health-elite.html
- **ประกัน OPD คุ้มครบ จบหายห่วง** — https://www.scb.co.th/th/personal-banking/insurance/health-insurance/opd-worry-free.html
- **ประกันเคลมคุ้มกลุ่มโรคร้าย (MCCI)** — https://www.scb.co.th/th/personal-banking/insurance/health-insurance/mcci.html

(all fetched and grepped `curl`-exact 2026-08-12; the sentence translates as
"Life-underwritten by FWD Life Insurance PCL. The bank is merely a broker
introducing the insurance — underwriting follows FWD Life Insurance PCL's own
terms and criteria.")

FWD Life Insurance PCL is already an insurer in this dataset — two plans,
sourced in `fwd-allianz-sourcing.md`. **There is no second, SCB-branded
underwriter behind any of these products.** The bank is a distribution channel,
not an insurer, exactly as the disclosure itself says.

## 3. No premium table on any of these three pages either — moot for SCB Life, a pointer for later

Independent of the identity question: none of the three pages fetched in §2
contains a premium figure of any kind in its `curl`-exact text. Searched for
and not found on any of the three: `บาท/ปี`, `บาทต่อปี`, `เบี้ยเริ่มต้น`,
`เบี้ยประกันภัยเริ่มต้น`. The SCB Health Elite page does publish entry-age and
renewal-ceiling figures —

> อายุรับประกันภัย : 11 - 75 ปี ระยะเวลาคุ้มครอง : ถึงอายุ 85 ปี

https://www.scb.co.th/th/personal-banking/insurance/health-insurance/scb-health-elite.html
(fetched 2026-08-12, `curl`-exact) — but no premium anywhere on the page, and a
brochure PDF is linked but was not opened in this pass since the underwriter
question, not the premium question, was this file's mandate. If these three
FWD-underwritten, SCB-distributed SKUs are distinct products from the two FWD
plans already in `data/plans/`, they would be a legitimate target for a future
FWD-focused sourcing pass — but that is a different insurer's assignment, not
this one's, and is noted here only as a pointer.

## 4. The pattern repeats: SCB's non-life arm went the same way, five years earlier

Not part of this file's mandate (SCB Life is a life insurer, licence 1012), but
worth recording since it explains why no non-life "SCB" health/PA product
exists either, and it matches a pattern this project has already documented
twice (Manulife → KWI, LMG → Chubb Samaggi amalgamation, both noted in
`round4-gap-analysis.md` §"Method note" item 4). SCB's non-life subsidiary,
ไทยพาณิชย์สามัคคีประกันภัย (Siam Commercial Samaggi Insurance PCL), is the same
company that trades today as Chubb Samaggi Insurance PCL — already in this
dataset (`falcon-health-ox-plan1.yaml`'s insurer group; Chubb Samaggi's own Long
Stay Visa plan is also in `data/plans/`). A financial-disclosure PDF still
hosted on Chubb's own domain, filed under the company's *former* name, shows
the identity directly in its own letterhead and footer:

> บริษัท ไทยพาณิชย์สามัคคีประกันภัย จำกัด (มหาชน) เปิดเผย ณ วันที่ 15 พฤษภาคม 2556
> ... บริษัท ไทยพาณิชย์สามัคคีประกันภัย จำกัด (มหาชน) 2/4 อาคารไทยพาณิชย์สามัคคี
> ประกันภัย ชั้น 12 โครงการนอร์ธปาร์ค ถนนวิภาวดีรังสิต แขวงทุ่งสองห้อง เขตหลักสี่
> กรุงเทพฯ 10210

https://www.chubb.com/content/dam/chubb-sites/chubb-com/th-th/about-chubb/financial-operational-status-chubb-samaggi/documents/pdf/2013_q1.pdf
(fetched 2026-08-12; the PDF itself is dated 2556/2013, so this is a historical
artifact preserved on the successor's own domain, not a current-status
document — it is cited only to confirm the entity-name chain, not for any
product fact.) The URL slug the file lives under —
`financial-operational-status-chubb-samaggi` — is itself Chubb's own
acknowledgment of the lineage. Background corroboration (not primary,
English-language news only): ACE Limited acquired a majority stake in Siam
Commercial Samaggi Insurance from SCB in 2014, and the company was renamed
Chubb Samaggi following ACE's acquisition of the Chubb Corporation in 2016.

**Both of SCB's former insurance arms — life and non-life — are gone as
independent brands, absorbed into FWD and Chubb Samaggi respectively, both
already represented in this dataset.** There is no "SCB" insurer left to add.

## 5. What this closes in `round4-gap-analysis.md`

This resolves round4 §4 item 1 (top priority) as a clean negative: licence 1012
(ไทยพาณิชย์ประกันชีวิต) is confirmed merged out of existence effective
1 ตุลาคม 2563, folded into FWD Life Insurance PCL (already in `data/plans/`).
The shape of this finding is identical to two precedents this project has
already logged — Cigna → Chubb Life (`standalone-health-sourcing.md` §5,
`round3-health-specialists-sourcing.md` §3c) and Manulife → KWI
(`round3-life-major-sourcing.md` §5) — a licensed name on the OIC's 2020 table
that had already stopped independently trading by the time anyone here looked
for it. Round4's own June-2020 OIC table (§"Method note" item 4) is dated
*before* the 1 ตุลาคม 2563 merger, which is exactly why the licence still
appeared live on that table and exactly why this is not a contradiction of that
file — it is the expected next step for a "floor, not a ceiling" table, stated
in round4's own terms.

**Verdict: NOT INCLUDED. Not a rejection on sourcing-quality grounds — there is
no company left to source.**

## 6. Still open — from `round4-gap-analysis.md` §4, unaffected by this file

Items 2–7 of round4's priority list (สินมั่นคง/เทเวศ/อาคเนย์(non-life)/ไทยประกันภัย
screening, Falcon i-Dental re-check, Tokio Marine Life's WAF block, ธนชาต
identity, a dedicated maternity-rider search, and the five never-checked minor
life insurers) were not touched by this pass and remain exactly as prioritized
there.
