# Public scheme sourcing: บัตรทอง (UCS), ประกันสังคม (SSO), สิทธิข้าราชการ (CSMBS)

Research date: 2026-08-10. Government primary sources only — สปสช. (nhso.go.th),
สำนักงานประกันสังคม (sso.go.th), กรมบัญชีกลาง (cgd.go.th). No news site, no blog, no
comparison site is cited for any figure. Every claim carries the verbatim Thai and the
exact URL it lives on.

**Why this file exists:** all three files in `data/schemes/` still carry
`# TEMPLATE — content is illustrative and must be verified before publication.` and
all three `source.url` fields point at bare homepages. The README's first argument —
*your existing entitlement comes first* — currently rests on unverified data. This is
the verification pass. **No file under `data/` was modified.**

**Headline finding: SSO's dental benefit changed on 1 พ.ค. 2569 (2026), and สปสช.'s
own comparison page still quotes the old figure.** Anyone entering the widely-repeated
"900 บาท/ปี" today would be entering a superseded number from a government page that
has not caught up with a different government document.

## Method note

- `cgd.go.th` sits behind Cloudflare. Plain page GETs succeed; `keyword=` queries and
  rapid repeats get blocked. Circular metadata comes from
  `https://www.cgd.go.th/cs/internet/internet/services/getNewsDetail.html?news_id=<id>&asset_type=News`,
  where `<id>` is the argument to `popupAjaxDialog('News','<id>')` in the register HTML.
  The `Satellite` PDF URLs must carry their full `blobheadername*` query string **and**
  a `Referer` header or they 403.
- Both CGD circulars are image scans — `pdftotext` returns nothing. They were rendered
  with `pdftoppm -png` and read as images. The Thai numerals in the quotes below
  (๔๐๐, ๑,๐๐๐) are as printed in the original.
- The SSO dental PDF is a Canva export whose text layer is character-scrambled; it was
  read as a rendered image for the same reason.

---

## 1. UCS / บัตรทอง — สปสช.

### 1a. 30 บาทรักษาทุกที่ is a supplement, not a replacement

https://www.nhso.go.th/th/population-th/2024-08-20-15-19-43/30-bath-th-2

> ทางเลือกเสริม สำหรับอาการเจ็บป่วยเล็กน้อย สะดวก ไม่ต้องรอคิวนาน ลดความแออัดในโรงพยาบาล หาหมอได้ตามเวลาที่สะดวก (ก่อน-หลังเลิกงาน) ได้ที่ร้านยาและคลินิกเอกชนที่เข้าร่วม
> ยังคงเข้ารับการรักษาได้ที่หน่วยบริการปฐมภูมิประจำตัว

> ใช้บัตรประชาชนเข้ารับบริการได้ ไม่ต้องใช้ใบส่งตัว

### 1b. …but the referral requirement is not gone, and this is the part that gets dropped

Same URL:

> โรงพยาบาลรัฐสังกัดอื่น เช่น กรุงเทพมหานคร กระทรวงกลาโหม สำนักงานตำรวจแห่งชาติ มหาวิทยาลัย เป็นโรงพยาบาลสำหรับรับส่งต่อผู้ป่วย ต้องใช้ใบส่งตัว

> ผู้ป่วยกลับไปที่หน่วยบริการปฐมภูมิ / ประจำของตนเอง กรณีเกินศักยภาพจะส่งต่อไปโรงพยาบาลประจำตามสิทธิหรือในเครือข่าย

**`ucs.yaml` `gaps[0]` — "ต้องรักษาที่หน่วยบริการประจำ และมีระบบส่งต่อ" — is outdated as a
blanket claim** and should be rewritten to say the referral rule survives specifically
for other-agency state hospitals, quoting the หมายเหตุ line above.

The four no-referral cases สปสช. names (เจ็บป่วยต่างถิ่นไม่ฉุกเฉินวิกฤติ, UCEP,
30 บาทรักษาทุกที่, มะเร็งรักษาทุกที่) are at
https://www.nhso.go.th/th/communicate-th/thnewsforperson/2025-08-31-02-26-17
> ผู้ป่วยมะเร็งสามารถเข้ารับการรักษาที่สถานพยาบาลอื่นได้

### 1c. Private providers ARE in network for defined scopes

Same URL as §1a:

