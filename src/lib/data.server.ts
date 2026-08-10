import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { Scheme, ValidatedPlan, type Plan, type Scheme as SchemeType } from './schema';

/**
 * Data lives as YAML in the repo, not in a database. The CMS is a text editor
 * and a git commit — which is also the audit trail and the contribution path.
 * This module runs at build time only; nothing here ships to the browser.
 */

const DATA_DIR = join(process.cwd(), 'data');

function loadDir(sub: string): unknown[] {
	const dir = join(DATA_DIR, sub);
	return readdirSync(dir)
		// A leading underscore marks a template with invented numbers. Loading one
		// would put fictional premiums in front of a reader as if they were real.
		.filter((f) => f.endsWith('.yaml') && !f.startsWith('_'))
		.map((f) => ({ file: join(sub, f), doc: parse(readFileSync(join(dir, f), 'utf8')) }))
		.map(({ file, doc }) => ({ ...(doc as object), __file: file }));
}

function parseAll<T>(raw: unknown[], schema: { safeParse: (v: unknown) => { success: boolean; data?: T; error?: unknown } }): T[] {
	const out: T[] = [];
	for (const item of raw) {
		const file = (item as { __file: string }).__file;
		const result = schema.safeParse(item);
		if (!result.success) {
			throw new Error(`${file} failed validation:\n${JSON.stringify(result.error, null, 2)}`);
		}
		out.push(result.data as T);
	}
	return out;
}

export function loadPlans(): Plan[] {
	return parseAll<Plan>(loadDir('plans'), ValidatedPlan).sort((a, b) =>
		a.insurer.th.localeCompare(b.insurer.th, 'th')
	);
}

export function loadSchemes(): SchemeType[] {
	return parseAll<SchemeType>(loadDir('schemes'), Scheme);
}
