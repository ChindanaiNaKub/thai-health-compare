# Round 3 sourcing: four smaller Thai life insurers — ทิพยประกันชีวิต, ที ไลฟ์, ซัมซุง, ฟินันซ่า

Research date: 2026-08-10. Same rules as the other files in this directory: every claim is
followed by the verbatim Thai it rests on and the exact URL that Thai lives on. Only
insurer-owned domains, insurer-hosted documents, and คปภ./OIC documents were used. No
agent, broker, comparison site, hospital or blog is cited for anything, premiums included.

**Outcome: all four licences still exist, but only one of the four companies sells
individual medical-expense health cover at all, and it publishes no price.** ซัมซุง
ประกันชีวิต has a full health rider range with complete published benefit tables, complete
host-policy gating tables and the most quantified copay-on-renewal disclosure found so far
— and not one baht of premium at any age. ทิพยประกันชีวิต and ที ไลฟ์ ประกันชีวิต do not
sell individual health insurance at all: their entire published product lists contain no
medical-expense product. ฟินันซ่าประกันชีวิต no longer exists under that name — it is
today ฟิลลิปประกันชีวิต, and the Ministry of Finance order that ended its period of
regulatory control is quoted below.

**Zero records can be added from this round.** Three of the four sections are negative
findings. That is the point of writing them down: the next person does not repeat the work.

## Method note

1. **Two of the four insurers' identities had to be established before anything else**, and
   the คปภ. consumer-facing registry could not do it. `https://www.oic.or.th/th/consumer/insurance/companies/life/list`
   is a Nuxt single-page app that renders nothing without JavaScript; `curl` and WebFetch
   both return a 2 KB shell whose only text is `สำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย`.
   `https://smart.oic.or.th/eservice/Menu12` returns literally `JavaScript is required`.
   `https://www.oic.or.th/api/...` returns `{"status":401,...,"hint":"Missing \"Authorization\" header"}`.
   The OIC's own policy-form registry at `https://oiceservice.oic.or.th/insurancelife.php`
   does load as plain HTML, but its `<select name="companyid">` ships **empty** —
   `<option value="">-- เลือกบริษัททั้งหมด --</option>` and nothing else — and a POST to
   `insurancelife.php?action=search` returns an empty result table. The backing data source
   is down or gated.

   What worked instead is a static OIC PDF: **ดัชนีตารางรหัสอ้างอิงมาตรฐาน ของบริษัทประกันภัย**,
   `https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337`
   (58 pages, footer `20200625_รหัสมาตรฐาน_บริษัทประกันภัย.doc`, cover dated `มิถุนายน 2563 / June 2020`).
   It is the OIC's own company-code register and it names every licensed insurer. **It is
   dated June 2020**, so it proves a licence existed then under a given name; it cannot prove
   a name is current. Where the insurer's own site today shows a different registered name
   than this table, that gap is reported rather than reconciled.

2. **Samsung publishes its benefit tables as JPEG images, not HTML and not PDF.** Every
   Samsung figure below was read off the image files named in each section. There is no text
   layer to `curl`, so these numbers cannot be re-checked with view-source — they must be
   re-checked by opening the image. Where the image uses a merged cell that spans several
   plan columns, the value **cannot** be assigned to a specific plan and is reported as
   ambiguous rather than guessed. Three such cells exist and all three are flagged.

3. **ทิพยประกันชีวิต and ที ไลฟ์ product lists were read from the sites' own data layers**,
   not from marketing pages: TIPlife's Django API at `https://www.tiplife.com/backend/api/products/`
   returns the complete product array as JSON, and T Life is a WordPress site whose page
   list came from `https://www.tlife.co.th/wp-json/`. Both are the sites' own machine
   output, so "the list contains no health product" is a statement about the insurer's
   published catalogue, not about what a menu happened to show.

4. **`finansalife.com` still resolves and still 403s.** Cloudflare blocks both a browser
   User-Agent `curl` and WebFetch (`Cloudflare Ray ID: a2904d952c0a1d37`,
   `Sorry, you have been blocked / You are unable to access finansalife.com`). Nothing about
   Finansa below rests on that domain; it rests on the successor's own history page and on a
   Ministry of Finance order published by คปภ.

5. **The two คปภ. orders about Finansa are scanned images with no text layer.**
   `pdftotext -layout` returns nothing at all from them. They were read visually, and the
   Thai below is transcribed from the scan, including its Thai numerals.

---

## 1. บริษัท ทิพยประกันชีวิต จำกัด (มหาชน) — Dhipaya Life

### 1a. It exists, and it is NOT the ทิพยประกันภัย already in this dataset

The brief's warning is correct and the distinction is documented on both sides.

**In the OIC register the two are separate rows in separate sections.** Life insurers:

> 1011　บริษัท ทิพยประกันชีวิต จำกัด (มหาชน)　Dhipaya Life Assurance Public Company Limited　DHIPAYA

Non-life insurers:

> 2051　บริษัท ทิพยประกันภัย จำกัด (มหาชน)　Dhipaya Insurance Public Co., Ltd.　DHP

https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337

Different code block (1xxx = ประกันชีวิต, 2xxx = ประกันวินาศภัย), different registered name,
different licence. `standalone-health-sourcing.md` §1 covers **2051**. This section covers
**1011**. They share a brand and a building and nothing else that matters here.

The shared building is on the record, in Dhipaya Life's own footer:

> 63/2 อาคาร บริษัท ทิพยประกันภัย จำกัด (มหาชน) ชั้น 1,3,4,5 และ 6 ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310

https://www.tiplife.com/

A life insurer that gives its own address as *the other company's office block* is exactly
how these two get confused. Note it is the tenant, not the owner.

### 1b. The live domain is tiplife.com, not dhipayalife.co.th

`https://www.dhipayalife.co.th/` returns HTTP 200 only after a redirect chain that ends at
`https://www.TIPlife.com/`. Both names are still in service — the agent portal is on the old
one (`https://iservice.dhipayalife.co.th/AgentLogin/Login`), the customer site on the new one
(`https://iservice.tiplife.com/customer`). Copyright line, verbatim:

> © สงวนลิขสิทธิ์ 2566 บริษัท ทิพยประกันชีวิต จำกัด (มหาชน)

https://www.tiplife.com/

Small trap for anyone searching: the site's own `<title>` spells the brand with a ์ that the
registered name does not have —

> หน้าหลัก | TIPlife ทิพย์ประกันชีวิต

— while the footer and the OIC register both write `ทิพยประกันชีวิต`. Search on the wrong one
and you will conclude the company does not exist.

### 1c. Corporate history, from the insurer's own page

> บริษัท ไชน่ายูเนี่ยนไลฟ์ อินชัวรันส์ จำกัด (CUL) ก่อตั้งขึ้นเมื่อปี 2467 ในประเทศฮ่องกง โดยนักธุรกิจชาวอังกฤษและชาวจีน ดำเนินการทั้งด้านธุรกิจประกันภัย และประกันชีวิต และต่อมาจึงได้เปิดสาขาเพิ่มขึ้นในภูมิภาคเอเชียตะวันออกเฉียงใต้

> เมื่อวันที่ 23 มิถุนายน 2473 บริษัท ไชน่ายูเนี่ยนไลฟ์ อินชัวรันส์ จำกัด (CUL) ได้รับใบอนุญาตให้ประกอบธุรกิจภายในราชอาณาจักร หลังจากได้มีการตราพระราชบัญญัติ ควบคุมการค้าขาย อันกระทบกระเทือนถึงความปลอดภัยหรือความผาสุกแห่งสาธารณชน พุทธศักราช 2472

> เมื่อวันที่ 12 พฤษภาคม 2531 บริษัทฯ ได้เปลี่ยนชื่อบริษัทเป็น บริษัท สยามประกันชีวิต จำกัด

> บริษัทฯ ได้เพิ่มทุนจดทะเบียนบริษัทเป็น 444 ล้านบาท และได้มีการเปลี่ยนแปลงครั้งสำคัญ โดยมีการจดทะเบียนเปลี่ยนชื่อจาก บริษัท สยามประกันชีวิต จำกัด มาเป็น บริษัท ทิพยประกันชีวิต จำกัด โดยมีผู้บริหารรุ่นใหม่ที่มากด้วยประสบการณ์เข้ามาบริหารงาน

> เมื่อวันที่ 9 มกราคม 2556 บริษัทฯได้ดำเนินการจดทะเบียนแปรสภาพเป็นบริษัทมหาชนจำกัด ต่อกรมพัฒนาธุรกิจการค้า กระทรวงพาณิชย์ โดยใช้ชื่อ บริษัท ทิพยประกัน ชีวิต จำกัด (มหาชน)

https://www.tiplife.com/about/history

So the licence chain is China Union Life (1930) → สยามประกันชีวิต (1988) → ทิพยประกันชีวิต →
public company (2013). At no point is it a spin-off of ทิพยประกันภัย.

### 1d. a) Product names — and there is no health product among them

TIPlife's own product API returns the complete catalogue as JSON. Eighteen products, in full:

> ตะกาฟุล คุ้มครองโรคมะเร็ง · ไอชิลด์ แอล 90/5, 90/10, 90/20 · บำนาญมั่นคง 90/5, 90/60 · มรดกสุขใจ 90/2 · บำนาญ 85/1, 85/60 · บำนาญ 90/5, 90/60 · เพื่อการศึกษา 20/10 · บำนาญ มั่นคง 90/65 · ตะกาฟุล สะสมทรัพย์ 10/3 · ตะกะฟุล บำนาญ 90/2 · สะสมทรัพย์ 15/5 · TIPlife Smart Cancer · ซีเนียร์ 90/90 (เพื่อผู้สูงอายุ) · ตลอดชีพ 90/5, 90/10 · TIPlife Smart Pension 90/2 · สะสมทรัพย์ 25/15 · สะสมทรัพย์ 20/10 · TIPlife Smart Saving 10/3

https://www.tiplife.com/backend/api/products/

The strings `ค่ารักษาพยาบาล`, `ผู้ป่วยใน`, `ค่าห้อง` and `H&S` appear **zero** times in that
entire JSON document. The only two products that touch illness are cancer lump-sum products
(`ตรวจพบมะเร็ง จ่ายทันทีสูงสุด 1,000,000 บาท`), which are critical-illness cover, not
medical-expense cover.

The navigation is what misleads. TIPlife's own menu data labels one category:

> {"id":3,"title_th":"โรคร้ายแรงและสุขภาพ","title_en":"Critical illness","color":"#000000","link_url":"/product?cat=3","slug":"3"}

https://www.tiplife.com/product (category object embedded in the page's own Next.js payload)

The Thai says "critical illness **and health**". The English label on the same object says
only "Critical illness", and the products behind it are cancer plans. **The word สุขภาพ in
that menu is not backed by a health product.** Anyone who searches this insurer by menu label
will think it sells health insurance; anyone who reads its catalogue will find it does not.

Its online sales channel says the same thing with three products:

> Products แบบประกันออนไลน์ · TIPlife Smart Cancer ประกันชีวิตคุ้มครองโรคมะเร็ง · ประกันชีวิตแบบบำนาญ TIPlife Smart Pension 90/2 · ประกันชีวิตแบบสะสมทรัพย์ TIPlife Smart Saving 10/3

https://sales.dhipayalife.co.th/Products/NXw3MDAwMDAwMDA1

### 1e. b)–e) — not applicable, and why that is a finding not a gap

There is no rider, no host policy question, no premium table, no filed wording, no IPD limit,
no OPD, no room rate, no deductible, no copay clause and no New Health Standard statement,
**because there is no health product to have them.** Places checked, all returning nothing:
`/product`, `/product?cat=3`, `/product/brochure` (its brochure list contains only takaful,
annuity, endowment and pension PDFs), `/product-indexlink` (one entry, an index-linked
endowment), the products API above, and the online sales site.

The one health-adjacent thing TIPlife does publish is a service page for policyholders,
`/service/hospital-health` (`กรณีตรวจสุขภาพก่อนทำประกัน`) — pre-underwriting medical exams,
which every life insurer has.

### 1f. f) VERDICT

**No record. Not "blocked by a missing field" — out of scope entirely.** ทิพยประกันชีวิต does
not write individual medical-expense health insurance. The correct disposal is the same as
Cigna/Aetna in `standalone-health-sourcing.md` §5: documented, closed, not retried.

---

## 2. บริษัท ที ไลฟ์ ประกันชีวิต จำกัด (มหาชน) — T Life Assurance

### 2a. Identity: it is the former ประกันชีวิตนครหลวงไทย, and it is NOT ไทยประกันชีวิต and NOT ไทยคาร์ดิฟ

The brief flagged two candidate identities. Both are wrong, and T Life's own history page
settles it:

> จากปี 2540 จนถึงปัจจุบัน เป็นเวลากว่า 2 ทศวรรษที่ลูกค้านับแสนรายทั่วประเทศของเราได้รับความอบอุ่นใจอย่างต่อเนื่องจากทีมงานมืออาชีพที่ให้การดูแลเอาใจใส่ใกล้ชิดมากกว่า จากวันเริ่มต้นกับ ศรีนครประกันชีวิต และพัฒนามาเป็น แมกซ์ประกันชีวิต นครหลวงไทยประกันชีวิต ที ไลฟ์ ประกันชีวิต ตามลำดับ และมาเป็น ที ไลฟ์ ประกันชีวิต ในปัจจุบัน

https://www.tlife.co.th/about-us

So the chain is **ศรีนครประกันชีวิต → แมกซ์ประกันชีวิต → นครหลวงไทยประกันชีวิต → ที ไลฟ์ ประกันชีวิต**.
Ownership, same page:

> บริษัท ที ไลฟ์ ประกันชีวิต จำกัด (มหาชน) หรือ T Life มี บริษัท ทุนธนชาต จำกัด (มหาชน) หรือ TCAP เป็นผู้ถือหุ้นใหญ่ร้อยละ 99.99

The OIC register confirms the predecessor licence and, critically, shows that the three
companies the brief could have confused are **four separate rows**:

> 1017　บริษัท ประกันชีวิตนครหลวงไทย จำกัด (มหาชน)　Siam City Life Assurance Public Company Limited　SIAM CITY LIFE ASSUR
> 1001　บริษัท ไทยประกันชีวิต จำกัด (มหาชน)　Thai Life Insurance Public Company Limited　TLI
> 1018　บริษัท ไทยคาร์ดิฟ ประกันชีวิต จำกัด (มหาชน)　Thai Cardif Assurance Public Company Limited　Thai Cardif
> 1020　บริษัท ธนชาตประกันชีวิต จำกัด (มหาชน)　Thanachart Life Assurance Public Company Limited　ZNLA

https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337

**T Life is 1017, not 1001 and not 1018.** `round2-insurers-sourcing.md` §4 covers 1001
(ไทยประกันชีวิต) — a completely different, much larger company. Note also that ธนชาตประกันชีวิต
(1020) is a *fourth* company and not T Life either, despite the shared TCAP parentage; do not
merge them.

Registered office, from the site's own footer:

> บริษัท ที ไลฟ์ ประกันชีวิต จำกัด (มหาชน) เลขที่ 59/5 อาคารพาราไดซ์ เพลส ชั้น 4 แขวง หนองบอน เขต ประเวศ กรุงเทพ 10250

https://www.tlife.co.th/

Live domain: `https://www.tlife.co.th/`, HTTP 200, title `ที ไลฟ์ ประกันชีวิต | T Life Assurance`.

### 2b. a) Products — six categories, none of them health

T Life's own product menu, verbatim, in full:

> ผลิตภัณฑ์ ลูกค้าบุคคล คุ้มครองชีวิต – แบบประกันให้ความคุ้มครองสูง / ออมทรัพย์ – แบบประกันให้ผลตอบแทนสูง / ลดหย่อนภาษี – แบบประกันช่วยลดหย่อนภาษี / ประกันโรคร้ายแรง – แบบประกันคุ้มครองโรคร้ายแรง
> ลูกค้าองค์กร แบบประกันสวัสดิการพนักงาน / แบบประกันคุ้มครองสินเชื่อกลุ่ม

https://www.tlife.co.th/

The nearest thing to health cover is the critical-illness page, which lists three products
and prices none of them:

> ประกันคุ้มครองโรคร้ายแรง
> CANCER PROTECTION — ไม่ต้องรอ! ประกันโรคมะเร็ง เจอ จ่าย จบ ช่วยคุณหายห่วง เรื่องค่ารักษา
> TERM LIFE (SMART CI CARE)* — คุ้มครองชีวิตและโรคร้ายแรง 6 กลุ่มโรค ครอบคลุม 30 โรคร้ายแรง
> SMART CI CARE* — สัญญาเพิ่มเติมการประกันภัยโรคร้ายแรง 30 โรค คุ้มครอง 6 กลุ่มโรค ครอบคลุม 30 โรคร้ายแรง

https://www.tlife.co.th/critical-illness-protection

`เจอ จ่าย จบ` is a lump-sum-on-diagnosis product. It reimburses no hospital bill and belongs
in no comparison of medical-expense plans.

The life/protection page confirms the rest of the individual range is life, MRTA and PA:

> ประกันสินเชื่อเพื่อประชาชน (IMRTA) · TERM LIFE · แบบประกันอุบัติเหตุส่วนบุคคล (IPA)

https://www.tlife.co.th/protection

### 2c. The negative was checked mechanically, not by eye

Across `https://www.tlife.co.th/` and its `/about-us`, `/protection`,
`/critical-illness-protection`, `/data-disclosure`, `/download-section` and
`/hospitals-clinic` pages, the strings `ค่ารักษาพยาบาล`, `ผู้ป่วยใน`, `ค่าห้อง`,
`ประกันสุขภาพ` and `H&S` occur **zero** times. T Life maintains a contracted-hospital list
(`https://www.tlife.co.th/hospitals-clinic`) — but a contracted-hospital list serves group
staff-benefit policies and CI claims, and no individual health product on the site points to
it.

### 2d. b)–e) — not applicable

No individual health product, therefore no rider/host question, no premium, no wording, no
limits, no copay, no New Health Standard statement.

### 2e. f) VERDICT

**No record. Out of scope entirely, same disposal as §1.** The useful output of this section
is the identity chain: anyone who later sees "T Life" in a Thai insurance list should read it
as **the former นครหลวงไทยประกันชีวิต under TCAP**, and must not attach it to ไทยประกันชีวิต's
three Health Fit riders in `round2-insurers-sourcing.md` §4.

---

## 3. บริษัท ซัมซุง ประกันชีวิต (ประเทศไทย) จำกัด (มหาชน) — Samsung Life Insurance (Thailand)