> ร้านยาคุณภาพ ดูแลเจ็บป่วยเล็กน้อย 32 อาการปรึกษาเภสัชกรและรับยาตามอาการ
> คลินิกหมอฟัน (คลินิกทันตกรรม) อุดฟัน ถอนฟัน ขูดหินปูน เคลือบหลุมร่องฟัน เคลือบฟลูออไรด์
> คลินิกกายภาพบำบัด ฟื้นฟูผู้ป่วย 4 กลุ่มโรค (ในช่วง 6 เดือนแรกหลังพ้นวิกฤต) ได้แก่ โรคหลอดเลือดสมอง สมองได้รับบาดเจ็บ ไขสันหลังได้รับบาดเจ็บ กระดูกสะโพกหัก
> คลินิกเทคนิคการแพทย์ ตรวจแล็บ-เจาะเลือด 22 รายการตามใบแพทย์สั่งตรวจจากโรงพยาบาลที่ให้การรักษา

Emergency, same URL:

> ประสบอุบัติเหตุ เจ็บป่วยฉุกเฉินไม่ถึงขั้นวิกฤต เข้ารักษาได้ที่โรงพยาบาลรัฐทุกแห่ง และโรงพยาบาลเอกชนที่เข้าร่วมกับ สปสช. ยื่นบัตรประชาชน แจ้งใช้สิทธิฉุกเฉิน
> เจ็บป่วยฉุกเฉินวิกฤตถึงแก่ชีวิต (เช่น หมดสติ, หายใจไม่ออก, เจ็บหน้าอกรุนแรง) เข้ารักษาได้ที่โรงพยาบาลรัฐและเอกชนที่ใกล้ที่สุด ยื่นบัตรประชาชน แจ้งใช้สิทธิ UCEP เจ็บป่วยฉุกเฉินวิกฤติมีสิทธิทุกที่

**`ucs.yaml` `gaps[1]` — "ไม่ครอบคลุมโรงพยาบาลเอกชน" — is wrong as written.** The true gap
is private *inpatient and elective* care and private rooms, not private care as such.

### 1d. UCS room and board — NOT VERIFIED, and the source page is broken

`https://www.nhso.go.th/page/coverage_rights_Meal` returns **HTTP 500** and
`https://www.nhso.go.th/th/2024-08-22-03-33-13` returns **404**. The substance survives
only in search-engine caches of those dead pages, which is not a source. **No verbatim
quote from a live สปสช. URL could be obtained, so nothing about UCS room and board is
recorded here.** Separately: UCS has no baht figure for ค่าห้อง in any case — the rate is
set per facility, so a numeric UCS room cap is **NOT PUBLISHED**.

---

## 2. SSO / ประกันสังคม

### 2a. Dental — the schedule changed on 1 พ.ค. 2569

Source: official SSO infographic, PDF titled *อัปเดทใหม่! สิทธิทำฟันประกันสังคมปี 2569*,
authored "PR Line SSO", created 6 May 2026.

https://www.sso.go.th/wpr/assets/upload/files_storage/sso_th/1d936c61bf5d6cc1f7a51ffdb2f9bd2c.pdf

> อัปเดตใหม่! สิทธิทำฟัน ประกันสังคมปี 2569 ครอบคลุมมากขึ้น จ่ายหนักกว่าเดิม เริ่ม 1 พ.ค.2569

สิทธิเดิม (ก่อน 1 พ.ค. 69):

> ถอนฟัน/อุดฟัน/ขูดหินปูน/ผ่าตัดฟันคุด — วงเงิน 900 บาท/ปี ทั้งโรงพยาบาลรัฐและเอกชน
> ฟันปลอมถอดได้ — 1,300 – 4,400 บาท (ตามรูปแบบ)

สิทธิใหม่ (เริ่ม 1 พ.ค. 69):

> ถอนฟัน/อุดฟัน/ขูดหินปูน — ในรพ.เอกชน วงเงิน 900 บาท/ปี
> เพิ่มในรพ.รัฐ อุด/ขูด/ถอน + เกลารากฟันขลิบแต่งกระดูกเตรียมช่องปากก่อนใส่ฟันปลอมไม่จำกัดจำนวนครั้งตามความจำเป็นทางการแพทย์
> ผ่าฟันคุด — จ่ายเพิ่มในอัตรา 1,500 - 2,500 บาท/ซี่
> ฟันปลอมถอดได้ — ปรับเพิ่มวงเงินเป็น 1,500 - 6,000 บาท +ค่าซ่อมแซม 900 บาท/ครั้ง
> ฝังรากฟันเทียมรองรับฟันเทียมทั้งปาก — สำหรับผู้สูญเสียฟันทั้งหมดไม่สามารถใส่ฟันปลอมชนิดถอดได้ — จ่ายค่าผ่าตัด 17,500 บาท/ราย — ชุดรากฟันเทียม 3,300 บาท ค่าติดตามการรักษา

