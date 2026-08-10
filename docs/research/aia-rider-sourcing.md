# AIA rider sourcing: AIA Health Saver & AIA Infinite Care (new standard)

Research date: 2026-08-10. Every claim below is followed by the exact URL and the
verbatim Thai it rests on. Only AIA-owned pages and AIA-hosted PDFs were used for
contract terms; no agent or broker material is cited as a source for any figure.

## Method note on the Thai quotes

AIA's brochure PDFs embed subset fonts that map Thai combining marks (่ ้ ์ ็ ั ิ ี ื)
into the Unicode private-use area, so `pdftotext -layout` silently drops or garbles
them ("เงื1อนไข", "คาธรรมเนียม"). Text below was extracted with PyMuPDF plus an explicit
PUA→Thai mark table (U+F884→ั, F885→ิ, F886→ี, F888→ื, F889→็, F88B/F88C→่,
F88D/F88E/F88F→้, F897/F898→์), verified against the same strings as they appear in
plain HTML on AIA's own product pages. Quotes are otherwise verbatim, line breaks
normalised. A few instances of "เมื่อ"/"เงื่อนไข" still render as "เมือ"/"เงือนไข"
where the mark carries no PUA codepoint at all; those are marked `[sic: extraction]`.

---

## 1. Host policy (แบบประกันภัยหลัก)

### 1a. Is there a published list of eligible main policies? — NO

Both riders state only that coverage ends when *some* main policy lapses, never which
main policies qualify.

AIA Health Saver brochure, p.9 (เงื่อนไขการรับประกันภัยโดยย่อ):

> ระยะเวลาคุ้มครอง — ถึงอายุ 99 ปี หรือจนกระทั่งแบบประกันภัยหลักสิ้นผลบังคับ

Source: https://www.aia.co.th/content/dam/th-wise/docs/our-product/hsv/AIA_Health%20Saver_Brochure_Final%20Version_for%20website.pdf

AIA Infinite Care (new standard) brochure, p.12 (เงื่อนไขการรับประกันภัยโดยย่อ):

> ระยะเวลาคุ้มครอง — ถึงอายุ 99 ปี หรือจนกระทั่งแบบประกันภัยหลักสิ้นผลบังคับ

Source: https://www.aia.co.th/content/dam/th-wise/images/th/our-products/si_98_aia-infinite-care/Brochure%20AIA%20Infinite%20Care%20(new%20standard)_Final_27Dec2022_website.pdf

The identical wording appears in AIA's own FAQ HTML for the sibling rider AIA Health
Happy, again with no named host:

> ถึงอายุ 99 ปี หรือจนกระทั่งแบบประกันภัยหลักสิ้นผลบังคับ

Source: https://www.aia.co.th/th/our-products/health/aia-health-happy

I enumerated every URL in AIA's Thai sitemap (1,958 URLs,
https://www.aia.co.th/th/sitemap.xml) and found no page, and no DAM PDF, that lists
which แบบประกันภัยหลัก accept these two riders. **AIA does not publish this list.**

### 1b. The Issara Plus figure currently in the YAML — real, but the eligibility claim is not supported

The 60,000 THB minimum sum insured is real and verified twice.

AIA Issara Plus product page:

> จำนวนเงินเอาประกันภัยสามารถกำหนดได้เอง จากจำนวนเท่าของเบี้ยประกันภัยหลักเพื่อความคุ้มครองตามตารางขอบเขตของจำนวนเงินเอาประกันภัย และปรับเปลี่ยนได้ตามเกณฑ์ของบริษัทโดยไม่น้อยกว่า 60,000 บาท

Source: https://www.aia.co.th/th/our-products/save-invest/aia-issara-plus-unit-linked

AIA Issara Plus brochure, p.5:

> จำนวนเงินเอาประกันภัยสำหรับเบี้ยประกันภัยหลักเพื่อความคุ้มครอง — จำนวนเงินเอาประกันภัยสามารถกำหนดได้เอง และปรับเปลี่ยนได้ตามเกณฑ์ของบริษัท โดยไม่น้อยกว่า 60,000 บาท

