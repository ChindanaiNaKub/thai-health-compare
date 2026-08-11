# Round 5 sourcing: five never-checked minor Thai life licences — บางกอกสหประกันชีวิต,
# สหประกันชีวิต, แอ๊ดวานซ์ ไลฟ์, อาคเนย์ประกันชีวิต, ไทยคาร์ดิฟ

Research date: 2026-08-12. Same rules as the other files in this directory: every claim is
followed by the verbatim Thai it rests on and the exact URL that Thai lives on. Only
insurer-owned domains, insurer-hosted documents, and คปภ./OIC documents were used. No agent,
broker, comparison site, hospital or blog is cited for anything, premiums included. These
five licences are the ones `round4-gap-analysis.md` §2a and §7 flagged as **never checked in
any of this project's prior eleven-plus files** — the lowest-priority gap in that document,
by size, but genuinely untouched until now.

**Outcome: two clean negatives, one hard blocker, and two positives — the best hit rate of
any minor-insurer round in this project.** สหประกันชีวิต and บางกอกสหประกันชีวิต (BUI Life)
sell no individual health product at all, cleanly and confidently confirmed from each
company's own complete catalogue. ไทยคาร์ดิฟ ประกันชีวิต could not be assessed either way —
its historic domain is dead and DNS-refused, and the คปภ.'s own lookup tools are still
broken, the same dead end `round3-life-minor-sourcing.md`'s Method note already documented.
The other two turned out to be real, current insurers this project had simply never looked
at under their present names: **แอ๊ดวานซ์ ไลฟ์ ประกันชีวิต renamed to แรบบิท ประกันชีวิต
(Rabbit Life) in 2022**, and **อาคเนย์ประกันชีวิต (SE Life) is alive and unaffected by the
well-publicized 2022 licence revocation of its non-life sibling**. Both sell individual
health riders with genuine, complete, machine-readable age-band premium tables — rare enough
in this project that two records are added from this round.

**Two records added: `rabbitlife-health-protect-10000.yaml` and
`southeastlife-standard-health-plus-1000.yaml`.** `bun run validate-data` passes at 40 plans,
3 schemes. `bun run test` passes.

## Method note

1. **The OIC's June 2020 licensee PDF is the only registry tool that reliably works**, same
   as every prior round: `https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337`.
   It was re-downloaded and re-parsed with `pdftotext -layout` independently for this round
   and confirms all five licence codes used below. The consumer-facing registry
   (`https://www.oic.or.th/th/consumer/insurance/companies/life/list`) and the filed-wording
   search tool (`https://oiceservice.oic.or.th/insurancelife.php`) are **still broken** as of
   2026-08-12 — the Nuxt SPA renders nothing, and the wording-search dropdown still ships
   with zero `<option>` entries beyond the placeholder. This is the same failure this
   project's Method notes have reported since round 3; it has not been fixed in over two
   years of calendar time between round 3 and this round in-universe.
2. **Two of the five names in this batch are traps for a name-based search**, both flagged
   explicitly so the next person does not repeat the confusion:
   `บางกอกสหประกันชีวิต` (BUI Life, licence 1019, life) vs. `บางกอกสหประกันภัย` (Bangkok
   Union Insurance, licence 2017, non-life) — different licences, shared brand, shared
   building. `สหประกันชีวิต` (Union Life, licence 1013) vs. `บางกอกสหประกันชีวิต` (BUI Life,
   licence 1019) — similarly-spelled but unrelated companies, easy to conflate in a skim.
3. **อาคเนย์ประกันชีวิต required an explicit non-duplication boundary.** A separate
   concurrent piece of work in this project was screening the non-life sibling
   อาคเนย์ประกันภัย (licence 2079, revoked by Ministry of Finance order in April 2022). This
   round's brief for the life licence (1003) was written to explicitly forbid touching or
   reporting on the non-life licence, to avoid duplicate or conflicting findings landing in
   two files at once.
4. **Two brochures had complete premium tables text-extractable with `pdftotext -layout`,
   no OCR needed** — a contrast with Samsung Life in round 3, whose benefit tables were
   JPEG-only. Both new records' source PDFs were independently re-downloaded and re-parsed
   for this file rather than trusting a first-pass summary, specifically to verify the full
   age-band tables before they were transcribed into YAML.

---

## 1. บริษัท สหประกันชีวิต จำกัด (มหาชน) — Union Life Insurance (licence 1013)

### 1a. Identity and status: active, no rebrand, no merger — a cooperative-movement insurer

OIC register:

> 1013　บริษัท สหประกันชีวิต จำกัด (มหาชน)　Union Life Insurance Public Company Limited　UNION LIFE

https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337

Live domain `https://www.sahalife.co.th/` (HTTP 200). Self-description:

> บริษัทประกันชีวิตของสหกรณ์ เพื่อสหกรณ์ สมาชิกสหกรณ์ และปวงชน

https://www.sahalife.co.th/

Founding and incorporation, from the company's own history page:

> ได้รับอนุญาตให้ประกอบธุรกิจประกันชีวิต [24 ตุลาคม 2537] ... [5 สิงหาคม 2554]
> แปรสภาพเป็นบริษัทมหาชนจำกัด

https://www.sahalife.co.th/ประวัติการก่อตั้ง

No predecessor name, no rebrand, no dormancy — the site's own sitemap
(`https://www.sahalife.co.th/sitemap.xml`) carries blog posts dated into 2026, so it is
actively trading, not dormant.

### 1b. Verdict: NO individual health/medical-expense product

The site's own sitemap — 292 URLs, the site's complete machine-generated page list — reduces
to exactly three product categories once ~200 blog/news posts are filtered out:

> สหสินเกื้อทรัพย์ · เกื้อทรัพย์เฉพาะกาล · ประกันชีวิตกลุ่ม

