import { loadCoverage } from '$lib/data.server';
import type { PageServerLoad } from './$types';

export const prerender = true;

/** Research candidates stay separate from comparable plans, but remain public and auditable. */
export const load: PageServerLoad = () => ({ coverage: loadCoverage() });
