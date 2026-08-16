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
		renewalCeilingAt,
		renewalKindAt,
		yearsOfCoverFrom,
		type Sex
	} from '$lib/metrics';
	import type { Plan } from '$lib/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Never manufacture a reader. Age and the sex used in an insurer's rate table
	// change the premium; an invented value is worse than a blank one. Entitlement
	// is separate: "none" is a meaningful answer, while "unknown" means we have
	// not been told yet.
	type Baseline = 'unknown' | 'ucs' | 'sso' | 'csmbs' | 'none';
	let baseline = $state<Baseline>('unknown');
	let age = $state<number | null>(null);
	let sex = $state<Sex | null>(null);
	const PROFILE_STORAGE_KEY = 'thai-health-compare.profile.v1';
	let profileHydrated = $state(false);

	type StoredProfile = { baseline: Baseline; age: number | null; sex: Sex | null };

	function readStoredProfile(): StoredProfile | null {
		try {
			const value: unknown = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) ?? 'null');
			if (!value || typeof value !== 'object') return null;
			const profile = value as Partial<StoredProfile>;
			const validBaseline = ['unknown', 'ucs', 'sso', 'csmbs', 'none'].includes(profile.baseline ?? '')
				? (profile.baseline as Baseline)
				: 'unknown';
			const validAge =
				typeof profile.age === 'number' && Number.isInteger(profile.age) && profile.age >= 0 && profile.age <= 80
					? profile.age
					: null;
			const validSex = profile.sex === 'male' || profile.sex === 'female' ? profile.sex : null;
			return { baseline: validBaseline, age: validAge, sex: validSex };
		} catch {
			// Private browsing or corrupted storage must leave the catalogue usable.
			return null;
		}
	}

	function saveProfile(profile: StoredProfile) {
		try {
			localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
		} catch {
			// Storage can be unavailable; this is convenience, never a requirement.
		}
	}

	// How the reader narrows 33 records down to the handful they can actually
	// buy. Sorting is not ranking: the reader picks a column, the site never
	// picks one for them, and no plan is ever scored against another.
	type Kind = 'all' | 'standalone' | 'rider';
	type Sort = 'premium' | 'lifetime' | 'ipd' | 'insurer';
	type Category = Plan['category'];
	const CATEGORY_LABEL: Record<Category, string> = {
		medical_expense: 'ค่ารักษาพยาบาล',
		critical_illness: 'โรคร้ายแรง',
		cancer: 'มะเร็ง',
		dental: 'ทันตกรรม',
		maternity: 'คลอดบุตร',
		mental_health: 'สุขภาพจิต',
		visa_expat: 'วีซ่า / ชาวต่างชาติ',
		group: 'กลุ่ม / นายจ้าง'
	};
	const CATEGORIES = Object.keys(CATEGORY_LABEL) as Category[];
	let category = $state<Category>('medical_expense');
	let kind = $state<Kind>('all');
	let sort = $state<Sort>('premium');
	let pricedOnly = $state(false);

	// Mirror the controls into the URL so any answer here is a link someone can
	// cite. replaceState, not push: turning a dial is not navigation and must not
	// fill the back button. The page is prerendered, so the query can only be
	// read after hydration — defaults render server-side, the URL overrides them.
	let mounted = false;
	$effect(() => {
		const next = new URLSearchParams({ หมวด: category, แบบ: kind, เรียง: sort });
		if (baseline !== 'unknown') next.set('มีสิทธิ', baseline);
		if (age !== null) next.set('อายุ', String(age));
		if (sex !== null) next.set('เพศ', sex);
		if (pricedOnly) next.set('เฉพาะที่มีราคา', '1');
		if (!mounted) {
			mounted = true;
			// A shared URL is authoritative; otherwise restore this browser's last
			// profile before rendering a personalised comparison.
			const q = new URLSearchParams(location.search);
			const hasProfileInUrl = q.has('มีสิทธิ') || q.has('อายุ') || q.has('เพศ');
			if (hasProfileInUrl) {
				const b = (['ucs', 'sso', 'csmbs', 'none'] as const).find((v) => v === q.get('มีสิทธิ'));
				if (b) baseline = b;
				const queryAge = Number(q.get('อายุ'));
				if (Number.isInteger(queryAge) && queryAge >= 0 && queryAge <= 80) age = queryAge;
				const querySex = q.get('เพศ');
				if (querySex === 'male' || querySex === 'female') sex = querySex;
			} else {
				const saved = readStoredProfile();
				if (saved) ({ baseline, age, sex } = saved);
			}
			const c = CATEGORIES.find((v) => v === q.get('หมวด'));
			if (c) category = c;
			const k = (['all', 'standalone', 'rider'] as const).find((v) => v === q.get('แบบ'));
			if (k) kind = k;
			const s = (['premium', 'lifetime', 'ipd', 'insurer'] as const).find((v) => v === q.get('เรียง'));
			if (s) sort = s;
			if (q.get('เฉพาะที่มีราคา') === '1') pricedOnly = true;
			profileHydrated = true;
			return;
		}
		if (next.toString() !== page.url.searchParams.toString()) replaceState(`?${next}`, {});
	});

	// Expanded rows. Several can be open at once — closing one to read another
	// would defeat the point of putting them in a table.
	let open = $state<Record<string, boolean>>({});

	// The public schemes carry long, carefully-sourced bullets, and on a phone all
	// of them together are a screen and a half of reading standing between the
	// reader and the plans. Two per column is enough to establish what the block
	// is; the rest is there for whoever wants it.
	const SCHEME_CAP = 2;
	let showAllScheme = $state(false);

	// The build date, not the reader's clock — a clock the reader can change.
	const builtOn = $derived(new Date(data.builtOn));

	const hasPricingProfile = $derived(age !== null && sex !== null);
	const scheme = $derived(baseline === 'unknown' ? null : (data.schemes.find((s) => s.id === baseline) ?? null));

	// Kept locally for return visits. The key deliberately holds only the three
	// values the controls need; there is no account, backend, or analytics call.
	$effect(() => {
		if (profileHydrated) saveProfile({ baseline, age, sex });
	});

	// A price-only filter without a rate profile would hide every record, which
	// reads like an empty catalogue rather than an unfinished setting.
	$effect(() => {
		if (!hasPricingProfile && pricedOnly) pricedOnly = false;
	});

	const categoryPlans = $derived(data.plans.filter((p) => p.category === category));
	const insurerCount = $derived(new Set(categoryPlans.map((p) => p.insurer.th)).size);

	// Every plan the reader's age lets them buy, costed. Filtering and sorting
	// happen downstream so the chip counts can be taken from here — a filter
	// that hides its own count is a filter you have to click to understand.
	const priced = $derived(
		categoryPlans
			.filter((p) => age === null || isEligible(p, age))
			.map((p) => {
				const stale = premiumIsStale(p.verified_on, builtOn);
				const annualHealth = age !== null && sex !== null ? healthPremiumAt(p, age, sex) : null;
				const annualHost = age !== null && sex !== null ? hostPremiumAt(p, age, sex) : null;
				const withheld = stale || p.premium === null || annualHealth === null;
				return {
					plan: p,
					stale,
					annualHealth,
					annualHost,
					withheld,
					// The cheque the reader actually writes in year one, or null when we
					// refuse to print one. Null is never coerced to 0 — that is the lie
					// this whole site exists to stop telling.
					firstYear: withheld ? null : (annualHealth ?? 0) + (annualHost ?? 0),
					share: age !== null && sex !== null ? healthShare(p, age, sex) : null,
					lifetime: age !== null && sex !== null ? cumulativePremium(p, age, sex) : null,
					years: age === null ? null : yearsOfCoverFrom(p, age),
					renewalKind: age === null ? null : renewalKindAt(p, age),
					renewalCeiling: age === null ? null : renewalCeilingAt(p, age)
				};
			})
	);

	type Row = (typeof priced)[number];

	const counts = $derived({
		all: priced.length,
		standalone: priced.filter((r) => r.plan.type === 'standalone').length,
		rider: priced.filter((r) => r.plan.type === 'rider').length
	});

	function sortValue(r: Row, mode: Sort): number | null {
		if (mode === 'premium') return r.firstYear;
		if (mode === 'lifetime') return r.withheld ? null : (r.lifetime?.total_thb ?? null);
		if (mode === 'ipd') return r.plan.ipd_annual_limit_thb;
		return null;
	}

	const rows = $derived(
		priced
			.filter((r) => kind === 'all' || r.plan.type === kind)
			.filter((r) => !pricedOnly || r.firstYear !== null)
			.slice()
			.sort((a, b) => {
				const [x, y] = [sortValue(a, sort), sortValue(b, sort)];
				// A withheld figure sorts last in every direction. Ordering an unknown
				// as if it were zero would put the least-documented plans on top.
				if (x === null && y === null) return a.plan.insurer.th.localeCompare(b.plan.insurer.th, 'th');
				if (x === null) return 1;
				if (y === null) return -1;
				// Money ascending (cheapest first is what you came to see); coverage
				// descending (a bigger ceiling is the thing being measured).
				return sort === 'ipd' ? y - x : x - y;
			})
	);

	// The two-second answer: how many, and how much, before any scrolling.
	const span = $derived.by(() => {
		const known = rows.map((r) => r.firstYear).filter((n): n is number => n !== null);
		return known.length ? { low: Math.min(...known), high: Math.max(...known) } : null;
	});

	const baht = new Intl.NumberFormat('th-TH', { maximumFractionDigits: 0 });

	const SHAPE: Record<string, string> = {
		lump_sum: 'เหมาจ่าย',
		per_item_schedule: 'จ่ายตามรายการ',
		deductible_first: 'มีส่วนแรกที่ต้องจ่ายเอง',
		opd_inclusive: 'รวมผู้ป่วยนอก'
	};

	/**
	 * Nine digits of baht in a table column is unreadable, and a reader comparing
	 * 120,000,000 against 500,000 is counting commas. Thai counts in หมื่น / แสน /
	 * ล้าน, and it steps at each one: 270,000 is 2.7 แสน, never 27 หมื่น.
	 */
	function compactBaht(n: number): string {
		const step = (unit: number, word: string) => {
			const v = n / unit;
			return `${v % 1 === 0 ? v : v.toFixed(1)} ${word}`;
		};
		if (n >= 1_000_000) return step(1_000_000, 'ล้าน');
		if (n >= 100_000) return step(100_000, 'แสน');
		if (n >= 10_000) return step(10_000, 'หมื่น');
		return baht.format(n);
	}
