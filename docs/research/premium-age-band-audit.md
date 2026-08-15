# Premium age-band integrity audit

Checked: 2026-08-15. Scope: the ten largest numeric gaps reported by
`scripts/report-data-gaps.ts`. A numeric gap means that the loaded premium
records do not cover every age between entry and renewal; it does not by itself
mean that the insurer omitted a table.

## Result

No safe premium bands were added. Every reviewed source is explicitly a sample,
a sparse published set, or a table with a narrower published range than the
product's eligibility range. Filling the gaps would require interpolation or a
quote, both of which would make the comparison look more certain than the
source permits.

| Plan | Published premium coverage | Audit disposition |
| --- | --- | --- |
| Thai Life Health Fit DD 15M | Example at age 35 only; product accepts 15 days–80 years and renews to 99 | Keep one age-35 sample; do not interpolate. |
| FWD Precious Care Bronze | Examples at ages 20/30/40/50; entry to 75 and renewal to 98 | Keep four published examples; bundled package price is not an age table. |
| BLA Happy Health Premier 10M | Example at age 35 for male/female; entry 11–80 and renewal to 99 | Keep the two exact examples; no public full table. |
| Ocean Life Supreme Health Smart | Examples at ages 20/30/40/50; entry 11–80 and renewal to 99 | Keep four published examples; insurer directs buyers to an agent for other ages. |
| KTAXA iHealthy Ultra Gold | Examples at ages 20/30/40/50 by sex; entry 11–80 and renewal to 98 | Keep published examples; annual premium changes with age. |
| Ocean Life Enjoy Health Extra 1 | Examples at ages 20/30/40/50 by sex; entry 11–80 and renewal to 98 | Keep published examples; do not fill unlisted ages. |
| AIA Health Saver 200K | Male age 21–25 and male/female age 35 examples; entry 11–75 and renewal to 98 | Keep exact samples; no full table published. |
| FWD Prima Care S | Examples at ages 30/40/50 by sex; entry 16–70 and renewal to 98 | Keep six published examples; insurer says premiums adjust with age. |
| AIA Infinite Care 120M | Male age 40 example; entry 18–75 and renewal to 98 | Keep one exact example; no full table published. |
| Thai Life Health Fit Shield 1 | Bands 31–35, 36–40, 41–45, 46–50; product eligibility is broader | Keep published bands; source says other ages are not published. |

## Decision rule

The repository treats a sparse official example as data, not as permission to
create a continuous curve. A future update may add a band only when an official
source publishes that exact age range, sex, plan, occupation class, deductible,
and product version. A quote returned after personal details is not a published
premium table.

The age-gap report remains useful as a discovery queue, but these ten rows are
now classified as source-limited rather than implementation defects.