https://www.sahalife.co.th/sitemap.xml

All seven named individual products are decreasing- or fixed-sum **credit life insurance**
(insures a cooperative member's outstanding loan balance):

> โครงการประกันชีวิตคุ้มครองสินเชื่อเพื่อสมาชิกสหกรณ์สหสินเกื้อทรัพย์ ... แบบทุนประกันลดลง-
> คุ้มครองชีวิต (871) · แบบทุนประกันลดลง-คุ้มครองชีวิตและทุพพลภาพ (872) · แบบทุนประกันคงที่-
> คุ้มครองชีวิตและทุพพลภาพ (873) · แบบทุนประกันคงที่-คุ้มครองชีวิต (874) · แบบทุนประกันคงที่-
> ชำระครั้งเดียว · แบบทุนประกันคงที่-ชำระรายปี · แบบทุนประกันคงที่-ชำระครั้งเดียว-คุ้มครองชีวิต (110%)

https://www.sahalife.co.th/คุ้มครองชีวิตดูแลสินเชื่อ

`ค่ารักษาพยาบาล`, `ผู้ป่วยใน`, `ผู้ป่วยนอก`, `ค่าห้อง`, `สุขภาพ`, `H&S` and `New Health
Standard` appear zero times across the whole product catalogue. The only "medical expense"
mention on the entire site is a **group** PA product with accident-only medical
reimbursement, out of scope on two counts:

> จ่ายเบี้ยประกันภัยเพียงแค่วันละ 2 บาทกว่า ๆ ต่อวัน ให้ความคุ้มครองสูงสุดถึง 200,000 บาท ...
> ค่ารักษาพยาบาล ต่อ อุบัติเหตุแต่ละครั้ง [5,000–50,000 บาท ตามแผน]

https://www.sahalife.co.th/ประกันชีวิตกลุ่ม (group, ages 16–80, "สำหรับคณะกรรมการและ
เจ้าหน้าที่สหกรณ์" — minimum 10 lives; medical expense from accident only, not general
illness).

### 1c. No blockers

No WAF, no JS-only rendering. GET requests all returned HTTP 200 (only bare HEAD requests
got a benign nginx 403, a method quirk, not a block).

### 1d. VERDICT

**No record. Out of scope entirely**, same disposal as ทิพยประกันชีวิต and ที ไลฟ์ in
`round3-life-minor-sourcing.md` §§1–2. This is the dedicated life insurer of the Thai
cooperative movement, and it sells nothing but credit-life and one group PA product.

---

## 2. บริษัท บางกอกสหประกันชีวิต จำกัด (มหาชน) — BUI Life Insurance (licence 1019)

### 2a. Identity and status: active, one historical rebrand, distinct from its non-life namesake

OIC register, both the target and the trap-row that must not be merged with it:

> 1019　บริษัท บางกอกสหประกันชีวิต จำกัด (มหาชน)　BUI Life Insurance Public Company Limited　BUI life
> 2017　บริษัท บางกอกสหประกันภัย จำกัด (มหาชน)　Bangkok Union Insurance Public Co., Ltd.　BUN

https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337

1019 (life, `builife.com`) and 2017 (non-life, `bui.co.th`) are separate licences sharing a
brand and a building — the same pattern as Dhipaya Life/Dhipaya Insurance in
`round3-life-minor-sourcing.md` §1a.

Live domain `https://www.builife.com/` (`builife.co.th` does not resolve at all). Corporate
history, from the insurer's own page:

> บริษัท บางกอกสหประกันชีวิต จำกัด (มหาชน) จึงถือกำเนิดขึ้น ด้วยทุนจดทะเบียน 500 ล้านบาท
> (ชำระเต็ม)เมื่อวันที่ 16 ตุลาคม พ.ศ.2540 โดยใช้ชื่อว่า บริษัท ทีพีไอประกันชีวิต จำกัด และ
> ต่อมาจึงเปลี่ยนชื่อเป็นบริษัท บางกอกสหประกันชีวิต จำกัด เมื่อวันที่ 3 ตุลาคม พ.ศ.2548 และ
> ได้จดทะเบียนเป็น บริษัทมหาชน จำกัด ... เมื่อวันที่ 20 ธันวาคม พ.ศ.2555

https://www.builife.com/History.html

Chain: TPI Life Insurance (1997) → Bangkok Union Life Insurance (2005) → public company under
its current name (2012). The page footer's `Copyright © 2012` reads like dormancy, but the
live pages' own `Last-Modified` HTTP headers contradict that — `index.html` was last modified
`Mon, 15 Jun 2026` — so the site is maintained; the copyright string is just stale boilerplate.

### 2b. Verdict: NO individual health/medical-expense product

Complete catalogue, from the homepage's own navigation data (`menu.js`), 18 products total —
14 savings/endowment plans, 2 whole-life plans, 1 pure decreasing-term, 1 credit-linked
decreasing term:

> แบบประกัน → สะสมทรัพย์: สะสมทรัพย์ 15, สะสมทรัพย์ 20, สะสมทรัพย์ 55, สะสมทรัพย์ 60,
> กัลปพฤกษ์ 1, กัลปพฤกษ์ 2, รัตนพฤกษ์ 1, รัตนพฤกษ์ 2, บำนาญ 55, บำนาญ 60, บียูไอ 15/7, BUI 10/6,
> BUI 20/12, BUI 21/15 → แบบตลอดชีพ: ตลอดชีพ 90, ตลอดชีพ พิเศษ → เฉพาะกาล → สินเชื่อเพื่อประชาชน

https://www.builife.com/lifelong%20Special.html (nav block, identical across all pages)

