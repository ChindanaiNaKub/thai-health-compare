# Data completeness audit and ranked backlog

Checked: 2026-08-15. Scope: the 40 loadable records in `data/plans/`; example
YAML files are excluded by the loader. The audit is intentionally mechanical:
it reports missing fields and premium age gaps, but it does not infer a benefit
from a blank field.

Run the audit with:

```sh
bun run report-data-gaps
```

The report is backed by `scripts/report-data-gaps.ts`, so the counts change with
the data rather than becoming another hand-maintained number.

## Current snapshot

| Gap | Records |
| --- | ---: |
| Any premium missing | 3 |
| Rider host premium missing | 14 |
| Terms source is not filed wording | 32 |
| Exclusions list empty | 19 |
| IPD annual limit missing | 7 |
| OPD annual limit missing | 24 |
| Renewal ceiling unknown | 1 |

The age-gap check counts ages from entry age through renewal ceiling that are not
covered by any published premium band. It found the largest gaps in:

| Plan | Uncovered ages |
| --- | ---: |
| Thai Life Health Fit DD 15M | 99 |
| FWD Precious Care Bronze | 95 |
| Bangkok Life Happy Health Premier 10M | 88 |
| Ocean Life Supreme Health Smart | 85 |
| Krungthai-AXA iHealthy Ultra Gold | 84 |
| Ocean Life Enjoy Health Extra | 84 |
| AIA Health Saver 200K | 82 |
| FWD Prima Care S | 80 |
| AIA Infinite Care 120M | 80 |
| Thai Life Health Fit Shield | 79 |

An age gap is a verification task, not proof that the insurer refuses coverage:
some public tables may be entry-age tables, renewal-only tables, or truncated
extracts. The next edit must be source-backed.

The first contract-trust pass reviewed the ten highest-impact records. None had
a complete public filed wording that could safely replace the current official
summary source, so no contract field was promoted. Details are recorded in
[`filed-wording-audit.md`](filed-wording-audit.md).

## Pricing pass result

The first pricing pass resolved one rider-host gap. Krungthai-AXA's [official
Health Ultra brochure](https://thailandgi-ktaxa.cdn.prismic.io/thailandgi-ktaxa/aRs0prpReVYa4jIi_AG_A4_Brochure_HealthUltra.pdf)
gives a Life Ready host example at 50,000 THB sum insured: female age 35,
750 THB/year. It is stored as a single explicit sample, not extrapolated into
other ages or sexes. The remaining 14 host premiums stay explicitly unknown
because their public material is bundled, quote-only, names no host, or gives a
different plan.

The renewal pass resolved two scalar unknowns without inventing a single age:
Allianz Basic Care now stores lifetime renewal for entry ages 11–59 and renewal
to age 80 for entry ages 60–65; Viriyah V Prestige Care stores lifetime renewal
through entry age 60 and renewal to age 80 for entry ages 61–65. Dhipaya TIP
Non Chill remains the only renewal ceiling with no public value.

The complete 32-record filed-wording audit is now recorded in
[`filed-wording-audit-all.md`](filed-wording-audit-all.md). It found no matching
policy wording or complete summary document safe to promote; the next actionable
step is still external document acquisition from the insurer or an authorized
disclosure channel, one exact product/version at a time.

## Ranked work

1. **Reconcile filed terms for the 32 affected records.** This is the highest
   trust risk because exclusions, waiting periods, and renewal behavior can
   change the apparent ranking. Preserve the current values until the matching
   filed wording is found; then update `terms_source`, `exclusions`, and
   `verified_on` together.
2. **Fill the 14 remaining missing host-policy premiums.** A rider without its required
   host cost understates the price to the reader. Add the cheapest accepted host
   and its premium table, or keep the explicit unknown reason.
3. **Resolve the 3 missing standalone premiums and 3 unknown renewal ceilings.**
   These are high-impact comparison fields. A quote-only disposition is valid
   when recorded with a source and reason.
4. **Extend the age-band audit beyond the first ten rows when new source
   material appears.** The first ten are source-limited; do not interpolate bands.
5. **Fill IPD/OPD and exclusions where the matching source exists.** The 24 OPD
   blanks and 19 empty exclusion lists are useful follow-up batches, but lower
   priority than price and contract validity.

## Working batches

- **Batch A — contract trust:** filed wording for all 32 non-filed records.
- **Batch B — price completeness:** the 3 missing premiums and 14 remaining rider hosts.
- **Batch C — age-band integrity:** remaining non-zero gaps only when a new
  source publishes the missing ages; the first ten are documented as sparse.
- **Batch D — benefit detail:** IPD/OPD, room limits, exclusions, and renewal
  notes.

Do not close the related issues merely because a candidate was found. A product
enters `data/plans/` only when the premium source and matching filed wording pass
the schema's sourcing rules.