Conditions, same document:

> ต้องส่งเงินสมทบครบ 3 เดือน ภายใน 15 เดือนก่อนวันรับบริการ
> สิทธิทำฟันยังคงคุ้มครองต่อไปอีกไม่เกิน 6 เดือนหลังจากออกจากงาน

**Two government sources now disagree.** SSO's own benefit page still shows the old
schedule:

> ให้ผู้ประกันตนมีสิทธิได้รับค่าบริการทางการแพทย์เท่าที่จ่ายจริง 900 บาท/ครั้ง/ปี

https://www.sso.go.th/wpr/main/privilege/กองทุนประกันสังคม_detail_detail_1_125_0/24

with denture tiers ไม่เกิน 1,300 / 1,500 / 2,400 / 4,400 บาท within 5 years. As of
2026-08-10 that page has not been updated to the 1 พ.ค. 2569 rules. **Recommendation:
record the new schedule, cite the infographic, and state in the record that the SSO
benefit page still displayed the old figure on the verification date.** Do not silently
pick one.

### 2b. The 700 บาท/วัน room figure is emergency-only

https://www.sso.go.th/wpr/main/service/กองทุนประกันสังคม_detail_detail_1_125_690/605_605

> ผู้ป่วยในที่สถานพยาบาลของรัฐ: เบิกค่ารักษาพยาบาลได้เท่าที่จ่ายจริงตามความจำเป็น ภายในระยะเวลาไม่เกิน 72 ชั่วโมง (ไม่รวมวันหยุดราชการ) ค่าห้องและค่าอาหารเบิกได้ไม่เกิน 700 บาท/วัน
> ผู้ป่วยในที่สถานพยาบาลของเอกชน: เบิกตามหลักเกณฑ์และอัตราที่คณะกรรมการการแพทย์กำหนด แต่ไม่เกิน 72 ชั่วโมง (ไม่รวมวันหยุดราชการ) ค่าห้องและค่าอาหารเบิกได้ไม่เกิน 700 บาท/วัน
> ฉุกเฉินวิกฤต: สำนักงานจะรับผิดชอบค่าบริการทางการแพทย์จนพ้นภาวะวิกฤตภายใน 72 ชั่วโมง (นับรวมวันหยุดราชการ)

It is **not** a general SSO room benefit. It applies to out-of-network emergency care
and it is bounded by 72 hours. Repeating it as "ประกันสังคมให้ค่าห้อง 700 บาท" — which
สปสช.'s own comparison page does, see §4 — is wrong.

### 2c. In-network care, and the eligibility gate the dataset omits

https://www.sso.go.th/wpr/main/privilege/กองทุนประกันสังคม_detail_detail_1_125_0/30

> ค่ารักษาที่เกิดขึ้นทั้งหมดในโรงพยาบาลตามบัตรรับรองสิทธิการรักษาพยาบาล ผู้ประกันตนไม่ต้องจ่าย
> จ่ายเงินสมทบในส่วนของกรณีเจ็บป่วยหรือประสบอันตรายมาแล้วไม่น้อยกว่า 3 เดือน ภายในระยะเวลา 15 เดือน ก่อนวันรับบริการทางการแพทย์

Named exclusions on that page: การขออยู่ห้องพิเศษ and การขอแพทย์พิเศษเอง. There is **no
published baht cap for a private room under SSO** — the patient simply bears the whole
excess: **NOT PUBLISHED**.

### What is wrong in `sso.yaml`

- `covers[0]` "ไม่จำกัดวงเงิน" is too strong. It holds in-network, for the medical
  service itself, with ห้องพิเศษ and แพทย์พิเศษ carved out and out-of-network emergency
  hard-capped at 72 ชั่วโมง / 700 บาทต่อวัน.
- The 3-month-within-15-months contribution precondition is **absent entirely**, and it
  is the single most consequential eligibility gate in the scheme.
- Dental is **absent entirely**, despite being SSO's most-used differentiator — and it
  changed on 1 พ.ค. 2569.
- `gaps` omits the 72-hour emergency ceiling.

---

## 3. CSMBS / สวัสดิการรักษาพยาบาลข้าราชการ — กรมบัญชีกลาง

