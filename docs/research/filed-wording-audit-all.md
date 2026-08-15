# Filed-wording audit — all remaining records

Checked: 2026-08-15. Scope: every plan whose `terms_source.tier` was not
`filed_wording` after the previous top-ten audit. This pass covers all 32
remaining records.

## Result

No record was promoted. The current sources are official insurer pages,
brochures, benefit tables, exception-only documents, or partial summaries. None
is a complete policy wording or a matching, complete summary document for the
plan record.

This is a source-quality result, not a data failure. The existing terms remain
useful where they are bounded by their notes, but they must not be presented as
the complete contract.

## Method

For each record, I rechecked its existing first-party `terms_source.url`, looked
for a matching `กรมธรรม์` or `เอกสารสรุปสาระสำคัญ`, and checked whether the source
itself limits its scope or defers to the policy. The direct availability check
returned HTTP 200 for 29 records. Falcon's legacy image URL failed certificate
validation in the fetch client, but its current official product page is live;
the two AIA source fetches timed out in that client and were rechecked through
the current AIA product/brochure pages.

The bar remains the repository rule: a brochure, marketing page, partial
exception list, or unbanded summary is not enough to label a source
`filed_wording`.

## Findings by insurer and exact records

| Records | First-party source checked | Finding | Disposition |
| --- | --- | --- | --- |
| `bla-happy-health-premier-10m` | [BLA Happy Health Premier](https://www.bangkoklife.com/th/products/detail/269) | The page publishes benefits and calls its exclusions “ตัวอย่างข้อยกเว้นความคุ้มครอง” (example exclusions); it is not the complete policy wording. | Remain `official_insurer`. |
| `ktaxa-ihealthy-ultra-gold` | [KTAXA exception document](https://thailandgi-ktaxa.cdn.prismic.io/thailandgi-ktaxa/aRs2P7pReVYa4jNO_Exception_iHealthy_Ultra-1--1-.pdf) | Exception-only document; the product material distinguishes the published list from the complete policy. | Remain `official_insurer`. |
| `generali-gen-health-hero-plus-m1`, `generali-gen-health-hero-plus-plan1`, `generali-gen-health-hero-plus-plan4` | [Generali Gen Health Hero Plus](https://generali.co.th/individual-insurance/gen-health-hero-2/) | Product page/brochure summary; no matching full wording or complete summary document was published. | Remain `official_insurer`. |
| `chubbsamaggi-long-stay-visa-plan1` | [Chubb Long Stay Visa Plus PDF](https://www.chubb.com/content/dam/chubb-sites/chubb-com/th-th/cl/long-stay-visa/long-stay-visa.pdf) | The brochure says it is not part of an insurance policy and sends the reader to the original policy for complete conditions. | Remain `official_insurer`. |
| `dhipaya-tip-insure-yant-basic-15-40`, `dhipaya-tip-insure-yant-basic-61-70`, `dhipaya-tip-insure-yant-plus-15-40` | [TIP Insure Talisman](https://ft.tipinsure.com/HealthTalisman/index) | Product/quote pages publish benefit tables, but no matching policy wording or summary document is publicly linked. | Remain `official_insurer`. |
| `dhipaya-tip-non-chill-1` | [TIP Insure Non Chill](https://ft.tipinsure.com/Health/index) | Product page and calculator only; the record already documents that no policy or summary document is public. | Remain `official_insurer`. |
| `thailife-health-fit-dd-15m`, `thailife-health-fit-shield-plan1`, `thailife-health-fit-ultra-60m` | [Thai Life Health Fit DD](https://product.thailife.com/ประกันสุขภาพ/ประกันสุขภาพเฮลท์ฟิตดีดี/), [Shield](https://product.thailife.com/ประกันสุขภาพ/เฮลท์ฟิตชีลด์/), [Ultra](https://product.thailife.com/ประกันสุขภาพ/ประกันสุขภาพเฮลท์ฟิตอัลตร้า/) | Current product pages and sales material; no complete matching wording was found. | Remain `official_insurer`. |
| `thaihealth-wealthy-healthy-wh3000` | [Thai Health summary PDF](https://www.thaihealth.co.th/files/summary_healthy.pdf) | This is an official summary, but it explicitly says it covers only “บางส่วนเท่านั้น” (some parts only) and directs readers to the policy. The published policy wording is for the separate Simply Healthy record, not this Wealthy Healthy plan. | Remain `official_insurer`; do not cross-apply the other plan's wording. |
| `oceanlife-supreme-health-smart`, `oceanlife-enjoy-health-extra-plan1` | [Ocean Life Supreme Health](https://www.ocean.co.th/our-products/health-insurance/supreme-health), [Enjoy Health Extra](https://www.ocean.co.th/our-products/health-insurance/enjoy-health-extra) | Current pages publish product information and partial conditions; the pages defer to the policy and do not expose complete matching wording. | Remain `official_insurer`. |
| `navakij-5yod-ek`, `navakij-5yod-tho`, `navakij-5yod-tri`, `navakij-5yod-jatu`, `navakij-5yod-bencha` | [Navakij 5 Yod](https://www.navakij.co.th/th/products/miscellaneous-insurance/ประกัน-๕-ยอด-มีไว้ยอดเยี่ยม-หมดห่วงเรื่องประกัน) | Product page and application/product-detail documents defer coverage and exclusions to an unpublished policy. | Remain `official_insurer`. |
| `falcon-health-ox-plan1` | [Falcon Health O-X](https://falconinsurance.co.th/en/accident-health/health-o-x-plan) | The official page says the displayed document is not the insurance contract and that complete conditions are in the policy wording supplied after purchase. | Remain `official_insurer`. |
| `muangthailife-maternity-plus-plan1` | [Muang Thai Life Elite Health Plus brochure](https://www.muangthai.co.th/filestorage/brochures/04-0480_%20EliteHealthPlus_TH_20250221.pdf) | Official brochure with maternity benefits; no matching filed contract wording was found. | Remain `official_insurer`. |
| `mti-health-me-plus-10m`, `mti-health-me-plus-1m` | [Muang Thai Insurance HEALTH ME+](https://www.muangthaiinsurance.com/th/product/health-insurance) | Current product page and 2025 brochure publish benefits and waiting periods; the product page has no conditions document and no complete matching wording. | Remain `official_insurer`. |
| `rabbitlife-health-protect-10000` | [Rabbit Life Health Protect](https://www.rabbitlife.co.th/th/products/health-protect/product-detail) | The current product page links a brochure/lead form; no policy wording or summary document is published. | Remain `official_insurer`. |
| `viriyah-v-prestige-care-plan1` | [Viriyah V Prestige Care brochure](https://vinsure.viriyah.co.th/VHealth/media/Brochure/BrochureDeduct/v-prestige-care-deduct-coverage-aug.pdf) | Official brochure only; no matching policy wording or separate summary document was found. | Remain `official_insurer`. |
| `southeastlife-standard-health-plus-1000` | [SE Life Standard Health Plus brochure](https://www.southeastlife.co.th/uploads/product/pdf/20230619154520_7750.pdf) | Official brochure only; the insurer's service/document pages expose administrative forms, not policy wording or a summary document. | Remain `official_insurer`. |
| `fwd-prima-care-s`, `fwd-precious-care-bronze` | [FWD Prima Care brochure](https://www.fwd.co.th/files/v3/assets/blt331c1aa12dcfd37a/blt3866802f75fca3b6/69521ad46ae381bb2f51eca9/TH_Brochure_Prima_Care_V1.pdf), [Precious Care brochure](https://www.fwd.co.th/files/v3/assets/blt331c1aa12dcfd37a/blt36c0cfb8786a9cb3/67c00c02938bf55c6ef9b388/TH_Brochure_FWD_Precious_Protection_2025.pdf) | Both brochures explicitly say they are not part of the insurance contract and defer terms to the policy. | Remain `official_insurer`. |
| `aia-health-saver-200k` | [AIA Health Saver](https://www.aia.co.th/th/our-products/health/aia-health-saver) | Current page publishes a benefit summary and says some expenses are “ตามที่ระบุในกรมธรรม์” (as stated in the policy); no complete matching wording is public. | Remain `official_insurer`. |
| `aia-infinite-care-120m` | [AIA Infinite Care brochure](https://www.aia.co.th/content/dam/th-wise/images/th/our-products/si_98_aia-infinite-care/Brochure%20AIA%20Infinite%20Care%20(new%20standard)_Final_27Dec2022_website.pdf) | Official brochure/product material; no complete matching policy wording was found. | Remain `official_insurer`. |

## What changed

No plan data changed in this audit. The `terms_not_filed` count remains 32, and
the existing notes continue to distinguish published benefit summaries from
complete contract terms. The next evidence threshold is an insurer- or
regulator-hosted policy wording/summary that matches the exact plan and version;
when that appears, update one record at a time with the document URL and a new
verification date.
