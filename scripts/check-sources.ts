import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { parse } from 'yaml';
import { pathToFileURL } from 'node:url';

type Target = { url: string; label: string; kind: 'cited' | 'watchlist' };
type SnapshotEntry = {
	status: number | null;
	hash: string | null;
	title: string | null;
	checked_on: string;
	error?: string;
	/** Content differs between two fetches in one run, so hashing cannot detect changes here. */
	volatile?: boolean;
};
type Snapshot = Record<string, SnapshotEntry>;
type Finding = { target: Target; classification: string; detail: string };

const SUBDIRS = ['plans', 'schemes', 'coverage', 'coverage-matrix'];
const CONCURRENCY = 8;

function snapshotPathFor(dataDir: string): string {
	return join(dataDir, 'source-snapshots.json');
}

function loadSnapshot(dataDir: string): Snapshot {
	try {
		return JSON.parse(readFileSync(snapshotPathFor(dataDir), 'utf8')) as Snapshot;
	} catch {
		return {};
	}
}

function collectUrls(value: unknown, out: string[]): void {
	if (Array.isArray(value)) {
		for (const item of value) collectUrls(item, out);
	} else if (value && typeof value === 'object') {
		for (const [key, child] of Object.entries(value)) {
			if (key === 'url' && typeof child === 'string' && child.startsWith('http')) out.push(child);
			else collectUrls(child, out);
		}
	}
}

function citedTargets(dataDir: string): Map<string, Target> {
	const targets = new Map<string, Target>();
	for (const sub of SUBDIRS) {
		const dir = join(dataDir, sub);
		let files: string[];
		try {
			files = readdirSync(dir).filter((f) => f.endsWith('.yaml') && !f.startsWith('_'));
		} catch {
			continue;
		}
		for (const file of files) {
			const doc = parse(readFileSync(join(dir, file), 'utf8'));
			const urls: string[] = [];
			collectUrls(doc, urls);
			const label = `${sub}/${file}`;
			for (const url of new Set(urls)) {
				const prior = targets.get(url);
				targets.set(
					url,
					prior
						? { ...prior, label: `${prior.label}, ${label}`.slice(0, 120) }
						: { url, label, kind: 'cited' }
				);
			}
		}
	}
	return targets;
}

function watchlistTargets(dataDir: string, targets: Map<string, Target>): void {
	const file = join(dataDir, 'source-watchlist.yaml');
	let doc: unknown;
	try {
		doc = parse(readFileSync(file, 'utf8'));
	} catch {
		return;
	}
	if (!Array.isArray(doc)) return;
	for (const raw of doc) {
		if (!raw || typeof raw !== 'object') continue;
		const { url, label } = raw as { url?: unknown; label?: unknown };
		if (typeof url !== 'string' || !url.startsWith('http')) continue;
		targets.set(url, { url, label: typeof label === 'string' ? label : url, kind: 'watchlist' });
	}
}

async function pool<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
	const results = new Array<R>(items.length);
	let next = 0;
	await Promise.all(
		Array.from({ length: Math.min(limit, items.length) }, async () => {
			while (next < items.length) {
				const i = next++;
				results[i] = await fn(items[i]);
			}
		})
	);
	return results;
}

async function fetchEntry(target: Target, checkedOn: string): Promise<SnapshotEntry> {
	try {
		const res = await fetch(target.url, {
			signal: AbortSignal.timeout(15000),
			redirect: 'follow',
			headers: { 'User-Agent': 'thai-health-compare-source-check/1.0' }
		});
		const buffer = await res.arrayBuffer();
		let title: string | null = null;
		if ((res.headers.get('content-type') ?? '').toLowerCase().includes('html')) {
			const head = Buffer.from(buffer.slice(0, 64 * 1024)).toString('utf8');
			const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(head);
			title = match ? match[1].trim() : null;
		}
		return {
			status: res.status,
			hash: createHash('sha256').update(Buffer.from(buffer)).digest('hex'),
			title,
			checked_on: checkedOn
		};
	} catch (err) {
		return {
			status: null,
			hash: null,
			title: null,
			checked_on: checkedOn,
			error: String(err instanceof Error ? err.message : err).slice(0, 120)
		};
	}
}

