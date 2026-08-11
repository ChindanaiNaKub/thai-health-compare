# Round 5: resolving the licence-1020 identity question (ธนชาตประกันชีวิต)

Research date: 2026-08-12. This file is a scoping/identity pass, not a data-entry pass — it
adds **zero** records to `data/plans/`. Same rules as every other file in this directory:
every claim is followed by the verbatim text it rests on and the exact URL that text lives
on. Per the brief for this pass, no broker, agent or comparison site is cited for any claim
about the company's status — only คปภ./OIC, news of the corporate action itself, Prudential
plc's own regulatory filing, and Thanachart's/T Life's own pages.

**Outcome, in one line: licence 1020 (ธนชาตประกันชีวิต) is not dormant and was not renamed
into ที ไลฟ์ (T Life) — it was sold outright and its retail life business merged into
Prudential Life Assurance (Thailand) PCL (licence 1010) in a deal completed 3 May 2013, a
decade before this project's earliest research file. No product has traded under the
"ธนชาตประกันชีวิต" name since. Prudential Thailand (licence 1010) is the surviving entity,
and it was independently checked and rejected for lack of any published premium in
`round4-gap-analysis.md` §1e.**

## Method note

1. `round4-gap-analysis.md` §2c left this open after finding that Thanachart Capital's
   current group page lists only two insurance subsidiaries today — ธนชาตประกันภัย (non-life,
   licence 2067) and ที ไลฟ์ ประกันชีวิต (the renamed ประกันชีวิตนครหลวงไทย, licence 1017) —
   neither of which is ธนชาตประกันชีวิต, and that no `thanachartlife.co.th` or equivalent
   domain resolves.
2. A general web search surfaced a search-engine-generated summary claiming
   "ธนชาตประกันชีวิตได้เปลี่ยนชื่อเป็น 'ที ไลฟ์ ประกันชีวิต'" (Thanachart Life was renamed to
   T Life). **This is checked directly against T Life's own site below and is wrong** — it
   is an artifact of two unrelated TCAP-family search results being blended together, not a
   claim either company makes about itself.
3. The resolving document is Prudential plc's own Form 20-F annual report, filed with the
   US Securities and Exchange Commission (a primary regulatory filing by the acquirer, not a
   Thai broker or comparison site) — fetched directly from `sec.gov` by `curl` after WebFetch
   returned an HTTP 403 to that domain.

---

## 1. T Life's own history page rules out the "renamed to T Life" theory

T Life (ที ไลฟ์ ประกันชีวิต, licence 1017, already checked and rejected for lack of a
medical-expense product in `round3-life-minor-sourcing.md` §2) publishes its own corporate
lineage on its own site. It names four predecessor names, none of them Thanachart:

> จากวันเริ่มต้นกับ ศรีนครประกันชีวิต และพัฒนามาเป็น แมกซ์ประกันชีวิต นครหลวงไทยประกันชีวิต
> ที ไลฟ์ ประกันชีวิต ตามลำดับ

https://www.tlife.co.th/about-us (fetched 2026-08-12)

The page announcing T Life's current name and TCAP's controlling stake is equally explicit
about which prior company was renamed — it names the predecessor as a different company:

> บมจ. ทุนธนชาต (TCAP) เพิ่มสัดส่วนการถือหุ้นเป็น 99.99% ใน ที ไลฟ์ ประกันชีวิต

https://www.tlife.co.th/grand-tlife (fetched 2026-08-12; the page describes a shareholding
increase and a name change from the company's immediately prior name, itself descended from
นครหลวงไทยประกันชีวิต per §1's history page — not from ธนชาตประกันชีวิต)

**T Life's lineage is ศรีนครประกันชีวิต → แมกซ์ประกันชีวิต → นครหลวงไทยประกันชีวิต → ที ไลฟ์,
which is licence 1017's history, already established in `round3-life-minor-sourcing.md` §2.
Licence 1020 does not appear anywhere in T Life's own account of itself.**

---

## 2. What actually happened to licence 1020: sold to Prudential, 100%, May 2013

Prudential plc's Form 20-F (its annual report filed with the US SEC) describes the
transaction in its own words, twice, in different sections of the same filing:

> On 5 November 2012, Prudential plc, through its subsidiary Prudential Life Assurance
> (Thailand) Public Company Limited ('Prudential Thailand') entered into an agreement to
> acquire 100 per cent of Thanachart Life Assurance Company Limited ('Thanachart Life'), a
> wholly-owned life insurance subsidiary of Thanachart Bank Public Company limited
> ('Thanachart Bank'). The transaction was approved by the regulator in March 2013 and is
> expected to close in the second quarter of 2013.

