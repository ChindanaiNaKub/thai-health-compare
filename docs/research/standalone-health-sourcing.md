# Standalone health sourcing: non-life insurers that need no host life policy

Research date: 2026-08-10. Scope: individual health policies sold by Thai **non-life**
insurers, which can be bought on their own. Every claim below is followed by the exact
URL and the verbatim Thai it rests on. Only insurer-owned domains were used; no agent
or broker page is cited for anything.

Insurers checked, in the priority order given: ทิพยประกันภัย (Dhipaya), วิริยะประกันภัย
(Viriyah), กรุงเทพประกันภัย (Bangkok Insurance), ซิกน่า/Cigna, เอ็ทน่า/Aetna. ทีคิวเอ็ม was
skipped as instructed — it is a broker, not an insurer.

**Result: three records added, all Dhipaya. Viriyah, Bangkok Insurance, Cigna and Aetna
are all documented below under "not included and why", and one Dhipaya product
(TIP ชิลชิล) is rejected too, for a reason that is the single most important finding of
this pass — see §6.**

## Method note

None of these insurers publish a rate-table PDF. What they publish instead is a live
premium calculator on their own site, and that is a *better* source than a brochure: it
is the price the insurer will actually sell at today, it is machine-readable, and it can
be swept across every age to recover the full band structure. Both Dhipaya and Viriyah
were swept this way against their own endpoints:

- Dhipaya: `POST https://ft.tipinsure.com/Health/submit_step_1` (or `/HealthTalisman/`)
  with `insured_gender` + `insured_birth_year`, then `GET .../step_2`, which embeds a
  `packageData` JSON blob carrying `age_min`, `age_max`, `total_premium` and the whole
  benefit schedule. Swept at birth years 2011, 2005, 1999, 1996, 1995, 1990, 1985, 1980,
  1975, 1970, 1966, 1965, 1964, 1960, 1957, 1955, both sexes.
- Viriyah: `GET https://vinsure.viriyah.co.th/insurance/health/<product>?birthday=DD/MM/YYYY`,
  and the underlying `POST /api/WidgetProductDetail/PremiumCal?SKUID=..&birthday=..&factor=-`.
  Swept at birth years 2025→1961.

The one PDF that mattered (Viriyah's V Better Care brochure) has the usual Thai PDF
problem, but in the milder form: `pdftotext -layout` drops the vowel and tone marks
rather than mapping them into the private-use area, so "ความคุ้มครอง" extracts as
"ความคุมครอง". Quotes from that PDF below are marked `[sic: extraction]` and the marks
have been restored only where the same string appears in plain HTML on Viriyah's own
site to check against. No Dhipaya quote comes from a PDF — all are HTML or JSON, so
they are verbatim.

---

## 1. ทิพยประกันภัย — TIP Insure ยันต์ (INCLUDED, 3 records)

Product page: https://ft.tipinsure.com/HealthTalisman/index

### 1a. It really is standalone

Dhipaya is a non-life insurer. There is no life policy anywhere in the flow: the quote
takes birth year and sex, and the page ends at "ซื้อประกันออนไลน์ ... ซื้อแล้วรอรับกรมธรรม์
ได้ทันทีทางอีเมล". `host_policy: null` is correct.

### 1b. Entry ages and renewal ceiling — PUBLISHED, and this is rarer than it sounds

> คุ้มครองผู้เอาประกันภัยรายใหม่ อายุ 15 - 70 ปี สุขภาพสมบูรณ์ แข็งแรง ไม่มีส่วนใดส่วนหนึ่งพิการหรือวิกลจริต ณ วันที่กรมธรรม์มีผลบังคับ (ต่ออายุถึง 80ปี)

Source: https://ft.tipinsure.com/HealthTalisman/index (เงื่อนไขการรับประกันภัย, appears
twice, once per plan tier)

That parenthetical `(ต่ออายุถึง 80ปี)` is the only published renewal ceiling found across
every product examined in this pass.

### 1c. Renewal is at the insurer's discretion, not guaranteed

