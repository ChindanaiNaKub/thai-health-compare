# Additional official Thai health-insurance sources

Checked: 2026-08-16. Scope: public first-party insurer sites and insurer-hosted
documents only. This is a sourcing report; it does not change `data/plans/`.

## Baseline and conclusion

The repository currently says **40 real plan records from 19 insurers**, not
38 (`README.md`; the two `_example-*.yaml` files are fictional). There is room
to expand. The clearest immediate opportunity is a new insurer, **Thai Vivat**:
four standard medical-expense plans have public price, eligibility, benefit and
named policy-summary sources. Their price is *plan-specific but not
age-specific*: it is a published monthly price, not an age-band table. Do not
invent age bands or represent the exercise discount as the normal premium.

## Recommended immediate additions: Thai Vivat Active Health

**Insurer:** บริษัท ประกันภัยไทยวิวัฒน์ จำกัด (มหาชน) / Thai Vivat Insurance

**Product page:** <https://health.thaivivat.co.th/active-health>

**Terms summary:** [TVI Active Health Online — official summary](https://www.thaivivat.co.th/th/pdf/T%26C_TVI_Active_Health.pdf).
It names Thai Vivat, the TVI Active Health plan, and the OIC-approved policy
form. It is explicitly a summary, not the complete policy, but is an
`เอกสารสรุป` of the named product. Under this project's stated rule that accepts
filed wording **or a policy summary document**, recommend
`terms_source.tier: filed_wording`, with a note that it is a three-page summary
and that complete terms remain in the policy. If maintainers instead reserve
`filed_wording` for complete policies only, use `official_insurer` and treat all
four as pending rather than silently downgrading the evidence.

| YAML-ready record | Type / shape | Published base premium | Entry / renewal | Annual IPD limit | OPD | Room | Deductible | Sources / decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `thaivivat-active-health-simple` | standalone, per-item schedule | 1,199 THB/month (= 14,388 THB/year) | 20–60 / 70 | 100,000 THB/year | 900 THB/visit; max 30 visits/year | 1,500 THB/night | Not published; use `null`, not 0 | Product page + named terms summary. Addable; annual figure is transparent arithmetic from the published monthly price, not an age quote. |
| `thaivivat-active-health-silver` | standalone, per-item schedule | 1,500/month (= 18,000/year) | 20–60 / 70 | 300,000/year | 1,000/visit; max 30/year | 2,500/night | Not published | Same. Addable. |
| `thaivivat-active-health-gold` | standalone, per-item schedule | 2,500/month (= 30,000/year) | 20–60 / 70 | 500,000/year | 1,500/visit; max 30/year | 5,000/night | Not published | Same. Addable. |
| `thaivivat-active-health-diamond` | standalone, per-item schedule | 3,800/month (= 45,600/year) | 20–60 / 70 | 1,000,000/year | 3,000/visit; max 30/year | 10,000/night | Not published | Same. Addable. |

The product page presents the base prices and all four headline benefit sets.
It states a 30-day general waiting period and 120 days for its named conditions.
The policy summary supplies definitions, exclusions, waiting periods and says
the policy form was approved by the OIC. The page’s 999/1,100/1,700/2,400 THB
figures are conditional activity-discount prices: keep them in a source note,
never as `premium`.

### Implementation cautions

- Premiums are monthly and publicly shown as a single price for each tier. They
  are **not age-banded**. Store one source-backed annual value only if the
  schema requires annual THB, and state `1199 × 12`, etc. Do not repeat it over
  20–70 as though it were an age-band table.
- The product page has an online underwriting/health-declaration flow. That
  affects acceptance, not the published base price; do not scrape or submit it.
- The source is a standard individual medical-expense product, unlike the
  limited-condition candidates below.

## Additional first-party candidates — do not add to the general table yet

| Insurer / product | Official source | Evidence available | Disposition |
| --- | --- | --- | --- |
| Thai Vivat — UOB Active Health, plans 1–5 | <https://health.thaivivat.co.th/uob/active-health> | Separate UOB distribution channel; published starting monthly prices, annual limits, room and OPD amounts. Page says premium depends on age. | Keep separate from standard Active Health. Need the channel’s exact terms summary and age-premium evidence before entry. |
| Thai Vivat — Office Syndrome Plus, plans 1–3 | <https://health.thaivivat.co.th/office-syndrome-plus> | Published *starting* annual prices 3,100 / 6,000 / 12,900 THB; entry ≤55, renewal 60; IPD/OPD only for specified diseases. | Not a general medical-expense plan and prices are age-dependent starts. Add only after an explicit disease-limited category decision. |
| MSIG — Seasonal Diseases, medical plans 1–4 | <https://www.msig-thai.com/th/personal-insurance/seasonal-diseases> | Public fixed annual prices and a benefit grid; medical expense applies only to named seasonal diseases. The same page also contains hospital-cash plans. | Do not mix with general health cover. Requires a named-disease category and plan-by-plan source extraction. |
| Bangkok Insurance — Classic / Superior / Premier Care | <https://www.bangkokinsurance.com/product/health/new/register> and [official Superior kit](https://www.bangkokinsurance.com/download/AIS/selling-kit/Selling%20kit%20%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%20Superior.pdf) | Current benefit pages and complete age-band tables, including OPD options; entry 16–70 and renewal 80. | Highest-density next pass, but do **not** enter yet: the public coverage-download area has generic and online policy forms, not an unambiguously matching Classic/Superior/Premier filed wording/version. This confirms issue #5 remains open. |
| Allianz Ayudhya General — Simple Health plans 1–4 | <https://www.allianz.co.th/th_TH/health/lump-sum/simple-health.html> | Benefit table and conditions; plans 500k/1m/3m/5m per confinement, room 2k/3k/5k/7k. Page says its material is not part of the contract and directs users to contact for premiums. | No public static premium; do not add under this project’s evidence policy. |
| Sunday — IPD lump-sum + OPD plan | [official Sunday plan-detail PDF](https://static.easysunday.com/retail/policy-detail/sdi/sunday_lumpsum_ipd_opd_2000_v3_TH_20240904.pdf) | First-party benefit document with four tiers. The retail route is configurable/JS and no fixed, non-personal-data rate table was confirmed. | Quote/configurable only; record against issue #6, no general-table entry. |
| Roojai | <https://www.roojai.com/> | Official pages and claim form show health/cancer claim categories, but no public individual general-health product page with matching price and terms was confirmed. | No addable plan found; do not treat a claim form or glossary as a product source. |
| Deves — Raksuk | <https://www.deves.co.th/th/customer-service/download-document/> | Existing research confirms a health/PA claim form and historical Raksuk references, but the personal catalogue is unavailable and no live product/rate/terms source was found. | Still `not_verified`, not a rejection and not addable. |
| Tokio Marine Life | <https://www.tokiomarine.com/th/th/> | Existing research documents WAF/access blockage; this pass found no independently accessible first-party product/rate/terms combination. | Still `not_verified`; re-check through a normal browser/manual review, not by guessing from brokers. |

## Issue alignment

- **#5:** Bangkok Insurance remains promising but source reconciliation is the
  blocker; Thai Vivat is an additional, stronger immediate source opportunity.
- **#6:** Sunday is not ready for the fixed-table dataset. Roojai has not yielded
  a public general-health product source. This supports keeping configurable or
  quote-only products out until a separate schema/evidence policy exists.
- **#3 / #4 / #7:** Deves and Tokio Marine Life remain distinctly
  `not_verified`, rather than "no product". Their status should stay visible in
  the coverage matrix.

## Recommended next data change

Open/associate an issue, then add the four standard Thai Vivat Active Health
records only. Use the product page for `premium_source` (`official_insurer`) and
the named OIC-approved TVI Active Health summary for `terms_source` as described
above. Preserve the evidence limitations in each record’s source note; do not
expand a public monthly price into fabricated age bands.
