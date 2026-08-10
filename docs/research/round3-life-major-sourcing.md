# Round 3 sourcing: ไทยสมุทร, โตเกียวมารีน, เจนเนอราลี่, ชับบ์ ไลฟ์, แมนูไลฟ์

Research date: 2026-08-10. Same rules as the other files in this directory: every claim is
followed by the verbatim Thai it rests on and the exact URL that Thai lives on. Only
insurer-owned domains and insurer-hosted documents were used. No agent, broker,
comparison site, hospital or blog is cited for anything, premiums included.

**Outcome: ไทยสมุทรประกันชีวิต is the most important find this project has made about
riders, and it is not about a benefit — it is about the host policy.** Ocean Life's own
online quote engine returns the host life premium as a separate published line item at
every single age from 16 to 80, for both sexes. That is the field `host_policy.premium`
was invented for and the field AIA, FWD, BLA and ไทยประกันชีวิต all refuse to publish.
เจนเนอราลี่ is the second find: a complete 14-band, sex-split, nine-plan rider rate table
in one brochure. ชับบ์ ไลฟ์ is rejected on price. โตเกียวมารีน could not be sourced at all.
**แมนูไลฟ์ ประกันชีวิต (ประเทศไทย) no longer exists** — the company is now
เคดับบลิวไอ ประกันชีวิต and `manulife.co.th` does not resolve.

## Method note on the Thai quotes

Four different extraction problems in this round, and they matter for anyone re-checking.

1. **Ocean Life's brochures map vowel and tone marks into the replacement character.**
   `pdftotext -layout` on the Supreme Health and Enjoy Health Extra brochures renders
   "สัญญาเพิ่มเติม" as `สัญญาเพิ� มเติม` and "ผู้ป่วยใน" as `ผู้ป�วยใน`. Quotes taken from
   those two PDFs are reproduced **as extracted** and marked `[sic: extraction]`.
2. **Ocean Life's filed policy wording drops the vowel ำ instead**, the same failure mode
   as ไทยประกันสุขภาพ in `round2-insurers-sourcing.md`: "กำหนด" extracts as `กาหนด`,
   "สำหรับ" as `สาหรับ`. It also inserts a space before some final consonants
   (`เนื ้องอก`). Marked `[sic: extraction]`.
3. **Chubb's brochures insert a wide space after ำ** — "สำหรับ" extracts as `สำ�หรับ`.
   Marked `[sic: extraction]`.
4. **Ocean Life's premium figures below come from HTML/JSON, not PDF, and are exact.**
   They were read out of the insurer's own Livewire quote component (see §1c), which
   returns plain text. Generali's premium table is a clean text-layer PDF and is exact.
5. **Generali's product-condition text was read from its own JSON API**
   (`POST https://apigw.generali.co.th/api-ecom-dm/api/v1/master/partner`), so those
   quotes are byte-exact site text, not OCR.

---

## 1. บริษัท ไทยสมุทรประกันชีวิต จำกัด (มหาชน) — Ocean Life

Three individual health products, all riders on an Ocean Life main policy. Product pages:

- โอเชี่ยนไลฟ์ ซูพรีม เฮลท์ — https://www.ocean.co.th/our-products/health-insurance/supreme-health
- โอเชี่ยนไลฟ์ เอ็นจอย เฮลท์ เอ็กซ์ตร้า — https://www.ocean.co.th/our-products/health-insurance/enjoy-health-extra
- โครงการโอชิ สมอล เฮลท์ — https://www.ocean.co.th/our-products/health-insurance/ochi-small-health-package

(The other four products under คุ้มครองสุขภาพ — CI Small Package, CI SuperProtect,
Super CI120 — are critical-illness lump-sum products, not medical expense cover, and are
out of scope.)

### 1a. The host-policy hole, closed — the headline of this round

Every rider in this dataset so far has had `host_policy.premium: null` or a single worked
example. Ocean Life's OCHI Small Health page carries a live calculator
(`คำนวณเบี้ย/ซื้อออนไลน์`) whose response **itemises the host policy separately from the
rider**. Verbatim line labels from the calculator's own HTML response, for a male aged 35,
Package 1:

> ชำระเบี้ยประกันภัย รายปี
> เบี้ยประกันภัย 5,360.00 บาท
> คุ้มครองชีวิต 50,000.00 บาท
> ค่ารักษาผู้ป่วยใน (ต่อการเข้าพักรักษาตัวครั้งใดครั้งหนึ่ง) 10,000.00 บาท
> ค่ารักษาผู้ป่วยนอก (ต่อครั้ง) 300.00 บาท
> โอเชี่ยนไลฟ์ สมาร์ท โพรเทคชั่น 99/99 1,116.00
> สัญญาเพิ่มเติมคุ้มครองสุขภาพ สมอล เฮลท์ 3,083.00
> บันทึกสลักหลังค่ารักษาพยาบาลแบบผู้ป่วยนอก 1,161.00

Source: `POST https://www.ocean.co.th/livewire/message/insure.internet-sales.calculator.package-selector`,
reached from https://www.ocean.co.th/our-products/health-insurance/ochi-small-health-package?purchase_intent=1

So the host is named (**โอเชี่ยนไลฟ์ สมาร์ท โพรเทคชั่น 99/99**), its sum assured is stated
(50,000 บาท), and its premium is a published number (1,116 บาท/ปี at male 35). No name,
no email, no phone number and no captcha are submitted to obtain it — only sex and date of
birth, exactly like the Dhipaya and Viriyah sweeps in `standalone-health-sourcing.md`.

### 1b. The complete swept rate table — OCHI Small Health, ages 16–80, both sexes

Swept at every integer age 16–80 for both sexes against the endpoint above. THB per year
(`ชำระเบี้ยประกันภัย รายปี`). Columns: the host whole-life policy, the health rider at
Package 1, and the OPD endorsement at Package 1.