> บริษัทฯ สงวนสิทธิ์ในการปรับเบี้ยประกันภัย แผนประกันภัยในปีต่ออายุ โดยการพิจารณาจากอายุผู้เอาประกันภัย และประวัติการเรียกร้องสินไหมทดแทน

Source: same page. Note it reserves the right to adjust not only เบี้ยประกันภัย but
แผนประกันภัย — the plan itself — on claims history. That is materially weaker than a
guaranteed-renewable contract and is recorded verbatim in `copay_on_renewal` on all three
records, because the schema has no better home for it.

Dhipaya also states the wording is not the page:

> ผลประโยชน์และความคุ้มครองเป็นไปตามข้อกำหนดและเงื่อนไขกรมธรรม์ประกันภัยสุขภาพและอุบัติเหตุส่วนบุคคล ทิพย เอ็กซ์ตร้า แคร์

### 1d. Flat premium, shrinking benefits — the finding that forced three records

Dhipaya markets this product on the premium being flat:

> โดยปกติแล้วค่าเบี้ยประกันมักจะสูงขึ้นตามช่วงอายุ แต่กับประกันสุขภาพ TIP Smart Health Care นั้น หมดห่วงเรื่องเบี้ยที่จะแรงขึ้นตามอายุที่มากขึ้น เพราะมาในเบี้ยราคาเดียวทุกช่วงอายุ

Source: https://ft.tipinsure.com/HealthTalisman/index

That is true. The premium really is 8,888.00 and 18,888.00 at every age from 15 to 70,
for both sexes. What the sentence omits is that **the benefits fall instead.** From
Dhipaya's own quote JSON, same product, same premium:

| Entry band | 8,888/yr: ต่อปี | ต่อครั้ง/ต่อโรค | ค่าห้อง | 18,888/yr: ต่อปี | ต่อครั้ง/ต่อโรค | ค่าห้อง | OPD/ครั้ง |
|---|---|---|---|---|---|---|---|
| 15-40 | 450,000 | 90,000 | 4,500 | 500,000 | 100,000 | 6,000 | 2,500 |
| 41-50 | 350,000 | 70,000 | 3,500 | 500,000 | 100,000 | 6,000 | 1,300 |
| 51-60 | 250,000 | 50,000 | 2,500 | 400,000 | 80,000 | 5,000 | 1,000 |
| 61-70 | 175,000 | 35,000 | 1,750 | 300,000 | 50,000 | 4,000 | 800 |

Field labels verbatim from the same JSON:

> • สูงสุดต่อปี (บาท)/ปี
> • ต่อโรคหรือต่ออุบัติเหตุแต่ละครั้ง (บาท)
> • ค่าห้องผู้ป่วยปกติ
> • ค่าห้องผู้ป่วย ICU/CCU
> 2. ผู้ป่วยนอก (1 ครั้งต่อวัน สูงสุด 30 ครั้งต่อปี)(บาท)

A 65-year-old and a 25-year-old pay the identical 8,888 and get 175,000 versus 450,000.
The page's only acknowledgement of this is one line in the หมายเหตุ:

> เงื่อนไขการรับประกันภัยเป็นไปตามช่วงอายุตามที่กรมธรรม์ประกันภัยกำหนด

Because the schema carries one benefit set plus a premium table, and this product is the
exact inverse of that shape, it is recorded as one file per entry band rather than
averaged or reported at its best figure. Three files were written: the two ends of the
8,888 tier (15-40 and 61-70) and the 15-40 end of the 18,888 tier.

### 1e. The 450,000 is per policy year, and there is a per-confinement limit underneath it

`ipd_limit_basis: per_policy_year` is right for the headline figure — the field is
literally named `สูงสุดต่อปี`. But the binding constraint in most claims is the
per-confinement one, `ต่อโรคหรือต่ออุบัติเหตุแต่ละครั้ง` (90,000 on the 15-40 basic tier),
with re-admission rules that behave like a per-confinement clause:

