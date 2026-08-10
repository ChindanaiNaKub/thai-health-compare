# Round 3 sourcing: eight Thai non-life insurers not previously examined

Research date: 2026-08-10. Scope: individual health insurance from eight Thai **non-life**
insurers, none of which appears in any existing file in this directory. Same rules as
`standalone-health-sourcing.md` and `round2-insurers-sourcing.md`: every claim is followed
by the verbatim Thai it rests on and the exact URL that Thai lives on. Only insurer-owned
domains, insurer-hosted documents and คปภ./OIC were used. No agent, broker or comparison
site is cited for anything, premiums included.

Insurers checked, in the order given in the brief: ธนชาตประกันภัย (Thanachart),
นวกิจประกันภัย (Navakij), กรุงไทยพานิชประกันภัย (KPI), ฟอลคอนประกันภัย (Falcon),
แอลเอ็มจี ประกันภัย (LMG), มิตรแท้ประกันภัย (Mittare), ชับบ์สามัคคีประกันภัย (Chubb Samaggi),
เจมาร์ทประกันภัย (Jaymart). Sections below are ordered by value found, not by that list.

**Outcome: one viable record out of eight — นวกิจประกันภัย ประกัน ๕ ยอด, which publishes a
complete thirteen-band annual premium table from age 11 to 75 for five plan tiers plus a
second complete table for its OPD buy-up.** That is the third insurer in this entire
project to publish a whole rate card, after ไทยประกันสุขภาพ and ทิพย. The other seven are
dead ends, and one of them is a dead end in the strongest possible sense: **แอลเอ็มจี
ประกันภัย no longer exists.** It amalgamated into ชับบ์สามัคคีประกันภัย on 2 March 2026,
five months before this pass, and its website has gone with it — see §4, which is the
single most useful thing in this file because it stops the next person from spending a day
on a company that is not there.

## Method note

Four separate extraction problems, and they matter for anyone re-checking these.

1. **Navakij's product-detail PDF is not UTF-8 and not the usual ำ problem.** It embeds a
   legacy PSL/TIS-620 font whose bytes `pdftotext -layout` emits as cp1252, so Thai comes
   out as `àºÕ้Â»ÃÐ¡Ñ¹`. Re-mapping those bytes through cp874 recovers almost all of it,
   but the recovery still drops the ์ mark and ญ (so `ผลประโยชน์` reads `ผลประโยชน`,
   `แผนเบญจ` reads `แผนเบ⃞จ`, `ปี` reads `ป⃞`). Quotes taken from that PDF are marked
   `[sic: extraction]` and reproduced as recovered. **Digits are unaffected in every case**,
   which is what matters for the rate tables, and the whole premium grid was re-extracted
   independently a second time to confirm. Where the same sentence also appears in plain
   HTML on Navakij's product page, the HTML version is quoted instead and is exact — that
   covers all of the underwriting conditions, the waiting periods and the exclusions.
2. **Chubb's amalgamation notice has the classic ำ problem.** `pdftotext -layout` drops the
   vowel, so `จำกัด` extracts as `จากัด` and `ข้อกำหนด` as `ข้อกาหนด`. Marked
   `[sic: extraction]` in §4.
3. **Falcon publishes its entire benefit schedule as a JPEG**, not as text or a PDF. The
   tables in §5 were read from the images at
   `cms.falconinsurance.co.th/wp-content/uploads/2022/11/Health-LTR-Plan_coverage_coverage.jpg`
   and `.../Health-OX-Plan_coverage_coverage.jpg`. Those images are in English, not Thai —
   which is itself the finding about Falcon.
4. **Thanachart's site is ASP.NET with `__doPostBack` navigation and no crawlable product
   URLs**; its health menu item had to be resolved by replaying the postback with
   `__VIEWSTATE`. Its `sitemap.xml` is stamped `<lastmod>2015-01-26</lastmod>` on every
   entry.

Where WebFetch returned 403 or the host refused a normal client, requests were repeated
with `curl -sSLk -A "Mozilla/5.0 (X11; Linux x86_64) ... Chrome/126.0 Safari/537.36"`.
`www.mittare.com` resets the connection when curl sends `-L`; requests without `-L`
succeed.

---

## 1. นวกิจประกันภัย — ประกัน ๕ ยอด (VIABLE RECORD, with one field that cannot be filled)

Product page: https://www.navakij.co.th/th/products/miscellaneous-insurance/ประกัน-๕-ยอด-มีไว้ยอดเยี่ยม-หมดห่วงเรื่องประกัน
Product-detail PDF: https://www.navakij.co.th/public/core/uploaded/insurance/file/95625a78cb596c44869408c9a708651b.pdf
(7 pages, revision stamp `Rev.ALL5YOD_20251215_3`)
Application form: https://www.navakij.co.th/public/core/uploaded/insurance/file/6e090badbb984f641e62a81084052df4.pdf

### 1a. It is individual medical-expense health cover, standalone, and the insurer says so

The page's own `<title>` is `ประกันสุขภาพลดหย่อนภาษีได้`, and the underwriting block opens:

> เงื่อนไขการรับประกัน (โดยสังเขป) ตามสัญญาประกันสุขภาพและอุบัติเหตุนวกิจส่วนบุคคล :
> สำหรับ : ลูกค้ากรมธรรม์ฯ รายบุคคล

Source: https://www.navakij.co.th/th/products/miscellaneous-insurance/ประกัน-๕-ยอด-มีไว้ยอดเยี่ยม-หมดห่วงเรื่องประกัน

`รายบุคคล` — individual, not group. There is no life policy anywhere in the flow and no
host premium to hunt for; Navakij is a non-life insurer and this is a general insurance
policy bought on its own. `host_policy: null` is correct and `type: standalone` is correct.

Marketing name versus filed name, published by the insurer itself:

> 14. แผนประกัน ๕ ยอด เป็นชื่อทางการตลาดของการประกันภัยสุขภาพและอุบัติเหตุนวกิจส่วนบุคคล

Same URL. So the filed product is **การประกันภัยสุขภาพและอุบัติเหตุนวกิจส่วนบุคคล** and
`ประกัน ๕ ยอด` is the shop window. Record both, the way `round2` §4.2 records Thai Life's
two names.

It is not a visa plan and cannot be used as one:

> 3. ผู้ขอเอาประกันต้องมีสัญชาติไทย และมีถิ่นพำนักในประเทศไทยเท่านั้น
> 5.1 ค่ารักษาพยาบาล ภายในอาณาเขตประเทศไทย

Same URL. Thai nationals only, Thailand-only medical cover. This is the exact inverse of
Falcon in §5.

### 1b. The complete premium table — the reason this section exists

Thirteen bands, five plan tiers, THB per year, stamp duty included. Table heading verbatim
`[sic: extraction]`:

> เบี้ยประกัน (บาทต�อป�)
> อายุ … แผนเอก แผนโท แผนตรี แผนจตุ แผนเบ⃞จ

Source: https://www.navakij.co.th/public/core/uploaded/insurance/file/95625a78cb596c44869408c9a708651b.pdf p.4

**Base plan (IPD, includes accident OPD and dental; excludes general OPD), THB/year:**

| อายุ | แผนเอก | แผนโท | แผนตรี | แผนจตุ | แผนเบญจ |
|---|---|---|---|---|---|
| 11-15 | 18,739 | 21,248 | 23,881 | 25,769 | 27,354 |
| 16-20 | 15,517 | 17,477 | 19,522 | 20,994 | 22,225 |
| 21-25 | 13,512 | 15,090 | 16,717 | 17,893 | 18,872 |
| 26-30 | 11,899 | 13,234 | 14,609 | 15,609 | 16,438 |
| 31-35 | 12,130 | 13,432 | 14,753 | 15,718 | 16,513 |
| 36-40 | 12,833 | 14,236 | 15,662 | 16,703 | 17,561 |
| 41-45 | 14,263 | 15,918 | 17,616 | 18,854 | 19,878 |
| 46-50 | 16,119 | 18,169 | 20,307 | 21,865 | 23,158 |
| 51-55 | 17,420 | 19,939 | 22,634 | 24,596 | 26,235 |
| 56-60 * | 22,046 | 25,648 | 29,582 | 32,445 | 34,847 |
| 61-65 * | 28,694 | 33,114 | 37,853 | 41,317 | 44,205 |
| 66-70 * | 33,948 | 39,301 | 45,045 | 49,248 | 52,750 |
| 71-75 * | 42,907 | 50,031 | 57,723 | 63,336 | 68,026 |

> \* (ต�ออายุเท�านั้น) `[sic: extraction]` — renewal only

Unisex. There is no male/female split anywhere in the document, which puts Navakij with
ไทยประกันสุขภาพ and against FWD and BLA.

> 2. เบี้ยประกันข้างต้นรวมอากรแสตมป์แล้ว

