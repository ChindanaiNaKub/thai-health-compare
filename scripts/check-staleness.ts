/**
 * Opens a GitHub issue's worth of noise in CI when a record is going stale.
 * Warns at 12 months so there is time to act before premiums self-hide at 18.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

const WARN_AFTER_MONTHS = 12;
const HIDE_AFTER_MONTHS = 18;

const today = new Date();
const overdue: string[] = [];
const warning: string[] = [];

for (const sub of ['plans', 'schemes']) {
	const dir = join(process.cwd(), 'data', sub);
	for (const file of readdirSync(dir).filter((f) => f.endsWith('.yaml'))) {
		const doc = parse(readFileSync(join(dir, file), 'utf8')) as { verified_on?: string };
		if (!doc.verified_on) continue;
		const then = new Date(doc.verified_on);
		const months =
			(today.getFullYear() - then.getFullYear()) * 12 + (today.getMonth() - then.getMonth());
		const line = `${sub}/${file} — last verified ${doc.verified_on} (${months} months ago)`;
		if (months >= HIDE_AFTER_MONTHS) overdue.push(line);
		else if (months >= WARN_AFTER_MONTHS) warning.push(line);
	}
}

for (const line of warning) console.log(`WARN  ${line}`);
for (const line of overdue) console.log(`STALE ${line}`);

if (overdue.length > 0) {
	console.log(`\n${overdue.length} record(s) past ${HIDE_AFTER_MONTHS} months — premiums are hidden on the live site.`);
	process.exit(1);
}
console.log(`\nOK — nothing past ${HIDE_AFTER_MONTHS} months.`);
