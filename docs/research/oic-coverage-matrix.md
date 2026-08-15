# OIC coverage matrix — working snapshot

Checked: 2026-08-15. This is a working matrix for the 19 insurers represented
by the current 40-plan dataset. It is not yet a claim that the dataset covers
the complete current OIC universe.

## What is verified

The OIC publishes separate official company-directory entry points for life and
non-life insurers:

- [OIC life-insurer directory](https://oiceservice.oic.or.th/company/life.php)
- [OIC non-life-insurer directory](https://oiceservice.oic.or.th/company/non_life.php)

The pages expose a live company selector, but the selector is client-rendered
and did not provide a server-readable company export in this pass. The official
OIC [company-code PDF](https://oiceservice.oic.or.th/document/Law/file/07126/07126_716a8deb8462bc07a98d4e3efac57864.pdf)
is a historical compulsory-motor data structure and is not used here as proof
of a current health-insurer universe or as a license-number source.

## Matrix meaning

The machine-readable snapshot is `data/coverage-matrix/oic-matrix.yaml`.

- `in_dataset` means at least one plan for that insurer is currently present in
  `data/plans/`.
- `license_no: null` and `oic_company_code: null` are deliberate: neither value
  was guessed from a historical or unrelated source.
- The OIC directory pass remains open until the live selector can be exported
  or checked interactively and matched to the insurer's legal name/class.

Current working rows:

| Class | Insurers represented | Plans |
| --- | ---: | ---: |
| Life | 10 | 18 |
| Non-life | 9 | 22 |
| Total | 19 | 40 |

The next implementation step is a browser-enabled OIC export/check. For each
company, capture legal name, class, license/company identifier, and checked date;
then compare the result against this matrix and add explicit `not_found` or
`not_verified` records rather than silently dropping companies.
