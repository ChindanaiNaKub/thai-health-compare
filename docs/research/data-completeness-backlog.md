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
| Rider host premium missing | 15 |
| Terms source is not filed wording | 32 |
| Exclusions list empty | 19 |
| IPD annual limit missing | 7 |
| OPD annual limit missing | 24 |
| Renewal ceiling unknown | 3 |

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

## Ranked work

1. **Reconcile filed terms for the 32 affected records.** This is the highest
   trust risk because exclusions, waiting periods, and renewal behavior can
   change the apparent ranking. Preserve the current values until the matching
   filed wording is found; then update `terms_source`, `exclusions`, and
   `verified_on` together.
2. **Fill the 15 missing host-policy premiums.** A rider without its required
   host cost understates the price to the reader. Add the cheapest accepted host
   and its premium table, or keep the explicit unknown reason.
3. **Audit the ten largest numeric age gaps.** First confirm whether the table
   is incomplete, entry-age-only, or genuinely sparse. Do not interpolate bands.
4. **Resolve the 3 missing standalone premiums and 3 unknown renewal ceilings.**
   These are high-impact comparison fields. A quote-only disposition is valid
   when recorded with a source and reason.
5. **Fill IPD/OPD and exclusions where the matching source exists.** The 24 OPD
   blanks and 19 empty exclusion lists are useful follow-up batches, but lower
   priority than price and contract validity.

## Working batches

- **Batch A — contract trust:** filed wording for all 32 non-filed records.
- **Batch B — price completeness:** the 3 missing premiums and 15 rider hosts.
- **Batch C — age-band integrity:** the ten largest gaps, followed by the
  remaining non-zero gaps.
- **Batch D — benefit detail:** IPD/OPD, room limits, exclusions, and renewal
  notes.

Do not close the related issues merely because a candidate was found. A product
enters `data/plans/` only when the premium source and matching filed wording pass
the schema's sourcing rules.