**This is the only one of the four that sells health insurance, and it is the best-documented
priceless insurer this project has found.** Benefit tables complete to the last หมวด, host
gating tables published, copay mechanism quantified with an effective date — and no premium
anywhere, at any age, for any plan.

### 3a. Identity, and a name discrepancy that has to be stated

The company's own current registered name, from every page footer:

> สงวนลิขสิทธิ์ Copyright 2026 © บริษัท ซัมซุง ประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)
> 989 อาคารคิงบริดจ์ ทาวเวอร์ ชั้น 18-19 ห้องเลขที่ 1800-1900 ถนนพระราม 3 แขวงบางโพงพาง เขตยานนาวา กรุงเทพมหานคร 10120

https://samsunglife.co.th/

The OIC register (June 2020) names the licence differently:

> 1021　บริษัท ไทยซัมซุง ประกันชีวิต จำกัด (มหาชน)　Thai Samsung Life Insurance Public Company Limited　TSLI

https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337

**`ไทยซัมซุง ประกันชีวิต` in 2020, `ซัมซุง ประกันชีวิต (ประเทศไทย)` on the company's own site
in 2026.** That is a registered-name change between those two dates. **I could not find a
คปภ. document announcing it** — Samsung's own site carries no announcement either (a
WordPress search for `เปลี่ยนชื่อ` on samsunglife.co.th returns only its privacy policy), and
the OIC registry pages that would carry it do not render (see method note 1). A record for
this insurer should carry the name the insurer uses today and note that the regulator
document available is older and says `ไทยซัมซุง`.

Financial self-description, same site:

> ปัจจุบันเพิ่มทุนจดทะเบียนเป็น 3,200 ล้านบาท โดยมีมูลค่าสินทรัพย์รวม 30,900 ล้านบาท และมีอัตราส่วนความเพียงพอของเงินกองทุนสูงถึง 574%

https://samsunglife.co.th/

Live domain: `https://samsunglife.co.th/` (the `www.` form redirects to the bare host).

### 3b. a) Product names in Thai, with URLs

Five individual health products plus two packaged versions:

| Product | URL |
|---|---|
| สัญญาเพิ่มเติมการประกันภัยสุขภาพ H&S ไพรม์ | https://samsunglife.co.th/rider-protection-hs-prime/ |
| สัญญาเพิ่มเติมการประกันภัยสุขภาพ H&S พลัส (H&S ไลท์, H&S อัลตร้า และ H&S อัลตร้า แบบมีค่าใช้จ่ายส่วนแรก) | https://samsunglife.co.th/rider-hs-plus/ |
| สัญญาเพิ่มเติมการประกันภัยสุขภาพ H&S (แบบมาตรฐาน) | https://samsunglife.co.th/product-protection-h-s/ |
| สัญญาเพิ่มเติมการประกันภัยสุขภาพ H&S_D (แบบมาตรฐาน) | https://samsunglife.co.th/product-protection-h-s-d/ |
| บันทึกสลักหลัง คุ้มครองค่ารักษาพยาบาลผู้ป่วยนอก (OPD) | https://samsunglife.co.th/product-protection-opd/ |
| แผนประกันคุ้มครองสุขภาพ ตลอดชีพ 99/20 H&S ไพรม์ | https://samsunglife.co.th/product-wholelife-99-20-prime/ |
| ตลอดชีพ 99/20 H&S พลัส | https://samsunglife.co.th/product-wholelife-99-20-hsplus/ |

The last two are the packaged form — a whole-life host with the rider pre-attached. Samsung
states the marketing-name/filed-name split itself:

> – ตลอดชีพ 99/20 H&S ไพรม์ เป็นชื่อทางการตลาด ชื่อของแบบประกันภัยที่ปรากฎในกรมธรรม์ คือ ตลอดชีพ 99/20 (ชนิดไม่มีส่วนรวมในเงินปันผล)

https://samsunglife.co.th/product-wholelife-99-20-prime/

Same failure mode as ไทยประกันชีวิต Health Fit Ultra in `round2-insurers-sourcing.md` §4.2:
the name on the shelf is not the name in the contract.

### 3c. b) Rider or standalone — rider, and the host requirement is unusually well documented

All five are riders. Verbatim, from the H&S ไพรม์ conditions block:

> ต้องซื้อแนบสัญญาหลักตามที่บริษัทฯ กำหนด
> ให้ความคุ้มครองถึงอายุ 99 ปี หรือสิ้นสุดความคุ้มครองของสัญญาหลัก แล้วแต่เวลาใดจะถึงก่อน

https://samsunglife.co.th/rider-protection-hs-prime/

For H&S พลัส the host constraint is looser:

> ซื้อแบบประกันภัยหลักได้ทุกแบบ หรือแนบกับแบบประกันภัยตามที่บริษัทฯ กำหนด ยกเว้นแบบประกันภัยที่ไม่ให้ซื้อสัญญาเพิ่มเติมใด ๆ ได้

https://samsunglife.co.th/rider-hs-plus/

**A published host minimum sum insured exists — for the packaged product only:**

> จำนวนเงินเอาประกันภัยของสัญญาหลักขั้นต่ำ 50,000 บาท แต่สามารถแนบความคุ้มครองค่ารักษาพยาบาลได้สูงมาก

and, as a two-row table on the same page:

| งวดการชำระเบี้ย | จำนวนเงินเอาประกันภัยขั้นต่ำของสัญญาหลัก (บาท) |
|---|---|
| รายปี | 50,000 |
| ไม่ใช่รายปี | 100,000 |

https://samsunglife.co.th/product-wholelife-99-20-prime/

The same page states the package cannot be issued without the health rider — the reverse of
the usual dependency:

> ไม่สามารถรับประกันได้ หากไม่มี
> – สัญญาเพิ่มเติมการประกันภัยสุขภาพ H&S ไพรม์ และ/หรือ
> – สัญญาเพิ่มเติมการประกันภัยสุขภาพ H&S ไพรม์ แบบมีค่าใช้จ่ายส่วนแรกอย่างน้อย 1 แบบ หรือซื้อแนบร่วมภายใต้กรมธรรม์เดียวกันได้

**A host minimum *premium* is NOT PUBLISHED.** 50,000 baht is a sum insured, not money. The
schema's `host_policy.premium` needs THB/year and Samsung publishes no rate for
ตลอดชีพ 99/20 at any age either — so the host block would have to carry
`premium: null` with a `premium_unknown_reason`, exactly as AIA does in
`data/plans/aia-health-saver-200k.yaml`, except that AIA at least publishes a 12,000 baht
floor and Samsung publishes nothing.

**What Samsung *does* publish, and nobody else in this dataset does, is the host sum
insured gating the benefit you may buy.** For H&S (แบบมาตรฐาน) and H&S_D (แบบมาตรฐาน),
`ตารางข้อกำหนดการซื้อสัญญาเพิ่มเติม ... ต่อผู้เอาประกันภัย 1 ราย`, in baht:

| จำนวนเงินเอาประกันภัยของแบบประกันภัยหลัก | ค่าห้องสูงสุด ซื้อเป็นอิสระกัน อายุ 1 วัน-5 ปี | อายุ 6-65 ปี | ค่าห้องสูงสุด ซื้อ H&S ร่วมกับ H&S_D อายุ 1 วัน-5 ปี | อายุ 6-65 ปี |
|---|---|---|---|---|
| น้อยกว่า 100,000 | ไม่สามารถซื้อได้ | ไม่สามารถซื้อได้ | ไม่สามารถซื้อได้ | ไม่สามารถซื้อได้ |
| 100,000-299,999 | ไม่สามารถซื้อได้ | 4,000 | ไม่สามารถซื้อได้ | 8,000 |
| 300,000-399,999 | 1,500 | 5,200 | 3,000 | 10,400 |
| 400,000-499,999 | 1,500 | 8,000 | 3,000 | 16,000 |
| 500,000-699,999 | 1,500 | 9,200 | 3,000 | 18,400 |
| 700,000-999,999 | 2,100 | 9,200 | 4,200 | 18,400 |
| 1,000,000-2,999,999 | 2,100 | 10,400 | 4,200 | 20,800 |
| มากกว่าหรือเท่ากับ 3,000,000 | 3,400 | 10,400 | 6,800 | 20,800 |

