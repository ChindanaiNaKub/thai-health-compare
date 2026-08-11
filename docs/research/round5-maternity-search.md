# Round 5: a dedicated maternity-rider search — one found, added

Research date: 2026-08-12. Assignment: close the open item at
`round4-gap-analysis.md` §3d — "Maternity rider — a dedicated search, not attempted
in any round including this one." Same rules as every other file in this directory:
every claim is followed by the verbatim Thai it rests on and the exact URL that text
lives on. Only insurer-owned domains were used for product facts; คปภ./OIC domains
were not needed this round (no new insurer entity, no licence question); agent
domains were used only for premium figures, cross-checked against a second source,
per `CONTRIBUTING.md`.

**Outcome: one real product found and added — เมืองไทยประกันชีวิต (Muang Thai Life
Assurance)'s Maternity Plus, a บันทึกสลักหลัง (endorsement) with its own age-banded
premium table, sold on top of the Elite Health Plus rider.** This closes §3d's "not
found — Open, not ruled out" with a positive result. It is also the first product
this dataset has ever recorded that is a rider *on a rider* — Elite Health Plus is
itself a rider requiring an underlying unit-linked life policy — which the schema
does not model two levels deep; how that gap was handled is in §2 below. Two other
leads (AIA Lady Care Plus, KTAXA iHealthy Ultra) were checked and are genuine
rejections, for two different reasons, documented in §3.

---

## 1. Muang Thai Life Assurance — Maternity Plus — ADDED

`data/plans/muangthailife-maternity-plus-plan1.yaml`. เมืองไทยประกันชีวิต
(`muangthai.co.th`) is **not** the insurer already in this dataset under the `mti-`
prefix — that is เมืองไทยประกันภัย (Muang Thai *Insurance*, `muangthaiinsurance.com`),
a distinct non-life company with a coincidentally similar Thai name, sourced in
`mtl-bla-sourcing.md`. Muang Thai Life had never appeared in this dataset before
today.

### 1a. The product, and why it counts as "its own published premium"

Muang Thai Life's live Elite Health Plus product page states, in its own words:

> เลือกซื้อความคุ้มครองเพิ่มได้ตามต้องการ ทั้งความคุ้มครองการคลอดบุตร พลัส หรือ
> สุขภาพดี พลัส (ค่าตรวจสุขภาพประจำปี ค่าฉีดวัคซีน ค่ารักษาทางทันตกรรม
> ค่ารักษาทางสายตา) เพิ่มได้ตามความต้องการ

https://www.muangthai.co.th/th/health-insurance/elite-health-plus (fetched
2026-08-12, `curl`-exact with an ordinary browser User-Agent)

The same page states Maternity Plus's host restriction in the standard-terms list:

> บันทึกสลักหลังความคุ้มครองการคลอดบุตร พลัส (Maternity Plus) และ บันทึกสลักหลัง
> สุขภาพดี พลัส (Well-Being Plus) ต้องซื้อแนบท้ายสัญญาเพิ่มเติมการประกันภัยสุขภาพแบบ
> อีลิท เฮลท์ พลัส เท่านั้น