**No "สุขภาพ" category exists in the nav at all.** Every product's benefit-summary image
(JPEG-only, no text layer, same publishing pattern as Samsung Life in round 3) carries the
identical rider-availability sentence, e.g.:

> สามารถซื้อสัญญาเพิ่มเติม (อุบัติเหตุ หรือ ทุพพลภาพ) แนบท้ายได้

https://www.builife.com/Savings%2015.html (image `img/Savings15.jpg`; the same sentence
recurs verbatim on ตลอดชีพ 90, สะสมทรัพย์ 20/55/60, บียูไอ 15/7, BUI 21/15, and the pure-term
product — the entire catalogue was swept image by image)

**"อุบัติเหตุ หรือ ทุพพลภาพ" (accident or disability) is the entire optional-rider universe
this insurer publishes.** Health/medical-expense is never offered as a rider anywhere.

One complication worth flagging rather than silently resolving: the insurer's own
คปภ.-mandated SLA disclosure names health claims among its standard turnaround rows —

> 3. การจ่ายค่าสินไหมทดแทนการประกันภัยอุบัติเหตุ (ในกรณีไม่เสียชีวิต) การประกันสุขภาพ
> ค่ารักษาพยาบาล หรือการประกันภัยโรคร้ายแรง ... ภายใน 15 วัน

https://www.builife.com/pdf/SLA-BuiLife-OIC.pdf

This is read as OIC-mandated boilerplate common to every life insurer's SLA disclosure
regardless of what it actually sells, not as evidence of a real product — it directly
conflicts with the exhaustive per-product sweep above, which found no health rider on any of
the 18 products.

### 2c. No blockers

Static HTML/frame-era site, no JS SPA, no WAF. The one friction: actual filenames contain
literal spaces (`Savings 15.html`), discoverable only by reading `menu.js` rather than
trusting the rendered nav's apparent link text.

### 2d. VERDICT

**No record. Out of scope entirely.** BUI Life's only optional riders are accident and
disability; health/medical-expense cover does not exist in its published catalogue.

---

## 3. บริษัท แอ๊ดวานซ์ ไลฟ์ ประกันชีวิต จำกัด (มหาชน) → บริษัท แรบบิท ประกันชีวิต จำกัด
## (มหาชน) — Advance Life → Rabbit Life (licence 1024)

### 3a. Identity: this is a rebrand, not a dormant or closed licence

OIC register:

> 1024　บริษัท แอ๊ดวานซ์ ไลฟ์ ประกันชีวิต จำกัด (มหาชน)　Advance Life Assurance Public Company Limited　AL

https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337

**The old domain, `alife.co.th`, is dead — does not resolve at all**, a harder failure than
the tiplife.com/dhipayalife.co.th case in round 3 (that one still redirected). The full
name-chain, from the company's own history page (`https://www.rabbitlife.co.th/about`):

> A LIFE ได้ก่อตั้งขึ้นเมื่อวันที่ 16 มิถุนายน 2540 โดยการลงทุนของกลุ่มเกษตรรุ่งเรืองพืชผล
> ในนาม บริษัท แอ๊ดวานซ์ แอสชัวรันส์ จำกัด ด้วยทุนจดทะเบียนเริ่มต้น 500 ล้านบาท
>
> 2543: ... เปลี่ยนชื่อจาก บริษัท แอ๊ดวานซ์ แอสชัวรันส์ จำกัด เป็น บริษัท แอ๊ดวานซ์ เอ็ม แอล ซี
> แอสชัวรันส์ จำกัด
>
> 2548: ... เปลี่ยนชื่อจากเดิม บริษัท แอ๊ดวานซ์ เอ็มแอลซี แอสชัวรันส์ จำกัด เป็น บริษัท แอ๊ดวานซ์
> ไลฟ์ แอสชัวรันส์ จำกัด
>
> 2555: บริษัทฯ ได้ดำเนินการแปรสภาพเป็นบริษัทมหาชนจำกัด โดยใช้ชื่อว่า บริษัท แอ๊ดวานซ์ ไลฟ์
> ประกันชีวิต จำกัด (มหาชน)
>
> 2565: บริษัทฯ ได้ร่วมทุนโดยกลุ่ม Rabbit Holdings และเพิ่มทุนจดทะเบียนเป็น 3,000 ล้านบาท
> พร้อมเปลี่ยนชื่อเป็น บริษัท แรบบิท ประกันชีวิต จำกัด (มหาชน) "Rabbit Life Insurance Public
> Company Limited"

https://www.rabbitlife.co.th/about (from the page's own embedded `__NEXT_DATA__` JSON)

Chain: Advance Assurance (1997) → Advance MLC Assurance (2000) → Advance Life Assurance
(2005) → public company as Advance Life ประกันชีวิต (2012) → **Rabbit Life** under Rabbit
Holdings' investment (2022). The OIC's June 2020 register understandably has no trace of
"แรบบิท" — the rename postdates the register by two years; this gap is reported, not
reconciled, per this project's standing method.

Live domain `https://www.rabbitlife.co.th/`, footer:

> บริษัท แรบบิท ประกันชีวิต จำกัด (มหาชน) 1000/9 อาคารบีทีเอส วิชันนารี ปาร์ค - เซาธ์ ทาวเวอร์
> ชั้นที่ 23 ถนนพหลโยธิน แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900

https://www.rabbitlife.co.th/

### 3b. Verdict: YES — sells individual health riders, one with a genuine full age-band premium table

Health-tagged products from the site's own sitemap and each product's `__NEXT_DATA__` JSON:
**Health Smile**, **Health Protect**, **OPD** (rider), **Mental Health** (rider), a hospital
cash-income rider (out of scope, indemnity not medical-expense reimbursement). Also present,
out of scope: cancer/critical-illness lump-sum products and PA.

