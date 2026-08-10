# Round 3 sourcing, batch B: eight small or uncertain Thai non-life insurers

Research date: 2026-08-10. Same rules as the other files in this directory: every claim is
followed by the verbatim Thai it rests on and the exact URL that Thai lives on. Only
insurer-owned domains and insurer-hosted documents were used. No agent, broker, comparison
site, hospital or news outlet is cited for any product fact.

Scope: individual health insurance (ประกันสุขภาพรายบุคคล) from eight companies, none of which
appears in `standalone-health-sourcing.md` or `round2-insurers-sourcing.md`. Several arrived
with garbled or uncertain identities, so each company's real registered name and live domain
was established first.

**Outcome: eight companies checked, eight rejected, zero records addable.** All eight exist
and trade today. Not one of them publishes an individual health product. The category
breakdown is: four sell personal accident only, one sells personal accident plus
single-disease (cancer, dengue) only, one sells group health for migrant workers only, one
publishes no product detail of any kind, and one — the largest, AIG — sells a full
accident-and-health *shelf* that contains no medical-expense health plan at all.

This is a screening pass and it is meant to be read as a negative result. The value is that
the next person does not repeat it. Three of the eight are worth re-checking later for the
reasons given in §11; the other five are permanent dead ends.

---

## Method note

1. **No PDFs were involved.** Nothing in this batch publishes a rate table, a brochure or a
   filed wording, so the ำ-dropping extraction problem documented in the other two files does
   not arise here. Every Thai string below comes from HTML, from a JSON API response, or —
   in exactly one case (Aioi, §4) — from an image read visually, which is flagged where it
   occurs. No quote in this file is `[sic: extraction]`.
2. **Four of the eight sites are JavaScript shells** that render nothing to `curl`. Their
   product catalogues were recovered from the insurer's own data layer rather than from a
   rendered page, which is a *better* source, not a worse one — it is the list the site
   itself is built from:
   - ไทยไพบูลย์ (Nuxt): navigation and product names extracted from the site's own bundle,
     `https://thaipaiboon.com/_nuxt/12a1e95.js`.
   - อินทรประกันภัย (Next.js): full product catalogue from the insurer's own CMS API,
     `GET https://api.indara.co.th/cms-api/website/products/active` and
     `GET https://api.indara.co.th/cms-api/website/products/category`
     (ordinary browser User-Agent + `Referer: https://www.indara.co.th/`; the host also
     needs `--http1.1`, it emits an illegal HTTP/2 `keep-alive` header that aborts curl).
   - ไอโออิ (Next.js front end over a Strapi CMS): the new site renders no product list at
     all, but the insurer still serves its legacy CMS at `cms.aioibkkins.co.th`, which does.
   - เอไอจี (AEM): the product shelf was taken from AIG's own `sitemap.xml`, which enumerates
     every published product URL and is the most complete statement of what AIG sells that
     AIG itself publishes.
3. **WebFetch is not sufficient for this batch.** Several of these sites return a bare title
   or a "Loading…" div to it. Everything below was fetched with `curl` and an ordinary
   browser User-Agent.
4. **The คปภ. company register could not be read directly, and that is a real gap.**
   `https://www.oic.or.th/th/consumer/insurance-companies` is a Nuxt SPA whose backing API
   (`https://www.oic.or.th/api/...`) returns
   `{"status":401,"error":"32001","description":"Invalid Client or Client Unauthorized"}`
   to an unauthenticated request; `https://smart.oic.or.th/EService/Menu1` and
   `.../EService/Home` are OutSystems apps that ship no server-rendered company list;
   `https://oiceservice.oic.or.th/licenseagency/license.php` and
   `https://oiceservice.oic.or.th/insuranceagainst.php` render their insurer dropdowns
   client-side and serve them empty. So **licence existence in this file is established from
   each insurer's own คปภ.-mandated corporate disclosure** (the registered Thai name in the
   footer, the ฐานะการเงิน / Public Disclosure page, the มาตรฐานกรอบระยะเวลาการให้บริการ page —
   all three of which the OIC requires a licensed non-life insurer to publish), not from the
   register itself. Where a regulatory action is reported but no OIC-hosted page could be
   retrieved, it is marked as unverified rather than asserted (§6).

---

## 1. ไทยพัฒนาประกันภัย — REJECTED (personal accident only)

**Identity.** The brief offered "Thai Paiwat / Thai Pat Insurance". Both are wrong. The
company's own footer romanises itself:

> © 2026 Thai Pattana Insurance PCL. - All rights reserved.

> บริษัท ไทยพัฒนาประกันภัย จำกัด (มหาชน) สำนักงานใหญ่ 34 ซ.สุขุมวิท 4 (นานาใต้) ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กทม. 10110

Source: https://thaipat.co.th/th/products/personal-accident/ (footer, present on every page)

**Thai Pattana**, not Thai Paiwat. Live domain `thaipat.co.th`, current 2026 copyright,
publishes ฐานะทางการเงิน and มาตราฐานระยะเวลาการให้บริการ — an operating licensed non-life
insurer.

**Products.** The complete product menu, verbatim, seven categories and no more:

> ประกันภัยรถยนต์
> ประกันอัคคีภัย
> ประกันภัยทางทะเลเเละขนส่ง
> ประกันอุบัติเหตุส่วนบุคคล
> ประกันภัยอิสรภาพ
> ประกันภัยเบ็ดเตล็ด
> ประกันภัยโดรน

Source: https://thaipat.co.th/th/products/personal-accident/ (sidebar and footer, identical
on https://thaipat.co.th/th/products/miscellaneous/ and on the home page navigation)

There is no ประกันสุขภาพ category. The เบ็ดเตล็ด catch-all page names its contents and health
is not among them:

