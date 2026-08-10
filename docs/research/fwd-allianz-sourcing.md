# FWD and Allianz Ayudhya sourcing: FWD Prima Care, FWD Precious Care, and why no Allianz plan was added

Research date: 2026-08-10. Same rules as `aia-rider-sourcing.md`: every claim below is
followed by the exact URL and the verbatim Thai it rests on. Only FWD-owned and
Allianz-owned domains and their own hosted PDFs were used. No agent or broker material
is cited as a source for any figure, premium included.

## Method note on the Thai quotes

Unlike AIA's brochures, FWD's brochure PDFs carry a clean text layer. `PyMuPDF`
extracts them correctly with no private-use-area remapping needed. The only
extraction artefacts are that FWD's font renders ำ in some words as a decomposed
`ํ + า` (so "สำหรับ" extracts as "สําหรับ", "จำนวน" as "จํานวน", "น้ำ" as "นํ้า").
Those spellings are reproduced as extracted below and in the YAML. Numbers in the
benefit and premium tables were read positionally (word x/y coordinates) rather than
from reading-order text, because reading order scrambles multi-column tables — the
column x-centres are stated where a mapping is non-obvious.

Allianz's brochures are the opposite problem: most are scanned images with no text
layer at all. See §4.

---

## 1. FWD Prima Care (เอฟดับบลิวดี พรีม่า แคร์) — added as `fwd-prima-care-s`

Source document throughout: `TH_Brochure_Prima_Care_V1.pdf`, marked
`ฉบับปรับปรุงใหม่ มกราคม 2569` on p.1.

https://www.fwd.co.th/files/v3/assets/blt331c1aa12dcfd37a/blt3866802f75fca3b6/69521ad46ae381bb2f51eca9/TH_Brochure_Prima_Care_V1.pdf

Found via FWD's own PDF sitemap, https://www.fwd.co.th/sitemap-pdf.xml (509 URLs).
Note that https://www.fwd.co.th/robots.txt disallows `/*.pdf$` for Googlebot only, so
these documents are published but deliberately kept out of search results.

### 1a. Premium table — FWD publishes a real one, unlike AIA

This is the headline difference from the AIA records. FWD prints an actual grid, p.8,
`ตัวอย่างเบี้ยประกันภัยรายปี (ปีแรก)`, 3 ages × 2 sexes × 5 plans:

| อายุ | S ชาย | S หญิง | M ชาย | M หญิง | L ชาย | L หญิง | XL ชาย | XL หญิง | XXL ชาย | XXL หญิง |
|---|---|---|---|---|---|---|---|---|---|---|
| 30 | 5,300 | 6,800 | 8,500 | 11,100 | 12,400 | 16,000 | 17,300 | 22,400 | 22,000 | 28,500 |
| 40 | 6,300 | 8,200 | 10,200 | 13,300 | 14,800 | 19,200 | 20,700 | 26,900 | 26,300 | 34,200 |
| 50 | 7,900 | 10,200 | 12,800 | 16,600 | 18,500 | 24,000 | 25,900 | 33,600 | 32,900 | 42,800 |

Only the S column is recorded, as the cheapest plan in the family. Three ages is still
three ages — no interpolation was done for ages 31–39 or 41–49, and the whole-life
total remains uncomputable.

The conditions FWD attaches, verbatim from the same page:

> • เบี้ยประกันภัยรายปีสําหรับขั้นอาชีพ 1 และ 2
> • เบี้ยประกันภัยปรับตามอายุที่เพิ่มขึ้น
> • บริษัทฯ อาจจะปรับเปลี่ยนเบี้ยประกันภัย ณ วันครบรอบปีกรมธรรม์เนื่องมาจากปัจจัยต่างๆ ได้แก่ อายุ ขั้นอาชีพ ค่าใช้จ่ายในการรักษาพยาบาลที่สูงขึ้น หรือจากประสบการณ์การจ่ายสินไหมทดแทนโดยรวมของสัญญาเพิ่มเติมนี้ โดยบริษัทฯ จะแจ้งให้ผู้เอาประกันภัยทราบเป็นลายลักษณ์อักษรไม่น้อยกว่า 30 วัน ทั้งนี้ เบี้ยประกันภัยที่มีการปรับจะต้องอยู่ในอัตราที่ได้รับความเห็นชอบจากนายทะเบียนแล้ว

