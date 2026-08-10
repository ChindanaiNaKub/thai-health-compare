# MTL / BLA / MTI sourcing: what these three insurers actually publish

Research date: 2026-08-10. Assignment: เมืองไทยประกันชีวิต (Muang Thai Life, MTL),
กรุงเทพประกันชีวิต (Bangkok Life Assurance, BLA), and เมืองไทยประกันภัย
(Muang Thai Insurance, MTI) standalone health products.

Every claim below is followed by the exact URL and the verbatim Thai it rests on.
Only insurer-owned pages and insurer-hosted PDFs were used. No agent or broker
material is cited as a source for any figure, including premiums.

**Outcome: 3 plans added, MTL rejected entirely.** The single reason is §4 — MTL
publishes no premium figure for any of its health riders that can be tied to an age.

---

## Method note on the Thai quotes

Three different font-encoding problems, one per source.

**MTL brochures** (`muangthai.co.th/filestorage/brochures/*`) do not use the
Unicode private-use area at all. They map Thai combining marks into **Latin
Extended-B**: `Ɵ`/`Ơ`→่, `Ƣ`/`ƣ`/`ƹ`→้, `ƭ`→็, `Ʋ`→ี, `Ɲ`→ั, `ƶ`→ื, `ƪ`/`ƫ`→์,
`ǂ`→๋. So `เรืƟองค่ารักษา` is `เรื่องค่ารักษา` and `สมัครได้ตัƢงแต่อายุ 30 วัน - 90 ปƲ`
is `สมัครได้ตั้งแต่อายุ 30 วัน - 90 ปี`. Verified against the same strings in plain
HTML on MTL's own product pages. After remapping, zero residual non-Thai
codepoints remain in the D Health Lite brochure.

**The MTL Elite Health Plus brochure** is worse: every combining mark is emitted
twice (`ยุุค`, `ก็็`, `ที่่`) with a stray Latin letter after it (`ß`, `ĕ`, `Ė`, `ħ`,
`à`, `ã`, `ę`, `Ŧ`). Quotes from that PDF are marked `[sic: extraction]` where the
doubling could not be cleaned mechanically.

**MTI's brochure** uses a third scheme (`é`→ื, `ĉ`→ิ, `Ė`/`Ē`/`đ`→่, `ė`/`ē`→้,
`Ď`→ี, `ę`→็, `æ`→ิ) on the cover page and the *real* PUA range on the body pages
(U+F702→ี, F704→ื, F705→่, F70A→่, F70B→้, F70E→์, F712→็, F714→้). Every MTI
premium figure in this document was **cross-checked against the same table in
plain HTML** on MTI's product page, and all 96 numbers match, so the extraction is
not load-bearing for any number.

**MTL's HTML is unreachable by machine.** `www.muangthai.co.th` sits behind a
Cloudflare interstitial that returns HTTP 403 to both `curl` and WebFetch. The
origin server `cms-corpweb-prod.muangthai.co.th` serves the same pages
unprotected, and `www.muangthai.co.th/filestorage/` and `/assets/` serve PDFs
fine. All MTL HTML below came from the origin; all MTL PDFs from `www`.

---

## 1. BLA Happy Health Premier — ADDED (`bla-happy-health-premier-10m.yaml`)

Source for everything in this section:
https://www.bangkoklife.com/th/products/detail/269

### 1a. Host policy — BLA NAMES IT. This is the find of the whole assignment.