> นอกเหนือจากการประกันภัยประเภทต่างๆแล้ว บริษัทฯยังมีผลิตภัณฑ์ประกันภัยที่หลากหลายเพื่อรองรับความต้องการของลูกค้าและสามารถปรับความคุ้มครองและทุนประกันภัยเพื่อความเหมาะสมได้ เช่น ประกันภัยความรับผิดต่อบุคคลภายนอก ประกันภัยผู้โดยสารเรือโดยสาร และประกันภัยเดินทางเป็นหมู่คณะ ฯลฯ

Source: https://thaipat.co.th/th/products/miscellaneous/

**Category: PA only.** The ประกันอุบัติเหตุส่วนบุคคล page carries five priced plans — SILVER
240, GOLD 380, PEARL 450, DIAMOND 720, PLATINUM 1,200 บาท — all อ.บ.2 accident cover:

> เสียชีวิต, สูญเสียอวัยวะ, สายตา, การรับฟังเสียง การออกเสียงพูด หรือทุพพลภาพถาวร (อ.บ. 2)
> ค่ารักษาพยาบาล (ต่ออุบัติเหตุแต่ละครั้ง)
> • ผู้เอาประกันต้องมีอายุระหว่าง 10-60 ปี
> • ระยะเวลาคุ้มครอง 1 ปี คุ้มครอง 24 ชั่วโมงทั่วโลก

Source: https://thaipat.co.th/th/products/personal-accident/

`ต่ออุบัติเหตุแต่ละครั้ง` settles it: the medical-expense benefit is per accident, not per
illness. This is not health cover.

**Flag for the reader.** The same page opens with a sentence that says otherwise:

> เมื่อท่านต้องรักษาตัวจากการบาดเจ็บหรือป่วยไข้ เราขอเสนอแผนคุ้มครองอุบัติเหตุส่วนบุคคล ดูแลค่าใช้จ่ายในการรักษา เช่น ค่ายา ค่าห้อง ค่าหมอ ฯลฯ

Source: https://thaipat.co.th/th/products/personal-accident/

`หรือป่วยไข้` — "or illness" — appears in the marketing sentence and appears nowhere in the
benefit schedule below it, which pays only `ค่ารักษาพยาบาล (ต่ออุบัติเหตุแต่ละครั้ง)`. A
reader who stops at the first sentence would believe they had bought sickness cover for 240
baht. This is exactly the brochure-versus-contract gap `CONTRIBUTING.md` exists to catch,
and it is worth recording even though no plan comes out of it.

**Verdict: no individual health product exists. Out of scope, permanently.**

---

## 2. ไทยเศรษฐกิจประกันภัย (TSI) — REJECTED (no product data published at all)

**Identity.** No rename. The brief's suspicion that this company "has been renamed before" is
not borne out by the company's own history page, which traces one continuous name from 1942:

> บริษัท ไทยเศรษฐกิจประกันภัย จำกัด (มหาชน) หรือ TSI ก่อตั้งเมื่อวันที่ 31 มกราคม 2485 โดยดําริของ จอมพล ป. พิบูลสงคราม นายกรัฐมนตรีในขณะนั้น

Source: https://www.tsi.co.th/about_us/history

The only structural change the company records is the 1983 split of its life and non-life
books, and the 1993 conversion to a public company:

> 2526 แยกธุรกิจประกันชีวิตและประกันวินาศภัยออกจากกัน
> 2536 แปรสภาพเป็น “บริษัทมหาชน”
> 2534 เข้าจดทะเบียน ในตลาดหลักทรัพย์ แห่งประเทศไทย ภายใต้ชื่อ หลักทรัพย์ “TSI”

Source: https://www.tsi.co.th/about_us/history

Live domain is `www.tsi.co.th` — note that the bare `tsi.co.th` fails TLS (the certificate
has no matching subject alternative name), so any link to it will break.

**Business lines, in the company's own words — health is not one of them:**

> บริษัท ไทยเศรษฐกิจประกันภัย จำกัด (มหาชน) หรือ “TSI Insurance” ดำเนินธุรกิจรับประกัน วินาศภัยทุกประเภท การประกันภัยรถยนต์ การประกันอัคคีภัย การประกันภัยเบ็ดเตล็ด การประกันภัย การขนส่งสินค้าทางทะเล

Source: https://www.tsi.co.th/about_us/history

**Products: two categories, zero products.** The home page product carousel offers exactly
two tiles, `ประกันรถยนต์` and `ประกันอุบัติเหตุ`, and the detail panel beneath them says, verbatim:

> ไม่พบข้อมูล

Source: https://www.tsi.co.th/ (the `<!-- Product details -->` block; the two tiles are
Livewire click targets `openDiv(28)` and `openDiv(29)` and neither resolves to any content)

The string `สุขภาพ` does not occur anywhere on the TSI home page. `https://www.tsi.co.th/products`
returns 404, and the two image paths under `/products/…` are PNGs, not pages.

**Category: none published.** TSI does not merely lack a health product — it publishes no
product detail whatsoever, for any line. There is nothing here to source even for motor.

**Verdict: nothing to record. Not a health writer, and currently not a publisher of product
information of any kind.**

---

## 3. ไทยไพบูลย์ประกันภัย — REJECTED (personal accident and travel only), and the reason is structural

**Identity.** No merger. The company exists under its own name and its own domain:

> บริษัท ไทยไพบูลย์ประกันภัย จำกัด (มหาชน)
> Thai Paiboon Insurance PLC

Source: https://thaipaiboon.com/ (site bundle `https://thaipaiboon.com/_nuxt/12a1e95.js`,
Thai and English locale dictionaries)

**The finding that explains everything else: it is a Thai Life group company.** Its own
footer publishes the group roster:

> thaiLifeAssuranceGroup:"บริษัทในกลุ่ม", thaiLifeInsurance:"ไทยประกันชีวิต", thaipaiboonInsurance:"ไทยไพบูลย์ประกันภัย", thaiHealthInsurance:"ไทยประกันสุขภาพ", thaiCreditRetailBank:"ธนาคารไทยเครดิต"

Source: https://thaipaiboon.com/_nuxt/12a1e95.js (footer locale strings; rendered on
https://thaipaiboon.com/ as the "บริษัทในกลุ่ม" list)