Source: https://www.navakij.co.th/th/products/miscellaneous-insurance/ประกัน-๕-ยอด-มีไว้ยอดเยี่ยม-หมดห่วงเรื่องประกัน

**OPD buy-up, a separate additive premium, same thirteen bands, THB/year:**

Heading verbatim `[sic: extraction]`:

> OPD ความคุ�มครองที่สามารถเลือกซื้อเพิ่มได�
> เบี้ยประกัน OPD (บาทต�อป�)

| อายุ | แบบที่1 (800) | แบบที่2 (1,000) | แบบที่3 (1,200) | แบบที่4 (1,500) | แบบที่5 (2,000) |
|---|---|---|---|---|---|
| 11-15 | 5,664 | 7,080 | 8,496 | 10,620 | 14,160 |
| 16-20 | 5,108 | 6,385 | 7,662 | 9,578 | 12,770 |
| 21-25 | 4,656 | 5,820 | 6,984 | 8,730 | 11,640 |
| 26-30 | 4,316 | 5,395 | 6,474 | 8,093 | 10,790 |
| 31-35 | 4,084 | 5,105 | 6,126 | 7,658 | 10,210 |
| 36-40 | 3,952 | 4,940 | 5,928 | 7,410 | 9,880 |
| 41-45 | 3,928 | 4,910 | 5,892 | 7,365 | 9,820 |
| 46-50 | 4,016 | 5,020 | 6,024 | 7,530 | 10,040 |
| 51-55 | 4,208 | 5,260 | 6,312 | 7,890 | 10,520 |
| 56-60 * | 4,508 | 5,635 | 6,762 | 8,453 | 11,270 |
| 61-65 * | 4,912 | 6,140 | 7,368 | 9,210 | 12,280 |
| 66-70 * | 5,428 | 6,785 | 8,142 | 10,178 | 13,570 |
| 71-75 * | 6,048 | 7,560 | 9,072 | 11,340 | 15,120 |

Note the OPD curve is the opposite shape from the IPD curve: it *falls* from age 11 to a
minimum at 41-45 and only then rises, and even at 71-75 it is barely above the price at
age 11. Do not average the two tables together.

The rate card carries its own expiry, printed on the page:

> 18. หนังสือเสนอราคาฉบับนี้มีผลบังคับภายในวันที่ 31 ธันวาคม 2569

Source: https://www.navakij.co.th/th/products/miscellaneous-insurance/ประกัน-๕-ยอด-มีไว้ยอดเยี่ยม-หมดห่วงเรื่องประกัน

That is an insurer stamping a hard expiry date on its own price list — better than
ไทยประกันสุขภาพ's soft three-year forecast in `round2` §1b, and it is the natural
`verified_on` re-check trigger for this record.

### 1c. Entry ages and renewal ceiling — both published, in one sentence

> 3. ผู้ขอเอาประกันต้องมีสัญชาติไทย และมีถิ่นพำนักในประเทศไทยเท่านั้น และมีอายุแรกเข้า 11 - 55 ปี บริบูรณ์ (คำนวณจาก วัน เดือน ปี เกิด) และสามารถต่ออายุกรมธรรม์ฯ ได้ถึงอายุ 75 ปี บริบูรณ์

Same URL. `entry_age_min: 11`, `entry_age_max: 55`, `renewal_ceiling_age: 75`. That clears
the schema's `renewal_ceiling_age > entry_age_max` refinement with room to spare, and it is
internally consistent with the rate table, where every band from 56 upward is marked
`ต่ออายุเท่านั้น`. This is the field that killed TIP ชิลชิล in `standalone-health-sourcing.md`
§2; Navakij simply publishes it.

### 1d. Copay is zero today and is a reserved right at renewal — published as a mechanism

> 16.3 ปีต่ออายุกรมธรรม์ บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขข้อตกลงความคุ้มครองโดยอาจเพิ่มเงื่อนไขให้ผู้เอาประกันภัยมีค่าใช้จ่ายร่วม (Copayment)

Same URL. No percentage, no trigger, no threshold — unlike ไทยประกันชีวิต in `round2` §4.1,
which publishes all three. So `copay_percent: 0` and `copay_on_renewal` carries that
sentence verbatim, which is exactly the shape the field was designed for.

The premium-adjustment clause underneath it is unusually specific about who approves it:

> 16.2 ค่าใช้จ่ายในการรักษาพยาบาลที่สูงขึ้น หรือจากประสบการณ์การจ่ายค่าสินไหมทดแทนโดยรวมของพอร์ตโฟลิโอ (Portfolio) กรมธรรม์ประกันภัยนี้ โดยบริษัทจะแจ้งให้ผู้เอาประกันภัยทราบล่วงหน้า เป็นลายลักษณ์อักษรทางไปรษณีย์ลงทะเบียน หรือวิธีการอื่นที่ผู้เอาประกันภัยให้ความยินยอม ไม่น้อยกว่า 30 วัน ทั้งนี้ เบี้ยประกันภัยที่มีการปรับจะอยู่ในอัตราที่ได้รับความเห็นชอบจากนายทะเบียนไว้แล้ว

Same URL. Two things worth recording. First, repricing is at **portfolio** level, not at
the individual's claims history — materially better for the reader than ไทยประกันสุขภาพ's
up-to-100% personal loading (`round2` §1e) or ทิพย's per-claimant adjustment
(`standalone-health-sourcing.md` §1c). Second, Navakij binds itself to rates already
approved by นายทะเบียน. But the insurer also reserves the right to withdraw the plan
outright:

> 17. บริษัทฯ ขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไข หรือยกเลิกแผนประกัน ๕ ยอด โดยไม่ต้องแจ้งให้ทราบล่วงหน้า

### 1e. The limit basis is per confinement, and there is no annual ceiling at all

The benefit table's own title, printed above every column of figures `[sic: extraction]`:

> แบบกำหนดผลประโยชนต�อการพักรักษาเป�นผู�ป�วยในครั้งใดครั้งหนึ่ง

Source: https://www.navakij.co.th/public/core/uploaded/insurance/file/95625a78cb596c44869408c9a708651b.pdf pp.1-4

`ipd_limit_basis: per_confinement`. And this is the one field that blocks a clean record:
**Navakij publishes no single IPD ceiling.** There is no `วงเงินสูงสุดต่อปี` and no
`ผลประโยชน์สูงสุดต่อการเข้าพักรักษาตัวครั้งใดครั้งหนึ่ง` headline figure. What exists is a
per-หมวด schedule of sub-limits, each one per confinement, with only categories 9, 10 and 11
carrying `ต่อรอบปีกรมธรรม` — the same annual/per-confinement split ไทยประกันสุขภาพ has
(`round2` §1f) and FWD Prima Care has.

The re-admission rule that defines ครั้งใดครั้งหนึ่ง is the standard 90-day one, and Navakij
states it in clean HTML:

> 8. ค่ารักษากรณีการพักรักษาเป็นผู้ป่วยครั้งใดครั้งหนึ่ง ซึ่งรวมถึงค่าใช้จ่ายต่อเนื่องมาจากสภาวะและอาการแทรกซ้อนที่เกี่ยวข้อง หรือต่อเนื่องกัน ผู้เอาประกันสามารถเบิกค่ารักษาพยาบาลโรคเดิมได้แต่ต้องเว้นระยะเวลาจากการรักษาในครั้งก่อน 90 วัน

Source: https://www.navakij.co.th/th/products/miscellaneous-insurance/ประกัน-๕-ยอด-มีไว้ยอดเยี่ยม-หมดห่วงเรื่องประกัน

The nearest thing to a headline number is the high-cost top-up layer, which does carry a
per-injury/per-illness ceiling `[sic: extraction]`:

> ผลประโยชนเพิ่มเติม การรักษาการบาดเจ็บหรือการป�วยที่มีค�าใช�จ�ายสูง
> - จ�ายผลประโยชนเพิ่ม 90% ของจำนวนเงินที่ต�องจ�ายจริง เฉพาะส�วนที่เกินผลประโยชนของค�ารักษาพยาบาล กรณีผู�ป�วยใน
> สำหรับค�าใช�จ�ายที่คุ�มครองต�อการบาดเจ็บหรือการป�วยแต�ละครั้ง
> ค�าใช�จ�ายที่คุ�มครองเฉพาะ หมวดที่ 2-5 แต�ไม�รวมค�าใช�จ�าย ข�อ 4.5

= 300,000 / 400,000 / 500,000 / 600,000 / 700,000 for เอก / โท / ตรี / จตุ / เบญจ.

**That figure must not be recorded as `ipd_annual_limit_thb`.** It is a 90% coinsurance
top-up above the base schedule, it excludes หมวด 1 (room), it excludes item 4.5 (organ
transplant), and it is per illness, not per year. Recording it flat would repeat exactly the
mistake `round2` §1g warns about for ไทยประกันสุขภาพ Excellency. The honest entry is
`ipd_annual_limit_thb: null` with the schedule reproduced in `terms_source.note`.

