# Round 2 sourcing: ไทยประกันสุขภาพ, AXA, กรุงไทย-แอกซ่า, ไทยประกันชีวิต

Research date: 2026-08-10. Same rules as the existing files in this directory: every
claim is followed by the verbatim Thai it rests on and the exact URL that Thai lives
on. Only insurer-owned domains and insurer-hosted documents were used. No agent,
broker or comparison site is cited for any figure, premium included.

**Outcome: ไทยประกันสุขภาพ is the biggest single find this project has had, and AXA
is rejected.** ไทยประกันสุขภาพ publishes a *complete* age-band premium table — 13
bands from 15 days old to 85 — for three whole plan families, plus the filed policy
wording, plus a filed สรุปสาระสำคัญ. It is the first insurer in this dataset where
the lifetime-cost metric can be computed end to end and where `terms_source.tier`
can honestly be `filed_wording`. AXA is the mirror image: the benefit table is
published in full detail and the premium is published nowhere at all.

## Method note on the Thai quotes

Two different extraction problems, and they matter for anyone re-checking these.

1. **ไทยประกันสุขภาพ's premium and benefit tables live in HTML, not PDF.** They were
   read from the product pages' own markup (`curl` + tag strip), so the numbers below
   are the site's own text and can be re-checked with view-source. No OCR, no PDF
   column mapping, no interpolation.
2. **ไทยประกันสุขภาพ's PDFs drop the vowel ำ.** `pdftotext -layout` on
   `summary_healthy.pdf` and `simplyhealthy_20171116.pdf` renders "สำคัญ" as "สาคัญ",
   "จำกัด" as "จากัด", "ทำ" as "ทา". Quotes taken from those PDFs are reproduced
   **as extracted**, so they will look misspelled; that is the extractor, not the
   insurer. Quotes taken from HTML are unaffected and are correctly spelled.
3. **AXA's website returns HTTP 403 to WebFetch** but serves normally to a request
   with an ordinary browser User-Agent. Its brochures are clean text-layer PDFs and
   extract with the same ำ artefact.

---

## 1. บริษัท ไทยประกันสุขภาพ จำกัด (มหาชน) — Thai Health Insurance PCL

A non-life insurer that writes health only. Not previously in this dataset and not
mentioned in any existing research file. It is the plainest possible standalone case:
no life policy, no rider, no host premium to hunt for.

Product pages used throughout:

- Simply Healthy — https://www.thaihealth.co.th/simply-healthy/
- Wealthy Healthy — https://www.thaihealth.co.th/wealthy-healthy/
- Excellency Healthy — https://www.thaihealth.co.th/excellency-healthy/

### 1a. The complete premium table — the thing no other insurer here publishes

This is the headline. Every band, every plan, first-year standard premium, stamp duty
included, with the effective date printed next to it. Verbatim heading, from the
Simply Healthy page:

> IPD ผู้ป่วยใน เบี้ยประกันภัยรายปี รวมอากรแสตมป์
> ตารางเบี้ยประกันสุขภาพ เริ่ม 1 ม.ค. 2568 – (ประกาศแจ้งเปลี่ยนแปลงเบี้ยประกันภัย)

https://www.thaihealth.co.th/simply-healthy/

**Simply Healthy (IPD only, no major medical), THB/year:**

| อายุ (ปี) | SP1500 | SP2000 | SP3000 | SP4000 | SP6000 | SP12000 |
|---|---|---|---|---|---|---|
| 15 วัน-5 | 36,759 | 48,865 | 73,078 | 97,290 | 145,715 | 203,825 |
| 6-10 | 17,203 | 22,790 | 33,965 | 45,140 | 67,490 | 94,310 |
| 11-20 | 7,424 | 9,753 | 14,409 | 19,065 | 28,378 | 39,553 |
| 21-35 | 6,028 | 7,890 | 11,615 | 15,340 | 22,790 | 31,730 |
| 36-40 | 6,866 | 9,008 | 13,291 | 17,575 | 26,143 | 36,424 |
| 41-45 | 7,424 | 9,753 | 14,409 | 19,065 | 28,378 | 39,553 |
| 46-50 | 8,821 | 11,615 | 17,203 | 22,790 | 33,965 | 47,375 |
| 51-55 | 10,218 | 13,478 | 19,996 | 26,515 | 39,553 | 55,198 |
| 56-60 | 11,615 | 15,340 | 22,790 | 30,240 | 45,140 | 63,020 |
| 61-65 | 14,493 | 19,149 | 28,462 | 37,774 | 56,399 | 78,749 |
| 66-70 | 20,248 | 26,767 | 39,805 | 52,842 | 78,917 | 110,207 |
| 71-75* | 28,966 | 38,278 | 56,903 | 75,528 | 112,778 | 157,478 |
| 76-85* | 42,934 | 56,903 | 84,841 | 112,778 | 168,653 | 235,703 |

> *Renewal only

**Wealthy Healthy (same IPD schedule plus Major Medical Coverage), THB/year:**

