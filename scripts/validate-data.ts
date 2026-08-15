import { loadCoverage, loadCoverageMatrix, loadPlans, loadSchemes } from '../src/lib/data.server';

const plans = loadPlans();
const schemes = loadSchemes();
const coverage = loadCoverage();
const matrix = loadCoverageMatrix();
console.log(
	`ok — ${plans.length} plans, ${schemes.length} schemes, ${coverage.length} coverage records, ${matrix.records.length} matrix rows`
);
