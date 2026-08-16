# Sunday, Tokio Marine Life, Deves and MSIG follow-up

Checked: 2026-08-16. Scope: official insurer domains and insurer-hosted
documents only. This note applies the repository's current entry gate in
[`CONTRIBUTING.md`](../../CONTRIBUTING.md): a public plan needs the complete
published age-band premium table (where price is published) and coverage terms
from a document explicitly identifiable as a policy wording (`กรมธรรม์`) or
key-facts summary (`เอกสารสรุปสาระสำคัญ`). It does **not** add data records.

## Decision summary

| Lead | Current official evidence | Dataset disposition | What blocks entry |
| --- | --- | --- | --- |
| Sunday IPD Lump Sum + OPD | An official current product page and insurer-hosted 2024 plan-detail PDFs provide individual-health positioning, benefits, age premiums and waiting periods. | `insufficient_data` | The plan-detail PDFs are not labelled as a policy wording or key-facts summary, and current checkout-to-exact-PDF/version linkage was not established. This is **not** simply quote-only. |
| Tokio Good Health PRIME | A live official page confirms a seven-tier individual health **rider**, benefits and conditions. | `insufficient_data` | No public health-rider rate table; no accepted host-policy identity, minimum sum assured, or host premium. The prior WAF finding is superseded: the page is accessible now. |
| Deves Raksuk | A live official claim page calls it a health project and gives a dedicated claim flow. | `not_verified` | Claims servicing does not prove a current purchasable product; no official live sale page, benefit schedule, terms or rate table was found. |
| MSIG Seasonal Diseases | Live online product page, online purchase route, plan-specific fixed prices and benefit table. | `out_of_scope` under current taxonomy; also missing terms evidence | Medical reimbursement applies only to named seasonal diseases. It must not be mixed with broad medical-expense plans; the available download is a brochure, not identifiable filed wording/key facts. |

No plan is YAML-ready under the current gate. In particular, an official
marketing page is a valid `premium_source`, but is not a substitute for the
required `terms_source`.

## Sunday Insurance — individual IPD + OPD

Sunday's [current product page](https://sundayinsurance.co.th/en/product/)
lists individual health insurance and presents a Buy Online route. Its official
plan-detail PDFs provide unusually complete numbers:

- [IPD Lump Sum + OPD 2000, V3, 2024-09-04](https://static.easysunday.com/retail/policy-detail/sdi/sunday_lumpsum_ipd_opd_2000_v3_TH_20240904.pdf): plans 1–4 have annual policy-year limits of 400,000 / 600,000 / 900,000 / 1,200,000 THB, 2,000 THB OPD per visit (max 30/year), annual age bands from 11–20 through renewal at 71–80, entry 11–70 and renewal to 80. It also states the 30-day general and 120-day specified-condition waits.
- [IPD Lump Sum + OPD 5000, 2024-09-20](https://static.easysunday.com/retail/policy-detail/sdi/ipd_lump_sum_opd_5000_health_insurance_EN_20240920.pdf): a separate four-tier variant with its own 11–80 premium table, entry 11–70/renewal to 80, and 5,000 THB OPD per visit (max 30/year).

This corrects the earlier shorthand that Sunday was only configurable or
quote-only: the insurer-hosted PDFs publish rate tables. They are still not
safe to import today because neither file describes itself as `กรมธรรม์` or
`เอกสารสรุปสาระสำคัญ`; the title is a generic "Item C"/plan-detail title. The
current product page also does not identify which current checkout product
uses each dated PDF. Do not infer that the September 2024 terms/rates remain
the live checkout terms. A matching current wording/key-facts document plus
the product-version link would make these strong candidates.

## Tokio Marine Life — Tokio Good Health PRIME

The official [Tokio Good Health PRIME page](https://www.tokiomarine.com/th/th/life/products/personal/riders/health/tokio-good-health-prime.html)
is now accessible. It identifies the product as `สัญญาเพิ่มเติม` (a rider),
not standalone insurance, and names plans 2,000–12,000. Its benefit schedule
states annual medical limits of 500,000 / 1m / 2m / 3m / 6m / 12m / 30m THB;
it states entry age 11–70, renewal to 89 and cover to age 90. The page also
shows room limits, waiting periods and exclusions. Its linked
[14 May 2026 brochure](https://www.tokiomarine.com/content/dam/tokiomarine/th/life/product/personal/rider/tokio-good-health-prime/BC_Tokio%20Good%20Health%20Prime%2014MAY2026-CP.pdf)
is current product evidence, but is not filed wording.

The page only asks readers to register/contact an agent; it exposes no health
premium table. More importantly, it says cover ends with the main policy but
does not state the eligible main-policy product, its minimum sum assured, or
its premium. The repository requires all of that in `host_policy` for a rider.
Record this as an accessible, **quote-only rider lead**, rather than retaining
the obsolete `not_verified`/WAF rationale. It is not YAML-ready until Tokio
publishes the rider rate table, accepted minimum host and its cost, plus
identifiable filed wording/key facts.

## Deves — Raksuk (รักษ์สุข)

Deves' live [claims page](https://www.deves.co.th/th/customer-service/claims/)
explicitly labels a `ประกันภัยสุขภาพ โครงการรักษ์สุข` claim process and
requests the usual medical receipt, medical certificate, ID, bank account and
policy-copy documents. The [download page](https://www.deves.co.th/th/customer-service/download-document/)
supplies health/PA claim forms; an older insurer-hosted
[Raksuk claim form](https://www.deves.co.th/media/1580/f-nc-017-%E0%B8%A3-%E0%B8%81%E0%B8%A9-%E0%B8%AA-%E0%B8%82.pdf)
also corroborates historical servicing.

These sources establish servicing only. They neither show an active individual
sale, nor publish product limits, terms or premiums. Status remains
`not_verified`, not `not_found`: do not use a claim form as a product source.

## MSIG — Seasonal Diseases (โรคสุดฮิต)

MSIG's [live Seasonal Diseases page](https://www.msig-thai.com/th/personal-insurance/seasonal-diseases)
offers online purchase and says it is for Thai nationals age 11–70. It publishes
two distinct product series:

- `ฮิตไม่เลิก`: fixed annual premiums 299 / 599 / 699 THB, with daily hospital
  income and three/four/eight named diseases.
- `ฮอตฮิต`: fixed annual premiums 419 / 449 / 599 / 629 THB. It covers only
  influenza and dengue: IPD medical expense is 30,000 / 30,000 / 50,000 /
  50,000 THB **per confinement**, and OPD is 500 / 1,000 / 500 / 1,000 THB per
  visit, maximum three visits per year. The page specifies a 15-day wait.

The page's downloadable [80224 brochure](https://www.msig-thai.com/sites/msig_th_revamp/files/2024-02/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%A0%E0%B8%B1%E0%B8%A2%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B8%AE%E0%B8%B4%E0%B8%95%2080224_0.pdf)
matches the commercial material, but does not identify itself as policy
wording or key facts. The product page explicitly limits its medical benefits
to named diseases, so `medical_expense` would be misleading. Add no plans
unless the taxonomy first gains an intentionally separate named-disease
medical-expense category and an appropriate comparison contract, then obtain
the matching filed wording/key-facts document.

## Next evidence to request

1. **Sunday:** product-version-specific `เอกสารสรุปสาระสำคัญ` or policy wording,
   plus confirmation that each 2024 tier/rate table is the currently saleable
   product.
2. **Tokio:** the PRIME rider rate table and a statement of the cheapest
   permissible host policy, its minimum sum assured and premium; also a
   filed-wording/key-facts document.
3. **Deves:** a current Raksuk sales page or official brochure/wording that
   identifies the insurer, benefit schedule and price; until then, retain the
   research record only.
4. **MSIG:** first decide whether named-disease cover belongs in a new category;
   then obtain the filed wording/key facts for the exact plan generation.
