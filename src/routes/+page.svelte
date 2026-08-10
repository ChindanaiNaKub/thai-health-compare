<script lang="ts">
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import {
		cumulativePremium,
		healthPremiumAt,
		healthShare,
		hostPremiumAt,
		isEligible,
		premiumIsStale,
		yearsOfCoverFrom,
		type Sex
	} from '$lib/metrics';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// The two inputs that actually change the answer, plus sex because Thai
	// rate tables are sex-banded and a wrong figure is worse than no figure.
	let baseline = $state<'ucs' | 'sso' | 'csmbs' | 'none'>('sso');
	let age = $state(22);
	let sex = $state<Sex>('male');

	// Mirror the controls into the URL so any answer here is a link someone can
	// cite. replaceState, not push: turning a dial is not navigation and must not
	// fill the back button. The page is prerendered, so the query can only be
	// read after hydration — defaults render server-side, the URL overrides them.
	let mounted = false;
	$effect(() => {
		const next = new URLSearchParams({ มีสิทธิ: baseline, อายุ: String(age), เพศ: sex });
		if (!mounted) {
			mounted = true;
			// Read, don't write: arriving at a bare URL should leave it bare.
			const q = new URLSearchParams(location.search);
			const b = (['ucs', 'sso', 'csmbs', 'none'] as const).find((v) => v === q.get('มีสิทธิ'));
			if (b) baseline = b;
			if (Number(q.get('อายุ'))) age = Number(q.get('อายุ'));
			if (q.get('เพศ') === 'female') sex = 'female';
			return;
		}
		if (next.toString() !== page.url.searchParams.toString()) replaceState(`?${next}`, {});
	});

	// Expanded rows. Several can be open at once — closing one to read another
	// would defeat the point of putting them in a table.
	let open = $state<Record<string, boolean>>({});

	// The build date, not the reader's clock — a clock the reader can change.
	const builtOn = $derived(new Date(data.builtOn));

	const scheme = $derived(data.schemes.find((s) => s.id === baseline) ?? null);

	const rows = $derived(
		data.plans
			.filter((p) => isEligible(p, age))
			.map((p) => ({
				plan: p,
				stale: premiumIsStale(p.verified_on, builtOn),
				annualHealth: healthPremiumAt(p, age, sex),
				annualHost: hostPremiumAt(p, age, sex),
				share: healthShare(p, age, sex),
				lifetime: cumulativePremium(p, age, sex),
				years: yearsOfCoverFrom(p, age)
			}))
	);

	const baht = new Intl.NumberFormat('th-TH', { maximumFractionDigits: 0 });
</script>

<svelte:head>
	<title>เทียบประกันสุขภาพไทย — ข้อเท็จจริง ไม่ใช่โฆษณา</title>
	<meta
		name="description"
		content="เปรียบเทียบประกันสุขภาพในไทยจากข้อมูลที่อ้างอิงได้ เริ่มจากสิทธิที่คุณมีอยู่แล้ว ไม่มีลิงก์แนะนำ ไม่ขายของ"
	/>
</svelte:head>

<h1 class="text-xl font-bold tracking-tight">คุณมีสิทธิอะไรอยู่แล้ว?</h1>
<p class="text-muted mt-1 max-w-2xl text-sm">
	ประกันเอกชนคือส่วนที่เพิ่มจากสิทธิเดิม ไม่ได้มาแทนที่สิทธิเดิม
</p>

