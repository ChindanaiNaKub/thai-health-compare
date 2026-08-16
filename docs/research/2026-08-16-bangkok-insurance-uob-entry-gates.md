# Bangkok Insurance and UOB Active Health entry-gate check

Checked: 2026-08-16. Scope: current first-party insurer pages and
insurer-hosted documents only. This report applies the repository's required
source pair: an exact product-version terms summary/wording, plus a
non-teaser price, eligibility/renewal evidence, and benefit evidence. **No
YAML-ready record is included because neither product set clears every gate.**

## Result at a glance

| Candidate | Exact matching terms summary / wording | Non-teaser price | Eligibility / renewal | Benefits | Decision |
| --- | --- | --- | --- | --- | --- |
| Bangkok Insurance Classic Care | No | Yes | Yes | Yes | Do not enter |
| Bangkok Insurance Superior Care | No | Yes | Yes | Yes | Do not enter |
| Bangkok Insurance Premier Care | No | Yes | Yes | Yes | Do not enter |
| Thai Vivat UOB Active Health plans 1–5 | No | No — advertised as a starting price and explicitly age-dependent | Yes | Yes | Do not enter |

## Bangkok Insurance — Classic / Superior / Premier Care

**Primary product and rate source:** [Bangkok Insurance health product page](https://www.bangkokinsurance.com/th/product/health/new) and the [Classic Care register](https://www.bangkokinsurance.com/product/health/new/register?care_name=CACLASSIC), [Superior Care register](https://www.bangkokinsurance.com/product/health/new/register?care_name=CASUPERIOR), and [Premier Care register](https://www.bangkokinsurance.com/product/health/new/register?care_name=CAPREMIER).

The current register is unusually strong for a marketing page: it names all
three products, publishes their benefit schedules, annual premiums split by
age band and IPD/OPD choice, and says the premiums include stamp duty. It also
states Thai nationals are eligible at age 16–70, renewal is available to age
80, premiums increase by age band, and gives 30- and 120-day waiting periods.
It therefore clears the **price**, **benefits**, and **eligibility/renewal**
gates.

It does not clear the terms gate. The page says buyers should understand the
coverage and conditions before purchase; it is not labelled a policy, policy
summary, or filed wording. It identifies only Premier Care as the marketing
name of a particular personal-accident-and-health policy form, without
providing that form or the corresponding Classic/Superior form/version.

The insurer's own [coverage-download page](https://www.bangkokinsurance.com/product/document)
does not repair this gap. Its PDFs called `classic-care-online.pdf`,
`superior-care-online.pdf`, and `premier-care-online.pdf` are explicitly
labelled *cancer insurance* cover, rather than the comprehensive medical
expense plans on the health register. They cannot be cross-applied merely
because they reuse the marketing names.

**What would make these addable:** an insurer-hosted policy wording or labelled
policy summary which identifies the same Classic, Superior, and/or Premier
medical-expense version and its schedule. Once found, the live register already
supplies the remaining source-backed fields. Do not create a record from the
selling kit or from a cancer-policy PDF.

## Thai Vivat — UOB Active Health plans 1–5

**Primary source:** [Thai Vivat UOB Active Health](https://health.thaivivat.co.th/uob/active-health).

The page identifies five plans and gives these headline benefits:

| Plan | Annual medical limit | Room/day | OPD/visit | Displayed monthly amount |
| --- | ---: | ---: | ---: | ---: |
| 1 | 500,000 THB | 2,000 THB | 1,000 THB | from 1,350 THB |
| 2 | 1,000,000 THB | 4,000 THB | 1,000 THB | from 1,650 THB |
| 3 | 1,500,000 THB | 6,000 THB | 2,000 THB | from 2,250 THB |
| 4 | 3,000,000 THB | 8,000 THB | 2,000 THB | from 2,750 THB |
| 5 | 5,000,000 THB | 10,000 THB | 2,500 THB | from 3,000 THB |

Those amounts are not usable premiums: each is marked **เริ่มต้น** (starting
from) and **ค่าเบี้ยขึ้นอยู่กับอายุ** (premium depends on age). The source has
no public age/sex rate table or fixed price for a defined buyer. Multiplying a
starting monthly amount by 12 would create a falsely definite annual premium.

The same page supplies eligibility (age 21–55; renewable only to 60) and says
underwriting depends on Thai Vivat's criteria. It explicitly describes the
page as preliminary sales information and directs applicants to the policy for
coverage detail, conditions, exclusions and benefits. No plan-matched UOB
Active Health policy wording or labelled terms summary was linked from the
page or located in the insurer's current public materials in this check.

**What would make these addable:** a plan-matched UOB policy summary/wording
and a public rate table (or another public price tied to a specified age/sex
and plan). Until then, retain all five as a separately tracked, quote/age-rate
candidate—not as 1,350 × 12 etc. records.

## Reproducible source notes

- Bangkok Insurance's `care_name` URLs above are live pages; the selector only
  changes presentation. Each exposes the full family schedule, including the
  annual premium tables with and without OPD.
- Thai Vivat's page has a current UOB promotion, but promotions and smart-watch
  offers are not insurance premiums or contract terms and were not used for
  any field above.