| อายุ (ปี) | WH1500 | WH2000 | WH3000 | WH4000 | WH6000 | WH12000 |
|---|---|---|---|---|---|---|
| 15 วัน-5 | 55,430 | 73,679 | 110,177 | 146,674 | 219,669 | 307,263 |
| 6-10 | 25,952 | 34,374 | 51,219 | 68,064 | 101,754 | 142,182 |
| 11-20 | 11,212 | 14,722 | 21,740 | 28,759 | 42,797 | 59,642 |
| 21-35 | 9,107 | 11,914 | 17,529 | 23,144 | 34,374 | 47,850 |
| 36-40 | 10,370 | 13,599 | 20,055 | 26,513 | 39,428 | 54,926 |
| 41-45 | 11,212 | 14,722 | 21,740 | 28,759 | 42,797 | 59,642 |
| 46-50 | 13,317 | 17,529 | 25,952 | 34,374 | 51,219 | 71,433 |
| 51-55 | 15,423 | 20,337 | 30,162 | 39,989 | 59,642 | 83,225 |
| 56-60 | 17,529 | 23,144 | 34,374 | 45,604 | 68,064 | 95,016 |
| 61-65 | 21,824 | 28,843 | 42,881 | 56,918 | 84,993 | 118,683 |
| 66-70 | 30,414 | 40,241 | 59,894 | 79,546 | 118,851 | 166,017 |
| 71-75* | 43,385 | 57,422 | 85,497 | 113,572 | 169,722 | 237,102 |
| 76-80* | 64,440 | 85,497 | 127,610 | 169,722 | 253,947 | 355,017 |

https://www.thaihealth.co.th/wealthy-healthy/

> *กรณีต่ออายุเท่านั้น

**Excellency Healthy (top family), THB/year:**

| อายุ (ปี) | 3M | 5M | 10M |
|---|---|---|---|
| 15 วัน/days – 5 yrs | 351,251 | 433,354 | 582,935 |
| 6-10 | 162,710 | 200,604 | 269,642 |
| 11-20 | 68,439 | 84,229 | 112,995 |
| 21-35 | 54,973 | 67,604 | 90,617 |
| 36-40 | 63,054 | 77,579 | 104,043 |
| 41-45 | 68,439 | 84,229 | 112,995 |
| 46-50 | 81,907 | 100,854 | 135,373 |
| 51-55 | 95,374 | 117,479 | 157,751 |
| 56-60 | 108,842 | 134,104 | 180,129 |
| 61-65 | 135,944 | 167,522 | 225,053 |
| 66-70 | 190,149 | 234,358 | 314,902 |
| 71-75* | 271,624 | 334,780 | 449,843 |
| 76-80* | 406,296 | 501,030 | 673,624 |

https://www.thaihealth.co.th/excellency-healthy/

Note the Excellency band table stops at 80 while Simply Healthy's runs to 85. That is
the insurer's own inconsistency, reproduced rather than reconciled.

OPD is a separate, additive premium table, published to the same granularity. It is
identical across the Simply and Wealthy pages:

| ช่วงอายุ (ปี) | OPD800 | OPD1000 | OPD1500 | OPD2000 | OPD2500 | OPD3000 |
|---|---|---|---|---|---|---|
| 15 วัน – 5 ปี | 22,512 | 27,618 | 40,383 | 53,148 | 65,913 | 78,678 |
| 6 – 10 | 10,006 | 12,275 | 17,948 | 23,621 | 29,295 | 34,968 |
| 11 – 20 | 6,253 | 7,672 | 11,218 | 14,763 | 18,309 | 21,855 |
| 21 – 35 | 5,003 | 6,137 | 8,974 | 11,811 | 14,647 | 17,484 |
| 36 – 40 | 5,753 | 7,058 | 10,320 | 13,582 | 16,844 | 20,107 |
| 41 – 45 | 6,253 | 7,672 | 11,218 | 14,763 | 18,309 | 21,855 |
| 46 – 50 | 7,504 | 9,206 | 13,461 | 17,716 | 21,971 | 26,226 |
| 51 – 55 | 8,755 | 10,740 | 15,705 | 20,669 | 25,633 | 30,597 |
| 56 – 60 | 10,006 | 12,275 | 17,948 | 23,621 | 29,295 | 34,968 |
| 61 – 65 | 12,507 | 15,344 | 22,435 | 29,527 | 36,618 | 43,710 |
| 66 – 70 | 17,510 | 21,481 | 31,409 | 41,337 | 51,266 | 61,194 |
| *71 – 85 (เฉพาะต่ออายุ) | 17,510 | 21,481 | 31,409 | 41,337 | 51,266 | 61,194 |

The OPD table is not optional-in-isolation, and the insurer says so:

> หากมีความประสงค์ซื้อ OPD จะต้องซื้อพร้อมกับความคุ้มครองของ IPD ด้วยทุกครั้ง โดยเปรียบเสมือน IPD คือกรมธรรม์หลักที่ต้องซื้อก่อน โดยเบี้ยประกันภัยสุขภาพ รับชำระเป็นรายปีเท่านั้น

https://www.thaihealth.co.th/simply-healthy/

### 1b. The premium table is dated, and the insurer published why it changed

> เนื่องจากการที่บริษัทฯ ไม่ได้ทำการปรับเพิ่มเบี้ยประกันภัยสุขภาพรายบุคคลของบริษัทฯ มาตั้งแต่ปี พ.ศ. 2552 นับเป็นเวลากว่า 15 ปีดังนั้น บริษัทฯ จึงมีความจำเป็นที่จะต้องขอปรับเพิ่มเบี้ยประกันภัยสุขภาพของบริษัทฯ ขึ้น โดยจะทำการปรับเบี้ยประกันภัยเพิ่มขึ้นประมาณ 100% สำหรับผู้เอาประกันภัยที่มีช่วงอายุระหว่าง 1-10 ปี และประมาณ 38% สำหรับทุกช่วงอายุอื่นๆ สำหรับกรมธรรม์ประกันภัยสุขภาพที่จะมีผลบังคับตั้งแต่วันที่ 1 มกราคม 2568 เป็นต้นไป