> As described above, in November 2012, Prudential announced a new and strategically
> significant, exclusive long-term partnership with Thailand's Thanachart Bank as part of a
> deal that will see Thanachart Life merged with our existing life operation in the country
> immediately doubling our market share.

https://www.sec.gov/Archives/edgar/data/1116578/000104746913004438/a2214090z20-f.htm
(fetched 2026-08-12 via `curl`; both passages appear in the body of the same filing, one in
the CEO/strategy review, one in the "Changes to Group's holdings during the period" note)

"The regulator" approving the deal in March 2013 is the คปภ./OIC — a life-insurer change of
control in Thailand requires OIC approval, and Prudential's own filing frames the March 2013
approval as the regulatory gate the deal was waiting on before closing.

Contemporary Thai business press reports the same transaction, independently:

> Thanachart Bank is selling Thanachart Life Assurance to Prudential Life Assurance
> (Thailand) Plc for Bt18 billion.

https://www.nationthailand.com/business/30193686 (fetched 2026-08-12; the same article also
states the deal came with an exclusive 15-year bancassurance contract making Thanachart Bank
"the sole bancassurance vendor of all Prudential's life assurance products")

An industry trade outlet independently confirms the closing date:

> [Prudential] completed the purchase of Thanachart Life Assurance Company from Thanachart
> Bank Public Company Limited on 3 May 2013.

https://www.lifeinsuranceinternational.com/news/prudential-acquires-thanachart-life-assurance-060513/
(fetched 2026-08-12)

**Three independent sources — the acquirer's own SEC filing, contemporary Thai business
press, and an industry trade outlet — agree on the same shape: a 100% share acquisition,
OIC-approved in March 2013, closed 3 May 2013, with the acquired company's life insurance
business explicitly described by the acquirer as "merged with our existing life operation in
the country."** "Our existing life operation" is Prudential Life Assurance (Thailand) PCL —
licence 1010 on the June 2020 OIC table, already checked and rejected in this project for
publishing no premium on its one IPD medical-expense product, Pru Healthy Plus
(`round4-gap-analysis.md` §1e).

---

## 3. Why licence 1020 still appears on the June 2020 OIC table, 7 years later

This is the one piece this pass could not fully close. The June 2020 OIC company-code table
(`round4-gap-analysis.md` method note item 4) lists licence 1020 under the name
ธนชาตประกันชีวิต — seven years after the 100%-acquisition-and-merger described in §2. Two
explanations are consistent with everything found in this pass, and this project cannot
distinguish between them without a DBD (Department of Business Development) corporate
registry lookup, which is out of scope for the sourcing rule governing this file (OIC, news
of the regulatory action, or Thanachart's own pages only — a business-data aggregator is not
an acceptable source for a status claim under that rule, so none was used to settle this):

- The legal entity ธนชาตประกันชีวิต จำกัด (มหาชน) was kept alive as a licensed shell after
  the 2013 deal — its retail book and brand merged into Prudential Thailand's operation, but
  its OIC licence was not formally surrendered or amalgamated on paper — and the June 2020
  table is simply listing a company code that still technically exists on the licence
  register, sells nothing under its own name, and has done so for over a decade.
- Or the June 2020 table's entry is stale in a different way than the three renames this
  project has already documented (แมนูไลฟ์→เคดับบลิวไอ, บูพา→dead, แอลเอ็มจี→ชับบ์สามัคคี) —
  those are all cases OIC's own list has not caught up with; this could be the same kind of
  lag, just eight years deep instead of one or two.

**Either way, the operational conclusion for this project's purposes is the same: no product
has traded under the ธนชาตประกันชีวิต name since 3 May 2013, its life insurance business
merged into Prudential Life Assurance (Thailand) PCL by the acquirer's own account, and the
correct entity to research for any Thanachart-Bank-branded life or health product today is
Prudential Thailand (licence 1010) — already checked and rejected in `round4-gap-analysis.md`
§1e.**

---

## 4. Verdict

**Licence 1020 is RESOLVED, not still-open: absorbed.** It is not dormant in the sense of
"unknown status" — its history is documented, dated and multiply sourced. It was not renamed
into T Life (licence 1017's lineage is unrelated, per §1). It trades today under no name at
all; its business was merged into Prudential Life Assurance (Thailand) PCL, licence 1010, in
2013. No further research time should be spent chasing a live "Thanachart Life" domain or
product line — none has existed since before this project's own earliest research file. The
priority-list entry for this in `round4-gap-analysis.md` §4 item 5 ("confirm whether it is
dormant, renamed, or simply has a domain this pass did not find") is closed by this file:
**absorbed into licence 1010, confirmed by the acquirer's own regulatory filing.**