ไทยไพบูลย์ sits in the same group as **ไทยประกันสุขภาพ**, which is the single best individual
health source this project has found (see `round2-insurers-sourcing.md` §1, full age-band
tables to age 85 plus a filed wording) and as **ไทยประกันชีวิต** (§4 of the same file). The
group already has a dedicated health writer, and ไทยไพบูลย์ is not it. That is why there is no
health product here, and it is why there never will be.

**Products.** Its health-and-accident category, verbatim, complete:

> ประกันภัยสุขภาพและอุบัติเหตุ", children:[{name:"ประกันภัยอุบัติเหตุการเดินทาง TPB TRAVEL ACCIDENT"},{name:"ประกันภัยอุบัติเหตุส่วนบุคคล TPB PA HIGH SUM"},{name:"ประกันภัยอุบัติเหตุส่วนบุคคล TPB PA U SMILE"},{name:"ประกันภัยอุบัติเหตุกลุ่มหน่วยงานราชการ"}]

Source: https://thaipaiboon.com/_nuxt/12a1e95.js (the site's own navigation tree, rendered at
https://thaipaiboon.com/insuranceProducts)

**Category: PA and travel-accident only — plus one group PA scheme for government bodies.**
The category is *named* `ประกันภัยสุขภาพและอุบัติเหตุ` and contains four products, all four of
them accident. The word สุขภาพ appears in the category label, in the claims-procedure page
title (`ขั้นตอนและวิธีการขอรับค่าสินไหมทดแทนสำหรับประกันภัยสุขภาพและอุบัติเหตุ`,
https://thaipaiboon.com/customerService/claimHealthAccident) and in the PDPA notice. It never
attaches to a product.

**Verdict: no individual health product. Out of scope. Do not re-check — the group's health
book lives at ไทยประกันสุขภาพ and is already sourced.**

---

## 4. ไอโออิ กรุงเทพ ประกันภัย — REJECTED (one personal-accident plan, published only as images)

**Identity.** Live, licensed, and the domain in the brief is wrong: `aioibkk.co.th` does not
resolve. The correct one is **`aioibkkins.co.th`**.

> บริษัท ไอโออิ กรุงเทพ ประกันภัย จำกัด (มหาชน) | Aioi Bangkok Insurance Public Company Limited

Source: https://www.aioibkkins.co.th/th (page title) and
https://cms.aioibkkins.co.th/Product/Accident (footer,
`COPYRIGHT © 2026 บริษัท ไอโออิ กรุงเทพ ประกันภัย จำกัด (มหาชน)`)

Part of MS&AD; the site links `รู้จัก MS&AD Insurance Group` and `Aioi Nissay Dowa Insurance`.
The new Next.js front end at `www.aioibkkins.co.th/th/products` renders no catalogue, but the
legacy CMS at `cms.aioibkkins.co.th` still serves the full product tree.

**Products.** Five categories:

> ประกันภัยรถยนต์ / ประกันภัยอัคคีภัย / ประกันภัยสินค้าทางทะเล และขนส่ง / อุบัติเหตุและสุขภาพ / เบ็ดเตล็ด

Source: https://cms.aioibkkins.co.th/Product/Accident

**The `อุบัติเหตุและสุขภาพ` category contains exactly one product:**

> Buddy PA Plan

Source: https://cms.aioibkkins.co.th/Product/Accident (the entire body of that page is the
heading `Buddy PA Plan` followed by five images and nothing else — there is no product text
on the page at all)

**Category: PA only.** The benefit table is published as a PNG, not as text, so it was read
visually rather than extracted; the figures below are transcribed from
`https://cms.aioibkkins.co.th/images/Product/Accident/Table-Buddy-PA-Plan.png` and the Thai
is reproduced as it appears in that image:

| กรณีมีค่ารักษาพยาบาล | PLAN A | PLAN B |
|---|---|---|
| 1. การสูญเสียชีวิต อวัยวะ ทุพพลภาพถาวร | 1,000,000 | 1,000,000 |
| 2. การถูกฆาตกรรม หรือลอบทำร้ายร่างกาย | 1,000,000 | 1,000,000 |
| 3. การขับขี่ หรือซ้อนท้ายรถจักรยานยนต์ | 500,000 | 500,000 |
| 4. ค่ารักษาพยาบาล/ต่อครั้ง | 50,000 | 50,000 |
| เบี้ยรวมอากร — อายุไม่เกิน 60 ปี | 2,700 | 3,500 |
| เบี้ยรวมอากร — อายุ 61 - 65 ปี | 3,200 | 4,200 |

The same image publishes a cheaper variant headed `กรณีไม่มีค่ารักษาพยาบาล` at 1,650 / 2,400
(อายุไม่เกิน 60 ปี) and 2,000 / 3,000 (อายุ 61 - 65 ปี).

Four benefit rows, all four accidental, the medical row explicitly `ต่อครั้ง` per accident.
Two premium bands, one of them 45 years wide. This is a personal-accident policy with an
accident-medical rider, sold under a category label that promises สุขภาพ.