| อายุ | host ชาย | สมอล เฮลท์ P1 ชาย | OPD P1 ชาย | host หญิง | สมอล เฮลท์ P1 หญิง | OPD P1 หญิง |
|---|---|---|---|---|---|---|
| 16 | 720.50 | 2,885 | 1,101 | 628.50 | 2,707 | 1,491 |
| 17 | 735.00 | 2,876 | 1,101 | 640.50 | 2,725 | 1,491 |
| 18 | 749.50 | 2,868 | 1,101 | 653.00 | 2,746 | 1,491 |
| 19 | 765.00 | 2,863 | 1,101 | 665.50 | 2,769 | 1,491 |
| 20 | 780.50 | 2,860 | 1,101 | 679.00 | 2,794 | 1,491 |
| 21 | 797.00 | 2,859 | 1,101 | 692.50 | 2,821 | 1,491 |
| 22 | 814.00 | 2,861 | 1,101 | 707.00 | 2,851 | 1,491 |
| 23 | 831.50 | 2,865 | 1,101 | 722.00 | 2,882 | 1,491 |
| 24 | 849.50 | 2,870 | 1,101 | 737.50 | 2,916 | 1,491 |
| 25 | 869.00 | 2,879 | 1,101 | 753.50 | 2,952 | 1,491 |
| 26 | 889.00 | 2,889 | 1,101 | 770.00 | 2,989 | 1,491 |
| 27 | 909.50 | 2,902 | 1,101 | 787.50 | 3,029 | 1,491 |
| 28 | 931.50 | 2,917 | 1,101 | 806.00 | 3,071 | 1,491 |
| 29 | 954.50 | 2,934 | 1,101 | 825.00 | 3,116 | 1,491 |
| 30 | 978.50 | 2,953 | 1,101 | 845.00 | 3,162 | 1,491 |
| 31 | 1,003.50 | 2,974 | 1,161 | 866.00 | 3,210 | 1,596 |
| 32 | 1,029.50 | 2,998 | 1,161 | 887.50 | 3,261 | 1,596 |
| 33 | 1,057.00 | 3,024 | 1,161 | 910.50 | 3,314 | 1,596 |
| 34 | 1,086.00 | 3,052 | 1,161 | 934.50 | 3,369 | 1,596 |
| 35 | 1,116.00 | 3,083 | 1,161 | 959.50 | 3,425 | 1,596 |
| 36 | 1,147.50 | 3,116 | 1,365 | 985.50 | 3,485 | 1,860 |
| 37 | 1,181.00 | 3,151 | 1,365 | 1,013.00 | 3,546 | 1,860 |
| 38 | 1,215.50 | 3,188 | 1,365 | 1,042.00 | 3,609 | 1,860 |
| 39 | 1,252.00 | 3,227 | 1,365 | 1,072.50 | 3,674 | 1,860 |
| 40 | 1,290.50 | 3,269 | 1,365 | 1,104.00 | 3,742 | 1,860 |
| 41 | 1,337.50 | 3,312 | 1,431 | 1,143.00 | 3,812 | 2,048 |
| 42 | 1,387.00 | 3,359 | 1,431 | 1,184.00 | 3,884 | 2,048 |
| 43 | 1,440.00 | 3,407 | 1,431 | 1,227.50 | 3,958 | 2,048 |
| 44 | 1,495.00 | 3,457 | 1,431 | 1,273.50 | 4,034 | 2,048 |
| 45 | 1,553.50 | 3,510 | 1,431 | 1,321.50 | 4,112 | 2,048 |
| 46 | 1,615.00 | 3,565 | 1,541 | 1,373.00 | 4,192 | 2,223 |
| 47 | 1,680.50 | 3,622 | 1,541 | 1,427.50 | 4,275 | 2,223 |
| 48 | 1,750.00 | 3,682 | 1,541 | 1,484.50 | 4,359 | 2,223 |
| 49 | 1,823.00 | 3,743 | 1,541 | 1,545.50 | 4,446 | 2,223 |
| 50 | 1,901.00 | 3,807 | 1,541 | 1,610.50 | 4,535 | 2,223 |
| 51 | 1,974.50 | 3,873 | 1,805 | 1,671.50 | 4,626 | 2,532 |
| 52 | 2,053.00 | 3,942 | 1,805 | 1,736.50 | 4,719 | 2,532 |
| 53 | 2,136.00 | 4,012 | 1,805 | 1,805.50 | 4,814 | 2,532 |
| 54 | 2,225.00 | 4,085 | 1,805 | 1,879.50 | 4,911 | 2,532 |
| 55 | 2,320.00 | 4,160 | 1,805 | 1,958.50 | 5,011 | 2,532 |
| 56 | 2,421.50 | 4,237 | 2,213 | 2,042.50 | 5,112 | 2,642 |
| 57 | 2,530.00 | 4,317 | 2,213 | 2,132.50 | 5,216 | 2,642 |
| 58 | 2,646.50 | 4,399 | 2,213 | 2,229.00 | 5,322 | 2,642 |
| 59 | 2,772.00 | 4,483 | 2,213 | 2,332.50 | 5,429 | 2,642 |
| 60 | 2,906.50 | 4,569 | 2,213 | 2,444.50 | 5,540 | 2,642 |
| 61 | 3,051.50 | 4,657 | 3,017 | 2,564.50 | 5,652 | 4,415 |
| 62 | 3,207.00 | 4,748 | 3,017 | 2,694.50 | 5,766 | 4,415 |
| 63 | 3,375.00 | 4,841 | 3,017 | 2,835.00 | 5,882 | 4,415 |
| 64 | 3,557.00 | 4,936 | 3,017 | 2,987.50 | 6,001 | 4,415 |
| 65 | 3,752.50 | 5,033 | 3,017 | 3,152.00 | 6,122 | 4,415 |
| 66 | 3,965.00 | 5,133 | 4,392 | 3,331.00 | 6,244 | 4,988 |
| 67 | 4,194.00 | 5,234 | 4,392 | 3,526.00 | 6,369 | 4,988 |
| 68 | 4,442.50 | 5,338 | 4,392 | 3,737.00 | 6,496 | 4,988 |
| 69 | 4,712.00 | 5,445 | 4,392 | 3,966.50 | 6,626 | 4,988 |
| 70 | 5,003.50 | 5,553 | 4,392 | 4,215.00 | 6,757 | 4,988 |
| 71* | 5,318.50 | 5,664 | 5,130 | 4,485.00 | 6,890 | 5,571 |
| 72* | 5,659.00 | 5,777 | 5,130 | 4,777.50 | 7,026 | 5,571 |
| 73* | 6,026.00 | 5,892 | 5,130 | 5,093.00 | 7,164 | 5,571 |
| 74* | 6,422.00 | 6,009 | 5,130 | 5,434.50 | 7,303 | 5,571 |
| 75* | 6,847.00 | 6,129 | 5,130 | 5,803.00 | 7,445 | 5,571 |
| 76* | 7,303.00 | 6,251 | 5,436 | 6,201.50 | 7,589 | 5,904 |
| 77* | 7,792.50 | 6,375 | 5,436 | 6,631.50 | 7,736 | 5,904 |
| 78* | 8,317.00 | 6,501 | 5,436 | 7,097.50 | 7,884 | 5,904 |
| 79* | 8,879.50 | 6,629 | 5,436 | 7,603.50 | 8,034 | 5,904 |
| 80* | 9,483.50 | 6,760 | 5,436 | 8,154.00 | 8,187 | 5,904 |

`*` = renewal years only. Entry stops at 70, per the product page:

> อายุรับประกันภัย 16 - 70 ปี (ต่ออายุสัญญาได้ถึงอายุ 80 ปี)

https://www.ocean.co.th/our-products/health-insurance/ochi-small-health-package

**Sanity checks run on the sweep, and one trap.** Age 15 and age 81 both return values —
15 returns a *lower* figure (2,731/4,081/7,456 for the three packages, male) and 81 returns
5,904/9,840/19,680 identically for both sexes. Neither is a real rate; they are the
engine's out-of-range fallbacks. Only 16–80 was recorded. Anyone re-running this must not
record 15 or 81.

The three packages differ only in the health rider and the OPD endorsement; the host
premium column is identical across all three. Package totals at male 35:
Package 1 = 5,360, Package 2 = 8,255, Package 3 = 13,481.

Package benefits, verbatim from the same response:

| | Package 1 | Package 2 | Package 3 |
|---|---|---|---|
| คุ้มครองชีวิต | 50,000.00 | 50,000.00 | 50,000.00 |
| ค่ารักษาผู้ป่วยใน (ต่อการเข้าพักรักษาตัวครั้งใดครั้งหนึ่ง) | 10,000.00 | 20,000.00 | 50,000.00 |
| ค่ารักษาผู้ป่วยนอก (ต่อครั้ง) | 300.00 | 500.00 | 1,000.00 |

### 1c. Ocean Life publishes filed policy wording for this product — a `filed_wording` source

The `รายละเอียดความคุ้มครองเพิ่มเติม` download on the OCHI page is not a brochure. It is a
20-page filed document containing `เงื่อนไขทั่วไปแห่งกรมธรรม์ประกันชีวิตประเภทสามัญ
(ขายผ่านทางอิเล็กทรอนิกส์ (Online))` (CODE 20803) **and** the full rider wording headed:

> เงื่อนไขทั่วไป
> สัญญาเพิ่มเติมคุ้มครองสุขภาพ สมอล เฮลท์ (Small Health)
> แผน 1

https://www.ocean.co.th/our-products/health-insurance/ochi-small-health-package/download/benefit
(document codes `CODE 30008_01` / `อ.72_01`, `Code 20681` / `ร.302`)

This is the second `filed_wording`-tier source found for a *life* rider anywhere in this
project, and unlike ไทยประกันสุขภาพ's it is current, not a 2017 leftover.

**Renewal ceiling, from the contract rather than the marketing page** `[sic: extraction]`:

> 7. การต่ออายุสัญญาเพิ่มเติมกรณีครบรอบปี กรมธรรม์ประกันภัย (Renewal)
> สัญญาเพิ่มเติมนี ้จะต่ออายุเมื่ อครบรอบปี กรมธรรม์ประกันภัย จนถึงรอบปี กรมธรรม์ประกันภัย ที่ผู้เอาประกันภัยมีอายุ 80 ปี โดยไม่ต้องแสดงหลักฐาน แต่บริษัทยังคงไว้ซ่ึงสิทธิในการปรับเบี ้ยประกันภัยตามข้อ 14

The wording's 80 and the product page's 80 agree. That is worth stating plainly, because
it is the first insurer in this dataset where the contract and the sales page do **not**
contradict each other on the renewal ceiling.

**Copay on renewal, quantified in the contract** `[sic: extraction]`:

