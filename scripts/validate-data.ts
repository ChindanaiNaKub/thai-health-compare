import { loadPlans, loadSchemes } from '../src/lib/data.server';

const plans = loadPlans();
const schemes = loadSchemes();
console.log(`ok — ${plans.length} plans, ${schemes.length} schemes`);