<form class="border-rule bg-surface mt-4 grid gap-4 border p-4 sm:grid-cols-3">
	<label class="grid gap-1.5">
		<span class="label">สิทธิที่มีอยู่</span>
		<select bind:value={baseline} class="control border-border bg-bg border px-3 py-2 text-sm">
			<option value="sso">ประกันสังคม</option>
			<option value="ucs">บัตรทอง</option>
			<option value="csmbs">สิทธิข้าราชการ</option>
			<option value="none">ไม่มี / ไม่แน่ใจ</option>
		</select>
	</label>

	<label class="grid gap-1.5">
		<span class="label">อายุ</span>
		<input
			type="number"
			bind:value={age}
			min="0"
			max="80"
			class="control border-border bg-bg tnum border px-3 py-2 text-sm"
		/>
		<!-- The number is the answer; the slider is how you look around. Dragging
		     it moves every figure in the table 1:1, which is the only way to see
		     that a premium curve is a curve and not a price. -->
		<input
			type="range"
			bind:value={age}
			min="0"
			max="80"
			aria-label="อายุ (เลื่อนเพื่อดูเบี้ยตามอายุ)"
			class="age-range w-full"
		/>
	</label>

	<label class="grid gap-1.5">
		<span class="label">เพศตามตารางเบี้ย</span>
		<select bind:value={sex} class="control border-border bg-bg border px-3 py-2 text-sm">
			<option value="male">ชาย</option>
			<option value="female">หญิง</option>
		</select>
	</label>
</form>