**Verdict: PA only. No individual health product. Out of scope.** Noted for completeness:
the only other retail thing Aioi promotes is telematics motor
(`กรมธรรม์ประกันภัยรถยนต์ ไอโออิ ขับดี ลดให้`, https://phydaioibkkins.com/).

---

## 5. อินทรประกันภัย — REJECTED (PA plus single-disease only)

**Identity.** The source list's spelling "อินทราประกันภัย" is wrong. There is no ◌า. The
registered name, from the company's own footer on every page:

> บริษัท อินทรประกันภัย จำกัด (มหาชน)
> ©2023 สงวนลิขสิทธิ์ อินทรประกันภัย จำกัด (มหาชน)
> บริษัท อินทรประกันภัย จำกัด (มหาชน) 315 อาคารไทยกรุ๊ป ชั้น 3-4 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500

Source: https://www.indara.co.th/customer-group/personal

**Indara**, one word, อินทร. It trades retail under the brand **อิน-ชัวร์ / IN-SURE** and is part
of ไทยกรุ๊ปโฮลดิ้งส์ alongside อาคเนย์ประกันชีวิต and อาคเนย์แคปปิตอล (footer links to
`https://www.tgh.co.th`, `https://www.southeastlife.co.th`). Live, licensed, SET-listed as
`INSURE`.

**Products — the complete catalogue, from Indara's own CMS API.** Eight categories:

> ประกันภัยรถยนต์ (car-insurance, personal)
> ประกันภัยอุบัติเหตุและสุขภาพ (accident-insurance, personal)
> ประกันภัยการเดินทาง (travel-insurance, personal)
> ประกันภัยอื่น ๆ (other-insurance, personal)
> ประกันภัยด้านวิศวกรรม / ประกันภัยการขนส่งสินค้าและตัวเรือ / ประกันภัยทรัพย์สิน / ประกันภัยอื่น ๆ (corporate)

Source: `GET https://api.indara.co.th/cms-api/website/products/category`

**The `ประกันภัยอุบัติเหตุและสุขภาพ` category holds six live products and no health plan:**

> อินชัวร์ PA Protect            (`/products/accident-insurance/pa-protect`)
> อินชัวร์ PA สบายใจ              (`/products/accident-insurance/pasabayjai`)
> ประกันภัยไข้เลือดออก            (`/products/accident-insurance/dengue-fever`)
> ประกันมะเร็ง อินชัวร์ Cancer all in one   (`/products/accident-insurance/cancer-all-in-one`)
> ประกันมะเร็ง อินชัวร์ Cancer double pay   (`/products/accident-insurance/cancer-double-pay`)
> อินชัวร์ Cancer อุ่นใจ           (`/products/accident-insurance/full-cancer`)

Source: `GET https://api.indara.co.th/cms-api/website/products/active`, filtered to
`productsCategoryId: 17`. Category landing page:
https://www.indara.co.th/products/accident-insurance

**Category: two PA plans, one dengue plan, three cancer plans.** Under this project's rules
dengue and cancer are single-disease products and are out of scope; PA is not health cover.
There is no เหมาจ่าย, no IPD limit, no room-and-board benefit, no OPD anywhere in Indara's
retail range.

**Flag for the reader.** The category landing page's hero line is:

> คุ้มครองทุกการเจ็บป่วย และบาดเจ็บจากอุบัติเหตุ หมดห่วงดูแลได้ทั้งบ้าน

Source: https://www.indara.co.th/products/accident-insurance

`คุ้มครองทุกการเจ็บป่วย` — "covers every illness" — sits at the top of a page whose six
products cover accidents, dengue and cancer. Same failure mode as ไทยพัฒนา in §1, at a
larger insurer. Two of eight companies in this batch advertise all-illness cover on a shelf
that has none.

**Verdict: no individual health product. Out of scope.**

---

## 6. เคดับบลิวไอ ประกันภัย (KWI) — REJECTED (no health product, and no product detail published)

**Identity, and it has changed three times.** KWI's own history page is unusually complete:

> 2021 — The company logo changed to “KWI”
> 2018 — King Wai Group (Thailand) Public Company Limited (KWG) completes acquisition of 98.24% of the shares in QBE Insurance (Thailand) Public Company Limited. The Company changed its name to “King Wai Insurance Public Company Limited”.
> 2013 — The Company is converted to a Public Company and changed its name to QBE Insurance (Thailand) Public Company Limited.
> 1998 — QBE Thailand changes its name from General QBE Insurance Company Limited to QBE Insurance (Thailand) Company Limited …
> 1989 — The Company is established as a joint venture company under the name Sahasin-QBE Insurance Company Limited.

Source: https://www.kwii.com/TH/history

Its own announcements list confirms the same chain from the registrar's side:

> Notice letter change company name KWI insurance — 18 May 2022
> Notification of Corporate Name Change — 26 June 2018 — Reference is made to the Notification of Corporate Name Change previously announced by QBE Insurance (Thailand) Public Company Limited. We would like to notify that we has registered the change of our corporate name into "King Wai Insurance Public Company Limited"

Source: https://www.kwii.com/TH/announcement

Current registered name and the domain — which is **`kwii.com`, not `kwi.co.th`**:

> บริษัท เคดับบลิวไอ ประกันภัย จำกัด (มหาชน)
> No. 43 Thai CC Tower, 33rd Floor, South Sathorn Road, Yannawa, Sathorn, Bangkok 10120

Source: https://www.kwii.com/TH/home (footer)

**Trap for anyone re-checking: `kwi.co.th` is a different company entirely.** It resolves,
serves HTTP 200, and belongs to a food-processing machinery business:

> บริษัท เค ดับบลิว อินเทลลิเจน โซลูชั่น จำกัด
> KW Intelligent Solution – The Leader in Food Processing Machinery

Source: https://www.kwi.co.th/

Do not cite `kwi.co.th` for anything about this insurer.

**Products.** The personal range, verbatim and complete:

> ประกันแรงงานต่างด้าว
> ประกันภัยบ้านและที่อยู่อาศัย
> ประกันอุบัติเหตุส่วนบุคคล / กลุ่ม
> ประกันภัยโรคมะเร็ง
> ประกันภัยโรคมะเร็งเฉพาะเพศ
> ประกันรถยนต์ส่วนบุคคล
> ประกันภัยเรือสำราญ

Source: https://www.kwii.com/TH/home

**Category: PA plus single-disease (cancer) plus a migrant-worker scheme.** No individual
health plan. And there is a second, harder problem: **KWI publishes no product detail at
all.** Every product page in the personal range consists of its title and this:

> หากท่านต้องการข้อมูลเพิ่มเติมเกี่ยวกับผลิตภัณฑ์นี้โปรดติดต่อเราหรือสอบถามตัวแทนประกันภัยหรือนายหน้าของคุณ
> คำชี้แจงสำคัญ: ข้อมูลข้างต้นเป็นข้อมูลทั่วไปของผลิตภัณฑ์และบริการของบริษัทฯ หากท่านต้องการทราบรายละเอียด และความคุ้มครองโปรดติดต่อนายหน้าประกันภัย หรือ ตัวแทนของบริษัท เคดับบลิวไอ ประกันภัย

Source: https://www.kwii.com/TH/personal_product/cancer_care, identically at
https://www.kwii.com/TH/personal_product/labor_insurance and every other
`/TH/personal_product/…` page. `ข้อมูลข้างต้น` refers to nothing — there is no text above it.

**Regulatory status: reported, NOT verified against an OIC-hosted document.** Press reporting
in 2025 describes นายทะเบียน orders 12/2568 and 28/2568 suspending KWI from writing new
non-life business and requiring a capital injection. Those reports are news outlets and this
file does not cite news outlets. The OIC's own newsroom could not be searched — see the
method note §4 — and **KWI's own site does not publish any such notice**: its `ประกาศ` page
ends at 2022 and its news list carries only shareholder-meeting notices, the most recent
being `การประชุมสามัญผู้ถือหุ้น ประจำปี 2569` (27 July 2026) and
`บริษัท เคดับบลิวไอ ประกันภัย จำกัด(มหาชน) ประกาศการเปลี่ยนแปลงทุนชำระแล้วของบริษัท` (4 August 2025).
So: the company is corporately alive as of mid-2026, and whether it may currently write new
business is **unverified from any permitted source**. It does not matter for this file's
conclusion, because there is no health product either way.

**Verdict: no individual health product, and no product detail of any kind. Out of scope.**

---

## 7. ไอแคร์ ประกันภัย — REJECTED (group health for migrant workers only)

**Identity — and yes, it is a real คปภ.-licensed insurer, not a broker or a TPA.** It is a
public company writing its own policies, including the compulsory motor policy that only a
licensed non-life insurer may issue:

> บริษัท ไอแคร์ ประกันภัย จำกัด (มหาชน) เป็นหนึ่งใน กลุ่มธุรกิจ ของ บริษัท คอมเซเว่น จำกัด (มหาชน)
> บริษัท คอมเซเว่น โฮลดิ้ง จำกัด เป็นหนึ่งในผู้ถือหุ้นของ บริษัท ไอแคร์ ประกันภัย จำกัด (มหาชน)
> บริษัท ไอแคร์ ประกันภัย จำกัด (มหาชน) สำนักงาน ตั้งอยู่ที่ 549/1 ชั้นที่ 1 ถนนสรรพาวุธ แขวงบางนาใต้ เขตบางนา กรุงเทพมหานคร (10260)

Source: https://www.icare-insurance.com/about

Its footer publishes the two filed policy documents and the คปภ.-mandated disclosures:

> กรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ
> กรมธรรม์ประกันภัยสำหรับเช่าซื้อจักรยายนต์
> ฐานะการเงิน
> Service Level Agreement (SLA)

Source: https://www.icare-insurance.com/products (footer)

Domain is **`icare-insurance.com`** — `icare.co.th` does not resolve.

**Products — eight, complete:**

> ประกันเกี่ยวกับทรัพย์สิน (Property)
> ประกันอุบัติเหตุ (Personal Accident)
> ประกันภัยเดินทาง (Travel Accident)
> ประกันความเสี่ยงภัยทุกชนิด (Industrial All Risks)
> ประกันภัยทางทะเลและขนส่ง (Marine)
> กรมธรรม์ประกันภัยรถยนต์ภาคบังคับ (ประกันภัย พรบ.)
> กรมธรรม์ประกันภัยความเสียหายทางการเงินสำหรับสินค้าเช่าซื้อประเภทรถจักรยานยนต์
> ประกันภัยสุขภาพและอุบัติเหตุกลุ่ม แบบพิเศษ สำหรับชาวต่างชาติที่เข้ามาทำงานในประเทศไทย

Source: https://www.icare-insurance.com/products

**Category: group health only.** The eighth product is the only one that is health cover, and
it is a **group** policy for foreign workers. Its published benefits:

> คุ้มครองผลประโยชน์ค่ารักษาพยาบาล อันเนื่องมาจากอุบัติเหตุ และเจ็บป่วย ในฐานะผู้ป่วยใน (IPD)
> คุ้มครองผลประโยชน์ค่ารักษาพยาบาล ในฐานะผู้ป่วยนอก (OPD) อันเนื่องมาจากอุบัติเหตุ และเจ็บป่วย (สูงสุดไม่เกิน 15 ครั้ง) ยกเว้นการแพ้วัคซีน
> คุ้มครองการเสียชีวิต การสูญเสียอวัยวะ สายตา หรือทุพพลภาพถาวรสิ้นเชิง (อบ.1) จากอุบัติเหตุทั่วไป (ไม่รวมการถูกฆาตกรรมหรือถูกทำร้ายร่างกาย และการขับขี่หรือโดยสารรถ จักรยานยนต์)

Source: https://www.icare-insurance.com/products

Real IPD-and-OPD sickness cover — but `ประกันภัยสุขภาพและอุบัติเหตุ**กลุ่ม**`, sold to
employers of migrant workers, with no sum insured, no age bands, no premium and no policy
wording published. This project's scope is individual health, and a group scheme an
individual cannot buy is out of it.

**Verdict: group health only. Out of scope. The nearest thing to a health product in this
batch, and still not one.**

---

## 8. เอไอจี ประกันภัย (ประเทศไทย) — REJECTED (accident, critical illness and cancer; no medical-expense health)

### 8a. The source list was wrong, and this needs saying plainly

The list given for this round contained an entry reading **"เอ็กซ่า ประกันภัย (AIG)"**. That
entry conflates two unrelated companies: **แอกซ่า / AXA**, a French group, and **เอไอจี /
AIG**, an American one. They share no ownership, no licence and no product range.

**AXA is already covered and is out of this file's scope** — see
`round2-insurers-sourcing.md` §2, where AXA Thailand's SmartCare range is documented in full
and rejected for publishing no premium at any age. Nothing about AXA is researched or
restated here.

This file covers **AIG only**.

### 8b. Identity

> บริษัท เอไอจี ประกันภัย (ประเทศไทย) จำกัด (มหาชน)

Source: https://www.aig.co.th/home/about-us

AIG's Thai entity absorbed the local branch of another AIG carrier, and publishes the notice
itself — a licence-relevant fact and the only merger evidence in this batch:

> การรวมกิจการของกลุ่มบริษัท เอไอจี ประเทศไทย
> บริษัท นิวแฮมพ์เชอร์ อินชัวรันส์ สาขาประเทศไทย และ บริษัท เอไอจี ประกันภัย (ประเทศไทย) จำกัด (มหาชน)
> ขอประกาศให้ทราบว่าบริษัทได้ดำเนินการโอนและรับโอนกิจการทั้งหมดเป็นที่เรียบร้อย
> โดย บริษัท เอไอจี ประกันภัย (ประเทศไทย) จำกัด (มหาชน) ได้รับโอนกิจการทั้งหมดจาก บริษัท นิวแฮมพ์เชอร์ อินชัวรันส์ สาขาประเทศไทย เสร็จเรียบร้อยสมบูรณ์
> การโอนและรับโอนกิจการทั้งหมดนี้ดำเนินการเสร็จสิ้น เมื่อวันที่ 1 มีนาคม 2564

Source: https://www.aig.co.th/home/about-us

Live domain `www.aig.co.th`, Thai and English, with an online buy flow for several products.

### 8c. Products — the complete `ประกันอุบัติเหตุและสุขภาพ` shelf

AIG's own `sitemap.xml` enumerates every published page under that category. Seventeen URLs,
all of them, with no editing:

```
/home/risk-solutions/personal/accident-and-health
/home/risk-solutions/personal/accident-and-health/personal-accident
/home/risk-solutions/personal/accident-and-health/personal-accident/icpa
/home/risk-solutions/personal/accident-and-health/personal-accident/ipa-safedrive
/home/risk-solutions/personal/accident-and-health/personal-accident/ipa-value
/home/risk-solutions/personal/accident-and-health/personal-accident/ipa-valueplus
/home/risk-solutions/personal/accident-and-health/personal-accident/ipa-senior
/home/risk-solutions/personal/accident-and-health/personal-accident/ipa-senior/buy
/home/risk-solutions/personal/accident-and-health/personal-accident/ipa-senior/wbuy
/home/risk-solutions/personal/accident-and-health/personal-accident/his-and-her-guard
/home/risk-solutions/personal/accident-and-health/personal-accident/his-and-her-guard/buy
/home/risk-solutions/personal/accident-and-health/personal-accident/ci
/home/risk-solutions/personal/accident-and-health/personal-accident/icancer
/home/risk-solutions/personal/accident-and-health/personal-accident/icpa-family
/home/risk-solutions/personal/accident-and-health/personal-accident/sporty-guard
/home/risk-solutions/personal/accident-and-health/group-personal-accident
/home/risk-solutions/personal/accident-and-health/overseas-student
```

Source: https://www.aig.co.th/sitemap.xml

The category page's own product cards name the four groupings:

> ประกันภัยอุบัติเหตุส่วนบุคคล — ความคุ้มครองอุบัติเหตุส่วนบุคคลที่ครอบคลุม คุ้มค่าสำหรับคุณ และครอบครัว
> ประกันภัยสำหรับศึกษาต่อต่างประเทศ — สำหรับคุณที่ต้องการศึกษาในต่างประเทศ คุ้มครองทั่วโลก ชดเชยการสูญเสียค่าเล่าเรียน บริการช่วยเหลือฉุกเฉินด้วยภาษาไทย 24 ชั่วโมง
> ประกันอุบัติเหตุ พนักงานกลุ่ม — เพื่อพนักงานที่มีค่าของท่าน
> ประกันภัยอุบัติเหตุสำหรับรายย่อย (ไมโครอินชัวรันส์) — ออกแบบมาเป็นพิเศษสำหรับผู้ที่มีข้อจำกัดทางด้านการเงิน เพื่อให้สามารถเข้าถึงการประกันภัยขั้นพื้นฐานได้ ด้วยเบี้ยประกันภัยเพียงหลักร้อย

Source: https://www.aig.co.th/home/risk-solutions/personal/accident-and-health

And the site navigation lists the individual plans:

> ประกันอุบัติเหตุรายเดี่ยว แผน ICPA / แผนขับขี่ปลอดภัย Safe Drive / แผนสุดคุ้ม Value / แผนครอบคลุม Value Plus / แผนผู้สูงอายุ Senior / ประกันภัยโรคร้ายแรง CI / iCancer / Sporty Guard / ประกันอุบัติเหตุกลุ่ม / ศึกษาต่อต่างประเทศ

Source: https://www.aig.co.th/home/risk-solutions/personal/accident-and-health (main menu,
identical on every page of the Thai site)