### 1b. Host policy — FWD does not publish a list either

p.6, `เงื่อนไขการรับประกันภัย`:

> อายุรับประกันภัย — 16 – 70 ปี (ต่ออายุได้สูงสุดถึงอายุ 98 ปี)
> ระยะเวลาคุ้มครอง — ถึงอายุ 99 ปี หรือไม่เกินระยะเวลาคุ้มครองของกรมธรรม์ประกันชีวิต

That is the *only* statement in the document that a life policy is required, and it
names none. Same failure mode as AIA: the rider's cost is published, the mandatory
policy underneath it is not.

What FWD does publish, for its main policies, is minimum sum insured — never a rate
table. FWD Whole Life 99/99 brochure p.3:

> ทุนประกันภัยขั้นตํ่า — 300,000 บาท
> อายุรับประกันภัย — 1 เดือน 1 วัน – 75 ปี
> ระยะเวลาคุ้มครอง — ถึงอายุ 99 ปี

Source: https://www.fwd.co.th/files/v3/assets/blt331c1aa12dcfd37a/bltab2941a67fd44909/6669669346a03743bda265b1/TH_Brochure_Whole_Life_99-99.pdf

**The one FWD main policy that publishes a minimum premium in baht is FWD Be Sure**
(มั่นใจชัวร์), and it is a trap. Brochure p.3:

> ทุนประกันภัยขั้นตํ่า — 300,000 บาท (เบี้ยประกันภัยขั้นตํ่า 2,000 บาทต่อปี)
> อายุรับประกันภัย — 20-50 ปี
> ระยะเวลาคุ้มครอง — 15 ปี

Source: https://www.fwd.co.th/files/v3/assets/blt331c1aa12dcfd37a/blt48075ad04c193389/66f239b7192bf707f2f6c45f/TH_Brochure_Besure_2024_V2.pdf

2,000 THB/year is a genuine, citable published floor — and it is the wrong number to
put in the record. Be Sure covers for 15 years and stops accepting entrants at 50;
Prima Care renews to 98. A Be Sure host expires long before the rider does, at which
point `ระยะเวลาคุ้มครอง … ไม่เกินระยะเวลาคุ้มครองของกรมธรรม์ประกันชีวิต` kills the health cover.
Using 2,000 would have produced exactly the misleadingly-cheap host floor the site's
own methodology page warns against, so the YAML records the 300,000 minimum sum
insured of Whole Life 99/99 with `premium: null` and states all of this in
`premium_unknown_reason`.

### 1c. IPD limit basis — `per_confinement`, and there is no aggregate limit at all

Prima Care is not a เหมาจ่าย product. p.4 section headings, verbatim:

> 1. ผลประโยชน์กรณีผู้ป่วยใน ต่อการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง
> 5. ผลประโยชน์เพิ่มเติมอื่นๆ กรณีเข้าพักรักษาตัวเป็นผู้ป่วยใน ต่อการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง

against, in section 3 only:

> 3.2 … โดยรังสีรักษา รังสีร่วมรักษา เวชศาสตร์นิวเคลียร์รักษา ต่อรอบปีกรมธรรม์
> 3.3 … โดยเคมีบําบัด รวมถึง Targeted therapy ต่อรอบปีกรมธรรม์
> 3.4 … โรคไตวายเรื้อรัง โดยการล้างไต ผ่านทางเส้นเลือด ต่อรอบปีกรมธรรม์
> 3.5 ค่าขยายหลอดเลือดหัวใจด้วยบอลลูน ต่อรอบปีกรมธรรม์

So the split is the same shape as AIA Health Saver: the ordinary IPD categories are
per-confinement, only the cancer/dialysis categories are annual. `ครั้งใดครั้งหนึ่ง` is
defined on p.5 with the standard 90-day re-admission absorption:

