import assert from 'node:assert/strict';
import { loadCoverage, loadCoverageMatrix, loadPlans } from './data.server';
import { CoverageRecord } from './schema';

/** Tests the public validation boundary used by the data loader. */
const coverage = loadCoverage();
assert.equal(coverage.length, 9);
const scb = coverage.find((record) => record.id === 'scb-life-health-candidates');
assert.ok(scb);
assert.equal(scb.status, 'insufficient_data');
const notEnteredReason = scb.not_entered_reason;
assert.ok(notEnteredReason);
assert.match(notEnteredReason, /terms_source/);
assert.equal(CoverageRecord.safeParse(scb).success, true);
assert.equal(coverage.find((record) => record.id === 'msig-seasonal-diseases')?.status, 'out_of_scope');
assert.equal(coverage.find((record) => record.id === 'deves-raksuk')?.status, 'not_verified');

const matrix = loadCoverageMatrix();
assert.equal(matrix.records.length, 20);
assert.equal(matrix.records.filter((record) => record.status === 'in_dataset').length, 20);
assert.equal(matrix.records.every((record) => record.oic_company_code === null), true);

const missingReason = CoverageRecord.safeParse({
	...scb,
	status: 'not_found',
	not_entered_reason: null
});
assert.equal(missingReason.success, false);

const plans = loadPlans();
const ktaxa = plans.find((plan) => plan.id === 'ktaxa-ihealthy-ultra-gold');
assert.deepEqual(ktaxa?.host_policy?.premium, [
	{ age_from: 35, age_to: 35, thb_per_year: 750, sex: 'female' }
]);
const allianz = plans.find((plan) => plan.id === 'allianzayudhya-basic-care-plan1');
assert.deepEqual(allianz?.renewal_ceiling_by_entry_age, [
	{ entry_age_from: 11, entry_age_to: 59, renewal_ceiling_age: null, renewal_ceiling_kind: 'lifetime' },
	{ entry_age_from: 60, entry_age_to: 65, renewal_ceiling_age: 80, renewal_ceiling_kind: 'fixed' }
]);
const viriyah = plans.find((plan) => plan.id === 'viriyah-v-prestige-care-plan1');
assert.deepEqual(viriyah?.renewal_ceiling_by_entry_age, [
	{ entry_age_from: 0, entry_age_to: 60, renewal_ceiling_age: null, renewal_ceiling_kind: 'lifetime' },
	{ entry_age_from: 61, entry_age_to: 65, renewal_ceiling_age: 80, renewal_ceiling_kind: 'fixed' }
]);
assert.equal(
	plans.find((plan) => plan.id === 'dhipaya-tip-non-chill-1')?.renewal_ceiling_by_entry_age.length,
	0
);
assert.equal(
	plans.find((plan) => plan.id === 'muangthailife-maternity-plus-plan1')?.category,
	'maternity'
);
assert.equal(
	plans.find((plan) => plan.id === 'chubbsamaggi-long-stay-visa-plan1')?.category,
	'visa_expat'
);
assert.equal(plans.find((plan) => plan.id === 'thaivivat-active-health-simple')?.deductible_thb, null);
assert.equal(plans.find((plan) => plan.id === 'thaivivat-active-health-diamond')?.premium?.[0].thb_per_year, 45600);

console.log('schema ok');