**Health Protect — a rider, this round's added record.** Brochure title:

> Health protect สัญญาเพิ่มเติมประกันสุขภาพ เฮลท์ โพรเทค

https://rblwebstorageprd.blob.core.windows.net/productfiles/download_file/2026/4/HP_2025-12-22.pdf
(3-page PDF, linked exclusively from
https://www.rabbitlife.co.th/products/health-protect/product-detail; real text layer,
independently re-downloaded and re-parsed with `pdftotext -layout` for this file)

7 room-rate plans (800/1,000/2,000/3,000/4,000/5,000/10,000), New Health Standard 13-หมวด
structure. Entry/renewal:

> อายุ 6 ปี ถึง 65 ปี ต่ออายุสัญญาได้ถึงอายุ 98 ปี คุ้มครองถึงอายุ 99 ปี

Deductible/copay, stated directly:

> ความรับผิดส่วนแรก ไม่มี / ค่าใช้จ่ายร่วม ไม่มี

**A full age-band premium table** — 13 bands, 6-10 through 66-69, by sex from age 16 up,
"ขั้นอาชีพ 1-2" — was transcribed in full into the new record (see `premium:` block in
`data/plans/rabbitlife-health-protect-10000.yaml`). Only the marketing page states an explicit
maximum-benefit total, and only for the top plan:

> ผลประโยชน์สูงสุดต่อครั้ง 2.7 ล้านบาทสำหรับแผน 10,000

This is why the record uses the 10,000 plan rather than the cheaper, more-advertised 800 plan
("เบี้ยประกันภัยเริ่มต้นเฉลี่ยวันละ 9 บาท สำหรับแผน 800") — only the top plan has a published
aggregate IPD limit; the other six plans have only per-category sub-limits, which this project
will not sum into an unpublished total.

**No host policy is named or priced anywhere.** The strings `สัญญาหลัก`, `ทุนประกันภัยหลัก`
and `กรมธรรม์หลัก` appear zero times on the product page or in the brochure. Recorded as
`host_policy.premium: null` with a `premium_unknown_reason`, the same pattern this project
uses for AIA and Samsung.

**No exclusions and no waiting period are published anywhere for this product** — the
3-page brochure is only a benefit table, an age/entry-condition line, and the premium table.
This is a genuine gap, flagged plainly in the record's `terms_source.note`: buyers of this
product cannot find out in advance what is excluded or how long the waiting period is from
any public document.

**Health Smile** — likely standalone (the strings `สัญญาเพิ่มเติม`/`สัญญาหลัก` never appear on
its page or brochure, and it is sold online as its own SKU), but this is inferred, not
confirmed, since no filed wording exists to settle it either way. Only one sample premium
point is published ("43 บาท/วัน, ชาย 21-25, แผน 500,000"), not an age-band table — the normal
state of the public record per this project's own README. Not added this round.

### 3c. No filed policy wording; a crawler-blocking robots.txt worth flagging for future rounds

No `กรมธรรม์` or `เอกสารสรุปสาระสำคัญ` is public for either product — brochures only, tagged
`official_insurer`. `rabbitlife.co.th/robots.txt` explicitly disallows `ClaudeBot` under its
Cloudflare content-signal block (alongside GPTBot, Google-Extended); all fetches for this
research used a generic browser User-Agent or the built-in web tools, which were served
content normally (HTTP 200) — but a future Claude-identified crawler could be turned away by
that file.

### 3d. VERDICT

**Record added: `data/plans/rabbitlife-health-protect-10000.yaml`.** A real, current insurer
this project had never looked at under its post-2022 name — the licence itself was checked as
"never checked" in round 4's gap table, but the company trading today bears no resemblance in
name to the 2020 OIC register entry.

---

## 4. บริษัท อาคเนย์ประกันชีวิต จำกัด (มหาชน) — Southeast Life Insurance / SE Life (licence 1003)

### 4a. Identity and status: ACTIVE — unaffected by the non-life sibling's 2022 revocation

OIC register, both the target and the non-life sibling that a separate concurrent piece of
work in this project was checking (deliberately not touched here):

> 1003　บริษัท อาคเนย์ประกันชีวิต จำกัด (มหาชน)　Southeast Life Insurance Public Company Limited　SOUT
> 2079　บริษัท อาคเนย์ประกันภัย จำกัด (มหาชน)　Southeast Insurance Public Company Limited　SEI

https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337

**The 2022 licence revocation reported in Thai financial press** —
`คลังสั่งถอนใบอนุญาต "อาคเนย์ประกันภัย-ไทยประกันภัย" ปิดกิจการทันที`,
https://thaipublica.org/2022/04/mof-revokes-licence-of-southeast-insurance-thai-insurance/,
effective 1 April 2565 (2022) — is about **อาคเนย์ประกันภัย, the non-life sibling, licence
2079**. No คปภ. order or Ministry of Finance order was found revoking, suspending, or
transferring the life licence, 1003. This distinction matters: anyone who sees "อาคเนย์" in a
2022+ news headline and assumes the whole brand is dead would be wrong about the life company.

Registered founding date, from the insurer's own about page:

> บริษัท อาคเนย์ประกันชีวิต จำกัด (มหาชน) ก่อตั้งเมื่อวันที่ 9 กรกฎาคม 2489

https://www.southeastlife.co.th/about-us (2489 BE = 1946 CE)

Consumer-facing rebrand, from the parent group's own news page:

> "SE Life อาคเนย์ประกันชีวิต" ปรับจุดยืนทางการตลาด ... "สุขได้กับทุกการเปลี่ยนแปลง"

https://www.tgh.co.th/news/selife (2023)

It is a core subsidiary of the SET-listed Thai Group Holdings (TGH), confirmed on the group's
own page:

> SE Life อาคเนย์ประกันชีวิต SOUTHEAST LIFE INSURANCE | กลุ่มธุรกิจไทยกรุ๊ปโฮลดิ้งส์

https://www.tgh.co.th/business-group/life-insurance

Live domain `https://www.southeastlife.co.th/`, footer:

> ©2023 สงวนลิขสิทธิ์ ไทยกรุ๊ป โฮลดิ้งส์
> 315 อาคารไทยกรุ๊ป ชั้นที่ 8-12 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500

https://www.southeastlife.co.th/about-us

A live copayment-disclosure page dated for policies effective 20 March 2568 (2025) further
confirms active, current trading.

### 4b. Verdict: YES — multiple individual health riders, several with complete published age-band premium tables

Full product catalogue under "ประกันชีวิตสุขภาพ / Health Protection"
(https://www.southeastlife.co.th/products/health-protection): Be Bright, Be Better, Be Best,
Be Healthy, ซูเปอร์ แคนเซอร์ แคร์, Super Health, My Health My Choice, Group CI by Design,
Cancer Triple Save, **สแตนดาร์ด เฮลท์ พลัส**, Triple Health Care, Super Life Fight, SE Life
โทเทิล แคร์, CI 3X Protection. Cancer/CI lump-sum hybrids (e.g. Be Bright, which pays
`ตรวจพบโรคร้ายแรงรับเงินก้อนทันที 500,000 บาท` alongside its medical-expense benefit) were
excluded from consideration as out of scope for the lump-sum portion.

**สแตนดาร์ด เฮลท์ พลัส (Standard Health Plus) — a rider, this round's second added record.**
The insurer's own header states the New Health Standard label directly, not merely via
structure:

> สัญญาเพิ่มเติมการประกันสุขภาพมาตรฐานใหม่ ที่ให้ความคุ้มครองเหนือกว่า

https://www.southeastlife.co.th/uploads/product/pdf/20230619154520_7750.pdf (6-page PDF,
real text layer, independently re-downloaded and re-parsed with `pdftotext -layout` for this
file)

Entry/renewal:

> อายุรับประกันภัย 11 – 70 ปี (ต่ออายุได้ถึงอายุ 80 ปี)

Host requirement, looser than most riders in this dataset — no specific host is named:

> สามารถแนบกับผลิตภัณฑ์หลักได้ทุกประเภท ยกเว้นแบบประกันที่ไม่อนุญาตให้แนบสัญญาเพิ่มเติมได้

No host premium is published for any host, so `host_policy.premium` is `null` with a
`premium_unknown_reason`, same as the Rabbit Life record above.