> การเข้าพักรักษาตัวเป็นผู้ป่วยใน หรือการรักษาด้วยการผ่าตัดใหญ่ที่ไม่ต้องเข้าพักรักษาตัวเป็นผู้ป่วยใน (Day Surgery) ในโรงพยาบาล แต่ละครั้ง ไม่ว่ากี่ครั้งก็ตาม ด้วยเหตุจากการบาดเจ็บหรือการป่วยเดียวกัน และยังรักษาไม่หาย รวมถึงภาวะแทรกซ้อนที่เกี่ยวข้อง หรือต่อเนื่องกัน ทั้งนี้ ภายในระยะเวลา 90 วัน นับแต่วันที่ออกจากโรงพยาบาลครั้งสุดท้าย ให้ถือว่าเป็นการเข้าพักรักษาตัวครั้งเดียวกันด้วย

Unlike AIA Health Saver, there is **no headline plan amount at all** — no
"200,000 บาท" figure that could be argued either way. Every category has its own cap.
The record therefore sets `ipd_annual_limit_thb: null` with
`ipd_limit_basis: per_confinement`, rather than promoting one category's cap (e.g. the
plan-S surgery cap of 60,000) into a fake aggregate. Plan S row 1.1 (column x-centre
344, the leftmost of five):

> 1.1 ค่าห้อง และค่าอาหาร ค่าบริการในโรงพยาบาล (ต่อวัน) สูงสุดไม่เกิน 125 วัน — 1,500

### 1d. Waiting periods (p.7), verbatim

> คุ้มครองทันที หากเกิดอุบัติเหตุฉุกเฉิน
> 30 วัน หลังสัญญาเพิ่มเติมมีผลบังคับ — คุ้มครองการเจ็บป่วยใดๆ
> 90 วัน หลังสัญญาเพิ่มเติมมีผลบังคับ — คุ้มครองหากเจ็บป่วยดังนี้ • เนื้องอก ถุงนํ้า หรือมะเร็งทุกชนิด (ยกเว้นมะเร็งระยะลุกลาม 90 วัน) • ริดสีดวงทวาร • ไส้เลื่อนทุกชนิด • ต้อเนื้อ หรือต้อกระจก • การตัดทอนซิลหรืออดีนอยด์ • นิ่วทุกชนิด • เส้นเลือดขอดที่ขา • เยื่อบุโพรงมดลูกเจริญผิดที่
> 120 วัน หลังสัญญาเพิ่มเติมมีผลบังคับ — คุ้มครองหากป่วยด้วย • โรคมะเร็งระยะลุกลาม

Note FWD's list of 8 named conditions sits at 90 days where AIA puts an overlapping
list at 120 days — FWD is materially better here, and worse on advanced cancer (120
days, which AIA does not carve out separately).

### 1e. Exclusions — 5 of a stated 17

p.5 says so in its own heading, which is more honest than AIA's vague "บางส่วน":

> ข้อยกเว้นความคุ้มครองมีทั้งหมด 17 ข้อ เช่น

The 5 printed items are recorded verbatim in the YAML. **The remaining 12 are not
published anywhere on FWD's site**, and FWD disclaims the brochure on the same page as
the premiums:

> เอกสารนี้มิใช่ส่วนหนึ่งของสัญญาประกันภัย ข้อกําหนดและเงื่อนไขของความคุ้มครองจะระบุไว้ในกรมธรรม์ประกันภัย

---

## 2. FWD Precious Care (เอฟดับบลิวดี พรีเชียส แคร์) — added as `fwd-precious-care-bronze`

Source: `TH_Brochure_FWD_Precious_Protection_2025.pdf`, `ฉบับปรับปรุงใหม่ มีนาคม 2568`.

https://www.fwd.co.th/files/v3/assets/blt331c1aa12dcfd37a/blt36c0cfb8786a9cb3/67c00c02938bf55c6ef9b388/TH_Brochure_FWD_Precious_Protection_2025.pdf

### 2a. The host policy is named — the only one found in this whole exercise

p.10, หมายเหตุ, first bullet:

> เอฟดับบลิวดี พรีเชียส โพรเทคชัน เป็นชื่อทางการตลาดของแบบตลอดชีพ 99/99 (1) และสัญญาเพิ่มเติมการประกันภัยสุขภาพแบบ เอฟดับบลิวดี พรีเชียส แคร์