### 3a. Room and board — 400 / 1,000 บาทต่อวัน, food included, still in force

Circular: ด่วนที่สุด ที่ กค 0422.2/พิเศษ ว 2 ลงวันที่ 4 ธันวาคม 2556.
Register: https://www.cgd.go.th/cs/internet/internet/(รักษา)กฎหมายระเบียบบ.html

PDF: `https://www.cgd.go.th/cs/Satellite?blobcol=urldata&blobheadername1=Content-Disposition&blobheadername2=filename&blobheadervalue1=inline%3B+filename%3D%22%E0%B8%9E%E0%B8%B4%E0%B9%80%E0%B8%A8%E0%B8%A9+%E0%B8%A72%2C0.pdf%22&blobheadervalue2=filename%3D%22%E0%B8%9E%E0%B8%B4%E0%B9%80%E0%B8%A8%E0%B8%A9+%E0%B8%A72%2C0.pdf%22&blobkey=id&blobnocache=false&blobtable=MungoBlobs&blobwhere=1438166019216&ssbinary=true`

Rate table, p.2, verbatim (Thai numerals as printed):

> อัตราค่าบริการสาธารณสุขเพื่อใช้สำหรับการเบิกจ่ายค่ารักษาพยาบาลสิทธิสวัสดิการรักษาพยาบาลข้าราชการ หมวด ๑ ค่าห้องและค่าอาหาร ตามหนังสือกรมบัญชีกลาง ด่วนที่สุด ที่ กค ๐๔๒๒.๒/พิเศษ/ว ๒ ลงวันที่ ๔ ธันวาคม ๒๕๕๖

| ลำดับ | รายการ | หน่วย | ราคา (บาท) | หมายเหตุ | รหัสรายการ |
|---|---|---|---|---|---|
| ๑.๑ | เตียงสามัญ | วัน | ๔๐๐ | เบิกได้รวมกับค่าอาหารในราคาไม่เกิน ๔๐๐ บาท ตามระเบียบกระทรวงการคลัง | ๒๑๑๐๑ |
| ๑.๒ | ห้องพิเศษ | วัน | ๑,๐๐๐ | เบิกได้รวมกับค่าอาหารในราคาไม่เกิน ๑,๐๐๐ บาท ตามระเบียบกระทรวงการคลัง | ๒๑๒๐๑ |

Cover letter, p.1:

> จึงเห็นสมควรยกเลิกอัตราค่าบริการสาธารณสุขเพื่อใช้สำหรับการเบิกจ่ายค่ารักษาพยาบาล หมวด ๑ รายการค่าเตียงสามัญและค่าห้องพิเศษ ตามหนังสือกรมบัญชีกลาง ด่วนที่สุด ที่ กค ๐๔๑๗/ว ๑๗๗ ลงวันที่ ๒๔ พฤศจิกายน ๒๕๔๙ และกำหนดอัตราค่าเตียงสามัญและค่าห้องพิเศษใหม่ ... ทั้งนี้ ให้มีผลบังคับใช้สำหรับการรักษาพยาบาลที่เกิดขึ้นตั้งแต่วันที่ ๑ มกราคม ๒๕๕๗ เป็นต้นไป

All 617 rows of the CGD สวัสดิการรักษาพยาบาล circular register were enumerated
(7 pages, `?page=N&perpage=100`). **There is no later หมวด ๑ ค่าห้องและค่าอาหาร circular** —
the most recent rate revision is หมวดที่ 11 ค่าหัตถการและวิสัญญี (ว 382, 25/05/2569), a
different category. These two figures are current.

**The commonly repeated 13-day cap on ห้องพิเศษ is NOT in this circular.** It lives in
ระเบียบกระทรวงการคลัง, which the circular defers to (`ตามระเบียบกระทรวงการคลัง`) without
quoting. No primary text stating 13 days was located. **NOT VERIFIED — do not assert it.**

### 3b. 2026 change — OPD direct billing now requires ID verification

Circular: ที่ กค 0416.4/ว 224 ลงวันที่ 2 เมษายน 2569,
*แนวปฎิบัติการเบิกจ่ายตรงเงินสวัสดิการเกี่ยวกับการรักษาพยาบาลประเภทผู้ป่วยนอก*