### 8d. Category, and why this is the batch's most instructive rejection

Every one of the seventeen URLs falls into one of four out-of-scope buckets:

- **PA** — ICPA, ICPA Family, Safe Drive, Value, Value Plus, Senior, His and Her Guard,
  Sporty Guard, group PA, microinsurance;
- **Critical illness (lump sum, not medical expense)** — `ประกันภัยโรคร้ายแรง CI`;
- **Single-disease** — `iCancer`;
- **Travel/study cover** — overseas student.

There is no เหมาจ่าย plan, no IPD annual limit, no room-and-board benefit, no OPD benefit, no
deductible-first health plan, and no page anywhere on `aig.co.th` selling
`ประกันสุขภาพ` as a medical-expense product. AIG Thailand's individual health book, as
published, does not exist.

This matters more than the seven smaller rejections because AIG is a large, well-resourced
carrier with a working online sales funnel and a category literally headed
`ประกันอุบัติเหตุและสุขภาพ`. The สุขภาพ in that heading is doing the work of `ค่ารักษาพยาบาล
จากอุบัติเหตุ` and `โรคร้ายแรง`, not of health insurance. Three of the eight companies in this
batch — ไทยพัฒนา, อินทร, เอไอจี — use health vocabulary on a shelf that sells no health product.