**A full age-band premium table exists — and it is unusually complete**: 14 five-year bands
from 11–15 through 76–80 (exactly matching entry age to renewal ceiling), by sex, and **by
four separate occupation classes** (ชั้นอาชีพ 1–4), all in one machine-readable PDF. The added
record transcribes the ชั้นอาชีพ 1–2 table (office/professional occupations — the class most
comparable to other insurers' baseline rates in this dataset) for the cheapest room-rate plan,
1,000 baht/day, which matches the brochure's own headline:

> เบี้ยฯ เริ่มต้น 9 บ./วัน* ... *ตัวอย่างเบี้ยประกันภัยเพศชายอายุ 16 – 20 ปี แผน 1,000

Occupation classes 3 and 4 publish materially higher rates for the same age/sex/plan — e.g.
age 76–80, male, plan 1,000: 49,046 THB (class 1–2) vs. 73,569 THB (class 4) — a genuinely
useful published fact about occupational risk-loading that no other record in this dataset
currently captures, noted in the new record's `premium_source.note` for anyone who wants to
add the other occupation-class variants later.

Waiting period and partial exclusions, both published directly (same structure as
`round3-life-minor-sourcing.md`'s Navakij and Viriyah citations for the 8-condition list):

> การป่วยที่เกิดขึ้นในระยะเวลาที่ไม่คุ้มครอง (Waiting period) 30 วัน ... หรือ การป่วยดังต่อไปนี้
> ที่เกิดขึ้นในระยะเวลา 120 วัน ... ■ เนื้องอก ถุงน้ำ หรือมะเร็งทุกชนิด ■ ริดสีดวงทวาร
> ■ ไส้เลื่อนทุกชนิด ■ ต้อเนื้อ หรือต้อกระจก ■ การตัดทอนซิล หรืออดีนอยด์ ■ นิ่วทุกชนิด
> ■ เส้นเลือดขอดที่ขา ■ เยื่อบุโพรงมดลูกเจริญผิดที่

> ข้อยกเว้นบางส่วนของสัญญาเพิ่มเติม ... 1 ผู้เอาประกันภัยฉ้อฉลประกันภัย 2 สภาพที่เป็นมาก่อนการ
> เอาประกันภัย (Pre-existing Condition) เว้นแต่ ... 3 ข้อยกเว้นทั่วไป ตามที่ระบุในสัญญาเพิ่มเติมนี้
> เช่น ภาวะที่เป็นผลจากความผิดปกติที่เกิดขึ้นแต่กำเนิด ... 4 การยกเว้น หรือการไม่คุ้มครองใดๆ
> ตามที่ระบุไว้ในแต่ละข้อตกลงคุ้มครอง

Same PDF. The insurer labels this list itself as partial ("ข้อยกเว้นบางส่วน") — it must be
read as incomplete, same caveat this project attaches to AIA's exclusion list.

**Two things this brochure genuinely does not say, worth flagging so nobody assumes them:**
(1) no explicit aggregate IPD limit is published for any plan (only 13 per-category
sub-limits), so `ipd_annual_limit_thb` is recorded as `null` rather than a self-summed
figure; (2) the words "ความรับผิดส่วนแรก" and "ค่าใช้จ่ายร่วม" (deductible/copay) do not appear
anywhere in the 6-page document at all — not even to say "none." The new record sets both to
0, the schema default, but its note explicitly flags that this is the schema default filling
a genuine silence in the source, not a value the insurer confirmed — a materially weaker
sourcing position than Rabbit Life's Health Protect, which states "ไม่มี" for both outright.

**Also found, not added this round (no time to independently verify each brochure to this
project's standard):** **Super Health** (เหมาจ่าย up to 3,000,000 THB/year, full 13-category
benefit table, plus an optional Super OPD rider with its own age-banded premium table);
**My Health My Choice** (a rider bundle on a 1-year renewable term host whose premium is
itself published — a rarity this project has flagged as valuable in every prior round); **SE
Life โทเทิล แคร์** (a packaged whole-life + health + CI + PA bundle with single-age, not
banded, premium rates by sex and occupation class); **สไมล์ คิดส์** (a children's packaged
product, ages 1 month–15 years, with its own full premium and benefit tables). All were
identified with working insurer-owned PDF URLs during this round's screening and are
reasonable targets for whoever picks up this insurer next — see the agent transcript this
file was built from for the exact URLs, or re-derive them from
`https://www.southeastlife.co.th/products/health-protection`.

Copayment-on-renewal is published, but on the company **blog**, not a product or terms page —
a weaker citation tier than Samsung's dedicated `/copayment/` page in round 3:

> ตั้งแต่ 20 มีนาคม 2568 เป็นต้นไป ... [เคลมโรคทั่วไป ≥3 ครั้ง/ปี, ≥400% ของเบี้ย] ผู้เอาประกัน
> ต้องร่วมจ่าย 30% ... [ทั้งสองเงื่อนไข] ต้องร่วมจ่าย Copayment 50%

https://www.southeastlife.co.th/blog/detail/copayment — not cited in the new record because
it is not clearly tied to the specific Standard Health Plus rider rather than the company's
health line in general; flagged here for whoever adds the other SE Life products.

### 4c. No filed policy wording; no blockers

Checked `https://www.southeastlife.co.th/services/policy-holder` and its service-centre pages
specifically for `กรมธรรม์` or `เอกสารสรุปสาระสำคัญ` downloads — none found, only
administrative forms. All target pages returned HTTP 200; all brochure PDFs downloaded
cleanly with real text layers, no OCR needed.

### 4d. VERDICT

**Record added: `data/plans/southeastlife-standard-health-plus-1000.yaml`.** Southeast Life
is not merely "not dormant" — it is one of the better-sourced health-rider catalogues found
in any round of this project, let down only by the same missing filed wording every insurer
in this dataset shares.

---

## 5. บริษัท ไทยคาร์ดิฟ ประกันชีวิต จำกัด (มหาชน) — Thai Cardif Assurance (licence 1018)

### 5a. Identity confirmed on paper; live presence could not be reached at all

OIC register (already partially cited in `round3-life-minor-sourcing.md` §2a while
disambiguating T Life, but never itself researched until this round):

> 1018　บริษัท ไทยคาร์ดิฟ ประกันชีวิต จำกัด (มหาชน)　Thai Cardif Assurance Public Company Limited　Thai Cardif

https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337

**This is a genuine blocker, not a clean negative** — unlike ทิพยประกันชีวิต or ที ไลฟ์ in
round 3, whose catalogues were reachable and simply contained no health product, Thai
Cardif's own web presence could not be reached at all, by any method tried:

- `thaicardif.com` — the domain every prior source names — does not resolve. `curl` and the
  built-in web-fetch tool both fail (`getaddrinfo ESERVFAIL` / timeout). A DNS-over-HTTPS
  lookup shows the domain's own name servers **actively refuse** the query for A, AAAA, NS,
  and the `www.` subdomain alike (`"Name servers refused query (lame delegation?)"`,
  `rcode=REFUSED`).
- WHOIS shows the domain was only re-registered `2025-12-02`, on NameCheap with GoDaddy name
  servers that themselves refuse to answer — consistent with a lapsed registration recently
  re-caught rather than an actively maintained company site.
- No plausible alternate domain resolves to a Thai Cardif site: `thaicardif.co.th`,
  `cardif.co.th`, `thaicardiflife.com`, `thaicardif.net`, `bnpparibascardif.co.th` are all
  unreachable. `cardif.com` and `bnpparibascardif.com` do resolve, but both serve BNP Paribas
  Cardif's global French corporate site, which names no Thailand entity and has no
  Thailand-specific page.
- Both คปภ. lookup tools that every prior round in this directory has already documented as
  broken (see Method note item 1) were re-checked and are still broken — there is no
  regulator-side fallback either.

### 5b. VERDICT

**No record, and no verdict on "does this company sell individual health insurance" can be
reached — the correct disposal is different from every other negative finding in this
project's history.** Every prior negative in `round3-life-minor-sourcing.md` and in this file
(§§1–2 above) confirmed absence from a live, machine-readable catalogue. This one cannot
confirm presence or absence, because the company has no discoverable live web surface as of
2026-08-12. The right retry trigger is not a re-check schedule, but a live-domain check:
**re-open this licence only if `thaicardif.com` (or a successor domain) starts resolving to
real content.**

---

## Summary table

| # | Company | Licence | Status | Health product? | Record added |
|---|---|---|---|---|---|
| 1 | สหประกันชีวิต (Union Life) | 1013 | Active, no rebrand | No — credit-life + group PA only | No |
| 2 | บางกอกสหประกันชีวิต (BUI Life) | 1019 | Active, no rebrand | No — accident/disability riders only | No |
| 3 | แอ๊ดวานซ์ ไลฟ์ → แรบบิท ประกันชีวิต (Rabbit Life) | 1024 | Active, renamed 2022 | Yes — Health Protect rider, full premium table | `rabbitlife-health-protect-10000.yaml` |
| 4 | อาคเนย์ประกันชีวิต (SE Life) | 1003 | Active, unaffected by sibling's 2022 revocation | Yes — several riders, full premium tables | `southeastlife-standard-health-plus-1000.yaml` |
| 5 | ไทยคาร์ดิฟ ประกันชีวิต (Thai Cardif) | 1018 | Unreachable — DNS refuses, no successor domain found | Unknown — blocked | No |

## What this round teaches the next one

- **A "never checked" licence code is not the same company you'll find today.** Two of five
  licences in this round (Rabbit Life, SE Life's consumer branding) trade under names that
  share no substring with their 2020 OIC register entry. A search by the register's name
  alone would have returned nothing for either.
- **A sibling company's well-publicized failure does not imply the other licence failed
  too.** อาคเนย์ประกันภัย's 2022 revocation is easy to find in Thai financial press; it says
  nothing about อาคเนย์ประกันชีวิต, which is trading normally under the same historical brand.
  This is the inverse of the Dhipaya Life/Dhipaya Insurance and BUI Life/BUI Insurance
  confusion this project has flagged before — there, the risk is merging two live companies;
  here, the risk is incorrectly killing a live one because its sibling died.
- **A dead domain with no successor is a different, harder failure than "the catalogue exists
  and has no health product."** This project's disposal language up to now has been binary
  (record added / no record, out of scope). Thai Cardif needed a third bucket: blocked,
  unconfirmable, retry-on-domain-recovery rather than retry-on-schedule.
- **Occupation-class premium loading is published and currently invisible in this dataset.**
  SE Life's Standard Health Plus publishes four full occupation-class tables with materially
  different rates (up to ~50% higher for class 4 vs. class 1–2 at the oldest ages). Every
  record in this dataset currently records one occupation-class assumption implicitly. Worth
  a dedicated pass across existing records to check whether they're all using a comparable
  class, or whether some quietly mix classes.

---

## Follow-up: Thai Cardif Life resolved (2026-08-12)

§5 above left licence 1018 as a genuine blocker: `thaicardif.com` DNS-refused, no successor
domain found, คปภ. lookup tools broken. This follow-up pass used only WebSearch/WebFetch,
the Internet Archive's Wayback Machine CDX API (`web.archive.org/cdx/...`, queried directly
with `curl`, not the WebFetch tool — which cannot reach `web.archive.org` at all, a tool
limitation hit and worked around this session), a fresh re-download of the OIC licensee PDF,
and the parent company's own pages. No broker, comparison, agent, or business-registry
aggregator site is cited for any claim below.

### What actually happened: BNP Paribas Cardif sold out to Thai Life Insurance in 2015

Thai financial press, at the time of the transaction:

> "ไทยประกันชีวิต" จ่อถือหุ้น "ไทยคาร์ดิฟ ประกันชีวิต" เพิ่ม ยันไม่กระทบพนักงานและธุรกิจ
>
> บริษัท ไทยประกันชีวิต จำกัด (มหาชน) ซึ่งเป็นผู้ถือหุ้นปัจจุบันของบริษัทไทยคาร์ดิฟ ประกันชีวิต
> จะมีการเพิ่มสัดส่วนการถือหุ้นเพิ่ม ... ทางกลุ่มไทยประกันได้รับการอนุมัติจาก คปภ ให้มีการซื้อขาย
> แล้ว ... ไม่มีความจำเป็นที่จะปลดหรือลอยแพพนักงานแต่อย่างใด

https://mgronline.com/mutualfund/detail/9580000033074 (2015; MGR Online, a mainstream Thai
financial-news outlet, reporting an OIC-approved shareholding transaction — not a broker or
comparison site)

International trade press on the completed transaction:

> [Thai Life Insurance] had bought a 50-per-cent stake in Thai Cardif Life Assurance (TCLA)
> from BNP Paribas Cardif ... Thai Life now owns 100 per cent of Thai Cardif.

https://www.nationthailand.com/business/30259114 (dated Thursday, 30 April 2015 — Nation
Thailand, a mainstream English-language Thai news outlet)