and p.5 carries the host's own row in the same benefit table:

> 2. สัญญาหลักแบบประกันตลอดชีพ 99/99
> ทุนประกันภัย — 60,000

p.6 splits the two contracts' terms explicitly:

> สัญญาหลักแบบประกันตลอดชีพ 99/99 — อายุรับประกันภัย 1 เดือน 1 วัน – 75 ปี, ระยะเวลาคุ้มครอง ถึงอายุ 99 ปี, ระยะเวลาชําระเบี้ยประกันภัย ถึงอายุ 99 ปี
> สัญญาเพิ่มเติมการประกันภัยสุขภาพแบบ เอฟดับบลิวดี พรีเชียส แคร์ — อายุรับประกันภัย • 11 – 75 ปี สําหรับแผนแซฟไฟร์ และไดมอนด์ • 1 เดือน 1 วัน – 75 ปี สําหรับแผนบรอนซ์ ซิลเวอร์ โกลด์ และแพลทินัม, ระยะเวลาคุ้มครอง ปีต่อปี (ต่ออายุได้สูงสุดถึงอายุ 98 ปี)

**Contradiction worth recording:** bought on its own, Whole Life 99/99 has a
`ทุนประกันภัยขั้นตํ่า 300,000 บาท` (§1b). Bought as the host inside this package, its sum
insured is 60,000. The "minimum sum insured" of a Thai main policy is therefore not a
property of the policy — it is a property of the bundle it is sold in, and the number
moves by 5×. Any comparison that treats a published `ทุนประกันภัยขั้นต่ำ` as a fixed floor
is wrong.

### 2b. …but the price is only published bundled

p.9 is headed `ตัวอย่างเบี้ยประกันภัยรายปี (ปีแรก)` under the package name
`เอฟดับบลิวดี พรีเชียส โพรเทคชัน`, with two tables, `แบบไม่มีความรับผิดส่วนแรก` and
`แบบมีความรับผิดส่วนแรก`. Bronze column (x-centre ~174), Thailand territory,
no-deductible table:

| อายุ | ชาย | หญิง |
|---|---|---|
| 20 | 19,398 | 19,273 |
| 30 | 20,101 | 19,934 |
| 40 | 23,289 | 23,052 |
| 50 | 28,507 | 28,155 |

With a deductible, the same Bronze cell drops sharply — male 30 goes from 20,101 to
8,316 — which is the clearest published illustration in any of these documents of what
a deductible is actually worth.

There is no document anywhere on fwd.co.th that decomposes that package premium into
life-policy premium and rider premium. So the YAML puts the **bundled** figure in
`premium`, sets `host_policy.premium: null`, and says in `premium_unknown_reason` that
the number already includes the host and must not be added to a host premium again.
This is the honest encoding, but note it means this record's `premium` is not
comparable field-for-field with `fwd-prima-care-s.premium`, which is rider-only.

### 2c. Benefits — lump sum, `per_policy_year`

p.4 row `ผลประโยชน์สูงสุด (ต่อปีกรมธรรม์)`, six package columns:
`1 ล้าน / 3 ล้าน / 6 ล้าน / 12 ล้าน / 40 ล้าน / 100 ล้าน`. Bronze = 1,000,000, and the
label itself says ต่อปีกรมธรรม์, so `per_policy_year` — genuinely different from Prima
Care, and the reason both were included.

Room and board, same page, same column order:
`2,500 / 4,000 / 6,000 / 8,000 / 12,000 / 25,000` → Bronze 2,500/night. ICU and the
diagnostic/surgical categories are a merged `จ่ายตามจริง` cell spanning all six packages,
i.e. pay-as-charged inside the annual ceiling. p.7 caps the days:

> ตามจํานวนที่จ่ายจริงแต่ไม่เกินผลประโยชน์ในตาราง สูงสุดไม่เกิน 365 วัน สําหรับห้องผู้ป่วยวิกฤต (ICU) สูงสุดไม่เกิน 180 วัน เมื่อรวมกันแล้วไม่เกิน 365 วัน ต่อรอบปีกรมธรรม์