> ทั้งนี ้ ในการต่ออายุสัญญาเพิ่มเติมนี ้ บริษัทจะสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขข้อตกลงความคุ้มครอง โดยการเพิ่มเงื่อนไขให้ผู้เอาประกันภัยมีค่าใช้จ่ายร่วม (Copayment) ตามอัตราและหลักเกณฑ์ดังต่อไปนี ้
> 1) อัตราร้อยละ 30 ของค่าใช้จ่ายที่ได้รับความคุ้มครอง กรณีผู้เอาประกันภัยมีการเรียกร้องผลประโยชน์จากการป่ วยเล็กน้อยทั่วไป (Simple diseases) และเข้าพักรักษาตัวในโรงพยาบาล ในรอบปี กรมธรรม์ประกันภัยตั้งแต่ 3 ครั้งขึ ้นไป และมีอัตราการเรียกร้องค่าสินไหมทดแทนจากสาเหตุข้างต้นของผู้เอาประกันภัยแต่ละรายภายใต้สัญญาเพิ่มเติมฉบับนี ้ ตั้งแต่ร ้อยละ 200 หรือ
> 2) อัตราร้อยละ 30 ของค่าใช้จ่ายที่ได้รับความคุ้มครอง กรณีผู้เอาประกันภัยมีการเรียกร้องผลประโยชน์จากการเข้าพักรักษาตัวในโรงพยาบาล ในรอบปี กรมธรรม์ประกันภัยตั้งแต่ 3 ครั้งขึ ้นไป และมีอัตราการเรียกร้องค่าสินไหมทดแทนจากสาเหตุข้างต้นของผู้เอาประกันภัยแต่ละรายภายใต้สัญญาเพิ่มเติมฉบับนี ้ ตั้งแต่ร ้อยละ 400 แต่ไม่รวมถึงค่าสินไหมทดแทนจากค่ารักษาโรคร้ายแรงตามรายชื่อในเอกสารแนบท้ายรายชื่อโรคร้ายแรง และ/หรือการผ่าตัดใหญ่
> หากบริษัทเพิ่มเงื่อนไขให้ผู้เอาประกันภัยมีค่าใช้จ่ ายร่วม (Copayment) เนื่องจากมีกรณีตาม (1) และ (2) บริษัทจะกาหนดเงื่อนไขให้ผู้เอาประกันภัยมีค่าใช้จ่ายร่วม (Copayment) ร้อยละ 50 ของค่าใช้จ่ายที่ได้รับความคุ้มครอง

Same 3-claims/200% → 30%, 3-claims/400% → 30%, both → 50% structure as ไทยประกันชีวิต.
The difference is that here it is quoted from the filed contract, not a product page.

**New health standard: yes, and provable from the contract.** The wording carries the
2564 standard's definitions verbatim, including the one no brochure prints
`[sic: extraction]`:

> การป่ วยเล็กน้อยทั่วไป (Simple diseases) หมายถึง การป่ วยเล็กน้อยทั่วไปใน 5 กลุ่มโรคตามระบบ ICD-10 (1) โรคระบบทางเดินหายใจส่วนบนอักเสบ (Upper Respiratory Tract Infection) (2) ไข้หวัดใหญ่ (Influenza) (3) ท้องเสียเฉี ยบพลัน (Acute Diarrhea) …

and the 13 หมวด benefit schedule, and:

> ค่าใช้จ่ายร่วม (Copayment) หมายถึง ความรับผิดระหว่างบริษัทประกันภัยและผู้เอาประกันภัยที่ต้องร่วมรับผิดชอบค่าใช้จ่ายในการรักษาพยาบาล อันจะพึงจ่ายตามจานวนเงินผลประโยชน์ภายหลังหักจานวนความรับผิดส่วนแรก (ถ้ามี)

**Limit basis: per confinement, defined in the contract** `[sic: extraction]`:

> การเข้าพักรักษาตัวเป็ นผู้ป่วยในครั้งใดครั้งหนึ่ง (Per Confinement) … ภายในระยะเวลา 90 วันนับแต่วันที่ออกจากโรงพยาบาลครั้งสุดท้าย ก็ให้ถือว่าเป็ นการเข้าพักรักษาตัวครั้งเดียวกันด้วย

and the benefit table's own cap line for แผน 1:

> ผลประโยชน์รวม หมวดที่ 1-8 และหมวดที่ 12 ไม่เกิน 10,000 บาท ต่อการเข้าพักรักษาตัวเป็ นผู้ป่วยในครั้งใดครั้งหนึ่ง

**Waiting periods: 30 / 120 days**, the standard eight conditions, accidents carved out —
verbatim at §12 of the wording, identical in substance to every other new-standard rider.

### 1d. โอเชี่ยนไลฟ์ ซูพรีม เฮลท์ (Supreme Health) — big plan, sample premiums only

Brochure (document code `PST-P07-0119 (01/05/2569)`):
https://www.ocean.co.th/our-products/health-insurance/supreme-health/download/brochure

`ผลประโยชน์สูงสุดต่อรอบปีกรมธรรม์ประกันภัย` — **per policy year**, five plans, three
territories:

| แผน | ผลประโยชน์สูงสุดต่อรอบปีกรมธรรม์ | ค่าห้องต่อวัน (สูงสุดไม่เกิน 365 วัน) |
|---|---|---|
| Smart | 5,000,000 | 6,000 |
| Silver | 10,000,000 | 8,000 |
| Gold | 30,000,000 | 10,000 |
| Diamond | 80,000,000 | 15,000 |
| Platinum | 100,000,000 | 25,000 |

Premiums, THB/year, **unisex** — the heading is just `อายุ 20 ป` etc. and there is no
male/female split anywhere in the document:

| อายุ | Smart (TH) | Silver (TH) | Gold (TH) | Diamond (TH) | Platinum (TH) | Platinum (เอเชีย) | Platinum (ทั่วโลก) |
|---|---|---|---|---|---|---|---|
| 20 | 11,681 | 13,018 | 25,305 | 30,312 | 79,535 | 86,670 | 93,708 |
| 30 | 16,967 | 18,798 | 32,018 | 39,296 | 110,666 | 120,915 | 131,064 |
| 40 | 23,174 | 25,647 | 40,701 | 51,341 | 143,682 | 157,233 | 170,684 |
| 50 | 36,311 | 40,451 | 58,515 | 75,452 | 165,835 | 181,600 | 195,828 |

`[sic: extraction]` on the headings; the numbers are unaffected. Four sample ages only,
and the brochure says so:

> ข้อมูลเบี�ยประกันภัย สามารถสอบถามเพิ� มเติมได้จากที�ปรึกษาประกันชีวิต (ตัวแทนประกันชีวิต) ของบริษัท

Entry and renewal `[sic: extraction]`:

> อายุรับประกันภัย 11 – 80 ป� (ต่ออายุสัญญาได้ถึงอายุ 99 ป�)

Waiting periods 30 / 120 / 360 days — the 360 is unusual and applies to the annual health
check `[sic: extraction]`:

> เมื�อพ้ น 360 วัน นับจากวันเริ�มมีผลคุ้มครอง — คุ้มครองค่าตรวจสุขภาพประจําป�

Copay on renewal is **not quantified**. The brochure states only that it may be imposed
`[sic: extraction]`:

> สําหรับป�ต่ออายุ อาจมีการเปลี�ยนแปลงเบี�ยประกันภัย หรือให้ผู้เอาประกันภัยมีค่าใช้จ่ายร่วม (Copayment) ขึ�นอยู่กับอายุ ชั�นอาชีพ ค่าใช้จ่ายในการรักษาพยาบาลที�สูงขึ�น หรือจากประสบการณ์การจ่ายค่าสินไหมทดแทน ตามเงื�อนไข และหลักเกณฑ์ของบริษัท

Limit basis is per policy year for the benefit categories (`หมวดที� 1 … ต่อรอบป�กรมธรรม์
ประกันภัย`), but the brochure still defines per confinement in its footnotes because
category 2.4 uses it.

**Host policy: required, unnamed, unpriced.** The only reference is
`และต้องสอดคล้องกับงวดการชําระเบี�ยประกันภัยของกรมธรรม์หลัก` `[sic: extraction]`. Ocean
Life does not say which main policies accept Supreme Health, nor a minimum sum assured,
nor a minimum host premium.

### 1e. โอเชี่ยนไลฟ์ เอ็นจอย เฮลท์ เอ็กซ์ตร้า (Enjoy Health Extra) — sex-split, four deductibles

Brochure: https://www.ocean.co.th/our-products/health-insurance/enjoy-health-extra/download/brochure

**Limit basis is per confinement, and the brochure is explicit about it:**

> ผลประโยชน์สูงสุด ต่อการเข้ารักษาในโรงพยาบาลครั�งใดครั�งหนึ�ง (สําหรับผลประโยชน์รวมหมวดที� 1 – 6 และ หมวดที� 12 – 13) — แผน 1 1,000,000 / แผน 2 3,000,000 / แผน 3 5,000,000

Room and board is `จ่ายตามจริง (ไม่เกินค่าห้องพั กเดี�ยวมาตรฐาน)` — paid as incurred up to a
standard single room, with no baht figure at all, so `room_board_thb_per_night` has no
value to record. Categories 9/10/11 are capped at 50,000 / 75,000 / 100,000
`ต่อรอบป�กรมธรรม์ประกันภัย`; category 7 (OPD accident within 24h) at 20,000 / 30,000 /
40,000 per event; category 8 (rehabilitation) is `ไม่คุ้มครอง`.

