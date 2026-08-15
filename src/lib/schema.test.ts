import assert from 'node:assert/strict';
import { loadCoverage, loadCoverageMatrix, loadPlans } from './data.server';
import { CoverageRecord } from './schema';

/** Tests the public validation boundary used by the data loader. */
const coverage = loadCoverage();
assert.equal(coverage.length, 4);
const scb = coverage.find((record) => record.id === 'scb-life-health-candidates');
assert.ok(scb);
assert.equal(scb.status, 'insufficient_data');
const notEnteredReason = scb.not_entered_reason;
assert.ok(notEnteredReason);
assert.match(notEnteredReason, /terms_source/);
assert.equal(CoverageRecord.safeParse(scb).success, true);

const matrix = loadCoverageMatrix();
assert.equal(matrix.records.length, 19);
assert.equal(matrix.records.filter((record) => record.status === 'in_dataset').length, 19);
assert.equal(matrix.records.every((record) => record.oic_company_code === null), true);

const missingReason = CoverageRecord.safeParse({
	...scb,
	status: 'not_found',
	not_entered_reason: null
});
assert.equal(missingReason.success, false);

const plans = loadPlans();
assert.equal(
	plans.find((plan) => plan.id === 'muangthailife-maternity-plus-plan1')?.category,
	'maternity'
);
assert.equal(
	plans.find((plan) => plan.id === 'chubbsamaggi-long-stay-visa-plan1')?.category,
	'visa_expat'
);

console.log('schema ok');