**Verdict: no individual health product. Out of scope.**

---

## 9. Not included and why — this round

| Company (registered Thai name) | Domain | Exists today? | What it actually sells to individuals | Verdict |
|---|---|---|---|---|
| บริษัท ไทยพัฒนาประกันภัย จำกัด (มหาชน) — *Thai Pattana*, not "Thai Paiwat" | thaipat.co.th | Yes | 7 categories, none health; PA plans SILVER–PLATINUM, `ค่ารักษาพยาบาล (ต่ออุบัติเหตุแต่ละครั้ง)` | **PA only.** No health product exists |
| บริษัท ไทยเศรษฐกิจประกันภัย จำกัด (มหาชน) (TSI) | www.tsi.co.th (bare `tsi.co.th` fails TLS) | Yes; **no rename ever** — continuous since 2485 | Two product tiles, both resolving to `ไม่พบข้อมูล` | **Nothing published.** No product detail of any kind |
| บริษัท ไทยไพบูลย์ประกันภัย จำกัด (มหาชน) | thaipaiboon.com | Yes; **no merger**; a ไทยประกันชีวิต group company | TPB TRAVEL ACCIDENT, TPB PA HIGH SUM, TPB PA U SMILE, government group PA | **PA/travel only.** Group's health writer is ไทยประกันสุขภาพ |
| บริษัท ไอโออิ กรุงเทพ ประกันภัย จำกัด (มหาชน) | **aioibkkins.co.th** (`aioibkk.co.th` does not resolve) | Yes | One product in `อุบัติเหตุและสุขภาพ`: Buddy PA Plan, benefits published only as PNG | **PA only** |
| บริษัท อินทรประกันภัย จำกัด (มหาชน) — *อินทร*, not "อินทรา" | indara.co.th | Yes; brand IN-SURE, ไทยกรุ๊ปโฮลดิ้งส์ | PA Protect, PA สบายใจ, ไข้เลือดออก, 3× cancer | **PA + single-disease only** |
| บริษัท เคดับบลิวไอ ประกันภัย จำกัด (มหาชน) | **kwii.com** (`kwi.co.th` is an unrelated machinery firm) | Yes, corporately; new-business status unverified from any OIC-hosted source | Migrant-worker, home, PA, cancer, gender-cancer, motor, pleasure craft — every page empty of detail | **No health, no detail** |
| บริษัท ไอแคร์ ประกันภัย จำกัด (มหาชน) | **icare-insurance.com** (`icare.co.th` does not resolve) | Yes — a real licensed insurer, Com7 group, not a broker or TPA | 8 products; the only health one is `ประกันภัยสุขภาพและอุบัติเหตุ**กลุ่ม**` for migrant workers | **Group health only** |
| บริษัท เอไอจี ประกันภัย (ประเทศไทย) จำกัด (มหาชน) | aig.co.th | Yes; absorbed นิวแฮมพ์เชอร์ อินชัวรันส์ สาขาประเทศไทย on 1 มี.ค. 2564 | 17 published URLs under `ประกันอุบัติเหตุและสุขภาพ`: PA ×10, CI ×1, cancer ×1, travel/study ×1, group ×1 | **PA + CI + single-disease only** |
| แอกซ่า / AXA | — | — | — | **Not in scope here.** The source list's "เอ็กซ่า ประกันภัย (AIG)" conflated AXA with AIG; AXA is documented in `round2-insurers-sourcing.md` §2 |

