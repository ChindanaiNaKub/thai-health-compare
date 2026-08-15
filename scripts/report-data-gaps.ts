import { loadPlans } from '../src/lib/data.server';

const plans = loadPlans();

function ageGap(plan: (typeof plans)[number]): number | null {
	if (plan.premium === null || plan.renewal_ceiling_age === null) return null;
	let missing = 0;
	for (let age = plan.entry_age_min; age <= plan.renewal_ceiling_age; age += 1) {
		if (!plan.premium.some((band) => band.age_from <= age && age <= band.age_to)) missing += 1;
	}
	return missing;
}

const rows = plans.map((plan) => ({
	id: plan.id,
	insurer: plan.insurer.en ?? plan.insurer.th,
	type: plan.type,
	category: plan.category,
	premium_missing: plan.premium === null,
	host_premium_missing: plan.type === 'rider' && plan.host_policy?.premium === null,
	terms_not_filed: plan.terms_source.tier !== 'filed_wording',
	exclusions_empty: plan.exclusions.length === 0,
	ipd_limit_thb: plan.ipd_annual_limit_thb,
	ipd_missing: plan.ipd_annual_limit_thb === null,
	opd_missing: plan.opd_annual_limit_thb === null,
	renewal_unknown: plan.renewal_ceiling_age === null && plan.renewal_ceiling_by_entry_age.length === 0,
	age_gap: ageGap(plan)
}));

const count = (field: keyof (typeof rows)[number]) => rows.filter((row) => row[field] === true).length;
const numericAgeGaps = rows
	.filter((row) => row.age_gap !== null && row.age_gap > 0)
	.sort((a, b) => (b.age_gap ?? 0) - (a.age_gap ?? 0));
const termsPriority = rows
	.filter((row) => row.terms_not_filed)
	.sort((a, b) => (b.ipd_limit_thb ?? 0) - (a.ipd_limit_thb ?? 0));

console.log(`plans: ${plans.length}`);
console.log(`premium_missing: ${count('premium_missing')}`);
console.log(`host_premium_missing: ${count('host_premium_missing')}`);
console.log(`terms_not_filed: ${count('terms_not_filed')}`);
console.log(`exclusions_empty: ${count('exclusions_empty')}`);
console.log(`ipd_missing: ${count('ipd_missing')}`);
console.log(`opd_missing: ${count('opd_missing')}`);
console.log(`renewal_unknown: ${count('renewal_unknown')}`);
console.log('age_gap_top10:');
for (const row of numericAgeGaps.slice(0, 10)) console.log(`  ${row.id}: ${row.age_gap} ages uncovered`);
console.log('terms_audit_top10:');
for (const row of termsPriority.slice(0, 10)) {
	console.log(`  ${row.id}: IPD ${row.ipd_missing ? 'missing' : 'present'}, current source is not filed wording`);
}
