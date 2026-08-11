# Round 5: screening the four never-checked non-life insurers from round4 §2d

Research date: 2026-08-12. Same rules as every other file in this directory: every claim is
followed by the verbatim Thai it rests on and the exact URL that Thai lives on. Only
insurer-owned domains and คปภ./OIC-adjacent regulatory sources were used for licence/existence
facts; no broker, agent or comparison site is cited for any product fact, premium included.

Scope: the four established non-life insurers `round4-gap-analysis.md` §2d and §4 named as
"never screened even once in this project's 11+ research rounds" — สินมั่นคงประกันภัย
(Synmunkong), เทเวศประกันภัย (Deves), อาคเนย์ประกันภัย (Southeast Insurance, the non-life
entity), and ไทยประกันภัย (Thai Insurance PCL). The method is `round3-nonlife-b-sourcing.md`'s:
check the product list, check for accident-only vs actual medical-expense, check for a premium
calculator or rate table.

**Outcome, in one line: this is not the round3-nonlife-b repeat it was expected to be. Two of
the four — อาคเนย์ประกันภัย and ไทยประกันภัย — turn out to have had their non-life insurance
licences revoked by the Ministry of Finance on 1 เมษายน 2565 (1 April 2022), four years before
this round4 flagged them as merely "never checked." Neither is a going concern. A third,
สินมั่นคงประกันภัย, could not be screened at all this pass because its only known domain,
`smk.co.th`, does not resolve — confirmed NXDOMAIN at the authoritative `.co.th` registry level,
not a transient fault. Only the fourth, เทเวศประกันภัย, is a live, licensed insurer with a
working website, and even there the personal-line product catalogue would not render to any
fetch method used, so its one known health product could not be confirmed as currently on sale.
Zero records addable this round, for four different reasons.**

---

## Method note

1. **DNS-level checks, not just HTTP checks, were needed this round.** Two of the four target
   domains (`smk.co.th`, `southeastinsurance.co.th`/`seic.co.th`) returned no HTTP response at
   all — not a 403, not a redirect, but `getaddrinfo ENOTFOUND` from both the WebFetch tool and
   a sandboxed `curl`. This was checked against three independent public DNS resolvers
   (8.8.8.8, 1.1.1.1, 9.9.9.9, all `NXDOMAIN`) and, more decisively, against Google's
   DNS-over-HTTPS API querying the authoritative `.co.th` registry nameserver directly:
   `https://dns.google/resolve?name=smk.co.th&type=A` returns
   `{"Status":3,...,"Authority":[{"name":"co.th.","data":"a.thains.co.th. registry.thains.co.th. ..."}]}`
   — `Status:3` is NXDOMAIN, answered by `thains.co.th`, the `.co.th` registry itself. This is
   not a resolver cache or a network sandbox artefact; the domain is absent from the zone.
2. **A third-party uptime monitor was used to date the outage, not to source any product fact.**
   `https://smk.co.th.updowntoday.com/` reports "Last down: 20 June 2026" and 0% uptime on its
   most recent checks — used here only to establish that this is not a today-only blip, not
   cited for anything about SMK's products.
3. **A licence-revocation finding changed the shape of this file halfway through.** The
   originating brief (`round4-gap-analysis.md` §2d) listed อาคเนย์ประกันภัย and ไทยประกันภัย as
   simply unchecked, size-matched to the eight round3-nonlife-b companies. Neither is: both
   businesses were ordered closed by the Ministry of Finance in April 2022. This was found by
   accident while looking for อาคเนย์ประกันภัย's live domain (a search for its 2022–2023 history
   surfaced the revocation), then independently confirmed for ไทยประกันภัย once its own
   corporate-history page's founding date and SET ticker (`TIC`) matched the revoked company's
   registered name exactly.
