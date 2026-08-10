# เทียบประกันสุขภาพไทย — Thai Health Insurance Comparison

A factual, Thai-language comparison of individual health insurance in Thailand.
No affiliate links. No lead capture. No recommendations. No ranking.

Most Thai comparison sites are lead-generation for brokers. This one is not for
sale, which is the only reason to trust it.

**Please copy this.** The data is CC BY-SA — take it, translate it, build on it.
Credit is the only ask. If a competitor's site accidentally tells a Thai person
the truth about rider bundling, this project has done its job.

## What makes it different

1. **Your existing entitlement comes first.** ประกันสังคม / บัตรทอง /
   สิทธิข้าราชการ already cover a lot. Private plans are shown as the *delta on
   top*, not as if you have nothing. A site that can talk you out of buying is a
   site worth reading.
2. **Rider bundling is made visible.** Most "health insurance" sold in Thailand
   is a health rider (สัญญาเพิ่มเติม) attached to a whole-life policy you cannot
   decline. The host policy premium is shown as its own line, and we state what
   percentage of your money actually buys health cover.
3. **Lifetime cost, not entry-age cost.** Agents quote the price at 25. We sum
   every published age band from your age to the renewal ceiling. It is a large
   number and it is the real one.
4. **Stale prices delete themselves.** Every record carries `verified_on`. Past
   18 months the premium figures are hidden rather than shown stale. Structural
   data (coverage, exclusions, renewal ceiling) stays, since it changes slowly.
   **If this project is abandoned, it degrades into silence, not into lies.**

## What it is not

Not a broker. Not licensed by the OIC (คปภ.) and not acting as one. Nothing here
is advice. There are no scores, no stars, no "best for you" — only facts and
arithmetic you can check against the sources we cite.

## Scope

Individual health insurance from the largest insurers by written premium, both
standalone plans and health riders. Group/employer plans are excluded — you
cannot buy them individually. Inclusion is not endorsement; exclusion is not
criticism. Missing a plan? Open an issue.

## Stack

SvelteKit (prerendered static) · TypeScript · Tailwind v4 · YAML data in-repo ·
Cloudflare Pages. There is no backend and no database, because the data is
~20 records that change a few times a year. The CMS is a text editor and a git
commit, which doubles as the audit trail.

```bash
bun install
bun run dev            # local dev
bun run validate-data  # schema-check the YAML
bun run check-staleness
bun run test           # arithmetic self-check on the metrics
bun run build          # static output in build/
```

## Contributing

Data corrections are the most useful contribution. See
[CONTRIBUTING.md](./CONTRIBUTING.md) — especially the rule that coverage terms
must come from filed policy wording, never from a brochure.

## Licensing

- **Code** — MIT, see [LICENSE](./LICENSE)
- **Data and Thai-language explanations** — CC BY-SA 4.0, see [data/LICENSE](./data/LICENSE)

Note that the underlying facts (premiums, coverage terms) are not copyrightable
anywhere, and Thailand has no sui generis database right. We own the compilation
and the prose, nothing more. That is fine — see the second paragraph.

## Status

Pre-alpha. Two real records are in: AIA Health Saver (200,000 plan) and AIA
Infinite Care (new standard, 120M plan). The two `_example-*.yaml` files are
**fictional templates** with invented numbers, kept only to demonstrate the schema.

What entering real data taught us, and what it costs the reader:

- **AIA publishes no full age-band rate table.** Only a few sample premiums are
  public. The lifetime-cost metric therefore renders as incomplete for both
  records. That is the true state of the public record, not a gap in this project.
- **The host floor is 12,000 THB/year, and AIA publishes it.** The Issara Plus
  brochure (p.5) states a minimum main-policy protection premium of 12,000 THB/year
  (RPP floor 6,000) at a minimum sum insured of 60,000 THB. That is the cheapest
  AIA main policy with a published price, so it is recorded as the host floor and
  the share-of-your-money metric now computes. Three caveats travel with it, in
  the record and on the page: AIA never publishes which main policies these riders
  actually attach to; Issara Plus itself only accepts entry to age 70, so it cannot
  host a 71–75 applicant at all; and 12,000 is a floor, never a quote.
- **AIA publishes no filed policy wording.** Coverage terms here come from AIA's
  own product page and brochure, tagged `official_insurer`, never `filed_wording`.
  Each brochure prints a "ข้อยกเว้นบางส่วน" list of exactly three items; those are
  recorded and labelled as partial, because the full exclusion set exists only in
  the policy AIA hands you after you buy.
- **AIA contradicts itself, and the brochure wins.** Health Saver's 200,000 is a
  *per-confinement* limit in AIA's own benefit table and a *per-policy-year* one in
  AIA's own marketing copy. The schema now carries `ipd_limit_basis` so the two are
  never silently compared as equals.
- **A live PDF can still be stale.** Infinite Care was first entered from a brochure
  that is still online but no longer linked from the product page; it says the rider
  renews to 84. The brochure the page actually links says 98. Being reachable is not
  the same as being current — cite the document the product page links today.

The full sourcing trail, with verbatim Thai quotes and per-claim URLs, is in
[docs/research/aia-rider-sourcing.md](./docs/research/aia-rider-sourcing.md).