Same URL. The current brochure, linked live from that page —
`04-0480_ EliteHealthPlus_TH_20250221.pdf`
(https://www.muangthai.co.th/filestorage/brochures/04-0480_%20EliteHealthPlus_TH_20250221.pdf,
16 pages, fetched and `pdftotext -layout`'d 2026-08-12) — carries the full benefit
table on p.14:

> ค่าใช้จ่ายการคลอดบุตร สูงสุดต่อการคลอด 1 ครั้ง
> • กรณีคลอดโดยธรรมชาติ รวมถึงการผ่าคลอด ซึ่งได้วางแผนไว้ล่วงหน้าโดยไม่มีข้อบ่งชี้ทาง
>   การแพทย์ — 60,000 บาท (แผน 1) / 150,000 บาท (แผน 2)
> • กรณีผ่าคลอด ที่มีข้อบ่งชี้ทางการแพทย์ — 80,000 บาท (แผน 1) / 200,000 บาท (แผน 2)
> ค่าใช้จ่ายสำหรับการถ่างขยายปากมดลูกและการขูดมดลูกกรณีแท้งบุตร — จ่ายตามจริง
> ผลประโยชน์สูงสุดต่อรอบปีกรมธรรม์ — 2,000,000 บาท (แผน 1) / 4,000,000 บาท (แผน 2)

Same PDF, p.14. Waiting periods, same page:

> บริษัทจะจ่ายค่าใช้จ่ายสำหรับการคลอดบุตร ภายหลัง 280 วัน, การถ่างขยายปากมดลูกและการขูด
> มดลูกกรณีแท้งบุตร ภายหลัง 90 วัน และค่าใช้จ่ายกรณีเกิดภาวะแทรกซ้อนขณะตั้งครรภ์และหลัง
> คลอดบุตร ภายหลัง 280 วัน นับตั้งแต่วันเริ่มมีผลคุ้มครองตามบันทึกสลักหลังนี้

Entry age and renewal ceiling, p.15:

> บันทึกสลักหลังความคุ้มครองการคลอดบุตร พลัส — สมัครได้ตั้งแต่อายุ 15-49 ปี ต่ออายุ
> ได้ถึงอายุ 49 ปี ระยะเวลาคุ้มครองถึงอายุ 50 ปี หรือจนกระทั่งแบบประกันภัยหลักหรือ
> สัญญาเพิ่มเติมสิ้นผลบังคับ

None of the above is a premium figure. **What the insurer's own document publishes
is the benefit schedule, not the price** — exactly the pattern this project has hit
for most riders. The premium table itself was found on two independent agent-portal
domains, byte-identical on both:

> ตารางเบี้ย (บาท/ปี) — อายุ (ปี) แผน 1 แผน 2 — 15-19: 54,482 / 88,280 — 20-24:
> 66,480 / 106,048 — 25-34: 60,681 / 96,128 — 35-49: 58,135 / 85,809 — หมายเหตุ:
> เบี้ยนี้ไม่รวมประกันชีวิต และประกันสุขภาพที่ต้องทำพร้อมกัน

https://www.muangthai-agent.com/product/318094/maternity-plus and
https://www.muangthailife-online.com/product/28944-34265/maternity-plus (both
fetched `curl`-exact 2026-08-12; both pages carry the identical string
`15 - 19 54,482 88,280 20 - 24 66,480 106,048 25 - 34 60,681 96,128 35 - 49 58,135
85,809`, confirmed with a raw grep of each downloaded HTML file, not just a tool
summary). Both are MTL agent-portal storefronts, so this is a same-brand
cross-check rather than two structurally independent vendors — worth flagging for
whoever re-verifies this record — but it is two different domains agreeing to the
baht, and the disclaimer text on both ("เบี้ยนี้ไม่รวมประกันชีวิต และประกันสุขภาพ...")
confirms the figure is Maternity Plus alone, not bundled with Elite Health Plus or
the host life policy. `data/plans/muangthailife-maternity-plus-plan1.yaml` records
Plan 1 only (2M-baht annual cap); Plan 2 (4M) exists with its own premium row in the
same table and was left out of this pass to keep one record per verified fact —
adding it is a five-minute follow-up, not new research.

### 1b. D Health Plus was the wrong host, and here is why it was ruled out

An older Maternity Plus document (the D Health Plus brochure,
`04-0481_DHealthPlus_291121_LowRes.pdf`) names D Health Plus, not Elite Health Plus,
as Maternity Plus's required host:

> บันทึกสลักหลัง ความคุ้มครองการคลอดบุตร พลัส (Maternity Plus) ต้องซื้อแนบกับสัญญา
> เพิ่มเติมการประกันภัยสุขภาพแบบ ดี เฮลท์ พลัส ที่มีผลบังคับอยู่เท่านั้น

That document is stale. Fetched today:

> `curl` → `https://www.muangthai.co.th/th/health-insurance/d-health-plus` → HTTP
> 200, `<title>ขออภัย ไม่พบหน้าที่คุณต้องการ</title>`

`docs/research/mtl-bla-sourcing.md` §3a (2026-08-10) independently found the same
thing from the origin server (`cms-corpweb-prod.muangthai.co.th/.../d-health-plus`
redirecting to D Health Lite) and concluded D Health Plus has been superseded. This
round's fetch of the `www` host, two days later, reproduces the same dead product —
the page resolves (HTTP 200) but serves Muang Thai Life's generic "page not found"
content, not a redirect. **D Health Plus is not a live purchasable product today**,
so it cannot be the host on record; Elite Health Plus — confirmed live by its own
working product page — is used instead, and it independently names Maternity Plus
as its own add-on (§1a), so nothing here rests on the dead brochure.

### 1c. The rider-on-a-rider modelling gap

Every other `type: rider` record in this dataset names a whole-life host policy
directly. Maternity Plus's real host, Elite Health Plus, is itself a rider — a UDR
(สัญญาเพิ่มเติมแบบ UDR) whose own premium is deducted from the investment value of an
underlying unit-linked life policy, per its brochure's cover page: "จ่ายเบี้ยคงที่
ตลอดสัญญาแม้ผู้เอาประกันอายุเพิ่มขึ้น... สัญญาเพิ่มเติมแบบชำระค่าการประกันภัยโดยการหัก
จากมูลค่าการลงทุนสำหรับกรมธรรม์ประกันชีวิตแบบยูนิเวอร์แซลไลฟ์และกรมธรรม์ประกันชีวิต
ควบการลงทุน". Neither Elite Health Plus's own premium nor the life policy beneath it
is published anywhere on `muangthai.co.th` — no age-band table, no sample premium,
nothing. The `host_policy` block in the new record therefore names Elite Health Plus
with `premium: null` and a `premium_unknown_reason` explaining the gap, which is the
same shape every other rider in this dataset uses when its host premium is
unpublished — the schema was not stretched or modified, only used at the one level
of nesting it actually has. The true full stack (life policy + Elite Health Plus +
Maternity Plus) is not computable from public information; this record makes that
gap explicit rather than quietly collapsing it into a single, misleadingly-complete
number.

