<script lang="ts">
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

<h1 class="text-2xl font-semibold">คุณมีสิทธิอะไรอยู่แล้ว?</h1>
<p class="text-muted mt-2 max-w-2xl">
	ก่อนดูว่าจะซื้ออะไร ต้องรู้ก่อนว่าคุณได้อะไรฟรีอยู่แล้ว
	ประกันเอกชนคือส่วนที่เพิ่มจากสิทธิเดิม ไม่ใช่ตัวแทนสิทธิเดิม
</p>

<form class="mt-6 grid gap-4 sm:grid-cols-3">
	<label class="grid gap-1 text-sm">
		<span class="font-medium">สิทธิที่มีอยู่</span>
		<select bind:value={baseline} class="border-border bg-surface rounded-md border px-3 py-2">
			<option value="sso">ประกันสังคม</option>
			<option value="ucs">บัตรทอง</option>
			<option value="csmbs">สิทธิข้าราชการ</option>
			<option value="none">ไม่มี / ไม่แน่ใจ</option>
		</select>
	</label>

	<label class="grid gap-1 text-sm">
		<span class="font-medium">อายุ</span>
		<input
			type="number"
			bind:value={age}
			min="0"
			max="80"
			class="border-border bg-surface rounded-md border px-3 py-2"
		/>
	</label>

	<label class="grid gap-1 text-sm">
		<span class="font-medium">เพศตามตารางเบี้ย</span>
		<select bind:value={sex} class="border-border bg-surface rounded-md border px-3 py-2">
			<option value="male">ชาย</option>
			<option value="female">หญิง</option>
		</select>
	</label>
</form>