The four `ผลประโยชน์เพิ่มเติมกรณีเข้าพักรักษาตัวเป็นผู้ป่วยนอก (ต่อปีกรมธรรม์)` rows print `-`
for Bronze through Platinum and 6,000/15,000 for Sapphire/Diamond, so Bronze OPD is
recorded as `0`, not `null` — the insurer states it, it is not missing.

Note also that two categories carry a **built-in** copay independent of the renewal
one: `ค่าตรวจรักษาทางทันตกรรม (ค่าใช้จ่ายร่วม 20%)` and
`ค่าดูแลและรักษาสายตา (ค่าใช้จ่ายร่วม 20%)`. Both are `-` on Bronze.

---

## 3. Copayment (ค่าใช้จ่ายร่วม) — FWD publishes the full mechanism, and it is worth reading

Both brochures carry only the reservation of the right, identically worded:

> บริษัทฯ ขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขข้อตกลงความคุ้มครอง โดยการเพิ่มเงื่อนไขให้ผู้เอาประกันภัยมีค่าใช้จ่ายร่วม (Copayment) ในการต่ออายุสัญญาเพิ่มเติมกรณีครบรอบปีกรมธรรม์ประกันภัย (Renewal) ตามเงื่อนไขการรับประกันภัยสัญญาเพิ่มเติมการประกันสุขภาพ

The actual conditions are in a separate set of FWD-hosted infographic PDFs,
`FWD-Copayment_web_V3_2..9.pdf`. Verbatim from `..._V3_3.pdf`, the three trigger cases:

> กรณีที่ 1 — การป่วยเล็กน้อย (Simple Diseases): จํานวนการเข้าพักรักษาตัวในโรงพยาบาล มากกว่าหรือเท่ากับ 3 ครั้ง ต่อปีกรมธรรม์ และ อัตราการเคลม มากกว่าหรือเท่ากับ 200% ของเบี้ยประกันสุขภาพ → ผู้เอาประกันภัยมี Copayment 30% ของค่าใช้จ่ายที่ได้รับความคุ้มครอง ในปีกรมธรรม์ถัดไป
> กรณีที่ 2 — การเจ็บป่วยทั่วไป (ไม่รวมโรคร้ายแรง และการผ่าตัดใหญ่): ≥ 3 ครั้ง ต่อปีกรมธรรม์ และ อัตราการเคลม ≥ 400% ของเบี้ยประกันสุขภาพ → Copayment 30% ของค่าใช้จ่ายที่ได้รับความคุ้มครอง ในปีกรมธรรม์ถัดไป
> กรณีที่ 3 — การเคลมเข้าเงื่อนไขทั้ง 1 และ 2 → Copayment 50% ของค่าใช้จ่ายที่ได้รับความคุ้มครอง ในปีกรมธรรม์ถัดไป

https://www.fwd.co.th/files/v3/assets/blt331c1aa12dcfd37a/blt994343052676d0e7/67c7ed3d809db0528bb548ff/FWD-Copayment_web_V3_4.pdf
(case-1 worked example) and
https://www.fwd.co.th/files/v3/assets/blt331c1aa12dcfd37a/blt86cc16586758413b/67c7ed3cf4b0b15c5398c138/FWD-Copayment_web_V3_5.pdf
(case-2 worked example); the summary above is from
https://www.fwd.co.th/files/v3/assets/blt331c1aa12dcfd37a/blt4f6553a86ac069e2/67c7ed3cd1b1de178fca9358/FWD-Copayment_web_V3_3.pdf

Two definitions from `..._V3_2.pdf` matter more than the percentages, and neither AIA
nor Allianz publishes an equivalent:

> การนับจํานวนครั้งการเข้าพักรักษาตัวในฐานะผู้ป่วยใน (IPD): 1. นับเฉพาะการเข้าพักรักษาตัวในฐานะผู้ป่วยใน (IPD) และ 2. นับตามจํานวนครั้งที่เข้าพักรักษาตัวในโรงพยาบาล (Admission)
> หมายเหตุ: ไม่นับตามการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง (per confinement) และไม่นับการรักษาต่อเนื่องหลังเข้ารักษาตัวเป็นผู้ป่วยใน