Image: https://samsunglife.co.th/wp-content/uploads/2022/07/HS-แบบมาตรฐาน-2.jpg
(linked from https://samsunglife.co.th/product-protection-h-s/)

And for H&S L / H&S U / H&S U_D:

| จำนวนเงินเอาประกันภัยของแบบประกันภัยหลัก | H&S L 1 วัน-5 ปี | H&S L 6-10 ปี | H&S L 11-65 ปี | H&S U/U_D 1 วัน-5 ปี | H&S U/U_D 6-10 ปี | H&S U/U_D 11-65 ปี |
|---|---|---|---|---|---|---|
| น้อยกว่า 100,000 | ไม่อยู่ในเกณฑ์รับประกันภัย | ไม่อยู่ในเกณฑ์รับประกันภัย | ไม่สามารถซื้อได้ | ไม่สามารถซื้อได้ | ไม่สามารถซื้อได้ | ไม่สามารถซื้อได้ |
| 100,000-299,999 | ไม่อยู่ในเกณฑ์รับประกันภัย | ไม่อยู่ในเกณฑ์รับประกันภัย | 5,000 | ไม่สามารถซื้อได้ | 3,500 | 5,500 |
| 300,000-499,999 | ไม่อยู่ในเกณฑ์รับประกันภัย | ไม่อยู่ในเกณฑ์รับประกันภัย | 5,000 | 2,500 | 3,500 | 5,500 |
| 500,000-999,999 | ไม่อยู่ในเกณฑ์รับประกันภัย | ไม่อยู่ในเกณฑ์รับประกันภัย | 5,000 | 2,500 | 5,500 | 5,500 |
| มากกว่าหรือเท่ากับ 1,000,000 | ไม่อยู่ในเกณฑ์รับประกันภัย | ไม่อยู่ในเกณฑ์รับประกันภัย | 5,000 | 3,500 | 5,500 | 5,500 |

Image: https://samsunglife.co.th/wp-content/uploads/2023/02/5.jpg
(linked from https://samsunglife.co.th/rider-hs-plus/)

Its footnote is worth keeping because it changes what "sum insured" means:

> *แบบประกันแบบชั่วระยะเวลาให้คำนวณที่ 50% ของจำนวนเงินเอาประกันภัย และเงื่อนไขอื่นเป็นไปตามระเบียบ
> **แบบประกันภัยหลักที่ยังมีผลบังคับอยู่กับบริษัท หมายถึง กรมธรรม์ที่ยังมีผลบังคับอยู่ และยังชำระเบี้ยประกันภัยอยู่กับบริษัทโดยไม่รวมกรมธรรม์ใช้เงินสำเร็จ และการประกันภัยแบบขยายเวลา

**This is the strongest evidence in the whole dataset for why `host_policy` is a mandatory
field.** A buyer who wants the 5,500 room plan cannot get it on a 200,000-baht host; the
health cover you may buy is a function of the life cover you must buy. No other insurer here
publishes that relationship as a table.

### 3d. c) Premium table — NOT PUBLISHED, at any age, for any plan

This is the whole reason nothing can be recorded.

- Not one baht figure appears on any of the seven product pages. The only two premium-related
  strings on the entire H&S พลัส page are structural, not numeric:
  > งวดการชำระเบี้ยประกันภัยรายปี, ราย 6 เดือน, ราย 3 เดือน และรายเดือน
  > เบี้ยประกันภัยปรับตามช่วงอายุและขั้นอาชีพ

  https://samsunglife.co.th/rider-hs-plus/
- **There are no brochure PDFs.** The only PDF linked anywhere on samsunglife.co.th is
  `รายชื่อสำนักงานตัวแทนซัมซุงประกันชีวิต-อัปเดต-31-ก.ค.2569-.pdf`, an agent-office list. The
  download centre at https://samsunglife.co.th/service-download/ carries only claim and
  policy-administration forms (`หนังสือมอบอำนาจ (ติดต่อโรงพยาบาล)`,
  `คำร้องขอเปลี่ยนแปลงและแก้ไขกรมธรรม์`, `หนังสือรับรองสุขภาพ (HC)` …). No rate card, no
  brochure, no wording.
- **There is no premium calculator on Samsung's own domain.** Every `สนใจทำประกัน คลิกที่นี่`
  button on the health pages points at `https://samsunglife.co.th/prospectcontact/`, a
  lead-capture form. Same disposal as AXA in `round2-insurers-sourcing.md` §2b: a number
  obtained by submitting personal details to a sales funnel is a quote, not a publication.
- Samsung does sell online (`ซื้อประกันออนไลน์`) but only ซัมซุง 888 and
  แคนเซอร์ โพรเทค 555 — savings and cancer. **No health product is in the online channel**,
  so there is no checkout to sweep.

### 3e. Benefit tables — PUBLISHED IN FULL, which is the good news

**H&S (แบบมาตรฐาน) and H&S_D (แบบมาตรฐาน)**, twelve plans named by their room rate,
`หน่วย : บาท`, `ต่อการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง`:

| ผลประโยชน์ | 900 | 1500 | 2100 | 2700 | 3400 | 4000 | 4600 | 5200 | 6800 | 8000 | 9200 | 10400 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| หมวด 1 ค่าห้องและค่าอาหาร (สูงสุดไม่เกิน 150 วัน) | 900 | 1,500 | 2,100 | 2,700 | 3,400 | 4,000 | 4,600 | 5,200 | 6,800 | 8,000 | 9,200 | 10,400 |
| หมวด 1 ห้อง ICU (2 เท่า, สูงสุด 15 วัน) | 1,800 | 3,000 | 4,200 | 5,400 | 6,800 | 8,000 | 9,200 | 10,400 | 13,600 | 16,000 | 18,400 | 20,800 |
| หมวด 2 (ย่อย 2.1–2.3) | 10,000 | 14,000 | 18,000 | 22,000 | 26,000 | 30,000 | 34,000 | 37,000 | 52,000 | 60,000 | 68,000 | 74,000 |
| หมวดย่อย 2.4 เวชภัณฑ์กลับบ้าน | 1,000 (ทุกแผน) | | | | | | | | | | | |
| หมวด 3 ค่าแพทย์ตรวจรักษา (สูงสุด 150 วัน) | 400 | 600 | 800 | 900 | 1,000 | 1,000 | 1,000 | 1,200 | 2,000 | 2,000 | 2,000 | 2,400 |
| หมวดย่อย 4.2 ค่ายา/เวชภัณฑ์/อุปกรณ์ผ่าตัด | 4,000 | 5,000 | 6,000 | 7,000 | 8,000 | 9,000 | 10,000 | 10,000 | 16,000 | 18,000 | 20,000 | 20,000 |
| หมวดย่อย 4.3 แพทย์ผ่าตัด (Doctor fee) | 40,000 | 50,000 | 60,000 | 70,000 | 80,000 | 90,000 | 100,000 | 100,000 | 160,000 | 180,000 | 200,000 | 200,000 |
| หมวดย่อย 4.4 วิสัญญีแพทย์ (Doctor fee) | 4,000 | 5,000 | 6,000 | 7,000 | 8,000 | 9,000 | 10,000 | 10,000 | 16,000 | 18,000 | 20,000 | 20,000 |
| หมวดย่อย 6.1 ตรวจวินิจฉัยภายใน 30 วันก่อน/หลัง | 3,500 | 4,000 | 4,000 | 4,000 | 4,000 | 4,000 | 4,000 | 5,000 | 8,000 | 8,000 | 8,000 | 10,000 |
| หมวดย่อย 6.2 ผู้ป่วยนอกต่อเนื่องภายใน 30 วัน | ไม่คุ้มครอง | | | | | | | | | | | |
| หมวด 7 อุบัติเหตุ ผู้ป่วยนอก ภายใน 24 ชั่วโมง | 2,000 | 3,000 | 4,000 | 5,000 | 6,500 | 8,000 | 10,000 | 10,000 | 13,000 | 16,000 | 20,000 | 20,000 |
| หมวด 8 เวชศาสตร์ฟื้นฟู | ไม่คุ้มครอง | | | | | | | | | | | |
| หมวด 9 ล้างไต | ไม่คุ้มครอง | | | | | | | | | | | |
| หมวด 10 รังสีรักษา | ไม่คุ้มครอง | | | | | | | | | | | |
| หมวด 11 เคมีบำบัด | ไม่คุ้มครอง | | | | | | | | | | | |
| หมวด 12 รถพยาบาลฉุกเฉิน | 900 | 1,500 | 2,100 | 2,700 | 3,400 | 4,000 | 4,600 | 5,200 | 6,800 | 8,000 | 9,200 | 10,400 |
| **ผลประโยชน์สูงสุดต่อการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง** | **268,500** | **414,500** | **560,500** | **691,500** | **839,500** | **956,000** | **1,073,000** | **1,205,000** | **1,679,000** | **1,912,000** | **2,146,000** | **2,410,000** |

Images: https://samsunglife.co.th/wp-content/uploads/2022/07/HS-แบบมาตรฐาน-2.jpg and
https://samsunglife.co.th/wp-content/uploads/2022/07/HS-แบบมาตรฐาน-3.jpg
(both from https://samsunglife.co.th/product-protection-h-s/)

**H&S พลัส**, five ไลท์ plans and five อัลตร้า plans:

| ผลประโยชน์ | L 1000 | L 2000 | L 3000 | L 4000 | L 5000 | U 1500 | U 2500 | U 3500 | U 4500 | U 5500 |
|---|---|---|---|---|---|---|---|---|---|---|
| หมวด 1 ค่าห้อง (สูงสุด 150 วัน) | 1,000 | 2,000 | 3,000 | 4,000 | 5,000 | 1,500 | 2,500 | 3,500 | 4,500 | 5,500 |
| หมวด 1 ICU (2 เท่า, สูงสุด 15 วัน) | 2,000 | 4,000 | 6,000 | 8,000 | 10,000 | 3,000 | 5,000 | 7,000 | 9,000 | 11,000 |
| หมวด 2 (ย่อย 2.1–2.3) | 10,000 | 20,000 | 25,000 | 30,000 | 40,000 | 20,000 | 25,000 | 35,000 | 45,000 | 55,000 |
| หมวดย่อย 2.4 | 1,000 บาท รวมอยู่ในผลประโยชน์ในหมวดย่อยที่ 2.1-2.3 | | | | | 2,000 บาท รวมอยู่ในผลประโยชน์ในหมวดย่อยที่ 2.1-2.3 | | | | |
| หมวด 3 ค่าแพทย์ตรวจรักษา | 600 | 800 | 1,000 | 1,000 | 1,000 | 1,000 | 1,000 | 1,000 | 1,500 | 1,500 |
| หมวดย่อย 4.2 | 5,000 | 7,000 | 9,000 | 10,000 | 11,000 | 10,000 | 12,000 | 15,000 | 17,000 | 18,000 |
| หมวดย่อย 4.3 แพทย์ผ่าตัด | 50,000 | 70,000 | 90,000 | 100,000 | 110,000 | 100,000 | 120,000 | 150,000 | 170,000 | 180,000 |
| หมวดย่อย 4.4 วิสัญญีแพทย์ | 5,000 | 6,000 | 7,000 | 8,000 | 9,000 | 10,000 | 12,000 | 15,000 | 17,000 | 18,000 |
| หมวดย่อย 4.5 ผ่าตัดเปลี่ยนอวัยวะ | จ่ายตามจริง ไม่เกิน 2 เท่า ของผลประโยชน์หมวดย่อยที่ 4.1-4.4 | | | | | จ่ายตามจริง ไม่เกิน 2 เท่า ของผลประโยชน์หมวดย่อยที่ 4.1-4.4 | | | | |
| หมวด 5 Day Surgery | คุ้มครองเสมือนการเข้าพักรักษาตัวเป็นผู้ป่วยในในโรงพยาบาล | | | | | คุ้มครองเสมือนการเข้าพักรักษาตัวเป็นผู้ป่วยในในโรงพยาบาล | | | | |
| หมวดย่อย 6.1 (ภายใน 30 วัน ก่อนและหลัง) | 5,000 | 6,000 | 7,000 | 8,000 | 9,000 | 6,000 | 7,000 | 8,000 | 9,000 | 10,000 |
| หมวดย่อย 6.2 | ไม่คุ้มครอง | | | | | 1,000 / 1,500 ⚠ merged cell | | | | |
| หมวด 7 อุบัติเหตุผู้ป่วยนอก 24 ชม. | 3,000 | 4,000 | 6,000 | 8,000 | 10,000 | 6,000 | 8,000 | 10,000 | 12,000 | 14,000 |
| หมวด 8 เวชศาสตร์ฟื้นฟู | ไม่คุ้มครอง | | | | | 1,000 / 1,500 ⚠ merged cell | | | | |
| หมวด 9 ล้างไต / 10 รังสีรักษา / 11 เคมีบำบัด (ต่อรอบปีกรมธรรม์) | ไม่คุ้มครอง | | | | | 15,000 | 25,000 | 35,000 | 45,000 | 55,000 |
| หมวด 12 รถพยาบาลฉุกเฉิน | 1,000 | 1,500 | 2,000 | 2,500 | 3,000 | 2,000 | 3,000 | 4,000 | 5,000 | 6,000 |
| หมวด 13 ผ่าตัดเล็ก (Minor Surgery) | 5,000 | 6,000 | 7,000 | 8,000 | 9,000 | 10,000 | 12,000 | 14,000 | 16,000 | 18,000 |
| **ผลประโยชน์สูงสุดต่อการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง** | **399,000** | **653,500** | **904,000** | **1,102,500** | **1,306,000** | **705,500** | **939,500** | **1,202,500** | **1,521,000** | **1,736,000** |
| 3. ผลประโยชน์เพิ่มเติมพิเศษ ค่ารักษาพยาบาลผู้ป่วยนอก ต่อรอบปีกรมธรรม์ | ไม่คุ้มครอง | | | | | 3,000 / 4,000 / 6,000 ⚠ merged cells | | | | |
| 4. การมีส่วนร่วมจ่าย (เฉพาะ H&S U_D) ค่าใช้จ่ายส่วนแรก ต่อการเข้าพักฯ ครั้งใดครั้งหนึ่ง สำหรับหมวดที่ 1-5, 6, 8, 12 | ไม่มี | | | | | 5,000 / 8,000 ⚠ merged cells | | | | |

Image: https://samsunglife.co.th/wp-content/uploads/2023/02/4-scaled.jpg
(from https://samsunglife.co.th/rider-hs-plus/)

⚠ **The four flagged rows are the honest limit of this transcription.** In the published
image those cells are merged across an unclear number of plan columns, so 1,000 vs 1,500,
3,000 vs 4,000 vs 6,000, and 5,000 vs 8,000 cannot be assigned to specific plans without
guessing. **The OPD annual figure and the deductible for H&S U_D therefore cannot be
recorded**, and `การมีส่วนร่วมจ่าย` here is a deductible (`ค่าใช้จ่ายส่วนแรก`, defined by the
image's own footnote as `“ความรับผิดส่วนแรก” ตามที่ระบุในกรมธรรม์`), not a copay percentage —
do not confuse it with §3g.

**H&S ไพรม์ has NO published benefit table at all.** Its page carries marketing bullets and
nothing else; the string `หมวดที่` appears zero times on it, and a search of Samsung's own
media library for `ไพรม์` returns four files, all decorative
(`HS-ไพรม์-อิสระจากทุกข้อจำกัดค่ารักษาพยาบาล.png` and similar). The only figures Samsung
publishes for its flagship are prose:

> วงเงินคุ้มครอง สูงสุด 100 ล้านบาท ยาวนานถึงอายุ 99 ปี
> คุ้มครองทั้งผลประโยชน์กรณีผู้ป่วยใน และผลประโยชน์กรณีไม่ต้องเข้าพักรักษาตัวเป็นผู้ป่วยใน รวมถึงกรณีผู้ป่วยนอก สูงสุด 50 ล้านบาท
> สำหรับผู้ป่วยใน สูงสุดถึง 15,000 บาท/วัน หรือค่าห้องพักเดี่ยว ราคาเริ่มต้นของโรงพยาบาลต่อวัน (แล้วแต่จำนวนใดจะสูงกว่า)
> อุบัติเหตุร้ายแรงและ/หรือโรคร้ายแรง รับผลประโยชน์วงเงินสูงสุดต่อรอบปีกรมธรรม์ประกันภัย สูงสุดถึง 100 ล้านบาท
> รับค่ารักษาพยาบาลผู้ป่วยนอก สูงสุด 60,000 บาท ต่อรอบปีกรมธรรม์
> รับส่วนลด 10% ของเบี้ยประกันภัยในปีถัดไป เมื่อจ่ายเบี้ยต่อเนื่อง และไม่เคลมติดต่อกัน 3 รอบปีกรมธรรม์ประกันภัย

https://samsunglife.co.th/rider-protection-hs-prime/

`สูงสุด 100 ล้าน` is the top of a six-plan range whose other five plans are unpublished. The
packaged page names the ceiling plan:

> ผลประโยชน์สูงสุดของสัญญาเพิ่มเติม H&S ไพรม์/รอบปีกรมธรรม์ฯ ซื้อได้สูงสุดไม่เกิน แผน 6 (50 ล้าน)
> สามารถออกแบบความคุ้มครองด้วยแผนแบบมีค่าใช้จ่ายส่วนแรก เริ่มต้น 25,000 บาท ต่อรอบปีกรมธรรม์ประกันภัย

https://samsunglife.co.th/product-wholelife-99-20-prime/

So H&S ไพรม์ has six plans, a deductible variant starting at 25,000 per policy year, and a
**per-policy-year** ceiling — a different limit basis from the per-confinement H&S and
H&S พลัส riders above. Six plans, one published number.

### 3f. The OPD endorsement, published in full

> บริษัทจะจ่ายค่ารักษาพยาบาลให้แก่ผู้เอาประกันภัย ในกรณีการบาดเจ็บหรือเจ็บป่วยสำหรับการบำบัดรักษาโดยแพทย์ (ต้องพ้น 30 วันแรกนับแต่สัญญามีผลบังคับแล้ว) ตามที่เกิดขึ้นจริงหรือจำนวนเงินจำกัดต่อวัน (ผู้ป่วยนอก)

| จำนวนเงินเอาประกันภัยของสัญญาหลักที่มีสัญญาเพิ่มเติมนี้แนบอยู่รวมทุกกรมธรรม์ที่มีผลบังคับ (บาท) | บันทึกสลักหลัง OPD ซื้อได้สูงสุด (บาท) |
|---|---|
| 100,000 – 299,999 | 1,000 |
| 300,000 – 999,999 | 2,000 |
| 1,000,000 ขึ้นไป | 3,000 |

> อายุที่รับประกันภัย 6 ปี – 55 ปี คุ้มครองถึงอายุ 60 ปี
> ต้องซื้อพร้อมสัญญาเพิ่มเติม H&S หรือ H&S_D หรือ H&S เหมาจ่าย เท่านั้น
> ซื้อได้ครั้งละ 800 / 1,000 / 1,200 / 1,600 / 2,000 บาท ต่อกรมธรรม์
> เบี้ยประกันภัยต้องชำระเป็นรายปีเท่านั้น

Image: https://samsunglife.co.th/wp-content/uploads/2021/11/คุ้มครองค่ารักษาพยาบาลผู้ป่วยนอก-OPD-Content.jpg
(from https://samsunglife.co.th/product-protection-opd/)

Note the shape: **a per-visit cap with no annual cap**, the same shape flagged as a schema
problem in `standalone-health-sourcing.md` §6.3. `opd_annual_limit_thb` would be `null`.
Note also that OPD stops renewing at 60 while its host riders run to 98 — a reader who buys
the pair loses outpatient cover 38 years before inpatient cover ends.

### 3g. e) Entry ages, renewal ceiling, limit basis, copay — mostly published, and one of them is excellent

**Entry and renewal, per product, verbatim:**

H&S ไพรม์ —
> อายุรับประกันภัย 30 วัน – 65 ปี (ต่ออายุได้ถึง 98 ปี)
> ให้ความคุ้มครองถึงอายุ 99 ปี หรือสิ้นสุดความคุ้มครองของสัญญาหลัก แล้วแต่เวลาใดจะถึงก่อน
> รับประกันภัยขั้นอาชีพ 1 – 3 (สำหรับชาวต่าง่ชาติที่อาศัยในประเทศไทย ซื้อได้เฉพาะขั้นอาชีพ 1 – 2 เท่านั้น)

(the typo `ต่าง่ชาติ` is Samsung's, reproduced) — https://samsunglife.co.th/rider-protection-hs-prime/

H&S พลัส —
> อายุรับประกันภัยสำหรับ H&S L อายุ 11 – 65 ปี(ต่ออายุได้ถึงอายุ 98 ปี) และ H&S U / H&S U_D อายุ 1 วัน – 65 ปี (ต่ออายุได้ถึงอายุ 98 ปี)
> รับประกันภัยสำหรับขั้นอาชีพ 1-4
> สำหรับ H&S U_D สามารถซื้อได้ 1 แผนต่อผู้เอาประกันภัย 1 รายเท่านั้น

https://samsunglife.co.th/rider-hs-plus/

H&S / H&S_D (แบบมาตรฐาน) —
> อายุที่รับประกันภัย 1 วัน-65 ปี (ต่ออายุได้ถึงอายุ 74 ปี คุ้มครองถึงอายุครบ 75 ปี)

Image: https://samsunglife.co.th/wp-content/uploads/2022/07/HS-แบบมาตรฐาน-3.jpg

Packaged whole-life version — `รับประกันภัยตั้งแต่อายุ 11 – 65 ปี` and
`ซื้อได้สูงสุด 1 กรมธรรม์/ผู้เอาประกันภัย 1 ราย`.

**The 74/75 ceiling on the standard riders against 98/99 on the new ones is the single most
consumer-relevant number Samsung publishes.** A buyer who takes H&S (แบบมาตรฐาน) is buying
cover that stops at 75 — the age at which health cover starts to matter most.

**Limit basis — per confinement for H&S, H&S_D and H&S พลัส; per policy year for H&S ไพรม์.**
The tables above are headed `ต่อการเข้าพักรักษาตัวเป็นผู้ป่วยในครั้งใดครั้งหนึ่ง` throughout,
and only หมวด 9/10/11 in H&S พลัส are `ต่อรอบปีกรมธรรม์ประกันภัย`. H&S ไพรม์ says
`วงเงินสูงสุดต่อรอบปีกรมธรรม์ประกันภัย`. `ipd_limit_basis` therefore differs *within one
insurer's own health range*, which is a first for this dataset and must never be flattened.

**New Health Standard — stated in words, unusually.** Samsung is one of the few insurers here
that writes the phrase rather than merely using the 13-category structure:

> ใช้ชีวิตได้อย่างสบายใจ หมดกังวลทุกการเจ็บป่วย ด้วยความคุ้มครองค่ารักษาพยาบาลแบบ New Health Standard
> H&S อัลตร้า ครอบคลุมค่ารักษาพยาบาลรอบด้าน คุ้มครองค่ารักษาพยาบาลผู้ป่วยใน (IPD) ผลประโยชน์กรณีที่ไม่ต้องเข้าพักรักษาเป็นผู้ป่วยใน ครบทั้ง 13 หมวด New Health Standard

https://samsunglife.co.th/rider-hs-plus/

and it explains the standard's origin, naming the regulator:

> New Health Standard คืออะไร ?
> สำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย (คปภ.) ได้มีการกำหนดขึ้น เพื่อให้สัญญาเพิ่มเติมการประกันภัยสุขภาพ มีแบบและข้อความที่เป็นมาตรฐานเดียวกันทั้งธุรกิจประกันชีวิต และให้มีเงื่อนไขความคุ้มครองที่สอดคล้องกับวิธีการรักษาทางการแพทย์และวิวัฒนาการทางการแพทย์ที่เป็นปัจจุบันมากขึ้น

Image: https://samsunglife.co.th/wp-content/uploads/2022/07/HS-แบบมาตรฐาน-1.jpg

`new_health_standard: true` would be quotable, not inferred, for all four riders.

**Copay on renewal — the sharpest disclosure in this round, with an effective date.**

Every health product page carries the same reservation:

> การต่ออายุสัญญาเพิ่มเติม กรณีครบรอบกรมธรรม์ประกันภัย บริษัทฯ สงวนสิทธิเปลี่ยนแปลงเงื่อนไข ข้อตกลงความคุ้มครอง โดยการเพิ่มเงื่อนไขให้ผู้เอาประกันภัยมีค่าใช้จ่ายร่วม (Copayment) ตามอัตราและหลักเกณฑ์ที่บริษัทฯ กำหนด

and a dedicated page then gives the rates, the thresholds **and the cut-off date**:

> ประกาศสำคัญ: สำหรับบริษัท ซัมซุงประกันชีวิต (ประเทศไทย) จำกัด (มหาชน) มีการประกาศใช้เงื่อนไข COPAYMENT ดังนี้
> ✓ เข้าเงื่อนไข COPAYMENT: กรมธรรม์ประกันสุขภาพฉบับใหม่หรือกรมธรรม์ต่ออายุที่อนุมัติ ตั้งแต่ วันที่ 11 เมษายน 2568 เป็นต้นไป
> × ไม่เข้าเงื่อนไข COPAYMENT: กรมธรรม์ประกันสุขภาพที่อนุมัติ ก่อน วันที่ 11 เมษายน 2568 และชำระเบี้ยฯ อย่างต่อเนื่อง

> การเข้าเงื่อนไข COPAYMENT (พิจารณาเฉพาะกรณีเข้ารักษาตัวในฐานะผู้ป่วยใน (IPD) เท่านั้น)
> กรณีที่ 1 — การเจ็บป่วยโรคเล็กน้อย (Simple Disease) อาการที่ไม่จำเป็นต้องนอนในโรงพยาบาลหรืออาการที่ไม่รุนแรง ไม่มีภาวะแทรกซ้อน — ตั้งแต่ 3 ครั้งขึ้นไป ต่อปีกรมธรรม์ — มากกว่าหรือเท่ากับ 200% ของเบี้ยประกันสุขภาพ — 30% ของทุก ๆ การรักษาในปี กธ. ถัดไป
> กรณีที่ 2 — การเจ็บป่วยโรคทั่วไป ไม่นับรวมการผ่าตัดใหญ่และโรคร้ายแรง — ตั้งแต่ 3 ครั้งขึ้นไป ต่อปีกรมธรรม์ — มากกว่าหรือเท่ากับ 400% ของเบี้ยประกันสุขภาพ — 30% ของทุก ๆ การรักษาในปี กธ. ถัดไป
> กรณีที่ 3 — การเคลมที่เข้าเงื่อนไขทั้งกรณีที่ 1 และกรณีที่ 2 ในรอบปีกรมธรรม์ — 50% ของทุก ๆ การรักษาในปี กธ. ถัดไป

https://samsunglife.co.th/copayment/

The page then works two numeric examples with a 20,000 baht annual premium
(`(10,000 + 15,000 + 20,000) / 20,000 x 100 = 225%` → 30%; `(30,000 + 25,000 + 30,000) / 20,000 x 100 = 425%` → 30%).

Two things make this better than ไทยประกันชีวิต's clause in `round2-insurers-sourcing.md` §4.1:
Samsung **dates** the change (11 April 2568), so a reader can tell whether their own policy is
affected; and it **shows the arithmetic**, so "อัตราการเคลม 200%" is unambiguous — it is claims
paid divided by annual health premium, not by sum insured. That is the clearest published
definition of the ratio found anywhere in this project, and it is worth quoting in the site's
own copay explainer regardless of whether a Samsung record ever exists.

**A discount that is the mirror image of the copay**, published for H&S ไพรม์ and the packaged
version: `รับส่วนลด 10% ของเบี้ยประกันภัยในปีถัดไป เมื่อจ่ายเบี้ยต่อเนื่อง และไม่เคลมติดต่อกัน 3 รอบปีกรมธรรม์ประกันภัย`.
Same structure as ไทยประกันสุขภาพ's 10% no-claim discount.

### 3h. d) Filed policy wording — NOT PUBLISHED

No `กรมธรรม์` and no `เอกสารสรุปสาระสำคัญ` for any health rider exists on samsunglife.co.th.
Checked: every one of the seven product pages (no PDF links of any kind),
`https://samsunglife.co.th/service-download/`, `https://samsunglife.co.th/service-policy-download/`,
`https://samsunglife.co.th/service-claim-download/`, and
`https://samsunglife.co.th/about6/` (`งบการเงินและ การเปิดเผยข้อมูลตามประกาศ คปภ.`). The
company's only public caveat is the standard warning line:

> คำเตือน ผู้ซื้อควรศึกษาความคุ้มครอง เงื่อนไขและข้อยกเว้นก่อนตัดสินใจทำประกันภัย

**Exclusions: NOT PUBLISHED.** The word `ข้อยกเว้น` appears on the health pages only inside
that warning — it tells the reader to study exclusions and then does not publish them.
`terms_source.tier` could only be `official_insurer`, never `filed_wording`, and
`exclusions: []` would be the honest value.

### 3i. f) VERDICT

**Not addable. One field blocks it: `premium`.**

Everything else a record needs exists and is quotable —
`type: rider`, `entry_age_min`/`entry_age_max`, `renewal_ceiling_age`,
`ipd_annual_limit_thb` with a per-plan figure, `ipd_limit_basis`,
`room_board_thb_per_night`, `new_health_standard: true` with a verbatim source,
`copay_on_renewal` with rates, thresholds and a date, and a `host_policy` block with a real
`min_sum_insured_thb` of 50,000.

`premium` is `PremiumTable.nullable()` and a null is legal *if* `premium_unknown_reason` is
filled — so a record is technically constructible. It should not be built, for the same
reason ไทยประกันชีวิต Health Fit Ultra was only accepted as a null-premium record and AXA was
rejected outright: **Samsung publishes no premium anywhere, and its host premium is also
unpublished, so the record would carry two nulls in the two fields this site exists to
compare.** A row showing "ไม่เปิดเผยเบี้ย / ไม่เปิดเผยเบี้ยสัญญาหลัก" adds nothing a reader can act on.
If it is ever entered, it must be as a deliberate "this insurer publishes nothing" exhibit,
with `opd_annual_limit_thb: null` and `deductible_thb` omitted because of the merged-cell
ambiguity in §3e — never with a guessed value from those cells.

---

## 4. บริษัท ฟินันซ่าประกันชีวิต จำกัด — DOES NOT EXIST under that name since 2557 (2014)

### 4a. The company exists; the name does not

`finansalife.com` still resolves (Cloudflare, two AAAA records) and still refuses every
request:

> Sorry, you have been blocked — You are unable to access finansalife.com
> Cloudflare Ray ID: a2904d952c0a1d37

HTTP 403 to `curl` with a browser User-Agent and 403 to WebFetch, on `https://www.finansalife.com/`,
`https://finansalife.com/` and `http://www.finansalife.com/`. `finansalife.co.th` does not
resolve at all (NXDOMAIN). **Nothing product-related can be sourced from that domain.**

The licence, however, is alive under a new name. The successor's own history page:

> In 2004, the company once again changed ownership and became Finansa Life Assurance, a French-owned company. In 2010, the company faced financial difficulties, which led to it becoming under the control of OIC, the insurance regulatory body in Thailand.
> In 2013, the PhillipCapital Group, a global financial institution whose headquarters have been in Singapore since 1975, became a major shareholder, holding 98.75% of Finansa Life's stake, and changed the company name to Phillip Life Assurance Public Company Limited in 2014.

and on its own timeline:

> 1947 : Thai Prasit Insurance was established to provide life and general insurance products
> 2001 : Nationwide Life Assurance, Nationwide Group of America.
> 2004 : Finansa Life Assurance, Finansa Group of Thailand
> 2010 — The company was under the control of Office of Insurance Commission
> 2013 — PhillipCapital Group (Singapore) became a major shareholder holding 98.75% stake of Finansa Life Assurance Company Limited
> 2014 — The company was renamed to "Phillip Life Assurance Plc."

https://www.philliplife.com/ourhistory
(note: `https://www.philliplife.com/ourhistory` and `https://www.philliplife.com/en/ourhistory`
serve the same English text; there is no Thai version of this page.)

### 4b. The regulator's own record of the control period — the primary source

คปภ. publishes the Ministry of Finance orders. The order lifting control, read from the scan
(Thai numerals as printed):

> คำสั่งกระทรวงการคลัง
> ที่ ๑๓๗๙/๒๕๕๖
> เรื่อง ให้เลิกควบคุมบริษัท ฟินันซ่าประกันชีวิต จำกัด
>
> ตามที่ รัฐมนตรีว่าการกระทรวงการคลัง มีคำสั่งกระทรวงการคลัง ที่ ๔๗๗/๒๕๕๓ ลงวันที่ ๒๖ เมษายน ๒๕๕๓ ให้ควบคุมบริษัท ฟินันซ่าประกันชีวิต จำกัด เนื่องจากบริษัท ฟินันซ่าประกันชีวิต จำกัด ไม่สามารถแก้ไขฐานะหรือการดำเนินการเพื่อให้มีเงินกองทุนครบถ้วนตามที่กฎหมายกำหนด จนถึงปัจจุบัน ฐานะและการดำเนินงานของบริษัทก็ยังไม่ดีขึ้น และคำสั่งกระทรวงการคลัง ที่ ๔๗๘/๒๕๕๓ ลงวันที่ ๒๖ เมษายน ๒๕๕๓ แต่งตั้งคณะกรรมการควบคุมบริษัท ฟินันซ่าประกันชีวิต จำกัด เพื่อทำหน้าที่ดำเนินกิจการของบริษัทตามที่กฎหมายกำหนด นั้น
>
> บัดนี้ คณะกรรมการควบคุมบริษัท ฟินันซ่าประกันชีวิต จำกัด ได้รายงานว่า บริษัท ฟินันซ่าประกันชีวิต จำกัด สามารถดำเนินการแก้ไขปัญหาฐานะทางการเงินและการดำเนินการของบริษัท ฟินันซ่าประกันชีวิต จำกัด ให้กลับอยู่ในสภาวะปกติ และสามารถดำเนินธุรกิจต่อไปได้ สมควรยกเลิกการควบคุมบริษัทได้
>
> อาศัยอำนาจตามความในมาตรา ๖๑ แห่งพระราชบัญญัติประกันชีวิต พ.ศ. ๒๕๓๕ และมาตรา ๖ แห่งพระราชบัญญัติประกันชีวิต พ.ศ. ๒๕๓๕ ซึ่งแก้ไขเพิ่มเติมโดยพระราชบัญญัติประกันชีวิต (ฉบับที่ ๒) พ.ศ. ๒๕๕๑ รัฐมนตรีว่าการกระทรวงการคลังพิจารณาแล้วเห็นสมควรจึงสั่งให้เลิกการควบคุมบริษัท ฟินันซ่าประกันชีวิต จำกัด
>
> ทั้งนี้ เมื่อพ้นกำหนดสามวันทำการ นับแต่วันที่ลงนามในคำสั่งนี้
> สั่ง ณ วันที่ ๒๑ ตุลาคม พ.ศ. ๒๕๕๖
> (นายกิตติรัตน์ ณ ระนอง) รัฐมนตรีว่าการกระทรวงการคลัง

https://oiceservice.oic.or.th/document/Law/file/00891/1565-7144.pdf
(companion order: https://oiceservice.oic.or.th/document/Law/file/00892/814-7586.pdf)

`[sic: transcribed from a scanned image — these PDFs carry no text layer and pdftotext
returns nothing from them.]`

So the regulator's record is: **placed under control 26 April 2553 (2010) for a capital
shortfall, released 21 October 2556 (2013), renamed 2557 (2014).** The current licence:

> 1002　บริษัท ฟิลลิปประกันชีวิต จำกัด (มหาชน)　Philip Life Assurance Public Company Limited　PLA

https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337

(The OIC's own table spells the English name `Philip`, with one l, against the company's own
`Phillip`. Reproduced as printed.)

### 4c. Does the successor sell individual health cover? No — but it does have health riders in force

This matters because the licence is continuous: whatever ฟินันซ่า sold, ฟิลลิป now services.

**Its published individual product catalogue has no health category.** The filter tabs on its
own product page, verbatim:

> แบบประกันทั้งหมด · คุ้มครองชีวิต · ออมทรัพย์ · ลดหย่อนภาษี · เกษียณ · อุบัติเหตุ

https://www.philliplife.com/product

Five categories, no `สุขภาพ`. The products behind them are savings (แวลู พลัส 20/15,
ฟิลลิป ออมชิลล์ 11/5, แฮปปี้ เวลธ์ตี้ 90/6, เซฟตี้ เซฟ 10/10 and 15/15, พรีเมี่ยม รีเทิร์น 25/15 …),
annuity (สุขบำนาญ 85/7, 85/14, 90/60), whole life (สมาร์ท ไลฟ์ 90/20), unit-linked
(ยูนิต ลิงค์ เวลท์ ซิงเกิ้ล, ฟิลลิป เวลธ์ โพรเทคชั่น), takaful (อัล มับรูก 5/5–20/20 …) and personal
accident (พีเอ เอ็กซ์ตร้า ชิลด์, พีเอ ชิลด์ แคร์, ตะกาฟุล พีเอ ชิลด์ แคร์). A `wp-json` search of
the whole site for `ค่ารักษาพยาบาล` returns claim pages and PA products only; a search for
`H&S` returns nothing.

**But health riders exist and are being claimed against.** From its claims page:

> ผู้เอาประกันภัยต้องถือกรมธรรม์ที่มีสัญญาเพิ่มเติม "การประกันภัยสุขภาพ" ซึ่งมีผลบังคับมาไม่น้อยกว่า 60 วันนับจากวันเริ่มสัญญา หรือวันที่อนุมัติต่ออายุสัญญาครั้งสุดท้าย จึงจะสามารถใช้สิทธิได้
> กรณีผู้เอาประกันภัยเข้าทำการรักษาในโรงพยาบาล และออกมาแล้ว แต่มีการเข้าไปรับการรักษาใหม่ด้วยสาเหตุ หรือโรค หรือภาวะแทรกซ้อนจากโรคเดียวกัน ในช่วง 90 วัน ถือว่าเป็นการรักษาโรคระบบและภาวะสืบเนื่องเดียวกัน วงเงินคุ้มครองค่ารักษาพยาบาลจะต้องใช้ต่อเนื่องจากครั้งก่อนหน้านี้
> กรณี เจ็บป่วยด้วยโรคที่เป็นมาก่อนทำประกัน หรือ เป็นข้อยกเว้นความคุ้มครอง ตามที่ระบุไว้ ใน กรมธรรม์หรือสัญญาเพิ่มเติมการประกันภัยสุขภาพ ซึ่งแนบอยู่กับกรมธรรม์ประกันชีวิต แต่ละฉบับ

https://www.philliplife.com/health-accidental-claim

That second clause is a per-confinement rule (`ในช่วง 90 วัน ... ใช้ต่อเนื่องจากครั้งก่อนหน้านี้`),
the same 90-day definition AIA, ไทยประกันสุขภาพ and AXA all use. And the company maintains a
copay page —

> COPAYMENT จ่ายร่วม = แต่มั่นคงระยะยาว

https://www.philliplife.com/copayment-philliplife-2025

— whose entire content is JPEG images
(`.../uploads/2025/02/เกณฑ์การเข้าเงื่อนไข-COPAYMENT-1.jpg` and eight others) with no product
named in the HTML.

**So Phillip Life sells health riders it does not advertise.** No product name, no plan table,
no premium, no entry age, no renewal ceiling, no limit and no wording is published for any of
them. There is nothing to record and, unlike Samsung, not even anything to describe.

### 4d. f) VERDICT

**No record, and the useful finding is the name.** `ฟินันซ่าประกันชีวิต` should be treated the
way `standalone-health-sourcing.md` §5 treats Cigna and Aetna: the brand is gone, the licence
lives on under a successor, and the successor is the only correct target. **That target is
บริษัท ฟิลลิปประกันชีวิต จำกัด (มหาชน), philliplife.com** — and it publishes no individual
health product, so it is not worth a retry either.

---

## 5. Not included and why — this round

| Insurer / product | Verdict | Reason |
|---|---|---|
| ทิพยประกันชีวิต (Dhipaya Life, OIC 1011) — whole range | NOT INCLUDED | Sells no individual medical-expense product. 18 published products, zero health; the `โรคร้ายแรงและสุขภาพ` menu label is backed only by cancer plans |
| ที ไลฟ์ ประกันชีวิต (T Life, ex-ประกันชีวิตนครหลวงไทย, OIC 1017) — whole range | NOT INCLUDED | Same. Life, savings, tax, cancer/CI lump sum, PA, group, MRTA. No medical-expense product |
| ซัมซุง H&S ไพรม์ | NOT INCLUDED | No premium at any age **and** no benefit table published — only marketing prose for a six-plan range |
| ซัมซุง H&S พลัส (ไลท์ / อัลตร้า / อัลตร้า_D) | NOT INCLUDED | Benefit table complete, premium published nowhere. Deductible and OPD unreadable from merged cells |
| ซัมซุง H&S (แบบมาตรฐาน) | NOT INCLUDED | Same. Also the weakest renewal ceiling in the round — 74 |
| ซัมซุง H&S_D (แบบมาตรฐาน) | NOT INCLUDED | Same |
| ซัมซุง บันทึกสลักหลัง OPD | NOT INCLUDED | Endorsement, not a plan; per-visit cap with no annual figure; premium unpublished |
| ซัมซุง ตลอดชีพ 99/20 H&S ไพรม์ / H&S พลัส (packaged) | NOT INCLUDED | Would double-count the rider, same call as KTAXA Health Ultra in round 2. Host premium unpublished anyway |
| ฟินันซ่าประกันชีวิต | NOT INCLUDED | **Company no longer exists under that name.** Renamed ฟิลลิปประกันชีวิต in 2557/2014 |
| ฟิลลิปประกันชีวิต (successor, OIC 1002) | NOT INCLUDED | Health riders exist in force but are not published: no product name, plan, premium, age, limit or wording |

## 6. NOT FOUND / does not exist publicly

Everything below was looked for and is genuinely absent. Nothing here was estimated.

1. **A current, machine-readable คปภ. list of licensed life insurers.** The consumer registry
   (`oic.or.th/th/consumer/insurance/companies/life/list`), `smart.oic.or.th/eservice/Menu12`
   and `oiceservice.oic.or.th/insurancelife.php` all fail as described in method note 1. The
   newest usable OIC company register found is the **June 2020** code table. Anyone re-doing
   this should try that PDF's sibling `keySource` values for a later version before assuming
   a name is current.
2. **Any premium, at any age, for any ซัมซุง health rider.** No rate table, no sample age, no
   brochure PDF, no calculator, no online checkout. Only `เบี้ยประกันภัยปรับตามช่วงอายุและขั้นอาชีพ`.
3. **Any host-policy *premium* for ซัมซุง.** The host minimum sum insured is published
   (50,000 annual / 100,000 non-annual); the money it costs is not, at any age.
4. **A benefit table for ซัมซุง H&S ไพรม์.** Its five lower plans are entirely undocumented;
   only `แผน 6 (50 ล้าน)` and the `100 ล้าน` doubled ceiling are named.
5. **Filed policy wording (กรมธรรม์ / เอกสารสรุปสาระสำคัญ) from any of the four.** Not one of
   the four companies publishes a single policy document for any product. `filed_wording`
   remains unavailable from all of them.
6. **An exclusions list from any of the four.** ซัมซุง's health pages contain the word
   `ข้อยกเว้น` only inside `คำเตือน ผู้ซื้อควรศึกษาความคุ้มครอง เงื่อนไขและข้อยกเว้นก่อนตัดสินใจทำประกันภัย`.
7. **A waiting period from ซัมซุง.** The only waiting period published anywhere in this round
   is on the OPD endorsement (`ต้องพ้น 30 วันแรกนับแต่สัญญามีผลบังคับแล้ว`) and, for a *claims
   service* rather than the contract, ฟิลลิป's Fax Claim rule (`ไม่น้อยกว่า 60 วัน`). No
   30/120-day clause for ซัมซุง's IPD riders is published.
8. **A คปภ. or company announcement of the ไทยซัมซุง → ซัมซุง (ประเทศไทย) rename.** The two
   names are both attested; the document that connects them is not public that I could find.
9. **Anything at all on `finansalife.com`.** Cloudflare 403 to every method tried.
10. **Any ฟิลลิปประกันชีวิต health product page.** The riders are proven to exist from the
    claims and copay pages; not one is named or described anywhere on the site.

## 7. What this round changes about the project's assumptions

1. **"Smaller Thai life insurer" does not imply "sells health insurance".** Two of the four
   here — both with century-old licences — sell none at all. Before sourcing a Thai life
   insurer, read its product API or page list, not its menu labels: ทิพยประกันชีวิต's own menu
   says `โรคร้ายแรงและสุขภาพ` over a category containing only cancer plans.
2. **The host-policy problem has a second dimension nobody had documented: the host sum
   insured caps the health benefit.** Samsung publishes two tables mapping
   `จำนวนเงินเอาประกันภัยของแบบประกันภัยหลัก` to the maximum room rate purchasable. A rider row
   showing "ค่าห้อง 5,500" is not a product anyone can buy without also buying at least
   1,000,000 baht of life cover. The schema's `host_policy.min_sum_insured_thb` currently
   holds one number; the real relationship is a schedule.
3. **`ipd_limit_basis` can differ within one insurer's own range.** Samsung's H&S,
   H&S_D and H&S พลัส are per confinement; H&S ไพรม์ is per policy year. Any UI that groups
   plans by insurer must not imply a shared basis.
4. **A benefit table published as a JPEG is a real sourcing tier problem.** Samsung's numbers
   are complete and unambiguous *except* where the image merges cells — and those merged
   cells happen to hold the deductible and the OPD annual figure, the two values a comparison
   most needs. Image-sourced data should carry a marker; a re-verifier cannot check it with
   view-source and must re-open the image.
5. **The copay ratio finally has a published definition.** Samsung's worked example
   (`(10,000 + 15,000 + 20,000) / 20,000 x 100 = 225%`) states plainly that
   `อัตราการเคลม` = claims paid ÷ **annual health premium**. Every copay clause already in this
   dataset (AIA, ไทยประกันชีวิต, Samsung) uses the same 3-claims / 200% / 400% / 30% / 50%
   structure because คปภ. mandates it — so this one definition can be reused across all of
   them in the site's Thai explainer, cited to Samsung.
6. **A dead brand is worth a section.** ฟินันซ่า took an hour to resolve and the answer —
   licence alive, name changed in 2014, successor sells no published health product — is a
   permanent saving for whoever inherits this list. The คปภ. control orders at
   `oiceservice.oic.or.th/document/Law/file/...` are a usable regulator archive and are the
   right first stop for any Thai insurer whose corporate status is uncertain.

## 8. Still open — not researched in this file

The three insurers left open at the end of `round2-insurers-sourcing.md` §7 —
**ไทยสมุทรประกันชีวิต (Ocean Life), โตเกียวมารีนประกันชีวิต (Tokio Marine Life) and
พรูเด็นเชียล (Prudential)** — remain unsourced and are still the obvious next target. This
round did not touch them.

Two further leads this round turned up, both from the OIC code table and both absent from
every research file so far: **บริษัท ธนชาตประกันชีวิต จำกัด (มหาชน) (1020)** and
**บริษัท ชับบ์ ไลฟ์ แอสชัวรันซ์ จำกัด (มหาชน) (1025)** — the latter being the successor named
in `standalone-health-sourcing.md` §5 as the correct target for the Cigna question, and still
never checked.
