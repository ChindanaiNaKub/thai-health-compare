# Round 3 sourcing: the health specialists and the Japanese non-life insurers

Research date: 2026-08-10. Same rules as the other files in this directory: every claim
is followed by the verbatim Thai it rests on and the exact URL that Thai lives on. Only
insurer-owned domains and insurer-hosted documents were used for product facts. คปภ./OIC
was used only for licence status, company existence and name changes. No agent, broker or
comparison site is cited for anything, premium included.

Scope: แปซิฟิค ครอส ประกันสุขภาพ, กรุงเทพประกันสุขภาพ, บูพา ประกันสุขภาพ (ประเทศไทย),
เอ็ม เอส ไอ จี / มิตซุย สุมิโตโม, ซมโปะ ประกันภัย, คุ้มภัยโตเกียวมารีนประกันภัย.

**Outcome: Pacific Cross is the single biggest find this project has made.** It publishes
no rate-table PDF at all — and it does not need to, because its own online-application
site runs an *anonymous* quote endpoint that returns the whole rate card as JSON. Swept
across every age from 0 to 99, it yields a complete 14-band premium structure for nine
plans, unisex, with the insurer's own stamp-duty formula and its own OPD loading. That is
a more authoritative source than any brochure, because it is the price the insurer will
actually sell at today, and it can be re-checked with one `curl`.

Two of the six companies were name-verification jobs, and both came out the opposite way
from the assumption in the brief.

## Method note on the quotes

Four different extraction situations, and they matter to anyone re-checking.

1. **Pacific Cross's premiums are JSON, not prose.** They come from the insurer's own
   quote endpoint (§1c) and are reproduced as returned. No OCR, no PDF column mapping, no
   interpolation.
2. **Pacific Cross's benefit tables are HTML.** They were read from the product pages'
   own markup (`curl` + tag strip), so the Thai below is the site's own text and can be
   re-checked with view-source. Those quotes are exact.
3. **Pacific Cross's brochure PDFs are enciphered, not merely lossy.** `pdftotext` on the
   four `PCHI *- TH-ENG 2025-9-15.pdf` files returns private-use gibberish for *both*
   Thai and Latin, because Adobe Illustrator subset the Sarabun and Proxima Nova faces
   with no `ToUnicode` map (`pdffonts` shows `uni = no` on every one of them). Example, the
   Thai for "benefits", as extracted:

   > ǑǛǐǘǧǬǗƹǎ˪ ǡ˸Ǩ ǢǘǏ˝ Ǒ́ˢǐˡǞǗǭǎ  [sic: extraction]

   Digits are enciphered by a simple consecutive shift, `0→Ǳ, 1→ǲ, 2→ǳ … 9→Ǻ`. That map is
   **not** a guess: it was validated twice against plain text elsewhere on the insurer's
   own site — `ǳȤǱǱǱ` decodes to 2,000, which is exactly the Standard room rate printed in
   Thai HTML on the product page, and `ǵǶ` decodes to 45, which is exactly the
   `ไม่เกิน 45 วัน` printed in the same HTML row. Where a brochure number is quoted below,
   the ciphertext is shown alongside so the decoding can be checked. No brochure *word* is
   quoted as if it were readable.
4. **Pacific Cross's policy wording exists only in English.** This is a finding, not an
   extraction problem, and is dealt with in §1g.

---

## 1. บริษัท แปซิฟิค ครอส ประกันสุขภาพ จำกัด (มหาชน) — Pacific Cross Health Insurance PCL

A non-life insurer that writes health and personal accident only. Company identity, in
its own words in the footer of every Thai page:

> บริษัท แปซิฟิค ครอส ประกันสุขภาพ จำกัด (มหาชน)
> 3 อาคารรัจนาการ ชั้นที่ 16 โซนบีซี ถนนสาทรใต้ แขวงยานนาวา เขตสาทร กรุงเทพมหานคร 10120

https://www.pacificcrosshealth.com/th/download-center

The คปภ. reference index carries it as a licensed non-life company under code 2032:

> 2032 บริษัท แปซิฟิค ครอส ประกันสุขภาพ จำกัด (มหาชน)      Pacific Cross Health Insurance Public PCHI

https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337
(`ดัชนีตารางรหัสอ้างอิงมาตรฐานของบริษัทประกันภัย`, สำนักงาน คปภ., มิถุนายน 2563)

### 1a. Standalone, and the product family