{#if scheme}
	<section class="border-border bg-surface mt-6 rounded-lg border p-4">
		<h2 class="font-semibold">{scheme.name.th}</h2>
		<div class="mt-3 grid gap-4 sm:grid-cols-2">
			<div>
				<h3 class="text-muted text-sm font-medium">ครอบคลุมอยู่แล้ว</h3>
				<ul class="mt-1 list-disc pl-5 text-sm">
					{#each scheme.covers as item (item.th)}<li>{item.th}</li>{/each}
				</ul>
			</div>
			<div>
				<h3 class="text-muted text-sm font-medium">ช่องว่างที่เหลือ</h3>
				<ul class="mt-1 list-disc pl-5 text-sm">
					{#each scheme.gaps as item (item.th)}<li>{item.th}</li>{/each}
				</ul>
			</div>
		</div>
	</section>
{/if}

<h2 class="mt-10 text-xl font-semibold">แผนที่ซื้อเพิ่มได้ ({rows.length})</h2>
<p class="text-muted mt-1 text-sm">
	เรียงตามชื่อบริษัท ไม่ได้จัดอันดับ การมีอยู่ในรายการไม่ใช่การแนะนำ
</p>

<div class="mt-4 grid gap-4">
	{#each rows as row (row.plan.id)}
		<article class="border-border bg-surface rounded-lg border p-4">
			<header class="flex flex-wrap items-baseline justify-between gap-2">
				<div>
					<h3 class="font-semibold">{row.plan.name.th}</h3>
					<p class="text-muted text-sm">{row.plan.insurer.th}</p>
				</div>
				<span class="border-border rounded-full border px-2 py-0.5 text-xs">
					{row.plan.type === 'rider' ? 'สัญญาเพิ่มเติม — ต้องซื้อสัญญาหลักด้วย' : 'ซื้อเดี่ยวได้'}
				</span>
			</header>

			{#if row.stale}
				<p class="bg-warn-bg text-warn-ink mt-3 rounded-md px-3 py-2 text-sm">
					ยังไม่ได้ตรวจสอบเบี้ยประกันเกิน 18 เดือน จึงซ่อนตัวเลขไว้
					ข้อมูลความคุ้มครองด้านล่างยังใช้อ้างอิงได้ (ตรวจล่าสุด {row.plan.verified_on})
				</p>
			{:else if row.annualHealth === null}
				<p class="text-muted mt-3 text-sm">ไม่มีตารางเบี้ยสำหรับอายุนี้</p>
			{:else}
				<dl class="mt-4 grid gap-3 sm:grid-cols-3">
					<div>
						<dt class="text-muted text-xs">เบี้ยปีแรก</dt>
						<dd class="text-lg font-semibold">
							{baht.format(row.annualHealth + (row.annualHost ?? 0))} บาท
						</dd>
						{#if row.annualHost !== null}
							<dd class="text-muted text-xs">
								สุขภาพ {baht.format(row.annualHealth)} + สัญญาหลัก {baht.format(row.annualHost)}
							</dd>
						{/if}
					</div>

					<div>
						<dt class="text-muted text-xs">
							จ่ายรวมถึงอายุ {row.plan.renewal_ceiling_age} ({row.years} ปี)
						</dt>
						<dd class="text-lg font-semibold">{baht.format(row.lifetime.total_thb)} บาท</dd>
						<dd class="text-muted text-xs">
							คิดจากเบี้ยปัจจุบัน บริษัทปรับเบี้ยทั้งพอร์ตได้{row.lifetime.incomplete
								? ' · บางช่วงอายุไม่มีข้อมูล'
								: ''}
						</dd>
					</div>

					<div>
						<dt class="text-muted text-xs">เงินที่เป็นค่าสุขภาพจริง</dt>
						<dd class="text-lg font-semibold">
							{row.share === null ? 'ไม่เปิดเผย' : `${Math.round(row.share * 100)}%`}
						</dd>
						{#if row.plan.type === 'rider'}
							<dd class="text-muted text-xs">ส่วนที่เหลือคือประกันชีวิตที่ต้องซื้อพ่วง</dd>
						{/if}
						{#if row.plan.host_policy}
							<dd class="text-muted mt-1 text-xs">
								สัญญาหลักที่ต้องซื้อพ่วง: {row.plan.host_policy.name.th}{#if row.plan.host_policy.min_sum_insured_thb !== null}
									· ทุนประกันขั้นต่ำ {baht.format(row.plan.host_policy.min_sum_insured_thb)} บาท{/if}
								· <a class="underline" href={row.plan.host_policy.source.url}>แหล่งข้อมูล</a>
							</dd>
							{#if row.annualHost !== null}
								<dd class="text-muted mt-1 text-xs">
									{baht.format(row.annualHost)} บาทคือ<strong>ราคาพื้น</strong> ไม่ใช่ใบเสนอราคา —
									ถูกกว่านี้ซื้อไม่ได้ แต่ตัวแทนเสนอสัญญาหลักที่แพงกว่านี้ได้เสมอ
								</dd>
							{/if}
							{#if row.plan.host_policy.premium_unknown_reason}
								<dd class="text-muted mt-1 text-xs">
									{row.plan.host_policy.premium_unknown_reason}
								</dd>
							{/if}
						{/if}
					</div>
				</dl>
			{/if}

			<dl class="border-border text-muted mt-4 grid gap-x-6 gap-y-1 border-t pt-3 text-sm sm:grid-cols-2">
				<div class="flex justify-between gap-2">
					<dt>ต่ออายุถึงอายุ</dt>
					<dd class="text-ink">{row.plan.renewal_ceiling_age} ปี</dd>
				</div>
				<div class="flex justify-between gap-2">
					<dt>
						วงเงินผู้ป่วยใน{row.plan.ipd_limit_basis === 'per_confinement'
							? '/การเข้าพักแต่ละครั้ง'
							: '/ปี'}
					</dt>
					<dd class="text-ink">
						{row.plan.ipd_annual_limit_thb === null
							? '—'
							: `${baht.format(row.plan.ipd_annual_limit_thb)} บาท`}
					</dd>
				</div>
				<div class="flex justify-between gap-2">
					<dt>ความรับผิดส่วนแรก</dt>
					<dd class="text-ink">
						{row.plan.deductible_thb === 0 ? 'ไม่มี' : `${baht.format(row.plan.deductible_thb)} บาท`}
					</dd>
				</div>
				<div class="flex justify-between gap-2">
					<dt>มาตรฐานประกันสุขภาพแบบใหม่</dt>
					<dd class="text-ink">{row.plan.new_health_standard ? 'ใช่' : 'ไม่ใช่'}</dd>
				</div>
			</dl>

			{#if row.plan.copay_on_renewal}
				<p class="text-muted mt-3 text-xs">{row.plan.copay_on_renewal}</p>
			{/if}

			<footer class="text-muted mt-3 text-xs">
				เบี้ย: <a class="underline" href={row.plan.premium_source.url}>แหล่งข้อมูล</a>
				({row.plan.premium_source.tier === 'agent_site' ? 'เว็บตัวแทน — ความน่าเชื่อถือรองลงมา' : 'ทางการ'})
				· เงื่อนไข: <a class="underline" href={row.plan.terms_source.url}>กรมธรรม์</a>
				· ตรวจล่าสุด {row.plan.verified_on}
			</footer>
		</article>
	{/each}
</div>