</script>

<svelte:head>
	<title>เทียบประกันสุขภาพไทย — ข้อเท็จจริง ไม่ใช่โฆษณา</title>
	<meta
		name="description"
		content="เปรียบเทียบประกันสุขภาพในไทยจากข้อมูลที่อ้างอิงได้ เริ่มจากสิทธิที่คุณมีอยู่แล้ว ไม่มีลิงก์แนะนำ ไม่ขายของ"
	/>
</svelte:head>

<!-- The two-second block. A reader who leaves after this line should still know
     what the site claims and why it is not trying to sell them anything. -->
<section class="max-w-3xl">
	<h1 class="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
		ประกันสุขภาพส่วนใหญ่ในไทย <span class="text-host-ink">บังคับให้ซื้อประกันชีวิตพ่วง</span>
	</h1>
	<p class="mt-3 text-base">
		เว็บนี้แยกให้เห็นว่าเงินที่คุณจ่ายทั้งหมด <span class="text-accent font-semibold"
			>เป็นค่าสุขภาพจริงกี่บาท</span
		> และตลอดสัญญาต้องจ่ายรวมเท่าไหร่
	</p>
	<ul class="mt-4 flex flex-wrap gap-2">
		<li class="chip chip-neutral">{categoryPlans.length} แผนในหมวดนี้ · {insurerCount} บริษัท</li>
		<li class="chip chip-neutral">ทุกตัวเลขมีลิงก์ต้นทาง</li>
		<li class="chip chip-neutral">ไม่ขายของ ไม่มีนายหน้า</li>
	</ul>
	<p class="text-muted mt-3 text-sm">
		เว็บนี้ไม่ใช่นายหน้าประกันภัย ไม่ได้รับใบอนุญาตจาก คปภ. ตัวเลขบางตัว
		อย่างยอดรวมตลอดสัญญา คำนวณจากอัตราที่บริษัทประกาศ ไม่ใช่ดึงมาตรงๆ
		<a class="text-accent underline underline-offset-2" href="/method">ดูวิธีเก็บข้อมูล</a>
	</p>
