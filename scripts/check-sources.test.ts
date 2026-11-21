import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkSources } from './check-sources';

let stableBody = '<html><head><title>Plan A</title></head><body>alpha</body></html>';
let goneStatus = 200;
let rotateCount = 0;

const server = createServer((req, res) => {
	if (req.url === '/stable') {
		res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
		res.end(stableBody);
	} else if (req.url === '/gone') {
		res.writeHead(goneStatus);
		res.end('gone');
	} else if (req.url === '/rotate') {
		rotateCount += 1;
		res.writeHead(200, { 'content-type': 'text/html' });
		res.end(`<html><title>Rotate</title><body>variant ${rotateCount % 2}</body></html>`);
	} else {
		res.writeHead(404);
		res.end();
	}
});

const dir = mkdtempSync(join(tmpdir(), 'thc-sources-'));
const priorEnv = process.env.THC_DATA_DIR;
process.env.THC_DATA_DIR = dir;
try {
	await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
	const address = server.address();
	assert.ok(address && typeof address !== 'string');
	const base = `http://127.0.0.1:${address.port}`;
	mkdirSync(join(dir, 'plans'), { recursive: true });
	writeFileSync(
		join(dir, 'plans', 'one.yaml'),
		`premium_source: { url: ${base}/stable, tier: official_insurer, verified_on: '2026-08-10' }\n`
	);
	writeFileSync(
		join(dir, 'source-watchlist.yaml'),
		`- url: ${base}/stable\n  label: Watch\n`
	);

	const snapPath = join(dir, 'source-snapshots.json');
	const first = await checkSources({ dataDir: dir, update: true });
	writeFileSync(snapPath, `${JSON.stringify(first.snapshot, null, 2)}\n`);
	const stable = first.snapshot[`${base}/stable`];
	assert.ok(stable);
	assert.match(stable.hash ?? '', /^[0-9a-f]{64}$/);
	assert.equal(stable.title, 'Plan A');

	stableBody = '<html><head><title>Plan B</title></head><body>beta different</body></html>';
	const second = await checkSources({ dataDir: dir, update: false });
	assert.ok(second.findings.some((f) => f.classification === 'CHANGED'));
	assert.ok(second.findings.some((f) => f.classification === 'TITLE'));

	goneStatus = 404;
	writeFileSync(join(dir, 'plans', 'two.yaml'), `source: { url: ${base}/gone }\n`);
	const third = await checkSources({ dataDir: dir, update: false });
	assert.ok(third.findings.some((f) => f.classification === 'UNREACHABLE' && f.target.url === `${base}/gone`));

	const prior = JSON.parse(readFileSync(snapPath, 'utf8'));
	prior[`${base}/rotate`] = { status: 200, hash: '0'.repeat(64), title: 'Rotate', checked_on: '2026-01-01' };
	writeFileSync(snapPath, `${JSON.stringify(prior, null, 2)}\n`);
	writeFileSync(join(dir, 'plans', 'three.yaml'), `source: { url: ${base}/rotate }\n`);
	const fourth = await checkSources({ dataDir: dir, update: false });
	assert.ok(fourth.snapshot[`${base}/rotate`].volatile);
	assert.ok(!fourth.findings.some((f) => f.classification === 'CHANGED' && f.target.url === `${base}/rotate`));

	console.log('ok — check-sources');
} finally {
	server.close();
	rmSync(dir, { recursive: true, force: true });
	if (priorEnv === undefined) delete process.env.THC_DATA_DIR;
	else process.env.THC_DATA_DIR = priorEnv;
}
