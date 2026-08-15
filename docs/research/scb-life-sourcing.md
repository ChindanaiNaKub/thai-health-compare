# SCB Life sourcing pass

Checked: 2026-08-15. Scope: individual medical-expense products publicly
associated with SCB/SCB Life. No personal data or quote flow was used.

## Findings

### SCB M Health Protection

The official SCB brochure publishes three plans (S, M, L), IPD annual limits
of 300,000 / 450,000 / 650,000 THB, and annual premium bands for ages
15 days–5 years, 6–40, 41–45, 46–55, 56–60, and 61–65. It is a useful candidate
for a later data entry pass.

The brochure does not identify a filed policy wording or make the underwriting
company clear enough to attribute the plan to SCB Life. The project therefore
records it as `insufficient_data`, not as a plan.

Source: [official SCB brochure](https://www.scb.co.th/content/dam/scb/personal-banking/insurance/scb-m-insurance/documents/scb-m-health.pdf?MRK_CMPG_SOURCE=gk_hl).

### SCB Health Elite

The current official page states eligibility of ages 11–75, renewal to age 84,
coverage to age 85, and three limits of 15 / 60 / 120 million THB. It names FWD
Life as the insurer and does not publish an age-band premium table in the page
text. It is not entered as an SCB Life plan.

Source: [official SCB Health Elite page](https://www.scb.co.th/th/personal-banking/insurance/health-insurance/scb-health-elite.html).

## Disposition

`data/coverage/scb-life.yaml` records the candidate as
`insufficient_data`. Next follow-up requires the actual underwriter's filed
wording and a premium source that can be tied to the same plan and age bands.