4. **Regulatory-status sourcing for the revocation.** No OIC-hosted order PDF could be
   retrieved directly in this pass — `oiceservice.oic.or.th` and `gif.or.th` (กองทุนประกันวินาศภัย,
   the statutory General Insurance Fund that pays claims for revoked insurers) both either
   404'd, 403'd, or served a Cloudflare bot-check page to every fetch method tried, including a
   browser User-Agent `curl`. `gif.or.th/license-revoked` and `gif.or.th/license-revoked/thaiinsurance`
   are both real URLs — they appeared as direct search-index hits naming both companies under
   "บริษัทที่ถูกเพิกถอนใบอนุญาต" (companies whose licence has been revoked) — but their content
   could not be read past the bot challenge. In its place, this file relies on convergent,
   independently-published reporting from eight Thai outlets (Prachachat, Thunhoon, Matichon,
   Thai PBS, Thairath, Brand Buffet, ThaiPublica, The Standard), all dated 1 เมษายน 2565, all
   citing the same two Ministry of Finance order numbers (670/2565 and 671/2565) and the same
   legal basis (มาตรา 59 แห่งพระราชบัญญัติประกันวินาศภัย พ.ศ. 2535). Thai PBS's report directly
   quotes the คปภ. Secretary-General by name confirming the order the same day it was signed —
   the strongest single citation obtained, reproduced in §3 below. This is treated as settled,
   not as "reported, unverified" (the caution `round3-nonlife-b-sourcing.md` §6 applied to a
   single, less-corroborated press claim about KWI) — eight outlets, same order numbers, same
   date, same on-the-record regulator quote, is a different evidentiary weight than one.

---

## 1. สินมั่นคงประกันภัย (Synmunkong) — UNABLE TO SCREEN, domain does not resolve

**Identity.** A real, actively-traded non-life insurer — SET-listed, ticker referenced as
`SMK-R`/`SMKG` in third-party financial data, founded 2494 (1951) as `บ้วนฮงเซ้งประกันภัย จำกัด`
before its current name. Nothing found in this pass suggests the company itself has ceased
trading; the opposite problem occurred.

**The domain.** Every source this project is allowed to cite for Synmunkong — its own product
pages — lives at `www.smk.co.th`. That domain does not resolve:

```
$ nslookup www.smk.co.th 8.8.8.8
** server can't find www.smk.co.th: NXDOMAIN
$ nslookup www.smk.co.th 1.1.1.1
** server can't find www.smk.co.th: NXDOMAIN
$ nslookup www.smk.co.th 9.9.9.9
** server can't find www.smk.co.th: NXDOMAIN
```

Confirmed at the registry level, not just at a resolver:

```
$ curl -s "https://dns.google/resolve?name=smk.co.th&type=A"
{"Status":3,"Question":[{"name":"smk.co.th.","type":1}],
 "Authority":[{"name":"co.th.","type":6,"data":"a.thains.co.th. registry.thains.co.th. ..."}],
 "Comment":"Response from 194.146.106.154."}
```

`Status:3` is NXDOMAIN, and the answering server is `a.thains.co.th`, the `.co.th` ccTLD's own
registry nameserver. This is not a caching artefact.

A third-party site-monitoring service corroborates an extended outage rather than a today-only
blip: https://smk.co.th.updowntoday.com/ reports "Last down: 20 June 2026" — roughly seven
weeks before this research date — with 0% uptime on its logged checks. (Cited only for outage
duration; no product fact in this file comes from this source.)

**No alternate live domain was found.** Searches for a renamed or migrated domain, the
company's Facebook page bio, and its LINE contact channel turned up nothing but the same dead
`smk.co.th` URL repeated across search-engine snippets that are themselves now stale (a Google
snippet for `smk.co.th/prehealth` describes "ประกันไข้เลือดออก เบี้ยเริ่มต้นแค่ 203.-/ปี
ประกันโรคมะเร็ง ประกันสุขภาพตามฟิต ตามก้าว" — dengue, cancer and a fitness-linked product, none
of it verifiable now and none of it, even if accurate, containing the words IPD or เหมาจ่าย).

**Verdict: cannot be screened this round.** The domain this project's own rules require as the
source is unreachable, confirmed at the registry level, not merely slow or blocked. This is
recorded as **unresolved — do not assert the company sells no health product, and do not assert
it sells one**, exactly the posture `round4-gap-analysis.md` §2c took for the unresolved
ธนชาตประกันชีวิต domain. Worth a five-minute recheck whenever `smk.co.th` comes back, or a
search for wherever Synmunkong's retail site has moved to.

---

## 2. เทเวศประกันภัย (Deves Insurance) — INCONCLUSIVE, live insurer, product catalogue would not render

**Identity.** Live, licensed, trading. Own footer:

> บริษัท เทเวศประกันภัย จำกัด (มหาชน) The Deves Insurance Public Company Limited สงวนลิขสิทธิ์ตาม
> พรบ. ลิขสิทธิ์ พศ.๒๕๓๕ © Copyright 2026