https://www.thaihealth.co.th/change-premium-th/
(PDF of the same letter: https://www.thaihealth.co.th/wp-content/uploads/2024/12/Change-Premium-2025-THAI.pdf)

Signed `นายภควัต คชาวงษ์ รองกรรมการผู้จัดการ`. The same letter states the company's own
expectation of the table's shelf life:

> ทั้งนี้ บริษัทฯ คาดว่าจะสามารถคงราคาเบี้ยประกันภัยที่ปรับขึ้นครั้งนี้ไปอย่างน้อยอีก 3 ปีข้างหน้า ถ้าค่ารักษาพยาบาลไม่ปรับตัวสูงเพิ่มขึ้นตามไปอีก

That is an insurer publicly forecasting the staleness date of its own price list. It is
also the cleanest justification this project has for its 18-month rule.

### 1c. Entry ages and renewal ceiling — published, and they contradict the wording

Product-page conditions, verbatim:

> สมัครทำประกันภัยปีแรกได้ ตั้งแต่อายุ 15 วัน ถึง 70 ปีบริบูรณ์ ต่ออายุได้ถึง 85 ปีบริบูรณ์สำหรับผู้ป่วยใน และต่ออายุได้ถึง 85 ปีบริบูรณ์สำหรับผู้ป่วยนอก

https://www.thaihealth.co.th/simply-healthy/

But the filed policy wording the same site publishes says 80:

> 6.1 กรมธรรม์ประกันภัยนี้อาจต่ออายุต่อเนื่องได้ จนถึงรอบปีกรมธรรม์ประกันภัยและผู้ เอา ประกันภัยมีอายุไม่เกิน 80 ปี โดยไม่ต้องแสดงหลักฐาน

https://www.thaihealth.co.th/wp-content/uploads/2021/01/simplyhealthy_20171116.pdf

**This is the AIA "brochure vs marketing copy" failure mode again, but worse, because
here it is the contract that disagrees with the sales page.** The wording PDF is dated
2017-11-16 in its own filename and predates the 2021 new-health-standard benefit
categories that the current benefit tables use, so it is very likely a superseded
document that the insurer has left up. Either way the honest record is: the marketing
page says 85, the only published contract says 80, and the insurer publishes no
newer contract. If a record is entered, `renewal_ceiling_age` should carry the
wording's 80 and the 85 claim should be stated as the unsupported marketing figure.

### 1d. Renewal is not guaranteed, and the refusal window is published

> บริษัทสงวนสิทธิ์ที่จะไม่รับต่ออายุผู้เอาประกันภัยแต่ละรายได้ ภายใน 2 ปีแรกหลังเริ่มทำประกันภัย

https://www.thaihealth.co.th/simply-healthy/

And in the wording:

> 6.3 บริษัทอาจปฏิเสธการต่ออายุกรมธรรม์ประกันภัยได้ โดยการแจ้งต่อผู้เอาประกันภัยทราบเป็น ลายลักษณ์อักษรล่วงหน้าอย่างน้อย 30 วัน ก่อนวันที่กรมธรรม์ประกันภัยจะสิ้นผลบังคับ

https://www.thaihealth.co.th/wp-content/uploads/2021/01/simplyhealthy_20171116.pdf

### 1e. The renewal premium can double for claims experience — published as a number

This is unusually specific, and it is the field every other insurer in this dataset
hides. Verbatim:

> เบี้ยประกันภัยสำหรับปีต่ออายุของผู้เอาประกันภัยแต่ละราย อาจถูกปรับขึ้นตามประวัติการรับประกันของปีกรมธรรม์ก่อนหน้า สูงสุดไม่เกิน 100 เปอร์เซ็นต์ของเบี้ยประกันมาตรฐาน
> ส่วนลดพิเศษ 10 เปอร์เซ็นต์ในปีต่ออายุ กรณีที่ไม่มีการเรียกร้องสินไหมในปีกรมธรรม์ก่อนหน้า

https://www.thaihealth.co.th/simply-healthy/

So the published table is a floor, not a price: an individual who claims can be
charged up to double it at renewal. Any lifetime-cost sum built from these bands is
therefore a **best case**, and a record that renders it without saying so would be
misleading. The site is explicit that the table is first-year only:

> เบี้ยประกันภัยมาตรฐานสำหรับแต่ละช่วงอายุ สำหรับปีกรมธรรม์แรกเท่านั้น

### 1f. Limit basis — per confinement, defined in the filed wording

The สรุปสาระสำคัญ defines it (extraction drops ำ, see method note):

> การเข้ าพักรักษาตัวเป็ นผู้ป่วย ใน ครั้งใดครั้งหนึ่ง (Per Confinement) หมายถึง การเข้าพัก รั กษาตัวเป็ นผู ้ป่ วยใน หรื อการรัก ษาพยาบาลด้วยการผ่าตัด ใหญ่ที่ไม่ต้องเข้าพักรักษาตัวเป็ นผู ้ป่วยใน (Day Surgery) … ไม่ว่ากี่ครั้งก็ ตาม ด้วยเหตุจากการบาดเจ็บ หรื อการป่ วยเดียวกัน และยังรักษาไม่หาย รวมถึงภาวะแทรกซ้อนที่เกี่ยวข้องหรื อต่อเนื่ องกัน ทั้งนี้ ภายในระยะเวลา 90 วัน นับแต่ว ันที่ออกจากโรงพยาบาล หรื อสถานพยาบาล ครั้งสุ ดท้าย ก็ ให้ถือว่าเป็ นการเข้าพักรักษาตัวเป็ นผู ้ป่วยในครั้งเดียวกันด้วย

https://www.thaihealth.co.th/files/summary_healthy.pdf

`ipd_limit_basis: per_confinement`, on filed-document authority rather than a brochure.

Exception, published in the benefit table itself: categories 9, 10 and 11 (dialysis,
radiotherapy, chemotherapy) are `ต่อรอบปีกรมธรรม์ประกันภัย` — per policy year. Same
split as FWD Prima Care.

### 1g. Benefit figures (Simply Healthy family), verbatim from the benefit table

> 1. ผลประโยชน์กรณีผู้ป่วยใน 195,000 260,000 390,000 520,000 780,000 1,560,000
> หมวดที่ 1. ค่าห้อง และค่าอาหาร ค่าบริการในโรงพยาบาล (ผู้ป่วยใน) ต่อการเข้าพักรักษาตัวเป็นผู้ป่วยใน ครั้งใดครั้งหนึ่ง สูงสุดต่อวัน ไม่เกิน 60 วัน 1,500 2,000 3,000 4,000 6,000 12,000

https://www.thaihealth.co.th/simply-healthy/

So SP3000 = 3,000 THB/night room, 390,000 per confinement, no major medical:

> ข้อตกลงคุ้มครองการรักษาการบาดเจ็บหรือการเจ็บป่วยที่มีค่าใช้จ่ายสูง ไม่คุ้มครอง

Wealthy Healthy adds it at 90% of the excess with no deductible:

> (จ่ายร้อยละ 90 ของค่าใช้จ่ายส่วนเกินผลประโยชน์กรณีผู้ป่วยใน)

Excellency pays 100% but only above a real deductible:

> ผลประโยชน์ความคุ้มครอง สูงสุดต่อโรค/ครั้ง/ปี 1,500,000 3,000,000 7,000,000 จ่ายร้อยละ 100 ของค่าใช้จ่ายที่คุ้มครอง เฉพาะส่วนที่เกินความรับผิดส่วนแรก
> – ความรับผิดส่วนแรกที่ผู้เอาประกันภัยต้องรับผิดชอบเอง 150,000 200,000 300,000

https://www.thaihealth.co.th/excellency-healthy/

Note carefully: Excellency's deductible applies **only to the major-medical layer**,
not to the base IPD benefit. Recording `deductible_thb: 300000` flat on an EX 10M
record would be wrong. This needs either a per-layer field or a plain-Thai note.

### 1h. Waiting periods — 30 / 120 days, in the filed wording

> 1. การป่ วยใด ๆ ที่เกิดขึ้นในระยะเวลา 30 วัน นับแต่ว ันเริ่ มมีผลคุ ้มครองตามกรมธรรม์ประกันภัยนี้เป็ นครั้งแรก
> 2. การป่ วยดังต่อไปนี้ ที่เกิดขึ้นในระยะเวลา 120 วัน … - เนื้องอก ถุงน้ า หรื อมะเร็งทุกชนิด - ริ ดสี ดวงทวาร - ไส้เลื่อนทุกชนิด - ต้อเนื้อ หรื อต้อกระจก - การตัดทอนซิล หรื ออดีนอยด์ - นิ่วทุกชนิด - เส้นเลือดขอดที่ขา - เยื่อบุโพรงมดลูกเจริ ญผิดที่

https://www.thaihealth.co.th/files/summary_healthy.pdf

Accidents are carved out:

> บริ ษ ัทจะไม่นาเงื่อนไข ระยะเวลาที่ไม่คุ้มครอง (Waiting Period) นี้มาใช้ หากผู ้เอาประกันภัยได้รับการบาดเจ็บ หรื อ ต้องได้รับการผ่าตัดฉุกเฉิ นที่ไม่ได้เกิดจากภาวะสื บเนื่องจากโรคต่าง ๆ ที่เป็ นมาก่อนเอาประกันภัย

### 1i. Pre-existing conditions — the 5-and-3 rule, verbatim

> บริ ษ ัท จะไม่ จ่ายผลประโยชน์ … ส าหรั บ โรคเรื้ อรั ง การบาดเจ็บ หรื อการป่ วย … ที่ย ังมิได้รักษาให้หายก่อนวันที่กรมธรรม์ประกันภัยนี้เริ่ มมีผลบังคับเป็ นครั้งแรก เว้นแต่ … 2. โรคเรื้ อรัง การบาดเจ็บ หรื อการป่ วย (รวมถึงภาวะแทรกซ้อน) นั้น ไม่ปรากฏอาการ ไม่ได้รับการตรวจรักษา หรื อ วินิจฉัยโดยแพทย์ หรื อไม่ได้พบหรื อปรึ กษาแพทย์ ในระยะเวลาห้าปี (5 ปี ) ก่อนวันที่กรมธรรม์ประกันภัยนี้ เริ่ มมีผลบังคับ เป็ นครั้งแรก และในช่วงระยะเวลาสามปี (3 ปี ) ตั้งแต่ว ันที่กรมธรรม์ประกันภัยนี้เริ่ มมีผลบังคับเป็ นครั้งแรก

https://www.thaihealth.co.th/files/summary_healthy.pdf

### 1j. Exclusions — filed, and the insurer labels them partial itself

The summary carries the standard general exclusions (crime, racing/boxing/scuba/bungee,
war, terrorism, nuclear, drugs, alcohol ≥150 mg%) and health-specific ones (congenital
unless covered ≥1 year and symptomatic after age 16; cosmetic; pregnancy and
childbirth except choriocarcinoma; HIV/STD). Its own closing line:

> เอกสารนี้เป็ นการสรุปสาระสาคัญ เงื่อนไขความคุ้มครอง ข้อยกเว้น บางส่ วนเท่านั้น
> โปรดอ่านและทาความเข้าใจรายละเอียดทั้งหมดตามที่ระบุไว้ ในกรมธรรม์ ประกันภัยนี้

https://www.thaihealth.co.th/files/summary_healthy.pdf

Unlike every other insurer in this dataset, the full wording *is* also published
(§1c URL), so the exclusion set can be taken from the contract rather than a summary
— with the 2017-date caveat.

### 1k. New health standard — structurally yes, verbally never

The benefit tables use the 13 หมวด categories of the 2021 standard verbatim
(`หมวดที่ 1` … `หมวดที่ 13`, `หมวดย่อยที่ 4.5`, `การผ่าตัดใหญ่ที่ไม่ต้องเข้าพักรักษาตัวเป็นผู้ป่วยใน (Day Surgery)`).
The insurer never writes the words "มาตรฐานประกันสุขภาพแบบใหม่" anywhere on these
pages. Same call as MTI: record `new_health_standard: true` on the structure, and note
that the phrase is inferred from the category scheme, not quoted.

### 1l. What ไทยประกันสุขภาพ does NOT publish

- **Copayment on renewal (ค่าใช้จ่ายร่วม) — NOT PUBLISHED as a percentage.** There is
  no copay mechanism on these plans at all in the published documents; what exists
  instead is the up-to-100% experience loading in §1e. Do not record a copay percent.
- **A current policy wording — NOT PUBLISHED.** Only the 2017 document exists.
- **Sex-split premiums — do not exist.** The tables are unisex, which is itself a
  finding: FWD and BLA both split by sex, this insurer does not.
- **OPD annual cap is published** (`ผลประโยชน์ความคุ้มครอง (สูงสุดต่อปี)`), unlike
  ทิพย in `standalone-health-sourcing.md` §1g.

---

## 2. AXA (แอกซ่าประกันภัย) — NOT INCLUDED, no premium published anywhere

AXA Thailand's non-life arm sells standalone health with no life policy attached, and
says so in its own page title: `ประกันสุขภาพเหมาจ่าย ไม่พ่วงประกันชีวิต`. Everything
needed for a record exists **except a price**.

### 2a. What AXA does publish, and it is a lot

SmartCare Essential conditions, verbatim:

> 1. รับประกันภัยตั้งแต่อายุ 15 วัน และไม่เกิน 65 ปีบริบูรณ์ (ในกรณีที่เด็กมีอายุต่ำกว่า 18 ปีต้องสมัครพร้อมกับผู้ปกครอง)
> 2. ต่ออายุกรมธรรม์ได้จนถึงอายุ 99 ปีบริบูรณ์ ทั้งนี้ เบี้ยประกันภัยอาจถูกปรับตามอายุที่เพิ่มขึ้น

https://www.axa.co.th/th/personal/health-insurance/comprehensive-plan

Limit basis, and it is an unusual one — per *illness*, not per confinement and not per
year:

> ผลประโยชน์สูงสุด (ต่อโรค) หมายถึง ผลประโยชน์สูงสุดต่อ การพักรักษาเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง ไม่ว่ากี่ครั้งก็ตาม ด้วยสาเหตุ หรือภาวะแทรกซ้อนจากโรคเดียวกัน ภายในระยะเวลา 90 วัน นับแต่วันที่ออกจากโรงพยาบาลครั้งสุดท้าย ให้ถือว่าเป็นการเข้าพักรักษาตัวครั้งเดียวกัน

Room rates per night by plan: `3,000 / 5,000 / 10,000 / 12,000`, ICU double. Ceiling
`1,000,000 / 2,000,000 / 5,000,000 / 10,000,000` per illness. OPD rider
`3,000 บาท/ครั้ง` and `50,000 บาท/ปี`. Waiting 30 days, 120 days for the same eight
conditions. Deductible options 20,000 / 40,000 / 100,000 / 200,000 per illness with
published discount percentages by age band (0-40: 45/55/75/85%; 41-60: 30/40/65/75%;
61+: 10/15/30/35%).

https://thailandgi-ktaxa.cdn.prismic.io/thailandgi-ktaxa/aYWt790YXLCxVfJE_SmartCareEssentialBrochure-TH%2BEN-15122025.pdf

AXA also prints something no other insurer here does — its own expense-and-profit
loading:

> ผลิตภัณฑ์ประกันภัยนี้มีอัตราค่าใช้จ่ายรวมกำไรจากการรับประกันเกินกว่าร้อยละ 40 โดยอัตราค่าใช้จ่ายนี้หมายถึง สัดส่วนค่าใช้จ่ายที่ใช้ในการคำนวณอัตราเบี้ยประกัน รวมถึงค่าใช้จ่ายที่เกิดขึ้นจากการพัฒนาผลิตภัณฑ์ ค่าใช้จ่ายในการดำเนินงาน ค่าบำเหน็จ และกำไร

That is a disclosed statement that over 40% of the premium is not claims. It belongs
in this project's prose even though no schema field holds it.

### 2b. Why it is rejected: the premium — NOT PUBLISHED

- The SmartCare Essential brochure has **no premium table at all**. The only
  age-banded grid in it is the *deductible discount* grid above.
- The SmartCare Value brochure likewise has none. The single premium figure AXA
  publishes for that plan is a starting price with no age attached:
  > เบี้ยประกันภัยเริ่มต้นที่ 6,700 บาท ต่อปี*

  https://thailandgi-ktaxa.cdn.prismic.io/thailandgi-ktaxa/afLX3cBOoF08xenI_BrochureSmartCareValue.pdf
- The "ซื้อเลย" and "ขอใบเสนอราคา" buttons both lead to
  `https://direct.axa.co.th/Health/GetHealthInsuranceQuote`, which is a lead-capture
  form (name, email, captcha), not a published rate card. A number obtained by
  submitting personal details to a sales funnel is a quote, not a publication, and is
  not recorded here.

Same disposal as กรุงเทพประกันภัย in `standalone-health-sourcing.md` §4: excellent
structural disclosure, zero price disclosure, therefore no record.

---

## 3. กรุงไทย-แอกซ่า ประกันชีวิต (Krungthai-AXA Life)

Provenance note for §3–§4: these sections were gathered in parallel passes. All URLs
below were fetched from insurer-owned domains or insurer-linked CDNs and every figure
is from the document named beneath it. Where a PDF's embedded font drops Thai vowel
and tone marks, the quote is marked ⚠ and reproduced **as extracted**; where a quote
had to be restored from a lossy layer that is stated explicitly. Numbers are
unaffected by the font problem in every case.

### 3.1 สัญญาเพิ่มเติมค่ารักษาพยาบาล ไอเฮลท์ตี้ อัลตร้า (iHealthy Ultra) — ADDABLE, best-documented rider found

Rider. Six plans. Brochure dated `เอกสารฉบับเดือนสิงหาคม 2568`.

- Product page: https://www.krungthai-axa.co.th/products/health-insurance-and-hospital-income/ihealthy-ultra
- Smart–Gold brochure: https://thailandgi-ktaxa.cdn.prismic.io/thailandgi-ktaxa/aRs2NbpReVYa4jNL_AG_A4_Brochure_iHealthyultra4plans.pdf
- Diamond–Platinum brochure: https://thailandgi-ktaxa.cdn.prismic.io/thailandgi-ktaxa/aRs2PbpReVYa4jNN_AG_A4_Brochure_iHealthyultra2plans.pdf
- Full exclusions PDF: https://thailandgi-ktaxa.cdn.prismic.io/thailandgi-ktaxa/aRs2P7pReVYa4jNO_Exception_iHealthy_Ultra-1--1-.pdf

**Limit basis is per policy year**, stated in the benefit table header:

> ผลประโยชนรวมสูงสุด (ตอรอบปกรมธรรมประกันภัย) ⚠

3M / 10M / 15M / 25M / 70M / 100M for Smart / Bronze / Silver / Gold / Diamond /
Platinum. Room and board per night `คาหอง และคาอาหาร คาบร�การในโรงพยาบาล (ตอวัน)` ⚠ =
1,500 / 3,000 / 5,500 / 9,000 / 15,000 / 21,000.

Entry and renewal:

> อายุรับประกันภัย 6-10 ป (สำหรับแผน Smart, Bronze) / 11 – 80 ป ⚠
> ตออายุไดถึงอายุ 98 ป และคุมครองถึงอายุ 99 ป ⚠

Deductible is per policy year and only as an alternative to full cover:

> ความรับผิดสวนแรก (Deductible) ตอรอบปกรมธรรมประกันภัย (เฉพาะผลประโยชนและความคุมครองหมวดที่ 1-13) ⚠

30,000 (Smart/Bronze), 50,000 (Silver/Gold), 100,000 (Diamond/Platinum).

**Premium table — PUBLISHED, sex-split.** Heading and footnote:

> ตัวอยางเบี้ยประกันภัยรายป iHealthy Ultra* ⚠
> *เฉพาะเบี้ยประกันภัยมาตราฐานสัญญาเพ�มเติม iHealthy Ultra ปแรกเทานั้น โดยเบี้ยประกันภัยจะปรับตามอายุท่ีเพ�มข�้นในแตละป ⚠

Full-cover premiums, THB/year, ชาย / หญิง:

| อายุ | Smart 3M | Bronze 10M | Silver 15M | Gold 25M | Diamond 70M | Platinum 100M |
|---|---|---|---|---|---|---|
| 20 | 13,800 / 16,100 | 16,400 / 19,100 | 24,700 / 28,300 | 31,900 / 36,500 | 56,600 / 64,800 | 95,200 / 129,900 |
| 30 | 14,700 / 17,500 | 17,400 / 20,800 | 27,000 / 32,000 | 35,000 / 41,500 | 63,700 / 76,100 | 114,600 / 161,800 |
| 40 | 17,700 / 20,100 | 21,000 / 23,800 | 31,700 / 36,400 | 40,900 / 47,100 | 71,300 / 85,100 | 125,500 / 180,300 |
| 50 | 25,000 / 27,900 | 29,400 / 32,900 | 43,600 / 50,000 | 55,900 / 64,600 | 92,700 / 112,800 | 164,600 / 235,200 |

Ages 20/30/40/50 only for adults, 6–10 for children. The deductible variants and the
child plans are published to the same granularity (e.g. Gold age 30 with 50,000
deductible: 26,300 ชาย / 31,100 หญิง).

**KTAXA publishes a complete 21-item exclusion list as its own PDF**, headed
`ข้อยกเว้นทั่วไป สำหรับสัญญาเพิ่มเติมค่ารักษาพยาบาล ไอเฮลท์ตี้ อัลตร้า`, even though the
brochure's inline list is labelled `ขอยกเวนทั่วไป (บางสวน)` ⚠. That makes KTAXA the
only life insurer in this dataset whose full exclusion set is public.

**Copay — NOT PUBLISHED.** No percentage and no copay-on-renewal trigger appears in
any KTAXA document for this rider. Only the deductible option exists.

### 3.2 Health Ultra package — the only place KTAXA prices a host policy

https://thailandgi-ktaxa.cdn.prismic.io/thailandgi-ktaxa/aRs0prpReVYa4jIi_AG_A4_Brochure_HealthUltra.pdf

> Life Ready … จํานวนเง�นเอาประกันภัย 50,000 บาท … เบี้ยประกันภัยรายป ปละ 750 บาท ⚠

for `ผูเอาประกันภัย เพศหญิง อายุ 35 ป` ⚠ with `iHealthy Ultra แผน Gold … เบี้ยประกันภัย
รายป ปแรก 43,800 บาท` ⚠. One worked example, one age, one sex — but it is a real host
premium, which puts KTAXA ahead of AIA, FWD and BLA on the single field this project
cares most about. It is not a rate table and must not be recorded as one. The package
should not be listed as a separate plan: it is iHealthy Ultra plus a 50,000-baht life
shell, and listing both would double-count.

### 3.3 MEA Extra — REJECTED

Per-confinement limits (`ผลประโยชนสูงสุดตอการเขาพักรักษาตัวเปนผูปวยในครั้งใดครั้งหนึ่ง` ⚠ =
320,000–1,100,000) and **no premium published anywhere**. Note the trap for anyone
re-checking: the file named `MEXPremiumtables2-1-.pdf` contains the *benefit* table
and no rates at all.

https://www.krungthai-axa.co.th/products/health-insurance-and-hospital-income/mea-extra

---

## 4. ไทยประกันชีวิต (Thai Life Insurance)

Three riders, all mandatory-bundled, all sharing one unusually explicit copay clause.
Thai Life's HTML extracts cleanly, so §4 quotes are exact.

### 4.1 The copay-on-renewal clause — the sharpest disclosure found in this project

Published identically on all three plan pages:

> (1) อัตราร้อยละ 30 ของค่าใช้จ่ายที่ได้รับความคุ้มครอง กรณีผู้เอาประกันภัยมีการเรียกร้องผลประโยชน์จากการป่วยเล็กน้อยทั่วไป (Simple Diseases) และเข้าพักรักษาตัวในโรงพยาบาล ในรอบปีกรมธรรม์ประกันภัยตั้งแต่ 3 ครั้งขึ้นไป และมีอัตราการเรียกร้องค่าสินไหมทดแทนของผู้เอาประกันภัยแต่ละรายภายใต้สัญญาเพิ่มเติมฉบับนี้ ตั้งแต่ร้อยละ 200
> (2) … ตั้งแต่ร้อยละ 400 แต่ไม่รวมถึงค่าสินไหมทดแทน จากค่ารักษาโรคร้ายแรง…
> บริษัทฯ จะกำหนดเงื่อนไขให้ผู้เอาประกันภัยมีค่าใช้จ่ายร่วม (Copayment) ร้อยละ 50 ของค่าใช้จ่ายที่ได้รับความคุ้มครอง

with a reversal clause and `ไม่น้อยกว่า 15 วัน` notice.

https://product.thailife.com/ประกันสุขภาพ/ประกันสุขภาพเฮลท์ฟิตอัลตร้า/
Site-wide copay explainer: https://www.thailife.com/COPAYMENT

### 4.2 เฮลท์ ฟิต อัลตร้า (Health Fit Ultra) — ADDABLE with a null premium

Marketing name vs filed name, published by the insurer itself:

> "สัญญาเพิ่มเติม ประกันสุขภาพ Health Fit Ultra" เป็นชื่อทางการตลาด ส่วนในกรมธรรม์เป็นชื่อแบบประกัน "สัญญาเพิ่มเติม ประกันสุขภาพ เฮลท์ ฟิต อัลตร้า"

Mandatory bundling, stated flatly:

> 5. ต้องซื้อพร้อมสัญญาประกันชีวิต : จะซื้อเพิ่มเติมภายหลังไม่ได้

`ผลประโยชน์สูงสุดต่อรอบปีกรมธรรม์` = 60M / 120M; room `15,000 ต่อวัน` / `25,000 ต่อวัน`
on a per-confinement basis (`หมวดที่ 1 … ต่อการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง`);
entry `1. อายุรับประกัน : 11 - 80 ปี`; coverage `ไม่เกินปีกรมธรรม์ที่ผู้เอาประกันภัยมีอายุครบ 99 ปี`.

**Premium: NOT PUBLISHED at any age.** The page offers a lead-capture calculator
(`คำนวณแผนประกัน ตามความต้องการของคุณ`) and no rates. No brochure PDF exists.
**Exclusions: NOT PUBLISHED** — the word `ข้อยกเว้น` does not appear on the page.

### 4.3 เฮลท์ ฟิต ดีดี (Health Fit DD) — ADDABLE, single-age premiums

https://product.thailife.com/ประกันสุขภาพ/ประกันสุขภาพเฮลท์ฟิตดีดี/
Brochure (doc code P0097-1/03/69): https://product.thailife.com/media/wysiwyg/TL-brochure/HealthFitDD.pdf

`ผลประโยชน์สูงสุดต่อรอบปีกรมธรรม์` = 1M / 5M / 15M / 30M. Deductible is per
confinement — `ความรับผิดส่วนแรก ต่อการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง (เลือกได้)` —
which is a different animal from KTAXA's per-year deductible and must not be compared
with it directly.

Premiums, heading `ตัวอย่าง เบี้ยประกันภัยรายปี* อายุ 35 ปี อาชีพชั้น 1,2 (คุ้มครองเฉพาะประเทศไทยเท่านั้น)`,
THB/yr, ชาย / หญิง — **one age only**:

| ความรับผิดส่วนแรก | แผน 1 (1M) | แผน 2 (5M) | แผน 3 (15M) | แผน 4 (30M) |
|---|---|---|---|---|
| ไม่มี | 15,710 / 18,070 | 17,370 / 19,980 | 19,560 / 22,490 | 22,640 / 26,040 |
| 30,000 | 8,169 / 9,396 | 9,554 / 10,989 | 12,127 / 13,944 | 14,716 / 16,926 |
| 50,000 | 6,598 / 7,589 | 7,817 / 8,991 | 10,171 / 11,695 | 12,452 / 14,322 |
| 100,000 | ไม่เปิดขาย | 6,080 / 6,993 | 8,215 / 9,446 | 10,188 / 11,718 |

### 4.4 เฮลท์ ฟิต ชีลด์ (Health Fit Shield) — ADDABLE, real age bands, per-confinement limit

https://product.thailife.com/ประกันสุขภาพ/เฮลท์ฟิตชีลด์/

**The limit is per confinement** — `ผลประโยชน์สูงสุดต่อการเข้าพักรักษาตัวครั้งใดครั้งหนึ่ง` =
200,000 / 300,000 / 400,000 / 400,000 — and must never be rendered next to a
per-policy-year figure without the caveat.

Premiums, `ตัวอย่าง เบี้ยประกันภัยรายปี* … อาชีพชั้น 1,2`, THB/yr, ชาย / หญิง:

| อายุ | แผน 1 (200k) | แผน 2 (300k) | แผน 3 (400k) | แผน 4 (400k, ded. 20,000) |
|---|---|---|---|---|
| 31-35 | 7,340 / 9,300 | 11,740 / 14,490 | 16,280 / 18,510 | 11,390 / 12,950 |
| 36-40 | 8,200 / 10,230 | 12,680 / 15,810 | 17,200 / 19,110 | 12,040 / 13,370 |
| 41-45 | 9,330 / 11,560 | 14,090 / 17,770 | 18,850 / 21,021 | 13,190 / 14,710 |
| 46-50 | 10,730 / 13,240 | 15,670 / 19,680 | 21,550 / 24,240 | 15,080 / 16,960 |

These are true 5-year bands, not sample ages — but only 31–50 is published. Entry runs
from 15 days and renewal to 98, so **the majority of the age range is unpriced**.

**Exclusions: NOT PUBLISHED for any of the three Thai Life plans.**

---

## 5. Not included and why — this round

| Insurer / plan | Verdict | Reason |
|---|---|---|
| ไทยประกันสุขภาพ Simply Healthy | **ADDABLE** | Full age-band table 15 days–85, filed wording, standalone |
| ไทยประกันสุขภาพ Wealthy Healthy | **ADDABLE** | Same, plus 90% major-medical layer |
| ไทยประกันสุขภาพ Excellency Healthy | **ADDABLE, with care** | Deductible applies only to the major-medical layer; band table stops at 80 |
| AXA SmartCare Essential | NOT INCLUDED | No premium published in any age-linked form |
| AXA SmartCare Value | NOT INCLUDED | Only `เริ่มต้นที่ 6,700 บาท` — no age attached |
| AXA SmartCare Optimum / Optima | NOT INCLUDED | Product URLs in search results 404 on the live site; same premium gap regardless |
| ไทยวิวัฒน์ Active Health | NOT INCLUDED | Premium is behaviour-linked (`ยิ่งออกกำลังกาย เบี้ยยิ่งลด สูงสุด 40%`); no fixed published table found on thaivivat.co.th |
| KTAXA iHealthy Ultra | **ADDABLE** | Sex-split premiums at 4 ages, per-policy-year limits, full 21-item exclusions PDF |
| KTAXA Health Ultra package | NOT INCLUDED | Same rider plus a 50,000-baht life shell — would double-count iHealthy Ultra |
| KTAXA MEA Extra | NOT INCLUDED | Per-confinement limits and no premium published |
| ไทยประกันชีวิต Health Fit Ultra | ADDABLE, `premium: null` | Benefits and copay fully sourced; no rate published at any age |
| ไทยประกันชีวิต Health Fit DD | **ADDABLE** | Per-year limit; premiums published at age 35 only |
| ไทยประกันชีวิต Health Fit Shield | **ADDABLE, flag basis** | Real 31–50 bands, but the limit is per confinement |

## 6. What this round changes about the project's assumptions

1. **"Thai insurers do not publish rate tables" is now false as a blanket claim.** One
   does, completely, for three families and for OPD, to age 85. The rule is better
   stated as: *life insurers* publish sample points; the health-only non-life insurer
   publishes the whole card.
2. **A published table can still be a floor.** ไทยประกันสุขภาพ's own note allows a
   100% claims loading at renewal. Any lifetime sum this project computes from those
   bands must be labelled a best case, or it repeats the agent's trick in reverse.
3. **The first `filed_wording` source in the dataset is available** — and the first
   thing it does is contradict the marketing page about the renewal ceiling (85 vs 80).
   That is precisely the gap CONTRIBUTING.md's one rule exists to catch.
4. **The copay field is now fillable for one insurer.** ไทยประกันชีวิต publishes the
   complete renewal-copay mechanism with numbers (3 claims + 200% loss ratio → 30%;
   + 400% → 30%; both → 50%; ≥15 days' notice; removable). KTAXA, by contrast,
   publishes no copay percentage or trigger at all for its flagship rider. The
   schema's `copay_on_renewal` free-text field is the right shape for this: the
   insurer who quantifies it should render its thresholds; the one who is silent
   should render as silent, not as zero.
5. **The host-policy black hole has one exit, found this round.** KTAXA prices a host
   in one worked example (`Life Ready`, 50,000 sum assured, 750 บาท/ปี). It is not a
   rate table and must not be recorded as one, but it is more than the silence from
   AIA, FWD and BLA.

## 7. Still open — not researched in this file

ไทยสมุทรประกันชีวิต (Ocean Life), โตเกียวมารีนประกันชีวิต (Tokio Marine Life) and
พรูเด็นเชียล (Prudential) were queued for this round but their sourcing pass had not
returned when this file was written. **Nothing about those three insurers is recorded
here, and nothing should be entered into `data/plans` for them until a pass with
verbatim quotes and per-claim URLs exists.** They are the obvious next target: all
three are large individual-health writers absent from the dataset.