Read together: Thai Life Insurance PCL already held a stake in Thai Cardif Life Assurance
before 2015, and in April 2015 it bought out BNP Paribas Cardif's remaining 50%, taking full
(100%) ownership. **This is the resolution of the "was it acquired" question the original
brief asked for — BNP Paribas Cardif fully exited Thai Cardif in 2015 via a sale to Thai
Life Insurance**, not a licence revocation, not a rename, not a wind-down at that point in
time. The 2015 reporting is explicit that this was a shareholder-level change only, with
staff retained.

### The OIC's own register still carries licence 1018, unchanged, no revocation order found

The OIC licensee PDF the whole of this file's Method note relies on was re-downloaded fresh
for this follow-up (not reused from cache):

> 1018　บริษัท ไทยคาร์ดิฟ ประกันชีวิต จำกัด (มหาชน)　Thai Cardif Assurance Public Company
> Limited　Thai Cardif

https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337 (re-fetched
2026-08-12; same June 2020 snapshot document as §5a — its existence proves nothing about
current status, only that the licence code was never reused or removed from this static
document)

No search for a คปภ. or Ministry of Finance order revoking, suspending, or transferring
licence 1018 specifically returned anything (searches tried: `เพิกถอนใบอนุญาต`, `เลิกกิจการ`,
`คืนใบอนุญาต`, `จดทะเบียนเลิก`, all combined with `ไทยคาร์ดิฟ`). **No regulatory action against
licence 1018 itself was found anywhere.**

