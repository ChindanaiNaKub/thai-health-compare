# Contributing

The valuable contribution here is **accurate, sourced data**. The site is a
table renderer; the research is the project.

## The one rule that gets PRs rejected

**Coverage terms, exclusions and waiting periods must come from the filed policy
wording** (กรมธรรม์ or เอกสารสรุปสาระสำคัญ) — never from a brochure, a
marketing page, or an agent's website.

A brochure is advertising. The wording is the contract. The gap between them is
exactly where people get hurt, and reproducing the brochure's version here would
make this site part of the problem. The schema enforces this: a plan whose
`terms_source.tier` is `agent_site` fails validation.

## Source tiers

Every sourced field records where it came from, best first:

| Tier | Meaning | Allowed for |
|---|---|---|
| `official_insurer` | The insurer's own site | anything |
| `filed_wording` | Filed policy wording / summary document | anything; **required** for terms |
| `agent_site` | An agent or broker's site | premiums only, cross-checked against a second source |

Agent-sourced premiums render with a visible lower-confidence marker. Cross-check
them against a second independent source and note it in `premium_source.note`.

## Adding a plan

1. Copy `data/plans/_example-standalone.yaml` (or `_example-rider.yaml` for a
   rider) to `data/plans/<insurer>-<plan>.yaml`.
2. Replace every value. Do not leave template numbers in place.
3. Enter the **full published age-band table**, not just the young bands. The
   lifetime-cost figure is the point of this site and it is wrong without them.
4. For a rider, the `host_policy` block is mandatory. If the insurer will not
   publish a host premium, set `premium: null` and write a plain-Thai
   `premium_unknown_reason` — that sentence is shown to the reader verbatim.
   Never estimate it.
5. Set `verified_on` to the date **you personally opened the source documents**.
   Not the document's date, not today by habit.
6. Run `bun run validate-data`.

## Re-verifying

Records warn in CI at 12 months and hide their premiums on the live site at 18.
Re-verifying is a one-line change to `verified_on` **after** you have actually
re-opened the sources. Bumping the date without re-checking is the single most
damaging thing you can do to this project.

## Writing style (Thai content)

Write for a 22-year-old who has never bought insurance. Avoid industry
vocabulary unless you define it in the same sentence. State facts; never write
"ดีที่สุด", "คุ้มที่สุด" or any comparative verdict — the arithmetic is allowed
to be damning, we are not.

## What we will not merge

- Affiliate or referral links, in any form
- Scores, rankings, star ratings, or "recommended" flags
- Voting, upvotes, or any popularity signal (see the README's design rationale)
- Estimated or interpolated premiums presented as published figures
- Deliberately incorrect "trap" data to catch scrapers — real readers use this