> อัตราการเคลม (%) = ค่ารักษาพยาบาลที่เกิดขึ้นในรอบปีกรมธรรม์ ÷ เบี้ยประกันสุขภาพต่อรอบปีกรมธรรม์ × 100

The first is the sharp one: the *benefit* limits count re-admissions within 90 days as
one confinement (§1c), but the *copay trigger* counts them as separate admissions.
The same two hospital stays are one event when it helps the insurer's limit and two
events when it helps the insurer's copay trigger. That asymmetry is stated openly by
FWD and is invisible in every brochure.

Effective date, from FWD's own Easy E-Health FAQ HTML:

> Copayment ในเงื่อนไขการต่ออายุสัญญาเพิ่มเติมเริ่มมีผลกับสัญญาเพิ่มเติมประกันภัยสุขภาพที่มีวันเริ่มมีผลคุ้มครองตั้งแต่วันที่ 1 มีนาคม 2568 เป็นต้นไป ทั้งนี้ สัญญาเพิ่มเติมประกันภัยสุขภาพที่มีผลคุ้มครองก่อนวันที่ 1 มีนาคม 2568 และชำระเบี้ยต่อเนื่อง (ไม่ขาดอายุ) จะไม่มีเงื่อนไข Copayment

Source: https://www.fwd.co.th/th/health-insurance/easy-e-health/

---

## 4. Allianz Ayudhya — NOT INCLUDED, and why

No Allianz plan was added. Three independent blockers, each of which alone would be
enough.

### 4a. The brochures are scanned images with no text layer

`ประกันสุขภาพ ปลดล็อค สบายกระเป๋า (HSMHPSK)` links exactly one document:

https://www.azay.co.th/content/dam/onemarketing/azay/azay-co-th-web3/document-download/brochures/my-health-plus-sabai-kapao-brochure_2023.pdf

