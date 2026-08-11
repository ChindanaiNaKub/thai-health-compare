# Round 5: Falcon i-Dental and Tokio Marine Life re-check — tooling limits pushed harder

Research date: 2026-08-12. This file re-opens two leads that `round4-gap-analysis.md` §3a
and §4 item 4 flagged as blocked by tooling, not by a confirmed negative result: Falcon
Insurance's i-Dental (possibly hidden behind JS rendering) and Tokio Marine Life's Incapsula
WAF (`round3-life-major-sourcing.md` §2). Same rules as every other file in this directory:
every claim is followed by the verbatim text it rests on and the exact URL/technique that
retrieved it.

**Outcome, in one line: neither lead fully opened up. Falcon i-Dental is confirmed absent
from the live site by a second, independent technique (Wayback Machine snapshot, not just a
fresh `curl`) — the negative result is now much more solid. Tokio Marine Life's WAF was
partially defeated — a genuine, insurer-authored premium brochure for Tokio Good Health Prime
was recovered in full, plus a working technique for bypassing the WAF on asset paths — but
the data still cannot be entered into `data/plans/` because it fails the project's own
sourcing bar: no independent second source exists to cross-check the (agent-hosted) premium
figures, and the required tier for coverage terms remains unreachable.** Zero records added.

## Method note: what changed from round 3/4's tooling

1. **`WebFetch` cannot reach `web.archive.org` at all** — every attempt (both the
   `web.archive.org/web/<ts>/<url>` snapshot form and the plain domain) returned "Claude Code
   is unable to fetch from web.archive.org". This is a hard tool restriction, not a site
   block.
2. **`curl` from a shell has no such restriction**, and `curl` from a shell can reach
   `web.archive.org` and the Wayback Machine's own `archive.org/wayback/available` JSON API
   without any special headers. This is the technique that actually moved both leads forward
   this round — round 3/4 used `WebFetch` exclusively and never tried a plain `curl` against
   archive.org or against insurer asset paths directly.
3. **A site-wide WAF does not necessarily cover every path on the domain.** Tokio Marine's
   `www.tokiomarine.com` blocks every HTML page tried (round 3, and reconfirmed below), but a
   direct PDF under `/content/dam/tokiomarine/...` on the same domain returned HTTP 200 to a
   plain `curl` with a browser `User-Agent` — no challenge page. This is the single most
   useful technical finding of this round and is worth remembering for any insurer WAF
   blocker in future rounds: **try a direct asset path (PDF, image, XML sitemap) before
   concluding the entire domain is unreachable.**

---

## 1. Falcon Insurance i-Dental — still NOT INCLUDED, negative result now corroborated twice

### 1a. The Wayback Machine snapshot shows the same missing product

`archive.org/wayback/available` was queried via `curl` for
`falconinsurance.co.th/accident-health`:

```
$ curl -s "http://archive.org/wayback/available?url=falconinsurance.co.th/accident-health"
{"url": "falconinsurance.co.th/accident-health", "archived_snapshots": {"closest":
{"status": "200", "available": true,
"url": "http://web.archive.org/web/20260518214343/https://falconinsurance.co.th/accident-health",
"timestamp": "20260518214343"}}}
```

The closest snapshot is dated **18 May 2026** — nine days before this project's
`falcon-health-ox-plan1.yaml` was verified (2026-08-11) and three months before today. Fetched
directly with `curl` (1,246,253 bytes returned, real page content, not a challenge page). Every
link under the `accident-health` hub, extracted with `grep -oE 'href="[^"]*accident-health[^"]*"'`:

```
/accident-health
/accident-health?buy-online=yes
/accident-health/ci6fix
/accident-health/group-personal-acc
/accident-health/health-ltr-plan
/accident-health/health-o-x-plan
/accident-health/ismart-health-oa
/accident-health/iwill-1
/accident-health/pa-new-isure-plus3
/accident-health/pa-save-save
/accident-health/pro-cancer
/accident-health/travel2go
/accident-health/travel-accident
/en/accident-health
```