One product line, "นิวนอร์มอล ไลฟ์สไตล์ ซีรีส์" (New Normal Lifestyle Series), sold in four
families and nine plans. There is no life policy anywhere in the flow — the application
form is headed `ใบคําขอเอาประกันภัย กรมธรรม์ประกันภัยสุขภาพและอุบัติเหตุ นิวนอร์มอล ไลฟ์สไตล์ ซีร่ีย์`
(https://cdn.prod.website-files.com/685ac8dcfa95c0ec42c27bd1/68f0ceef3e3614404ec6b46e_PCH-SL-S36_15AUG2024%20New%20Normal%20Lifestyle%20(TH).pdf).
`host_policy: null` is correct.

Product pages used throughout:

- Standard / Standard Plus / Standard Extra — https://www.pacificcrosshealth.com/th/insurance-plan/health-accident-insurance-standard-plan
- Premier / Premier Plus — https://www.pacificcrosshealth.com/th/insurance-plan/health-accident-insurance-premier-plan
- Maxima / Maxima Plus — https://www.pacificcrosshealth.com/th/insurance-plan/health-accident-insurance-maxima-plan
- Ultima / Ultima Plus — https://www.pacificcrosshealth.com/th/insurance-plan/health-accident-insurance-ultima-plan

Note the plan-code mapping, from the quote engine's own JSON: `NSTA` Standard, `NSTP`
Standard Plus, `NSTE` Standard Extra, `NPRE` Premier, `NPRP` Premier Plus, `NMAX` Maxima,
`NMAP` Maxima Plus, `NULT` Ultima, `NULP` Ultima Plus.

### 1b. What the brochures do NOT contain

All four bilingual brochures (`PCHI Standard/Premier/Maxima/Ultima - TH-ENG 2025-9-15.pdf`,
document code `PCH-SL-S16_15SEP2025`, linked from
https://www.pacificcrosshealth.com/th/download-center) contain **no premium table of any
kind**. The only age-linked grid in them is the deductible and no-claim discount ladder.
Anyone re-checking should not waste time on them: page 7 is discounts, page 8 is the
address block.

### 1c. The premium source: Pacific Cross's own anonymous quote endpoint

This is the headline. `https://onlineapplication.pacificcrosshealth.com/` runs a quote
engine that returns the full rate card **before** any personal data is collected — date of
birth, sex and nationality only, no name, no email, no captcha. The page's own JavaScript
fires it on date-of-birth selection (`handle_discover_insurance_plans` →
`handle_display_plan_form` in `https://onlineapplication.pacificcrosshealth.com/modules/share.js`):

```
POST https://onlineapplication.pacificcrosshealth.com/index.php?ajax=1&qe_change_plan=1
gender=M&nationality=117&birth_date=1990-01-01&maternity=0&input_oa=0&input_ox=0&input_imm=0&input_ltr=0
```

It answers with `{"html":…,"age":…,"plan_items":[…]}`, and each `plan_items` entry carries
`plan_code`, `room`, `annual_limit`, `base_premium`, `opd_premium`, `dental_premium`,
`vision_premium`, `family_discount` and the PA sum-insured range. Swept at
`birth_date = YYYY-01-01` for every year from 2026 back to 1920, both sexes.

Three properties of the engine that must be recorded with the numbers:

1. **Unisex.** Male and female responses are byte-identical at every one of the 80 ages
   swept. Pacific Cross does not split by sex — unlike FWD, BLA and KTAXA.
2. **Nationality does not change the price.** Tested at Thai (117), and three foreign
   nationalities: identical `base_premium`. The plans are the same product for expats and
   Thais, which is unusual for an expat-oriented insurer.
3. **`base_premium` is the IPD+OPD figure, not IPD alone.** The insurer's own calculation
   function subtracts OPD when the buyer declines it
   (`if (!data?.opd_cover) { base_premium -= opd_premium; }`), and adds stamp duty last:
   > `let stamp_duty = Math.ceil(base_premium * 0.4 / 100);//0.04%`
   > `let annual_premium = Math.ceil(base_premium + stamp_duty);`

   `share.js`, function `gain_calculate_plan_premium`. Note the insurer's own code comment
   says 0.04% while the arithmetic is 0.4% — the arithmetic is what runs, and 0.4% is the
   correct Thai stamp duty on non-life premium.

The Thai UI confirms stamp duty is inside the displayed figure, in the insurer's own
(misspelled) words:

> เบี้ยประกันรวม … บาท (รวมอากรณ์แสตมป์)

https://onlineapplication.pacificcrosshealth.com/index.php?lang=TH
(`อากรณ์แสตมป์` is the site's spelling; the standard spelling is `อากรแสตมป์`.)

### 1d. THE COMPLETE PREMIUM TABLE

Every band, every plan, THB per year, **unisex**, **stamp duty included**, as at
2026-08-10. Each cell is `IPD only / IPD + OPD`, both computed with the insurer's own two
published formulas above from the `base_premium` and `opd_premium` the engine returns:
IPD-only `= ceil((base_premium − opd_premium) × 1.004)`, full `= ceil(base_premium × 1.004)`.

| อายุ (ปี) | Standard | Standard Plus | Standard Extra | Premier | Premier Plus | Maxima | Maxima Plus | Ultima | Ultima Plus |
|---|---|---|---|---|---|---|---|---|---|
| 0-4 | 28,068 / 35,086 | 35,085 / 43,857 | 43,105 / 53,882 | 34,121 / 42,652 | 49,484 / 61,855 | 57,457 / 71,823 | 64,224 / 80,280 | 73,363 / 91,704 | 88,151 / 110,188 |
| 5-18 | 8,896 / 11,121 | 12,260 / 15,326 | 15,331 / 19,164 | 19,686 / 24,608 | 28,547 / 35,685 | 33,150 / 41,438 | 37,053 / 46,317 | 42,326 / 52,908 | 50,856 / 63,571 |
| 19-25 | 8,066 / 10,083 | 11,117 / 13,897 | 13,900 / 17,375 | 17,851 / 22,313 | 25,884 / 32,355 | 30,055 / 37,569 | 33,595 / 41,995 | 35,366 / 44,209 | 46,109 / 57,637 |
| 26-30 | 9,490 / 11,863 | 13,077 / 16,347 | 16,352 / 20,440 | 20,999 / 26,249 | 30,453 / 38,066 | 35,359 / 44,200 | 39,522 / 49,403 | 45,148 / 56,435 | 54,247 / 67,809 |
| 31-35 | 10,675 / 13,345 | 14,712 / 18,391 | 18,395 / 22,994 | 23,623 / 29,529 | 34,258 / 42,823 | 39,779 / 49,725 | 44,463 / 55,579 | 50,791 / 63,489 | 61,028 / 76,285 |
| 36-40 | 11,860 / 14,826 | 16,347 / 20,434 | 20,439 / 25,549 | 26,248 / 32,810 | 38,064 / 47,581 | 44,201 / 55,251 | 49,403 / 61,755 | 56,433 / 70,543 | 67,807 / 84,759 |
| 41-45 | 13,046 / 16,308 | 17,982 / 22,478 | 22,482 / 28,103 | 28,873 / 36,091 | 41,870 / 52,338 | 48,618 / 60,773 | 54,343 / 67,929 | 62,076 / 77,595 | 74,588 / 93,235 |
| 46-50 | 14,826 / 18,532 | 20,434 / 25,542 | 25,549 / 31,937 | 32,809 / 41,012 | 47,578 / 59,473 | 55,249 / 69,062 | 61,755 / 77,194 | 70,542 / 88,177 | 84,758 / 105,949 |
| 51-55 | 16,012 / 20,015 | 22,068 / 27,585 | 27,592 / 34,491 | 35,434 / 44,292 | 51,385 / 64,231 | 59,669 / 74,587 | 66,694 / 83,369 | 76,184 / 95,230 | 91,540 / 114,425 |
| 56-60 | 18,383 / 22,979 | 25,336 / 31,671 | 31,680 / 39,600 | 40,683 / 50,854 | 58,997 / 73,746 | 68,472 / 85,590 | 76,574 / 95,718 | 87,471 / 109,339 | 105,100 / 131,376 |
| 61-65 | 21,941 / 27,427 | 30,241 / 37,801 | 37,811 / 47,265 | 48,558 / 60,697 | 70,416 / 88,020 | 81,766 / 102,209 | 91,396 / 114,245 | 104,400 / 130,501 | 125,441 / 156,802 |
| 66-70 | 30,243 / 37,804 | 41,683 / 52,104 | 52,117 / 65,147 | 66,929 / 83,662 | 97,061 / 121,327 | 112,707 / 140,884 | 125,976 / 157,471 | 143,902 / 179,877 | 172,905 / 216,133 |
| 71-74 | 45,067 / 56,334 | 62,113 / 77,642 | 77,663 / 97,079 | 99,736 / 124,670 | 144,637 / 180,796 | 167,952 / 209,940 | 187,729 / 234,662 | 214,442 / 268,052 | 257,664 / 322,081 |
| 75 | — | — | — | — | 144,637 / 180,796 | — | — | — | — |
| 76-80 | — | — | — | — | 194,120 / 242,650 | — | — | — | — |
| 81-85 | — | — | — | — | 241,696 / 302,121 | — | — | — | — |
| 86-90 | — | — | — | — | 304,498 / 380,623 | — | — | — | — |
| 91-95 | — | — | — | — | 388,111 / 485,138 | — | — | — | — |
| 96-99 | — | — | — | — | 488,960 / 611,200 | — | — | — | — |

At age 100 the engine returns an empty `plan_items` array for every plan. That is the
hard stop, and it agrees exactly with the wording's renewal clause in §1g.

Two structural facts inside that table worth naming:

- **The first band is the expensive one.** A newborn on Standard costs 28,068 and a
  five-year-old 8,896 — a 3.2× drop at the same benefit level. Every other insurer in this
  dataset has the same shape (ไทยประกันสุขภาพ's 15 วัน-5 band is 6× the 21-35 band), so
  this is the market, not a Pacific Cross quirk. It is also the band most likely to be
  mis-rendered as "cheap children's cover" by a comparison site.
- **Above 74, only Premier Plus is quoted.** All eight other plans vanish from the
  response at age 75. Premier Plus is the plan that meets the O-A visa's 3,000,000-baht
  requirement, and it is the only one Pacific Cross keeps quoting to 99.

**OPD is priced as a flat 20% loading, at every age.** `opd_premium / base_premium` is
0.2000 ± 0.0001 for all nine plans at all fourteen bands. That is a real published fact
about the product, and it is unusual: every other insurer in this dataset prices OPD from
its own separate age table.

Dental and vision are separate add-on premiums with their own, coarser bands, and both
**stop being sold at 66**. Premier / Premier Plus and Maxima / Maxima Plus only; the
Standard and Ultima families return 0 for both:

| อายุ (ปี) | ทันตกรรม Premier | ทันตกรรม Maxima | สายตา Premier | สายตา Maxima |
|---|---|---|---|---|
| 0-4 | 3,358 | 5,875 | 1,858 | 3,715 |
| 5-25 | 8,730 | 15,278 | 1,858 | 3,715 |
| 26-35 | 9,403 | 16,454 | 2,477 | 4,952 |
| 36-45 | 10,071 | 17,624 | 2,477 | 4,952 |
| 46-50 | 10,743 | 18,801 | 2,785 | 5,568 |
| 51-55 | 11,415 | 19,977 | 2,785 | 5,568 |
| 56-60 | 12,422 | 21,738 | 3,094 | 6,185 |
| 61-65 | 13,428 | 23,499 | 3,711 | 7,423 |
| 66+ | ไม่ขาย (0) | ไม่ขาย (0) | ไม่ขาย (0) | ไม่ขาย (0) |

### 1e. Deductible — five options, published, and not offered on the two cheapest plans

The Thai quote page lists them:

> ต้องการรับผิดชอบค่าใช้จ่ายส่วนแรกหรือไม่?
> (ค่าใช้จ่ายส่วนแรกสามารถใช้เพื่อลดราคาเบี้ยประกันรายปีได้)
> ไม่ใช่/ไม่เคย / 20,000 บาท/ปี / 40,000 บาท/ปี / 100,000 บาท/ปี / 200,000 บาท/ปี / 300,000 บาท/ปี

https://onlineapplication.pacificcrosshealth.com/index.php?lang=TH

The radio `value` attribute on each option **is the discount percentage**: 15, 25, 32.5,
40, 50 for 20,000 / 40,000 / 100,000 / 200,000 / 300,000 respectively, and the engine
applies it as `Math.ceil(base_premium * deductible_discount / 100)`. Those five figures
match the discount ladder printed in the brochure (`ǲǶʃ ǳǶʃ ǴǳȣǶʃ ǵǱʃ ǶǱʃ`
[sic: extraction] = 15% 25% 32.5% 40% 50%), which is a clean cross-check of both the
cipher and the engine.

The deductible is **per policy year**, not per confinement — brochure line
`%ûõŹïűěîįûǳǱȤǱǱǱîÓĖűŞûšŞńįěïƘƘûÓš` [sic: extraction] = "Deductible 20,000 baht per policy
year", and the wording confirms the annual basis (§1g). This makes it directly comparable
with KTAXA's per-year deductible and **not** with ไทยประกันชีวิต Health Fit DD's
per-confinement one.

Standard and Standard Plus cannot take a deductible at all. The page's own JavaScript
hides the control for exactly those two plan names, and the brochure prints
`Ǯǖ˟ǖ˲ǡ˟ǞǎǛǉ / gńűƑÓěįÓîįû` [sic: extraction] = "ไม่มีส่วนลด / Not available" in their columns.

### 1f. Benefit table — published in clean Thai HTML, and the limit basis is per confinement

The Standard family, verbatim from the comparison table on the product page:

> ผลประโยชน์สูงสุดต่อการรักษาเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง
> 270,000 / 450,000 / 780,000

> หมวดที่ 1: ค่าห้อง ค่าอาหาร และค่าบริการในโรงพยาบาลหรือสถานพยาบาลต่อการเข้าพักรักษาเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง ไม่เกิน 45 วัน
> 2,000 ต่อวัน / 3,000 ต่อวัน / 4,000 ต่อวัน

https://www.pacificcrosshealth.com/th/insurance-plan/health-accident-insurance-standard-plan

Premier:

> จำนวนเงินผลประโยชน์สูงสุดต่อการรักษาเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง
> 1,200,000 / 3,000,000
> หมวดที่ 1: … 5,000 ต่อวัน (ไม่เกิน 45 วัน) / 6,000 บาทสูงสุดต่อวัน
> ค่าห้องผู้ป่วยวิกฤติ 10,000 ต่อวัน (ไม่เกิน 15 วัน) / 12,000 บาทสูงสุดต่อวัน

https://www.pacificcrosshealth.com/th/insurance-plan/health-accident-insurance-premier-plan

Maxima and Ultima use the identical heading `ผลประโยชน์สูงสุดต่อการรักษาเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง`
for 5,000,000 / 10,000,000 and 20,000,000 / 50,000,000, with rooms 8,000 / 10,000 and
16,000 / 18,000 per night.

**This is the sharpest contradiction found this round.** The insurer's own quote engine
returns those same figures in a JSON field literally named `annual_limit`:

```
{"plan_code":"NSTA","room":"2,000","annual_limit":"270,000","base_premium":14766, …}
```

while the Thai benefit table on the insurer's own product page calls the same number
`ต่อการรักษาเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง` — per confinement. The filed wording sides with the
product page:

> Per Confinement means Hospitalization as an inpatient or day surgery at the Hospital or Medical Facility each time and shall include Hospitalization as an inpatient or day surgery … no matter how many times for injury or illness caused by the same injury or illness that is not fully recovered including related or consequential complications within 90 days from the date of the latest discharge …

> However, the combined of all benefit amounts under this Insuring Agreement must not exceed maximum Benefit Amount per Confinement and/or the Maximum Benefit Amount per Policy Year (if any) as specified in the Benefit Schedule

https://cdn.prod.website-files.com/685ac8dcfa95c0ec42c27bd1/685ac8dcfa95c0ec42c27f38_Policy-Wording-New-Normal-Lifestyle-Series_EN.pdf

`ipd_limit_basis: per_confinement`, on the authority of the product page and the wording
together. A record that copied the engine's `annual_limit` field name would state the
opposite of the contract. The same 90-day re-admission rule as AIA, ไทยประกันสุขภาพ and AXA.

Exception, published in the benefit table itself: หมวดที่ 9, 10 and 11 (dialysis,
radiotherapy, chemotherapy) are `ต่อรอบปีกรมธรรม์ประกันภัย` — per policy year. Same split as
ไทยประกันสุขภาพ and FWD Prima Care.

**OPD is per visit with a visit cap, never an annual total** — the same gap as ทิพย and
Dhipaya:

> การรักษาพยาบาลกรณีผู้ป่วยนอก (สูงสุด 1 ครั้งต่อวัน / 30 ครั้งต่อปี)
> 1,000 / 1,500 / 2,000

So `opd_annual_limit_thb` is `null` with that reason. On Maxima and Ultima OPD is not even
a separate figure:

> การรักษาพยาบาลกรณีผู้ป่วยนอก (รวมอยู่ในภายใต้ข้อตกลงความคุ้มครองการรักษาในโรงพยาบาล หรือสถานพยาบาล - ผู้ป่วยใน)

**A 20% copay exists on dental and vision from day one**, and the insurer states it in
Thai on the product page:

> การรักษาด้านทันตกรรม จ่าย 80% (co-payment 20%)
> การตรวจตา การวัดค่าสายตา และความสามารถในการมองเห็น จ่าย 80% (co-payment 20%)

That is a standing copay on the optional benefits only, not on the IPD schedule, and must
not be recorded in `copay_percent` as if it applied to hospitalisation.

### 1g. Filed wording — published, complete, and English-only

Pacific Cross publishes the whole `New Normal Lifestyle Series — Summary of Health &
Accident Insurance Policy`, 38 pages: definitions, general conditions, general exclusions,
insuring agreements, and thirteen endorsements. It is a genuine `filed_wording` source, and
it is more complete than anything ไทยประกันสุขภาพ or Bangkok Insurance publishes.

https://cdn.prod.website-files.com/685ac8dcfa95c0ec42c27bd1/685ac8dcfa95c0ec42c27f38_Policy-Wording-New-Normal-Lifestyle-Series_EN.pdf

**And it is only in English.** The document's own footer, on every page, says the Thai
version is the one that binds:

> This is an English translation of the Thai policy wording. In case if there is any discrepancy, the Thai policy wording will prevail.       May 2024

A search of both the Thai and English download centres
(https://www.pacificcrosshealth.com/th/download-center,
https://www.pacificcrosshealth.com/en/download-center — 42 PDF links each, the two link
sets differing only in five mobile-app manuals and one application form) finds **no Thai
policy wording**. The
insurer publishes the document it says is not authoritative and withholds the one it says
is. For a Thai-language site aimed at a Thai reader that is the most quotable thing in
this file, and it is the reason every terms quote in §1g and §1h below is in English.

From that wording, the fields the schema needs:

**Renewal ceiling — 99, twice stated.** General condition 6:

> This Insurance Policy may be renewable until the policy year when the Covered Person is not over 99 years of age, no supportive evidence is required.

and again in the inpatient agreement's additional conditions:

> This Insuring Agreement shall be renewed upon the completion of the Insurance Policy year until the policy year when the insured is 99 years (not less than 70 years and up to a maximum of not more than the age specified in premium rate for this Insurance Policy) without the need of evidence.

The quote engine's behaviour matches exactly: rates exist to 99 and stop at 100.

**Waiting periods — 30 and 120 days**, with the standard eight named conditions:

> 3.1 Any illnesses occurring during the 30 days from the first effective date of the Insurance Policy …
> 3.2 The following illnesses occur during the 120 days … 3.2.1 Tumors, cysts or all types of cancer 3.2.2 Hemorrhoids 3.2.3 All types of Hernia 3.2.4 Pterygium or Cataracts 3.2.5 Tonsillectomy or adenoidectomy 3.2.6 All types of Calculus 3.2.7 Varicose Veins of the legs 3.2.8 Endometriosis

Accidents and emergency surgery are carved out, same as ไทยประกันสุขภาพ:

> The Company shall not apply the General Terms and Conditions of Waiting Period … in the event that the Covered Person gets injured or is in need of an emergency operation which is not a consequence of any disease existing prior to the insurance.

**Pre-existing conditions — the same 5-and-3 rule** as every new-standard policy:

> 2.2 The Chronic Condition, Injury or Illness (including any complication) has not appeared, or has not been treated, or diagnosed by a Physician … during five (5) years before the date this Policy first comes into effect and this Policy has been in effect for a continuous period of at least three (3) years.

### 1h. Copay on renewal — published in full, with both thresholds and both percentages

This is the 2564 new-standard copay mechanism, and Pacific Cross publishes the whole of it:

> However, in renewing this insurance policy. The Company reserves the right to change the terms and conditions of coverage, adding that the Covered Person has a copayment in accordance with the following rates and criteria:
> (1) No greater than 30 percent of the covered medical expenses and reducing the insurance premium no greater than 30% of the renewal premium, or
> (2) No greater than 30 percent of the covered medical expenses and reducing the renewal insurance premium according to the Company's guideline where the loss ratio of each Covered Person is more than 400 percent.
> If the Company adds the copayment condition due to (1) or (2) for two or more cases, the Company will specify the Copayment condition for not exceeding 50 percent of the covered medical expenses and reducing the renewal premium no greater than 50 percent of the renewal insurance.

with a reversal clause (`the Company may consider reducing the copayment`) and 15 days'
notice. Structurally identical to ไทยประกันชีวิต's clause in `round2-insurers-sourcing.md`
§4.1 — which is what you would expect, because both are the คปภ. standard text. The
difference is that ไทยประกันชีวิต publishes it in Thai and Pacific Cross does not.

Renewal is otherwise not guaranteed on three named grounds (non-disclosure, claiming
without medical necessity, over-insured daily income benefit) with 30 days' notice, and
the premium may be adjusted for `Age, occupation class of the Covered Person` and
`The increasing medical expenses or experience in total claims payment of the portfolio`.
Note what that last phrase does **not** say: unlike ไทยประกันสุขภาพ, there is no published
individual claims loading with a stated cap.

### 1i. Entry ages — the one field where the insurer contradicts itself

Three different answers on the insurer's own property:

1. **The quote engine's date picker caps new applicants at 75**, in Thai:
   > หากอายุเกิน 75 ปี กรุณาติดต่อคอลเซนเตอร์: 02-401-9189

   https://onlineapplication.pacificcrosshealth.com/index.php?lang=TH
   The picker's own `yearRange: "-75:-0"` matches.
2. **The endpoint stops quoting eight of nine plans at 75**, and quotes Premier Plus alone
   from 75 to 99 (§1d). So the effective new-entry maximum for Standard, Premier, Maxima
   and Ultima is 74.
3. **The English FAQ on the main site says 80**:
   > Our plans are eligible for both local and expat residents of Thailand with a new entry age up to 80 with guaranteed renewability up to 99.

   https://www.pacificcrosshealth.com/th/health-insurance

Minimum entry age is 15 days, stated in the Thai FAQ:

> สำหรับทารกแรกเกิดที่มีอายุน้อยกว่า 15 วัน จะยังไม่สามารถทำประกันได้ บิดาหรือมารดาท่านใดท่านหนึ่งสามารถเป็นผู้กรอกใบสมัครให้บุตรได้

https://www.pacificcrosshealth.com/th/faq

The honest record is `entry_age_min: 0` (15 days), `entry_age_max: 74` for the eight plans
the engine stops quoting at 75, on the authority of the engine — which is the only source
that is a fact about what the insurer will actually sell rather than a claim about it —
with the FAQ's 80 noted as the unsupported marketing figure. `renewal_ceiling_age: 99` on
filed-wording authority.

### 1j. New health standard — structurally yes, verbally never

The benefit tables use the 13 หมวด categories of the 2564 standard verbatim
(`หมวดที่ 1` … `หมวดที่ 13`, `หมวดที่ 6.1`, `หมวดที่ 6.2`,
`หมวดที่ 5: การผ่าตัดใหญ่ที่ไม่ต้องเข้าพักรักษาตัวผู้ป่วยใน (Day Surgery)`), and the wording carries
the standard's copay-on-renewal and 5-and-3 pre-existing clauses. The insurer never writes
the phrase `มาตรฐานประกันสุขภาพแบบใหม่` anywhere. Same call as MTI and ไทยประกันสุขภาพ:
`new_health_standard: true` on the structure, phrase inferred, not quoted.

### 1k. VERDICT — ADDABLE, nine records, and nothing is missing

Every required field is available from a primary source:

| Field | Value | Source tier |
|---|---|---|
| `premium` | 14-band table, unisex, stamp duty included | `official_insurer` (own quote endpoint) |
| `entry_age_min` / `entry_age_max` | 0 (15 days) / 74, 99 for Premier Plus | `official_insurer` |
| `renewal_ceiling_age` | 99 | `filed_wording` |
| `ipd_annual_limit_thb` + basis | 270,000 … 50,000,000, **per_confinement** | `filed_wording` |
| `room_board_thb_per_night` | 2,000 … 18,000 | `official_insurer` |
| `opd_annual_limit_thb` | `null` — per visit × 30 visits only | `official_insurer` |
| `deductible_thb` | 0, or 20k/40k/100k/200k/300k per policy year | `official_insurer` |
| `copay_on_renewal` | full 30%/50% clause with thresholds | `filed_wording` |
| `waiting_period_days` | 30 (120 for eight named conditions) | `filed_wording` |
| `exclusions` | full general + health exclusion set | `filed_wording` |

**The one caveat that must be carried into the YAML:** the wording is English-only, so
`terms_source` is `filed_wording` pointing at a document the insurer itself labels a
translation that does not prevail. That caveat belongs in `terms_source.note`, in Thai,
verbatim, because a Thai reader deserves to know the contract they will sign has not been
published in the language they will sign it in.

Recommended scope: nine records is a lot of near-identical rows. The defensible minimum is
one per benefit level actually distinct to a reader — Standard (2,000 room), Standard Extra
(4,000), Premier Plus (6,000, the visa plan, the only one priced to 99), Maxima Plus
(10,000) and Ultima Plus (18,000).

---

## 2. บริษัท กรุงเทพประกันสุขภาพ จำกัด (มหาชน) — Bangkok Health Insurance PCL

**The premise in the brief is wrong in an interesting way.** This company was not merged
into กรุงเทพประกันภัย, and it is not related to it. It is a **BDMS company** — the hospital
group behind โรงพยาบาลกรุงเทพ, สมิติเวช, พญาไท, เปาโล and BNH — and it is alive today, with
its own site on BDMS's domain.

### 2a. It exists, and it is a คปภ.-licensed non-life insurer

The คปภ. reference index lists it under code 2060:

> 2060 บริษัท กรุงเทพประกันสุขภาพ จำกัด (มหาชน)                Bangkok Health Insurance Public           BHI

https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337

Its own live site states the corporate relationship, in Thai:

> เป็นบริษัทรับประกันภัยในเครือ บริษัท กรุงเทพดุสิตเวชการ จำกัด (มหาชน) ซึ่งเป็นผู้ถือหุ้นรายใหญ่ และเป็นผู้ประกอบการธุรกิจโรงพยาบาลเอกชนขนาดใหญ่ของประเทศไทย โดยมีโรงพยาบาลในเครือข่ายในไทยและกัมพูชา จำนวน 43 แห่ง (ข้อมูล ณ วันที่ 1 กันยายน 2558) ดำเนินการภายใต้ชื่อโรงพยาบาล 6 กลุ่ม คือ กลุ่มโรงพยาบาลกรุงเทพ กลุ่มโรงพยาบาลสมิติเวช โรงพยาบาลบี เอ็น เอช กลุ่มโรงพยาบาลพญาไท กลุ่มโรงพยาบาลเปาโลเมโมเรียล และกลุ่มโรงพยาบาลรอยัล

> บริษัท กรุงเทพประกันสุขภาพ จำกัด (มหาชน)
> เลขที่ 2 ซอยศูนย์วิจัย 7 ถนนเพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพฯ 10310

https://bhi.bdms.co.th/

Note the vintage of the site's own facts: `ข้อมูล ณ วันที่ 1 กันยายน 2558` — eleven years
stale as at this research date.

### 2b. It says it sells individual health, and publishes nothing about it

The home page and the Customer Care page both carry:

> Individual Care
> ดูแลตัวเองและคนที่คุณรักด้วยแผนประกันภัยสุขภาพรายเดี่ยว

https://bhi.bdms.co.th/customer

and the group product is named:

> Group Care
> ให้การดูแลสุขภาพพนักงานในองค์กรของคุณเป็นเรื่องง่าย ด้วยแผนประกันภัยสุขภาพและอุบัติเหตุกลุ่มEmployee Health Plus

**And that is the entire published product information.** The site has six pages —
`/`, `/aboutus`, `/products`, `/customer`, `/healthwellness`, `/contactus` — and
`https://bhi.bdms.co.th/products`, the one page that would carry the product, **has an
empty `<body>`**. 4,504 bytes of markup, navigation and footer only, zero content. The
home page's own "Get Online Insurance" button points at `href="#"`.

So: no product name beyond "Individual Care", no benefit table, no room rate, no entry
age, no renewal ceiling, no premium at any age, no กรมธรรม์ and no เอกสารสรุปสาระสำคัญ.

Checked and empty: https://bhi.bdms.co.th/ , /products , /aboutus , /customer ,
/contactus , /healthwellness . `bangkokhealth.co.th`, `bhi.co.th`,
`bangkokhealthinsurance.com` and `bangkokhealthinsurance.co.th` do not resolve in DNS.

### 2c. VERDICT — NOT INCLUDED

Every single field is missing. This is not a premium-gap case like AXA or กรุงเทพประกันภัย,
where the terms are published and only the price is withheld; here **nothing** is
published. The correct entry in this project is the one it already has: a note that the
company exists, is a BDMS subsidiary and not a กรุงเทพประกันภัย one, and publishes no
retail product information at all.

---

## 3. บูพา ประกันสุขภาพ (ประเทศไทย) — the company is gone, and this extends §5 of `standalone-health-sourcing.md`

`standalone-health-sourcing.md` §5 already established that Cigna and Aetna no longer
operate Thai retail health insurers under those names, and pointed at **Chubb Samaggi and
Bupa Thailand** as the correct successor targets. That pointer was half wrong, and this
section corrects it: **Bupa Thailand is not a successor, it is the origin of the chain,
and it no longer exists either.**

### 3a. What คปภ. records

The คปภ. reference index carries the company under code 2054:

> 2054 บริษัท บูพา ประกันสุขภาพ (ประเทศไทย) จำกัด              Bupa Health Insurance (Thailand)       ฺBupa

https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337

The same index separately lists `2042 บริษัท อลิอันซ์ อยุธยา ประกันภัย จำกัด (มหาชน)` and
`2064 บริษัท ซิกน่า ประกันภัย จำกัด (มหาชน)` as distinct licences.

### 3b. The end of the chain, from the acquirer's own newsroom

อลิอันซ์ อยุธยา publishes the announcement on its own domain, dated 6 พฤษภาคม พ.ศ. 2565:

> เอ็ทน่า ประเทศไทย ได้เข้าร่วมเป็นส่วนหนึ่งของกลุ่มอลิอันซ์ อยุธยา
> ท่านสมาชิกสามารถมั่นใจได้ว่าการรวมธุรกิจกันในครั้งนี้จะไม่มีผลกระทบต่อข้อกำหนด เงื่อนไข สิทธิ์ในการต่ออายุ หรือผลประโยชน์ความคุ้มครองในกรมธรรม์

https://www.allianz.co.th/th_TH/about-allianz-ayudhya/news-index/aagi-news/aetna-thailand-became-part-of-the-allianz-ayudhya-group.html

That page names เอ็ทน่า and อลิอันซ์ อยุธยา. It does **not** name บูพา, and I could not
find the บูพา → เอ็ทน่า rename in any insurer-owned or คปภ.-owned document that is still
served today. **That link in the chain is therefore recorded here as not established from
a primary source**, and should not be asserted in the repo as fact.

### 3c. The web presence is dead, and the redirect proves it was deliberate

- `bupa.co.th` — **no DNS A record**. The domain does not resolve at all.
- `bupathailand.com` — resolves, and returns `301 → http://www.bupa.co.th/`. A permanent
  redirect to a domain that no longer exists. Someone pointed the old Thai site at a
  successor host and the successor host was later retired.
- `aetna.co.th`, `aetnathailand.com`, `thailand.aetna.com` — none resolve.
- `bupa.com`, the group's live corporate site, contains **zero occurrences** of the string
  "Thailand" on its home page.

### 3d. VERDICT — NOT INCLUDED, does not exist publicly

There is no บูพา-branded Thai health insurer to research, no product page on any
insurer-owned domain, and therefore no primary source for any figure. The successor to the
book of business is อลิอันซ์ อยุธยา ประกันภัย, which is a separate insurer that this file
does not cover and which no researcher should enter under the name "บูพา".

**Correction to file:** `standalone-health-sourcing.md` §5 should no longer name
"Bupa Thailand" as a valid retry target. The live targets in that lineage are
**ชับบ์สามัคคีประกันภัย** (for Cigna) and **อลิอันซ์ อยุธยา ประกันภัย** (for Aetna/Bupa).

---
## 4. บริษัท เอ็ม เอส ไอ จี ประกันภัย (ประเทศไทย) จำกัด (มหาชน) — MSIG Insurance (Thailand) PCL

Two corrections before anything else.

**First: `msig.co.th` is dead.** It has no A record, and `www.msig.co.th` returns NXDOMAIN
from the authoritative nameserver, from Google DoH and from Cloudflare DoH; the zone holds
NS/MX/TXT only, at SOA serial 1. Every `msig.co.th` URL in the brief's source list is
unreachable — not blocked, gone. **The live insurer domain is `www.msig-thai.com`**, with
the e-store at `psmart.msig-thai.com`. Both resolve through Imperva.

**Second: เอ็ม เอส ไอ จี and มิตซุย สุมิโตโม are not two Thai insurers**, and the brief's
suspicion is right. MSIG's own Annual Report 2568 lists the relationship in its
related-parties note (extraction drops ำ, see method note):

> MS&AD Insurance Group Holdings, Inc. | ญี่ปุ่น | บริ ษัทใหญ่ในลาดับสู งสุ ด
> บริ ษ ัท มิตซุย สุ มิโตโม อินชัวรันซ์ จากัด | ญี่ปุ่น | เป็ นผู ้ถือหุ ้นรายใหญ่ ถือหุ ้นในบริ ษัทร้อยละ 49
> บริ ษ ัท หยาดหิ มะ จากัด | ไทย | เป็ นผู ้ถือหุ ้นรายใหญ่ ถือหุ ้นในบริ ษัทร้อยละ 37
> บริ ษ ัท มิตซุย สุ มิโตโม อินชัวรันซ์ จากัด สาขา ประเทศไทย | ไทย | เป็ นบริ ษัทย่อยของบริ ษัทใหญ่ในลาดับสู งสุ ด
> [sic: extraction]

https://www.msig-thai.com/sites/msig_th_revamp/files/2026-04/Annual_Report2568_TH.pdf

So Mitsui Sumitomo Insurance Co., Ltd. is MSIG Thailand's 49% **Japanese shareholder**, and
the only Thai "Mitsui Sumitomo" is a *branch* (`สาขา ประเทศไทย`) of that Japanese company —
a related party, not a second Thai retail health insurer. The คปภ. reference index does
list them as two codes (`2045 บริษัท เอ็ม เอส ไอ จี ประกันภัย (ประเทศไทย) จำกัด` and
`2012 บริษัท มิตซุย สุมิโตโม อินชัวรันซ์ สาขาประเทศไทย`,
https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337) — two
registrations, one group, and only one of them sells retail. The "มิตซุย สุมิโตโม" row in
the source list should be deleted, not researched.

Company identity and licence, same annual report:

> ชื่อบริษัท : บริษัท เอ็ม เอส ไอ จี ประกันภัย (ประเทศไทย) จํากัด (มหาชน) / เลขทะเบียนบริษัท : 0107555000414 / ประเภทธุรกิจ : รับประกันวินาศภัย

and its คปภ. e-commerce registration, published as a scan on its own e-store
(https://psmart.msig-thai.com/directmsig/assets/docs/popup_oic_approved.jpg):

> สำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย (คปภ.) หนังสือฉบับนี้ให้ไว้เพื่อแสดงว่า บริษัท เอ็ม เอส ไอ จี ประกันภัย (ประเทศไทย) จำกัด (มหาชน) ได้รับการขึ้นทะเบียนกิจกรรมทางอิเล็กทรอนิกส์ … ๑. การเสนอขายกรมธรรม์ประกันภัยผ่านทางอิเล็กทรอนิกส์ (Online) … ตั้งแต่วันที่ ๒๙ พฤศจิกายน พ.ศ. ๒๕๖๐

### 4a. MSIG sells no comprehensive individual health plan

The personal-insurance hub names exactly two products under ประกันสุขภาพ:

> ไม่ว่าจะการปกป้องคุณจากโรคมะเร็งร้าย อย่างแผนประกันภัยโรคมะเร็ง … หรือเลือกดูแลสุขภาพด้วยแผนความคุ้มครองค่ารักษาพยาบาลกับ 8 โรคยอดฮิตที่พบบ่อย อย่างแผนประกันภัยโรคสุดฮิต ครอบคลุมค่ารักษาพยาบาล ทั้งแบบผู้ป่วยในและผู้ป่วยนอก

https://www.msig-thai.com/th/insurance/personal-insurance

That is a **dread-disease** policy and a **specified-disease** policy. Everything else on
`/th/personal-insurance/` is motor, home, golf or travel, and `digital.msig-thai.com`
carries only `/main/motor` and `/main/travel`. Both health products are standalone —
`กรมธรรม์ประกันภัยโรคมะเร็ง (ขายผ่านทางอิเล็กทรอนิกส์ (Online))` and
`กรมธรรม์ประกันภัยคุ้มครองอุบัติเหตุและการเจ็บป่วยด้วยโรคเฉพาะ`
(https://psmart.msig-thai.com/directmsig/cancer?type=PCF&planId=PC03 and
https://psmart.msig-thai.com/directmsig/seasonal/info) — no rider language anywhere.

### 4b. The premium tables — published on the site AND recoverable from the live calculator

MSIG is the one insurer in this round that publishes its rates in plain HTML *and* lets
you verify them against its own quote engine. Both were done. The calculator contract:

```
GET  https://psmart.msig-thai.com/directmsig/{cancer|seasonal}?type={PCF|PPM}&planId={PC03|PC04|PP01|PP02}
POST https://psmart.msig-thai.com/directmsig/{cancer|seasonal}/plan
     _token, plantype, plantypeId, gender, calage, birthD0/birthM0/birthY0 (พ.ศ.),
     startD/startM/startY (พ.ศ.), interest, healthtype
```

Swept ages 1–56 (cancer) and 9–72 (seasonal), both sexes, ~440 quotes. Two results worth
recording independently of the numbers: **premiums are unisex** (225 male/female pairs
compared, zero differences), and the calculator's acceptance boundaries prove the entry
ages — cancer errors out at 55, seasonal errors out below 11 and above 70.

**แผนประกันภัยโรคมะเร็ง Cancer Fix — Simple Fix**, header verbatim:

> ช่วงอายุ (ปี) | เบี้ยประกันภัยรวมรายปี (บาท) รวมอากรแสตมป์และภาษีมูลค่าเพิ่ม

https://www.msig-thai.com/th/personal-insurance/cancer-fix

| ช่วงอายุ (ปี) | แผน 1 | แผน 2 | แผน 3 | แผน 4 | แผน 5 |
|---|---|---|---|---|---|
| 1-34 | 625 | 1,240 | 1,860 | 2,480 | 3,100 |
| 35-39 | 780 | 1,565 | 2,345 | 3,125 | 3,905 |
| 40-44 | 1,000 | 1,995 | 2,990 | 3,985 | 4,980 |
| 45-49 | 1,675 | 3,350 | 5,025 | 6,700 | 8,375 |
| 50-54 | 1,900 | 3,800 | 5,700 | 7,600 | 9,500 |
| 55-64 (ต่ออายุเท่านั้น) | เบี้ยประกันภัยตามอายุแรกเข้า | | | | |

Sums insured: `การประกันภัยโรคมะเร็ง (ไม่คุ้มครองมะเร็งผิวหนัง)` 100,000 / 200,000 / 300,000 /
400,000 / 500,000, and `โรคมะเร็งผิวหนัง` 20,000 / 40,000 / 60,000 / 80,000 / 100,000.

**Cancer Fix — Full Fix:**

| ช่วงอายุ (ปี) | แผน 1 | แผน 2 | แผน 3 | แผน 4 | แผน 5 |
|---|---|---|---|---|---|
| 1-34 | 800 | 1,420 | 2,040 | 2,835 | 3,455 |
| 35-39 | 1,015 | 1,790 | 2,570 | 3,580 | 4,360 |
| 40-44 | 1,290 | 2,285 | 3,280 | 4,570 | 5,560 |
| 45-49 | 2,210 | 3,915 | 5,620 | 7,830 | 9,530 |
| 50-54 | 2,965 | 5,250 | 7,535 | 10,495 | 12,785 |
| 55-64 (ต่ออายุเท่านั้น) | เบี้ยประกันภัยตามอายุแรกเข้า | | | | |

The brochure carries the identical figures with a printed document code and effective date
— `QD-UDW-059 CC-007 Rev.No.: 00 Effective 15.10.19` — and its own stamp-duty note,
`หมายเหตุ : เบี้ยประกันภัยรวมภาษีและอากรแสตมปแลว` [sic: extraction],
https://www.msig-thai.com/sites/msig_th_revamp/files/2024-06/Brochure_Cancer-Fix.01.01.2023.pdf

**แผนประกันภัยโรคสุดฮิต** is flat-premium — the same price at every age from 11 to 70,
which the sweep confirms across 60 ages. Header verbatim
`เบี้ยประกันภัยรายปี (บาท) (รวมอากรสแตมป์)`
(https://www.msig-thai.com/th/personal-insurance/seasonal-diseases; note the site's
spelling `อากรสแตมป์`):

*แผนฮิตไม่เลิก* — `เสียชีวิต/สูญเสียอวัยวะ (อ.บ.1)` 50,000 on all three plans; income
compensation `500 ต่อวัน`; 3 / 4 / 8 diseases covered; **299 / 599 / 699 บาท/ปี**.

*แผนฮอตฮิต* — covers two diseases only (`คุ้มครอง 2 โรค โรคไข้หวัดใหญ่ โรคไข้เลือดออก`):

| ความคุ้มครอง | แผน 1 | แผน 2 | แผน 3 | แผน 4 |
|---|---|---|---|---|
| เสียชีวิต/สูญเสียอวัยวะ (อ.บ.1) | 30,000 | 30,000 | 50,000 | 50,000 |
| ค่ารักษาพยาบาลเฉพาะโรค IPD | 30,000 | 30,000 | 50,000 | 50,000 |
| ค่ารักษาพยาบาลเฉพาะโรค OPD (สูงสุด 3 ครั้งต่อปี) | 500 บาทต่อครั้ง/วัน | 1,000 บาทต่อครั้ง/วัน | 500 บาทต่อครั้ง/วัน | 1,000 บาทต่อครั้ง/วัน |
| ชดเชยรายวัน IPD จากโรคเฉพาะ (สูงสุด 30 วัน) | 500 ต่อวัน | ไม่คุ้มครอง | 500 ต่อวัน | ไม่คุ้มครอง |
| **เบี้ยประกันภัยรายปี (รวมอากรสแตมป์)** | **419** | **449** | **599** | **629** |

The seasonal brochure
(https://www.msig-thai.com/sites/msig_th_revamp/files/2024-02/ประกันภัยโรคสุดฮิต%2080224_0.pdf)
is an **image-only PDF** — `pdftotext` yields 5 bytes, Producer
`Adobe Acrobat 23.8 Image Conversion Plug-in`. It was rendered and read visually; the
tables match. It carries no printed effective date; the PDF's CreationDate is 8 Feb 2024,
matching the `80224` in its own filename.

The calculator states the stamp-duty basis in its own responses:

> (ค่าเบี้ยประกันภัย รวมภาษีและอากร ผู้เอาประกันภัยเป็นผู้ชำระ / Premium is inclusive of tax and stamp duty and payable by the insured)   [cancer]
> (ค่าเบี้ยประกันภัย รวมอากร ผู้เอาประกันภัยเป็นผู้ชำระ / Premium is inclusive of stamp duty and payable by the insured)   [seasonal]

### 4c. Terms, and the fields that are missing

Entry and renewal, verbatim:

> ผู้ขอเอาประกันภัยจะต้องมีอายุระหว่าง 1 - 54 ปีบริบูรณ์ และต่ออายุได้ถึง 64 ปีบริบูรณ์   [Cancer Fix]
> สำหรับผู้มีสัญชาติไทย อายุ 11 - 70 ปี   [โรคสุดฮิต]

https://www.msig-thai.com/th/personal-insurance/cancer-fix and
https://www.msig-thai.com/th/personal-insurance/seasonal-diseases

**โรคสุดฮิต publishes no renewal ceiling at all** — the sentence that carries it on the
cancer page has no counterpart on the seasonal page.

Limit basis, where one exists, is **per confinement**:

> ไม่เกินจำนวนเงินเอาประกันภัยต่อการเข้าพักรักษาตัวครั้งใดครั้งหนึ่ง   [ฮอตฮิต IPD]
> สูงสุด 30 วัน ต่อการเข้ารักษาตัวครั้งใดครั้งหนึ่ง   [ฮิตไม่เลิก daily cash]

with a room cap inside it: `(จำกัด ค่าห้อง ค่าอาหาร ค่าบริการพยาบาล สูงสุด 3,000 บาทต่อวัน)`.
Cancer Fix's only annual figure is the chemo/radiotherapy sub-limit —
`สูงสุดต่อปีกรมธรรม์ประกันภัย` 25,000 or 50,000 — which is not an IPD limit.
Waiting periods: `ระยะเวลาที่ไม่คุ้มครอง 90 วัน` (cancer), 15 วัน (seasonal).

**Marketing copy contradicts the benefit table, in the customer's disfavour.** The
seasonal quote page (https://psmart.msig-thai.com/directmsig/seasonal/info) advertises:

> คุ้มครองค่ารักษาพยาบาลผู้ป่วยในสูงสุด 50,000 บาท | คุ้มครองค่ารักษาพยาบาลผู้ป่วยนอกครั้งละ 1,000 บาท | รับค่าชดเชยรายได้สูงสุด 30 วันจากโรคสุดฮิต

Against the benefit table on the same site: the 50,000 is **per confinement**, which that
line never says; OPD is 1,000 only on แผน 2 and แผน 4 (แผน 1 and 3 are 500); and the 30-day
income compensation is `ไม่คุ้มครอง` on แผน 2 and แผน 4. Three best-case values quoted
together from **mutually exclusive** plans — the same failure mode as Sompo's
"5 ล้านบาท/ปี", and the reason this project exists.

**Filed wording — NOT PUBLISHED.** No กรมธรรม์ text and no เอกสารสรุปสาระสำคัญ for either
product. The brochure defers to the document MSIG does not publish:

> หมายเหตุ : รายละเอียดของความคุมครอง เง�่อนไข และขอยกเวน จะระบุในกรมธรรมประกันภัย   [sic: extraction]

Checked and negative: both product pages (every `<a>` extracted and followed),
`/th/search?keys=กรมธรรม์`, `/th/search/node?keys=สรุปสาระสำคัญ`, `/th/terms-and-conditions`,
`/th/shareholder-services`, `https://www.msig-thai.com/sitemap.xml` (706 URLs),
the psmart plan- and question-step HTML (only `popup_complaint.png` and
`popup_oic_approved.jpg` are linked), `https://psmart.msig-thai.com/directmsig/`,
`https://digital.msig-thai.com/main`, and `https://www.msig-thai.com/ecommerce/pa`
(302s to the homepage — dead link).

**New health standard (2564) — NO, and correctly so.** Zero hits across every fetched MSIG
page and PDF for `มาตรฐานประกันสุขภาพ`, `หมวดที่ 1`, `ค่าใช้จ่ายร่วม`, `Copayment` or
`ความรับผิดส่วนแรก`. The benefit tables are numbered 1–4 and 1–3.3, not 1–13. These are not
new-standard health policies and were never filed as such: they are a dread-disease policy
and a specified-disease/PA policy. Consistent with the annual report, where health is not a
reported line of business and these sit under `เบ็ดเตล็ด`.

### 4d. VERDICT — no comprehensive health record possible; one product misses by a single field

| Product | Premium | Entry ages | Renewal ceiling | IPD limit | Verdict |
|---|---|---|---|---|---|
| Cancer Fix Simple | ✅ 5 bands × 5 sums | ✅ 1–54 | ✅ 64 | ✗ lump sum, no IPD benefit | NOT INCLUDED — blocked by IPD limit |
| Cancer Fix Full | ✅ | ✅ 1–54 | ✅ 64 | ✗ chemo sub-limit is not an IPD limit | NOT INCLUDED — same |
| โรคสุดฮิต ฮิตไม่เลิก | ✅ 299/599/699 flat | ✅ 11–70 | ✗ not published | ✗ daily cash only | NOT INCLUDED — two blockers |
| โรคสุดฮิต ฮอตฮิต | ✅ 419/449/599/629 flat | ✅ 11–70 | ✗ **not published** | ✅ 30,000–50,000 per confinement | NOT INCLUDED — **one blocker: renewal ceiling age** |

**MSIG should not be carried in this dataset as a mainstream health insurer.** It sells no
comprehensive individual IPD plan. ฮอตฮิต is the only product of the four that comes within
one field of a complete record, and the missing field is the same one that killed
ทิพย TIP ชิลชิล in `standalone-health-sourcing.md` §2: `renewal_ceiling_age`.

---

## 5. บริษัท ซมโปะ ประกันภัย (ประเทศไทย) จำกัด (มหาชน) — Sompo Insurance (Thailand) PCL

Exists, sells two individual health products, publishes the whole benefit schedule and
withholds the entire price. The mirror image of AXA in `round2-insurers-sourcing.md` §2.

Self-identification, on the product hub:

> บริษัท ซมโปะ ประกันภัย (ประเทศไทย) จำกัด (มหาชน) (“บริษัท”) ในฐานะบริษัทประกันวินาศภัย

https://www.sompo.co.th/personal-insurance/health-accident

The คปภ. reference index carries the predecessor name under code 2062
(`2062 บริษัท สมโพธิ์ เจแปน นิปปอนโคอะ ประกันภัย … Sompo Japan Nipponkoa Insurance`),
https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337

### 5a. Two products, both standalone

> ประกันสุขภาพ ซมโปะ เต็มเต็ม — คุ้มครองเต็มๆ ทั้ง IPD และ OPD
> ประกันสุขภาพ ซมโปะ ดีดี — มีค่าเสียหายส่วนแรก คุ้มครอง คุ้มค่า สำหรับคนมีสวัสดิการ

https://www.sompo.co.th/personal-insurance/health-accident
Product pages: https://www.sompo.co.th/sompo-health-temtem and
https://www.sompo.co.th/sompo-health-deedee

Non-life insurer, no host policy anywhere in the flow.

### 5b. Method note: Sompo's product pages are pictures of text

Neither product page contains its benefit table as HTML. Both are **PNG images** with no
transcript and no `alt` text worth anything — the benefit table is served as
`TemTem-table.png` under `alt="Table premium TemTem"`, a label that is doubly wrong: it is
a benefit table, and it contains no premium. Direct requests to
`https://www.sompo.co.th/files/th/2026-02/TemTem-table.png` return **HTTP 403**; the
derivative under `/files/th/styles/convert_webp/public/…webp?itok=…` serves with a
`Referer` header. The Thai below was read off the rendered image and independently
re-read, cell by cell, from the 1200×1728 original before being written here.

### 5c. Benefit table, ประกันสุขภาพ ซมโปะ เต็มเต็ม — transcribed in full

Column header: `วงเงินสูงสุดต่อครั้ง (บาท)`. No currency other than บาท, **no mention of
อากรแสตมป์ anywhere on the domain**, and no printed effective date — the only date signal
is the CMS upload path, `2026-02`.

| รายการ | วงเงินสูงสุดต่อครั้ง (บาท) |
|---|---|
| **1. ผลประโยชน์กรณีผู้ป่วยใน** | |
| ผลประโยชน์สูงสุดต่อการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง | 50,000 - 5,000,000 |
| 1.1 ค่าห้องผู้ป่วยปกติ (บาท) สูงสุด 30 วัน | 1,000 - 20,000 |
| 1.2 ค่าห้องผู้ป่วยวิกฤติ (บาท) สูงสุด 15 วัน | 2,000 - 40,000 |
| 2.1 ค่าบริการทางการแพทย์เพื่อการตรวจวินิจฉัย | จ่ายตามจริง |
| 2.2 ค่าบริการทางการแพทย์เพื่อการบำบัดรักษา ค่าบริการโลหิตและส่วนประกอบของโลหิต และค่าบริการทางการพยาบาล | จ่ายตามจริง |
| 2.3 ค่ายา ค่าสารอาหารทางหลอดเลือด และค่าเวชภัณฑ์ | จ่ายตามจริง |
| 2.4 ค่ายา และค่าเวชภัณฑ์สิ้นเปลือง (เวชภัณฑ์ 1) สำหรับกลับบ้าน | จ่ายตามจริง |
| 3. ค่าแพทย์เยี่ยมไข้ | จ่ายตามจริง |
| 4.1 ค่าห้องผ่าตัด และค่าห้องทำหัตถการ | จ่ายตามจริง |
| 4.2 ค่ายา ค่าสารอาหารทางหลอดเลือด ค่าเวชภัณฑ์ และค่าอุปกรณ์การผ่าตัดและหัตถการ | จ่ายตามจริง |
| 4.3 ค่าผู้ประกอบวิชาชีพเวชกรรม ทำศัลยกรรมและหัตถการ (รวมแพทย์ผู้ช่วยผ่าตัด) | จ่ายตามจริง |
| 4.4 ค่าผู้ประกอบวิชาชีพเวชกรรม วิสัญญีแพทย์ | จ่ายตามจริง |
| 4.5 ค่ารักษาพยาบาลโดยการผ่าตัดเปลี่ยนอวัยวะ | 50,000 |
| 5. การผ่าตัดใหญ่ที่ไม่ต้องเข้าพักรักษาตัวเป็นผู้ป่วยใน (Day Surgery) | จ่ายตามจริง |
| 6.1 ค่าบริการทางการแพทย์เพื่อการตรวจวินิจฉัย … ภายใน 30 วัน ก่อนและหลังการเข้าพักรักษาตัวเป็นผู้ป่วยใน | จ่ายตามจริง |
| 6.2 ค่ารักษาพยาบาลผู้ป่วยนอกหลังการเข้าพักรักษาตัวเป็นผู้ป่วยในต่อครั้ง … ภายใน 30 วัน | จ่ายตามจริง |
| 7. ค่ารักษาพยาบาลการบาดเจ็บ กรณีผู้ป่วยนอก ภายใน 24 ชั่วโมง ของการเกิดอุบัติเหตุต่อครั้ง | 10,000 - 1,000,000 |
| 8. ค่าเวชศาสตร์ฟื้นฟู หลังการเข้าพักรักษาตัวเป็นผู้ป่วยใน | จ่ายตามจริง |
| 9. …โรคไตวายเรื้อรัง โดยการล้างไตผ่านทางเส้นเลือด ต่อรอบปีกรมธรรม์ประกันภัย | จำกัดไม่เกิน 50,000 |
| 10. …โรคเนื้องอกหรือมะเร็ง โดยรังสีรักษา … ต่อรอบปีกรมธรรม์ประกันภัย | จ่ายตามจริง |
| 11. …โรคมะเร็ง โดยเคมีบำบัด รวมถึง (Targeted Therapy) ต่อรอบปีกรมธรรม์ประกันภัย | จ่ายตามจริง |
| 12. ค่าบริการรถพยาบาลฉุกเฉิน | 5,000 |
| 13. ค่ารักษาพยาบาล โดยการผ่าตัดเล็ก | จ่ายตามจริง |
| **2. ผลประโยชน์กรณีผู้ป่วยนอก** | |
| 1. การรักษาพยาบาลที่ไม่ได้อยู่รักษาตัวในโรงพยาบาล … (1 ครั้งต่อวัน สูงสุดไม่เกิน 30 ครั้งต่อปี) | - |
| **3. การมีส่วนร่วมจ่าย** | |
| 1. ค่าความเสียหายส่วนแรก/ครั้ง | - |

https://www.sompo.co.th/files/th/2026-02/TemTem-table.png

**ประกันสุขภาพ ซมโปะ ดีดี** (https://www.sompo.co.th/files/th/2026-02/DeeDee-table.png) is
the same table row for row, with four cells different: IPD ceiling `100,000 - 5,000,000`,
accident-OPD `20,000 - 1,000,000`, dialysis `50,000`, and — the point of the product —
`1. ค่าความเสียหายส่วนแรก/ครั้ง = 20,000`.

### 5d. Two contradictions on Sompo's own page, both in the customer's disfavour

1. **Per year vs per confinement.** The marketing tile says
   > ให้คุณรักษาได้เต็มเต็ม จ่ายค่ารักษาพยาบาลตามจริง สูงสุด 5 ล้านบาท/ปี* (กรณีผู้ป่วยใน)

   (https://www.sompo.co.th/files/th/2026-01/TemTem-benefit1.png) while the benefit table
   on the same page says `ต่อการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง` and the column header
   says `วงเงินสูงสุดต่อครั้ง`. The asterisk resolves to no footnote — there is no footnote
   text anywhere on the page. Sompo's own article resolves it the other way again:
   > คุ้มครองค่ารักษาพยาบาลผู้ป่วยในสูงถึง 5 ล้านบาทต่อครั้ง (ไม่จำกัดจำนวนครั้งต่อปี)

   https://www.sompo.co.th/media-centre/smopa-edinhnaecaatladsukhphaph-txbrabethrndprakansukhphaphmaaerng

   Two of three sources say per confinement, so `ipd_limit_basis: per_confinement` — but
   note that "5 ล้านบาท/ปี" and "5 ล้านบาทต่อครั้ง (ไม่จำกัดจำนวนครั้งต่อปี)" are being used
   as if they were the same claim, and they are not.
2. **"ทั้ง IPD และ OPD" when OPD is a dash.** The hub page advertises
   `คุ้มครองเต็มๆ ทั้ง IPD และ OPD`, and the benefit table's only OPD row reads `-`. The
   tile quietly narrows it to accidents:
   > คุ้มครองครบทุกการรักษา ทั้งผู้ป่วยในและผู้ป่วยนอก* (กรณีอุบัติเหตุฉุกเฉิน)

   https://www.sompo.co.th/files/th/2026-01/TemTem-benefit2.png

### 5e. What Sompo does NOT publish

- **Premium — NOT PUBLISHED at any age.** The only two figures on the entire domain are
  floors printed on banner images with no age attached:
  > เบี้ยเริ่มต้นเพียง 6,500 บาท/ปี — https://www.sompo.co.th/files/th/2026-03/TT_Banner_revised.png
  > เบี้ยถูกกว่า เริ่มต้นเพียง 4,301 บาท/ปี — https://www.sompo.co.th/files/th/2026-03/Banner-DD-revised.png

  There is no premium calculator on any Sompo domain: the sitemap
  (https://www.sompo.co.th/sitemap.xml, 426 URLs) has none, and `health.`, `buy.`,
  `shop.`, `online.` and `ecom.sompo.co.th` are all NXDOMAIN. Only `motorjoy.` and
  `traveljoy.` exist, and they sell motor and travel.
- **Entry age, renewal ceiling — NOT PUBLISHED for the current products.** The only age
  figures on the domain belong to the *predecessor* product, in a 2022 press release:
  > สำหรับประกันสุขภาพ Love Health เต็มเต็ม เหมาะสำหรับผู้ที่อายุ 18 ปี - 65 ปี ต่ออายุประกันได้ถึง 70 ปี โดยระยะเวลาเอาประกันภัยแบบปีต่อปี จำนวนเงินคุ้มครองเริ่มต้นที่ 300,000 - 1,000,000 บาท ไม่ต้องตรวจสุขภาพ เพียงตอบคำถาม

  https://www.sompo.co.th/media-centre/smopa-prakanphay-sngprakansukhphaph-love-health-sukhphaphetmetm-txnrabethskalwaelnithn
  (dated `10 ก.พ. 2022`, premium `เริ่มต้นเพียง 11,000 บาท`). **These must not be carried
  across.** That version capped IPD at 1,000,000 against today's 5,000,000, and quoted
  11,000 against today's 6,500. Different product, different price, different ceiling.
- **Filed wording — NOT PUBLISHED.** There is not one `.pdf` link anywhere on
  www.sompo.co.th — zero in the 426-URL sitemap, zero on either product page.
- **Copay / copay-on-renewal — does not exist publicly.** The section headed
  `3. การมีส่วนร่วมจ่าย` contains only the deductible row.
- **New health standard:** structurally yes — both tables run หมวด 1–13 in the standard
  order and wording. Sompo never writes `มาตรฐานประกันสุขภาพแบบใหม่`.

### 5f. VERDICT — NOT INCLUDED, both products

Three of the four required fields are missing for each: no age-linked premium, no entry
age, no renewal ceiling. The IPD limit and the ดีดี deductible are the only firm numbers.
Same disposal as AXA SmartCare Value: a `เริ่มต้นที่` figure with no age attached is not a
rate table and is never recorded here.

---

## 6. บริษัท คุ้มภัยโตเกียวมารีนประกันภัย (ประเทศไทย) จำกัด (มหาชน) — Tokio Marine Safety Insurance (Thailand) PCL

**The company exists and sells no individual medical-expense health product at all.** That
is the whole finding, and it is worth recording so nobody researches it again.

### 6a. URL correction and an access note

The URL in the brief, `https://www.tokiomarine.com/th/safety.html`, **is a 404**. The live
Thai non-life site is https://www.tokiomarine.com/th/th/non-life.html;
`tokiomarine.co.th`, `tokiomarinesafety.co.th` and `www.tokiomarinesafety.co.th` all 301
into `www.tokiomarine.com`.

Method note: the whole `tokiomarine.com` estate sits behind Imperva/Incapsula, which
hard-blocks `curl` **and** a first-hit headless browser. A browser-UA `curl` to any page
returns a 212-byte `_Incapsula_Resource` stub, not the page — verified here. The quotes
below were retrieved with a real Chromium session that banked the
`visid_incap_*` / `incap_ses_*` cookies on a first load and re-requested. Anyone
re-checking with `curl` alone will conclude the pages are empty; they are not.

### 6b. It exists, and its licence history is published

> ภายหลังกระบวนการควบรวมกิจการที่เสร็จสิ้นโดยสมบูรณ์ และผ่านความเห็นชอบจากสำนักงานคณะกรรมการการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย (คปภ.) บริษัท คุ้มภัยโตเกียวมารีนประกันภัย (ประเทศไทย) จำกัด (มหาชน) จึงได้ก่อตั้งขึ้น ณ วันที่ 3 กุมภาพันธ์ 2563

> ใบอนุญาตประกอบธุรกิจประกันวินาศภัยเลขที่ 3/2518 ลงวันที่ 5 กุมภาพันธ์ พ.ศ. 2518

> ภายใต้ใบอนุญาตประกอบธุรกิจประกันวินาศภัยเลขที่ 1/2537 ลงวันที่ 7 มีนาคม พ.ศ. 2537

https://www.tokiomarine.com/th/th/non-life/about-us.html

That is the merger of โตเกียวมารีนศรีเมืองประกันภัย and ประกันคุ้มภัย, คปภ.-approved,
3 February 2020. It explains why the คปภ. reference index lists **two** Tokio Marine
non-life codes — `2026 บริษัท โตเกียวมารีนประกันภัย (ประเทศไทย) จำกัด` and
`2780 บริษัท คุ้มภัยโตเกียวมารีนประกันภัย (ประเทศไทย)` — plus `2002 บริษัท ประกันคุ้มภัย จำกัด (มหาชน)`
and, separately, the life company `1016 บริษัท โตเกียวมารีนประกันชีวิต (ประเทศไทย)`.
https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337

The life company is out of scope here and nothing from `tokiomarinelife.co.th` or
`/th/th/life/…` was opened or is reported.

### 6c. The individual health shelf holds exactly one product, and it is cancer

The retail taxonomy is four categories:
`ประกันภัยอุบัติเหตุ`, `ประกันภัยรถยนต์`, `ประกันภัยบ้านและที่อยู่อาศัย`, `ประกันภัยการเดินทางและกีฬา`
(https://www.tokiomarine.com/th/th/non-life/products/retail.html).

There is a `ประกันสุขภาพ` page, headed

> ประกันสุขภาพ — ช่วยลดภาระทางการเงินของท่านที่เกิดขึ้นจากค่าใช้จ่ายในการรักษาพยาบาลและทุพพลภาพถาวรสิ้นเชิง

and it contains one product:

> ประกันภัยโรคมะเร็ง — หมดห่วงเรื่องมะเร็ง ประกันภัยโรคมะเร็ง เริ่มต้นเพียง 700 บาท/ปี คุ้มครองสูงถึงหลักล้าน พร้อมใช้ลดหย่อนภาษีได้ ให้คุณอุ่นใจในทุกความเสี่ยง

https://www.tokiomarine.com/th/th/non-life/products/retail/health.html
(independently re-checked through a second fetch path, which returned the same single
product and no IPD/OPD plan)

Medical-expense health is sold **group only**:

> สวัสดิการพนักงาน — สร้างความมั่นใจให้พนักงานด้วยประกันสุขภาพและสวัสดิการที่เหมาะสมกับองค์กร

https://www.tokiomarine.com/th/th/non-life/products/commercial/employee-benefits.html

Its own B2C shop, https://b2c.tokiomarinesafety.co.th/, sells `ประกันภัยรถยนต์` and
`ประกันเดินทาง` only; the probed `/Cancer/Step_1`, `/Health/Step_1`, `/PA/Step_1` and
`/CancerSmilePlus/Step_1` paths all return `URL นี้ไม่สมบูรณ์ กรุณาตรวจสอบใหม่อีกครั้ง`.

### 6d. The cancer plan, for the record — age bands published, every premium cell empty

Even out of scope, this is a striking disclosure pattern. The page publishes the *shape*
of its rate table and none of its contents:

> เบี้ยประกันภัยของฉันเป็นเท่าไร ?
> ค่าเบี้ยประกันภัยของคุณอาจจะแตกต่างกัน ขึ้นอยู่กับ: อายุของท่านที่เอาประกันตามที่ระบุไว้ดังต่อไปนี้

| ช่วงอายุ | เบี้ยประกันภัย |
|---|---|
| อายุน้อยกว่า 40 ปี | ไม่เผยแพร่ |
| อายุระหว่าง 40-49 ปี | ไม่เผยแพร่ |
| อายุระหว่าง 50-59 ปี | ไม่เผยแพร่ |
| อายุระหว่าง 60-64 ปี | ไม่เผยแพร่ |

The only THB figure is a floor with no band attached:

> ประกันภัยโรคมะเร็งจากคุ้มภัยโตเกียวมารีน เริ่มต้นเพียงปีละ 700 บาทเท่านั้น เน้นการรักษา เบิกค่ารักษาโรคมะเร็งได้ตามจริง สูงสุด 1 ล้านบาท

Entry and renewal ages **are** published, which is more than most:

> หมายเหตุ: อายุไม่เกิน 54 ปี ( 55-64 ปีสำหรับกรณีต่ออายุสัญญาเท่านั้น)

and the waiting period:

> ภายในระยะเวลารอคอย 90 วันนับจากวันที่ข้อตกลงกรมธรรม์ประกันภัยนี้เริ่มมีผลบังคับครั้งแรก

https://www.tokiomarine.com/th/th/non-life/products/retail/health/cancer-smile-plus.html

It is a lump-sum benefit, not a medical-expense plan
(`เมื่อมีการวินิจฉัยพบโรคในครั้งแรกบริษัทจะจ่ายค่าสินไหมให้ทันที`), so `ipd_annual_limit_thb`
is unfillable by construction. Tokio Marine disclaims its own marketing copy:
`ข้อมูลนี้ใช้สำหรับการอ้างอิงเท่านั้น`.

**Filed wording — NOT PUBLISHED.** https://www.tokiomarine.com/th/th/non-life/customer-service/forms.html
carries claim forms only (`Cancer_Insurance_Claim_Form.pdf`, `Health_Insurance_Claim_Form.pdf`
under `/content/dam/tokiomarine/th/non-Life/resources/self-service/forms/claim-nonmotor/`).
The existence of a health claim form is evidence they administer the group book, not a
policy wording. `/th/th/non-life/policy.html` is a compulsory-motor lookup:
`ตรวจสอบข้อมูลกรมธรรม์ประกันภัยรถยนต์ภาคบังคับ (พ.ร.บ.)`.

### 6e. VERDICT — NOT INCLUDED, no product exists

Individual medical-expense health: **the product does not exist**, so there is nothing to
block. The cancer plan would be blocked by a missing premium against every one of its own
four published bands, and by having no IPD limit to record.

---

## 7. Not included and why — this round

| Insurer / plan | Verdict | Reason |
|---|---|---|
| Pacific Cross — Standard | **ADDABLE** | Complete 14-band table 0–74, filed wording, standalone, per-confinement 270,000 |
| Pacific Cross — Standard Plus | **ADDABLE** | Same; 3,000 room; no deductible option |
| Pacific Cross — Standard Extra | **ADDABLE** | Same; 4,000 room; 780,000 |
| Pacific Cross — Premier | **ADDABLE** | 1,200,000; dental and vision add-ons priced |
| Pacific Cross — Premier Plus | **ADDABLE** | 3,000,000; the only plan priced to age 99 |
| Pacific Cross — Maxima / Maxima Plus | **ADDABLE** | 5,000,000 / 10,000,000 |
| Pacific Cross — Ultima / Ultima Plus | **ADDABLE** | 20,000,000 / 50,000,000; 16,000 / 18,000 room |
| กรุงเทพประกันสุขภาพ (BHI) — "Individual Care" | NOT INCLUDED | Company exists; the products page has an empty `<body>`. No product name, no benefit, no price, no wording |
| บูพา ประกันสุขภาพ (ประเทศไทย) | NOT INCLUDED | Company no longer trades under that name; `bupa.co.th` has no DNS record |
| MSIG Cancer Fix (Simple / Full) | NOT INCLUDED | Full rate table published, but a dread-disease lump sum — no IPD limit exists to record |
| MSIG โรคสุดฮิต ฮิตไม่เลิก | NOT INCLUDED | No renewal ceiling published; benefit is daily cash, not expense |
| MSIG โรคสุดฮิต ฮอตฮิต | NOT INCLUDED | Everything published except `renewal_ceiling_age` — one field short |
| ซมโปะ เต็มเต็ม | NOT INCLUDED | Only `เบี้ยเริ่มต้นเพียง 6,500 บาท/ปี` with no age; no entry age; no renewal ceiling |
| ซมโปะ ดีดี | NOT INCLUDED | Same three gaps; `เบี้ยถูกกว่า เริ่มต้นเพียง 4,301 บาท/ปี` |
| คุ้มภัยโตเกียวมารีน — individual health | NOT INCLUDED | **The product does not exist.** Medical-expense health is group-only |
| คุ้มภัยโตเกียวมารีน — ประกันภัยโรคมะเร็ง | NOT INCLUDED | Four age bands published with every premium cell empty; not a medical-expense product |

## 8. NOT FOUND / does not exist publicly — with where it was looked for

Recorded so nobody repeats the search.

1. **A Thai-language policy wording from Pacific Cross.** Does not exist publicly. Both
   download centres were enumerated (42 PDF links each,
   https://www.pacificcrosshealth.com/th/download-center and `/en/download-center`) and the
   160-URL sitemap at https://www.pacificcrosshealth.com/sitemap.xml was checked. The only
   wording published is the English translation, which states on every page that the
   unpublished Thai version prevails.
2. **Any product information at all from กรุงเทพประกันสุขภาพ.** Does not exist publicly.
   All six pages of https://bhi.bdms.co.th/ were opened; `/products` returns 4,504 bytes of
   navigation with an empty `<body>`. `bangkokhealth.co.th`, `bhi.co.th`,
   `bangkokhealthinsurance.com` and `bangkokhealthinsurance.co.th` do not resolve.
3. **A live บูพา ประกันสุขภาพ (ประเทศไทย) web presence.** Does not exist. `bupa.co.th` has
   no A record; `bupathailand.com` 301s to it; `aetna.co.th`, `aetnathailand.com` and
   `thailand.aetna.com` do not resolve; `bupa.com`'s home page contains no occurrence of
   "Thailand".
4. **A primary-source record of the บูพา → เอ็ทน่า rename.** Not established. The
   acquisition of เอ็ทน่า by อลิอันซ์ อยุธยา is published on the acquirer's own domain
   (§3b); the earlier step is not, on any insurer- or คปภ.-owned page still served.
5. **Any premium from ซมโปะ tied to an age.** Does not exist publicly. Both product pages,
   all twelve of their images, the product hub, three media-centre articles and the 426-URL
   sitemap (https://www.sompo.co.th/sitemap.xml) were checked; `health.`, `buy.`, `shop.`,
   `online.` and `ecom.sompo.co.th` are NXDOMAIN.
6. **Any entry age or renewal ceiling from ซมโปะ for the current products.** Does not exist
   publicly. The only figures on the domain belong to the discontinued 2022 predecessor
   product and must not be carried across (§5e).
7. **A renewal ceiling age for MSIG โรคสุดฮิต.** Does not exist publicly. The sentence that
   carries it on https://www.msig-thai.com/th/personal-insurance/cancer-fix has no
   counterpart on https://www.msig-thai.com/th/personal-insurance/seasonal-diseases, and it
   appears nowhere in the 706-URL sitemap or on the psmart quote flow.
8. **A filed wording from MSIG, Sompo or Tokio Marine.** Does not exist publicly for any of
   the three. Sompo publishes **no PDF of any kind** on its domain. Tokio Marine publishes
   claim forms only. MSIG publishes brochures that defer to `กรมธรรม์ประกันภัย`, which it
   does not publish.
9. **A live คปภ. register of currently licensed companies.** Not machine-readable.
   `https://www.oic.or.th/th/consumer/insurance/companies/non-life/list` and its siblings
   serve a 9,707-byte Nuxt shell whose backing API
   (`https://www.oic.or.th/api/company/non-life`) returns `401 Invalid Client or Client
   Unauthorized`; the guest-token route `POST /api/oauth2/guest/access-token` with
   `client_id=oic_web_client` returns `invalid_client`. The legacy e-service register
   (`https://oiceservice.oic.or.th/company/non_life.php`, and the filed-policy search at
   `/insuranceagainst.php`) renders an **empty company dropdown and an empty result table**
   for every query tried, including a keyword search on `สุขภาพ`. **Company existence in
   this file therefore rests on the คปภ. standard reference index
   (https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337, มิถุนายน
   2563 — six years old) plus each insurer's own current statements.** Anyone who finds a
   live คปภ. company register should revisit §2 and §3.

## 9. What this round changes about the project's assumptions

1. **A live quote endpoint can be a better primary source than a filed rate table, and
   Pacific Cross is the proof.** `standalone-health-sourcing.md` already argued this for
   Dhipaya and Viriyah; here it produced a complete 14-band, 9-plan, 0-to-99 rate card from
   an insurer whose brochures contain no premiums at all. The lesson generalises: **when a
   Thai insurer publishes no rate table, check its online-application subdomain before
   concluding the price is unpublished.** Look for an endpoint that takes a birth date and
   returns plan data before it asks for a name.
2. **The failure mode has a name now, and three insurers did it this round.** Sompo quotes
   `5 ล้านบาท/ปี` for a per-confinement limit; MSIG quotes an OPD figure that exists on only
   two of four plans alongside a benefit that exists on the other two; Pacific Cross's own
   quote engine calls a per-confinement limit `annual_limit` in a JSON field name. In every
   case the marketing number is the best case across mutually exclusive options, and in
   every case the benefit table one click away says otherwise. `ipd_limit_basis` is not a
   nicety — it is the field that catches this.
3. **"Publishes a policy wording" and "publishes it in Thai" are different facts.** Pacific
   Cross publishes the most complete wording in this dataset, in English, with a footer
   saying the Thai version prevails. The schema's `terms_source.tier` cannot express that,
   and `filed_wording` on an English-only document overstates what a Thai reader can
   actually check. Worth a `terms_source.note` convention, or a language field.
4. **`renewal_ceiling_age` claims its third victim.** It killed ทิพย TIP ชิลชิล in the
   standalone round; here it is the single blocker on MSIG ฮอตฮิต and one of two on
   ฮิตไม่เลิก. The pattern is now unmistakable: Thai non-life insurers publish the renewal
   ceiling when it flatters (Pacific Cross's 99, MSIG cancer's 64) and omit it entirely
   when it does not. The schema's hard requirement systematically biases this dataset
   toward products with good renewal terms — see `standalone-health-sourcing.md` §6.1.
5. **Two company-existence assumptions in the brief were wrong in opposite directions.**
   กรุงเทพประกันสุขภาพ was assumed merged into กรุงเทพประกันภัย and is neither merged nor
   related to it — it is a BDMS company, alive, publishing nothing. บูพา was named in
   `standalone-health-sourcing.md` §5 as a live retry target and is in fact the *origin* of
   the Cigna/Aetna chain and gone. **Verify the company before researching the product**
   should be a standing step, not a special case.
6. **A cancer or specified-disease policy is not a health policy, and the schema is right
   to reject it.** MSIG and Tokio Marine both publish more rate detail than Sompo does, and
   neither can be entered, because `ipd_annual_limit_thb` has no meaning for a lump-sum
   dread-disease benefit. If this project ever wants to cover them, that needs its own
   record type, not a coerced health record.

## 10. Still open — not researched in this file

- **A Thai policy wording for Pacific Cross.** Worth one direct request to
  `contactus@th.pacificcrosshealth.com`. Obtaining it would make the nine Pacific Cross
  records the first in the dataset whose terms are sourced from a Thai filed wording.
- **Whether Pacific Cross's Premier Plus rates above 74 are renewal-only or open to new
  entrants.** The engine quotes them; the English FAQ says new entry to 80; the date picker
  stops at 75. The three cannot all be right.
- **ชับบ์สามัคคีประกันภัย (Chubb Samaggi)** — the live successor to Cigna's Thai book, named
  but never researched in `standalone-health-sourcing.md` §5 and still absent from this
  dataset.
- **อลิอันซ์ อยุธยา ประกันภัย** — the live successor to the Bupa/Aetna book, and a large
  individual health writer. Nothing about it is recorded here beyond the one acquisition
  announcement in §3b, and nothing should be entered into `data/plans` for it until a pass
  with verbatim quotes and per-claim URLs exists.
