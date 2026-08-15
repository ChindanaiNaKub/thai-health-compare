import { loadCoverage, loadPlans, loadSchemes } from '../src/lib/data.server';

const plans = loadPlans();
const schemes = loadSchemes();
const coverage = loadCoverage();
console.log(`ok — ${plans.length} plans, ${schemes.length} schemes, ${coverage.length} coverage records`);