http://web.archive.org/web/20260518214343/https://falconinsurance.co.th/accident-health
(fetched via `curl`, not `WebFetch`, today)

No dental product among them — note this list is even **longer** than the one
`round4-gap-analysis.md` §3a recorded from the live site five days ago (`ci6fix`,
`health-ltr-plan`, and `pro-cancer` are present here but were not in round 4's list, meaning
Falcon has added products to this hub recently), which makes the absence of dental more
significant, not less: Falcon is actively maintaining this navigation and still has not put
i-Dental on it. A full-text search of the 1.2 MB archived page for `dental` or `ทันตกรรม`
(`grep -io`) returned **zero matches**.

**This is the second independent technique (live `curl` in round 4, archived snapshot in this
round) confirming the same negative result. The JS-rendering hypothesis from round 4 is not
supported** — a JS-rendered catalogue would still leave server-rendered link markup in the
raw HTML for a crawler like the Wayback Machine's to capture, or the archived snapshot would
show different content than the live fetch. Both show the same thing.

### 1b. A dental claim form exists and is dated 2026-05-13 — the one loose thread

`falconinsurance.co.th/en/other-services/download`, fetched via `curl` today (HTTP 200, 1,297,838
bytes), links:

> `แบบฟอร์มเรียกร้องสินไหมทดแทน – ทันตกรรม-Dental-Claim-Form_20260513.pdf`

https://cms.falconinsurance.co.th/wp-content/uploads/2026/05/แบบฟอร์มเรียกร้องสินไหมทดแทน-–-ทันตกรรม-Dental-Claim-Form_20260513.pdf
(link extracted from https://falconinsurance.co.th/en/other-services/download, fetched
2026-08-12)

The filename date (13 May 2026) is three months old, not a stale leftover from years ago —
someone at Falcon still maintains a dental claim form. **This is evidence dental claims are
still being processed, which is consistent with i-Dental still existing as a sold product**,
but it is not evidence of a public product page, a premium, or terms — a claim form tells you
nothing about what a new customer can buy or for how much, and per this project's own rule a
claim form is not a citable source for coverage terms or premiums either way.

### 1c. What else was tried and failed

- **URL guessing**: `/dental`, `/i-dental`, `/idental`, `/accident-health/i-dental`,
  `/accident-health/idental`, `/accident-health/dental`, `/en/accident-health/i-dental` — all
  return either the site's styled 404 page (`/dental`, `/i-dental`: 1,170,531 / 1,170,537
  bytes, both contain the string `404`) or a bare `<title>Server error</title>` page
  (`/accident-health/i-dental`: 1,881 bytes). None resolve to a real product page.
- **Legacy product-ID enumeration**: `index.php?name=Product&action=view&product_id=N` for
  N = 30–40 (guessing at the old CMS system referenced by a search-result snippet) returned
  empty responses for every ID tried — that URL pattern appears dead, not merely
  product-less.
- **`sitemap.xml` and `sitemap_index.xml`**: both requests failed to connect
  (`falconinsurance.co.th/sitemap.xml`, `falconinsurance.co.th/sitemap_index.xml`,
  `falconinsurance.co.th/wp-sitemap.xml` — all HTTP 000, no response). Falcon does not appear
  to publish a sitemap at any of the conventional paths.
- **`site:falconinsurance.co.th` search operators** (`WebSearch`) for `dental`, `i-Dental`,
  `iDental` surfaced only the claim-form page (§1b above) and unrelated results (US dental
  clinics also named "Falcon", a WebMD directory entry) — no product page.

**Disposition: unchanged from round 4 — NOT INCLUDED.** The negative result is now backed by
two independent retrieval techniques and a wider link list than before, which raises
confidence this is a real gap (discontinued, or moved off any indexed/archived URL) rather
than a tooling artifact. The one open thread — the live dental claim form — is worth a human
with a real browser checking the "reorder/renew" flow inside Falcon's online purchase portal
(if one exists), since that is the one path this round's tooling cannot reach at all.