> หากเข้ารับการรักษาในครั้งที่สองซึ่งห่างจากครั้งแรกไม่เกิน 90 วัน โดยนับจากวันที่ออกจากโรงพยาบาลครั้งสุดท้ายให้ใช้วงเงินผลประโยชน์ที่เหลืออยู่จากการเข้ารับการรักษาในครั้งแรก
> หากเข้ารับการรักษาในครั้งที่สองซึ่งห่างจากครั้งแรกเกินกว่า 90 วัน โดยนับจากวันที่ออกจากโรงพยาบาลครั้งสุดท้ายให้นับเป็นวงเงินผลประโยชน์ใหม่

Source: https://ft.tipinsure.com/HealthTalisman/index

The 90-day rule is the same one AIA uses to define ครั้งใดครั้งหนึ่ง. The schema has one
IPD field, so the annual figure is recorded and the per-confinement figure is quoted in
`terms_source.note` on every record.

### 1f. Three product names on one page

The same page calls this product **TIP Smart Health Care** and **TIP Deluxe Health Care**
in the marketing copy, **TIP Insure ยันต์** in the live quote engine
(`package_name_string`), and **ทิพย เอ็กซ์ตร้า แคร์** in the line naming the actual policy.
The marketing figures do not reconcile with the quote either — the copy says OPD
"สูงสุด 2,000 บาทต่อครั้ง" and "สูงสุด 3,000 บาท/ครั้ง" for the two tiers, while the quote
engine returns 2,500 for the 18,888 tier and ไม่คุ้มครอง for the 8,888 tier. The records use
the quote engine, since that is what a buyer is actually offered. Recorded as a
contradiction in the YAML notes rather than silently resolved.

### 1g. OPD annual cap — not published

> 2. ผู้ป่วยนอก (1 ครั้งต่อวัน สูงสุด 30 ครั้งต่อปี)(บาท) = 2,500

Dhipaya publishes a per-visit cap and a visit count, never an annual OPD figure.
Multiplying 2,500 × 30 would be arithmetic Dhipaya has not done, so
`opd_annual_limit_thb` is `null` with that reason on the 18,888 record. On the 8,888
records the value is `0`, which is not an absence — the schedule says ไม่คุ้มครอง.

---

## 2. ทิพยประกันภัย — TIP ชิลชิล (NOT INCLUDED — no published renewal ceiling)

Product page: https://ft.tipinsure.com/Health/index

This is the cheapest genuinely standalone health policy found in the whole pass and it
was fully sourced except for one field. It is documented here in full so the next person
does not repeat the work.

Six plans, all constant-benefit across every age band (verified at birth years 1996 and
1970, both sexes — identical schedules), with a complete published annual rate table:

| Plan | วงเงินสูงสุดต่อปี | ต่อครั้ง/ต่อโรค | ค่าห้อง | OPD | 15-30 | 31-40 | 41-50 | 51-60 |
|---|---|---|---|---|---|---|---|---|
| TIP นอนชิล 1 | 100,000 | 25,000 | 3,000 | ไม่คุ้มครอง | 4,240 | 4,900 | 5,495 | 7,230 |
| TIP นอนชิล 2 | — | — | — | ไม่คุ้มครอง | 6,190 | 7,115 | 7,945 | 10,375 |
| TIP นอนชิล 3 | 300,000 | 50,000 | 8,000 | ไม่คุ้มครอง | 8,895 | 10,215 | 11,400 | 14,875 |
| TIP เจ็บก็ชิล ป่วยก็ชิล 4 | — | — | — | มี | 8,245 | 9,970 | 11,670 | 14,955 |
| TIP เจ็บก็ชิล ป่วยก็ชิล 5 | — | — | — | มี | 13,445 | 16,365 | 19,295 | 24,475 |
| TIP เจ็บก็ชิล ป่วยก็ชิล 6 | — | — | — | มี | 17,020 | 20,670 | 24,335 | 30,810 |