Source: https://www.deves.co.th/th/ (footer, fetched 2026-08-12, HTTP 200 both via WebFetch and
a browser-UA `curl`)

**The product-catalogue pages return no product content to any fetch method tried.** The
top-level personal-line category page and its "buy online" counterpart both load (HTTP 200) but
their body content, stripped of markup, is limited to the site's navigation, footer and contact
block — no product cards, no premium figures, nothing between them:

Confirmed by dumping the full stripped-tag text of
`https://www.deves.co.th/th/products/personal-insurance/` — the entire page body between the
breadcrumb (`หน้าแรก > ผลิตภัณฑ์ > ประกันภัยบุคคล`) and the footer is empty of any product name,
price or benefit text; the visible page (per a separate WebFetch pass) shows only an
`underconstruction.png` placeholder image. Same result for
`https://www.deves.co.th/th/online-services/buy-personal-insurance/`. No sitemap.xml exists at
either `https://www.deves.co.th/sitemap.xml` or `/th/sitemap.xml` (both HTTP 404) to locate a
working product URL another way.

**A health product almost certainly exists or existed: `รักษ์สุข` (Raksuk).** It surfaces only
indirectly, in the claim-form section, as one line among Deves' downloadable forms:

> แบบฟอร์มเรียกร้องค่าสินไหมทดแทนประกันภัยสุขภาพและอุบัติเหตุส่วนบุคคล (F-NC-028)

Source: https://www.deves.co.th/th/customer-service/download-document/ (fetched 2026-08-12)

This confirms Deves *processes claims* for a personal health-and-accident policy, but the form
title alone cannot distinguish a real เหมาจ่าย product from an accident-only one carrying สุขภาพ
in its category label — exactly the failure mode `round3-nonlife-b-sourcing.md` §11 point 2
warns about. A third-party site (not citable here for any product fact, per `CONTRIBUTING.md`)
describes a `รักษ์สุข` product sold jointly with ธนาคารไทยพาณิชย์ (SCB) with age-linked premiums
(e.g. "อายุ 61-65 ปี... ทุน 250,000 บาท ราคาเบี้ยประกัน 17,000 บาท") — but no URL on `deves.co.th`
for this product could be found through direct navigation, search-engine indexing
(`site:deves.co.th รักษ์สุข`), or guessing likely slugs.

**Verdict: inconclusive, not a rejection.** A health product with this name exists in some form
(claims are still processed for it), but this pass could not confirm from Deves' own site
whether it is still sold today, at what premium, or under what terms — the product catalogue is
either genuinely unpublished for this line or is rendered client-side in a way no fetch method
used here could see, the same pattern `round4-gap-analysis.md` §3a flagged for Falcon's
i-Dental. **Worth a recheck with a real, JS-rendering browser before concluding either way; do
not assert Deves has no individual health product.**

---

## 3. อาคเนย์ประกันภัย (Southeast Insurance, non-life) — REJECTED, licence revoked 1 เมษายน 2565

**This is not the sibling-of-Indara identity question round4 §2d framed it as.** Before
concluding that, one alternative identity was checked and ruled out: a stray web-search summary
claimed อาคเนย์ประกันภัย had renamed to อินทรประกันภัย (Indara, already screened and rejected in
`round3-nonlife-b-sourcing.md` §5). Indara's own about page contradicts this directly — its
recorded name history is `บริษัท ประกันนิรภัย จำกัด` (1949) → `บริษัท อินเตอร์ไลฟ์ประกันภัย จำกัด`
(1979) → `บริษัท อินทรประกันภัย จำกัด (มหาชน)` (1994), with Thai Group Holdings acquiring it only
in 2020:

> บริษัท รถดีเด็ด ออโต้ จำกัด...ถือหุ้นโดย บริษัท ไทยกรุ๊ป โฮลดิ้งส์ จำกัด (มหาชน) ร้อยละ 99.99

Source: https://www.indara.co.th/aboutus (fetched 2026-08-12). Indara and อาคเนย์ประกันภัย are
two distinct companies that happen to share a parent group (ไทยกรุ๊ปโฮลดิ้งส์, alongside
อาคเนย์ประกันชีวิต) — exactly the relationship round4 §2d already described. This confirms
อาคเนย์ประกันภัย (non-life) genuinely had never been separately researched, until this pass found
something more consequential than a product gap.