There is also a hard aggregate across all Navakij health policies one person may hold:

> 13. ผู้ขอเอาประกันภัยสามารถซื้อกรมธรรม์ประกันสุขภาพทุกแผนจากบริษัทฯ ได้มากกว่าหนึ่งกรมธรรม์ฯ แต่ผลประโยชน์รวมสูงสุดไม่เกินวงเงิน 2 ล้านบาท

Same URL.

### 1f. Room and board, and the rest of the schedule

Verbatim `[sic: extraction]`, from the same PDF p.1:

> หมวดที่ 1 ค�าห�อง ค�าอาหาร และค�าบริการโรงพยาบาล ต�อการเข�าพักรักษาเป�นผู�ป�วยในครั้งใดครั้งหนึ่ง สูงสุดต�อวัน
> - ห�องผู�ป�วยปกติ (สูงสุดไม�เกิน 45 วัน)
> - ห�องผู�ป�วยวิกฤต ICU (สูงสุดไม�เกิน 15 วัน)

| | แผนเอก | แผนโท | แผนตรี | แผนจตุ | แผนเบญจ |
|---|---|---|---|---|---|
| ห้องผู้ป่วยปกติ /night, max 45 nights | 1,500 | 2,700 | 4,200 | 5,200 | 6,000 |
| ห้อง ICU /night, max 15 nights | 3,000 | 5,400 | 8,400 | 10,400 | 12,000 |
| หมวด 2 (2.1-2.4 combined) | 16,000 | 32,000 | 42,000 | 52,000 | 70,000 |
| หมวด 3 ค่าแพทย์ตรวจรักษา /day, max 45 days | 400 | 600 | 900 | 1,200 | 1,500 |
| หมวด 4 surgery (4.1-4.4) | 22,000 | 42,000 | 52,000 | 72,000 | 80,000 |
| หมวด 4.5 ผ่าตัดเปลี่ยนอวัยวะ | 44,000 | 84,000 | 104,000 | 144,000 | 160,000 |
| หมวด 5 Day Surgery | 10,000 | 16,000 | 21,000 | 26,000 | 35,000 |
| หมวด 6 pre/post-IPD | 10,000 | 10,000 | 10,000 | 10,000 | 10,000 |
| หมวด 7 accident OPD within 24h /occurrence | 2,500 | 4,200 | 5,200 | 7,200 | 7,500 |
| หมวด 8 เวชศาสตร์ฟื้นฟู | 10,000 | 10,000 | 10,000 | 10,000 | 10,000 |
| หมวด 9 ไตวายเรื้อรัง, ต่อรอบปีกรมธรรม์ | 10,000 | 10,000 | 10,000 | 10,000 | 10,000 |
| หมวด 10 รังสีรักษา, ต่อรอบปีกรมธรรม์ | 10,000 | 10,000 | 10,000 | 10,000 | 10,000 |
| หมวด 11 เคมีบำบัด, ต่อรอบปีกรมธรรม์ | 10,000 | 10,000 | 10,000 | 10,000 | 10,000 |
| หมวด 12 ค่าบริการรถพยาบาลฉุกเฉิน | 2,000 | 2,000 | 2,000 | 2,000 | 2,000 |
| หมวด 13 ผ่าตัดเล็ก | 10,000 | 10,000 | 10,000 | 10,000 | 10,000 |
| high-cost top-up, 90% above the above, per illness | 300,000 | 400,000 | 500,000 | 600,000 | 700,000 |
| ชดเชยรายวัน มะเร็ง/หัวใจ per day (max 30 days/yr) | 500 | 600 | 700 | 900 | 1,000 |
| ชดเชยรายวัน annual cap | 15,000 | 18,000 | 21,000 | 27,000 | 30,000 |
| ทันตกรรม, สูงสุดต่อปี | 1,500 | 1,500 | 1,500 | 1,500 | 1,500 |
| ประกันอุบัติเหตุ อบ.2 | 20,000 | 20,000 | 20,000 | 20,000 | 20,000 |

Room and board on แผนเอก is 1,500 a night with a **45-night** cap, which is meaner than it
first looks — ไทยประกันสุขภาพ SP1500 gives the same 1,500 for 60 nights (`round2` §1g).
`room_board_thb_per_night` is fillable but the night cap must go in the note.

Note the last two rows: this product is a health-plus-PA composite, not pure medical. The
`อบ.2` accident cover and the cancer/heart hospital cash are bundled in, not optional. Say so
in the record's Thai description; the reader is buying two things.

### 1g. OPD annual cap — the usual absence

> ค�ารักษาพยาบาล กรณีผู�ป�วยนอก (สูงสุดไม�เกิน 1 ครั้งต�อวัน และ 30 ครั้งต�อป�) `[sic: extraction]`

= 800 / 1,000 / 1,200 / 1,500 / 2,000 per visit for แบบที่ 1 to 5.

Per-visit cap and a visit count, never an annual total — the identical pattern to ทิพย in
`standalone-health-sourcing.md` §1g. `opd_annual_limit_thb: null` with that reason, because
multiplying by 30 is arithmetic Navakij has not published. On a base-plan-only record the
value is `0`, and that zero is real: OPD is
`ความคุ้มครองผู้ป่วยนอกสามารถเลือกซื้อเพิ่มได้` — a buy-up that is genuinely absent unless
purchased.

### 1h. New health standard — structurally yes, verbally never

The schedule runs `หมวดที่ 1` through `หมวดที่ 13` in the exact 2564 order, splits them into
`ผลประโยชนกรณีผู�ป�วยใน` and `ผลประโยชนกรณีไม�ต�องเข�าพักรักษาตัวเป�นผู�ป�วยใน`, and uses
`การผ�าตัดให⃞�ที่ไม�ต�องเข�าพักรักษาตัวเป�นผู�ป�วยใน (Day Surgery)` and `หมวดย่อย 4.5`
`[sic: extraction throughout]`. The phrase **มาตรฐานประกันสุขภาพแบบใหม่ appears nowhere** in
the PDF, the application form or the product page. Same call as MTI and ไทยประกันสุขภาพ:
`new_health_standard: true` on the structure, with a note that the phrase is inferred from
the category scheme and not quoted.

### 1i. Waiting periods and pre-existing conditions — published in clean HTML

> 6.1 การป่วยใด ๆ ที่เกิดขึ้นในระยะเวลา 30 วัน นับแต่วันเริ่มมีผลคุ้มครองตามกรมธรรม์ประกันนี้เป็นครั้งแรก หรือวันที่บริษัทอนุมัติให้เพิ่มผลประโยชน์ของกรมธรรม์ประกันนี้ แล้วแต่กรณีใดจะเกิดขึ้นภายหลัง
> 6.2 การป่วยดังต่อไปนี้ที่เกิดขึ้นในระยะเวลา 120 วัน … - เนื้องอก ถุงน้ำ หรือมะเร็งทุกชนิด - ริดสีดวงทวาร - ไส้เลื่อนทุกชนิด - ต้อเนื้อ หรือต้อกระจก - การตัดทอนซิล หรืออดีนอยด์ - นิ่วทุกชนิด - เส้นเลือดขอดที่ขา - เยื่อบุโพรงมดลูกเจริญผิดที่

Source: https://www.navakij.co.th/th/products/miscellaneous-insurance/ประกัน-๕-ยอด-มีไว้ยอดเยี่ยม-หมดห่วงเรื่องประกัน

`waiting_period_days: 30`, with the 120-day list and its eight named conditions in the note.
Standard eight — identical to Viriyah, AXA and ไทยประกันสุขภาพ.

The 5-and-3 pre-existing rule, verbatim and complete:

> 3.2 โรคเรื้อรัง การบาดเจ็บหรือการป่วย (รวมถึงภาวะแทรกซ้อน) นั้น ไม่ปรากฏอาการ ไม่ได้รับการตรวจรักษาหรือวินิจฉัยโดยแพทย์หรือไม่ได้พบหรือปรึกษาแพทย์
> - ในช่วงระยะเวลา 3 ปี ตั้งแต่วันที่กรมธรรม์ประกันภัยนี้เริ่มมีผลบังคับเป็นครั้งแรก
> - ในระยะเวลา 5 ปี ก่อนวันที่กรมธรรม์ประกันภัยนี้ เริ่มมีผลบังคับเป็นครั้งแรก

Same URL. Congenital conditions carry the standard one-year-and-age-16 carve-out; pregnancy
is excluded except choriocarcinoma; HIV and STDs excluded; eighteen health exclusions in
total plus five general ones, all in clean HTML on the page.

### 1j. Filed wording — NOT PUBLISHED, and the page says so

