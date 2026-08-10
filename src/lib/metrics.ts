import type { Plan } from './schema';

/** Premiums are hidden once a record has gone this long without re-verification. */
export const PREMIUM_STALE_AFTER_MONTHS = 18;

type Band = { age_from: number; age_to: number; thb_per_year: number; sex: 'any' | 'male' | 'female' };
export type Sex = 'male' | 'female';

function bandFor(table: Band[], age: number, sex: Sex): Band | null {
	return (
		table.find((b) => age >= b.age_from && age <= b.age_to && (b.sex === 'any' || b.sex === sex)) ??
		null
	);
}

/** Annual premium for the health cover alone, at this age. Null if out of range. */
export function healthPremiumAt(plan: Plan, age: number, sex: Sex): number | null {
	return bandFor(plan.premium, age, sex)?.thb_per_year ?? null;
}

/** Annual premium for the mandatory host life policy, if this is a rider. */
export function hostPremiumAt(plan: Plan, age: number, sex: Sex): number | null {
	const table = plan.host_policy?.premium;
	if (!table) return null;
	return bandFor(table, age, sex)?.thb_per_year ?? null;
}

/**
 * Metric 3: how much of the reader's money actually buys health cover.
 * Null when the insurer won't publish a host premium — we say so rather than guess.
 */
export function healthShare(plan: Plan, age: number, sex: Sex): number | null {
	const health = healthPremiumAt(plan, age, sex);
	if (health === null) return null;
	if (plan.type === 'standalone') return 1;
	const host = hostPremiumAt(plan, age, sex);
	if (host === null) return null;
	return health / (health + host);
}

export type Cumulative = {
	from_age: number;
	to_age: number;
	health_thb: number;
	host_thb: number;
	total_thb: number;
	/** True when some years in the span had no published band and were skipped. */
	incomplete: boolean;
};

/**
 * Metric 1: what this plan costs in total from today until the insurer stops
 * renewing it. Agents quote the entry-age price; this is the whole bill,
 * at today's rates. Insurers can and do re-rate — the UI must say so.
 */
export function cumulativePremium(plan: Plan, fromAge: number, sex: Sex): Cumulative {
	const toAge = plan.renewal_ceiling_age;
	let health = 0;
	let host = 0;
	let incomplete = false;

	for (let age = fromAge; age <= toAge; age++) {
		const h = healthPremiumAt(plan, age, sex);
		if (h === null) {
			incomplete = true;
			continue;
		}
		health += h;
		host += hostPremiumAt(plan, age, sex) ?? 0;
	}

	return { from_age: fromAge, to_age: toAge, health_thb: health, host_thb: host, total_thb: health + host, incomplete };
}

/** Metric 2 is read straight off the record; this is the reader-facing framing. */
export function yearsOfCoverFrom(plan: Plan, age: number): number {
	return Math.max(0, plan.renewal_ceiling_age - age + 1);
}

export function isEligible(plan: Plan, age: number): boolean {
	return age >= plan.entry_age_min && age <= plan.entry_age_max;
}

/**
 * A stale premium is worse than no premium on a site people trust.
 * Structural data stays visible; only the numbers disappear.
 */
export function premiumIsStale(verifiedOn: string, today: Date): boolean {
	const cutoff = new Date(today);
	cutoff.setMonth(cutoff.getMonth() - PREMIUM_STALE_AFTER_MONTHS);
	return new Date(verifiedOn) < cutoff;
}

export function monthsSince(verifiedOn: string, today: Date): number {
	const then = new Date(verifiedOn);
	return (today.getFullYear() - then.getFullYear()) * 12 + (today.getMonth() - then.getMonth());
}