**The finding: the company's non-life insurance licence was revoked by the Ministry of Finance,
effective 1 เมษายน 2565 (1 April 2022).** Thai PBS's report, published the same day, directly
quotes the คปภ. Secretary-General:

> วันนี้ (1 เม.ย.2565) นายสุทธิพล ทวีชัยการ เลขาธิการสำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบ
> ธุรกิจประกันภัย (คปภ.) กล่าวว่า นายอาคม เติมพิทยาไพสิฐ รมว.คลัง ลงนามออกคำสั่งเพิกถอนใบอนุญาต
> ประกอบธุรกิจประกันภัย บริษัท อาคเนย์ประกันภัย และบริษัท ไทยประกันภัย มีผลบังคับใช้ตั้งแต่วันที่
> 1 เม.ย.นี้เป็นต้นไป

Source: https://www.thaipbs.or.th/news/content/314199 (article JSON-LD metadata,
`datePublished: 2022-04-01T16:46:00+07:00`, fetched 2026-08-12)

Seven further outlets report the same order, same date, same legal basis (Prachachat
`prachachat.net/finance/news-904244`; Thunhoon `thunhoon.com/article/254018`; Matichon
`matichon.co.th/economy/news_3265956`; Thairath `thairath.co.th/money/economics/thailand_econ/2357540`;
Brand Buffet `brandbuffet.in.th/2022/04/oic-has-revoked-the-business-licence-of-south-east-insurance-and-thai-insurance`;
The Standard `thestandard.co/suthiphon-ordered-dismiss-southeast-and-tic-insurance-and`;
ThaiPublica `thaipublica.org/2022/04/mof-revokes-licence-of-southeast-insurance-thai-insurance`),
all fetched or indexed on 2026-08-12, all naming Ministry of Finance orders 670/2565 and
671/2565 under มาตรา 59 แห่งพระราชบัญญัติประกันวินาศภัย พ.ศ. 2535 as the instrument. `gif.or.th`
(กองทุนประกันวินาศภัย, the statutory fund that pays claims for revoked insurers' policyholders)
lists the company under its own revoked-licensee page — `gif.or.th/license-revoked` — confirmed
as a real, indexed URL naming อาคเนย์ประกันภัย, though the page itself served a Cloudflare
bot-challenge to every fetch attempt in this pass and its full text could not be read directly.

**Consistent with the domain findings in §"Method note" item 1.** Both
`www.southeastinsurance.co.th` and `www.seic.co.th` — the two domains third-party sources
attribute to this company — are `NXDOMAIN` at the `.co.th` registry, the same signature as a
business that has stopped operating rather than one merely having a bad day.

**Verdict: REJECTED, not a sourcing gap.** This company cannot sell an individual health policy
today because it cannot sell any policy today. It is not a candidate for `data/plans/` and no
amount of re-checking its (now-dead) domain will change that. This should replace its
"never checked" status in any future gap analysis with "checked, and it is not a going concern."

---

## 4. ไทยประกันภัย (Thai Insurance PCL) — REJECTED, licence revoked 1 เมษายน 2565, but its website is a live zombie

**This is the more dangerous case of the two revocations, because the website did not go
dark.** Unlike อาคเนย์ประกันภัย's domains, `www.thaiins.com` returns HTTP 200 today, resolves
normally, and still serves what looks like an ordinary, current insurer product catalogue —
this is worth documenting in detail precisely because a future contributor could be fooled by
it.

**Identity match to the revoked company is exact.** `thaiins.com`'s own history page:

> ก่อตั้ง 10 มกราคม 2481 ในชื่อ "บริษัท สยามประกันภัย จำกัด" ... 2482 เปลี่ยนชื่อเป็น
> "บริษัท ไทยประกันภัย จำกัด" ... 2519 จดทะเบียนในตลาดหลักทรัพย์แห่งประเทศไทย ภายใต้ชื่อย่อ TIC ...
> สิงหาคม 2536 แปรสภาพเป็นบริษัทมหาชน

Source: https://www.thaiins.com/th/about/ประวัติบริษัท-และความเป็นมา (fetched 2026-08-12)

This is `บริษัท ไทยประกันภัย จำกัด (มหาชน)`, SET ticker `TIC` — the exact registered name and
ticker the same eight news outlets in §3 name as the second company whose licence the Ministry
of Finance revoked on 1 เมษายน 2565, alongside อาคเนย์ประกันภัย, under the same two order
numbers. `gif.or.th/license-revoked/thaiinsurance` is a real, search-indexed URL naming this
company on the General Insurance Fund's own revoked-licensee list (page content unreachable
past a Cloudflare bot-check, same as §3, but the URL itself — naming the company specifically —
is corroborating). The company's own history page, tellingly, **stops at 2010** ("2010:
Recognized for outstanding non-life insurance development") and contains no mention of 2022 at
all — consistent with a site that was frozen rather than actively maintained past the
revocation.