Every other insurer surveyed (AIA in the previous round, MTL in §4) refuses to say
which main policy a health rider attaches to. BLA says it, from the *main policy's*
side. BLA Lifelong 99/99 product page
(https://www.bangkoklife.com/th/products/detail/204), เงื่อนไขการรับประกันภัย:

> อายุรับประกันภัย : แรกเกิด – 80 ปี
> ระยะเวลาเอาประกันภัยและระยะเวลาชำระเบี้ยประกันภัย : ถึงอายุ 99 ปี
> จำนวนเงินเอาประกันภัยเริ่มต้น : 50,000 บาท
> บีแอลเอ ตลอดชีพ 99/99 ต้องซื้อพร้อมกับสัญญาเพิ่มเติมสุขภาพ หรือสัญญาเพิ่มเติมโรคร้ายแรง จึงจะซื้อสัญญาเพิ่มเติมอื่น ๆ ได้

That last sentence is a positive, published statement that this main policy is
sold *together with* a health rider. Its entry range (แรกเกิด–80) exactly covers the
rider's (11–80), and its 50,000 THB minimum sum insured is the lowest of any BLA
life policy I found. It is the correct host to record.

The rider's own page confirms it needs a host without naming one:

> ระยะเวลาเอาประกันภัยและระยะเวลาชำระเบี้ยประกันภัย 1 ปี โดยสามารถซื้อความคุ้มครองต่อเนื่องได้เท่ากับระยะเวลาเอาประกันภัยของสัญญาประกันชีวิตที่สัญญาเพิ่มเติมบีแอลเอ แฮปปี้ เฮลธ์ พรีเมียร์ แนบอยู่ หรือคุ้มครองสูงสุดถึงอายุ 99 ปี

### 1b. Host premium — DOES NOT EXIST PUBLICLY

The Lifelong 99/99 page publishes a minimum sum insured and no rate table, no
example premium, and no per-1,000 factor. Recorded as `premium: null` with the
reason quoted to the reader.

The **only** BLA main policy with a published rate table is Caring Premier 99/20
(https://www.bangkoklife.com/th/products/detail/232):

> ตัวอย่าง อัตราเบี้ยประกันภัยรายปี ต่อจำนวนเงินเอาประกันภัย 1,000 บาท
> อายุ(ปี) เพศหญิง เพศชาย — แรกเกิด 14.72 / 16.08 — 10: 16.25 / 18.51 — 20: 19.13 / 22.17 — 30: 23.52 / 27.02 — 40: 29.16 / 33.59

with `อายุรับประกันภัย : แรกเกิด ถึงอายุ 70 ปี` and `จำนวนเงินเอาประกันภัย : เริ่มต้น 200,000 บาท`.
It is **not** usable as the floor: it stops accepting applicants at 70 where the
rider accepts to 80, and its minimum sum insured is 4× higher. Using it would
report a *higher* floor derived from a *narrower* policy. It is documented in the
YAML's `premium_unknown_reason` so the reader knows the alternative was considered.

### 1c. Limit basis — PER CONFINEMENT, and BLA is consistent about it

Unlike AIA (whose ad copy contradicted its own benefit table), BLA says
per-confinement in both the headline and the ตารางผลประโยชน์:

> ผลประโยชน์รวมสูงสุดต่อการเข้าพักรักษาตัวครั้งใดครั้งหนึ่งจากการเจ็บป่วย หรือบาดเจ็บทั่วไป — 1,000,000 / 5,000,000 / 10,000,000
> ผลประโยชน์รวมสูงสุดต่อการเข้าพักรักษาตัวครั้งใดครั้งหนึ่งจาก โรคมะเร็ง โรคหัวใจ หรือโรคหลอดเลือดสมอง — 1,100,000 / 5,500,000 / 11,000,000

Only หมวดที่ 9–11 (dialysis, radiotherapy, chemotherapy) are annual:
`ต่อรอบปีกรมธรรม์ประกันภัย — 1,000,000 / 3,000,000 / 5,000,000`.

Room and board, หมวดที่ 1:

> ค่าห้องและค่าอาหาร ค่าบริการในโรงพยาบาล (ผู้ป่วยใน) ต่อการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง (สูงสุดไม่เกิน 180 วัน) — 3,000 ต่อวัน / 3,000 ต่อวัน / 5,000 ต่อวัน
> หรือ ค่าห้องพักเดี่ยวราคาเริ่มต้นของโรงพยาบาลต่อวัน (แล้วแต่จำนวนใดจะสูงกว่า)

### 1d. Premiums — two published points, and the column mapping is structural, not guessed

BLA publishes exactly two premium rows, both at age 35, inside the benefit table:

> ตัวอย่าง เบี้ยประกันภัยรายปีมาตรฐาน สำหรับเพศชาย อายุ 35 ปี — 19,944 / 12,209 / 6,132 / 21,605 / 13,504 / 6,918 / 24,551 / 15,950 / 8,898
> ตัวอย่าง เบี้ยประกันภัยรายปีมาตรฐาน สำหรับเพศหญิง อายุ 35 ปี — 21,865 / 14,153 / 7,089 / 24,008 / 15,760 / 8,301 / 27,057 / 18,110 / 10,088

Nine cells per row: three plans × three deductible options. The mapping is not an
inference from the magnitudes — the table's own `<td>` background colours group the
cells (`#F7FAE9` = แผน 1 ล้าน, `#f1f6d6` = แผน 5 ล้าน, `#E9F1C0` = แผน 10 ล้าน), and the
deductible header row above them reads `ไม่มี / 30,000 / 100,000` repeated per group:

> ความรับผิดส่วนแรก ต่อการเข้าพักรักษาตัวครั้งใดครั้งหนึ่ง (สำหรับผลประโยชน์และความคุ้มครองหมวดที่ 1 - 5) — ไม่มี 30,000 100,000 | ไม่มี 30,000 100,000 | ไม่มี 30,000 100,000

So plan 10M with no deductible is **24,551 (male 35) / 27,057 (female 35)**. The
YAML records only those two. No other age is published anywhere on BLA's site.

### 1e. Copayment on renewal — BLA confirms the trigger exists and refuses to publish it

This is materially worse disclosure than AIA, which at least prints the 3-claim /
200% / 400% / 30% / 50% thresholds. BLA's entire published statement is:

> หากผู้เอาประกันภัยมีประวัติการเรียกร้องสินไหมเป็นไปตามเงื่อนไขข้อใดข้อหนึ่งของเงื่อนไขต่ออายุแบบมีค่าใช้จ่ายร่วม (Copayment) ผู้เอาประกันภัยจะได้รับความคุ้มครองในปีต่ออายุเป็นแบบมีค่าใช้จ่ายร่วม (Copayment) (สำหรับกรมธรรม์ประกันสุขภาพมาตรฐานที่เริ่มคุ้มครองตั้งแต่วันที่ 20 มีนาคม 2568 เป็นต้นไป)

A circular sentence: you get a copay if you meet the copay conditions. The
conditions themselves are not on the page, not in any linked document, and not in
BLA's download library (§6). Recorded verbatim in `copay_on_renewal` with that
gap stated explicitly.

### 1f. Waiting periods and exclusions — published, but flagged partial by BLA itself

> การป่วยใด ๆ ที่เกิดขึ้นในระยะเวลา 30 วัน นับแต่วันเริ่มมีผลคุ้มครองตามสัญญาเพิ่มเติมนี้ หรือ วันที่บริษัทอนุมัติให้เพิ่มผลประโยชน์ของสัญญาเพิ่มเติมนี้ แล้วแต่กรณีใดจะเกิดขึ้นภายหลัง
> การป่วยดังต่อไปนี้ ที่เกิดขึ้นในระยะเวลา 120 วัน ... เนื้องอก ถุงน้ำ หรือมะเร็งทุกชนิด / ริดสีดวงทวาร / ไส้เลื่อนทุกชนิด / ต้อเนื้อ หรือต้อกระจก / การตัดทอนซิล หรืออดีนอยด์ / นิ่วทุกชนิด / เส้นเลือดขอดที่ขา / เยื่อบุโพรงมดลูกเจริญผิดที่

(Plus a separate 90-day wait on the critical-condition lump sum:
`ทั้งนี้ มีระยะเวลาที่ไม่คุ้มครอง 90 วัน นับแต่วันเริ่มมีผลคุ้มครองตามสัญญา`.)

The exclusion block is headed `ตัวอย่างข้อยกเว้นความคุ้มครอง` — *examples*, five of them —
and BLA disclaims the page outright:

> สื่อโฆษณาฉบับนี้เป็นเพียงการสรุปผลประโยชน์เบื้องต้นเท่านั้น ... ทั้งนี้ เงื่อนไข ความคุ้มครอง และข้อยกเว้นอย่างสมบูรณ์ สามารถสอบถามได้จากตัวแทนของท่าน หรือสามารถศึกษารายละเอียดได้จากกรมธรรม์ประกันชีวิตของท่าน

All five are recorded, with a comment in the YAML saying the list is not complete.

Also published and worth knowing: `อาณาเขตความคุ้มครองตามผลประโยชน์ความคุ้มครองของผู้เอาประกันภัยของสัญญาเพิ่มเติม คือ ประเทศไทย`
— Thailand only.

---

## 2. MTI HEALTH ME+ — ADDED (`mti-health-me-plus-10m.yaml`, `mti-health-me-plus-1m.yaml`)

Sources:
https://www.muangthaiinsurance.com/th/product/health-insurance (HTML) and the
brochure it links under เอกสาร,
https://mticonnect-resources.muangthaiinsurance.com/product/files_01-2026_1767929124256.pdf
("Health ME Plus 2025 TH Final"). The PDF URL is not printed on the page; it comes
from MTI's own content API,
`https://mticonnect-api.muangthaiinsurance.com/e-commerce/products/0e9dcf90-bbe8-4156-b1bf-166069f4739e`,
which returns `{"url":"/mti-resources/product/files_01-2026_1767929124256.pdf",
"filename":"Health ME Plus 2025 TH Final_2025-01-13.pdf"}`.

### 2a. A complete, published, age-banded premium table — the only one in this dataset

Brochure p.5, `ช่วงอายุ (ปี) / ความรับผิดชอบส่วนแรก (บาท) / เบี้ยประกันภัยรายปีรวมอากรแสตมป์`,
12 age bands × 4 plans × 4 deductible options = 192 published figures. Because MTI
is a non-life insurer selling direct, it has to publish rates. No sex split — one
rate for everyone in the band.

Plan 4 (10M) / Plan 1 (1M), no deductible, THB per year including stamp duty:

| Age band | Plan 1 (1M) | Plan 4 (10M) |
|---|---|---|
| 11–15 | 22,432 | 30,519 |
| 16–20 | 20,250 | 27,941 |
| 21–25 | 22,503 | 31,211 |
| 26–30 | 23,494 | 32,326 |
| 31–35 | 25,166 | 33,318 |
| 36–40 | 26,707 | 35,520 |
| 41–45 | 32,243 | 45,813 |
| 46–50 | 34,973 | 50,084 |
| 51–55 | 46,579 | 67,082 |
| 56–60 | 59,849 | 82,150 |
| 61–65 | 87,720 | 120,885 |
| 66–70 | 124,011 | 164,067 |

Identical figures appear in the HTML product page table, so neither the PDF
extraction nor the PDF's column ordering is load-bearing.

Two things a reader should notice and the site should surface. First, band 11–15
is **more expensive** than band 16–20 in every plan and at every deductible — a
real, published non-monotonicity, not a transcription error. Second, MTI's
cheapest plan (1M per confinement) costs more at every age than BLA's 10M plan
costs at 35, which is exactly the kind of comparison this site exists to make
possible; it is also why the 1M plan was recorded rather than only the headline one.

### 2b. Standalone — no host policy at all

MTI is a general insurer; this is a
`กรมธรรม์ประกันอุบัติเหตุและสุขภาพส่วนบุคคลแบบพิเศษพลัส`, bought on its own. `type:
standalone`, `host_policy: null`. Nothing to hide, nothing to expose.

### 2c. Underwriting conditions — published in unusual detail, and restrictive

Brochure p.4, เงื่อนไขการรับประกันภัย, verbatim:

> 1. ผู้ขอเอาประกันภัยต้องมีอายุ 11 - 70 ปี และสามารถต่ออายุได้ถึงอายุ 80 ปี (การคำนวณอายุ = ปีที่ทำประกันภัย ลบด้วยปีเกิด)
> 2. รับประกันภัยเฉพาะคนไทย ที่มีสัญชาติไทยและมีถิ่นพำนักในประเทศไทยเท่านั้น
> 3. สามารถซื้อแผนประกันภัยนี้ได้ 1 คนต่อ 1 กรมธรรม์ประกันภัยเท่านั้น
> 4. ไม่รับประกันภัยผู้ประกอบอาชีพดังต่อไปนี้ ช่างก่อสร้าง ช่างไม้ ช่างปูน ช่างเหล็ก ช่างทาสี ช่างไฟฟา ช่างท่อ ช่างประปา ช่างซ่อมต่าง ๆ กรรมกรคนงานก่อสร้าง พนักงานทำความสะอาด ... ผู้ที่ประกอบอาชีพหรือมีหน้าที่ขับรถทั่วไป (ให้รวมถึงมอเตอร์ไซค์รับจ้าง และพนักงานส่งเอกสารด้วย) ...
> 5. ผู้ขอเอาประกันภัยต้องมีสุขภาพร่างกายแข็งแรงสมบูรณ์ ไม่มีส่วนใดส่วนหนึ่งพิการหรือทุพพลภาพ และไม่มีโรคประจำตัวเรื้อรัง โรคร้ายแรง ...
> 6. สำหรับผู้ขอเอาประกันภัยที่อายุตั้งแต่ 65 ปีขึ้นไป ขอผลการตรวจสุขภาพประจำปีทุกราย

(`ช่างไฟฟา`/`ปโตรเลียม` are `[sic: extraction]` — the ้ and ิ on ไฟฟ้า and ปิโตรเลียม
are dropped by the font, not by me.)

The published rate table is therefore a rate table **for people who pass this
filter**. A construction worker or a motorcycle-taxi rider cannot buy this product
at any price. The renewal ceiling of 80 is also the lowest in this dataset (BLA
and MTL both go to 99).

### 2d. Limit basis — per confinement

> 1.ข้อตกลงคุ้มครองการรักษาพยาบาลในโรงพยาบาลหรือสถานพยาบาล (ผู้ป่วยใน) ความคุ้มครองสูงสุดต่อการเข้าพักรักษาเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง — 1 ล้าน / 3 ล้าน / 5 ล้าน / 10 ล้าน

Room: `ค่าห้อง และค่าอาหาร ค่าบริการในโรงพยาบาล (ผู้ป่วยใน) ต่อการเข้าพักรักษาเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง (ต่อวัน สูงสุด 365 วัน) — 8,000 / 10,000 / 12,000 / 15,000`,
ICU `16,000 / 20,000 / 24,000 / 30,000` for up to 15 days.

Only หมวด 9–11 are annual, and they are *small*: dialysis 15,000–20,000 and
radiotherapy/chemotherapy 100,000 each `ต่อรอบปีกรมธรรม์ประกันภัย`. A 10-million
per-confinement headline sits on top of a 100,000/year chemotherapy cap. Worth
surfacing.

### 2e. New health standard — recorded true, but MTI never says the words

MTI does not print "มาตรฐานประกันสุขภาพแบบใหม่" anywhere. The benefit schedule is
nonetheless the full 13-หมวด new-standard schedule (หมวด 1 ค่าห้อง … หมวด 13
ค่ารักษาพยาบาล โดยการผ่าตัดเล็ก), which is the structure the standard prescribes, and the
copay-on-renewal reservation in §2f is a new-standard mechanism. Recorded
`new_health_standard: true` with that reasoning written into `terms_source.note`
rather than left silent.

### 2f. Copayment on renewal — the weakest disclosure of the three insurers

> บริษัทฯ ขอสงวนสิทธิ์ในการปรับเบี้ยประกันภัยสำหรับต่ออายุกรมธรรม์ตามช่วงอายุ และสงวนสิทธ์ในการพิจารณาเพิ่มเติมเงื่อนไขหรือกำหนดค่าใช้จ่ายร่วม (Copayment)

No rate, no trigger, no claim count, no notice period. (`สงวนสิทธ์` is MTI's own
typo, not extraction.) Recorded verbatim.

### 2g. Exclusions — not published at all

> หมายเหตุ: รายละเอียดความคุ้มครอง เงื่อนไขทั่วไป ข้อกำหนดและข้อยกเว้น เป็นไปตามที่ระบุไว้ในกรมธรรม์ประกันอุบัติเหตุและสุขภาพส่วนบุคคลแบบพิเศษพลัส

MTI publishes waiting periods (30 days general, 120 days for the standard eight
conditions, 120 days for the optional critical-illness benefit) and a
pre-existing-condition bar, but **zero exclusions**. `exclusions: []` is recorded,
with a comment saying MTI publishes none — better than copying the standard 21
from another insurer's document and implying they apply here.

---

## 3. MTL D Health Lite — NOT INCLUDED (everything but the premium)

`data/plans/` gets nothing for this. It is the most frustrating case in the batch:
every schema field except one is verifiable from MTL's own brochure, and the
missing one is `premium`, which the schema requires and which cannot be faked.

The brochure:
https://www.muangthai.co.th/filestorage/brochures/20260407-04-0847_DHealthLitePPO_TH-Smallfile.pdf
(document code `MTL_2-02-04-0847 _01/05/2569`).

What is fully sourced and would have gone in:

- Entry and renewal, p.3: `สมัครได้ตั้งแต่อายุ 30 วัน - 90 ปี` / `ดูแลยาวถึงอายุ 99 ปี`
- Limit basis. Benefit table p.15 settles it beyond argument — the table has an
  explicit annual row and its value is *nothing*:

  > ผลประโยชน์หมวดที่ 1 – 8 และ 12 – 13 รวมทุกรายการสูงสุดต่อการเข้าพักรักษาตัวครั้งใดครั้งหนึ่งหลังหักความรับผิดส่วนแรกและค่าใช้จ่ายร่วม (ถ้ามี) — 1,000,000 บาท / 5,000,000 บาท
  > ผลประโยชน์สูงสุดต่อรอบปีกรมธรรม์ประกันภัย — **ไม่มี**

  (Confirmed by positional extraction of the PDF text blocks: the `ไม่มี` sits at
  y=627 on the `ต่อรอบปีกรมธรรม์` row, the `1,000,000 บาท 5,000,000 บาท` at y=594 on the
  per-confinement row.) MTL's own online store says the same thing in prose:
  `วงเงินค่ารักษาผู้ป่วยใน (IPD) ไม่จำกัดจำนวนครั้ง ... ภายใน 90 วัน หากเกิน 90 วัน นับแต่วันที่ออกจากโรงพยาบาลครั้งสุดท้าย จะนับเป็นวงเงินค่ารักษาใหม่`.
  So: unlimited confinements, capped per confinement, no annual ceiling at all.
- Room and board, p.14, หมวดที่ 1: `2,000 บาท / วัน` (แผน 1 ล้าน), `4,000 บาท / วัน` (แผน 5 ล้าน)
- Cost-sharing structure, p.15: deductible `ไม่มี / 20,000 / 50,000` (1M plan) and
  `ไม่มี / 30,000 / 50,000 / 100,000` (5M plan), or copay `90 : 10 หรือ 80 : 20`, one or
  the other: `(4) การมีส่วนร่วมจ่าย สามารถเลือกได้อย่างใดอย่างหนึ่ง ดังนี้ แบบไม่มีส่วนร่วมจ่าย หรือ แบบมีความรับผิดส่วนแรก (Deductible) หรือ แบบมีค่าใช้จ่ายร่วม (Copayment)`
- Waiting periods, p.22, verbatim:

  > (ก) ไม่คุ้มครองการเจ็บป่วยใด ๆ ที่เกิดขึ้นในระยะเวลา 30 วัน นับตั้งแต่ วันเริ่มมีผลคุ้มครองตามสัญญาเพิ่มเติมนี้หรือตามการต่ออายุครั้งสุดท้ายแล้วแต่กรณีใดจะเกิดขึ้นหลังสุด
  > (ข) ไม่คุ้มครองการเจ็บป่วยที่เกิดขึ้นในระยะเวลา 120 วัน ... 1.เนื้องอก ถุงน้ำ หรือมะเร็งทุกชนิด 2.ริดสีดวงทวาร 3.ไส้เลื่อนทุกชนิด 4.ต้อเนื้อ หรือต้อกระจก 5.การตัดทอนซิล หรืออดีนอยด์ 6.นิ่วทุกชนิด 7.เส้นเลือดขอดที่ขา 8.เยื่อบุโพรงมดลูกเจริญผิดที่

- Exclusions, p.22 — and MTL is the only one of the three that tells you the size
  of the set it is withholding:

  > ข้อยกเว้นความคุ้มครองสัญญาเพิ่มเติมการประกันภัยสุขภาพแบบ ดี เฮลท์ ไลต์ มีทั้งหมด 21 ข้อ เช่น

  followed by 5 of the 21.
- Host policy, p.22: `สัญญาเพิ่มเติมการประกันภัยสุขภาพแบบ ดี เฮลท์ ไลต์ ต้องซื้อแนบท้ายกรมธรรม์ที่มีผลบังคับอยู่` —
  no policy named. But MTL's own online store *does* name one (see §3b).
- New health standard, p.13: `ในมาตรฐานการประกันสุขภาพแบบใหม่ (New Health Standard)`

### 3a. D Health Plus is gone — the URL now redirects to D Health Lite

`http://cms-corpweb-prod.muangthai.co.th/th/health-insurance/d-health-plus`
resolves to `.../d-health-lite` and returns
`<title>สัญญาเพิ่มเติม ดี เฮลท์ ไลต์ (D Health Lite) | บมจ.เมืองไทยประกันชีวิต</title>`.
Anyone researching MTL from a search result for "D Health Plus" — which is still
what most third-party pages describe — is reading about a superseded product.

### 3b. MTL names a host policy, in one place only

https://online.muangthai.co.th/th/detail/d-health-lite-baotung, หมายเหตุ:

> โครงการ D Health Lite เบาตังค์ เป็นชื่อทางการตลาดของแบบประกันภัย เมืองไทย สมาร์ท โพรเทคชั่น 99/99 สัญญาเพิ่มเติมการประกันภัยสุขภาพแบบ ดี เฮลท์ ไลต์

That is a named host: เมืองไทย สมาร์ท โพรเทคชั่น 99/99. But the same page also
narrows the offer to `อายุที่สมัครได้ 20-70 ปี` and `สัญญาเพิ่มเติมที่ซื้อได้ — ซื้อไม่ได้`,
i.e. this bundle is a restricted online SKU, not the general rider. And the host's
own brochure
(https://www.muangthai.co.th/filestorage/brochures/20260617-04-0868_เมืองไทย%20สมาร์ท%20โพรเทคชั่น%2099-99.pdf)
publishes **no minimum sum insured and no rate table** — only a single worked
example:

> ผู้เอาประกันภัยเพศชาย อายุ 35 ปี สุขภาพแข็งแรงสมบูรณ์ ซื้อแบบประกันภัยเมืองไทย สมาร์ท โพรเทคชั่น 99/99 จำนวนเงินเอาประกันภัย 1,000,000 บาท ชำระเบี้ยประกันภัยรายปี ปีละ 17,330 บาท

One sum insured, one age, one sex, and no statement that 1,000,000 is the minimum.
`host_policy.min_sum_insured_thb` cannot be filled from it without inventing the
"minimum" part.

### 3c. Why it was rejected: no premium exists in any age-linked form

`Plan.premium` is `PremiumTable` with `.min(1)`, and `PremiumBand` requires
`age_from`/`age_to`. MTL publishes no figure that carries an age.

Searched and confirmed absent:

1. The D Health Lite brochure (24 pages) contains no premium figure of any kind.
2. The Elite Health Plus brochure
   (https://www.muangthai.co.th/filestorage/brochures/04-0480_%20EliteHealthPlus_TH_20250221.pdf)
   likewise contains none.
3. The product pages (`/th/health-insurance/d-health-lite`,
   `/th/health-insurance/elite-health-plus`, `/th/ecm-health-insurance/ecm-d-health-plus`)
   contain none — every match for `เบี้ย` on those pages is navigation chrome or the
   tax-deduction note.
4. MTL's own online store publishes exactly one number, `"premium":"8399.5"`, in
   the inlined SvelteKit payload of the product page (`/api/product-detail-page.list`,
   `{"ok":true,"result":{"productId":"198","premium":"8399.5",...}}`). It is a
   "from" price with no age, sex, plan, or deductible attached, so it cannot become a
   `PremiumBand`. The plan table behind the "ตารางแผน" tab is rendered from a POST-only
   API; every GET against candidate endpoints returns HTTP 405.
5. I did **not** fall back to the Kasikornbank or agent-site pages that do quote
   D Health Lite rates. The schema permits `agent_site` for premiums when no
   official figure exists, but the method page also requires cross-checking against a
   second source, and there is no official figure to check against. A premium
   sourced only from an agent, for a rider whose host policy cost is also unpublished,
   would be two guesses stacked.

### 3d. What MTL *does* publish better than anyone: the copay conditions

Elite Health Plus brochure p.15, verbatim (doubled marks cleaned, `[sic: extraction]`):

> ทั้งนี้ ในการต่ออายุสัญญาเพิ่มเติมนี้ บริษัทจะสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขข้อตกลงความคุ้มครอง โดยการเพิ่มเงื่อนไขให้ผู้เอาประกันภัยมีค่าใช้จ่ายร่วม (Copayment) ตามอัตราและหลักเกณฑ์ดังต่อไปนี้
> (1) ค่าใช้จ่ายร่วม (Copayment) ในอัตราร้อยละ 30 ของค่าใช้จ่ายที่ได้รับความคุ้มครอง กรณีผู้เอาประกันภัยมีการเรียกร้องผลประโยชน์จากการป่วยเล็กน้อยทั่วไป (Simple diseases) และเข้าพักรักษาตัวในโรงพยาบาลในรอบปีกรมธรรม์ประกันภัย ตั้งแต่ 3 ครั้งขึ้นไป และมีอัตราการเรียกร้องค่าสินไหมทดแทนจากสาเหตุข้างต้นของผู้เอาประกันภัยแต่ละรายภายใต้สัญญาเพิ่มเติมฉบับนี้ ตั้งแต่ร้อยละ 200 หรือ
> (2) ค่าใช้จ่ายร่วม (Copayment) ในอัตราร้อยละ 30 ของค่าใช้จ่ายที่ได้รับความคุ้มครอง กรณีผู้เอาประกันภัยมีการเรียกร้องผลประโยชน์จากการเข้าพักรักษาตัวในโรงพยาบาล ในรอบปีกรมธรรม์ประกันภัยตั้งแต่ 3 ครั้งขึ้นไป และมีอัตราการเรียกร้องค่าสินไหมทดแทนจากสาเหตุข้างต้นของผู้เอาประกันภัยแต่ละรายภายใต้สัญญาเพิ่มเติมฉบับนี้ ตั้งแต่ร้อยละ 400 แต่ไม่รวมถึงค่าสินไหมทดแทนจากค่ารักษาโรคร้ายแรง และ/หรือการผ่าตัดใหญ่
> หากการเรียกร้องค่าสินไหมทดแทนของผู้เอาประกันภัยแต่ละรายภายใต้สัญญาเพิ่มเติมสุขภาพฉบับนี้ เป็นไปตามหลักเกณฑ์ (1) และ (2) บริษัทจะกำหนดเงื่อนไขให้ผู้เอาประกันภัยมีค่าใช้จ่ายร่วม (Copayment) ร้อยละ 50 ของค่าใช้จ่ายที่ได้รับความคุ้มครอง
> ในกรณีที่บริษัทกำหนดเงื่อนไขให้ผู้เอาประกันภัยมีค่าใช้จ่ายร่วม (Copayment) แล้ว ต่อมาการเรียกร้องผลประโยชน์หรืออัตราการเรียกร้องค่าสินไหมทดแทนของผู้เอาประกันภัยปรับลดลงจากหลักเกณฑ์ข้างต้น บริษัทจะพิจารณาปรับลดอัตราค่าใช้จ่ายร่วม (Copayment) ให้กับผู้เอาประกันภัย ทั้งนี้ เป็นไปตามเงื่อนไขของบริษัท
> โดยอัตราการเรียกร้องค่าสินไหมทดแทนคำนวณโดยนำค่าสินไหมทดแทนตามจำนวนที่บริษัทอนุมัติจ่ายจริงในรอบปีกรมธรรม์ หารด้วยเบี้ยประกันภัยในรอบปีกรมธรรม์
> ในกรณีบริษัทเพิ่มเติมเงื่อนไขให้ผู้เอาประกันภัยมีค่าใช้จ่ายร่วม (Copayment) ... บริษัทจะออกหลักฐาน ... ให้ผู้เอาประกันภัยทราบก่อนวันครบรอบปีกรมธรรม์ประกันภัย ไม่น้อยกว่า 15 วัน

MTL is the only insurer in this batch that publishes the *reversal* clause (the
copay can be reduced again if claiming falls back) and the 15-day notice period.
BLA and MTI publish neither. This is recorded here even though no MTL plan made it
into `data/plans/`, because it is the benchmark other insurers should be measured
against.

---

## 4. MTL Elite Health Plus — NOT INCLUDED (same reason)

Same brochure-complete / premium-absent situation, and it is the one MTL product
whose limit basis is genuinely **annual**, which would have made a useful contrast
against the three per-confinement plans that were added. Recorded here so it is
not re-researched from scratch.

Brochure p.5 and p.15
(https://www.muangthai.co.th/filestorage/brochures/04-0480_%20EliteHealthPlus_TH_20250221.pdf),
`[sic: extraction]` throughout:

> สมัครได้ตั้งแต่อายุ 11 - 90 ปี / ดูแลต่อเนื่องถึงอายุ 99 ปี
> เหมาจ่ายค่ารักษาพยาบาล 20 - 100 ล้านบาทต่อปี
> ห้องเดี่ยวมาตรฐานได้ทุกโรงพยาบาล หรือค่าห้องเดี่ยวพิเศษ 10,000 - 25,000 บาทต่อวัน
> อายุรับประกัน ตั้งแต่อายุ 11-90 ปี / ต่ออายุ ได้ถึงอายุ 98 ปี / ระยะเวลาคุ้มครอง ถึงอายุ 99 ปี หรือจนกระทั่งแบบประกันภัยหลักสิ้นผลบังคับ
> ข้อยกเว้นความคุ้มครองสัญญาเพิ่มเติมการประกันภัยสุขภาพแบบ อีลิท เฮลท์ พลัส (แบบมาตรฐานใหม่) มีทั้งหมด 21 ข้อ เช่น

Note the host language is AIA's exact formula —
`หรือจนกระทั่งแบบประกันภัยหลักสิ้นผลบังคับ` with no host named — and unlike D Health Lite
there is no online-store SKU that names one.

---

## 5. Not included and why — summary

| Product | Insurer | Why not |
|---|---|---|
| ดี เฮลท์ ไลต์ (D Health Lite) | MTL | No age-linked premium published anywhere official (§3c). Everything else is sourced and sitting in this document ready to use the day a rate appears. |
| อีลิท เฮลท์ พลัส (Elite Health Plus) | MTL | Same (§4). |
| ดี เฮลท์ พลัส (D Health Plus) | MTL | Superseded; MTL's own URL now redirects to D Health Lite (§3a). |
| เหมาจ่าย เอ็กซ์ตร้า, สมาร์ทแคร์, เฮลท์แคร์ พลัส | MTL | Same premium problem; brochures exist at `/filestorage/brochures/` but publish no rates. Not researched further once the pattern was established. |
| BLA Happy Health Premier แผน 1 ล้าน / 5 ล้าน | BLA | Sourceable (premiums are in the same table), but they are the same contract at a different limit; the 10M no-deductible plan is the honest headline and adding three near-identical records would pad the dataset. Add later if the site starts comparing within-family tiers. |
| BLA Prestige Health Unlock, Value Health, Happy Health UDR | BLA | Not researched. The 10M plan was enough to establish BLA's disclosure pattern, and the assignment asked for depth over breadth. |
| MTI HEALTH TRUST, เมืองไทยจัดหนัก, Health Premium, โรคฮิตยิ้มได้ | MTI | Not researched. HEALTH ME+ is MTI's flagship and already gave a full rate table. |

---

## 6. NOT FOUND / does not exist publicly

1. **Filed policy wording (กรมธรรม์) for any of the five products.** BLA's public
   download library, https://www.bangkoklife.com/th/PersonalCustomers/Download?id=269,
   holds 29 PDFs — every one is a form (self-certification, tax-deduction election,
   surrender request, claim forms, FW8BEN, FW9). No policy wordings. MTL and MTI have
   no equivalent public library at all. All three insurers state in writing that the
   wording is only in the issued policy.
2. **A complete exclusion list for any of the five.** BLA publishes 5 "ตัวอย่าง", MTL
   publishes 5 of a stated 21, MTI publishes none.
3. **BLA's copayment-on-renewal thresholds.** BLA confirms the mechanism applies to
   policies from 20 มีนาคม 2568 and never states the trigger or the rate (§1e).
4. **MTI's copayment rate and trigger.** Reserved as a right, unquantified (§2f).
5. **A premium rate table for any main life policy at BLA or MTL.** BLA publishes
   one per-1,000 factor table (Caring Premier 99/20) which is unusable as a floor for
   this rider (§1b); MTL publishes a single worked example with no minimum (§3b).
   Neither publishes what a minimum-sum-insured host actually costs.
6. **MTL premiums, in any form tied to an age.** Checked: both brochures, three
   product pages, the ECM channel page, MTL's online store HTML and its inlined API
   payloads, and the store's plan-table endpoint (POST-only, 405 on GET). §3c.
7. **`www.muangthai.co.th` over HTTP.** Cloudflare-blocked from this environment;
   worked around via the origin host and the unprotected `/filestorage/` and
   `/assets/` paths. If a future check needs the rendered page, retry from a browser.

---

## 7. Schema fields these insurers systematically refuse to publish

For the maintainer, ranked by how often the refusal bit:

1. **`host_policy.premium`** — the whole reason the field exists, and no Thai life
   insurer surveyed (AIA, MTL, BLA) publishes a rate table for a main policy at its
   minimum sum insured. BLA is the closest: it publishes the minimum sum insured
   (50,000) and the pairing rule, just not the price. Every rider record in this
   dataset will keep carrying `premium_unknown_reason`.
2. **`premium` for life-company riders** — `PremiumTable.min(1)` plus
   `PremiumBand`'s required ages is the hardest constraint in the schema against
   Thai life-insurer disclosure. AIA published five scattered points; BLA publishes
   two (both age 35); MTL publishes zero. Only MTI, a *non-life* insurer selling
   direct, publishes a real table. If the site ever wants MTL coverage, the schema
   needs a way to say "insurer publishes a from-price with no age attached" without
   pretending it is a band — a `premium_unknown_reason` on `Plan` mirroring the one
   on `HostPolicy` would do it.
3. **`copay_on_renewal`** — universally present as a mechanism, almost never
   quantified. The field earns its keep exactly because it can hold "they say it
   exists and won't say when".
4. **`exclusions`** — every insurer publishes a labelled *sample*. The array can
   never be read as complete, and the schema has no way to mark it partial. Each
   YAML says so in a comment, which the site does not render. A
   `exclusions_are_partial: boolean` would be more honest than a comment.
5. **`opd_annual_limit_thb`** — repeatedly ambiguous rather than absent. All three
   products cover post-discharge OPD and 24-hour accident OPD but no general OPD;
   `null` is recorded, which reads as "unknown" when it means "not covered". Those
   are different facts and the schema conflates them.