PDF: `https://www.cgd.go.th/cs/Satellite?blobcol=urldata&blobheadername1=Content-Disposition&blobheadername2=filename&blobheadervalue1=inline%3B+filename%3D%22%E0%B8%A7224.pdf%22&blobheadervalue2=filename%3D%22%E0%B8%A7224.pdf%22&blobkey=id&blobnocache=false&blobtable=MungoBlobs&blobwhere=1438191085917&ssbinary=true`

> ๑. การเบิกเงินค่ารักษาพยาบาลประเภทผู้ป่วยนอกในระบบเบิกจ่ายตรงสวัสดิการรักษาพยาบาลข้าราชการ ให้ใช้บัตรประจำตัวประชาชนที่ราชการออกให้ทำธุรกรรมในการเข้ารับการรักษาพยาบาลทุกครั้ง เว้นแต่ บุคคลที่ไม่สามารถมีบัตรประจำตัวประชาชนได้ตามกฎหมายว่าด้วยบัตรประจำตัวประชาชนหรือบุคคลที่กรมบัญชีกลางกำหนดให้ไม่ต้องแสดงบัตรประจำตัวประชาชนในการใช้สิทธิเบิกเงินค่ารักษาพยาบาล

> การยืนยันตัวตนทางอิเล็กทรอนิกส์หลากหลายรูปแบบ ได้แก่ การสแกนใบหน้า (Facial Recognition) คู่กับบัตรประจำตัวประชาชน (OCR) ผ่านแอปพลิเคชัน (e-KYC) การยืนยันตัวตนแบบ Two-factor authentication (2FA) โดยจะใช้การส่งรหัส OTP ผ่าน SMS การยืนยันตัวตนด้วย Biometrics

> จึงยกเลิกหนังสือที่อ้างถึง ๑ - ๓ และกำหนดแนวปฏิบัติการเบิกจ่ายตรงเงินสวัสดิการเกี่ยวกับการรักษาพยาบาลประเภทผู้ป่วยนอก

Its addressees include `ผู้อำนวยการสถานพยาบาลของทางราชการ ผู้อำนวยการสถานพยาบาลของเอกชน`,
so `csmbs.yaml`'s "โดยหลักใช้ได้กับสถานพยาบาลของรัฐ" is directionally right but a private
channel does exist (chiefly emergency — see ว 217 ลว 12 เม.ย. 2566 on
ใบประเมินคัดแยกผู้ป่วยฉุกเฉิน for private-hospital IPD emergencies).

### 3c. CSMBS dental — no annual cap exists

Governed by หมวดที่ 13 ค่าบริการทางทันตกรรม, last amended by กค 0416.2/ว 369 ลว 21 ก.ย. 2559
(*ขอแก้ไขประกาศอัตราค่าบริการสาธารณสุข… หมวดที่ 13 ค่าบริการทางทันตกรรม และซ้อมความเข้าใจการเบิก
ค่าฟันเทียมและอุปกรณ์*). It is a **per-procedure fee schedule, not an annual baht cap** —
an annual CSMBS dental cap is **NOT PUBLISHED**. The per-item table was not extracted.

### What is wrong in `csmbs.yaml`

- The two most concrete citable CSMBS numbers (400 / 1,000 บาทต่อวัน, food included) are
  absent entirely.
- `gaps` has one entry and omits: the private-room excess, the absence of an annual
  dental cap, and the ID-card / biometric requirement introduced by ว 224 (2 เม.ย. 2569).
- `source.url` is a bare homepage.

---

## 4. A government source that is itself out of date

https://www.nhso.go.th/th/communicate-th/thnewsforperson/News_4239

สปสช.'s own UCS-vs-SSO comparison states UCS is `ไม่มีค่าใช้จ่าย ใช้ได้ไม่จำกัดจำนวนครั้ง`
and SSO `ต้องส่งเงินสมทบเข้ากองทุนทุกเดือน`. **But it still quotes SSO dental as 900 บาท/ปี
and rooms as 700 บาท/วัน without the emergency-only qualifier.** It is pre-1-May-2569 on
dental. Do not use it as the dental source, and do not use it for the room figure.

This is the scheme-side version of the AIA lesson already in
`aia-rider-sourcing.md`: being reachable, official and undeleted is not the same as
being current.

## 5. What must not be entered

- **UCS room and board** — the สปสช. page is HTTP 500. No live quote, no record.
- **The CSMBS 13-day private-room cap** — repeated everywhere, located in no primary
  text. Not verified.
- **A numeric UCS or SSO private-room cap** — neither exists. The patient bears the
  excess, and that is what should be written, in words, not as a number.