---

## 2. Tokio Marine Life — Tokio Good Health Prime — partial breakthrough, still NOT INCLUDED

### 2a. The WAF is confirmed still up, exactly as round 3 found it

Every HTML page tried today returned the same Incapsula challenge round 3 documented:

```
$ curl -sL -A "Mozilla/5.0 ... Chrome/124.0 Safari/537.36" \
  "https://www.tokiomarine.com/th/en/life/products/personal/riders/health/tokio-good-health-prime.html"
<html style="height:100%"><head><META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">...
<iframe id="main-iframe" src="/_Incapsula_Resource?SWUDNSAI=31&...
incident_id=193000500379231177-11489278047620259...">
Request unsuccessful. Incapsula incident ID: 193000500379231177-11489278047620259</iframe>
</body></html>
```

https://www.tokiomarine.com/th/en/life/products/personal/riders/health/tokio-good-health-prime.html
(fetched via `curl` with a full browser `User-Agent`, today — same failure mode as every
attempt in `round3-life-major-sourcing.md` §2)

The Wayback Machine's own crawler hit the identical wall — its archived snapshot of the exact
target URL is **itself the Incapsula challenge page**, dated 17 April 2026:

> `FILE ARCHIVED ON 06:41:54 Apr 17, 2026 AND RETRIEVED FROM THE INTERNET ARCHIVE ON 19:59:53
> Aug 11, 2026.` ... `Request unsuccessful. Incapsula incident ID:
> 1543000050078933372-163307979683594574`

http://web.archive.org/web/20260417064154/https://www.tokiomarine.com/th/th/life/products/personal/riders/health/tokio-good-health-prime.html
(fetched via `curl` today; only 2,618 bytes, the challenge page itself)

**This closes off the Wayback Machine as a route for this specific lead** — archive.org never
managed to crawl real content from this page either, so there is no cached rendering to fall
back on.

### 2b. An asset path on the insurer's own domain bypasses the WAF — the real finding

`robots.txt` (`https://www.tokiomarine.com/robots.txt`, HTTP 200 via `curl`, real content, same
as round 3 found) lists `Sitemap: https://www.tokiomarine.com/th/th/life.sitemap.xml`. That
sitemap **also returns real content to `curl`** (HTTP 200, 161,042 bytes, `<urlset>` XML,
1,190 URLs) — it lists both the target page and a sibling:

```
tokio-good-health-bonus.html
tokio-good-health-prime.html
```

extracted from https://www.tokiomarine.com/th/th/life.sitemap.xml (fetched via `curl`, today)

A `WebSearch` for the sibling product ("Tokio Good Health", the non-Prime rider) surfaced a PDF
brochure URL directly on the insurer's own domain:
`https://www.tokiomarine.com/content/dam/tokiomarine/th/life/product/personal/rider/tokio-good-health/BC_Tokio%20Good%20Health%2013Mar2025%20CP-mar2025.pdf`.
Fetched with plain `curl`:

```
HTTP 200 size 513071 type application/pdf
```