Navakij publishes exactly two documents per product: `ใบคำขอ` (a blank application form)
and `รายละเอียดผลิตภัณฑ์` (this sales sheet). No กรมธรรม์ and no เอกสารสรุปสาระสำคัญ exists
on the domain. The page defers to a document it does not publish:

> 12. เงื่อนไขความคุ้มครอง และข้อยกเว้นเป็นไปตามกรมธรรม์ประกันภัยสุขภาพและอุบัติเหตุส่วนบุคคล

And the PDF repeats it `[sic: extraction]`:

> หมายเหตุ : 1. โปรดศึกษารายละเอียดเงื่อนไข ข�อยกเว�นอื่น ๆ โดยรายละเอียดตามกรมธรรมประกันภัยสุขภาพและอุบัติเหตุส�วนบุคคล

Checked for a wording: all eight product pages under
https://www.navakij.co.th/th/products/miscellaneous-insurance (full `href="*.pdf"` inventory
extracted from each), https://www.navakij.co.th/th/products,
https://www.navakij.co.th/th/about-us/disclosure-in-accordance-with-the-oic-office-of-insurance-commission-regulations
(only OIC financial forms `ปผว 1 รายไตรมาส 1/2569`, `ปผว 1 รายปี 2568`), and
https://www.navakij.co.th/sitemap.xml which returns `404 Page Not Found`. So
`terms_source.tier` is `official_insurer`, not `filed_wording` — same position as every
record in this repo except the ไทยประกันสุขภาพ ones.

Mitigating: the exclusion list on the HTML page is unusually complete for a sales page —
eighteen health exclusions, five general, a separate OPD-only list and a separate PA-only
list of thirteen. That is more than AIA, FWD or BLA publish anywhere. It is still labelled
`(โดยสังเขป)`, so it must be recorded as partial.

### 1k. Deductible — does not exist

The string `ความรับผิดส่วนแรก` does not occur on the product page, in the product-detail PDF
or in the application form. `deductible_thb: 0`, and that zero is a fact, not an absence.

### 1l. VERDICT

**Viable.** Every required schema field is fillable from published Navakij sources:
`premium` (full 13-band table), `entry_age_min` 11, `entry_age_max` 55,
`renewal_ceiling_age` 75, `room_board_thb_per_night`, `deductible_thb` 0, `copay_percent` 0,
`copay_on_renewal` (verbatim 16.3), `waiting_period_days` 30, `exclusions`,
`new_health_standard` true, `type` standalone, `host_policy` null.

The one field that cannot be honestly filled is `ipd_annual_limit_thb`, which must be `null`
because Navakij publishes a per-หมวด per-confinement schedule and no ceiling — see §1e. The
schema permits `null` there without a reason string, which in this case is a gap worth
noticing: a reader looking at a plan with a blank IPD limit and a 68,026-baht premium at age
73 deserves the sentence explaining why. Recommend putting it in `terms_source.note` until
the schema grows a `ipd_limit_unknown_reason`.

Five files, one per plan tier (เอก / โท / ตรี / จตุ / เบญจ), plus a decision about whether
the OPD buy-up is a sixth axis or a note. Recommend a note: the base plan is the product,
and five plans × five OPD options would be twenty-five records of one policy.

---

## 2. ชับบ์สามัคคีประกันภัย (NOT INCLUDED — the non-life arm sells no full health policy)

Chubb operates two Thai entities on one domain and the brief's target is the non-life one.
Chubb says which is which on its own landing page:

> ให้ประกันสุขภาพจาก ชับบ์ ไลฟ์ ช่วยดูแลคุณ ด้วยแบบประกันสุขภาพคุ้มครองค่ารักษาพยาบาลและผ่าตัด ประกันชดเชยรายได้ และประกันโรคร้ายแรง

Source: https://www.chubb.com/th-th/personal/

Full medical-expense cover at Chubb Thailand is a **ชับบ์ ไลฟ์** line, sold as riders. The
six products under `ประกันสุขภาพ` on that page are:

> ประกันสุขภาพ สัญญาเพิ่มเติมค่ารักษาพยาบาลและผ่าตัด(รพ.) เฮลท์ พรีเมียม เอ็กซ์ตร้า
> ประกันสุขภาพ สัญญาเพิ่มเติมค่ารักษาพยาบาลและผ่าตัด(รพ.) เฮลท์ ดีไลท์ พลัส
> ประกันสุขภาพ สัญญาเพิ่มเติมชดเชยการรักษาพยาบาลรายวัน (สร.) ฟิต
> ประกันสุขภาพ สัญญาเพิ่มเติมการประกันภัยโรคร้ายแรง 50 โรค
> ประกันสุขภาพ Basic Work & Play
> ประกันชดเชยรายได้ Hospital Stay Double Pay

Same URL. Four of the six are `สัญญาเพิ่มเติม` — riders on a Chubb Life policy, therefore
out of this file's non-life scope and a `type: rider` question for a different pass. Of the
two that Chubb Samaggi itself underwrites:

**ประกันสุขภาพ Basic Work & Play** (https://www.chubb.com/th-th/personal/health-office-syndrome.html)
is a **named-condition plan, not full health cover**, and Chubb's own description says so:

> Basic Work & Play แผนประกันสุขภาพเวิร์ก ๆ ที่เข้าใจคนวัยทำงานยุคใหม่ที่คุ้มค่า ปรับเลือกแผนความคุ้มครองได้เหมาะกับไลฟ์สไตล์ จ่ายค่าเบี้ยเท่าที่จำเป็น เน้นดูแลโรคกลุ่มโรคยอดฮิตอย่างออฟฟิศซินโดรม พร้อมเพิ่มความคุ้มครองเสริมได้ สำหรับโรคติดเชื้อระบบทางเดินหายใจ/ทางเดินอาหาร โรคไต โรคมะเร็ง และโรคร้ายแรงต่าง ๆ

`เน้นดูแลโรคกลุ่มโรคยอดฮิตอย่างออฟฟิศซินโดรม` — it covers a named list, not illness
generally. Same category as นวกิจ's ประกันออฟฟิศซินโดรม พลัส and out of scope for the same
reason. Entry `รับประกันภัยสำหรับผู้ที่มีอายุ 20-60 ปี และสามารถต่ออายุได้ถึง 70 ปี`,
premium published only as `เดือนละ 690 บาท` — monthly, no age attached, the same disposal as
Viriyah in `standalone-health-sourcing.md` §3 and AXA SmartCare Value in `round2` §2b. No
กรมธรรม์ or สรุปสาระสำคัญ PDF is linked from the page.

**ประกันชดเชยรายได้ Hospital Stay Double Pay**
(https://www.chubb.com/th-th/personal/hospital-stay-double-pay.html) is hospital cash —
`ประกันชดเชยรายได้` in its own name — not medical-expense cover.

The third Chubb Samaggi personal health-adjacent product,
`ประกันภัยโรคมะเร็ง มะเร็งเบาใจ` (https://www.chubb.com/th-th/personal/cancer-baojai.html),
is single-disease.

**Verdict: out of scope.** Chubb Samaggi sells no full individual health policy. Its health
line is one named-condition plan, one cancer plan and one hospital-cash plan. The full
medical cover exists at Chubb Life and is a rider. Blocking field if anyone wants Basic Work
& Play anyway: no annual premium and no age-band table.

---

## 3. ฟอลคอนประกันภัย (NOT INCLUDED — all three health products are visa-gated and in English)

Product listing: https://falconinsurance.co.th/accident-health

Falcon has exactly three products in the `ประกันสุขภาพ` family, and every one of them is
sold only to a foreigner applying for a specific Thai visa. Their own conditions:

> 1.1 The insured wishes to apply for Thailand's Long Term Resident Visa.

Source: https://falconinsurance.co.th/accident-health/health-ltr-plan

> 1.1 The insured wishes to apply for Thailand's Non-Immigrant O-X Visa.
> 1.2 Insured must be between 50 – 70 years old (can be renewed up to 80 years old)

Source: https://falconinsurance.co.th/accident-health/health-o-x-plan

> 1.1 The insured wishes to apply for Thailand's Non-Immigrant Visa O-A.
> 1.2 Insured must be between 50 – 70 years old (can be renewed up to 80 years old)
> for plan 4 and plan 5 : Insured must be between 50 – 75 years old (can be renewed up to 80 years old)

Source: https://falconinsurance.co.th/accident-health/ismart-health-oa

These are real health policies — the coverage images run Sections 1 to 13 of the 2564
category structure, with per-annual-policy IPD ceilings of 3,000,000, deductibles of
50,000 / 50,000 / 100,000 per treatment, `Copayment: Nil`, OPD at 1,500 / 2,000 / 2,000 per
visit `1 time per day, max. 30 times`, and a 100,000 PA layer. But the entire product page,
the entire benefit table and the entire terms block are in **English only**, and the
purchase requires `Application form and Copy of passport` plus a visa the reader does not
have. There is no Thai-language product content beyond the nav label.

**The blocking field is the premium.** Falcon publishes only a starting price with a single
age band attached to it:

> 📍 Start THB 5,080 per year (Age 50-59 years old for Plan 6)

Source: https://falconinsurance.co.th/accident-health/ismart-health-oa

> Start THB13,102 per year (Age 20-39 years old for Plan2)

Source: https://falconinsurance.co.th/accident-health/health-ltr-plan

> Start THB23,235 per year (Age 50-59 years old for Plan4)

Source: https://falconinsurance.co.th/accident-health/health-o-x-plan

and then states that the table it will not print exists:

> 2. Insurance premiums will increase according to age band.

Same three URLs. The only CTA is `สอบถามราคาเบี้ยประกัน`, a lead-capture form (คำนำหน้า,
ชื่อ, นามสกุล, เบอร์โทรศัพท์, อีเมล, เพศ, อายุ). Same disposal as AXA in `round2` §2b: a
number obtained by submitting personal details to a sales funnel is a quote, not a
publication.

**Falcon's Thai-market health products have been withdrawn from the site.** The nav on
https://falconinsurance.co.th/accident-health lists nine products and only these three are
health; Pro Health, Super Save and New iSmart Health — all of which appear in Falcon's own
search-indexed page titles — now return **HTTP 500** at
`/accident-health/pro-health`, `/accident-health/super-save` and their `/en/` mirrors.
Falcon's `/download` page carries no product PDFs.

**Verdict: out of scope on category (visa-gated foreigner plans, not general individual
health), and blocked on premium regardless.** Retry lead: if Falcon ever restores Pro Health
or Super Save, its benefit disclosure is unusually complete — full 13-section schedule with
explicit deductible and copay rows — and only the rate table would be missing.

---

## 4. แอลเอ็มจี ประกันภัย (NOT INCLUDED — the company no longer exists)

**This is the most useful finding in this pass, and it is a negative one.**

`www.lmginsurance.co.th` is NXDOMAIN. The bare `lmginsurance.co.th` resolves to
198.8.130.140 and then refuses the connection on both 80 and 443 (`ECONNREFUSED`, and 60-second
curl timeouts on repeated attempts). `lmginsurance.com` is a **different, unrelated US
insurance agency** on Squarespace — `A boutique agency serving you and your family with the
very best in property and casualty insurance … LMG is licensed across the country, in 23
states` — and must not be cited for anything about the Thai insurer. Only
`ebiz2.lmginsurance.co.th` still answers, and it returns HTTP 503 on its root while still
serving legacy static PDFs.

The reason is published, by the acquiring insurer, on its own domain:

> บริษัท ชับบ์สามัคคีประกันภัย จากัด (มหาชน) `[sic: extraction]`
> Chubb Samaggi Insurance Public Company Limited
> และ / and
> บริษัท แอลเอ็มจี ประกันภัย จากัด (มหาชน) `[sic: extraction]`
> LMG Insurance Public Company Limited
> ได้จดทะเบียนควบเข้ากันเป็ นบริษัทใหม่ภายใต้ชื่อ `[sic: extraction]`
> บริษัท ชับบ์สามัคคีประกันภัย จากัด (มหาชน) `[sic: extraction]`
> การควบบริษัทมีผลตั้งแต่วันที่ 2 มีนาคม 2569 เป็ นต้นไป `[sic: extraction]`
> The amalgamation takes effect from 2 March 2026.

Source: https://www.chubb.com/content/dam/chubb-sites/chubb-com/th-th/cl/amalgamation-announcement.pdf

Existing policyholders are unaffected:

> การควบเข้ากันของบริษัทในครั้งนี ้จะไม่กระทบต่อสิทธิและความคุ้มครองภายใต้กรมธรรม์ประกันวินาศภัยของท่าน กรมธรรม์ของท่านจะได้รับความคุ้มครองอย่างต่อเนื่องจากบริษัทใหม่ และมีผลครบถ้วนสมบูรณ์ตามข้อกาหนดและเงื่อนไขของกรมธรรม์ประกันภัยฉบับปัจจุบันตลอดระยะเวลาความคุ้มครอง `[sic: extraction]`

Same PDF. Chubb's live navigation carries a permanent section for them:

> ลูกค้าเดิม บมจ. แอลเอ็มจี ประกันภัย
> การเรียกร้องสินไหมประกันอุบัติเหตุและสุขภาพ

Source: https://www.chubb.com/th-th/personal/ (claims menu, present site-wide), with the
service hub at https://www.chubb.com/th-th/cl/customer-partner-services.html

LMG did sell individual health — `Universal Plus`, `Elite Plus` and the `Happy Health Plus`
family, all `Individual Health and Accident Insurance Policy` — and those pages were live
under `www.lmginsurance.co.th/en/health-insurance-*` and
`www.lmginsurance.co.th/sites/default/files/2022-12/Brochure Elite Plus 2022.pdf` until
recently. **They are unreachable today and there is no successor page**: Chubb Samaggi's own
`ประกันสุขภาพ` line does not include any LMG product (§2), so the plans have not been
migrated, only the claims handling.

**Verdict: dead, not merely undocumented.** No record should be attempted, and no LMG
product should be entered from any cached, archived or third-party copy — the schema's
`verified_on` semantics require a source a human can re-open, and there is none. If an LMG
health plan is wanted for historical reasons, the only legitimate current source is
Chubb Samaggi as successor, and Chubb is not selling it.

---

## 5. ธนชาตประกันภัย (NOT INCLUDED — no individual health product exists)

Thanachart's `ประกันสุขภาพ` menu is a header, not a product. Verbatim from its own HTML
sitemap:

> ประกันภัยทั่วไป ประกันภัยการเดินทาง ประกันภัยเดินทางต่างประเทศ ทราเวลโพรเทค ประกันสุขภาพ ประกันสุขภาพ โรคมะเร็ง ประกันภัยอื่น ประกันภัยบ้าน แฮปปี้โฮม

Source: https://www.thanachartinsurance.co.th/tnifrontend/sitemap.aspx

The header's only child is a **single-disease cancer plan that pays a lump sum**, not medical
expenses:

> ประกันสุขภาพ โรคมะเร็ง … ประกันโรคมะเร็ง เจอปุ๊บเราจ่ายทันที ไม่มีเหตุผล ชดเชยเต็มทุนประกัน เพื่อคุณ หายกังวล

Source: https://www.thanachartinsurance.co.th/tnifrontend/tniproductlist.aspx?ptid=2

`ชดเชยเต็มทุนประกัน` — lump sum on diagnosis. Category (c), and out of scope twice over.
It is not even hosted as a product page: resolving the ASP.NET postback lands on a redirect
shim at https://inquiry.thanachartinsurance.co.th/sl/ow/cancer/ and then on a lead form at
https://inquiry.thanachartinsurance.co.th/partnership?H=1&M=3, which publishes only:

> เงื่อนไขการรับประกัน : ผู้เอาประกันภัยต้องมีอายุไม่เกิน 54 ปี ในวันเลือกซื้อหรือทำประกันครั้งแรก และต่ออายุได้จนถึง 64 ปี

The footer link labelled `ประกันภัย สุขภาพ` points at
`https://www.thanachartinsurance.co.th/tnifrontend/fproductdetail.aspx?pid=uUF2YNZc1n8=`,
which 302-loops into `pagenotfound.aspx`.

**No premium of any kind is published** for the cancer plan — no table, no sample, no
calculator. Thanachart does run a live quote engine at
https://inquiry.thanachartinsurance.co.th/lead and an e-commerce site at
https://www.thanachartinsurance.co.th/ecommerce/, and both are **motor only**
(`ยี่ห้อรถยนต์ * … AUDI B.M.W. BYD …`). The footer's `คำนวณเบี้ยประกัน` link 302s to
`https://www.thanachart-insurance.co.th/motor-insurance/check-price`.

No filed wording: https://www.thanachartinsurance.co.th/tnifrontend/tnidownloadlist.aspx
offers only

> หมวดเอกสาร … กรุณาเลือก แบบฟอร์มเรียกร้องสินไหม แบบฟอร์มชำระเงิน ข่าวสาร นโยบาย

— claim forms and investor disclosures, no กรมธรรม์ and no สรุปสาระสำคัญ for anything.

**Verdict: no product to record.** Establishing this took sweeping
`tniproductlist.aspx?ptid=1..10,12,15,28` (only 1 and 2 return rows), the 132-URL
`sitemap.xml`, the download list, the e-commerce host and the two quote engines above.

---

## 6. กรุงไทยพานิชประกันภัย / KPI (NOT INCLUDED — PA only)

KPI's entire accident-and-health category contains two products, both personal accident.
Category page title verbatim:

> ประกันภัยอุบัติเหตุและสุขภาพ Archives - KPI

and its blurb, which promises accident medical only:

> หมดห่วงเรื่องอุบัติเหตุ ด้วยแผนประกันภัย ที่ออกแบบมาเพื่อดูแลคุณโดยเฉพาะ อุ่นใจครอบคลุมค่ารักษาพยาบาลจากอุบัติเหตุได้ครบ

Source: https://www.kpi.co.th/kpi/insurances/pa/

The two products:

> ประกันภัยอุบัติเหตุ PA Double Care — อุ่นใจเมื่อเกิดอุบัติเหตุ เพราะมีทุนประกันสูงถึง 1.5 ล้านบาท พร้อมค่าชดเชยรายวัน
> ประกันภัยอุบัติเหตุ PA Very Safe — แผนประกันอุบัติเหตุที่มีทุนประกันสูงถึง 3 ล้านบาท ดูแลค่ารักษาพยาบาลและค่าห้องพักสูงถึง 365 วัน

Same URL. PA Very Safe's benefit row that looks like health is qualified in its own text:

> 3. การรักษาพยาบาลทั่วไป เนื่องจากอุบัติเหตุ (รวมการขับขี่หรือโดยสารรถจักรยานยนต์)

Source: https://www.kpi.co.th/kpi/insurance/pa/very-safe/ — `เนื่องจากอุบัติเหตุ`. Accident
medical reimbursement, not sickness cover.

`https://www.kpi.co.th/kpi/insurance-sitemap.xml` contains 16 `<loc>` entries = 8 products ×
TH/EN, and lists no health product: two PA, three motor, one home, one SME, one park-tourist
travel. Premiums are published only as `เบี้ยเริ่มต้น 5,000 บาท` (Double Care) and
`เบี้ยเริ่มต้น 3,700 บาท` (Very Safe), with no age attached; the buy CTA is a login wall.
No กรมธรรม์ and no สรุปสาระสำคัญ exists anywhere on the domain — site search for
`สรุปสาระสำคัญ` returns nothing, zero `.pdf` links appear on either product page, and
`epolicy.kpi.co.th` returns HTTP 403 to every request.

**Verdict: out of scope. KPI sells no health insurance at all**, despite the category being
named `ประกันภัยอุบัติเหตุและสุขภาพ`. That naming is the trap; the products under it are PA.

---

## 7. มิตรแท้ประกันภัย (NOT INCLUDED — PA, hospital cash and single-disease only)

Mittare's complete product list, verbatim and in order, from
https://www.mittare.com/all-products/:

> ประกันภัยรถยนต์ / ประกันภัยอัคคีภัยที่อยู่อาศัย / ประกันภัยงานก่อสร้าง / ประกันภัยธุรกิจขนาดเล็ก / ประกันภัยชดเชยรายได้กรณีเข้ารักษาใน รพ. จากอุบัติเหตุ / ประกันภัยความเสี่ยงภัยทรัพย์สิน / ประกันภัยสำหรับผู้เล่นกอล์ฟ / ประกันภัยสำหรับผู้ขนส่ง / ประกันภัยอากาศยานซึ่งไม่มีนักบิน / ประกันภัยร้านทอง / ประกันภัยความรับผิดต่อบุคคลภายนอก / ประกันภัยอุบัติเหตุส่วนบุคคล (มิตรแท้) อบ.1 / ประกันภัยอุบัติเหตุส่วนบุคคล (มิตรแท้) อบ.2 / ประกันภัยบ้านมิตรแท้ / ประกันอัคคีภัย / ประกันภัย พ.ร.บ. LPG / ประกันภัย พ.ร.บ. NGV / ประกันภัย พ.ร.บ. น้ำมัน / ประกันภัยสินค้าที่ขนส่งภายในประเทศ (แบบระบุภัย) / ประกันภัยสินค้าที่ขนส่งภายในประเทศ (แบบคุ้มครองความเสี่ยงภัยทุกชนิด)

No ประกันสุขภาพ. The decisive corroboration is Mittare's own filed-form repository, headed

> คลังข้อมูล / คำขอประกันวินาศภัย — แหล่งรวมอย่างเป็นทางการสำหรับข้อมูลและแบบฟอร์มคำขอประกันวินาศภัยของ บมจ. มิตรแท้ประกันภัย

whose section headed `ประกันภัยอุบัติเหตุและสุขภาพ` lists, in full:

> AH1-AH 3 ใบคำขอเอาประกันภัยชดเชยรายได้ฯ จากอุบัติเหตุ(ปรับปรุง)
> CAD ข้อมูลสำหรับการขอเอาประกันภัยโรคมะเร็ง
> DHF ใบคำขอเอาประกันภัยคุ้มครองการเจ็บป่วยด้วยโรคไข้เลือดออก
> PA (แรงงานต่างด้าว) ข้อมูลสำหรับการทำประกันภัย อุบัติเหตุแรงงานต่างด้าว
> PAB ใบคำขอเอาประกันภัยผู้โดยสารเรือสำหรับโดยสาร
> PAG (กลุ่ม)ใบคำขอเอาประกันภัยอุบัติเหตุกลุ่ม
> PAI  ใบคำขอประกันภัยอุบัติเหตุส่วนบุคคล (มิตรแท้) (v.01)
> STD ใบคำขอเอาประกันภัยกรมธรรม์ประกันภัยอุบัติเหตุนักเรียน นิสิต นักศึกษา(มิตรแท้)
> TRI-TGU ข้อมูลการขอเอาประกันภัยอุบัติเหตุเดินทางสำหรับบุคคลและกลุ่มทั่วไป (V.01)
> คำรับรองสำหรับผู้ถือกรมธรรม์ประกันภัยกลุ่ม

Source: https://www.mittare.com/application-forms/

Every entry under Mittare's own "อุบัติเหตุและสุขภาพ" heading is PA, group PA, travel PA,
hospital cash or single-disease. **There is no medical-expense application form**, which is
about as direct as this evidence gets.

The AH product is accident-triggered daily cash, not medical expenses:

> คุ้มครองการบาดเจ็บเนื่องจากอุบัติเหตุรวมถึงอุบัติเหตุจากการขับขี่หรือโดยสารรถจักรยานยนต์ ทำให้ผู้เอาประกันภัยต้องเข้ารักษาตัวเป็นผู้ป่วยในในโรงพยาบาลหรือสถานพยาบาลเวชกรรม

Source: https://www.mittare.com/income-hospitalization-insurance/. Its premium is flat per
plan (`เบี้ยประกันภัยรวมภาษีและอากรแสตมป์ต่อคนต่อปี` = 400 / 480 / 760 for AH1/AH2/AH3), not
age-banded, with no ค่าห้อง, no IPD expense limit and no OPD. Cancer and dengue exist only as
application-form PDFs with no product page at all. The one Thai company search that
mentions health returns a staff benefit — `ประกันสุขภาพกลุ่ม` on the careers page, i.e.
Mittare buying group cover for its own employees.

Worth recording for a different reason: **Mittare publishes a genuine four-band age-banded
annual premium table** — for PA แผน PLV, sixteen plan variants, at
https://www.mittare.com/wp-content/uploads/2025/01/โบรชัวร์แผนประกันภัย-PLV_69-ปรับปรุงเริ่มใช้-20-กุมภาพันธ์-2569-เป็นต้นไป_01.pdf,
headed `เบี้ยประกันภัยรวมอากรแสตมปและภาษีมูลคาเพิ่มตอคนตอป (บาท)` `[sic: extraction]` with
bands `ชวงอายุ 3 - 19 ป`, `20 - 60`, `61 - 65`, `66 - 70 ปบริบูรณ`. It is a PA rate card, so
it is out of this project's scope, but it disproves any assumption that Mittare cannot
publish rates.

No กรมธรรม์ and no สรุปสาระสำคัญ: site search for `สรุปสาระสำคัญ` returns
`ดูเหมือนว่าเราจะไม่พบสิ่งที่คุณกำลังมองหา`, and both PA pages defer to an unpublished
document — `สรุปนี้เป็นเพียงข้อมูลเบื้องต้นเท่านั้น กรุณาอ่านรายละเอียดเพิ่มเติมในกรมธรรม์ประกันภัยอุบัติเหตุส่วนบุคคล(มิตรแท้)`.

**Verdict: out of scope. Mittare sells no health insurance.**

---

## 8. เจมาร์ทประกันภัย (NOT INCLUDED — health was children-only and is closed to new sales)

### 8a. Corporate identity and licence

Current legal name and registration, published by the company on its own site:

> บริษัท เจมาร์ท ประกันภัย จำกัด (มหาชน)
> 195/1 อาคาร JMT Office รามคำแหง ชั้นที่ 5 ถนนรามคำแหง แขวงราษฎร์พัฒนา เขตสะพานสูง กรุงเทพมหานคร 10240
> ทะเบียนเลขที่ / เลขประจำตัวผู้เสียภาษีอากร : 0107556000060

Source: https://www.jaymartinsurance.co.th/page/about-us/ (footer, repeated site-wide)

The brief's suspicion is correct: **this is a rebrand, not a new insurer.** Jaymart's own
site still runs its agent systems under the old initials — `ระบบ P&O`, `E-JP`,
`คู่มือโปรแกรม E-JP` alongside `E-JAYMART` (same URL) — and the company's alternate domain
is `jpinsurance.co.th`, i.e. **เจพี ประกันภัย**. Caveat stated plainly: the rebrand date
itself is reported only by Thai business press, which this file does not cite for facts, and
the company publishes no rebrand notice of its own that I could find. What is verifiable
from insurer-owned and OIC sources is (i) the current legal name and tax ID above, (ii) the
surviving `E-JP` / `jpinsurance.co.th` branding, and (iii) that **no company named
เจมาร์ท ประกันภัย appears in คปภ.'s standard reference-code index of non-life insurers**
(https://onlinewebadt.oic.or.th/ICRR_TFRS9/SRD/SRD00100/Download?keySource=337), which does
list all seven others in this pass — `2067 บริษัท ธนชาตประกันภัย จำกัด (มหาชน)`,
`2050 บริษัท นวกิจประกันภัย จำกัด (มหาชน)`, `2019 บริษัท กรุงไทยพานิชประกันภัย จำกัด (มหาชน)`,
`2024 บริษัท ฟอลคอนประกันภัย จำกัด (มหาชน)`, `2028 บริษัท แอลเอ็มจี ประกันภัย จำกัด (มหาชน)`,
`2016 บริษัท มิตรแท้ประกันภัย จำกัด (มหาชน)`, `2047 บริษัท ชับบ์สามัคคีประกันภัย จำกัด (มหาชน)`.
That index is evidently stale — it still carries LMG five months after LMG ceased to exist —
so its silence on Jaymart is not evidence of anything. The correct reading is: the OIC
index is not current enough to settle the question, and Jaymart's own pages are.

### 8b. Whether it sells individual health today — no, and the company says so

Jaymart's product menu has five entries and none of them is health:

> ประกันภัยอุบัติเหตุ / ประกันภัยการเดินทาง / ประกันอัคคีภัยและประกันร้านค้า (SME) / ประกันภัยอื่นๆ / ผลิตภัณฑ์ที่ปิดการขาย

Source: https://www.jaymartinsurance.co.th/page/home

The last of those is the decisive page. Verbatim, in full:

> ผลิตภัณฑ์ที่ปิดการขาย — ตรวจสอบประกันที่ปิดการขายได้ที่นี่
> ประกันภัยรถยนต์ EV — ปิดการขายเมื่อวันที่ 1 พฤษภาคม 2567
> ประกันภัยสุขภาพเด็ก Baby Smile Smart Care — ปิดการขายเมื่อวันที่ 1 มกราคม 2567
> ประกันภัยสุขภาพเด็ก Baby Smile Child Care — ปิดการขายเมื่อวันที่ 1 เมษายน 2566
> ประกันภัยสุขภาพเด็ก Baby Smile — ปิดการขายเมื่อวันที่ 10 กุมภาพันธ์ 2565
> ประกันภัยแพ้วัคซีนโควิด-19 พลัส — ปิดการขายเมื่อวันที่ 25 ธันวาคม 2564
> ประกันภัยแพ้วัคซีนโควิด-19 ซูปเปอร์คุ้ม — ปิดการขายเมื่อวันที่ 25 ธันวาคม 2564
> ประกันภัยโควิด-19 New Normal 2021 — ปิดการขายเมื่อวันที่ 25 ธันวาคม 2564

Source: https://www.jaymartinsurance.co.th/page/content-detail/?content=92

Every health product Jaymart ever had was **ประกันภัยสุขภาพเด็ก** — children only — and the
last one closed to new sales on **1 มกราคม 2567**, nineteen months before this pass. The
claims menu still carries `สินไหมประกันสุขภาพเด็ก` and `สินไหมประกันไข้เลือดออก` for the
in-force book, which is consistent.

The live PA product is accident cover, and its own copy confirms the medical element is
accident-triggered:

> แพ็คเกจประกันอุบัติเหตุ ให้ความคุ้มครองหลัก ได้แก่ ค่ารักษาพยาบาลและค่าสินไหมทดแทนกรณีเสียชีวิต และยังมีความคุ้มครองส่วนเพิ่มที่เราคัดสรรไว้ให้เหมาะสมกับแต่ละช่วงวัย และแต่ละอาชีพ อาทิเช่น ค่าใช้จ่ายด้านทันตกรรม, ความคุ้มครองกรณีกระดูกแตกหัก ไฟไหม้ น้ำร้อนลวก หรือเงินชดเชยจากการเข้าพักรักษาตัวในโรงพยาบาล

Source: https://www.jaymartinsurance.co.th/page/content-detail/?content=74

### 8c. Source-reliability warning about this domain

`jaymartinsurance.co.th` is serving **cloaked SEO-spam content to search-engine crawlers**.
The same URL returns different `<title>` tags depending on User-Agent:

- `.../page/service/?search=Garage` with a browser UA → `<title>SERVICE - Jaymart Insurance</title>`
- the identical URL with `Googlebot/2.1` → `<title>เกมสล็อตฟรี ไม่มีแชร์ทุน 10 รับ 100 - เว็บสล็อตเว็บตรง</title>`

That is a live compromise of an insurer's own domain, not a rendering quirk. It does not
invalidate the product pages quoted above — those were read with an ordinary browser UA and
are internally consistent — but anyone re-checking this section should be aware that search
results for this domain are not trustworthy and that the site's integrity is in question.

**Verdict: no product to record.** Its only health line was children's cover, all closed.

---

## 9. Not included and why — this round

| Insurer / plan | Verdict | Reason |
|---|---|---|
| นวกิจ ประกัน ๕ ยอด แผนเอก | **ADDABLE** | Full 13-band table 11-75, standalone, entry 11-55, renewal 75 |
| นวกิจ ประกัน ๕ ยอด แผนโท | **ADDABLE** | Same |
| นวกิจ ประกัน ๕ ยอด แผนตรี | **ADDABLE** | Same |
| นวกิจ ประกัน ๕ ยอด แผนจตุ | **ADDABLE** | Same |
| นวกิจ ประกัน ๕ ยอด แผนเบญจ | **ADDABLE** | Same |
| นวกิจ OPD buy-up แบบที่ 1-5 | Note, not records | Additive premium on the base plan; five plans × five OPD options would be 25 records of one policy |
| นวกิจ ประกันมะเร็ง Cancer Carefree | NOT INCLUDED | Single-disease |
| นวกิจ ประกันออฟฟิศซินโดรม พลัส | NOT INCLUDED | Named-disease list (8 โรค) |
| นวกิจ ประกันยันยุง | NOT INCLUDED | Named-disease list (6 mosquito diseases) |
| นวกิจ ประกันภัยอุบัติเหตุส่วนบุคคล | NOT INCLUDED | PA, not health |
| ชับบ์สามัคคี Basic Work & Play | NOT INCLUDED | Named-condition plan, not full health; premium published monthly only (`เดือนละ 690 บาท`) |
| ชับบ์สามัคคี Hospital Stay Double Pay | NOT INCLUDED | Hospital cash, not medical expense |
| ชับบ์สามัคคี มะเร็งเบาใจ | NOT INCLUDED | Single-disease |
| ชับบ์ ไลฟ์ เฮลท์ พรีเมียม เอ็กซ์ตร้า / เฮลท์ ดีไลท์ พลัส | Out of this file's scope | `สัญญาเพิ่มเติม` riders on a life policy, and a life insurer — belongs in a rider pass |
| Falcon iSmart Health O-A Plus | NOT INCLUDED | Visa-gated (Non-Immigrant O-A), English only; only `Start THB 5,080` with one band |
| Falcon Health O-X Plan | NOT INCLUDED | Visa-gated (Non-Immigrant O-X), English only; only `Start THB23,235` with one band |
| Falcon Health LTR Plan | NOT INCLUDED | Visa-gated (LTR), English only; only `Start THB13,102` with one band |
| Falcon Pro Health / Super Save / New iSmart Health | NOT INCLUDED | Product URLs return HTTP 500 on the live site; withdrawn |
| LMG Universal Plus / Elite Plus / Happy Health Plus | NOT INCLUDED | **The insurer no longer exists** — amalgamated into Chubb Samaggi 2 March 2026; site unreachable; no successor product |
| ธนชาต ประกันสุขภาพ โรคมะเร็ง | NOT INCLUDED | Single-disease, lump-sum payout, no premium published at all, lead form only |
| KPI PA Double Care / PA Very Safe | NOT INCLUDED | PA; the `สุขภาพ` in the category name is not a health product |
| มิตรแท้ AH1-AH3 มิตรแท้สบายหายห่วง | NOT INCLUDED | Hospital cash, accident-triggered, flat premium |
| มิตรแท้ อบ.1 / อบ.2 | NOT INCLUDED | PA — though the PLV brochure does carry a real 4-band rate table |
| มิตรแท้ CAD มะเร็ง / DHF ไข้เลือดออก | NOT INCLUDED | Single-disease, application form PDF only, no product page |
| เจมาร์ท Baby Smile / Smart Care / Child Care | NOT INCLUDED | Children-only health, **all closed to new sales**, last on 1 มกราคม 2567 |

---

## 10. NOT FOUND / does not exist publicly

Recorded so the next person does not re-do the search. In each case the URLs actually
opened are named.

**A filed policy wording (กรมธรรม์) or เอกสารสรุปสาระสำคัญ for any product in this pass —
does not exist publicly.** Zero out of eight insurers publish one. Checked: all eight Navakij
product pages plus https://www.navakij.co.th/th/products and its OIC-disclosure page
(financial forms only) and a 404 `sitemap.xml`; Thanachart's
`tnifrontend/tnidownloadlist.aspx` (claim forms and investor disclosures only); KPI's site
search for `สรุปสาระสำคัญ` (zero results), both PA product pages (zero `.pdf` hrefs),
`kpi.co.th/kpi/service/other/`, `/kpi/policy/`, `/kpi/faqs/` and `epolicy.kpi.co.th` (403);
Mittare's site search for `สรุปสาระสำคัญ` (`ดูเหมือนว่าเราจะไม่พบสิ่งที่คุณกำลังมองหา`),
`mittare.com/application-forms/` (application forms, not wordings) and
`mittare.com/digital-content/` (one image-only PDF with no text layer); Falcon's `/download`
page and all three health product pages; Chubb's `health-office-syndrome.html` and
`health-chubb-samaggi.html`; Jaymart's full 147-URL `sitemap.xml`. **Every `terms_source` a
Navakij record can carry is `official_insurer`.**

**A premium of any kind for ธนชาต's cancer plan — does not exist publicly.** Checked:
`thanachartinsurance.co.th/` homepage, `tniproductlist.aspx?ptid=1..10,12,15,28`,
`sitemap.xml` (132 URLs), `tnidownloadlist.aspx`, `inquiry.thanachartinsurance.co.th/`,
`.../sl/ow/cancer/`, `.../partnership?H=1&M=3`, `tniquoteonline.aspx`, and
`thanachartinsurance.co.th/ecommerce/`. Grepping the lead page for `เบี้ย` and `ทุนประกัน`
returns zero matches.

**An age-band premium table for any Falcon health product — does not exist publicly.**
Checked: all three product pages, both coverage JPEGs (benefit schedules only, no rate rows),
the `/accident-health` listing and `/download`. Falcon states the bands exist
(`2. Insurance premiums will increase according to age band.`) and prints one starting price.

**Any live premium calculator on the own domain of any of the eight, for a health
product — does not exist.** Thanachart's and KPI's quote engines are motor-only; Navakij's
`สนใจผลิตภัณฑ์` button opens a callback form (`ข้อมูลสำหรับติดต่อกลับ ชื่อจริง นามสกุล
เบอร์โทรศัพท์ จังหวัด`) and searching its homepage for `คำนวณ` / `เช็คเบี้ย` / `ซื้อออนไลน์`
returns nothing; Falcon's and Chubb's CTAs are lead-capture forms; Mittare's agent portals
are compulsory-motor or login-gated. **So there is nothing to sweep in this pass** — unlike
`standalone-health-sourcing.md`, where Dhipaya's and Viriyah's own endpoints carried the whole
band structure. The Navakij table came out of a PDF because that is the only place it exists.

**A single IPD ceiling for Navakij ประกัน ๕ ยอด — does not exist publicly.** The schedule is
per-หมวด and per-confinement with no aggregate; see §1e. Checked: all 7 pages of the
product-detail PDF, the application form and the product page. This is the one field that
must be `null` on an otherwise complete record.

**An annual OPD cap for Navakij — does not exist publicly.** Published as
`สูงสุดไม่เกิน 1 ครั้งต่อวัน และ 30 ครั้งต่อปี` × a per-visit figure, never as a total. Same
absence as ทิพย (`standalone-health-sourcing.md` §1g) and the opposite of ไทยประกันสุขภาพ
(`round2` §1l).

**A copay percentage or trigger for Navakij — does not exist publicly.** Only the reserved
right at §1d. No threshold, no loss-ratio number, no claim count — the opposite of
ไทยประกันชีวิต, which quantifies all three (`round2` §4.1).

**Sex-split premiums anywhere in this pass — do not exist.** Navakij's tables are unisex, as
are Mittare's PA tables. Consistent with ไทยประกันสุขภาพ and against FWD, BLA and KTAXA.

**An insurer-published notice of the เจพี → เจมาร์ท rebrand — does not exist publicly** on
`jaymartinsurance.co.th`. Checked: `page/about-us/`, `page/content/?content=1` (news),
`page/content/?content=2` (promotions) and all 147 `sitemap.xml` URLs. The evidence for the
rebrand that *is* on insurer-owned property is circumstantial — surviving `E-JP` agent
systems and the `jpinsurance.co.th` domain — and the คปภ. code index is too stale to settle
it (§8a).

**A current คปภ. list that reflects the LMG amalgamation — does not exist publicly.** The OIC
reference-code index still lists `2028 บริษัท แอลเอ็มจี ประกันภัย จำกัด (มหาชน)` five months
after the merger took effect. `http://oiceservice.oic.or.th/insuranceagainst.php`
(`ค้นหากรมธรรม์ประกันภัยที่บริษัทประกันวินาศภัยขายในปัจจุบัน`) would in principle be the
right primary source for "which policies is this insurer selling today", but its
`groupid` dropdown renders empty and a POST to `?action=search` with
`keyword=สุขภาพ` returns a results table with zero rows. **The authoritative source for the
merger is the acquiring insurer's own announcement PDF** (§4), not คปภ.

---

## 11. What this round changes about the project's assumptions

1. **An insurer can vanish between passes, and the dataset has no mechanism for it.**
   LMG's plans were live and sourceable a short time ago and are now unreachable, with the
   site gone and the products not migrated to the successor. The 12-month CI warning and the
   18-month premium hide are calibrated for *stale* data, not for *dead* insurers. A record
   entered from LMG in early 2026 would still be rendering premiums today for a company that
   no longer exists. Worth a cheap mitigation: a periodic liveness check on every record's
   `premium_source.url` and `terms_source.url`, warning loudly on NXDOMAIN or connection
   refusal rather than only on age.
2. **"ประกันสุขภาพ" in a Thai non-life menu usually is not health insurance.** Five of the
   eight insurers here have the word in their navigation and only one of them sells a
   medical-expense policy behind it. KPI's category is literally named
   `ประกันภัยอุบัติเหตุและสุขภาพ` and contains two PA plans. Thanachart's is a header over a
   lump-sum cancer plan. Chubb Samaggi's is a named-condition plan and a hospital-cash plan.
   Any future screening pass should treat the menu label as a lead, never as a finding.
3. **The visa-plan category is a real and growing one, and it is out of scope.** Falcon's
   entire live health line — three products — exists only to satisfy Non-Immigrant O-A, O-X
   and LTR visa medical requirements. These are genuine 13-category health policies with
   published deductibles and copay rows, in English, sold to foreigners against a passport.
   They should never be shown to this site's reader as an option, and the reason should be
   written down so the next pass does not spend time on them.
4. **A per-หมวด schedule with no aggregate ceiling is a shape the schema does not have.**
   Navakij is the first insurer here that publishes thirteen per-confinement sub-limits and
   no headline IPD figure at all. The schema's single `ipd_annual_limit_thb` +
   `ipd_limit_basis` pair — already strained by the both-limits products in
   `standalone-health-sourcing.md` §6.4 — simply has nowhere to put this. `null` is the
   honest answer and it renders as a blank next to a real premium, which is the worst of both
   worlds. This is now the second-most-requested schema change after the ones already listed
   there.
5. **Bundled PA and hospital cash inside a health policy needs to be visible.** ประกัน ๕ ยอด
   includes a 20,000-baht อบ.2 accident benefit and a cancer/heart daily cash benefit that
   the buyer cannot decline. A reader comparing its premium against a pure medical plan is
   comparing two different purchases. The schema has no field for it; put it in the record's
   Thai prose.