---

## 10. NOT FOUND / does not exist publicly

Stated per the schema fields a record would need. For all eight companies, **every one of the
following does not exist publicly**, because the antecedent product does not exist:

- **A full age-band premium table** — not published by any of the eight, for any individual
  health product, at any age. Nothing was estimated or interpolated.
- **A partial premium sample for individual health** — likewise none. The only age-linked
  prices found in this batch are for accident cover: ไทยพัฒนา's five flat PA prices
  (240 / 380 / 450 / 720 / 1,200 บาท, `อายุระหว่าง 10-60 ปี`,
  https://thaipat.co.th/th/products/personal-accident/) and Aioi's two PA bands
  (1,650 / 2,400 and 2,000 / 3,000 without medical; 2,700 / 3,500 and 3,200 / 4,200 with,
  https://cms.aioibkkins.co.th/images/Product/Accident/Table-Buddy-PA-Plan.png). Neither is
  health cover and neither belongs in `data/plans/`.
- **A live premium calculator on an insurer domain** — none of the eight has one for health.
  `aig.co.th` has `/buy` endpoints, but only for `ipa-senior` and `his-and-her-guard`, both
  personal accident (https://www.aig.co.th/sitemap.xml). `einsurance.aioibkkins.co.th` and
  `cmionline.aioibkkins.co.th` sell motor and compulsory motor only. Indara's `buyOnline`
  fields exist in its CMS API but on motor, travel, PA and cancer records only. **There was
  no calculator to sweep in this batch**, which is why this file contains none of the
  endpoint-sweeping that `standalone-health-sourcing.md` used for Dhipaya and Viriyah.
- **Filed policy wording (กรมธรรม์ / เอกสารสรุปสาระสำคัญ) for a health product** — none. The
  only filed documents published by anyone in this batch are iCare's two motor wordings
  (`กรมธรรม์ประกันภัยคุ้มครองผู้ประสบภัยจากรถ`, `กรมธรรม์ประกันภัยสำหรับเช่าซื้อจักรยายนต์`,
  https://www.icare-insurance.com/products) and ไทยไพบูลย์'s
  `https://api.thaipaiboon.com/api/pdf/policy_egs1.pdf`. Neither company files a health
  wording.
- **IPD limit and its basis, OPD, room and board, deductible, copay, copay-on-renewal, entry
  ages, renewal ceiling, New Health Standard (มาตรฐานประกันสุขภาพแบบใหม่ 2564) compliance** —
  all absent for all eight, because no product carries them. The phrase
  `มาตรฐานประกันสุขภาพแบบใหม่` and the `หมวดที่ 1`–`หมวดที่ 13` category scheme it is built on
  appear on none of the eight domains. The single exception in the whole batch is iCare's
  group migrant-worker policy, which does publish IPD and OPD *as concepts*
  (`ในฐานะผู้ป่วยใน (IPD)`, `ในฐานะผู้ป่วยนอก (OPD) … สูงสุดไม่เกิน 15 ครั้ง`) but attaches no
  figure to either, and is a group product regardless.

Pages checked and found to contain no individual health product, in full:

- https://thaipat.co.th/th/ , /th/products/personal-accident/ , /th/products/miscellaneous/
  (product menu enumerated in §1; the other five categories are car, fire, marine, bail bond,
  drone)
- https://www.tsi.co.th/ , https://www.tsi.co.th/about_us/history ; `https://www.tsi.co.th/products` → 404
- https://thaipaiboon.com/ and its own navigation tree in `/_nuxt/12a1e95.js` ;
  `https://api.thaipaiboon.com/api/products` → `Cannot GET /api/products`
- https://www.aioibkkins.co.th/th , /th/products (renders nothing) ;
  https://cms.aioibkkins.co.th/Product/Accident , /Product/Motor , /Product/Fire ,
  /Product/Transportation , /Product/Miscellaneous
- https://www.indara.co.th/products/accident-insurance , /customer-group/personal ,
  /products/other-insurance , plus the complete CMS catalogue at
  `https://api.indara.co.th/cms-api/website/products/active`
- https://www.kwii.com/TH/home , /TH/history , /TH/announcement ,
  /TH/personal_product/cancer_care , /TH/personal_product/labor_insurance
- https://www.icare-insurance.com/products , /about
- https://www.aig.co.th/home , /home/about-us ,
  /home/risk-solutions/personal/accident-and-health , and the 17 URLs enumerated from
  https://www.aig.co.th/sitemap.xml

---

## 11. What this round changes, and what is worth re-checking

1. **The Thai non-life health market is smaller than the company count suggests.** Of the
   fifty-odd licensed non-life insurers, this batch of eight — chosen precisely because they
   were absent from the dataset — yielded zero. Combined with the earlier files, the working
   conclusion is that individual health from a non-life insurer is written by a short list
   (ทิพย, วิริยะ, กรุงเทพประกันภัย, ไทยประกันสุขภาพ, แอกซ่า, and the Chubb/Bupa successors named
   in `standalone-health-sourcing.md` §5) and that the long tail sells motor, fire, PA and
   cancer. Absence from the dataset is not evidence of an unmined source.
2. **`ประกันสุขภาพ` in a category label means nothing.** Four of the eight file their PA
   products under a heading containing สุขภาพ — ไทยไพบูลย์
   (`ประกันภัยสุขภาพและอุบัติเหตุ`), ไอโออิ (`อุบัติเหตุและสุขภาพ`), อินทร
   (`ประกันภัยอุบัติเหตุและสุขภาพ`), เอไอจี (`ประกันอุบัติเหตุและสุขภาพ`) — and none of the four
   sells a health plan. Any future screening pass should test the *benefit schedule* for a
   sickness-triggered IPD benefit, never the category name. The single fastest test found in
   this pass: if the medical-expense row reads `ต่ออุบัติเหตุแต่ละครั้ง` or `ค่ารักษาพยาบาล/ต่อครั้ง`,
   it is accident cover and the screen is over.
3. **Two insurers publish an illness promise above an accident-only schedule.** ไทยพัฒนา's
   `เมื่อท่านต้องรักษาตัวจากการบาดเจ็บหรือป่วยไข้` and อินทร's `คุ้มครองทุกการเจ็บป่วย` sit at the top
   of pages selling nothing of the sort. This is the same brochure-versus-contract gap
   `CONTRIBUTING.md` §"The one rule" was written for, appearing on the insurer's own site
   rather than an agent's. **This is the single most useful thing found in this pass** — not
   because it produces a record, but because it is direct evidence that the gap this project
   exists to close is being opened by insurers themselves, in Thai, on first-party domains.
4. **Three identity corrections that will otherwise waste someone's afternoon.**
   `kwi.co.th` is a food-machinery company, not KWI Insurance (`kwii.com`). `aioibkk.co.th`
   does not resolve (`aioibkkins.co.th`). `icare.co.th` does not resolve
   (`icare-insurance.com`). And the romanisation is **Thai Pattana**, the spelling is
   **อินทร** without ◌า, and **AIG is not AXA**.
5. **Worth re-checking later, in this order.** (a) **iCare** — it already writes real IPD/OPD
   sickness cover, has a Com7 retail distribution channel behind it, and is the only company
   in this batch one step away from a retail health product. (b) **AIG** — the largest
   carrier here, with a working online sales funnel and no health plan on it; if AIG Thailand
   ever launches one it will arrive with published terms. (c) **อินทร** — under ไทยกรุ๊ปโฮลดิ้งส์
   alongside a life insurer, the group structure that most often produces a health product.
   The other five need no revisit: ไทยพัฒนา, TSI and ไอโออิ are motor-and-PA houses,
   ไทยไพบูลย์'s group health book is written by ไทยประกันสุขภาพ and is already sourced, and KWI
   publishes no product detail at all.
6. **The gap this pass could not close.** The คปภ. company register is not machine-readable
   without credentials (method note §4). Licence status here rests on each insurer's own
   mandated disclosures, which is adequate for "does this company exist and trade" but not
   for "may it write new business today" — the exact question outstanding on KWI. If anyone
   obtains a route into `smart.oic.or.th` or the OIC newsroom, that is the one factual hole
   in this file.
