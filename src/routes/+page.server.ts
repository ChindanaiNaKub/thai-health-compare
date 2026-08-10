import { loadPlans, loadSchemes } from '$lib/data.server';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = () => {
	// Runs at build time only. The build date is baked in so staleness is
	// evaluated against when the data was last shipped, not the reader's clock —
	// a clock the reader can change.
	return {
		plans: loadPlans(),
		schemes: loadSchemes(),
		builtOn: new Date().toISOString().slice(0, 10)
	};
};
