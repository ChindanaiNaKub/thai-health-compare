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

Alpha. 36 plan records from 15 insurers — AIA, Allianz Ayudhya, Bangkok Life,
Chubb Samaggi, Dhipaya, FWD, Generali, Krungthai-AXA, Muang Thai, Navakij,
Ocean Life, Pacific Cross, Thai Life, Thai Health, and Viriyah — plus the
three public schemes (สปสช. / ประกันสังคม / สิทธิข้าราชการ), drawn from 41 cited
sources. The `_example-*.yaml` files are **fictional templates**, kept only
to show the schema.

Nine records now carry a premium for every year from entry to the renewal
ceiling, so their lifetime cost is complete rather than partial. Seven cite
filed policy wording. One — Ocean Life OCHI — is the first rider anywhere in
this dataset with a host premium published at every age, which is the only
reason its "share of your money that buys health cover" figure is a real
number instead of a blank.

What entering real data taught us:

- **Most insurers publish no full age-band rate table.** Only sample premiums
  are public, so lifetime cost often renders as incomplete. That is the state
  of the public record, not a gap in this project.
- **The host policy premium is usually unpublished.** Where an insurer states a
  minimum (AIA Issara Plus: 12,000 THB/year), we record it as a floor, never as
  a quote, with the caveats attached to the record.
- **Filed policy wording is rarely public.** Terms mostly come from product
  pages and brochures, tagged `official_insurer`, never `filed_wording`.
  Brochure exclusion lists are recorded and labelled as partial.
- **Insurers contradict themselves, and the brochure wins.** A limit can be
  *per-confinement* in the benefit table and *per-policy-year* in the marketing
  copy. The schema carries `ipd_limit_basis` so the two are never compared as
  equals.
- **A live PDF can still be stale.** An unlinked brochure stays reachable long
  after its numbers change. Cite the document the product page links today.

Full sourcing trail, with verbatim Thai quotes and per-claim URLs, is in
[docs/research/](./docs/research/) — one file per insurer group.

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