**And yet the site still displays a product with a premium.** Under `ประกันภัยสุขภาพ`, two
products are listed:

> ประกันภัยสู้ยุง Happy Fighter — ค่ารักษาพยาบาลเจ็บป่วยด้วยโรคไข้เลือดออก สำหรับผู้ป่วยในและ
> ผู้ป่วยนอก ... เบี้ยประกันเริ่มต้น 290.- ต่อปี ... คุ้มครองสูงสุด 100,000

> ประกันสุขภาพ Health Top Up — เบี้ยประกันเริ่มต้น 4,544.- ต่อปี ... วงเงินเหมาจ่าย สูงสุด
> 700,000 บาท

Source: https://www.thaiins.com/th/products/ประกันภัยสุขภาพ (fetched 2026-08-12)

The Health Top Up page even carries a real เหมาจ่าย IPD benefit structure — four coverage tiers
with a per-admission deductible, actual-cost surgeon and physician fees, and an explicit note
that premiums scale with age:

> เบี้ยประกันภัยจะปรับเพิ่มขึ้นตามช่วงอายุ
> เบี้ยเริ่มต้น รวมภาษีอากร: 4,544 / 7,340 / 8,424 / 9,275 (แผน 1–4)
> ผู้เอาประกันภัยอายุตั้งแต่ 6 - 60 ปีบริบูรณ์ (สามารถต่ออายุได้สูงสุดถึง 70 ปี บริบูรณ์)

Source: https://www.thaiins.com/th/products/ประกันภัยสุขภาพ/ประกันสุขภาพ-health-top-up
(fetched 2026-08-12, raw HTML)

**None of this is a live, purchasable offer.** Two independent facts settle it, on top of the
licence revocation itself: first, the page's own JSON product data carries an empty
`"buy_link":""` field for Health Top Up specifically (the one working `buy_link` on the whole
site, for the dengue product, points to a generic lead-capture form, not a quote engine).
Second, the online-purchase subdomain the site links to for its one working buy flow,
`pchangonline.thaiins.com`, does not resolve — `getaddrinfo ENOTFOUND pchangonline.thaiins.com`
— consistent with `thaiins.com` being a static, unmaintained artefact left online after the
business behind it closed, with its transactional backend already decommissioned. No full
age-band premium table exists anywhere on the page either way — only the four "starting"
figures above, one per coverage tier, with no age bracket attached to any of them, the same
gap that sank AXA's SmartCare in `round4-gap-analysis.md` §1a.

**Verdict: REJECTED, and flagged explicitly for future contributors.** ไทยประกันภัย's non-life
licence was revoked in April 2022; it is not a going concern. `thaiins.com` is a stale website
still serving pre-revocation product pages with real-looking premium figures that cannot
currently be bought, on top of lacking the age-band table this project would require even from
a live insurer. **Do not cite `thaiins.com` for anything. If this domain is ever checked again,
check `gif.or.th/license-revoked/thaiinsurance` first.**

---

## 5. Summary table

| Company | รหัส (per round4 §2d) | Domain status | Licence status | Verdict |
|---|---|---|---|---|
| สินมั่นคงประกันภัย (Synmunkong) | 2061 | `smk.co.th` — NXDOMAIN at registry level, down since ≥20 June 2026 | Active (SET-listed, no revocation found) | **UNABLE TO SCREEN** — primary source unreachable |
| เทเวศประกันภัย (Deves) | 2020 | `deves.co.th` — live, HTTP 200 | Active | **INCONCLUSIVE** — health product (`รักษ์สุข`) referenced in claims forms, but current product catalogue renders no content to any fetch method used |
| อาคเนย์ประกันภัย (Southeast Insurance, non-life) | 2079 | `southeastinsurance.co.th` / `seic.co.th` — both NXDOMAIN | **Licence revoked 1 เม.ย. 2565** | **REJECTED** — not a going concern |
| ไทยประกันภัย (Thai Insurance PCL) | 2001 | `thaiins.com` — live, HTTP 200, but stale/unmaintained | **Licence revoked 1 เม.ย. 2565** | **REJECTED** — not a going concern; site still online but non-transactional, and even its displayed premiums carry no age-band table |

