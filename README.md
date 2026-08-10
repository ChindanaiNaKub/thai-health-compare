# เทียบประกันสุขภาพไทย — Thai Health Insurance Comparison

**Live:** https://thai-health-compare.pages.dev

A factual, Thai-language comparison of individual health insurance in Thailand.
No affiliate links. No lead capture. No recommendations. No ranking.

Most Thai comparison sites are lead-generation for brokers. This one is not for
sale, which is the only reason to trust it.

**Please copy this.** The data is CC BY-SA. Take it, translate it, build on it.
Credit is the only ask.

## What makes it different

1. **Your existing entitlement comes first.** ประกันสังคม / บัตรทอง /
   สิทธิข้าราชการ already cover a lot. Private plans are shown as the *delta on
   top*, not as if you have nothing.
2. **Rider bundling is made visible.** Most "health insurance" sold in Thailand
   is a rider (สัญญาเพิ่มเติม) on a whole-life policy you cannot decline. The
   host premium gets its own line, plus what percent of your money buys health
   cover.
3. **Lifetime cost, not entry-age cost.** Agents quote the price at 25. We sum
   every published age band from your age to the renewal ceiling.
4. **Stale prices delete themselves.** Every record carries `verified_on`. Past
   18 months, premiums are hidden rather than shown stale. Structural data
   (coverage, exclusions, renewal ceiling) stays. **If this project is
   abandoned, it degrades into silence, not into lies.**

## What it is not

Not a broker. Not licensed by the OIC (คปภ.). Nothing here is advice. No scores,
no stars, no "best for you" — only facts and arithmetic you can check against
the sources we cite.

Scope is individual plans and health riders from the largest insurers by written
premium. Group/employer plans are excluded, because you cannot buy them
individually. Inclusion is not endorsement. Missing a plan? Open an issue.

## Stack

SvelteKit (prerendered static) · TypeScript · Tailwind v4 · YAML data in-repo ·
Cloudflare Pages. No backend, no database: the data is ~20 records that change a
few times a year. The CMS is a text editor and a git commit, which doubles as
the audit trail.

```bash
bun install
bun run dev            # local dev
bun run validate-data  # schema-check the YAML
bun run check-staleness
bun run test           # arithmetic self-check on the metrics
bun run build          # static output in build/
```

## Status

Pre-alpha. Two real records: AIA Health Saver (200,000 plan) and AIA Infinite
Care (new standard, 120M plan). The `_example-*.yaml` files are **fictional
templates**, kept only to show the schema.

What entering real data taught us:

- **AIA publishes no full age-band rate table.** Only a few sample premiums are
  public, so lifetime cost renders as incomplete. That is the state of the
  public record, not a gap in this project.
- **The host floor is 12,000 THB/year, and AIA publishes it.** The Issara Plus
  brochure (p.5) states that minimum, at a 60,000 THB sum insured. It is the
  cheapest AIA main policy with a published price. Three caveats travel with it:
  AIA never says which main policies these riders attach to; Issara Plus accepts
  entry only to age 70; and 12,000 is a floor, never a quote.
- **AIA publishes no filed policy wording.** Terms come from the product page
  and brochure, tagged `official_insurer`, never `filed_wording`. Each brochure
  lists exactly three exclusions, recorded and labelled as partial.
- **AIA contradicts itself, and the brochure wins.** Health Saver's 200,000 is
  *per-confinement* in the benefit table and *per-policy-year* in the marketing
  copy. The schema carries `ipd_limit_basis` so the two are never compared as
  equals.
- **A live PDF can still be stale.** An old Infinite Care brochure is still
  online but no longer linked; it says the rider renews to 84. The linked one
  says 98. Cite the document the product page links today.

Full sourcing trail, with verbatim Thai quotes and per-claim URLs:
[docs/research/aia-rider-sourcing.md](./docs/research/aia-rider-sourcing.md).

## Contributing

Data corrections are the most useful contribution. See
[CONTRIBUTING.md](./CONTRIBUTING.md) — especially the rule that coverage terms
must come from filed policy wording, never from a brochure.

## Licensing

- **Code** — MIT, see [LICENSE](./LICENSE)
- **Data and Thai-language explanations** — CC BY-SA 4.0, see [data/LICENSE](./data/LICENSE)

The underlying facts (premiums, coverage terms) are not copyrightable anywhere,
and Thailand has no sui generis database right. We own the compilation and the
prose, nothing more.