It is 4.1 MB, 3 pages, and `PyMuPDF` returns an empty string for every page. The page
content is a DCTDecode JPEG at 2458×3417. `Brochure-My-Health-Plus-Double-Care-April-2026-TH.pdf`
(linked from https://www.azay.co.th/th_TH/health/lump-sum/my-health-plus-double-care.html)
is 5.8 MB / 6 pages and yields 1,465 characters — marketing chrome only, the entire
benefit table and underwriting box are images. No OCR engine is available in this
environment, and OCR'd Thai would not meet the "quote verbatim" bar anyway: the
combining marks that break in AIA's PDFs would break worse through OCR, and a mis-read
digit in a benefit table is exactly the failure this site exists to prevent.

### 4b. The HTML product pages are behind Cloudflare

`curl` against `https://www.azay.co.th/th_TH/health/lump-sum/SabaiKapao-HSMHPSK.html`
with a full browser UA returns HTTP 403 and the interstitial
`Just a moment... / Enable JavaScript and cookies to continue`. Direct `curl` of the
`/content/dam/` PDFs likewise returns 403. Only a summarising fetch tool could reach
the pages, and a model-summarised page is not a verbatim quote — recording benefit
figures from it would violate rule 1 in spirit even though the domain is
insurer-official. **Retry from a network/browser that can reach azay.co.th directly;
this is the single highest-value unexplored lead here.**

The figures that a summarising fetch did return for Sabai Kapao, recorded here as
leads to verify and **not** as sourced data: entry 11–69, ต่ออายุ to 89 / คุ้มครอง to 90,
1,000,000 บาท ต่อรอบปีกรมธรรม์, room 2,000/day, ICU จ่ายตามจริง, doctor 1,000/day,
optional deductible 30,000, sample premium 9,539 THB for a male aged 35 with the
30,000 deductible, and `สามารถแนบได้กับสัญญาหลักที่บริษัทกำหนดเท่านั้น`. None of this is
in the dataset.

### 4c. The one Allianz brochure with a text layer publishes no premium at all

`Platinum-brochure.pdf` (`Version Nov 2021`) does have a clean text layer, and it is
genuinely valuable — see §5 — but it contains no premium figure of any kind. The
schema's `premium: PremiumTable` requires at least one band and is not nullable, so no
record can be created from it. See §6.

https://life.azay.co.th/content/dam/onemarketing/azay/life-azay-co-th/products-index/health-insurance/lumpsum/platinum/Platinum-brochure.pdf

It is also plainly the **old** standard, not มาตรฐานประกันสุขภาพแบบใหม่: it carries no
copayment clause at all, and renews to 84 rather than the 98–99 that every post-2021
product in this dataset uses:

> ต่ออายุสัญญาได้ถึงอายุ 84 ปี คุ้มครองถึงอายุ 85 ปี

Recording it without a same-vintage replacement would have put a stale product beside
current ones.

---

## 5. The most important thing found, which no record can hold: Allianz *does* publish its host-policy list

This is the finding the site exists to surface, and it comes from the insurer this
report is rejecting. Platinum brochure p.3, `การพิจารณารับประกันภัย`, verbatim:

> สัญญาหลักที่สามารถแนบได้
> • อยุธยาชั่วระยะเวลา — จำนวนเงินเอาประกันภัย 100,000 บาท / จำนวนเงินเอาประกันภัย 50,000 บาท
> • มาย โฮล ไลฟ์ A90/21 — มีกฎเกณฑ์ดังนี้ 1. จำนวนเงินเอาประกันภัยขั้นต่ำ 200,000 บาท หรือ 2. เบี้ยประกันภัยรายปีขั้นต่ำ 6,000 บาท โดยจำนวนเงินเอาประกันภัยต้องไม่น้อยกว่า 100,000 บาท
> • สัญญาหลักอื่นๆ ที่สามารถแนบสัญญาเพิ่มเติมคุ้มครองสุขภาพได้ตามที่บริษัทกำหนด — จำนวนเงินเอาประกันภัยตั้งแต่ 100,000 บาทขึ้นไป

Named hosts, with both a minimum sum insured *and* a minimum annual premium in baht.
AIA publishes nothing comparable across 1,958 sitemap URLs; FWD names a host only
inside one bundled package. Allianz printed it on the sales sheet in 2021 — and then
stopped: the current 2023/2026 brochures for Sabai Kapao and Double Care are the image
PDFs of §4a, and the equivalent box in them cannot be read.

The same page also discloses the marketing-name-vs-contract-name gap directly, which is
worth quoting because it is the reason "ประกันสุขภาพ แผนแพลทินัม" cannot be looked up in
any policy document:

> ประกันสุขภาพ แผนแพลทินัม (80MB) และประกันสุขภาพ แผนบียอนด์ แพลทินัม (100MB) เป็นชื่อทางการตลาด ชื่อของแบบประกันภัยที่ปรากฏในกรมธรรม์ คือ สัญญาเพิ่มเติมคุ้มครองสุขภาพ เฟิร์สคลาส แผนแพลทินัม และบันทึกสลักหลังแนบท้ายสัญญาเพิ่มเติมคุ้มครองสุขภาพ เฟิร์สคลาส แผนแพลทินัม (ผลประโยชน์เพิ่มเติมอื่นๆ)

---

## 6. Schema fields Thai insurers systematically refuse to publish

Carried forward from the AIA report and confirmed against two more insurers:

1. **`premium` is required and non-nullable (min 1 band).** This is the binding
   constraint. Allianz Platinum, Allianz Sabai Kapao's benefit table, and every
   Allianz main policy publish no readable premium, so no Allianz record can exist at
   all — the dataset silently over-represents insurers that happen to print sample
   rates in a machine-readable PDF. Consider allowing `premium: null` +
   `premium_unknown_reason` at plan level, exactly as `host_policy` already does,
   so a fully-sourced coverage record isn't discarded for want of a price.
2. **`host_policy.premium` — no Thai insurer publishes main-policy rate tables.**
   Three for three now. What they publish instead is a minimum sum insured, and
   occasionally a minimum annual premium (Allianz มาย โฮล ไลฟ์ A90/21: 6,000 THB/yr;
   FWD Be Sure: 2,000 THB/yr; AIA Issara Plus: 12,000 THB/yr). Those minimums are the
   only citable host floors that exist.
3. **`host_policy.min_sum_insured_thb` is not a stable property.** FWD Whole Life
   99/99 is 300,000 standalone and 60,000 as a package host (§2a). The field needs to
   be read as "in this pairing", not "for this policy".
4. **`exclusions` can never be complete.** FWD states the count and withholds the
   rest: `ข้อยกเว้นความคุ้มครองมีทั้งหมด 17 ข้อ เช่น` followed by 5. AIA says
   `ข้อยกเว้นบางส่วน` and gives 3. Every insurer disclaims the brochure with
   `เอกสารนี้มิใช่ส่วนหนึ่งของสัญญาประกันภัย`. No filed wording is public for any of these
   products; `terms_source.tier: filed_wording` is currently unreachable in Thailand
   for individual health riders.
5. **`premium` bands are points, not ranges.** FWD publishes 3 ages (Prima Care) or 4
   (Precious Care); AIA publishes 1–3. `age_from == age_to` single-year bands are the
   truthful encoding and make the lifetime-total calculation the methodology page
   describes impossible for every plan in the dataset.
6. **`ipd_annual_limit_thb` assumes an aggregate exists.** For per-item schedule
   products like Prima Care there is no aggregate figure at all, only per-category
   caps on two different bases. `null` + `per_confinement` is the only honest
   encoding, and it makes the plan look emptier than it is.

## 7. Not included and why — full list

| Candidate | Insurer | Verdict |
|---|---|---|
| ปลดล็อค สบายกระเป๋า (HSMHPSK) | Allianz Ayudhya | Rejected. Brochure is a scanned image (§4a); product page behind Cloudflare (§4b). Best Allianz candidate — retry from a browser-capable network. |
| ปลดล็อค ดับเบิล แคร์ | Allianz Ayudhya | Rejected. Brochure text layer contains marketing copy only; benefit table is an image. |
| แผนแพลทินัม / บียอนด์ แพลทินัม | Allianz Ayudhya | Rejected. No premium published anywhere (schema requires one, §6.1); and it is a pre-new-standard product renewing to 84 (§4c). |
| เหมาๆ / มาย เฟิร์สคลาส / Ultimate Health | Allianz Ayudhya | Not attempted past the index page — same image-PDF and Cloudflare pattern. |
| FWD Prima Care แผน M / L / XL / XXL | FWD | Deliberately omitted. Fully sourced (§1a table) but four near-identical records would pad the dataset; add on demand. |
| FWD Precious Care แพ็กเกจซิลเวอร์…ไดมอนด์ | FWD | Same — sourced but omitted. Note Sapphire/Diamond have a different entry age (11–75) and a ทั่วโลก territory variant with its own premium column. |
| FWD Precious Care แบบมีความรับผิดส่วนแรก | FWD | Omitted. The deductible amount varies by age band and package (p.5) and I could not read that sub-table unambiguously from coordinates; the no-deductible variant has an unambiguous premium table and was used instead. |
| FWD Easy E-Health | FWD | Rejected for now. Sold online with a live premium calculator, but the rates are computed in JavaScript and no rate PDF exists in FWD's sitemap; the "standalone" framing is also questionable — its own FAQ discusses `สัญญาเพิ่มเติม` copayment, suggesting a bundled main policy. Needs the calculator driven in a real browser to source honestly. |
| Krungthai-AXA | KTAXA | Not attempted. Out of time after the Allianz dead ends. |

## 8. Confirmed absent

1. **Filed policy wording (กรมธรรม์) for any FWD or Allianz health rider.** FWD's PDF
   sitemap (509 documents) contains claim forms, KYC/FATCA/CRS forms, fund
   announcements, financial statements and brochures — no policy wordings. Allianz's
   form-download tree (`/th_TH/claims-and-services-index/form-download-index.html`,
   `/th/service/download/`) is the same shape.
2. **Any FWD main-policy premium rate table.** Checked Whole Life 99/99, Whole Life
   Extra, V Protector, Be Sure, Precious Protection. Only minimums, never rates.
3. **A list of main policies that accept FWD Prima Care.** Not in the brochure, not on
   the product page, not in any of the 509 sitemap PDFs.
4. **A machine-readable Allianz benefit table dated after 2021.** The only text-layer
   Allianz brochure found is `Version Nov 2021`.