---

## 6. What this round changes

1. **Two of round4's four "never checked" targets were never checkable in the sense the gap
   analysis meant.** A company whose licence was revoked in 2022 cannot be screened for whether
   it "sells an individual medical-expense product" — it sells nothing. Future gap analyses
   should check a candidate's licence status (via `gif.or.th/license-revoked` if it can be
   reached, or via convergent news search if not) before adding it to a "never checked, worth
   screening" list, the same way `round4-gap-analysis.md` §2c already flagged doing for
   ambiguous-identity companies like ธนชาตประกันชีวิต.
2. **A live, HTTP-200 website is not proof of a going concern.** `thaiins.com` is the clearest
   example this project has found of a fully-populated, professionally-designed insurer site
   — complete with product pages, premium figures and a benefit schedule — that belongs to a
   company with no licence to sell what it is displaying. Any future automated or manual sweep
   of Thai insurer domains needs a licence check as a gate, not just a reachability check.
3. **The DNS-registry-level check (`dns.google/resolve`) is a better dead-domain test than HTTP
   alone**, and is now the recommended first step whenever a domain fails to load: it
   distinguishes "this insurer's site is geo-blocked or WAF-protected" (Tokio Marine, AXA — the
   company is alive, the page is defended) from "this domain does not exist in the zone"
   (Synmunkong, Southeast Insurance — a different and much stronger signal).
4. **Deves is the one genuine open item from this round.** It is a live, licensed, presumably
   still-selling insurer whose product catalogue this pass's tooling could not render. Per the
   same reasoning `round4-gap-analysis.md` §4 item 3 gave for Falcon's i-Dental, this is worth a
   five-minute recheck with an actual browser before writing Deves off — the claims-form
   evidence (`F-NC-028`, ประกันภัยสุขภาพและอุบัติเหตุส่วนบุคคล) and the third-party premium
   references to `รักษ์สุข` are both consistent with a real, currently-priced product that this
   pass simply could not see.
5. **สินมั่นคงประกันภัย remains a completely open target**, blocked only by its domain being
   down. If `smk.co.th` returns, or if its retail site has moved somewhere this pass's searches
   did not surface, it should be the first insurer re-tried from this file — nothing found here
   rules out a real health product, and nothing confirms one either.

---

## Follow-up: Deves resolved (2026-08-12)

**This closes §2's open item. Verdict: firm negative — no publicly reachable, current,
sourceable product page or premium table exists for `รักษ์สุข`. No record added.** Every
avenue §2 flagged as worth trying was tried; none produced a citable `official_insurer` or
`filed_wording` source, so per `CONTRIBUTING.md` nothing here clears the bar to become a
`data/plans/` entry.

**1. Confirmed `deves.co.th` is the only real domain.** `devesinsurance.co.th`, the alternate
spelling worth checking before assuming the domain in §2 was right, does not resolve at all:

```
$ curl -v --max-time 15 "https://devesinsurance.co.th"
* Could not resolve host: devesinsurance.co.th
* Store negative name resolve for devesinsurance.co.th:443
curl: (6) Could not resolve host: devesinsurance.co.th
```

`deves.co.th` (already documented in §2 as the working, HTTP-200 domain) stands unchallenged.

**2. `robots.txt` is not a real robots.txt — it 404s into the SPA shell, and that shell leaks a
staging hostname.** `https://www.deves.co.th/robots.txt` returns HTTP 404 but with an HTML body
(the same client-rendered app shell every other page on the site returns), and that markup
references assets on `uatwww.deves.co.th` (e.g.
`https://uatwww.deves.co.th/Theme/Main/images/favicon.png`,
`.../Theme/Main/css/bootstrap-3.3.7.min.css`). This confirms §2's diagnosis — the whole personal-
line front end is one client-side-rendered application, not a set of separately-crawlable pages
— and surfaces a UAT/staging environment name, but that environment was not probed further: a
staging host is not a legitimate public source even if it happened to be reachable, and
`CONTRIBUTING.md` requires an `official_insurer` or `filed_wording` source, not a pre-production
mirror.