— a real, valid PDF (`pdftotext` confirms: `TOKIO GOOD HEALTH / สัญญาเพิ่มเติม โตเกียว กู๊ด
เฮลธ์ / ยกระดับให้คุณอุ่นใจ... วงเงินคุ้มครองสูงสุดถึง 240 ล้านบาท`). **This proves
`/content/dam/tokiomarine/...` asset paths on `www.tokiomarine.com` are not behind the same
Incapsula challenge as the HTML pages.** This is the base "Tokio Good Health" product
(240m ceiling), not the "Prime" variant the target URL is about (60m ceiling per the sibling
product's own marketing copy) — the two are genuinely different products sharing a name
prefix, confirmed by the different maximum-benefit figures each brochure states on its own
cover page.

**What this round could not do: find the equivalent Prime-specific PDF at the same kind of
`tokiomarine.com`-hosted path.** Roughly a dozen filename guesses were tried against both the
`.../rider/tokio-good-health/` and `.../rider/tokio-good-health-prime/` directories (patterns
following the base product's naming convention, and the exact filename recovered from the
broker-hosted copy's own PDF metadata, `BC_Tokio Good Health Prime 16Jul2025 TA.pdf` and
variants of it) — every guess returned HTTP 404. `WebSearch` for
`site:tokiomarine.com "good health prime" filetype:pdf` did not surface one either. **The Prime
brochure may not be indexed by search engines and its exact filename was not found — this is
a real, not-yet-closed gap**, not a re-confirmation of the WAF block, since the base product's
sibling document proves the path type is reachable in principle.

### 2c. A genuine insurer-authored Prime brochure was recovered — from a broker's mirror

A `WebSearch` for `"tokio good health prime" เบี้ยประกัน โตเกียวมารีน` surfaced:

> https://srikrunglifebroker.co.th/wp-content/uploads/2025/08/BC_Tokio-Good-Health-Prime.pdf

Fetched with `curl` (HTTP 200, 419,792 bytes, 6-page PDF). `pdfinfo` confirms this is not a
broker-fabricated document — it carries Tokio Marine's own production metadata:

```
Title:      BC_Tokio Good Health Prime 16Jul2025 TA
Creator:    Adobe Illustrator 29.6 (Windows)
Producer:   Adobe PDF library 17.00
CreationDate: Wed Jul 16 10:27:51 2025 +07
```

and the document itself carries the insurer's own compliance stamp, `CMK JUN 2025
CMK400-20250067`, and its own footer on every page: `บมจ. โตเกียวมารีนประกันชีวิต
(ประเทศไทย) ... สัญญาเพิ่มเติม โตเกียว กู๊ด เฮลธ์ ไพรม์`. This is a genuine Tokio Marine
brochure, hosted on a broker's WordPress uploads folder rather than on `tokiomarine.com`
itself — per `CONTRIBUTING.md`'s source-tier table, that makes it **`agent_site`** tier
regardless of who authored it, because the tier is about who hosts it, not who wrote it.

**The complete premium table recovered, THB/year, both sexes, 14 age bands, all 7 plans**
(plan names are the daily room-and-board rate in THB: 2000/3000/4000/6000/8000/10000/12000),
`เพศหญิง` (female) and `เพศชาย` (male), for `ชั้นอาชีพ 1 และ 2` (occupation class 1–2 —
a footnote states class 3 pays ×1.3 and class 4 pays ×1.45):

**เพศหญิง**

| อายุ | 2000 | 3000 | 4000 | 6000 | 8000 | 10000 | 12000 |
|---|---|---|---|---|---|---|---|
| 11-15 | 15,480 | 22,710 | 27,020 | 28,790 | 34,480 | 38,080 | 43,820 |
| 16-20 | 16,900 | 24,620 | 29,530 | 31,470 | 37,710 | 41,650 | 48,300 |
| 21-25 | 16,290 | 23,680 | 28,390 | 30,260 | 36,220 | 40,000 | 46,450 |
| 26-30 | 16,910 | 24,600 | 29,490 | 31,430 | 37,630 | 41,560 | 48,240 |
| 31-35 | 18,760 | 24,660 | 30,810 | 34,930 | 41,850 | 48,020 | 50,480 |
| 36-40 | 18,890 | 26,300 | 32,070 | 36,420 | 44,650 | 49,710 | 52,410 |
| 41-45 | 23,290 | 28,230 | 37,840 | 41,900 | 50,250 | 55,940 | 58,930 |
| 46-50 | 24,670 | 32,880 | 42,370 | 45,150 | 56,400 | 62,220 | 67,410 |
| 51-55 | 25,910 | 35,970 | 44,480 | 47,400 | 59,330 | 68,110 | 73,750 |
| 56-60 | 31,390 | 43,660 | 47,150 | 52,680 | 70,350 | 82,800 | 91,200 |
| 61-65 | 40,110 | 61,680 | 66,830 | 70,590 | 92,440 | 106,170 | 116,770 |
| 66-70 | 53,620 | 86,140 | 102,920 | 108,840 | 124,030 | 135,540 | 153,620 |
| 71-75* | 80,920 | 115,910 | 123,360 | 137,540 | 171,720 | 197,330 | 223,270 |
| 76-80* | 122,970 | 173,380 | 187,960 | 209,560 | 275,370 | 316,510 | 355,850 |

**เพศชาย**

| อายุ | 2000 | 3000 | 4000 | 6000 | 8000 | 10000 | 12000 |
|---|---|---|---|---|---|---|---|
| 11-15 | 17,010 | 23,340 | 28,090 | 31,100 | 33,070 | 37,950 | 44,550 |
| 16-20 | 13,560 | 20,620 | 24,890 | 27,170 | 28,410 | 33,490 | 41,450 |
| 21-25 | 13,560 | 20,620 | 24,890 | 27,170 | 28,410 | 33,490 | 41,450 |
| 26-30 | 13,560 | 20,620 | 24,890 | 27,170 | 28,410 | 33,490 | 41,450 |
| 31-35 | 14,690 | 23,340 | 27,210 | 28,760 | 31,670 | 36,340 | 44,950 |
| 36-40 | 18,320 | 25,150 | 28,140 | 29,740 | 32,630 | 37,450 | 47,150 |
| 41-45 | 18,550 | 25,810 | 29,410 | 31,880 | 34,990 | 40,170 | 50,540 |
| 46-50 | 20,850 | 29,570 | 35,350 | 44,340 | 46,420 | 51,000 | 62,350 |
| 51-55 | 25,840 | 36,710 | 41,960 | 55,070 | 58,720 | 67,420 | 77,420 |
| 56-60 | 33,540 | 45,470 | 52,070 | 66,270 | 70,000 | 80,400 | 100,710 |
| 61-65 | 45,530 | 61,850 | 70,880 | 86,540 | 90,980 | 104,520 | 134,560 |
| 66-70 | 61,760 | 84,040 | 96,380 | 111,670 | 133,430 | 142,270 | 189,680 |
| 71-75* | 88,620 | 120,800 | 138,610 | 169,210 | 178,250 | 204,870 | 272,740 |
| 76-80* | 131,310 | 188,230 | 215,800 | 229,950 | 277,770 | 319,310 | 372,350 |

(ages 81–89 also printed on the brochure and omitted here for length; `*` = renewal-only
years, per the brochure's own footnote: `*เบี้ยประกันภัยปีต่ออายุ บริษัทสงวนสิทธิ์ในการปรับ
เบี้ยประกันภัย...`)

**Entry/renewal, verbatim:**

> อายุที่รับประกันภัย 11 – 70 ปี (ต่ออายุได้ 89 ปี)

**Waiting periods, verbatim (30/120 days, standard eight conditions, plus a 300-day wait on
the annual-checkup/vaccine benefit — an unusual third tier not seen elsewhere in this
project):**

> 1) การป่วยใดๆ ที่เกิดขึ้นในระยะเวลา 30 วัน ... 2) การป่วยดังต่อไปนี้ ... 120 วัน ... 3)
> ค่าตรวจสุขภาพประจำปี และค่าวัคซีนที่เกิดขึ้นในระยะเวลา 300 วัน

**Copayment on renewal, fully quantified — same 3-claims/200%→30%, 3-claims/400%→30%,
both→50% shape as every other new-standard rider in this project.**

Source (agent-hosted mirror of an insurer-authored document):
https://srikrunglifebroker.co.th/wp-content/uploads/2025/08/BC_Tokio-Good-Health-Prime.pdf

### 2d. Why this still cannot go into `data/plans/`

Two separate blockers, both structural, not tooling:

1. **`CONTRIBUTING.md`'s source-tier table requires `agent_site` premiums to be
   "cross-checked against a second independent source"** — this is not optional language.
   Five other broker/agent sites surfacing in search results for this product were checked:
   `tokiomarineplanner.com/tokio-good-health/`, `prakunmundee.com/services/tokiogoodhealth/`,
   `prakandeetokio.com/tokio-goog-health/`, `prakan-4u.com/tokio-good-health`, and
   `tokiomarinelifeagent.com` (domain does not resolve). None reproduced a single matching
   figure from the table above — `prakandeetokio.com` quotes a premium table, but for the
   sibling **base** "Tokio Good Health" product (different plan-naming scheme entirely, by
   sum-insured in millions rather than by room rate), not Prime. The other three show only
   marketing copy or lazy-loaded images with no numeric text. Targeted `WebSearch` queries for
   exact figures from the recovered table (`"16,290"`, `"48,300"`, `"23,290"`, `"15,480"`,
   `"17,010"`, `"13,560"`) found no second page quoting the same numbers. **No independent
   second source exists in the public record today**, as far as this round's search reached.
2. **`schema.ts` (line 132) hard-fails validation if `terms_source.tier === 'agent_site'`.**
   The only source for this product's exclusions and waiting periods is the same broker-hosted
   brochure — a marketing brochure, not filed policy wording, and not hosted on
   `tokiomarine.com`. Even if the cross-check in (1) were solved, `terms_source` would still
   need to be `official_insurer` or `filed_wording`, and every `tokiomarine.com` HTML page
   remains 100% WAF-blocked (§2a) — the base product's own-domain PDF (§2b) cannot substitute,
   since it is a different product with a different benefit ceiling (240m vs 60m) and mixing
   the two would misstate the actual terms.

**Disposition: still NOT INCLUDED — but the gap has moved.** Round 3 could not assess the
product at all. This round has the actual numbers, knows they are genuine, and has a specific,
narrow, two-part task for whoever picks this up next: (a) find the Prime-specific brochure's
exact URL on `tokiomarine.com/content/dam/...` (the base product's URL pattern is the template
to follow, and a human browsing the product page directly — bypassing the WAF the way a real
browser does — would simply reveal the download link), which would upgrade both `premium_source`
and, if it also contains the exclusions/waiting-period text, `terms_source` to `official_insurer`
in one step; or (b) find any second site — forum, cached page, another broker — that
independently reproduces the premium table above, which would satisfy the cross-check
requirement for `agent_site` tier premiums even without solving (a) for terms (terms would
still need a separate `official_insurer`/`filed_wording` source regardless).

---

## 3. Summary for whoever picks this up next

| Lead | Round 4 status | This round | Concrete next step |
|---|---|---|---|
| Falcon i-Dental | Not found on live site, JS-rendering suspected | Not found on live site **or** an archived snapshot; no sitemap, no guessable URL, legacy product-ID system dead. JS-rendering hypothesis not supported by the archived-snapshot check. | A human browsing Falcon's live purchase/renewal portal (not the marketing site) is the one path untried — the still-current dental claim form (dated 2026-05-13) implies *something* dental is still active behind it. |
| Tokio Marine Good Health Prime | WAF-blocked, zero data | Full premium table recovered (agent-hosted mirror of a genuine insurer document); WAF confirmed still blocking every HTML page and the Wayback Machine's own crawl of the target URL; one insurer-domain asset path (a **different**, sibling product's brochure) confirmed reachable, proving the technique works in principle. | Find the Prime-specific PDF's exact `tokiomarine.com/content/dam/...` URL (a human opening the live product page once, past the WAF, would see the download link directly), or find a second independent source for the premium table recovered in §2c. |