### 1d. Exclusions — deliberately left empty, not copied from a neighbour

Elite Health Plus's own brochure states, on the page right after the Maternity Plus
benefit table:

> ข้อยกเว้นความคุ้มครองสัญญาเพิ่มเติมการประกันภัยสุขภาพแบบ อีลิท เฮลท์ พลัส (แบบ
> มาตรฐานใหม่) มีทั้งหมด 21 ข้อ เช่น...

This is the source of `new_health_standard: true` on the new record — a direct
quote, not an inference. But the heading names Elite Health Plus, not the Maternity
Plus endorsement, and Maternity Plus's own section publishes no exclusions of its
own beyond the waiting periods and the Thailand-only territory limit. Copying Elite
Health Plus's 21-item list into this record would assert a link the source does not
state. `mtl-bla-sourcing.md` §2g made the identical call for MTI ("better than
copying the standard 21 from another insurer's document and implying they apply
here") — same reasoning, applied here to a same-document-different-heading case
instead of a different-insurer case. `exclusions: []` is recorded, with the
reasoning in the YAML file's own comments.

---

## 2. Two other leads, checked and rejected

### 2a. AIA Lady Care Plus — REJECTED, wrong kind of product

AIA's own product page describes Lady Care Plus as a critical-illness rider, not a
childbirth-cost reimbursement:

> สัญญาเพิ่มเติมผลประโยชน์เลดี้แคร์ พลัส (Lady Care Plus) เน้นคุ้มครองโรคมะเร็งในสตรี
> ที่พบบ่อย และคุ้มครองความเสี่ยงที่อาจเกิดขึ้นจากการตั้งครรภ์และการคลอดบุตร

https://www.aia.co.th/th/our-products/health/lady-care-plus (fetched 2026-08-12,
`curl`-exact). "คุ้มครองความเสี่ยง...จากการตั้งครรภ์และการคลอดบุตร" is a lump-sum
payout on diagnosis of a covered pregnancy-related condition (the same shape as
every other critical-illness rider), not a benefit that reimburses the cost of an
ordinary delivery. This is the same category `round4-gap-analysis.md` §3d already
flagged and set aside — Generali's child-must-pair-with-parent clause is "an
eligibility condition, not a maternity benefit" — Lady Care Plus is a health*-risk*
condition, not a childbirth-*cost* benefit, and does not belong in this dataset
under a "maternity rider" heading even though it has its own premium (adjusted by
age and occupation class, no published age-band table found either).

### 2b. KTAXA iHealthy Ultra "คุ้มครองคนท้อง และค่าคลอดบุตร" — REJECTED, already priced in

KTAXA's own blog names a specific product line:

> iHealthy Ultra คุ้มครองคนท้อง และค่าคลอดบุตร

https://www.krungthai-axa.co.th/th/blog/pregnancy-maternity-insurance (fetched
2026-08-12). iHealthy Ultra is already in this dataset —
`data/plans/ktaxa-ihealthy-ultra-gold.yaml` — as a general เหมาจ่าย IPD rider. The
blog post is educational content (hospital-cost benchmarks, a 12-month waiting
period, a phone number to call for a quote) with no separate product name, no
separate premium, and no separate benefit table for a maternity component — it
describes pregnancy/childbirth as one of the things the existing iHealthy Ultra IPD
limit can be used for, the exact "bundled invisibly into a general health premium"
shape this search was told to exclude. Nothing to add.

### 2c. Thai Life "ก้าวแรก" — inconclusive, not pursued

A search result titled "ก้าวแรก แผนประกันสำหรับแม่และเด็ก – ไทยประกันชีวิต" pointed at
`product.thailife.com`. Fetched directly (`curl`, 2026-08-12, HTTP 200, 179 KB):
the string "คลอด" does not appear anywhere in the retrieved page at all, and the
page's own navigation reads as a general product-catalogue shell rather than the
named plan's content — consistent with a client-rendered page that did not resolve
its product content to this fetch method (the same failure mode `round4-gap-
analysis.md` method note §3 documented for Prudential's `online.prudential.co.th`).
This is a **dead end for this pass, not a rejection** — the product may exist and
simply was not reachable by `curl`. Worth a browser-rendered re-fetch before anyone
asserts Thai Life has nothing here.

---

## 3. What this closes and what is still open

`round4-gap-analysis.md` §3d is closed: a maternity/childbirth rider with its own
published, age-linked premium exists and is now in `data/plans/`. Two follow-ups
worth flagging for whoever picks this up next:

1. **Maternity Plus Plan 2** (4,000,000-baht annual cap) is sourced in full in this
   file's §1a table and just needs its own YAML record — no new research required.
2. **Thai Life's "ก้าวแรก"** (§2c) was not resolved either way and is the most
   promising unexplored lead, if someone re-fetches it with a real browser.