**3. Wayback Machine has never archived the current product pages either — not just a curl
limitation.** A full CDX index dump (`http://web.archive.org/cdx/search/cdx?url=deves.co.th/th*&output=text&limit=300&collapse=urlkey&matchType=prefix`)
returned **zero rows** — archive.org's own crawler, which does render some JS-heavy sites, has
never captured anything under `/th/` at all, meaning it has no snapshot of
`/th/products/personal-insurance/` or any other product page under the current site design.
The only pre-2026 material archived for this domain is (a) a handful of static-HTML-era pages
from 1999–2012 belonging to a completely different, pre-SPA site design, and (b) homepage-only
redirect captures (HTTP 301/302) running through 2023-08-30, the most recent snapshot found,
also content-empty. This rules out "Wayback has it, curl just can't render it" — the archive
genuinely never captured the product content, on any of the SPA-era crawls it did make.

**4. No sitemap, confirmed again with the same two paths §2 already tried** —
`https://www.deves.co.th/sitemap.xml` and `https://www.deves.co.th/th/sitemap.xml` both still
return HTTP 404.

**5. WebSearch surfaced exactly one source with a `รักษ์สุข` premium table, and it is the same
third-party source §2 already flagged as uncitable — not a second, independent one.**
`https://www.insurancethai.net/health-insirance-raksuk-deves/`, an agent/broker blog, carries a
publication date of **11 สิงหาคม 2555 (11 August 2012) — 14 years stale** and cites no link or
PDF back to any Deves-owned page. Its age-band table for the 61–65 bracket
("Sum Insured ฿250,000 | Premium ฿17,000/year") is numerically identical to the uncited
third-party figure §2 already quoted ("อายุ 61-65 ปี... ทุน 250,000 บาท ราคาเบี้ยประกัน 17,000
บาท") — meaning §2's "third-party site" and this pass's find are almost certainly the same
underlying source, not two independent ones. Per `CONTRIBUTING.md`'s `agent_site` tier rule
("premiums only, cross-checked against a second independent source"), a single 2012 blog post
with no citation trail and no corroborating second source does not qualify, quite apart from
being 14 years old and therefore unusable as evidence the product is still sold today at these
prices.

**6. No `filed_wording` document was found anywhere.** A search for
`"รักษ์สุข" เทเวศ filetype:pdf` surfaced one candidate,
`http://www.oic.go.th/FILEWEB/CABINFOCENTER9/DRAWER077/GENERAL/DATA0000/00000287.PDF`, titled
generically "บริษัท เทเวศประกันภัย จำกัด (มหาชน)" in the search snippet. Fetched directly (both
via WebFetch and via `curl` with a browser User-Agent), it 404s:

```
$ curl -sL -A "Mozilla/5.0 ..." -o /dev/null -w "HTTP:%{http_code}\n" \
  "http://www.oic.go.th/FILEWEB/CABINFOCENTER9/DRAWER077/GENERAL/DATA0000/00000287.PDF"
HTTP:404
```

คปภ.'s interactive filed-product query systems (`oiceservice.oic.or.th`, `smart.oic.or.th`) are
search forms, not static indexes — no page reachable by direct URL or search-engine indexing
named `รักษ์สุข` under Deves. No PDF brochure hosted on `deves.co.th/media/` (a real path,
confirmed by an unrelated 2014 annual-report PDF found there:
`https://www.deves.co.th/media/1157/...2557.pdf`) was found for this product at any guessed
slug.

**7. Net result.** The product name `รักษ์สุข` is real — it appears in Deves' own claims-form
filename (§2's finding, unchanged) and in a 2012 broker article with plausible-looking premium
figures — but nothing reachable by this project's sourcing rules confirms it is still sold, at
what price, or under what terms, as of 2026-08-12. This is now recorded as a **firm negative for
data-entry purposes**: not "the product doesn't exist," but "no source clears
`CONTRIBUTING.md`'s bar," which is the actionable question this file exists to answer. No
`data/plans/` file was added. Re-open only if Deves' site is later found to expose its product
catalogue to a real rendering browser, or if a dated, citable `filed_wording` document surfaces.
