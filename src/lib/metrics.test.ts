import assert from 'node:assert/strict';
import { cumulativePremium, healthShare } from './metrics';
import type { Plan } from './schema';

/**
 * The lifetime total is the number this site exists to publish, so it gets a
 * hand-computed check. Run: bun run test
 */
const plan = {
	type: 'rider',
	renewal_ceiling_age: 45,
	premium: [
		{ age_from: 40, age_to: 42, thb_per_year: 1000, sex: 'any' },
		{ age_from: 43, age_to: 45, thb_per_year: 2000, sex: 'any' }
	],
	host_policy: {
		premium: [{ age_from: 40, age_to: 45, thb_per_year: 500, sex: 'any' }]
	}
} as unknown as Plan;

// Ages 40,41,42 at 1000 + ages 43,44,45 at 2000 = 3000 + 6000.
const c = cumulativePremium(plan, 40, 'male');
assert.equal(c.health_thb, 9000);
assert.equal(c.host_thb, 3000); // six years at 500
assert.equal(c.total_thb, 12000);
assert.equal(c.incomplete, false);

// A year with no published band is skipped and flagged, never guessed.
const gapped = cumulativePremium(plan, 38, 'male');
assert.equal(gapped.health_thb, 9000);
assert.equal(gapped.incomplete, true);

// Host money is not health money: 1000 of 1500 buys cover.
assert.equal(healthShare(plan, 40, 'male'), 1000 / 1500);

console.log('metrics ok');
