# Product taxonomy and comparison boundaries

This is the scope contract for `data/plans/` and future coverage research. A
category describes the product's primary benefit, not every extra benefit
mentioned in its brochure.

## Categories

| Category | Include | Keep separate from |
| --- | --- | --- |
| `medical_expense` | IPD/OPD reimbursement or medical-expense cover | Lump-sum diagnosis benefits |
| `critical_illness` | Lump-sum payment after a covered critical-illness diagnosis | Treatment-expense limits |
| `cancer` | Cancer-specific lump-sum or treatment cover | General medical-expense cover unless the source clearly defines both |
| `dental` | Dental treatment as the primary product | Incidental dental benefits in a broader plan |
| `maternity` | Maternity or childbirth as the primary product/rider | General health plans that merely include a maternity benefit |
| `mental_health` | Mental-health treatment as the primary product | A general plan with one mental-health allowance |
| `visa_expat` | Visa, inbound, or international-expat medical cover | Domestic individual plans |
| `group` | Employer, corporate, or employee-benefit cover | Individual products; excluded from the public comparison |

## Rules

1. One plan record has one primary category. Secondary benefits remain fields
   and source notes; they do not change which comparison table owns the record.
2. Lifetime premium arithmetic only compares records in the same category and
   only uses published age bands. It must never compare a medical-expense plan
   with a lump-sum critical-illness product.
3. A product may be researched without being entered. Use the coverage registry
   status `insufficient_data`, `not_found`, `not_verified`, or `out_of_scope`
   and provide a plain-language `not_entered_reason`.
4. `group` products are recorded only when needed to explain an exclusion and
   are not loaded into the public plan dataset.
5. A category change is a data-model decision. It requires a linked issue and a
   regression test before existing records are reclassified.

## Current assignments

- Existing records default to `medical_expense` unless explicitly classified.
- The Muang Thai maternity rider is `maternity`.
- The Chubb Samaggi long-stay visa plan is `visa_expat`.
- No current record is classified as `critical_illness`, `cancer`, `dental`,
  `mental_health`, or `group`.