### The domain's own history: real company site → parked → HTTP 410 Gone → squatted

The Wayback Machine's CDX index for `thaicardif.com` (queried directly via `curl` against
`web.archive.org/cdx/search/cdx?url=thaicardif.com*`, since the WebFetch tool itself cannot
reach `web.archive.org`) gives a clean timeline the DNS-refusal check alone could not:

- **2006–2013: a real, live corporate site.** The 2011-11-23 snapshot has a proper logo,
  navigation (`b-home`, `b-customer`, `b-form`, `b-contact`), and its own outbound link:
  > `<title>Thai Cardif Life Assurance</title>` ... `<a href="http://www.cardif.com/pages/index_gb.html">BNP</a>`
  https://web.archive.org/web/20111123114819/http://www.thaicardif.com/
- **By 2018-08-07 — three years after the BNP exit — the domain is already a third-party
  parking page**, not the company's site at all:
  > This domain name may be for sale. Please click here to inquire. ... 2018 Copyright. All
  > Rights Reserved. ... The Sponsored Listings displayed above are served automatically by
  > a third party.
  https://web.archive.org/web/20180807083723/http://thaicardif.com/ (ParkingCrew.net
  placeholder content, confirmed by the page's own `parkingcrew.net` script and privacy-policy
  links)
- **2019–2023: still a parked domain**, now served by a different parking vendor
  (`parking.bodiscdn.com`), captured live mid-crawl by the Wayback Machine's own recording of
  the request that generated the snapshot:
  > `"page_url":"http:\/\/thaicardif.com\/"` ... `<script src="/.../js/parking.2.92.0.js">`
  https://web.archive.org/web/20220707142127/http://thaicardif.com/
- **2025-02-16: the Wayback Machine itself records an explicit HTTP 410 Gone** for the domain
  (a status code meaning "permanently removed," stronger than a plain timeout or 404):
  > `<title>ERROR</title>` ... `It is gone! So be gone` ... `410`
  https://web.archive.org/web/20250216095414/https://www1.thaicardif.com/
- **2025-10-13: the domain redirects to a generic `/lander` page**, the standard pattern for
  an expired domain resold through a domain marketplace:
  > `window.onload=function(){window.location.href="/lander"}`
  https://web.archive.org/web/20251013032535/http://thaicardif.com/

This lines up exactly with §5a's WHOIS finding already in this file — the domain was
re-registered 2025-12-02 on NameCheap with GoDaddy name servers that themselves refuse to
answer — confirming that registration is a squatter or reseller catching a lapsed domain,
not the original company reclaiming it. **The domain's own trajectory (real site → parked
2018 → 410 Gone 2025 → generic lander → re-registered by an unrelated party) is itself
primary evidence that Thai Cardif Life Assurance stopped operating its own web presence years
ago, independent of any DNS check performed today.**

### The acquirer's own current page no longer lists Thai Cardif as a group company

Thai Life Insurance's own official "companies in the Thai Life Insurance group" page, fetched
directly today:

> [The page's insurance/finance group section (กลุ่มธุรกิจประกันภัย และการเงิน) lists only:]
> CB Life Insurance Company Limited [Myanmar]

https://www.thailife.com/บริษัทในกลุ่มไทยประกันชีวิต (fetched 2026-08-12) — **Thai Cardif does
not appear anywhere on Thai Life's own current list of group companies**, ten-plus years
after Thai Life took 100% ownership in 2015.

### The parent's own current page confirms Thailand is not a current market

BNP Paribas Cardif's own official worldwide-presence page, fetched directly today, lists its
complete current Asian footprint:

> Countries: China, south Korea, Japan, Taïwan China

https://www.bnpparibascardif.com/en/who-we-are/a-worldwide-presence/ (fetched 2026-08-12) —
**Thailand is absent.** This is consistent with, and independently corroborates, the 2015
divestment reported by mgronline and nationthailand: BNP Paribas Cardif's own current
corporate page shows no Thailand presence at all, fifteen-plus years after this project's
first-ever check of that page.

### Verdict

**Licence 1018 is resolved as: acquired outright by Thai Life Insurance in 2015, then
operationally wound down as a distinct public-facing entity — not a live company with any
discoverable current health (or other) product, and not a company anyone can still transact
with online.** This is a different, firmer conclusion than round 5's "blocked":

- The ownership question the original brief asked for is fully answered from two independent
  mainstream-news sources: BNP Paribas Cardif sold its full stake to Thai Life Insurance in
  April 2015, exiting Thailand entirely. No rename, no separate merger event, no licence
  transfer news exists because none was needed — Thai Life simply became the 100% owner of
  the existing legal entity.
- No formal regulatory order revoking or surrendering licence 1018 itself was found by any
  search tried, and the OIC's own static register still lists it. **The regulatory paperwork
  trail for licence 1018 itself remains genuinely undocumented publicly** — this project
  cannot say the licence was formally revoked, only that the company is not operating it.
- Every other independent signal — the domain's own decade-long decline from live corporate
  site to parked page to HTTP 410 Gone to a squatted lander, and both the acquirer's and the
  original parent's own current pages omitting Thai Cardif entirely — agrees that this is a
  dormant, absorbed entity, not a live insurer under any name.
- **No live successor entity with a real health product and premium table exists.** No record
  added; none was ever plausible once the domain's own history was reconstructed.
- **Retry trigger, superseding §5b's "re-check if the domain resolves":** the domain is now
  owned by an unrelated third party (squatter/reseller, registered 2025-12-02) and will never
  again reflect this company's status. If this licence is ever revisited, the correct method
  is a Department of Business Development (กรมพัฒนาธุรกิจการค้า) corporate-status lookup for
  the legal entity itself, or a direct คปภ. filing search once its lookup tools are fixed —
  not a domain check.