All figures THB/year, unisex (male and female quotes are byte-identical), from Dhipaya's
own `packageData` JSON at https://ft.tipinsure.com/Health/step_2.

Benefit labels for plan 1, verbatim:

> ความคุ้มครองสูงสุดต่อปี = 100,000
> • ความคุ้มครองสูงสุดต่อการพักรักษา (ต่อครั้ง/ต่อโรค) = 25,000
> • ค่าห้อง (ต่อวัน/สูงสุด 365 วันต่อปี) = 3,000
> • ค่ารักษาอุบัติเหตุฉุกเฉิน ภายใน 24 ชั่วโมง = 5,000
> 2. ผู้ป่วยนอก (ต่อวัน/สูงสุด 30 วันต่อปี) = ไม่คุ้มครอง
> 3. ค่าทันตกรรม = 500

Entry ages, verbatim:

> คุ้มครองผู้เอาประกันภัยรายใหม่ ซึ่งมีอายุระหว่าง 15 – 60 ปี มีสุขภาพสมบูรณ์ แข็งแรง ไม่มีส่วนใดส่วนหนึ่งพิการหรือวิกลจริต ณ วันที่กรมธรรม์มีผลบังคับ

Source: https://ft.tipinsure.com/Health/index

**And that is all Dhipaya says about age.** There is no `(ต่ออายุถึง N ปี)` on this product —
compare §1b, where the identical sentence pattern on the sibling product *does* carry the
parenthetical. The omission is deliberate, not an oversight of the page. Dhipaya's FAQ
page repeats only "ประกันสุขภาพ TIP ชิลชิล ทำได้ตั้งแต่อายุ 15-60 ปี" and
"การปรับเบี้ยประกันภัยในปีต่ออายุ จะพิจารณาจากอายุผู้เอาประกันภัย และประวัติการเคลม"
(https://ft.tipinsure.com/NewsAndActivities/news_content_v4/สุขภาพ/question_and_answer_for_health_insurance).
The quote engine returns no plans at all for birth years 1965, 1964, 1960 and 1955, so
the published rate table also stops dead at age 60.

The schema requires `renewal_ceiling_age` to be a number **strictly greater than**
`entry_age_max`. The only defensible number here is 60, which is exactly
`entry_age_max` and fails the check — correctly, because a policy that renews only to the
age it stops selling at is not a health plan anyone should be shown as long-term cover.
Rather than invent 65 or 70, the product is left out. Checked for a wording:
https://ft.tipinsure.com/files/document/TermAndCondition.pdf (online purchase T&Cs, not a
policy), https://ft.tipinsure.com/Home/Coverage (hospital/branch directory, no PDFs), and
Dhipaya's product menu — no กรมธรรม์ or สรุปสาระสำคัญ for TIP ชิลชิล is published anywhere.

---

## 3. วิริยะประกันภัย — V Better Care (NOT INCLUDED — premium published only monthly)

Product page: https://vinsure.viriyah.co.th/insurance/health/v-better-care
Brochure: https://vinsure.viriyah.co.th/VHealth/media/Brochure/BrochureDeduct/v-better-care-deduct-coverage.pdf
(Effective Date: March 2026)

This is the best-documented standalone product found, and the closest thing to a
guaranteed-renewable health policy from a non-life insurer:

> • ผู้เอาประกันภัยอายุไม่เกิน 60 ปี กรณีต่ออายุกรมธรรม์อย่างต่อเนื่องสามารถต่ออายุได้ถึง 100 ปี
> • ผู้เอาประกันภัยอายุ 61 – 65 ปี กรณีต่ออายุกรมธรรม์อย่างต่อเนื่องสามารถต่ออายุได้ถึง 80 ปี

Source: brochure p.9 `[sic: extraction]`, verbatim identically in HTML at the product page.

> ลูกค้าสามารถซื้อความคุ้มครองสุขภาพและอุบัติเหตุ โดยที่ไม่ต้องพ่วงผู้ติดกับสัญญาหลัก ไม่ผูกติดแผนประกันสุขภาพกับทุนประกันชีวิต