Premiums, THB/year, first year, **sex-split**, four deductible options
`[sic: extraction]` on the headings:

**เพศชาย**

| อายุ | แผน 1 ไม่มี | 20,000 | 50,000 | 100,000 | แผน 2 ไม่มี | 20,000 | 50,000 | 100,000 | แผน 3 ไม่มี | 20,000 | 50,000 | 100,000 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 20 | 16,638 | 10,933 | 7,673 | 3,599 | 17,616 | 11,568 | 8,113 | 3,793 | 17,780 | 11,673 | 8,183 | 3,821 |
| 30 | 17,939 | 11,788 | 8,273 | 3,880 | 18,994 | 12,473 | 8,747 | 4,090 | 19,170 | 12,586 | 8,823 | 4,120 |
| 40 | 22,980 | 15,101 | 10,598 | 4,971 | 24,327 | 15,976 | 11,204 | 5,238 | 24,548 | 16,117 | 11,299 | 5,276 |
| 50 | 31,719 | 20,844 | 14,629 | 6,861 | 33,534 | 22,022 | 15,444 | 7,221 | 33,764 | 22,167 | 15,540 | 7,257 |

**เพศหญิง**

| อายุ | แผน 1 ไม่มี | 20,000 | 50,000 | 100,000 | แผน 2 ไม่มี | 20,000 | 50,000 | 100,000 | แผน 3 ไม่มี | 20,000 | 50,000 | 100,000 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 20 | 17,481 | 11,487 | 8,063 | 3,781 | 18,509 | 12,155 | 8,524 | 3,986 | 18,681 | 12,265 | 8,598 | 4,015 |
| 30 | 19,314 | 12,691 | 8,908 | 4,178 | 20,477 | 13,447 | 9,430 | 4,409 | 20,711 | 13,598 | 9,533 | 4,451 |
| 40 | 24,493 | 16,095 | 11,296 | 5,298 | 25,968 | 17,053 | 11,959 | 5,592 | 26,265 | 17,244 | 12,089 | 5,645 |
| 50 | 32,045 | 21,057 | 14,779 | 6,931 | 33,667 | 22,109 | 15,505 | 7,250 | 34,125 | 22,404 | 15,706 | 7,334 |

Entry and renewal `[sic: extraction]`:

> อายุรับประกันภัย 11 - 80 ป� (ต่ออายุสัญญาได้ถึงอายุ 98 ป�)

Note the deductible is **per confinement, not per policy year** — a materially different
product from KTAXA iHealthy Ultra's per-year deductible `[sic: extraction]`:

> ความรับผิดส่วนแรก (ต่อการเข้ารักษาในโรงพยาบาลคร้ังใดคร้ังหนึ�ง สําหรับผลประโยชน์หมวดที� 1 – 6 และหมวดที� 9 – 12) ไม่มี (D0) / 20,000 (D20,000) / 50,000 (D50,000) / 100,000 (D100,000)

Exclusions are published as five numbered items and the brochure labels them partial
itself `[sic: extraction]`:

> เงื�อนไขข้อยกเว้นที�สัญญาเพิ�มเติมจะไม่ให้ความคุ้มครองเป�นไปตามที�ระบุไว้ในกรมธรรม์ท�ีบริษัทออกให้ผู้เอาประกันภัย โดยเงื�อนไขข้อยกเว้นที�ระบุไว้ในเอกสารฉบับนี�เป�นเพี ยงส่วนหนึ�งของเงื�อนไขข้อยกเว้นความคุ้มครอง

### 1f. What Ocean Life does NOT publish

- **Filed wording for Supreme Health and Enjoy Health Extra — NOT PUBLISHED.**
  https://www.ocean.co.th/service/downloads/document carries claim and servicing forms
  only (`ฟอร์มคำขอเปลี่ยนแปลงแก้ไขกรมธรรม์`, `sor27.pdf`, `exception-porchor.pdf` …), no
  policy wording for either rider. Only the online-sold OCHI product has its contract
  published.
- **Host policy for Supreme Health and Enjoy Health Extra — NOT PUBLISHED.** No permitted
  main-policy list, no minimum sum assured, no minimum premium.
- **A full age-band table for Supreme Health or Enjoy Health Extra — does not exist
  publicly.** Four sample ages each, and the brochure tells the reader to ask an agent.
- **Copay percentages for Supreme Health and Enjoy Health Extra — NOT QUANTIFIED.** Only
  the discretionary sentence in §1d.

---

## 2. บริษัท โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน) — COULD NOT BE SOURCED

Tokio Marine Life Thailand does sell an individual health rider — a search of the open
web surfaces the URL
`https://www.tokiomarine.com/th/th/life/products/personal/riders/health/tokio-good-health-prime.html`
for `โตเกียว กู๊ด เฮลธ์ ไพรม์` — **but not one character of that page could be retrieved
from the insurer's own domain, so nothing about the product is recorded here.**

`www.tokiomarine.com` is behind an Imperva/Incapsula challenge that returns an
interstitial to every non-browser request. Every one of the following returned the same
837-byte challenge page rather than content:

- `https://www.tokiomarine.com/th/life.html`
- `https://www.tokiomarine.com/th/th-life.html`
- `https://www.tokiomarine.com/th/th/life/products/personal/riders/health.html`
- `https://www.tokiomarine.com/th/th/life/products/personal/riders/health/tokio-good-health-prime.html`
- `https://www.tokiomarine.com/content/tokiomarine.sitemap.xml/`
- `https://www.tokiomarinelife.co.th/tokiomarinelife/ldm.html` (the legacy domain, which
  serves the same Incapsula script)

Response body in every case:

> `<html style="height:100%"><head><META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">… Request unsuccessful. Incapsula incident ID: …`

Tried and failed: ordinary desktop Chrome, Safari and Firefox user-agent strings with full
`Accept` / `Accept-Language` / `Sec-Fetch-*` headers; HTTP/1.1 and HTTP/2; with and
without gzip; with a persistent cookie jar across requests; and the `WebFetch` tool from a
different network path. Only `https://www.tokiomarine.com/robots.txt` returned real
content — and it discloses that PDFs exist under the life path:

> User-agent: *
> …
> Disallow: /th/life/*.pdf

**Disposition: NOT INCLUDED, and explicitly not because the data is missing.** The
distinction matters and should not be blurred. AXA and กรุงเทพประกันภัย were rejected
because the premium *does not exist publicly*. Tokio Marine was not assessed at all,
because the insurer's WAF blocks automated retrieval. Nothing may be entered into
`data/plans` for โตเกียวมารีน until a human opens
`https://www.tokiomarine.com/th/th/life/products/personal/riders/health/tokio-good-health-prime.html`
in a real browser and captures the conditions block and any premium table verbatim. That
is a ten-minute manual task and it is the single highest-value follow-up from this round
after §1.

---

## 3. บริษัท เจนเนอราลี่ ประกันชีวิต (ไทยแลนด์) จำกัด (มหาชน) — Generali Life

### 3.0 The trap: two Generali companies share one website

`generali.co.th` sells products from **two different licensed insurers** and does not
separate them in navigation. Getting this wrong would put a non-life standalone policy in
the dataset under a life insurer's name.

- **Life company** — `รับประกันโดย บริษัท เจนเนอราลี่ ประกันชีวิต (ไทยแลนด์) จำกัด (มหาชน)`,
  quoted verbatim at the foot of
  https://generali.co.th/individual-insurance/gen-extra-health-care/ — writes
  Gen Health Hero Plus, Gen Extra Health Care, Gen Health Premier. These are riders
  (`สัญญาเพิ่มเติมประกันสุขภาพ`) and are the in-scope products.
- **Non-life company** — `การพิจารณารับประกันภัย ขึ้นอยู่กับกฎเกณฑ์ของ บมจ. เจนเนอราลี่
  ประกันภัย (ไทยแลนด์)`, quoted verbatim from
  https://generali.co.th/individual-insurance/gen-health-lump-sum-plus/ — writes
  Gen Health Lump Sum Plus, GEN Health First, GEN Health Mini, GEN Health Top Up. These
  are standalone and out of this brief's scope, but see §3d, because they are the only
  Thai health products found anywhere in this project whose **current filed policy
  wording is published as a downloadable PDF**.

### 3a. Gen Health Hero Plus — the best rider rate table found in this project

Brochure: https://generali.co.th/download/brochure-gen-health-hero-plus/?wpdmdl=95007
(reachable from https://generali.co.th/individual-insurance/gen-health-hero-2/ and
https://generali.co.th/individual-insurance/gen-health-hero/, which the site files under
`ประกันชีวิต`). The brochure names it:

> 4 ฮีโร่สัญญาเพิ่มเติมประกันสุขภาพจากเจนเนอราลี่

Nine plans, `ผลประโยชน์สูงสุดต่อรอบปีกรมธรรม์ประกันภัย` — **per policy year**:

| แผน | M1 | M2 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|---|
| ผลประโยชน์สูงสุดต่อรอบปี | 2.5 แสน | 5 แสน | 1 ล้าน | 5 ล้าน | 6 ล้าน | 10 ล้าน | 15 ล้าน | 30 ล้าน | 50 ล้าน |
| …กรณีตรวจพบโรคร้ายแรง 44 โรค | 5 แสน | 1 ล้าน | 2 ล้าน | 10 ล้าน | 12 ล้าน | 20 ล้าน | 30 ล้าน | 60 ล้าน | 100 ล้าน |
| ค่าห้อง ค่าอาหาร ค่าบริการ (ต่อวัน) | 1,000 | 1,500 | 2,500 | 3,500 | 5,000 | 8,000 | 10,000 | 12,000 | 15,000 |
| ความรับผิดส่วนแรก ต่อการเข้าพักฯ ครั้งใดครั้งหนึ่ง | 10,000 | 15,000 | ไม่มี | ไม่มี | ไม่มี | ไม่มี | ไม่มี | ไม่มี | ไม่มี |
| หมวด 16 ค่ารักษาพยาบาลผู้ป่วยนอก ต่อรอบปี | ไม่คุ้มครอง | ไม่คุ้มครอง | ไม่คุ้มครอง | ไม่คุ้มครอง | 5,000 | 10,000 | 15,000 | 30,000 | 50,000 |

Note the room-and-board line is `สูงสุดไม่เกิน 365 วันต่อการเข้าพักรักษาตัวเป็นผู้ป่วยใน
ครั้งใดครั้งหนึ่ง` — a per-confinement day count sitting under a per-policy-year money cap.

**The premium table: 14 age bands, 0–70, both sexes, all nine plans.** Heading
`ตารางเบี้ยประกันภัย*`. THB/year.

**เพศชาย**

| อายุผู้ขอเอาประกันภัย | M1 | M2 | แผน 1 | แผน 2 | แผน 3 | แผน 4 | แผน 5 | แผน 6 | แผน 7 |
|---|---|---|---|---|---|---|---|---|---|
| 0-5 | 17,164 | 23,439 | 53,106 | 66,064 | 83,799 | 95,369 | 106,747 | 140,025 | 186,646 |
| 6-10 | 8,532 | 11,650 | 26,396 | 32,837 | 43,894 | 49,961 | 56,266 | 76,008 | 102,585 |
| 11-15 | 4,875 | 6,657 | 15,085 | 18,766 | 26,532 | 30,364 | 34,428 | 47,976 | 65,575 |
| 16-20 | 4,469 | 6,103 | 13,828 | 17,202 | 24,578 | 28,155 | 31,963 | 44,785 | 61,346 |
| 21-25 | 4,514 | 6,164 | 13,965 | 17,374 | 24,793 | 28,399 | 32,234 | 45,137 | 61,812 |
| 26-30 | 4,541 | 6,201 | 14,049 | 17,477 | 24,922 | 28,544 | 32,397 | 45,348 | 62,093 |
| 31-35 | 4,875 | 6,657 | 15,085 | 18,766 | 26,532 | 30,364 | 34,428 | 47,976 | 65,575 |
| 36-40 | 5,282 | 7,213 | 16,341 | 20,328 | 28,479 | 32,564 | 36,882 | 51,147 | 69,774 |
| 41-45 | 5,688 | 7,767 | 17,599 | 21,892 | 30,421 | 34,756 | 39,328 | 54,300 | 73,945 |
| 46-50 | 7,110 | 9,708 | 21,997 | 27,365 | 37,180 | 42,386 | 47,832 | 65,222 | 88,369 |
| 51-55 | 8,938 | 12,205 | 27,654 | 34,402 | 45,810 | 52,121 | 58,670 | 79,075 | 106,622 |
| 56-60 | 11,782 | 16,088 | 36,453 | 45,346 | 59,144 | 67,148 | 75,387 | 100,339 | 134,584 |
| 61-65 | 16,250 | 22,190 | 50,278 | 62,547 | 79,662 | 90,592 | 101,440 | 133,323 | 177,861 |
| 66-70 | 22,344 | 30,511 | 69,132 | 86,001 | 107,243 | 122,358 | 136,716 | 177,794 | 236,103 |

**เพศหญิง**

| อายุผู้ขอเอาประกันภัย | M1 | M2 | แผน 1 | แผน 2 | แผน 3 | แผน 4 | แผน 5 | แผน 6 | แผน 7 |
|---|---|---|---|---|---|---|---|---|---|
| 0-5 | 14,586 | 19,917 | 45,129 | 56,140 | 72,128 | 81,879 | 91,761 | 121,085 | 161,815 |
| 6-10 | 7,854 | 10,725 | 24,300 | 30,230 | 40,700 | 46,358 | 52,255 | 70,883 | 95,833 |
| 11-15 | 4,488 | 6,129 | 13,886 | 17,274 | 24,669 | 28,258 | 32,078 | 44,934 | 61,543 |
| 16-20 | 4,937 | 6,742 | 15,276 | 19,002 | 26,827 | 30,698 | 34,801 | 48,459 | 66,214 |
| 21-25 | 5,217 | 7,124 | 16,141 | 20,078 | 28,167 | 32,212 | 36,490 | 50,641 | 69,104 |
| 26-30 | 5,460 | 7,457 | 16,894 | 21,017 | 29,334 | 33,530 | 37,960 | 52,537 | 71,613 |
| 31-35 | 5,851 | 7,989 | 18,102 | 22,518 | 31,197 | 35,633 | 40,305 | 55,557 | 75,607 |
| 36-40 | 6,339 | 8,655 | 19,610 | 24,395 | 33,517 | 38,253 | 43,226 | 59,314 | 80,569 |
| 41-45 | 7,362 | 10,053 | 22,778 | 28,335 | 38,373 | 43,733 | 49,333 | 67,143 | 90,903 |
| 46-50 | 8,679 | 11,850 | 26,851 | 33,402 | 44,588 | 50,741 | 57,135 | 77,117 | 104,045 |
| 51-55 | 9,508 | 12,982 | 29,415 | 36,591 | 48,486 | 55,137 | 62,027 | 83,352 | 112,254 |
| 56-60 | 11,701 | 15,978 | 36,202 | 45,035 | 58,767 | 66,723 | 74,914 | 99,739 | 133,796 |
| 61-65 | 15,709 | 21,450 | 48,600 | 60,459 | 77,207 | 87,754 | 98,289 | 129,340 | 172,640 |
| 66-70 | 21,318 | 29,110 | 65,957 | 82,051 | 102,599 | 117,021 | 130,789 | 170,335 | 226,339 |

The table is real bands, not sample ages, and covers the whole entry range. Generali also
prints its own repricing reservation immediately beneath it:

> บริษัทอาจพิจารณาปรับเบี้ยประกันภัยของสัญญาเพิ่มเติมนี้ อันเนื่องมาจากปัจจัยอื่นๆ เช่น ค่าใช้จ่ายในการรักษาพยาบาล หรือจากประสบการณ์การจ่ายค่าสินไหมทดแทนโดยรวม โดยบริษัทจะแจ้งให้ผู้เอาประกันภัยทราบล่วงหน้าเป็นลายลักษณ์อักษรทางไปรษณีย์ลงทะเบียน หรือวิธีการอื่นที่ผู้เอาประกันภัยให้ความยินยอม ไม่น้อยกว่า 30 วัน

**Entry and renewal, and the thing that blocks the record:**

> อายุที่รับประกันภัย: แผน M1-M2 ตั้งแต่อายุ 1 เดือน - 70 ปี / แผน 1-7 ตั้งแต่ 11- 70 ปี
> ระยะเวลาคุ้มครอง: 1 ปี โดยคุ้มครองถึงอายุ 80 ปี หรือจนกระทัง่ แบบประกันภัยหลักสิน้ ผลบังคับ

That last clause — *"or until the main policy lapses"* — is the whole problem. Generali
states that a host policy is required and that the rider dies with it, and then never says
which main policies are permitted, what the minimum sum assured is, or what the host
costs. There is no worked example anywhere on generali.co.th.

**Copay on renewal: fully quantified, in the brochure:**

> เงื่อนไข Copayment
> ในการต่ออายุสัญญาเพิ่มเติม บริษัทจะ สงวนสิทธิ์ ในการเปลี่ยนแปลงเงื่อนไขข้อตกลงความคุ้มครอง โดยการเพิ่มเงื่อนไขให้ผู้เอาประกันภัยมีค่าใช้จ่ายร่วม (Copayment) ตามอัตราและกฎเกณฑ์ ต่อไปนี้:
> 1. กรณีเจ็บป่วยเล็กน้อย (Simple Diseases) เงื่อนไข: เคลมผู้ป่วยในตั้งแต่ 3 ครั้งขึ้นไป และมีอัตราการเคลมรวม 200% ขึ้นไป สัดส่วนร่วมจ่าย: 30% ของค่ารักษาในปีถัดไป
> 2. กรณีโรคทั่วไป (ไม่รวมโรคร้ายแรง) เงื่อนไข: เคลมผู้ป่วยในตั้งแต่ 3 ครั้งขึ้นไป และมีอัตราการเคลมรวม 400% ขึ้นไป สัดส่วนร่วมจ่าย: 30% ของค่ารักษาในปีถัดไป
> 3. กรณีพิเศษ - หากเข้าเงื่อนไขทั้งสองกรณี จะร่วมจ่ายสูงสุด 50%
> ทั้งนี้ บริษัทฯ จะพิจารณาเมื่อครบรอบปีกรมธรรม์ หากการเคลมของผู้เอาประกันภัยมีการปรับตัวลดลงตามเกณฑ์บริษัทประกันภัยจะยกเลิกการมีส่วนร่วมจ่าย Copayment

**Waiting periods 30 / 120 days**, the standard eight conditions, plus a 12-month waiting
period marked `*` on categories 17, 20 and 21 (vaccination, annual check-up, eye care).

**Exclusions: partial only.** The brochure heads its list `ข้อยกเว้นบางส่วน` and prints
three items. No full exclusion document is published for this rider.

**New health standard: yes, structurally.** The benefit schedule is the 13 หมวด of the 2564
standard plus categories 14–21 as `ผลประโยชน์เพิ่มเติมอื่นๆ`. The phrase
`มาตรฐานประกันสุขภาพแบบใหม่` does not appear.

### 3b. Gen Extra Health Care — terms published, premium not

https://generali.co.th/individual-insurance/gen-extra-health-care/

> Gen Extra Health Care — สัญญาเพิ่มเติมประกันสุขภาพเหมาจ่าย เจนเอ็กซ์ตร้าเฮลท์แคร์
> รับประกันภัยตั้งแต่อายุ 6 เดือน – 70 ปี (ต่อความคุ้มครองได้ถึงอายุครบ 85 ปี)
> จำนวนเงินเอาประกันภัยขั้นต่ำ : 1,000,000 บาท (ค่าห้อง ค่าอาหาร 2,000 บาท)
> จำนวนเงินเอาประกันภัยรวมสูงสุด : 5,000,000 บาท (ค่าห้อง ค่าอาหาร 10,000 บาท)
> อัตราเบี้ยประกันภัย : ขึ้นอยู่กับเพศ อายุ และชั้นอาชีพ

That last line is the whole premium disclosure: *"depends on sex, age and occupation
class"*, with no table and no sample. There is also a mandatory-pairing rule for children
that no other insurer in this dataset publishes:

> *ผู้เยาว์ (อายุ 6 เดือน – 10 ปี) จะต้องซื้อคู่กับบิดา/มารดา หรือผู้ปกครองตามกฎหมาย หรือผู้รับบุตรบุญธรรมตามกฎหมาย ด้วยแผนที่ไม่น้อยกว่าของผู้เยาว์

and a one-plan-per-life rule:

> ผู้เอาประกันภัย 1 คน สามารถซื้อสัญญาเพิ่มเติมประกันสุขภาพ เหมาจ่าย เอ็กซ์ตร้า เฮลท์แคร์ ได้ 1 แผนเท่านั้น

The underwriter is stated on the same page:

> รับประกันโดย บริษัท เจนเนอราลี่ ประกันชีวิต (ไทยแลนด์) จำกัด (มหาชน)

**No brochure PDF is linked from this page**, so no benefit schedule, no waiting periods
and no copay terms are published for Gen Extra Health Care at all.

### 3c. Gen Health Premier — three facts and a lead form

https://generali.co.th/individual-insurance/gen-health-premier/

Everything Generali publishes about this product:

> ความคุ้มครองสูงสุดถึง 5 ล้านบาท ต่อการเข้าพักรักษาในโรงพยาบาลต่อครั้ง
> รับส่วนลดเบี้ยประกัน เมื่อเลือกความรับผิดส่วนแรก 50,000 บาท หรือ 100,000 บาท ต่อการเข้าพักรักษาในโรงพยาบาลต่อครั้ง
> รับความคุ้มครองเพิ่มอีก 50% เมื่อวินิจฉัยพบโรคร้ายแรงตามที่กำหนด

The limit is **per confinement**, the deductible is **per confinement**, there is no
brochure, no entry-age statement, no renewal ceiling, and no premium. The page's only
interactive element is `เช็กเบี้ย เลือกแผน` → a form demanding `ชื่อ-นามสกุล*`,
`เบอร์โทรศัพท์*`, `อีเมล*` and a province. That is a lead-capture funnel, not a
publication, and no figure obtained from it is recorded here — same disposal as AXA
`round2-insurers-sourcing.md` §2b.

### 3d. Worth knowing even though out of scope: the non-life arm publishes current wording

The Generali **non-life** company publishes the full filed policy wording for its two
online health products, dated in the filename:

- https://generali.co.th/download/20260318_policy-wording_health_mini/?wpdmdl=99075 (35 pp)
- https://generali.co.th/download/20260318_policy-wording_health_topup/?wpdmdl=99028 (34 pp)

Both open:

> กรมธรรม์ ประกันภัยเจนสุ ขภาพและอุบัติเหตุส่วนบุคคล (แบบมาตรฐานพลัส)
> (สาหรับการเสนอขายผ่านทางอิเล็กทรอนิกส์ (Online)) `[sic: extraction]`

and Generali's own product API publishes the standalone conditions in machine-readable
form. Verbatim from
`POST https://apigw.generali.co.th/api-ecom-dm/api/v1/master/partner`
(`partnerCode: "DM"`, `categoryCode: "GENHEALTHFIRST"`):

> รับประกันภัยตั้งแต่อายุ 21-70 ปี (สามารถต่ออายุได้สูงสุดถึงอายุ 85 ปี)
> ในการต่ออายุ บริษัทฯ อาจเพิ่มเงื่อนไขให้ผู้เอาประกันภัยมีค่าใช้จ่ายร่วม (Co-payment) ไม่เกินร้อยละ 30 ของค่าใช้จ่ายที่ได้รับความคุ้มครอง และปรับลดเบี้ยประกันภัยในปีต่ออายุไม่เกินร้อยละ 30 โดยพิจารณาจากการเรียกร้องผลประโยชน์ค่าสินไหมทดแทน

and, answering the standalone question directly:

> ประกันสุขภาพออนไลน์ต้องซื้อพร้อมประกันชีวิตหรือไม่? — สามารถซื้อเดี่ยวได้ โดยไม่ต้องซื้อพร้อมประกันชีวิต

**No premium was obtained for GEN Health First / Mini / Top Up.** The rate endpoint
(`POST /api/v2/nl-pricing`) requires a Bearer token minted by
`POST /api/v1/customers/`, which returned 502 and then 503 to every payload shape tried;
the attempt was stopped rather than hammered. Anyone picking this up should note the
sweep is *probably* achievable — the customer record at step 1 takes only sex and date of
birth — but it was not achieved here, and no number is recorded that was not retrieved.

---

## 4. บริษัท ชับบ์ ไลฟ์ แอสชัวรันซ์ จำกัด (มหาชน) — Chubb Life — NOT INCLUDED, no premium anywhere

Two individual health riders, both extensively documented on benefits, both with **no
premium published in any form, at any age, in any document**.

### 4a. 3D Health Excellence

https://www.chubb.com/th-th/personal/3d-health-excellence.html
Brochure: https://www.chubb.com/content/dam/chubb-sites/chubb-com/th-th/personal/3d-health-excellence/3d-health-excellence-brochure.pdf

Underwriting rules, verbatim from the product page — and note item 4, which is a
disclosure no other life insurer in this dataset makes:

> 1. อายุที่รับประกันภัย: 11 - 75 ปี
> 2. ระยะเวลาเอาประกันภัย: 1 ปี สามารถต่ออายุได้ถึง 99 ปี และให้ความคุ้มครองสูงสุดถึงอายุ 100 ปี
> 4. จํานวนเงินเอาประกันภัยขั้นตํ่าของสัญญาหลัก: ไม่มีจํากัดขั้นตํ่าของจํานวนเงินเอาประกันภัยของสัญญาหลัก

**"There is no minimum sum insured on the main policy."** That is the closest any insurer
here comes to publishing a host-policy floor without publishing a number: Chubb is saying
the floor is whatever its cheapest main policy costs. It still does not name that policy
or price it, so `host_policy.premium` remains unfillable — but the sentence is worth
reproducing verbatim to a reader, because it means the host cost is minimisable rather
than pegged to a large sum assured.

Benefit shape, six plans, `ต่อรอบปีกรมธรรม์ประกันภัย` — **per policy year**:

| | แผน 1 | แผน 2 | แผน 3 | แผน 4 | แผน 5 | แผน 6 |
|---|---|---|---|---|---|---|
| ผลประโยชน์สูงสุดต่อรอบปีฯ กรณีเจ็บป่วยด้วยโรคร้ายแรง | 2,000,000 | 6,000,000 | 10,000,000 | 20,000,000 | 120,000,000 | 240,000,000 |
| หมวดที่ 1 ค่าห้อง ค่าอาหาร ค่าบริการในโรงพยาบาล สูงสุด 365 วัน ต่อรอบปีฯ | 1,500 | 2,000 | 4,000 | 6,000 | 15,000 | 30,000 |

The Extra and Advance layers carry **their own copay percentages inside the benefit
table**, which is unusual and easy to miss:

> ข้อ 2 ความคุ้มครองสุขภาพจิต(1) (ค่าใช้จ่ายร่วม 20%)
> ข้อ 3 ค่าตรวจรักษาทางทันตกรรม(1)(2) (ค่าใช้จ่ายร่วม 20%)
> ข้อ 2 การตรวจสุขภาพประจำปีและค่าฉีดวัคซีน ต่อรอบปีกรมธรรม์ประกันภัย … ข้อ 2 (ค่าใช้จ่ายร่วม 10%)

A single `copay_percent` field cannot represent that — it is 0% on the medical core and
10–20% on named ancillary benefits.

### 4b. สัญญาเพิ่มเติมค่ารักษาพยาบาลและผ่าตัด(รพ.) เฮลท์ พรีเมียม เอ็กซ์ตร้า (Health Premium Extra)

https://www.chubb.com/th-th/personal/health-premium-extra-rider.html
Factsheet: https://www.chubb.com/content/dam/chubb-sites/chubb-com/th-th/personal/medical-protection-chubb-life/factsheet_hpe_2024.final.pdf

Entry and renewal `[sic: extraction]`:

> อายุรับประกันภัย
> - สำ�หรับแผน 1-5: 11 ปี จนถึงอายุ 70 ปี (สามารถต่ออายุได้ถึงอายุ 85 ปี)
> - สำ�หรับแผน 6: 16 ปี จนถึงอายุ 70 ปี (สามารถต่ออายุได้ถึงอายุ 85 ปี)

Six plans, `ผลประโยชน์สูงสุดต่อรอบปีกรมธรรม์ประกันภัย` = 1,000,000 / 3,000,000 /
6,000,000 / 12,000,000 / 20,000,000 / 30,000,000, with room and board
`ต่อรอบปีกรมธรรม์ประกันภัย` at 1,000 / 2,000 / 3,000 / 5,000 / 8,000 / 12,000 ต่อวัน
(365 วัน).

And, remarkably, Chubb prints both fields as flat zeroes:

> ความรับผิดส่วนแรก — ไม่มี
> ค่าใช้จ่ายร่วม — ไม่มี

That is a rare *positive* disclosure: `deductible_thb: 0` and `copay_percent: 0` on
published authority rather than by assumption. It does not, however, say anything about
copay imposed **on renewal**, which the 2564 standard permits; Chubb publishes no
renewal-copay clause for this rider at all.

Exclusions are three items and labelled partial:

> เงื่อนไข และข้อยกเว้นความคุ้มครองเบื้องต้น

### 4c. Why Chubb is rejected

The string `เบี้ย` appears in the 3D Health Excellence brochure **only** in the
tax-deduction sentence, and in the Health Premium Extra factsheet **only** in
`สามารถนำ�ไปลดหย่อนภาษีเงินได้บุคคลธรรมดา สำ�หรับเบี้ยประกันภัยสุขภาพตามเงื่อนไขของกรมสรรพากร`
`[sic: extraction]`. Neither document contains a rate table, a sample premium, or a
starting price. Both product pages end at `ลงทะเบียนความสนใจ >` — a lead form asking for
name, phone and email under a PDPA consent for `บมจ. ชับบ์ ไลฟ์ แอสชัวรันซ์`. `premium` is
a required non-empty array in this repo's schema. Same disposal as AXA and
กรุงเทพประกันภัย.

---

## 5. แมนูไลฟ์ ประกันชีวิต (ประเทศไทย) — THE COMPANY NO LONGER EXISTS UNDER THAT NAME

`manulife.co.th` **does not resolve**. This is not a network problem at this end; it is
NXDOMAIN at the `.co.th` registry:

```
$ dig manulife.co.th @1.1.1.1
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN
$ dig www.manulife.co.th @1.1.1.1
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN
```

(`ocean.co.th` resolves normally from the same resolver in the same session, so the
registry and the resolver are both working.)

The successor company says so itself, on its own domain:

> เรามอบความคุ้มครองที่ครอบคลุมให้กับคนไทยอย่างต่อเนื่องด้วยกรมธรรม์ประกันชีวิตที่หลากหลายมากว่า 60 ปี โดยเดิมดำเนินธุรกิจในนาม บริษัท แมนูไลฟ์ ประกันชีวิต (ประเทศไทย) จำกัด (มหาชน) ผ่านสำนักงานใหญ่ในกรุงเทพมหานครฯ และสาขาทั้ง 4 ในหัวเมืองหลักๆ ทั่วประเทศไทย

https://www.kwilife.com/about-us — บริษัท เคดับบลิวไอ ประกันชีวิต จำกัด (มหาชน), part of
King Wai Group.

**Nothing may be entered in this dataset under the name "แมนูไลฟ์".** Doing so would put a
company that no longer trades in front of a reader as a live option. This is the same
disposal as ซิกน่า/เอ็ทน่า in `standalone-health-sourcing.md` §5, but with a harder proof:
there the brand had merely been absorbed; here the domain itself is gone from DNS.

### 5a. The successor: เคดับบลิวไอ ประกันชีวิต (KWI Life) — one worked host premium

KWI Life sells `ประกันสุขภาพเหมาจ่าย Max Protect Ultra` and
`ประกันสุขภาพเหมาจ่ายเด็ก Max Junior Saving Ultra`
(https://www.kwilife.com/product-category/health-insurance). Recorded here only so the
next pass does not have to rediscover the rename.

https://www.kwilife.com/max-protect-ultra publishes the package composition and,
like Ocean Life, **splits the host from the rider** — but at one age and one sex only:

> ตัวอย่างผลประโยชน์ความคุ้มครองสำหรับเพศหญิง อายุ 30 ปี จำนวนเงินเอาประกันภัย 100,000 บาท (ไม่รวมเงินปันผล)
> จำนวนเงินเอาประกันภัย 100,000
> เบี้ยประกันชีวิต 1,161
> เบี้ยประกันสุขภาพ แผน Platinum 3,000,000 (สามารถชำระเบี้ยสำหรับส่วนนี้เพิ่มถึงอายุ 85 ปี เบี้ยประกันจะปรับเปลี่ยนตามช่วงอายุ) 28,414
> เบี้ยประกันรวมรายปี 29,575

The host is named and floored:

> สัญญาหลัก : แบบพรีเมียร์ โปรเทคชั่น 90/90 (มีเงินปันผล)
> อายุรับประกัน 20 ปีขึ้นไป … จำนวนเงินเอาประกันภัยขั้นต่ำ 100,000 บาท

Rider conditions:

> สัญญาเพิ่มเติม ประกันภัยสุขภาพเหมาจ่ายสุขใจ
> • อายุที่รับประกันภัย : 11 – 65 ปี และต่ออายุได้จนถึงอายุ 84 ปี
> • สามารถซื้อสัญญาเพิ่มเติมประกันสุขภาพเหมาจ่ายสุขใจแนบท้ายกรมธรรม์ประกันภัยแบบสะสมทรัพย์ และแบบตลอดชีพ
> • 1 กรมธรรม์ สามารถซื้อสัญญาเพิ่มเติมประกันสุขภาพเหมาจ่ายสุขใจได้เพียง 1 แผนเท่านั้น

and the OPD rider cannot stand alone:

> • ต้องซื้อสัญญาเพิ่มเติมการรักษาพยาบาลกรณีผู้ป่วยนอก (OPD) ควบกับ สัญญาเพิ่มเติมการประกันภัยสุขภาพพลัสวัน (HS plus one) หรือ ประกันสุขภาพเหมาจ่ายสุขใจ เท่านั้น

This is a genuinely useful *class* of disclosure — KWI names the permitted host families
(`แบบสะสมทรัพย์ และแบบตลอดชีพ`) rather than staying silent, which is more than AIA, FWD,
BLA or Generali do. But one age and one sex is not a rate table, and KWI was outside this
brief's five insurers; it is flagged for a later pass, not entered.

---

## 6. Not included and why — this round

| Insurer / plan | Verdict | Reason |
|---|---|---|
| ไทยสมุทร โอชิ สมอล เฮลท์ (Package 1/2/3) | **ADDABLE, best-documented rider in the dataset** | Host named and priced at every age 16–80 both sexes; current filed wording published; copay quantified in the contract |
| ไทยสมุทร ซูพรีม เฮลท์ | **ADDABLE, sample premiums only** | Unisex premiums at 4 ages; per-policy-year limits to 100M; `host_policy.premium: null` — Ocean names no host for this rider |
| ไทยสมุทร เอ็นจอย เฮลท์ เอ็กซ์ตร้า | **ADDABLE, sample premiums only** | Sex-split premiums at 4 ages × 4 deductibles; **per-confinement** limits; room and board is `จ่ายตามจริง` with no baht figure; `host_policy.premium: null` |
| โตเกียวมารีน โตเกียว กู๊ด เฮลธ์ ไพรม์ | NOT ASSESSED | Insurer's WAF (Incapsula) blocked every retrieval; no verbatim quote could be captured. Not the same as "not published" — needs a human with a browser |
| เจนเนอราลี่ Gen Health Hero Plus | **ADDABLE, `host_policy.premium: null`** | Complete 14-band sex-split table 0–70 across 9 plans; copay fully quantified; blocked only on the host |
| เจนเนอราลี่ Gen Extra Health Care | NOT INCLUDED | Premium disclosure is the sentence `ขึ้นอยู่กับเพศ อายุ และชั้นอาชีพ`. No table, no sample, no brochure |
| เจนเนอราลี่ Gen Health Premier | NOT INCLUDED | Three benefit sentences and a name/phone/email lead form. No entry age, no renewal ceiling, no premium |
| เจนเนอราลี่ GEN Health First / Mini / Top Up | OUT OF SCOPE (non-life) | Written by บมจ. เจนเนอราลี่ ประกันภัย, not the life company. Current filed wording IS published — see §3d |
| ชับบ์ ไลฟ์ 3D Health Excellence | NOT INCLUDED | No premium in the brochure or on the page. Layer-specific copays (10–20%) also do not fit `copay_percent` |
| ชับบ์ ไลฟ์ เฮลท์ พรีเมียม เอ็กซ์ตร้า | NOT INCLUDED | No premium in the factsheet or on the page |
| แมนูไลฟ์ ประกันชีวิต (ประเทศไทย) | **MUST NOT BE INCLUDED** | Company renamed to เคดับบลิวไอ ประกันชีวิต; `manulife.co.th` is NXDOMAIN |
| เคดับบลิวไอ Max Protect Ultra | NOT INCLUDED (flagged) | Host named and priced, but at one age and one sex only. Outside this brief's scope |

## 7. NOT FOUND / does not exist publicly

Each line states what was looked for, and where the looking was done.

1. **A host-policy premium for ไทยสมุทร ซูพรีม เฮลท์ or เอ็นจอย เฮลท์ เอ็กซ์ตร้า — does not
   exist publicly.** Looked in both brochures (the only reference is
   `ต้องสอดคล้องกับงวดการชําระเบี้ยประกันภัยของกรมธรรม์หลัก`), on both product pages'
   `ข้อมูลแบบประกัน` blocks, and across
   https://www.ocean.co.th/service/downloads/document, which holds servicing and claim
   forms only. Ocean Life prices a host for OCHI Small Health and for nothing else.
2. **Filed policy wording for ซูพรีม เฮลท์ and เอ็นจอย เฮลท์ เอ็กซ์ตร้า — does not exist
   publicly.** Same three locations. The `download/brochure` endpoint on each product page
   returns a marketing brochure, not a contract; only the OCHI product's
   `download/benefit` endpoint returns filed wording.
3. **A full age-band premium table for ซูพรีม เฮลท์ or เอ็นจอย เฮลท์ เอ็กซ์ตร้า — does not
   exist publicly.** Both brochures publish exactly four sample ages (20/30/40/50) and
   then direct the reader to an agent:
   `ข้อมูลเบี�ยประกันภัย สามารถสอบถามเพิ� มเติมได้จากที�ปรึกษาประกันชีวิต (ตัวแทนประกันชีวิต) ของบริษัท`.
4. **Which main policies accept เจนเนอราลี่ Gen Health Hero Plus, and what they cost — does
   not exist publicly.** Looked at the brochure's `เงื่อนไขการรับประกันภัย` block (which
   only says `หรือจนกระทัง่ แบบประกันภัยหลักสิน้ ผลบังคับ`), at both Hero product pages, and
   at the Gen Extra Health Care and Gen Health Premier pages. No permitted-host list, no
   minimum sum assured, no worked example anywhere on generali.co.th.
5. **A benefit schedule, waiting period or exclusion list for Gen Extra Health Care — does
   not exist publicly.** Its product page links no PDF; the page's own
   `ตัวอย่างข้อยกเว้นความคุ้มครอง` block lists only non-disclosure and suicide, which are
   life-policy exclusions, not health ones.
6. **A premium for any ชับบ์ ไลฟ์ health rider — does not exist publicly.** Both brochure
   PDFs were searched for `เบี้`, `Premium` and `ตัวอย่าง`; the only hits are the
   tax-deduction sentences. Both product pages end at a lead form.
7. **A renewal-copay clause for ชับบ์ ไลฟ์ เฮลท์ พรีเมียม เอ็กซ์ตร้า — does not exist
   publicly.** The factsheet publishes `ค่าใช้จ่ายร่วม — ไม่มี`, which describes year one.
   Nothing in the document says whether the 2564 standard's renewal copay can be imposed.
8. **A full exclusion list for any product in this round — does not exist publicly.**
   Ocean Life's brochures print five items and label them partial; Generali's brochure
   prints three under `ข้อยกเว้นบางส่วน`; Chubb prints three under
   `ข้อยกเว้นความคุ้มครองเบื้องต้น`. The one exception is the OCHI filed wording, which
   carries the contract's own exclusion section — the only complete set obtained this
   round. KTAXA remains the only life insurer publishing a standalone full-exclusions PDF.
9. **Anything at all about โตเกียวมารีนประกันชีวิต — not obtained.** See §2 for the six
   URLs and the six retrieval strategies tried. This is a *retrieval* failure, not a
   publication failure, and the file deliberately does not claim otherwise.

## 8. What this round changes about the project's assumptions

1. **The host-policy black hole is not a law of nature — it is a channel artefact.**
   Every rider whose host premium is hidden is sold through agents. The one rider whose
   host premium is published at every age, ไทยสมุทร โอชิ สมอล เฮลท์, is sold online, where
   the insurer has to show the buyer a total before taking a card. The rule is better
   stated as: *insurers publish the host premium exactly when the law of online selling
   forces them to*. That predicts where to look next, and it is a more useful hypothesis
   than "Thai life insurers hide the host".
2. **A checkout is a better primary source than a brochure, and this round proves it a
   second way.** `standalone-health-sourcing.md` established the point on non-life
   calculators. Ocean Life extends it to a *life rider*: the same insurer that publishes
   four sample ages in the Supreme Health brochure publishes 65 exact ages in its OCHI
   checkout. Prefer the checkout wherever one exists.
3. **`copay_on_renewal` now has a filed-contract source.** Round 2 could fill the field
   for ไทยประกันชีวิต from a product page. §1c fills it for ไทยสมุทร from the wording
   itself, with the ICD-10 Simple-diseases definition attached. That is the first time in
   this project the copay text a reader is shown comes from the contract.
4. **`copay_percent` needs to be per-benefit, or the schema will mislead on Chubb.**
   3D Health Excellence is 0% on the medical core and 10–20% on mental health, dental and
   the annual check-up. A single scalar renders that as either 0 (hiding a real cost) or
   20 (defaming the core cover). Neither is honest. Chubb is excluded on price anyway, so
   this is not urgent — but it will be the moment a Chubb premium surfaces.
5. **"Insurer X" must be resolved to a licensed entity before anything is recorded.**
   Two of this round's five names failed that test: แมนูไลฟ์ no longer exists, and
   `generali.co.th` mixes a life insurer's riders with a non-life insurer's standalone
   policies in one navigation tree with no visual distinction. Any future round should
   confirm the `รับประกันโดย` line on the specific product page before writing a YAML
   `insurer` block.