Source: https://www.aia.co.th/content/dam/th-wise/images/th/our-products/si_117_aia-issara-plus-unit-linked/AIA_Issara_Plus_(Unit%20Linked)_28122022.pdf

**But eligibility is not established, and there is contrary evidence.** The only riders
Issara Plus advertises carrying are UDR riders (p.6, สัญญาเพิ่มเติม RIDERS):

> สามารถแนบสัญญาเพิ่มเติมสุขภาพและโรคร้ายแรงแบบ UDR* ซึ่งเป็นสัญญาเพิ่มเติมที่การันตีการต่ออายุ ไม่ว่าสุขภาพของคุณในอนาคตจะเป็นเช่นไรก็หมดกังวลได้

with the footnote:

> * สัญญาเพิ่มเติม UDR คือ สัญญาเพิ่มเติม ซึ่งชำระค่าการประกันภัยโดยการขายคืนหน่วยลงทุนของกองทุนภายใต้กรมธรรม์โดยอัตโนมัติเป็นรายเดือน โดยค่าการประกันภัยจะอ้างอิงตามตารางอัตราค่าการประกันภัยสำหรับสัญญาเพิ่มเติมนั้น

Source: same Issara Plus brochure PDF, p.6.

Neither AIA Health Saver nor AIA Infinite Care has a UDR version. AIA's sitemap lists
nine UDR riders (aia-hb-extra-udr, aia-ci-udr, aia-ci-care-udr, aia-ci-plus-udr,
aia-health-cancer-udr, aia-multipay-ci-udr, aia-multipay-ci-plus-udr,
aia-care-for-cancer-udr, ppr-udr) — no health-saver-udr, no infinite-care-udr.

Counter-evidence that non-UDR riders *can* attach to Issara Plus, from AIA's own Issara
Plus sales sheet (03/2024):

> ในกรณีที่มีสัญญาเพิ่มเติมใดๆ ที่ไม่ใช่สัญญาเพิ่มเติมแบบชำระค่าการประกันภัยโดยการขายคืนหน่วยลงทุนแนบอยู่กับกรมธรรม์นี้ สัญญาเพิ่มเติมดังกล่าวจะสิ้นผลบังคับ หากผู้เอาประกันภัยมิได้ชำระเบี้ยประกันภัยของสัญญาเพิ่มเติมนี้ภายในระยะเวลาผ่อนผัน

Source: https://www.aia.co.th/content/dam/th-wise/images/th/our-products/si_117_aia-issara-plus-unit-linked/Sales%20Sheet_Issara%20Plus%20(Unit%20Linked).pdf

So Issara Plus *can* carry premium-paying (non-UDR) riders in general. What AIA never
states is that these two specific riders are among them. The YAML's phrasing —
"สัญญาหลักที่ถูกที่สุดเท่าที่เอไอเอเปิดเผยต่อสาธารณะ" — asserts more than any AIA
source supports and should be softened to "a main policy AIA documents as able to carry
premium-paying riders; AIA does not confirm these two riders specifically".

Also disqualifying for part of the Health Saver age range — Issara Plus brochure p.5:

> อายุรับประกัน — 15 วัน - 70 ปี

Health Saver accepts entry to age 75 and Infinite Care to 75, so Issara Plus cannot be
the host for applicants aged 71–75. It is therefore not a universal answer even if
eligible.

### 1c. Minimum annual main premium — FOUND, and it is a real number

This is the headline find. The Issara Plus brochure publishes an explicit minimum main
premium, which the YAML currently says does not exist (p.5):

> เบี้ยประกันภัยหลักเพื่อความคุ้มครอง (RPP) — ขั้นต่ำ 6,000 บาทต่อปี โดยจะต้องมีเบี้ยประกันภัยหลักเพื่อความคุ้มครองรวมขั้นต่ำ 12,000 บาทต่อปี

Source: https://www.aia.co.th/content/dam/th-wise/images/th/our-products/si_117_aia-issara-plus-unit-linked/AIA_Issara_Plus_(Unit%20Linked)_28122022.pdf