</section>

<div class="border-rule mt-10 border-t-2 pt-5">
	<h2 class="text-lg font-bold tracking-tight">
		<span class="step">1</span> ตั้งค่าข้อมูลของคุณ
	</h2>
	<p class="text-muted mt-1 max-w-2xl">
		ไม่แน่ใจได้ — แต่กรอกอายุ เพศตามตารางเบี้ย และสิทธิเดิมเมื่อพร้อม เพื่อให้ตัวเลขตรงกับคุณ
	</p>
</div>

<!-- At three columns, the age field has an extra slider. Align grid items at
     their natural height so its input shares a baseline with the two selects
     instead of stretching the neighbouring field grids. -->
<form class="border-rule bg-surface mt-4 grid gap-4 border p-4 sm:grid-cols-3 sm:items-start" aria-describedby="profile-note">
	<label class="grid gap-1.5">
		<span class="label">สิทธิที่มีอยู่</span>
		<select bind:value={baseline} class="control border-border bg-bg border px-3 py-2">
			<option value="unknown">ไม่แน่ใจ / เลือกภายหลัง</option>
			<option value="sso">ประกันสังคม</option>
			<option value="ucs">บัตรทอง</option>
			<option value="csmbs">สิทธิข้าราชการ</option>
			<option value="none">ไม่มีสิทธิ</option>
		</select>
	</label>

	<label class="grid gap-1.5">
		<span class="label">อายุ</span>
		<input
			type="number"
			value={age ?? ''}
			min="0"
			max="80"
			placeholder="เช่น 22"
			oninput={(event) => {
				const value = event.currentTarget.valueAsNumber;
				age = Number.isInteger(value) && value >= 0 && value <= 80 ? value : null;
			}}
			class="control border-border bg-bg tnum border px-3 py-2"
		/>
		<!-- The number is the answer; the slider is how you look around. Dragging
		     it moves every figure in the table 1:1, which is the only way to see
		     that a premium curve is a curve and not a price. -->
		{#if age !== null}
			<input
				type="range"
				bind:value={age}
				min="0"
				max="80"
				aria-label="อายุ (เลื่อนเพื่อดูเบี้ยตามอายุ)"
				class="age-range w-full"
			/>
		{/if}
	</label>

	<label class="grid gap-1.5">
		<span class="label">เพศตามตารางเบี้ย</span>
		<select bind:value={sex} class="control border-border bg-bg border px-3 py-2">
			<option value={null}>ไม่แน่ใจ / เลือกภายหลัง</option>
			<option value="male">ชาย</option>
			<option value="female">หญิง</option>
		</select>
	</label>

	<div id="profile-note" class="profile-note sm:col-span-3">
		<span class="label">สถานะตัวเลข</span>
		<p>
			{#if !hasPricingProfile}
				<strong>ยังไม่คำนวณเบี้ยเฉพาะคุณ</strong><span>กรอกอายุและเพศตามตารางเบี้ย เพื่อดูแผนที่สมัครได้ เบี้ยปีแรก และยอดรวม</span>
			{:else if baseline === 'unknown'}
				<strong>คำนวณเบี้ยตามอายุและเพศแล้ว</strong><span>เลือกสิทธิเดิมเพิ่มได้ หากต้องการดูสิ่งที่ประกันเอกชนเข้ามาเติม</span>
			{:else}
				<strong>ข้อมูลครบสำหรับการเปรียบเทียบนี้</strong><span>เบี้ยและสิทธิเดิมใช้ค่าที่เลือกไว้ในอุปกรณ์นี้</span>
			{/if}
		</p>
	</div>
</form>

{#if scheme}
	<!-- Keyed on the scheme so switching baseline replaces the block rather than
	     mutating it in place — which is what lets it fade instead of teleport. -->
	{#key scheme.id}
		<section class="swap border-rule bg-surface mt-4 border p-4">
			<div class="flex flex-wrap items-baseline gap-x-3">
				<h3 class="label !text-accent">ฐานที่คุณมีอยู่</h3>
				<p class="font-semibold">{scheme.name.th}</p>
			</div>
			<div class="mt-3 grid gap-5 sm:grid-cols-2">
				<div>
					<h4 class="label">ครอบคลุมอยู่แล้ว ({scheme.covers.length})</h4>
					<ul class="mt-1.5 space-y-1.5">
						{#each showAllScheme ? scheme.covers : scheme.covers.slice(0, SCHEME_CAP) as item (item.th)}
							<li class="flex gap-2">
								<span class="text-accent font-mono select-none">+</span>{item.th}
							</li>
						{/each}
					</ul>
				</div>
				<div>
					<h4 class="label">ช่องว่างที่เหลือ ({scheme.gaps.length})</h4>
					<ul class="mt-1.5 space-y-1.5">
						{#each showAllScheme ? scheme.gaps : scheme.gaps.slice(0, SCHEME_CAP) as item (item.th)}
							<li class="flex gap-2">
								<span class="text-host-ink font-mono select-none">−</span>{item.th}
							</li>
						{/each}
					</ul>
				</div>
			</div>

			{#if scheme.covers.length > SCHEME_CAP || scheme.gaps.length > SCHEME_CAP}
				<button
					type="button"
					class="more text-accent mt-3"
					aria-expanded={showAllScheme}
					onclick={() => (showAllScheme = !showAllScheme)}
				>
					{showAllScheme
						? 'ย่อกลับ'
						: `ดูทั้งหมด ${scheme.covers.length + scheme.gaps.length} ข้อ`}
				</button>
			{/if}
		</section>
	{/key}
{/if}

<div class="border-rule mt-12 border-t-2 pt-5">
	<h2 class="text-lg font-bold tracking-tight">
		<span class="step">2</span> แผนที่ซื้อเพิ่มได้
	</h2>
	<!-- The answer, before any scrolling: how many, and the range of the cheque. -->
	{#if hasPricingProfile}
		<p class="mt-1">
			ที่อายุ <span class="tnum font-semibold">{age}</span> ซื้อได้
			<span class="tnum font-semibold">{rows.length}</span> แผน{#if span}{' · '}เบี้ยปีแรก
				<span class="tnum font-semibold">{baht.format(span.low)}</span>–<span
					class="tnum font-semibold">{baht.format(span.high)}</span
				> ฿/ปี{/if}
		</p>
	{:else}
		<p class="mt-1">
			แสดง <span class="tnum font-semibold">{rows.length}</span> แผนในหมวดนี้ ·
			<span class="text-muted">กรอกอายุและเพศเพื่อคัดแผนที่ซื้อได้และแสดงเบี้ยของคุณ</span>
		</p>
	{/if}
	<p class="text-muted mt-1 text-sm">
		อยู่ในรายการนี้ไม่ได้แปลว่าแนะนำ และการเรียงลำดับคือการเรียงตามตัวเลขที่คุณเลือก ไม่ใช่การจัดอันดับว่าแผนไหนดีกว่า
	</p>
</div>

<!-- Filters carry their own counts and their own colour, so the bar doubles as
     the legend for the chips inside the table. accent = health cover you can buy
     alone, host = the life policy bolted on. No third hue is invented here. -->
<div class="border-rule bg-surface mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border p-3">
	<label class="flex items-center gap-2">
		<span class="label">หมวดข้อมูล</span>
		<select bind:value={category} class="control border-border bg-bg border px-2 py-1.5 text-sm">
			{#each CATEGORIES as option}
				<option value={option}>
					{CATEGORY_LABEL[option]} ({data.plans.filter((p) => p.category === option).length})
				</option>
			{/each}
		</select>
	</label>

	<div class="flex flex-wrap items-center gap-2">
		<span class="label">แบบสัญญา</span>
		<button
			type="button"
			class="filter filter-neutral"
			aria-pressed={kind === 'all'}
			onclick={() => (kind = 'all')}>ทั้งหมด <span class="tnum">{counts.all}</span></button
		>
		<button
			type="button"
			class="filter filter-standalone"
			aria-pressed={kind === 'standalone'}
			onclick={() => (kind = 'standalone')}
			>ซื้อเดี่ยวได้ <span class="tnum">{counts.standalone}</span></button
		>
		<button
			type="button"
			class="filter filter-rider"
			aria-pressed={kind === 'rider'}
			onclick={() => (kind = 'rider')}
			>ต้องซื้อพ่วง <span class="tnum">{counts.rider}</span></button
		>
	</div>

	<label class="flex items-center gap-2">
		<span class="label">เรียงตาม</span>
		<select bind:value={sort} class="control border-border bg-bg border px-2 py-1.5 text-sm">
			<option value="premium">เบี้ยปีแรก ถูก→แพง</option>
			<option value="lifetime">จ่ายรวมตลอดสัญญา ถูก→แพง</option>
			<option value="ipd">วงเงินผู้ป่วยใน สูง→ต่ำ</option>
			<option value="insurer">ชื่อบริษัท</option>
		</select>
	</label>

	<label class="flex items-center gap-2 text-sm" class:opacity-50={!hasPricingProfile}>
		<input type="checkbox" bind:checked={pricedOnly} disabled={!hasPricingProfile} class="accent-accent size-4" />
		ซ่อนแผนที่ไม่มีตัวเลขเบี้ย
	</label>
</div>

<!-- Scrolls sideways only below md. Above it the table fits, and dropping the
     scroll container is what lets the sticky thead actually stick — an
     overflow-x container clips sticky-top in both axes. Below md the thead is
     sr-only anyway, so nothing is lost. -->
<div class="mt-4 max-md:overflow-x-auto">
	<table class="plans border-rule w-full border-collapse border">
		<thead class="head sticky top-0 z-10">
			<tr class="border-rule border-b-2">
				<th class="label px-3 py-2.5 text-left">แผน</th>
				<!-- The signature column: the whole argument, six bars deep. -->
				<th class="label w-[24%] px-3 py-2.5 text-left">เงินที่เป็นค่าสุขภาพจริง</th>
				<th class="label px-3 py-2.5 text-right whitespace-nowrap">วงเงินผู้ป่วยใน</th>
				<th class="label px-3 py-2.5 text-right whitespace-nowrap">เบี้ยปีแรก</th>
				<th class="label px-3 py-2.5 text-right whitespace-nowrap">จ่ายรวมตลอดสัญญา</th>
				<th class="w-10 px-3 py-2.5"><span class="sr-only">รายละเอียด</span></th>
			</tr>
		</thead>

		{#each rows as row (row.plan.id)}
			{@const id = row.plan.id}
			{@const withheld = row.withheld}
			<tbody class="border-border border-b">
				<!-- The whole row is the target. A 24px "+" was the only way in, which
				     is a hard thing to hit and an invisible thing to discover. The
				     button stays as the real control so keyboard and AT still work. -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<tr class="row" onclick={() => (open[id] = !open[id])}>
					<td class="px-3 py-3 align-top">
						<div class="font-semibold">{row.plan.name.th}</div>
						<div class="text-muted mt-0.5 text-sm">{row.plan.insurer.th}</div>
						<div class="mt-1.5 flex flex-wrap gap-1.5">
							{#if row.plan.type === 'rider'}
								<span class="chip chip-rider">ต้องซื้อพ่วง</span>
							{:else}
								<span class="chip chip-standalone">ซื้อเดี่ยวได้</span>
							{/if}
							<span class="chip chip-neutral">{SHAPE[row.plan.shape]}</span>
							{#if row.plan.new_health_standard}
								<span class="chip chip-neutral">มาตรฐานใหม่</span>
							{/if}
						</div>
					</td>

					<td class="px-3 py-3 align-top">
						<span class="label cell-label">เงินที่เป็นค่าสุขภาพจริง</span>
						{#if !hasPricingProfile}
							<span class="data-state font-mono">—</span>
						{:else if row.stale}
							<span class="data-state data-state-stale">ข้อมูลเบี้ยเกิน 18 เดือน</span>
						{:else if row.plan.premium === null}
							<span class="data-state">ไม่ประกาศเบี้ย</span>
						{:else if row.annualHealth === null}
							<span class="data-state">ไม่มีอัตราสำหรับอายุนี้</span>
						{:else if row.share !== null && row.annualHost !== null}
							<figure>
								<div class="border-border flex h-6 overflow-hidden border" role="presentation">
									<div class="bg-accent split" style="width: {row.share * 100}%"></div>
									<div class="bg-host flex-1"></div>
								</div>
								<figcaption class="mt-1.5 flex flex-wrap justify-between gap-x-3">
									<span class="label !text-accent"
										>สุขภาพ {Math.round(row.share * 100)}%</span
									>
									<span class="label !text-host-ink"
										>สัญญาหลัก {100 - Math.round(row.share * 100)}%</span
									>
								</figcaption>
							</figure>
						{:else if row.share === 1}
							<!-- Standalone: nothing to split, so no bar. Saying so beats a full bar
							     that would read as a score. -->
							<p class="text-accent text-sm">เป็นค่าสุขภาพเต็ม 100%</p>
						{:else}
							<p class="text-muted text-sm">บริษัทไม่เปิดเผยเบี้ยสัญญาหลัก</p>
						{/if}
					</td>

					<td class="px-3 py-3 text-right align-top">
						<span class="label cell-label">วงเงินผู้ป่วยใน</span>
						{#if row.plan.ipd_annual_limit_thb === null}
							<span class="text-muted font-mono">—</span>
						{:else}
							<span class="tnum font-semibold">{compactBaht(row.plan.ipd_annual_limit_thb)}</span>
							<p class="text-muted text-xs">
								{row.plan.ipd_limit_basis === 'per_confinement' ? 'ต่อการเข้าพัก' : 'ต่อปี'}
							</p>
						{/if}
					</td>

					<td class="px-3 py-3 text-right align-top">
						<span class="label cell-label">เบี้ยปีแรก</span>
						{#if row.firstYear === null}
							<span class="text-muted font-mono">—</span>
						{:else}
							<span class="tnum text-lg font-semibold">{baht.format(row.firstYear)}</span><span
								class="text-muted ml-1 text-xs">฿</span
							>
							<!-- A rider whose host premium is unpublished has no total. Printing the
							     health figure alone as "เบี้ยปีแรก" understates the cheque, which is
							     the exact error this site exists to correct. Mark it as a floor. -->
							{#if row.plan.type === 'rider' && row.annualHost === null}
								<p class="text-host-ink text-xs">จ่ายจริงมากกว่านี้</p>
							{/if}
						{/if}
					</td>

					<td class="px-3 py-3 text-right align-top">
						<span class="label cell-label">จ่ายรวมตลอดสัญญา</span>
						{#if withheld || row.lifetime === null}
							<!-- A withheld figure must never be typeset like a figure. -->
							{#if !withheld && row.renewalKind === 'lifetime'}
								<span class="text-muted">ตลอดชีวิต</span>
							{:else}
								<span class="text-muted font-mono">—</span>
							{/if}
						{:else}
							<span class="tnum text-lg font-semibold">{baht.format(row.lifetime.total_thb)}</span
							><span class="text-muted ml-1 text-xs">฿</span>
							<p class="text-muted text-xs">
								ถึงอายุ {row.renewalCeiling} ({row.years} ปี)
							</p>
						{/if}
					</td>

					<td class="px-3 py-3 align-top">
						<button
							type="button"
							class="toggle border-border text-muted hover:text-ink block border px-2 py-1 font-mono"
							aria-expanded={!!open[id]}
							aria-controls="d-{id}"
							aria-label="รายละเอียดและแหล่งข้อมูล {row.plan.name.th}"
							onclick={(e) => {
								// The row handles the toggle; without this the two handlers
								// fire in sequence and cancel each other out.
								e.stopPropagation();
								open[id] = !open[id];
							}}
						>
							<span class="glyph block">+</span>
							<!-- Below md the columns become a stacked card and this button is
							     the last thing in it, orphaned at the left edge with no idea
							     what it opens. On a phone it gets a name and the full width. -->
							<span class="toggle-text">รายละเอียดและแหล่งข้อมูล</span>
						</button>
					</td>
				</tr>

				<tr>
					<td colspan="6" class="p-0">
						<div class="detail" data-open={open[id] ? '' : undefined} id="d-{id}">
							<div class="overflow-hidden">
								<dl class="text-muted grid gap-x-8 px-3 py-3 sm:grid-cols-2">
									<div class="border-border flex justify-between gap-2 border-b py-1.5">
										<dt>ต่ออายุถึงอายุ</dt>
										<dd class="text-ink tnum">
										{#if !hasPricingProfile}
											กรอกอายุเพื่อดูเงื่อนไขที่ใช้กับคุณ
										{:else if row.renewalKind === 'lifetime'}
								ตลอดชีวิต
							{:else if row.renewalCeiling !== null}
								{row.renewalCeiling} ปี
							{:else}
								ไม่ประกาศ
							{/if}
										</dd>
									</div>
									<div class="border-border flex justify-between gap-2 border-b py-1.5">
										<dt>วงเงินผู้ป่วยนอก</dt>
										<dd class="text-ink tnum">
											{row.plan.opd_annual_limit_thb === null
												? '—'
												: `${baht.format(row.plan.opd_annual_limit_thb)} บาท`}
										</dd>
									</div>
									<div class="border-border flex justify-between gap-2 border-b py-1.5">
										<dt>ค่าห้องต่อคืน</dt>
										<dd class="text-ink tnum">
											{row.plan.room_board_thb_per_night === null
												? '—'
												: `${baht.format(row.plan.room_board_thb_per_night)} บาท`}
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
								</dl>

								<!-- Prose lives here, never in the grid. A table cell that holds a
								     sentence stops being a cell you can compare across rows. -->
								<div class="text-muted space-y-1.5 px-3 pb-3 text-sm">
									{#if row.stale}
										<p>ไม่ได้ตรวจเบี้ยเกิน 18 เดือน จึงซ่อนตัวเลข (ตรวจล่าสุด {row.plan.verified_on})</p>
									{/if}
									{#if row.plan.premium === null && row.plan.premium_unknown_reason}
										<p>{row.plan.premium_unknown_reason}</p>
									{/if}
					{#if row.renewalKind === 'unknown' && row.plan.renewal_ceiling_unknown_reason}
						<p>{row.plan.renewal_ceiling_unknown_reason}</p>
					{/if}
					{#if row.plan.renewal_ceiling_by_entry_age.length > 0}
						<p>เงื่อนไขต่ออายุขึ้นอยู่กับอายุแรกเข้า; ตัวเลขด้านบนใช้ช่วงอายุของคุณ</p>
					{/if}
									{#if row.lifetime !== null && !withheld && row.lifetime.incomplete}
										<p>บางช่วงอายุไม่มีข้อมูลเบี้ย ยอดรวมจึงต่ำกว่าความจริง</p>
									{/if}
									{#if row.plan.host_policy}
										<p>
											สัญญาหลักที่ต้องซื้อพ่วง: {row.plan.host_policy.name.th}{#if row.plan.host_policy.min_sum_insured_thb !== null}
												· ทุนประกันขั้นต่ำ {baht.format(
													row.plan.host_policy.min_sum_insured_thb
												)} บาท{/if}
											· <a
												class="text-accent underline underline-offset-2"
												href={row.plan.host_policy.source.url}>แหล่งข้อมูล</a
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
									{/if}
									{#if row.plan.copay_on_renewal}
										<p>{row.plan.copay_on_renewal}</p>
									{/if}
									{#if row.lifetime !== null && !withheld}
										<p>ยอดรวมคิดจากเบี้ยปัจจุบัน ซึ่งบริษัทปรับขึ้นทั้งพอร์ตได้</p>
									{/if}
								</div>

								<!-- Provenance is not fine print: it is why the record is believable. -->
								<div class="border-border text-muted bg-bg/40 border-t px-3 py-2.5 font-mono text-sm">
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

	{#if rows.length === 0}
		<p class="border-rule text-muted border border-t-0 p-6 text-center">
			ไม่มีแผนที่ตรงกับตัวกรองนี้ ลองเลือก "ทั้งหมด" หรือเอาตัวกรองออก
		</p>
	{/if}
</div>

<style>
	/* Step markers. The page is a sequence — your entitlement, then the delta on
	   top of it — and readers were landing in the middle of it. */
	.step {
		display: inline-grid;
		place-items: center;
		width: 1.5rem;
		height: 1.5rem;
		margin-right: 0.25rem;
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--color-bg);
		background: var(--color-accent);
		vertical-align: 0.05em;
	}

	/* Category tags. Only two carry colour, and they carry the same two the split
	   bar does: accent is health cover, host is the life policy bolted on. Every
	   other facet is a neutral outline, so colour never means "notable". */
	.chip {
		display: inline-block;
		padding: 0.05rem 0.4rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		line-height: 1.6;
		white-space: nowrap;
		border: 1px solid;
	}

	.chip-neutral {
		color: var(--color-muted);
		border-color: var(--color-border);
	}

	.chip-standalone {
		color: var(--color-accent);
		border-color: color-mix(in oklch, var(--color-accent) 45%, transparent);
		background: color-mix(in oklch, var(--color-accent) 8%, transparent);
	}

	.chip-rider {
		color: var(--color-host-ink);
		border-color: color-mix(in oklch, var(--color-host-ink) 45%, transparent);
		background: color-mix(in oklch, var(--color-host) 12%, transparent);
	}

	/* Pressed state tints with the button's own colour rather than filling with
	   it — accent needs light text and host needs dark, and a rule that flips
	   text colour per chip is a rule that eventually ships an unreadable one. */
	.filter {
		padding: 0.2rem 0.7rem;
		font-size: 0.9375rem;
		color: var(--color-muted);
		border: 1px solid var(--color-border);
		transition:
			background-color 120ms ease,
			border-color 120ms ease,
			color 120ms ease,
			transform 140ms var(--ease-out);
	}

	.filter[aria-pressed='true'] {
		border-color: currentColor;
		background: color-mix(in oklch, currentColor 12%, transparent);
		font-weight: 600;
	}

	.filter-neutral[aria-pressed='true'] {
		color: var(--color-ink);
	}

	.filter-standalone[aria-pressed='true'] {
		color: var(--color-accent);
	}

	.filter-rider[aria-pressed='true'] {
		color: var(--color-host-ink);
	}

	.filter:active {
		transform: scale(0.97);
	}

	.more {
		font-size: 0.9375rem;
		text-decoration: underline;
		text-underline-offset: 3px;
		transition: transform 140ms var(--ease-out);
	}

	.more:active {
		transform: scale(0.97);
	}

	/* A state readout, not an alert. This is a datasheet: its status belongs on a
	   ruled row with the same label/value grammar as the records below. Warn
	   colours remain reserved for stale source data. */
	.profile-note {
		display: grid;
		grid-template-columns: minmax(7.5rem, auto) minmax(0, 1fr);
		gap: 0.5rem 1rem;
		padding-top: 0.75rem;
		color: var(--color-muted);
		font-size: 0.9375rem;
		line-height: 1.6;
		border-top: 1px solid var(--color-border);
	}

	.profile-note p {
		min-width: 0;
	}

	.profile-note strong {
		margin-right: 0.5rem;
		color: var(--color-ink);
		font-weight: 600;
	}

	/* A missing figure is still a table datum, never a notification card. Keep
	   the state to one short phrase so rows retain their comparison rhythm; the
	   expandable panel carries the explanation and source caveat. */
	.data-state {
		color: var(--color-muted);
		font-size: 0.9375rem;
		line-height: 1.6;
	}

	.data-state-stale {
		color: var(--color-warn-ink);
	}

	@media (max-width: 639px) {
		.profile-note {
			grid-template-columns: 1fr;
			gap: 0.2rem;
		}
	}

	@media (hover: hover) and (pointer: fine) {
		.filter:hover {
			border-color: var(--color-rule);
			color: var(--color-ink);
		}
	}

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

	/* The row is the click target, so it has to say so. Gate hover: on touch it
	   fires on tap and reads as a stuck selection. */
	.row {
		cursor: pointer;
	}

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
	.cell-label,
	.toggle-text {
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

		.toggle {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
			padding-block: 0.5rem;
		}

		.toggle-text {
			display: block;
			font-family: var(--font-sans);
			font-size: 0.9375rem;
		}
	}
</style>