{#if scheme}
	<!-- Keyed on the scheme so switching baseline replaces the block rather than
	     mutating it in place — which is what lets it fade instead of teleport. -->
	{#key scheme.id}
	<section class="swap border-rule bg-surface mt-4 border p-4">
		<div class="flex flex-wrap items-baseline gap-x-3">
			<h2 class="label !text-accent">ฐานที่คุณมีอยู่</h2>
			<p class="font-semibold">{scheme.name.th}</p>
		</div>
		<div class="mt-3 grid gap-5 sm:grid-cols-2">
			<div>
				<h3 class="label">ครอบคลุมอยู่แล้ว</h3>
				<ul class="mt-1.5 space-y-1 text-sm">
					{#each scheme.covers as item (item.th)}
						<li class="flex gap-2">
							<span class="text-accent font-mono select-none">+</span>{item.th}
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<h3 class="label">ช่องว่างที่เหลือ</h3>
				<ul class="mt-1.5 space-y-1 text-sm">
					{#each scheme.gaps as item (item.th)}
						<li class="flex gap-2">
							<span class="text-host font-mono select-none">−</span>{item.th}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>
	{/key}
{/if}

<div class="border-rule mt-10 flex flex-wrap items-baseline justify-between gap-2 border-b pb-2">
	<h2 class="text-xl font-bold tracking-tight">แผนที่ซื้อเพิ่มได้</h2>
	<span class="label">{rows.length} รายการ / เรียงตามชื่อบริษัท / ไม่ได้จัดอันดับ</span>
</div>
<p class="text-muted mt-2 text-sm">อยู่ในรายการนี้ไม่ได้แปลว่าแนะนำ</p>

<!-- Scrolls sideways only below md. Above it the table fits, and dropping the
     scroll container is what lets the sticky thead actually stick — an
     overflow-x container clips sticky-top in both axes. Below md the thead is
     sr-only anyway, so nothing is lost. -->
<div class="mt-4 max-md:overflow-x-auto">
	<table class="plans border-rule w-full border-collapse border text-sm">
		<thead class="head sticky top-0 z-10">
			<tr class="border-rule border-b-2">
				<th class="label px-3 py-2 text-left">แผน</th>
				<!-- The signature column: the whole argument, six bars deep. -->
				<th class="label w-[34%] px-3 py-2 text-left">เงินที่เป็นค่าสุขภาพจริง</th>
				<th class="label px-3 py-2 text-right">เบี้ยปีแรก</th>
				<th class="label px-3 py-2 text-right">จ่ายรวมตลอดสัญญา</th>
				<th class="w-10 px-3 py-2"><span class="sr-only">รายละเอียด</span></th>
			</tr>
		</thead>

		{#each rows as row (row.plan.id)}
			{@const id = row.plan.id}
			{@const withheld = row.stale || row.plan.premium === null || row.annualHealth === null}
			<tbody class="border-border border-b">
				<tr class="row">
					<td class="px-3 py-3 align-top">
						<div class="font-semibold">{row.plan.name.th}</div>
						<div class="label mt-0.5">{row.plan.insurer.th}</div>
						<div class="text-muted mt-1 font-mono text-[0.6875rem]">
							{row.plan.type === 'rider' ? 'RIDER — ต้องซื้อสัญญาหลักด้วย' : 'STANDALONE — ซื้อเดี่ยวได้'}
						</div>
					</td>

					<td class="px-3 py-3 align-top">
						<span class="label cell-label">เงินที่เป็นค่าสุขภาพจริง</span>
						{#if row.stale}
							<p class="text-warn-ink bg-warn-bg border-host border-l-4 px-2 py-1.5 text-xs">
								ไม่ได้ตรวจเบี้ยเกิน 18 เดือน จึงซ่อนตัวเลข (ตรวจล่าสุด {row.plan.verified_on})
							</p>
						{:else if row.plan.premium === null}
							<p class="text-warn-ink bg-warn-bg border-host border-l-4 px-2 py-1.5 text-xs">
								บริษัทไม่ประกาศเบี้ยที่ผูกกับอายุ {row.plan.premium_unknown_reason}
							</p>
						{:else if row.annualHealth === null}
							<p class="text-muted text-xs">ไม่มีตารางเบี้ยสำหรับอายุนี้</p>
						{:else if row.share !== null && row.annualHost !== null}
							<figure>
								<div class="border-border flex h-6 overflow-hidden border" role="presentation">
									<div class="bg-accent split" style="width: {row.share * 100}%"></div>
									<div class="bg-host flex-1"></div>
								</div>
								<figcaption class="mt-1 flex flex-wrap justify-between gap-x-3">
									<span class="label !text-accent"
										>สุขภาพ {Math.round(row.share * 100)}% · {baht.format(row.annualHealth)} ฿</span
									>
									<span class="label !text-host"
										>สัญญาหลัก {100 - Math.round(row.share * 100)}% · {baht.format(
											row.annualHost
										)} ฿</span
									>
								</figcaption>
							</figure>
						{:else if row.share === 1}
							<!-- Standalone: nothing to split, so no bar. Saying so beats a full bar
							     that would read as a score. -->
							<p class="text-muted text-xs">ซื้อเดี่ยวได้ ไม่มีเบี้ยสัญญาหลักมาหาร เป็นค่าสุขภาพเต็ม 100%</p>
						{:else}
							<p class="text-muted text-xs">บริษัทไม่เปิดเผยเบี้ยสัญญาหลัก จึงแยกส่วนไม่ได้</p>
						{/if}
					</td>

					<td class="px-3 py-3 text-right align-top">
						<span class="label cell-label">เบี้ยปีแรก</span>
						{#if withheld}
							<span class="text-muted font-mono">—</span>
						{:else}
							<span class="tnum text-lg font-semibold"
								>{baht.format((row.annualHealth ?? 0) + (row.annualHost ?? 0))}</span
							><span class="text-muted ml-1 text-xs">฿</span>
							<!-- A rider whose host premium is unpublished has no total. Printing the
							     health figure alone as "เบี้ยปีแรก" understates the cheque, which is
							     the exact error this site exists to correct. Mark it as a floor. -->
							{#if row.plan.type === 'rider' && row.annualHost === null}
								<p class="text-muted mt-0.5 text-xs">ยังไม่รวมสัญญาหลัก · จ่ายจริงมากกว่านี้</p>
							{/if}
						{/if}
					</td>

					<td class="px-3 py-3 text-right align-top">
						<span class="label cell-label">จ่ายรวมตลอดสัญญา</span>
						{#if withheld || row.lifetime === null}
							<!-- A withheld figure must never be typeset like a figure. -->
							<span class="text-muted font-mono">—</span>
							{#if row.lifetime === null}
								<p class="text-muted mt-1 text-xs">{row.plan.renewal_ceiling_unknown_reason}</p>
							{/if}
						{:else}
							<span class="tnum text-lg font-semibold">{baht.format(row.lifetime.total_thb)}</span
							><span class="text-muted ml-1 text-xs">฿</span>
							<p class="text-muted mt-0.5 text-xs">
								ถึงอายุ {row.plan.renewal_ceiling_age} ({row.years} ปี){row.lifetime.incomplete
									? ' · บางช่วงอายุไม่มีข้อมูล'
									: ''}{row.plan.type === 'rider' && row.lifetime.host_thb === 0
									? ' · ยังไม่รวมสัญญาหลัก'
									: ''}
							</p>
						{/if}
					</td>

					<td class="px-3 py-3 align-top">
						<button
							type="button"
							class="toggle border-border text-muted hover:text-ink block border px-2 py-1 font-mono text-sm"
							aria-expanded={!!open[id]}
							aria-controls="d-{id}"
							onclick={() => (open[id] = !open[id])}
						>
							<span class="glyph block">+</span>
							<span class="sr-only">รายละเอียดและแหล่งข้อมูล {row.plan.name.th}</span>
						</button>
					</td>
				</tr>

				<tr>
					<td colspan="5" class="p-0">
						<div class="detail" data-open={open[id] ? '' : undefined} id="d-{id}">
							<div class="overflow-hidden">
								<dl class="text-muted grid gap-x-8 px-3 py-3 text-sm sm:grid-cols-2">
									<div class="border-border flex justify-between gap-2 border-b py-1.5">
										<dt>ต่ออายุถึงอายุ</dt>
										<dd class="text-ink tnum">
											{row.plan.renewal_ceiling_age === null
												? 'ไม่ประกาศ'
												: `${row.plan.renewal_ceiling_age} ปี`}
										</dd>
									</div>
									<div class="border-border flex justify-between gap-2 border-b py-1.5">
										<dt>
											วงเงินผู้ป่วยใน{row.plan.ipd_limit_basis === 'per_confinement'
												? '/การเข้าพักแต่ละครั้ง'
												: '/ปี'}
										</dt>
										<dd class="text-ink tnum">
											{row.plan.ipd_annual_limit_thb === null
												? '—'
												: `${baht.format(row.plan.ipd_annual_limit_thb)} บาท`}
										</dd>
									</div>
									<div class="border-border flex justify-between gap-2 border-b py-1.5">
										<dt>ความรับผิดส่วนแรก</dt>
										<dd class="text-ink tnum">
											{row.plan.deductible_thb === 0
												? 'ไม่มี'
												: `${baht.format(row.plan.deductible_thb)} บาท`}
										</dd>
									</div>
									<div class="border-border flex justify-between gap-2 border-b py-1.5">
										<dt>มาตรฐานประกันสุขภาพแบบใหม่</dt>
										<dd class="text-ink">{row.plan.new_health_standard ? 'ใช่' : 'ไม่ใช่'}</dd>
									</div>
								</dl>

								{#if row.plan.host_policy}
									<div class="text-muted space-y-1 px-3 pb-3 text-xs">
										<p>
											สัญญาหลักที่ต้องซื้อพ่วง: {row.plan.host_policy.name.th}{#if row.plan.host_policy.min_sum_insured_thb !== null}
												· ทุนประกันขั้นต่ำ {baht.format(
													row.plan.host_policy.min_sum_insured_thb
												)} บาท{/if}
											· <a class="text-accent underline underline-offset-2" href={row.plan.host_policy.source.url}
												>แหล่งข้อมูล</a
											>
										</p>
										{#if row.annualHost !== null && !withheld}
											<p>
												{baht.format(row.annualHost)} บาทคือ<strong>ราคาพื้น</strong> ไม่ใช่ใบเสนอราคา
												ถูกกว่านี้ซื้อไม่ได้ แต่ตัวแทนเสนอสัญญาหลักที่แพงกว่านี้ได้เสมอ
											</p>
										{/if}
										{#if row.plan.host_policy.premium_unknown_reason}
											<p>{row.plan.host_policy.premium_unknown_reason}</p>
										{/if}
									</div>
								{/if}

								{#if row.plan.copay_on_renewal}
									<p class="text-muted px-3 pb-3 text-xs">{row.plan.copay_on_renewal}</p>
								{/if}

								{#if row.lifetime !== null && !withheld}
									<p class="text-muted px-3 pb-3 text-xs">
										ยอดรวมคิดจากเบี้ยปัจจุบัน ซึ่งบริษัทปรับขึ้นทั้งพอร์ตได้
									</p>
								{/if}

								<!-- Provenance is not fine print: it is why the record is believable. -->
								<div
									class="border-border text-muted bg-bg/40 border-t px-3 py-2.5 font-mono text-xs"
								>
									เบี้ย: <a
										class="text-accent underline underline-offset-2"
										href={row.plan.premium_source.url}>แหล่งข้อมูล</a
									>
									({row.plan.premium_source.tier === 'agent_site'
										? 'เว็บตัวแทน น่าเชื่อถือรองลงมา'
										: 'ทางการ'})
									· เงื่อนไข:
									<a class="text-accent underline underline-offset-2" href={row.plan.terms_source.url}
										>กรมธรรม์</a
									>
									· ตรวจล่าสุด {row.plan.verified_on}
								</div>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		{/each}
	</table>
</div>

<style>
	/* The only motion on the page. Everything else is instrumentation and should
	   feel like it was already there. grid-template-rows animates to content
	   height without measuring anything in JS. */
	.detail {
		display: grid;
		grid-template-rows: 0fr;
		/* The one case where a size property is the right thing to animate: an
		   accordion has no transform equivalent that keeps the row below honest. */
		transition: grid-template-rows 200ms var(--ease-out);
	}

	.detail[data-open] {
		grid-template-rows: 1fr;
	}

	/* Hover is the only affordance saying a row does anything. Gate it: on touch
	   it fires on tap and reads as a stuck selection. */
	@media (hover: hover) and (pointer: fine) {
		.row {
			transition: background-color 120ms ease;
		}

		.row:hover {
			background-color: color-mix(in oklch, var(--color-accent) 6%, transparent);
		}
	}

	.toggle {
		transition: transform 140ms var(--ease-out);
	}

	/* The glyph swapped from + to − in one frame while the panel below it took
	   200ms to open. Rotating the same + into an × ties the affordance to the
	   thing it controls, on the same curve and the same duration. */
	.glyph {
		transition: transform 200ms var(--ease-out);
	}

	.toggle[aria-expanded='true'] .glyph {
		transform: rotate(45deg);
	}

	/* Changing baseline swaps a whole block of prose. Opacity only: this is text
	   the reader is about to read, so it may fade but it must not travel. */
	.swap {
		opacity: 1;
		transition: opacity 150ms var(--ease-out);
	}

	@starting-style {
		.swap {
			opacity: 0;
		}
	}

	/* The page's primary controls were completely inert. A border that answers
	   the pointer is the least this can do. */
	@media (hover: hover) and (pointer: fine) {
		.control {
			transition: border-color 120ms ease;
		}

		.control:hover {
			border-color: var(--color-rule);
		}
	}

	/* The signature bar is a comparison, so it must be watchable while the age
	   dial moves. Width is the argument; let it travel instead of teleport. */
	.split {
		transition: width 220ms var(--ease-out);
	}

	/* Rows scroll under the header rather than being clipped by an opaque strip. */
	.head {
		background: color-mix(in oklch, var(--color-bg) 82%, transparent);
		backdrop-filter: blur(12px) saturate(160%);
	}

	@media (prefers-reduced-transparency: reduce) {
		.head {
			background: var(--color-bg);
			backdrop-filter: none;
		}
	}

	/* Dragging age is the one continuous gesture here — give it a real target. */
	.age-range {
		accent-color: var(--color-accent);
		height: 1.25rem;
	}

	.toggle:active {
		transform: scale(0.94);
	}

	/* Column headers carry the labels on desktop, so the per-cell ones are
	   redundant there. */
	.cell-label {
		display: none;
	}

	/* Below this width the columns stop being comparable and the table becomes
	   the record-per-block layout it replaced. */
	@media (max-width: 767px) {
		.plans thead {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
		}

		.plans tbody {
			display: block;
			border-bottom-width: 2px;
		}

		.plans tr {
			display: block;
		}

		.plans td {
			display: block;
			width: auto;
			text-align: left;
		}

		.cell-label {
			display: block;
			margin-bottom: 0.25rem;
		}

		.plans .row td:not(:first-child) {
			padding-top: 0;
		}
	}
</style>
