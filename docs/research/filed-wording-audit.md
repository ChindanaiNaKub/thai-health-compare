# Filed-wording audit — first contract-trust pass

Checked: 2026-08-15. Scope: the ten highest-impact records from the current
terms backlog, ordered around large inpatient limits and comparison exposure.

## Result

No record was promoted to `terms_source.tier: filed_wording` in this pass. That
is an intentional result, not a missed edit. The accessible first-party sources
are product pages, brochures, or partial exception summaries. Several documents
explicitly tell the reader that the complete conditions are in the policy or
that the published exclusions are only partial.

The machine-readable plan records therefore keep their current fields and
`official_insurer` tier. The published facts remain useful, but they must not be
presented as the complete contract.

## Highest-impact review

| Plan | Public source reviewed | Disposition |
| --- | --- | --- |
| AIA Infinite Care 120M | [AIA product page](https://www.aia.co.th/th/our-products/health/aia-infinite-care) and official brochure | Summary confirms annual term, renewal/cost-sharing caveats, benefits and waiting periods; no complete public wording found. |
| Thai Life Health Fit Ultra 60M | [Thai Life product page](https://product.thailife.com/ประกันสุขภาพ/ประกันสุขภาพเฮลท์ฟิตอัลตร้า/) | Product page confirms limits and ages; no full wording or complete exclusions published. |
| KTAXA iHealthy Ultra Gold | [official exception document](https://thailandgi-ktaxa.cdn.prismic.io/thailandgi-ktaxa/aRs2P7pReVYa4jNO_Exception_iHealthy_Ultra-1--1-.pdf) | Exception-only document, not complete policy wording; remains official-insurer tier. |
| Thai Life Health Fit DD 15M | [Thai Life product page](https://product.thailife.com/ประกันสุขภาพ/ประกันสุขภาพเฮลท์ฟิตดีดี/) | Product summary confirms waiting periods and limits; no full wording published. |
| BLA Happy Health Premier 10M | [BLA product page](https://www.bangkoklife.com/th/products/detail/269) | Product summary states that complete conditions/exclusions are in the policy; no public full wording found. |
| Generali Gen Health Hero Plus Plan 4 | [Generali product page](https://generali.co.th/individual-insurance/gen-health-hero-2/) | Brochure labels exclusions as partial and does not publish the policy wording. |
| Muang Thai Insurance ME Plus 10M | [official product PDF](https://mticonnect-resources.muangthaiinsurance.com/product/files_01-2026_1767929124256.pdf) | Product PDF provides benefits and waiting periods; no complete filed wording identified. |
| Ocean Life Supreme Health Smart | [Ocean Life product page](https://www.ocean.co.th/our-products/health-insurance/supreme-health) | Current page says benefits are subject to the policy; no full wording for this agent product found. |
| Rabbit Life Health Protect 10,000 | [official product brochure](https://rblwebstorageprd.blob.core.windows.net/productfiles/download_file/2026/4/HP_2025-12-22.pdf) | Official brochure only; no policy wording or summary document published. |
| Muang Thai Life Maternity Plus | [official Elite Health Plus brochure](https://www.muangthai.co.th/filestorage/brochures/04-0480_%20EliteHealthPlus_TH_20250221.pdf) | Brochure contains product terms and limits, but not the filed contract wording. |

## What changed

No contract fields were changed from a summary into a supposed contract. The
existing `exclusions`, waiting periods, and renewal notes remain bounded by the
source notes already attached to each record. Run the reproducible report with:

```sh
bun run report-data-gaps
```

The next actionable step is external document acquisition: request or obtain
the exact Thai policy wording/version for these products from the insurer or
authorized disclosure channel, then update one record at a time with the
matching document and a new verification date.

