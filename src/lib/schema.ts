import { z } from 'zod';

/**
 * The data schema is the product. Every rule the grilling session settled on is
 * encoded here, so bad data fails the build rather than misleading a reader.
 */

/** Sourcing tiers, best first. Coverage terms may only come from filed wording. */
export const SourceTier = z.enum(['official_insurer', 'filed_wording', 'agent_site']);
export type SourceTier = z.infer<typeof SourceTier>;

const Bilingual = z.object({
	th: z.string().min(1),
	en: z.string().nullable().default(null)
});

const Sourced = z.object({
	url: z.url(),
	tier: SourceTier,
	/** ISO date the human last opened this document and confirmed the value. */
	verified_on: z.iso.date(),
	note: z.string().optional()
});

/** One age band of premium, inclusive on both ends, in THB per year. */
const PremiumBand = z.object({
	age_from: z.number().int().min(0).max(120),
	age_to: z.number().int().min(0).max(120),
	thb_per_year: z.number().int().positive(),
	sex: z.enum(['any', 'male', 'female']).default('any')
});

const PremiumTable = z
	.array(PremiumBand)
	.min(1)
	.superRefine((bands, ctx) => {
		for (const b of bands) {
			if (b.age_to < b.age_from) {
				ctx.addIssue({ code: 'custom', message: `band ${b.age_from}-${b.age_to} is inverted` });
			}
		}
	});

/**
 * Riders cannot be bought alone. The host life policy premium is money the
 * reader must spend to get the health cover, so it is a first-class field.
 */
const HostPolicy = z.object({
	name: Bilingual,
	/** The cheapest host the insurer will accept this rider on. */
	min_sum_insured_thb: z.number().int().positive().nullable(),
	/**
	 * Rates for that cheapest host at its minimum sum insured — a floor, not a
	 * quote. Anyone buying a bigger host pays more; nobody pays less.
	 */
	premium: PremiumTable.nullable(),
	/** Use when the insurer will not publish a figure. Shown verbatim to the reader. */
	premium_unknown_reason: z.string().nullable().default(null),
	source: Sourced
});

export const Plan = z.object({
	id: z.string().regex(/^[a-z0-9-]+$/),
	insurer: Bilingual,
	name: Bilingual,

	/** standalone = buyable on its own. rider = requires a host life policy. */
	type: z.enum(['standalone', 'rider']),
	host_policy: HostPolicy.nullable().default(null),

	/** เหมาจ่าย lump-sum vs per-item schedule vs deductible-first. */
	shape: z.enum(['lump_sum', 'per_item_schedule', 'deductible_first', 'opd_inclusive']),
	new_health_standard: z.boolean(),

	/**
	 * Null when the insurer publishes no premium tied to an age. Two of the
	 * largest insurers in Thailand are in that position, and excluding them
	 * silently would make this dataset a list of whoever ships a text-layer PDF.
	 */
	premium: PremiumTable.nullable(),
	/** Required when premium is null. Shown verbatim to the reader. */
	premium_unknown_reason: z.string().nullable().default(null),
	entry_age_min: z.number().int().min(0),
	entry_age_max: z.number().int().max(120),
	/** ต่ออายุถึงอายุ — the age past which the insurer stops renewing. */
	renewal_ceiling_age: z.number().int().min(1).max(120).nullable(),
	/** Required when renewal_ceiling_age is null. Shown verbatim to the reader. */
	renewal_ceiling_unknown_reason: z.string().nullable().default(null),

	ipd_annual_limit_thb: z.number().int().nonnegative().nullable(),
	/**
	 * Whether the IPD figure is a per-policy-year cap or a per-confinement one.
	 * Insurers advertise both as "วงเงิน" and they are not the same product.
	 */
	ipd_limit_basis: z.enum(['per_policy_year', 'per_confinement']).default('per_policy_year'),
	opd_annual_limit_thb: z.number().int().nonnegative().nullable(),
	room_board_thb_per_night: z.number().int().nonnegative().nullable(),
	deductible_thb: z.number().int().nonnegative().default(0),
	copay_percent: z.number().min(0).max(100).default(0),
	/**
	 * New-standard riders start at 0% copay and can be renewed with one imposed
	 * after heavy claiming. A silent 0 hides that. Shown verbatim to the reader.
	 */
	copay_on_renewal: z.string().nullable().default(null),

	/** Contract terms. Must be sourced from filed wording — enforced below. */
	exclusions: z.array(Bilingual).default([]),
	waiting_period_days: z.number().int().nonnegative().nullable(),

	premium_source: Sourced,
	terms_source: Sourced,

	/** Latest date any field on this record was confirmed. Drives staleness. */
	verified_on: z.iso.date()
});

export type Plan = z.infer<typeof Plan>;

export const ValidatedPlan = Plan.superRefine((plan, ctx) => {
	if (plan.type === 'rider' && !plan.host_policy) {
		ctx.addIssue({
			code: 'custom',
			path: ['host_policy'],
			message: 'riders must declare their host policy — hiding it is the thing this site exists to fix'
		});
	}
	if (plan.terms_source.tier === 'agent_site') {
		ctx.addIssue({
			code: 'custom',
			path: ['terms_source'],
			message: 'coverage terms and exclusions must come from filed policy wording, never an agent site'
		});
	}
	if (plan.renewal_ceiling_age !== null && plan.renewal_ceiling_age <= plan.entry_age_max) {
		ctx.addIssue({
			code: 'custom',
			path: ['renewal_ceiling_age'],
			message: 'renewal ceiling must be above the maximum entry age'
		});
	}
	// A missing figure is a fact about the insurer, so it has to be stated, not
	// left blank. Silence here is how a dataset starts lying by omission.
	for (const [field, reason] of [
		['premium', 'premium_unknown_reason'],
		['renewal_ceiling_age', 'renewal_ceiling_unknown_reason']
	] as const) {
		if (plan[field] === null && !plan[reason]) {
			ctx.addIssue({
				code: 'custom',
				path: [reason],
				message: `${field} is null, so ${reason} must say what the insurer refuses to publish`
			});
		}
	}
});

/** UCS / SSO / CSMBS. The baseline a reader already has. Not a product. */
export const Scheme = z.object({
	id: z.enum(['ucs', 'sso', 'csmbs', 'none']),
	name: Bilingual,
	who: Bilingual,
	covers: z.array(Bilingual),
	gaps: z.array(Bilingual),
	source: Sourced,
	verified_on: z.iso.date()
});

export type Scheme = z.infer<typeof Scheme>;