Reading: the RPP floor is 6,000 THB/year, but total main protection premium must reach
at least 12,000 THB/year. **12,000 THB/year is the published minimum cost of holding
this host policy** — a hard, citable figure, not the 240 THB artefact the YAML derives
from the 250× rule and then (correctly) refuses to publish. It should replace that
whole `premium_unknown_reason` block.

The 250× rule the YAML quotes is also real, from the product page:

> จำนวนเงินเอาประกันภัยสูงสุด 250 เท่าของเบี้ยประกันภัยหลักเพื่อความคุ้มครอง สำหรับเพศหญิงอายุ 15 วัน - 30 ปี สุขภาพมาตรฐานเท่านั้น

Source: https://www.aia.co.th/th/our-products/save-invest/aia-issara-plus-unit-linked

and the sales sheet gives the band: `จำนวนเงินเอาประกันภัย (สำหรับกรณีภัยมาตรฐาน) 60 ถึง 250 เท่าของเบี้ยประกันภัยหลักเพื่อความคุ้มครอง (อายุ 15 วัน - 30 ปี)`.

### 1d. Published premium rate table for the host — NO

Issara Plus is unit-linked: there is no premium rate table, only actuarial cost-of-
insurance rates that AIA does not publish. Brochure p.9:

> 1. ค่าการประกันภัยสำหรับความคุ้มครองชีวิตคำนวณจากอัตราค่าการประกันภัย1 ของจำนวนเงินเสี่ยงภัยสุทธิ2

and p.11:

> ...เปลี่ยนแปลงตารางอัตราค่าการประกันภัยรายปีสำหรับความคุ้มครองชีวิต และ/หรือ ตารางอัตราค่าการประกันภัยรายปีสำหรับผลประโยชน์กรณีทุพพลภาพถาวรสิ้นเชิง

The tables themselves are referenced but never reproduced in any AIA-hosted document I
could reach. The only host-cost figure AIA publishes is the 12,000 THB/yr minimum above.

---

## 2. Full premium rate tables by age band — DO NOT EXIST PUBLICLY

### 2a. AIA Health Saver plan 200,000

Every AIA-published premium figure for Health Saver, exhaustively:

| Point | Plan | Sex/age | THB/yr | Source |
|---|---|---|---|---|
| 6,900 | 200,000 | male 21–25 | 6,900 | product page footnote |
| 7,500 | 200,000 | male 35 | 7,500 | brochure p.3 |
| 9,200 | 200,000 | female 35 | 9,200 | brochure p.3 |
| 9,300 | 300,000 | male 35 (case study) | 9,300 | brochure p.6 |
| 22,700 | 500,000 | female 32 (case study) | 22,700 | brochure p.7 |

> 4. คำนวณจากเบี้ยประกันภัยรายปี 6,900 บาท สำหรับเพศชายอายุ 21-25 ปี แผนความคุ้มครอง 200,000 บาท