function classify(target: Target, entry: SnapshotEntry, prior: SnapshotEntry | undefined): Finding[] {
	if (entry.status === null || entry.status >= 400)
		return [
			{
				target,
				classification: 'UNREACHABLE',
				detail: `${entry.status === null ? (entry.error ?? 'no response') : `HTTP ${entry.status}`}${prior ? ` (was ${prior.status})` : ' (new)'}`
			}
		];
	if (!prior) return [{ target, classification: 'NEW', detail: `status ${entry.status}` }];
	const findings: Finding[] = [];
	if (prior.status !== entry.status)
		findings.push({ target, classification: 'STATUS', detail: `status ${prior.status} → ${entry.status}` });
	if (!entry.volatile && prior.hash !== entry.hash)
		findings.push({
			target,
			classification: 'CHANGED',
			detail: `hash ${prior.hash?.slice(0, 8) ?? 'none'} → ${entry.hash?.slice(0, 8) ?? 'none'}`
		});
	if (target.kind === 'watchlist' && prior.title !== entry.title)
		findings.push({
			target,
			classification: 'TITLE',
			detail: `title "${prior.title ?? 'none'}" → "${entry.title ?? 'none'}"`
		});
	return findings;
}

export async function checkSources({
	dataDir,
	update
}: {
	dataDir: string;
	update: boolean;
}): Promise<{ findings: Finding[]; snapshot: Snapshot }> {
	const targets = citedTargets(dataDir);
	watchlistTargets(dataDir, targets);
	const priorSnapshot: Snapshot = update ? {} : loadSnapshot(dataDir);
	const checkedOn = new Date().toISOString().slice(0, 10);
	const list = [...targets.values()];
	const entries = await pool(list, CONCURRENCY, (t) => fetchEntry(t, checkedOn));
	const snapshot: Snapshot = {};
	const findings: Finding[] = [];
	for (let i = 0; i < list.length; i += 1) {
		const target = list[i];
		const entry = entries[i];
		const prior = priorSnapshot[target.url];
		if (entry.status !== null && entry.hash && (!prior || prior.hash !== entry.hash)) {
			// Pages with rotating content never repeat a hash, so a second fetch
			// separates a real change from a token that changes on every request.
			const confirm = await fetchEntry(target, checkedOn);
			if (confirm.hash !== entry.hash) entry.volatile = true;
		}
		snapshot[target.url] = entry;
		findings.push(...classify(target, entry, prior));
	}
	return { findings, snapshot };
}

function report(findings: Finding[], total: number, ok: number, volatile: number): string {
	const count = (name: string) => findings.filter((f) => f.classification === name).length;
	const lines = [
		'### Sources',
		`Targets ${total} | OK ${ok} | NEW ${count('NEW')} | CHANGED ${count('CHANGED')} | STATUS ${count('STATUS')} | TITLE ${count('TITLE')} | UNREACHABLE ${count('UNREACHABLE')} | VOLATILE ${volatile}`,
		''
	];
	for (const f of findings) {
		lines.push(`#### ${f.classification} — ${f.target.label}`, '', `- URL: ${f.target.url}`, `- ${f.detail}`, '');
	}
	lines.push(findings.length === 0 ? `OK — ${ok} sources unchanged.` : `${findings.length} source(s) need review.`);
	return lines.join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	const dataDir = process.env.THC_DATA_DIR || join(process.cwd(), 'data');
	const update = process.argv.includes('--update');
	const { findings, snapshot } = await checkSources({ dataDir, update });
	if (update) {
		const path = snapshotPathFor(dataDir);
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, `${JSON.stringify(snapshot, null, 2)}\n`);
		console.log(`Snapshot updated: ${Object.keys(snapshot).length} URLs.`);
	} else {
		const total = Object.keys(snapshot).length;
		const flagged = new Set(findings.map((f) => f.target.url)).size;
		const volatile = Object.values(snapshot).filter((e) => e.volatile).length;
		console.log(report(findings, total, total - flagged, volatile));
	}
}