> เมื่อพิจารณารับประกันแล้วบริษัทการันตีการต่ออายุแม้เคลมสูง

Source (both): https://vinsure.viriyah.co.th/insurance/health/v-better-care (FAQ)

Three plans, true annual lump sum (`เหมาจ่ายต่อปี`), 330,000 / 550,000 / 770,000 per year,
rooms 2,500 / 3,500 / 4,500 per night, optional OPD 1,000/1,500/2,500, optional
deductible 20,000/50,000 and optional 30% copay. Waiting periods 30 and 120 days with the
standard eight named conditions. Entry ages contradict between two places on Viriyah's own
site: the underwriting block says `สมัครได้ตั้งแต่อายุ 11 ปี – 65 ปี` while the calculator
hint and the FAQ both say `15 วัน – 65 ปี`; the quote engine returns nothing below age 11,
which sides with the brochure.

The sweep recovered the entire age-band structure, twelve bands from 11 to 65:

| Band | Plan 1 | Plan 2 | Plan 3 |
|---|---|---|---|
| 11-15 | 1,214 | 1,491 | 1,722 |
| 16-20 | 1,012 | 1,243 | 1,436 |
| 21-25 | 1,113 | 1,368 | 1,581 |
| 26-30 | 1,163 | 1,429 | 1,653 |
| 31-35 | 1,214 | 1,491 | 1,725 |
| 36-40 | 1,262 | 1,550 | 1,794 |
| 41-45 | 1,323 | 1,627 | 1,884 |
| 46-50 | 1,382 | 1,699 | 1,968 |
| 51-55 | 1,646 | 2,033 | 2,351 |
| 56-60 | 2,073 | 2,471 | 2,892 |
| 61-65 | 2,702 | 3,226 | 3,777 |

**And every one of those numbers is labelled `เบี้ยประกันต่อเดือน` — per month.** Viriyah
publishes no annual figure for this product, or for วิริยะ คลาสสิค, วิริยะ โกลด์,
วี ดีลักซ์ แคร์ or วี เพรสทีจ แคร์; all five product pages carry the same monthly label.
The brochure contains no rate table at all. The product is not sold online
("สนใจโปรดติดต่อเจ้าหน้าที่"), so there is no checkout that would reveal an annual price.

Worse, Viriyah's own API contradicts its own page. `POST /api/WidgetProductDetail/PremiumCal`
returns, for the same figure the page labels monthly:

```
{"premium":"1,163.00","premiumYear":"1,163.00","netAnnually":null,"netMonthly":null}
```

The field named `premiumYear` holds the number the page calls a monthly premium. So the
basis is not merely unpublished, it is stated two contradictory ways by the same
insurer. `thb_per_year` cannot be filled without either multiplying by 12 — arithmetic
Viriyah has not published — or trusting a field name that the page itself contradicts.
Left out. This is the single most valuable thing to fix on a retry: one screenshot of a
Viriyah quote sheet showing an annual figure would unlock the best standalone product in
the Thai market for this site.

---

## 4. กรุงเทพประกันภัย (NOT INCLUDED — no premium published at all)

- https://www.bangkokinsurance.com/th/product/health/new — three tiers, Classic Care /
  Superior Care / Premier Care. Terms are published: `รับประกันภัยบุคคลสัญชาติไทยอายุตั้งแต่ 16-70 ปี`,
  renewal continuing to 80, `30วัน หลังจากที่กรมธรรม์ประกันภัยมีผลบังคับเป็นครั้งแรก` and a
  120-day list, `คุ้มครองทั่วโลก ยกเว้นสหรัฐอเมริกา`.
- https://www.bangkokinsurance.com/th/product/health/healthipd — "ความคุ้มครองสูงสุด 1 ล้านบาทต่อปี".