Source: https://www.aia.co.th/th/our-products/health/aia-health-saver
(also appears on https://www.aia.co.th/th/campaigns/true/health-saver-new1 and
https://www.aia.co.th/th/campaigns/ecm/health-saver-h)

> เพศชาย อายุ 35 ปี เบี้ยประกันภัยเริ่มต้น 7,500 บาท2 / เพศหญิง อายุ 35 ปี เบี้ยประกันภัยเริ่มต้น 9,200 บาท2
> 2 ตัวอย่างเบี้ยประกันภัยรายปี แผน 200,000 บาท

> ตัวแทนประกันชีวิตจากเอไอเอ จึงได้นำเสนอ สัญญาเพิ่มเติม AIA Health Saver แผน 300,000 บาท ชำระเบี้ยประกันภัย 9,300 บาทต่อปี

> ตัวแทนประกันชีวิตจากเอไอเอ จึงได้นำเสนอ สัญญาเพิ่มเติม AIA Health Saver แผน 500,000 บาท ชำระเบี้ยประกันภัย 22,700 บาทต่อปี

Source (all three): https://www.aia.co.th/content/dam/th-wise/docs/our-product/hsv/AIA_Health%20Saver_Brochure_Final%20Version_for%20website.pdf

The "575 บาท" figure on the product page is the same 6,900 rate expressed monthly:

> แผนต่ำสุดเบี้ยประกันภัยเริ่มต้นเพียง 575 บาท* ... เบี้ยฯ เริ่มต้นแค่เดือนละ 575 บาท⁴

Source: https://www.aia.co.th/th/our-products/health/aia-health-saver

No age-band table exists on any AIA property.

### 2b. AIA Infinite Care (new standard) 120M first-dollar

One published point only — brochure p.5, case study of a 40-year-old male:

> คุณชาติชาย อายุ 40 ปี ซื้อ สัญญาเพิ่มเติม AIA Infinite Care (new standard) แผนความคุ้มครอง 120 ล้านบาท อาณาเขตความคุ้มครองทั่วโลก
> แบบไม่มีความรับผิดส่วนแรก (First Dollar) — ชำระเบี้ยประกันภัยรายปี 201,000 บาท
> แบบมีความรับผิดส่วนแรก 100,000 บาท — ชำระเบี้ยประกันภัยรายปี 140,700 บาท
> แบบมีความรับผิดส่วนแรก 300,000 บาท — ชำระเบี้ยประกันภัยรายปี 100,500 บาท

Source: https://www.aia.co.th/content/dam/th-wise/images/th/our-products/si_98_aia-infinite-care/Brochure%20AIA%20Infinite%20Care%20(new%20standard)_Final_27Dec2022_website.pdf

Note this is a *different* PDF from the one the YAML cites. See §5.

---

## 3. Filed policy wording (กรมธรรม์) — DOES NOT EXIST PUBLICLY

Neither rider's contract text is published. What AIA does publish is a short
"ข้อยกเว้นบางส่วน" (partial exclusions) list in each brochure, plus a complete-looking
waiting-period clause — and AIA explicitly disclaims these as non-contractual on every
brochure page:

> ข้อกำหนดและเงื่อนไขของความคุ้มครองจะระบุไว้ในกรมธรรม์ประกันภัยที่ออกให้กับผู้ถือกรมธรรม์

### 3a. AIA Health Saver — waiting period (brochure p.8), verbatim

> ระยะเวลาที่ไม่คุ้มครอง (Waiting Period) ของสัญญาเพิ่มเติม AIA Health Saver
> บริษัทจะไม่จ่ายผลประโยชน์ตามสัญญาเพิ่มเติมนี้ สำหรับการป่วยใดๆ ตามกรณี ดังต่อไปนี้
> 1. การป่วยใดๆ ที่เกิดขึ้นในระยะเวลา 30 วัน นับแต่วันเริ่มมีผลคุ้มครองตามสัญญาเพิ่มเติมนี้ หรือวันที่บริษัทอนุมัติให้เพิ่มผลประโยชน์ของสัญญาเพิ่มเติมนี้ แล้วแต่กรณีใดจะเกิดขึ้นภายหลัง หรือ
> 2. การป่วยดังต่อไปนี้ ที่เกิดขึ้นในระยะเวลา 120 วัน นับแต่วันเริ่มมีผลคุ้มครองตามสัญญาเพิ่มเติมนี้ หรือวันที่บริษัทอนุมัติให้เพิ่มผลประโยชน์ของสัญญาเพิ่มเติมนี้ แล้วแต่กรณีใดจะเกิดขึ้นภายหลัง ได้แก่
> • ไส้เลื่อนทุกชนิด
> • ต้อเนื้อ หรือต้อกระจก
> • การตัดทอนซิล หรืออดีนอยด์
> • เยื่อบุโพรงมดลูกเจริญผิดที่

### 3b. AIA Health Saver — partial exclusions (brochure p.8), verbatim

> ข้อยกเว้นบางส่วน ของสัญญาเพิ่มเติม AIA Health Saver
> 1. ภาวะที่เป็นผลจากความผิดปกติที่เกิดขึ้นแต่กำเนิด หรือระบบการสร้างอวัยวะของร่างกายไม่สมบูรณ์แต่กำเนิด หรือโรคทางพันธุกรรม หรือความผิดปกติในการพัฒนาการของร่างกาย
> 2. การตรวจรักษาหรือการผ่าตัดเพื่อเสริมสวย หรือการแก้ไขปัญหาผิวพรรณ
> 3. การตั้งครรภ์ แท้งบุตร ทำแท้ง การคลอดบุตร โรคแทรกซ้อนจากการตั้งครรภ์ การแก้ไขปัญหาการมีบุตรยาก (รวมถึงการสืบวิเคราะห์และการรักษา) การทำหมันหรือการคุมกำเนิด

Source (3a, 3b): https://www.aia.co.th/content/dam/th-wise/docs/our-product/hsv/AIA_Health%20Saver_Brochure_Final%20Version_for%20website.pdf

### 3c. AIA Infinite Care (new standard) — waiting period (brochure p.10), verbatim

> ระยะเวลาที่ไม่คุ้มครอง (Waiting Period) ของสัญญาเพิ่มเติม เอไอเอ อินฟินิท แคร์ (แบบมาตรฐานใหม่)
> 1.1 การป่วยใดๆ ที่เกิดขึ้นในระยะเวลา 30 วัน นับแต่วันเริ่มมีผลคุ้มครองตามสัญญาเพิ่มเติมนี้ หรือวันที่บริษัทอนุมัติให้เพิ่มผลประโยชน์ของสัญญาเพิ่มเติมนี้ แล้วแต่กรณีใดจะเกิดขึ้นภายหลัง หรือ
> 1.2 การป่วยดังต่อไปนี้ ที่เกิดขึ้นในระยะเวลา 120 วัน นับแต่วันเริ่มมีผลคุ้มครองตามสัญญาเพิ่มเติมนี้ หรือวันที่บริษัทอนุมัติให้เพิ่มผลประโยชน์ของสัญญาเพิ่มเติมนี้ แล้วแต่กรณีใดจะเกิดขึ้นภายหลัง ได้แก่
> • เนื้องอก ถุงน้ำ หรือมะเร็งทุกชนิด • ไส้เลื่อนทุกชนิด • การตัดทอนซิล หรืออดีนอยด์ • เส้นเลือดขอดที่ขา
> • ริดสีดวงทวาร • ต้อเนื้อ หรือต้อกระจก • นิ่วทุกชนิด • เยื่อบุโพรงมดลูกเจริญผิดที่
> 1.3 ค่าตรวจสุขภาพทั่วไป ที่เกิดขึ้นในระยะเวลา 1 ปี นับแต่วันเริ่มมีผลคุ้มครองตามสัญญาเพิ่มเติมนี้ หรือวันที่บริษัทอนุมัติให้เพิ่มผลประโยชน์ของสัญญาเพิ่มเติมนี้ แล้วแต่กรณีใดจะเกิดขึ้นภายหลัง หรือ
> 1.4 ค่าฉีดวัคซีน และค่าตรวจรักษาทางทันตกรรม ที่เกิดขึ้นในระยะเวลา 180 วัน นับแต่วันเริ่มมีผลคุ้มครองตามสัญญาเพิ่มเติมนี้ หรือวันที่บริษัทอนุมัติให้เพิ่มผลประโยชน์ของสัญญาเพิ่มเติมนี้ แล้วแต่กรณีใดจะเกิดขึ้นภายหลัง

Note the Infinite Care waiting-period list is materially longer than Health Saver's:
8 named conditions at 120 days vs 4, plus 1-year and 180-day waits on the wellness
benefits that Health Saver does not carry at all.

### 3d. AIA Infinite Care (new standard) — partial exclusions (brochure p.10), verbatim

> ข้อยกเว้นบางส่วนของสัญญาเพิ่มเติม เอไอเอ อินฟินิท แคร์ (แบบมาตรฐานใหม่)
> 1. ภาวะที่เป็นผลจากความผิดปกติที่เกิดขึ้นแต่กำเนิด หรือระบบการสร้างอวัยวะของร่างกายไม่สมบูรณ์แต่กำเนิด หรือโรคทางพันธุกรรม หรือความผิดปกติในการพัฒนาการของร่างกาย
> 2. การตรวจรักษาหรือการผ่าตัดเพื่อเสริมสวย หรือการแก้ไขปัญหาผิวพรรณ
> 3. การตั้งครรภ์ แท้งบุตร ทำแท้ง การคลอดบุตร โรคแทรกซ้อนจากการตั้งครรภ์ การแก้ไขปัญหาการมีบุตรยาก (รวมถึงการสืบวิเคราะห์และการรักษา) การทำหมันหรือการคุมกำเนิด

Source (3c, 3d): https://www.aia.co.th/content/dam/th-wise/images/th/our-products/si_98_aia-infinite-care/Brochure%20AIA%20Infinite%20Care%20(new%20standard)_Final_27Dec2022_website.pdf

These lists are explicitly partial ("บางส่วน"). The complete exclusion set — the
standard 20-odd ข้อยกเว้น of a Thai new-standard health rider — is not published.

---

## 4. Verification of already-recorded facts

### AIA Health Saver

| Recorded | Verdict | Evidence |
|---|---|---|
| entry ages 11–75 | ✅ correct | `อายุรับประกันภัยตั้งแต่ 11 – 75 ปี ต่ออายุถึง 98 ปี` (brochure p.9) |
| renews to 98 | ✅ correct | same sentence |
| room 1,500/night | ✅ correct | benefit table p.4, หมวดที่ 1, plan 200,000 column: `1,500 ต่อวัน` |
| no OPD on 200k | ✅ correct | benefit table p.5, `3. ผลประโยชน์ค่ารักษาพยาบาลผู้ป่วยนอก` → `ไม่คุ้มครอง`; FAQ: `จะให้ความคุ้มครองครอบคลุมถึงการรักษาแบบผู้ป่วยนอก (OPD) ด้วย เฉพาะแผน 400,000 บาท และ แผน 500,000 บาท` (https://www.aia.co.th/th/our-products/health/aia-health-saver) |
| IPD limit 200,000 **per policy year** | ⚠️ **WRONG BASIS** | see below |

The 200,000 is a **per-confinement** limit, not annual, for the main medical categories.
Benefit table p.4, หมวดที่ 2 heading:

> ค่าบริการทางการแพทย์เพื่อการตรวจวินิจฉัยหรือบำบัดรักษา ... ต่อการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง

and the footnote governing categories 3–6 and 12:

> * รวมผลประโยชน์ในหมวดที่ 3 – 6 และ 12 ต้องไม่เกินวงเงินต่อการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง

The plan amount applies **per policy year** only to categories 9–11 (dialysis, radiation,
chemo), p.5:

> ** รวมผลประโยชน์ในหมวดที่ 9 – 11 ต้องไม่เกินวงเงินต่อรอบปีกรมธรรม์

"ครั้งใดครั้งหนึ่ง" is itself defined on p.7 to absorb re-admissions for the same illness
within 90 days:

> 3 การเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง (Per Confinement) หมายถึง การเข้าพักรักษาตัวเป็นผู้ป่วยใน หรือการรักษาด้วยการผ่าตัดใหญ่ที่ไม่ต้องเข้าพักรักษาตัวเป็นผู้ป่วยใน (Day Surgery) ในโรงพยาบาลแต่ละครั้ง และให้รวมถึง ... ด้วยเหตุจากการบาดเจ็บหรือการป่วยเดียวกัน และยังรักษาไม่หายรวมถึงภาวะแทรกซ้อนที่เกี่ยวข้อง หรือต่อเนื่องกัน ทั้งนี้ ภายในระยะเวลา 90 วัน นับแต่วันที่ออกจากโรงพยาบาลครั้งสุดท้าย ก็ให้ถือว่าเป็นการเข้าพักรักษาตัวครั้งเดียวกันด้วย

**AIA's own marketing HTML contradicts its own brochure here**, describing the same
number as annual:

> เลือกความคุ้มครองแบบจ่ายตามจริงได้หลายแผนความคุ้มครอง 200,000-500,000 บาทต่อรอบปีกรมธรรม์

Source: https://www.aia.co.th/th/our-products/health/aia-health-saver

The benefit table is the more specific and more recent document (brochure code
SU0215461 - 02/2026) and should win. This is a genuine and material distinction: a
per-confinement 200,000 is a weaker product than an annual 200,000 in some scenarios
and stronger in others, and the site's comparison logic almost certainly treats them
as the same thing today.

### AIA Infinite Care (new standard)

| Recorded | Verdict | Evidence |
|---|---|---|
| entry ages 18–75 | ✅ correct | `อายุที่รับประกันภัย — อายุ 18 – 75 ปี (ต่ออายุได้ถึงอายุ 98 ปี)` (current brochure p.12) |
| renews to 84, covers to 85 | ❌ **WRONG — stale source** | see below |
| 120M limit | ✅ correct, and it *is* annual | `ผลประโยชน์สูงสุดต่อรอบปีกรมธรรม์ — 120,000,000 บาท` (brochure p.9) |
| premium 201,000, male 40, first-dollar | ✅ correct | brochure p.5, quoted in §2b |
| room/board `null` | ❌ **incomplete** | `25,000 บาท ต่อวัน` (brochure p.8, หมวดที่ 1) |
| OPD `null` | ❌ **incomplete** | OPD is covered, capped at 100,000/yr — see below |

**Renewal age.** The YAML cites
`https://www.aia.co.th/content/dam/th/th/docs/brochure/AIA%20Infinite%20Care%20Brochure.pdf`,
which is still live (HTTP 200) and says:

> อายุที่รับประกันภัย — อายุ 18 – 75 ปี (ต่ออายุได้ถึงอายุ 84 ปี)
> ระยะเวลาคุ้มครอง — ถึงอายุ 85 ปี หรือจนกระทั่งแบบประกันภัยหลักสิ้นผลบังคับ

But this PDF is **not linked from the live product page** and is superseded. The
brochure the current product page actually links (si_98 path) says:

> อายุที่รับประกันภัย — อายุ 18 – 75 ปี (ต่ออายุได้ถึงอายุ 98 ปี)
> ระยะเวลาคุ้มครอง — ถึงอายุ 99 ปี หรือจนกระทั่งแบบประกันภัยหลักสิ้นผลบังคับ

and the product page's own HTML agrees:

> สูงสุดถึงอายุ 99 ปี
> ตั้งแต่ 18 – 75 ปี ต่ออายุถึง 98 ปี

Source: https://www.aia.co.th/th/our-products/health/aia-infinite-care

So: **renews to 98, covers to 99.** The YAML is citing an orphaned older brochure.
Both the 201,000 premium and the 120M limit are identical in both PDFs, so only the
age fields and the source URLs are affected.

**OPD.** Current brochure p.9, ผลประโยชน์เพิ่มเติม item 8:

> 8. ค่ารักษาพยาบาลผู้ป่วยนอก ต่อรอบปีกรมธรรม์ — เมื่อรวมกับผลประโยชน์ในหมวดที่ 8 ต้องไม่เกิน 100,000 บาท

(หมวดที่ 8 is ค่าเวชศาสตร์ฟื้นฟู, itself capped `เมื่อรวมกับผลประโยชน์ค่ารักษาพยาบาลผู้ป่วยนอก ต้องไม่เกิน 100,000 บาท`.)
Other published sub-limits on the same page: ค่าตรวจสุขภาพทั่วไป 10,000/yr,
ค่าฉีดวัคซีน 6,000/yr, ค่าตรวจรักษาทางทันตกรรม 15,000/yr, ผลประโยชน์กรณีเสียชีวิต 10,000,
เครื่องพยุงกระดูก 200,000/yr.

**Copayment (both riders, currently unrecorded).** Both brochures carry the new-standard
renewal copay trigger verbatim:

> (1) กรณีผู้เอาประกันภัยมีการเคลมจากการเข้าพักรักษาตัวเป็นผู้ป่วยในด้วยโรคป่วยเล็กน้อยทั่วไป (Simple Diseases) ตั้งแต่ 3 ครั้งขึ้นไป และมีอัตราการเคลมตั้งแต่ 200% ขึ้นไป ในรอบปีกรมธรรม์ถัดไป ผู้เอาประกันภัยจะมีค่าใช้จ่ายร่วม 30% ของค่าใช้จ่ายที่ได้รับความคุ้มครอง
> (2) กรณีผู้เอาประกันภัยมีการเคลมจากการเข้าพักรักษาตัวเป็นผู้ป่วยในด้วยโรคทั่วไป ยกเว้นการผ่าตัดใหญ่ และหรือโรคร้ายแรง 50 โรค ตั้งแต่ 3 ครั้งขึ้นไป และมีอัตราการเคลมตั้งแต่ 400% ขึ้นไป ในรอบปีกรมธรรม์ถัดไป ผู้เอาประกันภัยจะมีค่าใช้จ่ายร่วม 30% ของค่าใช้จ่ายที่ได้รับความคุ้มครอง

(Health Saver adds: `กรณีผู้เอาประกันภัยเข้าเงื่อนไขทั้ง (1) และ (2) ในรอบปีกรมธรรม์ถัดไป ผู้เอาประกันภัยจะมีค่าใช้จ่ายรวม 50% ของค่าใช้จ่ายที่ได้รับความคุ้มครอง`.)
Both YAMLs record `copay_percent: 0`, which is true at issue but hides a conditional
30–50% copay on renewal. Worth a dedicated field rather than a silent zero.

---

## 5. NOT FOUND / does not exist publicly

Searched and confirmed absent:

1. **A list of eligible host main policies for either rider.** Checked: both product
   pages; both brochures; the AIA Health Happy and AIA Health Happy FAQ pages; all
   1,958 URLs in https://www.aia.co.th/th/sitemap.xml; every non-image `/content/dam/`
   asset referenced by the Health Saver, Infinite Care and Issara Plus pages. AIA
   publishes only "จนกระทั่งแบบประกันภัยหลักสิ้นผลบังคับ" with no host named anywhere.
2. **Any age-band premium rate table** for either rider, in any AIA-hosted document.
   Only the five isolated points in §2 exist. Checked product pages, both brochures,
   the Health Saver `AIA_Health_Saver_example_benefit.pdf` (image-only, no text layer),
   the model pages `/th/model/health-saver-*` and campaign pages
   `/th/campaigns/true/health-saver-new1`, `/th/campaigns/ecm/health-saver-h` — all
   repeat the same 6,900 footnote and nothing more.
3. **Filed policy wording (กรมธรรม์ / ข้อกำหนดและเงื่อนไข)** for either rider. Checked:
   https://www.aia.co.th/th/help-support/form-library (33 PDFs, all claim forms, KYC,
   FATCA/CRS, group admin — no policy wordings); the `/th/help-support/policy-services/*`
   tree including e-policy and e-document, which are authenticated customer services,
   not a public library; https://www.aia.co.th/robots.txt (which disallows
   `/th/our-products/digital-products/*`, where an online-purchase flow with rates might
   otherwise live). AIA's own repeated disclaimer confirms the wording is delivered only
   with the issued policy: `ข้อกำหนดและเงื่อนไขของความคุ้มครองจะระบุไว้ในกรมธรรม์ประกันภัยที่ออกให้กับผู้ถือกรมธรรม์`.
4. **OIC product registry entries.** https://www.oic.or.th and
   https://smart.oic.or.th/EService/Home are both reachable (HTTP 200) but their public
   e-services cover agent/broker licence lookup and compulsory/standard product
   wordings; individual life rider wordings filed under ม.29 are not published as
   downloadable documents. No AIA Health Saver or AIA Infinite Care wording is
   retrievable there.
5. **Bangkok Bank bancassurance page.** https://www.bangkokbank.com/th-TH/Personal/My-Family-and-Me/Bancassurance/AIA/Riders/AIA-Health-Saver
   exists and is indexed, but every fetch attempt (curl with browser UA, and WebFetch)
   returned connection failure / timeout from this environment. **Not verified — do not
   cite it.** It is the single most promising unexplored lead: bank bancassurance pages
   commonly publish the host-policy pairing and monthly-factor rules that AIA's own
   pages omit. Retry from a network that can reach it.
6. **Full exclusion list.** Both brochures publish only "ข้อยกเว้นบางส่วน" (3 items each).
   The complete set does not appear in any public AIA document.
