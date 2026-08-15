import assert from 'node:assert/strict';
import { loadCoverage, loadPlans } from './data.server';
import { CoverageRecord } from './schema';

/** Tests the public validation boundary used by the data loader. */
const coverage = loadCoverage();
assert.equal(coverage.length, 1);
assert.equal(coverage[0].status, 'insufficient_data');
const notEnteredReason = coverage[0].not_entered_reason;
assert.ok(notEnteredReason);
assert.match(notEnteredReason, /terms_source/);
assert.equal(CoverageRecord.safeParse(coverage[0]).success, true);

const missingReason = CoverageRecord.safeParse({
	...coverage[0],
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