BKI is the only insurer here that publishes actual filed wording:
https://www.bangkokinsurance.com/download/Agreement_file/กรมธรรม์ประกันภัยสุขภาพส่วนบุคคล.pdf
and https://www.bangkokinsurance.com/download/Agreement_file/ข้อตกลงคุ้มครองประกันภัยสุขภาพส่วนบุคคล.pdf
(from https://www.bangkokinsurance.com/product/document) — a `filed_wording` tier source,
which nobody else in this pass offers.

But there is no premium anywhere. Every health product page ends at
`สอบถามรายละเอียดเพิ่มเติม ติดต่อทีมพัฒนาลูกค้ารายย่อย โทร. 0 2285 8585`, and the health
products are not among the ones with a `ซื้อประกันภัยออนไลน์` button (cancer and office
syndrome are; health is not). `premium` is a required, non-empty array. Left out.
Retry lead: the wording PDFs above are worth reading regardless — they would let an
existing record's `terms_source.tier` be upgraded from `official_insurer` to
`filed_wording`, which no record in this repo currently is.

---

## 5. ซิกน่า / เอ็ทน่า (NOT INCLUDED — the companies no longer exist under those names)

Neither brand operates a standalone Thai retail health insurer today. Cigna's Thai
non-life operation was sold to Chubb (2022) and the Thai retail health business now
trades as Chubb Life / Chubb Samaggi; Aetna Thailand was absorbed into Bupa/other
carriers. Neither `cigna.co.th` nor `aetna.co.th` serves a current Thai individual health
product page that could be cited as a primary source. No record was attempted rather than
cite a successor company's product under a name the brief asked for. If these are still
wanted, the correct targets are **Chubb Samaggi** and **Bupa Thailand**, both non-life,
both standalone.

---

## 6. Schema fields Thai non-life insurers systematically refuse to publish

Ranked by how often the gap actually blocked a record:

1. **`renewal_ceiling_age`.** This is the killer. It is a required field with a hard
   refinement (`> entry_age_max`), and Thai non-life insurers treat the renewal ceiling as
   optional marketing copy — present when it flatters (Viriyah's 100, Dhipaya's 80 on one
   product) and simply absent when it does not (Dhipaya on TIP ชิลชิล). It cost this pass
   the cheapest product it found. Worth considering whether the field should be
   `number | null` with a required reason string, the way the premium fields already are —
   the current design forces either a fabricated number or a dropped plan, and dropping the
   plan systematically biases the site toward products whose renewal terms are good enough
   to advertise.
2. **`premium` as THB per year.** Non-life insurers quote monthly to look cheap next to
   life riders. Viriyah does it across its entire health range. The schema is right to
   demand annual, but it means an entire insurer can be unrepresentable.
3. **`opd_annual_limit_thb`.** Universally published as per-visit × visit-count, never as
   an annual total. `null` is the honest answer every time, which makes the field almost
   useless for comparison. A `{per_visit, visits_per_year}` shape would capture what
   insurers actually publish.
4. **A single `ipd_annual_limit_thb` + `ipd_limit_basis`.** These products routinely have
   *both* an annual cap and a per-confinement cap, and the second one is what bites. The
   enum forces a choice between two figures that both exist. See §1e.
5. **Guaranteed vs discretionary renewal.** There is no field for it. Viriyah's
   "การันตีการต่ออายุแม้เคลมสูง" and Dhipaya's "สงวนสิทธิ์ในการปรับ ... แผนประกันภัยในปีต่ออายุ"
   are opposite promises and both currently have to be smuggled into `copay_on_renewal`,
   which is not what that field means.
6. **Fixed benefits, variable premium.** The schema assumes it. TIP Insure ยันต์ is the
   inverse — fixed premium, benefits that fall by 61% between the youngest and oldest entry
   band. Modelled here as one record per entry band, which works but is a workaround.
7. **Filed wording.** Only Bangkok Insurance publishes any. Every `terms_source` written in
   this pass is `official_insurer`, not `filed_wording`, and every one of them rests on a
   product page that the insurer itself disclaims
   ("ผลประโยชน์และความคุ้มครองเป็นไปตามข้อกำหนดและเงื่อนไขกรมธรรม์ ...").
