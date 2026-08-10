# Design

The site is a datasheet, not a landing page. Nobody arrives here to be sold to —
they arrive to check a number against its source. Every choice below serves
reading numbers and trusting them.

## Type

| Role            | Face                              | Why                                                                                |
| --------------- | --------------------------------- | ---------------------------------------------------------------------------------- |
| Display + body  | IBM Plex Sans Thai (unlooped)      | The technical cut of Thai, not the schoolbook looped one. Reads as instrumentation. |
| Numbers, labels | IBM Plex Mono (`.tnum`, `.label`) | Tabular figures. Money columns line up or they lie.                                 |

Rules:

- Every currency figure, age, percentage and date is `.tnum` — mono, tabular.
- Every field label is `.label` — mono, uppercase, tracked. Machine-set on purpose.
- Thai body copy stays at `line-height: 1.7` so tone marks survive.

Loaded from Google Fonts today. Self-hosting a Thai+Latin+digits subset under
`static/fonts` is the open TODO in `src/app.css`.

## Color

Cold instrument palette. One signal per meaning, no decorative hues.

| Token       | Means                                              |
| ----------- | -------------------------------------------------- |
| `bg`        | ground                                             |
| `surface`   | a record you can cite                              |
| `border`    | field separation inside a record                   |
| `rule`      | structural division between records                 |
| `ink`       | facts                                              |
| `muted`     | provenance, caveats, units                          |
| `accent`    | **health cover** — the thing you are buying         |
| `host`      | **not health cover** — the life policy bolted on    |
| `warn-*`    | figure withheld because it is too old to trust      |

`accent` and `host` are not a palette, they are the argument. Do not reuse them
for decoration.

Themes use `light-dark()` — one definition per token, no JS, no flash.

## Layout

Square corners everywhere. Rounded corners soften; nothing here should feel soft.

- Records are bordered blocks with a hard header strip (name, insurer, kind) and
  a hard footer strip (sources, last-verified date). The footer is not fine
  print — it is the reason the record is believable, so it gets its own band.
- The spec grid uses per-row bottom rules, so the eye tracks label → value
  across a wide screen.
- Structure is never numbered. These plans are a set, not a sequence; numbering
  them would imply a ranking the site refuses to give.

## Signature

**The premium split bar.** One flat two-part bar per rider: `accent` for the
share of your annual cheque that is actual health cover, `host` for the life
policy you are forced to buy alongside it. Width is the whole argument — the
site exists because that second segment is usually larger than people expect.

It renders only when both figures are known. No animation, no gradient, no
rounded ends. Standalone plans get no bar, because they have nothing to split.

## Floor

Responsive to mobile, visible keyboard focus on every control, reduced motion
respected. A withheld number is shown as withheld, never as zero and never as a
guess.
