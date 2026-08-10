# Design

The site is a datasheet, not a landing page. Nobody arrives to be sold to — they
arrive to check a number against its source.

But a datasheet still has to be *entered*. Reader testing turned up five
complaints, and every rule below either serves reading numbers, trusting them, or
getting past the front door:

> small text · didn't understand it in the first two seconds · too much text ·
> should be more organised · needs categories you can tell apart at a glance

## The first two seconds

The page opened with a question addressed to the reader (`คุณมีสิทธิอะไรอยู่แล้ว?`)
and no statement of what the site was. That is a form, not an answer.

The top of the page now states the claim before it asks anything: most Thai health
insurance forces a life policy on you, and this site splits the cheque. Under it,
three chips — record count, "every figure links to its source", "we sell nothing".
A reader who bounces after four seconds should still be able to say what the site
claims and why it has no reason to lie.

Everything after that is numbered. **1 — your entitlement. 2 — the delta on top.**
That order is the argument; the step markers keep readers from landing in the
middle of it.

## Type

| Role            | Face                              | Why                                                                                |
| --------------- | --------------------------------- | ---------------------------------------------------------------------------------- |
| Display + body  | IBM Plex Sans Thai (unlooped)     | The technical cut of Thai, not the schoolbook looped one. Reads as instrumentation. |
| Numbers, labels | IBM Plex Mono (`.tnum`, `.label`) | Tabular figures. Money columns line up or they lie.                                 |

Rules:

- **The whole ramp is set for Thai, not Latin.** Thai carries tone marks above and
  vowels below, so its x-height is a smaller share of the em box — Thai at 14px
  reads smaller than Latin at 14px. Every step of `--text-*` is up roughly one
  point on the Tailwind default, and every line-height is looser. Body copy sits
  at 15–17px, never 14.
- **Letter-spacing on Thai is a bug, not a style.** Thai has no word spaces;
  readers segment words by glyph shape and adjacency. Tracking dissolves that.
  `.label` keeps 0.02em — enough to read as machine-set, not enough to break
  parsing. It used to be 0.09em.
- Every currency figure, age, percentage and date is `.tnum` — mono, tabular.
- Thai body copy stays at `line-height: 1.7` so tone marks survive.
- Large baht figures are set in Thai magnitude words — `2.5 แสน`, `120 ล้าน` — and
  they step at each unit. 270,000 is `2.7 แสน`, never `27 หมื่น`. Nine digits in a
  table column means the reader is counting commas.

Loaded from Google Fonts today. Self-hosting a Thai+Latin+digits subset under
`static/fonts` is the open TODO in `src/app.css`.

## Color

Cold instrument palette. **Colour means one thing here, and it is not decoration.**

| Token        | Means                                             |
| ------------ | ------------------------------------------------- |
| `bg`         | ground                                            |
| `surface`    | a record you can cite                             |
| `border`     | field separation inside a record                  |
| `rule`       | structural division between records               |
| `ink`        | facts                                             |
| `muted`      | provenance, caveats, units                        |
| `accent`     | **health cover** — the thing you are buying        |
| `host`       | **not health cover** — the life policy bolted on   |
| `host-ink`   | the same meaning, as text                         |
| `warn-*`     | figure withheld because it is too old to trust    |

The readers asked for "different colours so it's easier to notice", which is the
right instinct pointed at the wrong dimension. A hue per insurer or per plan tier
would make the page busier and mean nothing. So exactly **one** categorisation
gets colour, and it is the one the site exists to expose:

- `ซื้อเดี่ยวได้` (standalone) → `accent`
- `ต้องซื้อพ่วง` (rider) → `host-ink`

Those two run all the way through: the filter buttons, the tag on each record, and
the two halves of the split bar are the same two colours saying the same two
things. Every other facet — `เหมาจ่าย`, `มาตรฐานใหม่` — is a neutral outline tag.
When colour appears, it is load-bearing.

Two rules that fell out of building it:

- **`host` has a fill value and a text value.** A bar segment on the page ground
  and a sentence on the page ground need different lightness to be legible;
  `--color-host` is bright enough for the bar and misses 4.5:1 as text on white.
  `--color-host-ink` is the text one. Never set type in `--color-host`.
- **`warn` does not borrow `host`.** "This number is too old to trust" and "this is
  the life policy bolted on" are different facts and must not share a border.

Themes use `light-dark()` — one definition per token, no JS, no flash.

## Layout

Square corners everywhere. Rounded corners soften; nothing here should feel soft.

- Records are rows in one table above 768px and stacked cards below it, where the
  columns stop being comparable.
- **The whole row is the click target.** It used to be a 24px `+`, which is both
  hard to hit and impossible to discover. The button stays as the real control so
  keyboard and screen readers still work; it takes the full card width and gains a
  visible name on mobile, where it is otherwise orphaned at the bottom-left.
- **Prose never lives in a table cell.** A cell holding a sentence stops being a
  cell you can compare down a column. Reasons a figure is missing, host-policy
  caveats and copay conditions all live in the expandable panel. The grid holds
  numbers, tags and one short phrase.
- Structure is never numbered. These plans are a set, not a sequence.

## Organising 33 records

An alphabetical-by-Thai-insurer list of 33 rows has no entry point. The controls
that fix that:

- **Filter by contract type**, with live counts on the buttons. A filter that
  hides its own count is one you have to click to understand.
- **Sort** by first-year premium, lifetime total, or IPD ceiling. **A withheld
  figure sorts last in every direction** — ordering an unknown as if it were zero
  would float the least-documented plans to the top, which is the opposite of what
  this site is for.
- **Hide plans with no published premium**, for readers who only want what they
  can actually price.
- **`วงเงินผู้ป่วยใน` is a column, not a detail.** It was buried in the collapsed
  panel while first-year premium was on the surface — which invites reading the
  cheapest row as the best one. The two facts have to sit side by side.

Sorting is not ranking. The reader picks a column; the site never picks one for
them, never scores a plan, and says so above the table.

Above the table, one line answers the question the reader came with before any
scrolling: at this age, this many plans, first-year premium from X to Y.

The public-scheme block caps at two bullets per column behind a `ดูทั้งหมด`
toggle. Whole, it is a screen and a half of reading standing between a phone
reader and the plans.

## Signature

**The premium split bar.** One flat two-part bar per rider: `accent` for the share
of your annual cheque that is actual health cover, `host` for the life policy you
are forced to buy alongside it. Width is the whole argument — the site exists
because that second segment is usually larger than people expect.

It renders only when both figures are known. No gradient, no rounded ends. Its
width transitions while the age dial moves, because a premium curve is a curve and
you can only see that if it travels. Standalone plans get no bar; they have
nothing to split.

## Floor

Responsive to mobile, visible keyboard focus on every control, reduced motion
respected, hover effects gated behind `(hover: hover)`. A withheld number is shown
as withheld, never as zero and never as a guess.
